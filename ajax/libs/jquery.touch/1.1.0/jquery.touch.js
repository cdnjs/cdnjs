/* jquery.touch v1.1.0 | (c) @ajlkn | github.com/ajlkn/jquery.touch | MIT licensed */

(function($) {

	var $document = $(document),
		dragTarget = null,
		dropTargetElement = null;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Defaults
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/**
		 * Default settings.
		 *
		 * @type {object}
		 */
		var defaultSettings = {

			// If true, touch inputs will trigger touch events.
				useTouch: true,

			// If true, mouse inputs will trigger touch events.
				useMouse: true,

			// If true, certain events (like drag) can continue to track even if the mouse cursor leaves the originating element.
				trackDocument: false,

			// If true, when "trackDocument" is enabled, coordinates will be normalized to the confines of the originating element.
				trackDocumentNormalize: false,

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
				tapAndHoldDelay: 500,

			// If defined, delegates touch events to descendants matching this selector.
				delegateSelector: null,

			// Filters drop target elements. Can be any of the following:
			// - "selector"                          Target element must match this selector.
			// - function(element, target) { ... }   Use boolean return value of a custom callback.
			// - true                                Target element must be a sibling of dragged element.
			// - false                               No filtering.
				dropFilter: false,

			// If true, traverses through parents for a match when dropFilter is a selector or function.
				dropFilterTraversal: true,

			// Coordinate point of reference (page, screen, client).
				coordinates: 'page',

			// Prevent or allow default actions for certain event classes. Can be any of the following:
			// - true                                Prevent default actions for this event class.
			// - false                               Allow default actions for this event class.
			// - function(state) { ... }             Use boolean return value of a custom callback (state = touch state object)
				preventDefault: {
					drag: false,
					swipe: false,
					tap: false
				}

		};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// touch Class
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/**
		 * Touch class. Keeps track of all touch event states.
		 *
		 * @param {jQuery} $element Target element.
		 * @param {jQuery} $sourceElement Source element.
		 * @param {object} settings Settings.
		 */
		function touch($element, $sourceElement, settings) {

			var t = this;

			t.settings = settings;

			// Properties.
				t.$element = $element;
				t.$sourceElement = $sourceElement;
				t.inTap = false;
				t.inTapAndHold = false;
				t.inDrag = false;
				t.tapStart = null;
				t.dragStart = null;
				t.timerTap = null;
				t.timerTapAndHold = null;
				t.mouseDown = false;
				t.x = null;
				t.y = null;
				t.ex = null;
				t.ey = null;
				t.xStart = null;
				t.yStart = null;
				t.exStart = null;
				t.eyStart = null;
				t.taps = 0;
				t.started = false;
				t.ended = false;

		}

		/**
		 * Determines if the target element uses a particular class of gesture.
		 *
		 * @param {string} x Gesture class.
		 * @return {bool} If true, target element has at least one bound event for the specified gesture class. If false, it doesn't.
		 */
		touch.prototype.uses = function(x) {

			var events = $._data(this.$sourceElement[0], 'events');

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

		/**
		 * Cancels all touch events.
		 *
		 * @param {bool} mouseDown If true, also cancel events relying on mouseDown.
		 */
		touch.prototype.cancel = function(mouseDown) {

			var t = this;

			t.taps = 0;
			t.inTap = false;
			t.inTapAndHold = false;
			t.inDrag = false;
			t.tapStart = null;
			t.dragStart = null;
			t.xStart = null;
			t.yStart = null;
			t.exStart = null;
			t.eyStart = null;

			if (mouseDown)
				t.mouseDown = false;

		};

		/**
		 * Touch start handler.
		 *
		 * @param {object} event Original event.
		 * @param {integer} x X position.
		 * @param {integer} y Y position.
		 */
		touch.prototype.doStart = function(event, x, y) {

			var t = this,
				offset = t.$element.offset();

			// Prevent original event from bubbling.
				event.stopPropagation();

			// Prevent default if the element has a swipe or drag event (and the user has "preventDefault" turned on).
				if ((t.uses('drag') && (t.settings.preventDefault.drag)(t))
				||	(t.uses('swipe') && (t.settings.preventDefault.swipe)(t))
				||	(t.uses('tap') && (t.settings.preventDefault.tap)(t)))
					event.preventDefault();

			// Hack: Clear touch callout/user select stuff on Webkit if the element has a tapAndHold event.
				if (t.uses('tapAndHold'))
					t.$element
						.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)')
						.css('-webkit-touch-callout', 'none')
						.css('-webkit-user-select', 'none');

			// Set x, y, ex, ey.
				t.x = x;
				t.y = y;
				t.ex = x - offset.left;
				t.ey = y - offset.top;

			// Set timestamp.
				t.tapStart = Date.now();

			// Set timers.

				// tap.

					// Stop tap timer.
						clearTimeout(t.timerTap);

					// Set new tap timer.
						t.timerTap = setTimeout(function() {

							// In a valid tap? Trigger "tap".
								if (t.inTap && t.taps > 0) {

									t.$element.trigger(
										(t.taps == 2 ? 'doubleTap' : 'tap'),
										{
											'taps': t.taps,
											'x': t.x,
											'y': t.y,
											'ex': t.ex,
											'ey': t.ey,
											'duration': Date.now() - t.tapStart,
											'event': event
										}
									);

									t.cancel();

								}

							// Clear tap timer.
								t.timerTap = null;

						}, t.settings.tapDelay);

				// tapAndHold.

					if (t.uses('tapAndHold')) {

						// Stop tapAndHold timer.
							clearTimeout(t.timerTapAndHold);

						// Set new tapAndHold timer.
							t.timerTapAndHold = setTimeout(function() {

								// Use tapAndHold and in a valid tap? Trigger "tapAndHold".
									if (t.inTap) {

										t.$element.trigger(
											'tapAndHold',
											{
												'x': t.x,
												'y': t.y,
												'ex': t.ex,
												'ey': t.ey,
												'duration': Date.now() - t.tapStart,
												'event': event
											}
										);

										t.cancel();

									}

								// Clear tapAndHold timer.
									t.timerTapAndHold = null;

								// We're now in a tap and hold.
									t.inTapAndHold = true;

							}, t.settings.tapAndHoldDelay);

					}

			// We're now in a tap.
				t.inTap = true;

		};

		/**
		 * Touch move handler.
		 *
		 * @param {object} event Original event.
		 * @param {integer} x X position.
		 * @param {integer} y Y position.
		 */
		touch.prototype.doMove = function(event, x, y) {

			var	t = this,
				offset = t.$element.offset(),
				diff = (Math.abs(t.x - x) + Math.abs(t.y - y)) / 2,
				e, s;

			// Prevent original event from bubbling.
				event.stopPropagation();

			// Prevent default if the element has a swipe or drag event (and the user has "preventDefault" turned on).
				if ((t.uses('swipe') && (t.settings.preventDefault.swipe)(t))
				|| (t.uses('drag') && (t.settings.preventDefault.drag)(t)))
					event.preventDefault();

			// Stop tapAndHold timer.
			// Note: Only if cursor moves too much. Needed to compensate for hypersensitive touchscreens.
				if (diff > 2)
					clearTimeout(t.timerTapAndHold);

			// In a drag? Trigger "drag".
				if (t.inDrag
				&&	dragTarget == t) {

					t.$element.trigger(
						'drag',
						{
							'x': x,
							'y': y,
							'ex': x - offset.left,
							'ey': y - offset.top,
							'start': {
								'x': t.xStart,
								'y': t.yStart,
								'ex': t.exStart,
								'ey': t.eyStart
							},
							'event': event,

							// Deprecated.
								'exStart': t.exStart,
								'eyStart': t.eyStart,

						}
					);

					// Handle drop target events.

						// Get element below the cursor.

							// Temporarily turn off this element's pointer events.
								t.$element.css('pointer-events', 'none');

							// Get element below this one.
							// Note: Offset by document scroll if this element is position: fixed.
								if (t.$element.css('position') == 'fixed')
									e = document.elementFromPoint(
										x - $document.scrollLeft(),
										y - $document.scrollTop()
									);
								else
									e = document.elementFromPoint(
										x,
										y
									);

							// Turn this element's pointer events back on.
								t.$element.css('pointer-events', '');

							// Found a drop target?
								if (e) {

									// Drop filter set? Apply it.
										if (t.settings.dropFilter !== false) {

											s = typeof t.settings.dropFilter;

											switch (s) {

												// Selector.
													case 'string':

														// Drop filter traversal enabled? Go through parents until we find a match (or don't).
															if (t.settings.dropFilterTraversal) {

																while (e) {

																	// Found a match? Stop traversing.
																		if ($(e).is(t.settings.dropFilter))
																			break;

																	// Traverse up to parent.
																		e = e.parentElement;

																}

															}

														// Otherwise, perform single match.
															else if (!$(e).is(t.settings.dropFilter))
																e = null;

														break;

												// Callback.
													case 'function':

														// Drop filter traversal enabled? Go through parents until we find a match (or don't).
															if (t.settings.dropFilterTraversal) {

																while (e) {

																	// Found a match? Stop traversing.
																		if ((t.settings.dropFilter)(t.$element[0], e) === true)
																			break;

																	// Traverse up to parent.
																		e = e.parentElement;

																}

															}

														// Otherwise, perform single match.
															else if ((t.settings.dropFilter)(t.$element[0], e) === false)
																e = null;

														break;

												// Siblings only.
													default:
													case 'boolean':

														if (t.settings.dropFilter === true) {
															while (e.parentElement != t.$element[0].parentElement) {

																e = e.parentElement;

																if (!e) {

																	e = null;
																	break;

																}

															}
														}

														break;

											}

										}

									// Make sure drop target isn't the element being dragged (because that would be weird).
										if (e === t.$element[0])
											e = null;
								}

						// Handle "leave".
						// Triggered when we already have a drop target, but the cursor's no longer above it.
							if (dropTargetElement
							&&	dropTargetElement !== e) {

								// Trigger "dragLeave".
									t.$element.trigger(
										'dragLeave',
										{
											'element': dropTargetElement,
											'event': event
										}
									);

								// Clear drop target.
									dropTargetElement = null;

							}

						// Handle "enter".
						// Triggered when we don't have a drop target yet but we're above one.
							if (!dropTargetElement
							&&	e) {

								// Set drop target.
									dropTargetElement = e;

								// Trigger "dragEnter".
									t.$element.trigger(
										'dragEnter',
										{
											'element': dropTargetElement,
											'event': event
										}
									);

							}

						// Handle "over".
						// Triggered when we have a drop target.
							if (dropTargetElement) {

								// Get offset.
									offset = $(dropTargetElement).offset();

								// Trigger "dragOver".
									t.$element.trigger(
										'dragOver',
										{
											'element': dropTargetElement,
											'event': event,
											'x': x,
											'y': y,
											'ex': x - offset.left,
											'ey': y - offset.top
										}
									);

							}

				}

			// If we've moved past the drag threshold ...
				else if (diff > t.settings.dragThreshold) {

					// Enough time to start?
						if (Date.now() - t.tapStart < t.settings.dragDelay) {

							t.cancel();
							return;

						}

					// Cancel everything.
						t.cancel();

					// We're now in a drag.
						t.inDrag = true;

					// Set timestamp.
						t.dragStart = Date.now();

					// Set starting element coordinates.
						t.xStart = x;
						t.yStart = y;
						t.exStart = x - offset.left;
						t.eyStart = y - offset.top;

					// Prevent default if the element has a drag event.
						if (t.uses('drag') && (t.settings.preventDefault.drag)(t))
							event.preventDefault();

					// Trigger "dragStart".
						t.$element.trigger(
							'dragStart',
							{
								'x': t.xStart,
								'y': t.yStart,
								'ex': t.exStart,
								'ey': t.eyStart,
								'event': event
							}
						);

					// Set drag target.
						dragTarget = t;

				}

		};

		/**
		 * Touch end handler.
		 *
		 * @param {object} event Original event.
		 * @param {integer} x X position.
		 * @param {integer} y Y position.
		 */
		touch.prototype.doEnd = function(event, x, y) {

			var	t = this,
				offset = t.$element.offset(),
				dx = Math.abs(t.x - x),
				dy = Math.abs(t.y - y),
				distance,
				velocity,
				duration;

			// Prevent original event from bubbling.
				event.stopPropagation();

			// If we're in a tap ...
				if (t.inTap) {

					// Stop tapAndHold timer.
						clearTimeout(t.timerTapAndHold);

					// Increase the tap count.
						t.taps++;

					// Did we hit an end tap condition?
						if	(!t.timerTap // Timer ran out?
						||	(t.taps == 1 && !t.uses('doubleTap')) // Got one tap (and the element doesn't have a doubleTap event)?
						||	(t.taps == 2 && t.uses('doubleTap'))) { // Got two taps (and the element does have a doubleTap event)?

							t.$element.trigger(
								(t.taps == 2 ? 'doubleTap' : 'tap'),
								{
									'taps': t.taps,
									'x': t.x,
									'y': t.y,
									'ex': t.ex,
									'ey': t.ey,
									'duration': Date.now() - t.tapStart,
									'event': event
								}
							);

							t.cancel();

						}

				}

			// If we're in a drag ...
				else if (t.inDrag) {

					// Handle drop target events.

						// Handle "drop".
						// Triggered when we have a drop target.
							if (dropTargetElement) {

								// Get offset.
									offset = $(dropTargetElement).offset();

								// Trigger "drop".
									t.$element.trigger(
										'drop',
										{
											'element': dropTargetElement,
											'event': event,
											'x': x,
											'y': y,
											'ex': x - offset.left,
											'ey': y - offset.top
										}
									);

								// Clear drop target.
									dropTargetElement = null;

							}

					// Calculate some stuff.
						duration = Date.now() - t.dragStart;
						distance = Math.sqrt(Math.pow(Math.abs(t.x - x), 2) + Math.pow(Math.abs(t.y - y), 2));
						velocity = distance / duration;

					// Trigger "dragEnd".
						t.$element.trigger(
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
								'event': event
							}
						);

					// Clear drag target.
						dragTarget = null;

					// Swipe?
						if (dx > t.settings.swipeThreshold
						||	dy > t.settings.swipeThreshold) {

							// Trigger "swipe".
								t.$element.trigger(
									'swipe',
									{
										'distance': distance,
										'duration': duration,
										'velocity': velocity,
										'event': event
									}
								);

							// Left/Right?
								if (dx > dy)
								{
									// Calculate velocity.
										velocity = dx / duration;

									// Left? Trigger "swipeLeft".
										if (x < t.x)
											t.$element.trigger(
												'swipeLeft',
												{
													'distance': dx,
													'duration': duration,
													'velocity': velocity,
													'event': event
												}
											);

									// Right? Trigger "swipeRight".
										else
											t.$element.trigger(
												'swipeRight',
												{
													'distance': dx,
													'duration': duration,
													'velocity': velocity,
													'event': event
												}
											);
								}

							// Up/Down?.
								else if (dy > dx) {

									// Calculate velocity.
										velocity = dy / duration;

									// Up? Trigger "swipeUp".
										if (y < t.y)
											t.$element.trigger(
												'swipeUp',
												{
													'distance': dy,
													'duration': duration,
													'velocity': velocity,
													'event': event
												}
											);

									// Down? Trigger "swipeDown".
										else
											t.$element.trigger(
												'swipeDown',
												{
													'distance': dy,
													'duration': duration,
													'velocity': velocity,
													'event': event
												}
											);

								}

						}

					// Cancel drag.
						t.inDrag = false;

				}

			// If we're in a tap and hold ...
				else if (t.inTapAndHold) {

					// Stop tapAndHold timer.
						clearTimeout(t.timerTapAndHold);

					// Trigger "tapAndHoldEnd".
						t.$element.trigger(
							'tapAndHoldEnd',
							{
								'x': t.x,
								'y': t.y,
								'event': event
							}
						);

					// Cancel tap and hold.
						t.inTapAndHold = false;

				}

		};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// jQuery function
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/**
		 * Enables touch events on a selector.
		 *
		 * @param {object} userSettings User settings.
		 */
		$.fn.touch = function(userSettings) {

			var $this = $(this);

			// Multiple elements?
				if (this.length > 1) {

					for (var i=0; i < this.length; i++)
						$.touch($(this[i]), userSettings);

				}

			// Single element?
				else if (this.length == 1)
					$.touch($this, userSettings);

			return $this;

		};

		/**
		 * Alias for touch() function.
		 *
		 * @param {object} userSettings User settings.
		 */
		$.fn.enableTouch = function(userSettings) {
			return $(this).touch(userSettings);
		};

		/**
		 * Enables touch events on a jQuery element.
		 *
		 * @param {jQuery} $this Element.
		 * @param {object} userSettings User settings.
		 */
		$.touch = function($this, userSettings) {

			var settings = {};

			// Build settings.
				settings = $.extend(settings, defaultSettings);
				settings = $.extend(settings, userSettings);

			// Expand non-function preventDefault properties to functions.
				if (typeof settings.preventDefault.drag != 'function')
					settings.preventDefault.drag = (settings.preventDefault.drag === true ? function(t) { return true; } : function(t) { return false; });

				if (typeof settings.preventDefault.swipe != 'function')
					settings.preventDefault.swipe = (settings.preventDefault.swipe === true ? function(t) { return true; } : function(t) { return false; });

				if (typeof settings.preventDefault.tap != 'function')
					settings.preventDefault.tap = (settings.preventDefault.tap === true ? function(t) { return true; } : function(t) { return false; });

			// Disable click event?
			// Needed for some elements, otherwise "click" triggers in addition to "tap".
				if (settings.noClick)
					$this
						.on('click', function(event) {
							event.preventDefault();
						});

			// Bind touch events.
				if (settings.useTouch) {

					// Start (touchstart).
						var onTouchStart = function(event) {

							var	$element = $(this),
								touch = getTouch($element, $this, settings);

							// Mark as started.
								touch.started = true;

							// Start.
								touch.doStart(
									event,
									event.originalEvent.touches[0][settings.coordinates + 'X'],
									event.originalEvent.touches[0][settings.coordinates + 'Y']
								);

							// Clear started after delay.
								setTimeout(function() {
									touch.started = false;
								}, 1000);

						};

						// Bind event.
							$this.on('touchstart', onTouchStart);

						// Delegate?
							if (settings.delegateSelector)
								$this.on('touchstart', settings.delegateSelector, onTouchStart);

					// Move (touchmove).
						var onTouchMove = function(event) {

							var	$element = $(this),
								touch = getTouch($element, $this, settings);

							// Get coordinates.
								var	x = event.originalEvent.touches[0][settings.coordinates + 'X'],
									y = event.originalEvent.touches[0][settings.coordinates + 'Y'];

							// Normalize coordinates?
								if (touch.settings.trackDocument
								&&	touch.settings.trackDocumentNormalize) {

									var pos = fixPos(
										touch,
										x,
										y
									);

									x = pos.x;
									y = pos.y;

								}

							// Move.
								touch.doMove(
									event,
									x,
									y
								);

						};

						// Bind event.
							$this.on('touchmove', onTouchMove);

						// Delegate?
							if (settings.delegateSelector)
								$this.on('touchmove', settings.delegateSelector, onTouchMove);

					// End (touchend).
						var onTouchEnd = function(event) {

							var	$element = $(this),
								touch = getTouch($element, $this, settings);

							// Mark as ended.
								touch.ended = true;

							// Get position.
								var pos = fixPos(
									touch,
									event.originalEvent.changedTouches[0][settings.coordinates + 'X'],
									event.originalEvent.changedTouches[0][settings.coordinates + 'Y']
								);

							// End.
								touch.doEnd(
									event,
									pos.x,
									pos.y
								);

							// Clear ended after delay.
								setTimeout(function() {
									touch.ended = false;
								}, 1000);

						};

						// Bind event.
							$this.on('touchend', onTouchEnd);

						// Delegate?
							if (settings.delegateSelector)
								$this.on('touchend', settings.delegateSelector, onTouchEnd);

				}

			// Bind mouse events.
				if (settings.useMouse) {

					// Start (mousedown).
						var onMouseDown = function(event) {

							var	$element = $(this),
								touch = getTouch($element, $this, settings);

							// If we've already been started (which would *only* happen if touchstart were just triggered),
							// bail immediately so we don't attempt to double start.
								if (touch.started)
									return false;

							// Mark mouse down.
								touch.mouseDown = true;

							// Start.
								touch.doStart(
									event,
									event[settings.coordinates + 'X'],
									event[settings.coordinates + 'Y']
								);

						};

						// Bind event.
							$this.on('mousedown', onMouseDown);

						// Delegate?
							if (settings.delegateSelector)
								$this.on('mousedown', settings.delegateSelector, onMouseDown);

					// Move (mousemove).
						var onMouseMove = function(event) {

							var	$element = $(this),
								touch = getTouch($element, $this, settings);

							// If mouse down, move.
								if (touch.mouseDown)
									touch.doMove(
										event,
										event[settings.coordinates + 'X'],
										event[settings.coordinates + 'Y']
									);

						};

						// Bind event.
							$this.on('mousemove', onMouseMove);

						// Delegate?
							if (settings.delegateSelector)
								$this.on('mousemove', settings.delegateSelector, onMouseMove);

					// End (mouseup).
						var onMouseUp = function(event) {

							var	$element = $(this),
								touch = getTouch($element, $this, settings);

							// If we've already ended (which would *only* happen if touchend were just triggered),
							// bail immediately so we don't attempt to double end.
								if (touch.ended)
									return false;

							// Trigger document's mouseup handler (in case this event was fired on this element while dragging another).
								$document.triggerHandler('mouseup', event);

							// End.
								touch.doEnd(
									event,
									event[settings.coordinates + 'X'],
									event[settings.coordinates + 'Y']
								);

							// Clear mouse down.
								touch.mouseDown = false;

						};

						// Bind event.
							$this.on('mouseup', onMouseUp);

						// Delegate?
							if (settings.delegateSelector)
								$this.on('mouseup', settings.delegateSelector, onMouseUp);

				}

			// No document tracking? Watch for "mouseleave".
				if (!settings.trackDocument)
					$this
						.on('mouseleave', function(event) {

							var	$element = $(this),
								touch = getTouch($element, $this, settings);

							touch.doEnd(
								event,
								event[settings.coordinates + 'X'],
								event[settings.coordinates + 'Y']
							);

							touch.mouseDown = false;

						})


		};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Init.
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/**
		 * Gets an element's touch property.
		 *
		 * @param {jQuery} $element Target element.
		 * @param {jQuery} $sourceElement Source element.
		 * @param {object} userSettings User settings.
		 */
		function getTouch($element, $sourceElement, userSettings) {

			var element = $element[0];

			// No touch property? Initialize it.
				if (typeof element._touch == 'undefined')
					element._touch = new touch($element, $sourceElement, userSettings);

			return element._touch;

		};

		/**
		 * Adjusts a pair of coordinates to ensure they're within the boundaries of a given touch object's element.
		 *
		 * @param t {object} Touch object.
		 * @param x {integer} X value.
		 * @param y {integer} y value.
		 * @return {object} New coordinates.
		 */
		function fixPos(t, x, y) {

			var offset, width, height, nx, ny;

			// Get element's offset and dimenions.
				offset = t.$element.offset(),
				width = t.$element.width(),
				height = t.$element.height();

			// Normalize x and y.
				nx = Math.min(Math.max(x, offset.left), offset.left + width);
				ny = Math.min(Math.max(y, offset.top), offset.top + height);

			// Return new coordinates.
				return {
					x: nx,
					y: ny
				};

		};

		// Documnet-level events (mouse only).
		// These are used to trigger drag events on an element even if the mouse cursor is beyond its boundaries.
			$document
				.on('mousemove', function(event) {

					var t = dragTarget;

					if (t
					&&	t.settings.useMouse
					&&	t.mouseDown
					&&	t.settings.trackDocument) {

						// Get coordinates.
							var	x = event[t.settings.coordinates + 'X'],
								y = event[t.settings.coordinates + 'Y'];

						// Normalize coordinates?
							if (t.settings.trackDocumentNormalize) {

								var pos = fixPos(
									t,
									x,
									y
								);

								x = pos.x;
								y = pos.y;

							}

						// Trigger "move".
							t.doMove(
								event,
								x,
								y
							);

					}

				})
				.on('mouseup', function(event, previousEvent) {

					var t = dragTarget;

					if (t
					&&	t.settings.useMouse
					&&	t.settings.trackDocument) {

						// Previous event provided? Use that instead.
							if (typeof previousEvent !== 'undefined')
								event = previousEvent;

						// No X coordinate in event? "mouseup" likely already handled by originating element, so bail.
							if (!((t.settings.coordinates + 'X') in event))
								return;

						// Get coordinates.
							var	x = event[t.settings.coordinates + 'X'],
								y = event[t.settings.coordinates + 'Y'];

						// Normalize coordinates?
							if (t.settings.trackDocumentNormalize) {

								var pos = fixPos(
									t,
									x,
									y
								);

								x = pos.x;
								y = pos.y;

							}

						// Trigger "end".
							t.doEnd(
								event,
								x,
								y
							);

						// Clear mouseDown state.
							t.mouseDown = false;

					}

				});

})(jQuery);