/**
 * angular-strap
 * @version v2.0.0-rc.2 - 2014-01-29
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('mgcrea.ngStrap.typeahead').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('typeahead/typeahead.tpl.html',
    "<ul tabindex=\"-1\" class=\"typeahead dropdown-menu\" ng-show=\"$isVisible()\" role=\"select\"><li role=\"presentation\" ng-repeat=\"match in $matches\" ng-class=\"{active: $index == $activeIndex}\"><a role=\"menuitem\" tabindex=\"-1\" ng-click=\"$select($index, $event)\" ng-bind=\"match.label\"></a></li></ul>"
  );

}]);
