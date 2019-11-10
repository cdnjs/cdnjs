/*! slidereveal - v1.1.1 - 2016-03-04
* https://github.com/nnattawat/slidereveal
* Copyright (c) 2016 Nattawat Nonsung; Licensed MIT */
(function ($) {
  // Private attributes and method
  var getPadding = function($el, side) {
    var padding = $el.css('padding-' + side);
    return padding ? +padding.substring(0, padding.length - 2) : 0;
  };

  var sidePosition = function($el) {
    var paddingLeft = getPadding($el, 'left');
    var paddingRight = getPadding($el, 'right');
    return ($el.width() + paddingLeft + paddingRight) + "px";
  };

  var SlideReveal = function($el, options) {
    // Define default setting
    var setting = {
      width: 250,
      push: true,
      position: "left",
      speed: 300, //ms
      trigger: undefined,
      autoEscape: true,
      show: function(){},
      shown: function(){},
      hidden: function(){},
      hide: function(){},
      top: 0,
      overlay: false,
      "zIndex": 1049,
      overlayColor: 'rgba(0,0,0,0.5)'
    };

    // Attributes
    this.setting = $.extend(setting, options);
    this.element = $el;

    this.init();
  };

  // Public methods
  $.extend(SlideReveal.prototype, {
    init: function() {
      var self = this;
      var setting = this.setting;
      var $el = this.element;

      var transition = "all ease " + setting.speed + "ms";
      $el.css({
        position: "fixed",
        width: setting.width,
        transition: transition,
        height: "100%",
        top: setting.top
      })
      .css(setting.position, "-" + sidePosition($el));

      if (setting.overlay) {
        $el.css('z-index', setting.zIndex);
        $("body").prepend("<div class='slide-reveal-overlay'></div>");
        $(".slide-reveal-overlay")
        .hide()
        .css({
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          'z-index': setting.zIndex - 1,
          'background-color': setting.overlayColor,
        }).click(function() {
          self.hide();
        });
      }

      // Add close stage
      $el.data("slide-reveal", false);

      if (setting.push){
        $("body").css({
          position: "relative",
          "overflow-x": "hidden",
          transition: transition,
          left: "0px"
        });
      }

      // Attach trigger using click event
      if (setting.trigger && setting.trigger.length > 0) {
        setting.trigger.on('click.slideReveal', function() {
          if (!$el.data("slide-reveal")) { // Show
            self.show();
          } else { // Hide
            self.hide();
          }
        });
      }

      // Bind hide event to ESC
      if (setting.autoEscape) {
        $(document).on('keydown.slideReveal', function(e) {
          if ($('input:focus, textarea:focus').length === 0) {
            if (e.keyCode === 27 && $el.data("slide-reveal")) { // ESC
              self.hide();
            }
          }
        });
      }
    },

    show: function(triggerEvents) {
      var setting = this.setting;
      var $el = this.element;

      // trigger show() method
      if (triggerEvents === undefined || triggerEvents) { setting.show($el); }

      // show overlay
      if (setting.overlay) {
        $(".slide-reveal-overlay").show();
      }

      // slide the panel
      $el.css(setting.position, "0px");
      if (setting.push) {
        if (setting.position === "left") {
          $("body").css("left", sidePosition($el));
        } else {
          $("body").css("left", "-" + sidePosition($el));
        }
      }
      $el.data("slide-reveal", true);

      // trigger shown() method
      if (triggerEvents === undefined || triggerEvents) {
        setTimeout(function() {
          setting.shown($el);
        }, setting.speed);
      }
    },

    hide: function(triggerEvents) {
      var setting = this.setting;
      var $el = this.element;

      // trigger hide() method
      if (triggerEvents === undefined || triggerEvents) { setting.hide($el); }

      // hide the panel
      if (setting.push) {
        $("body").css("left", "0px");
      }
      $el.css(setting.position, "-" + sidePosition($el));
      $el.data("slide-reveal", false);

      // trigger hidden() method
      if (triggerEvents === undefined || triggerEvents) {
        setTimeout(function(){
          // hide overlay
          if (setting.overlay) {
            $(".slide-reveal-overlay").hide();
          }

          setting.hidden($el);
        }, setting.speed);
      }
    },

    toggle: function(triggerEvents) {
      var $el = this.element;
      if ($el.data('slide-reveal')) {
        this.hide(triggerEvents);
      } else {
        this.show(triggerEvents);
      }
    }
  });

  // jQuery collection methods
  $.fn.slideReveal = function (options, triggerEvents) {
    if (options !== undefined && typeof(options) === "string") {
      this.each(function() {
        var slideReveal = $(this).data('slide-reveal-model');

        if (options === "show") {
          slideReveal.show(triggerEvents);
        } else if (options === "hide") {
          slideReveal.hide(triggerEvents);
        } else if (options === 'toggle') {
          slideReveal.toggle(triggerEvents);
        }
      });
    } else {
      this.each(function() {
        if ($(this).data('slide-reveal-model')) {
          $(this).data('slide-reveal-model').remove();
        }
        $(this).data('slide-reveal-model', new SlideReveal($(this), options));
      });
    }

    return this;
  };

}(jQuery));
