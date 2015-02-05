/**
 * angular-strap
 * @version v2.0.4 - 2014-07-24
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes (olivier@mg-crea.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.alert').run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('alert/alert.tpl.html', '<div class="alert" tabindex="-1" ng-class="[type ? \'alert-\' + type : null]"><button type="button" class="close" ng-if="dismissable" ng-click="$hide()">&times;</button> <strong ng-bind="title"></strong>&nbsp;<span ng-bind-html="content"></span></div>');
  }
]);