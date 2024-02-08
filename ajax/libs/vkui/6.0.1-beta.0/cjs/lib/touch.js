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
    coordX: function() {
        return coordX;
    },
    coordY: function() {
        return coordY;
    },
    getSupportedEvents: function() {
        return getSupportedEvents;
    },
    rubber: function() {
        return rubber;
    },
    touchEnabled: function() {
        return touchEnabled;
    }
});
const _dom = require("./dom");
/*
 * Получает координату по оси абсцисс из touch- или mouse-события
 */ const coordX = (e)=>{
    if (e.clientX != null) {
        return e.clientX;
    }
    return e.changedTouches && e.changedTouches[0].clientX;
};
/*
 * Получает координату по оси ординат из touch- или mouse-события
 */ const coordY = (e)=>{
    if (e.clientY != null) {
        return e.clientY;
    }
    return e.changedTouches && e.changedTouches[0].clientY;
};
// eslint-disable-next-line no-restricted-globals
const touchEnabled = ()=>_dom.canUseDOM && 'ontouchstart' in window;
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

//# sourceMappingURL=touch.js.map