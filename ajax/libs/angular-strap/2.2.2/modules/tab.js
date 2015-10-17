/**
 * angular-strap
 * @version v2.2.1 - 2015-05-15
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.tab', []).provider('$tab', function() {
  var defaults = this.defaults = {
    animation: 'am-fade',
    template: 'tab/tab.tpl.html',
    navClass: 'nav-tabs',
    activeClass: 'active'
  };
  var controller = this.controller = function($scope, $element, $attrs) {
    var self = this;
    self.$options = angular.copy(defaults);
    angular.forEach([ 'animation', 'navClass', 'activeClass' ], function(key) {
      if (angular.isDefined($attrs[key])) self.$options[key] = $attrs[key];
    });
    $scope.$navClass = self.$options.navClass;
    $scope.$activeClass = self.$options.activeClass;
    self.$panes = $scope.$panes = [];
    self.$activePaneChangeListeners = self.$viewChangeListeners = [];
    self.$push = function(pane) {
      self.$panes.push(pane);
    };
    self.$remove = function(pane) {
      var index = self.$panes.indexOf(pane);
      var activeIndex = self.$panes.$active;
      self.$panes.splice(index, 1);
      if (index < activeIndex) {
        activeIndex--;
      } else if (index === activeIndex && activeIndex === self.$panes.length) {
        activeIndex--;
      }
      self.$setActive(activeIndex);
    };
    self.$panes.$active = 0;
    self.$setActive = $scope.$setActive = function(value) {
      self.$panes.$active = value;
      self.$activePaneChangeListeners.forEach(function(fn) {
        fn();
      });
    };
  };
  this.$get = function() {
    var $tab = {};
    $tab.defaults = defaults;
    $tab.controller = controller;
    return $tab;
  };
}).directive('bsTabs', [ '$window', '$animate', '$tab', '$parse', function($window, $animate, $tab, $parse) {
  var defaults = $tab.defaults;
  return {
    require: [ '?ngModel', 'bsTabs' ],
    transclude: true,
    scope: true,
    controller: [ '$scope', '$element', '$attrs', $tab.controller ],
    templateUrl: function(element, attr) {
      return attr.template || defaults.template;
    },
    link: function postLink(scope, element, attrs, controllers) {
      var ngModelCtrl = controllers[0];
      var bsTabsCtrl = controllers[1];
      if (ngModelCtrl) {
        bsTabsCtrl.$activePaneChangeListeners.push(function() {
          ngModelCtrl.$setViewValue(bsTabsCtrl.$panes.$active);
        });
        ngModelCtrl.$formatters.push(function(modelValue) {
          bsTabsCtrl.$setActive(modelValue * 1);
          return modelValue;
        });
      }
      if (attrs.bsActivePane) {
        var parsedBsActivePane = $parse(attrs.bsActivePane);
        bsTabsCtrl.$activePaneChangeListeners.push(function() {
          parsedBsActivePane.assign(scope, bsTabsCtrl.$panes.$active);
        });
        scope.$watch(attrs.bsActivePane, function(newValue, oldValue) {
          bsTabsCtrl.$setActive(newValue * 1);
        }, true);
      }
    }
  };
} ]).directive('bsPane', [ '$window', '$animate', '$sce', function($window, $animate, $sce) {
  return {
    require: [ '^?ngModel', '^bsTabs' ],
    scope: true,
    link: function postLink(scope, element, attrs, controllers) {
      var ngModelCtrl = controllers[0];
      var bsTabsCtrl = controllers[1];
      element.addClass('tab-pane');
      attrs.$observe('title', function(newValue, oldValue) {
        scope.title = $sce.trustAsHtml(newValue);
      });
      if (bsTabsCtrl.$options.animation) {
        element.addClass(bsTabsCtrl.$options.animation);
      }
      attrs.$observe('disabled', function(newValue, oldValue) {
        scope.disabled = scope.$eval(newValue);
      });
      bsTabsCtrl.$push(scope);
      scope.$on('$destroy', function() {
        bsTabsCtrl.$remove(scope);
      });
      function render() {
        var index = bsTabsCtrl.$panes.indexOf(scope);
        var active = bsTabsCtrl.$panes.$active;
        $animate[index === active ? 'addClass' : 'removeClass'](element, bsTabsCtrl.$options.activeClass);
      }
      bsTabsCtrl.$activePaneChangeListeners.push(function() {
        render();
      });
      render();
    }
  };
} ]);