/*!
 * clickstream v1.3.0
 * http://blivesta.github.io/clickstream/
 * Licensed under MIT
 * Copyright 2013-2014 blivesta
 * http://blivesta.com/
 */
(function($) {
  var namespace = "clickstream";
  var methods = {
    init: function(options) {
      options = $.extend({
        inactiveClass: "clickstream-inactive",
        inAnimation: "fade",
        outAnimation: "fade",
        inEasing: "easeOutExpo",
        outEasing: "easeOutExpo",
        inSpeed: 800,
        outSpeed: 800,
        inDelay: 100,
        outDelay: 100,
        inOpacity: 0,
        outOpacity: 0,
        inPositinX: "10%",
        inPositinY: "10%",
        outPositinX: "10%",
        outPositinY: "10%"
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
          methods.initPosition.apply(_this);
          $(window).bind("load", function() {
            methods.pageIn.apply(_this);
          });
          var $link = $("a:not(." + options.inactiveClass + ",[target*=_blank],[href^=#])");
          $link.off().on("click", function(e) {
            e.preventDefault();
            var url = $(this).attr("href");
            var stream = function() {
              location.href = url;
            };
            switch (options.outAnimation) {
             case "fade":
              $this.delay(options.outDelay).animate({
                opacity: options.outOpacity
              }, options.outSpeed, options.outEasing, function() {
                stream.call($this);
              });
              break;

             case "leftToRight":
              $this.delay(options.outDelay).animate({
                opacity: options.outOpacity,
                marginLeft: options.outPositinX
              }, options.outSpeed, options.outEasing, function() {
                stream.call($this);
              });
              break;

             case "rightToLeft":
              $this.delay(options.outDelay).animate({
                opacity: options.outOpacity,
                marginRight: options.outPositinX
              }, options.outSpeed, options.outEasing, function() {
                stream.call($this);
              });
              break;

             case "topToBottom":
              $this.delay(options.outDelay).animate({
                opacity: options.outOpacity,
                marginTop: options.outPositinY
              }, options.outSpeed, options.outEasing, function() {
                stream.call($this);
              });
              break;

             case "bottomToTop":
              $this.delay(options.outDelay).animate({
                opacity: options.outOpacity,
                marginTop: "-" + options.outPositinY
              }, options.outSpeed, options.outEasing, function() {
                stream.call($this);
              });
              break;
            }
          });
        }
      });
    },
    initPosition: function() {
      var $this = $(this);
      options = $this.data(namespace).options;
      switch (options.inAnimation) {
       case "fade":
        $this.css({
          opacity: 0
        });
        break;

       case "rightToLeft":
        $this.css({
          opacity: options.inOpacity,
          marginLeft: options.inPositinX
        });
        break;

       case "leftToRight":
        $this.css({
          opacity: options.inOpacity,
          marginRight: options.inPositinX
        });
        break;

       case "bottomToTop":
        $this.css({
          opacity: options.inOpacity,
          marginTop: options.inPositinY
        });
        break;

       case "topToBottom":
        $this.css({
          opacity: options.inOpacity,
          marginTop: "-" + options.inPositinY
        });
        break;
      }
    },
    pageIn: function() {
      var $this = $(this);
      options = $this.data(namespace).options;
      $this.delay(options.inDelay).animate({
        opacity: 1,
        margin: 0
      }, options.inSpeed, options.inEasing);
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