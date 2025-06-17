'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math.js";
import { useDOM } from "../../lib/dom.js";
const clearDisableScrollStyle = (node)=>{
    Object.assign(node.style, {
        position: '',
        top: '',
        left: '',
        right: '',
        overscrollBehavior: '',
        overflowY: '',
        overflowX: ''
    });
};
const getPageYOffsetWithoutKeyboardHeight = (window)=>{
    // Note: здесь расчёт на то, что `clientHeight` равен `window.innerHeight`.
    //  Это достигается тем, что тегу `html` задали`height: 100%` и у него нет отступов сверху и снизу. Если есть отступы,
    //  то надо задать `box-sizing: border-box`, чтобы они не учитывались.
    const diffOfClientHeightAndViewportHeight = window.document.documentElement.clientHeight - window.innerHeight;
    return window.pageYOffset - diffOfClientHeightAndViewportHeight;
};
export const ScrollContext = /*#__PURE__*/ React.createContext({
    getScroll: ()=>({
            x: 0,
            y: 0
        }),
    scrollTo: noop,
    incrementScrollLockCounter: noop,
    decrementScrollLockCounter: noop
});
export const useScroll = ()=>React.useContext(ScrollContext);
/**
 * Управляет блокировкой окна в зависимости от внутреннего счетчика.
 * Если счетчик больше нуля, требуется заблокировать прокрутку
 */ function useScrollLockController(enableScrollLock, disableScrollLock) {
    const countRef = React.useRef(0);
    const updateScrollLock = React.useCallback(()=>{
        if (countRef.current > 0) {
            enableScrollLock();
        } else {
            disableScrollLock();
        }
    }, [
        enableScrollLock,
        disableScrollLock
    ]);
    const incrementScrollLockCounter = React.useCallback(()=>{
        countRef.current += 1;
        updateScrollLock();
    }, [
        updateScrollLock
    ]);
    const decrementScrollLockCounter = React.useCallback(()=>{
        countRef.current -= 1;
        updateScrollLock();
    }, [
        updateScrollLock
    ]);
    return [
        incrementScrollLockCounter,
        decrementScrollLockCounter
    ];
}
export const GlobalScrollController = ({ children })=>{
    const { window, document } = useDOM();
    const beforeScrollLockFnSetRef = React.useRef(new Set());
    const getScroll = React.useCallback((options = {
        compensateKeyboardHeight: true
    })=>({
            x: window.pageXOffset,
            y: options.compensateKeyboardHeight ? getPageYOffsetWithoutKeyboardHeight(window) : window.pageYOffset
        }), [
        window
    ]);
    const scrollTo = React.useCallback((x = 0, y = 0)=>{
        // Some iOS versions do not normalize scroll — do it manually.
        window.scrollTo(x ? clamp(x, 0, document.body.scrollWidth - window.innerWidth) : 0, y ? clamp(y, 0, document.body.scrollHeight - window.innerHeight) : 0);
    }, [
        document,
        window
    ]);
    const enableScrollLock = React.useCallback(()=>{
        beforeScrollLockFnSetRef.current.forEach((fn)=>{
            fn();
        });
        const scrollY = window.pageYOffset;
        const scrollX = window.pageXOffset;
        const overflowY = window.innerWidth > document.documentElement.clientWidth ? 'scroll' : '';
        const overflowX = window.innerHeight > document.documentElement.clientHeight ? 'scroll' : '';
        Object.assign(document.documentElement.style, {
            overscrollBehavior: 'none'
        });
        Object.assign(document.body.style, {
            position: 'fixed',
            top: `-${scrollY}px`,
            left: `-${scrollX}px`,
            right: '0',
            overscrollBehavior: 'none',
            overflowY,
            overflowX
        });
    }, [
        document,
        window
    ]);
    const disableScrollLock = React.useCallback(()=>{
        const scrollY = document.body.style.top;
        const scrollX = document.body.style.left;
        Object.assign(document.documentElement.style, {
            overscrollBehavior: ''
        });
        clearDisableScrollStyle(document.body);
        window.scrollTo(-parseInt(scrollX || '0'), -parseInt(scrollY || '0'));
    }, [
        document,
        window
    ]);
    const [incrementScrollLockCounter, decrementScrollLockCounter] = useScrollLockController(enableScrollLock, disableScrollLock);
    const scrollController = React.useMemo(()=>({
            getScroll,
            scrollTo,
            incrementScrollLockCounter,
            decrementScrollLockCounter,
            beforeScrollLockFnSetRef: beforeScrollLockFnSetRef
        }), [
        getScroll,
        scrollTo,
        incrementScrollLockCounter,
        decrementScrollLockCounter
    ]);
    return /*#__PURE__*/ _jsx(ScrollContext.Provider, {
        value: scrollController,
        children: children
    });
};
export const ElementScrollController = ({ elRef, children })=>{
    const beforeScrollLockFnSetRef = React.useRef(new Set());
    const getScroll = React.useCallback(()=>{
        var _elRef_current, _elRef_current1;
        var _elRef_current_scrollLeft, _elRef_current_scrollTop;
        return {
            x: (_elRef_current_scrollLeft = (_elRef_current = elRef.current) === null || _elRef_current === void 0 ? void 0 : _elRef_current.scrollLeft) !== null && _elRef_current_scrollLeft !== void 0 ? _elRef_current_scrollLeft : 0,
            y: (_elRef_current_scrollTop = (_elRef_current1 = elRef.current) === null || _elRef_current1 === void 0 ? void 0 : _elRef_current1.scrollTop) !== null && _elRef_current_scrollTop !== void 0 ? _elRef_current_scrollTop : 0
        };
    }, [
        elRef
    ]);
    const scrollTo = React.useCallback((x = 0, y = 0)=>{
        const el = elRef.current;
        // Some iOS versions do not normalize scroll — do it manually.
        el === null || el === void 0 ? void 0 : el.scrollTo(x ? clamp(x, 0, el.scrollWidth - el.clientWidth) : 0, y ? clamp(y, 0, el.scrollHeight - el.clientHeight) : 0);
    }, [
        elRef
    ]);
    const enableScrollLock = React.useCallback(()=>{
        const el = elRef.current;
        if (!el) {
            return;
        }
        beforeScrollLockFnSetRef.current.forEach((fn)=>{
            fn();
        });
        const scrollY = el.scrollTop;
        const scrollX = el.scrollLeft;
        const overflowY = el.scrollWidth > el.clientWidth ? 'scroll' : '';
        const overflowX = el.scrollHeight > el.clientHeight ? 'scroll' : '';
        Object.assign(el.style, {
            position: 'absolute',
            top: `-${scrollY}px`,
            left: `-${scrollX}px`,
            right: '0',
            overflowY,
            overflowX
        });
    }, [
        elRef
    ]);
    const disableScrollLock = React.useCallback(()=>{
        const el = elRef.current;
        if (!el) {
            return;
        }
        const scrollY = el.style.top;
        const scrollX = el.style.left;
        clearDisableScrollStyle(el);
        el.scrollTo(-parseInt(scrollX || '0'), -parseInt(scrollY || '0'));
    }, [
        elRef
    ]);
    const [incrementScrollLockCounter, decrementScrollLockCounter] = useScrollLockController(enableScrollLock, disableScrollLock);
    const scrollController = React.useMemo(()=>({
            getScroll,
            scrollTo,
            incrementScrollLockCounter,
            decrementScrollLockCounter,
            beforeScrollLockFnSetRef
        }), [
        getScroll,
        scrollTo,
        incrementScrollLockCounter,
        decrementScrollLockCounter
    ]);
    return /*#__PURE__*/ _jsx(ScrollContext.Provider, {
        value: scrollController,
        children: children
    });
};
/**
 * Блокирует прокрутку окна
 *
 * @param enabled - если false то не будет блокировать
 */ export const useScrollLock = (enabled = true)=>{
    const { incrementScrollLockCounter, decrementScrollLockCounter } = useScroll();
    React.useEffect(()=>{
        if (enabled) {
            incrementScrollLockCounter();
            return decrementScrollLockCounter;
        }
        return noop;
    }, [
        enabled,
        incrementScrollLockCounter,
        decrementScrollLockCounter
    ]);
};

//# sourceMappingURL=ScrollContext.js.map