/**
 * angular-strap
 * @version v2.3.7 - 2016-01-16
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

angular.module('mgcrea.ngStrap.modal', [ 'mgcrea.ngStrap.core', 'mgcrea.ngStrap.helpers.dimensions' ]).provider('$modal', function() {
  var defaults = this.defaults = {
    animation: 'am-fade',
    backdropAnimation: 'am-fade',
    customClass: '',
    prefixClass: 'modal',
    prefixEvent: 'modal',
    placement: 'top',
    templateUrl: 'modal/modal.tpl.html',
    template: '',
    contentTemplate: false,
    container: false,
    element: null,
    backdrop: true,
    keyboard: true,
    html: false,
    show: true
  };
  this.$get = [ '$window', '$rootScope', '$bsCompiler', '$animate', '$timeout', '$sce', 'dimensions', function($window, $rootScope, $bsCompiler, $animate, $timeout, $sce, dimensions) {
    var forEach = angular.forEach;
    var requestAnimationFrame = $window.requestAnimationFrame || $window.setTimeout;
    var bodyElement = angular.element($window.document.body);
    var backdropCount = 0;
    var dialogBaseZindex = 1050;
    var backdropBaseZindex = 1040;
    function ModalFactory(config) {
      var $modal = {};
      var options = $modal.$options = angular.extend({}, defaults, config);
      var promise = $modal.$promise = $bsCompiler.compile(options);
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
      var compileData;
      var modalElement;
      var modalScope;
      var backdropElement = angular.element('<div class="' + options.prefixClass + '-backdrop"/>');
      backdropElement.css({
        position: 'fixed',
        top: '0px',
        left: '0px',
        bottom: '0px',
        right: '0px'
      });
      promise.then(function(data) {
        compileData = data;
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
        destroyModalElement();
        if (backdropElement) {
          backdropElement.remove();
          backdropElement = null;
        }
        scope.$destroy();
      };
      $modal.show = function() {
        if ($modal.$isShown) return;
        var parent;
        var after;
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
        if (modalElement) destroyModalElement();
        modalScope = $modal.$scope.$new();
        modalElement = $modal.$element = compileData.link(modalScope, function(clonedElement, scope) {});
        if (options.backdrop) {
          modalElement.css({
            'z-index': dialogBaseZindex + backdropCount * 20
          });
          backdropElement.css({
            'z-index': backdropBaseZindex + backdropCount * 20
          });
          backdropCount++;
        }
        if (scope.$emit(options.prefixEvent + '.show.before', $modal).defaultPrevented) {
          return;
        }
        modalElement.css({
          display: 'block'
        }).addClass(options.placement);
        if (options.customClass) {
          modalElement.addClass(options.customClass);
        }
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
        bindBackdropEvents();
        bindKeyboardEvents();
      };
      function enterAnimateCallback() {
        scope.$emit(options.prefixEvent + '.show', $modal);
      }
      $modal.hide = function() {
        if (!$modal.$isShown) return;
        if (options.backdrop) {
          backdropCount--;
        }
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
        unbindBackdropEvents();
        unbindKeyboardEvents();
      };
      function leaveAnimateCallback() {
        scope.$emit(options.prefixEvent + '.hide', $modal);
        bodyElement.removeClass(options.prefixClass + '-open');
        if (options.animation) {
          bodyElement.removeClass(options.prefixClass + '-with-' + options.animation);
        }
      }
      $modal.toggle = function() {
        if ($modal.$isShown) {
          $modal.hide();
        } else {
          $modal.show();
        }
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
      function bindBackdropEvents() {
        if (options.backdrop) {
          modalElement.on('click', hideOnBackdropClick);
          backdropElement.on('click', hideOnBackdropClick);
          backdropElement.on('wheel', preventEventDefault);
        }
      }
      function unbindBackdropEvents() {
        if (options.backdrop) {
          modalElement.off('click', hideOnBackdropClick);
          backdropElement.off('click', hideOnBackdropClick);
          backdropElement.off('wheel', preventEventDefault);
        }
      }
      function bindKeyboardEvents() {
        if (options.keyboard) {
          modalElement.on('keyup', $modal.$onKeyUp);
        }
      }
      function unbindKeyboardEvents() {
        if (options.keyboard) {
          modalElement.off('keyup', $modal.$onKeyUp);
        }
      }
      function hideOnBackdropClick(evt) {
        if (evt.target !== evt.currentTarget) return;
        if (options.backdrop === 'static') {
          $modal.focus();
        } else {
          $modal.hide();
        }
      }
      function preventEventDefault(evt) {
        evt.preventDefault();
      }
      function destroyModalElement() {
        if ($modal.$isShown && modalElement !== null) {
          unbindBackdropEvents();
          unbindKeyboardEvents();
        }
        if (modalScope) {
          modalScope.$destroy();
          modalScope = null;
        }
        if (modalElement) {
          modalElement.remove();
          modalElement = $modal.$element = null;
        }
      }
      return $modal;
    }
    function safeDigest(scope) {
      scope.$$phase || scope.$root && scope.$root.$$phase || scope.$digest();
    }
    function findElement(query, element) {
      return angular.element((element || document).querySelectorAll(query));
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
      angular.forEach([ 'template', 'templateUrl', 'controller', 'controllerAs', 'contentTemplate', 'placement', 'backdrop', 'keyboard', 'html', 'container', 'animation', 'backdropAnimation', 'id', 'prefixEvent', 'prefixClass', 'customClass', 'modalClass' ], function(key) {
        if (angular.isDefined(attr[key])) options[key] = attr[key];
      });
      if (options.modalClass) {
        options.customClass = options.modalClass;
      }
      var falseValueRegExp = /^(false|0|)$/i;
      angular.forEach([ 'backdrop', 'keyboard', 'html', 'container' ], function(key) {
        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) options[key] = false;
      });
      angular.forEach([ 'title', 'content' ], function(key) {
        if (attr[key]) {
          attr.$observe(key, function(newValue, oldValue) {
            scope[key] = $sce.trustAsHtml(newValue);
          });
        }
      });
      if (attr.bsModal) {
        scope.$watch(attr.bsModal, function(newValue, oldValue) {
          if (angular.isObject(newValue)) {
            angular.extend(scope, newValue);
          } else {
            scope.content = newValue;
          }
        }, true);
      }
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