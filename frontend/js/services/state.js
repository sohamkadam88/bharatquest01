/**
 * Bharat Quest - Global Reactive State Manager
 * Manages authenticated user state, real DB balances, route navigation,
 * and listeners.
 */

import { Api } from './api.js';

class StateStore {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.isLoading = true;
    this.currentRoute = 'landing';
    this.routeParams = {};
    this.intendedDestination = null; // Preserves intended target when auth is required
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event, data) {
    for (const listener of this.listeners) {
      try {
        listener(event, data, this);
      } catch (err) {
        console.error('State listener error:', err);
      }
    }
  }

  async init() {
    this.isLoading = true;
    const token = Api.getToken();
    if (token) {
      try {
        const user = await Api.getProfile();
        this.setUser(user);
      } catch (err) {
        console.warn('Session expired or invalid, continuing logged out.');
        this.clearUser();
      }
    } else {
      this.clearUser();
    }
    this.isLoading = false;
    this.notify('INIT', { isAuthenticated: this.isAuthenticated });
  }

  setUser(user) {
    this.currentUser = user;
    this.isAuthenticated = !!user;
    this.notify('USER_CHANGED', this.currentUser);
  }

  clearUser() {
    this.currentUser = null;
    this.isAuthenticated = false;
    Api.logout();
    this.notify('USER_LOGOUT', null);
  }

  async refreshUser() {
    if (!this.isAuthenticated) return null;
    try {
      const updatedUser = await Api.getProfile();
      this.setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error('Failed to refresh user progress from database:', err);
      return null;
    }
  }

  setIntendedDestination(route, params = {}) {
    this.intendedDestination = { route, params };
  }

  consumeIntendedDestination() {
    const dest = this.intendedDestination;
    this.intendedDestination = null;
    return dest;
  }
}

export const Store = new StateStore();
