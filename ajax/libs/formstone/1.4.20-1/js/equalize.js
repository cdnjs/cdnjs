/*! formstone v1.4.20-1 [equalize.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core",
        "./mediaquery"
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
     * @param data [object] "Instance Data"
     */

    function construct(data) {
      data.maxWidth = (data.maxWidth === Infinity ? "100000px" : data.maxWidth);
      data.mq = "(min-width:" + data.minWidth + ") and (max-width:" + data.maxWidth + ")";
      data.type = (data.property === "height") ? "outerHeight" : "outerWidth";

      if (data.target) {
        if (!$.isArray(data.target)) {
          data.target = [data.target];
        }
      } else {
        data.target = ["> *"];
      }

      cacheInstances();

      $.fsMediaquery("bind", data.rawGuid, data.mq, {
        enter: function() {
          enable.call(data.$el, data);
        },
        leave: function() {
          disable.call(data.$el, data);
        }
      });
    }

    /**
     * @method private
     * @name destruct
     * @description Tears down instance.
     * @param data [object] "Instance data"
     */

    function destruct(data) {
      tearDown(data);

      $.fsMediaquery("unbind", data.rawGuid);

      cacheInstances();
    }

    /**
     * @method
     * @name resize
     * @description Resizes instance
     * @example $(".target").equalize("resize");
     */

    /**
     * @method private
     * @name resizeInstance
     * @description Handle window resize event
     * @param data [object] "Instance data"
     */

    function resizeInstance(data) {
      if (data.data) {
        data = data.data; // normalize image resize events
      }

      if (data.enabled) {
        var value,
          check,
          $target;

        for (var i = 0; i < data.target.length; i++) {
          value = 0;
          check = 0;
          $target = data.$el.find(data.target[i]);

          $target.css(data.property, "");

          for (var j = 0; j < $target.length; j++) {
            check = $target.eq(j)[data.type]();

            if (check > value) {
              value = check;
            }
          }

          $target.css(data.property, value);
        }
      }
    }

    /**
     * @method
     * @name disable
     * @description Disables instance of plugin
     * @example $(".target").equalize("disable");
     */

    function disable(data) {
      if (data.enabled) {
        data.enabled = false;

        tearDown(data);
      }
    }

    /**
     * @method
     * @name enable
     * @description Enables instance of plugin
     * @example $(".target").equalize("enable");
     */

    function enable(data) {
      if (!data.enabled) {
        data.enabled = true;

        var $images = data.$el.find("img");

        if ($images.length) {
          $images.on(Events.load, data, resizeInstance);
        }

        resizeInstance(data);
      }
    }

    /**
     * @method private
     * @name tearDown
     * @description Removes styling from elements
     * @param data [object] "Instance data"
     */

    function tearDown(data) {
      for (var i = 0; i < data.target.length; i++) {
        data.$el.find(data.target[i]).css(data.property, "");
      }

      data.$el.find("img").off(Events.namespace);
    }

    /**
     * @plugin
     * @name Equalize
     * @description A jQuery plugin for equal dimensions.
     * @type widget
     * @main equalize.js
     * @dependency jQuery
     * @dependency core.js
     * @dependency mediaquery.js
     */

    var Plugin = Formstone.Plugin("equalize", {
        widget: true,
        priority: 5,

        /**
         * @options
         * @param maxWidth [string] <'Infinity'> "Width at which to auto-disable plugin"
         * @param minWidth [string] <'0'> "Width at which to auto-disable plugin"
         * @param property [string] <"height"> "Property to size; 'height' or 'width'"
         * @param target [string OR array] <null> "Target child selector(s); Defaults to direct descendants"
         */

        defaults: {
          maxWidth: Infinity,
          minWidth: "0px",
          property: "height",
          target: null
        },

        methods: {
          _construct: construct,
          _destruct: destruct,
          _resize: resize,

          resize: resizeInstance
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
