/**
 * angular-strap
 * @version v2.0.0-beta.4 - 2014-01-20
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';
angular.module('mgcrea.ngStrap.modal', ['mgcrea.ngStrap.helpers.dimensions']).run([
  '$templateCache',
  '$modal',
  function ($templateCache, $modal) {
    var template = '' + '<div class="modal" tabindex="-1" role="dialog">' + '<div class="modal-dialog">' + '<div class="modal-content">' + '<div class="modal-header" ng-show="title">' + '<button type="button" class="close" ng-click="$hide()">&times;</button>' + '<h4 class="modal-title" ng-bind="title"></h4>' + '</div>' + '<div class="modal-body" ng-show="content" ng-bind="content"></div>' + '<div class="modal-footer">' + '<button type="button" class="btn btn-default" ng-click="$hide()">Close</button>' + '</div>' + '</div>' + '</div>' + '</div>';
    $templateCache.put('$modal', template);
  }
]).provider('$modal', function () {
  var defaults = this.defaults = {
      animation: 'animation-fade',
      prefixClass: 'modal',
      placement: 'top',
      template: '$modal',
      container: false,
      element: null,
      backdrop: true,
      keyboard: true,
      html: false,
      show: true
    };
  this.$get = [
    '$window',
    '$rootScope',
    '$compile',
    '$q',
    '$templateCache',
    '$http',
    '$animate',
    '$timeout',
    'dimensions',
    function ($window, $rootScope, $compile, $q, $templateCache, $http, $animate, $timeout, dimensions) {
      var forEach = angular.forEach;
      var jqLite = angular.element;
      var trim = String.prototype.trim;
      var bodyElement = jqLite($window.document.body);
      var htmlReplaceRegExp = /ng-bind="/gi;
      var findElement = function (query, element) {
        return jqLite((element || document).querySelectorAll(query));
      };
      function ModalFactory(config) {
        var $modal = {};
        var options = angular.extend({}, defaults, config);
        $modal.$promise = $q.when($templateCache.get(options.template) || $http.get(options.template));
        var scope = $modal.$scope = options.scope && options.scope.$new() || $rootScope.$new();
        if (!options.element && !options.container) {
          options.container = 'body';
        }
        if (!options.scope) {
          forEach([
            'title',
            'content'
          ], function (key) {
            if (options[key])
              scope[key] = options[key];
          });
        }
        scope.$hide = function () {
          scope.$$postDigest(function () {
            $modal.hide();
          });
        };
        scope.$show = function () {
          scope.$$postDigest(function () {
            $modal.show();
          });
        };
        scope.$toggle = function () {
          scope.$$postDigest(function () {
            $modal.toggle();
          });
        };
        var modalLinker, modalElement;
        var backdropElement = jqLite('<div class="' + options.prefixClass + '-backdrop"/>');
        $modal.$promise.then(function (template) {
          if (angular.isObject(template))
            template = template.data;
          if (options.html)
            template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
          template = trim.apply(template);
          modalLinker = $compile(template);
          $modal.init();
        });
        $modal.init = function () {
          if (options.show) {
            scope.$$postDigest(function () {
              options.trigger === 'focus' ? element[0].focus() : $modal.show();
            });
          }
        };
        $modal.destroy = function () {
          if (modalElement) {
            modalElement.remove();
            modalElement = null;
          }
          if (backdropElement) {
            backdropElement.remove();
            backdropElement = null;
          }
          scope.$destroy();
        };
        $modal.show = function () {
          var parent = options.container ? findElement(options.container) : null;
          var after = options.container ? null : options.element;
          modalElement = $modal.$element = modalLinker(scope, function (clonedElement, scope) {
          });
          modalElement.css({ display: 'block' }).addClass(options.placement);
          if (options.animation) {
            if (options.backdrop) {
              backdropElement.addClass('animation-fade');
            }
            modalElement.addClass(options.animation);
          }
          if (options.backdrop) {
            $animate.enter(backdropElement, bodyElement, null, function () {
            });
          }
          $animate.enter(modalElement, parent, after, function () {
          });
          scope.$isShown = true;
          scope.$$phase || scope.$digest();
          $modal.focus();
          bodyElement.addClass(options.prefixClass + '-open');
          if (options.backdrop) {
            modalElement.on('click', hideOnBackdropClick);
            backdropElement.on('click', hideOnBackdropClick);
          }
          if (options.keyboard) {
            modalElement.on('keyup', $modal.$onKeyUp);
          }
        };
        $modal.hide = function () {
          $animate.leave(modalElement, function () {
            bodyElement.removeClass(options.prefixClass + '-open');
          });
          if (options.backdrop) {
            $animate.leave(backdropElement, function () {
            });
          }
          scope.$$phase || scope.$digest();
          scope.$isShown = false;
          if (options.backdrop) {
            modalElement.off('click', hideOnBackdropClick);
            backdropElement.off('click', hideOnBackdropClick);
          }
          if (options.keyboard) {
            modalElement.off('keyup', $modal.$onKeyUp);
          }
        };
        $modal.toggle = function () {
          scope.$isShown ? $modal.hide() : $modal.show();
        };
        $modal.focus = function () {
          modalElement[0].focus();
        };
        $modal.$onKeyUp = function (evt) {
          evt.which === 27 && $modal.hide();
        };
        function hideOnBackdropClick(evt) {
          if (evt.target !== evt.currentTarget)
            return;
          options.backdrop === 'static' ? $modal.focus() : $modal.hide();
        }
        return $modal;
      }
      return ModalFactory;
    }
  ];
}).directive('bsModal', [
  '$window',
  '$location',
  '$sce',
  '$modal',
  function ($window, $location, $sce, $modal) {
    return {
      restrict: 'EAC',
      scope: true,
      link: function postLink(scope, element, attr, transclusion) {
        var options = {
            scope: scope,
            element: element,
            show: false
          };
        angular.forEach([
          'template',
          'placement',
          'backdrop',
          'keyboard',
          'html',
          'container',
          'animation'
        ], function (key) {
          if (angular.isDefined(attr[key]))
            options[key] = attr[key];
        });
        angular.forEach([
          'title',
          'content'
        ], function (key) {
          attr[key] && attr.$observe(key, function (newValue, oldValue) {
            scope[key] = newValue;
          });
        });
        attr.bsModal && scope.$watch(attr.bsModal, function (newValue, oldValue) {
          if (angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.content = newValue;
          }
        }, true);
        var modal = $modal(options);
        element.on(attr.trigger || 'click', modal.toggle);
        scope.$on('$destroy', function () {
          modal.destroy();
          options = null;
          modal = null;
        });
      }
    };
  }
]);