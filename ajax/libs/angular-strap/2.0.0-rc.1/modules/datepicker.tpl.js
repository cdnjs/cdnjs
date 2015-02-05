/**
 * angular-strap
 * @version v2.0.0-rc.1 - 2014-01-28
 * @link http://mgcrea.github.io/angular-strap
 * @author [object Object]
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('mgcrea.ngStrap.datepicker').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('datepicker/datepicker.tpl.html',
    "<div class=\"dropdown-menu datepicker\"><table tabindex=\"-1\" height=\"100%\"><thead><tr class=\"text-center\"><th><button type=\"button\" class=\"btn btn-default pull-left\" ng-click=\"$selectPane(-1)\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th><th colspan=\"5\" style=\"width: 100%\"><button type=\"button\" class=\"btn btn-default btn-block text-strong\" ng-click=\"$toggleMode()\"><strong style=\"text-transform: capitalize\" ng-bind=\"title\"></strong></button></th><th><button type=\"button\" class=\"btn btn-default pull-right\" ng-click=\"$selectPane(+1)\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th></tr><tr ng-show2=\"labels\" ng-bind-html=\"labels\"></tr></thead><tbody><tr ng-repeat=\"(i, row) in rows\"><td colspan=\"7\" style=\"letter-spacing: -4px\"><span ng-repeat=\"(j, el) in row\" class=\"text-center\"><button type=\"button\" class=\"btn btn-default\" style=\"height:{{height}}px;width:{{width}}%\" ng-class=\"{'btn-primary': el.selected}\" ng-click=\"$select(el.date)\" ng-disabled=\"el.disabled\"><span ng-class=\"{'text-muted': el.muted}\" ng-bind=\"el.label\"></span></button></span></td></tr></tbody></table></div>"
  );

}]);
