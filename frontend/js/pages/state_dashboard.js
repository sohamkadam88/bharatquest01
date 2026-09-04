/**
 * Bharat Quest - State Dashboard (Page 4)
 * Displays state lore, real user statistics for this state,
 * Indoor/Outdoor category cards, State-specific Leaderboard, and AI Chatbot.
 */

import { STATES_DATA } from '../data/states_data.js';
import { Breadcrumbs } from '../components/breadcrumbs.js';
import { Store } from '../services/state.js';
import { Api } from '../services/api.js';
import { Chatbot } from '../components/chatbot.js';

export const StateDashboardPage = {
  stateSlug: 'maharashtra',
  stateLeaderboard: [],
  userStateProgress: null,

  async render(stateSlug = 'maharashtra') {
    this.stateSlug = stateSlug;
    const stateData = STATES_DATA[stateSlug] || STATES_DATA['maharashtra'];
    
    // Set Chatbot context
    Chatbot.setState(stateSlug);

    // Fetch State progress and State leaderboard from database
    try {
      if (Store.isAuthenticated) {
        this.userStateProgress = await Api.getStateProgress(stateSlug);
      }
      const lbRes = await Api.getStateLeaderboard(stateSlug);
      this.stateLeaderboard = lbRes.leaderboard || [];
    } catch (err) {
      console.error('Failed to load state metrics:', err);
    }

    const indoorCount = stateData.indoorGames.length;
    const outdoorCount = stateData.outdoorGames.length;
    const totalCount = indoorCount + outdoorCount;

    const user = Store.currentUser;
    const userStatePoints = this.userStateProgress?.points ?? 0;
    const userStateCompleted = this.userStateProgress?.games_completed ?? 0;
    const totalStars = user?.total_stars ?? 0;
    const totalCoins = user?.total_coins ?? 0;

    return `
      <div class="space-y-8 pb-20">
        
        <!-- Breadcrumbs -->
        ${Breadcrumbs.render([
          { label: 'Home', href: '#/' },
          { label: 'Explore India', href: '#/map' },
          { label: stateData.name, href: `#/state/${stateSlug}` }
        ])}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <!-- State Hero Banner -->
          <div class="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 text-white shadow-xl relative overflow-hidden">
            <div class="max-w-3xl relative z-10">
              <span class="px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-widest">
                State Spotlight • ${stateData.capital}
              </span>
              <h1 class="font-display text-4xl sm:text-6xl font-black mt-3 mb-2 tracking-tight">
                ${stateData.name}
              </h1>
              <p class="text-base sm:text-lg font-medium text-amber-100 max-w-2xl leading-relaxed">
                ${stateData.description}
              </p>
            </div>
            <div class="absolute -right-10 -bottom-10 text-9xl opacity-15 select-none pointer-events-none">
              🏰
            </div>
          </div>

          <!-- Real User & State Statistics Grid (Rule 10) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            <div class="p-4 rounded-2xl bg-white border border-stone-200 text-center shadow-xs">
              <div class="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Games</div>
              <div class="text-2xl font-black text-slate-900 mt-1">${totalCount}</div>
            </div>
            <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center shadow-xs">
              <div class="text-xs text-purple-700 font-bold uppercase tracking-wider">Indoor Games</div>
              <div class="text-2xl font-black text-purple-900 mt-1">${indoorCount}</div>
            </div>
            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center shadow-xs">
              <div class="text-xs text-emerald-700 font-bold uppercase tracking-wider">Outdoor Games</div>
              <div class="text-2xl font-black text-emerald-900 mt-1">${outdoorCount}</div>
            </div>
            <div class="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-center shadow-xs">
              <div class="text-xs text-slate-500 font-bold uppercase tracking-wider">Completed</div>
              <div class="text-2xl font-black text-slate-900 mt-1">${userStateCompleted}</div>
            </div>
            <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center shadow-xs">
              <div class="text-xs text-amber-700 font-bold uppercase tracking-wider">State Points</div>
              <div class="text-2xl font-black text-amber-900 mt-1">${userStatePoints}</div>
            </div>
            <div class="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-center shadow-xs">
              <div class="text-xs text-purple-700 font-bold uppercase tracking-wider">Your Stars</div>
              <div class="text-2xl font-black text-purple-900 mt-1">${totalStars}</div>
            </div>
            <div class="p-4 rounded-2xl bg-yellow-50 border border-yellow-200 text-center shadow-xs">
              <div class="text-xs text-yellow-700 font-bold uppercase tracking-wider">Your Coins</div>
              <div class="text-2xl font-black text-yellow-900 mt-1">${totalCoins}</div>
            </div>
          </div>


          <!-- CHOOSE YOUR CATEGORY (SECTION 28) -->
          <div>
            <div class="text-center max-w-xl mx-auto mb-6">
              <span class="text-xs font-bold uppercase tracking-widest text-orange-600">Category Selection</span>
              <h2 class="font-display text-3xl font-extrabold text-slate-900 mt-1">
                Choose Your Category
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <!-- INDOOR GAMES CARD -->
              <div class="heritage-card card-indoor p-8 flex flex-col justify-between group hover:shadow-xl transition">
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-4xl">🏠</span>
                    <span class="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
                      Learn & Play Online
                    </span>
                  </div>
                  <h3 class="font-display text-2xl font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition">
                    INDOOR GAMES
                  </h3>
                  <p class="text-sm text-slate-600 leading-relaxed mb-6">
                    Discover traditional indoor games, learn their ancient rules and instructions, and play them directly in your browser against AI to earn real Points, Stars, and Coins.
                  </p>
                  <div class="space-y-2 mb-6">
                    <div class="text-xs font-bold text-purple-900 uppercase tracking-wider">Featured in ${stateData.name}:</div>
                    <div class="flex flex-wrap gap-2">
                      ${stateData.indoorGames.map(g => `
                        <span class="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-900 text-xs font-semibold">
                          ${g.name} ${g.unlockCost > 0 ? '🔒' : '✓'}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <a href="#/category/${stateSlug}/indoor"
                  class="w-full py-3.5 px-6 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-center text-sm shadow-md transition flex items-center justify-center gap-2">
                  <span>Explore Indoor Games</span>
                  <span>→</span>
                </a>
              </div>

              <!-- OUTDOOR GAMES CARD -->
              <div class="heritage-card card-outdoor p-8 flex flex-col justify-between group hover:shadow-xl transition">
                <div>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-4xl">🌳</span>
                    <span class="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                      Discover & Learn
                    </span>
                  </div>
                  <h3 class="font-display text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition">
                    OUTDOOR GAMES
                  </h3>
                  <p class="text-sm text-slate-600 leading-relaxed mb-6">
                    Explore traditional outdoor games, their history, rules, cultural importance and how they are traditionally played. 
                    <span class="block mt-2 font-medium text-emerald-800 text-xs">
                      Note: Outdoor games are educational only (no online gameplay or points).
                    </span>
                  </p>
                  <div class="space-y-2 mb-6">
                    <div class="text-xs font-bold text-emerald-900 uppercase tracking-wider">Traditions in ${stateData.name}:</div>
                    <div class="flex flex-wrap gap-2">
                      ${stateData.outdoorGames.map(g => `
                        <span class="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold">
                          ${g.name}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                </div>

                <a href="#/category/${stateSlug}/outdoor"
                  class="w-full py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-center text-sm shadow-md transition flex items-center justify-center gap-2">
                  <span>Explore Outdoor Games</span>
                  <span>→</span>
                </a>
              </div>

            </div>
          </div>


          <!-- TWO MAJOR SECTIONS: A. REAL LEADERBOARD & B. AI CHATBOT INFO -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
            
            <!-- Real State Leaderboard (8 cols) -->
            <div class="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-xs font-bold uppercase tracking-wider text-orange-600">${stateData.name} Rankings</span>
                  <h3 class="font-display text-2xl font-black text-slate-900">Real State Leaderboard</h3>
                </div>
                <span class="text-xs text-slate-500">Only verified indoor scores</span>
              </div>

              ${this.renderLeaderboardTable()}
            </div>

            <!-- AI Cultural Chatbot Card (4 cols) -->
            <div class="lg:col-span-4 bg-gradient-to-br from-stone-50 to-amber-50/60 p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center text-xl shadow-xs">
                  🤖
                </div>
                <div>
                  <div class="font-display font-bold text-slate-900 text-base">Ask About ${stateData.name}</div>
                  <div class="text-[11px] text-slate-500">Traditional Lore Assistant</div>
                </div>
              </div>

              <p class="text-xs text-slate-600 leading-relaxed">
                Have questions about <strong>Chaupar</strong>, <strong>Saripat</strong>, <strong>Satkoli</strong>, or the rules of <strong>Mallakhamb</strong>? Our cultural guide is ready to answer!
              </p>

              <div class="space-y-2">
                <button class="state-chat-chip w-full p-2.5 rounded-xl bg-white border border-stone-200 text-left text-xs font-semibold text-slate-700 hover:border-orange-400 hover:text-orange-700 transition"
                  data-q="What is Chaupar?">
                  "What is Chaupar?"
                </button>
                <button class="state-chat-chip w-full p-2.5 rounded-xl bg-white border border-stone-200 text-left text-xs font-semibold text-slate-700 hover:border-orange-400 hover:text-orange-700 transition"
                  data-q="How is Saripat played?">
                  "How is Saripat played?"
                </button>
                <button class="state-chat-chip w-full p-2.5 rounded-xl bg-white border border-stone-200 text-left text-xs font-semibold text-slate-700 hover:border-orange-400 hover:text-orange-700 transition"
                  data-q="What is the history of Mallakhamb?">
                  "What is the history of Mallakhamb?"
                </button>
                <button class="state-chat-chip w-full p-2.5 rounded-xl bg-white border border-stone-200 text-left text-xs font-semibold text-slate-700 hover:border-orange-400 hover:text-orange-700 transition"
                  data-q="What are the rules of Lagori?">
                  "What are the rules of Lagori?"
                </button>
              </div>

              <button id="state-open-chat-btn"
                class="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition">
                Open AI Chatbot
              </button>
            </div>

          </div>


          <!-- CONTINUE THE JOURNEY SECTION (RULE 49) -->
          <div class="p-8 rounded-3xl bg-stone-100 border border-stone-200 text-center max-w-2xl mx-auto space-y-4">
            <span class="text-xs font-bold uppercase tracking-widest text-slate-500">Keep Exploring</span>
            <h3 class="font-display text-2xl font-black text-slate-900">CONTINUE YOUR JOURNEY</h3>
            <p class="text-xs text-slate-600">
              Explore more states, discover more traditional games and keep your journey going!
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#/map"
                class="py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition">
                Explore Another State
              </a>
              <a href="#/map"
                class="py-3 px-6 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-slate-700 font-bold text-xs transition">
                View India Map
              </a>
            </div>
            <div class="text-[11px] font-semibold text-slate-500 pt-2">
              🗺️ Your Progress: <strong class="text-slate-800">${user?.states_explored?.length ?? 0} / 36 States Explored</strong>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  renderLeaderboardTable() {
    if (!this.stateLeaderboard || this.stateLeaderboard.length === 0) {
      return `
        <div class="p-8 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-2">
          <div class="text-3xl">🏆</div>
          <div class="font-display font-bold text-slate-800 text-base">No players have scored in ${STATES_DATA[this.stateSlug]?.name || 'this state'} yet.</div>
          <div class="text-xs text-slate-500 max-w-sm mx-auto">
            Play an indoor game like Chaupar or Saripat to become the first ranked player for this state!
          </div>
        </div>
      `;
    }

    return `
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr class="border-b border-stone-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <th class="py-3 px-4">Rank</th>
              <th class="py-3 px-4">Player</th>
              <th class="py-3 px-4 text-right">State Points</th>
              <th class="py-3 px-4 text-right">Stars</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 font-medium">
            ${this.stateLeaderboard.map(item => `
              <tr class="${item.is_current_user ? 'bg-amber-50/70 font-bold text-amber-900' : 'text-slate-800'}">
                <td class="py-3.5 px-4 font-black">#${item.rank}</td>
                <td class="py-3.5 px-4 flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold">
                    ${item.display_name.charAt(0).toUpperCase()}
                  </div>
                  <span>${item.display_name} ${item.is_current_user ? '<span class="text-[10px] text-amber-700 bg-amber-200/60 px-1.5 py-0.5 rounded ml-1">You</span>' : ''}</span>
                </td>
                <td class="py-3.5 px-4 text-right font-black text-amber-800">${item.points}</td>
                <td class="py-3.5 px-4 text-right text-purple-700 font-bold">⭐ ${item.stars}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  attachEvents() {
    // Chat chip triggers
    document.querySelectorAll('.state-chat-chip').forEach(chip => {
      chip.onclick = () => {
        const query = chip.dataset.q;
        Chatbot.sendMessage(query);
        // Open chatbot panel
        const panel = document.getElementById('chatbot-panel');
        if (panel) panel.classList.remove('hidden');
        Chatbot.isOpen = true;
      };
    });

    const openChatBtn = document.getElementById('state-open-chat-btn');
    if (openChatBtn) {
      openChatBtn.onclick = () => {
        const panel = document.getElementById('chatbot-panel');
        if (panel) panel.classList.remove('hidden');
        Chatbot.isOpen = true;
      };
    }
  }
};
