"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classScopingMode = exports.__controller = void 0;
// exported for tests =(
var __controller = {
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
exports.__controller = __controller;
var classScopingMode = __controller;
exports.classScopingMode = classScopingMode;
//# sourceMappingURL=classScopingMode.js.map