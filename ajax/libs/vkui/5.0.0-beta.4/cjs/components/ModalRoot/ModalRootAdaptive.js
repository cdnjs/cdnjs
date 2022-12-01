"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _ModalRoot = require("./ModalRoot");
var _ModalRootDesktop = require("./ModalRootDesktop");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
/**
 * @see https://vkcom.github.io/VKUI/#/ModalRoot
 */
var ModalRoot = function ModalRoot(props) {
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  (0, _ScrollContext.useScrollLock)(!!props.activeModal);
  var RootComponent = isDesktop ? _ModalRootDesktop.ModalRootDesktop : _ModalRoot.ModalRootTouch;
  return /*#__PURE__*/React.createElement(RootComponent, props);
};
exports.ModalRoot = ModalRoot;
//# sourceMappingURL=ModalRootAdaptive.js.map