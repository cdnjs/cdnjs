/**
 *
 * Version: 0.1.0
 * Author: Gianluca Guarini
 * Contact: gianluca.guarini@gmail.com
 * Website: http://www.gianlucaguarini.com/
 * Twitter: @gianlucaguarini
 *
 * Copyright (c) 2013 Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/

(function(doc, win) {
	'use strict';
	if (typeof doc.createEvent !== 'function') return false; // no tap events here
	// helpers
	var useJquery = typeof jQuery !== 'undefined',
		// some helpers borrowed from https://github.com/WebReflection/ie-touch
		msPointerEnabled = !!navigator.pointerEnabled || navigator.msPointerEnabled,
		isTouch = (!!('ontouchstart' in window) && navigator.userAgent.indexOf('PhantomJS') < 0) || msPointerEnabled,
		msEventType = function(type) {
			var lo = type.toLowerCase(),
				ms = 'MS' + type;
			return navigator.msPointerEnabled ? ms : lo;
		},
		touchevents = {
			touchstart: msEventType('PointerDown') + ' touchstart',
			touchend: msEventType('PointerUp') + ' touchend',
			touchmove: msEventType('PointerMove') + ' touchmove'
		},
		setListener = function(elm, events, callback) {
			var eventsArray = events.split(' '),
				i = eventsArray.length;

			while (i--) {
				elm.addEventListener(eventsArray[i], callback, false);
			}
		},
		getPointerEvent = function(event) {
			return event.targetTouches ? event.targetTouches[0] : event;
		},
		sendEvent = function(elm, eventName, originalEvent, data) {
			var customEvent = doc.createEvent('Event');
			data = data || {};
			data.x = currX;
			data.y = currY;
			data.distance = data.distance;
			if (useJquery)
				jQuery(elm).trigger(eventName, data);
			else {
				customEvent.originalEvent = originalEvent;
				for (var key in data) {
					customEvent[key] = data[key];
				}
				customEvent.initEvent(eventName, true, true);
				elm.dispatchEvent(customEvent);
			}
		},
		onTouchStart = function(e) {

			var pointer = getPointerEvent(e);
			// caching the current x
			cachedX = currX = pointer.pageX;
			// caching the current y
			cachedY = currY = pointer.pageY;
			// a touch event is detected
			touchStarted = true;
			tapNum++;
			// detecting if after 200ms the finger is still in the same position
			clearTimeout(tapTimer);
			tapTimer = setTimeout(function() {
				if (
					cachedX >= currX - precision &&
					cachedX <= currX + precision &&
					cachedY >= currY - precision &&
					cachedY <= currY + precision &&
					!touchStarted
				) {
					// Here you get the Tap event
					sendEvent(e.target, (tapNum === 2) ? 'dbltap' : 'tap', e);
				}
				tapNum = 0;
			}, taptreshold);

		},
		onTouchEnd = function(e) {
			var eventsArr = [],
				deltaY = cachedY - currY,
				deltaX = cachedX - currX;
			touchStarted = false;

			if (deltaX <= -swipeTreshold)
				eventsArr.push('swiperight');

			if (deltaX >= swipeTreshold)
				eventsArr.push('swipeleft');

			if (deltaY <= -swipeTreshold)
				eventsArr.push('swipedown');

			if (deltaY >= swipeTreshold)
				eventsArr.push('swipeup');
			if (eventsArr.length) {
				for (var i = 0; i < eventsArr.length; i++) {
					var eventName = eventsArr[i];
					sendEvent(e.target, eventName, e, {
						distance: {
							x: Math.abs(deltaX),
							y: Math.abs(deltaY)
						}
					});
				}
			}
		},
		onTouchMove = function(e) {
			var pointer = getPointerEvent(e);
			currX = pointer.pageX;
			currY = pointer.pageY;
		},
		touchStarted = false, // detect if a touch event is sarted
		swipeTreshold = win.SWIPE_TRESHOLD || 80,
		taptreshold = win.TAP_TRESHOLD || 200,
		precision = win.TAP_PRECISION / 2 || 60 / 2, // touch events boundaries ( 60px by default )
		justTouchEvents = win.JUST_ON_TOUCH_DEVICES || isTouch,
		tapNum = 0,
		currX, currY, cachedX, cachedY, tapTimer;

	//setting the events listeners
	setListener(doc, touchevents.touchstart + (justTouchEvents ? '' : ' mousedown'), onTouchStart);
	setListener(doc, touchevents.touchend + (justTouchEvents ? '' : ' mouseup'), onTouchEnd);
	setListener(doc, touchevents.touchmove + (justTouchEvents ? '' : ' mousemove'), onTouchMove);
}(document, window));