/**
 * yox-touch.js v0.11.3
 * (c) 2017-2022 musicode
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.YoxTouch = {}));
}(this, (function (exports) { 'use strict';

  var Yox, Hammer;

  /**
   * 版本
   *
   * @type {string}
   */
  var version = "0.11.3";

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
    var lowerName = name.toLowerCase();
    Yox.dom.addSpecialEvent(
      name,
      {
        on: function on(node, listener) {
          if (gesture) {
            var manager = node.$manager;
            if (!manager) {
              manager = node.$manager = new Hammer.Manager(node);
              manager.add(gesture);
            }
            manager.on(lowerName, listener);
          }
          else {
            var hammer = node.$hammer || (node.$hammer = new Hammer(node));
            hammer.on(lowerName, listener);
          }
        },
        off: function off(node, listener) {
          if (gesture) {
            var manager = node.$manager;
            manager.off(lowerName, listener);
            if (isEmptyHandlers(manager.handlers)) {
              manager.destroy();
              node.$manager = NULL;
            }
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


  function setHammer(library) {
    Hammer = library;
  }

  function install(library) {

    Yox = library;

    Yox.object.each(
      events,
      function (_, name) {
        addGesture(name);
      }
    );

    // 默认扩展一个长按手势
    addGesture(
      'longPress',
      new Hammer.Press({
        event: 'longpress',
        time: 500
      })
    );

  }

  exports.addGesture = addGesture;
  exports.install = install;
  exports.setHammer = setHammer;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=yox-touch.js.map
