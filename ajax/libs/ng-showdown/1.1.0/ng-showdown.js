;/*! ng-showdown 19-10-2015 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular', 'showdown'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('angular'), require('showdown'));
  } else {
    // Browser globals (root is window)
    root.ngShowdown = factory(root.angular, root.showdown);
  }
}(this, function (angular, showdown) {
  //Check if AngularJs and Showdown is defined and only load ng-Showdown if both are present
  if (typeof angular === 'undefined' || typeof showdown === 'undefined') {
    throw new Error('ng-showdown was not loaded because one of its dependencies (AngularJS or Showdown) was not met');
  }

  angular.module('ng-showdown', ['ngSanitize'])
    .provider('$showdown', ngShowdown)
    .directive('sdModelToHtml', ['$showdown', '$sanitize', '$sce', sdModelToHtmlDirective]) //<-- DEPRECATED: will be removed in the next major version release
    .directive('markdownToHtml', ['$showdown', '$sanitize', '$sce', markdownToHtmlDirective])
    .filter('sdStripHtml', ['$showdown', stripHtmlFilter]) //<-- DEPRECATED: will be removed in the next major version release
    .filter('stripHtml', ['$showdown', stripHtmlFilter]);

  /**
   * Angular Provider
   * Enables configuration of showdown via angular.config and Dependency Injection into controllers, views
   * directives, etc... This assures the directives and filters provided by the library itself stay consistent
   * with the user configurations.
   * If the user wants to use a different configuration in a determined context, he can use the "classic" Showdown
   * object instead.
   */
  function ngShowdown() {

    // Configuration parameters for Showdown
    var config = {
      extensions: [],
      sanitize: false
    };

    /**
     * Sets a configuration option
     *
     * @param {string} key Config parameter key
     * @param {string} value Config parameter value
     */
    /* jshint validthis: true */
    this.setOption = function (key, value) {
      config[key] = value;
      return this;
    };

    /**
     * Gets the value of the configuration parameter specified by key
     *
     * @param {string} key The config parameter key
     * @returns {string|null} Returns the value of the config parameter. (or null if the config parameter is not set)
     */
    this.getOption = function (key) {
      if (config.hasOwnProperty(key)) {
        return config[key];
      } else {
        return undefined;
      }
    };

    /**
     * Loads a Showdown Extension
     *
     * @param {string} extensionName The name of the extension to load
     */
    this.loadExtension = function (extensionName) {
      config.extensions.push(extensionName);

      return this;
    };

    function SDObject() {
      var converter = new showdown.Converter(config);

      /**
       * Converts a markdown text into HTML
       *
       * @param {string} markdown The markdown string to be converted to HTML
       * @returns {string} The converted HTML
       */
      this.makeHtml = function (markdown) {
        return converter.makeHtml(markdown);
      };

      /**
       * Strips a text of it's HTML tags. See http://stackoverflow.com/questions/17289448/angularjs-to-output-plain-text-instead-of-html
       *
       * @param {string} text
       * @returns {string}
       */
      this.stripHtml = function (text) {
        return String(text).replace(/<[^>]+>/gm, '');
      };

      /**
       * Gets the value of the configuration parameter of CONVERTER specified by key
       * @param {string} key The config parameter key
       * @returns {*}
       */
      this.getOption = function (key) {
        return converter.getOption(key);
      };

      /**
       * Gets the converter configuration params
       * @returns {*}
       */
      this.getOptions = function () {
        return converter.getOptions();
      };

      /**
       * Sets a configuration option
       *
       * @param {string} key Config parameter key
       * @param {string} value Config parameter value
       * @returns {SDObject}
       */
      this.setOption = function (key, value) {
        converter.setOption(key, value);
        return this;
      };
    }

    // The object returned by service provider
    this.$get = function () {
      return new SDObject();
    };
  }

  /**
   * @deprecated
   * Legacy AngularJS Directive to Md to HTML transformation
   *
   * Usage example:
   * <div sd-model-to-html="markdownText" ></div>
   *
   * @param {showdown.Converter} $showdown
   * @param {$sanitize} $sanitize
   * @param {$sce} $sce
   * @returns {*}
   */
  function sdModelToHtmlDirective($showdown, $sanitize, $sce) {
    return {
      restrict: 'A',
      link: getLinkFn($showdown, $sanitize, $sce),
      scope: {
        model: '=sdModelToHtml'
      },
      template: '<div ng-bind-html="trustedHtml"></div>'
    };
  }

  /**
   * AngularJS Directive to Md to HTML transformation
   *
   * Usage example:
   * <div markdown-to-html="markdownText" ></div>
   *
   * @param {showdown.Converter} $showdown
   * @param {$sanitize} $sanitize
   * @param {$sce} $sce
   * @returns {*}
   */
  function markdownToHtmlDirective($showdown, $sanitize, $sce) {
    return {
      restrict: 'A',
      link: getLinkFn($showdown, $sanitize, $sce),
      scope: {
        model: '=markdownToHtml'
      },
      template: '<div ng-bind-html="trustedHtml"></div>'
    };
  }

  function getLinkFn($showdown, $sanitize, $sce) {
    return function (scope, element, attrs) {
      scope.$watch('model', function (newValue) {
        var showdownHTML;
        if (typeof newValue === 'string') {
          showdownHTML = $showdown.makeHtml(newValue);
          scope.trustedHtml = ($showdown.getOption('sanitize')) ? $sanitize(showdownHTML) : $sce.trustAsHtml(showdownHTML);
        } else {
          scope.trustedHtml = typeof newValue;
        }
      });
    };
  }

  /**
   * AngularJS Filter to Strip HTML tags from text
   *
   * @returns {Function}
   */
  function stripHtmlFilter($showdown) {
    return function (text) {
      return $showdown.stripHtml(text);
    };
  }

  return angular.module('ng-showdown');
}));

//# sourceMappingURL=ng-showdown.js.map