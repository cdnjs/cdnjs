/*! onsenui - v1.3.8 - 2015-07-27 */
// Copyright (c) Microsoft Open Technologies, Inc.  All rights reserved.  Licensed under the Apache License, Version 2.0.  See License.txt in the project root for license information.
// JavaScript Dynamic Content shim for Windows Store apps
(function () {

    if (window.MSApp && MSApp.execUnsafeLocalFunction) {

        // Some nodes will have an "attributes" property which shadows the Node.prototype.attributes property
        //  and means we don't actually see the attributes of the Node (interestingly the VS debug console
        //  appears to suffer from the same issue).
        //
        var Element_setAttribute = Object.getOwnPropertyDescriptor(Element.prototype, "setAttribute").value;
        var Element_removeAttribute = Object.getOwnPropertyDescriptor(Element.prototype, "removeAttribute").value;
        var HTMLElement_insertAdjacentHTMLPropertyDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "insertAdjacentHTML");
        var Node_get_attributes = Object.getOwnPropertyDescriptor(Node.prototype, "attributes").get;
        var Node_get_childNodes = Object.getOwnPropertyDescriptor(Node.prototype, "childNodes").get;
        var detectionDiv = document.createElement("div");

        function getAttributes(element) {
            return Node_get_attributes.call(element);
        }

        function setAttribute(element, attribute, value) {
            try {
                Element_setAttribute.call(element, attribute, value);
            } catch (e) {
                // ignore
            }
        }

        function removeAttribute(element, attribute) {
            Element_removeAttribute.call(element, attribute);
        }

        function childNodes(element) {
            return Node_get_childNodes.call(element);
        }

        function empty(element) {
            while (element.childNodes.length) {
                element.removeChild(element.lastChild);
            }
        }

        function insertAdjacentHTML(element, position, html) {
            HTMLElement_insertAdjacentHTMLPropertyDescriptor.value.call(element, position, html);
        }

        function inUnsafeMode() {
            var isUnsafe = true;
            try {
                detectionDiv.innerHTML = "<test/>";
            }
            catch (ex) {
                isUnsafe = false;
            }

            return isUnsafe;
        }

        function cleanse(html, targetElement) {
            var cleaner = document.implementation.createHTMLDocument("cleaner");
            empty(cleaner.documentElement);
            MSApp.execUnsafeLocalFunction(function () {
                insertAdjacentHTML(cleaner.documentElement, "afterbegin", html);
            });

            var scripts = cleaner.documentElement.querySelectorAll("script");
            Array.prototype.forEach.call(scripts, function (script) {
                switch (script.type.toLowerCase()) {
                    case "":
                        script.type = "text/inert";
                        break;
                    case "text/javascript":
                    case "text/ecmascript":
                    case "text/x-javascript":
                    case "text/jscript":
                    case "text/livescript":
                    case "text/javascript1.1":
                    case "text/javascript1.2":
                    case "text/javascript1.3":
                        script.type = "text/inert-" + script.type.slice("text/".length);
                        break;
                    case "application/javascript":
                    case "application/ecmascript":
                    case "application/x-javascript":
                        script.type = "application/inert-" + script.type.slice("application/".length);
                        break;

                    default:
                        break;
                }
            });

            function cleanseAttributes(element) {
                var attributes = getAttributes(element);
                if (attributes && attributes.length) {
                    // because the attributes collection is live it is simpler to queue up the renames
                    var events;
                    for (var i = 0, len = attributes.length; i < len; i++) {
                        var attribute = attributes[i];
                        var name = attribute.name;
                        if ((name[0] === "o" || name[0] === "O") &&
                            (name[1] === "n" || name[1] === "N")) {
                            events = events || [];
                            events.push({ name: attribute.name, value: attribute.value });
                        }
                    }
                    if (events) {
                        for (var i = 0, len = events.length; i < len; i++) {
                            var attribute = events[i];
                            removeAttribute(element, attribute.name);
                            setAttribute(element, "x-" + attribute.name, attribute.value);
                        }
                    }
                }
                var children = childNodes(element);
                for (var i = 0, len = children.length; i < len; i++) {
                    cleanseAttributes(children[i]);
                }
            }
            cleanseAttributes(cleaner.documentElement);

            var cleanedNodes = [];

            if (targetElement.tagName === 'HTML') {
                cleanedNodes = Array.prototype.slice.call(document.adoptNode(cleaner.documentElement).childNodes);
            } else {
                if (cleaner.head) {
                    cleanedNodes = cleanedNodes.concat(Array.prototype.slice.call(document.adoptNode(cleaner.head).childNodes));
                }
                if (cleaner.body) {
                    cleanedNodes = cleanedNodes.concat(Array.prototype.slice.call(document.adoptNode(cleaner.body).childNodes));
                }
            }

            return cleanedNodes;
        }

        function cleansePropertySetter(property, setter) {
            var propertyDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, property);
            var originalSetter = propertyDescriptor.set;
            Object.defineProperty(HTMLElement.prototype, property, {
                get: propertyDescriptor.get,
                set: function (value) {
                    if(window.WinJS && window.WinJS._execUnsafe && inUnsafeMode()) {
                        originalSetter.call(this, value);
                    } else {
                        var that = this;
                        var nodes = cleanse(value, that);
                        MSApp.execUnsafeLocalFunction(function () {
                            setter(propertyDescriptor, that, nodes);
                        });
                    }
                },
                enumerable: propertyDescriptor.enumerable,
                configurable: propertyDescriptor.configurable,
            });
        }
        cleansePropertySetter("innerHTML", function (propertyDescriptor, target, elements) {
            empty(target);
            for (var i = 0, len = elements.length; i < len; i++) {
                target.appendChild(elements[i]);
            }
        });
        cleansePropertySetter("outerHTML", function (propertyDescriptor, target, elements) {
            for (var i = 0, len = elements.length; i < len; i++) {
                target.insertAdjacentElement("afterend", elements[i]);
            }
            target.parentNode.removeChild(target);
        });

    }

}());
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();
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

/*! Hammer.JS - v1.1.3 - 2014-05-20
 * http://eightmedia.github.io/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
  'use strict';

/**
 * @main
 * @module hammer
 *
 * @class Hammer
 * @static
 */

/**
 * Hammer, use this to create instances
 * ````
 * var hammertime = new Hammer(myElement);
 * ````
 *
 * @method Hammer
 * @param {HTMLElement} element
 * @param {Object} [options={}]
 * @return {Hammer.Instance}
 */
var Hammer = function Hammer(element, options) {
    return new Hammer.Instance(element, options || {});
};

/**
 * version, as defined in package.json
 * the value will be set at each build
 * @property VERSION
 * @final
 * @type {String}
 */
Hammer.VERSION = '1.1.3';

/**
 * default settings.
 * more settings are defined per gesture at `/gestures`. Each gesture can be disabled/enabled
 * by setting it's name (like `swipe`) to false.
 * You can set the defaults for all instances by changing this object before creating an instance.
 * @example
 * ````
 *  Hammer.defaults.drag = false;
 *  Hammer.defaults.behavior.touchAction = 'pan-y';
 *  delete Hammer.defaults.behavior.userSelect;
 * ````
 * @property defaults
 * @type {Object}
 */
Hammer.defaults = {
    /**
     * this setting object adds styles and attributes to the element to prevent the browser from doing
     * its native behavior. The css properties are auto prefixed for the browsers when needed.
     * @property defaults.behavior
     * @type {Object}
     */
    behavior: {
        /**
         * Disables text selection to improve the dragging gesture. When the value is `none` it also sets
         * `onselectstart=false` for IE on the element. Mainly for desktop browsers.
         * @property defaults.behavior.userSelect
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Specifies whether and how a given region can be manipulated by the user (for instance, by panning or zooming).
         * Used by Chrome 35> and IE10>. By default this makes the element blocking any touch event.
         * @property defaults.behavior.touchAction
         * @type {String}
         * @default: 'pan-y'
         */
        touchAction: 'pan-y',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @property defaults.behavior.touchCallout
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @property defaults.behavior.contentZooming
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents.
         * Mainly for desktop browsers.
         * @property defaults.behavior.userDrag
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in Safari on iPhone. This property obeys the alpha value, if specified.
         *
         * If you don't specify an alpha value, Safari on iPhone applies a default alpha value
         * to the color. To disable tap highlighting, set the alpha value to 0 (invisible).
         * If you set the alpha value to 1.0 (opaque), the element is not visible when tapped.
         * @property defaults.behavior.tapHighlightColor
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

/**
 * hammer document where the base events are added at
 * @property DOCUMENT
 * @type {HTMLElement}
 * @default window.document
 */
Hammer.DOCUMENT = document;

/**
 * detect support for pointer events
 * @property HAS_POINTEREVENTS
 * @type {Boolean}
 */
Hammer.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled;

/**
 * detect support for touch events
 * @property HAS_TOUCHEVENTS
 * @type {Boolean}
 */
Hammer.HAS_TOUCHEVENTS = ('ontouchstart' in window);

/**
 * detect mobile browsers
 * @property IS_MOBILE
 * @type {Boolean}
 */
Hammer.IS_MOBILE = /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);

/**
 * detect if we want to support mouseevents at all
 * @property NO_MOUSEEVENTS
 * @type {Boolean}
 */
Hammer.NO_MOUSEEVENTS = (Hammer.HAS_TOUCHEVENTS && Hammer.IS_MOBILE) || Hammer.HAS_POINTEREVENTS;

/**
 * interval in which Hammer recalculates current velocity/direction/angle in ms
 * @property CALCULATE_INTERVAL
 * @type {Number}
 * @default 25
 */
Hammer.CALCULATE_INTERVAL = 25;

/**
 * eventtypes per touchevent (start, move, end) are filled by `Event.determineEventTypes` on `setup`
 * the object contains the DOM event names per type (`EVENT_START`, `EVENT_MOVE`, `EVENT_END`)
 * @property EVENT_TYPES
 * @private
 * @writeOnce
 * @type {Object}
 */
var EVENT_TYPES = {};

/**
 * direction strings, for safe comparisons
 * @property DIRECTION_DOWN|LEFT|UP|RIGHT
 * @final
 * @type {String}
 * @default 'down' 'left' 'up' 'right'
 */
var DIRECTION_DOWN = Hammer.DIRECTION_DOWN = 'down';
var DIRECTION_LEFT = Hammer.DIRECTION_LEFT = 'left';
var DIRECTION_UP = Hammer.DIRECTION_UP = 'up';
var DIRECTION_RIGHT = Hammer.DIRECTION_RIGHT = 'right';

/**
 * pointertype strings, for safe comparisons
 * @property POINTER_MOUSE|TOUCH|PEN
 * @final
 * @type {String}
 * @default 'mouse' 'touch' 'pen'
 */
var POINTER_MOUSE = Hammer.POINTER_MOUSE = 'mouse';
var POINTER_TOUCH = Hammer.POINTER_TOUCH = 'touch';
var POINTER_PEN = Hammer.POINTER_PEN = 'pen';

/**
 * eventtypes
 * @property EVENT_START|MOVE|END|RELEASE|TOUCH
 * @final
 * @type {String}
 * @default 'start' 'change' 'move' 'end' 'release' 'touch'
 */
var EVENT_START = Hammer.EVENT_START = 'start';
var EVENT_MOVE = Hammer.EVENT_MOVE = 'move';
var EVENT_END = Hammer.EVENT_END = 'end';
var EVENT_RELEASE = Hammer.EVENT_RELEASE = 'release';
var EVENT_TOUCH = Hammer.EVENT_TOUCH = 'touch';

/**
 * if the window events are set...
 * @property READY
 * @writeOnce
 * @type {Boolean}
 * @default false
 */
Hammer.READY = false;

/**
 * plugins namespace
 * @property plugins
 * @type {Object}
 */
Hammer.plugins = Hammer.plugins || {};

/**
 * gestures namespace
 * see `/gestures` for the definitions
 * @property gestures
 * @type {Object}
 */
Hammer.gestures = Hammer.gestures || {};

/**
 * setup events to detect gestures on the document
 * this function is called when creating an new instance
 * @private
 */
function setup() {
    if(Hammer.READY) {
        return;
    }

    // find what eventtypes we add listeners to
    Event.determineEventTypes();

    // Register all gestures inside Hammer.gestures
    Utils.each(Hammer.gestures, function(gesture) {
        Detection.register(gesture);
    });

    // Add touch events on the document
    Event.onTouch(Hammer.DOCUMENT, EVENT_MOVE, Detection.detect);
    Event.onTouch(Hammer.DOCUMENT, EVENT_END, Detection.detect);

    // Hammer is ready...!
    Hammer.READY = true;
}

/**
 * @module hammer
 *
 * @class Utils
 * @static
 */
var Utils = Hammer.utils = {
    /**
     * extend method, could also be used for cloning when `dest` is an empty object.
     * changes the dest object
     * @method extend
     * @param {Object} dest
     * @param {Object} src
     * @param {Boolean} [merge=false]  do a merge
     * @return {Object} dest
     */
    extend: function extend(dest, src, merge) {
        for(var key in src) {
            if(!src.hasOwnProperty(key) || (dest[key] !== undefined && merge)) {
                continue;
            }
            dest[key] = src[key];
        }
        return dest;
    },

    /**
     * simple addEventListener wrapper
     * @method on
     * @param {HTMLElement} element
     * @param {String} type
     * @param {Function} handler
     */
    on: function on(element, type, handler) {
        element.addEventListener(type, handler, false);
    },

    /**
     * simple removeEventListener wrapper
     * @method off
     * @param {HTMLElement} element
     * @param {String} type
     * @param {Function} handler
     */
    off: function off(element, type, handler) {
        element.removeEventListener(type, handler, false);
    },

    /**
     * forEach over arrays and objects
     * @method each
     * @param {Object|Array} obj
     * @param {Function} iterator
     * @param {any} iterator.item
     * @param {Number} iterator.index
     * @param {Object|Array} iterator.obj the source object
     * @param {Object} context value to use as `this` in the iterator
     */
    each: function each(obj, iterator, context) {
        var i, len;

        // native forEach on arrays
        if('forEach' in obj) {
            obj.forEach(iterator, context);
        // arrays
        } else if(obj.length !== undefined) {
            for(i = 0, len = obj.length; i < len; i++) {
                if(iterator.call(context, obj[i], i, obj) === false) {
                    return;
                }
            }
        // objects
        } else {
            for(i in obj) {
                if(obj.hasOwnProperty(i) &&
                    iterator.call(context, obj[i], i, obj) === false) {
                    return;
                }
            }
        }
    },

    /**
     * find if a string contains the string using indexOf
     * @method inStr
     * @param {String} src
     * @param {String} find
     * @return {Boolean} found
     */
    inStr: function inStr(src, find) {
        return src.indexOf(find) > -1;
    },

    /**
     * find if a array contains the object using indexOf or a simple polyfill
     * @method inArray
     * @param {String} src
     * @param {String} find
     * @return {Boolean|Number} false when not found, or the index
     */
    inArray: function inArray(src, find) {
        if(src.indexOf) {
            var index = src.indexOf(find);
            return (index === -1) ? false : index;
        } else {
            for(var i = 0, len = src.length; i < len; i++) {
                if(src[i] === find) {
                    return i;
                }
            }
            return false;
        }
    },

    /**
     * convert an array-like object (`arguments`, `touchlist`) to an array
     * @method toArray
     * @param {Object} obj
     * @return {Array}
     */
    toArray: function toArray(obj) {
        return Array.prototype.slice.call(obj, 0);
    },

    /**
     * find if a node is in the given parent
     * @method hasParent
     * @param {HTMLElement} node
     * @param {HTMLElement} parent
     * @return {Boolean} found
     */
    hasParent: function hasParent(node, parent) {
        while(node) {
            if(node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    },

    /**
     * get the center of all the touches
     * @method getCenter
     * @param {Array} touches
     * @return {Object} center contains `pageX`, `pageY`, `clientX` and `clientY` properties
     */
    getCenter: function getCenter(touches) {
        var pageX = [],
            pageY = [],
            clientX = [],
            clientY = [],
            min = Math.min,
            max = Math.max;

        // no need to loop when only one touch
        if(touches.length === 1) {
            return {
                pageX: touches[0].pageX,
                pageY: touches[0].pageY,
                clientX: touches[0].clientX,
                clientY: touches[0].clientY
            };
        }

        Utils.each(touches, function(touch) {
            pageX.push(touch.pageX);
            pageY.push(touch.pageY);
            clientX.push(touch.clientX);
            clientY.push(touch.clientY);
        });

        return {
            pageX: (min.apply(Math, pageX) + max.apply(Math, pageX)) / 2,
            pageY: (min.apply(Math, pageY) + max.apply(Math, pageY)) / 2,
            clientX: (min.apply(Math, clientX) + max.apply(Math, clientX)) / 2,
            clientY: (min.apply(Math, clientY) + max.apply(Math, clientY)) / 2
        };
    },

    /**
     * calculate the velocity between two points. unit is in px per ms.
     * @method getVelocity
     * @param {Number} deltaTime
     * @param {Number} deltaX
     * @param {Number} deltaY
     * @return {Object} velocity `x` and `y`
     */
    getVelocity: function getVelocity(deltaTime, deltaX, deltaY) {
        return {
            x: Math.abs(deltaX / deltaTime) || 0,
            y: Math.abs(deltaY / deltaTime) || 0
        };
    },

    /**
     * calculate the angle between two coordinates
     * @method getAngle
     * @param {Touch} touch1
     * @param {Touch} touch2
     * @return {Number} angle
     */
    getAngle: function getAngle(touch1, touch2) {
        var x = touch2.clientX - touch1.clientX,
            y = touch2.clientY - touch1.clientY;

        return Math.atan2(y, x) * 180 / Math.PI;
    },

    /**
     * do a small comparision to get the direction between two touches.
     * @method getDirection
     * @param {Touch} touch1
     * @param {Touch} touch2
     * @return {String} direction matches `DIRECTION_LEFT|RIGHT|UP|DOWN`
     */
    getDirection: function getDirection(touch1, touch2) {
        var x = Math.abs(touch1.clientX - touch2.clientX),
            y = Math.abs(touch1.clientY - touch2.clientY);

        if(x >= y) {
            return touch1.clientX - touch2.clientX > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        }
        return touch1.clientY - touch2.clientY > 0 ? DIRECTION_UP : DIRECTION_DOWN;
    },

    /**
     * calculate the distance between two touches
     * @method getDistance
     * @param {Touch}touch1
     * @param {Touch} touch2
     * @return {Number} distance
     */
    getDistance: function getDistance(touch1, touch2) {
        var x = touch2.clientX - touch1.clientX,
            y = touch2.clientY - touch1.clientY;

        return Math.sqrt((x * x) + (y * y));
    },

    /**
     * calculate the scale factor between two touchLists
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @method getScale
     * @param {Array} start array of touches
     * @param {Array} end array of touches
     * @return {Number} scale
     */
    getScale: function getScale(start, end) {
        // need two fingers...
        if(start.length >= 2 && end.length >= 2) {
            return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]);
        }
        return 1;
    },

    /**
     * calculate the rotation degrees between two touchLists
     * @method getRotation
     * @param {Array} start array of touches
     * @param {Array} end array of touches
     * @return {Number} rotation
     */
    getRotation: function getRotation(start, end) {
        // need two fingers
        if(start.length >= 2 && end.length >= 2) {
            return this.getAngle(end[1], end[0]) - this.getAngle(start[1], start[0]);
        }
        return 0;
    },

    /**
     * find out if the direction is vertical   *
     * @method isVertical
     * @param {String} direction matches `DIRECTION_UP|DOWN`
     * @return {Boolean} is_vertical
     */
    isVertical: function isVertical(direction) {
        return direction == DIRECTION_UP || direction == DIRECTION_DOWN;
    },

    /**
     * set css properties with their prefixes
     * @param {HTMLElement} element
     * @param {String} prop
     * @param {String} value
     * @param {Boolean} [toggle=true]
     * @return {Boolean}
     */
    setPrefixedCss: function setPrefixedCss(element, prop, value, toggle) {
        var prefixes = ['', 'Webkit', 'Moz', 'O', 'ms'];
        prop = Utils.toCamelCase(prop);

        for(var i = 0; i < prefixes.length; i++) {
            var p = prop;
            // prefixes
            if(prefixes[i]) {
                p = prefixes[i] + p.slice(0, 1).toUpperCase() + p.slice(1);
            }

            // test the style
            if(p in element.style) {
                element.style[p] = (toggle == null || toggle) && value || '';
                break;
            }
        }
    },

    /**
     * toggle browser default behavior by setting css properties.
     * `userSelect='none'` also sets `element.onselectstart` to false
     * `userDrag='none'` also sets `element.ondragstart` to false
     *
     * @method toggleBehavior
     * @param {HtmlElement} element
     * @param {Object} props
     * @param {Boolean} [toggle=true]
     */
    toggleBehavior: function toggleBehavior(element, props, toggle) {
        if(!props || !element || !element.style) {
            return;
        }

        // set the css properties
        Utils.each(props, function(value, prop) {
            Utils.setPrefixedCss(element, prop, value, toggle);
        });

        var falseFn = toggle && function() {
            return false;
        };

        // also the disable onselectstart
        if(props.userSelect == 'none') {
            element.onselectstart = falseFn;
        }
        // and disable ondragstart
        if(props.userDrag == 'none') {
            element.ondragstart = falseFn;
        }
    },

    /**
     * convert a string with underscores to camelCase
     * so prevent_default becomes preventDefault
     * @param {String} str
     * @return {String} camelCaseStr
     */
    toCamelCase: function toCamelCase(str) {
        return str.replace(/[_-]([a-z])/g, function(s) {
            return s[1].toUpperCase();
        });
    }
};


/**
 * @module hammer
 */
/**
 * @class Event
 * @static
 */
var Event = Hammer.event = {
    /**
     * when touch events have been fired, this is true
     * this is used to stop mouse events
     * @property prevent_mouseevents
     * @private
     * @type {Boolean}
     */
    preventMouseEvents: false,

    /**
     * if EVENT_START has been fired
     * @property started
     * @private
     * @type {Boolean}
     */
    started: false,

    /**
     * when the mouse is hold down, this is true
     * @property should_detect
     * @private
     * @type {Boolean}
     */
    shouldDetect: false,

    /**
     * simple event binder with a hook and support for multiple types
     * @method on
     * @param {HTMLElement} element
     * @param {String} type
     * @param {Function} handler
     * @param {Function} [hook]
     * @param {Object} hook.type
     */
    on: function on(element, type, handler, hook) {
        var types = type.split(' ');
        Utils.each(types, function(type) {
            Utils.on(element, type, handler);
            hook && hook(type);
        });
    },

    /**
     * simple event unbinder with a hook and support for multiple types
     * @method off
     * @param {HTMLElement} element
     * @param {String} type
     * @param {Function} handler
     * @param {Function} [hook]
     * @param {Object} hook.type
     */
    off: function off(element, type, handler, hook) {
        var types = type.split(' ');
        Utils.each(types, function(type) {
            Utils.off(element, type, handler);
            hook && hook(type);
        });
    },

    /**
     * the core touch event handler.
     * this finds out if we should to detect gestures
     * @method onTouch
     * @param {HTMLElement} element
     * @param {String} eventType matches `EVENT_START|MOVE|END`
     * @param {Function} handler
     * @return onTouchHandler {Function} the core event handler
     */
    onTouch: function onTouch(element, eventType, handler) {
        var self = this;

        var onTouchHandler = function onTouchHandler(ev) {
            var srcType = ev.type.toLowerCase(),
                isPointer = Hammer.HAS_POINTEREVENTS,
                isMouse = Utils.inStr(srcType, 'mouse'),
                triggerType;

            // if we are in a mouseevent, but there has been a touchevent triggered in this session
            // we want to do nothing. simply break out of the event.
            if(isMouse && self.preventMouseEvents) {
                return;

            // mousebutton must be down
            } else if(isMouse && eventType == EVENT_START && ev.button === 0) {
                self.preventMouseEvents = false;
                self.shouldDetect = true;
            } else if(isPointer && eventType == EVENT_START) {
                self.shouldDetect = (ev.buttons === 1 || PointerEvent.matchType(POINTER_TOUCH, ev));
            // just a valid start event, but no mouse
            } else if(!isMouse && eventType == EVENT_START) {
                self.preventMouseEvents = true;
                self.shouldDetect = true;
            }

            // update the pointer event before entering the detection
            if(isPointer && eventType != EVENT_END) {
                PointerEvent.updatePointer(eventType, ev);
            }

            // we are in a touch/down state, so allowed detection of gestures
            if(self.shouldDetect) {
                triggerType = self.doDetect.call(self, ev, eventType, element, handler);
            }

            // ...and we are done with the detection
            // so reset everything to start each detection totally fresh
            if(triggerType == EVENT_END) {
                self.preventMouseEvents = false;
                self.shouldDetect = false;
                PointerEvent.reset();
            // update the pointerevent object after the detection
            }

            if(isPointer && eventType == EVENT_END) {
                PointerEvent.updatePointer(eventType, ev);
            }
        };

        this.on(element, EVENT_TYPES[eventType], onTouchHandler);
        return onTouchHandler;
    },

    /**
     * the core detection method
     * this finds out what hammer-touch-events to trigger
     * @method doDetect
     * @param {Object} ev
     * @param {String} eventType matches `EVENT_START|MOVE|END`
     * @param {HTMLElement} element
     * @param {Function} handler
     * @return {String} triggerType matches `EVENT_START|MOVE|END`
     */
    doDetect: function doDetect(ev, eventType, element, handler) {
        var touchList = this.getTouchList(ev, eventType);
        var touchListLength = touchList.length;
        var triggerType = eventType;
        var triggerChange = touchList.trigger; // used by fakeMultitouch plugin
        var changedLength = touchListLength;

        // at each touchstart-like event we want also want to trigger a TOUCH event...
        if(eventType == EVENT_START) {
            triggerChange = EVENT_TOUCH;
        // ...the same for a touchend-like event
        } else if(eventType == EVENT_END) {
            triggerChange = EVENT_RELEASE;

            // keep track of how many touches have been removed
            changedLength = touchList.length - ((ev.changedTouches) ? ev.changedTouches.length : 1);
        }

        // after there are still touches on the screen,
        // we just want to trigger a MOVE event. so change the START or END to a MOVE
        // but only after detection has been started, the first time we actualy want a START
        if(changedLength > 0 && this.started) {
            triggerType = EVENT_MOVE;
        }

        // detection has been started, we keep track of this, see above
        this.started = true;

        // generate some event data, some basic information
        var evData = this.collectEventData(element, triggerType, touchList, ev);

        // trigger the triggerType event before the change (TOUCH, RELEASE) events
        // but the END event should be at last
        if(eventType != EVENT_END) {
            handler.call(Detection, evData);
        }

        // trigger a change (TOUCH, RELEASE) event, this means the length of the touches changed
        if(triggerChange) {
            evData.changedLength = changedLength;
            evData.eventType = triggerChange;

            handler.call(Detection, evData);

            evData.eventType = triggerType;
            delete evData.changedLength;
        }

        // trigger the END event
        if(triggerType == EVENT_END) {
            handler.call(Detection, evData);

            // ...and we are done with the detection
            // so reset everything to start each detection totally fresh
            this.started = false;
        }

        return triggerType;
    },

    /**
     * we have different events for each device/browser
     * determine what we need and set them in the EVENT_TYPES constant
     * the `onTouch` method is bind to these properties.
     * @method determineEventTypes
     * @return {Object} events
     */
    determineEventTypes: function determineEventTypes() {
        var types;
        if(Hammer.HAS_POINTEREVENTS) {
            if(window.PointerEvent) {
                types = [
                    'pointerdown',
                    'pointermove',
                    'pointerup pointercancel lostpointercapture'
                ];
            } else {
                types = [
                    'MSPointerDown',
                    'MSPointerMove',
                    'MSPointerUp MSPointerCancel MSLostPointerCapture'
                ];
            }
        } else if(Hammer.NO_MOUSEEVENTS) {
            types = [
                'touchstart',
                'touchmove',
                'touchend touchcancel'
            ];
        } else {
            types = [
                'touchstart mousedown',
                'touchmove mousemove',
                'touchend touchcancel mouseup'
            ];
        }

        EVENT_TYPES[EVENT_START] = types[0];
        EVENT_TYPES[EVENT_MOVE] = types[1];
        EVENT_TYPES[EVENT_END] = types[2];
        return EVENT_TYPES;
    },

    /**
     * create touchList depending on the event
     * @method getTouchList
     * @param {Object} ev
     * @param {String} eventType
     * @return {Array} touches
     */
    getTouchList: function getTouchList(ev, eventType) {
        // get the fake pointerEvent touchlist
        if(Hammer.HAS_POINTEREVENTS) {
            return PointerEvent.getTouchList();
        }

        // get the touchlist
        if(ev.touches) {
            if(eventType == EVENT_MOVE) {
                return ev.touches;
            }

            var identifiers = [];
            var concat = [].concat(Utils.toArray(ev.touches), Utils.toArray(ev.changedTouches));
            var touchList = [];

            Utils.each(concat, function(touch) {
                if(Utils.inArray(identifiers, touch.identifier) === false) {
                    touchList.push(touch);
                }
                identifiers.push(touch.identifier);
            });

            return touchList;
        }

        // make fake touchList from mouse position
        ev.identifier = 1;
        return [ev];
    },

    /**
     * collect basic event data
     * @method collectEventData
     * @param {HTMLElement} element
     * @param {String} eventType matches `EVENT_START|MOVE|END`
     * @param {Array} touches
     * @param {Object} ev
     * @return {Object} ev
     */
    collectEventData: function collectEventData(element, eventType, touches, ev) {
        // find out pointerType
        var pointerType = POINTER_TOUCH;
        if(Utils.inStr(ev.type, 'mouse') || PointerEvent.matchType(POINTER_MOUSE, ev)) {
            pointerType = POINTER_MOUSE;
        } else if(PointerEvent.matchType(POINTER_PEN, ev)) {
            pointerType = POINTER_PEN;
        }

        return {
            center: Utils.getCenter(touches),
            timeStamp: Date.now(),
            target: ev.target,
            touches: touches,
            eventType: eventType,
            pointerType: pointerType,
            srcEvent: ev,

            /**
             * prevent the browser default actions
             * mostly used to disable scrolling of the browser
             */
            preventDefault: function() {
                var srcEvent = this.srcEvent;
                srcEvent.preventManipulation && srcEvent.preventManipulation();
                srcEvent.preventDefault && srcEvent.preventDefault();
            },

            /**
             * stop bubbling the event up to its parents
             */
            stopPropagation: function() {
                this.srcEvent.stopPropagation();
            },

            /**
             * immediately stop gesture detection
             * might be useful after a swipe was detected
             * @return {*}
             */
            stopDetect: function() {
                return Detection.stopDetect();
            }
        };
    }
};


/**
 * @module hammer
 *
 * @class PointerEvent
 * @static
 */
var PointerEvent = Hammer.PointerEvent = {
    /**
     * holds all pointers, by `identifier`
     * @property pointers
     * @type {Object}
     */
    pointers: {},

    /**
     * get the pointers as an array
     * @method getTouchList
     * @return {Array} touchlist
     */
    getTouchList: function getTouchList() {
        var touchlist = [];
        // we can use forEach since pointerEvents only is in IE10
        Utils.each(this.pointers, function(pointer) {
            touchlist.push(pointer);
        });
        return touchlist;
    },

    /**
     * update the position of a pointer
     * @method updatePointer
     * @param {String} eventType matches `EVENT_START|MOVE|END`
     * @param {Object} pointerEvent
     */
    updatePointer: function updatePointer(eventType, pointerEvent) {
        if(eventType == EVENT_END || (eventType != EVENT_END && pointerEvent.buttons !== 1)) {
            delete this.pointers[pointerEvent.pointerId];
        } else {
            pointerEvent.identifier = pointerEvent.pointerId;
            this.pointers[pointerEvent.pointerId] = pointerEvent;
        }
    },

    /**
     * check if ev matches pointertype
     * @method matchType
     * @param {String} pointerType matches `POINTER_MOUSE|TOUCH|PEN`
     * @param {PointerEvent} ev
     */
    matchType: function matchType(pointerType, ev) {
        if(!ev.pointerType) {
            return false;
        }

        var pt = ev.pointerType,
            types = {};

        types[POINTER_MOUSE] = (pt === (ev.MSPOINTER_TYPE_MOUSE || POINTER_MOUSE));
        types[POINTER_TOUCH] = (pt === (ev.MSPOINTER_TYPE_TOUCH || POINTER_TOUCH));
        types[POINTER_PEN] = (pt === (ev.MSPOINTER_TYPE_PEN || POINTER_PEN));
        return types[pointerType];
    },

    /**
     * reset the stored pointers
     * @method reset
     */
    reset: function resetList() {
        this.pointers = {};
    }
};


/**
 * @module hammer
 *
 * @class Detection
 * @static
 */
var Detection = Hammer.detection = {
    // contains all registred Hammer.gestures in the correct order
    gestures: [],

    // data of the current Hammer.gesture detection session
    current: null,

    // the previous Hammer.gesture session data
    // is a full clone of the previous gesture.current object
    previous: null,

    // when this becomes true, no gestures are fired
    stopped: false,

    /**
     * start Hammer.gesture detection
     * @method startDetect
     * @param {Hammer.Instance} inst
     * @param {Object} eventData
     */
    startDetect: function startDetect(inst, eventData) {
        // already busy with a Hammer.gesture detection on an element
        if(this.current) {
            return;
        }

        this.stopped = false;

        // holds current session
        this.current = {
            inst: inst, // reference to HammerInstance we're working for
            startEvent: Utils.extend({}, eventData), // start eventData for distances, timing etc
            lastEvent: false, // last eventData
            lastCalcEvent: false, // last eventData for calculations.
            futureCalcEvent: false, // last eventData for calculations.
            lastCalcData: {}, // last lastCalcData
            name: '' // current gesture we're in/detected, can be 'tap', 'hold' etc
        };

        this.detect(eventData);
    },

    /**
     * Hammer.gesture detection
     * @method detect
     * @param {Object} eventData
     * @return {any}
     */
    detect: function detect(eventData) {
        if(!this.current || this.stopped) {
            return;
        }

        // extend event data with calculations about scale, distance etc
        eventData = this.extendEventData(eventData);

        // hammer instance and instance options
        var inst = this.current.inst,
            instOptions = inst.options;

        // call Hammer.gesture handlers
        Utils.each(this.gestures, function triggerGesture(gesture) {
            // only when the instance options have enabled this gesture
            if(!this.stopped && inst.enabled && instOptions[gesture.name]) {
                gesture.handler.call(gesture, eventData, inst);
            }
        }, this);

        // store as previous event event
        if(this.current) {
            this.current.lastEvent = eventData;
        }

        if(eventData.eventType == EVENT_END) {
            this.stopDetect();
        }

        return eventData;
    },

    /**
     * clear the Hammer.gesture vars
     * this is called on endDetect, but can also be used when a final Hammer.gesture has been detected
     * to stop other Hammer.gestures from being fired
     * @method stopDetect
     */
    stopDetect: function stopDetect() {
        // clone current data to the store as the previous gesture
        // used for the double tap gesture, since this is an other gesture detect session
        this.previous = Utils.extend({}, this.current);

        // reset the current
        this.current = null;
        this.stopped = true;
    },

    /**
     * calculate velocity, angle and direction
     * @method getVelocityData
     * @param {Object} ev
     * @param {Object} center
     * @param {Number} deltaTime
     * @param {Number} deltaX
     * @param {Number} deltaY
     */
    getCalculatedData: function getCalculatedData(ev, center, deltaTime, deltaX, deltaY) {
        var cur = this.current,
            recalc = false,
            calcEv = cur.lastCalcEvent,
            calcData = cur.lastCalcData;

        if(calcEv && ev.timeStamp - calcEv.timeStamp > Hammer.CALCULATE_INTERVAL) {
            center = calcEv.center;
            deltaTime = ev.timeStamp - calcEv.timeStamp;
            deltaX = ev.center.clientX - calcEv.center.clientX;
            deltaY = ev.center.clientY - calcEv.center.clientY;
            recalc = true;
        }

        if(ev.eventType == EVENT_TOUCH || ev.eventType == EVENT_RELEASE) {
            cur.futureCalcEvent = ev;
        }

        if(!cur.lastCalcEvent || recalc) {
            calcData.velocity = Utils.getVelocity(deltaTime, deltaX, deltaY);
            calcData.angle = Utils.getAngle(center, ev.center);
            calcData.direction = Utils.getDirection(center, ev.center);

            cur.lastCalcEvent = cur.futureCalcEvent || ev;
            cur.futureCalcEvent = ev;
        }

        ev.velocityX = calcData.velocity.x;
        ev.velocityY = calcData.velocity.y;
        ev.interimAngle = calcData.angle;
        ev.interimDirection = calcData.direction;
    },

    /**
     * extend eventData for Hammer.gestures
     * @method extendEventData
     * @param {Object} ev
     * @return {Object} ev
     */
    extendEventData: function extendEventData(ev) {
        var cur = this.current,
            startEv = cur.startEvent,
            lastEv = cur.lastEvent || startEv;

        // update the start touchlist to calculate the scale/rotation
        if(ev.eventType == EVENT_TOUCH || ev.eventType == EVENT_RELEASE) {
            startEv.touches = [];
            Utils.each(ev.touches, function(touch) {
                startEv.touches.push({
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
            });
        }

        var deltaTime = ev.timeStamp - startEv.timeStamp,
            deltaX = ev.center.clientX - startEv.center.clientX,
            deltaY = ev.center.clientY - startEv.center.clientY;

        this.getCalculatedData(ev, lastEv.center, deltaTime, deltaX, deltaY);

        Utils.extend(ev, {
            startEvent: startEv,

            deltaTime: deltaTime,
            deltaX: deltaX,
            deltaY: deltaY,

            distance: Utils.getDistance(startEv.center, ev.center),
            angle: Utils.getAngle(startEv.center, ev.center),
            direction: Utils.getDirection(startEv.center, ev.center),
            scale: Utils.getScale(startEv.touches, ev.touches),
            rotation: Utils.getRotation(startEv.touches, ev.touches)
        });

        return ev;
    },

    /**
     * register new gesture
     * @method register
     * @param {Object} gesture object, see `gestures/` for documentation
     * @return {Array} gestures
     */
    register: function register(gesture) {
        // add an enable gesture options if there is no given
        var options = gesture.defaults || {};
        if(options[gesture.name] === undefined) {
            options[gesture.name] = true;
        }

        // extend Hammer default options with the Hammer.gesture options
        Utils.extend(Hammer.defaults, options, true);

        // set its index
        gesture.index = gesture.index || 1000;

        // add Hammer.gesture to the list
        this.gestures.push(gesture);

        // sort the list by index
        this.gestures.sort(function(a, b) {
            if(a.index < b.index) {
                return -1;
            }
            if(a.index > b.index) {
                return 1;
            }
            return 0;
        });

        return this.gestures;
    }
};


/**
 * @module hammer
 */

/**
 * create new hammer instance
 * all methods should return the instance itself, so it is chainable.
 *
 * @class Instance
 * @constructor
 * @param {HTMLElement} element
 * @param {Object} [options={}] options are merged with `Hammer.defaults`
 * @return {Hammer.Instance}
 */
Hammer.Instance = function(element, options) {
    var self = this;

    // setup HammerJS window events and register all gestures
    // this also sets up the default options
    setup();

    /**
     * @property element
     * @type {HTMLElement}
     */
    this.element = element;

    /**
     * @property enabled
     * @type {Boolean}
     * @protected
     */
    this.enabled = true;

    /**
     * options, merged with the defaults
     * options with an _ are converted to camelCase
     * @property options
     * @type {Object}
     */
    Utils.each(options, function(value, name) {
        delete options[name];
        options[Utils.toCamelCase(name)] = value;
    });

    this.options = Utils.extend(Utils.extend({}, Hammer.defaults), options || {});

    // add some css to the element to prevent the browser from doing its native behavoir
    if(this.options.behavior) {
        Utils.toggleBehavior(this.element, this.options.behavior, true);
    }

    /**
     * event start handler on the element to start the detection
     * @property eventStartHandler
     * @type {Object}
     */
    this.eventStartHandler = Event.onTouch(element, EVENT_START, function(ev) {
        if(self.enabled && ev.eventType == EVENT_START) {
            Detection.startDetect(self, ev);
        } else if(ev.eventType == EVENT_TOUCH) {
            Detection.detect(ev);
        }
    });

    /**
     * keep a list of user event handlers which needs to be removed when calling 'dispose'
     * @property eventHandlers
     * @type {Array}
     */
    this.eventHandlers = [];
};

Hammer.Instance.prototype = {
    /**
     * bind events to the instance
     * @method on
     * @chainable
     * @param {String} gestures multiple gestures by splitting with a space
     * @param {Function} handler
     * @param {Object} handler.ev event object
     */
    on: function onEvent(gestures, handler) {
        var self = this;
        Event.on(self.element, gestures, handler, function(type) {
            self.eventHandlers.push({ gesture: type, handler: handler });
        });
        return self;
    },

    /**
     * unbind events to the instance
     * @method off
     * @chainable
     * @param {String} gestures
     * @param {Function} handler
     */
    off: function offEvent(gestures, handler) {
        var self = this;

        Event.off(self.element, gestures, handler, function(type) {
            var index = Utils.inArray({ gesture: type, handler: handler });
            if(index !== false) {
                self.eventHandlers.splice(index, 1);
            }
        });
        return self;
    },

    /**
     * trigger gesture event
     * @method trigger
     * @chainable
     * @param {String} gesture
     * @param {Object} [eventData]
     */
    trigger: function triggerEvent(gesture, eventData) {
        // optional
        if(!eventData) {
            eventData = {};
        }

        // create DOM event
        var event = Hammer.DOCUMENT.createEvent('Event');
        event.initEvent(gesture, true, true);
        event.gesture = eventData;

        // trigger on the target if it is in the instance element,
        // this is for event delegation tricks
        var element = this.element;
        if(Utils.hasParent(eventData.target, element)) {
            element = eventData.target;
        }

        element.dispatchEvent(event);
        return this;
    },

    /**
     * enable of disable hammer.js detection
     * @method enable
     * @chainable
     * @param {Boolean} state
     */
    enable: function enable(state) {
        this.enabled = state;
        return this;
    },

    /**
     * dispose this hammer instance
     * @method dispose
     * @return {Null}
     */
    dispose: function dispose() {
        var i, eh;

        // undo all changes made by stop_browser_behavior
        Utils.toggleBehavior(this.element, this.options.behavior, false);

        // unbind all custom event handlers
        for(i = -1; (eh = this.eventHandlers[++i]);) {
            Utils.off(this.element, eh.gesture, eh.handler);
        }

        this.eventHandlers = [];

        // unbind the start event listener
        Event.off(this.element, EVENT_TYPES[EVENT_START], this.eventStartHandler);

        return null;
    }
};


/**
 * @module gestures
 */
/**
 * Move with x fingers (default 1) around on the page.
 * Preventing the default browser behavior is a good way to improve feel and working.
 * ````
 *  hammertime.on("drag", function(ev) {
 *    console.log(ev);
 *    ev.gesture.preventDefault();
 *  });
 * ````
 *
 * @class Drag
 * @static
 */
/**
 * @event drag
 * @param {Object} ev
 */
/**
 * @event dragstart
 * @param {Object} ev
 */
/**
 * @event dragend
 * @param {Object} ev
 */
/**
 * @event drapleft
 * @param {Object} ev
 */
/**
 * @event dragright
 * @param {Object} ev
 */
/**
 * @event dragup
 * @param {Object} ev
 */
/**
 * @event dragdown
 * @param {Object} ev
 */

/**
 * @param {String} name
 */
(function(name) {
    var triggered = false;

    function dragGesture(ev, inst) {
        var cur = Detection.current;

        // max touches
        if(inst.options.dragMaxTouches > 0 &&
            ev.touches.length > inst.options.dragMaxTouches) {
            return;
        }

        switch(ev.eventType) {
            case EVENT_START:
                triggered = false;
                break;

            case EVENT_MOVE:
                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(ev.distance < inst.options.dragMinDistance &&
                    cur.name != name) {
                    return;
                }

                var startCenter = cur.startEvent.center;

                // we are dragging!
                if(cur.name != name) {
                    cur.name = name;
                    if(inst.options.dragDistanceCorrection && ev.distance > 0) {
                        // When a drag is triggered, set the event center to dragMinDistance pixels from the original event center.
                        // Without this correction, the dragged distance would jumpstart at dragMinDistance pixels instead of at 0.
                        // It might be useful to save the original start point somewhere
                        var factor = Math.abs(inst.options.dragMinDistance / ev.distance);
                        startCenter.pageX += ev.deltaX * factor;
                        startCenter.pageY += ev.deltaY * factor;
                        startCenter.clientX += ev.deltaX * factor;
                        startCenter.clientY += ev.deltaY * factor;

                        // recalculate event data using new start point
                        ev = Detection.extendEventData(ev);
                    }
                }

                // lock drag to axis?
                if(cur.lastEvent.dragLockToAxis ||
                    ( inst.options.dragLockToAxis &&
                        inst.options.dragLockMinDistance <= ev.distance
                        )) {
                    ev.dragLockToAxis = true;
                }

                // keep direction on the axis that the drag gesture started on
                var lastDirection = cur.lastEvent.direction;
                if(ev.dragLockToAxis && lastDirection !== ev.direction) {
                    if(Utils.isVertical(lastDirection)) {
                        ev.direction = (ev.deltaY < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                    } else {
                        ev.direction = (ev.deltaX < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                    }
                }

                // first time, trigger dragstart event
                if(!triggered) {
                    inst.trigger(name + 'start', ev);
                    triggered = true;
                }

                // trigger events
                inst.trigger(name, ev);
                inst.trigger(name + ev.direction, ev);

                var isVertical = Utils.isVertical(ev.direction);

                // block the browser events
                if((inst.options.dragBlockVertical && isVertical) ||
                    (inst.options.dragBlockHorizontal && !isVertical)) {
                    ev.preventDefault();
                }
                break;

            case EVENT_RELEASE:
                if(triggered && ev.changedLength <= inst.options.dragMaxTouches) {
                    inst.trigger(name + 'end', ev);
                    triggered = false;
                }
                break;

            case EVENT_END:
                triggered = false;
                break;
        }
    }

    Hammer.gestures.Drag = {
        name: name,
        index: 50,
        handler: dragGesture,
        defaults: {
            /**
             * minimal movement that have to be made before the drag event gets triggered
             * @property dragMinDistance
             * @type {Number}
             * @default 10
             */
            dragMinDistance: 10,

            /**
             * Set dragDistanceCorrection to true to make the starting point of the drag
             * be calculated from where the drag was triggered, not from where the touch started.
             * Useful to avoid a jerk-starting drag, which can make fine-adjustments
             * through dragging difficult, and be visually unappealing.
             * @property dragDistanceCorrection
             * @type {Boolean}
             * @default true
             */
            dragDistanceCorrection: true,

            /**
             * set 0 for unlimited, but this can conflict with transform
             * @property dragMaxTouches
             * @type {Number}
             * @default 1
             */
            dragMaxTouches: 1,

            /**
             * prevent default browser behavior when dragging occurs
             * be careful with it, it makes the element a blocking element
             * when you are using the drag gesture, it is a good practice to set this true
             * @property dragBlockHorizontal
             * @type {Boolean}
             * @default false
             */
            dragBlockHorizontal: false,

            /**
             * same as `dragBlockHorizontal`, but for vertical movement
             * @property dragBlockVertical
             * @type {Boolean}
             * @default false
             */
            dragBlockVertical: false,

            /**
             * dragLockToAxis keeps the drag gesture on the axis that it started on,
             * It disallows vertical directions if the initial direction was horizontal, and vice versa.
             * @property dragLockToAxis
             * @type {Boolean}
             * @default false
             */
            dragLockToAxis: false,

            /**
             * drag lock only kicks in when distance > dragLockMinDistance
             * This way, locking occurs only when the distance has become large enough to reliably determine the direction
             * @property dragLockMinDistance
             * @type {Number}
             * @default 25
             */
            dragLockMinDistance: 25
        }
    };
})('drag');

/**
 * @module gestures
 */
/**
 * trigger a simple gesture event, so you can do anything in your handler.
 * only usable if you know what your doing...
 *
 * @class Gesture
 * @static
 */
/**
 * @event gesture
 * @param {Object} ev
 */
Hammer.gestures.Gesture = {
    name: 'gesture',
    index: 1337,
    handler: function releaseGesture(ev, inst) {
        inst.trigger(this.name, ev);
    }
};

/**
 * @module gestures
 */
/**
 * Touch stays at the same place for x time
 *
 * @class Hold
 * @static
 */
/**
 * @event hold
 * @param {Object} ev
 */

/**
 * @param {String} name
 */
(function(name) {
    var timer;

    function holdGesture(ev, inst) {
        var options = inst.options,
            current = Detection.current;

        switch(ev.eventType) {
            case EVENT_START:
                clearTimeout(timer);

                // set the gesture so we can check in the timeout if it still is
                current.name = name;

                // set timer and if after the timeout it still is hold,
                // we trigger the hold event
                timer = setTimeout(function() {
                    if(current && current.name == name) {
                        inst.trigger(name, ev);
                    }
                }, options.holdTimeout);
                break;

            case EVENT_MOVE:
                if(ev.distance > options.holdThreshold) {
                    clearTimeout(timer);
                }
                break;

            case EVENT_RELEASE:
                clearTimeout(timer);
                break;
        }
    }

    Hammer.gestures.Hold = {
        name: name,
        index: 10,
        defaults: {
            /**
             * @property holdTimeout
             * @type {Number}
             * @default 500
             */
            holdTimeout: 500,

            /**
             * movement allowed while holding
             * @property holdThreshold
             * @type {Number}
             * @default 2
             */
            holdThreshold: 2
        },
        handler: holdGesture
    };
})('hold');

/**
 * @module gestures
 */
/**
 * when a touch is being released from the page
 *
 * @class Release
 * @static
 */
/**
 * @event release
 * @param {Object} ev
 */
Hammer.gestures.Release = {
    name: 'release',
    index: Infinity,
    handler: function releaseGesture(ev, inst) {
        if(ev.eventType == EVENT_RELEASE) {
            inst.trigger(this.name, ev);
        }
    }
};

/**
 * @module gestures
 */
/**
 * triggers swipe events when the end velocity is above the threshold
 * for best usage, set `preventDefault` (on the drag gesture) to `true`
 * ````
 *  hammertime.on("dragleft swipeleft", function(ev) {
 *    console.log(ev);
 *    ev.gesture.preventDefault();
 *  });
 * ````
 *
 * @class Swipe
 * @static
 */
/**
 * @event swipe
 * @param {Object} ev
 */
/**
 * @event swipeleft
 * @param {Object} ev
 */
/**
 * @event swiperight
 * @param {Object} ev
 */
/**
 * @event swipeup
 * @param {Object} ev
 */
/**
 * @event swipedown
 * @param {Object} ev
 */
Hammer.gestures.Swipe = {
    name: 'swipe',
    index: 40,
    defaults: {
        /**
         * @property swipeMinTouches
         * @type {Number}
         * @default 1
         */
        swipeMinTouches: 1,

        /**
         * @property swipeMaxTouches
         * @type {Number}
         * @default 1
         */
        swipeMaxTouches: 1,

        /**
         * horizontal swipe velocity
         * @property swipeVelocityX
         * @type {Number}
         * @default 0.6
         */
        swipeVelocityX: 0.6,

        /**
         * vertical swipe velocity
         * @property swipeVelocityY
         * @type {Number}
         * @default 0.6
         */
        swipeVelocityY: 0.6
    },

    handler: function swipeGesture(ev, inst) {
        if(ev.eventType == EVENT_RELEASE) {
            var touches = ev.touches.length,
                options = inst.options;

            // max touches
            if(touches < options.swipeMinTouches ||
                touches > options.swipeMaxTouches) {
                return;
            }

            // when the distance we moved is too small we skip this gesture
            // or we can be already in dragging
            if(ev.velocityX > options.swipeVelocityX ||
                ev.velocityY > options.swipeVelocityY) {
                // trigger swipe events
                inst.trigger(this.name, ev);
                inst.trigger(this.name + ev.direction, ev);
            }
        }
    }
};

/**
 * @module gestures
 */
/**
 * Single tap and a double tap on a place
 *
 * @class Tap
 * @static
 */
/**
 * @event tap
 * @param {Object} ev
 */
/**
 * @event doubletap
 * @param {Object} ev
 */

/**
 * @param {String} name
 */
(function(name) {
    var hasMoved = false;

    function tapGesture(ev, inst) {
        var options = inst.options,
            current = Detection.current,
            prev = Detection.previous,
            sincePrev,
            didDoubleTap;

        switch(ev.eventType) {
            case EVENT_START:
                hasMoved = false;
                break;

            case EVENT_MOVE:
                hasMoved = hasMoved || (ev.distance > options.tapMaxDistance);
                break;

            case EVENT_END:
                if(!Utils.inStr(ev.srcEvent.type, 'cancel') && ev.deltaTime < options.tapMaxTime && !hasMoved) {
                    // previous gesture, for the double tap since these are two different gesture detections
                    sincePrev = prev && prev.lastEvent && ev.timeStamp - prev.lastEvent.timeStamp;
                    didDoubleTap = false;

                    // check if double tap
                    if(prev && prev.name == name &&
                        (sincePrev && sincePrev < options.doubleTapInterval) &&
                        ev.distance < options.doubleTapDistance) {
                        inst.trigger('doubletap', ev);
                        didDoubleTap = true;
                    }

                    // do a single tap
                    if(!didDoubleTap || options.tapAlways) {
                        current.name = name;
                        inst.trigger(current.name, ev);
                    }
                }
                break;
        }
    }

    Hammer.gestures.Tap = {
        name: name,
        index: 100,
        handler: tapGesture,
        defaults: {
            /**
             * max time of a tap, this is for the slow tappers
             * @property tapMaxTime
             * @type {Number}
             * @default 250
             */
            tapMaxTime: 250,

            /**
             * max distance of movement of a tap, this is for the slow tappers
             * @property tapMaxDistance
             * @type {Number}
             * @default 10
             */
            tapMaxDistance: 10,

            /**
             * always trigger the `tap` event, even while double-tapping
             * @property tapAlways
             * @type {Boolean}
             * @default true
             */
            tapAlways: true,

            /**
             * max distance between two taps
             * @property doubleTapDistance
             * @type {Number}
             * @default 20
             */
            doubleTapDistance: 20,

            /**
             * max time between two taps
             * @property doubleTapInterval
             * @type {Number}
             * @default 300
             */
            doubleTapInterval: 300
        }
    };
})('tap');

/**
 * @module gestures
 */
/**
 * when a touch is being touched at the page
 *
 * @class Touch
 * @static
 */
/**
 * @event touch
 * @param {Object} ev
 */
Hammer.gestures.Touch = {
    name: 'touch',
    index: -Infinity,
    defaults: {
        /**
         * call preventDefault at touchstart, and makes the element blocking by disabling the scrolling of the page,
         * but it improves gestures like transforming and dragging.
         * be careful with using this, it can be very annoying for users to be stuck on the page
         * @property preventDefault
         * @type {Boolean}
         * @default false
         */
        preventDefault: false,

        /**
         * disable mouse events, so only touch (or pen!) input triggers events
         * @property preventMouse
         * @type {Boolean}
         * @default false
         */
        preventMouse: false
    },
    handler: function touchGesture(ev, inst) {
        if(inst.options.preventMouse && ev.pointerType == POINTER_MOUSE) {
            ev.stopDetect();
            return;
        }

        if(inst.options.preventDefault) {
            ev.preventDefault();
        }

        if(ev.eventType == EVENT_TOUCH) {
            inst.trigger('touch', ev);
        }
    }
};

/**
 * @module gestures
 */
/**
 * User want to scale or rotate with 2 fingers
 * Preventing the default browser behavior is a good way to improve feel and working. This can be done with the
 * `preventDefault` option.
 *
 * @class Transform
 * @static
 */
/**
 * @event transform
 * @param {Object} ev
 */
/**
 * @event transformstart
 * @param {Object} ev
 */
/**
 * @event transformend
 * @param {Object} ev
 */
/**
 * @event pinchin
 * @param {Object} ev
 */
/**
 * @event pinchout
 * @param {Object} ev
 */
/**
 * @event rotate
 * @param {Object} ev
 */

/**
 * @param {String} name
 */
(function(name) {
    var triggered = false;

    function transformGesture(ev, inst) {
        switch(ev.eventType) {
            case EVENT_START:
                triggered = false;
                break;

            case EVENT_MOVE:
                // at least multitouch
                if(ev.touches.length < 2) {
                    return;
                }

                var scaleThreshold = Math.abs(1 - ev.scale);
                var rotationThreshold = Math.abs(ev.rotation);

                // when the distance we moved is too small we skip this gesture
                // or we can be already in dragging
                if(scaleThreshold < inst.options.transformMinScale &&
                    rotationThreshold < inst.options.transformMinRotation) {
                    return;
                }

                // we are transforming!
                Detection.current.name = name;

                // first time, trigger dragstart event
                if(!triggered) {
                    inst.trigger(name + 'start', ev);
                    triggered = true;
                }

                inst.trigger(name, ev); // basic transform event

                // trigger rotate event
                if(rotationThreshold > inst.options.transformMinRotation) {
                    inst.trigger('rotate', ev);
                }

                // trigger pinch event
                if(scaleThreshold > inst.options.transformMinScale) {
                    inst.trigger('pinch', ev);
                    inst.trigger('pinch' + (ev.scale < 1 ? 'in' : 'out'), ev);
                }
                break;

            case EVENT_RELEASE:
                if(triggered && ev.changedLength < 2) {
                    inst.trigger(name + 'end', ev);
                    triggered = false;
                }
                break;
        }
    }

    Hammer.gestures.Transform = {
        name: name,
        index: 45,
        defaults: {
            /**
             * minimal scale factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
             * @property transformMinScale
             * @type {Number}
             * @default 0.01
             */
            transformMinScale: 0.01,

            /**
             * rotation in degrees
             * @property transformMinRotation
             * @type {Number}
             * @default 1
             */
            transformMinRotation: 1
        },

        handler: transformGesture
    };
})('transform');

/**
 * @module hammer
 */

// AMD export
if(typeof define == 'function' && define.amd) {
    define(function() {
        return Hammer;
    });
// commonjs export
} else if(typeof module !== 'undefined' && module.exports) {
    module.exports = Hammer;
// browser export
} else {
    window.Hammer = Hammer;
}

})(window);
/*! iScroll v5.0.6 ~ (c) 2008-2013 Matteo Spinelli ~ http://cubiq.org/license */
var IScroll = (function (window, document, Math) {
var rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
	function (callback) { window.setTimeout(callback, 1000 / 60); };

var utils = (function () {
	var me = {};

	var _elementStyle = document.createElement('div').style;
	var _vendor = (function () {
		var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			transform,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			transform = vendors[i] + 'ransform';
			if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
		}

		return false;
	})();

	function _prefixStyle (style) {
		if ( _vendor === false ) return false;
		if ( _vendor === '' ) return style;
		return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}

	me.getTime = Date.now || function getTime () { return new Date().getTime(); };

	me.extend = function (target, obj) {
		for ( var i in obj ) {
			target[i] = obj[i];
		}
	};

	me.addEvent = function (el, type, fn, capture) {
		el.addEventListener(type, fn, !!capture);
	};

	me.removeEvent = function (el, type, fn, capture) {
		el.removeEventListener(type, fn, !!capture);
	};

	me.momentum = function (current, start, time, lowerMargin, wrapperSize) {
		var distance = current - start,
			speed = Math.abs(distance) / time,
			destination,
			duration,
			deceleration = 0.0006;

		destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
		duration = speed / deceleration;

		if ( destination < lowerMargin ) {
			destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
			distance = Math.abs(destination - current);
			duration = distance / speed;
		} else if ( destination > 0 ) {
			destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
			distance = Math.abs(current) + destination;
			duration = distance / speed;
		}

		return {
			destination: Math.round(destination),
			duration: duration
		};
	};

	var _transform = _prefixStyle('transform');

	me.extend(me, {
		hasTransform: _transform !== false,
		hasPerspective: _prefixStyle('perspective') in _elementStyle,
		hasTouch: 'ontouchstart' in window,
		hasPointer: navigator.msPointerEnabled,
		hasTransition: _prefixStyle('transition') in _elementStyle
	});

	me.isAndroidBrowser = /Android/.test(window.navigator.appVersion) && /Version\/\d/.test(window.navigator.appVersion);

	me.extend(me.style = {}, {
		transform: _transform,
		transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
		transitionDuration: _prefixStyle('transitionDuration'),
		transformOrigin: _prefixStyle('transformOrigin')
	});

	me.hasClass = function (e, c) {
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
		return re.test(e.className);
	};

	me.addClass = function (e, c) {
		if ( me.hasClass(e, c) ) {
			return;
		}

		var newclass = e.className.split(' ');
		newclass.push(c);
		e.className = newclass.join(' ');
	};

	me.removeClass = function (e, c) {
		if ( !me.hasClass(e, c) ) {
			return;
		}

		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
		e.className = e.className.replace(re, ' ');
	};

	me.offset = function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;

		// jshint -W084
		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}
		// jshint +W084

		return {
			left: left,
			top: top
		};
	};

	me.preventDefaultException = function (el, exceptions) {
		for ( var i in exceptions ) {
			if ( exceptions[i].test(el[i]) ) {
				return true;
			}
		}

		return false;
	};

	me.extend(me.eventType = {}, {
		touchstart: 1,
		touchmove: 1,
		touchend: 1,

		mousedown: 2,
		mousemove: 2,
		mouseup: 2,

		MSPointerDown: 3,
		MSPointerMove: 3,
		MSPointerUp: 3
	});

	me.extend(me.ease = {}, {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function (k) {
				return k * ( 2 - k );
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
			fn: function (k) {
				return Math.sqrt( 1 - ( --k * k ) );
			}
		},
		back: {
			style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			fn: function (k) {
				var b = 4;
				return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
			}
		},
		bounce: {
			style: '',
			fn: function (k) {
				if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
					return 7.5625 * k * k;
				} else if ( k < ( 2 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
				} else if ( k < ( 2.5 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
				} else {
					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
				}
			}
		},
		elastic: {
			style: '',
			fn: function (k) {
				var f = 0.22,
					e = 0.4;

				if ( k === 0 ) { return 0; }
				if ( k == 1 ) { return 1; }

				return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
			}
		}
	});

	me.tap = function (e, eventName) {
		var ev = document.createEvent('Event');
		ev.initEvent(eventName, true, true);
		ev.pageX = e.pageX;
		ev.pageY = e.pageY;
		e.target.dispatchEvent(ev);
	};

	me.click = function (e) {
		var target = e.target,
			ev;

		if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
			ev = document.createEvent('MouseEvents');
			ev.initMouseEvent('click', true, true, e.view, 1,
				target.screenX, target.screenY, target.clientX, target.clientY,
				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
				0, null);

			ev._constructed = true;
			target.dispatchEvent(ev);
		}
	};

	return me;
})();

function IScroll (el, options) {
	this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.scrollerStyle = this.scroller.style;		// cache style for better performance

	this.options = {

// INSERT POINT: OPTIONS 

		startX: 0,
		startY: 0,
		scrollY: true,
		directionLockThreshold: 5,
		momentum: true,

		bounce: true,
		bounceTime: 600,
		bounceEasing: '',

		preventDefault: true,
		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

		HWCompositing: true,
		useTransition: true,
		useTransform: true
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	// Normalize options
	this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	this.options.useTransition = utils.hasTransition && this.options.useTransition;
	this.options.useTransform = utils.hasTransform && this.options.useTransform;

	this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	// If you want eventPassthrough I have to lock one of the axes
	this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

	// With eventPassthrough we also need lockDirection mechanism
	this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	if ( this.options.tap === true ) {
		this.options.tap = 'tap';
	}

// INSERT POINT: NORMALIZATION

	// Some defaults	
	this.x = 0;
	this.y = 0;
	this.directionX = 0;
	this.directionY = 0;
	this._events = {};

// INSERT POINT: DEFAULTS

	this._init();
	this.refresh();

	this.scrollTo(this.options.startX, this.options.startY);
	this.enable();
}

IScroll.prototype = {
	version: '5.0.6',

	_init: function () {
		this._initEvents();

// INSERT POINT: _init

	},

	destroy: function () {
		this._initEvents(true);

		this._execEvent('destroy');
	},

	_transitionEnd: function (e) {
		if ( e.target != this.scroller ) {
			return;
		}

		this._transitionTime(0);
		if ( !this.resetPosition(this.options.bounceTime) ) {
			this._execEvent('scrollEnd');
		}
	},

	_start: function (e) {
		// React to left mouse button only
		if ( utils.eventType[e.type] != 1 ) {
			if ( e.button !== 0 ) {
				return;
			}
		}

		if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
			return;
		}

		if ( this.options.preventDefault && !utils.isAndroidBrowser && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();		// This seems to break default Android browser
		}

		var point = e.touches ? e.touches[0] : e,
			pos;

		this.initiated	= utils.eventType[e.type];
		this.moved		= false;
		this.distX		= 0;
		this.distY		= 0;
		this.directionX = 0;
		this.directionY = 0;
		this.directionLocked = 0;

		this._transitionTime();

		this.isAnimating = false;
		this.startTime = utils.getTime();

		if ( this.options.useTransition && this.isInTransition ) {
			pos = this.getComputedPosition();

			this._translate(Math.round(pos.x), Math.round(pos.y));
			this._execEvent('scrollEnd');
			this.isInTransition = false;
		}

		this.startX    = this.x;
		this.startY    = this.y;
		this.absStartX = this.x;
		this.absStartY = this.y;
		this.pointX    = point.pageX;
		this.pointY    = point.pageY;

		this._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
			e.preventDefault();
		}

		var point		= e.touches ? e.touches[0] : e,
			deltaX		= point.pageX - this.pointX,
			deltaY		= point.pageY - this.pointY,
			timestamp	= utils.getTime(),
			newX, newY,
			absDistX, absDistY;

		this.pointX		= point.pageX;
		this.pointY		= point.pageY;

		this.distX		+= deltaX;
		this.distY		+= deltaY;
		absDistX		= Math.abs(this.distX);
		absDistY		= Math.abs(this.distY);

		// We need to move at least 10 pixels for the scrolling to initiate
		if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
			return;
		}

		// If you are scrolling in one direction lock the other
		if ( !this.directionLocked && !this.options.freeScroll ) {
			if ( absDistX > absDistY + this.options.directionLockThreshold ) {
				this.directionLocked = 'h';		// lock horizontally
			} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
				this.directionLocked = 'v';		// lock vertically
			} else {
				this.directionLocked = 'n';		// no lock
			}
		}

		if ( this.directionLocked == 'h' ) {
			if ( this.options.eventPassthrough == 'vertical' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'horizontal' ) {
				this.initiated = false;
				return;
			}

			deltaY = 0;
		} else if ( this.directionLocked == 'v' ) {
			if ( this.options.eventPassthrough == 'horizontal' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'vertical' ) {
				this.initiated = false;
				return;
			}

			deltaX = 0;
		}

		deltaX = this.hasHorizontalScroll ? deltaX : 0;
		deltaY = this.hasVerticalScroll ? deltaY : 0;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		// Slow down if outside of the boundaries
		if ( newX > 0 || newX < this.maxScrollX ) {
			newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
		}
		if ( newY > 0 || newY < this.maxScrollY ) {
			newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
		}

		this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if ( !this.moved ) {
			this._execEvent('scrollStart');
		}

		this.moved = true;

		this._translate(newX, newY);

/* REPLACE START: _move */

		if ( timestamp - this.startTime > 300 ) {
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;
		}

/* REPLACE END: _move */

	},

	_end: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.changedTouches ? e.changedTouches[0] : e,
			momentumX,
			momentumY,
			duration = utils.getTime() - this.startTime,
			newX = Math.round(this.x),
			newY = Math.round(this.y),
			distanceX = Math.abs(newX - this.startX),
			distanceY = Math.abs(newY - this.startY),
			time = 0,
			easing = '';

		this.scrollTo(newX, newY);	// ensures that the last position is rounded

		this.isInTransition = 0;
		this.initiated = 0;
		this.endTime = utils.getTime();

		// reset if we are outside of the boundaries
		if ( this.resetPosition(this.options.bounceTime) ) {
			return;
		}

		// we scrolled less than 10 pixels
		if ( !this.moved ) {
			if ( this.options.tap ) {
				utils.tap(e, this.options.tap);
			}

			if ( this.options.click ) {
				utils.click(e);
			}

			return;
		}

		if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
			this._execEvent('flick');
			return;
		}

		// start momentum animation if needed
		if ( this.options.momentum && duration < 300 ) {
			momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0) : { destination: newX, duration: 0 };
			momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0) : { destination: newY, duration: 0 };
			newX = momentumX.destination;
			newY = momentumY.destination;
			time = Math.max(momentumX.duration, momentumY.duration);
			this.isInTransition = 1;
		}

// INSERT POINT: _end

		if ( newX != this.x || newY != this.y ) {
			// change easing function when scroller goes out of the boundaries
			if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
				easing = utils.ease.quadratic;
			}

			this.scrollTo(newX, newY, time, easing);
			return;
		}

		this._execEvent('scrollEnd');
	},

	_resize: function () {
		var that = this;

		clearTimeout(this.resizeTimeout);

		this.resizeTimeout = setTimeout(function () {
			that.refresh();
		}, this.options.resizePolling);
	},

	resetPosition: function (time) {
		var x = this.x,
			y = this.y;

		time = time || 0;

		if ( !this.hasHorizontalScroll || this.x > 0 ) {
			x = 0;
		} else if ( this.x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( !this.hasVerticalScroll || this.y > 0 ) {
			y = 0;
		} else if ( this.y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		if ( x == this.x && y == this.y ) {
			return false;
		}

		this.scrollTo(x, y, time, this.options.bounceEasing);

		return true;
	},

	disable: function () {
		this.enabled = false;
	},

	enable: function () {
		this.enabled = true;
	},

	refresh: function () {
		var rf = this.wrapper.offsetHeight;		// Force reflow

		this.wrapperWidth	= this.wrapper.clientWidth;
		this.wrapperHeight	= this.wrapper.clientHeight;

/* REPLACE START: refresh */

		this.scrollerWidth	= this.scroller.offsetWidth;
		this.scrollerHeight	= this.scroller.offsetHeight;

/* REPLACE END: refresh */

		this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
		this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

		this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
		this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

		if ( !this.hasHorizontalScroll ) {
			this.maxScrollX = 0;
			this.scrollerWidth = this.wrapperWidth;
		}

		if ( !this.hasVerticalScroll ) {
			this.maxScrollY = 0;
			this.scrollerHeight = this.wrapperHeight;
		}

		this.endTime = 0;
		this.directionX = 0;
		this.directionY = 0;

		this.wrapperOffset = utils.offset(this.wrapper);

		this._execEvent('refresh');

		this.resetPosition();

// INSERT POINT: _refresh

	},

	on: function (type, fn) {
		if ( !this._events[type] ) {
			this._events[type] = [];
		}

		this._events[type].push(fn);
	},

	_execEvent: function (type) {
		if ( !this._events[type] ) {
			return;
		}

		var i = 0,
			l = this._events[type].length;

		if ( !l ) {
			return;
		}

		for ( ; i < l; i++ ) {
			this._events[type][i].call(this);
		}
	},

	scrollBy: function (x, y, time, easing) {
		x = this.x + x;
		y = this.y + y;
		time = time || 0;

		this.scrollTo(x, y, time, easing);
	},

	scrollTo: function (x, y, time, easing) {
		easing = easing || utils.ease.circular;

		if ( !time || (this.options.useTransition && easing.style) ) {
			this._transitionTimingFunction(easing.style);
			this._transitionTime(time);
			this._translate(x, y);
		} else {
			this._animate(x, y, time, easing.fn);
		}
	},

	scrollToElement: function (el, time, offsetX, offsetY, easing) {
		el = el.nodeType ? el : this.scroller.querySelector(el);

		if ( !el ) {
			return;
		}

		var pos = utils.offset(el);

		pos.left -= this.wrapperOffset.left;
		pos.top  -= this.wrapperOffset.top;

		// if offsetX/Y are true we center the element to the screen
		if ( offsetX === true ) {
			offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		}
		if ( offsetY === true ) {
			offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		}

		pos.left -= offsetX || 0;
		pos.top  -= offsetY || 0;

		pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

		time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

		this.scrollTo(pos.left, pos.top, time, easing);
	},

	_transitionTime: function (time) {
		time = time || 0;
		this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

// INSERT POINT: _transitionTime

	},

	_transitionTimingFunction: function (easing) {
		this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

// INSERT POINT: _transitionTimingFunction

	},

	_translate: function (x, y) {
		if ( this.options.useTransform ) {

/* REPLACE START: _translate */

			this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

/* REPLACE END: _translate */

		} else {
			x = Math.round(x);
			y = Math.round(y);
			this.scrollerStyle.left = x + 'px';
			this.scrollerStyle.top = y + 'px';
		}

		this.x = x;
		this.y = y;

// INSERT POINT: _translate

	},

	_initEvents: function (remove) {
		var eventType = remove ? utils.removeEvent : utils.addEvent,
			target = this.options.bindToWrapper ? this.wrapper : window;

		eventType(window, 'orientationchange', this);
		eventType(window, 'resize', this);

		if ( this.options.click ) {
			eventType(this.wrapper, 'click', this, true);
		}

		if ( !this.options.disableMouse ) {
			eventType(this.wrapper, 'mousedown', this);
			eventType(target, 'mousemove', this);
			eventType(target, 'mousecancel', this);
			eventType(target, 'mouseup', this);
		}

		if ( utils.hasPointer && !this.options.disablePointer ) {
			eventType(this.wrapper, 'MSPointerDown', this);
			eventType(target, 'MSPointerMove', this);
			eventType(target, 'MSPointerCancel', this);
			eventType(target, 'MSPointerUp', this);
		}

		if ( utils.hasTouch && !this.options.disableTouch ) {
			eventType(this.wrapper, 'touchstart', this);
			eventType(target, 'touchmove', this);
			eventType(target, 'touchcancel', this);
			eventType(target, 'touchend', this);
		}

		eventType(this.scroller, 'transitionend', this);
		eventType(this.scroller, 'webkitTransitionEnd', this);
		eventType(this.scroller, 'oTransitionEnd', this);
		eventType(this.scroller, 'MSTransitionEnd', this);
	},

	getComputedPosition: function () {
		var matrix = window.getComputedStyle(this.scroller, null),
			x, y;

		if ( this.options.useTransform ) {
			matrix = matrix[utils.style.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d]/g, '');
			y = +matrix.top.replace(/[^-\d]/g, '');
		}

		return { x: x, y: y };
	},

	_animate: function (destX, destY, duration, easingFn) {
		var that = this,
			startX = this.x,
			startY = this.y,
			startTime = utils.getTime(),
			destTime = startTime + duration;

		function step () {
			var now = utils.getTime(),
				newX, newY,
				easing;

			if ( now >= destTime ) {
				that.isAnimating = false;
				that._translate(destX, destY);

				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd');
				}

				return;
			}

			now = ( now - startTime ) / duration;
			easing = easingFn(now);
			newX = ( destX - startX ) * easing + startX;
			newY = ( destY - startY ) * easing + startY;
			that._translate(newX, newY);

			if ( that.isAnimating ) {
				rAF(step);
			}
		}

		this.isAnimating = true;
		step();
	},
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'DOMMouseScroll':
			case 'mousewheel':
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
			case 'click':
				if ( !e._constructed ) {
					e.preventDefault();
					e.stopPropagation();
				}
				break;
		}
	}
};
IScroll.ease = utils.ease;

return IScroll;

})(window, document, Math);
/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

/** NOTE: This library is customized for Onsen UI. */

var MicroEvent  = function(){};
MicroEvent.prototype  = {
  on  : function(event, fct){
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
  },
  once : function(event, fct){
    var self = this;
    var wrapper = function() {
      self.off(event, wrapper);
      return fct.apply(null, arguments);
    };
    this.on(event, wrapper);
  },
  off  : function(event, fct){
    this._events = this._events || {};
    if( event in this._events === false  )  return;
    this._events[event].splice(this._events[event].indexOf(fct), 1);
  },
  emit : function(event /* , args... */){
    this._events = this._events || {};
    if( event in this._events === false  )  return;
    for(var i = 0; i < this._events[event].length; i++){
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin  = function(destObject){
  var props = ['on', 'once', 'off', 'emit'];
  for(var i = 0; i < props.length; i ++){
    if( typeof destObject === 'function' ){
      destObject.prototype[props[i]]  = MicroEvent.prototype[props[i]];
    }else{
      destObject[props[i]] = MicroEvent.prototype[props[i]];
    }
  }
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
  module.exports  = MicroEvent;
}

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-borderradius-boxshadow-cssanimations-csstransforms-csstransforms3d-csstransitions-canvas-svg-shiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;



window.Modernizr = (function( window, document, undefined ) {

    var version = '2.6.2',

    Modernizr = {},

    enableClasses = true,

    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  ,


    toString = {}.toString,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),

    ns = {'svg': 'http://www.w3.org/2000/svg'},

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, 


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
                body = document.body,
                fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
                      while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

                style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
          (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
        if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { 
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }


    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }

    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                            if (elem === false) return props[i];

                            if (is(item, 'function')){
                                return item.bind(elem || obj);
                }

                            return item;
            }
        }
        return false;
    }

    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

            if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

            } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }



    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };
    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };



    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

                        if ( ret && 'webkitPerspective' in docElement.style ) {

                      injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };



    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
                                    featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }



     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
                                              return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; 
     };


    setCss('');
    modElem = inputElem = null;

    ;(function(window, document) {
        var options = window.html5 || {};

        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        var supportsHtml5Styles;

        var expando = '_html5shiv';

        var expanID = 0;

        var expandoData = {};

        var supportsUnknownElements;

      (function() {
        try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
                    supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
                        (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
        } catch(e) {
          supportsHtml5Styles = true;
          supportsUnknownElements = true;
        }

      }());        function addStyleSheet(ownerDocument, cssText) {
        var p = ownerDocument.createElement('p'),
            parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

        p.innerHTML = 'x<style>' + cssText + '</style>';
        return parent.insertBefore(p.lastChild, parent.firstChild);
      }

        function getElements() {
        var elements = html5.elements;
        return typeof elements == 'string' ? elements.split(' ') : elements;
      }

          function getExpandoData(ownerDocument) {
        var data = expandoData[ownerDocument[expando]];
        if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
        }
        return data;
      }

        function createElement(nodeName, ownerDocument, data){
        if (!ownerDocument) {
            ownerDocument = document;
        }
        if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
        }
        if (!data) {
            data = getExpandoData(ownerDocument);
        }
        var node;

        if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
        } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
        } else {
            node = data.createElem(nodeName);
        }

                                    return node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node;
      }

        function createDocumentFragment(ownerDocument, data){
        if (!ownerDocument) {
            ownerDocument = document;
        }
        if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
        }
        data = data || getExpandoData(ownerDocument);
        var clone = data.frag.cloneNode(),
            i = 0,
            elems = getElements(),
            l = elems.length;
        for(;i<l;i++){
            clone.createElement(elems[i]);
        }
        return clone;
      }

        function shivMethods(ownerDocument, data) {
        if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
        }


        ownerDocument.createElement = function(nodeName) {
                if (!html5.shivMethods) {
              return data.createElem(nodeName);
          }
          return createElement(nodeName, ownerDocument, data);
        };

        ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
          'var n=f.cloneNode(),c=n.createElement;' +
          'h.shivMethods&&(' +
                    getElements().join().replace(/\w+/g, function(nodeName) {
              data.createElem(nodeName);
              data.frag.createElement(nodeName);
              return 'c("' + nodeName + '")';
            }) +
          ');return n}'
        )(html5, data.frag);
      }        function shivDocument(ownerDocument) {
        if (!ownerDocument) {
            ownerDocument = document;
        }
        var data = getExpandoData(ownerDocument);

        if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
          data.hasCSS = !!addStyleSheet(ownerDocument,
                    'article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
                    'mark{background:#FF0;color:#000}'
          );
        }
        if (!supportsUnknownElements) {
          shivMethods(ownerDocument, data);
        }
        return ownerDocument;
      }        var html5 = {

            'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video',

            'shivCSS': (options.shivCSS !== false),

            'supportsUnknownElements': supportsUnknownElements,

            'shivMethods': (options.shivMethods !== false),

            'type': 'default',

            'shivDocument': shivDocument,

            createElement: createElement,

            createDocumentFragment: createDocumentFragment
      };        window.html5 = html5;

        shivDocument(document);

    }(this, document));

    Modernizr._version      = version;

    Modernizr._prefixes     = prefixes;
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;



    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };

    Modernizr.testAllProps  = testPropsAll;


    Modernizr.testStyles    = injectElementWithStyles;    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                                                    (enableClasses ? ' js ' + classes.join(' ') : '');

    return Modernizr;

})(this, this.document);
/*yepnope1.5.4|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);
Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0));};
;
/*
Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic Denicola

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var setImmediate;

    function addFromSetImmediateArguments(args) {
        tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
        return nextHandle++;
    }

    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    function partiallyApplied(handler) {
        var args = [].slice.call(arguments, 1);
        return function() {
            if (typeof handler === "function") {
                handler.apply(undefined, args);
            } else {
                (new Function("" + handler))();
            }
        };
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    task();
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function installNextTickImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            process.nextTick(partiallyApplied(runIfPresent, handle));
            return handle;
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            global.postMessage(messagePrefix + handle, "*");
            return handle;
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
    }

    function installSetTimeoutImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
            return handle;
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(new Function("return this")()));

(function() {
    function Viewport() {

        this.PRE_IOS7_VIEWPORT = "initial-scale=1, maximum-scale=1, user-scalable=no";
        this.IOS7_VIEWPORT = "initial-scale=1, maximum-scale=1, user-scalable=no";
        this.DEFAULT_VIEWPORT = "initial-scale=1, maximum-scale=1, user-scalable=no";

        this.ensureViewportElement();
        this.platform = {};
        this.platform.name = this.getPlatformName();
        this.platform.version = this.getPlatformVersion();

        return this;
    };

    Viewport.prototype.ensureViewportElement = function(){
        this.viewportElement = document.querySelector('meta[name=viewport]');
        if(!this.viewportElement){
            this.viewportElement = document.createElement('meta');
            this.viewportElement.name = "viewport";
            document.head.appendChild(this.viewportElement);
        }
    },

    Viewport.prototype.setup = function() {
        if (!this.viewportElement) {
            return;
        }

        if (this.viewportElement.getAttribute('data-no-adjust') == "true") {
            return;
        }

        if (this.platform.name == 'ios') {
            if (this.platform.version >= 7 && isWebView()) {
                this.viewportElement.setAttribute('content', this.IOS7_VIEWPORT);
            } else {
                this.viewportElement.setAttribute('content', this.PRE_IOS7_VIEWPORT);
            }
        } else {
            this.viewportElement.setAttribute('content', this.DEFAULT_VIEWPORT);
        }

        function isWebView() {
            return !!(window.cordova || window.phonegap || window.PhoneGap);
        }
    };

    Viewport.prototype.getPlatformName = function() {
        if (navigator.userAgent.match(/Android/i)) {
            return "android";
        }

        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            return "ios";
        }

        // unknown
        return undefined;
    };

    Viewport.prototype.getPlatformVersion = function() {
        var start = window.navigator.userAgent.indexOf('OS ');
        return window.Number(window.navigator.userAgent.substr(start + 3, 3).replace('_', '.'));
    };

    window.Viewport = Viewport;
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/back_button.tpl',
    '<span \n' +
    '  class="toolbar-button--quiet {{modifierTemplater(\'toolbar-button--*\')}}" \n' +
    '  ng-click="$root.ons.findParentComponentUntil(\'ons-navigator\', $event).popPage({cancelIfRunning: true})"\n' +
    '  ng-show="showBackButton"\n' +
    '  style="height: 44px; line-height: 0; padding: 0 10px 0 0; position: relative;">\n' +
    '  \n' +
    '  <i \n' +
    '    class="ion-ios-arrow-back ons-back-button__icon" \n' +
    '    style="vertical-align: top; background-color: transparent; height: 44px; line-height: 44px; font-size: 36px; margin-left: 8px; margin-right: 2px; width: 16px; display: inline-block; padding-top: 1px;"></i>\n' +
    '\n' +
    '  <span \n' +
    '    style="vertical-align: top; display: inline-block; line-height: 44px; height: 44px;" \n' +
    '    class="back-button__label"></span>\n' +
    '</span>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/button.tpl',
    '<span class="label ons-button-inner"></span>\n' +
    '<span class="spinner button__spinner {{modifierTemplater(\'button--*__spinner\')}}"></span>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/dialog.tpl',
    '<div class="dialog-mask"></div>\n' +
    '<div class="dialog {{ modifierTemplater(\'dialog--*\') }}"></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/icon.tpl',
    '<i class="fa fa-{{icon}} fa-{{spin}} fa-{{fixedWidth}} fa-rotate-{{rotate}} fa-flip-{{flip}}" ng-class="sizeClass" ng-style="style"></i>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/popover.tpl',
    '<div class="popover-mask"></div>\n' +
    '<div class="popover popover--{{ direction }} {{ modifierTemplater(\'popover--*\') }}">\n' +
    '  <div class="popover__content {{ modifierTemplater(\'popover__content--*\') }}"></div>\n' +
    '  <div class="popover__{{ arrowPosition }}-arrow"></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/row.tpl',
    '<div class="row row-{{align}} ons-row-inner"></div>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/sliding_menu.tpl',
    '<div class="onsen-sliding-menu__menu ons-sliding-menu-inner"></div>\n' +
    '<div class="onsen-sliding-menu__main ons-sliding-menu-inner"></div>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/split_view.tpl',
    '<div class="onsen-split-view__secondary full-screen ons-split-view-inner"></div>\n' +
    '<div class="onsen-split-view__main full-screen ons-split-view-inner"></div>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/switch.tpl',
    '<label class="switch {{modifierTemplater(\'switch--*\')}}">\n' +
    '  <input type="checkbox" class="switch__input {{modifierTemplater(\'switch--*__input\')}}" ng-model="model">\n' +
    '  <div class="switch__toggle {{modifierTemplater(\'switch--*__toggle\')}}"></div>\n' +
    '</label>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/tab.tpl',
    '<input type="radio" name="tab-bar-{{tabbarId}}" style="display: none">\n' +
    '<button class="tab-bar__button tab-bar-inner {{tabbarModifierTemplater(\'tab-bar--*__button\')}} {{modifierTemplater(\'tab-bar__button--*\')}}" ng-click="tryToChange()">\n' +
    '</button>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/tab_bar.tpl',
    '<div class="ons-tab-bar__content tab-bar__content"></div>\n' +
    '<div ng-hide="hideTabs" class="tab-bar ons-tab-bar__footer {{modifierTemplater(\'tab-bar--*\')}} ons-tabbar-inner"></div>\n' +
    '');
}]);
})();

(function(module) {
try { module = angular.module('templates-main'); }
catch(err) { module = angular.module('templates-main', []); }
module.run(['$templateCache', function($templateCache) {
  'use strict';
  $templateCache.put('templates/toolbar_button.tpl',
    '<span class="toolbar-button {{modifierTemplater(\'toolbar-button--*\')}} navigation-bar__line-height" ng-transclude></span>\n' +
    '');
}]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


window.DoorLock = (function() {
  /**
   * Door locking system.
   *
   * @param {Object} [options]
   * @param {Function} [options.log]
   */
  var DoorLock = function(options) {
    options = options || {};
    this._lockList = [];
    this._waitList = [];
    this._log = options.log || function() {};
  };

  DoorLock.generateId = (function() {
    var i = 0;
    return function() {
      return i++;
    };
  })();

  DoorLock.prototype = {
    /**
     * Register a lock.
     *
     * @return {Function} Callback for unlocking.
     */
    lock: function() {
      var self = this;
      var unlock = function() {
        self._unlock(unlock);
      };
      unlock.id = DoorLock.generateId();
      this._lockList.push(unlock);
      this._log('lock: ' + (unlock.id));

      return unlock;
    },

    _unlock: function(fn) {
      var index = this._lockList.indexOf(fn);
      if (index === -1) {
        throw new Error('This function is not registered in the lock list.');
      }

      this._lockList.splice(index, 1);
      this._log('unlock: ' + fn.id);

      this._tryToFreeWaitList();
    },

    _tryToFreeWaitList: function() {
      while (!this.isLocked() && this._waitList.length > 0) {
        this._waitList.shift()();
      }
    },

    /**
     * Register a callback for waiting unlocked door.
     *
     * @params {Function} callback Callback on unlocking the door completely.
     */
    waitUnlock: function(callback) {
      if (!(callback instanceof Function)) {
        throw new Error('The callback param must be a function.');
      }

      if (this.isLocked()) {
        this._waitList.push(callback);
      } else {
        callback();
      }
    },

    /**
     * @return {Boolean}
     */
    isLocked: function() {
      return this._lockList.length > 0;
    }
  };

  return DoorLock;

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc object
 * @name ons
 * @category util
 * @description 
 *   [ja]Onsen UIで利用できるグローバルなオブジェクトです。このオブジェクトは、AngularJSのスコープから参照することができます。 [/ja]
 *   [en]A global object that's used in Onsen UI. This object can be reached from the AngularJS scope.[/en]
 */

/**
 * @ngdoc method
 * @signature ready(callback)
 * @description 
 *   [ja]アプリの初期化に利用するメソッドです。渡された関数は、Onsen UIの初期化が終了している時点で必ず呼ばれます。[/ja]
 *   [en]Method used to wait for app initialization. The callback will not be executed until Onsen UI has been completely initialized.[/en]
 * @param {Function} callback
 *   [en]Function that executes after Onsen UI has been initialized.[/en]
 *   [ja]Onsen UIが初期化が完了した後に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature bootstrap([moduleName, [dependencies]])
 * @description 
 *   [ja]Onsen UIの初期化を行います。Angular.jsのng-app属性を利用すること無しにOnsen UIを読み込んで初期化してくれます。[/ja]
 *   [en]Initialize Onsen UI. Can be used to load Onsen UI without using the <code>ng-app</code> attribute from AngularJS.[/en]
 * @param {String} [moduleName] 
 *   [en]AngularJS module name.[/en]
 *   [ja]Angular.jsでのモジュール名[/ja]
 * @param {Array} [dependencies] 
 *   [en]List of AngularJS module dependencies.[/en]
 *   [ja]依存するAngular.jsのモジュール名の配列[/ja]
 * @return {Object}
 *   [en]An AngularJS module object.[/en]
 *   [ja]AngularJSのModuleオブジェクトを表します。[/ja]
 */

/**
 * @ngdoc method
 * @signature enableAutoStatusBarFill()
 * @description 
 *   [en]Enable status bar fill feature on iOS7 and above.[/en]
 *   [ja]iOS7以上で、ステータスバー部分の高さを自動的に埋める処理を有効にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature disableAutoStatusBarFill()
 * @description 
 *   [en]Disable status bar fill feature on iOS7 and above.[/en]
 *   [ja]iOS7以上で、ステータスバー部分の高さを自動的に埋める処理を無効にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature findParentComponentUntil(name, [dom])
 * @param {String} name
 *   [en]Name of component, i.e. 'ons-page'.[/en]
 *   [ja]コンポーネント名を指定します。例えばons-pageなどを指定します。[/ja]
 * @param {Object|jqLite|HTMLElement} [dom]
 *   [en]$event, jqLite or HTMLElement object.[/en]
 *   [ja]$eventオブジェクト、jqLiteオブジェクト、HTMLElementオブジェクトのいずれかを指定できます。[/ja]
 * @return {Object}
 *   [en]Component object. Will return null if no component was found.[/en]
 *   [ja]コンポーネントのオブジェクトを返します。もしコンポーネントが見つからなかった場合にはnullを返します。[/ja]
 * @description 
 *   [en]Find parent component object of <code>dom</code> element.[/en]
 *   [ja]指定されたdom引数の親要素をたどってコンポーネントを検索します。[/ja]
 */

/**
 * @ngdoc method
 * @signature findComponent(selector, [dom])
 * @param {String} selector
 *   [en]CSS selector[/en]
 *   [ja]CSSセレクターを指定します。[/ja]
 * @param {HTMLElement} [dom]
 *   [en]DOM element to search from.[/en]
 *   [ja]検索対象とするDOM要素を指定します。[/ja]
 * @return {Object}
 *   [en]Component object. Will return null if no component was found.[/en]
 *   [ja]コンポーネントのオブジェクトを返します。もしコンポーネントが見つからなかった場合にはnullを返します。[/ja]
 * @description 
 *   [en]Find component object using CSS selector.[/en]
 *   [ja]CSSセレクタを使ってコンポーネントのオブジェクトを検索します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDefaultDeviceBackButtonListener(listener)
 * @param {Function} listener 
 *   [en]Function that executes when device back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時に実行される関数オブジェクトを指定します。[/ja]
 * @description 
 *   [en]Set default handler for device back button.[/en]
 *   [ja]デバイスのバックボタンのためのデフォルトのハンドラを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature disableDeviceBackButtonHandler()
 * @description 
 * [en]Disable device back button event handler.[/en]
 * [ja]デバイスのバックボタンのイベントを受け付けないようにします。[/ja]
 */

/**
 * @ngdoc method
 * @signature enableDeviceBackButtonHandler()
 * @description 
 * [en]Enable device back button event handler.[/en]
 * [ja]デバイスのバックボタンのイベントを受け付けるようにします。[/ja]
 */

/**
 * @ngdoc method
 * @signature isReady()
 * @return {Boolean}
 *   [en]Will be true if Onsen UI is initialized.[/en]
 *   [ja]初期化されているかどうかを返します。[/ja]
 * @description 
 *   [en]Returns true if Onsen UI is initialized.[/en]
 *   [ja]Onsen UIがすでに初期化されているかどうかを返すメソッドです。[/ja]
 */

/**
 * @ngdoc method
 * @signature compile(dom)
 * @param {HTMLElement} dom
 *   [en]Element to compile.[/en]
 *   [ja]コンパイルする要素を指定します。[/ja]
 * @description 
 *   [en]Compile Onsen UI components.[/en]
 *   [ja]通常のHTMLの要素をOnsen UIのコンポーネントにコンパイルします。[/ja]
 */

/**
 * @ngdoc method
 * @signature isWebView()
 * @return {Boolean}
 *   [en]Will be true if the app is running in Cordova.[/en]
 *   [ja]Cordovaで実行されている場合にtrueになります。[/ja]
 * @description 
 *   [en]Returns true if running inside Cordova.[/en]
 *   [ja]Cordovaで実行されているかどうかを返すメソッドです。[/ja]
 */

/**
 * @ngdoc method
 * @signature createAlertDialog(page, [options])
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-alert-dialog> component.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Object} [options.parentScope]
 *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
 *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。[/ja]
 * @return {Promise}
 *   [en]Promise object that resolves to the alert dialog component object.[/en]
 *   [ja]ダイアログのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description 
 *   [en]Create a alert dialog instance from a template.[/en]
 *   [ja]テンプレートからアラートダイアログのインスタンスを生成します。[/ja]
 */

/**
 * @ngdoc method
 * @signature createDialog(page, [options])
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-dialog> component.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Object} [options.parentScope]
 *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
 *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。[/ja]
 * @return {Promise}
 *   [en]Promise object that resolves to the dialog component object.[/en]
 *   [ja]ダイアログのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description 
 *   [en]Create a dialog instance from a template.[/en]
 *   [ja]テンプレートからダイアログのインスタンスを生成します。[/ja]
 */

/**
 * @ngdoc method
 * @signature createPopover(page, [options])
 * @param {String} page
 *   [en]Page name. Can be either an HTML file or an <ons-template> containing a <ons-dialog> component.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Object} [options.parentScope]
 *   [en]Parent scope of the dialog. Used to bind models and access scope methods from the dialog.[/en]
 *   [ja]ダイアログ内で利用する親スコープを指定します。ダイアログからモデルやスコープのメソッドにアクセスするのに使います。[/ja]
 * @return {Promise}
 *   [en]Promise object that resolves to the popover component object.[/en]
 *   [ja]ポップオーバーのコンポーネントオブジェクトを解決するPromiseオブジェクトを返します。[/ja]
 * @description 
 *   [en]Create a popover instance from a template.[/en]
 *   [ja]テンプレートからポップオーバーのインスタンスを生成します。[/ja]
 */

window.ons = (function(){
  'use strict';

  var module = angular.module('onsen', ['templates-main']);
  angular.module('onsen.directives', ['onsen']); // for BC

  // JS Global facade for Onsen UI.
  var ons = createOnsenFacade();
  initKeyboardEvents();
  waitDeviceReady();
  waitOnsenUILoad();
  initAngularModule();

  return ons;

  function waitDeviceReady() {
    var unlockDeviceReady = ons._readyLock.lock();
    window.addEventListener('DOMContentLoaded', function() {
      if (ons.isWebView()) {
        window.document.addEventListener('deviceready', unlockDeviceReady, false);
      } else {
        unlockDeviceReady();
      }
    }, false);
  }

  function waitOnsenUILoad() {
    var unlockOnsenUI = ons._readyLock.lock();
    module.run(['$compile', '$rootScope', '$onsen', function($compile, $rootScope, $onsen) {
      // for initialization hook.
      if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
        window.addEventListener('DOMContentLoaded', function() {
          document.body.appendChild(document.createElement('ons-dummy-for-init'));
        });
      } else if (document.body) {
        document.body.appendChild(document.createElement('ons-dummy-for-init'));
      } else {
        throw new Error('Invalid initialization state.');
      }

      $rootScope.$on('$ons-ready', unlockOnsenUI);
    }]);
  }

  function initAngularModule() {
    module.value('$onsGlobal', ons);
    module.run(['$compile', '$rootScope', '$onsen', '$q', function($compile, $rootScope, $onsen, $q) {
      ons._onsenService = $onsen;
      ons._qService = $q;

      $rootScope.ons = window.ons;
      $rootScope.console = window.console;
      $rootScope.alert = window.alert;

      ons.$compile = $compile;
    }]);
  }

  function initKeyboardEvents() {
    ons.softwareKeyboard = new MicroEvent();
    ons.softwareKeyboard._visible = false;

    var onShow = function() {
      ons.softwareKeyboard._visible = true;
      ons.softwareKeyboard.emit('show');
    },
        onHide = function() {
      ons.softwareKeyboard._visible = false;
      ons.softwareKeyboard.emit('hide');
    };

    var bindEvents = function() {
      if (typeof Keyboard !== 'undefined') {
        // https://github.com/martinmose/cordova-keyboard/blob/95f3da3a38d8f8e1fa41fbf40145352c13535a00/README.md
        Keyboard.onshow = onShow;
        Keyboard.onhide = onHide;
        ons.softwareKeyboard.emit('init', {visible: Keyboard.isVisible});
        return true;
      } else if (typeof cordova.plugins !== 'undefined' && typeof cordova.plugins.Keyboard !== 'undefined') {
        // https://github.com/driftyco/ionic-plugins-keyboard/blob/ca27ecf/README.md
        window.addEventListener('native.keyboardshow', onShow);
        window.addEventListener('native.keyboardhide', onHide);
        ons.softwareKeyboard.emit('init', {visible: cordova.plugins.Keyboard.isVisible});
        return true;
      }
      return false;
    };

    var noPluginError = function() {
      console.warn('ons-keyboard: Cordova Keyboard plugin is not present.');
    };

    document.addEventListener('deviceready', function() {
      if (!bindEvents()) {
        if (document.querySelector('[ons-keyboard-active]') || 
          document.querySelector('[ons-keyboard-inactive]')) {
          noPluginError();
        }

        ons.softwareKeyboard.on = noPluginError;
      }
    });
  }

  function createOnsenFacade() {
    var ons = {

      _readyLock: new DoorLock(),

      _onsenService: null,

      _config: {
        autoStatusBarFill: true
      },

      _unlockersDict: {},

      // Object to attach component variables to when using the var="..." attribute.
      // Can be set to null to avoid polluting the global scope.
      componentBase: window,

      /**
       * Bootstrap this document as a Onsen UI application.
       *
       * @param {String} [name] optional name
       * @param {Array} [deps] optional dependency modules
       */
      bootstrap : function(name, deps) {
        if (angular.isArray(name)) {
          deps = name;
          name = undefined;
        }

        if (!name) {
          name = 'myOnsenApp';
        }

        deps = ['onsen'].concat(angular.isArray(deps) ? deps : []);
        var module = angular.module(name, deps);

        var doc = window.document;
        if (doc.readyState == 'loading' || doc.readyState == 'uninitialized' || doc.readyState == 'interactive') {
          doc.addEventListener('DOMContentLoaded', function() {
            angular.bootstrap(doc.documentElement, [name]);
          }, false);
        } else if (doc.documentElement) {
          angular.bootstrap(doc.documentElement, [name]);
        } else {
          throw new Error('Invalid state');
        }

        return module;
      },

      /**
       * Enable status bar fill feature on iOS7 and above.
       */
      enableAutoStatusBarFill: function() {
        if (this.isReady()) {
          throw new Error('This method must be called before ons.isReady() is true.');
        }
        this._config.autoStatusBarFill = true;
      },

      /**
       * Disable status bar fill feature on iOS7 and above.
       */
      disableAutoStatusBarFill: function() {
        if (this.isReady()) {
          throw new Error('This method must be called before ons.isReady() is true.');
        }
        this._config.autoStatusBarFill = false;
      },

      /**
       * @param {String} [name]
       * @param {Object/jqLite/HTMLElement} dom $event object or jqLite object or HTMLElement object.
       * @return {Object}
       */
      findParentComponentUntil: function(name, dom) {
        var element;
        if (dom instanceof HTMLElement) {
          element = angular.element(dom);
        } else if (dom instanceof angular.element) {
          element = dom;
        } else if (dom.target) {
          element = angular.element(dom.target);
        }

        return element.inheritedData(name);
      },

      /**
       * @param {Function} listener
       */
      setDefaultDeviceBackButtonListener: function(listener) {
        this._getOnsenService().getDefaultDeviceBackButtonHandler().setListener(listener);
      },

      /**
       * Disable this framework to handle cordova "backbutton" event.
       */
      disableDeviceBackButtonHandler: function() {
        this._getOnsenService().DeviceBackButtonHandler.disable();
      },

      /**
       * Enable this framework to handle cordova "backbutton" event.
       */
      enableDeviceBackButtonHandler: function() {
        this._getOnsenService().DeviceBackButtonHandler.enable();
      },

      /**
       * Find view object correspond dom element queried by CSS selector.
       *
       * @param {String} selector CSS selector
       * @param {HTMLElement} [dom]
       * @return {Object/void}
       */
      findComponent: function(selector, dom) {
        var target = (dom ? dom : document).querySelector(selector);
        return target ? angular.element(target).data(target.nodeName.toLowerCase()) || null : null;
      },

      /**
       * @return {Boolean}
       */
      isReady: function() {
        return !ons._readyLock.isLocked();
      },

      /**
       * @param {HTMLElement} dom
       */
      compile : function(dom) {
        if (!ons.$compile) {
          throw new Error('ons.$compile() is not ready. Wait for initialization with ons.ready().');
        }

        if (!(dom instanceof HTMLElement)) {
          throw new Error('First argument must be an instance of HTMLElement.');
        }

        var scope = angular.element(dom).scope();
        if (!scope) {
          throw new Error('AngularJS Scope is null. Argument DOM element must be attached in DOM document.');
        }

        ons.$compile(dom)(scope);
      },

      _getOnsenService: function() {
        if (!this._onsenService) {
          throw new Error('$onsen is not loaded, wait for ons.ready().');
        }

        return this._onsenService;
      },

      /**
       * @param {Array} [dependencies]
       * @param {Function} callback
       */
      ready : function(/* dependencies, */callback) {
        if (callback instanceof Function) {
          if (ons.isReady()) {
            callback();
          } else {
            ons._readyLock.waitUnlock(callback);
          }
        } else if (angular.isArray(callback) && arguments[1] instanceof Function) {
          var dependencies = callback;
          callback = arguments[1];

          ons.ready(function() {
            var $onsen = ons._getOnsenService();
            $onsen.waitForVariables(dependencies, callback);
          });
        }
      },

      /**
       * @return {Boolean}
       */
      isWebView: function() {
        if (document.readyState === 'loading' || document.readyState == 'uninitialized') {
          throw new Error('isWebView() method is available after dom contents loaded.');
        }

        return !!(window.cordova || window.phonegap || window.PhoneGap);
      },

      /**
       * @param {String} page
       * @param {Object} [options]
       * @param {Object} [options.parentScope]
       * @return {Promise}
       */
      createAlertDialog: function(page, options) {
        options = options || {};

        if (!page) {
          throw new Error('Page url must be defined.');
        }

        var alertDialog = angular.element('<ons-alert-dialog>'),
          $onsen = this._getOnsenService();

        angular.element(document.body).append(angular.element(alertDialog));

        return $onsen.getPageHTMLAsync(page).then(function(html) {
          var div = document.createElement('div');
          div.innerHTML = html;

          var el = angular.element(div.querySelector('ons-alert-dialog'));

          // Copy attributes and insert html.
          var attrs = el.prop('attributes');
          for (var i = 0, l = attrs.length; i < l; i++) {
            alertDialog.attr(attrs[i].name, attrs[i].value); 
          }
          alertDialog.html(el.html());

          var parentScope;
          if (options.parentScope) {
            parentScope = options.parentScope.$new();
            ons.$compile(alertDialog)(parentScope);
          }
          else {
            ons.compile(alertDialog[0]);
          }

          if (el.attr('disabled')) {
            alertDialog.attr('disabled', 'disabled');
          }

          if (parentScope) {
            alertDialog.data('ons-alert-dialog')._parentScope = parentScope;
          }

          return  alertDialog.data('ons-alert-dialog');
        });
      },

      /**
      * @param {String} page
      * @param {Object} [options]
      * @param {Object} [options.parentScope]
      * @return {Promise}
      */
      createDialog: function(page, options) {
        options = options || {};

        if (!page) {
          throw new Error('Page url must be defined.');
        }

        var dialog = angular.element('<ons-dialog>'),
        $onsen = this._getOnsenService();

        angular.element(document.body).append(angular.element(dialog));

        return $onsen.getPageHTMLAsync(page).then(function(html) {
          var div = document.createElement('div');
          div.innerHTML = html;

          var el = angular.element(div.querySelector('ons-dialog'));

          // Copy attributes and insert html.
          var attrs = el.prop('attributes');
          for (var i = 0, l = attrs.length; i < l; i++) {
            dialog.attr(attrs[i].name, attrs[i].value); 
          }
          dialog.html(el.html());

          var parentScope;
          if (options.parentScope) {
            parentScope = options.parentScope.$new();
            ons.$compile(dialog)(parentScope);
          }
          else {
            ons.compile(dialog[0]);
          }

          if (el.attr('disabled')) {
            dialog.attr('disabled', 'disabled');
          }

          var deferred = ons._qService.defer();

          dialog.on('ons-dialog:init', function(e) {
            // Copy "style" attribute from parent.
            var child = dialog[0].querySelector('.dialog');
            if (el[0].hasAttribute('style')) {
              var parentStyle = el[0].getAttribute('style'),
              childStyle = child.getAttribute('style'),
              newStyle = (function(a, b) {
                var c =
                (a.substr(-1) === ';' ? a : a + ';') + 
                  (b.substr(-1) === ';' ? b : b + ';'); 
                return c;
              })(parentStyle, childStyle);

              child.setAttribute('style', newStyle);
            }

            if (parentScope) {
              e.component._parentScope = parentScope;
            }

            deferred.resolve(e.component);
          });

          return deferred.promise;
        });
      },

      /**
       * @param {String} page
       * @param {Object} [options]
       * @param {Object} [options.parentScope]
       * @return {Promise}
       */
      createPopover: function(page, options) {
        options = options || {};

        if (!page) {
          throw new Error('Page url must be defined.');
        }

        var popover = angular.element('<ons-popover>'),
          $onsen = this._getOnsenService();

        angular.element(document.body).append(angular.element(popover));

        return $onsen.getPageHTMLAsync(page).then(function(html) {
          var div = document.createElement('div');
          div.innerHTML = html;

          var el = angular.element(div.querySelector('ons-popover'));

          // Copy attributes and insert html.
          var attrs = el.prop('attributes');
          for (var i = 0, l = attrs.length; i < l; i++) {
            popover.attr(attrs[i].name, attrs[i].value); 
          }
          popover.html(el.html());

          var parentScope;
          if (options.parentScope) {
            parentScope = options.parentScope.$new();
            ons.$compile(popover)(parentScope);
          }
          else {
            ons.compile(popover[0]);
          }

          if (el.attr('disabled')) {
            popover.attr('disabled', 'disabled');
          }

          var deferred = ons._qService.defer();

          popover.on('ons-popover:init', function(e) {
            // Copy "style" attribute from parent.
            var child = popover[0].querySelector('.popover');
            if (el[0].hasAttribute('style')) {
              var parentStyle = el[0].getAttribute('style'),
                childStyle = child.getAttribute('style'),
                newStyle = (function(a, b) {
                var c =
                  (a.substr(-1) === ';' ? a : a + ';') + 
                  (b.substr(-1) === ';' ? b : b + ';'); 
                return c;
              })(parentStyle, childStyle);
  
              child.setAttribute('style', newStyle);
            }

            if (parentScope) {
              e.component._parentScope = parentScope;
            }

            deferred.resolve(e.component);
          });

          return deferred.promise;
        });
      }
    };
    return ons;
  }

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('AlertDialogView', ['$onsen', 'DialogAnimator', 'SlideDialogAnimator', 'AndroidAlertDialogAnimator', 'IOSAlertDialogAnimator', function($onsen, DialogAnimator, SlideDialogAnimator, AndroidAlertDialogAnimator, IOSAlertDialogAnimator) {

    var AlertDialogView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._element.css({
          display: 'none',
          zIndex: 20001
        });

        this._dialog = element;
        this._visible = false;
        this._doorLock = new DoorLock();

        this._animation = AlertDialogView._animatorDict[typeof attrs.animation !== 'undefined' ? 
          attrs.animation : 'default'];

        if (!this._animation) {
          throw new Error('No such animation: ' + attrs.animation);
        }

        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));
        this._createMask(attrs.maskColor);

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      /**
       * Show alert dialog.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Function} [options.callback] callback after dialog is shown
       */
      show: function(options) {
        options = options || {};
        var cancel = false,
          callback = options.callback || function() {};

        this.emit('preshow', {
          alertDialog: this,
          cancel: function() { cancel = true; }
        });
        
        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock(),
              animation = this._animation;

            this._mask.css('display', 'block');
            this._mask.css('opacity', 1);
            this._element.css('display', 'block');
            
            if (options.animation) {
              animation = AlertDialogView._animatorDict[options.animation];
            }
            
            animation.show(this, function() {
              this._visible = true;
              unlock();
              this.emit('postshow', {alertDialog: this});
              callback();
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * Hide alert dialog.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Function} [options.callback] callback after dialog is hidden
       */
      hide: function(options) {
        options = options || {};
        var cancel = false,
          callback = options.callback || function() {};
        
        this.emit('prehide', {
          alertDialog: this,
          cancel: function() { cancel = true; }
        });

        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock(),
              animation = this._animation;

            if (options.animation) {
              animation = AlertDialogView._animatorDict[options.animation];
            }

            animation.hide(this, function() {
              this._element.css('display', 'none');
              this._mask.css('display', 'none');
              this._visible = false;
              unlock();
              this.emit('posthide', {alertDialog: this});
              callback();
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * True if alert dialog is visible.
       *
       * @return {Boolean}
       */
      isShown: function() {
        return this._visible;
      },

      /**
       * Destroy alert dialog.
       */
      destroy: function() {
        if (this._parentScope) {
          this._parentScope.$destroy();
          this._parentScope = null;
        } else {
          this._scope.$destroy();
        }
      },

      _destroy: function() {
        this.emit('destroy');

        this._mask.off();

        this._element.remove();
        this._mask.remove();
        this._deviceBackButtonHandler.destroy();

        this._deviceBackButtonHandler = this._scope = this._attrs = this._element = this._mask = null;
      },

      /**
       * Disable or enable alert dialog.
       *
       * @param {Boolean} 
       */
      setDisabled: function(disabled) {
        if (typeof disabled !== 'boolean') {
          throw new Error('Argument must be a boolean.');
        }

        if (disabled) {
          this._element.attr('disabled', true);
        } else {
          this._element.removeAttr('disabled');
        }
      },

      /**
       * True if alert dialog is disabled.
       *
       * @return {Boolean}
       */
      isDisabled: function() {
        return this._element[0].hasAttribute('disabled');
      },

      /**
       * Make alert dialog cancelable or uncancelable. 
       *
       * @param {Boolean}
       */
      setCancelable: function(cancelable) {
        if (typeof cancelable !== 'boolean') {
          throw new Error('Argument must be a boolean.'); 
        }  

        if (cancelable) {
          this._element.attr('cancelable', true);
        } else {
          this._element.removeAttr('cancelable');
        }
      },

      isCancelable: function() {
        return this._element[0].hasAttribute('cancelable');
      },

      _cancel: function() {
        if (this.isCancelable()) {
          this.hide({
            callback: function () {
              this.emit('cancel');
            }.bind(this)
          });
        }
      },

      _onDeviceBackButton: function(event) {
        if (this.isCancelable()) {
          this._cancel.bind(this)();
        } else {
          event.callParentHandler();
        }
      },

      _createMask: function(color) {
        this._mask = angular.element('<div>').addClass('alert-dialog-mask').css({
          zIndex: 20000,
          display: 'none'
        });

        this._mask.on('click', this._cancel.bind(this));
 
        if (color) {
          this._mask.css('background-color', color);
        }

        angular.element(document.body).append(this._mask);
      }
    });

    AlertDialogView._animatorDict = {
      'default': $onsen.isAndroid() ? new AndroidAlertDialogAnimator() : new IOSAlertDialogAnimator(),
      'fade': $onsen.isAndroid() ? new AndroidAlertDialogAnimator() : new IOSAlertDialogAnimator(),
      'slide': new SlideDialogAnimator(),
      'none': new DialogAnimator()
    };

    /**
     * @param {String} name
     * @param {DialogAnimator} animator
     */
    AlertDialogView.registerAnimator = function(name, animator) {
      if (!(animator instanceof DialogAnimator)) {
        throw new Error('"animator" param must be an instance of DialogAnimator');
      }
      this._animatorDict[name] = animator;
    };

    MicroEvent.mixin(AlertDialogView);

    return AlertDialogView;
  }]);
})();



/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('AndroidAlertDialogAnimator', ['DialogAnimator', function(DialogAnimator) {

    /**
     * Android style animator for alert dialog.
     */
    var AndroidAlertDialogAnimator = DialogAnimator.extend({

      timing: 'cubic-bezier(.1, .7, .4, 1)',
      duration: 0.2, 

      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
      },

      /**
       * @param {Object} dialog
       * @param {Function} callback
       */
      show: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 0
            })
            .queue({
              opacity: 1.0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1.0)',
                opacity: 0.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)',
                opacity: 1.0
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })
        );
      },

      /**
       * @param {Object} dialog 
       * @param {Function} callback
       */
      hide: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 1.0
            })
            .queue({
              opacity: 0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)',
                opacity: 1.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0) scale3d(0.9, 0.9, 1.0)',
                opacity: 0.0
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })

        );
      }
    });

    return AndroidAlertDialogAnimator;
  }]);

})();



/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('AndroidDialogAnimator', ['DialogAnimator', function(DialogAnimator) {

    /**
     * Android style animator for dialog.
     */
    var AndroidDialogAnimator = DialogAnimator.extend({

      timing: 'ease-in-out',
      duration: 0.3, 

      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
      },

      /**
       * @param {Object} dialog
       * @param {Function} callback
       */
      show: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 0
            })
            .queue({
              opacity: 1.0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3d(-50%, -60%, 0)',
                opacity: 0.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0)',
                opacity: 1.0
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })
        );
      },

      /**
       * @param {Object} dialog 
       * @param {Function} callback
       */
      hide: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 1.0
            })
            .queue({
              opacity: 0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0)',
                opacity: 1.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(-50%, -60%, 0)',
                opacity: 0.0
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })

        );
      }
    });

    return AndroidDialogAnimator;
  }]);

})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('ButtonView', ['$onsen', function($onsen) {

    var ButtonView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;
      },

      /**
       * Start spinning.
       */
      startSpin: function() {
        this._attrs.$set('shouldSpin', 'true');
      },

      /**
       * Stop spinning.
       */
      stopSpin: function() {
        this._attrs.$set('shouldSpin', 'false');
      },

      /**
       * Returns whether button is spinning or not.
       */
      isSpinning: function() {
        return this._attrs.shouldSpin === 'true';
      },

      /**
       * Set spin animation.
       *
       * @param {String} animation type
       */
      setSpinAnimation: function(animation) {
        this._scope.$apply(function() {
          var animations = ['slide-left', 'slide-right', 'slide-up',
            'slide-down', 'expand-left', 'expand-right', 'expand-up',
            'expand-down', 'zoom-out', 'zoom-in'];

          if (animations.indexOf(animation) < 0) {
            console.warn('Animation ' + animation + 'doesn\'t exist.');
            animation = 'slide-left';
          }

          this._scope.animation = animation;
        }.bind(this));
      },
  
      /**
       * Returns whether the button is disabled or not.
       */
      isDisabled: function() {
        return this._element[0].hasAttribute('disabled');
      },

      /**
       * Disabled or enable button.
       */
      setDisabled: function(disabled) {
        if (typeof disabled !== 'boolean') {
          throw new Error('Argument must be a boolean.');
        }

        if (disabled) {
          this._element[0].setAttribute('disabled', '');
        } else {
          this._element[0].removeAttribute('disabled');
        }
      }

    });
    MicroEvent.mixin(ButtonView);

    return ButtonView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
:qaistributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('CarouselView', ['$onsen', function($onsen) {

    var VerticalModeTrait = {

      _getScrollDelta: function(event) {
        return event.gesture.deltaY;
      },

      _getScrollVelocity: function(event) {
        return event.gesture.velocityY;
      },

      _getElementSize: function() {
        if (!this._currentElementSize) {
          this._currentElementSize = this._element[0].getBoundingClientRect().height;
        }

        return this._currentElementSize;
      },

      _generateScrollTransform: function(scroll) {
        return 'translate3d(0px, ' + -scroll + 'px, 0px)';
      },

      _layoutCarouselItems: function() {
        var children = this._getCarouselItemElements();

        var sizeAttr = this._getCarouselItemSizeAttr();
        var sizeInfo = this._decomposeSizeString(sizeAttr);

        for (var i = 0; i < children.length; i++) {
          angular.element(children[i]).css({
            position: 'absolute',
            height: sizeAttr,
            width: '100%',
            visibility: 'visible',
            left: '0px',
            top: (i * sizeInfo.number) + sizeInfo.unit
          });
        }
      },
    };

    var HorizontalModeTrait = {

      _getScrollDelta: function(event) {
        return event.gesture.deltaX;
      },

      _getScrollVelocity: function(event) {
        return event.gesture.velocityX;
      },

      _getElementSize: function() {
        if (!this._currentElementSize) {
          this._currentElementSize = this._element[0].getBoundingClientRect().width;
        }

        return this._currentElementSize;
      },

      _generateScrollTransform: function(scroll) {
        return 'translate3d(' + -scroll + 'px, 0px, 0px)';
      },

      _layoutCarouselItems: function() {
        var children = this._getCarouselItemElements();

        var sizeAttr = this._getCarouselItemSizeAttr();
        var sizeInfo = this._decomposeSizeString(sizeAttr);
        
        for (var i = 0; i < children.length; i++) {
          angular.element(children[i]).css({
            position: 'absolute',
            width: sizeAttr,
            height: '100%',
            top: '0px',
            visibility: 'visible',
            left: (i * sizeInfo.number) + sizeInfo.unit
          });
        }
      },

    };

    /**
     * @class CarouselView
     */
    var CarouselView = Class.extend({

      /**
       * @member jqLite Object
       */
      _element: undefined,

      /**
       * @member {Object}
       */
      _scope: undefined,

      /**
       * @member {DoorLock}
       */
      _doorLock: undefined,

      /**
       * @member {Number}
       */
      _scroll: undefined,

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._doorLock = new DoorLock();
        this._scroll = 0;
        this._lastActiveIndex = 0;

        this._bindedOnDrag = this._onDrag.bind(this);
        this._bindedOnDragEnd = this._onDragEnd.bind(this);
        this._bindedOnResize = this._onResize.bind(this);

        this._mixin(this._isVertical() ? VerticalModeTrait : HorizontalModeTrait);

        this._prepareEventListeners();
        this._layoutCarouselItems();
        this._setupInitialIndex();

        this._attrs.$observe('direction', this._onDirectionChange.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));

        this._saveLastState();
      },

      _onResize: function() {
        this.refresh();
      },

      _onDirectionChange: function() {
         if (this._isVertical()) {
          this._element.css({
            overflowX: 'auto',
            overflowY: ''
          });
        }
        else {
          this._element.css({
            overflowX: '',
            overflowY: 'auto'
          });
        }
      },

      _saveLastState: function() {
        this._lastState = {
          elementSize: this._getCarouselItemSize(),
          carouselElementCount: this._getCarouselItemCount(),
          width: this._getCarouselItemSize() * this._getCarouselItemCount()
        };
      },

      /**
       * @return {Number}
       */
      _getCarouselItemSize: function() {
        var sizeAttr = this._getCarouselItemSizeAttr();
        var sizeInfo = this._decomposeSizeString(sizeAttr);
        var elementSize = this._getElementSize();

        if (sizeInfo.unit === '%') {
          return Math.round(sizeInfo.number / 100 * elementSize);
        } else if (sizeInfo.unit === 'px') {
          return sizeInfo.number;
        } else {
          throw new Error('Invalid state');
        }
      },

      /**
       * @return {Number}
       */
      _getInitialIndex: function() {
        var index = parseInt(this._element.attr('initial-index'), 10);

        if (typeof index === 'number' && !isNaN(index)) {
          return Math.max(Math.min(index, this._getCarouselItemCount() - 1), 0);
        } else {
          return 0;
        }
      },

      /**
       * @return {String}
       */
      _getCarouselItemSizeAttr: function() {
        var attrName = 'item-' + (this._isVertical() ? 'height' : 'width');
        var itemSizeAttr = ('' + this._element.attr(attrName)).trim();

        return itemSizeAttr.match(/^\d+(px|%)$/) ? itemSizeAttr : '100%';
      },

      /**
       * @return {Object}
       */
      _decomposeSizeString: function(size) {
        var matches = size.match(/^(\d+)(px|%)/);

        return {
          number: parseInt(matches[1], 10),
          unit: matches[2],
        };
      },

      _setupInitialIndex: function() {
        this._scroll = this._getCarouselItemSize() * this._getInitialIndex();
        this._lastActiveIndex = this._getInitialIndex();
        this._scrollTo(this._scroll);
      },

      /**
       * @param {Boolean} swipeable
       */
      setSwipeable: function(swipeable) {
        if (swipeable) {
          this._element[0].setAttribute('swipeable', '');
        } else {
          this._element[0].removeAttribute('swipeable');
        }
      },

      /**
       * @return {Boolean}
       */
      isSwipeable: function() {
        return this._element[0].hasAttribute('swipeable');
      },

      /**
       * @param {Number} ratio
       */
      setAutoScrollRatio: function(ratio) {
        if (ratio < 0.0 || ratio > 1.0) {
          throw new Error('Invalid ratio.');
        }

        this._element[0].setAttribute('auto-scroll-ratio', ratio);
      },

      /**
       * @return {Number}
       */
      getAutoScrollRatio: function(ratio) {
        var attr = this._element[0].getAttribute('auto-scroll-ratio');

        if (!attr) {
          return 0.5;
        }

        var scrollRatio = parseFloat(attr);
        if (scrollRatio < 0.0 || scrollRatio > 1.0) {
          throw new Error('Invalid ratio.');
        }

        return isNaN(scrollRatio) ? 0.5 : scrollRatio;
      },

      /**
       * @param {Number} index
       * @param {Object} [options]
       * @param {Function} [options.callback]
       * @param {String} [options.animation]
       */
      setActiveCarouselItemIndex: function(index, options) {
        options = options || {};

        index = Math.max(0, Math.min(index, this._getCarouselItemCount() - 1));
        var scroll = this._getCarouselItemSize() * index;
        var max = this._calculateMaxScroll();

        this._scroll = Math.max(0, Math.min(max, scroll));
        this._scrollTo(this._scroll, {animate: options.animation !== 'none', callback: options.callback});

        this._tryFirePostChangeEvent();
      },

      /**
       * @return {Number}
       */
      getActiveCarouselItemIndex: function() {
        var scroll = this._scroll;
        var count = this._getCarouselItemCount();
        var size = this._getCarouselItemSize();

        if (scroll < 0) {
          return 0;
        }

        for (var i = 0; i < count; i++) {
          if (size * i <= scroll && size * (i + 1) > scroll) {
            return i;
          }
        }

        // max carousel index
        return i;
      },

      /**
       * @param {Object} [options]
       * @param {Function} [options.callback]
       * @param {String} [options.animation]
       */
      next: function(options) {
        this.setActiveCarouselItemIndex(this.getActiveCarouselItemIndex() + 1, options);
      },

      /**
       * @param {Object} [options]
       * @param {Function} [options.callback]
       * @param {String} [options.animation]
       */
      prev: function(options) {
        this.setActiveCarouselItemIndex(this.getActiveCarouselItemIndex() - 1, options);
      },

      /**
       * @param {Boolean} enabled
       */
      setAutoScrollEnabled: function(enabled) {
        if (enabled) {
          this._element[0].setAttribute('auto-scroll', '');
        } else {
          this._element[0].removeAttribute('auto-scroll');
        }
      },

      /**
       * @param {Boolean} enabled
       */
      isAutoScrollEnabled: function(enabled) {
        return this._element[0].hasAttribute('auto-scroll');
      },

      /**
       * @param {Boolean} disabled
       */
      setDisabled: function(disabled) {
        if (disabled) {
          this._element[0].setAttribute('disabled', '');
        } else {
          this._element[0].removeAttribute('disabled');
        }
      },

      /**
       * @return {Boolean}
       */
      isDisabled: function() {
        return this._element[0].hasAttribute('disabled');
      },

      /**
       * @param {Boolean} scrollable
       */
      setOverscrollable: function(scrollable) {
        if (scrollable) {
          this._element[0].setAttribute('overscrollable', '');
        } else {
          this._element[0].removeAttribute('overscrollable');
        }
      },

      /**
       * @param {Object} trait
       */
      _mixin: function(trait) {
        Object.keys(trait).forEach(function(key) {
          this[key] = trait[key];
        }.bind(this));
      },

      /**
       * @return {Boolean}
       */
      _isEnabledChangeEvent: function() {
        var elementSize = this._getElementSize();
        var carouselItemSize = this._getCarouselItemSize();

        return this.isAutoScrollEnabled() && elementSize === carouselItemSize;
      },

      /**
       * @return {Boolean}
       */
      _isVertical: function() {
        return this._element.attr('direction') === 'vertical';
      },

      _prepareEventListeners: function() {
        this._hammer = new Hammer(this._element[0], {
          dragMinDistance: 1
        });

        this._hammer.on('drag dragleft dragright dragup dragdown swipe swipeleft swiperight swipeup swipedown', this._bindedOnDrag);
        this._hammer.on('dragend', this._bindedOnDragEnd);

        angular.element(window).on('resize', this._bindedOnResize);
      },

      _tryFirePostChangeEvent: function() {
        var currentIndex = this.getActiveCarouselItemIndex();

        if (this._lastActiveIndex !== currentIndex) {
          var lastActiveIndex = this._lastActiveIndex;
          this._lastActiveIndex = currentIndex;

          this.emit('postchange', {
            carousel: this,
            activeIndex: currentIndex,
            lastActiveIndex: lastActiveIndex
          });
        }
      },

      _onDrag: function(event) {
        if (!this.isSwipeable()) {
          return;
        }

        var direction = event.gesture.direction;
        if ((this._isVertical() && (direction === 'left' || direction === 'right')) || (!this._isVertical() && (direction === 'up' || direction === 'down'))) {
          return;
        }

        event.stopPropagation();

        this._lastDragEvent = event;

        var scroll = this._scroll - this._getScrollDelta(event);
        this._scrollTo(scroll);
        event.gesture.preventDefault();

        this._tryFirePostChangeEvent();
      },

      _onDragEnd: function(event) {
        this._currentElementSize = undefined;
        this._carouselItemElements = undefined;

        if (!this.isSwipeable()) {
          return;
        }

        this._scroll = this._scroll - this._getScrollDelta(event);

        if (this._getScrollDelta(event) !== 0) {
          event.stopPropagation();
        }

        if (this._isOverScroll(this._scroll)) {
          var waitForAction = false;

          this.emit('overscroll', {
            carousel: this,
            activeIndex: this.getActiveCarouselItemIndex(),
            direction: this._getOverScrollDirection(),
            waitToReturn: function(promise) {
              waitForAction = true;
              promise.then(
                function() {
                  this._scrollToKillOverScroll();
                }.bind(this)
              );
            }.bind(this)
          });

          if (!waitForAction) {
            this._scrollToKillOverScroll();
          }
        } else {
          this._startMomemtumScroll(event);
        }
        this._lastDragEvent = null;
        event.gesture.preventDefault();
      },

      _getTouchEvents: function() {
        var EVENTS = [
          'drag', 'dragstart', 'dragend',
          'dragup', 'dragdown', 'dragleft', 
          'dragright', 'swipe', 'swipeup',
          'swipedown', 'swipeleft', 'swiperight'
        ];

        return EVENTS.join(' ');
      },

      /**
       * @return {Boolean}
       */
      isOverscrollable: function() {
        return this._element[0].hasAttribute('overscrollable');
      },

      _startMomemtumScroll: function(event) {
        if (this._lastDragEvent) {
          var velocity = this._getScrollVelocity(this._lastDragEvent);
          var duration = 0.3;
          var scrollDelta = duration * 100 * velocity;
          var scroll = this._scroll + (this._getScrollDelta(this._lastDragEvent) > 0 ? -scrollDelta : scrollDelta);
          scroll = this._normalizeScrollPosition(scroll);

          this._scroll = scroll;

          animit(this._getCarouselItemElements())
            .queue({
              transform: this._generateScrollTransform(this._scroll)
            }, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue(function(done) {
              done();
              this._tryFirePostChangeEvent();
            }.bind(this))
            .play();
        }
      },

      _normalizeScrollPosition: function(scroll) {
        var max = this._calculateMaxScroll();

        if (this.isAutoScrollEnabled()) {
          var arr = [];
          var size = this._getCarouselItemSize();

          for (var i = 0; i < this._getCarouselItemCount(); i++) {
            if (max >= i * size) { 
              arr.push(i * size);
            }
          }
          arr.push(max);

          arr.sort(function(left, right) {
            left = Math.abs(left - scroll);
            right = Math.abs(right - scroll);

            return left - right;
          });

          arr = arr.filter(function(item, pos) {
            return !pos || item != arr[pos - 1];
          });

          var lastScroll = this._lastActiveIndex * size,
            scrollRatio = Math.abs(scroll - lastScroll) / size;

          if (scrollRatio <= this.getAutoScrollRatio()) {
            return lastScroll;
          }
          else if (scrollRatio > this.getAutoScrollRatio() && scrollRatio < 1.0) {
            if (arr[0] === lastScroll && arr.length > 1) {
              return arr[1];
            }
          }

          return arr[0];
        } else {
          return Math.max(0, Math.min(max, scroll));
        }
      },

      /**
       * @return {Array}
       */
      _getCarouselItemElements: function() {
        var nodeList = this._element[0].querySelectorAll('ons-carousel-item'),
          rv = [];

        for (var i = nodeList.length; i--; ) {
          rv.unshift(nodeList[i]);
        }

        return rv;
      },

      /**
       * @param {Number} scroll
       * @param {Object} [options]
       */
      _scrollTo: function(scroll, options) {
        options = options || {};
        var self = this;
        var isOverscrollable = this.isOverscrollable();

        if (options.animate) {
          animit(this._getCarouselItemElements())
            .queue({
              transform: this._generateScrollTransform(normalizeScroll(scroll))
            }, {
              duration: 0.3,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play(options.callback);
        } else {
          animit(this._getCarouselItemElements())
            .queue({
              transform: this._generateScrollTransform(normalizeScroll(scroll))
            })
            .play(options.callback);
        }

        function normalizeScroll(scroll) {
          var ratio = 0.35;

          if (scroll < 0) {
            return isOverscrollable ? Math.round(scroll * ratio) : 0;
          }

          var maxScroll = self._calculateMaxScroll();
          if (maxScroll < scroll) {
            return isOverscrollable ? maxScroll + Math.round((scroll - maxScroll) * ratio) : maxScroll;
          }

          return scroll;
        }
      },

      _calculateMaxScroll: function() {
        var max = this._getCarouselItemCount() * this._getCarouselItemSize() - this._getElementSize();
        return Math.ceil(max < 0 ? 0 : max); // Need to return an integer value.
      },

      _isOverScroll: function(scroll) {
        if (scroll < 0 || scroll > this._calculateMaxScroll()) {
          return true;
        }
        return false;
      },

      _getOverScrollDirection: function() {
        if (this._isVertical()) {
          if (this._scroll <= 0) {
            return 'up';
          }
          else {
            return 'down';
          }
        }
        else {
          if (this._scroll <= 0) {
            return 'left';
          }
          else {
            return 'right';
          }
        }
      },

      _scrollToKillOverScroll: function() {
        var duration = 0.4;
        
        if (this._scroll < 0) {
          animit(this._getCarouselItemElements())
            .queue({
              transform: this._generateScrollTransform(0)
            }, {
              duration: duration,
              timing: 'cubic-bezier(.1, .4, .1, 1)'
            })
            .play();
          this._scroll = 0;
          return;
        }

        var maxScroll = this._calculateMaxScroll();

        if (maxScroll < this._scroll) {
          animit(this._getCarouselItemElements())
            .queue({
              transform: this._generateScrollTransform(maxScroll)
            }, {
              duration: duration,
              timing: 'cubic-bezier(.1, .4, .1, 1)'
            })
            .play();
          this._scroll = maxScroll;
          return;
        }

        return;
      },

      /**
       * @return {Number}
       */
      _getCarouselItemCount: function() {
        return this._getCarouselItemElements().length;
      },

      /**
       * Refresh carousel item layout.
       */
      refresh: function() {
        // Bug fix
        if (this._getCarouselItemSize() === 0) {
          return;
        }

        this._mixin(this._isVertical() ? VerticalModeTrait : HorizontalModeTrait);
        this._layoutCarouselItems();

        if (this._lastState && this._lastState.width > 0) {
          var scroll = this._scroll;

          if (this._isOverScroll(scroll)) {
            this._scrollToKillOverScroll();
          } 
          else {
            if (this.isAutoScrollEnabled()) {
              scroll = this._normalizeScrollPosition(scroll);
            }

            this._scrollTo(scroll);
          }
        }

        this._saveLastState();

        this.emit('refresh', {
          carousel: this
        });
      },

      /**
       */
      first: function() {
        this.setActiveCarouselItemIndex(0);
      },

      /**
       */
      last: function() {
        this.setActiveCarouselItemIndex(
          Math.max(this._getCarouselItemCount() - 1, 0)
        );
      },

      _destroy: function() {
        this.emit('destroy');

        this._hammer.off('drag dragleft dragright dragup dragdown swipe swipeleft swiperight swipeup swipedown', this._bindedOnDrag);
        this._hammer.off('dragend', this._bindedOnDragEnd);

        angular.element(window).off('resize', this._bindedOnResize);

        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(CarouselView);

    return CarouselView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('DialogView', ['$onsen', 'DialogAnimator', 'IOSDialogAnimator', 'AndroidDialogAnimator', 'SlideDialogAnimator', function($onsen, DialogAnimator, IOSDialogAnimator, AndroidDialogAnimator, SlideDialogAnimator) {

    var DialogView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._element.css('display', 'none');

        this._dialog = angular.element(element[0].querySelector('.dialog'));
        this._mask = angular.element(element[0].querySelector('.dialog-mask'));

        this._dialog.css('z-index', 20001);
        this._mask.css('z-index', 20000);

        this._mask.on('click', this._cancel.bind(this));

        this._visible = false;
        this._doorLock = new DoorLock();

        this._animation = DialogView._animatorDict[typeof attrs.animation !== 'undefined' ? 
          attrs.animation : 'default'];

        if (!this._animation) {
          throw new Error('No such animation: ' + attrs.animation);
        }

        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      /**
       *  @return {Object}
       */
      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
      },

      /**
       * Show dialog.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Function} [options.callback] callback after dialog is shown
       */
      show: function(options) {
        options = options || {};
        var cancel = false,
          callback = options.callback || function() {};

        this.emit('preshow', {
          dialog: this,
          cancel: function() { cancel = true; }
        });
        
        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock(),
              animation = this._animation;

            this._element.css('display', 'block');
            this._mask.css('opacity', 1);

            if (options.animation) {
              animation = DialogView._animatorDict[options.animation];
            }
            
            animation.show(this, function() {
              this._visible = true;
              unlock();
              this.emit('postshow', {dialog: this});
              callback();
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * Hide dialog.
       *
       * @param {Object} [options]
       * @param {String} [options.animation] animation type
       * @param {Function} [options.callback] callback after dialog is hidden
       */
      hide: function(options) {
        options = options || {};
        var cancel = false,
          callback = options.callback || function() {};
        
        this.emit('prehide', {
          dialog: this,
          cancel: function() { cancel = true; }
        });

        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock(),
              animation = this._animation;

            if (options.animation) {
              animation = DialogView._animatorDict[options.animation];
            }

            animation.hide(this, function() {
              this._element.css('display', 'none');
              this._visible = false;
              unlock();
              this.emit('posthide', {dialog: this});
              callback();
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * True if dialog is visible.
       *
       * @return {Boolean}
       */
      isShown: function() {
        return this._visible;
      },

      /**
       * Destroy dialog.
       */
      destroy: function() {
        if (this._parentScope) {
          this._parentScope.$destroy();
          this._parentScope = null;
        } else {
          this._scope.$destroy();
        }
      },

      _destroy: function() {
        this.emit('destroy');

        this._element.remove();
        this._deviceBackButtonHandler.destroy();
        this._mask.off();

        this._deviceBackButtonHandler = this._scope = this._attrs = this._element = this._dialog = this._mask = null;
      },

      /**
       * Disable or enable dialog.
       *
       * @param {Boolean} 
       */
      setDisabled: function(disabled) {
        if (typeof disabled !== 'boolean') {
          throw new Error('Argument must be a boolean.');
        }

        if (disabled) {
          this._element.attr('disabled', true);
        } else {
          this._element.removeAttr('disabled');
        }
      },

      /**
       * True if dialog is disabled.
       *
       * @return {Boolean}
       */
      isDisabled: function() {
        return this._element[0].hasAttribute('disabled');
      },

      /**
       * Make dialog cancelable or uncancelable. 
       *
       * @param {Boolean}
       */
      setCancelable: function(cancelable) {
        if (typeof cancelable !== 'boolean') {
          throw new Error('Argument must be a boolean.'); 
        }  

        if (cancelable) {
          this._element.attr('cancelable', true);
        } else {
          this._element.removeAttr('cancelable');
        }
      },

      /**
       * True if the dialog is cancelable.
       *
       * @return {Boolean}
       */
      isCancelable: function() {
        return this._element[0].hasAttribute('cancelable');
      },

      _cancel: function() {
        if (this.isCancelable()) {
          this.hide({
            callback: function () {
              this.emit('cancel');
            }.bind(this)
          });
        }
      },

      _onDeviceBackButton: function(event) {
        if (this.isCancelable()) {
          this._cancel.bind(this)();
        } else {
          event.callParentHandler();
        }
      }
    });

    DialogView._animatorDict = {
      'default': $onsen.isAndroid() ? new AndroidDialogAnimator() : new IOSDialogAnimator(),
      'fade': $onsen.isAndroid() ? new AndroidDialogAnimator() : new IOSDialogAnimator(),
      'slide': new SlideDialogAnimator(),
      'none': new DialogAnimator()
    };

    /**
     * @param {String} name
     * @param {DialogAnimator} animator
     */
    DialogView.registerAnimator = function(name, animator) {
      if (!(animator instanceof DialogAnimator)) {
        throw new Error('"animator" param must be an instance of DialogAnimator');
      }
      this._animatorDict[name] = animator;
    };

    MicroEvent.mixin(DialogView);

    return DialogView;
  }]);
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('DialogAnimator', function() {
    var DialogAnimator = Class.extend({
      show: function(dialog, callback) {
        callback();
      },

      hide: function(dialog, callback) {
        callback();
      }
    });

    return DialogAnimator;
  });
})();



/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('FadePopoverAnimator', ['PopoverAnimator', function(PopoverAnimator) {

    /**
    * Fade animator for popover.
    */
    var FadePopoverAnimator = PopoverAnimator.extend({

      timing: 'cubic-bezier(.1, .7, .4, 1)',
      duration: 0.2, 

      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
      },

      /**
      * @param {Object} popover 
      * @param {Function} callback
      */
      show: function(popover, callback) {
        var pop = popover._element[0].querySelector('.popover'),
        mask = popover._element[0].querySelector('.popover-mask');

        animit.runAll(
          animit(mask)
          .queue({
            opacity: 0
          })
          .queue({
            opacity: 1.0 
          }, {
            duration: this.duration,
            timing: this.timing
          }),

          animit(pop)
          .queue({
            transform: 'scale3d(1.3, 1.3, 1.0)',
            opacity: 0
          })
          .queue({
            transform: 'scale3d(1.0, 1.0,  1.0)',
            opacity: 1.0 
          }, {
            duration: this.duration,
            timing: this.timing
          })
          .resetStyle()
          .queue(function(done) {
            callback();
            done();
          })
        );
      },

      /**
      * @param {Object} popover 
      * @param {Function} callback
      */
      hide: function(popover, callback) {
        var pop = popover._element[0].querySelector('.popover'),
          mask = popover._element[0].querySelector('.popover-mask');

        animit.runAll(
          animit(mask)
          .queue({
            opacity: 1.0
          })
          .queue({
            opacity: 0 
          }, {
            duration: this.duration,
            timing: this.timing
          }),

          animit(pop)
          .queue({
            opacity: 1.0
          })
          .queue({
            opacity: 0 
          }, {
            duration: this.duration,
            timing: this.timing
          })
          .resetStyle()
          .queue(function(done) {
            callback();
            done();
          })
        );
      }
    });

    return FadePopoverAnimator;
  }]);

})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('FadeTransitionAnimator', ['NavigatorTransitionAnimator', function(NavigatorTransitionAnimator) {

    /**
     * Fade-in screen transition.
     */
    var FadeTransitionAnimator = NavigatorTransitionAnimator.extend({

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} callback
       */
      push: function(enterPage, leavePage, callback) {

        animit.runAll(

          animit([enterPage.getPageView().getContentElement(), enterPage.getPageView().getBackgroundElement()])
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: 0.4,
              timing: 'linear'
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            }),

          animit(enterPage.getPageView().getToolbarElement())
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: 0.4,
              timing: 'linear'
            })
            .resetStyle()
        );

      },

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} done
       */
      pop: function(enterPage, leavePage, callback) {
        animit.runAll(

          animit([leavePage.getPageView().getContentElement(), leavePage.getPageView().getBackgroundElement()])
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: 0.4,
              timing: 'linear'
            })
            .queue(function(done) {
              callback();
              done();
            }),

          animit(leavePage.getPageView().getToolbarElement())
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 0
              },
              duration: 0.4,
              timing: 'linear'
            })

        );
      }
    });

    return FadeTransitionAnimator;
  }]);

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('GenericView', ['$onsen', function($onsen) {

    var GenericView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
      }
    });
    MicroEvent.mixin(GenericView);

    return GenericView;
  }]);
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('IOSAlertDialogAnimator', ['DialogAnimator', function(DialogAnimator) {

    /**
     * iOS style animator for alert dialog.
     */
    var IOSAlertDialogAnimator = DialogAnimator.extend({

      timing: 'cubic-bezier(.1, .7, .4, 1)',
      duration: 0.2, 

      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
      },

      /**
       * @param {Object} dialog
       * @param {Function} callback
       */
      show: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 0
            })
            .queue({
              opacity: 1.0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0) scale3d(1.3, 1.3, 1.0)',
                opacity: 0.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0) scale3d(1.0, 1.0, 1.0)',
                opacity: 1.0
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })
        );
      },

      /**
       * @param {Object} dialog 
       * @param {Function} callback
       */
      hide: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 1.0
            })
            .queue({
              opacity: 0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                opacity: 1.0
              },
              duration: 0
            })
            .queue({
              css: {
                opacity: 0.0
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })

        );
      }
    });

    return IOSAlertDialogAnimator;
  }]);

})();



/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('IOSDialogAnimator', ['DialogAnimator', function(DialogAnimator) {

    /**
     * iOS style animator for dialog.
     */
    var IOSDialogAnimator = DialogAnimator.extend({

      timing: 'ease-in-out',
      duration: 0.3, 

      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
      },

      /**
       * @param {Object} dialog
       * @param {Function} callback
       */
      show: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 0
            })
            .queue({
              opacity: 1.0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3d(-50%, 300%, 0)'
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0)'
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })
        );
      },

      /**
       * @param {Object} dialog 
       * @param {Function} callback
       */
      hide: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 1.0
            })
            .queue({
              opacity: 0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3d(-50%, -50%, 0)'
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3d(-50%, 300%, 0)'
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })

        );
      }
    });

    return IOSDialogAnimator;
  }]);

})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('IOSSlideTransitionAnimator', ['NavigatorTransitionAnimator', 'PageView', function(NavigatorTransitionAnimator, PageView) {

    /**
     * Slide animator for navigator transition like iOS's screen slide transition.
     */
    var IOSSlideTransitionAnimator = NavigatorTransitionAnimator.extend({

      /** Black mask */
      backgroundMask : angular.element(
        '<div style="position: absolute; width: 100%;' +
        'height: 100%; background-color: black; opacity: 0;"></div>'
      ),

      _decompose: function(page) {
        var elements = [];

        var left = page.getPageView().getToolbarLeftItemsElement();
        var right = page.getPageView().getToolbarRightItemsElement();

        var other = []
          .concat(left.children.length === 0 ? left : excludeBackButtonLabel(left.children))
          .concat(right.children.length === 0 ? right : excludeBackButtonLabel(right.children));


        var pageLabels = [
          page.getPageView().getToolbarCenterItemsElement(),
          page.getPageView().getToolbarBackButtonLabelElement()
        ];

        return {
          pageLabels: pageLabels,
          other: other,
          content: page.getPageView().getContentElement(),
          background: page.getPageView().getBackgroundElement(),
          toolbar: page.getPageView().getToolbarElement(),
          bottomToolbar: page.getPageView().getBottomToolbarElement()
        };

        function excludeBackButtonLabel(elements) {
          var result = [];

          for (var i = 0; i < elements.length; i++) {
            if (elements[i].nodeName.toLowerCase() === 'ons-back-button') {
              result.push(elements[i].querySelector('.ons-back-button__icon'));
            } else {
              result.push(elements[i]);
            }
          }

          return result;
        }
      },

      _shouldAnimateToolbar: function(enterPage, leavePage) {
        var bothPageHasToolbar =
          enterPage.getPageView().hasToolbarElement() &&
          leavePage.getPageView().hasToolbarElement();

        var noAndroidLikeToolbar =
          !angular.element(enterPage.getPageView().getToolbarElement()).hasClass('navigation-bar--android') &&
          !angular.element(leavePage.getPageView().getToolbarElement()).hasClass('navigation-bar--android');

        return bothPageHasToolbar && noAndroidLikeToolbar;
      },

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} callback
       */
      push: function(enterPage, leavePage, callback) {
        var mask = this.backgroundMask.remove();
        leavePage.element[0].parentNode.insertBefore(mask[0], leavePage.element[0].nextSibling);

        var enterPageDecomposition = this._decompose(enterPage);
        var leavePageDecomposition = this._decompose(leavePage);

        var delta = (function() {
          var rect = leavePage.element[0].getBoundingClientRect();
          return Math.round(((rect.right - rect.left) / 2) * 0.6);
        })();

        var maskClear = animit(mask[0])
          .queue({
            opacity: 0,
            transform: 'translate3d(0, 0, 0)'
          })
          .queue({
            opacity: 0.1
          }, {
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle()
          .queue(function(done) {
            mask.remove();
            done();
          });

        var shouldAnimateToolbar = this._shouldAnimateToolbar(enterPage, leavePage);

        if (shouldAnimateToolbar) {
          enterPage.element.css({zIndex: 'auto'});
          leavePage.element.css({zIndex: 'auto'});

          animit.runAll(

            maskClear,

            animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar, enterPageDecomposition.background])
              .queue({
                css: {
                  transform: 'translate3D(100%, 0px, 0px)',
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3D(0px, 0px, 0px)',
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle(),

            animit(enterPageDecomposition.toolbar)
              .queue({
                css: {
                  background: 'none',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: 'rgba(0, 0, 0, 0)'
                },
                duration: 0
              })
              .wait(0.3)
              .resetStyle({
                duration: 0.1,
                transition:
                  'background-color 0.1s linear, ' + 
                  'border-color 0.1s linear'
              }),

            animit(enterPageDecomposition.pageLabels)
              .queue({
                css: {
                  transform: 'translate3d(' + delta + 'px, 0, 0)',
                  opacity: 0
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3d(0, 0, 0)',
                  opacity: 1.0
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle(),

            animit(enterPageDecomposition.other)
              .queue({
                css: {opacity: 0},
                duration: 0
              })
              .queue({
                css: {opacity: 1},
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle(),

            animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar, leavePageDecomposition.background])
              .queue({
                css: {
                  transform: 'translate3D(0, 0, 0)',
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3D(-25%, 0px, 0px)',
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle()
              .queue(function(done) {
                enterPage.element.css({zIndex: ''});
                leavePage.element.css({zIndex: ''});
                callback();
                done();
              }),

            animit(leavePageDecomposition.pageLabels)
              .queue({
                css: {
                  transform: 'translate3d(0, 0, 0)',
                  opacity: 1.0
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3d(-' + delta + 'px, 0, 0)',
                  opacity: 0,
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle(),

            animit(leavePageDecomposition.other)
              .queue({
                css: {opacity: 1},
                duration: 0
              })
              .queue({
                css: {opacity: 0},
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle()

          );

        } else {

          animit.runAll(

            maskClear,

            animit(enterPage.element[0])
              .queue({
                css: {
                  transform: 'translate3D(100%, 0px, 0px)',
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3D(0px, 0px, 0px)',
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle(),

            animit(leavePage.element[0])
              .queue({
                css: {
                  transform: 'translate3D(0, 0, 0)'
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3D(-25%, 0px, 0px)'
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle()
              .queue(function(done) {
                callback();
                done();
              })
          );

        }
      },

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} done
       */
      pop: function(enterPage, leavePage, done) {
        var mask = this.backgroundMask.remove();
        enterPage.element[0].parentNode.insertBefore(mask[0], enterPage.element[0].nextSibling);

        var enterPageDecomposition = this._decompose(enterPage);
        var leavePageDecomposition = this._decompose(leavePage);

        var delta = (function() {
          var rect = leavePage.element[0].getBoundingClientRect();
          return Math.round(((rect.right - rect.left) / 2) * 0.6);
        })();

        var maskClear = animit(mask[0])
          .queue({
            opacity: 0.1,
            transform: 'translate3d(0, 0, 0)'
          })
          .queue({
            opacity: 0
          }, {
            duration: 0.4,
            timing: 'cubic-bezier(.1, .7, .1, 1)'
          })
          .resetStyle()
          .queue(function(done) {
            mask.remove();
            done();
          });

        var shouldAnimateToolbar = this._shouldAnimateToolbar(enterPage, leavePage);

        if (shouldAnimateToolbar) {

          enterPage.element.css({zIndex: 'auto'});
          leavePage.element.css({zIndex: 'auto'});

          animit.runAll(

            maskClear,

            animit([enterPageDecomposition.content, enterPageDecomposition.bottomToolbar, enterPageDecomposition.background])
              .queue({
                css: {
                  transform: 'translate3D(-25%, 0px, 0px)',
                  opacity: 0.9
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3D(0px, 0px, 0px)',
                  opacity: 1.0
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle(),

            animit(enterPageDecomposition.pageLabels)
              .queue({
                css: {
                  transform: 'translate3d(-' + delta + 'px, 0, 0)',
                  opacity: 0
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3d(0, 0, 0)',
                  opacity: 1.0
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle(),

            animit(enterPageDecomposition.toolbar)
              .queue({
                css: {
                  transform: 'translate3d(0, 0, 0)',
                  opacity: 1.0
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3d(0, 0, 0)',
                  opacity: 1.0
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle(),

            animit(enterPageDecomposition.other)
              .queue({
                css: {opacity: 0},
                duration: 0
              })
              .queue({
                css: {opacity: 1},
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle(),

            animit([leavePageDecomposition.content, leavePageDecomposition.bottomToolbar, leavePageDecomposition.background])
              .queue({
                css: {
                  transform: 'translate3D(0px, 0px, 0px)'
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3D(100%, 0px, 0px)'
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .wait(0)
              .queue(function(finish) {
                enterPage.element.css({zIndex: ''});
                leavePage.element.css({zIndex: ''});
                done();
                finish();
              }),

            animit(leavePageDecomposition.other)
              .queue({
                css: {
                  transform: 'translate3d(0, 0, 0)',
                  opacity: 1
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3d(0, 0, 0)',
                  opacity: 0,
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              }),

            animit(leavePageDecomposition.toolbar)
              .queue({
                css: {
                  background: 'none',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: 'rgba(0, 0, 0, 0)'
                },
                duration: 0
              }),

            animit(leavePageDecomposition.pageLabels)
              .queue({
                css: {
                  transform: 'translate3d(0, 0, 0)',
                  opacity: 1.0
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3d(' + delta + 'px, 0, 0)',
                  opacity: 0,
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
          );
        } else {

          animit.runAll(

            maskClear,

            animit(enterPage.element[0])
              .queue({
                css: {
                  transform: 'translate3D(-25%, 0px, 0px)',
                  opacity: 0.9
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3D(0px, 0px, 0px)',
                  opacity: 1.0
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .resetStyle(),

            animit(leavePage.element[0])
              .queue({
                css: {
                  transform: 'translate3D(0px, 0px, 0px)'
                },
                duration: 0
              })
              .queue({
                css: {
                  transform: 'translate3D(100%, 0px, 0px)'
                },
                duration: 0.4,
                timing: 'cubic-bezier(.1, .7, .1, 1)'
              })
              .queue(function(finish) {
                done();
                finish();
              })
          );
        }
      }
    });

    return IOSSlideTransitionAnimator;
  }]);

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('LazyRepeatView', ['$onsen', '$document', '$compile', function($onsen, $document, $compile) {

    var LazyRepeatView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs, linker) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;
        this._linker = linker;

        this._parentElement = element.parent();
        this._pageContent = this._findPageContent();

        if (!this._pageContent) {
          throw new Error('ons-lazy-repeat must be a descendant of an <ons-page> object.');
        }

        this._itemHeightSum = [];
        this._maxIndex = 0;

        this._delegate = this._getDelegate();

        this._renderedElements = {};
        this._addEventListeners();

        this._scope.$watch(this._countItems.bind(this), this._onChange.bind(this));

        this._scope.$on('$destroy', this._destroy.bind(this));
        this._onChange();
      },

      _getDelegate: function() {
        var delegate = this._scope.$eval(this._attrs.onsLazyRepeat);

        if (typeof delegate === 'undefined') {
          /*jshint evil:true */
          delegate = eval(this._attrs.onsLazyRepeat);
        }

        return delegate;
      },

      _countItems: function() {
        return this._delegate.countItems();
      },

      _getItemHeight: function(i) {
        return this._delegate.calculateItemHeight(i);
      },
      
      _getTopOffset: function() {
        return this._parentElement[0].getBoundingClientRect().top;
      },

      _render: function() {
        var items = this._getItemsInView(),
          keep = {};

        this._parentElement.css('height', this._itemHeightSum[this._maxIndex] + 'px');

        for (var i = 0, l = items.length; i < l; i ++) {
          var _item = items[i];
          this._renderElement(_item);
          keep[_item.index] = true;
        }

        for (var key in this._renderedElements) {
          if (this._renderedElements.hasOwnProperty(key) && !keep.hasOwnProperty(key)) {
            this._removeElement(key);
          }
        }
      },

      _isRendered: function(i) {
        return this._renderedElements.hasOwnProperty(i);
      },
      
      _renderElement: function(item) {
        if (this._isRendered(item.index)) {
          // Update content even if it's already added to DOM
          // to account for changes within the list.
          var currentItem = this._renderedElements[item.index];

          if (this._delegate.configureItemScope) {
            this._delegate.configureItemScope(item.index, currentItem.scope);
          }

          // Fix position.
          var element = this._renderedElements[item.index].element;
          element[0].style.top = item.top + 'px';

          return;
        }

        var childScope = this._scope.$new();
        this._addSpecialProperties(item.index, childScope);

        this._linker(childScope, function(clone) {
          if (this._delegate.configureItemScope) {
            this._delegate.configureItemScope(item.index, childScope);
          }
          else if (this._delegate.createItemContent) {
            clone.append(this._delegate.createItemContent(item.index));
            $compile(clone[0].firstChild)(childScope);
          }

          this._parentElement.append(clone);

          clone.css({
            position: 'absolute',
            top: item.top + 'px',
            left: '0px',
            right: '0px',
            display: 'none'
          });

          var element = {
            element: clone,
            scope: childScope
          };

          // Don't show elements before they are finished rendering.
          this._scope.$evalAsync(function() {
            clone.css('display', 'block');
          });

          this._renderedElements[item.index] = element;
        }.bind(this));
      },

      _removeElement: function(i) {
        if (!this._isRendered(i)) {
          return;
        }

        var element = this._renderedElements[i];

        if (this._delegate.destroyItemScope) {
          this._delegate.destroyItemScope(i, element.scope);
        }
        else if (this._delegate.destroyItemContent) {
          this._delegate.destroyItemContent(i, element.element.children()[0]);
        }

        element.element.remove();
        element.scope.$destroy();
        element.element = element.scope = null;

        delete this._renderedElements[i];
      },

      _removeAllElements: function() {
        for (var key in this._renderedElements) {
          if (this._removeElement.hasOwnProperty(key)) {
            this._removeElement(key);
          }
        }
      },

      _calculateStartIndex: function(current) {
        var start = 0,
          end = this._maxIndex;

        // Binary search for index at top of screen so
        // we can speed up rendering.
        while (true) {
          var middle = Math.floor((start + end) / 2),
            value = current + this._itemHeightSum[middle];

          if (end < start) {
            return 0;
          }
          else if (value >= 0 && value - this._getItemHeight(middle) < 0) {
            return middle;
          }
          else if (isNaN(value) || value >= 0) {
            end = middle - 1;
          }
          else {
            start = middle + 1;
          }

        }
      },

      _recalculateItemHeightSum: function() {
        var sums = this._itemHeightSum;

        for (var i = 0, sum = 0; i < Math.min(sums.length, this._countItems()); i++) {
          sum += this._getItemHeight(i);
          sums[i] = sum;
        }
      },

      _getItemsInView: function() {
        var topOffset = this._getTopOffset(),
          topPosition = topOffset,
          cnt = this._countItems();

        if (cnt !== this._itemCount){
          this._recalculateItemHeightSum();
          this._maxIndex = cnt - 1;
        }
        this._itemCount = cnt;

        var startIndex = this._calculateStartIndex(topPosition);
        startIndex = Math.max(startIndex - 30, 0);

        if (startIndex > 0) {
          topPosition += this._itemHeightSum[startIndex - 1];
        }

        var items = [];
        for (var i = startIndex; i < cnt && topPosition < 4 * window.innerHeight; i++) {
          var h = this._getItemHeight(i);

          if (i >= this._itemHeightSum.length) {
            this._itemHeightSum = this._itemHeightSum.concat(new Array(100));
          }

          if (i > 0) {
            this._itemHeightSum[i] = this._itemHeightSum[i - 1] + h;
          }
          else {
            this._itemHeightSum[i] = h;
          }

          this._maxIndex = Math.max(i, this._maxIndex);

          items.push({
            index: i,
            top: topPosition - topOffset
          });

          topPosition += h;
        }

        return items;
      },

      _addSpecialProperties: function(i, scope) {
        scope.$index = i;
        scope.$first = i === 0;
        scope.$last = i === this._countItems() - 1;
        scope.$middle = !scope.$first && !scope.$last;
        scope.$even = i % 2 === 0;
        scope.$odd = !scope.$even;
      },

      _onChange: function() {
        this._render();
      },

      _findPageContent: function() {
        var e = this._element[0];

        while(e.parentNode) {
          e = e.parentNode;

          if (e.className) {
            if (e.className.split(/\s+/).indexOf('page__content') >= 0) {
              break;
            }
          }
        }

        return e;
      },

      _addEventListeners: function() {
        this._boundOnChange = this._onChange.bind(this);

        this._pageContent.addEventListener('scroll', this._boundOnChange, true);
        $document[0].addEventListener('resize', this._boundOnChange, true);
      },

      _removeEventListeners: function() {
        this._pageContent.removeEventListener('scroll', this._boundOnChange, true);
        $document[0].removeEventListener('resize', this._boundOnChange, true);
      },

      _destroy: function() {
        this._removeEventListeners();
        this._removeAllElements();
        this._parentElement = this._renderedElements = this._element = this._scope = this._attrs = null;
      }
    });

    return LazyRepeatView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('LiftTransitionAnimator', ['NavigatorTransitionAnimator', function(NavigatorTransitionAnimator) {

    /**
     * Lift screen transition.
     */
    var LiftTransitionAnimator = NavigatorTransitionAnimator.extend({

      /** Black mask */
      backgroundMask : angular.element(
        '<div style="position: absolute; width: 100%;' +
        'height: 100%; background-color: black;"></div>'
      ),

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} callback
       */
      push: function(enterPage, leavePage, callback) {
        var mask = this.backgroundMask.remove();
        leavePage.element[0].parentNode.insertBefore(mask[0], leavePage.element[0]);

        var maskClear = animit(mask[0])
          .wait(0.6)
          .queue(function(done) {
            mask.remove();
            done();
          });

        animit.runAll(

          maskClear,

          animit(enterPage.element[0])
            .queue({
              css: {
                transform: 'translate3D(0, 100%, 0)',
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .wait(0.2)
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            }),

          animit(leavePage.element[0])
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1.0
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, -10%, 0)',
                opacity: 0.9
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
        );

      },

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} callback
       */
      pop: function(enterPage, leavePage, callback) {
        var mask = this.backgroundMask.remove();
        enterPage.element[0].parentNode.insertBefore(mask[0], enterPage.element[0]);

        animit.runAll(

          animit(mask[0])
            .wait(0.4)
            .queue(function(done) {
              mask.remove();
              done();
            }),

          animit(enterPage.element[0])
            .queue({
              css: {
                transform: 'translate3D(0, -10%, 0)',
                opacity: 0.9
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
                opacity: 1.0
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .resetStyle()
            .wait(0.4)
            .queue(function(done) {
              callback();
              done();
            }),

          animit(leavePage.element[0])
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)'
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 100%, 0)'
              },
              duration: 0.4,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            
        );
      }
    });

    return LiftTransitionAnimator;
  }]);

})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('ModalView', ['$onsen', '$rootScope', function($onsen, $rootScope) {

    var ModalView = Class.extend({
      _element: undefined,
      _scope: undefined,

      /**
       * @param {Object} scope
       * @param {jqLite} element
       */
      init: function(scope, element) {
        this._scope = scope;
        this._element = element;

        var pageView = $rootScope.ons.findParentComponentUntil('ons-page', this._element);
        if (pageView) {
          this._pageContent = angular.element(pageView._element[0].querySelector('.page__content'));
        }

        this._scope.$on('$destroy', this._destroy.bind(this));
        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));

        this.hide();
      },

      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
      },

      /**
       * Show modal view.
       */
      show: function() {
        this._element.css('display', 'table');
      },

      _isVisible: function() {
        return this._element[0].clientWidth > 0;
      },

      _onDeviceBackButton: function() {
        // Do nothing and stop device-backbutton handler chain.
        return;
      },

      /**
       * Hide modal view.
       */
      hide: function() {
        this._element.css('display', 'none');
      },

      /**
       * Toggle modal view visibility.
       */
      toggle: function() {
        if (this._isVisible()) {
          return this.hide.apply(this, arguments);
        } else {
          return this.show.apply(this, arguments);
        }
      },

      _destroy: function() {
        this.emit('destroy', {page: this});

        this._deviceBackButtonHandler.destroy();

        this._element = this._scope = null;
      }
    });
    MicroEvent.mixin(ModalView);

    return ModalView;
  }]);
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  var NavigatorPageObject = Class.extend({
    /**
     * @param {Object} params
     * @param {Object} params.page
     * @param {Object} params.element
     * @param {Object} params.pageScope
     * @param {Object} params.options
     * @param {Object} params.navigator
     */
    init: function(params) {
      this.page = params.page;
      this.name = params.page;
      this.element = params.element;
      this.pageScope = params.pageScope;
      this.options = params.options;
      this.navigator = params.navigator;

      // Block events while page is being animated to stop scrolling, pressing buttons, etc.
      this._blockEvents = function(event) {
        if (this.navigator._isPopping || this.navigator._isPushing) {
          event.preventDefault();
          event.stopPropagation();
        }
      }.bind(this);

      this.element.on(this._pointerEvents, this._blockEvents);
    },

    _pointerEvents: 'touchstart touchend touchmove click',

    /**
     * @return {PageView}
     */
    getPageView: function() {
      if (!this._pageView) {
        this._pageView = this.element.inheritedData('ons-page');
        if (!this._pageView) {
          throw new Error('Fail to fetch PageView from ons-page element.');
        }
      }
      return this._pageView;
    },

    destroy: function() {
      this.pageScope.$destroy();

      this.element.off(this._pointerEvents, this._blockEvents);
      this.element.remove();
      this.element = null;

      this._pageView = null;
      this.pageScope = null;
      this.options = null;

      var index = this.navigator.pages.indexOf(this);
      if (index !== -1) {
        this.navigator.pages.splice(index, 1);
      }

      this.navigator = null;
    }
  });

  module.factory('NavigatorView', ['$http', '$parse', '$templateCache', '$compile', '$onsen', '$timeout', 'SimpleSlideTransitionAnimator', 'NavigatorTransitionAnimator', 'LiftTransitionAnimator', 'NullTransitionAnimator', 'IOSSlideTransitionAnimator', 'FadeTransitionAnimator', function($http, $parse, $templateCache, $compile, $onsen, $timeout,
    SimpleSlideTransitionAnimator, NavigatorTransitionAnimator, LiftTransitionAnimator,
    NullTransitionAnimator, IOSSlideTransitionAnimator, FadeTransitionAnimator) {

    /**
     * Manages the page navigation backed by page stack.
     *
     * @class NavigatorView
     */
    var NavigatorView = Class.extend({

      /**
       * @member {jqLite} Object
       */
      _element: undefined,

      /**
       * @member {Object} Object
       */
      _attrs: undefined,

      /**
       * @member {Array}
       */
      pages: undefined,

      /**
       * @member {Object}
       */
      _scope: undefined,

      /**
       * @member {DoorLock}
       */
      _doorLock: undefined,

      /**
       * @member {Boolean}
       */
      _profiling: false,

      /**
       * @param {Object} scope
       * @param {jqLite} element jqLite Object to manage with navigator
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {

        this._element = element || angular.element(window.document.body);
        this._scope = scope || this._element.scope();
        this._attrs = attrs;
        this._doorLock = new DoorLock();
        this.pages = [];

        this._isPopping = this._isPushing = false;

        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));
        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _destroy: function() {
        this.emit('destroy');

        this.pages.forEach(function(page) {
          page.destroy();
        });

        this._deviceBackButtonHandler.destroy();
        this._deviceBackButtonHandler = null;

        this._element = this._scope = this._attrs = null;
      },

      _onDeviceBackButton: function(event) {
        if (this.pages.length > 1) {
          this._scope.$evalAsync(this.popPage.bind(this));
        } else {
          event.callParentHandler();
        }
      },

      /**
       * @param element jqLite Object
       * @return jqLite Object
       */
      _normalizePageElement: function(element) {
        for (var i = 0; i < element.length; i++) {
          if (element[i].nodeType === 1) {
            return angular.element(element[i]);
          }
        }

        throw new Error('invalid state');
      },

      _createPageElementAndLinkFunction : function(templateHTML, pageScope, done) {
        var div = document.createElement('div');
        div.innerHTML = templateHTML.trim();
        var pageElement = angular.element(div);

        var hasPage = div.childElementCount === 1 &&
          div.childNodes[0].nodeName.toLowerCase() === 'ons-page';
        if (hasPage) {
          pageElement = angular.element(div.childNodes[0]);
        } else {
          throw new Error('You can not supply no "ons-page" element to "ons-navigator".');
        }

        var link = $compile(pageElement);
        return {
          element: pageElement,
          link: function() {
            link(pageScope);
            safeApply(pageScope);
          }
        };

        function safeApply(scope) {
          var phase = scope.$root.$$phase;
          if (phase !== '$apply' && phase !== '$digest') {
            scope.$apply();
          }
        }
      },

      /**
       * Insert page object that has the specified pageUrl into the page stack and
       * if options object is specified, apply the options.
       *
       * @param {Number} index
       * @param {String} page
       * @param {Object} [options]
       * @param {String/NavigatorTransitionAnimator} [options.animation]
       */
      insertPage: function(index, page, options) {
        options = options || {};

        if (options && typeof options != 'object') {
          throw new Error('options must be an object. You supplied ' + options);
        }

        if (index === this.pages.length) {
          return this.pushPage.apply(this, [].slice.call(arguments, 1));
        }

        this._doorLock.waitUnlock(function() {
          var unlock = this._doorLock.lock();

          $onsen.getPageHTMLAsync(page).then(function(templateHTML) {

            var pageScope = this._createPageScope();
            var object = this._createPageElementAndLinkFunction(templateHTML, pageScope);
            var element = object.element;
            var link = object.link;

            element = this._normalizePageElement(element);

            var pageObject = this._createPageObject(page, element, pageScope, options);

            if (this.pages.length > 0) {
              index = normalizeIndex(index);

              this._element[0].insertBefore(element[0], this.pages[index] ? this.pages[index].element[0] : null);
              this.pages.splice(index, 0, pageObject);
              link();

              setTimeout(function() {
                if (this.getCurrentPage() !== pageObject) {
                  element.css('display', 'none');
                }
                unlock();
                element = null;
              }.bind(this), 1000 / 60);

            } else {
              this._element.append(element);
              this.pages.push(pageObject);
              link();
              unlock();
              element = null;
            }
          }.bind(this), function() {
            unlock();
            throw new Error('Page is not found: ' + page);
          });
        }.bind(this));

        var normalizeIndex = function(index) {
          if (index < 0) {
            index = this.pages.length + index;
          }
          return index;
        }.bind(this);
      },

      /**
       * Pushes the specified pageUrl into the page stack and
       * if options object is specified, apply the options.
       *
       * @param {String} page
       * @param {Object} [options]
       * @param {String/NavigatorTransitionAnimator} [options.animation]
       * @param {Function} [options.onTransitionEnd]
       */
      pushPage: function(page, options) {
        if (this._profiling) {
          console.time('pushPage');
        }

        options = options || {};

        if (options.cancelIfRunning && this._isPushing) {
          return;
        }

        if (options && typeof options != 'object') {
          throw new Error('options must be an object. You supplied ' + options);
        }

        if (this._emitPrePushEvent()) {
          return;
        }

        this._doorLock.waitUnlock(function() {
          this._pushPage(page, options);
        }.bind(this));
      },

      _pushPage: function(page, options) {
        var unlock = this._doorLock.lock();
        var done = function() {
          unlock();
          if (this._profiling) {
            console.timeEnd('pushPage');
          }
        };

        $onsen.getPageHTMLAsync(page).then(function(templateHTML) {
          var pageScope = this._createPageScope();
          var object = this._createPageElementAndLinkFunction(templateHTML, pageScope);

          setImmediate(function() {
            this._pushPageDOM(page, object.element, object.link, pageScope, options, done);
            object = null;
          }.bind(this));
        }.bind(this), function() {
          done();
          throw new Error('Page is not found: ' + page);
        }.bind(this));
      },

      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
      },

      /**
       * @param {Object} options pushPage()'s options parameter
       * @param {NavigatorTransitionAnimator} [defaultAnimator]
       */
      _getAnimatorOption: function(options, defaultAnimator) {
        var animator = null;

        if (options.animation instanceof NavigatorTransitionAnimator) {
          return options.animation;
        }

        if (typeof options.animation === 'string') {
          animator = NavigatorView._transitionAnimatorDict[options.animation];
        }

        if (!animator && this._element.attr('animation')) {
          animator = NavigatorView._transitionAnimatorDict[this._element.attr('animation')];
        }

        if (!animator) {
          animator = defaultAnimator || NavigatorView._transitionAnimatorDict['default'];
        }

        if (!(animator instanceof NavigatorTransitionAnimator)) {
          throw new Error('"animator" is not an instance of NavigatorTransitionAnimator.');
        }

        return animator;
      },


      _createPageScope: function() {
         return this._scope.$new();
      },

      /**
       * @param {String} page
       * @param {jqLite} element
       * @param {Object} pageScope
       * @param {Object} options
       */
      _createPageObject: function(page, element, pageScope, options) {
        options.animator = this._getAnimatorOption(options);

        return new NavigatorPageObject({
          page: page,
          element: element,
          pageScope: pageScope,
          options: options,
          navigator: this
        });
      },

      /**
       * @param {String} page Page name.
       * @param {Object} element
       * @param {Function} link
       * @param {Object} pageScope
       * @param {Object} options
       * @param {Function} [unlock]
       */
      _pushPageDOM: function(page, element, link, pageScope, options, unlock) {
        if (this._profiling) {
          console.time('pushPageDOM');
        }

        unlock = unlock || function() {};
        options = options || {};
        element = this._normalizePageElement(element);

        var pageObject = this._createPageObject(page, element, pageScope, options);

        var event = {
          enterPage: pageObject,
          leavePage: this.pages[this.pages.length - 1],
          navigator: this
        };

        this.pages.push(pageObject);

        var done = function() {
          if (this.pages[this.pages.length - 2]) {
            this.pages[this.pages.length - 2].element.css('display', 'none');
          }

          if (this._profiling) {
            console.timeEnd('pushPageDOM');
          }

          this._isPushing = false;
          unlock();

          this.emit('postpush', event);

          if (typeof options.onTransitionEnd === 'function') {
            options.onTransitionEnd();
          }
          element = null;
        }.bind(this);

        this._isPushing = true;

        if (this.pages.length > 1) {
          var leavePage = this.pages.slice(-2)[0];
          var enterPage = this.pages.slice(-1)[0];

          this._element.append(element);
          link();
          options.animator.push(enterPage, leavePage, done);
          element = null;
        } else {
          this._element.append(element);
          link();
          done();
          element = null;
        }
      },

      /**
       * @return {Boolean} Whether if event is canceled.
       */
      _emitPrePushEvent: function() {
        var isCanceled = false;
        var prePushEvent = {
          navigator: this,
          currentPage: this.getCurrentPage(),
          cancel: function() {
            isCanceled = true;
          }
        };

        this.emit('prepush', prePushEvent);

        return isCanceled;
      },

      /**
       * @return {Boolean} Whether if event is canceled.
       */
      _emitPrePopEvent: function() {
        var isCanceled = false;
        var leavePage = this.getCurrentPage();
        var prePopEvent = {
          navigator: this,
          currentPage: leavePage,
          leavePage: leavePage,
          enterPage: this.pages[this.pages.length - 2],
          cancel: function() {
            isCanceled = true;
          }
        };

        this.emit('prepop', prePopEvent);

        return isCanceled;
      },

      /**
       * Pops current page from the page stack.
       * @param {Object} [options]
       * @param {Function} [options.onTransitionEnd]
       */
      popPage: function(options) {
        options = options || {};

        if (options.cancelIfRunning && this._isPopping) {
          return;
        }

        this._doorLock.waitUnlock(function() {
          if (this.pages.length <= 1) {
            throw new Error('NavigatorView\'s page stack is empty.');
          }

          if (this._emitPrePopEvent()) {
            return;
          }
          this._popPage(options);
        }.bind(this));
      },

      _popPage: function(options) {
        var unlock = this._doorLock.lock();

        var leavePage = this.pages.pop();

        if (this.pages[this.pages.length - 1]) {
          this.pages[this.pages.length - 1].element.css('display', 'block');
        }

        var enterPage = this.pages[this.pages.length -1];

        var event = {
          leavePage: leavePage,
          enterPage: this.pages[this.pages.length - 1],
          navigator: this
        };

        var callback = function() {
          leavePage.destroy();

          this._isPopping = false;
          unlock();
          this.emit('postpop', event);

          event.leavePage = null;

          if (typeof options.onTransitionEnd === 'function') {
            options.onTransitionEnd();
          }
        }.bind(this);

        this._isPopping = true;

        var animator = this._getAnimatorOption(options, leavePage.options.animator);
        animator.pop(enterPage, leavePage, callback);
      },

      /**
       * Replaces the current page with the specified one.
       *
       * @param {String} page
       * @param {Object} [options]
       */
      replacePage: function(page, options) {
        options = options || {};

        var onTransitionEnd = options.onTransitionEnd || function() {};

        options.onTransitionEnd = function() {
          if (this.pages.length > 1) {
            this.pages[this.pages.length - 2].destroy();
          }
          onTransitionEnd();
        }.bind(this);

        this.pushPage(page, options);
      },

      /**
       * Clears page stack and add the specified pageUrl to the page stack.
       * If options object is specified, apply the options.
       * the options object include all the attributes of this navigator.
       *
       * @param {String} page
       * @param {Object} [options]
       */
      resetToPage: function(page, options) {
        options = options || {};

        if (!options.animator && !options.animation) {
          options.animation = 'none';
        }

        var onTransitionEnd = options.onTransitionEnd || function() {};
        var self = this;

        options.onTransitionEnd = function() {
          while (self.pages.length > 1) {
            self.pages.shift().destroy();
          }
          onTransitionEnd();
        };

        this.pushPage(page, options);
      },

      /**
       * Get current page's navigator item.
       *
       * Use this method to access options passed by pushPage() or resetToPage() method.
       * eg. ons.navigator.getCurrentPage().options
       *
       * @return {Object}
       */
      getCurrentPage: function() {
        return this.pages[this.pages.length - 1];
      },

      /**
       * Retrieve the entire page stages of the navigator.
       *
       * @return {Array}
       */
      getPages: function() {
        return this.pages;
      },

      /**
       * @return {Boolean}
       */
      canPopPage: function() {
        return this.pages.length > 1;
      }
    });

    // Preset transition animators.
    NavigatorView._transitionAnimatorDict = {
      'default': $onsen.isAndroid() ? new SimpleSlideTransitionAnimator() : new IOSSlideTransitionAnimator(),
      'slide': $onsen.isAndroid() ? new SimpleSlideTransitionAnimator() : new IOSSlideTransitionAnimator(),
      'simpleslide': new SimpleSlideTransitionAnimator(),
      'lift': new LiftTransitionAnimator(),
      'fade': new FadeTransitionAnimator(),
      'none': new NullTransitionAnimator()
    };

    /**
     * @param {String} name
     * @param {NavigatorTransitionAnimator} animator
     */
    NavigatorView.registerTransitionAnimator = function(name, animator) {
      if (!(animator instanceof NavigatorTransitionAnimator)) {
        throw new Error('"animator" param must be an instance of NavigatorTransitionAnimator');
      }

      this._transitionAnimatorDict[name] = animator;
    };

    MicroEvent.mixin(NavigatorView);

    return NavigatorView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('NavigatorTransitionAnimator', function() {
    var NavigatorTransitionAnimator = Class.extend({
      push: function(enterPage, leavePage, callback) {
        callback();
      },

      pop: function(enterPage, leavePage, callback) {
        callback();
      }
    });

    return NavigatorTransitionAnimator;
  });
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  /**
   * Null animator do screen transition with no animations.
   */
  module.factory('NullTransitionAnimator', ['NavigatorTransitionAnimator', function(NavigatorTransitionAnimator) {
    var NullTransitionAnimator = NavigatorTransitionAnimator.extend({});
    return NullTransitionAnimator;
  }]);
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('OverlaySlidingMenuAnimator', ['SlidingMenuAnimator', function(SlidingMenuAnimator) {

    var OverlaySlidingMenuAnimator = SlidingMenuAnimator.extend({

      _blackMask: undefined,

      _isRight: false,
      _element: false,
      _menuPage: false,
      _mainPage: false,
      _width: false,
      _duration: false,

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function(element, mainPage, menuPage, options) {
        options = options || {};
        this._width = options.width || '90%';
        this._isRight = !!options.isRight;
        this._element = element;
        this._mainPage = mainPage;
        this._menuPage = menuPage;
        this._duration = 0.4;

        menuPage.css('box-shadow', '0px 0 10px 0px rgba(0, 0, 0, 0.2)');
        menuPage.css({
          width: options.width,
          display: 'none',
          zIndex: 2
        });

        // Fix for transparent menu page on iOS8.
        menuPage.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');

        mainPage.css({zIndex: 1});

        if (this._isRight) {
          menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }

        this._blackMask = angular.element('<div></div>').css({
          backgroundColor: 'black',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          position: 'absolute',
          display: 'none',
          zIndex: 0
        });

        element.prepend(this._blackMask);
      },

      /**
       * @param {Object} options
       * @param {String} options.width
       */
      onResized: function(options) {
        this._menuPage.css('width', options.width);

        if (this._isRight) {
          this._menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          this._menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }

        if (options.isOpened) {
          var max = this._menuPage[0].clientWidth;
          var menuStyle = this._generateMenuPageStyle(max);
          animit(this._menuPage[0]).queue(menuStyle).play();
        }
      },

      /**
       */
      destroy: function() {
        if (this._blackMask) {
          this._blackMask.remove();
          this._blackMask = null;
        }

        this._mainPage.removeAttr('style');
        this._menuPage.removeAttr('style');

        this._element = this._mainPage = this._menuPage = null;
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      openMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this._duration;        
        
        this._menuPage.css('display', 'block');
        this._blackMask.css('display', 'block');

        var max = this._menuPage[0].clientWidth;
        var menuStyle = this._generateMenuPageStyle(max);
        var mainPageStyle = this._generateMainPageStyle(max);

        setTimeout(function() {

          animit(this._mainPage[0])
          .queue(mainPageStyle, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue(function(done) {
              callback();
              done();
            })
            .play();

          animit(this._menuPage[0])
            .queue(menuStyle, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      closeMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this._duration;
        this._blackMask.css({display: 'block'});

        var menuPageStyle = this._generateMenuPageStyle(0);
        var mainPageStyle = this._generateMainPageStyle(0);

        setTimeout(function() {

          animit(this._mainPage[0])
            .queue(mainPageStyle, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue(function(done) {
              this._menuPage.css('display', 'none');
              callback();
              done();
            }.bind(this))
            .play();

          animit(this._menuPage[0])
            .queue(menuPageStyle, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function(options) {

        this._menuPage.css('display', 'block');
        this._blackMask.css({display: 'block'});

        var menuPageStyle = this._generateMenuPageStyle(Math.min(options.maxDistance, options.distance));
        var mainPageStyle = this._generateMainPageStyle(Math.min(options.maxDistance, options.distance));
        delete mainPageStyle.opacity;

        animit(this._menuPage[0])
          .queue(menuPageStyle)
          .play();

        if (Object.keys(mainPageStyle).length > 0) {
          animit(this._mainPage[0])
            .queue(mainPageStyle)
            .play();
        }
      },

      _generateMenuPageStyle: function(distance) {
        var max = this._menuPage[0].clientWidth;

        var x = this._isRight ? -distance : distance;
        var transform = 'translate3d(' + x + 'px, 0, 0)';

        return {
          transform: transform,
          'box-shadow': distance === 0 ? 'none' : '0px 0 10px 0px rgba(0, 0, 0, 0.2)'
        };
      },

      _generateMainPageStyle: function(distance) {
        var max = this._menuPage[0].clientWidth;
        var opacity = 1 - (0.1 * distance / max);

        return {
          opacity: opacity
        };
      },

      copy: function() {
        return new OverlaySlidingMenuAnimator();
      }
    });

    return OverlaySlidingMenuAnimator;
  }]);

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('PageView', ['$onsen', '$parse', function($onsen, $parse) {

    var PageView = Class.extend({
      _registeredToolbarElement : false,
      _registeredBottomToolbarElement : false,

      _nullElement : window.document.createElement('div'),

      _toolbarElement : null,
      _bottomToolbarElement : null,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._registeredToolbarElement = false;
        this._registeredBottomToolbarElement = false;

        this._nullElement = window.document.createElement('div');

        this._toolbarElement = angular.element(this._nullElement);
        this._bottomToolbarElement = angular.element(this._nullElement);

        this._clearListener = scope.$on('$destroy', this._destroy.bind(this));
        this._userDeviceBackButtonListener = angular.noop;

        if (this._attrs.ngDeviceBackbutton || this._attrs.onDeviceBackbutton) {
          this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));
        }
      },

      _onDeviceBackButton: function($event) {
        this._userDeviceBackButtonListener($event);

        // ng-device-backbutton
        if (this._attrs.ngDeviceBackbutton) {
          $parse(this._attrs.ngDeviceBackbutton)(this._scope, {$event: $event});
        }

        // on-device-backbutton
        /* jshint ignore:start */
        if (this._attrs.onDeviceBackbutton) {
          var lastEvent = window.$event;
          window.$event = $event;
          new Function(this._attrs.onDeviceBackbutton)();
          window.$event = lastEvent;
        }
        /* jshint ignore:end */
      },

      /**
       * @param {Function} callback
       */
      setDeviceBackButtonHandler: function(callback) {
        if (!this._deviceBackButtonHandler) {
          this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));
        }

        this._userDeviceBackButtonListener = callback;
      },

      /**
       * @return {Object/null}
       */
      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler || null;
      },

      /**
       * Register toolbar element to this page.
       *
       * @param {jqLite} element
       */
      registerToolbar: function(element) {
        if (this._registeredToolbarElement) {
          throw new Error('This page\'s toolbar is already registered.');
        }

        angular.element(this.getContentElement()).attr('no-status-bar-fill', '');

        element.remove();
        var statusFill = this._element[0].querySelector('.page__status-bar-fill');
        if (statusFill) {
          angular.element(statusFill).after(element);
        } else {
          this._element.prepend(element);
        }

        this._toolbarElement = element;
        this._registeredToolbarElement = true;
      },

      /**
       * Register toolbar element to this page.
       *
       * @param {jqLite} element
       */
      registerBottomToolbar: function(element) {
        if (this._registeredBottomToolbarElement) {
          throw new Error('This page\'s bottom-toolbar is already registered.');
        }

        element.remove();

        this._bottomToolbarElement = element;
        this._registeredBottomToolbarElement = true;

        var fill = angular.element(document.createElement('div'));
        fill.addClass('page__bottom-bar-fill');
        fill.css({width: '0px', height: '0px'});

        this._element.prepend(fill);
        this._element.append(element);
      },

      /**
       * @param {jqLite} element
       */
      registerExtraElement: function(element) {
        if (!this._extraElement) {
          this._extraElement = angular.element('<div></div>');
          this._extraElement.addClass('page__extra');
          this._extraElement.css({
            'z-index': '10001'
          });
          this._element.append(this._extraElement);
        }
        this._extraElement.append(element.remove());
      },

      /**
       * @return {Boolean}
       */
      hasToolbarElement : function() {
        return !!this._registeredToolbarElement;
      },

      /**
       * @return {Boolean}
       */
      hasBottomToolbarElement : function() {
        return !!this._registeredBottomToolbarElement;
      },

      /**
       * @return {HTMLElement}
       */
      getContentElement : function() {
        for (var i = 0; i < this._element.length; i++) {
          if (this._element[i].querySelector) {
            var content = this._element[i].querySelector('.page__content');
            if (content) {
              return content;
            }
          }
        }
        throw Error('fail to get ".page__content" element.');
      },

      /**
       * @return {HTMLElement}
       */
      getBackgroundElement : function() {
        for (var i = 0; i < this._element.length; i++) {
          if (this._element[i].querySelector) {
            var content = this._element[i].querySelector('.page__background');
            if (content) {
              return content;
            }
          }
        }
        throw Error('fail to get ".page__background" element.');
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarElement : function() {
        return this._toolbarElement[0] || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getBottomToolbarElement : function() {
        return this._bottomToolbarElement[0] || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarLeftItemsElement : function() {
        return this._toolbarElement[0].querySelector('.left') || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarCenterItemsElement : function() {
        return this._toolbarElement[0].querySelector('.center') || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarRightItemsElement : function() {
        return this._toolbarElement[0].querySelector('.right') || this._nullElement;
      },

      /**
       * @return {HTMLElement}
       */
      getToolbarBackButtonLabelElement : function() {
        return this._toolbarElement[0].querySelector('ons-back-button .back-button__label') || this._nullElement;
      },

      _destroy: function() {
        this.emit('destroy', {page: this});

        if (this._deviceBackButtonHandler) {
          this._deviceBackButtonHandler.destroy();
          this._deviceBackButtonHandler = null;
        }

        this._element = null;
        this._toolbarElement = null;
        this._nullElement = null;
        this._bottomToolbarElement = null;
        this._extraElement = null;
        this._scope = null;

        this._clearListener();
      }
    });
    MicroEvent.mixin(PageView);

    return PageView;
  }]);
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('PopoverView', ['$onsen', 'PopoverAnimator', 'FadePopoverAnimator', function($onsen, PopoverAnimator, FadePopoverAnimator) {

    var PopoverView = Class.extend({

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._mask = angular.element(this._element[0].querySelector('.popover-mask'));
        this._popover = angular.element(this._element[0].querySelector('.popover'));

        this._mask.css('z-index', 20000);
        this._popover.css('z-index', 20001);
        this._element.css('display', 'none');

        if (attrs.maskColor) {
          this._mask.css('background-color', attrs.maskColor);
        }

        this._mask.on('click', this._cancel.bind(this));

        this._visible = false;
        this._doorLock = new DoorLock();

        this._animation = PopoverView._animatorDict[typeof attrs.animation !== 'undefined' ? 
          attrs.animation : 'fade'];

        if (!this._animation) {
          throw new Error('No such animation: ' + attrs.animation);
        }

        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));

        this._onChange = function() {
          setImmediate(function() {
            if (this._currentTarget) {
              this._positionPopover(this._currentTarget);
            }
          }.bind(this));
        }.bind(this);

        this._popover[0].addEventListener('DOMNodeInserted', this._onChange, false);
        this._popover[0].addEventListener('DOMNodeRemoved', this._onChange, false);
        window.addEventListener('resize', this._onChange, false);

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _onDeviceBackButton: function(event) {
        if (this.isCancelable()) {
          this._cancel.bind(this)();
        } else {
          event.callParentHandler();
        }
      },

      _setDirection: function(direction) {
        if (direction === 'up') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'bottom';
        } else if (direction === 'left') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'right';
        } else if (direction === 'down') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'top';
        } else if (direction == 'right') {
          this._scope.direction = direction;
          this._scope.arrowPosition = 'left';
        } else {
          throw new Error('Invalid direction.');
        }
      
        if (!this._scope.$$phase) {
          this._scope.$apply();
        }
      },

      _positionPopoverByDirection: function(target, direction) {
        var el = angular.element(this._element[0].querySelector('.popover')),
          pos = target.getBoundingClientRect(),
          own = el[0].getBoundingClientRect(),
          arrow = angular.element(el.children()[1]),
          offset = 14,
          margin = 6,
          radius = parseInt(window.getComputedStyle(el[0].querySelector('.popover__content')).borderRadius);

        arrow.css({
          top: '',
          left: ''
        });

        // This is the difference between the side and the hypothenuse of the arrow.
        var diff = (function(x) {
          return (x / 2) * Math.sqrt(2) - x / 2;
        })(parseInt(window.getComputedStyle(arrow[0]).width));

        // This is the limit for the arrow. If it's moved further than this it's outside the popover.
        var limit = margin + radius + diff;

        this._setDirection(direction);

        // Position popover next to the target.
        if (['left', 'right'].indexOf(direction) > -1) {
          if (direction == 'left') {
            el.css('left', (pos.right - pos.width - own.width - offset) + 'px');
          } else {
            el.css('left', (pos.right + offset) + 'px');
          }
          el.css('top', (pos.bottom - pos.height / 2 - own.height / 2) + 'px');
        } else {
          if (direction == 'up') {
            el.css('top', (pos.bottom - pos.height - own.height - offset) + 'px');
          } else {
            el.css('top', (pos.bottom + offset) + 'px');
          }
          el.css('left', (pos.right - pos.width / 2 - own.width / 2) + 'px');
        }

        own = el[0].getBoundingClientRect();

        // Keep popover inside window and arrow inside popover.
        if (['left', 'right'].indexOf(direction) > -1) {
          if (own.top < margin) {
            arrow.css('top', Math.max(own.height / 2 + own.top - margin, limit)  + 'px');
            el.css('top', margin + 'px');
          } else if (own.bottom > window.innerHeight - margin) {
            arrow.css('top', Math.min(own.height / 2 - (window.innerHeight - own.bottom) + margin, own.height - limit) + 'px');
            el.css('top', (window.innerHeight - own.height - margin) + 'px');
          }
        } else {
        if (own.left < margin) {
            arrow.css('left', Math.max(own.width / 2 + own.left - margin, limit) + 'px');
            el.css('left', margin + 'px');
          } else if (own.right > window.innerWidth - margin) {
            arrow.css('left', Math.min(own.width / 2 - (window.innerWidth - own.right) + margin, own.width - limit) + 'px');
            el.css('left', (window.innerWidth - own.width - margin) + 'px');
          }
        }
      },

      _positionPopover: function(target) {
        var directions;
        if (!this._element.attr('direction')) {
          directions = ['up', 'down', 'left', 'right'];
        } else {
          directions = this._element.attr('direction').split(/\s+/);
        }

        var position = target.getBoundingClientRect();

        // The popover should be placed on the side with the most space.
        var scores = {
          left: position.left,
          right: window.innerWidth - position.right,
          up: position.top,
          down: window.innerHeight - position.bottom
        };

        var orderedDirections = Object.keys(scores).sort(function(a, b) {return -(scores[a] - scores[b]);}); 
        for (var i = 0, l = orderedDirections.length; i < l; i++) {
          var direction = orderedDirections[i];
          if (directions.indexOf(direction) > -1) {
            this._positionPopoverByDirection(target, direction);
            return;
          }
        }
      },

      /**
       * Show popover.
       *
       * @param {HTMLElement} [target] target element
       * @param {String} [target] css selector
       * @param {Event} [target] event
       * @param {Object} [options] options
       * @param {String} [options.animation] animation type
       */
      show: function(target, options) {
        if (typeof target === 'string') {
          target = document.querySelector(target);
        } else if (target instanceof Event) {
          target = target.target;
        }
      
        if (!target) {
         throw new Error('Target undefined');
        }

        options = options || {};
        
        var cancel = false;
        this.emit('preshow', {
          popover: this,
          cancel: function() { cancel = true; }
        });

        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock(),
              animation = this._animation;

            this._element.css('display', 'block');

            this._currentTarget = target;
            this._positionPopover(target);

            if (options.animation) {
              animation = PopoverView._animatorDict[options.animation];
            }

            animation.show(this, function() {
              this._visible = true;
              this._positionPopover(target);
              unlock();
              this.emit('postshow', {popover: this});
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * Hide popover.
       *
       * @param {Object} [options] options
       * @param {String} [options.animation] animation type
       */
      hide: function(options) {
        options = options || {};

        var cancel = false;
        this.emit('prehide', {
          popover: this,
          cancel: function() { cancel = true; }
        });

        if (!cancel) {
          this._doorLock.waitUnlock(function() {
            var unlock = this._doorLock.lock(),
              animation = this._animation;

            if (options.animation) {
              animation = PopoverView._animatorDict[options.animation];
            }

            animation.hide(this, function() {
              this._element.css('display', 'none');
              this._visible = false;
              unlock();
              this.emit('posthide', {popover: this});
            }.bind(this));
          }.bind(this));
        }
      },

      /**
       * Returns whether the popover is visible or not.
       *
       * @return {Boolean}
       */
      isShown: function() {
        return this._visible;
      },

      /**
       * Destroy the popover and remove it from the DOM tree.
       */
      destroy: function() {
        if (this._parentScope) {
          this._parentScope.$destroy();
          this._parentScope = null;
        } else {
          this._scope.$destroy();
        }
      },

      _destroy: function() {
        this.emit('destroy');

        this._deviceBackButtonHandler.destroy();
        this._popover[0].removeEventListener('DOMNodeInserted', this._onChange, false);
        this._popover[0].removeEventListener('DOMNodeRemoved', this._onChange, false);
        window.removeEventListener('resize', this._onChange, false);

        this._mask.off();
        this._mask.remove();
        this._popover.remove();
        this._element.remove();

        this._onChange = this._deviceBackButtonHandler = this._mask = this._popover = this._element = this._scope = null;
      },

      /**
       * Set whether the popover should be cancelable or not.
       *
       * @param {Boolean}
       */
      setCancelable: function(cancelable) {
        if (typeof cancelable !== 'boolean') {
          throw new Error('Argument must be a boolean.');  
        }

        if (cancelable) {
          this._element.attr('cancelable', true);
        } else {
          this._element.removeAttr('cancelable');
        }
      },

      /**
       * Return whether the popover is cancelable or not.
       *
       * @return {Boolean}
       */
      isCancelable: function() {
        return this._element[0].hasAttribute('cancelable');
      },

      _cancel: function() {
        if (this.isCancelable()) {
          this.hide();
        }
      },

    });

    PopoverView._animatorDict = {
      'fade': new FadePopoverAnimator(),
      'none': new PopoverAnimator()
    };

    /**
     * @param {String} name
     * @param {PopoverAnimator} animator
     */
    PopoverView.registerAnimator = function(name, animator) {
      if (!(animator instanceof PopoverAnimator)) {
        throw new Error('"animator" param must be an instance of PopoverAnimator');
      }
      this._animatorDict[name] = animator;
    };

    MicroEvent.mixin(PopoverView);

    return PopoverView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.factory('PopoverAnimator', function() {
    var PopoverAnimator = Class.extend({
      show: function(popover, callback) {
        callback();
      },

      hide: function(popover, callback) {
        callback();
      }
    });

    return PopoverAnimator; 
  });
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('PullHookView', ['$onsen', '$parse', function($onsen, $parse) {

    var PullHookView = Class.extend({

      STATE_INITIAL: 'initial',
      STATE_PREACTION: 'preaction',
      STATE_ACTION: 'action',

      /**
       * @param {Object} scope
       * @param {jqLite} element
       * @param {Object} attrs
       */
      init: function(scope, element, attrs) {
        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._scrollElement = this._createScrollElement();
        this._pageElement = this._scrollElement.parent();

        if (!this._pageElement.hasClass('page__content') && !this._pageElement.hasClass('ons-scroller__content')) {
          throw new Error('<ons-pull-hook> must be a direct descendant of an <ons-page> or an <ons-scroller> element.');
        }

        this._currentTranslation = 0;

        this._createEventListeners();
        this._setState(this.STATE_INITIAL, true);
        this._setStyle();

        this._scope.$on('$destroy', this._destroy.bind(this));
      },

      _createScrollElement: function() {
        var scrollElement = angular.element('<div>')
          .addClass('scroll');

        var pageElement = this._element.parent(),
          children = pageElement.children();

        pageElement.append(scrollElement);
        scrollElement.append(children);

        return scrollElement; 
      },

      _setStyle: function() {
        var h = this._getHeight();

        this._element.css({
          top: '-' + h + 'px',
          height: h + 'px',
          lineHeight: h + 'px'
        });
      },
    
      _onScroll: function(event) {
        var el = this._pageElement[0];

        if (el.scrollTop < 0) {
          el.scrollTop = 0;
        }
      },

      _generateTranslationTransform: function(scroll) {
        return 'translate3d(0px, ' + scroll + 'px, 0px)';
      },

      _onDrag: function(event) {
        if (this.isDisabled()) {
          return;
        }

        // Ignore when dragging left and right.
        if (event.gesture.direction === 'left' || event.gesture.direction === 'right') {
          return;
        }

        // Hack to make it work on Android 4.4 WebView. Scrolls manually near the top of the page so
        // there will be no inertial scroll when scrolling down. Allowing default scrolling will
        // kill all 'touchmove' events.
        var el = this._pageElement[0];
        el.scrollTop = this._startScroll - event.gesture.deltaY;
        if (el.scrollTop < window.innerHeight && event.gesture.direction !== 'up') {
          event.gesture.preventDefault();
        }

        if (this._currentTranslation === 0 && this._getCurrentScroll() === 0) {
          this._transitionDragLength = event.gesture.deltaY;

          var direction = event.gesture.interimDirection;
          if (direction === 'down') {
            this._transitionDragLength -= 1;
          }
          else {
            this._transitionDragLength += 1;
          }
        }

        var scroll = event.gesture.deltaY - this._startScroll;

        scroll = Math.max(scroll, 0);

        if (this._thresholdHeightEnabled() && scroll >= this._getThresholdHeight()) {
          event.gesture.stopDetect();

          setImmediate(function() {
            this._setState(this.STATE_ACTION);
            this._translateTo(this._getHeight(), {animate: true});

            this._waitForAction(this._onDone.bind(this));
          }.bind(this));
        }
        else if (scroll >= this._getHeight()) {
          this._setState(this.STATE_PREACTION);
        }
        else {
          this._setState(this.STATE_INITIAL);
        }
 
        event.stopPropagation();
        this._translateTo(scroll);
      },

      _onDragStart: function(event) {
        if (this.isDisabled()) {
          return;
        }

        this._startScroll = this._getCurrentScroll();
      },

      _onDragEnd: function(event) {
        if (this.isDisabled()) {
          return;
        }

        if (this._currentTranslation > 0) {
          var scroll = this._currentTranslation;

          if (scroll > this._getHeight()) {
            this._setState(this.STATE_ACTION);

            this._translateTo(this._getHeight(), {animate: true});

            this._waitForAction(this._onDone.bind(this));
          }
          else {
            this._translateTo(0, {animate: true});
          }
        }
      },

      _waitForAction: function(done) {
        if (this._attrs.ngAction) {
          this._scope.$eval(this._attrs.ngAction, {$done: done});
        }
        else if (this._attrs.onAction) {
          /*jshint evil:true */
          eval(this._attrs.onAction);
        }
        else {
          done();
        }
      },

      _onDone: function(done) {
        // Check if the pull hook still exists.
        if (this._element) {
          this._translateTo(0, {animate: true});
          this._setState(this.STATE_INITIAL);
        }
      },

      _getHeight: function() {
        return parseInt(this._element[0].getAttribute('height') || '64', 10);
      },

      setHeight: function(height) {
        this._element[0].setAttribute('height', height + 'px');

        this._setStyle();
      },

      setThresholdHeight: function(thresholdHeight) {
        this._element[0].setAttribute('threshold-height', thresholdHeight + 'px');
      },

      _getThresholdHeight: function() {
        return parseInt(this._element[0].getAttribute('threshold-height') || '96', 10);
      },

      _thresholdHeightEnabled: function() {
        var th = this._getThresholdHeight();
        return th > 0 && th >= this._getHeight();
      },

      _setState: function(state, noEvent) {
        var oldState = this._getState();

        this._scope.$evalAsync(function() {
          this._element[0].setAttribute('state', state);

          if (!noEvent && oldState !== this._getState()) {
            this.emit('changestate', {
              state: state,
              pullHook: this
            });
          }
        }.bind(this));
      },

      _getState: function() {
        return this._element[0].getAttribute('state');
      },

      getCurrentState: function() {
        return this._getState();
      },

      _getCurrentScroll: function() {
        return this._pageElement[0].scrollTop;
      },

      isDisabled: function() {
        return this._element[0].hasAttribute('disabled');
      },

      setDisabled: function(disabled) {
        if (disabled) {
          this._element[0].setAttribute('disabled', '');
        }
        else {
          this._element[0].removeAttribute('disabled');
        }
      },

      _translateTo: function(scroll, options) {
        options = options || {};

        this._currentTranslation = scroll;

        if (options.animate) {
          animit(this._scrollElement[0])
            .queue({
              transform: this._generateTranslationTransform(scroll)
            }, {
              duration: 0.3,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play(options.callback);
        }
        else {
          animit(this._scrollElement[0])
            .queue({
              transform: this._generateTranslationTransform(scroll)
            })
            .play(options.callback);
        }
      },

      _getMinimumScroll: function() {
        var scrollHeight = this._scrollElement[0].getBoundingClientRect().height,
          pageHeight = this._pageElement[0].getBoundingClientRect().height;

        if (scrollHeight > pageHeight) {
          return -(scrollHeight - pageHeight);
        }
        else {
          return 0;
        }

      },

      _createEventListeners: function() {
        var element = this._scrollElement.parent();

        this._hammer = new Hammer(element[0], {
          dragMinDistance: 1,
          dragDistanceCorrection: false
        });

        // Event listeners
        this._bindedOnDrag = this._onDrag.bind(this);
        this._bindedOnDragStart = this._onDragStart.bind(this);
        this._bindedOnDragEnd = this._onDragEnd.bind(this);
        this._bindedOnScroll = this._onScroll.bind(this);

        // Bind listeners
        this._hammer.on('drag', this._bindedOnDrag);
        this._hammer.on('dragstart', this._bindedOnDragStart);
        this._hammer.on('dragend', this._bindedOnDragEnd);
        element.on('scroll', this._bindedOnScroll);
      },

      _destroyEventListeners: function() {
        var element = this._scrollElement.parent();

        this._hammer.off('drag', this._bindedOnDrag);
        this._hammer.off('dragstart', this._bindedOnDragStart);
        this._hammer.off('dragend', this._bindedOnDragEnd);
        element.off('scroll', this._bindedOnScroll);
      },

      _destroy: function() {
        this.emit('destroy');
        this._destroyEventListeners();
        this._element = this._scope = this._attrs = null;
      }
    });

    MicroEvent.mixin(PullHookView);
    return PullHookView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('PushSlidingMenuAnimator', ['SlidingMenuAnimator', function(SlidingMenuAnimator) {

    var PushSlidingMenuAnimator = SlidingMenuAnimator.extend({

      _isRight: false,
      _element: undefined,
      _menuPage: undefined,
      _mainPage: undefined,
      _width: undefined,
      _duration: false,
      
      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function(element, mainPage, menuPage, options) {
        options = options || {};

        this._element = element;
        this._mainPage = mainPage;
        this._menuPage = menuPage;

        this._isRight = !!options.isRight;
        this._width = options.width || '90%';
        this._duration = 0.4;

        menuPage.css({
          width: options.width,
          display: 'none'
        });

        if (this._isRight) {
          menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }
      },

      /**
       * @param {Object} options
       * @param {String} options.width
       * @param {Object} options.isRight
       */
      onResized: function(options) {
        this._menuPage.css('width', options.width);

        if (this._isRight) {
          this._menuPage.css({
            right: '-' + options.width,
            left: 'auto'
          });
        } else {
          this._menuPage.css({
            right: 'auto',
            left: '-' + options.width
          });
        }

        if (options.isOpened) {
          var max = this._menuPage[0].clientWidth;
          var mainPageTransform = this._generateAbovePageTransform(max);
          var menuPageStyle = this._generateBehindPageStyle(max);

          animit(this._mainPage[0]).queue({transform: mainPageTransform}).play();
          animit(this._menuPage[0]).queue(menuPageStyle).play();
        }
      },

      /**
       */
      destroy: function() {
        this._mainPage.removeAttr('style');
        this._menuPage.removeAttr('style');

        this._element = this._mainPage = this._menuPage = null;
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      openMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this._duration;        

        this._menuPage.css('display', 'block');

        var max = this._menuPage[0].clientWidth;

        var aboveTransform = this._generateAbovePageTransform(max);
        var behindStyle = this._generateBehindPageStyle(max);

        setTimeout(function() {

          animit(this._mainPage[0])
            .queue({
              transform: aboveTransform
            }, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue(function(done) {
              callback();
              done();
            })
            .play();

          animit(this._menuPage[0])
            .queue(behindStyle, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      closeMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this._duration;        

        var aboveTransform = this._generateAbovePageTransform(0);
        var behindStyle = this._generateBehindPageStyle(0);

        setTimeout(function() {

          animit(this._mainPage[0])
            .queue({
              transform: aboveTransform
            }, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue({
              transform: 'translate3d(0, 0, 0)'
            })
            .queue(function(done) {
              this._menuPage.css('display', 'none');
              callback();
              done();
            }.bind(this))
            .play();

          animit(this._menuPage[0])
            .queue(behindStyle, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue(function(done) {
              done();
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function(options) {

        this._menuPage.css('display', 'block');

        var aboveTransform = this._generateAbovePageTransform(Math.min(options.maxDistance, options.distance));
        var behindStyle = this._generateBehindPageStyle(Math.min(options.maxDistance, options.distance));

        animit(this._mainPage[0])
          .queue({transform: aboveTransform})
          .play();

        animit(this._menuPage[0])
          .queue(behindStyle)
          .play();
      },

      _generateAbovePageTransform: function(distance) {
        var x = this._isRight ? -distance : distance;
        var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';

        return aboveTransform;
      },

      _generateBehindPageStyle: function(distance) {
        var max = this._menuPage[0].clientWidth;

        var behindX = this._isRight ? -distance : distance;
        var behindTransform = 'translate3d(' + behindX + 'px, 0, 0)';

        return {
          transform: behindTransform
        };
      },

      copy: function() {
        return new PushSlidingMenuAnimator();
      }
    });

    return PushSlidingMenuAnimator;
  }]);

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('RevealSlidingMenuAnimator', ['SlidingMenuAnimator', function(SlidingMenuAnimator) {

    var RevealSlidingMenuAnimator = SlidingMenuAnimator.extend({

      _blackMask: undefined,

      _isRight: false,

      _menuPage: undefined,
      _element: undefined,
      _mainPage: undefined,
      _duration: undefined,

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function(element, mainPage, menuPage, options) {
        this._element = element;
        this._menuPage = menuPage;
        this._mainPage = mainPage;
        this._isRight = !!options.isRight;
        this._width = options.width || '90%';
        this._duration = 0.4;

        mainPage.css({
          boxShadow: '0px 0 10px 0px rgba(0, 0, 0, 0.2)'
        });

        menuPage.css({
          width: options.width,
          opacity: 0.9,
          display: 'none'
        });

        if (this._isRight) {
          menuPage.css({
            right: '0px',
            left: 'auto'
          });
        } else {
          menuPage.css({
            right: 'auto',
            left: '0px'
          });
        }

        this._blackMask = angular.element('<div></div>').css({
          backgroundColor: 'black',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          position: 'absolute',
          display: 'none'
        });

        element.prepend(this._blackMask);

        // Dirty fix for broken rendering bug on android 4.x.
        animit(mainPage[0]).queue({transform: 'translate3d(0, 0, 0)'}).play();
      },

      /**
       * @param {Object} options
       * @param {Boolean} options.isOpened
       * @param {String} options.width
       */
      onResized: function(options) {
        this._width = options.width;
        this._menuPage.css('width', this._width);

        if (options.isOpened) {
          var max = this._menuPage[0].clientWidth;

          var aboveTransform = this._generateAbovePageTransform(max);
          var behindStyle = this._generateBehindPageStyle(max);

          animit(this._mainPage[0]).queue({transform: aboveTransform}).play();
          animit(this._menuPage[0]).queue(behindStyle).play();
        }
      },

      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       */
      destroy: function() {
        if (this._blackMask) {
          this._blackMask.remove();
          this._blackMask = null;
        }

        if (this._mainPage) {
          this._mainPage.attr('style', '');
        }

        if (this._menuPage) {
          this._menuPage.attr('style', '');
        }

        this._mainPage = this._menuPage = this._element = undefined;
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      openMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this._duration;        
        
        this._menuPage.css('display', 'block');
        this._blackMask.css('display', 'block');

        var max = this._menuPage[0].clientWidth;

        var aboveTransform = this._generateAbovePageTransform(max);
        var behindStyle = this._generateBehindPageStyle(max);

        setTimeout(function() {

          animit(this._mainPage[0])
            .queue({
              transform: aboveTransform
            }, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue(function(done) {
              callback();
              done();
            })
            .play();

          animit(this._menuPage[0])
            .queue(behindStyle, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Function} callback
       * @param {Boolean} instant
       */
      closeMenu: function(callback, instant) {
        var duration = instant === true ? 0.0 : this._duration;        

        this._blackMask.css('display', 'block');

        var aboveTransform = this._generateAbovePageTransform(0);
        var behindStyle = this._generateBehindPageStyle(0);

        setTimeout(function() {

          animit(this._mainPage[0])
            .queue({
              transform: aboveTransform
            }, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue({
              transform: 'translate3d(0, 0, 0)'
            })
            .queue(function(done) {
              this._menuPage.css('display', 'none');
              callback();
              done();
            }.bind(this))
            .play();

          animit(this._menuPage[0])
            .queue(behindStyle, {
              duration: duration,
              timing: 'cubic-bezier(.1, .7, .1, 1)'
            })
            .queue(function(done) {
              done();
            })
            .play();

        }.bind(this), 1000 / 60);
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function(options) {

        this._menuPage.css('display', 'block');
        this._blackMask.css('display', 'block');

        var aboveTransform = this._generateAbovePageTransform(Math.min(options.maxDistance, options.distance));
        var behindStyle = this._generateBehindPageStyle(Math.min(options.maxDistance, options.distance));
        delete behindStyle.opacity;

        animit(this._mainPage[0])
          .queue({transform: aboveTransform})
          .play();

        animit(this._menuPage[0])
          .queue(behindStyle)
          .play();
      },

      _generateAbovePageTransform: function(distance) {
        var x = this._isRight ? -distance : distance;
        var aboveTransform = 'translate3d(' + x + 'px, 0, 0)';

        return aboveTransform;
      },

      _generateBehindPageStyle: function(distance) {
        var max = this._menuPage[0].getBoundingClientRect().width;

        var behindDistance = (distance - max) / max * 10;
        behindDistance = isNaN(behindDistance) ? 0 : Math.max(Math.min(behindDistance, 0), -10);

        var behindX = this._isRight ? -behindDistance : behindDistance;
        var behindTransform = 'translate3d(' + behindX + '%, 0, 0)';
        var opacity = 1 + behindDistance / 100;

        return {
          transform: behindTransform,
          opacity: opacity
        };
      },

      copy: function() {
        return new RevealSlidingMenuAnimator();
      }
    });

    return RevealSlidingMenuAnimator;
  }]);

})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('SimpleSlideTransitionAnimator', ['NavigatorTransitionAnimator', function(NavigatorTransitionAnimator) {

    /**
     * Slide animator for navigator transition.
     */
    var SimpleSlideTransitionAnimator = NavigatorTransitionAnimator.extend({

      /** Black mask */
      backgroundMask : angular.element(
        '<div style="z-index: 2; position: absolute; width: 100%;' +
        'height: 100%; background-color: black; opacity: 0;"></div>'
      ),

      timing: 'cubic-bezier(.1, .7, .4, 1)',
      duration: 0.3, 
      blackMaskOpacity: 0.4,

      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
      },

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} callback
       */
      push: function(enterPage, leavePage, callback) {
        var mask = this.backgroundMask.remove();
        leavePage.element[0].parentNode.insertBefore(mask[0], leavePage.element[0].nextSibling);

        animit.runAll(

          animit(mask[0])
            .queue({
              opacity: 0,
              transform: 'translate3d(0, 0, 0)'
            })
            .queue({
              opacity: this.blackMaskOpacity
            }, {
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              mask.remove();
              done();
            }),

          animit(enterPage.element[0])
            .queue({
              css: {
                transform: 'translate3D(100%, 0, 0)',
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)',
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle(),

          animit(leavePage.element[0])
            .queue({
              css: {
                transform: 'translate3D(0, 0, 0)'
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(-45%, 0px, 0px)'
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .wait(0.2)
            .queue(function(done) {
              callback();
              done();
            })
        );
      },

      /**
       * @param {Object} enterPage
       * @param {Object} leavePage
       * @param {Function} done
       */
      pop: function(enterPage, leavePage, done) {
        var mask = this.backgroundMask.remove();
        enterPage.element[0].parentNode.insertBefore(mask[0], enterPage.element[0].nextSibling);

        animit.runAll(

          animit(mask[0])
            .queue({
              opacity: this.blackMaskOpacity,
              transform: 'translate3d(0, 0, 0)'
            })
            .queue({
              opacity: 0
            }, {
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              mask.remove();
              done();
            }),

          animit(enterPage.element[0])
            .queue({
              css: {
                transform: 'translate3D(-45%, 0px, 0px)',
                opacity: 0.9
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(0px, 0px, 0px)',
                opacity: 1.0
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle(),

          animit(leavePage.element[0])
            .queue({
              css: {
                transform: 'translate3D(0px, 0px, 0px)'
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(100%, 0px, 0px)'
              },
              duration: this.duration,
              timing: this.timing
            })
            .wait(0.2)
            .queue(function(finish) {
              done();
              finish();
            })
        );
      }
    });

    return SimpleSlideTransitionAnimator;
  }]);

})();



/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('SlideDialogAnimator', ['DialogAnimator', function(DialogAnimator) {

    /**
     * Slide animator for dialog.
     */
    var SlideDialogAnimator = DialogAnimator.extend({

      timing: 'cubic-bezier(.1, .7, .4, 1)',
      duration: 0.2, 

      init: function(options) {
        options = options || {};

        this.timing = options.timing || this.timing;
        this.duration = options.duration !== undefined ? options.duration : this.duration;
      },

      /**
       * @param {Object} dialog
       * @param {Function} callback
       */
      show: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 0
            })
            .queue({
              opacity: 1.0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3D(-50%, -350%, 0)',
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(-50%, -50%, 0)',
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })
        );
      },

      /**
       * @param {Object} dialog 
       * @param {Function} callback
       */
      hide: function(dialog, callback) {
        callback = callback ? callback : function() {};

        animit.runAll(

          animit(dialog._mask[0])
            .queue({
              opacity: 1.0
            })
            .queue({
              opacity: 0
            }, {
              duration: this.duration,
              timing: this.timing
            }),

          animit(dialog._dialog[0])
            .queue({
              css: {
                transform: 'translate3D(-50%, -50%, 0)'
              },
              duration: 0
            })
            .queue({
              css: {
                transform: 'translate3D(-50%, -350%, 0)'
              },
              duration: this.duration,
              timing: this.timing
            })
            .resetStyle()
            .queue(function(done) {
              callback();
              done();
            })

        );
      }
    });

    return SlideDialogAnimator;
  }]);

})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  var SlidingMenuViewModel = Class.extend({

    /**
     * @member Number
     */
    _distance: 0,

    /**
     * @member Number
     */
    _maxDistance: undefined,

    /**
     * @param {Object} options
     * @param {Number} maxDistance
     */
    init: function(options) {
      if (!angular.isNumber(options.maxDistance)) {
        throw new Error('options.maxDistance must be number');
      }

      this.setMaxDistance(options.maxDistance);
    },

    /**
     * @param {Number} maxDistance
     */
    setMaxDistance: function(maxDistance) {
      if (maxDistance <= 0) {
        throw new Error('maxDistance must be greater then zero.');
      }

      if (this.isOpened()) {
        this._distance = maxDistance;
      }
      this._maxDistance = maxDistance;
    },

    /**
     * @return {Boolean}
     */
    shouldOpen: function() {
      return !this.isOpened() && this._distance >= this._maxDistance / 2;
    },

    /**
     * @return {Boolean}
     */
    shouldClose: function() {
      return !this.isClosed() && this._distance < this._maxDistance / 2;
    },

    openOrClose: function(options) {
      if (this.shouldOpen()) {
        this.open(options);
      } else if (this.shouldClose()) {
        this.close(options);
      }
    },

    close: function(options) {
      var callback = options.callback || function() {};

      if (!this.isClosed()) {
        this._distance = 0;
        this.emit('close', options);
      } else {
        callback();
      }
    },

    open: function(options) {
      var callback = options.callback || function() {};

      if (!this.isOpened()) {
        this._distance = this._maxDistance;
        this.emit('open', options);
      } else {
        callback();
      }
    },

    /**
     * @return {Boolean}
     */
    isClosed: function() {
      return this._distance === 0;
    },

    /**
     * @return {Boolean}
     */
    isOpened: function() {
      return this._distance === this._maxDistance;
    },

    /**
     * @return {Number}
     */
    getX: function() {
      return this._distance;
    },

    /**
     * @return {Number}
     */
    getMaxDistance: function() {
      return this._maxDistance;
    },

    /**
     * @param {Number} x
     */
    translate: function(x) {
      this._distance = Math.max(1, Math.min(this._maxDistance - 1, x));

      var options = {
        distance: this._distance,
        maxDistance: this._maxDistance
      };

      this.emit('translate', options);
    },

    toggle: function() {
      if (this.isClosed()) {
        this.open();
      } else {
        this.close();
      }
    }
  });
  MicroEvent.mixin(SlidingMenuViewModel);

  module.factory('SlidingMenuView', ['$onsen', '$compile', 'SlidingMenuAnimator', 'RevealSlidingMenuAnimator', 'PushSlidingMenuAnimator', 'OverlaySlidingMenuAnimator', function($onsen, $compile, SlidingMenuAnimator, RevealSlidingMenuAnimator, 
                                             PushSlidingMenuAnimator, OverlaySlidingMenuAnimator) {

    var SlidingMenuView = Class.extend({
      _scope: undefined,
      _attrs: undefined,

      _element: undefined,
      _menuPage: undefined,
      _mainPage: undefined,

      _doorLock: undefined,

      _isRightMenu: false,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._attrs = attrs;
        this._element = element;

        this._menuPage = angular.element(element[0].querySelector('.onsen-sliding-menu__menu'));
        this._mainPage = angular.element(element[0].querySelector('.onsen-sliding-menu__main'));

        this._doorLock = new DoorLock();

        this._isRightMenu = attrs.side === 'right';

        // Close menu on tap event.
        this._mainPageHammer = new Hammer(this._mainPage[0]);
        this._bindedOnTap = this._onTap.bind(this);

        var maxDistance = this._normalizeMaxSlideDistanceAttr();
        this._logic = new SlidingMenuViewModel({maxDistance: Math.max(maxDistance, 1)});
        this._logic.on('translate', this._translate.bind(this));
        this._logic.on('open', function(options) {
          this._open(options);
        }.bind(this));
        this._logic.on('close', function(options) {
          this._close(options);
        }.bind(this));

        attrs.$observe('maxSlideDistance', this._onMaxSlideDistanceChanged.bind(this));
        attrs.$observe('swipeable', this._onSwipeableChanged.bind(this));

        this._bindedOnWindowResize = this._onWindowResize.bind(this);
        window.addEventListener('resize', this._bindedOnWindowResize);

        this._boundHandleEvent = this._handleEvent.bind(this);
        this._bindEvents();

        if (attrs.mainPage) {
          this.setMainPage(attrs.mainPage);
        }

        if (attrs.menuPage) {
          this.setMenuPage(attrs.menuPage);
        }

        this._deviceBackButtonHandler = $onsen.DeviceBackButtonHandler.create(this._element, this._onDeviceBackButton.bind(this));

        var unlock = this._doorLock.lock();

        window.setTimeout(function() {
          var maxDistance = this._normalizeMaxSlideDistanceAttr();
          this._logic.setMaxDistance(maxDistance);

          this._menuPage.css({opacity: 1});

          this._animator = this._getAnimatorOption();
          this._animator.setup(
            this._element,
            this._mainPage,
            this._menuPage,
            {
              isRight: this._isRightMenu,
              width: this._attrs.maxSlideDistance || '90%'
            }
          );

          unlock();
        }.bind(this), 400);

        scope.$on('$destroy', this._destroy.bind(this));

        if (!attrs.swipeable) {
          this.setSwipeable(true);
        }
      },

      getDeviceBackButtonHandler: function() {
        return this._deviceBackButtonHandler;
      },

      _onDeviceBackButton: function(event) {
        if (this.isMenuOpened()) {
          this.closeMenu();
        } else {
          event.callParentHandler();
        }
      },

      _onTap: function() {
        if (this.isMenuOpened()) {
          this.closeMenu();
        }
      },

      _refreshMenuPageWidth: function() {
        var width = ('maxSlideDistance' in this._attrs) ? this._attrs.maxSlideDistance : '90%';

        if (this._animator) {
          this._animator.onResized({
            isOpened: this._logic.isOpened(),
            width: width
          });
        }
      },

      _destroy: function() {
        this.emit('destroy');

        this._deviceBackButtonHandler.destroy();
        window.removeEventListener('resize', this._bindedOnWindowResize);

        this._mainPageHammer.off('tap', this._bindedOnTap);
        this._element = this._scope = this._attrs = null;
      },

      _getAnimatorOption: function() {
        var animator = SlidingMenuView._animatorDict[this._attrs.type];

        if (!(animator instanceof SlidingMenuAnimator)) {
          animator = SlidingMenuView._animatorDict['default'];
        }

        return animator.copy();
      },

      _onSwipeableChanged: function(swipeable) {
        swipeable = swipeable === '' || swipeable === undefined || swipeable == 'true';

        this.setSwipeable(swipeable);
      },

      /**
       * @param {Boolean} enabled
       */
      setSwipeable: function(enabled) {
        if (enabled) {
          this._activateHammer();
        } else {
          this._deactivateHammer();
        }
      },

      _onWindowResize: function() {
        this._recalculateMAX();
        this._refreshMenuPageWidth();
      },

      _onMaxSlideDistanceChanged: function() {
        this._recalculateMAX();
        this._refreshMenuPageWidth();
      },

      /**
       * @return {Number}
       */
      _normalizeMaxSlideDistanceAttr: function() {
        var maxDistance = this._attrs.maxSlideDistance;

        if (!('maxSlideDistance' in this._attrs)) {
          maxDistance = 0.9 * this._mainPage[0].clientWidth;
        } else if (typeof maxDistance == 'string') {
          if (maxDistance.indexOf('px', maxDistance.length - 2) !== -1) {
            maxDistance = parseInt(maxDistance.replace('px', ''), 10);
          } else if (maxDistance.indexOf('%', maxDistance.length - 1) > 0) {
            maxDistance = maxDistance.replace('%', '');
            maxDistance = parseFloat(maxDistance) / 100 * this._mainPage[0].clientWidth;
          }
        } else {
          throw new Error('invalid state');
        }

        return maxDistance;
      },

      _recalculateMAX: function() {
        var maxDistance = this._normalizeMaxSlideDistanceAttr();

        if (maxDistance) {
          this._logic.setMaxDistance(parseInt(maxDistance, 10));
        }
      },

      _activateHammer: function(){
        this._hammertime.on('touch dragleft dragright swipeleft swiperight release', this._boundHandleEvent);
      },

      _deactivateHammer: function(){
        this._hammertime.off('touch dragleft dragright swipeleft swiperight release', this._boundHandleEvent);
      },

      _bindEvents: function() {
        this._hammertime = new Hammer(this._element[0], {
          dragMinDistance: 1
        });
      },

      _appendMainPage: function(pageUrl, templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = angular.element(templateHTML);
        var link = $compile(pageContent);

        this._mainPage.append(pageContent);

        if (this._currentPageElement) {
          this._currentPageElement.remove();
          this._currentPageScope.$destroy();
        }

        link(pageScope);

        this._currentPageElement = pageContent;
        this._currentPageScope = pageScope;
        this._currentPageUrl = pageUrl;
      },

      /**
       * @param {String}
       */
      _appendMenuPage: function(templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = angular.element(templateHTML);
        var link = $compile(pageContent);

        this._menuPage.append(pageContent);

        if (this._currentMenuPageScope) {
          this._currentMenuPageScope.$destroy();
          this._currentMenuPageElement.remove();
        }

        link(pageScope);

        this._currentMenuPageElement = pageContent;
        this._currentMenuPageScope = pageScope;
      },

      /**
       * @param {String} page
       * @param {Object} options
       * @param {Boolean} [options.closeMenu]
       * @param {Boolean} [options.callback]
       */
      setMenuPage: function(page, options) {
        if (page) {
          options = options || {};
          options.callback = options.callback || function() {};

          var self = this;
          $onsen.getPageHTMLAsync(page).then(function(html) {
            self._appendMenuPage(angular.element(html));
            if (options.closeMenu) {
              self.close();
            }
            options.callback();
          }, function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      /**
       * @param {String} pageUrl
       * @param {Object} options
       * @param {Boolean} [options.closeMenu]
       * @param {Boolean} [options.callback]
       */
      setMainPage: function(pageUrl, options) {
        options = options || {};
        options.callback = options.callback || function() {};

        var done = function() {
          if (options.closeMenu) {
            this.close();
          }
          options.callback();
        }.bind(this);

        if (this.currentPageUrl === pageUrl) {
          done();
          return;
        }

        if (pageUrl) {
          var self = this;
          $onsen.getPageHTMLAsync(pageUrl).then(function(html) {
            self._appendMainPage(pageUrl, html);
            done();
          }, function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      _handleEvent: function(event) {

        if (this._doorLock.isLocked()) {
          return;
        }

        if (this._isInsideIgnoredElement(event.target)){
          event.gesture.stopDetect();
        }

        switch (event.type) {
          case 'dragleft':
          case 'dragright':

            if (this._logic.isClosed() && !this._isInsideSwipeTargetArea(event)) {
              return;
            }

            event.gesture.preventDefault();

            var deltaX = event.gesture.deltaX;
            var deltaDistance = this._isRightMenu ? -deltaX : deltaX;

            var startEvent = event.gesture.startEvent;

            if (!('isOpened' in startEvent)) {
              startEvent.isOpened = this._logic.isOpened();
            }

            if (deltaDistance < 0 && this._logic.isClosed()) {
              break;
            }

            if (deltaDistance > 0 && this._logic.isOpened()) {
              break;
            }

            var distance = startEvent.isOpened ?
              deltaDistance + this._logic.getMaxDistance() : deltaDistance;

            this._logic.translate(distance);

            break;

          case 'swipeleft':
            event.gesture.preventDefault();

            if (this._logic.isClosed() && !this._isInsideSwipeTargetArea(event)) {
              return;
            }

            if (this._isRightMenu) {
              this.open();
            } else {
              this.close();
            }

            event.gesture.stopDetect();
            break;

          case 'swiperight':
            event.gesture.preventDefault();

            if (this._logic.isClosed() && !this._isInsideSwipeTargetArea(event)) {
              return;
            }

            if (this._isRightMenu) {
              this.close();
            } else {
              this.open();
            }

            event.gesture.stopDetect();
            break;

          case 'release':
            this._lastDistance = null;

            if (this._logic.shouldOpen()) {
              this.open();
            } else if (this._logic.shouldClose()) {
              this.close();
            }

            break;
        }
      },

      /**
       * @param {jqLite} element
       * @return {Boolean}
       */
      _isInsideIgnoredElement: function(element) {
        do {
          if (element.getAttribute && element.getAttribute('sliding-menu-ignore')) {
            return true;
          }
          element = element.parentNode;
        } while (element);

        return false;
      },

      _isInsideSwipeTargetArea: function(event) {
        var x = event.gesture.center.pageX;

        if (!('_swipeTargetWidth' in event.gesture.startEvent)) {
          event.gesture.startEvent._swipeTargetWidth = this._getSwipeTargetWidth();
        }

        var targetWidth = event.gesture.startEvent._swipeTargetWidth;
        return this._isRightMenu ? this._mainPage[0].clientWidth - x < targetWidth : x < targetWidth;
      },

      _getSwipeTargetWidth: function() {
        var targetWidth = this._attrs.swipeTargetWidth;

        if (typeof targetWidth == 'string') {
          targetWidth = targetWidth.replace('px', '');
        }

        var width = parseInt(targetWidth, 10);
        if (width < 0 || !targetWidth) {
          return this._mainPage[0].clientWidth;
        } else {
          return width;
        }
      },

      closeMenu: function() {
        return this.close.apply(this, arguments);
      },

      /**
       * Close sliding-menu page.
       *
       * @param {Object} options 
       */
      close: function(options) {
        options = options || {};
        options = typeof options == 'function' ? {callback: options} : options;

        if (!this._logic.isClosed()) {
          this.emit('preclose', {
            slidingMenu: this
          });

          this._doorLock.waitUnlock(function() {
            this._logic.close(options);
          }.bind(this));
        }
      },

      _close: function(options) {
        var callback = options.callback || function() {},
            unlock = this._doorLock.lock(),
            instant = options.animation == 'none';

        this._animator.closeMenu(function() {
          unlock();

          this._mainPage.children().css('pointer-events', '');
          this._mainPageHammer.off('tap', this._bindedOnTap);

          this.emit('postclose', {
            slidingMenu: this
          });

          callback();
        }.bind(this), instant);
      },

      /**
       * Open sliding-menu page.
       *
       * @param {Object} [options]
       * @param {Function} [options.callback]
       */
      openMenu: function() {
        return this.open.apply(this, arguments);
      },

      /**
       * Open sliding-menu page.
       *
       * @param {Object} [options]
       * @param {Function} [options.callback]
       */
      open: function(options) {
        options = options || {};
        options = typeof options == 'function' ? {callback: options} : options;

        this.emit('preopen', {
          slidingMenu: this
        });

        this._doorLock.waitUnlock(function() {
          this._logic.open(options);
        }.bind(this));
      },

      _open: function(options) {
        var callback = options.callback || function() {},
            unlock = this._doorLock.lock(),
            instant = options.animation == 'none';

        this._animator.openMenu(function() {
          unlock();

          this._mainPage.children().css('pointer-events', 'none');
          this._mainPageHammer.on('tap', this._bindedOnTap);

          this.emit('postopen', {
            slidingMenu: this
          });

          callback();
        }.bind(this), instant);
      },

      /**
       * Toggle sliding-menu page.
       * @param {Object} [options]
       * @param {Function} [options.callback]
       */
      toggle: function(options) {
        if (this._logic.isClosed()) {
          this.open(options);
        } else {
          this.close(options);
        }
      },

      /**
       * Toggle sliding-menu page.
       */
      toggleMenu: function() {
        return this.toggle.apply(this, arguments);
      },

      /**
       * @return {Boolean}
       */
      isMenuOpened: function() {
        return this._logic.isOpened();
      },

      /**
       * @param {Object} event
       */
      _translate: function(event) {
        this._animator.translateMenu(event);
      }
    });

    // Preset sliding menu animators.
    SlidingMenuView._animatorDict = {
      'default': new RevealSlidingMenuAnimator(),
      'overlay': new OverlaySlidingMenuAnimator(),
      'reveal': new RevealSlidingMenuAnimator(),
      'push': new PushSlidingMenuAnimator()
    };

    /**
     * @param {String} name
     * @param {NavigatorTransitionAnimator} animator
     */
    SlidingMenuView.registerSlidingMenuAnimator = function(name, animator) {
      if (!(animator instanceof SlidingMenuAnimator)) {
        throw new Error('"animator" param must be an instance of SlidingMenuAnimator');
      }

      this._animatorDict[name] = animator;
    };

    MicroEvent.mixin(SlidingMenuView);

    return SlidingMenuView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('SlidingMenuAnimator', function() {
    return Class.extend({
      
      /**
       * @param {jqLite} element "ons-sliding-menu" or "ons-split-view" element
       * @param {jqLite} mainPage
       * @param {jqLite} menuPage
       * @param {Object} options
       * @param {String} options.width "width" style value
       * @param {Boolean} options.isRight
       */
      setup: function(element, mainPage, menuPage, options) {
      },

      /**
       * @param {Object} options
       * @param {Boolean} options.isRight
       * @param {Boolean} options.isOpened
       * @param {String} options.width
       */
      onResized: function(options) {
      },

      /**
       * @param {Function} callback
       */
      openMenu: function(callback) {
      },

      /**
       * @param {Function} callback
       */
      closeClose: function(callback) {
      },

      /**
       */
      destroy: function() {
      },

      /**
       * @param {Object} options
       * @param {Number} options.distance
       * @param {Number} options.maxDistance
       */
      translateMenu: function(mainPage, menuPage, options) {
      },

      /**
       * @return {SlidingMenuAnimator}
       */
      copy: function() {
        throw new Error('Override copy method.');
      }
    });
  });
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
(function() {
  'use strict';
  var module = angular.module('onsen');

  module.factory('SplitView', ['$compile', 'RevealSlidingMenuAnimator', '$onsen', '$onsGlobal', function($compile, RevealSlidingMenuAnimator, $onsen, $onsGlobal) {
    var SPLIT_MODE = 0;
    var COLLAPSE_MODE = 1;
    var MAIN_PAGE_RATIO = 0.9;

    var ON_PAGE_READY = 'onPageReady';

    var SplitView = Class.extend({

      init: function(scope, element, attrs) {
        element.addClass('onsen-sliding-menu');

        this._element = element;
        this._scope = scope;
        this._attrs = attrs;

        this._mainPage = angular.element(element[0].querySelector('.onsen-split-view__main'));
        this._secondaryPage = angular.element(element[0].querySelector('.onsen-split-view__secondary'));

        this._max = this._mainPage[0].clientWidth * MAIN_PAGE_RATIO;
        this._mode = SPLIT_MODE;
        this._doorLock = new DoorLock();

        this._doSplit = false;
        this._doCollapse = false;

        $onsGlobal.orientation.on('change', this._onResize.bind(this));

        this._animator = new RevealSlidingMenuAnimator();

        this._element.css('display', 'none');

        if (attrs.mainPage) {
          this.setMainPage(attrs.mainPage);
        }

        if (attrs.secondaryPage) {
          this.setSecondaryPage(attrs.secondaryPage);
        }

        var unlock = this._doorLock.lock();

        this._considerChangingCollapse();
        this._setSize();

        setTimeout(function() {
          this._element.css('display', 'block');
          unlock();
        }.bind(this), 1000 / 60 * 2);

        scope.$on('$destroy', this._destroy.bind(this));
      },

      /**
       * @param {String} templateHTML
       */
      _appendSecondPage: function(templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._secondaryPage.append(pageContent);

        if (this._currentSecondaryPageElement) {
          this._currentSecondaryPageElement.remove();
          this._currentSecondaryPageScope.$destroy();
        }

        this._currentSecondaryPageElement = pageContent;
        this._currentSecondaryPageScope = pageScope;
      },

      /**
       * @param {String} templateHTML
       */
      _appendMainPage: function(templateHTML) {
        var pageScope = this._scope.$new();
        var pageContent = $compile(templateHTML)(pageScope);

        this._mainPage.append(pageContent);

        if (this._currentPage) {
          this._currentPage.remove();
          this._currentPageScope.$destroy();
        }

        this._currentPage = pageContent;
        this._currentPageScope = pageScope;
      },

      /**
       * @param {String} page
       */
      setSecondaryPage : function(page) {
        if (page) {
          $onsen.getPageHTMLAsync(page).then(function(html) {
            this._appendSecondPage(angular.element(html.trim()));
          }.bind(this), function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      /**
       * @param {String} page
       */
      setMainPage : function(page) {
        if (page) {
          $onsen.getPageHTMLAsync(page).then(function(html) {
            this._appendMainPage(angular.element(html.trim()));
          }.bind(this), function() {
            throw new Error('Page is not found: ' + page);
          });
        } else {
          throw new Error('cannot set undefined page');
        }
      },

      _onResize: function() {
        var lastMode = this._mode;

        this._considerChangingCollapse();

        if (lastMode === COLLAPSE_MODE && this._mode === COLLAPSE_MODE) {
          this._animator.onResized({
            isOpened: false,
            width: '90%'
          });
        }

        this._max = this._mainPage[0].clientWidth * MAIN_PAGE_RATIO;
      },

      _considerChangingCollapse: function() {
        var should = this._shouldCollapse();

        if (should && this._mode !== COLLAPSE_MODE) {
          this._fireUpdateEvent();
          if (this._doSplit) {
            this._activateSplitMode();
          } else {
            this._activateCollapseMode();
          }
        } else if (!should && this._mode === COLLAPSE_MODE) {
          this._fireUpdateEvent();
          if (this._doCollapse) {
            this._activateCollapseMode();
          } else {
            this._activateSplitMode();
          }
        }

        this._doCollapse = this._doSplit = false;
      },

      update: function() {
        this._fireUpdateEvent();

        var should = this._shouldCollapse();

        if (this._doSplit) {
          this._activateSplitMode(); 
        } else if (this._doCollapse) {
          this._activateCollapseMode(); 
        } else if (should) {
          this._activateCollapseMode();
        } else if (!should) {
          this._activateSplitMode();
        }

        this._doSplit = this._doCollapse = false;
      },

      _getOrientation: function() {
        if ($onsGlobal.orientation.isPortrait()) {
          return 'portrait';
        } else {
          return 'landscape';
        }
      },

      getCurrentMode: function() {
        if (this._mode === COLLAPSE_MODE) {
          return 'collapse';
        } else {
          return 'split';
        }
      },

      _shouldCollapse: function() {
        var c = 'portrait';
        if (typeof this._attrs.collapse === 'string') {
          c = this._attrs.collapse.trim();
        }

        if (c == 'portrait') {
          return $onsGlobal.orientation.isPortrait();
        } else if (c == 'landscape') {
          return $onsGlobal.orientation.isLandscape();
        } else if (c.substr(0,5) == 'width') {
          var num = c.split(' ')[1];
          if (num.indexOf('px') >= 0) {
            num = num.substr(0,num.length-2);
          }

          var width = window.innerWidth;

          return isNumber(num) && width < num;
        } else {
          var mq = window.matchMedia(c);
          return mq.matches;
        }
      },

      _setSize: function() {
        if (this._mode === SPLIT_MODE) {
          if (!this._attrs.mainPageWidth) {
            this._attrs.mainPageWidth = '70';
          }

          var secondarySize = 100 - this._attrs.mainPageWidth.replace('%', '');
          this._secondaryPage.css({
            width: secondarySize + '%',
            opacity: 1
          });

          this._mainPage.css({
            width: this._attrs.mainPageWidth + '%'
          });

          this._mainPage.css('left', secondarySize + '%');
        }
      },

      _fireEvent: function(name) {
        this.emit(name, {
          splitView: this,
          width: window.innerWidth,
          orientation: this._getOrientation() 
        });
      },

      _fireUpdateEvent: function() {
        var that = this;

        this.emit('update', {
          splitView: this,
          shouldCollapse: this._shouldCollapse(),
          currentMode: this.getCurrentMode(),
          split: function() {
            that._doSplit = true;
            that._doCollapse = false;
          },
          collapse: function() {
            that._doSplit = false;
            that._doCollapse = true;
          },
          width: window.innerWidth,
          orientation: this._getOrientation()
        }); 
      },

      _activateCollapseMode: function() {
        if (this._mode !== COLLAPSE_MODE) {
          this._fireEvent('precollapse');
       
          this._secondaryPage.attr('style', '');
          this._mainPage.attr('style', '');

          this._mode = COLLAPSE_MODE;

          this._animator.setup(
            this._element,
            this._mainPage,
            this._secondaryPage,
            {isRight: false, width: '90%'}
          );

          this._fireEvent('postcollapse');
        }
      },

      _activateSplitMode: function() {
        if (this._mode !== SPLIT_MODE) {
          this._fireEvent('presplit');

          this._animator.destroy();

          this._secondaryPage.attr('style', '');
          this._mainPage.attr('style', '');

          this._mode = SPLIT_MODE;
          this._setSize();
       
          this._fireEvent('postsplit');
        }
      },

      _destroy: function() {
        this.emit('destroy');

        this._element = null;
        this._scope = null;
      }
    });

    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    MicroEvent.mixin(SplitView);

    return SplitView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.factory('SwitchView', ['$onsen', function($onsen) {

    var SwitchView = Class.extend({

      /**
       * @param {jqLite} element
       * @param {Object} scope
       * @param {Object} attrs
       */
      init: function(element, scope, attrs) {
        this._element = element;
        this._checkbox = angular.element(element[0].querySelector('input[type=checkbox]'));
        this._scope = scope;

        attrs.$observe('disabled', function(disabled) {
          if (!!element.attr('disabled')) {
            this._checkbox.attr('disabled', 'disabled');
          } else {
            this._checkbox.removeAttr('disabled');
          }
        }.bind(this));

        this._checkbox.on('change', function(event) {
          this.emit('change', {'switch': this, value: this._checkbox[0].checked, isInteractive: true});
        }.bind(this));
      },

      /**
       * @return {Boolean}
       */
      isChecked: function() {
        return this._checkbox[0].checked;
      },

      /**
       * @param {Boolean}
       */
      setChecked: function(isChecked) {
        isChecked = !!isChecked;

        if (this._checkbox[0].checked != isChecked) {
          this._scope.model = isChecked;
          this._checkbox[0].checked = isChecked;
          this._scope.$evalAsync();

          this.emit('change', {'switch': this, value: isChecked, isInteractive: false});
        }
      },

      /**
       * @return {HTMLElement}
       */
      getCheckboxElement: function() {
        return this._checkbox[0];
      }
    });
    MicroEvent.mixin(SwitchView);

    return SwitchView;
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function() {
  'use strict;';

  var module = angular.module('onsen');

  module.factory('TabbarAnimator', function() {

    var TabbarAnimator = Class.extend({
      /**
       * @param {jqLite} enterPage
       * @param {jqLite} leavePage
       */
      apply: function(enterPage, leavePage, done) {
        throw new Error('This method must be implemented.');
      }
    });

    return TabbarAnimator;
  });

  module.factory('TabbarNoneAnimator', ['TabbarAnimator', function(TabbarAnimator) {

    var TabbarNoneAnimator = TabbarAnimator.extend({
      /**
       * @param {jqLite} enterPage
       * @param {jqLite} leavePage
       */
      apply: function(enterPage, leavePage, done) {
        done();
      }
    });

    return TabbarNoneAnimator;
  }]);

  module.factory('TabbarFadeAnimator', ['TabbarAnimator', function(TabbarAnimator) {

    var TabbarFadeAnimator = TabbarAnimator.extend({
      /**
       * @param {jqLite} enterPage
       * @param {jqLite} leavePage
       */
      apply: function(enterPage, leavePage, done) {
        animit.runAll(
          animit(enterPage[0])
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 0
            })
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            }, {
              duration: 0.4,
              timing: 'linear'
            })
            .resetStyle()
            .queue(function(callback) {
              done();
              callback();
            }),
          animit(leavePage[0])
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 1
            })
            .queue({
              transform: 'translate3D(0, 0, 0)',
              opacity: 0
            }, {
              duration: 0.4,
              timing: 'linear'
            })
        );
      }
    });

    return TabbarFadeAnimator;
  }]);

  module.factory('TabbarView', ['$onsen', '$compile', 'TabbarAnimator', 'TabbarNoneAnimator', 'TabbarFadeAnimator', function($onsen, $compile, TabbarAnimator, TabbarNoneAnimator, TabbarFadeAnimator) {
    var TabbarView = Class.extend({
      _tabbarId: undefined,

      _tabItems: undefined,

      init: function(scope, element, attrs) {
        this._scope = scope;
        this._element = element;
        this._attrs = attrs;

        this._tabbarId = Date.now();
        this._tabItems = [];

        this._contentElement = angular.element(element[0].querySelector('.ons-tab-bar__content'));
        this._tabbarElement = angular.element(element[0].querySelector('.ons-tab-bar__footer'));

        this._scope.$on('$destroy', this._destroy.bind(this));

        if (this._hasTopTabbar()) {
          this._prepareForTopTabbar();
        }
      },

      _prepareForTopTabbar: function() {
        this._contentElement.attr('no-status-bar-fill', '');

        setImmediate(function() {
          this._contentElement.addClass('tab-bar--top__content');
          this._tabbarElement.addClass('tab-bar--top');
        }.bind(this));

        var page = ons.findParentComponentUntil('ons-page', this._element[0]);
        if (page) {
          this._element.css('top', window.getComputedStyle(page.getContentElement(), null).getPropertyValue('padding-top'));
        }

        if ($onsen.shouldFillStatusBar(this._element[0])) {
          // Adjustments for IOS7
          var fill = angular.element(document.createElement('div'));
          fill.addClass('tab-bar__status-bar-fill');
          fill.css({width: '0px', height: '0px'});

          this._element.prepend(fill);
        }
      },

      _hasTopTabbar: function() {
        return this._attrs.position === 'top';
      },

      /**
       * @param {Number} index
       * @param {Object} [options]
       * @param {Boolean} [options.keepPage]
       * @param {String} [options.animation]
       * @return {Boolean} success or not
       */
      setActiveTab: function(index, options) {
        options = options || {};
        var previousTabItem = this._tabItems[this.getActiveTabIndex()];
        var selectedTabItem = this._tabItems[index];

        if ((typeof selectedTabItem.noReload !== 'undefined' || selectedTabItem.isPersistent()) &&
            index === this.getActiveTabIndex()) {
          this.emit('reactive', {
            index: index,
            tabItem: selectedTabItem,
          });
          return false;
        }

        var needLoad = selectedTabItem.page && !options.keepPage;

        if (!selectedTabItem) {
          return false;
        }

        var canceled = false;
        this.emit('prechange', {
          index: index,
          tabItem: selectedTabItem,
          cancel: function() {
            canceled = true;
          }
        });

        if (canceled) {
          selectedTabItem.setInactive();
          if (previousTabItem) {
            previousTabItem.setActive();
          }
          return false;
        }

        selectedTabItem.setActive();

        if (needLoad) {
          var removeElement = true;

          if (previousTabItem && previousTabItem.isPersistent()) {
              removeElement = false;
              previousTabItem._pageElement = this._currentPageElement;
          }

          var params = {
            callback: function() {
              this.emit('postchange', {index: index, tabItem: selectedTabItem});
            }.bind(this),
            _removeElement: removeElement
          };
          if (options.animation) {
              params.animation = options.animation;
          }

          if (selectedTabItem.isPersistent() && selectedTabItem._pageElement) {
            this._loadPersistentPageDOM(selectedTabItem._pageElement, params);
          }
          else {
            this._loadPage(selectedTabItem.page, params);
          }
        }

        for (var i = 0; i < this._tabItems.length; i++) {
          if (this._tabItems[i] != selectedTabItem) {
            this._tabItems[i].setInactive();
          } else {
            if (!needLoad) {
              this.emit('postchange', {index: index, tabItem: selectedTabItem});
            }
          }
        }

        return true;
      },

      /**
       * @param {Boolean} visible
       */
      setTabbarVisibility: function(visible) {
        this._scope.hideTabs = !visible;
        this._onTabbarVisibilityChanged();
      },

      _onTabbarVisibilityChanged: function() {
        if (this._hasTopTabbar()) {
          if (this._scope.hideTabs) {
            this._contentElement.css('top', '0px');
          } else {
            this._contentElement.css('top', '');
          }
        } else {
          if (this._scope.hideTabs) {
            this._contentElement.css('bottom', '0px');
          } else {
            this._contentElement.css('bottom', '');
          }
        }
      },

      /**
       * @param {Object} tabItem
       */
      addTabItem: function(tabItem) {
        this._tabItems.push(tabItem);
      },

      /**
       * @return {Number} When active tab is not found, returns -1.
       */
      getActiveTabIndex: function() {
        var tabItem;
        for (var i = 0; i < this._tabItems.length; i++) {
          tabItem = this._tabItems[i];
          if (tabItem.isActive()) {
            return i;
          }
        }

        return -1;
      },

      /**
       * @param {String} page
       * @param {Object} [options]
       * @param {Object} [options.animation]
       * @param {Object} [options.callback]
       */
      loadPage: function(page, options) {
        return this._loadPage(page, options);
      },

      /**
       * @param {String} page
       * @param {Object} [options]
       * @param {Object} [options.animation]
       */
      _loadPage: function(page, options) {

        $onsen.getPageHTMLAsync(page).then(function(html) {
          var pageElement = angular.element(html.trim());

          this._loadPageDOM(pageElement, options);

        }.bind(this), function() {
          throw new Error('Page is not found: ' + page);
        });
      },

      /**
       * @param {jqLite} element
       * @param {Object} scope
       * @param {Object} options
       * @param {Object} options.animation
       */
      _switchPage: function(element, scope, options) {
        if (this._currentPageElement) {
          var oldPageElement = this._currentPageElement;
          var oldPageScope = this._currentPageScope;

          this._currentPageElement = element;
          this._currentPageScope = scope;

          this._getAnimatorOption(options).apply(element, oldPageElement, function() {
            if (options._removeElement) {
              oldPageElement.remove();
              oldPageScope.$destroy();
            }
            else {
              oldPageElement.css('display', 'none');
            }

            if (options.callback instanceof Function) {
              options.callback();
            }
          });

        } else {
          this._currentPageElement = element;
          this._currentPageScope = scope;

          if (options.callback instanceof Function) {
            options.callback();
          }
        } 
      },

      /**
       * @param {jqLite} element
       * @param {Object} options
       * @param {Object} options.animation
       */
      _loadPageDOM: function(element, options) {
        options = options || {};
        var pageScope = this._scope.$new();
        var link = $compile(element);

        this._contentElement.append(element);
        var pageContent = link(pageScope);

        pageScope.$evalAsync();

        this._switchPage(pageContent, pageScope, options);
      },

      /**
       * @param {jqLite} element
       * @param {Object} options
       * @param {Object} options.animation
       */
      _loadPersistentPageDOM: function(element, options) {
        options = options || {};

        element.css('display', 'block');
        this._switchPage(element, element.scope(), options);
      },

      /**
       * @param {Object} options
       * @param {String} [options.animation]
       * @return {TabbarAnimator}
       */
      _getAnimatorOption: function(options) {
        var animationAttr = this._element.attr('animation') || 'default';

        return TabbarView._animatorDict[options.animation || animationAttr] || TabbarView._animatorDict['default'];
      },

      _destroy: function() {
        this.emit('destroy');

        this._element = this._scope = this._attrs = null;
      }
    });
    MicroEvent.mixin(TabbarView);

    // Preset transition animators.
    TabbarView._animatorDict = {
      'default': new TabbarNoneAnimator(),
      'none': new TabbarNoneAnimator(),
      'fade': new TabbarFadeAnimator()
    };

    /**
     * @param {String} name
     * @param {NavigatorTransitionAnimator} animator
     */
    TabbarView.registerAnimator = function(name, animator) {
      if (!(animator instanceof TabbarAnimator)) {
        throw new Error('"animator" param must be an instance of TabbarAnimator');
      }

      this._animatorDict[name] = animator;
    };

    return TabbarView;
  }]);

})();


/**
 * @ngdoc directive
 * @id alert-dialog
 * @name ons-alert-dialog
 * @category dialog
 * @modifier android
 *   [en]Display an Android style alert dialog.[/en]
 *   [ja]Androidライクなスタイルを表示します。[/ja]
 * @description
 *   [en]Alert dialog that is displayed on top of the current screen.[/en]
 *   [ja]現在のスクリーンにアラートダイアログを表示します。[/ja]
 * @codepen Qwwxyp
 * @guide UsingAlert
 *   [en]Learn how to use the alert dialog.[/en]
 *   [ja]アラートダイアログの使い方の解説。[/ja]
 * @seealso ons-dialog
 *   [en]ons-dialog component[/en]
 *   [ja]ons-dialogコンポーネント[/ja]
 * @seealso ons-popover
 *   [en]ons-popover component[/en]
 *   [ja]ons-dialogコンポーネント[/ja]
 * @seealso ons.notification
 *   [en]Using ons.notification utility functions.[/en]
 *   [ja]アラートダイアログを表示するには、ons.notificationオブジェクトのメソッドを使うこともできます。[/ja]
 * @example
 * <script>
 *   ons.ready(function() {
 *     ons.createAlertDialog('alert.html').then(function(alertDialog) {
 *       alertDialog.show();
 *     });
 *   });
 * </script>
 *
 * <script type="text/ons-template" id="alert.html">
 *   <ons-alert-dialog animation="default" cancelable>
 *     <div class="alert-dialog-title">Warning!</div>
 *     <div class="alert-dialog-content">
 *       An error has occurred!
 *     </div>
 *     <div class="alert-dialog-footer">
 *       <button class="alert-dialog-button">OK</button>
 *     </div>
 *   </ons-alert-dialog>
 * </script>
 */

/**
 * @ngdoc event
 * @name preshow
 * @description
 *   [en]Fired just before the alert dialog is displayed.[/en]
 *   [ja]アラートダイアログが表示される直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 *   [en]Alert dialog object.[/en]
 *   [ja]アラートダイアログのオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Execute to stop the dialog from showing.[/en]
 *   [ja]この関数を実行すると、アラートダイアログの表示を止めます。[/ja]
 */

/**
 * @ngdoc event
 * @name postshow
 * @description
 *   [en]Fired just after the alert dialog is displayed.[/en]
 *   [ja]アラートダイアログが表示された直後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 *   [en]Alert dialog object.[/en]
 *   [ja]アラートダイアログのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name prehide
 * @description
 *   [en]Fired just before the alert dialog is hidden.[/en]
 *   [ja]アラートダイアログが隠れる直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 *   [en]Alert dialog object.[/en]
 *   [ja]アラートダイアログのオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Execute to stop the dialog from hiding.[/en]
 *   [ja]この関数を実行すると、アラートダイアログが閉じようとするのを止めます。[/ja]
 */

/**
 * @ngdoc event
 * @name posthide
 * @description
 * [en]Fired just after the alert dialog is hidden.[/en]
 * [ja]アラートダイアログが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.alertDialog
 *   [en]Alert dialog object.[/en]
 *   [ja]アラートダイアログのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *  [en]Variable name to refer this alert dialog.[/en]
 *  [ja]このアラートダイアログを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the dialog.[/en]
 *  [ja]ダイアログの見た目を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name cancelable
 * @description
 *  [en]If this attribute is set the dialog can be closed by tapping the background or by pressing the back button.[/en]
 *  [ja]この属性があると、ダイアログが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *  [en]If this attribute is set the dialog is disabled.[/en]
 *  [ja]この属性がある時、アラートダイアログはdisabled状態になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default default
 * @description
 *  [en]The animation used when showing and hiding the dialog. Can be either "none" or "default".[/en]
 *  [ja]ダイアログを表示する際のアニメーション名を指定します。デフォルトでは"none"か"default"が指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name mask-color
 * @type {String}
 * @default rgba(0, 0, 0, 0.2)
 * @description
 *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
 *  [ja]背景のマスクの色を指定します。"rgba(0, 0, 0, 0.2)"がデフォルト値です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preshow
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prehide
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postshow
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-posthide
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature show([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade", "slide" and "none".[/en]
 *   [ja]アニメーション名を指定します。指定できるのは、"fade", "slide", "none"のいずれかです。[/ja]
 * @param {Function} [options.callback]
 *   [en]Function to execute after the dialog has been revealed.[/en]
 *   [ja]ダイアログが表示され終わった時に呼び出されるコールバックを指定します。[/ja]
 * @description
 *   [en]Show the alert dialog.[/en]
 *   [ja]ダイアログを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade", "slide" and "none".[/en]
 *   [ja]アニメーション名を指定します。"fade", "slide", "none"のいずれかを指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]Function to execute after the dialog has been hidden.[/en]
 *   [ja]このダイアログが閉じた時に呼び出されるコールバックを指定します。[/ja]
 * @description
 *   [en]Hide the alert dialog.[/en]
 *   [ja]ダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @description
 *   [en]Returns whether the dialog is visible or not.[/en]
 *   [ja]ダイアログが表示されているかどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is currently visible.[/en]
 *   [ja]ダイアログが表示されていればtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature destroy()
 * @description
 *   [en]Destroy the alert dialog and remove it from the DOM tree.[/en]
 *   [ja]ダイアログを破棄して、DOMツリーから取り除きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setCancelable(cancelable)
 * @description
 *   [en]Define whether the dialog can be canceled by the user or not.[/en]
 *   [ja]アラートダイアログを表示した際に、ユーザがそのダイアログをキャンセルできるかどうかを指定します。[/ja]
 * @param {Boolean} cancelable
 *   [en]If true the dialog will be cancelable.[/en]
 *   [ja]キャンセルできるかどうかを真偽値で指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isCancelable()
 * @description
 *   [en]Returns whether the dialog is cancelable or not.[/en]
 *   [ja]このアラートダイアログがキャンセル可能かどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is cancelable.[/en]
 *   [ja]キャンセル可能であればtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @description
 *   [en]Disable or enable the alert dialog.[/en]
 *   [ja]このアラートダイアログをdisabled状態にするかどうかを設定します。[/ja]
 * @param {Boolean} disabled
 *   [en]If true the dialog will be disabled.[/en]
 *   [ja]disabled状態にするかどうかを真偽値で指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @description
 *   [en]Returns whether the dialog is disabled or enabled.[/en]
 *   [ja]このアラートダイアログがdisabled状態かどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is disabled.[/en]
 *   [ja]disabled状態であればtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火された際に呼び出されるコールバックを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出されるコールバックを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしlistenerパラメータが指定されなかった場合、そのイベントのリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーの関数オブジェクトを渡します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Alert dialog directive.
   */
  module.directive('onsAlertDialog', ['$onsen', 'AlertDialogView', function($onsen, AlertDialogView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: false,

      compile: function(element, attrs) {
        var modifierTemplater = $onsen.generateModifierTemplater(attrs);

        element.addClass('alert-dialog ' + modifierTemplater('alert-dialog--*'));

        var titleElement = angular.element(element[0].querySelector('.alert-dialog-title')),
          contentElement = angular.element(element[0].querySelector('.alert-dialog-content'));

        if (titleElement.length) {
          titleElement.addClass(modifierTemplater('alert-dialog-title--*'));
        }

        if (contentElement.length) {
          contentElement.addClass(modifierTemplater('alert-dialog-content--*'));
        }

        return {
          pre: function(scope, element, attrs) {
            var alertDialog = new AlertDialogView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, alertDialog);
            $onsen.registerEventHandlers(alertDialog, 'preshow prehide postshow posthide destroy');
            $onsen.addModifierMethods(alertDialog, 'alert-dialog--*', element);

            if (titleElement.length) {
              $onsen.addModifierMethods(alertDialog, 'alert-dialog-title--*', titleElement);
            }
            if (contentElement.length) {
              $onsen.addModifierMethods(alertDialog, 'alert-dialog-content--*', contentElement);
            }
            if ($onsen.isAndroid()) {
              alertDialog.addModifier('android');
            }

            element.data('ons-alert-dialog', alertDialog);
            scope.$on('$destroy', function() {
              alertDialog._events = undefined;
              $onsen.removeModifierMethods(alertDialog);
              element.data('ons-alert-dialog', undefined);
              element = null;
            });
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id back_button
 * @name ons-back-button
 * @category toolbar
 * @description
 *   [en]Back button component for ons-toolbar. Can be used with ons-navigator to provide back button support.[/en]
 *   [ja]ons-toolbarに配置できる「戻るボタン」用コンポーネントです。ons-navigatorと共に使用し、ページを1つ前に戻る動作を行います。[/ja]
 * @codepen aHmGL
 * @seealso ons-toolbar 
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-navigator
 *   [en]ons-navigator component[/en]
 *   [ja]ons-navigatorコンポーネント[/en]
 * @guide Addingatoolbar 
 *   [en]Adding a toolbar[/en]
 *   [ja]ツールバーの追加[/ja]
 * @guide Returningfromapage 
 *   [en]Returning from a page[/en]
 *   [ja]一つ前のページに戻る[/ja]
 * @example
 * <ons-back-button>
 *   Back
 * </ons-back-button>
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsBackButton', ['$onsen', '$compile', 'GenericView', 'ComponentCleaner', function($onsen, $compile, GenericView, ComponentCleaner) {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/back_button.tpl',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: true,
      scope: true,

      link: {
        pre: function(scope, element, attrs, controller, transclude) {
          var backButton = new GenericView(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, backButton);

          element.data('ons-back-button', backButton);

          scope.$on('$destroy', function() {
            backButton._events = undefined;
            $onsen.removeModifierMethods(backButton);
            element.data('ons-back-button', undefined);
            element = null;
          });

          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

          var navigator = ons.findParentComponentUntil('ons-navigator', element);
          scope.$watch(function() { return navigator.pages.length; }, function(nbrOfPages) {
            scope.showBackButton = nbrOfPages > 1;
          });

          $onsen.addModifierMethods(backButton, 'toolbar-button--*', element.children());

          transclude(scope, function(clonedElement) {
            if (clonedElement[0]) {
              element[0].querySelector('.back-button__label').appendChild(clonedElement[0]);
            }
          });

          ComponentCleaner.onDestroy(scope, function() {
            ComponentCleaner.destroyScope(scope);
            ComponentCleaner.destroyAttributes(attrs);
            element = null;
            scope = null;
            attrs = null;
          });
        },
        post: function(scope, element) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id bottom_toolbar
 * @name ons-bottom-toolbar
 * @category toolbar
 * @description
 *   [en]Toolbar component that is positioned at the bottom of the page.[/en]
 *   [ja]ページ下部に配置されるツールバー用コンポーネントです。[/ja]
 * @modifier transparent
 *   [en]Make the toolbar transparent.[/en]
 *   [ja]ツールバーの背景を透明にして表示します。[/ja]
 * @seealso ons-toolbar [en]ons-toolbar component[/en][ja]ons-toolbarコンポーネント[/ja]
 * @guide Addingatoolbar
 *   [en]Adding a toolbar[/en]
 *   [ja]ツールバーの追加[/ja]
 * @example
 * <ons-bottom-toolbar>
 *   <div style="text-align: center; line-height: 44px">Text</div>
 * </ons-bottom-toolbar>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the toolbar.[/en]
 *   [ja]ツールバーの見た目の表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name inline
 * @description
 *   [en]Display the toolbar as an inline element.[/en]
 *   [ja]この属性があると、ツールバーを画面下部ではなくスクロール領域内にそのまま表示します。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsBottomToolbar', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      transclude: false,
      scope: false,
      compile: function(element, attrs) {
        var modifierTemplater = $onsen.generateModifierTemplater(attrs),
          inline = typeof attrs.inline !== 'undefined';

        element.addClass('bottom-bar');
        element.addClass(modifierTemplater('bottom-bar--*'));
        element.css({'z-index': 0});

        if (inline) {
          element.css('position', 'static');
        }

        return {
          pre: function(scope, element, attrs) {
            var bottomToolbar = new GenericView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, bottomToolbar);
            element.data('ons-bottomToolbar', bottomToolbar);

            scope.$on('$destroy', function() {
              bottomToolbar._events = undefined;
              $onsen.removeModifierMethods(bottomToolbar);
              element.data('ons-bottomToolbar', undefined);
              element = null;
            });

            $onsen.addModifierMethods(bottomToolbar, 'bottom-bar--*', element);

            var pageView = element.inheritedData('ons-page');
            if (pageView && !inline) {
              pageView.registerBottomToolbar(element);
            }
          },
          post: function(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id button
 * @name ons-button
 * @category form
 * @modifier outline
 *   [en]Button with outline and transparent background[/en]
 *   [ja]アウトラインを持ったボタンを表示します。[/ja]
 * @modifier light
 *   [en]Button that doesn't stand out.[/en]
 *   [ja]目立たないボタンを表示します。[/ja]
 * @modifier quiet
 *   [en]Button with no outline and or background..[/en]
 *   [ja]枠線や背景が無い文字だけのボタンを表示します。[/ja]
 * @modifier cta
 *   [en]Button that really stands out.[/en]
 *   [ja]目立つボタンを表示します。[/ja]
 * @modifier large
 *   [en]Large button that covers the width of the screen.[/en]
 *   [ja]横いっぱいに広がる大きなボタンを表示します。[/ja]
 * @modifier large--quiet
 *   [en]Large quiet button.[/en]
 *   [ja]横いっぱいに広がるquietボタンを表示します。[/ja]
 * @modifier large--cta
 *   [en]Large call to action button.[/en]
 *   [ja]横いっぱいに広がるctaボタンを表示します。[/ja]
 * @description
 *   [en]Button component. If you want to place a button in a toolbar, use ons-toolbar-button or ons-back-button instead.[/en]
 *   [ja]ボタン用コンポーネント。ツールバーにボタンを設置する場合は、ons-toolbar-buttonもしくはons-back-buttonコンポーネントを使用します。[/ja]
 * @codepen hLayx
 * @guide Button [en]Guide for ons-button[/en][ja]ons-buttonの使い方[/ja]
 * @guide OverridingCSSstyles [en]More details about modifier attribute[/en][ja]modifier属性の使い方[/ja]
 * @example
 * <ons-button modifier="large--cta">
 *   Tap Me
 * </ons-button>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the button.[/en]
 *  [ja]ボタンの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name should-spin
 * @type {Boolean}
 * @description
 *  [en]Specify if the button should have a spinner. [/en]
 *  [ja]ボタンにスピナーを表示する場合に指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @description
 *   [en]The animation when the button transitions to and from the spinner. Possible values are "slide-left" (default), "slide-right", "slide-up", "slide-down", "expand-left", "expand-right", "expand-up", "expand-down", "zoom-out", "zoom-in".[/en]
 *   [ja]スピナーを表示する場合のアニメーションを指定します。"slide-left" (デフォルト), "slide-right", "slide-up", "slide-down", "expand-left", "expand-right", "expand-up", "expand-down", "zoom-out", "zoom-in"のいずれかを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]Specify if button should be disabled.[/en]
 *   [ja]ボタンを無効化する場合は指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature startSpin()
 * @description
 *   [en]Show spinner on the button.[/en]
 *   [ja]ボタンにスピナーを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature stopSpin()
 * @description
 *   [en]Remove spinner from button.[/en]
 *   [ja]ボタンのスピナーを隠します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isSpinning()
 * @return {Boolean}
 *   [en]true if the button is spinning.[/en]
 *   [ja]spinしているかどうかを返します。[/ja]
 * @description
 *   [en]Return whether the spinner is visible or not.[/en]
 *   [ja]ボタン内にスピナーが表示されているかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setSpinAnimation(animation)
 * @description
 *   [en]Set spin animation. Possible values are "slide-left" (default), "slide-right", "slide-up", "slide-down", "expand-left", "expand-right", "expand-up", "expand-down", "zoom-out", "zoom-in".[/en]
 *   [ja]スピナーを表示する場合のアニメーションを指定します。"slide-left" (デフォルト), "slide-right", "slide-up", "slide-down", "expand-left", "expand-right", "expand-up", "expand-down", "zoom-out", "zoom-in"のいずれかを指定します。[/ja]
 * @param {String} animation
 *   [en]Animation name.[/en]
 *   [ja]アニメーション名を指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @description
 *   [en]Disable or enable the button.[/en]
 *   [ja]このボタンをdisabled状態にするかどうかを設定します。[/ja]
 * @param {String} disabled
 *   [en]If true the button will be disabled.[/en]
 *   [ja]disabled状態にするかどうかを真偽値で指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the button is disabled.[/en]
 *   [ja]ボタンがdisabled状態になっているかどうかを返します。[/ja]
 * @description
 *   [en]Returns whether the button is disabled or enabled.[/en]
 *   [ja]このボタンがdisabled状態かどうかを返します。[/ja]
 */

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsButton', ['$onsen', 'ButtonView', function($onsen, ButtonView) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: {
        animation: '@',
      },
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/button.tpl',
      link: function(scope, element, attrs, _, transclude) {
        var button = new ButtonView(scope, element, attrs);

        $onsen.declareVarAttribute(attrs, button);
        element.data('ons-button', button);

        scope.$on('$destroy', function() {
          button._events = undefined;
          $onsen.removeModifierMethods(button);
          element.data('ons-button', undefined);
          element = null;
        });
        var initialAnimation = 'slide-left';

        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
        element.addClass('button effeckt-button');
        element.addClass(scope.modifierTemplater('button--*'));
        element.addClass(initialAnimation);

        $onsen.addModifierMethods(button, 'button--*', element);

        transclude(scope.$parent, function(cloned) {
          angular.element(element[0].querySelector('.ons-button-inner')).append(cloned);
        });

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        scope.item = {};
        // if animation is not specified -> default is slide-left
        scope.item.animation = initialAnimation;

        scope.$watch('animation', function(newAnimation) {
          if (newAnimation) {
            if (scope.item.animation) {
              element.removeClass(scope.item.animation);
            }
            scope.item.animation = newAnimation;
            element.addClass(scope.item.animation);
          }
        });

        attrs.$observe('shouldSpin', function(shouldSpin) {
          if (shouldSpin === 'true') {
            element.attr('data-loading', true);
          } else {
            element.removeAttr('data-loading');
          }
        });

        $onsen.cleaner.onDestroy(scope, function() {
          $onsen.clearComponent({
            scope: scope,
            attrs: attrs,
            element: element
          });

          scope = element = attrs = null;
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id carousel
 * @name ons-carousel
 * @category carousel
 * @description
 *   [en]Carousel component.[/en]
 *   [ja]カルーセルを表示できるコンポーネント。[/ja]
 * @codepen xbbzOQ
 * @guide UsingCarousel
 *   [en]Learn how to use the carousel component.[/en]
 *   [ja]carouselコンポーネントの使い方[/ja]
 * @example
 * <ons-carousel style="width: 100%; height: 200px">
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 *   <ons-carousel-item>
 *    ...
 *   </ons-carousel-item>
 * </ons-carousel>
 */

/**
 * @ngdoc event
 * @name postchange
 * @description
 *   [en]Fired just after the current carousel item has changed.[/en]
 *   [ja]現在表示しているカルーセルの要素が変わった時に発火します。[/ja]
 * @param {Object} event 
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.carousel
 *   [en]Carousel object.[/en]
 *   [ja]イベントが発火したCarouselオブジェクトです。[/ja]
 * @param {Number} event.activeIndex
 *   [en]Current active index.[/en]
 *   [ja]現在アクティブになっている要素のインデックス。[/ja]
 * @param {Number} event.lastActiveIndex
 *   [en]Previous active index.[/en]
 *   [ja]以前アクティブだった要素のインデックス。[/ja]
 */

/**
 * @ngdoc event
 * @name refresh
 * @description
 *   [en]Fired when the carousel has been refreshed.[/en]
 *   [ja]カルーセルが更新された時に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.carousel
 *   [en]Carousel object.[/en]
 *   [ja]イベントが発火したCarouselオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name overscroll
 * @description
 *   [en]Fired when the carousel has been overscrolled.[/en]
 *   [ja]カルーセルがオーバースクロールした時に発火します。[/ja]
 * @param {Object} event 
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.carousel
 *   [en]Fired when the carousel has been refreshed.[/en]
 *   [ja]カルーセルが更新された時に発火します。[/ja]
 * @param {Number} event.activeIndex
 *   [en]Current active index.[/en]
 *   [ja]現在アクティブになっている要素のインデックス。[/ja]
 * @param {String} event.direction
 *   [en]Can be one of either "up", "down", "left" or "right".[/en]
 *   [ja]オーバースクロールされた方向が得られます。"up", "down", "left", "right"のいずれかの方向が渡されます。[/ja]
 * @param {Function} event.waitToReturn
 *   [en]Takes a <code>Promise</code> object as an argument. The carousel will not scroll back until the promise has been resolved or rejected.[/en]
 *   [ja]この関数はPromiseオブジェクトを引数として受け取ります。渡したPromiseオブジェクトがresolveされるかrejectされるまで、カルーセルはスクロールバックしません。[/ja]
 */

/**
 * @ngdoc attribute
 * @name direction
 * @type {String}
 * @description
 *   [en]The direction of the carousel. Can be either "horizontal" or "vertical". Default is "horizontal".[/en]
 *   [ja]カルーセルの方向を指定します。"horizontal"か"vertical"を指定できます。"horizontal"がデフォルト値です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name fullscreen
 * @description
 *   [en]If this attribute is set the carousel will cover the whole screen.[/en]
 *   [ja]この属性があると、absoluteポジションを使ってカルーセルが自動的に画面いっぱいに広がります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this carousel.[/en]
 *   [ja]このカルーセルを参照するための変数名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name overscrollable
 * @description
 *   [en]If this attribute is set the carousel will be scrollable over the edge. It will bounce back when released.[/en]
 *   [ja]この属性がある時、タッチやドラッグで端までスクロールした時に、バウンドするような効果が当たります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name item-width
 * @type {String}
 * @description
 *    [en]ons-carousel-item's width. Only works when the direction is set to "horizontal".[/en]
 *    [ja]ons-carousel-itemの幅を指定します。この属性は、direction属性に"horizontal"を指定した時のみ有効になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name item-height
 * @type {String}
 * @description
 *   [en]ons-carousel-item's height. Only works when the direction is set to "vertical".[/en]
 *   [ja]ons-carousel-itemの高さを指定します。この属性は、direction属性に"vertical"を指定した時のみ有効になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name auto-scroll
 * @description
 *   [en]If this attribute is set the carousel will be automatically scrolled to the closest item border when released.[/en]
 *   [ja]この属性がある時、一番近いcarosel-itemの境界まで自動的にスクロールするようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name auto-scroll-ratio
 * @type {Number}
 * @description
 *    [en]A number between 0.0 and 1.0 that specifies how much the user must drag the carousel in order for it to auto scroll to the next item.[/en]
 *    [ja]0.0から1.0までの値を指定します。カルーセルの要素をどれぐらいの割合までドラッグすると次の要素に自動的にスクロールするかを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name swipeable
 * @description
 *   [en]If this attribute is set the carousel can be scrolled by drag or swipe.[/en]
 *   [ja]この属性がある時、カルーセルをスワイプやドラッグで移動できるようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set the carousel is disabled.[/en]
 *   [ja]この属性がある時、dragやtouchやswipeを受け付けなくなります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name intial-index
 * @type {Number}
 * @description
 *   [en]Specify the index of the ons-carousel-item to show initially. Default is 0.[/en]
 *   [ja]最初に表示するons-carousel-itemを0始まりのインデックスで指定します。デフォルト値は 0 です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name auto-refresh
 * @description
 *   [en]When this attribute is set the carousel will automatically refresh when the number of child nodes change.[/en]
 *   [ja]この属性がある時、子要素の数が変わるとカルーセルは自動的に更新されるようになります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postchange
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-refresh
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "refresh" event is fired.[/en]
 *  [ja]"refresh"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-overscroll
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "overscroll" event is fired.[/en]
 *  [ja]"overscroll"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature next()
 * @description
 *   [en]Show next ons-carousel item.[/en]
 *   [ja]次のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature prev()
 * @description
 *   [en]Show previous ons-carousel item.[/en]
 *   [ja]前のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature first()
 * @description
 *   [en]Show first ons-carousel item.[/en]
 *   [ja]最初のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature last()
 * @description
 *   [en]Show last ons-carousel item.[/en]
 *   [ja]最後のons-carousel-itemを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setSwipeable(swipeable)
 * @param {Booelan} swipeable
 *   [en]If value is true the carousel will be swipeable.[/en]
 *   [ja]swipeableにする場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Set whether the carousel is swipeable or not.[/en]
 *   [ja]swipeできるかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isSwipeable()
 * @return {Boolean}
 *   [en]true if the carousel is swipeable.[/en]
 *   [ja]swipeableであればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the carousel is swipeable or not.[/en]
 *   [ja]swiapble属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setActiveCarouselItemIndex(index)
 * @param {Number} index
 *   [en]The index that the carousel should be set to.[/en]
 *   [ja]carousel要素のインデックスを指定します。[/ja]
 * @description
 *   [en]Specify the index of the ons-carousel-item to show.[/en]
 *   [ja]表示するons-carousel-itemをindexで指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getActiveCarouselItemIndex()
 * @return {Number}
 *   [en]The current carousel item index.[/en]
 *   [ja]現在表示しているカルーセル要素のインデックスが返されます。[/ja]
 * @description
 *   [en]Returns the index of the currently visible ons-carousel-item.[/en]
 *   [ja]現在表示されているons-carousel-item要素のインデックスを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setAutoScrollEnabled(enabled)
 * @param {Boolean} enabled
 *   [en]If true auto scroll will be enabled.[/en]
 *   [ja]オートスクロールを有効にする場合にはtrueを渡します。[/ja]
 * @description
 *   [en]Enable or disable "auto-scroll" attribute.[/en]
 *   [ja]auto-scroll属性があるかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isAutoScrollEnabled()
 * @return {Boolean}
 *   [en]true if auto scroll is enabled.[/en]
 *   [ja]オートスクロールが有効であればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the "auto-scroll" attribute is set or not.[/en]
 *   [ja]auto-scroll属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setAutoScrollRatio(ratio)
 * @param {Number} ratio
 *   [en]The desired ratio.[/en]
 *   [ja]オートスクロールするのに必要な0.0から1.0までのratio値を指定します。[/ja]
 * @description
 *   [en]Set the auto scroll ratio. Must be a value between 0.0 and 1.0.[/en]
 *   [ja]オートスクロールするのに必要なratio値を指定します。0.0から1.0を必ず指定しなければならない。[/ja]
 */

/**
 * @ngdoc method
 * @signature getAutoScrollRatio()
 * @return {Number}
 *   [en]The current auto scroll ratio.[/en]
 *   [ja]現在のオートスクロールのratio値。[/ja]
 * @description
 *   [en]Returns the current auto scroll ratio.[/en]
 *   [ja]現在のオートスクロールのratio値を返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setOverscrollable(overscrollable)
 * @param {Boolean} overscrollable
 *   [en]If true the carousel will be overscrollable.[/en]
 *   [ja]overscrollできるかどうかを指定します。[/ja]
 * @description
 *   [en]Set whether the carousel is overscrollable or not.[/en]
 *   [ja]overscroll属性があるかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isOverscrollable()
 * @return {Boolean}
 *   [en]Whether the carousel is overscrollable or not.[/en]
 *   [ja]overscrollできればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the carousel is overscrollable or not.[/en]
 *   [ja]overscroll属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature refresh()
 * @description
 *   [en]Update the layout of the carousel. Used when adding ons-carousel-items dynamically or to automatically adjust the size.[/en]
 *   [ja]レイアウトや内部の状態を最新のものに更新します。ons-carousel-itemを動的に増やしたり、ons-carouselの大きさを動的に変える際に利用します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]Whether the carousel is disabled or not.[/en]
 *   [ja]disabled状態になっていればtrueを返します。[/ja]
 * @description
 *   [en]Returns whether the dialog is disabled or enabled.[/en]
 *   [ja]disabled属性があるかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean} disabled
 *   [en]If true the carousel will be disabled.[/en]
 *   [ja]disabled状態にする場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Disable or enable the dialog.[/en]
 *   [ja]disabled属性があるかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーが指定されなかった場合には、そのイベントに紐付いているイベントリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsCarousel', ['$onsen', 'CarouselView', function($onsen, CarouselView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function(element, attrs) {
        var templater = $onsen.generateModifierTemplater(attrs);

        element.addClass(templater('carousel--*'));

        return function(scope, element, attrs) {
          var carousel = new CarouselView(scope, element, attrs);

          element.data('ons-carousel', carousel);

          $onsen.registerEventHandlers(carousel, 'postchange refresh overscroll destroy');
          $onsen.declareVarAttribute(attrs, carousel);

          scope.$on('$destroy', function() {
            carousel._events = undefined;
            element.data('ons-carousel', undefined);
            element = null;
          });

          if (element[0].hasAttribute('auto-refresh')) {
            // Refresh carousel when items are added or removed.
            scope.$watch(
              function () {
                return element[0].childNodes.length;
              },
              function () {
                setImmediate(function() {
                  carousel.refresh();
                });
              }
            );
          }

          setImmediate(function() {
            carousel.refresh();
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      },

    };
  }]);

  module.directive('onsCarouselItem', ['$onsen', function($onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      scope: false,
      transclude: false,

      compile: function(element, attrs) {
        var templater = $onsen.generateModifierTemplater(attrs);

        element.addClass(templater('carousel-item--*'));
        element.css('width', '100%');

        return function(scope, element, attrs) {
        };
      },

    };
  }]);
})();


/**
 * @ngdoc directive
 * @id col
 * @name ons-col
 * @category grid
 * @description
 *   [en]Represents a column in the grid system. Use with ons-row to layout components.[/en]
 *   [ja]グリッドシステムにて列を定義します。ons-rowとともに使用し、コンポーネントのレイアウトに利用します。[/ja]
 * @note
 *   [en]For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-column, they may not be displayed correctly. You can use only one align.[/en]
 *   [ja]Android 4.3以前、もしくはiOS 6以前のOSの場合、ons-rowとons-columnを組み合わせた場合に描画が崩れる場合があります。[/ja]
 * @codepen GgujC {wide}
 * @guide layouting [en]Layouting guide[/en][ja]レイアウト機能[/ja]
 * @seealso ons-row [en]ons-row component[/en][ja]ons-rowコンポーネント[/ja]
 * @example
 * <ons-row>
 *   <ons-col width="50px"><ons-icon icon="fa-twitter"></ons-icon></ons-col>
 *   <ons-col>Text</ons-col>
 * </ons-row>
 */

/**
 * @ngdoc attribute
 * @name align
 * @type {String}
 * @description
 *   [en]Vertical alignment of the column. Valid values are "top", "center", and "bottom".[/en]
 *   [ja]縦の配置を指定する。"top", "center", "bottom"のいずれかを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name width
 * @type {String}
 * @description
 *   [en]The width of the column. Valid values are css width values ("10%", "50px").[/en]
 *   [ja]カラムの横幅を指定する。パーセントもしくはピクセルで指定します（10%や50px）。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsCol', ['$timeout', '$onsen', function($timeout, $onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element, attrs, transclude) {
        element.addClass('col ons-col-inner');

        return function(scope, element, attrs) {

          attrs.$observe('align', function(align) {
            updateAlign(align);
          });

          attrs.$observe('width', function(width) {
            updateWidth(width);
          });

          // For BC
          attrs.$observe('size', function(size) {
            if (!attrs.width) {
              updateWidth(size);
            }
          });

          updateAlign(attrs.align);

          if (attrs.size && !attrs.width) {
            updateWidth(attrs.size);
          } else {
            updateWidth(attrs.width);
          }

          $onsen.cleaner.onDestroy(scope, function() {
            $onsen.clearComponent({
              scope: scope,
              element: element,
              attrs: attrs
            });
            element = attrs = scope = null;
          });

          function updateAlign(align) {
            if (align === 'top' || align === 'center' || align === 'bottom') {
              element.removeClass('col-top col-center col-bottom');
              element.addClass('col-' + align);
            } else {
              element.removeClass('col-top col-center col-bottom');
            }
          }

          function updateWidth(width) {
            if (typeof width  === 'string') {
              width = ('' + width).trim();
              width = width.match(/^\d+$/) ? width + '%' : width;

              element.css({
                '-webkit-box-flex': '0',
                '-webkit-flex': '0 0 ' + width,
                '-moz-box-flex': '0',
                '-moz-flex': '0 0 ' + width,
                '-ms-flex': '0 0 ' + width,
                'flex': '0 0 ' + width,
                'max-width': width
              });
            } else {
              element.removeAttr('style');
            }
          }

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id dialog
 * @name ons-dialog
 * @category dialog
 * @description
 *  [en]Dialog that is displayed on top of current screen.[/en]
 *  [ja]現在のスクリーンにダイアログを表示します。[/ja]
 * @codepen zxxaGa
 * @guide UsingDialog
 *   [en]Learn how to use the dialog component.[/en]
 *   [ja]ダイアログコンポーネントの使い方[/ja]
 * @seealso ons-alert-dialog
 *   [en]ons-alert-dialog component[/en]
 *   [ja]ons-alert-dialogコンポーネント[/ja]
 * @seealso ons-popover
 *   [en]ons-popover component[/en]
 *   [ja]ons-popoverコンポーネント[/ja]
 * @example
 * <script>
 *   ons.ready(function() {
 *     ons.createDialog('dialog.html').then(function(dialog) {
 *       dialog.show();
 *     });
 *   });
 * </script>
 *
 * <script type="text/ons-template" id="dialog.html">
 *   <ons-dialog cancelable>
 *     ...
 *   </ons-dialog>
 * </script>
 */

/**
 * @ngdoc event
 * @name preshow
 * @description
 * [en]Fired just before the dialog is displayed.[/en]
 * [ja]ダイアログが表示される直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Execute this function to stop the dialog from being shown.[/en]
 *   [ja]この関数を実行すると、ダイアログの表示がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postshow
 * @description
 * [en]Fired just after the dialog is displayed.[/en]
 * [ja]ダイアログが表示された直後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name prehide
 * @description
 * [en]Fired just before the dialog is hidden.[/en]
 * [ja]ダイアログが隠れる直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Execute this function to stop the dialog from being hidden.[/en]
 *   [ja]この関数を実行すると、ダイアログの非表示がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name posthide
 * @description
 * [en]Fired just after the dialog is hidden.[/en]
 * [ja]ダイアログが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.dialog
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *  [en]Variable name to refer this dialog.[/en]
 *  [ja]このダイアログを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the dialog.[/en]
 *  [ja]ダイアログの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name cancelable
 * @description
 *  [en]If this attribute is set the dialog can be closed by tapping the background or by pressing the back button.[/en]
 *  [ja]この属性があると、ダイアログが表示された時に、背景やバックボタンをタップした時にダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *  [en]If this attribute is set the dialog is disabled.[/en]
 *  [ja]この属性がある時、ダイアログはdisabled状態になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default default
 * @description
 *  [en]The animation used when showing and hiding the dialog. Can be either "none" or "default".[/en]
 *  [ja]ダイアログを表示する際のアニメーション名を指定します。"none"もしくは"default"を指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name mask-color
 * @type {String}
 * @default rgba(0, 0, 0, 0.2)
 * @description
 *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
 *  [ja]背景のマスクの色を指定します。"rgba(0, 0, 0, 0.2)"がデフォルト値です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preshow
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prehide
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postshow
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-posthide
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature show([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function is called after the dialog has been revealed.[/en]
 *   [ja]ダイアログが表示され終わった後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *  [en]Show the dialog.[/en]
 *  [ja]ダイアログを開きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定できます。[/ja]
 * @param {Function} [options.callback]
 *   [en]This functions is called after the dialog has been hidden.[/en]
 *   [ja]ダイアログが隠れた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Hide the dialog.[/en]
 *   [ja]ダイアログを閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @description
 *   [en]Returns whether the dialog is visible or not.[/en]
 *   [ja]ダイアログが表示されているかどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is visible.[/en]
 *   [ja]ダイアログが表示されている場合にtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature destroy()
 * @description
 *  [en]Destroy the dialog and remove it from the DOM tree.[/en]
 *  [ja]ダイアログを破棄して、DOMツリーから取り除きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back button handler for overriding the default behavior.[/en]
 *   [ja]バックボタンハンドラを取得します。デフォルトの挙動を変更することができます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setCancelable(cancelable)
 * @param {Boolean} cancelable
 *   [en]If true the dialog will be cancelable.[/en]
 *   [ja]ダイアログをキャンセル可能にする場合trueを指定します。[/ja]
 * @description
 *   [en]Define whether the dialog can be canceled by the user or not.[/en]
 *   [ja]ダイアログを表示した際に、ユーザがそのダイアログをキャンセルできるかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isCancelable()
 * @description
 *   [en]Returns whether the dialog is cancelable or not.[/en]
 *   [ja]このダイアログがキャンセル可能かどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is cancelable.[/en]
 *   [ja]ダイアログがキャンセル可能な場合trueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @description
 *   [en]Disable or enable the dialog.[/en]
 *   [ja]このダイアログをdisabled状態にするかどうかを設定します。[/ja]
 * @param {Boolean} disabled
 *   [en]If true the dialog will be disabled.[/en]
 *   [ja]trueを指定するとダイアログをdisabled状態になります。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @description
 *   [en]Returns whether the dialog is disabled or enabled.[/en]
 *   [ja]このダイアログがdisabled状態かどうかを返します。[/ja]
 * @return {Boolean}
 *   [en]true if the dialog is disabled.[/en]
 *   [ja]ダイアログがdisabled状態の場合trueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーが指定されなかった場合には、そのイベントに紐付いているイベントリスナーが全て削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Dialog directive.
   */
  module.directive('onsDialog', ['$onsen', 'DialogView', function($onsen, DialogView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      transclude: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/dialog.tpl',
      compile: function(element, attrs, transclude) {
        element[0].setAttribute('no-status-bar-fill', '');
        return {
          pre: function(scope, element, attrs) {
            transclude(scope, function(clone) {
              angular.element(element[0].querySelector('.dialog')).append(clone);
            });

            var dialog = new DialogView(scope, element, attrs);
            scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

            $onsen.addModifierMethods(dialog, 'dialog--*', angular.element(element[0].querySelector('.dialog')));
            $onsen.declareVarAttribute(attrs, dialog);
            $onsen.registerEventHandlers(dialog, 'preshow prehide postshow posthide destroy');

            element.data('ons-dialog', dialog);
            scope.$on('$destroy', function() {
              dialog._events = undefined;
              $onsen.removeModifierMethods(dialog);
              element.data('ons-dialog', undefined);
              element = null;
            });
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);

})();

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsDummyForInit', ['$rootScope', function($rootScope) {
    var isReady = false;

    return {
      restrict: 'E',
      replace: false,

      link: {
        post: function(scope, element) {
          if (!isReady) {
            isReady = true;
            $rootScope.$broadcast('$ons-ready');
          }
          element.remove();
        }
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id gestureDetector
 * @name ons-gesture-detector
 * @category input
 * @description
 *   [en]Component to detect finger gestures within the wrapped element. See the guide for more details.[/en]
 *   [ja]要素内のジェスチャー操作を検知します。詳しくはガイドを参照してください。[/ja]
 * @guide DetectingFingerGestures
 *   [en]Detecting finger gestures[/en]
 *   [ja]ジェスチャー操作の検知[/ja]
 * @example
 * <ons-gesture-detector>
 *   ...
 * </ons-gesture-detector>
 */
(function() {
  'use strict';

  var EVENTS =
    ('drag dragleft dragright dragup dragdown hold release swipe swipeleft swiperight ' +
      'swipeup swipedown tap doubletap touch transform pinch pinchin pinchout rotate').split(/ +/);

  angular.module('onsen').directive('onsGestureDetector', ['$onsen', function($onsen) {

    var scopeDef = EVENTS.reduce(function(dict, name) {
      dict['ng' + titlize(name)] = '&';
      return dict;
    }, {});

    return {
      restrict: 'E',
      scope: scopeDef,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: true,

      compile: function(element, attrs) {
        return function link(scope, element, attrs, controller, transclude) {

          transclude(scope.$parent, function(cloned) {
            element.append(cloned);
          });

          var hammer = new Hammer(element[0]);
          hammer.on(EVENTS.join(' '), handleEvent);

          $onsen.cleaner.onDestroy(scope, function() {
            hammer.off(EVENTS.join(' '), handleEvent);
            $onsen.clearComponent({
              scope: scope,
              element: element,
              attrs: attrs
            });
            hammer.element = scope = element = attrs = null;
          });

          function handleEvent(event) {
            var attr = 'ng' + titlize(event.type);

            if (attr in scopeDef) {
              scope[attr]({$event: event});
            }
          }

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };

    function titlize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }]);
})();


/**
 * @ngdoc directive
 * @id icon
 * @name ons-icon
 * @category icon
 * @description
 *   [en]Displays an icon. Font Awesome and Ionicon icons are supported.[/en]
 *   [ja]アイコンを表示するコンポーネントです。Font AwesomeもしくはIoniconsから選択できます。[/ja]
 * @codepen xAhvg
 * @guide UsingIcons [en]Using icons[/en][ja]アイコンを使う[/ja]
 * @example
 * <ons-icon
 *   icon="fa-twitter"
 *   size="20px"
 *   fixed-width="false"
 *   style="color: red">
 * </ons-icon>
 */

/**
 * @ngdoc attribute
 * @name icon
 * @type {String}
 * @description
 *   [en]The icon name. <code>fa-</code> prefix for Font Awesome, <code>ion-</code> prefix for Ionicons icons. See all icons at http://fontawesome.io/icons/ and http://ionicons.com.[/en]
 *   [ja]アイコン名を指定します。<code>fa-</code>で始まるものはFont Awesomeとして、<code>ion-</code>で始まるものはIoniconsとして扱われます。使用できるアイコンはこちら: http://fontawesome.io/icons/　および　http://ionicons.com。[/ja]
 */

/**
 * @ngdoc attribute
 * @name size
 * @type {String}
 * @description
 *   [en]The sizes of the icon. Valid values are lg, 2x, 3x, 4x, 5x, or in pixels.[/en]
 *   [ja]アイコンのサイズを指定します。値は、lg, 2x, 3x, 4x, 5xもしくはピクセル単位で指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name rotate
 * @type {Number}
 * @description
 *   [en]Number of degrees to rotate the icon. Valid values are 90, 180, or 270.[/en]
 *   [ja]アイコンを回転して表示します。90, 180, 270から指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name flip
 * @type {String}
 * @description
 *   [en]Flip the icon. Valid values are "horizontal" and "vertical".[/en]
 *   [ja]アイコンを反転します。horizontalもしくはverticalを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name fixed-width
 * @type {Boolean}
 * @default false
 * @description
 *  [en]When used in the list, you want the icons to have the same width so that they align vertically by setting the value to true. Valid values are true, false. Default is false.[/en]
 *  [ja]等幅にするかどうかを指定します。trueもしくはfalseを指定できます。デフォルトはfalseです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name spin
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Specify whether the icon should be spinning. Valid values are true and false.[/en]
 *   [ja]アイコンを回転するかどうかを指定します。trueもしくはfalseを指定できます。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  function cleanClassAttribute(element) {
    var classList = ('' + element.attr('class')).split(/ +/).filter(function(classString) {
      return classString !== 'fa' && classString.substring(0, 3) !== 'fa-' && classString.substring(0, 4) !== 'ion-';
    });

    element.attr('class', classList.join(' '));
  }

  function buildClassAndStyle(attrs) {
    var classList = ['ons-icon'];
    var style = {};

    // icon
    if (attrs.icon.indexOf('ion-') === 0) {
      classList.push(attrs.icon);
      classList.push('ons-icon--ion');
    } else if (attrs.icon.indexOf('fa-') === 0) {
      classList.push(attrs.icon);
      classList.push('fa');
    } else {
      classList.push('fa');
      classList.push('fa-' + attrs.icon);
    }

    // size
    var size = '' + attrs.size;
    if (size.match(/^[1-5]x|lg$/)) {
      classList.push('fa-' + size);
    } else if (typeof attrs.size === 'string') {
      style['font-size'] = size;
    } else {
      classList.push('fa-lg');
    }

    return {
      'class': classList.join(' '),
      'style': style
    };
  }

  module.directive('onsIcon', ['$onsen', function($onsen) {
    return {
      restrict: 'E',
      replace: false,
      transclude: false,
      link: function(scope, element, attrs) {

        if (attrs.ngController) {
          throw new Error('This element can\'t accept ng-controller directive.');
        }

        var update = function() {
          cleanClassAttribute(element);

          var builded = buildClassAndStyle(attrs);
          element.css(builded.style);
          element.addClass(builded['class']);
        };

        var builded = buildClassAndStyle(attrs);
        element.css(builded.style);
        element.addClass(builded['class']);

        attrs.$observe('icon', update);
        attrs.$observe('size', update);
        attrs.$observe('fixedWidth', update);
        attrs.$observe('rotate', update);
        attrs.$observe('flip', update);
        attrs.$observe('spin', update);

        $onsen.cleaner.onDestroy(scope, function() {
          $onsen.clearComponent({
            scope: scope,
            element: element,
            attrs: attrs
          });
          element = scope = attrs = null;
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id if-orientation
 * @name ons-if-orientation
 * @category util
 * @description
 *   [en]Conditionally display content depending on screen orientation. Valid values are portrait and landscape. Different from other components, this component is used as attribute in any element.[/en]
 *   [ja]画面の向きに応じてコンテンツの制御を行います。portraitもしくはlandscapeを指定できます。すべての要素の属性に使用できます。[/ja]
 * @seealso ons-if-platform [en]ons-if-platform component[/en][ja]ons-if-platformコンポーネント[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-if-orientation="portrait">
 *   <p>This will only be visible in portrait mode.</p>
 * </div>
 */

/**
 * @ngdoc attribute
 * @name ons-if-orientation
 * @type {String}
 * @description
 *   [en]Either "portrait" or "landscape".[/en]
 *   [ja]portraitもしくはlandscapeを指定します。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfOrientation', ['$onsen', '$onsGlobal', function($onsen, $onsGlobal) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element) {
        element.css('display', 'none');

        return function(scope, element, attrs) {
          element.addClass('ons-if-orientation-inner');

          attrs.$observe('onsIfOrientation', update);
          $onsGlobal.orientation.on('change', update);

          update();

          $onsen.cleaner.onDestroy(scope, function() {
            $onsGlobal.orientation.off('change', update);

            $onsen.clearComponent({
              element: element,
              scope: scope,
              attrs: attrs
            });
            element = scope = attrs = null;
          });

          function update() {
            var userOrientation = ('' + attrs.onsIfOrientation).toLowerCase();
            var orientation = getLandscapeOrPortrait();

            if (userOrientation === 'portrait' || userOrientation === 'landscape') {
              if (userOrientation === orientation) {
                element.css('display', '');
              } else {
                element.css('display', 'none');
              }
            }
          }

          function getLandscapeOrPortrait() {
            return $onsGlobal.orientation.isPortrait() ? 'portrait' : 'landscape';
          }
        };
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id if-platform
 * @name ons-if-platform
 * @category util
 * @description
 *    [en]Conditionally display content depending on the platform / browser. Valid values are "ios", "android", "blackberry", "chrome", "safari", "firefox", and "opera".[/en]
 *    [ja]プラットフォームやブラウザーに応じてコンテンツの制御をおこないます。ios, android, blackberry, chrome, safari, firefox, operaを指定できます。[/ja]
 * @seealso ons-if-orientation [en]ons-if-orientation component[/en][ja]ons-if-orientationコンポーネント[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-if-platform="android">
 *   ...
 * </div>
 */

/**
 * @ngdoc attribute
 * @name ons-if-platform
 * @type {String}
 * @description
 *   [en]Either "opera", "firefox", "safari", "chrome", "ie", "android", "blackberry", "ios" or "windows".[/en]
 *   [ja]"opera", "firefox", "safari", "chrome", "ie", "android", "blackberry", "ios", "windows"のいずれかを指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsIfPlatform', ['$onsen', function($onsen) {
    return {
      restrict: 'A',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element) {
        element.addClass('ons-if-platform-inner');
        element.css('display', 'none');

        var platform = getPlatformString();

        return function(scope, element, attrs) {
          attrs.$observe('onsIfPlatform', function(userPlatform) {
            if (userPlatform) {
              update();
            }
          });

          update();

          $onsen.cleaner.onDestroy(scope, function() {
            $onsen.clearComponent({
              element: element,
              scope: scope,
              attrs: attrs
            });
            element = scope = attrs = null;
          });

          function update() {
            if (attrs.onsIfPlatform.toLowerCase() === platform.toLowerCase()) {
              element.css('display', 'block');
            } else {
              element.css('display', 'none');
            }
          }
        };

        function getPlatformString() {

          if (navigator.userAgent.match(/Android/i)) {
            return 'android';
          }

          if ((navigator.userAgent.match(/BlackBerry/i)) || (navigator.userAgent.match(/RIM Tablet OS/i)) || (navigator.userAgent.match(/BB10/i))) {
            return 'blackberry';
          }

          if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            return 'ios';
          }

          if (navigator.userAgent.match(/IEMobile/i)) {
            return 'windows';
          }

          // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
          var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
          if (isOpera) {
            return 'opera';
          }

          var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
          if (isFirefox) {
            return 'firefox';
          }

          var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
          // At least Safari 3+: "[object HTMLElementConstructor]"
          if (isSafari) {
            return 'safari';
          }

          var isChrome = !!window.chrome && !isOpera; // Chrome 1+
          if (isChrome) {
            return 'chrome';
          }

          var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
          if (isIE) {
            return 'ie';
          }

          return 'unknown';
        }
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id ons-keyboard-active
 * @name ons-keyboard-active
 * @category input
 * @description
 *   [en]
 *     Conditionally display content depending on if the software keyboard is visible or hidden.
 *     This component requires cordova and that the com.ionic.keyboard plugin is installed.
 *   [/en]
 *   [ja]
 *     ソフトウェアキーボードが表示されているかどうかで、コンテンツを表示するかどうかを切り替えることが出来ます。
 *     このコンポーネントは、Cordovaやcom.ionic.keyboardプラグインを必要とします。
 *   [/ja]
 * @guide UtilityAPIs
 *   [en]Other utility APIs[/en]
 *   [ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-keyboard-active>
 *   This will only be displayed if the software keyboard is open.
 * </div>
 * <div ons-keyboard-inactive>
 *   There is also a component that does the opposite.
 * </div>
 */

/**
 * @ngdoc attribute
 * @name ons-keyboard-active
 * @description
 *   [en]The content of tags with this attribute will be visible when the software keyboard is open.[/en]
 *   [ja]この属性がついた要素は、ソフトウェアキーボードが表示された時に初めて表示されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-keyboard-inactive
 * @description
 *   [en]The content of tags with this attribute will be visible when the software keyboard is hidden.[/en]
 *   [ja]この属性がついた要素は、ソフトウェアキーボードが隠れている時のみ表示されます。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  var compileFunction = function(show, $onsen) {
    return function(element) {
      return function(scope, element, attrs) {
        var dispShow = show ? 'block' : 'none',
            dispHide = show ? 'none' : 'block';

        var onShow = function() {
          element.css('display', dispShow);
        };

        var onHide = function() {
          element.css('display', dispHide);
        };

        var onInit = function(e) {
          if (e.visible) {
            onShow();
          } else {
            onHide();
          }
        };

        ons.softwareKeyboard.on('show', onShow);
        ons.softwareKeyboard.on('hide', onHide);
        ons.softwareKeyboard.on('init', onInit);

        if (ons.softwareKeyboard._visible) {
          onShow();
        } else {
          onHide();
        }

        $onsen.cleaner.onDestroy(scope, function() {
          ons.softwareKeyboard.off('show', onShow);
          ons.softwareKeyboard.off('hide', onHide);
          ons.softwareKeyboard.off('init', onInit);

          $onsen.clearComponent({
            element: element,
            scope: scope,
            attrs: attrs
          });
          element = scope = attrs = null;
        });
      };
    };
  };

  module.directive('onsKeyboardActive', ['$onsen', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: compileFunction(true, $onsen)
    };
  }]);

  module.directive('onsKeyboardInactive', ['$onsen', function($onsen) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: compileFunction(false, $onsen)
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id lazy-repeat
 * @name ons-lazy-repeat
 * @category control
 * @description 
 *   [en]
 *     Using this component a list with millions of items can be rendered without a drop in performance.
 *     It does that by "lazily" loading elements into the DOM when they come into view and
 *     removing items from the DOM when they are not visible.
 *   [/en]
 *   [ja]
 *     このコンポーネント内で描画されるアイテムのDOM要素の読み込みは、画面に見えそうになった時まで自動的に遅延され、
 *     画面から見えなくなった場合にはその要素は動的にアンロードされます。
 *     このコンポーネントを使うことで、パフォーマンスを劣化させること無しに巨大な数の要素を描画できます。
 *   [/ja]
 * @codepen QwrGBm
 * @guide UsingLazyRepeat 
 *   [en]How to use Lazy Repeat[/en]
 *   [ja]レイジーリピートの使い方[/ja]
 * @example
 * <script>
 *   ons.bootstrap()
 *
 *   .controller('MyController', function($scope) {
 *     $scope.MyDelegate = {
 *       countItems: function() {
 *         // Return number of items.
 *         return 1000000;
 *       },
 *
 *       calculateItemHeight: function(index) {
 *         // Return the height of an item in pixels.
 *         return 45;
 *       },
 *
 *       configureItemScope: function(index, itemScope) {
 *         // Initialize scope
 *         itemScope.item = 'Item #' + (index + 1);
 *       },
 *
 *       destroyItemScope: function(index, itemScope) {
 *         // Optional method that is called when an item is unloaded.
 *         console.log('Destroyed item with index: ' + index);
 *       }
 *     };
 *   });
 * </script>
 *
 * <ons-list ng-controller="MyController">
 *   <ons-list-item ons-lazy-repeat="MyDelegate">
 *     {{ item }}
 *   </ons-list-item>
 * </ons-list>
 */

/**
 * @ngdoc attribute
 * @name ons-lazy-repeat
 * @type {Expression}
 * @description
 *  [en]A delegate object, can be either an object attached to the scope (when using AngularJS) or a normal JavaScript variable.[/en]
 *  [ja]要素のロード、アンロードなどの処理を委譲するオブジェクトを指定します。AngularJSのスコープの変数名や、通常のJavaScriptの変数名を指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Lazy repeat directive.
   */
  module.directive('onsLazyRepeat', ['$onsen', 'LazyRepeatView', function($onsen, LazyRepeatView) {
    return {
      restrict: 'A',
      replace: false,
      priority: 1000,
      transclude: 'element',
      compile: function(element, attrs, linker) {
        return function(scope, element, attrs) {
          var lazyRepeat = new LazyRepeatView(scope, element, attrs, linker);

          scope.$on('$destroy', function() {
            scope = element = attrs = linker = null;
          });
        };
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id list
 * @name ons-list
 * @category list
 * @modifier inset
 *   [en]Inset list that doesn't cover the whole width of the parent.[/en]
 *   [ja]親要素の画面いっぱいに広がらないリストを表示します。[/ja]
 * @modifier noborder
 *   [en]A list with no borders at the top and bottom.[/en]
 *   [ja]リストの上下のボーダーが無いリストを表示します。[/ja]
 * @description
 *   [en]Component to define a list, and the container for ons-list-item(s).[/en]
 *   [ja]リストを表現するためのコンポーネント。ons-list-itemのコンテナとして使用します。[/ja]
 * @seealso ons-list-item
 *   [en]ons-list-item component[/en]
 *   [ja]ons-list-itemコンポーネント[/ja]
 * @seealso ons-list-header
 *   [en]ons-list-header component[/en]
 *   [ja]ons-list-headerコンポーネント[/ja]
 * @guide UsingList
 *   [en]Using lists[/en]
 *   [ja]リストを使う[/ja]
 * @codepen yxcCt
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the list.[/en]
 *   [ja]リストの表現を指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsList', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      scope: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: false,
      compile: function(element, attrs) {

        return function(scope, element, attrs) {
          var list = new GenericView(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, list);
          element.data('ons-list', list);

          scope.$on('$destroy', function() {
            list._events = undefined;
            $onsen.removeModifierMethods(list);
            element.data('ons-list', undefined);
            element = null;
          });

          var templater = $onsen.generateModifierTemplater(attrs);

          element.addClass('list ons-list-inner');
          element.addClass(templater('list--*'));

          $onsen.addModifierMethods(list, 'list--*', element);
          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id list-header
 * @name ons-list-header
 * @category list
 * @description
 *   [en]Header element for list items. Must be put inside ons-list component.[/en]
 *   [ja]リスト要素に使用するヘッダー用コンポーネント。ons-listと共に使用します。[/ja]
 * @seealso ons-list
 *   [en]ons-list component[/en]
 *   [ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-item [en]ons-list-item component[/en][ja]ons-list-itemコンポーネント[/ja]
 * @guide UsingList [en]Using lists[/en][ja]リストを使う[/ja]
 * @codepen yxcCt
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the list header.[/en]
 *   [ja]ヘッダーの表現を指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsListHeader', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: false,

      compile: function() {
        return function(scope, element, attrs) {
          var listHeader = new GenericView(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, listHeader);

          element.data('ons-listHeader', listHeader);

          scope.$on('$destroy', function() {
            listHeader._events = undefined;
            $onsen.removeModifierMethods(listHeader);
            element.data('ons-listHeader', undefined);
            element = null;
          });

          var templater = $onsen.generateModifierTemplater(attrs);
          element.addClass('list__header ons-list-header-inner');
          element.addClass(templater('list__header--*'));

          $onsen.addModifierMethods(listHeader, 'list__header--*', element);

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id list-item
 * @name ons-list-item
 * @category list
 * @modifier tappable
 *   [en]Made the list item change appearance when it's tapped.[/en]
 *   [ja]タップやクリックした時に効果が表示されるようになります。[/ja]
 * @modifier chevron
 *   [en]Display a chevron at the right end of the list item and make it change appearance when tapped.[/en]
 *   [ja]要素の右側に右矢印が表示されます。また、タップやクリックした時に効果が表示されるようになります。[/ja]
 * @description
 *   [en]Component that represents each item in the list. Must be put inside the ons-list component.[/en]
 *   [ja]リストの各要素を表現するためのコンポーネントです。ons-listコンポーネントと共に使用します。[/ja]
 * @seealso ons-list
 *   [en]ons-list component[/en]
 *   [ja]ons-listコンポーネント[/ja]
 * @seealso ons-list-header
 *   [en]ons-list-header component[/en]
 *   [ja]ons-list-headerコンポーネント[/ja]
 * @guide UsingList 
 *   [en]Using lists[/en]
 *   [ja]リストを使う[/ja]
 * @codepen yxcCt
 * @example
 * <ons-list>
 *   <ons-list-header>Header Text</ons-list-header>
 *   <ons-list-item>Item</ons-list-item>
 *   <ons-list-item>Item</ons-list-item>
 * </ons-list>
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the list item.[/en]
 *   [ja]各要素の表現を指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsListItem', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      replace: false,
      transclude: false,

      compile: function() {
        return function(scope, element, attrs) {
          var listItem = new GenericView(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, listItem);

          element.data('ons-list-item', listItem);

          scope.$on('$destroy', function() {
            listItem._events = undefined;
            $onsen.removeModifierMethods(listItem);
            element.data('ons-list-item', undefined);
            element = null;
          });

          var templater = $onsen.generateModifierTemplater(attrs);
          element.addClass('list__item ons-list-item-inner');
          element.addClass(templater('list__item--*'));

          $onsen.addModifierMethods(listItem, 'list__item--*', element);

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id loading-placeholder
 * @name ons-loading-placeholder
 * @category util
 * @description
 *   [en]Display a placeholder while the content is loading.[/en]
 *   [ja]Onsen UIが読み込まれるまでに表示するプレースホルダーを表現します。[/ja]
 * @guide UtilityAPIs [en]Other utility APIs[/en][ja]他のユーティリティAPI[/ja]
 * @example
 * <div ons-loading-placeholder="page.html">
 *   Loading...
 * </div>
 */

/**
 * @ngdoc attribute
 * @name ons-loading-placeholder
 * @type {String}
 * @description
 *   [en]The url of the page to load.[/en]
 *   [ja]読み込むページのURLを指定します。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsLoadingPlaceholder', ['$onsen', '$compile', function($onsen, $compile) {
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      scope: false,
      compile: function(element, attrs) {
        if (!attrs.onsLoadingPlaceholder.length) {
          throw Error('Must define page to load.');
        }

        setImmediate(function() {
          $onsen.getPageHTMLAsync(attrs.onsLoadingPlaceholder).then(function(html) {

            // Remove page tag.
            html = html
              .trim()
              .replace(/^<ons-page>/, '')
              .replace(/<\/ons-page>$/, '');

            var div = document.createElement('div');
            div.innerHTML = html;

            var newElement = angular.element(div);
            newElement.css('display', 'none');

            element.append(newElement);
            ons.compile(newElement[0]);

            for (var i = element[0].childNodes.length - 1; i >= 0; i--){
              var e = element[0].childNodes[i];
              if (e !== div) {
                element[0].removeChild(e);
              }
            }

            newElement.css('display', 'block');
          });
        });
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id modal
 * @name ons-modal
 * @category modal
 * @description 
 *   [en]
 *     Modal component that masks current screen.
 *     Underlying components are not subject to any events while the modal component is shown.
 *   [/en]
 *   [ja]
 *     画面全体をマスクするモーダル用コンポーネントです。下側にあるコンポーネントは、
 *     モーダルが表示されている間はイベント通知が行われません。
 *   [/ja]
 * @guide UsingModal
 *   [en]Using ons-modal component[/en]
 *   [ja]モーダルの使い方[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @codepen devIg
 * @example
 * <ons-modal>
 *   ...
 * </ons-modal>
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this modal.[/en]
 *   [ja]このモーダルを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature toggle()
 * @description
 *   [en]Toggle modal visibility.[/en]
 *   [ja]モーダルの表示を切り替えます。[/ja]
 */

/**
 * @ngdoc method
 * @signature show()
 * @description
 *   [en]Show modal.[/en]
 *   [ja]モーダルを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide()
 * @description
 *   [en]Hide modal.[/en]
 *   [ja]モーダルを非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back button handler.[/en]
 *   [ja]ons-modalに紐付いているバックボタンハンドラを取得します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Modal directive.
   */
  module.directive('onsModal', ['$onsen', 'ModalView', function($onsen, ModalView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      scope: false,
      transclude: false,

      compile: function(element, attrs) {
        compile(element, attrs);

        return {
          pre: function(scope, element, attrs) {
            var page = element.inheritedData('ons-page');
            if (page) {
              page.registerExtraElement(element);
            }

            var modal = new ModalView(scope, element);

            $onsen.addModifierMethods(modal, 'modal--*', element);
            $onsen.addModifierMethods(modal, 'modal--*__content', element.children());

            $onsen.declareVarAttribute(attrs, modal);

            element.data('ons-modal', modal);

            scope.$on('$destroy', function() {
              modal._events = undefined;
              $onsen.removeModifierMethods(modal);
              element.data('ons-modal', undefined);
            });
          },

          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };

    function compile(element, attrs) {
      var modifierTemplater = $onsen.generateModifierTemplater(attrs);

      var html = element[0].innerHTML;
      element[0].innerHTML = '';

      var wrapper = angular.element('<div></div>');
      wrapper.addClass('modal__content');
      wrapper.addClass(modifierTemplater('modal--*__content'));

      element.css('display', 'none');
      element.addClass('modal');
      element.addClass(modifierTemplater('modal--*'));

      wrapper[0].innerHTML = html;
      element.append(wrapper);
    }
  }]);

})();

/**
 * @ngdoc directive
 * @id navigator
 * @name ons-navigator
 * @category navigation
 * @description
 *   [en]A component that provides page stack management and navigation. This component does not have a visible content.[/en]
 *   [ja]ページスタックの管理とナビゲーション機能を提供するコンポーネント。画面上への出力はありません。[/ja]
 * @codepen yrhtv
 * @guide PageNavigation
 *   [en]Guide for page navigation[/en]
 *   [ja]ページナビゲーションの概要[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-toolbar
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-back-button
 *   [en]ons-back-button component[/en]
 *   [ja]ons-back-buttonコンポーネント[/ja]
 * @example
 * <ons-navigator animation="slide" var="app.navi">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">Title</div>
 *     </ons-toolbar>
 *
 *     <p style="text-align: center">
 *       <ons-button modifier="light" ng-click="app.navi.pushPage('page.html');">Push</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-navigator>
 *
 * <ons-template id="page.html">
 *   <ons-page>
 *     <ons-toolbar>
 *       <div class="center">Title</div>
 *     </ons-toolbar>
 *
 *     <p style="text-align: center">
 *       <ons-button modifier="light" ng-click="app.navi.popPage('page.html');">Pop</ons-button>
 *     </p>
 *   </ons-page>
 * </ons-template>
 */

/**
 * @ngdoc event
 * @name prepush
 * @description
 *   [en]Fired just before a page is pushed.[/en]
 *   [ja]pageがpushされる直前に発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.currentPage
 *   [en]Current page object.[/en]
 *   [ja]現在のpageオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call this function to cancel the push.[/en]
 *   [ja]この関数を呼び出すと、push処理がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name prepop
 * @description
 *   [en]Fired just before a page is popped.[/en]
 *   [ja]pageがpopされる直前に発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.currentPage
 *   [en]Current page object.[/en]
 *   [ja]現在のpageオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call this function to cancel the pop.[/en]
 *   [ja]この関数を呼び出すと、pageのpopがキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postpush
 * @description
 *   [en]Fired just after a page is pushed.[/en]
 *   [ja]pageがpushされてアニメーションが終了してから発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.enterPage
 *   [en]Object of the next page.[/en]
 *   [ja]pushされたpageオブジェクト。[/ja]
 * @param {Object} event.leavePage
 *   [en]Object of the previous page.[/en]
 *   [ja]以前のpageオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name postpop
 * @description
 *   [en]Fired just after a page is popped.[/en]
 *   [ja]pageがpopされてアニメーションが終わった後に発火されます。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.navigator
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Object} event.enterPage
 *   [en]Object of the next page.[/en]
 *   [ja]popされて表示されるページのオブジェクト。[/ja]
 * @param {Object} event.leavePage
 *   [en]Object of the previous page.[/en]
 *   [ja]popされて消えるページのオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name page
 * @type {String}
 * @description
 *   [en]First page to show when navigator is initialized.[/en]
 *   [ja]ナビゲーターが初期化された時に表示するページを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *  [en]Variable name to refer this navigator.[/en]
 *  [ja]このナビゲーターを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prepush
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prepush" event is fired.[/en]
 *  [ja]"prepush"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prepop
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prepop" event is fired.[/en]
 *  [ja]"prepop"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postpush
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postpush" event is fired.[/en]
 *  [ja]"postpush"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postpop
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postpop" event is fired.[/en]
 *  [ja]"postpop"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature pushPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or a <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]pushPage()による画面遷移が終了した時に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Pushes the specified pageUrl into the page stack.[/en]
 *   [ja]指定したpageUrlを新しいページスタックに追加します。新しいページが表示されます。[/ja]
 */

/**
 * @ngdoc method
 * @signature insertPage(index, pageUrl, [options])
 * @param {Number} index
 *   [en]The index where it should be inserted.[/en]
 *   [ja]スタックに挿入する位置のインデックスを指定します。[/ja]
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or a <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @description
 *   [en]Insert the specified pageUrl into the page stack with specified index.[/en]
 *   [ja]指定したpageUrlをページスタックのindexで指定した位置に追加します。[/ja]
 */

/**
 * @ngdoc method
 * @signature popPage([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Pops the current page from the page stack. The previous page will be displayed.[/en]
 *   [ja]現在表示中のページをページスタックから取り除きます。一つ前のページに戻ります。[/ja]
 */

/**
 * @ngdoc method
 * @signature replacePage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定できます。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Replaces the current page with the specified one.[/en]
 *   [ja]現在表示中のページをを指定したページに置き換えます。[/ja]
 */

/**
 * @ngdoc method
 * @signature resetToPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either a HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくはons-templateで宣言したテンプレートのid属性の値を指定できます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "slide", "simpleslide", "lift", "fade" and "none".[/en]
 *   [ja]アニメーション名を指定できます。"slide", "simpleslide", "lift", "fade", "none"のいずれかを指定できます。[/ja]
 * @param {Function} [options.onTransitionEnd]
 *   [en]Function that is called when the transition has ended.[/en]
 *   [ja]このメソッドによる画面遷移が終了した際に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Clears page stack and adds the specified pageUrl to the page stack.[/en]
 *   [ja]ページスタックをリセットし、指定したページを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCurrentPage()
 * @return {Object}
 *   [en]Current page object.[/en]
 *   [ja]現在のpageオブジェクト。[/ja]
 * @description
 *   [en]Get current page's navigator item. Use this method to access options passed by pushPage() or resetToPage() method.[/en]
 *   [ja]現在のページを取得します。pushPage()やresetToPage()メソッドの引数を取得できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getPages()
 * @return {List}
 *   [en]List of page objects.[/en]
 *   [ja]pageオブジェクトの配列。[/ja]
 * @description
 *   [en]Retrieve the entire page stack of the navigator.[/en]
 *   [ja]ナビゲーターの持つページスタックの一覧を取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back button handler for overriding the default behavior.[/en]
 *   [ja]バックボタンハンドラを取得します。デフォルトの挙動を変更することができます。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsNavigator', ['$compile', 'NavigatorView', '$onsen', function($compile, NavigatorView, $onsen) {
    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function(element) {

        var html = $onsen.normalizePageHTML(element.html());
        element.contents().remove();

        return {
          pre: function(scope, element, attrs, controller) {
            var navigator = new NavigatorView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, navigator);
            $onsen.registerEventHandlers(navigator, 'prepush prepop postpush postpop destroy');

            if (attrs.page) {
              navigator.pushPage(attrs.page, {});
            } else {
              var pageScope = navigator._createPageScope();
              var pageElement = angular.element(html);
              var linkScope = $compile(pageElement);
              var link = function() {
                linkScope(pageScope);
              };

              navigator._pushPageDOM('', pageElement, link, pageScope, {});
              pageElement = null;
            }

            element.data('ons-navigator', navigator);

            scope.$on('$destroy', function() {
              navigator._events = undefined;
              element.data('ons-navigator', undefined);
              element = null;
            });

          },
          post: function(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id page
 * @name ons-page
 * @category base
 * @description
 *   [en]Should be used as root component of each page. The content inside page component is scrollable.[/en]
 *   [ja]ページ定義のためのコンポーネントです。このコンポーネントの内容はスクロールが許可されます。[/ja]
 * @guide ManagingMultiplePages
 *   [en]Managing multiple pages[/en]
 *   [ja]複数のページを管理する[/ja]
 * @guide Pageinitevent
 *   [en]Event for page initialization[/en]
 *   [ja]ページ初期化のイベント[/ja]
 * @guide HandlingBackButton
 *   [en]Handling back button[/en]
 *   [ja]バックボタンに対応する[/ja]
 * @guide OverridingCSSstyles
 *   [en]Overriding CSS styles[/en]
 *   [ja]CSSスタイルのオーバーライド[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-page>
 *   <ons-toolbar>
 *     <div class="center">Title</div>
 *   </ons-toolbar>
 *
 *   ...
 * </ons-page>
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this page.[/en]
 *   [ja]このページを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]Specify modifier name to specify custom styles.[/en]
 *   [ja]スタイル定義をカスタマイズするための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name on-device-backbutton
 * @type {Expression}
 * @description
 *   [en]Allows you to specify custom behavior when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-device-backbutton
 * @type {Expression}
 * @description
 *   [en]Allows you to specify custom behavior with an AngularJS expression when the back button is pressed.[/en]
 *   [ja]デバイスのバックボタンが押された時の挙動を設定できます。AngularJSのexpressionを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Get the associated back button handler. This method may return null if no handler is assigned.[/en]
 *   [ja]バックボタンハンドラを取得します。このメソッドはnullを返す場合があります。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsPage', ['$onsen', 'PageView', function($onsen, PageView) {

    function firePageInitEvent(element) {

      // TODO: remove dirty fix
      var i = 0;
      var f = function() {
        if (i++ < 5)  {
          if (isAttached(element)) {
            fillStatusBar(element);
            $onsen.fireComponentEvent(element, 'init');
            fireActualPageInitEvent(element);
          } else {
            setImmediate(f);
          }
        } else {
          throw new Error('Fail to fire "pageinit" event. Attach "ons-page" element to the document after initialization.');
        }
      };

      f();
    }

    function fireActualPageInitEvent(element) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('pageinit', true, true);
      element.dispatchEvent(event);
    }

    function fillStatusBar(element) {
      if ($onsen.shouldFillStatusBar(element)) {
        // Adjustments for IOS7
        var fill = angular.element(document.createElement('div'));
        fill.addClass('page__status-bar-fill');
        fill.css({width: '0px', height: '0px'});

        angular.element(element).prepend(fill);
      }
    }

    function isAttached(element) {
      if (document.documentElement === element) {
        return true;
      }
      return element.parentNode ? isAttached(element.parentNode) : false;
    }

    function preLink(scope, element, attrs, controller, transclude) {
      var page = new PageView(scope, element, attrs);

      $onsen.declareVarAttribute(attrs, page);

      element.data('ons-page', page);

      var modifierTemplater = $onsen.generateModifierTemplater(attrs),
          template = 'page--*';
      element.addClass('page ' + modifierTemplater(template));
      $onsen.addModifierMethods(page, template, element);

      var pageContent = angular.element(element[0].querySelector('.page__content'));
      pageContent.addClass(modifierTemplater('page--*__content'));
      pageContent = null;

      var pageBackground = angular.element(element[0].querySelector('.page__background'));
      pageBackground.addClass(modifierTemplater('page--*__background'));
      pageBackground = null;

      $onsen.cleaner.onDestroy(scope, function() {
        page._events = undefined;
        $onsen.removeModifierMethods(page);
        element.data('ons-page', undefined);

        $onsen.clearComponent({
          element: element,
          scope: scope,
          attrs: attrs
        });
        scope = element = attrs = null;
      });
    }

    function postLink(scope, element, attrs) {
      firePageInitEvent(element[0]);
    }

    return {
      restrict: 'E',

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      transclude: false,
      scope: false,

      compile: function(element) {
        var children = element.children().remove();

        var content = angular.element('<div class="page__content ons-page-inner"></div>').append(children);
        var background = angular.element('<div class="page__background"></div>');

        if (element.attr('style')) {
          background.attr('style', element.attr('style'));
          element.attr('style', '');
        }

        element.append(background);

        if (Modernizr.csstransforms3d) {
          element.append(content);
        } else {
          content.css('overflow', 'visible');

          var wrapper = angular.element('<div></div>');
          wrapper.append(children);
          content.append(wrapper);
          element.append(content);
          wrapper = null;

          // IScroll for Android2
          var scroller = new IScroll(content[0], {
            momentum: true,
            bounce: true,
            hScrollbar: false,
            vScrollbar: false,
            preventDefault: false
          });

          var offset = 10;
          scroller.on('scrollStart', function(e) {
            var scrolled = scroller.y - offset;
            if (scrolled < (scroller.maxScrollY + 40)) {
              // TODO: find a better way to know when content is upated so we can refresh
              scroller.refresh();
            }
          });
        }

        content = null;
        background = null;
        children = null;

        return {
          pre: preLink,
          post: postLink
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id popover
 * @name ons-popover
 * @category popover
 * @modifier android
 *   [en]Display an Android style popover.[/en]
 *   [ja]Androidライクなポップオーバーを表示します。[/ja]
 * @description
 *  [en]A component that displays a popover next to an element.[/en]
 *  [ja]ある要素を対象とするポップオーバーを表示するコンポーネントです。[/ja]
 * @codepen ZYYRKo
 * @example
 * <script>
 * ons.ready(function() {
 *   ons.createPopover('popover.html').then(function(popover) {
 *     popover.show('#mybutton');   
 *   });
 * });
 * </script>
 *
 * <script type="text/ons-template" id="popover.html">
 *   <ons-popover cancelable>
 *     <p style="text-align: center; opacity: 0.5;">This popover will choose which side it's displayed on automatically.</p>
 *   </ons-popover>
 * </script>
 */

/**
 * @ngdoc event
 * @name preshow
 * @description
 *   [en]Fired just before the popover is displayed.[/en]
 *   [ja]ポップオーバーが表示される直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.popover
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Call this function to stop the popover from being shown.[/en]
 *   [ja]この関数を呼び出すと、ポップオーバーの表示がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postshow
 * @description
 *   [en]Fired just after the popover is displayed.[/en]
 *   [ja]ポップオーバーが表示された直後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.popover
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name prehide
 * @description
 *   [en]Fired just before the popover is hidden.[/en]
 *   [ja]ポップオーバーが隠れる直前に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.popover
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {Function} event.cancel 
 *   [en]Call this function to stop the popover from being hidden.[/en]
 *   [ja]この関数を呼び出すと、ポップオーバーが隠れる処理をキャンセルします。[/ja]
 */

/**
 * @ngdoc event
 * @name posthide
 * @description
 *   [en]Fired just after the popover is hidden.[/en]
 *   [ja]ポップオーバーが隠れた後に発火します。[/ja]
 * @param {Object} event [en]Event object.[/en]
 * @param {Object} event.popover
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 */


/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *  [en]Variable name to refer this popover.[/en]
 *  [ja]このポップオーバーを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the popover.[/en]
 *  [ja]ポップオーバーの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name direction
 * @type {String}
 * @description
 *  [en]
 *    A space separated list of directions. If more than one direction is specified,
 *    it will be chosen automatically. Valid directions are "up", "down", "left" and "right".
 *  [/en]
 *  [ja]
 *    ポップオーバーを表示する方向を空白区切りで複数指定できます。
 *    指定できる方向は、"up", "down", "left", "right"の4つです。空白区切りで複数指定することもできます。
 *    複数指定された場合、対象とする要素に合わせて指定した値から自動的に選択されます。
 *  [/ja]
 */

/**
 * @ngdoc attribute
 * @name cancelable
 * @description
 *   [en]If this attribute is set the popover can be closed by tapping the background or by pressing the back button.[/en]
 *   [ja]この属性があると、ポップオーバーが表示された時に、背景やバックボタンをタップした時にをポップオーバー閉じます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set the popover is disabled.[/en]
 *   [ja]この属性がある時、ポップオーバーはdisabled状態になります。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @description
 *   [en]The animation used when showing an hiding the popover. Can be either "none" or "fade".[/en]
 *   [ja]ポップオーバーを表示する際のアニメーション名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name mask-color
 * @type {Color}
 * @description
 *   [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)".[/en]
 *   [ja]背景のマスクの色を指定します。デフォルトは"rgba(0, 0, 0, 0.2)"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preshow
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preshow" event is fired.[/en]
 *  [ja]"preshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prehide
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prehide" event is fired.[/en]
 *  [ja]"prehide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postshow
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postshow" event is fired.[/en]
 *  [ja]"postshow"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-posthide
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "posthide" event is fired.[/en]
 *  [ja]"posthide"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature show(target, [options])
 * @param {String|Event|HTMLElement} target
 *   [en]Target element. Can be either a CSS selector, an event object or a DOM element.[/en]
 *   [ja]ポップオーバーのターゲットとなる要素を指定します。CSSセレクタかeventオブジェクトかDOM要素のいずれかを渡せます。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"fade"もしくは"none"を指定できます。[/ja]
 * @description
 *   [en]Open the popover and point it at a target. The target can be either an event, a css selector or a DOM element..[/en]
 *   [ja]対象とする要素にポップオーバーを表示します。target引数には、$eventオブジェクトやDOMエレメントやCSSセレクタを渡すことが出来ます。[/ja]
 */

/**
 * @ngdoc method
 * @signature hide([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"fade"もしくは"none"を指定できます。[/ja]
 * @description
 *   [en]Close the popover.[/en]
 *   [ja]ポップオーバーを閉じます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isShown()
 * @return {Boolean}
 *   [en]true if the popover is visible.[/en]
 *   [ja]ポップオーバーが表示されている場合にtrueとなります。[/ja]
 * @description
 *   [en]Returns whether the popover is visible or not.[/en]
 *   [ja]ポップオーバーが表示されているかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature destroy()
 * @description
 *   [en]Destroy the popover and remove it from the DOM tree.[/en]
 *   [ja]ポップオーバーを破棄して、DOMツリーから取り除きます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setCancelable(cancelable)
 * @param {Boolean} cancelable
 *   [en]If true the popover will be cancelable.[/en]
 *   [ja]ポップオーバーがキャンセル可能にしたい場合にtrueを指定します。[/ja]
 * @description
 *   [en]Set whether the popover can be canceled by the user when it is shown.[/en]
 *   [ja]ポップオーバーを表示した際に、ユーザがそのポップオーバーをキャンセルできるかどうかを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isCancelable()
 * @return {Boolean}
 *   [en]true if the popover is cancelable.[/en]
 *   [ja]ポップオーバーがキャンセル可能であればtrueとなります。[/ja]
 * @description
 *   [en]Returns whether the popover is cancelable or not.[/en]
 *   [ja]このポップオーバーがキャンセル可能かどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean} disabled
 *   [en]If true the popover will be disabled.[/en]
 *   [ja]ポップオーバーをdisabled状態にしたい場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Disable or enable the popover.[/en]
 *   [ja]このポップオーバーをdisabled状態にするかどうかを設定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the popover is disabled.[/en]
 *   [ja]ポップオーバーがdisabled状態であればtrueとなります。[/ja]
 * @description
 *   [en]Returns whether the popover is disabled or enabled.[/en]
 *   [ja]このポップオーバーがdisabled状態かどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsPopover', ['$onsen', 'PopoverView', function($onsen, PopoverView) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/popover.tpl',
      compile: function(element, attrs, transclude) {
        return {
          pre: function(scope, element, attrs) {
            transclude(scope, function(clone) {
              angular.element(element[0].querySelector('.popover__content')).append(clone);
            });

            var popover = new PopoverView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, popover);
            $onsen.registerEventHandlers(popover, 'preshow prehide postshow posthide destroy');

            element.data('ons-popover', popover);

            scope.$on('$destroy', function() {
              popover._events = undefined;
              $onsen.removeModifierMethods(popover);
              element.data('ons-popover', undefined);
              element = null;
            });

            scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
            $onsen.addModifierMethods(popover, 'popover--*', angular.element(element[0].querySelector('.popover')));
            $onsen.addModifierMethods(popover, 'popover__content--*', angular.element(element[0].querySelector('.popover__content')));

            if ($onsen.isAndroid()) {
              setImmediate(function() {
                popover.addModifier('android');
              });
            }

            scope.direction = 'up';
            scope.arrowPosition = 'bottom';
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id pull-hook
 * @name ons-pull-hook
 * @category control
 * @description
 *   [en]Component that adds "pull-to-refresh" to an <ons-page> element.[/en]
 *   [ja]ons-page要素以下でいわゆるpull to refreshを実装するためのコンポーネントです。[/ja]
 * @codepen WbJogM
 * @guide UsingPullHook 
 *   [en]How to use Pull Hook[/en]
 *   [ja]プルフックを使う[/ja]
 * @example
 * <script>
 *   ons.bootstrap()
 *
 *   .controller('MyController', function($scope, $timeout) {
 *     $scope.items = [3, 2 ,1];
 *
 *     $scope.load = function($done) {
 *       $timeout(function() {
 *         $scope.items.unshift($scope.items.length + 1);
 *         $done();
 *       }, 1000);
 *     };
 *   });
 * </script>
 *
 * <ons-page ng-controller="MyController">
 *   <ons-pull-hook var="loaded" ng-action="load($done)">
 *     <span ng-switch="loader.getCurrentState()">
 *       <span ng-switch-when="initial">Pull down to refresh</span>
 *       <span ng-switch-when="preaction">Release to refresh</span>
 *       <span ng-switch-when="action">Loading data. Please wait...</span>
 *     </span>
 *   </ons-pull-hook>
 *   <ons-list>
 *     <ons-list-item ng-repeat="item in items">
 *       Item #{{ item }}
 *     </ons-list-item>
 *   </ons-list>
 * </ons-page>
 */

/**
 * @ngdoc event
 * @name changestate
 * @description
 *   [en]Fired when the state is changed. The state can be either "initial", "preaction" or "action".[/en]
 *   [ja]コンポーネントの状態が変わった場合に発火します。状態は、"initial", "preaction", "action"のいずれかです。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.pullHook
 *   [en]Component object.[/en]
 *   [ja]コンポーネントのオブジェクト。[/ja]
 * @param {String} event.state
 *   [en]Current state.[/en]
 *   [ja]現在の状態名を参照できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this component.[/en]
 *   [ja]このコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]If this attribute is set the "pull-to-refresh" functionality is disabled.[/en]
 *   [ja]この属性がある時、disabled状態になりアクションが実行されなくなります[/ja]
 */

/**
 * @ngdoc attribute
 * @name ng-action
 * @type {Expression}
 * @description
 *   [en]Use to specify custom behavior when the page is pulled down. A <code>$done</code> function is available to tell the component that the action is completed.[/en]
 *   [ja]pull downしたときの振る舞いを指定します。アクションが完了した時には<code>$done</code>関数を呼び出します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name on-action
 * @type {Expression}
 * @description
 *   [en]Same as <code>ng-action</code> but can be used without AngularJS. A function called <code>done</code> is available to call when action is complete.[/en]
 *   [ja]<code>ng-action</code>と同じですが、AngularJS無しで利用する場合に利用できます。アクションが完了した時には<code>done</code>関数を呼び出します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name height
 * @type {String}
 * @description
 *   [en]Specify the height of the component. When pulled down further than this value it will switch to the "preaction" state. The default value is "64px".[/en]
 *   [ja]コンポーネントの高さを指定します。この高さ以上にpull downすると"preaction"状態に移行します。デフォルトの値は"64px"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name threshold-height
 * @type {String}
 * @description
 *   [en]Specify the threshold height. The component automatically switches to the "action" state when pulled further than this value. The default value is "96px". A negative value or a value less than the height will disable this property.[/en]
 *   [ja]閾値となる高さを指定します。この値で指定した高さよりもpull downすると、このコンポーネントは自動的に"action"状態に移行します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-changestate
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "changestate" event is fired.[/en]
 *  [ja]"changestate"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setDisabled(disabled)
 * @param {Boolean} disabled
 *   [en]If true the pull hook will be disabled.[/en]
 *   [ja]trueを指定すると、プルフックがdisabled状態になります。[/ja]
 * @description
 *   [en]Disable or enable the component.[/en]
 *   [ja]disabled状態にするかどうかを設定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature isDisabled()
 * @return {Boolean}
 *   [en]true if the pull hook is disabled.[/en]
 *   [ja]プルフックがdisabled状態の場合、trueを返します。[/ja]
 * @description
 *   [en]Returns whether the component is disabled or enabled.[/en]
 *   [ja]dsiabled状態になっているかを得ることが出来ます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setHeight(height)
 * @param {Number} height
 *   [en]Desired height.[/en]
 *   [ja]要素の高さを指定します。[/ja]
 * @description
 *   [en]Specify the height.[/en]
 *   [ja]高さを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setThresholdHeight(thresholdHeight)
 * @param {Number} thresholdHeight
 *   [en]Desired threshold height.[/en]
 *   [ja]プルフックのアクションを起こす閾値となる高さを指定します。[/ja]
 * @description
 *   [en]Specify the threshold height.[/en]
 *   [ja]閾値となる高さを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  /**
   * Pull hook directive.
   */
  module.directive('onsPullHook', ['$onsen', 'PullHookView', function($onsen, PullHookView) {
    return {
      restrict: 'E',
      replace: false,
      scope: true,
      compile: function(element, attrs) {
        return {
          pre: function(scope, element, attrs) {
            var pullHook = new PullHookView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, pullHook);
            $onsen.registerEventHandlers(pullHook, 'changestate destroy');
            element.data('ons-pull-hook', pullHook);

            scope.$on('$destroy', function() {
              pullHook._events = undefined;
              element.data('ons-pull-hook', undefined);
              scope = element = attrs = null;
            });
          },
          post: function(scope, element) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id row
 * @name ons-row
 * @category grid
 * @description
 *   [en]Represents a row in the grid system. Use with ons-col to layout components.[/en]
 *   [ja]グリッドシステムにて行を定義します。ons-colとともに使用し、コンポーネントの配置に使用します。[/ja]
 * @codepen GgujC {wide}
 * @guide Layouting
 *   [en]Layouting guide[/en]
 *   [ja]レイアウト調整[/ja]
 * @seealso ons-col
 *   [en]ons-col component[/en]
 *   [ja]ons-colコンポーネント[/ja]
 * @note
 *   [en]For Android 4.3 and earlier, and iOS6 and earlier, when using mixed alignment with ons-row and ons-column, they may not be displayed correctly. You can use only one align.[/en]
 *   [ja]Android 4.3以前、もしくはiOS 6以前のOSの場合、ons-rowとons-columnを組み合わせた場合に描画が崩れる場合があります。[/ja]
 * @example
 * <ons-row>
 *   <ons-col width="50px"><ons-icon icon="fa-twitter"></ons-icon></ons-col>
 *   <ons-col>Text</ons-col>
 * </ons-row>
 */

/**
 * @ngdoc attribute
 * @name align
 * @type {String}
 * @description
 *   [en]Short hand attribute for aligning vertically. Valid values are top, bottom, and center.[/en]
 *   [ja]縦に整列するために指定します。top、bottom、centerのいずれかを指定できます。[/ja]
 */

(function(){
  'use strict';

  var module = angular.module('onsen');

  module.directive('onsRow', ['$onsen', '$timeout', function($onsen, $timeout) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: false,

      compile: function(element, attrs) {
        element.addClass('row ons-row-inner');

        return function(scope, element, attrs) {
          attrs.$observe('align', function(align) {
            update();
          });

          update();

          function update() {
            var align = ('' + attrs.align).trim();
            if (align === 'top' || align === 'center' || align === 'bottom') {
              element.removeClass('row-bottom row-center row-top');
              element.addClass('row-' + align);
            }
          }

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();


/**
 * @ngdoc directive
 * @id scroller
 * @name ons-scroller
 * @category base
 * @description
 *   [en]Makes the content inside this tag scrollable.[/en]
 *   [ja]要素内をスクロール可能にします。[/ja]
 * @example
 * <ons-scroller style="height: 200px; width: 100%">
 *   ...
 * </ons-scroller>
 */
(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsScroller', ['$onsen', '$timeout', function($onsen, $timeout) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,

      scope: {
        onScrolled: '&',
        infinitScrollEnable: '='
      },

      compile: function(element, attrs) {
        var content = element.addClass('ons-scroller').children().remove();

        return function(scope, element, attrs, controller, transclude) {
          if (attrs.ngController) {
            throw new Error('"ons-scroller" can\'t accept "ng-controller" directive.');
          }

          var wrapper = angular.element('<div></div>');
          wrapper.addClass('ons-scroller__content ons-scroller-inner');
          element.append(wrapper);

          transclude(scope.$parent, function(cloned) {
            wrapper.append(cloned);
            wrapper = null;
          });

          // inifinte scroll
          var scrollWrapper;

          scrollWrapper = element[0];
          var offset = parseInt(attrs.threshold) || 10;

          if (scope.onScrolled) {
            scrollWrapper.addEventListener('scroll', function() {
              if (scope.infinitScrollEnable) {
                var scrollTopAndOffsetHeight = scrollWrapper.scrollTop + scrollWrapper.offsetHeight;
                var scrollHeightMinusOffset = scrollWrapper.scrollHeight - offset;

                if (scrollTopAndOffsetHeight >= scrollHeightMinusOffset) {
                  scope.onScrolled();
                }
              }
            });
          }

          // IScroll for Android
          if (!Modernizr.csstransforms3d) {
            $timeout(function() {
              var iScroll = new IScroll(scrollWrapper, {
                momentum: true,
                bounce: true,
                hScrollbar: false,
                vScrollbar: false,
                preventDefault: false
              });

              iScroll.on('scrollStart', function(e) {
                var scrolled = iScroll.y - offset;
                if (scrolled < (iScroll.maxScrollY + 40)) {
                  // TODO: find a better way to know when content is upated so we can refresh
                  iScroll.refresh();
                }
              });

              if (scope.onScrolled) {
                iScroll.on('scrollEnd', function(e) {
                  var scrolled = iScroll.y - offset;
                  if (scrolled < iScroll.maxScrollY) {
                    // console.log('we are there!');
                    scope.onScrolled();
                  }
                });
              }

            }, 500);
          }

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id sliding_menu
 * @name ons-sliding-menu
 * @category navigation
 * @description
 *   [en]Component for sliding UI where one page is overlayed over another page. The above page can be slided aside to reveal the page behind.[/en]
 *   [ja]スライディングメニューを表現するためのコンポーネントで、片方のページが別のページの上にオーバーレイで表示されます。above-pageで指定されたページは、横からスライドして表示します。[/ja]
 * @codepen IDvFJ
 * @seealso ons-page
 *   [en]ons-page component[/en]
 *   [ja]ons-pageコンポーネント[/ja]
 * @guide UsingSlidingMenu
 *   [en]Using sliding menu[/en]
 *   [ja]スライディングメニューを使う[/ja]
 * @guide EventHandling
 *   [en]Using events[/en]
 *   [ja]イベントの利用[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-sliding-menu var="app.menu" main-page="page.html" menu-page="menu.html" max-slide-distance="200px" type="reveal" side="left">
 * </ons-sliding-menu>
 *
 * <ons-template id="page.html">
 *   <ons-page>
 *    <p style="text-align: center">
 *      <ons-button ng-click="app.menu.toggleMenu()">Toggle</ons-button>
 *    </p>
 *   </ons-page>
 * </ons-template>
 *
 * <ons-template id="menu.html">
 *   <ons-page>
 *     <!-- menu page's contents -->
 *   </ons-page>
 * </ons-template>
 *
 */

/**
 * @ngdoc event
 * @name preopen
 * @description
 *   [en]Fired just before the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開く前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name postopen
 * @description
 *   [en]Fired just after the sliding menu is opened.[/en]
 *   [ja]スライディングメニューが開き終わった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name preclose
 * @description
 *   [en]Fired just before the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name postclose
 * @description
 *   [en]Fired just after the sliding menu is closed.[/en]
 *   [ja]スライディングメニューが閉じ終わった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.slidingMenu
 *   [en]Sliding menu view object.[/en]
 *   [ja]イベントが発火したSlidingMenuオブジェクトです。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *  [en]Variable name to refer this sliding menu.[/en]
 *  [ja]このスライディングメニューを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name menu-page
 * @type {String}
 * @description
 *   [en]The url of the menu page.[/en]
 *   [ja]左に位置するメニューページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name main-page
 * @type {String}
 * @description
 *   [en]The url of the main page.[/en]
 *   [ja]右に位置するメインページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name swipeable
 * @type {Boolean}
 * @description
 *   [en]Whether to enable swipe interaction.[/en]
 *   [ja]スワイプ操作を有効にする場合に指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name swipe-target-width
 * @type {String}
 * @description
 *   [en]The width of swipeable area calculated from the left (in pixels). Use this to enable swipe only when the finger touch on the screen edge.[/en]
 *   [ja]スワイプの判定領域をピクセル単位で指定します。画面の端から指定した距離に達するとページが表示されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name max-slide-distance
 * @type {String}
 * @description
 *   [en]How far the menu page will slide open. Can specify both in px and %. eg. 90%, 200px[/en]
 *   [ja]menu-pageで指定されたページの表示幅を指定します。ピクセルもしくは%の両方で指定できます（例: 90%, 200px）[/ja]
 */

/**
 * @ngdoc attribute
 * @name direction
 * @type {String}
 * @description
 *   [en]Specify which side of the screen the menu page is located on. Possible values are "left" and "right".[/en]
 *   [ja]menu-pageで指定されたページが画面のどちら側から表示されるかを指定します。leftもしくはrightのいずれかを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name type
 * @type {String}
 * @description
 *   [en]Sliding menu animator. Possible values are reveal (default), push and overlay.[/en]
 *   [ja]スライディングメニューのアニメーションです。"reveal"（デフォルト）、"push"、"overlay"のいずれかを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preopen
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preopen" event is fired.[/en]
 *  [ja]"preopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-preclose
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "preclose" event is fired.[/en]
 *  [ja]"preclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postopen
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postopen" event is fired.[/en]
 *  [ja]"postopen"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postclose
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postclose" event is fired.[/en]
 *  [ja]"postclose"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setMainPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Boolean} [options.closeMenu]
 *   [en]If true the menu will be closed.[/en]
 *   [ja]trueを指定すると、開いているメニューを閉じます。[/ja]
 * @param {Function} [options.callback]
 *   [en]Function that is executed after the page has been set.[/en]
 *   [ja]ページが読み込まれた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the main contents pane.[/en]
 *   [ja]中央部分に表示されるページをpageUrlに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setMenuPage(pageUrl, [options])
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Boolean} [options.closeMenu]
 *   [en]If true the menu will be closed after the menu page has been set.[/en]
 *   [ja]trueを指定すると、開いているメニューを閉じます。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be executed after the menu page has been set.[/en]
 *   [ja]メニューページが読み込まれた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the side menu pane.[/en]
 *   [ja]メニュー部分に表示されるページをpageUrlに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature openMenu([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened.[/en]
 *   [ja]メニューが開いた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Slide the above layer to reveal the layer behind.[/en]
 *   [ja]メニューページを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature closeMenu([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been closed.[/en]
 *   [ja]メニューが閉じられた後に呼び出される関数オブジェクトを指定します。[/ja]
 * @description
 *   [en]Slide the above layer to hide the layer behind.[/en]
 *   [ja]メニューページを非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature toggleMenu([options])
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Function} [options.callback]
 *   [en]This function will be called after the menu has been opened or closed.[/en]
 *   [ja]メニューが開き終わった後か、閉じ終わった後に呼び出される関数オブジェクトです。[/ja]
 * @description
 *   [en]Slide the above layer to reveal the layer behind if it is currently hidden, otherwise, hide the layer behind.[/en]
 *   [ja]現在の状況に合わせて、メニューページを表示もしくは非表示にします。[/ja]
 */

/**
 * @ngdoc method
 * @signature isMenuOpened()
 * @return {Boolean}
 *   [en]true if the menu is currently open.[/en]
 *   [ja]メニューが開いていればtrueとなります。[/ja]
 * @description
 *   [en]Returns true if the menu page is open, otherwise false.[/en]
 *   [ja]メニューページが開いている場合はtrue、そうでない場合はfalseを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getDeviceBackButtonHandler()
 * @return {Object}
 *   [en]Device back button handler.[/en]
 *   [ja]デバイスのバックボタンハンドラを返します。[/ja]
 * @description
 *   [en]Retrieve the back-button handler.[/en]
 *   [ja]ons-sliding-menuに紐付いているバックボタンハンドラを取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setSwipeable(swipeable)
 * @param {Boolean} swipeable
 *   [en]If true the menu will be swipeable.[/en]
 *   [ja]スワイプで開閉できるようにする場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Specify if the menu should be swipeable or not.[/en]
 *   [ja]スワイプで開閉するかどうかを設定する。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSlidingMenu', ['$compile', 'SlidingMenuView', '$onsen', function($compile, SlidingMenuView, $onsen) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclude.
      transclude: false,
      scope: true,

      compile: function(element, attrs) {
        var main = element[0].querySelector('.main'),
            menu = element[0].querySelector('.menu');

        if (main) {
          var mainHtml = angular.element(main).remove().html().trim();
        }

        if (menu) {
          var menuHtml = angular.element(menu).remove().html().trim();
        }

        return function(scope, element, attrs) {
          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          element.append(angular.element('<div></div>').addClass('onsen-sliding-menu__menu ons-sliding-menu-inner'));
          element.append(angular.element('<div></div>').addClass('onsen-sliding-menu__main ons-sliding-menu-inner'));

          var slidingMenu = new SlidingMenuView(scope, element, attrs);

          $onsen.registerEventHandlers(slidingMenu, 'preopen preclose postopen postclose destroy');

          if (mainHtml && !attrs.mainPage) {
            slidingMenu._appendMainPage(null, mainHtml);
          }

          if (menuHtml && !attrs.menuPage) {
            slidingMenu._appendMenuPage(menuHtml);
          }

          $onsen.declareVarAttribute(attrs, slidingMenu);
          element.data('ons-sliding-menu', slidingMenu);

          scope.$on('$destroy', function(){
            slidingMenu._events = undefined;
            element.data('ons-sliding-menu', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id split-view
 * @name ons-split-view
 * @category control
 * @description
 *  [en]Divides the screen into a left and right section.[/en]
 *  [ja]画面を左右に分割するコンポーネントです。[/ja]
 * @codepen nKqfv {wide}
 * @guide Usingonssplitviewcomponent
 *   [en]Using ons-split-view.[/en]
 *   [ja]ons-split-viewコンポーネントを使う[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @example
 * <ons-split-view
 *   secondary-page="secondary.html"
 *   main-page="main.html"
 *   main-page-width="70%"
 *   collapse="portrait">
 * </ons-split-view>
 */

/**
 * @ngdoc event
 * @name update
 * @description
 *   [en]Fired when the split view is updated.[/en]
 *   [ja]split viewの状態が更新された際に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Boolean} event.shouldCollapse
 *   [en]True if the view should collapse.[/en]
 *   [ja]collapse状態の場合にtrueになります。[/ja]
 * @param {String} event.currentMode
 *   [en]Current mode.[/en]
 *   [ja]現在のモード名を返します。"collapse"か"split"かのいずれかです。[/ja]
 * @param {Function} event.split
 *   [en]Call to force split.[/en]
 *   [ja]この関数を呼び出すと強制的にsplitモードにします。[/ja]
 * @param {Function} event.collapse
 *   [en]Call to force collapse.[/en]
 *   [ja]この関数を呼び出すと強制的にcollapseモードにします。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewの幅を返します。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"かもしくは"landscape"です。 [/ja]
 */

/**
 * @ngdoc event
 * @name presplit
 * @description
 *   [en]Fired just before the view is split.[/en]
 *   [ja]split状態にる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @ngdoc event
 * @name postsplit
 * @description
 *   [en]Fired just after the view is split.[/en]
 *   [ja]split状態になった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @ngdoc event
 * @name precollapse
 * @description
 *   [en]Fired just before the view is collapsed.[/en]
 *   [ja]collapse状態になる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @ngdoc event
 * @name postcollapse
 * @description
 *   [en]Fired just after the view is collapsed.[/en]
 *   [ja]collapse状態になった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.splitView
 *   [en]Split view object.[/en]
 *   [ja]イベントが発火したSplitViewオブジェクトです。[/ja]
 * @param {Number} event.width
 *   [en]Current width.[/en]
 *   [ja]現在のSplitViewnの幅です。[/ja]
 * @param {String} event.orientation
 *   [en]Current orientation.[/en]
 *   [ja]現在の画面のオリエンテーションを返します。"portrait"もしくは"landscape"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this split view.[/en]
 *   [ja]このスプリットビューコンポーネントを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name main-page
 * @type {String}
 * @description
 *   [en]The url of the page on the right.[/en]
 *   [ja]右側に表示するページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name main-page-width
 * @type {Number}
 * @description
 *   [en]Main page width percentage. The secondary page width will be the remaining percentage.[/en]
 *   [ja]右側のページの幅をパーセント単位で指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name secondary-page
 * @type {String}
 * @description
 *   [en]The url of the page on the left.[/en]
 *   [ja]左側に表示するページのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name collapse
 * @type {String}
 * @description
 *   [en]
 *     Specify the collapse behavior. Valid values are portrait, landscape, width #px or a media query.
 *     "portrait" or "landscape" means the view will collapse when device is in landscape or portrait orientation.
 *     "width #px" means the view will collapse when the window width is smaller than the specified #px.
 *     If the value is a media query, the view will collapse when the media query is true.
 *   [/en]
 *   [ja]
 *     左側のページを非表示にする条件を指定します。portrait, landscape、width #pxもしくはメディアクエリの指定が可能です。
 *     portraitもしくはlandscapeを指定すると、デバイスの画面が縦向きもしくは横向きになった時に適用されます。
 *     width #pxを指定すると、画面が指定した横幅よりも短い場合に適用されます。
 *     メディアクエリを指定すると、指定したクエリに適合している場合に適用されます。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-update
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "update" event is fired.[/en]
 *  [ja]"update"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-presplit
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "presplit" event is fired.[/en]
 *  [ja]"presplit"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-precollapse
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "precollapse" event is fired.[/en]
 *  [ja]"precollapse"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postsplit
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postsplit" event is fired.[/en]
 *  [ja]"postsplit"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postcollapse
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postcollapse" event is fired.[/en]
 *  [ja]"postcollapse"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setMainPage(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the right section[/en]
 *   [ja]指定したURLをメインページを読み込みます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setSecondaryPage(pageUrl)
 * @param {String} pageUrl
 *   [en]Page URL. Can be either an HTML document or an <ons-template>.[/en]
 *   [ja]pageのURLか、ons-templateで宣言したテンプレートのid属性の値を指定します。[/ja]
 * @description
 *   [en]Show the page specified in pageUrl in the left section[/en]
 *   [ja]指定したURLを左のページの読み込みます。[/ja]
 */

/**
 * @ngdoc method
 * @signature update()
 * @description
 *   [en]Trigger an 'update' event and try to determine if the split behaviour should be changed.[/en]
 *   [ja]splitモードを変えるべきかどうかを判断するための'update'イベントを発火します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSplitView', ['$compile', 'SplitView', '$onsen', function($compile, SplitView, $onsen) {

    return {
      restrict: 'E',
      replace: false,
      transclude: false,
      scope: true,

      compile: function(element, attrs) {
        var mainPage = element[0].querySelector('.main-page'),
            secondaryPage = element[0].querySelector('.secondary-page');

        if (mainPage) {
          var mainHtml = angular.element(mainPage).remove().html().trim();
        }

        if (secondaryPage) {
          var secondaryHtml = angular.element(secondaryPage).remove().html().trim();
        }

        return function(scope, element, attrs) {
          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          element.append(angular.element('<div></div>').addClass('onsen-split-view__secondary full-screen ons-split-view-inner'));
          element.append(angular.element('<div></div>').addClass('onsen-split-view__main full-screen ons-split-view-inner'));

          var splitView = new SplitView(scope, element, attrs);

          if (mainHtml && !attrs.mainPage) {
            splitView._appendMainPage(mainHtml);
          }

          if (secondaryHtml && !attrs.secondaryPage) {
            splitView._appendSecondPage(secondaryHtml);
          }

          $onsen.declareVarAttribute(attrs, splitView);
          $onsen.registerEventHandlers(splitView, 'update presplit precollapse postsplit postcollapse destroy');

          element.data('ons-split-view', splitView);

          scope.$on('$destroy', function() {
            splitView._events = undefined;
            element.data('ons-split-view', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id switch
 * @name ons-switch
 * @category form
 * @description
 *  [en]Switch component.[/en]
 *  [ja]スイッチを表示するコンポーネントです。[/ja]
 * @guide UsingFormComponents
 *   [en]Using form components[/en]
 *   [ja]フォームを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @seealso ons-button
 *   [en]ons-button component[/en]
 *   [ja]ons-buttonコンポーネント[/ja]
 * @example
 * <ons-switch checked></ons-switch>
 */

/**
 * @ngdoc event
 * @name change
 * @description
 *   [en]Fired when the value is changed.[/en]
 *   [ja]ON/OFFが変わった時に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Object} event.switch
 *   [en]Switch object.[/en]
 *   [ja]イベントが発火したSwitchオブジェクトを返します。[/ja]
 * @param {Boolean} event.value
 *   [en]Current value.[/en]
 *   [ja]現在の値を返します。[/ja]
 * @param {Boolean} event.isInteractive
 *   [en]True if the change was triggered by the user clicking on the switch.[/en]
 *   [ja]タップやクリックなどのユーザの操作によって変わった場合にはtrueを返します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this switch.[/en]
 *   [ja]JavaScriptから参照するための変数名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *  [en]The appearance of the switch.[/en]
 *  [ja]スイッチの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]Whether the switch should be disabled.[/en]
 *   [ja]スイッチを無効の状態にする場合に指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name checked
 * @description
 *   [en]Whether the switch is checked.[/en]
 *   [ja]スイッチがONの状態にするときに指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isChecked()
 * @return {Boolean}
 *   [en]true if the switch is on.[/en]
 *   [ja]ONになっている場合にはtrueになります。[/ja]
 * @description
 *   [en]Returns true if the switch is ON.[/en]
 *   [ja]スイッチがONの場合にtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature setChecked(checked)
 * @param {Boolean} checked
 *   [en]If true the switch will be set to on.[/en]
 *   [ja]ONにしたい場合にはtrueを指定します。[/ja]
 * @description
 *   [en]Set the value of the switch. isChecked can be either true or false.[/en]
 *   [ja]スイッチの値を指定します。isCheckedにはtrueもしくはfalseを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature getCheckboxElement()
 * @return {HTMLElement}
 *   [en]The underlying checkbox element.[/en]
 *   [ja]コンポーネント内部のcheckbox要素になります。[/ja]
 * @description
 *   [en]Get inner input[type=checkbox] element.[/en]
 *   [ja]スイッチが内包する、input[type=checkbox]の要素を取得します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsSwitch', ['$onsen', '$parse', 'SwitchView', function($onsen, $parse, SwitchView) {
    return {
      restrict: 'E',
      replace: false,

      transclude: false,
      scope: true,

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/switch.tpl',
      compile: function(element) {
        return function(scope, element, attrs) {
          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          var switchView = new SwitchView(element, scope, attrs);
          var checkbox = angular.element(element[0].querySelector('input[type=checkbox]'));

          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);

          var label = element.children(),
              input = angular.element(label.children()[0]),
              toggle = angular.element(label.children()[1]);

          $onsen.addModifierMethods(switchView, 'switch--*', label);
          $onsen.addModifierMethods(switchView, 'switch--*__input', input);
          $onsen.addModifierMethods(switchView, 'switch--*__toggle', toggle);

          attrs.$observe('checked', function(checked) {
            scope.model = !!element.attr('checked');
          });

          attrs.$observe('name', function(name) {
            if (!!element.attr('name')) {
              checkbox.attr('name', name);
            }
          });

          if (attrs.ngModel) {
            var set = $parse(attrs.ngModel).assign;

            scope.$parent.$watch(attrs.ngModel, function(value) {
              scope.model = value;
            });

            scope.$watch('model', function(to, from) {
              set(scope.$parent, to);
              if (to !== from) {
                scope.$eval(attrs.ngChange);
              }
            });
          }

          $onsen.declareVarAttribute(attrs, switchView);
          element.data('ons-switch', switchView);

          $onsen.cleaner.onDestroy(scope, function() {
            switchView._events = undefined;
            $onsen.removeModifierMethods(switchView);
            element.data('ons-switch', undefined);
            $onsen.clearComponent({
              element : element,
              scope : scope,
              attrs : attrs
            });
            checkbox = element = attrs = scope = null;
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id tabbar_item
 * @name ons-tab
 * @category navigation
 * @description
 *   [en]Represents a tab inside tabbar. Each ons-tab represents a page.[/en]
 *   [ja]
 *     タブバーに配置される各アイテムのコンポーネントです。それぞれのons-tabはページを表します。
 *     ons-tab要素の中には、タブに表示されるコンテンツを直接記述することが出来ます。
 *   [/ja]
 * @codepen pGuDL
 * @guide UsingTabBar
 *   [en]Using tab bar[/en]
 *   [ja]タブバーを使う[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tabbar
 *   [en]ons-tabbar component[/en]
 *   [ja]ons-tabbarコンポーネント[/ja]
 * @seealso ons-page
 *   [en]ons-page component[/en]
 *   [ja]ons-pageコンポーネント[/ja]
 * @seealso ons-icon
 *   [en]ons-icon component[/en]
 *   [ja]ons-iconコンポーネント[/ja]
 * @example
 * <ons-tabbar>
 *   <ons-tab page="home.html" active="true">
 *     <ons-icon icon="ion-home"></ons-icon>
 *     <span style="font-size: 14px">Home</span>
 *   </ons-tab>
 *   <ons-tab page="fav.html" active="true">
 *     <ons-icon icon="ion-star"></ons-icon>
 *     <span style="font-size: 14px">Favorites</span>
 *   </ons-tab>
 *   <ons-tab page="settings.html" active="true">
 *     <ons-icon icon="ion-gear-a"></ons-icon>
 *     <span style="font-size: 14px">Settings</span>
 *   </ons-tab>
 * </ons-tabbar>
 *
 * <ons-template id="home.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="fav.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="settings.html">
 *   ...
 * </ons-template>
 */

/**
 * @ngdoc attribute
 * @name page
 * @type {String}
 * @description
 *   [en]The page that this <code>&lt;ons-tab&gt;</code> points to.[/en]
 *   [ja]<code>&lt;ons-tab&gt;</code>が参照するページへのURLを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name icon
 * @type {String}
 * @description
 *   [en]
 *     The icon name for the tab. Can specify the same icon name as <code>&lt;ons-icon&gt;</code>.
 *     If you need to use your own icon, create a css class with background-image or any css properties and specify the name of your css class here.
 *   [/en]
 *   [ja]
 *     アイコン名を指定します。<code>&lt;ons-icon&gt;</code>と同じアイコン名を指定できます。
 *     個別にアイコンをカスタマイズする場合は、background-imageなどのCSSスタイルを用いて指定できます。
 *   [/ja]
 */

/**
 * @ngdoc attribute
 * @name active-icon
 * @type {String}
 * @description
 *   [en]The name of the icon when the tab is active.[/en]
 *   [ja]アクティブの際のアイコン名を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name label
 * @type {String}
 * @description
 *   [en]The label of the tab item.[/en]
 *   [ja]アイコン下に表示されるラベルを指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name active
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Set whether this item should be active or not. Valid values are true and false.[/en]
 *   [ja]このタブアイテムをアクティブ状態にするかどうかを指定します。trueもしくはfalseを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name no-reload
 * @description
 *   [en]Set if the page shouldn't be reloaded when clicking on the same tab twice.[/en]
 *   [ja]すでにアクティブになったタブを再びクリックするとページの再読み込みは発生しません。[/ja]
 */

/**
 * @ngdoc attribute
 * @name persistent
 * @description
 *   [en]
 *     Set to make the tab content persistent.
 *     If this attribute it set the DOM will not be destroyed when navigating to another tab.
 *   [/en]
 *   [ja]
 *     このタブで読み込んだページを永続化します。
 *     この属性があるとき、別のタブのページに切り替えても、
 *     読み込んだページのDOM要素は破棄されずに単に非表示になります。
 *   [/ja]
 */

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsTab', tab);
  module.directive('onsTabbarItem', tab); // for BC

  var defaultInnerTemplate =
    '<div ng-if="icon != undefined" class="tab-bar__icon">' +
      '<ons-icon icon="{{tabIcon}}" style="font-size: 28px; line-height: 34px; vertical-align: top;"></ons-icon>' +
    '</div>' +
    '<div ng-if="label" class="tab-bar__label">{{label}}</div>';

  function tab($onsen, $compile) {
    return {
      restrict: 'E',
      transclude: true,

      scope: {
        page: '@',
        active: '@',
        icon: '@',
        activeIcon: '@',
        label: '@',
        noReload: '@',
        persistent: '@'
      },

      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/tab.tpl',

      compile: function(element, attrs) {
        element.addClass('tab-bar__item');

        return function(scope, element, attrs, controller, transclude) {
          var tabbarView = element.inheritedData('ons-tabbar');
          if (!tabbarView) {
            throw new Error('This ons-tab element is must be child of ons-tabbar element.');
          }

          element.addClass(tabbarView._scope.modifierTemplater('tab-bar--*__item'));
          element.addClass(tabbarView._scope.modifierTemplater('tab-bar__item--*'));

          transclude(scope.$parent, function(cloned) {
            var wrapper = angular.element(element[0].querySelector('.tab-bar-inner'));

            if (attrs.icon || attrs.label || !cloned[0]) {
              var innerElement = angular.element('<div>' + defaultInnerTemplate + '</div>').children();
              wrapper.append(innerElement);
              $compile(innerElement)(scope);
            } else {
              wrapper.append(cloned);
            }
          });

          var radioButton = element[0].querySelector('input');

          scope.tabbarModifierTemplater = tabbarView._scope.modifierTemplater;
          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
          scope.tabbarId = tabbarView._tabbarId;
          scope.tabIcon = scope.icon;

          tabbarView.addTabItem(scope);

          // Make this tab active.
          scope.setActive = function() {
            element.addClass('active');
            radioButton.checked = true;

            if (scope.activeIcon) {
              scope.tabIcon = scope.activeIcon;
            }

            angular.element(element[0].querySelectorAll('[ons-tab-inactive]')).css('display', 'none');
            angular.element(element[0].querySelectorAll('[ons-tab-active]')).css('display', 'inherit');
          };

          // Make this tab inactive.
          scope.setInactive = function() {
            element.removeClass('active');
            radioButton.checked = false;
            scope.tabIcon = scope.icon;

            angular.element(element[0].querySelectorAll('[ons-tab-inactive]')).css('display', 'inherit');
            angular.element(element[0].querySelectorAll('[ons-tab-active]')).css('display', 'none');
          };

          scope.isPersistent = function() {
            return typeof scope.persistent != 'undefined';
          };

          /**
           * @return {Boolean}
           */
          scope.isActive = function() {
            return element.hasClass('active');
          };

          scope.tryToChange = function() {
            tabbarView.setActiveTab(tabbarView._tabItems.indexOf(scope));
          };

          if (scope.active) {
            tabbarView.setActiveTab(tabbarView._tabItems.indexOf(scope));
          }

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  }
  tab.$inject = ['$onsen', '$compile'];
})();

/**
 * @ngdoc directive
 * @id tabbar
 * @name ons-tabbar
 * @category navigation
 * @description
 *   [en]A component to display a tab bar on the bottom of a page. Used with ons-tab to manage pages using tabs.[/en]
 *   [ja]タブバーをページ下部に表示するためのコンポーネントです。ons-tabと組み合わせて使うことで、ページを管理できます。[/ja]
 * @codepen pGuDL
 * @guide UsingTabBar
 *   [en]Using tab bar[/en]
 *   [ja]タブバーを使う[/ja]
 * @guide EventHandling
 *   [en]Event handling descriptions[/en]
 *   [ja]イベント処理の使い方[/ja]
 * @guide CallingComponentAPIsfromJavaScript
 *   [en]Using navigator from JavaScript[/en]
 *   [ja]JavaScriptからコンポーネントを呼び出す[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @seealso ons-tab
 *   [en]ons-tab component[/en]
 *   [ja]ons-tabコンポーネント[/ja]
 * @seealso ons-page
 *   [en]ons-page component[/en]
 *   [ja]ons-pageコンポーネント[/ja]
 * @example
 * <ons-tabbar>
 *   <ons-tab page="home.html" active="true">
 *     <ons-icon icon="ion-home"></ons-icon>
 *     <span style="font-size: 14px">Home</span>
 *   </ons-tab>
 *   <ons-tab page="fav.html" active="true">
 *     <ons-icon icon="ion-star"></ons-icon>
 *     <span style="font-size: 14px">Favorites</span>
 *   </ons-tab>
 *   <ons-tab page="settings.html" active="true">
 *     <ons-icon icon="ion-gear-a"></ons-icon>
 *     <span style="font-size: 14px">Settings</span>
 *   </ons-tab>
 * </ons-tabbar>
 *
 * <ons-template id="home.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="fav.html">
 *   ...
 * </ons-template>
 *
 * <ons-template id="settings.html">
 *   ...
 * </ons-template>
 */

/**
 * @ngdoc event
 * @name prechange
 * @description
 *   [en]Fires just before the tab is changed.[/en]
 *   [ja]アクティブなタブが変わる前に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja]tabItemオブジェクト。[/ja]
 * @param {Function} event.cancel
 *   [en]Call this function to cancel the change event.[/en]
 *   [ja]この関数を呼び出すと、アクティブなタブの変更がキャンセルされます。[/ja]
 */

/**
 * @ngdoc event
 * @name postchange
 * @description
 *   [en]Fires just after the tab is changed.[/en]
 *   [ja]アクティブなタブが変わった後に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja]tabItemオブジェクト。[/ja]
 */

/**
 * @ngdoc event
 * @name reactive
 * @description
 *   [en]Fires if the already open tab is tapped again.[/en]
 *   [ja]すでにアクティブになっているタブがもう一度タップやクリックされた場合に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクト。[/ja]
 * @param {Number} event.index
 *   [en]Current index.[/en]
 *   [ja]現在アクティブになっているons-tabのインデックスを返します。[/ja]
 * @param {Object} event.tabItem
 *   [en]Tab item object.[/en]
 *   [ja]tabItemオブジェクト。[/ja]
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this tab bar.[/en]
 *   [ja]このタブバーを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name hide-tabs
 * @type {Boolean}
 * @default false
 * @description
 *   [en]Whether to hide the tabs. Valid values are true/false.[/en]
 *   [ja]タブを非表示にする場合に指定します。trueもしくはfalseを指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name animation
 * @type {String}
 * @default none
 * @description
 *   [en]Animation name. Preset values are "none" and "fade". Default is "none".[/en]
 *   [ja]ページ読み込み時のアニメーションを指定します。"none"もしくは"fade"を選択できます。デフォルトは"none"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name position
 * @type {String}
 * @default bottom
 * @description
 *   [en]Tabbar's position. Preset values are "bottom" and "top". Default is "bottom".[/en]
 *   [ja]タブバーの位置を指定します。"bottom"もしくは"top"を選択できます。デフォルトは"bottom"です。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-reactive
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "reactive" event is fired.[/en]
 *  [ja]"reactive"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-prechange
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "prechange" event is fired.[/en]
 *  [ja]"prechange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-postchange
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "postchange" event is fired.[/en]
 *  [ja]"postchange"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name ons-destroy
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature setActiveTab(index, [options])
 * @param {Number} index
 *   [en]Tab index.[/en]
 *   [ja]タブのインデックスを指定します。[/ja]
 * @param {Object} [options]
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクト。[/ja]
 * @param {Boolean} [options.keepPage]
 *   [en]If true the page will not be changed.[/en]
 *   [ja]タブバーが現在表示しているpageを変えない場合にはtrueを指定します。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "fade" and "none".[/en]
 *   [ja]アニメーション名を指定します。"fade", "none"のいずれかを指定できます。[/ja]
 * @return {Boolean}
 *   [en]true if the change was successful.[/en]
 *   [ja]変更が成功した場合にtrueを返します。[/ja]
 * @description
 *   [en]Show specified tab page. Animations and other options can be specified by the second parameter.[/en]
 *   [ja]指定したインデックスのタブを表示します。アニメーションなどのオプションを指定できます。[/ja]
 */

/**
 * @ngdoc method
 * @signature getActiveTabIndex()
 * @return {Number}
 *   [en]The index of the currently active tab.[/en]
 *   [ja]現在アクティブになっているタブのインデックスを返します。[/ja]
 * @description
 *   [en]Returns tab index on current active tab. If active tab is not found, returns -1.[/en]
 *   [ja]現在アクティブになっているタブのインデックスを返します。現在アクティブなタブがない場合には-1を返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature loadPage(url)
 * @param {String} url
 *   [en]Page URL. Can be either an HTML document or an <code>&lt;ons-template&gt;</code>.[/en]
 *   [ja]pageのURLか、もしくは<code>&lt;ons-template&gt;</code>で宣言したid属性の値を利用できます。[/ja]
 * @description
 *   [en]Displays a new page without changing the active index.[/en]
 *   [ja]現在のアクティブなインデックスを変更せずに、新しいページを表示します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

(function() {
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsTabbar', ['$onsen', '$compile', 'TabbarView', function($onsen, $compile, TabbarView) {
    return {
      restrict: 'E',
      replace: false,
      transclude: true,
      scope: true,
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/tab_bar.tpl',
      link: function(scope, element, attrs, controller, transclude) {

        scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
        scope.selectedTabItem = {source: ''};

        attrs.$observe('hideTabs', function(hide) {
          var visible = hide !== 'true';
          tabbarView.setTabbarVisibility(visible);
        });

        var tabbarView = new TabbarView(scope, element, attrs);
        $onsen.addModifierMethods(tabbarView, 'tab-bar--*', angular.element(element.children()[1]));
        $onsen.registerEventHandlers(tabbarView, 'reactive prechange postchange destroy');

        scope.tabbarId = tabbarView._tabbarId;

        element.data('ons-tabbar', tabbarView);
        $onsen.declareVarAttribute(attrs, tabbarView);

        transclude(scope, function(cloned) {
          angular.element(element[0].querySelector('.ons-tabbar-inner')).append(cloned);
        });

        scope.$on('$destroy', function() {
          tabbarView._events = undefined;
          $onsen.removeModifierMethods(tabbarView);
          element.data('ons-tabbar', undefined);
        });

        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id template
 * @name ons-template
 * @category util
 * @description
 *   [en]Define a separate HTML fragment and use as a template.[/en]
 *   [ja]テンプレートとして使用するためのHTMLフラグメントを定義します。この要素でHTMLを宣言すると、id属性に指定した名前をpageのURLとしてons-navigatorなどのコンポーネントから参照できます。[/ja]
 * @guide DefiningMultiplePagesinSingleHTML
 *   [en]Defining multiple pages in single html[/en]
 *   [ja]複数のページを1つのHTMLに記述する[/ja]
 * @example
 * <ons-template id="foobar.html">
 *   ...
 * </ons-template>
 */
(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsTemplate', ['$onsen', '$templateCache', function($onsen, $templateCache) {
    return {
      restrict: 'E',
      transclude: false,
      priority: 1000,
      terminal: true,
      compile: function(element) {
        $templateCache.put(element.attr('id'), element.remove().html());
        $onsen.fireComponentEvent(element[0], 'init');
      }
    };
  }]);
})();

/**
 * @ngdoc directive
 * @id toolbar
 * @name ons-toolbar
 * @category toolbar
 * @modifier transparent
 *   [en]Transparent toolbar[/en]
 *   [ja]透明な背景を持つツールバーを表示します。[/ja]
 * @modifier android
 *   [en]Android style toolbar. Title is left-aligned.[/en]
 *   [ja]Androidライクなツールバーを表示します。タイトルが左に寄ります。[/ja]
 * @description
 *   [en]Toolbar component that can be used with navigation. Left, center and right container can be specified by class names.[/en]
 *   [ja]ナビゲーションで使用するツールバー用コンポーネントです。クラス名により、左、中央、右のコンテナを指定できます。[/ja]
 * @codepen aHmGL
 * @guide Addingatoolbar [en]Adding a toolbar[/en][ja]ツールバーの追加[/ja]
 * @seealso ons-bottom-toolbar
 *   [en]ons-bottom-toolbar component[/en]
 *   [ja]ons-bottom-toolbarコンポーネント[/ja]
 * @seealso ons-back-button
 *   [en]ons-back-button component[/en]
 *   [ja]ons-back-buttonコンポーネント[/ja]
 * @seealso ons-toolbar-button
 *   [en]ons-toolbar-button component[/en]
 *   [ja]ons-toolbar-buttonコンポーネント[/ja]
 * @example
 * <ons-page>
 *   <ons-toolbar>
 *     <div class="left"><ons-back-button>Back</ons-back-button></div>
 *     <div class="center">Title</div>
 *     <div class="right">Label</div>
 *   </ons-toolbar>
 * </ons-page>
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *  [en]Variable name to refer this toolbar.[/en]
 *  [ja]このツールバーを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name inline
 * @description
 *   [en]Display the toolbar as an inline element.[/en]
 *   [ja]ツールバーをインラインに置きます。スクロール領域内にそのまま表示されます。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @description
 *   [en]The appearance of the toolbar.[/en]
 *   [ja]ツールバーの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name fixed-style
 * @description
 *   [en]
 *     By default the center element will be left-aligned on Android and center-aligned on iOS.
 *     Use this attribute to override this behavior so it's always displayed in the center.
 *   [/en]
 *   [ja]
 *     このコンポーネントは、Androidではタイトルを左寄せ、iOSでは中央配置します。
 *     この属性を使用すると、要素はAndroidとiOSともに中央配置となります。
 *   [/ja]
 */

(function() {
  'use strict';

  var module = angular.module('onsen');

  function ensureLeftContainer(element, modifierTemplater) {
    var container = element[0].querySelector('.left');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'left');
      container.innerHTML = '&nbsp;';
    }

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
    }

    angular.element(container)
      .addClass('navigation-bar__left')
      .addClass(modifierTemplater('navigation-bar--*__left'));

    return container;
  }

  function ensureCenterContainer(element, modifierTemplater) {
    var container = element[0].querySelector('.center');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'center');
    }

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
    }

    angular.element(container)
      .addClass('navigation-bar__title navigation-bar__center')
      .addClass(modifierTemplater('navigation-bar--*__center'));

    return container;
  }

  function ensureRightContainer(element, modifierTemplater) {
    var container = element[0].querySelector('.right');

    if (!container) {
      container = document.createElement('div');
      container.setAttribute('class', 'right');
      container.innerHTML = '&nbsp;';
    }

    if (container.innerHTML.trim() === '') {
      container.innerHTML = '&nbsp;';
    }

    angular.element(container)
      .addClass('navigation-bar__right')
      .addClass(modifierTemplater('navigation-bar--*__right'));

    return container;
  }

  /**
   * @param {jqLite} element
   * @return {Boolean}
   */
  function hasCenterClassElementOnly(element) {
    var hasCenter = false;
    var hasOther = false;
    var child, children = element.contents();

    for (var i = 0; i < children.length; i++) {
      child = angular.element(children[i]);

      if (child.hasClass('center')) {
        hasCenter = true;
        continue;
      }

      if (child.hasClass('left') || child.hasClass('right')) {
        hasOther = true;
        continue;
      }

    }

    return hasCenter && !hasOther;
  }

  function ensureToolbarItemElements(element, modifierTemplater) {
    var center;
    if (hasCenterClassElementOnly(element)) {
      center = ensureCenterContainer(element, modifierTemplater);
      element.contents().remove();
      element.append(center);
    } else {
      center = ensureCenterContainer(element, modifierTemplater);
      var left = ensureLeftContainer(element, modifierTemplater);
      var right = ensureRightContainer(element, modifierTemplater);

      element.contents().remove();
      element.append(angular.element([left, center, right]));
    }
  }

  /**
   * Toolbar directive.
   */
  module.directive('onsToolbar', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      replace: false,

      // NOTE: This element must coexists with ng-controller.
      // Do not use isolated scope and template's ng-transclde.
      scope: false,
      transclude: false,

      compile: function(element, attrs) {
        var shouldAppendAndroidModifier = ons.platform.isAndroid() && !element[0].hasAttribute('fixed-style');
        var modifierTemplater = $onsen.generateModifierTemplater(attrs, shouldAppendAndroidModifier ? ['android'] : []),
          inline = typeof attrs.inline !== 'undefined';

        element.addClass('navigation-bar');
        element.addClass(modifierTemplater('navigation-bar--*'));

        if (!inline) {
          element.css({
            'position': 'absolute',
            'z-index': '10000',
            'left': '0px',
            'right': '0px',
            'top': '0px'
          });
        }

        ensureToolbarItemElements(element, modifierTemplater);

        return {
          pre: function(scope, element, attrs) {
            var toolbar = new GenericView(scope, element, attrs);

            $onsen.declareVarAttribute(attrs, toolbar);


            scope.$on('$destroy', function() {
              toolbar._events = undefined;
              $onsen.removeModifierMethods(toolbar);
              element.data('ons-toolbar', undefined);
              element = null;
            });

            $onsen.addModifierMethods(toolbar, 'navigation-bar--*', element);
            angular.forEach(['left', 'center', 'right'], function(position) {
              var el = element[0].querySelector('.navigation-bar__' + position);
              if (el) {
                $onsen.addModifierMethods(toolbar, 'navigation-bar--*__' + position, angular.element(el));
              }
            });

            var pageView = element.inheritedData('ons-page');

            if (pageView && !inline) {
              pageView.registerToolbar(element);
            }

            element.data('ons-toolbar', toolbar);
          },
          post: function(scope, element, attrs) {
            $onsen.fireComponentEvent(element[0], 'init');
          }
        };
      }
    };
  }]);

})();

/**
 * @ngdoc directive
 * @id toolbar_button
 * @name ons-toolbar-button
 * @category toolbar
 * @modifier outline
 *   [en]A button with an outline.[/en]
 *   [ja]アウトラインをもったボタンを表示します。[/ja]
 * @description
 *   [en]Button component for ons-toolbar and ons-bottom-toolbar.[/en]
 *   [ja]ons-toolbarあるいはons-bottom-toolbarに設置できるボタン用コンポーネントです。[/ja]
 * @codepen aHmGL
 * @guide Addingatoolbar
 *   [en]Adding a toolbar[/en]
 *   [ja]ツールバーの追加[/ja]
 * @seealso ons-toolbar
 *   [en]ons-toolbar component[/en]
 *   [ja]ons-toolbarコンポーネント[/ja]
 * @seealso ons-back-button
 *   [en]ons-back-button component[/en]
 *   [ja]ons-back-buttonコンポーネント[/ja]
 * @seealso ons-toolbar-button
 *   [en]ons-toolbar-button component[/en]
 *   [ja]ons-toolbar-buttonコンポーネント[/ja]
 * @example
 * <ons-toolbar>
 *   <div class="left"><ons-toolbar-button>Button</ons-toolbar-button></div>
 *   <div class="center">Title</div>
 *   <div class="right"><ons-toolbar-button><ons-icon icon="ion-navion" size="28px"></ons-icon></ons-toolbar-button></div>
 * </ons-toolbar>
 */

/**
 * @ngdoc attribute
 * @name var
 * @type {String}
 * @description
 *   [en]Variable name to refer this buttom.[/en]
 *   [ja]このボタンを参照するための名前を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name modifier
 * @type {String}
 * @description
 *   [en]The appearance of the button.[/en]
 *   [ja]ボタンの表現を指定します。[/ja]
 */

/**
 * @ngdoc attribute
 * @name disabled
 * @description
 *   [en]Specify if button should be disabled.[/en]
 *   [ja]ボタンを無効化する場合は指定してください。[/ja]
 */

(function(){
  'use strict';
  var module = angular.module('onsen');

  module.directive('onsToolbarButton', ['$onsen', 'GenericView', function($onsen, GenericView) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: $onsen.DIRECTIVE_TEMPLATE_URL + '/toolbar_button.tpl',
      link: {
        pre: function(scope, element, attrs) {
          var toolbarButton = new GenericView(scope, element, attrs),
            innerElement = element[0].querySelector('.toolbar-button');

          $onsen.declareVarAttribute(attrs, toolbarButton);

          element.data('ons-toolbar-button', toolbarButton);

          scope.$on('$destroy', function() {
            toolbarButton._events = undefined;
            $onsen.removeModifierMethods(toolbarButton);
            element.data('ons-toolbar-button', undefined);
            element = null;
          });

          var modifierTemplater = $onsen.generateModifierTemplater(attrs);

          if (attrs.ngController) {
            throw new Error('This element can\'t accept ng-controller directive.');
          }

          attrs.$observe('disabled', function(value) {
            if (value === false || typeof value === 'undefined') {
              innerElement.removeAttribute('disabled');
            }
            else {
              innerElement.setAttribute('disabled', 'disabled');
            }
          });

          scope.modifierTemplater = $onsen.generateModifierTemplater(attrs);
          $onsen.addModifierMethods(toolbarButton, 'toolbar-button--*', element.children());

          element.children('span').addClass(modifierTemplater('toolbar-button--*'));

          $onsen.cleaner.onDestroy(scope, function() {
            $onsen.clearComponent({
              scope: scope,
              attrs: attrs,
              element: element,
            });
            scope = element = attrs = null;
          });
        },
        post: function(scope, element, attrs) {
          $onsen.fireComponentEvent(element[0], 'init');
        }
      }
    };
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  var module = angular.module('onsen');

  var ComponentCleaner = {
    
    /**
     * @param {jqLite} element
     */
    decomposeNode: function(element) {
      var children = element.remove().children();
      for (var i = 0; i < children.length; i++) {
        ComponentCleaner.decomposeNode(angular.element(children[i]));
      }
    },

    /**
     * @param {Attributes} attrs
     */
    destroyAttributes: function(attrs) {
      attrs.$$element = null;
      attrs.$$observers = null;
    },

    /**
     * @param {jqLite} element
     */
    destroyElement: function(element) {
      element.remove();
    },

    /**
     * @param {Scope} scope
     */
    destroyScope: function(scope) {
      scope.$$listeners = {};
      scope.$$watchers = null;
      scope = null;
    },

    /**
     * @param {Scope} scope
     * @param {Function} fn
     */
    onDestroy: function(scope, fn) {
      var clear = scope.$on('$destroy', function() {
        clear();
        fn.apply(null, arguments);
      });
    }
  };

  module.factory('ComponentCleaner', function() {
    return ComponentCleaner;
  });

  // override builtin ng-(eventname) directives
  (function() {
    var ngEventDirectives = {};
    'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' ').forEach(
      function(name) {
        var directiveName = directiveNormalize('ng-' + name);
        ngEventDirectives[directiveName] = ['$parse', function($parse) {
          return {
            compile: function($element, attr) {
              var fn = $parse(attr[directiveName]);
              return function(scope, element, attr) {
                var listener = function(event) {
                  scope.$apply(function() {
                    fn(scope, {$event:event});
                  });
                };
                element.on(name, listener);

                ComponentCleaner.onDestroy(scope, function() {
                  element.off(name, listener);
                  element = null;

                  ComponentCleaner.destroyScope(scope);
                  scope = null;

                  ComponentCleaner.destroyAttributes(attr);
                  attr = null;
                });
              };
            }
          };
        }];

        function directiveNormalize(name) {
          return name.replace(/-([a-z])/g, function(matches) {
            return matches[1].toUpperCase();
          });
        }
      }
    );
    module.config(['$provide', function($provide) {
      var shift = function($delegate) {
        $delegate.shift();
        return $delegate;
      };
      Object.keys(ngEventDirectives).forEach(function(directiveName) {
        $provide.decorator(directiveName + 'Directive', ['$delegate', shift]);
      });
    }]);
    Object.keys(ngEventDirectives).forEach(function(directiveName) {
      module.directive(directiveName, ngEventDirectives[directiveName]);
    });
  })();
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  var util = {
    init: function() {
      this.ready = false;
    },

    addBackButtonListener: function(fn) {
      if (this._ready) {
        window.document.addEventListener('backbutton', fn, false);
      } else {
        window.document.addEventListener('deviceready', function() {
          window.document.addEventListener('backbutton', fn, false);
        });
      }
    },

    removeBackButtonListener: function(fn) {
      if (this._ready) {
        window.document.removeEventListener('backbutton', fn, false);
      } else {
        window.document.addEventListener('deviceready', function() {
          window.document.removeEventListener('backbutton', fn, false);
        });
      }
    }
  };
  util.init();

  /**
   * Internal service class for framework implementation.
   */
  angular.module('onsen').service('DeviceBackButtonHandler', function() {

    this._init = function() {
      if (window.ons.isWebView()) {
        window.document.addEventListener('deviceready', function() {
          util._ready = true;
        }, false);
      } else {
        util._ready = true;
      }

      this._bindedCallback = this._callback.bind(this);

      this.enable();
    };

    this._isEnabled = false;

    /**
     * Enable to handle 'backbutton' events.
     */
    this.enable = function() {
      if (!this._isEnabled) {
        util.addBackButtonListener(this._bindedCallback);
        this._isEnabled = true;
      }
    };

    /**
     * Disable to handle 'backbutton' events.
     */
    this.disable = function() {
      if (this._isEnabled) {
        util.removeBackButtonListener(this._bindedCallback);
        this._isEnabled = false;
      }
    };

    /**
     * Fire a 'backbutton' event manually.
     */
    this.fireDeviceBackButtonEvent = function() {
      var event = document.createEvent('Event');
      event.initEvent('backbutton', true, true);
      document.dispatchEvent(event);
    };

    this._callback = function() {
      this._dispatchDeviceBackButtonEvent();
    };

    /**
     * @param {jqLite} element
     * @param {Function} callback
     */
    this.create = function(element, callback) {
      if (!(element instanceof angular.element().constructor)) {
        throw new Error('element must be an instance of jqLite');
      }

      if (!(callback instanceof Function)) {
        throw new Error('callback must be an instance of Function');
      }

      var handler = {
        _callback: callback,
        _element: element,

        disable: function() {
          this._element.data('device-backbutton-handler', null);
        },

        setListener: function(callback) {
          this._callback = callback;
        },

        enable: function() {
          this._element.data('device-backbutton-handler', this);
        },

        isEnabled: function() {
          return this._element.data('device-backbutton-handler') === this;
        },

        destroy: function() {
          this._element.data('device-backbutton-handler', null);
          this._callback = this._element = null;
        }
      };

      handler.enable();

      return handler;
    };

    /**
     * @param {Object} event
     */
    this._dispatchDeviceBackButtonEvent = function(event) {
      var tree = this._captureTree();
      var element = this._findHandlerLeafElement(tree);

      //this._dumpTree(tree);
      //this._dumpParents(element);

      var handler = element.data('device-backbutton-handler');
      handler._callback(createEvent(element));

      function createEvent(element) {
        return {
          _element: element,
          callParentHandler: function() {
            var parent = this._element.parent();
            var hander = null;

            while (parent[0]) {
              handler = parent.data('device-backbutton-handler');
              if (handler) {
                return handler._callback(createEvent(parent));
              }
              parent = parent.parent();
            }
          }
        };
      }
    };

    this._dumpParents = function(element) {
      while(element[0]) {
        console.log(element[0].nodeName.toLowerCase() + '.' + element.attr('class'));
        element = element.parent();
      }
    };

    /**
     * @return {Object}
     */
    this._captureTree = function() {
      return createTree(angular.element(document.body));

      function createTree(element) {
        return {
          element: element,
          children: Array.prototype.concat.apply([], Array.prototype.map.call(element.children(), function(child) {
            child = angular.element(child);

            if (child[0].style.display === 'none') {
              return [];
            }

            if (child.children().length === 0 && !child.data('device-backbutton-handler')) {
              return [];
            }

            var result = createTree(child);

            if (result.children.length === 0 && !child.data('device-backbutton-handler')) {
              return [];
            }

            return [result];
          }))
        };
      }
    };

    this._dumpTree = function(node) {
      _dump(node, 0);

      function _dump(node, level) {
        var pad = new Array(level + 1).join('  ');
        console.log(pad + node.element[0].nodeName.toLowerCase());
        node.children.forEach(function(node) {
          _dump(node, level + 1);
        });
      }
    };

    /**
     * @param {Object} tree
     * @return {jqLite}
     */
    this._findHandlerLeafElement = function(tree) {
      return find(tree);

      function find(node) {
        if (node.children.length === 0) {
          return node.element;
        } 

        if (node.children.length === 1) {
          return find(node.children[0]);
        }

        return node.children.map(function(childNode) {
          return childNode.element;
        }).reduce(function(left, right) {
          if (left === null) {
            return right;
          }

          var leftZ = parseInt(window.getComputedStyle(left[0], '').zIndex, 10);
          var rightZ = parseInt(window.getComputedStyle(right[0], '').zIndex, 10);

          if (!isNaN(leftZ) && !isNaN(rightZ)) {
            return leftZ > rightZ ? left : right;
          }

          throw new Error('Capturing backbutton-handler is failure.');
        }, null);
      }
    };

    this._init();
  });

})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  var module = angular.module('onsen');

  /**
   * Internal service class for framework implementation.
   */
  module.factory('$onsen', ['$rootScope', '$window', '$cacheFactory', '$document', '$templateCache', '$http', '$q', '$onsGlobal', 'ComponentCleaner', 'DeviceBackButtonHandler', function($rootScope, $window, $cacheFactory, $document, $templateCache, $http, $q, $onsGlobal, ComponentCleaner, DeviceBackButtonHandler) {

    var unlockerDict = createUnlockerDict();
    var $onsen = createOnsenService();

    return $onsen;

    function createOnsenService() {
      return {

        DIRECTIVE_TEMPLATE_URL: 'templates',

        cleaner: ComponentCleaner,

        DeviceBackButtonHandler: DeviceBackButtonHandler,

        _defaultDeviceBackButtonHandler: DeviceBackButtonHandler.create(angular.element(document.body), function() {
          navigator.app.exitApp();
        }),

        getDefaultDeviceBackButtonHandler: function() {
          return this._defaultDeviceBackButtonHandler;
        },

        /**
         * @return {Boolean}
         */
        isEnabledAutoStatusBarFill: function() {
          return !!$onsGlobal._config.autoStatusBarFill;
        },

        /**
         * @param {HTMLElement} element
         * @return {Boolean}
         */
        shouldFillStatusBar: function(element) {
          if (this.isEnabledAutoStatusBarFill() && this.isWebView() && this.isIOS7Above()) {
            if (!(element instanceof HTMLElement)) {
              throw new Error('element must be an instance of HTMLElement');
            }
            var debug = element.tagName === 'ONS-TABBAR' ? console.log.bind(console) : angular.noop;

            for (;;) {
              if (element.hasAttribute('no-status-bar-fill')) {
                return false;
              }

              element = element.parentNode;
              debug(element);
              if (!element || !element.hasAttribute) {
                return true;
              }
            }
          }
          return false;
        },

        /**
         * @param {Object} params
         * @param {Scope} [params.scope]
         * @param {jqLite} [params.element]
         * @param {Array} [params.elements]
         * @param {Attributes} [params.attrs]
         */
        clearComponent: function(params) {
          if (params.scope) {
            ComponentCleaner.destroyScope(params.scope);
          }

          if (params.attrs) {
            ComponentCleaner.destroyAttributes(params.attrs);
          }

          if (params.element) {
            ComponentCleaner.destroyElement(params.element);
          }

          if (params.elements) {
            params.elements.forEach(function(element) {
              ComponentCleaner.destroyElement(element);
            });
          }
        },

        /**
         * Find first ancestor of el with tagName
         * or undefined if not found
         *
         * @param {jqLite} element
         * @param {String} tagName
         */
        upTo : function(el, tagName) {
          tagName = tagName.toLowerCase();

          do {
            if (!el) {
              return null;
            }
            el = el.parentNode;
            if (el.tagName.toLowerCase() == tagName) {
              return el;
            }
          } while (el.parentNode);

          return null;
        },


        /**
         * @param {Array} dependencies
         * @param {Function} callback
         */
        waitForVariables: function(dependencies, callback) {
          unlockerDict.addCallback(dependencies, callback);
        },

        /**
         * @param {jqLite} element
         * @param {String} name
         */
        findElementeObject: function(element, name) {
          return element.inheritedData(name);
        },

        /**
         * @param {String} page
         * @return {Promise}
         */
        getPageHTMLAsync: function(page) {
          var cache = $templateCache.get(page);

          if (cache) {
            var deferred = $q.defer();

            var html = typeof cache === 'string' ? cache : cache[1];
            deferred.resolve(this.normalizePageHTML(html));

            return deferred.promise;
            
          } else {
            return $http({
              url: page,
              method: 'GET'
            }).then(function(response) {
              var html = response.data;

              return this.normalizePageHTML(html);
            }.bind(this));
          }
        },

        /**
         * @param {String} html
         * @return {String}
         */
        normalizePageHTML: function(html) {
          html = ('' + html).trim();

          if (!html.match(/^<(ons-page|ons-navigator|ons-tabbar|ons-sliding-menu|ons-split-view)/)) {
            html = '<ons-page>' + html + '</ons-page>';
          }
          
          return html;
        },

        /**
         * Create modifier templater function. The modifier templater generate css classes binded modifier name.
         *
         * @param {Object} attrs
         * @param {Array} [modifiers] an array of appendix modifier
         * @return {Function} 
         */
        generateModifierTemplater: function(attrs, modifiers) {
          var attrModifiers = attrs && typeof attrs.modifier === 'string' ? attrs.modifier.trim().split(/ +/) : [];
          modifiers = angular.isArray(modifiers) ? attrModifiers.concat(modifiers) : attrModifiers;

          /**
           * @return {String} template eg. 'ons-button--*', 'ons-button--*__item'
           * @return {String}
           */
          return function(template) {
            return modifiers.map(function(modifier) {
              return template.replace('*', modifier);
            }).join(' ');
          };
        },

        /**
         * Add modifier methods to view object.
         *
         * @param {Object} view object
         * @param {String} template
         * @param {jqLite} element 
         */
        addModifierMethods: function(view, template, element) {
          var _tr = function(modifier) {
            return template.replace('*', modifier);
          };

          var fns = {
            hasModifier: function(modifier) {
              return element.hasClass(_tr(modifier));
            },

            removeModifier: function(modifier) {
              element.removeClass(_tr(modifier));
            },

            addModifier: function(modifier) {
              element.addClass(_tr(modifier)); 
            },

            setModifier: function(modifier) {
              var classes = element.attr('class').split(/\s+/),
                  patt = template.replace('*', '.');

              for (var i=0; i < classes.length; i++) {
                var cls = classes[i];

                if (cls.match(patt)) {
                  element.removeClass(cls);
                }
              }

              element.addClass(_tr(modifier));
            },

            toggleModifier: function(modifier) {
              var cls = _tr(modifier);
              if (element.hasClass(cls)) {
                element.removeClass(cls);  
              } else {
                element.addClass(cls);
              }
            }
          };

          var append = function(oldFn, newFn) {
            if (typeof oldFn !== 'undefined') {
              return function() {
                return oldFn.apply(null, arguments) || newFn.apply(null, arguments);
              };
            } else {
              return newFn;
            }
          };

          view.hasModifier = append(view.hasModifier, fns.hasModifier);
          view.removeModifier = append(view.removeModifier, fns.removeModifier);
          view.addModifier = append(view.addModifier, fns.addModifier);
          view.setModifier = append(view.setModifier, fns.setModifier);
          view.toggleModifier = append(view.toggleModifier, fns.toggleModifier);
        },

        /**
         * Remove modifier methods.
         *
         * @param {Object} view object
         */
        removeModifierMethods: function(view) {
          view.hasModifier = view.removeModifier =
            view.addModifier = view.setModifier =
            view.toggleModifier = undefined;
        },

        /**
         * Define a variable to JavaScript global scope and AngularJS scope as 'var' attribute name.
         *
         * @param {Object} attrs
         * @param object
         */
        declareVarAttribute: function(attrs, object) {
          if (typeof attrs['var'] === 'string') {
            var varName = attrs['var'];

            this._defineVar(varName, object);
            unlockerDict.unlockVarName(varName);
          }
        },

        _registerEventHandler: function(component, eventName) {
          var capitalizedEventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);

          component.on(eventName, function(event) {
            $onsen.fireComponentEvent(component._element[0], eventName, event);

            var handler = component._attrs['ons' + capitalizedEventName];
            if (handler) {
              component._scope.$eval(handler, {$event: event});
              component._scope.$evalAsync();
            }
          });
        },

        /**
         * Register event handlers for attributes.
         *
         * @param {Object} component
         * @param {String} eventNames
         */
        registerEventHandlers: function(component, eventNames) {
          eventNames = eventNames.trim().split(/\s+/);

          for (var i = 0, l = eventNames.length; i < l; i ++) {
            var eventName = eventNames[i];
            this._registerEventHandler(component, eventName);
          }
        },

        /**
         * @return {Boolean}
         */
        isAndroid: function() {
          return !!window.navigator.userAgent.match(/android/i);
        },

        /**
         * @return {Boolean}
         */
        isIOS: function() {
          return !!window.navigator.userAgent.match(/(ipad|iphone|ipod touch)/i);
        },

        /**
         * @return {Boolean}
         */
        isWebView: function() {
          return window.ons.isWebView();
        },

        /**
         * @return {Boolean}
         */
        isIOS7Above: (function() {
          var ua = window.navigator.userAgent;
          var match = ua.match(/(iPad|iPhone|iPod touch);.*CPU.*OS (\d+)_(\d+)/i);

          var result = match ? parseFloat(match[2] + '.' + match[3]) >= 7 : false;

          return function() {
            return result;
          };
        })(),

        /**
         * Fire a named event for a component. The view object, if it exists, is attached to event.component.
         *
         * @param {HTMLElement} [dom]
         * @param {String} event name
         */
        fireComponentEvent: function(dom, eventName, data) {
          data = data || {};

          var event = document.createEvent('HTMLEvents');

          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              event[key] = data[key];
            }
          }

          event.component = dom ?
            angular.element(dom).data(dom.nodeName.toLowerCase()) || null : null;
          event.initEvent(dom.nodeName.toLowerCase() + ':' + eventName, true, true);

          dom.dispatchEvent(event);
        },

        /**
         * Define a variable to JavaScript global scope and AngularJS scope.
         *
         * Util.defineVar('foo', 'foo-value');
         * // => window.foo and $scope.foo is now 'foo-value'
         *
         * Util.defineVar('foo.bar', 'foo-bar-value');
         * // => window.foo.bar and $scope.foo.bar is now 'foo-bar-value'
         *
         * @param {String} name
         * @param object
         */
        _defineVar: function(name, object) {
          var names = name.split(/\./);

          function set(container, names, object) {
            var name;
            for (var i = 0; i < names.length - 1; i++) {
              name = names[i];
              if (container[name] === undefined || container[name] === null) {
                container[name] = {};
              }
              container = container[name];
            }

            container[names[names.length - 1]] = object;

            if (container[names[names.length -1]] !== object) {
              throw new Error('Cannot set var="' + object._attrs.var + '" because it will overwrite a read-only variable.');
            }
          }

          if (ons.componentBase) {
            set(ons.componentBase, names, object);
          }

          set($rootScope, names, object);
        }
      };
    }

    function createUnlockerDict() {

      return {
        _unlockersDict: {},

        _unlockedVarDict: {},

        /**
         * @param {String} name
         * @param {Function} unlocker
         */
        _addVarLock: function (name, unlocker) {
          if (!(unlocker instanceof Function)) {
            throw new Error('unlocker argument must be an instance of Function.');
          }

          if (this._unlockersDict[name]) {
            this._unlockersDict[name].push(unlocker);
          } else {
            this._unlockersDict[name] = [unlocker];
          }
        },

        /**
         * @param {String} varName
         */
        unlockVarName: function(varName) {
          var unlockers = this._unlockersDict[varName];

          if (unlockers) {
            unlockers.forEach(function(unlock) {
              unlock();
            });
          }
          this._unlockedVarDict[varName] = true;
        },

        /**
         * @param {Array} dependencies an array of var name
         * @param {Function} callback
         */
        addCallback: function(dependencies, callback) {
          if (!(callback instanceof Function)) {
            throw new Error('callback argument must be an instance of Function.');
          }

          var doorLock = new DoorLock();
          var self = this;

          dependencies.forEach(function(varName) {

            if (!self._unlockedVarDict[varName]) {
              // wait for variable declaration
              var unlock = doorLock.lock();
              self._addVarLock(varName, unlock);
            }

          });

          if (doorLock.isLocked()) {
            doorLock.waitUnlock(callback);
          } else {
            callback();
          }
        }
      };
    }
  }]);
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/


/**
 * Minimal animation library for managing css transition on mobile browsers.
 */
window.animit = (function(){
  'use strict';

  /**
   * @param {HTMLElement} element
   */
  var Animit = function(element) {
    if (!(this instanceof Animit)) {
      return new Animit(element);
    }

    if (element instanceof HTMLElement) {
      this.elements = [element];
    } else if (Object.prototype.toString.call(element) === '[object Array]') {
      this.elements = element;
    } else {
      throw new Error('First argument must be an array or an instance of HTMLElement.');
    }

    this.transitionQueue = [];
    this.lastStyleAttributeDict = [];

    var self = this;
    this.elements.forEach(function(element, index) {
      if (!element.hasAttribute('data-animit-orig-style')) {
        self.lastStyleAttributeDict[index] = element.getAttribute('style');
        element.setAttribute('data-animit-orig-style', self.lastStyleAttributeDict[index] || '');
      } else {
        self.lastStyleAttributeDict[index] = element.getAttribute('data-animit-orig-style');
      }
    });
  };

  Animit.prototype = {

    /**
     * @property {Array}
     */
    transitionQueue: undefined,

    /**
     * @property {HTMLElement}
     */
    element: undefined,

    /**
     * Start animation sequence with passed animations.
     *
     * @param {Function} callback
     */
    play: function(callback) {
      if (typeof callback === 'function') {
        this.transitionQueue.push(function(done) {
          callback();
          done();
        });
      }

      this.startAnimation();

      return this;
    },

    /**
     * Queue transition animations or other function.
     *
     * e.g. animit(elt).queue({color: 'red'})
     * e.g. animit(elt).queue({color: 'red'}, {duration: 0.4})
     * e.g. animit(elt).queue({css: {color: 'red'}, duration: 0.2})
     *
     * @param {Object|Animit.Transition|Function} transition
     * @param {Object} [options]
     */
    queue: function(transition, options) {
      var queue = this.transitionQueue;

      if (transition && options) {
        options.css = transition;
        transition = new Animit.Transition(options);
      }

      if (!(transition instanceof Function || transition instanceof Animit.Transition)) {
        if (transition.css) {
          transition = new Animit.Transition(transition);
        } else {
          transition = new Animit.Transition({
            css: transition
          });
        }
      }

      if (transition instanceof Function) {
        queue.push(transition);
      } else if (transition instanceof Animit.Transition) {
        queue.push(transition.build());
      } else {
        throw new Error('Invalid arguments');
      }

      return this;
    },

    /**
     * Queue transition animations.
     *
     * @param {Float} seconds
     */
    wait: function(seconds) {
      var self = this;
      this.transitionQueue.push(function(done) {
        setTimeout(done, 1000 * seconds);
      });

      return this;
    },

    /**
     * Reset element's style.
     *
     * @param {Object} [options]
     * @param {Float} [options.duration]
     * @param {String} [options.timing]
     * @param {String} [options.transition]
     */
    resetStyle: function(options) {
      options = options || {};
      var self = this;

      if (options.transition && !options.duration) {
        throw new Error('"options.duration" is required when "options.transition" is enabled.');
      }

      if (options.transition || (options.duration && options.duration > 0)) {
        var transitionValue = options.transition || ('all ' + options.duration + 's ' + (options.timing || 'linear'));
        var transitionStyle = 'transition: ' + transitionValue + '; -' + Animit.prefix + '-transition: ' + transitionValue + ';';

        this.transitionQueue.push(function(done) {
          var elements = this.elements;

          // transition and style settings
          elements.forEach(function(element, index) {
            element.style[Animit.prefix + 'Transition'] = transitionValue;
            element.style.transition = transitionValue;

            var styleValue = (self.lastStyleAttributeDict[index] ? self.lastStyleAttributeDict[index] + '; ' : '') + transitionStyle;
            element.setAttribute('style', styleValue);
          });

          // add "transitionend" event handler
          var removeListeners = util.addOnTransitionEnd(elements[0], function() {
            clearTimeout(timeoutId);
            reset();
            done();
          });

          // for fail safe.
          var timeoutId = setTimeout(function() {
            removeListeners();
            reset();
            done();
          }, options.duration * 1000 * 1.4);
        });
      } else {
        this.transitionQueue.push(function(done) {
          reset();
          done();
        });
      }

      return this;

      function reset() {
        // Clear transition animation settings.
        self.elements.forEach(function(element, index) {
          element.style[Animit.prefix + 'Transition'] = 'none';
          element.style.transition = 'none';

          if (self.lastStyleAttributeDict[index]) {
            element.setAttribute('style', self.lastStyleAttributeDict[index]);
          } else {
            element.setAttribute('style', '');
            element.removeAttribute('style');
          }
        });
      }
    },

    /**
     * Start animation sequence.
     */
    startAnimation: function() {
      this._dequeueTransition();

      return this;
    },

    _dequeueTransition: function() {
      var transition = this.transitionQueue.shift();
      if (this._currentTransition) {
        throw new Error('Current transition exists.');
      }
      this._currentTransition = transition;
      var self = this;
      var called = false;

      var done = function() {
        if (!called) {
          called = true;
          self._currentTransition = undefined;
          self._dequeueTransition();
        } else {
          throw new Error('Invalid state: This callback is called twice.');
        }
      };

      if (transition) {
        transition.call(this, done);
      }
    }

  };

  Animit.cssPropertyDict = (function() {
    var styles = window.getComputedStyle(document.documentElement, '');
    var dict = {};
    var a = 'A'.charCodeAt(0);
    var z = 'z'.charCodeAt(0);

    for (var key in styles) {
      if (styles.hasOwnProperty(key)) {
        var char = key.charCodeAt(0);
        if (a <= key.charCodeAt(0) && z >= key.charCodeAt(0)) {
          if (key !== 'cssText' && key !== 'parentText' && key !== 'length') {
            dict[key] = true;
          }
        }
      }
    }

    return dict;
  })();

  Animit.hasCssProperty = function(name) {
    return !!Animit.cssPropertyDict[name];
  };

  /**
   * Vendor prefix for css property.
   */
  Animit.prefix = (function() {
    var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('') 
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1];
    return pre;
  })();

  /**
   * @param {Animit} arguments
   */
  Animit.runAll = function(/* arguments... */) {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].play();
    }
  };


  /**
   * @param {Object} options
   * @param {Float} [options.duration]
   * @param {String} [options.property]
   * @param {String} [options.timing]
   */
  Animit.Transition = function(options) {
    this.options = options || {};
    this.options.duration = this.options.duration || 0;
    this.options.timing = this.options.timing || 'linear';
    this.options.css = this.options.css || {};
    this.options.property = this.options.property || 'all';
  };

  Animit.Transition.prototype = {

    /**
     * @param {HTMLElement} element
     * @return {Function}
     */
    build: function() {

      if (Object.keys(this.options.css).length === 0) {
        throw new Error('options.css is required.');
      }

      var css = createActualCssProps(this.options.css);

      if (this.options.duration > 0) {
        var transitionValue = util.buildTransitionValue(this.options);
        var self = this;

        return function(callback) {
          var elements = this.elements;
          var timeout = self.options.duration * 1000 * 1.4;

          var removeListeners = util.addOnTransitionEnd(elements[0], function() {
            clearTimeout(timeoutId);
            callback();
          });

          var timeoutId = setTimeout(function() {
            removeListeners();
            callback();
          }, timeout);

          elements.forEach(function(element, index) {
            element.style[Animit.prefix + 'Transition'] = transitionValue;
            element.style.transition = transitionValue;

            Object.keys(css).forEach(function(name) {
              element.style[name] = css[name];
            });
          });

        };
      }

      if (this.options.duration <= 0) {
        return function(callback) {
          var elements = this.elements;

          elements.forEach(function(element, index) {
            element.style[Animit.prefix + 'Transition'] = 'none';
            element.transition = 'none';

            Object.keys(css).forEach(function(name) {
              element.style[name] = css[name];
            });
          });

          if (elements.length) {
            elements[0].offsetHeight;
          }

          if (window.requestAnimationFrame) {
            requestAnimationFrame(callback);
          } else {
            setTimeout(callback, 1000 / 30);
          }
        };
      }

      function createActualCssProps(css) {
        var result = {};

        Object.keys(css).forEach(function(name) {
          var value = css[name];
          name = util.normalizeStyleName(name);
          var prefixed = Animit.prefix + util.capitalize(name);

          if (Animit.cssPropertyDict[name]) {
            result[name] = value;
          } else if (Animit.cssPropertyDict[prefixed]) {
            result[prefixed] = value;
          } else {
            result[prefixed] = value;
            result[name] = value;
          }
        });

        return result;
      }

    }
  };

  var util = {
    /**
     * Normalize style property name.
     */
    normalizeStyleName: function(name) {
      name = name.replace(/-[a-zA-Z]/g, function(all) {
        return all.slice(1).toUpperCase();
      });

      return name.charAt(0).toLowerCase() + name.slice(1);
    },

    // capitalize string
    capitalize : function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * @param {Object} params
     * @param {String} params.property
     * @param {Float} params.duration
     * @param {String} params.timing
     */
    buildTransitionValue: function(params) {
      params.property = params.property || 'all';
      params.duration = params.duration || 0.4;
      params.timing = params.timing || 'linear';

      var props = params.property.split(/ +/);

      return props.map(function(prop) {
        return prop + ' ' + params.duration + 's ' + params.timing;
      }).join(', ');
    },

    /**
     * Add an event handler on "transitionend" event.
     */
    addOnTransitionEnd: function(element, callback) {
      if (!element) {
        return function() {};
      }

      var fn = function(event) {
        if (element == event.target) {
          event.stopPropagation();
          removeListeners();

          callback();
        }
      };

      var removeListeners = function() {
        util._transitionEndEvents.forEach(function(eventName) {
          element.removeEventListener(eventName, fn);
        });
      };

      util._transitionEndEvents.forEach(function(eventName) {
        element.addEventListener(eventName, fn, false);
      });

      return removeListeners;
    },

    _transitionEndEvents: (function() {
      if (Animit.prefix === 'webkit' || Animit.prefix === 'o' || Animit.prefix === 'moz' || Animit.prefix === 'ms') {
        return [Animit.prefix + 'TransitionEnd', 'transitionend'];
      }

      return ['transitionend'];
    })()

  };

  return Animit;
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc object
 * @name ons.notification
 * @category dialog
 * @codepen Qwwxyp
 * @description 
 *   [en]Utility methods to create different kinds of alert dialogs. There are three methods available: alert, confirm and prompt.[/en]
 *   [ja]いくつかの種類のアラートダイアログを作成するためのユーティリティメソッドを収めたオブジェクトです。[/ja]
 * @example
 * <script>
 *   ons.notification.alert({
 *     message: 'Hello, world!'
 *   });
 *
 *   ons.notification.confirm({
 *     message: 'Are you ready?'
 *     callback: function(answer) {
 *       // Do something here.
 *     }
 *   });
 *
 *   ons.notification.prompt({
 *     message: 'How old are you?',
 *     callback: function(age) {
 *       ons.notification.alert({
 *         message: 'You are ' + age + ' years old.'
 *       });
 *     });
 *   });
 * </script>
 */

/**
 * @ngdoc method
 * @signature alert(options)
 * @param {Object} options
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.message]
 *   [en]Alert message.[/en]
 *   [ja]アラートダイアログに表示する文字列を指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Alert message in HTML.[/en]
 *   [ja]アラートダイアログに表示するHTMLを指定します。[/ja]
 * @param {String} [options.buttonLabel]
 *   [en]Label for confirmation button. Default is "OK".[/en]
 *   [ja]確認ボタンのラベルを指定します。"OK"がデフォルトです。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アラートダイアログを表示する際のアニメーション名を指定します。"none", "fade", "slide"のいずれかを指定できます。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is "Alert".[/en]
 *   [ja]アラートダイアログの上部に表示するタイトルを指定します。"Alert"がデフォルトです。[/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier for the dialog.[/en]
 *   [ja]アラートダイアログのmodifier属性の値を指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]Function that executes after dialog has been closed.[/en]
 *   [ja]アラートダイアログが閉じられた時に呼び出される関数オブジェクトを指定します。[/ja]
 * @description 
 *   [en]
 *     Display an alert dialog to show the user a message.
 *     The content of the message can be either simple text or HTML.
 *     Must specify either message or messageHTML.
 *   [/en]
 *   [ja]
 *     ユーザーへメッセージを見せるためのアラートダイアログを表示します。
 *     表示するメッセージは、テキストかもしくはHTMLを指定できます。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */

/**
 * @ngdoc method
 * @signature confirm(options)
 * @param {Object} options
 *   [en]Parameter object.[/en]
 * @param {String} [options.message]
 *   [en]Confirmation question.[/en]
 *   [ja]確認ダイアログに表示するメッセージを指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Dialog content in HTML.[/en]
 *   [ja]確認ダイアログに表示するHTMLを指定します。[/ja]
 * @param {Array} [options.buttonLabels]
 *   [en]Labels for the buttons. Default is ["Cancel", "OK"].[/en]
 *   [ja]ボタンのラベルの配列を指定します。["Cancel", "OK"]がデフォルトです。[/ja]
 * @param {Number} [options.primaryButtonIndex]
 *   [en]Index of primary button. Default is 1.[/en]
 *   [ja]プライマリボタンのインデックスを指定します。デフォルトは 1 です。[/ja]
 * @param {Boolean} [options.cancelable]
 *   [en]Whether the dialog is cancelable or not. Default is false.[/en]
 *   [ja]ダイアログがキャンセル可能かどうかを指定します。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is "Confirm".[/en]
 *   [ja]ダイアログのタイトルを指定します。"Confirm"がデフォルトです。[/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier for the dialog.[/en]
 *   [ja]ダイアログのmodifier属性の値を指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]
 *     Function that executes after the dialog has been closed.
 *     Argument for the function is the index of the button that was pressed or -1 if the dialog was canceled.
 *   [/en]
 *   [ja]
 *     ダイアログが閉じられた後に呼び出される関数オブジェクトを指定します。
 *     この関数の引数として、押されたボタンのインデックス値が渡されます。
 *     もしダイアログがキャンセルされた場合には-1が渡されます。
 *   [/ja]
 * @description 
 *   [en]
 *     Display a dialog to ask the user for confirmation.
 *     The default button labels are "Cancel" and "OK" but they can be customized.
 *     Must specify either message or messageHTML.
 *   [/en]
 *   [ja]
 *     ユーザに確認を促すダイアログを表示します。
 *     デオルとのボタンラベルは、"Cancel"と"OK"ですが、これはこのメソッドの引数でカスタマイズできます。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */

/**
 * @ngdoc method
 * @signature prompt(options)
 * @param {Object} options
 *   [en]Parameter object.[/en]
 *   [ja]オプションを指定するオブジェクトです。[/ja]
 * @param {String} [options.message]
 *   [en]Prompt question.[/en]
 *   [ja]ダイアログに表示するメッセージを指定します。[/ja]
 * @param {String} [options.messageHTML]
 *   [en]Dialog content in HTML.[/en]
 *   [ja]ダイアログに表示するHTMLを指定します。[/ja]
 * @param {String} [options.buttonLabel]
 *   [en]Label for confirmation button. Default is "OK".[/en]
 *   [ja]確認ボタンのラベルを指定します。"OK"がデフォルトです。[/ja]
 * @param {Number} [options.primaryButtonIndex]
 *   [en]Index of primary button. Default is 1.[/en]
 *   [ja]プライマリボタンのインデックスを指定します。デフォルトは 1 です。[/ja]
 * @param {Boolean} [options.cancelable]
 *   [en]Whether the dialog is cancelable or not. Default is false.[/en]
 *   [ja]ダイアログがキャンセル可能かどうかを指定します。デフォルトは false です。[/ja]
 * @param {String} [options.animation]
 *   [en]Animation name. Available animations are "none", "fade" and "slide".[/en]
 *   [ja]アニメーション名を指定します。"none", "fade", "slide"のいずれかを指定します。[/ja]
 * @param {String} [options.title]
 *   [en]Dialog title. Default is "Alert".[/en]
 *   [ja]ダイアログのタイトルを指定します。デフォルトは "Alert" です。[/ja]
 * @param {String} [options.modifier]
 *   [en]Modifier for the dialog.[/en]
 *   [ja]ダイアログのmodifier属性の値を指定します。[/ja]
 * @param {Function} [options.callback]
 *   [en]
 *     Function that executes after the dialog has been closed.
 *     Argument for the function is the value of the input field or null if the dialog was canceled.
 *   [/en]
 *   [ja]
 *     ダイアログが閉じられた後に実行される関数オブジェクトを指定します。
 *     関数の引数として、インプット要素の中の値が渡されます。ダイアログがキャンセルされた場合には、nullが渡されます。
 *   [/ja]
 * @description 
 *   [en]
 *     Display a dialog with a prompt to ask the user a question. 
 *     Must specify either message or messageHTML.
 *   [/en]
 *   [ja]
 *     ユーザーに入力を促すダイアログを表示します。
 *     このメソッドの引数には、options.messageもしくはoptions.messageHTMLのどちらかを必ず指定する必要があります。
 *   [/ja]
 */

window.ons.notification = (function() {
  var createAlertDialog = function(title, message, buttonLabels, primaryButtonIndex, modifier, animation, callback, messageIsHTML, cancelable, promptDialog, autofocus, placeholder) {
    var dialogEl = angular.element('<ons-alert-dialog>'),
      titleEl = angular.element('<div>').addClass('alert-dialog-title').text(title),
      messageEl = angular.element('<div>').addClass('alert-dialog-content'),
      footerEl = angular.element('<div>').addClass('alert-dialog-footer'),
      inputEl;

    if (modifier) {
      dialogEl.attr('modifier', modifier);
    }

    dialogEl.attr('animation', animation);

    if (messageIsHTML) {
      messageEl.html(message);
    } else {
      messageEl.text(message);
    }

    dialogEl.append(titleEl).append(messageEl);

    if (promptDialog) {
      inputEl = angular.element('<input>')
        .addClass('text-input')
        .attr('placeholder', placeholder)
        .css({width: '100%', marginTop: '10px'});
      messageEl.append(inputEl);
    }

    dialogEl.append(footerEl);

    angular.element(document.body).append(dialogEl);
    ons.compile(dialogEl[0]);
    var alertDialog = dialogEl.data('ons-alert-dialog');

    if (buttonLabels.length <= 2) {
      footerEl.addClass('alert-dialog-footer--one');
    }

    var createButton = function(i) {
      var buttonEl = angular.element('<button>').addClass('alert-dialog-button').text(buttonLabels[i]);

      if (i == primaryButtonIndex) {
        buttonEl.addClass('alert-dialog-button--primal');
      }

      if (buttonLabels.length <= 2) {
        buttonEl.addClass('alert-dialog-button--one');
      }

      buttonEl.on('click', function() {
        buttonEl.off('click');

        alertDialog.hide({
          callback: function() {
            if (promptDialog) {
              callback(inputEl.val());
            } else {
              callback(i);
            }
            alertDialog.destroy();
            alertDialog = inputEl = buttonEl = null;
          }
        });
      });
      footerEl.append(buttonEl);
    };

    for (var i = 0; i < buttonLabels.length; i++) {
      createButton(i);
    }

    if (cancelable) {
      alertDialog.setCancelable(cancelable);
      alertDialog.on('cancel', function() {
        if(promptDialog) {
          callback(null);
        } else {
          callback(-1);
        }
        setTimeout(function() {
          alertDialog.destroy();
          alertDialog = null;
          inputEl = null;
        });
      });
    }

    alertDialog.show({
      callback: function() {
        if(promptDialog && autofocus) {
          inputEl[0].focus();
        }
      }
    });

    dialogEl = titleEl = messageEl = footerEl = null; 
  };

  return {
    /**
     * @param {Object} options
     * @param {String} [options.message]
     * @param {String} [options.messageHTML]
     * @param {String} [options.buttonLabel]
     * @param {String} [options.animation]
     * @param {String} [options.title]
     * @param {String} [options.modifier]
     * @param {Function} [options.callback]
     */
    alert: function(options) {
      var defaults = {
        buttonLabel: 'OK',
        animation: 'default',
        title: 'Alert',
        callback: function() {}
      };

      options = angular.extend({}, defaults, options);
      if (!options.message && !options.messageHTML) {
        throw new Error('Alert dialog must contain a message.');
      }
      createAlertDialog(
        options.title, 
        options.message || options.messageHTML, 
        [options.buttonLabel], 
        0,
        options.modifier,
        options.animation,
        options.callback,
        !options.message ? true : false,
        false, false, false
      );
    },

    /**
     * @param {Object} options
     * @param {String} [options.message]
     * @param {String} [options.messageHTML]
     * @param {Array} [options.buttonLabels]
     * @param {Number} [options.primaryButtonIndex]
     * @param {Boolean} [options.cancelable]
     * @param {String} [options.animation]
     * @param {String} [options.title]
     * @param {String} [options.modifier]
     * @param {Function} [options.callback]
     */
    confirm: function(options) {
      var defaults = {
        buttonLabels: ['Cancel', 'OK'],
        primaryButtonIndex: 1,
        animation: 'default',
        title: 'Confirm',
        callback: function() {},
        cancelable: false
      };

      options = angular.extend({}, defaults, options);
      if (!options.message && !options.messageHTML) {
        throw new Error('Confirm dialog must contain a message.');
      }

      createAlertDialog(
        options.title,
        options.message || options.messageHTML,
        options.buttonLabels,
        options.primaryButtonIndex,
        options.modifier,
        options.animation,
        options.callback,
        !options.message ? true : false,
        options.cancelable,
        false, false
      );
    },

    /**
     * @param {Object} options
     * @param {String} [options.message]
     * @param {String} [options.messageHTML]
     * @param {String} [options.buttonLabel]
     * @param {Boolean} [options.cancelable]
     * @param {String} [options.animation]
     * @param {String} [options.placeholder]
     * @param {String} [options.title]
     * @param {String} [options.modifier]
     * @param {Function} [options.callback]
     * @param {Boolean} [options.autofocus]
     */
    prompt: function(options) {
      var defaults = {
        buttonLabel: 'OK',
        animation: 'default',
        title: 'Alert',
        placeholder: '',
        callback: function() {},
        cancelable: false,
        autofocus: true,
      };

      options = angular.extend({}, defaults, options);
      if (!options.message && !options.messageHTML) {
        throw new Error('Prompt dialog must contain a message.');
      }

      createAlertDialog(
        options.title,
        options.message || options.messageHTML,
        [options.buttonLabel],
        0,
        options.modifier,
        options.animation,
        options.callback,
        !options.message ? true : false,
        options.cancelable,
        true,
        options.autofocus,
        options.placeholder
      );
    }
  };
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc object
 * @name ons.orientation
 * @category util
 * @description 
 *   [en]Utility methods for orientation detection.[/en]
 *   [ja]画面のオリエンテーション検知のためのユーティリティメソッドを収めているオブジェクトです。[/ja]
 */

/**
 * @ngdoc event
 * @name change
 * @description
 *   [en]Fired when the device orientation changes.[/en]
 *   [ja]デバイスのオリエンテーションが変化した際に発火します。[/ja]
 * @param {Object} event
 *   [en]Event object.[/en]
 *   [ja]イベントオブジェクトです。[/ja]
 * @param {Boolean} event.isPortrait
 *   [en]Will be true if the current orientation is portrait mode.[/en]
 *   [ja]現在のオリエンテーションがportraitの場合にtrueを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isPortrait()
 * @return {Boolean}
 *   [en]Will be true if the current orientation is portrait mode.[/en]
 *   [ja]オリエンテーションがportraitモードの場合にtrueになります。[/ja]
 * @description 
 *   [en]Returns whether the current screen orientation is portrait or not.[/en]
 *   [ja]オリエンテーションがportraitモードかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature isLandscape()
 * @return {Boolean}
 *   [en]Will be true if the current orientation is landscape mode.[/en]
 *   [ja]オリエンテーションがlandscapeモードの場合にtrueになります。[/ja]
 * @description 
 *   [en]Returns whether the current screen orientation is landscape or not.[/en]
 *   [ja]オリエンテーションがlandscapeモードかどうかを返します。[/ja]
 */

/**
 * @ngdoc method
 * @signature on(eventName, listener)
 * @description
 *   [en]Add an event listener.[/en]
 *   [ja]イベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]このイベントが発火された際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature once(eventName, listener)
 * @description
 *  [en]Add an event listener that's only triggered once.[/en]
 *  [ja]一度だけ呼び出されるイベントリスナーを追加します。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]イベントが発火した際に呼び出される関数オブジェクトを指定します。[/ja]
 */

/**
 * @ngdoc method
 * @signature off(eventName, [listener])
 * @description
 *  [en]Remove an event listener. If the listener is not specified all listeners for the event type will be removed.[/en]
 *  [ja]イベントリスナーを削除します。もしイベントリスナーを指定しなかった場合には、そのイベントに紐づく全てのイベントリスナーが削除されます。[/ja]
 * @param {String} eventName
 *   [en]Name of the event.[/en]
 *   [ja]イベント名を指定します。[/ja]
 * @param {Function} listener
 *   [en]Function to execute when the event is triggered.[/en]
 *   [ja]削除するイベントリスナーを指定します。[/ja]
 */

window.ons.orientation = (function() {
  return create()._init();

  function create() {
    var obj = {
      // actual implementation to detect if whether current screen is portrait or not
      _isPortrait: false,

      /**
       * @return {Boolean}
       */
      isPortrait: function() {
        return this._isPortrait();
      },

      /**
       * @return {Boolean}
       */
      isLandscape: function() {
        return !this.isPortrait();
      },

      _init: function() {
        document.addEventListener('DOMContentLoaded', this._onDOMContentLoaded.bind(this), false);

        if ('orientation' in window) {
          window.addEventListener('orientationchange', this._onOrientationChange.bind(this), false);
        } else {
          window.addEventListener('resize', this._onResize.bind(this), false);
        }

        this._isPortrait = function() {
          return window.innerHeight > window.innerWidth;
        };

        return this;
      },

      _onDOMContentLoaded: function() {
        this._installIsPortraitImplementation();
        this.emit('change', {isPortrait: this.isPortrait()});
      },

      _installIsPortraitImplementation: function() {
        var isPortrait = window.innerWidth < window.innerHeight;

        if (!('orientation' in window)) {
          this._isPortrait = function() {
            return window.innerHeight > window.innerWidth;
          };
        } else if (window.orientation % 180 === 0) {
          this._isPortrait = function() {
            return Math.abs(window.orientation % 180) === 0 ? isPortrait : !isPortrait;
          };
        } else {
          this._isPortrait = function() {
            return Math.abs(window.orientation % 180) === 90 ? isPortrait : !isPortrait;
          };
        }
      },

      _onOrientationChange: function() {
        var isPortrait = this._isPortrait();

        // Wait for the dimensions to change because
        // of Android inconsistency.
        var nIter = 0;
        var interval = setInterval(function() {
          nIter++;

          var w = window.innerWidth,
            h = window.innerHeight;

          if ((isPortrait && w <= h) ||
             (!isPortrait && w >= h)) {
            this.emit('change', {isPortrait: isPortrait});
            clearInterval(interval);
          }
          else if (nIter === 50) {
            this.emit('change', {isPortrait: isPortrait});
            clearInterval(interval);
          }
        }.bind(this), 20);
      },

      // Run on not mobile browser.
      _onResize: function() {
        this.emit('change', {isPortrait: this.isPortrait()});
      }
    };

    MicroEvent.mixin(obj);

    return obj;
  }
})();


/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

/**
 * @ngdoc object
 * @name ons.platform
 * @category util
 * @description 
 *   [en]Utility methods to detect current platform.[/en]
 *   [ja]現在実行されているプラットフォームを検知するためのユーティリティメソッドを収めたオブジェクトです。[/ja]
 */

/**
 * @ngdoc method
 * @signature isWebView()
 * @description 
 *   [en]Returns whether app is running in Cordova.[/en]
 *   [ja]Cordova内で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIOS()
 * @description 
 *   [en]Returns whether the OS is iOS.[/en]
 *   [ja]iOS上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isAndroid()
 * @description 
 *   [en]Returns whether the OS is Android.[/en]
 *   [ja]Android上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIPhone()
 * @description 
 *   [en]Returns whether the device is iPhone.[/en]
 *   [ja]iPhone上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIPad()
 * @description 
 *   [en]Returns whether the device is iPad.[/en]
 *   [ja]iPad上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isBlackBerry()
 * @description 
 *   [en]Returns whether the device is BlackBerry.[/en]
 *   [ja]BlackBerry上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isOpera()
 * @description 
 *   [en]Returns whether the browser is Opera.[/en]
 *   [ja]Opera上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isFirefox()
 * @description 
 *   [en]Returns whether the browser is Firefox.[/en]
 *   [ja]Firefox上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isSafari()
 * @description 
 *   [en]Returns whether the browser is Safari.[/en]
 *   [ja]Safari上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isChrome()
 * @description 
 *   [en]Returns whether the browser is Chrome.[/en]
 *   [ja]Chrome上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIE()
 * @description 
 *   [en]Returns whether the browser is Internet Explorer.[/en]
 *   [ja]Internet Explorer上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

/**
 * @ngdoc method
 * @signature isIOS7above()
 * @description 
 *   [en]Returns whether the iOS version is 7 or above.[/en]
 *   [ja]iOS7以上で実行されているかどうかを返します。[/ja]
 * @return {Boolean}
 */

(function() {
  'use strict';
  window.ons.platform = {
    /**
    * @return {Boolean}
    */
    isWebView: function() {
      return ons.isWebView();
    },
    /**
    * @return {Boolean}
    */
    isIOS: function() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    /**
    * @return {Boolean}
    */
    isAndroid: function() {
      return /Android/i.test(navigator.userAgent);
    },
    /**
    * @return {Boolean}
    */
    isIPhone: function() {
      return /iPhone/i.test(navigator.userAgent);
    },
    /**
    * @return {Boolean}
    */
    isIPad: function() {
      return /iPad/i.test(navigator.userAgent);
    },
    /**
    * @return {Boolean}
    */
    isBlackBerry: function() {
      return /BlackBerry|RIM Tablet OS|BB10/i.test(navigator.userAgent);
    },
    /**
    * @return {Boolean}
    */
    isOpera: function() {
      return (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0);
    },
    /**
    * @return {Boolean}
    */
    isFirefox: function() {
      return (typeof InstallTrigger !== 'undefined');
    },
    /**
    * @return {Boolean}
    */
    isSafari: function() {
      return (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0);
    },
    /**
    * @return {Boolean}
    */
    isChrome: function() {
      return (!!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0));
    },
    /**
    * @return {Boolean}
    */
    isIE: function() {
      return false || !!document.documentMode;
    },
    /**
    * @return {Boolean}
    */
    isIOS7above: function() {
      if(/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        var ver = (navigator.userAgent.match(/\b[0-9]+_[0-9]+(?:_[0-9]+)?\b/)||[''])[0].replace(/_/g,'.');
        return (parseInt(ver.split('.')[0]) >= 7);
      }
      return false;
    }
  };
})();


(function() {
  'use strict';

  // fastclick
  window.addEventListener('load', function() {
    FastClick.attach(document.body);
  }, false);

  // viewport.js
  new Viewport().setup();

  // modernize
  Modernizr.testStyles('#modernizr { -webkit-overflow-scrolling:touch }', function(elem, rule) {
    Modernizr.addTest(
      'overflowtouch',
      window.getComputedStyle && window.getComputedStyle(elem).getPropertyValue('-webkit-overflow-scrolling') == 'touch');
  });

  // confirm to use jqLite
  if (window.jQuery && angular.element === window.jQuery) {
    console.warn('Onsen UI require jqLite. Load jQuery after loading AngularJS to fix this error. jQuery may break Onsen UI behavior.');
  }
})();

/*
Copyright 2013-2015 ASIAL CORPORATION

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

(function(){
  'use strict';

  angular.module('onsen').run(['$templateCache', function($templateCache) {
    var templates = window.document.querySelectorAll('script[type="text/ons-template"]');

    for (var i = 0; i < templates.length; i++) {
      var template = angular.element(templates[i]);
      var id = template.attr('id');
      if (typeof id === 'string') {
        $templateCache.put(id, template.text());
      }
    }
  }]);

})();
