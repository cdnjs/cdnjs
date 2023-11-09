"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FocusTrap", {
    enumerable: true,
    get: function() {
        return FocusTrap;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useExternRef = require("../../hooks/useExternRef");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _useTimeout = require("../../hooks/useTimeout");
var _accessibility = require("../../lib/accessibility");
var _dom = require("../../lib/dom");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _AppRootContext = require("../AppRoot/AppRootContext");
var FOCUSABLE_ELEMENTS = _accessibility.FOCUSABLE_ELEMENTS_LIST.join();
var FocusTrap = function(_param) {
    var _param_Component = _param.Component, Component = _param_Component === void 0 ? "div" : _param_Component, onClose = _param.onClose, _param_restoreFocus = _param.restoreFocus, restoreFocus = _param_restoreFocus === void 0 ? true : _param_restoreFocus, _param_timeout = _param.timeout, timeout = _param_timeout === void 0 ? 0 : _param_timeout, getRootRef = _param.getRootRef, children = _param.children, restProps = _object_without_properties._(_param, [
        "Component",
        "onClose",
        "restoreFocus",
        "timeout",
        "getRootRef",
        "children"
    ]);
    var ref = (0, _useExternRef.useExternRef)(getRootRef);
    var _useDOM = (0, _dom.useDOM)(), document = _useDOM.document, window = _useDOM.window;
    var _React_useState = _sliced_to_array._(_react.useState(null), 2), focusableNodes = _React_useState[0], setFocusableNodes = _React_useState[1];
    var _React_useState1 = _sliced_to_array._(_react.useState(null), 2), restoreFocusTo = _React_useState1[0], setRestoreFocusTo = _React_useState1[1];
    // HANDLE TRAP MOUNT
    var keyboardInput = _react.useContext(_AppRootContext.AppRootContext).keyboardInput;
    var focusOnTrapMount = (0, _useTimeout.useTimeout)(function() {
        var _ref_current;
        if (keyboardInput && !((_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.contains(document.activeElement)) && (focusableNodes === null || focusableNodes === void 0 ? void 0 : focusableNodes.length)) {
            focusableNodes[0].focus();
        }
    }, timeout);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        focusOnTrapMount.set();
    }, []);
    // HANDLE FOCUSABLE NODES
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (!ref.current) {
            return;
        }
        var nodes = [];
        Array.prototype.forEach.call(// eslint-disable-next-line no-restricted-properties
        ref.current.querySelectorAll(FOCUSABLE_ELEMENTS), function(focusableEl) {
            var _window_getComputedStyle = window.getComputedStyle(focusableEl), display = _window_getComputedStyle.display, visibility = _window_getComputedStyle.visibility;
            if (display !== "none" && visibility !== "hidden") {
                nodes.push(focusableEl);
            }
        });
        if (nodes.length === 0) {
            // Чтобы фокус был хотя бы на родителе
            nodes.push(ref.current);
        }
        setFocusableNodes(nodes);
    }, [
        children
    ]);
    // HANDLE TRAP UNMOUNT
    var focusOnTrapUnmount = (0, _useTimeout.useTimeout)(function() {
        if (restoreFocusTo) {
            restoreFocusTo.focus();
        }
    }, timeout);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        if (restoreFocus && document.activeElement) {
            setRestoreFocusTo(document.activeElement);
            return function() {
                focusOnTrapUnmount.set();
            };
        }
        return;
    }, [
        restoreFocus
    ]);
    var onDocumentKeydown = function(e) {
        if ((0, _accessibility.pressedKey)(e) === _accessibility.Keys.TAB && (focusableNodes === null || focusableNodes === void 0 ? void 0 : focusableNodes.length)) {
            var lastIdx = focusableNodes.length - 1;
            var targetIdx = focusableNodes.findIndex(function(node) {
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
    (0, _useGlobalEventListener.useGlobalEventListener)(document, "keydown", onDocumentKeydown, {
        capture: true
    });
    return /*#__PURE__*/ _react.createElement(Component, _object_spread._({
        tabIndex: -1,
        ref: ref
    }, restProps), children);
};

//# sourceMappingURL=FocusTrap.js.map