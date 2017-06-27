(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('angular'));
  } else {
    // Browser globals (root is window)
    root.returnExports = factory(root.angular);
  }
}(this, function(angular) {
  /**
   * @ngdoc service
   * @name ngMeta.ngMeta
   * @description
   * # A metatags service for single-page applications
   * that supports setting arbitrary meta tags
   */
  angular.module('ngMeta', [])
    .provider('ngMeta', function() {

      'use strict';

      //Object for storing default tag/values
      var defaults = {};

      //One-time configuration
      var config = {
        useTitleSuffix: false
      };

      function Meta($rootScope) {

        /**
         * @ngdoc function
         * @name setTitle
         * @description
         * Sets the title of the page, optionally
         * appending a title suffix.
         *
         * If suffix usage is enabled and the title suffix
         * parameter is missing, the default title suffix
         * (if available) is used as a fallback.
         *
         * @example
         * //title and titleSuffix
         * ngMeta.setTitle('Page name', ' - Site name | Tagline of the site');
         *
         * //title only (default titleSuffix may be suffixed,
         * //depending on useTitleSuffix configuration)
         * ngMeta.setTitle('Page name');
         */
        var setTitle = function(title, titleSuffix) {
          $rootScope.ngMeta.title = angular.isDefined(title) ? title : defaults.title;
          if (config.useTitleSuffix) {
            $rootScope.ngMeta.title += angular.isDefined(titleSuffix) ? titleSuffix : defaults.titleSuffix;
          }
        };

        /**
         * @ngdoc function
         * @name setTag
         * @description
         * Sets the value of a meta tag, using
         * the default value (if available) as
         * a fallback.
         *
         * @example
         * ngMeta.setTag('og:image', 'http://example.com/a.png');
         */
        var setTag = function(tag, value) {
          $rootScope.ngMeta[tag] = angular.isDefined(value) ? value : defaults[tag];
        };

        /**
         * @ngdoc function
         * @name readRouteMeta
         * @description
         * Helper function to process meta tags on route/state
         * change.
         *
         * It:
         * 1. Sets the title (with titleSuffix, as appropriate)
         * 2. Iterates through all the state/route tags (other than title)
         *    and sets their values
         * 3. Iterates through all default tags and sets the ones
         *    that were not utilized while setting the state/route tags.
         */
        var readRouteMeta = function(meta) {
          meta = meta || {};

          setTitle(meta.title, meta.titleSuffix);

          var def = angular.copy(defaults);

          delete meta.title;
          delete meta.titleSuffix;
          delete def.title;
          delete def.titleSuffix;

          var metaKeys = Object.keys(meta);
          for (var i = 0; i < metaKeys.length; i++) {
            if (def.hasOwnProperty(metaKeys[i])) {
              delete def[metaKeys[i]];
            }
            setTag(metaKeys[i], meta[metaKeys[i]]);
          }

          var defaultKeys = Object.keys(def);
          for (var j = 0; j < defaultKeys.length; j++) {
            setTag(defaultKeys[j], def[defaultKeys[j]]);
          }
        };

        var update = function(event, current) {
          readRouteMeta(angular.copy(current.meta));
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initializes the ngMeta object and sets up
         * listeners for route/state change broadcasts
         *
         * @example
         * angular.module('yourApp', ['ngRoute', 'ngMeta'])
         * .config(function($routeProvider, ngMetaProvider) {
         *   ....
         * })
         * .run(function(ngMeta) {
         *   ngMeta.init();
         * });
         */
        var init = function() {
          $rootScope.ngMeta = {};
          $rootScope.$on('$routeChangeSuccess', update);
          $rootScope.$on('$stateChangeSuccess', update);
        };

        return {
          'init': init,
          'setTitle': setTitle,
          'setTag': setTag
        };
      }

      /* Set defaults */

      this.setDefaultTitle = function(titleStr) {
        defaults.title = titleStr;
      };

      this.setDefaultTitleSuffix = function(titleSuffix) {
        defaults.titleSuffix = titleSuffix;
      };

      this.setDefaultTag = function(tag, value) {
        defaults[tag] = value;
      };

      /* One-time config */

      this.useTitleSuffix = function(bool) {
        config.useTitleSuffix = !!bool;
      };

      this.$get = ["$rootScope", function($rootScope) {
        return new Meta($rootScope);
      }];
    });
}));