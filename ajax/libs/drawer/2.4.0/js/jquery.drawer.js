/*!
 * drawer v2.4.0
 * http://git.blivesta.com/drawer
 * Licensed under MIT
 * Author : blivesta
 * http://blivesta.com
 */
(function($) {
  "use strict";
  var namespace = "drawer";
  var touches = typeof document.ontouchstart != "undefined";
  var methods = {
    init: function(options) {
      options = $.extend({
        mastaClass: "drawer-main",
        toggleClass: "drawer-toggle",
        upperClass: "drawer-overlay-upper",
        openClass: "drawer-open",
        closeClass: "drawer-close",
        apiToggleClass: "drawer-api-toggle",
        responsiveClass: "drawer-responsive",
        dropdownClass: "dropdown",
        dropdownShown: "shown.bs.dropdown",
        dropdownHidden: "hidden.bs.dropdown"
      }, options);
      return this.each(function() {
        var _this = this;
        var $this = $(this);
        var data = $this.data(namespace);
        var $upper = $("<div>").addClass(options.upperClass + " " + options.toggleClass);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
        }
        $this.append($upper);
        var drawerScroll = new IScroll("." + options.mastaClass, {
          mouseWheel: true,
          preventDefault: false
        });
        $("." + options.toggleClass + ", ." + options.apiToggleClass).off("click." + namespace).on("click." + namespace, function() {
          methods.toggle.call(_this);
          drawerScroll.refresh();
        });
        $(window).resize(function() {
          methods.close.call(_this);
          drawerScroll.refresh();
        });
        $("." + options.dropdownClass).on(options.dropdownShown, function() {
          drawerScroll.refresh();
        }).on(options.dropdownHidden, function() {
          drawerScroll.refresh();
        });
      });
    },
    toggle: function(options) {
      var _this = this;
      var $this = $(this);
      options = $this.data(namespace).options;
      var open = $this.hasClass(options.openClass);
      open ? methods.close.call(_this) : methods.open.call(_this);
    },
    open: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      if (touches) {
        $this.on("touchmove." + namespace, function(event) {
          event.preventDefault();
        });
      }
      $this.removeClass(options.closeClass).addClass(options.openClass).transitionEnd(function() {
        $this.css({
          overflow: "hidden"
        }).trigger("drawer.opened");
      });
    },
    close: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      if (touches) {
        $this.off("touchmove." + namespace);
      }
      $this.removeClass(options.openClass).addClass(options.closeClass).transitionEnd(function() {
        $this.css({
          overflow: "auto"
        }).trigger("drawer.closed");
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
  $.fn.drawer = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery." + namespace);
    }
  };
})(jQuery);

(function($) {
  "use strict";
  $.fn.transitionEnd = function(callback) {
    var end = "transitionend webkitTransitionEnd mozTransitionEnd oTransitionEnd MSTransitionEnd";
    return this.each(function() {
      $(this).bind(end, function() {
        $(this).unbind(end);
        return callback.call(this);
      });
    });
  };
})(jQuery);