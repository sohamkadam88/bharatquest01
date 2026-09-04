# 🏛️ Bharat Quest — Traditional Games of India

An interactive cultural-exploration and gamified platform discovering India's rich heritage of traditional games across states.

---

## 🌟 Key Features

1. **Public Landing Page:**
   - Hero: *"Discover India's Traditional Games"*
   - Interactive exploration preview and step-by-step user journey.
   - Intelligent authentication gating on interactive actions.

2. **Real Authentication & Database System:**
   - Real user registration and login with PBKDF2 cryptographic password hashing and JWT sessions.
   - SQLite ACID database with foreign keys, user profiles, progression audit tables, and game session verification.
   - **Initial balances strictly start at 0 Points, 0 Stars, 0 Coins**.

3. **Strict Economy & Anti-Tampering Engine:**
   - Points, Stars, and Coins can **ONLY** be earned through victorious online indoor gameplay.
   - Zero rewards for account creation, browsing, reading articles, or clicking buttons.
   - Cryptographic server sessions (`POST /api/games/start` & `POST /api/games/complete`) validate gameplay outcomes and prevent client tampering or duplicate reward replays.

4. **Interactive SVG India Map:**
   - High-fidelity vector map of India with interactive hover tooltips, click navigation, and dynamic state search filter.

5. **State Experience (Spotlight: Maharashtra):**
   - Live state metrics: Total Games, Indoor Games, Outdoor Games, Completed Matches, State Points, Stars, and Coins.
   - **Indoor Category:** Playable traditional board games with cowrie shell dice engines against smart AI.
   - **Outdoor Category:** Educational cultural heritage lore (Langdi, Mallakhamb, Lezim, Lagori) — strictly educational with zero artificial online gameplay or rewards.

6. **Playable Online Games:**
   - **Chaupar:** Authentic cross-and-circle cloth board with 6 cowrie shells, sanctuary safe squares, and home Charkoni corridor.
   - **Saripat:** Medieval Maratha strategy board featuring soldier mobilization, 'Jodi' pairing defense, and central Durg fortress conquest.
   - **Satkoli:** 7-concentric ring race of champions locked by default and unlocked using **200 earned Coins**.

7. **Real Working Leaderboards:**
   - **Global, State, and Weekly** rankings containing **ONLY real registered users** (zero dummy or hardcoded users).
   - Real player rank highlight badge (`Your Rank: #X`).
   - Clean empty states when no users or scores exist.

8. **Cultural AI Chatbot:**
   - Floating context-aware assistant answering questions on game rules, origins, historical significance, and state culture.

9. **Achievements & Profile Management:**
   - Real achievement unlocks (*First Step of a Warrior*, *Ancient Strategist*, *Rising Champion*, *Grandmaster of Bharat*, *Game Collector*, *Cultural Voyager*).
   - Responsive UI with Indian cultural palette (Warm Cream, Cultural Saffron, Velvet Indigo, Emerald Nature, and Heritage Gold).

---

## 🚀 Quick Start

### 1. Requirements
- Python 3.10+
- Installed packages: `fastapi`, `uvicorn`, `pyjwt`

### 2. Run the Server
From the project directory:
```bash
python run_server.py
```

### 3. Open in Browser
Navigate to:
```
http://127.0.0.1:8000
```

---

## 🧪 Running Automated Tests
The project includes complete test suites for unit testing and end-to-end user journey validation:

```bash
# Test backend authentication, security, and economy
python test_backend.py

# Test static file serving and SPA routing
python test_integration.py

# Test full end-to-end user journey simulation
python test_e2e_journey.py
```
