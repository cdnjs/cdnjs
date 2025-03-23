import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useRef, useState } from 'react';
import { arraysEquals } from '../../helpers/array';
import { useExternRef } from '../../hooks/useExternRef';
import { useMutationObserver } from '../../hooks/useMutationObserver';
import { FOCUSABLE_ELEMENTS_LIST, Keys, pressedKey } from '../../lib/accessibility';
import { contains, getActiveElementByAnotherElement, getWindow, isHTMLElement, useDOM } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
const FOCUSABLE_ELEMENTS = FOCUSABLE_ELEMENTS_LIST.join();
/**
 * @see https://vkcom.github.io/VKUI/#/FocusTrap
 */ export const FocusTrap = (_param)=>{
    var { Component = 'div', onClose, autoFocus = true, restoreFocus = true, disabled = false, mount = true, timeout = 0, getRootRef, children } = _param, restProps = _object_without_properties(_param, [
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
    const ref = useExternRef(getRootRef);
    const { document } = useDOM();
    const focusableNodesRef = useRef([]);
    const [restoreFocusTo, setRestoreFocusTo] = useState(null);
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
        if (!autoFocus || arraysEquals(oldFocusableNodes, focusableNodesRef.current)) {
            return;
        }
        if (document) {
            const activeElement = document.activeElement;
            const currentElementIndex = Math.max(document.activeElement ? focusableNodesRef.current.indexOf(activeElement) : -1, 0);
            focusNodeByIndex(currentElementIndex);
        }
    };
    useMutationObserver(ref, ()=>ref.current && onMutateParentHandler(ref.current));
    useIsomorphicLayoutEffect(()=>{
        ref.current && recalculateFocusableNodesRef(ref.current);
    }, [
        ref
    ]);
    useIsomorphicLayoutEffect(function tryToAutoFocusToFirstNode() {
        if (!ref.current || !autoFocus || disabled) {
            return;
        }
        const autoFocusToNode = ()=>{
            if (!ref.current || !focusableNodesRef.current.length) {
                return;
            }
            const activeElement = getActiveElementByAnotherElement(ref.current);
            if (!contains(ref.current, activeElement)) {
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
    const restoreFocusImpl = useCallback(()=>{
        const shouldRestoreFocus = typeof restoreFocus === 'function' ? restoreFocus() : restoreFocus;
        if (!restoreFocusTo || !isHTMLElement(restoreFocusTo) || !shouldRestoreFocus) {
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
    useIsomorphicLayoutEffect(function calculateRestoreFocusTo() {
        if (!ref.current || !restoreFocus || !mount) {
            setRestoreFocusTo(null);
            return;
        }
        setRestoreFocusTo(getActiveElementByAnotherElement(ref.current));
    }, [
        ref,
        mount,
        restoreFocus
    ]);
    useIsomorphicLayoutEffect(function tryToRestoreFocusOnUnmount() {
        return ()=>restoreFocusImpl();
    }, [
        restoreFocusImpl
    ]);
    useIsomorphicLayoutEffect(function tryToRestoreFocusWhenFakeUnmount() {
        if (!mount) {
            restoreFocusImpl();
        }
    }, [
        mount,
        restoreFocusImpl
    ]);
    useIsomorphicLayoutEffect(()=>{
        if (!ref.current) {
            return;
        }
        const onDocumentKeydown = (event)=>{
            if (disabled) {
                return;
            }
            const pressedKeyResult = pressedKey(event);
            switch(pressedKeyResult){
                case Keys.TAB:
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
                            if (node !== getActiveElementByAnotherElement(node)) {
                                node.focus();
                            }
                            return false;
                        }
                        break;
                    }
                case Keys.ESCAPE:
                    {
                        if (onClose) {
                            event.preventDefault();
                            onClose();
                        }
                    }
            }
            return true;
        };
        const doc = getWindow(ref.current).document;
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
    return /*#__PURE__*/ _jsx(Component, _object_spread_props(_object_spread({
        tabIndex: -1,
        ref: ref
    }, restProps), {
        children: children
    }));
};

//# sourceMappingURL=FocusTrap.js.map