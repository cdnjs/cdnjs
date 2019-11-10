"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (exports) {
	function negMod(n, m) {
		return (n % m + m) % m;
	}

	function slopeMod(n, m) {
		if (n > m * 2) {
			return slopeMod(n - m * 2, m);
		} else if (n > m) {
			return m * 2 - n;
		} else if (n < 0) {
			return slopeMod(n + m * 2, m);
		} else {
			return n;
		}
	}

	function fromCmyk(to, value) {
		switch (to) {
			case "hex":
				var r = 255 * (1 - value.c) * (1 - value.k);
				var g = 255 * (1 - value.m) * (1 - value.k);
				var b = 255 * (1 - value.y) * (1 - value.k);
				return convert("rgb", "hex", { r: r, g: g, b: b });
				break;
			case "rgb":
				var r = 255 * (1 - value.c) * (1 - value.k);
				var g = 255 * (1 - value.m) * (1 - value.k);
				var b = 255 * (1 - value.y) * (1 - value.k);
				return { r: r, g: g, b: b };
				break;
			case "css-rgb":
				var r = 255 * (1 - value.c) * (1 - value.k);
				var g = 255 * (1 - value.m) * (1 - value.k);
				var b = 255 * (1 - value.y) * (1 - value.k);
				return "rgb(" + Math.round(r) + "," + Math.round(g) + "," + Math.round(b) + ")";
				break;
			case "hsl":
				var r = 255 * (1 - value.c) * (1 - value.k);
				var g = 255 * (1 - value.m) * (1 - value.k);
				var b = 255 * (1 - value.y) * (1 - value.k);
				return convert("rgb", "hsl", { r: r, g: g, b: b });
				break;
			case "css-hsl":
				var r = 255 * (1 - value.c) * (1 - value.k);
				var g = 255 * (1 - value.m) * (1 - value.k);
				var b = 255 * (1 - value.y) * (1 - value.k);
				return convert("rgb", "css-hsl", { r: r, g: g, b: b });
		}
	}

	function fromCssHsl(to, value) {
		value = value.replace(/(hsl\(|\)|%)/g, '').split(",");
		for (var i = 0; i < value.length; i++) {
			value[i] = parseInt(value[i]);
		}
		switch (to) {
			case "hex":
				var rgb = convert("hsl", "rgb", {
					h: value[0],
					s: value[1],
					l: value[2]
				});
				return convert("rgb", "hex", rgb);
				break;
			case "rgb":
				if (value[1] == 0) {
					var grey = value[2] / 100 * 255;
					return {
						r: grey,
						g: grey,
						b: grey
					};
				} else {
					var tempOne, tempTwo, tempHue;
					if (value[2] >= 50) {
						tempOne = value[2] / 100 + value[1] / 100 - value[2] / 100 * (value[1] / 100);
					} else {
						tempOne = value[2] / 100 * (1 + value[1] / 100);
					}
					tempTwo = 2 * (value[2] / 100) - tempOne;
					tempHue = value[0] / 360;
					var tempR = (tempHue + 0.333) % 1;
					var tempG = tempHue;
					var tempB = negMod(tempHue - 0.333, 1);
					var r, g, b;
					if (6 * tempR < 1) {
						r = tempTwo + (tempOne - tempTwo) * 6 * tempR;
					} else if (2 * tempR < 1) {
						r = tempOne;
					} else if (3 * tempR < 2) {
						r = tempTwo + (tempOne - tempTwo) * ((0.666 - tempR) * 6);
					} else {
						r = tempTwo;
					}
					if (6 * tempG < 1) {
						g = tempTwo + (tempOne - tempTwo) * 6 * tempG;
					} else if (2 * tempG < 1) {
						g = tempOne;
					} else if (3 * tempG < 2) {
						g = tempTwo + (tempOne - tempTwo) * ((0.666 - tempG) * 6);
					} else {
						g = tempTwo;
					}
					if (6 * tempB < 1) {
						b = tempTwo + (tempOne - tempTwo) * 6 * tempB;
					} else if (2 * tempB < 1) {
						b = tempOne;
					} else if (3 * tempB < 2) {
						b = tempTwo + (tempOne - tempTwo) * ((0.666 - tempB) * 6);
					} else {
						b = tempTwo;
					}
					if (r < 0) r = 0;
					if (g < 0) g = 0;
					if (b < 0) b = 0;
					return {
						r: r * 255,
						g: g * 255,
						b: b * 255
					};
				}
				break;
			case "css-rgb":
				var rgb = convert("hsl", "rgb", {
					h: value[0],
					s: value[1],
					l: value[2]
				});
				return "rgb(" + Math.round(rgb.r) + "," + Math.round(rgb.g) + "," + Math.round(rgb.b) + ")";
				break;
			case "hsl":
				return {
					h: value[0],
					s: value[1],
					l: value[2]
				};
				break;
			case "cmyk":
				var rgb = convert("css-hsl", "rgb", value);
				var tempR = rgb['r'] / 255;
				var tempG = rgb['g'] / 255;
				var tempB = rgb['b'] / 255;
				var k = 1 - Math.max(tempR, tempG, tempB);
				if (k != 1) {
					var c = (1 - tempR - k) / (1 - k);
					var m = (1 - tempG - k) / (1 - k);
					var y = (1 - tempB - k) / (1 - k);
				} else {
					var c = 0;
					var m = 0;
					var y = 0;
				}
				return { c: c, m: m, y: y, k: k };
				break;
		}
	}

	function fromCssRgb(to, value) {
		value = value.replace(/(rgb\(|\))/g, '').split(",");
		for (var i = 0; i < value.length; i++) {
			value[i] = parseInt(value[i]);
		}
		switch (to) {
			case "hex":
				var r = Math.round(value[0]).toString(16);
				if (r.length == 1) r = "0" + r;
				var g = Math.round(value[1]).toString(16);
				if (g.length == 1) g = "0" + g;
				var b = Math.round(value[2]).toString(16);
				if (b.length == 1) b = "0" + b;
				return "#" + r + g + b;
				break;
			case "rgb":
				return {
					r: value[0],
					g: value[1],
					b: value[2]
				};
				break;
			case "hsl":
				var r = value[0] / 255;
				var g = value[1] / 255;
				var b = value[2] / 255;
				var rgbOrdered = [r, g, b].sort();
				var l = (rgbOrdered[0] + rgbOrdered[2]) / 2 * 100;
				var s, h;
				if (rgbOrdered[0] == rgbOrdered[2]) {
					s = 0;
					h = 0;
				} else {
					if (l >= 50) {
						s = (rgbOrdered[2] - rgbOrdered[0]) / (2.0 - rgbOrdered[2] - rgbOrdered[0]) * 100;
					} else {
						s = (rgbOrdered[2] - rgbOrdered[0]) / (rgbOrdered[2] + rgbOrdered[0]) * 100;
					}
					if (rgbOrdered[2] == r) {
						h = (g - b) / (rgbOrdered[2] - rgbOrdered[0]) * 60;
					} else if (rgbOrdered[2] == g) {
						h = (2 + (b - r) / (rgbOrdered[2] - rgbOrdered[0])) * 60;
					} else {
						h = (4 + (r - g) / (rgbOrdered[2] - rgbOrdered[0])) * 60;
					}
					if (h < 0) {
						h += 360;
					} else if (h > 360) {
						h = h % 360;
					}
				};
				return {
					h: h,
					s: s,
					l: l
				};
				break;
			case "css-hsl":
				var hsl = convert("rgb", "hsl", {
					r: value[0],
					g: value[1],
					b: value[2]
				});
				return "hsl(" + Math.round(hsl.h) + "," + Math.round(hsl.s) + "%," + Math.round(hsl.l) + "%)";
				break;
			case "cmyk":
				var tempR = value[0] / 255;
				var tempG = value[1] / 255;
				var tempB = value[2] / 255;
				var k = 1 - Math.max(tempR, tempG, tempB);
				if (k != 1) {
					var c = (1 - tempR - k) / (1 - k);
					var m = (1 - tempG - k) / (1 - k);
					var y = (1 - tempB - k) / (1 - k);
				} else {
					var c = 0;
					var m = 0;
					var y = 0;
				}
				return { c: c, m: m, y: y, k: k };
				break;
		}
	}

	function fromHex(to, value) {
		value = value.replace('#', '').match(/.{2}/g);
		for (var i = 0; i < value.length; i++) {
			value[i] = parseInt(value[i], 16);
		}
		switch (to) {
			case "rgb":
				return {
					r: value[0],
					g: value[1],
					b: value[2]
				};
				break;
			case "css-rgb":
				return "rgb(" + Math.round(value[0]) + "," + Math.round(value[1]) + "," + Math.round(value[2]) + ")";
				break;
			case "hsl":
				var r = value[0] / 255;
				var g = value[1] / 255;
				var b = value[2] / 255;
				var rgbOrdered = [r, g, b].sort();
				var l = (rgbOrdered[0] + rgbOrdered[2]) / 2 * 100;
				var s, h;
				if (rgbOrdered[0] == rgbOrdered[2]) {
					s = 0;
					h = 0;
				} else {
					if (l >= 50) {
						s = (rgbOrdered[2] - rgbOrdered[0]) / (2.0 - rgbOrdered[2] - rgbOrdered[0]) * 100;
					} else {
						s = (rgbOrdered[2] - rgbOrdered[0]) / (rgbOrdered[2] + rgbOrdered[0]) * 100;
					}
					if (rgbOrdered[2] == r) {
						h = (g - b) / (rgbOrdered[2] - rgbOrdered[0]) * 60;
					} else if (rgbOrdered[2] == g) {
						h = (2 + b - r) / (rgbOrdered[2] - rgbOrdered[0]) * 60;
					} else {
						h = (4 + r - g) / (rgbOrdered[2] - rgbOrdered[0]) * 60;
					}
					if (h < 0) {
						h += 360;
					} else if (h > 360) {
						h = h % 360;
					}
				};
				return {
					h: h,
					s: s,
					l: l
				};
				break;
			case "css-hsl":
				var hsl = convert("rgb", "hsl", {
					r: value[0],
					g: value[1],
					b: value[2]
				});
				return "hsl(" + Math.round(hsl.h) + "," + Math.round(hsl.s) + "%," + Math.round(hsl.l) + "%)";
				break;
			case "cmyk":
				var tempR = value[0] / 255;
				var tempG = value[1] / 255;
				var tempB = value[2] / 255;
				var k = 1 - Math.max(tempR, tempG, tempB);
				if (k != 1) {
					var c = (1 - tempR - k) / (1 - k);
					var m = (1 - tempG - k) / (1 - k);
					var y = (1 - tempB - k) / (1 - k);
				} else {
					var c = 0;
					var m = 0;
					var y = 0;
				}
				return { c: c, m: m, y: y, k: k };
				break;
		}
	}

	function fromHsl(to, value) {
		switch (to) {
			case "hex":
				var rgb = convert("hsl", "rgb", value);
				return convert("rgb", "hex", rgb);
				break;
			case "rgb":
				if (value.s == 0) {
					var grey = value.l / 100 * 255;
					return {
						r: grey,
						g: grey,
						b: grey
					};
				} else {
					var tempOne, tempTwo, tempHue;
					if (value.l >= 50) {
						tempOne = value.l / 100 + value.s / 100 - value.l / 100 * (value.s / 100);
					} else {
						tempOne = value.l / 100 * (1 + value.s / 100);
					}
					tempTwo = 2 * (value.l / 100) - tempOne;
					tempHue = value.h / 360;
					var tempR = (tempHue + 0.333) % 1;
					var tempG = tempHue;
					var tempB = negMod(tempHue - 0.333, 1);
					var r, g, b;
					if (6 * tempR < 1) {
						r = tempTwo + (tempOne - tempTwo) * 6 * tempR;
					} else if (2 * tempR < 1) {
						r = tempOne;
					} else if (3 * tempR < 2) {
						r = tempTwo + (tempOne - tempTwo) * ((0.666 - tempR) * 6);
					} else {
						r = tempTwo;
					}
					if (6 * tempG < 1) {
						g = tempTwo + (tempOne - tempTwo) * 6 * tempG;
					} else if (2 * tempG < 1) {
						g = tempOne;
					} else if (3 * tempG < 2) {
						g = tempTwo + (tempOne - tempTwo) * ((0.666 - tempG) * 6);
					} else {
						g = tempTwo;
					}
					if (6 * tempB < 1) {
						b = tempTwo + (tempOne - tempTwo) * 6 * tempB;
					} else if (2 * tempB < 1) {
						b = tempOne;
					} else if (3 * tempB < 2) {
						b = tempTwo + (tempOne - tempTwo) * ((0.666 - tempB) * 6);
					} else {
						b = tempTwo;
					}
					if (r < 0) r = 0;
					if (g < 0) g = 0;
					if (b < 0) b = 0;
					return {
						r: r * 255,
						g: g * 255,
						b: b * 255
					};
				}
				break;
			case "css-rgb":
				var rgb = convert("hsl", "rgb", value);
				return "rgb(" + Math.round(rgb.r) + "," + Math.round(rgb.g) + "," + Math.round(rgb.b) + ")";
				break;
			case "css-hsl":
				return "hsl(" + Math.round(value.h) + "," + Math.round(value.s) + "%," + Math.round(value.l) + "%)";
				break;
			case "cmyk":
				var rgb = convert("hsl", "rgb", value);
				var tempR = rgb['r'] / 255;
				var tempG = rgb['g'] / 255;
				var tempB = rgb['b'] / 255;
				var k = 1 - Math.max(tempR, tempG, tempB);
				if (k != 1) {
					var c = (1 - tempR - k) / (1 - k);
					var m = (1 - tempG - k) / (1 - k);
					var y = (1 - tempB - k) / (1 - k);
				} else {
					var c = 0;
					var m = 0;
					var y = 0;
				}
				return { c: c, m: m, y: y, k: k };
				break;
		}
	}

	function fromRgb(to, value) {
		switch (to) {
			case "hex":
				var r = Math.round(value['r']).toString(16);
				if (r.length == 1) r = "0" + r;
				var g = Math.round(value['g']).toString(16);
				if (g.length == 1) g = "0" + g;
				var b = Math.round(value['b']).toString(16);
				if (b.length == 1) b = "0" + b;
				return "#" + r + g + b;
				break;
			case "css-rgb":
				return "rgb(" + Math.round(value['r']) + "," + Math.round(value['g']) + "," + Math.round(value['b']) + ")";
				break;
			case "hsl":
				var r = value['r'] / 255;
				var g = value['g'] / 255;
				var b = value['b'] / 255;
				var rgbOrdered = [r, g, b].sort();
				var l = (rgbOrdered[0] + rgbOrdered[2]) / 2 * 100;
				var s, h;
				if (rgbOrdered[0] == rgbOrdered[2]) {
					s = 0;
					h = 0;
				} else {
					if (l >= 50) {
						s = (rgbOrdered[2] - rgbOrdered[0]) / (2.0 - rgbOrdered[2] - rgbOrdered[0]) * 100;
					} else {
						s = (rgbOrdered[2] - rgbOrdered[0]) / (rgbOrdered[2] + rgbOrdered[0]) * 100;
					}
					if (rgbOrdered[2] == r) {
						h = (g - b) / (rgbOrdered[2] - rgbOrdered[0]) * 60;
					} else if (rgbOrdered[2] == g) {
						h = (2 + (b - r) / (rgbOrdered[2] - rgbOrdered[0])) * 60;
					} else {
						h = (4 + (r - g) / (rgbOrdered[2] - rgbOrdered[0])) * 60;
					}
					if (h < 0) {
						h += 360;
					} else if (h > 360) {
						h = h % 360;
					}
				};
				return {
					h: h,
					s: s,
					l: l
				};
				break;
			case "css-hsl":
				var hsl = convert("rgb", "hsl", value);
				return "hsl(" + Math.round(hsl.h) + "," + Math.round(hsl.s) + "%," + Math.round(hsl.l) + "%)";
				break;
			case "cmyk":
				var tempR = value['r'] / 255;
				var tempG = value['g'] / 255;
				var tempB = value['b'] / 255;
				var k = 1 - Math.max(tempR, tempG, tempB);
				if (k != 1) {
					var c = (1 - tempR - k) / (1 - k);
					var m = (1 - tempG - k) / (1 - k);
					var y = (1 - tempB - k) / (1 - k);
				} else {
					var c = 0;
					var m = 0;
					var y = 0;
				}
				return { c: c, m: m, y: y, k: k };
				break;
		}
	}

	function adjacent(mode, deg, amount, colourRef) {
		var colours = [colourRef];
		var colour;
		if (mode != "hsl") {
			colour = convert(mode, "hsl", colourRef);
		} else {
			colour = { h: colourRef.h, s: colourRef.s, l: colourRef.l };
		}
		for (var i = 0; i < amount - 2; i++) {
			colour.h = (colour.h + deg) % 360;
			if (mode != "hsl") {
				var tempColour = convert("hsl", mode, colour);
				colours.push(tempColour);
			} else {
				colours.push({ h: colour.h, s: colour.s, l: colour.l });
			}
		}
		return colours;
	}
	function complementary(mode, colourRef) {
		var colour;
		if (mode != "hsl") {
			colour = convert(mode, "hsl", colourRef);
		} else {
			colour = { h: colourRef.h, s: colourRef.s, l: colourRef.l };
		}
		colour.h = (colour.h + 180) % 360;
		if (mode != "hsl") {
			colour = convert("hsl", mode, colour);
		}
		return colour;
	}

	function contrastRatio(mode, colourRef) {
		var colour;
		if (mode != "rgb") {
			colour = convert(mode, "rgb", colourRef);
		} else {
			colour = _defineProperty({ r: colourRef.r, g: colourRef.g }, "g", colourRef.g);
		}
		var yiq = (colour.r * 299 + colour.g * 587 + colour.b * 114) / 1000;
		if (yiq >= 128) {
			colour = { r: 0, g: 0, b: 0 };
		} else {
			colour = { r: 255, g: 255, b: 255 };
		}
		if (mode != "rgb") {
			colour = convert("rgb", mode, colour);
		}
		return colour;
	}

	function convert(from, to, value) {
		switch (from) {
			case "hex":
				return fromHex(to, value);
				break;
			case "rgb":
				return fromRgb(to, value);
				break;
			case "css-rgb":
				return fromCssRgb(to, value);
				break;
			case "hsl":
				return fromHsl(to, value);
				break;
			case "css-hsl":
				return fromCssHsl(to, value);
				break;
			case "cmyk":
				return fromCmyk(to, value);
				break;
		}
	}

	function fade(mode, amount, fromRef, toRef) {
		amount = amount - 1;
		var colours = [fromRef];
		var fromColour, toColour;
		if (mode != "rgb") {
			fromColour = convert(mode, "rgb", fromRef);
			toColour = convert(mode, "rgb", toRef);
		} else {
			fromColour = { r: fromRef.r, g: fromRef.g, b: fromRef.b };
			toColour = { r: toRef.r, g: toRef.g, b: toRef.b };
		}
		var rDiff = (toColour.r - fromColour.r) / amount;
		var gDiff = (toColour.g - fromColour.g) / amount;
		var bDiff = (toColour.b - fromColour.b) / amount;
		var colour = fromColour;
		for (var i = 0; i < amount - 1; i++) {
			colour.r = slopeMod(colour.r + rDiff, 255);
			colour.g = slopeMod(colour.g + gDiff, 255);
			colour.b = slopeMod(colour.b + bDiff, 255);
			if (mode != "rgb") {
				var tempColour = convert("rgb", mode, colour);
				colours.push(tempColour);
			} else {
				colours.push({ r: colour.r, g: colour.g, b: colour.b });
			}
		}
		colours.push(toRef);
		return colours;
	}

	function greyscale(mode, colourRef) {
		var colour;
		if (mode != "rgb") {
			colour = convert(mode, "rgb", colourRef);
		} else {
			colour = _defineProperty({ r: colourRef.r, g: colourRef.g }, "g", colourRef.g);
		}
		var grey = (colour.r + colour.g + colour.b) / 3;
		colour = { r: grey, g: grey, b: grey };
		if (mode != "rgb") {
			colour = convert("rgb", mode, colour);
		}
		return colour;
	}

	function hue(mode, shift, colourRef) {
		var colour;
		if (mode != "hsl") {
			colour = convert(mode, "hsl", colourRef);
		} else {
			colour = { h: colourRef.h, s: colourRef.s, l: colourRef.l };
		}
		colour.h = (colour.h + shift) % 360;
		if (mode != "hsl") {
			colour = convert("hsl", mode, colour);
		}
		return colour;
	}

	function invert(mode, colourRef) {
		var colour;
		if (mode != "rgb") {
			colour = convert(mode, "rgb", colourRef);
		} else {
			colour = { r: colourRef.r, g: colourRef.g, b: colourRef.b };
		}
		colour.r = negMod(255 - colour.r, 255);
		colour.g = negMod(255 - colour.g, 255);
		colour.b = negMod(255 - colour.b, 255);
		if (mode != "rgb") {
			colour = convert("rgb", mode, colour);
		}
		return colour;
	}

	function matrix(mode, data) {
		this.mode = mode;
		this.data = _typeof(data[0]) == "object" ? data : [data];

		this.map = function (func) {
			for (var x = 0; x < this.data.length; x++) {
				for (var y = 0; y < this.data[x].length; y++) {
					this.data[x][y] = func(this.data[x][y]);
				}
			}
		};
		this.change = function (x, y, value) {
			this.data[y][x] = value;
		};
	}

	function mid(mode, colourOneRef, colourTwoRef) {
		var colourOne, colourTwo;
		if (mode != "hsl") {
			colourOne = convert(mode, "hsl", colourOneRef);
			colourTwo = convert(mode, "hsl", colourTwoRef);
		} else {
			colourOne = { h: colourOneRef.h, s: colourOneRef.s, l: colourOneRef.l };
			colourTwo = { h: colourTwoRef.h, s: colourTwoRef.s, l: colourTwoRef.l };
		}
		var midHue = (colourOne.h + colourTwo.h) / 2;
		var midSat = (colourOne.s + colourTwo.s) / 2;
		var midLight = (colourOne.l + colourTwo.l) / 2;
		var colour = { h: midHue, s: midSat, l: midLight };
		if (mode != "hsl") {
			colour = convert("hsl", mode, colour);
		}
		return colour;
	}

	function saturation(mode, shift, colourRef) {
		var colour;
		if (mode != "hsl") {
			colour = convert(mode, "hsl", colourRef);
		} else {
			colour = { h: colourRef.h, s: colourRef.s, l: colourRef.l };
		}
		colour.s = colour.s + shift;
		if (colour.s < 0) {
			colour.s = 0;
		} else if (colour.s > 100) {
			colour.s = 100;
		}
		if (mode != "hsl") {
			colour = convert("hsl", mode, colour);
		}
		return colour;
	}

	function shade(mode, shift, colourRef) {
		var colour;
		if (mode != "hsl") {
			colour = convert(mode, "hsl", colourRef);
		} else {
			colour = { h: colourRef.h, s: colourRef.s, l: colourRef.l };
		}
		colour.l = colour.l + shift;
		if (colour.l < 0) {
			colour.l = 0;
		} else if (colour.l > 100) {
			colour.l = 100;
		}
		if (mode != "hsl") {
			colour = convert("hsl", mode, colour);
		}
		return colour;
	}

	function tetrad(mode, colourRef) {
		var colours = [colourRef];
		var colour;
		if (mode != "hsl") {
			colour = convert(mode, "hsl", colourRef);
		} else {
			colour = { h: colourRef.h, s: colourRef.s, l: colourRef.l };
		}
		for (var i = 0; i < 3; i++) {
			colour.h = (colour.h + 90) % 360;
			var tempColour;
			if (mode != "hsl") {
				tempColour = convert("hsl", mode, colour);
				colours.push(tempColour);
			} else {
				colours.push({ h: colour.h, s: colour.s, l: colour.l });
			}
		}
		return colours;
	}

	function triad(mode, colourRef) {
		var colours = [colourRef];
		var colour;
		if (mode != "hsl") {
			colour = convert(mode, "hsl", colourRef);
		} else {
			colour = { h: colourRef.h, s: colourRef.s, l: colourRef.l };
		}
		for (var i = 0; i < 2; i++) {
			colour.h = (colour.h + 120) % 360;
			var tempColour;
			if (mode != "hsl") {
				tempColour = convert("hsl", mode, colour);
				colours.push(tempColour);
			} else {
				colours.push({ h: colour.h, s: colour.s, l: colour.l });
			}
		}
		return colours;
	}

	exports.convert = convert;
	exports.complementary = complementary;
	exports.triad = triad;
	exports.tetrad = tetrad;
	exports.invert = invert;
	exports.adjacent = adjacent;
	exports.fade = fade;
	exports.mid = mid;
	exports.hue = hue;
	exports.shade = shade;
	exports.saturation = saturation;
	exports.greyscale = greyscale;
	exports.contrastRatio = contrastRatio;
	exports.matrix = matrix;
})(typeof exports === 'undefined' ? window['chroma'] = {} : exports);