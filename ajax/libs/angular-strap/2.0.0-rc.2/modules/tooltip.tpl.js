/**
 * angular-strap
 * @version v2.0.0-rc.2 - 2014-01-29
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('mgcrea.ngStrap.tooltip').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('tooltip/tooltip.tpl.html',
    "<div class=\"tooltip\" ng-show=\"title\"><div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\" ng-bind=\"title\"></div></div>"
  );

}]);
