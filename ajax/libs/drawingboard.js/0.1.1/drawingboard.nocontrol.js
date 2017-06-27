/* drawingboard.js v0.1.1 - https://github.com/Leimi/drawingboard.js
* Copyright (c) 2013 Emmanuel Pelletier
* Licensed MIT */

window.DrawingBoard = {};
/**
 * pass the id of the html element to put the drawing board into
 * and some options : {
 *	controls: array of controls to initialize with the drawingboard. 'Colors', 'Size', and 'Navigation' by default
 *		instead of simple strings, you can pass an object to define a control opts
 *		ie ['Color', { Navigation: { reset: false }}]
 *	background: background of the drawing board. Give a hex color or an image url "#ffffff" (white) by default
 *	color: pencil color ("#000000" by default)
 *	size: pencil size (3 by default)
 *	localStorage: true or false (false by default). If true, store the current drawing in localstorage and restore it when you come back
 *	droppable: true or false (true by default). If true, dropping an image on the canvas will include it and allow you to draw on it
 * }
 */
DrawingBoard.Board = function(id, opts) {
	var tpl = '<div class="drawing-board-controls"></div><div class="drawing-board-canvas-wrapper"><canvas class="drawing-board-canvas"></canvas><div class="drawing-board-cursor hidden"></div></div>';

	this.opts = $.extend({
		controls: ['Color', 'Size', 'Navigation'],
		background: "#ffffff",
		localStorage: false,
		color: "#000000",
		size: 3,
		droppable: true
	}, opts);

	this.ev = new DrawingBoard.Utils.MicroEvent();

	this.id = id;
	this.$el = $(document.getElementById(id));
	if (!this.$el.length)
		return false;

	this.$el.addClass('drawing-board').append(tpl);
	this.dom = {
		$canvasWrapper: this.$el.find('.drawing-board-canvas-wrapper'),
		$canvas: this.$el.find('.drawing-board-canvas'),
		$cursor: this.$el.find('.drawing-board-cursor'),
		$controls: this.$el.find('.drawing-board-controls')
	};

	this.canvas = this.dom.$canvas.get(0);
	this.ctx = this.canvas.getContext('2d');

	this.initControls();
	this.reset({ localStorage: false });
	this.restoreLocalStorage();
	this.initDropEvents();
	this.initDrawEvents();
};


DrawingBoard.Board.prototype = {

	/**
	 * reset the drawing board and its controls
	 * - recalculates canvas size
	 * - change background based on default one or given one in the opts object
	 * - store the reseted drawing board in localstorage if opts.localStorage is true (it is by default)
	 */
	reset: function(opts) {
		opts = $.extend({
			background: this.opts.background,
			color: this.opts.color,
			size: this.opts.size,
			history: true,
			localStorage: true
		}, opts);

		var bgIsColor = (opts.background.charAt(0) == '#' && (opts.background.length == 7 || opts.background.length == 4 )) ||
				(opts.background.substring(0, 3) == 'rgb');

		//I know.
		var width = this.$el.width() -
			DrawingBoard.Utils.boxBorderWidth(this.$el) -
			DrawingBoard.Utils.boxBorderWidth(this.dom.$canvasWrapper, true, true);
		var height = this.$el.height() -
			DrawingBoard.Utils.boxBorderHeight(this.$el) -
			this.dom.$controls.height() -
			DrawingBoard.Utils.boxBorderHeight(this.dom.$controls, false, true) -
			DrawingBoard.Utils.boxBorderHeight(this.dom.$canvasWrapper, true, true);
		this.dom.$canvasWrapper.css('width', width + 'px');
		this.dom.$canvasWrapper.css('height', height + 'px');
		this.canvas.width = width;
		this.canvas.height = height;

		this.ctx.strokeStyle = opts.color;
		this.ctx.lineWidth = opts.size;
		this.ctx.lineCap = "round";
		this.ctx.lineJoin = "round";
		this.ctx.save();
		if (bgIsColor)
			this.ctx.fillStyle = opts.background;
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		this.ctx.restore();

		if (!bgIsColor)
			this.setImg(this.opts.background);

		if (opts.localStorage) this.saveLocalStorage();

		this.ev.trigger('board:reset', opts);
	},



	/**
	 * Controls:
	 * the drawing board can has various UI elements to control it.
	 * one control is represented by a class in the namespace DrawingBoard.Control
	 * it must have a $el property (jQuery object), representing the html element to append on the drawing board at initialization.
	 * if it has a reset method, it will be called by the reset method of the drawing board
	 *
	 * An example control is given in controls/example.js.
	 */

	initControls: function() {
		this.controls = [];
		if (!this.opts.controls.length) return false;
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
	},



	/**
	 * Image methods: you can directly put an image on the canvas, get it in base64 data url or start a download
	 */

	setImg: function(src) {
		img = new Image();
		img.onload = $.proxy(function() {
			this.ctx.drawImage(img, 0, 0);
		}, this);
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
	 * localStorage handling : save and restore
	 */

	restoreLocalStorage: function() {
		if (this.opts.localStorage && window.localStorage && localStorage.getItem('drawing-board-image-' + this.id) !== null) {
			this.setImg(localStorage.getItem('drawing-board-image-' + this.id));
			this.ev.trigger('board:restoreLocalStorage', localStorage.getItem('drawing-board-image-' + this.id));
		}
	},

	saveLocalStorage: function() {
		if (this.opts.localStorage && window.localStorage) {
			localStorage.setItem('drawing-board-image-' + this.id, this.getImg());
			this.ev.trigger('board:saveLocalStorage', this.getImg());
		}
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
		}, this);
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
		requestAnimationFrame( $.proxy(this.draw, this) );
	},

	draw: function() {
		//if the pencil size is big (>10), the small crosshair makes a friend: a circle of the size of the pencil
		if (this.ctx.lineWidth > 10 && this.isMouseHovering) {
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

		requestAnimationFrame( $.proxy(function() { this.draw(); }, this) );
	},

	_onInputStart: function(e, coords) {
		this.coords.current = this.coords.old = coords;
		this.coords.oldMid = this._getMidInputCoords(coords);
		this.isDrawing = true;

		this.ev.trigger('board:startDrawing', {e: e, coords: coords});
		e.preventDefault();
	},

	_onInputMove: function(e, coords) {
		this.coords.current = coords;

		this.ev.trigger('board:drawing', {e: e, coords: coords});
		e.preventDefault();
	},

	_onInputStop: function(e, coords) {
		if (this.isDrawing && (!e.touches || e.touches.length === 0)) {
			this.isDrawing = false;

			this.saveLocalStorage();

			this.ev.trigger('board:stopDrawing', {e: e, coords: coords});
			this.ev.trigger('board:userAction');
			e.preventDefault();
		}
	},

	_onMouseOver: function(e, coords) {
		this.isMouseHovering = true;
		this.coords.old = this._getInputCoords(e);
		this.coords.oldMid = this._getMidInputCoords(this.coords.old);
		if (e.which !== 1)
			this.isDrawing = false;

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

//included requestAnimationFrame (https://gist.github.com/paulirish/1579671) polyfill since it's really light
//remove it and rebuild the minified files with grunt if you don't need it
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());