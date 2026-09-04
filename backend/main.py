"""
Bharat Quest - FastAPI Main Server
REST API for Authentication, Real Economy, Game Sessions, Leaderboards,
Cultural Chatbot, and Static Asset Delivery.
"""

import os
import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, EmailStr, Field

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from database import init_db, get_connection
from auth import hash_password, verify_password, create_access_token, get_current_user, get_optional_user
from game_engine import start_game_session, complete_game_session, unlock_game_with_coins, GAME_CONFIG, ACHIEVEMENTS_DEF
from chatbot_engine import ask_chatbot

app = FastAPI(
    title="Bharat Quest - Traditional Games of India",
    description="Interactive cultural-exploration and gamified platform with real authentication, real database-backed economy, and playable traditional games.",
    version="1.0.0"
)

# Enable CORS for development flexibility
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"

# Ensure database tables are initialized
init_db()

@app.on_event("startup")
def on_startup():
    init_db()

# --- Request / Response Models ---
class SignUpRequest(BaseModel):
    display_name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=100)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class ProfileUpdateRequest(BaseModel):
    display_name: Optional[str] = Field(None, min_length=2, max_length=50)
    avatar: Optional[str] = None

class GameStartRequest(BaseModel):
    game_id: str
    state_id: str

class GameCompleteRequest(BaseModel):
    session_id: str
    game_id: str
    state_id: str
    turns: int = 1
    won: bool = True

class GameUnlockRequest(BaseModel):
    game_id: str

class ChatRequest(BaseModel):
    query: str = Field(..., min_length=1)
    state_id: Optional[str] = "maharashtra"


# ============================================================
# AUTHENTICATION ENDPOINTS
# ============================================================

@app.post("/api/auth/signup", status_code=status.HTTP_201_CREATED)
def signup(req: SignUpRequest):
    email_clean = req.email.lower().strip()
    name_clean = req.display_name.strip()

    conn = get_connection()
    cursor = conn.cursor()

    # Check if user already exists
    cursor.execute("SELECT id FROM users WHERE email = ?", (email_clean,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists. Please login instead."
        )

    user_id = f"usr_{uuid.uuid4().hex[:12]}"
    pwd_hash, salt = hash_password(req.password)
    now_iso = datetime.now(timezone.utc).isoformat()

    # Initial user creation
    cursor.execute("""
        INSERT INTO users (id, display_name, email, password_hash, salt, avatar, created_at)
        VALUES (?, ?, ?, ?, ?, 'peacock', ?)
    """, (user_id, name_clean, email_clean, pwd_hash, salt, now_iso))

    # Mandatory rule: Every new user strictly starts with 0 Points, 0 Stars, 0 Coins!
    initial_unlocked = json.dumps(["chaupar", "saripat"])  # Chaupar & Saripat unlocked initially; Satkoli locked
    cursor.execute("""
        INSERT INTO user_progress (
            user_id, total_points, total_stars, total_coins,
            games_completed, games_unlocked, states_explored, achievements, updated_at
        ) VALUES (?, 0, 0, 0, 0, ?, '[]', '[]', ?)
    """, (user_id, initial_unlocked, now_iso))

    conn.commit()
    conn.close()

    # Generate JWT
    token = create_access_token({"sub": user_id, "email": email_clean})

    return {
        "message": f"🎉 Account Created Successfully! Welcome to Traditional Games of India, {name_clean}!",
        "token": token,
        "user": {
            "id": user_id,
            "display_name": name_clean,
            "email": email_clean,
            "avatar": "peacock",
            "total_points": 0,
            "total_stars": 0,
            "total_coins": 0,
            "games_completed": 0,
            "games_unlocked": ["chaupar", "saripat"],
            "states_explored": [],
            "achievements": [],
            "created_at": now_iso
        }
    }

@app.post("/api/auth/login")
def login(req: LoginRequest):
    email_clean = req.email.lower().strip()
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?", (email_clean,))
    user_row = cursor.fetchone()

    if not user_row:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    user = dict(user_row)
    if not verify_password(req.password, user["salt"], user["password_hash"]):
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    # Fetch user progress
    cursor.execute("SELECT * FROM user_progress WHERE user_id = ?", (user["id"],))
    prog_row = cursor.fetchone()
    conn.close()

    prog = dict(prog_row) if prog_row else {}
    token = create_access_token({"sub": user["id"], "email": email_clean})

    return {
        "message": f"Welcome back, {user['display_name']}!",
        "token": token,
        "user": {
            "id": user["id"],
            "display_name": user["display_name"],
            "email": user["email"],
            "avatar": user["avatar"],
            "total_points": prog.get("total_points", 0),
            "total_stars": prog.get("total_stars", 0),
            "total_coins": prog.get("total_coins", 0),
            "games_completed": prog.get("games_completed", 0),
            "games_unlocked": json.loads(prog.get("games_unlocked", '["chaupar", "saripat"]')),
            "states_explored": json.loads(prog.get("states_explored", '[]')),
            "achievements": json.loads(prog.get("achievements", '[]')),
            "created_at": user["created_at"]
        }
    }


# ============================================================
# USER PROFILE & PROGRESS ENDPOINTS
# ============================================================

@app.get("/api/user/me")
def get_profile(current_user: dict = Depends(get_current_user)):
    # Parse JSON fields safely
    unlocked = json.loads(current_user.get("games_unlocked") or '["chaupar", "saripat"]')
    explored = json.loads(current_user.get("states_explored") or '[]')
    achievements = json.loads(current_user.get("achievements") or '[]')

    # Get rank
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT COUNT(*) + 1 as rank
        FROM user_progress
        WHERE total_points > ?
    """, (current_user["total_points"],))
    rank = cursor.fetchone()["rank"]
    conn.close()

    return {
        "id": current_user["id"],
        "display_name": current_user["display_name"],
        "email": current_user["email"],
        "avatar": current_user["avatar"],
        "total_points": current_user["total_points"],
        "total_stars": current_user["total_stars"],
        "total_coins": current_user["total_coins"],
        "games_completed": current_user["games_completed"],
        "games_unlocked": unlocked,
        "states_explored": explored,
        "achievements": achievements,
        "rank": rank,
        "created_at": current_user["created_at"]
    }

@app.put("/api/user/profile")
def update_profile(req: ProfileUpdateRequest, current_user: dict = Depends(get_current_user)):
    conn = get_connection()
    cursor = conn.cursor()
    
    new_name = req.display_name.strip() if req.display_name else current_user["display_name"]
    new_avatar = req.avatar if req.avatar else current_user["avatar"]

    cursor.execute("""
        UPDATE users
        SET display_name = ?, avatar = ?
        WHERE id = ?
    """, (new_name, new_avatar, current_user["id"]))

    conn.commit()
    conn.close()

    return {
        "message": "Profile updated successfully.",
        "display_name": new_name,
        "avatar": new_avatar
    }

@app.get("/api/user/state-progress/{state_id}")
def get_state_progress(state_id: str, current_user: dict = Depends(get_current_user)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM state_progress
        WHERE user_id = ? AND state_id = ?
    """, (current_user["id"], state_id.lower()))
    row = cursor.fetchone()
    conn.close()

    if row:
        return dict(row)
    return {
        "user_id": current_user["id"],
        "state_id": state_id.lower(),
        "points": 0,
        "games_completed": 0,
        "games_unlocked": 0
    }


# ============================================================
# GAMEPLAY & REWARD ENDPOINTS (SECURE & ANTI-TAMPER)
# ============================================================

@app.post("/api/games/start")
def api_start_game(req: GameStartRequest, current_user: dict = Depends(get_current_user)):
    """Initiates an active game session for verified gameplay."""
    session_data = start_game_session(current_user["id"], req.game_id.lower(), req.state_id.lower())
    return session_data

@app.post("/api/games/complete")
def api_complete_game(req: GameCompleteRequest, current_user: dict = Depends(get_current_user)):
    """
    Validates completed gameplay against server session, awards REAL points, stars, and coins,
    updates database, and returns updated database totals. Prevents duplicate claims.
    """
    result = complete_game_session(
        user_id=current_user["id"],
        session_id=req.session_id,
        game_id=req.game_id.lower(),
        state_id=req.state_id.lower(),
        turns=req.turns,
        won=req.won
    )
    return result

@app.post("/api/games/unlock")
def api_unlock_game(req: GameUnlockRequest, current_user: dict = Depends(get_current_user)):
    """
    Unlocks an advanced indoor game (e.g. Satkoli for 200 Coins).
    Deducts coins atomically from user's real balance in the database.
    """
    result = unlock_game_with_coins(current_user["id"], req.game_id.lower())
    return result


# ============================================================
# REAL LEADERBOARD ENDPOINTS (ZERO FAKE DATA)
# ============================================================

@app.get("/api/leaderboard/global")
def get_global_leaderboard(opt_user: Optional[dict] = Depends(get_optional_user)):
    """
    Global Leaderboard:
    Ranked strictly by REAL total_points DESC, total_stars DESC.
    ONLY real registered users from the database. Zero fake users.
    """
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT u.id as user_id, u.display_name, u.avatar,
               p.total_points as points, p.total_stars as stars, p.total_coins as coins,
               p.games_completed
        FROM users u
        JOIN user_progress p ON u.id = p.user_id
        ORDER BY p.total_points DESC, p.total_stars DESC, p.total_coins DESC, u.created_at ASC
    """)
    rows = cursor.fetchall()
    conn.close()

    leaderboard = []
    user_rank = None
    curr_id = opt_user["id"] if opt_user else None

    for idx, row in enumerate(rows, start=1):
        item = {
            "rank": idx,
            "user_id": row["user_id"],
            "display_name": row["display_name"],
            "avatar": row["avatar"],
            "points": row["points"],
            "stars": row["stars"],
            "coins": row["coins"],
            "games_completed": row["games_completed"],
            "is_current_user": (row["user_id"] == curr_id)
        }
        if row["user_id"] == curr_id:
            user_rank = idx
        leaderboard.append(item)

    return {
        "leaderboard": leaderboard,
        "total_players": len(leaderboard),
        "current_user_rank": user_rank
    }

@app.get("/api/leaderboard/state/{state_id}")
def get_state_leaderboard(state_id: str, opt_user: Optional[dict] = Depends(get_optional_user)):
    """
    State Leaderboard:
    Ranked by points earned exclusively in this state's indoor games.
    """
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT u.id as user_id, u.display_name, u.avatar,
               sp.points, sp.games_completed,
               p.total_stars as stars
        FROM state_progress sp
        JOIN users u ON sp.user_id = u.id
        JOIN user_progress p ON sp.user_id = p.user_id
        WHERE sp.state_id = ? AND sp.points > 0
        ORDER BY sp.points DESC, p.total_stars DESC
    """, (state_id.lower(),))
    rows = cursor.fetchall()
    conn.close()

    leaderboard = []
    user_rank = None
    curr_id = opt_user["id"] if opt_user else None

    for idx, row in enumerate(rows, start=1):
        item = {
            "rank": idx,
            "user_id": row["user_id"],
            "display_name": row["display_name"],
            "avatar": row["avatar"],
            "points": row["points"],
            "stars": row["stars"],
            "games_completed": row["games_completed"],
            "is_current_user": (row["user_id"] == curr_id)
        }
        if row["user_id"] == curr_id:
            user_rank = idx
        leaderboard.append(item)

    return {
        "state_id": state_id.lower(),
        "leaderboard": leaderboard,
        "total_players": len(leaderboard),
        "current_user_rank": user_rank
    }

@app.get("/api/leaderboard/weekly")
def get_weekly_leaderboard(opt_user: Optional[dict] = Depends(get_optional_user)):
    """
    Weekly Leaderboard:
    Ranked by points earned within the last 7 calendar days.
    """
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT gc.user_id, u.display_name, u.avatar,
               SUM(gc.points_earned) as weekly_points,
               SUM(gc.stars_earned) as weekly_stars,
               COUNT(gc.id) as weekly_games
        FROM game_completions gc
        JOIN users u ON gc.user_id = u.id
        WHERE gc.completed_at >= datetime('now', '-7 days')
        GROUP BY gc.user_id
        ORDER BY weekly_points DESC, weekly_stars DESC
    """)
    rows = cursor.fetchall()
    conn.close()

    leaderboard = []
    user_rank = None
    curr_id = opt_user["id"] if opt_user else None

    for idx, row in enumerate(rows, start=1):
        item = {
            "rank": idx,
            "user_id": row["user_id"],
            "display_name": row["display_name"],
            "avatar": row["avatar"],
            "points": row["weekly_points"],
            "stars": row["weekly_stars"],
            "games_completed": row["weekly_games"],
            "is_current_user": (row["user_id"] == curr_id)
        }
        if row["user_id"] == curr_id:
            user_rank = idx
        leaderboard.append(item)

    return {
        "leaderboard": leaderboard,
        "total_players": len(leaderboard),
        "current_user_rank": user_rank
    }


# ============================================================
# CULTURAL AI CHATBOT ENDPOINT
# ============================================================

@app.post("/api/chat/ask")
def chat_ask(req: ChatRequest):
    response = ask_chatbot(req.query, req.state_id or "maharashtra")
    return response


# ============================================================
# STATIC FILES SERVING & SPA FALLBACK
# ============================================================

if FRONTEND_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

@app.get("/")
def serve_index():
    index_file = FRONTEND_DIR / "index.html"
    if index_file.exists():
        return FileResponse(str(index_file))
    return {"message": "Bharat Quest API is running. Frontend index.html not yet installed."}

# Catch-all for SPA routes
@app.get("/{full_path:path}")
def catch_all(full_path: str):
    # If path points to static file directly, serve it
    static_candidate = FRONTEND_DIR / full_path
    if static_candidate.is_file():
        return FileResponse(str(static_candidate))
    # Otherwise return index.html for client-side routing
    index_file = FRONTEND_DIR / "index.html"
    if index_file.exists():
        return FileResponse(str(index_file))
    return {"message": "Bharat Quest SPA Shell"}
