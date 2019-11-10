;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
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
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
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

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

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
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
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
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
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
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
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
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
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
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
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
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

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

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

/**
@module mobile-angular-ui.core.activeLinks
@description

`mobile-angular-ui.activeLinks` module sets up `.active` class for `a` elements those `href` attribute matches the current angular `$location` url. It takes care of excluding both search part and hash part from comparison.

`.active` classes are added/removed each time one of `$locationChangeSuccess` or `$includeContentLoaded` is fired.

## Usage

Just declare it as a dependency to your app unless you have already included one of its super-modules.

```
angular.module('myApp', ['mobile-angular-ui.core.activeLinks']);
```

**NOTE:** if you are using it without Bootstrap you may need to add some css to your stylesheets to reflect the activation state of links. I.e.

``` css
a.active {
  color: blue;
}
```

*/
(function () {
  'use strict';

  angular.module("mobile-angular-ui.core.activeLinks", [])

  .run([
      '$rootScope', 
      '$window', 
      '$document',
      '$location',
      function($rootScope, $window, $document, $location){

        var setupActiveLinks = function() {
          // Excludes both search part and hash part from 
          // comparison.
          var url = $location.url(),
              firstHash = url.indexOf('#'),
              firstSearchMark = url.indexOf('?'),
              locationHref = $window.location.href,
              plainUrlLength = locationHref.indexOf(url),
              newPath;

          if (firstHash === -1 && firstSearchMark === -1) {
            newPath = locationHref;
          } else if (firstHash !== -1 && firstHash > firstSearchMark) {
            newPath = locationHref.slice(0, plainUrlLength + firstHash);
          } else if (firstSearchMark !== -1 && firstSearchMark > firstHash) {
            newPath = locationHref.slice(0, plainUrlLength + firstSearchMark);
          }
          
          var domLinks = $document[0].links;
          for (var i = 0; i < domLinks.length; i++) {
            var domLink = domLinks[i];
            var link    = angular.element(domLink);
            if (link.attr('href') && link.attr('href') !== '' && domLink.href === newPath) {
              link.addClass('active');
            } else if (link.attr('href') && link.attr('href') !== '' && domLink.href && domLink.href.length) {
              link.removeClass('active');
            }
          }
        };

        $rootScope.$on('$locationChangeSuccess', setupActiveLinks);
        $rootScope.$on('$includeContentLoaded', setupActiveLinks);
      }
  ]);

}());


/**
 * @module mobile-angular-ui.core.capture
 * @description
 *
 * The `capture` module exposes directives to let you extract markup which can be used in other parts of a template using `uiContentFor` and `uiYieldTo` directives.
 *
 * It provides a way to move or clone a block of markup to other parts of the document.
 *
 * This method is particularly useful to setup parts of the layout within an angular view. Since blocks of html are transplanted within their original `$scope` is easy to create layout interactions depending on the context. Some tipical task you can accomplish with these directives are: _setup the navbar title depending on the view_ or _place a submit button for a form inside a navbar_.
 *
 * ## Usage
 *
 * Declare it as a dependency to your app unless you have already included some of its super-modules.
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui']);
 * ```
 *
 * Or
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui']);
 * ```
 *
 * Or
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui.core.capture']);
 * ```
 *
 * Use `ui-yield-to` as a placeholder.
 *
 * ``` html
 * <!-- index.html -->
 *
 * <div class="navbar">
 *   <div ui-yield-to="title" class="navbar-brand">
 *     <span>Default Title</span>
 *   </div>
 * </div>
 *
 * <div class="app-body">
 *   <ng-view class="app-content"></ng-view>
 * </div>
 * ```
 *
 * Use `ui-content-for` inside any view to populate the `ui-yield-to` content.
 *
 * ``` html
 * <!-- myView.html -->
 *
 * <div ui-content-for="title">
 *   <span>My View Title</span>
 * </div>
 * ```
 *
 * Since the original scope is preserved you can use directives inside `ui-content-for` blocks to interact with the current scope. In the following example we will add a navbar button to submit a form inside a nested view.
 *
 *
 * ``` html
 * <!-- index.html -->
 *
 * <div class="navbar">
 *   <div ui-yield-to="navbarAction">
 *   </div>
 * </div>
 *
 * <div class="app-body">
 *   <ng-view class="app-content"></ng-view>
 * </div>
 * ```
 *
 * ``` html
 * <!-- newCustomer.html -->
 *
 * <form ng-controller="newCustomerController">
 *
 *   <div class="inputs">
 *     <input type="text" ng-model="customer.name" />
 *   </div>
 *
 *   <div ui-content-for="navbarAction">
 *     <button ng-click="createCustomer()">
 *       Save
 *     </button>
 *   </div>
 *
 * </form>
 * ```
 *
 * ``` javascript
 * app.controller('newCustomerController', function($scope, Store){
 *   $scope.customer = {};
 *   $scope.createCustomer = function(){
 *     Store.create($scope.customer);
 *     // ...
 *   }
 * });
 * ```
 *
 * If you wish you can also duplicate markup instead of move it. Just add `duplicate` parameter to `uiContentFor` directive to specify this behaviour.
 *
 * ``` html
 * <div ui-content-for="navbarAction" duplicate>
 *   <button ng-click="createCustomer()">
 *     Save
 *   </button>
 * </div>
 * ```
 */
(function () {
   'use strict';

   angular.module('mobile-angular-ui.core.capture', [])

   .run([
     'Capture',
     '$rootScope',
     function(Capture, $rootScope) {
       $rootScope.$on('$routeChangeSuccess', function() {
         Capture.resetAll();
       });
     }
   ])

   .factory('Capture', [
     '$compile',
     function($compile) {
       var yielders = {};

       return {
         resetAll: function() {
           for (var name in yielders) {
            if (yielders.hasOwnProperty(name)) {
              this.resetYielder(name);
            }
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
           yielder.defaultContent = defaultContent || '';
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

  /**
   * @directive uiContentFor
   * @restrict A
   * @description
   *
   * `ui-content-for` makes inner contents to replace the corresponding
   * `ui-yield-to` placeholder contents.
   *
   * `uiContentFor` is intended to be used inside a view in order to populate outer placeholders.
   * Any content you send to placeholders via `ui-content-for` is
   * reverted to placeholder defaults after view changes (ie. on `$routeChangeStart`).
   *
   * @param {string} uiContentFor The id of the placeholder to be replaced
   * @param {boolean} uiDuplicate If present duplicates the content instead of moving it (default to `false`)
   *
   */
   .directive('uiContentFor', [
     'Capture',
     function(Capture) {
       return {
         compile: function(tElem, tAttrs) {
           var rawContent = tElem.html();
           if(tAttrs.uiDuplicate === null || tAttrs.uiDuplicate === undefined) {
             // no need to compile anything!
             tElem.html('');
             tElem.remove();
           }
           return function(scope, elem, attrs) {
             Capture.setContentFor(attrs.uiContentFor, rawContent, scope);
           };
         }
       };
     }
   ])

   /**
    * @directive uiYieldTo
    * @restrict A
    * @description
    *
    * `ui-yield-to` defines a placeholder which contents will be further replaced by `ui-content-for` directive.
    *
    * Inner html is considered to be a default. Default is restored any time `$routeChangeStart` happens.
    *
    * @param {string} uiYieldTo The unique id of this placeholder.
    *
    */
   .directive('uiYieldTo', [
     '$compile', 'Capture', function($compile, Capture) {
       return {
         link: function(scope, element, attr) {
           Capture.putYielder(attr.uiYieldTo, element, scope, element.html());

           element.on('$destroy', function(){
             Capture.removeYielder(attr.uiYieldTo);
           });

           scope.$on('$destroy', function(){
             Capture.removeYielder(attr.uiYieldTo);
           });
         }
       };
     }
   ]);

}());

(function () {
  'use strict';
  var module = angular.module('mobile-angular-ui.core.fastclick', []);

  module.run(['$window', function($window) {

	//Temporarly bugfix in overthrow/fastclick:
	var orgHandler = FastClick.prototype.onTouchEnd;

	// Some old versions of Android don't have Function.prototype.bind
	function bind(method, context) {
		return function() { return method.apply(context, arguments); };
	}

	FastClick.prototype.onTouchEnd = function(event) {

		if (!event.changedTouches) {
      event.changedTouches = [{}];
    }
    
		orgHandler = bind(orgHandler, this);
		orgHandler(event);
	};

	FastClick.attach($window.document.body);

  }]);

  angular.forEach(['select', 'input', 'textarea'], function(directiveName){

    module.directive(directiveName, function(){
      return {
        restrict: 'E',
        compile: function(elem) {
          elem.addClass('needsclick');
        }
      };
    });
  });
}());

/**

@module mobile-angular-ui.core.outerClick
@description

Provides a directive to specifiy a behaviour when click/tap events 
happen outside an element. This can be easily used 
to implement eg. __close on outer click__ feature for a dropdown.

## Usage

Declare it as a dependency to your app unless you have already 
included some of its super-modules.

```
angular.module('myApp', ['mobile-angular-ui']);
```

Or

```
angular.module('myApp', ['mobile-angular-ui.core']);
```

Or

```
angular.module('myApp', ['mobile-angular-ui.core.outerClick']);
```

Use `ui-outer-click` to define an expression to evaluate when an _Outer Click_ event happens.
Use `ui-outer-click-if` parameter to define a condition to enable/disable the listener.

``` html
<div class="btn-group">
  <a ui-turn-on='myDropdown' class='btn'>
    <i class="fa fa-ellipsis-v"></i>
  </a>
  <ul 
    class="dropdown-menu"
    ui-outer-click="Ui.turnOff('myDropdown')"
    ui-outer-click-if="Ui.active('myDropdown')"
    role="menu"
    ui-show="myDropdown" 
    ui-state="myDropdown"
    ui-turn-off="myDropdown">

    <li><a>Action</a></li>
    <li><a>Another action</a></li>
    <li><a>Something else here</a></li>
    <li class="divider"></li>
    <li><a>Separated link</a></li>
  </ul>
</div>
```

*/
(function () {
   'use strict';

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

   angular.module('mobile-angular-ui.core.outerClick', [])

   /**
    * @service bindOuterClick
    * @as function
    * 
    * @description
    * This is a service function that binds a callback to be conditionally executed
    * when a click event happens outside a specified element.
    *
    * Ie.
    * 
    * ``` js
    * app.directive('myDirective', function('bindOuterClick'){
    *   return {
    *     link: function(scope, element) {
    *       bindOuterClick(element, function(scope, extra){
    *         alert('You clicked ouside me!');
    *       }, function(e){
    *         return element.hasClass('disabled') ? true : false;
    *       });
    *     }
    *   };
    * });
    * ```
    * @scope {scope} the scope to eval callbacks
    * @param {DomElement|$element} element The element to bind to. 
    * @param {function} callback A `function(scope, options)`, usually the result of `$parse`, that is called when an _outer click_ event happens.
    * @param {string|function} condition Angular `$watch` expression to decide whether to run `callback` or not.
    */
   .factory('bindOuterClick', [
     '$document',
     '$timeout',
     function ($document, $timeout) {
       
       return function (scope, element, outerClickFn, outerClickIf) {
         var handleOuterClick = function(event){
           if (!isAncestorOrSelf(angular.element(event.target), element)) {
             scope.$apply(function() {
               outerClickFn(scope, {$event:event});
             });
           }
         };

         var stopWatching = angular.noop;
         var t = null;

         if (outerClickIf) {
           stopWatching = scope.$watch(outerClickIf, function(value){
             $timeout.cancel(t);

             if (value) {
               // prevents race conditions 
               // activating with other click events
               t = $timeout(function() {
                 $document.on('click tap', handleOuterClick);
               }, 0);

             } else {
               $document.unbind('click tap', handleOuterClick);    
             }
           });
         } else {
           $timeout.cancel(t);
           $document.on('click tap', handleOuterClick);
         }

         scope.$on('$destroy', function(){
           stopWatching();
           $document.unbind('click tap', handleOuterClick);
         });
       };
     }
   ])


  /**
   * @directive outerClick
   * 
   * @description
   * Evaluates an expression when an _Outer Click_ event happens.
   * 
   * @param {expression} uiOuterClick Expression to evaluate when an _Outer Click_ event happens.
   * @param {expression} uiOuterClickIf Condition to enable/disable the listener. Defaults to `true`.
   */
   .directive('uiOuterClick', [
     'bindOuterClick', 
     '$parse',
     function(bindOuterClick, $parse){
       return {
         restrict: 'A',
         compile: function(elem, attrs) {
           var outerClickFn = $parse(attrs.uiOuterClick);
           var outerClickIf = attrs.uiOuterClickIf;
           return function(scope, elem) {
             bindOuterClick(scope, elem, outerClickFn, outerClickIf);
           };
         }
       };
     }
   ]);
}());
(function() {
  'use strict';  
  /**
   * @module mobile-angular-ui.core.sharedState
   *
   * @description
   * `mobile-angular-ui.core.sharedState` is expose the homonymous service
   * `SharedState` and a group of directives to access it.
   *
   * `SharedState` allows to use elementary angular or angularish directives
   * to create interactive components.
   *
   * Ie.
   *
   * ``` html
   * <div class="nav nav-tabs" ui-state='activeTab'>
   *   <a ui-set="{activeTab: 1}">Tab1</a>
   *   <a ui-set="{activeTab: 2}">Tab2</a>
   *   <a ui-set="{activeTab: 3}">Tab3</a>
   * </div>
   * <div class="tabs">
   *   <div ui-if="activeTab == 1">Tab1</div>
   *   <div ui-if="activeTab == 2">Tab2</div>
   *   <div ui-if="activeTab == 3">Tab3</div>
   * </div>
   * ```
   * 
   * Using `SharedState` you will be able to:
   * 
   * - Create interactive components without having to write javascript code
   * - Have your controller free from UI logic
   * - Separe `ng-click` triggering application logic from those having a visual effect only
   * - Export state of components to urls
   * - Easily make components comunicate each other
   *
   * Also note that:
   *
   * Data structures retaining statuses will stay outside angular scopes
   * thus they are not evaluated against digest cycle until its necessary. 
   * Also although statuses are sort of global variables `SharedState` will 
   * take care of disposing them when no scopes are requiring them anymore.
   * 
   * A set of `ui-*` directives are available to interact with `SharedState`
   * module and will hopefully let you spare your controllers and your time 
   * for something that is more meaningful than this:
   * 
   * ``` js
   * $scope.activeTab = 1;
   * 
   * $scope.setActiveTab = function(n) {
   *   $scope.activeTab = n;
   * };
   * ```
   * 
   * ## Usage
   * 
   * Declare it as a dependency to your app unless you have already included some 
   * of its super-modules.
   * 
   * ```
   * angular.module('myApp', ['mobile-angular-ui.core.sharedState']);
   * ```
   * 
   * Use `ui-state` directive to require/initialize a state from the target element scope
   * 
   * **Example.** Tabs
   * 
   * <iframe class='embedded-example' src='/examples/tabs.html'></iframe>
   *
   * **Example.** Custom components
   *
   * <iframe class='embedded-example'  src='/examples/lightbulb.html'></iframe>
   *
   * NOTE: `ui-toggle/set/turnOn/turnOff` responds to `click/tap` without stopping propagation so you can use them along with ng-click too. You can also change events to respond to with `ui-triggers` attribute.
   * 
   * Any `SharedState` method is exposed through `Ui` object in `$rootScope`. So you could always do `ng-click="Ui.turnOn('myVar')"`.
   * 
   * Since `SharedState` is a service you can initialize/set statuses through controllers too:
   * 
   * ``` js
   * app.controller('myController', function($scope, SharedState){
   *   SharedState.initialize($scope, "activeTab", 3);
   * });
   * ```
   * 
   * As well as you can use `ui-default` for that: 
   * 
   * ``` html
   * <div class="tabs" ui-state="activeTab" ui-default="thisIsAnExpression(5 + 1 - 2)"></div>
   * ```
   * 
   */
  var module = angular.module('mobile-angular-ui.core.sharedState', []);

  /**
   * @ngdoc service
   * @class SharedState
   *
   * @description
   * 
   * A `SharedState` state can be considered as a global variable identified by an `id`.
   * 
   * `SharedState` service exposes methods to interact with statuses to create, read and update states. 
   * 
   * It acts as a BUS between UI elements to share UI related state that is automatically disposed when all scopes requiring it are destroyed.
   * 
   * eg.
   * 
   * ``` js
   * app.controller('controller1', function($scope, SharedState){
   *   SharedState.initialize($scope, 'myId');
   * });
   * 
   * app.controller('controller2', function(SharedState){
   *   SharedState.toggle('myId');
   * });
   * ```
   * 
   * Data structures retaining statuses will stay outside angular scopes thus they are not evaluated against digest cycle until its necessary. Also although statuses are sort of global variables `SharedState` will take care of disposing them when no scopes are requiring them anymore.
   * 
   * A set of `ui-*` directives are available to interact with `SharedState` module and will hopefully let you spare your controllers and your time for something that is more meaningful than this:
   * 
   * ``` js
   * $scope.activeTab = 1;
   * 
   * $scope.setActiveTab = function(n) {
   *   $scope.activeTab = n;
   * };
   * ```
   *
   */
  
   /**
    * @event 'mobile-angular-ui.state.initialized.ID'
    * @shortname initialized
    * @memberOf mobile-angular-ui.core.sharedState~SharedState 
    * 
    * @description
    * Broadcasted on `$rootScope` when `#initialize` is called for a new state not referenced by any scope currently.
    * 
    * @param {any} currentValue The value with which this state has been initialized
    * 
    * @memberOf mobile-angular-ui.core.sharedState~SharedState
    */
   
   /**
    * @event 'mobile-angular-ui.state.destroyed.ID'
    * @shortname destroyed
    * @memberOf mobile-angular-ui.core.sharedState~SharedState
    * 
    * @description
    * Broadcasted on `$rootScope` when a state is destroyed.         
    * 
    */
   
    /**
     * @event 'mobile-angular-ui.state.changed.ID'
     * @shortname changed
     * @memberOf mobile-angular-ui.core.sharedState~SharedState
     * 
     * @description
     * Broadcasted on `$rootScope` the value of a state changes.
     * 
     * ``` js
     * $scope.$on('mobile-angular-ui.state.changed.uiSidebarLeft', function(e, newVal, oldVal) {
     *   if (newVal === true) {
     *     console.log('sidebar opened');
     *   } else {
     *     console.log('sidebar closed');
     *   }
     * });
     * ```
     * 
     * @param {any} newValue
     * @param {any} oldValue
     * 
     */  

  module.factory('SharedState', [
    '$rootScope',
    function($rootScope){
      var values = {};    // values, context object for evals
      var statusesMeta = {};  // status info
      var scopes = {};    // scopes references
      var exclusionGroups = {}; // support exclusive boolean sets

      return {
        /**
         * @function initialize
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * Initialize, or require if already intialized, a state identified by `id` within the provided `scope`, making it available to the rest of application.
         * 
         * A `SharedState` is bound to one or more scopes. Each time `initialize` is called for an angular `scope` this will be bound to the `SharedState` and a reference count is incremented to allow garbage collection.
         * 
         * Reference count is decremented once the scope is destroyed. When the counter reach 0 the state will be disposed.
         * 
         * @param  {scope} scope The scope to bound this state
         * @param  {string} id The unique name of this state 
         * @param  {object} [options] Options
         * @param  {object} [options.defaultValue] the initialization value, it is taken into account only if the state `id` is not already initialized
         * @param  {object} [options.exclusionGroup] Specifies an exclusion group for the state. This means that for boolean operations (ie. toggle, turnOn, turnOf) when this state is set to `true`, any other state that is in the same `exclusionGroup` will be set to `false`.
         */
        initialize: function(scope, id, options) {
          options = options || {};
          
          var isNewScope = scopes[scope] === undefined,
              defaultValue = options.defaultValue,
              exclusionGroup = options.exclusionGroup;

          scopes[scope.$id] = scopes[scope.$id] || [];
          scopes[scope.$id].push(id);

          if (!statusesMeta[id]) { // is a brand new state 
                                   // not referenced by any 
                                   // scope currently

            statusesMeta[id] = angular.extend({}, options, {references: 1});

            $rootScope.$broadcast('mobile-angular-ui.state.initialized.' + id, defaultValue);

            if (defaultValue !== undefined) {
              this.setOne(id, defaultValue);
            }

            if (exclusionGroup) {
              // Exclusion groups are sets of statuses references
              exclusionGroups[exclusionGroup] = exclusionGroups[exclusionGroup] || {};
              exclusionGroups[exclusionGroup][id] = true;
            }

          } else if (isNewScope) { // is a new reference from 
                                   // a different scope
            statusesMeta[id].references++; 
          }
          scope.$on('$destroy', function(){
            var ids = scopes[scope.$id] || [];
            for (var i = 0; i < ids.length; i++) {
              var status = statusesMeta[ids[i]];
              
              if (status.exclusionGroup) {
                delete exclusionGroups[status.exclusionGroup][ids[i]];
                if (Object.keys(exclusionGroups[status.exclusionGroup]).length === 0) {
                  delete exclusionGroups[status.exclusionGroup];
                }
              }

              status.references--;
              if (status.references <= 0) {
                delete statusesMeta[ids[i]];
                delete values[ids[i]];
                $rootScope.$broadcast('mobile-angular-ui.state.destroyed.' + id);
              }
            }
            delete scopes[scope.$id];
          });
        },

        /**
         * @function setOne
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * Set the value of the state identified by `id` to the `value` parameter.
         *
         * @param  {string} id Unique identifier for state
         * @param  {any} value New value for this state
         */
        setOne: function(id, value) {
          if (statusesMeta[id] !== undefined) {
            var prev = values[id];
            values[id] = value;
            if (prev !== value) {
              $rootScope.$broadcast('mobile-angular-ui.state.changed.' + id, value, prev);
            }
            return value;
          } else {
            /* global console: false */
            if (console) {
              console.warn('Warning: Attempt to set uninitialized shared state:', id);
            }
          }
        },

        /**
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * 
         * @function setMany
         * @description
         *
         * Set multiple statuses at once. ie.
         * 
         * ```
         * SharedState.setMany({ activeTab: 'firstTab', sidebarIn: false });
         * ```
         * 
         * @param {object} object An object of the form `{state1: value1, ..., stateN: valueN}`
         */
        setMany: function(map) {
          angular.forEach(map, function(value, id) {
            this.setOne(id, value);
          }, this);
        },


        /**
         * @function set
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         * 
         * A shorthand for both `setOne` and `setMany`.
         * When called with only one parameter that is an object 
         * it is the same of `setMany`, otherwise is the 
         * same of `setOne`.
         * 
         * @param {string|object} idOrMap A state id or a `{state: value}` map object.
         * @param {any} [value] The value to assign in case idOrMap is a string.
         */
        set: function(idOrMap, value) {
          if (angular.isObject(idOrMap) && angular.isUndefined(value)) {
            this.setMany(idOrMap);
          } else {
            this.setOne(idOrMap, value);
          }
        },

        /**
         * @function turnOn
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         * 
         * Set shared state identified by `id` to `true`. If the 
         * shared state has been initialized with `exclusionGroup` 
         * option it will also turn off (set to `false`) all other 
         * statuses from the same exclusion group.
         * 
         * @param  {string} id The unique name of this state
         */
        turnOn: function(id) {
          // Turns off other statuses belonging to the same exclusion group.
          var eg = statusesMeta[id] && statusesMeta[id].exclusionGroup;
          if (eg) {
            var egStatuses = Object.keys(exclusionGroups[eg]);
            for (var i = 0; i < egStatuses.length; i++) {
              var item = egStatuses[i];
              if (item !== id) {
                this.turnOff(item);
              }
            }
          }
          return this.setOne(id, true);
        },

        /**
         * @function turnOff
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * 
         * @description
         * Set shared state identified by `id` to `false`.
         *
         * @param  {string} id The unique name of this state
         */
        turnOff: function(id) {
          return this.setOne(id, false);
        },

        /**
         * @function toggle
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * If current value for shared state identified by `id` evaluates 
         * to `true` it calls `turnOff` on it otherwise calls `turnOn`. 
         * Be aware that it will take into account `exclusionGroup` option. 
         * See `#turnOn` and `#initialize` for more.
         *
         * @param  {string} id The unique name of this state
         */
        toggle: function(id) {
          return this.get(id) ? this.turnOff(id) : this.turnOn(id);
        },

        /**
         * @function get
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * 
         * @description
         * Returns the current value of the state identified by `id`.
         *
         * @param  {string} id The unique name of this state
         * @returns {any}
         */
        get: function(id) {
          return statusesMeta[id] && values[id];
        },

        /**
         * @function isActive
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         *
         * Return `true` if the boolean conversion of `#get(id)` evaluates to `true`.
         *
         * @param  {string} id The unique name of this state
         * @returns {bool}
         */
        isActive: function(id) {
          return !! this.get(id);
        },

        /**
         * @function active
         * @alias mobile-angular-ui.core.sharedState~SharedState.isActive
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         * 
         * Alias for `#isActive`.
         * 
         * @param  {string} id The unique name of this state
         * @returns {bool}
         */
        active: function(id) {
          return this.isActive(id);
        },

        /**
         * @function isUndefined
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @description
         * 
         * Return `true` if state identified by `id` is not defined.
         * 
         * @param  {string} id The unique name of this state
         * @returns {bool}
         */
        isUndefined: function(id) {
          return statusesMeta[id] === undefined || this.get(id) === undefined;
        },

        /**
         * Returns `true` if state identified by `id` exsists.
         * 
         * @param  {string} id The unique name of this state
         * @returns {bool}
         * 
         * @function has
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         */
        has: function(id) {
          return statusesMeta[id] !== undefined;
        },

        /**
         * Returns the number of references of a status.
         * 
         * @param  {string} id The unique name of this state
         * @returns {integer}
         * 
         * @function referenceCount
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         */
        referenceCount: function(id) {
          var status = statusesMeta[id];
          return status === undefined ? 0 : status.references;
        },

        /**
         * Returns `true` if `#get(id)` is exactly equal (`===`) to `value` param.
         *
         * @param  {string} id The unique name of this state
         * @param  {any} value The value for comparison
         * @returns {bool} 
         * 
         * @function equals
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         */
        equals: function(id, value) {
          return this.get(id) === value;
        },


        /**
         * Alias for `#equals`
         * 
         * @param  {string} id The unique name of this state
         * @param  {any} value The value for comparison
         * @returns {bool} 
         * 
         * @function eq
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         * @alias mobile-angular-ui.core.sharedState~SharedState.equals
         */
        eq: function(id, value) {
          return this.equals(id, value);
        },

        /**
         * Returns an object with all the status values currently stored. 
         * It has the form of `{statusId: statusValue}`.
         * 
         * Bear in mind that in order to spare resources it currently 
         * returns just the internal object retaining statuses values. 
         * Thus it is not intended to be modified and direct changes to it will be not tracked or notified.
         * 
         * Just clone before apply any change to it.
         * 
         * @returns {object}
         * 
         * @function values
         * @memberOf mobile-angular-ui.core.sharedState~SharedState
         */
        values: function() {
          return values;
        }
  
      };
    }
  ]);

  var uiBindEvent = function(scope, element, eventNames, fn){
    eventNames = eventNames || 'click tap';
    element.on(eventNames, function(event){
      scope.$apply(function() {
        fn(scope, {$event:event});
      });
    });
  };

  /**
   * Calls `SharedState#initialize` on the scope relative to the element using it.
   * 
   * @param {string} uiState The shared state id
   * @param {expression} [uiDefault] the default value
   * 
   * @directive uiState
   */
  module.directive('uiState', [
    'SharedState',
    function(SharedState){
      return {
        restrict: 'EA',
        priority: 601, // more than ng-if
        link: function(scope, elem, attrs){
          var id               = attrs.uiState || attrs.id,
              defaultValueExpr = attrs.uiDefault || attrs['default'],
              defaultValue     = defaultValueExpr ? scope.$eval(defaultValueExpr) : undefined;

          SharedState.initialize(scope, id, {
            defaultValue: defaultValue,
            exclusionGroup: attrs.uiExclusionGroup
          });
        }
      };
    }
  ]);

  angular.forEach(['toggle', 'turnOn', 'turnOff', 'set'], 
    function(methodName){
      var directiveName = 'ui' + methodName[0].toUpperCase() + methodName.slice(1);

      /**
       * Calls `SharedState#toggle` when triggering events happens on the element using it.
       * 
       * @param {string} uiToggle the target shared state
       * @param {expression} uiDefault the default value
       *
       * @directive uiToggle
       */
      
      /**
       * @function uiTurnOn
       * 
       * @description
       * Calls `SharedState#turnOn` when triggering events happens on the element using it.
       *
       * 
       * @ngdoc directive
       * 
       * @param {string} uiTurnOn the target shared state
       * @param {expression} uiDefault the default value
       */

      /**
       * @function uiTurnOff
       * 
       * @description
       * Calls `SharedState#turnOff` when triggering events happens on the element using it.
       * 
       * @ngdoc directive
       * 
       * @param {string} uiTurnOff the target shared state
       * @param {string} [uiTriggers='click tap'] the event triggering the call.
       */

      /**
       * @function uiSet
       * 
       * @description
       * Calls `SharedState#set` when triggering events happens on the element using it.
       * 
       * @ngdoc directive
       * 
       * @param {object} uiSet The object to pass to SharedState#set
       * @param {string} [uiTriggers='click tap'] the event triggering the call.
       */
      
      module.directive(directiveName, [
        '$parse',
        '$interpolate',
        'SharedState',
        function($parse, $interpolate, SharedState) {
              var method = SharedState[methodName];
              return {
                restrict: 'A',
                priority: 1, // This would make postLink calls happen after ngClick 
                             // (and similar) ones, thus intercepting events after them.
                             // 
                             // This will prevent eventual ng-if to detach elements 
                             // before ng-click fires.

                compile: function(elem, attrs) {
                  var attr = attrs[directiveName];
                  var needsInterpolation = attr.match(/\{\{/);
                  
                  var exprFn = function($scope) {
                    var res = attr;
                    if (needsInterpolation) {
                      var interpolateFn = $interpolate(res);
                      res = interpolateFn($scope);
                    }
                    if (methodName === 'set') {
                      res = ($parse(res))($scope);    
                    }
                    return res;                                          
                  };

                  return function(scope, elem, attrs) {
                    var callback = function() {
                      var arg = exprFn(scope);
                      return method.call(SharedState, arg);
                    };
                    uiBindEvent(scope, elem, attrs.uiTriggers, callback);
                  };
                }
              };
            }
      ]);
    });

 /**
  * @name uiScopeContext
  * @inner 
  * @description
  * 
  * `uiScopeContext` is not a directive, but a parameter common to any of the 
  * `ui-*` directives in this module.
  *
  * By default all `ui-*` conditions in this module evaluates in the context of 
  * `SharedState` only, thus scope variable are not accessible. To use them you have 
  * two options:
  *
  * #### 1. pre-interpolation
  * 
  * You can use pre-interpolation in expression attribute. For instance the following syntax
  * is ligit:
  * 
  * ``` html
  * <div ui-if='state{{idx}}'><!-- ... --></div>
  * ```
  *
  * In this case `idx` value is taken from scope and embedded into
  * conditions before parse them.
  *
  * This works as expected and is fine for the most cases, but it has a little caveat:
  *
  * The condition has to be re-parsed at each digest loop and has to walk scopes 
  * in watchers.
  *
  * #### 2. uiScopeContext
  *
  * If you are concerned about performance issues using the first approach 
  * `uiScopeContext` is a more verbose but also lightweight alternative 
  * to accomplish the same.
  *  
  * It allows to use current scope vars inside `ui-*` conditions, leaving
  * other scope vars (or the entire scope if not present) apart from the
  * condition evaluation process.
  * 
  * Hopefully this will keep evaluation running against a flat and small data 
  * structure instead of taking into account the whole scope. 
  * 
  * It is a list `scopeVar[ as aliasName] [, ...]` specifing one of more scope
  * variables to take into account when evaluating conditions. ie:
  * 
  * ``` html
  * <!-- use item from ng-repeat -->
  * <div ui-if="openPanel == i" ui-scope-context='i' ng-repeat="i in [1,2,3]">
  *   <div class="panel-body">
  *     <!-- ... -->
  *   </div>
  * </div>
  * ```
  * 
  * ``` html
  * <div ui-if="sharedState1 == myVar1 && sharedState2 == myVar2"
  *   ui-scope-context="myVar1, myVar2"
  * >
  * </div>
  * ```
  * 
  * Be aware that scope vars will take precedence over sharedStates so,
  * in order to avoid name clashes you can use 'as' to refer to scope vars
  * with a different name in conditions:
  * 
  * ``` html
  * <div ui-if="x == myVar1 && y == myVar2"
  *   ui-scope-context="x as myVar1, y as myVar2"
  * >
  * </div>
  * ```
  */
  var parseScopeContext = function(attr) {
    if (!attr || attr === '') {
      return [];
    }
    var vars = attr ? attr.trim().split(/ *, */) : [];
    var res = [];
    for (var i = 0; i < vars.length; i++) {
      var item = vars[i].split(/ *as */);
      if (item.length > 2 || item.length < 1) {
        throw new Error('Error parsing uiScopeContext="' + attr + '"');
      }
      res.push(item);
    }
    return res;
  };

  var mixScopeContext = function(context, scopeVars, scope) {
    for (var i = 0; i < scopeVars.length; i++) {
      var key = scopeVars[i][0];
      var alias = scopeVars[i][1] || key;
      context[alias] = key.split('.').reduce(function (scope, nextKey) {
        return scope[nextKey];
      }, scope);
    }
  };

  var parseUiCondition = function(name, attrs, $scope, SharedState, $parse, $interpolate) {
    var expr = attrs[name];
    var needsInterpolation = expr.match(/\{\{/);
    var exprFn;

    if (needsInterpolation) {
      exprFn = function(context) {
        var interpolateFn = $interpolate(expr);
        var parseFn = $parse(interpolateFn($scope));
        return parseFn(context);
      };
    } else {
      exprFn = $parse(expr);
    }

    var uiScopeContext = parseScopeContext(attrs.uiScopeContext);
    return function() {
      var context;
      if (uiScopeContext.length) {
        context = angular.extend({}, SharedState.values());
        mixScopeContext(context, uiScopeContext, $scope);  
      } else {
        context = SharedState.values();
      }
      return exprFn(context);
    };
  };

  
 /**
  * @ngdoc directive
  * @function uiIf
  * 
  * @description 
  * Same as `ngIf` but evaluates condition against `SharedState` statuses too
  * 
  * @param {expression} uiIf A condition to decide wether to attach the element to the dom
  * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]` specifing one of more scope variables to take into account when evaluating condition.
  */ 
  module.directive('uiIf', ['$animate', 'SharedState', '$parse', '$interpolate', function($animate, SharedState, $parse, $interpolate) {
    function getBlockNodes(nodes) {
      var node = nodes[0];
      var endNode = nodes[nodes.length - 1];
      var blockNodes = [node];
      do {
        node = node.nextSibling;
        if (!node) { break; }
        blockNodes.push(node);
      } while (node !== endNode);

      return angular.element(blockNodes);
    }

    return {
      multiElement: true,
      transclude: 'element',
      priority: 600,
      terminal: true,
      restrict: 'A',
      $$tlb: true,
      link: function ($scope, $element, $attr, ctrl, $transclude) {
          var block, childScope, previousElements, 
          uiIfFn = parseUiCondition('uiIf', $attr, $scope, SharedState, $parse, $interpolate);

          $scope.$watch(uiIfFn, function uiIfWatchAction(value) {
            if (value) {
              if (!childScope) {
                $transclude(function (clone, newScope) {
                  childScope = newScope;
                  clone[clone.length++] = document.createComment(' end uiIf: ' + $attr.uiIf + ' ');
                  // Note: We only need the first/last node of the cloned nodes.
                  // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                  // by a directive with templateUrl when its template arrives.
                  block = {
                    clone: clone
                  };
                  $animate.enter(clone, $element.parent(), $element);
                });
              }
            } else {
              if (previousElements) {
                previousElements.remove();
                previousElements = null;
              }
              if (childScope) {
                childScope.$destroy();
                childScope = null;
              }
              if (block) {
                previousElements = getBlockNodes(block.clone);
                var done = function() {
                  previousElements = null;
                };
                var nga = $animate.leave(previousElements, done);
                if (nga) {
                  nga.then(done);
                }
                block = null;
              }
            }
          });
      }
    };
  }]);

  
  /**
   * @ngdoc directive 
   * @function uiHide
   * 
   * @description
   * Same as `ngHide` but evaluates condition against `SharedState` statuses
   * 
   * @param {expression} uiShow A condition to decide wether to hide the element
   * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]` specifing one of more scope variables to take into account when evaluating condition.
   */ 
  module.directive('uiHide', ['$animate', 'SharedState', '$parse', '$interpolate', function($animate, SharedState, $parse, $interpolate) {
    var NG_HIDE_CLASS = 'ng-hide';
    var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';

    return {
      restrict: 'A',
      multiElement: true,
      link: function(scope, element, attr) {
        var uiHideFn = parseUiCondition('uiHide', attr, scope, SharedState, $parse, $interpolate);
        scope.$watch(uiHideFn, function uiHideWatchAction(value){
          $animate[value ? 'addClass' : 'removeClass'](element,NG_HIDE_CLASS, {
            tempClasses : NG_HIDE_IN_PROGRESS_CLASS
          });
        });
      }
    };
  }]);

  /**
   * @ngdoc directive 
   * @function uiShow
   * 
   * @description
   * Same as `ngShow` but evaluates condition against `SharedState` statuses
   * 
   * @param {expression} uiShow A condition to decide wether to show the element
   * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]` specifing one of more scope variables to take into account when evaluating condition.
   */ 
  module.directive('uiShow', ['$animate', 'SharedState', '$parse', '$interpolate', function($animate, SharedState, $parse) {
    var NG_HIDE_CLASS = 'ng-hide';
    var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';

    return {
      restrict: 'A',
      multiElement: true,
      link: function(scope, element, attr) {
        var uiShowFn = parseUiCondition('uiShow', attr, scope, SharedState, $parse);
        scope.$watch(uiShowFn, function uiShowWatchAction(value){
          $animate[value ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
            tempClasses : NG_HIDE_IN_PROGRESS_CLASS
          });
        });
      }
    };
  }]);

  /**
   * @ngdoc directive 
   * @function uiClass
   * 
   * @description
   * A simplified version of `ngClass` that evaluates in context of `SharedState`, it only suppors the `{'className': expr}` syntax.
   * 
   * @param {expression} uiClass An expression that has to evaluate to an object of the form `{'className': expr}`, where `expr` decides wether the class should appear to element's class list.
   * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]` specifing one of more scope variables to take into account when evaluating condition.
   */ 
  module.directive('uiClass', ['SharedState', '$parse', '$interpolate', function(SharedState, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var uiClassFn = parseUiCondition('uiClass', attr, scope, SharedState, $parse);
        scope.$watch(uiClassFn, function uiClassWatchAction(value){
          var classesToAdd = '';
          var classesToRemove = '';
          angular.forEach(value, function(expr, className) {
            if (expr) {
              classesToAdd += ' ' + className;
            } else {
              classesToRemove += ' ' + className;
            }
            classesToAdd = classesToAdd.trim();
            classesToRemove = classesToRemove.trim();
            if (classesToAdd.length) {
              element.addClass(classesToAdd);  
            }
            if (classesToRemove.length) {
              element.removeClass(classesToRemove);
            }
          });
        }, true);
      }
    };
  }]);

  module.run([
    '$rootScope',
    'SharedState',
    function($rootScope, SharedState){
      $rootScope.Ui = SharedState;
    }
  ]);


}());

/**
 * Provides directives and service to prevent touchmove default behaviour 
 * for touch devices (ie. bounce on overscroll in IOS).
 *
 * #### Usage
 *
 * Use `ui-prevent-touchmove-defaults` directive on root element of your app:
 * 
 * ``` html
 * <body ng-app='myApp' ui-prevent-touchmove-defaults>
 *   <!-- ... -->
 * </body>
 * ```
 *
 * Doing so `touchmove.preventDefault` logic for inner elements is inverted,
 * so any `touchmove` default behaviour is automatically prevented.
 * 
 * If you wish to allow the default behaviour, for example to allow 
 * inner elements to scroll, you have to explicitly mark an event to allow 
 * touchmove default.
 *
 * Mobile Angular UI already handles this for `scrollable` elements, so you don't have
 * to do anything in order to support scroll.
 *
 * If you wish to allow touchmove defaults for certain element under certain conditions
 * you can use the `allowTouchmoveDefault` service.
 *
 * ie.
 * 
 * ``` js
 * // always allow touchmove default for an element
 * allowTouchmoveDefault(myelem);
 * ```
 * 
 * ``` js
 * // allow touchmove default for an element only under certain conditions
 * allowTouchmoveDefault(myelem, function(touchmove){
 *   return touchmove.pageY > 100;
 * });
 * ```
 * 
 * @module mobile-angular-ui.core.touchmoveDefaults
 */
(function () {
  'use strict';
  var module = angular.module('mobile-angular-ui.core.touchmoveDefaults', []);

  module.directive('uiPreventTouchmoveDefaults', function() {
    var preventTouchmoveDefaultsCb = function(e) {
      if (e.allowTouchmoveDefault !== true) {
        e.preventDefault();
      }
    };

    return {
      compile: function(element) {
        if ('ontouchmove' in document) {
          element.on('touchmove', preventTouchmoveDefaultsCb);
        }
      }
    };
  });

  /**
   * Bind a listener to an element to allow `touchmove` default behaviour
   * when `touchmove` happens inside the bound element.
   * 
   * You can also provide a function to decide when to allow and 
   * when to prevent it.
   *
   * ``` js
   * // always allow touchmove default
   * allowTouchmoveDefault(myelem);
   * 
   * // allow touchmove default only under certain conditions
   * allowTouchmoveDefault(myelem, function(touchmove){
   *   return touchmove.pageY > 100;
   * });
   * ```
   *
   * @param {Element|$element} element The element to bind.
   * @param {function} condition A `function(touchmove)⟶boolean` to decide
   *                             whether to allow default behavior or not. 
   * 
   * @service allowTouchmoveDefault
   * @as function
   * @returns function Function to unbind the listener
   */
  
  module.factory('allowTouchmoveDefault', function(){
    var fnTrue = function() { return true; };

    if ('ontouchmove' in document) {
        return function($element, condition) {
          condition = condition || fnTrue;

          var allowTouchmoveDefaultCallback = function(e) {
            if (condition(e)) { e.allowTouchmoveDefault = true; }
          };

          $element = angular.element($element);
          $element.on('touchmove',  allowTouchmoveDefaultCallback);

          $element.on('$destroy', function() {
            $element.off('touchmove', allowTouchmoveDefaultCallback);
            $element = null;
          });

          return function() {
            if ($element) {
              $element.off('touchmove', allowTouchmoveDefaultCallback);              
            }
          };
        };
    } else {
      return angular.noop;
    }
  });

}());
/**

@module mobile-angular-ui.core

@description

It has all the core functionalities of Mobile Angular UI. It aims to act as a common base 
for an UI framework providing services and directives to create components and implement 
UI interactions with angular.

<div class="alert alert-success">
  <b>NOTE</b>
  <ul>
    <li>It has no dependency on Bootstrap.</li>
    <li>It is not related to mobile apps only.</li>
    <li>It is not requiring CSS support.</li>
    <li><b>You can use it on any Angular Application and with any CSS framework.</b></li>
  </ul>
</div>

## Standalone Usage

Although `.core` module is required by `mobile-angular-ui` by default you can use it alone.

``` js
angular.module('myApp', ['mobile-angular-ui.core']);
```

*/
(function () {
  'use strict';
  angular.module('mobile-angular-ui.core', [
    'mobile-angular-ui.core.fastclick',
    'mobile-angular-ui.core.activeLinks',
    'mobile-angular-ui.core.capture',
    'mobile-angular-ui.core.outerClick',
    'mobile-angular-ui.core.sharedState',
    'mobile-angular-ui.core.touchmoveDefaults'
  ]);
}());