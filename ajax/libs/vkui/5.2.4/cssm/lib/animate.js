import { canUseDOM } from './dom';

/**
 * Функция для js анимации
 * @param {number} duration
 * @param {function} timing тайминг функция анимации
 * @param {function} draw коллбэк, в который прокидывается прогресс [0, 1]
 * @returns {void}
 */

export function animate(_ref) {
  var duration = _ref.duration,
    timing = _ref.timing,
    draw = _ref.draw;
  if (!canUseDOM) {
    return;
  }
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    var progress = timing(timeFraction);
    draw(progress);
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}
//# sourceMappingURL=animate.js.map