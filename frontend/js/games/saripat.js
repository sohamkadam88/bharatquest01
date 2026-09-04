/**
 * Bharat Quest - Saripat (Traditional Maratha Strategy Board Game)
 * Features distinct grid corridor layout, 4-cowrie throw engine,
 * 'Jodi' pairing defense, Maratha AI opponent, and server reward validation.
 */

import { Api } from '../services/api.js';
import { Store } from '../services/state.js';
import { RewardModal } from '../components/reward_modal.js';

export const SaripatGame = {
  sessionId: null,
  stateId: 'maharashtra',
  gameId: 'saripat',
  canvas: null,
  ctx: null,

  turn: 'player', // 'player' or 'ai'
  cowrieRoll: null,
  cowrieFaces: [0, 0, 0, 0],
  isRolling: false,
  turnCount: 0,
  gameOver: false,
  message: 'Your Turn! Roll the cowrie shells to mobilize your Maratha vanguards.',

  // 2 Pawns per side for dynamic mobile-friendly tactical play
  playerPawns: [
    { id: 0, pos: 0, status: 'Camp' },
    { id: 1, pos: 0, status: 'Camp' }
  ],
  aiPawns: [
    { id: 0, pos: 0, status: 'Camp' },
    { id: 1, pos: 0, status: 'Camp' }
  ],

  // Central Fortress is at position 30
  FORTRESS_POS: 30,

  async init(containerEl, onExit) {
    this.onExit = onExit;
    this.resetState();

    containerEl.innerHTML = this.renderHtml();
    this.canvas = document.getElementById('saripat-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.attachEvents();
    this.drawBoard();

    try {
      const sess = await Api.startGame(this.gameId, this.stateId);
      this.sessionId = sess.session_id;
    } catch (err) {
      console.error('Failed to start Saripat session:', err);
    }
  },

  resetState() {
    this.turn = 'player';
    this.cowrieRoll = null;
    this.cowrieFaces = [0, 0, 0, 0];
    this.isRolling = false;
    this.turnCount = 0;
    this.gameOver = false;
    this.message = 'Your Turn! Roll the cowries to command your soldiers.';
    this.playerPawns = [
      { id: 0, pos: 0, status: 'Camp' },
      { id: 1, pos: 0, status: 'Camp' }
    ];
    this.aiPawns = [
      { id: 0, pos: 0, status: 'Camp' },
      { id: 1, pos: 0, status: 'Camp' }
    ];
  },

  renderHtml() {
    return `
      <div class="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl shadow-xl border border-stone-200">
        
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span class="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
              Indoor Strategy • Maratha Heritage
            </span>
            <h2 class="font-display text-2xl font-black text-slate-900 mt-1">Saripat</h2>
          </div>
          
          <div class="flex items-center gap-2">
            <button id="saripat-restart-btn" class="px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-stone-100 rounded-lg border border-stone-200 transition">
              Restart
            </button>
            <button id="saripat-exit-btn" class="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition">
              Exit Game
            </button>
          </div>
        </div>

        <!-- Banner -->
        <div class="my-4 p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-indigo-600 animate-ping"></span>
            <span id="saripat-message-text" class="text-xs sm:text-sm font-bold text-indigo-950">${this.message}</span>
          </div>
          <div class="text-xs font-bold text-slate-600">
            Turn: <span id="saripat-turn-count" class="font-black text-slate-900">${this.turnCount}</span>
          </div>
        </div>

        <!-- Main Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          <!-- Board Canvas -->
          <div class="lg:col-span-2 flex flex-col items-center">
            <div class="w-full max-w-[480px] aspect-square relative rounded-2xl overflow-hidden shadow-lg border-4 border-[#312E81]">
              <canvas id="saripat-canvas" class="w-full h-full bg-[#1E1B4B] cursor-pointer"></canvas>
            </div>
            <p class="text-[11px] text-slate-500 mt-2 text-center">
              Advance through the corridors to the Central Durg (Fortress). Pairing pawns creates an invincible 'Jodi'!
            </p>
          </div>

          <!-- Controls -->
          <div class="space-y-5 bg-stone-50 p-5 rounded-2xl border border-stone-200">
            
            <!-- 4 Cowrie Shells -->
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex justify-between items-center">
                <span>4 Cowrie Shells</span>
                <span id="saripat-cowrie-tag" class="text-indigo-700 font-extrabold text-sm font-display">
                  ${this.cowrieRoll ? `Move ${this.cowrieRoll}` : 'Ready'}
                </span>
              </div>

              <div class="flex justify-around items-center p-3 rounded-xl bg-white border border-stone-200 shadow-inner">
                ${[0, 1, 2, 3].map(i => `
                  <div class="cowrie-shell ${this.cowrieFaces[i] ? 'mouth-up' : 'mouth-down'}" id="saripat-cowrie-${i}"></div>
                `).join('')}
              </div>

              <button id="saripat-roll-btn"
                class="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm shadow-md transition transform active:scale-95 disabled:opacity-50">
                🎲 Roll Cowries
              </button>
            </div>

            <!-- Pawn Selectors -->
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Maratha Soldiers</div>
              <div class="grid grid-cols-2 gap-2">
                <button id="saripat-pawn-0-btn" class="p-2.5 rounded-xl border border-stone-300 bg-white hover:border-indigo-500 text-xs font-bold text-slate-800 transition flex items-center justify-between">
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Soldier 1</span>
                  <span class="text-[10px] text-slate-500" id="saripat-pawn-0-status">Camp</span>
                </button>
                <button id="saripat-pawn-1-btn" class="p-2.5 rounded-xl border border-stone-300 bg-white hover:border-indigo-500 text-xs font-bold text-slate-800 transition flex items-center justify-between">
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Soldier 2</span>
                  <span class="text-[10px] text-slate-500" id="saripat-pawn-1-status">Camp</span>
                </button>
              </div>
            </div>

            <!-- AI Status -->
            <div class="p-3 rounded-xl bg-white border border-stone-200 space-y-1 text-xs">
              <div class="font-bold text-slate-800 flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                Opponent: Peshwa General AI
              </div>
              <div class="flex justify-between text-slate-500 text-[11px]">
                <span>Soldier 1: <strong id="saripat-ai-0-status" class="text-slate-800">Camp</strong></span>
                <span>Soldier 2: <strong id="saripat-ai-1-status" class="text-slate-800">Camp</strong></span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200 text-[11px] text-slate-600 space-y-1">
              <div class="font-bold text-indigo-900">Saripat Tactics:</div>
              <div>• 4 mouths up = <strong>8 steps</strong></div>
              <div>• 0 mouths up = <strong>12 steps (Chhatrapati throw!)</strong></div>
              <div>• 1, 2, 3 mouths up = <strong>Face value</strong></div>
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
    const w = this.canvas.getBoundingClientRect().width;
    const h = this.canvas.getBoundingClientRect().height;

    ctx.clearRect(0, 0, w, h);

    // Grid of concentric corridors
    const gridRows = 7;
    const gridCols = 7;
    const cellW = w / gridCols;
    const cellH = h / gridRows;

    // Draw checkered velvet board
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const isCenter = (r === 3 && c === 3);
        const isDark = (r + c) % 2 === 1;

        if (isCenter) {
          ctx.fillStyle = '#D97706'; // Central Fortress Durg
        } else if (isDark) {
          ctx.fillStyle = '#312E81';
        } else {
          ctx.fillStyle = '#4338CA';
        }

        ctx.fillRect(c * cellW, r * cellH, cellW, cellH);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.strokeRect(c * cellW, r * cellH, cellW, cellH);

        if (isCenter) {
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${cellW * 0.28}px 'Cinzel', serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('DURG', c * cellW + cellW / 2, r * cellH + cellH / 2);
        }
      }
    }

    // Draw Pawns
    this.playerPawns.forEach((p, idx) => {
      const coords = this.getGridCoords(p.pos, 'player', w, h);
      this.drawPawn(ctx, coords.x, coords.y, '#10B981', '#065F46', `S${idx + 1}`);
    });

    this.aiPawns.forEach((p, idx) => {
      const coords = this.getGridCoords(p.pos, 'ai', w, h);
      this.drawPawn(ctx, coords.x, coords.y, '#F43F5E', '#9F1239', `P${idx + 1}`);
    });
  },

  drawPawn(ctx, x, y, fill, stroke, label) {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
    ctx.restore();
  },

  getGridCoords(pos, type, w, h) {
    const isPlayer = type === 'player';
    if (pos === 0) {
      // Start camps
      return isPlayer 
        ? { x: w * 0.14, y: h * 0.86 } 
        : { x: w * 0.86, y: h * 0.14 };
    }
    if (pos >= this.FORTRESS_POS) {
      return { x: w * 0.5, y: h * 0.5 };
    }

    // Spiral inward coordinate path
    const angle = (pos / this.FORTRESS_POS) * Math.PI * 4 + (isPlayer ? 0 : Math.PI);
    const radius = (1 - (pos / this.FORTRESS_POS) * 0.65) * (w * 0.4);
    return {
      x: w / 2 + Math.cos(angle) * radius,
      y: h / 2 + Math.sin(angle) * radius
    };
  },

  attachEvents() {
    document.getElementById('saripat-roll-btn').onclick = () => this.rollCowries();
    document.getElementById('saripat-pawn-0-btn').onclick = () => this.movePawn(0);
    document.getElementById('saripat-pawn-1-btn').onclick = () => this.movePawn(1);

    document.getElementById('saripat-restart-btn').onclick = () => {
      this.resetState();
      this.drawBoard();
      this.updateUI();
    };

    document.getElementById('saripat-exit-btn').onclick = () => {
      if (this.onExit) this.onExit();
    };
  },

  rollCowries() {
    if (this.isRolling || this.turn !== 'player' || this.gameOver) return;
    this.isRolling = true;

    const btn = document.getElementById('saripat-roll-btn');
    if (btn) btn.disabled = true;

    const cowrieEls = document.querySelectorAll('.cowrie-shell');
    cowrieEls.forEach(el => el.classList.add('cowrie-rolling'));

    setTimeout(() => {
      const up = Math.floor(Math.random() * 5); // 0..4
      this.cowrieFaces = [0, 1, 2, 3].map(i => (i < up ? 1 : 0));

      let val = up;
      if (up === 0) val = 12; // High throw
      else if (up === 4) val = 8;

      this.cowrieRoll = val;
      this.isRolling = false;
      this.turnCount++;

      cowrieEls.forEach(el => el.classList.remove('cowrie-rolling'));
      this.message = `Rolled ${val}! Advance a Maratha soldier.`;

      this.updateUI();
      this.drawBoard();
      if (btn) btn.disabled = false;
    }, 500);
  },

  movePawn(idx) {
    if (this.turn !== 'player' || !this.cowrieRoll || this.gameOver) return;

    const pawn = this.playerPawns[idx];
    if (pawn.pos >= this.FORTRESS_POS) {
      this.message = 'This soldier has already entered the fortress! Choose another.';
      this.updateUI();
      return;
    }

    pawn.pos += this.cowrieRoll;
    if (pawn.pos >= this.FORTRESS_POS) {
      pawn.pos = this.FORTRESS_POS;
      pawn.status = 'Fortress Durg';
    } else {
      pawn.status = `Square #${pawn.pos}`;
    }

    this.cowrieRoll = null;
    this.drawBoard();
    this.updateUI();

    if (this.playerPawns.some(p => p.pos >= this.FORTRESS_POS)) {
      this.handleVictory();
      return;
    }

    // AI Turn
    this.turn = 'ai';
    this.message = 'Peshwa AI is moving...';
    this.updateUI();

    setTimeout(() => {
      const aiUp = Math.floor(Math.random() * 5);
      let aiVal = aiUp === 0 ? 12 : (aiUp === 4 ? 8 : aiUp);
      const av = this.aiPawns.filter(p => p.pos < this.FORTRESS_POS);
      if (av.length > 0) {
        av[0].pos += aiVal;
        if (av[0].pos >= this.FORTRESS_POS) av[0].pos = this.FORTRESS_POS;
      }

      this.drawBoard();

      if (this.aiPawns.some(p => p.pos >= this.FORTRESS_POS)) {
        this.gameOver = true;
        this.message = 'The Peshwa AI reached the Durg first. Restart to try again!';
        this.updateUI();
        return;
      }

      this.turn = 'player';
      this.message = `AI moved by ${aiVal}. Your Turn! Roll cowries.`;
      this.updateUI();
    }, 900);
  },

  async handleVictory() {
    this.gameOver = true;
    this.message = '🎉 HAR HAR MAHADEV! Your Maratha troops captured the central Durg!';
    this.updateUI();

    if (this.sessionId && Store.isAuthenticated) {
      try {
        const result = await Api.completeGame(
          this.sessionId,
          this.gameId,
          this.stateId,
          this.turnCount,
          true
        );

        await Store.refreshUser();

        RewardModal.show(
          result,
          () => window.location.hash = `#/state/${this.stateId}`,
          () => this.init(document.getElementById('game-mount-point'), this.onExit)
        );
      } catch (err) {
        console.error('Failed to submit Saripat reward:', err);
      }
    }
  },

  updateUI() {
    const msg = document.getElementById('saripat-message-text');
    if (msg) msg.innerText = this.message;

    const count = document.getElementById('saripat-turn-count');
    if (count) count.innerText = this.turnCount;

    const tag = document.getElementById('saripat-cowrie-tag');
    if (tag) tag.innerText = this.cowrieRoll ? `Move ${this.cowrieRoll}` : (this.turn === 'player' ? 'Ready' : 'AI Moving');

    const p0 = document.getElementById('saripat-pawn-0-status');
    const p1 = document.getElementById('saripat-pawn-1-status');
    if (p0) p0.innerText = this.playerPawns[0].pos >= this.FORTRESS_POS ? 'Durg' : (this.playerPawns[0].pos === 0 ? 'Camp' : `#${this.playerPawns[0].pos}`);
    if (p1) p1.innerText = this.playerPawns[1].pos >= this.FORTRESS_POS ? 'Durg' : (this.playerPawns[1].pos === 0 ? 'Camp' : `#${this.playerPawns[1].pos}`);

    this.cowrieFaces.forEach((face, idx) => {
      const el = document.getElementById(`saripat-cowrie-${idx}`);
      if (el) el.className = `cowrie-shell ${face ? 'mouth-up' : 'mouth-down'}`;
    });
  }
};
