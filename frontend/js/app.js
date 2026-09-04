/**
 * Bharat Quest - Main SPA Router & Orchestrator
 * Controls client routing, route authentication gating, navbar re-rendering,
 * and component mounting.
 */

import { Store } from './services/state.js';
import { Navbar } from './components/navbar.js';
import { Chatbot } from './components/chatbot.js';
import { AuthModal } from './components/auth_modal.js';

import { LandingPage } from './pages/landing.js';
import { IndiaMapPage } from './pages/india_map.js';
import { StateDashboardPage } from './pages/state_dashboard.js';
import { CategoryViewPage } from './pages/category_view.js';
import { GameDetailPage } from './pages/game_detail.js';
import { GamePlayPage } from './pages/game_play.js';
import { LeaderboardPage } from './pages/leaderboard.js';
import { ProfilePage } from './pages/profile.js';
import { ProgressPage } from './pages/progress.js';

export const App = {
  async init() {
    // 1. Initialize State and restore authenticated session if token exists
    await Store.init();

    // 2. Render static layout shells
    this.renderShell();

    // 3. Listen to hash changes for SPA routing
    window.addEventListener('hashchange', () => this.handleRouting());

    // 4. Listen to State changes to keep Navbar balances in sync
    Store.subscribe((event) => {
      if (['USER_CHANGED', 'USER_LOGOUT', 'INIT'].includes(event)) {
        this.renderNavbar();
      }
    });

    // 5. Initial route execution
    await this.handleRouting();
  },

  renderShell() {
    this.renderNavbar();
    this.renderChatbot();
  },

  renderNavbar() {
    const navRoot = document.getElementById('navbar-root');
    if (navRoot) {
      navRoot.innerHTML = Navbar.render();
      Navbar.attachEvents();
    }
  },

  renderChatbot() {
    const chatRoot = document.getElementById('chatbot-root');
    if (chatRoot) {
      chatRoot.innerHTML = Chatbot.render();
      Chatbot.attachEvents();
    }
  },

  async handleRouting() {
    const hash = window.location.hash || '#/';
    const mainEl = document.getElementById('main-content-area');
    if (!mainEl) return;

    // Parse route and segments
    const cleanHash = hash.replace(/^#\/?/, '');
    const segments = cleanHash.split('/').filter(Boolean);
    const primaryRoute = segments[0] || 'landing';

    // SECTION 8: AUTHENTICATION GATING RULES
    // Landing Page is strictly PUBLIC.
    // Map, State, Category, Game, Play, Profile, Progress require authentication.
    const isPublic = (primaryRoute === '' || primaryRoute === 'landing');

    if (!isPublic && !Store.isAuthenticated) {
      // Gated route accessed while logged out:
      Store.setIntendedDestination(hash);
      mainEl.innerHTML = `
        <div class="max-w-md mx-auto my-20 p-8 sm:p-10 bg-white rounded-3xl border border-stone-200 shadow-xl text-center space-y-4">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl">
            🔒
          </div>
          <h2 class="font-display text-2xl font-black text-slate-900">Login Required</h2>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Create an account or login to explore India's traditional games, play online, and save your progress to the real leaderboard.
          </p>
          <div class="pt-4 flex gap-3">
            <button id="gate-login-btn" class="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition">
              Login
            </button>
            <button id="gate-signup-btn" class="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-md transition">
              Create Account
            </button>
          </div>
        </div>
      `;

      document.getElementById('gate-login-btn').onclick = () => AuthModal.show('login', 'Login to continue your journey.');
      document.getElementById('gate-signup-btn').onclick = () => AuthModal.show('signup', 'Create your account to start playing.');
      
      // Also pop up auth modal
      AuthModal.show('login', 'Login Required to access this area.');
      Store.currentRoute = 'auth-gate';
      this.renderNavbar();
      return;
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Route dispatch
    if (primaryRoute === '' || primaryRoute === 'landing') {
      Store.currentRoute = 'landing';
      mainEl.innerHTML = LandingPage.render();
      LandingPage.attachEvents();
    } 
    else if (primaryRoute === 'map') {
      Store.currentRoute = 'map';
      mainEl.innerHTML = IndiaMapPage.render();
      IndiaMapPage.attachEvents();
    } 
    else if (primaryRoute === 'state') {
      Store.currentRoute = 'state';
      const stateSlug = segments[1] || 'maharashtra';
      mainEl.innerHTML = await StateDashboardPage.render(stateSlug);
      StateDashboardPage.attachEvents();
    } 
    else if (primaryRoute === 'category') {
      Store.currentRoute = 'category';
      const stateSlug = segments[1] || 'maharashtra';
      const category = segments[2] || 'indoor';
      mainEl.innerHTML = CategoryViewPage.render(stateSlug, category);
      CategoryViewPage.attachEvents(stateSlug);
    } 
    else if (primaryRoute === 'game') {
      Store.currentRoute = 'game_detail';
      const stateSlug = segments[1] || 'maharashtra';
      const gameId = segments[2] || 'chaupar';
      mainEl.innerHTML = GameDetailPage.render(stateSlug, gameId, false);
      GameDetailPage.attachEvents(stateSlug, gameId, false);
    } 
    else if (primaryRoute === 'outdoor') {
      Store.currentRoute = 'outdoor_detail';
      const stateSlug = segments[1] || 'maharashtra';
      const gameId = segments[2] || 'langdi';
      mainEl.innerHTML = GameDetailPage.render(stateSlug, gameId, true);
      GameDetailPage.attachEvents(stateSlug, gameId, true);
    } 
    else if (primaryRoute === 'play') {
      Store.currentRoute = 'play';
      const stateSlug = segments[1] || 'maharashtra';
      const gameId = segments[2] || 'chaupar';
      mainEl.innerHTML = GamePlayPage.render(stateSlug, gameId);
      GamePlayPage.attachEvents(stateSlug, gameId);
    } 
    else if (primaryRoute === 'leaderboard') {
      Store.currentRoute = 'leaderboard';
      const tab = segments[1] || 'global';
      mainEl.innerHTML = await LeaderboardPage.render(tab);
      LeaderboardPage.attachEvents();
    } 
    else if (primaryRoute === 'profile') {
      Store.currentRoute = 'profile';
      mainEl.innerHTML = ProfilePage.render();
      ProfilePage.attachEvents();
    } 
    else if (primaryRoute === 'progress') {
      Store.currentRoute = 'progress';
      mainEl.innerHTML = ProgressPage.render();
      ProgressPage.attachEvents();
    } 
    else {
      // Fallback 404
      mainEl.innerHTML = `
        <div class="max-w-md mx-auto my-24 p-12 bg-white rounded-3xl text-center border border-stone-200">
          <div class="text-4xl mb-3">🧭</div>
          <h2 class="font-display text-2xl font-bold text-slate-800">Page Not Found</h2>
          <p class="text-xs text-slate-500 mt-2 mb-6">The ancient path you seek does not exist.</p>
          <a href="#/" class="px-6 py-2.5 bg-orange-600 text-white font-bold rounded-xl text-xs">Return Home</a>
        </div>
      `;
    }

    this.renderNavbar();
  }
};

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
