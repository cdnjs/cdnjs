"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalRoot = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _ModalRoot = require("./ModalRoot");

var _ModalRootDesktop = require("./ModalRootDesktop");

var _ScrollContext = require("../AppRoot/ScrollContext");

var _useAdaptivityWithMediaQueries = require("../../hooks/useAdaptivityWithMediaQueries");

/**
 * @see https://vkcom.github.io/VKUI/#/ModalRoot
 */
var ModalRoot = function ModalRoot(props) {
  var _useAdaptivityWithMed = (0, _useAdaptivityWithMediaQueries.useAdaptivityWithMediaQueries)(),
      isDesktop = _useAdaptivityWithMed.isDesktop;

  (0, _ScrollContext.useScrollLock)(!!props.activeModal);
  var RootComponent = isDesktop ? _ModalRootDesktop.ModalRootDesktop : _ModalRoot.ModalRootTouch;
  return (0, _jsxRuntime.createScopedElement)(RootComponent, props);
};

exports.ModalRoot = ModalRoot;
//# sourceMappingURL=ModalRootAdaptive.js.map