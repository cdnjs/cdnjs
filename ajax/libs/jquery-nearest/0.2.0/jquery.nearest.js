/*!
 * jQuery Nearest plugin v0.2.0
 *
 * Finds elements closest to a single point based on screen location and pixel dimensions
 *
 * Requires jQuery 1.4 or above
 *
 * Also supports Ben Alman's "each2" plugin for faster looping
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
 * $().furthest()
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
	function nearest(selector, options, thisObj) {
		selector || (selector = '*'); // I STRONGLY recommend passing in a selector
		var $all = $(selector),
			filtered = [],
			furthest = !!options.furthest,
			compDist = furthest ? 0 : Infinity,
			point1x = parseInt(options.x, 10) || 0,
			point1y = parseInt(options.y, 10) || 0,
			point2x = parseInt(point1x + options.w, 10) || point1x,
			point2y = parseInt(point1y + options.h, 10) || point1y,
			hasEach2 = !!$.fn.each2,
			// Shortcuts to help with compression
			min = Math.min,
			max = Math.max;
		if (!options.includeSelf && thisObj) {
			$all = $all.not(thisObj);
		}
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
				intersectX = minX2 > maxX1,
				intersectY = minY2 > maxY1,
				distX = intersectX ? 0 : maxX1 - minX2,
				distY = intersectY ? 0 : maxY1 - minY2,
				distT = intersectX || intersectY ?
					max(distX, distY) :
					Math.sqrt(distX * distX + distY * distY),
				comp = furthest ? distT > compDist : distT < compDist;
			if (comp) {
				filtered = [];
				compDist = distT;
			}
			if (distT == compDist) {
				filtered.push(this);
			}
		});
		return filtered;
	}

	$.each(['nearest', 'furthest'], function (i, name) {
		
		// Internal default options
		// Not exposed publicly because they're method-dependent and easily overwritten anyway
		var defaults = {
			x: 0,
			y: 0,
			w: 0,
			h: 0,
			furthest: name == 'furthest',
			includeSelf: false
		};

		/**
		 * $.nearest() / $.furthest()
		 *
		 * Utility functions for finding elements near a specific point or region on screen
		 *
		 * @param hash point Co-ordinates for the point or region to measure from
		 *                   "x" and "y" keys are required, "w" and "h" keys are optional
		 * @param mixed selector Any valid jQuery selector that provides elements to filter
		 * @return jQuery object containing matching elements in selector
		 */
		$[name] = function (point, selector) {
			if (!point || point.x === undefined || point.y === undefined) {
				return $([]);
			}
			var opts = $.extend({}, defaults, point);
			return $(nearest(selector, opts));
		};

		/**
		 * SIGNATURE 1:
		 *   $(elem).nearest(selector) / $(elem).furthest(selector)
		 *
		 *   Finds all elements in selector that are nearest to/furthest from elem
		 *
		 *   @param mixed selector Any valid jQuery selector that provides elements to filter
		 *   @param hash options (optional) Extra filtering options
		 *   @return jQuery object containing matching elements in selector
		 *
		 * SIGNATURE 2:
		 *   $(elemSet).nearest(point) / $(elemSet).furthest(point)
		 *
		 *   Filters elemSet to return only the elements nearest to/furthest from point
		 *   Effectively a wrapper for $.nearest(point, elemSet) but with the benefits of method chaining
		 *
		 *   @param hash point Co-ordinates for the point or region to measure from
		 *   @return jQuery object containing matching elements in elemSet
		 */
		$.fn[name] = function (selector, options) {
			var opts;
			if (selector && $.isPlainObject(selector)) {
				opts = $.extend({}, defaults, selector);
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
