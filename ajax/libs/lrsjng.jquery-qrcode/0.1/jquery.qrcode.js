/*! jQuery.qrcode %BUILD_VERSION% - //larsjung.de/qrcode - MIT License */

// Uses [QR Code Generator](http://www.d-project.com/qrcode/index.html) (MIT), appended to the end of this file.
// Kudos to [jquery.qrcode.js](http://github.com/jeromeetienne/jquery-qrcode) (MIT).

(function ($) {
	'use strict';

		// Wrapper for the original QR code generator.
	var createQr = function (typeNumber, correctLevel, text) {

			// qrcode is the single public function that will be defined by the `QR Code Generator`
			// at the end of the file.
			var qr = qrcode(typeNumber, correctLevel);
			qr.addData(text);
			qr.make();

			return qr;
		},

		// Returns a minimal QR code for the given text. Returns `null` if `text`
		// is to long to be encoded. At the moment it should work with up to 271 characters.
		createBestQr = function (text) {

			for (var type = 2; type <= 10; type += 1) {
				try {
					return createQr(type, 'L', text);
				} catch (err) {}
			}

			return null;
		},

		// Returns a `canvas` element representing the QR code for the given settings.
		createCanvas = function (settings) {

			var qr = createBestQr(settings.text),
				$canvas = $('<canvas/>').attr('width', settings.width).attr('height', settings.height),
				ctx = $canvas[0].getContext('2d');

			if (settings.bgColor) {
				ctx.fillStyle = settings.bgColor;
				ctx.fillRect(0, 0, settings.width, settings.height);
			}

			if (qr) {
				var moduleCount = qr.getModuleCount(),
					moduleWidth = settings.width / moduleCount,
					moduleHeight = settings.height / moduleCount,
					row, col;

				ctx.beginPath();
				for (row = 0; row < moduleCount; row += 1) {
					for (col = 0; col < moduleCount; col += 1) {
						if (qr.isDark(row, col)) {
							ctx.rect(col * moduleWidth, row * moduleHeight, moduleWidth, moduleHeight);
						}
					}
				}
				ctx.fillStyle = settings.color;
				ctx.fill();
			}

			return $canvas;
		},

		// Returns a `div` element representing the QR code for the given settings.
		createDiv = function (settings) {

			var qr = createBestQr(settings.text),
				$div = $('<div/>').css({
										position: 'relative',
										left: 0,
										top: 0,
										padding: 0,
										margin: 0,
										width: settings.width,
										height: settings.height
									});

			if (settings.bgColor) {
				$div.css('background-color', settings.bgColor);
			}

			if (qr) {
				var moduleCount = qr.getModuleCount(),
					moduleWidth = Math.floor(settings.width / moduleCount),
					moduleHeight = Math.floor(settings.height / moduleCount),
					offsetLeft = Math.floor(0.5 * (settings.width - moduleWidth * moduleCount)),
					offsetTop = Math.floor(0.5 * (settings.height - moduleHeight * moduleCount)),
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
								'background-color': settings.color
							});
			}

			return $div;
		},

		// Plugin
		// ======

		// Default settings
		// ----------------
		defaults = {

			// render method: `'canvas'` or `'div'`
			render: 'canvas',

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

		var settings = $.extend({}, defaults, options);

		return this.each(function () {

			$(this).append(settings.render === 'canvas' ? createCanvas(settings) : createDiv(settings));
		});
	};

	// jQuery.qrcode plug in code ends here

	// QR Code Generator
	// =================
	// @include "qrcode.js"

}(jQuery));
