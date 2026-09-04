/**
 * Bharat Quest - My Progress & Achievements Page
 * Displays verified progress metrics, unlocked games, and earned achievements.
 */

import { Store } from '../services/state.js';
import { Breadcrumbs } from '../components/breadcrumbs.js';

export const ProgressPage = {
  render() {
    const user = Store.currentUser;
    if (!user) {
      return `<div class="p-12 text-center text-slate-500">Please log in to view your progress.</div>`;
    }

    const achievementsList = [
      {
        id: 'first_game',
        title: 'First Step of a Warrior',
        desc: 'Completed your very first traditional Indian indoor game',
        icon: '🏆',
        unlocked: user.games_completed >= 1
      },
      {
        id: 'five_games',
        title: 'Ancient Strategist',
        desc: 'Successfully completed 5 traditional indoor games',
        icon: '🎮',
        unlocked: user.games_completed >= 5
      },
      {
        id: 'points_500',
        title: 'Rising Champion',
        desc: 'Accumulated 500 total points on the real leaderboard',
        icon: '⭐',
        unlocked: user.total_points >= 500
      },
      {
        id: 'points_1000',
        title: 'Grandmaster of Bharat',
        desc: 'Crossed 1000 points in traditional Indian gaming',
        icon: '👑',
        unlocked: user.total_points >= 1000
      },
      {
        id: 'game_collector',
        title: 'Game Collector',
        desc: 'Unlocked an advanced traditional game using earned coins',
        icon: '🔓',
        unlocked: (user.games_unlocked || []).includes('satkoli')
      },
      {
        id: 'state_explorer',
        title: 'Cultural Voyager',
        desc: 'Explored games across 2 or more Indian states',
        icon: '🗺️',
        unlocked: (user.states_explored || []).length >= 2
      }
    ];

    const unlockedCount = achievementsList.filter(a => a.unlocked).length;

    return `
      <div class="space-y-8 pb-20">
        
        <!-- Breadcrumbs -->
        ${Breadcrumbs.render([
          { label: 'Home', href: '#/' },
          { label: 'My Progress', href: '#/progress' }
        ])}

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <!-- Header -->
          <div class="text-center max-w-2xl mx-auto">
            <span class="px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider">
              🎮 Player Progression
            </span>
            <h1 class="font-display text-3xl sm:text-5xl font-black text-slate-900 mt-3 mb-2">
              My Cultural Journey
            </h1>
            <p class="text-sm text-slate-600">
              Your real verified records across India's traditional games.
            </p>
          </div>

          <!-- Overall Real Values Metrics Grid (Section 27) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            <div class="p-5 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
              <div class="text-xs text-amber-700 font-bold uppercase tracking-wider">⭐ Total Points</div>
              <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${user.total_points}</div>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
              <div class="text-xs text-purple-700 font-bold uppercase tracking-wider">⭐ Total Stars</div>
              <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${user.total_stars}</div>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
              <div class="text-xs text-yellow-700 font-bold uppercase tracking-wider">🪙 Total Coins</div>
              <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${user.total_coins}</div>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
              <div class="text-xs text-emerald-700 font-bold uppercase tracking-wider">🎮 Completed</div>
              <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${user.games_completed}</div>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
              <div class="text-xs text-indigo-700 font-bold uppercase tracking-wider">🔓 Unlocked</div>
              <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${(user.games_unlocked || []).length}</div>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
              <div class="text-xs text-orange-700 font-bold uppercase tracking-wider">🗺️ States</div>
              <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${(user.states_explored || []).length}</div>
            </div>
            <div class="p-5 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
              <div class="text-xs text-rose-700 font-bold uppercase tracking-wider">🏅 Global Rank</div>
              <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">#${user.rank || '—'}</div>
            </div>
          </div>

          <!-- Achievements Section -->
          <div class="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div class="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h2 class="font-display text-2xl font-bold text-slate-900">
                  Cultural Achievements
                </h2>
                <p class="text-xs text-slate-500 mt-0.5">
                  Milestones unlocked strictly through verified online indoor matches.
                </p>
              </div>
              <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                ${unlockedCount} / ${achievementsList.length} Unlocked
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${achievementsList.map(a => `
                <div class="p-5 rounded-2xl border transition ${
                  a.unlocked 
                    ? 'bg-amber-50/50 border-amber-300 shadow-xs' 
                    : 'bg-stone-50/60 border-stone-200 opacity-60'
                }">
                  <div class="flex items-start gap-3">
                    <div class="text-3xl p-2 rounded-xl ${a.unlocked ? 'bg-amber-100' : 'bg-stone-200'}">
                      ${a.icon}
                    </div>
                    <div>
                      <div class="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>${a.title}</span>
                        ${a.unlocked ? '<span class="text-emerald-600 text-xs">✓</span>' : ''}
                      </div>
                      <div class="text-xs text-slate-500 mt-1 leading-relaxed">${a.desc}</div>
                      <div class="text-[10px] font-bold mt-2 ${a.unlocked ? 'text-amber-800' : 'text-slate-400'}">
                        ${a.unlocked ? 'UNLOCKED' : 'LOCKED'}
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Unlocked Games & States Summary -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <h3 class="font-display text-lg font-bold text-slate-900">Unlocked Traditional Games</h3>
              <div class="flex flex-wrap gap-2">
                ${(user.games_unlocked || ['chaupar', 'saripat']).map(g => `
                  <span class="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 font-bold text-xs capitalize flex items-center gap-1.5">
                    <span>🎲</span>
                    <span>${g}</span>
                  </span>
                `).join('')}
              </div>
            </div>

            <div class="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <h3 class="font-display text-lg font-bold text-slate-900">Explored States</h3>
              <div class="flex flex-wrap gap-2">
                ${(user.states_explored && user.states_explored.length > 0) ? user.states_explored.map(s => `
                  <span class="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-900 font-bold text-xs capitalize flex items-center gap-1.5">
                    <span>🏛️</span>
                    <span>${s}</span>
                  </span>
                `).join('') : `
                  <span class="text-xs text-slate-400 italic">No states explored yet. Visit Maharashtra to begin!</span>
                `}
              </div>
            </div>

          </div>

        </div>

      </div>
    `;
  },

  attachEvents() {}
};
