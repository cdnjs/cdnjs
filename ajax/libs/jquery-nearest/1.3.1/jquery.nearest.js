/*!
 * jQuery Nearest plugin v1.3.1
 *
 * Finds elements closest to a single point based on screen location and pixel dimensions
 * http://gilmoreorless.github.io/jquery-nearest/
 * Copyright (c) 2011-2015 Gilmore Davidson under the MIT licence:
 *   http://gilmoreorless.github.io/jquery-nearest/LICENSE.txt
 *
 * Requires jQuery 1.4 or above
 * Also supports Ben Alman's "each2" plugin for faster looping (if available)
 */

/**
 * Method signatures:
 *
 * $.nearest({x, y}, selector) - find $(selector) closest to point
 * $(elem).nearest(selector) - find $(selector) closest to elem
 * $(elemSet).nearest({x, y}) - filter $(elemSet) and return closest to point
 *
 * Also:
 * $.furthest()
 * $(elem).furthest()
 *
 * $.touching()
 * $(elem).touching()
 */
;(function ($, undefined) {

	/**
	 * Internal method that does the grunt work
	 *
	 * @param mixed selector Any valid jQuery selector providing elements to filter
	 * @param hash options Key/value list of options for matching elements
	 * @param mixed thisObj (optional) Any valid jQuery selector that represents self
	 *                      for the "includeSelf" option
	 * @return array List of matching elements, can be zero length
	 */
	var rPerc = /^([\d.]+)%$/;
	function nearest(selector, options, thisObj) {
		// Normalise selector and dimensions
		selector || (selector = 'div'); // I STRONGLY recommend passing in a selector
		var $container = $(options.container),
			containerOffset = $container.offset() || {left: 0, top: 0},
			containerWH = [
				$container.width() || 0,
				$container.height() || 0
			],
			containerProps = {
				// prop: [min, max]
				x: [containerOffset.left, containerOffset.left + containerWH[0]],
				y: [containerOffset.top, containerOffset.top + containerWH[1]],
				w: [0, containerWH[0]],
				h: [0, containerWH[1]]
			},
			prop, dims, match;
		for (prop in containerProps) if (containerProps.hasOwnProperty(prop)) {
			match = rPerc.exec(options[prop]);
			if (match) {
				dims = containerProps[prop];
				options[prop] = (dims[1] - dims[0]) * match[1] / 100 + dims[0];
			}
		}

		// Deprecated options - remove in 2.0
		if (options.sameX === false && options.checkHoriz === false) {
			options.sameX = !options.checkHoriz;
		}
		if (options.sameY === false && options.checkVert === false) {
			options.sameY = !options.checkVert;
		}

		// Get elements and work out x/y points
		var $all = $container.find(selector),
			cache = [],
			furthest = !!options.furthest,
			checkX = !options.sameX,
			checkY = !options.sameY,
			onlyX  = !!options.onlyX,
			onlyY  = !!options.onlyY,
			compDist = furthest ? 0 : Infinity,
			point1x = parseFloat(options.x) || 0,
			point1y = parseFloat(options.y) || 0,
			point2x = parseFloat(point1x + options.w) || point1x,
			point2y = parseFloat(point1y + options.h) || point1y,
			tolerance = parseFloat(options.tolerance) || 0,
			hasEach2 = !!$.fn.each2,
			// Shortcuts to help with compression
			min = Math.min,
			max = Math.max;

		// Normalise the remaining options
		if (!options.includeSelf && thisObj) {
			$all = $all.not(thisObj);
		}
		if (tolerance < 0) {
			tolerance = 0;
		}
		// Loop through all elements and check their positions
		$all[hasEach2 ? 'each2' : 'each'](function (i, elem) {
			var $this = hasEach2 ? elem : $(this),
				off = $this.offset(),
				x = off.left,
				y = off.top,
				w = $this.outerWidth(),
				h = $this.outerHeight(),
				x2 = x + w,
				y2 = y + h,
				maxX1 = max(x, point1x),
				minX2 = min(x2, point2x),
				maxY1 = max(y, point1y),
				minY2 = min(y2, point2y),
				intersectX = minX2 >= maxX1,
				intersectY = minY2 >= maxY1,
				distX, distY, distT, isValid;
			if (
				// .nearest() / .furthest()
				(checkX && checkY) ||
				// .touching()
				(!checkX && !checkY && intersectX && intersectY) ||
				// .nearest({sameY: true})
				(checkX && intersectY) ||
				// .nearest({sameX: true})
				(checkY && intersectX) ||
				// .nearest({onlyX: true})
				(checkX && onlyX) ||
				// .nearest({onlyY: true})
				(checkY && onlyY)
			) {
				distX = intersectX ? 0 : maxX1 - minX2;
				distY = intersectY ? 0 : maxY1 - minY2;
				if (onlyX || onlyY) {
					distT = onlyX ? distX : distY;
				} else {
					distT = intersectX || intersectY ?
						max(distX, distY) :
						Math.sqrt(distX * distX + distY * distY);
				}
				isValid = furthest ?
					distT >= compDist - tolerance :
					distT <= compDist + tolerance;
				if (isValid) {
					compDist = furthest ?
						max(compDist, distT) :
						min(compDist, distT);
					cache.push({
						node: this,
						dist: distT
					});
				}
			}
		});
		// Make sure all cached items are within tolerance range
		var len = cache.length,
			filtered = [],
			compMin, compMax,
			i, item;
		if (len) {
			if (furthest) {
				compMin = compDist - tolerance;
				compMax = compDist;
			} else {
				compMin = compDist;
				compMax = compDist + tolerance;
			}
			for (i = 0; i < len; i++) {
				item = cache[i];
				if (item.dist >= compMin && item.dist <= compMax) {
					filtered.push(item.node);
				}
			}
		}
		return filtered;
	}

	$.each(['nearest', 'furthest', 'touching'], function (i, name) {

		// Internal default options
		// Not exposed publicly because they're method-dependent and easily overwritten anyway
		var defaults = {
			x: 0, // X position of top left corner of point/region
			y: 0, // Y position of top left corner of point/region
			w: 0, // Width of region
			h: 0, // Height of region
			tolerance:   1, // Distance tolerance in pixels, mainly to handle fractional pixel rounding bugs
			container:   document, // Container of objects for calculating %-based dimensions
			furthest:    name == 'furthest', // Find max distance (true) or min distance (false)
			includeSelf: false, // Include 'this' in search results (t/f) - only applies to $(elem).func(selector) syntax
			sameX: name === 'touching', // Only match for the same X axis values (t/f)
			sameY: name === 'touching', // Only match for the same Y axis values (t/f)
			onlyX: false, // Only check X axis variations (t/f)
			onlyY: false  // Only check Y axis variations (t/f)
		};

		/**
		 * $.nearest() / $.furthest() / $.touching()
		 *
		 * Utility functions for finding elements near a specific point or region on screen
		 *
		 * @param hash point Co-ordinates for the point or region to measure from
		 *                   "x" and "y" keys are required, "w" and "h" keys are optional
		 * @param mixed selector Any valid jQuery selector that provides elements to filter
		 * @param hash options (optional) Extra filtering options
		 *                     Not technically needed as the options could go on the point object,
		 *                     but it's good to have a consistent API
		 * @return jQuery object containing matching elements in selector
		 */
		$[name] = function (point, selector, options) {
			if (!point || point.x === undefined || point.y === undefined) {
				return $([]);
			}
			var opts = $.extend({}, defaults, point, options || {});
			return $(nearest(selector, opts));
		};

		/**
		 * SIGNATURE 1:
		 *   $(elem).nearest(selector) / $(elem).furthest(selector) / $(elem).touching(selector)
		 *
		 *   Finds all elements in selector that are nearest to/furthest from elem
		 *
		 *   @param mixed selector Any valid jQuery selector that provides elements to filter
		 *   @param hash options (optional) Extra filtering options
		 *   @return jQuery object containing matching elements in selector
		 *
		 * SIGNATURE 2:
		 *   $(elemSet).nearest(point) / $(elemSet).furthest(point) / $(elemSet).touching(point)
		 *
		 *   Filters elemSet to return only the elements nearest to/furthest from point
		 *   Effectively a wrapper for $.nearest(point, elemSet) but with the benefits of method chaining
		 *
		 *   @param hash point Co-ordinates for the point or region to measure from
		 *   @return jQuery object containing matching elements in elemSet
		 */
		$.fn[name] = function (selector, options) {
			if (!this.length) {
				return this.pushStack([]);
			}
			var opts;
			if (selector && $.isPlainObject(selector)) {
				opts = $.extend({}, defaults, selector, options || {});
				return this.pushStack(nearest(this, opts));
			}
			var offset = this.offset(),
				dimensions = {
					x: offset.left,
					y: offset.top,
					w: this.outerWidth(),
					h: this.outerHeight()
				};
			opts = $.extend({}, defaults, dimensions, options || {});
			return this.pushStack(nearest(selector, opts, this));
		};
	});
})(jQuery);
