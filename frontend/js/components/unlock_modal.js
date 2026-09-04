/**
 * Bharat Quest - Game Unlock Modal
 * Allows players to spend earned Coins to unlock advanced traditional games like Satkoli.
 */

import { Api } from '../services/api.js';
import { Store } from '../services/state.js';

export const UnlockModal = {
  show(game, onUnlocked) {
    let root = document.getElementById('unlock-modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'unlock-modal-root';
      document.body.appendChild(root);
    }

    const user = Store.currentUser;
    const userCoins = user?.total_coins ?? 0;
    const cost = game.unlockCost || 200;
    const hasEnough = userCoins >= cost;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
        <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-purple-200 text-center relative">
          
          <button id="unlock-close-btn" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2" aria-label="Close">
            ✕
          </button>

          <!-- Lock Icon -->
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl ${hasEnough ? 'bg-purple-100 text-purple-600' : 'bg-stone-100 text-stone-500'} flex items-center justify-center text-3xl shadow-xs">
            ${hasEnough ? '🔓' : '🔒'}
          </div>

          <h2 class="font-display text-2xl font-bold text-slate-900 mb-1">
            Unlock ${game.name}
          </h2>
          <p class="text-xs text-slate-500 mb-6">
            ${game.tagline || 'Advanced Traditional Indian Indoor Game'}
          </p>

          <!-- Coin Balance Check Card -->
          <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200 mb-6 space-y-2 text-sm">
            <div class="flex justify-between items-center text-slate-600">
              <span>Required Unlock Cost:</span>
              <span class="font-bold text-yellow-700">🪙 ${cost} Coins</span>
            </div>
            <div class="flex justify-between items-center text-slate-600">
              <span>Your Real Coin Balance:</span>
              <span class="font-bold ${hasEnough ? 'text-emerald-600' : 'text-red-600'}">🪙 ${userCoins} Coins</span>
            </div>
            <div class="pt-2 border-t border-stone-200 flex justify-between items-center font-bold">
              <span>Status:</span>
              <span class="${hasEnough ? 'text-emerald-700' : 'text-red-600'}">
                ${hasEnough ? '✓ Sufficient Coins Available' : `Need ${cost - userCoins} more Coins`}
              </span>
            </div>
          </div>

          <div id="unlock-msg-box" class="hidden mb-4 p-3 rounded-xl text-xs font-semibold"></div>

          <!-- Buttons -->
          ${hasEnough ? `
            <button id="unlock-confirm-btn"
              class="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-bold text-sm shadow-md transition transform active:scale-98">
              Unlock ${game.name} for ${cost} Coins
            </button>
          ` : `
            <div class="space-y-3">
              <button disabled class="w-full py-3 px-4 rounded-xl bg-slate-200 text-slate-400 font-bold text-sm cursor-not-allowed">
                Insufficient Coins
              </button>
              <p class="text-xs text-slate-500">
                Play Chaupar or Saripat to earn Coins and return to unlock ${game.name}!
              </p>
            </div>
          `}
        </div>
      </div>
    `;

    root.classList.remove('hidden');

    document.getElementById('unlock-close-btn').onclick = () => this.hide();

    const confirmBtn = document.getElementById('unlock-confirm-btn');
    if (confirmBtn) {
      confirmBtn.onclick = async () => {
        confirmBtn.disabled = true;
        confirmBtn.innerText = 'Unlocking...';
        const msgBox = document.getElementById('unlock-msg-box');

        try {
          const res = await Api.unlockGame(game.id);
          // Refresh user in state
          await Store.refreshUser();

          msgBox.className = 'mb-4 p-3 rounded-xl text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800';
          msgBox.innerHTML = `🎉 <strong>${game.name} Unlocked Successfully!</strong>`;
          msgBox.classList.remove('hidden');

          setTimeout(() => {
            this.hide();
            if (onUnlocked) onUnlocked(res);
          }, 1000);
        } catch (err) {
          msgBox.className = 'mb-4 p-3 rounded-xl text-xs font-semibold bg-red-50 border border-red-200 text-red-700';
          msgBox.innerText = err.message || 'Failed to unlock game.';
          msgBox.classList.remove('hidden');
          confirmBtn.disabled = false;
          confirmBtn.innerText = `Unlock ${game.name} for ${cost} Coins`;
        }
      };
    }
  },

  hide() {
    const root = document.getElementById('unlock-modal-root');
    if (root) {
      root.innerHTML = '';
      root.classList.add('hidden');
    }
  }
};
