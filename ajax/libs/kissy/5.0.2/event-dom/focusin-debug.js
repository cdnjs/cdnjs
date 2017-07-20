/*
Copyright 2014, modulex-event-dom@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 04:30:50 GMT
*/
modulex.add("event-dom/focusin", ["event-dom/base","modulex-util"], function(require, exports, module) {
var eventDomBase = require("event-dom/base");
var modulexUtil = require("modulex-util");
/*
combined modules:
event-dom/focusin
*/
var eventDomFocusin;
eventDomFocusin = function (exports) {
  exports = {};
  /**
   * @ignore
   * event-focusin
   * @author yiminghe@gmail.com
   */
  var DomEvent = eventDomBase;
  var Special = DomEvent.Special;
  var util = modulexUtil;
  // 让非 IE 浏览器支持 focusin/focusout
  util.each([
    {
      name: 'focusin',
      fix: 'focus'
    },
    {
      name: 'focusout',
      fix: 'blur'
    }
  ], function (o) {
    var key = util.guid('attaches_' + util.now() + '_');
    Special[o.name] = {
      // 统一在 document 上 capture focus/blur 事件，然后模拟冒泡 fire 出来
      // 达到和 focusin 一样的效果 focusin -> focus
      // refer: http://yiminghe.iteye.com/blog/813255
      setup: function () {
        // this maybe document
        var doc = this.ownerDocument || this;
        if (!(key in doc)) {
          doc[key] = 0;
        }
        doc[key] += 1;
        if (doc[key] === 1) {
          doc.addEventListener(o.fix, handler, true);
        }
      },
      tearDown: function () {
        var doc = this.ownerDocument || this;
        doc[key] -= 1;
        if (doc[key] === 0) {
          doc.removeEventListener(o.fix, handler, true);
        }
      }
    };
    function handler(event) {
      var target = event.target;
      return DomEvent.fire(target, o.name);
    }
  });
  return exports;
}();
module.exports = eventDomFocusin;
});