"""
Bharat Quest - Database Module
SQLite connection, schema initialization, and transactional helpers.
"""

import sqlite3
import os
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, Dict, Any, List

DB_PATH = Path(__file__).resolve().parent / "bharat_quest.db"

def get_connection():
    conn = sqlite3.connect(str(DB_PATH), check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    # 1. Users Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        display_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        salt TEXT NOT NULL,
        avatar TEXT DEFAULT 'peacock',
        created_at TEXT NOT NULL
    );
    """)

    # 2. User Progress Table
    # All new users start strictly with 0 points, 0 stars, 0 coins
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS user_progress (
        user_id TEXT PRIMARY KEY,
        total_points INTEGER DEFAULT 0,
        total_stars INTEGER DEFAULT 0,
        total_coins INTEGER DEFAULT 0,
        games_completed INTEGER DEFAULT 0,
        games_unlocked TEXT DEFAULT '["chaupar", "saripat"]',
        states_explored TEXT DEFAULT '[]',
        achievements TEXT DEFAULT '[]',
        updated_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    # 3. Game Completions Table (Audit record of rewards earned)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS game_completions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        game_id TEXT NOT NULL,
        state_id TEXT NOT NULL,
        points_earned INTEGER NOT NULL,
        stars_earned INTEGER NOT NULL,
        coins_earned INTEGER NOT NULL,
        session_token TEXT NOT NULL,
        completed_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    # 4. State Progress Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS state_progress (
        user_id TEXT NOT NULL,
        state_id TEXT NOT NULL,
        points INTEGER DEFAULT 0,
        games_completed INTEGER DEFAULT 0,
        games_unlocked INTEGER DEFAULT 0,
        PRIMARY KEY (user_id, state_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    # 5. Game Sessions Table (Server-side gameplay session validation)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS game_sessions (
        session_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        game_id TEXT NOT NULL,
        state_id TEXT NOT NULL,
        created_at TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        turns INTEGER DEFAULT 0,
        completed_at TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at:", DB_PATH)
