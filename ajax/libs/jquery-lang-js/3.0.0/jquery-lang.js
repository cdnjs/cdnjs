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

 Source: https://github.com/irrelon/jquery-lang-js

 Changelog: See readme.md
 */
var Lang = (function () {
	var Lang = function () {
		// Enable firing events
		this._fireEvents = true;

		// Allow storage of dynamic language pack data
		this._dynamic = {};
	};

	/**
	 * Initialise the library with the library options.
	 * @param {Object} options The options to init the library with.
	 * See the readme.md for the details of the options available.
	 */
	Lang.prototype.init = function (options) {
		var self = this,
			cookieLang,
			defaultLang,
			currentLang,
			allowCookieOverride;

		options = options || {};
		options.cookie = options.cookie || {};

		defaultLang = options.defaultLang;
		currentLang = options.currentLang;
		allowCookieOverride = options.allowCookieOverride;

		// Set cookie settings
		this.cookieName = options.cookie.name || 'langCookie';
		this.cookieExpiry = options.cookie.expiry || 365;
		this.cookiePath = options.cookie.path || '/';

		// Store existing mutation methods so we can auto-run
		// translations when new data is added to the page
		this._mutationCopies = {
			append: $.fn.append,
			appendTo: $.fn.appendTo,
			prepend: $.fn.prepend,
			before: $.fn.before,
			after: $.fn.after,
			html: $.fn.html
		};

		// Now override the existing mutation methods with our own
		$.fn.append = function () { return self._mutation(this, 'append', arguments) };
		$.fn.appendTo = function () { return self._mutation(this, 'appendTo', arguments) };
		$.fn.prepend = function () { return self._mutation(this, 'prepend', arguments) };
		$.fn.before = function () { return self._mutation(this, 'before', arguments) };
		$.fn.after = function () { return self._mutation(this, 'after', arguments) };
		$.fn.html = function () { return self._mutation(this, 'html', arguments) };

		// Set default and current language to the default one
		// to start with
		this.defaultLang = defaultLang || 'en';
		this.currentLang = defaultLang || 'en';

		// Check for cookie support when no current language is specified
		if ((allowCookieOverride || !currentLang) && Cookies) {
			// Check for an existing language cookie
			cookieLang = Cookies.get(this.cookieName);

			if (cookieLang) {
				// We have a cookie language, set the current language
				currentLang = cookieLang;
			}
		}

		$(function () {
			// Setup data on the language items
			self._start();

			// Check if the current language is not the same as our default
			if (currentLang && currentLang !== self.defaultLang) {
				// Switch to the current language
				self.change(currentLang);
			}
		});
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
		'placeholder',
		'href'
	];

	/**
	 * Defines a language pack that can be dynamically loaded and the
	 * path to use when doing so.
	 * @param {String} lang The language two-letter iso-code.
	 * @param {String} path The path to the language pack js file.
	 */
	Lang.prototype.dynamic = function (lang, path) {
		if (lang !== undefined && path !== undefined) {
			this._dynamic[lang] = path;
		}
	};

	/**
	 * Loads a new language pack for the given language.
	 * @param {string} lang The language to load the pack for.
	 * @param {Function=} callback Optional callback when the file has loaded.
	 */
	Lang.prototype.loadPack = function (lang, callback) {
		var self = this;
		
		if (lang && self._dynamic[lang]) {
			$.ajax({
				dataType: "json",
				url: self._dynamic[lang],
				success: function (data) {
					self.pack[lang] = data;
					
					// Process the regex list
					if (self.pack[lang].regex) {
						var packRegex = self.pack[lang].regex,
							regex,
							i;
						
						for (i = 0; i < packRegex.length; i++) {
							regex = packRegex[i];
							if (regex.length === 2) {
								// String, value
								regex[0] = new RegExp(regex[0]);
							} else if (regex.length === 3) {
								// String, modifiers, value
								regex[0] = new RegExp(regex[0], regex[1]);
								
								// Remove modifier
								regex.splice(1, 1);
							}
						}
					}
					
					//console.log('Loaded language pack: ' + self._dynamic[lang]);
					if (callback) { callback(false, lang, self._dynamic[lang]); }
				},
				error: function () {
					if (callback) { callback(true, lang, self._dynamic[lang]); }
					throw('Error loading language pack' + self._dynamic[lang]);
				}
			});
		} else {
			throw('Cannot load language pack, no file path specified!');
		}
	};

	/**
	 * Scans the DOM for elements with [lang] selector and saves translate data
	 * for them for later use.
	 * @private
	 */
	Lang.prototype._start = function (selector) {
		// Get the page HTML
		var arr = selector !== undefined ? $(selector).find('[lang]') : $(':not(html)[lang]'),
			arrCount = arr.length,
			elem;

		while (arrCount--) {
			elem = $(arr[arrCount]);
			this._processElement(elem);
		}
	};
	
	Lang.prototype._processElement = function (elem) {
		// Only store data if the element is set to our default language
		if (elem.attr('lang') === this.defaultLang) {
			// Store translatable attributes
			this._storeAttribs(elem);
	
			// Store translatable content
			this._storeContent(elem);
		}
	};

	/**
	 * Stores the translatable attribute values in their default language.
	 * @param {object} elem The jQuery selected element.
	 * @private
	 */
	Lang.prototype._storeAttribs = function (elem) {
		var attrIndex,
			attr,
			attrObj;

		for (attrIndex = 0; attrIndex < this.attrList.length; attrIndex++) {
			attr = this.attrList[attrIndex];
			if (elem.attr(attr)) {
				// Grab the existing attribute store or create a new object
				attrObj = elem.data('lang-attr') || {};

				// Add the attribute and value to the store
				attrObj[attr] = elem.attr(attr);

				// Save the attribute data to the store
				elem.data('lang-attr', attrObj);
			}
		}
	};

	/**
	 * Reads the existing content from the element and stores it for
	 * later use in translation.
	 * @param elem
	 * @private
	 */
	Lang.prototype._storeContent = function (elem) {
		// Check if the element is an input element
		if (elem.is('input')) {
			switch (elem.attr('type')) {
				case 'button':
				case 'submit':
				case 'hidden':
				case 'reset':
					elem.data('lang-val', elem.val());
					break;
			}
		} else if (elem.is('img')) {
			elem.data('lang-src', elem.attr('src'));
		} else {
			// Get the text nodes immediately inside this element
			var nodes = this._getTextNodes(elem);
			if (nodes) {
				elem.data('lang-text', nodes);
			}
		}
	};

	/**
	 * Retrieves the text nodes from an element and returns them in array wrap into
	 * object with two properties: 
	 * 	- node - which corresponds to text node,
	 * 	- langDefaultText - which remember current data of text node
	 * @param elem
	 * @returns {Array|*}
	 * @private
	 */
	Lang.prototype._getTextNodes = function (elem) {
		var nodes = elem.contents(), nodeObjArray = [], nodeObj = {},
			nodeArr, that = this, map = Array.prototype.map;

        $.each(nodes, function (index, node) {
            if ( node.nodeType !== 3 ) {
                return;
            }

			nodeObj = {
				node : node,
				langDefaultText : node.data
			};

			nodeObjArray.push(nodeObj);
		});
		
		return nodeObjArray;
	};

	/**
	 * Sets text nodes of an element translated based on the passed language.
	 * @param elem
	 * @param {Array|*} nodes array of objecs with text node and defaultText returned from _getTextNodes
	 * @param lang
	 * @private
	 */
	Lang.prototype._setTextNodes = function (elem, nodes, lang) {
		var index,
			textNode,
			defaultText,
			translation,
			langNotDefault = lang !== this.defaultLang;
		
		for (index = 0; index < nodes.length; index++) {
			textNode = nodes[index];
			
			if (langNotDefault) {
				defaultText = $.trim(textNode.langDefaultText);
				
				if (defaultText) {
					// Translate the langDefaultText
					translation = this.translate(defaultText, lang);
					
					if (translation) {
						try {
							// Replace the text with the translated version
							textNode.node.data = textNode.node.data.split($.trim(textNode.node.data)).join(translation);
						} catch (e) {
							
						}
					} else {
						if (console && console.log) {
							console.log('Translation for "' + defaultText + '" not found!');
						}
					}
				}
			} else {
				// Replace with original text
				try {
					textNode.node.data = textNode.langDefaultText;
				} catch (e) {
					
				}
			}
		}
	};

	/**
	 * Translates and sets the attributes of an element to the passed language.
	 * @param elem
	 * @param lang
	 * @private
	 */
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

	/**
	 * Translates and sets the contents of an element to the passed language.
	 * @param elem
	 * @param lang
	 * @private
	 */
	Lang.prototype._translateContent = function (elem, lang) {
		var langNotDefault = lang !== this.defaultLang,
			translation,
			nodes;

		// Check if the element is an input element
		if (elem.is('input')) {
			switch (elem.attr('type')) {
				case 'button':
				case 'submit':
				case 'hidden':
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
		} else if (elem.is('img')) {
			if (langNotDefault) {
				// Get the translated value
				translation = this.translate(elem.data('lang-src'), lang);

				// Check we actually HAVE a translation
				if (translation) {
					// Set translated value
					elem.attr('src', translation);
				}
			} else {
				// Set default language value
				elem.attr('src', elem.data('lang-src'));
			}
		} else {
			// Set text node translated text
			nodes = elem.data('lang-text');
			if (nodes) {
				this._setTextNodes(elem, nodes, lang);
			}
		}
	};

	/**
	 * Call this to change the current language on the page.
	 * @param {String} lang The new two-letter language code to change to.
	 * @param {String=} selector Optional selector to find language-based
	 * elements for updating.
	 * @param {Function=} callback Optional callback function that will be
	 * called once the language change has been successfully processed. This
	 * is especially useful if you are using dynamic language pack loading
	 * since you will get a callback once it has been loaded and changed.
	 * Your callback will be passed three arguments, a boolean to denote if
	 * there was an error (true if error), the second will be the language
	 * you passed in the change call (the lang argument) and the third will
	 * be the selector used in the change update.
	 */
	Lang.prototype.change = function (lang, selector, callback) {
		var self = this;
		
		if (lang === this.defaultLang || this.pack[lang] || this._dynamic[lang]) {
			// Check if the language pack is currently loaded
			if (lang !== this.defaultLang) {
				if (!this.pack[lang] && this._dynamic[lang]) {
					// The language pack needs loading first
					//console.log('Loading dynamic language pack: ' + this._dynamic[lang] + '...');
					this.loadPack(lang, function (err, loadingLang, fromUrl) {
						if (!err) {
							// Process the change language request
							self.change.call(self, lang, selector, callback);
						} else {
							// Call the callback with the error
							if (callback) { callback('Language pack could not load from: ' + fromUrl, lang, selector); }
						}
					});
					
					return;
				} else if (!this.pack[lang] && !this._dynamic[lang]) {
					// Pack not loaded and no dynamic entry
					if (callback) { callback('Language pack not defined for: ' + lang, lang, selector); }
					throw('Could not change language to ' + lang + ' because no language pack for this language exists!');
				}
			}
			
			var fireAfterUpdate = false,
				currLang = this.currentLang;
			
			if (this.currentLang != lang) {
				this.beforeUpdate(currLang, lang);
				fireAfterUpdate = true;
			}
			
			this.currentLang = lang;
			
			// Get the page HTML
			var arr = selector !== undefined ? $(selector).find('[lang]') : $(':not(html)[lang]'),
				arrCount = arr.length,
				elem;
	
			while (arrCount--) {
				elem = $(arr[arrCount]);
	
				if (elem.attr('lang') !== lang) {
					this._translateElement(elem, lang);
				}
			}
			
			if (fireAfterUpdate) {
				this.afterUpdate(currLang, lang);
			}
			
			// Check for cookie support
			if (Cookies) {
				// Set a cookie to remember this language setting with 1 year expiry
				Cookies.set(self.cookieName, lang, {
					expires: self.cookieExpiry,
					path: self.cookiePath
				});
			}
			
			if (callback) { callback(false, lang, selector); }
		} else {
			if (callback) { callback('No language pack defined for: ' + lang, lang, selector); }
			throw('Attempt to change language to "' + lang + '" but no language pack for that language is loaded!');
		}
	};
	
	Lang.prototype._translateElement = function (elem, lang) {
		// Translate attributes
		this._translateAttribs(elem, lang);

		// Translate content
		if (elem.attr('data-lang-content') != 'false') {
			this._translateContent(elem, lang);
		}

		// Update the element's current language
		elem.attr('lang', lang);
	};

	/**
	 * Translates text from the default language into the passed language.
	 * @param {String} text The text to translate.
	 * @param {String} lang The two-letter language code to translate to.
	 * @returns {*}
	 */
	Lang.prototype.translate = function (text, lang) {
		lang = lang || this.currentLang;
		
		if (this.pack[lang]) {
			var translation = '';
	
			if (lang != this.defaultLang) {
				// Check for a direct token translation
				translation = this.pack[lang].token[text];
	
				if (!translation) {
					// No token translation was found, test for regex match
					translation = this._regexMatch(text, lang);
				}
				
				if (!translation) {
					if (console && console.log) {
						console.log('Translation for "' + text + '" not found in language pack: ' + lang);
					}
				}
	
				return translation || text;
			} else {
				return text;
			}
		} else {
			return text;
		}
	};

	/**
	 * Checks the regex items for a match against the passed text and
	 * if a match is made, translates to the given replacement.
	 * @param {String} text The text to test regex matches against.
	 * @param {String} lang The two-letter language code to translate to.
	 * @returns {string}
	 * @private
	 */
	Lang.prototype._regexMatch = function (text, lang) {
		// Loop the regex array and test them against the text
		var arr,
			arrCount,
			arrIndex,
			item,
			regex,
			expressionResult;
		
		arr = this.pack[lang].regex;
		
		if (arr) {
			arrCount = arr.length;
			
			for (arrIndex = 0; arrIndex < arrCount; arrIndex++) {
				item = arr[arrIndex];
				regex = item[0];
	
				// Test regex
				expressionResult = regex.exec(text);
	
				if (expressionResult && expressionResult[0]) {
					return text.split(expressionResult[0]).join(item[1]);
				}
			}
		}

		return '';
	};

	Lang.prototype.beforeUpdate = function (currentLang, newLang) {
		if (this._fireEvents) {
			$(this).triggerHandler('beforeUpdate', [currentLang, newLang, this.pack[currentLang], this.pack[newLang]]);
		}
	};
	
	Lang.prototype.afterUpdate = function (currentLang, newLang) {
		if (this._fireEvents) {
			$(this).triggerHandler('afterUpdate', [currentLang, newLang, this.pack[currentLang], this.pack[newLang]]);
		}
	};
	
	Lang.prototype.refresh = function () {
		// Process refresh on the page
		this._fireEvents = false;
		this.change(this.currentLang);
		this._fireEvents = true;
	};
	
	////////////////////////////////////////////////////
	// Mutation overrides
	////////////////////////////////////////////////////
	Lang.prototype._mutation = function (context, method, args) {
		var result = this._mutationCopies[method].apply(context, args),
			currLang = this.currentLang,
			rootElem = $(context);
		
		if (rootElem.attr('lang')) {
			// Switch off events for the moment
			this._fireEvents = false;
			
			// Check if the root element is currently set to another language from current
			//if (rootElem.attr('lang') !== this.currentLang) {
				this._translateElement(rootElem, this.defaultLang);
				this.change(this.defaultLang, rootElem);
				
				// Calling change above sets the global currentLang but this is supposed to be
				// an isolated change so reset the global value back to what it was before
				this.currentLang = currLang;
				
				// Record data on the default language from the root element
				this._processElement(rootElem);
				
				// Translate the root element
				this._translateElement(rootElem, this.currentLang);
			//}
		}
		
		// Record data on the default language from the root's children
		this._start(rootElem);
		
		// Process translation on any child elements of this element
		this.change(this.currentLang, rootElem);
		
		// Switch events back on
		this._fireEvents = true;
		
		return result;
	};

	return Lang;
})();
