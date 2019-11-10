/**
 * @author  Mudit Ameta
 * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT
 */
(function($) {
	$.fn.isInViewport = function isInViewport(options) {
		
		if (typeof isInViewport.firstRun === 'undefined')
			isInViewport.firstRun = true;
		else
			isInViewport.firstRun = false;

		/*If its the first run then setup a handler for window onresize event so that
		we can update the windowHeight. We need to do this to keep our 
		endOfPage calculations current. We also assign it an initial value*/
		if (isInViewport.firstRun){
			$(window).resize(function(){
				isInViewport.windowHeight = $(window).height();
			});
			isInViewport.windowHeight = $(window).height();
		}

		var normalJsThisObj = this.get(0),
			boundingRect = normalJsThisObj.getBoundingClientRect(),
			top = boundingRect.top,
			bottom = boundingRect.bottom,
			endOfPage = ($(window).scrollTop() === ($(document).height() - isInViewport.windowHeight)) ? true : false,
			// hopefully this gets us a unique index in most cases
			index = "" + normalJsThisObj.offsetLeft + normalJsThisObj.offsetTop + boundingRect.height + boundingRect.width,
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
			if (top >= 0 && top <= isInViewport.windowHeight)
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