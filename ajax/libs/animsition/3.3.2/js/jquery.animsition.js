/*!
 * animsition v3.3.2
 * http://blivesta.github.io/animsition/
 * Licensed under MIT
 * Author : blivesta
 * http://blivesta.com/
 */
(function($) {
  "use strict";
  var namespace = "animsition";
  var methods = {
    init: function(options) {
      options = $.extend({
        inClass: "fade-in",
        outClass: "fade-out",
        inDuration: 1500,
        outDuration: 800,
        linkElement: ".animsition-link",
        touchSupport: true,
        loading: true,
        loadingParentElement: "body",
        loadingClass: "animsition-loading",
        unSupportCss: [ "animation-duration", "-webkit-animation-duration", "-o-animation-duration" ],
        overlay: false,
        overlayClass: "animsition-overlay-slide",
        overlayParentElement: "body"
      }, options);
      var support = methods.supportCheck.call(this, options);
      if (support === false) {
        if (!("console" in window)) {
          window.console = {};
          window.console.log = function(str) {
            return str;
          };
        }
        console.log("Animsition does not support this browser.");
        return methods.destroy.call(this);
      }
      var bindEvts = "click." + namespace;
      if (options.touchSupport) {
        bindEvts += " touchend." + namespace;
      }
      var overlayMode = methods.state.call(this, options);
      if (overlayMode === true) {
        methods.addOverlay.call(this, options);
      }
      if (options.loading === true) {
        methods.addLoading.call(this, options);
      }
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var $window = $(window);
        var data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
          $window.on("load." + namespace + " pageshow." + namespace, function() {
            methods.pageIn.call(_this);
          });
          $window.on("unload." + namespace, function() {});
          $(options.linkElement).on(bindEvts, function(event) {
            event.preventDefault();
            var $self = $(this);
            methods.pageOut.call(_this, $self);
          });
        }
      });
    },
    supportCheck: function(options) {
      var $this = $(this);
      var props = options.unSupportCss;
      var propsNum = props.length;
      var support = false;
      if (propsNum === 0) {
        support = true;
      }
      for (var i = 0; i < propsNum; i++) {
        if (typeof $this.css(props[i]) === "string") {
          support = true;
          break;
        }
      }
      return support;
    },
    state: function(options) {
      var $this = $(this);
      var overlayMode;
      if (options.overlay === true || $this.data("animsition-overlay") === true) {
        overlayMode = true;
      } else {
        overlayMode = false;
      }
      return overlayMode;
    },
    addOverlay: function(options) {
      $(options.overlayParentElement).prepend('<div class="' + options.overlayClass + '"></div>');
    },
    addLoading: function(options) {
      $(options.loadingParentElement).append('<div class="' + options.loadingClass + '"></div>');
    },
    removeLoading: function() {
      var $this = $(this);
      var options = $this.data(namespace).options;
      var $loading = $(options.loadingParentElement).children("." + options.loadingClass);
      $loading.fadeOut().remove();
    },
    pageInClass: function() {
      var $this = $(this);
      var options = $this.data(namespace).options;
      var thisInClass = $this.data("animsition-in");
      var inClass;
      if (typeof thisInClass === "string") {
        inClass = thisInClass;
      } else {
        inClass = options.inClass;
      }
      return inClass;
    },
    pageInDuration: function() {
      var $this = $(this);
      var options = $this.data(namespace).options;
      var thisInDuration = $this.data("animsition-in-duration");
      var inDuration;
      if (typeof thisInDuration === "number") {
        inDuration = thisInDuration;
      } else {
        inDuration = options.inDuration;
      }
      return inDuration;
    },
    pageIn: function() {
      var _this = this;
      var $this = $(this);
      var options = $this.data(namespace).options;
      var inClass = methods.pageInClass.call(_this);
      var inDuration = methods.pageInDuration.call(_this);
      var overlayMode = methods.state.call(_this, options);
      if (options.loading === true) {
        methods.removeLoading.call(_this);
      }
      if (overlayMode === true) {
        methods.pageInOverlay.call(_this, inClass, inDuration);
      } else {
        methods.pageInBasic.call(_this, inClass, inDuration);
      }
    },
    pageInBasic: function(inClass, inDuration) {
      var $this = $(this);
      $this.css({
        "animation-duration": inDuration / 1e3 + "s"
      }).addClass(inClass).animateCallback(function() {
        $this.removeClass(inClass).css({
          opacity: 1
        });
      });
    },
    pageInOverlay: function(inClass, inDuration) {
      var $this = $(this);
      var options = $this.data(namespace).options;
      $this.css({
        opacity: 1
      });
      $(options.overlayParentElement).children("." + options.overlayClass).css({
        "animation-duration": inDuration / 1e3 + "s"
      }).addClass(inClass);
    },
    pageOutClass: function($self) {
      var $this = $(this);
      var options = $this.data(namespace).options;
      var selfOutClass = $self.data("animsition-out");
      var thisOutClass = $this.data("animsition-out");
      var outClass;
      if (typeof selfOutClass === "string") {
        outClass = selfOutClass;
      } else if (typeof thisOutClass === "string") {
        outClass = thisOutClass;
      } else {
        outClass = options.outClass;
      }
      return outClass;
    },
    pageOutDuration: function($self) {
      var $this = $(this);
      var options = $this.data(namespace).options;
      var selfOutDuration = $self.data("animsition-out-duration");
      var thisOutDuration = $this.data("animsition-out-duration");
      var outDuration;
      if (typeof selfOutDuration === "number") {
        outDuration = selfOutDuration;
      } else if (typeof thisOutDuration === "number") {
        outDuration = thisOutDuration;
      } else {
        outDuration = options.outDuration;
      }
      return outDuration;
    },
    pageOut: function($self) {
      var _this = this;
      var $this = $(this);
      var options = $this.data(namespace).options;
      var outClass = methods.pageOutClass.call(_this, $self);
      var outDuration = methods.pageOutDuration.call(_this, $self);
      var overlayMode = methods.state.call(_this, options);
      var url = $self.attr("href");
      if (overlayMode === true) {
        methods.pageOutOverlay.call(_this, outClass, outDuration, url);
      } else {
        methods.pageOutBasic.call(_this, outClass, outDuration, url);
      }
    },
    pageOutBasic: function(outClass, outDuration, url) {
      var $this = $(this);
      $this.css({
        "animation-duration": outDuration / 1e3 + "s"
      }).addClass(outClass).animateCallback(function() {
        location.href = url;
      });
    },
    pageOutOverlay: function(outClass, outDuration, url) {
      var _this = this;
      var $this = $(this);
      var options = $this.data(namespace).options;
      var inClass = methods.pageInClass.call(_this);
      $(options.overlayParentElement).children("." + options.overlayClass).css({
        "animation-duration": outDuration / 1e3 + "s"
      }).removeClass(inClass).addClass(outClass).animateCallback(function() {
        $this.css({
          opacity: 0
        });
        location.href = url;
      });
    },
    destroy: function() {
      return this.each(function() {
        var $this = $(this);
        $(window).unbind("." + namespace);
        $this.css({
          opacity: 1
        }).removeData(namespace);
      });
    }
  };
  $.fn.animateCallback = function(callback) {
    var animationEnd = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
    return this.each(function() {
      $(this).bind(animationEnd, function() {
        $(this).unbind(animationEnd);
        return callback.call(this);
      });
    });
  };
  $.fn.animsition = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);