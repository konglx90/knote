const Event = {
  watchers: {},
  uid: 0,

  subscribe(key, cb) {
    if (this.watchers[key]) {
      this.watchers[key].push({ uid: this.uid++, cb });
    } else {
      this.watchers[key] = [ { uid: this.uid++, cb } ];
    }

    // unsubscribe
    const that = this;
    const fUid = that.uid - 1;
    return function unsubscribe() {
      if (!that.watchers[key]) {
        return;
      }
      that.watchers[key].forEach(({ uid }, index) => {
        if (uid === fUid) {
          that.watchers[key].splice(index, 1);
        }
      })
    }
  },

  emit(key) {
    if (this.watchers[key]) {
      this.watchers[key].forEach(({ cb }) => cb(key));
    }
  }
}

var unsubscribe = Event.subscribe('click', () => { console.log('click1 unsbscribe'); });
Event.subscribe('click', () => { console.log('click2'); });

unsubscribe();

Event.emit('click');
