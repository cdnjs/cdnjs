/**
 * @constructor
 * @description Checks if there's CSS-hyphenation available for the given languages and
 * loads and runs Hyphenator if there's no CSS-hyphenation
 * @author Mathias Nater, <a href = "mailto:mathias@mnn.ch">mathias@mnn.ch</a>
 * @version 1.0.0
 * @namespace Holds all methods and properties
 */
var Hyphenator_Loader = (function (window) {
	'use strict';
	var
		languages,
		config,
		
		/**
		 * @name Hyphenator-createElem
		 * @description
		 * A function alias to document.createElementNS or document.createElement
		 * @param {string} tagname the Element to create
		 * @type {function({string})}
		 * @private
		 */
		createElem = function (tagname) {
			var r;
			if (window.document.createElementNS) {
				r = window.document.createElementNS('http://www.w3.org/1999/xhtml', tagname);
			} else if (window.document.createElement) {
				r = window.document.createElement(tagname);
			}
			return r;
		},

		/**
		 * @name Hyphenator-checkLangSupport
		 * @description
		 * A function alias to document.createElementNS or document.createElement
		 * @type {function(string, string)}
		 * @param {string} lang language code of the language to check
		 * @param {string} longword a word (best 12 characters or longer) to be hyphenated
		 * @private
		 */
		checkLangSupport = function (lang, longword) {
			var
				shadow,
				computedHeight,
				//todo: may be this could be set in a different DOM (don't wait for loading…)
				bdy = window.document.getElementsByTagName('body')[0];

				//create and append shadow-test-element
			shadow = createElem('div');
			shadow.style.width = '5em';
			shadow.style.MozHyphens = 'auto';
			shadow.style['-webkit-hyphens'] = 'auto';
			shadow.style['-ms-hyphens'] = 'auto';
			shadow.style.hyphens = 'auto';
			shadow.style.fontSize = '12px';
			shadow.style.lineHeight = '12px';
			shadow.style.visibility = 'hidden';

			shadow.lang = lang;
			shadow.style['-webkit-locale'] = "'" + lang + "'";
			shadow.innerHTML = longword;

			bdy.appendChild(shadow);

			//measure its height
			//computedHeight = parseInt(window.getComputedStyle(shadow, null).height.slice(0, -2), 10);
			computedHeight = shadow.offsetHeight;

			//remove shadow element
			bdy.removeChild(shadow);

			return (computedHeight > 12) ? true : false;
		},

		/**
		 * @name Hyphenator-loadNrunHyphenator
		 * @description Loads Hyphenator.js and runs it with the given configuration
		 * @type {function({object})}
		 * @param {object} config the configuration object for Hyphenator.js
		 * @private
		 */
		loadNrunHyphenator = function (config) {
			var head, script, interval;


			head = window.document.getElementsByTagName('head').item(0);
			script = createElem('script');
			script.src = '../Hyphenator.js';
			script.type = 'text/javascript';
			head.appendChild(script);

			interval = window.setInterval(function () {
				if (!!Hyphenator) {
					window.clearInterval(interval);
					Hyphenator.config(config);
					Hyphenator.run();
				}
			}, 100);

		},
		
		runner = function () {
			var loadHyphenator = false, r, results = {}, lang;
			for (lang in languages) {
				if (languages.hasOwnProperty(lang)) {
					r = checkLangSupport(lang, languages[lang]);
					results[lang] = r;
					loadHyphenator = loadHyphenator || !r;
				}
			}
			if (loadHyphenator) {
				loadNrunHyphenator(config);
			}
		},

		/*
		 * runOnContentLoaded is based od jQuery.bindReady()
		 * see
		 * jQuery JavaScript Library v1.3.2
		 * http://jquery.com/
		 *
		 * Copyright (c) 2009 John Resig
		 * Dual licensed under the MIT and GPL licenses.
		 * http://docs.jquery.com/License
		 *
		 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
		 * Revision: 6246
		 */
		/**
		 * @name Hyphenator-runOnContentLoaded
		 * @description
		 * A crossbrowser solution for the DOMContentLoaded-Event based on jQuery
		 * <a href = "http://jquery.com/</a>
		 * I added some functionality: e.g. support for frames and iframes…
		 * @param {Object} w the window-object
		 * @param {function()} f the function to call onDOMContentLoaded
		 * @param {Object} a1 argument1 for f: an object containing the languages
		 * @param {Object} a2 argument2 for f: the configuration object for Hyphenator.js
		 * @private
		 */
		runOnContentLoaded = function (window, f) {
			var
				toplevel, hyphRunForThis = {}, doFrames = false, contextWindow, documentLoaded,
				add = document.addEventListener ? 'addEventListener' : 'attachEvent',
				rem = document.addEventListener ? 'removeEventListener' : 'detachEvent',
				pre = document.addEventListener ? '' : 'on',

				init = function (context) {
					contextWindow = context || window;
					if (!hyphRunForThis[contextWindow.location.href] && (!documentLoaded || !!contextWindow.frameElement)) {
						documentLoaded = true;
						f();
						hyphRunForThis[contextWindow.location.href] = true;
					}
				},

				doScrollCheck = function () {
					try {
						// If IE is used, use the trick by Diego Perini
						// http://javascript.nwbox.com/IEContentLoaded/
						document.documentElement.doScroll("left");
					} catch (error) {
						setTimeout(doScrollCheck, 1);
						return;
					}

					// and execute any waiting functions
					init(window);
				},

				doOnLoad = function () {
					var i, haveAccess, fl = window.frames.length;
					if (doFrames && fl > 0) {
						for (i = 0; i < fl; i += 1) {
							haveAccess = undefined;
							//try catch isn't enough for webkit
							try {
								//opera throws only on document.toString-access
								haveAccess = window.frames[i].document.toString();
							} catch (e) {
								haveAccess = undefined;
							}
							if (!!haveAccess) {
								if (window.frames[i].location.href !== 'about:blank') {
									init(window.frames[i]);
								}
							}
						}
						contextWindow = window;
						f();
						hyphRunForThis[window.location.href] = true;
					} else {
						init(window);
					}
				},

				// Cleanup functions for the document ready method
				DOMContentLoaded = function (e) {
					if (e.type === 'readystatechange' && document.readyState !== 'complete') {
						return;
					}
					document[rem](pre + e.type, DOMContentLoaded, false);
					if (!doFrames && window.frames.length === 0) {
						init(window);
					} /* else {
						//we are in a frameset, so do nothing but wait for onload to fire
						
					}*/
				};


			if (document.readyState === "complete" || document.readyState === "interactive") {
				//Running Hyphenator.js if it has been loaded later
				//Thanks to davenewtron http://code.google.com/p/hyphenator/issues/detail?id=158#c10
				setTimeout(doOnLoad, 1);
			} else {
				//registering events
				document[add](pre + "DOMContentLoaded", DOMContentLoaded, false);
				document[add](pre + 'readystatechange', DOMContentLoaded, false);
				window[add](pre + 'load', doOnLoad, false);
				toplevel = false;
				try {
					toplevel = !window.frameElement;
				} catch (e) {}
				if (document.documentElement.doScroll && toplevel) {
					doScrollCheck();
				}
			}
		};

	return {
		/**
		 * @name Hyphenator_Loader.init
		 * @description Bootstrap function that inits the loader
		 * @param {Object} languages an object with the language as key and a long word as value
		 * @param {Object} config the Hyphenator.js configuration object
		 * @public
         */
		init: function (langs, configs) {
			languages = langs;
			config = configs || {};
			runOnContentLoaded(window, runner);
		}
	};
}(window));