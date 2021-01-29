/*! formstone v1.4.20-1 [range.js] 2021-01-29 | GPL-3.0 License | formstone.it */
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
      $Instances = $(Classes.element);
    }

    /**
     * @method private
     * @name construct
     * @description Builds instance.
     * @param data [object] "Instance data"
     */

    function construct(data) {
      if (!data.formatter) {
        data.formatter = formatNumber;
      }

      data.min = parseFloat(this.attr("min")) || 0;
      data.max = parseFloat(this.attr("max")) || 100;
      data.step = parseFloat(this.attr("step")) || 1;
      data.digits = data.step.toString().length - data.step.toString().indexOf(".");
      data.value = parseFloat(this.val()) || (data.min + ((data.max - data.min) / 2));

      var html = "";

      // Not valid in the spec
      data.vertical = this.attr("orient") === "vertical" || data.vertical;
      data.disabled = this.is(":disabled") || this.is("[readonly]");

      html += '<div class="' + RawClasses.track + '" aria-hidden="true">';
      if (data.fill) {
        html += '<span class="' + RawClasses.fill + '"></span>';
      }
      html += '<div class="' + RawClasses.handle + '" role="slider">';
      html += '<span class="' + RawClasses.marker + '"></span>';
      html += '</div>';
      html += '</div>';

      var baseClasses = [
        RawClasses.base,
        data.theme,
        data.customClass,
        (data.vertical) ? RawClasses.vertical : "",
        (data.labels) ? RawClasses.labels : "",
        (data.disabled) ? RawClasses.disabled : ""
      ];

      this.addClass(RawClasses.element)
        .wrap('<div class="' + baseClasses.join(" ") + '"></div>')
        .after(html);

      data.$container = this.parents(Classes.base);
      data.$track = data.$container.find(Classes.track);
      data.$fill = data.$container.find(Classes.fill);
      data.$handle = data.$container.find(Classes.handle);
      data.$output = data.$container.find(Classes.output);

      if (data.labels) {
        var labelMax = '<span class="' + [RawClasses.label, RawClasses.label_max].join(" ") + '">' + data.formatter.call(this, (data.labels.max) ? data.labels.max : data.max) + '</span>',
          labelMin = '<span class="' + [RawClasses.label, RawClasses.label_min].join(" ") + '">' + data.formatter.call(this, (data.labels.max) ? data.labels.min : data.min) + '</span>';

        data.$container.prepend((data.vertical) ? labelMax : labelMin)
          .append((data.vertical) ? labelMin : labelMax);
      }

      data.$labels = data.$container.find(Classes.label);

      // Bind click events
      this.on(Events.focus, data, onFocus)
        .on(Events.blur, data, onBlur)
        .on(Events.change, data, onChange);

      data.$container.fsTouch({
          pan: true,
          axis: data.vertical ? "y" : "x"
        }).on(Events.panStart, data, onPanStart)
        .on(Events.pan, data, onPan)
        .on(Events.panEnd, data, onPanEnd);

      cacheInstances();

      resizeInstance.call(this, data);
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      data.$container.off(Events.namespace)
        .fsTouch("destroy");

      data.$track.remove();
      data.$labels.remove();

      this.unwrap()
        .removeClass(RawClasses.element)
        .off(Events.namespace);

      cacheInstances();
    }

    /**
     * @method
     * @name enable
     * @description Enables target instance
     * @example $(".target").range("enable");
     */

    function enable(data) {
      if (data.disabled) {
        this.prop("disabled", false);

        data.$container.removeClass(RawClasses.disabled);

        data.disabled = false;
      }
    }

    /**
     * @method
     * @name disable
     * @description Disables target instance
     * @example $(".target").range("disable");
     */

    function disable(data) {
      if (!data.disabled) {
        this.prop("disabled", true);

        data.$container.addClass(RawClasses.disabled);

        data.disabled = true;
      }
    }

    /**
     * @method
     * @name update
     * @description Updates instance.
     * @example $(".target").range("update");
     */

    function updateInstance(data) {
      data.min = parseFloat(data.$el.attr("min")) || 0;
      data.max = parseFloat(data.$el.attr("max")) || 100;
      data.step = parseFloat(data.$el.attr("step")) || 1;
      data.digits = data.step.toString().length - data.step.toString().indexOf(".");
      data.value = parseFloat(this.val()) || (data.min + ((data.max - data.min) / 2));

      if (data.labels) {
        data.$labels.filter(Classes.label_max).html(data.formatter.call(this, (data.labels.max) ? data.labels.max : data.max));
        data.$labels.filter(Classes.label_min).html(data.formatter.call(this, (data.labels.max) ? data.labels.min : data.min));
      }

      resizeInstance.call(this, data);
    }

    /**
     * @method
     * @name resize
     * @description Resizes instance
     * @example $(".target").range("resize");
     */

    /**
     * @method private
     * @name resizeInstance
     * @description Resizes each instance
     * @param data [object] "Instance data"
     */

    function resizeInstance(data) {
      data.stepCount = (data.max - data.min) / data.step;
      data.offset = data.$track.offset();

      if (data.vertical) {
        data.trackHeight = data.$track.outerHeight();
        data.handleHeight = data.$handle.outerHeight();
        data.increment = data.trackHeight / data.stepCount;
      } else {
        data.trackWidth = data.$track.outerWidth();
        data.handleWidth = data.$handle.outerWidth();
        data.increment = data.trackWidth / data.stepCount;
      }

      var percent = (data.$el.val() - data.min) / (data.max - data.min);

      position(data, percent, true); // isResize
    }

    /**
     * @method private
     * @name onTrackDown
     * @description Handles panstart event to track
     * @param e [object] "Event data"
     */

    function onPanStart(e) {
      Functions.killEvent(e);

      var data = e.data;

      if (!data.disabled) {
        resizeInstance(data);
        onPan(e);

        data.$container.addClass(RawClasses.focus);
      }
    }

    /**
     * @method private
     * @name onPan
     * @description Handles pan event
     * @param e [object] "Event data"
     */

    function onPan(e) {
      Functions.killEvent();

      var data = e.data,
        percent = 0;

      if (!data.disabled) {
        if (data.vertical) {
          percent = 1 - (e.pageY - data.offset.top) / data.trackHeight;
        } else {
          percent = (e.pageX - data.offset.left) / data.trackWidth;
        }

        position(data, percent);
      }
    }

    /**
     * @method private
     * @name onPanEnd
     * @description Handles panend event
     * @param e [object] "Event data"
     */

    function onPanEnd(e) {
      Functions.killEvent(e);

      var data = e.data;

      if (!data.disabled) {
        data.$container.removeClass(RawClasses.focus);
      }
    }

    /**
     * @method private
     * @name onFocus
     * @description Handles instance focus
     * @param e [object] "Event data"
     */

    function onFocus(e) {
      e.data.$container.addClass(RawClasses.focus);
    }

    /**
     * @method private
     * @name onBlur
     * @description Handles instance blur
     * @param e [object] "Event data"
     */

    function onBlur(e) {
      e.data.$container.removeClass(RawClasses.focus);
    }

    /**
     * @method private
     * @name position
     * @description Positions handle
     * @param data [object] "Instance Data"
     * @param perc [number] "Position precentage"
     * @param isResize [boolean] "Called from resize"
     */

    function position(data, perc, isResize) {
      if (data.increment > 1) {
        if (data.vertical) {
          perc = (Math.round(perc * data.stepCount) * data.increment) / data.trackHeight;
        } else {
          perc = (Math.round(perc * data.stepCount) * data.increment) / data.trackWidth;
        }
      }

      if (perc < 0) {
        perc = 0;
      }
      if (perc > 1) {
        perc = 1;
      }

      var value = ((data.min - data.max) * perc);
      value = -parseFloat(value.toFixed(data.digits));

      data.$fill.css((data.vertical) ? "height" : "width", (perc * 100) + "%");
      data.$handle.css((data.vertical) ? "bottom" : "left", (perc * 100) + "%");
      /* .attr("aria-valuenow", value) */
      value += data.min;

      if (value !== data.value && value !== false && isResize !== true) {
        data.$el.val(value)
          .trigger(Events.raw.change, [true]);

        data.value = value;
      }
    }

    /**
     * @method private
     * @name onChange
     * @description Handles change events
     * @param e [object] "Event data"
     * @param internal [boolean] "Flag for internal change"
     */

    function onChange(e, internal) {
      var data = e.data;

      if (!internal && !data.disabled) {
        var percent = (data.$el.val() - data.min) / (data.max - data.min);

        position(data, percent);
      }
    }

    /**
     * @method private
     * @name formatNumber
     * @description Formats provided number
     * @param number [number] "Number to format"
     */

    function formatNumber(number) {
      var parts = number.toString().split(".");

      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return parts.join(".");
    }

    /**
     * @plugin
     * @name Range
     * @description A jQuery plugin for cross browser range inputs.
     * @type widget
     * @main range.js
     * @main range.css
     * @dependency jQuery
     * @dependency core.js
     * @dependency touch.js
     */

    var Plugin = Formstone.Plugin("range", {
        widget: true,

        /**
         * @options
         * @param customClass [string] <''> "Class applied to instance"
         * @param fill [boolean] <false> "Flag to draw fill"
         * @param formatter [function] <false> "Value format function"
         * @param labels [boolean] <true> "Flag to draw labels"
         * @param labels.max [string] "Max value label; defaults to max value"
         * @param labels.min [string] "Min value label; defaults to min value"
         * @param theme [string] <"fs-light"> "Theme class name"
         * @param vertical [boolean] <false> "Flag to render vertical range; Deprecated use 'orientation' attribute instead
         */

        defaults: {
          customClass: "",
          fill: false,
          formatter: false,
          labels: {
            max: false,
            min: false
          },
          theme: "fs-light",
          vertical: false
        },

        classes: [
          "track",
          "handle",
          "fill",
          "marker",
          "labels",
          "label",
          "label_min",
          "label_max",
          "vertical",
          "focus",
          "disabled"
        ],

        methods: {
          _construct: construct,
          _destruct: destruct,
          _resize: resize,

          // Public Methods

          enable: enable,
          disable: disable,
          resize: resizeInstance,
          update: updateInstance
        }
      }),

      // Localize References

      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions,

      $Instances = [];

  })

);
