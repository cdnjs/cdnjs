/**
 * angular-hammer v2.0.0
 * (c) 2013 Monospaced http://monospaced.com
 * (c) 2014 Ryan S Mullins http://ryanmullins.org
 * License: MIT
 */

(function (window, angular, Hammer) {
  'use strict';

  // ---- Default Hammer Directive Definitions ----

  var gestureTypes = [
    'hmPan:pan',
    'hmPanStart:panstart',
    'hmPanMove:panmove',
    'hmPanEnd:panend',
    'hmPanCancel:pancancel',
    'hmPanLeft:panleft',
    'hmPanRight:panright',
    'hmPanUp:panup',
    'hmPanDown:pandown',
    'hmPinch:pinch',
    'hmPinchStart:pinchstart',
    'hmPinchMove:pinchmove',
    'hmPinchEnd:pinchend',
    'hmPinchCancel:pinchcancel',
    'hmPinchIn:pinchin',
    'hmPinchOut:pinchout',
    'hmPress:press',
    'hmRotate:rotate',
    'hmRotateStart:rotatestart',
    'hmRotateMove:rotatemove',
    'hmRotateEnd:rotateend',
    'hmRotateCancel:rotatecancel',
    'hmSwipe:swipe',
    'hmSwipeLeft:swipeleft',
    'hmSwipeRight:swiperight',
    'hmSwipeUp:swipeup',
    'hmSwipeDown:swipedown',
    'hmTap:tap',
    'hmDoubleTap:doubletap'
  ];

  // ---- Module Definition ----

  /**
   * @ngInject
   */
  angular.module('hmTouchEvents', [])
    .directive('hmCustom', hammerCustomDirective);

  angular.forEach(gestureTypes, function (type) {
    var directive = type.split(':'),
        directiveName = directive[0],
        eventName = directive[1];

    /**
     * @ngInject
     */
    angular.module('hmTouchEvents')
      .directive(directiveName, function ($parse, $window) {
        return {
          'restrict' : 'A',
          'link' : function (scope, element, attrs) {
            var apply = scope.safeApply || scope.$apply,
                handlerName = attrs[directiveName],
                handlerExpr = $parse(handlerName),
                handler = function (event) {
                            if (scope[handlerName]) {
                              scope[handlerName](event);
                            } else {
                              apply(function () {
                                handlerExpr(scope, {$event: event});
                              });
                            }
                          },
                opts = angular.fromJson(attrs.hmOptions),
                hammer = element.data('hammer');

            if (!Hammer || !$window.addEventListener) {
              if (directiveName === 'hmTap') {
                element.bind('click', handler);
              }

              if (directiveName === 'hmDoubleTap') {
                element.bind('dblclick', handler);
              }

              return;
            }

            if (!hammer) {
              hammer = new Hammer(element[0], opts);
              element.data('hammer', hammer);
            }

            hammer.on(eventName, handler);
            scope.$on('$destroy', function () {
              hammer.off(eventName, handler);
            });
          }
        };
      });
  });

  // ---- Hammer Custom Recognizer Directive Implementation ----

  function hammerCustomDirective ($parse) {
    return {
      'restrict' : 'A',
      'link' : function (scope, element, attrs) {
        var apply = scope.safeApply || scope.$apply,
            hammer = element.data('hammer'),
            opts = angular.fromJson(attrs.hmOptions),
            recognizerList = angular.fromJson(attrs.hmCustom);

        if (!hammer) {
          hammer = new Hammer.Manager(element[0], opts);
          element.data('hammer', hammer);
        }

        angular.forEach(recognizerList, function (options) {
          var expression,
              handler,
              recognizer;

          if (options.directions) {
            options.directions = parseDirections(options.directions);
          }

          recognizer = hammer.get(options.event);

          if (recognizer) {
            recognizer.set(options);
          } else {
            addRecognizer(hammer, options);
          }

          if (options.recognizeWith) {
            recognizer.recognizeWith(options.recognizeWith);
          }

          if (options.requireFailure) {
            recognizer.requireFailure(options.requireFailure);
          }

          expression = $parse(options.val);
          handler = function (event) {
            if (scope[options.val]) {
              scope[options.val](event);
            } else {
              apply(function () {
                expression(scope, {$event: event});
              });
            }
          };

          hammer.on(options.event, handler);
          scope.$on('$destroy', function () {
            hammer.off(options.event, handler);
          });
        });
      }
    };
  }

  // ---- Private Functions -----

  function addRecognizer (manager, options) {
    var recognizer;

    if (options && options.type && options.event) {
      if (options.type === 'pan') {
        recognizer = new Hammer.Pan(options);
      }

      if (options.type === 'pinch') {
        recognizer = new Hammer.Pinch(options);
      }

      if (options.type === 'press') {
        recognizer = new Hammer.Press(options);
      }

      if (options.type === 'rotate') {
        recognizer = new Hammer.Rotate(options);
      }

      if (options.type === 'swipe') {
        recognizer = new Hammer.Swipe(options);
      }

      if (options.type === 'tap') {
        recognizer = new Hammer.Tap(options);
      }
    }

    if (manager && recognizer) {
      manager.add(recognizer);
    }
  }

  function parseDirections (dirs) {
    var directions = 0;

    angular.forEach(dirs.split('|'), function (direction) {
      if (Hammer.hasOwnProperty(direction)) {
        directions = directions | Hammer[direction];
      }
    });

    return directions;
  }
})(window, window.angular, window.Hammer);
