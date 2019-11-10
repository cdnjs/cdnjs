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

  module.directive('nsPopover', function($timeout, $templateCache, $q, $http, $compile, $document) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        var options = {
          template: attrs.nsPopoverTemplate,
          theme: attrs.nsPopoverTheme || 'ns-popover-default-theme',
          plain: attrs.nsPopoverPlain,
          trigger: attrs.nsPopoverTrigger || 'click',
          container: attrs.nsPopoverContainer,
          placement: attrs.nsPopoverPlacement || 'bottom'
        };

        var timeoutId_ = {};

        var $container = $el(options.container);
        if (!$container.length) {
          $container = $document.find('body');
        }

        var $popover = $el('<div></div>');

        $q.when(loadTemplate(options.template, options.plain)).then(function(template) {
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

          $popover.css('display', 'block');

          // position the popover accordingly to the defined placement around the
          // |elm|.
          move($popover, options.placement, elm[0].getBoundingClientRect());

          // Hide the popover without delay on click events.
          $popover.on('click', function() {
            timeoutId_ = hide($popover, 0);
          });
        });

        elm.on('mouseout', function() {
          timeoutId_ = hide($popover);
        });

        $popover
          .on('mouseout', function(e) {
            timeoutId_ = hide($popover);
          })
          .on('mouseover', function() {
            $timeout.cancel(timeoutId_);
          });

        /**
         * Move the popover to the |placement| position of the object located on the |rect|.
         *
         * @param popover {Object} The popover object to be moved.
         * @param placement {String} The relative position to move the popover - top | bottom | left | right.
         * @param rect {ClientRect} The ClientRect of the object to move the popover around.
         */
        function move(popover, placement, rect) {
          var popoverRect = popover[0].getBoundingClientRect();
          var top, left;
          if (placement === 'top') {
            top = rect.top - popoverRect.height - 1;
            left = rect.left;
          } else if (placement === 'right') {
            top = rect.top;
            left = rect.right +1;
          } else if (placement === 'bottom') {
            top = rect.bottom + 1;
            left = rect.left;
          } else if (placement === 'left') {
            top = rect.top;
            left = rect.left - popoverRect.width - 1;
          }
          popover
            .css('top', top.toString() + 'px')
            .css('left', left.toString() + 'px');
        }

        /**
         * Set the display property of the popover to 'none' after |delay| milliseconds.
         *
         * @param popover {Object} The popover to set the display property.
         * @param delay {Number}  The time (in milliseconds) to wait before set the display property.
         * @returns {Object|promise} A promise returned from the $timeout service that can be used
         *                           to cancel the hiding operation.
         */
        function hide(popover, delay) {
          $timeout.cancel(timeoutId_);

          // delay the hiding operation for 1.5s by default.
          if (!isDef(delay)) {
            delay = 1500;
          }

          return $timeout(function() {
            popover.css('display', 'none');
          }, delay);
        }

        /**
         * Load the given template in the cache if it is not already loaded.
         *
         * @param template The URI of the template to be loaded.
         * @returns {String} A promise that the template will be loaded.
         * @remarks If the template is null or undefined a empty string will be returned.
         */
        function loadTemplate(template, plain) {
          if (!template) {
            return '';
          }

          if (angular.isString(template) && plain) {
            return template;
          }

          return $templateCache.get(template) || $http.get(template, { cache : true });
        }
      }
    };
  });
})(window, window.angular);