/**
 * Bharat Quest - Interactive India Map Page (Page 3)
 * Large interactive SVG map of India with state search, hover tooltips, and click routing.
 */

import { INDIA_MAP_SVG } from '../data/map_svg.js';
import { ALL_STATES_LIST, STATES_DATA } from '../data/states_data.js';
import { Breadcrumbs } from '../components/breadcrumbs.js';

export const IndiaMapPage = {
  selectedState: null,
  searchQuery: '',

  render() {
    return `
      <div class="space-y-6 pb-16">
        
        <!-- Breadcrumbs -->
        ${Breadcrumbs.render([
          { label: 'Home', href: '#/' },
          { label: 'Explore India Map', href: '#/map' }
        ])}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Page Header -->
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <span class="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
                Geographic Exploration
              </span>
              <h1 class="font-display text-3xl sm:text-5xl font-black text-slate-900 mt-2">
                Explore India's States
              </h1>
              <p class="text-sm text-slate-600 mt-1 max-w-2xl">
                Hover or click on any state to unlock its indigenous traditional games, cultural heritage, and regional champions.
              </p>
            </div>

            <!-- State Search Input -->
            <div class="w-full md:w-72 relative">
              <input type="text" id="map-state-search" placeholder="Search for a state (e.g. Maharashtra)..."
                class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-xs sm:text-sm bg-white shadow-xs transition" />
              <span class="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
            </div>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
            
            <!-- Left 8 Cols: Large Interactive SVG Map -->
            <div class="lg:col-span-8 bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-md relative">
              
              <!-- Floating Tooltip Box -->
              <div id="map-tooltip"
                class="hidden absolute z-30 pointer-events-none bg-slate-900/90 backdrop-blur text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xl border border-slate-700 transition transform -translate-x-1/2 -translate-y-full">
                <div id="tooltip-state-name" class="font-bold text-amber-400 text-sm font-display"></div>
                <div id="tooltip-games-count" class="text-[11px] text-slate-300"></div>
              </div>

              <!-- Embedded SVG Map -->
              <div class="w-full flex items-center justify-center overflow-x-auto">
                ${INDIA_MAP_SVG}
              </div>

              <div class="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 border-t border-stone-100 pt-3">
                <div class="flex items-center gap-4">
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-orange-600 inline-block"></span> Featured: Maharashtra</span>
                  <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-slate-300 inline-block"></span> Clickable State</span>
                </div>
                <div>💡 Tip: Click any state to view its dashboard</div>
              </div>
            </div>

            <!-- Right 4 Cols: Quick State Directory & Featured Cards -->
            <div class="lg:col-span-4 space-y-4">
              
              <div class="p-5 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-md">
                <div class="text-xs font-bold uppercase tracking-wider text-amber-100">Spotlight State</div>
                <h3 class="font-display text-2xl font-black mt-1">Maharashtra</h3>
                <p class="text-xs text-amber-50 mt-1 leading-relaxed">
                  Home to Chaupar, Saripat, Satkoli, Langdi, Mallakhamb, Lezim, and Lagori.
                </p>
                <a href="#/state/maharashtra"
                  class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white text-orange-700 hover:bg-amber-50 font-bold text-xs rounded-xl shadow-xs transition">
                  <span>Enter Maharashtra Dashboard</span>
                  <span>→</span>
                </a>
              </div>

              <!-- States List with Filter -->
              <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
                <h3 class="font-display text-base font-bold text-slate-900 mb-3">All Indian States</h3>
                <div id="states-directory-list" class="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  ${this.renderStatesList('')}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    `;
  },

  renderStatesList(query = '') {
    const q = query.toLowerCase().trim();
    const filtered = ALL_STATES_LIST.filter(s => s.name.toLowerCase().includes(q));

    if (filtered.length === 0) {
      return `<div class="text-xs text-slate-500 py-4 text-center">No states found matching "${query}"</div>`;
    }

    return filtered.map(s => {
      const isMaha = s.id === 'maharashtra';
      return `
        <a href="#/state/${s.id}"
          class="flex items-center justify-between p-3 rounded-xl border border-stone-200/80 hover:border-orange-400 hover:bg-orange-50/50 transition group ${isMaha ? 'bg-orange-50/40 border-orange-200' : ''}">
          <div>
            <div class="font-bold text-slate-900 text-sm group-hover:text-orange-700 transition flex items-center gap-1.5">
              ${s.name} ${isMaha ? '⭐' : ''}
            </div>
            <div class="text-[11px] text-slate-500">
              ${s.indoorCount} Indoor • ${s.outdoorCount} Outdoor
            </div>
          </div>
          <span class="text-xs text-orange-600 font-bold group-hover:translate-x-1 transition">→</span>
        </a>
      `;
    }).join('');
  },

  attachEvents() {
    const tooltip = document.getElementById('map-tooltip');
    const ttName = document.getElementById('tooltip-state-name');
    const ttCount = document.getElementById('tooltip-games-count');

    // Attach hover and click to each SVG state path
    const statePaths = document.querySelectorAll('.state-path');
    statePaths.forEach(path => {
      const slug = path.dataset.slug;
      const name = path.dataset.name;

      path.addEventListener('mouseenter', (e) => {
        path.classList.add('hovered');
        const stateInfo = STATES_DATA[slug];
        const gamesTotal = stateInfo ? (stateInfo.indoorGames.length + stateInfo.outdoorGames.length) : 'Cultural Traditions';

        if (tooltip && ttName && ttCount) {
          ttName.innerText = name;
          ttCount.innerText = stateInfo ? `${gamesTotal} Traditional Games Cataloged` : 'Traditional Games Available';
          tooltip.classList.remove('hidden');
        }
      });

      path.addEventListener('mousemove', (e) => {
        if (tooltip) {
          const mapBox = path.closest('.relative').getBoundingClientRect();
          const x = e.clientX - mapBox.left;
          const y = e.clientY - mapBox.top - 12;
          tooltip.style.left = `${x}px`;
          tooltip.style.top = `${y}px`;
        }
      });

      path.addEventListener('mouseleave', () => {
        path.classList.remove('hovered');
        if (tooltip) tooltip.classList.add('hidden');
      });

      path.addEventListener('click', () => {
        // Navigate to state dashboard
        window.location.hash = `#/state/${slug}`;
      });
    });

    // Search filter input
    const searchInput = document.getElementById('map-state-search');
    const dirList = document.getElementById('states-directory-list');
    if (searchInput && dirList) {
      searchInput.oninput = (e) => {
        const val = e.target.value;
        dirList.innerHTML = this.renderStatesList(val);
      };
    }
  }
};
