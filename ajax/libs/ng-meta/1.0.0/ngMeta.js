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
         * @ngdoc method
         * @name ngMeta#setTitle
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
         *
         * @returns {Object} self
         */
        var setTitle = function(title, titleSuffix) {
          if (!$rootScope.ngMeta) {
            throw new Error('Cannot call setTitle when ngMeta is undefined. Did you forget to call ngMeta.init() in the run block? \nRefer: https://github.com/vinaygopinath/ngMeta#getting-started');
          }

          $rootScope.ngMeta.title = angular.isDefined(title) ? title : (defaults.title || '');
          if (config.useTitleSuffix) {
            $rootScope.ngMeta.title += angular.isDefined(titleSuffix) ? titleSuffix : (defaults.titleSuffix || '');
          }
          return this;
        };

        /**
         * @ngdoc method
         * @name ngMeta#setTag
         * @description
         * Sets the value of a meta tag, using
         * the default value (if available) as
         * a fallback.
         *
         * @example
         * ngMeta.setTag('og:image', 'http://example.com/a.png');
         *
         * @returns {Object} self
         */
        var setTag = function(tag, value) {
          if (!$rootScope.ngMeta) {
            throw new Error('Cannot call setTag when ngMeta is undefined. Did you forget to call ngMeta.init() in the run block? \nRefer: https://github.com/vinaygopinath/ngMeta#getting-started');
          }
          if (tag === 'title' || tag === 'titleSuffix') {
            throw new Error('Attempt to set \'' + tag + '\' through \'setTag\': \'title\' and \'titleSuffix\' are reserved tag names. Please use \'ngMeta.setTitle\' instead');
          }

          $rootScope.ngMeta[tag] = angular.isDefined(value) ? value : defaults[tag];
          return this;
        };

        /**
         * @ngdoc method
         * @name ngMeta#setDefaultTag
         * @description
         * Sets the default tag for all routes that are missing a custom
         * `tag` property in their meta objects.
         *
         * @example
         * ngMeta.setDefaultTag('titleSuffix', ' | Tagline of the site');
         *
         * @returns {Object} self
         */
        var setDefaultTag = function(tag, value) {
          if (!$rootScope.ngMeta) {
            throw new Error('Cannot call setDefaultTag when ngMeta is undefined. Did you forget to call ngMeta.init() in the run block? \nRefer: https://github.com/vinaygopinath/ngMeta#getting-started');
          }

          defaults[tag] = value;

          if (tag === 'title' || tag === 'titleSuffix') {
            this.setTitle($rootScope.ngMeta.title, $rootScope.ngMeta.titleSuffix);
          } else {
            this.setTag(tag, $rootScope.ngMeta[tag]);
          }

          return this;
        };

        /**
         * @ngdoc method
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
         *
         * @returns {Object} self
         */
        var readRouteMeta = function(meta) {
          meta = meta || {};

          if (meta.disableUpdate) {
            return false;
          }

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
          readRouteMeta(angular.copy(current.meta || (current.data && current.data.meta)));
        };


        /**
         * @ngdoc method
         * @name ngMeta#init
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
          'setTag': setTag,
          'setDefaultTag': setDefaultTag
        };
      }

      /* Set defaults */

      /**
       * @ngdoc method
       * @name ngMetaProvider#setDefaultTitle
       * @param {string} titleStr The default title of the page. If a
       * route/state does not define a `title` param in its meta object, this
       * value is used instead.
       *
       * @description
       * Sets the default title for all routes that are missing a custom `title`
       * property in their meta objects.
       *
       * @returns {Object} self
       */
      this.setDefaultTitle = function(titleStr) {
        defaults.title = titleStr;
        return this;
      };

      /**
       * @ngdoc method
       * @name ngMetaProvider#setDefaultTitleSuffix
       * @param {string} titleSuffix The default title suffix of the page. If a
       * route/state does not define a `titleSuffix` param in its meta object,
       * this value is used instead.
       *
       * @description
       * Sets the default title suffix for all routes that are missing a custom
       * `titleSuffix` property in their meta objects.
       *
       * @returns {Object} self
       */
      this.setDefaultTitleSuffix = function(titleSuffix) {
        defaults.titleSuffix = titleSuffix;
        return this;
      };

      /**
       * @ngdoc method
       * @name ngMetaProvider#setDefaultTag
       * @param {string} tag The default tag name. The default tag can be
       * overridden by defining a custom property of the same name in the meta
       * object of any route.
       *
       * @param {string} value The value of the tag.
       *
       * @description
       * Sets the default tag for all routes that are missing a custom
       * `tag` property in their meta objects.
       *
       * @returns {Object} self
       */
      this.setDefaultTag = function(tag, value) {
        defaults[tag] = value;
        return this;
      };

      /* One-time config */

      /**
       * @ngdoc method
       * @name ngMetaProvider#useTitleSuffix
       * @param {boolean} bool A boolean indicating the use of title suffix.
       * Defaults to false.
       *
       * @description
       * Toggles the use of the title suffix throughout the site.
       *
       * @returns {Object} self
       */
      this.useTitleSuffix = function(bool) {
        config.useTitleSuffix = !!bool;
        return this;
      };

      /**
       * @ngdoc method
       * @name ngMetaProvider#mergeNestedStateData
       * @param {string} mergeNestedStateData [Optional] method to deep merge
       * meta data for nested views.
       *
       * @description
       * Helper function to Extend $stateProvider.decorator('state') to merge nested
       * view meta data if using ui-router.
       *
       * @returns {Object} data
       */
      this.mergeNestedStateData = function(state, parentDecoratorFn) {
      // original data
        var originalData = parentDecoratorFn(state) || {};

        // create new merged meta
        var parentMetaData = state.parent && state.parent.data && state.parent.data.meta;

        //Assign the merged meta if necessary to current state and return
        if (originalData.meta || parentMetaData) {
          var mergedMeta = angular.merge({}, parentMetaData, originalData.meta);
          originalData.meta = mergedMeta;
        }
        state.self.data = originalData;
        return originalData;
      };


      this.$get = ["$rootScope", function($rootScope) {
        return new Meta($rootScope);
      }];
    });
}));
