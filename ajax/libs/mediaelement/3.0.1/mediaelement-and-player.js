/*!
 * MediaElement.js
 * http://www.mediaelement.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = _dereq_(1);

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _en = _dereq_(14);

var _general = _dereq_(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Locale.
 *
 * This object manages translations with pluralization. Also deals with WordPress compatibility.
 * @type {Object}
 */
var i18n = { lang: 'en', en: _en.EN };

/**
 * Language setter/getter
 *
 * @param {*} args  Can pass the language code and/or the translation strings as an Object
 * @return {string}
 */
i18n.language = function () {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	if (args !== null && args !== undefined && args.length) {

		if (typeof args[0] !== 'string') {
			throw new TypeError('Language code must be a string value');
		}

		if (!args[0].match(/^[a-z]{2}(\-[a-z]{2})?$/i)) {
			throw new TypeError('Language code must have format `xx` or `xx-xx`');
		}

		i18n.lang = args[0];

		// Check if language strings were added; otherwise, check the second argument or set to English as default
		if (i18n[args[0]] === undefined) {
			args[1] = args[1] !== null && args[1] !== undefined && _typeof(args[1]) === 'object' ? args[1] : {};
			i18n[args[0]] = !(0, _general.isObjectEmpty)(args[1]) ? args[1] : _en.EN;
		} else if (args[1] !== null && args[1] !== undefined && _typeof(args[1]) === 'object') {
			i18n[args[0]] = args[1];
		}
	}

	return i18n.lang;
};

/**
 * Translate a string in the language set up (or English by default)
 *
 * @param {string} message
 * @param {number} pluralParam
 * @return {string}
 */
i18n.t = function (message) {
	var pluralParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


	if (typeof message === 'string' && message.length) {

		var str = void 0,
		    pluralForm = void 0;

		var language = i18n.language();

		/**
   * Modify string using algorithm to detect plural forms.
   *
   * @private
   * @see http://stackoverflow.com/questions/1353408/messageformat-in-javascript-parameters-in-localized-ui-strings
   * @param {String|String[]} input   - String or array of strings to pick the plural form
   * @param {Number} number           - Number to determine the proper plural form
   * @param {Number} form             - Number of language family to apply plural form
   * @return {String}
   */
		var _plural = function _plural(input, number, form) {

			if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' || typeof number !== 'number' || typeof form !== 'number') {
				return input;
			}

			/**
    *
    * @return {Function[]}
    * @private
    */
			var _pluralForms = function () {
				return [
				// 0: Chinese, Japanese, Korean, Persian, Turkish, Thai, Lao, Aymará,
				// Tibetan, Chiga, Dzongkha, Indonesian, Lojban, Georgian, Kazakh, Khmer, Kyrgyz, Malay,
				// Burmese, Yakut, Sundanese, Tatar, Uyghur, Vietnamese, Wolof
				function () {
					return arguments.length <= 1 ? undefined : arguments[1];
				},

				// 1: Danish, Dutch, English, Faroese, Frisian, German, Norwegian, Swedish, Estonian, Finnish,
				// Hungarian, Basque, Greek, Hebrew, Italian, Portuguese, Spanish, Catalan, Afrikaans,
				// Angika, Assamese, Asturian, Azerbaijani, Bulgarian, Bengali, Bodo, Aragonese, Dogri,
				// Esperanto, Argentinean Spanish, Fulah, Friulian, Galician, Gujarati, Hausa,
				// Hindi, Chhattisgarhi, Armenian, Interlingua, Greenlandic, Kannada, Kurdish, Letzeburgesch,
				// Maithili, Malayalam, Mongolian, Manipuri, Marathi, Nahuatl, Neapolitan, Norwegian Bokmal,
				// Nepali, Norwegian Nynorsk, Norwegian (old code), Northern Sotho, Oriya, Punjabi, Papiamento,
				// Piemontese, Pashto, Romansh, Kinyarwanda, Santali, Scots, Sindhi, Northern Sami, Sinhala,
				// Somali, Songhay, Albanian, Swahili, Tamil, Telugu, Turkmen, Urdu, Yoruba
				function () {
					return (arguments.length <= 0 ? undefined : arguments[0]) === 1 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 2 ? undefined : arguments[2];
				},

				// 2: French, Brazilian Portuguese, Acholi, Akan, Amharic, Mapudungun, Breton, Filipino,
				// Gun, Lingala, Mauritian Creole, Malagasy, Maori, Occitan, Tajik, Tigrinya, Uzbek, Walloon
				function () {
					return (arguments.length <= 0 ? undefined : arguments[0]) === 0 || (arguments.length <= 0 ? undefined : arguments[0]) === 1 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 2 ? undefined : arguments[2];
				},

				// 3: Latvian
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 === 1 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 !== 11) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) !== 0) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else {
						return arguments.length <= 3 ? undefined : arguments[3];
					}
				},

				// 4: Scottish Gaelic
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 1 || (arguments.length <= 0 ? undefined : arguments[0]) === 11) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2 || (arguments.length <= 0 ? undefined : arguments[0]) === 12) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) > 2 && (arguments.length <= 0 ? undefined : arguments[0]) < 20) {
						return arguments.length <= 3 ? undefined : arguments[3];
					} else {
						return arguments.length <= 4 ? undefined : arguments[4];
					}
				},

				// 5:  Romanian
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 0 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 > 0 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 < 20) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else {
						return arguments.length <= 3 ? undefined : arguments[3];
					}
				},

				// 6: Lithuanian
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 === 1 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 !== 11) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 >= 2 && ((arguments.length <= 0 ? undefined : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 20)) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else {
						return [3];
					}
				},

				// 7: Belarusian, Bosnian, Croatian, Serbian, Russian, Ukrainian
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 === 1 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 !== 11) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? undefined : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? undefined : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 20)) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else {
						return arguments.length <= 3 ? undefined : arguments[3];
					}
				},

				// 8:  Slovak, Czech
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) >= 2 && (arguments.length <= 0 ? undefined : arguments[0]) <= 4) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else {
						return arguments.length <= 3 ? undefined : arguments[3];
					}
				},

				// 9: Polish
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? undefined : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? undefined : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 20)) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else {
						return arguments.length <= 3 ? undefined : arguments[3];
					}
				},

				// 10: Slovenian
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 === 1) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 === 2) {
						return arguments.length <= 3 ? undefined : arguments[3];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 === 3 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 === 4) {
						return arguments.length <= 4 ? undefined : arguments[4];
					} else {
						return arguments.length <= 1 ? undefined : arguments[1];
					}
				},

				// 11: Irish Gaelic
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) > 2 && (arguments.length <= 0 ? undefined : arguments[0]) < 7) {
						return arguments.length <= 3 ? undefined : arguments[3];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) > 6 && (arguments.length <= 0 ? undefined : arguments[0]) < 11) {
						return arguments.length <= 4 ? undefined : arguments[4];
					} else {
						return arguments.length <= 5 ? undefined : arguments[5];
					}
				},

				// 12: Arabic
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 0) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2) {
						return arguments.length <= 3 ? undefined : arguments[3];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 3 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 <= 10) {
						return arguments.length <= 4 ? undefined : arguments[4];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 11) {
						return arguments.length <= 5 ? undefined : arguments[5];
					} else {
						return arguments.length <= 6 ? undefined : arguments[6];
					}
				},

				// 13: Maltese
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 0 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 > 1 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 < 11) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 > 10 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 < 20) {
						return arguments.length <= 3 ? undefined : arguments[3];
					} else {
						return arguments.length <= 4 ? undefined : arguments[4];
					}
				},

				// 14: Macedonian
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 === 1) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 === 2) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else {
						return arguments.length <= 3 ? undefined : arguments[3];
					}
				},

				// 15:  Icelandic
				function () {
					return (arguments.length <= 0 ? undefined : arguments[0]) !== 11 && (arguments.length <= 0 ? undefined : arguments[0]) % 10 === 1 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 2 ? undefined : arguments[2];
				},

				// New additions

				// 16:  Kashubian
				// In https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals#List_of__pluralRules
				// Breton is listed as #16 but in the Localization Guide it belongs to the group 2
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? undefined : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? undefined : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 20)) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else {
						return arguments.length <= 3 ? undefined : arguments[3];
					}
				},

				// 17:  Welsh
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) !== 8 && (arguments.length <= 0 ? undefined : arguments[0]) !== 11) {
						return arguments.length <= 3 ? undefined : arguments[3];
					} else {
						return arguments.length <= 4 ? undefined : arguments[4];
					}
				},

				// 18:  Javanese
				function () {
					return (arguments.length <= 0 ? undefined : arguments[0]) === 0 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 2 ? undefined : arguments[2];
				},

				// 19:  Cornish
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 3) {
						return arguments.length <= 3 ? undefined : arguments[3];
					} else {
						return arguments.length <= 4 ? undefined : arguments[4];
					}
				},

				// 20:  Mandinka
				function () {
					if ((arguments.length <= 0 ? undefined : arguments[0]) === 0) {
						return arguments.length <= 1 ? undefined : arguments[1];
					} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
						return arguments.length <= 2 ? undefined : arguments[2];
					} else {
						return arguments.length <= 3 ? undefined : arguments[3];
					}
				}];
			}();

			// Perform plural form or return original text
			return _pluralForms[form].apply(null, [number].concat(input));
		};

		// Fetch the localized version of the string
		if (i18n[language] !== undefined) {
			str = i18n[language][message];
			if (pluralParam !== null && typeof pluralParam === 'number') {
				pluralForm = i18n[language]['mejs.plural-form'];
				str = _plural.apply(null, [str, pluralParam, pluralForm]);
			}
		}

		// Fallback to default language if requested uid is not translated
		if (!str && i18n.en) {
			str = i18n.en[message];
			if (pluralParam !== null && typeof pluralParam === 'number') {
				pluralForm = i18n.en['mejs.plural-form'];
				str = _plural.apply(null, [str, pluralParam, pluralForm]);
			}
		}

		// As a last resort, use the requested uid, to mimic original behavior of i18n utils
		// (in which uid was the english text)
		str = str || message;

		// Replace token
		if (pluralParam !== null && typeof pluralParam === 'number') {
			str = str.replace('%1', pluralParam);
		}

		return (0, _general.escapeHTML)(str);
	}

	return message;
};

_mejs2.default.i18n = i18n;

// `i18n` compatibility workflow with WordPress
if (typeof mejsL10n !== 'undefined') {
	_mejs2.default.i18n.language(mejsL10n.language, mejsL10n.strings);
}

exports.default = i18n;

},{"14":14,"29":29,"6":6}],5:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _media = _dereq_(30);

var _renderer = _dereq_(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Media Core
 *
 * This class is the foundation to create/render different media formats.
 * @class MediaElement
 */
var MediaElement = function MediaElement(idOrNode, options) {
	var _this = this;

	_classCallCheck(this, MediaElement);

	var t = this;

	t.defaults = {
		/**
   * List of the renderers to use
   * @type {String[]}
   */
		renderers: [],
		/**
   * Name of MediaElement container
   * @type {String}
   */
		fakeNodeName: 'mediaelementwrapper',
		/**
   * The path where shims are located
   * @type {String}
   */
		pluginPath: 'build/'
	};

	options = Object.assign(t.defaults, options);

	// create our node (note: older versions of iOS don't support Object.defineProperty on DOM nodes)
	t.mediaElement = _document2.default.createElement(options.fakeNodeName);
	t.mediaElement.options = options;

	var id = idOrNode,
	    i = void 0,
	    il = void 0;

	if (typeof idOrNode === 'string') {
		t.mediaElement.originalNode = _document2.default.getElementById(idOrNode);
	} else {
		t.mediaElement.originalNode = idOrNode;
		id = idOrNode.id;
	}

	id = id || 'mejs_' + Math.random().toString().slice(2);

	if (t.mediaElement.originalNode !== undefined && t.mediaElement.originalNode !== null && t.mediaElement.appendChild) {
		// change id
		t.mediaElement.originalNode.setAttribute('id', id + '_from_mejs');

		// add next to this one
		t.mediaElement.originalNode.parentNode.insertBefore(t.mediaElement, t.mediaElement.originalNode);

		// insert this one inside
		t.mediaElement.appendChild(t.mediaElement.originalNode);
	} else {
		// TODO: where to put the node?
	}

	t.mediaElement.id = id;
	t.mediaElement.renderers = {};
	t.mediaElement.renderer = null;
	t.mediaElement.rendererName = null;
	/**
  * Determine whether the renderer was found or not
  *
  * @public
  * @param {String} rendererName
  * @param {Object[]} mediaFiles
  * @return {Boolean}
  */
	t.mediaElement.changeRenderer = function (rendererName, mediaFiles) {

		var t = _this;

		// check for a match on the current renderer
		if (t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null && t.mediaElement.renderer.name === rendererName) {
			t.mediaElement.renderer.pause();
			if (t.mediaElement.renderer.stop) {
				t.mediaElement.renderer.stop();
			}
			t.mediaElement.renderer.show();
			t.mediaElement.renderer.setSrc(mediaFiles[0].src);
			return true;
		}

		// if existing renderer is not the right one, then hide it
		if (t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null) {
			t.mediaElement.renderer.pause();
			if (t.mediaElement.renderer.stop) {
				t.mediaElement.renderer.stop();
			}
			t.mediaElement.renderer.hide();
		}

		// see if we have the renderer already created
		var newRenderer = t.mediaElement.renderers[rendererName],
		    newRendererType = null;

		if (newRenderer !== undefined && newRenderer !== null) {
			newRenderer.show();
			newRenderer.setSrc(mediaFiles[0].src);
			t.mediaElement.renderer = newRenderer;
			t.mediaElement.rendererName = rendererName;
			return true;
		}

		var rendererArray = t.mediaElement.options.renderers.length ? t.mediaElement.options.renderers : _renderer.renderer.order;

		// find the desired renderer in the array of possible ones
		for (i = 0, il = rendererArray.length; i < il; i++) {

			var index = rendererArray[i];

			if (index === rendererName) {

				// create the renderer
				var rendererList = _renderer.renderer.renderers;
				newRendererType = rendererList[index];

				var renderOptions = Object.assign(newRendererType.options, t.mediaElement.options);
				newRenderer = newRendererType.create(t.mediaElement, renderOptions, mediaFiles);
				newRenderer.name = rendererName;

				// store for later
				t.mediaElement.renderers[newRendererType.name] = newRenderer;
				t.mediaElement.renderer = newRenderer;
				t.mediaElement.rendererName = rendererName;

				newRenderer.show();

				return true;
			}
		}

		return false;
	};

	/**
  * Set the element dimensions based on selected renderer's setSize method
  *
  * @public
  * @param {number} width
  * @param {number} height
  */
	t.mediaElement.setSize = function (width, height) {
		if (t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null) {
			t.mediaElement.renderer.setSize(width, height);
		}
	};

	var props = _mejs2.default.html5media.properties,
	    methods = _mejs2.default.html5media.methods,
	    addProperty = function addProperty(obj, name, onGet, onSet) {

		// wrapper functions
		var oldValue = obj[name];
		var getFn = function getFn() {
			return onGet.apply(obj, [oldValue]);
		},
		    setFn = function setFn(newValue) {
			oldValue = onSet.apply(obj, [newValue]);
			return oldValue;
		};

		// Modern browsers, IE9+ (IE8 only works on DOM objects, not normal JS objects)
		if (Object.defineProperty) {

			Object.defineProperty(obj, name, {
				get: getFn,
				set: setFn
			});

			// Older Firefox
		} else if (obj.__defineGetter__) {

			obj.__defineGetter__(name, getFn);
			obj.__defineSetter__(name, setFn);
		}
	},
	    assignGettersSetters = function assignGettersSetters(propName) {
		if (propName !== 'src') {
			(function () {

				var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1),
				    getFn = function getFn() {
					return t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null ? t.mediaElement.renderer['get' + capName]() : null;
				},
				    setFn = function setFn(value) {
					if (t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null) {
						t.mediaElement.renderer['set' + capName](value);
					}
				};

				addProperty(t.mediaElement, propName, getFn, setFn);
				t.mediaElement['get' + capName] = getFn;
				t.mediaElement['set' + capName] = setFn;
			})();
		}
	},

	// `src` is a property separated from the others since it carries the logic to set the proper renderer
	// based on the media files detected
	getSrc = function getSrc() {
		return t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null ? t.mediaElement.renderer.getSrc() : null;
	},
	    setSrc = function setSrc(value) {

		var mediaFiles = [];

		// clean up URLs
		if (typeof value === 'string') {
			mediaFiles.push({
				src: value,
				type: value ? (0, _media.getTypeFromFile)(value) : ''
			});
		} else {
			for (i = 0, il = value.length; i < il; i++) {

				var src = (0, _media.absolutizeUrl)(value[i].src),
				    type = value[i].type;

				mediaFiles.push({
					src: src,
					type: (type === '' || type === null || type === undefined) && src ? (0, _media.getTypeFromFile)(src) : type
				});
			}
		}

		// find a renderer and URL match
		var renderInfo = _renderer.renderer.select(mediaFiles, t.mediaElement.options.renderers.length ? t.mediaElement.options.renderers : []),
		    event = void 0;

		// Ensure that the original gets the first source found
		t.mediaElement.originalNode.setAttribute('src', mediaFiles[0].src || '');

		// did we find a renderer?
		if (renderInfo === null) {
			event = _document2.default.createEvent('HTMLEvents');
			event.initEvent('error', false, false);
			event.message = 'No renderer found';
			t.mediaElement.dispatchEvent(event);
			return;
		}

		// turn on the renderer (this checks for the existing renderer already)
		t.mediaElement.changeRenderer(renderInfo.rendererName, mediaFiles);

		if (t.mediaElement.renderer === undefined || t.mediaElement.renderer === null) {
			event = _document2.default.createEvent('HTMLEvents');
			event.initEvent('error', false, false);
			event.message = 'Error creating renderer';
			t.mediaElement.dispatchEvent(event);
		}
	},
	    assignMethods = function assignMethods(methodName) {
		// run the method on the current renderer
		t.mediaElement[methodName] = function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null && typeof t.mediaElement.renderer[methodName] === 'function' ? t.mediaElement.renderer[methodName](args) : null;
		};
	};

	// Assign all methods/properties/events to fake node if renderer was found
	addProperty(t.mediaElement, 'src', getSrc, setSrc);
	t.mediaElement.getSrc = getSrc;
	t.mediaElement.setSrc = setSrc;

	for (i = 0, il = props.length; i < il; i++) {
		assignGettersSetters(props[i]);
	}

	for (i = 0, il = methods.length; i < il; i++) {
		assignMethods(methods[i]);
	}

	// IE && iOS
	if (!t.mediaElement.addEventListener) {

		t.mediaElement.events = {};

		// start: fake events
		t.mediaElement.addEventListener = function (eventName, callback) {
			// create or find the array of callbacks for this eventName
			t.mediaElement.events[eventName] = t.mediaElement.events[eventName] || [];

			// push the callback into the stack
			t.mediaElement.events[eventName].push(callback);
		};
		t.mediaElement.removeEventListener = function (eventName, callback) {
			// no eventName means remove all listeners
			if (!eventName) {
				t.mediaElement.events = {};
				return true;
			}

			// see if we have any callbacks for this eventName
			var callbacks = t.mediaElement.events[eventName];

			if (!callbacks) {
				return true;
			}

			// check for a specific callback
			if (!callback) {
				t.mediaElement.events[eventName] = [];
				return true;
			}

			// remove the specific callback
			for (var _i = 0, _il = callbacks.length; _i < _il; _i++) {
				if (callbacks[_i] === callback) {
					t.mediaElement.events[eventName].splice(_i, 1);
					return true;
				}
			}
			return false;
		};

		/**
   *
   * @param {Event} event
   */
		t.mediaElement.dispatchEvent = function (event) {

			var callbacks = t.mediaElement.events[event.type];

			if (callbacks) {
				for (i = 0, il = callbacks.length; i < il; i++) {
					callbacks[i].apply(null, [event]);
				}
			}
		};
	}

	if (t.mediaElement.originalNode !== null) {
		var mediaFiles = [];

		switch (t.mediaElement.originalNode.nodeName.toLowerCase()) {

			case 'iframe':
				mediaFiles.push({
					type: '',
					src: t.mediaElement.originalNode.getAttribute('src')
				});

				break;

			case 'audio':
			case 'video':
				var n = void 0,
				    src = void 0,
				    type = void 0,
				    sources = t.mediaElement.originalNode.childNodes.length,
				    nodeSource = t.mediaElement.originalNode.getAttribute('src');

				// Consider if node contains the `src` and `type` attributes
				if (nodeSource) {
					var node = t.mediaElement.originalNode;
					mediaFiles.push({
						type: (0, _media.formatType)(nodeSource, node.getAttribute('type')),
						src: nodeSource
					});
				}

				// test <source> types to see if they are usable
				for (i = 0; i < sources; i++) {
					n = t.mediaElement.originalNode.childNodes[i];
					if (n.nodeType === Node.ELEMENT_NODE && n.tagName.toLowerCase() === 'source') {
						src = n.getAttribute('src');
						type = (0, _media.formatType)(src, n.getAttribute('type'));
						mediaFiles.push({ type: type, src: src });
					}
				}
				break;
		}

		if (mediaFiles.length > 0) {
			t.mediaElement.src = mediaFiles;
		}
	}

	if (t.mediaElement.options.success) {
		t.mediaElement.options.success(t.mediaElement, t.mediaElement.originalNode);
	}

	// @todo: Verify if this is needed
	// if (t.mediaElement.options.error) {
	// 	t.mediaElement.options.error(this.mediaElement, this.mediaElement.originalNode);
	// }

	return t.mediaElement;
};

_window2.default.MediaElement = MediaElement;

exports.default = MediaElement;

},{"2":2,"3":3,"30":30,"6":6,"7":7}],6:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Namespace
var mejs = {};

// version number
mejs.version = '3.0.1';

// Basic HTML5 settings
mejs.html5media = {
	/**
  * @type {String[]}
  */
	properties: [
	// GET/SET
	'volume', 'src', 'currentTime', 'muted',

	// GET only
	'duration', 'paused', 'ended',

	// OTHERS
	'error', 'currentSrc', 'networkState', 'preload', 'buffered', 'bufferedBytes', 'bufferedTime', 'readyState', 'seeking', 'initialTime', 'startOffsetTime', 'defaultPlaybackRate', 'playbackRate', 'played', 'seekable', 'autoplay', 'loop', 'controls'],
	/**
  * @type {String[]}
  */
	methods: ['load', 'play', 'pause', 'canPlayType'],
	/**
  * @type {String[]}
  */
	events: ['loadstart', 'progress', 'suspend', 'abort', 'error', 'emptied', 'stalled', 'play', 'pause', 'loadedmetadata', 'loadeddata', 'waiting', 'playing', 'canplay', 'canplaythrough', 'seeking', 'seeked', 'timeupdate', 'ended', 'ratechange', 'durationchange', 'volumechange'],
	/**
  * @type {String[]}
  */
	mediaTypes: ['audio/mp3', 'audio/ogg', 'audio/oga', 'audio/wav', 'audio/x-wav', 'audio/wave', 'audio/x-pn-wav', 'audio/mpeg', 'audio/mp4', 'video/mp4', 'video/webm', 'video/ogg']
};

_window2.default.mejs = mejs;

exports.default = mejs;

},{"3":3}],7:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderer = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * Class to manage renderer selection and addition.
 * @class Renderer
 */
var Renderer = function () {
	function Renderer() {
		_classCallCheck(this, Renderer);

		this.renderers = {};
		this.order = [];
	}

	/**
  * Register a new renderer.
  *
  * @param {Object} renderer - An object with all the rendered information (name REQUIRED)
  * @method add
  */


	_createClass(Renderer, [{
		key: 'add',
		value: function add(renderer) {

			if (renderer.name === undefined) {
				throw new TypeError('renderer must contain at least `name` property');
			}

			this.renderers[renderer.name] = renderer;
			this.order.push(renderer.name);
		}

		/**
   * Iterate a list of renderers to determine which one should the player use.
   *
   * @param {Object[]} mediaFiles - A list of source and type obtained from video/audio/source tags: [{src:'',type:''}]
   * @param {?String[]} renderers - Optional list of pre-selected renderers
   * @return {?Object} The renderer's name and source selected
   * @method select
   */

	}, {
		key: 'select',
		value: function select(mediaFiles) {
			var renderers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


			renderers = renderers.length ? renderers : this.order;

			for (var i = 0, il = renderers.length; i < il; i++) {
				var key = renderers[i],
				    _renderer = this.renderers[key];

				if (_renderer !== null && _renderer !== undefined) {
					for (var j = 0, jl = mediaFiles.length; j < jl; j++) {
						if (typeof _renderer.canPlayType === 'function' && typeof mediaFiles[j].type === 'string' && _renderer.canPlayType(mediaFiles[j].type)) {
							return {
								rendererName: _renderer.name,
								src: mediaFiles[j].src
							};
						}
					}
				}
			}

			return null;
		}

		// Setters/getters

	}, {
		key: 'order',
		set: function set(order) {

			if (!Array.isArray(order)) {
				throw new TypeError('order must be an array of strings.');
			}

			this._order = order;
		},
		get: function get() {
			return this._order;
		}
	}, {
		key: 'renderers',
		set: function set(renderers) {

			if (renderers !== null && (typeof renderers === 'undefined' ? 'undefined' : _typeof(renderers)) !== 'object') {
				throw new TypeError('renderers must be an array of objects.');
			}

			this._renderers = renderers;
		},
		get: function get() {
			return this._renderers;
		}
	}]);

	return Renderer;
}();

var renderer = exports.renderer = new Renderer();

_mejs2.default.Renderers = renderer;

},{"6":6}],8:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _constants = _dereq_(27);

var Features = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fullscreen button
 *
 * This feature creates a button to toggle fullscreen on video; it considers a letiety of possibilities when dealing with it
 * since it is not consistent across browsers. It also accounts for triggering the event through Flash shim.
 */

// Feature configuration
Object.assign(_player.config, {
	/**
  * @type {Boolean}
  */
	usePluginFullScreen: true,
	/**
  * @type {String}
  */
	fullscreenText: ''
});

Object.assign(_player2.default.prototype, {

	/**
  * @type {Boolean}
  */
	isFullScreen: false,
	/**
  * @type {Boolean}
  */
	isNativeFullScreen: false,
	/**
  * @type {Boolean}
  */
	isInIframe: false,
	/**
  * @type {Boolean}
  */
	isPluginClickThroughCreated: false,
	/**
  * Possible modes
  * (1) 'native-native'  HTML5 video  + browser fullscreen (IE10+, etc.)
  * (2) 'plugin-native'  plugin video + browser fullscreen (fails in some versions of Firefox)
  * (3) 'fullwindow'     Full window (retains all UI)
  * (4) 'plugin-click'   Flash 1 - click through with pointer events
  * (5) 'plugin-hover'   Flash 2 - hover popup in flash (IE6-8)
  *
  * @type {String}
  */
	fullscreenMode: '',
	/**
  *
  */
	containerSizeTimeout: null,

	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  */
	buildfullscreen: function buildfullscreen(player, controls, layers, media) {

		if (!player.isVideo) {
			return;
		}

		player.isInIframe = _window2.default.location !== _window2.default.parent.location;

		// detect on start
		media.addEventListener('loadstart', function () {
			player.detectFullscreenMode();
		});

		// build button
		var t = this,
		    hideTimeout = null,
		    fullscreenTitle = t.options.fullscreenText ? t.options.fullscreenText : _i18n2.default.t('mejs.fullscreen'),
		    fullscreenBtn = $('<div class="' + t.options.classPrefix + 'button ' + t.options.classPrefix + 'fullscreen-button">' + ('<button type="button" aria-controls="' + t.id + '" title="' + fullscreenTitle + '" aria-label="' + fullscreenTitle + '"></button>') + '</div>').appendTo(controls).on('click', function () {

			// toggle fullscreen
			var isFullScreen = Features.HAS_TRUE_NATIVE_FULLSCREEN && Features.IS_FULLSCREEN || player.isFullScreen;

			if (isFullScreen) {
				player.exitFullScreen();
			} else {
				player.enterFullScreen();
			}
		}).on('mouseover', function () {

			// very old browsers with a plugin
			if (t.fullscreenMode === 'plugin-hover') {
				if (hideTimeout !== null) {
					clearTimeout(hideTimeout);
					hideTimeout = null;
				}

				var buttonPos = fullscreenBtn.offset(),
				    containerPos = player.container.offset();

				media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, true);
			}
		}).on('mouseout', function () {

			if (t.fullscreenMode === 'plugin-hover') {
				if (hideTimeout !== null) {
					clearTimeout(hideTimeout);
				}

				hideTimeout = setTimeout(function () {
					media.hideFullscreenButton();
				}, 1500);
			}
		});

		player.fullscreenBtn = fullscreenBtn;

		t.globalBind('keydown', function (e) {
			var key = e.which || e.keyCode || 0;
			if (key === 27 && (Features.HAS_TRUE_NATIVE_FULLSCREEN && Features.IS_FULLSCREEN || t.isFullScreen)) {
				player.exitFullScreen();
			}
		});

		t.normalHeight = 0;
		t.normalWidth = 0;

		// setup native fullscreen event
		if (Features.HAS_TRUE_NATIVE_FULLSCREEN) {

			//
			/**
    * Detect any changes on fullscreen
    *
    * Chrome doesn't always fire this in an `<iframe>`
    * @private
    */
			var fullscreenChanged = function fullscreenChanged() {
				if (player.isFullScreen) {
					if (Features.isFullScreen()) {
						player.isNativeFullScreen = true;
						// reset the controls once we are fully in full screen
						player.setControlsSize();
					} else {
						player.isNativeFullScreen = false;
						// when a user presses ESC
						// make sure to put the player back into place
						player.exitFullScreen();
					}
				}
			};

			player.globalBind(Features.FULLSCREEN_EVENT_NAME, fullscreenChanged);
		}
	},

	/**
  * Detect the type of fullscreen based on browser's capabilities
  *
  * @return {String}
  */
	detectFullscreenMode: function detectFullscreenMode() {

		var t = this,
		    mode = '',
		    isNative = t.media.rendererName !== null && t.media.rendererName.match(/(native|html5)/) !== null;

		if (Features.HAS_TRUE_NATIVE_FULLSCREEN && isNative) {
			mode = 'native-native';
		} else if (Features.HAS_TRUE_NATIVE_FULLSCREEN && !isNative) {
			mode = 'plugin-native';
		} else if (t.usePluginFullScreen) {
			if (Features.SUPPORT_POINTER_EVENTS) {
				mode = 'plugin-click';
				// this needs some special setup
				t.createPluginClickThrough();
			} else {
				mode = 'plugin-hover';
			}
		} else {
			mode = 'fullwindow';
		}

		t.fullscreenMode = mode;
		return mode;
	},

	/**
  *
  */
	createPluginClickThrough: function createPluginClickThrough() {

		var t = this;

		// don't build twice
		if (t.isPluginClickThroughCreated) {
			return;
		}

		// allows clicking through the fullscreen button and controls down directly to Flash

		/*
   When a user puts his mouse over the fullscreen button, we disable the controls so that mouse events can go down to flash (pointer-events)
   We then put a divs over the video and on either side of the fullscreen button
   to capture mouse movement and restore the controls once the mouse moves outside of the fullscreen button
   */

		var fullscreenIsDisabled = false,
		    restoreControls = function restoreControls() {
			if (fullscreenIsDisabled) {
				// hide the hovers
				for (var i in hoverDivs) {
					hoverDivs[i].hide();
				}

				// restore the control bar
				t.fullscreenBtn.css('pointer-events', '');
				t.controls.css('pointer-events', '');

				// prevent clicks from pausing video
				t.media.removeEventListener('click', t.clickToPlayPauseCallback);

				// store for later
				fullscreenIsDisabled = false;
			}
		},
		    hoverDivs = {},
		    hoverDivNames = ['top', 'left', 'right', 'bottom'],
		    positionHoverDivs = function positionHoverDivs() {
			var fullScreenBtnOffsetLeft = fullscreenBtn.offset().left - t.container.offset().left,
			    fullScreenBtnOffsetTop = fullscreenBtn.offset().top - t.container.offset().top,
			    fullScreenBtnWidth = fullscreenBtn.outerWidth(true),
			    fullScreenBtnHeight = fullscreenBtn.outerHeight(true),
			    containerWidth = t.container.width(),
			    containerHeight = t.container.height();

			for (var hover in hoverDivs) {
				hover.css({ position: 'absolute', top: 0, left: 0 }); //, backgroundColor: '#f00'});
			}

			// over video, but not controls
			hoverDivs.top.width(containerWidth).height(fullScreenBtnOffsetTop);

			// over controls, but not the fullscreen button
			hoverDivs.left.width(fullScreenBtnOffsetLeft).height(fullScreenBtnHeight).css({ top: fullScreenBtnOffsetTop });

			// after the fullscreen button
			hoverDivs.right.width(containerWidth - fullScreenBtnOffsetLeft - fullScreenBtnWidth).height(fullScreenBtnHeight).css({
				top: fullScreenBtnOffsetTop,
				left: fullScreenBtnOffsetLeft + fullScreenBtnWidth
			});

			// under the fullscreen button
			hoverDivs.bottom.width(containerWidth).height(containerHeight - fullScreenBtnHeight - fullScreenBtnOffsetTop).css({ top: fullScreenBtnOffsetTop + fullScreenBtnHeight });
		};

		t.globalBind('resize', function () {
			positionHoverDivs();
		});

		for (var i = 0, len = hoverDivNames.length; i < len; i++) {
			hoverDivs[hoverDivNames[i]] = $('<div class="' + t.options.classPrefix + 'fullscreen-hover" />').appendTo(t.container).mouseover(restoreControls).hide();
		}

		// on hover, kill the fullscreen button's HTML handling, allowing clicks down to Flash
		fullscreenBtn.on('mouseover', function () {

			if (!t.isFullScreen) {

				var buttonPos = fullscreenBtn.offset(),
				    containerPos = player.container.offset();

				// move the button in Flash into place
				media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, false);

				// allows click through
				t.fullscreenBtn.css('pointer-events', 'none');
				t.controls.css('pointer-events', 'none');

				// restore click-to-play
				t.media.addEventListener('click', t.clickToPlayPauseCallback);

				// show the divs that will restore things
				for (var _i in hoverDivs) {
					hoverDivs[_i].show();
				}

				positionHoverDivs();

				fullscreenIsDisabled = true;
			}
		});

		// restore controls anytime the user enters or leaves fullscreen
		media.addEventListener('fullscreenchange', function () {
			t.isFullScreen = !t.isFullScreen;
			// don't allow plugin click to pause video - messes with
			// plugin's controls
			if (t.isFullScreen) {
				t.media.removeEventListener('click', t.clickToPlayPauseCallback);
			} else {
				t.media.addEventListener('click', t.clickToPlayPauseCallback);
			}
			restoreControls();
		});

		// the mouseout event doesn't work on the fullscren button, because we already killed the pointer-events
		// so we use the document.mousemove event to restore controls when the mouse moves outside the fullscreen button

		t.globalBind('mousemove', function (e) {

			// if the mouse is anywhere but the fullsceen button, then restore it all
			if (fullscreenIsDisabled) {

				var fullscreenBtnPos = fullscreenBtn.offset();

				if (e.pageY < fullscreenBtnPos.top || e.pageY > fullscreenBtnPos.top + fullscreenBtn.outerHeight(true) || e.pageX < fullscreenBtnPos.left || e.pageX > fullscreenBtnPos.left + fullscreenBtn.outerWidth(true)) {

					fullscreenBtn.css('pointer-events', '');
					t.controls.css('pointer-events', '');

					fullscreenIsDisabled = false;
				}
			}
		});

		t.isPluginClickThroughCreated = true;
	},
	/**
  * Feature destructor.
  *
  * Always has to be prefixed with `clean` and the name that was used in features list
  * @param {MediaElementPlayer} player
  */
	cleanfullscreen: function cleanfullscreen(player) {
		player.exitFullScreen();
	},

	/**
  *
  */
	enterFullScreen: function enterFullScreen() {

		var t = this,
		    isNative = t.media.rendererName !== null && t.media.rendererName.match(/(html5|native)/) !== null;

		if (Features.IS_IOS && Features.HAS_IOS_FULLSCREEN && typeof t.media.webkitEnterFullscreen === 'function') {
			t.media.webkitEnterFullscreen();
			return;
		}

		// set it to not show scroll bars so 100% will work
		$(_document2.default.documentElement).addClass(t.options.classPrefix + 'fullscreen');

		// store sizing
		t.normalHeight = t.container.height();
		t.normalWidth = t.container.width();

		// attempt to do true fullscreen
		if (t.fullscreenMode === 'native-native' || t.fullscreenMode === 'plugin-native') {

			Features.requestFullScreen(t.container[0]);

			if (t.isInIframe) {
				// sometimes exiting from fullscreen doesn't work
				// notably in Chrome <iframe>. Fixed in version 17
				setTimeout(function checkFullscreen() {

					if (t.isNativeFullScreen) {
						var percentErrorMargin = 0.002,
						    // 0.2%
						windowWidth = $(_window2.default).width(),
						    screenWidth = screen.width,
						    absDiff = Math.abs(screenWidth - windowWidth),
						    marginError = screenWidth * percentErrorMargin;

						// check if the video is suddenly not really fullscreen
						if (absDiff > marginError) {
							// manually exit
							t.exitFullScreen();
						} else {
							// test again
							setTimeout(checkFullscreen, 500);
						}
					}
				}, 1000);
			}
		} else if (t.fullscreeMode === 'fullwindow') {}
		// move into position

		// make full size
		t.container.addClass(t.options.classPrefix + 'container-fullscreen').width('100%').height('100%');

		// Only needed for safari 5.1 native full screen, can cause display issues elsewhere
		// Actually, it seems to be needed for IE8, too
		t.containerSizeTimeout = setTimeout(function () {
			t.container.css({ width: '100%', height: '100%' });
			t.setControlsSize();
		}, 500);

		if (isNative) {
			t.$media.width('100%').height('100%');
		} else {
			t.container.find('iframe, embed, object, video').width('100%').height('100%');
		}

		if (t.options.setDimensions) {
			t.media.setSize(screen.width, screen.height);
		}

		t.layers.children('div').width('100%').height('100%');

		if (t.fullscreenBtn) {
			t.fullscreenBtn.removeClass(t.options.classPrefix + 'fullscreen').addClass(t.options.classPrefix + 'unfullscreen');
		}

		t.setControlsSize();
		t.isFullScreen = true;

		var zoomFactor = Math.min(screen.width / t.width, screen.height / t.height);
		t.container.find('.' + t.options.classPrefix + 'captions-text').css('font-size', zoomFactor * 100 + '%');
		t.container.find('.' + t.options.classPrefix + 'captions-text').css('line-height', 'normal');
		t.container.find('.' + t.options.classPrefix + 'captions-position').css('bottom', '45px');

		t.container.trigger('enteredfullscreen');
	},

	/**
  *
  */
	exitFullScreen: function exitFullScreen() {

		var t = this,
		    isNative = t.media.rendererName !== null && t.media.rendererName.match(/(native|html5)/) !== null;

		// Prevent container from attempting to stretch a second time
		clearTimeout(t.containerSizeTimeout);

		// come out of native fullscreen
		if (Features.HAS_TRUE_NATIVE_FULLSCREEN && (Features.IS_FULLSCREEN || t.isFullScreen)) {
			Features.cancelFullScreen();
		}

		// restore scroll bars to document
		$(_document2.default.documentElement).removeClass(t.options.classPrefix + 'fullscreen');

		t.container.removeClass(t.options.classPrefix + 'container-fullscreen');

		if (t.options.setDimensions) {
			t.container.width(t.normalWidth).height(t.normalHeight);
			if (isNative) {
				t.$media.width(t.normalWidth).height(t.normalHeight);
			} else {
				t.container.find('iframe, embed, object, video').width(t.normalWidth).height(t.normalHeight);
			}

			t.media.setSize(t.normalWidth, t.normalHeight);

			t.layers.children('div').width(t.normalWidth).height(t.normalHeight);
		}

		t.fullscreenBtn.removeClass(t.options.classPrefix + 'unfullscreen').addClass(t.options.classPrefix + 'fullscreen');

		t.setControlsSize();
		t.isFullScreen = false;

		t.container.find('.' + t.options.classPrefix + 'captions-text').css('font-size', '');
		t.container.find('.' + t.options.classPrefix + 'captions-text').css('line-height', '');
		t.container.find('.' + t.options.classPrefix + 'captions-position').css('bottom', '');

		t.container.trigger('exitedfullscreen');
	}
});

},{"16":16,"2":2,"27":27,"3":3,"4":4,"6":6}],9:[function(_dereq_,module,exports){
'use strict';

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Play/Pause button
 *
 * This feature enables the displaying of a Play button in the control bar, and also contains logic to toggle its state
 * between paused and playing.
 */

// Feature configuration
Object.assign(_player.config, {
	/**
  * @type {String}
  */
	playText: '',
	/**
  * @type {String}
  */
	pauseText: ''
});

Object.assign(_player2.default.prototype, {
	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  * @public
  */
	buildplaypause: function buildplaypause(player, controls, layers, media) {
		var t = this,
		    op = t.options,
		    playTitle = op.playText ? op.playText : _i18n2.default.t('mejs.play'),
		    pauseTitle = op.pauseText ? op.pauseText : _i18n2.default.t('mejs.pause'),
		    play = $('<div class="' + t.options.classPrefix + 'button ' + t.options.classPrefix + 'playpause-button ' + (t.options.classPrefix + 'play">') + ('<button type="button" aria-controls="' + t.id + '" title="' + playTitle + '" aria-label="' + pauseTitle + '"></button>') + '</div>').appendTo(controls).click(function () {
			if (media.paused) {
				media.play();
			} else {
				media.pause();
			}
		}),
		    play_btn = play.find('button');

		/**
   * @private
   * @param {String} which - token to determine new state of button
   */
		function togglePlayPause(which) {
			if ('play' === which) {
				play.removeClass(t.options.classPrefix + 'play').removeClass(t.options.classPrefix + 'replay').addClass(t.options.classPrefix + 'pause');
				play_btn.attr({
					'title': pauseTitle,
					'aria-label': pauseTitle
				});
			} else {
				play.removeClass(t.options.classPrefix + 'pause').removeClass(t.options.classPrefix + 'replay').addClass(t.options.classPrefix + 'play');
				play_btn.attr({
					'title': playTitle,
					'aria-label': playTitle
				});
			}
		}

		togglePlayPause('pse');

		media.addEventListener('play', function () {
			togglePlayPause('play');
		}, false);
		media.addEventListener('playing', function () {
			togglePlayPause('play');
		}, false);

		media.addEventListener('pause', function () {
			togglePlayPause('pse');
		}, false);
		media.addEventListener('paused', function () {
			togglePlayPause('pse');
		}, false);

		media.addEventListener('ended', function () {

			if (!player.options.loop) {
				play.removeClass(t.options.classPrefix + 'pause').removeClass(t.options.classPrefix + 'play').addClass(t.options.classPrefix + 'replay');
			}
		}, false);
	}
});

},{"16":16,"4":4}],10:[function(_dereq_,module,exports){
'use strict';

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _constants = _dereq_(27);

var _time = _dereq_(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Progress/loaded bar
 *
 * This feature creates a progress bar with a slider in the control bar, and updates it based on native events.
 */

// Feature configuration
Object.assign(_player.config, {
	/**
  * Enable tooltip that shows time in progress bar
  * @type {Boolean}
  */
	enableProgressTooltip: true
});

Object.assign(_player2.default.prototype, {

	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  */
	buildprogress: function buildprogress(player, controls, layers, media) {

		var t = this,
		    mouseIsDown = false,
		    mouseIsOver = false,
		    lastKeyPressTime = 0,
		    startedPaused = false,
		    autoRewindInitial = player.options.autoRewind,
		    tooltip = player.options.enableProgressTooltip ? '<span class="' + t.options.classPrefix + 'time-float">' + ('<span class="' + t.options.classPrefix + 'time-float-current">00:00</span>') + ('<span class="' + t.options.classPrefix + 'time-float-corner"></span>') + '</span>' : "";

		$('<div class="' + t.options.classPrefix + 'time-rail">' + ('<span class="' + t.options.classPrefix + 'time-total ' + t.options.classPrefix + 'time-slider">') + ('<span class="' + t.options.classPrefix + 'time-buffering"></span>') + ('<span class="' + t.options.classPrefix + 'time-loaded"></span>') + ('<span class="' + t.options.classPrefix + 'time-current"></span>') + ('<span class="' + t.options.classPrefix + 'time-handle"></span>') + ('' + tooltip) + '</span>' + '</div>').appendTo(controls);
		controls.find('.' + t.options.classPrefix + 'time-buffering').hide();

		t.rail = controls.find('.' + t.options.classPrefix + 'time-rail');
		t.total = controls.find('.' + t.options.classPrefix + 'time-total');
		t.loaded = controls.find('.' + t.options.classPrefix + 'time-loaded');
		t.current = controls.find('.' + t.options.classPrefix + 'time-current');
		t.handle = controls.find('.' + t.options.classPrefix + 'time-handle');
		t.timefloat = controls.find('.' + t.options.classPrefix + 'time-float');
		t.timefloatcurrent = controls.find('.' + t.options.classPrefix + 'time-float-current');
		t.slider = controls.find('.' + t.options.classPrefix + 'time-slider');

		/**
   *
   * @private
   * @param {Event} e
   */
		var handleMouseMove = function handleMouseMove(e) {

			var offset = t.total.offset(),
			    width = t.total.width(),
			    percentage = 0,
			    newTime = 0,
			    pos = 0,
			    x = void 0;

			// mouse or touch position relative to the object
			if (e.originalEvent && e.originalEvent.changedTouches) {
				x = e.originalEvent.changedTouches[0].pageX;
			} else if (e.changedTouches) {
				// for Zepto
				x = e.changedTouches[0].pageX;
			} else {
				x = e.pageX;
			}

			if (media.duration) {
				if (x < offset.left) {
					x = offset.left;
				} else if (x > width + offset.left) {
					x = width + offset.left;
				}

				pos = x - offset.left;
				percentage = pos / width;
				newTime = percentage <= 0.02 ? 0 : percentage * media.duration;

				// seek to where the mouse is
				if (mouseIsDown && newTime.toFixed(4) !== media.currentTime.toFixed(4)) {
					media.setCurrentTime(newTime);
				}

				// position floating time box
				if (!_constants.HAS_TOUCH) {
					t.timefloat.css('left', pos);
					t.timefloatcurrent.html((0, _time.secondsToTimeCode)(newTime, player.options.alwaysShowHours));
					t.timefloat.show();
				}
			}
		},

		/**
   * Update elements in progress bar for accessibility purposes only when player is paused.
   *
   * This is to avoid attempts to repeat the time over and over again when media is playing.
   * @private
   */
		updateSlider = function updateSlider() {

			var seconds = media.currentTime,
			    timeSliderText = _i18n2.default.t('mejs.time-slider'),
			    time = (0, _time.secondsToTimeCode)(seconds, player.options.alwaysShowHours),
			    duration = media.duration;

			t.slider.attr({
				'role': 'slider',
				'tabindex': 0
			});
			if (media.paused) {
				t.slider.attr({
					'aria-label': timeSliderText,
					'aria-valuemin': 0,
					'aria-valuemax': duration,
					'aria-valuenow': seconds,
					'aria-valuetext': time
				});
			} else {
				t.slider.removeAttr('aria-label aria-valuemin aria-valuemax aria-valuenow aria-valuetext');
			}
		},

		/**
   *
   * @private
   */
		restartPlayer = function restartPlayer() {
			var now = new Date();
			if (now - lastKeyPressTime >= 1000) {
				media.play();
			}
		};

		// Events
		t.slider.on('focus', function () {
			player.options.autoRewind = false;
		}).on('blur', function () {
			player.options.autoRewind = autoRewindInitial;
		}).on('keydown', function (e) {

			if (new Date() - lastKeyPressTime >= 1000) {
				startedPaused = media.paused;
			}

			if (t.options.keyActions.length) {

				var keyCode = e.which || e.keyCode || 0,
				    duration = media.duration,
				    seekTime = media.currentTime,
				    seekForward = player.options.defaultSeekForwardInterval(media),
				    seekBackward = player.options.defaultSeekBackwardInterval(media);

				switch (keyCode) {
					case 37: // left
					case 40:
						// Down
						if (media.duration !== Infinity) {
							seekTime -= seekBackward;
						}
						break;
					case 39: // Right
					case 38:
						// Up
						if (media.duration !== Infinity) {
							seekTime += seekForward;
						}
						break;
					case 36:
						// Home
						seekTime = 0;
						break;
					case 35:
						// end
						seekTime = duration;
						break;
					case 32:
						// space
						if (!_constants.IS_FIREFOX) {
							if (media.paused) {
								media.play();
							} else {
								media.pause();
							}
						}
						return;
					case 13:
						// enter
						if (media.paused) {
							media.play();
						} else {
							media.pause();
						}
						return;
					default:
						return;
				}

				seekTime = seekTime < 0 ? 0 : seekTime >= duration ? duration : Math.floor(seekTime);
				lastKeyPressTime = new Date();
				if (!startedPaused) {
					media.pause();
				}

				if (seekTime < media.duration && !startedPaused) {
					setTimeout(restartPlayer, 1100);
				}

				media.setCurrentTime(seekTime);

				e.preventDefault();
				e.stopPropagation();
			}
		}).on('click', function (e) {

			if (media.duration !== Infinity) {
				var paused = media.paused;

				if (!paused) {
					media.pause();
				}

				handleMouseMove(e);

				if (!paused) {
					media.play();
				}
			}

			e.preventDefault();
			e.stopPropagation();
		});

		// handle clicks
		t.rail.on('mousedown touchstart', function (e) {
			if (media.duration !== Infinity) {
				// only handle left clicks or touch
				if (e.which === 1 || e.which === 0) {
					mouseIsDown = true;
					handleMouseMove(e);
					t.globalBind('mousemove.dur touchmove.dur', function (e) {
						handleMouseMove(e);
					});
					t.globalBind('mouseup.dur touchend.dur', function () {
						mouseIsDown = false;
						if (t.timefloat !== undefined) {
							t.timefloat.hide();
						}
						t.globalUnbind('mousemove.dur touchmove.dur mouseup.dur touchend.dur');
					});
				}
			}
		}).on('mouseenter', function (e) {
			if (media.duration !== Infinity) {
				mouseIsOver = true;
				t.globalBind('mousemove.dur', function (e) {
					handleMouseMove(e);
				});
				if (t.timefloat !== undefined && !_constants.HAS_TOUCH) {
					t.timefloat.show();
				}
			}
		}).on('mouseleave', function () {
			if (media.duration !== Infinity) {
				mouseIsOver = false;
				if (!mouseIsDown) {
					t.globalUnbind('mousemove.dur');
					if (t.timefloat !== undefined) {
						t.timefloat.hide();
					}
				}
			}
		});

		// loading
		// If media is does not have a finite duration, remove progress bar interaction
		// and indicate that is a live broadcast
		media.addEventListener('progress', function (e) {
			if (media.duration !== Infinity) {
				player.setProgressRail(e);
				player.setCurrentRail(e);
			} else if (!controls.find('.' + t.options.classPrefix + 'broadcast').length) {
				controls.find('.' + t.options.classPrefix + 'time-rail').empty().html('<span class="' + t.options.classPrefix + 'broadcast">' + mejs.i18n.t('mejs.live-broadcast') + '</span>');
			}
		}, false);

		// current time
		media.addEventListener('timeupdate', function (e) {
			if (media.duration !== Infinity) {
				player.setProgressRail(e);
				player.setCurrentRail(e);
				updateSlider(e);
			} else if (!controls.find('.' + t.options.classPrefix + 'broadcast').length) {
				controls.find('.' + t.options.classPrefix + 'time-rail').empty().html('<span class="' + t.options.classPrefix + 'broadcast">' + mejs.i18n.t('mejs.live-broadcast') + '</span>');
			}
		}, false);

		t.container.on('controlsresize', function (e) {
			if (media.duration !== Infinity) {
				player.setProgressRail(e);
				player.setCurrentRail(e);
			}
		});
	},

	/**
  * Calculate the progress on the media and update progress bar's width
  *
  * @param {Event} e
  */
	setProgressRail: function setProgressRail(e) {

		var t = this,
		    target = e !== undefined ? e.target : t.media,
		    percent = null;

		// newest HTML5 spec has buffered array (FF4, Webkit)
		if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
			// account for a real array with multiple values - always read the end of the last buffer
			percent = target.buffered.end(target.buffered.length - 1) / target.duration;
		}
		// Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
		// to be anything other than 0. If the byte count is available we use this instead.
		// Browsers that support the else if do not seem to have the bufferedBytes value and
		// should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
		else if (target && target.bytesTotal !== undefined && target.bytesTotal > 0 && target.bufferedBytes !== undefined) {
				percent = target.bufferedBytes / target.bytesTotal;
			}
			// Firefox 3 with an Ogg file seems to go this way
			else if (e && e.lengthComputable && e.total !== 0) {
					percent = e.loaded / e.total;
				}

		// finally update the progress bar
		if (percent !== null) {
			percent = Math.min(1, Math.max(0, percent));
			// update loaded bar
			if (t.loaded && t.total) {
				t.loaded.width(percent * 100 + '%');
			}
		}
	},
	/**
  * Update the slider's width depending on the current time
  *
  */
	setCurrentRail: function setCurrentRail() {

		var t = this;

		if (t.media.currentTime !== undefined && t.media.duration) {

			// update bar and handle
			if (t.total && t.handle) {
				var newWidth = Math.round(t.total.width() * t.media.currentTime / t.media.duration),
				    handlePos = newWidth - Math.round(t.handle.outerWidth(true) / 2);

				newWidth = t.media.currentTime / t.media.duration * 100;
				t.current.width(newWidth + '%');
				t.handle.css('left', handlePos);
			}
		}
	}
});

},{"16":16,"27":27,"32":32,"4":4}],11:[function(_dereq_,module,exports){
'use strict';

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _time = _dereq_(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Current/duration times
 *
 * This feature creates/updates the duration and progress times in the control bar, based on native events.
 */

// Feature configuration
Object.assign(_player.config, {
	/**
  * The initial duration
  * @type {Number}
  */
	duration: 0,
	/**
  * @type {String}
  */
	timeAndDurationSeparator: '<span> | </span>'
});

Object.assign(_player2.default.prototype, {

	/**
  * Current time constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  */
	buildcurrent: function buildcurrent(player, controls, layers, media) {
		var t = this;

		$('<div class="' + t.options.classPrefix + 'time" role="timer" aria-live="off">' + ('<span class="' + t.options.classPrefix + 'currenttime">' + (0, _time.secondsToTimeCode)(0, player.options.alwaysShowHours) + '</span>') + '</div>').appendTo(controls);

		t.currenttime = t.controls.find('.' + t.options.classPrefix + 'currenttime');

		media.addEventListener('timeupdate', function () {
			if (t.controlsAreVisible) {
				player.updateCurrent();
			}
		}, false);
	},

	/**
  * Duration time constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  */
	buildduration: function buildduration(player, controls, layers, media) {
		var t = this;

		if (controls.children().last().find('.' + t.options.classPrefix + 'currenttime').length > 0) {
			$(t.options.timeAndDurationSeparator + '<span class="' + t.options.classPrefix + 'duration">' + ((0, _time.secondsToTimeCode)(t.options.duration, t.options.alwaysShowHours) + '</span>')).appendTo(controls.find('.' + t.options.classPrefix + 'time'));
		} else {

			// add class to current time
			controls.find('.' + t.options.classPrefix + 'currenttime').parent().addClass(t.options.classPrefix + 'currenttime-container');

			$('<div class="' + t.options.classPrefix + 'time ' + t.options.classPrefix + 'duration-container">' + ('<span class="' + t.options.classPrefix + 'duration">') + ((0, _time.secondsToTimeCode)(t.options.duration, t.options.alwaysShowHours) + '</span>') + '</div>').appendTo(controls);
		}

		t.durationD = t.controls.find('.' + t.options.classPrefix + 'duration');

		media.addEventListener('timeupdate', function () {
			if (t.controlsAreVisible) {
				player.updateDuration();
			}
		}, false);
	},

	/**
  * Update the current time and output it in format 00:00
  *
  */
	updateCurrent: function updateCurrent() {
		var t = this;

		var currentTime = t.media.currentTime;

		if (isNaN(currentTime)) {
			currentTime = 0;
		}

		if (t.currenttime) {
			t.currenttime.html((0, _time.secondsToTimeCode)(currentTime, t.options.alwaysShowHours));
		}
	},

	/**
  * Update the duration time and output it in format 00:00
  *
  */
	updateDuration: function updateDuration() {
		var t = this;

		var duration = t.media.duration;

		if (isNaN(duration) || duration === Infinity || duration < 0) {
			t.media.duration = t.options.duration = duration = 0;
		}

		if (t.options.duration > 0) {
			duration = t.options.duration;
		}

		//Toggle the long video class if the video is longer than an hour.
		t.container.toggleClass(t.options.classPrefix + 'long-video', duration > 3600);

		if (t.durationD && duration > 0) {
			t.durationD.html((0, _time.secondsToTimeCode)(duration, t.options.alwaysShowHours));
		}
	}
});

},{"16":16,"32":32}],12:[function(_dereq_,module,exports){
'use strict';

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _time = _dereq_(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Closed Captions (CC) button
 *
 * This feature enables the displaying of a CC button in the control bar, and also contains the methods to start media
 * with a certain language (if available), toggle captions, etc.
 */

// Feature configuration
Object.assign(_player.config, {
	/**
  * Default language to start media using ISO 639-2 Language Code List (en, es, it, etc.)
  * If there are multiple tracks for one language, the last track node found is activated
  * @see https://www.loc.gov/standards/iso639-2/php/code_list.php
  * @type {String}
  */
	startLanguage: '',
	/**
  * @type {String}
  */
	tracksText: '',
	/**
  * Avoid to screen reader speak captions over an audio track.
  *
  * @type {Boolean}
  */
	tracksAriaLive: false,
	/**
  * Remove the [cc] button when no track nodes are present
  * @type {Boolean}
  */
	hideCaptionsButtonWhenEmpty: true,
	/**
  * Change captions to pop-up if true and only one track node is found
  * @type {Boolean}
  */
	toggleCaptionsButtonWhenOnlyOne: false,
	/**
  * @type {String}
  */
	slidesSelector: ''
});

Object.assign(_player2.default.prototype, {

	/**
  * @type {Boolean}
  */
	hasChapters: false,

	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  */
	buildtracks: function buildtracks(player, controls, layers, media) {
		if (player.tracks.length === 0) {
			return;
		}

		var t = this,
		    attr = t.options.tracksAriaLive ? ' role="log" aria-live="assertive" aria-atomic="false"' : '',
		    tracksTitle = t.options.tracksText ? t.options.tracksText : _i18n2.default.t('mejs.captions-subtitles'),
		    i = void 0,
		    kind = void 0;

		// If browser will do native captions, prefer mejs captions, loop through tracks and hide
		if (t.domNode.textTracks) {
			for (i = t.domNode.textTracks.length - 1; i >= 0; i--) {
				t.domNode.textTracks[i].mode = 'hidden';
			}
		}

		t.cleartracks(player);
		player.chapters = $('<div class="' + t.options.classPrefix + 'chapters ' + t.options.classPrefix + 'layer"></div>').prependTo(layers).hide();
		player.captions = $('<div class="' + t.options.classPrefix + 'captions-layer ' + t.options.classPrefix + 'layer">' + ('<div class="' + t.options.classPrefix + 'captions-position ' + t.options.classPrefix + 'captions-position-hover"' + attr + '>') + ('<span class="' + t.options.classPrefix + 'captions-text"></span>') + '</div>' + '</div>').prependTo(layers).hide();
		player.captionsText = player.captions.find('.' + t.options.classPrefix + 'captions-text');
		player.captionsButton = $('<div class="' + t.options.classPrefix + 'button ' + t.options.classPrefix + 'captions-button">' + ('<button type="button" aria-controls="' + t.id + '" title="' + tracksTitle + '" aria-label="' + tracksTitle + '"></button>') + ('<div class="' + t.options.classPrefix + 'captions-selector ' + t.options.classPrefix + 'offscreen">') + ('<ul class="' + t.options.classPrefix + 'captions-selector-list">') + ('<li class="' + t.options.classPrefix + 'captions-selector-list-item">') + ('<input type="radio" class="' + t.options.classPrefix + 'captions-selector-input" ') + ('name="' + player.id + '_captions" id="' + player.id + '_captions_none" ') + 'value="none" checked="checked" />' + ('<label class="' + t.options.classPrefix + 'captions-selector-label ') + (t.options.classPrefix + 'captions-selected" ') + ('for="' + player.id + '_captions_none">' + _i18n2.default.t('mejs.none') + '</label>') + '</li>' + '</ul>' + '</div>' + '</div>').appendTo(controls);

		var subtitleCount = 0,
		    total = player.tracks.length;

		for (i = 0; i < total; i++) {
			kind = player.tracks[i].kind;
			if (kind === 'subtitles' || kind === 'captions') {
				subtitleCount++;
			}
		}

		// if only one language then just make the button a toggle
		if (t.options.toggleCaptionsButtonWhenOnlyOne && subtitleCount === 1) {
			// click
			player.captionsButton.on('click', function () {
				var trackId = 'none';
				if (player.selectedTrack === null) {
					trackId = player.tracks[0].trackId;
				}
				player.setTrack(trackId);
			});
		} else {
			// hover or keyboard focus
			player.captionsButton.on('mouseenter focusin', function () {
				$(this).find('.' + t.options.classPrefix + 'captions-selector').removeClass(t.options.classPrefix + 'offscreen');
			}).on('mouseleave focusout', function () {
				$(this).find('.' + t.options.classPrefix + 'captions-selector').addClass(t.options.classPrefix + 'offscreen');
			})
			// handle clicks to the language radio buttons
			.on('click', 'input[type=radio]', function () {
				// value is trackId, same as the actual id, and we're using it here
				// because the "none" checkbox doesn't have a trackId
				// to use, but we want to know when "none" is clicked
				player.setTrack(this.value);
			}).on('click', '.' + t.options.classPrefix + 'captions-selector-label', function () {
				$(this).siblings('input[type="radio"]').trigger('click');
			})
			//Allow up/down arrow to change the selected radio without changing the volume.
			.on('keydown', function (e) {
				e.stopPropagation();
			});
		}

		if (!player.options.alwaysShowControls) {
			// move with controls
			player.container.on('controlsshown', function () {
				// push captions above controls
				player.container.find('.' + t.options.classPrefix + 'captions-position').addClass(t.options.classPrefix + 'captions-position-hover');
			}).on('controlshidden', function () {
				if (!media.paused) {
					// move back to normal place
					player.container.find('.' + t.options.classPrefix + 'captions-position').removeClass(t.options.classPrefix + 'captions-position-hover');
				}
			});
		} else {
			player.container.find('.' + t.options.classPrefix + 'captions-position').addClass(t.options.classPrefix + 'captions-position-hover');
		}

		player.trackToLoad = -1;
		player.selectedTrack = null;
		player.isLoadingTrack = false;

		// add to list
		for (i = 0; i < total; i++) {
			kind = player.tracks[i].kind;
			if (kind === 'subtitles' || kind === 'captions') {
				player.addTrackButton(player.tracks[i].trackId, player.tracks[i].srclang, player.tracks[i].label);
			}
		}

		// start loading tracks
		player.loadNextTrack();

		media.addEventListener('timeupdate', function () {
			player.displayCaptions();
		}, false);

		if (player.options.slidesSelector !== '') {
			player.slidesContainer = $(player.options.slidesSelector);

			media.addEventListener('timeupdate', function () {
				player.displaySlides();
			}, false);
		}

		media.addEventListener('loadedmetadata', function () {
			player.displayChapters();
		}, false);

		player.container.hover(function () {
			// chapters
			if (player.hasChapters) {
				player.chapters.removeClass(t.options.classPrefix + 'offscreen');
				player.chapters.fadeIn(200, function () {
					var self = $(this);
					self.height(self.find('.' + t.options.classPrefix + 'chapter').outerHeight());
				});
			}
		}, function () {
			if (player.hasChapters) {
				if (media.paused) {
					player.chapters.fadeOut(200, function () {
						$(this).addClass(t.options.classPrefix + 'offscreen');
					});
				} else {
					player.chapters.show();
				}
			}
		});

		t.container.on('controlsresize', function () {
			t.adjustLanguageBox();
		});

		// check for autoplay
		if (player.node.getAttribute('autoplay') !== null) {
			player.chapters.addClass(t.options.classPrefix + 'offscreen');
		}
	},

	/**
  * Feature destructor.
  *
  * Always has to be prefixed with `clean` and the name that was used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  */
	cleartracks: function cleartracks(player) {
		if (player) {
			if (player.captions) {
				player.captions.remove();
			}
			if (player.chapters) {
				player.chapters.remove();
			}
			if (player.captionsText) {
				player.captionsText.remove();
			}
			if (player.captionsButton) {
				player.captionsButton.remove();
			}
		}
	},

	rebuildtracks: function rebuildtracks() {
		var t = this;
		t.findTracks();
		t.buildtracks(t, t.controls, t.layers, t.media);
	},

	findTracks: function findTracks() {
		var t = this,
		    tracktags = t.$media.find('track');

		// store for use by plugins
		t.tracks = [];
		tracktags.each(function (index, track) {

			track = $(track);

			var srclang = track.attr('srclang') ? track.attr('srclang').toLowerCase() : '';
			var trackId = t.id + '_track_' + index + '_' + track.attr('kind') + '_' + srclang;
			t.tracks.push({
				trackId: trackId,
				srclang: srclang,
				src: track.attr('src'),
				kind: track.attr('kind'),
				label: track.attr('label') || '',
				entries: [],
				isLoaded: false
			});
		});
	},

	/**
  *
  * @param {String} trackId, or "none" to disable captions
  */
	setTrack: function setTrack(trackId) {
		var t = this,
		    i = void 0;

		t.captionsButton.find('input[type="radio"]').prop('checked', false).end().find('.' + t.options.classPrefix + 'captions-selected').removeClass(t.options.classPrefix + 'captions-selected').end().find('input[value="' + trackId + '"]').prop('checked', true).siblings('.' + t.options.classPrefix + 'captions-selector-label').addClass(t.options.classPrefix + 'captions-selected');

		if (trackId === 'none') {
			t.selectedTrack = null;
			t.captionsButton.removeClass(t.options.classPrefix + 'captions-enabled');
			return;
		}

		for (i = 0; i < t.tracks.length; i++) {
			var track = t.tracks[i];
			if (track.trackId === trackId) {
				if (t.selectedTrack === null) {
					t.captionsButton.addClass(t.options.classPrefix + 'captions-enabled');
				}
				t.selectedTrack = track;
				t.captions.attr('lang', t.selectedTrack.srclang);
				t.displayCaptions();
				break;
			}
		}
	},

	/**
  *
  */
	loadNextTrack: function loadNextTrack() {
		var t = this;

		t.trackToLoad++;
		if (t.trackToLoad < t.tracks.length) {
			t.isLoadingTrack = true;
			t.loadTrack(t.trackToLoad);
		} else {
			// add done?
			t.isLoadingTrack = false;

			t.checkForTracks();
		}
	},

	/**
  *
  * @param index
  */
	loadTrack: function loadTrack(index) {
		var t = this,
		    track = t.tracks[index],
		    after = function after() {

			track.isLoaded = true;

			t.enableTrackButton(track);

			t.loadNextTrack();
		};

		if (track !== undefined && (track.src !== undefined || track.src !== "")) {
			$.ajax({
				url: track.src,
				dataType: 'text',
				success: function success(d) {

					// parse the loaded file
					if (typeof d === 'string' && /<tt\s+xml/ig.exec(d)) {
						track.entries = _mejs2.default.TrackFormatParser.dfxp.parse(d);
					} else {
						track.entries = _mejs2.default.TrackFormatParser.webvtt.parse(d);
					}

					after();

					if (track.kind === 'chapters') {
						t.media.addEventListener('play', function () {
							if (t.media.duration > 0) {
								t.displayChapters();
							}
						}, false);
					}

					if (track.kind === 'slides') {
						t.setupSlides(track);
					}
				},
				error: function error() {
					t.removeTrackButton(track.trackId);
					t.loadNextTrack();
				}
			});
		}
	},

	/**
  *
  * @param {String} track - The language code
  */
	enableTrackButton: function enableTrackButton(track) {
		var t = this,
		    lang = track.srclang,
		    label = track.label,
		    target = $('#' + track.trackId);

		if (label === '') {
			label = _i18n2.default.t(_mejs2.default.language.codes[lang]) || lang;
		}

		target.prop('disabled', false).siblings('.' + t.options.classPrefix + 'captions-selector-label').html(label);

		// auto select
		if (t.options.startLanguage === lang) {
			target.prop('checked', true).trigger('click');
		}

		t.adjustLanguageBox();
	},

	/**
  *
  * @param {String} trackId
  */
	removeTrackButton: function removeTrackButton(trackId) {
		var t = this;

		t.captionsButton.find('input[id=' + trackId + ']').closest('li').remove();

		t.adjustLanguageBox();
	},

	/**
  *
  * @param {String} trackId
  * @param {String} lang - The language code
  * @param {String} label
  */
	addTrackButton: function addTrackButton(trackId, lang, label) {
		var t = this;
		if (label === '') {
			label = _i18n2.default.t(_mejs2.default.language.codes[lang]) || lang;
		}

		// trackId is used in the value, too, because the "none"
		// caption option doesn't have a trackId but we need to be able
		// to set it, too
		t.captionsButton.find('ul').append($('<li class="' + t.options.classPrefix + 'captions-selector-list-item">' + ('<input type="radio" class="' + t.options.classPrefix + 'captions-selector-input"') + ('name="' + t.id + '_captions" id="' + trackId + '" value="' + trackId + '" disabled="disabled" />') + ('<label class="' + t.options.classPrefix + 'captions-selector-label">' + label + ' (loading)</label>') + '</li>'));

		t.adjustLanguageBox();

		// remove this from the dropdownlist (if it exists)
		t.container.find('.' + t.options.classPrefix + 'captions-translations option[value=' + lang + ']').remove();
	},

	/**
  *
  */
	adjustLanguageBox: function adjustLanguageBox() {
		var t = this;
		// adjust the size of the outer box
		t.captionsButton.find('.' + t.options.classPrefix + 'captions-selector').height(t.captionsButton.find('.' + t.options.classPrefix + 'captions-selector-list').outerHeight(true) + t.captionsButton.find('.' + t.options.classPrefix + 'captions-translations').outerHeight(true));
	},

	/**
  *
  */
	checkForTracks: function checkForTracks() {
		var t = this,
		    hasSubtitles = false;

		// check if any subtitles
		if (t.options.hideCaptionsButtonWhenEmpty) {
			for (var i = 0, total = t.tracks.length; i < total; i++) {
				var kind = t.tracks[i].kind;
				if ((kind === 'subtitles' || kind === 'captions') && t.tracks[i].isLoaded) {
					hasSubtitles = true;
					break;
				}
			}

			if (!hasSubtitles) {
				t.captionsButton.hide();
				t.setControlsSize();
			}
		}
	},

	/**
  *
  */
	displayCaptions: function displayCaptions() {

		if (this.tracks === undefined) {
			return;
		}

		var t = this,
		    track = t.selectedTrack,
		    i = void 0;

		if (track !== null && track.isLoaded) {
			i = t.searchTrackPosition(track.entries, t.media.currentTime);
			if (i > -1) {
				// Set the line before the timecode as a class so the cue can be targeted if needed
				t.captionsText.html(track.entries[i].text).attr('class', t.options.classPrefix + 'captions-text ' + (track.entries[i].identifier || ''));
				t.captions.show().height(0);
				return; // exit out if one is visible;
			}

			t.captions.hide();
		} else {
			t.captions.hide();
		}
	},

	/**
  *
  * @param {HTMLElement} track
  */
	setupSlides: function setupSlides(track) {
		var t = this;

		t.slides = track;
		t.slides.entries.imgs = [t.slides.entries.length];
		t.showSlide(0);
	},

	/**
  *
  * @param {Number} index
  */
	showSlide: function showSlide(index) {
		if (this.tracks === undefined || this.slidesContainer === undefined) {
			return;
		}

		var t = this,
		    url = t.slides.entries[index].text,
		    img = t.slides.entries[index].imgs;

		if (img === undefined || img.fadeIn === undefined) {

			t.slides.entries[index].imgs = img = $('<img src="' + url + '">').on('load', function () {
				img.appendTo(t.slidesContainer).hide().fadeIn().siblings(':visible').fadeOut();
			});
		} else {

			if (!img.is(':visible') && !img.is(':animated')) {
				img.fadeIn().siblings(':visible').fadeOut();
			}
		}
	},

	/**
  *
  */
	displaySlides: function displaySlides() {

		if (this.slides === undefined) {
			return;
		}

		var t = this,
		    slides = t.slides,
		    i = t.searchTrackPosition(slides.entries, t.media.currentTime);

		if (i > -1) {
			t.showSlide(i);
			return; // exit out if one is visible;
		}
	},

	/**
  *
  */
	displayChapters: function displayChapters() {
		var t = this;

		for (var i = 0, total = t.tracks.length; i < total; i++) {
			if (t.tracks[i].kind === 'chapters' && t.tracks[i].isLoaded) {
				t.drawChapters(t.tracks[i]);
				t.hasChapters = true;
				break;
			}
		}
	},

	/**
  *
  * @param {Object} chapters
  */
	drawChapters: function drawChapters(chapters) {
		var t = this,
		    i = void 0,
		    dur = void 0,
		    percent = 0,
		    usedPercent = 0,
		    total = chapters.entries.length;

		t.chapters.empty();

		for (i = 0; i < total; i++) {
			dur = chapters.entries[i].stop - chapters.entries[i].start;
			percent = Math.floor(dur / t.media.duration * 100);

			// too large or not going to fill it in
			if (percent + usedPercent > 100 || i === chapters.entries.length - 1 && percent + usedPercent < 100) {
				percent = 100 - usedPercent;
			}

			t.chapters.append($('<div class="' + t.options.classPrefix + 'chapter" rel="' + chapters.entries[i].start + '" style="left: ' + usedPercent.toString() + '%; width: ' + percent.toString() + '%;">' + ('<div class="' + t.options.classPrefix + 'chapter-block') + ((i === chapters.entries.length - 1 ? ' ' + t.options.classPrefix + 'chapter-block-last' : '') + '">') + ('<span class="ch-title">' + chapters.entries[i].text + '</span>') + '<span class="ch-time">' + ('' + (0, _time.secondsToTimeCode)(chapters.entries[i].start, t.options.alwaysShowHours)) + '&ndash;' + ('' + (0, _time.secondsToTimeCode)(chapters.entries[i].stop, t.options.alwaysShowHours)) + '</span>' + '</div>' + '</div>'));
			usedPercent += percent;
		}

		t.chapters.find('.' + t.options.classPrefix + 'chapter').click(function () {
			t.media.setCurrentTime(parseFloat($(this).attr('rel')));
			if (t.media.paused) {
				t.media.play();
			}
		});

		t.chapters.show();
	},
	/**
  * Perform binary search to look for proper track index
  *
  * @param {Object[]} tracks
  * @param {Number} currentTime
  * @return {Number}
  */
	searchTrackPosition: function searchTrackPosition(tracks, currentTime) {
		var lo = 0,
		    hi = tracks.length - 1,
		    mid = void 0,
		    start = void 0,
		    stop = void 0;

		while (lo <= hi) {
			mid = lo + hi >> 1;
			start = tracks[mid].start;
			stop = tracks[mid].stop;

			if (currentTime >= start && currentTime < stop) {
				return mid;
			} else if (start < currentTime) {
				lo = mid + 1;
			} else if (start > currentTime) {
				hi = mid - 1;
			}
		}

		return -1;
	}
});

/**
 * Map all possible languages with their respective code
 *
 * @constructor
 */
_mejs2.default.language = {
	codes: {
		af: 'mejs.afrikaans',
		sq: 'mejs.albanian',
		ar: 'mejs.arabic',
		be: 'mejs.belarusian',
		bg: 'mejs.bulgarian',
		ca: 'mejs.catalan',
		zh: 'mejs.chinese',
		'zh-cn': 'mejs.chinese-simplified',
		'zh-tw': 'mejs.chines-traditional',
		hr: 'mejs.croatian',
		cs: 'mejs.czech',
		da: 'mejs.danish',
		nl: 'mejs.dutch',
		en: 'mejs.english',
		et: 'mejs.estonian',
		fl: 'mejs.filipino',
		fi: 'mejs.finnish',
		fr: 'mejs.french',
		gl: 'mejs.galician',
		de: 'mejs.german',
		el: 'mejs.greek',
		ht: 'mejs.haitian-creole',
		iw: 'mejs.hebrew',
		hi: 'mejs.hindi',
		hu: 'mejs.hungarian',
		is: 'mejs.icelandic',
		id: 'mejs.indonesian',
		ga: 'mejs.irish',
		it: 'mejs.italian',
		ja: 'mejs.japanese',
		ko: 'mejs.korean',
		lv: 'mejs.latvian',
		lt: 'mejs.lithuanian',
		mk: 'mejs.macedonian',
		ms: 'mejs.malay',
		mt: 'mejs.maltese',
		no: 'mejs.norwegian',
		fa: 'mejs.persian',
		pl: 'mejs.polish',
		pt: 'mejs.portuguese',
		ro: 'mejs.romanian',
		ru: 'mejs.russian',
		sr: 'mejs.serbian',
		sk: 'mejs.slovak',
		sl: 'mejs.slovenian',
		es: 'mejs.spanish',
		sw: 'mejs.swahili',
		sv: 'mejs.swedish',
		tl: 'mejs.tagalog',
		th: 'mejs.thai',
		tr: 'mejs.turkish',
		uk: 'mejs.ukrainian',
		vi: 'mejs.vietnamese',
		cy: 'mejs.welsh',
		yi: 'mejs.yiddish'
	}
};

/*
 Parses WebVTT format which should be formatted as
 ================================
 WEBVTT

 1
 00:00:01,1 --> 00:00:05,000
 A line of text

 2
 00:01:15,1 --> 00:02:05,000
 A second line of text

 ===============================

 Adapted from: http://www.delphiki.com/html5/playr
 */
_mejs2.default.TrackFormatParser = {
	webvtt: {
		/**
   * @type {String}
   */
		pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,

		/**
   *
   * @param {String} trackText
   * @returns {{text: Array, times: Array}}
   */
		parse: function parse(trackText) {
			var i = 0,
			    lines = _mejs2.default.TrackFormatParser.split2(trackText, /\r?\n/),
			    entries = [],
			    timecode = void 0,
			    text = void 0,
			    identifier = void 0;
			for (; i < lines.length; i++) {
				timecode = this.pattern_timecode.exec(lines[i]);

				if (timecode && i < lines.length) {
					if (i - 1 >= 0 && lines[i - 1] !== '') {
						identifier = lines[i - 1];
					}
					i++;
					// grab all the (possibly multi-line) text that follows
					text = lines[i];
					i++;
					while (lines[i] !== '' && i < lines.length) {
						text = text + '\n' + lines[i];
						i++;
					}
					text = $.trim(text).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
					entries.push({
						identifier: identifier,
						start: (0, _time.convertSMPTEtoSeconds)(timecode[1]) === 0 ? 0.200 : (0, _time.convertSMPTEtoSeconds)(timecode[1]),
						stop: (0, _time.convertSMPTEtoSeconds)(timecode[3]),
						text: text,
						settings: timecode[5]
					});
				}
				identifier = '';
			}
			return entries;
		}
	},
	// Thanks to Justin Capella: https://github.com/johndyer/mediaelement/pull/420
	dfxp: {
		/**
   *
   * @param {String} trackText
   * @returns {{text: Array, times: Array}}
   */
		parse: function parse(trackText) {
			trackText = $(trackText).filter('tt');
			var container = trackText.children('div').eq(0),
			    lines = container.find('p'),
			    styleNode = trackText.find('#' + container.attr('style')),
			    styles = void 0,
			    entries = [],
			    i = void 0;

			if (styleNode.length) {
				var attributes = styleNode.removeAttr('id').get(0).attributes;
				if (attributes.length) {
					styles = {};
					for (i = 0; i < attributes.length; i++) {
						styles[attributes[i].name.split(":")[1]] = attributes[i].value;
					}
				}
			}

			for (i = 0; i < lines.length; i++) {
				var style = void 0,
				    _temp = {
					start: null,
					stop: null,
					style: null,
					text: null
				};

				if (lines.eq(i).attr('begin')) {
					_temp.start = (0, _time.convertSMPTEtoSeconds)(lines.eq(i).attr('begin'));
				}
				if (!_temp.start && lines.eq(i - 1).attr('end')) {
					_temp.start = (0, _time.convertSMPTEtoSeconds)(lines.eq(i - 1).attr('end'));
				}
				if (lines.eq(i).attr('end')) {
					_temp.stop = (0, _time.convertSMPTEtoSeconds)(lines.eq(i).attr('end'));
				}
				if (!_temp.stop && lines.eq(i + 1).attr('begin')) {
					_temp.stop = (0, _time.convertSMPTEtoSeconds)(lines.eq(i + 1).attr('begin'));
				}

				if (styles) {
					style = '';
					for (var _style in styles) {
						style += _style + ':' + styles[_style] + ';';
					}
				}
				if (style) {
					_temp.style = style;
				}
				if (_temp.start === 0) {
					_temp.start = 0.200;
				}
				_temp.text = $.trim(lines.eq(i).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
				entries.push(_temp);
			}
			return entries;
		}
	},
	/**
  *
  * @param {String} text
  * @param {String} regex
  * @returns {Array}
  */
	split2: function split2(text, regex) {
		// normal version for compliant browsers
		// see below for IE fix
		return text.split(regex);
	}
};

// test for browsers with bad String.split method.
if ('x\n\ny'.split(/\n/gi).length !== 3) {
	// add super slow IE8 and below version
	_mejs2.default.TrackFormatParser.split2 = function (text, regex) {
		var parts = [],
		    chunk = '',
		    i = void 0;

		for (i = 0; i < text.length; i++) {
			chunk += text.substring(i, i + 1);
			if (regex.test(chunk)) {
				parts.push(chunk.replace(regex, ''));
				chunk = '';
			}
		}
		parts.push(chunk);
		return parts;
	};
}

},{"16":16,"32":32,"4":4,"6":6}],13:[function(_dereq_,module,exports){
'use strict';

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _constants = _dereq_(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Volume button
 *
 * This feature enables the displaying of a Volume button in the control bar, and also contains logic to manipulate its
 * events, such as sliding up/down (or left/right, if vertical), muting/unmuting media, etc.
 */

// Feature configuration
Object.assign(_player.config, {
	/**
  * @type {String}
  */
	muteText: '',
	/**
  * @type {String}
  */
	allyVolumeControlText: '',
	/**
  * @type {Boolean}
  */
	hideVolumeOnTouchDevices: true,
	/**
  * @type {String}
  */
	audioVolume: 'horizontal',
	/**
  * @type {String}
  */
	videoVolume: 'vertical'
});

Object.assign(_player2.default.prototype, {

	/**
  * Feature constructor.
  *
  * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
  * @param {MediaElementPlayer} player
  * @param {$} controls
  * @param {$} layers
  * @param {HTMLElement} media
  * @public
  */
	buildvolume: function buildvolume(player, controls, layers, media) {

		// Android and iOS don't support volume controls
		if ((_constants.IS_ANDROID || _constants.IS_IOS) && this.options.hideVolumeOnTouchDevices) {
			return;
		}

		var t = this,
		    mode = t.isVideo ? t.options.videoVolume : t.options.audioVolume,
		    muteText = t.options.muteText ? t.options.muteText : _i18n2.default.t('mejs.mute-toggle'),
		    volumeControlText = t.options.allyVolumeControlText ? t.options.allyVolumeControlText : _i18n2.default.t('mejs.volume-help-text'),
		    mute = mode === 'horizontal' ?

		// horizontal version
		$('<div class="' + t.options.classPrefix + 'button ' + t.options.classPrefix + 'volume-button ' + t.options.classPrefix + 'mute">' + ('<button type="button" aria-controls="' + t.id + '" title="' + muteText + '" aria-label="' + muteText + '"></button>') + '</div>' + ('<a href="javascript:void(0);" class="' + t.options.classPrefix + 'horizontal-volume-slider">') + ('<span class="' + t.options.classPrefix + 'offscreen">' + volumeControlText + '</span>') + ('<div class="' + t.options.classPrefix + 'horizontal-volume-total">') + ('<div class="' + t.options.classPrefix + 'horizontal-volume-current"></div>') + ('<div class="' + t.options.classPrefix + 'horizontal-volume-handle"></div>') + '</div>' + '</a>').appendTo(controls) :

		// vertical version
		$('<div class="' + t.options.classPrefix + 'button ' + t.options.classPrefix + 'volume-button ' + t.options.classPrefix + 'mute">' + ('<button type="button" aria-controls="' + t.id + '" title="' + muteText + '" aria-label="' + muteText + '"></button>') + ('<a href="javascript:void(0);" class="' + t.options.classPrefix + 'volume-slider">') + ('<span class="' + t.options.classPrefix + 'offscreen">' + volumeControlText + '</span>') + ('<div class="' + t.options.classPrefix + 'volume-total">') + ('<div class="' + t.options.classPrefix + 'volume-current"></div>') + ('<div class="' + t.options.classPrefix + 'volume-handle"></div>') + '</div>' + '</a>' + '</div>').appendTo(controls),
		    volumeSlider = t.container.find('.' + t.options.classPrefix + 'volume-slider, \n\t\t\t\t.' + t.options.classPrefix + 'horizontal-volume-slider'),
		    volumeTotal = t.container.find('.' + t.options.classPrefix + 'volume-total, \n\t\t\t\t.' + t.options.classPrefix + 'horizontal-volume-total'),
		    volumeCurrent = t.container.find('.' + t.options.classPrefix + 'volume-current, \n\t\t\t\t.' + t.options.classPrefix + 'horizontal-volume-current'),
		    volumeHandle = t.container.find('.' + t.options.classPrefix + 'volume-handle, \n\t\t\t\t.' + t.options.classPrefix + 'horizontal-volume-handle'),


		/**
   * @private
   * @param {Number} volume
   */
		positionVolumeHandle = function positionVolumeHandle(volume) {

			// correct to 0-1
			volume = Math.max(0, volume);
			volume = Math.min(volume, 1);

			// adjust mute button style
			if (volume === 0) {
				mute.removeClass(t.options.classPrefix + 'mute').addClass(t.options.classPrefix + 'unmute');
				mute.children('button').attr({
					title: _i18n2.default.t('mejs.unmute'),
					'aria-label': _i18n2.default.t('mejs.unmute')
				});
			} else {
				mute.removeClass(t.options.classPrefix + 'unmute').addClass(t.options.classPrefix + 'mute');
				mute.children('button').attr({
					title: _i18n2.default.t('mejs.mute'),
					'aria-label': _i18n2.default.t('mejs.mute')
				});
			}

			var volumePercentage = volume * 100 + '%';

			// position slider
			if (mode === 'vertical') {
				volumeCurrent.css({
					bottom: '0',
					height: volumePercentage
				});
				volumeHandle.css({
					bottom: volumePercentage,
					marginBottom: -volumeHandle.height() / 2 + 'px'
				});
			} else {
				volumeCurrent.css({
					left: '0',
					width: volumePercentage
				});
				volumeHandle.css({
					left: volumePercentage,
					marginLeft: -volumeHandle.width() / 2 + 'px'
				});
			}
		},

		/**
   * @private
   */
		handleVolumeMove = function handleVolumeMove(e) {

			var volume = null,
			    totalOffset = volumeTotal.offset();

			// calculate the new volume based on the most recent position
			if (mode === 'vertical') {

				var railHeight = volumeTotal.height(),
				    newY = e.pageY - totalOffset.top;

				volume = (railHeight - newY) / railHeight;

				// the controls just hide themselves (usually when mouse moves too far up)
				if (totalOffset.top === 0 || totalOffset.left === 0) {
					return;
				}
			} else {
				var railWidth = volumeTotal.width(),
				    newX = e.pageX - totalOffset.left;

				volume = newX / railWidth;
			}

			// ensure the volume isn't outside 0-1
			volume = Math.max(0, volume);
			volume = Math.min(volume, 1);

			// position the slider and handle
			positionVolumeHandle(volume);

			// set the media object (this will trigger the `volumechanged` event)
			if (volume === 0) {
				media.setMuted(true);
			} else {
				media.setMuted(false);
			}
			media.setVolume(volume);
		},
		    mouseIsDown = false,
		    mouseIsOver = false;

		// SLIDER
		mute.on('mouseenter focusin', function () {
			volumeSlider.show();
			mouseIsOver = true;
		}).on('mouseleave focusout', function () {
			mouseIsOver = false;

			if (!mouseIsDown && mode === 'vertical') {
				volumeSlider.hide();
			}
		});

		/**
   * @private
   */
		var updateVolumeSlider = function updateVolumeSlider() {

			var volume = Math.floor(media.volume * 100);

			volumeSlider.attr({
				'aria-label': _i18n2.default.t('mejs.volume-slider'),
				'aria-valuemin': 0,
				'aria-valuemax': 100,
				'aria-valuenow': volume,
				'aria-valuetext': volume + '%',
				'role': 'slider',
				'tabindex': -1
			});
		};

		// Events
		volumeSlider.on('mouseover', function () {
			mouseIsOver = true;
		}).on('mousedown', function (e) {
			handleVolumeMove(e);
			t.globalBind('mousemove.vol', function (e) {
				handleVolumeMove(e);
			});
			t.globalBind('mouseup.vol', function () {
				mouseIsDown = false;
				t.globalUnbind('mousemove.vol mouseup.vol');

				if (!mouseIsOver && mode === 'vertical') {
					volumeSlider.hide();
				}
			});
			mouseIsDown = true;

			return false;
		}).on('keydown', function (e) {

			if (t.options.keyActions.length) {
				var keyCode = e.which || e.keyCode || 0,
				    volume = media.volume;
				switch (keyCode) {
					case 38:
						// Up
						volume = Math.min(volume + 0.1, 1);
						break;
					case 40:
						// Down
						volume = Math.max(0, volume - 0.1);
						break;
					default:
						return true;
				}

				mouseIsDown = false;
				positionVolumeHandle(volume);
				media.setVolume(volume);
				return false;
			}
		});

		// MUTE button
		mute.find('button').click(function () {
			media.setMuted(!media.muted);
		});

		//Keyboard input
		mute.find('button').on('focus', function () {
			if (mode === 'vertical') {
				volumeSlider.show();
			}
		}).on('blur', function () {
			if (mode === 'vertical') {
				volumeSlider.hide();
			}
		});

		// listen for volume change events from other sources
		media.addEventListener('volumechange', function (e) {
			if (!mouseIsDown) {
				if (media.muted) {
					positionVolumeHandle(0);
					mute.removeClass(t.options.classPrefix + 'mute').addClass(t.options.classPrefix + 'unmute');
				} else {
					positionVolumeHandle(media.volume);
					mute.removeClass(t.options.classPrefix + 'unmute').addClass(t.options.classPrefix + 'mute');
				}
			}
			updateVolumeSlider(e);
		}, false);

		// mutes the media and sets the volume icon muted if the initial volume is set to 0
		if (player.options.startVolume === 0) {
			media.setMuted(true);
		}

		// shim gets the startvolume as a parameter, but we have to set it on the native <video> and <audio> elements
		var isNative = t.media.rendererName !== null && t.media.rendererName.match(/(native|html5)/) !== null;

		if (isNative) {
			media.setVolume(player.options.startVolume);
		}

		t.container.on('controlsresize', function () {
			if (media.muted) {
				positionVolumeHandle(0);
				mute.removeClass(t.options.classPrefix + 'mute').addClass(t.options.classPrefix + 'unmute');
			} else {
				positionVolumeHandle(media.volume);
				mute.removeClass(t.options.classPrefix + 'unmute').addClass(t.options.classPrefix + 'mute');
			}
		});
	}
});

},{"16":16,"27":27,"4":4}],14:[function(_dereq_,module,exports){
'use strict';

/*!
 * This is a `i18n` language object.
 *
 * English; This can serve as a template for other languages to translate
 *
 * @author
 *   TBD
 *   Sascha Greuel (Twitter: @SoftCreatR)
 *
 * @see core/i18n.js
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});
var EN = exports.EN = {
	"mejs.plural-form": 1,

	// renderers/flash.js
	"mejs.install-flash": "You are using a browser that does not have Flash player enabled or installed. Please turn on your Flash player plugin or download the latest version from https://get.adobe.com/flashplayer/",

	// features/contextmenu.js
	"mejs.fullscreen-off": "Turn off Fullscreen",
	"mejs.fullscreen-on": "Go Fullscreen",
	"mejs.download-video": "Download Video",

	// features/fullscreen.js
	"mejs.fullscreen": "Fullscreen",

	// features/jumpforward.js
	"mejs.time-jump-forward": ["Jump forward 1 second", "Jump forward %1 seconds"],

	// features/loop.js
	"mejs.loop": "Toggle Loop",

	// features/playpause.js
	"mejs.play": "Play",
	"mejs.pause": "Pause",

	// features/postroll.js
	"mejs.close": "Close",

	// features/progress.js
	"mejs.time-slider": "Time Slider",
	"mejs.time-help-text": "Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.",

	// features/skipback.js
	"mejs.time-skip-back": ["Skip back 1 second", "Skip back %1 seconds"],

	// features/tracks.js
	"mejs.captions-subtitles": "Captions/Subtitles",
	"mejs.none": "None",

	// features/volume.js
	"mejs.mute-toggle": "Mute Toggle",
	"mejs.volume-help-text": "Use Up/Down Arrow keys to increase or decrease volume.",
	"mejs.unmute": "Unmute",
	"mejs.mute": "Mute",
	"mejs.volume-slider": "Volume Slider",

	// core/player.js
	"mejs.video-player": "Video Player",
	"mejs.audio-player": "Audio Player",

	// features/ads.js
	"mejs.ad-skip": "Skip ad",
	"mejs.ad-skip-info": ["Skip in 1 second", "Skip in %1 seconds"],

	// features/sourcechooser.js
	"mejs.source-chooser": "Source Chooser",

	// features/stop.js
	"mejs.stop": "Stop",

	//features/speed.js
	"mejs.speed-rate": "Speed Rate",

	//features/progress.js
	"mejs.live-broadcast": "Live Broadcast",

	// features/tracks.js
	"mejs.afrikaans": "Afrikaans",
	"mejs.albanian": "Albanian",
	"mejs.arabic": "Arabic",
	"mejs.belarusian": "Belarusian",
	"mejs.bulgarian": "Bulgarian",
	"mejs.catalan": "Catalan",
	"mejs.chinese": "Chinese",
	"mejs.chinese-simplified": "Chinese (Simplified)",
	"mejs.chinese-traditional": "Chinese (Traditional)",
	"mejs.croatian": "Croatian",
	"mejs.czech": "Czech",
	"mejs.danish": "Danish",
	"mejs.dutch": "Dutch",
	"mejs.english": "English",
	"mejs.estonian": "Estonian",
	"mejs.filipino": "Filipino",
	"mejs.finnish": "Finnish",
	"mejs.french": "French",
	"mejs.galician": "Galician",
	"mejs.german": "German",
	"mejs.greek": "Greek",
	"mejs.haitian-creole": "Haitian Creole",
	"mejs.hebrew": "Hebrew",
	"mejs.hindi": "Hindi",
	"mejs.hungarian": "Hungarian",
	"mejs.icelandic": "Icelandic",
	"mejs.indonesian": "Indonesian",
	"mejs.irish": "Irish",
	"mejs.italian": "Italian",
	"mejs.japanese": "Japanese",
	"mejs.korean": "Korean",
	"mejs.latvian": "Latvian",
	"mejs.lithuanian": "Lithuanian",
	"mejs.macedonian": "Macedonian",
	"mejs.malay": "Malay",
	"mejs.maltese": "Maltese",
	"mejs.norwegian": "Norwegian",
	"mejs.persian": "Persian",
	"mejs.polish": "Polish",
	"mejs.portuguese": "Portuguese",
	"mejs.romanian": "Romanian",
	"mejs.russian": "Russian",
	"mejs.serbian": "Serbian",
	"mejs.slovak": "Slovak",
	"mejs.slovenian": "Slovenian",
	"mejs.spanish": "Spanish",
	"mejs.swahili": "Swahili",
	"mejs.swedish": "Swedish",
	"mejs.tagalog": "Tagalog",
	"mejs.thai": "Thai",
	"mejs.turkish": "Turkish",
	"mejs.ukrainian": "Ukrainian",
	"mejs.vietnamese": "Vietnamese",
	"mejs.welsh": "Welsh",
	"mejs.yiddish": "Yiddish"
};

},{}],15:[function(_dereq_,module,exports){
'use strict';

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof jQuery !== 'undefined') {
	_mejs2.default.$ = jQuery;
} else if (typeof Zepto !== 'undefined') {
	_mejs2.default.$ = Zepto;

	// define `outerWidth` method which has not been realized in Zepto
	Zepto.fn.outerWidth = function (includeMargin) {
		var width = $(this).width();
		if (includeMargin) {
			width += parseInt($(this).css('margin-right'), 10);
			width += parseInt($(this).css('margin-left'), 10);
		}
		return width;
	};
} else if (typeof ender !== 'undefined') {
	_mejs2.default.$ = ender;
}

},{"6":6}],16:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.config = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _mediaelement = _dereq_(5);

var _mediaelement2 = _interopRequireDefault(_mediaelement);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _constants = _dereq_(27);

var _general = _dereq_(29);

var _time = _dereq_(32);

var _dom = _dereq_(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_mejs2.default.mepIndex = 0;

_mejs2.default.players = {};

// default player values
var config = exports.config = {
	// url to poster (to fix iOS 3.x)
	poster: '',
	// When the video is ended, we can show the poster.
	showPosterWhenEnded: false,
	// default if the <video width> is not specified
	defaultVideoWidth: 480,
	// default if the <video height> is not specified
	defaultVideoHeight: 270,
	// if set, overrides <video width>
	videoWidth: -1,
	// if set, overrides <video height>
	videoHeight: -1,
	// default if the user doesn't specify
	defaultAudioWidth: 400,
	// default if the user doesn't specify
	defaultAudioHeight: 40,
	// default amount to move back when back key is pressed
	defaultSeekBackwardInterval: function defaultSeekBackwardInterval(media) {
		return media.duration * 0.05;
	},
	// default amount to move forward when forward key is pressed
	defaultSeekForwardInterval: function defaultSeekForwardInterval(media) {
		return media.duration * 0.05;
	},
	// set dimensions via JS instead of CSS
	setDimensions: true,
	// width of audio player
	audioWidth: -1,
	// height of audio player
	audioHeight: -1,
	// initial volume when the player starts (overridden by user cookie)
	startVolume: 0.8,
	// useful for <audio> player loops
	loop: false,
	// rewind to beginning when media ends
	autoRewind: true,
	// resize to media dimensions
	enableAutosize: true,
	/*
  * Time format to use. Default: 'mm:ss'
  * Supported units:
  *   h: hour
  *   m: minute
  *   s: second
  *   f: frame count
  * When using 'hh', 'mm', 'ss' or 'ff' we always display 2 digits.
  * If you use 'h', 'm', 's' or 'f' we display 1 digit if possible.
  *
  * Example to display 75 seconds:
  * Format 'mm:ss': 01:15
  * Format 'm:ss': 1:15
  * Format 'm:s': 1:15
  */
	timeFormat: '',
	// forces the hour marker (##:00:00)
	alwaysShowHours: false,
	// show framecount in timecode (##:00:00:00)
	showTimecodeFrameCount: false,
	// used when showTimecodeFrameCount is set to true
	framesPerSecond: 25,
	// Hide controls when playing and mouse is not over the video
	alwaysShowControls: false,
	// Display the video control
	hideVideoControlsOnLoad: false,
	// Enable click video element to toggle play/pause
	clickToPlayPause: true,
	// Time in ms to hide controls
	controlsTimeoutDefault: 1500,
	// Time in ms to trigger the timer when mouse moves
	controlsTimeoutMouseEnter: 2500,
	// Time in ms to trigger the timer when mouse leaves
	controlsTimeoutMouseLeave: 1000,
	// force iPad's native controls
	iPadUseNativeControls: false,
	// force iPhone's native controls
	iPhoneUseNativeControls: false,
	// force Android's native controls
	AndroidUseNativeControls: false,
	// features to show
	features: ['playpause', 'current', 'progress', 'duration', 'tracks', 'volume', 'fullscreen'],
	// only for dynamic
	isVideo: true,
	// stretching modes (auto, fill, responsive, none)
	stretching: 'auto',
	// prefix class names on elements
	classPrefix: 'mejs__',
	// turns keyboard support on and off for this instance
	enableKeyboard: true,
	// when this player starts, it will pause other players
	pauseOtherPlayers: true,
	// array of keyboard actions such as play/pause
	keyActions: [{
		keys: [32, // SPACE
		179 // GOOGLE play/pause button
		],
		action: function action(player, media) {

			if (!_constants.IS_FIREFOX) {
				if (media.paused || media.ended) {
					media.play();
				} else {
					media.pause();
				}
			}
		}
	}, {
		keys: [38], // UP
		action: function action(player, media) {

			if (player.container.find('.' + config.classPrefix + 'volume-button>button').is(':focus') || player.container.find('.' + config.classPrefix + 'volume-slider').is(':focus')) {
				player.container.find('.' + config.classPrefix + 'volume-slider').css('display', 'block');
			}
			if (player.isVideo) {
				player.showControls();
				player.startControlsTimer();
			}

			var newVolume = Math.min(media.volume + 0.1, 1);
			media.setVolume(newVolume);
			if (newVolume > 0) {
				media.setMuted(false);
			}
		}
	}, {
		keys: [40], // DOWN
		action: function action(player, media) {

			if (player.container.find('.' + config.classPrefix + 'volume-button>button').is(':focus') || player.container.find('.' + config.classPrefix + 'volume-slider').is(':focus')) {
				player.container.find('.' + config.classPrefix + 'volume-slider').css('display', 'block');
			}

			if (player.isVideo) {
				player.showControls();
				player.startControlsTimer();
			}

			var newVolume = Math.max(media.volume - 0.1, 0);
			media.setVolume(newVolume);

			if (newVolume <= 0.1) {
				media.setMuted(true);
			}
		}
	}, {
		keys: [37, // LEFT
		227 // Google TV rewind
		],
		action: function action(player, media) {
			if (!isNaN(media.duration) && media.duration > 0) {
				if (player.isVideo) {
					player.showControls();
					player.startControlsTimer();
				}

				// 5%
				var newTime = Math.max(media.currentTime - player.options.defaultSeekBackwardInterval(media), 0);
				media.setCurrentTime(newTime);
			}
		}
	}, {
		keys: [39, // RIGHT
		228 // Google TV forward
		],
		action: function action(player, media) {

			if (!isNaN(media.duration) && media.duration > 0) {
				if (player.isVideo) {
					player.showControls();
					player.startControlsTimer();
				}

				// 5%
				var newTime = Math.min(media.currentTime + player.options.defaultSeekForwardInterval(media), media.duration);
				media.setCurrentTime(newTime);
			}
		}
	}, {
		keys: [70], // F
		action: function action(player, media, key, event) {
			if (!event.ctrlKey) {
				if (typeof player.enterFullScreen !== 'undefined') {
					if (player.isFullScreen) {
						player.exitFullScreen();
					} else {
						player.enterFullScreen();
					}
				}
			}
		}
	}, {
		keys: [77], // M
		action: function action(player) {

			player.container.find('.' + config.classPrefix + 'volume-slider').css('display', 'block');
			if (player.isVideo) {
				player.showControls();
				player.startControlsTimer();
			}
			if (player.media.muted) {
				player.setMuted(false);
			} else {
				player.setMuted(true);
			}
		}
	}]
};

_mejs2.default.MepDefaults = config;

/**
 * Wrap a MediaElement object in player controls
 *
 * @constructor
 * @param {HTMLElement} node
 * @param {Object} o
 * @return {?MediaElementPlayer}
 */

var MediaElementPlayer = function () {
	function MediaElementPlayer(node, o) {
		_classCallCheck(this, MediaElementPlayer);

		var t = this;

		t.hasFocus = false;

		t.controlsAreVisible = true;

		t.controlsEnabled = true;

		t.controlsTimer = null;

		// enforce object, even without "new" (via John Resig)
		if (!(t instanceof MediaElementPlayer)) {
			return new MediaElementPlayer(node, o);
		}

		// these will be reset after the MediaElement.success fires
		t.$media = t.$node = $(node);
		t.node = t.media = t.$media[0];

		if (!t.node) {
			return;
		}

		// check for existing player
		if (t.node.player !== undefined) {
			return t.node.player;
		}

		// try to get options from data-mejsoptions
		if (o === undefined) {
			o = t.$node.data('mejsoptions');
		}

		// extend default options
		t.options = Object.assign({}, config, o);

		if (!t.options.timeFormat) {
			// Generate the time format according to options
			t.options.timeFormat = 'mm:ss';
			if (t.options.alwaysShowHours) {
				t.options.timeFormat = 'hh:mm:ss';
			}
			if (t.options.showTimecodeFrameCount) {
				t.options.timeFormat += ':ff';
			}
		}

		(0, _time.calculateTimeFormat)(0, t.options, t.options.framesPerSecond || 25);

		// unique ID
		t.id = 'mep_' + _mejs2.default.mepIndex++;

		// add to player array (for focus events)
		_mejs2.default.players[t.id] = t;

		// start up
		var meOptions = Object.assign({}, t.options, {
			success: function success(media, domNode) {
				t._meReady(media, domNode);
			},
			error: function error(e) {
				t._handleError(e);
			}
		}),
		    tagName = t.media.tagName.toLowerCase();

		// get video from src or href?
		t.isDynamic = tagName !== 'audio' && tagName !== 'video';
		t.isVideo = t.isDynamic ? t.options.isVideo : tagName !== 'audio' && t.options.isVideo;

		// use native controls in iPad, iPhone, and Android
		if (_constants.IS_IPAD && t.options.iPadUseNativeControls || _constants.IS_IPHONE && t.options.iPhoneUseNativeControls) {

			// add controls and stop
			t.$media.attr('controls', 'controls');

			// override Apple's autoplay override for iPads
			if (_constants.IS_IPAD && t.media.getAttribute('autoplay')) {
				t.play();
			}
		} else if (_constants.IS_ANDROID && t.options.AndroidUseNativeControls) {

			// leave default player

		} else if (t.isVideo || !t.isVideo && t.options.features.length) {

			// DESKTOP: use MediaElementPlayer controls

			// remove native controls
			t.$media.removeAttr('controls');
			var videoPlayerTitle = t.isVideo ? _i18n2.default.t('mejs.video-player') : _i18n2.default.t('mejs.audio-player');
			// insert description for screen readers
			$('<span class="' + t.options.classPrefix + 'offscreen">' + videoPlayerTitle + '</span>').insertBefore(t.$media);
			// build container
			t.container = $('<div id="' + t.id + '" class="' + t.options.classPrefix + 'container ' + t.options.classPrefix + 'container-keyboard-inactive"' + ('tabindex="0" role="application" aria-label="' + videoPlayerTitle + '">') + ('<div class="' + t.options.classPrefix + 'inner">') + ('<div class="' + t.options.classPrefix + 'mediaelement"></div>') + ('<div class="' + t.options.classPrefix + 'layers"></div>') + ('<div class="' + t.options.classPrefix + 'controls"></div>') + ('<div class="' + t.options.classPrefix + 'clear"></div>') + '</div>' + '</div>').addClass(t.$media[0].className).insertBefore(t.$media).focus(function (e) {
				if (!t.controlsAreVisible && !t.hasFocus && t.controlsEnabled) {
					t.showControls(true);
					// In versions older than IE11, the focus causes the playbar to be displayed
					// if user clicks on the Play/Pause button in the control bar once it attempts
					// to hide it
					if (!_constants.HAS_MS_NATIVE_FULLSCREEN) {
						// If e.relatedTarget appears before container, send focus to play button,
						// else send focus to last control button.
						var btnSelector = '.' + t.options.classPrefix + 'playpause-button > button';

						if ((0, _dom.isNodeAfter)(e.relatedTarget, t.container[0])) {
							btnSelector = '.' + t.options.classPrefix + 'controls .' + t.options.classPrefix + 'button:last-child > button';
						}

						var button = t.container.find(btnSelector);
						button.focus();
					}
				}
			});

			// When no elements in controls, hide bar completely
			if (!t.options.features.length) {
				t.container.css('background', 'transparent').find('.' + t.options.classPrefix + 'controls').hide();
			}

			if (t.isVideo && t.options.stretching === 'fill' && !t.container.parent('.' + t.options.classPrefix + 'fill-container').length) {
				// outer container
				t.outerContainer = t.$media.parent();
				t.container.wrap('<div class="' + t.options.classPrefix + 'fill-container"/>');
			}

			// add classes for user and content
			t.container.addClass((_constants.IS_ANDROID ? t.options.classPrefix + 'android ' : '') + (_constants.IS_IOS ? t.options.classPrefix + 'ios ' : '') + (_constants.IS_IPAD ? t.options.classPrefix + 'ipad ' : '') + (_constants.IS_IPHONE ? t.options.classPrefix + 'iphone ' : '') + (t.isVideo ? t.options.classPrefix + 'video ' : t.options.classPrefix + 'audio '));

			// move the <video/video> tag into the right spot
			t.container.find('.' + t.options.classPrefix + 'mediaelement').append(t.$media);

			// needs to be assigned here, after iOS remap
			t.node.player = t;

			// find parts
			t.controls = t.container.find('.' + t.options.classPrefix + 'controls');
			t.layers = t.container.find('.' + t.options.classPrefix + 'layers');

			// determine the size

			/* size priority:
    (1) videoWidth (forced),
    (2) style="width;height;"
    (3) width attribute,
    (4) defaultVideoWidth (for unspecified cases)
    */

			var tagType = t.isVideo ? 'video' : 'audio',
			    capsTagName = tagType.substring(0, 1).toUpperCase() + tagType.substring(1);

			if (t.options[tagType + 'Width'] > 0 || t.options[tagType + 'Width'].toString().indexOf('%') > -1) {
				t.width = t.options[tagType + 'Width'];
			} else if (t.media.style.width !== '' && t.media.style.width !== null) {
				t.width = t.media.style.width;
			} else if (t.media.getAttribute('width')) {
				t.width = t.$media.attr('width');
			} else {
				t.width = t.options['default' + capsTagName + 'Width'];
			}

			if (t.options[tagType + 'Height'] > 0 || t.options[tagType + 'Height'].toString().indexOf('%') > -1) {
				t.height = t.options[tagType + 'Height'];
			} else if (t.media.style.height !== '' && t.media.style.height !== null) {
				t.height = t.media.style.height;
			} else if (t.$media[0].getAttribute('height')) {
				t.height = t.$media.attr('height');
			} else {
				t.height = t.options['default' + capsTagName + 'Height'];
			}

			t.initialAspectRatio = t.height >= t.width ? t.width / t.height : t.height / t.width;

			// set the size, while we wait for the plugins to load below
			t.setPlayerSize(t.width, t.height);

			// create MediaElementShim
			meOptions.pluginWidth = t.width;
			meOptions.pluginHeight = t.height;
		}
		// Hide media completely for audio that doesn't have any features
		else if (!t.isVideo && !t.options.features.length) {
				t.$media.hide();
			}

		// create MediaElement shim
		new _mediaelement2.default(t.$media[0], meOptions);

		if (t.container !== undefined && t.options.features.length && t.controlsAreVisible && !t.options.hideVideoControlsOnLoad) {
			// controls are shown when loaded
			t.container.trigger('controlsshown');
		}

		return t;
	}

	_createClass(MediaElementPlayer, [{
		key: 'showControls',
		value: function showControls(doAnimation) {
			var t = this;

			doAnimation = doAnimation === undefined || doAnimation;

			if (t.controlsAreVisible) {
				return;
			}

			if (doAnimation) {
				t.controls.removeClass(t.options.classPrefix + 'offscreen').stop(true, true).fadeIn(200, function () {
					t.controlsAreVisible = true;
					t.container.trigger('controlsshown');
				});

				// any additional controls people might add and want to hide
				t.container.find('.' + t.options.classPrefix + 'control').removeClass(t.options.classPrefix + 'offscreen').stop(true, true).fadeIn(200, function () {
					t.controlsAreVisible = true;
				});
			} else {
				t.controls.removeClass(t.options.classPrefix + 'offscreen').css('display', 'block');

				// any additional controls people might add and want to hide
				t.container.find('.' + t.options.classPrefix + 'control').removeClass(t.options.classPrefix + 'offscreen').css('display', 'block');

				t.controlsAreVisible = true;
				t.container.trigger('controlsshown');
			}

			t.setControlsSize();
		}
	}, {
		key: 'hideControls',
		value: function hideControls(doAnimation) {
			var t = this;

			doAnimation = doAnimation === undefined || doAnimation;

			if (!t.controlsAreVisible || t.options.alwaysShowControls || t.keyboardAction || t.media.paused && t.media.readyState === 4 && (!t.options.hideVideoControlsOnLoad && t.media.currentTime <= 0 || t.media.currentTime > 0) || t.isVideo && !t.options.hideVideoControlsOnLoad && !t.media.readyState || t.media.ended) {
				return;
			}

			if (doAnimation) {
				// fade out main controls
				t.controls.stop(true, true).fadeOut(200, function () {
					$(this).addClass(t.options.classPrefix + 'offscreen').css('display', 'block');

					t.controlsAreVisible = false;
					t.container.trigger('controlshidden');
				});

				// any additional controls people might add and want to hide
				t.container.find('.' + t.options.classPrefix + 'control').stop(true, true).fadeOut(200, function () {
					$(this).addClass(t.options.classPrefix + 'offscreen').css('display', 'block');
				});
			} else {

				// hide main controls
				t.controls.addClass(t.options.classPrefix + 'offscreen').css('display', 'block');

				// hide others
				t.container.find('.' + t.options.classPrefix + 'control').addClass(t.options.classPrefix + 'offscreen').css('display', 'block');

				t.controlsAreVisible = false;
				t.container.trigger('controlshidden');
			}
		}
	}, {
		key: 'startControlsTimer',
		value: function startControlsTimer(timeout) {

			var t = this;

			timeout = typeof timeout !== 'undefined' ? timeout : t.options.controlsTimeoutDefault;

			t.killControlsTimer('start');

			t.controlsTimer = setTimeout(function () {
				t.hideControls();
				t.killControlsTimer('hide');
			}, timeout);
		}
	}, {
		key: 'killControlsTimer',
		value: function killControlsTimer() {

			var t = this;

			if (t.controlsTimer !== null) {
				clearTimeout(t.controlsTimer);
				delete t.controlsTimer;
				t.controlsTimer = null;
			}
		}
	}, {
		key: 'disableControls',
		value: function disableControls() {
			var t = this;

			t.killControlsTimer();
			t.hideControls(false);
			this.controlsEnabled = false;
		}
	}, {
		key: 'enableControls',
		value: function enableControls() {
			var t = this;

			t.showControls(false);

			t.controlsEnabled = true;
		}

		/**
   * Set up all controls and events
   *
   * @param media
   * @param domNode
   * @private
   */

	}, {
		key: '_meReady',
		value: function _meReady(media, domNode) {
			var _this = this;

			var t = this,
			    autoplayAttr = domNode.getAttribute('autoplay'),
			    autoplay = !(autoplayAttr === undefined || autoplayAttr === null || autoplayAttr === 'false'),
			    isNative = media.rendererName !== null && media.rendererName.match(/(native|html5)/) !== null;

			// make sure it can't create itself again if a plugin reloads
			if (t.created) {
				return;
			}

			t.created = true;
			t.media = media;
			t.domNode = domNode;

			if (!(_constants.IS_ANDROID && t.options.AndroidUseNativeControls) && !(_constants.IS_IPAD && t.options.iPadUseNativeControls) && !(_constants.IS_IPHONE && t.options.iPhoneUseNativeControls)) {
				var _ret = function () {

					// In the event that no features are specified for audio,
					// create only MediaElement instance rather than
					// doing all the work to create a full player
					if (!t.isVideo && !t.options.features.length) {

						// force autoplay for HTML5
						if (autoplay && isNative) {
							t.play();
						}

						if (t.options.success) {

							if (typeof t.options.success === 'string') {
								_window2.default[t.options.success](t.media, t.domNode, t);
							} else {
								t.options.success(t.media, t.domNode, t);
							}
						}

						return {
							v: void 0
						};
					}

					// two built in features
					t.buildposter(t, t.controls, t.layers, t.media);
					t.buildkeyboard(t, t.controls, t.layers, t.media);
					t.buildoverlays(t, t.controls, t.layers, t.media);

					// grab for use by features
					t.findTracks();

					// add user-defined features/controls
					for (var featureIndex in t.options.features) {
						var feature = t.options.features[featureIndex];
						if (t['build' + feature]) {
							try {
								t['build' + feature](t, t.controls, t.layers, t.media);
							} catch (e) {
								// TODO: report control error
								console.error('error building ' + feature, e);
							}
						}
					}

					t.container.trigger('controlsready');

					// reset all layers and controls
					t.setPlayerSize(t.width, t.height);
					t.setControlsSize();

					// controls fade
					if (t.isVideo) {

						if (_constants.HAS_TOUCH && !t.options.alwaysShowControls) {

							// for touch devices (iOS, Android)
							// show/hide without animation on touch

							t.$media.on('touchstart', function () {

								// toggle controls
								if (t.controlsAreVisible) {
									t.hideControls(false);
								} else {
									if (t.controlsEnabled) {
										t.showControls(false);
									}
								}
							});
						} else {

							// create callback here since it needs access to current
							// MediaElement object
							t.clickToPlayPauseCallback = function () {

								if (t.options.clickToPlayPause) {
									var button = t.$media.closest('.' + t.options.classPrefix + 'container').find('.' + t.options.classPrefix + 'overlay-button'),
									    pressed = button.attr('aria-pressed');
									if (t.media.paused && pressed) {
										t.pause();
									} else if (t.media.paused) {
										t.play();
									} else {
										t.pause();
									}

									button.attr('aria-pressed', !pressed);
								}
							};

							// click to play/pause
							t.media.addEventListener('click', t.clickToPlayPauseCallback, false);

							// show/hide controls
							t.container.on('mouseenter', function () {
								if (t.controlsEnabled) {
									if (!t.options.alwaysShowControls) {
										t.killControlsTimer('enter');
										t.showControls();
										t.startControlsTimer(t.options.controlsTimeoutMouseEnter);
									}
								}
							}).on('mousemove', function () {
								if (t.controlsEnabled) {
									if (!t.controlsAreVisible) {
										t.showControls();
									}
									if (!t.options.alwaysShowControls) {
										t.startControlsTimer(t.options.controlsTimeoutMouseEnter);
									}
								}
							}).on('mouseleave', function () {
								if (t.controlsEnabled) {
									if (!t.media.paused && !t.options.alwaysShowControls) {
										t.startControlsTimer(t.options.controlsTimeoutMouseLeave);
									}
								}
							});
						}

						if (t.options.hideVideoControlsOnLoad) {
							t.hideControls(false);
						}

						// check for autoplay
						if (autoplay && !t.options.alwaysShowControls) {
							t.hideControls();
						}

						// resizer
						if (t.options.enableAutosize) {
							t.media.addEventListener('loadedmetadata', function (e) {
								// if the <video height> was not set and the options.videoHeight was not set
								// then resize to the real dimensions
								if (t.options.videoHeight <= 0 && !t.domNode.getAttribute('height') && !isNaN(e.target.videoHeight)) {
									t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);
									t.setControlsSize();
									t.media.setSize(e.target.videoWidth, e.target.videoHeight);
								}
							}, false);
						}
					}

					// EVENTS

					// FOCUS: when a video starts playing, it takes focus from other players (possibly pausing them)
					t.media.addEventListener('play', function () {
						t.hasFocus = true;

						// go through all other players
						for (var playerIndex in _mejs2.default.players) {
							var p = _mejs2.default.players[playerIndex];
							if (p.id !== t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended) {
								p.pause();
								p.hasFocus = false;
							}
						}
					}, false);

					// ended for all
					t.media.addEventListener('ended', function () {
						if (t.options.autoRewind) {
							try {
								t.media.setCurrentTime(0);
								// Fixing an Android stock browser bug, where "seeked" isn't fired correctly after ending the video and jumping to the beginning
								_window2.default.setTimeout(function () {
									$(t.container).find('.' + t.options.classPrefix + 'overlay-loading').parent().hide();
								}, 20);
							} catch (exp) {}
						}

						if (typeof t.media.stop === 'function') {
							t.media.stop();
						} else {
							t.media.pause();
						}

						if (t.setProgressRail) {
							t.setProgressRail();
						}
						if (t.setCurrentRail) {
							t.setCurrentRail();
						}

						if (t.options.loop) {
							t.play();
						} else if (!t.options.alwaysShowControls && t.controlsEnabled) {
							t.showControls();
						}
					}, false);

					// resize on the first play
					t.media.addEventListener('loadedmetadata', function () {

						(0, _time.calculateTimeFormat)(t.duration, t.options, t.options.framesPerSecond || 25);

						if (t.updateDuration) {
							t.updateDuration();
						}
						if (t.updateCurrent) {
							t.updateCurrent();
						}

						if (!t.isFullScreen) {
							t.setPlayerSize(t.width, t.height);
							t.setControlsSize();
						}
					}, false);

					// Only change the time format when necessary
					var duration = null;
					t.media.addEventListener('timeupdate', function () {
						if (duration !== _this.duration) {
							duration = _this.duration;
							(0, _time.calculateTimeFormat)(duration, t.options, t.options.framesPerSecond || 25);

							// make sure to fill in and resize the controls (e.g., 00:00 => 01:13:15
							if (t.updateDuration) {
								t.updateDuration();
							}
							if (t.updateCurrent) {
								t.updateCurrent();
							}
							t.setControlsSize();
						}
					}, false);

					t.container.focusout(function (e) {
						if (e.relatedTarget) {
							//FF is working on supporting focusout https://bugzilla.mozilla.org/show_bug.cgi?id=687787
							var $target = $(e.relatedTarget);
							if (t.keyboardAction && $target.parents('.' + t.options.classPrefix + 'container').length === 0) {
								t.keyboardAction = false;
								if (t.isVideo && !t.options.alwaysShowControls) {
									t.hideControls(true);
								}
							}
						}
					});

					// webkit has trouble doing this without a delay
					setTimeout(function () {
						t.setPlayerSize(t.width, t.height);
						t.setControlsSize();
					}, 50);

					// adjust controls whenever window sizes (used to be in fullscreen only)
					t.globalBind('resize', function () {

						// don't resize for fullscreen mode
						if (!(t.isFullScreen || _constants.HAS_TRUE_NATIVE_FULLSCREEN && _document2.default.webkitIsFullScreen)) {
							t.setPlayerSize(t.width, t.height);
						}

						// always adjust controls
						t.setControlsSize();
					});

					// Disable focus outline to improve look-and-feel for regular users
					t.globalBind('click', function (e) {
						if ($(e.target).is('.' + t.options.classPrefix + 'container')) {
							$(e.target).addClass(t.options.classPrefix + 'container-keyboard-inactive');
						} else if ($(e.target).closest('.' + t.options.classPrefix + 'container').length) {
							$(e.target).closest('.' + t.options.classPrefix + 'container').addClass(t.options.classPrefix + 'container-keyboard-inactive');
						}
					});

					// Enable focus outline for Accessibility purposes
					t.globalBind('keydown', function (e) {
						if ($(e.target).is('.' + t.options.classPrefix + 'container')) {
							$(e.target).removeClass(t.options.classPrefix + 'container-keyboard-inactive');
						} else if ($(e.target).closest('.' + t.options.classPrefix + 'container').length) {
							$(e.target).closest('.' + t.options.classPrefix + 'container').removeClass(t.options.classPrefix + 'container-keyboard-inactive');
						}
					});

					// This is a work-around for a bug in the YouTube iFrame player, which means
					//	we can't use the play() API for the initial playback on iOS or Android;
					//	user has to start playback directly by tapping on the iFrame.
					if (t.media.rendererName !== null && t.media.rendererName.match(/youtube/) && (_constants.IS_IOS || _constants.IS_ANDROID)) {
						t.container.find('.' + t.options.classPrefix + 'overlay-play').hide();
						t.container.find('.' + t.options.classPrefix + 'poster').hide();
					}
				}();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}

			// force autoplay for HTML5
			if (autoplay && isNative) {
				t.play();
			}

			if (t.options.success) {

				if (typeof t.options.success === 'string') {
					_window2.default[t.options.success](t.media, t.domNode, t);
				} else {
					t.options.success(t.media, t.domNode, t);
				}
			}
		}

		/**
   *
   * @param {Event} e
   * @private
   */

	}, {
		key: '_handleError',
		value: function _handleError(e) {
			var t = this;

			if (t.controls) {
				t.disableControls();
			}

			// Tell user that the file cannot be played
			if (t.options.error) {
				t.options.error(e);
			}
		}
	}, {
		key: 'setPlayerSize',
		value: function setPlayerSize(width, height) {
			var t = this;

			if (!t.options.setDimensions) {
				return false;
			}

			if (typeof width !== 'undefined') {
				t.width = width;
			}

			if (typeof height !== 'undefined') {
				t.height = height;
			}

			if (typeof FB !== 'undefined' && t.isVideo) {
				FB.Event.subscribe('xfbml.ready', function () {
					var target = $(t.media).children('.fb-video');

					t.width = target.width();
					t.height = target.height();
					t.setDimensions(t.width, t.height);
					return false;
				});

				var target = $(t.media).children('.fb-video');

				if (target.length) {
					t.width = target.width();
					t.height = target.height();
				}
			}

			// check stretching modes
			switch (t.options.stretching) {
				case 'fill':
					// The 'fill' effect only makes sense on video; for audio we will set the dimensions
					if (t.isVideo) {
						t.setFillMode();
					} else {
						t.setDimensions(t.width, t.height);
					}
					break;
				case 'responsive':
					t.setResponsiveMode();
					break;
				case 'none':
					t.setDimensions(t.width, t.height);
					break;
				// This is the 'auto' mode
				default:
					if (t.hasFluidMode() === true) {
						t.setResponsiveMode();
					} else {
						t.setDimensions(t.width, t.height);
					}
					break;
			}
		}
	}, {
		key: 'hasFluidMode',
		value: function hasFluidMode() {
			var t = this;

			// detect 100% mode - use currentStyle for IE since css() doesn't return percentages
			return t.height.toString().includes('%') || t.$node.css('max-width') !== 'none' && t.$node.css('max-width') !== t.width || t.$node[0].currentStyle && t.$node[0].currentStyle.maxWidth === '100%';
		}
	}, {
		key: 'setResponsiveMode',
		value: function setResponsiveMode() {
			var t = this;

			// do we have the native dimensions yet?
			var nativeWidth = function () {
				if (t.isVideo) {
					if (t.media.videoWidth && t.media.videoWidth > 0) {
						return t.media.videoWidth;
					} else if (t.media.getAttribute('width')) {
						return t.media.getAttribute('width');
					} else {
						return t.options.defaultVideoWidth;
					}
				} else {
					return t.options.defaultAudioWidth;
				}
			}();

			var nativeHeight = function () {
				if (t.isVideo) {
					if (t.media.videoHeight && t.media.videoHeight > 0) {
						return t.media.videoHeight;
					} else if (t.media.getAttribute('height')) {
						return t.media.getAttribute('height');
					} else {
						return t.options.defaultVideoHeight;
					}
				} else {
					return t.options.defaultAudioHeight;
				}
			}();

			// Use media aspect ratio if received; otherwise, the initially stored initial aspect ratio
			var aspectRatio = function () {
				var ratio = 1;
				if (!t.isVideo) {
					return ratio;
				}

				if (t.media.videoWidth && t.media.videoWidth > 0 && t.media.videoHeight && t.media.videoHeight > 0) {
					ratio = t.height >= t.width ? t.media.videoWidth / t.media.videoHeight : t.media.videoHeight / t.media.videoWidth;
				} else {
					ratio = t.initialAspectRatio;
				}

				if (isNaN(ratio) || ratio < 0.01 || ratio > 100) {
					ratio = 1;
				}

				return ratio;
			}(),
			    parentWidth = t.container.parent().closest(':visible').width(),
			    parentHeight = t.container.parent().closest(':visible').height(),
			    newHeight = void 0;

			if (t.isVideo) {
				// Responsive video is based on width: 100% and height: 100%
				if (t.height === '100%') {
					newHeight = parseInt(parentWidth * nativeHeight / nativeWidth, 10);
				} else {
					newHeight = t.height >= t.width ? parseInt(parentWidth / aspectRatio, 10) : parseInt(parentWidth * aspectRatio, 10);
				}
			} else {
				newHeight = nativeHeight;
			}

			// If we were unable to compute newHeight, get the container height instead
			if (isNaN(newHeight)) {
				newHeight = parentHeight;
			}

			if (t.container.parent().length > 0 && t.container.parent()[0].tagName.toLowerCase() === 'body') {
				// && t.container.siblings().count == 0) {
				parentWidth = $(_window2.default).width();
				newHeight = $(_window2.default).height();
			}

			if (newHeight && parentWidth) {

				// set outer container size
				t.container.width(parentWidth).height(newHeight);

				// set native <video> or <audio> and shims
				t.$media.width('100%').height('100%');

				// if shim is ready, send the size to the embedded plugin
				if (t.isVideo) {
					if (t.media.setSize) {
						t.media.setSize(parentWidth, newHeight);
					}
				}

				// set the layers
				t.layers.children('.' + t.options.classPrefix + 'layer').width('100%').height('100%');
			}
		}
	}, {
		key: 'setFillMode',
		value: function setFillMode() {
			var t = this,
			    parent = t.outerContainer;

			// Remove the responsive attributes in the event they are there
			if (t.$node.css('height') !== 'none' && t.$node.css('height') !== t.height) {
				t.$node.css('height', '');
			}
			if (t.$node.css('max-width') !== 'none' && t.$node.css('max-width') !== t.width) {
				t.$node.css('max-width', '');
			}

			if (t.$node.css('max-height') !== 'none' && t.$node.css('max-height') !== t.height) {
				t.$node.css('max-height', '');
			}

			if (t.$node[0].currentStyle) {
				if (t.$node[0].currentStyle.height === '100%') {
					t.$node[0].currentStyle.height = '';
				}
				if (t.$node[0].currentStyle.maxWidth === '100%') {
					t.$node[0].currentStyle.maxWidth = '';
				}
				if (t.$node[0].currentStyle.maxHeight === '100%') {
					t.$node[0].currentStyle.maxHeight = '';
				}
			}

			if (!parent.width()) {
				parent.height(t.$media.width());
			}

			if (!parent.height()) {
				parent.height(t.$media.height());
			}

			var parentWidth = parent.width(),
			    parentHeight = parent.height();

			t.setDimensions('100%', '100%');

			// This prevents an issue when displaying poster
			t.container.find('.' + t.options.classPrefix + 'poster img').css('display', 'block');

			// calculate new width and height
			var targetElement = t.container.find('object, embed, iframe, video'),
			    initHeight = t.height,
			    initWidth = t.width,

			// scale to the target width
			scaleX1 = parentWidth,
			    scaleY1 = initHeight * parentWidth / initWidth,

			// scale to the target height
			scaleX2 = initWidth * parentHeight / initHeight,
			    scaleY2 = parentHeight,

			// now figure out which one we should use
			bScaleOnWidth = scaleX2 > parentWidth === false,
			    finalWidth = bScaleOnWidth ? Math.floor(scaleX1) : Math.floor(scaleX2),
			    finalHeight = bScaleOnWidth ? Math.floor(scaleY1) : Math.floor(scaleY2);

			if (bScaleOnWidth) {
				targetElement.height(finalHeight).width(parentWidth);
				if (t.media.setSize) {
					t.media.setSize(parentWidth, finalHeight);
				}
			} else {
				targetElement.height(parentHeight).width(finalWidth);
				if (t.media.setSize) {
					t.media.setSize(finalWidth, parentHeight);
				}
			}

			targetElement.css({
				'margin-left': Math.floor((parentWidth - finalWidth) / 2),
				'margin-top': 0
			});
		}
	}, {
		key: 'setDimensions',
		value: function setDimensions(width, height) {
			var t = this;

			t.container.width(width).height(height);

			t.layers.children('.' + t.options.classPrefix + 'layer').width(width).height(height);
		}
	}, {
		key: 'setControlsSize',
		value: function setControlsSize() {
			var t = this;

			// skip calculation if hidden
			if (!t.container.is(':visible') || !t.rail || !t.rail.length || !t.rail.is(':visible')) {
				return;
			}

			var railMargin = parseFloat(t.rail.css('margin-left')) + parseFloat(t.rail.css('margin-right')),
			    totalMargin = parseFloat(t.total.css('margin-left')) + parseFloat(t.total.css('margin-right')) || 0,
			    siblingsWidth = 0;

			t.rail.siblings().each(function (index, object) {
				siblingsWidth += parseFloat($(object).outerWidth(true));
			});

			siblingsWidth += totalMargin + railMargin + 1;

			// Substract the width of the feature siblings from time rail
			t.rail.width(t.controls.width() - siblingsWidth);

			t.container.trigger('controlsresize');
		}
	}, {
		key: 'resetSize',
		value: function resetSize() {
			var t = this;
			// webkit has trouble doing this without a delay
			setTimeout(function () {
				t.setPlayerSize(t.width, t.height);
				t.setControlsSize();
			}, 50);
		}
	}, {
		key: 'setPoster',
		value: function setPoster(url) {
			var t = this,
			    posterDiv = t.container.find('.' + t.options.classPrefix + 'poster'),
			    posterImg = posterDiv.find('img');

			if (posterImg.length === 0) {
				posterImg = $('<img class="' + t.options.classPrefix + 'poster-img" width="100%" height="100%" alt="" />').appendTo(posterDiv);
			}

			posterImg.attr('src', url);
			posterDiv.css({ 'background-image': 'url("' + url + '")' });
		}
	}, {
		key: 'changeSkin',
		value: function changeSkin(className) {
			var t = this;

			t.container[0].className = t.options.classPrefix + 'container ' + className;
			t.setPlayerSize(t.width, t.height);
			t.setControlsSize();
		}
	}, {
		key: 'globalBind',
		value: function globalBind(events, data, callback) {
			var t = this,
			    doc = t.node ? t.node.ownerDocument : _document2.default;

			events = (0, _general.splitEvents)(events, t.id);
			if (events.d) {
				$(doc).on(events.d, data, callback);
			}
			if (events.w) {
				$(_window2.default).on(events.w, data, callback);
			}
		}
	}, {
		key: 'globalUnbind',
		value: function globalUnbind(events, callback) {

			var t = this,
			    doc = t.node ? t.node.ownerDocument : _document2.default;

			events = (0, _general.splitEvents)(events, t.id);
			if (events.d) {
				$(doc).off(events.d, callback);
			}
			if (events.w) {
				$(_window2.default).off(events.w, callback);
			}
		}
	}, {
		key: 'buildposter',
		value: function buildposter(player, controls, layers, media) {

			var t = this,
			    poster = $('<div class="' + t.options.classPrefix + 'poster ' + t.options.classPrefix + 'layer"></div>').appendTo(layers),
			    posterUrl = player.$media.attr('poster');

			// priority goes to option (this is useful if you need to support iOS 3.x (iOS completely fails with poster)
			if (player.options.poster !== '') {
				posterUrl = player.options.poster;
			}

			// second, try the real poster
			if (posterUrl) {
				t.setPoster(posterUrl);
			} else {
				poster.hide();
			}

			media.addEventListener('play', function () {
				poster.hide();
			}, false);

			if (player.options.showPosterWhenEnded && player.options.autoRewind) {
				media.addEventListener('ended', function () {
					poster.show();
				}, false);
			}
		}
	}, {
		key: 'buildoverlays',
		value: function buildoverlays(player, controls, layers, media) {

			if (!player.isVideo) {
				return;
			}

			var t = this,
			    loading = $('<div class="' + t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'layer">' + ('<div class="' + t.options.classPrefix + 'overlay-loading">') + ('<span class="' + t.options.classPrefix + 'overlay-loading-bg-img"></span>') + '</div>' + '</div>').hide() // start out hidden
			.appendTo(layers),
			    error = $('<div class="' + t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'layer">' + ('<div class="' + t.options.classPrefix + 'overlay-error"></div>') + '</div>').hide() // start out hidden
			.appendTo(layers),

			// this needs to come last so it's on top
			bigPlay = $('<div class="' + t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'layer ' + t.options.classPrefix + 'overlay-play">' + ('<div class="' + t.options.classPrefix + 'overlay-button" role="button" ') + ('aria-label="' + _i18n2.default.t('mejs.play') + '" aria-pressed="false">') + '</div>' + '</div>').appendTo(layers).on('click', function () {
				// Removed 'touchstart' due issues on Samsung Android devices where a tap on bigPlay
				// started and immediately stopped the video
				if (t.options.clickToPlayPause) {

					var button = t.$media.closest('.' + t.options.classPrefix + 'container').find('.' + t.options.classPrefix + 'overlay-button'),
					    pressed = button.attr('aria-pressed');

					if (media.paused) {
						media.play();
					} else {
						media.pause();
					}

					button.attr('aria-pressed', !!pressed);
				}
			});

			// if (t.options.supportVR || (t.media.rendererName !== null && t.media.rendererName.match(/(youtube|facebook)/))) {
			if (t.media.rendererName !== null && t.media.rendererName.match(/(youtube|facebook)/)) {
				bigPlay.hide();
			}

			// show/hide big play button
			media.addEventListener('play', function () {
				bigPlay.hide();
				loading.hide();
				controls.find('.' + t.options.classPrefix + 'time-buffering').hide();
				error.hide();
			}, false);

			media.addEventListener('playing', function () {
				bigPlay.hide();
				loading.hide();
				controls.find('.' + t.options.classPrefix + 'time-buffering').hide();
				error.hide();
			}, false);

			media.addEventListener('seeking', function () {
				loading.show();
				controls.find('.' + t.options.classPrefix + 'time-buffering').show();
			}, false);

			media.addEventListener('seeked', function () {
				loading.hide();
				controls.find('.' + t.options.classPrefix + 'time-buffering').hide();
			}, false);

			media.addEventListener('pause', function () {
				bigPlay.show();
			}, false);

			media.addEventListener('waiting', function () {
				loading.show();
				controls.find('.' + t.options.classPrefix + 'time-buffering').show();
			}, false);

			// show/hide loading
			media.addEventListener('loadeddata', function () {
				// for some reason Chrome is firing this event
				//if (mejs.MediaFeatures.isChrome && media.getAttribute && media.getAttribute('preload') === 'none')
				//	return;

				loading.show();
				controls.find('.' + t.options.classPrefix + 'time-buffering').show();
				// Firing the 'canplay' event after a timeout which isn't getting fired on some Android 4.1 devices
				// (https://github.com/johndyer/mediaelement/issues/1305)
				if (_constants.IS_ANDROID) {
					media.canplayTimeout = _window2.default.setTimeout(function () {
						if (_document2.default.createEvent) {
							var evt = _document2.default.createEvent('HTMLEvents');
							evt.initEvent('canplay', true, true);
							return media.dispatchEvent(evt);
						}
					}, 300);
				}
			}, false);
			media.addEventListener('canplay', function () {
				loading.hide();
				controls.find('.' + t.options.classPrefix + 'time-buffering').hide();
				// Clear timeout inside 'loadeddata' to prevent 'canplay' from firing twice
				clearTimeout(media.canplayTimeout);
			}, false);

			// error handling
			media.addEventListener('error', function (e) {
				t._handleError(e);
				loading.hide();
				bigPlay.hide();
				error.show();
				error.find('.' + t.options.classPrefix + 'overlay-error').html(e.message);
			}, false);

			media.addEventListener('keydown', function (e) {
				t.onkeydown(player, media, e);
			}, false);
		}
	}, {
		key: 'buildkeyboard',
		value: function buildkeyboard(player, controls, layers, media) {

			var t = this;

			t.container.keydown(function () {
				t.keyboardAction = true;
			});

			// listen for key presses
			t.globalBind('keydown', function (event) {
				var $container = $(event.target).closest('.' + t.options.classPrefix + 'container');
				player.hasFocus = $container.length !== 0 && $container.attr('id') === player.$media.closest('.' + t.options.classPrefix + 'container').attr('id');
				return t.onkeydown(player, media, event);
			});

			// check if someone clicked outside a player region, then kill its focus
			t.globalBind('click', function (event) {
				player.hasFocus = $(event.target).closest('.' + t.options.classPrefix + 'container').length !== 0;
			});
		}
	}, {
		key: 'onkeydown',
		value: function onkeydown(player, media, e) {

			if (player.hasFocus && player.options.enableKeyboard) {
				// find a matching key
				for (var i = 0, il = player.options.keyActions.length; i < il; i++) {
					var keyAction = player.options.keyActions[i];

					for (var j = 0, jl = keyAction.keys.length; j < jl; j++) {
						if (e.keyCode === keyAction.keys[j]) {
							keyAction.action(player, media, e.keyCode, e);
							return false;
						}
					}
				}
			}

			return true;
		}
	}, {
		key: 'play',
		value: function play() {
			var t = this;

			// only load if the current time is 0 to ensure proper playing
			if (t.media.getCurrentTime() <= 0) {
				t.load();
			}
			t.media.play();
		}
	}, {
		key: 'pause',
		value: function pause() {
			try {
				this.media.pause();
			} catch (e) {}
		}
	}, {
		key: 'load',
		value: function load() {
			var t = this;

			if (!t.isLoaded) {
				t.media.load();
			}

			t.isLoaded = true;
		}
	}, {
		key: 'setMuted',
		value: function setMuted(muted) {
			this.media.setMuted(muted);
		}
	}, {
		key: 'setCurrentTime',
		value: function setCurrentTime(time) {
			this.media.setCurrentTime(time);
		}
	}, {
		key: 'getCurrentTime',
		value: function getCurrentTime() {
			return this.media.currentTime;
		}
	}, {
		key: 'setVolume',
		value: function setVolume(volume) {
			this.media.setVolume(volume);
		}
	}, {
		key: 'getVolume',
		value: function getVolume() {
			return this.media.volume;
		}
	}, {
		key: 'setSrc',
		value: function setSrc(src) {
			this.media.setSrc(src);
		}
	}, {
		key: 'remove',
		value: function remove() {

			var t = this,
			    rendererName = t.media.rendererName;

			// invoke features cleanup
			for (var featureIndex in t.options.features) {
				var feature = t.options.features[featureIndex];
				if (t['clean' + feature]) {
					try {
						t['clean' + feature](t);
					} catch (e) {
						// @todo: report control error
						console.error('error cleaning ' + feature, e);
					}
				}
			}

			// reset dimensions
			t.$node.css({
				width: t.$node.attr('width') || 'auto',
				height: t.$node.attr('height') || 'auto'
			});

			// grab video and put it back in place
			if (!t.isDynamic) {
				t.$media.prop('controls', true);
				// detach events from the video
				// @todo: detach event listeners better than this; also detach ONLY the events attached by this plugin!
				t.$node.attr('id', t.$node.attr('id').replace('_' + rendererName, ''));
				t.$node.clone().insertBefore(t.container).show();
				t.$node.remove();
			} else {
				t.$node.insertBefore(t.container);
			}

			t.media.remove();

			// Remove the player from the mejs.players object so that pauseOtherPlayers doesn't blow up when trying to
			// pause a non existent Flash API.
			delete _mejs2.default.players[t.id];

			if (_typeof(t.container) === 'object') {
				t.container.prev('.' + t.options.classPrefix + 'offscreen').remove();
				t.container.remove();
			}
			t.globalUnbind();
			delete t.node.player;
		}
	}]);

	return MediaElementPlayer;
}();

_window2.default.MediaElementPlayer = MediaElementPlayer;

exports.default = MediaElementPlayer;

// turn into plugin

(function ($) {

	if (typeof $ !== 'undefined') {
		$.fn.mediaelementplayer = function (options) {
			if (options === false) {
				this.each(function () {
					var player = $(this).data('mediaelementplayer');
					if (player) {
						player.remove();
					}
					$(this).removeData('mediaelementplayer');
				});
			} else {
				this.each(function () {
					$(this).data('mediaelementplayer', new MediaElementPlayer(this, options));
				});
			}
			return this;
		};

		$(_document2.default).ready(function () {
			// auto enable using JSON attribute
			$('.' + config.classPrefix + 'player').mediaelementplayer();
		});
	}
})(_mejs2.default.$);

},{"2":2,"27":27,"28":28,"29":29,"3":3,"32":32,"4":4,"5":5,"6":6}],17:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _dom = _dereq_(28);

var _media = _dereq_(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * DailyMotion renderer
 *
 * Uses <iframe> approach and uses DailyMotion API to manipulate it.
 * @see https://developer.dailymotion.com/player
 *
 */
var DailyMotionApi = {
	/**
  * @type {Boolean}
  */
	isSDKStarted: false,
	/**
  * @type {Boolean}
  */
	isSDKLoaded: false,
	/**
  * @type {Array}
  */
	iframeQueue: [],

	/**
  * Create a queue to prepare the creation of <iframe>
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	enqueueIframe: function enqueueIframe(settings) {

		if (DailyMotionApi.isLoaded) {
			DailyMotionApi.createIframe(settings);
		} else {
			DailyMotionApi.loadIframeApi();
			DailyMotionApi.iframeQueue.push(settings);
		}
	},

	/**
  * Load DailyMotion API script on the header of the document
  *
  */
	loadIframeApi: function loadIframeApi() {
		if (!DailyMotionApi.isSDKStarted) {
			var e = _document2.default.createElement('script');
			e.async = true;
			e.src = '//api.dmcdn.net/all.js';
			var s = _document2.default.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(e, s);
			DailyMotionApi.isSDKStarted = true;
		}
	},

	/**
  * Process queue of DailyMotion <iframe> element creation
  *
  */
	apiReady: function apiReady() {

		DailyMotionApi.isLoaded = true;
		DailyMotionApi.isSDKLoaded = true;

		while (DailyMotionApi.iframeQueue.length > 0) {
			var settings = DailyMotionApi.iframeQueue.pop();
			DailyMotionApi.createIframe(settings);
		}
	},

	/**
  * Create a new instance of DailyMotion API player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	createIframe: function createIframe(settings) {

		var player = DM.player(settings.container, {
			height: settings.height || '100%',
			width: settings.width || '100%',
			video: settings.videoId,
			params: Object.assign({ api: true }, settings.params),
			origin: location.host
		});

		player.addEventListener('apiready', function () {
			_window2.default['__ready__' + settings.id](player, { paused: true, ended: false });
		});
	},

	/**
  * Extract ID from DailyMotion's URL to be loaded through API
  * Valid URL format(s):
  * - http://www.dailymotion.com/embed/video/x35yawy
  * - http://dai.ly/x35yawy
  *
  * @param {String} url
  * @return {String}
  */
	getDailyMotionId: function getDailyMotionId(url) {
		var parts = url.split('/'),
		    lastPart = parts[parts.length - 1],
		    dashParts = lastPart.split('_');

		return dashParts[0];
	}
};

var DailyMotionIframeRenderer = {
	name: 'dailymotion_iframe',

	options: {
		prefix: 'dailymotion_iframe',

		dailymotion: {
			width: '100%',
			height: '100%',
			params: {
				autoplay: false,
				chromeless: 1,
				info: 0,
				logo: 0,
				related: 0
			}
		}
	},

	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return ['video/dailymotion', 'video/x-dailymotion'].includes(type);
	},

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		var dm = {};

		dm.options = options;
		dm.id = mediaElement.id + '_' + options.prefix;
		dm.mediaElement = mediaElement;

		var apiStack = [],
		    dmPlayerReady = false,
		    dmPlayer = null,
		    dmIframe = null,
		    events = void 0,
		    i = void 0,
		    il = void 0;

		// wrappers for get/set
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			// add to flash state that we will store

			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			dm['get' + capName] = function () {
				if (dmPlayer !== null) {
					var value = null;

					// figure out how to get dm dta here

					var _ret = function () {
						switch (propName) {
							case 'currentTime':
								return {
									v: dmPlayer.currentTime
								};

							case 'duration':
								return {
									v: isNaN(dmPlayer.duration) ? 0 : dmPlayer.duration
								};

							case 'volume':
								return {
									v: dmPlayer.volume
								};

							case 'paused':
								return {
									v: dmPlayer.paused
								};

							case 'ended':
								return {
									v: dmPlayer.ended
								};

							case 'muted':
								return {
									v: dmPlayer.muted
								};

							case 'buffered':
								var percentLoaded = dmPlayer.bufferedTime,
								    duration = dmPlayer.duration;
								return {
									v: {
										start: function start() {
											return 0;
										},
										end: function end() {
											return percentLoaded / duration;
										},
										length: 1
									}
								};
							case 'src':
								return {
									v: mediaElement.originalNode.getAttribute('src')
								};
						}
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
					return value;
				} else {
					return null;
				}
			};

			dm['set' + capName] = function (value) {
				if (dmPlayer !== null) {

					switch (propName) {

						case 'src':
							var url = typeof value === 'string' ? value : value[0].src;

							dmPlayer.load(DailyMotionApi.getDailyMotionId(url));
							break;

						case 'currentTime':
							dmPlayer.seek(value);
							break;

						case 'muted':
							if (value) {
								dmPlayer.setMuted(true);
							} else {
								dmPlayer.setMuted(false);
							}
							setTimeout(function () {
								var event = (0, _dom.createEvent)('volumechange', dm);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'volume':
							dmPlayer.setVolume(value);
							setTimeout(function () {
								var event = (0, _dom.createEvent)('volumechange', dm);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						default:
							
					}
				} else {
					// store for after "READY" event fires
					apiStack.push({ type: 'set', propName: propName, value: value });
				}
			};
		};

		for (i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		// add wrappers for native methods
		var methods = _mejs2.default.html5media.methods,
		    assignMethods = function assignMethods(methodName) {

			// run the method on the native HTMLMediaElement
			dm[methodName] = function () {
				if (dmPlayer !== null) {

					// DO method
					switch (methodName) {
						case 'play':
							return dmPlayer.play();
						case 'pause':
							return dmPlayer.pause();
						case 'load':
							return null;

					}
				} else {
					apiStack.push({ type: 'call', methodName: methodName });
				}
			};
		};

		for (i = 0, il = methods.length; i < il; i++) {
			assignMethods(methods[i]);
		}

		// Initial method to register all DailyMotion events when initializing <iframe>
		_window2.default['__ready__' + dm.id] = function (_dmPlayer) {

			dmPlayerReady = true;
			mediaElement.dmPlayer = dmPlayer = _dmPlayer;

			// do call stack
			if (apiStack.length) {
				for (i = 0, il = apiStack.length; i < il; i++) {

					var stackItem = apiStack[i];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						dm['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						dm[stackItem.methodName]();
					}
				}
			}

			dmIframe = _document2.default.getElementById(dm.id);

			// a few more events
			events = ['mouseover', 'mouseout'];
			var assignEvent = function assignEvent(e) {
				var event = (0, _dom.createEvent)(e.type, dm);
				mediaElement.dispatchEvent(event);
			};

			for (var j in events) {
				(0, _dom.addEvent)(dmIframe, events[j], assignEvent);
			}

			// BUBBLE EVENTS up
			events = _mejs2.default.html5media.events;
			events = events.concat(['click', 'mouseover', 'mouseout']);
			var assignNativeEvents = function assignNativeEvents(eventName) {

				// Deprecated event; not consider it
				if (eventName !== 'ended') {

					dmPlayer.addEventListener(eventName, function (e) {
						var event = (0, _dom.createEvent)(e.type, dmPlayer);
						mediaElement.dispatchEvent(event);
					});
				}
			};

			for (i = 0, il = events.length; i < il; i++) {
				assignNativeEvents(events[i]);
			}

			// Custom DailyMotion events
			dmPlayer.addEventListener('ad_start', function () {
				var event = (0, _dom.createEvent)('play', dmPlayer);
				mediaElement.dispatchEvent(event);

				event = (0, _dom.createEvent)('progress', dmPlayer);
				mediaElement.dispatchEvent(event);

				event = (0, _dom.createEvent)('timeupdate', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('ad_timeupdate', function () {
				var event = (0, _dom.createEvent)('timeupdate', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('ad_pause', function () {
				var event = (0, _dom.createEvent)('pause', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('ad_end', function () {
				var event = (0, _dom.createEvent)('ended', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('video_start', function () {
				var event = (0, _dom.createEvent)('play', dmPlayer);
				mediaElement.dispatchEvent(event);

				event = (0, _dom.createEvent)('timeupdate', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('video_end', function () {
				var event = (0, _dom.createEvent)('ended', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('progress', function () {
				var event = (0, _dom.createEvent)('timeupdate', dmPlayer);
				mediaElement.dispatchEvent(event);
			});
			dmPlayer.addEventListener('durationchange', function () {
				var event = (0, _dom.createEvent)('timeupdate', dmPlayer);
				mediaElement.dispatchEvent(event);
			});

			// give initial events
			var initEvents = ['rendererready', 'loadeddata', 'loadedmetadata', 'canplay'];

			for (i = 0, il = initEvents.length; i < il; i++) {
				var event = (0, _dom.createEvent)(initEvents[i], dm);
				mediaElement.dispatchEvent(event);
			}
		};

		var dmContainer = _document2.default.createElement('div');
		dmContainer.id = dm.id;
		mediaElement.appendChild(dmContainer);
		if (mediaElement.originalNode) {
			dmContainer.style.width = mediaElement.originalNode.style.width;
			dmContainer.style.height = mediaElement.originalNode.style.height;
		}
		mediaElement.originalNode.style.display = 'none';

		var videoId = DailyMotionApi.getDailyMotionId(mediaFiles[0].src),
		    dmSettings = Object.assign({
			id: dm.id,
			container: dmContainer,
			videoId: videoId,
			autoplay: !!mediaElement.originalNode.getAttribute('autoplay')
		}, dm.options.dailymotion);

		DailyMotionApi.enqueueIframe(dmSettings);

		dm.hide = function () {
			dm.stopInterval();
			dm.pause();
			if (dmIframe) {
				dmIframe.style.display = 'none';
			}
		};
		dm.show = function () {
			if (dmIframe) {
				dmIframe.style.display = '';
			}
		};
		dm.setSize = function (width, height) {
			dmIframe.width = width;
			dmIframe.height = height;
		};
		dm.destroy = function () {
			dmPlayer.destroy();
		};
		dm.interval = null;

		dm.startInterval = function () {
			dm.interval = setInterval(function () {
				DailyMotionApi.sendEvent(dm.id, dmPlayer, 'timeupdate', {
					paused: false,
					ended: false
				});
			}, 250);
		};
		dm.stopInterval = function () {
			if (dm.interval) {
				clearInterval(dm.interval);
			}
		};

		return dm;
	}
};

/*
 * Register DailyMotion event globally
 *
 */
_media.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('//dailymotion.com') || url.includes('www.dailymotion.com') || url.includes('//dai.ly') ? 'video/x-dailymotion' : null;
});

_window2.default.dmAsyncInit = function () {
	DailyMotionApi.apiReady();
};

_renderer.renderer.add(DailyMotionIframeRenderer);

},{"2":2,"28":28,"3":3,"30":30,"6":6,"7":7}],18:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _dom = _dereq_(28);

var _media = _dereq_(30);

var _constants = _dereq_(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Native M(PEG)-Dash renderer
 *
 * Uses dash.js, a reference client implementation for the playback of M(PEG)-DASH via Javascript and compliant browsers.
 * It relies on HTML5 video and MediaSource Extensions for playback.
 * This renderer integrates new events associated with mpd files.
 * @see https://github.com/Dash-Industry-Forum/dash.js
 *
 */
var NativeDash = {
	/**
  * @type {Boolean}
  */
	isMediaLoaded: false,
	/**
  * @type {Array}
  */
	creationQueue: [],

	/**
  * Create a queue to prepare the loading of an DASH source
  *
  * @param {Object} settings - an object with settings needed to load an DASH player instance
  */
	prepareSettings: function prepareSettings(settings) {
		if (NativeDash.isLoaded) {
			NativeDash.createInstance(settings);
		} else {
			NativeDash.loadScript(settings);
			NativeDash.creationQueue.push(settings);
		}
	},

	/**
  * Load dash.mediaplayer.js script on the header of the document
  *
  * @param {Object} settings - an object with settings needed to load an DASH player instance
  */
	loadScript: function loadScript(settings) {
		if (!NativeDash.isScriptLoaded) {

			if (typeof dashjs !== 'undefined') {
				NativeDash.createInstance(settings);
			} else {
				(function () {

					settings.options.path = typeof settings.options.path === 'string' ? settings.options.path : '//cdn.dashjs.org/latest/dash.mediaplayer.min.js';

					var script = _document2.default.createElement('script'),
					    firstScriptTag = _document2.default.getElementsByTagName('script')[0],
					    done = false;

					script.src = settings.options.path;

					// Attach handlers for all browsers
					script.onload = script.onreadystatechange = function () {
						if (!done && (!this.readyState || this.readyState === undefined || this.readyState === 'loaded' || this.readyState === 'complete')) {
							done = true;
							NativeDash.mediaReady();
							script.onload = script.onreadystatechange = null;
						}
					};

					firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
				})();
			}
			NativeDash.isScriptLoaded = true;
		}
	},

	/**
  * Process queue of DASH player creation
  *
  */
	mediaReady: function mediaReady() {

		NativeDash.isLoaded = true;
		NativeDash.isScriptLoaded = true;

		while (NativeDash.creationQueue.length > 0) {
			var settings = NativeDash.creationQueue.pop();
			NativeDash.createInstance(settings);
		}
	},

	/**
  * Create a new instance of DASH player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to instantiate DASH object
  */
	createInstance: function createInstance(settings) {

		var player = dashjs.MediaPlayer().create();
		_window2.default['__ready__' + settings.id](player);
	}
};

var DashNativeRenderer = {
	name: 'native_dash',

	options: {
		prefix: 'native_dash',
		dash: {
			// Special config: used to set the local path/URL of dash.js mediaplayer library
			path: '//cdn.dashjs.org/latest/dash.mediaplayer.min.js',
			debug: false
		}
	},
	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return _constants.HAS_MSE && ['application/dash+xml'].includes(type);
	},

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		var node = null,
		    originalNode = mediaElement.originalNode,
		    id = mediaElement.id + '_' + options.prefix,
		    dashPlayer = void 0,
		    stack = {},
		    i = void 0,
		    il = void 0;

		node = originalNode.cloneNode(true);
		options = Object.assign(options, mediaElement.options);

		// WRAPPERS for PROPs
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {
			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			node['get' + capName] = function () {
				return dashPlayer !== null ? node[propName] : null;
			};

			node['set' + capName] = function (value) {
				if (dashPlayer !== null) {
					if (propName === 'src') {

						dashPlayer.attachSource(value);

						if (node.getAttribute('autoplay')) {
							node.play();
						}
					}

					node[propName] = value;
				} else {
					// store for after "READY" event fires
					stack.push({ type: 'set', propName: propName, value: value });
				}
			};
		};

		for (i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		// Initial method to register all M-Dash events
		_window2.default['__ready__' + id] = function (_dashPlayer) {

			mediaElement.dashPlayer = dashPlayer = _dashPlayer;

			// By default, console log is off
			dashPlayer.getDebug().setLogToBrowserConsole(options.dash.debug);

			// do call stack
			if (stack.length) {
				for (i = 0, il = stack.length; i < il; i++) {

					var stackItem = stack[i];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						node['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						node[stackItem.methodName]();
					}
				}
			}

			// BUBBLE EVENTS
			var events = _mejs2.default.html5media.events,
			    dashEvents = dashjs.MediaPlayer.events,
			    assignEvents = function assignEvents(eventName) {

				if (eventName === 'loadedmetadata') {
					dashPlayer.initialize(node, node.src, false);
				}

				node.addEventListener(eventName, function (e) {
					var event = _document2.default.createEvent('HTMLEvents');
					event.initEvent(e.type, e.bubbles, e.cancelable);
					// @todo Check this
					// event.srcElement = e.srcElement;
					// event.target = e.srcElement;

					mediaElement.dispatchEvent(event);
				});
			};

			events = events.concat(['click', 'mouseover', 'mouseout']);

			for (i = 0, il = events.length; i < il; i++) {
				assignEvents(events[i]);
			}

			/**
    * Custom M(PEG)-DASH events
    *
    * These events can be attached to the original node using addEventListener and the name of the event,
    * not using dashjs.MediaPlayer.events object
    * @see http://cdn.dashjs.org/latest/jsdoc/MediaPlayerEvents.html
    */
			var assignMdashEvents = function assignMdashEvents(e) {
				var event = (0, _dom.createEvent)(e.type, node);
				event.data = e;
				mediaElement.dispatchEvent(event);

				if (e.type.toLowerCase() === 'error') {
					console.error(e);
				}
			};

			for (var eventType in dashEvents) {
				if (dashEvents.hasOwnProperty(eventType)) {
					dashPlayer.on(dashEvents[eventType], assignMdashEvents);
				}
			}
		};

		if (mediaFiles && mediaFiles.length > 0) {
			for (i = 0, il = mediaFiles.length; i < il; i++) {
				if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[i].type)) {
					node.setAttribute('src', mediaFiles[i].src);
					break;
				}
			}
		}

		node.setAttribute('id', id);

		originalNode.parentNode.insertBefore(node, originalNode);
		originalNode.removeAttribute('autoplay');
		originalNode.style.display = 'none';

		NativeDash.prepareSettings({
			options: options.dash,
			id: id
		});

		// HELPER METHODS
		node.setSize = function (width, height) {
			node.style.width = width + 'px';
			node.style.height = height + 'px';

			return node;
		};

		node.hide = function () {
			node.pause();
			node.style.display = 'none';
			return node;
		};

		node.show = function () {
			node.style.display = '';
			return node;
		};

		var event = (0, _dom.createEvent)('rendererready', node);
		mediaElement.dispatchEvent(event);

		return node;
	}
};

/**
 * Register Native M(PEG)-Dash type based on URL structure
 *
 */
_media.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('.mpd') ? 'application/dash+xml' : null;
});

_renderer.renderer.add(DashNativeRenderer);

},{"2":2,"27":27,"28":28,"3":3,"30":30,"6":6,"7":7}],19:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _general = _dereq_(29);

var _dom = _dereq_(28);

var _media = _dereq_(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Facebook renderer
 *
 * It creates an <iframe> from a <div> with specific configuration.
 * @see https://developers.facebook.com/docs/plugins/embedded-video-player
 */
var FacebookRenderer = {
	name: 'facebook',

	options: {
		prefix: 'facebook',
		facebook: {
			appId: '{your-app-id}',
			xfbml: true,
			version: 'v2.6'
		}
	},

	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return ['video/facebook', 'video/x-facebook'].includes(type);
	},

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		var fbWrapper = {},
		    fbApi = null,
		    fbDiv = null,
		    apiStack = [],
		    paused = true,
		    ended = false,
		    hasStartedPlaying = false,
		    src = '',
		    eventHandler = {},
		    i = void 0,
		    il = void 0;

		options = Object.assign(options, mediaElement.options);
		fbWrapper.options = options;
		fbWrapper.id = mediaElement.id + '_' + options.prefix;
		fbWrapper.mediaElement = mediaElement;

		// wrappers for get/set
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			fbWrapper['get' + capName] = function () {

				if (fbApi !== null) {
					var value = null;

					// figure out how to get youtube dta here
					switch (propName) {
						case 'currentTime':
							return fbApi.getCurrentPosition();

						case 'duration':
							return fbApi.getDuration();

						case 'volume':
							return fbApi.getVolume();

						case 'paused':
							return paused;

						case 'ended':
							return ended;

						case 'muted':
							return fbApi.isMuted();

						case 'buffered':
							return {
								start: function start() {
									return 0;
								},
								end: function end() {
									return 0;
								},
								length: 1
							};
						case 'src':
							return src;
					}

					return value;
				} else {
					return null;
				}
			};

			fbWrapper['set' + capName] = function (value) {

				if (fbApi !== null) {

					switch (propName) {

						case 'src':
							var url = typeof value === 'string' ? value : value[0].src;

							// Only way is to destroy instance and all the events fired,
							// and create new one
							fbDiv.parentNode.removeChild(fbDiv);
							createFacebookEmbed(url, options.facebook);

							// This method reloads video on-demand
							FB.XFBML.parse();

							break;

						case 'currentTime':
							fbApi.seek(value);
							break;

						case 'muted':
							if (value) {
								fbApi.mute();
							} else {
								fbApi.unmute();
							}
							setTimeout(function () {
								var event = (0, _dom.createEvent)('volumechange', fbWrapper);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'volume':
							fbApi.setVolume(value);
							setTimeout(function () {
								var event = (0, _dom.createEvent)('volumechange', fbWrapper);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						default:
							
					}
				} else {
					// store for after "READY" event fires
					apiStack.push({ type: 'set', propName: propName, value: value });
				}
			};
		};

		for (i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		// add wrappers for native methods
		var methods = _mejs2.default.html5media.methods,
		    assignMethods = function assignMethods(methodName) {

			// run the method on the native HTMLMediaElement
			fbWrapper[methodName] = function () {

				if (fbApi !== null) {

					// DO method
					switch (methodName) {
						case 'play':
							return fbApi.play();
						case 'pause':
							return fbApi.pause();
						case 'load':
							return null;

					}
				} else {
					apiStack.push({ type: 'call', methodName: methodName });
				}
			};
		};

		for (i = 0, il = methods.length; i < il; i++) {
			assignMethods(methods[i]);
		}

		/**
   * Dispatch a list of events
   *
   * @private
   * @param {Array} events
   */
		function sendEvents(events) {
			for (var _i = 0, _il = events.length; _i < _il; _i++) {
				var event = _mejs2.default.Utils.createEvent(events[_i], fbWrapper);
				mediaElement.dispatchEvent(event);
			}
		}

		/**
   * Create a new Facebook player and attach all its events
   *
   * This method creates a <div> element that, once the API is available, will generate an <iframe>.
   * Valid URL format(s):
   *  - https://www.facebook.com/johndyer/videos/10107816243681884/
   *
   * @param {String} url
   * @param {Object} config
   */
		function createFacebookEmbed(url, config) {

			src = url;

			fbDiv = _document2.default.createElement('div');
			fbDiv.id = fbWrapper.id;
			fbDiv.className = "fb-video";
			fbDiv.setAttribute("data-href", url);
			fbDiv.setAttribute("data-allowfullscreen", "true");
			fbDiv.setAttribute("data-controls", "false");

			mediaElement.originalNode.parentNode.insertBefore(fbDiv, mediaElement.originalNode);
			mediaElement.originalNode.style.display = 'none';

			/*
    * Register Facebook API event globally
    *
    */
			_window2.default.fbAsyncInit = function () {

				FB.init(config);

				FB.Event.subscribe('xfbml.ready', function (msg) {

					if (msg.type === 'video') {
						(function () {

							fbApi = msg.instance;

							// Set proper size since player dimensions are unknown before this event
							var fbIframe = fbDiv.getElementsByTagName('iframe')[0],
							    width = parseInt(_window2.default.getComputedStyle(fbIframe, null).width),
							    height = parseInt(fbIframe.style.height);

							fbWrapper.setSize(width, height);

							sendEvents(['mouseover', 'mouseout']);

							// remove previous listeners
							var fbEvents = ['startedPlaying', 'paused', 'finishedPlaying', 'startedBuffering', 'finishedBuffering'];
							for (i = 0, il = fbEvents.length; i < il; i++) {
								var event = fbEvents[i],
								    handler = eventHandler[event];
								if (handler !== undefined && handler !== null && !(0, _general.isObjectEmpty)(handler) && typeof handler.removeListener === 'function') {
									handler.removeListener(event);
								}
							}

							// do call stack
							if (apiStack.length) {
								for (i = 0, il = apiStack.length; i < il; i++) {

									var stackItem = apiStack[i];

									if (stackItem.type === 'set') {
										var propName = stackItem.propName,
										    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

										fbWrapper['set' + capName](stackItem.value);
									} else if (stackItem.type === 'call') {
										fbWrapper[stackItem.methodName]();
									}
								}
							}

							sendEvents(['rendererready', 'ready', 'loadeddata', 'canplay', 'progress']);
							sendEvents(['loadedmetadata', 'timeupdate', 'progress']);

							var timer = void 0;

							// Custom Facebook events
							eventHandler.startedPlaying = fbApi.subscribe('startedPlaying', function () {
								if (!hasStartedPlaying) {
									hasStartedPlaying = true;
								}
								paused = false;
								ended = false;
								sendEvents(['play', 'playing', 'timeupdate']);

								// Workaround to update progress bar
								timer = setInterval(function () {
									fbApi.getCurrentPosition();
									sendEvents(['timeupdate']);
								}, 250);
							});
							eventHandler.paused = fbApi.subscribe('paused', function () {
								paused = true;
								ended = false;
								sendEvents(['paused']);
							});
							eventHandler.finishedPlaying = fbApi.subscribe('finishedPlaying', function () {
								paused = true;
								ended = true;

								// Workaround to update progress bar one last time and trigger ended event
								timer = setInterval(function () {
									fbApi.getCurrentPosition();
									sendEvents(['timeupdate', 'ended']);
								}, 250);

								clearInterval(timer);
								timer = null;
							});
							eventHandler.startedBuffering = fbApi.subscribe('startedBuffering', function () {
								sendEvents(['progress', 'timeupdate']);
							});
							eventHandler.finishedBuffering = fbApi.subscribe('finishedBuffering', function () {
								sendEvents(['progress', 'timeupdate']);
							});
						})();
					}
				});
			};

			(function (d, s, id) {
				var js = void 0;
				var fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {
					return;
				}
				js = d.createElement(s);
				js.id = id;
				js.src = '//connect.facebook.net/en_US/sdk.js';
				fjs.parentNode.insertBefore(js, fjs);
			})(_document2.default, 'script', 'facebook-jssdk');
		}

		if (mediaFiles.length > 0) {
			createFacebookEmbed(mediaFiles[0].src, fbWrapper.options.facebook);
		}

		fbWrapper.hide = function () {
			fbWrapper.stopInterval();
			fbWrapper.pause();
			if (fbDiv) {
				fbDiv.style.display = 'none';
			}
		};
		fbWrapper.show = function () {
			if (fbDiv) {
				fbDiv.style.display = '';
			}
		};
		fbWrapper.setSize = function (width, height) {
			if (fbApi !== null && !isNaN(width) && !isNaN(height)) {
				fbDiv.setAttribute('width', width);
				fbDiv.setAttribute('height', height);
			}
		};
		fbWrapper.destroy = function () {};
		fbWrapper.interval = null;

		fbWrapper.startInterval = function () {
			// create timer
			fbWrapper.interval = setInterval(function () {
				var event = (0, _dom.createEvent)('timeupdate', fbWrapper);
				mediaElement.dispatchEvent(event);
			}, 250);
		};
		fbWrapper.stopInterval = function () {
			if (fbWrapper.interval) {
				clearInterval(fbWrapper.interval);
			}
		};

		return fbWrapper;
	}
};

/**
 * Register Facebook type based on URL structure
 *
 */
_media.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('//www.facebook') ? 'video/x-facebook' : null;
});

_renderer.renderer.add(FacebookRenderer);

},{"2":2,"28":28,"29":29,"3":3,"30":30,"6":6,"7":7}],20:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PluginDetector = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _renderer = _dereq_(7);

var _dom = _dereq_(28);

var _constants = _dereq_(27);

var _media = _dereq_(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Shim that falls back to Flash if a media type is not supported.
 *
 * Any format not supported natively, including, RTMP, FLV, HLS and M(PEG)-DASH (if browser does not support MSE),
 * will play using Flash.
 */

/**
 * Core detector, plugins are added below
 *
 */
var PluginDetector = exports.PluginDetector = {
	/**
  * Cached version numbers
  * @type {Array}
  */
	plugins: [],

	/**
  * Test a plugin version number
  * @param {String} plugin - In this scenario 'flash' will be tested
  * @param {Array} v - An array containing the version up to 3 numbers (major, minor, revision)
  * @return {Boolean}
  */
	hasPluginVersion: function hasPluginVersion(plugin, v) {
		var pv = PluginDetector.plugins[plugin];
		v[1] = v[1] || 0;
		v[2] = v[2] || 0;
		return pv[0] > v[0] || pv[0] === v[0] && pv[1] > v[1] || pv[0] === v[0] && pv[1] === v[1] && pv[2] >= v[2];
	},

	/**
  * Detect plugin and store its version number
  *
  * @see PluginDetector.detectPlugin
  * @param {String} p
  * @param {String} pluginName
  * @param {String} mimeType
  * @param {String} activeX
  * @param {Function} axDetect
  */
	addPlugin: function addPlugin(p, pluginName, mimeType, activeX, axDetect) {
		PluginDetector.plugins[p] = PluginDetector.detectPlugin(pluginName, mimeType, activeX, axDetect);
	},

	/**
  * Obtain version number from the mime-type (all but IE) or ActiveX (IE)
  *
  * @param {String} pluginName
  * @param {String} mimeType
  * @param {String} activeX
  * @param {Function} axDetect
  * @return {int[]}
  */
	detectPlugin: function detectPlugin(pluginName, mimeType, activeX, axDetect) {

		var version = [0, 0, 0],
		    description = void 0,
		    ax = void 0;

		// Firefox, Webkit, Opera
		if (_constants.NAV.plugins !== undefined && _typeof(_constants.NAV.plugins[pluginName]) === 'object') {
			description = _constants.NAV.plugins[pluginName].description;
			if (description && !(typeof _constants.NAV.mimeTypes !== 'undefined' && _constants.NAV.mimeTypes[mimeType] && !_constants.NAV.mimeTypes[mimeType].enabledPlugin)) {
				version = description.replace(pluginName, '').replace(/^\s+/, '').replace(/\sr/gi, '.').split('.');
				for (var i = 0; i < version.length; i++) {
					version[i] = parseInt(version[i].match(/\d+/), 10);
				}
			}
			// Internet Explorer / ActiveX
		} else if (_window2.default.ActiveXObject !== undefined) {
			try {
				ax = new ActiveXObject(activeX);
				if (ax) {
					version = axDetect(ax);
				}
			} catch (e) {}
		}
		return version;
	}
};

/**
 * Add Flash detection
 *
 */
PluginDetector.addPlugin('flash', 'Shockwave Flash', 'application/x-shockwave-flash', 'ShockwaveFlash.ShockwaveFlash', function (ax) {
	// adapted from SWFObject
	var version = [],
	    d = ax.GetVariable("$version");
	if (d) {
		d = d.split(" ")[1].split(",");
		version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
	}
	return version;
});

var FlashMediaElementRenderer = {

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		var flash = {},
		    i = void 0,
		    il = void 0;

		// store main variable
		flash.options = options;
		flash.id = mediaElement.id + '_' + flash.options.prefix;
		flash.mediaElement = mediaElement;

		// insert data
		flash.flashState = {};
		flash.flashApi = null;
		flash.flashApiStack = [];

		// mediaElements for get/set
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			// add to flash state that we will store
			flash.flashState[propName] = null;

			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			flash['get' + capName] = function () {

				if (flash.flashApi !== null) {

					if (flash.flashApi['get_' + propName] !== undefined) {
						var _ret = function () {
							var value = flash.flashApi['get_' + propName]();

							// special case for buffered to conform to HTML5's newest
							if (propName === 'buffered') {
								return {
									v: {
										start: function start() {
											return 0;
										},
										end: function end() {
											return value;
										},
										length: 1
									}
								};
							}

							return {
								v: value
							};
						}();

						if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
					} else {
						return null;
					}
				} else {
					return null;
				}
			};

			flash['set' + capName] = function (value) {
				if (propName === 'src') {
					value = (0, _media.absolutizeUrl)(value);
				}

				// send value to Flash
				if (flash.flashApi !== null && flash.flashApi['set_' + propName] !== undefined) {
					flash.flashApi['set_' + propName](value);
				} else {
					// store for after "READY" event fires
					flash.flashApiStack.push({
						type: 'set',
						propName: propName,
						value: value
					});
				}
			};
		};

		for (i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		// add mediaElements for native methods
		var methods = _mejs2.default.html5media.methods,
		    assignMethods = function assignMethods(methodName) {

			// run the method on the native HTMLMediaElement
			flash[methodName] = function () {

				if (flash.flashApi !== null) {

					// send call up to Flash ExternalInterface API
					if (flash.flashApi['fire_' + methodName]) {
						try {
							flash.flashApi['fire_' + methodName]();
						} catch (e) {
							
						}
					} else {
						
					}
				} else {
					// store for after "READY" event fires
					flash.flashApiStack.push({
						type: 'call',
						methodName: methodName
					});
				}
			};
		};
		methods.push('stop');
		for (i = 0, il = methods.length; i < il; i++) {
			assignMethods(methods[i]);
		}

		// add a ready method that Flash can call to
		_window2.default['__ready__' + flash.id] = function () {

			flash.flashReady = true;
			flash.flashApi = _document2.default.getElementById('__' + flash.id);

			var event = (0, _dom.createEvent)('rendererready', flash);
			mediaElement.dispatchEvent(event);

			// do call stack
			if (flash.flashApiStack.length) {
				for (var _i = 0, _il = flash.flashApiStack.length; _i < _il; _i++) {

					var stackItem = flash.flashApiStack[_i];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						flash['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						flash[stackItem.methodName]();
					}
				}
			}
		};

		_window2.default['__event__' + flash.id] = function (eventName, message) {

			var event = (0, _dom.createEvent)(eventName, flash);
			event.message = message || '';

			// send event from Flash up to the mediaElement
			flash.mediaElement.dispatchEvent(event);
		};

		// insert Flash object
		flash.flashWrapper = _document2.default.createElement('div');

		var autoplay = !!mediaElement.getAttribute('autoplay'),
		    flashVars = ['uid=' + flash.id, 'autoplay=' + autoplay],
		    isVideo = mediaElement.originalNode !== null && mediaElement.originalNode.tagName.toLowerCase() === 'video',
		    flashHeight = isVideo ? mediaElement.originalNode.height : 1,
		    flashWidth = isVideo ? mediaElement.originalNode.width : 1;

		if (flash.options.enablePseudoStreaming === true) {
			flashVars.push('pseudostreamstart=' + flash.options.pseudoStreamingStartQueryParam);
			flashVars.push('pseudostreamtype=' + flash.options.pseudoStreamingType);
		}

		mediaElement.appendChild(flash.flashWrapper);

		if (isVideo && mediaElement.originalNode !== null) {
			mediaElement.originalNode.style.display = 'none';
		}

		var settings = [];

		if (_constants.IS_IE) {
			var specialIEContainer = _document2.default.createElement('div');
			flash.flashWrapper.appendChild(specialIEContainer);

			settings = ['classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"', 'codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"', 'id="__' + flash.id + '"', 'width="' + flashWidth + '"', 'height="' + flashHeight + '"'];

			if (!isVideo) {
				settings.push('style="clip: rect(0 0 0 0); position: absolute;"');
			}

			specialIEContainer.outerHTML = '<object ' + settings.join(' ') + '>' + ('<param name="movie" value="' + flash.options.pluginPath + flash.options.filename + '?x=' + new Date() + '" />') + ('<param name="flashvars" value="' + flashVars.join('&amp;') + '" />') + '<param name="quality" value="high" />' + '<param name="bgcolor" value="#000000" />' + '<param name="wmode" value="transparent" />' + '<param name="allowScriptAccess" value="always" />' + '<param name="allowFullScreen" value="true" />' + ('<div>' + _i18n2.default.t('mejs.install-flash') + '</div>') + '</object>';
		} else {

			settings = ['id="__' + flash.id + '"', 'name="__' + flash.id + '"', 'play="true"', 'loop="false"', 'quality="high"', 'bgcolor="#000000"', 'wmode="transparent"', 'allowScriptAccess="always"', 'allowFullScreen="true"', 'type="application/x-shockwave-flash"', 'pluginspage="//www.macromedia.com/go/getflashplayer"', 'src="' + flash.options.pluginPath + flash.options.filename + '"', 'flashvars="' + flashVars.join('&') + '"', 'width="' + flashWidth + '"', 'height="' + flashHeight + '"'];

			if (!isVideo) {
				settings.push('style="clip: rect(0 0 0 0); position: absolute;"');
			}

			flash.flashWrapper.innerHTML = '<embed ' + settings.join(' ') + '>';
		}

		flash.flashNode = flash.flashWrapper.lastChild;

		flash.hide = function () {
			if (isVideo) {
				flash.flashNode.style.position = 'absolute';
				flash.flashNode.style.width = '1px';
				flash.flashNode.style.height = '1px';
				try {
					flash.flashNode.style.clip = 'rect(0 0 0 0);';
				} catch (e) {}
			}
		};
		flash.show = function () {
			if (isVideo) {
				flash.flashNode.style.position = '';
				flash.flashNode.style.width = '';
				flash.flashNode.style.height = '';
				try {
					flash.flashNode.style.clip = '';
				} catch (e) {}
			}
		};
		flash.setSize = function (width, height) {
			flash.flashNode.style.width = width + 'px';
			flash.flashNode.style.height = height + 'px';

			if (flash.flashApi !== null) {
				flash.flashApi.fire_setSize(width, height);
			}
		};

		if (mediaFiles && mediaFiles.length > 0) {
			for (i = 0, il = mediaFiles.length; i < il; i++) {
				if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[i].type)) {
					flash.setSrc(mediaFiles[i].src);
					flash.load();
					break;
				}
			}
		}

		return flash;
	}
};

var hasFlash = PluginDetector.hasPluginVersion('flash', [10, 0, 0]);

if (hasFlash) {

	/**
  * Register media type based on URL structure if Flash is detected
  *
  */
	_media.typeChecks.push(function (url) {

		url = url.toLowerCase();

		if (url.startsWith('rtmp')) {
			if (url.includes('.mp3')) {
				return 'audio/rtmp';
			} else {
				return 'video/rtmp';
			}
		} else if (url.includes('.oga') || url.includes('.ogg')) {
			return 'audio/ogg';
		} else if (!_constants.HAS_MSE && !_constants.SUPPORTS_NATIVE_HLS && url.includes('.m3u8')) {
			return 'application/x-mpegURL';
		} else if (!_constants.HAS_MSE && url.includes('.mpd')) {
			return 'application/dash+xml';
		} else {
			return null;
		}
	});

	// VIDEO
	var FlashMediaElementVideoRenderer = {
		name: 'flash_video',

		options: {
			prefix: 'flash_video',
			filename: 'mediaelement-flash-video.swf',
			enablePseudoStreaming: false,
			// start query parameter sent to server for pseudo-streaming
			pseudoStreamingStartQueryParam: 'start',
			// pseudo streaming type: use `time` for time based seeking (MP4) or `byte` for file byte position (FLV)
			pseudoStreamingType: 'byte'
		},
		/**
   * Determine if a specific element type can be played with this render
   *
   * @param {String} type
   * @return {Boolean}
   */
		canPlayType: function canPlayType(type) {
			return hasFlash && ['video/mp4', 'video/flv', 'video/rtmp', 'audio/rtmp', 'rtmp/mp4', 'audio/mp4'].includes(type);
		},

		create: FlashMediaElementRenderer.create

	};
	_renderer.renderer.add(FlashMediaElementVideoRenderer);

	// HLS
	var FlashMediaElementHlsVideoRenderer = {
		name: 'flash_hls',

		options: {
			prefix: 'flash_hls',
			filename: 'mediaelement-flash-video-hls.swf'
		},
		/**
   * Determine if a specific element type can be played with this render
   *
   * @param {String} type
   * @return {Boolean}
   */
		canPlayType: function canPlayType(type) {
			return !_constants.HAS_MSE && hasFlash && ['application/x-mpegurl', 'vnd.apple.mpegurl', 'audio/mpegurl', 'audio/hls', 'video/hls'].includes(type.toLowerCase());
		},

		create: FlashMediaElementRenderer.create
	};
	_renderer.renderer.add(FlashMediaElementHlsVideoRenderer);

	// M(PEG)-DASH
	var FlashMediaElementMdashVideoRenderer = {
		name: 'flash_dash',

		options: {
			prefix: 'flash_dash',
			filename: 'mediaelement-flash-video-mdash.swf'
		},
		/**
   * Determine if a specific element type can be played with this render
   *
   * @param {String} type
   * @return {Boolean}
   */
		canPlayType: function canPlayType(type) {
			return !_constants.HAS_MSE && hasFlash && ['application/dash+xml'].includes(type);
		},

		create: FlashMediaElementRenderer.create
	};
	_renderer.renderer.add(FlashMediaElementMdashVideoRenderer);

	// AUDIO
	var FlashMediaElementAudioRenderer = {
		name: 'flash_audio',

		options: {
			prefix: 'flash_audio',
			filename: 'mediaelement-flash-audio.swf'
		},
		/**
   * Determine if a specific element type can be played with this render
   *
   * @param {String} type
   * @return {Boolean}
   */
		canPlayType: function canPlayType(type) {
			return hasFlash && ['audio/mp3'].includes(type);
		},

		create: FlashMediaElementRenderer.create
	};
	_renderer.renderer.add(FlashMediaElementAudioRenderer);

	// AUDIO - ogg
	var FlashMediaElementAudioOggRenderer = {
		name: 'flash_audio_ogg',

		options: {
			prefix: 'flash_audio_ogg',
			filename: 'mediaelement-flash-audio-ogg.swf'
		},
		/**
   * Determine if a specific element type can be played with this render
   *
   * @param {String} type
   * @return {Boolean}
   */
		canPlayType: function canPlayType(type) {
			return hasFlash && ['audio/ogg', 'audio/oga', 'audio/ogv'].includes(type);
		},

		create: FlashMediaElementRenderer.create
	};
	_renderer.renderer.add(FlashMediaElementAudioOggRenderer);
}

},{"2":2,"27":27,"28":28,"3":3,"30":30,"4":4,"6":6,"7":7}],21:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _dom = _dereq_(28);

var _constants = _dereq_(27);

var _media = _dereq_(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Native FLV renderer
 *
 * Uses flv.js, which is a JavaScript library which implements mechanisms to play flv files inspired by flv.js.
 * It relies on HTML5 video and MediaSource Extensions for playback.
 * Currently, it can only play files with the same origin.
 *
 * @see https://github.com/Bilibili/flv.js
 *
 */
var NativeFlv = {
	/**
  * @type {Boolean}
  */
	isMediaStarted: false,
	/**
  * @type {Boolean}
  */
	isMediaLoaded: false,
	/**
  * @type {Array}
  */
	creationQueue: [],

	/**
  * Create a queue to prepare the loading of an FLV source
  * @param {Object} settings - an object with settings needed to load an FLV player instance
  */
	prepareSettings: function prepareSettings(settings) {
		if (NativeFlv.isLoaded) {
			NativeFlv.createInstance(settings);
		} else {
			NativeFlv.loadScript(settings);
			NativeFlv.creationQueue.push(settings);
		}
	},

	/**
  * Load flv.js script on the header of the document
  *
  * @param {Object} settings - an object with settings needed to load an FLV player instance
  */
	loadScript: function loadScript(settings) {
		if (!NativeFlv.isMediaStarted) {

			if (typeof flvjs !== 'undefined') {
				NativeFlv.createInstance(settings);
			} else {
				(function () {

					settings.options.path = typeof settings.options.path === 'string' ? settings.options.path : '//cdnjs.cloudflare.com/ajax/libs/flv.js/1.1.0/flv.min.js';

					var script = _document2.default.createElement('script'),
					    firstScriptTag = _document2.default.getElementsByTagName('script')[0],
					    done = false;

					script.src = settings.options.path;

					// Attach handlers for all browsers
					script.onload = script.onreadystatechange = function () {
						if (!done && (!this.readyState || this.readyState === undefined || this.readyState === 'loaded' || this.readyState === 'complete')) {
							done = true;
							NativeFlv.mediaReady();
							script.onload = script.onreadystatechange = null;
						}
					};

					firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
				})();
			}
			NativeFlv.isMediaStarted = true;
		}
	},

	/**
  * Process queue of FLV player creation
  *
  */
	mediaReady: function mediaReady() {
		NativeFlv.isLoaded = true;
		NativeFlv.isMediaLoaded = true;

		while (NativeFlv.creationQueue.length > 0) {
			var settings = NativeFlv.creationQueue.pop();
			NativeFlv.createInstance(settings);
		}
	},

	/**
  * Create a new instance of FLV player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to instantiate FLV object
  */
	createInstance: function createInstance(settings) {
		var player = flvjs.createPlayer(settings.options);
		_window2.default['__ready__' + settings.id](player);
	}
};

var FlvNativeRenderer = {
	name: 'native_flv',

	options: {
		prefix: 'native_flv',
		/**
   * Custom configuration for FLV player
   *
   * @see https://github.com/Bilibili/flv.js/blob/master/docs/api.md#config
   * @type {Object}
   */
		flv: {
			// Special config: used to set the local path/URL of flv.js library
			path: '//cdnjs.cloudflare.com/ajax/libs/flv.js/1.1.0/flv.min.js',
			cors: true,
			enableWorker: false,
			enableStashBuffer: true,
			stashInitialSize: undefined,
			isLive: false,
			lazyLoad: true,
			lazyLoadMaxDuration: 3 * 60,
			deferLoadAfterSourceOpen: true,
			statisticsInfoReportInterval: 600,
			accurateSeek: false,
			seekType: 'range', // [range, param, custom]
			seekParamStart: 'bstart',
			seekParamEnd: 'bend',
			rangeLoadZeroStart: false,
			customSeekHandler: undefined
		}
	},
	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return _constants.HAS_MSE && ['video/x-flv', 'video/flv'].includes(type);
	},

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		var node = null,
		    originalNode = mediaElement.originalNode,
		    id = mediaElement.id + '_' + options.prefix,
		    flvPlayer = void 0,
		    stack = {},
		    i = void 0,
		    il = void 0;

		node = originalNode.cloneNode(true);
		options = Object.assign(options, mediaElement.options);

		// WRAPPERS for PROPs
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {
			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			node['get' + capName] = function () {
				return flvPlayer !== null ? node[propName] : null;
			};

			node['set' + capName] = function (value) {
				if (flvPlayer !== null) {
					node[propName] = value;

					if (propName === 'src') {
						flvPlayer.detachMediaElement();
						flvPlayer.attachMediaElement(node);
						flvPlayer.load();
					}
				} else {
					// store for after "READY" event fires
					stack.push({ type: 'set', propName: propName, value: value });
				}
			};
		};

		for (i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		// Initial method to register all FLV events
		_window2.default['__ready__' + id] = function (_flvPlayer) {

			mediaElement.flvPlayer = flvPlayer = _flvPlayer;

			// do call stack
			if (stack.length) {
				for (i = 0, il = stack.length; i < il; i++) {

					var stackItem = stack[i];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						node['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						node[stackItem.methodName]();
					}
				}
			}

			// BUBBLE EVENTS
			var events = _mejs2.default.html5media.events,
			    assignEvents = function assignEvents(eventName) {

				if (eventName === 'loadedmetadata') {

					flvPlayer.detachMediaElement();
					flvPlayer.attachMediaElement(node);
					flvPlayer.load();
				}

				node.addEventListener(eventName, function (e) {
					var event = _document2.default.createEvent('HTMLEvents');
					event.initEvent(e.type, e.bubbles, e.cancelable);
					// event.srcElement = e.srcElement;
					// event.target = e.srcElement;
					mediaElement.dispatchEvent(event);
				});
			};

			events = events.concat(['click', 'mouseover', 'mouseout']);

			for (i = 0, il = events.length; i < il; i++) {
				assignEvents(events[i]);
			}
		};

		if (mediaFiles && mediaFiles.length > 0) {
			for (i = 0, il = mediaFiles.length; i < il; i++) {
				if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[i].type)) {
					node.setAttribute('src', mediaFiles[i].src);
					break;
				}
			}
		}

		node.setAttribute('id', id);

		originalNode.parentNode.insertBefore(node, originalNode);
		originalNode.removeAttribute('autoplay');
		originalNode.style.display = 'none';

		// Options that cannot be overridden
		options.flv.type = 'flv';
		options.flv.url = node.getAttribute('src');

		NativeFlv.prepareSettings({
			options: options.flv,
			id: id
		});

		// HELPER METHODS
		node.setSize = function (width, height) {
			node.style.width = width + 'px';
			node.style.height = height + 'px';
			return node;
		};

		node.hide = function () {
			node.pause();
			node.style.display = 'none';
			return node;
		};

		node.show = function () {
			node.style.display = '';
			return node;
		};

		node.destroy = function () {
			flvPlayer.destroy();
		};

		var event = (0, _dom.createEvent)('rendererready', node);
		mediaElement.dispatchEvent(event);

		return node;
	}
};

/**
 * Register Native FLV type based on URL structure
 *
 */
_media.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('.flv') ? 'video/flv' : null;
});

_renderer.renderer.add(FlvNativeRenderer);

},{"2":2,"27":27,"28":28,"3":3,"30":30,"6":6,"7":7}],22:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _dom = _dereq_(28);

var _constants = _dereq_(27);

var _media = _dereq_(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Native HLS renderer
 *
 * Uses DailyMotion's hls.js, which is a JavaScript library which implements an HTTP Live Streaming client.
 * It relies on HTML5 video and MediaSource Extensions for playback.
 * This renderer integrates new events associated with m3u8 files the same way Flash version of Hls does.
 * @see https://github.com/dailymotion/hls.js
 *
 */
var NativeHls = {
	/**
  * @type {Boolean}
  */
	isMediaStarted: false,
	/**
  * @type {Boolean}
  */
	isMediaLoaded: false,
	/**
  * @type {Array}
  */
	creationQueue: [],

	/**
  * Create a queue to prepare the loading of an HLS source
  *
  * @param {Object} settings - an object with settings needed to load an HLS player instance
  */
	prepareSettings: function prepareSettings(settings) {
		if (NativeHls.isLoaded) {
			NativeHls.createInstance(settings);
		} else {
			NativeHls.loadScript(settings);
			NativeHls.creationQueue.push(settings);
		}
	},

	/**
  * Load hls.js script on the header of the document
  *
  * @param {Object} settings - an object with settings needed to load an HLS player instance
  */
	loadScript: function loadScript(settings) {
		if (!NativeHls.isMediaStarted) {

			if (typeof Hls !== 'undefined') {
				NativeHls.createInstance(settings);
			} else {
				(function () {

					settings.options.path = typeof settings.options.path === 'string' ? settings.options.path : '//cdn.jsdelivr.net/hls.js/latest/hls.min.js';

					var script = _document2.default.createElement('script'),
					    firstScriptTag = _document2.default.getElementsByTagName('script')[0],
					    done = false;

					script.src = settings.options.path;

					// Attach handlers for all browsers
					script.onload = script.onreadystatechange = function () {
						if (!done && (!this.readyState || this.readyState === undefined || this.readyState === 'loaded' || this.readyState === 'complete')) {
							done = true;
							NativeHls.mediaReady();
							script.onload = script.onreadystatechange = null;
						}
					};

					firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
				})();
			}
			NativeHls.isMediaStarted = true;
		}
	},

	/**
  * Process queue of HLS player creation
  *
  */
	mediaReady: function mediaReady() {
		NativeHls.isLoaded = true;
		NativeHls.isMediaLoaded = true;

		while (NativeHls.creationQueue.length > 0) {
			var settings = NativeHls.creationQueue.pop();
			NativeHls.createInstance(settings);
		}
	},

	/**
  * Create a new instance of HLS player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to instantiate HLS object
  * @return {Hls}
  */
	createInstance: function createInstance(settings) {
		var player = new Hls(settings.options);
		_window2.default['__ready__' + settings.id](player);
		return player;
	}
};

var HlsNativeRenderer = {
	name: 'native_hls',

	options: {
		prefix: 'native_hls',
		/**
   * Custom configuration for HLS player
   *
   * @see https://github.com/dailymotion/hls.js/blob/master/API.md#user-content-fine-tuning
   * @type {Object}
   */
		hls: {
			// Special config: used to set the local path/URL of hls.js library
			path: '//cdn.jsdelivr.net/hls.js/latest/hls.min.js',
			autoStartLoad: true,
			startPosition: -1,
			capLevelToPlayerSize: false,
			debug: false,
			maxBufferLength: 30,
			maxMaxBufferLength: 600,
			maxBufferSize: 60 * 1000 * 1000,
			maxBufferHole: 0.5,
			maxSeekHole: 2,
			seekHoleNudgeDuration: 0.01,
			maxFragLookUpTolerance: 0.2,
			liveSyncDurationCount: 3,
			liveMaxLatencyDurationCount: 10,
			enableWorker: true,
			enableSoftwareAES: true,
			manifestLoadingTimeOut: 10000,
			manifestLoadingMaxRetry: 6,
			manifestLoadingRetryDelay: 500,
			manifestLoadingMaxRetryTimeout: 64000,
			levelLoadingTimeOut: 10000,
			levelLoadingMaxRetry: 6,
			levelLoadingRetryDelay: 500,
			levelLoadingMaxRetryTimeout: 64000,
			fragLoadingTimeOut: 20000,
			fragLoadingMaxRetry: 6,
			fragLoadingRetryDelay: 500,
			fragLoadingMaxRetryTimeout: 64000,
			startFragPrefech: false,
			appendErrorMaxRetry: 3,
			enableCEA708Captions: true,
			stretchShortVideoTrack: true,
			forceKeyFrameOnDiscontinuity: true,
			abrEwmaFastLive: 5.0,
			abrEwmaSlowLive: 9.0,
			abrEwmaFastVoD: 4.0,
			abrEwmaSlowVoD: 15.0,
			abrEwmaDefaultEstimate: 500000,
			abrBandWidthFactor: 0.8,
			abrBandWidthUpFactor: 0.7
		}
	},
	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return _constants.HAS_MSE && ['application/x-mpegurl', 'vnd.apple.mpegurl', 'audio/mpegurl', 'audio/hls', 'video/hls'].includes(type.toLowerCase());
	},

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		var node = null,
		    originalNode = mediaElement.originalNode,
		    id = mediaElement.id + '_' + options.prefix,
		    hlsPlayer = void 0,
		    stack = {},
		    i = void 0,
		    il = void 0;

		node = originalNode.cloneNode(true);
		options = Object.assign(options, mediaElement.options);

		// WRAPPERS for PROPs
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {
			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			node['get' + capName] = function () {
				return hlsPlayer !== null ? node[propName] : null;
			};

			node['set' + capName] = function (value) {
				if (hlsPlayer !== null) {
					node[propName] = value;

					if (propName === 'src') {

						hlsPlayer.destroy();
						hlsPlayer = null;
						hlsPlayer = NativeHls.createInstance({
							options: options.hls,
							id: id
						});

						hlsPlayer.attachMedia(node);
						hlsPlayer.on(Hls.Events.MEDIA_ATTACHED, function () {
							hlsPlayer.loadSource(value);
						});
					}
				} else {
					// store for after "READY" event fires
					stack.push({ type: 'set', propName: propName, value: value });
				}
			};
		};

		for (i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		// Initial method to register all HLS events
		_window2.default['__ready__' + id] = function (_hlsPlayer) {

			mediaElement.hlsPlayer = hlsPlayer = _hlsPlayer;

			// do call stack
			if (stack.length) {
				for (i = 0, il = stack.length; i < il; i++) {

					var stackItem = stack[i];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						node['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						node[stackItem.methodName]();
					}
				}
			}

			// BUBBLE EVENTS
			var events = _mejs2.default.html5media.events,
			    hlsEvents = Hls.Events,
			    assignEvents = function assignEvents(eventName) {

				if (eventName === 'loadedmetadata') {
					(function () {

						hlsPlayer.detachMedia();

						var url = node.src;

						hlsPlayer.attachMedia(node);
						hlsPlayer.on(hlsEvents.MEDIA_ATTACHED, function () {
							hlsPlayer.loadSource(url);
						});
					})();
				}

				node.addEventListener(eventName, function (e) {
					// copy event
					var event = _document2.default.createEvent('HTMLEvents');
					event.initEvent(e.type, e.bubbles, e.cancelable);
					// event.srcElement = e.srcElement;
					// event.target = e.srcElement;

					mediaElement.dispatchEvent(event);
				});
			};

			events = events.concat(['click', 'mouseover', 'mouseout']);

			for (i = 0, il = events.length; i < il; i++) {
				assignEvents(events[i]);
			}

			/**
    * Custom HLS events
    *
    * These events can be attached to the original node using addEventListener and the name of the event,
    * not using Hls.Events object
    * @see https://github.com/dailymotion/hls.js/blob/master/src/events.js
    * @see https://github.com/dailymotion/hls.js/blob/master/src/errors.js
    * @see https://github.com/dailymotion/hls.js/blob/master/API.md#runtime-events
    * @see https://github.com/dailymotion/hls.js/blob/master/API.md#errors
    */
			var assignHlsEvents = function assignHlsEvents(e, data) {
				var event = (0, _dom.createEvent)(e, node);
				event.data = data;
				mediaElement.dispatchEvent(event);

				if (e === 'hlsError') {
					console.error(e, data);

					// borrowed from http://dailymotion.github.io/hls.js/demo/
					if (data.fatal) {
						hlsPlayer.destroy();
					} else {
						switch (data.type) {
							case 'mediaError':
								hlsPlayer.recoverMediaError();
								break;

							case 'networkError':
								hlsPlayer.startLoad();
								break;

						}
					}
				}
			};

			for (var eventType in hlsEvents) {
				if (hlsEvents.hasOwnProperty(eventType)) {
					hlsPlayer.on(hlsEvents[eventType], assignHlsEvents);
				}
			}
		};

		if (mediaFiles && mediaFiles.length > 0) {
			for (i = 0, il = mediaFiles.length; i < il; i++) {
				if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[i].type)) {
					node.setAttribute('src', mediaFiles[i].src);
					break;
				}
			}
		}

		node.setAttribute('id', id);

		originalNode.parentNode.insertBefore(node, originalNode);
		originalNode.removeAttribute('autoplay');
		originalNode.style.display = 'none';

		NativeHls.prepareSettings({
			options: options.hls,
			id: id
		});

		// HELPER METHODS
		node.setSize = function (width, height) {
			node.style.width = width + 'px';
			node.style.height = height + 'px';

			return node;
		};

		node.hide = function () {
			node.pause();
			node.style.display = 'none';
			return node;
		};

		node.show = function () {
			node.style.display = '';
			return node;
		};

		node.destroy = function () {
			hlsPlayer.destroy();
		};

		var event = (0, _dom.createEvent)('rendererready', node);
		mediaElement.dispatchEvent(event);

		return node;
	}
};

/**
 * Register Native HLS type based on URL structure
 *
 */
_media.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('.m3u8') ? 'application/x-mpegURL' : null;
});

_renderer.renderer.add(HlsNativeRenderer);

},{"2":2,"27":27,"28":28,"3":3,"30":30,"6":6,"7":7}],23:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _dom = _dereq_(28);

var _constants = _dereq_(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Native HTML5 Renderer
 *
 * Wraps the native HTML5 <audio> or <video> tag and bubbles its properties, events, and methods up to the mediaElement.
 */
var HtmlMediaElement = {

	name: 'html5',

	options: {
		prefix: 'html5'
	},

	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {String}
  */
	canPlayType: function canPlayType(type) {

		var mediaElement = _document2.default.createElement('video');

		// Due to an issue on Webkit, force the MP3 and MP4 on Android and consider native support for HLS
		if (_constants.IS_ANDROID && type.match(/\/mp(3|4)$/gi) !== null || ['application/x-mpegurl', 'vnd.apple.mpegurl', 'audio/mpegurl', 'audio/hls', 'video/hls'].includes(type.toLowerCase()) && _constants.SUPPORTS_NATIVE_HLS) {
			return 'yes';
		} else if (mediaElement.canPlayType) {
			return mediaElement.canPlayType(type).replace(/no/, '');
		} else {
			return '';
		}
	},
	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		var node = null,
		    id = mediaElement.id + '_' + options.prefix,
		    i = void 0,
		    il = void 0;

		// CREATE NODE
		if (mediaElement.originalNode === undefined || mediaElement.originalNode === null) {
			node = _document2.default.createElement('audio');
			mediaElement.appendChild(node);
		} else {
			node = mediaElement.originalNode;
		}

		node.setAttribute('id', id);

		// WRAPPERS for PROPs
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {
			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			node['get' + capName] = function () {
				return node[propName];
			};

			node['set' + capName] = function (value) {
				node[propName] = value;
			};
		};

		for (i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		var events = _mejs2.default.html5media.events.concat(['click', 'mouseover', 'mouseout']),
		    assignEvents = function assignEvents(eventName) {

			node.addEventListener(eventName, function (e) {
				// copy event

				var event = _document2.default.createEvent('HTMLEvents');
				event.initEvent(e.type, e.bubbles, e.cancelable);
				// event.srcElement = e.srcElement;
				// event.target = e.srcElement;
				mediaElement.dispatchEvent(event);
			});
		};

		for (i = 0, il = events.length; i < il; i++) {
			assignEvents(events[i]);
		}

		// HELPER METHODS
		node.setSize = function (width, height) {
			node.style.width = width + 'px';
			node.style.height = height + 'px';

			return node;
		};

		node.hide = function () {
			node.style.display = 'none';

			return node;
		};

		node.show = function () {
			node.style.display = '';

			return node;
		};

		if (mediaFiles && mediaFiles.length > 0) {
			for (i = 0, il = mediaFiles.length; i < il; i++) {
				if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[i].type)) {
					node.setAttribute('src', mediaFiles[i].src);
					break;
				}
			}
		}

		var event = (0, _dom.createEvent)('rendererready', node);
		mediaElement.dispatchEvent(event);

		return node;
	}
};

_window2.default.HtmlMediaElement = _mejs2.default.HtmlMediaElement = HtmlMediaElement;

_renderer.renderer.add(HtmlMediaElement);

},{"2":2,"27":27,"28":28,"3":3,"6":6,"7":7}],24:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _dom = _dereq_(28);

var _media = _dereq_(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * SoundCloud renderer
 *
 * Uses <iframe> approach and uses SoundCloud Widget API to manipulate it.
 * @see https://developers.soundcloud.com/docs/api/html5-widget
 */
var SoundCloudApi = {
	/**
  * @type {Boolean}
  */
	isSDKStarted: false,
	/**
  * @type {Boolean}
  */
	isSDKLoaded: false,
	/**
  * @type {Array}
  */
	iframeQueue: [],

	/**
  * Create a queue to prepare the creation of <iframe>
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	enqueueIframe: function enqueueIframe(settings) {

		if (SoundCloudApi.isLoaded) {
			SoundCloudApi.createIframe(settings);
		} else {
			SoundCloudApi.loadIframeApi();
			SoundCloudApi.iframeQueue.push(settings);
		}
	},

	/**
  * Load SoundCloud API script on the header of the document
  *
  */
	loadIframeApi: function loadIframeApi() {
		if (!SoundCloudApi.isSDKStarted) {
			(function () {

				var head = _document2.default.getElementsByTagName("head")[0] || _document2.default.documentElement,
				    script = _document2.default.createElement("script"),
				    done = false;

				script.src = '//w.soundcloud.com/player/api.js';

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function () {
					if (!done && (!SoundCloudApi.readyState || SoundCloudApi.readyState === "loaded" || SoundCloudApi.readyState === "complete")) {
						done = true;
						SoundCloudApi.apiReady();

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						if (head && script.parentNode) {
							head.removeChild(script);
						}
					}
				};
				head.appendChild(script);
				SoundCloudApi.isSDKStarted = true;
			})();
		}
	},

	/**
  * Process queue of SoundCloud <iframe> element creation
  *
  */
	apiReady: function apiReady() {
		SoundCloudApi.isLoaded = true;
		SoundCloudApi.isSDKLoaded = true;

		while (SoundCloudApi.iframeQueue.length > 0) {
			var settings = SoundCloudApi.iframeQueue.pop();
			SoundCloudApi.createIframe(settings);
		}
	},

	/**
  * Create a new instance of SoundCloud Widget player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	createIframe: function createIframe(settings) {
		var player = SC.Widget(settings.iframe);
		_window2.default['__ready__' + settings.id](player);
	}
};

var SoundCloudIframeRenderer = {
	name: 'soundcloud_iframe',

	options: {
		prefix: 'soundcloud_iframe'
	},

	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return ['video/soundcloud', 'video/x-soundcloud'].includes(type);
	},

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		var sc = {};

		// store main variable
		sc.options = options;
		sc.id = mediaElement.id + '_' + options.prefix;
		sc.mediaElement = mediaElement;

		// create our fake element that allows events and such to work
		var apiStack = [],
		    scPlayerReady = false,
		    scPlayer = null,
		    scIframe = null,
		    currentTime = 0,
		    duration = 0,
		    bufferedTime = 0,
		    paused = true,
		    volume = 1,
		    muted = false,
		    ended = false,
		    i = void 0,
		    il = void 0;

		// wrappers for get/set
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			// add to flash state that we will store

			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			sc['get' + capName] = function () {
				if (scPlayer !== null) {
					var value = null;

					// figure out how to get dm dta here
					switch (propName) {
						case 'currentTime':
							return currentTime;

						case 'duration':
							return duration;

						case 'volume':
							return volume;

						case 'paused':
							return paused;

						case 'ended':
							return ended;

						case 'muted':
							return muted; // ?

						case 'buffered':
							return {
								start: function start() {
									return 0;
								},
								end: function end() {
									return bufferedTime * duration;
								},
								length: 1
							};
						case 'src':
							return scIframe ? scIframe.src : '';
					}

					return value;
				} else {
					return null;
				}
			};

			sc['set' + capName] = function (value) {

				if (scPlayer !== null) {

					// do something
					switch (propName) {

						case 'src':
							var url = typeof value === 'string' ? value : value[0].src;

							scPlayer.load(url);
							break;

						case 'currentTime':
							scPlayer.seekTo(value * 1000);
							break;

						case 'muted':
							if (value) {
								scPlayer.setVolume(0); // ?
							} else {
								scPlayer.setVolume(1); // ?
							}
							setTimeout(function () {
								var event = (0, _dom.createEvent)('volumechange', sc);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'volume':
							scPlayer.setVolume(value);
							setTimeout(function () {
								var event = (0, _dom.createEvent)('volumechange', sc);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						default:
							
					}
				} else {
					// store for after "READY" event fires
					apiStack.push({ type: 'set', propName: propName, value: value });
				}
			};
		};

		for (i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		// add wrappers for native methods
		var methods = _mejs2.default.html5media.methods,
		    assignMethods = function assignMethods(methodName) {

			// run the method on the Soundcloud API
			sc[methodName] = function () {

				if (scPlayer !== null) {

					// DO method
					switch (methodName) {
						case 'play':
							return scPlayer.play();
						case 'pause':
							return scPlayer.pause();
						case 'load':
							return null;

					}
				} else {
					apiStack.push({ type: 'call', methodName: methodName });
				}
			};
		};

		for (i = 0, il = methods.length; i < il; i++) {
			assignMethods(methods[i]);
		}

		// add a ready method that SC can fire
		_window2.default['__ready__' + sc.id] = function (_scPlayer) {

			scPlayerReady = true;
			mediaElement.scPlayer = scPlayer = _scPlayer;

			// do call stack
			if (apiStack.length) {
				for (i = 0, il = apiStack.length; i < il; i++) {

					var stackItem = apiStack[i];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						sc['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						sc[stackItem.methodName]();
					}
				}
			}

			// SoundCloud properties are async, so we don't fire the event until the property callback fires
			scPlayer.bind(SC.Widget.Events.PLAY_PROGRESS, function () {
				paused = false;
				ended = false;

				scPlayer.getPosition(function (_currentTime) {
					currentTime = _currentTime / 1000;
					var event = (0, _dom.createEvent)('timeupdate', sc);
					mediaElement.dispatchEvent(event);
				});
			});

			scPlayer.bind(SC.Widget.Events.PAUSE, function () {
				paused = true;

				var event = (0, _dom.createEvent)('pause', sc);
				mediaElement.dispatchEvent(event);
			});
			scPlayer.bind(SC.Widget.Events.PLAY, function () {
				paused = false;
				ended = false;

				var event = (0, _dom.createEvent)('play', sc);
				mediaElement.dispatchEvent(event);
			});
			scPlayer.bind(SC.Widget.Events.FINISHED, function () {
				paused = false;
				ended = true;

				var event = (0, _dom.createEvent)('ended', sc);
				mediaElement.dispatchEvent(event);
			});
			scPlayer.bind(SC.Widget.Events.READY, function () {
				scPlayer.getDuration(function (_duration) {
					duration = _duration / 1000;

					var event = (0, _dom.createEvent)('loadedmetadata', sc);
					mediaElement.dispatchEvent(event);
				});
			});
			scPlayer.bind(SC.Widget.Events.LOAD_PROGRESS, function () {
				scPlayer.getDuration(function (loadProgress) {
					if (duration > 0) {
						bufferedTime = duration * loadProgress;

						var event = (0, _dom.createEvent)('progress', sc);
						mediaElement.dispatchEvent(event);
					}
				});
				scPlayer.getDuration(function (_duration) {
					duration = _duration;

					var event = (0, _dom.createEvent)('loadedmetadata', sc);
					mediaElement.dispatchEvent(event);
				});
			});

			// give initial events
			var initEvents = ['rendererready', 'loadeddata', 'loadedmetadata', 'canplay'];

			for (var _i = 0, _il = initEvents.length; _i < _il; _i++) {
				var event = (0, _dom.createEvent)(initEvents[_i], sc);
				mediaElement.dispatchEvent(event);
			}
		};

		// container for API API
		scIframe = _document2.default.createElement('iframe');
		scIframe.id = sc.id;
		scIframe.width = 10;
		scIframe.height = 10;
		scIframe.frameBorder = 0;
		scIframe.style.visibility = 'hidden';
		scIframe.src = mediaFiles[0].src;
		scIframe.scrolling = 'no';

		mediaElement.appendChild(scIframe);
		mediaElement.originalNode.style.display = 'none';

		var scSettings = {
			iframe: scIframe,
			id: sc.id
		};

		SoundCloudApi.enqueueIframe(scSettings);

		sc.setSize = function (width, height) {
			// nothing here, audio only
		};
		sc.hide = function () {
			sc.pause();
			if (scIframe) {
				scIframe.style.display = 'none';
			}
		};
		sc.show = function () {
			if (scIframe) {
				scIframe.style.display = '';
			}
		};
		sc.destroy = function () {
			scPlayer.destroy();
		};

		return sc;
	}
};

/**
 * Register SoundCloud type based on URL structure
 *
 */
_media.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('//soundcloud.com') || url.includes('//w.soundcloud.com') ? 'video/x-soundcloud' : null;
});

_renderer.renderer.add(SoundCloudIframeRenderer);

},{"2":2,"28":28,"3":3,"30":30,"6":6,"7":7}],25:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _dom = _dereq_(28);

var _media = _dereq_(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Vimeo renderer
 *
 * Uses <iframe> approach and uses Vimeo API to manipulate it.
 * All Vimeo calls return a Promise so this renderer accounts for that
 * to update all the necessary values to interact with MediaElement player.
 * Note: IE8 implements ECMAScript 3 that does not allow bare keywords in dot notation;
 * that's why instead of using .catch ['catch'] is being used.
 * @see https://github.com/vimeo/player.js
 *
 */
var vimeoApi = {

	/**
  * @type {Boolean}
  */
	isIframeStarted: false,
	/**
  * @type {Boolean}
  */
	isIframeLoaded: false,
	/**
  * @type {Array}
  */
	iframeQueue: [],

	/**
  * Create a queue to prepare the creation of <iframe>
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	enqueueIframe: function enqueueIframe(settings) {

		if (vimeoApi.isLoaded) {
			vimeoApi.createIframe(settings);
		} else {
			vimeoApi.loadIframeApi();
			vimeoApi.iframeQueue.push(settings);
		}
	},

	/**
  * Load Vimeo API script on the header of the document
  *
  */
	loadIframeApi: function loadIframeApi() {

		if (!vimeoApi.isIframeStarted) {
			(function () {

				var script = _document2.default.createElement('script'),
				    firstScriptTag = _document2.default.getElementsByTagName('script')[0],
				    done = false;

				script.src = '//player.vimeo.com/api/player.js';

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function () {
					if (!done && (!vimeoApi.readyState || vimeoApi.readyState === undefined || vimeoApi.readyState === "loaded" || vimeoApi.readyState === "complete")) {
						done = true;
						vimeoApi.iFrameReady();
						script.onload = script.onreadystatechange = null;
					}
				};
				firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
				vimeoApi.isIframeStarted = true;
			})();
		}
	},

	/**
  * Process queue of Vimeo <iframe> element creation
  *
  */
	iFrameReady: function iFrameReady() {

		vimeoApi.isLoaded = true;
		vimeoApi.isIframeLoaded = true;

		while (vimeoApi.iframeQueue.length > 0) {
			var settings = vimeoApi.iframeQueue.pop();
			vimeoApi.createIframe(settings);
		}
	},

	/**
  * Create a new instance of Vimeo API player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	createIframe: function createIframe(settings) {
		var player = new Vimeo.Player(settings.iframe);
		_window2.default['__ready__' + settings.id](player);
	},

	/**
  * Extract numeric value from Vimeo to be loaded through API
  * Valid URL format(s):
  *  - https://player.vimeo.com/video/59777392
  *  - https://vimeo.com/59777392
  *
  * @param {String} url - Vimeo full URL to grab the number Id of the source
  * @return {int}
  */
	getVimeoId: function getVimeoId(url) {
		if (url === undefined || url === null) {
			return null;
		}

		var parts = url.split('?');

		url = parts[0];

		return parseInt(url.substring(url.lastIndexOf('/') + 1));
	},

	/**
  * Generate custom errors for Vimeo based on the API specifications
  *
  * @see https://github.com/vimeo/player.js#error
  * @param {Object} error
  * @param {Object} target
  */
	errorHandler: function errorHandler(error, target) {
		var event = (0, _dom.createEvent)('error', target);
		event.message = error.name + ': ' + error.message;
		mediaElement.dispatchEvent(event);
	}
};

var vimeoIframeRenderer = {

	name: 'vimeo_iframe',

	options: {
		prefix: 'vimeo_iframe'
	},
	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return ['video/vimeo', 'video/x-vimeo'].includes(type);
	},

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		// exposed object
		var apiStack = [],
		    vimeoApiReady = false,
		    vimeo = {},
		    vimeoPlayer = null,
		    paused = true,
		    volume = 1,
		    oldVolume = volume,
		    currentTime = 0,
		    bufferedTime = 0,
		    ended = false,
		    duration = 0,
		    url = "",
		    i = void 0,
		    il = void 0;

		vimeo.options = options;
		vimeo.id = mediaElement.id + '_' + options.prefix;
		vimeo.mediaElement = mediaElement;

		// wrappers for get/set
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			vimeo['get' + capName] = function () {
				if (vimeoPlayer !== null) {
					var value = null;

					switch (propName) {
						case 'currentTime':
							return currentTime;

						case 'duration':
							return duration;

						case 'volume':
							return volume;
						case 'muted':
							return volume === 0;
						case 'paused':
							return paused;

						case 'ended':
							return ended;

						case 'src':
							vimeoPlayer.getVideoUrl().then(function (_url) {
								url = _url;
							});

							return url;
						case 'buffered':
							return {
								start: function start() {
									return 0;
								},
								end: function end() {
									return bufferedTime * duration;
								},
								length: 1
							};
					}

					return value;
				} else {
					return null;
				}
			};

			vimeo['set' + capName] = function (value) {

				if (vimeoPlayer !== null) {

					// do something
					switch (propName) {

						case 'src':
							var _url2 = typeof value === 'string' ? value : value[0].src,
							    videoId = vimeoApi.getVimeoId(_url2);

							vimeoPlayer.loadVideo(videoId).then(function () {
								if (mediaElement.getAttribute('autoplay')) {
									vimeoPlayer.play();
								}
							})['catch'](function (error) {
								vimeoApi.errorHandler(error, vimeo);
							});
							break;

						case 'currentTime':
							vimeoPlayer.setCurrentTime(value).then(function () {
								currentTime = value;
								setTimeout(function () {
									var event = (0, _dom.createEvent)('timeupdate', vimeo);
									mediaElement.dispatchEvent(event);
								}, 50);
							})['catch'](function (error) {
								vimeoApi.errorHandler(error, vimeo);
							});
							break;

						case 'volume':
							vimeoPlayer.setVolume(value).then(function () {
								volume = value;
								oldVolume = volume;
								setTimeout(function () {
									var event = (0, _dom.createEvent)('volumechange', vimeo);
									mediaElement.dispatchEvent(event);
								}, 50);
							})['catch'](function (error) {
								vimeoApi.errorHandler(error, vimeo);
							});
							break;

						case 'loop':
							vimeoPlayer.setLoop(value)['catch'](function (error) {
								vimeoApi.errorHandler(error, vimeo);
							});
							break;
						case 'muted':
							if (value) {
								vimeoPlayer.setVolume(0).then(function () {
									volume = 0;
									setTimeout(function () {
										var event = (0, _dom.createEvent)('volumechange', vimeo);
										mediaElement.dispatchEvent(event);
									}, 50);
								})['catch'](function (error) {
									vimeoApi.errorHandler(error, vimeo);
								});
							} else {
								vimeoPlayer.setVolume(oldVolume).then(function () {
									volume = oldVolume;
									setTimeout(function () {
										var event = (0, _dom.createEvent)('volumechange', vimeo);
										mediaElement.dispatchEvent(event);
									}, 50);
								})['catch'](function (error) {
									vimeoApi.errorHandler(error, vimeo);
								});
							}
							break;
						default:
							
					}
				} else {
					// store for after "READY" event fires
					apiStack.push({ type: 'set', propName: propName, value: value });
				}
			};
		};

		for (i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		// add wrappers for native methods
		var methods = _mejs2.default.html5media.methods,
		    assignMethods = function assignMethods(methodName) {

			// run the method on the Soundcloud API
			vimeo[methodName] = function () {

				if (vimeoPlayer !== null) {

					// DO method
					switch (methodName) {
						case 'play':
							return vimeoPlayer.play();
						case 'pause':
							return vimeoPlayer.pause();
						case 'load':
							return null;

					}
				} else {
					apiStack.push({ type: 'call', methodName: methodName });
				}
			};
		};

		for (i = 0, il = methods.length; i < il; i++) {
			assignMethods(methods[i]);
		}

		// Initial method to register all Vimeo events when initializing <iframe>
		_window2.default['__ready__' + vimeo.id] = function (_vimeoPlayer) {

			vimeoApiReady = true;
			mediaElement.vimeoPlayer = vimeoPlayer = _vimeoPlayer;

			// do call stack
			if (apiStack.length) {
				for (i = 0, il = apiStack.length; i < il; i++) {

					var stackItem = apiStack[i];

					if (stackItem.type === 'set') {
						var propName = stackItem.propName,
						    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

						vimeo['set' + capName](stackItem.value);
					} else if (stackItem.type === 'call') {
						vimeo[stackItem.methodName]();
					}
				}
			}

			var vimeoIframe = _document2.default.getElementById(vimeo.id),
			    events = void 0;

			// a few more events
			events = ['mouseover', 'mouseout'];

			var assignEvents = function assignEvents(e) {
				var event = (0, _dom.createEvent)(e.type, vimeo);
				mediaElement.dispatchEvent(event);
			};

			for (var j in events) {
				var eventName = events[j];
				(0, _dom.addEvent)(vimeoIframe, eventName, assignEvents);
			}

			// Vimeo events
			vimeoPlayer.on('loaded', function () {

				vimeoPlayer.getDuration().then(function (loadProgress) {

					duration = loadProgress;

					if (duration > 0) {
						bufferedTime = duration * loadProgress;
					}

					var event = (0, _dom.createEvent)('loadedmetadata', vimeo);
					mediaElement.dispatchEvent(event);
				})['catch'](function (error) {
					vimeoApi.errorHandler(error, vimeo);
				});
			});

			vimeoPlayer.on('progress', function () {

				paused = vimeo.mediaElement.getPaused();

				vimeoPlayer.getDuration().then(function (loadProgress) {

					duration = loadProgress;

					if (duration > 0) {
						bufferedTime = duration * loadProgress;
					}

					var event = (0, _dom.createEvent)('progress', vimeo);
					mediaElement.dispatchEvent(event);
				})['catch'](function (error) {
					vimeoApi.errorHandler(error, vimeo);
				});
			});
			vimeoPlayer.on('timeupdate', function () {

				paused = vimeo.mediaElement.getPaused();
				ended = false;

				vimeoPlayer.getCurrentTime().then(function (seconds) {
					currentTime = seconds;
				});

				var event = (0, _dom.createEvent)('timeupdate', vimeo);
				mediaElement.dispatchEvent(event);
			});
			vimeoPlayer.on('play', function () {
				paused = false;
				ended = false;

				vimeoPlayer.play()['catch'](function (error) {
					vimeoApi.errorHandler(error, vimeo);
				});

				var event = (0, _dom.createEvent)('play', vimeo);
				mediaElement.dispatchEvent(event);
			});
			vimeoPlayer.on('pause', function () {
				paused = true;
				ended = false;

				vimeoPlayer.pause()['catch'](function (error) {
					vimeoApi.errorHandler(error, vimeo);
				});

				var event = (0, _dom.createEvent)('pause', vimeo);
				mediaElement.dispatchEvent(event);
			});
			vimeoPlayer.on('ended', function () {
				paused = false;
				ended = true;

				var event = (0, _dom.createEvent)('ended', vimeo);
				mediaElement.dispatchEvent(event);
			});

			// give initial events
			events = ['rendererready', 'loadeddata', 'loadedmetadata', 'canplay'];

			for (i = 0, il = events.length; i < il; i++) {
				var event = (0, _dom.createEvent)(events[i], vimeo);
				mediaElement.dispatchEvent(event);
			}
		};

		var height = mediaElement.originalNode.height,
		    width = mediaElement.originalNode.width,
		    vimeoContainer = _document2.default.createElement('iframe'),
		    standardUrl = '//player.vimeo.com/video/' + vimeoApi.getVimeoId(mediaFiles[0].src);

		// Create Vimeo <iframe> markup
		vimeoContainer.setAttribute('id', vimeo.id);
		vimeoContainer.setAttribute('width', width);
		vimeoContainer.setAttribute('height', height);
		vimeoContainer.setAttribute('frameBorder', '0');
		vimeoContainer.setAttribute('src', standardUrl);
		vimeoContainer.setAttribute('webkitallowfullscreen', '');
		vimeoContainer.setAttribute('mozallowfullscreen', '');
		vimeoContainer.setAttribute('allowfullscreen', '');

		mediaElement.originalNode.parentNode.insertBefore(vimeoContainer, mediaElement.originalNode);
		mediaElement.originalNode.style.display = 'none';

		vimeoApi.enqueueIframe({
			iframe: vimeoContainer,
			id: vimeo.id
		});

		vimeo.hide = function () {
			vimeo.pause();
			if (vimeoPlayer) {
				vimeoContainer.style.display = 'none';
			}
		};
		vimeo.setSize = function (width, height) {
			vimeoContainer.setAttribute('width', width);
			vimeoContainer.setAttribute('height', height);
		};
		vimeo.show = function () {
			if (vimeoPlayer) {
				vimeoContainer.style.display = '';
			}
		};

		return vimeo;
	}

};

/**
 * Register Vimeo type based on URL structure
 *
 */
_media.typeChecks.push(function (url) {
	url = url.toLowerCase();
	return url.includes('//player.vimeo') || url.includes('vimeo.com') ? 'video/x-vimeo' : null;
});

_renderer.renderer.add(vimeoIframeRenderer);

},{"2":2,"28":28,"3":3,"30":30,"6":6,"7":7}],26:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _dom = _dereq_(28);

var _media = _dereq_(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * YouTube renderer
 *
 * Uses <iframe> approach and uses YouTube API to manipulate it.
 * Note: IE6-7 don't have postMessage so don't support <iframe> API, and IE8 doesn't fire the onReady event,
 * so it doesn't work - not sure if Google problem or not.
 * @see https://developers.google.com/youtube/iframe_api_reference
 */
var YouTubeApi = {
	/**
  * @type {Boolean}
  */
	isIframeStarted: false,
	/**
  * @type {Boolean}
  */
	isIframeLoaded: false,
	/**
  * @type {Array}
  */
	iframeQueue: [],

	/**
  * Create a queue to prepare the creation of <iframe>
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	enqueueIframe: function enqueueIframe(settings) {

		if (YouTubeApi.isLoaded) {
			YouTubeApi.createIframe(settings);
		} else {
			YouTubeApi.loadIframeApi();
			YouTubeApi.iframeQueue.push(settings);
		}
	},

	/**
  * Load YouTube API script on the header of the document
  *
  */
	loadIframeApi: function loadIframeApi() {
		if (!YouTubeApi.isIframeStarted) {
			var tag = _document2.default.createElement('script');
			tag.src = '//www.youtube.com/player_api';
			var firstScriptTag = _document2.default.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			YouTubeApi.isIframeStarted = true;
		}
	},

	/**
  * Process queue of YouTube <iframe> element creation
  *
  */
	iFrameReady: function iFrameReady() {

		YouTubeApi.isLoaded = true;
		YouTubeApi.isIframeLoaded = true;

		while (YouTubeApi.iframeQueue.length > 0) {
			var settings = YouTubeApi.iframeQueue.pop();
			YouTubeApi.createIframe(settings);
		}
	},

	/**
  * Create a new instance of YouTube API player and trigger a custom event to initialize it
  *
  * @param {Object} settings - an object with settings needed to create <iframe>
  */
	createIframe: function createIframe(settings) {
		return new YT.Player(settings.containerId, settings);
	},

	/**
  * Extract ID from YouTube's URL to be loaded through API
  * Valid URL format(s):
  * - http://www.youtube.com/watch?feature=player_embedded&v=yyWWXSwtPP0
  * - http://www.youtube.com/v/VIDEO_ID?version=3
  * - http://youtu.be/Djd6tPrxc08
  * - http://www.youtube-nocookie.com/watch?feature=player_embedded&v=yyWWXSwtPP0
  *
  * @param {String} url
  * @return {string}
  */
	getYouTubeId: function getYouTubeId(url) {

		var youTubeId = "";

		if (url.indexOf('?') > 0) {
			// assuming: http://www.youtube.com/watch?feature=player_embedded&v=yyWWXSwtPP0
			youTubeId = YouTubeApi.getYouTubeIdFromParam(url);

			// if it's http://www.youtube.com/v/VIDEO_ID?version=3
			if (youTubeId === '') {
				youTubeId = YouTubeApi.getYouTubeIdFromUrl(url);
			}
		} else {
			youTubeId = YouTubeApi.getYouTubeIdFromUrl(url);
		}

		return youTubeId;
	},

	/**
  * Get ID from URL with format: http://www.youtube.com/watch?feature=player_embedded&v=yyWWXSwtPP0
  *
  * @param {String} url
  * @returns {string}
  */
	getYouTubeIdFromParam: function getYouTubeIdFromParam(url) {

		if (url === undefined || url === null || !url.trim().length) {
			return null;
		}

		var youTubeId = '',
		    parts = url.split('?'),
		    parameters = parts[1].split('&');

		for (var i = 0, il = parameters.length; i < il; i++) {
			var paramParts = parameters[i].split('=');
			if (paramParts[0] === 'v') {
				youTubeId = paramParts[1];
				break;
			}
		}

		return youTubeId;
	},

	/**
  * Get ID from URL with formats
  *  - http://www.youtube.com/v/VIDEO_ID?version=3
  *  - http://youtu.be/Djd6tPrxc08
  * @param {String} url
  * @return {?String}
  */
	getYouTubeIdFromUrl: function getYouTubeIdFromUrl(url) {

		if (url === undefined || url === null || !url.trim().length) {
			return null;
		}

		var parts = url.split('?');
		url = parts[0];
		return url.substring(url.lastIndexOf('/') + 1);
	},

	/**
  * Inject `no-cookie` element to URL. Only works with format: http://www.youtube.com/v/VIDEO_ID?version=3
  * @param {String} url
  * @return {?String}
  */
	getYouTubeNoCookieUrl: function getYouTubeNoCookieUrl(url) {
		if (url === undefined || url === null || !url.trim().length || !url.includes('//www.youtube')) {
			return url;
		}

		var parts = url.split('/');
		parts[2] = parts[2].replace('.com', '-nocookie.com');
		return parts.join('/');
	}
};

var YouTubeIframeRenderer = {
	name: 'youtube_iframe',

	options: {
		prefix: 'youtube_iframe',
		/**
   * Custom configuration for YouTube player
   *
   * @see https://developers.google.com/youtube/player_parameters#Parameters
   * @type {Object}
   */
		youtube: {
			autoplay: 0,
			controls: 0,
			disablekb: 1,
			end: 0,
			loop: 0,
			modestbranding: 0,
			playsinline: 0,
			rel: 0,
			showinfo: 0,
			start: 0,
			// custom to inject `-nocookie` element in URL
			nocookie: false
		}
	},

	/**
  * Determine if a specific element type can be played with this render
  *
  * @param {String} type
  * @return {Boolean}
  */
	canPlayType: function canPlayType(type) {
		return ['video/youtube', 'video/x-youtube'].includes(type);
	},

	/**
  * Create the player instance and add all native events/methods/properties as possible
  *
  * @param {MediaElement} mediaElement Instance of mejs.MediaElement already created
  * @param {Object} options All the player configuration options passed through constructor
  * @param {Object[]} mediaFiles List of sources with format: {src: url, type: x/y-z}
  * @return {Object}
  */
	create: function create(mediaElement, options, mediaFiles) {

		// exposed object
		var youtube = {};
		youtube.options = options;
		youtube.id = mediaElement.id + '_' + options.prefix;
		youtube.mediaElement = mediaElement;

		// API objects
		var apiStack = [],
		    youTubeApi = null,
		    youTubeApiReady = false,
		    paused = true,
		    ended = false,
		    youTubeIframe = null,
		    i = void 0,
		    il = void 0;

		// wrappers for get/set
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {

			// add to flash state that we will store

			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			youtube['get' + capName] = function () {
				if (youTubeApi !== null) {
					var value = null;

					// figure out how to get youtube dta here

					var _ret = function () {
						switch (propName) {
							case 'currentTime':
								return {
									v: youTubeApi.getCurrentTime()
								};

							case 'duration':
								return {
									v: youTubeApi.getDuration()
								};

							case 'volume':
								return {
									v: youTubeApi.getVolume()
								};

							case 'paused':
								return {
									v: paused
								};

							case 'ended':
								return {
									v: ended
								};

							case 'muted':
								return {
									v: youTubeApi.isMuted()
								}; // ?

							case 'buffered':
								var percentLoaded = youTubeApi.getVideoLoadedFraction(),
								    duration = youTubeApi.getDuration();
								return {
									v: {
										start: function start() {
											return 0;
										},
										end: function end() {
											return percentLoaded * duration;
										},
										length: 1
									}
								};
							case 'src':
								return {
									v: youTubeApi.getVideoUrl()
								};
						}
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
					return value;
				} else {
					return null;
				}
			};

			youtube['set' + capName] = function (value) {

				if (youTubeApi !== null) {

					// do something
					switch (propName) {

						case 'src':
							var url = typeof value === 'string' ? value : value[0].src,
							    _videoId = YouTubeApi.getYouTubeId(url);

							if (mediaElement.getAttribute('autoplay')) {
								youTubeApi.loadVideoById(_videoId);
							} else {
								youTubeApi.cueVideoById(_videoId);
							}
							break;

						case 'currentTime':
							youTubeApi.seekTo(value);
							break;

						case 'muted':
							if (value) {
								youTubeApi.mute(); // ?
							} else {
								youTubeApi.unMute(); // ?
							}
							setTimeout(function () {
								var event = (0, _dom.createEvent)('volumechange', youtube);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'volume':
							youTubeApi.setVolume(value);
							setTimeout(function () {
								var event = (0, _dom.createEvent)('volumechange', youtube);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						default:
							
					}
				} else {
					// store for after "READY" event fires
					apiStack.push({ type: 'set', propName: propName, value: value });
				}
			};
		};

		for (i = 0, il = props.length; i < il; i++) {
			assignGettersSetters(props[i]);
		}

		// add wrappers for native methods
		var methods = _mejs2.default.html5media.methods,
		    assignMethods = function assignMethods(methodName) {

			// run the method on the native HTMLMediaElement
			youtube[methodName] = function () {

				if (youTubeApi !== null) {

					// DO method
					switch (methodName) {
						case 'play':
							return youTubeApi.playVideo();
						case 'pause':
							return youTubeApi.pauseVideo();
						case 'load':
							return null;

					}
				} else {
					apiStack.push({ type: 'call', methodName: methodName });
				}
			};
		};

		for (i = 0, il = methods.length; i < il; i++) {
			assignMethods(methods[i]);
		}

		// CREATE YouTube
		var youtubeContainer = _document2.default.createElement('div');
		youtubeContainer.id = youtube.id;

		// If `nocookie` feature was enabled, modify original URL
		if (youtube.options.youtube.nocookie) {
			mediaElement.originalNode.setAttribute('src', YouTubeApi.getYouTubeNoCookieUrl(mediaFiles[0].src));
		}

		mediaElement.originalNode.parentNode.insertBefore(youtubeContainer, mediaElement.originalNode);
		mediaElement.originalNode.style.display = 'none';

		var height = mediaElement.originalNode.height,
		    width = mediaElement.originalNode.width,
		    videoId = YouTubeApi.getYouTubeId(mediaFiles[0].src),
		    youtubeSettings = {
			id: youtube.id,
			containerId: youtubeContainer.id,
			videoId: videoId,
			height: height,
			width: width,
			playerVars: Object.assign({
				controls: 0,
				rel: 0,
				disablekb: 1,
				showinfo: 0,
				modestbranding: 0,
				html5: 1,
				playsinline: 0,
				start: 0,
				end: 0
			}, youtube.options.youtube),
			origin: _window2.default.location.host,
			events: {
				onReady: function onReady(e) {

					youTubeApiReady = true;
					mediaElement.youTubeApi = youTubeApi = e.target;
					mediaElement.youTubeState = {
						paused: true,
						ended: false
					};

					// do call stack
					if (apiStack.length) {
						for (i = 0, il = apiStack.length; i < il; i++) {

							var stackItem = apiStack[i];

							if (stackItem.type === 'set') {
								var propName = stackItem.propName,
								    capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

								youtube['set' + capName](stackItem.value);
							} else if (stackItem.type === 'call') {
								youtube[stackItem.methodName]();
							}
						}
					}

					// a few more events
					youTubeIframe = youTubeApi.getIframe();

					var events = ['mouseover', 'mouseout'],
					    assignEvents = function assignEvents(e) {

						var newEvent = (0, _dom.createEvent)(e.type, youtube);
						mediaElement.dispatchEvent(newEvent);
					};

					for (var j in events) {
						(0, _dom.addEvent)(youTubeIframe, events[j], assignEvents);
					}

					// send init events
					var initEvents = ['rendererready', 'loadeddata', 'loadedmetadata', 'canplay'];

					for (i = 0, il = initEvents.length; i < il; i++) {
						var event = (0, _dom.createEvent)(initEvents[i], youtube);
						mediaElement.dispatchEvent(event);
					}
				},
				onStateChange: function onStateChange(e) {

					// translate events
					var events = [];

					switch (e.data) {
						case -1:
							// not started
							events = ['loadedmetadata'];
							paused = true;
							ended = false;
							break;

						case 0:
							// YT.PlayerState.ENDED
							events = ['ended'];
							paused = false;
							ended = true;

							youtube.stopInterval();
							break;

						case 1:
							// YT.PlayerState.PLAYING
							events = ['play', 'playing'];
							paused = false;
							ended = false;

							youtube.startInterval();

							break;

						case 2:
							// YT.PlayerState.PAUSED
							events = ['paused'];
							paused = true;
							ended = false;

							youtube.stopInterval();
							break;

						case 3:
							// YT.PlayerState.BUFFERING
							events = ['progress'];
							paused = false;
							ended = false;

							break;
						case 5:
							// YT.PlayerState.CUED
							events = ['loadeddata', 'loadedmetadata', 'canplay'];
							paused = true;
							ended = false;

							break;
					}

					// send events up
					for (var _i = 0, _il = events.length; _i < _il; _i++) {
						var event = (0, _dom.createEvent)(events[_i], youtube);
						mediaElement.dispatchEvent(event);
					}
				}
			}
		};

		// send it off for async loading and creation
		YouTubeApi.enqueueIframe(youtubeSettings);

		youtube.onEvent = function (eventName, player, _youTubeState) {
			if (_youTubeState !== null && _youTubeState !== undefined) {
				mediaElement.youTubeState = _youTubeState;
			}
		};

		youtube.setSize = function (width, height) {
			if (youTubeApi !== null) {
				youTubeApi.setSize(width, height);
			}
		};
		youtube.hide = function () {
			youtube.stopInterval();
			youtube.pause();
			if (youTubeIframe) {
				youTubeIframe.style.display = 'none';
			}
		};
		youtube.show = function () {
			if (youTubeIframe) {
				youTubeIframe.style.display = '';
			}
		};
		youtube.destroy = function () {
			youTubeApi.destroy();
		};
		youtube.interval = null;

		youtube.startInterval = function () {
			// create timer
			youtube.interval = setInterval(function () {

				var event = (0, _dom.createEvent)('timeupdate', youtube);
				mediaElement.dispatchEvent(event);
			}, 250);
		};
		youtube.stopInterval = function () {
			if (youtube.interval) {
				clearInterval(youtube.interval);
			}
		};

		return youtube;
	}
};

if (_window2.default.postMessage && _typeof(_window2.default.addEventListener)) {

	_window2.default.onYouTubePlayerAPIReady = function () {
		YouTubeApi.iFrameReady();
	};

	_media.typeChecks.push(function (url) {
		url = url.toLowerCase();
		return url.includes('//www.youtube') || url.includes('//youtu.be') ? 'video/x-youtube' : null;
	});

	_renderer.renderer.add(YouTubeIframeRenderer);
}

},{"2":2,"28":28,"3":3,"30":30,"6":6,"7":7}],27:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cancelFullScreen = exports.requestFullScreen = exports.isFullScreen = exports.FULLSCREEN_EVENT_NAME = exports.HAS_NATIVE_FULLSCREEN_ENABLED = exports.HAS_TRUE_NATIVE_FULLSCREEN = exports.HAS_IOS_FULLSCREEN = exports.HAS_MS_NATIVE_FULLSCREEN = exports.HAS_MOZ_NATIVE_FULLSCREEN = exports.HAS_WEBKIT_NATIVE_FULLSCREEN = exports.HAS_NATIVE_FULLSCREEN = exports.SUPPORTS_NATIVE_HLS = exports.SUPPORTS_MEDIA_TAG = exports.SUPPORT_POINTER_EVENTS = exports.HAS_MSE = exports.HAS_TOUCH = exports.IS_STOCK_ANDROID = exports.IS_SAFARI = exports.IS_FIREFOX = exports.IS_CHROME = exports.IS_IE = exports.IS_ANDROID = exports.IS_IOS = exports.IS_IPHONE = exports.IS_IPAD = exports.UA = exports.NAV = undefined;

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NAV = exports.NAV = _window2.default.navigator;
var UA = exports.UA = NAV.userAgent.toLowerCase();

var IS_IPAD = exports.IS_IPAD = UA.match(/ipad/i) !== null;
var IS_IPHONE = exports.IS_IPHONE = UA.match(/iphone/i) !== null;
var IS_IOS = exports.IS_IOS = IS_IPHONE || IS_IPAD;
var IS_ANDROID = exports.IS_ANDROID = UA.match(/android/i) !== null;
var IS_IE = exports.IS_IE = NAV.appName.toLowerCase().includes('microsoft') || NAV.appName.toLowerCase().match(/trident/gi) !== null;
var IS_CHROME = exports.IS_CHROME = UA.match(/chrome/gi) !== null;
var IS_FIREFOX = exports.IS_FIREFOX = UA.match(/firefox/gi) !== null;
var IS_SAFARI = exports.IS_SAFARI = UA.match(/safari/gi) !== null && !IS_CHROME;
var IS_STOCK_ANDROID = exports.IS_STOCK_ANDROID = UA.match(/^mozilla\/\d+\.\d+\s\(linux;\su;/gi) !== null;

var HAS_TOUCH = exports.HAS_TOUCH = !!('ontouchstart' in _window2.default || _window2.default.DocumentTouch && _document2.default instanceof _window2.default.DocumentTouch);
var HAS_MSE = exports.HAS_MSE = 'MediaSource' in _window2.default;
var SUPPORT_POINTER_EVENTS = exports.SUPPORT_POINTER_EVENTS = function () {
	var element = _document2.default.createElement('x'),
	    documentElement = _document2.default.documentElement,
	    getComputedStyle = _window2.default.getComputedStyle,
	    supports = void 0;

	if (!('pointerEvents' in element.style)) {
		return false;
	}

	element.style.pointerEvents = 'auto';
	element.style.pointerEvents = 'x';
	documentElement.appendChild(element);
	supports = getComputedStyle && getComputedStyle(element, '').pointerEvents === 'auto';
	documentElement.removeChild(element);
	return !!supports;
}();

// for IE
var html5Elements = ['source', 'track', 'audio', 'video'],
    video = void 0;

for (var i = 0, il = html5Elements.length; i < il; i++) {
	video = _document2.default.createElement(html5Elements[i]);
}

// Test if Media Source Extensions are supported by browser
var SUPPORTS_MEDIA_TAG = exports.SUPPORTS_MEDIA_TAG = video.canPlayType !== undefined || HAS_MSE;

// Test if browsers support HLS natively (right now Safari, Android's Chrome and Stock browsers, and MS Edge)
var SUPPORTS_NATIVE_HLS = exports.SUPPORTS_NATIVE_HLS = IS_SAFARI || IS_ANDROID && (IS_CHROME || IS_STOCK_ANDROID) || IS_IE && UA.match(/edge/gi) !== null;

// Detect native JavaScript fullscreen (Safari/Firefox only, Chrome still fails)

// iOS
var hasiOSFullScreen = video.webkitEnterFullscreen !== undefined;

// W3C
var hasNativeFullscreen = video.requestFullscreen !== undefined;

// OS X 10.5 can't do this even if it says it can :(
if (hasiOSFullScreen && UA.match(/mac os x 10_5/i)) {
	hasNativeFullscreen = false;
	hasiOSFullScreen = false;
}

// webkit/firefox/IE11+
var hasWebkitNativeFullScreen = video.webkitRequestFullScreen !== undefined;
var hasMozNativeFullScreen = video.mozRequestFullScreen !== undefined;
var hasMsNativeFullScreen = video.msRequestFullscreen !== undefined;

var hasTrueNativeFullScreen = hasWebkitNativeFullScreen || hasMozNativeFullScreen || hasMsNativeFullScreen;
var nativeFullScreenEnabled = hasTrueNativeFullScreen;

var fullScreenEventName = '';
var isFullScreen = void 0,
    requestFullScreen = void 0,
    cancelFullScreen = void 0;

// Enabled?
if (hasMozNativeFullScreen) {
	nativeFullScreenEnabled = _document2.default.mozFullScreenEnabled;
} else if (hasMsNativeFullScreen) {
	nativeFullScreenEnabled = _document2.default.msFullscreenEnabled;
}

if (IS_CHROME) {
	hasiOSFullScreen = false;
}

if (hasTrueNativeFullScreen) {

	if (hasWebkitNativeFullScreen) {
		fullScreenEventName = 'webkitfullscreenchange';
	} else if (hasMozNativeFullScreen) {
		fullScreenEventName = 'mozfullscreenchange';
	} else if (hasMsNativeFullScreen) {
		fullScreenEventName = 'MSFullscreenChange';
	}

	exports.isFullScreen = isFullScreen = function isFullScreen() {
		if (hasMozNativeFullScreen) {
			return _document2.default.mozFullScreen;
		} else if (hasWebkitNativeFullScreen) {
			return _document2.default.webkitIsFullScreen;
		} else if (hasMsNativeFullScreen) {
			return _document2.default.msFullscreenElement !== null;
		}
	};

	exports.requestFullScreen = requestFullScreen = function requestFullScreen(el) {

		if (hasWebkitNativeFullScreen) {
			el.webkitRequestFullScreen();
		} else if (hasMozNativeFullScreen) {
			el.mozRequestFullScreen();
		} else if (hasMsNativeFullScreen) {
			el.msRequestFullscreen();
		}
	};

	exports.cancelFullScreen = cancelFullScreen = function cancelFullScreen() {
		if (hasWebkitNativeFullScreen) {
			_document2.default.webkitCancelFullScreen();
		} else if (hasMozNativeFullScreen) {
			_document2.default.mozCancelFullScreen();
		} else if (hasMsNativeFullScreen) {
			_document2.default.msExitFullscreen();
		}
	};
}

var HAS_NATIVE_FULLSCREEN = exports.HAS_NATIVE_FULLSCREEN = hasNativeFullscreen;
var HAS_WEBKIT_NATIVE_FULLSCREEN = exports.HAS_WEBKIT_NATIVE_FULLSCREEN = hasWebkitNativeFullScreen;
var HAS_MOZ_NATIVE_FULLSCREEN = exports.HAS_MOZ_NATIVE_FULLSCREEN = hasMozNativeFullScreen;
var HAS_MS_NATIVE_FULLSCREEN = exports.HAS_MS_NATIVE_FULLSCREEN = hasMsNativeFullScreen;
var HAS_IOS_FULLSCREEN = exports.HAS_IOS_FULLSCREEN = hasiOSFullScreen;
var HAS_TRUE_NATIVE_FULLSCREEN = exports.HAS_TRUE_NATIVE_FULLSCREEN = hasTrueNativeFullScreen;
var HAS_NATIVE_FULLSCREEN_ENABLED = exports.HAS_NATIVE_FULLSCREEN_ENABLED = nativeFullScreenEnabled;
var FULLSCREEN_EVENT_NAME = exports.FULLSCREEN_EVENT_NAME = fullScreenEventName;

exports.isFullScreen = isFullScreen;
exports.requestFullScreen = requestFullScreen;
exports.cancelFullScreen = cancelFullScreen;


_mejs2.default.Features = _mejs2.default.Features || {};
_mejs2.default.Features.isiPad = IS_IPAD;
_mejs2.default.Features.isiPhone = IS_IPHONE;
_mejs2.default.Features.isiOS = _mejs2.default.Features.isiPhone || _mejs2.default.Features.isiPad;
_mejs2.default.Features.isAndroid = IS_ANDROID;
_mejs2.default.Features.isIE = IS_IE;
_mejs2.default.Features.isChrome = IS_CHROME;
_mejs2.default.Features.isFirefox = IS_FIREFOX;
_mejs2.default.Features.isSafari = IS_SAFARI;
_mejs2.default.Features.isStockAndroid = IS_STOCK_ANDROID;
_mejs2.default.Features.hasTouch = HAS_TOUCH;
_mejs2.default.Features.hasMSE = HAS_MSE;
_mejs2.default.Features.supportsMediaTag = SUPPORTS_MEDIA_TAG;
_mejs2.default.Features.supportsNativeHLS = SUPPORTS_NATIVE_HLS;

_mejs2.default.Features.supportsPointerEvents = SUPPORT_POINTER_EVENTS;
_mejs2.default.Features.hasiOSFullScreen = HAS_IOS_FULLSCREEN;
_mejs2.default.Features.hasNativeFullscreen = HAS_NATIVE_FULLSCREEN;
_mejs2.default.Features.hasWebkitNativeFullScreen = HAS_WEBKIT_NATIVE_FULLSCREEN;
_mejs2.default.Features.hasMozNativeFullScreen = HAS_MOZ_NATIVE_FULLSCREEN;
_mejs2.default.Features.hasMsNativeFullScreen = HAS_MS_NATIVE_FULLSCREEN;
_mejs2.default.Features.hasTrueNativeFullScreen = HAS_TRUE_NATIVE_FULLSCREEN;
_mejs2.default.Features.nativeFullScreenEnabled = HAS_NATIVE_FULLSCREEN_ENABLED;
_mejs2.default.Features.fullScreenEventName = FULLSCREEN_EVENT_NAME;
_mejs2.default.Features.isFullScreen = isFullScreen;
_mejs2.default.Features.requestFullScreen = requestFullScreen;
_mejs2.default.Features.cancelFullScreen = cancelFullScreen;

},{"2":2,"3":3,"6":6}],28:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createEvent = createEvent;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.isNodeAfter = isNodeAfter;

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {string} eventName
 * @param {*} target
 * @return {Event|Object}
 */
function createEvent(eventName, target) {

	if (typeof eventName !== 'string') {
		throw new Error('Event name must be a string');
	}

	var event = void 0;

	if (_document2.default.createEvent) {
		event = _document2.default.createEvent('Event');
		event.initEvent(eventName, true, false);
	} else {
		event = {};
		event.type = eventName;
		event.target = target;
		event.canceleable = true;
		event.bubbable = false;
	}

	return event;
}

/**
 *
 * @param {Object} obj
 * @param {String} type
 * @param {Function} fn
 */
function addEvent(obj, type, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(type, fn, false);
	} else if (obj.attachEvent) {
		obj['e' + type + fn] = fn;
		obj['' + type + fn] = function () {
			obj['e' + type + fn](window.event);
		};
		obj.attachEvent('on' + type, obj['' + type + fn]);
	}
}

/**
 *
 * @param {Object} obj
 * @param {String} type
 * @param {Function} fn
 */
function removeEvent(obj, type, fn) {

	if (obj.removeEventListener) {
		obj.removeEventListener(type, fn, false);
	} else if (obj.detachEvent) {
		obj.detachEvent('on' + type, obj['' + type + fn]);
		obj['' + type + fn] = null;
	}
}

/**
 * Returns true if targetNode appears after sourceNode in the dom.
 * @param {HTMLElement} sourceNode - the source node for comparison
 * @param {HTMLElement} targetNode - the node to compare against sourceNode
 */
function isNodeAfter(sourceNode, targetNode) {
	return !!(sourceNode && targetNode && sourceNode.compareDocumentPosition(targetNode) && Node.DOCUMENT_POSITION_PRECEDING);
}

_mejs2.default.Utils = _mejs2.default.Utils || {};
_mejs2.default.Utils.createEvent = createEvent;
_mejs2.default.Utils.removeEvent = removeEvent;
_mejs2.default.Utils.isNodeAfter = isNodeAfter;

},{"2":2,"6":6}],29:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.escapeHTML = escapeHTML;
exports.debounce = debounce;
exports.isObjectEmpty = isObjectEmpty;
exports.splitEvents = splitEvents;
exports.getElementsByClassName = getElementsByClassName;

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {String} input
 * @return {string}
 */
function escapeHTML(input) {

	if (typeof input !== 'string') {
		throw new Error('Argument passed must be a string');
	}

	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;'
	};

	return input.replace(/[&<>"]/g, function (c) {
		return map[c];
	});
}

// taken from underscore
function debounce(func, wait) {
	var _this = this,
	    _arguments = arguments;

	var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


	if (typeof func !== 'function') {
		throw new Error('First argument must be a function');
	}

	if (typeof wait !== 'number') {
		throw new Error('Second argument must be a numeric value');
	}

	var timeout = void 0;
	return function () {
		var context = _this,
		    args = _arguments;
		var later = function later() {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args);
		}
	};
}

/**
 * Determine if an object contains any elements
 *
 * @see http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
 * @param {Object} instance
 * @return {Boolean}
 */
function isObjectEmpty(instance) {
	return Object.getOwnPropertyNames(instance).length <= 0;
}

function splitEvents(events, id) {
	var rwindow = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
	// add player ID as an event namespace so it's easier to unbind them all later
	var ret = { d: [], w: [] };
	(events || '').split(' ').forEach(function (v) {
		var eventName = v + '.' + id;

		if (eventName.startsWith('.')) {
			ret.d.push(eventName);
			ret.w.push(eventName);
		} else {
			ret[rwindow.test(v) ? 'w' : 'd'].push(eventName);
		}
	});

	ret.d = ret.d.join(' ');
	ret.w = ret.w.join(' ');
	return ret;
}

/**
 *
 * @param {String} className
 * @param {HTMLElement} node
 * @param {String} tag
 * @return {HTMLElement[]}
 */
function getElementsByClassName(className, node, tag) {

	if (node === undefined || node === null) {
		node = _document2.default;
	}
	if (node.getElementsByClassName !== undefined && node.getElementsByClassName !== null) {
		return node.getElementsByClassName(className);
	}
	if (tag === undefined || tag === null) {
		tag = '*';
	}

	var classElements = [],
	    j = 0,
	    teststr = void 0,
	    els = node.getElementsByTagName(tag),
	    elsLen = els.length;

	for (i = 0; i < elsLen; i++) {
		if (els[i].className.indexOf(className) > -1) {
			teststr = ',' + els[i].className.split(' ').join(',') + ',';
			if (teststr.indexOf(',' + className + ',') > -1) {
				classElements[j] = els[i];
				j++;
			}
		}
	}

	return classElements;
}

_mejs2.default.Utils = _mejs2.default.Utils || {};
_mejs2.default.Utils.escapeHTML = escapeHTML;
_mejs2.default.Utils.debounce = debounce;
_mejs2.default.Utils.isObjectEmpty = isObjectEmpty;
_mejs2.default.Utils.splitEvents = splitEvents;
_mejs2.default.Utils.getElementsByClassName = getElementsByClassName;

},{"2":2,"6":6}],30:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.typeChecks = undefined;
exports.absolutizeUrl = absolutizeUrl;
exports.formatType = formatType;
exports.getMimeFromType = getMimeFromType;
exports.getTypeFromFile = getTypeFromFile;
exports.getExtension = getExtension;
exports.normalizeExtension = normalizeExtension;

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _general = _dereq_(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeChecks = exports.typeChecks = [];

/**
 *
 * @param {String} url
 * @return {String}
 */
function absolutizeUrl(url) {

	if (typeof url !== 'string') {
		throw new Error('`url` argument must be a string');
	}

	var el = document.createElement('div');
	el.innerHTML = '<a href="' + (0, _general.escapeHTML)(url) + '">x</a>';
	return el.firstChild.href;
}

/**
 * Get the format of a specific media, based on URL and additionally its mime type
 *
 * @param {String} url
 * @param {String} type
 * @return {String}
 */
function formatType(url) {
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	return url && !type ? getTypeFromFile(url) : getMimeFromType(type);
}

/**
 * Return the mime part of the type in case the attribute contains the codec
 * (`video/mp4; codecs="avc1.42E01E, mp4a.40.2"` becomes `video/mp4`)
 *
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html#the-source-element
 * @param {String} type
 * @return {String}
 */
function getMimeFromType(type) {

	if (typeof type !== 'string') {
		throw new Error('`type` argument must be a string');
	}

	return type && ~type.indexOf(';') ? type.substr(0, type.indexOf(';')) : type;
}

/**
 * Get the type of media based on URL structure
 *
 * @param {String} url
 * @return {String}
 */
function getTypeFromFile(url) {

	if (typeof url !== 'string') {
		throw new Error('`url` argument must be a string');
	}

	var type = void 0;

	// Validate `typeChecks` array
	if (!Array.isArray(typeChecks)) {
		throw new Error('`typeChecks` must be an array');
	}

	if (typeChecks.length) {
		for (var i = 0, total = typeChecks.length; i < total; i++) {
			var _type = typeChecks[i];

			if (typeof _type !== 'function') {
				throw new Error('Element in array must be a function');
			}
		}
	}

	// do type checks first
	for (var _i = 0, _total = typeChecks.length; _i < _total; _i++) {

		type = typeChecks[_i](url);

		if (type !== undefined && type !== null) {
			return type;
		}
	}

	// the do standard extension check
	var ext = getExtension(url),
	    normalizedExt = normalizeExtension(ext);

	return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(ext) ? 'video' : 'audio') + '/' + normalizedExt;
}

/**
 * Get media file extension from URL
 *
 * @param {String} url
 * @return {String}
 */
function getExtension(url) {

	if (typeof url !== 'string') {
		throw new Error('`url` argument must be a string');
	}

	var baseUrl = url.split('?')[0];

	return ~baseUrl.indexOf('.') ? baseUrl.substring(baseUrl.lastIndexOf('.') + 1) : '';
}

/**
 * Get standard extension of a media file
 *
 * @param {String} extension
 * @return {String}
 */
function normalizeExtension(extension) {

	if (typeof extension !== 'string') {
		throw new Error('`extension` argument must be a string');
	}

	switch (extension) {
		case 'mp4':
		case 'm4v':
			return 'mp4';
		case 'webm':
		case 'webma':
		case 'webmv':
			return 'webm';
		case 'ogg':
		case 'oga':
		case 'ogv':
			return 'ogg';
		default:
			return extension;
	}
}

_mejs2.default.Utils = _mejs2.default.Utils || {};
_mejs2.default.Utils.absolutizeUrl = absolutizeUrl;
_mejs2.default.Utils.formatType = formatType;
_mejs2.default.Utils.getMimeFromType = getMimeFromType;
_mejs2.default.Utils.getTypeFromFile = getTypeFromFile;
_mejs2.default.Utils.getExtension = getExtension;
_mejs2.default.Utils.normalizeExtension = normalizeExtension;

},{"29":29,"6":6}],31:[function(_dereq_,module,exports){
'use strict';

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Polyfill
 *
 * Mimics the missing methods like Object.assign, Array.includes, etc., as a way to avoid including the whole list
 * of polyfills provided by Babel.
 */

// IE6,7,8
// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement, fromIndex) {

		var k = void 0;

		// 1. Let O be the result of calling ToObject passing
		//	   the this value as the argument.
		if (undefined === undefined || undefined === null) {
			throw new TypeError('"this" is null or not defined');
		}

		var O = Object(undefined);

		// 2. Let lenValue be the result of calling the Get
		//	   internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If len is 0, return -1.
		if (len === 0) {
			return -1;
		}

		// 5. If argument fromIndex was passed let n be
		//	   ToInteger(fromIndex); else let n be 0.
		var n = +fromIndex || 0;

		if (Math.abs(n) === Infinity) {
			n = 0;
		}

		// 6. If n >= len, return -1.
		if (n >= len) {
			return -1;
		}

		// 7. If n >= 0, then Let k be n.
		// 8. Else, n<0, Let k be len - abs(n).
		//	   If k is less than 0, then let k be 0.
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

		// 9. Repeat, while k < len
		while (k < len) {
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the
			//	HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			//	i.	Let elementK be the result of calling the Get
			//		internal method of O with the argument ToString(k).
			//   ii.	Let same be the result of applying the
			//		Strict Equality Comparison Algorithm to
			//		searchElement and elementK.
			//  iii.	If same is true, return k.
			if (k in O && O[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
}

// document.createEvent for IE8 or other old browsers that do not implement it
// Reference: https://github.com/WebReflection/ie8/blob/master/build/ie8.max.js
if (_document2.default.createEvent === undefined) {
	_document2.default.createEvent = function () {

		var e = void 0;

		e = _document2.default.createEventObject();
		e.timeStamp = new Date().getTime();
		e.enumerable = true;
		e.writable = true;
		e.configurable = true;

		e.initEvent = function (type, bubbles, cancelable) {
			undefined.type = type;
			undefined.bubbles = !!bubbles;
			undefined.cancelable = !!cancelable;
			if (!undefined.bubbles) {
				undefined.stopPropagation = function () {
					undefined.stoppedPropagation = true;
					undefined.cancelBubble = true;
				};
			}
		};

		return e;
	};
}

// Object.assign polyfill
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
if (typeof Object.assign !== 'function') {
	Object.assign = function (target, varArgs) {
		// .length of function is 2

		'use strict';

		if (target === null || target === undefined) {
			// TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var to = Object(target);

		for (var index = 1; index < arguments.length; index++) {
			var nextSource = arguments[index];

			if (nextSource !== null) {
				// Skip over if undefined or null
				for (var nextKey in nextSource) {
					// Avoid bugs when hasOwnProperty is shadowed
					if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
		}
		return to;
	};
}

// Array.includes polyfill
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Polyfill
if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
		value: function value(searchElement, fromIndex) {

			// 1. Let O be ? ToObject(this value).
			if (this === null || this === undefined) {
				throw new TypeError('"this" is null or not defined');
			}

			var o = Object(this);

			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If len is 0, return false.
			if (len === 0) {
				return false;
			}

			// 4. Let n be ? ToInteger(fromIndex).
			//    (If fromIndex is undefined, this step produces the value 0.)
			var n = fromIndex | 0;

			// 5. If n ≥ 0, then
			//  a. Let k be n.
			// 6. Else n < 0,
			//  a. Let k be len + n.
			//  b. If k < 0, let k be 0.
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

			// 7. Repeat, while k < len
			while (k < len) {
				// a. Let elementK be the result of ? Get(O, ! ToString(k)).
				// b. If SameValueZero(searchElement, elementK) is true, return true.
				// c. Increase k by 1.
				// NOTE: === provides the correct "SameValueZero" comparison needed here.
				if (o[k] === searchElement) {
					return true;
				}
				k++;
			}

			// 8. Return false
			return false;
		}
	});
}

if (!String.prototype.includes) {
	String.prototype.includes = function () {
		return String.prototype.indexOf.apply(this, arguments) !== -1;
	};
}

// String.startsWith polyfill
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#Polyfill
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function (searchString, position) {
		position = position || 0;
		return this.substr(position, searchString.length) === searchString;
	};
}

},{"2":2}],32:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.secondsToTimeCode = secondsToTimeCode;
exports.timeCodeToSeconds = timeCodeToSeconds;
exports.calculateTimeFormat = calculateTimeFormat;
exports.convertSMPTEtoSeconds = convertSMPTEtoSeconds;

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Format a numeric time in format '00:00:00'
 *
 * @param {Number} time - Ideally a number, but if not or less than zero, is defaulted to zero
 * @param {Boolean} forceHours
 * @param {Boolean} showFrameCount
 * @param {Number} fps - Frames per second
 * @return {String}
 */
function secondsToTimeCode(time) {
	var forceHours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	var showFrameCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	var fps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 25;


	time = !time || typeof time !== 'number' || time < 0 ? 0 : time;

	var hours = Math.floor(time / 3600) % 24;
	var minutes = Math.floor(time / 60) % 60;
	var seconds = Math.floor(time % 60);
	var frames = Math.floor((time % 1 * fps).toFixed(3));

	hours = hours <= 0 ? 0 : hours;
	minutes = minutes <= 0 ? 0 : minutes;
	seconds = seconds <= 0 ? 0 : seconds;

	var result = forceHours || hours > 0 ? (hours < 10 ? '0' + hours : hours) + ':' : '';
	result += (minutes < 10 ? '0' + minutes : minutes) + ':';
	result += '' + (seconds < 10 ? '0' + seconds : seconds);
	result += '' + (showFrameCount ? ':' + (frames < 10 ? '0' + frames : frames) : '');

	return result;
}

/**
 * Convert a '00:00:00' time string into seconds
 *
 * @param {String} time
 * @param {Boolean} showFrameCount
 * @param {Number} fps - Frames per second
 * @return {Number}
 */
function timeCodeToSeconds(time) {
	var showFrameCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	var fps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 25;


	if (typeof time !== 'string') {
		throw new TypeError('Time must be a string');
	}

	if (!time.match(/\d{2}(\:\d{2}){0,3}/)) {
		throw new TypeError('Time code must have the format `00:00:00`');
	}

	var parts = time.split(':'),
	    hours = 0,
	    minutes = 0,
	    frames = 0,
	    seconds = 0,
	    output = void 0;

	switch (parts.length) {
		default:
		case 1:
			seconds = parseInt(parts[0], 10);
			break;
		case 2:
			minutes = parseInt(parts[0], 10);
			seconds = parseInt(parts[1], 10);
			break;
		case 3:
		case 4:
			hours = parseInt(parts[0], 10);
			minutes = parseInt(parts[1], 10);
			seconds = parseInt(parts[2], 10);
			frames = showFrameCount ? parseInt(parts[3]) / fps : 0;
			break;

	}

	output = hours * 3600 + minutes * 60 + seconds + frames;
	return parseFloat(output.toFixed(3));
}

/**
 * Calculate the time format to use
 *
 * There is a default format set in the options but it can be incomplete, so it is adjusted according to the media
 * duration. Format: 'hh:mm:ss:ff'
 * @param {*} time - Ideally a number, but if not or less than zero, is defaulted to zero
 * @param {Object} options
 * @param {Number} fps - Frames per second
 */
function calculateTimeFormat(time, options) {
	var fps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 25;


	time = !time || typeof time !== 'number' || time < 0 ? 0 : time;

	var required = false,
	    format = options.timeFormat,
	    firstChar = format[0],
	    firstTwoPlaces = format[1] === format[0],
	    separatorIndex = firstTwoPlaces ? 2 : 1,
	    separator = format.length < separatorIndex ? format[separatorIndex] : ':',
	    hours = Math.floor(time / 3600) % 24,
	    minutes = Math.floor(time / 60) % 60,
	    seconds = Math.floor(time % 60),
	    frames = Math.floor((time % 1 * fps).toFixed(3)),
	    lis = [[frames, 'f'], [seconds, 's'], [minutes, 'm'], [hours, 'h']];

	for (var i = 0, len = lis.length; i < len; i++) {
		if (format.indexOf(lis[i][1]) > -1) {
			required = true;
		} else if (required) {
			var hasNextValue = false;
			for (var j = i; j < len; j++) {
				if (lis[j][0] > 0) {
					hasNextValue = true;
					break;
				}
			}

			if (!hasNextValue) {
				break;
			}

			if (!firstTwoPlaces) {
				format = firstChar + format;
			}
			format = lis[i][1] + separator + format;
			if (firstTwoPlaces) {
				format = lis[i][1] + format;
			}
			firstChar = lis[i][1];
		}
	}

	options.currentTimeFormat = format;
}

/**
 * Convert Society of Motion Picture and Television Engineers (SMTPE) time code into seconds
 *
 * @param {String} SMPTE
 * @return {Number}
 */
function convertSMPTEtoSeconds(SMPTE) {

	if (typeof SMPTE !== 'string') {
		throw new TypeError('Argument must be a string value');
	}

	SMPTE = SMPTE.replace(',', '.');

	var secs = 0,
	    decimalLen = SMPTE.indexOf('.') > -1 ? SMPTE.split('.')[1].length : 0,
	    multiplier = 1;

	SMPTE = SMPTE.split(':').reverse();

	for (var i = 0; i < SMPTE.length; i++) {
		multiplier = 1;
		if (i > 0) {
			multiplier = Math.pow(60, i);
		}
		secs += Number(SMPTE[i]) * multiplier;
	}
	return Number(secs.toFixed(decimalLen));
}

_mejs2.default.Utils = _mejs2.default.Utils || {};
_mejs2.default.Utils.secondsToTimeCode = secondsToTimeCode;
_mejs2.default.Utils.timeCodeToSeconds = timeCodeToSeconds;
_mejs2.default.Utils.calculateTimeFormat = calculateTimeFormat;
_mejs2.default.Utils.convertSMPTEtoSeconds = convertSMPTEtoSeconds;

},{"6":6}]},{},[31,5,4,14,23,20,17,18,19,21,22,24,25,26,15,16,8,9,10,11,12,13]);
