/*
* touchSwipe - jQuery Plugin
* https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* http://labs.skinkers.com/touchSwipe/
* http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson (www.skinkers.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* $version: 1.5.1
*
* Changelog
* $Date: 2010-12-12 (Wed, 12 Dec 2010) $
* $version: 1.0.0 
* $version: 1.0.1 - removed multibyte comments
*
* $Date: 2011-21-02 (Mon, 21 Feb 2011) $
* $version: 1.1.0 	- added allowPageScroll property to allow swiping and scrolling of page
*					- changed handler signatures so one handler can be used for multiple events
* $Date: 2011-23-02 (Wed, 23 Feb 2011) $
* $version: 1.2.0 	- added click handler. This is fired if the user simply clicks and does not swipe. The event object and click target are passed to handler.
*					- If you use the http://code.google.com/p/jquery-ui-for-ipad-and-iphone/ plugin, you can also assign jQuery mouse events to children of a touchSwipe object.
* $version: 1.2.1 	- removed console log!
*
* $version: 1.2.2 	- Fixed bug where scope was not preserved in callback methods. 
*
* $Date: 2011-28-04 (Thurs, 28 April 2011) $
* $version: 1.2.4 	- Changed licence terms to be MIT or GPL inline with jQuery. Added check for support of touch events to stop non compatible browsers erroring.
*
* $Date: 2011-27-09 (Tues, 27 September 2011) $
* $version: 1.2.5 	- Added support for testing swipes with mouse on desktop browser (thanks to https://github.com/joelhy)
*
* $Date: 2012-14-05 (Mon, 14 May 2012) $
* $version: 1.2.6 	- Added timeThreshold between start and end touch, so user can ignore slow swipes (thanks to Mark Chase). Default is null, all swipes are detected
* 
* $Date: 2012-05-06 (Tues, 05 June 2012) $
* $version: 1.2.7 	- Changed time threshold to have null default for backwards compatibility. Added duration param passed back in events, and refactored how time is handled.
*
* $Date: 2012-05-06 (Tues, 05 June 2012) $
* $version: 1.2.8 	- Added the possibility to return a value like null or false in the trigger callback. In that way we can control when the touch start/move should take effect or not (simply by returning in some cases return null; or return false;) This effects the ontouchstart/ontouchmove event.
*
* $Date: 2012-06-06 (Wed, 06 June 2012) $
* $version: 1.3.0 	- Refactored whole plugin to allow for methods to be executed, as well as exposed defaults for user override. Added 'enable', 'disable', and 'destroy' methods
*
* $Date: 2012-05-06 (Fri, 05 June 2012) $
* $version: 1.3.1 	- Bug fixes  - bind() with false as last argument is no longer supported in jQuery 1.6, also, if you just click, the duration is now returned correctly.
*
* $Date: 2012-29-07 (Sun, 29 July 2012) $
* $version: 1.3.2	- Added fallbackToMouseEvents option to NOT capture mouse events on non touch devices.
* 			- Added "all" fingers value to the fingers property, so any combinatin of fingers triggers the swipe, allowing event handlers to check the finger count
*
* $Date: 2012-09-08 (Thurs, 9 Aug 2012) $
* $version: 1.3.3	- Code tidy prep for minified version
*
* $Date: 2012-04-10 (wed, 4 Oct 2012) $
* $version: 1.4.0	- Added pinch support, pinchIn and pinchOut
*
* $Date: 2012-11-10 (Thurs, 11 Oct 2012) $
* $version: 1.5.0	- Added excludedElements, a jquery selector that specifies child elements that do NOT trigger swipes. By default, this is one select that removes all form, input select, button and anchor elements.
*
* $Date: 2012-22-10 (Mon, 22 Oct 2012) $
* $version: 1.5.1	- Fixed bug with jQuery 1.8 and trailing comma in excludedElements
*
* A jQuery plugin to capture left, right, up and down swipes on touch devices.
* You can capture 2 finger or 1 finger swipes, set the threshold and define either a catch all handler, or individual direction handlers.
* Options: The defaults can be overridden by setting them in $.fn.swipe.defaults
* 		swipe 			Function 	A catch all handler that is triggered for all swipe directions. Handler is passed 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" , the distance of the swipe, the duration of the swipe and the finger count.
* 		swipeLeft		Function 	A handler that is triggered for "left" swipes. Handler is passed 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down"  , the distance of the swipe, the duration of the swipe and the finger count.
* 		swipeRight		Function 	A handler that is triggered for "right" swipes. Handler is passed 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down"  , the distance of the swipe, the duration of the swipe and the finger count.
* 		swipeUp			Function 	A handler that is triggered for "up" swipes. Handler is passed 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" , the distance of the swipe, the duration of the swipe and the finger count.
* 		swipeDown		Function 	A handler that is triggered for "down" swipes. Handler is passed 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down"  , the distance of the swipe, the duration of the swipe and the finger count.
*		swipeStatus 	Function 	A handler triggered for every phase of the swipe. Handler is passed 4 arguments: event : The original event object, phase:The current swipe phase, either "start", "move", "end" or "cancel". direction : The swipe direction, either "up?, "down?, "left " or "right?.distance : The distance of the swipe.Duration : The duration of the swipe :  The finger count
*		
* 		pinchIn			Function 	A handler triggered when the user pinch zooms inward. Handler is passed 
* 		pinchOut		Function 	A handler triggered when the user pinch zooms outward. Handler is passed
* 		pinchStatus		Function 	A handler triggered for every phase of a pinch. Handler is passed 4 arguments: event : The original event object, phase:The current swipe face, either "start", "move", "end" or "cancel". direction : The swipe direction, either "in" or "out". distance : The distance of the pinch, zoom: the pinch zoom level
* 		
* 		click			Function	A handler triggered when a user just clicks on the item, rather than swipes it. If they do not move, click is triggered, if they do move, it is not.
*
* 		fingers 		int 		Default 1. 	The number of fingers to trigger the swipe, 1 or 2.
* 		threshold 		int  		Default 75.	The number of pixels that the user must move their finger by before it is considered a swipe.
* 		maxTimeThreshold 	int  		Default null. Time, in milliseconds, between touchStart and touchEnd must NOT exceed in order to be considered a swipe.
*		triggerOnTouchEnd Boolean Default true If true, the swipe events are triggered when the touch end event is received (user releases finger).  If false, it will be triggered on reaching the threshold, and then cancel the touch event automatically.
*		allowPageScroll String Default "auto". How the browser handles page scrolls when the user is swiping on a touchSwipe object. 
*										"auto" : all undefined swipes will cause the page to scroll in that direction.
*										"none" : the page will not scroll when user swipes.
*										"horizontal" : will force page to scroll on horizontal swipes.
*										"vertical" : will force page to scroll on vertical swipes.
*		fallbackToMouseEvents 	Boolean		Default true	if true mouse events are used when run on a non touch device, false will stop swipes being triggered by mouse events on non tocuh devices
*
*		excludedElements	String 	jquery selector that specifies child elements that do NOT trigger swipes. By default, this is one select that removes all input, select, textarea, button and anchor elements as well as any .noSwipe classes.
*
* Methods: To be executed as strings, $el.swipe('disable');
*		disable		Will disable all touch events until enabled again
*		enable		Will re-enable the touch events
*		destroy		Will kill the plugin, and it must be re-instantiated if it needs to be used again
*
* This jQuery plugin will only run on devices running Mobile Webkit based browsers (iOS 2.0+, android 2.2+)
*/
(function ($) {

	//Constants
	var LEFT = "left",
		RIGHT = "right",
		UP = "up",
		DOWN = "down",
		IN = "in",
		OUT = "out",

		NONE = "none",
		AUTO = "auto",

		HORIZONTAL = "horizontal",
		VERTICAL = "vertical",

		ALL_FINGERS = "all",

		PHASE_START = "start",
		PHASE_MOVE = "move",
		PHASE_END = "end",
		PHASE_CANCEL = "cancel",

		SUPPORTS_TOUCH = 'ontouchstart' in window,

		PLUGIN_NS = 'TouchSwipe';



	// Default thresholds & swipe functions
	var defaults = {

		fingers: 1, 		// int - The number of fingers to trigger the swipe, 1 or 2. Default is 1.
		threshold: 75, 		// int - The number of pixels that the user must move their finger by before it is considered a swipe. Default is 75.

		maxTimeThreshold: null, // int - Time, in milliseconds, between touchStart and touchEnd must NOT exceed in order to be considered a swipe.

		swipe: null, 		// Function - A catch all handler that is triggered for all swipe directions. Accepts 2 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down", and the finger count.
		swipeLeft: null, 	// Function - A handler that is triggered for "left" swipes. Accepts 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down", the distance of the swipe, and the finger count.
		swipeRight: null, 	// Function - A handler that is triggered for "right" swipes. Accepts 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down", the distance of the swipe, and the finger count.
		swipeUp: null, 		// Function - A handler that is triggered for "up" swipes. Accepts 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down", the distance of the swipe, and the finger count.
		swipeDown: null, 	// Function - A handler that is triggered for "down" swipes. Accepts 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down", the distance of the swipe, and the finger count.
		swipeStatus: null, 	// Function - A handler triggered for every phase of the swipe. Handler is passed 4 arguments: event : The original event object, phase:The current swipe phase, either "start, "move, "end or "cancel. direction : The swipe direction, either "up", "down", "left" or "right". distance : The distance of the swipe, fingerCount: The finger count.
		
		pinchIn:null,		// Function - A handler triggered for pinch in events. Handler is passed 4 arguments: event : The original event object, direction : The swipe direction, either "in" or "out". distance : The distance of the pinch, zoom: the pinch zoom level
		pinchOut:null,		// Function - A handler triggered for pinch in events. Handler is passed 4 arguments: event : The original event object, direction : The swipe direction, either "in" or "out". distance : The distance of the pinch, zoom: the pinch zoom level
		pinchStatus:null,	// Function - A handler triggered for every phase of a pinch. Handler is passed 4 arguments: event : The original event object, phase:The current swipe face, either "start", "move", "end" or "cancel". direction : The swipe direction, either "in" or "out". distance : The distance of the pinch, zoom: the pinch zoom level
		
		
		
		click: null, 		// Function	- A handler triggered when a user just clicks on the item, rather than swipes it. If they do not move, click is triggered, if they do move, it is not.
		
		
		triggerOnTouchEnd: true, // Boolean, if true, the swipe events are triggered when the touch end event is received (user releases finger).  If false, it will be triggered on reaching the threshold, and then cancel the touch event automatically.
		allowPageScroll: "auto", 	/* How the browser handles page scrolls when the user is swiping on a touchSwipe object. 
										"auto" : all undefined swipes will cause the page to scroll in that direction.
										"none" : the page will not scroll when user swipes.
										"horizontal" : will force page to scroll on horizontal swipes.
										"vertical" : will force page to scroll on vertical swipes.
									*/
		fallbackToMouseEvents: true,	//Boolean, if true mouse events are used when run on a non touch device, false will stop swipes being triggered by mouse events on non tocuh devices
		
		excludedElements:"button, input, select, textarea, a, .noSwipe" //a jquery selector that specifies child elements that do NOT trigger swipes. By default, this is one select that removes all form, input select, button and anchor elements.
	};



	/**
	* Main plugin entry point for jQuery
	* This allows us to pass options object for instantiation,
	* as well as execute methods by name as per jQuery plugin architecture
	*/
	$.fn.swipe = function (method) {
		var $this = $(this),
			plugin = $this.data(PLUGIN_NS);

		//Check if we are already instantiated and trying to execute a method	
		if (plugin && typeof method === 'string') {
			if (plugin[method]) {
				return plugin[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.swipe');
			}
		}
		//Else not instantiated and trying to pass init object (or nothing)
		else if (!plugin && (typeof method === 'object' || !method)) {
			return init.apply(this, arguments);
		}

		return $this;
	};

	//Expose our defaults so a user could override the plugin defaults
	$.fn.swipe.defaults = defaults;

	//Expose our phase constants - READ ONLY
	$.fn.swipe.phases = {
		PHASE_START: PHASE_START,
		PHASE_MOVE: PHASE_MOVE,
		PHASE_END: PHASE_END,
		PHASE_CANCEL: PHASE_CANCEL
	};

	//Expose our direction constants - READ ONLY
	$.fn.swipe.directions = {
		LEFT: LEFT,
		RIGHT: RIGHT,
		UP: UP,
		DOWN: DOWN,
		IN : IN,
		OUT: OUT
	};
	
	//Expose our page scroll directions - READ ONLY
	$.fn.swipe.pageScroll = {
		NONE: NONE,
		HORIZONTAL: HORIZONTAL,
		VERTICAL: VERTICAL,
		AUTO: AUTO
	};

	//EXPOSE our fingers values - READ ONLY
	$.fn.swipe.fingers = {
		ONE: 1,
		TWO: 2,
		THREE: 3,
		ALL: ALL_FINGERS
	};

	/**
	* Initialise the plugin for each DOM element matched
	* This creates a new instance of the main TouchSwipe class for each DOM element, and then 
	* saves a reference to that instance in the elements data property.
	*/
	function init(options) {
		//Prep and extend the options
		if (options && (options.allowPageScroll === undefined && (options.swipe !== undefined || options.swipeStatus !== undefined))) {
			options.allowPageScroll = NONE;
		}

		if (!options) {
			options = {};
		}

		//pass empty object so we dont modify the defaults
		options = $.extend({}, $.fn.swipe.defaults, options);

		//For each element instantiate the plugin
		return this.each(function () {
			var $this = $(this);

			//Check we havent already initialised the plugin
			var plugin = $this.data(PLUGIN_NS);

			if (!plugin) {
				plugin = new touchSwipe(this, options);
				$this.data(PLUGIN_NS, plugin);
			}
		});
	}

	/**
	* Main TouchSwipe Plugin Class
	*/
	function touchSwipe(element, options) {
		var useTouchEvents = (SUPPORTS_TOUCH || !options.fallbackToMouseEvents),
			START_EV = useTouchEvents ? 'touchstart' : 'mousedown',
			MOVE_EV = useTouchEvents ? 'touchmove' : 'mousemove',
			END_EV = useTouchEvents ? 'touchend' : 'mouseup',
			CANCEL_EV = 'touchcancel';

		var distance = 0;
		var direction = null;
		var duration = 0;
		var startTouchesDistance=0;
		var endTouchesDistance=0;
		var pinchZoom = 1;
		var pinchDirection=0;
		
		
		//jQuery wrapped element for this instance
		var $element = $(element);

		var phase = "start";

		var fingerCount = 0; 		// the current number of fingers being used.	

		//track mouse points / delta
		var fingerData=null;

		//track times
		var startTime = 0;
		var endTime = 0;

		// Add gestures to all swipable areas if supported
		try {
			$element.bind(START_EV, touchStart);
			$element.bind(CANCEL_EV, touchCancel);
		}
		catch (e) {
			$.error('events not supported ' + START_EV + ',' + CANCEL_EV + ' on jQuery.swipe');
		}

		//Public methods
		/**
		* re-enables the swipe plugin with the previous configuration
		*/
		this.enable = function () {
			$element.bind(START_EV, touchStart);
			$element.bind(CANCEL_EV, touchCancel);

			return $element;
		};

		/**
		* disables the swipe plugin
		*/
		this.disable = function () {
			removeListeners();
			return $element;
		};

		/**
		* Destroy the swipe plugin completely. To use any swipe methods, you must re initialise the plugin.
		*/
		this.destroy = function () {
			removeListeners();
			$element.data(PLUGIN_NS, null);
			return $element;
		};


		//Private methods
		/**
		* Event handler for a touch start event. 
		* Stops the default click event from triggering and stores where we touched
		*/
		function touchStart(event) {
			//If we already in a touch event (a finger already in use) then ignore subsequent ones..
			if( getTouchInProgress() )
				return;
			
			//Check if this element matches any in the excluded elements selectors,  or its parent is excluded, if so, DONT swipe
			if( $(event.target).closest( options.excludedElements, $element ).length>0 ) 
				return;
				
			//As we use Jquery bind for events, we need to target the original event object
			event = event.originalEvent;
			
			var ret,
				evt = SUPPORTS_TOUCH ? event.touches[0] : event;

			phase = PHASE_START;

			//If we support touches, get the finger count
			if (SUPPORTS_TOUCH) {
				// get the total number of fingers touching the screen
				fingerCount = event.touches.length;
			}
			//Else this is the desktop, so stop the browser from dragging the image
			else {
				event.preventDefault();
			}

			//clear vars..
			distance = 0;
			direction = null;
			pinchDirection=null;
			duration = 0;
			startTouchesDistance=0;
			endTouchesDistance=0;
			pinchZoom = 1;
			fingerData=createFingerData();

			
			// check the number of fingers is what we are looking for, or we are capturing pinches
			if (!SUPPORTS_TOUCH || (fingerCount === options.fingers || options.fingers === ALL_FINGERS) || hasPinches()) {
				// get the coordinates of the touch
				fingerData[0].start.x = fingerData[0].end.x = evt.pageX;
				fingerData[0].start.y = fingerData[0].end.y = evt.pageY;
				startTime = getTimeStamp();
				
				if(fingerCount==2) {
					//Keep track of the initial pinch distance, so we can calculate the diff later
					//Store second finger data as start
					fingerData[1].start.x = fingerData[1].end.x = event.touches[1].pageX;
					fingerData[1].start.y = fingerData[1].end.y = event.touches[1].pageY;
					
					startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
				}
				
				if (options.swipeStatus || options.pinchStatus) {
					ret = triggerHandler(event, phase);
				}
			}
			else {
				//A touch with more or less than the fingers we are looking for, so cancel
				touchCancel(event);
				ret = false; // actualy cancel so we dont register event...
			}

			//If we have a return value from the users handler, then return and cancel
			if (ret === false) {
				phase = PHASE_CANCEL;
				triggerHandler(event, phase);
				return ret;
			}
			else {
				setTouchInProgress(true);
				$element.bind(MOVE_EV, touchMove);
				$element.bind(END_EV, touchEnd);
				
			}
		};

		/**
		* Event handler for a touch move event. 
		* If we change fingers during move, then cancel the event
		*/
		function touchMove(event) {
			//As we use Jquery bind for events, we need to target the original event object
			event = event.originalEvent;

			if (phase === PHASE_END || phase === PHASE_CANCEL)
				return;

			var ret,
				evt = SUPPORTS_TOUCH ? event.touches[0] : event;

			//Save the first finger data
			fingerData[0].end.x = SUPPORTS_TOUCH ? event.touches[0].pageX : evt.pageX;
			fingerData[0].end.y = SUPPORTS_TOUCH ? event.touches[0].pageY : evt.pageY;
			
			endTime = getTimeStamp();

			direction = calculateDirection(fingerData[0].start, fingerData[0].end);
			if (SUPPORTS_TOUCH) {
				fingerCount = event.touches.length;
			}

			phase = PHASE_MOVE;

			//If we have 2 fingers get Touches distance as well
			if(fingerCount==2) {
				//Keep track of the initial pinch distance, so we can calculate the diff later
				//We do this here as well as the start event, incase they start with 1 finger, and the press 2 fingers
				if(startTouchesDistance==0) {
					//Store second finger data as start
					fingerData[1].start.x = event.touches[1].pageX;
					fingerData[1].start.y = event.touches[1].pageY;
					
					startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start);
				} else {
					//Store second finger data as end
					fingerData[1].end.x = event.touches[1].pageX;
					fingerData[1].end.y = event.touches[1].pageY;
					
					endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end);
					pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end);
				}
				
				
				pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance);
			}
			
			
			
			if ((fingerCount === options.fingers || options.fingers === ALL_FINGERS) || !SUPPORTS_TOUCH) {
				
				//Check if we need to prevent default evnet (page scroll / pinch zoom) or not
				validateDefaultEvent(event, direction);

				//Distance and duration are all off the main finger
				distance = calculateDistance(fingerData[0].start, fingerData[0].end);
				duration = calculateDuration(fingerData[0].start, fingerData[0].end);

				if (options.swipeStatus || options.pinchStatus) {
					ret = triggerHandler(event, phase);
				}

				//If we trigger whilst dragging, not on touch end, then calculate now...
				if (!options.triggerOnTouchEnd) {
					var cancel = !validateSwipeTime();

					// if the user swiped more than the minimum length, perform the appropriate action
					if (validateSwipeDistance() === true) {
						phase = PHASE_END;
						ret = triggerHandler(event, phase);
					} else if (cancel) {
						phase = PHASE_CANCEL;
						triggerHandler(event, phase);
					}
				}
			}
			else {
				phase = PHASE_CANCEL;
				triggerHandler(event, phase);
			}

			if (ret === false) {
				phase = PHASE_CANCEL;
				triggerHandler(event, phase);
			}
		}

		/**
		* Event handler for a touch end event. 
		* Calculate the direction and trigger events
		*/
		function touchEnd(event) {
			//As we use Jquery bind for events, we need to target the original event object
			event = event.originalEvent;

			//If we are still in a touch another finger is down, then dont cancel
			if(event.touches && event.touches.length>0)
				return true;
				 
			event.preventDefault();

			endTime = getTimeStamp();
			
			//If we have any touches distance data (they pinched at some point) get Touches distance as well
			if(startTouchesDistance!=0) {
				endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end);
				pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance);
				pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end);	
			}
			
			distance = calculateDistance(fingerData[0].start, fingerData[0].end);
			direction = calculateDirection(fingerData[0].start, fingerData[0].end);
			duration = calculateDuration();

			//If we trigger handlers at end of swipe OR, we trigger during, but they didnt trigger and we are still in the move phase
			if (options.triggerOnTouchEnd || (options.triggerOnTouchEnd === false && phase === PHASE_MOVE)) {
				phase = PHASE_END;

				// Validate the types of swipe we are looking for
				//Either we are listening for a pinch, and got one, or we are NOT listening so dont care.
				var hasValidPinchResult = didPinch() || !hasPinches();
				
				//The number of fingers we want were matched, or on desktop we ignore
				var hasCorrectFingerCount = ((fingerCount === options.fingers || options.fingers === ALL_FINGERS) || !SUPPORTS_TOUCH);

				//We have an end value for the finger
				var hasEndPoint = fingerData[0].end.x !== 0;
				
				//Check if the above conditions are met to make this swipe count...
				var isSwipe = (hasCorrectFingerCount && hasEndPoint && hasValidPinchResult);
				
				//If we are in a swipe, validate the time and distance...
				if (isSwipe) {
					var hasValidTime = validateSwipeTime();
					
					//Check the distance meets threshold settings
					var hasValidDistance = validateSwipeDistance();
					
					// if the user swiped more than the minimum length, perform the appropriate action
					// hasValidDistance is null when no distance is set 
					if ((hasValidDistance === true || hasValidDistance === null) && hasValidTime) {
						triggerHandler(event, phase);
					}
					else if (!hasValidTime || hasValidDistance === false) {
						phase = PHASE_CANCEL;
						triggerHandler(event, phase);
					}
				}
				else {
					phase = PHASE_CANCEL;
					triggerHandler(event, phase);
				}
			}
			else if (phase === PHASE_MOVE) {
				phase = PHASE_CANCEL;
				triggerHandler(event, phase);
			}

			$element.unbind(MOVE_EV, touchMove, false);
			$element.unbind(END_EV, touchEnd, false);
			
			setTouchInProgress(false);
		}

		/**
		* Event handler for a touch cancel event. 
		* Clears current vars
		*/
		function touchCancel() {
			// reset the variables back to default values
			fingerCount = 0;
			endTime = 0;
			startTime = 0;
			startTouchesDistance=0;
			endTouchesDistance=0;
			pinchZoom=1;
			setTouchInProgress(false);
		}


		/**
		* Trigger the relevant event handler
		* The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
		*/
		function triggerHandler(event, phase) {
			var ret = undefined;

			//update status
			if (options.swipeStatus) {
				ret = options.swipeStatus.call($element, event, phase, direction || null, distance || 0, duration || 0, fingerCount);
			}
			
			if (options.pinchStatus && didPinch()) {
				ret = options.pinchStatus.call($element, event, phase, pinchDirection || null, endTouchesDistance || 0, duration || 0, fingerCount, pinchZoom);
			}

			if (phase === PHASE_CANCEL) {
				if (options.click && (fingerCount === 1 || !SUPPORTS_TOUCH) && (isNaN(distance) || distance === 0)) {
					ret = options.click.call($element, event, event.target);
				}
			}
			
			if (phase == PHASE_END) {
				//trigger catch all event handler
				if (options.swipe) {
					ret = options.swipe.call($element, event, direction, distance, duration, fingerCount);
				}
				//trigger direction specific event handlers	
				switch (direction) {
					case LEFT:
						if (options.swipeLeft) {
							ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount);
						}
						break;

					case RIGHT:
						if (options.swipeRight) {
							ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount);
						}
						break;

					case UP:
						if (options.swipeUp) {
							ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount);
						}
						break;

					case DOWN:
						if (options.swipeDown) {
							ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount);
						}
						break;
				}
				
				
				switch (pinchDirection) {
					case IN:
						if (options.pinchIn) {
							ret = options.pinchIn.call($element, event, pinchDirection || null, endTouchesDistance || 0, duration || 0, fingerCount, pinchZoom);
						}
						break;
					
					case OUT:
						if (options.pinchOut) {
							ret = options.pinchOut.call($element, event, pinchDirection || null, endTouchesDistance || 0, duration || 0, fingerCount, pinchZoom);
						}
						break;	
				}
			}


			if (phase === PHASE_CANCEL || phase === PHASE_END) {
				//Manually trigger the cancel handler to clean up data
				touchCancel(event);
			}

			return ret;
		}


		/**
		* Checks the user has swipe far enough
		*/
		function validateSwipeDistance() {
			if (options.threshold !== null) {
				return distance >= options.threshold;
			}
			return null;
		}



		/**
		* Checks that the time taken to swipe meets the minimum / maximum requirements
		*/
		function validateSwipeTime() {
			var result;
			//If no time set, then return true

			if (options.maxTimeThreshold) {
				if (duration >= options.maxTimeThreshold) {
					result = false;
				} else {
					result = true;
				}
			}
			else {
				result = true;
			}

			return result;
		}


		/**
		* Checks direction of the swipe and the value allowPageScroll to see if we should allow or prevent the default behaviour from occurring.
		* This will essentially allow page scrolling or not when the user is swiping on a touchSwipe object.
		*/
		function validateDefaultEvent(event, direction) {
			if (options.allowPageScroll === NONE || hasPinches()) {
				event.preventDefault();
			} else {
				var auto = options.allowPageScroll === AUTO;

				switch (direction) {
					case LEFT:
						if ((options.swipeLeft && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
							event.preventDefault();
						}
						break;

					case RIGHT:
						if ((options.swipeRight && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) {
							event.preventDefault();
						}
						break;

					case UP:
						if ((options.swipeUp && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
							event.preventDefault();
						}
						break;

					case DOWN:
						if ((options.swipeDown && auto) || (!auto && options.allowPageScroll != VERTICAL)) {
							event.preventDefault();
						}
						break;
				}
			}

		}


		/**
		* Calcualte the duration of the swipe
		*/
		function calculateDuration() {
			return endTime - startTime;
		}
		
		/**
		* Calculate the distance between 2 touches (pinch)
		*/
		function calculateTouchesDistance(startPoint, endPoint) {
			var diffX = Math.abs(startPoint.x - endPoint.x);
			var diffY = Math.abs(startPoint.y - endPoint.y);
				
			return Math.round(Math.sqrt(diffX*diffX+diffY*diffY));
		}
		
		/**
		* Calculate the zoom factor between the start and end distances
		*/
		function calculatePinchZoom(startDistance, endDistance) {
			var percent = (endDistance/startDistance) * 1;
			return percent.toFixed(2);
		}
		
		
		/**
		* Returns the pinch direction, either IN or OUT for the given points
		*/
		function calculatePinchDirection() {
			if(pinchZoom<1) {
				return OUT;
			}
			else {
				return IN;
			}
		}
		
		
		/**
		* Calculate the length / distance of the swipe
		* @param finger A finger object containing start and end points
		*/
		function calculateDistance(startPoint, endPoint) {
			return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
		}

		/**
		* Calcualte the angle of the swipe
		* @param finger A finger object containing start and end points
		*/
		function caluculateAngle(startPoint, endPoint) {
			var x = startPoint.x - endPoint.x;
			var y = endPoint.y - startPoint.y;
			var r = Math.atan2(y, x); //radians
			var angle = Math.round(r * 180 / Math.PI); //degrees

			//ensure value is positive
			if (angle < 0) {
				angle = 360 - Math.abs(angle);
			}

			return angle;
		}

		/**
		* Calcualte the direction of the swipe
		* This will also call caluculateAngle to get the latest angle of swipe
		* @param finger A finger object containing start and end points
		*/
		function calculateDirection(startPoint, endPoint ) {
			var angle = caluculateAngle(startPoint, endPoint);

			if ((angle <= 45) && (angle >= 0)) {
				return LEFT;
			} else if ((angle <= 360) && (angle >= 315)) {
				return LEFT;
			} else if ((angle >= 135) && (angle <= 225)) {
				return RIGHT;
			} else if ((angle > 45) && (angle < 135)) {
				return DOWN;
			} else {
				return UP;
			}
		}
		

		/**
		* Returns a MS time stamp of the current time
		*/
		function getTimeStamp() {
			var now = new Date();
			return now.getTime();
		}

		/**
		* Removes all listeners that were associated with the plugin
		*/
		function removeListeners() {
			$element.unbind(START_EV, touchStart);
			$element.unbind(CANCEL_EV, touchCancel);
			$element.unbind(MOVE_EV, touchMove);
			$element.unbind(END_EV, touchEnd);
			setTouchInProgress(false);
		}
		
		/**
		 * Returns true if any Pinch events have been registered
		 */
		function hasPinches() {
			return options.pinchStatus || options.pinchIn || options.pinchOut;
		}
		
		/**
		 * Returns true if we are detecting pinches, and have one
		 */
		function didPinch() {
			return pinchDirection && hasPinches();
		}
		

		
		/**
		* gets a data flag to indicate that a touch is in progress
		*/
		function getTouchInProgress() {
			return $element.data(PLUGIN_NS+'_intouch') === true ? true : false;
		}
		
		/**
		* Sets a data flag to indicate that a touch is in progress
		*/
		function setTouchInProgress(val) {
			val = val===true?true:false;
			$element.data(PLUGIN_NS+'_intouch', val);
		}
		
		function createFingerData() {
			var fingerData=[];
			for (var i=0; i<=5; i++) {
				fingerData.push({
					start:{ x: 0, y: 0 },
					end:{ x: 0, y: 0 },
					delta:{ x: 0, y: 0 }
				});
			}
			
			return fingerData;
		}

	}

})(jQuery);