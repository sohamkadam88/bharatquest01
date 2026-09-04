/**
 * Bharat Quest - Satkoli (Sacred Seven-Concentric Race of Champions)
 * Features 7-cowrie shell dice engine, lock verification (200 Coins),
 * concentric track navigation, AI opponent, and server reward validation.
 */

import { Api } from '../services/api.js';
import { Store } from '../services/state.js';
import { RewardModal } from '../components/reward_modal.js';
import { UnlockModal } from '../components/unlock_modal.js';
import { STATES_DATA } from '../data/states_data.js';

export const SatkoliGame = {
  sessionId: null,
  stateId: 'maharashtra',
  gameId: 'satkoli',
  canvas: null,
  ctx: null,

  turn: 'player',
  cowrieRoll: null,
  cowrieFaces: [0, 0, 0, 0, 0, 0, 0],
  isRolling: false,
  turnCount: 0,
  gameOver: false,
  message: 'Your Turn! Roll the seven sacred cowrie shells.',

  playerPawns: [
    { id: 0, pos: 0, status: 'Outer Ring' },
    { id: 1, pos: 0, status: 'Outer Ring' }
  ],
  aiPawns: [
    { id: 0, pos: 0, status: 'Outer Ring' },
    { id: 1, pos: 0, status: 'Outer Ring' }
  ],

  SANCTUM_POS: 35,

  async init(containerEl, onExit) {
    this.onExit = onExit;
    this.containerEl = containerEl;

    // Check if unlocked in real user progress
    const user = Store.currentUser;
    const unlockedList = user?.games_unlocked || ['chaupar', 'saripat'];
    const isUnlocked = unlockedList.includes(this.gameId);

    if (!isUnlocked) {
      this.renderLockedScreen(containerEl);
      return;
    }

    this.resetState();
    containerEl.innerHTML = this.renderHtml();
    this.canvas = document.getElementById('satkoli-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.attachEvents();
    this.drawBoard();

    try {
      const sess = await Api.startGame(this.gameId, this.stateId);
      this.sessionId = sess.session_id;
    } catch (err) {
      console.error('Failed to start Satkoli session:', err);
    }
  },

  renderLockedScreen(containerEl) {
    const gameDef = STATES_DATA.maharashtra.indoorGames.find(g => g.id === 'satkoli');
    const user = Store.currentUser;
    const coins = user?.total_coins ?? 0;
    const canUnlock = coins >= 200;

    containerEl.innerHTML = `
      <div class="max-w-2xl mx-auto p-8 sm:p-12 bg-white rounded-3xl shadow-xl border-2 border-dashed border-purple-300 text-center">
        <div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-purple-50 border-2 border-purple-200 text-purple-700 flex items-center justify-center text-5xl shadow-sm">
          🔒
        </div>
        <span class="px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
          Advanced Traditional Game
        </span>
        <h2 class="font-display text-3xl font-black text-slate-900 mt-2 mb-2">Satkoli is Locked</h2>
        <p class="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
          Satkoli is a revered seven-concentric game of champions. Prove your mastery by unlocking it with <strong>200 Coins</strong> earned through indoor gameplay.
        </p>

        <!-- Balance Card -->
        <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200 max-w-sm mx-auto mb-8 flex items-center justify-between text-sm">
          <div class="text-left">
            <div class="text-xs text-slate-500 font-medium">Your Real Balance</div>
            <div class="font-extrabold text-yellow-800 text-base">🪙 ${coins} Coins</div>
          </div>
          <div class="text-right">
            <div class="text-xs text-slate-500 font-medium">Required Cost</div>
            <div class="font-extrabold text-purple-800 text-base">🪙 200 Coins</div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <button id="satkoli-back-btn" class="py-3 px-6 rounded-xl border border-stone-300 text-slate-700 font-bold text-sm hover:bg-stone-50 transition">
            ← Back to Maharashtra
          </button>
          
          <button id="satkoli-unlock-cta-btn"
            class="py-3 px-6 rounded-xl font-bold text-sm text-white shadow-md transition transform active:scale-95 ${canUnlock ? 'bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700' : 'bg-slate-300 cursor-not-allowed'}">
            ${canUnlock ? 'Unlock Satkoli (200 Coins)' : 'Need More Coins to Unlock'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('satkoli-back-btn').onclick = () => {
      if (this.onExit) this.onExit();
    };

    const unlockCta = document.getElementById('satkoli-unlock-cta-btn');
    if (unlockCta && canUnlock) {
      unlockCta.onclick = () => {
        UnlockModal.show(gameDef, () => {
          // Re-init game once unlocked!
          this.init(this.containerEl, this.onExit);
        });
      };
    }
  },

  resetState() {
    this.turn = 'player';
    this.cowrieRoll = null;
    this.cowrieFaces = [0, 0, 0, 0, 0, 0, 0];
    this.isRolling = false;
    this.turnCount = 0;
    this.gameOver = false;
    this.message = 'Your Turn! Roll the seven cowrie shells.';
    this.playerPawns = [
      { id: 0, pos: 0, status: 'Outer Ring' },
      { id: 1, pos: 0, status: 'Outer Ring' }
    ];
    this.aiPawns = [
      { id: 0, pos: 0, status: 'Outer Ring' },
      { id: 1, pos: 0, status: 'Outer Ring' }
    ];
  },

  renderHtml() {
    return `
      <div class="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl shadow-xl border border-stone-200">
        
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Unlocked Champion Game • Satkoli
            </span>
            <h2 class="font-display text-2xl font-black text-slate-900 mt-1">Satkoli (Seven Cowries)</h2>
          </div>
          
          <div class="flex items-center gap-2">
            <button id="satkoli-restart-btn" class="px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-stone-100 rounded-lg border border-stone-200 transition">
              Restart
            </button>
            <button id="satkoli-exit-btn" class="px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition">
              Exit Game
            </button>
          </div>
        </div>

        <!-- Banner -->
        <div class="my-4 p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-purple-600 animate-ping"></span>
            <span id="satkoli-message-text" class="text-xs sm:text-sm font-bold text-purple-950">${this.message}</span>
          </div>
          <div class="text-xs font-bold text-slate-600">
            Turn: <span id="satkoli-turn-count" class="font-black text-slate-900">${this.turnCount}</span>
          </div>
        </div>

        <!-- Board & Controls -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          <div class="lg:col-span-2 flex flex-col items-center">
            <div class="w-full max-w-[480px] aspect-square relative rounded-2xl overflow-hidden shadow-lg border-4 border-[#1E1B4B]">
              <canvas id="satkoli-canvas" class="w-full h-full bg-[#0F172A] cursor-pointer"></canvas>
            </div>
            <p class="text-[11px] text-slate-500 mt-2 text-center">
              Traverse the 7 concentric sacred rings toward the central Lotus Sanctum.
            </p>
          </div>

          <div class="space-y-5 bg-stone-50 p-5 rounded-2xl border border-stone-200">
            
            <!-- 7 Cowries -->
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex justify-between items-center">
                <span>7 Cowrie Shells</span>
                <span id="satkoli-cowrie-tag" class="text-purple-700 font-extrabold text-sm font-display">
                  ${this.cowrieRoll ? `Move ${this.cowrieRoll}` : 'Ready'}
                </span>
              </div>

              <div class="grid grid-cols-7 gap-1 p-3 rounded-xl bg-white border border-stone-200 shadow-inner">
                ${[0, 1, 2, 3, 4, 5, 6].map(i => `
                  <div class="cowrie-shell ${this.cowrieFaces[i] ? 'mouth-up' : 'mouth-down'}" id="satkoli-cowrie-${i}"></div>
                `).join('')}
              </div>

              <button id="satkoli-roll-btn"
                class="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition transform active:scale-95 disabled:opacity-50">
                🎲 Roll 7 Cowries
              </button>
            </div>

            <!-- Pawn Selectors -->
            <div>
              <div class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Sacred Pawns</div>
              <div class="grid grid-cols-2 gap-2">
                <button id="satkoli-pawn-0-btn" class="p-2.5 rounded-xl border border-stone-300 bg-white hover:border-purple-500 text-xs font-bold text-slate-800 transition flex items-center justify-between">
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span> Pawn 1</span>
                  <span class="text-[10px] text-slate-500" id="satkoli-p0-status">Ring 1</span>
                </button>
                <button id="satkoli-pawn-1-btn" class="p-2.5 rounded-xl border border-stone-300 bg-white hover:border-purple-500 text-xs font-bold text-slate-800 transition flex items-center justify-between">
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span> Pawn 2</span>
                  <span class="text-[10px] text-slate-500" id="satkoli-p1-status">Ring 1</span>
                </button>
              </div>
            </div>

            <!-- AI Status -->
            <div class="p-3 rounded-xl bg-white border border-stone-200 space-y-1 text-xs">
              <div class="font-bold text-slate-800 flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                Opponent: Grandmaster AI
              </div>
              <div class="flex justify-between text-slate-500 text-[11px]">
                <span>Pawn 1: <strong id="satkoli-ai-0-status" class="text-slate-800">Ring 1</strong></span>
                <span>Pawn 2: <strong id="satkoli-ai-1-status" class="text-slate-800">Ring 1</strong></span>
              </div>
            </div>

            <div class="p-3 rounded-xl bg-purple-50/60 border border-purple-200 text-[11px] text-slate-600 space-y-1">
              <div class="font-bold text-purple-900">Satkoli Rules:</div>
              <div>• 7 mouths up = <strong>14 steps (Lotus Miracle!)</strong></div>
              <div>• 0 mouths up = <strong>7 steps</strong></div>
              <div>• 1 to 6 mouths up = <strong>Face value</strong></div>
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

    const cx = w / 2;
    const cy = h / 2;
    const maxRadius = Math.min(w, h) * 0.44;

    // Draw 7 concentric sacred squares / rings
    for (let ring = 7; ring >= 1; ring--) {
      const r = (ring / 7) * maxRadius;
      ctx.fillStyle = ring % 2 === 0 ? '#1E293B' : '#0F172A';
      ctx.beginPath();
      ctx.rect(cx - r, cy - r, r * 2, r * 2);
      ctx.fill();
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Central Lotus Sanctum
    const centerR = maxRadius / 7;
    ctx.fillStyle = '#B45309';
    ctx.beginPath();
    ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🪷', cx, cy);

    // Draw Pawns
    this.playerPawns.forEach((p, idx) => {
      const pt = this.getSpiralCoords(p.pos, 'player', cx, cy, maxRadius);
      this.drawPawn(ctx, pt.x, pt.y, '#06B6D4', '#0891B2', `K${idx + 1}`);
    });

    this.aiPawns.forEach((p, idx) => {
      const pt = this.getSpiralCoords(p.pos, 'ai', cx, cy, maxRadius);
      this.drawPawn(ctx, pt.x, pt.y, '#F59E0B', '#B45309', `G${idx + 1}`);
    });
  },

  drawPawn(ctx, x, y, fill, stroke, label) {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 8px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
    ctx.restore();
  },

  getSpiralCoords(pos, type, cx, cy, maxRadius) {
    const isPlayer = type === 'player';
    if (pos >= this.SANCTUM_POS) {
      return { x: cx + (isPlayer ? -10 : 10), y: cy };
    }
    const progress = pos / this.SANCTUM_POS;
    const angle = progress * Math.PI * 6 + (isPlayer ? 0 : Math.PI);
    const radius = maxRadius * (1 - progress * 0.82);

    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius
    };
  },

  attachEvents() {
    document.getElementById('satkoli-roll-btn').onclick = () => this.rollCowries();
    document.getElementById('satkoli-pawn-0-btn').onclick = () => this.movePawn(0);
    document.getElementById('satkoli-pawn-1-btn').onclick = () => this.movePawn(1);

    document.getElementById('satkoli-restart-btn').onclick = () => {
      this.resetState();
      this.drawBoard();
      this.updateUI();
    };

    document.getElementById('satkoli-exit-btn').onclick = () => {
      if (this.onExit) this.onExit();
    };
  },

  rollCowries() {
    if (this.isRolling || this.turn !== 'player' || this.gameOver) return;
    this.isRolling = true;

    const btn = document.getElementById('satkoli-roll-btn');
    if (btn) btn.disabled = true;

    const cowrieEls = document.querySelectorAll('.cowrie-shell');
    cowrieEls.forEach(el => el.classList.add('cowrie-rolling'));

    setTimeout(() => {
      const up = Math.floor(Math.random() * 8); // 0..7
      this.cowrieFaces = [0, 1, 2, 3, 4, 5, 6].map(i => (i < up ? 1 : 0));

      let val = up;
      if (up === 7) val = 14; // Lotus Miracle
      else if (up === 0) val = 7;

      this.cowrieRoll = val;
      this.isRolling = false;
      this.turnCount++;

      cowrieEls.forEach(el => el.classList.remove('cowrie-rolling'));
      this.message = `Rolled ${val}! Advance a sacred pawn inward.`;

      this.updateUI();
      this.drawBoard();
      if (btn) btn.disabled = false;
    }, 500);
  },

  movePawn(idx) {
    if (this.turn !== 'player' || !this.cowrieRoll || this.gameOver) return;

    const p = this.playerPawns[idx];
    if (p.pos >= this.SANCTUM_POS) return;

    p.pos += this.cowrieRoll;
    if (p.pos >= this.SANCTUM_POS) {
      p.pos = this.SANCTUM_POS;
      p.status = 'Lotus Sanctum';
    } else {
      p.status = `Step #${p.pos}`;
    }

    this.cowrieRoll = null;
    this.drawBoard();
    this.updateUI();

    if (this.playerPawns.some(p => p.pos >= this.SANCTUM_POS)) {
      this.handleVictory();
      return;
    }

    this.turn = 'ai';
    this.message = 'Grandmaster AI is calculating...';
    this.updateUI();

    setTimeout(() => {
      const aiUp = Math.floor(Math.random() * 8);
      const aiVal = aiUp === 7 ? 14 : (aiUp === 0 ? 7 : aiUp);
      const av = this.aiPawns.filter(p => p.pos < this.SANCTUM_POS);
      if (av.length > 0) {
        av[0].pos += aiVal;
        if (av[0].pos >= this.SANCTUM_POS) av[0].pos = this.SANCTUM_POS;
      }
      this.drawBoard();

      if (this.aiPawns.some(p => p.pos >= this.SANCTUM_POS)) {
        this.gameOver = true;
        this.message = 'The Grandmaster reached the Lotus Sanctum first. Try again!';
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
    this.message = '🎉 SACRED TRIUMPH! You attained the Lotus Sanctum of Satkoli!';
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
          () => this.init(this.containerEl, this.onExit)
        );
      } catch (err) {
        console.error('Failed to submit Satkoli reward:', err);
      }
    }
  },

  updateUI() {
    const msg = document.getElementById('satkoli-message-text');
    if (msg) msg.innerText = this.message;

    const tag = document.getElementById('satkoli-cowrie-tag');
    if (tag) tag.innerText = this.cowrieRoll ? `Move ${this.cowrieRoll}` : (this.turn === 'player' ? 'Ready' : 'AI Moving');

    const p0 = document.getElementById('satkoli-p0-status');
    const p1 = document.getElementById('satkoli-p1-status');
    if (p0) p0.innerText = this.playerPawns[0].pos >= this.SANCTUM_POS ? 'Sanctum' : `#${this.playerPawns[0].pos}`;
    if (p1) p1.innerText = this.playerPawns[1].pos >= this.SANCTUM_POS ? 'Sanctum' : `#${this.playerPawns[1].pos}`;

    this.cowrieFaces.forEach((face, idx) => {
      const el = document.getElementById(`satkoli-cowrie-${idx}`);
      if (el) el.className = `cowrie-shell ${face ? 'mouth-up' : 'mouth-down'}`;
    });
  }
};
