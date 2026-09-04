"""
Bharat Quest - Development & Production Server Runner
Runs the full-stack FastAPI application on http://127.0.0.1:8000
"""

import sys
from pathlib import Path

# Add backend directory to python path
sys.path.insert(0, str(Path(__file__).resolve().parent / "backend"))

import uvicorn

if __name__ == "__main__":
    print("============================================================")
    print("BHARAT QUEST — Traditional Games of India")
    print("Full-Stack Web Application Server")
    print("Starting on: http://127.0.0.1:8000")
    print("Open http://127.0.0.1:8000 in your browser to begin exploring!")
    print("============================================================")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
