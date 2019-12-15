/*! Granim v2.0.0 - https://sarcadass.github.io/granim.js */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function Granim(options) {
	this.getElement(options.element);
	this.x1 = 0;
	this.y1 = 0;
	this.name = options.name || false;
	this.elToSetClassOn = options.elToSetClassOn || 'body';
	this.direction = options.direction || 'diagonal';
	this.customDirection = options.customDirection || {};
	this.validateInput('direction');
	this.isPausedWhenNotInView = options.isPausedWhenNotInView || false;
	this.states = options.states;
	this.stateTransitionSpeed = options.stateTransitionSpeed || 1000;
	this.previousTimeStamp = null;
	this.progress = 0;
	this.isPaused = false;
	this.isCleared = false;
	this.isPausedBecauseNotInView = false;
	this.context = this.canvas.getContext('2d');
	this.channels = {};
	this.channelsIndex = 0;
	this.activeState = options.defaultStateName || 'default-state';
	this.isChangingState = false;
	this.currentColors = [];
	this.currentColorsPos = [];
	this.activetransitionSpeed = null;
	this.eventPolyfill();
	this.scrollDebounceThreshold = options.scrollDebounceThreshold || 300;
	this.scrollDebounceTimeout = null;
	this.isImgLoaded = false;
	this.isCanvasInWindowView = false;
	this.firstScrollInit = true;
	this.animating = false;
	this.gradientLength = this.states[this.activeState].gradients[0].length;
	if (options.image && options.image.source) {
		this.image = {
			source: options.image.source,
			position: options.image.position || ['center', 'center'],
			stretchMode: options.image.stretchMode || false,
			blendingMode: options.image.blendingMode || false
		};
	}
	this.events = {
		start: new CustomEvent('granim:start'),
		end: new CustomEvent('granim:end'),
		gradientChange: function(details) {
			return new CustomEvent('granim:gradientChange', {
				detail: {
					isLooping: details.isLooping,
					colorsFrom: details.colorsFrom,
					colorsTo: details.colorsTo,
					activeState: details.activeState
				},
				bubbles: false,
				cancelable: false
			});
		}
	};
	this.callbacks = {
		onStart: typeof options.onStart === 'function' ? options.onStart : false,
		onGradientChange: typeof options.onGradientChange === 'function' ?
			options.onGradientChange :
			false,
		onEnd: typeof options.onEnd === 'function' ? options.onEnd : false
	};
	this.getDimensions();
	this.canvas.setAttribute('width', this.x1);
	this.canvas.setAttribute('height', this.y1);
	this.setColors();

	if (this.image) {
		this.validateInput('image');
		this.prepareImage();
	}

	this.pauseWhenNotInViewNameSpace = this.pauseWhenNotInView.bind(this);
	this.setSizeAttributesNameSpace = this.setSizeAttributes.bind(this);
	this.onResize();

	if (this.isPausedWhenNotInView) {
		this.onScroll();
		
	} else {
		if (!this.image) {
			this.refreshColorsAndPos();
			this.animation = requestAnimationFrame(this.animateColors.bind(this));
			this.animating = true;
		}
	}

	// Callback and Event
	if (this.callbacks.onStart) this.callbacks.onStart();
	this.canvas.dispatchEvent(this.events.start);
}

Granim.prototype.animateColors = require('./animateColors.js');
Granim.prototype.changeBlendingMode = require('./changeBlendingMode.js');
Granim.prototype.changeDirection = require('./changeDirection.js');
Granim.prototype.changeState = require('./changeState.js');
Granim.prototype.clear = require('./clear.js');
Granim.prototype.convertColorToRgba = require('./convertColorToRgba.js');
Granim.prototype.destroy = require('./destroy.js');
Granim.prototype.eventPolyfill = require('./eventPolyfill.js');
Granim.prototype.getColor = require('./getColor.js');
Granim.prototype.getColorDiff = require('./getColorDiff.js');
Granim.prototype.getColorPos = require('./getColorPos.js');
Granim.prototype.getColorPosDiff = require('./getColorPosDiff.js');
Granim.prototype.getCurrentColors = require('./getCurrentColors.js');
Granim.prototype.getCurrentColorsPos = require('./getCurrentColorsPos.js');
Granim.prototype.getDimensions = require('./getDimensions.js');
Granim.prototype.getElement = require('./getElement.js');
Granim.prototype.getLightness = require('./getLightness.js');
Granim.prototype.makeGradient = require('./makeGradient.js');
Granim.prototype.onResize = require('./onResize.js');
Granim.prototype.onScroll = require('./onScroll.js');
Granim.prototype.pause = require('./pause.js');
Granim.prototype.pauseWhenNotInView = require('./pauseWhenNotInView.js');
Granim.prototype.play = require('./play.js');
Granim.prototype.prepareImage = require('./prepareImage.js');
Granim.prototype.refreshColorsAndPos = require('./refreshColorsAndPos.js');
Granim.prototype.setColors = require('./setColors.js');
Granim.prototype.setDirection = require('./setDirection.js');
Granim.prototype.setSizeAttributes = require('./setSizeAttributes.js');
Granim.prototype.triggerError = require('./triggerError.js');
Granim.prototype.validateInput = require('./validateInput.js');

module.exports = Granim;

},{"./animateColors.js":2,"./changeBlendingMode.js":3,"./changeDirection.js":4,"./changeState.js":5,"./clear.js":6,"./convertColorToRgba.js":7,"./destroy.js":8,"./eventPolyfill.js":9,"./getColor.js":10,"./getColorDiff.js":11,"./getColorPos.js":12,"./getColorPosDiff.js":13,"./getCurrentColors.js":14,"./getCurrentColorsPos.js":15,"./getDimensions.js":16,"./getElement.js":17,"./getLightness.js":18,"./makeGradient.js":19,"./onResize.js":20,"./onScroll.js":21,"./pause.js":22,"./pauseWhenNotInView.js":23,"./play.js":24,"./prepareImage.js":25,"./refreshColorsAndPos.js":26,"./setColors.js":27,"./setDirection.js":28,"./setSizeAttributes.js":29,"./triggerError.js":30,"./validateInput.js":31}],2:[function(require,module,exports){
'use strict';

module.exports = function(timestamp) {
	var wasWindowIdled = timestamp - this.previousTimeStamp > 100;
	var isLoop = this.states[this.activeState].loop !== undefined ? this.states[this.activeState].loop : true;
	var progressPercent, isLooping, nextGradient;

	// If tab was inactive then resumed, reset the previous timestamp
	if (this.previousTimeStamp === null || wasWindowIdled) {
		this.previousTimeStamp = timestamp;
	}

	// Compute progress and save the timestamp
	this.progress = this.progress + (timestamp - this.previousTimeStamp);
	progressPercent = (this.progress / this.activetransitionSpeed * 100).toFixed(2);
	this.previousTimeStamp = timestamp;

	// Set the new gradient colors in a property
	this.refreshColorsAndPos(progressPercent);

	// Continue the animation or prepare for the next one
	if (progressPercent < 100) {
		this.animation = requestAnimationFrame(this.animateColors.bind(this));

	} else {
		// if the current animation index is inferior to the penultimate gradient
		// or to the last gradient with the loop mode activated
		if (this.channelsIndex < this.states[this.activeState].gradients.length - 2 || isLoop) {

			// Set the active transition speed to the active state one after changing state
			if (this.isChangingState) {
				this.activetransitionSpeed = this.states[this.activeState].transitionSpeed || 5000;
				this.isChangingState = false;
			}

			// Resetting properties
			this.previousTimeStamp = null;
			this.progress = 0;
			this.channelsIndex++;
			isLooping = false;

			// If it's going to loop or if it's the transition after the loop
			if (this.channelsIndex === this.states[this.activeState].gradients.length - 1) {
				isLooping = true;
				
			} else if (this.channelsIndex === this.states[this.activeState].gradients.length) {
				this.channelsIndex = 0;
			}

			// Checking the next gradient to send in args of an event and a callback
			nextGradient = this.states[this.activeState].gradients[this.channelsIndex + 1] === undefined ?
				this.states[this.activeState].gradients[0] :
				this.states[this.activeState].gradients[this.channelsIndex + 1];

			// Compute the colors for the transition and render a new frame
			this.setColors();
			this.animation = requestAnimationFrame(this.animateColors.bind(this));
			
			// Callback and Event
			if (this.callbacks.onGradientChange) {
				this.callbacks.onGradientChange({
					isLooping: isLooping,
					colorsFrom: this.states[this.activeState].gradients[this.channelsIndex],
					colorsTo: nextGradient,
					activeState: this.activeState
				});
			}

			this.canvas.dispatchEvent(this.events.gradientChange({
				isLooping: isLooping,
				colorsFrom: this.states[this.activeState].gradients[this.channelsIndex],
				colorsTo: nextGradient,
				activeState: this.activeState
			}));

		// Else if it was the last gradient on the list and the loop mode is off
		} else {
			cancelAnimationFrame(this.animation);

			// Callback and Event
			if (this.callbacks.onEnd) this.callbacks.onEnd();
			this.canvas.dispatchEvent(new CustomEvent('granim:end'));
		}
	}
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function(newBlendingMode) {
	this.context.clearRect(0, 0, this.x1, this.y1);
	this.context.globalCompositeOperation =
		this.image.blendingMode = newBlendingMode;
	this.validateInput('blendingMode');
	if (this.isPaused) this.refreshColorsAndPos();
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function(newDirection) {
	this.context.clearRect(0, 0, this.x1, this.y1);
	this.direction = newDirection;
	this.validateInput('direction');
	if (this.isPaused) this.refreshColorsAndPos();
};

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function(newState) {
	var _this = this;

	// Prevent transitioning to the same state
	if (this.activeState === newState) {
		return;
	}

	// Setting the good properties for the transition
	if (!this.isPaused) {
		this.isPaused = true;
		this.pause();
	}

	this.channelsIndex = -1;
	this.activetransitionSpeed = this.stateTransitionSpeed;
	this.activeColorsDiff = [];
	this.activeColorsPosDiff = [];
	this.activeColors = this.getCurrentColors();
	this.activeColorsPos = this.getCurrentColorsPos();
	this.progress = 0;
	this.previousTimeStamp = null;
	this.isChangingState = true;

	// Compute the gradient color and pos diff between the last frame gradient
	// and the first one of the new state
	this.states[newState].gradients[0].forEach(function(gradientColor, i, arr) {
		var nextColors = _this.convertColorToRgba(_this.getColor(gradientColor));
		var nextColorsPos = _this.getColorPos(gradientColor, i);
		var colorDiff = _this.getColorDiff(_this.activeColors[i], nextColors);
		var colorPosDiff = _this.getColorPosDiff(_this.activeColorsPos[i], nextColorsPos);
		_this.activeColorsDiff.push(colorDiff);
		_this.activeColorsPosDiff.push(colorPosDiff);
	});

	// Start the animation
	this.activeState = newState;
	this.play();
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function() {
	if (!this.isPaused) {
		cancelAnimationFrame(this.animation);

	} else {
		this.isPaused = false;
	}
	this.isCleared = true;
	this.context.clearRect(0, 0, this.x1, this.y1);
};

},{}],7:[function(require,module,exports){
'use strict';

var regex = {
	hexa: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
	rgba: /^rgba\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3}), ?(.?\d{1,3})\)$/,
	rgb: /^rgb\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)$/,
	hsla: /^hsla\((\d{1,3}), ?(\d{1,3})%, ?(\d{1,3})%, ?(.?\d{1,3})\)$/,
	hsl: /^hsl\((\d{1,3}), ?(\d{1,3})%, ?(\d{1,3})%\)$/
}, match;

module.exports = function(color) {
	switch(identifyColorType(color)) {
		default:
			this.triggerError('colorType');

		case 'hexa':
			return hexToRgba(color);

		case 'rgba':
			return [
				parseInt(match[1], 10),
				parseInt(match[2], 10),
				parseInt(match[3], 10),
				parseFloat(match[4])
			];

		case 'rgb':
			return [
				parseInt(match[1], 10),
				parseInt(match[2], 10),
				parseInt(match[3], 10),
				1
			];

		case 'hsla':
			return hslaToRgb(
				parseInt(match[1], 10) / 360,
				parseInt(match[2], 10) / 100,
				parseInt(match[3], 10) / 100,
				parseFloat(match[4])
			);

		case 'hsl':
			return hslaToRgb(
				parseInt(match[1], 10) / 360,
				parseInt(match[2], 10) / 100,
				parseInt(match[3], 10) / 100,
				1
			);
	}
};

function identifyColorType(color) {
	var colorTypes = Object.keys(regex);
	var i = 0;
	for (i; i < colorTypes.length; i++) {
		match = regex[colorTypes[i]].exec(color);
		if (match) return colorTypes[i];
	}
	return false;
}

function hexToRgba(hex) {
	// Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16),
		1
	] : null;
}

function hue2rgb(p, q, t) {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
}

function hslaToRgb(h, s, l, a) {
	var r, g, b, q, p;
	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		p = 2 * l - q;
		r = hue2rgb(p, q, h + 1/3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1/3);
	}
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a];
}

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function() {
	this.onResize('removeListeners');
	this.onScroll('removeListeners');
	this.clear();
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = function() {
	if ( typeof window.CustomEvent === 'function' ) return;

	function CustomEvent(event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = function(gradientColor) {
	if (typeof gradientColor === 'string') {
		return gradientColor;

	} else if (typeof gradientColor === 'object' && gradientColor.color) {
		return gradientColor.color;

	} else {
		this.triggerError('gradient.color');
	}
};

},{}],11:[function(require,module,exports){
'use strict';

module.exports = function(colorA, colorB) {
	var i = 0;
	var colorDiff = [];

	for (i; i < 4; i++) {
		colorDiff.push(colorB[i] - colorA[i]);
	}

	return colorDiff;
};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = function(gradientColor, i) {
	if (typeof gradientColor === 'object' && gradientColor.pos) {
		return gradientColor.pos;

	} else {
		// Ensure first and last position to be 0 and 100
		return parseFloat(!i ? 0 : ((1 / (this.gradientLength - 1)) * i).toFixed(2));
	}
};

},{}],13:[function(require,module,exports){
'use strict';

module.exports = function(posA, posB) {
	return posB - posA;
};

},{}],14:[function(require,module,exports){
'use strict';

module.exports = function() {
	var i, j;
	var currentColors = [];

	for (i = 0; i < this.currentColors.length; i++) {
		currentColors.push([]);

		for (j = 0; j < 4; j++) {
			currentColors[i].push(this.currentColors[i][j]);
		}
	}

	// Return a deep copy of the current colors
	return currentColors;
};

},{}],15:[function(require,module,exports){
'use strict';

module.exports = function() {
	var currentColorsPos = [], i;

	for (i = 0; i < this.currentColorsPos.length; i++) {
		currentColorsPos.push(this.currentColorsPos[i]);
	}

	// Return a deep copy of the current colors
	return currentColorsPos;
};

},{}],16:[function(require,module,exports){
'use strict';

module.exports = function() {
	this.x1 = this.canvas.offsetWidth;
	this.y1 = this.canvas.offsetHeight;
};

},{}],17:[function(require,module,exports){
'use strict';

module.exports = function(element) {
	if (element instanceof HTMLCanvasElement) {
		this.canvas = element;

	} else if (typeof element === 'string') {
		this.canvas = document.querySelector(element);

	} else {
		throw new Error('The element you used is neither a String, nor a HTMLCanvasElement');
	}

	if (!this.canvas) {
		throw new Error('`' + element + '` could not be found in the DOM');
	}
};

},{}],18:[function(require,module,exports){
'use strict';

module.exports = function() {
	var currentColors = this.getCurrentColors();
	var gradientAverage = null;
	var lightnessAverage, i;
	var colorsAverage = currentColors.map(function(el) {
		// Compute the average lightness of each color
		// in the current gradient
		return Math.max(el[0], el[1], el[2]);
	});

	for (i = 0; i < colorsAverage.length; i++) {
		// Add all the average lightness of each color
		gradientAverage = gradientAverage === null ?
			colorsAverage[i] : gradientAverage + colorsAverage[i];

		if (i === colorsAverage.length - 1) {
			// if it's the last lightness average
			// divide it by the total length to
			// have the global average lightness
			lightnessAverage = Math.round(gradientAverage / (i + 1));
		}
	}

	return lightnessAverage >= 128 ? 'light' : 'dark';
};

},{}],19:[function(require,module,exports){
'use strict';

module.exports = function() {
	var gradient = this.setDirection();
	var elToSetClassOnClass = document.querySelector(this.elToSetClassOn).classList;
	var i = 0;
	this.context.clearRect(0, 0, this.x1, this.y1);

	if (this.image) {
		this.context.drawImage(
			this.imageNode,
			this.imagePosition.x,
			this.imagePosition.y,
			this.imagePosition.width,
			this.imagePosition.height
		);
	}

	for (i; i < this.currentColors.length; i++) {
		gradient.addColorStop(this.currentColorsPos[i], 'rgba(' +
			this.currentColors[i][0] + ', ' +
			this.currentColors[i][1] + ', ' +
			this.currentColors[i][2] + ', ' +
			this.currentColors[i][3] + ')'
		);
	}

	if (this.name) {
		if (this.getLightness() === 'light') {
			elToSetClassOnClass.remove(this.name + '-dark');
			elToSetClassOnClass.add(this.name + '-light');

		} else {
			elToSetClassOnClass.remove(this.name + '-light');
			elToSetClassOnClass.add(this.name + '-dark');
		}
	}

	this.context.fillStyle = gradient;
	this.context.fillRect(0, 0, this.x1, this.y1);
};

},{}],20:[function(require,module,exports){
'use strict';

module.exports = function(type) {
	if (type === 'removeListeners') {
		window.removeEventListener('resize', this.setSizeAttributesNameSpace);
		return;
	}

	window.addEventListener('resize', this.setSizeAttributesNameSpace);
};

},{}],21:[function(require,module,exports){
'use strict';

module.exports = function(type) {
	if (type === 'removeListeners') {
		window.removeEventListener('scroll', this.pauseWhenNotInViewNameSpace);
		return;
	}

	window.addEventListener('scroll', this.pauseWhenNotInViewNameSpace);
	this.pauseWhenNotInViewNameSpace();
};

},{}],22:[function(require,module,exports){
'use strict';

module.exports = function(state) {
	var isPausedBecauseNotInView = state === 'isPausedBecauseNotInView';
	if (this.isCleared) return;
	if (!isPausedBecauseNotInView) this.isPaused = true;
	cancelAnimationFrame(this.animation);
	this.animating = false;
};

},{}],23:[function(require,module,exports){
'use strict';

module.exports = function() {
	var _this = this;
	if (this.scrollDebounceTimeout) clearTimeout(this.scrollDebounceTimeout);

	this.scrollDebounceTimeout = setTimeout(function() {
		var elPos = _this.canvas.getBoundingClientRect();
		_this.isCanvasInWindowView = !(elPos.bottom < 0 || elPos.right < 0 ||
			elPos.left > window.innerWidth || elPos.top > window.innerHeight);

		if (_this.isCanvasInWindowView) {
			if (!_this.isPaused || _this.firstScrollInit) {
				if (_this.image && !_this.isImgLoaded) {return;}
				_this.isPausedBecauseNotInView = false;
				_this.play('isPlayedBecauseInView');
				_this.firstScrollInit = false;
			}

		} else {
			if (!_this.image && _this.firstScrollInit) {
				_this.refreshColorsAndPos();
				_this.firstScrollInit = false;
			}

			if (!_this.isPaused && !_this.isPausedBecauseNotInView) {
				_this.isPausedBecauseNotInView = true;
				_this.pause('isPausedBecauseNotInView');
			}
		}
	}, this.scrollDebounceThreshold);
};

},{}],24:[function(require,module,exports){
'use strict';

module.exports = function(state) {
	var isPlayedBecauseInView = state === 'isPlayedBecauseInView';
	if (!isPlayedBecauseInView) this.isPaused = false;
	this.isCleared = false;
	if (!this.animating) {
		this.animation = requestAnimationFrame(this.animateColors.bind(this));
		this.animating = true;
	}
};

},{}],25:[function(require,module,exports){
'use strict';

module.exports = function() {
	var _this = this;

	if (!this.imagePosition) {
		this.imagePosition = { x: 0, y: 0, width: 0, height: 0 };
	}

	if (this.image.blendingMode) {
		this.context.globalCompositeOperation = this.image.blendingMode;
	}

	if (this.imageNode) {
		setImagePosition();
		return;
	}

	this.imageNode = new Image();
	this.imageNode.onerror = function() {
		throw new Error('Granim: The image source is invalid.');
	};
	this.imageNode.onload = function() {
		_this.imgOriginalWidth = _this.imageNode.width;
		_this.imgOriginalHeight = _this.imageNode.height;
		setImagePosition();
		_this.refreshColorsAndPos();
		if (!_this.isPausedWhenNotInView || _this.isCanvasInWindowView) {
			_this.animation = requestAnimationFrame(_this.animateColors.bind(_this));
		}
		_this.isImgLoaded = true;
	};
	this.imageNode.src = this.image.source;

	function setImagePosition() {
		var i, currentAxis;

		for (i = 0; i < 2; i++) {
			currentAxis = !i ? 'x' : 'y';
			setImageAxisPosition(currentAxis);
		}

		function setImageAxisPosition(axis) {
			var canvasWidthOrHeight = _this[axis + '1'];
			var imgOriginalWidthOrHeight = _this[axis === 'x' ? 'imgOriginalWidth' : 'imgOriginalHeight'];
			var imageAlignIndex = axis === 'x' ? _this.image.position[0] : _this.image.position[1];
			var imageAxisPosition;
			switch(imageAlignIndex) {
				case 'center':
					imageAxisPosition = imgOriginalWidthOrHeight > canvasWidthOrHeight
						? -(imgOriginalWidthOrHeight - canvasWidthOrHeight) / 2
						: (canvasWidthOrHeight - imgOriginalWidthOrHeight) / 2;
					_this.imagePosition[axis] = imageAxisPosition;
					_this.imagePosition[axis === 'x' ? 'width' : 'height'] = imgOriginalWidthOrHeight;
					break;

				case 'top':
					_this.imagePosition['y'] = 0;
					_this.imagePosition['height'] = imgOriginalWidthOrHeight;
					break;

				case 'bottom':
					_this.imagePosition['y'] = canvasWidthOrHeight - imgOriginalWidthOrHeight;
					_this.imagePosition['height'] = imgOriginalWidthOrHeight;
					break;

				case 'right':
					_this.imagePosition['x'] = canvasWidthOrHeight - imgOriginalWidthOrHeight;
					_this.imagePosition['width'] = imgOriginalWidthOrHeight;
					break;

				case 'left':
					_this.imagePosition['x'] = 0;
					_this.imagePosition['width'] = imgOriginalWidthOrHeight;
					break;
			}

			if (_this.image.stretchMode) {
				imageAlignIndex = axis === 'x' ? _this.image.stretchMode[0] : _this.image.stretchMode[1];
				switch(imageAlignIndex) {
					case 'none':
						break;
					case 'stretch':
						_this.imagePosition[axis] = 0;
						_this.imagePosition[axis === 'x' ? 'width' : 'height'] = canvasWidthOrHeight;
						break;

					case 'stretch-if-bigger':
						if (imgOriginalWidthOrHeight < canvasWidthOrHeight) break;
						_this.imagePosition[axis] = 0;
						_this.imagePosition[axis === 'x' ? 'width' : 'height'] = canvasWidthOrHeight;
						break;

					case 'stretch-if-smaller':
						if (imgOriginalWidthOrHeight > canvasWidthOrHeight) break;
						_this.imagePosition[axis] = 0;
						_this.imagePosition[axis === 'x' ? 'width' : 'height'] = canvasWidthOrHeight;
						break;
				}
			}
		}
	}
};

},{}],26:[function(require,module,exports){
'use strict';

module.exports = function(progressPercent) {
	var _this = this, activeChannel, activeChannelPos, i, j;

	// Loop through each colors of the active gradient
	for (i = 0; i < this.activeColors.length; i++) {

		// Generate RGBA colors
		for (j = 0; j < 4; j++) {
			// If color value [0-255] round to the integer,
			// Else if opacity [0-1] round to 2 decimals
			activeChannel = _this.activeColors[i][j] +
				(j !== 3
					? Math.ceil(_this.activeColorsDiff[i][j] / 100 * progressPercent)
					: Math.round((_this.activeColorsDiff[i][j] / 100 * progressPercent) * 100) / 100
				);

			// Prevent colors values from going < 0 & > 255
			if (activeChannel <= 255 && activeChannel >= 0) {
				_this.currentColors[i][j] = activeChannel;
			}
		}

		// Generate gradient color position
		activeChannelPos = parseFloat((_this.activeColorsPos[i] +
			(_this.activeColorsPosDiff[i] / 100 * progressPercent)
		).toFixed(4));

		if (activeChannelPos <= 1 && activeChannelPos >= 0) {
			_this.currentColorsPos[i] = activeChannelPos;
		}
	}

	this.makeGradient();
};

},{}],27:[function(require,module,exports){
'use strict';

module.exports = function() {
	var _this = this, colorDiff, colorPosDiff, nextColors, nextColorsPos;

	if (!this.channels[this.activeState]) this.channels[this.activeState] = [];

	// If the actual channel exist, reassign properties and exit
	// (each channel is saved to prevent recomputing it each time)
	if (this.channels[this.activeState][this.channelsIndex] !== undefined) {
		this.activeColors = this.channels[this.activeState][this.channelsIndex].colors;
		this.activeColorsDiff = this.channels[this.activeState][this.channelsIndex].colorsDiff;
		this.activeColorsPos = this.channels[this.activeState][this.channelsIndex].colorsPos;
		this.activeColorsPosDiff = this.channels[this.activeState][this.channelsIndex].colorsPosDiff;
		return;
	}

	// Set blank properties
	this.channels[this.activeState].push([{}]);
	this.channels[this.activeState][this.channelsIndex].colors = [];
	this.channels[this.activeState][this.channelsIndex].colorsDiff = [];
	this.channels[this.activeState][this.channelsIndex].colorsPos = [];
	this.channels[this.activeState][this.channelsIndex].colorsPosDiff = [];
	this.activeColors = [];
	this.activeColorsDiff = [];
	this.activeColorsPos = [];
	this.activeColorsPosDiff = [];

	// Go on each gradient of the current state
	this.states[this.activeState].gradients[this.channelsIndex].forEach(function(color, i) {
		// Push the hex color converted to rgba on the channel and the active color properties
		var colorPos = _this.getColorPos(color, i);
		var color = _this.getColor(color);
		var rgbaColor = _this.convertColorToRgba(color);
		var activeChannel = _this.channels[_this.activeState];

		activeChannel[_this.channelsIndex].colors.push(rgbaColor);
		_this.activeColors.push(rgbaColor);
		activeChannel[_this.channelsIndex].colorsPos.push(colorPos);
		_this.activeColorsPos.push(colorPos);

		// If it's the first channel to be set, set the currentColors
		if (!_this.isCurrentColorsSet) {
			_this.currentColors.push(_this.convertColorToRgba(color));
			_this.currentColorsPos.push(colorPos);
		}

		// If it's the last gradient, compute the color diff between the last gradient and the first one,
		// else between the penultimate one and the last one
		if (_this.channelsIndex === _this.states[_this.activeState].gradients.length - 1) {
			colorDiff = _this.getColorDiff(
				activeChannel[_this.channelsIndex].colors[i],
				activeChannel[0].colors[i]
			);
			colorPosDiff = _this.getColorPosDiff(
				activeChannel[_this.channelsIndex].colorsPos[i],
				activeChannel[0].colorsPos[i]
			);

		} else {
			nextColors = _this.convertColorToRgba(_this.getColor(_this.states[_this.activeState].gradients[_this.channelsIndex + 1][i]));
			nextColorsPos = _this.getColorPos(_this.states[_this.activeState].gradients[_this.channelsIndex + 1][i], i);
			colorDiff = _this.getColorDiff(activeChannel[_this.channelsIndex].colors[i], nextColors);
			colorPosDiff = _this.getColorPosDiff(activeChannel[_this.channelsIndex].colorsPos[i], nextColorsPos);
		}

		activeChannel[_this.channelsIndex].colorsDiff.push(colorDiff);
		_this.activeColorsDiff.push(colorDiff);
		activeChannel[_this.channelsIndex].colorsPosDiff.push(colorPosDiff);
		_this.activeColorsPosDiff.push(colorPosDiff);
	});

	this.activetransitionSpeed = this.states[this.activeState].transitionSpeed || 5000;
	this.isCurrentColorsSet = true;
};

},{}],28:[function(require,module,exports){
'use strict';

module.exports = function() {
	var ctx = this.context;

	switch(this.direction) {
		case 'diagonal':
			return ctx.createLinearGradient(0, 0, this.x1, this.y1);

		case 'left-right':
			return ctx.createLinearGradient(0, 0, this.x1, 0);

		case 'top-bottom':
			return ctx.createLinearGradient(this.x1 / 2, 0, this.x1 / 2, this.y1);

		case 'radial':
			return ctx.createRadialGradient(this.x1 / 2, this.y1 / 2, this.x1 / 2, this.x1 / 2, this.y1 / 2, 0);

		case 'custom':
			return ctx.createLinearGradient(
				getCustomCoordinateInPixels(this.customDirection.x0, this.x1),
				getCustomCoordinateInPixels(this.customDirection.y0, this.y1),
				getCustomCoordinateInPixels(this.customDirection.x1, this.x1),
				getCustomCoordinateInPixels(this.customDirection.y1, this.y1)
			);
	}
};

function getCustomCoordinateInPixels(coordinate, size) {
	return coordinate.indexOf('%') > -1
		? size / 100 * parseInt(coordinate.split('%')[0], 10)
		: parseInt(coordinate.split('px')[0], 10);
}

},{}],29:[function(require,module,exports){
'use strict';

module.exports = function() {
	this.getDimensions();
	this.canvas.setAttribute('width', this.x1);
	this.canvas.setAttribute('height', this.y1);
	if (this.image) this.prepareImage();
	this.refreshColorsAndPos();
};

},{}],30:[function(require,module,exports){
'use strict';

module.exports = function(element) {
	var siteURL = 'https://sarcadass.github.io/granim.js/api.html';
	throw new Error('Granim: Input error on "' + element + '" option.\nCheck the API ' + siteURL + '.');
};

},{}],31:[function(require,module,exports){
'use strict';

module.exports = function(inputType) {
	var xPositionValues = ['left', 'center', 'right'];
	var yPositionValues = ['top', 'center', 'bottom'];
	var stretchModeValues = ['none', 'stretch', 'stretch-if-smaller', 'stretch-if-bigger'];
	var blendingModeValues = ['multiply', 'screen', 'normal', 'overlay', 'darken',
		'lighten', 'lighter', 'color-dodge', 'color-burn', 'hard-light', 'soft-light',
		'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
	var directionValues = ['diagonal', 'left-right', 'top-bottom', 'radial', 'custom'];

	switch(inputType) {
		case 'image':
			// Validate image.position
			if ((!Array.isArray(this.image.position) || this.image.position.length !== 2) ||
				xPositionValues.indexOf(this.image.position[0]) === -1 ||
				yPositionValues.indexOf(this.image.position[1]) === -1
			) { this.triggerError('image.position'); }
			// Validate image.stretchMode
			if (this.image.stretchMode) {
				if ((!Array.isArray(this.image.stretchMode) || this.image.stretchMode.length !== 2) ||
					stretchModeValues.indexOf(this.image.stretchMode[0]) === -1 ||
					stretchModeValues.indexOf(this.image.stretchMode[1]) === -1
				) { this.triggerError('image.stretchMode'); }
			}
			break;

		case 'blendingMode':
			if (blendingModeValues.indexOf(this.image.blendingMode) === -1) {
				this.clear();
				this.triggerError('blendingMode');
			}
			break;

		case 'direction':
			if (directionValues.indexOf(this.direction) === -1) {
				this.triggerError('direction');
			} else {
				if (this.direction === 'custom') {
					if (!areDefinedInPixelsOrPercentage([
						this.customDirection.x0,
						this.customDirection.x1,
						this.customDirection.y0,
						this.customDirection.y1
					])) {
						this.triggerError('customDirection');
					}
				}
			}
			break;
	}
};

function areDefinedInPixelsOrPercentage(array) {
	var definedInPixelsOrPercentage = true, i = 0, value;
	while (definedInPixelsOrPercentage && i < array.length) {
		value = array[i];
		if (typeof value !== 'string') {
			definedInPixelsOrPercentage = false;
		} else {
			var splittedValue = null;
			var unit = null;
			if (value.indexOf('px') !== -1) unit = 'px';
			if (value.indexOf('%') !== -1) unit = '%';
			splittedValue = value.split(unit).filter(function(value) {
				return value.length > 0;
			});
			// Check if there is a unit ('px' or '%'),
			// a char before the unit,
			// no char after the unit,
			// the string without the unit is only composed of digits
			if (
				!unit
				|| splittedValue.length > 2
				|| !splittedValue[0]
				|| splittedValue[1]
				|| !/^-?\d+\.?\d*$/.test(splittedValue[0])
			) {
				definedInPixelsOrPercentage = false;
			}
		}
		i++;
	}
	return definedInPixelsOrPercentage;
}

},{}],32:[function(require,module,exports){
window.Granim = require('./lib/Granim.js');

},{"./lib/Granim.js":1}]},{},[32]);
