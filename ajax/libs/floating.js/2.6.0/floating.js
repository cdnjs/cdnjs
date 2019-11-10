(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.floating = factory());
}(this, (function () { 'use strict';

/**
 * Float a number of things up on a page (hearts, flowers, 👌 ...)
 * <br>
 * You give the options in an object.
 *
 * @module floating
 * @param {string} [options.content='👌']
 *   the character or string to float
 * @param {number} [options.number=1]
 *   the number of items
 * @param {number} [options.duration=10]
 *   the amount of seconds it takes to float up
 * @param {number|string} [options.repeat='infinite']
 *   the number of times you want the animation to repeat
 * @param {string} [options.direction='normal']
 *   The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction">
 *   animation-direction</a> of the main animation
 * @param {number|array} [options.sizes=2]
 *   The size (in em) of each element. Giving two values in an array will
 *   give a random size between those values.
 */
function floating() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$content = _ref.content,
      content = _ref$content === undefined ? '👌' : _ref$content,
      _ref$number = _ref.number,
      number = _ref$number === undefined ? 1 : _ref$number,
      _ref$duration = _ref.duration,
      duration = _ref$duration === undefined ? 10 : _ref$duration,
      _ref$repeat = _ref.repeat,
      repeat = _ref$repeat === undefined ? 'infinite' : _ref$repeat,
      _ref$direction = _ref.direction,
      direction = _ref$direction === undefined ? 'normal' : _ref$direction,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? 2 : _ref$size;

  var style = document.createElement('style');
  style.id = 'floating-style';

  if (!document.getElementById('floating-style')) {
    document.head.appendChild(style);
  }

  document.getElementById('floating-style').innerHTML = '.float-container {width:100vw;height:100vh;overflow:hidden;position:absolute;top:0;left:0;pointer-events:none;}.float-container div * {width:1em;height:1em;}@keyframes float{0%{bottom:-100%;}100%{bottom:100%;}}@keyframes move{0%,100%{left:-3em;}50%{left:3em;}}';

  var container = document.createElement('div');

  container.className = 'float-container';

  var _loop = function _loop(i) {
    var floater = document.createElement('div');
    floater.innerHTML = content;
    var _size = size;

    if (size instanceof Array) {
      _size = Math.floor(Math.random() * (size[1] - size[0] + 1)) + size[0];
    }

    floater.style.cssText = 'position:absolute;font-size:' + _size + 'em;left:0;bottom:-100%;animation:float ' + duration + 's ease-in ' + i * Math.random() + 's ' + repeat + ' ' + direction + ',move 3s ease-in-out ' + i * Math.random() + 's infinite;transform:translateX(' + Math.random() * 100 + 'vw);';

    floater.addEventListener('animationend', function (e) {
      if (e.animationName === 'float') {
        container.removeChild(floater);
      }
    });

    container.appendChild(floater);
  };

  for (var i = 0; i < number; i++) {
    _loop(i);
  }

  document.body.appendChild(container);
}

return floating;

})));
