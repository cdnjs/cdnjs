/*! formstone v1.4.20-1 [asap.js] 2021-01-29 | GPL-3.0 License | formstone.it */
/* global define */
/* global ga */

(function(factory) {
    if (typeof define === "function" && define.amd) {
      define([
        "jquery",
        "./core",
        "./analytics"
      ], factory);
    } else {
      factory(jQuery, Formstone);
    }
  }(function($, Formstone) {

    "use strict";

    /**
     * @method private
     * @name initialize
     * @description Initializes plugin.
     * @param opts [object] "Plugin options"
     */

    function initialize(options) {
      if (Instance || !Formstone.support.history) {
        return;
      }

      $Body = Formstone.$body;

      Instance = $.extend(Defaults, options);

      if (Instance.render === $.noop) {
        Instance.render = renderState;
      }

      if (Instance.transitionOut === $.noop) {
        Instance.transitionOut = function() {
          return $.Deferred().resolve();
        };
      }

      // Initial state
      if (history.state) {
        CurrentID = history.state.id;
        CurrentURL = history.state.url;
      } else {
        CurrentURL = window.location.href;

        replaceState(CurrentID, CurrentURL);
      }

      // Bind state events
      $Window.on(Events.popState, onPop);

      enable();
    }

    /**
     * @method private
     * @name disable
     * @description Disable ASAP
     * @example $.asap("enable");
     */

    function disable() {
      if ($Body && $Body.hasClass(RawClasses.base)) {
        $Body.off(Events.click)
          .removeClass(RawClasses.base);
      }
    }

    /**
     * @method private
     * @name enable
     * @description Enables ASAP
     * @example $.asap("enable");
     */

    function enable() {
      if ($Body && !$Body.hasClass(RawClasses.base)) {
        $Body.on(Events.click, Instance.selector, onClick)
          .addClass(RawClasses.base);
      }
    }

    /**
     * @method private
     * @name onClick
     * @description Handles click events
     * @param e [object] "Event data"
     */

    function onClick(e) {
      var url = e.currentTarget;

      // Ignore everything but normal click
      if (
        (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) ||
        (window.location.protocol !== url.protocol || window.location.host !== url.host) || url.target === "_blank"
      ) {
        return;
      }

      // Update state on hash change
      if (url.hash && (url.href.replace(url.hash, "") === window.location.href.replace(location.hash, "") || url.href === window.location.href + "#")) {
        return;
      }

      // Ignore certain file types
      if (url.href.match(Instance.ignoreTypes)) {
        return;
      }

      Functions.killEvent(e);
      e.stopImmediatePropagation();

      if (url.href !== CurrentURL) {
        requestURL(url.href, true);
      }
    }

    /**
     * @method private
     * @name onPop
     * @description Handles history navigation events
     * @param e [object] "Event data"
     */

    function onPop(e) {
      if (Request) {
        Request.abort();
      }

      var state = e.originalEvent.state;
      // direction = (state.id > CurrentID) ? "forward" : "back";

      if (state) {
        CurrentID = state.id;

        if (state.url !== CurrentURL) {
          requestURL(state.url, false);
        }
      }
    }

    /**
     * @method private
     * @name requestURL
     * @description Requests new content via AJAX
     * @param url [string] "URL to load"
     * @param doPush [boolean] "Flag to push to stack"
     */

    function requestURL(url, doPush) {
      if (Request) {
        Request.abort();
      }

      // Fire request event
      $Window.trigger(Events.requested, [doPush]);

      // Get transition out deferred
      Instance.transitionOutDeferred = Instance.transitionOut.apply(Window, [false]);

      var parsed = parseURL(url),
        params = parsed.params,
        hash = parsed.hash,
        cleanURL = parsed.clean,
        error = "User error",
        response = null,
        requestDeferred = $.Deferred();

      params[Instance.requestKey] = true;

      // Request new content
      Request = $.ajax({
        url: cleanURL,
        data: params,
        dataType: "json",
        cache: Instance.cache,
        xhr: function() {
          // custom xhr
          var xhr = new Window.XMLHttpRequest();

          /*
          //Upload progress ?
          xhr.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
              var percent = (e.loaded / e.total) / 2;
              $window.trigger(Events.progress, [ percent ]);
            }
          }, false);
          */

          //Download progress
          xhr.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
              var percent = e.loaded / e.total;
              $Window.trigger(Events.progress, [percent]);
            }
          }, false);

          return xhr;
        },
        success: function(resp, status, jqXHR) {
          response = (typeof resp === "string") ? $.parseJSON(resp) : resp;

          // handle redirects - requires passing new location with json response
          if (resp.location) {
            url = resp.location;

            parsed = parseURL(url);
            hash = parsed.hash;
          }

          requestDeferred.resolve();
        },
        error: function(jqXHR, status, err) {
          error = err;

          requestDeferred.reject();
        }
      });

      $.when(requestDeferred, Instance.transitionOutDeferred).done(function() {
        processResponse(parsed, response, doPush);
      }).fail(function() {
        $Window.trigger(Events.failed, [error]);
      });
    }

    /**
     * @method private
     * @name processResponse
     * @description Processes a state
     * @param parsedURL [object] "Parsed URL"
     * @param data [object] "State Data"
     * @param doPush [boolean] "Flag to replace or add state"
     */

    function processResponse(parsedURL, data, doPush) {
      // Fire load event
      $Window.trigger(Events.loaded, [data]);

      // Trigger analytics page view
      if ($.fsAnalytics !== undefined) {
        $.fsAnalytics("pageview");
      }

      // Render before updating
      Instance.render.call(this, data, parsedURL.hash);

      // Update current url
      CurrentURL = parsedURL.url;

      if (doPush) {
        // Push new states to the stack
        CurrentID++;
        pushState(CurrentID, CurrentURL);
      }

      $Window.trigger(Events.rendered, [data]);

      var scrollTop = false;

      if (parsedURL.hash !== "") {
        var $el = $(parsedURL.hash);

        if ($el.length) {
          scrollTop = $el.offset().top;
        }
      }

      if (scrollTop !== false) {
        $Window.scrollTop(scrollTop);
      }
    }

    /**
     * @method private
     * @name renderHTML
     * @description Renders a new state
     * @param data [object] "State Data"
     * @param hash [string] "Hash"
     */

    function renderState(data, hash) {
      // Update DOM
      if (typeof data !== "undefined") {
        var $target;

        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            $target = $(key);

            if ($target.length) {
              $target.html(data[key]);
            }
          }
        }
      }
    }

    /**
     * @method private
     * @name loadURL
     * @description Loads new page
     * @param opts [url] <''> "URL to load"
     */

    /**
     * @method
     * @name load
     * @description Loads new page
     * @param opts [url] <''> "URL to load"
     * @example $.asap("load", "http://example.com/page/");
     */

    function loadURL(url) {
      if (!Instance || !Formstone.support.history) {
        window.location.href = url;
      } else if (url) {
        requestURL(url, true);
      }

      return;
    }

    /**
     * @method private
     * @name replaceURL
     * @description Updates current url in history
     * @param url [string] <''> "New URL"
     */

    /**
     * @method
     * @name replace
     * @description Updates current url in history
     * @param url [string] <''> "New URL"
     * @example $.asap("replace", "http://example.com/page/");
     */

    function replaceURL(url) {
      var state = history.state;

      CurrentURL = url;

      replaceState(state.id, url);
    }

    /**
     * @method private
     * @name pushState
     * @description Push state to the history stack
     * @param id [int] "State id"
     * @param url [string] "State url"
     */

    function pushState(id, url) {
      history.pushState({
        id: id,
        url: url
      }, Namespace + id, url);
    }

    /**
     * @method private
     * @name replaceState
     * @description Push state to the history stack
     * @param id [int] "State id"
     * @param url [string] "State url"
     */

    function replaceState(id, url) {
      history.replaceState({
        id: id,
        url: url
      }, Namespace + id, url);
    }

    /**
     * @method private
     * @name parseURL
     * @description Parse url parts
     * @param url [string] "URL to parse"
     */

    function parseURL(url) {
      var queryIndex = url.indexOf("?"),
        hashIndex = url.indexOf("#"),
        params = {},
        hash = "",
        cleanURL = url;

      if (hashIndex > -1) {
        hash = url.slice(hashIndex);
        cleanURL = url.slice(0, hashIndex);
      }

      if (queryIndex > -1) {
        params = Functions.parseQueryString(url.slice(queryIndex + 1, ((hashIndex > -1) ? hashIndex : url.length)));
        cleanURL = url.slice(0, queryIndex);
      }

      return {
        hash: hash,
        params: params,
        url: url,
        clean: cleanURL
      };
    }

    /**
     * @plugin
     * @name ASAP
     * @description A jQuery plugin for asynchronous page loads.
     * @type utility
     * @main asap.js
     * @dependency jQuery
     * @dependency core.js
     * @dependency analytics.js
     */

    var Plugin = Formstone.Plugin("asap", {
        utilities: {
          _initialize: initialize,

          load: loadURL,
          replace: replaceURL
        },

        /**
         * @events
         * @event requested.asap "Before request is made; triggered on window; Second parameter 'true' if pop event"
         * @event progress.asap "As request is loaded; triggered on window; Second parameter contains percentage complete"
         * @event loaded.asap "After request is loaded; triggered on window"
         * @event rendered.asap "After state is rendered; triggered on window"
         * @event failed.asap "After load error; triggered on window"
         */

        events: {
          failed: "failed",
          loaded: "loaded",
          popState: "popstate",
          progress: "progress",
          requested: "requested",
          rendered: "rendered"
        }
      }),

      /**
       * @options
       * @param cache [boolean] <true> "Flag to cache AJAX responses"
       * @param ignoreTypes [regex] <> "File types to ignore"
       * @param render [function] <$.noop> "Custom render function"
       * @param requestKey [string] <'fs-asap'> "GET variable for requests"
       * @param selector [string] <'a'> "Target DOM Selector"
       * @param transitionOut [function] <$.noop> "Transition timing callback; should return user defined $.Deferred object, which must eventually resolve"
       */

      Defaults = {
        cache: true,
        ignoreTypes: /\.(jpg|sjpg|jpeg|png|gif|zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i,
        render: $.noop,
        requestKey: "fs-asap",
        selector: "a",
        transitionOut: $.noop
      },

      // Localize References

      $Window = Formstone.$window,
      Window = $Window[0],
      $Body,

      Functions = Plugin.functions,
      Events = Plugin.events,
      RawClasses = Plugin.classes.raw,

      // Internal

      Namespace = "asap-",
      CurrentURL = '',
      CurrentID = 1,
      Request,
      Instance;

  })

);
