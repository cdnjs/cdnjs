"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

	function determineMode(colour) {
		switch (typeof colour === "undefined" ? "undefined" : _typeof(colour)) {
			case "object":
				if (typeof colour.r != "undefined") {
					return "rgb";
				} else if (typeof colour.l != "undefined") {
					return "hsl";
				} else if (typeof colour.c != "undefined") {
					return "cmyk";
				} else if (typeof colour.v != "undefined") {
					return "hsv";
				} else {
					return null;
				}
				break;
			case "string":
				if (colour[0] === "#") {
					return "hex";
				} else if (colour.indexOf("rgb(") == 0) {
					return "css-rgb";
				} else if (colour.indexOf("hsl(") == 0) {
					return "css-hsl";
				} else {
					return null;
				}
				break;
			default:
				return null;
				break;
		}
	}

	function ready(colour) {
		switch (Object.prototype.toString.call(colour)) {
			case "[object Object]":
			case "[object String]":
				return {
					colour: colour,
					get rgb() {
						return convert("rgb", this.colour);
					},
					get hsl() {
						return convert("hsl", this.colour);
					},
					get hex() {
						return convert("hex", this.colour);
					},
					get cmyk() {
						return convert("cmyk", this.colour);
					},
					get cssrgb() {
						return convert("css-rgb", this.colour);
					},
					get csshsl() {
						return convert("css-hsl", this.colour);
					},
					get hsv() {
						return convert("hsv", this.colour);
					}
				};
				break;
			case "[object Array]":
				return {
					colours: colour,
					get rgb() {
						return this.colours.map(function (colour) {
							return convert("rgb", colour);
						});
					},
					get hsl() {
						return this.colours.map(function (colour) {
							return convert("hsl", colour);
						});
					},
					get hex() {
						return this.colours.map(function (colour) {
							return convert("hex", colour);
						});
					},
					get cmyk() {
						return this.colours.map(function (colour) {
							return convert("cmyk", colour);
						});
					},
					get cssrgb() {
						return this.colours.map(function (colour) {
							return convert("css-rgb", colour);
						});
					},
					get csshsl() {
						return this.colours.map(function (colour) {
							return convert("css-hsl", colour);
						});
					},
					get hsv() {
						return this.colours.map(function (colour) {
							return convert("hsv", colour);
						});
					}
				};
				break;
			default:
				return null;
				break;
		}
	}
	function fromCmyk(to, value) {
		switch (to) {
			case "hex":
				var r = 255 * (1 - value.c) * (1 - value.k);
				var g = 255 * (1 - value.m) * (1 - value.k);
				var b = 255 * (1 - value.y) * (1 - value.k);
				return convert("hex", { r: r, g: g, b: b });
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
				return convert("hsl", { r: r, g: g, b: b });
				break;
			case "css-hsl":
				var r = 255 * (1 - value.c) * (1 - value.k);
				var g = 255 * (1 - value.m) * (1 - value.k);
				var b = 255 * (1 - value.y) * (1 - value.k);
				return convert("css-hsl", { r: r, g: g, b: b });
			case "hsv":
				var r = 255 * (1 - value.c) * (1 - value.k);
				var g = 255 * (1 - value.m) * (1 - value.k);
				var b = 255 * (1 - value.y) * (1 - value.k);
				return convert("hsv", { r: r, g: g, b: b });
				break;
		}
	}

	function fromCssHsl(to, value) {
		value = value.replace(/(hsl\(|\)|%|[\s]*)/g, '').split(",");
		for (var i = 0; i < value.length; i++) {
			value[i] = parseInt(value[i]);
		}
		switch (to) {
			case "hex":
				var rgb = convert("rgb", {
					h: value[0],
					s: value[1],
					l: value[2]
				});
				return convert("hex", rgb);
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
				var rgb = convert("rgb", {
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
				var rgb = convert("rgb", value);
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
			case "hsv":
				return convert("hsv", {
					h: value[0],
					s: value[1],
					l: value[2]
				});
				break;
		}
	}

	function fromCssRgb(to, value) {
		value = value.replace(/((rgb\(|\))|[\s]*)/g, '').split(",");
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
				var hsl = convert("hsl", {
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
			case "hsv":
				var rgb = convert("rgb", {
					r: value[0],
					g: value[1],
					b: value[2]
				});
				return convert("hsv", rgb);
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
			case "hsv":
				var rgb = convert("rgb", value);
				return convert("hsv", rgb);
				break;
		}
	}

	function fromHsl(to, value) {
		switch (to) {
			case "hex":
				var rgb = convert("rgb", value);
				return convert("hex", rgb);
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
				var rgb = convert("rgb", value);
				return "rgb(" + Math.round(rgb.r) + "," + Math.round(rgb.g) + "," + Math.round(rgb.b) + ")";
				break;
			case "css-hsl":
				return "hsl(" + Math.round(value.h) + "," + Math.round(value.s) + "%," + Math.round(value.l) + "%)";
				break;
			case "cmyk":
				var rgb = convert("rgb", value);
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
			case "hsv":
				value.s = value.s / 100;
				value.l = value.l / 100;
				var i = value.s * (value.l < .5 ? value.l : 1 - value.l);

				var h = value.h;
				var s = 2 * i / (value.l + i);
				var v = value.l + i;

				return { h: h, s: s * 100, v: v * 100 };
				break;
		}
	}

	function fromHsv(to, value) {
		switch (to) {
			case "hex":
				var rgb = convert("rgb", value);
				return convert("hex", rgb);
				break;
			case "rgb":
				var r, g, b;
				value.h = value.h / 360;
				value.s = value.s / 100;
				value.v = value.v / 100;
				if (value.h == 0) {
					r = value.v * 255;
					g = value.v * 255;
					b = value.v * 255;
				} else {
					var hsix = value.h * 6;
					if (hsix == 6) hsix = 0;
					var i = Math.round(hsix);
					var var_1 = value.v * (1 - value.s);
					var var_2 = value.v * (1 - value.s * (hsix - i));
					var var_3 = value.v * (1 - value.s * (1 - (hsix - i)));

					var r2, g2, b2;

					if (i == 0) {
						r2 = value.v;
						g2 = var_3;
						b2 = var_1;
					} else if (i == 1) {
						r2 = var_2;
						g2 = value.v;
						b2 = var_1;
					} else if (i == 2) {
						r2 = var_1;
						g2 = value.v;
						b2 = var_3;
					} else if (i == 3) {
						r2 = var_1;
						g2 = var_2;
						b2 = value.v;
					} else if (i == 4) {
						r2 = var_3;
						g2 = var_1;
						b2 = value.v;
					} else {
						r2 = value.v;
						g2 = var_1;
						b2 = var_2;
					}

					r = r2 * 255;
					g = g2 * 255;
					b = b2 * 255;
				}
				return { r: r, g: g, b: b };
				break;
			case "css-rgb":
				var rgb = convert("rgb", value);
				return "rgb(" + Math.round(rgb.r) + "," + Math.round(rgb.g) + "," + Math.round(rgb.b) + ")";
				break;
			case "hsl":
				value.h = value.h / 360;
				value.s = value.s / 100;
				value.v = value.v / 100;
				var h = value.h;
				var s;
				if ((2 - value.s) * value.v < 1) {
					s = value.s * value.v / ((2 - value.s) * value.v);
				} else {
					s = value.s * value.v / (2 - (2 - value.s) * value.v);
				}
				var l = (2 - value.s) * value.v / 2;
				return { h: h * 360, s: s * 100, l: l * 100 };
				break;
			case "css-hsl":
				var hsl = convert("hsl", value);
				return "hsl(" + Math.round(hsl.h) + "," + Math.round(hsl.s) + "%," + Math.round(hsl.l) + "%)";
			case "cmyk":
				var rgb = convert("rgb", value);
				return convert("cmyk", rgb);
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
				var hsl = convert("hsl", value);
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
			case "hsv":
				var r = value.r / 255;
				var g = value.g / 255;
				var b = value.b / 255;

				var min = Math.min(r, g, b);
				var max = Math.max(r, g, b);
				var maxDelta = max - min;

				var v = max;
				var h, s;

				if (maxDelta == 0) {
					h = 0;
					s = 0;
				} else {
					s = maxDelta / max;

					var rDelta = ((max - r) / 6 + maxDelta / 2) / maxDelta;
					var gDelta = ((max - g) / 6 + maxDelta / 2) / maxDelta;
					var bDelta = ((max - b) / 6 + maxDelta / 2) / maxDelta;

					if (r == max) h = bDelta - gDelta;else if (g == max) h = 1 / 3 + rDelta - bDelta;else if (b == max) h = 2 / 3 + gDelta - rDelta;

					if (h < 0) h += 1;
					if (h > 1) h -= 1;
				}
				return { h: h * 360, s: s * 100, v: v * 100 };
				break;
		}
	}

	function adjacent(deg, amount, colourRef) {
		var colour = convert("hsl", colourRef);
		var colours = [{ h: colour.h, s: colour.s, l: colour.l }];

		for (var i = 0; i < amount - 1; i++) {
			colour.h = negMod(colour.h + deg, 360);
			colours.push({ h: colour.h, s: colour.s, l: colour.l });
		}

		return ready(colours);
	}
	function complementary(colourRef) {
		var colour = convert("hsl", colourRef);

		colour.h = (colour.h + 180) % 360;

		return ready(colour);
	}

	function contrast(shift, colourRef) {
		var colour = convert("rgb", colourRef);

		colour.r = ((colour.r / 255.0 - 0.5) * shift + 0.5) * 255.0;
		if (colour.r < 0) {
			colour.r = 0;
		} else if (colour.r > 255) {
			colour.r = 255;
		}

		colour.g = ((colour.g / 255.0 - 0.5) * shift + 0.5) * 255.0;
		if (colour.g < 0) {
			colour.g = 0;
		} else if (colour.g > 255) {
			colour.g = 255;
		}

		colour.b = ((colour.b / 255.0 - 0.5) * shift + 0.5) * 255.0;
		if (colour.b < 0) {
			colour.b = 0;
		} else if (colour.b > 255) {
			colour.b = 255;
		}

		return ready(colour);
	}
	function contrastRatio(colourRef) {
		var colour = convert("rgb", colourRef);

		var yiq = (colour.r * 299 + colour.g * 587 + colour.b * 114) / 1000;
		if (yiq >= 128) {
			colour = { r: 0, g: 0, b: 0 };
		} else {
			colour = { r: 255, g: 255, b: 255 };
		}

		return ready(colour);
	}

	function convert(to, value) {
		if (to == "rgb" || to == "hsl" || to == "css-rgb" || to == "css-hsl" || to == "hex" || to == "cmyk" || to == "hsv") {
			var from = determineMode(value);
			if (from != to) {
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
					case "hsv":
						return fromHsv(to, value);
						break;
				}
			} else {
				return value;
			}
		} else {
			return ready(to);
		}
	}

	function fade(amount, fromRef, toRef) {
		var fromColour = convert("rgb", fromRef);
		var toColour = convert("rgb", toRef);

		var colours = [fromColour];
		amount = amount - 1;

		var rDiff = (toColour.r - fromColour.r) / amount;
		var gDiff = (toColour.g - fromColour.g) / amount;
		var bDiff = (toColour.b - fromColour.b) / amount;
		var colour = { r: fromColour.r, g: fromColour.g, b: fromColour.b };
		for (var i = 0; i < amount - 1; i++) {
			colour.r = slopeMod(colour.r + rDiff, 255);
			colour.g = slopeMod(colour.g + gDiff, 255);
			colour.b = slopeMod(colour.b + bDiff, 255);
			colours.push({ r: colour.r, g: colour.g, b: colour.b });
		}

		colours.push(toColour);

		return ready(colours);
	}

	function greyscale(colourRef) {
		var colour = convert("rgb", colourRef);

		var grey = (colour.r + colour.g + colour.b) / 3;
		colour = { r: grey, g: grey, b: grey };

		return ready(colour);
	}

	function hue(shift, colourRef) {
		var colour = convert("hsl", colourRef);

		colour.h = negMod(colour.h + shift, 360);

		return ready(colour);
	}

	function invert(colourRef) {
		var colour = convert("rgb", colourRef);

		colour.r = negMod(255 - colour.r, 255);
		colour.g = negMod(255 - colour.g, 255);
		colour.b = negMod(255 - colour.b, 255);

		return ready(colour);
	}

	function mid(colourOneRef, colourTwoRef) {
		var colourOne = convert("hsl", colourOneRef);
		var colourTwo = convert("hsl", colourTwoRef);

		var midHue = (colourOne.h + colourTwo.h) / 2;
		var midSat = (colourOne.s + colourTwo.s) / 2;
		var midLight = (colourOne.l + colourTwo.l) / 2;
		var colour = { h: midHue, s: midSat, l: midLight };

		return ready(colour);
	}

	function saturation(shift, colourRef) {
		var colour = convert("hsl", colourRef);

		colour.s = colour.s + shift;
		if (colour.s < 0) {
			colour.s = 0;
		} else if (colour.s > 100) {
			colour.s = 100;
		}

		return ready(colour);
	}

	function shade(shift, colourRef) {
		var colour = convert("hsl", colourRef);

		colour.l = colour.l + shift;
		if (colour.l < 0) {
			colour.l = 0;
		} else if (colour.l > 100) {
			colour.l = 100;
		}

		return ready(colour);
	}

	function tetrad(colourRef) {
		var colour = convert("hsl", colourRef);

		var colours = [{ h: colour.h, s: colour.s, l: colour.l }];
		for (var i = 0; i < 3; i++) {
			colour.h = (colour.h + 90) % 360;
			colours.push({ h: colour.h, s: colour.s, l: colour.l });
		}

		return ready(colours);
	}

	function triad(colourRef) {
		var colour = convert("hsl", colourRef);

		var colours = [{ h: colour.h, s: colour.s, l: colour.l }];
		for (var i = 0; i < 2; i++) {
			colour.h = (colour.h + 120) % 360;
			colours.push({ h: colour.h, s: colour.s, l: colour.l });
		}

		return ready(colours);
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
	exports.contrast = contrast;
	exports.greyscale = greyscale;
	exports.contrastRatio = contrastRatio;
})(typeof exports === 'undefined' ? window['chroma'] = {} : exports);