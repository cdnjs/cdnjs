(function() {
  'use strict';

  /*
   * Angular matchMedia Module
   * Version 0.4.1
   * Uses Bootstrap 3 breakpoint sizes
   * Exposes service "screenSize" which returns true if breakpoint(s) matches.
   * Includes matchMedia polyfill for backward compatibility.
   * Copyright © 2013-2014 Jack Tarantino.
   **/


  var app = angular.module('matchMedia', []);


  app.run(function initializeNgMatchMedia() {
    /*! matchMedia() polyfill - Test a CSS media type/query in JS.
     * Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight.
     * Dual MIT/BSD license
     **/

    window.matchMedia || (window.matchMedia = function matchMediaPolyfill() {

      // For browsers that support matchMedium api such as IE 9 and webkit
      var styleMedia = (window.styleMedia || window.media);

      // For those that don't support matchMedium
      if (!styleMedia) {
        var style = document.createElement('style'),
          script = document.getElementsByTagName('script')[0],
          info = null;

        style.type = 'text/css';
        style.id = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8
        // 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
          matchMedium: function(media) {
            var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

            // 'style.styleSheet' is used by IE <= 8
            // 'style.textContent' for all other browsers
            if (style.styleSheet) {
              style.styleSheet.cssText = text;
            } else {
              style.textContent = text;
            }

            // Test if media query is true or false
            return info.width === '1px';
          }
        };
      }

      return function(media) {
        return {
          matches: styleMedia.matchMedium(media || 'all'),
          media: media || 'all'
        };
      };
    }());
  });


  // takes a comma-separated list of screen sizes to match.
  // returns true if any of them match.
  app.service('screenSize', ["$rootScope", function screenSize($rootScope) {

    var defaultRules = {
      lg: '(min-width: 1200px)',
      md: '(min-width: 992px) and (max-width: 1199px)',
      sm: '(min-width: 768px) and (max-width: 991px)',
      xs: '(max-width: 767px)'
    };

    var that = this;

    // Executes Angular $apply in a safe way
    var safeApply = function(fn, scope) {
      scope = scope || $rootScope;
      var phase = scope.$root.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        scope.$apply(fn);
      }
    };

    this.is = function(list) {
      var rules = this.rules || defaultRules;

      // validate that we're getting a string or array.
      if (typeof list !== 'string' && Object.prototype.toString.call(list) === '[object Array]') {
        throw new Error('screenSize requires array or comma-separated list');
      }

      // if it's a string, convert to array.
      if (typeof list === 'string') {
        list = list.split(/\s*,\s*/);
      }

      return list.some(function(size, index, arr) {
        if (window.matchMedia(rules[size]).matches) {
          return true;
        }
      });
    };

    // Return the actual size (it's string name defined in the rules)
    this.get = function() {
      var rules = this.rules || defaultRules;

      for (var prop in rules) {
        if (window.matchMedia(rules[prop]).matches) {
          return prop;
        }
      }
    };

    // Executes the callback function on window resize with the match truthiness as the first argument.
    // Returns the current match truthiness.
    // The 'scope' parameter is optional. If it's not passed in, '$rootScope' is used.
    this.on = function(list, callback, scope) {
      window.addEventListener('resize', function(event) {
        safeApply(callback(that.is(list)), scope);
      });

      return that.is(list);
    };

    // Executes the callback only when inside of the particular screensize.
    // The 'scope' parameter is optional. If it's not passed in, '$rootScope' is used.
    this.when = function(list, callback, scope) {
      window.addEventListener('resize', function(event) {
        if (that.is(list) === true) {
          safeApply(callback(that.is(list)), scope);
        }
      });

      return that.is(list);
    };
  }]);

  app.filter('media', ['screenSize', function(screenSize) {

      var mediaFilter = function(inputValue, options) {

        // Get actual size
        var size = screenSize.get();

        // Variable for the value being return (either a size/rule name or a group name)
        var returnedName = '';

        if (!options) {

          // Return the size/rule name
          return size;

        }

      // Replace placeholder with group name in input value
      if (options.groups) {

        for (var prop in options.groups) {
          var index = options.groups[prop].indexOf(size);
          if (index >= 0) {
            returnedName = prop;
          }
        }

        // If no group name is found for size use the size itself
        if (returnedName === '') {
          returnedName = size;
        }

      }

      // Replace or return size/rule name?
      if (options.replace && typeof options.replace === 'string' && options.replace.length > 0) {
        return inputValue.replace(options.replace, returnedName);
      } else {
        return returnedName;
      }

      };

      // Since AngularJS 1.3, filters which are not stateless (depending at the scope)
      // have to explicit define this behavior.
      mediaFilter.$stateful = true;
      return mediaFilter;
  }]);

})();
