/**!
 * easyPieChart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.0.2
 **/

(function() {
// Angular directives for easyPieChart
if ( (typeof(angular) === 'object') && (typeof(angular.version) === 'object')){
	angular.module('easypiechart',[])
	.directive('easypiechart', function($parse) {
		return {
			restrict: 'A',
			require: '?ngModel',
			link: function (scope, element, attrs) {
				var options = {};
				var fx = attrs.easypiechart;
				if (fx.length > 0) {
					fx = fx.split(';'); // CSS like syntax
					var REkey = new RegExp('[a-z]+', 'i');
					var REvalue = new RegExp(':.+');
					// Parse Effects
					for (var i in fx) {
						var value = fx[i].match(REkey);
						var key = fx[i].match(REvalue);
						value = value[0];
						key = key[0].substring(1);
						if (!isNaN(parseInt(key, 10))) {
							options[value] = parseFloat(key);
						} else{
							switch (key) {
								case 'true':
									options[value] = true;
									break;
								case 'false':
									options[value] = false;
									break;
								default:
									options[value] = key;
							}
						}
					}
				}
				var pieChart = new EasyPieChart(element[0], options);

				// initial pie rendering
				if (scope.percent) {
					pieChart.update(scope.percent);
				}

				// on change of value
				var timer = null;
				scope.$watch('percent', function(oldVal, newVal) {
					pieChart.update(newVal);

					// this is needed or the last value won't be updated
					clearTimeout(timer);
					timer = setTimeout(function() {
						pieChart.update(scope.percent);
					}, 1000 / 60);
				});
			}
		};
	});
} else{
	console.log('Angular not detected.');
}


var CanvasRenderer = function(el, options) {
	var self = this;
	var cachedBackground;
	var canvas = document.createElement('canvas');

	if (typeof(G_vmlCanvasManager) !== 'undefined') {
		G_vmlCanvasManager.initElement(canvas);
	}

	var ctx = canvas.getContext('2d');

	canvas.width = canvas.height = options.size;

	el.appendChild(canvas);

	// canvas on retina devices
	if (window.devicePixelRatio > 1) {
		var scaleBy = window.devicePixelRatio;
		canvas.style.width = canvas.style.height = [options.size, 'px'].join('');
		canvas.width = canvas.height = options.size * scaleBy;
		ctx.scale(scaleBy, scaleBy);
	}

	// move 0,0 coordinates to the center
	ctx.translate(options.size / 2, options.size / 2);

	// rotate canvas -90deg
	ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI);

	var radius = (options.size - options.lineWidth) / 2;
	if (options.scaleColor && options.scaleLength) {
		radius -= options.scaleLength + 2; // 2 is the distance between scale and bar
	}

	var drawCircle = function(color, lineWidth, percent) {
		percent = Math.min(Math.max(0, percent || 1), 1);

		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);

		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;

		ctx.stroke();
	};

	var drawScale = function() {
		var offset;
		var length;
		var i = 24;

		ctx.lineWidth = 1
		ctx.fillStyle = options.scaleColor;

		ctx.save();
		for (var i = 24; i > 0; --i) {
			if (i%6 === 0) {
				length = options.scaleLength;
				offset = 0;
			} else {
				length = options.scaleLength * .6;
				offset = options.scaleLength - length;
			}
			ctx.fillRect(-options.size/2 + offset, 0, length, 1);
			ctx.rotate(Math.PI / 12);
		}
		ctx.restore();
	};

	Date.now = Date.now || function() {
		return +(new Date());
	};

	var reqAnimationFrame = (function() {
		return  window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				};
	}());

	var drawBackground = function() {
		options.scaleColor && drawScale();
		options.trackColor && drawCircle(options.trackColor, options.lineWidth);
	};

	this.clear = function() {
		ctx.clearRect(options.size / -2, options.size / -2, options.size, options.size);
	};

	this.draw = function(percent) {
		// do we need to render a background
		if (!!options.scaleColor || !!options.trackColor) {
				// getImageData and putImageData are supported
				if (ctx.getImageData && ctx.putImageData) {
					if (!cachedBackground) {
					drawBackground();
					cachedBackground = ctx.getImageData(0, 0, options.size, options.size);
				} else {
					ctx.putImageData(cachedBackground, 0, 0);
				}
			} else {
				this.clear();
				drawBackground();
			}
		} else {
			this.clear();
		}

		ctx.lineCap = options.lineCap;

		// if barcolor is a function execute it and pass the percent as a value
		var color;
		if (typeof(options.barColor) === 'function') {
			color = options.barColor(percent);
		} else {
			color = options.barColor;
		}

		// draw bar
		if (percent > 0) {
			drawCircle(color, options.lineWidth, percent / 100);
		}
	}.bind(this);

	this.animate = function(from, to) {
		var startTime = Date.now();
		options.onStart(from, to);
		var animation = function() {
			var process = Math.min(Date.now() - startTime, options.animate);
			var currentValue = options.easing(this, process, from, to - from, options.animate);
			this.draw(currentValue);
			options.onStep(from, to, currentValue);
			if (process >= options.animate) {
				options.onStop(from, to);
			} else {
				reqAnimationFrame(animation);
			}
		}.bind(this);

		reqAnimationFrame(animation);
	}.bind(this);
};

var EasyPieChart = function(el, opts) {
	var defaultOptions = {
		barColor: '#ef1e25',
		trackColor: '#f9f9f9',
		scaleColor: '#dfe0e0',
		scaleLength: 5,
		lineCap: 'round',
		lineWidth: 3,
		size: 110,
		rotate: 0,
		animate: 1000,
		renderer: CanvasRenderer,
		easing: function (x, t, b, c, d) { // more can be found here: http://gsgd.co.uk/sandbox/jquery/easing/
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		onStart: function(from, to) {
			return;
		},
		onStep: function(from, to, currentValue) {
			return;
		},
		onStop: function(from, to) {
			return;
		}
	};

	var options = {};
	var renderer;
	var currentValue = 0;

	var init = function() {

		this.el = el;
		this.options = options;

		// merge user options into default options
		for (var i in defaultOptions) {
			if (defaultOptions.hasOwnProperty(i)) {
				options[i] = opts && typeof(opts[i]) !== 'undefined' ? opts[i] : defaultOptions[i];
				if (typeof(options[i]) === 'function') {
					options[i] = options[i].bind(this);
				}
			}
		}

		// check for jQuery easing
		if (typeof(options.easing) === 'string' && typeof(jQuery) !== 'undefined' && jQuery.isFunction(jQuery.easing[options.easing])) {
			options.easing = jQuery.easing[options.easing];
		} else {
			options.easing = defaultOptions.easing;
		}

		// create renderer
		renderer = new options.renderer(el, options);

		// initial draw
		renderer.draw(currentValue);

		// initial update
		if (el.dataset && el.dataset.percent) {
			this.update(parseInt(el.dataset.percent, 10));
		}

	}.bind(this);

	this.update = function(newValue) {
		newValue = parseInt(newValue, 10);
		if (options.animate) {
			renderer.animate(currentValue, newValue);
		} else {
			renderer.draw(newValue);
		}
		currentValue = newValue;
		return this;
	}.bind(this);

	init();
};

}());