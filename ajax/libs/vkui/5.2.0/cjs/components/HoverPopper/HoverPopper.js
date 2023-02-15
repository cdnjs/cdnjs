"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HoverPopper = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Popper = require("../Popper/Popper");
var _useEventListener = require("../../hooks/useEventListener");
var _useTimeout = require("../../hooks/useTimeout");
var _usePatchChildrenRef3 = require("../../hooks/usePatchChildrenRef");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _excluded = ["getRef", "content", "children", "onShownChange", "shown", "showDelay", "hideDelay"];
var HoverPopper = function HoverPopper(_ref) {
  var getRef = _ref.getRef,
    content = _ref.content,
    children = _ref.children,
    onShownChange = _ref.onShownChange,
    _shown = _ref.shown,
    _ref$showDelay = _ref.showDelay,
    showDelay = _ref$showDelay === void 0 ? 150 : _ref$showDelay,
    _ref$hideDelay = _ref.hideDelay,
    hideDelay = _ref$hideDelay === void 0 ? 150 : _ref$hideDelay,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useState = React.useState(_shown || false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    computedShown = _React$useState2[0],
    setComputedShown = _React$useState2[1];
  var shown = typeof _shown === 'boolean' ? _shown : computedShown;
  var setShown = function setShown(value) {
    if (typeof _shown !== 'boolean') {
      setComputedShown(value);
    }
    typeof onShownChange === 'function' && onShownChange(value);
  };
  var showTimeout = (0, _useTimeout.useTimeout)(function () {
    setShown(true);
  }, showDelay);
  var hideTimeout = (0, _useTimeout.useTimeout)(function () {
    setShown(false);
  }, hideDelay);
  var _usePatchChildrenRef = (0, _usePatchChildrenRef3.usePatchChildrenRef)(children),
    _usePatchChildrenRef2 = (0, _slicedToArray2.default)(_usePatchChildrenRef, 2),
    childRef = _usePatchChildrenRef2[0],
    child = _usePatchChildrenRef2[1];
  var onTargetEnter = function onTargetEnter() {
    hideTimeout.clear();
    showTimeout.set();
  };
  var onTargetLeave = function onTargetLeave() {
    showTimeout.clear();
    hideTimeout.set();
  };
  var targetEnterListener = (0, _useEventListener.useEventListener)('pointerenter', onTargetEnter);
  var targetLeaveListener = (0, _useEventListener.useEventListener)('pointerleave', onTargetLeave);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (childRef.current) {
      targetEnterListener.add(childRef.current);
      targetLeaveListener.add(childRef.current);
    }
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, child, shown && /*#__PURE__*/React.createElement(_Popper.Popper, (0, _extends2.default)({}, restProps, {
    onMouseOver: hideTimeout.clear,
    onMouseOut: onTargetLeave,
    getRef: getRef,
    targetRef: childRef
  }), content));
};
exports.HoverPopper = HoverPopper;
//# sourceMappingURL=HoverPopper.js.map