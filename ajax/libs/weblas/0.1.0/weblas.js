(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.weblas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var WebGL = require("./lib/webgl"),
    GEMMFloatCalculator = require("./lib/gemmfloatcalculator");

module.exports = {
    "WebGL" : WebGL,
    "GEMMFloatCalculator" : GEMMFloatCalculator
};

},{"./lib/gemmfloatcalculator":2,"./lib/webgl":3}],2:[function(require,module,exports){


/* A calculator object for the Float texture based GEMM

	gl - WebGL object

	* uploads and downloads data
	* executes calculation
 */
function GEMMFloatCalculator(webgl){
	this.webgl = webgl;


	// create the webgl shader program for this calculation
	// based on the specific fragment shader for this calculation
	// and the generic pass through shader
	this.program = this.webgl.createProgram(GEMMFloatCalculator.FRAGMENT_SHADER);

}

module.exports = GEMMFloatCalculator;

GEMMFloatCalculator.FRAGMENT_SHADER = "                                      \n\
// fragment shader that calculates the sum of the passed row and         \n\
// column (texture coord).                                               \n\
// we loop over the row and column and sum the product.                  \n\
// product is then rendered to 32-bit IEEE754 floating point in the      \n\
// output RGBA canvas.                                                   \n\
// readPixel is used to read the bytes.                                  \n\
																		 \n\
#ifdef GL_ES                                                                 \n\
precision highp float;                                                   \n\
#endif                                                                       \n\
																		 \n\
varying vec2	  vTex;         // row, column to calculate              \n\
uniform sampler2D usampler;		// left in .r, right in .g               \n\
uniform int		  uLength;      // interior (matching) dimension (r1/c2) \n\
uniform float	  uStepS;       // increment across source texture       \n\
uniform float	  uStepT;       // increment down source texture         \n\
uniform float	  uOutRows;     // size of output in rows                \n\
uniform float	  uOutCols;     // size of output in columns             \n\
																		 \n\
// sum row r x col c                                                     \n\
float sumrowcol(float row, float col) {                                  \n\
	float sum = 0.;                // sum                                \n\
	float ss = 0.5 * uStepS;       // column on source texture           \n\
	float tt = 0.5 * uStepT;       // row on source texture              \n\
	float r = (row + 0.5)*uStepT;  // moving texture coordinate          \n\
	float c = (col + 0.5)*uStepS;  // moving texture coordinate          \n\
	for (int pos=0 ; pos<4096 ; ++pos) {                                 \n\
		if(pos>=uLength) break;    // stop when we finish the row/column \n\
		float m1 = texture2D(usampler,vec2(ss,r)).r;                     \n\
		float m2 = texture2D(usampler,vec2(c,tt)).g;                     \n\
		sum += (m1*m2);                                                  \n\
		ss += uStepS;                                                    \n\
		tt += uStepT;                                                    \n\
	}                                                                    \n\
	return sum;                                                          \n\
}                                                                        \n\
																		 \n\
void main(void) {                                                        \n\
																		 \n\
	 // get the implied row and column from .s and .t of passed texel    \n\
	float col = floor((vTex.s*uOutRows));                                \n\
	float row = floor((vTex.t*uOutCols));                                \n\
																		 \n\
	// sum row x col for the passed pixel                                \n\
	float v = sumrowcol(row,col);                                        \n\
																		 \n\
	// Render to IEEE 754 Floating Point                                 \n\
	if (v==0.) {                                                         \n\
		gl_FragColor = vec4(0.,0.,0.,0.);                                \n\
		return;                                                          \n\
	}                                                                    \n\
	// TODO: correctly handle denormal numbers                           \n\
	// http://www.2ality.com/2012/04/number-encoding.html                \n\
	float a = abs(v);                           // encode absolute value + sign \n\
	float exp = floor(log2(a));                 // number of powers of 2 \n\
	float mant = (a * pow(2.,23.-exp));         // multiply to fill 24 bits (implied leading 1) \n\
	float mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa \n\
	float mant2 = mod(floor(mant / 256.),256.); // second 8 bits         \n\
	float mant3 = mod(mant,256.);               // third 8 bits          \n\
																		 \n\
	highp float sign = 128.-128.*(a/v);			// sign bit is 256 or 0  \n\
	highp float e = (sign+exp+127.)/510.;		// exponent and sign     \n\
	highp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit \n\
	highp float m2 = (mant2)/255.;				// middle part           \n\
	highp float m3 = (mant3+.5)/255.;			// scale to 0 - 255      \n\
	gl_FragColor = vec4(m3,m2,m1,e);			// output an IEEE754 32-bit floating point number \n\
}                                                                        \n\
";

/* Pack the given matrix data into texel layout for use by texture shader.
   This layout places each matrix in a different plane of the texture,
   one in 'r' the second in 'g'
 */
GEMMFloatCalculator.packData = function(d1, h1, w1, d2, h2, w2) {

	// dimensions
	var BYTES_PER_TEXEL = 3; // RGB: one byte per channel, three bytes per texel
	var r1 = h1, c1 = w1, r2 = h2, c2 = w2;
	var r = Math.max(r1,r2);
	var c = Math.max(c1,c2);
	var texelcount = r*c;
	// get texel data (rgb) as a Float32Array
	var texels = new Float32Array(texelcount*BYTES_PER_TEXEL);

	var dst = 0, src1=0, src2=0;
	// special case if same dimensions
	if (r1===r2 && c1===c2) {
		// copy m1 to .r and m2 to .g
		do {
			texels[dst++] = d1[src1++]; // red
			texels[dst++] = d2[src2++]; // green
			dst++;						// blue
		} while(--texelcount);
	} else {

		var row=0, col=0, texel = 0;
		do {
			texel = dst / BYTES_PER_TEXEL | 0;
			col = texel % c;
			row = texel / c | 0;
			if(col < c1 && row < r1)
				texels[dst] = d1[src1++];

			dst++;						// red -> green

			if(col < c2 && row < r2)
				texels[dst] = d2[src2++];

			dst += 2;						// green -> red (skip blue)

		} while(--texelcount);
		//console.log("texel: {0}".format(texel));

	}
	return texels;
};

/*
	must set up shader first
 */
GEMMFloatCalculator.prototype.setupInputTexture = function(d1, h1, w1, d2, h2, w2){

	var gl = this.webgl.context,
		texels,
		w, h;

	// pack the data into a single texel array
	texels = GEMMFloatCalculator.packData(d1, h1, w1, d2, h2, w2);

	// create a single texture from the texel data
	w = Math.max(w1,w2);
	h = Math.max(h1,h2);

	// set canvas and viewport size
	this.webgl.canvas.height = h;
	this.webgl.canvas.width = w;
	gl.viewport(0, 0, w, h);
	var texture = this.bindData(texels, w, h);

};

GEMMFloatCalculator.TEXTURE_UNIFORM_NAME = "usampler";

/* Create a texture from the given texel data and bind it to our shader program.

*/
GEMMFloatCalculator.prototype.bindData = function(texels, w, h){
	var gl = this.webgl.context,
		program = this.program;

	// create the texture from our floats
	var texture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(	  gl.TEXTURE_2D, texture);
	gl.texImage2D(	  gl.TEXTURE_2D, /*level*/0, gl.RGB, w, h, 0,
					  gl.RGB, gl.FLOAT, texels);

	// clamp to edge to support non-power of two textures
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	// don't interpolate when getting data from texture
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

	var sampler = gl.getUniformLocation(program, GEMMFloatCalculator.TEXTURE_UNIFORM_NAME);
	gl.uniform1i(sampler, 0); // (textureUnit - gl.TEXTURE0)

	return texture;
};

GEMMFloatCalculator.prototype.bindFramebuffer = function(dstTex, h1, w2) {
	var gl = this.webgl.context;

	// create and bind renderbuffer
	this.renderbuffer = this.renderbuffer || gl.createRenderbuffer();

	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);

	gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16, w2, h1);

	// create and bind framebuffer
	this.framebuffer = this.framebuffer || gl.createFramebuffer();

	gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);

	gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,dstTex,/*level*/0);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,this.renderbuffer);

	return this.framebuffer;
};

GEMMFloatCalculator.prototype.calculate = function(h1, w1, h2, w2, alpha, beta, A, B, C){

	var gl = this.webgl.context,
		destTexture,
		frameBuffer,
		rawbuffer;


	// set calculator program to current shader program
	gl.useProgram(this.program);

	// create and bind our input texture using matrix data
	this.setupInputTexture(A, h1, w1, B, h2, w2);


	// set the data specific variables in our shader program
	this.bindUniforms(h1, w1, h2, w2);
	this.bindVertices();

	// create our destination texture
	destTexture = this.webgl.createDestinationTexture();
	frameBuffer = this.bindFramebuffer(destTexture, h1, w2);


	if( gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE)
		throw new Error("Bound framebuffer is not complete.");

	// initiate calculation
	gl.drawElements(gl.TRIANGLES, /*num items*/6, gl.UNSIGNED_SHORT, 0);

	// create destination buffer
	rawbuffer = new ArrayBuffer(h1*w2*Float32Array.BYTES_PER_ELEMENT);

	// read the result into our buffer, as bytes
	prod = new Uint8Array(rawbuffer);
	gl.readPixels(0, 0, w2, h1, gl.RGBA, gl.UNSIGNED_BYTE, prod);

	// create and return a view over result bytes as a float array
	return new Float32Array(rawbuffer); // h1 x w2
};

	// set up vars for the shaders
GEMMFloatCalculator.prototype.bindUniforms = function(h1, w1, h2, w2) {
	var gl = this.webgl.context,
		renderer = this.program;

	// get var locations
	var length	= gl.getUniformLocation(renderer, "uLength");
	var outR	= gl.getUniformLocation(renderer, "uOutRows");
	var outC	= gl.getUniformLocation(renderer, "uOutCols");
	var stepS	= gl.getUniformLocation(renderer, "uStepS");
	var stepT	= gl.getUniformLocation(renderer, "uStepT");
	// bind length of one multiply run
	gl.uniform1i(length, w1);
	// bind output size
	// 3x1 x 1x2  -> 3x2  input and output canvas/texture
	// [2] x [1 1] = [2 2] called for each point in *output* texture
	// [3]			 [3 3]
	// [5]			 [5 5]
	gl.uniform1f(outR, h1);
	gl.uniform1f(outC, w2);
	// bind step size for input texture
	// 3x10 x 10x2 -> 3x2 output, but requires 10x10 *input* texture
	gl.uniform1f(stepS, 1./Math.max(w1, w2));
	gl.uniform1f(stepT, 1./Math.max(h1, h2));
};

// setup required to draw a square to our vertex shader and have
// fragment shader called for each pixel
GEMMFloatCalculator.prototype.bindVertices = function() {
	var gl = this.webgl.context,
		renderer = this.program;

	// bind vertices
	var aPos = gl.getAttribLocation(renderer,"aPos");
	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	var vertices = [-1.0, -1.0,	 0.0, 1.0, -1.0,  0.0, 1.0,	 1.0,  0.0, -1.0,  1.0,	 0.0];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.vertexAttribPointer(aPos, /*item size*/3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(aPos);

	// bind texture cords
	var aTex = gl.getAttribLocation(renderer,"aTex");
	var texCoords = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, texCoords);
	var textureCoords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
	gl.vertexAttribPointer(aTex, /*item size*/2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(aTex);

	// index to vertices
	var indices = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
	var vertexIndices = [0, 1, 2, 0, 2, 3];
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
};

},{}],3:[function(require,module,exports){
/*
Copyright (c) 2015 Waylon Flinn

some parts Copyright (c) 2014 Jonathan Watmough

webgl.js

multiply matrices up to 4096 x 4096 on GPUs that support OES_texture_float
extension. input is encoded into the red and green channels of an input texture and
calculations are done using a custom fragment shader.

*/


/*
	A WebGL context associated with a specific canvas element.

	* creates a canvas
	* sets up webgl context
	* translates numbers into textures
	* compiles shader programs for executing math (when supplied with an
		operation specific fragment shader)
 */
function WebGL(options) {

	var glOptions,
		ext;

	options = options || {};

	// canvas
	if(typeof options.canvas === 'undefined')
		this.canvas = document.createElement('canvas');
	else
		this.canvas = options.canvas;

	// context
	glOptions = { premultipliedAlpha: false, preserveDrawingBuffer: false };
	this.context = this.canvas.getContext("experimental-webgl", glOptions);

	if (typeof this.context === 'undefined')
		throw new Error("No support for Webgl.");

	// float texture extension
	try {
		ext = this.context.getExtension('OES_texture_float');
	} catch(e) {

	}
	if ( !ext ) {
		console.log("No support for OES_texture_float extension.");
		this.hasFloat = false;
	} else {
		this.hasFloat = true;
	}

	// create pass through vertex shader
	this.vertexShader = this.context.createShader(this.context.VERTEX_SHADER);
	this.context.shaderSource(this.vertexShader, WebGL.PASS_THROUGH_VERTEX_SHADER);
	this.context.compileShader(this.vertexShader);

};

module.exports = WebGL;

WebGL.PASS_THROUGH_VERTEX_SHADER = "\
// vertex shader for a single quad                                           \n\
// work is performed based on the texels being passed through                \n\
// the operation specific texture shader.                                    \n\
#ifdef GL_ES                                                                 \n\
precision highp float;                                                       \n\
#endif                                                                       \n\
attribute vec3 aPos;                                                         \n\
attribute vec2 aTex;                                                         \n\
varying vec2   vTex;                                                         \n\
void main(void)                                                              \n\
{                                                                            \n\
	// just pass the position and texture coords                             \n\
	gl_Position = vec4(aPos, 1.0);                                           \n\
	vTex = aTex;                                                             \n\
}                                                                            \n\
";

/*  Create a shader program based on a pass through vertex shader and
	the supplied operation specific fragment shader.

	fragmentShaderSource - string containing the fragment shader source code.
 */
WebGL.prototype.createProgram = function(fragmentShaderSource){
	var gl = this.context,
		fragmentShader;

	// compile the provided fragment/texture shader
	fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader, fragmentShaderSource);
	gl.compileShader(fragmentShader);

	// did it compile correctly?
	if (gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS) == 0)
		throw new Error(gl.getShaderInfoLog(fragmentShader));

	// link the program specific fragment shader and the generic pass through
	// shader into a program
	var program = gl.createProgram();
	gl.attachShader(program, this.vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	return program;
};

/* Create and bind a texture to store the result.
   Requires canvas height and width be set to size of output matrix.
 */
WebGL.prototype.createDestinationTexture = function() {
	var gl = this.context;

	// create and bind texture to render to
	var destTexture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, destTexture);
	gl.texImage2D(gl.TEXTURE_2D,/*level*/0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);

	return destTexture;
};

},{}]},{},[1])(1)
});