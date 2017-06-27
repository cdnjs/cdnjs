/*
 * See example/except.html
 */
Zone.exceptZone = {
  boringZone: window.zone,
  interestingZone: window.zone,
  beforeTask: function () {
    this._oldZone = window.zone;
    window.zone = Zone.exceptZone.boringZone;
  },
  afterTask: function () {
    window.zone = this._oldZone;
  },
  fork: function (ops) {
    return window.zone = window.zone.fork(ops);
  }
};
