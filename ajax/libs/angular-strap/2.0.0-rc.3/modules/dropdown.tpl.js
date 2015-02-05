/**
 * angular-strap
 * @version v2.0.0-rc.3 - 2014-02-10
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('mgcrea.ngStrap.dropdown').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('dropdown/dropdown.tpl.html',
    "<ul tabindex=\"-1\" class=\"dropdown-menu\" role=\"menu\"><li role=\"presentation\" ng-class=\"{divider: item.divider}\" ng-repeat=\"item in content\"><a role=\"menuitem\" tabindex=\"-1\" href=\"{{item.href}}\" ng-if=\"!item.divider\" ng-click=\"$eval(item.click);$hide()\" ng-bind=\"item.text\"></a></li></ul>"
  );

}]);
