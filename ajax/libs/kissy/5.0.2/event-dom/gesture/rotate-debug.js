/*
Copyright 2014, modulex-event-dom@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:30:50 GMT
*/
modulex.add("event-dom/gesture/rotate", ["event-dom/gesture/util","event-dom/base","modulex-util","feature"], function(require, exports, module) {
var eventDomGestureUtil = require("event-dom/gesture/util");
var eventDomBase = require("event-dom/base");
var modulexUtil = require("modulex-util");
var feature = require("feature");
/*
combined modules:
event-dom/gesture/rotate
*/
var eventDomGestureRotate;
eventDomGestureRotate = function (exports) {
  exports = {};
  /**
   * @ignore
   * fired when rotate using two fingers
   * @author yiminghe@gmail.com
   */
  var GestureUtil = eventDomGestureUtil;
  var DoubleTouch = GestureUtil.DoubleTouch;
  var addGestureEvent = GestureUtil.addEvent;
  var DomEvent = eventDomBase;
  var ROTATE_START = 'rotateStart', ROTATE = 'rotate', RAD_2_DEG = 180 / Math.PI, ROTATE_END = 'rotateEnd';
  var util = modulexUtil;
  var Feature = feature;
  function Rotate() {
  }
  util.extend(Rotate, DoubleTouch, {
    requiredGestureType: 'touch',
    move: function (e) {
      var self = this;
      Rotate.superclass.move.apply(self, arguments);
      var touches = self.lastTouches, one = touches[0], two = touches[1], lastAngle = self.lastAngle, angle = Math.atan2(two.pageY - one.pageY, two.pageX - one.pageX) * RAD_2_DEG;
      if (lastAngle !== undefined) {
        // more smooth
        // 5 4 3 2 1 -1 -2 -3 -4
        // 170 180 190 200
        var diff = Math.abs(angle - lastAngle);
        var positiveAngle = (angle + 360) % 360;
        var negativeAngle = (angle - 360) % 360;
        // process '>' scenario: top -> bottom
        if (Math.abs(positiveAngle - lastAngle) < diff) {
          angle = positiveAngle;
        } else if (Math.abs(negativeAngle - lastAngle) < diff) {
          // process '>' scenario: bottom -> top
          angle = negativeAngle;
        }
      }
      self.lastAngle = angle;
      if (!self.isStarted) {
        self.isStarted = true;
        self.startAngle = angle;
        self.target = self.getCommonTarget(e);
        /**
         * fired when rotate started
         * @event ROTATE_START
         * @member Event.Gesture.Rotate
         * @param {Event.DomEvent.Object} e
         * @param {Number} e.rotation -360~360 rotate angle relative to pinch start
         * @param {Number} e.angle -360~360 current rotate absolute angle
         */
        /**
         * fired when rotate
         * @event ROTATE
         * @member Event.Gesture.Rotate
         * @param {Event.DomEvent.Object} e
         * @param {Number} e.rotation -360~360 rotate angle relative to pinch start
         * @param {Number} e.angle -360~360 current rotate absolute angle
         */
        /**
         * fired when rotate ended
         * @event ROTATE_END
         * @member Event.Gesture.Rotate
         * @param {Event.DomEvent.Object} e
         * @param {Number} e.rotation -360~360 rotate angle relative to pinch start
         * @param {Number} e.angle -360~360 current rotate absolute angle
         */
        DomEvent.fire(self.target, ROTATE_START, util.mix(e, {
          angle: angle,
          rotation: 0
        }));
      } else {
        DomEvent.fire(self.target, ROTATE, util.mix(e, {
          angle: angle,
          rotation: angle - self.startAngle
        }));
      }
    },
    end: function (e) {
      var self = this;
      Rotate.superclass.end.apply(self, arguments);
      self.lastAngle = undefined;
      DomEvent.fire(self.target, ROTATE_END, util.mix(e, { touches: self.lastTouches }));
    }
  });
  function prevent(e) {
    // android can not throttle
    // need preventDefault always
    if (e.targetTouches.length === 2) {
      e.preventDefault();
    }
  }
  var r = new Rotate();
  addGestureEvent([
    ROTATE_END,
    ROTATE_START
  ], { handle: r });
  var config = { handle: r };
  if (Feature.isTouchEventSupported()) {
    config.setup = function () {
      this.addEventListener('touchmove', prevent, false);
    };
    config.tearDown = function () {
      this.removeEventListener('touchmove', prevent, false);
    };
  }
  addGestureEvent(ROTATE, config);
  exports = {
    ROTATE_START: ROTATE_START,
    ROTATE: ROTATE,
    ROTATE_END: ROTATE_END
  };
  return exports;
}();
module.exports = eventDomGestureRotate;
});