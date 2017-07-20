/*
Copyright 2014, modulex-event-dom@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:30:50 GMT
*/
modulex.add("event-dom/input", ["event-dom/base","dom"], function(require, exports, module) {
var eventDomBase = require("event-dom/base");
var dom = require("dom");
/*
combined modules:
event-dom/input
*/
var eventDomInput;
eventDomInput = function (exports) {
  exports = {};
  /**
   * @ignore
   * html input event polyfill
   * @author yiminghe@gmail.com
   */
  var DomEvent = eventDomBase;
  var Dom = dom;
  var noop = function () {
  };
  var Special = DomEvent.Special;
  function canFireInput(n) {
    var nodeName = (n.nodeName || '').toLowerCase();
    if (nodeName === 'textarea') {
      return true;
    } else if (nodeName === 'input') {
      return n.type === 'text' || n.type === 'password';
    }
    return false;
  }
  var INPUT_CHANGE = 'input', KEY = 'event-dom/input', HISTORY_KEY = KEY + '/history', POLL_KEY = KEY + '/poll', interval = 50;
  function clearPollTimer(target) {
    if (Dom.hasData(target, POLL_KEY)) {
      var poll = Dom.data(target, POLL_KEY);
      clearTimeout(poll);
      Dom.removeData(target, POLL_KEY);
    }
  }
  function stopPoll(target) {
    Dom.removeData(target, HISTORY_KEY);
    clearPollTimer(target);
  }
  function stopPollHandler(ev) {
    clearPollTimer(ev.target);
  }
  function checkChange(target) {
    var v = target.value, h = Dom.data(target, HISTORY_KEY);
    if (v !== h) {
      // allow delegate
      DomEvent.fire(target, INPUT_CHANGE);
      Dom.data(target, HISTORY_KEY, v);
    }
  }
  function startPoll(target) {
    if (Dom.hasData(target, POLL_KEY)) {
      return;
    }
    Dom.data(target, POLL_KEY, setTimeout(function check() {
      checkChange(target);
      Dom.data(target, POLL_KEY, setTimeout(check, interval));
    }, interval));
  }
  function startPollHandler(ev) {
    var target = ev.target;
    // when focus, record its current value immediately
    if (ev.type === 'focus') {
      Dom.data(target, HISTORY_KEY, target.value);
    }
    startPoll(target);
  }
  function monitor(target) {
    unmonitored(target);
    DomEvent.on(target, 'blur', stopPollHandler);
    DomEvent.on(target, 'mousedown keyup keydown focus', startPollHandler);
  }
  function unmonitored(target) {
    stopPoll(target);
    DomEvent.detach(target, 'blur', stopPollHandler);
    DomEvent.detach(target, 'mousedown keyup keydown focus', startPollHandler);
  }
  Special.input = {
    setup: function () {
      var self = this;
      if (canFireInput(self)) {
        monitor(self);
      } else {
        // if bind on parentNode, lazy bind event to its form elements
        DomEvent.on(self, 'focusin', beforeActivate);
      }
    },
    tearDown: function () {
      var self = this;
      if (canFireInput(self)) {
        unmonitored(self);
      } else {
        DomEvent.remove(self, 'focusin', beforeActivate);
        Dom.query('textarea,input', self).each(function (fel) {
          if (fel.__inputHandler) {
            fel.__inputHandler = 0;
            DomEvent.remove(fel, 'input', noop);
          }
        });
      }
    }
  };
  function beforeActivate(e) {
    var t = e.target;
    if (canFireInput(t) && !t.__inputHandler) {
      t.__inputHandler = 1;
      // start input monitor
      DomEvent.on(t, 'input', noop);
    }
  }
  return exports;
}();
module.exports = eventDomInput;
});