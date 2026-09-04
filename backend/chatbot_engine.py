"""
Bharat Quest - AI Cultural Chatbot Engine
Context-aware knowledge base, cultural history, traditional game rules,
and state heritage guidance.
"""

from typing import Dict, Any, List

CULTURAL_KNOWLEDGE = {
    "chaupar": {
        "title": "Chaupar (Chausar)",
        "summary": "Chaupar is an ancient Indian cross-and-circle board game dating back over 2,500 years, famously recorded in the Mahabharata.",
        "rules": "Played with four arms meeting at a central sanctuary (Charkoni). Players roll 6 cowrie shells (kaudis). Pawns traverse the outer track, enter their player's home arm, and finish in the Charkoni. Opponents can be captured on non-sanctuary squares.",
        "cultural_significance": "Represented royalty, strategic foresight, and philosophical balance of destiny (roll of cowrie shells) and free will (tactical pawn movement). Popularized in Maharashtra's royal courts and rural households alike.",
        "equipment": "Cross-shaped cloth/embroidered board, 4 wooden/ivory pawns per player (up to 4 players), 6 natural cowrie shells."
    },
    "saripat": {
        "title": "Saripat",
        "summary": "Saripat is a historical Marathi board game of strategy and precision, deeply celebrated in the Deccan plateau.",
        "rules": "Played on a checkered cloth grid using cowrie shells. Pieces enter from starting camps, advance along designated corridors, and block or capture adversarial pieces while racing toward the central winning square.",
        "cultural_significance": "Documented in medieval Marathi literature and courtly records of the Maratha Empire. Chhatrapati Shivaji Maharaj and the Peshwas encouraged Saripat as an indoor exercise in tactical discipline.",
        "equipment": "Checked fabric board, 6 or 4 cowrie shells, traditional lacquer-finished wooden pawns."
    },
    "satkoli": {
        "title": "Satkoli (Seven Cowries)",
        "summary": "Satkoli is an intricate race game featuring concentric squares, played predominantly in western and central India.",
        "rules": "Players roll 7 cowrie shells. Pawns navigate the outer perimeter, spiral inward past safe marked squares, and must capture at least one opposing piece before entering the sacred central zone to triumph.",
        "cultural_significance": "Passed down through generations of oral tradition, Satkoli fostered mathematical calculation, risk appraisal, and communal bonding during festivals like Diwali and Makar Sankranti.",
        "equipment": "Square concentric grid (often drawn with chalk or woven cloth), 7 cowrie shells, distinctive seed or coin counters."
    },
    "langdi": {
        "title": "Langdi",
        "summary": "Langdi is a high-agility traditional Maharashtrian outdoor sport played on one leg within a marked pitch.",
        "rules": "Two teams of 12 players (9 on court). An attacker hops on one foot across four 9-minute quarters, attempting to touch and dismiss defenders before switching legs or stepping out.",
        "cultural_significance": "A staple of rural childhood and school curricula in Maharashtra, recognized today as an organized sport by the Langdi Federation of India.",
        "equipment": "A flat field or clay court (10m x 10m to 12m x 12m), line chalk, whistle, and stopwatch."
    },
    "mallakhamb": {
        "title": "Mallakhamb",
        "summary": "Mallakhamb is an indigenous martial gymnastic art combining aerial yoga, wrestling grips, and acrobatic balance on a vertical wooden pole.",
        "rules": "Athletes execute static holds, spins, dismounts, and inversions on a polished teak or sheesham pole smeared with castor oil, judged on fluidity, difficulty, and precision.",
        "cultural_significance": "Revived in the 19th century by Balambhatta Dada Deodhar, physical trainer to the Peshwa Baji Rao II. It represents Maharashtra's warrior ethos and is recognized as the state sport of Madhya Pradesh.",
        "equipment": "Tapered wooden pole (typically 2.6m tall, 55cm base circumference) coated with castor oil to prevent friction burns."
    },
    "lezim": {
        "title": "Lezim",
        "summary": "Lezim is a vigorous folk dance and rhythmic physical training tradition of Maharashtra, accompanied by dhol and tasha beats.",
        "rules": "Performers in synchronized formations maneuver a wooden staff with jingling metallic cymbals (chimta/salakh), executing squats, lunges, and spins in unison.",
        "cultural_significance": "Integral to Ganesh Chaturthi processions, Chhatrapati Shivaji Maharaj Jayanti, and rural celebrations, emphasizing collective harmony and martial stamina.",
        "equipment": "Lezim prop (wooden handle with iron links and jingling metal discs), traditional Dhol, Tasha drums, and cymbals."
    },
    "lagori": {
        "title": "Lagori (Pitthu / Seven Stones)",
        "summary": "Lagori is an exhilarating outdoor team game testing throwing precision, dodging agility, and rapid teamwork.",
        "rules": "A team knocks down a stack of 7 flat stones with a tennis ball. While the fielding team tries to tag the attackers with the ball, the attackers must rebuild the tower and shout 'Lagori!' without getting hit.",
        "cultural_significance": "One of India's most beloved street games mentioned in ancient Bhagavata Purana texts as being played by Lord Krishna with his childhood companions in Gokul.",
        "equipment": "7 flat polished stones or discs stacked in decreasing sizes, and a soft rubber/tennis ball."
    },
    "difference": {
        "title": "Difference Between Traditional Indoor & Outdoor Games",
        "summary": "In Bharat Quest, Indoor and Outdoor games serve distinct cultural purposes:",
        "details": "1. INDOOR GAMES (e.g. Chaupar, Saripat, Satkoli) focus on strategic foresight, mathematical probability, and patient board gameplay. These are fully PLAYABLE online in your browser and award REAL Points, Stars, and Coins upon victory!\n\n2. OUTDOOR GAMES (e.g. Langdi, Mallakhamb, Lezim, Lagori) celebrate physical endurance, martial conditioning, acrobatics, and community festivals. They are strictly EDUCATIONAL (information-only), preserving living cultural heritage without artificial online gameplay or rewards."
    }
}

STATE_LORE = {
    "maharashtra": {
        "name": "Maharashtra",
        "summary": "Maharashtra has a vibrant martial and courtly gaming legacy, from the tactical boards favored by the Marathas to energetic folk arts like Lezim and Mallakhamb.",
        "indoor": ["Chaupar", "Saripat", "Satkoli"],
        "outdoor": ["Langdi", "Mallakhamb", "Lezim", "Lagori"]
    },
    "rajasthan": {
        "name": "Rajasthan",
        "summary": "The land of royals and deserts preserves royal indoor games like Changa and energetic desert games like Gilli Danda and traditional Kabaddi.",
        "indoor": ["Changa"],
        "outdoor": ["Gilli Danda", "Kabaddi"]
    },
    "karnataka": {
        "name": "Karnataka",
        "summary": "Karnataka's heritage features beloved mancala games like Ali Guli Mane alongside thrilling coastal races like Kambala buffalo racing.",
        "indoor": ["Ali Guli Mane"],
        "outdoor": ["Kambala", "Kho-Kho"]
    },
    "tamil-nadu": {
        "name": "Tamil Nadu",
        "summary": "Tamil Nadu showcases classical board math in Pallanguzhi and ancient martial disciplines like Silambam stick fighting.",
        "indoor": ["Pallanguzhi"],
        "outdoor": ["Silambam", "Kabaddi"]
    }
}

def ask_chatbot(query: str, current_state: str = "maharashtra") -> Dict[str, Any]:
    q = query.lower().strip()

    # 1. Check Indoor vs Outdoor difference
    if "difference" in q or "indoor vs outdoor" in q or "why outdoor" in q or "why no outdoor game" in q:
        diff = CULTURAL_KNOWLEDGE["difference"]
        return {
            "answer": f"**{diff['title']}**\n\n{diff['summary']}\n\n{diff['details']}",
            "context": "categories",
            "suggested_chips": [
                "What is Chaupar?",
                "What is Mallakhamb?",
                "How do I earn Coins and Points?"
            ]
        }

    # 2. Check Rewards & Economy queries
    if "point" in q or "coin" in q or "star" in q or "reward" in q or "unlock" in q:
        return {
            "answer": "⭐ **Bharat Quest Real Economy Rules:**\n\n• **Points:** Primary score for the Real Leaderboard (ranked Global, State, and Weekly).\n• **Stars:** Prestigious milestones awarded for game mastery.\n• **Coins:** Used to unlock locked indoor games like **Satkoli (200 Coins)**!\n\n**Strict Rule:** You can ONLY earn Points, Stars, and Coins by **playing and completing online indoor games**. Browsing, reading outdoor articles, or visiting states grants 0 rewards.",
            "context": "rewards",
            "suggested_chips": [
                "How to unlock Satkoli?",
                "Tell me about Chaupar rules",
                "Who is on the Leaderboard?"
            ]
        }

    # 3. Check game-specific queries
    for key, data in CULTURAL_KNOWLEDGE.items():
        if key == "difference":
            continue
        if key in q:
            return {
                "answer": f"**{data['title']}**\n\n{data['summary']}\n\n**Rules & Gameplay:**\n{data.get('rules', '')}\n\n**Cultural Significance:**\n{data.get('cultural_significance', '')}",
                "context": key,
                "suggested_chips": [
                    f"How to play {key.capitalize()}?",
                    "Difference between indoor and outdoor games?",
                    f"Tell me about {current_state.capitalize()} games"
                ]
            }

    # 4. Check State lore
    for s_slug, s_data in STATE_LORE.items():
        if s_slug in q or s_data["name"].lower() in q:
            return {
                "answer": f"🏛️ **{s_data['name']} Heritage**\n\n{s_data['summary']}\n\n🎮 **Indoor Games:** {', '.join(s_data['indoor'])}\n🌳 **Outdoor Traditions:** {', '.join(s_data['outdoor'])}",
                "context": s_slug,
                "suggested_chips": [
                    f"What is {s_data['indoor'][0]}?",
                    f"Tell me about {s_data['outdoor'][0]}",
                    "How to explore another state?"
                ]
            }

    # 5. Default contextual response
    state_info = STATE_LORE.get(current_state, STATE_LORE["maharashtra"])
    return {
        "answer": f"Namaste! I am your **Bharat Quest Cultural Guide**. You are currently exploring **{state_info['name']}**.\n\nAsk me about any traditional game (Chaupar, Saripat, Satkoli, Langdi, Mallakhamb, Lezim, Lagori), ancient rules, historical origins, or how to earn Points and Coins on the leaderboard!",
        "context": "general",
        "suggested_chips": [
            "What is Chaupar?",
            "How is Saripat played?",
            "What is Mallakhamb history?",
            "Difference between indoor & outdoor games?"
        ]
    }
