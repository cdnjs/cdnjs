/*
Copyright 2014, modulex-event-dom@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:30:50 GMT
*/
modulex.add("event-dom/gesture/shake", ["event-dom/base","modulex-util"], function(require, exports, module) {
var eventDomBase = require("event-dom/base");
var modulexUtil = require("modulex-util");
/*
combined modules:
event-dom/gesture/shake
*/
var eventDomGestureShake;
eventDomGestureShake = function (exports) {
  exports = {};
  /**
   * @ignore
   * simulate shake gesture by listening devicemotion event
   * @author yiminghe@gmail.com
   */
  var DomEvent = eventDomBase;
  var util = modulexUtil;
  var Special = DomEvent.Special, start = 5, enough = 20, shaking = 0, SHAKE = 'shake', lastX, lastY, lastZ, max = Math.max, abs = Math.abs, win = window, devicemotion = 'devicemotion', checkShake = util.buffer(function () {
      if (shaking) {
        /**
         * fired when shake ended
         * @event SHAKE
         * @member Event.Gesture.Shake
         * @param {Event.DomEvent.Object} e
         * @param {Object} e.accelerationIncludingGravity last devicemotion event's accelerationIncludingGravity
         */
        DomEvent.fireHandler(win, SHAKE, {
          accelerationIncludingGravity: {
            x: lastX,
            y: lastY,
            z: lastZ
          }
        });
        clear();
      }
    }, 250);
  // only for window
  Special.shake = {
    setup: function () {
      if (this !== win) {
        return;
      }
      win.addEventListener(devicemotion, shake, false);
    },
    tearDown: function () {
      if (this !== win) {
        return;
      }
      checkShake.stop();
      clear();
      win.removeEventListener(devicemotion, shake, false);
    }
  };
  function clear() {
    lastX = undefined;
    shaking = 0;
  }
  function shake(e) {
    var accelerationIncludingGravity = e.accelerationIncludingGravity, x = accelerationIncludingGravity.x, y = accelerationIncludingGravity.y, z = accelerationIncludingGravity.z, diff;
    if (lastX !== undefined) {
      diff = max(abs(x - lastX), abs(y - lastY), abs(z - lastZ));
      if (diff > start) {
        checkShake();
      }
      if (diff > enough) {
        // console.log(diff);
        // console.log(x,lastX,y,lastY,z,lastZ);
        shaking = 1;
      }
    }
    lastX = x;
    lastY = y;
    lastZ = z;
  }
  exports = { SHAKE: SHAKE };
  return exports;
}();
module.exports = eventDomGestureShake;
});