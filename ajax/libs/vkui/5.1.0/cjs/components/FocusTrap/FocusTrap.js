"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusTrap = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _useExternRef = require("../../hooks/useExternRef");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _useTimeout = require("../../hooks/useTimeout");
var _accessibility = require("../../lib/accessibility");
var _dom = require("../../lib/dom");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _AppRootContext = require("../AppRoot/AppRootContext");
var _excluded = ["Component", "onClose", "restoreFocus", "timeout", "getRootRef", "children"];
var FOCUSABLE_ELEMENTS = _accessibility.FOCUSABLE_ELEMENTS_LIST.join();
/**
 * @see https://vkcom.github.io/VKUI/#/FocusTrap
 */
var FocusTrap = function FocusTrap(_ref) {
  var _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'div' : _ref$Component,
    onClose = _ref.onClose,
    _ref$restoreFocus = _ref.restoreFocus,
    restoreFocus = _ref$restoreFocus === void 0 ? true : _ref$restoreFocus,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 0 : _ref$timeout,
    getRootRef = _ref.getRootRef,
    children = _ref.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var ref = (0, _useExternRef.useExternRef)(getRootRef);
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document,
    window = _useDOM.window;
  var _React$useState = React.useState(null),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    focusableNodes = _React$useState2[0],
    setFocusableNodes = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    restoreFocusTo = _React$useState4[0],
    setRestoreFocusTo = _React$useState4[1];

  // HANDLE TRAP MOUNT

  var _React$useContext = React.useContext(_AppRootContext.AppRootContext),
    keyboardInput = _React$useContext.keyboardInput;
  var focusOnTrapMount = (0, _useTimeout.useTimeout)(function () {
    var _ref$current;
    if (keyboardInput && !((_ref$current = ref.current) !== null && _ref$current !== void 0 && _ref$current.contains(document.activeElement)) && focusableNodes !== null && focusableNodes !== void 0 && focusableNodes.length) {
      focusableNodes[0].focus();
    }
  }, timeout);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    focusOnTrapMount.set();
  }, []);

  // HANDLE FOCUSABLE NODES

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (!ref.current) {
      return;
    }
    var nodes = [];
    Array.prototype.forEach.call(
    // eslint-disable-next-line no-restricted-properties
    ref.current.querySelectorAll(FOCUSABLE_ELEMENTS), function (focusableEl) {
      var _getComputedStyle = window.getComputedStyle(focusableEl),
        display = _getComputedStyle.display,
        visibility = _getComputedStyle.visibility;
      if (display !== 'none' && visibility !== 'hidden') {
        nodes.push(focusableEl);
      }
    });
    if (nodes.length === 0) {
      // Чтобы фокус был хотя бы на родителе
      nodes.push(ref.current);
    }
    setFocusableNodes(nodes);
  }, [children]);

  // HANDLE TRAP UNMOUNT

  var focusOnTrapUnmount = (0, _useTimeout.useTimeout)(function () {
    if (restoreFocusTo) {
      restoreFocusTo.focus();
    }
  }, timeout);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (restoreFocus && document.activeElement) {
      setRestoreFocusTo(document.activeElement);
      return function () {
        focusOnTrapUnmount.set();
      };
    }
    return;
  }, [restoreFocus]);
  var onDocumentKeydown = function onDocumentKeydown(e) {
    if ((0, _accessibility.pressedKey)(e) === _accessibility.Keys.TAB && focusableNodes !== null && focusableNodes !== void 0 && focusableNodes.length) {
      var lastIdx = focusableNodes.length - 1;
      var targetIdx = focusableNodes.findIndex(function (node) {
        return node === e.target;
      });
      var shouldFocusFirstNode = targetIdx === -1 || targetIdx === lastIdx && !e.shiftKey;
      if (shouldFocusFirstNode || targetIdx === 0 && e.shiftKey) {
        e.preventDefault();
        var node = focusableNodes[shouldFocusFirstNode ? 0 : lastIdx];
        if (node !== document.activeElement) {
          node.focus();
        }
        return false;
      }
    }
    if (onClose && (0, _accessibility.pressedKey)(e) === _accessibility.Keys.ESCAPE) {
      onClose();
    }
    return true;
  };
  (0, _useGlobalEventListener.useGlobalEventListener)(document, 'keydown', onDocumentKeydown, {
    capture: true
  });
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    tabIndex: -1,
    ref: ref
  }, restProps), children);
};
exports.FocusTrap = FocusTrap;
//# sourceMappingURL=FocusTrap.js.map