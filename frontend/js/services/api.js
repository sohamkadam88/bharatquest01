/**
 * Bharat Quest - API Service
 * Centralized HTTP Client with JWT Token injection and response handling.
 * Note: localStorage is used ONLY for the JWT session token, never for balances.
 */

const API_BASE = '/api';
const TOKEN_STORAGE_KEY = 'bharat_quest_auth_token';

export const Api = {
  getToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  setToken(token) {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  },

  clearToken() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
      });

      const data = await response.json();

      if (!response.ok) {
        // If 401 Unauthorized, clear stored token
        if (response.status === 401) {
          this.clearToken();
        }
        const errorMsg = data.detail || data.message || 'An error occurred during network request.';
        const err = new Error(errorMsg);
        err.status = response.status;
        err.data = data;
        throw err;
      }

      return data;
    } catch (err) {
      console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, err);
      throw err;
    }
  },

  // Authentication
  async signup(displayName, email, password) {
    const res = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ display_name: displayName, email, password })
    });
    if (res.token) {
      this.setToken(res.token);
    }
    return res;
  },

  async login(email, password) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (res.token) {
      this.setToken(res.token);
    }
    return res;
  },

  logout() {
    this.clearToken();
  },

  // User & Real Database Balances
  async getProfile() {
    return await this.request('/user/me');
  },

  async updateProfile(displayName, avatar) {
    return await this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify({ display_name: displayName, avatar })
    });
  },

  async getStateProgress(stateId) {
    return await this.request(`/user/state-progress/${stateId}`);
  },

  // Game Engine & Rewards
  async startGame(gameId, stateId) {
    return await this.request('/games/start', {
      method: 'POST',
      body: JSON.stringify({ game_id: gameId, state_id: stateId })
    });
  },

  async completeGame(sessionId, gameId, stateId, turns = 1, won = true) {
    return await this.request('/games/complete', {
      method: 'POST',
      body: JSON.stringify({
        session_id: sessionId,
        game_id: gameId,
        state_id: stateId,
        turns,
        won
      })
    });
  },

  async unlockGame(gameId) {
    return await this.request('/games/unlock', {
      method: 'POST',
      body: JSON.stringify({ game_id: gameId })
    });
  },

  // Real Leaderboards
  async getGlobalLeaderboard() {
    return await this.request('/leaderboard/global');
  },

  async getStateLeaderboard(stateId) {
    return await this.request(`/leaderboard/state/${stateId}`);
  },

  async getWeeklyLeaderboard() {
    return await this.request('/leaderboard/weekly');
  },

  // Cultural AI Chatbot
  async askChatbot(query, stateId = 'maharashtra') {
    return await this.request('/chat/ask', {
      method: 'POST',
      body: JSON.stringify({ query, state_id: stateId })
    });
  }
};
