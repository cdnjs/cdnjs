/*
Copyright 2014, modulex-event-dom@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:30:50 GMT
*/
modulex.add("event-dom/gesture/basic", ["event-dom/base","event-dom/gesture/util"], function(require, exports, module) {
var eventDomBase = require("event-dom/base");
var eventDomGestureUtil = require("event-dom/gesture/util");
/*
combined modules:
event-dom/gesture/basic
*/
var eventDomGestureBasic;
eventDomGestureBasic = function (exports) {
  exports = {};
  /**
   * @ignore
   * touch event logic module
   * @author yiminghe@gmail.com
   */
  var DomEvent = eventDomBase;
  var GestureUtil = eventDomGestureUtil;
  var addGestureEvent = GestureUtil.addEvent;
  var BasicGesture = exports = {
    START: 'ksGestureStart',
    MOVE: 'ksGestureMove',
    END: 'ksGestureEnd'
  };
  function addBasicGestureEvent(event, onHandler) {
    var handle = {
      // always fire
      isActive: 1
    };
    handle[onHandler] = function (e) {
      DomEvent.fire(e.target, event, e);
    };
    addGestureEvent(event, {
      // fired first if registered
      order: 1,
      handle: handle
    });
  }
  addBasicGestureEvent(BasicGesture.START, 'onTouchStart');
  addBasicGestureEvent(BasicGesture.MOVE, 'onTouchMove');
  addBasicGestureEvent(BasicGesture.END, 'onTouchEnd');
  return exports;
}();
module.exports = eventDomGestureBasic;
});