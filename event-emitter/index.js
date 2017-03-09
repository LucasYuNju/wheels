class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(...args));
    }
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  once(event, listener) {
    const callOnce = (...args) => {
      this.off(event, listener);
      listener(...args);
    };
    this.on(event, callOnce);
  }

  off(event, listener) {
    if (this.listeners[event]) {
      let i = this.listeners[event].length;
      while (--i) {
        if (this.listeners[event][i] === listener) {
          listeners.splice(i, 1);
          return;
        }
      }
    }
  }
}

module.exports = EventEmitter;
