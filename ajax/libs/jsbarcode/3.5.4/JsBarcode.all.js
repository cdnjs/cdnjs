/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Barcode = function Barcode(data, options) {
	_classCallCheck(this, Barcode);

	this.data = data;
	this.text = options.text || data;
	this.options = options;
};

exports.default = Barcode;

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EANencoder = function () {
	function EANencoder() {
		_classCallCheck(this, EANencoder);

		// Standard start end and middle bits
		this.startBin = "101";
		this.endBin = "101";
		this.middleBin = "01010";

		// The L (left) type of encoding
		this.Lbinary = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];

		// The G type of encoding
		this.Gbinary = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];

		// The R (right) type of encoding
		this.Rbinary = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
	}

	// Convert a numberarray to the representing


	EANencoder.prototype.encode = function encode(number, structure, separator) {
		// Create the variable that should be returned at the end of the function
		var result = "";

		// Make sure that the separator is set
		separator = separator || "";

		// Loop all the numbers
		for (var i = 0; i < number.length; i++) {
			// Using the L, G or R encoding and add it to the returning variable
			if (structure[i] == "L") {
				result += this.Lbinary[number[i]];
			} else if (structure[i] == "G") {
				result += this.Gbinary[number[i]];
			} else if (structure[i] == "R") {
				result += this.Rbinary[number[i]];
			}

			// Add separator in between encodings
			if (i < number.length - 1) {
				result += separator;
			}
		}
		return result;
	};

	return EANencoder;
}();

exports.default = EANencoder;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

var MSI = function (_Barcode) {
	_inherits(MSI, _Barcode);

	function MSI(data, options) {
		_classCallCheck(this, MSI);

		return _possibleConstructorReturn(this, _Barcode.call(this, data, options));
	}

	MSI.prototype.encode = function encode() {
		// Start bits
		var ret = "110";

		for (var i = 0; i < this.data.length; i++) {
			// Convert the character to binary (always 4 binary digits)
			var digit = parseInt(this.data[i]);
			var bin = digit.toString(2);
			bin = addZeroes(bin, 4 - bin.length);

			// Add 100 for every zero and 110 for every 1
			for (var b = 0; b < bin.length; b++) {
				ret += bin[b] == "0" ? "100" : "110";
			}
		}

		// End bits
		ret += "1001";

		return {
			data: ret,
			text: this.text
		};
	};

	MSI.prototype.valid = function valid() {
		return this.data.search(/^[0-9]+$/) !== -1;
	};

	return MSI;
}(_Barcode3.default);

function addZeroes(number, n) {
	for (var i = 0; i < n; i++) {
		number = "0" + number;
	}
	return number;
}

exports.default = MSI;

/***/ },
/* 3 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = merge;


function merge(old, replaceObj) {
	var newMerge = {};
	var k;
	for (k in old) {
		if (old.hasOwnProperty(k)) {
			newMerge[k] = old[k];
		}
	}
	for (k in replaceObj) {
		if (replaceObj.hasOwnProperty(k) && typeof replaceObj[k] !== "undefined") {
			newMerge[k] = replaceObj[k];
		}
	}
	return newMerge;
}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // This is the master class, it does require the start code to be
// included in the string

var CODE128 = function (_Barcode) {
	_inherits(CODE128, _Barcode);

	function CODE128(data, options) {
		_classCallCheck(this, CODE128);

		// Fill the bytes variable with the ascii codes of string
		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data.substring(1), options));

		_this.bytes = [];
		for (var i = 0; i < data.length; ++i) {
			_this.bytes.push(data.charCodeAt(i));
		}

		// Data for each character, the last characters will not be encoded but are used for error correction
		// Numbers encode to (n + 1000) -> binary; 740 -> (740 + 1000).toString(2) -> "11011001100"
		_this.encodings = [// + 1000
		740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604, 572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764, 652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590, 304, 112, 94, 416, 128, 122, 672, 576, 570, 464, 422, 134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880, 862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200, 158, 68, 62, 424, 412, 232, 218, 76, 74, 554, 616, 978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940, 938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954, 502, 518, 886, 966, /* Start codes */668, 680, 692, 5379];
		return _this;
	}

	// The public encoding function


	CODE128.prototype.encode = function encode() {
		var encodingResult;
		var bytes = this.bytes;
		// Remove the startcode from the bytes and set its index
		var startIndex = bytes.shift() - 105;

		// Start encode with the right type
		if (startIndex === 103) {
			encodingResult = this.nextA(bytes, 1);
		} else if (startIndex === 104) {
			encodingResult = this.nextB(bytes, 1);
		} else if (startIndex === 105) {
			encodingResult = this.nextC(bytes, 1);
		}

		return {
			text: this.text == this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
			data:
			// Add the start bits
			this.getEncoding(startIndex) +
			// Add the encoded bits
			encodingResult.result +
			// Add the checksum
			this.getEncoding((encodingResult.checksum + startIndex) % 103) +
			// Add the end bits
			this.getEncoding(106)
		};
	};

	CODE128.prototype.getEncoding = function getEncoding(n) {
		return this.encodings[n] ? (this.encodings[n] + 1000).toString(2) : '';
	};

	// Use the regexp variable for validation


	CODE128.prototype.valid = function valid() {
		// ASCII value ranges 0-127, 200-211
		return this.data.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1;
	};

	CODE128.prototype.nextA = function nextA(bytes, depth) {
		if (bytes.length <= 0) {
			return { "result": "", "checksum": 0 };
		}

		var next, index;

		// Special characters
		if (bytes[0] >= 200) {
			index = bytes[0] - 105;

			// Remove first element
			bytes.shift();

			// Swap to CODE128C
			if (index === 99) {
				next = this.nextC(bytes, depth + 1);
			}
			// Swap to CODE128B
			else if (index === 100) {
					next = this.nextB(bytes, depth + 1);
				}
				// Shift
				else if (index === 98) {
						// Convert the next character so that is encoded correctly
						bytes[0] = bytes[0] > 95 ? bytes[0] - 96 : bytes[0];
						next = this.nextA(bytes, depth + 1);
					}
					// Continue on CODE128A but encode a special character
					else {
							next = this.nextA(bytes, depth + 1);
						}
		}
		// Continue encoding of CODE128A
		else {
				var charCode = bytes[0];
				index = charCode < 32 ? charCode + 64 : charCode - 32;

				// Remove first element
				bytes.shift();

				next = this.nextA(bytes, depth + 1);
			}

		// Get the correct binary encoding and calculate the weight
		var enc = this.getEncoding(index);
		var weight = index * depth;

		return {
			"result": enc + next.result,
			"checksum": weight + next.checksum
		};
	};

	CODE128.prototype.nextB = function nextB(bytes, depth) {
		if (bytes.length <= 0) {
			return { "result": "", "checksum": 0 };
		}

		var next, index;

		// Special characters
		if (bytes[0] >= 200) {
			index = bytes[0] - 105;

			// Remove first element
			bytes.shift();

			// Swap to CODE128C
			if (index === 99) {
				next = this.nextC(bytes, depth + 1);
			}
			// Swap to CODE128A
			else if (index === 101) {
					next = this.nextA(bytes, depth + 1);
				}
				// Shift
				else if (index === 98) {
						// Convert the next character so that is encoded correctly
						bytes[0] = bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
						next = this.nextB(bytes, depth + 1);
					}
					// Continue on CODE128B but encode a special character
					else {
							next = this.nextB(bytes, depth + 1);
						}
		}
		// Continue encoding of CODE128B
		else {
				index = bytes[0] - 32;
				bytes.shift();
				next = this.nextB(bytes, depth + 1);
			}

		// Get the correct binary encoding and calculate the weight
		var enc = this.getEncoding(index);
		var weight = index * depth;

		return { "result": enc + next.result, "checksum": weight + next.checksum };
	};

	CODE128.prototype.nextC = function nextC(bytes, depth) {
		if (bytes.length <= 0) {
			return { "result": "", "checksum": 0 };
		}

		var next, index;

		// Special characters
		if (bytes[0] >= 200) {
			index = bytes[0] - 105;

			// Remove first element
			bytes.shift();

			// Swap to CODE128B
			if (index === 100) {
				next = this.nextB(bytes, depth + 1);
			}
			// Swap to CODE128A
			else if (index === 101) {
					next = this.nextA(bytes, depth + 1);
				}
				// Continue on CODE128C but encode a special character
				else {
						next = this.nextC(bytes, depth + 1);
					}
		}
		// Continue encoding of CODE128C
		else {
				index = (bytes[0] - 48) * 10 + bytes[1] - 48;
				bytes.shift();
				bytes.shift();
				next = this.nextC(bytes, depth + 1);
			}

		// Get the correct binary encoding and calculate the weight
		var enc = this.getEncoding(index);
		var weight = index * depth;

		return { "result": enc + next.result, "checksum": weight + next.checksum };
	};

	return CODE128;
}(_Barcode3.default);

exports.default = CODE128;

/***/ },
/* 5 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mod10 = mod10;
exports.mod11 = mod11;
function mod10(number) {
	var sum = 0;
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[i]);
		if ((i + number.length) % 2 === 0) {
			sum += n;
		} else {
			sum += n * 2 % 10 + Math.floor(n * 2 / 10);
		}
	}
	return (10 - sum % 10) % 10;
}

function mod11(number) {
	var sum = 0;
	var weights = [2, 3, 4, 5, 6, 7];
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[number.length - 1 - i]);
		sum += weights[i % weights.length] * n;
	}
	return (11 - sum % 11) % 11;
}

/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidInputException = function (_Error) {
	_inherits(InvalidInputException, _Error);

	function InvalidInputException(symbology, input) {
		_classCallCheck(this, InvalidInputException);

		var _this = _possibleConstructorReturn(this, _Error.call(this));

		_this.name = "InvalidInputException";

		_this.symbology = symbology;
		_this.input = input;

		_this.message = '"' + _this.input + '" is not a valid input for ' + _this.symbology;
		return _this;
	}

	return InvalidInputException;
}(Error);

var InvalidElementException = function (_Error2) {
	_inherits(InvalidElementException, _Error2);

	function InvalidElementException() {
		_classCallCheck(this, InvalidElementException);

		var _this2 = _possibleConstructorReturn(this, _Error2.call(this));

		_this2.name = "InvalidElementException";
		_this2.message = "Not supported type to render on";
		return _this2;
	}

	return InvalidElementException;
}(Error);

var NoElementException = function (_Error3) {
	_inherits(NoElementException, _Error3);

	function NoElementException() {
		_classCallCheck(this, NoElementException);

		var _this3 = _possibleConstructorReturn(this, _Error3.call(this));

		_this3.name = "NoElementException";
		_this3.message = "No element to render on.";
		return _this3;
	}

	return NoElementException;
}(Error);

exports.InvalidInputException = InvalidInputException;
exports.InvalidElementException = InvalidElementException;
exports.NoElementException = NoElementException;

/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var defaults = {
	width: 2,
	height: 100,
	format: "auto",
	displayValue: true,
	fontOptions: "",
	font: "monospace",
	text: undefined,
	textAlign: "center",
	textPosition: "bottom",
	textMargin: 2,
	fontSize: 20,
	background: "#ffffff",
	lineColor: "#000000",
	margin: 10,
	marginTop: undefined,
	marginBottom: undefined,
	marginLeft: undefined,
	marginRight: undefined,
	valid: function valid() {}
};

exports.default = defaults;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getTotalWidthOfEncodings = exports.calculateEncodingAttributes = exports.getBarcodePadding = exports.getEncodingHeight = exports.getMaximumHeightOfEncodings = undefined;

var _merge = __webpack_require__(3);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEncodingHeight(encoding, options) {
	return options.height + (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
}

function getBarcodePadding(textWidth, barcodeWidth, options) {
	if (options.displayValue && barcodeWidth < textWidth) {
		if (options.textAlign == "center") {
			return Math.floor((textWidth - barcodeWidth) / 2);
		} else if (options.textAlign == "left") {
			return 0;
		} else if (options.textAlign == "right") {
			return Math.floor(textWidth - barcodeWidth);
		}
	}
	return 0;
}

function calculateEncodingAttributes(encodings, barcodeOptions, context) {
	for (var i = 0; i < encodings.length; i++) {
		var encoding = encodings[i];
		var options = (0, _merge2.default)(barcodeOptions, encoding.options);

		// Calculate the width of the encoding
		var textWidth = messureText(encoding.text, options, context);
		var barcodeWidth = encoding.data.length * options.width;
		encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

		encoding.height = getEncodingHeight(encoding, options);

		encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
	}
}

function getTotalWidthOfEncodings(encodings) {
	var totalWidth = 0;
	for (var i = 0; i < encodings.length; i++) {
		totalWidth += encodings[i].width;
	}
	return totalWidth;
}

function getMaximumHeightOfEncodings(encodings) {
	var maxHeight = 0;
	for (var i = 0; i < encodings.length; i++) {
		if (encodings[i].height > maxHeight) {
			maxHeight = encodings[i].height;
		}
	}
	return maxHeight;
}

function messureText(string, options, context) {
	var ctx;
	if (typeof context === "undefined") {
		ctx = document.createElement("canvas").getContext("2d");
	} else {
		ctx = context;
	}

	ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

	// Calculate the width of the encoding
	var size = ctx.measureText(string).width;

	return size;
}

exports.getMaximumHeightOfEncodings = getMaximumHeightOfEncodings;
exports.getEncodingHeight = getEncodingHeight;
exports.getBarcodePadding = getBarcodePadding;
exports.calculateEncodingAttributes = calculateEncodingAttributes;
exports.getTotalWidthOfEncodings = getTotalWidthOfEncodings;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CODE = __webpack_require__(19);

var _CODE2 = __webpack_require__(18);

var _EAN_UPC = __webpack_require__(25);

var _ITF = __webpack_require__(28);

var _ITF2 = __webpack_require__(27);

var _MSI = __webpack_require__(33);

var _pharmacode = __webpack_require__(35);

var _codabar = __webpack_require__(34);

var _GenericBarcode = __webpack_require__(26);

exports.default = {
	CODE39: _CODE.CODE39,
	CODE128: _CODE2.CODE128, CODE128A: _CODE2.CODE128A, CODE128B: _CODE2.CODE128B, CODE128C: _CODE2.CODE128C,
	EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC,
	ITF14: _ITF.ITF14,
	ITF: _ITF2.ITF,
	MSI: _MSI.MSI, MSI10: _MSI.MSI10, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010, MSI1110: _MSI.MSI1110,
	pharmacode: _pharmacode.pharmacode,
	codabar: _codabar.codabar,
	GenericBarcode: _GenericBarcode.GenericBarcode
};

/***/ },
/* 10 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint no-console: 0 */

var ErrorHandler = function () {
	function ErrorHandler(api) {
		_classCallCheck(this, ErrorHandler);

		this.api = api;
	}

	ErrorHandler.prototype.handleCatch = function handleCatch(e) {
		// If babel supported extending of Error in a correct way instanceof would be used here
		if (e.name === "InvalidInputException") {
			if (this.api._options.valid !== this.api._defaults.valid) {
				this.api._options.valid(false);
			} else {
				throw e.message;
			}
		} else {
			throw e;
		}

		this.api.render = function () {};
	};

	ErrorHandler.prototype.wrapBarcodeCall = function wrapBarcodeCall(func) {
		try {
			var result = func.apply(undefined, arguments);
			this.api._options.valid(true);
			return result;
		} catch (e) {
			this.handleCatch(e);

			return this.api;
		}
	};

	return ErrorHandler;
}();

exports.default = ErrorHandler;

/***/ },
/* 11 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = fixOptions;


function fixOptions(options) {
	// Fix the margins
	options.marginTop = options.marginTop || options.margin;
	options.marginBottom = options.marginBottom || options.margin;
	options.marginRight = options.marginRight || options.margin;
	options.marginLeft = options.marginLeft || options.margin;

	return options;
}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getOptionsFromElement = __webpack_require__(36);

var _getOptionsFromElement2 = _interopRequireDefault(_getOptionsFromElement);

var _renderers = __webpack_require__(39);

var _exceptions = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Takes an element and returns an object with information about how
// it should be rendered
// This could also return an array with these objects
// {
//   element: The element that the renderer should draw on
//   renderer: The name of the renderer
//   afterRender (optional): If something has to done after the renderer
//     completed, calls afterRender (function)
//   options (optional): Options that can be defined in the element
// }

function getRenderProperties(element) {
	// If the element is a string, query select call again
	if (typeof element === "string") {
		return querySelectedRenderProperties(element);
	}
	// If element is array. Recursivly call with every object in the array
	else if (Array.isArray(element)) {
			var returnArray = [];
			for (var i = 0; i < element.length; i++) {
				returnArray.push(getRenderProperties(element[i]));
			}
			return returnArray;
		}
		// If element, render on canvas and set the uri as src
		else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
				return newCanvasRenderProperties(element);
			}
			// If SVG
			else if (typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
					return {
						element: element,
						options: (0, _getOptionsFromElement2.default)(element),
						renderer: (0, _renderers.getRendererClass)("svg")
					};
				}
				// If canvas (in browser)
				else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLCanvasElement) {
						return {
							element: element,
							options: (0, _getOptionsFromElement2.default)(element),
							renderer: (0, _renderers.getRendererClass)("canvas")
						};
					}
					// If canvas (in node)
					else if (element.getContext) {
							return {
								element: element,
								renderer: (0, _renderers.getRendererClass)("canvas")
							};
						} else {
							throw new _exceptions.InvalidElementException();
						}
} /* global HTMLImageElement */
/* global HTMLCanvasElement */
/* global SVGElement */

function querySelectedRenderProperties(string) {
	var selector = document.querySelectorAll(string);
	if (selector.length === 0) {
		return undefined;
	} else {
		var returnArray = [];
		for (var i = 0; i < selector.length; i++) {
			returnArray.push(getRenderProperties(selector[i]));
		}
		return returnArray;
	}
}

function newCanvasRenderProperties(imgElement) {
	var canvas = document.createElement('canvas');
	return {
		element: canvas,
		options: (0, _getOptionsFromElement2.default)(imgElement),
		renderer: (0, _renderers.getRendererClass)("canvas"),
		afterRender: function afterRender() {
			imgElement.setAttribute("src", canvas.toDataURL());
		}
	};
}

exports.default = getRenderProperties;

/***/ },
/* 13 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = linearizeEncodings;

// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
// Convert to [1-1, 1-2, 2, 3-1, 3-2]

function linearizeEncodings(encodings) {
	var linearEncodings = [];
	function nextLevel(encoded) {
		if (Array.isArray(encoded)) {
			for (var i = 0; i < encoded.length; i++) {
				nextLevel(encoded[i]);
			}
		} else {
			encoded.text = encoded.text || "";
			encoded.data = encoded.data || "";
			linearEncodings.push(encoded);
		}
	}
	nextLevel(encodings);

	return linearEncodings;
}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CODE2 = __webpack_require__(4);

var _CODE3 = _interopRequireDefault(_CODE2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128A = function (_CODE) {
	_inherits(CODE128A, _CODE);

	function CODE128A(string, options) {
		_classCallCheck(this, CODE128A);

		return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(208) + string, options));
	}

	CODE128A.prototype.valid = function valid() {
		return this.data.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
	};

	return CODE128A;
}(_CODE3.default);

exports.default = CODE128A;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CODE2 = __webpack_require__(4);

var _CODE3 = _interopRequireDefault(_CODE2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128B = function (_CODE) {
	_inherits(CODE128B, _CODE);

	function CODE128B(string, options) {
		_classCallCheck(this, CODE128B);

		return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(209) + string, options));
	}

	CODE128B.prototype.valid = function valid() {
		return this.data.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
	};

	return CODE128B;
}(_CODE3.default);

exports.default = CODE128B;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CODE2 = __webpack_require__(4);

var _CODE3 = _interopRequireDefault(_CODE2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128C = function (_CODE) {
	_inherits(CODE128C, _CODE);

	function CODE128C(string, options) {
		_classCallCheck(this, CODE128C);

		return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(210) + string, options));
	}

	CODE128C.prototype.valid = function valid() {
		return this.data.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1;
	};

	return CODE128C;
}(_CODE3.default);

exports.default = CODE128C;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CODE2 = __webpack_require__(4);

var _CODE3 = _interopRequireDefault(_CODE2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128AUTO = function (_CODE) {
	_inherits(CODE128AUTO, _CODE);

	function CODE128AUTO(data, options) {
		_classCallCheck(this, CODE128AUTO);

		// ASCII value ranges 0-127, 200-211
		if (data.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1) {
			var _this = _possibleConstructorReturn(this, _CODE.call(this, autoSelectModes(data), options));
		} else {
			var _this = _possibleConstructorReturn(this, _CODE.call(this, data, options));
		}
		return _possibleConstructorReturn(_this);
	}

	return CODE128AUTO;
}(_CODE3.default);

function autoSelectModes(string) {
	// ASCII ranges 0-98 and 200-207 (FUNCs and SHIFTs)
	var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
	// ASCII ranges 32-127 and 200-207 (FUNCs and SHIFTs)
	var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
	// Number pairs or [FNC1]
	var cLength = string.match(/^(\xCF*[0-9]{2}\xCF*)*/)[0].length;

	var newString;
	// Select CODE128C if the string start with enough digits
	if (cLength >= 2) {
		newString = String.fromCharCode(210) + autoSelectFromC(string);
	}
	// Select A/C depending on the longest match
	else if (aLength > bLength) {
			newString = String.fromCharCode(208) + autoSelectFromA(string);
		} else {
			newString = String.fromCharCode(209) + autoSelectFromB(string);
		}

	newString = newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, function (match, char) {
		return String.fromCharCode(203) + char;
	});

	return newString;
}

function autoSelectFromA(string) {
	var untilC = string.match(/^([\x00-\x5F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

	if (untilC) {
		return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	}

	var aChars = string.match(/^[\x00-\x5F\xC8-\xCF]+/);
	if (aChars[0].length === string.length) {
		return string;
	}

	return aChars[0] + String.fromCharCode(205) + autoSelectFromB(string.substring(aChars[0].length));
}

function autoSelectFromB(string) {
	var untilC = string.match(/^([\x20-\x7F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

	if (untilC) {
		return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	}

	var bChars = string.match(/^[\x20-\x7F\xC8-\xCF]+/);
	if (bChars[0].length === string.length) {
		return string;
	}

	return bChars[0] + String.fromCharCode(206) + autoSelectFromA(string.substring(bChars[0].length));
}

function autoSelectFromC(string) {
	var cMatch = string.match(/^(\xCF*[0-9]{2}\xCF*)+/)[0];
	var length = cMatch.length;

	if (length === string.length) {
		return string;
	}

	string = string.substring(length);

	// Select A/B depending on the longest match
	var aLength = string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
	var bLength = string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
	if (aLength >= bLength) {
		return cMatch + String.fromCharCode(206) + autoSelectFromA(string);
	} else {
		return cMatch + String.fromCharCode(205) + autoSelectFromB(string);
	}
}

exports.default = CODE128AUTO;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = undefined;

var _CODE128_AUTO = __webpack_require__(17);

var _CODE128_AUTO2 = _interopRequireDefault(_CODE128_AUTO);

var _CODE128A = __webpack_require__(14);

var _CODE128A2 = _interopRequireDefault(_CODE128A);

var _CODE128B = __webpack_require__(15);

var _CODE128B2 = _interopRequireDefault(_CODE128B);

var _CODE128C = __webpack_require__(16);

var _CODE128C2 = _interopRequireDefault(_CODE128C);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CODE128 = _CODE128_AUTO2.default;
exports.CODE128A = _CODE128A2.default;
exports.CODE128B = _CODE128B2.default;
exports.CODE128C = _CODE128C2.default;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CODE39 = undefined;

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Code_39#Encoding

var CODE39 = function (_Barcode) {
	_inherits(CODE39, _Barcode);

	function CODE39(data, options) {
		_classCallCheck(this, CODE39);

		data = data.toUpperCase();

		// Calculate mod43 checksum if enabled
		if (options.mod43) {
			data += getCharacter(mod43checksum(data));
		}

		return _possibleConstructorReturn(this, _Barcode.call(this, data, options));
	}

	CODE39.prototype.encode = function encode() {
		// First character is always a *
		var result = getEncoding("*");

		// Take every character and add the binary representation to the result
		for (var i = 0; i < this.data.length; i++) {
			result += getEncoding(this.data[i]) + "0";
		}

		// Last character is always a *
		result += getEncoding("*");

		return {
			data: result,
			text: this.text
		};
	};

	CODE39.prototype.valid = function valid() {
		return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
	};

	return CODE39;
}(_Barcode3.default);

// All characters. The position in the array is the (checksum) value


var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];

// The decimal representation of the characters, is converted to the
// corresponding binary with the getEncoding function
var encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];

// Get the binary representation of a character by converting the encodings
// from decimal to binary
function getEncoding(character) {
	return getBinary(characterValue(character));
}

function getBinary(characterValue) {
	return encodings[characterValue].toString(2);
}

function getCharacter(characterValue) {
	return characters[characterValue];
}

function characterValue(character) {
	return characters.indexOf(character);
}

function mod43checksum(data) {
	var checksum = 0;
	for (var i = 0; i < data.length; i++) {
		checksum += characterValue(data[i]);
	}

	checksum = checksum % 43;
	return checksum;
}

exports.CODE39 = CODE39;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ean_encoder = __webpack_require__(1);

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

var EAN13 = function (_Barcode) {
	_inherits(EAN13, _Barcode);

	function EAN13(data, options) {
		_classCallCheck(this, EAN13);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{12}$/) !== -1) {
			data += checksum(data);
		}

		// Make sure the font is not bigger than the space between the guard bars
		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

		if (!options.flat && options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;

		// Adds a last character to the end of the barcode
		_this.lastChar = options.lastChar;
		return _this;
	}

	EAN13.prototype.valid = function valid() {
		return this.data.search(/^[0-9]{13}$/) !== -1 && this.data[12] == checksum(this.data);
	};

	EAN13.prototype.encode = function encode() {
		if (this.options.flat) {
			return this.flatEncoding();
		} else {
			return this.guardedEncoding();
		}
	};

	// Define the EAN-13 structure


	EAN13.prototype.getStructure = function getStructure() {
		return ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
	};

	// The "standard" way of printing EAN13 barcodes with guard bars


	EAN13.prototype.guardedEncoding = function guardedEncoding() {
		var encoder = new _ean_encoder2.default();
		var result = [];

		var structure = this.getStructure()[this.data[0]];

		// Get the string to be encoded on the left side of the EAN code
		var leftSide = this.data.substr(1, 6);

		// Get the string to be encoded on the right side of the EAN code
		var rightSide = this.data.substr(7, 6);

		// Add the first digigt
		if (this.options.displayValue) {
			result.push({
				data: "000000000000",
				text: this.text.substr(0, 1),
				options: { textAlign: "left", fontSize: this.fontSize }
			});
		}

		// Add the guard bars
		result.push({
			data: "101",
			options: { height: this.guardHeight }
		});

		// Add the left side
		result.push({
			data: encoder.encode(leftSide, structure),
			text: this.text.substr(1, 6),
			options: { fontSize: this.fontSize }
		});

		// Add the middle bits
		result.push({
			data: "01010",
			options: { height: this.guardHeight }
		});

		// Add the right side
		result.push({
			data: encoder.encode(rightSide, "RRRRRR"),
			text: this.text.substr(7, 6),
			options: { fontSize: this.fontSize }
		});

		// Add the end bits
		result.push({
			data: "101",
			options: { height: this.guardHeight }
		});

		if (this.options.lastChar && this.options.displayValue) {
			result.push({ data: "00" });

			result.push({
				data: "00000",
				text: this.options.lastChar,
				options: { fontSize: this.fontSize }
			});
		}
		return result;
	};

	EAN13.prototype.flatEncoding = function flatEncoding() {
		var encoder = new _ean_encoder2.default();
		var result = "";

		var structure = this.getStructure()[this.data[0]];

		result += "101";
		result += encoder.encode(this.data.substr(1, 6), structure);
		result += "01010";
		result += encoder.encode(this.data.substr(7, 6), "RRRRRR");
		result += "101";

		return {
			data: result,
			text: this.text
		};
	};

	return EAN13;
}(_Barcode3.default);

// Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


function checksum(number) {
	var result = 0;

	var i;
	for (i = 0; i < 12; i += 2) {
		result += parseInt(number[i]);
	}
	for (i = 1; i < 12; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	return (10 - result % 10) % 10;
}

exports.default = EAN13;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ean_encoder = __webpack_require__(1);

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_2#Encoding

var EAN2 = function (_Barcode) {
	_inherits(EAN2, _Barcode);

	function EAN2(data, options) {
		_classCallCheck(this, EAN2);

		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

		_this.structure = ["LL", "LG", "GL", "GG"];
		return _this;
	}

	EAN2.prototype.valid = function valid() {
		return this.data.search(/^[0-9]{2}$/) !== -1;
	};

	EAN2.prototype.encode = function encode() {
		var encoder = new _ean_encoder2.default();

		// Choose the structure based on the number mod 4
		var structure = this.structure[parseInt(this.data) % 4];

		// Start bits
		var result = "1011";

		// Encode the two digits with 01 in between
		result += encoder.encode(this.data, structure, "01");

		return {
			data: result,
			text: this.text
		};
	};

	return EAN2;
}(_Barcode3.default);

exports.default = EAN2;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ean_encoder = __webpack_require__(1);

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_5#Encoding

var EAN5 = function (_Barcode) {
	_inherits(EAN5, _Barcode);

	function EAN5(data, options) {
		_classCallCheck(this, EAN5);

		// Define the EAN-13 structure
		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

		_this.structure = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
		return _this;
	}

	EAN5.prototype.valid = function valid() {
		return this.data.search(/^[0-9]{5}$/) !== -1;
	};

	EAN5.prototype.encode = function encode() {
		var encoder = new _ean_encoder2.default();
		var checksum = this.checksum();

		// Start bits
		var result = "1011";

		// Use normal ean encoding with 01 in between all digits
		result += encoder.encode(this.data, this.structure[checksum], "01");

		return {
			data: result,
			text: this.text
		};
	};

	EAN5.prototype.checksum = function checksum() {
		var result = 0;

		result += parseInt(this.data[0]) * 3;
		result += parseInt(this.data[1]) * 9;
		result += parseInt(this.data[2]) * 3;
		result += parseInt(this.data[3]) * 9;
		result += parseInt(this.data[4]) * 3;

		return result % 10;
	};

	return EAN5;
}(_Barcode3.default);

exports.default = EAN5;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ean_encoder = __webpack_require__(1);

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml

var EAN8 = function (_Barcode) {
	_inherits(EAN8, _Barcode);

	function EAN8(data, options) {
		_classCallCheck(this, EAN8);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{7}$/) !== -1) {
			data += checksum(data);
		}

		return _possibleConstructorReturn(this, _Barcode.call(this, data, options));
	}

	EAN8.prototype.valid = function valid() {
		return this.data.search(/^[0-9]{8}$/) !== -1 && this.data[7] == checksum(this.data);
	};

	EAN8.prototype.encode = function encode() {
		var encoder = new _ean_encoder2.default();

		// Create the return variable
		var result = "";

		// Get the number to be encoded on the left side of the EAN code
		var leftSide = this.data.substr(0, 4);

		// Get the number to be encoded on the right side of the EAN code
		var rightSide = this.data.substr(4, 4);

		// Add the start bits
		result += encoder.startBin;

		// Add the left side
		result += encoder.encode(leftSide, "LLLL");

		// Add the middle bits
		result += encoder.middleBin;

		// Add the right side
		result += encoder.encode(rightSide, "RRRR");

		// Add the end bits
		result += encoder.endBin;

		return {
			data: result,
			text: this.text
		};
	};

	return EAN8;
}(_Barcode3.default);

// Calulate the checksum digit


function checksum(number) {
	var result = 0;

	var i;
	for (i = 0; i < 7; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	for (i = 1; i < 7; i += 2) {
		result += parseInt(number[i]);
	}

	return (10 - result % 10) % 10;
}

exports.default = EAN8;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ean_encoder = __webpack_require__(1);

var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

var UPC = function (_Barcode) {
	_inherits(UPC, _Barcode);

	function UPC(data, options) {
		_classCallCheck(this, UPC);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{11}$/) !== -1) {
			data += checksum(data);
		}

		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

		_this.displayValue = options.displayValue;

		// Make sure the font is not bigger than the space between the guard bars
		if (options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	UPC.prototype.valid = function valid() {
		return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum(this.data);
	};

	UPC.prototype.encode = function encode() {
		if (this.options.flat) {
			return this.flatEncoding();
		} else {
			return this.guardedEncoding();
		}
	};

	UPC.prototype.flatEncoding = function flatEncoding() {
		var encoder = new _ean_encoder2.default();
		var result = "";

		result += "101";
		result += encoder.encode(this.data.substr(0, 6), "LLLLLL");
		result += "01010";
		result += encoder.encode(this.data.substr(6, 6), "RRRRRR");
		result += "101";

		return {
			data: result,
			text: this.text
		};
	};

	UPC.prototype.guardedEncoding = function guardedEncoding() {
		var encoder = new _ean_encoder2.default();
		var result = [];

		// Add the first digigt
		if (this.displayValue) {
			result.push({
				data: "00000000",
				text: this.text.substr(0, 1),
				options: { textAlign: "left", fontSize: this.fontSize }
			});
		}

		// Add the guard bars
		result.push({
			data: "101" + encoder.encode(this.data[0], "L"),
			options: { height: this.guardHeight }
		});

		// Add the left side
		result.push({
			data: encoder.encode(this.data.substr(1, 5), "LLLLL"),
			text: this.text.substr(1, 5),
			options: { fontSize: this.fontSize }
		});

		// Add the middle bits
		result.push({
			data: "01010",
			options: { height: this.guardHeight }
		});

		// Add the right side
		result.push({
			data: encoder.encode(this.data.substr(6, 5), "RRRRR"),
			text: this.text.substr(6, 5),
			options: { fontSize: this.fontSize }
		});

		// Add the end bits
		result.push({
			data: encoder.encode(this.data[11], "R") + "101",
			options: { height: this.guardHeight }
		});

		// Add the last digit
		if (this.displayValue) {
			result.push({
				data: "00000000",
				text: this.text.substr(11, 1),
				options: { textAlign: "right", fontSize: this.fontSize }
			});
		}

		return result;
	};

	return UPC;
}(_Barcode3.default);

// Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


function checksum(number) {
	var result = 0;

	var i;
	for (i = 1; i < 11; i += 2) {
		result += parseInt(number[i]);
	}
	for (i = 0; i < 11; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	return (10 - result % 10) % 10;
}

exports.default = UPC;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

var _EAN = __webpack_require__(20);

var _EAN2 = _interopRequireDefault(_EAN);

var _EAN3 = __webpack_require__(23);

var _EAN4 = _interopRequireDefault(_EAN3);

var _EAN5 = __webpack_require__(22);

var _EAN6 = _interopRequireDefault(_EAN5);

var _EAN7 = __webpack_require__(21);

var _EAN8 = _interopRequireDefault(_EAN7);

var _UPC = __webpack_require__(24);

var _UPC2 = _interopRequireDefault(_UPC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.EAN13 = _EAN2.default;
exports.EAN8 = _EAN4.default;
exports.EAN5 = _EAN6.default;
exports.EAN2 = _EAN8.default;
exports.UPC = _UPC2.default;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GenericBarcode = undefined;

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericBarcode = function (_Barcode) {
	_inherits(GenericBarcode, _Barcode);

	function GenericBarcode(data, options) {
		_classCallCheck(this, GenericBarcode);

		return _possibleConstructorReturn(this, _Barcode.call(this, data, options)); // Sets this.data and this.text
	}

	// Return the corresponding binary numbers for the data provided


	GenericBarcode.prototype.encode = function encode() {
		return {
			data: "10101010101010101010101010101010101010101",
			text: this.text
		};
	};

	// Resturn true/false if the string provided is valid for this encoder


	GenericBarcode.prototype.valid = function valid() {
		return true;
	};

	return GenericBarcode;
}(_Barcode3.default);

exports.GenericBarcode = GenericBarcode;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ITF = undefined;

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ITF = function (_Barcode) {
	_inherits(ITF, _Barcode);

	function ITF(data, options) {
		_classCallCheck(this, ITF);

		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

		_this.binaryRepresentation = {
			"0": "00110",
			"1": "10001",
			"2": "01001",
			"3": "11000",
			"4": "00101",
			"5": "10100",
			"6": "01100",
			"7": "00011",
			"8": "10010",
			"9": "01010"
		};
		return _this;
	}

	ITF.prototype.valid = function valid() {
		return this.data.search(/^([0-9]{2})+$/) !== -1;
	};

	ITF.prototype.encode = function encode() {
		// Always add the same start bits
		var result = "1010";

		// Calculate all the digit pairs
		for (var i = 0; i < this.data.length; i += 2) {
			result += this.calculatePair(this.data.substr(i, 2));
		}

		// Always add the same end bits
		result += "11101";

		return {
			data: result,
			text: this.text
		};
	};

	// Calculate the data of a number pair


	ITF.prototype.calculatePair = function calculatePair(numberPair) {
		var result = "";

		var number1Struct = this.binaryRepresentation[numberPair[0]];
		var number2Struct = this.binaryRepresentation[numberPair[1]];

		// Take every second bit and add to the result
		for (var i = 0; i < 5; i++) {
			result += number1Struct[i] == "1" ? "111" : "1";
			result += number2Struct[i] == "1" ? "000" : "0";
		}

		return result;
	};

	return ITF;
}(_Barcode3.default);

exports.ITF = ITF;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ITF14 = undefined;

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ITF14 = function (_Barcode) {
	_inherits(ITF14, _Barcode);

	function ITF14(data, options) {
		_classCallCheck(this, ITF14);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{13}$/) !== -1) {
			data += checksum(data);
		}

		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

		_this.binaryRepresentation = {
			"0": "00110",
			"1": "10001",
			"2": "01001",
			"3": "11000",
			"4": "00101",
			"5": "10100",
			"6": "01100",
			"7": "00011",
			"8": "10010",
			"9": "01010"
		};
		return _this;
	}

	ITF14.prototype.valid = function valid() {
		return this.data.search(/^[0-9]{14}$/) !== -1 && this.data[13] == checksum(this.data);
	};

	ITF14.prototype.encode = function encode() {
		var result = "1010";

		// Calculate all the digit pairs
		for (var i = 0; i < 14; i += 2) {
			result += this.calculatePair(this.data.substr(i, 2));
		}

		// Always add the same end bits
		result += "11101";

		return {
			data: result,
			text: this.text
		};
	};

	// Calculate the data of a number pair


	ITF14.prototype.calculatePair = function calculatePair(numberPair) {
		var result = "";

		var number1Struct = this.binaryRepresentation[numberPair[0]];
		var number2Struct = this.binaryRepresentation[numberPair[1]];

		// Take every second bit and add to the result
		for (var i = 0; i < 5; i++) {
			result += number1Struct[i] == "1" ? "111" : "1";
			result += number2Struct[i] == "1" ? "000" : "0";
		}

		return result;
	};

	return ITF14;
}(_Barcode3.default);

// Calulate the checksum digit


function checksum(data) {
	var result = 0;

	for (var i = 0; i < 13; i++) {
		result += parseInt(data[i]) * (3 - i % 2 * 2);
	}

	return Math.ceil(result / 10) * 10 - result;
}

exports.ITF14 = ITF14;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MSI2 = __webpack_require__(2);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI10 = function (_MSI) {
	_inherits(MSI10, _MSI);

	function MSI10(data, options) {
		_classCallCheck(this, MSI10);

		return _possibleConstructorReturn(this, _MSI.call(this, data + (0, _checksums.mod10)(data), options));
	}

	return MSI10;
}(_MSI3.default);

exports.default = MSI10;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MSI2 = __webpack_require__(2);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI1010 = function (_MSI) {
	_inherits(MSI1010, _MSI);

	function MSI1010(data, options) {
		_classCallCheck(this, MSI1010);

		data += (0, _checksums.mod10)(data);
		data += (0, _checksums.mod10)(data);
		return _possibleConstructorReturn(this, _MSI.call(this, data, options));
	}

	return MSI1010;
}(_MSI3.default);

exports.default = MSI1010;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MSI2 = __webpack_require__(2);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI11 = function (_MSI) {
	_inherits(MSI11, _MSI);

	function MSI11(data, options) {
		_classCallCheck(this, MSI11);

		return _possibleConstructorReturn(this, _MSI.call(this, data + (0, _checksums.mod11)(data), options));
	}

	return MSI11;
}(_MSI3.default);

exports.default = MSI11;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _MSI2 = __webpack_require__(2);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI1110 = function (_MSI) {
	_inherits(MSI1110, _MSI);

	function MSI1110(data, options) {
		_classCallCheck(this, MSI1110);

		data += (0, _checksums.mod11)(data);
		data += (0, _checksums.mod10)(data);
		return _possibleConstructorReturn(this, _MSI.call(this, data, options));
	}

	return MSI1110;
}(_MSI3.default);

exports.default = MSI1110;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = undefined;

var _MSI = __webpack_require__(2);

var _MSI2 = _interopRequireDefault(_MSI);

var _MSI3 = __webpack_require__(29);

var _MSI4 = _interopRequireDefault(_MSI3);

var _MSI5 = __webpack_require__(31);

var _MSI6 = _interopRequireDefault(_MSI5);

var _MSI7 = __webpack_require__(30);

var _MSI8 = _interopRequireDefault(_MSI7);

var _MSI9 = __webpack_require__(32);

var _MSI10 = _interopRequireDefault(_MSI9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.MSI = _MSI2.default;
exports.MSI10 = _MSI4.default;
exports.MSI11 = _MSI6.default;
exports.MSI1010 = _MSI8.default;
exports.MSI1110 = _MSI10.default;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.codabar = undefined;

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding specification:
// http://www.barcodeisland.com/codabar.phtml

var codabar = function (_Barcode) {
	_inherits(codabar, _Barcode);

	function codabar(data, options) {
		_classCallCheck(this, codabar);

		if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
			data = "A" + data + "A";
		}

		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data.toUpperCase(), options));

		_this.text = _this.options.text || _this.text.replace(/[A-D]/g, '');
		return _this;
	}

	codabar.prototype.valid = function valid() {
		return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
	};

	codabar.prototype.encode = function encode() {
		var result = [];
		var encodings = this.getEncodings();
		for (var i = 0; i < this.data.length; i++) {
			result.push(encodings[this.data.charAt(i)]);
			// for all characters except the last, append a narrow-space ("0")
			if (i !== this.data.length - 1) {
				result.push("0");
			}
		}
		return {
			text: this.text,
			data: result.join('')
		};
	};

	codabar.prototype.getEncodings = function getEncodings() {
		return {
			"0": "101010011",
			"1": "101011001",
			"2": "101001011",
			"3": "110010101",
			"4": "101101001",
			"5": "110101001",
			"6": "100101011",
			"7": "100101101",
			"8": "100110101",
			"9": "110100101",
			"-": "101001101",
			"$": "101100101",
			":": "1101011011",
			"/": "1101101011",
			".": "1101101101",
			"+": "101100110011",
			"A": "1011001001",
			"B": "1010010011",
			"C": "1001001011",
			"D": "1010011001"
		};
	};

	return codabar;
}(_Barcode3.default);

exports.codabar = codabar;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.pharmacode = undefined;

var _Barcode2 = __webpack_require__(0);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

var pharmacode = function (_Barcode) {
	_inherits(pharmacode, _Barcode);

	function pharmacode(data, options) {
		_classCallCheck(this, pharmacode);

		var _this = _possibleConstructorReturn(this, _Barcode.call(this, data, options));

		_this.number = parseInt(data, 10);
		return _this;
	}

	pharmacode.prototype.encode = function encode() {
		var z = this.number;
		var result = "";

		// http://i.imgur.com/RMm4UDJ.png
		// (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
		while (!isNaN(z) && z != 0) {
			if (z % 2 === 0) {
				// Even
				result = "11100" + result;
				z = (z - 2) / 2;
			} else {
				// Odd
				result = "100" + result;
				z = (z - 1) / 2;
			}
		}

		// Remove the two last zeroes
		result = result.slice(0, -2);

		return {
			data: result,
			text: this.text
		};
	};

	pharmacode.prototype.valid = function valid() {
		return this.number >= 3 && this.number <= 131070;
	};

	return pharmacode;
}(_Barcode3.default);

exports.pharmacode = pharmacode;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _optionsFromStrings = __webpack_require__(37);

var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

var _defaults = __webpack_require__(7);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptionsFromElement(element) {
	var options = {};
	for (var property in _defaults2.default) {
		if (_defaults2.default.hasOwnProperty(property)) {
			// jsbarcode-*
			if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
				options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
			}

			// data-*
			if (element.hasAttribute("data-" + property.toLowerCase())) {
				options[property] = element.getAttribute("data-" + property.toLowerCase());
			}
		}
	}

	options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");

	// Since all atributes are string they need to be converted to integers
	options = (0, _optionsFromStrings2.default)(options);

	return options;
}

exports.default = getOptionsFromElement;

/***/ },
/* 37 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = optionsFromStrings;

// Convert string to integers/booleans where it should be

function optionsFromStrings(options) {
	var intOptions = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];

	for (var intOption in intOptions) {
		if (intOptions.hasOwnProperty(intOption)) {
			intOption = intOptions[intOption];
			if (typeof options[intOption] === "string") {
				options[intOption] = parseInt(options[intOption], 10);
			}
		}
	}

	if (typeof options["displayValue"] === "string") {
		options["displayValue"] = options["displayValue"] != "false";
	}

	return options;
}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _merge = __webpack_require__(3);

var _merge2 = _interopRequireDefault(_merge);

var _shared = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasRenderer = function () {
	function CanvasRenderer(canvas, encodings, options) {
		_classCallCheck(this, CanvasRenderer);

		this.canvas = canvas;
		this.encodings = encodings;
		this.options = options;
	}

	CanvasRenderer.prototype.render = function render() {
		// Abort if the browser does not support HTML5 canvas
		if (!this.canvas.getContext) {
			throw new Error('The browser does not support canvas.');
		}

		this.prepareCanvas();
		for (var i = 0; i < this.encodings.length; i++) {
			var encodingOptions = (0, _merge2.default)(this.options, this.encodings[i].options);

			this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
			this.drawCanvasText(encodingOptions, this.encodings[i]);

			this.moveCanvasDrawing(this.encodings[i]);
		}

		this.restoreCanvas();
	};

	CanvasRenderer.prototype.prepareCanvas = function prepareCanvas() {
		// Get the canvas context
		var ctx = this.canvas.getContext("2d");

		ctx.save();

		(0, _shared.calculateEncodingAttributes)(this.encodings, this.options, ctx);
		var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
		var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

		this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;

		this.canvas.height = maxHeight;

		// Paint the canvas
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		if (this.options.background) {
			ctx.fillStyle = this.options.background;
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}

		ctx.translate(this.options.marginLeft, 0);
	};

	CanvasRenderer.prototype.drawCanvasBarcode = function drawCanvasBarcode(options, encoding) {
		// Get the canvas context
		var ctx = this.canvas.getContext("2d");

		var binary = encoding.data;

		// Creates the barcode out of the encoded binary
		var yFrom;
		if (options.textPosition == "top") {
			yFrom = options.marginTop + options.fontSize + options.textMargin;
		} else {
			yFrom = options.marginTop;
		}

		ctx.fillStyle = options.lineColor;

		for (var b = 0; b < binary.length; b++) {
			var x = b * options.width + encoding.barcodePadding;

			if (binary[b] === "1") {
				ctx.fillRect(x, yFrom, options.width, options.height);
			} else if (binary[b]) {
				ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
			}
		}
	};

	CanvasRenderer.prototype.drawCanvasText = function drawCanvasText(options, encoding) {
		// Get the canvas context
		var ctx = this.canvas.getContext("2d");

		var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

		// Draw the text if displayValue is set
		if (options.displayValue) {
			var x, y;

			if (options.textPosition == "top") {
				y = options.marginTop + options.fontSize - options.textMargin;
			} else {
				y = options.height + options.textMargin + options.marginTop + options.fontSize;
			}

			ctx.font = font;

			// Draw the text in the correct X depending on the textAlign option
			if (options.textAlign == "left" || encoding.barcodePadding > 0) {
				x = 0;
				ctx.textAlign = 'left';
			} else if (options.textAlign == "right") {
				x = encoding.width - 1;
				ctx.textAlign = 'right';
			}
			// In all other cases, center the text
			else {
					x = encoding.width / 2;
					ctx.textAlign = 'center';
				}

			ctx.fillText(encoding.text, x, y);
		}
	};

	CanvasRenderer.prototype.moveCanvasDrawing = function moveCanvasDrawing(encoding) {
		var ctx = this.canvas.getContext("2d");

		ctx.translate(encoding.width, 0);
	};

	CanvasRenderer.prototype.restoreCanvas = function restoreCanvas() {
		// Get the canvas context
		var ctx = this.canvas.getContext("2d");

		ctx.restore();
	};

	return CanvasRenderer;
}();

exports.default = CanvasRenderer;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getRendererClass = undefined;

var _canvas = __webpack_require__(38);

var _canvas2 = _interopRequireDefault(_canvas);

var _svg = __webpack_require__(40);

var _svg2 = _interopRequireDefault(_svg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRendererClass(name) {
	switch (name) {
		case "canvas":
			return _canvas2.default;
		case "svg":
			return _svg2.default;
		default:
			throw new Error("Invalid rederer");
	}
}

exports.getRendererClass = getRendererClass;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _merge = __webpack_require__(3);

var _merge2 = _interopRequireDefault(_merge);

var _shared = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var svgns = "http://www.w3.org/2000/svg";

var SVGRenderer = function () {
	function SVGRenderer(svg, encodings, options) {
		_classCallCheck(this, SVGRenderer);

		this.svg = svg;
		this.encodings = encodings;
		this.options = options;
	}

	SVGRenderer.prototype.render = function render() {
		var currentX = this.options.marginLeft;

		this.prepareSVG();
		for (var i = 0; i < this.encodings.length; i++) {
			var encoding = this.encodings[i];
			var encodingOptions = (0, _merge2.default)(this.options, encoding.options);

			var group = createGroup(currentX, encodingOptions.marginTop, this.svg);

			setGroupOptions(group, encodingOptions);

			this.drawSvgBarcode(group, encodingOptions, encoding);
			this.drawSVGText(group, encodingOptions, encoding);

			currentX += encoding.width;
		}
	};

	SVGRenderer.prototype.prepareSVG = function prepareSVG() {
		// Clear the SVG
		while (this.svg.firstChild) {
			this.svg.removeChild(this.svg.firstChild);
		}

		(0, _shared.calculateEncodingAttributes)(this.encodings, this.options);
		var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
		var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

		var width = totalWidth + this.options.marginLeft + this.options.marginRight;
		this.setSvgAttributes(width, maxHeight);
	};

	SVGRenderer.prototype.drawSvgBarcode = function drawSvgBarcode(parent, options, encoding) {
		var binary = encoding.data;

		// Creates the barcode out of the encoded binary
		var yFrom;
		if (options.textPosition == "top") {
			yFrom = options.fontSize + options.textMargin;
		} else {
			yFrom = 0;
		}

		var barWidth = 0;
		var x = 0;
		for (var b = 0; b < binary.length; b++) {
			x = b * options.width + encoding.barcodePadding;

			if (binary[b] === "1") {
				barWidth++;
			} else if (barWidth > 0) {
				drawLine(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
				barWidth = 0;
			}
		}

		// Last draw is needed since the barcode ends with 1
		if (barWidth > 0) {
			drawLine(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
		}
	};

	SVGRenderer.prototype.drawSVGText = function drawSVGText(parent, options, encoding) {
		var textElem = document.createElementNS(svgns, 'text');

		// Draw the text if displayValue is set
		if (options.displayValue) {
			var x, y;

			textElem.setAttribute("style", "font:" + options.fontOptions + " " + options.fontSize + "px " + options.font);

			if (options.textPosition == "top") {
				y = options.fontSize - options.textMargin;
			} else {
				y = options.height + options.textMargin + options.fontSize;
			}

			// Draw the text in the correct X depending on the textAlign option
			if (options.textAlign == "left" || encoding.barcodePadding > 0) {
				x = 0;
				textElem.setAttribute("text-anchor", "start");
			} else if (options.textAlign == "right") {
				x = encoding.width - 1;
				textElem.setAttribute("text-anchor", "end");
			}
			// In all other cases, center the text
			else {
					x = encoding.width / 2;
					textElem.setAttribute("text-anchor", "middle");
				}

			textElem.setAttribute("x", x);
			textElem.setAttribute("y", y);

			textElem.appendChild(document.createTextNode(encoding.text));

			parent.appendChild(textElem);
		}
	};

	SVGRenderer.prototype.setSvgAttributes = function setSvgAttributes(width, height) {
		var svg = this.svg;
		svg.setAttribute("width", width + "px");
		svg.setAttribute("height", height + "px");
		svg.setAttribute("x", "0px");
		svg.setAttribute("y", "0px");
		svg.setAttribute("viewBox", "0 0 " + width + " " + height);

		svg.setAttribute("xmlns", svgns);
		svg.setAttribute("version", "1.1");

		svg.style.transform = "translate(0,0)";

		if (this.options.background) {
			svg.style.background = this.options.background;
		}
	};

	return SVGRenderer;
}();

function createGroup(x, y, parent) {
	var group = document.createElementNS(svgns, 'g');

	group.setAttribute("transform", "translate(" + x + ", " + y + ")");

	parent.appendChild(group);

	return group;
}

function setGroupOptions(group, options) {
	group.setAttribute("style", "fill:" + options.lineColor + ";");
}

function drawLine(x, y, width, height, parent) {
	var line = document.createElementNS(svgns, 'rect');

	line.setAttribute("x", x);
	line.setAttribute("y", y);
	line.setAttribute("width", width);
	line.setAttribute("height", height);

	parent.appendChild(line);
}

exports.default = SVGRenderer;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _barcodes = __webpack_require__(9);

var _barcodes2 = _interopRequireDefault(_barcodes);

var _merge = __webpack_require__(3);

var _merge2 = _interopRequireDefault(_merge);

var _linearizeEncodings = __webpack_require__(13);

var _linearizeEncodings2 = _interopRequireDefault(_linearizeEncodings);

var _fixOptions = __webpack_require__(11);

var _fixOptions2 = _interopRequireDefault(_fixOptions);

var _getRenderProperties = __webpack_require__(12);

var _getRenderProperties2 = _interopRequireDefault(_getRenderProperties);

var _ErrorHandler = __webpack_require__(10);

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _exceptions = __webpack_require__(6);

var _defaults = __webpack_require__(7);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The protype of the object returned from the JsBarcode() call
// Import all the barcodes
var API = function API() {};

// The first call of the library API
// Will return an object with all barcodes calls and the data that is used
// by the renderers


// Default values


// Exceptions


// Help functions
var JsBarcode = function JsBarcode(element, text, options) {
	var api = new API();

	if (typeof element === "undefined") {
		throw Error("No element to render on was provided.");
	}

	// Variables that will be pased through the API calls
	api._renderProperties = (0, _getRenderProperties2.default)(element);
	api._encodings = [];
	api._options = _defaults2.default;
	api._errorHandler = new _ErrorHandler2.default(api);

	// If text is set, use the simple syntax (render the barcode directly)
	if (typeof text !== "undefined") {
		options = options || {};

		if (!options.format) {
			options.format = autoSelectBarcode();
		}

		api.options(options)[options.format](text, options).render();
	}

	return api;
};

// To make tests work TODO: remove
JsBarcode.getModule = function (name) {
	return _barcodes2.default[name];
};

// Register all barcodes
for (var name in _barcodes2.default) {
	if (_barcodes2.default.hasOwnProperty(name)) {
		// Security check if the propery is a prototype property
		registerBarcode(_barcodes2.default, name);
	}
}
function registerBarcode(barcodes, name) {
	API.prototype[name] = API.prototype[name.toUpperCase()] = API.prototype[name.toLowerCase()] = function (text, options) {
		var api = this;
		return api._errorHandler.wrapBarcodeCall(function () {
			var newOptions = (0, _merge2.default)(api._options, options);
			var Encoder = barcodes[name];
			var encoded = encode(text, Encoder, newOptions);
			api._encodings.push(encoded);

			return api;
		});
	};
}

// encode() handles the Encoder call and builds the binary string to be rendered
function encode(text, Encoder, options) {
	// Ensure that text is a string
	text = "" + text;

	var encoder = new Encoder(text, options);

	// If the input is not valid for the encoder, throw error.
	// If the valid callback option is set, call it instead of throwing error
	if (!encoder.valid()) {
		throw new _exceptions.InvalidInputException(encoder.constructor.name, text);
	}

	// Make a request for the binary data (and other infromation) that should be rendered
	var encoded = encoder.encode();

	// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
	// Convert to [1-1, 1-2, 2, 3-1, 3-2]
	encoded = (0, _linearizeEncodings2.default)(encoded);

	// Merge
	for (var i = 0; i < encoded.length; i++) {
		encoded[i].options = (0, _merge2.default)(options, encoded[i].options);
	}

	return encoded;
}

function autoSelectBarcode() {
	// If CODE128 exists. Use it
	if (_barcodes2.default["CODE128"]) {
		return "CODE128";
	}

	// Else, take the first (probably only) barcode
	return Object.keys(_barcodes2.default)[0];
}

// Sets global encoder options
// Added to the api by the JsBarcode function
API.prototype.options = function (options) {
	this._options = (0, _merge2.default)(this._options, options);
	return this;
};

// Will create a blank space (usually in between barcodes)
API.prototype.blank = function (size) {
	var zeroes = "0".repeat(size);
	this._encodings.push({ data: zeroes });
	return this;
};

// Initialize JsBarcode on all HTML elements defined.
API.prototype.init = function () {
	// Should do nothing if no elements where found
	if (!this._renderProperties) {
		return;
	}

	// Make sure renderProperies is an array
	if (!Array.isArray(this._renderProperties)) {
		this._renderProperties = [this._renderProperties];
	}

	var renderProperty;
	for (var i in this._renderProperties) {
		renderProperty = this._renderProperties[i];
		var options = (0, _merge2.default)(this._options, renderProperty.options);

		if (options.format == "auto") {
			options.format = autoSelectBarcode();
		}

		var text = options.value;

		var Encoder = _barcodes2.default[options.format.toUpperCase()];

		var encoded = encode(text, Encoder, options);

		render(renderProperty, encoded, options);
	}
};

// The render API call. Calls the real render function.
API.prototype.render = function () {
	if (!this._renderProperties) {
		throw new _exceptions.NoElementException();
	}

	if (Array.isArray(this._renderProperties)) {
		for (var i = 0; i < this._renderProperties.length; i++) {
			render(this._renderProperties[i], this._encodings, this._options);
		}
	} else {
		render(this._renderProperties, this._encodings, this._options);
	}

	return this;
};

API.prototype._defaults = _defaults2.default;

// Prepares the encodings and calls the renderer
function render(renderProperties, encodings, options) {
	encodings = (0, _linearizeEncodings2.default)(encodings);

	for (var i = 0; i < encodings.length; i++) {
		encodings[i].options = (0, _merge2.default)(options, encodings[i].options);
		(0, _fixOptions2.default)(encodings[i].options);
	}

	(0, _fixOptions2.default)(options);

	var Renderer = renderProperties.renderer;
	var renderer = new Renderer(renderProperties.element, encodings, options);
	renderer.render();

	if (renderProperties.afterRender) {
		renderProperties.afterRender();
	}
}

// Export to browser
if (typeof window !== "undefined") {
	window.JsBarcode = JsBarcode;
}

// Export to jQuery
/*global jQuery */
if (typeof jQuery !== 'undefined') {
	jQuery.fn.JsBarcode = function (content, options) {
		var elementArray = [];
		jQuery(this).each(function () {
			elementArray.push(this);
		});
		return JsBarcode(elementArray, content, options);
	};
}

// Export to commonJS
module.exports = JsBarcode;

/***/ }
/******/ ]);