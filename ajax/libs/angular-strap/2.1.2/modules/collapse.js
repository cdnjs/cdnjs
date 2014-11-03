/**
 * angular-strap
 * @version v2.1.2 - 2014-10-19
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.collapse', [])

  .provider('$collapse', function() {

    var defaults = this.defaults = {
      animation: 'am-collapse',
      disallowToggle: false,
      activeClass: 'in',
      startCollapsed: false
    };

    var controller = this.controller = function($scope, $element, $attrs) {
      var self = this;

      // Attributes options
      self.$options = angular.copy(defaults);
      angular.forEach(['animation', 'disallowToggle', 'activeClass', 'startCollapsed'], function (key) {
        if(angular.isDefined($attrs[key])) self.$options[key] = $attrs[key];
      });

      self.$toggles = [];
      self.$targets = [];

      self.$viewChangeListeners = [];

      self.$registerToggle = function(element) {
        self.$toggles.push(element);
      };
      self.$registerTarget = function(element) {
        self.$targets.push(element);
      };

      self.$targets.$active = !self.$options.startCollapsed ? 0 : -1;
      self.$setActive = $scope.$setActive = function(value) {
        if(!self.$options.disallowToggle) {
          self.$targets.$active = self.$targets.$active === value ? -1 : value;
        } else {
          self.$targets.$active = value;
        }
        self.$viewChangeListeners.forEach(function(fn) {
          fn();
        });
      };

    };

    this.$get = function() {
      var $collapse = {};
      $collapse.defaults = defaults;
      $collapse.controller = controller;
      return $collapse;
    };

  })

  .directive('bsCollapse', ["$window", "$animate", "$collapse", function($window, $animate, $collapse) {

    var defaults = $collapse.defaults;

    return {
      require: ['?ngModel', 'bsCollapse'],
      controller: ['$scope', '$element', '$attrs', $collapse.controller],
      link: function postLink(scope, element, attrs, controllers) {

        var ngModelCtrl = controllers[0];
        var bsCollapseCtrl = controllers[1];

        if(ngModelCtrl) {

          // Update the modelValue following
          bsCollapseCtrl.$viewChangeListeners.push(function() {
            ngModelCtrl.$setViewValue(bsCollapseCtrl.$targets.$active);
          });

          // modelValue -> $formatters -> viewValue
          ngModelCtrl.$formatters.push(function(modelValue) {
            // console.warn('$formatter("%s"): modelValue=%o (%o)', element.attr('ng-model'), modelValue, typeof modelValue);
            if (bsCollapseCtrl.$targets.$active !== modelValue * 1) {
              bsCollapseCtrl.$setActive(modelValue * 1);
            }
            return modelValue;
          });

        }

      }
    };

  }])

  .directive('bsCollapseToggle', function() {

    return {
      require: ['^?ngModel', '^bsCollapse'],
      link: function postLink(scope, element, attrs, controllers) {

        var ngModelCtrl = controllers[0];
        var bsCollapseCtrl = controllers[1];

        // Add base attr
        element.attr('data-toggle', 'collapse');

        // Push pane to parent bsCollapse controller
        bsCollapseCtrl.$registerToggle(element);
        element.on('click', function() {
          var index = attrs.bsCollapseToggle || bsCollapseCtrl.$toggles.indexOf(element);
          bsCollapseCtrl.$setActive(index * 1);
          scope.$apply();
        });

      }
    };

  })

  .directive('bsCollapseTarget', ["$animate", function($animate) {

    return {
      require: ['^?ngModel', '^bsCollapse'],
      // scope: true,
      link: function postLink(scope, element, attrs, controllers) {

        var ngModelCtrl = controllers[0];
        var bsCollapseCtrl = controllers[1];

        // Add base class
        element.addClass('collapse');

        // Add animation class
        if(bsCollapseCtrl.$options.animation) {
          element.addClass(bsCollapseCtrl.$options.animation);
        }

        // Push pane to parent bsCollapse controller
        bsCollapseCtrl.$registerTarget(element);

        function render() {
          var index = bsCollapseCtrl.$targets.indexOf(element);
          var active = bsCollapseCtrl.$targets.$active;
          $animate[index === active ? 'addClass' : 'removeClass'](element, bsCollapseCtrl.$options.activeClass);
        }

        bsCollapseCtrl.$viewChangeListeners.push(function() {
          render();
        });
        render();

      }
    };

  }]);
