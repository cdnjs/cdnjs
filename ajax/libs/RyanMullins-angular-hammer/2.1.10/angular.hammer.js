// ---- Angular Hammer ----

// Copyright (c) 2014 Ryan S Mullins <ryan@ryanmullins.org>
// Licensed under the MIT Software License

(function (window, angular, Hammer) {
  'use strict';

  // Checking to make sure Hammer and Angular are defined

  if (typeof angular === 'undefined') {
    if (typeof require !== 'undefined' && require) {
      try {
        angular = require('angular');
      } catch (e) {
        return console.log('ERROR: Angular Hammer could not require() a reference to angular');
      }
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
        return console.log('ERROR: Angular Hammer could not require() a reference to Hammer');
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
    'hmPressup:pressup',
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

            // Check for Hammer and required functionality
            // If no Hammer, maybe bind tap and doubletap to click and dblclick

            if (!Hammer || !$window.addEventListener) {
              if (directiveName === 'hmTap') {
                element.bind('click', handler);
              }

              if (directiveName === 'hmDoubletap') {
                element.bind('dblclick', handler);
              }

              return;
            }

            var hammer = element.data('hammer'),
                managerOpts = angular.fromJson(attrs.hmManagerOptions),
                recognizerOpts = angular.fromJson(attrs.hmRecognizerOptions);


            // Check for a manager, make one if needed and destroy it when
            // the scope is destroyed

            if (!hammer) {
              hammer = new Hammer.Manager(element[0], managerOpts);
              element.data('hammer', hammer);
              scope.$on('$destroy', function () {
                hammer.destroy();
              });
            }

            // Instantiate the handler

            var handlerName = attrs[directiveName],
                handlerExpr = $parse(handlerName),
                handler = function (event) {
                  var phase = scope.$root.$$phase,
                      recognizer = hammer.get(event.type);

                  event.element = element;

                  if (recognizer) {
                    if (recognizer.options.preventDefault) {
                      event.preventDefault();
                    }

                    if (recognizer.options.stopPropagation) {
                      event.srcEvent.stopPropagation();
                    }
                  }

                  if (phase === '$apply' || phase === '$digest') {
                    callHandler();
                  } else {
                    scope.$apply(callHandler);
                  }

                  function callHandler () {
                    var fn = handlerExpr(scope, {'$event':event});

                    if (fn) {
                      fn.call(scope, event);
                    }
                  }
                };

            // Setting up the recognizers based on the supplied options

            if (angular.isArray(recognizerOpts)) {
              // The recognizer options may be stored in an array. In this
              // case, Angular Hammer iterates through the array of options
              // trying to find an occurrence of the options.type in the event
              // name. If it find the type in the event name, it applies those
              // options to the recognizer for events with that name. If it
              // does not find the type in the event name it moves on.

              angular.forEach(recognizerOpts, function (options) {
                if (directiveName === 'hmCustom') {
                  eventName = options.event;
                } else {
                  if (!options.type) {
                    options.type = getRecognizerTypeFromeventName(eventName);
                  }

                  if (options.event) {
                    delete options.event;
                  }
                }

                if (directiveName === 'hmCustom' ||
                    eventName.indexOf(options.type) > -1) {
                  setupRecognizerWithOptions(
                    hammer,
                    applyManagerOptions(managerOpts, options),
                    element);
                }
              });
            } else if (angular.isObject(recognizerOpts)) {
              // Recognizer options may be stored as an object. In this case,
              // Angular Hammer checks to make sure that the options type
              // property is found in the event name. If the options are
              // designated for this general type of event, Angular Hammer
              // applies the options directly to the manager instance for
              // this element.

              if (directiveName === 'hmCustom') {
                eventName = recognizerOpts.event;
              } else {
                  if (!recognizerOpts.type) {
                    recognizerOpts.type = getRecognizerTypeFromeventName(eventName);
                  }

                  if (recognizerOpts.event) {
                    delete recognizerOpts.event;
                  }
              }

              if (directiveName === 'hmCustom' ||
                  eventName.indexOf(recognizerOpts.type) > -1) {
                setupRecognizerWithOptions(
                  hammer,
                  applyManagerOptions(managerOpts, recognizerOpts),
                  element);
              }
            } else if (directiveName !== 'hmCustom') {
              // If no options are supplied, or the supplied options do not
              // match any of the above conditions, Angular Hammer sets up
              // the default options that a manager instantiated using
              // Hammer() would have.

              recognizerOpts = {
                'type': getRecognizerTypeFromeventName(eventName)
              };

              if (directiveName === 'hmDoubletap') {
                recognizerOpts.event = eventName;
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

              setupRecognizerWithOptions(
                hammer,
                applyManagerOptions(managerOpts, recognizerOpts),
                element);
            } else {
              eventName = null;
            }

            if (eventName) {
              hammer.on(eventName, handler);
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
    if (!manager || !options || !options.type) { return null; }

    var recognizer;

    if (options.type.indexOf('pan') > -1) {
      recognizer = new Hammer.Pan(options);
    } else if (options.type.indexOf('pinch') > -1) {
      recognizer = new Hammer.Pinch(options);
    } else if (options.type.indexOf('press') > -1) {
      recognizer = new Hammer.Press(options);
    } else if (options.type.indexOf('rotate') > -1) {
      recognizer = new Hammer.Rotate(options);
    } else if (options.type.indexOf('swipe') > -1) {
      recognizer = new Hammer.Swipe(options);
    } else {
      recognizer = new Hammer.Tap(options);
    }

    manager.add(recognizer);
    return recognizer;
  }

  /**
   * Applies certain manager options to individual recognizer options.
   *
   * @param  {Object} managerOpts    Manager options
   * @param  {Object} recognizerOpts Recognizer options
   * @return None
   */
  function applyManagerOptions (managerOpts, recognizerOpts) {
    if (managerOpts) {
      recognizerOpts.preventGhosts = managerOpts.preventGhosts;
    }

    return recognizerOpts;
  }

  /**
   * Extracts the type of recognizer that should be instantiated from a given
   * event name. Used only when no recognizer options are provided.
   *
   * @param  {String} eventName Name to derive the recognizer type from
   * @return {string}           Type of recognizer that fires events with that name
   */
  function getRecognizerTypeFromeventName (eventName) {
    if (eventName.indexOf('pan') > -1) {
      return 'pan';
    } else if (eventName.indexOf('pinch') > -1) {
      return 'pinch';
    } else if (eventName.indexOf('press') > -1) {
      return 'press';
    } else if (eventName.indexOf('rotate') > -1) {
      return 'rotate';
    } else if (eventName.indexOf('swipe') > -1) {
      return 'swipe';
    } else {
      return 'tap';
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
  function setupRecognizerWithOptions (manager, options, element) {
    if (!manager || !options) { return; }

    var recognizer = manager.get(options.type);

    if (!recognizer) {
      recognizer = addRecognizer(manager, options);
    }

    if (!options.directions) {
      if (options.type === 'pan' || options.type === 'swipe') {
        options.directions = 'DIRECTION_ALL';
      } else if (options.type.indexOf('left') > -1) {
        options.directions = 'DIRECTION_LEFT';
      } else if (options.type.indexOf('right') > -1) {
        options.directions = 'DIRECTION_RIGHT';
      } else if (options.type.indexOf('up') > -1) {
        options.directions = 'DIRECTION_UP';
      } else if (options.type.indexOf('down') > -1) {
        options.directions = 'DIRECTION_DOWN';
      } else {
        options.directions = '';
      }
    }

    options.direction = parseDirections(options.directions);
    recognizer.set(options);

    if (options.recognizeWith) {
      if (!manager.get(options.recognizeWith)){
        addRecognizer(manager, {type:options.recognizeWith});
      }

      recognizer.recognizeWith(manager.get(options.recognizeWith));
    }

    if (options.dropRecognizeWith && manager.get(options.dropRecognizeWith)) {
      recognizer.dropRecognizeWith(manager.get(options.dropRecognizeWith));
    }

    if (options.requireFailure) {
      if (!manager.get(options.requireFailure)){
        addRecognizer(manager, {type:options.requireFailure});
      }

      recognizer.requireFailure(manager.get(options.requireFailure));
    }

    if (options.dropRequireFailure && manager.get(options.dropRequireFailure)) {
      recognizer.dropRequireFailure(manager.get(options.dropRequireFailure));
    }

    if (options.preventGhosts && element) {
      preventGhosts(element);
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

  // ---- Preventing Ghost Clicks ----

  /**
   * Modified from: https://gist.github.com/jtangelder/361052976f044200ea17
   *
   * Prevent click events after a touchend.
   *
   * Inspired/copy-paste from this article of Google by Ryan Fioravanti
   * https://developers.google.com/mobile/articles/fast_buttons#ghost
   */

  function preventGhosts (element) {
    if (!element) { return; }

    var coordinates = [],
        threshold = 25,
        timeout = 2500;

    if ('ontouchstart' in window) {
      element[0].addEventListener('touchstart', resetCoordinates, true);
      element[0].addEventListener('touchend', registerCoordinates, true);
      element[0].addEventListener('click', preventGhostClick, true);
      element[0].addEventListener('mouseup', preventGhostClick, true);
    }

    /**
     * prevent clicks if they're in a registered XY region
     * @param {MouseEvent} ev
     */
    function preventGhostClick (ev) {
      for (var i = 0; i < coordinates.length; i++) {
        var x = coordinates[i][0];
        var y = coordinates[i][1];

        // within the range, so prevent the click
        if (Math.abs(ev.clientX - x) < threshold &&
            Math.abs(ev.clientY - y) < threshold) {
          ev.stopPropagation();
          ev.preventDefault();
          break;
        }
      }
    }

    /**
     * reset the coordinates array
     */
    function resetCoordinates () {
      coordinates = [];
    }

    /**
     * remove the first coordinates set from the array
     */
    function popCoordinates () {
      coordinates.splice(0, 1);
    }

    /**
     * if it is an final touchend, we want to register it's place
     * @param {TouchEvent} ev
     */
    function registerCoordinates (ev) {
      // touchend is triggered on every releasing finger
      // changed touches always contain the removed touches on a touchend
      // the touches object might contain these also at some browsers (firefox os)
      // so touches - changedTouches will be 0 or lower, like -1, on the final touchend
      if(ev.touches.length - ev.changedTouches.length <= 0) {
        var touch = ev.changedTouches[0];
        coordinates.push([touch.clientX, touch.clientY]);

        setTimeout(popCoordinates, timeout);
      }
    }
  }
})(window, window.angular, window.Hammer);
