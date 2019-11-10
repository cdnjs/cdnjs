/**
 * @author  Mudit Ameta
 * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT
 */
(function($) {
	$.fn.isInViewport = function isInViewport(options) {

		if (options) {
			//handle falsy, non-number and non-integer tolerance value
			options.tolerance = Math.round(parseFloat(options.tolerance));
			if (isNaN(options.tolerance))
				options.tolerance = 0;

			//set debug to false if the value isn't boolean
			if (typeof options.debug !== "boolean")
				options.debug = false;
		}

		var normalJsThisObj = this.get(0),
			boundingRect = normalJsThisObj.getBoundingClientRect(),
			top = boundingRect.top,
			bottom = boundingRect.bottom,
			endOfPage = ($(window).scrollTop() === ($(document).height() - $(window).height())) ? true : false,
			// hopefully this gets us a unique index in most cases
			index = "" + normalJsThisObj.offsetLeft + normalJsThisObj.offsetTop + boundingRect.height + boundingRect.width,
			settings = $.extend({
				"tolerance": 0,
				"debug": false
			}, options),
			isVisibleFlag = false;

		isInViewport.elementsAfterCurrent = isInViewport.elementsAfterCurrent || {};
		isInViewport.elementsAfterCurrent[index] = isInViewport.elementsAfterCurrent[index] || this.nextAll();

		if (settings.debug) {
			console.log("---------------------------------------");
			console.log("index: " + index);
			console.log("div: " + this.text().trim());
			console.log("top: " + top);
			console.log("bottom: " + bottom);
			console.log("tolerance: " + settings.tolerance);
			console.log("end of page: " + endOfPage);
			console.log("scrollTop: " + $(window).scrollTop());
			console.log("doc height:" + $(document).height());
			console.log("windowHeight using $(window).height(): " + $(window).height());
		}

		if (settings.tolerance) {
			if (top >= 0) {
				if (top <= settings.tolerance) {
					isVisibleFlag = true;
				} else {
					isVisibleFlag = false;
				}
			} else {
				if (bottom > settings.tolerance) {
					isVisibleFlag = true;
				} else {
					isVisibleFlag = false;
				}
			}

		} else {
			if (top >= 0 && top <= $(window).height())
				isVisibleFlag = true;
			else
				isVisibleFlag = false;
		}

		/*If its end of the page*/
		if (endOfPage) {
			/*Element before last or Last Element*/
			if ((isInViewport.elementsAfterCurrent[index].length === 1) || (!isInViewport.elementsAfterCurrent[index].length)) {
				if (top < 0)
					isVisibleFlag = false;
				else
					isVisibleFlag = true;
			}
		}
		return isVisibleFlag;

	};

	$.extend($.expr[':'], {
		'in-viewport': function(currObj, index, meta) {
			if ( !! meta[3])
				return $(currObj).isInViewport({
					tolerance: meta[3]
				});
			else
				return $(currObj).isInViewport();
		}
	});
})(jQuery);