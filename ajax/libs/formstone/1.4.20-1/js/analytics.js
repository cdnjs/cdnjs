/*! formstone v1.4.20-1 [analytics.js] 2021-01-29 | GPL-3.0 License | formstone.it */
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
     * @name setup
     * @description Setup plugin.
     */

    function setup() {
      $Body = Formstone.$body;
    }

    /**
     * @method private
     * @name setup
     * @description Setup plugin.
     */

    function resize() {
      if (Defaults.scrollDepth) {
        setScrollDepths();
      }
    }

    /**
     * @method private
     * @name delegate
     */

    function delegate() {
      if (arguments.length && typeof arguments[0] !== "object") {
        if (arguments[0] === "destroy") {
          destroy.apply(this);
        } else {
          var args = Array.prototype.slice.call(arguments, 1);

          switch (arguments[0]) {
            case "pageview":
              pushPageView.apply(this, args);
              break;
            case "event":
              pushEvent.apply(this, args);
              break;
            default:
              break;
          }
        }
      } else {
        init.apply(this, arguments);
      }

      return null;
    }

    /**
     * @method private
     * @name init
     * @description Initializes plugin
     * @param opts [object] "Initialization options"
     */

    function init(options) {
      // Attach Analytics events
      if (!Initialized && $Body && $Body.length) {
        Initialized = true;

        Defaults = $.extend(Defaults, options || {});

        if (Defaults.autoEvents) {
          $Body.find("a").not("[" + DataKeyFull + "]").each(buildEvent);
        }

        if (Defaults.scrollDepth) {
          setScrollDepths();
          $Window.on(Events.scroll, trackScroll)
            .one(Events.load, resize);
        }

        $Body.on(Events.click, "*[" + DataKeyFull + "]", trackEvent);
      }
    }

    /**
     * @method private
     * @name destroy
     * @description Destroys plugin
     */

    function destroy() {
      if (Initialized && $Body && $Body.length) {
        $Window.off(Events.namespace);
        $Body.off(Events.namespace);

        Initialized = false;
      }
    }

    /**
     * @method private
     * @name buildEvent
     * @description Build events for email, phone, file types & external links
     */

    function buildEvent() {
      var $target = $(this),
        href = (typeof $target[0].href !== "undefined") ? $target[0].href : "",
        domain = document.domain.split(".").reverse(),
        internal = href.match(domain[1] + "." + domain[0]) !== null,
        eventData;

      if (href.match(/^mailto\:/i)) {
        // Email
        eventData = "Email, Click, " + href.replace(/^mailto\:/i, "");
      } else if (href.match(/^tel\:/i)) {
        // Action
        eventData = "Telephone, Click, " + href.replace(/^tel\:/i, "");
      } else if (href.match(Defaults.fileTypes)) {
        // Files
        var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
        eventData = "File, Download:" + extension[0] + ", " + href.replace(/ /g, "-");
      } else if (!internal) {
        // External Link
        eventData = "ExternalLink, Click, " + href;
      }

      if (eventData) {
        $target.attr(DataKeyFull, eventData);
      }
    }

    /**
     * @method private
     * @name trackScroll
     * @description Debounces scroll tracking
     */

    function trackScroll(e) {
      Functions.startTimer(ScrollTimer, 250, doTrackScroll);
    }

    /**
     * @method private
     * @name doTrackScroll
     * @description Handle scroll tracking
     */

    function doTrackScroll() {
      var scrollTop = $Window.scrollTop() + Formstone.windowHeight,
        step = (1 / Defaults.scrollStops),
        depth = step,
        key;

      for (var i = 1; i <= Defaults.scrollStops; i++) {
        key = (Math.round(100 * depth)).toString();

        if (!ScrollDepths[ScrollWidth][key].passed && scrollTop > ScrollDepths[ScrollWidth][key].edge) {
          ScrollDepths[ScrollWidth][key].passed = true;

          // Push data
          var eventData = $.extend(Defaults.scrollFields, {
            eventCategory: "ScrollDepth",
            eventAction: ScrollWidth,
            eventLabel: key,
            nonInteraction: true
          });

          pushEvent(eventData);
        }

        depth += step;
      }
    }

    /**
     * @method private
     * @name setScrollDepths
     * @description Sets scroll depths at specific widths
     */

    function setScrollDepths() {
      var mqState = $.mediaquery("state"),
        bodyHeight = $Body.outerHeight(),
        newDepths = {},
        step = (1 / Defaults.scrollStops),
        depth = step,
        top = 0,
        key;

      if (mqState.minWidth) {
        ScrollWidth = "MinWidth:" + mqState.minWidth + "px";
      }

      for (var i = 1; i <= Defaults.scrollStops; i++) {
        top = parseInt(bodyHeight * depth);
        key = (Math.round(100 * depth)).toString();

        newDepths[key] = {
          edge: (key === "100") ? top - 10 : top,
          passsed: (ScrollDepths[ScrollWidth] && ScrollDepths[ScrollWidth][key]) ? ScrollDepths[ScrollWidth][key].passed : false
        };

        depth += step;
      }

      ScrollDepths[ScrollWidth] = newDepths;
    }

    /**
     * @method private
     * @name trackEvent
     * @description Tracks event
     * @param e [object] "Event data"
     */

    function trackEvent(e) {
      var $target = $(this),
        url = $target.attr("href"),
        data = $target.data(DataKey).split(",");

      if (Defaults.eventCallback) {
        e.preventDefault();
      }

      // Trim data
      for (var i in data) {
        if (data.hasOwnProperty(i)) {
          data[i] = $.trim(data[i]);
        }
      }

      // Push data
      pushEvent({
        eventCategory: data[0],
        eventAction: data[1],
        eventLabel: (data[2] || url),
        eventValue: data[3],
        nonInteraction: data[4],
      }, $target);
    }

    /**
     * @method private
     * @name pushEvent
     * @description Push event to Universal Analytics
     */

    function pushEvent(data, $target) {
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
      var loc = Window.location,
        evt = $.extend({
          hitType: "event"
        }, data);

      // If active link, launch that ish!
      if (typeof $target !== "undefined" && !$target.attr("data-analytics-stop")) {
        var href = (typeof $target[0].href !== "undefined") ? $target[0].href : "",
          url = (!href.match(/^mailto\:/i) && !href.match(/^tel\:/i) && href.indexOf(":") < 0) ? Window.location.protocol + "//" + Window.location.hostname + "/" + href : href;

        if (url !== "") {
          // Check Window target
          var target = $target.attr("target");
          if (target) {
            Window.open(url, target);
          } else if (Defaults.eventCallback) {
            var callbackType = "hitCallback"; // GUA ? "hitCallback" : "eventCallback";

            evt[callbackType] = function() {
              if (LinkTimer) {
                Functions.clearTimer(LinkTimer);

                openURL(url);
              }
            };

            // Event timeout
            LinkTimer = Functions.startTimer(LinkTimer, Defaults.eventTimeout, evt[callbackType]);
          }
        }
      }

      push(evt);
    }

    /**
     * @method private
     * @name pushPageView
     * @description Push page view to Universal Analytics
     */

    function pushPageView(data) {
      var pageView = $.extend({
        hitType: "pageview"
      }, data);

      push(pageView);
    }

    /**
     * @method private
     * @name push
     * @description Push data to Universal Analytics
     */

    function push(data) {
      if (typeof Window.ga === "function" && typeof Window.ga.getAll === "function") {
        var trackers = Window.ga.getAll();

        for (var i = 0, count = trackers.length; i < count; i++) {
          Window.ga(trackers[i].get("name") + ".send", data);
        }
      }
    }

    /**
     * @method private
     * @name openURL
     * @description Launch a url
     */
    function openURL(url) {
      document.location = url;
    }

    /**
     * @plugin
     * @name Analytics
     * @description A jQuery plugin for Google Universal Analytics Events.
     * @type utility
     * @main analytics.js
     * @dependency jQuery
     * @dependency core.js
     * @dependency mediaquery.js
     */

    var Plugin = Formstone.Plugin("analytics", {
        methods: {
          _resize: resize
        },
        utilities: {
          _delegate: delegate
        }
      }),

      /**
       * @options
       * @param autoEvents [boolean] <false> "Flag to bind auto-events to mailto, tel, files and external links"
       * @param fileTypes [regex] <> "File types for binding auto-events"
       * @param eventCallback [boolean] <false> "Flag to use event callbacks when navigating"
       * @param eventTimeout [int] <1000> "Event failure timeout"
       * @param scrollDepth [boolean] <false> "Flag to track scroll depth events"
       * @param scrollStops [int] <5> "Number of scroll increments to track"
       * @param scrollFields [object] <{}> "Additional event fields for scroll depth events"
       */

      Defaults = {
        autoEvents: false,
        fileTypes: /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i,
        eventCallback: false,
        eventTimeout: 1000,
        scrollDepth: false,
        scrollStops: 5,
        scrollFields: {}
      },

      // Localize References

      Window = Formstone.window,
      $Window = Formstone.$window,
      $Body = null,

      Functions = Plugin.functions,
      Events = Plugin.events,

      // Internal

      Initialized = false,
      DataKey = "analytics-event",
      DataKeyFull = "data-" + DataKey,

      ScrollDepths = {},
      ScrollTimer = null,
      ScrollWidth = "Site", // default value, non-responsive
      LinkTimer = null;

    // Setup

    Formstone.Ready(setup);

  })

);
