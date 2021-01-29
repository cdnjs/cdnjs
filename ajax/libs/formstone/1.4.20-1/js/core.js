/*! formstone v1.4.20-1 [core.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/**
 * @plugin
 * @name Core
 * @description Formstone Library core. Required for all plugins.
 */

/* global define */
/* global ga */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define(["jquery"], factory);
    } else {
      factory(jQuery);
    }
  }(function($) {

    "use strict";

    // Namespace

    var Win = typeof window !== "undefined" ? window : this,
      Doc = Win.document,
      Core = function() {
        this.Version = '1.4.20-1';
        this.Plugins = {};

        this.DontConflict = false;
        this.Conflicts = {
          fn: {}
        };
        this.ResizeHandlers = [];
        this.RAFHandlers = [];

        // Globals

        this.window = Win;
        this.$window = $(Win);
        this.document = Doc;
        this.$document = $(Doc);
        this.$body = null;

        this.windowWidth = 0;
        this.windowHeight = 0;
        this.fallbackWidth = 1024;
        this.fallbackHeight = 768;
        this.userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
        this.isFirefox = /Firefox/i.test(this.userAgent);
        this.isChrome = /Chrome/i.test(this.userAgent);
        this.isSafari = /Safari/i.test(this.userAgent) && !this.isChrome;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(this.userAgent);
        this.isIEMobile = /IEMobile/i.test(this.userAgent);
        this.isFirefoxMobile = (this.isFirefox && this.isMobile);
        this.transform = null;
        this.transition = null;

        this.support = {
          file: !!(window.File && window.FileList && window.FileReader),
          history: !!(window.history && window.history.pushState && window.history.replaceState),
          matchMedia: !!(window.matchMedia || window.msMatchMedia),
          pointer: !!(window.PointerEvent),
          raf: !!(window.requestAnimationFrame && window.cancelAnimationFrame),
          touch: !!(("ontouchstart" in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
          transition: false,
          transform: false
        };
      },

      Functions = {

        /**
         * @method private
         * @name killEvent
         * @description Stops event action and bubble.
         * @param e [object] "Event data"
         */

        killEvent: function(e, immediate) {
          try {
            e.preventDefault();
            e.stopPropagation();

            if (immediate) {
              e.stopImmediatePropagation();
            }
          } catch (error) {
            //
          }
        },

        /**
         * @method private
         * @name killGesture
         * @description Stops gesture event action.
         * @param e [object] "Event data"
         */

        killGesture: function(e) {
          try {
            e.preventDefault();
          } catch (error) {
            //
          }
        },

        /**
         * @method private
         * @name lockViewport
         * @description Unlocks the viewport, preventing getsures.
         */

        lockViewport: function(plugin_namespace) {
          ViewportLocks[plugin_namespace] = true;

          if (!$.isEmptyObject(ViewportLocks) && !ViewportLocked) {
            if ($ViewportMeta.length) {
              $ViewportMeta.attr("content", ViewportMetaLocked);
            } else {
              $ViewportMeta = $("head").append('<meta name="viewport" content="' + ViewportMetaLocked + '">');
            }

            Formstone.$body.on(Events.gestureChange, Functions.killGesture)
              .on(Events.gestureStart, Functions.killGesture)
              .on(Events.gestureEnd, Functions.killGesture);

            ViewportLocked = true;
          }
        },

        /**
         * @method private
         * @name unlockViewport
         * @description Unlocks the viewport, allowing getsures.
         */

        unlockViewport: function(plugin_namespace) {
          if (typeof ViewportLocks[plugin_namespace] !== 'undefined') {
            delete ViewportLocks[plugin_namespace];
          }

          if ($.isEmptyObject(ViewportLocks) && ViewportLocked) {
            if ($ViewportMeta.length) {
              if (ViewportMetaOriginal) {
                $ViewportMeta.attr("content", ViewportMetaOriginal);
              } else {
                $ViewportMeta.remove();
              }
            }

            Formstone.$body.off(Events.gestureChange)
              .off(Events.gestureStart)
              .off(Events.gestureEnd);

            ViewportLocked = false;
          }
        },

        /**
         * @method private
         * @name startTimer
         * @description Starts an internal timer.
         * @param timer [int] "Timer ID"
         * @param time [int] "Time until execution"
         * @param callback [function] "Function to execute"
         * @return [int] "Timer ID"
         */

        startTimer: function(timer, time, callback, interval) {
          Functions.clearTimer(timer);

          return (interval) ? setInterval(callback, time) : setTimeout(callback, time);
        },

        /**
         * @method private
         * @name clearTimer
         * @description Clears an internal timer.
         * @param timer [int] "Timer ID"
         */

        clearTimer: function(timer, interval) {
          if (timer) {
            if (interval) {
              clearInterval(timer);
            } else {
              clearTimeout(timer);
            }

            timer = null;
          }
        },

        /**
         * @method private
         * @name sortAsc
         * @description Sorts an array (ascending).
         * @param a [mixed] "First value"
         * @param b [mixed] "Second value"
         * @return Difference between second and first values
         */

        sortAsc: function(a, b) {
          return (parseInt(a, 10) - parseInt(b, 10));
        },

        /**
         * @method private
         * @name sortDesc
         * @description Sorts an array (descending).
         * @param a [mixed] "First value"
         * @param b [mixed] "Second value"
         * @return Difference between second and first values
         */

        sortDesc: function(a, b) {
          return (parseInt(b, 10) - parseInt(a, 10));
        },

        /**
         * @method private
         * @name decodeEntities
         * @description Decodes HTML.
         * @param string [string] "String to decode"
         * @return Decoded string
         */

        decodeEntities: function(string) {
          // http://stackoverflow.com/a/1395954
          var el = Formstone.document.createElement("textarea");
          el.innerHTML = string;

          return el.value;
        },

        /**
         * @method private
         * @name parseGetParams
         * @description Returns keyed object containing all GET query parameters
         * @param url [string] "URL to parse"
         * @return [object] "Keyed query params"
         */

        parseQueryString: function(url) {
          var params = {},
            parts = url.slice(url.indexOf("?") + 1).split("&");

          for (var i = 0; i < parts.length; i++) {
            var part = parts[i].split("=");
            params[part[0]] = part[1];
          }

          return params;
        }
      },

      Formstone = new Core(),

      // Deferred ready

      $Ready = $.Deferred(),

      // Classes

      Classes = {
        base: "{ns}",
        element: "{ns}-element"
      },

      // Events

      Events = {
        namespace: ".{ns}",
        beforeUnload: "beforeunload.{ns}",
        blur: "blur.{ns}",
        change: "change.{ns}",
        click: "click.{ns}",
        dblClick: "dblclick.{ns}",
        drag: "drag.{ns}",
        dragEnd: "dragend.{ns}",
        dragEnter: "dragenter.{ns}",
        dragLeave: "dragleave.{ns}",
        dragOver: "dragover.{ns}",
        dragStart: "dragstart.{ns}",
        drop: "drop.{ns}",
        error: "error.{ns}",
        focus: "focus.{ns}",
        focusIn: "focusin.{ns}",
        focusOut: "focusout.{ns}",
        gestureChange: "gesturechange.{ns}",
        gestureStart: "gesturestart.{ns}",
        gestureEnd: "gestureend.{ns}",
        input: "input.{ns}",
        keyDown: "keydown.{ns}",
        keyPress: "keypress.{ns}",
        keyUp: "keyup.{ns}",
        load: "load.{ns}",
        mouseDown: "mousedown.{ns}",
        mouseEnter: "mouseenter.{ns}",
        mouseLeave: "mouseleave.{ns}",
        mouseMove: "mousemove.{ns}",
        mouseOut: "mouseout.{ns}",
        mouseOver: "mouseover.{ns}",
        mouseUp: "mouseup.{ns}",
        panStart: "panstart.{ns}",
        pan: "pan.{ns}",
        panEnd: "panend.{ns}",
        resize: "resize.{ns}",
        scaleStart: "scalestart.{ns}",
        scaleEnd: "scaleend.{ns}",
        scale: "scale.{ns}",
        scroll: "scroll.{ns}",
        select: "select.{ns}",
        swipe: "swipe.{ns}",
        touchCancel: "touchcancel.{ns}",
        touchEnd: "touchend.{ns}",
        touchLeave: "touchleave.{ns}",
        touchMove: "touchmove.{ns}",
        touchStart: "touchstart.{ns}"
      },

      ResizeTimer = null,
      Debounce = 20,

      $ViewportMeta,
      ViewportMetaOriginal,
      ViewportMetaLocked,
      ViewportLocks = [],
      ViewportLocked = false;

    /**
     * @method
     * @name NoConflict
     * @description Resolves plugin namespace conflicts
     * @example Formstone.NoConflict();
     */

    Core.prototype.NoConflict = function() {
      Formstone.DontConflict = true;

      for (var i in Formstone.Plugins) {
        if (Formstone.Plugins.hasOwnProperty(i)) {
          $[i] = Formstone.Conflicts[i];
          $.fn[i] = Formstone.Conflicts.fn[i];
        }
      }
    };

    /**
     * @method
     * @name Ready
     * @description Replacement for jQuery ready
     * @param e [object] "Event data"
     */

    Core.prototype.Ready = function(fn) {
      if (
        Formstone.document.readyState === "complete" ||
        (Formstone.document.readyState !== "loading" && !Formstone.document.documentElement.doScroll)
      ) {
        fn();
      } else {
        Formstone.document.addEventListener("DOMContentLoaded", fn);
      }
    };

    /**
     * @method
     * @name Plugin
     * @description Builds a plugin and registers it with jQuery.
     * @param namespace [string] "Plugin namespace"
     * @param settings [object] "Plugin settings"
     * @return [object] "Plugin properties. Includes `defaults`, `classes`, `events`, `functions`, `methods` and `utilities` keys"
     * @example Formstone.Plugin("namespace", { ... });
     */

    Core.prototype.Plugin = function(namespace, settings) {
      Formstone.Plugins[namespace] = (function(namespace, settings) {

        var namespaceDash = "fs-" + namespace,
          namespaceDot = "fs." + namespace,
          namespaceClean = "fs" + namespace.replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
            return p1 + p2.toUpperCase();
          });

        /**
         * @method private
         * @name initialize
         * @description Creates plugin instance by adding base classname, creating data and scoping a _construct call.
         * @param options [object] <{}> "Instance options"
         */

        function initialize(options) {
          // Maintain Chain

          var hasOptions = (typeof options === "object"),
            args = Array.prototype.slice.call(arguments, (hasOptions ? 1 : 0)),
            $targets = this,
            $postTargets = $(),
            $element,
            i,
            count;

          // Extend Defaults

          options = $.extend(true, {}, settings.defaults || {}, (hasOptions ? options : {}));

          // All targets

          for (i = 0, count = $targets.length; i < count; i++) {
            $element = $targets.eq(i);

            // Gaurd Against Exiting Instances

            if (!getData($element)) {

              // Extend w/ Local Options

              settings.guid++;

              var guid = "__" + settings.guid,
                rawGuid = settings.classes.raw.base + guid,
                locals = $element.data(namespace + "-options"),
                data = $.extend(true, {
                  $el: $element,
                  guid: guid,
                  numGuid: settings.guid,
                  rawGuid: rawGuid,
                  dotGuid: "." + rawGuid
                }, options, (typeof locals === "object" ? locals : {}));

              // Cache Instance

              $element.addClass(settings.classes.raw.element)
                .data(namespaceClean, data);

              // Constructor

              settings.methods._construct.apply($element, [data].concat(args));

              // Post Constructor

              $postTargets = $postTargets.add($element);
            }

          }

          // Post targets

          for (i = 0, count = $postTargets.length; i < count; i++) {
            $element = $postTargets.eq(i);

            // Post Constructor

            settings.methods._postConstruct.apply($element, [getData($element)]);
          }

          return $targets;
        }

        /**
         * @method private
         * @name destroy
         * @description Removes plugin instance by scoping a _destruct call, and removing the base classname and data.
         * @param data [object] <{}> "Instance data"
         */

        /**
         * @method widget
         * @name destroy
         * @description Removes plugin instance.
         * @example $(".target").{ns}("destroy");
         */

        function destroy(data) {
          settings.functions.iterate.apply(this, [settings.methods._destruct].concat(Array.prototype.slice.call(arguments, 1)));

          this.removeClass(settings.classes.raw.element)
            .removeData(namespaceClean);
        }

        /**
         * @method private
         * @name getData
         * @description Creates class selector from text.
         * @param $element [jQuery] "Target jQuery object"
         * @return [object] "Instance data"
         */

        function getData($el) {
          return $el.data(namespaceClean);
        }

        /**
         * @method private
         * @name delegateWidget
         * @description Delegates public methods.
         * @param method [string] "Method to execute"
         * @return [jQuery] "jQuery object"
         */

        function delegateWidget(method) {

          // If jQuery object

          if (this instanceof $) {

            var _method = settings.methods[method];

            // Public method OR false

            if (typeof method === "object" || !method) {

              // Initialize

              return initialize.apply(this, arguments);
            } else if (_method && method.indexOf("_") !== 0) {

              // Wrap Public Methods

              var args = [_method].concat(Array.prototype.slice.call(arguments, 1));

              return settings.functions.iterate.apply(this, args);
            }

            return this;
          }
        }

        /**
         * @method private
         * @name delegateUtility
         * @description Delegates utility methods.
         * @param method [string] "Method to execute"
         */

        function delegateUtility(method) {

          // public utility OR utility init OR false

          var _method = settings.utilities[method] || settings.utilities._initialize || false;

          if (_method) {

            // Wrap Utility Methods

            var args = Array.prototype.slice.call(arguments, (typeof method === "object" ? 0 : 1));

            return _method.apply(window, args);
          }
        }

        /**
         * @method utility
         * @name defaults
         * @description Extends plugin default settings; effects instances created hereafter.
         * @param options [object] <{}> "New plugin defaults"
         * @example $.{ns}("defaults", { ... });
         */

        function defaults(options) {
          settings.defaults = $.extend(true, settings.defaults, options || {});
        }

        /**
         * @method private
         * @name iterate
         * @description Loops scoped function calls over jQuery object with instance data as first parameter.
         * @param func [function] "Function to execute"
         * @return [jQuery] "jQuery object"
         */

        function iterate(fn) {
          var $targets = this,
            args = Array.prototype.slice.call(arguments, 1);

          for (var i = 0, count = $targets.length; i < count; i++) {
            var $element = $targets.eq(i),
              data = getData($element) || {};

            if (typeof data.$el !== "undefined") {
              fn.apply($element, [data].concat(args));
            }
          }

          return $targets;
        }

        // Locals

        settings.initialized = false;
        settings.priority = settings.priority || 10;

        // Namespace Classes & Events

        settings.classes = namespaceProperties("classes", namespaceDash, Classes, settings.classes);
        settings.events = namespaceProperties("events", namespace, Events, settings.events);

        // Extend Functions

        settings.functions = $.extend({
          getData: getData,
          iterate: iterate
        }, Functions, settings.functions);

        // Extend Methods

        settings.methods = $.extend(true, {

          // Private Methods

          _construct: $.noop, // Constructor
          _postConstruct: $.noop, // Post Constructor
          _destruct: $.noop, // Destructor
          _resize: false, // Window resize

          // Public Methods

          destroy: destroy

        }, settings.methods);

        // Extend Utilities

        settings.utilities = $.extend(true, {

          // Private Utilities

          _initialize: false, // First Run
          _delegate: false, // Custom Delegation

          // Public Utilities

          defaults: defaults

        }, settings.utilities);

        // Register Plugin

        // Widget

        if (settings.widget) {

          // Store conflicting namesapaces
          Formstone.Conflicts.fn[namespace] = $.fn[namespace];

          // Widget Delegation: $(".target").fsPlugin("method", ...);
          $.fn[namespaceClean] = delegateWidget;

          if (!Formstone.DontConflict) {

            // $(".target").plugin("method", ...);
            $.fn[namespace] = $.fn[namespaceClean];
          }
        }

        // Utility

        Formstone.Conflicts[namespace] = $[namespace];

        // Utility Delegation: $.fsPlugin("method", ... );
        $[namespaceClean] = settings.utilities._delegate || delegateUtility;

        if (!Formstone.DontConflict) {

          // $.plugin("method", ... );
          $[namespace] = $[namespaceClean];
        }

        // Run Setup

        settings.namespace = namespace;
        settings.namespaceClean = namespaceClean;

        settings.guid = 0;

        // Resize handler

        if (settings.methods._resize) {
          Formstone.ResizeHandlers.push({
            namespace: namespace,
            priority: settings.priority,
            callback: settings.methods._resize
          });

          // Sort handlers on push
          Formstone.ResizeHandlers.sort(sortPriority);
        }

        // RAF handler

        if (settings.methods._raf) {
          Formstone.RAFHandlers.push({
            namespace: namespace,
            priority: settings.priority,
            callback: settings.methods._raf
          });

          // Sort handlers on push
          Formstone.RAFHandlers.sort(sortPriority);
        }

        return settings;
      })(namespace, settings);

      return Formstone.Plugins[namespace];
    };

    // Namespace Properties

    function namespaceProperties(type, namespace, globalProps, customProps) {
      var _props = {
          raw: {}
        },
        i;

      customProps = customProps || {};

      for (i in customProps) {
        if (customProps.hasOwnProperty(i)) {
          if (type === "classes") {

            // Custom classes
            _props.raw[customProps[i]] = namespace + "-" + customProps[i];
            _props[customProps[i]] = "." + namespace + "-" + customProps[i];
          } else {
            // Custom events
            _props.raw[i] = customProps[i];
            _props[i] = customProps[i] + "." + namespace;
          }
        }
      }

      for (i in globalProps) {
        if (globalProps.hasOwnProperty(i)) {
          if (type === "classes") {

            // Global classes
            _props.raw[i] = globalProps[i].replace(/{ns}/g, namespace);
            _props[i] = globalProps[i].replace(/{ns}/g, "." + namespace);
          } else {
            // Global events
            _props.raw[i] = globalProps[i].replace(/.{ns}/g, "");
            _props[i] = globalProps[i].replace(/{ns}/g, namespace);
          }
        }
      }

      return _props;
    }

    // Set Browser Prefixes

    function setBrowserPrefixes() {
      var transitionEvents = {
          "WebkitTransition": "webkitTransitionEnd",
          "MozTransition": "transitionend",
          "OTransition": "otransitionend",
          "transition": "transitionend"
        },
        transitionProperties = [
          "transition",
          "-webkit-transition"
        ],
        transformProperties = {
          'transform': 'transform',
          'MozTransform': '-moz-transform',
          'OTransform': '-o-transform',
          'msTransform': '-ms-transform',
          'webkitTransform': '-webkit-transform'
        },
        transitionEvent = "transitionend",
        transitionProperty = "",
        transformProperty = "",
        testDiv = document.createElement("div"),
        i;

      for (i in transitionEvents) {
        if (transitionEvents.hasOwnProperty(i) && i in testDiv.style) {
          transitionEvent = transitionEvents[i];
          Formstone.support.transition = true;
          break;
        }
      }

      Events.transitionEnd = transitionEvent + ".{ns}";

      for (i in transitionProperties) {
        if (transitionProperties.hasOwnProperty(i) && transitionProperties[i] in testDiv.style) {
          transitionProperty = transitionProperties[i];
          break;
        }
      }

      Formstone.transition = transitionProperty;

      for (i in transformProperties) {
        if (transformProperties.hasOwnProperty(i) && transformProperties[i] in testDiv.style) {
          Formstone.support.transform = true;
          transformProperty = transformProperties[i];
          break;
        }
      }

      Formstone.transform = transformProperty;
    }

    // Window resize

    function onWindowResize() {
      Formstone.windowWidth = Formstone.$window.width();
      Formstone.windowHeight = Formstone.$window.height();

      ResizeTimer = Functions.startTimer(ResizeTimer, Debounce, handleWindowResize);
    }

    function handleWindowResize() {
      for (var i in Formstone.ResizeHandlers) {
        if (Formstone.ResizeHandlers.hasOwnProperty(i)) {
          Formstone.ResizeHandlers[i].callback.call(window, Formstone.windowWidth, Formstone.windowHeight);
        }
      }
    }

    Formstone.$window.on("resize.fs", onWindowResize);
    onWindowResize();

    // RAF

    function handleRAF() {
      if (Formstone.support.raf) {
        Formstone.window.requestAnimationFrame(handleRAF);

        for (var i in Formstone.RAFHandlers) {
          if (Formstone.RAFHandlers.hasOwnProperty(i)) {
            Formstone.RAFHandlers[i].callback.call(window);
          }
        }
      }
    }

    handleRAF();

    // Sort Priority

    function sortPriority(a, b) {
      return (parseInt(a.priority) - parseInt(b.priority));
    }

    // Document Ready

    Formstone.Ready(function() {
      Formstone.$body = $("body");

      $("html").addClass( (Formstone.support.touch) ? "touchevents" : "no-touchevents" );

      // Viewport
      $ViewportMeta = $('meta[name="viewport"]');
      ViewportMetaOriginal = ($ViewportMeta.length) ? $ViewportMeta.attr("content") : false;
      ViewportMetaLocked = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';

      $Ready.resolve();
    });

    // Custom Events

    Events.clickTouchStart = Events.click + " " + Events.touchStart;

    // Browser Prefixes

    setBrowserPrefixes();

    window.Formstone = Formstone;

    return Formstone;

  })

);
