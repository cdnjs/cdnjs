"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coordY = exports.coordX = void 0;
exports.getSupportedEvents = getSupportedEvents;
exports.rubber = rubber;
exports.touchEnabled = void 0;
var _dom = require("./dom");
/*
 * Получает координату по оси абсцисс из touch- или mouse-события
 */
var coordX = function coordX(e) {
  if (e.clientX != null) {
    return e.clientX;
  }
  return e.changedTouches && e.changedTouches[0].clientX;
};

/*
 * Получает координату по оси ординат из touch- или mouse-события
 */
exports.coordX = coordX;
var coordY = function coordY(e) {
  if (e.clientY != null) {
    return e.clientY;
  }
  return e.changedTouches && e.changedTouches[0].clientY;
};

// eslint-disable-next-line no-restricted-globals
exports.coordY = coordY;
var touchEnabled = function touchEnabled() {
  return _dom.canUseDOM && 'ontouchstart' in window;
};

/*
 * Возвращает массив поддерживаемых событий
 * Если браузер поддерживает pointer events или подключена handjs, вернет события указателя.
 * Если нет, используем события мыши
 */
exports.touchEnabled = touchEnabled;
function getSupportedEvents() {
  if (touchEnabled()) {
    return ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
  }
  return ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
}

/*
 * Рассчитывает "сопротивление" для iOS тач-событий
 */
function rubber(offset, dimension, resistanceRate, isAndroid) {
  if (isAndroid || offset < 0) {
    return offset;
  }
  var offsettedResistance = offset * resistanceRate;
  return offsettedResistance * dimension / (offsettedResistance + dimension);
}
//# sourceMappingURL=touch.js.map