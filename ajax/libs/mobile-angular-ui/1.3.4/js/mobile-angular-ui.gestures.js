/**
 * @module mobile-angular-ui.gestures.drag
 * @description
 *
 * `mobile-angular-ui.gestures.drag` module exposes the `$drag` service that is used
 * to handle drag gestures. `$drag` service wraps [$touch](../module:touch) service adding
 * CSS transforms reacting to `touchmove` events.
 *
 * ## Usage
 *
 * ``` js
 * angular.module('myApp', ['mobile-angular-ui.gestures']);
 * ```
 *
 * Or
 *
 * ``` js
 * angular.module('myApp', ['mobile-angular-ui.gestures.drag']);
 * ```
 *
 * ``` js
 * var dragOptions = {
 *   transform: $drag.TRANSLATE_BOTH,
 *   start:  function(dragInfo, event){},
 *   end:    function(dragInfo, event){},
 *   move:   function(dragInfo, event){},
 *   cancel: function(dragInfo, event){}
 * };
 *
 * $drag.bind(element, dragOptions, touchOptions);
 * ```
 *
 * Where:
 *
 * - `transform` is a `function(element, currentTransform, touch) -> newTransform`
 *    returning taking an `element`, its `currentTransform` and returning the `newTransform`
 *    for the element in response to `touch`. See [$transform](../module:transform) for more.
 *    Default to `$drag.TRANSLATE_BOTH`.
 * - `start`, `end`, `move`, `cancel` are optional callbacks responding to `drag` movement phases.
 * - `dragInfo` is an extended version of `touchInfo` from [$touch](../module:touch),
 *   extending it with:
 *   - `originalTransform`: The [$transform](../module:transform) object relative to CSS transform before `$drag` is bound.
 *   - `originalRect`: The [Bounding Client Rect](https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect)
 *   for bound element before any drag action.
 *   - `startRect`: The [Bounding Client Rect](https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect)
 *   for bound element registered at `start` event.
 *   - `startTransform`: The [$transform](../module:transform) at `start` event.
 *   - `rect`: The current [Bounding Client Rect](https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect) for bound element.
 *   - `transform`: The current [$transform](../module:transform).
 *   - `reset`: A function restoring element to `originalTransform`.
 *   - `undo`: A function restoring element to `startTransform`.
 * - `touchOptions` is an option object to be passed to underlying [`$touch`](../module:touch) service.
 *
 * ### Predefined transforms
 *
 * - `$drag.NULL_TRANSFORM`: No transform follow movement
 * - `$drag.TRANSLATE_BOTH`: Transform translate following movement on both x and y axis.
 * - `$drag.TRANSLATE_HORIZONTAL`: Transform translate following movement on x axis.
 * - `$drag.TRANSLATE_UP`: Transform translate following movement on negative y axis.
 * - `$drag.TRANSLATE_DOWN`: Transform translate following movement on positive y axis.
 * - `$drag.TRANSLATE_LEFT`: Transform translate following movement on negative x axis.
 * - `$drag.TRANSLATE_RIGHT`: Transform translate following movement on positive x axis.
 * - `$drag.TRANSLATE_VERTICAL`: Transform translate following movement on y axis.
 * - `$drag.TRANSLATE_INSIDE`: Is a function and should be used like:
 *
 *    ``` js
 *     {
 *       transform: $drag.TRANSLATE_INSIDE(myElement)
 *     }
 *    ```
 *
 *    It returns a transform function that contains translate movement inside
 *    the passed element.
 *
 * ### `.ui-drag-move` style
 *
 * While moving an `.ui-drag-move` class is attached to element. Style for this class is defined via
 * [insertRule](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet.insertRule) and aims to
 * fix common problems while dragging, specifically:
 *
 * - Brings the element in front of other elements
 * - Disable transitions
 * - Makes text unselectable
 *
 * **NOTE** Transitions are disabled cause they may introduce conflicts between `transition: transform`
 *  and `dragOptions.transform` function.
 *
 * They will be re-enabled after drag, and this can be used to achieve some graceful effects.
 *
 * If you need transition that does not involve transforms during movement you can apply them to an
 * inner or wrapping element.
 *
 * ### Examples
 *
 * #### Limit movement to an element
 *
 * ``` js
 * app.directive('dragMe', ['$drag', function($drag){
 *   return {
 *     controller: function($scope, $element) {
 *       $drag.bind($element,
 *         {
 *           transform: $drag.TRANSLATE_INSIDE($element.parent()),
 *           end: function(drag) {
 *             drag.reset();
 *           }
 *         },
 *         { // release touch when movement is outside bounduaries
 *           sensitiveArea: $element.parent()
 *         }
 *       );
 *     }
 *   };
 * }]);
 * ```
 * <iframe class='embedded-example' src='/examples/drag.html'></iframe>
 */
(function() {
  'use strict';

  angular.module('mobile-angular-ui.gestures.drag', [
    'mobile-angular-ui.gestures.touch',
    'mobile-angular-ui.gestures.transform'
  ])

    .provider('$drag', function() {
      this.$get = ['$touch', '$transform', function($touch, $transform) {

      // Add some css rules to be used while moving elements
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(''));
        document.head.appendChild(style);
        var sheet = style.sheet;

      // Makes z-index 99999
        sheet.insertRule('html .ui-drag-move{z-index: 99999 !important;}', 0);
      // Disable transitions
        sheet.insertRule('html .ui-drag-move{' +
        '-webkit-transition: none !important;' +
        '-moz-transition: none !important;-o-transition: none !important;' +
        '-ms-transition: none !important;transition: none !important;' +
        '}', 0);

      // Makes text unselectable
        sheet.insertRule('html .ui-drag-move, html .ui-drag-move *{' +
        '-webkit-touch-callout: none !important;' +
        '-webkit-user-select: none !important;' +
        '-khtml-user-select: none !important;' +
        '-moz-user-select: none !important;' +
        '-ms-user-select: none !important;' +
        'user-select: none !important;' +
      '}', 0);

        style = sheet = null;   // we wont use them anymore so make
      // their memory immediately claimable

        return {

        //
        // built-in transforms
        //
          NULL_TRANSFORM: function(element, transform) {
            return transform;
          },

          TRANSLATE_BOTH: function(element, transform, touch) {
            transform.translateX = touch.distanceX;
            transform.translateY = touch.distanceY;
            return transform;
          },

          TRANSLATE_HORIZONTAL: function(element, transform, touch) {
            transform.translateX = touch.distanceX;
            transform.translateY = 0;
            return transform;
          },

          TRANSLATE_UP: function(element, transform, touch) {
            transform.translateY = touch.distanceY <= 0 ? touch.distanceY : 0;
            transform.translateX = 0;
            return transform;
          },

          TRANSLATE_DOWN: function(element, transform, touch) {
            transform.translateY = touch.distanceY >= 0 ? touch.distanceY : 0;
            transform.translateX = 0;
            return transform;
          },

          TRANSLATE_LEFT: function(element, transform, touch) {
            transform.translateX = touch.distanceX <= 0 ? touch.distanceX : 0;
            transform.translateY = 0;
            return transform;
          },

          TRANSLATE_RIGHT: function(element, transform, touch) {
            transform.translateX = touch.distanceX >= 0 ? touch.distanceX : 0;
            transform.translateY = 0;
            return transform;
          },

          TRANSLATE_VERTICAL: function(element, transform, touch) {
            transform.translateX = 0;
            transform.translateY = touch.distanceY;
            return transform;
          },

          TRANSLATE_INSIDE: function(wrapperElementOrRectangle) {
            wrapperElementOrRectangle = wrapperElementOrRectangle.length ? wrapperElementOrRectangle[0] : wrapperElementOrRectangle;

            return function(element, transform, touch) {
              element = element.length ? element[0] : element;
              var re = element.getBoundingClientRect();
              var rw = wrapperElementOrRectangle instanceof Element ? wrapperElementOrRectangle.getBoundingClientRect() : wrapperElementOrRectangle;
              var tx;
              var ty;

              if (re.width >= rw.width) {
                tx = 0;
              } else if (re.right + touch.stepX > rw.right) {
                tx = rw.right - re.right;
              } else if (re.left + touch.stepX < rw.left) {
                tx = rw.left - re.left;
              } else {
                tx = touch.stepX;
              }

              if (re.height >= rw.height) {
                ty = 0;
              } else if (re.bottom + touch.stepY > rw.bottom) {
                ty = rw.bottom - re.bottom;
              } else if (re.top + touch.stepY < rw.top) {
                ty = rw.top - re.top;
              } else {
                ty = touch.stepY;
              }

              transform.translateX += tx;
              transform.translateY += ty;
              return transform;
            };
          },

        //
        // bind function
        //
          bind: function($element, dragOptions, touchOptions) {
            $element = angular.element($element);
            dragOptions = dragOptions || {};
            touchOptions = touchOptions || {};

            var startEventHandler = dragOptions.start;
            var endEventHandler = dragOptions.end;
            var moveEventHandler = dragOptions.move;
            var cancelEventHandler = dragOptions.cancel;
            var transformEventHandler = dragOptions.transform || this.TRANSLATE_BOTH;

            var domElement = $element[0];
            var tO = $transform.get($element); // original transform
            var rO = domElement.getBoundingClientRect(); // original bounding rect
            var tS; // transform at start
            var rS;

            var moving = false;

            var isMoving = function() {
              return moving;
            };

            var cleanup = function() {
              moving = false;
              tS = rS = null;
              $element.removeClass('ui-drag-move');
            };

            var reset = function() {
              $transform.set(domElement, tO);
            };

            var undo = function() {
              $transform.set(domElement, tS || tO);
            };

            var setup = function() {
              moving = true;
              rS = domElement.getBoundingClientRect();
              tS = $transform.get(domElement);
              $element.addClass('ui-drag-move');
            };

            var createDragInfo = function(touch) {
              touch = angular.extend({}, touch);
              touch.originalTransform = tO;
              touch.originalRect = rO;
              touch.startRect = rS;
              touch.rect = domElement.getBoundingClientRect();
              touch.startTransform = tS;
              touch.transform = $transform.get(domElement);
              touch.reset = reset;
              touch.undo = undo;
              return touch;
            };

            var onTouchMove = function(touch, event) {
              // preventDefault no matter what
              // it is (ie. maybe html5 drag for images or scroll)
              event.preventDefault();

              // $touch calls start on the first touch
              // to ensure $drag.start is called only while actually
              // dragging and not for touches we will bind $drag.start
              // to the first time move is called

              if (isMoving()) { // drag move
                touch = createDragInfo(touch);

                var transform = transformEventHandler($element, angular.extend({}, touch.transform), touch, event);

                $transform.set(domElement, transform);

                if (moveEventHandler) {
                  moveEventHandler(touch, event);
                }
              } else { // drag start
                setup();
                if (startEventHandler) {
                  startEventHandler(createDragInfo(touch), event);
                }
              }
            };

            var onTouchEnd = function(touch, event) {
              if (!isMoving()) {
                return;
              }

              // prevents outer swipes
              event.__UiSwipeHandled__ = true;

              touch = createDragInfo(touch);
              cleanup();

              if (endEventHandler) {
                endEventHandler(touch, event);
              }
            };

            var onTouchCancel = function(touch, event) {
              if (!isMoving()) {
                return;
              }

              touch = createDragInfo(touch);
              undo(); // on cancel movement is undoed automatically;
              cleanup();

              if (cancelEventHandler) {
                cancelEventHandler(touch, event);
              }
            };

            return $touch.bind($element,
            {move: onTouchMove, end: onTouchEnd, cancel: onTouchCancel},
            touchOptions);
          } // ~ bind
        }; // ~ return $drag
      }]; // ~ $get
    });

})();

/**
 * A module providing swipe gesture services and directives.
 *
 * @module mobile-angular-ui.gestures.swipe
 */
(function() {
  'use strict';

  var module = angular.module('mobile-angular-ui.gestures.swipe',
    ['mobile-angular-ui.gestures.touch']);

  /**
   * An adaptation of `ngTouch.$swipe`, it is basically the same despite of:
   *
   * - It is based on [$touch](../module:touch)
   * - Swipes are recognized by touch velocity and direction
   * - It does not require `ngTouch` thus is better compatible with fastclick.js
   * - Swipe directives are nestable
   * - It allows to unbind
   * - It has only one difference in interface, and its about how to pass `pointerTypes`:
   *
   *   ``` js
   *     // ngTouch.$swipe
   *     $swipe.bind(..., ['mouse', ... });
   *
   *     // mobile-angular-ui.gestures.swipe.$swipe
   *     $swipe.bind(..., pointerTypes: { mouse: { start: 'mousedown', ...} });
   *   ```
   *   This is due to the fact that the second parameter of `$swipe.bind` is destinated to options for
   *   underlying `$touch` service.
   *
   * @service $swipe
   * @as class
   */
  module.factory('$swipe', ['$touch', function($touch) {
    var VELOCITY_THRESHOLD = 500; // px/sec
    var MOVEMENT_THRESHOLD = 10; // px
    var TURNAROUND_MAX = 10; // px
    var ANGLE_THRESHOLD = 10; // deg
    var abs = Math.abs;

    var defaultOptions = {
      movementThreshold: MOVEMENT_THRESHOLD, // start to consider only if movement
      // exceeded MOVEMENT_THRESHOLD
      valid: function(t) {
        var absAngle = abs(t.angle);
        absAngle = absAngle >= 90 ? absAngle - 90 : absAngle;

        var validDistance = t.total - t.distance <= TURNAROUND_MAX;
        var validAngle = absAngle <= ANGLE_THRESHOLD || absAngle >= 90 - ANGLE_THRESHOLD;
        var validVelocity = t.averageVelocity >= VELOCITY_THRESHOLD;

        return validDistance && validAngle && validVelocity;
      }
    };

    return {
      /**
       * Bind swipe gesture handlers for an element.
       *
       * ``` js
       * var unbind = $swipe.bind(elem, {
       *   end: function(touch) {
       *     console.log('Swiped:', touch.direction);
       *     unbind();
       *   }
       * });
       * ```
       *
       * **Swipes Detection**
       *
       * Before consider a touch to be a swipe Mobile Angular UI verifies that:
       *
       * 1. Movement is quick. Average touch velocity should exceed a `VELOCITY_THRESHOLD`.
       * 2. Movement is linear.
       * 3. Movement has a clear, non-ambiguous direction. So we can assume without error
       *    that underlying `touch.direction` is exactly the swipe direction. For that
       *    movement is checked against an `ANGLE_THRESHOLD`.
       *
       * @param  {Element|$element} element The element to observe for swipe gestures.
       * @param  {object} eventHandlers An object with handlers for specific swipe events.
       * @param  {function} [eventHandlers.start]  The callback for swipe start event.
       * @param  {function} [eventHandlers.end]  The callback for swipe end event.
       * @param  {function} [eventHandlers.move]  The callback for swipe move event.
       * @param  {function} [eventHandlers.cancel]  The callback for swipe cancel event.
       * @param  {object} [options] Options to be passed to underlying [$touch.bind](../module:touch) function.
       *
       * @returns {function} The unbind function.
       *
       * @method bind
       * @memberOf mobile-angular-ui.gestures.swipe~$swipe
       */
      bind: function(element, eventHandlers, options) {
        options = angular.extend({}, defaultOptions, options || {});
        return $touch.bind(element, eventHandlers, options);
      }
    };
  }]);

  /**
   * Specify custom behavior when an element is swiped to the left on a touchscreen device.
   * A leftward swipe is a quick, right-to-left slide of the finger.
   *
   * @directive uiSwipeLeft
   * @param {expression} uiSwipeLeft An expression to be evaluated on leftward swipe.
   */
  /**
   * Specify custom behavior when an element is swiped to the right on a touchscreen device.
   * A rightward swipe is a quick, left-to-right slide of the finger.
   *
   * @directive uiSwipeRight
   * @param {expression} uiSwipeRight An expression to be evaluated on rightward swipe.
   */
  /**
   * Alias for [uiSwipeLeft](#uiswipeleft).
   *
   * @directive ngSwipeLeft
   * @deprecated
   */
  /**
   * Alias for [uiSwipeRight](#uiswiperight).
   *
   * @directive ngSwipeRight
   * @deprecated
   */
  angular.forEach(['ui', 'ng'], function(prefix) {
    angular.forEach(['Left', 'Right'], function(direction) {
      var directiveName = prefix + 'Swipe' + direction;
      module.directive(directiveName, ['$swipe', '$parse', function($swipe, $parse) {
        return {
          link: function(scope, elem, attrs) {
            var onSwipe = $parse(attrs[directiveName]);
            $swipe.bind(elem, {
              end: function(swipe, event) {
                if (swipe.direction === direction.toUpperCase()) {
                  if (!event.__UiSwipeHandled__) {
                    event.__UiSwipeHandled__ = true;
                    scope.$apply(function() {
                      onSwipe(scope, {$touch: swipe});
                    });
                  }
                }
              }
            });
          }
        };
      }]);
    });
  });
})();

/* eslint complexity: 0 */

/**
 * Device agnostic touch handling.
 *
 * **Usage**
 *
 * Require this module doing either
 *
 * ``` js
 * angular.module('myApp', ['mobile-angular-ui.gestures']);
 * ```
 *
 * Or standalone
 *
 * ``` js
 * angular.module('myApp', ['mobile-angular-ui.gestures.touch']);
 * ```
 *
 * Then you will be able to use the `$touch` service like that:
 *
 * ``` js
 * var unbindFn = $touch.bind(element, {
 *    start: function(touchInfo, e);
 *    move: function(touchInfo, e);
 *    end: function(touchInfo, e);
 *    cancel: function(touchInfo, e);
 * }, options);
 * ```
 *
 * @module mobile-angular-ui.gestures.touch
 */
(function() {
  'use strict';
  var module = angular.module('mobile-angular-ui.gestures.touch', []);

  /**
   * `$touch` is an abstraction of touch event handling that works with
   * any kind of input devices.
   *
   * It is intended for single touch only and provides
   * extended infos about touch like: movement, direction, velocity, duration, and more.
   * $touch service is intended as base to build any single-touch gesture handlers.
   *
   * **Usage**
   *
   * ``` js
   * var unbindFn = $touch.bind(element, {
   *    start: function(touchInfo, e);
   *    move: function(touchInfo, e);
   *    end: function(touchInfo, e);
   *    cancel: function(touchInfo, e);
   * }, options);
   * ```
   *
   * @service $touch
   * @as class
   */

  /**
   * Configurable provider for `$touch` service
   * @class  $touchProvider
   * @ngdoc  provider
   * @memberOf mobile-angular-ui.gestures.touch~$touch
   */
  module.provider('$touch', function() {

    /* =====================================
    =            Configuration            =
    =====================================*/

    var VALID = function() {
      return true;
    };

    var MOVEMENT_THRESHOLD = 1;

    var POINTER_EVENTS = {
      mouse: {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
      },
      touch: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
        cancel: 'touchcancel'
      }
    };

    var POINTER_TYPES = ['mouse', 'touch'];

    // function or element or rect
    var SENSITIVE_AREA = function($element) {
      return $element[0].ownerDocument.documentElement.getBoundingClientRect();
    };

    /**
     * Set default pointer events option.
     * Pointer Events option specifies a device-by-device map between device specific events and
     * touch events.
     *
     * The default Pointer Events Map is defined as:
     *
     * ``` js
     * var POINTER_EVENTS = {
     *   'mouse': {
     *     start: 'mousedown',
     *     move: 'mousemove',
     *     end: 'mouseup'
     *   },
     *   'touch': {
     *     start: 'touchstart',
     *     move: 'touchmove',
     *     end: 'touchend',
     *     cancel: 'touchcancel'
     *   }
     * };
     * ```
     *
     * Ie.
     *
     * ```
     * app.config(function($touchProvider){
     *   $touchProvider.setPointerEvents({ pen: {start: "pendown", end: "penup", move: "penmove" }});
     * });
     * ```
     *
     * @name setPointerEvents
     * @param {object} pointerEvents The pointer events map object
     * @memberOf mobile-angular-ui.gestures.touch~$touch.$touchProvider
     */
    this.setPointerEvents = function(pointerEvents) {
      POINTER_EVENTS = pointerEvents;
      POINTER_TYPES = Object.keys(POINTER_EVENTS);
    };

    /**
     * Set default validity function for a touch.
     *
     * The default is defined as always true:
     *
     * ``` js
     * $touchProvider.setValid(function(touch, event) {
     *   return true;
     * });
     * ```
     *
     * @param {function} validityFunction The validity function. A function that takes two
     *                   arguments: `touchInfo` and `event`, and returns
     *                   a `Boolean` indicating wether the corresponding touch
     *                   should be considered valid and its handlers triggered,
     *                   or considered invalid and its handlers be ignored.
     * @method setValid
     * @memberOf mobile-angular-ui.gestures.touch~$touch.$touchProvider
     */
    this.setValid = function(fn) {
      VALID = fn;
    };

    /**
     * Set default amount of pixels of movement before
     * start to trigger `touchmove` handlers.
     *
     * Default is `1`.
     *
     * ie.
     *
     * ``` js
     * $touchProvider.setMovementThreshold(120);
     * ```
     *
     * @param {integer}  threshold The new treeshold.
     *
     * @method  setMovementThreshold
     * @memberOf mobile-angular-ui.gestures.touch~$touch.$touchProvider
     */
    this.setMovementThreshold = function(v) {
      MOVEMENT_THRESHOLD = v;
    };
    /**
     * Set default sensitive area.
     *
     * The sensitive area of a touch is the area of the screen inside what
     * we consider a touch to be meaningful thus triggering its handlers.
     *
     * **NOTE:** if movement goes out the sensitive area the touch event is not cancelled,
     * instead its handler are just ignored.
     *
     * By default sensitive area is defined as `ownerDocument` bounding rectangle
     * of the bound element.
     *
     * ie.
     *
     * ``` js
     * $touchProvider.setSensitiveArea(function($element) {
     *   return $element[0].ownerDocument.documentElement.getBoundingClientRect();
     * });
     * ```
     *
     * @param {function|Element|TextRectangle} sensitiveArea The new default sensitive area,
     *                                                       either static or as function
     *                                                       taking an element and returning another
     *                                                       element or a
     *                                                       [rectangle](https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect).
     *
     * @method  setSensitiveArea
     * @memberOf mobile-angular-ui.gestures.touch~$touch.$touchProvider
     */
    this.setSensitiveArea = function(fnOrElementOrRect) {
      SENSITIVE_AREA = fnOrElementOrRect;
    };

    //
    // Shorthands for minification
    //
    var abs = Math.abs;
    var atan2 = Math.atan2;
    var sqrt = Math.sqrt;

    /* ===============================
    =            Helpers            =
    ===============================*/

    var getCoordinates = function(event) {
      var touches = event.touches && event.touches.length ? event.touches : [event];
      var e = (event.changedTouches && event.changedTouches[0]) ||
          (event.originalEvent && event.originalEvent.changedTouches &&
              event.originalEvent.changedTouches[0]) ||
          touches[0].originalEvent || touches[0];

      return {
        x: e.clientX,
        y: e.clientY
      };
    };

    var getEvents = function(pointerTypes, eventType) {
      var res = [];
      angular.forEach(pointerTypes, function(pointerType) {
        var eventName = POINTER_EVENTS[pointerType][eventType];
        if (eventName) {
          res.push(eventName);
        }
      });
      return res.join(' ');
    };

    var now = function() {
      return new Date();
    };

    var timediff = function(t1, t2) {
      t2 = t2 || now();
      return abs(t2 - t1);
    };

    var len = function(x, y) {
      return sqrt(x * x + y * y);
    };

    /**
     * `TouchInfo` is an object containing the following extended informations about any touch
     * event.
     *
     * @property {string} type Normalized event type. Despite of pointer device is always one of `touchstart`, `touchend`, `touchmove`, `touchcancel`.
     * @property {Date} timestamp The time object corresponding to the moment this touch event happened.
     * @property {integer} duration The difference between this touch event and the corresponding `touchstart`.
     * @property {float} startX X coord of related `touchstart`.
     * @property {float} startY Y coord of related `touchstart`.
     * @property {float} prevX X coord of previous `touchstart` or `touchmove`.
     * @property {float} prevY Y coord of previous `touchstart` or `touchmove`.
     * @property {float} x X coord of this touch event.
     * @property {float} y Y coord of this touch event.
     * @property {float} step Distance between `[prevX, prevY]` and `[x, y]` points.
     * @property {float} stepX Distance between `prevX` and `x`.
     * @property {float} stepY Distance between `prevY` and `y`.
     * @property {float} velocity Instantaneous velocity of a touch event in pixels per second.
     * @property {float} averageVelocity Average velocity of a touch event from its corresponding `touchstart` in pixels per second.
     * @property {float} distance Distance between `[startX, startY]` and `[x, y]` points.
     * @property {float} distanceX Distance between `startX` and `x`.
     * @property {float} distanceY Distance between `startY` and `y`.
     * @property {float} total Total number of pixels covered by movement, taking account of direction changes and turnarounds.
     * @property {float} totalX Total number of pixels covered by horizontal movement, taking account of direction changes and turnarounds.
     * @property {float} totalY Total number of pixels covered by vertical, taking account of direction changes and turnarounds.
     * @property {string} direction The current prevalent direction for this touch, one of `LEFT`, `RIGHT`, `TOP`, `BOTTOM`.
     * @property {float} angle Angle in degree between x axis and the vector `[x, y]`, is `null` when no movement happens.
     *
     * @class TouchInfo
     * @ngdoc type
     * @memberOf mobile-angular-ui.gestures.touch~$touch
     */

    var buildTouchInfo = function(type, c, t0, tl) {
      // Compute values for new TouchInfo based on coordinates and previus touches.
      // - c is coords of new touch
      // - t0 is first touch: useful to compute duration and distance (how far pointer
      //                    got from first touch)
      // - tl is last touch: useful to compute velocity and length (total length of the movement)

      t0 = t0 || {};
      tl = tl || {};

      // timestamps
      var ts = now();
      var ts0 = t0.timestamp || ts;
      var tsl = tl.timestamp || ts0;

      // coords
      var x = c.x;
      var y = c.y;
      var x0 = t0.x || x;
      var y0 = t0.y || y;
      var xl = tl.x || x0;
      var yl = tl.y || y0;

      // total movement
      var totalXl = tl.totalX || 0;
      var totalYl = tl.totalY || 0;
      var totalX = totalXl + abs(x - xl);
      var totalY = totalYl + abs(y - yl);
      var total = len(totalX, totalY);

      // duration
      var duration = timediff(ts, ts0);
      var durationl = timediff(ts, tsl);

      // distance
      var dxl = x - xl;
      var dyl = y - yl;
      var dl = len(dxl, dyl);
      var dx = x - x0;
      var dy = y - y0;
      var d = len(dx, dy);

      // velocity (px per second)
      var v = durationl > 0 ? abs(dl / (durationl / 1000)) : 0;
      var tv = duration > 0 ? abs(total / (duration / 1000)) : 0;

      // main direction: 'LEFT', 'RIGHT', 'TOP', 'BOTTOM'
      var dir = abs(dx) > abs(dy) ?
        (dx < 0 ? 'LEFT' : 'RIGHT') :
        (dy < 0 ? 'TOP' : 'BOTTOM');

      // angle (angle between distance vector and x axis)
      // angle will be:
      //   0 for x > 0 and y = 0
      //   90 for y < 0 and x = 0
      //   180 for x < 0 and y = 0
      //   -90 for y > 0 and x = 0
      //
      //               -90°
      //                |
      //                |
      //                |
      //   180° --------|-------- 0°
      //                |
      //                |
      //                |
      //               90°
      //
      var angle = dx !== 0 || dy !== 0 ? atan2(dy, dx) * (180 / Math.PI) : null;
      angle = angle === -180 ? 180 : angle;

      return {
        type: type,
        timestamp: ts,
        duration: duration,
        startX: x0,
        startY: y0,
        prevX: xl,
        prevY: yl,
        x: c.x,
        y: c.y,

        step: dl, // distance from prev
        stepX: dxl,
        stepY: dyl,

        velocity: v,
        averageVelocity: tv,

        distance: d, // distance from start
        distanceX: dx,
        distanceY: dy,

        total: total, // total length of momement,
        // considering turnaround
        totalX: totalX,
        totalY: totalY,
        direction: dir,
        angle: angle
      };
    };

    /* ======================================
    =            Factory Method            =
    ======================================*/

    this.$get = [function() {

      return {
        /**
         *
         * Bind touch handlers for an element.
         *
         * ``` js
         * var unbind = $touch.bind(elem, {
         *   end: function(touch) {
         *     console.log('Avg Speed:', touch.averageVelocity);
         *     unbind();
         *   }
         * });
         * ```
         *
         * @param  {Element|$element} element The element to bound to.
         * @param  {object} eventHandlers An object with handlers for specific touch events.
         * @param  {function} [eventHandlers.start]  The callback for `touchstart` event.
         * @param  {function} [eventHandlers.end]  The callback for `touchend` event.
         * @param  {function} [eventHandlers.move]  The callback for `touchmove` event.
         * @param  {function} [eventHandlers.cancel]  The callback for `touchcancel` event.
         * @param  {object} [options] Options.
         * @param  {integer} [options.movementThreshold] Amount of pixels of movement before start to trigger `touchmove` handlers.
         * @param  {function} [options.valid] Validity function. A `function(TouchInfo, event)⟶boolean` deciding if a touch should be handled or ignored.
         * @param  {function|Element|TextRectangle} [options.sensitiveArea] A
         * [Bounding Client Rect](https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect) or an element
         *  or a function that takes the bound element and returns one of the previous.
         *  Sensitive area define bounduaries to release touch when movement is outside.
         * @param  {array} [options.pointerTypes] Pointer types to handle. An array of pointer types that is intended to be
         *                                        a subset of keys from default pointer events map (see `$touchProvider.setPointerEvents`).
         *
         * @returns {function} The unbind function.
         *
         * @memberOf mobile-angular-ui.gestures.touch~$touch
         */
        bind: function($element, eventHandlers, options) {

          // ensure element to be an angular element
          $element = angular.element($element);

          options = options || {};
          // uses default pointer types in case of none passed
          var pointerTypes = options.pointerTypes || POINTER_TYPES;
          var isValid = options.valid === undefined ? VALID : options.valid;
          var movementThreshold = options.movementThreshold === undefined ? MOVEMENT_THRESHOLD : options.movementThreshold;
          var sensitiveArea = options.sensitiveArea === undefined ? SENSITIVE_AREA : options.sensitiveArea;

          // first and last touch
          var t0;
          var tl;

          // events
          var startEvents = getEvents(pointerTypes, 'start');
          var endEvents = getEvents(pointerTypes, 'end');
          var moveEvents = getEvents(pointerTypes, 'move');
          var cancelEvents = getEvents(pointerTypes, 'cancel');

          var startEventHandler = eventHandlers.start;
          var endEventHandler = eventHandlers.end;
          var moveEventHandler = eventHandlers.move;
          var cancelEventHandler = eventHandlers.cancel;

          var $movementTarget = angular.element($element[0].ownerDocument);
          var onTouchMove;
          var onTouchEnd;
          var onTouchCancel;

          var resetTouch = function() {
            t0 = tl = null;
            $movementTarget.off(moveEvents, onTouchMove);
            $movementTarget.off(endEvents, onTouchEnd);
            if (cancelEvents) {
              $movementTarget.off(cancelEvents, onTouchCancel);
            }
          };

          var isActive = function() {
            return Boolean(t0);
          };

          //
          // Callbacks
          //

          // on touchstart
          var onTouchStart = function(event) {
            // don't handle multi-touch
            if (event.touches && event.touches.length > 1) {
              return;
            }
            tl = t0 = buildTouchInfo('touchstart', getCoordinates(event));
            $movementTarget.on(moveEvents, onTouchMove);
            $movementTarget.on(endEvents, onTouchEnd);
            if (cancelEvents) {
              $movementTarget.on(cancelEvents, onTouchCancel);
            }
            if (startEventHandler) {
              startEventHandler(t0, event);
            }
          };

          // on touchCancel
          onTouchCancel = function(event) {
            var t = buildTouchInfo('touchcancel', getCoordinates(event), t0, tl);
            resetTouch();
            if (cancelEventHandler) {
              cancelEventHandler(t, event);
            }
          };

          // on touchMove
          onTouchMove = function(event) {
            // don't handle multi-touch
            if (event.touches && event.touches.length > 1) {
              return;
            }

            if (!isActive()) {
              return;
            }

            var coords = getCoordinates(event);

            //
            // wont fire outside sensitive area
            //
            var mva = typeof sensitiveArea === 'function' ? sensitiveArea($element) : sensitiveArea;
            mva = mva.length ? mva[0] : mva;

            var mvaRect = mva instanceof Element ? mva.getBoundingClientRect() : mva;

            if (coords.x < mvaRect.left || coords.x > mvaRect.right || coords.y < mvaRect.top || coords.y > mvaRect.bottom) {
              return;
            }

            var t = buildTouchInfo('touchmove', coords, t0, tl);
            var totalX = t.totalX;
            var totalY = t.totalY;

            tl = t;

            if (totalX < movementThreshold && totalY < movementThreshold) {
              return;
            }

            if (isValid(t, event)) {
              if (event.cancelable === undefined || event.cancelable) {
                event.preventDefault();
              }
              if (moveEventHandler) {
                moveEventHandler(t, event);
              }
            }
          };

          // on touchEnd
          onTouchEnd = function(event) {
            // don't handle multi-touch
            if (event.touches && event.touches.length > 1) {
              return;
            }

            if (!isActive()) {
              return;
            }

            var t = angular.extend({}, tl, {type: 'touchend'});
            if (isValid(t, event)) {
              if (event.cancelable === undefined || event.cancelable) {
                event.preventDefault();
              }
              if (endEventHandler) {
                setTimeout(function() { // weird workaround to avoid
                  // delays with dom manipulations
                  // inside the handler
                  endEventHandler(t, event);
                }, 0);
              }
            }
            resetTouch();
          };

          $element.on(startEvents, onTouchStart);

          return function unbind() {
            if ($element) { // <- wont throw if accidentally called twice
              $element.off(startEvents, onTouchStart);
              if (cancelEvents) {
                $movementTarget.off(cancelEvents, onTouchCancel);
              }
              $movementTarget.off(moveEvents, onTouchMove);
              $movementTarget.off(endEvents, onTouchEnd);

              // Clear all those variables we carried out from `#bind` method scope
              // to local scope and that we don't have to use anymore
              $element = $movementTarget = startEvents = cancelEvents =
                moveEvents = endEvents = onTouchStart = onTouchCancel =
                onTouchMove = onTouchEnd = pointerTypes = isValid =
                movementThreshold = sensitiveArea = null;
            }
          };
        }
      };
    }];
  });
})();

/* eslint complexity: 0 */

/**
 * @module mobile-angular-ui.gestures.transform
 * @description
 *
 * `mobile-angular-ui.gestures.transform` provides the `$transform` service is designed
 * with the specific aim to provide a cross-browser way to interpolate CSS 3d transform
 * without having to deal with CSS Matrix, and being able to take into account any previous
 * unknown transform already applied to an element.
 *
 * ## Usage
 *
 * Require this module doing either
 *
 * ``` js
 * angular.module('myApp', ['mobile-angular-ui.gestures']);
 * ```
 *
 * Or standalone
 *
 * ``` js
 * angular.module('myApp', ['mobile-angular-ui.gestures.transform']);
 * ```
 *
 * Say we have an element with applyed css:
 *
 * ``` html
 * <div class='myelem'></div>
 * ```
 *
 * ``` css
 * .myelem {
 *   transform: translate(12px) rotate(20deg);
 * }
 * ```
 *
 * Then you can use `$transform` like this:
 *
 * ``` js
 *   t = $transform.get(e);
 *   t.rotationZ += 15;
 *   t.translateX += 1;
 *   $transform.set(e, t);
 * ```
 *
 * ### `$transform` service API
 *
 * #### `$transform.fromCssMatrix(cssMatrixString) -> transform`
 *
 * Returns a decomposition of the transform matrix `cssMatrixString`.
 * NOTE: 2d matrices are translated to 3d matrices before any other operation.
 *
 * #### `$transform.toCss(decomposedTransform)`
 *
 * Recompose a css string from `decomposedTransform`.
 *
 * Transforms are recomposed as a composition of:
 *
 * ``` css
 * matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, perspective[0], perspective[1], perspective[2], perspective[3])
 * translate3d(translation[0], translation[1], translation[2])
 * rotateX(rotation[0]) rotateY(rotation[1]) rotateZ(rotation[2])
 * matrix3d(1,0,0,0, 0,1,0,0, 0,skew[2],1,0, 0,0,0,1)
 * matrix3d(1,0,0,0, 0,1,0,0, skew[1],0,1,0, 0,0,0,1)
 * matrix3d(1,0,0,0, skew[0],1,0,0, 0,0,1,0, 0,0,0,1)
 * scale3d(scale[0], scale[1], scale[2])
 * ```
 *
 * #### `$transform.get(e) -> transform`
 *
 * Returns a decomposition of the transform matrix applied to `e`.
 *
 * #### `$transform.set(element, transform)`
 *
 * If transform is a string just set it for element `element`. Otherwise is considered as a
 * decomposed transform and is recomposed with `$transform.toCss` and then set to element.
 *
 * ### The decomposed transform object
 *
 * Result of transform matrix decomposition is an object with the following properties:
 *
 * ```
 * translateX
 * translateY
 * translateZ
 * perspectiveX
 * perspectiveY
 * perspectiveZ
 * perspectiveW
 * scaleX
 * scaleY
 * scaleZ
 * rotateX
 * rotateY
 * rotateZ
 * skewXY
 * skewXZ
 * skewYZ
 * ```
 */
(function() {
  'use strict';

  var module = angular.module('mobile-angular-ui.gestures.transform', []);

  module.factory('$transform', function() {

    /* ==============================================================
    =            Cross-Browser Property Prefix Handling            =
    ==============================================================*/

    // Cross-Browser style properties
    var cssPrefix;
    var transformProperty;
    var styleProperty;
    var prefixes = ['', 'webkit', 'Moz', 'O', 'ms'];
    var d = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      if ((prefix + 'Perspective') in d.style) {
        cssPrefix = (prefix === '' ? '' : '-' + prefix.toLowerCase() + '-');
        styleProperty = prefix + (prefix === '' ? 'transform' : 'Transform');
        transformProperty = cssPrefix + 'transform';
        break;
      }
    }

    d = null;

    // return current element transform matrix in a cross-browser way
    var getElementTransformProperty = function(e) {
      e = e.length ? e[0] : e;
      var tr = window
        .getComputedStyle(e, null)
        .getPropertyValue(transformProperty);
      return tr;
    };

    // set current element transform matrix in a cross-browser way
    var setElementTransformProperty = function(elem, value) {
      elem = elem.length ? elem[0] : elem;
      elem.style[styleProperty] = value;
    };

    /* ======================================================
    =            Transform Matrix Decomposition            =
    ======================================================*/

    var SMALL_NUMBER = 1.e-7;

    var rad2deg = function(angle) {
      return angle * 180 / Math.PI;
    };

    var sqrt = Math.sqrt;
    var asin = Math.asin;
    var atan2 = Math.atan2;
    var cos = Math.cos;
    var abs = Math.abs;
    var floor = Math.floor;

    var cloneMatrix = function(m) {
      var res = [[], [], [], []];
      for (var i = 0; i < m.length; i++) {
        for (var j = 0; j < m[i].length; j++) {
          res[i][j] = m[i][j];
        }
      }
      return res;
    };

    var determinant2x2 = function(a, b, c, d) {
      return a * d - b * c;
    };

    var determinant3x3 = function(a1, a2, a3, b1, b2, b3, c1, c2, c3) {
      return a1 * determinant2x2(b2, b3, c2, c3) - b1 * determinant2x2(a2, a3, c2, c3) + c1 * determinant2x2(a2, a3, b2, b3);
    };

    var determinant4x4 = function(m) {
      var a1 = m[0][0];
      var b1 = m[0][1];
      var c1 = m[0][2];
      var d1 = m[0][3];
      var a2 = m[1][0];
      var b2 = m[1][1];
      var c2 = m[1][2];
      var d2 = m[1][3];
      var a3 = m[2][0];
      var b3 = m[2][1];
      var c3 = m[2][2];
      var d3 = m[2][3];
      var a4 = m[3][0];
      var b4 = m[3][1];
      var c4 = m[3][2];
      var d4 = m[3][3];
      return a1 * determinant3x3(b2, b3, b4, c2, c3, c4, d2, d3, d4) -
              b1 * determinant3x3(a2, a3, a4, c2, c3, c4, d2, d3, d4) +
              c1 * determinant3x3(a2, a3, a4, b2, b3, b4, d2, d3, d4) -
              d1 * determinant3x3(a2, a3, a4, b2, b3, b4, c2, c3, c4);
    };

    var adjoint = function(m) {
      var res = [[], [], [], []];
      var a1 = m[0][0];
      var b1 = m[0][1];
      var c1 = m[0][2];
      var d1 = m[0][3];
      var a2 = m[1][0];
      var b2 = m[1][1];
      var c2 = m[1][2];
      var d2 = m[1][3];
      var a3 = m[2][0];
      var b3 = m[2][1];
      var c3 = m[2][2];
      var d3 = m[2][3];
      var a4 = m[3][0];
      var b4 = m[3][1];
      var c4 = m[3][2];
      var d4 = m[3][3];

      res[0][0] = determinant3x3(b2, b3, b4, c2, c3, c4, d2, d3, d4);
      res[1][0] = -determinant3x3(a2, a3, a4, c2, c3, c4, d2, d3, d4);
      res[2][0] = determinant3x3(a2, a3, a4, b2, b3, b4, d2, d3, d4);
      res[3][0] = -determinant3x3(a2, a3, a4, b2, b3, b4, c2, c3, c4);
      res[0][1] = -determinant3x3(b1, b3, b4, c1, c3, c4, d1, d3, d4);
      res[1][1] = determinant3x3(a1, a3, a4, c1, c3, c4, d1, d3, d4);
      res[2][1] = -determinant3x3(a1, a3, a4, b1, b3, b4, d1, d3, d4);
      res[3][1] = determinant3x3(a1, a3, a4, b1, b3, b4, c1, c3, c4);
      res[0][2] = determinant3x3(b1, b2, b4, c1, c2, c4, d1, d2, d4);
      res[1][2] = -determinant3x3(a1, a2, a4, c1, c2, c4, d1, d2, d4);
      res[2][2] = determinant3x3(a1, a2, a4, b1, b2, b4, d1, d2, d4);
      res[3][2] = -determinant3x3(a1, a2, a4, b1, b2, b4, c1, c2, c4);
      res[0][3] = -determinant3x3(b1, b2, b3, c1, c2, c3, d1, d2, d3);
      res[1][3] = determinant3x3(a1, a2, a3, c1, c2, c3, d1, d2, d3);
      res[2][3] = -determinant3x3(a1, a2, a3, b1, b2, b3, d1, d2, d3);
      res[3][3] = determinant3x3(a1, a2, a3, b1, b2, b3, c1, c2, c3);

      return res;
    };

    var inverse = function(m) {
      var res = adjoint(m);
      var det = determinant4x4(m);
      if (abs(det) < SMALL_NUMBER) {
        return false;
      }

      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          res[i][j] /= det;
        }
      }
      return res;
    };

    var transposeMatrix4 = function(m) {
      var res = [[], [], [], []];
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
          res[i][j] = m[j][i];
        }
      }
      return res;
    };

    var v4MulPointByMatrix = function(p, m) {
      var res = [];

      res[0] = (p[0] * m[0][0]) + (p[1] * m[1][0]) +
                  (p[2] * m[2][0]) + (p[3] * m[3][0]);
      res[1] = (p[0] * m[0][1]) + (p[1] * m[1][1]) +
                  (p[2] * m[2][1]) + (p[3] * m[3][1]);
      res[2] = (p[0] * m[0][2]) + (p[1] * m[1][2]) +
                  (p[2] * m[2][2]) + (p[3] * m[3][2]);
      res[3] = (p[0] * m[0][3]) + (p[1] * m[1][3]) +
                  (p[2] * m[2][3]) + (p[3] * m[3][3]);

      return res;
    };

    var v3Length = function(a) {
      return sqrt((a[0] * a[0]) + (a[1] * a[1]) + (a[2] * a[2]));
    };

    var v3Scale = function(v, desiredLength) {
      var res = [];
      var len = v3Length(v);
      if (len !== 0) {
        var l = desiredLength / len;
        res[0] *= l;
        res[1] *= l;
        res[2] *= l;
      }
      return res;
    };

    var v3Dot = function(a, b) {
      return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
    };

    var v3Combine = function(a, b, ascl, bscl) {
      var res = [];
      res[0] = (ascl * a[0]) + (bscl * b[0]);
      res[1] = (ascl * a[1]) + (bscl * b[1]);
      res[2] = (ascl * a[2]) + (bscl * b[2]);
      return res;
    };

    var v3Cross = function(a, b) {
      var res = [];
      res[0] = (a[1] * b[2]) - (a[2] * b[1]);
      res[1] = (a[2] * b[0]) - (a[0] * b[2]);
      res[2] = (a[0] * b[1]) - (a[1] * b[0]);
      return res;
    };

    var decompose = function(mat) {
      var result = {};
      var localMatrix = cloneMatrix(mat);
      var i;
      var j;

      // Normalize the matrix.
      if (localMatrix[3][3] === 0) {
        return false;
      }

      for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
          localMatrix[i][j] /= localMatrix[3][3];
        }
      }

      var perspectiveMatrix = cloneMatrix(localMatrix);
      for (i = 0; i < 3; i++) {
        perspectiveMatrix[i][3] = 0;
      }
      perspectiveMatrix[3][3] = 1;

      if (determinant4x4(perspectiveMatrix) === 0) {
        return false;
      }

      // First, isolate perspective.  This is the messiest.
      if (localMatrix[0][3] !== 0 || localMatrix[1][3] !== 0 || localMatrix[2][3] !== 0) {
        // rightHandSide is the right hand side of the equation.
        var rightHandSide = [];
        rightHandSide[0] = localMatrix[0][3];
        rightHandSide[1] = localMatrix[1][3];
        rightHandSide[2] = localMatrix[2][3];
        rightHandSide[3] = localMatrix[3][3];

        // Solve the equation by inverting perspectiveMatrix and multiplying
        // rightHandSide by the inverse. (This is the easiest way, not
        // necessarily the best.)
        var inversePerspectiveMatrix = inverse(perspectiveMatrix);
        var transposedInversePerspectiveMatrix = transposeMatrix4(inversePerspectiveMatrix);
        var perspectivePoint = v4MulPointByMatrix(rightHandSide, transposedInversePerspectiveMatrix);

        result.perspectiveX = perspectivePoint[0];
        result.perspectiveY = perspectivePoint[1];
        result.perspectiveZ = perspectivePoint[2];
        result.perspectiveW = perspectivePoint[3];

        // Clear the perspective partition
        localMatrix[0][3] = localMatrix[1][3] = localMatrix[2][3] = 0;
        localMatrix[3][3] = 1;
      } else {
        // No perspective.
        result.perspectiveX = result.perspectiveY = result.perspectiveZ = 0;
        result.perspectiveW = 1;
      }

      // Next take care of translation (easy).
      result.translateX = localMatrix[3][0];
      localMatrix[3][0] = 0;
      result.translateY = localMatrix[3][1];
      localMatrix[3][1] = 0;
      result.translateZ = localMatrix[3][2];
      localMatrix[3][2] = 0;

      // Now get scale and shear.
      var row = [[], [], []];
      var pdum3;

      for (i = 0; i < 3; i++) {
        row[i][0] = localMatrix[i][0];
        row[i][1] = localMatrix[i][1];
        row[i][2] = localMatrix[i][2];
      }

      // Compute X scale factor and normalize first row.
      result.scaleX = v3Length(row[0]);
      v3Scale(row[0], 1.0);

      // Compute XY shear factor and make 2nd row orthogonal to 1st.
      result.skewXY = v3Dot(row[0], row[1]);
      v3Combine(row[1], row[0], row[1], 1.0, -result.skewXY);

      // Now, compute Y scale and normalize 2nd row.
      result.scaleY = v3Length(row[1]);
      v3Scale(row[1], 1.0);
      result.skewXY /= result.scaleY;

      // Compute XZ and YZ shears, orthogonalize 3rd row.
      result.skewXZ = v3Dot(row[0], row[2]);
      v3Combine(row[2], row[0], row[2], 1.0, -result.skewXZ);
      result.skewYZ = v3Dot(row[1], row[2]);
      v3Combine(row[2], row[1], row[2], 1.0, -result.skewYZ);

      // Next, get Z scale and normalize 3rd row.
      result.scaleZ = v3Length(row[2]);
      v3Scale(row[2], 1.0);
      result.skewXZ /= result.scaleZ;
      result.skewYZ /= result.scaleZ;

      // At this point, the matrix (in rows[]) is orthonormal.
      // Check for a coordinate system flip.  If the determinant
      // is -1, then negate the matrix and the scaling factors.
      pdum3 = v3Cross(row[1], row[2]);

      if (v3Dot(row[0], pdum3) < 0) {
        for (i = 0; i < 3; i++) {
          result.scaleX *= -1;
          row[i][0] *= -1;
          row[i][1] *= -1;
          row[i][2] *= -1;
        }
      }

      // Rotation (angles smaller then SMALL_NUMBER are zeroed)
      result.rotateY = rad2deg(asin(-row[0][2])) || 0;
      if (cos(result.rotateY) === 0) {
        result.rotateX = rad2deg(atan2(-row[2][0], row[1][1])) || 0;
        result.rotateZ = 0;
      } else {
        result.rotateX = rad2deg(atan2(row[1][2], row[2][2])) || 0;
        result.rotateZ = rad2deg(atan2(row[0][1], row[0][0])) || 0;
      }

      return result;
    };

    /* =========================================
    =            Factory interface            =
    =========================================*/

    var fCom = function(n, def) {
      // avoid scientific notation with toFixed
      var val = (n || def || 0);
      return String(val.toFixed(20));
    };

    var fPx = function(n, def) {
      return fCom(n, def) + 'px';
    };

    var fDeg = function(n, def) {
      return fCom(n, def) + 'deg';
    };

    return {
      fromCssMatrix: function(tr) {
        var M = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

        // Just returns identity in case no transform is setup for the element
        if (tr && tr !== 'none') {
          var elems = tr.split('(')[1].split(')')[0].split(',').map(Number);

          // Is a 2d transform: matrix(a, b, c, d, tx, ty) is a shorthand
          // for matrix3d(a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1)
          if (tr.match(/^matrix\(/)) {
            M[0][0] = elems[0];
            M[1][0] = elems[1];
            M[0][1] = elems[2];
            M[1][1] = elems[3];
            M[3][0] = elems[4];
            M[3][1] = elems[5];

          // Is a 3d transform, set elements by rows
          } else {
            for (var i = 0; i < 16; i++) {
              var row = floor(i / 4);
              var col = i % 4;
              M[row][col] = elems[i];
            }
          }
        }
        return decompose(M);
      },

      toCss: function(t) {
        //
        // Transforms are recomposed as a composition of:
        //
        // matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, perspective[0], perspective[1], perspective[2], perspective[3])
        // translate3d(translation[0], translation[1], translation[2])
        // rotateX(rotation[0]) rotateY(rotation[1]) rotateZ(rotation[2])
        // matrix3d(1,0,0,0, 0,1,0,0, 0,skew[2],1,0, 0,0,0,1)
        // matrix3d(1,0,0,0, 0,1,0,0, skew[1],0,1,0, 0,0,0,1)
        // matrix3d(1,0,0,0, skew[0],1,0,0, 0,0,1,0, 0,0,0,1)
        // scale3d(scale[0], scale[1], scale[2])
        //

        var perspective = [
          fCom(t.perspectiveX),
          fCom(t.perspectiveY),
          fCom(t.perspectiveZ),
          fCom(t.perspectiveW, 1)
        ];
        var translate = [
          fPx(t.translateX),
          fPx(t.translateY),
          fPx(t.translateZ)
        ];
        var scale = [
          fCom(t.scaleX),
          fCom(t.scaleY),
          fCom(t.scaleZ)
        ];
        var rotation = [
          fDeg(t.rotateX),
          fDeg(t.rotateY),
          fDeg(t.rotateZ)
        ];
        var skew = [
          fCom(t.skewXY),
          fCom(t.skewXZ),
          fCom(t.skewYZ)
        ];

        return [
          'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + perspective.join(',') + ')',
          'translate3d(' + translate.join(',') + ')',
          'rotateX(' + rotation[0] + ') rotateY(' + rotation[1] + ') rotateZ(' + rotation[2] + ')',
          'matrix3d(1,0,0,0,0,1,0,0,0,' + skew[2] + ',1,0,0,0,0,1)',
          'matrix3d(1,0,0,0,0,1,0,0,' + skew[1] + ',0,1,0,0,0,0,1)',
          'matrix3d(1,0,0,0,' + skew[0] + ',1,0,0,0,0,1,0,0,0,0,1)',
          'scale3d(' + scale.join(',') + ')'
        ].join(' ');
      },

      //
      // Returns a decomposition of the transform matrix applied
      // to `e`;
      //
      // NOTE: 2d matrices are translated to 3d matrices
      //       before any other operation.
      //
      get: function(e) {
        return this.fromCssMatrix(getElementTransformProperty(e));
      },

      // Recompose a transform from decomposition `t` and apply it to element `e`
      set: function(e, t) {
        var str = (typeof t === 'string') ? t : this.toCss(t);
        setElementTransformProperty(e, str);
      }
    };
  });
})();

/**
 * @module mobile-angular-ui.gestures
 * @position 100
 * @description
 *
 * It has directives and services to support `touch`, `swipe` and `drag` gestures.
 *
 * It does not need any `.css` to work.
 *
 * <div class="alert alert-warning">
 * <p>
 * <i class="fa fa-warning"></i> This module will not work with `ngTouch`
 * cause it is intended, among offering more features, to be a drop-in
 * replacement for it.
 * </p>
 * <p>
 * Be aware that `ngTouch` is still not playing well with `fastclick.js` and its usage with `mobile-angular-ui` is currently discouraged anyway.
 * </p>
 * </div>
 *
 * ## Usage
 *
 * `.gestures` module is not required by `mobile-angular-ui` module. It has no
 * dependency on other modules and is intended to be used alone with any other
 * angular framework.
 *
 * You have to include `mobile-angular-ui.gestures.min.js` to your project in order to use it. Ie.
 *
 * ``` html
 * <script src="/dist/js/mobile-angular-ui.gestures.min.js"></script>
 * ```
 *
 * ``` js
 * angular.module('myApp', ['mobile-angular-ui.gestures']);
 * ```
 */
(function() {
  'use strict';

  angular.module('mobile-angular-ui.gestures', [
    'mobile-angular-ui.gestures.drag',
    'mobile-angular-ui.gestures.swipe',
    'mobile-angular-ui.gestures.transform'
  ]);
})();
