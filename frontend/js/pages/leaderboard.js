/**
 * Bharat Quest - Real Working Leaderboard Page (Global, State, Weekly)
 * Purely database-backed, zero dummy/fake users, highlights real active player rank.
 */

import { Api } from '../services/api.js';
import { Store } from '../services/state.js';
import { Breadcrumbs } from '../components/breadcrumbs.js';
import { ALL_STATES_LIST } from '../data/states_data.js';

export const LeaderboardPage = {
  activeTab: 'global', // 'global', 'state', 'weekly'
  selectedState: 'maharashtra',
  data: [],
  userRank: null,

  async render(tab = 'global', stateSlug = 'maharashtra') {
    this.activeTab = tab;
    this.selectedState = stateSlug;

    try {
      if (this.activeTab === 'global') {
        const res = await Api.getGlobalLeaderboard();
        this.data = res.leaderboard || [];
        this.userRank = res.current_user_rank;
      } else if (this.activeTab === 'state') {
        const res = await Api.getStateLeaderboard(this.selectedState);
        this.data = res.leaderboard || [];
        this.userRank = res.current_user_rank;
      } else if (this.activeTab === 'weekly') {
        const res = await Api.getWeeklyLeaderboard();
        this.data = res.leaderboard || [];
        this.userRank = res.current_user_rank;
      }
    } catch (err) {
      console.error('Failed to load leaderboard data:', err);
    }

    const user = Store.currentUser;

    return `
      <div class="space-y-8 pb-20">
        
        <!-- Breadcrumbs -->
        ${Breadcrumbs.render([
          { label: 'Home', href: '#/' },
          { label: 'Real Leaderboard', href: '#/leaderboard' }
        ])}

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <!-- Header -->
          <div class="text-center max-w-2xl mx-auto">
            <span class="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
              🏆 Verified Rankings
            </span>
            <h1 class="font-display text-3xl sm:text-5xl font-black text-slate-900 mt-3 mb-2">
              Hall of Champions
            </h1>
            <p class="text-sm text-slate-600">
              Rankings of real registered players across India. Points can only be earned by winning online indoor games.
            </p>
          </div>

          <!-- Active User Rank Card (If Logged In) -->
          ${user ? `
            <div class="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="flex items-center gap-4 text-center sm:text-left">
                <div class="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center font-display font-black text-2xl shadow-inner">
                  #${this.userRank || '—'}
                </div>
                <div>
                  <div class="text-xs font-bold uppercase tracking-wider text-amber-100">Your Real Rank</div>
                  <div class="font-display text-2xl font-black">${user.display_name}</div>
                  <div class="text-xs text-amber-50">
                    ⭐ ${user.total_points} Points • ⭐ ${user.total_stars} Stars • 🪙 ${user.total_coins} Coins
                  </div>
                </div>
              </div>

              <div class="text-center sm:text-right">
                <div class="text-xs text-amber-100 font-semibold">Indoor Games Completed</div>
                <div class="text-3xl font-black mt-0.5">${user.games_completed}</div>
              </div>
            </div>
          ` : ''}

          <!-- Tabs Navigation -->
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-2">
            <div class="flex gap-2 bg-stone-100 p-1.5 rounded-2xl">
              <button class="lb-tab-btn px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                this.activeTab === 'global' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }" data-tab="global">
                Global Leaderboard
              </button>
              <button class="lb-tab-btn px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                this.activeTab === 'state' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }" data-tab="state">
                State Leaderboard
              </button>
              <button class="lb-tab-btn px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                this.activeTab === 'weekly' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }" data-tab="weekly">
                Weekly Leaderboard
              </button>
            </div>

            <!-- State Selector Dropdown (When in State tab) -->
            ${this.activeTab === 'state' ? `
              <div class="flex items-center gap-2">
                <label class="text-xs font-bold text-slate-600">Select State:</label>
                <select id="lb-state-select" class="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold bg-white outline-none focus:border-orange-500">
                  ${ALL_STATES_LIST.map(s => `
                    <option value="${s.id}" ${s.id === this.selectedState ? 'selected' : ''}>${s.name}</option>
                  `).join('')}
                </select>
              </div>
            ` : ''}
          </div>

          <!-- Table Container -->
          <div class="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            ${this.renderTableContent()}
          </div>

        </div>

      </div>
    `;
  },

  renderTableContent() {
    if (!this.data || this.data.length === 0) {
      if (this.activeTab === 'weekly') {
        return `
          <div class="p-16 text-center space-y-3">
            <div class="text-5xl">📅</div>
            <h3 class="font-display text-xl font-bold text-slate-800">No players yet this week</h3>
            <p class="text-xs text-slate-500 max-w-sm mx-auto">
              Be the first to complete an indoor game this week and claim the top of the weekly leaderboard!
            </p>
          </div>
        `;
      }
      if (this.activeTab === 'state') {
        return `
          <div class="p-16 text-center space-y-3">
            <div class="text-5xl">🏛️</div>
            <h3 class="font-display text-xl font-bold text-slate-800">No players have scored in this state yet</h3>
            <p class="text-xs text-slate-500 max-w-sm mx-auto">
              Play Chaupar, Saripat, or Satkoli in this state to set the inaugural high score!
            </p>
          </div>
        `;
      }
      return `
        <div class="p-16 text-center space-y-3">
          <div class="text-5xl">🏆</div>
          <h3 class="font-display text-xl font-bold text-slate-800">No players yet</h3>
          <p class="text-xs text-slate-500 max-w-sm mx-auto">
            Create an account, play your first indoor game and become the first player on the leaderboard!
          </p>
        </div>
      `;
    }

    return `
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="bg-stone-50 border-b border-stone-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <th class="py-4 px-6">Rank</th>
              <th class="py-4 px-6">Player</th>
              <th class="py-4 px-6 text-right">Points</th>
              <th class="py-4 px-6 text-right">Stars</th>
              <th class="py-4 px-6 text-right">Games Won</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            ${this.data.map(row => {
              const isCurrentUser = row.is_current_user;
              return `
                <tr class="transition ${isCurrentUser ? 'bg-amber-50/80 font-bold text-amber-950' : 'hover:bg-stone-50/50 text-slate-800'}">
                  <td class="py-4 px-6">
                    <span class="font-black text-sm ${row.rank <= 3 ? 'text-amber-600' : 'text-slate-500'}">
                      #${row.rank} ${row.rank === 1 ? '🥇' : (row.rank === 2 ? '🥈' : (row.rank === 3 ? '🥉' : ''))}
                    </span>
                  </td>
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        ${row.display_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div class="font-bold flex items-center gap-2">
                          ${row.display_name}
                          ${isCurrentUser ? '<span class="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-extrabold">You</span>' : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 text-right font-black text-amber-700">
                    ${row.points}
                  </td>
                  <td class="py-4 px-6 text-right text-purple-700 font-bold">
                    ⭐ ${row.stars}
                  </td>
                  <td class="py-4 px-6 text-right font-bold text-slate-600">
                    ${row.games_completed}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  attachEvents() {
    document.querySelectorAll('.lb-tab-btn').forEach(btn => {
      btn.onclick = async () => {
        const tab = btn.dataset.tab;
        const container = document.getElementById('main-content-area');
        if (container) container.innerHTML = await this.render(tab, this.selectedState);
        this.attachEvents();
      };
    });

    const stateSelect = document.getElementById('lb-state-select');
    if (stateSelect) {
      stateSelect.onchange = async (e) => {
        const val = e.target.value;
        const container = document.getElementById('main-content-area');
        if (container) container.innerHTML = await this.render('state', val);
        this.attachEvents();
      };
    }
  }
};
