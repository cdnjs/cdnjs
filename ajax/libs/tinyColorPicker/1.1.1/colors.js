(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory(root);
	} else if (typeof define === 'function' && define.amd) {
		define('colors', [], function () {
			return factory(root);
		});
	} else {
		root.Colors = factory(root);
	}
}(this, function(window, undefined) {
	"use strict"

	var _valueRanges = {
			rgb:   {r: [0, 255], g: [0, 255], b: [0, 255]},
			hsv:   {h: [0, 360], s: [0, 100], v: [0, 100]},
			hsl:   {h: [0, 360], s: [0, 100], l: [0, 100]},
			alpha: {alpha: [0, 1]},
			HEX:   {HEX: [0, 16777215]} // maybe we don't need this
		},

		_Math = window.Math,
		_round = _Math.round,

		_instance = {},
		_colors = {},

		grey = {r: 0.298954, g: 0.586434, b: 0.114612}, // CIE-XYZ 1931
		luminance = {r: 0.2126, g: 0.7152, b: 0.0722}, // W3C 2.0

		Colors = function(options) {
			this.colors = {RND: {}};
			this.options = {
				color: 'rgba(0,0,0,0)', // init value(s)...
				grey: grey,
				luminance: luminance,
				valueRanges: _valueRanges
				// customBG: '#808080'
				// convertCallback: undefined,
				// allMixDetails: false
			};
			initInstance(this, options || {});
		},
		initInstance = function(THIS, options) {
			var importColor,
				_options = THIS.options,
				customBG;

			focusInstance(THIS);
			for (var option in options) {
				if (options[option] !== undefined) _options[option] = options[option];
			}
			customBG = _options.customBG;
			_options.customBG = (typeof customBG === 'string') ? ColorConverter.txt2color(customBG).rgb : customBG;
			_colors = setColor(THIS.colors, _options.color, undefined, true); // THIS.colors = _colors = 
		},
		focusInstance = function(THIS) {
			if (_instance !== THIS) {
				_instance = THIS;
				_colors = THIS.colors;
			}
		};

	Colors.prototype.setColor = function(newCol, type, alpha) {
		focusInstance(this);
		if (newCol) {
			return setColor(this.colors, newCol, type, undefined, alpha);
		} else {
			if (alpha !== undefined) {
				this.colors.alpha = limitValue(alpha, 0, 1);
			}
			return convertColors(type);
		}
	};

	Colors.prototype.setCustomBackground = function(col) { // wild gues,... check again...
		focusInstance(this); // needed???
		this.options.customBG = (typeof col === 'string') ? ColorConverter.txt2color(col).rgb : col;
		// return setColor(this.colors, this.options.customBG, 'rgb', true); // !!!!RGB
		return setColor(this.colors, undefined, 'rgb'); // just recalculate existing
	};

	Colors.prototype.saveAsBackground = function() { // alpha
		focusInstance(this); // needed???
		// return setColor(this.colors, this.colors.RND.rgb, 'rgb', true);
		return setColor(this.colors, undefined, 'rgb', true);
	};

	Colors.prototype.toString = function(colorMode, forceAlpha) {
		return ColorConverter.color2text((colorMode || 'rgb').toLowerCase(), this.colors, forceAlpha);
	};

	// ------------------------------------------------------ //
	// ---------- Color calculation related stuff  ---------- //
	// -------------------------------------------------------//

	function setColor(colors, color, type, save, alpha) { // color only full range
		if (typeof color === 'string') {
			var color = ColorConverter.txt2color(color); // new object
			type = color.type;
			_colors[type] = color[type];
			alpha = alpha !== undefined ? alpha : color.alpha;
		} else if (color) {
			for (var n in color) {
				colors[type][n] = limitValue(color[n] / _valueRanges[type][n][1], 0 , 1);
			}
		}
		if (alpha !== undefined) {
			colors.alpha = limitValue(+alpha, 0, 1);
		}
		return convertColors(type, save ? colors : undefined);
	}

	function saveAsBackground(RGB, rgb, alpha) {
		var grey = _instance.options.grey,
			color = {};

		color.RGB = {r: RGB.r, g: RGB.g, b: RGB.b};
		color.rgb = {r: rgb.r, g: rgb.g, b: rgb.b};
		color.alpha = alpha;
		// color.RGBLuminance = getLuminance(RGB);
		color.equivalentGrey = _round(grey.r * RGB.r + grey.g * RGB.g + grey.b * RGB.b);

		color.rgbaMixBlack = mixColors(rgb, {r: 0, g: 0, b: 0}, alpha, 1);
		color.rgbaMixWhite = mixColors(rgb, {r: 1, g: 1, b: 1}, alpha, 1);
		color.rgbaMixBlack.luminance = getLuminance(color.rgbaMixBlack, true);
		color.rgbaMixWhite.luminance = getLuminance(color.rgbaMixWhite, true);

		if (_instance.options.customBG) {
			color.rgbaMixCustom = mixColors(rgb, _instance.options.customBG, alpha, 1);
			color.rgbaMixCustom.luminance = getLuminance(color.rgbaMixCustom, true);
			_instance.options.customBG.luminance = getLuminance(_instance.options.customBG, true);
		}

		return color;
	}

	function convertColors(type, colorObj) {
		// console.time('convertColors');
		var colors = colorObj || _colors,
			convert = ColorConverter,
			options = _instance.options,
			ranges = _valueRanges,
			RND = colors.RND,
			// type = colorType, // || _mode.type,
			modes, mode = '', from = '', // value = '',
			exceptions = {hsl: 'hsv', rgb: type},
			RGB = RND.rgb, SAVE, SMART;

		if (type !== 'alpha') {
			for (var typ in ranges) {
				if (!ranges[typ][typ]) { // no alpha|HEX
					if (type !== typ) {
						from = exceptions[typ] || 'rgb';
						colors[typ] = convert[from + '2' + typ](colors[from]);
					}

					if (!RND[typ]) RND[typ] = {};
					modes = colors[typ];
					for(mode in modes) {
						RND[typ][mode] = _round(modes[mode] * ranges[typ][mode][1]);
					}
				}
			}

			RGB = RND.rgb;
			colors.HEX = convert.RGB2HEX(RGB);
			colors.equivalentGrey =
				options.grey.r * colors.rgb.r +
				options.grey.g * colors.rgb.g +
				options.grey.b * colors.rgb.b;
			colors.webSave = SAVE = getClosestWebColor(RGB, 51);
			// colors.webSave.HEX = convert.RGB2HEX(colors.webSave);
			colors.webSmart = SMART = getClosestWebColor(RGB, 17);
			// colors.webSmart.HEX = convert.RGB2HEX(colors.webSmart);
			colors.saveColor =
				RGB.r === SAVE.r && RGB.g === SAVE.g && RGB.b === SAVE.b  ? 'web save' :
				RGB.r === SMART.r && RGB.g === SMART.g && RGB.b === SMART.b  ? 'web smart' : '';
			colors.hueRGB = ColorConverter.hue2RGB(colors.hsv.h);

			if (colorObj) {
				colors.background = saveAsBackground(RGB, colors.rgb, colors.alpha);
			}
		} // else RGB = RND.rgb;

		var rgb = colors.rgb, // for better minification...
			alpha = colors.alpha,
			luminance = 'luminance',
			background = colors.background,
			rgbaMixBlack, rgbaMixWhite, rgbaMixCustom, 
			rgbaMixBG, rgbaMixBGMixBlack, rgbaMixBGMixWhite, rgbaMixBGMixCustom;

		rgbaMixBlack = mixColors(rgb, {r: 0, g: 0, b: 0}, alpha, 1);
		rgbaMixBlack[luminance] = getLuminance(rgbaMixBlack, true);
		colors.rgbaMixBlack = rgbaMixBlack;

		rgbaMixWhite = mixColors(rgb, {r: 1, g: 1, b: 1}, alpha, 1);
		rgbaMixWhite[luminance] = getLuminance(rgbaMixWhite, true);
		colors.rgbaMixWhite = rgbaMixWhite;

		if (options.customBG) {
			rgbaMixBGMixCustom = mixColors(rgb, background.rgbaMixCustom, alpha, 1);
			rgbaMixBGMixCustom[luminance] = getLuminance(rgbaMixBGMixCustom, true);
			rgbaMixBGMixCustom.WCAG2Ratio = getWCAG2Ratio(rgbaMixBGMixCustom[luminance],
				background.rgbaMixCustom[luminance]);
			colors.rgbaMixBGMixCustom = rgbaMixBGMixCustom;
			/* ------ */
			rgbaMixBGMixCustom.luminanceDelta = _Math.abs(
				rgbaMixBGMixCustom[luminance] - background.rgbaMixCustom[luminance]);
			rgbaMixBGMixCustom.hueDelta = getHueDelta(background.rgbaMixCustom, rgbaMixBGMixCustom, true);
			/* ------ */
		}

		colors.RGBLuminance = getLuminance(RGB);
		colors.HUELuminance = getLuminance(colors.hueRGB);

		// renderVars.readyToRender = true;
		if (options.convertCallback) {
			options.convertCallback(colors, type); //, convert); //, _mode);
		}

		// console.timeEnd('convertColors')
		// if (colorObj)
		return colors;
	}


	// ------------------------------------------------------ //
	// ------------------ color conversion ------------------ //
	// -------------------------------------------------------//

	var ColorConverter = {
		txt2color: function(txt) {
			var color = {},
				parts = txt.replace(/(?:#|\)|%)/g, '').split('('),
				values = (parts[1] || '').split(/,\s*/),
				type = parts[1] ? parts[0].substr(0, 3) : 'rgb',
				m = '';

			color.type = type;
			color[type] = {};
			if (parts[1]) {
				for (var n = 3; n--; ) {
					m = type[n] || type.charAt(n); // IE7
					color[type][m] = +values[n] / _valueRanges[type][m][1];
				}
			} else {
				color.rgb = ColorConverter.HEX2rgb(parts[0]);
			}
			// color.color = color[type];
			color.alpha = values[3] ? +values[3] : 1;

			return color;
		},

		color2text: function(colorMode, colors, forceAlpha) {
			var alpha = forceAlpha !== false && _round(colors.alpha * 100) / 100,
				hasAlpha = typeof alpha === 'number' &&
					forceAlpha !== false && (forceAlpha || alpha !== 1),
				RGB = colors.RND.rgb,
				HSL = colors.RND.hsl,
				shouldBeHex = colorMode === 'hex' && hasAlpha,
				isHex = colorMode === 'hex' && !shouldBeHex,
				isRgb = colorMode === 'rgb' || shouldBeHex,
				innerText = isRgb ? RGB.r + ', ' + RGB.g + ', ' + RGB.b :
					!isHex ? HSL.h + ', ' + HSL.s + '%, ' + HSL.l + '%' :
					'#' + colors.HEX;

			return isHex ? innerText : (shouldBeHex ? 'rgb' : colorMode) + 
				(hasAlpha ? 'a' : '') + '(' + innerText +
				(hasAlpha ? ', ' + alpha : '') + ')';
		},

		RGB2HEX: function(RGB) {
			return (
				(RGB.r < 16 ? '0' : '') + RGB.r.toString(16) +
				(RGB.g < 16 ? '0' : '') + RGB.g.toString(16) +
				(RGB.b < 16 ? '0' : '') + RGB.b.toString(16)
			).toUpperCase();
		},

		HEX2rgb: function(HEX) {
			HEX = HEX.split(''); // IE7
			return {
				r: +('0x' + HEX[0] + HEX[HEX[3] ? 1 : 0]) / 255,
				g: +('0x' + HEX[HEX[3] ? 2 : 1] + (HEX[3] || HEX[1])) / 255,
				b: +('0x' + (HEX[4] || HEX[2]) + (HEX[5] || HEX[2])) / 255
			};
		},

		hue2RGB: function(hue) {
			var h = hue * 6,
				mod = ~~h % 6, // _Math.floor(h) -> faster in most browsers
				i = h === 6 ? 0 : (h - mod);

			return {
				r: _round([1, 1 - i, 0, 0, i, 1][mod] * 255),
				g: _round([i, 1, 1, 1 - i, 0, 0][mod] * 255),
				b: _round([0, 0, i, 1, 1, 1 - i][mod] * 255)
			};
		},

		// ------------------------ HSV ------------------------ //

		rgb2hsv: function(rgb) { // faster
			var r = rgb.r,
				g = rgb.g,
				b = rgb.b,
				k = 0, chroma, min, s;

			if (g < b) {
				g = b + (b = g, 0);
				k = -1;
			}
			min = b;
			if (r < g) {
				r = g + (g = r, 0);
				k = -2 / 6 - k;
				min = _Math.min(g, b); // g < b ? g : b; ???
			}
			chroma = r - min;
			s = r ? (chroma / r) : 0;
			return {
				h: s < 1e-15 ? ((_colors && _colors.hsl && _colors.hsl.h) || 0) :
					chroma ? _Math.abs(k + (g - b) / (6 * chroma)) : 0,
				s: r ? (chroma / r) : ((_colors && _colors.hsv && _colors.hsv.s) || 0), // ??_colors.hsv.s || 0
				v: r
			};
		},

		hsv2rgb: function(hsv) {
			var h = hsv.h * 6,
				s = hsv.s,
				v = hsv.v,
				i = ~~h, // _Math.floor(h) -> faster in most browsers
				f = h - i,
				p = v * (1 - s),
				q = v * (1 - f * s),
				t = v * (1 - (1 - f) * s),
				mod = i % 6;

			return {
				r: [v, q, p, p, t, v][mod],
				g: [t, v, v, q, p, p][mod],
				b: [p, p, t, v, v, q][mod]
			};
		},

		// ------------------------ HSL ------------------------ //

		hsv2hsl: function(hsv) {
			var l = (2 - hsv.s) * hsv.v,
				s = hsv.s * hsv.v;

			s = !hsv.s ? 0 : l < 1 ? (l ? s / l : 0) : s / (2 - l);

			return {
				h: hsv.h,
				s: !hsv.v && !s ? ((_colors && _colors.hsl && _colors.hsl.s) || 0) : s, // ???
				l: l / 2
			};
		},

		rgb2hsl: function(rgb, dependent) { // not used in Color
			var hsv = ColorConverter.rgb2hsv(rgb);

			return ColorConverter.hsv2hsl(dependent ? hsv : (_colors.hsv = hsv));
		},

		hsl2rgb: function(hsl) {
			var h = hsl.h * 6,
				s = hsl.s,
				l = hsl.l,
				v = l < 0.5 ? l * (1 + s) : (l + s) - (s * l),
				m = l + l - v,
				sv = v ? ((v - m) / v) : 0,
				sextant = ~~h, // _Math.floor(h) -> faster in most browsers
				fract = h - sextant,
				vsf = v * sv * fract,
				t = m + vsf,
				q = v - vsf,
				mod = sextant % 6;

			return {
				r: [v, q, m, m, t, v][mod],
				g: [t, v, v, q, m, m][mod],
				b: [m, m, t, v, v, q][mod]
			};
		}
	};

	// ------------------------------------------------------ //
	// ------------------ helper functions ------------------ //
	// -------------------------------------------------------//

	function getClosestWebColor(RGB, val) {
		var out = {},
			tmp = 0,
			half = val / 2;

		for (var n in RGB) {
			tmp = RGB[n] % val; // 51 = 'web save', 17 = 'web smart'
			out[n] = RGB[n] + (tmp > half ? val - tmp : -tmp);
		}
		return out;
	}

	function getHueDelta(rgb1, rgb2, nominal) {
		return (_Math.max(rgb1.r - rgb2.r, rgb2.r - rgb1.r) +
				_Math.max(rgb1.g - rgb2.g, rgb2.g - rgb1.g) +
				_Math.max(rgb1.b - rgb2.b, rgb2.b - rgb1.b)) * (nominal ? 255 : 1) / 765;
	}

	function getLuminance(rgb, normalized) {
		var div = normalized ? 1 : 255,
			RGB = [rgb.r / div, rgb.g / div, rgb.b / div],
			luminance = _instance.options.luminance;

		for (var i = RGB.length; i--; ) {
			RGB[i] = RGB[i] <= 0.03928 ? RGB[i] / 12.92 : _Math.pow(((RGB[i] + 0.055) / 1.055), 2.4);
		}
		return ((luminance.r * RGB[0]) + (luminance.g * RGB[1]) + (luminance.b * RGB[2]));
	}

	function mixColors(topColor, bottomColor, topAlpha, bottomAlpha) {
		var newColor = {},
			alphaTop = (topAlpha !== undefined ? topAlpha : 1),
			alphaBottom = (bottomAlpha !== undefined ? bottomAlpha : 1),
			alpha = alphaTop + alphaBottom * (1 - alphaTop); // 1 - (1 - alphaTop) * (1 - alphaBottom);

		for(var n in topColor) {
			newColor[n] = (topColor[n] * alphaTop + bottomColor[n] * alphaBottom * (1 - alphaTop)) / alpha;
		}
		newColor.a = alpha;
		return newColor;
	}

	function getWCAG2Ratio(lum1, lum2) {
		var ratio = 1;

		if (lum1 >= lum2) {
			ratio = (lum1 + 0.05) / (lum2 + 0.05);
		} else {
			ratio = (lum2 + 0.05) / (lum1 + 0.05);
		}
		return _round(ratio * 100) / 100;
	}

	function limitValue(value, min, max) {
		// return _Math.max(min, _Math.min(max, value)); // faster??
		return (value > max ? max : value < min ? min : value);
	}

	return Colors;
}));