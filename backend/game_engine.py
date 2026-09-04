"""
Bharat Quest - Game Engine & Reward Validation
Server-side reward calculations, game session integrity, anti-tamper verification,
duplicate prevention, and game unlock management.
"""

import json
import uuid
from datetime import datetime, timezone
from typing import Dict, Any, Optional
from fastapi import HTTPException, status
from database import get_connection

# Configured Game Rewards & Unlock Costs
GAME_CONFIG = {
    "chaupar": {
        "name": "Chaupar",
        "state_id": "maharashtra",
        "category": "indoor",
        "unlock_cost": 0,  # Unlocked by default
        "first_reward": {"points": 100, "stars": 10, "coins": 25},
        "replay_reward": {"points": 25, "stars": 2, "coins": 5}
    },
    "saripat": {
        "name": "Saripat",
        "state_id": "maharashtra",
        "category": "indoor",
        "unlock_cost": 0,  # Unlocked by default
        "first_reward": {"points": 150, "stars": 15, "coins": 30},
        "replay_reward": {"points": 30, "stars": 3, "coins": 6}
    },
    "satkoli": {
        "name": "Satkoli",
        "state_id": "maharashtra",
        "category": "indoor",
        "unlock_cost": 200,  # Requires 200 Coins to unlock!
        "first_reward": {"points": 200, "stars": 20, "coins": 50},
        "replay_reward": {"points": 40, "stars": 4, "coins": 10}
    }
}

ACHIEVEMENTS_DEF = {
    "first_game": {
        "id": "first_game",
        "title": "First Step of a Warrior",
        "desc": "Completed your very first traditional Indian indoor game",
        "icon": "🏆"
    },
    "five_games": {
        "id": "five_games",
        "title": "Ancient Strategist",
        "desc": "Successfully completed 5 traditional indoor games",
        "icon": "🎮"
    },
    "points_500": {
        "id": "points_500",
        "title": "Rising Champion",
        "desc": "Earned 500 total points on the real leaderboard",
        "icon": "⭐"
    },
    "points_1000": {
        "id": "points_1000",
        "title": "Grandmaster of Bharat",
        "desc": "Crossed 1000 points in traditional Indian gaming",
        "icon": "👑"
    },
    "game_collector": {
        "id": "game_collector",
        "title": "Game Collector",
        "desc": "Unlocked an advanced traditional game using earned coins",
        "icon": "🔓"
    },
    "state_explorer": {
        "id": "state_explorer",
        "title": "Cultural Voyager",
        "desc": "Explored games across multiple Indian states",
        "icon": "🗺️"
    }
}

def start_game_session(user_id: str, game_id: str, state_id: str) -> Dict[str, Any]:
    if game_id not in GAME_CONFIG:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unknown game '{game_id}'. Only verified indoor games can be played."
        )

    conn = get_connection()
    cursor = conn.cursor()

    # Check unlock status
    cursor.execute("SELECT games_unlocked FROM user_progress WHERE user_id = ?", (user_id,))
    p_row = cursor.fetchone()
    if not p_row:
        conn.close()
        raise HTTPException(status_code=404, detail="User progress record not found.")

    unlocked_games = json.loads(p_row["games_unlocked"])
    if game_id not in unlocked_games:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"{GAME_CONFIG[game_id]['name']} is locked. You must unlock it with {GAME_CONFIG[game_id]['unlock_cost']} Coins."
        )

    session_id = f"sess_{uuid.uuid4().hex}"
    now_iso = datetime.now(timezone.utc).isoformat()

    cursor.execute("""
        INSERT INTO game_sessions (session_id, user_id, game_id, state_id, created_at, status, turns)
        VALUES (?, ?, ?, ?, ?, 'active', 0)
    """, (session_id, user_id, game_id, state_id, now_iso))

    conn.commit()
    conn.close()

    return {
        "session_id": session_id,
        "game_id": game_id,
        "state_id": state_id,
        "created_at": now_iso
    }

def complete_game_session(
    user_id: str,
    session_id: str,
    game_id: str,
    state_id: str,
    turns: int = 1,
    won: bool = True
) -> Dict[str, Any]:
    if game_id not in GAME_CONFIG:
        raise HTTPException(status_code=400, detail="Invalid game identifier.")

    if not won:
        raise HTTPException(
            status_code=400,
            detail="Rewards are only granted upon victorious completion of the indoor game."
        )

    conn = get_connection()
    cursor = conn.cursor()

    # 1. Verify active session
    cursor.execute("""
        SELECT * FROM game_sessions
        WHERE session_id = ? AND user_id = ? AND game_id = ?
    """, (session_id, user_id, game_id))
    session = cursor.fetchone()

    if not session:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid game session. Gameplay must be initiated through the application."
        )

    if session["status"] != "active":
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This game session has already been completed. Duplicate reward claims are prevented."
        )

    now_iso = datetime.now(timezone.utc).isoformat()

    # 2. Mark session as completed
    cursor.execute("""
        UPDATE game_sessions
        SET status = 'completed', completed_at = ?, turns = ?
        WHERE session_id = ?
    """, (now_iso, turns, session_id))

    # 3. Determine reward (First play vs Replay)
    cursor.execute("""
        SELECT COUNT(*) as count FROM game_completions
        WHERE user_id = ? AND game_id = ?
    """, (user_id, game_id))
    prior_wins = cursor.fetchone()["count"]

    reward_def = GAME_CONFIG[game_id]["first_reward"] if prior_wins == 0 else GAME_CONFIG[game_id]["replay_reward"]
    pts_earned = reward_def["points"]
    stars_earned = reward_def["stars"]
    coins_earned = reward_def["coins"]

    # 4. Insert into game_completions audit table
    completion_id = f"comp_{uuid.uuid4().hex}"
    cursor.execute("""
        INSERT INTO game_completions (
            id, user_id, game_id, state_id, points_earned, stars_earned, coins_earned, session_token, completed_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (completion_id, user_id, game_id, state_id, pts_earned, stars_earned, coins_earned, session_id, now_iso))

    # 5. Fetch current user progress
    cursor.execute("SELECT * FROM user_progress WHERE user_id = ?", (user_id,))
    progress = dict(cursor.fetchone())

    new_points = progress["total_points"] + pts_earned
    new_stars = progress["total_stars"] + stars_earned
    new_coins = progress["total_coins"] + coins_earned
    new_completed = progress["games_completed"] + 1

    states_explored = json.loads(progress["states_explored"])
    if state_id not in states_explored:
        states_explored.append(state_id)

    achievements = json.loads(progress["achievements"])
    new_achievements = []

    # Check achievements
    if "first_game" not in achievements and new_completed >= 1:
        achievements.append("first_game")
        new_achievements.append(ACHIEVEMENTS_DEF["first_game"])

    if "five_games" not in achievements and new_completed >= 5:
        achievements.append("five_games")
        new_achievements.append(ACHIEVEMENTS_DEF["five_games"])

    if "points_500" not in achievements and new_points >= 500:
        achievements.append("points_500")
        new_achievements.append(ACHIEVEMENTS_DEF["points_500"])

    if "points_1000" not in achievements and new_points >= 1000:
        achievements.append("points_1000")
        new_achievements.append(ACHIEVEMENTS_DEF["points_1000"])

    if "state_explorer" not in achievements and len(states_explored) >= 2:
        achievements.append("state_explorer")
        new_achievements.append(ACHIEVEMENTS_DEF["state_explorer"])

    # 6. Update user_progress
    cursor.execute("""
        UPDATE user_progress
        SET total_points = ?, total_stars = ?, total_coins = ?,
            games_completed = ?, states_explored = ?, achievements = ?, updated_at = ?
        WHERE user_id = ?
    """, (
        new_points, new_stars, new_coins, new_completed,
        json.dumps(states_explored), json.dumps(achievements), now_iso, user_id
    ))

    # 7. Update state_progress
    cursor.execute("""
        INSERT INTO state_progress (user_id, state_id, points, games_completed, games_unlocked)
        VALUES (?, ?, ?, 1, 0)
        ON CONFLICT(user_id, state_id) DO UPDATE SET
            points = points + excluded.points,
            games_completed = games_completed + 1
    """, (user_id, state_id, pts_earned))

    conn.commit()
    conn.close()

    return {
        "game_id": game_id,
        "state_id": state_id,
        "is_first_win": (prior_wins == 0),
        "reward": {
            "points": pts_earned,
            "stars": stars_earned,
            "coins": coins_earned
        },
        "new_totals": {
            "total_points": new_points,
            "total_stars": new_stars,
            "total_coins": new_coins,
            "games_completed": new_completed,
            "states_explored_count": len(states_explored)
        },
        "new_achievements": new_achievements
    }

def unlock_game_with_coins(user_id: str, game_id: str) -> Dict[str, Any]:
    if game_id not in GAME_CONFIG:
        raise HTTPException(status_code=400, detail="Unknown game.")

    cfg = GAME_CONFIG[game_id]
    cost = cfg["unlock_cost"]

    if cost <= 0:
        raise HTTPException(status_code=400, detail="This game is already free and unlocked.")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM user_progress WHERE user_id = ?", (user_id,))
    progress = cursor.fetchone()
    if not progress:
        conn.close()
        raise HTTPException(status_code=404, detail="User progress record not found.")

    progress = dict(progress)
    unlocked_games = json.loads(progress["games_unlocked"])

    if game_id in unlocked_games:
        conn.close()
        return {
            "message": f"{cfg['name']} is already unlocked.",
            "unlocked_games": unlocked_games,
            "coins_remaining": progress["total_coins"]
        }

    if progress["total_coins"] < cost:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Insufficient coins. You have {progress['total_coins']} Coins, but {cfg['name']} requires {cost} Coins to unlock. Play more games to earn coins!"
        )

    # Atomic deduction and unlock
    new_coins = progress["total_coins"] - cost
    unlocked_games.append(game_id)
    achievements = json.loads(progress["achievements"])
    new_achievements = []

    if "game_collector" not in achievements:
        achievements.append("game_collector")
        new_achievements.append(ACHIEVEMENTS_DEF["game_collector"])

    now_iso = datetime.now(timezone.utc).isoformat()

    cursor.execute("""
        UPDATE user_progress
        SET total_coins = ?, games_unlocked = ?, achievements = ?, updated_at = ?
        WHERE user_id = ?
    """, (new_coins, json.dumps(unlocked_games), json.dumps(achievements), now_iso, user_id))

    conn.commit()
    conn.close()

    return {
        "success": True,
        "unlocked_game": game_id,
        "game_name": cfg["name"],
        "coins_spent": cost,
        "coins_remaining": new_coins,
        "games_unlocked": unlocked_games,
        "new_achievements": new_achievements
    }
