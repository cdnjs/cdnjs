/*
Copyright 2014, modulex-event-dom@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:30:50 GMT
*/
modulex.add("event-dom/gesture/pinch", ["event-dom/gesture/util","event-dom/base","feature","modulex-util"], function(require, exports, module) {
var eventDomGestureUtil = require("event-dom/gesture/util");
var eventDomBase = require("event-dom/base");
var feature = require("feature");
var modulexUtil = require("modulex-util");
/*
combined modules:
event-dom/gesture/pinch
*/
var eventDomGesturePinch;
eventDomGesturePinch = function (exports) {
  exports = {};
  /**
   * @ignore
   * gesture pinch
   * @author yiminghe@gmail.com
   */
  var GestureUtil = eventDomGestureUtil;
  var DoubleTouch = GestureUtil.DoubleTouch;
  var addGestureEvent = GestureUtil.addEvent;
  var DomEvent = eventDomBase;
  var Feature = feature;
  var PINCH = 'pinch', PINCH_START = 'pinchStart', PINCH_END = 'pinchEnd';
  var util = modulexUtil;
  function getDistance(p1, p2) {
    var deltaX = p1.pageX - p2.pageX, deltaY = p1.pageY - p2.pageY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
  function Pinch() {
  }
  util.extend(Pinch, DoubleTouch, {
    requiredGestureType: 'touch',
    move: function (e) {
      var self = this;
      Pinch.superclass.move.apply(self, arguments);
      var touches = self.lastTouches;
      // error report in android 2.3
      if (!(touches[0].pageX > 0 && touches[0].pageY > 0 && touches[1].pageX > 0 && touches[1].pageY > 0)) {
        return;
      }
      var distance = getDistance(touches[0], touches[1]);
      /**
       * fired when pinch started
       * @event PINCH_START
       * @member Event.Gesture.Pinch
       * @param {Event.DomEvent.Object} e
       * @param {Number} e.distance distance between two touch points
       * @param {Number} scale current scale relative to pinch start
       */
      /**
       * fired when pinch
       * @event PINCH
       * @member Event.Gesture.Pinch
       * @param {Event.DomEvent.Object} e
       * @param {Number} e.distance distance between two touch points
       * @param {Number} scale current scale relative to pinch start
       */
      /**
       * fired when pinch ended
       * @event PINCH_END
       * @member Event.Gesture.Pinch
       * @param {Event.DomEvent.Object} e
       * @param {Number} e.distance distance between two touch points
       * @param {Number} scale current scale relative to pinch start
       */
      if (!self.isStarted) {
        self.isStarted = true;
        self.startDistance = distance;
        var target = self.target = self.getCommonTarget(e);
        DomEvent.fire(target, PINCH_START, util.mix(e, {
          distance: distance,
          scale: 1
        }));
      } else {
        DomEvent.fire(self.target, PINCH, util.mix(e, {
          distance: distance,
          scale: distance / self.startDistance
        }));
      }
    },
    end: function (e) {
      var self = this;
      Pinch.superclass.end.apply(self, arguments);
      DomEvent.fire(self.target, PINCH_END, util.mix(e, { touches: self.lastTouches }));
    }
  });
  var p = new Pinch();
  addGestureEvent([
    PINCH_START,
    PINCH_END
  ], { handle: p });
  function prevent(e) {
    if (e.targetTouches.length === 2) {
      e.preventDefault();
    }
  }
  var config = { handle: p };
  if (Feature.isTouchEventSupported()) {
    config.setup = function () {
      this.addEventListener('touchmove', prevent, false);
    };
    config.tearDown = function () {
      this.removeEventListener('touchmove', prevent, false);
    };
  }
  addGestureEvent(PINCH, config);
  exports = {
    PINCH: PINCH,
    PINCH_START: PINCH_START,
    PINCH_END: PINCH_END
  };
  return exports;
}();
module.exports = eventDomGesturePinch;
});