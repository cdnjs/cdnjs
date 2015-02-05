/*!
jQuery Waypoints - v1.0.1
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt
*/

/*
Waypoints is a small jQuery plugin that makes it easy to execute a function
whenever you scroll to an element.

GitHub Repository: https://github.com/imakewebthings/jquery-waypoints
Documentation and Examples: http://imakewebthings.github.com/jquery-waypoints

Changelog:
	v1.0.1
		- Added $.waypoints('viewportHeight')
		- Fixed iOS bug (using the new viewportHeight method)
		- Added offset function alias: 'bottom-in-view'
	v1.0 - Initial release.
	
Support:
	- jQuery versions 1.4+
	- IE6+, FF3+, Chrome 6+, Safari 4+
	- Other versions and browsers may work, these are just the ones I've looked at.
*/

(function($, wp, wps, window, undefined){
	'$:nomunge';
	
	var $w = $(window),
	/*
	List of all elements that have been registered as waypoints.  Used privately.
	Each object in the array contains:
		element: jQuery object containing a single HTML element.
		offset: The window scroll offset, in px, that triggers the waypoint event.
		options: Options object that was passed to the waypoint fn function.
	*/
	waypoints = [],
	
	/*
	Starting at a ridiculous negative number allows for a 'down' trigger of 0 or
	negative offset waypoints on load. Useful for setting initial states.
	*/
	oldScroll = -99999,
	
	// Flags used in throttling.
	didScroll = false,
	didResize = false,
	
	// Keeping common strings as variables = better minification
	eventName = 'waypoint.reached',
	
	methods = {
		/*
		jQuery.fn.waypoint([handler], [options])
		
		handler
			function, optional
			A callback function called when the user scrolls past the element.
			The function signature is function(event, direction) where event is
			a standard jQuery Event Object and direction is a string, either 'down'
			or 'up' indicating which direction the user is scrolling.
			
		options
			object, optional
			A map of options to apply to this set of waypoints, including where on
			the browser window the waypoint is triggered. For a full list of
			options and their defaults, see $.fn.waypoint.defaults.
			
		This is how you register an element as a waypoint. When the user scrolls past
		that element it triggers waypoint.reached, a custom event. Since the
		parameters for creating a waypoint are optional, we have a few different
		possible signatures. Let’s look at each of them.

		someElements.waypoint();
			
		Calling .waypoint with no parameters will register the elements as waypoints
		using the default options. The elements will fire the waypoint.reached event,
		but calling it in this way does not bind any handler to the event. You can
		bind to the event yourself, as with any other event, like so:

		someElements.bind('waypoint.reached', function(event, direction) {
		   // make it rain
		});
			
		You will usually want to create a waypoint and immediately bind a function to
		waypoint.reached, and can do so by passing a handler as the first argument to
		.waypoint:

		someElements.waypoint(function(event, direction) {
		   if (direction === 'down') {
		      // do this on the way down
		   }
		   else {
		      // do this on the way back up through the waypoint
		   }
		});
			
		This will still use the default options, which will trigger the waypoint when
		the top of the element hits the top of the window. We can pass .waypoint an
		options object to customize things:

		someElements.waypoint(function(event, direction) {
		   // do something amazing
		}, {
		   offset: '50%'  // middle of the page
		});
			
		You can also pass just an options object.

		someElements.waypoint({
		   offset: 100  // 100px from the top
		});
			
		This behaves like .waypoint(), in that it registers the elements as waypoints
		but binds no event handlers.

		Calling .waypoint on an existing waypoint will extend the previous options.
		If the call includes a handler, it will be bound to waypoint.reached without
		unbinding any other handlers.
		*/
		init: function(f, options) {
			// Register each element as a waypoint, add to array.
			this.each(function() {
				var $this = $(this),
				ndx = waypointIndex($this),
				base = ndx < 0 ? $.fn[wp].defaults : waypoints[ndx].options,
				opts = $.extend({}, base, options);
				
				// Offset aliases
				opts.offset = opts.offset === "bottom-in-view" ?
					function() {
						return $[wps]('viewportHeight') - $(this).outerHeight();
					} : opts.offset;

				// Update, or create new waypoint
				if (ndx < 0) {
					waypoints.push({
						element: $this,
						offset: $this.offset().top,
						options: opts
					});
				}
				else {
					waypoints[ndx].options = opts;
				}
				
				// Bind the function if it was passed in.
				f && $this.bind(eventName, f);
			});
			
			// Need to resort+refresh the waypoints array after new elements are added.
			$[wps]('refresh');
			
			return this;
		},
		
		
		/*
		jQuery.fn.waypoint('remove')
		
		Passing the string 'remove' to .waypoint unregisters the elements as waypoints
		and wipes any custom options, but leaves the waypoint.reached events bound.
		Calling .waypoint again in the future would reregister the waypoint and the old
		handlers would continue to work.
		*/
		remove: function() {
			return this.each(function() {
				var ndx = waypointIndex($(this));
				
				if (ndx >= 0) {
					waypoints.splice(ndx, 1);
				}
			});
		},
		
		/*
		jQuery.fn.waypoint('destroy')
		
		Passing the string 'destroy' to .waypoint will unbind all waypoint.reached
		event handlers on those elements and unregisters them as waypoints.
		*/
		destroy: function() {
			return this.unbind(eventName).waypoint('remove');
		}
	};
	
	/*
	Given a jQuery element, returns the index of that element in the waypoints
	array.  Returns the index, or -1 if the element is not a waypoint.
	*/
	function waypointIndex(el) {
		var i = waypoints.length - 1;
		while (i >= 0 && waypoints[i].element[0] !== el[0]) {
			i -= 1;
		}
		return i;
	}
	
	/*
	For the waypoint and direction passed in, trigger the waypoint.reached
	event and deal with the triggerOnce option.
	*/
	function triggerWaypoint(way, dir) {
		way.element.trigger(eventName, dir)
		if (way.options.triggerOnce) {
			way.element.waypoint('destroy');
		}
	}
	
	/*
	Function that checks the new scroll value against the old value.  If waypoints
	were reached, fire the appropriate events.  Called within a throttled
	window.scroll handler later.
	*/
	function doScroll() {
		var newScroll = $w.scrollTop(),
		
		// Are we scrolling up or down? Used for direction argument in callback.
		isDown = newScroll > oldScroll,
		
		// Get a list of all waypoints that were crossed since last scroll move.
		pointsHit = $.grep(waypoints, function(el, i) {
			return isDown ?
				(el.offset > oldScroll && el.offset <= newScroll) :
				(el.offset <= oldScroll && el.offset > newScroll);
		});
		
		// iOS adjustment
		if (!oldScroll || !newScroll) {
			$[wps]('refresh');
		}
		
		// Done with scroll comparisons, store new scroll before ejection
		oldScroll = newScroll;
		
		// No waypoints crossed? Eject.
		if (!pointsHit.length) return;
		
		/*
		One scroll move may cross several waypoints.  If the continuous setting is
		true, every waypoint event should fire.  If false, only the last one.
		*/
		if ($[wps].settings.continuous) {
			$.each(isDown ? pointsHit : pointsHit.reverse(), function(i, point) {
				triggerWaypoint(point, [isDown ? 'down' : 'up']);
			});
		}
		else {
			triggerWaypoint(pointsHit[isDown ? pointsHit.length - 1 : 0],
				[isDown ? 'down' : 'up']);
		}
	}
	
	
	/*
	fn extension.  Delegates to appropriate method.
	*/
	$.fn[wp] = function(method) {
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if (typeof method === "function" || !method) {
			return methods.init.apply(this, arguments);
		}
		else if (typeof method === "object") {
			return methods.init.apply(this, [null, method]);
		}
		else {
			$.error( 'Method ' +  method + ' does not exist on jQuery' + wp );
		}
	};
	
	
	/*
	The default options object that is extended when calling .waypoint. It has the
	following properties:

	offset
		number | string | function
		default: 0
		Determines how far the top of the element must be from the top of the browser
		window to trigger a waypoint. It can be a number, which is taken as a number
		of pixels, a string representing a percentage of the viewport height, or a
		function that will return a number of pixels.
		
	triggerOnce
		boolean
		default: false
		If true, the waypoint will be destroyed when triggered.
	
	An offset of 250 would trigger the waypoint when the top of the element is 250px
	from the top of the viewport. Negative values for any offset work as you might
	expect. A value of -100 would trigger the waypoint when the element is 100px above
	the top of the window.

	offset: '100%'
	
	A string percentage will determine the pixel offset based on the height of the
	window. When resizing the window, this offset will automatically be recalculated
	without needing to call $.waypoints('refresh').

	// The bottom of the element is in view
	offset: function() {
	   return $.waypoints('viewportHeight') - $(this).outerHeight();
	}
	
	Offset can take a function, which must return a number of pixels from the top of
	the window. The this value will always refer to the raw HTML element of the
	waypoint. As with % values, functions are recalculated automatically when the
	window resizes. For more on recalculating offsets, see $.waypoints('refresh').
	
	An offset value of 'bottom-in-view' will act as an alias for the function in the
	example above, as this is a common usage.
	
	offset: 'bottom-in-view'
	
	You can see this alias in use on the Scroll Analytics example page.

	The triggerOnce flag, if true, will destroy the waypoint after the first trigger.
	This is just a shortcut for calling .waypoint('destroy') within the waypoint
	handler. This is useful in situations such as scroll analytics, where you only
	want to record an event once for each page visit.
	*/
	$.fn[wp].defaults = {
		offset: 0,
		triggerOnce: false
	};
	
	
	/*
	Methods used by the jQuery object extension.
	*/
	var jQMethods = {
		
		/*
		jQuery.waypoints('refresh')
		
		This will force a recalculation of each waypoint’s trigger point based on
		its offset option. This is called automatically whenever the window is
		resized, new waypoints are added, or a waypoint’s options are modified.
		If your project is changing the DOM or page layout without doing one of
		these things, you may want to manually call this refresh.
		*/
		refresh: function() {
			$.each(waypoints, function(i, o) {
				// Adjustment is just the offset if it's a px value
				var adjustment = 0,
				oldOffset = o.offset;
				
				// Set adjustment to the return value if offset is a function.
				if (typeof o.options.offset === "function") {
					adjustment = o.options.offset.apply(o.element);
				}
				// Calculate the adjustment if offset is a percentage.
				else if (typeof o.options.offset === "string") {
					var amount = parseFloat(o.options.offset),
					adjustment = o.options.offset.indexOf("%") ?
						$[wps]('viewportHeight') * (amount / 100) :
						amount;
				}
				else {
					adjustment = o.options.offset;
				}
				
				/* 
				Set the element offset to the window scroll offset, less
				the adjustment.
				*/
				o.offset = o.element.offset().top - adjustment;

				/*
				An element offset change across the current scroll point triggers
				the event, just as if we scrolled past it.
				*/
				if (oldScroll > oldOffset && oldScroll <= o.offset) {
					triggerWaypoint(o, ['up']);
				}
				else if (oldScroll < oldOffset && oldScroll >= o.offset) {
					triggerWaypoint(o, ['down']);
				}
			});
			
			// Keep waypoints sorted by offset value.
			waypoints.sort(function(a, b) {
				return a.offset - b.offset;
			});
		},
		
		
		/*
		jQuery.waypoints('viewportHeight')
		
		This will return the height of the viewport, adjusting for inconsistencies
		that come with calling $(window).height() in iOS. Recommended for use
		within any offset functions.
		*/
		viewportHeight: function() {
			return (window.innerHeight ? window.innerHeight : $w.height());
		},
		
		
		/*
		jQuery.waypoints()
		
		This will return a jQuery object with a collection of all registered waypoint
		elements.

		$('.post').waypoint();
		$('.ad-unit').waypoint(function(event, direction) {
		   // Passed an ad unit
		});
		console.log($.waypoints());
		
		The example above would log a jQuery object containing all .post and .ad-unit
		elements.
		*/
		aggregate: function() {
			var points = $();
			$.each(waypoints, function(i, e) {
				points = points.add(e.element);
			});
			return points;
		}
	};
	
	
	/*
	jQuery object extension. Delegates to appropriate methods above.
	*/
	$[wps] = function(method) {
		if (jQMethods[method]) {
			return jQMethods[method].apply(this);
		}
		else {
			return jQMethods["aggregate"]();
		}
	};
	
	
	/*
	$.waypoints.settings
	
	Settings object that determines some of the plugin’s behavior.

	continuous
		boolean
		default: true
		Determines which waypoints to trigger events for if a single scroll change
		passes more than one waypoint. If false, only the last waypoint is triggered
		and the rest are ignored. If true, all waypoints between the previous scroll
		position and the new one are triggered in order.
		
	resizeThrottle
		number
		default: 200
		For performance reasons, the refresh performed during window resizes is
		throttled. This value is the rate-limit in milliseconds between resize
		refreshes. For more information on throttling, check out Ben Alman’s
		throttle / debounce plugin.
		http://benalman.com/projects/jquery-throttle-debounce-plugin/
		
	scrollThrottle
		number
		default: 100
		For performance reasons, checking for any crossed waypoints during the window
		scroll event is throttled. This value is the rate-limit in milliseconds
		between scroll checks. For more information on throttling, check out Ben
		Alman’s throttle / debounce plugin.
		http://benalman.com/projects/jquery-throttle-debounce-plugin/
	*/
	$[wps].settings = {
		continuous: true,
		resizeThrottle: 200,
		scrollThrottle: 100
	};
	
	
	/*
	Set things up on load to guarantee height calculations and offsets are correct.
	*/
	$w.load(function() {
		$w.scroll(function() {
			// Throttle the scroll event. See doScroll() for actual scroll functionality.
			if (!didScroll) {
				didScroll = true;
				window.setTimeout(function() {
					doScroll();
					didScroll = false;
				}, $[wps].settings.scrollThrottle);
			}
		}).resize(function() {
			// Throttle the window resize event to call jQuery.waypoints('refresh').
			if (!didResize) {
				didResize = true;
				window.setTimeout(function() {
					$.waypoints('refresh');
					didResize = false;
				}, $[wps].settings.resizeThrottle);
			}
		});
		
		// Calculate everything once on load.
		$[wps]('refresh');
		
		/*
		Fire a scroll check, should the page be loaded at a non-zero scroll value,
		as with a fragment id link or a page refresh.
		*/
		doScroll();
	});
})(jQuery, 'waypoint', 'waypoints', this);