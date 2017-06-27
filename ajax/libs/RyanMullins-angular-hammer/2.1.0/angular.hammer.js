(function (window, angular, Hammer) {
  'use strict';

  // ---- Default Hammer Directive Definitions ----

  var gestureTypes = [
    'hmCustom:custom',
    'hmSwipe:swipe',
    'hmSwipeleft:swipeleft',
    'hmSwiperight:swiperight',
    'hmSwipeup:swipeup',
    'hmSwipedown:swipedown',
    'hmPan:pan',
    'hmPanstart:panstart',
    'hmPanmove:panmove',
    'hmPanend:panend',
    'hmPancancel:pancancel',
    'hmPanleft:panleft',
    'hmPanright:panright',
    'hmPanup:panup',
    'hmPandown:pandown',
    'hmPress:press',
    'hmRotate:rotate',
    'hmRotatestart:rotatestart',
    'hmRotatemove:rotatemove',
    'hmRotateend:rotateend',
    'hmRotatecancel:rotatecancel',
    'hmPinch:pinch',
    'hmPinchstart:pinchstart',
    'hmPinchmove:pinchmove',
    'hmPinchend:pinchend',
    'hmPinchcancel:pinchcancel',
    'hmPinchin:pinchin',
    'hmPinchout:pinchout',
    'hmTap:tap',
    'hmDoubletap:doubletap'
  ];

  // ---- Module Definition ----

  angular.module('hmTouchEvents', []);

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
                managerOpts = angular.fromJson(attrs.hmManagerOptions),
                recognizerOpts = angular.fromJson(attrs.hmRecognizerOptions),
                hammer = element.data('hammer');

            // Check for Hammer and required functionality
            // If no Hammer, maybe bind tap and doubletap to click and dblclick

            if (!Hammer || !$window.addEventListener) {
              if (directiveName === 'hmTap') {
                element.bind('click', handler);
              }

              if (directiveName === 'hmDoubleTap') {
                element.bind('dblclick', handler);
              }

              return;
            }

            // Hammer exists, check for a manager and set up the recognizers.

            if (!hammer) {
              hammer = new Hammer.Manager(element[0], managerOpts);
              element.data('hammer', hammer);
            }

            // Custom events are treated differently than others

            if (eventName === 'custom') {
              if (angular.isArray(recognizerOpts)) {
                angular.forEach(recognizerOpts, function (options) {
                  setupRecognizerWithOptions(hammer, options);

                  hammer.on(options.event, handler);
                  scope.$on('$destroy', function () {
                    hammer.off(options.event, handler);
                  });
                });
              } else if (angular.isObject(recognizerOpts)) {
                setupRecognizerWithOptions(hammer, recognizerOpts);

                hammer.on(options.event, handler);
                scope.$on('$destroy', function () {
                  hammer.off(options.event, handler);
                });
              }
            } else {
              if (angular.isArray(recognizerOpts)) {
                angular.forEach(recognizerOpts, function (options) {
                  if (eventName.indexOf(options.type) > -1) {
                    setupRecognizerWithOptions(hammer, options);
                  }
                });
              } else if (angular.isObject(recognizerOpts) &&
                  eventName.indexOf(recognizerOpts.type) > -1) {
                setupRecognizerWithOptions(hammer, recognizerOpts);
              } else {
                recognizerOpts = {'type':eventName};

                if (recognizerOpts.type.indexOf('doubletap') > -1) {
                  recognizerOpts.event = recognizerOpts.type;
                  recognizerOpts.taps = 2;

                  if (hammer.get('tap')) {
                    recognizerOpts.recognizeWith = 'tap';
                  }
                }

                if (recognizerOpts.type.indexOf('pan') > -1 &&
                    hammer.get('swipe')) {
                  recognizerOpts.recognizeWith = 'swipe';
                }

                if (recognizerOpts.type.indexOf('pinch') > -1 &&
                    hammer.get('rotate')) {
                  recognizerOpts.recognizeWith = 'rotate';
                }

                setupRecognizerWithOptions(hammer, recognizerOpts);
              }

              hammer.on(eventName, handler);
              scope.$on('$destroy', function () {
                hammer.off(eventName, handler);
              });
            }
          }
        };
      }]);
  });

  // ---- Private Functions -----

  function addRecognizer (manager, options) {
    var recognizer;

    if (options.type) {
      if (options.type.indexOf('pan') > -1) {
        recognizer = new Hammer.Pan(options);
      }

      if (options.type.indexOf('pinch') > -1) {
        recognizer = new Hammer.Pinch(options);
      }

      if (options.type.indexOf('press') > -1) {
        recognizer = new Hammer.Press(options);
      }

      if (options.type.indexOf('rotate') > -1) {
        recognizer = new Hammer.Rotate(options);
      }

      if (options.type.indexOf('swipe') > -1) {
        recognizer = new Hammer.Swipe(options);
      }

      if (options.type.indexOf('tap') > -1) {
        recognizer = new Hammer.Tap(options);
      }
    }

    if (manager && recognizer) {
      manager.add(recognizer);
      return recognizer;
    }
  }

  function setupRecognizerWithOptions (manager, options) {
    var recognizer = manager.get(options.type);

    if (!recognizer) {
      recognizer = addRecognizer(manager, options);
    }

    if (options) {
      if (options.directions) {
        options.direction = parseDirections(options.directions);
      }

      recognizer.set(options);
    }

    if (options.recognizeWith) {
      recognizer.recognizeWith(options.recognizeWith);
    }

    if (options.dropRecognizeWith) {
      recognizer.dropRecognizeWith(options.dropRecognizeWith);
    }

    if (options.requireFailure) {
      recognizer.requireFailure(options.requireFailure);
    }

    if (options.dropRequireFailure) {
      recognizer.dropRequireFailure(options.dropRequireFailure);
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
