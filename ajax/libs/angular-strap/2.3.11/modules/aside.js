/**
 * angular-strap
 * @version v2.3.10 - 2016-10-17
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.aside', [ 'mgcrea.ngStrap.modal' ]).provider('$aside', function() {
  var defaults = this.defaults = {
    animation: 'am-fade-and-slide-right',
    prefixClass: 'aside',
    prefixEvent: 'aside',
    placement: 'right',
    templateUrl: 'aside/aside.tpl.html',
    contentTemplate: false,
    container: false,
    element: null,
    backdrop: true,
    keyboard: true,
    html: false,
    show: true
  };
  this.$get = [ '$modal', function($modal) {
    function AsideFactory(config) {
      var $aside = {};
      var options = angular.extend({}, defaults, config);
      $aside = $modal(options);
      return $aside;
    }
    return AsideFactory;
  } ];
}).directive('bsAside', [ '$window', '$sce', '$aside', function($window, $sce, $aside) {
  return {
    restrict: 'EAC',
    scope: true,
    link: function postLink(scope, element, attr, transclusion) {
      var options = {
        scope: scope,
        element: element,
        show: false
      };
      angular.forEach([ 'template', 'templateUrl', 'controller', 'controllerAs', 'contentTemplate', 'placement', 'backdrop', 'keyboard', 'html', 'container', 'animation' ], function(key) {
        if (angular.isDefined(attr[key])) options[key] = attr[key];
      });
      var falseValueRegExp = /^(false|0|)$/i;
      angular.forEach([ 'backdrop', 'keyboard', 'html', 'container' ], function(key) {
        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) options[key] = false;
      });
      angular.forEach([ 'onBeforeShow', 'onShow', 'onBeforeHide', 'onHide' ], function(key) {
        var bsKey = 'bs' + key.charAt(0).toUpperCase() + key.slice(1);
        if (angular.isDefined(attr[bsKey])) {
          options[key] = scope.$eval(attr[bsKey]);
        }
      });
      angular.forEach([ 'title', 'content' ], function(key) {
        if (attr[key]) {
          attr.$observe(key, function(newValue, oldValue) {
            scope[key] = $sce.trustAsHtml(newValue);
          });
        }
      });
      if (attr.bsAside) {
        scope.$watch(attr.bsAside, function(newValue, oldValue) {
          if (angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.content = newValue;
          }
        }, true);
      }
      var aside = $aside(options);
      element.on(attr.trigger || 'click', aside.toggle);
      scope.$on('$destroy', function() {
        if (aside) aside.destroy();
        options = null;
        aside = null;
      });
    }
  };
} ]);