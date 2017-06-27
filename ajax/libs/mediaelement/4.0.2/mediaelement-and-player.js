/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

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

var _general = _dereq_(25);

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

},{"14":14,"25":25,"6":6}],5:[function(_dereq_,module,exports){
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

var _general = _dereq_(25);

var _media = _dereq_(26);

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
		pluginPath: 'build/',
		/**
   * Flag in `<object>` and `<embed>` to determine whether to use local or CDN
   * Possible values: 'always' (CDN version) or 'sameDomain' (local files)
   */
		shimScriptAccess: 'sameDomain',
		/**
   * If error happens, set up HTML message
   * @type {String}
   */
		customError: ''
	};

	options = Object.assign(t.defaults, options);

	// create our node (note: older versions of iOS don't support Object.defineProperty on DOM nodes)
	t.mediaElement = _document2.default.createElement(options.fakeNodeName);
	t.mediaElement.options = options;

	var id = idOrNode,
	    error = false;

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

		// to avoid some issues with Javascript interactions in the plugin, set `preload=none` if not set
		// only if video/audio tags are detected
		var tagName = t.mediaElement.originalNode.tagName.toLowerCase();
		if (['video', 'audio'].includes(tagName) && !t.mediaElement.originalNode.getAttribute('preload')) {
			t.mediaElement.originalNode.setAttribute('preload', 'none');
		}

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
		for (var i = 0, total = rendererArray.length; i < total; i++) {

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

	/**
  *
  * @param {Object[]} urlList
  */
	t.mediaElement.createErrorMessage = function (urlList) {

		urlList = Array.isArray(urlList) ? urlList : [];

		var errorContainer = _document2.default.createElement('div');
		errorContainer.className = 'me_cannotplay';
		errorContainer.style.width = '100%';
		errorContainer.style.height = '100%';

		var errorContent = t.mediaElement.options.customError;

		if (!errorContent) {

			var poster = t.mediaElement.originalNode.getAttribute('poster');
			if (poster) {
				errorContent += '<img src="' + poster + '" width="100%" height="100%" alt="' + _mejs2.default.i18n.t('mejs.download-file') + '">';
			}

			for (var i = 0, total = urlList.length; i < total; i++) {
				var url = urlList[i];
				errorContent += '<a href="' + url.src + '" data-type="' + url.type + '"><span>' + _mejs2.default.i18n.t('mejs.download-file') + ': ' + url.src + '</span></a>';
			}
		}

		errorContainer.innerHTML = errorContent;

		t.mediaElement.originalNode.parentNode.insertBefore(errorContainer, t.mediaElement.originalNode);
		t.mediaElement.originalNode.style.display = 'none';
		error = true;
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

		Object.defineProperty(obj, name, {
			get: getFn,
			set: setFn
		});
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
			for (var i = 0, total = value.length; i < total; i++) {

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
		if (!t.mediaElement.paused) {
			t.mediaElement.pause();
			event = (0, _general.createEvent)('pause', t.mediaElement);
			t.mediaElement.dispatchEvent(event);
		}

		t.mediaElement.originalNode.setAttribute('src', mediaFiles[0].src || '');

		if (t.mediaElement.querySelector('.me_cannotplay')) {
			t.mediaElement.querySelector('.me_cannotplay').remove();
		}

		// did we find a renderer?
		if (renderInfo === null) {
			t.mediaElement.createErrorMessage(mediaFiles);
			event = (0, _general.createEvent)('error', t.mediaElement);
			event.message = 'No renderer found';
			t.mediaElement.dispatchEvent(event);
			return;
		}

		// turn on the renderer (this checks for the existing renderer already)
		t.mediaElement.changeRenderer(renderInfo.rendererName, mediaFiles);

		if (t.mediaElement.renderer === undefined || t.mediaElement.renderer === null) {
			event = (0, _general.createEvent)('error', t.mediaElement);
			event.message = 'Error creating renderer';
			t.mediaElement.dispatchEvent(event);
			t.mediaElement.createErrorMessage(mediaFiles);
			return;
		}
	},
	    assignMethods = function assignMethods(methodName) {
		// run the method on the current renderer
		t.mediaElement[methodName] = function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			if (t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null && typeof t.mediaElement.renderer[methodName] === 'function') {
				try {
					t.mediaElement.renderer[methodName](args);
				} catch (e) {
					t.mediaElement.createErrorMessage();
				}
			}
			return null;
		};
	};

	// Assign all methods/properties/events to fake node if renderer was found
	addProperty(t.mediaElement, 'src', getSrc, setSrc);
	t.mediaElement.getSrc = getSrc;
	t.mediaElement.setSrc = setSrc;

	for (var i = 0, total = props.length; i < total; i++) {
		assignGettersSetters(props[i]);
	}

	for (var _i = 0, _total = methods.length; _i < _total; _i++) {
		assignMethods(methods[_i]);
	}

	// IE && iOS
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
		for (var _i2 = 0; _i2 < callbacks.length; _i2++) {
			if (callbacks[_i2] === callback) {
				t.mediaElement.events[eventName].splice(_i2, 1);
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
			for (var _i3 = 0; _i3 < callbacks.length; _i3++) {
				callbacks[_i3].apply(null, [event]);
			}
		}
	};

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
				for (var _i4 = 0; _i4 < sources; _i4++) {
					n = t.mediaElement.originalNode.childNodes[_i4];
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

	if (error && t.mediaElement.options.error) {
		t.mediaElement.options.error(t.mediaElement, t.mediaElement.originalNode);
	}

	return t.mediaElement;
};

_window2.default.MediaElement = MediaElement;

exports.default = MediaElement;

},{"2":2,"25":25,"26":26,"3":3,"6":6,"7":7}],6:[function(_dereq_,module,exports){
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
mejs.version = '4.0.2';

// Basic HTML5 settings
mejs.html5media = {
	/**
  * @type {String[]}
  */
	properties: [
	// GET/SET
	'volume', 'src', 'currentTime', 'muted',

	// GET only
	'duration', 'paused', 'ended', 'buffered', 'error', 'networkState', 'readyState', 'seeking', 'seekable',

	// OTHERS
	'currentSrc', 'preload', 'bufferedBytes', 'bufferedTime', 'initialTime', 'startOffsetTime', 'defaultPlaybackRate', 'playbackRate', 'played', 'autoplay', 'loop', 'controls'],
	readOnlyProperties: ['duration', 'paused', 'ended', 'buffered', 'error', 'networkState', 'readyState', 'seeking', 'seekable'],
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


			var renderersLength = renderers.length;

			renderers = renderers.length ? renderers : this.order;

			// If renderers are not set, set a default order:
			// 1) Native renderers (HTML5, HLS, M(PEG)-DASH, FLV)
			// 2) Flash shims (RTMP, FLV, HLS, M(PEG)-DASH, MP3, OGG)
			// 3) Iframe renderers (YouTube, SoundCloud, Facebook. etc.)
			if (!renderersLength) {
				(function () {
					var rendererIndicator = [/^(html5|native)/, /^flash/, /iframe$/],
					    rendererRanking = function rendererRanking(renderer) {
						for (var i = 0, total = rendererIndicator.length; i < total; i++) {
							if (renderer.match(rendererIndicator[i]) !== null) {
								return i;
							}
						}
						return rendererIndicator.length;
					};

					renderers.sort(function (a, b) {
						return rendererRanking(a) - rendererRanking(b);
					});
				})();
			}

			for (var i = 0, total = renderers.length; i < total; i++) {
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

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _constants = _dereq_(23);

var Features = _interopRequireWildcard(_constants);

var _general = _dereq_(25);

var _dom = _dereq_(24);

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
  * @type {?String}
  */
	fullscreenText: null
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

		var t = this,
		    fullscreenTitle = (0, _general.isString)(t.options.fullscreenText) ? t.options.fullscreenText : _i18n2.default.t('mejs.fullscreen'),
		    fullscreenBtn = _document2.default.createElement('div');

		fullscreenBtn.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'fullscreen-button';
		fullscreenBtn.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + fullscreenTitle + '" aria-label="' + fullscreenTitle + '" tabindex="0"></button>';
		t.addControlElement(fullscreenBtn, 'fullscreen');

		fullscreenBtn.addEventListener('click', function () {
			// toggle fullscreen
			var isFullScreen = Features.HAS_TRUE_NATIVE_FULLSCREEN && Features.IS_FULLSCREEN || player.isFullScreen;

			if (isFullScreen) {
				player.exitFullScreen();
			} else {
				player.enterFullScreen();
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
		    isNative = t.media.rendererName !== null && t.media.rendererName.match(/(native|html5)/) !== null;

		var mode = '';

		if (Features.HAS_TRUE_NATIVE_FULLSCREEN && isNative) {
			mode = 'native-native';
		} else if (Features.HAS_TRUE_NATIVE_FULLSCREEN && !isNative) {
			mode = 'plugin-native';
		} else if (t.usePluginFullScreen && Features.SUPPORT_POINTER_EVENTS) {
			mode = 'plugin-click';
		} else {
			mode = 'fullwindow';
		}

		t.fullscreenMode = mode;
		return mode;
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
		    isNative = t.media.rendererName !== null && t.media.rendererName.match(/(html5|native)/) !== null,
		    containerStyles = getComputedStyle(t.container);

		if (Features.IS_IOS && Features.HAS_IOS_FULLSCREEN && typeof t.media.webkitEnterFullscreen === 'function') {
			t.media.webkitEnterFullscreen();
			return;
		}

		// set it to not show scroll bars so 100% will work
		(0, _dom.addClass)(_document2.default.documentElement, t.options.classPrefix + 'fullscreen');
		(0, _dom.addClass)(t.container, t.options.classPrefix + 'container-fullscreen');

		// store sizing
		t.normalHeight = parseFloat(containerStyles.height);
		t.normalWidth = parseFloat(containerStyles.width);

		// attempt to do true fullscreen
		if (t.fullscreenMode === 'native-native' || t.fullscreenMode === 'plugin-native') {

			Features.requestFullScreen(t.container);

			if (t.isInIframe) {
				// sometimes exiting from fullscreen doesn't work
				// notably in Chrome <iframe>. Fixed in version 17
				setTimeout(function checkFullscreen() {

					if (t.isNativeFullScreen) {
						var percentErrorMargin = 0.002,
						    // 0.2%
						windowWidth = _window2.default.innerWidth || _document2.default.documentElement.clientWidth || _document2.default.body.clientWidth,
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
		t.container.style.width = '100%';
		t.container.style.height = '100%';

		// Only needed for safari 5.1 native full screen, can cause display issues elsewhere
		// Actually, it seems to be needed for IE8, too
		t.containerSizeTimeout = setTimeout(function () {
			t.container.style.width = '100%';
			t.container.style.height = '100%';
			t.setControlsSize();
		}, 500);

		if (isNative) {
			t.node.style.width = '100%';
			t.node.style.height = '100%';
		} else {
			var elements = t.container.querySelectorAll('iframe, embed, object, video'),
			    _total = elements.length;
			for (var i = 0; i < _total; i++) {
				elements[i].style.width = '100%';
				elements[i].style.height = '100%';
			}
		}

		if (t.options.setDimensions && typeof t.media.setSize === 'function') {
			t.media.setSize(screen.width, screen.height);
		}

		var layers = t.layers.childNodes,
		    total = layers.length;
		for (var _i = 0; _i < total; _i++) {
			layers[_i].style.width = '100%';
			layers[_i].style.height = '100%';
		}

		if (t.fullscreenBtn) {
			(0, _dom.removeClass)(t.fullscreenBtn, t.options.classPrefix + 'fullscreen');
			(0, _dom.addClass)(t.fullscreenBtn, t.options.classPrefix + 'unfullscreen');
		}

		t.setControlsSize();
		t.isFullScreen = true;

		var zoomFactor = Math.min(screen.width / t.width, screen.height / t.height),
		    captionText = t.container.querySelector('.' + t.options.classPrefix + 'captions-text');
		if (captionText) {
			captionText.style.fontSize = zoomFactor * 100 + '%';
			captionText.style.lineHeight = 'normal';
			t.container.querySelector('.' + t.options.classPrefix + 'captions-position').style.bottom = '45px';
		}
		var event = (0, _general.createEvent)('enteredfullscreen', t.container);
		t.container.dispatchEvent(event);
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
		(0, _dom.removeClass)(_document2.default.documentElement, t.options.classPrefix + 'fullscreen');
		(0, _dom.removeClass)(t.container, t.options.classPrefix + 'container-fullscreen');

		if (t.options.setDimensions) {
			t.container.style.width = t.normalWidth + 'px';
			t.container.style.height = t.normalHeight + 'px';

			if (isNative) {
				t.node.style.width = t.normalWidth + 'px';
				t.node.style.height = t.normalHeight + 'px';
			} else {
				var elements = t.container.querySelectorAll('iframe, embed, object, video'),
				    _total2 = elements.length;
				for (var i = 0; i < _total2; i++) {
					elements[i].style.width = t.normalWidth + 'px';
					elements[i].style.height = t.normalHeight + 'px';
				}
			}

			if (typeof t.media.setSize === 'function') {
				t.media.setSize(t.normalWidth, t.normalHeight);
			}

			var layers = t.layers.childNodes,
			    total = layers.length;
			for (var _i2 = 0; _i2 < total; _i2++) {
				layers[_i2].style.width = t.normalWidth + 'px';
				layers[_i2].style.height = t.normalHeight + 'px';
			}
		}

		(0, _dom.removeClass)(t.fullscreenBtn, t.options.classPrefix + 'unfullscreen');
		(0, _dom.addClass)(t.fullscreenBtn, t.options.classPrefix + 'fullscreen');

		t.setControlsSize();
		t.isFullScreen = false;

		var captionText = t.container.querySelector('.' + t.options.classPrefix + 'captions-text');
		if (captionText) {
			captionText.style.fontSize = '';
			captionText.style.lineHeight = '';
			t.container.querySelector('.' + t.options.classPrefix + 'captions-position').style.bottom = '';
		}
		var event = (0, _general.createEvent)('exitedfullscreen', t.container);
		t.container.dispatchEvent(event);
	}
});

},{"16":16,"2":2,"23":23,"24":24,"25":25,"3":3,"4":4}],9:[function(_dereq_,module,exports){
'use strict';

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _general = _dereq_(25);

var _dom = _dereq_(24);

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
  * @type {?String}
  */
	playText: null,
	/**
  * @type {?String}
  */
	pauseText: null
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
		    playTitle = (0, _general.isString)(op.playText) ? op.playText : _i18n2.default.t('mejs.play'),
		    pauseTitle = (0, _general.isString)(op.pauseText) ? op.pauseText : _i18n2.default.t('mejs.pause'),
		    play = _document2.default.createElement('div');

		play.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'playpause-button ' + t.options.classPrefix + 'play';
		play.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + playTitle + '" aria-label="' + pauseTitle + '" tabindex="0"></button>';
		play.addEventListener('click', function () {
			if (media.paused) {
				media.play();
			} else {
				media.pause();
			}
		});

		var playBtn = play.querySelector('button');
		t.addControlElement(play, 'playpause');

		/**
   * @private
   * @param {String} which - token to determine new state of button
   */
		function togglePlayPause(which) {
			if ('play' === which) {
				(0, _dom.removeClass)(play, t.options.classPrefix + 'play');
				(0, _dom.removeClass)(play, t.options.classPrefix + 'replay');
				(0, _dom.addClass)(play, t.options.classPrefix + 'pause');
				playBtn.setAttribute('title', pauseTitle);
				playBtn.setAttribute('aria-label', pauseTitle);
			} else {

				(0, _dom.removeClass)(play, t.options.classPrefix + 'pause');
				(0, _dom.removeClass)(play, t.options.classPrefix + 'replay');
				(0, _dom.addClass)(play, t.options.classPrefix + 'play');
				playBtn.setAttribute('title', playTitle);
				playBtn.setAttribute('aria-label', playTitle);
			}
		}

		togglePlayPause('pse');

		media.addEventListener('loadedmetadata', function () {
			togglePlayPause('pse');
		});

		media.addEventListener('play', function () {
			togglePlayPause('play');
		});
		media.addEventListener('playing', function () {
			togglePlayPause('play');
		});

		media.addEventListener('pause', function () {
			togglePlayPause('pse');
		});
		media.addEventListener('paused', function () {
			togglePlayPause('pse');
		});

		media.addEventListener('ended', function () {

			if (!player.options.loop) {
				(0, _dom.removeClass)(play, t.options.classPrefix + 'pause');
				(0, _dom.removeClass)(play, t.options.classPrefix + 'play');
				(0, _dom.addClass)(play, t.options.classPrefix + 'replay');
				playBtn.setAttribute('title', playTitle);
				playBtn.setAttribute('aria-label', playTitle);
			}
		});
	}
});

},{"16":16,"2":2,"24":24,"25":25,"4":4}],10:[function(_dereq_,module,exports){
'use strict';

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _constants = _dereq_(23);

var _time = _dereq_(28);

var _dom = _dereq_(24);

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

		var lastKeyPressTime = 0,
		    mouseIsDown = false,
		    startedPaused = false;

		var t = this,
		    autoRewindInitial = player.options.autoRewind,
		    tooltip = player.options.enableProgressTooltip ? '<span class="' + t.options.classPrefix + 'time-float">' + ('<span class="' + t.options.classPrefix + 'time-float-current">00:00</span>') + ('<span class="' + t.options.classPrefix + 'time-float-corner"></span>') + '</span>' : "",
		    rail = _document2.default.createElement('div');

		rail.className = t.options.classPrefix + 'time-rail';
		rail.innerHTML = '<span class="' + t.options.classPrefix + 'time-total ' + t.options.classPrefix + 'time-slider">' + ('<span class="' + t.options.classPrefix + 'time-buffering"></span>') + ('<span class="' + t.options.classPrefix + 'time-loaded"></span>') + ('<span class="' + t.options.classPrefix + 'time-current"></span>') + ('<span class="' + t.options.classPrefix + 'time-handle"></span>') + ('' + tooltip) + '</span>';

		t.addControlElement(rail, 'progress');

		controls.querySelector('.' + t.options.classPrefix + 'time-buffering').style.display = 'none';

		t.rail = controls.querySelector('.' + t.options.classPrefix + 'time-rail');
		t.total = controls.querySelector('.' + t.options.classPrefix + 'time-total');
		t.loaded = controls.querySelector('.' + t.options.classPrefix + 'time-loaded');
		t.current = controls.querySelector('.' + t.options.classPrefix + 'time-current');
		t.handle = controls.querySelector('.' + t.options.classPrefix + 'time-handle');
		t.timefloat = controls.querySelector('.' + t.options.classPrefix + 'time-float');
		t.timefloatcurrent = controls.querySelector('.' + t.options.classPrefix + 'time-float-current');
		t.slider = controls.querySelector('.' + t.options.classPrefix + 'time-slider');
		t.newTime = 0;
		t.forcedHandlePause = false;

		/**
   *
   * @private
   * @param {Event} e
   */
		var handleMouseMove = function handleMouseMove(e) {

			var totalStyles = getComputedStyle(t.total),
			    offsetStyles = (0, _dom.offset)(t.total),
			    width = parseFloat(totalStyles.width);

			var percentage = 0,
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
				if (x < offsetStyles.left) {
					x = offsetStyles.left;
				} else if (x > width + offsetStyles.left) {
					x = width + offsetStyles.left;
				}

				pos = x - offsetStyles.left;
				percentage = pos / width;
				t.newTime = percentage <= 0.02 ? 0 : percentage * media.duration;

				// fake seek to where the mouse is
				if (mouseIsDown && media.currentTime !== null && t.newTime.toFixed(4) !== media.currentTime.toFixed(4)) {
					t.setCurrentRailHandle(t.newTime);
					t.updateCurrent(t.newTime);
				}

				// position floating time box
				if (!_constants.IS_IOS && !_constants.IS_ANDROID && t.timefloat) {
					t.timefloat.style.left = pos + 'px';
					t.timefloatcurrent.innerHTML = (0, _time.secondsToTimeCode)(t.newTime, player.options.alwaysShowHours, player.options.showTimecodeFrameCount, player.options.framesPerSecond, player.options.secondsDecimalLength);
					t.timefloat.style.display = 'block';
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
			    time = (0, _time.secondsToTimeCode)(seconds, player.options.alwaysShowHours, player.options.showTimecodeFrameCount, player.options.framesPerSecond, player.options.secondsDecimalLength),
			    duration = media.duration;

			t.slider.setAttribute('role', 'slider');
			t.slider.tabIndex = 0;

			if (media.paused) {
				t.slider.setAttribute('aria-label', timeSliderText);
				t.slider.setAttribute('aria-valuemin', 0);
				t.slider.setAttribute('aria-valuemax', duration);
				t.slider.setAttribute('aria-valuenow', seconds);
				t.slider.setAttribute('aria-valuetext', time);
			} else {
				t.slider.removeAttribute('aria-label');
				t.slider.removeAttribute('aria-valuemin');
				t.slider.removeAttribute('aria-valuemax');
				t.slider.removeAttribute('aria-valuenow');
				t.slider.removeAttribute('aria-valuetext');
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
		},
		    handleMouseup = function handleMouseup() {

			if (mouseIsDown && media.currentTime !== null && t.newTime.toFixed(4) !== media.currentTime.toFixed(4)) {
				media.setCurrentTime(t.newTime);
				player.setCurrentRail();
				t.updateCurrent(t.newTime);
			}
			if (t.forcedHandlePause) {
				t.media.play();
			}
			t.forcedHandlePause = false;
		};

		// Events
		t.slider.addEventListener('focus', function () {
			player.options.autoRewind = false;
		});
		t.slider.addEventListener('blur', function () {
			player.options.autoRewind = autoRewindInitial;
		});
		t.slider.addEventListener('keydown', function (e) {

			if (new Date() - lastKeyPressTime >= 1000) {
				startedPaused = media.paused;
			}

			if (t.options.keyActions.length) {

				var keyCode = e.which || e.keyCode || 0,
				    duration = media.duration,
				    seekForward = player.options.defaultSeekForwardInterval(media),
				    seekBackward = player.options.defaultSeekBackwardInterval(media);

				var seekTime = media.currentTime;

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
		});

		var events = ['mousedown', 'touchstart'];

		// Required to manipulate mouse movements that require drag 'n' drop properly
		t.slider.addEventListener('dragstart', function () {
			return false;
		});

		for (var i = 0, total = events.length; i < total; i++) {
			t.slider.addEventListener(events[i], function (e) {
				t.forcedHandlePause = false;
				if (media.duration !== Infinity) {
					// only handle left clicks or touch
					if (e.which === 1 || e.which === 0) {

						if (!media.paused) {
							t.media.pause();
							t.forcedHandlePause = true;
						}

						mouseIsDown = true;
						handleMouseMove(e);
						t.globalBind('mousemove.dur touchmove.dur', function (event) {
							var target = event.target;
							if (target === t.slider || target.closest('.' + t.options.classPrefix + 'time-slider')) {
								handleMouseMove(event);
							}
						});
						t.globalBind('mouseup.dur touchend.dur', function () {
							handleMouseup();
							mouseIsDown = false;
							if (t.timefloat) {
								t.timefloat.style.display = 'none';
							}
							t.globalUnbind('mousemove.dur touchmove.dur mouseup.dur touchend.dur');
						});
					}
				}
			});
		}
		t.slider.addEventListener('mouseenter', function (e) {
			if (e.target === t.slider && media.duration !== Infinity) {
				t.globalBind('mousemove.dur', function (event) {
					var target = event.target;
					if (target === t.slider || target.closest('.' + t.options.classPrefix + 'time-slider')) {
						handleMouseMove(event);
					}
				});
				if (t.timefloat && !_constants.IS_IOS && !_constants.IS_ANDROID) {
					t.timefloat.style.display = 'block';
				}
			}
		});
		t.slider.addEventListener('mouseleave', function () {
			if (media.duration !== Infinity) {
				if (!mouseIsDown) {
					t.globalUnbind('mousemove.dur');
					if (t.timefloat) {
						t.timefloat.style.display = 'none';
					}
				}
			}
		});

		// loading
		// If media is does not have a finite duration, remove progress bar interaction
		// and indicate that is a live broadcast
		media.addEventListener('progress', function (e) {
			var broadcast = controls.querySelector('.' + t.options.classPrefix + 'broadcast');
			if (media.duration !== Infinity) {
				if (broadcast) {
					t.slider.style.display = '';
					broadcast.remove();
				}

				player.setProgressRail(e);
				if (!t.forcedHandlePause) {
					player.setCurrentRail(e);
				}
			} else if (!broadcast) {
				var label = _document2.default.createElement('span');
				label.className = t.options.classPrefix + 'broadcast';
				label.innerText = _i18n2.default.t('mejs.live-broadcast');
				t.slider.style.display = 'none';
			}
		});

		// current time
		media.addEventListener('timeupdate', function (e) {
			var broadcast = controls.querySelector('.' + t.options.classPrefix + 'broadcast');
			if (media.duration !== Infinity) {
				if (broadcast) {
					t.slider.style.display = '';
					broadcast.remove();
				}

				player.setProgressRail(e);
				if (!t.forcedHandlePause) {
					player.setCurrentRail(e);
				}
				updateSlider(e);
			} else if (!broadcast) {
				var label = _document2.default.createElement('span');
				label.className = t.options.classPrefix + 'broadcast';
				label.innerText = _i18n2.default.t('mejs.live-broadcast');
				controls.querySelector('.' + t.options.classPrefix + 'time-rail').appendChild(label);
				t.slider.style.display = 'none';
			}
		});

		t.container.addEventListener('controlsresize', function (e) {
			if (media.duration !== Infinity) {
				player.setProgressRail(e);
				if (!t.forcedHandlePause) {
					player.setCurrentRail(e);
				}
			}
		});
	},


	/**
  * Calculate the progress on the media and update progress bar's width
  *
  * @param {Event} e
  */
	setProgressRail: function setProgressRail(e) {

		var percent = null;

		var t = this,
		    target = e !== undefined ? e.target : t.media;

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
				t.loaded.style.width = percent * 100 + '%';
			}
		}
	},

	/**
  * Update the slider's width depending on the time assigned
  *
  * @param {Number} fakeTime
  */
	setCurrentRailHandle: function setCurrentRailHandle(fakeTime) {
		var t = this;
		t.setCurrentRailMain(t, fakeTime);
	},

	/**
  * Update the slider's width depending on the current time
  *
  */
	setCurrentRail: function setCurrentRail() {
		var t = this;
		t.setCurrentRailMain(t);
	},

	/**
  * Method that handles the calculation of the width of the rail.
  *
  * @param {MediaElementPlayer} t
  * @param {?Number} fakeTime
  */
	setCurrentRailMain: function setCurrentRailMain(t, fakeTime) {
		if (t.media.currentTime !== undefined && t.media.duration) {
			var nTime = typeof fakeTime === 'undefined' ? t.media.currentTime : fakeTime;

			// update bar and handle
			if (t.total && t.handle) {
				var newWidth = Math.round(parseFloat(getComputedStyle(t.total).width) * nTime / t.media.duration),
				    handlePos = newWidth - Math.round(t.handle.offsetWidth / 2);

				newWidth = nTime / t.media.duration * 100;
				t.current.style.width = newWidth + '%';
				t.handle.style.left = handlePos + 'px';
			}
		}
	}
});

},{"16":16,"2":2,"23":23,"24":24,"28":28,"4":4}],11:[function(_dereq_,module,exports){
'use strict';

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _time = _dereq_(28);

var _dom = _dereq_(24);

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
		var t = this,
		    time = _document2.default.createElement('div');

		time.className = t.options.classPrefix + 'time';
		time.setAttribute('role', 'timer');
		time.setAttribute('aria-live', 'off');
		time.innerHTML = '<span class="' + t.options.classPrefix + 'currenttime">' + (0, _time.secondsToTimeCode)(0, player.options.alwaysShowHours, player.options.showTimecodeFrameCount, player.options.framesPerSecond, player.options.secondsDecimalLength) + '</span>';

		t.addControlElement(time, 'current');

		media.addEventListener('timeupdate', function () {
			if (t.controlsAreVisible) {
				player.updateCurrent();
			}
		});
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

		var t = this,
		    currTime = controls.lastChild.querySelector('.' + t.options.classPrefix + 'currenttime');

		if (currTime) {
			controls.querySelector('.' + t.options.classPrefix + 'time').innerHTML += t.options.timeAndDurationSeparator + '<span class="' + t.options.classPrefix + 'duration">' + ((0, _time.secondsToTimeCode)(t.options.duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength) + '</span>');
		} else {

			// add class to current time
			if (controls.querySelector('.' + t.options.classPrefix + 'currenttime')) {
				(0, _dom.addClass)(controls.querySelector('.' + t.options.classPrefix + 'currenttime').parentNode, t.options.classPrefix + 'currenttime-container');
			}

			var duration = _document2.default.createElement('div');
			duration.className = t.options.classPrefix + 'time ' + t.options.classPrefix + 'duration-container';
			duration.innerHTML = '<span class="' + t.options.classPrefix + 'duration">' + ((0, _time.secondsToTimeCode)(t.options.duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength) + '</span>');

			t.addControlElement(duration, 'duration');
		}

		media.addEventListener('timeupdate', function () {
			if (t.controlsAreVisible) {
				player.updateDuration();
			}
		});
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

		if (t.controls.querySelector('.' + t.options.classPrefix + 'currenttime')) {
			t.controls.querySelector('.' + t.options.classPrefix + 'currenttime').innerText = (0, _time.secondsToTimeCode)(currentTime, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength);
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

		var timecode = (0, _time.secondsToTimeCode)(duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength);

		// Toggle long-video class if time code is >5 digits (MM:SS)
		if (timecode.length > 5) {
			(0, _dom.toggleClass)(t.container, t.options.classPrefix + 'long-video');
		}

		if (t.controls.querySelector('.' + t.options.classPrefix + 'duration') && duration > 0) {
			t.controls.querySelector('.' + t.options.classPrefix + 'duration').innerHTML = timecode;
		}
	}
});

},{"16":16,"2":2,"24":24,"28":28}],12:[function(_dereq_,module,exports){
'use strict';

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _time = _dereq_(28);

var _general = _dereq_(25);

var _dom = _dereq_(24);

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
  * @type {?String}
  */
	tracksText: null,
	/**
  * @type {?String}
  */
	chaptersText: null,
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
		    tracksTitle = (0, _general.isString)(t.options.tracksText) ? t.options.tracksText : _i18n2.default.t('mejs.captions-subtitles'),
		    chaptersTitle = (0, _general.isString)(t.options.chaptersText) ? t.options.chaptersText : _i18n2.default.t('mejs.captions-chapters'),
		    total = player.tracks.length;

		// If browser will do native captions, prefer mejs captions, loop through tracks and hide
		if (t.domNode.textTracks) {
			for (var i = t.domNode.textTracks.length - 1; i >= 0; i--) {
				t.domNode.textTracks[i].mode = 'hidden';
			}
		}

		t.cleartracks(player);

		player.captions = _document2.default.createElement('div');
		player.captions.className = t.options.classPrefix + 'captions-layer ' + t.options.classPrefix + 'layer';
		player.captions.innerHTML = '<div class="' + t.options.classPrefix + 'captions-position ' + t.options.classPrefix + 'captions-position-hover"' + attr + '>' + ('<span class="' + t.options.classPrefix + 'captions-text"></span>') + '</div>';
		player.captions.style.display = 'none';
		layers.insertBefore(player.captions, layers.firstChild);

		player.captionsText = player.captions.querySelector('.' + t.options.classPrefix + 'captions-text');

		player.captionsButton = _document2.default.createElement('div');
		player.captionsButton.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'captions-button';
		player.captionsButton.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + tracksTitle + '" aria-label="' + tracksTitle + '" tabindex="0"></button>' + ('<div class="' + t.options.classPrefix + 'captions-selector ' + t.options.classPrefix + 'offscreen">') + ('<ul class="' + t.options.classPrefix + 'captions-selector-list">') + ('<li class="' + t.options.classPrefix + 'captions-selector-list-item">') + ('<input type="radio" class="' + t.options.classPrefix + 'captions-selector-input" ') + ('name="' + player.id + '_captions" id="' + player.id + '_captions_none" ') + 'value="none" checked="checked">' + ('<label class="' + t.options.classPrefix + 'captions-selector-label ') + (t.options.classPrefix + 'captions-selected" ') + ('for="' + player.id + '_captions_none">' + _i18n2.default.t('mejs.none') + '</label>') + '</li>' + '</ul>' + '</div>';

		t.addControlElement(player.captionsButton, 'tracks');

		player.chaptersButton = _document2.default.createElement('div');
		player.chaptersButton.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'chapters-button';
		player.chaptersButton.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + chaptersTitle + '" aria-label="' + chaptersTitle + '" tabindex="0"></button>' + ('<div class="' + t.options.classPrefix + 'chapters-selector ' + t.options.classPrefix + 'offscreen">') + ('<ul class="' + t.options.classPrefix + 'chapters-selector-list"></ul>') + '</div>';

		var subtitleCount = 0;

		for (var _i = 0; _i < total; _i++) {
			var kind = player.tracks[_i].kind;
			if (kind === 'subtitles' || kind === 'captions') {
				subtitleCount++;
			} else if (kind === 'chapters' && !controls.querySelector('.' + t.options.classPrefix + 'chapter-selector')) {
				player.captionsButton.parentNode.insertBefore(player.chaptersButton, player.captionsButton);
			}
		}

		player.trackToLoad = -1;
		player.selectedTrack = null;
		player.isLoadingTrack = false;

		// add to list
		for (var _i2 = 0; _i2 < total; _i2++) {
			var _kind = player.tracks[_i2].kind;
			if (_kind === 'subtitles' || _kind === 'captions') {
				player.addTrackButton(player.tracks[_i2].trackId, player.tracks[_i2].srclang, player.tracks[_i2].label);
			}
		}

		// start loading tracks
		player.loadNextTrack();

		var inEvents = ['mouseenter', 'focusin'],
		    outEvents = ['mouseleave', 'focusout'];

		// if only one language then just make the button a toggle
		if (t.options.toggleCaptionsButtonWhenOnlyOne && subtitleCount === 1) {
			// click
			player.captionsButton.addEventListener('click', function () {
				var trackId = 'none';
				if (player.selectedTrack === null) {
					trackId = player.tracks[0].trackId;
				}
				player.setTrack(trackId);
			});
		} else {
			var labels = player.captionsButton.querySelectorAll('.' + t.options.classPrefix + 'captions-selector-label'),
			    captions = player.captionsButton.querySelectorAll('input[type=radio]');
			// hover or keyboard focus
			for (var _i3 = 0, _total = inEvents.length; _i3 < _total; _i3++) {
				player.captionsButton.addEventListener(inEvents[_i3], function () {
					(0, _dom.removeClass)(this.querySelector('.' + t.options.classPrefix + 'captions-selector'), t.options.classPrefix + 'offscreen');
				});
			}

			for (var _i4 = 0, _total2 = outEvents.length; _i4 < _total2; _i4++) {
				player.captionsButton.addEventListener(outEvents[_i4], function () {
					(0, _dom.addClass)(this.querySelector('.' + t.options.classPrefix + 'captions-selector'), t.options.classPrefix + 'offscreen');
				});
			}

			// handle clicks to the language radio buttons
			for (var _i5 = 0, _total3 = captions.length; _i5 < _total3; _i5++) {
				captions[_i5].addEventListener('click', function () {
					// value is trackId, same as the actual id, and we're using it here
					// because the "none" checkbox doesn't have a trackId
					// to use, but we want to know when "none" is clicked
					player.setTrack(this.value);
				});
			}

			for (var _i6 = 0, _total4 = labels.length; _i6 < _total4; _i6++) {
				labels[_i6].addEventListener('click', function () {
					var radio = (0, _dom.siblings)(this, function (el) {
						return el.tagName === 'INPUT';
					})[0],
					    event = (0, _general.createEvent)('click', radio);
					radio.dispatchEvent(event);
				});
			}

			//Allow up/down arrow to change the selected radio without changing the volume.
			player.captionsButton.addEventListener('keydown', function (e) {
				e.stopPropagation();
			});
		}

		for (var _i7 = 0, _total5 = inEvents.length; _i7 < _total5; _i7++) {
			player.chaptersButton.addEventListener(inEvents[_i7], function () {
				if (this.querySelector('.' + t.options.classPrefix + 'chapters-selector-list').childNodes.length) {
					(0, _dom.removeClass)(this.querySelector('.' + t.options.classPrefix + 'chapters-selector'), t.options.classPrefix + 'offscreen');
				}
			});
		}

		for (var _i8 = 0, _total6 = outEvents.length; _i8 < _total6; _i8++) {
			player.chaptersButton.addEventListener(outEvents[_i8], function () {
				(0, _dom.addClass)(this.querySelector('.' + t.options.classPrefix + 'chapters-selector'), t.options.classPrefix + 'offscreen');
			});
		}

		//Allow up/down arrow to change the selected radio without changing the volume.
		player.chaptersButton.addEventListener('keydown', function (e) {
			e.stopPropagation();
		});

		if (!player.options.alwaysShowControls) {
			// move with controls
			player.container.addEventListener('controlsshown', function () {
				// push captions above controls
				(0, _dom.addClass)(player.container.querySelector('.' + t.options.classPrefix + 'captions-position'), t.options.classPrefix + 'captions-position-hover');
			});

			player.container.addEventListener('controlshidden', function () {
				if (!media.paused) {
					// move back to normal place
					(0, _dom.removeClass)(player.container.querySelector('.' + t.options.classPrefix + 'captions-position'), t.options.classPrefix + 'captions-position-hover');
				}
			});
		} else {
			(0, _dom.addClass)(player.container.querySelector('.' + t.options.classPrefix + 'captions-position'), t.options.classPrefix + 'captions-position-hover');
		}

		media.addEventListener('timeupdate', function () {
			player.displayCaptions();
		});

		if (player.options.slidesSelector !== '') {
			player.slidesContainer = _document2.default.querySelectorAll(player.options.slidesSelector);

			media.addEventListener('timeupdate', function () {
				player.displaySlides();
			});
		}

		t.container.addEventListener('controlsresize', function () {
			t.adjustLanguageBox();
		});
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
			if (player.chaptersButton) {
				player.chaptersButton.remove();
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
		    tracktags = t.node.querySelectorAll('track'),
		    total = tracktags.length;

		// store for use by plugins
		t.tracks = [];
		for (var i = 0; i < total; i++) {
			var track = tracktags[i],
			    srclang = track.getAttribute('srclang').toLowerCase() || '',
			    trackId = t.id + '_track_' + i + '_' + track.getAttribute('kind') + '_' + srclang;
			t.tracks.push({
				trackId: trackId,
				srclang: srclang,
				src: track.getAttribute('src'),
				kind: track.getAttribute('kind'),
				label: track.getAttribute('label') || '',
				entries: [],
				isLoaded: false
			});
		}
	},


	/**
  *
  * @param {String} trackId, or "none" to disable captions
  */
	setTrack: function setTrack(trackId) {

		var t = this,
		    radios = t.captionsButton.querySelectorAll('input[type="radio"]'),
		    captions = t.captionsButton.querySelectorAll('.' + t.options.classPrefix + 'captions-selected'),
		    track = t.captionsButton.querySelector('input[value="' + trackId + '"]');

		for (var i = 0, total = radios.length; i < total; i++) {
			radios[i].checked = false;
		}

		for (var _i9 = 0, _total7 = captions.length; _i9 < _total7; _i9++) {
			(0, _dom.removeClass)(captions[_i9], t.options.classPrefix + 'captions-selected');
		}

		track.checked = true;
		var labels = (0, _dom.siblings)(track, function (el) {
			return (0, _dom.hasClass)(el, t.options.classPrefix + 'captions-selector-label');
		});
		for (var _i10 = 0, _total8 = labels.length; _i10 < _total8; _i10++) {
			(0, _dom.addClass)(labels[_i10], t.options.classPrefix + 'captions-selected');
		}

		if (trackId === 'none') {
			t.selectedTrack = null;
			(0, _dom.removeClass)(t.captionsButton, t.options.classPrefix + 'captions-enabled');
			return;
		}

		for (var _i11 = 0, _total9 = t.tracks.length; _i11 < _total9; _i11++) {
			var _track = t.tracks[_i11];
			if (_track.trackId === trackId) {
				if (t.selectedTrack === null) {
					(0, _dom.addClass)(t.captionsButton, t.options.classPrefix + 'captions-enabled');
				}
				t.selectedTrack = _track;
				t.captions.setAttribute('lang', t.selectedTrack.srclang);
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
		    track = t.tracks[index];

		if (track !== undefined && (track.src !== undefined || track.src !== "")) {
			(0, _dom.ajax)(track.src, 'text', function (d) {

				// parse the loaded file
				track.entries = typeof d === 'string' && /<tt\s+xml/ig.exec(d) ? _mejs2.default.TrackFormatParser.dfxp.parse(d) : _mejs2.default.TrackFormatParser.webvtt.parse(d);

				track.isLoaded = true;

				t.enableTrackButton(track);
				t.loadNextTrack();

				if (track.kind === 'slides') {
					t.setupSlides(track);
				}
				// Load by default the first track with `chapters` kind
				else if (track.kind === 'chapters' && !t.hasChapters) {
						t.drawChapters(track);
						t.hasChapters = true;
					}
			}, function () {
				t.removeTrackButton(track.trackId);
				t.loadNextTrack();
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
		    target = _document2.default.getElementById('' + track.trackId);

		if (!target) {
			return;
		}

		var label = track.label;

		if (label === '') {
			label = _i18n2.default.t(_mejs2.default.language.codes[lang]) || lang;
		}
		target.disabled = false;
		var targetSiblings = (0, _dom.siblings)(target, function (el) {
			return (0, _dom.hasClass)(el, t.options.classPrefix + 'captions-selector-label');
		});
		for (var i = 0, total = targetSiblings.length; i < total; i++) {
			targetSiblings[i].innerHTML = label;
		}

		// auto select
		if (t.options.startLanguage === lang) {
			target.checked = true;
			var event = (0, _general.createEvent)('click', target);
			target.dispatchEvent(event);
		}

		t.adjustLanguageBox();
	},


	/**
  *
  * @param {String} trackId
  */
	removeTrackButton: function removeTrackButton(trackId) {

		var t = this,
		    element = _document2.default.getElementById('' + trackId);

		if (element) {
			var button = element.closest('li');
			if (button) {
				button.remove();
			}
		}
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
		t.captionsButton.querySelector('ul').innerHTML += '<li class="' + t.options.classPrefix + 'captions-selector-list-item">' + ('<input type="radio" class="' + t.options.classPrefix + 'captions-selector-input" ') + ('name="' + t.id + '_captions" id="' + trackId + '" value="' + trackId + '" disabled>') + ('<label class="' + t.options.classPrefix + 'captions-selector-label">' + label + ' (loading)</label>') + '</li>';

		t.adjustLanguageBox();
	},


	/**
  *
  */
	adjustLanguageBox: function adjustLanguageBox() {
		var t = this;
		// adjust the size of the outer box
		t.captionsButton.querySelector('.' + t.options.classPrefix + 'captions-selector').style.height = parseFloat(t.captionsButton.querySelector('.' + t.options.classPrefix + 'captions-selector-list').offsetHeight) + 'px';
	},


	/**
  *
  */
	checkForTracks: function checkForTracks() {
		var t = this;

		var hasSubtitles = false;

		// check if any subtitles
		if (t.options.hideCaptionsButtonWhenEmpty) {
			for (var i = 0, total = t.tracks.length; i < total; i++) {
				var kind = t.tracks[i].kind;
				if ((kind === 'subtitles' || kind === 'captions') && t.tracks[i].isLoaded) {
					hasSubtitles = true;
					break;
				}
			}

			t.captionsButton.style.display = hasSubtitles ? '' : 'none';
			t.setControlsSize();
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
		    sanitize = function sanitize(html) {

			var div = _document2.default.createElement('div');
			div.innerHTML = html;

			// Remove all `<script>` tags first
			var scripts = div.getElementsByTagName('script');
			var i = scripts.length;
			while (i--) {
				scripts[i].remove();
			}

			// Loop the elements and remove anything that contains value="javascript:" or an `on*` attribute
			// (`onerror`, `onclick`, etc.)
			var allElements = div.getElementsByTagName('*');
			for (var _i12 = 0, n = allElements.length; _i12 < n; _i12++) {
				var attributesObj = allElements[_i12].attributes,
				    attributes = Array.prototype.slice.call(attributesObj);

				for (var j = 0, total = attributes.length; j < total; j++) {
					if (attributes[j].name.startsWith('on') || attributes[j].value.startsWith('javascript')) {
						allElements[_i12].remove();
					} else if (attributes[j].name === 'style') {
						allElements[_i12].removeAttribute(attributes[j].name);
					}
				}
			}
			return div.innerHTML;
		};

		if (track !== null && track.isLoaded) {
			var i = t.searchTrackPosition(track.entries, t.media.currentTime);
			if (i > -1) {
				// Set the line before the timecode as a class so the cue can be targeted if needed
				t.captionsText.innerHTML = sanitize(track.entries[i].text);
				t.captionsText.className = t.options.classPrefix + 'captions-text ' + (track.entries[i].identifier || '');
				t.captions.style.display = '';
				t.captions.style.height = '0px';
				return; // exit out if one is visible;
			}

			t.captions.style.display = 'none';
		} else {
			t.captions.style.display = 'none';
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
		var _this = this;

		var t = this;

		if (t.tracks === undefined || t.slidesContainer === undefined) {
			return;
		}

		var url = t.slides.entries[index].text;

		var img = t.slides.entries[index].imgs;

		if (img === undefined || img.fadeIn === undefined) {
			(function () {

				var image = _document2.default.createElement('img');
				image.src = url;
				image.addEventListener('load', function () {
					var self = _this,
					    visible = (0, _dom.siblings)(self, function (el) {
						return visible(el);
					});
					self.style.display = 'none';
					t.slidesContainer.innerHTML += self.innerHTML;
					(0, _dom.fadeIn)(t.slidesContainer.querySelector(image));
					for (var i = 0, total = visible.length; i < total; i++) {
						(0, _dom.fadeOut)(visible[i], 400);
					}
				});
				t.slides.entries[index].imgs = img = image;
			})();
		} else if (!(0, _dom.visible)(img)) {
			(function () {
				var visible = (0, _dom.siblings)(self, function (el) {
					return visible(el);
				});
				(0, _dom.fadeIn)(t.slidesContainer.querySelector(img));
				for (var i = 0, total = visible.length; i < total; i++) {
					(0, _dom.fadeOut)(visible[i]);
				}
			})();
		}
	},


	/**
  *
  */
	displaySlides: function displaySlides() {
		var t = this;

		if (this.slides === undefined) {
			return;
		}

		var slides = t.slides,
		    i = t.searchTrackPosition(slides.entries, t.media.currentTime);

		if (i > -1) {
			t.showSlide(i);
			return; // exit out if one is visible;
		}
	},


	/**
  *
  * @param {Object} chapters
  */
	drawChapters: function drawChapters(chapters) {
		var t = this,
		    total = chapters.entries.length;

		if (!total) {
			return;
		}

		t.chaptersButton.querySelector('ul').innerHTML = '';

		for (var i = 0; i < total; i++) {
			t.chaptersButton.querySelector('ul').innerHTML += '<li class="' + t.options.classPrefix + 'chapters-selector-list-item" ' + 'role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false">' + ('<input type="radio" class="' + t.options.classPrefix + 'captions-selector-input" ') + ('name="' + t.id + '_chapters" value="' + chapters.entries[i].start + '" disabled>') + ('<label class="' + t.options.classPrefix + 'chapters-selector-label">' + chapters.entries[i].text + '</label>') + '</li>';
		}

		var radios = t.chaptersButton.querySelectorAll('input[type="radio"]'),
		    labels = t.chaptersButton.querySelectorAll('.' + t.options.classPrefix + 'chapters-selector-label');

		for (var _i13 = 0, _total10 = radios.length; _i13 < _total10; _i13++) {
			radios[_i13].disabled = false;
			radios[_i13].checked = false;
			radios[_i13].addEventListener('click', function () {
				var self = this,
				    listItems = t.chaptersButton.querySelectorAll('li'),
				    label = (0, _dom.siblings)(self, function (el) {
					return (0, _dom.hasClass)(el, t.options.classPrefix + 'chapters-selector-label');
				})[0];

				self.checked = true;
				self.parentNode.setAttribute('aria-checked', true);
				(0, _dom.addClass)(label, t.options.classPrefix + 'chapters-selected');
				(0, _dom.removeClass)(t.chaptersButton.querySelector('.' + t.options.classPrefix + 'chapters-selected'), t.options.classPrefix + 'chapters-selected');

				for (var _i14 = 0, _total11 = listItems.length; _i14 < _total11; _i14++) {
					listItems[_i14].setAttribute('aria-checked', false);
				}

				t.media.setCurrentTime(parseFloat(self.value));
				if (t.media.paused) {
					t.media.play();
				}
			});
		}

		for (var _i15 = 0, _total12 = labels.length; _i15 < _total12; _i15++) {
			labels[_i15].addEventListener('click', function () {
				var radio = (0, _dom.siblings)(this, function (el) {
					return el.tagName === 'INPUT';
				})[0],
				    event = (0, _general.createEvent)('click', radio);
				radio.dispatchEvent(event);
			});
		}
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
		pattern: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,

		/**
   *
   * @param {String} trackText
   * @returns {{text: Array, times: Array}}
   */
		parse: function parse(trackText) {
			var lines = trackText.split(/\r?\n/),
			    entries = [];

			var timecode = void 0,
			    text = void 0,
			    identifier = void 0;

			for (var i = 0, total = lines.length; i < total; i++) {
				timecode = this.pattern.exec(lines[i]);

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
					text = text.trim().replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
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
			var container = trackText.firstChild,
			    lines = container.querySelectorAll('p'),
			    styleNode = trackText.getElementById('' + container.attr('style')),
			    entries = [];

			var styles = void 0;

			if (styleNode.length) {
				styleNode.removeAttribute('id');
				var attributes = styleNode.attributes;
				if (attributes.length) {
					styles = {};
					for (var i = 0, total = attributes.length; i < total; i++) {
						styles[attributes[i].name.split(":")[1]] = attributes[i].value;
					}
				}
			}

			for (var _i16 = 0, _total13 = lines.length; _i16 < _total13; _i16++) {
				var style = void 0,
				    _temp = {
					start: null,
					stop: null,
					style: null,
					text: null
				};

				if (lines.eq(_i16).attr('begin')) {
					_temp.start = (0, _time.convertSMPTEtoSeconds)(lines.eq(_i16).attr('begin'));
				}
				if (!_temp.start && lines.eq(_i16 - 1).attr('end')) {
					_temp.start = (0, _time.convertSMPTEtoSeconds)(lines.eq(_i16 - 1).attr('end'));
				}
				if (lines.eq(_i16).attr('end')) {
					_temp.stop = (0, _time.convertSMPTEtoSeconds)(lines.eq(_i16).attr('end'));
				}
				if (!_temp.stop && lines.eq(_i16 + 1).attr('begin')) {
					_temp.stop = (0, _time.convertSMPTEtoSeconds)(lines.eq(_i16 + 1).attr('begin'));
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
				_temp.text = lines.eq(_i16).innerHTML.trim().replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
				entries.push(_temp);
			}
			return entries;
		}
	}
};

},{"16":16,"2":2,"24":24,"25":25,"28":28,"4":4,"6":6}],13:[function(_dereq_,module,exports){
'use strict';

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _player = _dereq_(16);

var _player2 = _interopRequireDefault(_player);

var _i18n = _dereq_(4);

var _i18n2 = _interopRequireDefault(_i18n);

var _constants = _dereq_(23);

var _general = _dereq_(25);

var _dom = _dereq_(24);

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
  * @type {?String}
  */
	muteText: null,
	/**
  * @type {?String}
  */
	unmuteText: null,
	/**
  * @type {?String}
  */
	allyVolumeControlText: null,
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
		    muteText = (0, _general.isString)(t.options.muteText) ? t.options.muteText : _i18n2.default.t('mejs.mute'),
		    unmuteText = (0, _general.isString)(t.options.unmuteText) ? t.options.unmuteText : _i18n2.default.t('mejs.unmute'),
		    volumeControlText = (0, _general.isString)(t.options.allyVolumeControlText) ? t.options.allyVolumeControlText : _i18n2.default.t('mejs.volume-help-text'),
		    mute = _document2.default.createElement('div');

		mute.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'volume-button ' + t.options.classPrefix + 'mute';
		mute.innerHTML = mode === 'horizontal' ? '<button type="button" aria-controls="' + t.id + '" title="' + muteText + '" aria-label="' + muteText + '" tabindex="0"></button>' : '<button type="button" aria-controls="' + t.id + '" title="' + muteText + '" aria-label="' + muteText + '" tabindex="0"></button>' + ('<a href="javascript:void(0);" class="' + t.options.classPrefix + 'volume-slider">') + ('<span class="' + t.options.classPrefix + 'offscreen">' + volumeControlText + '</span>') + ('<div class="' + t.options.classPrefix + 'volume-total">') + ('<div class="' + t.options.classPrefix + 'volume-current"></div>') + ('<div class="' + t.options.classPrefix + 'volume-handle"></div>') + '</div>' + '</a>';

		t.addControlElement(mute, 'volume');

		// horizontal version
		if (mode === 'horizontal') {
			var anchor = _document2.default.createElement('a');
			anchor.className = t.options.classPrefix + 'horizontal-volume-slider';
			anchor.href = 'javascript:void(0);';
			anchor.innerHTML += '<span class="' + t.options.classPrefix + 'offscreen">' + volumeControlText + '</span>' + ('<div class="' + t.options.classPrefix + 'horizontal-volume-total">') + ('<div class="' + t.options.classPrefix + 'horizontal-volume-current"></div>') + ('<div class="' + t.options.classPrefix + 'horizontal-volume-handle"></div>') + '</div>';
			mute.parentNode.insertBefore(anchor, mute.nextSibling);
		}

		var volumeSlider = mode === 'vertical' ? t.container.querySelector('.' + t.options.classPrefix + 'volume-slider') : t.container.querySelector('.' + t.options.classPrefix + 'horizontal-volume-slider'),
		    volumeTotal = mode === 'vertical' ? t.container.querySelector('.' + t.options.classPrefix + 'volume-total') : t.container.querySelector('.' + t.options.classPrefix + 'horizontal-volume-total'),
		    volumeCurrent = mode === 'vertical' ? t.container.querySelector('.' + t.options.classPrefix + 'volume-current') : t.container.querySelector('.' + t.options.classPrefix + 'horizontal-volume-current'),
		    volumeHandle = mode === 'vertical' ? t.container.querySelector('.' + t.options.classPrefix + 'volume-handle') : t.container.querySelector('.' + t.options.classPrefix + 'horizontal-volume-handle'),
		    button = mute.firstElementChild,


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
				(0, _dom.removeClass)(mute, t.options.classPrefix + 'mute');
				(0, _dom.addClass)(mute, t.options.classPrefix + 'unmute');
				var _button = mute.firstElementChild;
				_button.setAttribute('title', unmuteText);
				_button.setAttribute('aria-label', unmuteText);
			} else {
				(0, _dom.removeClass)(mute, t.options.classPrefix + 'unmute');
				(0, _dom.addClass)(mute, t.options.classPrefix + 'mute');
				var _button2 = mute.firstElementChild;
				_button2.setAttribute('title', muteText);
				_button2.setAttribute('aria-label', muteText);
			}

			var volumePercentage = volume * 100 + '%',
			    volumeStyles = getComputedStyle(volumeHandle);

			// position slider
			if (mode === 'vertical') {
				volumeCurrent.style.bottom = 0;
				volumeCurrent.style.height = volumePercentage;
				volumeHandle.style.bottom = volumePercentage;
				volumeHandle.style.marginBottom = -parseFloat(volumeStyles.height) / 2 + 'px';
			} else {
				volumeCurrent.style.left = 0;
				volumeCurrent.style.width = volumePercentage;
				volumeHandle.style.left = volumePercentage;
				volumeHandle.style.marginLeft = -parseFloat(volumeStyles.width) / 2 + 'px';
			}
		},

		/**
   * @private
   */
		handleVolumeMove = function handleVolumeMove(e) {

			var totalOffset = (0, _dom.offset)(volumeTotal),
			    volumeStyles = getComputedStyle(volumeTotal);

			var volume = null;

			// calculate the new volume based on the most recent position
			if (mode === 'vertical') {

				var railHeight = parseFloat(volumeStyles.height),
				    newY = e.pageY - totalOffset.top;

				volume = (railHeight - newY) / railHeight;

				// the controls just hide themselves (usually when mouse moves too far up)
				if (totalOffset.top === 0 || totalOffset.left === 0) {
					return;
				}
			} else {
				var railWidth = parseFloat(volumeStyles.width),
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

			e.preventDefault();
			e.stopPropagation();
		};

		mute.addEventListener('mouseenter', function (e) {
			if (e.target === mute) {
				volumeSlider.style.display = 'block';
				mouseIsOver = true;
				e.preventDefault();
				e.stopPropagation();
			}
		});
		mute.addEventListener('focusin', function () {
			volumeSlider.style.display = 'block';
			mouseIsOver = true;
		});
		mute.addEventListener('mouseleave', function () {
			mouseIsOver = false;
			if (!mouseIsDown && mode === 'vertical') {
				volumeSlider.style.display = 'none';
			}
		});
		mute.addEventListener('focusout', function () {
			mouseIsOver = false;
			if (!mouseIsDown && mode === 'vertical') {
				volumeSlider.style.display = 'none';
			}
		});
		mute.addEventListener('keydown', function (e) {

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

				e.preventDefault();
				e.stopPropagation();
			}
		});

		var mouseIsDown = false,
		    mouseIsOver = false,


		/**
   * @private
   */
		updateVolumeSlider = function updateVolumeSlider() {
			var volume = Math.floor(media.volume * 100);
			volumeSlider.setAttribute('aria-label', _i18n2.default.t('mejs.volume-slider'));
			volumeSlider.setAttribute('aria-valuemin', 0);
			volumeSlider.setAttribute('aria-valuemax', 100);
			volumeSlider.setAttribute('aria-valuenow', volume);
			volumeSlider.setAttribute('aria-valuetext', volume + '%');
			volumeSlider.setAttribute('role', 'slider');
			volumeSlider.tabIndex = -1;
		};

		// Events
		volumeSlider.addEventListener('dragstart', function () {
			return false;
		});

		volumeSlider.addEventListener('mouseover', function () {
			mouseIsOver = true;
		});
		volumeSlider.addEventListener('mousedown', function (e) {
			handleVolumeMove(e);
			t.globalBind('mousemove.vol', function (event) {
				var target = event.target;
				if (mouseIsDown && (target === volumeSlider || target.closest(mode === 'vertical' ? '.' + t.options.classPrefix + 'volume-slider' : '.' + t.options.classPrefix + 'horizontal-volume-slider'))) {
					handleVolumeMove(event);
				}
			});
			t.globalBind('mouseup.vol', function () {
				mouseIsDown = false;
				t.globalUnbind('mousemove.vol mouseup.vol');

				if (!mouseIsOver && mode === 'vertical') {
					volumeSlider.style.display = 'none';
				}
			});
			mouseIsDown = true;

			e.preventDefault();
			e.stopPropagation();
		});

		// MUTE button
		button.addEventListener('click', function () {
			media.setMuted(!media.muted);
			var event = (0, _general.createEvent)('volumechange', media);
			media.dispatchEvent(event);
		});
		button.addEventListener('focus', function () {
			if (mode === 'vertical') {
				volumeSlider.style.display = 'block';
			}
		});
		button.addEventListener('blur', function () {
			if (mode === 'vertical') {
				volumeSlider.style.display = 'none';
			}
		});

		// listen for volume change events from other sources
		media.addEventListener('volumechange', function (e) {
			if (!mouseIsDown) {
				if (media.muted) {
					positionVolumeHandle(0);
					(0, _dom.removeClass)(mute, t.options.classPrefix + 'mute');
					(0, _dom.addClass)(mute, t.options.classPrefix + 'unmute');
				} else {
					positionVolumeHandle(media.volume);
					(0, _dom.removeClass)(mute, t.options.classPrefix + 'unmute');
					(0, _dom.addClass)(mute, t.options.classPrefix + 'mute');
				}
			}
			updateVolumeSlider(e);
		});

		// mutes the media and sets the volume icon muted if the initial volume is set to 0
		if (player.options.startVolume === 0) {
			media.setMuted(true);
		}

		// shim gets the startvolume as a parameter, but we have to set it on the native <video> and <audio> elements
		var isNative = t.media.rendererName !== null && t.media.rendererName.match(/(native|html5)/) !== null;

		if (isNative) {
			media.setVolume(player.options.startVolume);
		}

		t.container.addEventListener('controlsresize', function () {
			if (media.muted) {
				positionVolumeHandle(0);
				(0, _dom.removeClass)(mute, t.options.classPrefix + 'mute');
				(0, _dom.addClass)(mute, t.options.classPrefix + 'unmute');
			} else {
				positionVolumeHandle(media.volume);
				(0, _dom.removeClass)(mute, t.options.classPrefix + 'unmute');
				(0, _dom.addClass)(mute, t.options.classPrefix + 'mute');
			}
		});
	}
});

},{"16":16,"2":2,"23":23,"24":24,"25":25,"4":4}],14:[function(_dereq_,module,exports){
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

	// core/mediaelement.js
	"mejs.download-file": "Download File",

	// renderers/flash.js
	"mejs.install-flash": "You are using a browser that does not have Flash player enabled or installed. Please turn on your Flash player plugin or download the latest version from https://get.adobe.com/flashplayer/",

	// features/fullscreen.js
	"mejs.fullscreen": "Fullscreen",

	// features/playpause.js
	"mejs.play": "Play",
	"mejs.pause": "Pause",

	// features/progress.js
	"mejs.time-slider": "Time Slider",
	"mejs.time-help-text": "Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.",
	"mejs.live-broadcast": "Live Broadcast",

	// features/volume.js
	"mejs.volume-help-text": "Use Up/Down Arrow keys to increase or decrease volume.",
	"mejs.unmute": "Unmute",
	"mejs.mute": "Mute",
	"mejs.volume-slider": "Volume Slider",

	// core/player.js
	"mejs.video-player": "Video Player",
	"mejs.audio-player": "Audio Player",

	// features/tracks.js
	"mejs.captions-subtitles": "Captions/Subtitles",
	"mejs.captions-chapters": "Chapters",
	"mejs.none": "None",
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

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof jQuery !== 'undefined') {
	_mejs2.default.$ = _window2.default.jQuery = _window2.default.$ = jQuery;
} else if (typeof Zepto !== 'undefined') {
	_mejs2.default.$ = _window2.default.Zepto = _window2.default.$ = Zepto;
} else if (typeof ender !== 'undefined') {
	_mejs2.default.$ = _window2.default.ender = _window2.default.$ = ender;
}

},{"3":3,"6":6}],16:[function(_dereq_,module,exports){
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

var _constants = _dereq_(23);

var _general = _dereq_(25);

var _time = _dereq_(28);

var _media = _dereq_(26);

var _dom = _dereq_(24);

var dom = _interopRequireWildcard(_dom);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_mejs2.default.mepIndex = 0;

_mejs2.default.players = {};

// default player values
var config = exports.config = {
	// url to poster (to fix iOS 3.x)
	poster: '',
	// When the video is ended, show the poster.
	showPosterWhenEnded: false,
	// When the video is paused, show the poster.
	showPosterWhenPaused: false,
	// Default if the <video width> is not specified
	defaultVideoWidth: 480,
	// Default if the <video height> is not specified
	defaultVideoHeight: 270,
	// If set, overrides <video width>
	videoWidth: -1,
	// If set, overrides <video height>
	videoHeight: -1,
	// Default if the user doesn't specify
	defaultAudioWidth: 400,
	// Default if the user doesn't specify
	defaultAudioHeight: 40,
	// Default amount to move back when back key is pressed
	defaultSeekBackwardInterval: function defaultSeekBackwardInterval(media) {
		return media.duration * 0.05;
	},
	// Default amount to move forward when forward key is pressed
	defaultSeekForwardInterval: function defaultSeekForwardInterval(media) {
		return media.duration * 0.05;
	},
	// Set dimensions via JS instead of CSS
	setDimensions: true,
	// Width of audio player
	audioWidth: -1,
	// Height of audio player
	audioHeight: -1,
	// Initial volume when the player starts (overridden by user cookie)
	startVolume: 0.8,
	// Useful for <audio> player loops
	loop: false,
	// Rewind to beginning when media ends
	autoRewind: true,
	// Resize to media dimensions
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
	// Force the hour marker (##:00:00)
	alwaysShowHours: false,
	// Show framecount in timecode (##:00:00:00)
	showTimecodeFrameCount: false,
	// Used when showTimecodeFrameCount is set to true
	framesPerSecond: 25,
	// Hide controls when playing and mouse is not over the video
	alwaysShowControls: false,
	// Display the video control when media is loading
	hideVideoControlsOnLoad: false,
	// Display the video controls when media is paused
	hideVideoControlsOnPause: false,
	// Enable click video element to toggle play/pause
	clickToPlayPause: true,
	// Time in ms to hide controls
	controlsTimeoutDefault: 1500,
	// Time in ms to trigger the timer when mouse moves
	controlsTimeoutMouseEnter: 2500,
	// Time in ms to trigger the timer when mouse leaves
	controlsTimeoutMouseLeave: 1000,
	// Force iPad's native controls
	iPadUseNativeControls: false,
	// Force iPhone's native controls
	iPhoneUseNativeControls: false,
	// Force Android's native controls
	AndroidUseNativeControls: false,
	// Features to show
	features: ['playpause', 'current', 'progress', 'duration', 'tracks', 'volume', 'fullscreen'],
	// Only for dynamic
	isVideo: true,
	// Stretching modes (auto, fill, responsive, none)
	stretching: 'auto',
	// Prefix class names on elements
	classPrefix: 'mejs__',
	// Turn keyboard support on and off for this instance
	enableKeyboard: true,
	// When this player starts, it will pause other players
	pauseOtherPlayers: true,
	// Number of decimal places to show if frames are shown
	secondsDecimalLength: 0,
	// Array of keyboard actions such as play/pause
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

			if (player.container.querySelector('.' + config.classPrefix + 'volume-button>button').matches(':focus') || player.container.querySelector('.' + config.classPrefix + 'volume-slider').matches(':focus')) {
				player.container.querySelector('.' + config.classPrefix + 'volume-slider').style.display = '';
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

			if (player.container.querySelector('.' + config.classPrefix + 'volume-button>button').matches(':focus') || player.container.querySelector('.' + config.classPrefix + 'volume-slider').matches(':focus')) {
				player.container.querySelector('.' + config.classPrefix + 'volume-slider').style.display = '';
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

			player.container.querySelector('.' + config.classPrefix + 'volume-slider').style.display = '';
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
 * @param {HTMLElement|String} node
 * @param {Object} o
 * @return {?MediaElementPlayer}
 */

var MediaElementPlayer = function () {
	function MediaElementPlayer(node, o) {
		_classCallCheck(this, MediaElementPlayer);

		var t = this,
		    element = typeof node === 'string' ? _document2.default.getElementById(node) : node;

		t.hasFocus = false;

		t.controlsAreVisible = true;

		t.controlsEnabled = true;

		t.controlsTimer = null;

		// enforce object, even without "new" (via John Resig)
		if (!(t instanceof MediaElementPlayer)) {
			return new MediaElementPlayer(element, o);
		}

		// these will be reset after the MediaElement.success fires
		// t.media will be the fake node to emulate all HTML5 events, methods, etc
		// t.node will be the node to be restored
		t.node = t.media = element;

		if (!t.node) {
			return;
		}

		// check for existing player
		if (t.media.player !== undefined) {
			return t.media.player;
		}

		// try to get options from data-mejsoptions
		if (o === undefined) {
			o = t.node.getAttribute('data-mejsoptions');
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
		    tagName = t.node.tagName.toLowerCase();

		// get video from src or href?
		t.isDynamic = tagName !== 'audio' && tagName !== 'video';
		t.isVideo = t.isDynamic ? t.options.isVideo : tagName !== 'audio' && t.options.isVideo;

		// use native controls in iPad, iPhone, and Android
		if (_constants.IS_IPAD && t.options.iPadUseNativeControls || _constants.IS_IPHONE && t.options.iPhoneUseNativeControls) {

			// add controls and stop
			t.node.setAttribute('controls', true);

			// override Apple's autoplay override for iPads
			if (_constants.IS_IPAD && t.node.getAttribute('autoplay')) {
				t.play();
			}
		} else if ((t.isVideo || !t.isVideo && t.options.features.length) && !(_constants.IS_ANDROID && t.options.AndroidUseNativeControls)) {

			// DESKTOP: use MediaElementPlayer controls

			// remove native controls
			t.node.removeAttribute('controls');
			var videoPlayerTitle = t.isVideo ? _i18n2.default.t('mejs.video-player') : _i18n2.default.t('mejs.audio-player');
			// insert description for screen readers
			var offscreen = _document2.default.createElement('span');
			offscreen.className = t.options.classPrefix + 'offscreen';
			offscreen.innerText = videoPlayerTitle;
			t.media.parentNode.insertBefore(offscreen, t.media);

			// build container
			t.container = _document2.default.createElement('div');
			t.container.id = t.id;
			t.container.className = t.options.classPrefix + 'container ' + t.options.classPrefix + 'container-keyboard-inactive ' + t.media.className;
			t.container.tabIndex = 0;
			t.container.setAttribute('role', 'application');
			t.container.setAttribute('aria-label', videoPlayerTitle);
			t.container.innerHTML = '<div class="' + t.options.classPrefix + 'inner">' + ('<div class="' + t.options.classPrefix + 'layers"></div>') + ('<div class="' + t.options.classPrefix + 'controls"></div>') + ('<div class="' + t.options.classPrefix + 'mediaelement"></div>') + ('<div class="' + t.options.classPrefix + 'clear"></div>') + '</div>';
			t.container.addEventListener('focus', function (e) {
				if (!t.controlsAreVisible && !t.hasFocus && t.controlsEnabled) {
					t.showControls(true);
					// In versions older than IE11, the focus causes the playbar to be displayed
					// if user clicks on the Play/Pause button in the control bar once it attempts
					// to hide it
					if (!_constants.HAS_MS_NATIVE_FULLSCREEN) {
						// If e.relatedTarget appears before container, send focus to play button,
						// else send focus to last control button.
						var btnSelector = (0, _general.isNodeAfter)(e.relatedTarget, t.container) ? '.' + t.options.classPrefix + 'controls .' + t.options.classPrefix + 'button:last-child > button' : '.' + t.options.classPrefix + 'playpause-button > button',
						    button = t.container.querySelector(btnSelector);

						button.focus();
					}
				}
			});
			t.node.parentNode.insertBefore(t.container, t.node);

			// When no elements in controls, hide bar completely
			if (!t.options.features.length) {
				t.container.style.background = 'transparent';
				t.container.querySelector('.' + t.options.classPrefix + 'controls').style.display = 'none';
			}

			if (t.isVideo && t.options.stretching === 'fill' && !dom.hasClass(t.container.parentNode, t.options.classPrefix + 'fill-container')) {
				// outer container
				t.outerContainer = t.media.parentNode;

				var wrapper = _document2.default.createElement('div');
				wrapper.className = t.options.classPrefix + 'fill-container';
				t.container.parentNode.insertBefore(wrapper, t.container);
				wrapper.appendChild(t.container);
			}

			// add classes for user and content
			if (_constants.IS_ANDROID) {
				dom.addClass(t.container, t.options.classPrefix + 'android');
			}
			if (_constants.IS_IOS) {
				dom.addClass(t.container, t.options.classPrefix + 'ios');
			}
			if (_constants.IS_IPAD) {
				dom.addClass(t.container, t.options.classPrefix + 'ipad');
			}
			if (_constants.IS_IPHONE) {
				dom.addClass(t.container, t.options.classPrefix + 'iphone');
			}
			dom.addClass(t.container, t.isVideo ? t.options.classPrefix + 'video' : t.options.classPrefix + 'audio');

			// move the <video/video> tag into the right spot
			t.container.querySelector('.' + t.options.classPrefix + 'mediaelement').appendChild(t.node);

			// needs to be assigned here, after iOS remap
			t.media.player = t;

			// find parts
			t.controls = t.container.querySelector('.' + t.options.classPrefix + 'controls');
			t.layers = t.container.querySelector('.' + t.options.classPrefix + 'layers');

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
			} else if (t.node.style.width !== '' && t.node.style.width !== null) {
				t.width = t.node.style.width;
			} else if (t.node.getAttribute('width')) {
				t.width = t.node.getAttribute('width');
			} else {
				t.width = t.options['default' + capsTagName + 'Width'];
			}

			if (t.options[tagType + 'Height'] > 0 || t.options[tagType + 'Height'].toString().indexOf('%') > -1) {
				t.height = t.options[tagType + 'Height'];
			} else if (t.node.style.height !== '' && t.node.style.height !== null) {
				t.height = t.node.style.height;
			} else if (t.node.getAttribute('height')) {
				t.height = t.node.getAttribute('height');
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
				t.node.style.display = 'none';
			}

		// create MediaElement shim
		new _mediaelement2.default(t.media, meOptions);

		if (t.container !== undefined && t.options.features.length && t.controlsAreVisible && !t.options.hideVideoControlsOnLoad) {
			// controls are shown when loaded
			var event = (0, _general.createEvent)('controlsshown', t.container);
			t.container.dispatchEvent(event);
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
				(function () {
					dom.removeClass(t.controls, t.options.classPrefix + 'offscreen');
					dom.fadeIn(t.controls, 200, function () {
						var event = (0, _general.createEvent)('controlsshown', t.container);
						t.container.dispatchEvent(event);
					});

					// any additional controls people might add and want to hide
					var controls = t.container.querySelectorAll('.' + t.options.classPrefix + 'control');

					var _loop = function _loop(i, total) {
						dom.fadeIn(controls[i], 200, function () {
							dom.removeClass(controls[i], t.options.classPrefix + 'offscreen');
						});
					};

					for (var i = 0, total = controls.length; i < total; i++) {
						_loop(i, total);
					}
				})();
			} else {
				dom.removeClass(t.controls, t.options.classPrefix + 'offscreen');
				t.controls.style.display = '';

				// any additional controls people might add and want to hide
				var controls = t.container.querySelectorAll('.' + t.options.classPrefix + 'control');
				for (var i = 0, total = controls.length; i < total; i++) {
					dom.removeClass(controls[i], t.options.classPrefix + 'offscreen');
					controls[i].style.display = '';
				}

				var event = (0, _general.createEvent)('controlsshown', t.container);
				t.container.dispatchEvent(event);
			}

			t.controlsAreVisible = true;
			t.setControlsSize();
		}
	}, {
		key: 'hideControls',
		value: function hideControls(doAnimation, forceHide) {
			var t = this;

			doAnimation = doAnimation === undefined || doAnimation;

			if (forceHide !== true && (!t.controlsAreVisible || t.options.alwaysShowControls || t.keyboardAction || t.media.paused && t.media.readyState === 4 && (!t.options.hideVideoControlsOnLoad && t.media.currentTime <= 0 || !t.options.hideVideoControlsOnPause && t.media.currentTime > 0) || t.isVideo && !t.options.hideVideoControlsOnLoad && !t.media.readyState || t.media.ended)) {
				return;
			}

			if (doAnimation) {
				(function () {
					// fade out main controls
					dom.fadeOut(t.controls, 200, function () {
						dom.addClass(t.controls, t.options.classPrefix + 'offscreen');
						t.controls.style.display = '';
						var event = (0, _general.createEvent)('controlshidden', t.container);
						t.container.dispatchEvent(event);
					});

					// any additional controls people might add and want to hide
					var controls = t.container.querySelectorAll('.' + t.options.classPrefix + 'control');

					var _loop2 = function _loop2(i, total) {
						dom.fadeOut(controls[i], 200, function () {
							dom.addClass(controls[i], t.options.classPrefix + 'offscreen');
							controls[i].style.display = '';
						});
					};

					for (var i = 0, total = controls.length; i < total; i++) {
						_loop2(i, total);
					}
				})();
			} else {

				// hide main controls
				dom.addClass(t.controls, t.options.classPrefix + 'offscreen');
				t.controls.style.display = '';

				// hide others
				var controls = t.container.querySelectorAll('.' + t.options.classPrefix + 'control');
				for (var i = 0, total = controls.length; i < total; i++) {
					dom.addClass(controls[i], t.options.classPrefix + 'offscreen');
					controls[i].style.display = '';
				}

				var event = (0, _general.createEvent)('controlshidden', t.container);
				t.container.dispatchEvent(event);
			}

			t.controlsAreVisible = false;
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
			t.controlsEnabled = true;
			t.hideControls(false, true);
		}
	}, {
		key: 'enableControls',
		value: function enableControls() {
			var t = this;

			t.controlsEnabled = true;
			t.showControls(false);
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

			var t = this,
			    autoplayAttr = domNode.getAttribute('autoplay'),
			    autoplay = !(autoplayAttr === undefined || autoplayAttr === null || autoplayAttr === 'false'),
			    isNative = media.rendererName !== null && media.rendererName.match(/(native|html5)/) !== null;

			if (t.controls) {
				t.enableControls();
			}

			if (t.container.querySelector('.' + t.options.classPrefix + 'overlay-play')) {
				t.container.querySelector('.' + t.options.classPrefix + 'overlay-play').style.display = '';
			}

			// make sure it can't create itself again if a plugin reloads
			if (t.created) {
				return;
			}

			t.created = true;
			t.media = media;
			t.domNode = domNode;

			if (!(_constants.IS_ANDROID && t.options.AndroidUseNativeControls) && !(_constants.IS_IPAD && t.options.iPadUseNativeControls) && !(_constants.IS_IPHONE && t.options.iPhoneUseNativeControls)) {
				var _ret5 = function () {

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

					// cache container to store control elements' original position
					t.featurePosition = {};

					// add user-defined features/controls
					for (var i = 0, total = t.options.features.length; i < total; i++) {
						var feature = t.options.features[i];
						if (t['build' + feature]) {
							try {
								t['build' + feature](t, t.controls, t.layers, t.media);
							} catch (e) {
								// TODO: report control error
								console.error('error building ' + feature, e);
							}
						}
					}

					var event = (0, _general.createEvent)('controlsready', t.container);
					t.container.dispatchEvent(event);

					// reset all layers and controls
					t.setPlayerSize(t.width, t.height);
					t.setControlsSize();

					// controls fade
					if (t.isVideo) {

						if ((_constants.IS_ANDROID || _constants.IS_IOS) && !t.options.alwaysShowControls) {

							// for touch devices (iOS, Android)
							// show/hide without animation on touch

							t.node.addEventListener('touchstart', function () {

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

							t.createIframeLayer();

							// create callback here since it needs access to current
							// MediaElement object
							t.clickToPlayPauseCallback = function () {

								if (t.options.clickToPlayPause) {
									var button = t.container.querySelector('.' + t.options.classPrefix + 'overlay-button'),
									    pressed = button.getAttribute('aria-pressed');

									if (t.media.paused && pressed) {
										t.pause();
									} else if (t.media.paused) {
										t.play();
									} else {
										t.pause();
									}

									button.setAttribute('aria-pressed', !pressed);
								}
							};

							// click to play/pause
							t.media.addEventListener('click', t.clickToPlayPauseCallback, false);

							// show/hide controls
							t.container.addEventListener('mouseenter', function () {
								if (t.controlsEnabled) {
									if (!t.options.alwaysShowControls) {
										t.killControlsTimer('enter');
										t.showControls();
										t.startControlsTimer(t.options.controlsTimeoutMouseEnter);
									}
								}
							});
							t.container.addEventListener('mousemove', function () {
								if (t.controlsEnabled) {
									if (!t.controlsAreVisible) {
										t.showControls();
									}
									if (!t.options.alwaysShowControls) {
										t.startControlsTimer(t.options.controlsTimeoutMouseEnter);
									}
								}
							});
							t.container.addEventListener('mouseleave', function () {
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
								if (t.options.videoHeight <= 0 && !t.domNode.getAttribute('height') && e.target !== null && !isNaN(e.target.videoHeight)) {
									t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);
									t.setControlsSize();
									t.media.setSize(e.target.videoWidth, e.target.videoHeight);
								}
							});
						}
					}

					// EVENTS

					// FOCUS: when a video starts playing, it takes focus from other players (possibly pausing them)
					t.media.addEventListener('play', function () {
						t.hasFocus = true;

						// go through all other players
						for (var playerIndex in _mejs2.default.players) {
							if (_mejs2.default.players.hasOwnProperty(playerIndex)) {
								var p = _mejs2.default.players[playerIndex];

								if (p.id !== t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended) {
									p.pause();
									p.hasFocus = false;
								}
							}
						}
					});

					// ended for all
					t.media.addEventListener('ended', function () {
						if (t.options.autoRewind) {
							try {
								t.media.setCurrentTime(0);
								// Fixing an Android stock browser bug, where "seeked" isn't fired correctly after
								// ending the video and jumping to the beginning
								setTimeout(function () {
									t.container.querySelector('.' + t.options.classPrefix + 'overlay-loading').parentNode.style.display = 'none';
								}, 20);
							} catch (exp) {
								
							}
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
					});

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
					});

					// Only change the time format when necessary
					var duration = null;
					t.media.addEventListener('timeupdate', function () {
						if (duration !== t.media.duration) {
							duration = t.media.duration;
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
					});

					t.container.addEventListener('focusout', function (e) {
						setTimeout(function () {
							//FF is working on supporting focusout https://bugzilla.mozilla.org/show_bug.cgi?id=687787
							if (e.relatedTarget) {
								if (t.keyboardAction && !e.relatedTarget.closest('.mejs-container')) {
									t.keyboardAction = false;
									if (t.isVideo && !t.options.alwaysShowControls) {
										t.hideControls(true);
									}
								}
							}
						}, 0);
					});

					// webkit has trouble doing this without a delay
					setTimeout(function () {
						t.setPlayerSize(t.width, t.height);
						t.setControlsSize();
					}, 0);

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
						if (e.target.matches('.' + t.options.classPrefix + 'container')) {
							dom.addClass(e.target, t.options.classPrefix + 'container-keyboard-inactive');
						} else if (e.target.closest('.' + t.options.classPrefix + 'container')) {
							dom.addClass(e.target.closest('.' + t.options.classPrefix + 'container'), t.options.classPrefix + 'container-keyboard-inactive');
						}
					});

					// Enable focus outline for Accessibility purposes
					t.globalBind('keydown', function (e) {
						if (e.target.matches('.' + t.options.classPrefix + 'container')) {
							dom.removeClass(e.target, t.options.classPrefix + 'container-keyboard-inactive');
						} else if (e.target.closest('.' + t.options.classPrefix + 'container')) {
							dom.removeClass(event.target.closest('.' + t.options.classPrefix + 'container'), t.options.classPrefix + 'container-keyboard-inactive');
						}
					});
				}();

				if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
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

			var play = t.layers.querySelector('.' + t.options.classPrefix + 'overlay-play');

			if (play) {
				play.style.display = 'none';
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
					var target = t.media.firstChild;

					t.width = parseFloat(target.offsetWidth);
					t.height = parseFloat(target.offsetHeight);
					t.setDimensions(t.width, t.height);
					return false;
				});

				var target = t.media.firstChild;

				if (target.length) {
					t.width = target.offsetWidth;
					t.height = target.offsetHeight;
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
			return t.height.toString().includes('%') || t.node.style.maxWidth !== 'none' && t.node.style.maxWidth !== t.width || t.node.currentStyle && t.node.currentStyle.maxWidth === '100%';
		}
	}, {
		key: 'setResponsiveMode',
		value: function setResponsiveMode() {
			var t = this,
			    parent = function () {

				var parentEl = void 0,
				    el = t.container;

				// traverse parents to find the closest visible one
				while (el) {
					parentEl = el.parentElement;
					if (parentEl && dom.visible(parentEl)) {
						return parentEl;
					}
					el = parentEl;
				}

				return null;
			}(),
			    parentStyles = getComputedStyle(parent, null),
			    nativeWidth = function () {
				if (t.isVideo) {
					if (t.media.videoWidth && t.media.videoWidth > 0) {
						return t.media.videoWidth;
					} else if (t.node.getAttribute('width')) {
						return t.node.getAttribute('width');
					} else {
						return t.options.defaultVideoWidth;
					}
				} else {
					return t.options.defaultAudioWidth;
				}
			}(),
			    nativeHeight = function () {
				if (t.isVideo) {
					if (t.media.videoHeight && t.media.videoHeight > 0) {
						return t.media.videoHeight;
					} else if (t.node.getAttribute('height')) {
						return t.node.getAttribute('height');
					} else {
						return t.options.defaultVideoHeight;
					}
				} else {
					return t.options.defaultAudioHeight;
				}
			}(),
			    aspectRatio = function () {
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
			    parentHeight = parseFloat(parentStyles.height);

			var newHeight = void 0,
			    parentWidth = parseFloat(parentStyles.width);

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

			if (t.container.parentNode.length > 0 && t.container.parentNode.tagName.toLowerCase() === 'body') {
				parentWidth = _window2.default.innerWidth || _document2.default.documentElement.clientWidth || _document2.default.body.clientWidth;
				newHeight = _window2.default.innerHeight || _document2.default.documentElement.clientHeight || _document2.default.body.clientHeight;
			}

			if (newHeight && parentWidth) {

				// set outer container size
				t.container.style.width = parentWidth + 'px';
				t.container.style.height = newHeight + 'px';

				// set native <video> or <audio> and shims
				t.node.style.width = '100%';
				t.node.style.height = '100%';

				// if shim is ready, send the size to the embedded plugin
				if (t.isVideo && t.media.setSize) {
					t.media.setSize(parentWidth, newHeight);
				}

				// set the layers
				var layerChildren = t.layers.childNodes;
				for (var i = 0, total = layerChildren.length; i < total; i++) {
					layerChildren[i].style.width = '100%';
					layerChildren[i].style.height = '100%';
				}
			}
		}
	}, {
		key: 'setFillMode',
		value: function setFillMode() {
			var t = this,
			    parent = t.outerContainer;

			var parentStyles = getComputedStyle(parent);

			// Remove the responsive attributes in the event they are there
			if (t.node.style.height !== 'none' && t.node.style.height !== t.height) {
				t.node.style.height = '';
			}
			if (t.node.style.maxWidth !== 'none' && t.node.style.maxWidth !== t.width) {
				t.node.style.maxWidth = '';
			}

			if (t.node.style.maxHeight !== 'none' && t.node.style.maxHeight !== t.height) {
				t.node.style.maxHeight = '';
			}

			if (t.node.currentStyle) {
				if (t.node.currentStyle.height === '100%') {
					t.node.currentStyle.height = '';
				}
				if (t.node.currentStyle.maxWidth === '100%') {
					t.node.currentStyle.maxWidth = '';
				}
				if (t.node.currentStyle.maxHeight === '100%') {
					t.node.currentStyle.maxHeight = '';
				}
			}

			if (!parseFloat(parentStyles.width)) {
				parent.style.width = t.media.offsetWidth + 'px';
			}

			if (!parseFloat(parentStyles.height)) {
				parent.style.height = t.media.offsetHeight + 'px';
			}

			parentStyles = getComputedStyle(parent);

			var parentWidth = parseFloat(parentStyles.width),
			    parentHeight = parseFloat(parentStyles.height);

			t.setDimensions('100%', '100%');

			// This prevents an issue when displaying poster
			var poster = t.container.querySelector(t.options.classPrefix + 'poster img');
			if (poster) {
				poster.style.display = '';
			}

			// calculate new width and height
			var targetElement = t.container.querySelectorAll('object, embed, iframe, video'),
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
			    finalHeight = bScaleOnWidth ? Math.floor(scaleY1) : Math.floor(scaleY2),
			    width = bScaleOnWidth ? parentWidth + 'px' : finalWidth + 'px',
			    height = bScaleOnWidth ? finalHeight + 'px' : parentHeight + 'px';

			for (var i = 0, total = targetElement.length; i < total; i++) {
				targetElement[i].style.height = height;
				targetElement[i].style.width = width;
				if (t.media.setSize) {
					t.media.setSize(width, height);
				}

				targetElement[i].style.marginLeft = Math.floor((parentWidth - finalWidth) / 2) + 'px';
				targetElement[i].style.marginTop = 0;
			}
		}
	}, {
		key: 'setDimensions',
		value: function setDimensions(width, height) {
			var t = this;

			width = (0, _general.isString)(width) && width.includes('%') ? width : parseFloat(width) + 'px';
			height = (0, _general.isString)(height) && height.includes('%') ? height : parseFloat(height) + 'px';

			t.container.style.width = width;
			t.container.style.height = height;

			var layers = t.layers.childNodes;
			for (var i = 0, total = layers.length; i < total; i++) {
				layers[i].style.width = width;
				layers[i].style.height = height;
			}
		}
	}, {
		key: 'setControlsSize',
		value: function setControlsSize() {
			var t = this;

			// skip calculation if hidden
			if (!dom.visible(t.container) || !t.rail || !dom.visible(t.rail)) {
				return;
			}

			var railStyles = getComputedStyle(t.rail),
			    totalStyles = getComputedStyle(t.total),
			    railMargin = parseFloat(railStyles.marginLeft) + parseFloat(railStyles.marginRight),
			    totalMargin = parseFloat(totalStyles.marginLeft) + parseFloat(totalStyles.marginRight) || 0;

			var siblingsWidth = 0;

			var siblings = dom.siblings(t.rail, function (el) {
				return el !== t.rail;
			}),
			    total = siblings.length;
			for (var i = 0; i < total; i++) {
				siblingsWidth += siblings[i].offsetWidth;
			}

			siblingsWidth += totalMargin + (totalMargin === 0 ? railMargin * 2 : railMargin) + 1;

			// Substract the width of the feature siblings from time rail
			var controlsWidth = parseFloat(t.controls.offsetWidth);
			t.rail.style.width = (siblingsWidth > controlsWidth ? 0 : controlsWidth - siblingsWidth) + 'px';

			var event = (0, _general.createEvent)('controlsresize', t.container);
			t.container.dispatchEvent(event);
		}

		/**
   * Add featured control element and cache its position in case features are reset
   *
   * @param {HTMLElement} element
   * @param {String} key
   */

	}, {
		key: 'addControlElement',
		value: function addControlElement(element, key) {

			var t = this;

			if (t.featurePosition[key] !== undefined) {
				var child = t.controls.childNodes[t.featurePosition[key] - 1];
				child.parentNode.insertBefore(element, child.nextSibling);
			} else {
				t.controls.appendChild(element);
				var children = t.controls.childNodes;
				for (var i = 0, total = children.length; i < total; i++) {
					if (element == children[i]) {
						t.featurePosition[key] = i;
						break;
					}
				}
			}
		}

		/**
   * Append layer to manipulate `<iframe>` elements safely.
   *
   * This allows the user to trigger events properly given that mouse/click don't get lost in the `<iframe>`.
   */

	}, {
		key: 'createIframeLayer',
		value: function createIframeLayer() {

			var t = this;

			if (t.isVideo && t.media.rendererName !== null && t.media.rendererName.match(/iframe/i) !== null && !_document2.default.getElementById(t.media.id + '-iframe-overlay')) {

				var layer = _document2.default.createElement('div'),
				    target = _document2.default.getElementById(t.media.id + '_' + t.media.rendererName);

				layer.id = t.media.id + '-iframe-overlay';
				layer.className = t.options.classPrefix + 'iframe-overlay';
				layer.addEventListener('click', function (e) {
					if (t.options.clickToPlayPause) {
						if (t.media.paused) {
							t.media.play();
						} else {
							t.media.pause();
						}

						e.preventDefault();
						e.stopPropagation();
					}
				});

				target.parentNode.insertBefore(layer, target);
			}
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
			    posterDiv = t.container.querySelector('.' + t.options.classPrefix + 'poster');

			var posterImg = posterDiv.querySelector('img');

			if (!posterImg) {
				posterImg = _document2.default.createElement('img');
				posterImg.className = t.options.classPrefix + 'poster-img';
				posterImg.width = '100%';
				posterImg.height = '100%';
				posterDiv.appendChild(posterImg);
			}

			posterImg.setAttribute('src', url);
			posterDiv.style.backgroundImage = 'url("' + url + '")';
		}
	}, {
		key: 'changeSkin',
		value: function changeSkin(className) {
			var t = this;

			t.container.className = t.options.classPrefix + 'container ' + className;
			t.setPlayerSize(t.width, t.height);
			t.setControlsSize();
		}
	}, {
		key: 'globalBind',
		value: function globalBind(events, callback) {
			var t = this,
			    doc = t.node ? t.node.ownerDocument : _document2.default;

			events = (0, _general.splitEvents)(events, t.id);
			if (events.d) {
				var eventList = events.d.split(' ');
				for (var i = 0, total = eventList.length; i < total; i++) {
					eventList[i].split('.').reduce(function (part, e) {
						doc.addEventListener(e, callback, false);
						return e;
					}, '');
				}
			}
			if (events.w) {
				var _eventList = events.w.split(' ');
				for (var _i = 0, _total = _eventList.length; _i < _total; _i++) {
					_eventList[_i].split('.').reduce(function (part, e) {
						_window2.default.addEventListener(e, callback, false);
						return e;
					}, '');
				}
			}
		}
	}, {
		key: 'globalUnbind',
		value: function globalUnbind(events, callback) {

			var t = this,
			    doc = t.node ? t.node.ownerDocument : _document2.default;

			events = (0, _general.splitEvents)(events, t.id);
			if (events.d) {
				var eventList = events.d.split(' ');
				for (var i = 0, total = eventList.length; i < total; i++) {
					eventList[i].split('.').reduce(function (part, e) {
						doc.removeEventListener(e, callback, false);
						return e;
					}, '');
				}
			}
			if (events.w) {
				var _eventList2 = events.d.split(' ');
				for (var _i2 = 0, _total2 = _eventList2.length; _i2 < _total2; _i2++) {
					_eventList2[_i2].split('.').reduce(function (part, e) {
						_window2.default.removeEventListener(e, callback, false);
						return e;
					}, '');
				}
			}
		}
	}, {
		key: 'buildposter',
		value: function buildposter(player, controls, layers, media) {

			var t = this,
			    poster = _document2.default.createElement('div');

			poster.className = t.options.classPrefix + 'poster ' + t.options.classPrefix + 'layer';
			layers.appendChild(poster);

			var posterUrl = player.media.getAttribute('poster');

			// priority goes to option (this is useful if you need to support iOS 3.x (iOS completely fails with poster)
			if (player.options.poster !== '') {
				posterUrl = player.options.poster;
			}

			// second, try the real poster
			if (posterUrl) {
				t.setPoster(posterUrl);
			} else {
				poster.style.display = 'none';
			}

			media.addEventListener('play', function () {
				poster.style.display = 'none';
			});

			media.addEventListener('playing', function () {
				poster.style.display = 'none';
			});

			if (player.options.showPosterWhenEnded && player.options.autoRewind) {
				media.addEventListener('ended', function () {
					poster.style.display = '';
				});
			}

			media.addEventListener('error', function () {
				poster.style.display = 'none';
			});

			if (player.options.showPosterWhenPaused) {
				media.addEventListener('pause', function () {
					// To avoid displaying the poster when video ended, since it
					// triggers a pause event as well
					if (!media.ended) {
						poster.style.display = '';
					}
				});
			}
		}
	}, {
		key: 'buildoverlays',
		value: function buildoverlays(player, controls, layers, media) {

			if (!player.isVideo) {
				return;
			}

			var t = this,
			    loading = _document2.default.createElement('div'),
			    error = _document2.default.createElement('div'),

			// this needs to come last so it's on top
			bigPlay = _document2.default.createElement('div'),
			    buffer = controls.querySelector('.' + t.options.classPrefix + 'time-buffering');

			loading.style.display = 'none'; // start out hidden
			loading.className = t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'layer';
			loading.innerHTML = '<div class="' + t.options.classPrefix + 'overlay-loading">' + ('<span class="' + t.options.classPrefix + 'overlay-loading-bg-img"></span>') + '</div>';
			layers.appendChild(loading);

			error.style.display = 'none';
			error.className = t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'layer';
			error.innerHTML = '<div class="' + t.options.classPrefix + 'overlay-error"></div>';
			layers.appendChild(error);

			bigPlay.className = t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'layer ' + t.options.classPrefix + 'overlay-play';
			bigPlay.innerHTML = '<div class="' + t.options.classPrefix + 'overlay-button" role="button" tabindex="0"' + ('aria-label="' + _i18n2.default.t('mejs.play') + '" aria-pressed="false"></div>');
			bigPlay.addEventListener('click', function () {
				// Removed 'touchstart' due issues on Samsung Android devices where a tap on bigPlay
				// started and immediately stopped the video
				if (t.options.clickToPlayPause) {

					var button = t.container.querySelector('.' + t.options.classPrefix + 'overlay-button'),
					    pressed = button.getAttribute('aria-pressed');

					if (media.paused) {
						media.play();
					} else {
						media.pause();
					}

					button.setAttribute('aria-pressed', !!pressed);
				}
			});
			layers.appendChild(bigPlay);

			if (t.media.rendererName !== null && (t.media.rendererName.match(/(youtube|facebook)/) && !(player.media.originalNode.getAttribute('poster') || player.options.poster) || _constants.IS_STOCK_ANDROID)) {
				bigPlay.style.display = 'none';
			}

			// show/hide big play button
			media.addEventListener('play', function () {
				bigPlay.style.display = 'none';
				loading.style.display = 'none';
				if (buffer) {
					buffer.style.display = 'none';
				}
				error.style.display = 'none';
			});

			media.addEventListener('playing', function () {
				bigPlay.style.display = 'none';
				loading.style.display = 'none';
				if (buffer) {
					buffer.style.display = 'none';
				}
				error.style.display = 'none';
			});

			media.addEventListener('seeking', function () {
				loading.style.display = '';
				if (buffer) {
					buffer.style.display = '';
				}
			});

			media.addEventListener('seeked', function () {
				loading.style.display = 'none';
				if (buffer) {
					buffer.style.display = '';
				}
			});

			media.addEventListener('pause', function () {
				if (!_constants.IS_STOCK_ANDROID) {
					bigPlay.style.display = '';
				}
			});

			media.addEventListener('waiting', function () {
				loading.style.display = '';
				if (buffer) {
					buffer.style.display = '';
				}
			});

			// show/hide loading
			media.addEventListener('loadeddata', function () {
				loading.style.display = '';
				if (buffer) {
					buffer.style.display = '';
				}

				// Firing the 'canplay' event after a timeout which isn't getting fired on some Android 4.1 devices
				// (https://github.com/johndyer/mediaelement/issues/1305)
				if (_constants.IS_ANDROID) {
					media.canplayTimeout = setTimeout(function () {
						if (_document2.default.createEvent) {
							var evt = _document2.default.createEvent('HTMLEvents');
							evt.initEvent('canplay', true, true);
							return media.dispatchEvent(evt);
						}
					}, 300);
				}
			});
			media.addEventListener('canplay', function () {
				loading.style.display = 'none';
				if (buffer) {
					buffer.style.display = 'none';
				}
				// Clear timeout inside 'loadeddata' to prevent 'canplay' from firing twice
				clearTimeout(media.canplayTimeout);
			});

			// error handling
			media.addEventListener('error', function (e) {
				t._handleError(e);
				loading.style.display = 'none';
				bigPlay.style.display = 'none';
				error.style.display = 'block';
				error.querySelector('.' + t.options.classPrefix + 'overlay-error').innerHTML = e.message;
			});

			media.addEventListener('keydown', function (e) {
				t.onkeydown(player, media, e);
			});
		}
	}, {
		key: 'buildkeyboard',
		value: function buildkeyboard(player, controls, layers, media) {

			var t = this;

			t.container.addEventListener('keydown', function () {
				t.keyboardAction = true;
			});

			// listen for key presses
			t.globalBind('keydown', function (event) {
				var container = _document2.default.activeElement.closest('.' + t.options.classPrefix + 'container'),
				    target = t.media.closest('.' + t.options.classPrefix + 'container');
				t.hasFocus = !!(container && target && container.id === target.id);
				return t.onkeydown(player, media, event);
			});

			// check if someone clicked outside a player region, then kill its focus
			t.globalBind('click', function (event) {
				t.hasFocus = !!event.target.closest('.' + t.options.classPrefix + 'container');
			});
		}
	}, {
		key: 'onkeydown',
		value: function onkeydown(player, media, e) {

			if (player.hasFocus && player.options.enableKeyboard) {
				// find a matching key
				for (var i = 0, total = player.options.keyActions.length; i < total; i++) {
					var keyAction = player.options.keyActions[i];

					for (var j = 0, jl = keyAction.keys.length; j < jl; j++) {
						if (e.keyCode === keyAction.keys[j]) {
							keyAction.action(player, media, e.keyCode, e);
							e.preventDefault();
							e.stopPropagation();
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
			} catch (e) {
				
			}
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
			var t = this,
			    layer = _document2.default.getElementById(t.media.id + '-iframe-overlay');

			if (layer) {
				layer.remove();
			}

			t.media.setSrc(src);

			t.createIframeLayer();
		}
	}, {
		key: 'remove',
		value: function remove() {

			var t = this,
			    rendererName = t.media.rendererName;

			// Stop completely media playing
			if (!t.media.paused) {
				t.media.pause();
			}

			var src = t.media.originalNode.getAttribute('src');
			t.media.setSrc('');

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
			var nativeWidth = t.node.getAttribute('width'),
			    nativeHeight = t.node.getAttribute('height');
			if (nativeWidth) {
				if (nativeWidth.match('%') === null) {
					nativeWidth = nativeWidth + 'px';
				}
			} else {
				nativeWidth = 'auto';
			}
			if (nativeHeight) {
				if (nativeHeight.match('%') === null) {
					nativeHeight = nativeHeight + 'px';
				}
			} else {
				nativeHeight = 'auto';
			}
			t.node.style.width = nativeWidth;
			t.node.style.height = nativeHeight;

			// grab video and put it back in place
			if (!t.isDynamic) {
				t.node.setAttribute('controls', true);
				t.node.setAttribute('id', t.node.getAttribute('id').replace('_' + rendererName, '').replace('_from_mejs', ''));

				// Remove `autoplay` (not worth bringing it back once player is destroyed)
				delete t.node.autoplay;

				// Reintegrate file if it can be played
				if (t.media.canPlayType((0, _media.getTypeFromFile)(src))) {
					t.node.setAttribute('src', src);
				}

				// If <iframe>, remove overlay
				if (rendererName.match(/iframe/i) !== null) {
					var layer = _document2.default.getElementById(t.media.id + '-iframe-overlay');
					layer.remove();
				}

				var node = t.node.cloneNode(true);
				t.container.parentNode.insertBefore(node, t.container);
				t.node.remove();
				delete t.node;
			} else {
				t.container.parentNode.insertBefore(t.node, t.container);
			}

			if (typeof t.media.destroy === 'function') {
				t.media.destroy();
			}

			// Remove the player from the mejs.players object so that pauseOtherPlayers doesn't blow up when trying to
			// pause a non existent Flash API.
			delete _mejs2.default.players[t.id];

			if (_typeof(t.container) === 'object') {
				var offscreen = t.container.parentNode.querySelector('.' + t.options.classPrefix + 'offscreen');
				offscreen.remove();
				t.container.remove();
			}
			t.globalUnbind();

			delete t.media.player;
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

},{"2":2,"23":23,"24":24,"25":25,"26":26,"28":28,"3":3,"4":4,"5":5,"6":6}],17:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _general = _dereq_(25);

var _media = _dereq_(26);

var _constants = _dereq_(23);

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

		// Skip script loading since it is already loaded
		if (typeof dashjs !== 'undefined') {
			NativeDash.createInstance(settings);
		} else if (!NativeDash.isScriptLoaded) {
			(function () {

				settings.options.path = typeof settings.options.path === 'string' ? settings.options.path : '//cdn.dashjs.org/latest/dash.mediaplayer.min.js';

				var script = _document2.default.createElement('script'),
				    firstScriptTag = _document2.default.getElementsByTagName('script')[0];

				var done = false;

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

				NativeDash.isScriptLoaded = true;
			})();
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
			// Special config: used to set the local path/URL of dash.js player library
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

		var originalNode = mediaElement.originalNode,
		    id = mediaElement.id + '_' + options.prefix,
		    preload = originalNode.getAttribute('preload'),
		    autoplay = originalNode.autoplay;

		var node = null,
		    dashPlayer = null;

		node = originalNode.cloneNode(true);
		options = Object.assign(options, mediaElement.options);

		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {
			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			node['get' + capName] = function () {
				return dashPlayer !== null ? node[propName] : null;
			};

			node['set' + capName] = function (value) {
				if (!_mejs2.default.html5media.readOnlyProperties.includes(propName)) {
					if (dashPlayer !== null) {
						if (propName === 'src') {

							dashPlayer.attachSource(value);
							if (autoplay) {
								node.play();
							}
						}

						node[propName] = value;
					}
				}
			};
		};

		for (var i = 0, total = props.length; i < total; i++) {
			assignGettersSetters(props[i]);
		}

		// Initial method to register all M-Dash events
		_window2.default['__ready__' + id] = function (_dashPlayer) {

			mediaElement.dashPlayer = dashPlayer = _dashPlayer;

			dashPlayer.getDebug().setLogToBrowserConsole(options.dash.debug);
			dashPlayer.setAutoPlay(preload && preload === 'auto' || autoplay);
			dashPlayer.setScheduleWhilePaused(preload && preload === 'auto' || autoplay);

			var events = _mejs2.default.html5media.events.concat(['click', 'mouseover', 'mouseout']),
			    dashEvents = dashjs.MediaPlayer.events,
			    assignEvents = function assignEvents(eventName) {

				if (eventName === 'loadedmetadata') {
					dashPlayer.initialize(node, node.src, false);
				}

				node.addEventListener(eventName, function (e) {
					var event = _document2.default.createEvent('HTMLEvents');
					event.initEvent(e.type, e.bubbles, e.cancelable);
					mediaElement.dispatchEvent(event);
				});
			};

			for (var _i = 0, _total = events.length; _i < _total; _i++) {
				assignEvents(events[_i]);
			}

			/**
    * Custom M(PEG)-DASH events
    *
    * These events can be attached to the original node using addEventListener and the name of the event,
    * not using dashjs.MediaPlayer.events object
    * @see http://cdn.dashjs.org/latest/jsdoc/MediaPlayerEvents.html
    */
			var assignMdashEvents = function assignMdashEvents(e) {
				var event = (0, _general.createEvent)(e.type, node);
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
			for (var _i2 = 0, _total2 = mediaFiles.length; _i2 < _total2; _i2++) {
				if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[_i2].type)) {
					node.setAttribute('src', mediaFiles[_i2].src);
					break;
				}
			}
		}

		node.setAttribute('id', id);

		originalNode.parentNode.insertBefore(node, originalNode);
		originalNode.autoplay = false;
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

		var event = (0, _general.createEvent)('rendererready', node);
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

},{"2":2,"23":23,"25":25,"26":26,"3":3,"6":6,"7":7}],18:[function(_dereq_,module,exports){
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

var _general = _dereq_(25);

var _constants = _dereq_(23);

var _media = _dereq_(26);

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

		// Firefox, Webkit, Opera; avoid MS Edge since `plugins` cannot be accessed
		if (_constants.NAV.plugins !== null && _constants.NAV.plugins !== undefined && _typeof(_constants.NAV.plugins[pluginName]) === 'object') {
			description = _constants.NAV.plugins[pluginName].description;
			if (description && !(typeof _constants.NAV.mimeTypes !== 'undefined' && _constants.NAV.mimeTypes[mimeType] && !_constants.NAV.mimeTypes[mimeType].enabledPlugin)) {
				version = description.replace(pluginName, '').replace(/^\s+/, '').replace(/\sr/gi, '.').split('.');
				for (var i = 0, total = version.length; i < total; i++) {
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
			} catch (e) {
				
			}
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

		var flash = {};

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

		for (var i = 0, total = props.length; i < total; i++) {
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
		for (var _i = 0, _total = methods.length; _i < _total; _i++) {
			assignMethods(methods[_i]);
		}

		// give initial events like in others renderers
		var initEvents = ['rendererready', 'loadeddata', 'loadedmetadata', 'canplay', 'error'];

		for (var _i2 = 0, _total2 = initEvents.length; _i2 < _total2; _i2++) {
			var event = (0, _general.createEvent)(initEvents[_i2], flash);
			mediaElement.dispatchEvent(event);
		}

		// add a ready method that Flash can call to
		_window2.default['__ready__' + flash.id] = function () {

			flash.flashReady = true;
			flash.flashApi = _document2.default.getElementById('__' + flash.id);

			// do call stack
			if (flash.flashApiStack.length) {
				for (var _i3 = 0, _total3 = flash.flashApiStack.length; _i3 < _total3; _i3++) {

					var stackItem = flash.flashApiStack[_i3];

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

			var event = (0, _general.createEvent)(eventName, flash);
			event.message = message || '';

			// send event from Flash up to the mediaElement
			flash.mediaElement.dispatchEvent(event);
		};

		// insert Flash object
		flash.flashWrapper = _document2.default.createElement('div');

		// If the access script flag does not have any of the valid values, set to `sameDomain` by default
		if (!['always', 'sameDomain'].includes(flash.options.shimScriptAccess)) {
			flash.options.shimScriptAccess = 'sameDomain';
		}

		var autoplay = mediaElement.originalNode.autoplay,
		    flashVars = ['uid=' + flash.id, 'autoplay=' + autoplay, 'allowScriptAccess=' + flash.options.shimScriptAccess],
		    isVideo = mediaElement.originalNode !== null && mediaElement.originalNode.tagName.toLowerCase() === 'video',
		    flashHeight = isVideo ? mediaElement.originalNode.height : 1,
		    flashWidth = isVideo ? mediaElement.originalNode.width : 1;

		if (mediaElement.originalNode.getAttribute('src')) {
			flashVars.push('src=' + mediaElement.originalNode.getAttribute('src'));
		}

		if (flash.options.enablePseudoStreaming === true) {
			flashVars.push('pseudostreamstart=' + flash.options.pseudoStreamingStartQueryParam);
			flashVars.push('pseudostreamtype=' + flash.options.pseudoStreamingType);
		}

		mediaElement.appendChild(flash.flashWrapper);

		if (mediaElement.originalNode !== null) {
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

			specialIEContainer.outerHTML = '<object ' + settings.join(' ') + '>' + ('<param name="movie" value="' + flash.options.pluginPath + flash.options.filename + '?x=' + new Date() + '" />') + ('<param name="flashvars" value="' + flashVars.join('&amp;') + '" />') + '<param name="quality" value="high" />' + '<param name="bgcolor" value="#000000" />' + '<param name="wmode" value="transparent" />' + ('<param name="allowScriptAccess" value="' + flash.options.shimScriptAccess + '" />') + '<param name="allowFullScreen" value="true" />' + ('<div>' + _i18n2.default.t('mejs.install-flash') + '</div>') + '</object>';
		} else {

			settings = ['id="__' + flash.id + '"', 'name="__' + flash.id + '"', 'play="true"', 'loop="false"', 'quality="high"', 'bgcolor="#000000"', 'wmode="transparent"', 'allowScriptAccess="' + flash.options.shimScriptAccess + '"', 'allowFullScreen="true"', 'type="application/x-shockwave-flash"', 'pluginspage="//www.macromedia.com/go/getflashplayer"', 'src="' + flash.options.pluginPath + flash.options.filename + '"', 'flashvars="' + flashVars.join('&') + '"', 'width="' + flashWidth + '"', 'height="' + flashHeight + '"'];

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
				} catch (e) {
					
				}
			}
		};
		flash.show = function () {
			if (isVideo) {
				flash.flashNode.style.position = '';
				flash.flashNode.style.width = '';
				flash.flashNode.style.height = '';
				try {
					flash.flashNode.style.clip = '';
				} catch (e) {
					
				}
			}
		};
		flash.setSize = function (width, height) {
			flash.flashNode.style.width = width + 'px';
			flash.flashNode.style.height = height + 'px';

			if (flash.flashApi !== null && typeof flash.flashApi.fire_setSize === 'function') {
				flash.flashApi.fire_setSize(width, height);
			}
		};

		flash.destroy = function () {
			flash.flashNode.remove();
		};

		if (mediaFiles && mediaFiles.length > 0) {
			for (var _i4 = 0, _total4 = mediaFiles.length; _i4 < _total4; _i4++) {
				if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[_i4].type)) {
					flash.setSrc(mediaFiles[_i4].src);
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
		} else if (url.includes('.flv')) {
			return 'video/flv';
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
			return ['video/mp4', 'video/rtmp', 'audio/rtmp', 'rtmp/mp4', 'audio/mp4', 'video/flv', 'video/x-flv'].includes(type.toLowerCase());
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
			return ['application/x-mpegurl', 'vnd.apple.mpegurl', 'audio/mpegurl', 'audio/hls', 'video/hls'].includes(type.toLowerCase());
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
			return ['application/dash+xml'].includes(type.toLowerCase());
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
			return ['audio/mp3'].includes(type.toLowerCase());
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
			return ['audio/ogg', 'audio/oga', 'audio/ogv'].includes(type.toLowerCase());
		},

		create: FlashMediaElementRenderer.create
	};
	_renderer.renderer.add(FlashMediaElementAudioOggRenderer);
}

},{"2":2,"23":23,"25":25,"26":26,"3":3,"4":4,"6":6,"7":7}],19:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _general = _dereq_(25);

var _constants = _dereq_(23);

var _media = _dereq_(26);

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

		// Skip script loading since it is already loaded
		if (typeof flvjs !== 'undefined') {
			NativeFlv.createInstance(settings);
		} else if (!NativeFlv.isMediaStarted) {
			(function () {

				settings.options.path = typeof settings.options.path === 'string' ? settings.options.path : '//cdnjs.cloudflare.com/ajax/libs/flv.js/1.1.0/flv.min.js';

				var script = _document2.default.createElement('script'),
				    firstScriptTag = _document2.default.getElementsByTagName('script')[0];

				var done = false;

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
				NativeFlv.isMediaStarted = true;
			})();
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
		flv: {
			// Special config: used to set the local path/URL of flv.js library
			path: '//cdnjs.cloudflare.com/ajax/libs/flv.js/1.1.0/flv.min.js',
			// To modify more elements from FLV player,
			// see https://github.com/Bilibili/flv.js/blob/master/docs/api.md#config
			cors: true
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

		var originalNode = mediaElement.originalNode,
		    id = mediaElement.id + '_' + options.prefix;

		var node = null,
		    flvPlayer = null;

		node = originalNode.cloneNode(true);
		options = Object.assign(options, mediaElement.options);

		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {
			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			node['get' + capName] = function () {
				return flvPlayer !== null ? node[propName] : null;
			};

			node['set' + capName] = function (value) {
				if (!_mejs2.default.html5media.readOnlyProperties.includes(propName)) {
					if (flvPlayer !== null) {
						node[propName] = value;

						if (propName === 'src') {
							flvPlayer.unload();
							flvPlayer.detachMediaElement();
							flvPlayer.attachMediaElement(node);
							flvPlayer.load();
						}
					}
				}
			};
		};

		for (var i = 0, total = props.length; i < total; i++) {
			assignGettersSetters(props[i]);
		}

		// Initial method to register all FLV events
		_window2.default['__ready__' + id] = function (_flvPlayer) {

			mediaElement.flvPlayer = flvPlayer = _flvPlayer;

			var events = _mejs2.default.html5media.events.concat(['click', 'mouseover', 'mouseout']),
			    assignEvents = function assignEvents(eventName) {

				if (eventName === 'loadedmetadata') {

					flvPlayer.unload();
					flvPlayer.detachMediaElement();
					flvPlayer.attachMediaElement(node);
					flvPlayer.load();
				}

				node.addEventListener(eventName, function (e) {
					var event = _document2.default.createEvent('HTMLEvents');
					event.initEvent(e.type, e.bubbles, e.cancelable);
					mediaElement.dispatchEvent(event);
				});
			};

			for (var _i = 0, _total = events.length; _i < _total; _i++) {
				assignEvents(events[_i]);
			}
		};

		if (mediaFiles && mediaFiles.length > 0) {
			for (var _i2 = 0, _total2 = mediaFiles.length; _i2 < _total2; _i2++) {
				if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[_i2].type)) {
					node.setAttribute('src', mediaFiles[_i2].src);
					break;
				}
			}
		}

		node.setAttribute('id', id);

		originalNode.parentNode.insertBefore(node, originalNode);
		originalNode.autoplay = false;
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
			if (flvPlayer !== null) {
				flvPlayer.pause();
			}
			node.style.display = 'none';
			return node;
		};

		node.show = function () {
			node.style.display = '';
			return node;
		};

		node.destroy = function () {
			if (flvPlayer !== null) {
				flvPlayer.destroy();
			}
		};

		var event = (0, _general.createEvent)('rendererready', node);
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

},{"2":2,"23":23,"25":25,"26":26,"3":3,"6":6,"7":7}],20:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _general = _dereq_(25);

var _constants = _dereq_(23);

var _media = _dereq_(26);

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

		// Skip script loading since it is already loaded
		if (typeof Hls !== 'undefined') {
			NativeHls.createInstance(settings);
		} else if (!NativeHls.isMediaStarted) {
			(function () {

				settings.options.path = typeof settings.options.path === 'string' ? settings.options.path : '//cdn.jsdelivr.net/hls.js/latest/hls.min.js';

				var script = _document2.default.createElement('script'),
				    firstScriptTag = _document2.default.getElementsByTagName('script')[0];

				var done = false;

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
				NativeHls.isMediaStarted = true;
			})();
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
		hls: {
			// Special config: used to set the local path/URL of hls.js library
			path: '//cdn.jsdelivr.net/hls.js/latest/hls.min.js',
			// To modify more elements from hls.js,
			// see https://github.com/dailymotion/hls.js/blob/master/API.md#user-content-fine-tuning
			autoStartLoad: false,
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

		var originalNode = mediaElement.originalNode,
		    id = mediaElement.id + '_' + options.prefix,
		    preload = originalNode.getAttribute('preload'),
		    autoplay = originalNode.autoplay;

		var hlsPlayer = null,
		    node = null;

		node = originalNode.cloneNode(true);
		options = Object.assign(options, mediaElement.options);
		options.hls.autoStartLoad = preload && preload !== 'none' || autoplay;

		// WRAPPERS for PROPs
		var props = _mejs2.default.html5media.properties,
		    assignGettersSetters = function assignGettersSetters(propName) {
			var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);

			node['get' + capName] = function () {
				return hlsPlayer !== null ? node[propName] : null;
			};

			node['set' + capName] = function (value) {
				if (!_mejs2.default.html5media.readOnlyProperties.includes(propName)) {
					if (hlsPlayer !== null) {
						node[propName] = value;

						if (propName === 'src') {

							hlsPlayer.destroy();
							hlsPlayer = NativeHls.createInstance({
								options: options.hls,
								id: id
							});

							hlsPlayer.loadSource(value);
							hlsPlayer.attachMedia(node);
						}
					}
				}
			};
		};

		for (var i = 0, total = props.length; i < total; i++) {
			assignGettersSetters(props[i]);
		}

		// Initial method to register all HLS events
		_window2.default['__ready__' + id] = function (_hlsPlayer) {

			mediaElement.hlsPlayer = hlsPlayer = _hlsPlayer;

			var events = _mejs2.default.html5media.events.concat(['click', 'mouseover', 'mouseout']),
			    hlsEvents = Hls.Events,
			    assignEvents = function assignEvents(eventName) {

				if (eventName === 'loadedmetadata') {

					hlsPlayer.detachMedia();

					var url = node.src;

					hlsPlayer.loadSource(url);
					hlsPlayer.attachMedia(node);
				}

				node.addEventListener(eventName, function (e) {
					// copy event
					var event = _document2.default.createEvent('HTMLEvents');
					event.initEvent(e.type, e.bubbles, e.cancelable);
					mediaElement.dispatchEvent(event);
				});
			};

			for (var _i = 0, _total = events.length; _i < _total; _i++) {
				assignEvents(events[_i]);
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
			var recoverDecodingErrorDate = void 0,
			    recoverSwapAudioCodecDate = void 0;
			var assignHlsEvents = function assignHlsEvents(e, data) {
				var event = (0, _general.createEvent)(e, node);
				event.data = data;
				mediaElement.dispatchEvent(event);

				if (e === 'hlsError') {
					console.warn(e, data);

					// borrowed from http://dailymotion.github.io/hls.js/demo/
					if (data.fatal) {
						switch (data.type) {
							case 'mediaError':
								var now = new Date().getTime();
								if (!recoverDecodingErrorDate || now - recoverDecodingErrorDate > 3000) {
									recoverDecodingErrorDate = new Date().getTime();
									hlsPlayer.recoverMediaError();
								} else if (!recoverSwapAudioCodecDate || now - recoverSwapAudioCodecDate > 3000) {
									recoverSwapAudioCodecDate = new Date().getTime();
									console.warn('Attempting to swap Audio Codec and recover from media error');
									hlsPlayer.swapAudioCodec();
									hlsPlayer.recoverMediaError();
								} else {
									console.error('Cannot recover, last media error recovery failed');
								}
								break;
							case 'networkError':
								console.error('Network error');
								break;
							default:
								hlsPlayer.destroy();
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
			for (var _i2 = 0, _total2 = mediaFiles.length; _i2 < _total2; _i2++) {
				if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[_i2].type)) {
					node.setAttribute('src', mediaFiles[_i2].src);
					break;
				}
			}
		}

		if (preload !== 'auto' && !autoplay) {
			node.addEventListener('play', function () {
				if (hlsPlayer !== null) {
					hlsPlayer.startLoad();
				}
			});

			node.addEventListener('pause', function () {
				if (hlsPlayer !== null) {
					hlsPlayer.stopLoad();
				}
			});
		}

		node.setAttribute('id', id);

		originalNode.parentNode.insertBefore(node, originalNode);
		originalNode.autoplay = false;
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
			if (hlsPlayer !== null) {
				hlsPlayer.destroy();
			}
		};

		node.stop = function () {
			if (hlsPlayer !== null) {
				hlsPlayer.stopLoad();
			}
		};

		var event = (0, _general.createEvent)('rendererready', node);
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

},{"2":2,"23":23,"25":25,"26":26,"3":3,"6":6,"7":7}],21:[function(_dereq_,module,exports){
'use strict';

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _general = _dereq_(25);

var _constants = _dereq_(23);

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

		// Due to an issue on Webkit, force the MP3 and MP4 on Android and consider native support for HLS;
		// also consider URLs that might have obfuscated URLs
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

		var id = mediaElement.id + '_' + options.prefix;

		var node = null;

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
				if (!_mejs2.default.html5media.readOnlyProperties.includes(propName)) {
					node[propName] = value;
				}
			};
		};

		for (var i = 0, total = props.length; i < total; i++) {
			assignGettersSetters(props[i]);
		}

		var events = _mejs2.default.html5media.events.concat(['click', 'mouseover', 'mouseout']),
		    assignEvents = function assignEvents(eventName) {

			node.addEventListener(eventName, function (e) {
				// copy event

				var event = _document2.default.createEvent('HTMLEvents');
				event.initEvent(e.type, e.bubbles, e.cancelable);
				mediaElement.dispatchEvent(event);
			});
		};

		for (var _i = 0, _total = events.length; _i < _total; _i++) {
			assignEvents(events[_i]);
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
			for (var _i2 = 0, _total2 = mediaFiles.length; _i2 < _total2; _i2++) {
				if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[_i2].type)) {
					node.setAttribute('src', mediaFiles[_i2].src);
					break;
				}
			}
		}

		var event = (0, _general.createEvent)('rendererready', node);
		mediaElement.dispatchEvent(event);

		return node;
	}
};

_window2.default.HtmlMediaElement = _mejs2.default.HtmlMediaElement = HtmlMediaElement;

_renderer.renderer.add(HtmlMediaElement);

},{"2":2,"23":23,"25":25,"3":3,"6":6,"7":7}],22:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

var _renderer = _dereq_(7);

var _general = _dereq_(25);

var _media = _dereq_(26);

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

		// Check whether YouTube API is already loaded.
		YouTubeApi.isLoaded = typeof YT !== 'undefined' && YT.loaded;

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

		var youTubeId = '';

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

		var parts = url.split('?'),
		    parameters = parts[1].split('&');

		var youTubeId = '';

		for (var i = 0, total = parameters.length; i < total; i++) {
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
			iv_load_policy: 3,
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

		// API objects
		var youtube = {},
		    apiStack = [],
		    readyState = 4;

		var youTubeApi = null,
		    paused = true,
		    ended = false,
		    youTubeIframe = null,
		    volume = 1;

		youtube.options = options;
		youtube.id = mediaElement.id + '_' + options.prefix;
		youtube.mediaElement = mediaElement;

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
								volume = youTubeApi.getVolume() / 100;
								return {
									v: volume
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
								};

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

							case 'readyState':
								return {
									v: readyState
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

							if (mediaElement.originalNode.autoplay) {
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
								youTubeApi.mute();
							} else {
								youTubeApi.unMute();
							}
							setTimeout(function () {
								var event = (0, _general.createEvent)('volumechange', youtube);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;

						case 'volume':
							volume = value;
							youTubeApi.setVolume(value * 100);
							setTimeout(function () {
								var event = (0, _general.createEvent)('volumechange', youtube);
								mediaElement.dispatchEvent(event);
							}, 50);
							break;
						case 'readyState':
							var event = (0, _general.createEvent)('canplay', youtube);
							mediaElement.dispatchEvent(event);
							break;

						default:
							
							break;
					}
				} else {
					// store for after "READY" event fires
					apiStack.push({ type: 'set', propName: propName, value: value });
				}
			};
		};

		for (var i = 0, total = props.length; i < total; i++) {
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
							paused = false;
							return youTubeApi.playVideo();
						case 'pause':
							paused = true;
							return youTubeApi.pauseVideo();
						case 'load':
							return null;

					}
				} else {
					apiStack.push({ type: 'call', methodName: methodName });
				}
			};
		};

		for (var _i = 0, _total = methods.length; _i < _total; _i++) {
			assignMethods(methods[_i]);
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

		var isAudio = mediaElement.originalNode.tagName.toLowerCase() === 'audio',
		    height = isAudio ? '0' : mediaElement.originalNode.height,
		    width = isAudio ? '0' : mediaElement.originalNode.width,
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
				end: 0,
				iv_load_policy: 3
			}, youtube.options.youtube),
			origin: _window2.default.location.host,
			events: {
				onReady: function onReady(e) {
					mediaElement.youTubeApi = youTubeApi = e.target;
					mediaElement.youTubeState = {
						paused: true,
						ended: false
					};

					// do call stack
					if (apiStack.length) {
						for (var _i2 = 0, _total2 = apiStack.length; _i2 < _total2; _i2++) {

							var stackItem = apiStack[_i2];

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

						var newEvent = (0, _general.createEvent)(e.type, youtube);
						mediaElement.dispatchEvent(newEvent);
					};

					for (var _i3 = 0, _total3 = events.length; _i3 < _total3; _i3++) {
						youTubeIframe.addEventListener(events[_i3], assignEvents, false);
					}

					// send init events
					var initEvents = ['rendererready', 'loadeddata', 'loadedmetadata', 'canplay'];

					for (var _i4 = 0, _total4 = initEvents.length; _i4 < _total4; _i4++) {
						var event = (0, _general.createEvent)(initEvents[_i4], youtube);
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
							events = ['pause'];
							paused = true;
							ended = false;

							youtube.stopInterval();
							break;

						case 3:
							// YT.PlayerState.BUFFERING
							events = ['progress'];
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
					for (var _i5 = 0, _total5 = events.length; _i5 < _total5; _i5++) {
						var event = (0, _general.createEvent)(events[_i5], youtube);
						mediaElement.dispatchEvent(event);
					}
				},
				onError: function onError(e) {
					var event = (0, _general.createEvent)('error', youtube);
					event.data = e.data;
					mediaElement.dispatchEvent(event);
				}
			}
		};

		// The following will prevent that in mobile devices, YouTube is displayed in fullscreen when using audio
		if (isAudio) {
			youtubeSettings.playerVars.playsinline = 1;
		}

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

				var event = (0, _general.createEvent)('timeupdate', youtube);
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

},{"2":2,"25":25,"26":26,"3":3,"6":6,"7":7}],23:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.cancelFullScreen = exports.requestFullScreen = exports.isFullScreen = exports.FULLSCREEN_EVENT_NAME = exports.HAS_NATIVE_FULLSCREEN_ENABLED = exports.HAS_TRUE_NATIVE_FULLSCREEN = exports.HAS_IOS_FULLSCREEN = exports.HAS_MS_NATIVE_FULLSCREEN = exports.HAS_MOZ_NATIVE_FULLSCREEN = exports.HAS_WEBKIT_NATIVE_FULLSCREEN = exports.HAS_NATIVE_FULLSCREEN = exports.SUPPORTS_NATIVE_HLS = exports.SUPPORT_POINTER_EVENTS = exports.HAS_MSE = exports.IS_STOCK_ANDROID = exports.IS_SAFARI = exports.IS_FIREFOX = exports.IS_CHROME = exports.IS_EDGE = exports.IS_IE = exports.IS_ANDROID = exports.IS_IOS = exports.IS_IPHONE = exports.IS_IPAD = exports.UA = exports.NAV = undefined;

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
var IS_EDGE = exports.IS_EDGE = 'msLaunchUri' in NAV && !('documentMode' in _document2.default);
var IS_CHROME = exports.IS_CHROME = UA.match(/chrome/gi) !== null;
var IS_FIREFOX = exports.IS_FIREFOX = UA.match(/firefox/gi) !== null;
var IS_SAFARI = exports.IS_SAFARI = UA.match(/safari/gi) !== null && !IS_CHROME;
var IS_STOCK_ANDROID = exports.IS_STOCK_ANDROID = UA.match(/^mozilla\/\d+\.\d+\s\(linux;\su;/gi) !== null;

var HAS_MSE = exports.HAS_MSE = 'MediaSource' in _window2.default;
var SUPPORT_POINTER_EVENTS = exports.SUPPORT_POINTER_EVENTS = function () {
	var element = _document2.default.createElement('x'),
	    documentElement = _document2.default.documentElement,
	    getComputedStyle = _window2.default.getComputedStyle;

	if (!('pointerEvents' in element.style)) {
		return false;
	}

	element.style.pointerEvents = 'auto';
	element.style.pointerEvents = 'x';
	documentElement.appendChild(element);
	var supports = getComputedStyle && getComputedStyle(element, '').pointerEvents === 'auto';
	element.remove();
	return !!supports;
}();

// for IE
var html5Elements = ['source', 'track', 'audio', 'video'];
var video = void 0;

for (var i = 0, total = html5Elements.length; i < total; i++) {
	video = _document2.default.createElement(html5Elements[i]);
}

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
_mejs2.default.Features.isEdge = IS_EDGE;
_mejs2.default.Features.isChrome = IS_CHROME;
_mejs2.default.Features.isFirefox = IS_FIREFOX;
_mejs2.default.Features.isSafari = IS_SAFARI;
_mejs2.default.Features.isStockAndroid = IS_STOCK_ANDROID;
_mejs2.default.Features.hasMSE = HAS_MSE;
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

},{"2":2,"3":3,"6":6}],24:[function(_dereq_,module,exports){
'use strict';

/**
 * Most of the mtehods have been borrowed/adapted from https://plainjs.com/javascript,
 * except fadeIn/fadeOut (from https://github.com/DimitriMikadze/vanilla-helpers/blob/master/js/vanillaHelpers.js)
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeClass = exports.addClass = exports.hasClass = undefined;
exports.offset = offset;
exports.toggleClass = toggleClass;
exports.fadeOut = fadeOut;
exports.fadeIn = fadeIn;
exports.siblings = siblings;
exports.visible = visible;
exports.ajax = ajax;

var _window = _dereq_(3);

var _window2 = _interopRequireDefault(_window);

var _document = _dereq_(2);

var _document2 = _interopRequireDefault(_document);

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function offset(el) {
	var rect = el.getBoundingClientRect(),
	    scrollLeft = _window2.default.pageXOffset || _document2.default.documentElement.scrollLeft,
	    scrollTop = _window2.default.pageYOffset || _document2.default.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

var hasClassMethod = void 0,
    addClassMethod = void 0,
    removeClassMethod = void 0;

if ('classList' in _document2.default.documentElement) {
	hasClassMethod = function hasClassMethod(el, className) {
		return el.classList !== undefined && el.classList.contains(className);
	};
	addClassMethod = function addClassMethod(el, className) {
		return el.classList.add(className);
	};
	removeClassMethod = function removeClassMethod(el, className) {
		return el.classList.remove(className);
	};
} else {
	hasClassMethod = function hasClassMethod(el, className) {
		return new RegExp('\\b' + className + '\\b').test(el.className);
	};
	addClassMethod = function addClassMethod(el, className) {
		if (!hasClass(el, className)) {
			el.className += ' ' + className;
		}
	};
	removeClassMethod = function removeClassMethod(el, className) {
		el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
	};
}

var hasClass = exports.hasClass = hasClassMethod;
var addClass = exports.addClass = addClassMethod;
var removeClass = exports.removeClass = removeClassMethod;

function toggleClass(el, className) {
	hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
}

// fade an element from the current state to full opacity in "duration" ms
function fadeOut(el) {
	var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
	var callback = arguments[2];

	if (!el.style.opacity) {
		el.style.opacity = 1;
	}

	var start = null;
	_window2.default.requestAnimationFrame(function animate(timestamp) {
		start = start || timestamp;
		var progress = timestamp - start;
		el.style.opacity = parseFloat(1 - progress / duration, 2);
		if (progress > duration) {
			if (callback && typeof callback === 'function') {
				callback();
			}
		} else {
			_window2.default.requestAnimationFrame(animate);
		}
	});
}

// fade out an element from the current state to full transparency in "duration" ms
// display is the display style the element is assigned after the animation is done
function fadeIn(el) {
	var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
	var callback = arguments[2];

	if (!el.style.opacity) {
		el.style.opacity = 0;
	}

	var start = null;
	_window2.default.requestAnimationFrame(function animate(timestamp) {
		start = start || timestamp;
		var progress = timestamp - start;
		el.style.opacity = parseFloat(progress / duration, 2);
		if (progress > duration) {
			if (callback && typeof callback === 'function') {
				callback();
			}
		} else {
			_window2.default.requestAnimationFrame(animate);
		}
	});
}

function siblings(el, filter) {
	var siblings = [];
	el = el.parentNode.firstChild;
	do {
		if (!filter || filter(el)) {
			siblings.push(el);
		}
	} while (el = el.nextSibling);
	return siblings;
}

function visible(elem) {
	return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

function ajax(url, dataType, success, error) {
	var xhr = _window2.default.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

	var type = 'text/plain';

	switch (dataType) {
		case 'html':
			type = 'text/html';
			break;
		case 'json':
			type = 'application/x-www-form-urlencoded';
			break;
		case 'xml':
			type = 'application/xml';
			break;
	}

	xhr.open('GET', url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState > 3) {
			if (xhr.status == 200) {
				if (dataType === 'json') {
					success(JSON.parse(xhr.responseText));
				} else {
					success(xhr.responseText);
				}
			} else if (typeof error === 'function') {
				error(xhr.status);
			}
		}
	};

	xhr.setRequestHeader('Content-Type', type);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.send();
	return xhr;
}

_mejs2.default.Utils = _mejs2.default.Utils || {};
_mejs2.default.Utils.offset = offset;
_mejs2.default.Utils.hasClass = hasClass;
_mejs2.default.Utils.addClass = addClass;
_mejs2.default.Utils.removeClass = removeClass;
_mejs2.default.Utils.toggleClass = toggleClass;
_mejs2.default.Utils.fadeIn = fadeIn;
_mejs2.default.Utils.fadeOut = fadeOut;
_mejs2.default.Utils.siblings = siblings;
_mejs2.default.Utils.visible = visible;
_mejs2.default.Utils.ajax = ajax;

},{"2":2,"3":3,"6":6}],25:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.escapeHTML = escapeHTML;
exports.debounce = debounce;
exports.isObjectEmpty = isObjectEmpty;
exports.splitEvents = splitEvents;
exports.createEvent = createEvent;
exports.isNodeAfter = isNodeAfter;
exports.isString = isString;

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

/**
 * Group a string of events into `document` (d) and `window` (w) events
 *
 * @param {String} events  List of space separated events
 * @param {String} id      Namespace appended to events
 * @return {{d: Array, w: Array}}
 */
function splitEvents(events, id) {
	// Global events
	var rwindow = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
	// add player ID as an event namespace so it's easier to unbind them all later
	var ret = { d: [], w: [] };
	(events || '').split(' ').forEach(function (v) {
		var eventName = '' + v + (id ? '.' + id : '');

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
 * @param {string} eventName
 * @param {*} target
 * @return {Event|Object}
 */
function createEvent(eventName, target) {

	if (typeof eventName !== 'string') {
		throw new Error('Event name must be a string');
	}

	var eventFrags = eventName.match(/[a-z]+\.([a-z]+)/),
	    detail = {
		target: target
	};

	if (eventFrags !== null) {
		eventName = eventFrags[0];
		detail.namespace = eventFrags[1];
	}

	return new window.CustomEvent(eventName, {
		detail: detail
	});
}

/**
 * Returns true if targetNode appears after sourceNode in the dom.
 * @param {HTMLElement} sourceNode - the source node for comparison
 * @param {HTMLElement} targetNode - the node to compare against sourceNode
 */
function isNodeAfter(sourceNode, targetNode) {

	return !!(sourceNode && targetNode && sourceNode.compareDocumentPosition(targetNode) & 2 // 2 : Node.DOCUMENT_POSITION_PRECEDING
	);
}

/**
 * Determines if a value is a string
 *
 * @param {*} value to check
 * @returns {Boolean} True if a value is a string
 */
function isString(value) {
	return typeof value === 'string';
}

_mejs2.default.Utils = _mejs2.default.Utils || {};
_mejs2.default.Utils.escapeHTML = escapeHTML;
_mejs2.default.Utils.debounce = debounce;
_mejs2.default.Utils.isObjectEmpty = isObjectEmpty;
_mejs2.default.Utils.splitEvents = splitEvents;
_mejs2.default.Utils.createEvent = createEvent;
_mejs2.default.Utils.isNodeAfter = isNodeAfter;
_mejs2.default.Utils.isString = isString;

},{"6":6}],26:[function(_dereq_,module,exports){
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

var _general = _dereq_(25);

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

	for (var i = 0, total = typeChecks.length; i < total; i++) {
		var type = typeChecks[i](url);

		if (type) {
			return type;
		}
	}

	// the do standard extension check
	var ext = getExtension(url),
	    normalizedExt = normalizeExtension(ext);

	var mime = 'video/mp4';

	// Obtain correct MIME types
	if (normalizedExt) {
		if (['mp4', 'm4v', 'ogg', 'ogv', 'webm', 'flv', 'mpeg', 'mov'].includes(normalizedExt)) {
			mime = 'video/' + normalizedExt;
		} else if (['mp3', 'oga', 'wav', 'mid', 'midi'].includes(normalizedExt)) {
			mime = 'audio/' + normalizedExt;
		}
	}

	return mime;
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

	var baseUrl = url.split('?')[0],
	    baseName = baseUrl.split('\\').pop().split('/').pop();

	return baseName.indexOf('.') > -1 ? baseName.substring(baseName.lastIndexOf('.') + 1) : '';
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
_mejs2.default.Utils.typeChecks = typeChecks;
_mejs2.default.Utils.absolutizeUrl = absolutizeUrl;
_mejs2.default.Utils.formatType = formatType;
_mejs2.default.Utils.getMimeFromType = getMimeFromType;
_mejs2.default.Utils.getTypeFromFile = getTypeFromFile;
_mejs2.default.Utils.getExtension = getExtension;
_mejs2.default.Utils.normalizeExtension = normalizeExtension;

},{"25":25,"6":6}],27:[function(_dereq_,module,exports){
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

// ChildNode.remove polyfill
// from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
	arr.forEach(function (item) {
		if (item.hasOwnProperty('remove')) {
			return;
		}
		Object.defineProperty(item, 'remove', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function remove() {
				this.parentNode.removeChild(this);
			}
		});
	});
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

// CustomEvent polyfill
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {

	if (typeof window.CustomEvent === "function") return false;

	function CustomEvent(event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = _document2.default.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
})();

// Object.assign polyfill
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
if (typeof Object.assign !== 'function') {
	Object.assign = function (target) {
		// .length of function is 2

		if (target === null || target === undefined) {
			// TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var to = Object(target);

		for (var index = 1, total = arguments.length; index < total; index++) {
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

			// 1. const O be ? ToObject(this value).
			if (this === null || this === undefined) {
				throw new TypeError('"this" is null or not defined');
			}

			var o = Object(this);

			// 2. const len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;

			// 3. If len is 0, return false.
			if (len === 0) {
				return false;
			}

			// 4. const n be ? ToInteger(fromIndex).
			//    (If fromIndex is undefined, this step produces the value 0.)
			var n = fromIndex | 0;

			// 5. If n ≥ 0, then
			//  a. const k be n.
			// 6. Else n < 0,
			//  a. const k be len + n.
			//  b. If k < 0, const k be 0.
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

			// 7. Repeat, while k < len
			while (k < len) {
				// a. const elementK be the result of ? Get(O, ! ToString(k)).
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

// String.includes polyfill
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
if (!String.prototype.includes) {
	String.prototype.includes = function (search, start) {
		'use strict';

		if (typeof start !== 'number') {
			start = 0;
		}

		if (start + search.length > this.length) {
			return false;
		} else {
			return this.indexOf(search, start) !== -1;
		}
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

// Element.matches polyfill
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
		var matches = (this.document || this.ownerDocument).querySelectorAll(s),
		    i = matches.length - 1;
		while (--i >= 0 && matches.item(i) !== this) {}
		return i > -1;
	};
}

// Element.closest polyfill
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (window.Element && !Element.prototype.closest) {
	Element.prototype.closest = function (s) {
		var matches = (this.document || this.ownerDocument).querySelectorAll(s),
		    i = void 0,
		    el = this;
		do {
			i = matches.length;
			while (--i >= 0 && matches.item(i) !== el) {}
		} while (i < 0 && (el = el.parentElement));
		return el;
	};
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {
		var currTime = new Date().getTime();
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function () {
			callback(currTime + timeToCall);
		}, timeToCall);
		lastTime = currTime + timeToCall;
		return id;
	};

	if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
		clearTimeout(id);
	};
})();

},{"2":2}],28:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isDropFrame = isDropFrame;
exports.secondsToTimeCode = secondsToTimeCode;
exports.timeCodeToSeconds = timeCodeToSeconds;
exports.calculateTimeFormat = calculateTimeFormat;
exports.convertSMPTEtoSeconds = convertSMPTEtoSeconds;

var _mejs = _dereq_(6);

var _mejs2 = _interopRequireDefault(_mejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Indicate if FPS is dropFrame (typically non-integer frame rates: 29.976)
 *
 * @param {Number} fps - Frames per second
 * @return {Boolean}
 */
function isDropFrame() {
	var fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25;

	return !(fps % 1 === 0);
}
/**
 * Format a numeric time in format '00:00:00'
 *
 * @param {Number} time - Ideally a number, but if not or less than zero, is defaulted to zero
 * @param {Boolean} forceHours
 * @param {Boolean} showFrameCount
 * @param {Number} fps - Frames per second
 * @param {Number} secondsDecimalLength - Number of decimals to display if any
 * @return {String}
 */
function secondsToTimeCode(time) {
	var forceHours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	var showFrameCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	var fps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 25;
	var secondsDecimalLength = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;


	time = !time || typeof time !== 'number' || time < 0 ? 0 : time;

	var dropFrames = Math.round(fps * 0.066666),
	    // Number of drop frames to drop on the minute marks (6%)
	timeBase = Math.round(fps),
	    framesPer24Hours = Math.round(fps * 3600) * 24,
	    framesPer10Minutes = Math.round(fps * 600),
	    frameSep = isDropFrame(fps) ? ';' : ':',
	    hours = void 0,
	    minutes = void 0,
	    seconds = void 0,
	    frames = void 0,
	    f = Math.round(time * fps);

	if (isDropFrame(fps)) {

		if (f < 0) {
			f = framesPer24Hours + f;
		}

		f = f % framesPer24Hours;

		var d = Math.floor(f / framesPer10Minutes);
		var m = f % framesPer10Minutes;
		f = f + dropFrames * 9 * d;
		if (m > dropFrames) {
			f = f + dropFrames * Math.floor((m - dropFrames) / Math.round(timeBase * 60 - dropFrames));
		}

		var timeBaseDivision = Math.floor(f / timeBase);

		hours = Math.floor(Math.floor(timeBaseDivision / 60) / 60);
		minutes = Math.floor(timeBaseDivision / 60) % 60;

		if (showFrameCount) {
			seconds = timeBaseDivision % 60;
		} else {
			seconds = (f / timeBase % 60).toFixed(secondsDecimalLength);
		}
	} else {
		hours = Math.floor(time / 3600) % 24;
		minutes = Math.floor(time / 60) % 60;
		if (showFrameCount) {
			seconds = Math.floor(time % 60);
		} else {
			seconds = (time % 60).toFixed(secondsDecimalLength);
		}
	}
	hours = hours <= 0 ? 0 : hours;
	minutes = minutes <= 0 ? 0 : minutes;
	seconds = seconds <= 0 ? 0 : seconds;

	var result = forceHours || hours > 0 ? (hours < 10 ? '0' + hours : hours) + ':' : '';
	result += (minutes < 10 ? '0' + minutes : minutes) + ':';
	result += '' + (seconds < 10 ? '0' + seconds : seconds);

	if (showFrameCount) {
		frames = (f % timeBase).toFixed(0);
		frames = frames <= 0 ? 0 : frames;
		result += frames < 10 ? frameSep + '0' + frames : '' + frameSep + frames;
	}

	return result;
}

/**
 * Convert a '00:00:00' time string into seconds
 *
 * @param {String} time
 * @param {Number} fps - Frames per second
 * @return {Number}
 */
function timeCodeToSeconds(time) {
	var fps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;


	if (typeof time !== 'string') {
		throw new TypeError('Time must be a string');
	}

	if (time.indexOf(';') > 0) {
		time = time.replace(';', ':');
	}

	if (!time.match(/\d{2}(\:\d{2}){0,3}/)) {
		throw new TypeError('Time code must have the format `00:00:00`');
	}

	var parts = time.split(':');

	var output = void 0,
	    hours = 0,
	    minutes = 0,
	    seconds = 0,
	    frames = 0,
	    totalMinutes = 0,
	    dropFrames = Math.round(fps * 0.066666),
	    // Number of drop frames to drop on the minute marks (6%)
	timeBase = Math.round(fps),
	    hFrames = timeBase * 3600,
	    mFrames = timeBase * 60;

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
			hours = parseInt(parts[0], 10);
			minutes = parseInt(parts[1], 10);
			seconds = parseInt(parts[2], 10);
			break;
		case 4:
			hours = parseInt(parts[0], 10);
			minutes = parseInt(parts[1], 10);
			seconds = parseInt(parts[2], 10);
			frames = parseInt(parts[3], 10);
			break;
	}

	if (isDropFrame(fps)) {
		totalMinutes = 60 * hours + minutes;
		output = hFrames * hours + mFrames * minutes + timeBase * seconds + frames - dropFrames * (totalMinutes - Math.floor(totalMinutes / 10));
	} else {
		output = (hFrames * hours + mFrames * minutes + fps * seconds + frames) / fps;
	}

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

	var hours = Math.floor(time / 3600) % 24,
	    minutes = Math.floor(time / 60) % 60,
	    seconds = Math.floor(time % 60),
	    frames = Math.floor((time % 1 * fps).toFixed(3)),
	    lis = [[frames, 'f'], [seconds, 's'], [minutes, 'm'], [hours, 'h']];

	var format = options.timeFormat,
	    firstTwoPlaces = format[1] === format[0],
	    separatorIndex = firstTwoPlaces ? 2 : 1,
	    separator = format.length < separatorIndex ? format[separatorIndex] : ':',
	    firstChar = format[0],
	    required = false;

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

	var decimalLen = SMPTE.indexOf('.') > -1 ? SMPTE.split('.')[1].length : 0;

	var secs = 0,
	    multiplier = 1;

	SMPTE = SMPTE.split(':').reverse();

	for (var i = 0, total = SMPTE.length; i < total; i++) {
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

},{"6":6}]},{},[27,5,4,14,21,18,17,19,20,22,15,16,8,9,10,11,12,13]);
