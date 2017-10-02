/* http://keith-wood.name/svg.html
   SVG attribute animations for jQuery v1.4.4.
   Written by Keith Wood (kbwood{at}iinet.com.au) June 2008.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

// Enable animation for all of these SVG numeric attributes -
// named as svg-* or svg* (with first character upper case)
$.each(['x', 'y', 'width', 'height', 'rx', 'ry', 'cx', 'cy', 'r', 'x1', 'y1', 'x2', 'y2',
		'stroke-width', 'strokeWidth', 'opacity', 'fill-opacity', 'fillOpacity',
		'stroke-opacity', 'strokeOpacity', 'stroke-dashoffset', 'strokeDashOffset',
		'font-size', 'fontSize', 'font-weight', 'fontWeight',
		'letter-spacing', 'letterSpacing', 'word-spacing', 'wordSpacing'],
	function(i, attrName) {
		var ccName = attrName.charAt(0).toUpperCase() + attrName.substr(1);
		if ($.cssProps) {
			$.cssProps['svg' + ccName] = $.cssProps['svg-' + attrName] = attrName;
		}
		$.fx.step['svg' + ccName] = $.fx.step['svg-' + attrName] = function(fx) {
			var realAttrName = $.svg._attrNames[attrName] || attrName;
			var attr = fx.elem.attributes.getNamedItem(realAttrName);
			if (!fx.set) {
				fx.start = (attr ? parseFloat(attr.nodeValue) : 0);
				var offset = ($.fn.jquery >= '1.6' ? '' :
					fx.options.curAnim['svg' + ccName] || fx.options.curAnim['svg-' + attrName]);
				if (/^[+-]=/.exec(offset)) {
					fx.end = fx.start + parseFloat(offset.replace(/=/, ''));
				}
				$(fx.elem).css(realAttrName, '');
				fx.set = true;
			}
			var value = (fx.pos * (fx.end - fx.start) + fx.start) + (fx.unit == '%' ? '%' : '');
			(attr ? attr.nodeValue = value : fx.elem.setAttribute(realAttrName, value));
		};
	}
);

// Enable animation for the SVG strokeDashArray attribute
$.fx.step['svgStrokeDashArray'] = $.fx.step['svg-strokeDashArray'] =
$.fx.step['svgStroke-dasharray'] = $.fx.step['svg-stroke-dasharray'] = function(fx) {
	var attr = fx.elem.attributes.getNamedItem('stroke-dasharray');
	if (!fx.set) {
		fx.start = parseDashArray(attr ? attr.nodeValue : '');
		var offset = ($.fn.jquery >= '1.6' ? fx.end :
			fx.options.curAnim['svgStrokeDashArray'] || fx.options.curAnim['svg-strokeDashArray'] ||
			fx.options.curAnim['svgStroke-dasharray'] || fx.options.curAnim['svg-stroke-dasharray']);
		fx.end = parseDashArray(offset);
		if (/^[+-]=/.exec(offset)) {
			offset = offset.split(/[, ]+/);
			if (offset.length % 2 == 1) { // Must have an even number
				var len = offset.length;
				for (var i = 0; i < len; i++) { // So repeat
					offset.push(offset[i]);
				}
			}
			for (var i = 0; i < offset.length; i++) {
				if (/^[+-]=/.exec(offset[i])) {
					fx.end[i] = fx.start[i] + parseFloat(offset[i].replace(/=/, ''));
				}
			}
		}
		fx.set = true;
	}
	var value = $.map(fx.start, function(n, i) {
		return (fx.pos * (fx.end[i] - n) + n);
	}).join(',');
	(attr ? attr.nodeValue = value : fx.elem.setAttribute('stroke-dasharray', value));
};

/* Parse a strokeDashArray definition: dash, gap, ...
   @param  value  (string) the definition
   @return  (number[2n]) the extracted values */
function parseDashArray(value) {
	var dashArray = value.split(/[, ]+/);
	for (var i = 0; i < dashArray.length; i++) {
		dashArray[i] = parseFloat(dashArray[i]);
		if (isNaN(dashArray[i])) {
			dashArray[i] = 0;
		}
	}
	if (dashArray.length % 2 == 1) { // Must have an even number
		var len = dashArray.length;
		for (var i = 0; i < len; i++) { // So repeat
			dashArray.push(dashArray[i]);
		}
	}
	return dashArray;
}

// Enable animation for the SVG viewBox attribute
$.fx.step['svgViewBox'] = $.fx.step['svg-viewBox'] = function(fx) {
	var attr = fx.elem.attributes.getNamedItem('viewBox');
	if (!fx.set) {
		fx.start = parseViewBox(attr ? attr.nodeValue : '');
		var offset = ($.fn.jquery >= '1.6' ? fx.end :
			fx.options.curAnim['svgViewBox'] || fx.options.curAnim['svg-viewBox']);
		fx.end = parseViewBox(offset);
		if (/^[+-]=/.exec(offset)) {
			offset = offset.split(/[, ]+/);
			while (offset.length < 4) {
				offset.push('0');
			}
			for (var i = 0; i < 4; i++) {
				if (/^[+-]=/.exec(offset[i])) {
					fx.end[i] = fx.start[i] + parseFloat(offset[i].replace(/=/, ''));
				}
			}
		}
		fx.set = true;
	}
	var value = $.map(fx.start, function(n, i) {
		return (fx.pos * (fx.end[i] - n) + n);
	}).join(' ');
	(attr ? attr.nodeValue = value : fx.elem.setAttribute('viewBox', value));
};

/* Parse a viewBox definition: x, y, width, height.
   @param  value  (string) the definition
   @return  (number[4]) the extracted values */
function parseViewBox(value) {
	var viewBox = value.split(/[, ]+/);
	for (var i = 0; i < viewBox.length; i++) {
		viewBox[i] = parseFloat(viewBox[i]);
		if (isNaN(viewBox[i])) {
			viewBox[i] = 0;
		}
	}
	while (viewBox.length < 4) {
		viewBox.push(0);
	}
	return viewBox;
}

// Enable animation for the SVG transform attribute
$.fx.step['svgTransform'] = $.fx.step['svg-transform'] = function(fx) {
	var attr = fx.elem.attributes.getNamedItem('transform');
	if (!fx.set) {
		fx.start = parseTransform(attr ? attr.nodeValue : '');
		fx.end = parseTransform(fx.end, fx.start);
		fx.set = true;
	}
	var transform = '';
	for (var i = 0; i < fx.end.order.length; i++) {
		switch (fx.end.order.charAt(i)) {
			case 't':
				transform += ' translate(' +
					(fx.pos * (fx.end.translateX - fx.start.translateX) + fx.start.translateX) + ',' +
					(fx.pos * (fx.end.translateY - fx.start.translateY) + fx.start.translateY) + ')';
				break;
			case 's':
				transform += ' scale(' +
					(fx.pos * (fx.end.scaleX - fx.start.scaleX) + fx.start.scaleX) + ',' +
					(fx.pos * (fx.end.scaleY - fx.start.scaleY) + fx.start.scaleY) + ')';
				break;
			case 'r':
				transform += ' rotate(' +
					(fx.pos * (fx.end.rotateA - fx.start.rotateA) + fx.start.rotateA) + ',' +
					(fx.pos * (fx.end.rotateX - fx.start.rotateX) + fx.start.rotateX) + ',' +
					(fx.pos * (fx.end.rotateY - fx.start.rotateY) + fx.start.rotateY) + ')';
				break;
			case 'x':
				transform += ' skewX(' +
					(fx.pos * (fx.end.skewX - fx.start.skewX) + fx.start.skewX) + ')';
			case 'y':
				transform += ' skewY(' +
					(fx.pos * (fx.end.skewY - fx.start.skewY) + fx.start.skewY) + ')';
				break;
			case 'm':
				var matrix = '';
				for (var j = 0; j < 6; j++) {
					matrix += ',' + (fx.pos * (fx.end.matrix[j] - fx.start.matrix[j]) + fx.start.matrix[j]);
				}				
				transform += ' matrix(' + matrix.substr(1) + ')';
				break;
		}
	}
	(attr ? attr.nodeValue = transform : fx.elem.setAttribute('transform', transform));
};

/* Decode a transform string and extract component values.
   @param  value     (string) the transform string to parse
   @param  original  (object) the settings from the original node
   @return  (object) the combined transformation attributes */
function parseTransform(value, original) {
	value = value || '';
	if (typeof value == 'object') {
		value = value.nodeValue;
	}
	var transform = $.extend({translateX: 0, translateY: 0, scaleX: 0, scaleY: 0,
		rotateA: 0, rotateX: 0, rotateY: 0, skewX: 0, skewY: 0,
		matrix: [0, 0, 0, 0, 0, 0]}, original || {});
	transform.order = '';
	var pattern = /([a-zA-Z]+)\(\s*([+-]?[\d\.]+)\s*(?:[\s,]\s*([+-]?[\d\.]+)\s*(?:[\s,]\s*([+-]?[\d\.]+)\s*(?:[\s,]\s*([+-]?[\d\.]+)\s*[\s,]\s*([+-]?[\d\.]+)\s*[\s,]\s*([+-]?[\d\.]+)\s*)?)?)?\)/g;
	var result = pattern.exec(value);
	while (result) {
		switch (result[1]) {
			case 'translate':
				transform.order += 't';
				transform.translateX = parseFloat(result[2]);
				transform.translateY = (result[3] ? parseFloat(result[3]) : 0);
				break;
			case 'scale':
				transform.order += 's';
				transform.scaleX = parseFloat(result[2]);
				transform.scaleY = (result[3] ? parseFloat(result[3]) : transform.scaleX);
				break;
			case 'rotate':
				transform.order += 'r';
				transform.rotateA = parseFloat(result[2]);
				transform.rotateX = (result[3] ? parseFloat(result[3]) : 0);
				transform.rotateY = (result[4] ? parseFloat(result[4]) : 0);
				break;
			case 'skewX':
				transform.order += 'x';
				transform.skewX = parseFloat(result[2]);
				break;
			case 'skewY':
				transform.order += 'y';
				transform.skewY = parseFloat(result[2]);
				break;
			case 'matrix':
				transform.order += 'm';
				transform.matrix = [parseFloat(result[2]), parseFloat(result[3]),
					parseFloat(result[4]), parseFloat(result[5]),
					parseFloat(result[6]), parseFloat(result[7])];
				break;
		}
		result = pattern.exec(value);
	}
	if (transform.order == 'm' && Math.abs(transform.matrix[0]) == Math.abs(transform.matrix[3]) &&
			transform.matrix[1] != 0 && Math.abs(transform.matrix[1]) == Math.abs(transform.matrix[2])) {
		// Simple rotate about origin and translate
		var angle = Math.acos(transform.matrix[0]) * 180 / Math.PI;
		angle = (transform.matrix[1] < 0 ? 360 - angle : angle);
		transform.order = 'rt';
		transform.rotateA = angle;
		transform.rotateX = transform.rotateY = 0;
		transform.translateX = transform.matrix[4];
		transform.translateY = transform.matrix[5];
	}
	return transform;
}

// Enable animation for all of these SVG colour properties - based on jquery.color.js
$.each(['fill', 'stroke'],
	function(i, attrName) {
		var ccName = attrName.charAt(0).toUpperCase() + attrName.substr(1);
		$.fx.step['svg' + ccName] = $.fx.step['svg-' + attrName] = function(fx) {
			if (!fx.set) {
				fx.start = $.svg._getColour(fx.elem, attrName);
				var toNone = (fx.end == 'none');
				fx.end = (toNone ? $.svg._getColour(fx.elem.parentNode, attrName) : $.svg._getRGB(fx.end));
				fx.end[3] = toNone;
				$(fx.elem).css(attrName, '');
				fx.set = true;
			}
			var attr = fx.elem.attributes.getNamedItem(attrName);
			var colour = 'rgb(' + [
				Math.min(Math.max(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0], 10), 0), 255),
				Math.min(Math.max(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1], 10), 0), 255),
				Math.min(Math.max(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2], 10), 0), 255)
			].join(',') + ')';
			colour = (fx.end[3] && fx.state == 1 ? 'none' : colour);
			(attr ? attr.nodeValue = colour : fx.elem.setAttribute(attrName, colour));
		}
	}
);

/* Find this attribute value somewhere up the node hierarchy.
   @param  elem  (element) the starting element to find the attribute
   @param  attr  (string) the attribute name
   @return  (number[3]) RGB components for the attribute colour */
$.svg._getColour = function(elem, attr) {
	elem = $(elem);
	var colour;
	do {
		colour = elem.attr(attr) || elem.css(attr);
		// Keep going until we find an element that has colour, or exit SVG
		if ((colour != '' && colour != 'none') || elem.hasClass('hasSVG')) {
			break; 
		}
	} while (elem = elem.parent());
	return $.svg._getRGB(colour);
};

/* Parse strings looking for common colour formats.
   @param  colour  (string) colour description to parse
   @return  (number[3]) RGB components of this colour */
$.svg._getRGB = function(colour) {
	var result;
	// Check if we're already dealing with an array of colors
	if (colour && colour.constructor == Array) {
		return (colour.length == 3 || colour.length == 4 ? colour : colours['none']);
	}
	// Look for rgb(num,num,num)
	if (result = /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/.exec(colour)) {
		return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
	}
	// Look for rgb(num%,num%,num%)
	if (result = /^rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)$/.exec(colour)) {
		return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55,
			parseFloat(result[3]) * 2.55];
	}
	// Look for #a0b1c2
	if (result = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(colour)) {
		return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
	}
	// Look for #abc
	if (result = /^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/.exec(colour)) {
		return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16),
			parseInt(result[3] + result[3], 16)];
	}
	// Otherwise, we're most likely dealing with a named color
	return colours[$.trim(colour).toLowerCase()] || colours['none'];
};

// The SVG named colours
var colours = {
	'':						[255, 255, 255, 1],
	none:					[255, 255, 255, 1],
	aliceblue:				[240, 248, 255],
	antiquewhite:			[250, 235, 215],
	aqua:					[0, 255, 255],
	aquamarine:				[127, 255, 212],
	azure:					[240, 255, 255],
	beige:					[245, 245, 220],
	bisque:					[255, 228, 196],
	black:					[0, 0, 0],
	blanchedalmond:			[255, 235, 205],
	blue:					[0, 0, 255],
	blueviolet:				[138, 43, 226],
	brown:					[165, 42, 42],
	burlywood:				[222, 184, 135],
	cadetblue:				[95, 158, 160],
	chartreuse:				[127, 255, 0],
	chocolate:				[210, 105, 30],
	coral:					[255, 127, 80],
	cornflowerblue:			[100, 149, 237],
	cornsilk:				[255, 248, 220],
	crimson:				[220, 20, 60],
	cyan:					[0, 255, 255],
	darkblue:				[0, 0, 139],
	darkcyan:				[0, 139, 139],
	darkgoldenrod:			[184, 134, 11],
	darkgray:				[169, 169, 169],
	darkgreen:				[0, 100, 0],
	darkgrey:				[169, 169, 169],
	darkkhaki:				[189, 183, 107],
	darkmagenta:			[139, 0, 139],
	darkolivegreen:			[85, 107, 47],
	darkorange:				[255, 140, 0],
	darkorchid:				[153, 50, 204],
	darkred:				[139, 0, 0],
	darksalmon:				[233, 150, 122],
	darkseagreen:			[143, 188, 143],
	darkslateblue:			[72, 61, 139],
	darkslategray:			[47, 79, 79],
	darkslategrey:			[47, 79, 79],
	darkturquoise:			[0, 206, 209],
	darkviolet:				[148, 0, 211],
	deeppink:				[255, 20, 147],
	deepskyblue:			[0, 191, 255],
	dimgray:				[105, 105, 105],
	dimgrey:				[105, 105, 105],
	dodgerblue:				[30, 144, 255],
	firebrick:				[178, 34, 34],
	floralwhite:			[255, 250, 240],
	forestgreen:			[34, 139, 34],
	fuchsia:				[255, 0, 255],
	gainsboro:				[220, 220, 220],
	ghostwhite:				[248, 248, 255],
	gold:					[255, 215, 0],
	goldenrod:				[218, 165, 32],
	gray:					[128, 128, 128],
	grey:					[128, 128, 128],
	green:					[0, 128, 0],
	greenyellow:			[173, 255, 47],
	honeydew:				[240, 255, 240],
	hotpink:				[255, 105, 180],
	indianred:				[205, 92, 92],
	indigo:					[75, 0, 130],
	ivory:					[255, 255, 240],
	khaki:					[240, 230, 140],
	lavender:				[230, 230, 250],
	lavenderblush:			[255, 240, 245],
	lawngreen:				[124, 252, 0],
	lemonchiffon:			[255, 250, 205],
	lightblue:				[173, 216, 230],
	lightcoral:				[240, 128, 128],
	lightcyan:				[224, 255, 255],
	lightgoldenrodyellow:	[250, 250, 210],
	lightgray:				[211, 211, 211],
	lightgreen:				[144, 238, 144],
	lightgrey:				[211, 211, 211],
	lightpink:				[255, 182, 193],
	lightsalmon:			[255, 160, 122],
	lightseagreen:			[32, 178, 170],
	lightskyblue:			[135, 206, 250],
	lightslategray:			[119, 136, 153],
	lightslategrey:			[119, 136, 153],
	lightsteelblue:			[176, 196, 222],
	lightyellow:			[255, 255, 224],
	lime:					[0, 255, 0],
	limegreen:				[50, 205, 50],
	linen:					[250, 240, 230],
	magenta:				[255, 0, 255],
	maroon:					[128, 0, 0],
	mediumaquamarine:		[102, 205, 170],
	mediumblue:				[0, 0, 205],
	mediumorchid:			[186, 85, 211],
	mediumpurple:			[147, 112, 219],
	mediumseagreen:			[60, 179, 113],
	mediumslateblue:		[123, 104, 238],
	mediumspringgreen:		[0, 250, 154],
	mediumturquoise:		[72, 209, 204],
	mediumvioletred:		[199, 21, 133],
	midnightblue:			[25, 25, 112],
	mintcream:				[245, 255, 250],
	mistyrose:				[255, 228, 225],
	moccasin:				[255, 228, 181],
	navajowhite:			[255, 222, 173],
	navy:					[0, 0, 128],
	oldlace:				[253, 245, 230],
	olive:					[128, 128, 0],
	olivedrab:				[107, 142, 35],
	orange:					[255, 165, 0],
	orangered:				[255, 69, 0],
	orchid:					[218, 112, 214],
	palegoldenrod:			[238, 232, 170],
	palegreen:				[152, 251, 152],
	paleturquoise:			[175, 238, 238],
	palevioletred:			[219, 112, 147],
	papayawhip:				[255, 239, 213],
	peachpuff:				[255, 218, 185],
	peru:					[205, 133, 63],
	pink:					[255, 192, 203],
	plum:					[221, 160, 221],
	powderblue:				[176, 224, 230],
	purple:					[128, 0, 128],
	red:					[255, 0, 0],
	rosybrown:				[188, 143, 143],
	royalblue:				[65, 105, 225],
	saddlebrown:			[139, 69, 19],
	salmon:					[250, 128, 114],
	sandybrown:				[244, 164, 96],
	seagreen:				[46, 139, 87],
	seashell:				[255, 245, 238],
	sienna:					[160, 82, 45],
	silver:					[192, 192, 192],
	skyblue:				[135, 206, 235],
	slateblue:				[106, 90, 205],
	slategray:				[112, 128, 144],
	slategrey:				[112, 128, 144],
	snow:					[255, 250, 250],
	springgreen:			[0, 255, 127],
	steelblue:				[70, 130, 180],
	tan:					[210, 180, 140],
	teal:					[0, 128, 128],
	thistle:				[216, 191, 216],
	tomato:					[255, 99, 71],
	turquoise:				[64, 224, 208],
	violet:					[238, 130, 238],
	wheat:					[245, 222, 179],
	white:					[255, 255, 255],
	whitesmoke:				[245, 245, 245],
	yellow:					[255, 255, 0],
	yellowgreen:			[154, 205, 50]
};

})(jQuery);
