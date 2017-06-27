(function(window, angular, undefined){
  'use strict';

  var module = angular.module('nsPopover', []);
  var $el = angular.element;
  var isDef = angular.isDefined;
  var $popovers = [];
  var globalId = 0;

  module.provider('nsPopover', function () {
    var defaults = {
      template: '',
      theme: 'ns-popover-list-theme',
      plain: 'false',
      trigger: 'click',
      triggerPrevent: true,
      angularEvent: '',
      scopeEvent: '',
      container: 'body',
      placement: 'bottom|left',
      timeout: 1.5,
      hideOnInsideClick: false,
      hideOnOutsideClick: true,
      hideOnButtonClick: true,
      mouseRelative: '',
      popupDelay: 0
    };

    this.setDefaults = function(newDefaults) {
      angular.extend(defaults, newDefaults);
    };

    this.$get = function () {
      return {
        getDefaults: function () {
          return defaults;
        }
      };
    };
  });

  module.directive('nsPopover', ['nsPopover','$rootScope','$timeout','$templateCache','$q','$http','$compile','$document','$parse',
    function(nsPopover, $rootScope, $timeout, $templateCache, $q, $http, $compile, $document, $parse) {
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
            triggerPrevent: attrs.nsPopoverTriggerPrevent || defaults.triggerPrevent,
            angularEvent: attrs.nsPopoverAngularEvent || defaults.angularEvent,
            scopeEvent: attrs.nsPopoverScopeEvent || defaults.scopeEvent,
            container: attrs.nsPopoverContainer || defaults.container,
            placement: attrs.nsPopoverPlacement || defaults.placement,
            timeout: attrs.nsPopoverTimeout || defaults.timeout,
            hideOnInsideClick: toBoolean(attrs.nsPopoverHideOnInsideClick || defaults.hideOnInsideClick),
            hideOnOutsideClick: toBoolean(attrs.nsPopoverHideOnOutsideClick || defaults.hideOnOutsideClick),
            hideOnButtonClick: toBoolean(attrs.nsPopoverHideOnButtonClick || defaults.hideOnButtonClick),
            mouseRelative: attrs.nsPopoverMouseRelative,
            popupDelay: attrs.nsPopoverPopupDelay || defaults.popupDelay,
            group: attrs.nsPopoverGroup
          };

          if (options.mouseRelative) {
            options.mouseRelativeX = options.mouseRelative.indexOf('x') !== -1;
            options.mouseRelativeY = options.mouseRelative.indexOf('y') !== -1;
          }

          var displayer_ = {
            id_: undefined,

            /**
             * Set the display property of the popover to 'block' after |delay| milliseconds.
             *
             * @param delay {Number}  The time (in seconds) to wait before set the display property.
             * @param e {Event}  The event which caused the popover to be shown.
             */
            display: function(delay, e) {
              // Disable popover if ns-popover value is false
              if ($parse(attrs.nsPopover)(scope) === false) {
                return;
              }

              $timeout.cancel(displayer_.id_);

              if (!isDef(delay)) {
                delay = 0;
              }

              // hide any popovers being displayed
              if (options.group) {
                $rootScope.$broadcast('ns:popover:hide', options.group);
              }

              displayer_.id_ = $timeout(function() {
                $popover.isOpen = true;
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

                if (options.hideOnInsideClick) {
                  // Hide the popover without delay on the popover click events.
                  $popover.on('click', insideClickHandler);
                }
                if (options.hideOnOutsideClick) {
                  // Hide the popover without delay on outside click events.
                  $document.on('click', outsideClickHandler);
                }
                if (options.hideOnButtonClick) {
                  // Hide the popover without delay on the button click events.
                  elm.on('click', buttonClickHandler);
                }
              }, delay*1000);
            },

            cancel: function() {
              $timeout.cancel(displayer_.id_);
            }
          };

          var hider_ = {
            id_: undefined,

            /**
             * Set the display property of the popover to 'none' after |delay| milliseconds.
             *
             * @param delay {Number}  The time (in seconds) to wait before set the display property.
             */
            hide: function(delay) {
              $timeout.cancel(hider_.id_);

              // do not hide if -1 is passed in.
              if(delay !== "-1") {
                // delay the hiding operation for 1.5s by default.
                if (!isDef(delay)) {
                  delay = 1.5;
                }

                hider_.id_ = $timeout(function() {
                  $popover.off('click', insideClickHandler);
                  $document.off('click', outsideClickHandler);
                  elm.off('click', buttonClickHandler);
                  $popover.isOpen = false;
                  displayer_.cancel();
                  $popover.css('display', 'none');
                }, delay*1000);
              }
            },

            cancel: function() {
              $timeout.cancel(hider_.id_);
            }
          };

          var $container = $document.find(options.container);
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

            // Add classes that identifies the placement and alignment of the popver
            // which allows the customization of the popover based on its position.
            $popover
              .addClass('ns-popover-' + placement_ + '-placement')
              .addClass('ns-popover-' + align_ + '-align');

            $compile($popover)(scope);

            scope.$on('$destroy', function() {
              $popover.remove();
            });

            scope.hidePopover = function() {
              hider_.hide(0);
            };

            scope.$on('ns:popover:hide', function(ev, group) {
              if (options.group === group) {
                  scope.hidePopover();
              }
            });

            $popover
              .css('position', 'absolute')
              .css('display', 'none');

            //search for the triangle element - works in ie8+
            $triangle = $popover[0].querySelectorAll('.triangle');
            //if the element is found, then convert it to an angular element
            if($triangle.length){
              $triangle = $el($triangle);
            }

            $container.append($popover);
          });

          if (options.angularEvent) {
            $rootScope.$on(options.angularEvent, function() {
              hider_.cancel();
              displayer_.display(options.popupDelay);
            });
          } else if (options.scopeEvent) {
            scope.$on(options.scopeEvent, function() {
              hider_.cancel();
              displayer_.display($popover, options.popupDelay);
            });
          } else {
            elm.on(options.trigger, function(e) {
              if (false !== options.triggerPrevent) {
                e.preventDefault();
              }
              hider_.cancel();
              displayer_.display(options.popupDelay, e);
            });
          }

          elm
            .on('mouseout', function() {
              hider_.hide(options.timeout);
            })
            .on('mouseover', function() {
              hider_.cancel();
            });

          $popover
            .on('mouseout', function(e) {
              hider_.hide(options.timeout);
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

          function insideClickHandler() {
            if ($popover.isOpen) {
              hider_.hide(0);
            }
          }

          function outsideClickHandler(e) {
            if ($popover.isOpen && e.target !== elm[0]) {
              var id = $popover[0].id;
              if (!isInPopover(e.target)) {
                hider_.hide(0);
              }
            }

            function isInPopover(el) {
              if (el.id === id) {
                return true;
              }

              var parent = angular.element(el).parent()[0];

              if (!parent) {
                return false;
              }

              if (parent.id === id) {
                return true;
              }
              else {
                return isInPopover(parent);
              }
            }
          }

          function buttonClickHandler() {
            if ($popover.isOpen) {
              hider_.hide(0);
            }
          }
        }
      };
    }
  ]);
})(window, window.angular);