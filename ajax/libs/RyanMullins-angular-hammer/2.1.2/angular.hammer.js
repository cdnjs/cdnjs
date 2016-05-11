// ---- Angular Hammer ----

// Copyright (c) 2014 Ryan S Mullins <ryan@ryanmullins.org>
// Licensed under the MIT Software License

(function () {
  'use strict';

  // Checking to make sure Hammer and Angular are defined
  var angular, Hammer;

  if (typeof angular === 'undefined') {
    if (typeof require !== 'undefined' && require) {
      angular = require('angular');
    } else if (typeof window.angular !== 'undefined') {
      angular = window.angular;
    } else {
      return console.log('ERROR: Angular Hammer could not find or require() a reference to angular');
    }
  }

  if (typeof Hammer === 'undefined') {
    if (typeof require !== 'undefined' && require) {
      try {
        Hammer = require('hammerjs');
      } catch (e) {
        try {
          Hammer = require('hammer');
        } catch (e) {
          return console.log('ERROR: Angular Hammer could not require() a reference to Hammer');
        }
      }
    } else if (typeof window.Hammer !== 'undefined') {
      Hammer = window.Hammer;
    } else {
      return console.log('ERROR: Angular Hammer could not find or require() a reference to Hammer');
    }
  }

  /**
   * Mapping of the gesture event names with the Angular attribute directive
   * names. Follows the form: <directiveName>:<eventName>.
   *
   * @type {Array}
   */
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

  /**
   * @module hmTouchEvents
   * @description Angular.js module for adding Hammer.js event listeners to HTML
   * elements using attribute directives
   * @requires angular
   * @requires hammer
   */
  angular.module('hmTouchEvents', []);

  /**
   * Iterates through each gesture type mapping and creates a directive for
   * each of the
   *
   * @param  {String} type Mapping in the form of <directiveName>:<eventName>
   * @return None
   */
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
                  event.element = element;

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

            if (eventName === 'custom') {
              // Handling custom events

              // Custom events require you to define hmRecognizerOptions. If you
              // do not define the this attribute no custom handlers will be created

              if (angular.isArray(recognizerOpts)) {
                // The recognizer options may be stored in an array. In this
                // case, Angular Hammer iterates through the array of options
                // trying to find an occurrence of the options.type in the event
                // name. If it find the type in the event name, it applies those
                // options to the recognizer for events with that name. If it
                // does not find the type in the event name it moves on.

                angular.forEach(recognizerOpts, function (options) {
                  setupRecognizerWithOptions(hammer, options);

                  hammer.on(options.event, handler);
                  scope.$on('$destroy', function () {
                    hammer.destroy();
                  });
                });
              } else if (angular.isObject(recognizerOpts)) {
                // Recognizer options may be stored as an object. In this case,
                // Angular Hammer applies the options directly to the manager
                // instance for this element.

                setupRecognizerWithOptions(hammer, recognizerOpts);

                hammer.on(options.event, handler);
                scope.$on('$destroy', function () {
                  hammer.destroy();
                });
              }
            } else {
              // Handling the standard events

              if (angular.isArray(recognizerOpts)) {
                // The recognizer options may be stored in an array. In this
                // case, Angular Hammer iterates through the array of options
                // trying to find an occurrence of the options.type in the event
                // name. If it find the type in the event name, it applies those
                // options to the recognizer for events with that name. If it
                // does not find the type in the event name it moves on.

                angular.forEach(recognizerOpts, function (options) {
                  if (eventName.indexOf(options.type) > -1) {
                    setupRecognizerWithOptions(hammer, options);
                  }
                });
              } else if (angular.isObject(recognizerOpts) &&
                  eventName.indexOf(recognizerOpts.type) > -1) {
                // Recognizer options may be stored as an object. In this case,
                // Angular Hammer checks to make sure that the options type
                // property is found in the event name. If the options are
                // designated for this general type of event, Angular Hammer
                // applies the options directly to the manager instance for
                // this element.

                setupRecognizerWithOptions(hammer, recognizerOpts);
              } else {
                // If no options are supplied, or the supplied options do not
                // match any of the above conditions, Angular Hammer sets up
                // the default options that a manager instantiated using
                // Hammer() would have.

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
                hammer.destroy();
              });
            }
          }
        };
      }]);
  });

  // ---- Private Functions -----

  /**
   * Adds a gesture recognizer to a given manager. The type of recognizer to
   * add is determined by the value of the options.type property.
   *
   * @param {Object}  manager Hammer.js manager object assigned to an element
   * @param {Object}  options Options that define the recognizer to add
   * @return {Object} Reference to the new gesture recognizer, if successful,
   *                  null otherwise.
   */
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

  /**
   * Applies the passed options object to the appropriate gesture recognizer.
   * Recognizers are created if they do not already exist. See the README for a
   * description of the options object that can be passed to this function.
   *
   * @param  {Object} manager Hammer.js manager object assigned to an element
   * @param  {Object} options Options applied to a recognizer managed by manager
   * @return None
   */
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

  /**
   * Parses the value of the directions property of any Angular Hammer options
   * object and converts them into the standard Hammer.js directions values.
   *
   * @param  {String} dirs Direction names separated by '|' characters
   * @return {Number}      Hammer.js direction value
   */
  function parseDirections (dirs) {
    var directions = 0;

    angular.forEach(dirs.split('|'), function (direction) {
      if (Hammer.hasOwnProperty(direction)) {
        directions = directions | Hammer[direction];
      }
    });

    return directions;
  }
})();
