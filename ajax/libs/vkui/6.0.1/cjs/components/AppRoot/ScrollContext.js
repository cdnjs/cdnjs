"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ElementScrollController: function() {
        return ElementScrollController;
    },
    GlobalScrollController: function() {
        return GlobalScrollController;
    },
    ScrollContext: function() {
        return ScrollContext;
    },
    useScroll: function() {
        return useScroll;
    },
    useScrollLock: function() {
        return useScrollLock;
    },
    useScrollLockEffect: function() {
        return useScrollLockEffect;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _math = require("../../helpers/math");
const _dom = require("../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const clearDisableScrollStyle = (node)=>{
    Object.assign(node.style, {
        position: '',
        top: '',
        left: '',
        right: '',
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
const ScrollContext = /*#__PURE__*/ _react.createContext({
    getScroll: ()=>({
            x: 0,
            y: 0
        }),
    scrollTo: _vkjs.noop,
    isScrollLock: false,
    enableScrollLock: _vkjs.noop,
    disableScrollLock: _vkjs.noop
});
const useScroll = ()=>_react.useContext(ScrollContext);
const GlobalScrollController = ({ children })=>{
    const { window, document } = (0, _dom.useDOM)();
    const [isScrollLock, setScrollLock] = _react.useState(false);
    const beforeScrollLockFnSetRef = _react.useRef(new Set());
    const getScroll = _react.useCallback(()=>({
            x: window.pageXOffset,
            y: getPageYOffsetWithoutKeyboardHeight(window)
        }), [
        window
    ]);
    const scrollTo = _react.useCallback((x = 0, y = 0)=>{
        // Some iOS versions do not normalize scroll — do it manually.
        window.scrollTo(x ? (0, _math.clamp)(x, 0, document.body.scrollWidth - window.innerWidth) : 0, y ? (0, _math.clamp)(y, 0, document.body.scrollHeight - window.innerHeight) : 0);
    }, [
        document,
        window
    ]);
    const enableScrollLock = _react.useCallback(()=>{
        beforeScrollLockFnSetRef.current.forEach((fn)=>{
            fn();
        });
        const scrollY = window.pageYOffset;
        const scrollX = window.pageXOffset;
        const overflowY = window.innerWidth > document.documentElement.clientWidth ? 'scroll' : '';
        const overflowX = window.innerHeight > document.documentElement.clientHeight ? 'scroll' : '';
        Object.assign(document.body.style, {
            position: 'fixed',
            top: `-${scrollY}px`,
            left: `-${scrollX}px`,
            right: '0',
            overflowY,
            overflowX
        });
        setScrollLock(true);
    }, [
        document,
        window
    ]);
    const disableScrollLock = _react.useCallback(()=>{
        const scrollY = document.body.style.top;
        const scrollX = document.body.style.left;
        clearDisableScrollStyle(document.body);
        window.scrollTo(-parseInt(scrollX || '0'), -parseInt(scrollY || '0'));
        setScrollLock(false);
    }, [
        document,
        window
    ]);
    const scrollController = _react.useMemo(()=>({
            getScroll,
            scrollTo,
            isScrollLock,
            disableScrollLock,
            enableScrollLock,
            beforeScrollLockFnSetRef: beforeScrollLockFnSetRef
        }), [
        getScroll,
        scrollTo,
        isScrollLock,
        disableScrollLock,
        enableScrollLock
    ]);
    return /*#__PURE__*/ _react.createElement(ScrollContext.Provider, {
        value: scrollController
    }, children);
};
const ElementScrollController = ({ elRef, children })=>{
    const [isScrollLock, setScrollLock] = _react.useState(false);
    const beforeScrollLockFnSetRef = _react.useRef(new Set());
    const getScroll = _react.useCallback(()=>{
        var _elRef_current, _elRef_current1;
        var _elRef_current_scrollLeft, _elRef_current_scrollTop;
        return {
            x: (_elRef_current_scrollLeft = (_elRef_current = elRef.current) === null || _elRef_current === void 0 ? void 0 : _elRef_current.scrollLeft) !== null && _elRef_current_scrollLeft !== void 0 ? _elRef_current_scrollLeft : 0,
            y: (_elRef_current_scrollTop = (_elRef_current1 = elRef.current) === null || _elRef_current1 === void 0 ? void 0 : _elRef_current1.scrollTop) !== null && _elRef_current_scrollTop !== void 0 ? _elRef_current_scrollTop : 0
        };
    }, [
        elRef
    ]);
    const scrollTo = _react.useCallback((x = 0, y = 0)=>{
        const el = elRef.current;
        // Some iOS versions do not normalize scroll — do it manually.
        el === null || el === void 0 ? void 0 : el.scrollTo(x ? (0, _math.clamp)(x, 0, el.scrollWidth - el.clientWidth) : 0, y ? (0, _math.clamp)(y, 0, el.scrollHeight - el.clientHeight) : 0);
    }, [
        elRef
    ]);
    const enableScrollLock = _react.useCallback(()=>{
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
        setScrollLock(true);
    }, [
        elRef
    ]);
    const disableScrollLock = _react.useCallback(()=>{
        const el = elRef.current;
        if (!el) {
            return;
        }
        const scrollY = el.style.top;
        const scrollX = el.style.left;
        clearDisableScrollStyle(el);
        el.scrollTo(-parseInt(scrollX || '0'), -parseInt(scrollY || '0'));
        setScrollLock(false);
    }, [
        elRef
    ]);
    const scrollController = _react.useMemo(()=>({
            getScroll,
            scrollTo,
            isScrollLock,
            disableScrollLock,
            enableScrollLock,
            beforeScrollLockFnSetRef
        }), [
        getScroll,
        scrollTo,
        isScrollLock,
        disableScrollLock,
        enableScrollLock
    ]);
    return /*#__PURE__*/ _react.createElement(ScrollContext.Provider, {
        value: scrollController
    }, children);
};
const useScrollLockEffect = (effect, deps)=>{
    const destructorRef = _react.useRef(_vkjs.noop);
    const { isScrollLock, beforeScrollLockFnSetRef } = useScroll();
    // Изменяем effectCallback только при изменении deps
    const effectCallback = _react.useCallback(()=>{
        destructorRef.current = effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    // Добавляем effectCallback в список функций, которые необходимо вызвать
    // до блокировки
    _react.useEffect(()=>{
        const beforeSet = beforeScrollLockFnSetRef === null || beforeScrollLockFnSetRef === void 0 ? void 0 : beforeScrollLockFnSetRef.current;
        if (!beforeSet) {
            return _vkjs.noop;
        }
        beforeSet.add(effectCallback);
        return ()=>{
            beforeSet.delete(effectCallback);
        };
    }, [
        beforeScrollLockFnSetRef,
        effectCallback
    ]);
    // Вызываем сбрасывающую функцию, после отключения блокировки
    _react.useEffect(()=>{
        if (!isScrollLock && destructorRef.current) {
            destructorRef.current();
        }
    }, [
        isScrollLock
    ]);
};
const useScrollLock = (enabled = true)=>{
    const { enableScrollLock, disableScrollLock, isScrollLock } = useScroll();
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (enabled && !isScrollLock) {
            enableScrollLock();
            return disableScrollLock;
        }
        return _vkjs.noop;
    }, [
        enableScrollLock,
        disableScrollLock,
        enabled
    ]);
};

//# sourceMappingURL=ScrollContext.js.map