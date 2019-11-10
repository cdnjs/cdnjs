/**
 * @license jquery.panzoom.js v3.1.1
 * Updated: Tue Jul 26 2016
 * Add pan and zoom functionality to any element
 * Copyright (c) timmy willison
 * Released under the MIT license
 * https://github.com/timmywil/jquery.panzoom/blob/master/MIT-License.txt
 */

(function(global, factory) {
	// AMD
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery' ], function(jQuery) {
			return factory(global, jQuery);
		});
	// CommonJS/Browserify
	} else if (typeof exports === 'object') {
		factory(global, require('jquery'));
	// Global
	} else {
		factory(global, global.jQuery);
	}
}(typeof window !== 'undefined' ? window : this, function(window, $) {
	'use strict';

	var document = window.document;
	var datakey = '__pz__';
	var slice = Array.prototype.slice;
	var rIE11 = /trident\/7./i;
	var supportsInputEvent = (function() {
		// IE11 returns a false positive
		if (rIE11.test(navigator.userAgent)) {
			return false;
		}
		var input = document.createElement('input');
		input.setAttribute('oninput', 'return');
		return typeof input.oninput === 'function';
	})();

	// Regex
	var rupper = /([A-Z])/g;
	var rsvg = /^http:[\w\.\/]+svg$/;

	var floating = '(\\-?\\d[\\d\\.e-]*)';
	var commaSpace = '\\,?\\s*';
	var rmatrix = new RegExp(
		'^matrix\\(' +
		floating + commaSpace +
		floating + commaSpace +
		floating + commaSpace +
		floating + commaSpace +
		floating + commaSpace +
		floating + '\\)$'
	);

	/**
	 * Utility for determining transform matrix equality
	 * Checks backwards to test translation first
	 * @param {Array} first
	 * @param {Array} second
	 */
	function matrixEquals(first, second) {
		var i = first.length;
		while(--i) {
			if (Math.round(+first[i]) !== Math.round(+second[i])) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Creates the options object for reset functions
	 * @param {Boolean|Object} opts See reset methods
	 * @returns {Object} Returns the newly-created options object
	 */
	function createResetOptions(opts) {
		var options = { range: true, animate: true };
		if (typeof opts === 'boolean') {
			options.animate = opts;
		} else {
			$.extend(options, opts);
		}
		return options;
	}

	/**
	 * Represent a transformation matrix with a 3x3 matrix for calculations
	 * Matrix functions adapted from Louis Remi's jQuery.transform (https://github.com/louisremi/jquery.transform.js)
	 * @param {Array|Number} a An array of six values representing a 2d transformation matrix
	 */
	function Matrix(a, b, c, d, e, f, g, h, i) {
		if ($.type(a) === 'array') {
			this.elements = [
				+a[0], +a[2], +a[4],
				+a[1], +a[3], +a[5],
				    0,     0,     1
			];
		} else {
			this.elements = [
				a, b, c,
				d, e, f,
				g || 0, h || 0, i || 1
			];
		}
	}

	Matrix.prototype = {
		/**
		 * Multiply a 3x3 matrix by a similar matrix or a vector
		 * @param {Matrix|Vector} matrix
		 * @return {Matrix|Vector} Returns a vector if multiplying by a vector
		 */
		x: function(matrix) {
			var isVector = matrix instanceof Vector;

			var a = this.elements,
				b = matrix.elements;

			if (isVector && b.length === 3) {
				// b is actually a vector
				return new Vector(
					a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
					a[3] * b[0] + a[4] * b[1] + a[5] * b[2],
					a[6] * b[0] + a[7] * b[1] + a[8] * b[2]
				);
			} else if (b.length === a.length) {
				// b is a 3x3 matrix
				return new Matrix(
					a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
					a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
					a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

					a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
					a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
					a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

					a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
					a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
					a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
				);
			}
			return false; // fail
		},
		/**
		 * Generates an inverse of the current matrix
		 * @returns {Matrix}
		 */
		inverse: function() {
			var d = 1 / this.determinant(),
				a = this.elements;
			return new Matrix(
				d * ( a[8] * a[4] - a[7] * a[5]),
				d * (-(a[8] * a[1] - a[7] * a[2])),
				d * ( a[5] * a[1] - a[4] * a[2]),

				d * (-(a[8] * a[3] - a[6] * a[5])),
				d * ( a[8] * a[0] - a[6] * a[2]),
				d * (-(a[5] * a[0] - a[3] * a[2])),

				d * ( a[7] * a[3] - a[6] * a[4]),
				d * (-(a[7] * a[0] - a[6] * a[1])),
				d * ( a[4] * a[0] - a[3] * a[1])
			);
		},
		/**
		 * Calculates the determinant of the current matrix
		 * @returns {Number}
		 */
		determinant: function() {
			var a = this.elements;
			return a[0] * (a[8] * a[4] - a[7] * a[5]) - a[3] * (a[8] * a[1] - a[7] * a[2]) + a[6] * (a[5] * a[1] - a[4] * a[2]);
		}
	};

	/**
	 * Create a vector containing three values
	 */
	function Vector(x, y, z) {
		this.elements = [ x, y, z ];
	}

	/**
	 * Get the element at zero-indexed index i
	 * @param {Number} i
	 */
	Vector.prototype.e = Matrix.prototype.e = function(i) {
		return this.elements[ i ];
	};

	/**
	 * Create a Panzoom object for a given element
	 * @constructor
	 * @param {Element} elem - Element to use pan and zoom
	 * @param {Object} [options] - An object literal containing options to override default options
	 *  (See Panzoom.defaults for ones not listed below)
	 * @param {jQuery} [options.$zoomIn] - zoom in buttons/links collection (you can also bind these yourself
	 *  e.g. $button.on('click', function(e) { e.preventDefault(); $elem.panzoom('zoomIn'); });)
	 * @param {jQuery} [options.$zoomOut] - zoom out buttons/links collection on which to bind zoomOut
	 * @param {jQuery} [options.$zoomRange] - zoom in/out with this range control
	 * @param {jQuery} [options.$reset] - Reset buttons/links collection on which to bind the reset method
	 * @param {Function} [options.on[Start|Change|Zoom|Pan|End|Reset] - Optional callbacks for panzoom events
	 */
	function Panzoom(elem, options) {

		// Allow instantiation without `new` keyword
		if (!(this instanceof Panzoom)) {
			return new Panzoom(elem, options);
		}

		// Sanity checks
		if (elem.nodeType !== 1) {
			$.error('Panzoom called on non-Element node');
		}
		if (!$.contains(document, elem)) {
			$.error('Panzoom element must be attached to the document');
		}

		// Don't remake
		var d = $.data(elem, datakey);
		if (d) {
			return d;
		}

		// Extend default with given object literal
		// Each instance gets its own options
		this.options = options = $.extend({}, Panzoom.defaults, options);
		this.elem = elem;
		var $elem = this.$elem = $(elem);
		this.$set = options.$set && options.$set.length ? options.$set : $elem;
		this.$doc = $(elem.ownerDocument || document);
		this.$parent = $elem.parent();

		// This is SVG if the namespace is SVG
		// However, while <svg> elements are SVG, we want to treat those like other elements
		this.isSVG = rsvg.test(elem.namespaceURI) && elem.nodeName.toLowerCase() !== 'svg';

		this.panning = false;

		// Save the original transform value
		// Save the prefixed transform style key
		// Set the starting transform
		this._buildTransform();

		// Build the appropriately-prefixed transform style property name
		// De-camelcase
		this._transform = $.cssProps.transform.replace(rupper, '-$1').toLowerCase();

		// Build the transition value
		this._buildTransition();

		// Build containment dimensions
		this.resetDimensions();

		// Add zoom and reset buttons to `this`
		var $empty = $();
		var self = this;
		$.each([ '$zoomIn', '$zoomOut', '$zoomRange', '$reset' ], function(i, name) {
			self[ name ] = options[ name ] || $empty;
		});

		this.enable();

		this.scale = this.getMatrix()[0];
		this._checkPanWhenZoomed();

		// Save the instance
		$.data(elem, datakey, this);
	}

	// Attach regex for possible use (immutable)
	Panzoom.rmatrix = rmatrix;

	Panzoom.defaults = {
		// Should always be non-empty
		// Used to bind jQuery events without collisions
		// A guid is not added here as different instantiations/versions of panzoom
		// on the same element is not supported, so don't do it.
		eventNamespace: '.panzoom',

		// Whether or not to transition the scale
		transition: true,

		// Default cursor style for the element
		cursor: 'move',

		// There may be some use cases for zooming without panning or vice versa
		disablePan: false,
		disableZoom: false,

		// Pan only on the X or Y axes
		disableXAxis: false,
		disableYAxis: false,

		// Set whether you'd like to pan on left (1), middle (2), or right click (3)
		which: 1,

		// The increment at which to zoom
		// adds/subtracts to the scale each time zoomIn/Out is called
		increment: 0.3,

		// Turns on exponential zooming
		// If false, zooming will be incremented linearly
		exponential: true,

		// Pan only when the scale is greater than minScale
		panOnlyWhenZoomed: false,

		// min and max zoom scales
		minScale: 0.3,
		maxScale: 6,

		// The default step for the range input
		// Precendence: default < HTML attribute < option setting
		rangeStep: 0.05,

		// Animation duration (ms)
		duration: 200,
		// CSS easing used for scale transition
		easing: 'ease-in-out',

		// Indicate that the element should be contained within it's parent when panning
		// Note: this does not affect zooming outside of the parent
		// Set this value to 'invert' to only allow panning outside of the parent element (basically the opposite of the normal use of contain)
		// 'invert' is useful for a large panzoom element where you don't want to show anything behind it
		contain: false
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
		 * Enable or re-enable the panzoom instance
		 */
		enable: function() {
			// Unbind first
			this._initStyle();
			this._bind();
			this.disabled = false;
		},

		/**
		 * Disable panzoom
		 */
		disable: function() {
			this.disabled = true;
			this._resetStyle();
			this._unbind();
		},

		/**
		 * @returns {Boolean} Returns whether the current panzoom instance is disabled
		 */
		isDisabled: function() {
			return this.disabled;
		},

		/**
		 * Destroy the panzoom instance
		 */
		destroy: function() {
			this.disable();
			$.removeData(this.elem, datakey);
		},

		/**
		 * Builds the restricing dimensions from the containment element
		 * Also used with focal points
		 * Call this method whenever the dimensions of the element or parent are changed
		 */
		resetDimensions: function() {
			// Reset container properties
			this.container = this.$parent[0].getBoundingClientRect();

			// Set element properties
			var elem = this.elem;
			// getBoundingClientRect() works with SVG, offsetWidth does not
			var dims = elem.getBoundingClientRect();
			var absScale = Math.abs(this.scale);
			this.dimensions = {
				width: dims.width,
				height: dims.height,
				left: $.css(elem, 'left', true) || 0,
				top: $.css(elem, 'top', true) || 0,
				// Borders and margins are scaled
				border: {
					top: $.css(elem, 'borderTopWidth', true) * absScale || 0,
					bottom: $.css(elem, 'borderBottomWidth', true) * absScale || 0,
					left: $.css(elem, 'borderLeftWidth', true) * absScale || 0,
					right: $.css(elem, 'borderRightWidth', true) * absScale || 0
				},
				margin: {
					top: $.css(elem, 'marginTop', true) * absScale || 0,
					left: $.css(elem, 'marginLeft', true) * absScale || 0
				}
			};
		},

		/**
		 * Return the element to it's original transform matrix
		 * @param {Boolean} [options] If a boolean is passed, animate the reset (default: true). If an options object is passed, simply pass that along to setMatrix.
		 * @param {Boolean} [options.silent] Silence the reset event
		 */
		reset: function(options) {
			options = createResetOptions(options);
			// Reset the transform to its original value
			var matrix = this.setMatrix(this._origTransform, options);
			if (!options.silent) {
				this._trigger('reset', matrix);
			}
		},

		/**
		 * Only resets zoom level
		 * @param {Boolean|Object} [options] Whether to animate the reset (default: true) or an object of options to pass to zoom()
		 */
		resetZoom: function(options) {
			options = createResetOptions(options);
			var origMatrix = this.getMatrix(this._origTransform);
			options.dValue = origMatrix[ 3 ];
			this.zoom(origMatrix[0], options);
		},

		/**
		 * Only reset panning
		 * @param {Boolean|Object} [options] Whether to animate the reset (default: true) or an object of options to pass to pan()
		 */
		resetPan: function(options) {
			var origMatrix = this.getMatrix(this._origTransform);
			this.pan(origMatrix[4], origMatrix[5], createResetOptions(options));
		},

		/**
		 * Sets a transform on the $set
		 * For SVG, the style attribute takes precedence
		 * and allows us to animate
		 * @param {String} transform
		 */
		setTransform: function(transform) {
			var $set = this.$set;
			var i = $set.length;
			while(i--) {
				$.style($set[i], 'transform', transform);

				// Support IE9-11, Edge 13-14+
				// Set attribute alongside style attribute
				// since IE and Edge do not respect style settings on SVG
				// See https://css-tricks.com/transforms-on-svg-elements/
				if (this.isSVG) {
					$set[i].setAttribute('transform', transform);
				}
			}
		},

		/**
		 * Retrieving the transform is different for SVG
		 *  (unless a style transform is already present)
		 * Uses the $set collection for retrieving the transform
		 * @param {String} [transform] Pass in an transform value (like 'scale(1.1)')
		 *  to have it formatted into matrix format for use by Panzoom
		 * @returns {String} Returns the current transform value of the element
		 */
		getTransform: function(transform) {
			var $set = this.$set;
			var transformElem = $set[0];
			if (transform) {
				this.setTransform(transform);
			} else {

				// IE and Edge still set the transform style properly
				// They just don't render it on SVG
				// So we get a correct value here
				transform = $.style(transformElem, 'transform');

				if (this.isSVG && (!transform || transform === 'none')) {
					transform = $.attr(transformElem, 'transform') || 'none';
				}
			}

			// Convert any transforms set by the user to matrix format
			// by setting to computed
			if (transform !== 'none' && !rmatrix.test(transform)) {

				// Get computed and set for next time
				this.setTransform(transform = $.css(transformElem, 'transform'));
			}

			return transform || 'none';
		},

		/**
		 * Retrieve the current transform matrix for $elem (or turn a transform into it's array values)
		 * @param {String} [transform] matrix-formatted transform value
		 * @returns {Array} Returns the current transform matrix split up into it's parts, or a default matrix
		 */
		getMatrix: function(transform) {
			var matrix = rmatrix.exec(transform || this.getTransform());
			if (matrix) {
				matrix.shift();
			}
			return matrix || [ 1, 0, 0, 1, 0, 0 ];
		},

		/**
		 * Given a matrix object, quickly set the current matrix of the element
		 * @param {Array|String} matrix
		 * @param {Boolean} [animate] Whether to animate the transform change
		 * @param {Object} [options]
		 * @param {Boolean|String} [options.animate] Whether to animate the transform change, or 'skip' indicating that it is unnecessary to set
		 * @param {Boolean} [options.contain] Override the global contain option
		 * @param {Boolean} [options.range] If true, $zoomRange's value will be updated.
		 * @param {Boolean} [options.silent] If true, the change event will not be triggered
		 * @returns {Array} Returns the newly-set matrix
		 */
		setMatrix: function(matrix, options) {
			if (this.disabled) { return; }
			if (!options) { options = {}; }
			// Convert to array
			if (typeof matrix === 'string') {
				matrix = this.getMatrix(matrix);
			}
			var scale = +matrix[0];
			var contain = typeof options.contain !== 'undefined' ? options.contain : this.options.contain;

			// Apply containment
			if (contain) {
				var dims = options.dims;
				if (!dims) {
					this.resetDimensions();
					dims = this.dimensions;
				}
				var container = this.container;
				var width = dims.width;
				var height = dims.height;
				var conWidth = container.width;
				var conHeight = container.height;
				var zoomAspectW = conWidth / width;
				var zoomAspectH = conHeight / height;

				var marginW = ((width - conWidth) / 2);
				var marginH = ((height - conHeight) / 2);

				if (contain === 'invert' || contain === 'automatic' && zoomAspectW < 1.01) {
					matrix[4] = Math.max(Math.min(matrix[4], marginW), -marginW);
				} else {
					matrix[4] = Math.min(Math.max(matrix[4], marginW), -marginW);
				}

				if (contain === 'invert' || (contain === 'automatic' && zoomAspectH < 1.01)) {
					matrix[5] = Math.max(Math.min(matrix[5], marginH), -marginH);
				} else {
					matrix[5] = Math.min(Math.max(matrix[5], marginH), -marginH);
				}
			}

			// Animate
			if (options.animate !== 'skip') {
				// Set transition
				this.transition(!options.animate);
			}

			// Update range element
			if (options.range) {
				this.$zoomRange.val(scale);
			}

			// Set the matrix on this.$set
			if (this.options.disableXAxis || this.options.disableYAxis) {
				var originalMatrix = this.getMatrix();
				if (this.options.disableXAxis) {
					matrix[4] = originalMatrix[4];
				}
				if (this.options.disableYAxis) {
					matrix[5] = originalMatrix[5];
				}
			}
			this.setTransform('matrix(' + matrix.join(',') + ')');

			this.scale = scale;

			// Disable/enable panning if zooming is at minimum and panOnlyWhenZoomed is true
			this._checkPanWhenZoomed(scale);

			if (!options.silent) {
				this._trigger('change', matrix);
			}

			return matrix;
		},

		/**
		 * @returns {Boolean} Returns whether the panzoom element is currently being dragged
		 */
		isPanning: function() {
			return this.panning;
		},

		/**
		 * Apply the current transition to the element, if allowed
		 * @param {Boolean} [off] Indicates that the transition should be turned off
		 */
		transition: function(off) {
			if (!this._transition) { return; }
			var transition = off || !this.options.transition ? 'none' : this._transition;
			var $set = this.$set;
			var i = $set.length;
			while(i--) {
				// Avoid reflows when zooming
				if ($.style($set[i], 'transition') !== transition) {
					$.style($set[i], 'transition', transition);
				}
			}
		},

		/**
		 * Pan the element to the specified translation X and Y
		 * Note: this is not the same as setting jQuery#offset() or jQuery#position()
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Object} [options] These options are passed along to setMatrix
		 * @param {Array} [options.matrix] The matrix being manipulated (if already known so it doesn't have to be retrieved again)
		 * @param {Boolean} [options.silent] Silence the pan event. Note that this will also silence the setMatrix change event.
		 * @param {Boolean} [options.relative] Make the x and y values relative to the existing matrix
		 */
		pan: function(x, y, options) {
			if (this.options.disablePan) { return; }
			if (!options) { options = {}; }
			var matrix = options.matrix;
			if (!matrix) {
				matrix = this.getMatrix();
			}
			// Cast existing matrix values to numbers
			if (options.relative) {
				x += +matrix[4];
				y += +matrix[5];
			}
			matrix[4] = x;
			matrix[5] = y;
			this.setMatrix(matrix, options);
			if (!options.silent) {
				this._trigger('pan', matrix[4], matrix[5]);
			}
		},

		/**
		 * Zoom in/out the element using the scale properties of a transform matrix
		 * @param {Number|Boolean} [scale] The scale to which to zoom or a boolean indicating to transition a zoom out
		 * @param {Object} [opts] All global options can be overwritten by this options object. For example, override the default increment.
		 * @param {Boolean} [opts.noSetRange] Specify that the method should not set the $zoomRange value (as is the case when $zoomRange is calling zoom on change)
		 * @param {jQuery.Event|Object} [opts.focal] A focal point on the panzoom element on which to zoom.
		 *  If an object, set the clientX and clientY properties to the position relative to the parent
		 * @param {Boolean} [opts.animate] Whether to animate the zoom (defaults to true if scale is not a number, false otherwise)
		 * @param {Boolean} [opts.silent] Silence the zoom event
		 * @param {Array} [opts.matrix] Optionally pass the current matrix so it doesn't need to be retrieved
		 * @param {Number} [opts.dValue] Think of a transform matrix as four values a, b, c, d
		 *  where a/d are the horizontal/vertical scale values and b/c are the skew values
		 *  (5 and 6 of matrix array are the tx/ty transform values).
		 *  Normally, the scale is set to both the a and d values of the matrix.
		 *  This option allows you to specify a different d value for the zoom.
		 *  For instance, to flip vertically, you could set -1 as the dValue.
		 */
		zoom: function(scale, opts) {
			// Shuffle arguments
			if (typeof scale === 'object') {
				opts = scale;
				scale = null;
			} else if (!opts) {
				opts = {};
			}
			var options = $.extend({}, this.options, opts);
			// Check if disabled
			if (options.disableZoom) { return; }
			var animate = false;
			var matrix = options.matrix || this.getMatrix();
			var startScale = +matrix[0];

			// Calculate zoom based on increment
			if (typeof scale !== 'number') {
				// Just use a number a little greater than 1
				// Below 1 can use normal increments
				if (options.exponential && startScale - options.increment >= 1) {
					scale = Math[scale ? 'sqrt' : 'pow'](startScale, 2);
				} else {
					scale = startScale + (options.increment * (scale ? -1 : 1));
				}
				animate = true;
			}

			// Constrain scale
			if (scale > options.maxScale) {
				scale = options.maxScale;
			} else if (scale < options.minScale) {
				scale = options.minScale;
			}

			// Calculate focal point based on scale
			var focal = options.focal;
			if (focal && !options.disablePan) {
				// Adapted from code by Florian Günther
				// https://github.com/florianguenther/zui53
				this.resetDimensions();
				var dims = options.dims = this.dimensions;
				var clientX = focal.clientX;
				var clientY = focal.clientY;

				// Adjust the focal point for transform-origin 50% 50%
				// SVG elements have a transform origin of 0 0
				if (!this.isSVG) {
					clientX -= (dims.width / startScale) / 2;
					clientY -= (dims.height / startScale) / 2;
				}

				var clientV = new Vector(clientX, clientY, 1);
				var surfaceM = new Matrix(matrix);
				// Supply an offset manually if necessary
				var o = this.parentOffset || this.$parent.offset();
				var offsetM = new Matrix(1, 0, o.left - this.$doc.scrollLeft(), 0, 1, o.top - this.$doc.scrollTop());
				var surfaceV = surfaceM.inverse().x(offsetM.inverse().x(clientV));
				var scaleBy = scale / matrix[0];
				surfaceM = surfaceM.x(new Matrix([scaleBy, 0, 0, scaleBy, 0, 0]));
				clientV = offsetM.x(surfaceM.x(surfaceV));
				matrix[4] = +matrix[4] + (clientX - clientV.e(0));
				matrix[5] = +matrix[5] + (clientY - clientV.e(1));
			}

			// Set the scale
			matrix[0] = scale;
			matrix[3] = typeof options.dValue === 'number' ? options.dValue : scale;

			// Calling zoom may still pan the element
			this.setMatrix(matrix, {
				animate: typeof options.animate === 'boolean' ? options.animate : animate,
				// Set the zoomRange value
				range: !options.noSetRange
			});

			// Trigger zoom event
			if (!options.silent) {
				this._trigger('zoom', matrix[0], options);
			}
		},

		/**
		 * Get/set option on an existing instance
		 * @returns {Array|undefined} If getting, returns an array of all values
		 *   on each instance for a given key. If setting, continue chaining by returning undefined.
		 */
		option: function(key, value) {
			var options;
			if (!key) {
				// Avoids returning direct reference
				return $.extend({}, this.options);
			}

			if (typeof key === 'string') {
				if (arguments.length === 1) {
					return this.options[ key ] !== undefined ?
						this.options[ key ] :
						null;
				}
				options = {};
				options[ key ] = value;
			} else {
				options = key;
			}

			this._setOptions(options);
		},

		/**
		 * Internally sets options
		 * @param {Object} options - An object literal of options to set
		 */
		_setOptions: function(options) {
			$.each(options, $.proxy(function(key, value) {
				switch(key) {
					case 'disablePan':
						this._resetStyle();
						/* falls through */
					case '$zoomIn':
					case '$zoomOut':
					case '$zoomRange':
					case '$reset':
					case 'disableZoom':
					case 'onStart':
					case 'onChange':
					case 'onZoom':
					case 'onPan':
					case 'onEnd':
					case 'onReset':
					case 'eventNamespace':
						this._unbind();
				}
				this.options[ key ] = value;
				switch(key) {
					case 'disablePan':
						this._initStyle();
						/* falls through */
					case '$zoomIn':
					case '$zoomOut':
					case '$zoomRange':
					case '$reset':
						// Set these on the instance
						this[ key ] = value;
						/* falls through */
					case 'disableZoom':
					case 'onStart':
					case 'onChange':
					case 'onZoom':
					case 'onPan':
					case 'onEnd':
					case 'onReset':
					case 'eventNamespace':
						this._bind();
						break;
					case 'cursor':
						$.style(this.elem, 'cursor', value);
						break;
					case 'minScale':
						this.$zoomRange.attr('min', value);
						break;
					case 'maxScale':
						this.$zoomRange.attr('max', value);
						break;
					case 'rangeStep':
						this.$zoomRange.attr('step', value);
						break;
					case 'startTransform':
						this._buildTransform();
						break;
					case 'duration':
					case 'easing':
						this._buildTransition();
						/* falls through */
					case 'transition':
						this.transition();
						break;
					case 'panOnlyWhenZoomed':
						this._checkPanWhenZoomed();
						break;
					case '$set':
						if (value instanceof $ && value.length) {
							this.$set = value;
							// Reset styles
							this._initStyle();
							this._buildTransform();
						}
				}
			}, this));
		},

		/**
		 * Disable/enable panning depending on whether the current scale
		 * matches the minimum
		 * @param {Number} [scale]
		 * @private
		 */
		_checkPanWhenZoomed: function(scale) {
			if (!scale) {
				scale = this.getMatrix()[0];
			}
			var options = this.options;
			if (options.panOnlyWhenZoomed) {
				var toDisable = scale === options.minScale;
				if (options.disablePan !== toDisable) {
					this.option('disablePan', toDisable);
				}
			}
		},

		/**
		 * Initialize base styles for the element and its parent
		 */
		_initStyle: function() {
			var styles = {
				// Set the same default whether SVG or HTML
				// transform-origin cannot be changed to 50% 50% in IE9-11 or Edge 13-14+
				'transform-origin': this.isSVG ? '0 0' : '50% 50%'
			};
			// Set elem styles
			if (!this.options.disablePan) {
				styles.cursor = this.options.cursor;
			}
			this.$set.css(styles);

			// Set parent to relative if set to static
			var $parent = this.$parent;
			// No need to add styles to the body
			if ($parent.length && !$.nodeName($parent[0], 'body')) {
				styles = {
					overflow: 'hidden'
				};
				if ($parent.css('position') === 'static') {
					styles.position = 'relative';
				}
				$parent.css(styles);
			}
		},

		/**
		 * Undo any styles attached in this plugin
		 */
		_resetStyle: function() {
			this.$elem.css({
				'cursor': '',
				'transition': ''
			});
			this.$parent.css({
				'overflow': '',
				'position': ''
			});
		},

		/**
		 * Binds all necessary events
		 */
		_bind: function() {
			var self = this;
			var options = this.options;
			var ns = options.eventNamespace;
			var str_start = 'touchstart' + ns + ' mousedown' + ns;
			var str_click = 'touchend' + ns + ' click' + ns;
			var events = {};
			var $reset = this.$reset;
			var $zoomRange = this.$zoomRange;

			// Bind panzoom events from options
			$.each([ 'Start', 'Change', 'Zoom', 'Pan', 'End', 'Reset' ], function() {
				var m = options[ 'on' + this ];
				if ($.isFunction(m)) {
					events[ 'panzoom' + this.toLowerCase() + ns ] = m;
				}
			});

			// Bind $elem drag and click/touchdown events
			// Bind touchstart if either panning or zooming is enabled
			if (!options.disablePan || !options.disableZoom) {
				events[ str_start ] = function(e) {
					var touches;
					if (e.type === 'touchstart' ?
						// Touch
						(touches = e.touches || e.originalEvent.touches) &&
							((touches.length === 1 && !options.disablePan) || touches.length === 2) :
						// Mouse: Ignore right click
						!options.disablePan && e.which === options.which) {

						e.preventDefault();
						e.stopPropagation();
						self._startMove(e, touches);
					}
				};
				// Prevent the contextmenu event
				// if we're binding to right-click
				if (options.which === 3) {
					events.contextmenu = false;
				}
			}
			this.$elem.on(events);

			// Bind reset
			if ($reset.length) {
				$reset.on(str_click, function(e) {
					e.preventDefault();
					self.reset();
				});
			}

			// Set default attributes for the range input
			if ($zoomRange.length) {
				$zoomRange.attr({
					// Only set the range step if explicit or
					// set the default if there is no attribute present
					step: options.rangeStep === Panzoom.defaults.rangeStep &&
						$zoomRange.attr('step') ||
						options.rangeStep,
					min: options.minScale,
					max: options.maxScale
				}).prop({
					value: this.getMatrix()[0]
				});
			}

			// No bindings if zooming is disabled
			if (options.disableZoom) {
				return;
			}

			var $zoomIn = this.$zoomIn;
			var $zoomOut = this.$zoomOut;

			// Bind zoom in/out
			// Don't bind one without the other
			if ($zoomIn.length && $zoomOut.length) {
				// preventDefault cancels future mouse events on touch events
				$zoomIn.on(str_click, function(e) {
					e.preventDefault();
					self.zoom();
				});
				$zoomOut.on(str_click, function(e) {
					e.preventDefault();
					self.zoom(true);
				});
			}

			if ($zoomRange.length) {
				events = {};
				// Cannot prevent default action here, just use mousedown
				events[ 'mousedown' + ns ] = function() {
					self.transition(true);
				};
				// Zoom on input events if available and change events
				// See https://github.com/timmywil/jquery.panzoom/issues/90
				events[ (supportsInputEvent ? 'input' : 'change') + ns ] = function() {
					self.zoom(+this.value, { noSetRange: true });
				};
				$zoomRange.on(events);
			}
		},

		/**
		 * Unbind all events
		 */
		_unbind: function() {
			this.$elem
				.add(this.$zoomIn)
				.add(this.$zoomOut)
				.add(this.$reset)
				.off(this.options.eventNamespace);
		},

		/**
		 * Builds the original transform value
		 */
		_buildTransform: function() {
			// Save the original transform
			// Retrieving this also adds the correct prefixed style name
			// to jQuery's internal $.cssProps
			return this._origTransform = this.getTransform(this.options.startTransform);
		},

		/**
		 * Set transition property for later use when zooming
		 */
		_buildTransition: function() {
			if (this._transform) {
				var options = this.options;
				this._transition = this._transform + ' ' + options.duration + 'ms ' + options.easing;
			}
		},

		/**
		 * Calculates the distance between two touch points
		 * Remember pythagorean?
		 * @param {Array} touches
		 * @returns {Number} Returns the distance
		 */
		_getDistance: function(touches) {
			var touch1 = touches[0];
			var touch2 = touches[1];
			return Math.sqrt(Math.pow(Math.abs(touch2.clientX - touch1.clientX), 2) + Math.pow(Math.abs(touch2.clientY - touch1.clientY), 2));
		},

		/**
		 * Constructs an approximated point in the middle of two touch points
		 * @returns {Object} Returns an object containing pageX and pageY
		 */
		_getMiddle: function(touches) {
			var touch1 = touches[0];
			var touch2 = touches[1];
			return {
				clientX: ((touch2.clientX - touch1.clientX) / 2) + touch1.clientX,
				clientY: ((touch2.clientY - touch1.clientY) / 2) + touch1.clientY
			};
		},

		/**
		 * Trigger a panzoom event on our element
		 * The event is passed the Panzoom instance
		 * @param {String|jQuery.Event} event
		 * @param {Mixed} arg1[, arg2, arg3, ...] Arguments to append to the trigger
		 */
		_trigger: function (event) {
			if (typeof event === 'string') {
				event = 'panzoom' + event;
			}
			this.$elem.triggerHandler(event, [this].concat(slice.call(arguments, 1)));
		},

		/**
		 * Starts the pan
		 * This is bound to mouse/touchmove on the element
		 * @param {jQuery.Event} event An event with pageX, pageY, and possibly the touches list
		 * @param {TouchList} [touches] The touches list if present
		 */
		_startMove: function(event, touches) {
			var move, moveEvent, endEvent,
				startDistance, startScale, startMiddle,
				startPageX, startPageY, touch;
			var self = this;
			var options = this.options;
			var ns = options.eventNamespace;
			var matrix = this.getMatrix();
			var original = matrix.slice(0);
			var origPageX = +original[4];
			var origPageY = +original[5];
			var panOptions = { matrix: matrix, animate: 'skip' };

			// Use proper events
			if (event.type === 'touchstart') {
				moveEvent = 'touchmove';
				endEvent = 'touchend';
			} else {
				moveEvent = 'mousemove';
				endEvent = 'mouseup';
			}

			// Add namespace
			moveEvent += ns;
			endEvent += ns;

			// Remove any transitions happening
			this.transition(true);

			// Indicate that we are currently panning
			this.panning = true;

			// Trigger start event
			this._trigger('start', event, touches);

			if (touches && touches.length === 2) {
				startDistance = this._getDistance(touches);
				startScale = +matrix[0];
				startMiddle = this._getMiddle(touches);
				move = function(e) {
					e.preventDefault();
					touches = e.touches || e.originalEvent.touches;

					// Calculate move on middle point
					var middle = self._getMiddle(touches);
					var diff = self._getDistance(touches) - startDistance;

					// Set zoom
					self.zoom(diff * (options.increment / 100) + startScale, {
						focal: middle,
						matrix: matrix,
						animate: false
					});

					// Set pan
					self.pan(
						+matrix[4] + middle.clientX - startMiddle.clientX,
						+matrix[5] + middle.clientY - startMiddle.clientY,
						panOptions
					);
					startMiddle = middle;
				};
			} else {
				if (touches && (touch = touches[0])) {
					startPageX = touch.pageX;
					startPageY = touch.pageY;
				} else {
					startPageX = event.pageX;
					startPageY = event.pageY;
				}

				/**
				 * Mousemove/touchmove function to pan the element
				 * @param {Object} e Event object
				 */
				move = function(e) {
					e.preventDefault();
					touches = e.touches || e.originalEvent.touches;
					var coords;
					if (touches) {
						coords = touches[0] || { pageX: 0, pageY: 0 };
					} else {
						coords = e;
					}

					self.pan(
						origPageX + coords.pageX - startPageX,
						origPageY + coords.pageY - startPageY,
						panOptions
					);
				};
			}

			// Bind the handlers
			$(document)
				.off(ns)
				.on(moveEvent, move)
				.on(endEvent, function(e) {
					e.preventDefault();
					// Unbind all document events
					$(this).off(ns);
					self.panning = false;
					// Trigger our end event
					// Simply set the type to "panzoomend" to pass through all end properties
					// jQuery's `not` is used here to compare Array equality
					e.type = 'panzoomend';
					self._trigger(e, matrix, !matrixEquals(matrix, original));
				});
		}
	};

	// Add Panzoom as a static property
	$.Panzoom = Panzoom;

	/**
	 * Extend jQuery
	 * @param {Object|String} options - The name of a method to call on the prototype
	 *  or an object literal of options
	 * @returns {jQuery|Mixed} jQuery instance for regular chaining or the return value(s) of a panzoom method call
	 */
	$.fn.panzoom = function(options) {
		var instance, args, m, ret;

		// Call methods widget-style
		if (typeof options === 'string') {
			ret = [];
			args = slice.call(arguments, 1);
			this.each(function() {
				instance = $.data(this, datakey);

				if (!instance) {
					ret.push(undefined);

				// Ignore methods beginning with `_`
				} else if (options.charAt(0) !== '_' &&
					typeof (m = instance[ options ]) === 'function' &&
					// If nothing is returned, do not add to return values
					(m = m.apply(instance, args)) !== undefined) {

					ret.push(m);
				}
			});

			// Return an array of values for the jQuery instances
			// Or the value itself if there is only one
			// Or keep chaining
			return ret.length ?
				(ret.length === 1 ? ret[0] : ret) :
				this;
		}

		return this.each(function() { new Panzoom(this, options); });
	};

	return Panzoom;
}));
