/**
 * FTScroller: touch and mouse-based scrolling for DOM elements larger than their containers.
 *
 * While this is a rewrite, it is heavily inspired by two projects:
 * 1) Uxebu TouchScroll (https://github.com/davidaurelio/TouchScroll), BSD licensed:
 *    Copyright (c) 2010 uxebu Consulting Ltd. & Co. KG
 *    Copyright (c) 2010 David Aurelio
 * 2) Zynga Scroller (https://github.com/zynga/scroller), MIT licensed:
 *    Copyright 2011, Zynga Inc.
 *    Copyright 2011, Deutsche Telekom AG
 *
 * Includes CubicBezier:
 *
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 * Copyright (C) 2010 David Aurelio. All Rights Reserved.
 * Copyright (C) 2010 uxebu Consulting Ltd. & Co. KG. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC., DAVID AURELIO, AND UXEBU
 * CONSULTING LTD. & CO. KG ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL APPLE INC. OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 * @copyright The Financial Times Ltd [All rights reserved]
 * @codingstandard ftlabs-jslint
 * @version 0.5.1
 */
/**
 * @license FTScroller is (c) 2012 The Financial Times Ltd [All rights reserved] and licensed under the MIT license.
 *
 * Inspired by Uxebu TouchScroll, (c) 2010 uxebu Consulting Ltd. & Co. KG and David Aurelio, which is BSD licensed (https://github.com/davidaurelio/TouchScroll)
 * Inspired by Zynga Scroller, (c) 2011 Zynga Inc and Deutsche Telekom AG, which is MIT licensed (https://github.com/zynga/scroller)
 * Includes CubicBezier, (c) 2008 Apple Inc [All rights reserved], (c) 2010 David Aurelio and uxebu Consulting Ltd. & Co. KG. [All rights reserved], which is 2-clause BSD licensed (see above or https://github.com/davidaurelio/TouchScroll).
 */

/*jslint nomen: true, vars: true, browser: true, continue: true, white: true*/
/*globals FTScrollerOptions*/

var FTScroller, CubicBezier;

(function () {
	'use strict';

	// Determine the browser engine and prefix, trying to use the unprefixed version where available.
	var _vendorCSSPrefix, _vendorStylePropertyPrefix, _vendorTransformLookup,
		_pointerEventsPrefixed, _setPointerCapture, _releasePointerCapture, _lostPointerCapture, _trackPointerEvents, _pointerTypeTouch;
	if (document.createElement('div').style.transform !== undefined) {
		_vendorCSSPrefix = '';
		_vendorStylePropertyPrefix = '';
		_vendorTransformLookup = 'transform';
	} else if (window.opera && Object.prototype.toString.call(window.opera) === '[object Opera]') {
		_vendorCSSPrefix = '-o-';
		_vendorStylePropertyPrefix = 'O';
		_vendorTransformLookup = 'OTransform';
	} else if (document.documentElement.style.MozTransform !== undefined) {
		_vendorCSSPrefix = '-moz-';
		_vendorStylePropertyPrefix = 'Moz';
		_vendorTransformLookup = 'MozTransform';
	} else if (document.documentElement.style.webkitTransform !== undefined) {
		_vendorCSSPrefix = '-webkit-';
		_vendorStylePropertyPrefix = 'webkit';
		_vendorTransformLookup = '-webkit-transform';
	} else if (typeof navigator.cpuClass === 'string') {
		_vendorCSSPrefix = '-ms-';
		_vendorStylePropertyPrefix = 'ms';
		_vendorTransformLookup = '-ms-transform';
	}

	// Pointer Events are unprefixed in IE11
	if ('pointerEnabled' in window.navigator) {
		_pointerEventsPrefixed = false;
		_trackPointerEvents    = window.navigator.pointerEnabled;
		_setPointerCapture     = 'setPointerCapture';
		_releasePointerCapture = 'releasePointerCapture';
		_lostPointerCapture    = 'lostpointercapture';
		_pointerTypeTouch      = 'touch';
	} else if ('msPointerEnabled' in window.navigator) {
		_pointerEventsPrefixed = true;
		_trackPointerEvents    = window.navigator.msPointerEnabled;
		_setPointerCapture     = 'msSetPointerCapture';
		_releasePointerCapture = 'msReleasePointerCapture';
		_lostPointerCapture    = 'MSLostPointerCapture';
		_pointerTypeTouch      = 2; // PointerEvent.MSPOINTER_TYPE_TOUCH = 2 in IE10
	}

	// Global flag to determine if any scroll is currently active.  This prevents
	// issues when using multiple scrollers, particularly when they're nested.
	var _ftscrollerMoving = false;

	// Determine whether pointer events or touch events can be used
	var _trackTouchEvents = !_trackPointerEvents;

	// Determine whether to use modern hardware acceleration rules or dynamic/toggleable rules.
	// Certain older browsers - particularly Android browsers - have problems with hardware
	// acceleration, so being able to toggle the behaviour dynamically via a CSS cascade is desirable.
	var _useToggleableHardwareAcceleration = false;
	if ('hasOwnProperty' in window) {
		_useToggleableHardwareAcceleration = !window.hasOwnProperty('ArrayBuffer');
	}

	// Feature detection
	var _canClearSelection = (window.Selection && window.Selection.prototype.removeAllRanges);

	// If hardware acceleration is using the standard path, but perspective doesn't seem to be supported,
	// 3D transforms likely aren't supported either
	if (!_useToggleableHardwareAcceleration && document.createElement('div').style[_vendorStylePropertyPrefix + (_vendorStylePropertyPrefix ? 'P' : 'p') + 'erspective'] === undefined) {
		_useToggleableHardwareAcceleration = true;
	}

	// Style prefixes
	var _transformProperty = _vendorStylePropertyPrefix + (_vendorStylePropertyPrefix ? 'T' : 't') + 'ransform';
	var _transitionProperty = _vendorStylePropertyPrefix + (_vendorStylePropertyPrefix ? 'T' : 't') + 'ransition';
	var _translateRulePrefix = _useToggleableHardwareAcceleration ? 'translate(' : 'translate3d(';
	var _transformPrefixes = { x: '', y: '0,' };
	var _transformSuffixes = { x: ',0' + (_useToggleableHardwareAcceleration ? ')' : ',0)'), y: (_useToggleableHardwareAcceleration ? ')' : ',0)') };

	// Constants.  Note that the bezier curve should be changed along with the friction!
	var _kFriction = 0.998;
	var _kMinimumSpeed = 0.01;

	// Create a global stylesheet to set up stylesheet rules and track dynamic entries
	(function () {
		var stylesheetContainerNode = document.getElementsByTagName('head')[0] || document.documentElement;
		var newStyleNode = document.createElement('style');
		var hardwareAccelerationRule;
		var _styleText;
		newStyleNode.type = 'text/css';

		// Determine the hardware acceleration logic to use
		if (_useToggleableHardwareAcceleration) {
			hardwareAccelerationRule = _vendorCSSPrefix + 'transform-style: preserve-3d;';
		} else {
			hardwareAccelerationRule = _vendorCSSPrefix + 'transform: translateZ(0);';
		}

		// Add our rules
		_styleText = [
			'.ftscroller_container { overflow: hidden; position: relative; max-height: 100%; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -ms-touch-action: none }',
			'.ftscroller_hwaccelerated { ' + hardwareAccelerationRule  + ' }',
			'.ftscroller_x, .ftscroller_y { position: relative; min-width: 100%; min-height: 100%; overflow: hidden }',
			'.ftscroller_x { display: inline-block }',
			'.ftscroller_scrollbar { pointer-events: none; position: absolute; width: 5px; height: 5px; border: 1px solid rgba(255, 255, 255, 0.3); -webkit-border-radius: 3px; border-radius: 6px; opacity: 0; ' + _vendorCSSPrefix + 'transition: opacity 350ms; z-index: 10; -webkit-box-sizing: content-box; -moz-box-sizing: content-box; box-sizing: content-box }',
			'.ftscroller_scrollbarx { bottom: 2px; left: 2px }',
			'.ftscroller_scrollbary { right: 2px; top: 2px }',
			'.ftscroller_scrollbarinner { height: 100%; background: #000; -webkit-border-radius: 2px; border-radius: 4px / 6px }',
			'.ftscroller_scrollbar.active { opacity: 0.5; ' + _vendorCSSPrefix + 'transition: none; -o-transition: all 0 none }'
		];

		if (newStyleNode.styleSheet) {
			newStyleNode.styleSheet.cssText = _styleText.join('\n');
		} else {
			newStyleNode.appendChild(document.createTextNode(_styleText.join('\n')));
		}

		// Add the stylesheet
		stylesheetContainerNode.insertBefore(newStyleNode, stylesheetContainerNode.firstChild);
	}());

	/**
	 * Master constructor for the scrolling function, including which element to
	 * construct the scroller in, and any scrolling options.
	 * Note that app-wide options can also be set using a global FTScrollerOptions
	 * object.
	 */
	FTScroller = function (domNode, options) {
		var key;
		var destroy, setSnapSize, scrollTo, scrollBy, updateDimensions, addEventListener, removeEventListener, setDisabledInputMethods, _startScroll, _updateScroll, _endScroll, _finalizeScroll, _interruptScroll, _flingScroll, _snapScroll, _getSnapPositionForIndexes, _getSnapIndexForPosition, _constrainAndRenderTargetScrollPosition, _limitToBounds, _initializeDOM, _existingDOMValid, _domChanged, _updateDimensions, _updateScrollbarDimensions, _updateElementPosition, _updateSegments, _setAxisPosition, _getPosition, _scheduleAxisPosition, _fireEvent, _childFocused, _modifyDistanceBeyondBounds, _distancesBeyondBounds, _startAnimation, _scheduleRender, _cancelAnimation, _addEventHandlers, _removeEventHandlers, _resetEventHandlers, _onTouchStart, _onTouchMove, _onTouchEnd, _onMouseDown, _onMouseMove, _onMouseUp, _onPointerDown, _onPointerMove, _onPointerUp, _onPointerCancel, _onPointerCaptureEnd, _onClick, _onMouseScroll, _captureInput, _releaseInputCapture, _getBoundingRect;


		/* Note that actual object instantiation occurs at the end of the closure to avoid jslint errors */


		/*                         Options                       */

		var _instanceOptions = {

			// Whether to display scrollbars as appropriate
			scrollbars: true,

			// Enable scrolling on the X axis if content is available
			scrollingX: true,

			// Enable scrolling on the Y axis if content is available
			scrollingY: true,

			// The initial movement required to trigger a scroll, in pixels; this is the point at which
			// the scroll is exclusive to this particular FTScroller instance.
			scrollBoundary: 1,

			// The initial movement required to trigger a visual indication that scrolling is occurring,
			// in pixels.  This is enforced to be less than or equal to the scrollBoundary, and is used to
			// define when the scroller starts drawing changes in response to an input, even if the scroll
			// is not treated as having begun/locked yet.
			scrollResponseBoundary: 1,

			// Whether to always enable scrolling, even if the content of the scroller does not
			// require the scroller to function.  This makes the scroller behave more like an
			// element set to "overflow: scroll", with bouncing always occurring if enabled.
			alwaysScroll: false,

			// The content width to use when determining scroller dimensions.  If this
			// is false, the width will be detected based on the actual content.
			contentWidth: undefined,

			// The content height to use when determining scroller dimensions.  If this
			// is false, the height will be detected based on the actual content.
			contentHeight: undefined,

			// Enable snapping of content to 'pages' or a pixel grid
			snapping: false,

			// Define the horizontal interval of the pixel grid; snapping must be enabled for this to
			// take effect.  If this is not defined, snapping will use intervals based on container size.
			snapSizeX: undefined,

			// Define the vertical interval of the pixel grid; snapping must be enabled for this to
			// take effect.  If this is not defined, snapping will use intervals based on container size.
			snapSizeY: undefined,

			// Control whether snapping should be curtailed to only ever flick to the next page
			// and not beyond.  Snapping needs to be enabled for this to take effect.
			singlePageScrolls: false,

			// Allow scroll bouncing and elasticity near the ends and grid
			bouncing: true,

			// Allow a fast scroll to continue with momentum when released
			flinging: true,

			// Automatically detects changes to the contained markup and
			// updates its dimensions whenever the content changes. This is
			// set to false if a contentWidth or contentHeight are supplied.
			updateOnChanges: true,

			// Automatically catches changes to the window size and updates
			// its dimensions.
			updateOnWindowResize: false,

			// The alignment to use if the content is smaller than the container;
			// this also applies to initial positioning of scrollable content.
			// Valid alignments are -1 (top or left), 0 (center), and 1 (bottom or right).
			baseAlignments: { x: -1, y: -1 },

			// Whether to use a window scroll flag, eg window.foo, to control whether
			// to allow scrolling to start or now.  If the window flag is set to true,
			// this element will not start scrolling; this element will also toggle
			// the variable while scrolling
			windowScrollingActiveFlag: undefined,

			// Instead of always using translate3d for transforms, a mix of translate3d
			// and translate with a hardware acceleration class used to trigger acceleration
			// is used; this is to allow CSS inheritance to be used to allow dynamic
			// disabling of backing layers on older platforms.
			hwAccelerationClass: 'ftscroller_hwaccelerated',

			// While use of requestAnimationFrame is highly recommended on platforms
			// which support it, it can result in the animation being a further half-frame
			// behind the input method, increasing perceived lag slightly.  To disable this,
			// set this property to false.
			enableRequestAnimationFrameSupport: true,

			// Set the maximum time (ms) that a fling can take to complete; if
			// this is not set, flings will complete instantly
			maxFlingDuration: 1000,

			// Whether to disable any input methods; on some multi-input devices
			// custom behaviour may be desired for some scrollers.  Use with care!
			disabledInputMethods: {
				mouse: false,
				touch: false,
				scroll: false,
				pointer: false,
				focus: false
			},

			// Define a scrolling class to be added to the scroller container
			// when scrolling is active.  Note that this can cause a relayout on
			// scroll start if defined, but allows custom styling in response to scrolls
			scrollingClassName: undefined,

			// Bezier curves defining the feel of the fling (momentum) deceleration,
			// the bounce decleration deceleration (as a fling exceeds the bounds),
			// and the bounce bezier (used for bouncing back).
			flingBezier: new CubicBezier(0.103, 0.389, 0.307, 0.966),
			bounceDecelerationBezier: new CubicBezier(0, 0.5, 0.5, 1),
			bounceBezier: new CubicBezier(0.7, 0, 0.9, 0.6)
		};


		/*                     Local variables                   */

		// Cache the DOM node and set up variables for other nodes
		var _publicSelf;
		var _self = this;
		var _scrollableMasterNode = domNode;
		var _containerNode;
		var _contentParentNode;
		var _scrollNodes = { x: null, y: null };
		var _scrollbarNodes = { x: null, y: null };

		// Dimensions of the container element and the content element
		var _metrics = {
			container: { x: null, y: null },
			content: { x: null, y: null, rawX: null, rawY: null },
			scrollEnd: { x: null, y: null }
		};

		// Snapping details
		var _snapGridSize = {
			x: false,
			y: false,
			userX: false,
			userY: false
		};
		var _snapIndex = {
			x: 0,
			y: 0
		};
		var _baseSegment = { x: 0, y: 0 };
		var _activeSegment = { x: 0, y: 0 };

		// Track the identifier of any input being tracked
		var _inputIdentifier = false;
		var _inputIndex = 0;
		var _inputCaptured = false;

		// Current scroll positions and tracking
		var _isScrolling = false;
		var _isDisplayingScroll = false;
		var _isAnimating = false;
		var _baseScrollPosition = { x: 0, y: 0 };
		var _lastScrollPosition = { x: 0, y: 0 };
		var _targetScrollPosition = { x: 0, y: 0 };
		var _scrollAtExtremity = { x: null, y: null };
		var _preventClick = false;
		var _timeouts = [];
		var _hasBeenScrolled = false;

		// Gesture details
		var _baseScrollableAxes = {};
		var _scrollableAxes = { x: true, y: true };
		var _gestureStart = { x: 0, y: 0, t: 0 };
		var _cumulativeScroll = { x: 0, y: 0 };
		var _eventHistory = [];

		// Allow certain events to be debounced
		var _domChangeDebouncer = false;
		var _scrollWheelEndDebouncer = false;

		// Performance switches on browsers supporting requestAnimationFrame
		var _animationFrameRequest = false;
		var _reqAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || false;
		var _cancelAnimationFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame || false;

		// Event listeners
		var _eventListeners = {
			'scrollstart': [],
			'scroll': [],
			'scrollend': [],
			'segmentwillchange': [],
			'segmentdidchange': [],
			'reachedstart': [],
			'reachedend': [],
			'scrollinteractionend': []
		};

		// MutationObserver instance, when supported and if DOM change sniffing is enabled
		var _mutationObserver;


		/* Parsing supplied options */

		// Override default instance options with global - or closure'd - options
		if (typeof FTScrollerOptions === 'object' && FTScrollerOptions) {
			for (key in FTScrollerOptions) {
				if (FTScrollerOptions.hasOwnProperty(key) && _instanceOptions.hasOwnProperty(key)) {
					_instanceOptions[key] = FTScrollerOptions[key];
				}
			}
		}

		// Override default and global options with supplied options
		if (options) {
			for (key in options) {
				if (options.hasOwnProperty(key)) {

					// If a deprecated flag was passed in, warn, and convert to the new flag name
					if ('paginatedSnap' === key) {
						console.warn('FTScroller: "paginatedSnap" is deprecated; converting to "singlePageScrolls"');
						_instanceOptions.singlePageScrolls = options.paginatedSnap;
						continue;
					}

					if (_instanceOptions.hasOwnProperty(key)) {
						_instanceOptions[key] = options[key];
					}
				}
			}

			// If snap grid size options were supplied, store them
			if (options.hasOwnProperty('snapSizeX') && !isNaN(options.snapSizeX)) {
				_snapGridSize.userX = _snapGridSize.x = options.snapSizeX;
			}
			if (options.hasOwnProperty('snapSizeY') && !isNaN(options.snapSizeY)) {
				_snapGridSize.userY = _snapGridSize.y = options.snapSizeY;
			}

			// If content width and height were defined, disable updateOnChanges for performance
			if (options.contentWidth && options.contentHeight) {
				options.updateOnChanges = false;
			}
		}

		// Validate the scroll response parameter
		_instanceOptions.scrollResponseBoundary = Math.min(_instanceOptions.scrollBoundary, _instanceOptions.scrollResponseBoundary);

		// Update base scrollable axes
		if (_instanceOptions.scrollingX) {
			_baseScrollableAxes.x = true;
		}
		if (_instanceOptions.scrollingY) {
			_baseScrollableAxes.y = true;
		}

		// Only enable animation frame support if the instance options permit it
		_reqAnimationFrame = _instanceOptions.enableRequestAnimationFrameSupport && _reqAnimationFrame;
		_cancelAnimationFrame = _reqAnimationFrame && _cancelAnimationFrame;


		/*                    Scoped Functions                   */

		/**
		 * Unbinds all event listeners to prevent circular references preventing items
		 * from being deallocated, and clean up references to dom elements. Pass in
		 * "removeElements" to also remove FTScroller DOM elements for special reuse cases.
		 */
		destroy = function destroy(removeElements) {
			var i, l;

			_removeEventHandlers();
			_cancelAnimation();
			if (_domChangeDebouncer) {
				window.clearTimeout(_domChangeDebouncer);
				_domChangeDebouncer = false;
			}
			for (i = 0, l = _timeouts.length; i < l; i = i + 1) {
				window.clearTimeout(_timeouts[i]);
			}
			_timeouts.length = 0;

			// Destroy DOM elements if required
			if (removeElements && _scrollableMasterNode) {
				while (_contentParentNode.firstChild) {
					_scrollableMasterNode.appendChild(_contentParentNode.firstChild);
				}
				_scrollableMasterNode.removeChild(_containerNode);
			}

			_scrollableMasterNode = null;
			_containerNode = null;
			_contentParentNode = null;
			_scrollNodes.x = null;
			_scrollNodes.y = null;
			_scrollbarNodes.x = null;
			_scrollbarNodes.y = null;
			for (i in _eventListeners) {
				if (_eventListeners.hasOwnProperty(i)) {
					_eventListeners[i].length = 0;
				}
			}

			// If this is currently tracked as a scrolling instance, clear the flag
			if (_ftscrollerMoving && _ftscrollerMoving === _self) {
				_ftscrollerMoving = false;
				if (_instanceOptions.windowScrollingActiveFlag) {
					window[_instanceOptions.windowScrollingActiveFlag] = false;
				}
			}
		};

		/**
		 * Configures the snapping boundaries within the scrolling element if
		 * snapping is active.  If this is never called, snapping defaults to
		 * using the bounding box, eg page-at-a-time.
		 */
		setSnapSize = function setSnapSize(width, height) {
			_snapGridSize.userX = width;
			_snapGridSize.userY = height;
			_snapGridSize.x = width;
			_snapGridSize.y = height;

			// Ensure the content dimensions conform to the grid
			_metrics.content.x = Math.ceil(_metrics.content.rawX / width) * width;
			_metrics.content.y = Math.ceil(_metrics.content.rawY / height) * height;
			_metrics.scrollEnd.x = _metrics.container.x - _metrics.content.x;
			_metrics.scrollEnd.y = _metrics.container.y - _metrics.content.y;
			_updateScrollbarDimensions();

			// Snap to the new grid if necessary
			_snapScroll();
			_updateSegments(true);
		};

		/**
		 * Scroll to a supplied position, including whether or not to animate the
		 * scroll and how fast to perform the animation (pass in true to select a
		 * dynamic duration).  The inputs will be constrained to bounds and snapped.
		 * If false is supplied for a position, that axis will not be scrolled.
		 */
		scrollTo = function scrollTo(left, top, animationDuration) {
			var targetPosition, duration, positions, axis, maxDuration = 0, scrollPositionsToApply = {};

			// If a manual scroll is in progress, cancel it
			_endScroll(Date.now());

			// Move supplied coordinates into an object for iteration, also inverting the values into
			// our coordinate system
			positions = {
				x: -left,
				y: -top
			};

			for (axis in _baseScrollableAxes) {
				if (_baseScrollableAxes.hasOwnProperty(axis)) {
					targetPosition = positions[axis];
					if (targetPosition === false) {
						continue;
					}

					// Constrain to bounds
					targetPosition = Math.min(0, Math.max(_metrics.scrollEnd[axis], targetPosition));

					// Snap if appropriate
					if (_instanceOptions.snapping && _snapGridSize[axis]) {
						targetPosition = Math.round(targetPosition / _snapGridSize[axis]) * _snapGridSize[axis];
					}

					// Get a duration
					duration = animationDuration || 0;
					if (duration === true) {
						duration = Math.sqrt(Math.abs(_baseScrollPosition[axis] - targetPosition)) * 20;
					}

					// Trigger the position change
					_setAxisPosition(axis, targetPosition, duration);
					scrollPositionsToApply[axis] = targetPosition;
					maxDuration = Math.max(maxDuration, duration);
				}
			}

			// If the scroll had resulted in a change in position, perform some additional actions:
			if (_baseScrollPosition.x !== positions.x || _baseScrollPosition.y !== positions.y) {

				// Mark a scroll as having ever occurred
				_hasBeenScrolled = true;

				// If an animation duration is present, fire a scroll start event and a
				// scroll event for any listeners to act on
				_fireEvent('scrollstart', _getPosition());
				_fireEvent('scroll', _getPosition());
			}

			if (maxDuration) {
				_timeouts.push(setTimeout(function () {
					var anAxis;
					for (anAxis in scrollPositionsToApply) {
						if (scrollPositionsToApply.hasOwnProperty(anAxis)) {
							_lastScrollPosition[anAxis] = scrollPositionsToApply[anAxis];
						}
					}
					_finalizeScroll();
				}, maxDuration));
			} else {
				_finalizeScroll();
			}
		};

		/**
		 * Alter the current scroll position, including whether or not to animate
		 * the scroll and how fast to perform the animation (pass in true to
		 * select a dynamic duration).  The inputs will be checked against the
		 * current position.
		 */
		scrollBy = function scrollBy(horizontal, vertical, animationDuration) {

			// Wrap the scrollTo function for simplicity
			scrollTo(parseFloat(horizontal) - _baseScrollPosition.x, parseFloat(vertical) - _baseScrollPosition.y, animationDuration);
		};

		/**
		 * Provide a public method to detect changes in dimensions for either the content or the
		 * container.
		 */
		updateDimensions = function updateDimensions(contentWidth, contentHeight, ignoreSnapScroll) {
			options.contentWidth = contentWidth || options.contentWidth;
			options.contentHeight = contentHeight || options.contentHeight;

			// Currently just wrap the private API
			_updateDimensions(!!ignoreSnapScroll);
		};

		/**
		 * Add an event handler for a supported event.  Current events include:
		 * scroll - fired whenever the scroll position changes
		 * scrollstart - fired when a scroll movement starts
		 * scrollend - fired when a scroll movement ends
		 * segmentwillchange - fired whenever the segment changes, including during scrolling
		 * segmentdidchange - fired when a segment has conclusively changed, after scrolling.
		 */
		addEventListener = function addEventListener(eventname, eventlistener) {

			// Ensure this is a valid event
			if (!_eventListeners.hasOwnProperty(eventname)) {
				return false;
			}

			// Add the listener
			_eventListeners[eventname].push(eventlistener);
			return true;
		};

		/**
		 * Remove an event handler for a supported event.  The listener must be exactly the same as
		 * an added listener to be removed.
		 */
		removeEventListener = function removeEventListener(eventname, eventlistener) {
			var i;

			// Ensure this is a valid event
			if (!_eventListeners.hasOwnProperty(eventname)) {
				return false;
			}

			for (i = _eventListeners[eventname].length; i >= 0; i = i - 1) {
				if (_eventListeners[eventname][i] === eventlistener) {
					_eventListeners[eventname].splice(i, 1);
				}
			}
			return true;
		};

		/**
		 * Set the input methods to disable. No inputs methods are disabled by default.
		 * (object, default { mouse: false, touch: false, scroll: false, pointer: false, focus: false })
		 */
		setDisabledInputMethods = function setDisabledInputMethods(disabledInputMethods) {
			var i, changed;

			for (i in _instanceOptions.disabledInputMethods) {
				disabledInputMethods[i] = !!disabledInputMethods[i];

				if (_instanceOptions.disabledInputMethods[i] !== disabledInputMethods[i]) changed = true;
				_instanceOptions.disabledInputMethods[i] = disabledInputMethods[i];
			}

			if (changed) {
				_resetEventHandlers();
			}
		};

		/**
		 * Start a scroll tracking input - this could be mouse, webkit-style touch,
		 * or ms-style pointer events.
		 */
		_startScroll = function _startScroll(inputX, inputY, inputTime, rawEvent) {
			var triggerScrollInterrupt = _isAnimating;

			// Opera fix
			if (inputTime <= 0) {
				inputTime = Date.now();
			}

			// If a window scrolling flag is set, and evaluates to true, don't start checking touches
			if (_instanceOptions.windowScrollingActiveFlag && window[_instanceOptions.windowScrollingActiveFlag]) {
				return false;
			}

			// If an animation is in progress, stop the scroll.
			if (triggerScrollInterrupt) {
				_interruptScroll();
			} else {

				// Allow clicks again, but only if a scroll was not interrupted
				_preventClick = false;
			}

			// Store the initial event coordinates
			_gestureStart.x = inputX;
			_gestureStart.y = inputY;
			_gestureStart.t = inputTime;
			_targetScrollPosition.x = _lastScrollPosition.x;
			_targetScrollPosition.y = _lastScrollPosition.y;

			// Clear event history and add the start touch
			_eventHistory.length = 0;
			_eventHistory.push({ x: inputX, y: inputY, t: inputTime });

			if (triggerScrollInterrupt) {
				_updateScroll(inputX, inputY, inputTime, rawEvent, triggerScrollInterrupt);
			}

			return true;
		};

		/**
		 * Continue a scroll as a result of an updated position
		 */
		_updateScroll = function _updateScroll(inputX, inputY, inputTime, rawEvent, scrollInterrupt) {
			var axis, otherScrollerActive, distancesBeyondBounds;
			var initialScroll = false;
			var gesture = {
				x: inputX - _gestureStart.x,
				y: inputY - _gestureStart.y
			};

			// Opera fix
			if (inputTime <= 0) {
				inputTime = Date.now();
			}

			// Update base target positions
			_targetScrollPosition.x = _baseScrollPosition.x + gesture.x;
			_targetScrollPosition.y = _baseScrollPosition.y + gesture.y;

			// If scrolling has not yet locked to this scroller, check whether to stop scrolling
			if (!_isScrolling) {

				// Check the internal flag to determine if another FTScroller is scrolling
				if (_ftscrollerMoving && _ftscrollerMoving !== _self) {
					otherScrollerActive = true;
				}

				// Otherwise, check the window scrolling flag to see if anything else has claimed scrolling
				else if (_instanceOptions.windowScrollingActiveFlag && window[_instanceOptions.windowScrollingActiveFlag]) {
					otherScrollerActive = true;
				}

				// If another scroller was active, clean up and stop processing.
				if (otherScrollerActive) {
					_releaseInputCapture();
					_inputIdentifier = false;
					if (_isDisplayingScroll) {
						_cancelAnimation();
						if (!_snapScroll(true)) {
							_finalizeScroll(true);
						}
					}
					return;
				}
			}

			// If not yet displaying a scroll, determine whether that triggering boundary
			// has been exceeded
			if (!_isDisplayingScroll) {

				// Determine scroll distance beyond bounds
				distancesBeyondBounds = _distancesBeyondBounds(_targetScrollPosition);

				// Determine whether to prevent the default scroll event - if the scroll could still
				// be triggered, prevent the default to avoid problems (particularly on PlayBook)
				if (_instanceOptions.bouncing || scrollInterrupt || (_scrollableAxes.x && gesture.x && distancesBeyondBounds.x < 0) || (_scrollableAxes.y && gesture.y && distancesBeyondBounds.y < 0)) {
					rawEvent.preventDefault();
				}

				// Check scrolled distance against the boundary limit to see if scrolling can be triggered.
				// If the scroll has been interrupted, trigger at once
				if (!scrollInterrupt && (!_scrollableAxes.x || Math.abs(gesture.x) < _instanceOptions.scrollResponseBoundary) && (!_scrollableAxes.y || Math.abs(gesture.y) < _instanceOptions.scrollResponseBoundary)) {
					return;
				}

				// If bouncing is disabled, and already at an edge and scrolling beyond the edge, ignore the scroll for
				// now - this allows other scrollers to claim if appropriate, allowing nicer nested scrolls.
				if (!_instanceOptions.bouncing && !scrollInterrupt && (!_scrollableAxes.x || !gesture.x || distancesBeyondBounds.x > 0) && (!_scrollableAxes.y || !gesture.y || distancesBeyondBounds.y > 0)) {

					// Prevent the original click now that scrolling would be triggered
					_preventClick = true;

					return;
				}

				// Trigger the start of visual scrolling
				_startAnimation();
				_isDisplayingScroll = true;
				_hasBeenScrolled = true;
				_isAnimating = true;
				initialScroll = true;
			} else {

				// Prevent the event default.  It is safe to call this in IE10 because the event is never
				// a window.event, always a "true" event.
				rawEvent.preventDefault();
			}

			// If not yet locked to a scroll, determine whether to do so
			if (!_isScrolling) {

				// If the gesture distance has exceeded the scroll lock distance, or snapping is active
				// and the scroll has been interrupted, enter exclusive scrolling.
				if ((scrollInterrupt && _instanceOptions.snapping) || (_scrollableAxes.x && Math.abs(gesture.x) >= _instanceOptions.scrollBoundary) || (_scrollableAxes.y && Math.abs(gesture.y) >= _instanceOptions.scrollBoundary)) {

					_isScrolling = true;
					_preventClick = true;
					_ftscrollerMoving = _self;
					if (_instanceOptions.windowScrollingActiveFlag) {
						window[_instanceOptions.windowScrollingActiveFlag] = _self;
					}
					_fireEvent('scrollstart', _getPosition());
				}
			}

			// Capture pointer if necessary
			if (_isScrolling) {
				_captureInput();
			}

			// Cancel text selections while dragging a cursor
			if (_canClearSelection) {
				window.getSelection().removeAllRanges();
			}

			// Ensure the target scroll position is affected by bounds and render if needed
			_constrainAndRenderTargetScrollPosition();

			// To aid render/draw coalescing, perform other one-off actions here
			if (initialScroll) {
				if (gesture.x > 0) {
					_baseScrollPosition.x -= _instanceOptions.scrollResponseBoundary;
				} else if(gesture.x < 0) {
					_baseScrollPosition.x += _instanceOptions.scrollResponseBoundary;
				}

				if (gesture.y > 0) {
					_baseScrollPosition.y -= _instanceOptions.scrollResponseBoundary;
				} else if(gesture.y < 0) {
					_baseScrollPosition.y += _instanceOptions.scrollResponseBoundary;
				}

				_targetScrollPosition.x = _baseScrollPosition.x + gesture.x;
				_targetScrollPosition.y = _baseScrollPosition.y + gesture.y;

				if (_instanceOptions.scrollingClassName) {
					_containerNode.className += ' ' + _instanceOptions.scrollingClassName;
				}
				if (_instanceOptions.scrollbars) {
					for (axis in _scrollableAxes) {
						if (_scrollableAxes.hasOwnProperty(axis)) {
							_scrollbarNodes[axis].className += ' active';
						}
					}
				}
			}

			// Add an event to the event history, keeping it around twenty events long
			_eventHistory.push({ x: inputX, y: inputY, t: inputTime });
			if (_eventHistory.length > 30) {
				_eventHistory.splice(0, 15);
			}
		};

		/**
		 * Complete a scroll with a final event time if available (it may
		 * not be, depending on the input type); this may continue the scroll
		 * with a fling and/or bounceback depending on options.
		 */
		_endScroll = function _endScroll(inputTime, rawEvent) {
			_releaseInputCapture();
			_inputIdentifier = false;
			_cancelAnimation();

			_fireEvent('scrollinteractionend', {});

			if (!_isScrolling) {
				if (!_snapScroll(true) && _isDisplayingScroll) {
					_finalizeScroll(true);
				}
				return;
			}

			// Modify the last movement event to include the end event time
			_eventHistory[_eventHistory.length - 1].t = inputTime;

			// Update flags
			_isScrolling = false;
			_isDisplayingScroll = false;
			_ftscrollerMoving = false;
			if (_instanceOptions.windowScrollingActiveFlag) {
				window[_instanceOptions.windowScrollingActiveFlag] = false;
			}

			// Stop the event default.  It is safe to call this in IE10 because
			// the event is never a window.event, always a "true" event.
			if (rawEvent) {
				rawEvent.preventDefault();
			}

			// Trigger a fling or bounceback if necessary
			if (!_flingScroll() && !_snapScroll()) {
				_finalizeScroll();
			}
		};

		/**
		 * Remove the scrolling class, cleaning up display.
		 */
		_finalizeScroll = function _finalizeScroll(scrollCancelled) {
			var i, l, axis, scrollEvent, scrollRegex;

			_isAnimating = false;
			_isDisplayingScroll = false;

			// Remove scrolling class if set
			if (_instanceOptions.scrollingClassName) {
				scrollRegex = new RegExp('(?:^|\\s)' + _instanceOptions.scrollingClassName + '(?!\\S)', 'g');
				_containerNode.className = _containerNode.className.replace(scrollRegex, '');
			}
			if (_instanceOptions.scrollbars) {
				for (axis in _scrollableAxes) {
					if (_scrollableAxes.hasOwnProperty(axis)) {
						_scrollbarNodes[axis].className = _scrollbarNodes[axis].className.replace(/ ?active/g, '');
					}
				}
			}

			// Store final position if scrolling occurred
			_baseScrollPosition.x = _lastScrollPosition.x;
			_baseScrollPosition.y = _lastScrollPosition.y;

			scrollEvent = _getPosition();

			if (!scrollCancelled) {
				_fireEvent('scroll', scrollEvent);
				_updateSegments(true);
			}

			// Always fire the scroll end event, including an argument indicating whether
			// the scroll was cancelled
			scrollEvent.cancelled = scrollCancelled;
			_fireEvent('scrollend', scrollEvent);

			// Restore transitions
			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis)) {
					_scrollNodes[axis].style[_transitionProperty] = '';
					if (_instanceOptions.scrollbars) {
						_scrollbarNodes[axis].style[_transitionProperty] = '';
					}
				}
			}

			// Clear any remaining timeouts
			for (i = 0, l = _timeouts.length; i < l; i = i + 1) {
				window.clearTimeout(_timeouts[i]);
			}
			_timeouts.length = 0;
		};

		/**
		 * Interrupt a current scroll, allowing a start scroll during animation to trigger a new scroll
		 */
		_interruptScroll = function _interruptScroll() {
			var axis, i, l;

			_isAnimating = false;

			// Update the stored base position
			_updateElementPosition();

			// Ensure the parsed positions are set, also clearing transitions
			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis)) {
					_setAxisPosition(axis, _baseScrollPosition[axis], 16, _instanceOptions.bounceDecelerationBezier);
				}
			}

			// Update segment tracking if snapping is active
			_updateSegments(false);

			// Clear any remaining timeouts
			for (i = 0, l = _timeouts.length; i < l; i = i + 1) {
				window.clearTimeout(_timeouts[i]);
			}
			_timeouts.length = 0;
		};

		/**
		 * Determine whether a scroll fling or bounceback is required, and set up the styles and
		 * timeouts required.
		 */
		_flingScroll = function _flingScroll() {
			var i, axis, movementTime, movementSpeed, lastPosition, comparisonPosition, flingDuration, flingDistance, flingPosition, bounceDelay, bounceDistance, bounceDuration, bounceTarget, boundsBounce, modifiedDistance, flingBezier, timeProportion, boundsCrossDelay, flingStartSegment, beyondBoundsFlingDistance, baseFlingComponent;
			var maxAnimationTime = 0;
			var moveRequired = false;
			var scrollPositionsToApply = {};

			// If we only have the start event available, or flinging is disabled,
			// or the scroll was triggered by a scrollwheel, no action required.
			if (_eventHistory.length === 1 || !_instanceOptions.flinging || _inputIdentifier === 'scrollwheel') {
				return false;
			}

			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis)) {
					bounceDuration = 350;
					bounceDistance = 0;
					boundsBounce = false;
					bounceTarget = false;
					boundsCrossDelay = undefined;

					// Re-set a default bezier curve for the animation for potential modification
					flingBezier = _instanceOptions.flingBezier;

					// Get the last movement speed, in pixels per millisecond.  To do this, look at the events
					// in the last 100ms and average out the speed, using a minimum number of two points.
					lastPosition = _eventHistory[_eventHistory.length - 1];
					comparisonPosition = _eventHistory[_eventHistory.length - 2];
					for (i = _eventHistory.length - 3; i >= 0; i = i - 1) {
						if (lastPosition.t - _eventHistory[i].t > 100) {
							break;
						}
						comparisonPosition = _eventHistory[i];
					}

					// Get the last movement time.  If this is zero - as can happen with
					// some scrollwheel events on some platforms - increase it to 16ms as
					// if the movement occurred over a single frame at 60fps.
					movementTime = lastPosition.t - comparisonPosition.t;
					if (!movementTime) {
						movementTime = 16;
					}

					// Derive the movement speed
					movementSpeed = (lastPosition[axis] - comparisonPosition[axis]) / movementTime;

					// If there is little speed, no further action required except for a bounceback, below.
					if (Math.abs(movementSpeed) < _kMinimumSpeed) {
						flingDuration = 0;
						flingDistance = 0;

					} else {


						/* Calculate the fling duration.  As per TouchScroll, the speed at any particular
						point in time can be calculated as:
							{ speed } = { initial speed } * ({ friction } to the power of { duration })
						...assuming all values are in equal pixels/millisecond measurements.  As we know the
						minimum target speed, this can be altered to:
							{ duration } = log( { speed } / { initial speed } ) / log( { friction } )
						*/

						flingDuration = Math.log(_kMinimumSpeed / Math.abs(movementSpeed)) / Math.log(_kFriction);


						/* Calculate the fling distance (before any bouncing or snapping).  As per
						TouchScroll, the total distance covered can be approximated by summing
						the distance per millisecond, per millisecond of duration - a divergent series,
						and so rather tricky to model otherwise!
						So using values in pixels per millisecond:
							{ distance } = { initial speed } * (1 - ({ friction } to the power
								of { duration + 1 }) / (1 - { friction })
						*/

						flingDistance = movementSpeed * (1 - Math.pow(_kFriction, flingDuration + 1)) / (1 - _kFriction);
					}

					// Determine a target fling position
					flingPosition = Math.floor(_lastScrollPosition[axis] + flingDistance);

					// If bouncing is disabled, and the last scroll position and fling position are both at a bound,
					// reset the fling position to the bound
					if (!_instanceOptions.bouncing) {
						if (_lastScrollPosition[axis] === 0 && flingPosition > 0) {
							flingPosition = 0;
						} else if (_lastScrollPosition[axis] === _metrics.scrollEnd[axis] && flingPosition < _lastScrollPosition[axis]) {
							flingPosition = _lastScrollPosition[axis];
						}
					}

					// In single-page-scroll mode, determine the page to snap to - maximum one page
					// in either direction from the *start* page.
					if (_instanceOptions.singlePageScrolls && _instanceOptions.snapping) {
						flingStartSegment = -_lastScrollPosition[axis] / _snapGridSize[axis];
						if (_baseSegment[axis] < flingStartSegment) {
							flingStartSegment = Math.floor(flingStartSegment);
						} else {
							flingStartSegment = Math.ceil(flingStartSegment);
						}

						// If the target position will end up beyond another page, target that page edge
						if (flingPosition > -(_baseSegment[axis] - 1) * _snapGridSize[axis]) {
							bounceDistance = flingPosition + (_baseSegment[axis] - 1) * _snapGridSize[axis];
						} else if (flingPosition < -(_baseSegment[axis] + 1) * _snapGridSize[axis]) {
							bounceDistance = flingPosition + (_baseSegment[axis] + 1) * _snapGridSize[axis];

						// Otherwise, if the movement speed was above the minimum velocity, continue
						// in the move direction.
						} else if (Math.abs(movementSpeed) > _kMinimumSpeed) {

							// Determine the target segment
							if (movementSpeed < 0) {
								flingPosition = Math.floor(_lastScrollPosition[axis] / _snapGridSize[axis]) * _snapGridSize[axis];
							} else {
								flingPosition = Math.ceil(_lastScrollPosition[axis] / _snapGridSize[axis]) * _snapGridSize[axis];
							}

							flingDuration = Math.min(_instanceOptions.maxFlingDuration, flingDuration * (flingPosition - _lastScrollPosition[axis]) / flingDistance);
						}

					// In non-paginated snapping mode, snap to the nearest grid location to the target
					} else if (_instanceOptions.snapping) {
						bounceDistance = flingPosition - (Math.round(flingPosition / _snapGridSize[axis]) * _snapGridSize[axis]);
					}

					// Deal with cases where the target is beyond the bounds
					if (flingPosition - bounceDistance > 0) {
						bounceDistance = flingPosition;
						boundsBounce = true;
					} else if (flingPosition - bounceDistance < _metrics.scrollEnd[axis]) {
						bounceDistance = flingPosition - _metrics.scrollEnd[axis];
						boundsBounce = true;
					}

					// Amend the positions and bezier curve if necessary
					if (bounceDistance) {

						// If the fling moves the scroller beyond the normal scroll bounds, and
						// the bounce is snapping the scroll back after the fling:
						if (boundsBounce && _instanceOptions.bouncing && flingDistance) {
							flingDistance = Math.floor(flingDistance);

							if (flingPosition > 0) {
								beyondBoundsFlingDistance = flingPosition - Math.max(0, _lastScrollPosition[axis]);
							} else {
								beyondBoundsFlingDistance = flingPosition - Math.min(_metrics.scrollEnd[axis], _lastScrollPosition[axis]);
							}
							baseFlingComponent = flingDistance - beyondBoundsFlingDistance;

							// Determine the time proportion the original bound is along the fling curve
							if (!flingDistance || !flingDuration) {
								timeProportion = 0;
							} else {
								timeProportion = flingBezier._getCoordinateForT(flingBezier.getTForY((flingDistance - beyondBoundsFlingDistance) / flingDistance, 1 / flingDuration), flingBezier._p1.x, flingBezier._p2.x);
								boundsCrossDelay = timeProportion * flingDuration;
							}

							// Eighth the distance beyonds the bounds
							modifiedDistance = Math.ceil(beyondBoundsFlingDistance / 8);

							// Further limit the bounce to half the container dimensions
							if (Math.abs(modifiedDistance) > _metrics.container[axis] / 2) {
								if (modifiedDistance < 0) {
									modifiedDistance = -Math.floor(_metrics.container[axis] / 2);
								} else {
									modifiedDistance = Math.floor(_metrics.container[axis] / 2);
								}
							}

							if (flingPosition > 0) {
								bounceTarget = 0;
							} else {
								bounceTarget = _metrics.scrollEnd[axis];
							}

							// If the entire fling is a bounce, modify appropriately
							if (timeProportion === 0) {
								flingDuration = flingDuration / 6;
								flingPosition = _lastScrollPosition[axis] + baseFlingComponent + modifiedDistance;
								bounceDelay = flingDuration;

							// Otherwise, take a new curve and add it to the timeout stack for the bounce
							} else {

								// The new bounce delay is the pre-boundary fling duration, plus a
								// sixth of the post-boundary fling.
								bounceDelay = (timeProportion + ((1 - timeProportion) / 6)) * flingDuration;

								_scheduleAxisPosition(axis, (_lastScrollPosition[axis] + baseFlingComponent + modifiedDistance), ((1 - timeProportion) * flingDuration / 6), _instanceOptions.bounceDecelerationBezier, boundsCrossDelay);

								// Modify the fling to match, clipping to prevent over-fling
								flingBezier = flingBezier.divideAtX(bounceDelay / flingDuration, 1 / flingDuration)[0];
								flingDuration = bounceDelay;
								flingPosition = (_lastScrollPosition[axis] + baseFlingComponent + modifiedDistance);
							}

						// If the fling requires snapping to a snap location, and the bounce needs to
						// reverse the fling direction after the fling completes:
						} else if ((flingDistance < 0 && bounceDistance < flingDistance) || (flingDistance > 0 && bounceDistance > flingDistance)) {

							// Shorten the original fling duration to reflect the bounce
							flingPosition = flingPosition - Math.floor(flingDistance / 2);
							bounceDistance = bounceDistance - Math.floor(flingDistance / 2);
							bounceDuration = Math.sqrt(Math.abs(bounceDistance)) * 50;
							bounceTarget = flingPosition - bounceDistance;
							flingDuration = 350;
							bounceDelay = flingDuration * 0.97;

						// If the bounce is truncating the fling, or continuing the fling on in the same
						// direction to hit the next boundary:
						} else {
							flingPosition = flingPosition - bounceDistance;

							// If there was no fling distance originally, use the bounce details
							if (!flingDistance) {
								flingDuration = bounceDuration;

							// If truncating the fling at a snapping edge:
							} else if ((flingDistance < 0 && bounceDistance < 0) || (flingDistance > 0 && bounceDistance > 0)) {
								timeProportion = flingBezier._getCoordinateForT(flingBezier.getTForY((Math.abs(flingDistance) - Math.abs(bounceDistance)) / Math.abs(flingDistance), 1 / flingDuration), flingBezier._p1.x, flingBezier._p2.x);
								flingBezier = flingBezier.divideAtX(timeProportion, 1 / flingDuration)[0];
								flingDuration = Math.round(flingDuration * timeProportion);

							// If extending the fling to reach the next snapping boundary, no further
							// action is required.
							}

							bounceDistance = 0;
							bounceDuration = 0;
						}
					}

					// If no fling or bounce is required, continue
					if (flingPosition === _lastScrollPosition[axis] && !bounceDistance) {
						continue;
					}
					moveRequired = true;

					// Perform the fling
					_setAxisPosition(axis, flingPosition, flingDuration, flingBezier, boundsCrossDelay);

					// Schedule a bounce if appropriate
					if (bounceDistance && bounceDuration) {
						_scheduleAxisPosition(axis, bounceTarget, bounceDuration, _instanceOptions.bounceBezier, bounceDelay);
					}

					maxAnimationTime = Math.max(maxAnimationTime, bounceDistance ? (bounceDelay + bounceDuration) : flingDuration);
					scrollPositionsToApply[axis] = (bounceTarget === false) ? flingPosition : bounceTarget;
				}
			}

			if (moveRequired && maxAnimationTime) {
				_timeouts.push(setTimeout(function () {
					var anAxis;

					// Update the stored scroll position ready for finalising
					for (anAxis in scrollPositionsToApply) {
						if (scrollPositionsToApply.hasOwnProperty(anAxis)) {
							_lastScrollPosition[anAxis] = scrollPositionsToApply[anAxis];
						}
					}

					_finalizeScroll();
				}, maxAnimationTime));
			}

			return moveRequired;
		};

		/**
		 * Bounce back into bounds if necessary, or snap to a grid location.
		 */
		_snapScroll = function _snapScroll(scrollCancelled) {
			var axis;
			var snapDuration = scrollCancelled ? 100 : 350;
			var targetPosition = _lastScrollPosition;

			// Get the current position and see if a snap is required
			if (_instanceOptions.snapping) {

				// Store current snap index
				_snapIndex = _getSnapIndexForPosition(targetPosition);
				targetPosition = _getSnapPositionForIndexes(_snapIndex, targetPosition);
			}
			targetPosition = _limitToBounds(targetPosition);

			var snapRequired = false;
			for (axis in _baseScrollableAxes) {
				if (_baseScrollableAxes.hasOwnProperty(axis)) {
					if (targetPosition[axis] !== _lastScrollPosition[axis]) {
						snapRequired = true;
					}
				}
			}
			if (!snapRequired) {
				return false;
			}

			// Perform the snap
			for (axis in _baseScrollableAxes) {
				if (_baseScrollableAxes.hasOwnProperty(axis)) {
					_setAxisPosition(axis, targetPosition[axis], snapDuration);
				}
			}

			_timeouts.push(setTimeout(function () {

				// Update the stored scroll position ready for finalizing
				_lastScrollPosition = targetPosition;

				_finalizeScroll(scrollCancelled);
			}, snapDuration));

			return true;
		};

		/**
		 * Get an appropriate snap index for a supplied point.
		 */
		_getSnapIndexForPosition = function _getSnapIndexForPosition(coordinates) {
			var axis;
			var indexes = {x: 0, y: 0};
			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis) && _snapGridSize[axis]) {
					indexes[axis] = Math.round(coordinates[axis] / _snapGridSize[axis]);
				}
			}
			return indexes;
		};

		/**
		 * Get an appropriate snap point for a supplied index.
		 */
		_getSnapPositionForIndexes = function _getSnapPositionForIndexes(indexes, currentCoordinates) {
			var axis;
			var coordinatesToReturn = {
				x: currentCoordinates.x,
				y: currentCoordinates.y
			};
			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis)) {
					coordinatesToReturn[axis] = indexes[axis] * _snapGridSize[axis];
				}
			}
			return coordinatesToReturn;
		};

		/**
		 * Update the scroll position while scrolling is active, checking the position
		 * within bounds and rubberbanding/constraining as appropriate; also triggers a
		 * scroll position render if a requestAnimationFrame loop isn't active
		 */
		_constrainAndRenderTargetScrollPosition = function _constrainAndRenderTargetScrollPosition() {
			var axis, upperBound, lowerBound;

			// Update axes target positions if beyond bounds
			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis)) {

					// Set bounds to the left and right of the container
					upperBound = 0;
					lowerBound = _metrics.scrollEnd[axis];

					if (_instanceOptions.singlePageScrolls && _instanceOptions.snapping) {

						// For a single-page-scroll, set the bounds to the left and right of the
						// current segment
						upperBound = Math.min(upperBound, -(_baseSegment[axis] - 1) * _snapGridSize[axis]);
						lowerBound = Math.max(lowerBound, -(_baseSegment[axis] + 1) * _snapGridSize[axis]);
					}

					if (_targetScrollPosition[axis] > upperBound) {
						_targetScrollPosition[axis] = upperBound + _modifyDistanceBeyondBounds(_targetScrollPosition[axis] - upperBound, axis);
					} else if (_targetScrollPosition[axis] < lowerBound) {
						_targetScrollPosition[axis] = lowerBound + _modifyDistanceBeyondBounds(_targetScrollPosition[axis] - lowerBound, axis);
					}
				}
			}

			// Trigger a scroll position update for platforms not using requestAnimationFrames
			if (!_reqAnimationFrame) {
				_scheduleRender();
			}
		};

		/**
		 * Limit coordinates within the bounds of the scrollable viewport.
		 */
		_limitToBounds = function _limitToBounds(coordinates) {
			var axis;
			var coordinatesToReturn = { x: coordinates.x, y: coordinates.y };

			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis)) {

					// If the coordinate is beyond the edges of the scroller, use the closest edge
					if (coordinates[axis] > 0) {
						coordinatesToReturn[axis] = 0;
						continue;
					}
					if (coordinates[axis] < _metrics.scrollEnd[axis]) {
						coordinatesToReturn[axis] = _metrics.scrollEnd[axis];
						continue;
					}
				}
			}

			return coordinatesToReturn;
		};


		/**
		 * Sets up the DOM around the node to be scrolled.
		 */
		_initializeDOM = function _initializeDOM() {
			var offscreenFragment, offscreenNode, scrollYParent;

			// Check whether the DOM is already present and valid - if so, no further action required.
			if (_existingDOMValid()) {
				return;
			}

			// Otherwise, the DOM needs to be created inside the originally supplied node.  The node
			// has a container inserted inside it - which acts as an anchor element with constraints -
			// and then the scrollable layers as appropriate.

			// Create a new document fragment to temporarily hold the scrollable content
			offscreenFragment = _scrollableMasterNode.ownerDocument.createDocumentFragment();
			offscreenNode = document.createElement('DIV');
			offscreenFragment.appendChild(offscreenNode);

			// Drop in the wrapping HTML
			offscreenNode.innerHTML = FTScroller.prototype.getPrependedHTML(!_instanceOptions.scrollingX, !_instanceOptions.scrollingY, _instanceOptions.hwAccelerationClass) + FTScroller.prototype.getAppendedHTML(!_instanceOptions.scrollingX, !_instanceOptions.scrollingY, _instanceOptions.hwAccelerationClass, _instanceOptions.scrollbars);

			// Update references as appropriate
			_containerNode = offscreenNode.firstElementChild;
			scrollYParent = _containerNode;
			if (_instanceOptions.scrollingX) {
				_scrollNodes.x = _containerNode.firstElementChild;
				scrollYParent = _scrollNodes.x;
				if (_instanceOptions.scrollbars) {
					_scrollbarNodes.x = _containerNode.getElementsByClassName('ftscroller_scrollbarx')[0];
				}
			}
			if (_instanceOptions.scrollingY) {
				_scrollNodes.y = scrollYParent.firstElementChild;
				if (_instanceOptions.scrollbars) {
					_scrollbarNodes.y = _containerNode.getElementsByClassName('ftscroller_scrollbary')[0];
				}
				_contentParentNode = _scrollNodes.y;
			} else {
				_contentParentNode = _scrollNodes.x;
			}

			// Take the contents of the scrollable element, and copy them into the new container
			while (_scrollableMasterNode.firstChild) {
				_contentParentNode.appendChild(_scrollableMasterNode.firstChild);
			}

			// Move the wrapped elements back into the document
			_scrollableMasterNode.appendChild(_containerNode);
		};

		/**
		 * Attempts to use any existing DOM scroller nodes if possible, returning true if so;
		 * updates all internal element references.
		 */
		_existingDOMValid = function _existingDOMValid() {
			var scrollerContainer, layerX, layerY, yParent, scrollerX, scrollerY, candidates, i, l;

			// Check that there's an initial child node, and make sure it's the container class
			scrollerContainer = _scrollableMasterNode.firstElementChild;
			if (!scrollerContainer || scrollerContainer.className.indexOf('ftscroller_container') === -1) {
				return;
			}

			// If x-axis scrolling is enabled, find and verify the x scroller layer
			if (_instanceOptions.scrollingX) {

				// Find and verify the x scroller layer
				layerX = scrollerContainer.firstElementChild;
				if (!layerX || layerX.className.indexOf('ftscroller_x') === -1) {
					return;
				}
				yParent = layerX;

				// Find and verify the x scrollbar if enabled
				if (_instanceOptions.scrollbars) {
					candidates = scrollerContainer.getElementsByClassName('ftscroller_scrollbarx');
					if (candidates) {
						for (i = 0, l = candidates.length; i < l; i = i + 1) {
							if (candidates[i].parentNode === scrollerContainer) {
								scrollerX = candidates[i];
								break;
							}
						}
					}
					if (!scrollerX) {
						return;
					}
				}
			} else {
				yParent = scrollerContainer;
			}

			// If y-axis scrolling is enabled, find and verify the y scroller layer
			if (_instanceOptions.scrollingY) {

				// Find and verify the x scroller layer
				layerY = yParent.firstElementChild;
				if (!layerY || layerY.className.indexOf('ftscroller_y') === -1) {
					return;
				}

				// Find and verify the y scrollbar if enabled
				if (_instanceOptions.scrollbars) {
					candidates = scrollerContainer.getElementsByClassName('ftscroller_scrollbary');
					if (candidates) {
						for (i = 0, l = candidates.length; i < l; i = i + 1) {
							if (candidates[i].parentNode === scrollerContainer) {
								scrollerY = candidates[i];
								break;
							}
						}
					}
					if (!scrollerY) {
						return;
					}
				}
			}

			// Elements found and verified - update the references and return success
			_containerNode = scrollerContainer;
			if (layerX) {
				_scrollNodes.x = layerX;
			}
			if (layerY) {
				_scrollNodes.y = layerY;
			}
			if (scrollerX) {
				_scrollbarNodes.x = scrollerX;
			}
			if (scrollerY) {
				_scrollbarNodes.y = scrollerY;
			}
			if (_instanceOptions.scrollingY) {
				_contentParentNode = layerY;
			} else {
				_contentParentNode = layerX;
			}
			return true;
		};

		_domChanged = function _domChanged(e) {

			// If the timer is active, clear it
			if (_domChangeDebouncer) {
				window.clearTimeout(_domChangeDebouncer);
			}

			// React to resizes at once
			if (e && e.type === 'resize') {
				_updateDimensions();

			// For other changes, which may occur in groups, set up the DOM changed timer
			} else {
				_domChangeDebouncer = setTimeout(function () {
					_updateDimensions();
				}, 100);
			}
		};

		_updateDimensions = function _updateDimensions(ignoreSnapScroll) {
			var axis;

			// Only update dimensions if the container node exists (DOM elements can go away if
			// the scroller instance is not destroyed correctly)
			if (!_containerNode || !_contentParentNode) {
				return false;
			}

			if (_domChangeDebouncer) {
				window.clearTimeout(_domChangeDebouncer);
				_domChangeDebouncer = false;
			}
			var containerWidth, containerHeight, startAlignments;

			// Calculate the starting alignment for comparison later
			startAlignments = { x: false, y: false };
			for (axis in startAlignments) {
				if (startAlignments.hasOwnProperty(axis)) {
					if (_lastScrollPosition[axis] === 0) {
						startAlignments[axis] = -1;
					} else if (_lastScrollPosition[axis] <= _metrics.scrollEnd[axis]) {
						startAlignments[axis] = 1;
					} else if (_lastScrollPosition[axis] * 2 <= _metrics.scrollEnd[axis] + 5 && _lastScrollPosition[axis] * 2 >= _metrics.scrollEnd[axis] - 5) {
						startAlignments[axis] = 0;
					}
				}
			}

			containerWidth = _containerNode.offsetWidth;
			containerHeight = _containerNode.offsetHeight;

			// Grab the dimensions
			var rawScrollWidth = options.contentWidth || _contentParentNode.offsetWidth;
			var rawScrollHeight = options.contentHeight || _contentParentNode.offsetHeight;
			var scrollWidth = rawScrollWidth;
			var scrollHeight = rawScrollHeight;
			var targetPosition = { x: _lastScrollPosition.x, y: _lastScrollPosition.y };

			// Update snap grid
			if (!_snapGridSize.userX) {
				_snapGridSize.x = containerWidth;
			}
			if (!_snapGridSize.userY) {
				_snapGridSize.y = containerHeight;
			}

			// If there is a grid, conform to the grid
			if (_instanceOptions.snapping) {
				if (_snapGridSize.userX) {
					scrollWidth = Math.ceil(scrollWidth / _snapGridSize.userX) * _snapGridSize.userX;
				} else {
					scrollWidth = Math.ceil(scrollWidth / _snapGridSize.x) * _snapGridSize.x;
				}
				if (_snapGridSize.userY) {
					scrollHeight = Math.ceil(scrollHeight / _snapGridSize.userY) * _snapGridSize.userY;
				} else {
					scrollHeight = Math.ceil(scrollHeight / _snapGridSize.y) * _snapGridSize.y;
				}
			}

			// If no details have changed, return.
			if (_metrics.container.x === containerWidth && _metrics.container.y === containerHeight && _metrics.content.x === scrollWidth && _metrics.content.y === scrollHeight) {
				return;
			}

			// Update the sizes
			_metrics.container.x = containerWidth;
			_metrics.container.y = containerHeight;
			_metrics.content.x = scrollWidth;
			_metrics.content.rawX = rawScrollWidth;
			_metrics.content.y = scrollHeight;
			_metrics.content.rawY = rawScrollHeight;
			_metrics.scrollEnd.x = containerWidth - scrollWidth;
			_metrics.scrollEnd.y = containerHeight - scrollHeight;

			_updateScrollbarDimensions();

			// If scrolling is in progress, trigger a scroll update
			if (_isScrolling) {
				_lastScrollPosition.x--;
				_lastScrollPosition.y--;
				_constrainAndRenderTargetScrollPosition();

			// If scrolling *isn't* in progress, snap and realign.
			} else {
				if (!ignoreSnapScroll && _instanceOptions.snapping) {

			        // Ensure bounds are correct
					_updateSegments();
					targetPosition = _getSnapPositionForIndexes(_snapIndex, _lastScrollPosition);
				}

				// Apply base alignment if appropriate
				for (axis in targetPosition) {
					if (targetPosition.hasOwnProperty(axis)) {

						// If the container is smaller than the content, determine whether to apply the
						// alignment.  This occurs if a scroll has never taken place, or if the position
						// was previously at the correct "end" and can be maintained.
						if (_metrics.container[axis] < _metrics.content[axis]) {
							if (_hasBeenScrolled && _instanceOptions.baseAlignments[axis] !== startAlignments[axis]) {
								continue;
							}
						}

						// Apply the alignment
						if (_instanceOptions.baseAlignments[axis] === 1) {
							targetPosition[axis] = _metrics.scrollEnd[axis];
						} else if (_instanceOptions.baseAlignments[axis] === 0) {
							targetPosition[axis] = Math.floor(_metrics.scrollEnd[axis] / 2);
						} else if (_instanceOptions.baseAlignments[axis] === -1) {
							targetPosition[axis] = 0;
						}
					}
				}

				// Limit to bounds
				targetPosition = _limitToBounds(targetPosition);

				if (_instanceOptions.scrollingX && targetPosition.x !== _lastScrollPosition.x) {
					_setAxisPosition('x', targetPosition.x, 0);
					_baseScrollPosition.x = targetPosition.x;
				}
				if (_instanceOptions.scrollingY && targetPosition.y !== _lastScrollPosition.y) {
					_setAxisPosition('y', targetPosition.y, 0);
					_baseScrollPosition.y = targetPosition.y;
				}
			}
		};

		_updateScrollbarDimensions = function _updateScrollbarDimensions() {

			// Update scrollbar sizes
			if (_instanceOptions.scrollbars) {
				if (_instanceOptions.scrollingX) {
					_scrollbarNodes.x.style.width = Math.max(6, Math.round(_metrics.container.x * (_metrics.container.x / _metrics.content.x) - 4)) + 'px';
				}
				if (_instanceOptions.scrollingY) {
					_scrollbarNodes.y.style.height = Math.max(6, Math.round(_metrics.container.y * (_metrics.container.y / _metrics.content.y) - 4)) + 'px';
				}
			}

			// Update scroll caches
			_scrollableAxes = {};
			if (_instanceOptions.scrollingX && (_metrics.content.x > _metrics.container.x || _instanceOptions.alwaysScroll)) {
				_scrollableAxes.x = true;
			}
			if (_instanceOptions.scrollingY && (_metrics.content.y > _metrics.container.y || _instanceOptions.alwaysScroll)) {
				_scrollableAxes.y = true;
			}
		};

		_updateElementPosition = function _updateElementPosition() {
			var axis, computedStyle, splitStyle;

			// Retrieve the current position of each active axis.
			// Custom parsing is used instead of native matrix support for speed and for
			// backwards compatibility.
			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis)) {
					computedStyle = window.getComputedStyle(_scrollNodes[axis], null)[_vendorTransformLookup];
					splitStyle = computedStyle.split(', ');

					// For 2d-style transforms, pull out elements four or five
					if (splitStyle.length === 6) {
						_baseScrollPosition[axis] = parseInt(splitStyle[(axis === 'y') ? 5 : 4], 10);

					// For 3d-style transforms, pull out elements twelve or thirteen
					} else {
						_baseScrollPosition[axis] = parseInt(splitStyle[(axis === 'y') ? 13 : 12], 10);
					}
					_lastScrollPosition[axis] = _baseScrollPosition[axis];
				}
			}
		};

		_updateSegments = function _updateSegments(scrollFinalised) {
			var axis;
			var newSegment = { x: 0, y: 0 };

			// If snapping is disabled, return without any further action required
			if (!_instanceOptions.snapping) {
				return;
			}

			// Calculate the new segments
			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis)) {
					newSegment[axis] = Math.max(0, Math.min(Math.ceil(_metrics.content[axis] / _snapGridSize[axis]) - 1, Math.round(-_lastScrollPosition[axis] / _snapGridSize[axis])));
				}
			}

			// In all cases update the active segment if appropriate
			if (newSegment.x !== _activeSegment.x || newSegment.y !== _activeSegment.y) {
				_activeSegment.x = newSegment.x;
				_activeSegment.y = newSegment.y;
				_fireEvent('segmentwillchange', { segmentX: newSegment.x, segmentY: newSegment.y });
			}

			// If the scroll has been finalised, also update the base segment
			if (scrollFinalised) {
				if (newSegment.x !== _baseSegment.x || newSegment.y !== _baseSegment.y) {
					_baseSegment.x = newSegment.x;
					_baseSegment.y = newSegment.y;
					_fireEvent('segmentdidchange', { segmentX: newSegment.x, segmentY: newSegment.y });
				}
			}
		};

		_setAxisPosition = function _setAxisPosition(axis, position, animationDuration, animationBezier, boundsCrossDelay) {
			var transitionCSSString, newPositionAtExtremity = null;

			// Only update position if the axis node exists (DOM elements can go away if
			// the scroller instance is not destroyed correctly)
			if (!_scrollNodes[axis]) {
				return false;
			}

			// Determine the transition property to apply to both the scroll element and the scrollbar
			if (animationDuration) {
				if (!animationBezier) {
					animationBezier = _instanceOptions.flingBezier;
				}

				transitionCSSString = _vendorCSSPrefix + 'transform ' + animationDuration + 'ms ' + animationBezier.toString();
			} else {
				transitionCSSString = '';
			}

			// Apply the transition property to elements
			_scrollNodes[axis].style[_transitionProperty] = transitionCSSString;
			if (_instanceOptions.scrollbars) {
				_scrollbarNodes[axis].style[_transitionProperty] = transitionCSSString;
			}

			// Update the positions
			_scrollNodes[axis].style[_transformProperty] = _translateRulePrefix + _transformPrefixes[axis] + position + 'px' + _transformSuffixes[axis];
			if (_instanceOptions.scrollbars) {
				_scrollbarNodes[axis].style[_transformProperty] = _translateRulePrefix + _transformPrefixes[axis] + (-position * _metrics.container[axis] / _metrics.content[axis]) + 'px' + _transformSuffixes[axis];
			}

			// Determine whether the scroll is at an extremity.
			if (position >= 0) {
				newPositionAtExtremity = 'start';
			} else if (position <= _metrics.scrollEnd[axis]) {
				newPositionAtExtremity = 'end';
			}

			// If the extremity status has changed, fire an appropriate event
			if (newPositionAtExtremity !== _scrollAtExtremity[axis]) {
				if (newPositionAtExtremity !== null) {
					if (animationDuration) {
						_timeouts.push(setTimeout(function() {
							_fireEvent('reached' + newPositionAtExtremity, { axis: axis });
						}, boundsCrossDelay || animationDuration));
					} else {
						_fireEvent('reached' + newPositionAtExtremity, { axis: axis });
					}
				}
				_scrollAtExtremity[axis] = newPositionAtExtremity;
			}

			// Update the recorded position if there's no duration
			if (!animationDuration) {
				_lastScrollPosition[axis] = position;
			}
		};

		/**
		 * Retrieve the current position as an object with scrollLeft and scrollTop
		 * properties.
		 */
		_getPosition = function _getPosition() {
			return {
				scrollLeft: -_lastScrollPosition.x,
				scrollTop: -_lastScrollPosition.y
			};
		};

		_scheduleAxisPosition = function _scheduleAxisPosition(axis, position, animationDuration, animationBezier, afterDelay) {
			_timeouts.push(setTimeout(function () {
				_setAxisPosition(axis, position, animationDuration, animationBezier);
			}, afterDelay));
		};

		_fireEvent = function _fireEvent(eventName, eventObject) {
			var i, l;
			eventObject.srcObject = _publicSelf;

			// Iterate through any listeners
			for (i = 0, l = _eventListeners[eventName].length; i < l; i = i + 1) {

				// Execute each in a try/catch
				try {
					_eventListeners[eventName][i](eventObject);
				} catch (error) {
					if (window.console && window.console.error) {
						if (error.message) {
							window.console.error(error.message + ' (' + error.sourceURL + ', line ' + error.line + ')');
						} else {
							window.console.error('Error encountered executing FTScroller event listener callback for [' + eventName + ']. Add a "debugger" statement here to obtain a full backtrace.');
							if (window.console.dir) window.console.dir(error);
						}
					}
				}
			}
		};

		/**
		 * Update the scroll position so that the child element is in view.
		 */
		_childFocused = function _childFocused(event) {
			var offset, axis, visibleChildPortion;
			var focusedNodeRect = _getBoundingRect(event.target);
			var containerRect = _getBoundingRect(_containerNode);
			var edgeMap = { x: 'left', y: 'top' };
			var opEdgeMap = { x: 'right', y: 'bottom' };
			var dimensionMap = { x: 'width', y: 'height' };

			// If an input is currently being tracked, ignore the focus event
			if (_inputIdentifier !== false) {
				return;
			}

			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis)) {

					// If the focussed node is entirely in view, there is no need to center it
					if (focusedNodeRect[edgeMap[axis]] >= containerRect[edgeMap[axis]] && focusedNodeRect[opEdgeMap[axis]] <= containerRect[opEdgeMap[axis]]) {
						continue;
					}

					// If the focussed node is larger than the container...
					if (focusedNodeRect[dimensionMap[axis]] > containerRect[dimensionMap[axis]]) {

						visibleChildPortion = focusedNodeRect[dimensionMap[axis]] - Math.max(0, containerRect[edgeMap[axis]] - focusedNodeRect[edgeMap[axis]]) - Math.max(0, focusedNodeRect[opEdgeMap[axis]] - containerRect[opEdgeMap[axis]]);

						// If more than half a container's portion of the focussed node is visible, there's no need to center it
						if (visibleChildPortion >= (containerRect[dimensionMap[axis]] / 2)) {
							continue;
						}
					}

					// Set the target offset to be in the middle of the container, or as close as bounds permit
					offset = -Math.round((focusedNodeRect[dimensionMap[axis]] / 2) - _lastScrollPosition[axis] + focusedNodeRect[edgeMap[axis]] - containerRect[edgeMap[axis]]  - (containerRect[dimensionMap[axis]] / 2));
					offset = Math.min(0, Math.max(_metrics.scrollEnd[axis], offset));

					// Perform the scroll
					_setAxisPosition(axis, offset, 0);
					_baseScrollPosition[axis] = offset;
				}
			}

			_fireEvent('scroll', _getPosition());
		};

		/**
		 * Given a relative distance beyond the element bounds, returns a modified version to
		 * simulate bouncy/springy edges.
		 */
		_modifyDistanceBeyondBounds = function _modifyDistanceBeyondBounds(distance, axis) {
			if (!_instanceOptions.bouncing) {
				return 0;
			}
			var e = Math.exp(distance / _metrics.container[axis]);
			return Math.round(_metrics.container[axis] * 0.6 * (e - 1) / (e + 1));
		};

		/**
		 * Given positions for each enabled axis, returns an object showing how far each axis is beyond
		 * bounds. If within bounds, -1 is returned; if at the bounds, 0 is returned.
		 */
		_distancesBeyondBounds = function _distancesBeyondBounds(positions) {
			var axis, position;
			var distances = {};
			for (axis in positions) {
				if (positions.hasOwnProperty(axis)) {
					position = positions[axis];

					// If the position is to the left/top, no further modification required
					if (position >= 0) {
						distances[axis] = position;

					// If it's within the bounds, use -1
					} else if (position > _metrics.scrollEnd[axis]) {
						distances[axis] = -1;

					// Otherwise, amend by the distance of the maximum edge
					} else {
						distances[axis] = _metrics.scrollEnd[axis] - position;
					}
				}
			}
			return distances;
		};

		/**
		 * On platforms which support it, use RequestAnimationFrame to group
		 * position updates for speed.  Starts the render process.
		 */
		_startAnimation = function _startAnimation() {
			if (_reqAnimationFrame) {
				_cancelAnimation();
				_animationFrameRequest = _reqAnimationFrame(_scheduleRender);
			}
		};

		/**
		 * On platforms which support RequestAnimationFrame, provide the rendering loop.
		 * Takes two arguments; the first is the render/position update function to
		 * be called, and the second is a string controlling the render type to
		 * allow previous changes to be cancelled - should be 'pan' or 'scroll'.
		 */
		_scheduleRender = function _scheduleRender() {
			var axis, positionUpdated;

			// If using requestAnimationFrame schedule the next update at once
			if (_reqAnimationFrame) {
				_animationFrameRequest = _reqAnimationFrame(_scheduleRender);
			}

			// Perform the draw.
			for (axis in _scrollableAxes) {
				if (_scrollableAxes.hasOwnProperty(axis) && _targetScrollPosition[axis] !== _lastScrollPosition[axis]) {
					_setAxisPosition(axis, _targetScrollPosition[axis]);
					positionUpdated = true;
				}
			}

			// If full, locked scrolling has enabled, fire any scroll and segment change events
			if (_isScrolling && positionUpdated) {
				_fireEvent('scroll', _getPosition());
				_updateSegments(false);
			}
		};

		/**
		 * Stops the animation process.
		 */
		_cancelAnimation = function _cancelAnimation() {
			if (_animationFrameRequest === false || !_cancelAnimationFrame) {
				return;
			}

			_cancelAnimationFrame(_animationFrameRequest);
			_animationFrameRequest = false;
		};

		/**
		 * Remove then re-set event handlers
		 */
		_resetEventHandlers = function() {
			_removeEventHandlers();
			_addEventHandlers();
		};

		/**
		 * Register event handlers
		 */
		_addEventHandlers = function _addEventHandlers() {
			var MutationObserver;

			// Only remove the event if the node exists (DOM elements can go away)
			if (!_containerNode) {
				return;
			}

			if (_trackPointerEvents && !_instanceOptions.disabledInputMethods.pointer) {
				if (_pointerEventsPrefixed) {
					_containerNode.addEventListener('MSPointerDown', _onPointerDown);
					_containerNode.addEventListener('MSPointerMove', _onPointerMove);
					_containerNode.addEventListener('MSPointerUp', _onPointerUp);
					_containerNode.addEventListener('MSPointerCancel', _onPointerCancel);
				} else {
					_containerNode.addEventListener('pointerdown', _onPointerDown);
					_containerNode.addEventListener('pointermove', _onPointerMove);
					_containerNode.addEventListener('pointerup', _onPointerUp);
					_containerNode.addEventListener('pointercancel', _onPointerCancel);
				}
			} else {
				if (_trackTouchEvents && !_instanceOptions.disabledInputMethods.touch) {
					_containerNode.addEventListener('touchstart', _onTouchStart);
					_containerNode.addEventListener('touchmove', _onTouchMove);
					_containerNode.addEventListener('touchend', _onTouchEnd);
					_containerNode.addEventListener('touchcancel', _onTouchEnd);
				}
				if (!_instanceOptions.disabledInputMethods.mouse) {
					_containerNode.addEventListener('mousedown', _onMouseDown);
				}
			}
			if (!_instanceOptions.disabledInputMethods.scroll) {
				_containerNode.addEventListener('DOMMouseScroll', _onMouseScroll);
				_containerNode.addEventListener('mousewheel', _onMouseScroll);
			}

			// If any of the input methods which would eventually trigger a click are
			// enabled, add a click event listener so that phantom clicks can be prevented
			// at the end of a scroll. Otherwise, don't add a listener and don't prevent
			// clicks.
			if (!_instanceOptions.disabledInputMethods.mouse || !_instanceOptions.disabledInputMethods.touch || !_instanceOptions.disabledInputMethods.pointer) {

				// Add a click listener.  On IE, add the listener to the document, to allow
				// clicks to be cancelled if a scroll ends outside the bounds of the container; on
				// other platforms, add to the container node.
				if (_trackPointerEvents) {
					document.addEventListener('click', _onClick, true);
				} else {
					_containerNode.addEventListener('click', _onClick, true);
				}
			}

			// Watch for changes inside the contained element to update bounds - de-bounced slightly.
			if (!_instanceOptions.disabledInputMethods.focus) {
				_contentParentNode.addEventListener('focus', _childFocused);
			}
			if (_instanceOptions.updateOnChanges) {

				// Try and reuse the old, disconnected observer instance if available
				// Otherwise, check for support before proceeding
				if (!_mutationObserver) {
					MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window[_vendorStylePropertyPrefix + 'MutationObserver'];
					if (MutationObserver) {
						_mutationObserver = new MutationObserver(_domChanged);
					}
				}

				if (_mutationObserver) {
					_mutationObserver.observe(_contentParentNode, {
						childList: true,
						characterData: true,
						subtree: true
					});
				} else {
					_contentParentNode.addEventListener('DOMSubtreeModified', function (e) {

						// Ignore changes to nested FT Scrollers - even updating a transform style
						// can trigger a DOMSubtreeModified in IE, causing nested scrollers to always
						// favour the deepest scroller as parent scrollers 'resize'/end scrolling.
						if (e && (e.srcElement === _contentParentNode || e.srcElement.className.indexOf('ftscroller_') !== -1)) {
							return;
						}

						_domChanged();
					}, true);
				}
				_contentParentNode.addEventListener('load', _domChanged);
			}
			if (_instanceOptions.updateOnWindowResize) {
				window.addEventListener('resize', _domChanged);
			}
		};

		/**
		 * Remove event handlers.
		 *
		 * The current flags may not match the state when the event handlers were set up,
		 * so remove all event handlers unconditionally, just in case they're bound.
		 */
		_removeEventHandlers = function _removeEventHandlers() {

			if (_containerNode) {
				_containerNode.removeEventListener('MSPointerDown', _onPointerDown);
				_containerNode.removeEventListener('MSPointerMove', _onPointerMove);
				_containerNode.removeEventListener('MSPointerUp', _onPointerUp);
				_containerNode.removeEventListener('MSPointerCancel', _onPointerCancel);
				_containerNode.removeEventListener('pointerdown', _onPointerDown);
				_containerNode.removeEventListener('pointermove', _onPointerMove);
				_containerNode.removeEventListener('pointerup', _onPointerUp);
				_containerNode.removeEventListener('pointercancel', _onPointerCancel);
				_containerNode.removeEventListener('touchstart', _onTouchStart);
				_containerNode.removeEventListener('touchmove', _onTouchMove);
				_containerNode.removeEventListener('touchend', _onTouchEnd);
				_containerNode.removeEventListener('touchcancel', _onTouchEnd);
				_containerNode.removeEventListener('mousedown', _onMouseDown);
				_containerNode.removeEventListener('DOMMouseScroll', _onMouseScroll);
				_containerNode.removeEventListener('mousewheel', _onMouseScroll);
				_containerNode.removeEventListener('click', _onClick, true);
			}

			if (_contentParentNode) {
				_contentParentNode.removeEventListener('focus', _childFocused);
				_contentParentNode.removeEventListener('DOMSubtreeModified', _domChanged);
				_contentParentNode.removeEventListener('load', _domChanged);
			}

			if (_mutationObserver) {
				_mutationObserver.disconnect();
			}

			document.removeEventListener('mousemove', _onMouseMove);
			document.removeEventListener('mouseup', _onMouseUp);
			document.removeEventListener('click', _onClick, true);
			window.removeEventListener('resize', _domChanged);
		};

		/**
		 * Touch event handlers
		 */
		_onTouchStart = function _onTouchStart(startEvent) {
			var i, l, touchEvent;

			// If a touch is already active, ensure that the index
			// is mapped to the correct finger, and return.
			if (_inputIdentifier) {
				for (i = 0, l = startEvent.touches.length; i < l; i = i + 1) {
					if (startEvent.touches[i].identifier === _inputIdentifier) {
						_inputIndex = i;
					}
				}
				return;
			}

			// Track the new touch's identifier, reset index, and pass
			// the coordinates to the scroll start function.
			touchEvent = startEvent.touches[0];
			_inputIdentifier = touchEvent.identifier;
			_inputIndex = 0;
			_startScroll(touchEvent.clientX, touchEvent.clientY, startEvent.timeStamp, startEvent);
		};
		_onTouchMove = function _onTouchMove(moveEvent) {
			if (_inputIdentifier === false) {
				return;
			}

			// Get the coordinates from the appropriate touch event and
			// pass them on to the scroll handler
			var touchEvent = moveEvent.touches[_inputIndex];
			_updateScroll(touchEvent.clientX, touchEvent.clientY, moveEvent.timeStamp, moveEvent);
		};
		_onTouchEnd = function _onTouchEnd(endEvent) {
			var i, l;

			// Check whether the original touch event is still active,
			// if it is, update the index and return.
			if (endEvent.touches) {
				for (i = 0, l = endEvent.touches.length; i < l; i = i + 1) {
					if (endEvent.touches[i].identifier === _inputIdentifier) {
						_inputIndex = i;
						return;
					}
				}
			}

			// Complete the scroll.  Note that touch end events
			// don't capture coordinates.
			_endScroll(endEvent.timeStamp, endEvent);
		};

		/**
		 * Mouse event handlers
		 */
		_onMouseDown = function _onMouseDown(startEvent) {

			// Don't track the right mouse buttons, or a context menu
			if ((startEvent.button && startEvent.button === 2) || startEvent.ctrlKey) {
				return;
			}

			// Capture if possible
			if (_containerNode.setCapture) {
				_containerNode.setCapture();
			}

			// Add move & up handlers to the *document* to allow handling outside the element
			document.addEventListener('mousemove', _onMouseMove, true);
			document.addEventListener('mouseup', _onMouseUp, true);

			_inputIdentifier = startEvent.button || 1;
			_inputIndex = 0;
			_startScroll(startEvent.clientX, startEvent.clientY, startEvent.timeStamp, startEvent);
		};
		_onMouseMove = function _onMouseMove(moveEvent) {
			if (!_inputIdentifier) {
				return;
			}

			_updateScroll(moveEvent.clientX, moveEvent.clientY, moveEvent.timeStamp, moveEvent);
		};
		_onMouseUp = function _onMouseUp(endEvent) {
			if (endEvent.button && endEvent.button !== _inputIdentifier) {
				return;
			}

			document.removeEventListener('mousemove', _onMouseMove, true);
			document.removeEventListener('mouseup', _onMouseUp, true);

			// Release capture if possible
			if (_containerNode.releaseCapture) {
				_containerNode.releaseCapture();
			}

			_endScroll(endEvent.timeStamp, endEvent);
		};

		/**
		 * Pointer event handlers
		 */
		_onPointerDown = function _onPointerDown(startEvent) {

			// If there is already a pointer event being tracked, ignore subsequent.
			// However, if this pointer is seen as the primary pointer, override that.
			if (_inputIdentifier && !startEvent.isPrimary) {
				return;
			}

			// Disable specific input types if specified in the config.  Separate
			// out touch and other events (eg treat both pen and mouse as "mouse")
			if (startEvent.pointerType === _pointerTypeTouch) {
				if (_instanceOptions.disabledInputMethods.touch) {
					return;
				}
			} else if (_instanceOptions.disabledInputMethods.mouse) {
				return;
			}

			_inputIdentifier = startEvent.pointerId;
			_startScroll(startEvent.clientX, startEvent.clientY, startEvent.timeStamp, startEvent);
		};
		_onPointerMove = function _onPointerMove(moveEvent) {
			if (_inputIdentifier !== moveEvent.pointerId) {
				return;
			}
			_updateScroll(moveEvent.clientX, moveEvent.clientY, moveEvent.timeStamp, moveEvent);
		};
		_onPointerUp = function _onPointerUp(endEvent) {
			if (_inputIdentifier !== endEvent.pointerId) {
				return;
			}

			_endScroll(endEvent.timeStamp, endEvent);
		};
		_onPointerCancel = function _onPointerCancel(endEvent) {
			_endScroll(endEvent.timeStamp, endEvent);
		};
		_onPointerCaptureEnd = function _onPointerCaptureEnd(event) {

			// On pointer capture end - which can happen because of another element
			// releasing pointer capture - don't end scrolling, but do track that
			// input capture has been lost.  This will result in pointers leaving
			// the window possibly being lost, but further interactions will fix
			// the tracking again.
			_inputCaptured = false;
		};


		/**
		 * Prevents click actions if appropriate
		 */
		_onClick = function _onClick(clickEvent) {

			// If a scroll action hasn't resulted in the next scroll being prevented, and a scroll
			// isn't currently in progress with a different identifier, allow the click
			if (!_preventClick) {
				return true;
			}

			// Prevent clicks using the preventDefault() and stopPropagation() handlers on the event;
			// this is safe even in IE10 as this is always a "true" event, never a window.event.
			clickEvent.preventDefault();
			clickEvent.stopPropagation();
			if (!_inputIdentifier) {
				_preventClick = false;
			}
			return false;
		};


		/**
		 * Process scroll wheel/input actions as scroller scrolls
		 */
		_onMouseScroll = function _onMouseScroll(event) {
			var scrollDeltaX, scrollDeltaY;
			if (_inputIdentifier !== 'scrollwheel') {
				if (_inputIdentifier !== false) {
					return true;
				}
				_inputIdentifier = 'scrollwheel';
				_cumulativeScroll.x = 0;
				_cumulativeScroll.y = 0;

				// Start a scroll event
				if (!_startScroll(event.clientX, event.clientY, Date.now(), event)) {
					return;
				}
			}

			// Convert the scrollwheel values to a scroll value
			if (event.wheelDelta) {
				if (event.wheelDeltaX) {
					scrollDeltaX = event.wheelDeltaX / 2;
					scrollDeltaY = event.wheelDeltaY / 2;
				} else {
					scrollDeltaX = 0;
					scrollDeltaY = event.wheelDelta / 2;
				}
			} else {
				if (event.axis && event.axis === event.HORIZONTAL_AXIS) {
					scrollDeltaX = event.detail * -10;
					scrollDeltaY = 0;
				} else {
					scrollDeltaX = 0;
					scrollDeltaY = event.detail * -10;
				}
			}

			// If the scroller is constrained to an x axis, convert y scroll to allow single-axis scroll
			// wheels to scroll constrained content.
			if (!_instanceOptions.scrollingY && !scrollDeltaX) {
				scrollDeltaX = scrollDeltaY;
				scrollDeltaY = 0;
			}

			_cumulativeScroll.x = Math.round(_cumulativeScroll.x + scrollDeltaX);
			_cumulativeScroll.y = Math.round(_cumulativeScroll.y + scrollDeltaY);

			_updateScroll(_gestureStart.x + _cumulativeScroll.x, _gestureStart.y + _cumulativeScroll.y, event.timeStamp, event);

			// End scrolling state
			if (_scrollWheelEndDebouncer) {
				clearTimeout(_scrollWheelEndDebouncer);
			}
			_scrollWheelEndDebouncer = setTimeout(function () {
				_releaseInputCapture();
				_inputIdentifier = false;
				_isScrolling = false;
				_preventClick = false;
				_isDisplayingScroll = false;
				_ftscrollerMoving = false;
				if (_instanceOptions.windowScrollingActiveFlag) {
					window[_instanceOptions.windowScrollingActiveFlag] = false;
				}
				_cancelAnimation();
				if (!_snapScroll()) {
					_finalizeScroll();
				}
			}, 300);
		};

		/**
		 * Capture and release input support, particularly allowing tracking
		 * of Metro pointers outside the docked view.  Note that _releaseInputCapture
		 * should be called before the input identifier is cleared.
		 */
		_captureInput = function _captureInput() {
			if (_inputCaptured || _inputIdentifier === false || _inputIdentifier === 'scrollwheel') {
				return;
			}
			if (_trackPointerEvents) {
				_containerNode[_setPointerCapture](_inputIdentifier);
				_containerNode.addEventListener(_lostPointerCapture, _onPointerCaptureEnd, false);
			}
			_inputCaptured = true;
		};
		_releaseInputCapture = function _releaseInputCapture() {
			if (!_inputCaptured) {
				return;
			}
			if (_trackPointerEvents) {
				_containerNode.removeEventListener(_lostPointerCapture, _onPointerCaptureEnd, false);
				_containerNode[_releasePointerCapture](_inputIdentifier);
			}
			_inputCaptured = false;
		};

		/**
		 * Utility function acting as a getBoundingClientRect polyfill.
		 */
		_getBoundingRect = function _getBoundingRect(anElement) {
			if (anElement.getBoundingClientRect) {
				return anElement.getBoundingClientRect();
			}

			var x = 0, y = 0, eachElement = anElement;
			while (eachElement) {
				x = x + eachElement.offsetLeft - eachElement.scrollLeft;
				y = y + eachElement.offsetTop - eachElement.scrollTop;
				eachElement = eachElement.offsetParent;
			}
			return { left: x, top: y, width: anElement.offsetWidth, height: anElement.offsetHeight };
		};


		/*                     Instantiation                     */

		// Set up the DOM node if appropriate
		_initializeDOM();

		// Update sizes
		_updateDimensions();

		// Set up the event handlers
		_addEventHandlers();

		// Define a public API to be returned at the bottom - this is the public-facing interface.
		_publicSelf = {
			destroy: destroy,
			setSnapSize: setSnapSize,
			scrollTo: scrollTo,
			scrollBy: scrollBy,
			updateDimensions: updateDimensions,
			addEventListener: addEventListener,
			removeEventListener: removeEventListener,
			setDisabledInputMethods: setDisabledInputMethods
		};

		if (Object.defineProperties) {
			Object.defineProperties(_publicSelf, {
				'scrollHeight': {
					get: function() { return _metrics.content.y; },
					set: function(value) { throw new SyntaxError('scrollHeight is currently read-only - ignoring ' + value); }
				},
				'scrollLeft': {
					get: function() { return -_lastScrollPosition.x; },
					set: function(value) { scrollTo(value, false, false); return -_lastScrollPosition.x; }
				},
				'scrollTop': {
					get: function() { return -_lastScrollPosition.y; },
					set: function(value) { scrollTo(false, value, false); return -_lastScrollPosition.y; }
				},
				'scrollWidth': {
					get: function() { return _metrics.content.x; },
					set: function(value) { throw new SyntaxError('scrollWidth is currently read-only - ignoring ' + value); }
				},
				'segmentCount': {
					get: function() {
						if (!_instanceOptions.snapping) {
							return { x: NaN, y: NaN };
						}
						return {
							x: Math.ceil(_metrics.content.x / _snapGridSize.x),
							y: Math.ceil(_metrics.content.y / _snapGridSize.y)
						};
					},
					set: function(value) { throw new SyntaxError('segmentCount is currently read-only - ignoring ' + value); }
				},
				'currentSegment': {
					get: function() { return { x: _activeSegment.x, y: _activeSegment.y }; },
					set: function(value) { throw new SyntaxError('currentSegment is currently read-only - ignoring ' + value); }
				},
				'contentContainerNode': {
					get: function() { return _contentParentNode; },
					set: function(value) { throw new SyntaxError('contentContainerNode is currently read-only - ignoring ' + value); }
				}
			});
		}

		// Return the public interface.
		return _publicSelf;
	};


	/*          Prototype Functions and Properties           */

	/**
	 * The HTML to prepend to the scrollable content to wrap it. Used internally,
	 * and may be used to pre-wrap scrollable content.  Axes can optionally
	 * be excluded for speed improvements.
	 */
	FTScroller.prototype.getPrependedHTML = function (excludeXAxis, excludeYAxis, hwAccelerationClass) {
		if (!hwAccelerationClass) {
			if (typeof FTScrollerOptions === 'object' && FTScrollerOptions.hwAccelerationClass) {
				hwAccelerationClass = FTScrollerOptions.hwAccelerationClass;
			} else {
				hwAccelerationClass = 'ftscroller_hwaccelerated';
			}
		}

		var output = '<div class="ftscroller_container">';
		if (!excludeXAxis) {
			output += '<div class="ftscroller_x ' + hwAccelerationClass + '">';
		}
		if (!excludeYAxis) {
			output += '<div class="ftscroller_y ' + hwAccelerationClass + '">';
		}

		return output;
	};

	/**
	 * The HTML to append to the scrollable content to wrap it; again, used internally,
	 * and may be used to pre-wrap scrollable content.
	 */
	FTScroller.prototype.getAppendedHTML = function (excludeXAxis, excludeYAxis, hwAccelerationClass, scrollbars) {
		if (!hwAccelerationClass) {
			if (typeof FTScrollerOptions === 'object' && FTScrollerOptions.hwAccelerationClass) {
				hwAccelerationClass = FTScrollerOptions.hwAccelerationClass;
			} else {
				hwAccelerationClass = 'ftscroller_hwaccelerated';
			}
		}

		var output = '';
		if (!excludeXAxis) {
			output += '</div>';
		}
		if (!excludeYAxis) {
			output += '</div>';
		}
		if (scrollbars) {
			if (!excludeXAxis) {
				output += '<div class="ftscroller_scrollbar ftscroller_scrollbarx ' + hwAccelerationClass + '"><div class="ftscroller_scrollbarinner"></div></div>';
			}
			if (!excludeYAxis) {
				output += '<div class="ftscroller_scrollbar ftscroller_scrollbary ' + hwAccelerationClass + '"><div class="ftscroller_scrollbarinner"></div></div>';
			}
		}
		output += '</div>';

		return output;
	};
}());


(function () {
	'use strict';

	function clamp(value) {
		if (value > 1.0) return 1.0;
		if (value < 0.0) return 0.0;
		return value;
	}

	/**
	 * Represents a two-dimensional cubic bezier curve with the starting
	 * point (0, 0) and the end point (1, 1). The two control points p1 and p2
	 * have x and y coordinates between 0 and 1.
	 *
	 * This type of bezier curves can be used as CSS transform timing functions.
	 */
	CubicBezier = function (p1x, p1y, p2x, p2y) {
		// Control points
		this._p1 = { x: clamp(p1x), y: clamp(p1y) };
		this._p2 = { x: clamp(p2x), y: clamp(p2y) };
	};

	CubicBezier.prototype._getCoordinateForT = function (t, p1, p2) {
		var c = 3 * p1,
			b = 3 * (p2 - p1) - c,
			a = 1 - c - b;

		return ((a * t + b) * t + c) * t;
	};

	CubicBezier.prototype._getCoordinateDerivateForT = function (t, p1, p2) {
		var c = 3 * p1,
			b = 3 * (p2 - p1) - c,
			a = 1 - c - b;

		return (3 * a * t + 2 * b) * t + c;
	};

	CubicBezier.prototype._getTForCoordinate = function (c, p1, p2, epsilon) {
		if (!isFinite(epsilon) || epsilon <= 0) {
			throw new RangeError('"epsilon" must be a number greater than 0.');
		}
		var t2, i, c2, d2;

		// First try a few iterations of Newton's method -- normally very fast.
		for (t2 = c, i = 0; i < 8; i = i + 1) {
			c2 = this._getCoordinateForT(t2, p1, p2) - c;
			if (Math.abs(c2) < epsilon) {
				return t2;
			}
			d2 = this._getCoordinateDerivateForT(t2, p1, p2);
			if (Math.abs(d2) < 1e-6) {
				break;
			}
			t2 = t2 - c2 / d2;
		}

		// Fall back to the bisection method for reliability.
		t2 = c;
		var t0 = 0,
			t1 = 1;

		if (t2 < t0) {
			return t0;
		}
		if (t2 > t1) {
			return t1;
		}

		while (t0 < t1) {
			c2 = this._getCoordinateForT(t2, p1, p2);
			if (Math.abs(c2 - c) < epsilon) {
				return t2;
			}
			if (c > c2) {
				t0 = t2;
			} else {
				t1 = t2;
			}
			t2 = (t1 - t0) * 0.5 + t0;
		}

		// Failure.
		return t2;
	};

	/**
	 * Computes the point for a given t value.
	 *
	 * @param {number} t
	 * @returns {Object} Returns an object with x and y properties
	 */
	CubicBezier.prototype.getPointForT = function (t) {

		// Special cases: starting and ending points
		if (t === 0 || t === 1) {
			return { x: t, y: t };
		}

		// Check for correct t value (must be between 0 and 1)
		if (t < 0 || t > 1) {
			_throwRangeError('t', t);
		}

		return {
			x: this._getCoordinateForT(t, this._p1.x, this._p2.x),
			y: this._getCoordinateForT(t, this._p1.y, this._p2.y)
		};
	};

	CubicBezier.prototype.getTForX = function (x, epsilon) {
		return this._getTForCoordinate(x, this._p1.x, this._p2.x, epsilon);
	};

	CubicBezier.prototype.getTForY = function (y, epsilon) {
		return this._getTForCoordinate(y, this._p1.y, this._p2.y, epsilon);
	};

	/**
	 * Computes auxiliary points using De Casteljau's algorithm.
	 *
	 * @param {number} t must be greater than 0 and lower than 1.
	 * @returns {Object} with members i0, i1, i2 (first iteration),
	 *    j1, j2 (second iteration) and k (the exact point for t)
	 */
	CubicBezier.prototype._getAuxPoints = function (t) {
		if (t <= 0 || t >= 1) {
			_throwRangeError('t', t);
		}


		/* First series of auxiliary points */

		// First control point of the left curve
		var i0 = {
				x: t * this._p1.x,
				y: t * this._p1.y
			},
			i1 = {
				x: this._p1.x + t * (this._p2.x - this._p1.x),
				y: this._p1.y + t * (this._p2.y - this._p1.y)
			},

			// Second control point of the right curve
			i2  = {
				x: this._p2.x + t * (1 - this._p2.x),
				y: this._p2.y + t * (1 - this._p2.y)
			};


		/* Second series of auxiliary points */

		// Second control point of the left curve
		var j0 = {
				x: i0.x + t * (i1.x - i0.x),
				y: i0.y + t * (i1.y - i0.y)
			},

			// First control point of the right curve
			j1 = {
				x: i1.x + t * (i2.x - i1.x),
				y: i1.y + t * (i2.y - i1.y)
			};

		// The division point (ending point of left curve, starting point of right curve)
		var k = {
				x: j0.x + t * (j1.x - j0.x),
				y: j0.y + t * (j1.y - j0.y)
			};

		return {
			i0: i0,
			i1: i1,
			i2: i2,
			j0: j0,
			j1: j1,
			k: k
		};
	};

	/**
	 * Divides the bezier curve into two bezier functions.
	 *
	 * De Casteljau's algorithm is used to compute the new starting, ending, and
	 * control points.
	 *
	 * @param {number} t must be greater than 0 and lower than 1.
	 *     t === 1 or t === 0 are the starting/ending points of the curve, so no
	 *     division is needed.
	 *
	 * @returns {CubicBezier[]} Returns an array containing two bezier curves
	 *     to the left and the right of t.
	 */
	CubicBezier.prototype.divideAtT = function (t) {
		if (t < 0 || t > 1) {
			_throwRangeError('t', t);
		}

		// Special cases t = 0, t = 1: Curve can be cloned for one side, the other
		// side is a linear curve (with duration 0)
		if (t === 0 || t === 1) {
			var curves = [];
			curves[t] = CubicBezier.linear();
			curves[1 - t] = this.clone();
			return curves;
		}

		var left = {},
			right = {},
			points = this._getAuxPoints(t);

		var i0 = points.i0,
			i2 = points.i2,
			j0 = points.j0,
			j1 = points.j1,
			k = points.k;

		// Normalize derived points, so that the new curves starting/ending point
		// coordinates are (0, 0) respectively (1, 1)
		var factorX = k.x,
			factorY = k.y;

		left.p1 = {
			x: i0.x / factorX,
			y: i0.y / factorY
		};
		left.p2 = {
			x: j0.x / factorX,
			y: j0.y / factorY
		};

		right.p1 = {
			x: (j1.x - factorX) / (1 - factorX),
			y: (j1.y - factorY) / (1 - factorY)
		};

		right.p2 = {
			x: (i2.x - factorX) / (1 - factorX),
			y: (i2.y - factorY) / (1 - factorY)
		};

		return [
			new CubicBezier(left.p1.x, left.p1.y, left.p2.x, left.p2.y),
			new CubicBezier(right.p1.x, right.p1.y, right.p2.x, right.p2.y)
		];
	};

	CubicBezier.prototype.divideAtX = function (x, epsilon) {
		if (x < 0 || x > 1) {
			_throwRangeError('x', x);
		}

		var t = this.getTForX(x, epsilon);
		return this.divideAtT(t);
	};

	CubicBezier.prototype.divideAtY = function (y, epsilon) {
		if (y < 0 || y > 1) {
			_throwRangeError('y', y);
		}

		var t = this.getTForY(y, epsilon);
		return this.divideAtT(t);
	};

	CubicBezier.prototype.clone = function () {
		return new CubicBezier(this._p1.x, this._p1.y, this._p2.x, this._p2.y);
	};

	CubicBezier.prototype.toString = function () {
		return "cubic-bezier(" + [
			this._p1.x,
			this._p1.y,
			this._p2.x,
			this._p2.y
		].join(", ") + ")";
	};

	CubicBezier.linear = function () {
		return new CubicBezier();
	};

	CubicBezier.ease = function () {
		return new CubicBezier(0.25, 0.1, 0.25, 1.0);
	};
	CubicBezier.linear = function () {
		return new CubicBezier(0.0, 0.0, 1.0, 1.0);
	};
	CubicBezier.easeIn = function () {
		return new CubicBezier(0.42, 0, 1.0, 1.0);
	};
	CubicBezier.easeOut = function () {
		return new CubicBezier(0, 0, 0.58, 1.0);
	};
	CubicBezier.easeInOut = function () {
		return new CubicBezier(0.42, 0, 0.58, 1.0);
	};
}());

if (typeof define !== 'undefined' && define.amd) {
	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return {
			FTScroller: FTScroller,
			CubicBezier: CubicBezier
		};
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = function(domNode, options) {
		'use strict';
		return new FTScroller(domNode, options);
	};

	module.exports.FTScroller = FTScroller;
	module.exports.CubicBezier = CubicBezier;
}
