import { canUseDOM } from '../dom';
/*
 * Получает координату по оси абсцисс из touch- или mouse-события
 */ const coordX = (event)=>{
    if ('clientX' in event) {
        return event.clientX;
    }
    return event.changedTouches && event.changedTouches[0].clientX;
};
/*
 * Получает координату по оси ординат из touch- или mouse-события
 */ const coordY = (event)=>{
    if ('clientY' in event) {
        return event.clientY;
    }
    return event.changedTouches && event.changedTouches[0].clientY;
};
// eslint-disable-next-line no-restricted-globals
const touchEnabled = ()=>canUseDOM && 'ontouchstart' in window;
/*
 * Возвращает массив поддерживаемых событий
 * Если браузер поддерживает pointer events или подключена handjs, вернет события указателя.
 * Если нет, используем события мыши
 */ function getSupportedEvents() {
    if (touchEnabled()) {
        return [
            'touchstart',
            'touchmove',
            'touchend',
            'touchcancel'
        ];
    }
    return [
        'mousedown',
        'mousemove',
        'mouseup',
        'mouseleave'
    ];
}
/*
 * Рассчитывает "сопротивление" для iOS тач-событий
 */ function rubber(offset, dimension, resistanceRate, isAndroid) {
    if (isAndroid || offset < 0) {
        return offset;
    }
    const offsettedResistance = offset * resistanceRate;
    return offsettedResistance * dimension / (offsettedResistance + dimension);
}
export { getSupportedEvents, coordX, coordY, touchEnabled, rubber };

//# sourceMappingURL=functions.js.map