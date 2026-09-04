/**
 * Bharat Quest - Real Authentication Modal (Login & Sign Up)
 * Intercepts protected actions and preserves intended destinations.
 */

import { Api } from '../services/api.js';
import { Store } from '../services/state.js';

export const AuthModal = {
  currentMode: 'login', // 'login' or 'signup'
  reasonText: '',

  show(mode = 'login', reason = '') {
    this.currentMode = mode;
    this.reasonText = reason;
    let modalEl = document.getElementById('auth-modal-root');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'auth-modal-root';
      document.body.appendChild(modalEl);
    }
    modalEl.innerHTML = this.render();
    modalEl.classList.remove('hidden');
    this.attachEvents();
  },

  hide() {
    const modalEl = document.getElementById('auth-modal-root');
    if (modalEl) {
      modalEl.innerHTML = '';
      modalEl.classList.add('hidden');
    }
  },

  render() {
    const isLogin = this.currentMode === 'login';

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-stone-200 relative">
          
          <!-- Close Button -->
          <button id="auth-close-btn" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-lg transition" aria-label="Close modal">
            ✕
          </button>

          <!-- Reason Prompt (if redirected from protected route) -->
          ${this.reasonText ? `
            <div class="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
              <span>🔒</span>
              <span>${this.reasonText}</span>
            </div>
          ` : ''}

          <!-- Header -->
          <div class="text-center mb-6">
            <div class="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
              ${isLogin ? '🔑' : '✨'}
            </div>
            <h2 class="font-display text-2xl font-bold text-slate-900">
              ${isLogin ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p class="text-sm text-slate-500 mt-1">
              ${isLogin 
                ? "Login to continue your journey through India's traditional games." 
                : "Join the journey and discover India's traditional games."}
            </p>
          </div>

          <!-- Error / Success Alert Box -->
          <div id="auth-alert-box" class="hidden mb-4 p-3 rounded-xl text-xs font-medium"></div>

          <!-- Form -->
          <form id="auth-form" class="space-y-4">
            
            ${!isLogin ? `
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Display Name</label>
                <input type="text" id="auth-name" required placeholder="e.g. Soham Kulkarni"
                  class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm transition" />
              </div>
            ` : ''}

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email Address</label>
              <input type="email" id="auth-email" required placeholder="player@example.com"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm transition" />
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                ${isLogin ? 'Password' : 'Create Password'}
              </label>
              <input type="password" id="auth-password" required placeholder="••••••••" minlength="6"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm transition" />
            </div>

            <button type="submit" id="auth-submit-btn"
              class="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition transform active:scale-98">
              ${isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          <!-- Toggle Mode Footer -->
          <div class="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            ${isLogin ? `
              Don't have an account? 
              <button id="auth-switch-mode-btn" class="font-bold text-orange-600 hover:text-orange-700 ml-1">Create Account</button>
            ` : `
              Already have an account? 
              <button id="auth-switch-mode-btn" class="font-bold text-orange-600 hover:text-orange-700 ml-1">Login</button>
            `}
          </div>
        </div>
      </div>
    `;
  },

  attachEvents() {
    const closeBtn = document.getElementById('auth-close-btn');
    if (closeBtn) closeBtn.onclick = () => this.hide();

    const switchBtn = document.getElementById('auth-switch-mode-btn');
    if (switchBtn) {
      switchBtn.onclick = () => {
        this.currentMode = this.currentMode === 'login' ? 'signup' : 'login';
        this.show(this.currentMode, this.reasonText);
      };
    }

    const form = document.getElementById('auth-form');
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const alertBox = document.getElementById('auth-alert-box');
        const submitBtn = document.getElementById('auth-submit-btn');

        const email = document.getElementById('auth-email').value.trim();
        const password = document.getElementById('auth-password').value;
        const name = this.currentMode === 'login' ? '' : (document.getElementById('auth-name')?.value.trim() || '');

        submitBtn.disabled = true;
        submitBtn.innerText = 'Verifying...';
        alertBox.classList.add('hidden');

        try {
          let response;
          if (this.currentMode === 'login') {
            response = await Api.login(email, password);
          } else {
            response = await Api.signup(name, email, password);
          }

          // Fetch full user profile and update reactive state
          const user = await Api.getProfile();
          Store.setUser(user);

          alertBox.className = 'mb-4 p-3 rounded-xl text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800';
          alertBox.innerText = response.message || 'Authentication successful!';
          alertBox.classList.remove('hidden');

          setTimeout(() => {
            this.hide();

            // Resume intended destination or navigate to Explore India Map
            const intended = Store.consumeIntendedDestination();
            if (intended) {
              window.location.hash = intended.route;
            } else {
              window.location.hash = '#/map';
            }
          }, 800);

        } catch (err) {
          alertBox.className = 'mb-4 p-3 rounded-xl text-xs font-semibold bg-red-50 border border-red-200 text-red-700';
          alertBox.innerText = err.message || 'Authentication failed. Please check your credentials.';
          alertBox.classList.remove('hidden');
          submitBtn.disabled = false;
          submitBtn.innerText = this.currentMode === 'login' ? 'Login' : 'Create Account';
        }
      };
    }
  }
};
