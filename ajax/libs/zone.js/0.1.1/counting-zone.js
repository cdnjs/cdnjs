/*
 * See example/counting.html
 */
Zone.countingZone = {
  '-onZoneCreated': function () {
    Zone.countingZone.counter += 1;
  },
  '+onZoneLeave': function () {
    Zone.countingZone.counter -= 1;
    if (Zone.countingZone.counter <= 0) {
      Zone.countingZone.counter = 0;
      this.onFlush();
    }
  },
  '-run': function () {
    Zone.countingZone.counter = 0;
  },
  counter: function () {
    return Zone.countingZone.counter;
  },
  onFlush: function () {}
};
