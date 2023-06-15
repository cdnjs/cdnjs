import { canUseDOM } from './dom';
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
var coordY = function coordY(e) {
  if (e.clientY != null) {
    return e.clientY;
  }
  return e.changedTouches && e.changedTouches[0].clientY;
};

// eslint-disable-next-line no-restricted-globals
var touchEnabled = function touchEnabled() {
  return canUseDOM && 'ontouchstart' in window;
};

/*
 * Возвращает массив поддерживаемых событий
 * Если браузер поддерживает pointer events или подключена handjs, вернет события указателя.
 * Если нет, используем события мыши
 */
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
export { getSupportedEvents, coordX, coordY, touchEnabled, rubber };
//# sourceMappingURL=touch.js.map