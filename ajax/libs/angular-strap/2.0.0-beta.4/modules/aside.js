/**
 * angular-strap
 * @version v2.0.0-beta.4 - 2014-01-20
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.aside', ['mgcrea.ngStrap.modal']).run([
  '$templateCache',
  function ($templateCache) {
    var template = '' + '<div class="aside" tabindex="-1" role="dialog">' + '<div class="aside-dialog">' + '<div class="aside-content">' + '<div class="aside-header" ng-show="title">' + '<button type="button" class="close" ng-click="$hide()">&times;</button>' + '<h4 class="aside-title" ng-bind="title"></h4>' + '</div>' + '<div class="aside-body" ng-show="content" ng-bind="content"></div>' + '<div class="aside-footer">' + '<button type="button" class="btn btn-default" ng-click="$hide()">Close</button>' + '</div>' + '</div>' + '</div>' + '</div>';
    $templateCache.put('$aside', template);
  }
]).provider('$aside', function () {
  var defaults = this.defaults = {
      animation: 'animation-fadeAndSlideRight',
      prefixClass: 'aside',
      placement: 'right',
      template: '$aside',
      container: false,
      element: null,
      backdrop: true,
      keyboard: true,
      html: false,
      show: true
    };
  this.$get = [
    '$modal',
    function ($modal) {
      function AsideFactory(config) {
        var $aside = {};
        var options = angular.extend({}, defaults, config);
        $aside = $modal(options);
        return $aside;
      }
      return AsideFactory;
    }
  ];
}).directive('bsAside', [
  '$window',
  '$location',
  '$sce',
  '$aside',
  function ($window, $location, $sce, $aside) {
    var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
    return {
      restrict: 'EAC',
      scope: true,
      link: function postLink(scope, element, attr, transclusion) {
        var options = {
            scope: scope,
            element: element,
            show: false
          };
        angular.forEach([
          'template',
          'placement',
          'backdrop',
          'keyboard',
          'html',
          'container',
          'animation'
        ], function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        angular.forEach([
          'title',
          'content'
        ], function (key) {
          attr[key] && attr.$observe(key, function (newValue, oldValue) {
            scope[key] = newValue;
          });
        });
        attr.bsAside && scope.$watch(attr.bsAside, function (newValue, oldValue) {
          if (angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.content = newValue;
          }
        }, true);
        var aside = $aside(options);
        element.on(attr.trigger || 'click', aside.toggle);
        scope.$on('$destroy', function () {
          aside.destroy();
          options = null;
          aside = null;
        });
      }
    };
  }
]);