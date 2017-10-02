/* http://keith-wood.name/svg.html
   SVG filters for jQuery v1.2.0.
   Written by Keith Wood (kbwood@virginbroadband.com.au) August 2007.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

$.svg.addExtension('filters', SVGFilter);

$.extend($.svg._wrapperClass.prototype, {

	/* Add a filter definition.
	   @param  parent    element - the parent node for the new filter
	   @param  id        string - the ID for this filter
	   @param  x         number - the x-coordinate for the left edge of the filter
	   @param  y         number - the y-coordinate for the top edge of the filter
	   @param  width     number - the width of the filter
	   @param  height    number - the height of the filter
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	filter: function(parent, id, x, y, width, height, settings) {
		return this._makeNode(parent, 'filter', $.extend(
			{id: id, x: x, y: y, width: width, height: height}, settings || {}));
	}
});

/* Extension point for SVG filters.
   Access through svg.filters. */
function SVGFilter(wrapper) {
	this._wrapper = wrapper; // The attached SVG wrapper object
}

$.extend(SVGFilter.prototype, {

	/* Add a distant light filter.
	   @param  parent     element - the parent node for the new filter
	   @param  result     string - the ID of this filter
	   @param  azimuth    number - the angle (degrees) in the XY plane for the light source
	   @param  elevation  number - the angle (degrees) in the YZ plane for the light source
	   @param  settings   object - additional settings for the filter (optional)
	   @return  the new filter node */
	distantLight: function(parent, result, azimuth, elevation, settings) {
		return this._wrapper._makeNode(parent, 'feDistantLight', $.extend(
			{result: result, azimuth: azimuth, elevation: elevation}, settings || {}));
	},

	/* Add a point light filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  x         number - the x-coordinate for the light source
	   @param  y         number - the y-coordinate for the light source
	   @param  z         number - the z-coordinate for the light source
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	pointLight: function(parent, result, x, y, z, settings) {
		return this._wrapper._makeNode(parent, 'fePointLight', $.extend(
			{result: result, x: x, y: y, z: z}, settings || {}));
	},

	/* Add a spot light filter.
	   Specify all of toX, toY, toZ or none of them.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  x         number - the x-coordinate for the light source
	   @param  y         number - the y-coordinate for the light source
	   @param  z         number - the z-coordinate for the light source
	   @param  toX       number - the x-coordinate for where the light is pointing (optional)
	   @param  toY       number - the y-coordinate for where the light is pointing (optional)
	   @param  toZ       number - the z-coordinate for where the light is pointing (optional)
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	spotLight: function(parent, result, x, y, z, toX, toY, toZ, settings) {
		if (typeof toX == 'object') {
			settings = toX;
			toX = null;
		}
		var sets = $.extend({result: result, x: x, y: y, z: z}, 
			(toX != null ? {pointsAtX: toX, pointsAtY: toY, pointsAtZ: toZ} : {}));
		return this._wrapper._makeNode(parent, 'feSpotLight', $.extend(sets, settings || {}));
	},

	/* Add a blend filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  mode      string - normal | multiply | screen | darken | lighten
	   @param  in1       string - the first image to blend
	   @param  in2       string - the second image to blend
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	blend: function(parent, result, mode, in1, in2, settings) {
		return this._wrapper._makeNode(parent, 'feBlend', $.extend(
			{result: result, mode: mode, 'in': in1, in2: in2}, settings || {}));
	},

	/* Add a colour matrix filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  in1       string - the source to colour
	   @param  type      string - matrix | saturate | hueRotate | luminanceToAlpha
	   @param  values    number[][] - for 'matrix' the matrix (5x4) values to apply
	                     number - for 'saturate' 0.0 to 1.0
						 number - for 'hueRotate' degrees
						 void - for 'luminanceToAlpha'
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	colorMatrix: function(parent, result, in1, type, values, settings) {
		if (isArray(values)) {
			var vs = '';
			for (var i = 0; i < values.length; i++) {
				vs += (i == 0 ? '' : ' ') + values[i].join(' ');
			}
			values = vs;
		}
		else if (typeof values == 'object') {
			settings = values;
			values = null;
		}
		var sets = $.extend({result: result, 'in': in1, type: type},
			(values != null ? {values: values} : {}));
		return this._wrapper._makeNode(parent, 'feColorMatrix', $.extend(sets, settings || {}));
	},

	/* Add a component transfer filter.
	   @param  parent     element - the parent node for the new filter
	   @param  result     string - the ID of this filter
	   @param  functions  object[] - one for each of RGB and A (alpha, optional)
	                      for each entry: 
	                      [0] is string - identity | table | discrete | linear | gamma
	                      [1] is number[] - for 'table' or 'discrete' the list of 
	                      interpolation or step values OR
	                      number - for 'linear' the slope, for 'gamma' the amplitude,
	                      [2] is number - for 'linear' the intercept, for 'gamma' the exponent,
	                      [3] is number - for 'gamma' the offset
	   @param  settings   object - additional settings for the filter (optional)
	   @return  the new filter node */
	componentTransfer: function(parent, result, functions, settings) {
		var node = this._wrapper._makeNode(parent, 'feComponentTransfer', 
			$.extend({result: result}, settings || {}));
		var rgba = ['R', 'G', 'B', 'A'];
		for (var i = 0; i < Math.min(4, functions.length); i++) {
			var props = functions[i];
			var sets = $.extend({type: props[0]}, 
				(props[0] == 'table' || props[0] == 'discrete' ? {tableValues: props[1].join(' ')} : 
				(props[0] == 'linear' ? {slope: props[1], intercept: props[2]} : 
				(props[0] == 'gamma' ? {amplitude: props[1], 
				exponent: props[2], offset: props[3]} : {}))));
			this._wrapper._makeNode(node, 'feFunc' + rgba[i], sets);
		}
		return node;
	},

	/* Add a composite filter.
	   Specify all of k1, k2, k3, k4 or none of them.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  operator  string - over | in | out | atop | xor | arithmetic
	   @param  in1       string - the first filter to compose
	   @param  in2       string - the second filter to compose
	   @param  k1        number - for 'arithmetic' (optional)
	   @param  k2        number - for 'arithmetic' (optional)
	   @param  k3        number - for 'arithmetic' (optional)
	   @param  k4        number - for 'arithmetic' (optional)
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	composite: function(parent, result, operator, in1, in2, k1, k2, k3, k4, settings) {
		if (typeof k1 == 'object') {
			settings = k1;
			k1 = null;
		}
		var sets = $.extend({result: result, operator: operator, 'in': in1, in2: in2},
			(k1 != null ? {k1: k1, k2: k2, k3: k3, k4: k4} : {}));
		return this._wrapper._makeNode(parent, 'feComposite', 
			$.extend(sets, settings || {}));
	},

	/* Add a convolve matrix filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  order     int or 'int int' - the size(s) of the matrix
	   @param  matrix    number[][] - the kernel matrix for the convolution
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	convolveMatrix: function(parent, result, order, matrix, settings) {
		var mx = '';
		for (var i = 0; i < matrix.length; i++) {
			mx += (i == 0 ? '' : ' ') + matrix[i].join(' ');
		}
		matrix = mx;
		return this._wrapper._makeNode(parent, 'feConvolveMatrix', $.extend(
			{result: result, order: order, kernelMatrix: matrix}, settings || {}));
	},

	/* Add a diffuse lighting filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  colour    string - the lighting colour (optional)
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	diffuseLighting: function(parent, result, colour, settings) {
		if (typeof colour == 'object') {
			settings = colour;
			colour = null;
		}
		return this._wrapper._makeNode(parent, 'feDiffuseLighting', 
			$.extend($.extend({result: result}, (colour ? {'lighting-color': colour} : {})), settings || {}));
	},

	/* Add a displacement map filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  in1       string - the source image
	   @param  in2       string - the displacement image
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	displacementMap: function(parent, result, in1, in2, settings) {
		return this._wrapper._makeNode(parent, 'feDisplacementMap', 
			$.extend({result: result, 'in': in1, in2: in2}, settings || {}));
	},

	/* Add a flood filter.
	   Specify all of x, y, width, height or none of them.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  x         number - the left coordinate of the rectangle (optional)
	   @param  y         number - the top coordinate of the rectangle (optional)
	   @param  width     number - the width of the rectangle (optional)
	   @param  height    number - the height of the rectangle (optional)
	   @param  colour    string - the colour to fill with
	   @param  opacity   number - the opacity 0.0-1.0
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	flood: function(parent, result, x, y, width, height, colour, opacity, settings) {
		if (arguments.length < 6) {
			colour = x;
			opacity = y;
			settings = width;
			x = null;
		}
		var sets = $.extend({result: result, 'flood-color': colour, 'flood-opacity': opacity},
			(x != null ? {x: x, y: y, width: width, height: height} : {}));
		return this._wrapper._makeNode(parent, 'feFlood', 
			$.extend(sets, settings || {}));
	},

	/* Add a Gaussian blur filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  in1       string - the source filter
	   @param  stdDevX   number - the standard deviation along the x-axis
	   @param  stdDevY   number - the standard deviation along the y-axis (optional)
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	gaussianBlur: function(parent, result, in1, stdDevX, stdDevY, settings) {
		if (typeof stdDevY == 'object') {
			settings = stdDevY;
			stdDevY = null;
		}
		return this._wrapper._makeNode(parent, 'feGaussianBlur', $.extend(
			{result: result, 'in': in1, stdDeviation: stdDevX + (stdDevY ? ' ' + stdDevY : '')}, 
			settings || {}));
	},

	/* Add an image filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  href      string - the URL of the image
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	image: function(parent, result, href, settings) {
		var node = this._wrapper._makeNode(parent, 'feImage', $.extend(
			{result: result}, settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', href);
		return node;
	},

	/* Add a merge filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  refs      string[] - the IDs of the filters to merge
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	merge: function(parent, result, refs, settings) {
		var node = this._wrapper._makeNode(parent, 'feMerge', $.extend(
			{result: result}, settings || {}));
		for (var i = 0; i < refs.length; i++) {
			this._wrapper._makeNode(node, 'feMergeNode', {'in': refs[i]});
		}
		return node;
	},

	/* Add a morphology filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  in1       string - the source filter
	   @param  operator  string - erode | dilate
	   @param  radiusX   number - the size of the operation in the x-axis
	   @param  radiusY   number - the size of the operation in the y-axis (optional)
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	morphology: function(parent, result, in1, operator, radiusX, radiusY, settings) {
		if (typeof radiusY == 'object') {
			settings = radiusY;
			radiusY = null;
		}
		return this._wrapper._makeNode(parent, 'feMorphology', $.extend(
			{result: result, 'in': in1, operator: operator, 
			radius: radiusX + (radiusY ? ' ' + radiusY : '')}, settings || {}));
	},

	/* Add an offset filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  in1       string - the source filter
	   @param  dX        number - the offset in the x-axis
	   @param  dY        number - the offset in the y-axis
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	offset: function(parent, result, in1, dx, dy, settings) {
		return this._wrapper._makeNode(parent, 'feOffset', $.extend(
			{result: result, 'in': in1, dx: dx, dy: dy}, settings || {}));
	},

	/* Add a specular lighting filter.
	   Numeric params are only optional if following numeric params are also omitted.
	   @param  parent            element - the parent node for the new filter
	   @param  result            string - the ID of this filter
	   @param  in1               string - the source filter
	   @param  surfaceScale      number - the surface height when Ain = 1 (optional)
	   @param  specularConstant  number - the ks in Phong lighting model (optional)
	   @param  specularExponent  number - the shininess 1.0-128.0 (optional)
	   @param  settings          object - additional settings for the filter (optional)
	   @return  the new filter node */
	specularLighting: function(parent, result, in1, surfaceScale, 
			specularConstant, specularExponent, settings) {
		if (typeof surfaceScale == 'object') {
			settings = surfaceScale;
			surfaceScale = null;
		}
		if (typeof specularConstant == 'object') {
			settings = specularConstant;
			specularConstant = null;
		}
		if (typeof specularExponent == 'object') {
			settings = specularExponent;
			specularExponent = null;
		}
		return this._wrapper._makeNode(parent, 'feSpecularLighting', $.extend(
			{result: result, 'in': in1, surfaceScale: surfaceScale, 
			specularConstant: specularConstant, specularExponent: specularExponent}, 
			settings || {}));
	},

	/* Add a tile filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  in1       string - the source filter
	   @param  x         number - the left coordinate of the rectangle
	   @param  y         number - the top coordinate of the rectangle
	   @param  width     number - the width of the rectangle
	   @param  height    number - the height of the rectangle
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	tile: function(parent, result, in1, x, y, width, height, settings) {
		return this._wrapper._makeNode(parent, 'feTile', $.extend(
			{result: result, 'in': in1, x: x, y: y, width: width, height: height}, 
			settings || {}));
	},

	/* Add a turbulence filter.
	   @param  parent    element - the parent node for the new filter
	   @param  result    string - the ID of this filter
	   @param  type      string - fractalNoise | turbulence
	   @param  baseFreq  number or 'number number' - the base frequency,
	                     optionally separated into x- and y-components
	   @param  octaves   number - the amount of turbulence (optional)
	   @param  settings  object - additional settings for the filter (optional)
	   @return  the new filter node */
	turbulence: function(parent, result, type, baseFreq, octaves, settings) {
		if (typeof octaves == 'object') {
			settings = octaves;
			octaves = null;
		}
		return this._wrapper._makeNode(parent, 'feTurbulence', $.extend(
			{result: result, type: type, baseFrequency: baseFreq, numOctaves: octaves}, 
			settings || {}));
	}
});

/* Determine whether an object is an array. */
function isArray(a) {
	return (($.browser.safari && typeof a == 'object' && a.length) ||
		(a && a.constructor && a.constructor.toString().match(/\Array\(\)/)));
}

})(jQuery)
