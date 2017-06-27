/*!
 * clickstream v2.1.0
 * http://blivesta.github.io/clickstream/
 * Licensed under MIT
 * Copyright 2013-2014 blivesta
 * 
 */
(function($) {
  var namespace = "clickstream";
  var methods = {
    init: function(options) {
      options = $.extend({
        inClass: "clickstream-in",
        outClass: "clickstream-out",
        linkClass: "clickstream-link"
      }, options);
      return this.each(function() {
        var _this = this, $this = $(this), data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
          var inAnimate = $this.data("animate-in"), outAnimate = $this.data("animate-out"), inDelay = $("." + options.inClass).css("animation-duration").replace(/s/g, "") * 1e3;
          $(window).load(function() {
            $this.addClass(inAnimate);
            setTimeout(function() {
              $this.removeClass(inAnimate + " " + options.inClass).addClass(options.outClass).css({
                opacity: 1
              });
            }, inDelay);
          });
          $("." + options.linkClass).on("click." + namespace, function(e) {
            e.preventDefault();
            var url = $(this).attr("href"), outDelay = $("." + options.outClass).css("animation-duration").replace(/s/g, "") * 1e3, stream = function() {
              location.href = url;
            };
            $this.addClass(outAnimate);
            setTimeout(function() {
              stream.call(_this);
            }, outDelay);
          });
        }
      });
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.removeData(namespace);
      });
    }
  };
  $.fn.clickstream = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);