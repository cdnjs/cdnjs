/**
 *
 * Version: 0.2.8
 * Author:  Gianluca Guarini
 * Contact: gianluca.guarini@gmail.com
 * Website: http://www.gianlucaguarini.com/
 * Twitter: @gianlucaguarini
 *
 * Copyright (c) 2013 Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/
!(function($) {
	$.fn.extend({
		BlackAndWhite: function(options) {
			'use strict';
			var $container = this,
				defaults = {
					hoverEffect: true,
					webworkerPath: false,
					responsive: true,
					invertHoverEffect: false,
					speed: 500,
					onImageReady: null,
					intensity: 1
				};
			options = $.extend(defaults, options);

			/**
			 *
			 * Public vars
			 *
			 */
			var hoverEffect = options.hoverEffect,
				webworkerPath = options.webworkerPath,
				invertHoverEffect = options.invertHoverEffect,
				responsive = options.responsive,
				intensity = (typeof options.intensity === 'number' && options.intensity < 1 && options.intensity > 0) ? options.intensity : 1,
				fadeSpeedIn = $.isPlainObject(options.speed) ? options.speed.fadeIn : options.speed,
				fadeSpeedOut = $.isPlainObject(options.speed) ? options.speed.fadeOut : options.speed;

			var isIE7 = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;

			/*
			 *
			 * features detection
			 *
			 */

			var browserPrefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

			var cssPrefixString = {};
			var cssPrefix = function(property) {
				if (cssPrefixString[property] || cssPrefixString[property] === '') return cssPrefixString[property] + property;
				var e = document.createElement('div');
				var prefixes = ['', 'Moz', 'Webkit', 'O', 'ms', 'Khtml']; // Various supports...
				for (var i in prefixes) {
					if (typeof e.style[prefixes[i] + property] !== 'undefined') {
						cssPrefixString[property] = prefixes[i];
						return prefixes[i] + property;
					}
				}
				return property.toLowerCase();
			};


			// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css-filters.js
			var cssfilters = function() {
				var el = document.createElement('div');
				el.style.cssText = browserPrefixes.join('filter' + ':blur(2px); ');
				return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
			}();
			/**
			 *
			 * Private vars
			 *
			 */
			var supportsCanvas = !! document.createElement('canvas').getContext,
				$window = $(window),
				/* Check if Web Workers are supported */
				supportWebworker = (function() {
					return (typeof(Worker) !== "undefined") ? true : false;
				}()),
				cssFilter = cssPrefix('Filter'),
				imagesArray = [],
				BnWWorker = supportWebworker && webworkerPath ? new Worker(webworkerPath + "BnWWorker.js") : false;

			/**
			 *
			 * Private methods
			 *
			 */
			var _onMouseLeave = function(e) {
				$(e.currentTarget).find('.BWfade').stop(true, true)[!invertHoverEffect ? 'fadeIn' : 'fadeOut'](fadeSpeedOut);
			};
			var _onMouseEnter = function(e) {
				$(e.currentTarget).find('.BWfade').stop(true, true)[invertHoverEffect ? 'fadeIn' : 'fadeOut'](fadeSpeedIn);
			};
			var _onImageReady = function(img) {
				if (typeof options.onImageReady === 'function')
					options.onImageReady(img);
			};
			// Loop all the images converting them by the webworker (this process is unobstrusive and it does not block the page loading)
			var _webWorkerLoop = function() {
				if (!imagesArray.length) {
					// terminate the worker
					// the standard way - http://www.w3.org/TR/workers/#dedicated-workers-and-the-worker-interface
					if (BnWWorker.terminate)
						BnWWorker.terminate();
					// IE 10 specific - http://msdn.microsoft.com/en-us/library/ie/hh673568(v=vs.85).aspx
					if (BnWWorker.close)
						BnWWorker.close();
					return;
				}

				BnWWorker.postMessage({
					imgData:imagesArray[0].imageData,
					intensity: intensity
				});

				BnWWorker.onmessage = function(event) {
					imagesArray[0].ctx.putImageData(event.data, 0, 0);
					_onImageReady(imagesArray[0].img);
					imagesArray.splice(0, 1);
					_webWorkerLoop();
				};
			};
			//convert any image into B&W using HTML5 canvas
			var _manipulateImage = function(img, canvas, width, height) {
				var ctx = canvas.getContext('2d'),
					currImg = img,
					i = 0,
					grey;

				ctx.drawImage(img, 0, 0, width, height);

				var imageData = ctx.getImageData(0, 0, width, height),
					px = imageData.data,
					length = px.length;

				// web worker superfast implementation
				if (BnWWorker) {

					imagesArray.push({
						imageData: imageData,
						ctx: ctx,
						img: img
					});

				} else {

					// no webworker slow implementation
					for (; i < length; i += 4) {
						var k = px[i] * 0.3 + px[i + 1] * 0.59 + px[i + 2] * 0.11;
						px[i] = ~~ (k * intensity + px[i] * (1 - intensity));
						px[i + 1] = ~~ (k * intensity + px[i + 1] * (1 - intensity));
						px[i + 2] = ~~ (k * intensity + px[i + 2] * (1 - intensity));
					}

					ctx.putImageData(imageData, 0, 0);

					_onImageReady(img);
				}
			};

			var _injectTags = function($img, $imageWrapper) {

				var pic = $img[0],
					src = pic.src,
					width = $img.width(),
					height = $img.height(),
					position = $img.position(),
					css = {
						'position': 'absolute',
						top: position.top,
						left: position.left,
						display: invertHoverEffect ? 'none' : 'block'
					};
				if (supportsCanvas && !cssfilters) {

					var realWidth = pic.width,
						realHeight = pic.height;

					//adding the canvas
					$('<canvas class="BWfade" width="' + realWidth + '" height="' + realHeight + '"></canvas>').prependTo($imageWrapper);
					//getting the canvas
					var $canvas = $imageWrapper.find('canvas');
					//setting the canvas position on the Pics
					$canvas.css(css);

					_manipulateImage(pic, $canvas[0], realWidth, realHeight);

				} else {

					css[cssPrefix('Filter')] = 'grayscale(' + intensity * 100 + '%)';
					//adding the canvas
					$('<img src=' + src + ' width="' + width + '" height="' + height + '" class="BWFilter BWfade" /> ').prependTo($imageWrapper);
					$('.BWFilter').css($.extend(css, {
						'filter': 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)'
					}));

					_onImageReady(pic);
				}
			};
			this.init = function(options) {
				// convert all the images
				$container.each(function(index, tmpImageWrapper) {
					var $imageWrapper = $(tmpImageWrapper),
						$pic = $imageWrapper.find('img');

					if (!$pic.width())
						$pic.on("load", function() {
							_injectTags($pic, $imageWrapper);
						});
					else
						_injectTags($pic, $imageWrapper);
				});
				// start the webworker
				if (BnWWorker) {
					// web worker implementation
					_webWorkerLoop();
				}
				// binding the hover effect
				if (hoverEffect) {

					$container.on('mouseleave', _onMouseLeave);
					$container.on('mouseenter', _onMouseEnter);
				}
				// make it responsive
				if (responsive) {
					$window.on('resize orientationchange', $container.resizeImages);
				}
			};

			this.resizeImages = function() {

				$container.each(function(index, currImageWrapper) {
					var pic = $(currImageWrapper).find('img:not(.BWFilter)'),
						currWidth = isIE7 ? $(pic).prop('width') : $(pic).width(),
						currHeight = isIE7 ? $(pic).prop('height') : $(pic).height();

					$(this).find('.BWFilter, canvas').css({
						width: currWidth,
						height: currHeight
					});

				});
			};

			return this.init(options);

		}

	});
}(jQuery));