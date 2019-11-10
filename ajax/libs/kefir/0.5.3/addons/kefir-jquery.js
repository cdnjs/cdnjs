/*! An addon for Kefir.js v0.5.3
 *  https://github.com/pozadi/kefir
 */
;(function(global){
  "use strict";

  function init(Kefir, $) {



    $.fn.asKefirStream = function(eventName, selector, transformer) {
      var $el = this;
      if (transformer == null && selector != null && 'string' !== typeof selector) {
        transformer = selector;
        selector = null;
      }
      return Kefir.fromSubUnsub(
        function(handler) {  $el.on(eventName, selector, handler)  },
        function(handler) {  $el.off(eventName, selector, handler)  },
        transformer
      ).setName('asKefirStream');
    }



    $.fn.asKefirProperty = function(eventName, selector, getter) {
      if (getter == null) {
        getter = selector;
        selector = null;
      }
      return this.asKefirStream(eventName, selector, getter)
        .toProperty(getter())
        .setName('asKefirProperty');
    }



  }

  if (typeof define === 'function' && define.amd) {
    define(['kefir', 'jquery'], init);
  } else if (typeof module === "object" && typeof exports === "object") {
    var kefir = require('kefir');
    var jQuery = require('jquery');
    init(kefir, jQuery);
  } else {
    init(global.Kefir, global.jQuery);
  }

}(this));
