/* http://keith-wood.name/svg.html
   SVG filters for jQuery v1.4.4.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

$.svg.addExtension('filters', SVGFilter);

$.extend($.svg._wrapperClass.prototype, {

	/* Add a filter definition.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  id        (string) the ID for this filter
	   @param  x         (number) the x-coordinate for the left edge of the filter
	   @param  y         (number) the y-coordinate for the top edge of the filter
	   @param  width     (number) the width of the filter
	   @param  height    (number) the height of the filter
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	filter: function(parent, id, x, y, width, height, settings) {
		var args = this._args(arguments, ['id', 'x', 'y', 'width', 'height']);
		return this._makeNode(args.parent, 'filter', $.extend(
			{id: args.id, x: args.x, y: args.y, width: args.width, height: args.height},
			args.settings || {}));
	}
});

/* Extension point for SVG filters.
   Access through svg.filters. */
function SVGFilter(wrapper) {
	this._wrapper = wrapper; // The attached SVG wrapper object
}

$.extend(SVGFilter.prototype, {

	/* Add a distant light filter.
	   @param  parent     (element or jQuery) the parent node for the new filter (optional)
	   @param  result     (string) the ID of this filter
	   @param  azimuth    (number) the angle (degrees) in the XY plane for the light source
	   @param  elevation  (number) the angle (degrees) in the YZ plane for the light source
	   @param  settings   (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	distantLight: function(parent, result, azimuth, elevation, settings) {
		var args = this._wrapper._args(arguments, ['result', 'azimuth', 'elevation']);
		return this._wrapper._makeNode(args.parent, 'feDistantLight', $.extend(
			{result: args.result, azimuth: args.azimuth, elevation: args.elevation},
			args.settings || {}));
	},

	/* Add a point light filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  x         (number) the x-coordinate for the light source
	   @param  y         (number) the y-coordinate for the light source
	   @param  z         (number) the z-coordinate for the light source
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	pointLight: function(parent, result, x, y, z, settings) {
		var args = this._wrapper._args(arguments, ['result', 'x', 'y', 'z']);
		return this._wrapper._makeNode(args.parent, 'fePointLight', $.extend(
			{result: args.result, x: args.x, y: args.y, z: args.z}, args.settings || {}));
	},

	/* Add a spot light filter.
	   Specify all of toX, toY, toZ or none of them.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  x         (number) the x-coordinate for the light source
	   @param  y         (number) the y-coordinate for the light source
	   @param  z         (number) the z-coordinate for the light source
	   @param  toX       (number) the x-coordinate for where the light is pointing (optional)
	   @param  toY       (number) the y-coordinate for where the light is pointing (optional)
	   @param  toZ       (number) the z-coordinate for where the light is pointing (optional)
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	spotLight: function(parent, result, x, y, z, toX, toY, toZ, settings) {
		var args = this._wrapper._args(arguments,
			['result', 'x', 'y', 'z', 'toX', 'toY', 'toZ'], ['toX']);
		var sets = $.extend({result: args.result, x: args.x, y: args.y, z: args.z},
			(args.toX != null ? {pointsAtX: args.toX, pointsAtY: args.toY,
			pointsAtZ: args.toZ} : {}));
		return this._wrapper._makeNode(args.parent, 'feSpotLight',
			$.extend(sets, args.settings || {}));
	},

	/* Add a blend filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  mode      (string) normal | multiply | screen | darken | lighten
	   @param  in1       (string) the first image to blend
	   @param  in2       (string) the second image to blend
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	blend: function(parent, result, mode, in1, in2, settings) {
		var args = this._wrapper._args(arguments, ['result', 'mode', 'in1', 'in2']);
		return this._wrapper._makeNode(args.parent, 'feBlend', $.extend(
			{result: args.result, mode: args.mode, in_: args.in1, in2: args.in2},
			args.settings || {}));
	},

	/* Add a colour matrix filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  in1       (string) the source to colour
	   @param  type      (string) matrix | saturate | hueRotate | luminanceToAlpha
	   @param  values    (number[][]) for 'matrix' the matrix (5x4) values to apply
	                     (number) for 'saturate' 0.0 to 1.0
	                     (number) for 'hueRotate' degrees
	                     (void) for 'luminanceToAlpha'
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	colorMatrix: function(parent, result, in1, type, values, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1', 'type', 'values']);
		if (isArray(args.values)) {
			var vs = '';
			for (var i = 0; i < args.values.length; i++) {
				vs += (i == 0 ? '' : ' ') + args.values[i].join(' ');
			}
			args.values = vs;
		}
		else if (typeof args.values == 'object') {
			args.settings = args.values;
			args.values = null;
		}
		var sets = $.extend({result: args.result, in_: args.in1, type: args.type},
			(args.values != null ? {values: args.values} : {}));
		return this._wrapper._makeNode(args.parent, 'feColorMatrix',
			$.extend(sets, args.settings || {}));
	},

	/* Add a component transfer filter.
	   @param  parent     (element or jQuery) the parent node for the new filter (optional)
	   @param  result     (string) the ID of this filter
	   @param  functions  (object[]) one for each of RGB and A (alpha, optional)
	                      for each entry:
	                      [0] is (string) identity | table | discrete | linear | gamma
	                      [1] is (number[]) for 'table' or 'discrete' the list of
	                      interpolation or step values OR
	                      (number) for 'linear' the slope, for 'gamma' the amplitude,
	                      [2] is (number) for 'linear' the intercept, for 'gamma' the exponent,
	                      [3] is (number) for 'gamma' the offset
	   @param  settings   (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	componentTransfer: function(parent, result, functions, settings) {
		var args = this._wrapper._args(arguments, ['result', 'functions']);
		var node = this._wrapper._makeNode(args.parent, 'feComponentTransfer',
			$.extend({result: args.result}, args.settings || {}));
		var rgba = ['R', 'G', 'B', 'A'];
		for (var i = 0; i < Math.min(4, args.functions.length); i++) {
			var props = args.functions[i];
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
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  operator  (string) over | in | out | atop | xor | arithmetic
	   @param  in1       (string) the first filter to compose
	   @param  in2       (string) the second filter to compose
	   @param  k1        (number) for 'arithmetic' (optional)
	   @param  k2        (number) for 'arithmetic' (optional)
	   @param  k3        (number) for 'arithmetic' (optional)
	   @param  k4        (number) for 'arithmetic' (optional)
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	composite: function(parent, result, operator, in1, in2, k1, k2, k3, k4, settings) {
		var args = this._wrapper._args(arguments, ['result', 'operator',
			'in1', 'in2', 'k1', 'k2', 'k3', 'k4'], ['k1']);
		var sets = $.extend({result: args.result, operator: args.operator,
			'in': args.in1, in2: args.in2},
			(args.k1 != null ? {k1: args.k1, k2: args.k2, k3: args.k3, k4: args.k4} : {}));
		return this._wrapper._makeNode(args.parent, 'feComposite',
			$.extend(sets, args.settings || {}));
	},

	/* Add a convolve matrix filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  order     (int or 'int int') the size(s) of the matrix
	   @param  matrix    (number[][]) the kernel matrix for the convolution
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	convolveMatrix: function(parent, result, order, matrix, settings) {
		var args = this._wrapper._args(arguments, ['result', 'order', 'matrix']);
		var mx = '';
		for (var i = 0; i < args.matrix.length; i++) {
			mx += (i == 0 ? '' : ' ') + args.matrix[i].join(' ');
		}
		args.matrix = mx;
		return this._wrapper._makeNode(args.parent, 'feConvolveMatrix', $.extend(
			{result: args.result, order: args.order, kernelMatrix: args.matrix},
			args.settings || {}));
	},

	/* Add a diffuse lighting filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  colour    (string) the lighting colour (optional)
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	diffuseLighting: function(parent, result, colour, settings) {
		var args = this._wrapper._args(arguments, ['result', 'colour'], ['colour']);
		return this._wrapper._makeNode(args.parent, 'feDiffuseLighting',
			$.extend($.extend({result: args.result},
			(args.colour ? {lightingColor: args.colour} : {})), args.settings || {}));
	},

	/* Add a displacement map filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  in1       (string) the source image
	   @param  in2       (string) the displacement image
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	displacementMap: function(parent, result, in1, in2, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1', 'in2']);
		return this._wrapper._makeNode(args.parent, 'feDisplacementMap',
			$.extend({result: args.result, in_: args.in1, in2: args.in2},
			args.settings || {}));
	},

	/* Add a flood filter.
	   Specify all of x, y, width, height or none of them.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  x         (number) the left coordinate of the rectangle (optional)
	   @param  y         (number) the top coordinate of the rectangle (optional)
	   @param  width     (number) the width of the rectangle (optional)
	   @param  height    (number) the height of the rectangle (optional)
	   @param  colour    (string) the colour to fill with
	   @param  opacity   (number) the opacity 0.0-1.0
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	flood: function(parent, result, x, y, width, height, colour, opacity, settings) {
		var args = this._wrapper._args(arguments,
			['result', 'x', 'y', 'width', 'height', 'colour', 'opacity']);
		if (arguments.length < 6) {
			args.colour = args.x;
			args.opacity = args.y;
			args.settings = args.width;
			args.x = null;
		}
		var sets = $.extend({result: args.result, floodColor: args.colour,
			floodOpacity: args.opacity}, (args.x != null ?
			{x: args.x, y: args.y, width: args.width, height: args.height} : {}));
		return this._wrapper._makeNode(args.parent, 'feFlood',
			$.extend(sets, args.settings || {}));
	},

	/* Add a Gaussian blur filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  in1       (string) the source filter
	   @param  stdDevX   (number) the standard deviation along the x-axis
	   @param  stdDevY   (number) the standard deviation along the y-axis (optional)
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	gaussianBlur: function(parent, result, in1, stdDevX, stdDevY, settings) {
		var args = this._wrapper._args(arguments,
			['result', 'in1', 'stdDevX', 'stdDevY'], ['stdDevY']);
		return this._wrapper._makeNode(args.parent, 'feGaussianBlur', $.extend(
			{result: args.result, in_: args.in1, stdDeviation: args.stdDevX +
			(args.stdDevY ? ' ' + args.stdDevY : '')}, args.settings || {}));
	},

	/* Add an image filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  href      (string) the URL of the image
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	image: function(parent, result, href, settings) {
		var args = this._wrapper._args(arguments, ['result', 'href']);
		var node = this._wrapper._makeNode(args.parent, 'feImage', $.extend(
			{result: args.result}, args.settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', args.href);
		return node;
	},

	/* Add a merge filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  refs      (string[]) the IDs of the filters to merge
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	merge: function(parent, result, refs, settings) {
		var args = this._wrapper._args(arguments, ['result', 'refs']);
		var node = this._wrapper._makeNode(args.parent, 'feMerge', $.extend(
			{result: args.result}, args.settings || {}));
		for (var i = 0; i < args.refs.length; i++) {
			this._wrapper._makeNode(node, 'feMergeNode', {in_: args.refs[i]});
		}
		return node;
	},

	/* Add a morphology filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  in1       (string) the source filter
	   @param  operator  (string) erode | dilate
	   @param  radiusX   (number) the size of the operation in the x-axis
	   @param  radiusY   (number) the size of the operation in the y-axis (optional)
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	morphology: function(parent, result, in1, operator, radiusX, radiusY, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1',
			'operator', 'radiusX', 'radiusY'], ['radiusY']);
		return this._wrapper._makeNode(args.parent, 'feMorphology', $.extend(
			{result: args.result, in_: args.in1, operator: args.operator,
			radius: args.radiusX + (args.radiusY ? ' ' + args.radiusY : '')},
			args.settings || {}));
	},

	/* Add an offset filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  in1       (string) the source filter
	   @param  dX        (number) the offset in the x-axis
	   @param  dY        (number) the offset in the y-axis
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	offset: function(parent, result, in1, dx, dy, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1', 'dx', 'dy']);
		return this._wrapper._makeNode(args.parent, 'feOffset', $.extend(
			{result: args.result, in_: args.in1, dx: args.dx, dy: args.dy},
			args.settings || {}));
	},

	/* Add a specular lighting filter.
	   Numeric params are only optional if following numeric params are also omitted.
	   @param  parent            (element or jQuery) the parent node for the new filter (optional)
	   @param  result            (string) the ID of this filter
	   @param  in1               (string) the source filter
	   @param  surfaceScale      (number) the surface height when Ain = 1 (optional)
	   @param  specularConstant  (number) the ks in Phong lighting model (optional)
	   @param  specularExponent  (number) the shininess 1.0-128.0 (optional)
	   @param  settings          (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	specularLighting: function(parent, result, in1, surfaceScale,
			specularConstant, specularExponent, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1',
			'surfaceScale', 'specularConstant', 'specularExponent'],
			['surfaceScale', 'specularConstant', 'specularExponent']);
		return this._wrapper._makeNode(args.parent, 'feSpecularLighting', $.extend(
			{result: args.result, in_: args.in1, surfaceScale: args.surfaceScale,
			specularConstant: args.specularConstant, specularExponent: args.specularExponent},
			args.settings || {}));
	},

	/* Add a tile filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  in1       (string) the source filter
	   @param  x         (number) the left coordinate of the rectangle
	   @param  y         (number) the top coordinate of the rectangle
	   @param  width     (number) the width of the rectangle
	   @param  height    (number) the height of the rectangle
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	tile: function(parent, result, in1, x, y, width, height, settings) {
		var args = this._wrapper._args(arguments,
			['result', 'in1', 'x', 'y', 'width', 'height']);
		return this._wrapper._makeNode(args.parent, 'feTile', $.extend(
			{result: args.result, in_: args.in1, x: args.x, y: args.y,
			width: args.width, height: args.height}, args.settings || {}));
	},

	/* Add a turbulence filter.
	   @param  parent    (element or jQuery) the parent node for the new filter (optional)
	   @param  result    (string) the ID of this filter
	   @param  type      (string) fractalNoise | turbulence
	   @param  baseFreq  (number or 'number number') the base frequency,
	                     optionally separated into x- and y-components
	   @param  octaves   (number) the amount of turbulence (optional)
	   @param  settings  (object) additional settings for the filter (optional)
	   @return  (element) the new filter node */
	turbulence: function(parent, result, type, baseFreq, octaves, settings) {
		var args = this._wrapper._args(arguments, ['result', 'type',
			'baseFreq', 'octaves'], ['octaves']);
		return this._wrapper._makeNode(args.parent, 'feTurbulence', $.extend(
			{result: args.result, type: args.type, baseFrequency: args.baseFreq,
			numOctaves: args.octaves}, args.settings || {}));
	}
});

/* Determine whether an object is an array. */
function isArray(a) {
	return (a && a.constructor == Array);
}

})(jQuery)
