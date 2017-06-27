/*! angular-ladda 0.3.1 */
/**!
 * AngularJS Ladda directive
 * @author Chungsub Kim <subicura@subicura.com>
 */

/* global Ladda */
/* exported Ladda */
(function (root, factory)
{
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular', 'ladda'], factory);
  } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    // CommonJS support (for us webpack/browserify/ComponentJS folks)
    module.exports = factory(require('angular'), require('ladda'));
  } else {
    // in the case of no module loading system
    return factory(root.angular, root.Ladda);
  }
}(this, function (angular, Ladda){
  'use strict';

  var moduleName = 'angular-ladda';
  
  angular.module(moduleName, [])
    .provider('ladda', function () {
      var opts = {
        'style': 'zoom-in'
      };
      return {
        setOption: function (newOpts) {
          angular.extend(opts, newOpts);
        },
        $get: function () {
          return opts;
        }
      };
    })
    .directive('ladda', ['ladda', function (laddaOption) {
      return {
        restrict: 'A',
        priority: -1,
        link: function (scope, element, attrs) {
          element.addClass('ladda-button');
          if(angular.isUndefined(element.attr('data-style'))) {
            element.attr('data-style', laddaOption.style || 'zoom-in');
          }

          // ladda breaks childNode's event property.
          // because ladda use innerHTML instead of append node
          if(!element[0].querySelector('.ladda-label')) {
            var labelWrapper = document.createElement('span');
            labelWrapper.className = 'ladda-label';
            angular.element(labelWrapper).append(element.contents());
            element.append(labelWrapper);
          }

          // create ladda button
          var ladda = Ladda.create( element[0] );

          // add watch!
          scope.$watch(attrs.ladda, function(loading) {
            if(!loading && !angular.isNumber(loading)) {
              ladda.stop();
              // When the button also have the ng-disabled directive it needs to be
              // re-evaluated since the disabled attribute is removed by the 'stop' method.
              if (attrs.ngDisabled) {
                element.attr('disabled', scope.$eval(attrs.ngDisabled));
              }
              return;
            }
            if(!ladda.isLoading()) {
              ladda.start();
            }
            if(angular.isNumber(loading)) {
              ladda.setProgress(loading);
            }
          });
        }
      };
    }]);
    
  return moduleName;
}));
