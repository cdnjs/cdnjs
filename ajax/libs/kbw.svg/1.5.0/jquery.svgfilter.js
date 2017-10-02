/* http://keith-wood.name/svg.html
   SVG filters for jQuery v1.5.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

$.svg.addExtension('filters', SVGFilter);

$.extend($.svg._wrapperClass.prototype, {

	/** Add a filter definition.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param id {string} The ID for this filter.
		@param x {number} The x-coordinate for the left edge of the filter.
		@param y {number} The y-coordinate for the top edge of the filter.
		@param width {number} The width of the filter.
		@param height {number} The height of the filter.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	filter: function(parent, id, x, y, width, height, settings) {
		var args = this._args(arguments, ['id', 'x', 'y', 'width', 'height']);
		return this._makeNode(args.parent, 'filter', $.extend(
			{id: args.id, x: args.x, y: args.y, width: args.width, height: args.height}, args.settings || {}));
	}
});

/** The SVG filters manager.
	<p>Use the singleton instance of this class, $.svg.filters, 
	to interact with the SVG filters functionality.</p>
	@module SVGFilter */
function SVGFilter(wrapper) {
	this._wrapper = wrapper; // The attached SVG wrapper object
}

$.extend(SVGFilter.prototype, {

	/** Add a distant light filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param azimuth {number} The angle (degrees) in the XY plane for the light source.
		@param elevation {number} The angle (degrees) in the YZ plane for the light source.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	distantLight: function(parent, result, azimuth, elevation, settings) {
		var args = this._wrapper._args(arguments, ['result', 'azimuth', 'elevation']);
		return this._wrapper._makeNode(args.parent, 'feDistantLight', $.extend(
			{result: args.result, azimuth: args.azimuth, elevation: args.elevation}, args.settings || {}));
	},

	/** Add a point light filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param x {number} The x-coordinate for the light source.
		@param y {number} The y-coordinate for the light source.
		@param z {number} The z-coordinate for the light source.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	pointLight: function(parent, result, x, y, z, settings) {
		var args = this._wrapper._args(arguments, ['result', 'x', 'y', 'z']);
		return this._wrapper._makeNode(args.parent, 'fePointLight', $.extend(
			{result: args.result, x: args.x, y: args.y, z: args.z}, args.settings || {}));
	},

	/** Add a spot light filter.
		<p>Specify all of <code>toX</code>, <code>toY</code>, <code>toZ</code> or none of them.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param x {number} The x-coordinate for the light source.
		@param y {number} The y-coordinate for the light source.
		@param z {number} The z-coordinate for the light source.
		@param [toX] {number} The x-coordinate for where the light is pointing.
		@param [toY] {number} The y-coordinate for where the light is pointing.
		@param [toZ] {number} The z-coordinate for where the light is pointing.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	spotLight: function(parent, result, x, y, z, toX, toY, toZ, settings) {
		var args = this._wrapper._args(arguments, ['result', 'x', 'y', 'z', 'toX', 'toY', 'toZ'], ['toX']);
		var sets = $.extend({result: args.result, x: args.x, y: args.y, z: args.z},
			(args.toX != null ? {pointsAtX: args.toX, pointsAtY: args.toY, pointsAtZ: args.toZ} : {}));
		return this._wrapper._makeNode(args.parent, 'feSpotLight', $.extend(sets, args.settings || {}));
	},

	/** Add a blend filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param mode {string} One of 'normal', 'multiply', 'screen', 'darken', 'lighten'.
		@param in1 {string} The first image to blend.
		@param in2 {string} The second image to blend.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	blend: function(parent, result, mode, in1, in2, settings) {
		var args = this._wrapper._args(arguments, ['result', 'mode', 'in1', 'in2']);
		return this._wrapper._makeNode(args.parent, 'feBlend', $.extend(
			{result: args.result, mode: args.mode, in_: args.in1, in2: args.in2}, args.settings || {}));
	},

	/** Add a colour matrix filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param in1 {string} The source to colour.
		@param type {string} One of 'matrix', 'saturate', 'hueRotate', 'luminanceToAlpha'.
		@param values {number[][]|number} For 'matrix' the matrix (5x4) values to apply, for 'saturate' 0.0 to 1.0,
				for 'hueRotate' degrees, for 'luminanceToAlpha' nothing.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	colorMatrix: function(parent, result, in1, type, values, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1', 'type', 'values']);
		if ($.isArray(args.values)) {
			var vs = '';
			for (var i = 0; i < args.values.length; i++) {
				vs += (i === 0 ? '' : ' ') + args.values[i].join(' ');
			}
			args.values = vs;
		}
		else if (typeof args.values === 'object') {
			args.settings = args.values;
			args.values = null;
		}
		var sets = $.extend({result: args.result, in_: args.in1, type: args.type},
			(args.values != null ? {values: args.values} : {}));
		return this._wrapper._makeNode(args.parent, 'feColorMatrix', $.extend(sets, args.settings || {}));
	},

	/** Add a component transfer filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param functions {object[]} One for each of RGB and A (alpha, optional), for each entry:
				[0] {string} one of 'identity', 'table', 'discrete', 'linear', 'gamma',
				[1] {number[]|number} for 'table' or 'discrete' the list of interpolation or step values OR
				for 'linear' the slope, for 'gamma' the amplitude,
				[2] {number} for 'linear' the intercept, for 'gamma' the exponent,
				[3] {number} for 'gamma' the offset.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	componentTransfer: function(parent, result, functions, settings) {
		var args = this._wrapper._args(arguments, ['result', 'functions']);
		var node = this._wrapper._makeNode(args.parent, 'feComponentTransfer',
			$.extend({result: args.result}, args.settings || {}));
		var rgba = ['R', 'G', 'B', 'A'];
		for (var i = 0; i < Math.min(4, args.functions.length); i++) {
			var props = args.functions[i];
			var sets = $.extend({type: props[0]},
				(props[0] === 'table' || props[0] === 'discrete' ? {tableValues: props[1].join(' ')} :
				(props[0] === 'linear' ? {slope: props[1], intercept: props[2]} :
				(props[0] === 'gamma' ? {amplitude: props[1], exponent: props[2], offset: props[3]} : {}))));
			this._wrapper._makeNode(node, 'feFunc' + rgba[i], sets);
		}
		return node;
	},

	/** Add a composite filter.
		<p>Specify all of <code>k1</code>, <code>k2</code>, <code>k3</code>, <code>k4</code> or none of them.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param operator {string} One of 'over', 'in', 'out', 'atop', 'xor', 'arithmetic'.
		@param in1 {string} The first filter to compose.
		@param in2 {string} The second filter to compose.
		@param [k1] {number} For 'arithmetic'.
		@param [k2] {number} For 'arithmetic'.
		@param [k3] {number} For 'arithmetic'.
		@param [k4] {number} For 'arithmetic'.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	composite: function(parent, result, operator, in1, in2, k1, k2, k3, k4, settings) {
		var args = this._wrapper._args(arguments, ['result', 'operator', 'in1', 'in2', 'k1', 'k2', 'k3', 'k4'], ['k1']);
		var sets = $.extend({result: args.result, operator: args.operator, 'in': args.in1, in2: args.in2},
			(args.k1 != null ? {k1: args.k1, k2: args.k2, k3: args.k3, k4: args.k4} : {}));
		return this._wrapper._makeNode(args.parent, 'feComposite', $.extend(sets, args.settings || {}));
	},

	/** Add a convolve matrix filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter
		@param order {number|string} The size(s) of the matrix
				optionally separated into x- and y-components ('number number').
		@param matrix {number[][]} The kernel matrix for the convolution.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	convolveMatrix: function(parent, result, order, matrix, settings) {
		var args = this._wrapper._args(arguments, ['result', 'order', 'matrix']);
		var mx = '';
		for (var i = 0; i < args.matrix.length; i++) {
			mx += (i === 0 ? '' : ' ') + args.matrix[i].join(' ');
		}
		args.matrix = mx;
		return this._wrapper._makeNode(args.parent, 'feConvolveMatrix', $.extend(
			{result: args.result, order: args.order, kernelMatrix: args.matrix}, args.settings || {}));
	},

	/** Add a diffuse lighting filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param [colour] {string} The lighting colour.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	diffuseLighting: function(parent, result, colour, settings) {
		var args = this._wrapper._args(arguments, ['result', 'colour'], ['colour']);
		return this._wrapper._makeNode(args.parent, 'feDiffuseLighting', $.extend($.extend({result: args.result},
			(args.colour ? {lightingColor: args.colour} : {})), args.settings || {}));
	},

	/** Add a displacement map filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param in1 {string} The source image.
		@param in2 {string} The displacement image.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	displacementMap: function(parent, result, in1, in2, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1', 'in2']);
		return this._wrapper._makeNode(args.parent, 'feDisplacementMap',
			$.extend({result: args.result, in_: args.in1, in2: args.in2}, args.settings || {}));
	},

	/** Add a flood filter.
		<p>Specify all of <code>x</code>, <code>y</code>, <code>width</code>, <code>height</code> or none of them.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param [x] {number} The left coordinate of the rectangle.
		@param [y] {number} The top coordinate of the rectangle.
		@param [width] {number} The width of the rectangle.
		@param [height] {number} The height of the rectangle.
		@param colour {string} The colour to fill with.
		@param opacity {number} The opacity 0.0-1.0.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	flood: function(parent, result, x, y, width, height, colour, opacity, settings) {
		var args = this._wrapper._args(arguments, ['result', 'x', 'y', 'width', 'height', 'colour', 'opacity']);
		if (arguments.length < 6) {
			args.colour = args.x;
			args.opacity = args.y;
			args.settings = args.width;
			args.x = null;
		}
		var sets = $.extend({result: args.result, floodColor: args.colour,
			floodOpacity: args.opacity}, (args.x != null ?
			{x: args.x, y: args.y, width: args.width, height: args.height} : {}));
		return this._wrapper._makeNode(args.parent, 'feFlood', $.extend(sets, args.settings || {}));
	},

	/** Add a Gaussian blur filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param in1 {string} The source filter.
		@param stdDevX {number} The standard deviation along the x-axis.
		@param [stdDevY] {number} The standard deviation along the y-axis.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	gaussianBlur: function(parent, result, in1, stdDevX, stdDevY, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1', 'stdDevX', 'stdDevY'], ['stdDevY']);
		return this._wrapper._makeNode(args.parent, 'feGaussianBlur', $.extend(
			{result: args.result, in_: args.in1, stdDeviation: args.stdDevX +
			(args.stdDevY ? ' ' + args.stdDevY : '')}, args.settings || {}));
	},

	/** Add an image filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} the ID of this filter.
		@param href {string} The URL of the image.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	image: function(parent, result, href, settings) {
		var args = this._wrapper._args(arguments, ['result', 'href']);
		var node = this._wrapper._makeNode(args.parent, 'feImage', $.extend({result: args.result}, args.settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', args.href);
		return node;
	},

	/** Add a merge filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param refs {string[])} The IDs of the filters to merge.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	merge: function(parent, result, refs, settings) {
		var args = this._wrapper._args(arguments, ['result', 'refs']);
		var node = this._wrapper._makeNode(args.parent, 'feMerge', $.extend({result: args.result}, args.settings || {}));
		for (var i = 0; i < args.refs.length; i++) {
			this._wrapper._makeNode(node, 'feMergeNode', {in_: args.refs[i]});
		}
		return node;
	},

	/** Add a morphology filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param in1 {string} The source filter.
		@param operator {string} One of 'erode', 'dilate'.
		@param radiusX {number} The size of the operation in the x-axis.
		@param [radiusY] {number} The size of the operation in the y-axis.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	morphology: function(parent, result, in1, operator, radiusX, radiusY, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1', 'operator', 'radiusX', 'radiusY'], ['radiusY']);
		return this._wrapper._makeNode(args.parent, 'feMorphology', $.extend(
			{result: args.result, in_: args.in1, operator: args.operator,
			radius: args.radiusX + (args.radiusY ? ' ' + args.radiusY : '')}, args.settings || {}));
	},

	/** Add an offset filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param in1 {string} The source filter.
		@param dX {number} The offset in the x-axis.
		@param dY {number} The offset in the y-axis.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	offset: function(parent, result, in1, dx, dy, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1', 'dx', 'dy']);
		return this._wrapper._makeNode(args.parent, 'feOffset', $.extend(
			{result: args.result, in_: args.in1, dx: args.dx, dy: args.dy}, args.settings || {}));
	},

	/** Add a specular lighting filter.
		<p>Numeric params are only optional if following numeric params are also omitted.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string}The ID of this filter.
		@param in1 {string} The source filter.
		@param [surfaceScale] {number} The surface height when Ain = 1.
		@param [specularConstant] {number} The ks in Phong lighting model.
		@param [specularExponent] {number} The shininess 1.0-128.0.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	specularLighting: function(parent, result, in1, surfaceScale, specularConstant, specularExponent, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1', 'surfaceScale', 'specularConstant', 'specularExponent'],
			['surfaceScale', 'specularConstant', 'specularExponent']);
		return this._wrapper._makeNode(args.parent, 'feSpecularLighting', $.extend(
			{result: args.result, in_: args.in1, surfaceScale: args.surfaceScale,
			specularConstant: args.specularConstant, specularExponent: args.specularExponent}, args.settings || {}));
	},

	/** Add a tile filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param in1 {string} The source filter.
		@param x {number} The left coordinate of the rectangle.
		@param y {number} The top coordinate of the rectangle.
		@param width {number} The width of the rectangle.
		@param height {number} The height of the rectangle.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	tile: function(parent, result, in1, x, y, width, height, settings) {
		var args = this._wrapper._args(arguments, ['result', 'in1', 'x', 'y', 'width', 'height']);
		return this._wrapper._makeNode(args.parent, 'feTile', $.extend(
			{result: args.result, in_: args.in1, x: args.x, y: args.y,
			width: args.width, height: args.height}, args.settings || {}));
	},

	/** Add a turbulence filter.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param result {string} The ID of this filter.
		@param type {string} One of 'fractalNoise', 'turbulence'.
		@param [baseFreq] {number|string} The base frequency,
				optionally separated into x- and y-components ('number number').
		@param [octaves] {number} The amount of turbulence.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new filter node. */
	turbulence: function(parent, result, type, baseFreq, octaves, settings) {
		var args = this._wrapper._args(arguments, ['result', 'type', 'baseFreq', 'octaves'], ['octaves']);
		return this._wrapper._makeNode(args.parent, 'feTurbulence', $.extend(
			{result: args.result, type: args.type, baseFrequency: args.baseFreq,
			numOctaves: args.octaves}, args.settings || {}));
	}
});

})(jQuery)
