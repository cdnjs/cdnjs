/*! {{pkg.displayName}} {{pkg.version}} - //larsjung.de/qrcode - MIT License */

// Uses [QR Code Generator](http://www.d-project.com/qrcode/index.html) (MIT), appended to the end of this file.
// Kudos to [jquery.qrcode.js](http://github.com/jeromeetienne/jquery-qrcode) (MIT).

(function ($) {
	'use strict';


		// Wrapper for the original QR code generator.
	var QRCode = function (text, level, version, quiet) {

			// `qrcode` is the single public function that will be defined by the `QR Code Generator`
			// at the end of the file.
			var qr = qrcode(version, level);
			qr.addData(text);
			qr.make();

			quiet = quiet || 0;

			var qrModuleCount = qr.getModuleCount(),
				quietModuleCount = qr.getModuleCount() + 2*quiet,
				isDark = function (row, col) {

					row -= quiet;
					col -= quiet;

					if (row < 0 || row >= qrModuleCount || col < 0 || col >= qrModuleCount) {
						return false;
					}

					return qr.isDark(row, col);
				},
				addBlank = function (l, t, r, b) {

					var prevIsDark = this.isDark,
						moduleSize = 1 / quietModuleCount;

					this.isDark = function (row, col) {

						var ml = col * moduleSize,
							mt = row * moduleSize,
							mr = ml + moduleSize,
							mb = mt + moduleSize;

						return prevIsDark(row, col) && (l > mr || ml > r || t > mb || mt > b);
					};
				};

			this.text = text;
			this.level = level;
			this.version = version;
			this.moduleCount = quietModuleCount;
			this.isDark = isDark;
			this.addBlank = addBlank;
		},

		// Check if canvas is available in the browser (as Modernizr does)
		canvasAvailable = (function () {

			var elem = document.createElement('canvas');
			return !!(elem.getContext && elem.getContext('2d'));
		}()),

		arcToAvailable = Object.prototype.toString.call(window.opera) !== '[object Opera]',

		// Returns a minimal QR code for the given text starting with version `minVersion`.
		// Returns `null` if `text` is too long to be encoded in `maxVersion`.
		createQRCode = function (text, level, minVersion, maxVersion, quiet) {

			minVersion = Math.max(1, minVersion || 1);
			maxVersion = Math.min(40, maxVersion || 40);
			for (var version = minVersion; version <= maxVersion; version += 1) {
				try {
					return new QRCode(text, level, version, quiet);
				} catch (err) {}
			}
		},

		drawBackgroundLabel = function (qr, context, settings) {

			var size = settings.size,
				font = "bold " + (settings.mSize * size) + "px " + settings.fontname,
				ctx = $('<canvas/>')[0].getContext("2d");

			ctx.font = font;

			var w = ctx.measureText(settings.label).width,
				sh = settings.mSize,
				sw = w / size,
				sl = (1 - sw) * settings.mPosX,
				st = (1 - sh) * settings.mPosY,
				sr = sl + sw,
				sb = st + sh,
				pad = 0.01;

			if (settings.mode === 1) {
				// Strip
				qr.addBlank(0, st - pad, size, sb + pad);
			} else {
				// Box
				qr.addBlank(sl - pad, st - pad, sr + pad, sb + pad);
			}

			context.fillStyle = settings.fontcolor;
			context.font = font;
			context.fillText(settings.label, sl*size, st*size + 0.75 * settings.mSize * size);
		},

		drawBackgroundImage = function (qr, context, settings) {

			var size = settings.size,
				w = settings.image.naturalWidth || 1,
				h = settings.image.naturalHeight || 1,
				sh = settings.mSize,
				sw = sh * w / h,
				sl = (1 - sw) * settings.mPosX,
				st = (1 - sh) * settings.mPosY,
				sr = sl + sw,
				sb = st + sh,
				pad = 0.01;

			if (settings.mode === 3) {
				// Strip
				qr.addBlank(0, st - pad, size, sb + pad);
			} else {
				// Box
				qr.addBlank(sl - pad, st - pad, sr + pad, sb + pad);
			}

			context.drawImage(settings.image, sl*size, st*size, sw*size, sh*size);
		},

		drawBackground = function (qr, context, settings) {

			if ($(settings.background).is('img')) {
				context.drawImage(settings.background, 0, 0, settings.size, settings.size);
			} else if (settings.background) {
				context.fillStyle = settings.background;
				context.fillRect(settings.left, settings.top, settings.size, settings.size);
			}

			var mode = settings.mode;
			if (mode === 1 || mode === 2) {
				drawBackgroundLabel(qr, context, settings);
			} else if (mode === 3 || mode === 4) {
				drawBackgroundImage(qr, context, settings);
			}
		},

		drawModuleDefault = function (qr, context, settings, left, top, width, row, col) {

			if (qr.isDark(row, col)) {
				context.rect(left, top, width, width);
			}
		},

		drawModuleRoundedDark = function (ctx, l, t, r, b, rad, nw, ne, se, sw) {

			if (nw) {
				ctx.moveTo(l + rad, t);
			} else {
				ctx.moveTo(l, t);
			}

			if (ne) {
				ctx.lineTo(r - rad, t);
				ctx.arcTo(r, t, r, b, rad);
			} else {
				ctx.lineTo(r, t);
			}

			if (se) {
				ctx.lineTo(r, b - rad);
				ctx.arcTo(r, b, l, b, rad);
			} else {
				ctx.lineTo(r, b);
			}

			if (sw) {
				ctx.lineTo(l + rad, b);
				ctx.arcTo(l, b, l, t, rad);
			} else {
				ctx.lineTo(l, b);
			}

			if (nw) {
				ctx.lineTo(l, t + rad);
				ctx.arcTo(l, t, r, t, rad);
			} else {
				ctx.lineTo(l, t);
			}
		},

		drawModuleRoundendLight = function (ctx, l, t, r, b, rad, nw, ne, se, sw) {

			if (nw) {
				ctx.moveTo(l + rad, t);
				ctx.lineTo(l, t);
				ctx.lineTo(l, t + rad);
				ctx.arcTo(l, t, l + rad, t, rad);
			}

			if (ne) {
				ctx.moveTo(r - rad, t);
				ctx.lineTo(r, t);
				ctx.lineTo(r, t + rad);
				ctx.arcTo(r, t, r - rad, t, rad);
			}

			if (se) {
				ctx.moveTo(r - rad, b);
				ctx.lineTo(r, b);
				ctx.lineTo(r, b - rad);
				ctx.arcTo(r, b, r - rad, b, rad);
			}

			if (sw) {
				ctx.moveTo(l + rad, b);
				ctx.lineTo(l, b);
				ctx.lineTo(l, b - rad);
				ctx.arcTo(l, b, l + rad, b, rad);
			}
		},

		drawModuleRounded = function (qr, context, settings, left, top, width, row, col) {

			var isDark = qr.isDark,
				right = left + width,
				bottom = top + width,
				radius = settings.radius * width,
				rowT = row - 1,
				rowB = row + 1,
				colL = col - 1,
				colR = col + 1,
				center = isDark(row, col),
				northwest = isDark(rowT, colL),
				north = isDark(rowT, col),
				northeast = isDark(rowT, colR),
				east = isDark(row, colR),
				southeast = isDark(rowB, colR),
				south = isDark(rowB, col),
				southwest = isDark(rowB, colL),
				west = isDark(row, colL);

			if (center) {
				drawModuleRoundedDark(context, left, top, right, bottom, radius, !north && !west, !north && !east, !south && !east, !south && !west);
			} else {
				drawModuleRoundendLight(context, left, top, right, bottom, radius, north && west && northwest, north && east && northeast, south && east && southeast, south && west && southwest);
			}
		},

		drawModules = function (qr, context, settings) {

			var moduleCount = qr.moduleCount,
				moduleSize = settings.size / moduleCount,
				fn = drawModuleDefault,
				row, col;

			if (arcToAvailable && settings.radius > 0 && settings.radius <= 0.5) {
				fn = drawModuleRounded;
			}

			context.beginPath();
			for (row = 0; row < moduleCount; row += 1) {
				for (col = 0; col < moduleCount; col += 1) {

					var l = settings.left + col * moduleSize,
						t = settings.top + row * moduleSize,
						w = moduleSize;

					fn(qr, context, settings, l, t, w, row, col);
				}
			}
			if ($(settings.fill).is('img')) {
				context.strokeStyle = 'rgba(0,0,0,0.5)';
				context.lineWidth = 2;
				context.stroke();
				var prev = context.globalCompositeOperation;
				context.globalCompositeOperation = "destination-out";
				context.fill();
				context.globalCompositeOperation = prev;

				context.clip();
				context.drawImage(settings.fill, 0, 0, settings.size, settings.size);
				context.restore();
			} else {
				context.fillStyle = settings.fill;
				context.fill();
			}
		},

		// Draws QR code to the given `canvas` and returns it.
		drawOnCanvas = function (canvas, settings) {

			var qr = createQRCode(settings.text, settings.ecLevel, settings.minVersion, settings.maxVersion, settings.quiet);
			if (!qr) {
				return null;
			}

			var $canvas = $(canvas).data('qrcode', qr),
				context = $canvas[0].getContext('2d');

			drawBackground(qr, context, settings);
			drawModules(qr, context, settings);

			return $canvas;
		},

		// Returns a `canvas` element representing the QR code for the given settings.
		createCanvas = function (settings) {

			var $canvas = $('<canvas/>').attr('width', settings.size).attr('height', settings.size);
			return drawOnCanvas($canvas, settings);
		},

		// Returns an `image` element representing the QR code for the given settings.
		createImage = function (settings) {

			return $('<img/>').attr('src', createCanvas(settings)[0].toDataURL('image/png'));
		},

		// Returns a `div` element representing the QR code for the given settings.
		createDiv = function (settings) {

			var qr = createQRCode(settings.text, settings.ecLevel, settings.minVersion, settings.maxVersion, settings.quiet);
			if (!qr) {
				return null;
			}

				// some shortcuts to improve compression
			var settings_size = settings.size,
				settings_bgColor = settings.background,
				math_floor = Math.floor,

				moduleCount = qr.moduleCount,
				moduleSize = math_floor(settings_size / moduleCount),
				offset = math_floor(0.5 * (settings_size - moduleSize * moduleCount)),

				row, col,

				containerCSS = {
					position: 'relative',
					left: 0,
					top: 0,
					padding: 0,
					margin: 0,
					width: settings_size,
					height: settings_size
				},
				darkCSS = {
					position: 'absolute',
					padding: 0,
					margin: 0,
					width: moduleSize,
					height: moduleSize,
					'background-color': settings.fill
				},

				$div = $('<div/>').data('qrcode', qr).css(containerCSS);

			if (settings_bgColor) {
				$div.css('background-color', settings_bgColor);
			}

			for (row = 0; row < moduleCount; row += 1) {
				for (col = 0; col < moduleCount; col += 1) {
					if (qr.isDark(row, col)) {
						$('<div/>')
							.css(darkCSS)
							.css({
								left: offset + col * moduleSize,
								top: offset + row * moduleSize
							})
							.appendTo($div);
					}
				}
			}

			return $div;
		},

		createHTML = function (settings) {

			if (canvasAvailable && settings.render === 'canvas') {
				return createCanvas(settings);
			} else if (canvasAvailable && settings.render === 'image') {
				return createImage(settings);
			}

			return createDiv(settings);
		},

		// Plugin
		// ======

		// Default settings
		// ----------------
		defaults = {

			// render method: `'canvas'`, `'image'` or `'div'`
			render: 'canvas',

			// version range somewhere in 1 .. 40
			minVersion: 1,
			maxVersion: 40,

			// error correction level: `'L'`, `'M'`, `'Q'` or `'H'`
			ecLevel: 'L',

			// offset in pixel if drawn onto existing canvas
			left: 0,
			top: 0,

			// size in pixel
			size: 200,

			// code color or image element
			fill: '#000',

			// background color or image element, `null` for transparent background
			background: null,

			// content
			text: 'no text',

			// corner radius relative to module width: 0.0 .. 0.5
			radius: 0,

			// quiet zone in modules
			quiet: 0,

			// modes
			// 0: normal
			// 1: label strip
			// 2: label box
			// 3: image strip
			// 4: image box
			mode: 0,

			mSize: 0.1,
			mPosX: 0.5,
			mPosY: 0.5,

			label: 'no label',
			fontname: 'sans',
			fontcolor: '#000',

			image: null
		};

	// Register the plugin
	// -------------------
	$.fn.qrcode = function(options) {

		var settings = $.extend({}, defaults, options);

		return this.each(function () {

			if (this.nodeName.toLowerCase() === 'canvas') {
				drawOnCanvas(this, settings);
			} else {
				$(this).append(createHTML(settings));
			}
		});
	};

	// jQuery.qrcode plug in code ends here

	// QR Code Generator
	// =================
	// @include "qrcode.js"

}(jQuery));
