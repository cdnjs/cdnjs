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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useExternRef = require("../../hooks/useExternRef");
const _accessibility = require("../../lib/accessibility");
const _dom = require("../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const _AppRootContext = require("../AppRoot/AppRootContext");
const FOCUSABLE_ELEMENTS = _accessibility.FOCUSABLE_ELEMENTS_LIST.join();
const FocusTrap = (_param)=>{
    var { Component = 'div', onClose, autoFocus = true, restoreFocus = true, timeout = 0, getRootRef, children } = _param, restProps = _object_without_properties._(_param, [
        "Component",
        "onClose",
        "autoFocus",
        "restoreFocus",
        "timeout",
        "getRootRef",
        "children"
    ]);
    const ref = (0, _useExternRef.useExternRef)(getRootRef);
    const { keyboardInput } = _react.useContext(_AppRootContext.AppRootContext);
    const focusableNodesRef = _react.useRef([]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function collectFocusableNodesRef() {
        if (!ref.current) {
            return;
        }
        const nodes = [];
        // eslint-disable-next-line no-restricted-properties
        ref.current.querySelectorAll(FOCUSABLE_ELEMENTS).forEach((focusableEl)=>{
            const { display, visibility } = getComputedStyle(focusableEl);
            if (display !== 'none' && visibility !== 'hidden') {
                nodes.push(focusableEl);
            }
        });
        if (nodes.length === 0) {
            // Чтобы фокус был хотя бы на родителе
            nodes.push(ref.current);
        }
        focusableNodesRef.current = nodes;
    }, [
        children
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function tryToAutoFocusToFirstNode() {
        if (!ref.current || !autoFocus || !keyboardInput) {
            return;
        }
        const autoFocusToFirstNode = ()=>{
            if (!ref.current || !focusableNodesRef.current.length) {
                return;
            }
            const activeElement = (0, _dom.getActiveElementByAnotherElement)(ref.current);
            if (!(0, _dom.contains)(ref.current, activeElement)) {
                focusableNodesRef.current[0].focus();
            }
        };
        const timeoutId = setTimeout(autoFocusToFirstNode, timeout);
        return ()=>{
            clearTimeout(timeoutId);
        };
    }, [
        autoFocus,
        timeout,
        keyboardInput
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function tryToRestoreFocusOnUnmount() {
        if (!ref.current || !restoreFocus) {
            return;
        }
        const restoreFocusTo = (0, _dom.getActiveElementByAnotherElement)(ref.current);
        return ()=>{
            const shouldRestoreFocus = typeof restoreFocus === 'function' ? restoreFocus() : restoreFocus;
            if (!shouldRestoreFocus || !(0, _dom.isHTMLElement)(restoreFocusTo)) {
                return;
            }
            setTimeout(()=>{
                if (restoreFocusTo) {
                    restoreFocusTo.focus();
                }
            }, timeout);
        };
    }, [
        restoreFocus,
        timeout
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (!ref.current) {
            return;
        }
        const onDocumentKeydown = (event)=>{
            const pressedKeyResult = (0, _accessibility.pressedKey)(event);
            switch(pressedKeyResult){
                case _accessibility.Keys.TAB:
                    {
                        if (!focusableNodesRef.current.length) {
                            return false;
                        }
                        const lastIdx = focusableNodesRef.current.length - 1;
                        const targetIdx = focusableNodesRef.current.findIndex((node)=>node === event.target);
                        const shouldFocusFirstNode = targetIdx === -1 || targetIdx === lastIdx && !event.shiftKey;
                        if (shouldFocusFirstNode || targetIdx === 0 && event.shiftKey) {
                            event.preventDefault();
                            const node = focusableNodesRef.current[shouldFocusFirstNode ? 0 : lastIdx];
                            if (node !== (0, _dom.getActiveElementByAnotherElement)(node)) {
                                node.focus();
                            }
                            return false;
                        }
                        break;
                    }
                case _accessibility.Keys.ESCAPE:
                    {
                        if (onClose) {
                            event.preventDefault();
                            onClose();
                        }
                    }
            }
            return true;
        };
        const doc = (0, _dom.getWindow)(ref.current).document;
        doc.addEventListener('keydown', onDocumentKeydown, {
            capture: true
        });
        return ()=>{
            doc.removeEventListener('keydown', onDocumentKeydown, true);
        };
    }, [
        onClose,
        ref
    ]);
    return /*#__PURE__*/ _react.createElement(Component, _object_spread._({
        tabIndex: -1,
        ref: ref
    }, restProps), children);
};

//# sourceMappingURL=FocusTrap.js.map