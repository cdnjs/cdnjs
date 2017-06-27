/**
 * Float a number of things up on a page (hearts, flowers, 👌 ...)
 * @module floating
 * @author Haroen Viaene <hello@haroen.me>
 */
(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return (root.floating = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.floating = factory();
  }
})(this, function() {
  // UMD Definition above, do not remove this line

  // To get to know more about the Universal Module Definition
  // visit:https://github.com/umdjs/umd

  'use strict';

  /**
   * Float a number of things up on a page (hearts, flowers, 👌 ...)
   * @alias module:floating
   * @param {string} [options.content='👌']
   *   the character or string to float
   * @param {number} [options.number=1]
   *   the number of items
   * @param {number} [options.duration=10]
   *   the amount of seconds it takes to float up (default 10s)
   * @param {number|string} [options.repeat='infinite']
   *   the number of times you want the animation to repeat (default:'infinite')
   * @param {string} [options.direction='normal']
   *   The <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction">
   *   animation-direction</a> of the main animation
   * @param {number|array} [options.sizes=2]
   *   The size (in em) of each element. Giving two values in an array will
   *   give a random size between those values.
   */
  function floating(options) {
    options.content = options.content || '👌';
    options.number = options.number || 1;
    options.duration = options.duration || 10;
    options.repeat = options.repeat || 'infinite';
    options.direction = options.direction || 'normal';
    options.size = options.size || 2;

    var style = document.createElement('style');
    style.id = 'floating-style';
    if (!document.getElementById('floating-style')) {
      document.head.appendChild(style);
    };
    document.getElementById('floating-style').innerHTML = ".float-container {width:100vw;height:100vh;overflow:hidden;position:absolute;top:0;left:0;pointer-events:none;}.float-container div * {width:1em;height:1em;}@keyframes float{0%{bottom:-100%;}100%{bottom:100%;}}@keyframes move{0%,100%{left:-3em;}50%{left:3em;}}";
    var container = document.createElement('div');
    container.className = 'float-container';
    for (var i = 0; i < options.number; i++) {
      var floater = document.createElement('div');
      floater.innerHTML = options.content;
      var size = options.size;
      if (options.size instanceof Array) {
        size = Math.floor(Math.random() * (options.size[1] - options.size[0] + 1)) + options.size[0];
      }
      floater.style.cssText = "position:absolute;font-size:" + size + "em;left:0;bottom:-100%;animation:float " + options.duration + "s ease-in " + i * Math.random() + "s " + options.repeat + " " + options.direction + ",move 3s ease-in-out " + i * Math.random() + "s infinite;transform:translateX(" + Math.random() * 100 + "vw);";
      floater.addEventListener('animationend', function(e) {
        if (e.animationName === 'float') {
          container.removeChild(floater);
        }
      });
      container.appendChild(floater);
    }
    document.body.appendChild(container);
  }

  return floating;

});
