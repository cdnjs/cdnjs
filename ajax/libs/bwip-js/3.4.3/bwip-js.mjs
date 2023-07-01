// This file is part of the bwip-js project available at:
//
// 	  http://metafloor.github.io/bwip-js
//
// Copyright (c) 2011-2023 Mark Warren
//
// This file contains code automatically generated from:
// Barcode Writer in Pure PostScript - Version 2023-02-16
// Copyright (c) 2004-2022 Terry Burton
//
// The MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
"use strict";

import { bwipp_auspost,bwipp_azteccode,bwipp_azteccodecompact,bwipp_aztecrune,bwipp_bc412,bwipp_channelcode,bwipp_codablockf,bwipp_code11,bwipp_code128,bwipp_code16k,bwipp_code2of5,bwipp_code32,bwipp_code39,bwipp_code39ext,bwipp_code49,bwipp_code93,bwipp_code93ext,bwipp_codeone,bwipp_coop2of5,bwipp_daft,bwipp_databarexpanded,bwipp_databarexpandedcomposite,bwipp_databarexpandedstacked,bwipp_databarexpandedstackedcomposite,bwipp_databarlimited,bwipp_databarlimitedcomposite,bwipp_databaromni,bwipp_databaromnicomposite,bwipp_databarstacked,bwipp_databarstackedcomposite,bwipp_databarstackedomni,bwipp_databarstackedomnicomposite,bwipp_databartruncated,bwipp_databartruncatedcomposite,bwipp_datalogic2of5,bwipp_datamatrix,bwipp_datamatrixrectangular,bwipp_datamatrixrectangularextension,bwipp_dotcode,bwipp_ean13,bwipp_ean13composite,bwipp_ean14,bwipp_ean2,bwipp_ean5,bwipp_ean8,bwipp_ean8composite,bwipp_flattermarken,bwipp_gs1_128,bwipp_gs1_128composite,bwipp_gs1_cc,bwipp_gs1datamatrix,bwipp_gs1datamatrixrectangular,bwipp_gs1dldatamatrix,bwipp_gs1dlqrcode,bwipp_gs1dotcode,bwipp_gs1northamericancoupon,bwipp_gs1qrcode,bwipp_hanxin,bwipp_hibcazteccode,bwipp_hibccodablockf,bwipp_hibccode128,bwipp_hibccode39,bwipp_hibcdatamatrix,bwipp_hibcdatamatrixrectangular,bwipp_hibcmicropdf417,bwipp_hibcpdf417,bwipp_hibcqrcode,bwipp_iata2of5,bwipp_identcode,bwipp_industrial2of5,bwipp_interleaved2of5,bwipp_isbn,bwipp_ismn,bwipp_issn,bwipp_itf14,bwipp_jabcode,bwipp_japanpost,bwipp_kix,bwipp_leitcode,bwipp_mailmark,bwipp_mands,bwipp_matrix2of5,bwipp_maxicode,bwipp_micropdf417,bwipp_microqrcode,bwipp_msi,bwipp_onecode,bwipp_pdf417,bwipp_pdf417compact,bwipp_pharmacode,bwipp_pharmacode2,bwipp_planet,bwipp_plessey,bwipp_posicode,bwipp_postnet,bwipp_pzn,bwipp_qrcode,bwipp_rationalizedCodabar,bwipp_raw,bwipp_rectangularmicroqrcode,bwipp_royalmail,bwipp_sscc18,bwipp_swissqrcode,bwipp_symbol,bwipp_telepen,bwipp_telepennumeric,bwipp_ultracode,bwipp_upca,bwipp_upcacomposite,bwipp_upce,bwipp_upcecomposite,bwipp_lookup,bwipp_encode,BWIPP_VERSION } from './bwipp.mjs';
// exports.js

// bwipjs.toCanvas(canvas, options)
// bwipjs.toCanvas(options, canvas)
//
// Uses the built-in canvas drawing.  Identical rendering as toBuffer().
//
// `canvas` can be an HTMLCanvasElement or an ID string or unique selector string.
// `options` are a bwip-js/BWIPP options object.
//
// This function is synchronous and throws on error.
//
// Returns the HTMLCanvasElement.
function ToCanvas(opts, canvas) {
    // This code has to be duplicated with _ToCanvas() to keep the bwipp_lookup() out
    // of the latter.
	if (typeof canvas == 'string') {
		canvas = document.getElementById(canvas) || document.querySelector(canvas);
	} else if (typeof opts == 'string') {
		opts = document.getElementById(opts) || document.querySelector(opts);
	}
	if (opts instanceof HTMLCanvasElement) {
		var tmp = opts;
		opts = canvas;
		canvas = tmp;
	} else if (!(canvas instanceof HTMLCanvasElement)) {
		throw 'bwipjs: Not a canvas';
	}
    _Render(bwipp_lookup(opts.bcid), opts, DrawingCanvas(opts, canvas));
    return canvas;
}
// Entry point for the symbol-specific exports
function _ToCanvas(encoder, opts, canvas) {
	if (typeof canvas == 'string') {
		canvas = document.getElementById(canvas) || document.querySelector(canvas);
	} else if (typeof opts == 'string') {
		opts = document.getElementById(opts) || document.querySelector(opts);
	}
	if (opts instanceof HTMLCanvasElement) {
		var tmp = opts;
		opts = canvas;
		canvas = tmp;
	} else if (!(canvas instanceof HTMLCanvasElement)) {
		throw 'bwipjs: Not a canvas';
	}
    _Render(encoder, opts, DrawingCanvas(opts, canvas));
    return canvas;
}

function FixupOptions(opts) {
	var scale	= opts.scale || 2;
	var scaleX	= +opts.scaleX || scale;
	var scaleY	= +opts.scaleY || scaleX;

	// Fix up padding.
	opts.paddingleft = padding(opts.paddingleft, opts.paddingwidth, opts.padding, scaleX);
	opts.paddingright = padding(opts.paddingright, opts.paddingwidth, opts.padding, scaleX);
	opts.paddingtop = padding(opts.paddingtop, opts.paddingheight, opts.padding, scaleY);
	opts.paddingbottom = padding(opts.paddingbottom, opts.paddingheight, opts.padding, scaleY);

	// We override BWIPP's background color functionality.  If in CMYK, convert to RGB so
	// the drawing interface is consistent.
	if (/^[0-9a-fA-F]{8}$/.test(''+opts.backgroundcolor)) {
		var cmyk = opts.backgroundcolor;
		var c = parseInt(cmyk.substr(0,2), 16) / 255;
		var m = parseInt(cmyk.substr(2,2), 16) / 255;
		var y = parseInt(cmyk.substr(4,2), 16) / 255;
		var k = parseInt(cmyk.substr(6,2), 16) / 255;
		var r = Math.floor((1-c) * (1-k) * 255).toString(16);
		var g = Math.floor((1-m) * (1-k) * 255).toString(16);
		var b = Math.floor((1-y) * (1-k) * 255).toString(16);
		opts.backgroundcolor = (r.length == 1 ? '0' : '') + r +
							   (g.length == 1 ? '0' : '') + g +
							   (b.length == 1 ? '0' : '') + b;
	}

	return opts;

	function padding(a, b, c, s) {
		if (a != null) {
			return a*s;
		}
		if (b != null) {
			return b*s;
		}
		return c*s || 0;
	}
}

var BWIPJS_OPTIONS = {
	bcid:1,
	text:1,
	scale:1,
	scaleX:1,
	scaleY:1,
	rotate:1,
	padding:1,
	paddingwidth:1,
	paddingheight:1,
	paddingtop:1,
	paddingleft:1,
	paddingright:1,
	paddingbottom:1,
	backgroundcolor:1,
};

// bwipjs.render(options, drawing)
//
// Renders a barcode using the provided drawing object.
//
// This function is synchronous and throws on error.
//
// Browser and nodejs usage.
function Render(params, drawing) {
    return _Render(bwipp_lookup(params.bcid), params, drawing);
}

// Called by the public exports
function _Render(encoder, params, drawing) {
	var text = params.text;
	if (!text) {
		throw new ReferenceError('bwip-js: bar code text not specified.');
	}

	// Set the bwip-js defaults
    FixupOptions(params);
	var scale	= params.scale || 2;
	var scaleX	= +params.scaleX || scale;
	var scaleY	= +params.scaleY || scaleX;
	var rotate	= params.rotate || 'N';

	// Create a barcode writer object.  This is the interface between
	// the low-level BWIPP code, the bwip-js graphics context, and the
	// drawing interface.
	var bw = new BWIPJS(drawing);

	// Set the BWIPP options
	var opts = {};
	for (var id in params) {
		if (!BWIPJS_OPTIONS[id]) {
			opts[id] = params[id];
		}
	}

	// Fix a disconnect in the BWIPP rendering logic
	if (opts.alttext) {
		opts.includetext = true;
	}
	// We use mm rather than inches for height - except pharmacode2 height
	// which is already in mm.
	if (+opts.height && encoder != bwipp_pharmacode2) {
		opts.height = opts.height / 25.4 || 0.5;
	}
	// Likewise, width
	if (+opts.width) {
		opts.width = opts.width / 25.4 || 0;
	}

	// Scale the image
	bw.scale(scaleX, scaleY);

	// Call into the BWIPP cross-compiled code and render the image.
    bwipp_encode(bw, encoder, text, opts);
	return bw.render();		// Return whatever drawing.end() returns
}

// bwipjs.raw(options)
// bwipjs.raw(bcid, text, opts-string)
//
// Invokes the low level BWIPP code and returns the raw encoding data.
//
// This function is synchronous and throws on error.
//
// Browser and nodejs usage.
function ToRaw(bcid, text, options) {
	if (arguments.length == 1) {
		options = bcid;
		bcid = options.bcid;
		text = options.text;
	}

	// The drawing interface is just needed for the pre-init() calls.
	var bw = new BWIPJS(DrawingBuiltin({}));
	var stack = bwipp_encode(bw, bwipp_lookup(bcid), text, options, true);

	// bwip-js uses Maps to emulate PostScript dictionary objects; but Maps
	// are not a typical/expected return value.  Convert to plain-old-objects.
	var ids = { pixs:1, pixx:1, pixy:1, sbs:1, bbs:1, bhs:1, width:1, height:1 };
	for (var i = 0; i < stack.length; i++) {
		var elt = stack[i];
		if (elt instanceof Map) {
			var obj = {};
			// Could they make Maps any harder to iterate over???
			for (var keys = elt.keys(), size = elt.size, k = 0; k < size; k++) {
				var id = keys.next().value;
				if (ids[id]) {
					var val = elt.get(id);
					if (val instanceof Array) {
						// The postscript arrays have extra named properties
						// to emulate array views.  Return cleaned up arrays.
						obj[id] = val.b.slice(val.o, val.o + val.length);
					} else {
						obj[id] = val;
					}
				}
			}
			stack[i] = obj;
		} else {
			// This should never exec...
			stack.splice(i--, 1);
		}
	}
	return stack;
}
// file : bwipjs.js
//
// Graphics-context interface to the BWIPP cross-compiled code

var BWIPJS = (function() {

// Math.floor(), etc. are notoriously slow.  Caching seems to help.
var floor = Math.floor;
var round = Math.round;
var ceil  = Math.ceil;
var min	  = Math.min;
var max	  = Math.max;

function BWIPJS(drawing) {
	if (this.constructor !== BWIPJS) {
		return new BWIPJS(drawing);
	}
	this.gstk	 = [];		// Graphics save/restore stack
	this.cmds	 = [];		// Graphics primitives to replay when rendering
	this.drawing = drawing;	// Drawing interface

	this.reset();

	// Drawing surface bounding box
	this.minx = this.miny = Infinity;
	this.maxx = this.maxy = -Infinity;
};

// All graphics state that must be saved/restored is given a prefix of g_
BWIPJS.prototype.reset = function() {
	// Current Transform Matrix - since we don't do rotation, we can fake
	// the matrix math
	this.g_tdx	= 0;		// CTM x-offset
	this.g_tdy	= 0;		// CTM y-offset
	this.g_tsx	= 1;		// CTM x-scale factor
	this.g_tsy	= 1;		// CTM y-scale factor

	this.g_posx	= 0;		// current x position
	this.g_posy	= 0;		// current y position
	this.g_penw	= 1;		// current line/pen width
	this.g_path	= [];		// current path
	this.g_font	= null;		// current font object
	this.g_rgb  = [0,0,0];	// current color (black)
    this.g_clip = false;    // clip region active
};
BWIPJS.prototype.save = function() {
	// clone all g_ properties
	var ctx = {};
	for (var id in this) {
		if (id.indexOf('g_') == 0) {
			ctx[id] = clone(this[id]);
		}
	}
	this.gstk.push(ctx);

	// Perform a deep clone of the graphics state properties
	function clone(v) {
		if (v instanceof Array) {
			var t = [];
			for (var i = 0; i < v.length; i++)
				t[i] = clone(v[i]);
			return t;
		}
		if (v instanceof Object) {
			var t = {};
			for (var id in v)
				t[id] = clone(v[id]);
			return t;
		}
		return v;
	}
};
BWIPJS.prototype.restore = function() {
	if (!this.gstk.length) {
		throw new Error('grestore: stack underflow');
	}
	var ctx  = this.gstk.pop();
    var self = this;
    if (this.g_clip && !ctx.g_clip) {
        this.cmds.push(function() {
                self.drawing.unclip();
            });
    }
	for (var id in ctx) {
		this[id] = ctx[id];
	}
};
// Per the postscript spec:
//	As discussed in Section 4.4.1, Current Path, points entered into a path
//	are immediately converted to device coordinates by the current
//	transformation matrix (CTM); subsequent modifications to the CTM do not
//	affect existing points.  `currentpoint` computes the user space
//	coordinates corresponding to the current point according to the current
//	value of the CTM. Thus, if a current point is set and then the CTM is
//	changed, the coordinates returned by currentpoint will be different
//	from those that were originally specified for the point. 
BWIPJS.prototype.currpos = function() {
	return { x:(this.g_posx-this.g_tdx)/this.g_tsx,
			 y:(this.g_posy-this.g_tdy)/this.g_tsy
		};
};
BWIPJS.prototype.currfont = function() {
	return this.g_font;
};
BWIPJS.prototype.translate = function(x, y) {
	this.g_tdx = this.g_tsx * x;
	this.g_tdy = this.g_tsy * y;
};
BWIPJS.prototype.scale = function(x, y) {
	this.g_tsx *= x;
	this.g_tsy *= y;
	var sxy = this.drawing.scale(this.g_tsx, this.g_tsy);
	if (sxy && sxy[0] && sxy[1]) {
		this.g_tsx = sxy[0];
		this.g_tsy = sxy[1];
	}
};
BWIPJS.prototype.setlinewidth = function(w) {
	this.g_penw = w;
};
BWIPJS.prototype.selectfont = function(f, z) {
	this.g_font = { FontName:this.jsstring(f), FontSize:+z };
};
BWIPJS.prototype.getfont = function() {
	return this.g_font.FontName;
};
// Special function for converting a Uint8Array string to string.
BWIPJS.prototype.jsstring = function(s) {
	if (s instanceof Uint8Array) {
		// Postscript (like C) treats nul-char as end of string.
		//for (var i = 0, l = s.length; i < l && s[i]; i++);
		//if (i < l) {
		//	return String.fromCharCode.apply(null,s.subarray(0, i));
		//}
		return String.fromCharCode.apply(null,s)
	}
	return ''+s;
};
// Special function to replace setanycolor in BWIPP
// Takes a string of hex digits either 6 chars in length (rrggbb) or
// 8 chars (ccmmyykk).
BWIPJS.prototype.setcolor = function(s) {
	if (s instanceof Uint8Array) {
		s = this.jsstring(s);
	}
	if (s.length == 6) {
		var r = parseInt(s.substr(0,2), 16);
		var g = parseInt(s.substr(2,2), 16);
		var b = parseInt(s.substr(4,2), 16);
		this.g_rgb = [ r, g, b ];
	} else if (s.length == 8) {
		var c = parseInt(s.substr(0,2), 16) / 255;
		var m = parseInt(s.substr(2,2), 16) / 255;
		var y = parseInt(s.substr(4,2), 16) / 255;
		var k = parseInt(s.substr(6,2), 16) / 255;
		var r = round((1-c) * (1-k) * 255);
		var g = round((1-m) * (1-k) * 255);
		var b = round((1-y) * (1-k) * 255);
		this.g_rgb = [ r, g, b ];
	}
};
// Used only by swissqrcode
BWIPJS.prototype.setrgbcolor = function(r,g,b) {
    this.g_rgb = [ r, g, b ];
};
// Returns the current rgb values as a 'RRGGBB'
BWIPJS.prototype.getRGB = function() {
	var r = this.g_rgb[0].toString(16);
	var g = this.g_rgb[1].toString(16);
	var b = this.g_rgb[2].toString(16);
	return '00'.substr(r.length) + r + '00'.substr(g.length) + g + '00'.substr(b.length) + b;
};
BWIPJS.prototype.newpath = function() {
	this.g_path = [];
};
BWIPJS.prototype.closepath = function() {
	var path = this.g_path;
	var plen = path.length;
	if (!plen) return;

	var f = plen-1;
	for ( ; f >= 0 && path[f].op == 'l'; f--);
	f++;
	if (f < plen-1) {
		var poly = [];
		var xmin = Infinity;
		var ymin = Infinity;
		var xmax = -Infinity;
		var ymax = -Infinity;
		for (var i = f; i < plen; i++) {
			var a = path[i];
			poly.push([ a.x0, a.y0 ]);
			if (xmin > a.x0) xmin = a.x0;
			if (xmax < a.x0) xmax = a.x0;
			if (ymin > a.y0) ymin = a.y0;
			if (ymax < a.y0) ymax = a.y0;
		}
		var a = path[plen-1];
		var b = path[f];
		if (a.x1 != b.x0 || a.y1 != b.y0) {
			poly.push([ a.x1, a.y1 ]);
			if (xmin > a.x1) xmin = a.x1;
			if (xmax < a.x1) xmax = a.x1;
			if (ymin > a.y1) ymin = a.y1;
			if (ymax < a.y1) ymax = a.y1;
		}
		path.splice(f, plen-f,
					{ op:'p', x0:xmin, y0:ymin, x1:xmax, y1:ymax, poly:poly });
	} else {
		path.push({ op:'c' });
	}
};
BWIPJS.prototype.moveto = function(x,y) {
	this.g_posx = this.g_tdx + this.g_tsx * x;
	this.g_posy = this.g_tdy + this.g_tsy * y;
};
BWIPJS.prototype.rmoveto = function(x,y) {
	this.g_posx += this.g_tsx * x;
	this.g_posy += this.g_tsy * y;
};
BWIPJS.prototype.lineto = function(x,y) {
	var x0 = round(this.g_posx);
	var y0 = round(this.g_posy);
	this.g_posx = this.g_tdx + this.g_tsx * x;
	this.g_posy = this.g_tdy + this.g_tsy * y;
	var x1 = round(this.g_posx);
	var y1 = round(this.g_posy);

	this.g_path.push({ op:'l', x0:x0, y0:y0, x1:x1, y1:y1 });
};
BWIPJS.prototype.rlineto = function(x,y) {
	var x0 = round(this.g_posx);
	var y0 = round(this.g_posy);
	this.g_posx += this.g_tsx * x;
	this.g_posy += this.g_tsy * y;
	var x1 = round(this.g_posx);
	var y1 = round(this.g_posy);

	this.g_path.push({ op:'l', x0:x0, y0:y0, x1:x1, y1:y1 });
};
// implements both arc and arcn
BWIPJS.prototype.arc = function(x,y,r,sa,ea,ccw) {
	if (sa == ea) {
		return;
	}
	// For now, we only implement full circles...
	if (sa != 0 && sa != 360 || ea != 0 && ea != 360) {
		throw new Error('arc: not a full circle (' + sa + ',' + ea + ')');
	}

	x = this.g_tdx + this.g_tsx * x;
	y = this.g_tdy + this.g_tsy * y;

	// e == ellipse
	var rx = r * this.g_tsx;
	var ry = r * this.g_tsy;
	this.g_path.push({ op:'e', x0:x-rx, y0:y-ry, x1:x+rx, y1:y+ry,
								x:x, y:y, rx:rx, ry:ry, sa:sa, ea:ea, ccw:ccw });
};
BWIPJS.prototype.stringwidth = function(str) {
	var tsx  = this.g_tsx;
	var tsy  = this.g_tsy;
	var size = +this.g_font.FontSize || 10;

	// The string can be either a uint8-string or regular string
	str = this.toUCS2(this.jsstring(str));

	var bbox = this.drawing.measure(str, this.g_font.FontName, size*tsx, size*tsy);

	return { w:bbox.width/tsx, h:(bbox.ascent+bbox.descent)/tsy,
			 a:bbox.ascent/tsy, d:bbox.descent/tsy };
};
BWIPJS.prototype.charpath = function(str, b) {
	var sw = this.stringwidth(str);

	// Emulate the char-path by placing a rectangle around it
	this.rlineto(0, sw.a);
	this.rlineto(sw.w, 0);
	this.rlineto(0, -sw.h);
};
BWIPJS.prototype.pathbbox = function() {
	if (!this.g_path.length)	throw new Error('pathbbox: --nocurrentpoint--');
	var path = this.g_path;
	var llx = Infinity;
	var lly = Infinity;
	var urx = -Infinity;
	var ury = -Infinity;
	for (var i = 0; i < path.length; i++) {
		var a = path[i];
		if (a.op == 'c') {
			continue;
		}
		if (a.x0 < a.x1) {
			if (llx > a.x0) llx = a.x0;
			if (urx < a.x1) urx = a.x1;
		} else {
			if (llx > a.x1) llx = a.x1;
			if (urx < a.x0) urx = a.x0;
		}
		if (a.y0 < a.y1) {
			if (lly > a.y0) lly = a.y0;
			if (ury < a.y1) ury = a.y1;
		} else {
			if (lly > a.y1) lly = a.y1;
			if (ury < a.y0) ury = a.y0;
		}
	}

	// Convert to user-space coordinates
	var rv = {	llx:(llx-this.g_tdx)/this.g_tsx,
				lly:(lly-this.g_tdy)/this.g_tsy,
				urx:(urx-this.g_tdx)/this.g_tsx,
				ury:(ury-this.g_tdy)/this.g_tsy };
	return rv;
};
// Tranforms the pts array to standard (not y-inverted), unscalled values.
BWIPJS.prototype.transform = function(pts) {
	var minx = this.minx;
	var maxy = this.maxy;

	for (var i = 0; i < pts.length; i++) {
		var pt = pts[i];
		pt[0] = pt[0] - minx;
		pt[1] = maxy - pt[1];
	}
};
BWIPJS.prototype.stroke = function() {
	var tsx  = this.g_tsx;
	var tsy  = this.g_tsy;
	var path = this.g_path;
	var rgb  = this.getRGB();
	this.g_path = [];

	// This is a "super majority" round i.e. if over .66 round up.
	var penw = floor(this.g_penw * tsx + 0.66);
	var penh = floor(this.g_penw * tsy + 0.66);

	// Calculate the bounding boxes
	var nlines = 0, npolys = 0;
	for (var i = 0; i < path.length; i++) {
		var a = path[i];
		if (a.op == 'l') {
			// We only stroke vertical and horizontal lines.  Complex shapes are
			// always filled.
			if (a.x0 != a.x1 && a.y0 != a.y1) {
				throw new Error('stroke: --not-orthogonal--');
			}
			var x0 = a.x0;
			var y0 = a.y0;
			var x1 = a.x1;
			var y1 = a.y1;

			// Half widths (may be factional)
			var penw2 = penw/2;
			var penh2 = penh/2;

			if (x0 > x1) { var t = x0; x0 = x1; x1 = t; }
			if (y0 > y1) { var t = y0; y0 = y1; y1 = t; }
			if (x0 == x1) {
				this.bbox(x0-penw2, y0, x0+penw-penw2-1, y1); 	// vertical line
			} else {
				this.bbox(x0, y0-penh+penh2+1, x1, y1+penh2);	// horizontal line
			}
			nlines++;
		} else if (a.op == 'p') {
			// Closed (rectangular) poly (border around the barcode)
			var minx = Infinity;
			var miny = Infinity;
			var maxx = -Infinity;
			var maxy = -Infinity;
			var pts  = a.poly;
			if (pts.length != 4) {
				throw new Error('stroke: --not-a-rect--');
			}
			for (var i = 0, j = pts.length-1; i < pts.length; j = i++) {
				var xj = pts[j][0];
				var yj = pts[j][1];
				var xi = pts[i][0];
				var yi = pts[i][1];

				if (xi != xj && yi != yj) {
					throw new Error('stroke: --not-orthogonal--');
				}

				if (xi < minx) minx = xi;
				if (xi > maxx) maxx = xi;
				if (yi < miny) miny = yi;
				if (yi > maxy) maxy = yi;
			}

			// Half widths (integer)
			var penw2 = ceil(penw/2);
			var penh2 = ceil(penh/2);

			// We render these as two polygons plus a fill.
			// When border width is odd, allocate the bigger half to the outside.
			this.bbox(minx-penw2, miny-penh2, maxx+penw2, maxy+penh2);
			npolys++;
		} else {
			throw new Error('stroke: --not-a-line--');
		}
	}

	// Draw the lines
	var self = this;
	this.cmds.push(function() {
		// Half widths (big half and remaining half)
		var bigw2 = ceil(penw/2);
		var bigh2 = ceil(penh/2);
		var remw2 = penw - bigw2;
		var remh2 = penh - bigh2;

		for (var i = 0; i < path.length; i++) {
			var a = path[i]
			if (a.op == 'l') {
				var pts = [ [ a.x0, a.y0 ], [ a.x1, a.y1 ] ];
				self.transform(pts);
				self.drawing.line(pts[0][0], pts[0][1], pts[1][0], pts[1][1],
							a.x0 == a.x1 ? penw : penh, rgb);
				self.fill(rgb);
			} else {
				var pts = a.poly;
				self.transform(pts);
				var x0 = min(pts[0][0], pts[2][0]);
				var x1 = max(pts[0][0], pts[2][0]);
				var y0 = min(pts[0][1], pts[2][1]);
				var y1 = max(pts[0][1], pts[2][1]);

				// Top and left edges are "inside" the polygon.
				// Bottom and right edges are outside.
				self.drawing.polygon([
						[ x0-bigw2, y0-bigh2 ],
						[ x0-bigw2, y1+bigh2+1 ],
						[ x1+bigw2+1, y1+bigh2+1 ],
						[ x1+bigw2+1, y0-bigh2 ]
					]);
				self.drawing.polygon([
						[ x0+remw2, y0+remh2 ],
						[ x0+remw2, y1-remh2+1 ],
						[ x1-remw2+1, y1-remh2+1 ],
						[ x1-remw2+1, y0+remh2 ],
					]);
				self.drawing.fill(rgb);
			}
		}
	});
};
BWIPJS.prototype.fill = function() {
	var path = this.g_path;
	var rgb  = this.getRGB();
	this.g_path = [];

	// Calculate the bounding boxes
	for (var p = 0; p < path.length; p++) {
		var a = path[p];
		if (a.op == 'p') {  // polygon
			var minx = Infinity;
			var miny = Infinity;
			var maxx = -Infinity;
			var maxy = -Infinity;
			var pts  = a.poly;
			for (var i = 0; i < pts.length; i++) {
				var xi = pts[i][0];
				var yi = pts[i][1];

				if (xi < minx) minx = xi;
				if (xi > maxx) maxx = xi;
				if (yi < miny) miny = yi;
				if (yi > maxy) maxy = yi;
			}
			// With polygons, the right and bottom edges are "outside" and do not
			// contribute to the bounding box.  But we are in postscript inverted-y
			// mode.
			this.bbox(minx, miny+1, maxx-1, maxy);
		} else if (a.op == 'e') {	// ellipse
			this.bbox(a.x - a.rx, a.y - a.ry, a.x + a.rx, a.y + a.ry);
		} else {
			throw new Error('fill: --not-a-polygon--');
		}
	}

	// Render the poly
	var self = this;
	this.cmds.push(function() {
		for (var i = 0; i < path.length; i++) {
			var a = path[i];
			if (a.op == 'p') {
				var pts = a.poly
				self.transform(pts);
				self.drawing.polygon(pts);
			} else if (a.op == 'e') {
				var pts = [ [ a.x, a.y ] ];
				self.transform(pts);
				self.drawing.ellipse(pts[0][0], pts[0][1], a.rx, a.ry, a.ccw);
			}
		}
		self.drawing.fill(rgb);
	});
};
BWIPJS.prototype.clip = function() {
	var path = this.g_path;
	this.g_path = [];
    this.g_clip = true;

	var self = this;
	this.cmds.push(function() {
        var polys = [];
		for (var i = 0; i < path.length; i++) {
			var a = path[i];
			if (a.op == 'p') {
				var pts = a.poly
				self.transform(pts);
                polys.push(pts);
			} else {
                throw new Error('clip: only polygon regions supported');
			}
		}
		self.drawing.clip(polys);
	});
};

// The pix array is in standard (not y-inverted postscript) orientation.
BWIPJS.prototype.maxicode = function(pix) {
	var tsx = this.g_tsx;
	var tsy = this.g_tsy;
	var rgb = this.getRGB();

	// Module width.  Module height is an integer multiple of tsy.
	var twidth = 1.04 * tsx * 100;
	var mwidth = (twidth / 30)|0;
	if (twidth - (mwidth*30-1) > 9) {
		mwidth++;
	}

	// Dimensions needed for plotting the hexagons.  These must be integer values.
	var w, h, wgap, hgap;
	// if (opts.??? ) {
	//	// Create a one or two pixel gap
	//	wgap = (mwidth & 1) ? 1 : 2;
	//	hgap = 1;
	//	w = mwidth - gap;
	//	h = 4 * tsy;
	// } else {
		// Create a 1/8mm gap
		wgap = (tsx/2)|0;
		hgap = (tsy/2)|0;
		w = mwidth - wgap;
		if (w & 1) {
			w--;
		}
		h = ((4*tsy)|0) - hgap;
	//}

	// These must be integer values
	var w2 = w / 2 - 1;			// half width
	var qh = ((w2+1) / 2)|0;	// quarter height
	var vh = h - 2 - 2 * qh;	// side height

	// Bounding box
	this.bbox(0, 0, mwidth*30 - wgap, tsy * 3 * 32 + tsy * 4 - hgap);

	// Render the elements
	var self = this;
	this.cmds.push(function() {
		// Draw the hexagons
		for (var i = 0; i < pix.length; i++) {
			var c = pix[i];
			var x = c % 30;
			var y = (c / 30)|0;

			// Adjust x,y to the top of hexagon
			x *= mwidth;
			x += (y & 1) ? mwidth : mwidth/2;
			x = x|0;

			y = 33 - y;	// invert for postscript notation
			y *= tsy * 3;
			y += tsy * 2 - h/2;
			y = y|0;
			
			// Build bottom up so the drawing is top-down.
			var pts = [ [ x-0.5, y-- ] ]; 
			y -= qh-1;
			pts.push([x-1-w2, y--]);
			y -= vh;
			pts.push([x-1-w2, y--]);
			y -= qh-1;
			pts.push([x-0.5, y++]);
			y += qh-1;
			pts.push([x+w2, y++]);
			y += vh;
			pts.push([x+w2, y++]);

			self.transform(pts);
			self.drawing.hexagon(pts, rgb);
		}
		self.drawing.fill(rgb);


		// Draw the rings
		var x = (14 * mwidth + mwidth/2 + 0.01)|0;
		var y = ((12 * 4 + 3) * tsy - qh/2 + 0.01)|0;
		self.drawing.ellipse(x, y, (0.5774*3.5*tsx+0.01)|0, (0.5774*3.5*tsy+0.01)|0, true);
		self.drawing.ellipse(x, y, (1.3359*3.5*tsx+0.01)|0, (1.3359*3.5*tsy+0.01)|0, false);
		self.drawing.fill(rgb);
		self.drawing.ellipse(x, y, (2.1058*3.5*tsx+0.01)|0, (2.1058*3.5*tsy+0.01)|0, true);
		self.drawing.ellipse(x, y, (2.8644*3.5*tsx+0.01)|0, (2.8644*3.5*tsy+0.01)|0, false);
		self.drawing.fill(rgb);
		self.drawing.ellipse(x, y, (3.6229*3.5*tsx+0.01)|0, (3.6229*3.5*tsy+0.01)|0, true);
		self.drawing.ellipse(x, y, (4.3814*3.5*tsx+0.01)|0, (4.3814*3.5*tsy+0.01)|0, false);
		self.drawing.fill(rgb);

	});
};
// UTF-8 to UCS-2 (no surrogates)
BWIPJS.prototype.toUCS2 = function(str) {
    return str.replace(/[\xc0-\xdf][\x80-\xbf]|[\xe0-\xff][\x80-\xbf]{2}/g,
                      function(s) {
                          var code;
                          if (s.length == 2) {
                              code = ((s.charCodeAt(0)&0x1f)<<6)|
                                     (s.charCodeAt(1)&0x3f);
                          } else {
                              code = ((s.charCodeAt(0)&0x0f)<<12)|
                                     ((s.charCodeAt(1)&0x3f)<<6)|
                                     (s.charCodeAt(2)&0x3f);
                          }
                          return String.fromCharCode(code);
                      });
};
// dx,dy are inter-character gaps
BWIPJS.prototype.show = function(str, dx, dy) {
	if (!str.length) {
		return;
	}

	// Capture current graphics state
	var tsx	 = this.g_tsx;
	var tsy  = this.g_tsy;
	var name = this.g_font.FontName || 'OCR-B';
	var size = (this.g_font.FontSize || 10);
	var szx  = size * tsx;
	var szy  = size * tsy;
	var posx = this.g_posx;
	var posy = this.g_posy;
	var rgb  = this.getRGB();

	// The string can be either a uint8-string or regular string.
	str = this.toUCS2(this.jsstring(str));

	// Convert dx,dy to device space
	dx = tsx * dx || 0;
	dy = tsy * dy || 0;

	// Bounding box.
	var base = posy + dy;
	var bbox = this.drawing.measure(str, name, szx, szy);
	var width = bbox.width + (str.length-1) * dx;
	this.bbox(posx, base-bbox.descent+1, posx+width-1, base+bbox.ascent);
	this.g_posx += width;

	var self = this;
	self.cmds.push(function() {
		// self.transform()
		var x = posx - self.minx;
		var y = self.maxy - posy;
		self.drawing.text(x, y, str, rgb, { name:name, width:szx, height:szy, dx:dx });
	});
};
// drawing surface bounding box
BWIPJS.prototype.bbox = function(x0, y0, x1, y1) {
	if (x0 > x1) { var t = x0; x0 = x1; x1 = t; }
	if (y0 > y1) { var t = y0; y0 = y1; y1 = t; }

	x0 = floor(x0);
	y0 = floor(y0);
	x1 = ceil(x1);
	y1 = ceil(y1);

	if (this.minx > x0) this.minx = x0;
    if (this.maxx < x1)	this.maxx = x1;
    if (this.miny > y0)	this.miny = y0;
	if (this.maxy < y1)	this.maxy = y1;
};
BWIPJS.prototype.render = function() {
	if (this.minx === Infinity) {
        // Most likely, `dontdraw` was set in the options
        return new Promise(function (resolve, reject) {
            resolve(null);
        });
	}
	// Draw the image
	this.drawing.init(this.maxx - this.minx + 1, this.maxy - this.miny + 1,
					  this.g_tsx, this.g_tsy);
	for (var i = 0, l = this.cmds.length; i < l; i++) {
		this.cmds[i]();
	}
	return this.drawing.end();
};

return BWIPJS;
})();	// BWIPJS closure
// drawing-builtin.js
//
// The aliased (except the fonts) graphics used by drawing-canvas.js and
// drawing-png.js
//
// All x,y and lengths are integer values.
//
// For the methods that take a color `rgb` parameter, the value is always a
// string with format RRGGBB.
//
// opts is the same options object passed into the bwipjs methods.
function DrawingBuiltin(opts) {
	var floor = Math.floor;

	// Unrolled x,y rotate/translate matrix
	var tx0 = 0, tx1 = 0, tx2 = 0, tx3 = 0;
	var ty0 = 0, ty1 = 0, ty2 = 0, ty3 = 0;

	var gs_image, gs_rowbyte;	// rowbyte will be 1 for png's, 0 for canvas
	var gs_width, gs_height;	// image size, in pixels
	var gs_dx, gs_dy;			// x,y translate (padding)
	var gs_r, gs_g, gs_b;		// rgb
	var gs_xymap;				// edge map
    var gs_xyclip;              // clip region map (similar to xymap)

	return {
		// Ensure compliant bar codes by always using integer scaling factors.
		scale : function(sx, sy) {
            // swissqrcode requires clipping and drawing that are not scaled to the
            // the barcode module size.
            if (opts.bcid == 'swissqrcode') {
                return [ sx, sy ];
            } else {
			    return [ (sx|0)||1, (sy|0)||1 ];
            }
		},

		// Measure text.  This and scale() are the only drawing primitives that
		// are called before init().
		//
		// `font` is the font name typically OCR-A or OCR-B.
		// `fwidth` and `fheight` are the requested font cell size.  They will
		// usually be the same, except when the scaling is not symetric.
		measure : function(str, font, fwidth, fheight) {
			fwidth = fwidth|0;
			fheight = fheight|0;

			var fontid = FontLib.lookup(font);
			var width = 0;
			var ascent = 0;
			var descent = 0;
			for (var i = 0, l = str.length; i < l; i++) {
				var ch = str.charCodeAt(i);
				var glyph = FontLib.getglyph(fontid, ch, fwidth, fheight);

				ascent  = Math.max(ascent, glyph.top);
				descent = Math.max(descent, glyph.height - glyph.top);

				if (i == l-1) {
					width += glyph.left + glyph.width;
				} else {
					width += glyph.advance;
				}
			}
			return { width:width, ascent:ascent, descent:descent };
		},

		// width and height represent the maximum bounding box the graphics will occupy.
		// The dimensions are for an unrotated rendering.  Adjust as necessary.
		init : function(width, height) {
			// Add in the effects of padding.  These are always set before the
			// drawing constructor is called.
			var padl = opts.paddingleft;
			var padr = opts.paddingright;
			var padt = opts.paddingtop;
			var padb = opts.paddingbottom;
			var rot  = opts.rotate || 'N';

			width  += padl + padr;
			height += padt + padb;

			if (+opts.sizelimit && +opts.sizelimit < width * height) {
				throw new Error('Image size over limit');
			}

			// Transform indexes are: x, y, w, h
			switch (rot) {
			// tx = w-y, ty = x
			case 'R': tx1 = -1; tx2 = 1; ty0 = 1; break;
			// tx = w-x, ty = h-y
			case 'I': tx0 = -1; tx2 = 1; ty1 = -1; ty3 = 1; break;
			// tx = y, ty = h-x
			case 'L': tx1 = 1; ty0 = -1; ty3 = 1; break;
			// tx = x, ty = y
			default:  tx0 = ty1 = 1; break;
			}

			// Setup the graphics state
			var swap = rot == 'L' || rot == 'R';
			gs_width  = swap ? height : width;
			gs_height = swap ? width : height;
			gs_dx = padl;
			gs_dy = padt;
			gs_xymap = [];
			gs_xymap.min = Infinity;
            gs_xyclip = null;
			gs_r = gs_g = gs_b = 0;

			// Get the rgba image from the constructor
			var res = this.image(gs_width, gs_height);
			gs_image   = res.buffer;
			gs_rowbyte = res.ispng ? 1 : 0;
		},
		// Unconnected stroked lines are used to draw the bars in linear barcodes;
		// and the border around a linear barcode (e.g. ITF-14)
		// No line cap should be applied.  These lines are always orthogonal.
		line : function(x0, y0, x1, y1, lw, rgb) {
			x0 = x0|0;
			y0 = y0|0;
			x1 = x1|0;
			y1 = y1|0;

			// Most linear barcodes, the line width will be integral.  The exceptions
			// are variable width barcodes (e.g. code39) and the postal 4-state codes.
			lw = Math.round(lw) || 1;

			if (y1 < y0) { var t = y0; y0 = y1; y1 = t; }
			if (x1 < x0) { var t = x0; x0 = x1; x1 = t; }

			gs_r = parseInt(rgb.substr(0,2), 16);
			gs_g = parseInt(rgb.substr(2,2), 16);
			gs_b = parseInt(rgb.substr(4,2), 16);

			// Horizontal or vertical line?
			var w2 = (lw/2)|0;
			if (x0 == x1) {
				// Vertical line
				x0 = x0 - lw + w2;  // big half
				x1 = x1 + w2 - 1;   // small half
			} else {
				// Horizontal line (inverted halves)
				y0 = y0 - w2;
				y1 = y1 + lw - w2 - 1;
			}
			for (var y = y0; y <= y1; y++) {
				for (var x = x0; x <= x1; x++) {
					set(x, y, 255);
				}
			}
		},

		// Polygons are used to draw the connected regions in a 2d barcode.
		// These will always be unstroked, filled, orthogonal shapes.
        // 
		// You will see a series of polygon() calls, followed by a fill().
		polygon : function(pts) {
			var npts = pts.length;
			for (var j = npts-1, i = 0; i < npts; j = i++) {
				if (pts[j][0] == pts[i][0]) {
					// Vertical lines do not get their end points. End points
					// are added by the horizontal line logic.
					var xj = pts[j][0]|0;	// i or j, doesn't matter
					var yj = pts[j][1]|0;
					var yi = pts[i][1]|0;
					if (yj > yi) {
						for (var y = yi+1; y < yj; y++) {
							addPoint(xj, y);
						}
					} else {
						for (var y = yj+1; y < yi; y++) {
							addPoint(xj, y);
						}
					}
				} else {
					var xj = pts[j][0]|0;
					var xi = pts[i][0]|0;
					var yj = pts[j][1]|0;	// i or j, doesn't matter

					// Horizontal lines are tricky.  As a rule, top lines get filled,
					// bottom lines do not (similar to how left edges get filled and
					// right edges do not).
					//
					// Where it gets complex is deciding whether the line actually
					// adds edges.  There are cases where a horizontal line does
					// not add anything to the scanline plotting.  And it doesn't
					// actually matter whether the line is a top or bottom edge,
					// the logic is the same.
					//
					// A left edge is added if the edge to its left is below.
					// A right edge is added if the edge to its right is below.
					if (xj < xi) {
						var yl = pts[j == 0 ? npts-1 : j-1][1];	// left edge
						var yr = pts[i == npts-1 ? 0 : i+1][1];	// right edge
						if (yl > yj) {
							addPoint(xj, yj);
						}
						if (yr > yj) {
							addPoint(xi, yj);
						}
					} else {
						var yl = pts[i == npts-1 ? 0 : i+1][1];	// left edge
						var yr = pts[j == 0 ? npts-1 : j-1][1];	// right edge
						if (yl > yj) {
							addPoint(xi, yj);
						}
						if (yr > yj) {
							addPoint(xj, yj);
						}
					}
				}
			}
		},
		// An unstroked, filled hexagon used by maxicode.  You can choose to fill
		// each individually, or wait for the final fill().
		//
		// The hexagon is drawn from the top, counter-clockwise.
		//
		// The X-coordinate for the top and bottom points on the hexagon is always
		// .5 pixels.  We draw our hexagons with a 2 pixel flat top.
		//
		// All other points of the polygon/hexagon are guaranteed to be integer values.
		hexagon : function(pts, rgb) {
			var x = pts[0][0]|0;
			var y = pts[0][1]|0;
			var qh = (pts[1][1] - pts[0][1])|0;		// height of triangle (quarter height)
			var vh = (pts[2][1] - pts[1][1] - 1)|0;	// height of vertical side
			var xl = (pts[2][0])|0;					// left side
			var xr = (pts[4][0])|0;					// right side

			gs_r = parseInt(rgb.substr(0,2), 16);
			gs_g = parseInt(rgb.substr(2,2), 16);
			gs_b = parseInt(rgb.substr(4,2), 16);

			fillSegment(x, x+1, y++);
			for (var k = 1; k < qh; k++) {
				fillSegment(x-2*k, x+1+2*k, y++);
			}
			for (var k = 0; k <= vh; k++) {
				fillSegment(xl, xr, y++);
			}
			for (var k = qh-1; k >= 1; k--) {
				fillSegment(x-2*k, x+1+2*k, y++);
			}
			fillSegment(x, x+1, y);
		},
		// An unstroked, filled ellipse.  Used by dotcode and maxicode at present.
		// maxicode issues pairs of ellipse calls (one cw, one ccw) followed by a fill()
		// to create the bullseye rings.  dotcode issues all of its ellipses then a
		// fill().
		ellipse : function(x, y, rx, ry, ccw) {
			drawEllipse((x-rx)|0, (y-ry)|0, (x+rx)|0, (y+ry)|0, ccw);
		},
		// PostScript's default fill rule is non-zero but since there are never
        // intersecting regions, we use the easier to implement even-odd.
		fill : function(rgb) {
			gs_r = parseInt(rgb.substr(0,2), 16);
			gs_g = parseInt(rgb.substr(2,2), 16);
			gs_b = parseInt(rgb.substr(4,2), 16);

			evenodd();
			gs_xymap = [];
			gs_xymap.min = Infinity;
		},
        // Currently only used by swissqrcode.  The `polys` area is an array of
        // arrays of points.  Each array of points is identical to the `pts`
        // parameter passed to polygon().  The postscript default clipping rule,
        // like the fill rule, is even-odd winding.
        clip : function(polys) {
            if (!gs_xyclip) {
                gs_xyclip = [];
                gs_xyclip.min = Infinity;
            }
            // Swap out the xymap for the clip map so addPoint() works on it.
            var xymap = gs_xymap;
            gs_xymap = gs_xyclip;

            // Now just use the polygon() logic to fill in the clipping regions.
            for (var i = 0, l = polys.length; i < l; i++) {
                this.polygon(polys[i]);
            }

            // Restore
            gs_xymap = xymap;
        },
        unclip : function() {
            gs_xyclip = null;
        },
		// Draw text with optional inter-character spacing.  `y` is the baseline.
		// font is an object with properties { name, width, height, dx }
		// width and height are the font cell size.
		// dx is extra space requested between characters (usually zero).
		text : function(x, y, str, rgb, font) {
			x = x|0;
			y = y|0;

			gs_r = parseInt(rgb.substr(0,2), 16);
			gs_g = parseInt(rgb.substr(2,2), 16);
			gs_b = parseInt(rgb.substr(4,2), 16);

			var fontid  = FontLib.lookup(font.name);
			var fwidth  = font.width|0;
			var fheight = font.height|0;
			var dx      = font.dx|0;
			for (var k = 0; k < str.length; k++) {
				var ch = str.charCodeAt(k);
				var glyph = FontLib.getglyph(fontid, ch, fwidth, fheight);

				var gt = y - glyph.top;
				var gl = glyph.left;
				var gw = glyph.width;
				var gh = glyph.height;
				var gb = glyph.bytes;
				var go = glyph.offset;		// offset into bytes

				for (var i = 0; i < gw; i++) {
					for (var j = 0; j < gh; j++) {
						var a = gb[go + j * gw + i];
						if (a) {
							set(x+gl+i, gt+j, a);
						}
					}
				}
				x += glyph.advance + dx;
			}
		},
		// Called after all drawing is complete.
		end : function() {
		},
	};

	// This code is specialized to deal with two types of RGBA buffers:
	// - canvas style, which is true RGBA
	// - PNG style, which has a one-byte "filter code" prefixing each row.
	function set(x, y, a) {
        if (gs_xyclip && clipped(x, y)) {
            return;
        }
		// translate/rotate
		x += gs_dx;
		y += gs_dy;
		var tx = tx0 * x + tx1 * y + tx2 * (gs_width-1) + tx3 * (gs_height-1);
		var ty = ty0 * x + ty1 * y + ty2 * (gs_width-1) + ty3 * (gs_height-1);

		// https://en.wikipedia.org/wiki/Alpha_compositing
		var offs = (ty * gs_width + tx) * 4 + (ty+1) * gs_rowbyte;
		var dsta = gs_image[offs+3] / 255;
		var srca = a / 255;
		var inva = (1 - srca) * dsta;
		var outa = srca + inva;

		gs_image[offs+0] = ((gs_r * srca + gs_image[offs+0] * inva) / outa)|0;
		gs_image[offs+1] = ((gs_g * srca + gs_image[offs+1] * inva) / outa)|0;
		gs_image[offs+2] = ((gs_b * srca + gs_image[offs+2] * inva) / outa)|0;
		gs_image[offs+3] = (255 * outa)|0;
	}

	// Add a point on an edge to the scanline map.
	function addPoint(x, y) {
		if (gs_xymap.min > y) gs_xymap.min = y;
		if (!gs_xymap[y]) {
			gs_xymap[y] = [ x ];
		} else {
			gs_xymap[y].push(x);
		}
	}

	function fillSegment(x0, x1, y) {
		while (x0 <= x1) {
			set(x0++, y, 255);
		}
	}

	// even-odd fill
	//
	// This implementation is optimized for BWIPP's simple usage.
	// It is not a general purpose scanline fill.  It relies heavily on
	// polygon() creating the correct intersections.
	function evenodd() {
		var ymin = gs_xymap.min;
		var ymax = gs_xymap.length-1;

		for (var y = ymin; y <= ymax; y++) {
			var pts = gs_xymap[y];
			if (!pts) {
				continue
			}
			pts.sort(function(a, b) { return a - b; });

			var wn = false;
			var xl = 0;
			for (var n = 0, npts = pts.length; n < npts; n++) {
				var x = pts[n];
				if (wn) {
					fillSegment(xl, x-1, y);
				} else {
					xl = x;
				}
				wn = !wn;
			}
		}
	}

	function drawEllipse(x0, y0, x1, y1, dir) {
		x0 = x0|0;
		y0 = y0|0;
		x1 = x1|0;
		y1 = y1|0;

		var a = Math.abs(x1-x0);
		var b = Math.abs(y1-y0);
		var b1 = b & 1;
		var dx = 4*(1-a)*b*b;
		var dy = 4*(b1+1)*a*a;
		var err = dx + dy + b1*a*a;
		var e2;

		// Left and right edges
		var left = [], right = [];
		left.min = right.min = Infinity;

		if (x0 > x1) { x0 = x1; x1 += a; }
		if (y0 > y1) y0 = y1;
		y0 += ((b+1)/2)|0;
		y1 = y0 - b1;
		a *= 8*a; b1 = 8*b*b;

		do {
			maxedge(right, x1, y0);	// 1st quadrant
			minedge(left, x0, y0);	// 2nd quadrant
			minedge(left, x0, y1);	// 3rd quadrant
			maxedge(right, x1, y1);	// 4th quadrant
			e2 = 2*err;
			if (e2 >= dx) { x0++; x1--; dx += b1; err += dx; }
			if (e2 <= dy) { y0++; y1--; dy += a;  err += dy; }
		} while (x0 <= x1);

		while (y0-y1 < b) {	// too early stop of flat ellipse
			maxedge(right, x1+1, y0);
			minedge(left, x0-1, y0++);
			minedge(left, x0-1, y1);
			maxedge(right, x1+1, y1--);
		}

		for (var y = left.min, max = left.length-1; y <= max; y++) {
			addPoint(left[y], y);
		}
		// The points we calculated are "inside".  The fill algorithm excludes 
		// right edges, so +1 on each x.
		for (var y = right.min, max = right.length-1; y <= max; y++) {
			addPoint(right[y]+1, y);
		}

		function minedge(e, x, y) {
			if (e.min > y) e.min = y;
			var ey = e[y];
			if (ey == null || ey > x) {
				e[y] = x;
			}
		}

		function maxedge(e, x, y) {
			if (e.min > y) e.min = y;
			var ey = e[y];
			if (ey == null || ey < x) {
				e[y] = x;
			}
		}
	}

    // Returns true if outside the clipping region.
	function clipped(x, y) {
        var pts = gs_xyclip[y];
        if (!pts) {
            return true;
        }
        if (!pts.sorted) {
			pts.sort(function(a, b) { return a - b; });
            pts.sorted = true;
        }

        var wn = false;
        for (var n = 0, npts = pts.length; n < npts; n++) {
            var xn = pts[n];
            if (xn > x) {
                return !wn; 
            } else if (xn == x) {
                return wn;
            }
            wn = !wn;
		}
        return true;
	}

	// Returns 1 if clockwise, -1 if ccw.
	function polydir(pts) {
		var xp = 0;
		for (var i = 0, l = pts.length, j = l-1; i < l; j = i++) {
			xp += pts[j][0] * pts[i][1] - pts[i][0] * pts[j][1];
		}
		return xp > 0 ? 1 : -1;
	}
}
// drawing-canvas.js
//

// opts is the same options object passed into the bwipjs methods.
function DrawingCanvas(opts, canvas) {
	if (typeof window == null) {
		throw new Error('DrawingCanvas: not a browser');
	}

	var img;
	var ctx = canvas.getContext('2d', { willReadFrequently:true });
	var drawing = DrawingBuiltin(opts);

	// Provide our specializations for the builtin drawing
	drawing.image = image;
	drawing.end = end;

	return drawing;


	// Called by DrawingBuiltin.init() to get the ARGB bitmap for rendering.
	function image(width, height) {
		canvas.width  = width;
		canvas.height = height;

		// Set background 
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		if (/^[0-9a-fA-F]{6}$/.test(''+opts.backgroundcolor)) {
			ctx.fillStyle = '#' + opts.backgroundcolor;
			ctx.fillRect(0, 0, width, height);
		} else {
			ctx.clearRect(0, 0, width, height);
		}

		// Prepare the bitmap 
		img = ctx.getImageData(0, 0, width, height);

		// The return value is designed for both canvas pure-RGBA and PNG RGBA
		return { buffer:img.data, ispng:false };
	}

	function end() {
		ctx.putImageData(img, 0, 0);
	}
}
// fontlib.js
var FontLib = (function() {
    var fonts = [];
    var names = {};
    var glyphcache = {};
    var glyphmru = {};
    var glyphcount = 0;

    // Sentinel to simplify moving entries around in the list.
    glyphmru.next = glyphmru;
    glyphmru.prev = glyphmru;

    return {
        lookup:lookup,
        monochrome:monochrome,
        getglyph:getglyph,
        getpaths:getpaths,
        loadFont:loadFont,
    };

    // loadFont(name, data)
    // loadFont(name, mult, data)
    // loadFont(name, multy, multx, data)   // note order: y,x
    // data must be the font data, either a binary or base64 encoded string.
    function loadFont(name /*...args*/) {
        var multx = 100;
        var multy = 100;
        var data = null;

        if (arguments.length == 2) {
            data = arguments[1];
        } else if (arguments.length == 3) {
            multx = multy = +arguments[1] || 100;
            data = arguments[2];
        } else if (arguments.length == 4) {
            multy = +arguments[1] || 100;
            multx = +arguments[2] || 100;
            data = arguments[3];
        } else {
            throw new Error("loadFont(): invalid number of arguments");
        }

        var font = STBTT.InitFont(toUint8Array(data));
        font.bwipjs_name = name;
        font.bwipjs_multx = multx;
        font.bwipjs_multy = multy;

        var fontid = fonts.push(font)-1;
        names[name.toUpperCase()] = fontid;
        return fontid;
    }

    // Always returns a valid font-id (default OCR-B)
    function lookup(name) {
        var fontid = names[name.toUpperCase()];
        return fontid === undefined ? 1 : fontid;       // OCR B default
    }

    // Not supported by stbtt
    function monochrome(mono) {
        if (mono) {
            throw new Error('fontlib: monochrome not implemented');
        }
    }

    function getglyph(fontid, charcode, width, height) {
        fontid   = fontid|0;
        charcode = charcode|0;
        width    = +width;
        height   = +height;
        if (!width || width < 8) {
            width = 8;
        }
        if (!height || height < 8) {
            height = width;
        }
        if (fontid < 0 || fontid >= fonts.length) {
            fontid = 1;     // OCR B default
        }
        if (!charcode || charcode < 32) {
            charcode = 32;
        }

        // In the cache?
        var cachekey = '' + fontid + 'c' + charcode + 'w' + width + 'h' + height; 
        var glyph = glyphcache[cachekey];
        if (glyph) {
            // Unthread from the MRU
            glyph.prev.next = glyph.next;
            glyph.next.prev = glyph.prev;

            // Thread back onto the top
            var sntl = glyphmru;
            sntl.next.prev = glyph;
            glyph.next = sntl.next;
            glyph.prev = sntl;
            sntl.next = glyph;
            
            return glyph;
        }

        var font = fonts[fontid];
        var glyph = STBTT.GetGlyph(font, charcode, width * font.bwipjs_multx / 100,
                                                   height * font.bwipjs_multy / 100) ||
                    STBTT.GetGlyph(font, 0, width * font.bwipjs_multx / 100,
                                                   height * font.bwipjs_multy / 100);
        
        glyph.bytes = glyph.pixels;
        glyph.cachekey = cachekey;
        glyph.offset = 0;

        //glyph = {
        //      top:font.GlyphTop(),
        //      left:font.GlyphLeft(),
        //      width:font.GlyphWidth(),
        //      height:font.GlyphHeight(),
        //      advance:font.GlyphAdvance(),
        //      bitmap:font.GlyphBitmap(),
        //      offset:0,
        //      cachekey:cachekey,
        //  };

        // Purge old
        if (glyphcount > 250) {
            var sntl = glyphmru;
            var temp = sntl.prev;
            temp.prev.next = sntl;
            sntl.prev = temp.prev;
            temp.next = temp.prev = null;
            delete glyphcache[temp.cachekey];
        } else {
            glyphcount++;
        }

        // Add to cache and to the top of the MRU
        glyphcache[cachekey] = glyph;

        var sntl = glyphmru;
        sntl.next.prev = glyph;
        glyph.next = sntl.next;
        glyph.prev = sntl;
        sntl.next = glyph;

        return glyph;
    }

    function getpaths(fontid, charcode, width, height) {
        fontid   = fontid|0;
        charcode = charcode|0;
        width    = +width;
        height   = +height;
        if (!width || width < 8) {
            width = 8;
        }
        if (!height || height < 8) {
            height = width;
        }
        if (fontid < 0 || fontid >= fonts.length) {
            fontid = 1;     // OCR B default
        }
        if (!charcode || charcode < 32) {
            charcode = 32;
        }

        var font = fonts[fontid];
        return STBTT.GetPaths(font, charcode, width * font.bwipjs_multx / 100,
                                              height * font.bwipjs_multy / 100);
    }
})();

// bwip-js/stb_trutype.js
//
// JavaScript implementation of stb_truetype.h @ https://github.com/nothings/stb.
//
// This file is part of the bwip-js project available at:
//
// 		http://metafloor.github.io/bwip-js
//
// Copyright (c) 2019 Mark Warren : MIT LICENSE

// Copyright notice from stb_truetype.h:
//
// MIT License
//
// Copyright (c) 2017 Sean Barrett
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var STBTT = (function () {

var	STBTT_vmove	 = 1,
	STBTT_vline	 = 2,
	STBTT_vcurve = 3,
	STBTT_vcubic = 4,

	STBTT_PLATFORM_ID_UNICODE	= 0,
	STBTT_PLATFORM_ID_MAC		= 1,
	STBTT_PLATFORM_ID_ISO		= 2,
	STBTT_PLATFORM_ID_MICROSOFT = 3,

	STBTT_UNICODE_EID_UNICODE_1_0		= 0,
	STBTT_UNICODE_EID_UNICODE_1_1		= 1,
	STBTT_UNICODE_EID_ISO_10646			= 2,
	STBTT_UNICODE_EID_UNICODE_2_0_BMP	= 3,
	STBTT_UNICODE_EID_UNICODE_2_0_FULL	= 4,

	STBTT_MS_EID_SYMBOL			= 0,
	STBTT_MS_EID_UNICODE_BMP	= 1,
	STBTT_MS_EID_SHIFTJIS		= 2,
	STBTT_MS_EID_UNICODE_FULL	= 10;

var floor = Math.floor;
var ceil  = Math.ceil;
var sqrt  = Math.sqrt;
var abs   = Math.abs;

// Allocate an array of objects - replaces malloc(sizeof struct * n)
function oalloc(n) {
	var o = [];
	for (var i = 0; i < n; i++) {
		o.push({});
	}
	return o;
}

//static unsigned char stbtt__buf_get8(stbtt__buf * b)
function stbtt__buf_get8(b) {
    return b[b.cursor++]||0;
}

//static unsigned char stbtt__buf_peek8(stbtt__buf * b)
function stbtt__buf_peek8(b) {
    return b[b.cursor];
}

//static void stbtt__buf_seek(stbtt__buf * b, int o)
function stbtt__buf_seek(b, o) {
    b.cursor = (o > b.length || o < 0) ? b.length : o;
}

//static void stbtt__buf_skip(stbtt__buf * b, int o)
function stbtt__buf_skip(b, o) {
    stbtt__buf_seek(b, b.cursor + o);
}

//static unsigned int stbtt__buf_get(stbtt__buf * b, int n)
function stbtt__buf_get(b, n) {
    var v = 0;
    for (var i = 0; i < n; i++) {
        v = (v << 8) | stbtt__buf_get8(b);
    }
    return v;
}

// This function is only called once with a real 'p', all other uses are
// for a NULL buffer.  The for real usage, the code is inlined.
//static stbtt__buf stbtt__new_buf(const void *p, int size)
function stbtt__null_buf() {
	return { length:0 };
}

//static stbtt__buf stbtt__buf_range(const stbtt__buf * b, int o, int s)
function stbtt__buf_range(b, o, s) {
    if (o < 0 || s < 0 || o > b.length || s > b.length - o) {
        return stbtt__null_buf();
    }
	var r = b.subarray(o, o + s);
	r.cursor = 0;
	return r;
}

//static stbtt__buf stbtt__cff_get_index(stbtt__buf * b)
function stbtt__cff_get_index(b) {
    var start = b.cursor;
    var count = stbtt__buf_get(b, 2);
    if (count) {
        var offsize = stbtt__buf_get8(b);
        stbtt__buf_skip(b, offsize * count);
        stbtt__buf_skip(b, stbtt__buf_get(b, offsize) - 1);
    }
    return stbtt__buf_range(b, start, b.cursor - start);
}

//static unsigned int stbtt__cff_int(stbtt__buf * b)
function stbtt__cff_int(b) {
    var b0 = stbtt__buf_get8(b);
    if (b0 >= 32 && b0 <= 246) {
        return b0 - 139;
    } else if (b0 >= 247 && b0 <= 250) {
        return (b0 - 247) * 256 + stbtt__buf_get8(b) + 108;
    } else if (b0 >= 251 && b0 <= 254) {
        return -(b0 - 251) * 256 - stbtt__buf_get8(b) - 108;
    } else if (b0 == 28) {
        return stbtt__buf_get(b, 2);
    } else if (b0 == 29) {
        return stbtt__buf_get(b, 4);
    }
    return 0;
}

//static void stbtt__cff_skip_operand(stbtt__buf * b)
function stbtt__cff_skip_operand(b) {
    var b0 = stbtt__buf_peek8(b);
    if (b0 == 30) {
        stbtt__buf_skip(b, 1);
        while (b.cursor < b.length) {
            var v = stbtt__buf_get8(b);
            if ((v & 0xF) == 0xF || (v >> 4) == 0xF) {
                break;
            }
        }
    } else {
        stbtt__cff_int(b);
    }
}

//static stbtt__buf stbtt__dict_get(stbtt__buf * b, int key)
function stbtt__dict_get(b, key) {
    stbtt__buf_seek(b, 0);
    while (b.cursor < b.length) {
        var start = b.cursor, end, op;
        while (stbtt__buf_peek8(b) >= 28) {
            stbtt__cff_skip_operand(b);
        }
        end = b.cursor;
        op = stbtt__buf_get8(b);
        if (op == 12) {
            op = stbtt__buf_get8(b) | 0x100;
        }
        if (op == key) {
            return stbtt__buf_range(b, start, end - start);
        }
    }
    return stbtt__buf_range(b, 0, 0);
}

//static void stbtt__dict_get_ints(stbtt__buf * b, int key, int outcount, unsigned int *out)
function stbtt__dict_get_ints(b, key, outcount, out) {
    var operands = stbtt__dict_get(b, key);
    for (var i = 0; i < outcount && operands.cursor < operands.length; i++) {
        out[i] = stbtt__cff_int(operands);
    }
}
// single-integer format of above since javascript doesn't have address-of
function stbtt__dict_get_int(b, key, out) {
    var operands = stbtt__dict_get(b, key);
    if (operands.cursor < operands.length) {
        out = stbtt__cff_int(operands);
    }
	return out;
}

//static int stbtt__cff_index_count(stbtt__buf * b)
function stbtt__cff_index_count(b) {
    stbtt__buf_seek(b, 0);
    return stbtt__buf_get(b, 2);
}

//static stbtt__buf stbtt__cff_index_get(stbtt__buf b, int i)
function stbtt__cff_index_get(b, i) {
    var count, offsize, start, end;
    stbtt__buf_seek(b, 0);
    count = stbtt__buf_get(b, 2);
    offsize = stbtt__buf_get8(b);
    stbtt__buf_skip(b, i * offsize);
    start = stbtt__buf_get(b, offsize);
    end = stbtt__buf_get(b, offsize);
    return stbtt__buf_range(b, 2 + (count + 1) * offsize + start, end - start);
}

// Convert sign-extend a 16-bit integer to JS number
function INT16(n) {
	return n & 0x8000 ? (0xffff0000|n)>>0 : n;
}

//static unsigned short ttUSHORT(unsigned char *p)
function ttUSHORT(b, o) {
    return b[o] * 256 + b[o+1];
}

//static short ttSHORT(unsigned char *p)
function ttSHORT(b, o) {
    var n = b[o] * 256 + b[o+1];
	return n & 0x8000 ? (0xffff0000|n)>>0 : n;
}

//static unsigned int ttULONG(unsigned char *p)
function ttULONG(b, o) {
    return (b[o] << 24) + (b[o+1] << 16) + (b[o+2] << 8) + b[o+3];
}

//static unsigned int stbtt__find_table(unsigned char *data, unsigned int fontstart, const char *tag)
function stbtt__find_table(data, fontstart, tag) {
    var num_tables = ttUSHORT(data, fontstart + 4);
    var tabledir = fontstart + 12;
    for (var i = 0; i < num_tables; ++i) {
        var loc = tabledir + 16 * i;
        if (data[loc] == tag[0] && data[loc+1] == tag[1] && data[loc+2] == tag[2] && data[loc+3] == tag[3]) {
            return ttULONG(data, loc + 8);
        }
    }
    return 0;
}

//static stbtt__buf stbtt__get_subrs(stbtt__buf cff, stbtt__buf fontdict)
function stbtt__get_subrs(cff, fontdict) {
    var private_loc = [ 0, 0 ];
    stbtt__dict_get_ints(fontdict, 18, 2, private_loc);
    if (!private_loc[1] || !private_loc[0]) {
        return stbtt__null_buf();
    }
    var pdict = stbtt__buf_range(cff, private_loc[1], private_loc[0]);
    var subrsoff = stbtt__dict_get_int(pdict, 19, 0);
    if (!subrsoff) {
        return stbtt__null_buf();
    }
    stbtt__buf_seek(cff, private_loc[1] + subrsoff);
    return stbtt__cff_get_index(cff);
}

//static int stbtt_InitFont_internal(stbtt_fontinfo * info, unsigned char *data, int fontstart)
function stbtt_InitFont_internal(info, data, fontstart) {
    var cmap, t, i, numTables;

    info.data = data;
    info.fontstart = fontstart;
    info.cff = stbtt__null_buf();

    cmap = stbtt__find_table(data, fontstart, [ 99, 109, 97, 112 ]);		//"cmap"
    info.loca = stbtt__find_table(data, fontstart, [ 108, 111, 99, 97 ]);	//"loca"
    info.head = stbtt__find_table(data, fontstart, [ 104, 101, 97, 100 ]);	//"head"
    info.glyf = stbtt__find_table(data, fontstart, [ 103, 108, 121, 102 ]);	//"glyf"
    info.hhea = stbtt__find_table(data, fontstart, [ 104, 104, 101, 97 ]);	//"hhea"
    info.hmtx = stbtt__find_table(data, fontstart, [ 104, 109, 116, 120 ]);	//"hmtx"
    info.kern = stbtt__find_table(data, fontstart, [ 107, 101, 114, 110 ]);	//"kern"

    if (!cmap || !info.head || !info.hhea || !info.hmtx) {
        return 0;
    }
    if (info.glyf) {
        if (!info.loca) {
            return 0;
        }
    } else {
        var b, topdict, topdictidx, cff,
			cstype = 2, charstrings = 0, fdarrayoff = 0, fdselectoff = 0;

        cff = stbtt__find_table(data, fontstart, [ 67, 70, 70, 32 ]);	//"CFF "
        if (!cff) {
            return 0;
        }

        info.fontdicts = stbtt__null_buf();
        info.fdselect = stbtt__null_buf();

        info.cff = data.subarray(cff); //stbtt__new_buf(data + cff, 512 * 1024 * 1024);
		info.cff.cursor = 0;
        b = info.cff;

        stbtt__buf_skip(b, 2);
        stbtt__buf_seek(b, stbtt__buf_get8(b));

        stbtt__cff_get_index(b);
        topdictidx = stbtt__cff_get_index(b);
        topdict = stbtt__cff_index_get(topdictidx, 0);
        stbtt__cff_get_index(b);
        info.gsubrs = stbtt__cff_get_index(b);

        charstrings = stbtt__dict_get_int(topdict, 17, charstrings);
        cstype = stbtt__dict_get_int(topdict, 0x100 | 6, cstype);
        fdarrayoff = stbtt__dict_get_int(topdict, 0x100 | 36, fdarrayoff);
        fdselectoff = stbtt__dict_get_int(topdict, 0x100 | 37, fdselectoff);
        info.subrs = stbtt__get_subrs(b, topdict);

        if (cstype != 2) {
            return 0;
        }
        if (charstrings == 0) {
            return 0;
        }

        if (fdarrayoff) {
            if (!fdselectoff) {
                return 0;
            }
            stbtt__buf_seek(b, fdarrayoff);
            info.fontdicts = stbtt__cff_get_index(b);
            info.fdselect = stbtt__buf_range(b, fdselectoff, b.length - fdselectoff);
        }

        stbtt__buf_seek(b, charstrings);
        info.charstrings = stbtt__cff_get_index(b);
    }

    t = stbtt__find_table(data, fontstart, [ 109, 97, 120, 112 ]);	//"maxp"
    if (t) {
        info.numGlyphs = ttUSHORT(data, t + 4);
    }
    else {
        info.numGlyphs = 0xffff;
    }

    numTables = ttUSHORT(data, cmap + 2);
    info.index_map = 0;
    for (i = 0; i < numTables; ++i) {
        var encoding_record = cmap + 4 + 8 * i;

        switch (ttUSHORT(data, encoding_record)) {
        case STBTT_PLATFORM_ID_MICROSOFT:
            switch (ttUSHORT(data, encoding_record + 2)) {
            case STBTT_MS_EID_UNICODE_BMP:
            case STBTT_MS_EID_UNICODE_FULL:
                info.index_map = cmap + ttULONG(data, encoding_record + 4);
                break;
            }
            break;
        case STBTT_PLATFORM_ID_UNICODE:
            info.index_map = cmap + ttULONG(data, encoding_record + 4);
            break;
        }
    }
    if (info.index_map == 0) {
        return 0;
    }

    info.indexToLocFormat = ttUSHORT(data, info.head + 50);
    return 1;
}

//extern int stbtt_FindGlyphIndex(const stbtt_fontinfo * info, int unicode_codepoint)
function stbtt_FindGlyphIndex(info, unicode_codepoint) {
    var data = info.data, index_map = info.index_map;

    var format = ttUSHORT(data, index_map + 0);
    if (format == 0) {
        var bytes = ttUSHORT(data, index_map + 2);
        if (unicode_codepoint < bytes - 6) {
            return data[index_map + 6 + unicode_codepoint];
		}
        return 0;
    } else if (format == 6) {
        var first = ttUSHORT(data, index_map + 6),
            count = ttUSHORT(data, index_map + 8);
        if (unicode_codepoint >= first && unicode_codepoint < first + count) {
            return ttUSHORT(data, index_map + 10 + (unicode_codepoint - first) * 2);
		}
        return 0;
    } else if (format == 2) {
        return 0;
    } else if (format == 4) {
        var segcount = ttUSHORT(data, index_map + 6) >> 1,
            searchRange = ttUSHORT(data, index_map + 8) >> 1,
            entrySelector = ttUSHORT(data, index_map + 10),
            rangeShift = ttUSHORT(data, index_map + 12) >> 1,
			endCount = index_map + 14,
            search = endCount;

        if (unicode_codepoint > 0xffff) {
            return 0;
        }

        if (unicode_codepoint >= ttUSHORT(data, search + rangeShift * 2)) {
            search += rangeShift * 2;
        }

        search -= 2;
        while (entrySelector) {
            searchRange >>= 1;
            var end = ttUSHORT(data, search + searchRange * 2);
            if (unicode_codepoint > end) {
                search += searchRange * 2;
            }
            --entrySelector;
        }
        search += 2;

		var offset, start, item = (search - endCount) >>> 1;

		start = ttUSHORT(data, index_map + 14 + segcount * 2 + 2 + 2 * item);
		if (unicode_codepoint < start) {
			return 0;
		}

		offset = ttUSHORT(data, index_map + 14 + segcount * 6 + 2 + 2 * item);
		if (offset == 0) {
			return unicode_codepoint + ttSHORT(data, index_map + 14 + segcount * 4 + 2 + 2 * item);
		}
		return ttUSHORT(data, offset + (unicode_codepoint - start) * 2 +
								index_map + 14 + segcount * 6 + 2 +	2 * item);
    } else if (format == 12 || format == 13) {
        var ngroups = ttULONG(data, index_map + 12),
			low = 0, high = ngroups;
         while (low < high) {
            var mid = low + ((high - low) >> 1);
            var start_char = ttULONG(data, index_map + 16 + mid * 12);
            var end_char = ttULONG(data, index_map + 16 + mid * 12 + 4);
            if (unicode_codepoint < start_char) {
                high = mid;
            } else if (unicode_codepoint > end_char) {
                low = mid + 1;
            } else {
                var start_glyph = ttULONG(data, index_map + 16 + mid * 12 + 8);
                if (format == 12) {
                    return start_glyph + unicode_codepoint - start_char;
				} else {
                    return start_glyph;
                }
            }
        }
        return 0;
    }
    return 0;
}

//static void stbtt_setvertex(stbtt_vertex * v, unsigned char type, int x, int y, int cx, int cy)
function stbtt_setvertex(v, type, x, y, cx, cy) {
    v.type = type;
    v.x = x;
    v.y = y;
    v.cx = cx;
    v.cy = cy;
}

//static int stbtt__GetGlyfOffset(const stbtt_fontinfo * info, int glyph_index)
function stbtt__GetGlyfOffset(info, glyph_index) {
    var  g1, g2;
    if (glyph_index >= info.numGlyphs) {
        return -1;
    }
    if (info.indexToLocFormat >= 2) {
        return -1;
    }

    if (info.indexToLocFormat == 0) {
        g1 = info.glyf + ttUSHORT(info.data, info.loca + glyph_index * 2) * 2;
        g2 = info.glyf + ttUSHORT(info.data, info.loca + glyph_index * 2 + 2) * 2;
    } else {
        g1 = info.glyf + ttULONG(info.data, info.loca + glyph_index * 4);
        g2 = info.glyf + ttULONG(info.data, info.loca + glyph_index * 4 + 4);
    }

    return g1 == g2 ? -1 : g1;
}

//extern int stbtt_GetGlyphBox(const stbtt_fontinfo * info, int glyph_index, int *x0, int *y0, int *x1, int *y1)
function stbtt_GetGlyphBox(info, glyph_index, out) {
    if (info.cff.length) {
        stbtt__GetGlyphInfoT2(info, glyph_index, out);
    } else {
        var g = stbtt__GetGlyfOffset(info, glyph_index);
        if (g < 0) {
            return 0;
        }
	    out.x0 = ttSHORT(info.data, g + 2);
		out.y0 = ttSHORT(info.data, g + 4);
		out.x1 = ttSHORT(info.data, g + 6);
		out.y1 = ttSHORT(info.data, g + 8);
    }
    return 1;
}

//static int stbtt__close_shape(stbtt_vertex * vertices, int num_vertices, int was_off,
//                   int start_off, int sx, int sy, int scx, int scy, int cx, int cy)
function stbtt__close_shape(vertices, num_vertices, was_off, start_off, sx, sy, scx, scy, cx, cy) {
    if (start_off) {
        if (was_off) {
            stbtt_setvertex(vertices[num_vertices++], STBTT_vcurve,
                            (cx + scx) >> 1, (cy + scy) >> 1, cx, cy);
		}
        stbtt_setvertex(vertices[num_vertices++], STBTT_vcurve, sx, sy, scx, scy);
    } else {
        if (was_off) {
            stbtt_setvertex(vertices[num_vertices++], STBTT_vcurve, sx, sy, cx, cy);
		} else {
            stbtt_setvertex(vertices[num_vertices++], STBTT_vline, sx, sy, 0, 0);
		}
    }
    return num_vertices;
}

//static int stbtt__GetGlyphShapeTT(const stbtt_fontinfo * info, int glyph_index, stbtt_vertex ** pvertices)
function stbtt__GetGlyphShapeTT(info, glyph_index) {
    var data = info.data,
		g = stbtt__GetGlyfOffset(info, glyph_index);

	if (g < 0) {
        return null;
    }

	var vertices = [];
    var numberOfContours = ttSHORT(data, g);
    if (numberOfContours > 0) {
        var flags = 0, flagcount,
			i, j = 0, m, n, next_move, was_off = 0, off, start_off = 0,
			x, y, cx, cy, sx, sy, scx, scy;
        var endPtsOfContours = g + 10;
        var ins = ttUSHORT(data, g + 10 + numberOfContours * 2);
        var points = data.subarray(g + 10 + numberOfContours * 2 + 2 + ins);
		var ptsoff = 0;

        n = 1 + ttUSHORT(data, endPtsOfContours + numberOfContours * 2 - 2);
        m = n + 2 * numberOfContours;

        vertices = oalloc(m);
        next_move = 0;
        flagcount = 0;
        off = m - n;

        for (i = 0; i < n; ++i) {
            if (flagcount == 0) {
                flags = points[ptsoff++];
                if (flags & 8) {
                    flagcount = points[ptsoff++];
                }
            } else {
                --flagcount;
            }
            vertices[off + i].type = flags;
        }

        x = 0;
        for (i = 0; i < n; ++i) {
            flags = vertices[off + i].type;
            if (flags & 2) {
                var dx = points[ptsoff++];
                x += (flags & 16) ? dx : -dx;
            } else {
                if (!(flags & 16)) {
                    x = x + INT16(points[ptsoff] * 256 + points[ptsoff+1]);
                    ptsoff += 2;
                }
            }
            vertices[off + i].x = x;
        }

        y = 0;
        for (i = 0; i < n; ++i) {
            flags = vertices[off + i].type;
            if (flags & 4) {
                var dy = points[ptsoff++];
                y += (flags & 32) ? dy : -dy;
            } else {
                if (!(flags & 32)) {
                    y = y + INT16(points[ptsoff] * 256 + points[ptsoff+1]);
                    ptsoff += 2;
                }
            }
            vertices[off + i].y = y;
        }

        var num_vertices = 0;
        sx = sy = cx = cy = scx = scy = 0;
        for (i = 0; i < n; ++i) {
            flags = vertices[off + i].type;
            x = vertices[off + i].x;
            y = vertices[off + i].y;

            if (next_move == i) {
                if (i != 0) {
                    num_vertices = stbtt__close_shape(vertices, num_vertices, was_off, start_off,
											sx, sy, scx, scy, cx, cy);
				}
                start_off = !(flags & 1);
                if (start_off) {
                    scx = x;
                    scy = y;
                    if (!(vertices[off + i + 1].type & 1)) {
                        sx = (x + vertices[off + i + 1].x) >> 1;
                        sy = (y + vertices[off + i + 1].y) >> 1;
                    } else {
                        sx = vertices[off + i + 1].x;
                        sy = vertices[off + i + 1].y;
                        ++i;
                    }
                } else {
                    sx = x;
                    sy = y;
                }
                stbtt_setvertex(vertices[num_vertices++], STBTT_vmove, sx, sy, 0, 0);
                was_off = 0;
                next_move = 1 + ttUSHORT(data, endPtsOfContours + j * 2);
                ++j;
            } else {
                if (!(flags & 1)) {
                    if (was_off) {
                        stbtt_setvertex(vertices[num_vertices++], STBTT_vcurve,
                                        (cx + x) >> 1, (cy + y) >> 1, cx, cy);
					}
                    cx = x;
                    cy = y;
                    was_off = 1;
                } else {
                    if (was_off) {
                        stbtt_setvertex(vertices[num_vertices++], STBTT_vcurve, x, y, cx, cy);
                    } else {
                        stbtt_setvertex(vertices[num_vertices++], STBTT_vline, x, y, 0, 0);
					}
                    was_off = 0;
                }
            }
        }
        vertices.length = stbtt__close_shape(vertices, num_vertices, was_off, start_off,
												sx, sy, scx, scy, cx, cy);
    } else if (numberOfContours == -1) {
        var more = 1;
        var comp = g + 10;
         while (more) {
            var flags, gidx, mtx = [ 1, 0, 0, 1, 0, 0 ];

            flags = ttSHORT(data, comp);
            comp += 2;
            gidx = ttSHORT(data, comp);
            comp += 2;

            if (flags & 2) {
                if (flags & 1) {
                    mtx[4] = ttSHORT(data, comp);
                    comp += 2;
                    mtx[5] = ttSHORT(data, comp);
                    comp += 2;
                } else {
                    mtx[4] = stbtt__buf_get8(data, comp);
                    comp += 1;
                    mtx[5] = stbtt__buf_get8(data, comp);
                    comp += 1;
                }
            }
            if (flags & (1 << 3)) {
                mtx[0] = mtx[3] = ttSHORT(data, comp) / 16384.0;
                comp += 2;
                mtx[1] = mtx[2] = 0;
            } else if (flags & (1 << 6)) {
                mtx[0] = ttSHORT(data, comp) / 16384.0;
                comp += 2;
                mtx[1] = mtx[2] = 0;
                mtx[3] = ttSHORT(data, comp) / 16384.0;
                comp += 2;
            } else if (flags & (1 << 7)) {
                mtx[0] = ttSHORT(data, comp) / 16384.0;
                comp += 2;
                mtx[1] = ttSHORT(data, comp) / 16384.0;
                comp += 2;
                mtx[2] = ttSHORT(data, comp) / 16384.0;
                comp += 2;
                mtx[3] = ttSHORT(data, comp) / 16384.0;
                comp += 2;
            }

            var m = sqrt(mtx[0] * mtx[0] + mtx[1] * mtx[1]);
            var n = sqrt(mtx[2] * mtx[2] + mtx[3] * mtx[3]);
            var comp_verts = stbtt_GetGlyphShape(info, gidx);
            if (comp_verts.length > 0) {
                for (var i = 0, l = comp_verts.length; i < l; ++i) {
                    var v = comp_verts[i], x, y;
					x = v.x;
					y = v.y;
                    v.x = floor(m * (mtx[0] * x + mtx[2] * y + mtx[4]));
                    v.y = floor(n * (mtx[1] * x + mtx[3] * y + mtx[5]));
                    x = v.cx;
                    y = v.cy;
                    v.cx = floor(m * (mtx[0] * x + mtx[2] * y + mtx[4]));
                    v.cy = floor(n * (mtx[1] * x + mtx[3] * y + mtx[5]));
                }

				vertices = vertices.concat(comp_verts);
            }
            more = flags & (1 << 5);
        }
    }
	//console.log('vertices(' + vertices.length + ')');
	//for (var i = 0; i < vertices.length; i++) {
	//	var pt = vertices[i];
	//	console.log(`${i}: ${pt.x},${pt.y} / ${pt.cx},${pt.cy} / ${pt.type}`);
	//}

    return vertices;
}

//static void stbtt__track_vertex(stbtt__csctx * c, int x, int y)
function stbtt__track_vertex(c, x, y) {
    if (x > c.max_x || !c.started) {
        c.max_x = x;
    }
    if (y > c.max_y || !c.started) {
        c.max_y = y;
    }
    if (x < c.min_x || !c.started) {
        c.min_x = x;
    }
    if (y < c.min_y || !c.started) {
        c.min_y = y;
    }
    c.started = 1;
}

//static void stbtt__csctx_v(stbtt__csctx * c, unsigned char type, int x, int y, int cx, int cy, int cx1, int cy1)
function stbtt__csctx_v(c, type, x, y, cx, cy, cx1, cy1) {
	stbtt__track_vertex(c, x, y);
	if (type == STBTT_vcubic) {
		stbtt__track_vertex(c, cx, cy);
		stbtt__track_vertex(c, cx1, cy1);
	}
	var v = {};
	stbtt_setvertex(v, type, x, y, cx, cy);
	v.cx1 = cx1;
	v.cy1 = cy1;
	c.vertices.push(v);
 }

//static void stbtt__csctx_close_shape(stbtt__csctx * ctx)
function stbtt__csctx_close_shape(ctx) {
    if (ctx.first_x != ctx.x || ctx.first_y != ctx.y) {
        stbtt__csctx_v(ctx, STBTT_vline, ctx.first_x, ctx.first_y, 0, 0, 0, 0);
	}
}

//static void stbtt__csctx_rmove_to(stbtt__csctx * ctx, float dx, float dy)
function stbtt__csctx_rmove_to(ctx, dx, dy) {
    stbtt__csctx_close_shape(ctx);
    ctx.first_x = ctx.x = ctx.x + dx;
    ctx.first_y = ctx.y = ctx.y + dy;
    stbtt__csctx_v(ctx, STBTT_vmove, ctx.x, ctx.y, 0, 0, 0, 0);
}

//static void stbtt__csctx_rline_to(stbtt__csctx * ctx, float dx, float dy)
function stbtt__csctx_rline_to(ctx, dx, dy) {
    ctx.x += dx;
    ctx.y += dy;
    stbtt__csctx_v(ctx, STBTT_vline, ctx.x, ctx.y, 0, 0, 0, 0);
}

//static void stbtt__csctx_rccurve_to(stbtt__csctx * ctx, float dx1, float dy1, float dx2,
//									float dy2, float dx3, float dy3)
function stbtt__csctx_rccurve_to(ctx, dx1, dy1, dx2, dy2, dx3, dy3) {
    var cx1 = ctx.x + dx1,
		cy1 = ctx.y + dy1,
		cx2 = cx1 + dx2,
		cy2 = cy1 + dy2;
    ctx.x = cx2 + dx3;
    ctx.y = cy2 + dy3;
    stbtt__csctx_v(ctx, STBTT_vcubic, ctx.x, ctx.y, cx1, cy1, cx2, cy2);
}

//static stbtt__buf stbtt__get_subr(stbtt__buf idx, int n)
function stbtt__get_subr(b, n) {
    var count = stbtt__cff_index_count(b);
    var bias = 107;
    if (count >= 33900) {
        bias = 32768;
    } else if (count >= 1240) {
        bias = 1131;
    }
    n += bias;
    if (n < 0 || n >= count) {
        return stbtt__null_buf();
    }
    return stbtt__cff_index_get(b, n);
}

//static stbtt__buf stbtt__cid_get_glyph_subrs(const stbtt_fontinfo * info, int glyph_index)
function stbtt__cid_get_glyph_subrs(info, glyph_index) {
    var fdselect = info.fdselect;
    var nranges, start, end, v, fmt, fdselector = -1, i;

    stbtt__buf_seek(fdselect, 0);
    fmt = stbtt__buf_get8(fdselect);
    if (fmt == 0) {
        stbtt__buf_skip(fdselect, glyph_index);
        fdselector = stbtt__buf_get8(fdselect);
    } else if (fmt == 3) {
        nranges = stbtt__buf_get(fdselect, 2);
        start = stbtt__buf_get(fdselect, 2);
        for (i = 0; i < nranges; i++) {
            v = stbtt__buf_get8(fdselect);
            end = stbtt__buf_get(fdselect, 2);
            if (glyph_index >= start && glyph_index < end) {
                fdselector = v;
                break;
            }
            start = end;
        }
    }
    if (fdselector == -1) {
        stbtt__null_buf();
    }
    return stbtt__get_subrs(info.cff, stbtt__cff_index_get(info.fontdicts, fdselector));
}

//static int stbtt__run_charstring(const stbtt_fontinfo * info, int glyph_index,
//								   stbtt__csctx * c)
function stbtt__run_charstring(info, glyph_index, c) {
    var in_header = 1, maskbits = 0, subr_stack_height = 0, sp = 0, v, i, b0,
		has_subrs = 0, clear_stack,
		s = [], subr_stack = [], subrs = info.subrs, b, f;

    b = stbtt__cff_index_get(info.charstrings, glyph_index);
    while (b.cursor < b.length) {
        i = 0;
        clear_stack = 1;
        b0 = stbtt__buf_get8(b);
        switch (b0) {
        case 0x13:
        case 0x14:
            if (in_header) {
                maskbits += (sp / 2)|0;
            }
            in_header = 0;
            stbtt__buf_skip(b, ((maskbits + 7) / 8)|0);
            break;

        case 0x01:
        case 0x03:
        case 0x12:
        case 0x17:
            maskbits += (sp / 2)|0;
            break;

        case 0x15:
            in_header = 0;
            if (sp < 2) {
                return 0;
            }
            stbtt__csctx_rmove_to(c, s[sp - 2], s[sp - 1]);
            break;
        case 0x04:
            in_header = 0;
            if (sp < 1) {
                return 0;
            }
            stbtt__csctx_rmove_to(c, 0, s[sp - 1]);
            break;
        case 0x16:
            in_header = 0;
            if (sp < 1) {
                return 0;
            }
            stbtt__csctx_rmove_to(c, s[sp - 1], 0);
            break;

        case 0x05:
            if (sp < 2) {
                return 0;
            }
            for (; i + 1 < sp; i += 2) {
                stbtt__csctx_rline_to(c, s[i], s[i + 1]);
            }
            break;

        case 0x07:
            if (sp < 1) {
                return 0;
            }
			for (;;) {
                if (i >= sp) {
                    break;
                }
                stbtt__csctx_rline_to(c, 0, s[i]);
                i++;
                if (i >= sp) {
                    break;
                }
                stbtt__csctx_rline_to(c, s[i], 0);
                i++;
			}
			break;
        case 0x06:
            if (sp < 1) {
                return 0;
            }
            for (;;) {
                if (i >= sp) {
                    break;
                }
                stbtt__csctx_rline_to(c, s[i], 0);
                i++;
                if (i >= sp) {
                    break;
                }
                stbtt__csctx_rline_to(c, 0, s[i]);
                i++;
            }
            break;

        case 0x1F:
            if (sp < 4) {
                return 0;
            }
			for (;;) {
                if (i + 3 >= sp) {
                    break;
                }
                stbtt__csctx_rccurve_to(c, s[i], 0, s[i + 1], s[i + 2],
                                        (sp - i == 5) ? s[i + 4] : 0.0,
                                        s[i + 3]);
                i += 4;
                if (i + 3 >= sp) {
                    break;
                }
                stbtt__csctx_rccurve_to(c, 0, s[i], s[i + 1],
                                        s[i + 2], s[i + 3],
                                        (sp - i == 5) ? s[i + 4] : 0.0);
                i += 4;
			}
			break;
        case 0x1E:
            if (sp < 4) {
                return 0;
            }
            for (;;) {
                if (i + 3 >= sp) {
                    break;
                }
                stbtt__csctx_rccurve_to(c, 0, s[i], s[i + 1],
                                        s[i + 2], s[i + 3],
                                        (sp - i == 5) ? s[i + 4] : 0.0);
                i += 4;
                if (i + 3 >= sp) {
                    break;
                }
                stbtt__csctx_rccurve_to(c, s[i], 0, s[i + 1], s[i + 2],
                                        (sp - i == 5) ? s[i + 4] : 0.0,
                                        s[i + 3]);
                i += 4;
            }
            break;

        case 0x08:
            if (sp < 6) {
                return 0;
            }
            for (; i + 5 < sp; i += 6) {
                stbtt__csctx_rccurve_to(c, s[i], s[i + 1],
                                        s[i + 2], s[i + 3],
                                        s[i + 4], s[i + 5]);
			}
            break;

        case 0x18:
            if (sp < 8) {
                return 0;
            }
            for (; i + 5 < sp - 2; i += 6) {
                stbtt__csctx_rccurve_to(c, s[i], s[i + 1],
                                        s[i + 2], s[i + 3],
                                        s[i + 4], s[i + 5]);
			}
            if (i + 1 >= sp) {
                return 0;
            }
            stbtt__csctx_rline_to(c, s[i], s[i + 1]);
            break;

        case 0x19:
            if (sp < 8) {
                return 0;
            }
            for (; i + 1 < sp - 6; i += 2) {
                stbtt__csctx_rline_to(c, s[i], s[i + 1]);
            }
            if (i + 5 >= sp) {
                return 0;
            }
            stbtt__csctx_rccurve_to(c, s[i], s[i + 1], s[i + 2],
                                    s[i + 3], s[i + 4], s[i + 5]);
            break;

        case 0x1A:
        case 0x1B:
            if (sp < 4) {
                return 0;
            }
            f = 0.0;
            if (sp & 1) {
                f = s[i];
                i++;
            }
            for (; i + 3 < sp; i += 4) {
                if (b0 == 0x1B) {
                    stbtt__csctx_rccurve_to(c, s[i], f,
                                            s[i + 1],
                                            s[i + 2],
                                            s[i + 3], 0.0);
                } else {
                    stbtt__csctx_rccurve_to(c, f, s[i],
                                            s[i + 1],
                                            s[i + 2], 0.0,
                                            s[i + 3]);
				}
                f = 0.0;
            }
            break;

        case 0x0A:
            if (!has_subrs) {
                if (info.fdselect.length) {
                    subrs = stbtt__cid_get_glyph_subrs(info, glyph_index);
				}
                has_subrs = 1;
            }

        case 0x1D:
            if (sp < 1) {
                return 0;
            }
            v = s[--sp]|0;
            if (subr_stack_height >= 10) {
                return 0;
            }
            subr_stack[subr_stack_height++] = b;
            b = stbtt__get_subr(b0 == 0x0A ? subrs : info.gsubrs, v);
            if (b.length == 0) {
                return 0;
            }
            b.cursor = 0;
            clear_stack = 0;
            break;

        case 0x0B:
            if (subr_stack_height <= 0) {
                return 0;
            }
            b = subr_stack[--subr_stack_height];
            clear_stack = 0;
            break;

        case 0x0E:
            stbtt__csctx_close_shape(c);
            return 1;

        case 0x0C:
            var dx1, dx2, dx3, dx4, dx5, dx6, dy1, dy2, dy3, dy4, dy5, dy6,
				dx, dy, b1 = stbtt__buf_get8(b);
            switch (b1) {
            case 0x22:
                if (sp < 7) {
                    return 0;
                }
                dx1 = s[0];
                dx2 = s[1];
                dy2 = s[2];
                dx3 = s[3];
                dx4 = s[4];
                dx5 = s[5];
                dx6 = s[6];
                stbtt__csctx_rccurve_to(c, dx1, 0, dx2, dy2, dx3, 0);
                stbtt__csctx_rccurve_to(c, dx4, 0, dx5, -dy2, dx6, 0);
                break;

            case 0x23:
                if (sp < 13) {
                    return 0;
                }
                dx1 = s[0];
                dy1 = s[1];
                dx2 = s[2];
                dy2 = s[3];
                dx3 = s[4];
                dy3 = s[5];
                dx4 = s[6];
                dy4 = s[7];
                dx5 = s[8];
                dy5 = s[9];
                dx6 = s[10];
                dy6 = s[11];

                stbtt__csctx_rccurve_to(c, dx1, dy1, dx2, dy2, dx3, dy3);
                stbtt__csctx_rccurve_to(c, dx4, dy4, dx5, dy5, dx6, dy6);
                break;

            case 0x24:
                if (sp < 9) {
                    return 0;
                }
                dx1 = s[0];
                dy1 = s[1];
                dx2 = s[2];
                dy2 = s[3];
                dx3 = s[4];
                dx4 = s[5];
                dx5 = s[6];
                dy5 = s[7];
                dx6 = s[8];
                stbtt__csctx_rccurve_to(c, dx1, dy1, dx2, dy2, dx3, 0);
                stbtt__csctx_rccurve_to(c, dx4, 0, dx5, dy5, dx6, -(dy1 + dy2 + dy5));
                break;

            case 0x25:
                if (sp < 11) {
                    return 0;
                }
                dx1 = s[0];
                dy1 = s[1];
                dx2 = s[2];
                dy2 = s[3];
                dx3 = s[4];
                dy3 = s[5];
                dx4 = s[6];
                dy4 = s[7];
                dx5 = s[8];
                dy5 = s[9];
                dx6 = dy6 = s[10];
                dx = dx1 + dx2 + dx3 + dx4 + dx5;
                dy = dy1 + dy2 + dy3 + dy4 + dy5;
                if (abs(dx) > abs(dy)) {
                    dy6 = -dy;
                } else {
                    dx6 = -dx;
                }
                stbtt__csctx_rccurve_to(c, dx1, dy1, dx2, dy2, dx3, dy3);
                stbtt__csctx_rccurve_to(c, dx4, dy4, dx5, dy5, dx6, dy6);
                break;

            default:
                return 0;
            }
        	break;

        default:
            if (b0 != 255 && b0 != 28 && (b0 < 32 || b0 > 254)) {
                return 0;
            }
            if (b0 == 255) {
                // f = (float)(stbtt_int32)stbtt__buf_get32(&b) / 0x10000;
                f = (stbtt__buf_get(b, 4)|0) / 0x10000;
            } else {
                stbtt__buf_skip(b, -1);
                // f = (float)(stbtt_int16)stbtt__cff_int(&b);
                f = ((stbtt__cff_int(b)<<16)|0)>>16;
            }
            if (sp >= 48) {
                return 0;
            }
            s[sp++] = f;
            clear_stack = 0;
            break;
        }
        if (clear_stack) {
            sp = 0;
        }
    }
    return 0;
}

function stbtt__csctx_init() {
	return { started:0, first_x:0, first_y:0, x:0, y:0,
			min_x:0, max_x:0, min_y:0, max_y:0,
			vertices:[]
		};
}

//static int stbtt__GetGlyphShapeT2(const stbtt_fontinfo * info, int glyph_index,
//									stbtt_vertex ** pvertices)
function stbtt__GetGlyphShapeT2(info, glyph_index) {
    var output_ctx = stbtt__csctx_init();
    if (stbtt__run_charstring(info, glyph_index, output_ctx)) {
		return output_ctx.vertices;
    }
    return null;
}

//static int stbtt__GetGlyphInfoT2(const stbtt_fontinfo * info, int glyph_index, int *x0,
//                      int *y0, int *x1, int *y1)
function stbtt__GetGlyphInfoT2(info, glyph_index, out) {
    var c = stbtt__csctx_init();
    var r = stbtt__run_charstring(info, glyph_index, c);
	out.x0 = r ? c.min_x : 0;
	out.y0 = r ? c.min_y : 0;
	out.x1 = r ? c.max_x : 0;
	out.y1 = r ? c.max_y : 0;
    return r && c.vertices ? c.vertices.length : 0;
}

//extern int stbtt_GetGlyphShape(const stbtt_fontinfo * info, int glyph_index,
//								 stbtt_vertex ** pvertices)
function stbtt_GetGlyphShape(info, glyph_index) {
    if (!info.cff.length) {
        return stbtt__GetGlyphShapeTT(info, glyph_index);
    } else {
        return stbtt__GetGlyphShapeT2(info, glyph_index);
    }
}

//extern void stbtt_GetGlyphHMetrics(const stbtt_fontinfo * info, int glyph_index,
//                       int *advanceWidth, int *leftSideBearing)
function stbtt_GetGlyphHMetrics(info, glyph_index) {
    var numOfLongHorMetrics = ttUSHORT(info.data, info.hhea + 34);
    if (glyph_index < numOfLongHorMetrics) {
		return {
				advanceWidth:   ttSHORT(info.data, info.hmtx + 4 * glyph_index),
				leftSideBearing:ttSHORT(info.data, info.hmtx + 4 * glyph_index + 2)
			};
    } else {
		return {
				advanceWidth:   ttSHORT(info.data, info.hmtx + 4 * (numOfLongHorMetrics - 1)),
				leftSideBearing:ttSHORT(info.data, info.hmtx + 4 * numOfLongHorMetrics +
											2 * (glyph_index - numOfLongHorMetrics))
			};
    }
}

//extern void stbtt_GetCodepointHMetrics(const stbtt_fontinfo * info, int codepoint,
//                           int *advanceWidth, int *leftSideBearing)
function stbtt_GetCodepointHMetrics(info, codepoint) {
     return stbtt_GetGlyphHMetrics(info, stbtt_FindGlyphIndex(info, codepoint));
}

//extern void stbtt_GetFontVMetrics(const stbtt_fontinfo * info, int *ascent, int *descent, int *lineGap)
function stbtt_GetFontVMetrics(info) {
	return {
        ascent:	ttSHORT(info.data, info.hhea + 4),
        descent:ttSHORT(info.data, info.hhea + 6),
        linegap:ttSHORT(info.data, info.hhea + 8),
	};
}

//extern void stbtt_GetGlyphBitmapBoxSubpixel(const stbtt_fontinfo * font, int glyph,
//                              float scale_x, float scale_y, float shift_x, float shift_y,
//								int *ix0, int *iy0, int *ix1, int *iy1)
function stbtt_GetGlyphBitmapBoxSubpixel(font, glyph, scale_x, scale_y, shift_x, shift_y) {
    var tmp = {};
    if (!stbtt_GetGlyphBox(font, glyph, tmp)) {
		return { x0:0, y0:0, x1:0, y1:0 };
    }
	return {
			x0:floor(tmp.x0 * scale_x + shift_x),
			y0:floor(-tmp.y1 * scale_y + shift_y),
			x1:ceil(tmp.x1 * scale_x + shift_x),
			y1:ceil(-tmp.y0 * scale_y + shift_y),
		};
}

//extern void stbtt_GetCodepointBitmapBoxSubpixel(const stbtt_fontinfo * font,
//                                    int codepoint, float scale_x, float scale_y, float shift_x,
//                                    float shift_y, int *ix0, int *iy0, int *ix1, int *iy1)
function stbtt_GetCodepointBitmapBoxSubpixel(font, codepoint, scale_x, scale_y, shift_x, shift_y) {
    return stbtt_GetGlyphBitmapBoxSubpixel(font, stbtt_FindGlyphIndex(font, codepoint),
											scale_x, scale_y, shift_x, shift_y);
}

//extern void stbtt_GetCodepointBitmapBox(const stbtt_fontinfo * font, int codepoint,	float scale_x, float scale_y,
//										int *ix0, int *iy0, int *ix1, int *iy1)
function stbtt_GetCodepointBitmapBox(font, codepoint, scale_x, scale_y) {
    return stbtt_GetCodepointBitmapBoxSubpixel(font, codepoint, scale_x, scale_y, 0, 0);
}

//static stbtt__active_edge *stbtt__new_active(stbtt__hheap * hh, stbtt__edge * e, int off_x, float start_point, void *userdata)
function stbtt__new_active(e, off_x, start_point) {
    var dxdy = (e.x1 - e.x0) / (e.y1 - e.y0);
	return {
		fdx:dxdy,
		fdy:dxdy != 0.0 ? (1.0 / dxdy) : 0.0,
		fx:(e.x0 + dxdy * (start_point - e.y0)) - (off_x|0),
		direction:e.invert ? 1.0 : -1.0,
		sy:e.y0,
		ey:e.y1,
		next:0,
    };
}

//static void stbtt__handle_clipped_edge(float *scanline, int x, stbtt__active_edge * e,
//                           float x0, float y0, float x1, float y1)
function stbtt__handle_clipped_edge(scanline, x, e, x0, y0, x1, y1) {
	x = x|0;
    if (y0 == y1) {
        return;
    }
    if (y0 > e.ey) {
        return;
    }
    if (y1 < e.sy) {
        return;
    }
    if (y0 < e.sy) {
        x0 += (x1 - x0) * (e.sy - y0) / (y1 - y0);
        y0 = e.sy;
    }
    if (y1 > e.ey) {
        x1 += (x1 - x0) * (e.ey - y1) / (y1 - y0);
        y1 = e.ey;
    }

    if (x0 <= x && x1 <= x) {
        scanline[x] += e.direction * (y1 - y0);
    } else if (x0 >= x + 1 && x1 >= x + 1) {

    } else {
        scanline[x] += e.direction * (y1 - y0) * (1 - ((x0 - x) + (x1 - x)) / 2);
    }
}

//static void stbtt__fill_active_edges_new(float *scanline, float *scanline_fill, int len,
//                             stbtt__active_edge * e, float y_top)
// The C implementation passed scanline_fill as a +1 pointer on the call, and then -1 in
// places in this function.  That doesn't work with array-views, so we reverse the handling.
function stbtt__fill_active_edges_new(scanline, scanline_fill, len, e, y_top) {
    var y_bottom = y_top + 1;
    while (e) {
        if (e.fdx == 0) {
            var x0 = e.fx;
            if (x0 < len) {
                if (x0 >= 0) {
                    stbtt__handle_clipped_edge(scanline, x0, e, x0, y_top, x0, y_bottom);
                    stbtt__handle_clipped_edge(scanline_fill, x0+1, e, x0, y_top, x0, y_bottom);
                } else {
                    stbtt__handle_clipped_edge(scanline_fill, 0, e, x0, y_top, x0, y_bottom);
                }
            }
        } else {
            var x0 = e.fx,
				dx = e.fdx,
				xb = x0 + dx,
				x_top, x_bottom,
				sy0, sy1,
				dy = e.fdy;

            if (e.sy > y_top) {
                x_top = x0 + dx * (e.sy - y_top);
                sy0 = e.sy;
            } else {
                x_top = x0;
                sy0 = y_top;
            }
            if (e.ey < y_bottom) {
                x_bottom = x0 + dx * (e.ey - y_top);
                sy1 = e.ey;
            } else {
                x_bottom = xb;
                sy1 = y_bottom;
            }

            if (x_top >= 0 && x_bottom >= 0 && x_top < len && x_bottom < len) {
                if ((x_top|0) == (x_bottom|0)) {
                    var height = sy1 - sy0,
						x = x_top|0;
                    scanline[x] += e.direction * (1 - ((x_top - x) + (x_bottom - x)) / 2) * height;
                    scanline_fill[x+1] += e.direction * height;
                } else {
                    var t, x, x1, x2, y_crossing, step, sign, area;
                    if (x_top > x_bottom) {
                        sy0 = y_bottom - (sy0 - y_top);
                        sy1 = y_bottom - (sy1 - y_top);
                        t = sy0, sy0 = sy1, sy1 = t;
                        t = x_bottom, x_bottom = x_top, x_top = t;
                        dx = -dx;
                        dy = -dy;
                        t = x0, x0 = xb, xb = t;
                    }

                    x1 = x_top|0;
                    x2 = x_bottom|0;
                    y_crossing = (x1 + 1 - x0) * dy + y_top;
                    sign = e.direction;
                    area = sign * (y_crossing - sy0);

                    scanline[x1] += area * (1 - ((x_top - x1) + (x1 + 1 - x1)) / 2);

                    step = sign * dy;
                    for (x = x1 + 1; x < x2; ++x) {
                        scanline[x] += area + step / 2;
                        area += step;
                    }
                    y_crossing += dy * (x2 - (x1 + 1));

                    scanline[x2] += area + sign * (1 - ((x2 - x2) + (x_bottom - x2)) / 2) *
												(sy1 - y_crossing);
                    scanline_fill[x2+1] += sign * (sy1 - sy0);
                }
            } else {
                for (var x = 0; x < len; ++x) {
                    var y0 = y_top,
						x1 = x,
						x2 = x + 1,
						x3 = xb,
						y3 = y_bottom,
						y1 = (x - x0) / dx + y_top,
						y2 = (x + 1 - x0) / dx + y_top;

                    if (x0 < x1 && x3 > x2) {
                        stbtt__handle_clipped_edge(scanline, x, e, x0, y0, x1, y1);
                        stbtt__handle_clipped_edge(scanline, x, e, x1, y1, x2, y2);
                        stbtt__handle_clipped_edge(scanline, x, e, x2, y2, x3, y3);
                    } else if (x3 < x1 && x0 > x2) {
                        stbtt__handle_clipped_edge(scanline, x, e, x0, y0, x2, y2);
                        stbtt__handle_clipped_edge(scanline, x, e, x2, y2, x1, y1);
                        stbtt__handle_clipped_edge(scanline, x, e, x1, y1, x3, y3);
                    } else if (x0 < x1 && x3 > x1) {
                        stbtt__handle_clipped_edge(scanline, x, e, x0, y0, x1, y1);
                        stbtt__handle_clipped_edge(scanline, x, e, x1, y1, x3, y3);
                    } else if (x3 < x1 && x0 > x1) {
                        stbtt__handle_clipped_edge(scanline, x, e, x0, y0, x1, y1);
                        stbtt__handle_clipped_edge(scanline, x, e, x1, y1, x3, y3);
                    } else if (x0 < x2 && x3 > x2) {
                        stbtt__handle_clipped_edge(scanline, x, e, x0, y0, x2, y2);
                        stbtt__handle_clipped_edge(scanline, x, e, x2, y2, x3, y3);
                    } else if (x3 < x2 && x0 > x2) {
                        stbtt__handle_clipped_edge(scanline, x, e, x0, y0, x2, y2);
                        stbtt__handle_clipped_edge(scanline, x, e, x2, y2, x3, y3);
                    } else {
                        stbtt__handle_clipped_edge(scanline, x, e, x0, y0, x3, y3);
                    }
                }
            }
        }
        e = e.next;
    }
}

//static void stbtt__rasterize_sorted_edges(stbtt__bitmap * result, stbtt__edge * e, int n,
//                              int vsubsample, int off_x, int off_y, void *userdata)
function stbtt__rasterize_sorted_edges(result, edges, nedges, vsubsample, off_x, off_y) {
	vsubsample |= 0, off_x |= 0, off_y |= 0;
    var active = null, z;
    var y = off_y, j = 0, i;
    var scanline = new Float32Array(result.w * 2 + 1);
    var scanline2 = scanline.subarray(result.w);
	var eoff = 0;

    edges[nedges].y0 = off_y + result.h + 1;
    while (j < result.h) {
        var scan_y_top = y + 0.0,
			scan_y_bottom = y + 1.0,
			step = active;

		// F'ing IE
		if (scanline.fill) { scanline.fill(0); }
		else { for (var $i = 0, $l = scanline.length; $i < $l; $i++) scanline[$i] = 0; }

        while (step) {
            z = step;
			step = z.next;
            if (z.ey <= scan_y_top) {
                z.direction = 0;
            } else {
			}
        }

        while (edges[eoff].y0 <= scan_y_bottom) {
            if (edges[eoff].y0 != edges[eoff].y1) {
                z = stbtt__new_active(edges[eoff], off_x, scan_y_top);
				z.next = active;
				active = z;
            }
            ++eoff;
        }

        if (active) {
			// C implementation passed scanline2+1.  See function for details.
            stbtt__fill_active_edges_new(scanline, scanline2, result.w, active, scan_y_top);
		}
		for (var i = 0, sum = 0; i < result.w; ++i) {
			var k, m;
			sum += scanline2[i];
			k = scanline[i] + sum;
			k = abs(k) * 255 + 0.5;
			m = k>>>0;
			if (m > 255) {
				m = 255;
			}
			result.pixels[j * result.stride + i] = m;
        }

        step = active;
        while (step) {
            z = step;
            z.fx += z.fdx;
            step = z.next;
        }
        ++y;
        ++j;
    }
}

//static void stbtt__sort_edges_ins_sort(stbtt__edge * p, int n)
function stbtt__sort_edges_ins_sort(p, n) {
    for (var i = 1; i < n; ++i) {
        var t = p[i], j = i;
        while (j > 0 && t.y0 < p[j-1].y0) {
             p[j] = p[j - 1];
            --j;
        }
        if (i != j) {
            p[j] = t;
        }
    }
}

//static void stbtt__sort_edges_quicksort(stbtt__edge * p, int n)
// The C implementation messed with the p pointer.  JS uses an offset instead.
function stbtt__sort_edges_quicksort(p, o, n) {
    while (n > 12) {
        var t, c, i, j, z,
			m = n >> 1,
			c01 = p[o].y0 < p[o+m].y0,
			c12 = p[o+m].y0 < p[o+n-1].y0;

        if (c01 != c12) {
            c = p[o].y0 < p[o+n-11].y0;
            z = (c == c12) ? 0 : n - 1;
            t = p[o+z];
            p[o+z] = p[o+m];
            p[o+m] = t;
        }

        t = p[o];
        p[o] = p[o+m];
        p[o+m] = t;

        i = 1;
        j = n - 1;
        for (;;) {
            for ( ; p[o+i].y0 < p[o].y0; ++i) {
            }
            for ( ; p[o].y0 < p[o+j].y0; --j) {
            }
            if (i >= j) {
                break;
            }
            t = p[o+i];
            p[o+i] = p[o+j];
            p[o+j] = t;

            ++i;
            --j;
        }

        if (j < n - i) {
            stbtt__sort_edges_quicksort(p, o, j);
            o += i;
            n -= i;
        } else {
            stbtt__sort_edges_quicksort(p, o + i, n - i);
            n = j;
        }
    }
}

//static void stbtt__sort_edges(stbtt__edge * p, int n)
function stbtt__sort_edges(p, n) {
    stbtt__sort_edges_quicksort(p, 0, n);
    stbtt__sort_edges_ins_sort(p, n);
}

//static void stbtt__rasterize(stbtt__bitmap * result, stbtt__point * pts, int *wcount,
//                 int windings, float scale_x, float scale_y, float shift_x,
//                 float shift_y, int off_x, int off_y, int invert,
//                 void *userdata)
function stbtt__rasterize(result, pts, wcount, scale_x, scale_y, shift_x, shift_y, off_x, off_y, invert) {
    var y_scale_inv = invert ? -scale_y : scale_y,
		e, n, i, j, k, m,
		vsubsample = 1;

    n = 0;
    for (i = 0; i < wcount.length; ++i) {
        n += wcount[i];
    }

    e = oalloc(n + 1);
    n = 0;
    m = 0;
    for (i = 0; i < wcount.length; ++i) {
        var p = m;
        m += wcount[i];
        j = wcount[i] - 1;
        for (k = 0; k < wcount[i]; j = k++) {
            var a = k, b = j;
            if (pts[p+j].y == pts[p+k].y) {
                continue;
            }

            e[n].invert = 0;
            if (invert ? pts[p+j].y > pts[p+k].y : pts[p+j].y < pts[p+k].y) {
                e[n].invert = 1;
                a = j, b = k;
            }
            e[n].x0 = pts[p+a].x * scale_x + shift_x;
            e[n].y0 = (pts[p+a].y * y_scale_inv + shift_y) * vsubsample;
            e[n].x1 = pts[p+b].x * scale_x + shift_x;
            e[n].y1 = (pts[p+b].y * y_scale_inv + shift_y) * vsubsample;
            ++n;
        }
    }

    stbtt__sort_edges(e, n);
    stbtt__rasterize_sorted_edges(result, e, n, vsubsample, off_x, off_y);
 }

//static int stbtt__tesselate_curve(stbtt__point * points, int *num_points, float x0,
//                       float y0, float x1, float y1, float x2, float y2,
//                       float objspace_flatness_squared, int n)
function stbtt__tesselate_curve(points, x0, y0, x1, y1, x2, y2, objspace_flatness_squared, n) {
    var mx = (x0 + 2 * x1 + x2) / 4,
		my = (y0 + 2 * y1 + y2) / 4,
		dx = (x0 + x2) / 2 - mx,
		dy = (y0 + y2) / 2 - my;
    if (n > 16) {
        return 1;
    }
    if (dx * dx + dy * dy > objspace_flatness_squared) {
        stbtt__tesselate_curve(points, x0, y0, (x0 + x1) / 2.0, (y0 + y1) / 2.0, mx, my,
                               objspace_flatness_squared, n + 1);
        stbtt__tesselate_curve(points, mx, my, (x1 + x2) / 2.0, (y1 + y2) / 2.0, x2, y2,
                               objspace_flatness_squared, n + 1);
    } else {
		points.push({ x:x2, y:y2 });
    }
    return 1;
}

//static void stbtt__tesselate_cubic(stbtt__point * points, int *num_points, float x0,
//                       float y0, float x1, float y1, float x2, float y2,
//                       float x3, float y3, float objspace_flatness_squared, int n)
function stbtt__tesselate_cubic(points, x0, y0, x1, y1, x2, y2, x3, y3, objspace_flatness_squared, n) {
    var dx0 = x1 - x0,
		dy0 = y1 - y0,
		dx1 = x2 - x1,
		dy1 = y2 - y1,
		dx2 = x3 - x2,
		dy2 = y3 - y2,
		dx = x3 - x0,
		dy = y3 - y0,
		longlen = sqrt(dx0 * dx0 + dy0 * dy0) +
				  sqrt(dx1 * dx1 + dy1 * dy1) +
                  sqrt(dx2 * dx2 + dy2 * dy2),
		shortlen = sqrt(dx * dx + dy * dy),
		flatness_squared = longlen * longlen - shortlen * shortlen;
    if (n > 16) {
        return;
    }

    if (flatness_squared > objspace_flatness_squared) {
        var x01 = (x0 + x1) / 2,
			y01 = (y0 + y1) / 2,
			x12 = (x1 + x2) / 2,
			y12 = (y1 + y2) / 2,
			x23 = (x2 + x3) / 2,
			y23 = (y2 + y3) / 2,
			xa = (x01 + x12) / 2,
			ya = (y01 + y12) / 2,
			xb = (x12 + x23) / 2,
			yb = (y12 + y23) / 2,
			mx = (xa + xb) / 2,
			my = (ya + yb) / 2;

        stbtt__tesselate_cubic(points, x0, y0, x01, y01, xa, ya, mx, my,
								objspace_flatness_squared, n + 1);
        stbtt__tesselate_cubic(points, mx, my, xb, yb, x23, y23, x3, y3,
								objspace_flatness_squared, n + 1);
    } else {
		points.push({ x:x3, y:y3 });
    }
}

//static stbtt__point *stbtt_FlattenCurves(stbtt_vertex * vertices, int num_verts,
//        float objspace_flatness, int **contour_lengths, int *num_contours, void *userdata)
function stbtt_FlattenCurves(vertices, objspace_flatness, contour_lengths) {
    var points = [],
		objspace_flatness_squared = objspace_flatness * objspace_flatness,
		n = -1, start = 0,
		x = 0, y = 0;
	for (var i = 0, nverts = vertices.length; i < nverts; ++i) {
		switch (vertices[i].type) {
		case STBTT_vmove:
			if (n >= 0) {
				contour_lengths[n] = points.length - start;
			}
			++n;
			start = points.length;
			x = vertices[i].x, y = vertices[i].y;
			points.push({ x:x, y:y });
			break;
		case STBTT_vline:
			x = vertices[i].x, y = vertices[i].y;
			points.push({ x:x, y:y });
			break;
		case STBTT_vcurve:
			stbtt__tesselate_curve(points, x, y, vertices[i].cx, vertices[i].cy,
								   vertices[i].x, vertices[i].y, objspace_flatness_squared, 0);
			x = vertices[i].x, y = vertices[i].y;
			break;
		case STBTT_vcubic:
			stbtt__tesselate_cubic(points, x, y, vertices[i].cx, vertices[i].cy,
								   vertices[i].cx1, vertices[i].cy1, vertices[i].x, vertices[i].y,
								   objspace_flatness_squared, 0);
			x = vertices[i].x, y = vertices[i].y;
			break;
		}
	}
	contour_lengths[n] = points.length - start;

	//console.log("--cl(" + (n+1) + '):');
	//for (var i = 0; i <= n; i++) {
	//	console.log(" %d", contour_lengths[i]);
	//}
	//console.log("\n--pts(" + points.length + '):');
	//for (var i = 0; i < points.length; i++) {
	//	var pt = points[i];
	//	console.log(i + ': ' + pt.x  + ',' + pt.y);
	//}

    return points;
}

//extern void stbtt_Rasterize(stbtt__bitmap * result, float flatness_in_pixels,
//                stbtt_vertex * vertices, int num_verts, float scale_x,
//                float scale_y, float shift_x, float shift_y, int x_off,
//                int y_off, int invert, void *userdata)
function stbtt_Rasterize(result, flatness_in_pixels, vertices, scale_x, scale_y, shift_x, shift_y,
						 x_off, y_off, invert) {
	x_off |= 0, y_off |= 0;
    var scale = scale_x > scale_y ? scale_y : scale_x,
		wcount = [],
		windings = stbtt_FlattenCurves(vertices, flatness_in_pixels / scale, wcount);
    if (windings) {
        stbtt__rasterize(result, windings, wcount, scale_x, scale_y,
						 shift_x, shift_y, x_off, y_off, invert);
    }
}

//extern void stbtt_MakeGlyphBitmapSubpixel(const stbtt_fontinfo * info,
//                              unsigned char *output, int out_w, int out_h,
//                              int out_stride, float scale_x, float scale_y,
//                              float shift_x, float shift_y, int glyph)
function stbtt_MakeGlyphBitmapSubpixel(info, buffer, out_w, out_h, out_stride,
									scale_x, scale_y, shift_x, shift_y, glyph) {
    var vertices = stbtt_GetGlyphShape(info, glyph);
    var gbm = {};
    var rect = stbtt_GetGlyphBitmapBoxSubpixel(info, glyph, scale_x, scale_y, shift_x, shift_y);
    gbm.pixels = buffer;
    gbm.w = out_w|0;
    gbm.h = out_h|0;
    gbm.stride = out_stride|0;

    if (gbm.w && gbm.h) {
        stbtt_Rasterize(gbm, 0.35, vertices, scale_x, scale_y, shift_x, shift_y, rect.x0, rect.y0, 1);
	}
}

//extern void stbtt_MakeCodepointBitmapSubpixel(const stbtt_fontinfo * info,
//                                  unsigned char *output, int out_w,
//                                  int out_h, int out_stride, float scale_x,
//                                  float scale_y, float shift_x,
//                                  float shift_y, int codepoint)
function stbtt_MakeCodepointBitmapSubpixel(info, buffer, out_w, out_h, out_stride,
									scale_x, scale_y, shift_x, shift_y, codepoint) {
    stbtt_MakeGlyphBitmapSubpixel(info, buffer, out_w, out_h, out_stride,
                                  scale_x, scale_y, shift_x, shift_y,
                                  stbtt_FindGlyphIndex(info, codepoint));
}

//extern int stbtt_InitFont(stbtt_fontinfo * info, const unsigned char *data, int offset)
function stbtt_InitFont(font, data, offset) {
    return stbtt_InitFont_internal(font, data, offset);
}


function InitFont(data) {
	var font = {};
    if (!stbtt_InitFont_internal(font, data, 0)) {
		return null;
	}

	var vm = stbtt_GetFontVMetrics(font);

	font.ascent = vm.ascent;
	font.descent = vm.descent;
	font.linegap = vm.linegap;

	return font;
}

function GetGlyph(font, codepoint, size_x, size_y) {
	size_y = size_y || size_x;
	var scale_x = size_x / font.ascent;
	var scale_y = size_y / font.ascent;

	var glyph = stbtt_FindGlyphIndex(font, codepoint);
	if (!glyph && codepoint) {
		return null;
	}

    var vertices = stbtt_GetGlyphShape(font, glyph);
	var rect = stbtt_GetGlyphBitmapBoxSubpixel(font, glyph, scale_x, scale_y, 0, 0);
	var width = rect.x1 - rect.x0;
	var height = rect.y1 - rect.y0;
	var pixels = null;

	if (width && height) {
		var gbm = {
			pixels : (pixels = new Uint8Array(width * height)),
			w : width,
			h : height,
			stride : width,
		}
		stbtt_Rasterize(gbm, 0.35, vertices, scale_x, scale_y, 0, 0, rect.x0, rect.y0, 1);
	}

	var hmetrics = stbtt_GetGlyphHMetrics(font, glyph);
	return {
		glyph:glyph, pixels:pixels, width:width, height:height, top:-rect.y0, left:rect.x0,
		advance:floor(hmetrics.advanceWidth * scale_x),
	}
}
function GetPaths(font, codepoint, size_x, size_y) {
	size_y = size_y || size_x;
	var scale_x = size_x / font.ascent;
	var scale_y = size_y / font.ascent;

	var glyph = stbtt_FindGlyphIndex(font, codepoint);
	if (!glyph && codepoint) {
		return null;
	}
    var vertices = stbtt_GetGlyphShape(font, glyph);
	var hmetrics = stbtt_GetGlyphHMetrics(font, glyph);

	// The hmetrics just give us advance.  We need ascent and descent as well.
	var ascent = 0;
	var descent = 0;

	// Convert to SVG notation
	var paths = [];
	if (vertices) {
		for (var i = 0, l = vertices.length; i < l; i++) {
			var v = vertices[i];
			var path;
			if (v.type == STBTT_vmove) {
				path = { type:'M', x:v.x * scale_x, y:v.y * scale_y };
			} else if (v.type == STBTT_vline) {
				path = { type:'L', x:v.x * scale_x, y:v.y * scale_y };
			} else if (v.type == STBTT_vcurve) {
				path = { type:'Q', x:v.x * scale_x, y:v.y * scale_y,
								  cx:v.cx * scale_x, cy:v.cy * scale_y };
			} else if (v.type == STBTT_vcubic) {
				path = { type:'C', x:v.x * scale_x, y:v.y * scale_y,
								 cx1:v.cx * scale_x, cy1:v.cy * scale_y,
								 cx2:v.cx1 * scale_x, cy2:v.cy1 * scale_y };
			} else {
				continue;
			}
			if (path.y > ascent)  ascent  = path.y;
			if (path.y < descent) descent = path.y;
			paths.push(path);
		}
	}

	// Add the glyph metrics to the returned array.
	paths.advance = hmetrics.advanceWidth * scale_x;
	paths.ascent  = ascent;
	paths.descent = descent;
	return paths;
}


// exports
return {
	InitFont:	InitFont,
	GetGlyph:	GetGlyph,
	GetPaths:	GetPaths,
}

})();
function toUint8Array(data) {
    if (typeof data == "string") {
        var binary = /[^A-Za-z0-9+\/=\s]/.test(data);
        var bstr = binary ? data : atob(data),
            len = bstr.length,
            bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = bstr.charCodeAt(i);
        }
        return bytes;
    } else if (data instanceof Uint8Array) {
        return data;
    } else if (data instanceof ArrayBuffer) {
        return new Uint8Array(data);
    }
    throw new ReferenceError("data must be a binary or base64 encoded string or Uint8Array");
}

FontLib.loadFont("OCR-A", 100, 100, "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");
FontLib.loadFont("OCR-B", 96, 100, "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");
export function auspost(opts,cvs) { return _ToCanvas(bwipp_auspost,opts,cvs); };
export function azteccode(opts,cvs) { return _ToCanvas(bwipp_azteccode,opts,cvs); };
export function azteccodecompact(opts,cvs) { return _ToCanvas(bwipp_azteccodecompact,opts,cvs); };
export function aztecrune(opts,cvs) { return _ToCanvas(bwipp_aztecrune,opts,cvs); };
export function bc412(opts,cvs) { return _ToCanvas(bwipp_bc412,opts,cvs); };
export function channelcode(opts,cvs) { return _ToCanvas(bwipp_channelcode,opts,cvs); };
export function codablockf(opts,cvs) { return _ToCanvas(bwipp_codablockf,opts,cvs); };
export function code11(opts,cvs) { return _ToCanvas(bwipp_code11,opts,cvs); };
export function code128(opts,cvs) { return _ToCanvas(bwipp_code128,opts,cvs); };
export function code16k(opts,cvs) { return _ToCanvas(bwipp_code16k,opts,cvs); };
export function code2of5(opts,cvs) { return _ToCanvas(bwipp_code2of5,opts,cvs); };
export function code32(opts,cvs) { return _ToCanvas(bwipp_code32,opts,cvs); };
export function code39(opts,cvs) { return _ToCanvas(bwipp_code39,opts,cvs); };
export function code39ext(opts,cvs) { return _ToCanvas(bwipp_code39ext,opts,cvs); };
export function code49(opts,cvs) { return _ToCanvas(bwipp_code49,opts,cvs); };
export function code93(opts,cvs) { return _ToCanvas(bwipp_code93,opts,cvs); };
export function code93ext(opts,cvs) { return _ToCanvas(bwipp_code93ext,opts,cvs); };
export function codeone(opts,cvs) { return _ToCanvas(bwipp_codeone,opts,cvs); };
export function coop2of5(opts,cvs) { return _ToCanvas(bwipp_coop2of5,opts,cvs); };
export function daft(opts,cvs) { return _ToCanvas(bwipp_daft,opts,cvs); };
export function databarexpanded(opts,cvs) { return _ToCanvas(bwipp_databarexpanded,opts,cvs); };
export function databarexpandedcomposite(opts,cvs) { return _ToCanvas(bwipp_databarexpandedcomposite,opts,cvs); };
export function databarexpandedstacked(opts,cvs) { return _ToCanvas(bwipp_databarexpandedstacked,opts,cvs); };
export function databarexpandedstackedcomposite(opts,cvs) { return _ToCanvas(bwipp_databarexpandedstackedcomposite,opts,cvs); };
export function databarlimited(opts,cvs) { return _ToCanvas(bwipp_databarlimited,opts,cvs); };
export function databarlimitedcomposite(opts,cvs) { return _ToCanvas(bwipp_databarlimitedcomposite,opts,cvs); };
export function databaromni(opts,cvs) { return _ToCanvas(bwipp_databaromni,opts,cvs); };
export function databaromnicomposite(opts,cvs) { return _ToCanvas(bwipp_databaromnicomposite,opts,cvs); };
export function databarstacked(opts,cvs) { return _ToCanvas(bwipp_databarstacked,opts,cvs); };
export function databarstackedcomposite(opts,cvs) { return _ToCanvas(bwipp_databarstackedcomposite,opts,cvs); };
export function databarstackedomni(opts,cvs) { return _ToCanvas(bwipp_databarstackedomni,opts,cvs); };
export function databarstackedomnicomposite(opts,cvs) { return _ToCanvas(bwipp_databarstackedomnicomposite,opts,cvs); };
export function databartruncated(opts,cvs) { return _ToCanvas(bwipp_databartruncated,opts,cvs); };
export function databartruncatedcomposite(opts,cvs) { return _ToCanvas(bwipp_databartruncatedcomposite,opts,cvs); };
export function datalogic2of5(opts,cvs) { return _ToCanvas(bwipp_datalogic2of5,opts,cvs); };
export function datamatrix(opts,cvs) { return _ToCanvas(bwipp_datamatrix,opts,cvs); };
export function datamatrixrectangular(opts,cvs) { return _ToCanvas(bwipp_datamatrixrectangular,opts,cvs); };
export function datamatrixrectangularextension(opts,cvs) { return _ToCanvas(bwipp_datamatrixrectangularextension,opts,cvs); };
export function dotcode(opts,cvs) { return _ToCanvas(bwipp_dotcode,opts,cvs); };
export function ean13(opts,cvs) { return _ToCanvas(bwipp_ean13,opts,cvs); };
export function ean13composite(opts,cvs) { return _ToCanvas(bwipp_ean13composite,opts,cvs); };
export function ean14(opts,cvs) { return _ToCanvas(bwipp_ean14,opts,cvs); };
export function ean2(opts,cvs) { return _ToCanvas(bwipp_ean2,opts,cvs); };
export function ean5(opts,cvs) { return _ToCanvas(bwipp_ean5,opts,cvs); };
export function ean8(opts,cvs) { return _ToCanvas(bwipp_ean8,opts,cvs); };
export function ean8composite(opts,cvs) { return _ToCanvas(bwipp_ean8composite,opts,cvs); };
export function flattermarken(opts,cvs) { return _ToCanvas(bwipp_flattermarken,opts,cvs); };
export function gs1_128(opts,cvs) { return _ToCanvas(bwipp_gs1_128,opts,cvs); };
export function gs1_128composite(opts,cvs) { return _ToCanvas(bwipp_gs1_128composite,opts,cvs); };
export function gs1_cc(opts,cvs) { return _ToCanvas(bwipp_gs1_cc,opts,cvs); };
export function gs1datamatrix(opts,cvs) { return _ToCanvas(bwipp_gs1datamatrix,opts,cvs); };
export function gs1datamatrixrectangular(opts,cvs) { return _ToCanvas(bwipp_gs1datamatrixrectangular,opts,cvs); };
export function gs1dldatamatrix(opts,cvs) { return _ToCanvas(bwipp_gs1dldatamatrix,opts,cvs); };
export function gs1dlqrcode(opts,cvs) { return _ToCanvas(bwipp_gs1dlqrcode,opts,cvs); };
export function gs1dotcode(opts,cvs) { return _ToCanvas(bwipp_gs1dotcode,opts,cvs); };
export function gs1northamericancoupon(opts,cvs) { return _ToCanvas(bwipp_gs1northamericancoupon,opts,cvs); };
export function gs1qrcode(opts,cvs) { return _ToCanvas(bwipp_gs1qrcode,opts,cvs); };
export function hanxin(opts,cvs) { return _ToCanvas(bwipp_hanxin,opts,cvs); };
export function hibcazteccode(opts,cvs) { return _ToCanvas(bwipp_hibcazteccode,opts,cvs); };
export function hibccodablockf(opts,cvs) { return _ToCanvas(bwipp_hibccodablockf,opts,cvs); };
export function hibccode128(opts,cvs) { return _ToCanvas(bwipp_hibccode128,opts,cvs); };
export function hibccode39(opts,cvs) { return _ToCanvas(bwipp_hibccode39,opts,cvs); };
export function hibcdatamatrix(opts,cvs) { return _ToCanvas(bwipp_hibcdatamatrix,opts,cvs); };
export function hibcdatamatrixrectangular(opts,cvs) { return _ToCanvas(bwipp_hibcdatamatrixrectangular,opts,cvs); };
export function hibcmicropdf417(opts,cvs) { return _ToCanvas(bwipp_hibcmicropdf417,opts,cvs); };
export function hibcpdf417(opts,cvs) { return _ToCanvas(bwipp_hibcpdf417,opts,cvs); };
export function hibcqrcode(opts,cvs) { return _ToCanvas(bwipp_hibcqrcode,opts,cvs); };
export function iata2of5(opts,cvs) { return _ToCanvas(bwipp_iata2of5,opts,cvs); };
export function identcode(opts,cvs) { return _ToCanvas(bwipp_identcode,opts,cvs); };
export function industrial2of5(opts,cvs) { return _ToCanvas(bwipp_industrial2of5,opts,cvs); };
export function interleaved2of5(opts,cvs) { return _ToCanvas(bwipp_interleaved2of5,opts,cvs); };
export function isbn(opts,cvs) { return _ToCanvas(bwipp_isbn,opts,cvs); };
export function ismn(opts,cvs) { return _ToCanvas(bwipp_ismn,opts,cvs); };
export function issn(opts,cvs) { return _ToCanvas(bwipp_issn,opts,cvs); };
export function itf14(opts,cvs) { return _ToCanvas(bwipp_itf14,opts,cvs); };
export function jabcode(opts,cvs) { return _ToCanvas(bwipp_jabcode,opts,cvs); };
export function japanpost(opts,cvs) { return _ToCanvas(bwipp_japanpost,opts,cvs); };
export function kix(opts,cvs) { return _ToCanvas(bwipp_kix,opts,cvs); };
export function leitcode(opts,cvs) { return _ToCanvas(bwipp_leitcode,opts,cvs); };
export function mailmark(opts,cvs) { return _ToCanvas(bwipp_mailmark,opts,cvs); };
export function mands(opts,cvs) { return _ToCanvas(bwipp_mands,opts,cvs); };
export function matrix2of5(opts,cvs) { return _ToCanvas(bwipp_matrix2of5,opts,cvs); };
export function maxicode(opts,cvs) { return _ToCanvas(bwipp_maxicode,opts,cvs); };
export function micropdf417(opts,cvs) { return _ToCanvas(bwipp_micropdf417,opts,cvs); };
export function microqrcode(opts,cvs) { return _ToCanvas(bwipp_microqrcode,opts,cvs); };
export function msi(opts,cvs) { return _ToCanvas(bwipp_msi,opts,cvs); };
export function onecode(opts,cvs) { return _ToCanvas(bwipp_onecode,opts,cvs); };
export function pdf417(opts,cvs) { return _ToCanvas(bwipp_pdf417,opts,cvs); };
export function pdf417compact(opts,cvs) { return _ToCanvas(bwipp_pdf417compact,opts,cvs); };
export function pharmacode(opts,cvs) { return _ToCanvas(bwipp_pharmacode,opts,cvs); };
export function pharmacode2(opts,cvs) { return _ToCanvas(bwipp_pharmacode2,opts,cvs); };
export function planet(opts,cvs) { return _ToCanvas(bwipp_planet,opts,cvs); };
export function plessey(opts,cvs) { return _ToCanvas(bwipp_plessey,opts,cvs); };
export function posicode(opts,cvs) { return _ToCanvas(bwipp_posicode,opts,cvs); };
export function postnet(opts,cvs) { return _ToCanvas(bwipp_postnet,opts,cvs); };
export function pzn(opts,cvs) { return _ToCanvas(bwipp_pzn,opts,cvs); };
export function qrcode(opts,cvs) { return _ToCanvas(bwipp_qrcode,opts,cvs); };
export function rationalizedCodabar(opts,cvs) { return _ToCanvas(bwipp_rationalizedCodabar,opts,cvs); };
export function raw(opts,cvs) { return _ToCanvas(bwipp_raw,opts,cvs); };
export function rectangularmicroqrcode(opts,cvs) { return _ToCanvas(bwipp_rectangularmicroqrcode,opts,cvs); };
export function royalmail(opts,cvs) { return _ToCanvas(bwipp_royalmail,opts,cvs); };
export function sscc18(opts,cvs) { return _ToCanvas(bwipp_sscc18,opts,cvs); };
export function swissqrcode(opts,cvs) { return _ToCanvas(bwipp_swissqrcode,opts,cvs); };
export function symbol(opts,cvs) { return _ToCanvas(bwipp_symbol,opts,cvs); };
export function telepen(opts,cvs) { return _ToCanvas(bwipp_telepen,opts,cvs); };
export function telepennumeric(opts,cvs) { return _ToCanvas(bwipp_telepennumeric,opts,cvs); };
export function ultracode(opts,cvs) { return _ToCanvas(bwipp_ultracode,opts,cvs); };
export function upca(opts,cvs) { return _ToCanvas(bwipp_upca,opts,cvs); };
export function upcacomposite(opts,cvs) { return _ToCanvas(bwipp_upcacomposite,opts,cvs); };
export function upce(opts,cvs) { return _ToCanvas(bwipp_upce,opts,cvs); };
export function upcecomposite(opts,cvs) { return _ToCanvas(bwipp_upcecomposite,opts,cvs); };
export default {
    // The public interface
    toCanvas : ToCanvas, render : Render, raw : ToRaw,
    fixupOptions : FixupOptions,
    loadFont : FontLib.loadFont,
    BWIPJS_VERSION : '3.4.3',
    BWIPP_VERSION : BWIPP_VERSION,
    // Internals
    BWIPJS, STBTT, FontLib, DrawingBuiltin, DrawingCanvas,
};
