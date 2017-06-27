/*
 The MIT License (MIT)

 Copyright (c) 2014 Irrelon Software Limited
 http://www.irrelon.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice, url and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 Source: https://github.com/coolbloke1324/jquery-lang-js

 Changelog:
 Version 2.0.0 - Complete re-write.
 */
var Lang = (function () {
	var Lang = function (defaultLang, currentLang) {
		this.defaultLang = defaultLang || 'en';
		this.currentLang = defaultLang || 'en';

		// Setup data on the language items
		this._start();

		// Check if the current language is not the same as our default
		if (currentLang !== this.currentLang) {
			// Switch to the current language
			this.change(currentLang);
		}
	};

	/**
	 * Object that holds the language packs.
	 * @type {{}}
	 */
	Lang.prototype.pack = {};

	/**
	 * Array of translatable attributes to check for on elements.
	 * @type {string[]}
	 */
	Lang.prototype.attrList = [
		'title',
		'alt',
		'placeholder'
	];

	/**
	 * Loads a new language pack from the given url.
	 * @param {string} packPath The url to load the pack from.
	 */
	Lang.prototype.loadPack = function (packPath) {
		if (packPath) {
			$('<script type="text/javascript" charset="utf-8" src="' + packPath + '" />').appendTo("head");
		} else {
			throw('Cannot load language pack, no file path specified!');
		}
	};

	/**
	 * Scans the DOM for elements with [lang] selector and saves translate data
	 * for them for later use.
	 * @private
	 */
	Lang.prototype._start = function () {
		// Get the page HTML
		var arr = $(':not(html)[lang]'),
			arrCount = arr.length,
			elem;

		while (arrCount--) {
			elem = $(arr[arrCount]);

			if (elem.attr('lang') === this.defaultLang) {
				// Store translatable attributes
				this._storeAttribs(elem);

				// Store translatable content
				this._storeContent(elem);
			}
		}
	};

	/**
	 * Stores the translatable attribute values in their default language.
	 * @param {object} elem The jQuery selected element.
	 * @private
	 */
	Lang.prototype._storeAttribs = function (elem) {
		var attr,
			attrObj;

		for (attr in this.attrList) {
			if (this.attrList.hasOwnProperty(attr)) {
				if (elem.attr(attr)) {
					// Grab the existing attribute store or create a new object
					attrObj = elem.data('lang-attr') || {};

					// Add the attribute and value to the store
					attrObj[attr] = elem.attr(attr);

					// Save the attribute data to the store
					elem.data('lang-attr', attrObj);
				}
			}
		}
	};

	Lang.prototype._storeContent = function (elem) {
		// Check if the element is an input element
		if (elem.is('input')) {
			switch (elem.attr('type')) {
				case 'button':
				case 'submit':
				case 'reset':
					elem.data('lang-val', elem.val());
					break;
			}
		} else {
			elem.data('lang-html', elem.html());
		}
	};

	Lang.prototype._translateAttribs = function (elem, lang) {
		var attr,
			attrObj = elem.data('lang-attr') || {},
			translation;

		for (attr in attrObj) {
			if (attrObj.hasOwnProperty(attr)) {
				// Check the element still has the attribute
				if (elem.attr(attr)) {
					if (lang !== this.defaultLang) {
						// Get the translated value
						translation = this.translate(attrObj[attr], lang);

						// Check we actually HAVE a translation
						if (translation) {
							// Change the attribute to the translated value
							elem.attr(attr, translation);
						}
					} else {
						// Set default language value
						elem.attr(attr, attrObj[attr]);
					}
				}
			}
		}
	};

	Lang.prototype._translateContent = function (elem, lang) {
		var langNotDefault = lang !== this.defaultLang,
			translation;

		// Check if the element is an input element
		if (elem.is('input')) {
			switch (elem.attr('type')) {
				case 'button':
				case 'submit':
				case 'reset':
					if (langNotDefault) {
						// Get the translated value
						translation = this.translate(elem.data('lang-val'), lang);

						// Check we actually HAVE a translation
						if (translation) {
							// Set translated value
							elem.val(translation);
						}
					} else {
						// Set default language value
						elem.val(elem.data('lang-val'));
					}
					break;
			}
		} else {
			if (langNotDefault) {
				// Get the translated value
				translation = this.translate(elem.data('lang-html'), lang);

				// Check we actually HAVE a translation
				if (translation) {
					// Set translated value
					elem.html(translation);
				}
			} else {
				// Set default language value
				elem.html(elem.data('lang-html'));
			}
		}
	};

	Lang.prototype.change = function (lang) {
		//console.log('Changing language to ' + lang);
		if (this.currentLang != lang) { this.update(lang); }
		this.currentLang = lang;

		// Get the page HTML
		var arr = $(':not(html)[lang]'),
			arrCount = arr.length,
			elem;

		while (arrCount--) {
			elem = $(arr[arrCount]);

			if (elem.attr('lang') !== lang) {
				// Translate attributes
				this._translateAttribs(elem, lang);

				// Translate content
				this._translateContent(elem, lang);

				// Update the element's current language
				elem.attr('lang', lang);
			}
		}
	};

	Lang.prototype.translate = function (text, lang) {
		lang = lang || this.currentLang;

		var translation = '';

		if (lang != this.defaultLang) {
			// Check for a direct token translation
			translation = this.pack[lang].token[text];

			if (!translation) {
				// No token translation was found, test for regex match
				translation = this._regexMatch(lang, text);
			}

			return translation || text;
		} else {
			return text;
		}
	};

	Lang.prototype._regexMatch = function (lang, text) {
		// Loop the regex array and test them against the text
		var arr = this.pack[lang].regex,
			arrCount = arr.length,
			arrIndex,
			item,
			regex,
			expressionResult;

		for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
			item = arr[arrIndex];
			regex = item[0];

			// Test regex
			expressionResult = regex.exec(text);

			if (expressionResult && expressionResult[0]) {
				return text.split(expressionResult[0]).join(item[1]);
			}
		}

		return '';
	}

	Lang.prototype.update = function (lang) {

	};

	return Lang;
})();