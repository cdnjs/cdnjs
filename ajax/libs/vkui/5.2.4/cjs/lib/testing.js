"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTesting = void 0;
var _dom = require("./dom");
// eslint-disable-next-line no-restricted-globals
var isTesting = Boolean(_dom.canUseDOM && window.__isVkuiTesting);
exports.isTesting = isTesting;
//# sourceMappingURL=testing.js.map