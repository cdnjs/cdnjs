/*! formstone v1.4.20-1 [cookie.js] 2021-01-29 | GPL-3.0 License | formstone.it */
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
     * @name delegate
     * @param key [string] "Cookie key"
     * @param value [string] "Cookie value"
     * @param options [object] "Options object"
     * @return [null || string] "Cookie value, if 'read'"
     */

    function delegate(key, value, options) {
      if (typeof key === "object") {

        // Set defaults

        Defaults = $.extend(Defaults, key);
      } else {

        // Delegate intent

        options = $.extend({}, Defaults, options || {});

        if (typeof key !== "undefined") {
          if (typeof value !== "undefined") {
            if (value === null) {
              eraseCookie(key, options);
            } else {
              createCookie(key, value, options);
            }
          } else {
            return readCookie(key);
          }
        }
      }

      return null;
    }

    /**
     * @method
     * @name create
     * @description Creates a cookie.
     * @param key [string] "Cookie key"
     * @param value [string] "Cookie value"
     * @param options [object] "Options object"
     * @example $.cookie(key, value, options);
     */

    function createCookie(key, value, options) {
      var expiration = false,
        date = new Date();

      // Check Expiration Date

      if (options.expires && typeof options.expires === "number") {
        date.setTime(date.getTime() + options.expires);
        expiration = date.toGMTString();
      }

      var domain = (options.domain) ? "; domain=" + options.domain : "",
        expires = (expiration) ? "; expires=" + expiration : "",
        maxAge = (expiration) ? "; max-age=" + (options.expires / 1000) : "", // to seconds
        path = (options.path) ? "; path=" + options.path : "",
        secure = (options.secure) ? "; secure" : "";

      // Set Cookie

      Document.cookie = key + "=" + value + expires + maxAge + domain + path + secure;
    }

    /**
     * @method
     * @name read
     * @description Returns a cookie's value, or null.
     * @param key [string] "Cookie key"
     * @return [string | null] "Cookie's value, or null"
     * @example var value = $.cookie(key);
     */

    function readCookie(key) {
      var keyString = key + "=",
        cookies = Document.cookie.split(';');

      // Loop Cookies

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];

        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1, cookie.length);
        }

        // Return Match

        if (cookie.indexOf(keyString) === 0) {
          return cookie.substring(keyString.length, cookie.length);
        }
      }

      return null;
    }

    /**
     * @method
     * @name erase
     * @description Deletes a cookie.
     * @param key [string] "Cookie key"
     * @example $.cookie(key, null);
     */

    function eraseCookie(key, options) {
      createCookie(key, "", $.extend({}, options, {
        expires: -604800000 // -7 days
      }));
    }

    /**
     * @plugin
     * @name Cookie
     * @description A jQuery plugin for simple access to browser cookies.
     * @type utility
     * @main cookie.js
     * @dependency jQuery
     * @dependency core.js
     */

    var Plugin = Formstone.Plugin("cookie", {
        utilities: {
          _delegate: delegate
        }
      }),

      /**
       * @options
       * @param domain [string] "Cookie domain"
       * @param expires [int] <604800000> "Time until cookie expires"
       * @param path [string] "Cookie path"
       */

      Defaults = {
        domain: null,
        expires: 604800000, // 7 days
        path: null,
        secure: null
      },

      // Localize References

      Document = Formstone.document;

  })

);
