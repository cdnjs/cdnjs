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
    Ripple: function() {
        return Ripple;
    },
    useMaybeNeedRipple: function() {
        return useMaybeNeedRipple;
    },
    useRipple: function() {
        return useRipple;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _useTimeout = require("../../hooks/useTimeout");
const _offset = require("../../lib/offset");
const useMaybeNeedRipple = (activeMode, hasPointer)=>{
    const platform = (0, _usePlatform.usePlatform)();
    return platform === 'android' && !hasPointer && activeMode === 'background';
};
const DELAY = 70;
const WAVE_LIVE = 225;
const useRipple = (needRipple, hasPointerContext)=>{
    const [clicks, setClicks] = _react.useState([]);
    /**
   * Коллекция нажатий и таймеров задержки появления волны
   */ const pointerDelayTimers = _react.useMemo(()=>new Map(), []);
    const clearClicks = (0, _useTimeout.useTimeout)(()=>setClicks([]), WAVE_LIVE);
    function addClick(x, y, pointerId) {
        const dateNow = Date.now();
        const filteredClicks = clicks.filter((click)=>click.id + WAVE_LIVE > dateNow);
        setClicks([
            ...filteredClicks,
            {
                x,
                y,
                id: dateNow,
                pointerId
            }
        ]);
        clearClicks.set();
        pointerDelayTimers.delete(pointerId);
    }
    /**
   * Добавляем волну с задержкой. Задержка необходима при отмене волны.
   */ const onPointerDown = (e)=>{
        const { top, left } = (0, _offset.getOffsetRect)(e.currentTarget);
        const x = e.clientX - (left !== null && left !== void 0 ? left : 0);
        const y = e.clientY - (top !== null && top !== void 0 ? top : 0);
        pointerDelayTimers.set(e.pointerId, setTimeout(()=>addClick(x, y, e.pointerId), DELAY));
    };
    const onPointerCancel = (e)=>{
        const timer = pointerDelayTimers.get(e.pointerId);
        clearTimeout(timer);
        pointerDelayTimers.delete(e.pointerId);
    };
    // WARNING: не использовать для рендеринга
    const reallyNeedRipple = (!_vkjs.hasMouse || hasPointerContext === false) && needRipple;
    return {
        clicks,
        onPointerDown: reallyNeedRipple ? onPointerDown : _vkjs.noop,
        onPointerCancel: reallyNeedRipple ? onPointerCancel : _vkjs.noop
    };
};
const Ripple = ({ needRipple = true, clicks })=>{
    return /*#__PURE__*/ _react.createElement("span", {
        "aria-hidden": true,
        className: (0, _vkjs.classNames)("vkuiTappable__stateLayer", needRipple && "vkuiTappable__ripple")
    }, clicks.map((wave)=>/*#__PURE__*/ _react.createElement("span", {
            key: wave.id,
            className: "vkuiTappable__wave",
            style: {
                top: wave.y,
                left: wave.x
            }
        })));
};

//# sourceMappingURL=Ripple.js.map