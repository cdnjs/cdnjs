/**
 * angular-strap
 * @version v2.0.0-rc.3 - 2014-02-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.dropdown', ['mgcrea.ngStrap.tooltip']).provider('$dropdown', function () {
  var defaults = this.defaults = {
      animation: 'am-fade',
      prefixClass: 'dropdown',
      placement: 'bottom-left',
      template: 'dropdown/dropdown.tpl.html',
      trigger: 'click',
      container: false,
      keyboard: true,
      html: false,
      delay: 0
    };
  this.$get = [
    '$window',
    '$tooltip',
    function ($window, $tooltip) {
      var bodyEl = angular.element($window.document.body);
      var matchesSelector = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector;
      function DropdownFactory(element, config) {
        var $dropdown = {};
        var options = angular.extend({}, defaults, config);
        $dropdown = $tooltip(element, options);
        $dropdown.$onKeyDown = function (evt) {
          if (!/(38|40)/.test(evt.keyCode))
            return;
          evt.preventDefault();
          evt.stopPropagation();
          var items = angular.element($dropdown.$element[0].querySelectorAll('li:not(.divider) a'));
          if (!items.length)
            return;
          var index;
          angular.forEach(items, function (el, i) {
            if (matchesSelector && matchesSelector.call(el, ':focus'))
              index = i;
          });
          if (evt.keyCode === 38 && index > 0)
            index--;
          else if (evt.keyCode === 40 && index < items.length - 1)
            index++;
          else if (angular.isUndefined(index))
            index = 0;
          items.eq(index)[0].focus();
        };
        var show = $dropdown.show;
        $dropdown.show = function () {
          show();
          setTimeout(function () {
            options.keyboard && $dropdown.$element.on('keydown', $dropdown.$onKeyDown);
            bodyEl.on('click', onBodyClick);
          });
        };
        var hide = $dropdown.hide;
        $dropdown.hide = function () {
          options.keyboard && $dropdown.$element.off('keydown', $dropdown.$onKeyDown);
          bodyEl.off('click', onBodyClick);
          hide();
        };
        function onBodyClick(evt) {
          if (evt.target === element[0])
            return;
          return evt.target !== element[0] && $dropdown.hide();
        }
        return $dropdown;
      }
      return DropdownFactory;
    }
  ];
}).directive('bsDropdown', [
  '$window',
  '$location',
  '$sce',
  '$dropdown',
  function ($window, $location, $sce, $dropdown) {
    return {
      restrict: 'EAC',
      scope: true,
      link: function postLink(scope, element, attr, transclusion) {
        var options = { scope: scope };
        angular.forEach([
          'placement',
          'container',
          'delay',
          'trigger',
          'keyboard',
          'html',
          'animation',
          'template'
        ], function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        attr.bsDropdown && scope.$watch(attr.bsDropdown, function (newValue, oldValue) {
          scope.content = newValue;
        }, true);
        var dropdown = $dropdown(element, options);
        scope.$on('$destroy', function () {
          dropdown.destroy();
          options = null;
          dropdown = null;
        });
      }
    };
  }
]);