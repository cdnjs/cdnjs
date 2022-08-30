/**
 * yox-touch.js v0.10.2
 * (c) 2017-2019 musicode
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.YoxTouch = {}));
}(this, function (exports) { 'use strict';

  var Hammer = typeof require === 'function'
      ? require('hammerjs')
      : window.Hammer;

  if (!Hammer) {
    throw new Error('[yox-touch] cannot locate Hammer.js.')
  }

  /**
   * 版本
   *
   * @type {string}
   */
  var version = "0.10.2";

  /**
   * 支持的事件，即 on-double-tap 支持的写法
   *
   * @type {string}
   */
  var events = [
    'tap',
    'doubleTap',

    'press',
    'pressUp',

    'pinchStart',
    'pinchMove',
    'pinchEnd',
    'pinchCancel',
    'pinchIn',
    'pinchOut',

    'rotateStart',
    'rotateMove',
    'rotateEnd',
    'rotateCancel',

    'swipeLeft',
    'swipeRight',

    'panStart',
    'panMove',
    'panEnd',
    'panCancel',
    'panLeft',
    'panRight' ];

  function install(Yox) {

    Yox.array.each(
      events,
      function (name) {
        Yox.dom.addSpecialEvent(name, {
          on: function on(node, listener) {
            var hammer = node.$hammer || (node.$hammer = new Hammer(node));
            hammer.on(Yox.string.lower(name), listener);
          },
          off: function off(node, listener) {
            var hammer = node.$hammer;
            hammer.off(Yox.string.lower(name), listener);
            if (Yox.object.falsy(hammer.handlers)) {
              hammer.destroy();
              node.$hammer = null;
            }
          }
        });
      }
    );

  }

  exports.events = events;
  exports.install = install;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=yox-touch.js.map
