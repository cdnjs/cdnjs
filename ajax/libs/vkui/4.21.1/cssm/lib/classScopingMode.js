// exported for tests =(
export var __controller = {
  _noConflict: false,
  _isSet: false,

  get noConflict() {
    return this._noConflict;
  },

  set noConflict(v) {
    if (this._isSet && v !== this.noConflict) {
      setTimeout(function () {
        throw new Error('[vkui]: Single VKUI instance can not have different globalClassName settings');
      }, 0);
    }

    this._noConflict = v;
    this._isSet = true;
  }

};
export var classScopingMode = __controller;
//# sourceMappingURL=classScopingMode.js.map