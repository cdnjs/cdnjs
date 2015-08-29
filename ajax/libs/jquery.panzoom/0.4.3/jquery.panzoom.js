/**
 * @license jquery.panzoom.js v0.4.3
 * Updated: Wed Apr 24 2013
 * Add pan and zoom functionality to any element
 * Copyright (c) 2013 timmy willison
 * Released under the MIT license
 * https://github.com/timmywil/jquery.panzoom/blob/master/MIT-License.txt
 */

(function( global, factory ) {
	// Define the plugin using AMD if present
	// Skips commonjs as this is not meant for that environment
	if ( typeof define === "function" && define.amd ) {
		define([ "jquery" ], factory );
	} else {
		factory( global.jQuery );
	}
}( this, function( $ ) {
	"use strict";

	var touchSupported = typeof Modernizr !== "undefined" && Modernizr.touch;
	if ( touchSupported ) {
		// Lift touch properties using fixHooks
		var touchHook = { props: [ "touches", "pageX", "pageY" ] };
		$.each([ "touchstart", "touchmove", "touchend" ], function( i, name ) {
			$.event.fixHooks[ name ] = touchHook;
		});
	}

	var datakey = "__pz__";
	var slice = Array.prototype.slice;
	var rupper = /([A-Z])/g;
	var rsvg = /^http:[\w\.\/]+svg$/;

	var floating = "(\\-?[\\d\\.e]+)";
	var commaSpace = "\\,?\\s*";
	var rmatrix = new RegExp(
		"^matrix\\(" +
		floating + commaSpace +
		floating + commaSpace +
		floating + commaSpace +
		floating + commaSpace +
		floating + commaSpace +
		floating + "\\)$"
	);

	/**
	 * Create a Panzoom object for a given element
	 * @constructor
	 * @param {Element} elem - Element to use pan and zoom
	 * @param {Object} [options] - An object literal containing options to override default options (See Panzoom.defaults for ones not listed below)
	 * @param {jQuery} [options.$zoomIn] - zoom in buttons/links collection (you can also bind these yourself - e.g. $button.on("click", function( e ) { e.preventDefault(); $elem.panzooom("zoomIn"); }); )
	 * @param {jQuery} [options.$zoomOut] - zoom out buttons/links collection on which to bind zoomOut
	 * @param {jQuery} [options.$zoomRange] - zoom in/out with this range control
	 * @param {jQuery} [options.$reset] - Reset buttons/links collection on which to bind the reset method
	 * @param {Function} [options.onChange] - An optional callback for the transform change event (panzoomchange)
	 * @param {Function} [options.onEnd] - An optional callback for mouseup/touchend
	 */
	var Panzoom = function( elem, options ) {

		// Sanity checks
		if ( elem.nodeType !== 1 ) {
			$.error("Panzoom called on non-Element node");
		}
		if ( !$.contains(document, elem) ) {
			$.error("Panzoom element must be attached to the document");
		}

		// Don't remake
		var d = $.data( elem, datakey );
		if ( d ) {
			return d;
		}

		// Allow instantiation without `new` keyword
		if ( !(this instanceof Panzoom) ) {
			return new Panzoom( elem, options );
		}

		// Extend default with given object literal
		// Each instance gets its own options
		this.options = options = $.extend( {}, Panzoom.defaults, options );
		this.elem = elem;
		var $elem = this.$elem = $(elem);
		this.$parent = $elem.parent();

		// This is SVG if the namespace is SVG
		// However, while <svg> elements are SVG, we want to treat those like other elements
		this.isSVG = rsvg.test( elem.namespaceURI ) && elem.nodeName.toLowerCase() !== "svg";

		// Save the original transform value
		// Save the prefixed transform style key
		this._buildTransform();
		// Build the transition value
		this._buildTransition();

		// Add zoom and reset buttons to `this`
		var $empty = $();
		var self = this;
		$.each([ "$zoomIn", "$zoomOut", "$zoomRange", "$reset" ], function( i, name ) {
			self[ name ] = options[ name ] || $empty;
		});

		this._initStyle();
		this._bind();

		// Save the instance
		$.data( elem, datakey, this );

		return this;
	};

	// Attach regex for possible use (immutable)
	Panzoom.rmatrix = rmatrix;

	Panzoom.defaults = {
		// Should always be non-empty
		// Used to bind jQuery events without collisions
		// A guid is not added here as different instantiations/versions of panzoom
		// on the same element is not supported, so don't do it.
		eventNamespace: ".panzoom",

		// Whether or not to transition the scale
		transition: true,

		// Default cursor style for the element
		cursor: "move",

		// There may be some use cases for zooming without panning or vice versa
		disablePan: false,
		disableZoom: false,

		// The increment at which to zoom
		// adds/subtracts to the scale each time zoomIn/Out is called
		increment: 0.3,

		minScale: 0.4,
		maxScale: 5,

		// Animation duration (ms)
		duration: 200,
		// CSS easing used for scale transition
		easing: "ease-in-out"
	};

	Panzoom.prototype = {
		constructor: Panzoom,

		/**
		 * @returns {Panzoom} Returns the instance
		 */
		instance: function() {
			return this;
		},

		/**
		 * Destroy the current minimal lightbox instances
		 */
		destroy: function() {
			this._resetStyle();
			this._unbind();
			$.removeData( this.elem, datakey );
		},

		/**
		 * Return the element to it's original transform matrix
		 */
		reset: function() {
			// Reset the transform to its original value
			this.setMatrix( this._origTransform, { animate: true });
			// Set the zoom range's value to the original zoom level
			this.$zoomRange.val( this.getMatrix()[0] );
		},

		/**
		 * Retrieve the current transform matrix for $elem
		 * @returns {Array} Returns the current transform matrix split up into it's parts, or a default matrix
		 */
		getMatrix: function() {
			// Use style rather than computed
			// If currently transitioning, computed transform might be unchanged
			// SVG uses the transform attribute
			var matrix = rmatrix.exec( this._getTransform() );
			if ( matrix ) {
				matrix.shift();
			}
			return matrix || [ 1, 0, 0, 1, 0, 0 ];
		},

		/**
		 * Given a matrix object, quickly set the current matrix of the element
		 * @param {Array|String} matrix
		 * @param {Boolean} [animate] Whether to animate the transform change
		 * @param {Object} [options]
		 * @param {Boolean} [options.animate] Whether to animate the transform change
		 * @param {Boolean} [options.silent] If true, the change event will not be triggered
		 */
		setMatrix: function( matrix, options ) {
			if ( !options ) { options = {}; }
			if ( $.type(matrix) === "array" ) {
				matrix = "matrix(" + matrix.join(",") + ")";
			}
			if ( options.animate ) {
				this.transition();
			}
			$[ this.isSVG ? "attr" : "style" ]( this.elem, "transform", matrix || "none" );
			if ( !options.silent ) {
				this._trigger( "change", matrix );
			}
		},

		/**
		 * Apply the current transition to the element, if allowed
		 * @param {Boolean} [off] Indicates that the transition should be turned off
		 */
		transition: function( off ) {
			var transition = off || !this.options.transition ? "none" : this._transition;
			$.style( this.elem, "transition", transition );
		},

		/**
		 * Zoom in/out the element using the scale properties of a transform matrix
		 * @param {Number|Boolean} [scale] The scale to which to zoom or a boolean indicating to transition a zoom out
		 * @param {Boolean} [noSetRange] Specify that the method should not set the $zoomRange value (as is the case when $zoomRange is calling zoom on change)
		 */
		zoom: function( scale, noSetRange ) {
			var animate;
			var options = this.options;
			if ( options.disableZoom ) { return; }
			var matrix = this.getMatrix();

			// Calculate zoom based on increment
			if ( typeof scale !== "number" ) {
				scale = +matrix[0] + (this.options.increment * (scale ? -1 : 1));
				animate = true;
			}

			// Constrain scale
			if ( scale > options.maxScale ) {
				scale = options.maxScale;
			} else if ( scale < options.minScale ) {
				scale = options.minScale;
			}

			if ( !noSetRange ) {
				this.$zoomRange.val( scale );
			}

			matrix[0] = matrix[3] = scale;
			this.setMatrix( matrix, animate );
		},

		/**
		 * Get/set option on an existing instance
		 * @returns {Array|undefined} If getting, returns an array of all values
		 *   on each instance for a given key. If setting, continue chaining by returning undefined.
		 */
		option: function( key, value ) {
			var options;
			if ( !key ) {
				// Avoids returning direct reference
				return $.extend( {}, this.options );
			}

			if ( typeof key === "string" ) {
				if ( arguments.length === 1 ) {
					return this.options[ key ];
				}
				options = {};
				options[ key ] = value;
			} else {
				options = key;
			}

			this._setOptions( options );
		},

		/**
		 * Internally sets options
		 * @param {Object} options - An object literal of options to set
		 */
		_setOptions: function( options ) {
			var self = this;
			$.each( options, function( key, value ) {
				switch( key ) {
					case "disablePan":
						self._resetStyle();
						/* falls through */
					case "disableZoom":
					case "$zoomIn":
					case "$zoomOut":
					case "$zoomRange":
					case "$reset":
					case "onEnd":
					case "onChange":
					case "eventNamespace":
						self._unbind();
				}
				self.options[ key ] = value;
				switch( key ) {
					case "disablePan":
						self._initStyle();
						/* falls through */
					case "disableZoom":
					case "$zoomIn":
					case "$zoomOut":
					case "$zoomRange":
					case "$reset":
					case "onEnd":
					case "onChange":
					case "eventNamespace":
						self._bind();
						break;
					case "cursor":
						$.style( self.elem, "cursor", value );
						break;
					case "minScale":
						self.$zoomRange.attr( "min", value );
						break;
					case "maxScale":
						self.$zoomRange.attr( "max", value );
						break;
					case "duration":
					case "easing":
						self._buildTransition();
						/* falls through */
					case "transition":
						self.transition();
				}
			});
		},

		/**
		 * Initialize base styles for the element and its parent
		 */
		_initStyle: function() {
			// Set elem styles
			if ( !this.options.disablePan ) {
				this.$elem.css( "cursor", this.options.cursor );
			}

			// Set parent to relative if set to static
			var $parent = this.$parent;
			// No need to add styles to the body
			if ( $parent.length && !$.nodeName($parent[0], "body") ) {
				var parentStyles = {
					overflow: "hidden"
				};
				if ( $parent.css("position") === "static" ) {
					parentStyles.position = "relative";
				}
				$parent.css( parentStyles );
			}
		},

		/**
		 * Undo any styles attached in this plugin
		 */
		_resetStyle: function() {
			this.$elem.css({
				"cursor": "",
				"transition": ""
			});
			this.$parent.css({
				"overflow": "",
				"position": ""
			});
		},

		/**
		 * Retrieving the transform is different for SVG
		 * @returns {String} Returns the current transform value of the element
		 */
		_getTransform: function() {
			var elem = this.elem;
			if ( this.isSVG ) {
				return $.attr( elem, "transform" );
			}

			var transform = $.style( elem, "transform" );
			// Convert any transforms set by the user to matrix format
			// by setting to computed
			if ( transform !== "none" && !rmatrix.test(transform) ) {
				transform = $.style( elem, "transform", $.css(elem, "transform") );
			}
			return transform;
		},

		/**
		 * Builds the prefixed transform property name
		 * and tracks the original transform value
		 */
		_buildTransform: function() {
			// Save the original transform
			// Retrieving this also adds the correct prefixed style name
			// to jQuery's internal $.cssProps
			this._origTransform = this._getTransform();
			// De-camelcase
			this._transform = $.cssProps.transform.replace( rupper, "-$1" ).toLowerCase();
		},

		/**
		 * Set transition property for later use when zooming
		 * If SVG, create necessary animations elements for translations and scaling
		 */
		_buildTransition: function() {
			var options = this.options;
			if ( this._transform ) {
				this._transition = this._transform + " " + options.duration + "ms " + options.easing;
			}
		},

		/**
		 * Calculates the distance between two touch points
		 * Remember pythagorean?
		 * @param {Array} touches
		 * @returns {Number} Returns the distance
		 */
		_getDistance: function( touches ) {
			var touch1 = touches[0];
			var touch2 = touches[1];
			return Math.sqrt( Math.pow(Math.abs( touch2.pageX - touch1.pageX ), 2) + Math.pow(Math.abs( touch2.pageY - touch1.pageY ), 2) );
		},

		/**
		 * Constructs an approximated point in the middle of two touch points
		 * @returns {Object} Returns an object containing pageX and pageY
		 */
		_getMiddle: function( touches ) {
			var touch1 = touches[0];
			var touch2 = touches[1];
			return {
				pageX: Math.abs( touch2.pageX - touch1.pageX ) / 2 + touch1.pageX,
				pageY: Math.abs( touch2.pageY - touch1.pageY ) / 2 + touch1.pageY
			};
		},

		/**
		 * Trigger a panzoom event on our element
		 * The event is passed the Panzoom instance
		 * @param {String} name
		 * @param {Mixed} arg1[, arg2, arg3, ...] Arguments to append to the trigger
		 */
		_trigger: function ( name ) {
			this.$elem.triggerHandler( "panzoom" + name, [this].concat(slice.call( arguments, 1 )) );
		},

		/**
		 * Starts the pan
		 * This is bound to mouse/touchmove on the element
		 * @param {Number|TouchList} startPageX The pageX on the mousedown event or the touches list
		 * @param {Number} startPageY The pageY on the mousedown event
		 */
		_startMove: function( startPageX, startPageY ) {
			var move, touches, startDistance, startScale, startMiddle;
			var self = this;
			var options = this.options;
			var ns = options.eventNamespace;
			var $doc = $(document).off( ns );
			var matrix = this.getMatrix();
			var original = matrix.slice( 0 );

			// Remove any transitions happening
			this.transition( true );

			if ( arguments.length === 1 ) {
				touches = startPageX;
				startDistance = this._getDistance( touches );
				startScale = +matrix[0];
				startMiddle = this._getMiddle( touches );
				move = function( e ) {
					e.preventDefault();

					// Calculate move on middle point
					touches = e.touches;
					var middle = self._getMiddle( touches );
					matrix[4] = +original[4] + middle.pageX - startMiddle.pageX;
					matrix[5] = +original[5] + middle.pageY - startMiddle.pageY;
					self.setMatrix( matrix );

					// Set zoom
					var diff = self._getDistance( touches ) - startDistance;
					self.zoom( diff / 300 + startScale );
				};
			} else {

				/**
				 * Mousemove/touchmove function to pan the element
				 * @param {Object} e Event object
				 */
				move = function( e ) {
					e.preventDefault();
					matrix[4] = +original[4] + e.pageX - startPageX;
					matrix[5] = +original[5] + e.pageY - startPageY;
					self.setMatrix( matrix );
				};
			}

			// Bind the handlers
			$doc
				.on( (touchSupported ? "touchend" : "mouseup") + ns, function( e ) {
					e.preventDefault();
					$(this).off( ns );
					// Trigger our end event
					// jQuery's not is used here to compare Array equality
					self._trigger( "end", !!$(original).not(matrix).length );
				})
				.on( (touchSupported ? "touchmove" : "mousemove") + ns, move );
		},

		/**
		 * Bind all necessary events
		 */
		_bind: function() {
			var self = this;
			var ns = this.options.eventNamespace;
			var str_click = (touchSupported ? "touchend" : "click") + ns;
			var str_start = (touchSupported ? "touchstart" : "mousedown") + ns;
			var options = this.options;
			var events = {};

			// Bind panzoom events from options
			$.each([ "End", "Change" ], function( i, method ) {
				var m = options[ "on" + method ];
				if ( $.isFunction(m) ) {
					events[ "panzoom" + method.toLowerCase() + ns ] = m;
				}
			});

			// Bind $elem drag and click events
			if ( touchSupported ) {
				// Bind touchstart if either panning or zooming is enabled
				if ( !options.disablePan || !options.disableZoom ) {
					events[ str_start ] = function( e ) {
						var touches = e.touches;
						if ( touches ) {
							if ( touches.length === 1 && !options.disablePan ) {
								e.preventDefault();
								self._startMove( e.pageX, e.pageY );
							} else if ( touches.length === 2 ) {
								e.preventDefault();
								self._startMove( touches );
							}
						}
					};
				}
			} else if ( !options.disablePan ) {
				events[ str_start ] = function( e ) {
					// Bypass right click
					if ( e.which === 1 && e.pageX != null && e.pageY != null ) {
						e.preventDefault();
						self._startMove( e.pageX, e.pageY );
					}
				};
			}
			if ( events ) {
				this.$elem.on( events );
			}

			// No bindings if zooming is disabled
			if ( options.disableZoom ) {
				return;
			}

			var $zoomIn = this.$zoomIn;
			var $zoomOut = this.$zoomOut;
			var $zoomRange = this.$zoomRange;
			var $reset = this.$reset;

			// Bind zoom in/out
			// Don't bind one without the other
			if ( $zoomIn.length && $zoomOut.length ) {
				$zoomIn.on( str_click, function( e ) { e.preventDefault(); self.zoom(); });
				$zoomOut.on( str_click, function( e ) { e.preventDefault(); self.zoom( true ); });
			}

			if ( $zoomRange.length ) {
				// Set default attributes
				$zoomRange.attr({
					min: options.minScale,
					max: options.maxScale,
					step: 0.05
				}).prop({
					value: this.getMatrix()[0]
				});
				events = {};
				events[ str_start ] = function() {
					self.transition( true );
				};
				events[ "change" + ns ] = function() {
					self.zoom( +this.value, true );
				};
				$zoomRange.on( events );
			}

			// Bind reset
			if ( $reset.length ) {
				$reset.on( str_click, function( e ) { e.preventDefault(); self.reset(); });
			}
		},

		/**
		 * Unbind all minimal lightbox clicks
		 */
		_unbind: function() {
			this.$elem
				.add( this.$zoomIn )
				.add( this.$zoomOut )
				.add( this.$reset )
				.off( this.options.eventNamespace );
		}
	};

	/**
	 * Extend jQuery
	 * @param {Object|String} options - The name of a method to call on the prototype
	 *  or an object literal of options
	 * @returns {jQuery|Mixed} jQuery instance for regular chaining or the return value(s) of a panzoom method call
	 */
	$.fn.panzoom = function( options ) {
		var instance, args, m, ret;

		// Call methods widget-style
		if ( typeof options === "string" ) {
			ret = [];
			args = slice.call( arguments, 1 );
			this.each(function() {
				instance = $.data( this, datakey );

				if ( !instance ) {
					ret.push( undefined );

				// Ignore methods beginning with `_`
				} else if ( options.charAt(0) !== "_" &&
					typeof (m = instance[ options ]) === "function" &&
					// If nothing is returned, do not add to return values
					(m = m.apply( instance, args )) !== undefined ) {

					ret.push( m );
				}
			});

			// Return an array of values for the jQuery instances
			// Or the value itself if there is only one
			// Or keep chaining
			return ret.length ?
				(ret.length === 1 ? ret[0] : ret) :
				this;
		}

		return this.each(function() { new Panzoom( this, options ); });
	};

	return Panzoom;
}));
