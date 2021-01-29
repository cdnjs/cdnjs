/*! formstone v1.4.20-1 [number.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core"
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
     * @name construct
     * @description Builds instance.
     * @param data [object] "Instance data"
     */

    function construct(data) {
      var min = parseFloat(this.attr("min")),
        max = parseFloat(this.attr("max"));

      // Mask as text

      data.min = (min || min === 0) ? min : false;
      data.max = (max || max === 0) ? max : false;
      data.step = parseFloat(this.attr("step")) || 1;
      data.timer = null;
      data.digits = significantDigits(data.step);
      data.disabled = this.is(":disabled") || this.is("[readonly]");

      var html = "";
      html += '<button type="button" class="' + [RawClasses.arrow, RawClasses.up].join(" ") + '" aria-hidden="true" tabindex="-1">' + data.labels.up + '</button>';
      html += '<button type="button" class="' + [RawClasses.arrow, RawClasses.down].join(" ") + '" aria-hidden="true" tabindex="-1">' + data.labels.down + '</button>';

      // Modify DOM
      this.wrap('<div class="' + [RawClasses.base, data.theme, data.customClass, (data.disabled) ? RawClasses.disabled : ""].join(" ") + '"></div>')
        .after(html);

      // Store data
      data.$container = this.parent(Classes.base);
      data.$arrows = data.$container.find(Classes.arrow);

      // Bind events
      this.on(Events.focus, data, onFocus)
        .on(Events.blur, data, onBlur)
        .on(Events.keyPress, data, onKeyup);

      data.$container.on([Events.touchStart, Events.mouseDown].join(" "), Classes.arrow, data, onPointerDown);

      step(data, 0);
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      data.$arrows.remove();

      this.unwrap()
        .off(Events.namespace);
    }

    /**
     * @method
     * @name enable
     * @description Enables target instance
     * @example $(".target").number("enable");
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
     * @example $(".target").number("disable");
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
     * @example $(".target").number("update");
     */

    function updateInstance(data) {
      var min = parseFloat(data.$el.attr("min")),
        max = parseFloat(data.$el.attr("max"));

      data.min = (min || min === 0) ? min : false;
      data.max = (max || max === 0) ? max : false;
      data.step = parseFloat(data.$el.attr("step")) || 1;
      data.timer = null;
      data.digits = significantDigits(data.step);
      data.disabled = data.$el.is(":disabled") || data.$el.is("[readonly]");

      step(data, 0);
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
      step(e.data, 0);

      e.data.$container.removeClass(RawClasses.focus);
    }

    /**
     * @method private
     * @name onKeyup
     * @description Handles keypress event on inputs
     * @param e [object] "Event data"
     */

    function onKeyup(e) {
      var data = e.data;

      // If arrow keys
      if (e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();

        step(data, (e.keyCode === 38) ? data.step : -data.step);
      }
    }

    /**
     * @method private
     * @name onPointerDown
     * @description Handles pointer down event on instance arrows
     * @param e [object] "Event data"
     */

    function onPointerDown(e) {
      Functions.killEvent(e);

      // Make sure we reset the states
      onPointerUp(e);

      var data = e.data;

      if (!data.disabled && e.which <= 1) {
        var change = $(e.target).hasClass(RawClasses.up) ? data.step : -data.step;

        data.timer = Functions.startTimer(data.timer, 300, function() {

          data.timer = Functions.startTimer(data.timer, 100, function() {
            step(data, change);
          }, true);

        });

        step(data, change);

        $Body.on([Events.touchEnd, Events.mouseUp].join(" "), data, onPointerUp);
      }
    }

    /**
     * @method private
     * @name onPointerUp
     * @description Handles pointer up event on instance arrows
     * @param e [object] "Event data"
     */

    function onPointerUp(e) {
      Functions.killEvent(e);

      var data = e.data;

      Functions.clearTimer(data.timer, true);

      $Body.off(Events.namespace);
    }

    /**
     * @method private
     * @name step
     * @description Steps through values
     * @param e [object] "Event data"
     * @param change [string] "Change value"
     */

    function step(data, change) {
      var oValue = parseFloat(data.$el.val()),
        value = change;

      if (change == 0) {
        return;
      }

      if (typeof oValue === "undefined" || isNaN(oValue)) {
        if (data.min !== false) {
          value = data.min;
        } else {
          value = 0;
        }
      } else if (data.min !== false && oValue < data.min) {
        value = data.min;
      } else {
        value += oValue;
      }

      if (value !== "") {
        if (data.min !== false && value < data.min) {
          value = data.min;
        }
        if (data.max !== false && value > data.max) {
          value = data.max;
        }
      }

      if (value !== oValue || change == 0) {
        if (value !== "") {
          value = round(value, data.digits);
        }

        data.$el.val(value)
          .trigger(Events.raw.change, [true]);
      }
    }

    /**
     * @method private
     * @name significantDigits
     * @description Analyzes and returns significant digit count
     * @param value [float] "Value to analyze"
     * @return [int] "Number of significant digits"
     */
    function significantDigits(value) {
      var test = String(value);

      if (test.indexOf(".") > -1) {
        return test.length - test.indexOf(".") - 1;
      } else {
        return 0;
      }
    }

    /**
     * @method private
     * @name round
     * @description Rounds a number to a sepcific significant digit count
     * @param value [float] "Value to round"
     * @param digits [float] "Digits to round to"
     * @return [number] "Rounded number"
     */

    function round(value, digits) {
      var exp = Math.pow(10, digits);
      return Math.round(value * exp) / exp;
    }

    /**
     * @plugin
     * @name Number
     * @description A jQuery plugin for cross browser number inputs.
     * @type widget
     * @main number.js
     * @main number.css
     * @dependency jQuery
     * @dependency core.js
     */

    var Plugin = Formstone.Plugin("number", {
        widget: true,

        /**
         * @options
         * @param customClass [string] <''> "Class applied to instance"
         * @param labels.up [string] <'Up'> "Up arrow label"
         * @param labels.down [string] <'Down'> "Down arrow label"
         * @param theme [string] <"fs-light"> "Theme class name"
         */

        defaults: {
          customClass: "",
          labels: {
            up: "Up",
            down: "Down"
          },
          theme: "fs-light"
        },

        classes: [
          "arrow",
          "up",
          "down",
          "disabled",
          "focus"
        ],

        methods: {
          _construct: construct,
          _destruct: destruct,

          // Public Methods

          enable: enable,
          disable: disable,
          update: updateInstance
        }
      }),

      // Localize References

      Classes = Plugin.classes,
      RawClasses = Classes.raw,
      Events = Plugin.events,
      Functions = Plugin.functions,

      $Body = null;

    // Setup

    Formstone.Ready(setup);

  })

);
