/**
 * angular-strap
 * @version v2.2.4 - 2015-05-28
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.dropdown', [ 'mgcrea.ngStrap.tooltip' ]).provider('$dropdown', function() {
  var defaults = this.defaults = {
    animation: 'am-fade',
    prefixClass: 'dropdown',
    prefixEvent: 'dropdown',
    placement: 'bottom-left',
    template: 'dropdown/dropdown.tpl.html',
    trigger: 'click',
    container: false,
    keyboard: true,
    html: false,
    delay: 0
  };
  this.$get = [ '$window', '$rootScope', '$tooltip', '$timeout', function($window, $rootScope, $tooltip, $timeout) {
    var bodyEl = angular.element($window.document.body);
    var matchesSelector = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector;
    function DropdownFactory(element, config) {
      var $dropdown = {};
      var options = angular.extend({}, defaults, config);
      var scope = $dropdown.$scope = options.scope && options.scope.$new() || $rootScope.$new();
      $dropdown = $tooltip(element, options);
      var parentEl = element.parent();
      $dropdown.$onKeyDown = function(evt) {
        if (!/(38|40)/.test(evt.keyCode)) return;
        evt.preventDefault();
        evt.stopPropagation();
        var items = angular.element($dropdown.$element[0].querySelectorAll('li:not(.divider) a'));
        if (!items.length) return;
        var index;
        angular.forEach(items, function(el, i) {
          if (matchesSelector && matchesSelector.call(el, ':focus')) index = i;
        });
        if (evt.keyCode === 38 && index > 0) index--; else if (evt.keyCode === 40 && index < items.length - 1) index++; else if (angular.isUndefined(index)) index = 0;
        items.eq(index)[0].focus();
      };
      var show = $dropdown.show;
      $dropdown.show = function() {
        show();
        $timeout(function() {
          options.keyboard && $dropdown.$element && $dropdown.$element.on('keydown', $dropdown.$onKeyDown);
          bodyEl.on('click', onBodyClick);
        }, 0, false);
        parentEl.hasClass('dropdown') && parentEl.addClass('open');
      };
      var hide = $dropdown.hide;
      $dropdown.hide = function() {
        if (!$dropdown.$isShown) return;
        options.keyboard && $dropdown.$element && $dropdown.$element.off('keydown', $dropdown.$onKeyDown);
        bodyEl.off('click', onBodyClick);
        parentEl.hasClass('dropdown') && parentEl.removeClass('open');
        hide();
      };
      var destroy = $dropdown.destroy;
      $dropdown.destroy = function() {
        bodyEl.off('click', onBodyClick);
        destroy();
      };
      function onBodyClick(evt) {
        if (evt.target === element[0]) return;
        return evt.target !== element[0] && $dropdown.hide();
      }
      return $dropdown;
    }
    return DropdownFactory;
  } ];
}).directive('bsDropdown', [ '$window', '$sce', '$dropdown', function($window, $sce, $dropdown) {
  return {
    restrict: 'EAC',
    scope: true,
    link: function postLink(scope, element, attr, transclusion) {
      var options = {
        scope: scope
      };
      angular.forEach([ 'placement', 'container', 'delay', 'trigger', 'keyboard', 'html', 'animation', 'template', 'id' ], function(key) {
        if (angular.isDefined(attr[key])) options[key] = attr[key];
      });
      var falseValueRegExp = /^(false|0|)$/i;
      angular.forEach([ 'html', 'container' ], function(key) {
        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) options[key] = false;
      });
      attr.bsDropdown && scope.$watch(attr.bsDropdown, function(newValue, oldValue) {
        scope.content = newValue;
      }, true);
      attr.bsShow && scope.$watch(attr.bsShow, function(newValue, oldValue) {
        if (!dropdown || !angular.isDefined(newValue)) return;
        if (angular.isString(newValue)) newValue = !!newValue.match(/true|,?(dropdown),?/i);
        newValue === true ? dropdown.show() : dropdown.hide();
      });
      var dropdown = $dropdown(element, options);
      scope.$on('$destroy', function() {
        if (dropdown) dropdown.destroy();
        options = null;
        dropdown = null;
      });
    }
  };
} ]);