/**
 * angular-strap
 * @version v2.3.9 - 2016-06-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.collapse', []).provider('$collapse', function() {
  var defaults = this.defaults = {
    animation: 'am-collapse',
    disallowToggle: false,
    activeClass: 'in',
    startCollapsed: false,
    allowMultiple: false
  };
  var controller = this.controller = function($scope, $element, $attrs) {
    var self = this;
    self.$options = angular.copy(defaults);
    angular.forEach([ 'animation', 'disallowToggle', 'activeClass', 'startCollapsed', 'allowMultiple' ], function(key) {
      if (angular.isDefined($attrs[key])) self.$options[key] = $attrs[key];
    });
    var falseValueRegExp = /^(false|0|)$/i;
    angular.forEach([ 'disallowToggle', 'startCollapsed', 'allowMultiple' ], function(key) {
      if (angular.isDefined($attrs[key]) && falseValueRegExp.test($attrs[key])) {
        self.$options[key] = false;
      }
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
    self.$unregisterToggle = function(element) {
      var index = self.$toggles.indexOf(element);
      self.$toggles.splice(index, 1);
    };
    self.$unregisterTarget = function(element) {
      var index = self.$targets.indexOf(element);
      self.$targets.splice(index, 1);
      if (self.$options.allowMultiple) {
        deactivateItem(element);
      }
      fixActiveItemIndexes(index);
      self.$viewChangeListeners.forEach(function(fn) {
        fn();
      });
    };
    self.$targets.$active = !self.$options.startCollapsed ? [ 0 ] : [];
    self.$setActive = $scope.$setActive = function(value) {
      if (angular.isArray(value)) {
        self.$targets.$active = value;
      } else if (!self.$options.disallowToggle && isActive(value)) {
        deactivateItem(value);
      } else {
        activateItem(value);
      }
      self.$viewChangeListeners.forEach(function(fn) {
        fn();
      });
    };
    self.$activeIndexes = function() {
      if (self.$options.allowMultiple) {
        return self.$targets.$active;
      }
      return self.$targets.$active.length === 1 ? self.$targets.$active[0] : -1;
    };
    function fixActiveItemIndexes(index) {
      var activeIndexes = self.$targets.$active;
      for (var i = 0; i < activeIndexes.length; i++) {
        if (index < activeIndexes[i]) {
          activeIndexes[i] = activeIndexes[i] - 1;
        }
        if (activeIndexes[i] === self.$targets.length) {
          activeIndexes[i] = self.$targets.length - 1;
        }
      }
    }
    function isActive(value) {
      var activeItems = self.$targets.$active;
      return activeItems.indexOf(value) !== -1;
    }
    function deactivateItem(value) {
      var index = self.$targets.$active.indexOf(value);
      if (index !== -1) {
        self.$targets.$active.splice(index, 1);
      }
    }
    function activateItem(value) {
      if (!self.$options.allowMultiple) {
        self.$targets.$active.splice(0, 1);
      }
      if (self.$targets.$active.indexOf(value) === -1) {
        self.$targets.$active.push(value);
      }
    }
  };
  this.$get = function() {
    var $collapse = {};
    $collapse.defaults = defaults;
    $collapse.controller = controller;
    return $collapse;
  };
}).directive('bsCollapse', [ '$window', '$animate', '$collapse', function($window, $animate, $collapse) {
  return {
    require: [ '?ngModel', 'bsCollapse' ],
    controller: [ '$scope', '$element', '$attrs', $collapse.controller ],
    link: function postLink(scope, element, attrs, controllers) {
      var ngModelCtrl = controllers[0];
      var bsCollapseCtrl = controllers[1];
      if (ngModelCtrl) {
        bsCollapseCtrl.$viewChangeListeners.push(function() {
          ngModelCtrl.$setViewValue(bsCollapseCtrl.$activeIndexes());
        });
        ngModelCtrl.$formatters.push(function(modelValue) {
          if (angular.isArray(modelValue)) {
            bsCollapseCtrl.$setActive(modelValue);
          } else {
            var activeIndexes = bsCollapseCtrl.$activeIndexes();
            if (angular.isArray(activeIndexes)) {
              if (activeIndexes.indexOf(modelValue * 1) === -1) {
                bsCollapseCtrl.$setActive(modelValue * 1);
              }
            } else if (activeIndexes !== modelValue * 1) {
              bsCollapseCtrl.$setActive(modelValue * 1);
            }
          }
          return modelValue;
        });
      }
    }
  };
} ]).directive('bsCollapseToggle', function() {
  return {
    require: [ '^?ngModel', '^bsCollapse' ],
    link: function postLink(scope, element, attrs, controllers) {
      var bsCollapseCtrl = controllers[1];
      element.attr('data-toggle', 'collapse');
      bsCollapseCtrl.$registerToggle(element);
      scope.$on('$destroy', function() {
        bsCollapseCtrl.$unregisterToggle(element);
      });
      element.on('click', function() {
        if (!attrs.disabled) {
          var index = attrs.bsCollapseToggle && attrs.bsCollapseToggle !== 'bs-collapse-toggle' ? attrs.bsCollapseToggle : bsCollapseCtrl.$toggles.indexOf(element);
          bsCollapseCtrl.$setActive(index * 1);
          scope.$apply();
        }
      });
    }
  };
}).directive('bsCollapseTarget', [ '$animate', function($animate) {
  return {
    require: [ '^?ngModel', '^bsCollapse' ],
    link: function postLink(scope, element, attrs, controllers) {
      var bsCollapseCtrl = controllers[1];
      element.addClass('collapse');
      if (bsCollapseCtrl.$options.animation) {
        element.addClass(bsCollapseCtrl.$options.animation);
      }
      bsCollapseCtrl.$registerTarget(element);
      scope.$on('$destroy', function() {
        bsCollapseCtrl.$unregisterTarget(element);
      });
      function render() {
        var index = bsCollapseCtrl.$targets.indexOf(element);
        var active = bsCollapseCtrl.$activeIndexes();
        var action = 'removeClass';
        if (angular.isArray(active)) {
          if (active.indexOf(index) !== -1) {
            action = 'addClass';
          }
        } else if (index === active) {
          action = 'addClass';
        }
        $animate[action](element, bsCollapseCtrl.$options.activeClass);
      }
      bsCollapseCtrl.$viewChangeListeners.push(function() {
        render();
      });
      render();
    }
  };
} ]);