(function($) {
	$.fn.isInViewport = function isInViewport(options) {

		var boundingRect = this.get(0).getBoundingClientRect(),
			top = boundingRect.top,
			bottom = boundingRect.bottom,
			windowHeight = $(window).height(),
			endOfPage = ($(window).scrollTop() === ($(document).height() - windowHeight)) ? true : false,
			// hopefully this gets us a unique index in most cases
			index = "" + this.get(0).offsetLeft + this.get(0).offsetTop + this.get(0).offsetHeight + this.get(0).offsetWidth,
			settings = $.extend({
				"tolerance": 0,
				"debug": false
			}, options),
			tolerance = settings.tolerance,
			isVisibleFlag = false;


		isInViewport.elementsAfterCurrent = isInViewport.elementsAfterCurrent || {};
		isInViewport.elementsAfterCurrent[index] = isInViewport.elementsAfterCurrent[index] || this.nextAll();

		if (settings.debug) {
			console.log("---------------------------------------");
			console.log("index: " + index);
			console.log("div: " + this.text().trim());
			console.log("top: " + top);
			console.log("bottom: " + bottom);
			console.log("tolerance: " + tolerance);
			console.log("end of page: " + endOfPage);
		}

		if (tolerance) {
			if (top >= 0) {
				if (top <= tolerance) {
					isVisibleFlag = true;
				} else {
					isVisibleFlag = false;
				}
			} else {
				if (bottom > tolerance) {
					isVisibleFlag = true;
				} else {
					isVisibleFlag = false;
				}
			}

		} else {
			if (top >= 0 && top <= windowHeight)
				isVisibleFlag = true;
			else
				isVisibleFlag = false;
		}

		/*If its end of the page*/
		if (endOfPage) {
			/*Element before last*/
			if (isInViewport.elementsAfterCurrent[index].length === 1) {
				if (top < 0)
					isVisibleFlag = false;
				else
					isVisibleFlag = true;

			}
			/*Last element*/
			else if (!isInViewport.elementsAfterCurrent[index].length) {
				if (top < 0)
					isVisibleFlag = false;
				else
					isVisibleFlag = true;
			}
		}
		return isVisibleFlag;

	};
})(jQuery);