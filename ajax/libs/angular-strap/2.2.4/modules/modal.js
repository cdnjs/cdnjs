/**
 * angular-strap
 * @version v2.2.4 - 2015-05-28
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.modal', [ 'mgcrea.ngStrap.helpers.dimensions' ]).provider('$modal', function() {
  var defaults = this.defaults = {
    animation: 'am-fade',
    backdropAnimation: 'am-fade',
    prefixClass: 'modal',
    prefixEvent: 'modal',
    placement: 'top',
    template: 'modal/modal.tpl.html',
    contentTemplate: false,
    container: false,
    element: null,
    backdrop: true,
    keyboard: true,
    html: false,
    show: true
  };
  this.$get = [ '$window', '$rootScope', '$compile', '$q', '$templateCache', '$http', '$animate', '$timeout', '$sce', 'dimensions', function($window, $rootScope, $compile, $q, $templateCache, $http, $animate, $timeout, $sce, dimensions) {
    var forEach = angular.forEach;
    var trim = String.prototype.trim;
    var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
    var bodyElement = angular.element($window.document.body);
    var htmlReplaceRegExp = /ng-bind="/gi;
    function ModalFactory(config) {
      var $modal = {};
      var options = $modal.$options = angular.extend({}, defaults, config);
      $modal.$promise = fetchTemplate(options.template);
      var scope = $modal.$scope = options.scope && options.scope.$new() || $rootScope.$new();
      if (!options.element && !options.container) {
        options.container = 'body';
      }
      $modal.$id = options.id || options.element && options.element.attr('id') || '';
      forEach([ 'title', 'content' ], function(key) {
        if (options[key]) scope[key] = $sce.trustAsHtml(options[key]);
      });
      scope.$hide = function() {
        scope.$$postDigest(function() {
          $modal.hide();
        });
      };
      scope.$show = function() {
        scope.$$postDigest(function() {
          $modal.show();
        });
      };
      scope.$toggle = function() {
        scope.$$postDigest(function() {
          $modal.toggle();
        });
      };
      $modal.$isShown = scope.$isShown = false;
      if (options.contentTemplate) {
        $modal.$promise = $modal.$promise.then(function(template) {
          var templateEl = angular.element(template);
          return fetchTemplate(options.contentTemplate).then(function(contentTemplate) {
            var contentEl = findElement('[ng-bind="content"]', templateEl[0]).removeAttr('ng-bind').html(contentTemplate);
            if (!config.template) contentEl.next().remove();
            return templateEl[0].outerHTML;
          });
        });
      }
      var modalLinker, modalElement;
      var backdropElement = angular.element('<div class="' + options.prefixClass + '-backdrop"/>');
      backdropElement.css({
        position: 'fixed',
        top: '0px',
        left: '0px',
        bottom: '0px',
        right: '0px',
        'z-index': 1038
      });
      $modal.$promise.then(function(template) {
        if (angular.isObject(template)) template = template.data;
        if (options.html) template = template.replace(htmlReplaceRegExp, 'ng-bind-html="');
        template = trim.apply(template);
        modalLinker = $compile(template);
        $modal.init();
      });
      $modal.init = function() {
        if (options.show) {
          scope.$$postDigest(function() {
            $modal.show();
          });
        }
      };
      $modal.destroy = function() {
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
      $modal.show = function() {
        if ($modal.$isShown) return;
        var parent, after;
        if (angular.isElement(options.container)) {
          parent = options.container;
          after = options.container[0].lastChild ? angular.element(options.container[0].lastChild) : null;
        } else {
          if (options.container) {
            parent = findElement(options.container);
            after = parent[0] && parent[0].lastChild ? angular.element(parent[0].lastChild) : null;
          } else {
            parent = null;
            after = options.element;
          }
        }
        modalElement = $modal.$element = modalLinker(scope, function(clonedElement, scope) {});
        if (scope.$emit(options.prefixEvent + '.show.before', $modal).defaultPrevented) {
          return;
        }
        modalElement.css({
          display: 'block'
        }).addClass(options.placement);
        if (options.animation) {
          if (options.backdrop) {
            backdropElement.addClass(options.backdropAnimation);
          }
          modalElement.addClass(options.animation);
        }
        if (options.backdrop) {
          $animate.enter(backdropElement, bodyElement, null);
        }
        if (angular.version.minor <= 2) {
          $animate.enter(modalElement, parent, after, enterAnimateCallback);
        } else {
          $animate.enter(modalElement, parent, after).then(enterAnimateCallback);
        }
        $modal.$isShown = scope.$isShown = true;
        safeDigest(scope);
        var el = modalElement[0];
        requestAnimationFrame(function() {
          el.focus();
        });
        bodyElement.addClass(options.prefixClass + '-open');
        if (options.animation) {
          bodyElement.addClass(options.prefixClass + '-with-' + options.animation);
        }
        if (options.backdrop) {
          modalElement.on('click', hideOnBackdropClick);
          backdropElement.on('click', hideOnBackdropClick);
          backdropElement.on('wheel', preventEventDefault);
        }
        if (options.keyboard) {
          modalElement.on('keyup', $modal.$onKeyUp);
        }
      };
      function enterAnimateCallback() {
        scope.$emit(options.prefixEvent + '.show', $modal);
      }
      $modal.hide = function() {
        if (!$modal.$isShown) return;
        if (scope.$emit(options.prefixEvent + '.hide.before', $modal).defaultPrevented) {
          return;
        }
        if (angular.version.minor <= 2) {
          $animate.leave(modalElement, leaveAnimateCallback);
        } else {
          $animate.leave(modalElement).then(leaveAnimateCallback);
        }
        if (options.backdrop) {
          $animate.leave(backdropElement);
        }
        $modal.$isShown = scope.$isShown = false;
        safeDigest(scope);
        if (options.backdrop) {
          modalElement.off('click', hideOnBackdropClick);
          backdropElement.off('click', hideOnBackdropClick);
          backdropElement.off('wheel', preventEventDefault);
        }
        if (options.keyboard) {
          modalElement.off('keyup', $modal.$onKeyUp);
        }
      };
      function leaveAnimateCallback() {
        scope.$emit(options.prefixEvent + '.hide', $modal);
        bodyElement.removeClass(options.prefixClass + '-open');
        if (options.animation) {
          bodyElement.removeClass(options.prefixClass + '-with-' + options.animation);
        }
      }
      $modal.toggle = function() {
        $modal.$isShown ? $modal.hide() : $modal.show();
      };
      $modal.focus = function() {
        modalElement[0].focus();
      };
      $modal.$onKeyUp = function(evt) {
        if (evt.which === 27 && $modal.$isShown) {
          $modal.hide();
          evt.stopPropagation();
        }
      };
      function hideOnBackdropClick(evt) {
        if (evt.target !== evt.currentTarget) return;
        options.backdrop === 'static' ? $modal.focus() : $modal.hide();
      }
      function preventEventDefault(evt) {
        evt.preventDefault();
      }
      return $modal;
    }
    function safeDigest(scope) {
      scope.$$phase || scope.$root && scope.$root.$$phase || scope.$digest();
    }
    function findElement(query, element) {
      return angular.element((element || document).querySelectorAll(query));
    }
    var fetchPromises = {};
    function fetchTemplate(template) {
      if (fetchPromises[template]) return fetchPromises[template];
      return fetchPromises[template] = $http.get(template, {
        cache: $templateCache
      }).then(function(res) {
        return res.data;
      });
    }
    return ModalFactory;
  } ];
}).directive('bsModal', [ '$window', '$sce', '$modal', function($window, $sce, $modal) {
  return {
    restrict: 'EAC',
    scope: true,
    link: function postLink(scope, element, attr, transclusion) {
      var options = {
        scope: scope,
        element: element,
        show: false
      };
      angular.forEach([ 'template', 'contentTemplate', 'placement', 'backdrop', 'keyboard', 'html', 'container', 'animation', 'id', 'prefixEvent', 'prefixClass' ], function(key) {
        if (angular.isDefined(attr[key])) options[key] = attr[key];
      });
      var falseValueRegExp = /^(false|0|)$/i;
      angular.forEach([ 'backdrop', 'keyboard', 'html', 'container' ], function(key) {
        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) options[key] = false;
      });
      angular.forEach([ 'title', 'content' ], function(key) {
        attr[key] && attr.$observe(key, function(newValue, oldValue) {
          scope[key] = $sce.trustAsHtml(newValue);
        });
      });
      attr.bsModal && scope.$watch(attr.bsModal, function(newValue, oldValue) {
        if (angular.isObject(newValue)) {
          angular.extend(scope, newValue);
        } else {
          scope.content = newValue;
        }
      }, true);
      var modal = $modal(options);
      element.on(attr.trigger || 'click', modal.toggle);
      scope.$on('$destroy', function() {
        if (modal) modal.destroy();
        options = null;
        modal = null;
      });
    }
  };
} ]);