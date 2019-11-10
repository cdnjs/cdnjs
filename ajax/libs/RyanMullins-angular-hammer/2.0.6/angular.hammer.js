(function (window, angular, Hammer) {
  'use strict';

  // ---- Default Hammer Directive Definitions ----

  var gestureTypes = [
    'hmPan:pan',
    'hmPanstart:panstart',
    'hmPanmove:panmove',
    'hmPanend:panend',
    'hmPancancel:pancancel',
    'hmPanleft:panleft',
    'hmPanright:panright',
    'hmPanup:panup',
    'hmPandown:pandown',
    'hmPinch:pinch',
    'hmPinchstart:pinchstart',
    'hmPinchmove:pinchmove',
    'hmPinchend:pinchend',
    'hmPinchcancel:pinchcancel',
    'hmPinchin:pinchin',
    'hmPinchout:pinchout',
    'hmPress:press',
    'hmRotate:rotate',
    'hmRotatestart:rotatestart',
    'hmRotatemove:rotatemove',
    'hmRotateend:rotateend',
    'hmRotatecancel:rotatecancel',
    'hmSwipe:swipe',
    'hmSwipeleft:swipeleft',
    'hmSwiperight:swiperight',
    'hmSwipeup:swipeup',
    'hmSwipedown:swipedown',
    'hmTap:tap',
    'hmDoubletap:doubletap'
  ];

  // ---- Module Definition ----

  angular.module('hmTouchEvents', [])
    .directive('hmCustom', ['$parse', hammerCustomDirective]);

  angular.forEach(gestureTypes, function (type) {
    var directive = type.split(':'),
        directiveName = directive[0],
        eventName = directive[1];

    angular.module('hmTouchEvents')
      .directive(directiveName, ['$parse', '$window', function ($parse, $window) {
        return {
          'restrict' : 'A',
          'link' : function (scope, element, attrs) {
            var handlerName = attrs[directiveName],
                handlerExpr = $parse(handlerName),
                handler = function (event) {
                  var phase = scope.$root.$$phase,
                      fn = function () {
                        handlerExpr(scope, {$event: event});
                      };

                  if (scope[handlerName]) {
                    scope[handlerName](event);
                  } else {
                    if (phase === '$apply' || phase === '$digest') {
                      fn();
                    } else {
                      scope.$apply(fn);
                    }
                  }
                },
                opts = angular.fromJson(attrs.hmOptions),
                gestureOpts = angular.fromJson(attrs.hmGestureOptions),
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
              if (gestureOpts) {
                angular.forEach(gestureOpts, function(value, key) {
                  var gesture = hammer.get(key);
                  if (gesture) {
                    gesture.set(value);
                  }
                });
              }
              element.data('hammer', hammer);
            }

            hammer.on(eventName, handler);
            scope.$on('$destroy', function () {
              hammer.off(eventName, handler);
            });
          }
        };
      }]);
  });

  // ---- Hammer Custom Recognizer Directive Implementation ----

  function hammerCustomDirective ($parse) {
    return {
      'restrict' : 'A',
      'link' : function (scope, element, attrs) {
        var hammer = element.data('hammer'),
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
            var phase = scope.$root.$$phase,
                fn = function () {
                  expression(scope, {$event: event});
                };

            if (scope[options.val]) {
              scope[options.val](event);
            } else {
              if (phase === '$apply' || phase === '$digest') {
                fn();
              } else {
                scope.$apply(fn);
              }
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
