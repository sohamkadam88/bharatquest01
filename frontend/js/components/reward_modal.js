/**
 * Bharat Quest - Game Reward Modal
 * Animates real Points, Stars, and Coins earned from database updates.
 */

export const RewardModal = {
  show(rewardData, onContinue, onReplay) {
    let root = document.getElementById('reward-modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'reward-modal-root';
      document.body.appendChild(root);
    }

    const { reward, new_totals, new_achievements = [] } = rewardData;

    root.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
        <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border-2 border-amber-300 text-center relative overflow-hidden">
          
          <!-- Golden Radial Glow Accent -->
          <div class="absolute -top-24 -left-24 w-48 h-48 bg-amber-200/40 rounded-full blur-2xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-200/40 rounded-full blur-2xl pointer-events-none"></div>

          <!-- Trophy Icon -->
          <div class="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-white flex items-center justify-center text-4xl shadow-lg bounce-slow">
            🏆
          </div>

          <h2 class="font-display text-3xl font-extrabold text-slate-900 mb-1">
            GAME COMPLETE!
          </h2>
          <p class="text-sm font-semibold text-slate-600 mb-6">
            Congratulations! Your strategic victory has been verified and saved to the database.
          </p>

          <!-- Earned Rewards Card -->
          <div class="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 mb-6">
            <div class="text-xs font-bold uppercase tracking-wider text-amber-800 mb-3">You Earned</div>
            <div class="grid grid-cols-3 gap-3">
              <div class="p-3 bg-white rounded-xl shadow-xs border border-amber-100">
                <div class="text-2xl mb-1">⭐</div>
                <div class="text-lg font-black text-amber-900">+${reward.points}</div>
                <div class="text-[11px] font-semibold text-amber-700">Points</div>
              </div>
              <div class="p-3 bg-white rounded-xl shadow-xs border border-purple-100">
                <div class="text-2xl mb-1">⭐</div>
                <div class="text-lg font-black text-purple-900">+${reward.stars}</div>
                <div class="text-[11px] font-semibold text-purple-700">Stars</div>
              </div>
              <div class="p-3 bg-white rounded-xl shadow-xs border border-yellow-100">
                <div class="text-2xl mb-1">🪙</div>
                <div class="text-lg font-black text-yellow-900">+${reward.coins}</div>
                <div class="text-[11px] font-semibold text-yellow-800">Coins</div>
              </div>
            </div>
          </div>

          <!-- Real Database New Totals -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">New Database Totals</div>
            <div class="flex items-center justify-around text-sm font-bold text-slate-800">
              <div>⭐ <span class="font-black text-amber-700">${new_totals.total_points}</span> Points</div>
              <div>⭐ <span class="font-black text-purple-700">${new_totals.total_stars}</span> Stars</div>
              <div>🪙 <span class="font-black text-yellow-700">${new_totals.total_coins}</span> Coins</div>
            </div>
          </div>

          <!-- New Achievements Unlocked (if any) -->
          ${new_achievements.length > 0 ? `
            <div class="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left">
              <div class="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">🎉 New Achievement Unlocked!</div>
              ${new_achievements.map(a => `
                <div class="flex items-center gap-3">
                  <span class="text-2xl">${a.icon}</span>
                  <div>
                    <div class="font-bold text-emerald-900 text-sm">${a.title}</div>
                    <div class="text-xs text-emerald-700">${a.desc}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button id="reward-replay-btn"
              class="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 font-bold text-sm text-slate-700 transition">
              Play Again
            </button>
            <button id="reward-continue-btn"
              class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold text-sm shadow-md transition">
              Continue Journey →
            </button>
          </div>
        </div>
      </div>
    `;

    root.classList.remove('hidden');

    document.getElementById('reward-replay-btn').onclick = () => {
      this.hide();
      if (onReplay) onReplay();
    };

    document.getElementById('reward-continue-btn').onclick = () => {
      this.hide();
      if (onContinue) onContinue();
    };
  },

  hide() {
    const root = document.getElementById('reward-modal-root');
    if (root) {
      root.innerHTML = '';
      root.classList.add('hidden');
    }
  }
};
