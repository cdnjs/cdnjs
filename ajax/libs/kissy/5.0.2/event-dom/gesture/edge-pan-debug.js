/*
Copyright 2014, modulex-event-dom@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:30:50 GMT
*/
modulex.add("event-dom/gesture/edge-pan", ["event-dom/gesture/util","event-dom/base","modulex-util"], function(require, exports, module) {
var eventDomGestureUtil = require("event-dom/gesture/util");
var eventDomBase = require("event-dom/base");
var modulexUtil = require("modulex-util");
/*
combined modules:
event-dom/gesture/edge-pan
*/
var eventDomGestureEdgePan;
eventDomGestureEdgePan = function (exports) {
  exports = {};
  /**
   * edge drag gesture
   * @author yiminghe@gmail.com
   */
  var GestureUtil = eventDomGestureUtil;
  var addGestureEvent = GestureUtil.addEvent;
  var DomEvent = eventDomBase;
  var SingleTouch = GestureUtil.SingleTouch;
  var EDGE_PAN_START = 'edgePanStart', EDGE_PAN = 'edgePan', EDGE_PAN_END = 'edgePanEnd', MIN_EDGE_DISTANCE = 60;
  var util = modulexUtil;
  function fire(self, e, move) {
    var touches = self.lastTouches, touch = touches[0], x = touch.pageX, y = touch.pageY, deltaX = x - self.startX, deltaY = y - self.startY, absDeltaX = Math.abs(deltaX), absDeltaY = Math.abs(deltaY), distance, event, direction = self.direction;
    if (!direction) {
      if (absDeltaX > absDeltaY) {
        direction = deltaX < 0 ? 'left' : 'right';
      } else {
        direction = deltaY < 0 ? 'up' : 'down';
      }
      self.direction = direction;
    }
    if (direction === 'up' || direction === 'down') {
      distance = absDeltaY;
    } else {
      distance = absDeltaX;
    }
    var velocityX, velocityY;
    var duration = e.timeStamp - self.startTime;
    if (!move) {
      event = EDGE_PAN_END;
      if (direction === 'left' || direction === 'right') {
        velocityX = distance / duration;
      } else {
        velocityY = distance / duration;
      }
    } else if (self.isStarted) {
      event = EDGE_PAN;
    } else {
      event = EDGE_PAN_START;
      var win = window;
      var invalidRegion = {
        left: win.pageXOffset + MIN_EDGE_DISTANCE,
        right: win.pageXOffset + win.innerWidth - MIN_EDGE_DISTANCE,
        top: win.pageYOffset + MIN_EDGE_DISTANCE,
        bottom: win.pageYOffset + win.innerHeight - MIN_EDGE_DISTANCE
      };
      if (direction === 'right' && x > invalidRegion.left) {
        return false;
      } else if (direction === 'left' && x < invalidRegion.right) {
        return false;
      } else if (direction === 'down' && y > invalidRegion.top) {
        return false;
      } else if (direction === 'up' && y < invalidRegion.bottom) {
        return false;
      }
      self.isStarted = 1;
      self.startTime = e.timeStamp;
    }
    /**
     * fired when edge drag started
     * @event EDGE_PAN_START
     * @member Event.Gesture.EdgeDrag
     * @param {Event.DomEvent.Object} e
     * @param {Number} e.pageX drag point pageX
     * @param {Number} e.pageY drag point pageY
     * @param {Number} e.distance distance between current touch and start touch
     * @param {Number} e.duration time duration between current touch and start touch
     * @param {Number} e.velocityX velocity at x-axis
     * @param {Number} e.velocityY velocity at y-axis
     * @param {String} e.direction drag start direction 'up' or 'down' or 'left' or 'right'
     */
    /**
     * fired when edge drag
     * @event EDGE_PAN
     * @member Event.Gesture.EdgeDrag
     * @param {Event.DomEvent.Object} e
     * @param {Number} e.pageX drag point pageX
     * @param {Number} e.pageY drag point pageY
     * @param {Number} e.distance distance between current touch and start touch
     * @param {Number} e.duration time duration between current touch and start touch
     * @param {Number} e.velocityX velocity at x-axis
     * @param {Number} e.velocityY velocity at y-axis
     * @param {String} e.direction drag start direction 'up' or 'down' or 'left' or 'right'
     */
    /**
     * fired when edge drag gesture is finished
     * @event EDGE_PAN_END
     * @member Event.Gesture.EdgeDrag
     * @param {Event.DomEvent.Object} e
     * @param {Number} e.pageX drag point pageX
     * @param {Number} e.pageY drag point pageY
     * @param {Number} e.distance distance between current touch and start touch
     * @param {Number} e.duration time duration between current touch and start touch
     * @param {Number} e.velocityX velocity at x-axis
     * @param {Number} e.velocityY velocity at y-axis
     * @param {String} e.direction drag start direction 'up' or 'down' or 'left' or 'right'
     */
    DomEvent.fire(touch.target, event, {
      originalEvent: e.originalEvent,
      pageX: touch.pageX,
      pageY: touch.pageY,
      which: 1,
      direction: direction,
      distance: distance,
      duration: duration / 1000,
      velocityX: velocityX,
      velocityY: velocityY
    });
    return undefined;
  }
  function EdgeDrag() {
  }
  util.extend(EdgeDrag, SingleTouch, {
    requiredGestureType: 'touch',
    start: function () {
      var self = this;
      EdgeDrag.superclass.start.apply(self, arguments);
      var touch = self.lastTouches[0];
      self.direction = null;
      self.startX = touch.pageX;
      self.startY = touch.pageY;
    },
    move: function (e) {
      EdgeDrag.superclass.move.apply(this, arguments);
      return fire(this, e, 1);
    },
    end: function (e) {
      EdgeDrag.superclass.end.apply(this, arguments);
      return fire(this, e, 0);
    }
  });
  addGestureEvent([
    EDGE_PAN,
    EDGE_PAN_END,
    EDGE_PAN_START
  ], { handle: new EdgeDrag() });
  exports = {
    EDGE_PAN: EDGE_PAN,
    EDGE_PAN_START: EDGE_PAN_START,
    EDGE_PAN_END: EDGE_PAN_END
  };
  return exports;
}();
module.exports = eventDomGestureEdgePan;
});