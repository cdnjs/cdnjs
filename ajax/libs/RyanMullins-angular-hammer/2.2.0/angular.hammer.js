// ---- Angular Hammer ----

// Copyright (c) 2015 Ryan S Mullins <ryan@ryanmullins.org>
// Licensed under the MIT Software License
//
// (fairly heavy) modifications by James Wilson <me@unbui.lt>
//

(function (angular, Hammer) {
  'use strict';

  // Checking to make sure Hammer and Angular are defined

  if (typeof angular === 'undefined') {
    throw Error("angular-hammer: AngularJS (angular) is undefined but is necessary.");
  }
  if (typeof Hammer === 'undefined') {
    throw Error("angular-hammer: HammerJS (Hammer) is undefined but is necessary.");
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
  var NAME = 'hmTouchEvents';
  var hmTouchEvents = angular.module('hmTouchEvents', []);

  /**
   * Provides a common interface for configuring global manager and recognizer
   * options. Allows things like tap duration etc to be defaulted globally and
   * overridden on a per-directive basis as needed.
   *
   * @return {Object} functions to add manager and recognizer options.
   */
  hmTouchEvents.provider(NAME, function(){

    var self = this;
    var defaultRecognizerOpts = false;
    var recognizerOptsHash = {};
    var managerOpts = {};

    //
    // In order to use the Hamme rpresets provided, we need
    // to map the recognizer fn to some name:
    //
    var recognizerFnToName = {};
    recognizerFnToName[ Hammer.Tap.toString() ] = "tap";
    recognizerFnToName[ Hammer.Pan.toString() ] = "pan";
    recognizerFnToName[ Hammer.Pinch.toString() ] = "pinch";
    recognizerFnToName[ Hammer.Press.toString() ] = "press";
    recognizerFnToName[ Hammer.Rotate.toString() ] = "rotate";
    recognizerFnToName[ Hammer.Swipe.toString() ] = "swipe";

    //
    // normalize opts, setting its name as it should be keyed by
    // and any must-have options. currently only doubletap is treated
    // specially. each _name leads to a new recognizer.
    //
    function normalizeRecognizerOptions(opts){
      opts = angular.copy(opts);

      if(opts.event){

        if(opts.event == "doubletap"){
          opts.type = "tap";
          if(!opts.taps) opts.taps = 2;
          opts._name = "doubletap";
        } else {
          opts._name = false;
        }

      } else {
        opts._name = opts.type || false;
      }

      return opts;
    }
    //
    // create default opts for some eventName.
    // again, treat doubletap specially.
    //
    function defaultOptionsForEvent(eventName){
      if(eventName == "custom"){
        throw Error(NAME+"Provider: no defaults exist for custom events");
      }
      var ty = getRecognizerTypeFromeventName(eventName);
      return normalizeRecognizerOptions(
        eventName == "doubletap"
          ? {type:ty, event:"doubletap"}
          : {type:ty}
      );
    }

    //
    // Make use of presets from Hammer.defaults.preset array
    // in angular-hammer events.
    //
    self.applyHammerPresets = function(){
      var hammerPresets = Hammer.defaults.preset;

      //add every preset that, when normalized, has a _name.
      //this precludes most custom events.
      angular.forEach(hammerPresets, function(presetArr){

        var data = presetArr[1];
        if(!data.type) data.type = recognizerFnToName[presetArr[0]];
        data = normalizeRecognizerOptions(data);
        if(!data._name) return;
        recognizerOptsHash[data._name] = data;
      });
    }

    //
    // Add a manager option (key/val to extend or object to set all):
    //
    self.addManagerOption = function(name, val){
      if(typeof name == "object"){
        angular.extend(managerOpts, name);
      }
      else {
        managerOpts[name] = val;
      }
    }

    //
    // Add a recognizer option:
    //
    self.addRecognizerOption = function(val){
      if(Array.isArray(val)){
        for(var i = 0; i < val.length; i++) self.addRecognizerOption(val[i]);
        return;
      }
      if(typeof val !== "object"){
        throw Error(NAME+"Provider: addRecognizerOption: should be object or array of objects");
      }
      val = normalizeRecognizerOptions(val);

      //hash by name if present, else if no event name,
      //set as defaults.
      if(val._name){
        recognizerOptsHash[val.type] = val;
      } else if(!val.event){
        defaultRecognizerOpts = val;
      }

    }

    //provide an interface to this that the hm-* directives use
    //to extend their recognizer/manager opts.
    self.$get = function(){
      return {
        extendWithDefaultManagerOpts: function(opts){
          if(typeof opts != "object"){
            opts = {};
          } else {
            opts = angular.copy(opts);
          }
          for(var name in managerOpts) {
            if(!opts[name]) opts[name] = angular.copy(managerOpts[name]);
          }
          return opts;
        },
        extendWithDefaultRecognizerOpts: function(eventName, opts){
          if(typeof opts !== "object"){
            opts = [];
          }
          if(!Array.isArray(opts)){
            opts = [opts];
          }

          //dont apply anything if this is custom event
          //(beyond normalizing opts to an array):
          if(eventName == "custom") return opts;

          var recognizerType = getRecognizerTypeFromeventName(eventName);
          var specificOpts = recognizerOptsHash[eventName] || recognizerOptsHash[recognizerType];

          //get the last opt provided that matches the type or eventName
          //that we have. normalizing removes any eventnames we dont care about
          //(everything but doubletap at the moment).
          var foundOpt;
          var isExactMatch = false;
          var defaults = angular.extend({}, defaultRecognizerOpts || {}, specificOpts || {});
          opts.forEach(function(opt){

            if(!opt.event && !opt.type){
              return angular.extend(defaults, opt);
            }
            if(isExactMatch){
              return;
            }

            //more specific wins over less specific.
            if(opt.event == eventName){
              foundOpt = opt;
              isExactMatch = true;
            } else if(!opt.event && opt.type == recognizerType){
              foundOpt = opt;
            }

          });
          if(!foundOpt) foundOpt = defaultOptionsForEvent(eventName);
          else foundOpt = normalizeRecognizerOptions(foundOpt);


          return [angular.extend(defaults, foundOpt)];
        }
      };
    };

  });

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

    hmTouchEvents.directive(directiveName, ['$parse', '$window', NAME, function ($parse, $window, defaultEvents) {
        return {
          restrict: 'A',
          scope: false,
          link: function (scope, element, attrs) {

            // Check for Hammer and required functionality.
            // error if they arent found as unexpected behaviour otherwise
            if (!Hammer || !$window.addEventListener) {
              throw Error(NAME+": window.Hammer or window.addEventListener not found, can't add event "+directiveName);
            }

            var hammer = element.data('hammer'),
                managerOpts = defaultEvents.extendWithDefaultManagerOpts( scope.$eval(attrs.hmManagerOptions) ),
                recognizerOpts = defaultEvents.extendWithDefaultRecognizerOpts( eventName, scope.$eval(attrs.hmRecognizerOptions) );

            // Check for a manager, make one if needed and destroy it when
            // the scope is destroyed
            if (!hammer) {
              hammer = new Hammer.Manager(element[0], managerOpts);
              element.data('hammer', hammer);
              scope.$on('$destroy', function () {
                hammer.destroy();
              });
            }

            // Obtain and wrap our handler function to do a couple of bits for
            // us if options provided.
            var handlerExpr = $parse(attrs[directiveName]).bind(null,scope);
            var handler = function (event) {
                  event.element = element;

                  // Default invokeApply to true, overridden by recognizer option
                  var invokeApply = true;

                  var recognizer = hammer.get(getRecognizerTypeFromeventName(event.type));
                  if (recognizer) {
                    var opts = recognizer.options;
                    if (opts.preventDefault) {
                      event.preventDefault();
                    }
                    if (opts.stopPropagation) {
                      event.srcEvent.stopPropagation();
                    }

                    invokeApply = angular.isUndefined(opts.invokeApply) || opts.invokeApply;
                  }

                  if (invokeApply) {
                    scope.$apply(function(){
                      handlerExpr({ '$event': event });
                    });
                  } else {
                    handlerExpr({ '$event': event });
                  }
                };

            // The recognizer options are normalized to an array. This array
            // contains whatever events we wish to add (our prior extending
            // takes care of that), but we do a couple of specific things
            // depending on this directive so that events play nice together.
            angular.forEach(recognizerOpts, function (options) {

              if(eventName !== 'custom'){

                if (eventName === 'doubletap' && hammer.get('tap')) {
                  options.recognizeWith = 'tap';
                }
                else if (options.type == "pan" && hammer.get('swipe')) {
                  options.recognizeWith = 'swipe';
                }
                else if (options.type == "pinch" && hammer.get('rotate')) {
                  options.recognizeWith = 'rotate';
                }

              }

              //add the recognizer with these options:
              setupRecognizerWithOptions(
                hammer,
                applyManagerOptions(managerOpts, options),
                element
              );

              //if custom there may be multiple events to apply, which
              //we do here. else, we'll only ever add one.
              hammer.on(eventName, handler);

            });

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
   * @param {String}  type    Options that define the recognizer to add
   * @return {Object}         Reference to the new gesture recognizer, if
   *                          successful, null otherwise.
   */
  function addRecognizer (manager, name) {
    if (manager === undefined || name === undefined) { return null; }

    var recognizer;

    if (name.indexOf('pan') > -1) {
      recognizer = new Hammer.Pan();
    } else if (name.indexOf('pinch') > -1) {
      recognizer = new Hammer.Pinch();
    } else if (name.indexOf('press') > -1) {
      recognizer = new Hammer.Press();
    } else if (name.indexOf('rotate') > -1) {
      recognizer = new Hammer.Rotate();
    } else if (name.indexOf('swipe') > -1) {
      recognizer = new Hammer.Swipe();
    } else {
      recognizer = new Hammer.Tap();
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
    } else if (eventName.indexOf('tap') > -1) {
      return 'tap';
    } else {
      return "custom";
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
    if (manager == null || options == null || options.type == null) {
      return console.error('ERROR: Angular Hammer could not setup the' +
        ' recognizer. Values of the passed manager and options: ', manager, options);
    }

    var recognizer = manager.get(options._name);
    if (!recognizer) {
      recognizer = addRecognizer(manager, options._name);
    }

    if (!options.directions) {
      if (options._name === 'pan' || options._name === 'swipe') {
        options.directions = 'DIRECTION_ALL';
      } else if (options._name.indexOf('left') > -1) {
        options.directions = 'DIRECTION_LEFT';
      } else if (options._name.indexOf('right') > -1) {
        options.directions = 'DIRECTION_RIGHT';
      } else if (options._name.indexOf('up') > -1) {
        options.directions = 'DIRECTION_UP';
      } else if (options._name.indexOf('down') > -1) {
        options.directions = 'DIRECTION_DOWN';
      } else {
        options.directions = '';
      }
    }

    options.direction = parseDirections(options.directions);
    recognizer.set(options);

    if (typeof options.recognizeWith === 'string') {
      var recognizeWithRecognizer;

      if (manager.get(options.recognizeWith) == null){
        recognizeWithRecognizer = addRecognizer(manager, options.recognizeWith);
      }

      if (recognizeWithRecognizer != null) {
        recognizer.recognizeWith(recognizeWithRecognizer);
      }
    }

    if (typeof options.dropRecognizeWith  === 'string' &&
        manager.get(options.dropRecognizeWith) != null) {
      recognizer.dropRecognizeWith(manager.get(options.dropRecognizeWith));
    }

    if (typeof options.requireFailure  === 'string') {
      var requireFailureRecognizer;

      if (manager.get(options.requireFailure) == null){
        requireFailureRecognizer = addRecognizer(manager, {type:options.requireFailure});
      }

      if (requireFailureRecognizer != null) {
        recognizer.requireFailure(requireFailureRecognizer);
      }
    }

    if (typeof options.dropRequireFailure === 'string' &&
        manager.get(options.dropRequireFailure) != null) {
      recognizer.dropRequireFailure(manager.get(options.dropRequireFailure));
    }

    if (options.preventGhosts === true && element != null) {
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
})(angular, Hammer);
