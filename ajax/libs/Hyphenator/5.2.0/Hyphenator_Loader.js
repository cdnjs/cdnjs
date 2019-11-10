/** @license Hyphenator_Loader 5.2.0 - client side hyphenation for webbrowsers
 *  Copyright (C) 2017  Mathias Nater, Zürich (mathiasnater at gmail dot com)
 *  https://github.com/mnater/Hyphenator
 *
 *  Released under the MIT license
 *  http://mnater.github.io/Hyphenator/LICENSE.txt
 */

/**
 * @constructor
 * @description Checks if there's CSS-hyphenation available for the given languages and
 * loads and runs Hyphenator if there's no CSS-hyphenation
 * @author Mathias Nater, <a href = "mailto:mathias@mnn.ch">mathias@mnn.ch</a>
 * @version 5.2.0
 * @namespace Holds all methods and properties
 */

/* The following comment is for JSLint: */
/*jslint browser: true multivar: true, single: true*/
/*global window Hyphenator*/

var Hyphenator_Loader = (function (window) {
    'use strict';
    var languages,
        config,
        path,

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
         * @name Hyphenator-loadNrunHyphenator
         * @description Loads Hyphenator.js and runs it with the given configuration
         * @type {function({object})}
         * @param {object} config the configuration object for Hyphenator.js
         * @private
         */
        loadNrunHyphenator = function (config) {
            var head, script, done = false;

            head = window.document.getElementsByTagName('head').item(0);
            script = createElem('script');
            script.src = path;
            script.type = 'text/javascript';
            script.onreadystatechange = function () {
                if (!done && (!script.readyState || script.readyState === "loaded" || script.readyState === "complete")) {
                    done = true;
                    Hyphenator.config(config);
                    Hyphenator.run();

                    // Handle memory leak in IE
                    script.onreadystatechange = null;
                    script.onload = null;
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                }
            };
            script.onload = script.onreadystatechange;
            head.appendChild(script);
        },

        /**
         * @name Hyphenator-checkLangSupport
         * @description
         * Checks if hyphenation for all languages are supported:
         * If body is present (i.e. DOMContentLoaded) a hidden div is added to the body and the height of probably hyphenated text is measured.
         * Else a fake body is inserted and used instead of the 'real' body. It will later be removed.
         * @type {function()}
         * @return {bool}
         * @private
         */
        checkLangSupport = function () {
            var shadowContainer,
                shadow,
                lang,
                fakeBdy = createElem('body');
            shadowContainer = createElem('div');
            shadowContainer.style.visibility = 'hidden';

            fakeBdy.appendChild(shadowContainer);
            window.document.documentElement.appendChild(fakeBdy);

            for (lang in languages) {
                if (languages.hasOwnProperty(lang)) {
                    shadow = createElem('div');
                    shadow.style.MozHyphens = 'auto';
                    shadow.style['-webkit-hyphens'] = 'auto';
                    shadow.style['-ms-hyphens'] = 'auto';
                    shadow.style.hyphens = 'auto';
                    shadow.style.width = '5em';
                    shadow.style.lineHeight = '12px';
                    shadow.style.border = 'none';
                    shadow.style.padding = '0';
                    shadow.style.wordWrap = 'normal';
                    shadow.style['-webkit-locale'] = "'" + lang + "'";
                    shadow.lang = lang;
                    shadow.appendChild(window.document.createTextNode(languages[lang]));
                    shadowContainer.appendChild(shadow);
                    if (shadow.offsetHeight === 12) {
                        loadNrunHyphenator(config);
                        break;
                    }
                }
            }

            fakeBdy.parentNode.removeChild(fakeBdy);
        };

    return {
        /**
         * @name Hyphenator_Loader.init
         * @description Bootstrap function that inits the loader
         * @param {Object} languages an object with the language as key and a long word as value
         * @param {Object} config the Hyphenator.js configuration object
         * @public
         */
        init: function (langs, p, configs) {
            languages = langs;
            path = p;
            config = configs || {};
            checkLangSupport();
        }
    };
}(window));