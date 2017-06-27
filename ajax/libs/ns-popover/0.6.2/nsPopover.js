(function(window, angular, undefined){
  'use strict';

  var module = angular.module('nsPopover', []);
  var $el = angular.element;
  var isDef = angular.isDefined;
  var forEach = angular.forEach;
  var $popovers = [];
  var globalId = 0;

  module.provider('nsPopover', function () {
    var defaults = {
      template: '',
      theme: 'ns-popover-list-theme',
      plain: 'false',
      trigger: 'click',
      angularEvent: '',
      container: 'body',
      placement: 'bottom|left',
      timeout: 1.5,
      hideOnClick: 'true',
      mouseRelative: ''
    };

    this.setDefaults = function (newDefaults) {
      angular.extend(defaults, newDefaults);
    };

    this.$get = [
      function () {
        return {
          getDefaults: function () {
            return defaults;
          }
        };
      }];
  });

  module.directive('nsPopover', ['nsPopover', '$rootScope', '$timeout', '$templateCache', '$q', '$http', '$compile', '$document', function(nsPopover, $rootScope, $timeout, $templateCache, $q, $http, $compile, $document) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elm, attrs) {
        var defaults = nsPopover.getDefaults();

        var options = {
          template: attrs.nsPopoverTemplate || defaults.template,
          theme: attrs.nsPopoverTheme || defaults.theme,
          plain: toBoolean(attrs.nsPopoverPlain || defaults.plain),
          trigger: attrs.nsPopoverTrigger || defaults.trigger,
          angularEvent: attrs.nsPopoverAngularEvent || defaults.angularEvent,
          container: attrs.nsPopoverContainer || defaults.container,
          placement: attrs.nsPopoverPlacement || defaults.placement,
          timeout: attrs.nsPopoverTimeout || defaults.timeout,
          hideOnClick: toBoolean(attrs.nsPopoverHideOnClick || defaults.hideOnClick),
          mouseRelative: attrs.nsPopoverMouseRelative
        };

        if (options.mouseRelative) {
          options.mouseRelativeX = options.mouseRelative.indexOf('x') !== -1;
          options.mouseRelativeY = options.mouseRelative.indexOf('y') !== -1;
        }

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

        var $container = $document[0].querySelector(options.container);
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

          scope.hidePopover = function() {
            hider_.hide($popover, 0);
          };

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
        
        if (options.angularEvent) {
          $rootScope.$on(options.angularEvent, function(){
            hider_.cancel();

            $popover.css('display', 'block');

            // position the popover accordingly to the defined placement around the
            // |elm|.
            var elmRect = getBoundingClientRect(elm[0]);

            move($popover, placement_, align_, elmRect, $triangle);

            if (options.hideOnClick) {
              // Hide the popover without delay on click events.
              $popover.on('click', function () {
                hider_.hide($popover, 0);
              });
            }
          });          
        } else {
          elm.on(options.trigger, function(e) {
            e.preventDefault();
  
            hider_.cancel();
  
            $popover.css('display', 'block');
  
            // position the popover accordingly to the defined placement around the
            // |elm|.
            var elmRect = getBoundingClientRect(elm[0]);
  
            // If the mouse-relative options is specified we need to adjust the
            // element client rect to the current mouse coordinates.
            if (options.mouseRelative) {
              elmRect = adjustRect(elmRect, options.mouseRelativeX, options.mouseRelativeY, e);
            }
  
            move($popover, placement_, align_, elmRect, $triangle);
  
            if (options.hideOnClick) {
              // Hide the popover without delay on click events.
              $popover.on('click', function () {
                hider_.hide($popover, 0);
              });
            }
          });
        }

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

        /**
         * Adjust a rect accordingly to the given x and y mouse positions.
         *
         * @param rect {ClientRect} The rect to be adjusted.
         */
        function adjustRect(rect, adjustX, adjustY, ev) {
          // if pageX or pageY is defined we need to lock the popover to the given
          // x and y position.
          // clone the rect, so we can manipulate its properties.
          var localRect = {
            bottom: rect.bottom,
            height: rect.height,
            left: rect.left,
            right: rect.right,
            top: rect.top,
            width: rect.width
          };

          if (adjustX) {
            localRect.left = ev.pageX;
            localRect.right = ev.pageX;
            localRect.width = 0;
          }

          if (adjustY) {
            localRect.top = ev.pageY;
            localRect.bottom = ev.pageY;
            localRect.height = 0;
          }

          return localRect;
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

        function toBoolean(value) {
          if (value && value.length !== 0) {
            var v = ("" + value).toLowerCase();
            value = (v == 'true');
          } else {
            value = false;
          }
          return value;
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
  }]);
})(window, window.angular);
