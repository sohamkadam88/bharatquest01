/**
 * Bharat Quest - Floating Cultural AI Chatbot Component
 * Real-time Q&A on traditional games, rules, origins, and Indian state lore.
 */

import { Api } from '../services/api.js';

export const Chatbot = {
  isOpen: false,
  currentState: 'maharashtra',
  messages: [
    {
      role: 'assistant',
      text: "Namaste! 🙏 I am your **Bharat Quest Cultural Guide**.\n\nAsk me anything about traditional Indian games, ancient rules, history, or how Points & Coins work!"
    }
  ],
  suggestedChips: [
    "What is Chaupar?",
    "How is Saripat played?",
    "History of Mallakhamb",
    "Difference between indoor & outdoor games?"
  ],

  setState(stateSlug) {
    this.currentState = stateSlug || 'maharashtra';
  },

  render() {
    return `
      <!-- Floating Bubble Button -->
      <button id="chatbot-toggle-btn"
        class="chatbot-bubble w-14 h-14 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white flex items-center justify-center text-2xl shadow-xl transition transform hover:scale-105 active:scale-95 focus:outline-none"
        aria-label="Ask about this state">
        <span id="chatbot-icon">🤖</span>
      </button>

      <!-- Chat Drawer / Panel -->
      <div id="chatbot-panel" class="hidden fixed bottom-24 right-4 sm:right-8 z-50 w-[calc(100vw-32px)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fadeIn max-h-[560px] h-[500px]">
        
        <!-- Header -->
        <div class="px-5 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white flex items-center justify-between shadow-xs">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
              🪷
            </div>
            <div>
              <div class="font-display font-bold text-sm tracking-wide">Ask About This State</div>
              <div class="text-[10px] text-amber-100 uppercase tracking-wider font-semibold">
                ${this.currentState.toUpperCase()} • CULTURAL ADVISOR
              </div>
            </div>
          </div>
          <button id="chatbot-close-btn" class="text-white/80 hover:text-white p-1 rounded-lg text-lg">
            ✕
          </button>
        </div>

        <!-- Messages Container -->
        <div id="chatbot-messages" class="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50 text-xs">
          ${this.renderMessages()}
        </div>

        <!-- Suggested Chips -->
        <div id="chatbot-chips" class="px-3 py-2 bg-white border-t border-stone-200 overflow-x-auto flex gap-1.5 no-scrollbar">
          ${this.renderChips()}
        </div>

        <!-- Input Box -->
        <form id="chatbot-form" class="p-3 bg-white border-t border-stone-100 flex items-center gap-2">
          <input type="text" id="chatbot-input" placeholder="Ask about rules, origins, Chaupar..."
            class="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-xs" />
          <button type="submit" id="chatbot-send-btn"
            class="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs transition">
            Send
          </button>
        </form>
      </div>
    `;
  },

  renderMessages() {
    return this.messages.map(m => {
      const isUser = m.role === 'user';
      // Basic markdown parsing for bold and line breaks
      const formatted = m.text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br/>');

      return `
        <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
          <div class="max-w-[85%] p-3 rounded-2xl ${
            isUser
              ? 'bg-orange-600 text-white rounded-br-none shadow-xs'
              : 'bg-white text-slate-800 border border-stone-200 rounded-bl-none shadow-xs'
          }">
            <div class="leading-relaxed">${formatted}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  renderChips() {
    return this.suggestedChips.map(chip => `
      <button type="button" class="chat-chip whitespace-nowrap px-2.5 py-1 rounded-full bg-stone-100 hover:bg-orange-50 hover:text-orange-700 border border-stone-200 text-[10px] font-semibold text-slate-700 transition"
        data-query="${chip}">
        ${chip}
      </button>
    `).join('');
  },

  attachEvents() {
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const panel = document.getElementById('chatbot-panel');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');

    const toggle = () => {
      this.isOpen = !this.isOpen;
      panel.classList.toggle('hidden', !this.isOpen);
      if (this.isOpen) {
        input?.focus();
        this.scrollToBottom();
      }
    };

    if (toggleBtn) toggleBtn.onclick = toggle;
    if (closeBtn) closeBtn.onclick = toggle;

    // Chip click
    document.querySelectorAll('.chat-chip').forEach(btn => {
      btn.onclick = () => {
        const query = btn.dataset.query;
        this.sendMessage(query);
      };
    });

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        this.sendMessage(text);
      };
    }
  },

  async sendMessage(query) {
    this.messages.push({ role: 'user', text: query });
    this.updateChatUI();

    // Loading indicator
    this.messages.push({ role: 'assistant', text: 'Thinking...' });
    this.updateChatUI();

    try {
      const res = await Api.askChatbot(query, this.currentState);
      this.messages.pop(); // Remove loading
      this.messages.push({ role: 'assistant', text: res.answer });
      if (res.suggested_chips && res.suggested_chips.length > 0) {
        this.suggestedChips = res.suggested_chips;
      }
    } catch (err) {
      this.messages.pop();
      this.messages.push({
        role: 'assistant',
        text: 'Apologies, I encountered a connection issue while consulting the ancient archives.'
      });
    }

    this.updateChatUI();
  },

  updateChatUI() {
    const msgsContainer = document.getElementById('chatbot-messages');
    const chipsContainer = document.getElementById('chatbot-chips');
    if (msgsContainer) {
      msgsContainer.innerHTML = this.renderMessages();
      this.scrollToBottom();
    }
    if (chipsContainer) {
      chipsContainer.innerHTML = this.renderChips();
      // Reattach chip events
      document.querySelectorAll('.chat-chip').forEach(btn => {
        btn.onclick = () => this.sendMessage(btn.dataset.query);
      });
    }
  },

  scrollToBottom() {
    const msgs = document.getElementById('chatbot-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }
};
