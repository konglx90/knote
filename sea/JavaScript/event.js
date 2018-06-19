const Event = {
  watchers: {},

  subscribe(key, cb) {
    if (this.watchers[key]) {
      this.watchers[key].push(cb);
    } else {
      this.watchers[key] = [ cb ];
    }
  },

  emit(key) {
    if (this.watchers[key]) {
      this.watchers[key].forEach(cb => cb(key));
    }
  }
}

Event.subscribe('click', () => { console.log('click1'); });
Event.subscribe('click', () => { console.log('click2'); });

Event.emit('click');
