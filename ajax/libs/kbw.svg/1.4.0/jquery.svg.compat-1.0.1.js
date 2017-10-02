/* http://keith-wood.name/svg.html
   SVG for jQuery compatibility from v1.0.1 to v1.4.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) May 2008.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

var svgManager = null;
var svgGraphing = null;

(function($) { // Hide scope, no $ conflict

svgManager = $.svg;
svgGraphing = $.svg.graphing;
$.svg._rootClass = $.svg._wrapperClass;

$.extend($.svg, {
	/* Retrieve the SVG wrapper for a given division.
	   @param  input     element - division to look for or
						 jQuery - jQuery collection containing the division or
						 string - jQuery selector for the division
	   @return  SVGRoot - the associated SVG wrapper */
	getSVGFor: function(input) {
		input = (input.jquery ? input : $(input));
		return $.svg._getSVG(input);
	}
});

$.extend($.svg._rootClass.prototype, {
	/* Draw a rounded rectangle.
	   @param  parent    element - the parent node for the new shape
	   @param  x         number - the x-coordinate for the left edge of the rectangle
	   @param  y         number - the y-coordinate for the top edge of the rectangle
	   @param  width     number - the width of the rectangle
	   @param  height    number - the height of the rectangle
	   @param  rx        number - the x-radius of the ellipse for the rounded corners
	   @param  ry        number - the y-radius of the ellipse for the rounded corners
	   @param  settings  object - additional settings for the shape (optional)
	   @return  the new shape node */
	roundrect: function(parent, x, y, width, height, rx, ry, settings) {
		return this.rect(parent, x, y, width, height, rx, ry, settings);
	},
});

/* Attach the SVG functionality to a jQuery selection.
   @param  loadURL   string - the URL of the initial document to load (optional)
   @param  onLoad    function - a callback functional invoked following loading (optional)
   @param  settings  object - the new settings to use for this SVG instance (optional)
   @return jQuery object - for chaining further calls */
$.fn.svg = function(loadURL, onLoad, settings) {
	if (typeof loadURL == 'function') {
		settings = onLoad;
		onLoad = loadURL;
		loadURL = null;
	}
	if (loadURL && typeof loadURL == 'object') {
		settings = loadURL;
		loadURL = onLoad = null;
	}
	if (onLoad && typeof onLoad == 'object') {
		settings = onLoad;
		onLoad = null;
	}
	return this.each(function() {
		$.svg._attachSVG(this, {loadURL: loadURL, onLoad: onLoad, settings: settings});
	});
};

})(jQuery);
