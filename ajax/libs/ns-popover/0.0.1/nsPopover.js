(function(window, angular, undefined){
  'use strict';

  var module = angular.module('nsPopover', []);
  var $el = angular.element;
  var isDef = angular.isDefined;
  var forEach = angular.forEach;

  /**
   * Extends the destination objec 'dst' by copying all of the properties from the 'src' object(s)
   * to 'dst'. Multiple src objects could be specified. 'undefined' values are not copied.
   *
   * @param {Object} dst The destination object.
   * @param {Object} src The spurce object.
   * @returns {Object} Reference to 'dst'.
   */
  var extend_ = function extend(dst, src) {
    forEach(arguments, function(obj) {
      if (obj !== src) {
        forEach(obj, function(value, key) {
          if (isDef(value)) {
            dst[key] = value;
          }
        });
      }
    });
  };

  /*module.provider('nsPopover', function() {
    var defaults_ = this.default_ = {
      placement: 'right',
      plain: false
    };

    var globalId_ = 0;

    this.$get('$document','$templateCache', '$compile', '$q', '$http', '$rootScope', '$timeout',
      function ($document, $templateCache, $compile, $q, $http, $rootScope, $timeout) {
        var $body = $document.find('body');

        var methods_ = {
          show: function(opts) {
            var options = angular.copy(defaults_);

            opts = opts || {};
            extend_(options, opts);

            globalId_ += 1;

            var scope = angular.isObject(options.scope) ? options.scope : $rootScope.$new();
            var $popover;

            $q.when(loadTemplate(options.template)).then(function(template) {
              template = angular.isString(template) ?
                template :
                template.data && angular.isString(template.data) ?
                  template.data :
                  '';

              $popover = $el('<div> class="ns-popover" id="ns-popover' + globalId_ + '"></div>');
              $popover.html(template);

              if (options.theme) {
                $popover.addClass(options.theme);
              }

              $timeout(function() {
                $compile($popover)(scope);
              });

              scope.$on('$destroy', function() {
                $popover.remove();
              });

              $body.append($popover);

              return methods_;
            });

            function loadTemplate(template) {
              if (!template) {
                return 'Empty template';
              }

              if (angular.isString(template) && options.plain) {
                return template;
              }

              return $templateCache.get(template) || $http.get(template, { cache : true });
            }
          }
        }
      });
  });*/

  module.directive('nsPopover', function($timeout, $templateCache, $q, $http, $compile, $document) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        var options = {
          template: attrs.nsPopoverTemplate,
          theme: attrs.nsPopoverTheme || 'ns-popover-default-theme',
          plain: attrs.nsPopoverPlain,
          trigger: attrs.nsPopoverTrigger || 'click',
          container: attrs.nsPopoverContainer
        };

        var timeoutId_ = {};

        var $container = $el(options.container);
        if (!$container.length) {
          $container = $document.find('body');
        }

        var $popover = $el('<div></div>');

        $q.when(loadTemplate(options.template)).then(function(template) {
          template = angular.isString(template) ?
            template :
            template.data && angular.isString(template.data) ?
              template.data :
              '';

          $popover.html(template);

          if (options.theme) {
            $popover.addClass(options.theme);
          }

          $timeout(function() {
            $compile($popover)(scope);
          });

          scope.$on('$destroy', function() {
            $popover.remove();
          });

          $popover
            .css('position', 'absolute')
            .css('display', 'none');

          $container.append($popover);
        });

        elm.on(options.trigger, function(e) {
          e.preventDefault();

          $timeout.cancel(timeoutId_);

          var rect = elm[0].getBoundingClientRect();
          $popover
            .css('display', 'block')
            .css('top', rect.bottom + 1 + 'px')
            .css('left', rect.left + 'px');

          $popover.on('click', function() {
            timeoutId_ = hide(0);
          });
        });

        $popover
          .on('mouseout', function(e) {
            timeoutId_ = hide();
          })
          .on('mouseover', function() {
            $timeout.cancel(timeoutId_);
          });

        function hide(delay) {
          $timeout.cancel(timeoutId_);

          // delay the hide to 1.5s by default.
          if (!isDef(delay)) {
            delay = 1500;
          }

          return $timeout(function() {
            $popover.css('display', 'none');
          }, delay);
        }

        function loadTemplate(template) {
          if (!template) {
            return '';
          }

          if (angular.isString(template) && options.plain) {
            return template;
          }

          return $templateCache.get(template) || $http.get(template, { cache : true });
        }
      }
    };
  });
})(window, window.angular);