/* ng-FitText.js v3.3.0
 * https://github.com/patrickmarabeas/ng-FitText.js
 *
 * Original jQuery project: https://github.com/davatron5000/FitText.js
 *
 * Copyright 2015, Patrick Marabeas http://marabeas.io
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 30/01/2015
 */

(function(window, document, angular, undefined) {

  'use strict';

  angular.module('ngFitText', [])
    .value( 'config', {
      'debounce': false,
      'delay': 250,
      'loadDelay': 10,
      'min': undefined,
      'max': undefined
    })

    .directive('fittext', ['$timeout', 'config', 'fitTextConfig', function($timeout, config, fitTextConfig) {
      return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
          angular.extend(config, fitTextConfig.config);

          element[0].style.display = 'inline-block';
          element[0].style.lineHeight = '1';

          var parent = element.parent();
          var compressor = attrs.fittext || 1;
          var loadDelay = attrs.fittextLoadDelay || config.loadDelay;
          var nl = element[0].querySelectorAll('[fittext-nl],[data-fittext-nl]').length || 1;
          var minFontSize = attrs.fittextMin || config.min || Number.NEGATIVE_INFINITY;
          var maxFontSize = attrs.fittextMax || config.max || Number.POSITIVE_INFINITY;

          var resizer = function() {
            element[0].style.fontSize = '10px';
            var ratio = element[0].offsetHeight / element[0].offsetWidth / nl;
            element[0].style.fontSize = Math.max(
              Math.min((parent[0].offsetWidth - 6) * ratio * compressor,
                parseFloat(maxFontSize)
              ),
              parseFloat(minFontSize)
            ) + 'px';
          };

          $timeout( function() { resizer() }, loadDelay);

          scope.$watch(attrs.ngModel, function() { resizer() });

          config.debounce
            ? angular.element(window).bind('resize', config.debounce(function(){ scope.$apply(resizer)}, config.delay))
            : angular.element(window).bind('resize', function(){ scope.$apply(resizer)});
        }
      }
    }])

    .provider('fitTextConfig', function() {
      var self = this;
      this.config = {};
      this.$get = function() {
        var extend = {};
        extend.config = self.config;
        return extend;
      };
      return this;
    });

})(window, document, angular);