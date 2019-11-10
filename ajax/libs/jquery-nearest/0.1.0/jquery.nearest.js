/*!
 * jQuery Nearest plugin v0.1
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
 */
;(function ($, undefined) {
	function nearest(dimensions, selector) {
		selector || (selector = '*'); // I STRONGLY recommend passing in a selector
		var $all = $(selector),
			filtered = [],
			minDist = Infinity,
			point1x = parseInt(dimensions.x, 10) || 0,
			point1y = parseInt(dimensions.y, 10) || 0,
			point2x = parseInt(point1x + dimensions.w, 10) || point1x,
			point2y = parseInt(point1y + dimensions.h, 10) || point1y,
			hasEach2 = !!$.fn.each2,
			// Shortcuts to help with compression
			min = Math.min,
			max = Math.max;
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
					Math.sqrt(distX * distX + distY * distY);
			if (distT < minDist) {
				filtered = [];
				minDist = distT;
			}
			if (distT == minDist) {
				filtered.push(this);
			}
		});
		return filtered;
	}

	/**
	 *
	 * @return jQuery object - can be 0 length
	 */
	$.nearest = function (point, selector) {
		if (!point || point.x === undefined || point.y === undefined) {
			return $([]);
		}
		return $(nearest(point, selector));
	};

	$.fn.nearest = function (selector) {
		if (selector && $.isPlainObject(selector)) {
			return this.pushStack(nearest(selector, this));
		}
		var offset = this.offset(),
			dimensions = {
				x: offset.left,
				y: offset.top,
				w: this.outerWidth(),
				h: this.outerHeight()
			};
		return this.pushStack(nearest(dimensions, selector));
	};
})(jQuery);
