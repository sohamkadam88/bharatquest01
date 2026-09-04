/**
 * Bharat Quest - User Profile Page
 * Real authenticated profile management, avatar updates, and statistics.
 */

import { Api } from '../services/api.js';
import { Store } from '../services/state.js';
import { Breadcrumbs } from '../components/breadcrumbs.js';

export const ProfilePage = {
  render() {
    const user = Store.currentUser;
    if (!user) {
      return `<div class="p-12 text-center text-slate-500">Please log in to view your profile.</div>`;
    }

    return `
      <div class="space-y-8 pb-20">
        
        <!-- Breadcrumbs -->
        ${Breadcrumbs.render([
          { label: 'Home', href: '#/' },
          { label: 'My Profile', href: '#/profile' }
        ])}

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <!-- Profile Card -->
          <div class="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
            <div class="flex flex-col sm:flex-row items-center gap-6">
              
              <!-- Avatar Circle -->
              <div class="w-24 h-24 rounded-3xl bg-gradient-to-tr from-orange-600 to-amber-400 text-white flex items-center justify-center font-display font-black text-4xl shadow-md">
                ${(user.display_name || 'U').charAt(0).toUpperCase()}
              </div>

              <!-- Details -->
              <div class="text-center sm:text-left flex-1">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>👑 Leaderboard Rank:</span>
                  <span class="font-black">#${user.rank || '—'}</span>
                </div>
                <h1 class="font-display text-3xl font-black text-slate-900">
                  ${user.display_name}
                </h1>
                <p class="text-xs text-slate-500 mt-1">
                  Private Account: <span class="font-mono">${user.email}</span>
                </p>
                <p class="text-xs text-slate-400 mt-0.5">
                  Member since ${new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

            </div>

            <!-- Real Balances Grid -->
            <div class="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-stone-100 text-center">
              <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div class="text-xs text-amber-800 font-bold uppercase">⭐ Points</div>
                <div class="text-2xl sm:text-3xl font-black text-amber-950 mt-1">${user.total_points}</div>
              </div>
              <div class="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <div class="text-xs text-purple-800 font-bold uppercase">⭐ Stars</div>
                <div class="text-2xl sm:text-3xl font-black text-purple-950 mt-1">${user.total_stars}</div>
              </div>
              <div class="p-4 rounded-2xl bg-yellow-50 border border-yellow-200">
                <div class="text-xs text-yellow-800 font-bold uppercase">🪙 Coins</div>
                <div class="text-2xl sm:text-3xl font-black text-yellow-950 mt-1">${user.total_coins}</div>
              </div>
            </div>

          </div>

          <!-- Edit Profile Form -->
          <div class="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <h2 class="font-display text-xl font-bold text-slate-900 border-b border-stone-100 pb-3">
              Edit Profile Information
            </h2>

            <div id="profile-alert" class="hidden p-3 rounded-xl text-xs font-semibold"></div>

            <form id="profile-edit-form" class="space-y-4 max-w-md">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Display Name</label>
                <input type="text" id="profile-display-name" value="${user.display_name}" required
                  class="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm" />
              </div>

              <button type="submit" id="profile-save-btn"
                class="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-sm transition">
                Save Changes
              </button>
            </form>
          </div>

        </div>

      </div>
    `;
  },

  attachEvents() {
    const form = document.getElementById('profile-edit-form');
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const alertEl = document.getElementById('profile-alert');
        const saveBtn = document.getElementById('profile-save-btn');
        const newName = document.getElementById('profile-display-name').value.trim();

        saveBtn.disabled = true;
        saveBtn.innerText = 'Saving...';

        try {
          await Api.updateProfile(newName, 'peacock');
          await Store.refreshUser();
          alertEl.className = 'p-3 rounded-xl text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800';
          alertEl.innerText = 'Profile updated successfully!';
          alertEl.classList.remove('hidden');
          saveBtn.disabled = false;
          saveBtn.innerText = 'Save Changes';
        } catch (err) {
          alertEl.className = 'p-3 rounded-xl text-xs font-semibold bg-red-50 border border-red-200 text-red-700';
          alertEl.innerText = err.message || 'Failed to update profile.';
          alertEl.classList.remove('hidden');
          saveBtn.disabled = false;
          saveBtn.innerText = 'Save Changes';
        }
      };
    }
  }
};
