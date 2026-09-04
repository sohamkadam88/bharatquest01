/**
 * Bharat Quest - Game Detail Page (Indoor & Outdoor)
 * Indoor: Lore, History, Equipment, Rules, How to Play, and [ PLAY ONLINE ]
 * Outdoor: Lore, History, Equipment, Rules, How Traditionally Played, Facts (Information Only!)
 */

import { STATES_DATA } from '../data/states_data.js';
import { Breadcrumbs } from '../components/breadcrumbs.js';
import { Store } from '../services/state.js';
import { AuthModal } from '../components/auth_modal.js';
import { UnlockModal } from '../components/unlock_modal.js';

export const GameDetailPage = {
  render(stateSlug = 'maharashtra', gameId = 'chaupar', isOutdoor = false) {
    const stateData = STATES_DATA[stateSlug] || STATES_DATA['maharashtra'];
    const game = isOutdoor
      ? stateData.outdoorGames.find(g => g.id === gameId)
      : stateData.indoorGames.find(g => g.id === gameId);

    if (!game) {
      return `
        <div class="max-w-xl mx-auto p-12 text-center">
          <h2 class="font-display text-2xl font-bold text-slate-900">Game Not Found</h2>
          <a href="#/state/${stateSlug}" class="mt-4 inline-block text-orange-600 font-bold">← Return to ${stateData.name}</a>
        </div>
      `;
    }

    const user = Store.currentUser;
    const unlockedGames = user?.games_unlocked || ['chaupar', 'saripat'];
    const isLocked = !isOutdoor && game.unlockCost > 0 && !unlockedGames.includes(game.id);

    return `
      <div class="space-y-8 pb-20">
        
        <!-- Breadcrumbs -->
        ${Breadcrumbs.render([
          { label: 'Home', href: '#/' },
          { label: 'Explore India', href: '#/map' },
          { label: stateData.name, href: `#/state/${stateSlug}` },
          { label: isOutdoor ? 'Outdoor Games' : 'Indoor Games', href: `#/category/${stateSlug}/${isOutdoor ? 'outdoor' : 'indoor'}` },
          { label: game.name, href: `#/${isOutdoor ? 'outdoor' : 'game'}/${stateSlug}/${game.id}` }
        ])}

        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <!-- Hero Header -->
          <div class="p-8 sm:p-10 rounded-3xl ${
            isOutdoor 
              ? 'bg-gradient-to-r from-emerald-800 to-teal-950 text-white' 
              : 'bg-gradient-to-r from-purple-800 to-indigo-950 text-white'
          } shadow-xl relative overflow-hidden">
            <div class="max-w-3xl relative z-10">
              <span class="px-3.5 py-1 rounded-full ${isOutdoor ? 'bg-emerald-700/60' : 'bg-purple-700/60'} text-xs font-bold uppercase tracking-widest">
                ${stateData.name} • ${isOutdoor ? 'Outdoor Folk Discipline' : 'Indoor Strategy Game'}
              </span>
              <h1 class="font-display text-3xl sm:text-5xl font-black mt-3 mb-2 tracking-tight">
                ${game.name}
              </h1>
              <p class="text-sm sm:text-base ${isOutdoor ? 'text-emerald-200' : 'text-purple-200'} font-medium">
                ${game.tagline}
              </p>
            </div>
            <div class="absolute -right-6 -bottom-6 text-9xl opacity-10 select-none pointer-events-none">
              ${isOutdoor ? '🌳' : '🎲'}
            </div>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs text-xs">
            <div>
              <div class="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Category</div>
              <div class="font-bold text-slate-800 text-sm mt-0.5 capitalize">${game.category}</div>
            </div>
            <div>
              <div class="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Players</div>
              <div class="font-bold text-slate-800 text-sm mt-0.5">${game.players}</div>
            </div>
            <div>
              <div class="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Recommended Age</div>
              <div class="font-bold text-slate-800 text-sm mt-0.5">${game.ageGroup}</div>
            </div>
            <div>
              <div class="text-slate-400 font-bold uppercase tracking-wider text-[10px]">${isOutdoor ? 'Format' : 'Reward'}</div>
              <div class="font-bold ${isOutdoor ? 'text-emerald-700' : 'text-amber-700'} text-sm mt-0.5">
                ${isOutdoor ? 'Educational' : `+${game.pointsReward} Pts / +${game.coinReward} 🪙`}
              </div>
            </div>
          </div>

          <!-- PLAY ONLINE CTA SECTION (ONLY FOR INDOOR GAMES) -->
          ${!isOutdoor ? `
            <div class="p-6 sm:p-8 rounded-3xl bg-purple-50 border-2 border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div>
                <span class="px-3 py-1 rounded-full bg-purple-200/80 text-purple-900 text-xs font-bold uppercase tracking-wider">
                  Online Gameplay Ready
                </span>
                <h3 class="font-display text-2xl font-black text-purple-950 mt-1">
                  Ready to test your strategy in ${game.name}?
                </h3>
                <p class="text-xs text-purple-800 mt-1 max-w-lg leading-relaxed">
                  Challenge the traditional AI in your browser. Victorious matches award real Points, Stars, and Coins saved to the database.
                </p>
              </div>

              <div>
                ${isLocked ? `
                  <button id="detail-unlock-btn"
                    class="py-4 px-8 rounded-2xl bg-purple-800 hover:bg-purple-900 text-white font-extrabold text-sm shadow-md transition transform active:scale-95 whitespace-nowrap">
                    🔓 Unlock Game (200 Coins)
                  </button>
                ` : `
                  <button id="detail-play-online-btn"
                    class="py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-black text-base shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 active:scale-95 whitespace-nowrap flex items-center gap-2">
                    <span>PLAY ONLINE</span>
                    <span>→</span>
                  </button>
                `}
              </div>
            </div>
          ` : ''}

          <!-- Detailed Information Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left 2 Cols: History, Significance, Rules -->
            <div class="lg:col-span-2 space-y-8">
              
              <!-- About & Origin -->
              <section class="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                <h3 class="font-display text-2xl font-bold text-slate-900 border-b border-stone-100 pb-3">
                  Historical Origin & Lore
                </h3>
                <p class="text-sm text-slate-700 leading-relaxed font-normal">
                  ${game.history}
                </p>
                <div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <strong>📜 Ancient Record:</strong> ${game.origin}
                </div>
              </section>

              <!-- Cultural Significance -->
              <section class="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                <h3 class="font-display text-2xl font-bold text-slate-900 border-b border-stone-100 pb-3">
                  Cultural Significance
                </h3>
                <p class="text-sm text-slate-700 leading-relaxed font-normal">
                  ${game.culturalSignificance}
                </p>
              </section>

              <!-- Rules & How to Play -->
              <section class="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                <h3 class="font-display text-2xl font-bold text-slate-900 border-b border-stone-100 pb-3">
                  Rules & Mechanics
                </h3>
                <ul class="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  ${game.rules.map(r => `
                    <li class="flex items-start gap-2.5">
                      <span class="text-orange-600 font-bold text-base mt-[-2px]">•</span>
                      <span>${r}</span>
                    </li>
                  `).join('')}
                </ul>

                ${game.howToPlay ? `
                  <div class="mt-6 pt-4 border-t border-stone-100">
                    <h4 class="font-display text-base font-bold text-slate-900 mb-2">How to Play Step-by-Step</h4>
                    <p class="text-xs text-slate-600 whitespace-pre-line leading-relaxed font-normal">
                      ${game.howToPlay}
                    </p>
                  </div>
                ` : ''}

                ${game.howTraditionallyPlayed ? `
                  <div class="mt-6 pt-4 border-t border-stone-100">
                    <h4 class="font-display text-base font-bold text-slate-900 mb-2">How It Is Traditionally Played</h4>
                    <p class="text-xs text-slate-600 leading-relaxed font-normal">
                      ${game.howTraditionallyPlayed}
                    </p>
                  </div>
                ` : ''}
              </section>

            </div>

            <!-- Right 1 Col: Equipment & Cultural Trivia -->
            <div class="space-y-6">
              
              <!-- Equipment Card -->
              <div class="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
                <h4 class="font-display text-lg font-bold text-slate-900 border-b border-stone-100 pb-2">
                  Traditional Equipment
                </h4>
                <ul class="space-y-2 text-xs text-slate-600">
                  ${game.equipment.map(eq => `
                    <li class="flex items-center gap-2">
                      <span>🪓</span>
                      <span>${eq}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Facts for Outdoor / Rewards for Indoor -->
              ${isOutdoor && game.facts ? `
                <div class="bg-emerald-50 p-6 rounded-3xl border border-emerald-200 space-y-3">
                  <h4 class="font-display text-base font-bold text-emerald-950">
                    Fascinating Heritage Facts
                  </h4>
                  <ul class="space-y-2 text-xs text-emerald-800">
                    ${game.facts.map(f => `
                      <li class="flex items-start gap-2">
                        <span>✨</span>
                        <span>${f}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
              ` : `
                <div class="bg-amber-50 p-6 rounded-3xl border border-amber-200 space-y-3">
                  <h4 class="font-display text-base font-bold text-amber-950">
                    Victory Rewards
                  </h4>
                  <div class="space-y-2 text-xs text-amber-900">
                    <div class="flex justify-between">
                      <span>Leaderboard Points:</span>
                      <strong>+${game.pointsReward} Pts</strong>
                    </div>
                    <div class="flex justify-between">
                      <span>Mastery Stars:</span>
                      <strong>+${game.starsReward} Stars</strong>
                    </div>
                    <div class="flex justify-between">
                      <span>In-Game Coins:</span>
                      <strong>+${game.coinReward} Coins</strong>
                    </div>
                  </div>
                  <div class="pt-2 border-t border-amber-200 text-[11px] text-amber-800">
                    Awards are strictly updated in the database upon winning.
                  </div>
                </div>
              `}

              <!-- Navigation Back -->
              <div class="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2">
                <a href="#/category/${stateSlug}/${isOutdoor ? 'outdoor' : 'indoor'}"
                  class="block py-2 text-xs font-bold text-slate-700 hover:text-orange-600 transition">
                  ← Back to ${isOutdoor ? 'Outdoor' : 'Indoor'} Catalog
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    `;
  },

  attachEvents(stateSlug, gameId, isOutdoor) {
    if (isOutdoor) return;

    const playBtn = document.getElementById('detail-play-online-btn');
    if (playBtn) {
      playBtn.onclick = () => {
        // Section 63: Check auth!
        if (!Store.isAuthenticated) {
          Store.setIntendedDestination(`#/play/${stateSlug}/${gameId}`);
          AuthModal.show('login', `Login or create an account to play ${gameId.toUpperCase()} and earn real rewards.`);
        } else {
          window.location.hash = `#/play/${stateSlug}/${gameId}`;
        }
      };
    }

    const unlockBtn = document.getElementById('detail-unlock-btn');
    if (unlockBtn) {
      unlockBtn.onclick = () => {
        const game = STATES_DATA[stateSlug]?.indoorGames.find(g => g.id === gameId);
        if (game) {
          UnlockModal.show(game, () => {
            window.location.reload();
          });
        }
      };
    }
  }
};
