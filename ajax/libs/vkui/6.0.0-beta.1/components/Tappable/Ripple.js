import * as React from 'react';
import { classNames, hasMouse as hasPointerLib, noop } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { useTimeout } from '../../hooks/useTimeout';
import { getOffsetRect } from '../../lib/offset';
/**
 * Возможно нужен Ripple эффект. Данный хук нужен для отказа
 * от двойного ререндера.
 */ export const useMaybeNeedRipple = (activeMode, hasPointer)=>{
    const platform = usePlatform();
    return platform === 'android' && !hasPointer && activeMode === 'background';
};
const DELAY = 70;
const WAVE_LIVE = 225;
/**
 * Хук для создания Ripple эффектов
 */ export const useRipple = (needRipple, hasPointerContext)=>{
    const [clicks, setClicks] = React.useState([]);
    /**
   * Коллекция нажатий и таймеров задержки появления волны
   */ const pointerDelayTimers = React.useMemo(()=>new Map(), []);
    const clearClicks = useTimeout(()=>setClicks([]), WAVE_LIVE);
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
        const { top, left } = getOffsetRect(e.currentTarget);
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
    const reallyNeedRipple = (!hasPointerLib || hasPointerContext === false) && needRipple;
    return {
        clicks,
        onPointerDown: reallyNeedRipple ? onPointerDown : noop,
        onPointerCancel: reallyNeedRipple ? onPointerCancel : noop
    };
};
export const Ripple = ({ needRipple = true, clicks })=>{
    return /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: classNames("vkuiTappable__stateLayer", needRipple && "vkuiTappable__ripple")
    }, clicks.map((wave)=>/*#__PURE__*/ React.createElement("span", {
            key: wave.id,
            className: "vkuiTappable__wave",
            style: {
                top: wave.y,
                left: wave.x
            }
        })));
};

//# sourceMappingURL=Ripple.js.map