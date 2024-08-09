import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math";
import { useDOM } from "../../lib/dom";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
var clearDisableScrollStyle = function(node) {
    Object.assign(node.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        overflowY: "",
        overflowX: ""
    });
};
var getPageYOffsetWithoutKeyboardHeight = function(window) {
    // Note: здесь расчёт на то, что `clientHeight` равен `window.innerHeight`.
    //  Это достигается тем, что тегу `html` задали`height: 100%` и у него нет отступов сверху и снизу. Если есть отступы,
    //  то надо задать `box-sizing: border-box`, чтобы они не учитывались.
    var diffOfClientHeightAndViewportHeight = window.document.documentElement.clientHeight - window.innerHeight;
    return window.pageYOffset - diffOfClientHeightAndViewportHeight;
};
export var ScrollContext = /*#__PURE__*/ React.createContext({
    getScroll: function() {
        return {
            x: 0,
            y: 0
        };
    },
    scrollTo: noop,
    isScrollLock: false,
    enableScrollLock: noop,
    disableScrollLock: noop
});
export var useScroll = function() {
    return React.useContext(ScrollContext);
};
export var GlobalScrollController = function(param) {
    var children = param.children;
    var _useDOM = useDOM(), window = _useDOM.window, document = _useDOM.document;
    var _React_useState = _sliced_to_array(React.useState(false), 2), isScrollLock = _React_useState[0], setScrollLock = _React_useState[1];
    var beforeScrollLockFnSetRef = React.useRef(new Set());
    var getScroll = React.useCallback(function() {
        return {
            x: window.pageXOffset,
            y: getPageYOffsetWithoutKeyboardHeight(window)
        };
    }, [
        window
    ]);
    var scrollTo = React.useCallback(function() {
        var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        // Some iOS versions do not normalize scroll — do it manually.
        window.scrollTo(x ? clamp(x, 0, document.body.scrollWidth - window.innerWidth) : 0, y ? clamp(y, 0, document.body.scrollHeight - window.innerHeight) : 0);
    }, [
        document,
        window
    ]);
    var enableScrollLock = React.useCallback(function() {
        beforeScrollLockFnSetRef.current.forEach(function(fn) {
            fn();
        });
        var scrollY = window.pageYOffset;
        var scrollX = window.pageXOffset;
        var overflowY = window.innerWidth > document.documentElement.clientWidth ? "scroll" : "";
        var overflowX = window.innerHeight > document.documentElement.clientHeight ? "scroll" : "";
        Object.assign(document.body.style, {
            position: "fixed",
            top: "-".concat(scrollY, "px"),
            left: "-".concat(scrollX, "px"),
            right: "0",
            overflowY: overflowY,
            overflowX: overflowX
        });
        setScrollLock(true);
    }, [
        document,
        window
    ]);
    var disableScrollLock = React.useCallback(function() {
        var scrollY = document.body.style.top;
        var scrollX = document.body.style.left;
        clearDisableScrollStyle(document.body);
        window.scrollTo(-parseInt(scrollX || "0"), -parseInt(scrollY || "0"));
        setScrollLock(false);
    }, [
        document,
        window
    ]);
    var scrollController = React.useMemo(function() {
        return {
            getScroll: getScroll,
            scrollTo: scrollTo,
            isScrollLock: isScrollLock,
            disableScrollLock: disableScrollLock,
            enableScrollLock: enableScrollLock,
            beforeScrollLockFnSetRef: beforeScrollLockFnSetRef
        };
    }, [
        getScroll,
        scrollTo,
        isScrollLock,
        disableScrollLock,
        enableScrollLock
    ]);
    return /*#__PURE__*/ React.createElement(ScrollContext.Provider, {
        value: scrollController
    }, children);
};
export var ElementScrollController = function(param) {
    var elRef = param.elRef, children = param.children;
    var _React_useState = _sliced_to_array(React.useState(false), 2), isScrollLock = _React_useState[0], setScrollLock = _React_useState[1];
    var beforeScrollLockFnSetRef = React.useRef(new Set());
    var getScroll = React.useCallback(function() {
        var _elRef_current, _elRef_current1;
        var _elRef_current_scrollLeft, _elRef_current_scrollTop;
        return {
            x: (_elRef_current_scrollLeft = (_elRef_current = elRef.current) === null || _elRef_current === void 0 ? void 0 : _elRef_current.scrollLeft) !== null && _elRef_current_scrollLeft !== void 0 ? _elRef_current_scrollLeft : 0,
            y: (_elRef_current_scrollTop = (_elRef_current1 = elRef.current) === null || _elRef_current1 === void 0 ? void 0 : _elRef_current1.scrollTop) !== null && _elRef_current_scrollTop !== void 0 ? _elRef_current_scrollTop : 0
        };
    }, [
        elRef
    ]);
    var scrollTo = React.useCallback(function() {
        var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        var el = elRef.current;
        // Some iOS versions do not normalize scroll — do it manually.
        el === null || el === void 0 ? void 0 : el.scrollTo(x ? clamp(x, 0, el.scrollWidth - el.clientWidth) : 0, y ? clamp(y, 0, el.scrollHeight - el.clientHeight) : 0);
    }, [
        elRef
    ]);
    var enableScrollLock = React.useCallback(function() {
        var el = elRef.current;
        if (!el) {
            return;
        }
        beforeScrollLockFnSetRef.current.forEach(function(fn) {
            fn();
        });
        var scrollY = el.scrollTop;
        var scrollX = el.scrollLeft;
        var overflowY = el.scrollWidth > el.clientWidth ? "scroll" : "";
        var overflowX = el.scrollHeight > el.clientHeight ? "scroll" : "";
        Object.assign(el.style, {
            position: "absolute",
            top: "-".concat(scrollY, "px"),
            left: "-".concat(scrollX, "px"),
            right: "0",
            overflowY: overflowY,
            overflowX: overflowX
        });
        setScrollLock(true);
    }, [
        elRef
    ]);
    var disableScrollLock = React.useCallback(function() {
        var el = elRef.current;
        if (!el) {
            return;
        }
        var scrollY = el.style.top;
        var scrollX = el.style.left;
        clearDisableScrollStyle(el);
        el.scrollTo(-parseInt(scrollX || "0"), -parseInt(scrollY || "0"));
        setScrollLock(false);
    }, [
        elRef
    ]);
    var scrollController = React.useMemo(function() {
        return {
            getScroll: getScroll,
            scrollTo: scrollTo,
            isScrollLock: isScrollLock,
            disableScrollLock: disableScrollLock,
            enableScrollLock: enableScrollLock,
            beforeScrollLockFnSetRef: beforeScrollLockFnSetRef
        };
    }, [
        getScroll,
        scrollTo,
        isScrollLock,
        disableScrollLock,
        enableScrollLock
    ]);
    return /*#__PURE__*/ React.createElement(ScrollContext.Provider, {
        value: scrollController
    }, children);
};
/**
 * Вызывает функцию effect, до блокировки прокрутки
 * @param effect функция, которая может возвращать функцию очистки
 * @param deps effect обновится только при изменении значений в списке.
 */ export var useScrollLockEffect = function(effect, deps) {
    var destructorRef = React.useRef(noop);
    var _useScroll = useScroll(), isScrollLock = _useScroll.isScrollLock, beforeScrollLockFnSetRef = _useScroll.beforeScrollLockFnSetRef;
    // Изменяем effectCallback только при изменении deps
    var effectCallback = React.useCallback(function() {
        destructorRef.current = effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    // Добавляем effectCallback в список функций, которые необходимо вызвать
    // до блокировки
    React.useEffect(function() {
        var beforeSet = beforeScrollLockFnSetRef === null || beforeScrollLockFnSetRef === void 0 ? void 0 : beforeScrollLockFnSetRef.current;
        if (!beforeSet) {
            return noop;
        }
        beforeSet.add(effectCallback);
        return function() {
            beforeSet.delete(effectCallback);
        };
    }, [
        beforeScrollLockFnSetRef,
        effectCallback
    ]);
    // Вызываем сбрасывающую функцию, после отключения блокировки
    React.useEffect(function() {
        if (!isScrollLock && destructorRef.current) {
            destructorRef.current();
        }
    }, [
        isScrollLock
    ]);
};
export var useScrollLock = function() {
    var enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    var _useScroll = useScroll(), enableScrollLock = _useScroll.enableScrollLock, disableScrollLock = _useScroll.disableScrollLock, isScrollLock = _useScroll.isScrollLock;
    useIsomorphicLayoutEffect(function() {
        if (enabled && !isScrollLock) {
            enableScrollLock();
            return disableScrollLock;
        }
        return noop;
    }, [
        enableScrollLock,
        disableScrollLock,
        enabled
    ]);
};

//# sourceMappingURL=ScrollContext.js.map