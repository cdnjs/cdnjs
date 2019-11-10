/* drawingboard.js v0.4.4 - https://github.com/Leimi/drawingboard.js
* Copyright (c) 2014 Emmanuel Pelletier
* Licensed MIT */
window.DrawingBoard = typeof DrawingBoard !== "undefined" ? DrawingBoard : {};


DrawingBoard.Utils = {};

/*!
* Tim (lite)
*   github.com/premasagar/tim
*//*
	A tiny, secure JavaScript micro-templating script.
*/
DrawingBoard.Utils.tpl = (function(){
	"use strict";

	var start   = "{{",
		end     = "}}",
		path    = "[a-z0-9_][\\.a-z0-9_]*", // e.g. config.person.name
		pattern = new RegExp(start + "\\s*("+ path +")\\s*" + end, "gi"),
		undef;

	return function(template, data){
		// Merge data into the template string
		return template.replace(pattern, function(tag, token){
			var path = token.split("."),
				len = path.length,
				lookup = data,
				i = 0;

			for (; i < len; i++){
				lookup = lookup[path[i]];

				// Property not found
				if (lookup === undef){
					throw "tim: '" + path[i] + "' not found in " + tag;
				}

				// Return the required value
				if (i === len - 1){
					return lookup;
				}
			}
		});
	};
}());

/**
 * https://github.com/jeromeetienne/microevent.js
 * MicroEvent - to make any js object an event emitter (server or browser)
 *
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/
DrawingBoard.Utils.MicroEvent = function(){};

DrawingBoard.Utils.MicroEvent.prototype = {
	bind : function(event, fct){
		this._events = this._events || {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
	},
	unbind : function(event, fct){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	},
	trigger : function(event /* , args... */){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		for(var i = 0; i < this._events[event].length; i++){
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}
};

//I know.
DrawingBoard.Utils._boxBorderSize = function($el, withPadding, withMargin, direction) {
	withPadding = !!withPadding || true;
	withMargin = !!withMargin || false;
	var width = 0,
		props;
	if (direction == "width") {
		props = ['border-left-width', 'border-right-width'];
		if (withPadding) props.push('padding-left', 'padding-right');
		if (withMargin) props.push('margin-left', 'margin-right');
	} else {
		props = ['border-top-width', 'border-bottom-width'];
		if (withPadding) props.push('padding-top', 'padding-bottom');
		if (withMargin) props.push('margin-top', 'margin-bottom');
	}
	for (var i = props.length - 1; i >= 0; i--)
		width += parseInt($el.css(props[i]).replace('px', ''), 10);
	return width;
};

DrawingBoard.Utils.boxBorderWidth = function($el, withPadding, withMargin) {
	return DrawingBoard.Utils._boxBorderSize($el, withPadding, withMargin, 'width');
};

DrawingBoard.Utils.boxBorderHeight = function($el, withPadding, withMargin) {
	return DrawingBoard.Utils._boxBorderSize($el, withPadding, withMargin, 'height');
};

DrawingBoard.Utils.isColor = function(string) {
	if (!string || !string.length) return false;
	return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i).test(string) || $.inArray(string.substring(0, 3), ['rgb', 'hsl']) !== -1;
};

/**
 * Packs an RGB color into a single integer.
 */
DrawingBoard.Utils.RGBToInt = function(r, g, b) {
	var c = 0;
	c |= (r & 255) << 16;
	c |= (g & 255) << 8;
	c |= (b & 255);
	return c;
};

/**
 * Returns informations on the pixel located at (x,y).
 */
DrawingBoard.Utils.pixelAt = function(image, x, y) {
	var i = (y * image.width + x) * 4;
	var c = DrawingBoard.Utils.RGBToInt(
		image.data[i],
		image.data[i + 1],
		image.data[i + 2]
	);

	return [
		i, // INDEX
		x, // X
		y, // Y
		c  // COLOR
	];
};

/**
 * Compares two colors with the given tolerance (between 0 and 255).
 */
DrawingBoard.Utils.compareColors = function(a, b, tolerance) {
	if (tolerance === 0) {
		return (a === b);
	}

	var ra = (a >> 16) & 255, rb = (b >> 16) & 255,
		ga = (a >> 8) & 255, gb = (b >> 8) & 255,
		ba = a & 255, bb = b & 255;

	return (Math.abs(ra - rb) <= tolerance)
		&& (Math.abs(ga - gb) <= tolerance)
		&& (Math.abs(ba - bb) <= tolerance);
};

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
}());

window.DrawingBoard = typeof DrawingBoard !== "undefined" ? DrawingBoard : {};

/**
 * pass the id of the html element to put the drawing board into
 * and some options : {
 *	controls: array of controls to initialize with the drawingboard. 'Colors', 'Size', and 'Navigation' by default
 *		instead of simple strings, you can pass an object to define a control opts
 *		ie ['Color', { Navigation: { reset: false }}]
 *	controlsPosition: "top left" by default. Define where to put the controls: at the "top" or "bottom" of the canvas, aligned to "left"/"right"/"center"
 *	background: background of the drawing board. Give a hex color or an image url "#ffffff" (white) by default
 *	color: pencil color ("#000000" by default)
 *	size: pencil size (3 by default)
 *	webStorage: 'session', 'local' or false ('session' by default). store the current drawing in session or local storage and restore it when you come back
 *	droppable: true or false (false by default). If true, dropping an image on the canvas will include it and allow you to draw on it,
 *	errorMessage: html string to put in the board's element on browsers that don't support canvas.
 * }
 */
DrawingBoard.Board = function(id, opts) {
	this.opts = this.mergeOptions(opts);

	this.ev = new DrawingBoard.Utils.MicroEvent();

	this.id = id;
	this.$el = $(document.getElementById(id));
	if (!this.$el.length)
		return false;

	var tpl = '<div class="drawing-board-canvas-wrapper"></canvas><canvas class="drawing-board-canvas"></canvas><div class="drawing-board-cursor drawing-board-utils-hidden"></div></div>';
	if (this.opts.controlsPosition.indexOf("bottom") > -1) tpl += '<div class="drawing-board-controls"></div>';
	else tpl = '<div class="drawing-board-controls"></div>' + tpl;

	this.$el.addClass('drawing-board').append(tpl);
	this.dom = {
		$canvasWrapper: this.$el.find('.drawing-board-canvas-wrapper'),
		$canvas: this.$el.find('.drawing-board-canvas'),
		$cursor: this.$el.find('.drawing-board-cursor'),
		$controls: this.$el.find('.drawing-board-controls')
	};

	$.each(['left', 'right', 'center'], $.proxy(function(n, val) {
		if (this.opts.controlsPosition.indexOf(val) > -1) {
			this.dom.$controls.attr('data-align', val);
			return false;
		}
	}, this));

	this.canvas = this.dom.$canvas.get(0);
	this.ctx = this.canvas && this.canvas.getContext && this.canvas.getContext('2d') ? this.canvas.getContext('2d') : null;
	this.color = this.opts.color;

	if (!this.ctx) {
		if (this.opts.errorMessage)
			this.$el.html(this.opts.errorMessage);
		return false;
	}

	this.storage = this._getStorage();

	this.initHistory();
	//init default board values before controls are added (mostly pencil color and size)
	this.reset({ webStorage: false, history: false, background: false });
	//init controls (they will need the default board values to work like pencil color and size)
	this.initControls();
	//set board's size after the controls div is added
	this.resize();
	//reset the board to take all resized space
	this.reset({ webStorage: false, history: true, background: true });
	this.restoreWebStorage();
	this.initDropEvents();
	this.initDrawEvents();
};



DrawingBoard.Board.defaultOpts = {
	controls: ['Color', 'DrawingMode', 'Size', 'Navigation'],
	controlsPosition: "top left",
	color: "#000000",
	size: 1,
	background: "#fff",
	eraserColor: "background",
	fillTolerance: 100,
	webStorage: 'session',
	droppable: false,
	enlargeYourContainer: false,
	errorMessage: "<p>It seems you use an obsolete browser. <a href=\"http://browsehappy.com/\" target=\"_blank\">Update it</a> to start drawing.</p>"
};



DrawingBoard.Board.prototype = {

	mergeOptions: function(opts) {
		opts = $.extend({}, DrawingBoard.Board.defaultOpts, opts);
		if (!opts.background && opts.eraserColor === "background")
			opts.eraserColor = "transparent";
		return opts;
	},

	/**
	 * Canvas reset/resize methods: put back the canvas to its default values
	 *
	 * depending on options, can set color, size, background back to default values
	 * and store the reseted canvas in webstorage and history queue
	 *
	 * resize values depend on the `enlargeYourContainer` option
	 */

	reset: function(opts) {
		opts = $.extend({
			color: this.opts.color,
			size: this.opts.size,
			webStorage: true,
			history: true,
			background: false
		}, opts);

		this.setMode('pencil');

		if (opts.background) this.resetBackground(this.opts.background, false);

		if (opts.color) this.setColor(opts.color);
		if (opts.size) this.ctx.lineWidth = opts.size;

		this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";
		// this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.width);

		if (opts.webStorage) this.saveWebStorage();

		if (opts.history) this.saveHistory();

		this.blankCanvas = this.getImg();

		this.ev.trigger('board:reset', opts);
	},

	resetBackground: function(background, historize) {
		background = background || this.opts.background;
		historize = typeof historize !== "undefined" ? historize : true;
		var bgIsColor = DrawingBoard.Utils.isColor(background);
		var prevMode = this.getMode();
		this.setMode('pencil');
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.width);
		if (bgIsColor) {
			this.ctx.fillStyle = background;
			this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		} else if (background)
			this.setImg(background);
		this.setMode(prevMode);
		if (historize) this.saveHistory();
	},

	resize: function() {
		this.dom.$controls.toggleClass('drawing-board-controls-hidden', (!this.controls || !this.controls.length));

		var canvasWidth, canvasHeight;
		var widths = [
			this.$el.width(),
			DrawingBoard.Utils.boxBorderWidth(this.$el),
			DrawingBoard.Utils.boxBorderWidth(this.dom.$canvasWrapper, true, true)
		];
		var heights = [
			this.$el.height(),
			DrawingBoard.Utils.boxBorderHeight(this.$el),
			this.dom.$controls.height(),
			DrawingBoard.Utils.boxBorderHeight(this.dom.$controls, false, true),
			DrawingBoard.Utils.boxBorderHeight(this.dom.$canvasWrapper, true, true)
		];
		var that = this;
		var sum = function(values, multiplier) { //make the sum of all array values
			multiplier = multiplier || 1;
			var res = values[0];
			for (var i = 1; i < values.length; i++) {
				res = res + (values[i]*multiplier);
			}
			return res;
		};
		var sub = function(values) { return sum(values, -1); }; //substract all array values from the first one

		if (this.opts.enlargeYourContainer) {
			canvasWidth = this.$el.width();
			canvasHeight = this.$el.height();

			this.$el.width( sum(widths) );
			this.$el.height( sum(heights) );
		} else {
			canvasWidth = sub(widths);
			canvasHeight = sub(heights);
		}

		this.dom.$canvasWrapper.css('width', canvasWidth + 'px');
		this.dom.$canvasWrapper.css('height', canvasHeight + 'px');

		this.dom.$canvas.css('width', canvasWidth + 'px');
		this.dom.$canvas.css('height', canvasHeight + 'px');

		this.canvas.width = canvasWidth;
		this.canvas.height = canvasHeight;
	},



	/**
	 * Controls:
	 * the drawing board can has various UI elements to control it.
	 * one control is represented by a class in the namespace DrawingBoard.Control
	 * it must have a $el property (jQuery object), representing the html element to append on the drawing board at initialization.
	 *
	 */

	initControls: function() {
		this.controls = [];
		if (!this.opts.controls.length || !DrawingBoard.Control) return false;
		for (var i = 0; i < this.opts.controls.length; i++) {
			var c = null;
			if (typeof this.opts.controls[i] == "string")
				c = new window['DrawingBoard']['Control'][this.opts.controls[i]](this);
			else if (typeof this.opts.controls[i] == "object") {
				for (var controlName in this.opts.controls[i]) break;
				c = new window['DrawingBoard']['Control'][controlName](this, this.opts.controls[i][controlName]);
			}
			if (c) {
				this.addControl(c);
			}
		}
	},

	//add a new control or an existing one at the position you want in the UI
	//to add a totally new control, you can pass a string with the js class as 1st parameter and control options as 2nd ie "addControl('Navigation', { reset: false }"
	//the last parameter (2nd or 3rd depending on the situation) is always the position you want to place the control at
	addControl: function(control, optsOrPos, pos) {
		if (typeof control !== "string" && (typeof control !== "object" || !control instanceof DrawingBoard.Control))
			return false;

		var opts = typeof optsOrPos == "object" ? optsOrPos : {};
		pos = pos ? pos*1 : (typeof optsOrPos == "number" ? optsOrPos : null);

		if (typeof control == "string")
			control = new window['DrawingBoard']['Control'][control](this, opts);

		if (pos)
			this.dom.$controls.children().eq(pos).before(control.$el);
		else
			this.dom.$controls.append(control.$el);

		if (!this.controls)
			this.controls = [];
		this.controls.push(control);
		this.dom.$controls.removeClass('drawing-board-controls-hidden');
	},



	/**
	 * History methods: undo and redo drawed lines
	 */

	initHistory: function() {
		this.history = {
			values: [],
			position: 0
		};
	},

	saveHistory: function () {
		while (this.history.values.length > 30) {
			this.history.values.shift();
			this.history.position--;
		}
		if (this.history.position !== 0 && this.history.position < this.history.values.length) {
			this.history.values = this.history.values.slice(0, this.history.position);
			this.history.position++;
		} else {
			this.history.position = this.history.values.length+1;
		}
		this.history.values.push(this.getImg());
		this.ev.trigger('historyNavigation', this.history.position);
	},

	_goThroughHistory: function(goForth) {
		if ((goForth && this.history.position == this.history.values.length) ||
			(!goForth && this.history.position == 1))
			return;
		var pos = goForth ? this.history.position+1 : this.history.position-1;
		if (this.history.values.length && this.history.values[pos-1] !== undefined) {
			this.history.position = pos;
			this.setImg(this.history.values[pos-1]);
		}
		this.ev.trigger('historyNavigation', pos);
		this.saveWebStorage();
	},

	goBackInHistory: function() {
		this._goThroughHistory(false);
	},

	goForthInHistory: function() {
		this._goThroughHistory(true);
	},



	/**
	 * Image methods: you can directly put an image on the canvas, get it in base64 data url or start a download
	 */

	setImg: function(src) {
		var ctx = this.ctx;
		var img = new Image();
		var oldGCO = ctx.globalCompositeOperation;
		img.onload = function() {
			ctx.globalCompositeOperation = "source-over";
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.width);
			ctx.drawImage(img, 0, 0);
			ctx.globalCompositeOperation = oldGCO;
		};
		img.src = src;
	},

	getImg: function() {
		return this.canvas.toDataURL("image/png");
	},

	downloadImg: function() {
		var img = this.getImg();
		img = img.replace("image/png", "image/octet-stream");
		window.location.href = img;
	},



	/**
	 * WebStorage handling : save and restore to local or session storage
	 */

	saveWebStorage: function() {
		if (window[this.storage]) {
			window[this.storage].setItem('drawing-board-' + this.id, this.getImg());
			this.ev.trigger('board:save' + this.storage.charAt(0).toUpperCase() + this.storage.slice(1), this.getImg());
		}
	},

	restoreWebStorage: function() {
		if (window[this.storage] && window[this.storage].getItem('drawing-board-' + this.id) !== null) {
			this.setImg(window[this.storage].getItem('drawing-board-' + this.id));
			this.ev.trigger('board:restore' + this.storage.charAt(0).toUpperCase() + this.storage.slice(1), window[this.storage].getItem('drawing-board-' + this.id));
		}
	},

	clearWebStorage: function() {
		if (window[this.storage] && window[this.storage].getItem('drawing-board-' + this.id) !== null) {
			window[this.storage].removeItem('drawing-board-' + this.id);
			this.ev.trigger('board:clear' + this.storage.charAt(0).toUpperCase() + this.storage.slice(1));
		}
	},

	_getStorage: function() {
		if (!this.opts.webStorage || !(this.opts.webStorage === 'session' || this.opts.webStorage === 'local')) return false;
		return this.opts.webStorage + 'Storage';
	},



	/**
	 * Drop an image on the canvas to draw on it
	 */

	initDropEvents: function() {
		if (!this.opts.droppable)
			return false;

		this.dom.$canvas.on('dragover dragenter drop', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});

		this.dom.$canvas.on('drop', $.proxy(this._onCanvasDrop, this));
	},

	_onCanvasDrop: function(e) {
		e = e.originalEvent ? e.originalEvent : e;
		var files = e.dataTransfer.files;
		if (!files || !files.length || files[0].type.indexOf('image') == -1 || !window.FileReader)
			return false;
		var fr = new FileReader();
		fr.readAsDataURL(files[0]);
		fr.onload = $.proxy(function(ev) {
			this.setImg(ev.target.result);
			this.ev.trigger('board:imageDropped', ev.target.result);
			this.ev.trigger('board:userAction');
			this.saveHistory();
		}, this);
	},



	/**
	 * set and get current drawing mode
	 *
	 * possible modes are "pencil" (draw normally), "eraser" (draw transparent, like, erase, you know), "filler" (paint can)
	 */

	setMode: function(newMode, silent) {
		silent = silent || false;
		newMode = newMode || 'pencil';

		this.ev.unbind('board:startDrawing', $.proxy(this.fill, this));

		if (this.opts.eraserColor === "transparent")
			this.ctx.globalCompositeOperation = newMode === "eraser" ? "destination-out" : "source-over";
		else {
			if (newMode === "eraser") {
				if (this.opts.eraserColor === "background" && DrawingBoard.Utils.isColor(this.opts.background))
					this.ctx.strokeStyle = this.opts.background;
				else if (DrawingBoard.Utils.isColor(this.opts.eraserColor))
					this.ctx.strokeStyle = this.opts.eraserColor;
			} else if (!this.mode || this.mode === "eraser") {
				this.ctx.strokeStyle = this.color;
			}

			if (newMode === "filler")
				this.ev.bind('board:startDrawing', $.proxy(this.fill, this));
		}
		this.mode = newMode;
		if (!silent)
			this.ev.trigger('board:mode', this.mode);
	},

	getMode: function() {
		return this.mode || "pencil";
	},

	setColor: function(color) {
		var that = this;
		color = color || this.color;
		if (!DrawingBoard.Utils.isColor(color))
			return false;
		this.color = color;
		if (this.opts.eraserColor !== "transparent" && this.mode === "eraser") {
			var setStrokeStyle = function(mode) {
				if (mode !== "eraser")
					that.strokeStyle = that.color;
				that.ev.unbind('board:mode', setStrokeStyle);
			};
			this.ev.bind('board:mode', setStrokeStyle);
		} else
			this.ctx.strokeStyle = this.color;
	},

	/**
	 * Fills an area with the current stroke color.
	 */
	fill: function(e) {
		if (this.getImg() === this.blankCanvas) {
			this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.width);
			this.ctx.fillStyle = this.color;
			this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			return;
		}

		var img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

		// constants identifying pixels components
		var INDEX = 0, X = 1, Y = 2, COLOR = 3;

		// target color components
		var stroke = this.ctx.strokeStyle;
		var r = parseInt(stroke.substr(1, 2), 16);
		var g = parseInt(stroke.substr(3, 2), 16);
		var b = parseInt(stroke.substr(5, 2), 16);

		// starting point
		var start = DrawingBoard.Utils.pixelAt(img, parseInt(e.coords.x, 10), parseInt(e.coords.y, 10));
		var startColor = start[COLOR];
		var tolerance = this.opts.fillTolerance;

		// no need to continue if starting and target colors are the same
		if (DrawingBoard.Utils.compareColors(startColor, DrawingBoard.Utils.RGBToInt(r, g, b), tolerance))
			return;

		// pixels to evaluate
		var queue = [start];

		// loop vars
		var pixel, x, y;
		var maxX = img.width - 1;
		var maxY = img.height - 1;

		while ((pixel = queue.pop())) {
			if (DrawingBoard.Utils.compareColors(pixel[COLOR], startColor, tolerance)) {
				img.data[pixel[INDEX]] = r;
				img.data[pixel[INDEX] + 1] = g;
				img.data[pixel[INDEX] + 2] = b;
				if (pixel[X] > 0) // west
					queue.push(DrawingBoard.Utils.pixelAt(img, pixel[X] - 1, pixel[Y]));
				if (pixel[X] < maxX) // east
					queue.push(DrawingBoard.Utils.pixelAt(img, pixel[X] + 1, pixel[Y]));
				if (pixel[Y] > 0) // north
					queue.push(DrawingBoard.Utils.pixelAt(img, pixel[X], pixel[Y] - 1));
				if (pixel[Y] < maxY) // south
					queue.push(DrawingBoard.Utils.pixelAt(img, pixel[X], pixel[Y] + 1));
			}
		}

		this.ctx.putImageData(img, 0, 0);
	},


	/**
	 * Drawing handling, with mouse or touch
	 */

	initDrawEvents: function() {
		this.isDrawing = false;
		this.isMouseHovering = false;
		this.coords = {};
		this.coords.old = this.coords.current = this.coords.oldMid = { x: 0, y: 0 };

		this.dom.$canvas.on('mousedown touchstart', $.proxy(function(e) {
			this._onInputStart(e, this._getInputCoords(e) );
		}, this));

		this.dom.$canvas.on('mousemove touchmove', $.proxy(function(e) {
			this._onInputMove(e, this._getInputCoords(e) );
		}, this));

		this.dom.$canvas.on('mousemove', $.proxy(function(e) {

		}, this));

		this.dom.$canvas.on('mouseup touchend', $.proxy(function(e) {
			this._onInputStop(e, this._getInputCoords(e) );
		}, this));

		this.dom.$canvas.on('mouseover', $.proxy(function(e) {
			this._onMouseOver(e, this._getInputCoords(e) );
		}, this));

		this.dom.$canvas.on('mouseout', $.proxy(function(e) {
			this._onMouseOut(e, this._getInputCoords(e) );

		}, this));

		$('body').on('mouseup touchend', $.proxy(function(e) {
			this.isDrawing = false;
		}, this));

		if (window.requestAnimationFrame) requestAnimationFrame( $.proxy(this.draw, this) );
	},

	draw: function() {
		//if the pencil size is big (>10), the small crosshair makes a friend: a circle of the size of the pencil
		//todo: have the circle works on every browser - it currently should be added only when CSS pointer-events are supported
		//we assume that if requestAnimationFrame is supported, pointer-events is too, but this is terribad.
		if (window.requestAnimationFrame && this.ctx.lineWidth > 10 && this.isMouseHovering) {
			this.dom.$cursor.css({ width: this.ctx.lineWidth + 'px', height: this.ctx.lineWidth + 'px' });
			var transform = DrawingBoard.Utils.tpl("translateX({{x}}px) translateY({{y}}px)", { x: this.coords.current.x-(this.ctx.lineWidth/2), y: this.coords.current.y-(this.ctx.lineWidth/2) });
			this.dom.$cursor.css({ 'transform': transform, '-webkit-transform': transform, '-ms-transform': transform });
			this.dom.$cursor.removeClass('drawing-board-utils-hidden');
		} else {
			this.dom.$cursor.addClass('drawing-board-utils-hidden');
		}

		if (this.isDrawing) {
			var currentMid = this._getMidInputCoords(this.coords.current);
			this.ctx.beginPath();
			this.ctx.moveTo(currentMid.x, currentMid.y);
			this.ctx.quadraticCurveTo(this.coords.old.x, this.coords.old.y, this.coords.oldMid.x, this.coords.oldMid.y);
			this.ctx.stroke();

			this.coords.old = this.coords.current;
			this.coords.oldMid = currentMid;
		}

		if (window.requestAnimationFrame) requestAnimationFrame( $.proxy(function() { this.draw(); }, this) );
	},

	_onInputStart: function(e, coords) {
		this.coords.current = this.coords.old = coords;
		this.coords.oldMid = this._getMidInputCoords(coords);
		this.isDrawing = true;

		if (!window.requestAnimationFrame) this.draw();

		this.ev.trigger('board:startDrawing', {e: e, coords: coords});
		e.stopPropagation();
		e.preventDefault();
	},

	_onInputMove: function(e, coords) {
		this.coords.current = coords;
		this.ev.trigger('board:drawing', {e: e, coords: coords});

		if (!window.requestAnimationFrame) this.draw();

		e.stopPropagation();
		e.preventDefault();
	},

	_onInputStop: function(e, coords) {
		if (this.isDrawing && (!e.touches || e.touches.length === 0)) {
			this.isDrawing = false;

			this.saveWebStorage();
			this.saveHistory();

			this.ev.trigger('board:stopDrawing', {e: e, coords: coords});
			this.ev.trigger('board:userAction');
			e.stopPropagation();
			e.preventDefault();
		}
	},

	_onMouseOver: function(e, coords) {
		this.isMouseHovering = true;
		this.coords.old = this._getInputCoords(e);
		this.coords.oldMid = this._getMidInputCoords(this.coords.old);

		this.ev.trigger('board:mouseOver', {e: e, coords: coords});
	},

	_onMouseOut: function(e, coords) {
		this.isMouseHovering = false;

		this.ev.trigger('board:mouseOut', {e: e, coords: coords});
	},

	_getInputCoords: function(e) {
		e = e.originalEvent ? e.originalEvent : e;
		var x, y;
		if (e.touches && e.touches.length == 1) {
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;
		} else {
			x = e.pageX;
			y = e.pageY;
		}
		return {
			x: x - this.dom.$canvas.offset().left,
			y: y - this.dom.$canvas.offset().top
		};
	},

	_getMidInputCoords: function(coords) {
		return {
			x: this.coords.old.x + coords.x>>1,
			y: this.coords.old.y + coords.y>>1
		};
	}
};

DrawingBoard.Control = function(drawingBoard, opts) {
	this.board = drawingBoard;
	this.opts = $.extend({}, this.defaults, opts);

	this.$el = $(document.createElement('div')).addClass('drawing-board-control');
	if (this.name)
		this.$el.addClass('drawing-board-control-' + this.name);

	this.board.ev.bind('board:reset', $.proxy(this.onBoardReset, this));

	this.initialize.apply(this, arguments);
	return this;
};

DrawingBoard.Control.prototype = {

	name: '',

	defaults: {},

	initialize: function() {

	},

	addToBoard: function() {
		this.board.addControl(this);
	},

	onBoardReset: function(opts) {

	}

};

//extend directly taken from backbone.js
DrawingBoard.Control.extend = function(protoProps, staticProps) {
	var parent = this;
	var child;
	if (protoProps && protoProps.hasOwnProperty('constructor')) {
		child = protoProps.constructor;
	} else {
		child = function(){ return parent.apply(this, arguments); };
	}
	$.extend(child, parent, staticProps);
	var Surrogate = function(){ this.constructor = child; };
	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate();
	if (protoProps) $.extend(child.prototype, protoProps);
	child.__super__ = parent.prototype;
	return child;
};
DrawingBoard.Control.Color = DrawingBoard.Control.extend({
	name: 'colors',

	initialize: function() {
		this.initTemplate();

		var that = this;
		this.$el.on('click', '.drawing-board-control-colors-picker', function(e) {
			var color = $(this).attr('data-color');
			that.board.setColor(color);
			that.$el.find('.drawing-board-control-colors-current')
				.css('background-color', color)
				.attr('data-color', color);

			that.board.ev.trigger('color:changed', color);
			that.$el.find('.drawing-board-control-colors-rainbows').addClass('drawing-board-utils-hidden');

			e.preventDefault();
		});

		this.$el.on('click', '.drawing-board-control-colors-current', function(e) {
			that.$el.find('.drawing-board-control-colors-rainbows').toggleClass('drawing-board-utils-hidden');
			e.preventDefault();
		});

		$('body').on('click', function(e) {
			var $target = $(e.target);
			var $relatedButton = $target.hasClass('drawing-board-control-colors-current') ? $target : $target.closest('.drawing-board-control-colors-current');
			var $myButton = that.$el.find('.drawing-board-control-colors-current');
			var $popup = that.$el.find('.drawing-board-control-colors-rainbows');
			if ( (!$relatedButton.length || $relatedButton.get(0) !== $myButton.get(0)) && !$popup.hasClass('drawing-board-utils-hidden') )
				$popup.addClass('drawing-board-utils-hidden');
		});
	},

	initTemplate: function() {
		var tpl = '<div class="drawing-board-control-inner">' +
			'<div class="drawing-board-control-colors-current" style="background-color: {{color}}" data-color="{{color}}"></div>' +
			'<div class="drawing-board-control-colors-rainbows">{{rainbows}}</div>' +
			'</div>';
		var oneColorTpl = '<div class="drawing-board-control-colors-picker" data-color="{{color}}" style="background-color: {{color}}"></div>';
		var rainbows = '';
		$.each([0.75, 0.5, 0.25], $.proxy(function(key, val) {
			var i = 0;
			var additionalColor = null;
			rainbows += '<div class="drawing-board-control-colors-rainbow">';
			if (val == 0.25) additionalColor = this._rgba(0, 0, 0, 1);
			if (val == 0.5) additionalColor = this._rgba(150, 150, 150, 1);
			if (val == 0.75) additionalColor = this._rgba(255, 255, 255, 1);
			rainbows += DrawingBoard.Utils.tpl(oneColorTpl, {color: additionalColor.toString() });
			while (i <= 330) {
				rainbows += DrawingBoard.Utils.tpl(oneColorTpl, {color: this._hsl2Rgba(this._hsl(i-60, 1, val)).toString() });
				i+=30;
			}
			rainbows += '</div>';
		}, this));

		this.$el.append( $( DrawingBoard.Utils.tpl(tpl, {color: this.board.color, rainbows: rainbows }) ) );
		this.$el.find('.drawing-board-control-colors-rainbows').addClass('drawing-board-utils-hidden');
	},

	onBoardReset: function(opts) {
		this.board.setColor(this.$el.find('.drawing-board-control-colors-current').attr('data-color'));
	},

	_rgba: function(r, g, b, a) {
		return { r: r, g: g, b: b, a: a, toString: function() { return "rgba(" + r +", " + g + ", " + b + ", " + a + ")"; } };
	},

	_hsl: function(h, s, l) {
		return { h: h, s: s, l: l, toString: function() { return "hsl(" + h +", " + s*100 + "%, " + l*100 + "%)"; } };
	},

	_hex2Rgba: function(hex) {
		var num = parseInt(hex.substring(1), 16);
		return this._rgba(num >> 16, num >> 8 & 255, num & 255, 1);
	},

	//conversion function (modified a bit) taken from http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
	_hsl2Rgba: function(hsl) {
		var h = hsl.h/360, s = hsl.s, l = hsl.l, r, g, b;
		function hue2rgb(p, q, t) {
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}
		if (s === 0) {
			r = g = b = l; // achromatic
		} else {
			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = Math.floor( (hue2rgb(p, q, h + 1/3)) * 255);
			g = Math.floor( (hue2rgb(p, q, h)) * 255);
			b = Math.floor( (hue2rgb(p, q, h - 1/3)) * 255);
		}
		return this._rgba(r, g, b, 1);
	}
});
DrawingBoard.Control.DrawingMode = DrawingBoard.Control.extend({

	name: 'drawingmode',

	defaults: {
		pencil: true,
		eraser: true,
		filler: true
	},

	initialize: function() {

		this.prevMode = this.board.getMode();

		$.each(["pencil", "eraser", "filler"], $.proxy(function(k, value) {
			if (this.opts[value]) {
				this.$el.append('<button class="drawing-board-control-drawingmode-' + value + '-button" data-mode="' + value + '"></button>');
			}
		}, this));

		this.$el.on('click', 'button[data-mode]', $.proxy(function(e) {
			var value = $(e.currentTarget).attr('data-mode');
			var mode = this.board.getMode();
			if (mode !== value) this.prevMode = mode;
			var newMode = mode === value ? this.prevMode : value;
			this.board.setMode( newMode );
			e.preventDefault();
		}, this));

		this.board.ev.bind('board:mode', $.proxy(function(mode) {
			this.toggleButtons(mode);
		}, this));

		this.toggleButtons( this.board.getMode() );
	},

	toggleButtons: function(mode) {
		this.$el.find('button[data-mode]').each(function(k, item) {
			var $item = $(item);
			$item.toggleClass('active', mode === $item.attr('data-mode'));
		});
	}

});

DrawingBoard.Control.Navigation = DrawingBoard.Control.extend({

	name: 'navigation',

	defaults: {
		back: true,
		forward: true,
		reset: true
	},

	initialize: function() {
		var el = '';
		if (this.opts.back) el += '<button class="drawing-board-control-navigation-back">&larr;</button>';
		if (this.opts.forward) el += '<button class="drawing-board-control-navigation-forward">&rarr;</button>';
		if (this.opts.reset) el += '<button class="drawing-board-control-navigation-reset">&times;</button>';
		this.$el.append(el);

		if (this.opts.back) {
			var $back = this.$el.find('.drawing-board-control-navigation-back');
			this.board.ev.bind('historyNavigation', $.proxy(function(pos) {
				if (pos === 1)
					$back.attr('disabled', 'disabled');
				else
					$back.removeAttr('disabled');
			}, this));
			this.$el.on('click', '.drawing-board-control-navigation-back', $.proxy(function(e) {
				this.board.goBackInHistory();
				e.preventDefault();
			}, this));
		}

		if (this.opts.forward) {
			var $forward = this.$el.find('.drawing-board-control-navigation-forward');
			this.board.ev.bind('historyNavigation', $.proxy(function(pos) {
				if (pos === this.board.history.values.length)
					$forward.attr('disabled', 'disabled');
				else
					$forward.removeAttr('disabled');
			}, this));
			this.$el.on('click', '.drawing-board-control-navigation-forward', $.proxy(function(e) {
				this.board.goForthInHistory();
				e.preventDefault();
			}, this));
		}

		if (this.opts.reset) {
			this.$el.on('click', '.drawing-board-control-navigation-reset', $.proxy(function(e) {
				this.board.reset({ background: true });
				e.preventDefault();
			}, this));
		}
	}
});
DrawingBoard.Control.Size = DrawingBoard.Control.extend({

	name: 'size',

	defaults: {
		type: "auto",
		dropdownValues: [1, 3, 6, 10, 20, 30, 40, 50],
		min: 1,
		max: 50
	},

	types: ['dropdown', 'range'],

	initialize: function() {
		if (this.opts.type == "auto")
			this.opts.type = this._iHasRangeInput() ? 'range' : 'dropdown';
		var tpl = $.inArray(this.opts.type, this.types) > -1 ? this['_' + this.opts.type + 'Template']() : false;
		if (!tpl) return false;

		this.val = this.board.opts.size;

		this.$el.append( $( tpl ) );
		this.$el.attr('data-drawing-board-type', this.opts.type);
		this.updateView();

		var that = this;

		if (this.opts.type == "range") {
			this.$el.on('change', '.drawing-board-control-size-range-input', function(e) {
				that.val = $(this).val();
				that.updateView();

				that.board.ev.trigger('size:changed', that.val);

				e.preventDefault();
			});
		}

		if (this.opts.type == "dropdown") {
			this.$el.on('click', '.drawing-board-control-size-dropdown-current', $.proxy(function(e) {
				this.$el.find('.drawing-board-control-size-dropdown').toggleClass('drawing-board-utils-hidden');
			}, this));

			this.$el.on('click', '[data-size]', function(e) {
				that.val = parseInt($(this).attr('data-size'), 0);
				that.updateView();

				that.board.ev.trigger('size:changed', that.val);

				e.preventDefault();
			});
		}
	},

	_rangeTemplate: function() {
		var tpl = '<div class="drawing-board-control-inner" title="{{size}}">' +
			'<input type="range" min="{{min}}" max="{{max}}" value="{{size}}" step="1" class="drawing-board-control-size-range-input">' +
			'<span class="drawing-board-control-size-range-current"></span>' +
			'</div>';
		return DrawingBoard.Utils.tpl(tpl, {
			min: this.opts.min,
			max: this.opts.max,
			size: this.board.opts.size
		});
	},

	_dropdownTemplate: function() {
		var tpl = '<div class="drawing-board-control-inner" title="{{size}}">' +
			'<div class="drawing-board-control-size-dropdown-current"><span></span></div>' +
			'<ul class="drawing-board-control-size-dropdown">';
		$.each(this.opts.dropdownValues, function(i, size) {
			tpl += DrawingBoard.Utils.tpl(
				'<li data-size="{{size}}"><span style="width: {{size}}px; height: {{size}}px; border-radius: {{size}}px;"></span></li>',
				{ size: size }
			);
		});
		tpl += '</ul></div>';
		return tpl;
	},

	onBoardReset: function(opts) {
		this.updateView();
	},

	updateView: function() {
		var val = this.val;
		this.board.ctx.lineWidth = val;

		this.$el.find('.drawing-board-control-size-range-current, .drawing-board-control-size-dropdown-current span').css({
			width: val + 'px',
			height: val + 'px',
			borderRadius: val + 'px',
			marginLeft: -1*val/2 + 'px',
			marginTop: -1*val/2 + 'px'
		});

		this.$el.find('.drawing-board-control-inner').attr('title', val);

		if (this.opts.type == 'dropdown') {
			var closest = null;
			$.each(this.opts.dropdownValues, function(i, size) {
				if (closest === null || Math.abs(size - val) < Math.abs(closest - val))
					closest = size;
			});
			this.$el.find('.drawing-board-control-size-dropdown').addClass('drawing-board-utils-hidden');
		}
	},

	_iHasRangeInput: function() {
		var inputElem  = document.createElement('input'),
			smile = ':)',
			docElement = document.documentElement,
			inputElemType = 'range',
			available;
		inputElem.setAttribute('type', inputElemType);
		available = inputElem.type !== 'text';
		inputElem.value         = smile;
		inputElem.style.cssText = 'position:absolute;visibility:hidden;';
		if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {
			docElement.appendChild(inputElem);
			defaultView = document.defaultView;
			available = defaultView.getComputedStyle &&
				defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
				(inputElem.offsetHeight !== 0);
			docElement.removeChild(inputElem);
		}
		return !!available;
	}
});
DrawingBoard.Control.Download = DrawingBoard.Control.extend({

	name: 'download',

	initialize: function() {
		this.$el.append('<button class="drawing-board-control-download-button"></button>');
		this.$el.on('click', '.drawing-board-control-download-button', $.proxy(function(e) {
			this.board.downloadImg();
			e.preventDefault();
		}, this));
	}

});