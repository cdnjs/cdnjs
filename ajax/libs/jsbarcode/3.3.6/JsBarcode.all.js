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

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
/* 1 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Encoding documentation
	// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

	var MSI = function () {
		function MSI(string) {
			_classCallCheck(this, MSI);

			this.string = string;
		}

		MSI.prototype.encode = function encode() {
			// Start bits
			var ret = "110";

			for (var i = 0; i < this.string.length; i++) {
				// Convert the character to binary (always 4 binary digits)
				var digit = parseInt(this.string[i]);
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
				text: this.string
			};
		};

		MSI.prototype.valid = function valid() {
			return this.string.search(/^[0-9]+$/) !== -1;
		};

		return MSI;
	}();

	function addZeroes(number, n) {
		for (var i = 0; i < n; i++) {
			number = "0" + number;
		}
		return number;
	}

	exports.default = MSI;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// This is the master class, it does require the start code to be
	// included in the string

	var CODE128 = function () {
		function CODE128(string) {
			_classCallCheck(this, CODE128);

			// Fill the bytes variable with the ascii codes of string
			this.bytes = [];
			for (var i = 0; i < string.length; ++i) {
				this.bytes.push(string.charCodeAt(i));
			}

			// First element should be startcode, remove that
			this.string = string.substring(1);

			// Data for each character, the last characters will not be encoded but are used for error correction
			// Numbers encode to (n + 1000) -> binary; 740 -> (740 + 1000).toString(2) -> "11011001100"
			this.encodings = [// + 1000
			740, 644, 638, 176, 164, 100, 224, 220, 124, 608, 604, 572, 436, 244, 230, 484, 260, 254, 650, 628, 614, 764, 652, 902, 868, 836, 830, 892, 844, 842, 752, 734, 590, 304, 112, 94, 416, 128, 122, 672, 576, 570, 464, 422, 134, 496, 478, 142, 910, 678, 582, 768, 762, 774, 880, 862, 814, 896, 890, 818, 914, 602, 930, 328, 292, 200, 158, 68, 62, 424, 412, 232, 218, 76, 74, 554, 616, 978, 556, 146, 340, 212, 182, 508, 268, 266, 956, 940, 938, 758, 782, 974, 400, 310, 118, 512, 506, 960, 954, 502, 518, 886, 966, /* Start codes */668, 680, 692, 5379];
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
				text: this.string.replace(/[^\x20-\x7E]/g, ""),
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
			return this.string.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1;
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
	}();

	exports.default = CODE128;

/***/ },
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _CODE = __webpack_require__(16);

	var _CODE2 = __webpack_require__(15);

	var _EAN_UPC = __webpack_require__(22);

	var _ITF = __webpack_require__(25);

	var _ITF2 = __webpack_require__(24);

	var _MSI = __webpack_require__(30);

	var _pharmacode = __webpack_require__(31);

	var _GenericBarcode = __webpack_require__(23);

	exports.default = {
	  CODE39: _CODE.CODE39,
	  CODE128: _CODE2.CODE128, CODE128A: _CODE2.CODE128A, CODE128B: _CODE2.CODE128B, CODE128C: _CODE2.CODE128C,
	  EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC,
	  ITF14: _ITF.ITF14,
	  ITF: _ITF2.ITF,
	  MSI: _MSI.MSI, MSI10: _MSI.MSI10, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010, MSI1110: _MSI.MSI1110,
	  pharmacode: _pharmacode.pharmacode,
	  GenericBarcode: _GenericBarcode.GenericBarcode
	};

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _optionsFromStrings = __webpack_require__(32);

	var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getOptionsFromElement(element, defaults) {
	  var options = {};
	  for (var property in defaults) {
	    // jsbarcode-*
	    if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
	      options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
	    }

	    // data-*
	    if (element.hasAttribute("data-" + property.toLowerCase())) {
	      options[property] = element.getAttribute("data-" + property.toLowerCase());
	    }
	  }

	  options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");

	  // Since all atributes are string they need to be converted to integers
	  options = (0, _optionsFromStrings2.default)(options);

	  return options;
	}

	exports.default = getOptionsFromElement;

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _canvas = __webpack_require__(33);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _svg = __webpack_require__(34);

	var _svg2 = _interopRequireDefault(_svg);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  canvas: _canvas2.default,
	  svg: _svg2.default
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	var _barcodes = __webpack_require__(5);

	var _barcodes2 = _interopRequireDefault(_barcodes);

	var _renderers = __webpack_require__(9);

	var _renderers2 = _interopRequireDefault(_renderers);

	var _merge = __webpack_require__(4);

	var _merge2 = _interopRequireDefault(_merge);

	var _linearizeEncodings = __webpack_require__(8);

	var _linearizeEncodings2 = _interopRequireDefault(_linearizeEncodings);

	var _fixOptions = __webpack_require__(6);

	var _fixOptions2 = _interopRequireDefault(_fixOptions);

	var _getOptionsFromElement = __webpack_require__(7);

	var _getOptionsFromElement2 = _interopRequireDefault(_getOptionsFromElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// The protype of the object returned from the JsBarcode() call


	// Help functions
	// Import all the barcodes
	var API = function API() {};

	// The first call of the library API
	// Will return an object with all barcodes calls and the information needed
	// when the rendering function is called and options the barcodes might need


	// Import the renderers
	var JsBarcode = function JsBarcode(element, text, options) {
		var api = new API();

		if (typeof element === "undefined") {
			throw Error("No element to render on was provided.");
		}

		// Variables that will be pased through the API calls
		api._renderProperties = getRenderProperies(element);
		api._encodings = [];
		api._options = defaults;

		// If text is set, use simple syntax
		if (typeof text !== "undefined") {
			options = options || {};

			if (!options.format) {
				options.format = autoSelectBarcode();
			}

			api.options(options);
			api[options.format](text, options);
			api.render();
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
			var newOptions = (0, _merge2.default)(this._options, options);
			var Encoder = barcodes[name];
			var encoded = encode(text, Encoder, newOptions);
			this._encodings.push(encoded);

			return this;
		};
	}

	function encode(text, Encoder, options) {
		var encoder = new Encoder(text, options);

		// If the input is not valid for the encoder, throw error.
		// If the valid callback option is set, call it instead of throwing error
		if (!encoder.valid()) {
			if (options.valid === defaults.valid) {
				throw new Error('"' + text + '" is not a valid input for ' + name);
			} else {
				options.valid(false);
			}
		}

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

	API.prototype.init = function () {
		// this._renderProperties can be
		if (!Array.isArray(this._renderProperties)) {
			this._renderProperties = [this._renderProperties];
		}

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = this._renderProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var renderProperty = _step.value;

				var options = (0, _merge2.default)(this._options, renderProperty.options);

				if (options.format == "auto") {
					options.format = autoSelectBarcode();
				}

				var text = options.value;

				var Encoder = _barcodes2.default[options.format.toUpperCase()];

				var encoded = encode(text, Encoder, options);

				render(renderProperty, encoded, options);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	};

	// The render API call. Calls the real render function.
	API.prototype.render = function () {
		if (Array.isArray(this._renderProperties)) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this._renderProperties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var renderProperty = _step2.value;

					render(renderProperty, this._encodings, this._options);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		} else {
			render(this._renderProperties, this._encodings, this._options);
		}

		this._options.valid(true);

		return this;
	};

	// Prepares the encodings and calls the renderer
	function render(renderProperties, encodings, options) {
		var renderer = _renderers2.default[renderProperties.renderer];

		encodings = (0, _linearizeEncodings2.default)(encodings);

		for (var i = 0; i < encodings.length; i++) {
			encodings[i].options = (0, _merge2.default)(options, encodings[i].options);
			(0, _fixOptions2.default)(encodings[i].options);
		}

		(0, _fixOptions2.default)(options);

		renderer(renderProperties.element, encodings, options);

		if (renderProperties.afterRender) {
			renderProperties.afterRender();
		}
	}

	// Export to browser
	if (typeof window !== "undefined") {
		window.JsBarcode = JsBarcode;
	}

	// Export to jQuery
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
	function getRenderProperies(element) {
		// If the element is a string, query select call again
		if (typeof element === "string") {
			var selector = document.querySelectorAll(element);
			if (selector.length === 0) {
				throw new Error("No element found");
			} else {
				var returnArray = [];
				for (var i = 0; i < selector.length; i++) {
					returnArray.push(getRenderProperies(selector[i]));
				}
				return returnArray;
			}
		}
		// If element is array. Recursivly call with every object in the array
		else if (Array.isArray(element)) {
				var returnArray = [];
				for (var i = 0; i < element.length; i++) {
					returnArray.push(getRenderProperies(element[i]));
				}
				return returnArray;
			}
			// If element, render on canvas and set the uri as src
			else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
					var canvas = document.createElement('canvas');
					return {
						element: canvas,
						options: (0, _getOptionsFromElement2.default)(element, defaults),
						renderer: "canvas",
						afterRender: function afterRender() {
							element.setAttribute("src", canvas.toDataURL());
						}
					};
				}
				// If SVG
				else if (typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
						return {
							element: element,
							options: (0, _getOptionsFromElement2.default)(element, defaults),
							renderer: "svg"
						};
					}
					// If canvas (in browser)
					else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLCanvasElement) {
							return {
								element: element,
								options: (0, _getOptionsFromElement2.default)(element, defaults),
								renderer: "canvas"
							};
						}
						// If canvas (in node)
						else if (element.getContext) {
								return {
									element: element,
									renderer: "canvas"
								};
							} else {
								throw new Error("Not supported type to render on.");
							}
	}

	var defaults = {
		width: 2,
		height: 100,
		format: "auto",
		displayValue: true,
		fontOptions: "",
		font: "monospace",
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
		valid: function valid(_valid) {}
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(2);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128A = function (_CODE) {
		_inherits(CODE128A, _CODE);

		function CODE128A(string) {
			_classCallCheck(this, CODE128A);

			return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(208) + string));
		}

		CODE128A.prototype.valid = function valid() {
			return this.string.search(/^[\x00-\x5F\xC8-\xCF]+$/) !== -1;
		};

		return CODE128A;
	}(_CODE3.default);

	exports.default = CODE128A;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(2);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128B = function (_CODE) {
		_inherits(CODE128B, _CODE);

		function CODE128B(string) {
			_classCallCheck(this, CODE128B);

			return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(209) + string));
		}

		CODE128B.prototype.valid = function valid() {
			return this.string.search(/^[\x20-\x7F\xC8-\xCF]+$/) !== -1;
		};

		return CODE128B;
	}(_CODE3.default);

	exports.default = CODE128B;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(2);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128C = function (_CODE) {
		_inherits(CODE128C, _CODE);

		function CODE128C(string) {
			_classCallCheck(this, CODE128C);

			return _possibleConstructorReturn(this, _CODE.call(this, String.fromCharCode(210) + string));
		}

		CODE128C.prototype.valid = function valid() {
			return this.string.search(/^(\xCF*[0-9]{2}\xCF*)+$/) !== -1;
		};

		return CODE128C;
	}(_CODE3.default);

	exports.default = CODE128C;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _CODE2 = __webpack_require__(2);

	var _CODE3 = _interopRequireDefault(_CODE2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128AUTO = function (_CODE) {
		_inherits(CODE128AUTO, _CODE);

		function CODE128AUTO(string) {
			_classCallCheck(this, CODE128AUTO);

			// ASCII value ranges 0-127, 200-211

			var _this = _possibleConstructorReturn(this, _CODE.call(this, string));

			if (string.search(/^[\x00-\x7F\xC8-\xD3]+$/) !== -1) {
				var _this = _possibleConstructorReturn(this, _CODE.call(this, autoSelectModes(string)));
			} else {
				var _this = _possibleConstructorReturn(this, _CODE.call(this, string));
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = undefined;

	var _CODE128_AUTO = __webpack_require__(14);

	var _CODE128_AUTO2 = _interopRequireDefault(_CODE128_AUTO);

	var _CODE128A = __webpack_require__(11);

	var _CODE128A2 = _interopRequireDefault(_CODE128A);

	var _CODE128B = __webpack_require__(12);

	var _CODE128B2 = _interopRequireDefault(_CODE128B);

	var _CODE128C = __webpack_require__(13);

	var _CODE128C2 = _interopRequireDefault(_CODE128C);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.CODE128 = _CODE128_AUTO2.default;
	exports.CODE128A = _CODE128A2.default;
	exports.CODE128B = _CODE128B2.default;
	exports.CODE128C = _CODE128C2.default;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Encoding documentation:
	// https://en.wikipedia.org/wiki/Code_39#Encoding

	var CODE39 = function () {
		function CODE39(string, options) {
			_classCallCheck(this, CODE39);

			this.string = string.toUpperCase();

			// Enable mod43 checksum?
			this.mod43Enabled = options.mod43 || false;

			// All characters. The position in the array is the (checksum) value
			this.characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];

			// The decimal representation of the characters, is converted to the
			// corresponding binary with the getEncoding function
			this.encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];
		}

		// Get the binary representation of a character by converting the encodings
		// from decimal to binary


		CODE39.prototype.getEncoding = function getEncoding(character) {
			return this.getBinary(this.characterValue(character));
		};

		CODE39.prototype.getBinary = function getBinary(characterValue) {
			return this.encodings[characterValue].toString(2);
		};

		CODE39.prototype.getCharacter = function getCharacter(characterValue) {
			return this.characters[characterValue];
		};

		CODE39.prototype.characterValue = function characterValue(character) {
			return this.characters.indexOf(character);
		};

		CODE39.prototype.encode = function encode() {
			var string = this.string;

			// First character is always a *
			var result = this.getEncoding("*");

			// Take every character and add the binary representation to the result
			for (var i = 0; i < this.string.length; i++) {
				result += this.getEncoding(this.string[i]) + "0";
			}

			// Calculate mod43 checksum if enabled
			if (this.mod43Enabled) {
				var checksum = 0;
				for (var i = 0; i < this.string.length; i++) {
					checksum += this.characterValue(this.string[i]);
				}

				checksum = checksum % 43;

				result += this.getBinary(checksum) + "0";
				string += this.getCharacter(checksum);
			}

			// Last character is always a *
			result += this.getEncoding("*");

			return {
				data: result,
				text: string
			};
		};

		CODE39.prototype.valid = function valid() {
			return this.string.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
		};

		return CODE39;
	}();

	exports.CODE39 = CODE39;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(0);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
	// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

	var EAN13 = function () {
		function EAN13(string, options) {
			_classCallCheck(this, EAN13);

			// Add checksum if it does not exist
			if (string.search(/^[0-9]{12}$/) !== -1) {
				this.string = string + this.checksum(string);
			} else {
				this.string = string;
			}

			// Define the EAN-13 structure
			this.structure = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];

			// Make sure the font is not bigger than the space between the guard bars
			if (options.fontSize > options.width * 10) {
				this.fontSize = options.width * 10;
			} else {
				this.fontSize = options.fontSize;
			}

			// Make the guard bars go down half the way of the text
			this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;

			// Adds a last character to the end of the barcode
			this.lastChar = options.lastChar;
		}

		EAN13.prototype.valid = function valid() {
			return this.string.search(/^[0-9]{13}$/) !== -1 && this.string[12] == this.checksum(this.string);
		};

		EAN13.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();
			var result = [];

			var structure = this.structure[this.string[0]];

			// Get the string to be encoded on the left side of the EAN code
			var leftSide = this.string.substr(1, 6);

			// Get the string to be encoded on the right side of the EAN code
			var rightSide = this.string.substr(7, 6);

			// Add the first digigt
			result.push({
				data: "000000000000",
				text: this.string[0],
				options: { textAlign: "left", fontSize: this.fontSize }
			});

			// Add the guard bars
			result.push({
				data: "101",
				options: { height: this.guardHeight }
			});

			// Add the left side
			result.push({
				data: encoder.encode(leftSide, structure),
				text: leftSide,
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
				text: rightSide,
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: "101",
				options: { height: this.guardHeight }
			});

			if (this.lastChar) {
				result.push({ data: "00" });

				result.push({
					data: "00000",
					text: this.lastChar,
					options: { fontSize: this.fontSize }
				});
			}

			return result;
		};

		// Calulate the checksum digit
		// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


		EAN13.prototype.checksum = function checksum(number) {
			var result = 0;

			var i;
			for (i = 0; i < 12; i += 2) {
				result += parseInt(number[i]);
			}
			for (i = 1; i < 12; i += 2) {
				result += parseInt(number[i]) * 3;
			}

			return (10 - result % 10) % 10;
		};

		return EAN13;
	}();

	exports.default = EAN13;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(0);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
	// https://en.wikipedia.org/wiki/EAN_2#Encoding

	var EAN2 = function () {
		function EAN2(string) {
			_classCallCheck(this, EAN2);

			this.string = string;

			this.structure = ["LL", "LG", "GL", "GG"];
		}

		EAN2.prototype.valid = function valid() {
			return this.string.search(/^[0-9]{2}$/) !== -1;
		};

		EAN2.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();

			// Choose the structure based on the number mod 4
			var structure = this.structure[parseInt(this.string) % 4];

			// Start bits
			var result = "1011";

			// Encode the two digits with 01 in between
			result += encoder.encode(this.string, structure, "01");

			return {
				data: result,
				text: this.string
			};
		};

		return EAN2;
	}();

	exports.default = EAN2;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(0);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
	// https://en.wikipedia.org/wiki/EAN_5#Encoding

	var EAN5 = function () {
		function EAN5(string) {
			_classCallCheck(this, EAN5);

			this.string = string;

			// Define the EAN-13 structure
			this.structure = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
		}

		EAN5.prototype.valid = function valid() {
			return this.string.search(/^[0-9]{5}$/) !== -1;
		};

		EAN5.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();
			var checksum = this.checksum();

			// Start bits
			var result = "1011";

			// Use normal ean encoding with 01 in between all digits
			result += encoder.encode(this.string, this.structure[checksum], "01");

			return {
				data: result,
				text: this.string
			};
		};

		EAN5.prototype.checksum = function checksum() {
			var result = 0;

			result += parseInt(this.string[0]) * 3;
			result += parseInt(this.string[1]) * 9;
			result += parseInt(this.string[2]) * 3;
			result += parseInt(this.string[3]) * 9;
			result += parseInt(this.string[4]) * 3;

			return result % 10;
		};

		return EAN5;
	}();

	exports.default = EAN5;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(0);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
	// http://www.barcodeisland.com/ean8.phtml

	var EAN8 = function () {
		function EAN8(string) {
			_classCallCheck(this, EAN8);

			// Add checksum if it does not exist
			if (string.search(/^[0-9]{7}$/) !== -1) {
				this.string = string + this.checksum(string);
			} else {
				this.string = string;
			}
		}

		EAN8.prototype.valid = function valid() {
			return this.string.search(/^[0-9]{8}$/) !== -1 && this.string[7] == this.checksum(this.string);
		};

		EAN8.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();

			// Create the return variable
			var result = "";

			// Get the number to be encoded on the left side of the EAN code
			var leftSide = this.string.substr(0, 4);

			// Get the number to be encoded on the right side of the EAN code
			var rightSide = this.string.substr(4, 4);

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
				text: this.string
			};
		};

		// Calulate the checksum digit


		EAN8.prototype.checksum = function checksum(number) {
			var result = 0;

			var i;
			for (i = 0; i < 7; i += 2) {
				result += parseInt(number[i]) * 3;
			}

			for (i = 1; i < 7; i += 2) {
				result += parseInt(number[i]);
			}

			return (10 - result % 10) % 10;
		};

		return EAN8;
	}();

	exports.default = EAN8;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ean_encoder = __webpack_require__(0);

	var _ean_encoder2 = _interopRequireDefault(_ean_encoder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } // Encoding documentation:
	// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

	var UPC = function () {
		function UPC(string, options) {
			_classCallCheck(this, UPC);

			// Add checksum if it does not exist
			if (string.search(/^[0-9]{11}$/) !== -1) {
				this.string = string + this.checksum(string);
			} else {
				this.string = string;
			}

			// Make sure the font is not bigger than the space between the guard bars
			if (options.fontSize > options.width * 10) {
				this.fontSize = options.width * 10;
			} else {
				this.fontSize = options.fontSize;
			}

			// Make the guard bars go down half the way of the text
			this.guardHeight = options.height + this.fontSize / 2 + options.textMargin;
		}

		UPC.prototype.valid = function valid() {
			return this.string.search(/^[0-9]{12}$/) !== -1 && this.string[11] == this.checksum(this.string);
		};

		UPC.prototype.encode = function encode() {
			var encoder = new _ean_encoder2.default();
			var result = [];

			// Add the first digigt
			result.push({
				data: "00000000",
				text: this.string[0],
				options: { textAlign: "left", fontSize: this.fontSize }
			});

			// Add the guard bars
			result.push({
				data: "101" + encoder.encode(this.string[0], "L"),
				options: { height: this.guardHeight }
			});

			// Add the left side
			result.push({
				data: encoder.encode(this.string.substr(1, 5), "LLLLL"),
				text: this.string.substr(1, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the middle bits
			result.push({
				data: "01010",
				options: { height: this.guardHeight }
			});

			// Add the right side
			result.push({
				data: encoder.encode(this.string.substr(6, 5), "RRRRR"),
				text: this.string.substr(6, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: encoder.encode(this.string[11], "R") + "101",
				options: { height: this.guardHeight }
			});

			// Add the last digit
			result.push({
				data: "00000000",
				text: this.string[11],
				options: { textAlign: "right", fontSize: this.fontSize }
			});

			return result;
		};

		// Calulate the checksum digit
		// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


		UPC.prototype.checksum = function checksum(number) {
			var result = 0;

			var i;
			for (i = 1; i < 11; i += 2) {
				result += parseInt(number[i]);
			}
			for (i = 0; i < 11; i += 2) {
				result += parseInt(number[i]) * 3;
			}

			return (10 - result % 10) % 10;
		};

		return UPC;
	}();

	exports.default = UPC;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

	var _EAN = __webpack_require__(17);

	var _EAN2 = _interopRequireDefault(_EAN);

	var _EAN3 = __webpack_require__(20);

	var _EAN4 = _interopRequireDefault(_EAN3);

	var _EAN5 = __webpack_require__(19);

	var _EAN6 = _interopRequireDefault(_EAN5);

	var _EAN7 = __webpack_require__(18);

	var _EAN8 = _interopRequireDefault(_EAN7);

	var _UPC = __webpack_require__(21);

	var _UPC2 = _interopRequireDefault(_UPC);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.EAN13 = _EAN2.default;
	exports.EAN8 = _EAN4.default;
	exports.EAN5 = _EAN6.default;
	exports.EAN2 = _EAN8.default;
	exports.UPC = _UPC2.default;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GenericBarcode = function () {
		function GenericBarcode(string) {
			_classCallCheck(this, GenericBarcode);

			this.string = string;
		}

		// Return the corresponding binary numbers for the data provided


		GenericBarcode.prototype.encode = function encode() {
			return {
				data: "10101010101010101010101010101010101010101",
				text: this.string
			};
		};

		// Resturn true/false if the string provided is valid for this encoder


		GenericBarcode.prototype.valid = function valid() {
			return true;
		};

		return GenericBarcode;
	}();

	exports.GenericBarcode = GenericBarcode;

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ITF = function () {
		function ITF(string) {
			_classCallCheck(this, ITF);

			this.string = string;

			this.binaryRepresentation = {
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
		}

		ITF.prototype.valid = function valid() {
			return this.string.search(/^([0-9]{2})+$/) !== -1;
		};

		ITF.prototype.encode = function encode() {
			// Always add the same start bits
			var result = "1010";

			// Calculate all the digit pairs
			for (var i = 0; i < this.string.length; i += 2) {
				result += this.calculatePair(this.string.substr(i, 2));
			}

			// Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.string
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
	}();

	exports.ITF = ITF;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ITF14 = function () {
		function ITF14(string) {
			_classCallCheck(this, ITF14);

			this.string = string;

			// Add checksum if it does not exist
			if (string.search(/^[0-9]{13}$/) !== -1) {
				this.string += this.checksum(string);
			}

			this.binaryRepresentation = {
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
		}

		ITF14.prototype.valid = function valid() {
			return this.string.search(/^[0-9]{14}$/) !== -1 && this.string[13] == this.checksum();
		};

		ITF14.prototype.encode = function encode() {
			var result = "1010";

			// Calculate all the digit pairs
			for (var i = 0; i < 14; i += 2) {
				result += this.calculatePair(this.string.substr(i, 2));
			}

			// Always add the same end bits
			result += "11101";

			return {
				data: result,
				text: this.string
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

		// Calulate the checksum digit


		ITF14.prototype.checksum = function checksum() {
			var result = 0;

			for (var i = 0; i < 13; i++) {
				result += parseInt(this.string[i]) * (3 - i % 2 * 2);
			}

			return 10 - result % 10;
		};

		return ITF14;
	}();

	exports.ITF14 = ITF14;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(1);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI10 = function (_MSI) {
		_inherits(MSI10, _MSI);

		function MSI10(string) {
			_classCallCheck(this, MSI10);

			var _this = _possibleConstructorReturn(this, _MSI.call(this, string));

			_this.string += (0, _checksums.mod10)(_this.string);
			return _this;
		}

		return MSI10;
	}(_MSI3.default);

	exports.default = MSI10;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(1);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI1010 = function (_MSI) {
		_inherits(MSI1010, _MSI);

		function MSI1010(string) {
			_classCallCheck(this, MSI1010);

			var _this = _possibleConstructorReturn(this, _MSI.call(this, string));

			_this.string += (0, _checksums.mod10)(_this.string);
			_this.string += (0, _checksums.mod10)(_this.string);
			return _this;
		}

		return MSI1010;
	}(_MSI3.default);

	exports.default = MSI1010;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(1);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI11 = function (_MSI) {
		_inherits(MSI11, _MSI);

		function MSI11(string) {
			_classCallCheck(this, MSI11);

			var _this = _possibleConstructorReturn(this, _MSI.call(this, string));

			_this.string += (0, _checksums.mod11)(_this.string);
			return _this;
		}

		return MSI11;
	}(_MSI3.default);

	exports.default = MSI11;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _MSI2 = __webpack_require__(1);

	var _MSI3 = _interopRequireDefault(_MSI2);

	var _checksums = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI1110 = function (_MSI) {
		_inherits(MSI1110, _MSI);

		function MSI1110(string) {
			_classCallCheck(this, MSI1110);

			var _this = _possibleConstructorReturn(this, _MSI.call(this, string));

			_this.string += (0, _checksums.mod11)(_this.string);
			_this.string += (0, _checksums.mod10)(_this.string);
			return _this;
		}

		return MSI1110;
	}(_MSI3.default);

	exports.default = MSI1110;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = undefined;

	var _MSI = __webpack_require__(1);

	var _MSI2 = _interopRequireDefault(_MSI);

	var _MSI3 = __webpack_require__(26);

	var _MSI4 = _interopRequireDefault(_MSI3);

	var _MSI5 = __webpack_require__(28);

	var _MSI6 = _interopRequireDefault(_MSI5);

	var _MSI7 = __webpack_require__(27);

	var _MSI8 = _interopRequireDefault(_MSI7);

	var _MSI9 = __webpack_require__(29);

	var _MSI10 = _interopRequireDefault(_MSI9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.MSI = _MSI2.default;
	exports.MSI10 = _MSI4.default;
	exports.MSI11 = _MSI6.default;
	exports.MSI1010 = _MSI8.default;
	exports.MSI1110 = _MSI10.default;

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Encoding documentation
	// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

	var pharmacode = function () {
	  function pharmacode(string) {
	    _classCallCheck(this, pharmacode);

	    this.number = parseInt(string, 10);
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
	      text: this.number + ""
	    };
	  };

	  pharmacode.prototype.valid = function valid() {
	    return this.number >= 3 && this.number <= 131070;
	  };

	  return pharmacode;
	}();

	exports.pharmacode = pharmacode;

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = optionsFromStrings;

	// Convert string to integers/booleans where it should be

	function optionsFromStrings(options) {
	  var intOptions = ["width", "height", "textMargin", "fontSize", "margin", "marginLeft", "marginBottom", "marginLeft", "marginRight"];

	  for (var intOption in intOptions) {
	    intOption = intOptions[intOption];
	    if (typeof options[intOption] === "string") {
	      options[intOption] = parseInt(options[intOption], 10);
	    }
	  }

	  if (typeof options["displayValue"] === "string") {
	    options["displayValue"] = options["displayValue"] != "false";
	  }

	  return options;
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _merge = __webpack_require__(4);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = renderCanvas;


	function renderCanvas(canvas, encodings, options) {
		// Abort if the browser does not support HTML5 canvas
		if (!canvas.getContext) {
			throw new Error('The browser does not support canvas.');
		}

		prepareCanvas(canvas, options, encodings);
		for (var i = 0; i < encodings.length; i++) {
			var encodingOptions = (0, _merge2.default)(options, encodings[i].options);

			drawCanvasBarcode(canvas, encodingOptions, encodings[i]);
			drawCanvasText(canvas, encodingOptions, encodings[i]);

			moveCanvasDrawing(canvas, encodings[i]);
		}

		restoreCanvas(canvas);
	}

	function prepareCanvas(canvas, options, encodings) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

		ctx.save();

		// Calculate total width
		var totalWidth = 0;
		var maxHeight = 0;
		for (var i = 0; i < encodings.length; i++) {
			var _options = (0, _merge2.default)(_options, encodings[i].options);

			// Set font
			ctx.font = _options.fontOptions + " " + _options.fontSize + "px " + _options.font;

			// Calculate the width of the encoding
			var textWidth = ctx.measureText(encodings[i].text).width;
			var barcodeWidth = encodings[i].data.length * _options.width;
			encodings[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));

			// Calculate the height of the encoding
			var height = _options.height + (_options.displayValue && encodings[i].text.length > 0 ? _options.fontSize : 0) + _options.textMargin + _options.marginTop + _options.marginBottom;

			var barcodePadding = 0;
			if (_options.displayValue && barcodeWidth < textWidth) {
				if (_options.textAlign == "center") {
					barcodePadding = Math.floor((textWidth - barcodeWidth) / 2);
				} else if (_options.textAlign == "left") {
					barcodePadding = 0;
				} else if (_options.textAlign == "right") {
					barcodePadding = Math.floor(textWidth - barcodeWidth);
				}
			}
			encodings[i].barcodePadding = barcodePadding;

			if (height > maxHeight) {
				maxHeight = height;
			}

			totalWidth += encodings[i].width;
		}

		canvas.width = totalWidth + options.marginLeft + options.marginRight;

		canvas.height = maxHeight;

		// Paint the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (options.background) {
			ctx.fillStyle = options.background;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		ctx.translate(options.marginLeft, 0);
	}

	function drawCanvasBarcode(canvas, options, encoding) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

		var binary = encoding.data;

		// Creates the barcode out of the encoded binary
		var yFrom, yHeight;
		if (options.textPosition == "top") {
			yFrom = options.marginTop + options.fontSize + options.textMargin;
		} else {
			yFrom = options.marginTop;
		}
		yHeight = options.height;

		ctx.fillStyle = options.lineColor;

		for (var b = 0; b < binary.length; b++) {
			var x = b * options.width + encoding.barcodePadding;

			if (binary[b] === "1") {
				ctx.fillRect(x, yFrom, options.width, options.height);
			} else if (binary[b]) {
				ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
			}
		}
	}

	function drawCanvasText(canvas, options, encoding) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

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
	}

	function moveCanvasDrawing(canvas, encoding) {
		var ctx = canvas.getContext("2d");

		ctx.translate(encoding.width, 0);
	}

	function restoreCanvas(canvas) {
		// Get the canvas context
		var ctx = canvas.getContext("2d");

		ctx.restore();
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _merge = __webpack_require__(4);

	var _merge2 = _interopRequireDefault(_merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = renderSVG;


	var svgns = "http://www.w3.org/2000/svg";

	function renderSVG(svg, encodings, options) {
	  var currentX = options.marginLeft;

	  prepareSVG(svg, options, encodings);
	  for (var i = 0; i < encodings.length; i++) {
	    var encodingOptions = (0, _merge2.default)(options, encodings[i].options);

	    var group = createGroup(currentX, encodingOptions.marginTop, svg);

	    setGroupOptions(group, encodingOptions, encodings[i]);

	    drawSvgBarcode(group, encodingOptions, encodings[i]);
	    drawSVGText(group, encodingOptions, encodings[i]);

	    currentX += encodings[i].width;
	  }
	}

	function prepareSVG(svg, options, encodings) {
	  // Clear the SVG
	  while (svg.firstChild) {
	    svg.removeChild(svg.firstChild);
	  }

	  var totalWidth = 0;
	  var maxHeight = 0;
	  for (var i = 0; i < encodings.length; i++) {
	    var _options = (0, _merge2.default)(_options, encodings[i].options);

	    // Calculate the width of the encoding
	    var textWidth = messureSVGtext(encodings[i].text, svg, _options);
	    var barcodeWidth = encodings[i].data.length * _options.width;
	    encodings[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));

	    // Calculate the height of the encoding
	    var encodingHeight = _options.height + (_options.displayValue && encodings[i].text.length > 0 ? _options.fontSize : 0) + _options.textMargin + _options.marginTop + _options.marginBottom;

	    var barcodePadding = 0;
	    if (_options.displayValue && barcodeWidth < textWidth) {
	      if (_options.textAlign == "center") {
	        barcodePadding = Math.floor((textWidth - barcodeWidth) / 2);
	      } else if (_options.textAlign == "left") {
	        barcodePadding = 0;
	      } else if (_options.textAlign == "right") {
	        barcodePadding = Math.floor(textWidth - barcodeWidth);
	      }
	    }
	    encodings[i].barcodePadding = barcodePadding;

	    if (encodingHeight > maxHeight) {
	      maxHeight = encodingHeight;
	    }

	    totalWidth += encodings[i].width;
	  }

	  var width = totalWidth + options.marginLeft + options.marginRight;
	  var height = maxHeight;

	  svg.setAttribute("width", width + "px");
	  svg.setAttribute("height", height + "px");
	  svg.setAttribute("x", "0px");
	  svg.setAttribute("y", "0px");
	  svg.setAttribute("viewBox", "0 0 " + width + " " + height);

	  svg.setAttribute("xmlns", svgns);
	  svg.setAttribute("version", "1.1");

	  svg.style.transform = "translate(0,0)";

	  if (options.background) {
	    svg.style.background = options.background;
	  }
	}

	function drawSvgBarcode(parent, options, encoding) {
	  var binary = encoding.data;

	  // Creates the barcode out of the encoded binary
	  var yFrom, yHeight;
	  if (options.textPosition == "top") {
	    yFrom = options.fontSize + options.textMargin;
	  } else {
	    yFrom = 0;
	  }
	  yHeight = options.height;

	  var barWidth = 0;
	  for (var b = 0; b < binary.length; b++) {
	    var x = b * options.width + encoding.barcodePadding;

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
	}

	function drawSVGText(parent, options, encoding) {
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
	}

	//
	// Help functions
	//
	function messureSVGtext(string, svg, options) {
	  // Create text element
	  /* var text = document.createElementNS(svgns, 'text');
	  text.style.fontFamily = options.font;
	    text.setAttribute("style",
	     "font-family:" + options.font + ";" +
	     "font-size:" + options.fontSize + "px;"
	   );
	  	var textNode = document.createTextNode(string);
	  	text.appendChild(textNode);
	    svg.appendChild(text);
	    var size = text.getComputedTextLength();
	    svg.removeChild(text);
	   */
	  // TODO: Use svg to messure the text width
	  // Set font
	  var ctx = document.createElement("canvas").getContext("2d");
	  ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

	  // Calculate the width of the encoding
	  var size = ctx.measureText(string).width;

	  return size;
	}

	function createGroup(x, y, svg) {
	  var group = document.createElementNS(svgns, 'g');

	  group.setAttribute("transform", "translate(" + x + ", " + y + ")");

	  svg.appendChild(group);

	  return group;
	}

	function setGroupOptions(group, options, encoding) {
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

/***/ }
/******/ ]);