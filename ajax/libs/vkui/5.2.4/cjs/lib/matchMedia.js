"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchMediaListAddListener = matchMediaListAddListener;
exports.matchMediaListRemoveListener = matchMediaListRemoveListener;
function matchMediaListAddListener(mediaQueryList, listener) {
  mediaQueryList.addEventListener ? mediaQueryList.addEventListener('change', listener) : mediaQueryList.addListener(listener);
}
function matchMediaListRemoveListener(mediaQueryList, listener) {
  mediaQueryList.removeEventListener ? mediaQueryList.removeEventListener('change', listener) : mediaQueryList.removeListener(listener);
}
//# sourceMappingURL=matchMedia.js.map