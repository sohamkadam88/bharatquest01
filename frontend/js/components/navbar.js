/**
 * Bharat Quest - Persistent Responsive Navbar Component
 * Strictly displays real DB values: Points, Stars, Coins or Login/SignUp buttons.
 */

import { Store } from '../services/state.js';
import { AuthModal } from './auth_modal.js';

export const Navbar = {
  render() {
    const user = Store.currentUser;
    const isAuth = Store.isAuthenticated;

    // Build Right-side element strictly based on real database state
    let authSectionHtml = '';
    let mobileAuthSectionHtml = '';

    if (isAuth && user) {
      // Rule 4: If user has 0, strictly display 0. Comes from real database record!
      const points = user.total_points ?? 0;
      const stars = user.total_stars ?? 0;
      const coins = user.total_coins ?? 0;
      const name = user.display_name || 'Player';

      authSectionHtml = `
        <div class="hidden lg:flex items-center gap-3">
          <!-- Real Points Counter -->
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-sm font-semibold shadow-sm" title="Real Leaderboard Points">
            <span class="text-amber-500 text-base">⭐</span>
            <span id="nav-points-counter" class="tabular-nums font-bold">${points}</span>
            <span class="text-xs text-amber-700 font-medium">Points</span>
          </div>

          <!-- Real Stars Counter -->
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-900 text-sm font-semibold shadow-sm" title="Real Mastery Stars">
            <span class="text-purple-600 text-base">⭐</span>
            <span id="nav-stars-counter" class="tabular-nums font-bold">${stars}</span>
            <span class="text-xs text-purple-700 font-medium">Stars</span>
          </div>

          <!-- Real Coins Counter -->
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-300 text-yellow-900 text-sm font-semibold shadow-sm" title="Real Coins for Game Unlocks">
            <span class="text-yellow-600 text-base">🪙</span>
            <span id="nav-coins-counter" class="tabular-nums font-bold">${coins}</span>
            <span class="text-xs text-yellow-800 font-medium">Coins</span>
          </div>

          <!-- User Menu & Profile -->
          <button id="nav-profile-btn" class="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-stone-100 transition border border-transparent hover:border-stone-200">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              ${name.charAt(0).toUpperCase()}
            </div>
            <span class="text-sm font-bold text-slate-800 max-w-[120px] truncate">${name}</span>
          </button>

          <!-- Logout Button -->
          <button id="nav-logout-btn" class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 text-xs font-semibold transition">
            Logout
          </button>
        </div>
      `;

      mobileAuthSectionHtml = `
        <div class="pt-4 border-t border-slate-200 space-y-3">
          <div class="grid grid-cols-3 gap-2">
            <div class="p-2 rounded-lg bg-amber-50 border border-amber-200 text-center">
              <div class="text-xs text-amber-700">⭐ Points</div>
              <div class="font-extrabold text-amber-900">${points}</div>
            </div>
            <div class="p-2 rounded-lg bg-purple-50 border border-purple-200 text-center">
              <div class="text-xs text-purple-700">⭐ Stars</div>
              <div class="font-extrabold text-purple-900">${stars}</div>
            </div>
            <div class="p-2 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
              <div class="text-xs text-yellow-700">🪙 Coins</div>
              <div class="font-extrabold text-yellow-900">${coins}</div>
            </div>
          </div>
          <div class="flex items-center justify-between px-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                ${name.charAt(0).toUpperCase()}
              </div>
              <span class="font-bold text-slate-800 text-sm">${name}</span>
            </div>
            <button id="mobile-logout-btn" class="text-xs text-red-600 font-semibold px-3 py-1 rounded bg-red-50 hover:bg-red-100">Logout</button>
          </div>
        </div>
      `;
    } else {
      // Logged Out State: Show visible [ Login ] [ Sign Up ] in top-right
      authSectionHtml = `
        <div class="hidden sm:flex items-center gap-3">
          <button id="nav-login-btn" class="px-4 py-2 text-sm font-bold text-slate-700 hover:text-orange-600 transition rounded-lg hover:bg-orange-50">
            Login
          </button>
          <button id="nav-signup-btn" class="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 rounded-lg shadow-sm hover:shadow transition transform active:scale-95">
            Sign Up
          </button>
        </div>
      `;

      mobileAuthSectionHtml = `
        <div class="pt-4 border-t border-slate-200 flex gap-2">
          <button id="mobile-login-btn" class="flex-1 py-2.5 text-center text-sm font-bold text-slate-700 bg-slate-100 rounded-lg">Login</button>
          <button id="mobile-signup-btn" class="flex-1 py-2.5 text-center text-sm font-bold text-white bg-orange-600 rounded-lg">Sign Up</button>
        </div>
      `;
    }

    return `
      <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200/80 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-18">
            
            <!-- Logo & Brand -->
            <a href="#/" class="flex items-center gap-3 group">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white text-xl font-black shadow-md group-hover:scale-105 transition">
                🏛️
              </div>
              <div class="flex flex-col">
                <span class="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-none group-hover:text-orange-600 transition">
                  Bharat Quest
                </span>
              </div>
            </a>

            <!-- Desktop Nav Links -->
            <nav class="hidden md:flex items-center gap-6">
              <a href="#/" class="nav-link text-sm font-bold text-slate-700 hover:text-orange-600 transition ${Store.currentRoute === 'landing' ? 'text-orange-600 font-extrabold' : ''}">
                Home
              </a>
              <a href="#/map" class="nav-link text-sm font-bold text-slate-700 hover:text-orange-600 transition ${Store.currentRoute === 'map' ? 'text-orange-600 font-extrabold' : ''}">
                Explore India
              </a>
              <a href="#/progress" class="nav-link text-sm font-bold text-slate-700 hover:text-orange-600 transition ${Store.currentRoute === 'progress' ? 'text-orange-600 font-extrabold' : ''}">
                My Progress
              </a>
              <a href="#/leaderboard" class="nav-link text-sm font-bold text-slate-700 hover:text-orange-600 transition ${Store.currentRoute === 'leaderboard' ? 'text-orange-600 font-extrabold' : ''}">
                Leaderboard
              </a>
            </nav>

            <!-- Right Side Auth Section -->
            <div class="flex items-center gap-3">
              ${authSectionHtml}

              <!-- Mobile Hamburger Button -->
              <button id="nav-hamburger-btn" class="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100" aria-label="Toggle Menu">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Drawer -->
        <div id="nav-mobile-drawer" class="hidden md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <nav class="flex flex-col space-y-2">
            <a href="#/" class="px-3 py-2 rounded-lg font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600">Home</a>
            <a href="#/map" class="px-3 py-2 rounded-lg font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600">Explore India</a>
            <a href="#/progress" class="px-3 py-2 rounded-lg font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600">My Progress</a>
            <a href="#/leaderboard" class="px-3 py-2 rounded-lg font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-600">Leaderboard</a>
          </nav>
          ${mobileAuthSectionHtml}
        </div>
      </header>
    `;
  },

  attachEvents() {
    // Hamburger toggle
    const burger = document.getElementById('nav-hamburger-btn');
    const drawer = document.getElementById('nav-mobile-drawer');
    if (burger && drawer) {
      burger.onclick = () => drawer.classList.toggle('hidden');
    }

    // Login buttons
    const loginBtn = document.getElementById('nav-login-btn');
    const mobLoginBtn = document.getElementById('mobile-login-btn');
    const openLogin = () => AuthModal.show('login');
    if (loginBtn) loginBtn.onclick = openLogin;
    if (mobLoginBtn) mobLoginBtn.onclick = openLogin;

    // Signup buttons
    const signupBtn = document.getElementById('nav-signup-btn');
    const mobSignupBtn = document.getElementById('mobile-signup-btn');
    const openSignup = () => AuthModal.show('signup');
    if (signupBtn) signupBtn.onclick = openSignup;
    if (mobSignupBtn) mobSignupBtn.onclick = openSignup;

    // Profile click
    const profileBtn = document.getElementById('nav-profile-btn');
    if (profileBtn) {
      profileBtn.onclick = () => window.location.hash = '#/profile';
    }

    // Logout
    const logoutBtn = document.getElementById('nav-logout-btn');
    const mobLogoutBtn = document.getElementById('mobile-logout-btn');
    const handleLogout = () => {
      Store.clearUser();
      window.location.hash = '#/';
    };
    if (logoutBtn) logoutBtn.onclick = handleLogout;
    if (mobLogoutBtn) mobLogoutBtn.onclick = handleLogout;
  }
};
