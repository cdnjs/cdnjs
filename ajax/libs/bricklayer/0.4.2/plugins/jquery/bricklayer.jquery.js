(function ($) {
  $.extend($.fn, {
    bricklayer: function(options) {
      $(this).each(function() {
        var container = $(this)
        var instance = new Bricklayer(this, options);
        var events = ['beforeAppend', 'afterAppend', 'beforePrepend', 'afterPrepend', 'breakpoint']
        container.data('bricklayer', instance);
        for (var i in events) {
          instance.on(events[i], (function (eventName) {
            return function (e) {
              container.trigger('bricklayer.' + eventName, e.detail)
            }
          })(events[i]))
        }
      });
    },
    brickElement: function(element, fn) {
      $(this).each(function() {
        var el = $(element).clone(true, true).get();
        $(this).data('bricklayer')[fn === "append" ? fn : "prepend"](el)
      });
    },
    appendElements: function(elements) {
      var container = $(this)
      $(elements).each(function() {
        container.brickElement(this, 'append');
      });
    },
    prependElements: function(elements) {
      var container = $(this)
      $(elements).each(function() {
        container.brickElement(this, 'prepend');
      });
    }

  })
})(jQuery);
