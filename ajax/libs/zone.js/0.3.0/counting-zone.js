/*
 * See example/counting.html
 */

Zone.countingZone = {

  // setTimeout
  '+enqueueTask': function () {
    this.data.count += 1;
  },

  // fires when...
  // - clearTimeout
  // - setTimeout finishes
  '-dequeueTask': function () {
    this.data.count -= 1;
  },

  '+afterTask': function () {
    if (this.data.count === 0 && !this.data.flushed) {
      this.data.flushed = true;
      this.run(this.onFlush);
    }
  },

  counter: function () {
    return this.data.count;
  },

  data: {
    count: 0,
    flushed: false
  },

  onFlush: function () {}
};
