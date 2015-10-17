/*!
 * drawer v1.2.0
 * 
 * Licensed under MIT
 * http://blivesta.com
 */
(function($) {
  var namespace = "drawer", agent = navigator.userAgent, iphone = agent.search(/iPhone/) != -1, ipad = agent.search(/iPad/) != -1, android = agent.search(/Android/) != -1, touches = iphone || ipad || android, methods = {
    init: function(options) {
      options = $.extend({
        masta: "drawer-masta",
        nav: "drawer-nav",
        navList: "drawer-nav-list",
        overlay: "drawer-overlay",
        toggle: "drawer-toggle",
        openClass: "drawer-open",
        closeClass: "drawer-close",
        desktopEvent: "click",
        width: 280
      }, options);
      return this.each(function() {
        var _this = this, $this = $(this), data = $this.data(namespace);
        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
        }
        smY = 0;
        var $toggle = $("." + options.toggle), $overlay = $("." + options.overlay), $navList = $("." + options.navList), $nav = $("." + options.nav), $masta = $("." + options.masta), drawerHeight = $this.height(), navHeight = $nav.height(), mastaHeight = $masta.height();
        methods.resize.call(_this);
        $(window).resize(function() {
          methods.resize.call(_this);
        });
        if (touches) {
          $toggle.bind("touchend." + namespace, function() {
            methods.toggle.apply(_this);
          });
          $overlay.bind("touchend." + namespace, function() {
            methods.close.apply(_this);
          });
          $nav.bind("touchstart." + namespace, function() {
            sfY = event.touches[0].screenY;
            startTime = Date.now();
            startY = event.changedTouches[0].clientY;
          });
          $nav.bind("touchmove." + namespace, function() {
            var $self = $(this);
            mfY = event.changedTouches[0].screenY;
            moveY = smY + mfY - sfY;
            draggedY = event.changedTouches[0].clientY - startY;
            $self.css({
              "-webkit-transition": "none",
              "-webkit-transform": "translate3d(0px," + moveY + "px,0px)"
            });
          });
          $nav.bind("touchend." + namespace, function() {
            var $self = $(this);
            diffTime = Date.now() - startTime;
            smY = smY + (mfY - sfY);
            var ease = function() {
              if (diffTime < 300 && draggedY > 0) {
                moveY += Math.abs(draggedY / diffTime * 300);
                smY = moveY;
              } else if (diffTime < 300 && draggedY < 0) {
                moveY -= Math.abs(draggedY / diffTime * 300);
                smY = moveY;
              }
              $self.css({
                "-webkit-transition": "-webkit-transform .7s ease-out",
                "-webkit-transform": "translate3d(0px," + moveY + "px,0px)"
              });
            };
            var bounce = function() {
              if (moveY > 0) {
                smY = 0;
              } else if (drawerHeight - navHeight > moveY) {
                if (mastaHeight > $navList.height()) {
                  smY = drawerHeight - mastaHeight;
                } else {
                  smY = drawerHeight - navHeight;
                }
              }
              $self.css({
                "-webkit-transition": "-webkit-transform .5s ease-out",
                "-webkit-transform": "translate3d(0px," + smY + "px,0px)"
              });
            };
            ease.call();
            bounce.call();
          });
        } else {
          $toggle.off(options.desktopEvent + "." + namespace).on(options.desktopEvent + "." + namespace, function() {
            methods.toggle.apply(_this);
          });
          $overlay.off("click." + namespace).on("click." + namespace, function() {
            methods.close.apply(_this);
          });
        }
      });
    },
    resize: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var windowHeight = $(window).height();
      var $overlay = $("." + options.overlay);
      methods.close.call(this, options);
      $overlay.css({
        "min-height": windowHeight
      });
    },
    toggle: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      var open = $this.hasClass(options.openClass);
      if (open) {
        methods.close.call(this);
      } else {
        methods.open.call(this);
      }
    },
    open: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      if (touches) {
        $this.on("touchmove." + namespace, function() {
          event.preventDefault();
        });
        event.preventDefault();
      }
      $this.removeClass(options.closeClass).addClass(options.openClass);
      var duration = $("." + options.overlay).css("transition-duration").replace(/s/g, "") * 1e3;
      setTimeout(function() {
        $this.css({
          overflow: "hidden"
        });
      }, duration);
    },
    close: function(options) {
      var $this = $(this);
      options = $this.data(namespace).options;
      if (touches) {
        $this.off("touchmove." + namespace);
      }
      $this.removeClass(options.openClass).addClass(options.closeClass);
      var duration = $("." + options.overlay).css("transition-duration").replace(/s/g, "") * 1e3;
      setTimeout(function() {
        $this.css({
          overflow: "auto"
        });
      }, duration);
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