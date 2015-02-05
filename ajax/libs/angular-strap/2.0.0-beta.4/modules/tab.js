/**
 * angular-strap
 * @version v2.0.0-beta.4 - 2014-01-20
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.tab', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('$pane', '{{pane.content}}');
    var template = '<ul class="nav nav-tabs">' + '<li ng-repeat="pane in panes" ng-class="{active:$index==active}">' + '<a data-toggle="tab" ng-click="setActive($index, $event)" data-index="{{$index}}">{{pane.title}}</a>' + '</li>' + '</ul>' + '<div class="tab-content">' + '<div ng-repeat="pane in panes" class="tab-pane" ng-class="[$index==active?\'active\':\'\']" ng-include="pane.template || \'$pane\'"></div>' + '</div>';
    $templateCache.put('$tabs', template);
  }
]).provider('$tab', function () {
  var defaults = this.defaults = {
      animation: 'animation-fade',
      template: '$tabs'
    };
  this.$get = function () {
    return { defaults: defaults };
  };
}).directive('bsTabs', [
  '$window',
  '$animate',
  '$tab',
  function ($window, $animate, $tab) {
    var defaults = $tab.defaults;
    return {
      restrict: 'EAC',
      scope: true,
      require: '?ngModel',
      templateUrl: function (element, attr) {
        return attr.template || defaults.template;
      },
      link: function postLink(scope, element, attr, controller) {
        var options = defaults;
        angular.forEach(['animation'], function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        attr.bsTabs && scope.$watch(attr.bsTabs, function (newValue, oldValue) {
          scope.panes = newValue;
        }, true);
        element.addClass('tabs');
        if (options.animation) {
          element.addClass(options.animation);
        }
        scope.active = scope.activePane = 0;
        scope.setActive = function (index, ev) {
          scope.active = index;
          if (controller) {
            controller.$setViewValue(index);
          }
        };
        if (controller) {
          controller.$render = function () {
            scope.active = controller.$modelValue * 1;
          };
        }
      }
    };
  }
]);