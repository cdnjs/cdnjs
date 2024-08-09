import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { useExternRef } from "../../hooks/useExternRef";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { useTimeout } from "../../hooks/useTimeout";
import { FOCUSABLE_ELEMENTS_LIST, Keys, pressedKey } from "../../lib/accessibility";
import { useDOM } from "../../lib/dom";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { AppRootContext } from "../AppRoot/AppRootContext";
var FOCUSABLE_ELEMENTS = FOCUSABLE_ELEMENTS_LIST.join();
/**
 * @see https://vkcom.github.io/VKUI/#/FocusTrap
 */ export var FocusTrap = function(_param) {
    var _param_Component = _param.Component, Component = _param_Component === void 0 ? "div" : _param_Component, onClose = _param.onClose, _param_restoreFocus = _param.restoreFocus, restoreFocus = _param_restoreFocus === void 0 ? true : _param_restoreFocus, _param_timeout = _param.timeout, timeout = _param_timeout === void 0 ? 0 : _param_timeout, getRootRef = _param.getRootRef, children = _param.children, restProps = _object_without_properties(_param, [
        "Component",
        "onClose",
        "restoreFocus",
        "timeout",
        "getRootRef",
        "children"
    ]);
    var ref = useExternRef(getRootRef);
    var _useDOM = useDOM(), document = _useDOM.document, window = _useDOM.window;
    var _React_useState = _sliced_to_array(React.useState(null), 2), focusableNodes = _React_useState[0], setFocusableNodes = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(null), 2), restoreFocusTo = _React_useState1[0], setRestoreFocusTo = _React_useState1[1];
    // HANDLE TRAP MOUNT
    var keyboardInput = React.useContext(AppRootContext).keyboardInput;
    var focusOnTrapMount = useTimeout(function() {
        var _ref_current;
        if (keyboardInput && !((_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.contains(document.activeElement)) && (focusableNodes === null || focusableNodes === void 0 ? void 0 : focusableNodes.length)) {
            focusableNodes[0].focus();
        }
    }, timeout);
    useIsomorphicLayoutEffect(function() {
        focusOnTrapMount.set();
    }, []);
    // HANDLE FOCUSABLE NODES
    useIsomorphicLayoutEffect(function() {
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
    var focusOnTrapUnmount = useTimeout(function() {
        if (restoreFocusTo) {
            restoreFocusTo.focus();
        }
    }, timeout);
    useIsomorphicLayoutEffect(function() {
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
        if (pressedKey(e) === Keys.TAB && (focusableNodes === null || focusableNodes === void 0 ? void 0 : focusableNodes.length)) {
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
        if (onClose && pressedKey(e) === Keys.ESCAPE) {
            onClose();
        }
        return true;
    };
    useGlobalEventListener(document, "keydown", onDocumentKeydown, {
        capture: true
    });
    return /*#__PURE__*/ React.createElement(Component, _object_spread({
        tabIndex: -1,
        ref: ref
    }, restProps), children);
};

//# sourceMappingURL=FocusTrap.js.map