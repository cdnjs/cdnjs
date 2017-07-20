/*
Copyright 2014, modulex-event-dom@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:30:50 GMT
*/
modulex.add("event-dom/gesture/tap", ["event-dom/gesture/util","event-dom/base","ua","modulex-util"], function(require, exports, module) {
var eventDomGestureUtil = require("event-dom/gesture/util");
var eventDomBase = require("event-dom/base");
var ua = require("ua");
var modulexUtil = require("modulex-util");
/*
combined modules:
event-dom/gesture/tap
*/
var eventDomGestureTap;
eventDomGestureTap = function (exports) {
  exports = {};
  /**
   * @ignore
   * gesture tap
   * @author yiminghe@gmail.com
   */
  var GestureUtil = eventDomGestureUtil;
  var addGestureEvent = GestureUtil.addEvent;
  var DomEvent = eventDomBase;
  var SingleTouch = GestureUtil.SingleTouch;
  var UA = ua;
  var util = modulexUtil;
  /**
   * fired when tap.
   * @event TAP
   * @member Event.Gesture.Tap
   * @param {Event.DomEvent.Object} e
   * @param {Number} e.pageX tap pageX
   * @param {Number} e.pageY tap pageY
   */
  /**
   * fired when singleTap.
   * @event SINGLE_TAP
   * @member Event.Gesture.Tap
   * @param {Event.DomEvent.Object} e
   * @param {Number} e.pageX tap pageX
   * @param {Number} e.pageY tap pageY
   * @param {Number} e.duration time duration(s) between current time and last touch start
   */
  /**
   * fired when doubleTap.
   * @event DOUBLE_TAP
   * @member Event.Gesture.Tap
   * @param {Event.DomEvent.Object} e
   * @param {Number} e.pageX tap pageX
   * @param {Number} e.pageY tap pageY
   * @param {Number} e.duration time duration(s) between current time and last touch up
   */
  /**
   * fired when tapHold.
   * @event HOLD
   * @member Event.Gesture.Tap
   * @param {Event.DomEvent.Object} e
   * @param {Number} e.pageX tap pageX
   * @param {Number} e.pageY tap pageY
   * @param {Number} e.duration time duration(s) between current time and current touch start
   */
  var SINGLE_TAP = 'singleTap', DOUBLE_TAP = 'doubleTap', HOLD = 'hold', TAP = 'tap', TAP_HOLD_DELAY = 1000,
    // same with native click delay
    SINGLE_TAP_DELAY = 300, TOUCH_MOVE_SENSITIVITY = 5, DomEventObject = DomEvent.Object;
  function preventDefault(e) {
    e.preventDefault();
  }
  function clearTimers(self) {
    if (self.singleTapTimer) {
      clearTimeout(self.singleTapTimer);
      self.singleTapTimer = 0;
    }
    if (self.tapHoldTimer) {
      clearTimeout(self.tapHoldTimer);
      self.tapHoldTimer = 0;
    }
  }
  function Tap() {
    Tap.superclass.constructor.apply(this, arguments);
  }
  util.extend(Tap, SingleTouch, {
    start: function (e) {
      var self = this;
      Tap.superclass.start.call(self, e);
      clearTimers(self);
      var currentTouch = self.lastTouches[0];
      self.tapHoldTimer = setTimeout(function () {
        var eventObj = util.mix({
          which: 1,
          duration: (util.now() - e.timeStamp) / 1000
        }, self.lastXY);
        self.tapHoldTimer = 0;
        self.lastXY = 0;
        DomEvent.fire(currentTouch.target, HOLD, eventObj);
      }, TAP_HOLD_DELAY);
      self.isStarted = true;
      return undefined;
    },
    move: function () {
      var self = this, lastXY;
      if (!(lastXY = self.lastXY)) {
        return false;
      }
      var currentTouch = self.lastTouches[0];
      // some TOUCH_MOVE_SENSITIVITY
      // android browser will trigger touchmove event finger is not moved ...
      // ie10 will has no touch when mouse
      if (!currentTouch || Math.abs(currentTouch.pageX - lastXY.pageX) > TOUCH_MOVE_SENSITIVITY || Math.abs(currentTouch.pageY - lastXY.pageY) > TOUCH_MOVE_SENSITIVITY) {
        clearTimers(self);
        return false;
      }
      return undefined;
    },
    end: function (e, moreTouches) {
      var self = this, lastXY;
      clearTimers(self);
      if (moreTouches) {
        return;
      }
      // tapHold fired
      if (!(lastXY = self.lastXY)) {
        return;
      }
      var touch = self.lastTouches[0];
      var target = touch.target;
      // fire tap
      var eventObject = new DomEventObject(e.originalEvent);
      util.mix(eventObject, {
        type: TAP,
        which: 1,
        pageX: lastXY.pageX,
        pageY: lastXY.pageY,
        target: target,
        currentTarget: target
      });
      DomEvent.fire(target, TAP, eventObject);
      // call e.preventDefault on tap event to prevent tap penetration in real touch device
      if (eventObject.isDefaultPrevented() && UA.mobile) {
        if (UA.ios) {
          e.preventDefault();
        } else {
          // note:
          // do not use
          // <a href = 'javascript:void(0)'>
          // do use
          // <a href = 'xx'>
          DomEvent.on(target.ownerDocument || target, 'click', {
            fn: preventDefault,
            once: 1
          });
        }
      }
      // fire singleTap or doubleTap
      var lastEndTime = self.lastEndTime, time = e.timeStamp, duration;
      self.lastEndTime = time;
      // second touch end
      if (lastEndTime) {
        // time between current up and last up
        duration = time - lastEndTime;
        // a double tap
        if (duration < SINGLE_TAP_DELAY) {
          // a new double tap cycle
          self.lastEndTime = 0;
          DomEvent.fire(target, DOUBLE_TAP, {
            pageX: lastXY.pageX,
            pageY: lastXY.pageY,
            which: 1,
            duration: duration / 1000
          });
          return;
        }
      }
      // time between down and up is long enough
      // then a singleTap
      duration = time - self.startTime;
      if (duration > SINGLE_TAP_DELAY) {
        DomEvent.fire(target, SINGLE_TAP, {
          pageX: lastXY.pageX,
          pageY: lastXY.pageY,
          which: 1,
          duration: duration / 1000
        });
      } else {
        // buffer singleTap
        // wait for a second tap
        self.singleTapTimer = setTimeout(function () {
          DomEvent.fire(target, SINGLE_TAP, {
            pageX: lastXY.pageX,
            pageY: lastXY.pageY,
            which: 1,
            duration: (util.now() - self.startTime) / 1000
          });
        }, SINGLE_TAP_DELAY);
      }
    }
  });
  addGestureEvent([
    TAP,
    DOUBLE_TAP,
    SINGLE_TAP,
    HOLD
  ], { handle: new Tap() });
  exports = {
    TAP: TAP,
    SINGLE_TAP: SINGLE_TAP,
    DOUBLE_TAP: DOUBLE_TAP,
    HOLD: HOLD
  };
  return exports;
}();
module.exports = eventDomGestureTap;
});