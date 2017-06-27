/* ng-FitText.js v4.0.0
 * https://github.com/patrickmarabeas/ng-FitText.js
 *
 * Original jQuery project: https://github.com/davatron5000/FitText.js
 *
 * Copyright 2015, Patrick Marabeas http://marabeas.io
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 18/01/2016
 */

(function(window, document, angular, undefined) {

  'use strict';

  angular.module('ngFitText', [])
    .value('fitTextDefaultConfig', {
      'debounce'    : false,
      'delay'       : 250,
      'loadDelay'   : 10,
      'compressor'  : 1,
      'min'         : 0,
      'max'         : Number.POSITIVE_INFINITY
    })

    .directive('fittext', [
      '$timeout',
      'fitTextDefaultConfig',
      'fitTextConfig',

      function($timeout, config, fitTextConfig) {
        return {
          restrict: 'A',
          scope: true,
          link: function(scope, element, attrs) {

            angular.extend(config, fitTextConfig.config);

            var parent          = element.parent()
              , computed        = window.getComputedStyle(element[0], null)
              , newlines        = element.children().length || 1
              , loadDelay       = attrs.fittextLoadDelay || config.loadDelay
              , compressor      = attrs.fittext || config.compressor
              , minFontSize     = attrs.fittextMin || config.min
              , maxFontSize     = (attrs.fittextMax === 'initial' ? computed['font-size'] : attrs.fittextMax) || config.max
              , lineHeight      = computed['line-height']
              , display         = computed['display']
              , calcSize        = 10
              ;

            function calculate() {
              var ratio = (calcSize * newlines) / element[0].offsetWidth / newlines;
              return Math.max(
                Math.min((parent[0].offsetWidth - 6) * ratio * compressor,
                  parseFloat(maxFontSize)
                ),
                parseFloat(minFontSize)
              )
            }

            function resizer() {
              // Don't calculate for elements with no width or height
              if (element[0].offsetHeight * element[0].offsetWidth === 0)
                return;

              // Set standard values for calculation
              element[0].style.fontSize       = calcSize + 'px';
              element[0].style.lineHeight     = '1';
              element[0].style.display        = 'inline-block';

              // Set usage values
              element[0].style.fontSize       = calculate() + 'px';
              element[0].style.lineHeight     = lineHeight;
              element[0].style.display        = display;
            }

            $timeout( function() { resizer() }, loadDelay);

            scope.$watch(attrs.ngBind, function() { resizer() });

            config.debounce
              ? angular.element(window).bind('resize', config.debounce(function(){ scope.$apply(resizer)}, config.delay))
              : angular.element(window).bind('resize', function(){ scope.$apply(resizer)});
          }
        }
      }
    ])

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
