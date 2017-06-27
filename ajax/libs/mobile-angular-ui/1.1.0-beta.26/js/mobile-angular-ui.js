/*! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function( w, undefined ){
	
	var doc = w.document,
		docElem = doc.documentElement,
		enabledClassName = "overthrow-enabled",

		// Touch events are used in the polyfill, and thus are a prerequisite
		canBeFilledWithPoly = "ontouchmove" in doc,
		
		// The following attempts to determine whether the browser has native overflow support
		// so we can enable it but not polyfill
		nativeOverflow = 
			// Features-first. iOS5 overflow scrolling property check - no UA needed here. thanks Apple :)
			"WebkitOverflowScrolling" in docElem.style ||
			// Test the windows scrolling property as well
			"msOverflowStyle" in docElem.style ||
			// Touch events aren't supported and screen width is greater than X
			// ...basically, this is a loose "desktop browser" check. 
			// It may wrongly opt-in very large tablets with no touch support.
			( !canBeFilledWithPoly && w.screen.width > 800 ) ||
			// Hang on to your hats.
			// Whitelist some popular, overflow-supporting mobile browsers for now and the future
			// These browsers are known to get overlow support right, but give us no way of detecting it.
			(function(){
				var ua = w.navigator.userAgent,
					// Webkit crosses platforms, and the browsers on our list run at least version 534
					webkit = ua.match( /AppleWebKit\/([0-9]+)/ ),
					wkversion = webkit && webkit[1],
					wkLte534 = webkit && wkversion >= 534;
					
				return (
					/* Android 3+ with webkit gte 534
					~: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13 */
					ua.match( /Android ([0-9]+)/ ) && RegExp.$1 >= 3 && wkLte534 ||
					/* Blackberry 7+ with webkit gte 534
					~: Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0 Mobile Safari/534.11+ */
					ua.match( / Version\/([0-9]+)/ ) && RegExp.$1 >= 0 && w.blackberry && wkLte534 ||
					/* Blackberry Playbook with webkit gte 534
					~: Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+ */   
					ua.indexOf( "PlayBook" ) > -1 && wkLte534 && !ua.indexOf( "Android 2" ) === -1 ||
					/* Firefox Mobile (Fennec) 4 and up
					~: Mozilla/5.0 (Mobile; rv:15.0) Gecko/15.0 Firefox/15.0 */
					ua.match(/Firefox\/([0-9]+)/) && RegExp.$1 >= 4 ||
					/* WebOS 3 and up (TouchPad too)
					~: Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.48 Safari/534.6 TouchPad/1.0 */
					ua.match( /wOSBrowser\/([0-9]+)/ ) && RegExp.$1 >= 233 && wkLte534 ||
					/* Nokia Browser N8
					~: Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba 
					~: Note: the N9 doesn't have native overflow with one-finger touch. wtf */
					ua.match( /NokiaBrowser\/([0-9\.]+)/ ) && parseFloat(RegExp.$1) === 7.3 && webkit && wkversion >= 533
				);
			})();

	// Expose overthrow API
	w.overthrow = {};

	w.overthrow.enabledClassName = enabledClassName;

	w.overthrow.addClass = function(){
		if( docElem.className.indexOf( w.overthrow.enabledClassName ) === -1 ){
			docElem.className += " " + w.overthrow.enabledClassName;
		}
	};

	w.overthrow.removeClass = function(){
		docElem.className = docElem.className.replace( w.overthrow.enabledClassName, "" );
	};

	// Enable and potentially polyfill overflow
	w.overthrow.set = function(){
			
		// If nativeOverflow or at least the element canBeFilledWithPoly, add a class to cue CSS that assumes overflow scrolling will work (setting height on elements and such)
		if( nativeOverflow ){
			w.overthrow.addClass();
		}

	};

	// expose polyfillable 
	w.overthrow.canBeFilledWithPoly = canBeFilledWithPoly;

	// Destroy everything later. If you want to.
	w.overthrow.forget = function(){

		w.overthrow.removeClass();
		
	};
		
	// Expose overthrow API
	w.overthrow.support = nativeOverflow ? "native" : "none";
		
})( this );

/*! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function( w, undefined ){
	
	// Auto-init
	w.overthrow.set();

}( this ));
/*! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function( w, o, undefined ){

	// o is overthrow reference from overthrow-polyfill.js
	if( o === undefined ){
		return;
	}

	o.scrollIndicatorClassName = "overthrow";
	
	var doc = w.document,
		docElem = doc.documentElement,
		// o api
		nativeOverflow = o.support === "native",
		canBeFilledWithPoly = o.canBeFilledWithPoly,
		configure = o.configure,
		set = o.set,
		forget = o.forget,
		scrollIndicatorClassName = o.scrollIndicatorClassName;

	// find closest overthrow (elem or a parent)
	o.closest = function( target, ascend ){
		return !ascend && target.className && target.className.indexOf( scrollIndicatorClassName ) > -1 && target || o.closest( target.parentNode );
	};
		
	// polyfill overflow
	var enabled = false;
	o.set = function(){
			
		set();

		// If nativeOverflow or it doesn't look like the browser canBeFilledWithPoly, our job is done here. Exit viewport left.
		if( enabled || nativeOverflow || !canBeFilledWithPoly ){
			return;
		}

		w.overthrow.addClass();

		enabled = true;

		o.support = "polyfilled";

		o.forget = function(){
			forget();
			enabled = false;
			// Remove touch binding (check for method support since this part isn't qualified by touch support like the rest)
			if( doc.removeEventListener ){
				doc.removeEventListener( "touchstart", start, false );
			}
		};

		// Fill 'er up!
		// From here down, all logic is associated with touch scroll handling
			// elem references the overthrow element in use
		var elem,
			
			// The last several Y values are kept here
			lastTops = [],
	
			// The last several X values are kept here
			lastLefts = [],
			
			// lastDown will be true if the last scroll direction was down, false if it was up
			lastDown,
			
			// lastRight will be true if the last scroll direction was right, false if it was left
			lastRight,
			
			// For a new gesture, or change in direction, reset the values from last scroll
			resetVertTracking = function(){
				lastTops = [];
				lastDown = null;
			},
			
			resetHorTracking = function(){
				lastLefts = [];
				lastRight = null;
			},
		
			// On webkit, touch events hardly trickle through textareas and inputs
			// Disabling CSS pointer events makes sure they do, but it also makes the controls innaccessible
			// Toggling pointer events at the right moments seems to do the trick
			// Thanks Thomas Bachem http://stackoverflow.com/a/5798681 for the following
			inputs,
			setPointers = function( val ){
				inputs = elem.querySelectorAll( "textarea, input" );
				for( var i = 0, il = inputs.length; i < il; i++ ) {
					inputs[ i ].style.pointerEvents = val;
				}
			},
			
			// For nested overthrows, changeScrollTarget restarts a touch event cycle on a parent or child overthrow
			changeScrollTarget = function( startEvent, ascend ){
				if( doc.createEvent ){
					var newTarget = ( !ascend || ascend === undefined ) && elem.parentNode || elem.touchchild || elem,
						tEnd;
							
					if( newTarget !== elem ){
						tEnd = doc.createEvent( "HTMLEvents" );
						tEnd.initEvent( "touchend", true, true );
						elem.dispatchEvent( tEnd );
						newTarget.touchchild = elem;
						elem = newTarget;
						newTarget.dispatchEvent( startEvent );
					}
				}
			},
			
			// Touchstart handler
			// On touchstart, touchmove and touchend are freshly bound, and all three share a bunch of vars set by touchstart
			// Touchend unbinds them again, until next time
			start = function( e ){

				// Stop any throw in progress
				if( o.intercept ){
					o.intercept();
				}
				
				// Reset the distance and direction tracking
				resetVertTracking();
				resetHorTracking();
				
				elem = o.closest( e.target );
					
				if( !elem || elem === docElem || e.touches.length > 1 ){
					return;
				}			

				setPointers( "none" );
				var touchStartE = e,
					scrollT = elem.scrollTop,
					scrollL = elem.scrollLeft,
					height = elem.offsetHeight,
					width = elem.offsetWidth,
					startY = e.touches[ 0 ].pageY,
					startX = e.touches[ 0 ].pageX,
					scrollHeight = elem.scrollHeight,
					scrollWidth = elem.scrollWidth,
				
					// Touchmove handler
					move = function( e ){
					
						var ty = scrollT + startY - e.touches[ 0 ].pageY,
							tx = scrollL + startX - e.touches[ 0 ].pageX,
							down = ty >= ( lastTops.length ? lastTops[ 0 ] : 0 ),
							right = tx >= ( lastLefts.length ? lastLefts[ 0 ] : 0 );
							
						// If there's room to scroll the current container, prevent the default window scroll
						if( ( ty > 0 && ty < scrollHeight - height ) || ( tx > 0 && tx < scrollWidth - width ) ){
							e.preventDefault();
						}
						// This bubbling is dumb. Needs a rethink.
						else {
							changeScrollTarget( touchStartE );
						}
						
						// If down and lastDown are inequal, the y scroll has changed direction. Reset tracking.
						if( lastDown && down !== lastDown ){
							resetVertTracking();
						}
						
						// If right and lastRight are inequal, the x scroll has changed direction. Reset tracking.
						if( lastRight && right !== lastRight ){
							resetHorTracking();
						}
						
						// remember the last direction in which we were headed
						lastDown = down;
						lastRight = right;							
						
						// set the container's scroll
						elem.scrollTop = ty;
						elem.scrollLeft = tx;
					
						lastTops.unshift( ty );
						lastLefts.unshift( tx );
					
						if( lastTops.length > 3 ){
							lastTops.pop();
						}
						if( lastLefts.length > 3 ){
							lastLefts.pop();
						}
					},
				
					// Touchend handler
					end = function( e ){

						// Bring the pointers back
						setPointers( "auto" );
						setTimeout( function(){
							setPointers( "none" );
						}, 450 );
						elem.removeEventListener( "touchmove", move, false );
						elem.removeEventListener( "touchend", end, false );
					};
				
				elem.addEventListener( "touchmove", move, false );
				elem.addEventListener( "touchend", end, false );
			};
			
		// Bind to touch, handle move and end within
		doc.addEventListener( "touchstart", start, false );
	};
		
})( this, this.overthrow );

/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 1.0.2
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specified layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 * @param {Object} options The options to override the defaults
 */
function FastClick(layer, options) {
	'use strict';
	var oldOnClick;

	options = options || {};

	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = options.touchBoundary || 10;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	/**
	 * The minimum time between tap(touchstart and touchend) events
	 *
	 * @type number
	 */
	this.tapDelay = options.tapDelay || 200;

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Some old versions of Android don't have Function.prototype.bind
	function bind(method, context) {
		return function() { return method.apply(context, arguments); };
	}


	var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
	var context = this;
	for (var i = 0, l = methods.length; i < l; i++) {
		context[methods[i]] = bind(context[methods[i]], context);
	}

	// Set up event handlers as required
	if (deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchmove', this.onTouchMove, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
		return true;
	case 'select':
		return !deviceIsAndroid;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled && !target.readOnly;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
	'use strict';

	//Issue #159: Android Chrome Select Box does not open with a synthetic click event
	if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
		return 'mousedown';
	}

	return 'click';
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	// Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
};


/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function(event) {
	'use strict';
	if (!this.trackingClick) {
		return true;
	}

	// If the touch has moved, cancel the click tracking
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	return true;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
		this.cancelNextClick = true;
		return true;
	}

	// Reset to prevent wrong click cancel on input (issue #156).
	this.cancelNextClick = false;

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);
		this.sendClick(targetElement, event);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
		if (!deviceIsIOS || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (deviceIsIOS && !deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchmove', this.onTouchMove, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	'use strict';
	var metaViewport;
	var chromeVersion;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	// Chrome version - zero for other browsers
	chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

	if (chromeVersion) {

		if (deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');

			if (metaViewport) {
				// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				// Chrome 32 and above with width=device-width or less don't need FastClick
				if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
					return true;
				}
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 * @param {Object} options The options to override the defaults
 */
FastClick.attach = function(layer, options) {
	'use strict';
	return new FastClick(layer, options);
};


if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
}

angular.module("mobile-angular-ui.active-links", []).run([
  "$rootScope", function($rootScope) {
    return angular.forEach(["$locationChangeSuccess", "$includeContentLoaded"], function(evtName) {
      return $rootScope.$on(evtName, function() {
        var newPath;
        newPath = window.location.href;
        angular.forEach(document.links, function(domLink) {
          var link;
          link = angular.element(domLink);
          if (domLink.href === newPath) {
            link.addClass("active");
          } else {
            link.removeClass("active");
          }
          return link = null;
        });
        return newPath = null;
      });
    });
  }
]);

angular.module("mobile-angular-ui.directives.capture", [])

.run([
  "CaptureService", "$rootScope", function(CaptureService, $rootScope) {
    $rootScope.$on('$routeChangeStart', function() {
      CaptureService.resetAll();
    });
  }
])

.factory("CaptureService", [
  "$compile", function($compile) {
    var yielders = {};

    return {
      resetAll: function() {
        for (name in yielders) {
          this.resetYielder(name);
        }
      },
      
      resetYielder: function(name) {
        var b = yielders[name];
        this.setContentFor(name, b.defaultContent, b.defaultScope);
      },

      putYielder: function(name, element, defaultScope, defaultContent) {
        var yielder = {};
        yielder.name = name;
        yielder.element = element;
        yielder.defaultContent = defaultContent || "";
        yielder.defaultScope = defaultScope;
        yielders[name] = yielder;
      },

      getYielder: function(name) {
        return yielders[name];
      },

      removeYielder: function(name) {
        delete yielders[name];
      },
      
      setContentFor: function(name, content, scope) {
        var b = yielders[name];
        if (!b) {
          return;
        }
        b.element.html(content);
        $compile(b.element.contents())(scope);
      }

    };
  }
])

.directive("contentFor", [
  "CaptureService", function(CaptureService) {
    return {
      compile: function(tElem, tAttrs) {
        var rawContent = tElem.html();
        if(tAttrs.duplicate == null) {
          // no need to compile anything!
          tElem.html("");
        }
        return function postLink(scope, elem, attrs) {
          CaptureService.setContentFor(attrs.contentFor, rawContent, scope);
          if (attrs.duplicate == null) {
            elem.remove();
          }
        }
      }
    };
  }
])

.directive("yieldTo", [
  "$compile", "CaptureService", function($compile, CaptureService) {
    return {
      link: function(scope, element, attr) {
        CaptureService.putYielder(attr.yieldTo, element, scope, element.html());
        element.contents().remove();

        scope.$on('$destroy', function(){
          CaptureService.removeYielder(attr.yieldTo);
        });
      }
    };
  }
]);

angular.module('mobile-angular-ui.directives.carousel', [])

.run(["$rootScope", function($rootScope) {
    
    $rootScope.carouselPrev = function(id) {
      $rootScope.$emit("mobile-angular-ui.carousel.prev", id);
    };
    
    $rootScope.carouselNext = function(id) {
      $rootScope.$emit("mobile-angular-ui.carousel.next", id);
    };
    
    var carouselItems = function(id) {
      var elem = angular.element(document.getElementById(id));
      var res = angular.element(elem.children()[0]).children();
      elem = null;
      return res;
    };

    var findActiveItemIndex = function(items) {
      var idx = -1;
      var found = false;

      for (var _i = 0; _i < items.length; _i++) {
        item = items[_i];
        idx += 1;
        if (angular.element(item).hasClass('active')) {
          found = true;
          break;
        }
      }

      if (found) {
        return idx;
      } else {
        return -1;
      }

    };

    $rootScope.$on("mobile-angular-ui.carousel.prev", function(e, id) {
      var items = carouselItems(id);
      var idx = findActiveItemIndex(items);
      var lastIdx = items.length - 1;

      if (idx !== -1) {
        angular.element(items[idx]).removeClass("active");
      }

      if (idx <= 0) {
        angular.element(items[lastIdx]).addClass("active");
      } else {
        angular.element(items[idx - 1]).addClass("active");
      }

      items = null;
      idx = null;
      lastIdx = null;
    });

    $rootScope.$on("mobile-angular-ui.carousel.next", function(e, id) {
      var items = carouselItems(id);
      var idx = findActiveItemIndex(items);
      var lastIdx = items.length - 1;
      
      if (idx !== -1) {
        angular.element(items[idx]).removeClass("active");
      }
      
      if (idx === lastIdx) {
        angular.element(items[0]).addClass("active");
      } else {
        angular.element(items[idx + 1]).addClass("active");
      }
      
      items = null;
      idx = null;
      lastIdx = null;
    });
  }
]);

// Provides touch events via fastclick.js
angular.module('mobile-angular-ui.fastclick', [])

.run([
  '$window', '$document', function($window, $document) {
    $window.addEventListener("load", (function() {
       FastClick.attach($document[0].body);
    }), false);
  }
])

.directive("select", function() {
  return {
    replace: false,
    restrict: "E",
    link: function(scope, element, attr) {
      element.addClass("needsclick");
    }
  };
})

.directive("input", function() {
  return {
    replace: false,
    restrict: "E",
    link: function(scope, element, attr) {
      element.addClass("needsclick");
    }
  };
})

.directive("textarea", function() {
  return {
    replace: false,
    restrict: "E",
    link: function(scope, element, attr) {
      element.addClass("needsclick");
    }
  };
})

angular.module('mobile-angular-ui.directives.forms', [])

.directive("bsFormControl", function() {
  var bs_col_classes = {};
  var bs_col_sizes = ['xs', 'sm', 'md', 'lg'];
  
  for (var i = 0; i < bs_col_sizes.length; i++) {
    for (var j = 1; j <= 12; j++) {
      bs_col_classes['col-' + bs_col_sizes[i] + "-" + j] = true;
    }
  };
  
  function separeBsColClasses(clss) {
    var intersection = "";
    var difference = "";

    for (var i = 0; i < clss.length; i++) {
        var v = clss[i];
        if (v in bs_col_classes) { 
          intersection += (v + " "); 
        } else {
          difference += (v + " ");
        }
    }

    return {i: intersection.trim(), d: difference.trim()};
  }

  return {
    replace: true,
    require: "ngModel",
    link: function(scope, elem, attrs) {

      if (attrs.labelClass == null) {
        attrs.labelClass = "";
      }

      if (attrs.id == null) {
        attrs.id = attrs.ngModel.replace(".", "_") + "_input";
      }
      
      if ((elem[0].tagName == "SELECT") || ((elem[0].tagName == "INPUT" || elem[0].tagName == "TEXTAREA") && (attrs.type != "checkbox" && attrs.type != "radio"))) {
        elem.addClass("form-control");
      }
      
      var label = angular.element("<label for=\"" + attrs.id + "\" class=\"control-label\">" + attrs.label + "</label>");
      var w1 = angular.element("<div class=\"form-group row\"></div>"); 
      var w2 = angular.element("<div class=\"form-control-wrapper\"></div>");
      
      var labelColClasses = separeBsColClasses(attrs.labelClass.split(/\s+/));
      if (labelColClasses.i == "") {
        label.addClass("col-xs-12");
      }
      label.addClass(attrs.labelClass);

      var elemColClasses = separeBsColClasses(elem[0].className.split(/\s+/));
      elem.removeClass(elemColClasses.i);
      w2.addClass(elemColClasses.i);
      if (elemColClasses.i == "") {
        w2.addClass("col-xs-12");
      }
      elem.wrap(w1).wrap(w2);
      elem.parent().parent().prepend(label);
      elem.attr('id', attrs.id);

      label = w1 = w2 = labelColClasses = elemColClasses = null;
    }
  };
})

.directive("switch", function() {
  return {
    restrict: "EA",
    replace: true,
    scope: {
      model: "=ngModel",
      changeExpr: "@ngChange",
      disabled: "@"
    },
    template: "<div class='switch' ng-class='{active: model}'><div class='switch-handle'></div></div>",
    link: function(scope, elem, attrs) {

      elem.on('click tap', function(){
        if (attrs.disabled == null) {
          scope.model = !scope.model;
          scope.$apply();

          if (scope.changeExpr != null) {
            scope.$parent.$eval(scope.changeExpr);
          };
        }
      });

      elem.addClass('switch-transition-enabled');
    }
  };
});
angular.module('mobile-angular-ui.directives.navbars', [])

.directive('navbarAbsoluteTop', function() {
  return {
    replace: false,
    restrict: "C",
    link: function(scope, elem, attrs) {
      elem.parent().addClass('has-navbar-top');
    }
  };
})

.directive('navbarAbsoluteBottom', function() {
  return {
    replace: false,
    restrict: "C",
    link: function(scope, elem, attrs) {
      elem.parent().addClass('has-navbar-bottom');
    }
  };
});
angular.module('mobile-angular-ui.directives.overlay', []).directive('overlay', [
  "$compile", function($compile) {
    return {
        compile: function(tElem, tAttrs) {
            var rawContent = tElem.html();
            return function postLink(scope, elem, attrs) {
                var active = "";
                var body = rawContent;
                var id = attrs.overlay;

                if (attrs["default"] != null) {
                  var active = "default='" + attrs["default"] + "'";
                }

                var html = "<div class=\"overlay\" id=\"" + id + "\" toggleable " + active + " parent-active-class=\"overlay-in\" active-class=\"overlay-show\">\n  <div class=\"overlay-inner\">\n    <div class=\"overlay-background\"></div>\n    <a href=\"#" + id + "\" toggle=\"off\" class=\"overlay-dismiss\">\n      <i class=\"fa fa-times-circle-o\"></i>\n    </a>\n    <div class=\"overlay-content\">\n      <div class=\"overlay-body\">\n        " + body + "\n      </div>\n    </div>\n  </div>\n</div>";
                elem.remove();

                var sameId = angular.element(document.getElementById(id));

                if (sameId.length > 0 && sameId.hasClass('overlay')) {
                  sameId.remove();
                }

                body = angular.element(document.body);
                body.prepend($compile(html)(scope));

                if (attrs["default"] === "active") {
                   body.addClass('overlay-in');
                }
            }
        }
    };
  }
]);

angular.module("mobile-angular-ui.directives.panels", [])

.directive("bsPanel", function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: false,
    transclude: true,
    link: function(scope, elem, attrs) {
      elem.removeAttr('title');
    },
    template: function(elems, attrs) {
      var heading = "";
      if (attrs.title) {
        heading = "<div class=\"panel-heading\">\n  <h2 class=\"panel-title\">\n    " + attrs.title + "\n  </h2>\n</div>";
      }
      return "<div class=\"panel\">\n  " + heading + "\n  <div class=\"panel-body\">\n     <div ng-transclude></div>\n  </div>\n</div>";
    }
  };
});
angular.module('mobile-angular-ui.pointer-events', []).run([
  '$document', function($document) {
    return angular.element($document).on("click tap", function(e) {
      var target;
      target = angular.element(e.target);
      if (target.hasClass("disabled")) {
        e.preventDefault();
        e.stopPropagation();
        target = null;
        return false;
      } else {
        target = null;
        return true;
      }
    });
  }
]);

 // Provides a scrollable implementation based on Overthrow
 // Many thanks to pavei (https://github.com/pavei) to submit
 // basic implementation

angular.module("mobile-angular-ui.scrollable", [])

.directive("scrollableContent", [
  function() {
    return {
      replace: false,
      restrict: "C",
      link: function(scope, element, attr) {
        if (overthrow.support !== "native") {
          element.addClass("overthrow");
          overthrow.forget();
          return overthrow.set();
        }
      }
    };
  }
]);
angular.module('mobile-angular-ui.directives.sidebars', [])

.directive('sidebar', ['$document', '$rootScope', function($document, $rootScope) {
  return {
    replace: false,
    restrict: "C",
    link: function(scope, elem, attrs) {
      var shouldCloseOnOuterClicks = true;
      
      if( attrs.closeOnOuterClicks == 'false' || attrs.closeOnOuterClicks == '0') {
        shouldCloseOnOuterClicks = false;
      }

      if (elem.hasClass('sidebar-left')) {
        elem.parent().addClass('has-sidebar-left');
      }

      if (elem.hasClass('sidebar-right')) {
        elem.parent().addClass('has-sidebar-right');
      }

      var isAncestorOrSelf = function(element, target) {
        var parent = element;

        while (parent.length > 0) {
            if (parent[0] === target[0]) {
                parent = null;     
                return true;
            }
            parent = parent.parent();
        }

        parent = null;
        return false;
      };

      var closeOnOuterClicks = function(e) {
        if(! isAncestorOrSelf(angular.element(e.target), elem)) {
            $rootScope.toggle(attrs.id, 'off');
            e.preventDefault()
            return false;
        }
      }
      
      var clearCb1 = angular.noop();
      
      if (shouldCloseOnOuterClicks) {
        clearCb1 = $rootScope.$on('mobile-angular-ui.toggle.toggled', function(e, id, active){
          if(id == attrs.id) {
            if(active) {
              setTimeout(function(){
                $document.on('click tap', closeOnOuterClicks);
              }, 300);
            } else {
              $document.unbind('click tap', closeOnOuterClicks);
            }
          }
        });
      }

      scope.$on('$destroy', function(){
        clearCb1();
        $document.unbind('click tap', closeOnOuterClicks);
      });

    }
  };
}]);

angular.module('mobile-angular-ui.directives.toggle', [])

.factory('ToggleHelper', [
  '$rootScope', function($rootScope) {
    return {
      
      events: {
        toggle: "mobile-angular-ui.toggle.toggle",
        toggleByClass: "mobile-angular-ui.toggle.toggleByClass",
        togglerLinked: "mobile-angular-ui.toggle.linked",
        toggleableToggled: "mobile-angular-ui.toggle.toggled"
      },

      commands: {
        alternate: "toggle",
        activate: "on",
        deactivate: "off"
      },

      toggle: function(target, command) {
        if (command == null) {
          command = "toggle";
        }
        $rootScope.$emit(this.events.toggle, target, command);
      },

      toggleByClass: function(targetClass, command) {
        if (command == null) {
          command = "toggle";
        }
        $rootScope.$emit(this.events.toggleByClass, targetClass, command);
      },

      notifyToggleState: function(elem, attrs, toggleState) {
        $rootScope.$emit(this.events.toggleableToggled, attrs.id, toggleState, attrs.exclusionGroup);
      },

      toggleStateChanged: function(elem, attrs, toggleState) {
        this.updateElemClasses(elem, attrs, toggleState);
        this.notifyToggleState(elem, attrs, toggleState);
      },

      applyCommand: function(command, oldState) {
        switch (command) {
          case this.commands.activate:
            return true;
          case this.commands.deactivate:
            return false;
          case this.commands.alternate:
            return !oldState;
        }
      },

      updateElemClasses: function(elem, attrs, active) {

        if (active) {
          if (attrs.activeClass) {
            elem.addClass(attrs.activeClass);
          }
          if (attrs.inactiveClass) {
            elem.removeClass(attrs.inactiveClass);
          }
          var parent = elem.parent();
          if (attrs.parentActiveClass) {
            parent.addClass(attrs.parentActiveClass);
          }
          if (attrs.parentInactiveClass) {
             parent.removeClass(attrs.parentInactiveClass);
          }
        } else {
          if (attrs.inactiveClass) {
            elem.addClass(attrs.inactiveClass);
          }
          if (attrs.activeClass) {
            elem.removeClass(attrs.activeClass);
          }
          var parent = elem.parent();
          if (attrs.parentInactiveClass) {
            parent.addClass(attrs.parentInactiveClass);
          }
          if (attrs.parentActiveClass) {
             parent.removeClass(attrs.parentActiveClass);
          }
        }
      }
    };
  }
])

.run([
  "$rootScope", "ToggleHelper", function($rootScope, ToggleHelper) {
    
    $rootScope.toggle = function(target, command) {
      if (command == null) {
        command = "toggle";
      }
      ToggleHelper.toggle(target, command);
    };

    $rootScope.toggleByClass = function(targetClass, command) {
      if (command == null) {
        command = "toggle";
      }
      ToggleHelper.toggleByClass(targetClass, command);
    };
  }
])

.directive('toggle', [
  "$rootScope", "ToggleHelper", function($rootScope, ToggleHelper) {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {
        var command = attrs.toggle || ToggleHelper.commands.alternate;
        var target = attrs.target;
        var targetClass = attrs.targetClass;
        var bubble = attrs.bubble === "true" || attrs.bubble === "1" || attrs.bubble === 1 || attrs.bubble === "" || attrs.bubble === "bubble";
        
        if ((!target) && attrs.href) {
          target = attrs.href.slice(1);
        }
        
        if (!(target || targetClass)) {
          throw "'target' or 'target-class' attribute required with 'toggle'";
        }
        
        elem.on("click tap", function(e) {
          var angularElem = angular.element(e.target);
          if (!angularElem.hasClass("disabled")) {
            if (target != null) {
              ToggleHelper.toggle(target, command);
            }
            if (targetClass != null) {
              ToggleHelper.toggleByClass(targetClass, command);
            }
            if (!bubble) {
              e.preventDefault();
              return false;
            } else {
              return true;
            }
          }
        });

        var unbindUpdateElemClasses = $rootScope.$on(ToggleHelper.events.toggleableToggled, function(e, id, newState) {
          if (id === target) {
            ToggleHelper.updateElemClasses(elem, attrs, newState);
          }
        });

        if (target != null) {
          $rootScope.$emit(ToggleHelper.events.togglerLinked, target);
        }

        scope.$on('$destroy', unbindUpdateElemClasses);
      }
    };
  }
])

.directive('toggleable', [
  "$rootScope", "ToggleHelper", function($rootScope, ToggleHelper) {
    return {
      restrict: "A",
      link: function(scope, elem, attrs) {        
        var toggleState = false;
        
        if (attrs["default"]) {
          switch (attrs["default"]) {
            case "active":
              toggleState = true;
              break;
            case "inactive":
              toggleState = false;
          }
          ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
        }
        
        var unbindToggle = $rootScope.$on(ToggleHelper.events.toggle, function(e, target, command) {
          var oldState;
          if (target === attrs.id) {
            oldState = toggleState;
            toggleState = ToggleHelper.applyCommand(command, oldState);
            if (oldState !== toggleState) {
              ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
            }
          }
        });
        
        var unbindToggleByClass = $rootScope.$on(ToggleHelper.events.toggleByClass, function(e, targetClass, command) {
          var oldState;
          if (elem.hasClass(targetClass)) {
            oldState = toggleState;
            toggleState = ToggleHelper.applyCommand(command, oldState);
            if (oldState !== toggleState) {
              ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
            }
          }
        });
        
        var unbindToggleableToggled = $rootScope.$on(ToggleHelper.events.toggleableToggled, function(e, target, newState, sameGroup) {
          if (newState && (attrs.id !== target) && (attrs.exclusionGroup === sameGroup) && (attrs.exclusionGroup != null)) {
            toggleState = false;
            ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
          }
        });
        
        var unbindTogglerLinked = $rootScope.$on(ToggleHelper.events.togglerLinked, function(e, target) {
          if (attrs.id === target) {
            ToggleHelper.notifyToggleState(elem, attrs, toggleState);
          }
        });
        
        scope.$on('$destroy', function() {
          unbindToggle();
          unbindToggleByClass();
          unbindToggleableToggled();
          unbindTogglerLinked();
        });
      }
    };
  }
]);

angular.module("mobile-angular-ui", [
  'mobile-angular-ui.pointer-events',
  'mobile-angular-ui.active-links',
  'mobile-angular-ui.fastclick',
  'mobile-angular-ui.scrollable',
  'mobile-angular-ui.directives.toggle',
  'mobile-angular-ui.directives.overlay',
  'mobile-angular-ui.directives.forms',
  'mobile-angular-ui.directives.panels',
  'mobile-angular-ui.directives.capture',
  'mobile-angular-ui.directives.sidebars',
  'mobile-angular-ui.directives.navbars',
  'mobile-angular-ui.directives.carousel'
 ]);