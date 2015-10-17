/*! {{pkg.displayName}} {{pkg.version}} - //larsjung.de/qrcode - MIT License */

// Uses [QR Code Generator](http://www.d-project.com/qrcode/index.html) (MIT), appended to the end of this file.
// Kudos to [jquery.qrcode.js](http://github.com/jeromeetienne/jquery-qrcode) (MIT).

(function ($) {
	'use strict';

		// Check if canvas is available in the browser (as Modernizr does)
	var canvasAvailable = (function () {

			var elem = document.createElement('canvas');
			return !!(elem.getContext && elem.getContext('2d'));
		}()),

		// Wrapper for the original QR code generator.
		createQr = function (typeNumber, correctLevel, text) {

			// `qrcode` is the single public function that will be defined by the `QR Code Generator`
			// at the end of the file.
			var qr = qrcode(typeNumber, correctLevel);
			qr.addData(text);
			qr.make();

			return qr;
		},

		// Returns a minimal QR code for the given text. Returns `null` if `text`
		// is to long to be encoded. At the moment it should work with up to 271 characters.
		createBestQr = function (text) {

			for (var type = 2; type <= 40; type += 1) {
				try {
					return createQr(type, 'L', text);
				} catch (err) {}
			}

			return null;
		},

		// Draws QR code to the given `canvas` and returns it.
		drawOnCanvas = function (canvas, settings) {

				// some shortcuts to improve compression
			var settings_text = settings.text,
				settings_left = settings.left,
				settings_top = settings.top,
				settings_width = settings.width,
				settings_height = settings.height,
				settings_color = settings.color,
				settings_bgColor = settings.bgColor,

				qr = createBestQr(settings_text),
				$canvas = $(canvas),
				ctx = $canvas[0].getContext('2d');

			if (settings_bgColor) {
				ctx.fillStyle = settings_bgColor;
				ctx.fillRect(settings_left, settings_top, settings_width, settings_height);
			}

			if (qr) {
				var moduleCount = qr.getModuleCount(),
					moduleWidth = settings_width / moduleCount,
					moduleHeight = settings_height / moduleCount,
					row, col;

				ctx.beginPath();
				for (row = 0; row < moduleCount; row += 1) {
					for (col = 0; col < moduleCount; col += 1) {
						if (qr.isDark(row, col)) {
							ctx.rect(settings_left + col * moduleWidth, settings_top + row * moduleHeight, moduleWidth, moduleHeight);
						}
					}
				}
				ctx.fillStyle = settings_color;
				ctx.fill();
			}

			return $canvas;
		},

		// Returns a `canvas` element representing the QR code for the given settings.
		createCanvas = function (settings) {

			var $canvas = $('<canvas/>').attr('width', settings.width).attr('height', settings.height);

			return drawOnCanvas($canvas, settings);
		},

		// Returns a `div` element representing the QR code for the given settings.
		createDiv = function (settings) {

				// some shortcuts to improve compression
			var settings_text = settings.text,
				settings_width = settings.width,
				settings_height = settings.height,
				settings_color = settings.color,
				settings_bgColor = settings.bgColor,
				math_floor = Math.floor,

				qr = createBestQr(settings_text),
				$div = $('<div/>').css({
										position: 'relative',
										left: 0,
										top: 0,
										padding: 0,
										margin: 0,
										width: settings_width,
										height: settings_height
									});

			if (settings_bgColor) {
				$div.css('background-color', settings_bgColor);
			}

			if (qr) {
				var moduleCount = qr.getModuleCount(),
					moduleWidth = math_floor(settings_width / moduleCount),
					moduleHeight = math_floor(settings_height / moduleCount),
					offsetLeft = math_floor(0.5 * (settings_width - moduleWidth * moduleCount)),
					offsetTop = math_floor(0.5 * (settings_height - moduleHeight * moduleCount)),
					row, col;

				for (row = 0; row < moduleCount; row += 1) {
					for (col = 0; col < moduleCount; col += 1) {
						if (qr.isDark(row, col)) {
							$('<div/>')
								.css({
									left: offsetLeft + col * moduleWidth,
									top: offsetTop + row * moduleHeight
								})
								.appendTo($div);
						}
					}
				}

				$div.children()
							.css({
								position: 'absolute',
								padding: 0,
								margin: 0,
								width: moduleWidth,
								height: moduleHeight,
								'background-color': settings_color
							});
			}

			return $div;
		},

		createHTML = function (options) {

			var settings = $.extend({}, defaults, options);

			return canvasAvailable && settings.render === 'canvas' ? createCanvas(settings) : createDiv(settings);
		},

		// Plugin
		// ======

		// Default settings
		// ----------------
		defaults = {

			// render method: `'canvas'` or `'div'`
			render: 'canvas',

			// left and top in pixel if drawn onto existing canvas
			left: 0,
			top: 0,

			// width and height in pixel
			width: 256,
			height: 256,

			// code color
			color: '#000',

			// background color, `null` for transparent background
			bgColor: null,

			// the encoded text
			text: 'no text'
		};

	// Register the plugin
	// -------------------
	$.fn.qrcode = function(options) {

		return this.each(function () {

			if (this.nodeName.toLowerCase() === 'canvas') {
				drawOnCanvas(this, options);
			} else {
				$(this).append(createHTML(options));
			}
		});
	};

	// jQuery.qrcode plug in code ends here

	// QR Code Generator
	// =================
	// @include "qrcode.js"

}(jQuery));
