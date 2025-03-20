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
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _array = require("../../helpers/array");
const _useExternRef = require("../../hooks/useExternRef");
const _useMutationObserver = require("../../hooks/useMutationObserver");
const _accessibility = require("../../lib/accessibility");
const _dom = require("../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const FOCUSABLE_ELEMENTS = _accessibility.FOCUSABLE_ELEMENTS_LIST.join();
const FocusTrap = (_param)=>{
    var { Component = 'div', onClose, autoFocus = true, restoreFocus = true, disabled = false, mount = true, timeout = 0, getRootRef, children } = _param, restProps = _object_without_properties._(_param, [
        "Component",
        "onClose",
        "autoFocus",
        "restoreFocus",
        "disabled",
        "mount",
        "timeout",
        "getRootRef",
        "children"
    ]);
    const ref = (0, _useExternRef.useExternRef)(getRootRef);
    const { document } = (0, _dom.useDOM)();
    const focusableNodesRef = (0, _react.useRef)([]);
    const [restoreFocusTo, setRestoreFocusTo] = (0, _react.useState)(null);
    const focusNodeByIndex = (nodeIndex)=>{
        const element = focusableNodesRef.current[nodeIndex];
        if (element) {
            element.focus({
                preventScroll: true
            });
        }
    };
    const recalculateFocusableNodesRef = (parentNode)=>{
        // eslint-disable-next-line no-restricted-properties
        const newFocusableElements = parentNode.querySelectorAll(FOCUSABLE_ELEMENTS);
        const nodes = [];
        newFocusableElements.forEach((focusableEl)=>{
            const { display, visibility } = getComputedStyle(focusableEl);
            if (display !== 'none' && visibility !== 'hidden') {
                nodes.push(focusableEl);
            }
        });
        if (nodes.length === 0) {
            // Чтобы фокус был хотя бы на родителе
            nodes.push(parentNode);
        }
        focusableNodesRef.current = nodes;
    };
    const onMutateParentHandler = (parentNode)=>{
        const oldFocusableNodes = [
            ...focusableNodesRef.current
        ];
        recalculateFocusableNodesRef(parentNode);
        if (!autoFocus || (0, _array.arraysEquals)(oldFocusableNodes, focusableNodesRef.current)) {
            return;
        }
        if (document) {
            const activeElement = document.activeElement;
            const currentElementIndex = Math.max(document.activeElement ? focusableNodesRef.current.indexOf(activeElement) : -1, 0);
            focusNodeByIndex(currentElementIndex);
        }
    };
    (0, _useMutationObserver.useMutationObserver)(ref, ()=>ref.current && onMutateParentHandler(ref.current));
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        ref.current && recalculateFocusableNodesRef(ref.current);
    }, [
        ref
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function tryToAutoFocusToFirstNode() {
        if (!ref.current || !autoFocus || disabled) {
            return;
        }
        const autoFocusToNode = ()=>{
            if (!ref.current || !focusableNodesRef.current.length) {
                return;
            }
            const activeElement = (0, _dom.getActiveElementByAnotherElement)(ref.current);
            if (!(0, _dom.contains)(ref.current, activeElement)) {
                if (autoFocus === 'root') {
                    var _ref_current;
                    (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.focus();
                } else {
                    focusableNodesRef.current[0].focus();
                }
            }
        };
        const timeoutId = setTimeout(autoFocusToNode, timeout);
        return ()=>{
            clearTimeout(timeoutId);
        };
    }, [
        autoFocus,
        timeout,
        disabled
    ]);
    const restoreFocusImpl = (0, _react.useCallback)(()=>{
        const shouldRestoreFocus = typeof restoreFocus === 'function' ? restoreFocus() : restoreFocus;
        if (!restoreFocusTo || !(0, _dom.isHTMLElement)(restoreFocusTo) || !shouldRestoreFocus) {
            return;
        }
        setTimeout(()=>{
            if (restoreFocusTo) {
                restoreFocusTo.focus();
                setRestoreFocusTo(null);
            }
        }, timeout);
    }, [
        restoreFocus,
        restoreFocusTo,
        timeout
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function calculateRestoreFocusTo() {
        if (!ref.current || !restoreFocus || !mount) {
            setRestoreFocusTo(null);
            return;
        }
        setRestoreFocusTo((0, _dom.getActiveElementByAnotherElement)(ref.current));
    }, [
        ref,
        mount,
        restoreFocus
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function tryToRestoreFocusOnUnmount() {
        return ()=>restoreFocusImpl();
    }, [
        restoreFocusImpl
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function tryToRestoreFocusWhenFakeUnmount() {
        if (!mount) {
            restoreFocusImpl();
        }
    }, [
        mount,
        restoreFocusImpl
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (!ref.current) {
            return;
        }
        const onDocumentKeydown = (event)=>{
            if (disabled) {
                return;
            }
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
        ref,
        disabled
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Component, _object_spread_props._(_object_spread._({
        tabIndex: -1,
        ref: ref
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=FocusTrap.js.map