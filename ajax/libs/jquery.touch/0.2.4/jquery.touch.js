/* jquery.touch.js v0.2.4 | (c) n33 | n33.co | MIT licensed */

(function($) {

	var d = $(document);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Defaults
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		var defaultSettings = {
			
			// If true, mouse clicks and movements will also trigger touch events.
				useMouse: true,	
			
			// Disables "click" event (prevents both "tap" and "click" firing on certain elements like <label>).
				noClick: false,
			
			// Distance from tap to register a drag (lower = more sensitive, higher = less sensitive).
				dragThreshold: 10,
			
			// Time to wait before registering a drag (needs to be high enough to not interfere with scrolling).
				dragDelay: 200,
			
			// Distance from tap to register a swipe (lower = more sensitive, higher = less sensitive).
				swipeThreshold: 30,
			
			// Delay between taps.
				tapDelay: 250,
			
			// Time to wait before triggering "tapAndHold".
				tapAndHoldDelay: 750,
			
			// Globally prevent default behavior for specific classes of gesture events.
			// NOTE: Previously this was "allowDefault", and jquery.touch's behavior was reversed (block all, selectively allow).
				preventDefault: {
					drag: false,
					swipe: false,
					tap: false
				}

		};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// touch Class
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		function touch(element, userSettings) {

			var t = this;

			// Settings
				t.settings = {};
				t.settings = $.extend(t.settings, defaultSettings);
				t.settings = $.extend(t.settings, userSettings);

			// Properties
				t.element = element;
				t.inTap = false;
				t.inDrag = false;
				t.tapStart = null;
				t.dragStart = null;
				t.timerTap = null;
				t.timerTapAndHold = null;
				t.tapScrollTop = null;
				t.mouseDown = false;
				t.x = null;
				t.y = null;
				t.ex = null;
				t.ey = null;
				t.taps = 0;

			// Hack: Turn off useMouse if the device supports touch events. Temporary solution, as this may break things in environments with mixed input types (mouse + touch).
				if (!!('ontouchstart' in window))
					t.settings.useMouse = false;
					
			// Init
				t.init();

		}

		touch.prototype.init = function() {

			var t = this;

			// Disable click event?
			// Needed for some elements, otherwise "click" triggers in addition to "tap".
				if (t.settings.noClick)
					t.element
						.on('click', function(e) {
							e.preventDefault();
						});

			// Bind touch events
				t.element
					.on('touchstart', function(e) {

						t.doStart(
							e,
							e.originalEvent.touches[0].pageX,
							e.originalEvent.touches[0].pageY
						);
					
					})
					.on('touchmove', function(e) {
						
						t.doMove(
							e,
							e.originalEvent.changedTouches[0].pageX,
							e.originalEvent.changedTouches[0].pageY
						);

					})
					.on('touchend', function(e) {
					
						t.doEnd(
							e,
							e.originalEvent.changedTouches[0].pageX,
							e.originalEvent.changedTouches[0].pageY
						);
					
					});

			// If useMouse is enabled, bind mouse events as well
				if (t.settings.useMouse) {
					
					t.mouseDown = false;

					t.element
						.on('mousedown', function(e) {
							
							t.mouseDown = true;
							
							t.doStart(
								e,
								e.pageX,
								e.pageY
							);
						
						})
						.on('mousemove', function(e) {

							if (t.mouseDown)
							{
								t.doMove(
									e,
									e.pageX,
									e.pageY
								);
							}

						})
						.on('mouseup', function(e) {

							t.doEnd(
								e,
								e.pageX,
								e.pageY
							);

							t.mouseDown = false;
							
						});
				}

		};
		
		touch.prototype.uses = function(x) {

			var events = $._data(this.element[0], 'events');
			
			switch (x) {
			
				case 'swipe':
					return (events.hasOwnProperty(x) || events.hasOwnProperty('swipeUp') || events.hasOwnProperty('swipeDown') || events.hasOwnProperty('swipeLeft') || events.hasOwnProperty('swipeRight'));
					
				case 'drag':
					return (events.hasOwnProperty(x) || events.hasOwnProperty('dragStart') || events.hasOwnProperty('dragEnd'));
					
				case 'tapAndHold':
				case 'doubleTap':
					return events.hasOwnProperty(x);
				
				case 'tap':
					return (events.hasOwnProperty(x) || events.hasOwnProperty('doubleTap') || events.hasOwnProperty('tapAndHold'));
				
				default:
					break;
			
			}
			
			return false;

		};
		
		touch.prototype.scrolled = function() {
			return (this.tapScrollTop != d.scrollTop());
		};
		
		touch.prototype.cancel = function(mouseDown) {

			var t = this;
		
			t.taps = 0;
			t.inTap = false;
			t.inDrag = false;
			t.tapStart = null;
			t.dragStart = null;

			if (mouseDown)
				t.mouseDown = false;

		};

		touch.prototype.doStart = function(e, x, y) {

			var t = this,
				offset = t.element.offset();

			// Prevent original event from bubbling
				e.stopPropagation();

			// Prevent default if the element has a swipe or drag event (and the user has "preventDefault" turned on)
				if ((t.uses('drag') && t.settings.preventDefault.drag)
				||	(t.uses('swipe') && t.settings.preventDefault.swipe)
				||	(t.uses('tap') && t.settings.preventDefault.tap))
					e.preventDefault();

			// Hack: Clear touch callout/user select stuff on Webkit if the element has a tapAndHold event
				if (t.uses('tapAndHold'))
					t.element
						.css('-webkit-touch-callout', 'none')
						.css('-webkit-user-select', 'none');
					
			// Set x, y, ex, ey
				t.x = x;
				t.y = y;
				t.ex = x - offset.left;
				t.ey = y - offset.top;

			// Set timestamp
				t.tapStart = Date.now();
				t.tapScrollTop = d.scrollTop();
		
			// Set timers
				
				// tap
					
					// Stop existing timer
						window.clearTimeout(t.timerTap);
				
					// Set new timer
						t.timerTap = window.setTimeout(function() {
						
							// In a valid tap? Trigger "tap"
								if (t.inTap && t.taps > 0) {
									
									t.element.trigger(
										(t.taps == 2 ? 'doubleTap' : 'tap'),
										{
											'taps': t.taps, 
											'x': t.x, 
											'y': t.y, 
											'ex': t.ex, 
											'ey': t.ey, 
											'duration': Date.now() - t.tapStart,
											'event': e
										}
									);
									
									t.cancel();
								
								}
								
							// Clear tap timer
								t.timerTap = null;
						
						}, t.settings.tapDelay);
					
				// tapAndHold
					
					if (t.uses('tapAndHold')) {
						
						// Stop existing timer
							window.clearTimeout(t.timerTapAndHold);

						// Set new timer
							t.timerTapAndHold = window.setTimeout(function() {
							
								// Use tapAndHold and in a valid tap? Trigger "tapAndHold"
									if (t.inTap) {
										
										t.element.trigger(
											'tapAndHold', 
											{ 
												'x': t.x, 
												'y': t.y, 
												'ex': t.ex, 
												'ey': t.ey, 
												'duration': Date.now() - t.tapStart,
												'event': e
											}
										);
										
										t.cancel();
									
									}

								// Clear tapAndHold timer
									t.timerTapAndHold = null;
							
							}, t.settings.tapAndHoldDelay);
					
					}
				
			// We're now in a tap
				t.inTap = true;

		};
		
		touch.prototype.doMove = function(e, x, y) {
		
			var	t = this,
				offset = t.element.offset(),
				diff = (Math.abs(t.x - x) + Math.abs(t.y - y)) / 2;

			// Prevent original event from bubbling
				e.stopPropagation();

			// Prevent default if the element has a swipe or drag event (and the user has "preventDefault" turned on)
				if ((t.uses('swipe') && t.settings.preventDefault.swipe)
				|| (t.uses('drag') && t.settings.preventDefault.drag))
					e.preventDefault();
					
			// Scrolled? Bail.
				if (t.scrolled()) {
					
					t.cancel();
					return;
				
				}
			
			// In a drag? Trigger "drag"
				if (t.inDrag)
					t.element.trigger(
						'drag', 
						{ 
							'x': x, 
							'y': y,
							'ex': x - offset.left,
							'ey': y - offset.top,
							'event': e
						}
					);
			
			// If we've moved past the drag threshold ...
				else if (diff > t.settings.dragThreshold) {
					
					// Enough time to start?
						if (Date.now() - t.tapStart < t.settings.dragDelay) {
							
							t.cancel();
							return;
						
						}

					// Cancel everything
						t.cancel();

					// We're now in a drag
						t.inDrag = true;

					// Set timestamp
						t.dragStart = Date.now();
					
					// Prevent default if the element has a drag event
						if (t.uses('drag'))
							e.preventDefault();
					
					// Trigger "dragStart"
						t.element.trigger(
							'dragStart', 
							{ 
								'x': x, 
								'y': y,
								'ex': x - offset.left,
								'ey': y - offset.top,
								'event': e
							}
						);
				
				}

		};

		touch.prototype.doEnd = function(e, x, y) {
		
			var	t = this,
				offset = t.element.offset(),
				dx = Math.abs(t.x - x),
				dy = Math.abs(t.y - y),
				distance,
				velocity,
				duration;

			// Prevent original event from bubbling
				e.stopPropagation();

			// Scrolled? Bail.
				if (t.scrolled()) {
					
					t.cancel();
					return;
				
				}

			// If we're in a tap ...
				if (t.inTap) {
				
					// Increase the tap count
						t.taps++;
					
					// Did we hit an end tap condition?
						if	(!t.timerTap // Timer ran out?
						||	(t.taps == 1 && !t.uses('doubleTap')) // Got one tap (and the element doesn't have a doubleTap event)?
						||	(t.taps == 2 && t.uses('doubleTap'))) { // Got two taps (and the element does have a doubleTap event)?

							t.element.trigger(
								(t.taps == 2 ? 'doubleTap' : 'tap'),
								{ 
									'taps': t.taps, 
									'x': t.x, 
									'y': t.y, 
									'ex': t.ex, 
									'ey': t.ey, 
									'duration': Date.now() - t.tapStart,
									'event': e
								}
							);
							
							t.cancel();
						
						}
				
				}

			// If we're in a drag ...
				else if (t.inDrag) {

					// Calculate some stuff
						duration = Date.now() - t.dragStart;
						distance = Math.sqrt(Math.pow(Math.abs(t.x - x), 2) + Math.pow(Math.abs(t.y - y), 2));
						velocity = distance / duration;

					// Trigger "dragEnd"
						t.element.trigger(
							'dragEnd', 
							{
								'start': {
									'x': t.x, 
									'y': t.y,
									'ex': t.ex, 
									'ey': t.ey
								},
								'end': {
									'x': x,
									'y': y,
									'ex': x - offset.left,
									'ey': y - offset.top
								}, 
								'distance': distance,
								'duration': duration, 
								'velocity': velocity,
								'event': e
							}
						);
					
					// Swipe?
						if (dx > t.settings.swipeThreshold
						||	dy > t.settings.swipeThreshold) {
						
							// Trigger "swipe"
								t.element.trigger(
									'swipe', 
									{ 
										'distance': distance, 
										'duration': duration, 
										'velocity': velocity,
										'event': e
									}
								);
						
							// Left/Right?
								if (dx > dy)
								{
									// Calculate velocity
										velocity = dx / duration;
								
									// Left? Trigger "swipeLeft"
										if (x < t.x)
											t.element.trigger(
												'swipeLeft', 
												{ 
													'distance': dx, 
													'duration': duration, 
													'velocity': velocity,
													'event': e
												}
											);
									
									// Right? Trigger "swipeRight"
										else
											t.element.trigger(
												'swipeRight', 
												{ 
													'distance': dx, 
													'duration': duration, 
													'velocity': velocity,
													'event': e
												}
											);
								}
							
							// Up/Down?
								else if (dy > dx) {
									
									// Calculate velocity
										velocity = dy / duration;

									// Up? Trigger "swipeUp"
										if (y < t.y)
											t.element.trigger(
												'swipeUp', 
												{ 
													'distance': dy, 
													'duration': duration, 
													'velocity': velocity,
													'event': e
												}
											);
							
									// Down? Trigger "swipeDown"
										else
											t.element.trigger(
												'swipeDown', 
												{ 
													'distance': dy, 
													'duration': duration, 
													'velocity': velocity,
													'event': e
												}
											);

								}

						}
					
					t.inDrag = false;
				
				}

		};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// jQuery function
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		$.fn.enableTouch = function(userSettings) {

			var	element, o;

			// Handle multiple elements
				if (this.length > 1) {
					
					for (var i=0; i < this.length; i++)
						$(this[i]).enableTouch();
					
					return $(this);
					
				}

			// Create jQuery object
				element = $(this);

			// Create touch object
				o = new touch(element, userSettings);
				
			// Expose touch object via the original DOM element
				element.get(0)._touch = o;

			return element;

		};

})(jQuery);
