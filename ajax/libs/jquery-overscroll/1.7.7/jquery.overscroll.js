/**
 * Overscroll 1.7.7
 *  Touch scrolling for the browser
 *  http://azoff.github.io/overscroll/
 *
 * Intended for use with the latest jQuery
 *  http://code.jquery.com/jquery-latest.js
 *  
 * Copyright 2014, Jonathan Azoff
 * Licensed under the MIT license.
 *  https://github.com/azoff/overscroll/blob/master/mit.license
 *
 * For API documentation, see the README file
 *  http://azof.fr/pYCzuM
 *
 * Date: Wednesday, February 11th 2014
 */
/*! Overscroll 1.7.7 | (c) 2014 Jon Azoff | http://azof.fr/pYCzuM */
(function(global, dom, browser, math, wait, cancel, namespace, $, none){

	// We want to run overscroll in strict-mode
	// so that we may benefit from its optimizations
	'use strict';

	// The key used to bind-instance specific data to an object
	var datakey = 'overscroll';

	// These are all the events that could possibly
	// be used by the plug-in
	var events = {
		drag:       'mousemove touchmove',
		end:        'mouseup mouseleave click touchend touchcancel',
		hover:      'mouseenter mouseleave',
		ignored:    'select dragstart drag',
		scroll:     'scroll',
		start:      'mousedown touchstart',
		wheel:      'mousewheel DOMMouseScroll'
	};

	// These settings are used to tweak drift settings
	// for the plug-in
	var settings = {
		captureThreshold: 3,
		driftDecay:       1.1,
		driftSequences:   22,
		driftTimeout:     100,
		scrollDelta:      15,
		thumbOpacity:     0.7,
		thumbThickness:   6,
		thumbTimeout:     400,
		wheelDelta:       20,
		wheelTicks:       120
	};

	// These defaults are used to complement any options
	// passed into the plug-in entry point
	var defaults = {
		cancelOn:       'select,input,textarea',
		direction:      'multi',
		dragHold:       false,
		hoverThumbs:    false,
		scrollDelta:    settings.scrollDelta,
		showThumbs:     true,
		persistThumbs:  false,
		captureWheel:   true,
		wheelDelta:     settings.wheelDelta,
		wheelDirection: 'multi',
		zIndex:         999,
		ignoreSizing:   false,
		thumbColor:     'black'
	};

	// runs feature detection for overscroll
	function compat() {

		// memoize for lazy-loading
		if (compat.memo) { return compat.memo; }

		// find an animator function
		var animator = global.requestAnimationFrame    ||
			global.webkitRequestAnimationFrame         ||
			global.mozRequestAnimationFrame            ||
			global.oRequestAnimationFrame              ||
			global.msRequestAnimationFrame             ||
			function(callback) { wait(callback, 1000/60); };

		var nobody = dom.body === null;
		if (nobody) {
			dom.documentElement.appendChild(dom.createElement('body'));
		}

		// find the name of the overflow scrolling style
		var overflowScrollingStyle = '';
		(function(){
			var div = dom.createElement('div');
			var prefixes = ['webkit', 'moz', 'o', 'ms'];

			dom.body.appendChild(div);
			$.each(prefixes, function(i, prefix){
				div.style[prefix + 'OverflowScrolling'] = 'touch';
			});

			div.style.overflowScrolling = 'touch';
			var computedStyle = global.getComputedStyle(div);
			if (!!computedStyle.overflowScrolling) {
				overflowScrollingStyle = 'overflow-scrolling';
			} else {
				$.each(prefixes, function(i, prefix){
					if (!!computedStyle[prefix + 'OverflowScrolling']) {
						overflowScrollingStyle = '-' + prefix + '-overflow-scrolling';
					}
					return !overflowScrollingStyle;
				});
			}
			div.parentNode.removeChild(div);
		})();

		// find the cursor styles
		var cursorStyles = {};
		(function() {
			var div = dom.createElement('div');
			var prefixes = ['webkit', 'moz'];
			var gmail = 'https://mail.google.com/mail/images/2/';
			cursorStyles = {
				grab:     'url('+gmail+'openhand.cur), move',
				grabbing: 'url('+gmail+'closedhand.cur), move'
			};
			dom.body.appendChild(div);
			$.each(prefixes, function(i, prefix){
				var found, cursor = '-' + prefix + '-grab';
				div.style.cursor = cursor;
				var computedStyle = global.getComputedStyle(div);
				found = computedStyle.cursor === cursor;
				if (found) {
					cursorStyles = {
						grab:     '-' + prefix + '-grab',
						grabbing: '-' + prefix + '-grabbing'
					};
				}
				return !found;
			});
			div.parentNode.removeChild(div);
			return cursorStyles;
		})();

		compat.memo = {
			animate: function(cb) { return animator.call(global, cb); },
			overflowScrolling: overflowScrollingStyle,
			cursor: cursorStyles
		};

		// remove generated body
		if (nobody) {
			dom.documentElement.removeChild(dom.body);
		}

		return compat.memo;

	}

	// Triggers a DOM event on the overscrolled element.
	// All events are namespaced under the overscroll name
	function triggerEvent(event, target) {
		target.trigger('overscroll:' + event);
	}

	// Utility function to return a timestamp
	function time() {
		return (new Date()).getTime();
	}

	// Captures the position from an event, modifies the properties
	// of the second argument to persist the position, and then
	// returns the modified object
	function capturePosition(event, position, index) {
		position.x = event.pageX;
		position.y = event.pageY;
		position.time = time();
		position.index = index;
		return position;
	}

	// Used to move the thumbs around an overscrolled element
	function moveThumbs(thumbs, sizing, left, top) {

		var ml, mt;

		if (thumbs && thumbs.added) {
			if (thumbs.horizontal) {
				ml = left * (1 + sizing.container.width / sizing.container.scrollWidth);
				mt = top + sizing.thumbs.horizontal.top;
				thumbs.horizontal.css('margin', mt + 'px 0 0 ' + ml + 'px');
			}
			if (thumbs.vertical) {
				ml = left + sizing.thumbs.vertical.left;
				mt = top * (1 + sizing.container.height / sizing.container.scrollHeight);
				thumbs.vertical.css('margin', mt + 'px 0 0 ' + ml + 'px');
			}
		}

	}

	// Used to toggle the thumbs on and off
	// of an overscrolled element
	function toggleThumbs(thumbs, options, dragging) {
		if (thumbs && thumbs.added && !options.persistThumbs) {
			if (dragging) {
				if (thumbs.vertical) {
					thumbs.vertical.stop(true, true).fadeTo('fast', settings.thumbOpacity);
				}
				if (thumbs.horizontal) {
					thumbs.horizontal.stop(true, true).fadeTo('fast', settings.thumbOpacity);
				}
			} else {
				if (thumbs.vertical) {
					thumbs.vertical.fadeTo('fast', 0);
				}
				if (thumbs.horizontal) {
					thumbs.horizontal.fadeTo('fast', 0);
				}
			}
		}
	}

	// Defers click event listeners to after a mouseup event.
	// Used to avoid unintentional clicks
	function deferClick(target) {
		var clicks, key = 'events';
		var events = $._data ? $._data(target[0], key) : target.data(key);
		if (events && events.click) {
			clicks = events.click.slice();
			target.off('click').one('click', function(){
				$.each(clicks, function(i, click){
					target.click(click);
				}); return false;
			});
		}
	}

	// Toggles thumbs on hover. This event is only triggered
	// if the hoverThumbs option is set
	function hover(event) {
		var data = event.data,
		thumbs   = data.thumbs,
		options  = data.options,
		dragging = event.type === 'mouseenter';
		toggleThumbs(thumbs, options, dragging);
	}

	// This function is only ever used when the overscrolled element
	// scrolled outside of the scope of this plugin.
	function scroll(event) {
		var data = event.data;
		if (!data.flags.dragged) {
			/*jshint validthis:true */
			moveThumbs(data.thumbs, data.sizing, this.scrollLeft, this.scrollTop);
		}
	}

	// handles mouse wheel scroll events
	function wheel(event) {

		// prevent any default wheel behavior
		event.preventDefault();

		var data = event.data,
		options = data.options,
		sizing = data.sizing,
		thumbs = data.thumbs,
		dwheel = data.wheel,
		flags = data.flags,
		original = event.originalEvent,
		delta = 0, deltaX = 0, deltaY = 0;

		// stop any drifts
		flags.drifting = false;

		// normalize the wheel ticks
		if (original.detail) {
			delta = -original.detail;
			if (original.detailX) {
				deltaX = -original.detailX;
			}
			if (original.detailY) {
				deltaY = -original.detailY;
			}
		} else if (original.wheelDelta) {
			delta = original.wheelDelta / settings.wheelTicks;
			if (original.wheelDeltaX) {
				deltaX = original.wheelDeltaX / settings.wheelTicks;
			}
			if (original.wheelDeltaY) {
				deltaY = original.wheelDeltaY / settings.wheelTicks;
			}
		}

		// apply a pixel delta to each tick
		delta  *= options.wheelDelta;
		deltaX *= options.wheelDelta;
		deltaY *= options.wheelDelta;

		// initialize flags if this is the first tick
		if (!dwheel) {
			data.target.data(datakey).dragging = flags.dragging = true;
			data.wheel = dwheel = { timeout: null };
			toggleThumbs(thumbs, options, true);
		}

		// actually modify scroll offsets
		if (options.wheelDirection === 'vertical'){
			/*jshint validthis:true */
			this.scrollTop -= delta;
		} else if ( options.wheelDirection === 'horizontal') {
			this.scrollLeft -= delta;
		} else {
			this.scrollLeft -= deltaX;
			this.scrollTop  -= deltaY || delta;
		}

		if (dwheel.timeout) { cancel(dwheel.timeout); }

		moveThumbs(thumbs, sizing, this.scrollLeft, this.scrollTop);

		dwheel.timeout = wait(function() {
			data.target.data(datakey).dragging = flags.dragging = false;
			toggleThumbs(thumbs, options, data.wheel = null);
		}, settings.thumbTimeout);

	}

	// updates the current scroll offset during a mouse move
	function drag(event) {

		event.preventDefault();

		var data = event.data,
		touches  = event.originalEvent.touches,
		options  = data.options,
		sizing   = data.sizing,
		thumbs   = data.thumbs,
		position = data.position,
		flags    = data.flags,
		target   = data.target.get(0);


		// correct page coordinates for touch devices
		if (touches && touches.length) {
			event = touches[0];
		}

		if (!flags.dragged) {
			toggleThumbs(thumbs, options, true);
		}

		flags.dragged = true;

		if (options.direction !== 'vertical') {
			target.scrollLeft -= (event.pageX - position.x);
		}

		if (data.options.direction !== 'horizontal') {
			target.scrollTop -= (event.pageY - position.y);
		}

		capturePosition(event, data.position);

		if (--data.capture.index <= 0) {
			data.target.data(datakey).dragging = flags.dragging = true;
			capturePosition(event, data.capture, settings.captureThreshold);
		}

		moveThumbs(thumbs, sizing, target.scrollLeft, target.scrollTop);

	}

	// sends the overscrolled element into a drift
	function drift(target, event, callback) {

		var data   = event.data, dx, dy, xMod, yMod,
		capture    = data.capture,
		options    = data.options,
		sizing     = data.sizing,
		thumbs     = data.thumbs,
		elapsed    = time() - capture.time,
		scrollLeft = target.scrollLeft,
		scrollTop  = target.scrollTop,
		decay      = settings.driftDecay;

		// only drift if enough time has passed since
		// the last capture event
		if (elapsed > settings.driftTimeout) {
			callback(data); return;
		}

		// determine offset between last capture and current time
		dx = options.scrollDelta * (event.pageX - capture.x);
		dy = options.scrollDelta * (event.pageY - capture.y);

		// update target scroll offsets
		if (options.direction !== 'vertical') {
			scrollLeft -= dx;
		} if (options.direction !== 'horizontal') {
			scrollTop -= dy;
		}

		// split the distance to travel into a set of sequences
		xMod = dx / settings.driftSequences;
		yMod = dy / settings.driftSequences;

		triggerEvent('driftstart', data.target);

		data.drifting = true;

		// animate the drift sequence
		compat().animate(function render() {
			if (data.drifting) {
				var min = 1, max = -1;
				data.drifting = false;
				if (yMod > min && target.scrollTop > scrollTop || yMod < max && target.scrollTop < scrollTop) {
					data.drifting = true;
					target.scrollTop -= yMod;
					yMod /= decay;
				}
				if (xMod > min && target.scrollLeft > scrollLeft || xMod < max && target.scrollLeft < scrollLeft) {
					data.drifting = true;
					target.scrollLeft -= xMod;
					xMod /= decay;
				}
				moveThumbs(thumbs, sizing, target.scrollLeft, target.scrollTop);
				compat().animate(render);
			} else {
				triggerEvent('driftend', data.target);
				callback(data);
			}
		});

	}

	// starts the drag operation and binds the mouse move handler
	function start(event) {

		var data = event.data,
		touches  = event.originalEvent.touches,
		target   = data.target,
		dstart   = data.start = $(event.target),
		flags    = data.flags;

		// stop any drifts
		flags.drifting = false;

		// only start drag if the user has not explictly banned it.
		if (dstart.size() && !dstart.is(data.options.cancelOn)) {

			// without this the simple "click" event won't be recognized on touch clients
			if (!touches) { event.preventDefault(); }

			if (!compat().overflowScrolling) {
				target.css('cursor', compat().cursor.grabbing);
				target.data(datakey).dragging = flags.dragging = flags.dragged = false;

				// apply the drag listeners to the doc or target
				if(data.options.dragHold) {
					$(document).on(events.drag, data, drag);
				} else {
					target.on(events.drag, data, drag);
				}
			}

			data.position = capturePosition(event, {});
			data.capture = capturePosition(event, {}, settings.captureThreshold);
			triggerEvent('dragstart', target);

		}

	}

	// ends the drag operation and unbinds the mouse move handler
	function stop(event) {

		var data = event.data,
		target = data.target,
		options = data.options,
		flags = data.flags,
		thumbs = data.thumbs,

		// hides the thumbs after the animation is done
		done = function () {
			if (thumbs && !options.hoverThumbs) {
				toggleThumbs(thumbs, options, false);
			}
		};

		// remove drag listeners from doc or target
		if(options.dragHold) {
			$(document).unbind(events.drag, drag);
		} else {
			target.unbind(events.drag, drag);
		}

		// only fire events and drift if we started with a
		// valid position
		if (data.position) {

			triggerEvent('dragend', target);

			// only drift if a drag passed our threshold
			if (flags.dragging && !compat().overflowScrolling) {
				drift(target.get(0), event, done);
			} else {
				done();
			}

		}

		// only if we moved, and the mouse down is the same as
		// the mouse up target do we defer the event
		if (flags.dragging && !compat().overflowScrolling && data.start && data.start.is(event.target)) {
			deferClick(data.start);
		}

		// clear all internal flags and settings
		target.data(datakey).dragging =
			data.start     =
			data.capture   =
			data.position  =
			flags.dragged  =
			flags.dragging = false;

		// set the cursor back to normal
		target.css('cursor', compat().cursor.grab);

	}

	// Ensures that a full set of options are provided
	// for the plug-in. Also does some validation
	function getOptions(options) {

		// fill in missing values with defaults
		options = $.extend({}, defaults, options);

		// check for inconsistent directional restrictions
		if (options.direction !== 'multi' && options.direction !== options.wheelDirection) {
			options.wheelDirection = options.direction;
		}

		// ensure positive values for deltas
		options.scrollDelta = math.abs(parseFloat(options.scrollDelta));
		options.wheelDelta  = math.abs(parseFloat(options.wheelDelta));

		// fix values for scroll offset
		options.scrollLeft = options.scrollLeft === none ? null : math.abs(parseFloat(options.scrollLeft));
		options.scrollTop  = options.scrollTop  === none ? null : math.abs(parseFloat(options.scrollTop));

		return options;

	}

	// Returns the sizing information (bounding box) for the
	// target DOM element
	function getSizing(target) {

		var $target  = $(target),
		width        = $target.width(),
		height       = $target.height(),
		scrollWidth  = width >= target.scrollWidth ? width : target.scrollWidth,
		scrollHeight = height >= target.scrollHeight ? height : target.scrollHeight,
		hasScroll    = scrollWidth > width || scrollHeight > height;

		return {
			valid: hasScroll,
			container: {
				width: width,
				height: height,
				scrollWidth: scrollWidth,
				scrollHeight: scrollHeight
			},
			thumbs: {
				horizontal: {
					width: width * width / scrollWidth,
					height: settings.thumbThickness,
					corner: settings.thumbThickness / 2,
					left: 0,
					top: height - settings.thumbThickness
				},
				vertical: {
					width: settings.thumbThickness,
					height: height * height / scrollHeight,
					corner: settings.thumbThickness / 2,
					left: width - settings.thumbThickness,
					top: 0
				}
			}
		};

	}

	// Attempts to get (or implicitly creates) the
	// remover function for the target passed
	// in as an argument
	function getRemover(target, orCreate) {

		var $target = $(target), thumbs,
		data        = $target.data(datakey) || {},
		style       = $target.attr('style'),
		fallback    = orCreate ? function () {

			data = $target.data(datakey);
			thumbs = data.thumbs;

			// restore original styles (if any)
			if (style) {
				$target.attr('style', style);
			} else {
				$target.removeAttr('style');
			}

			// remove any created thumbs
			if (thumbs) {
				if (thumbs.horizontal) { thumbs.horizontal.remove(); }
				if (thumbs.vertical)   { thumbs.vertical.remove();   }
			}

			// remove any bound overscroll events and data
			$target
				.removeData(datakey)
				.off(events.wheel,      wheel)
				.off(events.start,      start)
				.off(events.end,        stop)
				.off(events.ignored,    ignore);

		} : $.noop;

		return $.isFunction(data.remover) ? data.remover : fallback;

	}

	// Genterates CSS specific to a particular thumb.
	// It requires sizing data and options
	function getThumbCss(size, options) {
		return {
			position: 'absolute',
			opacity: options.persistThumbs ? settings.thumbOpacity : 0,
			'background-color': options.thumbColor,
			width: size.width + 'px',
			height: size.height + 'px',
			'border-radius': size.corner + 'px',
			'margin': size.top + 'px 0 0 ' + size.left + 'px',
			'z-index': options.zIndex
		};
	}

	// Creates the DOM elements used as "thumbs" within
	// the target container.
	function createThumbs(target, sizing, options) {

		var div = '<div/>',
		thumbs  = {},
		css     = false;

		if (sizing.container.scrollWidth > 0 && options.direction !== 'vertical') {
			css = getThumbCss(sizing.thumbs.horizontal, options);
			thumbs.horizontal = $(div).css(css).prependTo(target);
		}

		if (sizing.container.scrollHeight > 0 && options.direction !== 'horizontal') {
			css = getThumbCss(sizing.thumbs.vertical, options);
			thumbs.vertical = $(div).css(css).prependTo(target);
		}

		thumbs.added = !!css;

		return thumbs;

	}

	// ignores events on the overscroll element
	function ignore(event) {
		event.preventDefault();
	}

	// This function takes a jQuery element, some
	// (optional) options, and sets up event metadata
	// for each instance the plug-in affects
	function setup(target, options) {

		// create initial data properties for this instance
		options = getOptions(options);
		var sizing = getSizing(target),
		thumbs, data = {
			options: options, sizing: sizing,
			flags: { dragging: false },
			remover: getRemover(target, true)
		};

		// only apply handlers if the overscrolled element
		// actually has an area to scroll
		if (sizing.valid || options.ignoreSizing) {
			// provide a circular-reference, enable events, and
			// apply any required CSS
			data.target = target = $(target).css({
				position: 'relative',
				cursor: compat().cursor.grab
			}).on(events.start, data, start)
				.on(events.end, data, stop)
				.on(events.ignored, data, ignore);

			// apply the stop listeners for drag end
			if(options.dragHold) {
				$(document).on(events.end, data, stop);
			} else {
				data.target.on(events.end, data, stop);
			}

			// apply any user-provided scroll offsets
			if (options.scrollLeft !== null) {
				target.scrollLeft(options.scrollLeft);
			} if (options.scrollTop !== null) {
				target.scrollTop(options.scrollTop);
			}

			// use native oversroll, if it exists
			if (compat().overflowScrolling) {
				target.css(compat().overflowScrolling, 'touch');
			} else {
				target.on(events.scroll, data, scroll);
			}

			// check to see if the user would like mousewheel support
			if (options.captureWheel) {
				target.on(events.wheel, data, wheel);
			}

			// add thumbs and listeners (if we're showing them)
			if (options.showThumbs) {
				if (compat().overflowScrolling) {
					target.css('overflow', 'scroll');
				} else {
					target.css('overflow', 'hidden');
					data.thumbs = thumbs = createThumbs(target, sizing, options);
					if (thumbs.added) {
						moveThumbs(thumbs, sizing, target.scrollLeft(), target.scrollTop());
						if (options.hoverThumbs) {
							target.on(events.hover, data, hover);
						}
					}
				}
			} else {
				target.css('overflow', 'hidden');
			}

			target.data(datakey, data);
		}

	}

	// Removes any event listeners and other instance-specific
	// data from the target. It attempts to leave the target
	// at the state it found it.
	function teardown(target) {
		getRemover(target)();
	}

	// This is the entry-point for enabling the plug-in;
	// You can find it's exposure point at the end
	// of this closure
	function overscroll(options) {
		/*jshint validthis:true */
		return this.removeOverscroll().each(function() {
			setup(this, options);
		});
	}

	// This is the entry-point for disabling the plug-in;
	// You can find it's exposure point at the end
	// of this closure
	function removeOverscroll() {
		/*jshint validthis:true */
		return this.each(function () {
			teardown(this);
		});
	}

	// Extend overscroll to expose settings to the user
	overscroll.settings = settings;

	// Extend jQuery's prototype to expose the plug-in.
	// If the supports native overflowScrolling, overscroll will not
	// attempt to override the browser's built in support
	$.extend(namespace, {
		overscroll:         overscroll,
		removeOverscroll:   removeOverscroll
	});

})(window, document, navigator, Math, setTimeout, clearTimeout, jQuery.fn, jQuery);
