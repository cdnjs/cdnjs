/*!
 * drawer v1.5.1
 * 
 * Licensed under MIT
 * http://blivesta.com
 */
(function($) {
  
  var 
  namespace = "drawer",
  touches = window.ontouchstart === null,
  methods = {
    
    init: function(options) {
      
      options = $.extend({

        mastaClass:        "drawer-masta",
        navClass:          "drawer-nav",
        navListClass:      "drawer-nav-list",
        overlayClass:      "drawer-overlay",
        toggleClass:       "drawer-toggle",
        upperClass:        "drawer-overlay-upper",
        openClass:         "drawer-open",
        closeClass:        "drawer-close",
        responsiveClass:   "drawer-responsive",
        desktopEvent:      "click",  // or mouseover 
        drawerWidth:       280

      }, options);
      
      return this.each(function() {
                
        var 
        _this = this,
        $this = $(this),
        data = $this.data(namespace),
        $toggle = $("." + options.toggleClass),
        $navList = $("." + options.navListClass),
        $upper = $("<div>").addClass(options.upperClass),
        $nav = $("." + options.navClass),
        $masta = $("." + options.mastaClass),
        drawerHeight = $this.height(),
        navHeight = $nav.height(),
        mastaHeight = $masta.height();

        if (!data) {
          options = $.extend({}, options);
          $this.data(namespace, {
            options: options
          });
        }

        $this.append($upper);            

        methods.resize.call(_this);

        $(window).resize(function() {
          methods.resize.call(_this);
        });

        if (touches) {

          var 
          smY = 0,
          mfY = 0;

          $toggle.bind("touchend." + namespace, function() {
            methods.toggle.apply(_this);
          });

          $upper.bind("touchend." + namespace, function() {
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
              if (diffTime < 300 && draggedY > 0) { // scroll up
                moveY += Math.abs((draggedY / diffTime) * 300);
                smY = moveY;
              } else if (diffTime < 300 && draggedY < 0) { // scroll down
                moveY -= Math.abs((draggedY / diffTime) * 300);
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
          
          $toggle
            .off(options.desktopEvent + "." + namespace)
            .on(options.desktopEvent + "." + namespace, function() {
              methods.toggle.apply(_this);
            });
          
          $upper
            .off("click." + namespace)
            .on("click." + namespace, function() {
              methods.close.apply(_this);
            });
            
        }

      }); // end each
    },
    
    resize: function(options) {
      
      var 
      _this = this,
      $this = $(this);
      
      options = $this.data(namespace).options;
      
      var 
      windowHeight = $(window).height(),
      $masta = $("." + options.mastaClass),
      $overlay = $("." + options.overlayClass),
      overlayHeight =   $overlay.height();
            
      methods.close.call(_this, options);
      
      $overlay.css({
        "min-height": windowHeight
      });
      
      if (!touches && $this.hasClass(options.responsiveClass)) {

        $masta.css({
          "min-height": windowHeight,
          "height": overlayHeight
        });

      }      
    },
    
    
    toggle: function(options) {
      
      var 
      _this = this,
      $this = $(this);
      
      options = $this.data(namespace).options;
      
      var open = $this.hasClass(options.openClass);
      
      if (open) {
        methods.close.call(_this);
      } else {
        methods.open.call(_this);
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

      $this
        .removeClass(options.closeClass)
        .addClass(options.openClass);

      var 
      duration = $('.' + options.overlayClass)
        .css('transition-duration')
        .replace(/s/g, '') * 1000;
        
      setTimeout(function() {
          
        $this.css({
          "overflow": "hidden"
        });
        
        var
        windowWidth = $(window).width(),
        upperWidth = windowWidth - options.drawerWidth;

        $("."+options.upperClass).css({
          "width":upperWidth,
          "display":"block"
        });
        
      }, duration);

    },
    
    
    close: function(options) {
      
      var $this = $(this);
      
      options = $this.data(namespace).options;
      
      if (touches) {
        $this.off("touchmove." + namespace);
      }
      
      $this
        .removeClass(options.openClass)
        .addClass(options.closeClass);

      var 
      duration = $('.' + options.overlayClass)
        .css('transition-duration')
        .replace(/s/g, '') * 1000;

      setTimeout(function() {
        
        $this.css({
          "overflow": "auto"
        });
        
        $("."+options.upperClass).css({
          "display":"none"
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