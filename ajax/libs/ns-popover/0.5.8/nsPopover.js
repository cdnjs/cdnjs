(function(window, angular, undefined){
  'use strict';

  var module = angular.module('nsPopover', []);
  var $el = angular.element;
  var isDef = angular.isDefined;
  var forEach = angular.forEach;
  var $popovers = [];
  var globalId = 0;

  module.directive('nsPopover', function($timeout, $templateCache, $q, $http, $compile, $document) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        var options = {
          template: attrs.nsPopoverTemplate,
          theme: attrs.nsPopoverTheme || 'ns-popover-list-theme',
          plain: attrs.nsPopoverPlain,
          trigger: attrs.nsPopoverTrigger || 'click',
          container: attrs.nsPopoverContainer,
          placement: attrs.nsPopoverPlacement || 'bottom|left',
          timeout: attrs.nsPopoverTimeout || 1.5
        };

        var hider_ = {
          id_: undefined,

          /**
           * Set the display property of the popover to 'none' after |delay| milliseconds.
           *
           * @param popover {Object} The popover to set the display property.
           * @param delay {Number}  The time (in seconds) to wait before set the display property.
           * @returns {Object|promise} A promise returned from the $timeout service that can be used
           *                           to cancel the hiding operation.
           */
          hide: function(popover, delay) {
            $timeout.cancel(hider_.id_);

            // delay the hiding operation for 1.5s by default.
            if (!isDef(delay)) {
              delay = 1.5;
            }

            hider_.id_ = $timeout(function() {
              popover.css('display', 'none');
            }, delay*1000);
          },

          cancel: function() {
            $timeout.cancel(hider_.id_);
          }
        };

        var $container = $el(options.container);
        if (!$container.length) {
          $container = $document.find('body');
        }

        var $triangle;
        var placement_;
        var align_;

        globalId += 1;

        var $popover = $el('<div id="nspopover-' + globalId +'"></div>');
        $popovers.push($popover);

        var match = options.placement
          .match(/^(top|bottom|left|right)$|((top|bottom)\|(center|left|right)+)|((left|right)\|(center|top|bottom)+)/);

        if (!match) {
          throw new Error('"' + options.placement + '" is not a valid placement or has a invalid combination of placements.');
        }

        placement_ = match[6] || match[3] || match[1];
        align_ = match[7] || match[4] || match[2] || 'center';

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

          // Add classes that identifies the pacement and alignment of the popver
          // which allows the customization of the popover based on its position.
          $popover
            .addClass('ns-popover-' + placement_ + '-placement')
            .addClass('ns-popover-' + align_ + '-align');

          $timeout(function() {
            $compile($popover)(scope);
          });

          scope.$on('$destroy', function() {
            $popover.remove();
          });

          $popover
            .css('position', 'absolute')
            .css('display', 'none');

          // When the tooltip style is used we need to position the triangle in the
          // center of the triggering element. We try first to find the elements that
          // has the |triangle| class using the find method, hoping that the full jquery
          // library is in use.
          $triangle = $popover.find('.triangle');

          // If the element is not found through the use of its class we will assume
          // that the full jquery library is not in use and will try to find the
          // triangle by inspecting each child of the |popover|.
          if (!$triangle.length) {
            var children = $popover.children();
            for(var i = 0; i < children.length; ++i) {
              var triangle = $el(children[i]);
              if (triangle.hasClass('triangle')) {
                $triangle = triangle;
                break;
              }
            }
          }

          $container.append($popover);
        });

        elm.on(options.trigger, function(e) {
          e.preventDefault();

          hider_.cancel();

          $popover.css('display', 'block');

          // position the popover accordingly to the defined placement around the
          // |elm|.
          move($popover, placement_, align_, getBoundingClientRect(elm[0]), $triangle);

          // Hide the popover without delay on click events.
          $popover.on('click', function() {
            hider_.hide($popover, 0);
          });
        });

        elm
          .on('mouseout', function() {
            hider_.hide($popover, options.timeout);
          })
          .on('mouseover', function() {
            hider_.cancel();
          });

        $popover
          .on('mouseout', function(e) {
            hider_.hide($popover, options.timeout);
          })
          .on('mouseover', function() {
            hider_.cancel();
          });

        /**
         * Move the popover to the |placement| position of the object located on the |rect|.
         *
         * @param popover {Object} The popover object to be moved.
         * @param placement {String} The relative position to move the popover - top | bottom | left | right.
         * @param align {String} The way the popover should be aligned - center | left | right.
         * @param rect {ClientRect} The ClientRect of the object to move the popover around.
         * @param triangle {Object} The element that contains the popover's triangle. This can be null.
         */
        function move(popover, placement, align, rect, triangle) {
          var popoverRect = getBoundingClientRect(popover[0]);
          var top, left;

          var positionX = function() {
            if (align === 'center') {
              return Math.round(rect.left + rect.width/2 - popoverRect.width/2);
            } else if(align === 'right') {
              return rect.right - popoverRect.width;
            }
            return rect.left;
          };

          var positionY = function() {
            if (align === 'center') {
              return Math.round(rect.top + rect.height/2 - popoverRect.height/2);
            } else if(align === 'bottom') {
              return rect.bottom - popoverRect.height;
            }
            return rect.top;
          };

          if (placement === 'top') {
            top = rect.top - popoverRect.height;
            left = positionX();
          } else if (placement === 'right') {
            top = positionY();
            left = rect.right;
          } else if (placement === 'bottom') {
            top = rect.bottom;
            left = positionX();
          } else if (placement === 'left') {
            top = positionY();
            left = rect.left - popoverRect.width;
          }

          popover
            .css('top', top.toString() + 'px')
            .css('left', left.toString() + 'px');

          if (triangle) {
            if (placement === 'top' || placement === 'bottom') {
              left = rect.left + rect.width / 2 - left;
              triangle.css('left', left.toString() + 'px');
            } else {
              top = rect.top + rect.height / 2 - top;
              triangle.css('top', top.toString()  + 'px');
            }
          }
        }

        function getBoundingClientRect(elm) {
          var w = window;
          var doc = document.documentElement || document.body.parentNode || document.body;
          var x = (isDef(w.pageXOffset)) ? w.pageXOffset : doc.scrollLeft;
          var y = (isDef(w.pageYOffset)) ? w.pageYOffset : doc.scrollTop;
          var rect = elm.getBoundingClientRect();

          // ClientRect class is immutable, so we need to return a modified copy
          // of it when the window has been scrolled.
          if (x || y) {
            return {
              bottom:rect.bottom+y,
              left:rect.left + x,
              right:rect.right + x,
              top:rect.top + y,
              height:rect.height,
              width:rect.width
            };
          }
          return rect;
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