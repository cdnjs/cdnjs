import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["Component", "onClose", "restoreFocus", "timeout", "getRootRef", "children"];
import * as React from 'react';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useTimeout } from '../../hooks/useTimeout';
import { FOCUSABLE_ELEMENTS_LIST, Keys, pressedKey } from '../../lib/accessibility';
import { useDOM } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { AppRootContext } from '../AppRoot/AppRootContext';
var FOCUSABLE_ELEMENTS = FOCUSABLE_ELEMENTS_LIST.join();
/**
 * @see https://vkcom.github.io/VKUI/#/FocusTrap
 */
export var FocusTrap = function FocusTrap(_ref) {
  var _ref$Component = _ref.Component,
    Component = _ref$Component === void 0 ? 'div' : _ref$Component,
    onClose = _ref.onClose,
    _ref$restoreFocus = _ref.restoreFocus,
    restoreFocus = _ref$restoreFocus === void 0 ? true : _ref$restoreFocus,
    _ref$timeout = _ref.timeout,
    timeout = _ref$timeout === void 0 ? 0 : _ref$timeout,
    getRootRef = _ref.getRootRef,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var ref = useExternRef(getRootRef);
  var _useDOM = useDOM(),
    document = _useDOM.document,
    window = _useDOM.window;
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusableNodes = _React$useState2[0],
    setFocusableNodes = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    restoreFocusTo = _React$useState4[0],
    setRestoreFocusTo = _React$useState4[1];

  // HANDLE TRAP MOUNT

  var _React$useContext = React.useContext(AppRootContext),
    keyboardInput = _React$useContext.keyboardInput;
  var focusOnTrapMount = useTimeout(function () {
    var _ref$current;
    if (keyboardInput && !((_ref$current = ref.current) !== null && _ref$current !== void 0 && _ref$current.contains(document.activeElement)) && focusableNodes !== null && focusableNodes !== void 0 && focusableNodes.length) {
      focusableNodes[0].focus();
    }
  }, timeout);
  useIsomorphicLayoutEffect(function () {
    focusOnTrapMount.set();
  }, []);

  // HANDLE FOCUSABLE NODES

  useIsomorphicLayoutEffect(function () {
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

  var focusOnTrapUnmount = useTimeout(function () {
    if (restoreFocusTo) {
      restoreFocusTo.focus();
    }
  }, timeout);
  useIsomorphicLayoutEffect(function () {
    if (restoreFocus && document.activeElement) {
      setRestoreFocusTo(document.activeElement);
      return function () {
        focusOnTrapUnmount.set();
      };
    }
    return;
  }, [restoreFocus]);
  var onDocumentKeydown = function onDocumentKeydown(e) {
    if (pressedKey(e) === Keys.TAB && focusableNodes !== null && focusableNodes !== void 0 && focusableNodes.length) {
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
    if (onClose && pressedKey(e) === Keys.ESCAPE) {
      onClose();
    }
    return true;
  };
  useGlobalEventListener(document, 'keydown', onDocumentKeydown, {
    capture: true
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    tabIndex: -1,
    ref: ref
  }, restProps), children);
};
//# sourceMappingURL=FocusTrap.js.map