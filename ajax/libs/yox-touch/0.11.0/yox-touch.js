/**
 * yox-touch.js v0.11.0
 * (c) 2017-2022 musicode
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.YoxTouch = {}));
}(this, (function (exports) { 'use strict';

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
  var version = "0.11.0";

  var NULL = null;

  function isEmptyHandlers(handlers) {
    var isEmpty = true;
    if (handlers) {
      for (var key in handlers) {
        if (!Yox.array.falsy(handlers[key])) {
          isEmpty = false;
          break
        }
      }
    }
    return isEmpty
  }

  /**
   * 支持的事件，即 on-double-tap 支持的写法
   *
   * @type {object}
   */
  var events = {
    tap: NULL,
    doubleTap: NULL,

    press: NULL,
    pressUp: NULL,

    pinchStart: NULL,
    pinchMove: NULL,
    pinchEnd: NULL,
    pinchCancel: NULL,
    pinchIn: NULL,
    pinchOut: NULL,

    rotateStart: NULL,
    rotateMove: NULL,
    rotateEnd: NULL,
    rotateCancel: NULL,

    swipeLeft: NULL,
    swipeRight: NULL,

    panStart: NULL,
    panMove: NULL,
    panEnd: NULL,
    panCancel: NULL,
    panLeft: NULL,
    panRight: NULL,
  };

  function addGesture(name, gesture) {
    var lowerName = Yox.string.lower(name);
    events[name] = {
      on: function on(node, listener) {
        var manager = node.$manager;

        if (!manager) {
          manager = node.$manager = new Hammer.Manager(node);
          manager.add(gesture);
        }

        manager.on(lowerName, listener);
      },
      off: function off(node, listener) {
        var manager = node.$manager;
        manager.off(lowerName, listener);
        if (isEmptyHandlers(manager.handlers)) {
          manager.destroy();
          node.$manager = NULL;
        }
      }
    };
  }

  // 默认扩展一个长按手势
  addGesture(
    'longPress',
    new Hammer.Press({
      event: 'longpress',
      time: 1000
    })
  );

  function install(Yox) {

    Yox.object.each(
      events,
      function (customEvent, name) {
        var lowerName = Yox.string.lower(name);
        Yox.dom.addSpecialEvent(
          name,
          {
            on: function on(node, listener) {
              if (customEvent && customEvent.on) {
                customEvent.on(node, listener);
              }
              else {
                var hammer = node.$hammer || (node.$hammer = new Hammer(node));
                hammer.on(lowerName, listener);
              }
            },
            off: function off(node, listener) {
              if (customEvent && customEvent.off) {
                customEvent.off(node, listener);
              }
              else {
                var hammer = node.$hammer;
                hammer.off(lowerName, listener);
                if (isEmptyHandlers(hammer.handlers)) {
                  hammer.destroy();
                  node.$hammer = NULL;
                }
              }
            }
          }
        );
      }
    );

  }

  exports.addGesture = addGesture;
  exports.install = install;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=yox-touch.js.map
