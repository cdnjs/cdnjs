/*! kefir addon - 0.2.4
 *  https://github.com/pozadi/kefir
 */
;(function(global){
  "use strict";

  function init(Kefir, $) {




    $.fn.asKefirStream = function(event, selector, transformer) {
      var $el = this;
      if (transformer == null && selector != null && 'string' !== typeof selector) {
        transformer = selector;
        selector = null;
      }
      transformer = transformer && Kefir.Fn(transformer);
      return Kefir.fromBinder(function(send) {
        function onEvent(e) {
          send('value', transformer ? transformer.apply(arguments) : e);
        }
        $el.on(event, selector, onEvent);
        return function() {  $el.off(event, selector, onEvent)  }
      });
    }




    // $.fn.asKefirProperty = function(event, selector, getter) { ... }




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
