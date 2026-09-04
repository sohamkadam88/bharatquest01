/**
 * Bharat Quest - Chaupar (Traditional Indian Cross-and-Circle Game)
 * Authentic board layout, 6 cowrie shells roll engine, safe squares,
 * capture mechanics, AI opponent, and server-validated completion.
 */

import { Api } from '../services/api.js';
import { Store } from '../services/state.js';
import { RewardModal } from '../components/reward_modal.js';

export const ChauparGame = {
  sessionId: null,
  stateId: 'maharashtra',
  gameId: 'chaupar',
  canvas: null,
  ctx: null,
  
  // Game state
  turn: 'player', // 'player' or 'ai'
  cowrieRoll: null,
  cowrieFaces: [0, 0, 0, 0, 0, 0],
  isRolling: false,
  turnCount: 0,
  gameOver: false,
  message: 'Your Turn! Roll the six sacred cowrie shells to begin.',

  // Player & AI pawns: positions on track (0 = at start camp, 1..48 = track, 49 = Charkoni Home)
  // Win condition: reach Charkoni (49)
  playerPawns: [
    { id: 0, pos: 0, status: 'home' },
    { id: 1, pos: 0, status: 'home' }
  ],
  aiPawns: [
    { id: 0, pos: 0, status: 'home' },
    { id: 1, pos: 0, status: 'home' }
  ],

  // Track safe squares where pieces cannot be captured (Sanctuaries)
  safeSquares: [1, 7, 13, 19, 25, 31, 37, 43],

  async init(containerEl, onExit) {
    this.onExit = onExit;
    this.resetState();

    containerEl.innerHTML = this.renderHtml();
    this.canvas = document.getElementById('chaupar-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Resize canvas for high DPI
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.attachEvents();
    this.drawBoard();

    // Start server session for secure reward verification
    try {
      const sess = await Api.startGame(this.gameId, this.stateId);
      this.sessionId = sess.session_id;
    } catch (err) {
      console.error('Failed to initiate game session:', err);
      this.message = 'Notice: Playing in offline demo mode. Login to save rewards.';
      this.updateUI();
    }
  },

  resetState() {
    this.turn = 'player';
    this.cowrieRoll = null;
    this.cowrieFaces = [0, 0, 0, 0, 0, 0];
    this.isRolling = false;
    this.turnCount = 0;
    this.gameOver = false;
    this.message = 'Your Turn! Roll the sacred cowrie shells.';
    this.playerPawns = [
      { id: 0, pos: 0, status: 'home' },
      { id: 1, pos: 0, status: 'home' }
    ];
    this.aiPawns = [
      { id: 0, pos: 0, status: 'home' },
      { id: 1, pos: 0, status: 'home' }
    ];
  },

  renderHtml() {
    return `
      <div class="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl shadow-xl border border-stone-200">
        
        <!-- Game Top Header Bar -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
              Indoor Board • Maharashtra
            </span>
            <h2 class="font-display text-2xl font-black text-slate-900 mt-1">Chaupar (Chausar)</h2>
          </div>
          
          <div class="flex items-center gap-2">
            <button id="chaupar-restart-btn" class="px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-stone-100 rounded-lg border border-stone-200 transition">
              Restart
            </button>
            <button id="chaupar-exit-btn" class="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition">
              Exit Game
            </button>
          </div>
        </div>

        <!-- Status & Live Instructions Banner -->
        <div id="chaupar-status-banner" class="my-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span id="chaupar-turn-indicator" class="w-3 h-3 rounded-full bg-orange-500 animate-ping"></span>
            <span id="chaupar-message-text" class="text-xs sm:text-sm font-bold text-amber-950">${this.message}</span>
          </div>
          <div class="text-xs font-bold text-slate-600">
            Turn: <span id="chaupar-turn-count" class="font-black text-slate-900">${this.turnCount}</span>
          </div>
        </div>

        <!-- Main Board & Control Area -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          <!-- Board Canvas Column -->
          <div class="lg:col-span-2 flex flex-col items-center">
            <div class="w-full max-w-[500px] aspect-square relative rounded-2xl overflow-hidden shadow-lg border-4 border-[#7F1D1D]">
              <canvas id="chaupar-canvas" class="w-full h-full cursor-pointer bg-[#991B1B]"></canvas>
            </div>
            <p class="text-[11px] text-slate-500 mt-2 text-center">
              Click a pawn on the board or click its button below when a move is available. Squares with ✖ are safe sanctuaries.
            </p>
          </div>

          <!-- Controls & Cowrie Shells Dashboard -->
          <div class="space-y-5 bg-stone-50 p-5 rounded-2xl border border-stone-200">
            
            <!-- Sacred Cowrie Shells Dice Container -->
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex justify-between items-center">
                <span>Natural Cowrie Shells (Kaudis)</span>
                <span id="cowrie-value-tag" class="text-amber-700 font-extrabold text-sm font-display">
                  ${this.cowrieRoll ? `Move ${this.cowrieRoll}` : 'Ready'}
                </span>
              </div>

              <!-- 6 Cowrie Shell Icons -->
              <div id="cowrie-shells-row" class="flex justify-between items-center p-3 rounded-xl bg-white border border-stone-200 shadow-inner">
                ${[0, 1, 2, 3, 4, 5].map(i => `
                  <div class="cowrie-shell ${this.cowrieFaces[i] ? 'mouth-up' : 'mouth-down'}" id="cowrie-${i}"></div>
                `).join('')}
              </div>

              <!-- Throw Button -->
              <button id="chaupar-roll-btn"
                class="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold text-sm shadow-md transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                🎲 Roll 6 Cowrie Shells
              </button>
            </div>

            <!-- Player Pawns Selector -->
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Your Red Pawns</div>
              <div class="grid grid-cols-2 gap-2" id="pawn-select-buttons">
                <button id="btn-move-pawn-0" class="pawn-btn p-2.5 rounded-xl border border-stone-300 bg-white hover:border-orange-500 text-xs font-bold text-slate-800 transition flex items-center justify-between">
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-red-600 inline-block"></span> Pawn 1</span>
                  <span class="text-[10px] text-slate-500 font-medium" id="pawn-0-status">Base</span>
                </button>
                <button id="btn-move-pawn-1" class="pawn-btn p-2.5 rounded-xl border border-stone-300 bg-white hover:border-orange-500 text-xs font-bold text-slate-800 transition flex items-center justify-between">
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-red-600 inline-block"></span> Pawn 2</span>
                  <span class="text-[10px] text-slate-500 font-medium" id="pawn-1-status">Base</span>
                </button>
              </div>
            </div>

            <!-- Opponent Status -->
            <div class="p-3 rounded-xl bg-white border border-stone-200 space-y-1.5 text-xs">
              <div class="font-bold text-slate-800 flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-600 inline-block"></span>
                Opponent: Ancient Sage AI
              </div>
              <div class="flex justify-between text-slate-500 text-[11px]">
                <span>Pawn 1: <strong id="ai-pawn-0-status" class="text-slate-800">Base</strong></span>
                <span>Pawn 2: <strong id="ai-pawn-1-status" class="text-slate-800">Base</strong></span>
              </div>
            </div>

            <!-- Traditional Rules Quick Guide -->
            <div class="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-[11px] text-slate-600 space-y-1">
              <div class="font-bold text-amber-900">Traditional Cowrie Scoring:</div>
              <div>• 5 mouths up = <strong>25 (Pachis!)</strong></div>
              <div>• 6 mouths up = <strong>35</strong></div>
              <div>• 1 mouth up = <strong>10</strong></div>
              <div>• 0 mouths up = <strong>6</strong></div>
              <div>• 2, 3, 4 mouths up = <strong>Face value</strong></div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.drawBoard();
  },

  drawBoard() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const width = this.canvas.getBoundingClientRect().width;
    const height = this.canvas.getBoundingClientRect().height;

    ctx.clearRect(0, 0, width, height);

    // Cross Board Geometry (3x3 grid where corners are empty and center is Charkoni)
    const armW = width / 3;
    const armH = height / 3;

    // Draw Cross background (Velvet Red felt)
    ctx.fillStyle = '#991B1B';
    ctx.fillRect(armW, 0, armW, height); // Vertical arm
    ctx.fillRect(0, armH, width, armH); // Horizontal arm

    // Central Charkoni (The sacred goal sanctuary)
    ctx.fillStyle = '#7F1D1D';
    ctx.fillRect(armW, armH, armW, armH);
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3;
    ctx.strokeRect(armW + 4, armH + 4, armW - 8, armH - 8);

    // Charkoni Mandana Star Motif
    ctx.fillStyle = '#F59E0B';
    ctx.font = `bold ${Math.floor(armW / 5)}px 'Cinzel', serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('CHARKONI', width / 2, height / 2 - 10);
    ctx.font = '16px sans-serif';
    ctx.fillText('🪷', width / 2, height / 2 + 16);

    // Draw Tracks and Safe Cross Squares on each arm
    const cellW = armW / 3;
    const cellH = armH / 8;

    ctx.strokeStyle = 'rgba(254, 243, 199, 0.4)';
    ctx.lineWidth = 1;

    // Top Arm Cells (Vertical)
    for (let c = 0; c < 3; c++) {
      for (let r = 0; r < 8; r++) {
        const x = armW + c * cellW;
        const y = r * cellH;
        ctx.strokeRect(x, y, cellW, cellH);
        // Mark crosses on safe squares
        if ((c === 1 && r === 4) || (c === 0 && r === 2) || (c === 2 && r === 6)) {
          this.drawSanctuaryCross(ctx, x, y, cellW, cellH);
        }
      }
    }

    // Bottom Arm Cells (Vertical)
    for (let c = 0; c < 3; c++) {
      for (let r = 0; r < 8; r++) {
        const x = armW + c * cellW;
        const y = armH * 2 + r * cellH;
        ctx.strokeRect(x, y, cellW, cellH);
        if ((c === 1 && r === 3) || (c === 0 && r === 5) || (c === 2 && r === 1)) {
          this.drawSanctuaryCross(ctx, x, y, cellW, cellH);
        }
      }
    }

    // Left Arm Cells (Horizontal)
    const hCellW = armW / 8;
    const hCellH = armH / 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 8; c++) {
        const x = c * hCellW;
        const y = armH + r * hCellH;
        ctx.strokeRect(x, y, hCellW, hCellH);
        if ((r === 1 && c === 4) || (r === 0 && c === 2) || (r === 2 && c === 6)) {
          this.drawSanctuaryCross(ctx, x, y, hCellW, hCellH);
        }
      }
    }

    // Right Arm Cells (Horizontal)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 8; c++) {
        const x = armW * 2 + c * hCellW;
        const y = armH + r * hCellH;
        ctx.strokeRect(x, y, hCellW, hCellH);
        if ((r === 1 && c === 3) || (r === 0 && c === 5) || (r === 2 && c === 1)) {
          this.drawSanctuaryCross(ctx, x, y, hCellW, hCellH);
        }
      }
    }

    // Draw Player Pawns (Red)
    this.playerPawns.forEach(p => {
      const coords = this.getPawnCoordinates(p.pos, 'player', width, height);
      this.drawPawn(ctx, coords.x, coords.y, '#EF4444', '#7F1D1D', `P${p.id + 1}`);
    });

    // Draw AI Pawns (Gold/Yellow)
    this.aiPawns.forEach(p => {
      const coords = this.getPawnCoordinates(p.pos, 'ai', width, height);
      this.drawPawn(ctx, coords.x, coords.y, '#F59E0B', '#B45309', `A${p.id + 1}`);
    });
  },

  drawSanctuaryCross(ctx, x, y, w, h) {
    ctx.save();
    ctx.strokeStyle = '#FCD34D';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 4);
    ctx.lineTo(x + w - 4, y + h - 4);
    ctx.moveTo(x + w - 4, y + 4);
    ctx.lineTo(x + 4, y + h - 4);
    ctx.stroke();
    ctx.restore();
  },

  drawPawn(ctx, x, y, fill, stroke, label) {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;

    // Pawn body
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, 13, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Inner crown
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);

    ctx.restore();
  },

  getPawnCoordinates(pos, playerType, w, h) {
    const isPlayer = playerType === 'player';
    
    // Base/Home Camp Coordinates
    if (pos === 0) {
      if (isPlayer) {
        return { x: w * 0.18, y: h * 0.82 };
      } else {
        return { x: w * 0.82, y: h * 0.18 };
      }
    }

    // Reached Charkoni Sanctuary!
    if (pos >= 48) {
      return {
        x: w * 0.5 + (isPlayer ? -18 : 18),
        y: h * 0.5
      };
    }

    // Interpolate around the track based on position 1..47
    // Simplified radial trajectory for fluid visualization
    const progress = pos / 48;
    const angle = progress * Math.PI * 2 + (isPlayer ? 0 : Math.PI);
    const radius = Math.min(w, h) * 0.38;

    return {
      x: w / 2 + Math.cos(angle) * radius,
      y: h / 2 + Math.sin(angle) * radius
    };
  },

  attachEvents() {
    const rollBtn = document.getElementById('chaupar-roll-btn');
    if (rollBtn) {
      rollBtn.onclick = () => this.rollCowrieShells();
    }

    const p0Btn = document.getElementById('btn-move-pawn-0');
    const p1Btn = document.getElementById('btn-move-pawn-1');
    if (p0Btn) p0Btn.onclick = () => this.movePlayerPawn(0);
    if (p1Btn) p1Btn.onclick = () => this.movePlayerPawn(1);

    const restartBtn = document.getElementById('chaupar-restart-btn');
    if (restartBtn) {
      restartBtn.onclick = () => {
        this.resetState();
        this.updateUI();
        this.drawBoard();
      };
    }

    const exitBtn = document.getElementById('chaupar-exit-btn');
    if (exitBtn) {
      exitBtn.onclick = () => {
        if (this.onExit) this.onExit();
      };
    }
  },

  rollCowrieShells() {
    if (this.isRolling || this.turn !== 'player' || this.gameOver) return;
    this.isRolling = true;

    const rollBtn = document.getElementById('chaupar-roll-btn');
    if (rollBtn) rollBtn.disabled = true;

    // Trigger visual roll animation on cowrie shells
    const cowrieEls = document.querySelectorAll('.cowrie-shell');
    cowrieEls.forEach(el => el.classList.add('cowrie-rolling'));

    setTimeout(() => {
      // Roll 6 cowrie shells
      const mouthsUpCount = Math.floor(Math.random() * 7); // 0 to 6
      this.cowrieFaces = [0, 0, 0, 0, 0, 0].map((_, i) => (i < mouthsUpCount ? 1 : 0));

      // Calculate Traditional Chaupar Movement Value
      let moveVal = 0;
      if (mouthsUpCount === 5) moveVal = 25; // Pachis!
      else if (mouthsUpCount === 6) moveVal = 35;
      else if (mouthsUpCount === 1) moveVal = 10;
      else if (mouthsUpCount === 0) moveVal = 6;
      else moveVal = mouthsUpCount; // 2, 3, 4

      this.cowrieRoll = moveVal;
      this.isRolling = false;
      this.turnCount++;

      cowrieEls.forEach(el => el.classList.remove('cowrie-rolling'));
      this.message = `Rolled ${moveVal}! Select a pawn to advance.`;

      this.updateUI();
      this.drawBoard();

      if (rollBtn) rollBtn.disabled = false;
    }, 600);
  },

  movePlayerPawn(pawnIndex) {
    if (this.turn !== 'player' || !this.cowrieRoll || this.gameOver) return;

    const pawn = this.playerPawns[pawnIndex];
    if (pawn.pos >= 48) {
      this.message = `Pawn ${pawnIndex + 1} has already attained Charkoni! Choose another pawn.`;
      this.updateUI();
      return;
    }

    // Advance pawn
    pawn.pos += this.cowrieRoll;
    if (pawn.pos >= 48) {
      pawn.pos = 48; // Home!
      pawn.status = 'Charkoni';
    } else {
      pawn.status = `Track #${pawn.pos}`;
    }

    // Check for capture of AI pawn
    this.checkCaptures('player', pawn.pos);

    this.cowrieRoll = null;
    this.drawBoard();
    this.updateUI();

    // Check Win Condition (Either pawn reaches Charkoni or total score)
    if (this.playerPawns.some(p => p.pos >= 48)) {
      this.handleGameWon();
      return;
    }

    // Switch to AI turn
    this.turn = 'ai';
    this.message = 'Opponent (Ancient Sage AI) is deliberating...';
    this.updateUI();

    setTimeout(() => this.executeAITurn(), 1000);
  },

  executeAITurn() {
    if (this.gameOver) return;

    // AI rolls cowries
    const mouthsUpCount = Math.floor(Math.random() * 7);
    this.cowrieFaces = [0, 0, 0, 0, 0, 0].map((_, i) => (i < mouthsUpCount ? 1 : 0));

    let moveVal = 0;
    if (mouthsUpCount === 5) moveVal = 25;
    else if (mouthsUpCount === 6) moveVal = 35;
    else if (mouthsUpCount === 1) moveVal = 10;
    else if (mouthsUpCount === 0) moveVal = 6;
    else moveVal = mouthsUpCount;

    // AI selects best pawn
    const availablePawns = this.aiPawns.filter(p => p.pos < 48);
    if (availablePawns.length > 0) {
      const chosenPawn = availablePawns[0];
      chosenPawn.pos += moveVal;
      if (chosenPawn.pos >= 48) chosenPawn.pos = 48;
      this.checkCaptures('ai', chosenPawn.pos);
    }

    this.drawBoard();

    // Check AI win
    if (this.aiPawns.some(p => p.pos >= 48)) {
      this.gameOver = true;
      this.message = 'The Sage AI reached Charkoni first. Play again to claim victory!';
      this.updateUI();
      return;
    }

    // Switch back to player
    this.turn = 'player';
    this.cowrieRoll = null;
    this.message = `AI advanced by ${moveVal}. Your Turn! Roll cowries.`;
    this.updateUI();
  },

  checkCaptures(attackerType, targetPos) {
    if (this.safeSquares.includes(targetPos)) return; // Safe sanctuary

    if (attackerType === 'player') {
      this.aiPawns.forEach(aiP => {
        if (aiP.pos === targetPos && aiP.pos > 0 && aiP.pos < 48) {
          aiP.pos = 0; // Captured! Send back to start camp
          this.message = '⚔️ Brilliant! You captured an AI pawn and sent it back to camp!';
        }
      });
    } else {
      this.playerPawns.forEach(plP => {
        if (plP.pos === targetPos && plP.pos > 0 && plP.pos < 48) {
          plP.pos = 0; // Captured
          this.message = '⚠️ The AI captured your pawn!';
        }
      });
    }
  },

  async handleGameWon() {
    this.gameOver = true;
    this.message = '🎉 VICTORY! All pawns entered the sacred Charkoni sanctuary!';
    this.updateUI();

    // Verify completion with server session
    if (this.sessionId && Store.isAuthenticated) {
      try {
        const result = await Api.completeGame(
          this.sessionId,
          this.gameId,
          this.stateId,
          this.turnCount,
          true
        );

        // Synchronize updated user balances from database
        await Store.refreshUser();

        // Show Animated Reward Modal with Real Database Totals
        RewardModal.show(
          result,
          () => {
            // Continue journey
            window.location.hash = `#/state/${this.stateId}`;
          },
          () => {
            // Replay
            this.init(document.getElementById('game-mount-point'), this.onExit);
          }
        );
      } catch (err) {
        console.error('Error submitting game completion:', err);
        alert(err.message || 'Error saving reward.');
      }
    } else {
      alert('🎉 Game Completed! Log in to save your verified Points, Stars, and Coins to the database.');
    }
  },

  updateUI() {
    const msgEl = document.getElementById('chaupar-message-text');
    if (msgEl) msgEl.innerText = this.message;

    const turnCountEl = document.getElementById('chaupar-turn-count');
    if (turnCountEl) turnCountEl.innerText = this.turnCount;

    const valTag = document.getElementById('cowrie-value-tag');
    if (valTag) valTag.innerText = this.cowrieRoll ? `Move ${this.cowrieRoll}` : (this.turn === 'player' ? 'Ready' : 'AI Thinking');

    const p0Status = document.getElementById('pawn-0-status');
    const p1Status = document.getElementById('pawn-1-status');
    if (p0Status) p0Status.innerText = this.playerPawns[0].pos >= 48 ? 'Charkoni' : (this.playerPawns[0].pos === 0 ? 'Base' : `#${this.playerPawns[0].pos}`);
    if (p1Status) p1Status.innerText = this.playerPawns[1].pos >= 48 ? 'Charkoni' : (this.playerPawns[1].pos === 0 ? 'Base' : `#${this.playerPawns[1].pos}`);

    const ai0Status = document.getElementById('ai-pawn-0-status');
    const ai1Status = document.getElementById('ai-pawn-1-status');
    if (ai0Status) ai0Status.innerText = this.aiPawns[0].pos >= 48 ? 'Charkoni' : (this.aiPawns[0].pos === 0 ? 'Base' : `#${this.aiPawns[0].pos}`);
    if (ai1Status) ai1Status.innerText = this.aiPawns[1].pos >= 48 ? 'Charkoni' : (this.aiPawns[1].pos === 0 ? 'Base' : `#${this.aiPawns[1].pos}`);

    // Update Cowrie Shell Visuals
    this.cowrieFaces.forEach((face, idx) => {
      const el = document.getElementById(`cowrie-${idx}`);
      if (el) {
        el.className = `cowrie-shell ${face ? 'mouth-up' : 'mouth-down'}`;
      }
    });
  }
};
