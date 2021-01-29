/*! formstone v1.4.20-1 [scrollbar.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core",
        "./touch"
      ], factory);
    } else {
      factory(jQuery, Formstone);
    }
  }(function($, Formstone) {

    "use strict";

    /**
     * @method private
     * @name setup
     * @description Setup plugin.
     */

    function setup() {
      $Body = Formstone.$body;
    }

    /**
     * @method private
     * @name resize
     * @description Handles window resize
     */

    function resize(windowWidth) {
      Functions.iterate.call($Instances, resizeInstance);
    }

    /**
     * @method private
     * @name cacheInstances
     * @description Caches active instances
     */

    function cacheInstances() {
      $Instances = $(Classes.base);
    }

    /**
     * @method private
     * @name construct
     * @description Builds instance.
     * @param data [object] "Instance data"
     */

    function construct(data) {
      var html = '';

      html += '<div class="' + RawClasses.bar + '">';
      html += '<div class="' + RawClasses.track + '">';
      html += '<button type="button" class="' + RawClasses.handle + '" aria-hidden="true" tabindex="-1"></button>';
      html += '</div></div>';

      data.paddingRight = parseInt(this.css("padding-right"), 10);
      data.paddingBottom = parseInt(this.css("padding-bottom"), 10);
      data.thisClasses = [RawClasses.base, data.theme, data.customClass, (data.horizontal ? RawClasses.horizontal : "")];

      this.addClass(data.thisClasses.join(" "))
        .wrapInner('<div class="' + RawClasses.content + '" tabindex="0"></div>')
        .prepend(html);

      data.$content = this.find(Classes.content);
      data.$bar = this.find(Classes.bar);
      data.$track = this.find(Classes.track);
      data.$handle = this.find(Classes.handle);

      data.trackMargin = parseInt(data.trackMargin, 10);

      // Events

      data.$content.on(Events.scroll, data, onScroll);

      if (data.mouseWheel) {
        data.$content.on("wheel" + Events.namespace, data, onMouseWheel);
      }

      data.$track.fsTouch({
          axis: (data.horizontal) ? "x" : "y",
          pan: true
        }).on(Events.panStart, data, onPanStart)
        .on(Events.pan, data, onPan)
        .on(Events.panEnd, data, onPanEnd)
        .on(Events.click, Functions.killEvent)
        .on("wheel" + Events.namespace, data, onTrackMouseWheel);

      resizeInstance(data);

      cacheInstances();
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      data.$track.fsTouch("destroy");

      data.$bar.remove();

      data.$content.off(Events.namespace)
        .contents()
        .unwrap();

      this.removeClass(data.thisClasses.join(" "))
        .off(Events.namespace);

      if (this.attr("id") === data.rawGuid) {
        this.removeAttr("id");
      }
    }

    /**
     * @method
     * @name scroll
     * @description Scrolls instance of plugin to element or position
     * @param position [string or int] <null> "Target element selector or static position"
     * @param duration [int] <null> "Optional scroll duration"
     * @example $(".target").scrollbar("scroll", position, duration);
     */

    function scroll(data, position, dur) {
      var duration = dur || data.duration,
        styles = {};

      if (typeof position !== "number") {
        var $target = $(position);

        if ($target.length > 0) {
          var offset = $target.position();

          if (data.horizontal) {
            position = offset.left + data.$content.scrollLeft();
          } else {
            position = offset.top + data.$content.scrollTop();
          }
        } else {
          if (position === "top") {
            position = 0;
          } else if (position === "bottom") {
            position = data.horizontal ? data.$content[0].scrollWidth : data.$content[0].scrollHeight;
          } else {
            position = data.$content.scrollTop();
          }
        }
      }

      styles[(data.horizontal ? "scrollLeft" : "scrollTop")] = position;

      data.$content.stop()
        .animate(styles, duration);
    }

    /**
     * @method
     * @name resize
     * @description Resizes layout on instance of plugin
     * @example $(".target").scrollbar("resize");
     */

    /**
     * @method private
     * @name resizeInstance
     * @description Resizes layout on instance of plugin
     */

    function resizeInstance(data) {
      data.$el.addClass(RawClasses.isSetup);

      var barStyles = {},
        trackStyles = {},
        handleStyles = {},
        handlePosition = 0,
        active = true;

      if (data.horizontal) {
        // Horizontal
        data.barHeight = data.$content[0].offsetHeight - data.$content[0].clientHeight;
        data.frameWidth = data.$content.outerWidth();
        data.trackWidth = data.frameWidth - (data.trackMargin * 2);
        data.scrollWidth = data.$content[0].scrollWidth;
        data.ratio = data.trackWidth / data.scrollWidth;
        data.trackRatio = data.trackWidth / data.scrollWidth;
        data.handleWidth = (data.handleSize > 0) ? data.handleSize : data.trackWidth * data.trackRatio;
        data.scrollRatio = (data.scrollWidth - data.frameWidth) / (data.trackWidth - data.handleWidth);
        data.handleBounds = {
          left: 0,
          right: data.trackWidth - data.handleWidth
        };

        data.$content.css({
          paddingBottom: data.barHeight + data.paddingBottom
        });

        var scrollLeft = data.$content.scrollLeft();

        handlePosition = scrollLeft * data.ratio;
        active = (data.scrollWidth <= data.frameWidth);

        barStyles = {
          width: data.frameWidth
        };

        trackStyles = {
          width: data.trackWidth,
          marginLeft: data.trackMargin,
          marginRight: data.trackMargin
        };

        handleStyles = {
          width: data.handleWidth
        };
      } else {
        // Vertical
        data.barWidth = data.$content[0].offsetWidth - data.$content[0].clientWidth;
        data.frameHeight = data.$content.outerHeight();
        data.trackHeight = data.frameHeight - (data.trackMargin * 2);
        data.scrollHeight = data.$content[0].scrollHeight;
        data.ratio = data.trackHeight / data.scrollHeight;
        data.trackRatio = data.trackHeight / data.scrollHeight;
        data.handleHeight = (data.handleSize > 0) ? data.handleSize : data.trackHeight * data.trackRatio;
        data.scrollRatio = (data.scrollHeight - data.frameHeight) / (data.trackHeight - data.handleHeight);
        data.handleBounds = {
          top: 0,
          bottom: data.trackHeight - data.handleHeight
        };

        var scrollTop = data.$content.scrollTop();

        handlePosition = scrollTop * data.ratio;
        active = (data.scrollHeight <= data.frameHeight);

        barStyles = {
          height: data.frameHeight
        };

        trackStyles = {
          height: data.trackHeight,
          marginBottom: data.trackMargin,
          marginTop: data.trackMargin
        };

        handleStyles = {
          height: data.handleHeight
        };
      }

      // Updates

      if (active) {
        data.$el.removeClass(RawClasses.active);
      } else {
        data.$el.addClass(RawClasses.active);
      }

      data.$bar.css(barStyles);
      data.$track.css(trackStyles);
      data.$handle.css(handleStyles);

      data.panning = false;

      positionContent(data, handlePosition);

      onScroll({
        data: data
      });

      data.$el.removeClass(RawClasses.setup);
    }

    /**
     * @method private
     * @name onScroll
     * @description Handles scroll event
     * @param e [object] "Event data"
     */

    function onScroll(e) {
      Functions.killEvent(e);

      var data = e.data,
        handleStyles = {};

      if (!data.panning) {
        if (data.horizontal) {
          // Horizontal
          var scrollLeft = data.$content.scrollLeft();

          if (scrollLeft < 0) {
            scrollLeft = 0;
          }

          data.handleLeft = scrollLeft / data.scrollRatio;

          if (data.handleLeft > data.handleBounds.right) {
            data.handleLeft = data.handleBounds.right;
          }

          handleStyles = {
            left: data.handleLeft
          };
        } else {
          // Vertical
          var scrollTop = data.$content.scrollTop();

          if (scrollTop < 0) {
            scrollTop = 0;
          }

          data.handleTop = scrollTop / data.scrollRatio;

          if (data.handleTop > data.handleBounds.bottom) {
            data.handleTop = data.handleBounds.bottom;
          }

          handleStyles = {
            top: data.handleTop
          };
        }

        data.$handle.css(handleStyles);
      }
    }

    function onTrackMouseWheel(e) {
      onMouseWheel(e, true);
    }

    /**
     * @method private
     * @name onMouseWheel
     * @description Handles mousewheel event on content
     * @param e [object] "Event data"
     */

    function onMouseWheel(e, fromTrack) {
      // http://stackoverflow.com/questions/5802467/prevent-scrolling-of-parent-element/16324762#16324762
      var data = e.data,
        delta,
        direction;

      if (data.horizontal) {
        // Horizontal
        var scrollLeft = data.$content[0].scrollLeft,
          scrollWidth = data.$content[0].scrollWidth,
          width = data.$content.outerWidth();

        delta = e.originalEvent.deltaX * ((fromTrack === true) ? -1 : 1);

        if (fromTrack === true) {
          data.$content.scrollLeft(scrollLeft - delta);
          return killEvent(e);
        }

        direction = (delta < 0) ? "right" : "left";

        if (direction === "left" && delta > (scrollWidth - width - scrollLeft)) {
          data.$content.scrollLeft(scrollWidth);
          return killEvent(e);
        } else if (direction === "right" && -delta > scrollLeft) {
          data.$content.scrollLeft(0);
          return killEvent(e);
        }
      } else {
        // Vertical
        var scrollTop = data.$content[0].scrollTop,
          scrollHeight = data.$content[0].scrollHeight,
          height = data.$content.outerHeight();

        delta = e.originalEvent.deltaY * ((fromTrack === true) ? -1 : 1);

        if (fromTrack === true) {
          data.$content.scrollTop(scrollTop - delta);
          return killEvent(e);
        }

        direction = (delta < 0) ? "up" : "down";

        if (direction === "down" && delta > (scrollHeight - height - scrollTop)) {
          data.$content.scrollTop(scrollHeight);
          return killEvent(e);
        } else if (direction === "up" && -delta > scrollTop) {
          data.$content.scrollTop(0);
          return killEvent(e);
        }
      }
    }

    /**
     * @method private
     * @name killEvent
     * @description Localized version of Formstone.killEvent()
     * @param e [object] "Event data"
     */

    function killEvent(e) {
      Functions.killEvent(e);
      e.returnValue = false;
      return false;
    }

    /**
     * @method private
     * @name onPanStart
     * @description Handles pan event on track
     * @param e [object] "Event data"
     */

    function onPanStart(e) {
      var data = e.data,
        offset = data.$track.offset(),
        handlePosition;

      data.panning = true;

      if (data.horizontal) {
        handlePosition = data.handleLeft = e.pageX - offset.left /* + $Window.scrollLeft() */ - (data.handleWidth / 2);
      } else {
        handlePosition = data.handleTop = e.pageY - offset.top /* + $Window.scrollTop() */ - (data.handleHeight / 2);
      }

      positionContent(data, handlePosition);
    }

    function onPan(e) {
      var data = e.data,
        handlePosition;

      if (data.horizontal) {
        handlePosition = data.handleLeft + e.deltaX;
      } else {
        handlePosition = data.handleTop + e.deltaY;
      }

      positionContent(data, handlePosition);
    }

    function onPanEnd(e) {
      var data = e.data;

      data.panning = false;

      if (data.horizontal) {
        data.handleLeft += e.deltaX;
      } else {
        data.handleTop += e.deltaY;
      }

      // positionContent(data, handlePosition);
    }

    /**
     * @method private
     * @name position
     * @description Position handle based on scroll
     * @param data [object] "Instance data"
     * @param position [int] "Scroll position"
     */

    function positionContent(data, position) {
      var handleStyles = {};

      if (data.horizontal) {
        // Horizontal
        if (position < data.handleBounds.left) {
          position = data.handleBounds.left;
        }

        if (position > data.handleBounds.right) {
          position = data.handleBounds.right;
        }

        handleStyles = {
          left: position
        };

        data.$content.scrollLeft(Math.round(position * data.scrollRatio));
      } else {
        // Vertical
        if (position < data.handleBounds.top) {
          position = data.handleBounds.top;
        }

        if (position > data.handleBounds.bottom) {
          position = data.handleBounds.bottom;
        }

        handleStyles = {
          top: position
        };

        data.$content.scrollTop(Math.round(position * data.scrollRatio));
      }

      data.$handle.css(handleStyles);
    }

    /**
     * @plugin
     * @name Scrollbar
     * @description A jQuery plugin for custom scrollbars.
     * @type widget
     * @main scrollbar.js
     * @main scrollbar.css
     * @dependency jQuery
     * @dependency core.js
     * @dependency touch.js
     */

    var Plugin = Formstone.Plugin("scrollbar", {
        widget: true,

        /**
         * @options
         * @param customClass [string] <''> "Class applied to instance"
         * @param duration [int] <0> "Scroll animation length"
         * @param handleSize [int] <0> "Handle size; 0 to auto size"
         * @param horizontal [boolean] <false> "Scroll horizontally"
         * @param mouseWheel [boolean] <true> "Flag to prevent scrolling of parent element"
         * @param theme [string] <"fs-light"> "Theme class name"
         * @param trackMargin [int] <0> "Margin between track and handle edge”
         */

        defaults: {
          customClass: "",
          duration: 0,
          handleSize: 0,
          horizontal: false,
          mouseWheel: true,
          theme: "fs-light",
          trackMargin: 0
        },

        classes: [
          "content",
          "bar",
          "track",
          "handle",
          "horizontal",
          "setup",
          "active"
        ],

        methods: {
          _construct: construct,
          _destruct: destruct,
          _resize: resize,

          // Public Methods
          scroll: scroll,
          resize: resizeInstance
        }
      }),

      // Localize References

      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions,

      $Body,
      $Window = Formstone.$window,
      $Instances = [];

    // Setup

    Formstone.Ready(setup);

  })

);
