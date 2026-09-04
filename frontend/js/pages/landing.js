/**
 * Bharat Quest - Public Landing Page (Page 1)
 * Publicly accessible, introduces the cultural journey, and gates exploration.
 */

import { Store } from '../services/state.js';
import { AuthModal } from '../components/auth_modal.js';
import { ALL_STATES_LIST } from '../data/states_data.js';

export const LandingPage = {
  render() {
    return `
      <div class="space-y-20 pb-20">
        
        <!-- HERO SECTION -->
        <section class="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <!-- Subtle Mandana Background Texture -->
          <div class="absolute inset-0 bg-mandala-pattern opacity-40 pointer-events-none"></div>
          
          <!-- Soft Cultural Warm Gradients -->
          <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-orange-100/50 via-amber-50/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div class="max-w-5xl mx-auto text-center relative z-10">
            
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 text-orange-900 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-6 shadow-xs animate-fadeIn">
              <span>🪷</span>
              <span>An Interactive Cultural & Gamified Discovery Platform</span>
            </div>

            <!-- Hero Heading -->
            <h1 class="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight">
              Discover India's <br class="hidden sm:inline" />
              <span class="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                Traditional Games
              </span>
            </h1>

            <!-- Subtitle -->
            <p class="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
              Explore the games, stories, traditions and culture of India — one state at a time. Play ancient strategy boards, uncover indigenous martial arts, and earn real rewards.
            </p>

            <!-- Call to Actions -->
            <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button id="hero-start-btn"
                class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-extrabold text-base sm:text-lg shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3">
                <span>Start Exploring India</span>
                <span class="text-xl">🗺️</span>
              </button>

              <button id="hero-how-it-works-btn"
                class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-stone-50 text-slate-800 font-bold text-base border border-stone-200 shadow-xs hover:shadow transition flex items-center justify-center gap-2">
                <span>How It Works</span>
                <span class="text-xs bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded-full">In Short</span>
              </button>
            </div>

            </div>

          </div>
        </section>


        <!-- CORE JOURNEY (HOW IT WORKS) -->
        <section id="how-it-works" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-14">
            <span class="text-xs font-extrabold uppercase tracking-widest text-orange-600">The User Journey</span>
            <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              How Bharat Quest Works
            </h2>
            <p class="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              "Choose a state → Discover its games → Learn about their traditions → Play indoor games online → Earn rewards → Unlock more games → Explore another state."
            </p>
          </div>

          <!-- Journey Step Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div class="heritage-card p-6 relative">
              <div class="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-black text-xl mb-4">
                1
              </div>
              <h3 class="font-display text-lg font-bold text-slate-900 mb-2">Select a State</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Click on any Indian state on the interactive SVG map to open its dedicated cultural game dashboard.
              </p>
            </div>

            <div class="heritage-card p-6 relative">
              <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xl mb-4">
                2
              </div>
              <h3 class="font-display text-lg font-bold text-slate-900 mb-2">Indoor vs Outdoor</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Choose indoor games to play online in your browser, or dive into educational outdoor martial lore.
              </p>
            </div>

            <div class="heritage-card p-6 relative">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xl mb-4">
                3
              </div>
              <h3 class="font-display text-lg font-bold text-slate-900 mb-2">Earn Real Rewards</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Triumph over traditional AI opponents to earn verified Points, Stars, and Coins saved to the database.
              </p>
            </div>

            <div class="heritage-card p-6 relative">
              <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xl mb-4">
                4
              </div>
              <h3 class="font-display text-lg font-bold text-slate-900 mb-2">Unlock & Compete</h3>
              <p class="text-xs text-slate-600 leading-relaxed">
                Use your Coins to unlock advanced games like Satkoli and rise on the real registered leaderboard!
              </p>
            </div>

          </div>
        </section>


        <!-- FEATURES GRID -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="bg-gradient-to-b from-stone-50 to-amber-50/40 rounded-3xl p-8 sm:p-12 border border-stone-200">
            <div class="text-center max-w-2xl mx-auto mb-10">
              <h2 class="font-display text-3xl font-extrabold text-slate-900">
                Crafted for Cultural Exploration
              </h2>
              <p class="text-sm text-slate-600 mt-2">
                A seamless blend of living history, tactical mechanics, and authenticated game progression.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div class="text-2xl mb-2">🗺️</div>
                <div class="font-bold text-slate-900 text-sm">Explore States</div>
                <div class="text-xs text-slate-500 mt-1">Interactive SVG map covering India's vibrant states and regional lore.</div>
              </div>

              <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div class="text-2xl mb-2">🎮</div>
                <div class="font-bold text-slate-900 text-sm">Play Indoor Games</div>
                <div class="text-xs text-slate-500 mt-1">Authentic Chaupar, Saripat, and Satkoli playable with cowrie dice.</div>
              </div>

              <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div class="text-2xl mb-2">📖</div>
                <div class="font-bold text-slate-900 text-sm">Discover History</div>
                <div class="text-xs text-slate-500 mt-1">Deep cultural origins, ancient Sanskrit epics, and warrior traditions.</div>
              </div>

              <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div class="text-2xl mb-2">🏆</div>
                <div class="font-bold text-slate-900 text-sm">Earn Real Points</div>
                <div class="text-xs text-slate-500 mt-1">Strict database-backed points earned strictly from game victories.</div>
              </div>

              <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div class="text-2xl mb-2">⭐</div>
                <div class="font-bold text-slate-900 text-sm">Earn Real Stars</div>
                <div class="text-xs text-slate-500 mt-1">Mastery badges proving tactical prowess in traditional board games.</div>
              </div>

              <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div class="text-2xl mb-2">🪙</div>
                <div class="font-bold text-slate-900 text-sm">Earn Real Coins</div>
                <div class="text-xs text-slate-500 mt-1">Accumulate in-game currency to unlock rare champion games.</div>
              </div>

              <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div class="text-2xl mb-2">🔓</div>
                <div class="font-bold text-slate-900 text-sm">Unlock Games</div>
                <div class="text-xs text-slate-500 mt-1">Spend 200 Coins to unlock Satkoli and access champion-level challenges.</div>
              </div>

              <div class="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div class="text-2xl mb-2">🏅</div>
                <div class="font-bold text-slate-900 text-sm">Real Leaderboard</div>
                <div class="text-xs text-slate-500 mt-1">Compete exclusively with real registered players. Zero fake profiles.</div>
              </div>
            </div>

          </div>
        </section>


        <!-- FEATURED STATE SPOTLIGHT: MAHARASHTRA -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="heritage-card p-8 sm:p-12 border-orange-200 bg-gradient-to-r from-orange-50/50 via-white to-amber-50/50">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span class="px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold uppercase tracking-wider">
                  Featured Experience
                </span>
                <h2 class="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
                  Explore Maharashtra
                </h2>
                <p class="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  Immerse yourself in the land of forts and warrior intellect. Play traditional indoor strategy games online, while discovering historical outdoor sports, martial traditions, and cultural heritage.
                </p>
                <div class="flex items-center gap-4">
                  <button id="spotlight-explore-btn"
                    class="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition">
                    Explore Maharashtra Dashboard →
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="p-4 rounded-xl bg-purple-50 border border-purple-200">
                  <div class="text-2xl mb-1">🏰</div>
                  <div class="font-bold text-purple-900 text-sm">3 Indoor Games</div>
                  <div class="text-[11px] text-purple-700">Playable Online Boards</div>
                </div>
                <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div class="text-2xl mb-1">🌳</div>
                  <div class="font-bold text-emerald-900 text-sm">4 Outdoor Sports</div>
                  <div class="text-[11px] text-emerald-700">Indigenous Athletic Lore</div>
                </div>
                <div class="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div class="text-2xl mb-1">⭐</div>
                  <div class="font-bold text-amber-900 text-sm">Real Leaderboard</div>
                  <div class="text-[11px] text-amber-700">State-specific user rankings</div>
                </div>
                <div class="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                  <div class="text-2xl mb-1">🤖</div>
                  <div class="font-bold text-indigo-900 text-sm">AI State Guide</div>
                  <div class="text-[11px] text-indigo-700">Instant answers to cultural lore</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- HOW IT WORKS IN SHORT MODAL -->
        <div id="how-it-works-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
          <div class="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 border border-stone-200 relative max-h-[90vh] overflow-y-auto">
            <button id="how-it-works-close-btn" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-xl text-lg font-bold" aria-label="Close">
              ✕
            </button>
            
            <div class="text-center mb-6">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold uppercase tracking-wider mb-2">
                <span>⚡</span> Quick Guide
              </div>
              <h3 class="font-display text-2xl sm:text-3xl font-black text-slate-900">How Bharat Quest Works</h3>
              <p class="text-xs sm:text-sm text-slate-500 mt-1">Everything you need to know about the platform in short.</p>
            </div>

            <!-- 4 Short Steps -->
            <div class="space-y-3 mb-6">
              <div class="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-start gap-3">
                <span class="w-7 h-7 rounded-xl bg-orange-600 text-white flex items-center justify-center text-xs font-black shrink-0">1</span>
                <div>
                  <div class="font-bold text-slate-900 text-xs sm:text-sm">Select an Indian State</div>
                  <div class="text-xs text-slate-600 mt-0.5">Click any state on the interactive India map (e.g. Maharashtra) to open its game dashboard.</div>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-start gap-3">
                <span class="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs font-black shrink-0">2</span>
                <div>
                  <div class="font-bold text-slate-900 text-xs sm:text-sm">Choose Indoor or Outdoor</div>
                  <div class="text-xs text-slate-600 mt-0.5">
                    <strong>Indoor Games</strong> are playable online directly in your browser.<br/>
                    <strong>Outdoor Games</strong> are educational cultural lore only.
                  </div>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <span class="w-7 h-7 rounded-xl bg-amber-600 text-white flex items-center justify-center text-xs font-black shrink-0">3</span>
                <div>
                  <div class="font-bold text-slate-900 text-xs sm:text-sm">Play Online & Earn Real Rewards</div>
                  <div class="text-xs text-slate-600 mt-0.5">
                    Triumph in indoor matches against AI using authentic cowrie shells to earn:
                    <div class="flex flex-wrap gap-2 mt-1.5 font-semibold text-[11px]">
                      <span class="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md">⭐ Points (Leaderboard)</span>
                      <span class="bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md">⭐ Stars (Mastery)</span>
                      <span class="bg-yellow-100 text-yellow-900 px-2 py-0.5 rounded-md">🪙 Coins (Unlocks)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                <span class="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0">4</span>
                <div>
                  <div class="font-bold text-slate-900 text-xs sm:text-sm">Unlock Games & Climb Real Leaderboard</div>
                  <div class="text-xs text-slate-600 mt-0.5">
                    Spend earned Coins to unlock advanced games and compete with real registered players on the leaderboard!
                  </div>
                </div>
              </div>
            </div>

            <!-- Rules in Short Pill Box -->
            <div class="p-3.5 rounded-2xl bg-stone-100 text-slate-700 text-xs mb-6 space-y-1">
              <div class="font-bold text-slate-900 text-[11px] uppercase tracking-wider">Crucial Rules:</div>
              <div>• Everyone starts strictly at <strong>0 Points, 0 Stars, 0 Coins</strong>.</div>
              <div>• Rewards are granted <strong>only upon winning online indoor games</strong> (never for browsing or reading).</div>
              <div>• Only <strong>real registered users</strong> appear on the leaderboard. Zero fake scores.</div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3">
              <button id="how-it-works-explore-btn"
                class="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold text-sm shadow-md transition transform active:scale-98 text-center">
                Start Exploring India Now →
              </button>
              <button id="how-it-works-close-btn-2"
                class="py-3.5 px-6 rounded-xl border border-stone-300 hover:bg-stone-50 text-slate-700 font-bold text-sm transition text-center">
                Got It
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  },

  attachEvents() {
    const handleStart = (targetRoute = '#/map') => {
      // RULE 3 & 8: Check authentication!
      if (!Store.isAuthenticated) {
        Store.setIntendedDestination(targetRoute);
        AuthModal.show('login', 'Login or create an account to start exploring India and save your progress.');
      } else {
        window.location.hash = targetRoute;
      }
    };

    const heroStartBtn = document.getElementById('hero-start-btn');
    if (heroStartBtn) heroStartBtn.onclick = () => handleStart('#/map');

    const spotlightBtn = document.getElementById('spotlight-explore-btn');
    if (spotlightBtn) spotlightBtn.onclick = () => handleStart('#/state/maharashtra');

    // How It Works Modal Logic
    const howItWorksBtn = document.getElementById('hero-how-it-works-btn');
    const modal = document.getElementById('how-it-works-modal');
    const closeBtn1 = document.getElementById('how-it-works-close-btn');
    const closeBtn2 = document.getElementById('how-it-works-close-btn-2');
    const exploreCtaBtn = document.getElementById('how-it-works-explore-btn');

    const openModal = () => {
      if (modal) modal.classList.remove('hidden');
    };

    const closeModal = () => {
      if (modal) modal.classList.add('hidden');
    };

    if (howItWorksBtn) howItWorksBtn.onclick = openModal;
    if (closeBtn1) closeBtn1.onclick = closeModal;
    if (closeBtn2) closeBtn2.onclick = closeModal;

    if (exploreCtaBtn) {
      exploreCtaBtn.onclick = () => {
        closeModal();
        handleStart('#/map');
      };
    }

    // Close on click outside modal card
    if (modal) {
      modal.onclick = (e) => {
        if (e.target === modal) closeModal();
      };
    }
  }
};
