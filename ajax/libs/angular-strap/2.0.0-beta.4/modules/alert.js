/**
 * angular-strap
 * @version v2.0.0-beta.4 - 2014-01-20
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.alert', []).run([
  '$templateCache',
  function ($templateCache) {
    var template = '' + '<div class="alert" tabindex="-1" ng-class="[type ? \'alert-\' + type : null]">' + '<button type="button" class="close" ng-click="$hide()">&times;</button>' + '<strong ng-bind="title"></strong>&nbsp;<span ng-bind-html="content"></span>' + '</div>';
    $templateCache.put('$alert', template);
  }
]).provider('$alert', function () {
  var defaults = this.defaults = {
      animation: 'animation-fade',
      prefixClass: 'alert',
      placement: null,
      template: '$alert',
      container: false,
      element: null,
      backdrop: false,
      keyboard: true,
      show: true,
      duration: false
    };
  this.$get = [
    '$modal',
    '$timeout',
    function ($modal, $timeout) {
      function AlertFactory(config) {
        var $alert = {};
        var options = angular.extend({}, defaults, config);
        $alert = $modal(options);
        if (!options.scope) {
          angular.forEach(['type'], function (key) {
            if (options[key])
              $alert.$scope[key] = options[key];
          });
        }
        var show = $alert.show;
        if (options.duration) {
          $alert.show = function () {
            show();
            $timeout(function () {
              $alert.hide();
            }, options.duration * 1000);
          };
        }
        return $alert;
      }
      return AlertFactory;
    }
  ];
}).directive('bsAlert', [
  '$window',
  '$location',
  '$sce',
  '$alert',
  function ($window, $location, $sce, $alert) {
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
          'keyboard',
          'html',
          'container',
          'animation',
          'duration'
        ], function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        angular.forEach([
          'title',
          'content',
          'type'
        ], function (key) {
          attr[key] && attr.$observe(key, function (newValue, oldValue) {
            scope[key] = newValue;
          });
        });
        attr.bsAlert && scope.$watch(attr.bsAlert, function (newValue, oldValue) {
          if (angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.content = newValue;
          }
        }, true);
        var alert = $alert(options);
        element.on(attr.trigger || 'click', alert.toggle);
        scope.$on('$destroy', function () {
          alert.destroy();
          options = null;
          alert = null;
        });
      }
    };
  }
]);