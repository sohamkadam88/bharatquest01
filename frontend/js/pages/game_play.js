/**
 * Bharat Quest - Play Online Host Page
 * Mounts the selected traditional game engine (Chaupar, Saripat, or Satkoli).
 */

import { Breadcrumbs } from '../components/breadcrumbs.js';
import { STATES_DATA } from '../data/states_data.js';
import { ChauparGame } from '../games/chaupar.js';
import { SaripatGame } from '../games/saripat.js';
import { SatkoliGame } from '../games/satkoli.js';

export const GamePlayPage = {
  render(stateSlug = 'maharashtra', gameId = 'chaupar') {
    const stateData = STATES_DATA[stateSlug] || STATES_DATA['maharashtra'];
    const game = stateData.indoorGames.find(g => g.id === gameId);
    const gameName = game ? game.name : gameId.toUpperCase();

    return `
      <div class="space-y-4 pb-16">
        
        <!-- Breadcrumbs -->
        ${Breadcrumbs.render([
          { label: 'Home', href: '#/' },
          { label: 'Explore India', href: '#/map' },
          { label: stateData.name, href: `#/state/${stateSlug}` },
          { label: 'Indoor Games', href: `#/category/${stateSlug}/indoor` },
          { label: gameName, href: `#/game/${stateSlug}/${gameId}` },
          { label: 'Play Online', href: `#/play/${stateSlug}/${gameId}` }
        ])}

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Main Mounting Point for Active Game -->
          <div id="game-mount-point" class="w-full"></div>
        </div>

      </div>
    `;
  },

  attachEvents(stateSlug, gameId) {
    const mountPoint = document.getElementById('game-mount-point');
    if (!mountPoint) return;

    const onExit = () => {
      window.location.hash = `#/category/${stateSlug}/indoor`;
    };

    if (gameId === 'chaupar') {
      ChauparGame.init(mountPoint, onExit);
    } else if (gameId === 'saripat') {
      SaripatGame.init(mountPoint, onExit);
    } else if (gameId === 'satkoli') {
      SatkoliGame.init(mountPoint, onExit);
    } else {
      mountPoint.innerHTML = `
        <div class="p-12 text-center bg-white rounded-3xl border border-stone-200">
          <h3 class="font-display text-2xl font-bold text-slate-800">Game In Preparation</h3>
          <p class="text-xs text-slate-500 mt-2">This game is undergoing historical restoration.</p>
          <button onclick="window.location.hash='#/category/${stateSlug}/indoor'" class="mt-4 px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold">
            ← Return to Catalog
          </button>
        </div>
      `;
    }
  }
};
