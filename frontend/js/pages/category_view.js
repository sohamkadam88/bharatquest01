/**
 * Bharat Quest - Category View (Indoor / Outdoor Catalog)
 * Lists all indoor (playable) or outdoor (educational) games for the selected state.
 */

import { STATES_DATA } from '../data/states_data.js';
import { Breadcrumbs } from '../components/breadcrumbs.js';
import { Store } from '../services/state.js';
import { UnlockModal } from '../components/unlock_modal.js';

export const CategoryViewPage = {
  render(stateSlug = 'maharashtra', category = 'indoor') {
    const isIndoor = category === 'indoor';
    const stateData = STATES_DATA[stateSlug] || STATES_DATA['maharashtra'];
    const gamesList = isIndoor ? stateData.indoorGames : stateData.outdoorGames;

    const user = Store.currentUser;
    const unlockedGames = user?.games_unlocked || ['chaupar', 'saripat'];

    return `
      <div class="space-y-8 pb-20">
        
        <!-- Breadcrumbs -->
        ${Breadcrumbs.render([
          { label: 'Home', href: '#/' },
          { label: 'Explore India', href: '#/map' },
          { label: stateData.name, href: `#/state/${stateSlug}` },
          { label: isIndoor ? 'Indoor Games' : 'Outdoor Games', href: `#/category/${stateSlug}/${category}` }
        ])}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <!-- Category Header Banner -->
          <div class="p-8 rounded-3xl ${
            isIndoor 
              ? 'bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 text-white' 
              : 'bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white'
          } shadow-xl relative overflow-hidden">
            <div class="max-w-3xl relative z-10">
              <span class="px-3.5 py-1 rounded-full ${isIndoor ? 'bg-purple-600/50' : 'bg-emerald-600/50'} text-white text-xs font-bold uppercase tracking-widest">
                ${isIndoor ? '🎮 Learn & Play Online' : '📖 Discover & Learn • Information Only'}
              </span>
              <h1 class="font-display text-3xl sm:text-5xl font-black mt-3 mb-2">
                ${stateData.name}: ${isIndoor ? 'Traditional Indoor Games' : 'Traditional Outdoor Games'}
              </h1>
              <p class="text-sm sm:text-base ${isIndoor ? 'text-purple-200' : 'text-emerald-200'} leading-relaxed">
                ${isIndoor 
                  ? 'Master ancient calculation and board maneuvering. Complete online matches to earn verified Points, Stars, and Coins!' 
                  : 'Explore indigenous athletic heritage, martial arts, and festival traditions. Outdoor games are strictly educational.'}
              </p>
            </div>
            <div class="absolute -right-8 -bottom-8 text-9xl opacity-10 select-none pointer-events-none">
              ${isIndoor ? '🎲' : '🌳'}
            </div>
          </div>

          <!-- Games List Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${gamesList.map(game => {
              if (isIndoor) {
                const isLocked = game.unlockCost > 0 && !unlockedGames.includes(game.id);
                return `
                  <div class="heritage-card p-6 flex flex-col justify-between border-t-4 border-purple-600 group">
                    <div>
                      <div class="flex items-center justify-between mb-3">
                        <span class="text-3xl">🎲</span>
                        ${isLocked ? `
                          <span class="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-bold border border-stone-300">
                            🔒 200 Coins
                          </span>
                        ` : `
                          <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                            ✓ Unlocked
                          </span>
                        `}
                      </div>

                      <h3 class="font-display text-xl font-bold text-slate-900 group-hover:text-purple-700 transition">
                        ${game.name}
                      </h3>
                      <div class="text-xs text-purple-700 font-semibold mb-2">${game.tagline}</div>
                      <p class="text-xs text-slate-600 leading-relaxed mb-4">
                        ${game.shortDescription}
                      </p>

                      <div class="space-y-1.5 text-[11px] text-slate-500 bg-stone-50 p-3 rounded-xl mb-4">
                        <div>👥 <strong>Players:</strong> ${game.players}</div>
                        <div>🎂 <strong>Age:</strong> ${game.ageGroup}</div>
                        <div class="text-amber-700 font-bold">
                          🏆 <strong>Reward:</strong> +${game.pointsReward} Pts, +${game.starsReward} Stars, +${game.coinReward} Coins
                        </div>
                      </div>
                    </div>

                    <div class="flex gap-2 pt-2 border-t border-stone-100">
                      <a href="#/game/${stateSlug}/${game.id}"
                        class="flex-1 py-2.5 px-3 text-center rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-slate-700 transition">
                        View Details
                      </a>
                      
                      ${isLocked ? `
                        <button class="unlock-trigger-btn flex-1 py-2.5 px-3 text-center rounded-xl bg-purple-100 hover:bg-purple-200 text-xs font-bold text-purple-900 transition"
                          data-game-id="${game.id}">
                          Unlock (200 🪙)
                        </button>
                      ` : `
                        <a href="#/play/${stateSlug}/${game.id}"
                          class="flex-1 py-2.5 px-3 text-center rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shadow-xs transition">
                          Play Online →
                        </a>
                      `}
                    </div>
                  </div>
                `;
              } else {
                // Outdoor Game Card (Strictly Information Only, No Play Online)
                return `
                  <div class="heritage-card p-6 flex flex-col justify-between border-t-4 border-emerald-600 group">
                    <div>
                      <div class="flex items-center justify-between mb-3">
                        <span class="text-3xl">🌳</span>
                        <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          📖 Educational Lore
                        </span>
                      </div>

                      <h3 class="font-display text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                        ${game.name}
                      </h3>
                      <div class="text-xs text-emerald-700 font-semibold mb-2">${game.tagline}</div>
                      <p class="text-xs text-slate-600 leading-relaxed mb-4">
                        ${game.shortDescription}
                      </p>

                      <div class="space-y-1.5 text-[11px] text-slate-500 bg-stone-50 p-3 rounded-xl mb-4">
                        <div>👥 <strong>Players:</strong> ${game.players}</div>
                        <div>🎂 <strong>Age:</strong> ${game.ageGroup}</div>
                        <div>📜 <strong>Origin:</strong> ${game.origin.substring(0, 45)}...</div>
                      </div>
                    </div>

                    <div class="pt-2 border-t border-stone-100">
                      <a href="#/outdoor/${stateSlug}/${game.id}"
                        class="w-full block py-2.5 px-3 text-center rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition">
                        Learn More & Rules →
                      </a>
                    </div>
                  </div>
                `;
              }
            }).join('')}
          </div>

          <!-- Bottom Navigation Link -->
          <div class="text-center pt-6">
            <a href="#/state/${stateSlug}" class="text-sm font-bold text-orange-600 hover:text-orange-700 transition">
              ← Return to ${stateData.name} Dashboard
            </a>
          </div>

        </div>

      </div>
    `;
  },

  attachEvents(stateSlug) {
    document.querySelectorAll('.unlock-trigger-btn').forEach(btn => {
      btn.onclick = () => {
        const gameId = btn.dataset.gameId;
        const game = STATES_DATA[stateSlug]?.indoorGames.find(g => g.id === gameId);
        if (game) {
          UnlockModal.show(game, () => {
            // Re-render category page
            window.location.reload();
          });
        }
      };
    });
  }
};
