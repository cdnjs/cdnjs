/*! slidereveal - v1.0.1 - 2015-11-01
* https://github.com/nnattawat/slidereveal
* Copyright (c) 2015 Nattawat Nonsung; Licensed MIT */
(function ($) {
  var settings = [];
  var clickSource;

  // Collection method.
  $.fn.slideReveal = function (options, triggerEvents) {
    var self = this;
    var paddingLeft = self.css('padding-left');
    paddingLeft = +paddingLeft.substring(0, paddingLeft.length -2);

    var paddingRight = self.css('padding-left');
    paddingRight = +paddingRight.substring(0, paddingRight.length -2);
    var setting, sidePosition;

    if (options !== undefined && typeof(options) === "string") {
      var settingIndex = self.data("setting-index");
      setting = settings[settingIndex];

      sidePosition = (setting.width + paddingLeft + paddingRight) + "px";

      if (options === "show") {
        // show overlay
        if (setting.overlay) {
          $(".slide-reveal-overlay").show();
        }

        // trigger show() method
        if (triggerEvents === undefined || triggerEvents) { setting.show(this, clickSource); }

        // slide the panel 
        self.css(setting.position, "0px");
        if (setting.push) {
          if (setting.position==="left") {
            $("body").css("left", sidePosition);
          } else {
            $("body").css("left", "-"+sidePosition);
          }
        }
        self.data("slide-reveal", true);

        // trigger shown() method
        if (triggerEvents === undefined || triggerEvents) {
          setTimeout(function() {
            setting.shown(self, clickSource);
          }, setting.speed);
        }
        return self;
      } else if (options === "hide") {
        // trigger hide() method
        if (triggerEvents === undefined || triggerEvents) { setting.hide(this, clickSource); }

        // hide the panel
        if (setting.push) {
          $("body").css("left", "0px");
        }
        self.css(setting.position, "-"+sidePosition);
        self.data("slide-reveal", false);

        // trigger hidden() method
        if (triggerEvents === undefined || triggerEvents) {
          setTimeout(function(){
            // hide overlay
            if (setting.overlay) {
              $(".slide-reveal-overlay").hide();
            }

            setting.hidden(self, clickSource);
          }, setting.speed);
        }
        return self;
      }
    } else {
      // Define default setting
      setting = {
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
      setting = $.extend(setting, options);
      // Keep this setting to array so that it won't be overwritten if slideReveal() is called again.
      settings.push(setting);
      self.data("setting-index", settings.length - 1);

      sidePosition = (setting.width + paddingLeft + paddingRight) + "px";

      var transition = "all ease " + setting.speed + "ms";
      self.css({
          position: "fixed",
          width: setting.width,
          transition: transition,
          height: "100%",
          top: setting.top
        })
        .css(setting.position, "-"+sidePosition);

      if (setting.overlay) {
        self.css('z-index', setting.zIndex);
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
            self.slideReveal("hide");
          });
      }

      // Add close stage
      self.data("slide-reveal", false);

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
        setting.trigger.click( function() {
          clickSource = $(this);
          if (!self.data("slide-reveal")) { // Show
            self.slideReveal("show");
          } else { // Hide
            self.slideReveal("hide");
          }
        });
      }

      // Bind hide event to ESC
      if (setting.autoEscape) {
        $(document).keydown( function(e) {
          if ($('input:focus, textarea:focus').length === 0) {
            if (e.keyCode === 27 && self.data("slide-reveal")) { //ESC
              self.slideReveal("hide");
            }
          }
        });
      }
    }

    return this;
  };

}(jQuery));