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
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

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
},{"min-document":1}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mejs = require('./mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _en = require('../languages/en');

var _general = require('../utils/general');

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

},{"../languages/en":8,"../utils/general":21,"./mejs":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('./mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _media = require('../utils/media');

var _renderer = require('./renderer');

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
					return t.mediaElement.renderer['get' + capName]();
				},
				    setFn = function setFn(value) {
					t.mediaElement.renderer['set' + capName](value);
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
		return t.mediaElement.renderer.getSrc();
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

			return typeof t.mediaElement.renderer[methodName] === 'function' ? t.mediaElement.renderer[methodName](args) : null;
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

},{"../utils/media":22,"./mejs":6,"./renderer":7,"global/document":2,"global/window":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Namespace
var mejs = {};

// version number
mejs.version = '3.0.0';

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

},{"global/window":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderer = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mejs = require('./mejs');

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

},{"./mejs":6}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = require('../core/renderer');

var _dom = require('../utils/dom');

var _media = require('../utils/media');

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

},{"../core/mejs":6,"../core/renderer":7,"../utils/dom":20,"../utils/media":22,"global/document":2,"global/window":3}],10:[function(require,module,exports){
'use strict';

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = require('../core/renderer');

var _dom = require('../utils/dom');

var _media = require('../utils/media');

var _constants = require('../utils/constants');

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
	name: 'native_mdash',

	options: {
		prefix: 'native_mdash',
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

},{"../core/mejs":6,"../core/renderer":7,"../utils/constants":19,"../utils/dom":20,"../utils/media":22,"global/document":2,"global/window":3}],11:[function(require,module,exports){
'use strict';

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = require('../core/renderer');

var _general = require('../utils/general');

var _dom = require('../utils/dom');

var _media = require('../utils/media');

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

},{"../core/mejs":6,"../core/renderer":7,"../utils/dom":20,"../utils/general":21,"../utils/media":22,"global/document":2,"global/window":3}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PluginDetector = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _i18n = require('../core/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _renderer = require('../core/renderer');

var _dom = require('../utils/dom');

var _constants = require('../utils/constants');

var _media = require('../utils/media');

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
		} else if (url.includes('.m3u8')) {
			return 'application/x-mpegURL';
		} else if (url.includes('.mpd')) {
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
			return hasFlash && ['application/x-mpegurl', 'vnd.apple.mpegurl', 'audio/mpegurl', 'audio/hls', 'video/hls'].includes(type.toLowerCase());
		},

		create: FlashMediaElementRenderer.create
	};
	_renderer.renderer.add(FlashMediaElementHlsVideoRenderer);

	// M(PEG)-DASH
	var FlashMediaElementMdashVideoRenderer = {
		name: 'flash_mdash',

		options: {
			prefix: 'flash_mdash',
			filename: 'mediaelement-flash-video-mdash.swf'
		},
		/**
   * Determine if a specific element type can be played with this render
   *
   * @param {String} type
   * @return {Boolean}
   */
		canPlayType: function canPlayType(type) {
			return hasFlash && ['application/dash+xml'].includes(type);
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

},{"../core/i18n":4,"../core/mejs":6,"../core/renderer":7,"../utils/constants":19,"../utils/dom":20,"../utils/media":22,"global/document":2,"global/window":3}],13:[function(require,module,exports){
'use strict';

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = require('../core/renderer');

var _dom = require('../utils/dom');

var _constants = require('../utils/constants');

var _media = require('../utils/media');

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

},{"../core/mejs":6,"../core/renderer":7,"../utils/constants":19,"../utils/dom":20,"../utils/media":22,"global/document":2,"global/window":3}],14:[function(require,module,exports){
'use strict';

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = require('../core/renderer');

var _dom = require('../utils/dom');

var _constants = require('../utils/constants');

var _media = require('../utils/media');

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

},{"../core/mejs":6,"../core/renderer":7,"../utils/constants":19,"../utils/dom":20,"../utils/media":22,"global/document":2,"global/window":3}],15:[function(require,module,exports){
'use strict';

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = require('../core/renderer');

var _dom = require('../utils/dom');

var _constants = require('../utils/constants');

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
		if (_constants.IS_ANDROID && type.match(/\/mp(3|4)$/gi) !== null || _constants.SUPPORTS_NATIVE_HLS) {
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

},{"../core/mejs":6,"../core/renderer":7,"../utils/constants":19,"../utils/dom":20,"global/document":2,"global/window":3}],16:[function(require,module,exports){
'use strict';

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = require('../core/renderer');

var _dom = require('../utils/dom');

var _media = require('../utils/media');

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

},{"../core/mejs":6,"../core/renderer":7,"../utils/dom":20,"../utils/media":22,"global/document":2,"global/window":3}],17:[function(require,module,exports){
'use strict';

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = require('../core/renderer');

var _dom = require('../utils/dom');

var _media = require('../utils/media');

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

},{"../core/mejs":6,"../core/renderer":7,"../utils/dom":20,"../utils/media":22,"global/document":2,"global/window":3}],18:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = require('../core/renderer');

var _dom = require('../utils/dom');

var _media = require('../utils/media');

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
			nocookie: true
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

},{"../core/mejs":6,"../core/renderer":7,"../utils/dom":20,"../utils/media":22,"global/document":2,"global/window":3}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cancelFullScreen = exports.requestFullScreen = exports.isFullScreen = exports.FULLSCREEN_EVENT_NAME = exports.HAS_NATIVE_FULLSCREEN_ENABLED = exports.HAS_TRUE_NATIVE_FULLSCREEN = exports.HAS_IOS_FULLSCREEN = exports.HAS_MS_NATIVE_FULLSCREEN = exports.HAS_MOZ_NATIVE_FULLSCREEN = exports.HAS_WEBKIT_NATIVE_FULLSCREEN = exports.HAS_NATIVE_FULLSCREEN = exports.SUPPORTS_NATIVE_HLS = exports.SUPPORTS_MEDIA_TAG = exports.SUPPORT_POINTER_EVENTS = exports.HAS_MSE = exports.HAS_TOUCH = exports.IS_STOCK_ANDROID = exports.IS_SAFARI = exports.IS_FIREFOX = exports.IS_CHROME = exports.IS_IE = exports.IS_ANDROID = exports.IS_IOS = exports.IS_IPHONE = exports.IS_IPAD = exports.UA = exports.NAV = undefined;

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

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

},{"../core/mejs":6,"global/document":2,"global/window":3}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createEvent = createEvent;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.isNodeAfter = isNodeAfter;

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

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

},{"../core/mejs":6,"global/document":2}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.escapeHTML = escapeHTML;
exports.debounce = debounce;
exports.isObjectEmpty = isObjectEmpty;
exports.splitEvents = splitEvents;
exports.getElementsByClassName = getElementsByClassName;

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _mejs = require('../core/mejs');

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

},{"../core/mejs":6,"global/document":2}],22:[function(require,module,exports){
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

var _mejs = require('../core/mejs');

var _mejs2 = _interopRequireDefault(_mejs);

var _general = require('./general');

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

},{"../core/mejs":6,"./general":21}],23:[function(require,module,exports){
'use strict';

var _document = require('global/document');

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

},{"global/document":2}]},{},[23,5,4,8,15,12,9,10,11,13,14,16,17,18]);
