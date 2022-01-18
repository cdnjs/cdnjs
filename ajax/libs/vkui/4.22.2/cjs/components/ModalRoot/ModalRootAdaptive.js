"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalRoot = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _ModalRoot = require("./ModalRoot");

var _ModalRootDesktop = require("./ModalRootDesktop");

var ModalRootComponent = function ModalRootComponent(props) {
  var viewWidth = props.viewWidth,
      viewHeight = props.viewHeight,
      hasMouse = props.hasMouse;
  var isDesktop = viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= _withAdaptivity.ViewHeight.MEDIUM);
  var RootComponent = isDesktop ? _ModalRootDesktop.ModalRootDesktop : _ModalRoot.ModalRootTouch;
  return (0, _jsxRuntime.createScopedElement)(RootComponent, props);
};

ModalRootComponent.displayName = 'ModalRoot';
var ModalRoot = (0, _withAdaptivity.withAdaptivity)(ModalRootComponent, {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});
exports.ModalRoot = ModalRoot;
//# sourceMappingURL=ModalRootAdaptive.js.map