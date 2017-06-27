/** @license Hyphenator_Loader 5.1.0 - client side hyphenation for webbrowsers
 *  Copyright (C) 2015  Mathias Nater, Zürich (mathiasnater at gmail dot com)
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
 * @version 5.1.0
 * @namespace Holds all methods and properties
 */

/* The following comment is for JSLint: */
/*jslint browser: true */
/*global Hyphenator: false */

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
                shadows = [],
                lang,
                i,
                r = true,
                bdy = window.document.getElementsByTagName('body')[0],
                fakeBdy = false;
            if (!bdy) {
                fakeBdy = createElem('body');
            }
            shadowContainer = createElem('div');
            shadowContainer.style.MozHyphens = 'auto';
            shadowContainer.style['-webkit-hyphens'] = 'auto';
            shadowContainer.style['-ms-hyphens'] = 'auto';
            shadowContainer.style.hyphens = 'auto';
            shadowContainer.style.fontSize = '12px';
            shadowContainer.style.lineHeight = '12px';
            shadowContainer.style.wordWrap = 'normal';
            shadowContainer.style.visibility = 'hidden';

            for (lang in languages) {
                if (languages.hasOwnProperty(lang)) {
                    shadow = createElem('div');
                    shadow.style.width = '5em';
                    shadow.lang = lang;
                    shadow.style['-webkit-locale'] = "'" + lang + "'";
                    shadow.appendChild(window.document.createTextNode(languages[lang]));
                    shadowContainer.appendChild(shadow);
                    shadows.push(shadow);
                }
            }
            if (fakeBdy) {
                fakeBdy.appendChild(shadowContainer);
                window.document.documentElement.appendChild(fakeBdy);
            } else {
                bdy.appendChild(shadowContainer);
            }
            for (i = 0; i < shadows.length; i += 1) {
                r = (shadows[i].offsetHeight > 12) && r;
            }
            if (fakeBdy) {
                fakeBdy.parentNode.removeChild(fakeBdy);
            } else {
                bdy.removeChild(shadowContainer);
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
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                    done = true;

                    Hyphenator.config(config);
                    Hyphenator.run();

                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                }
            };
            head.appendChild(script);
        },

        runner = function () {
            var allLangsSupported = checkLangSupport();
            if (!allLangsSupported) {
                loadNrunHyphenator(config);
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
        init: function (langs, p, configs) {
            languages = langs;
            path = p;
            config = configs || {};
            runner();
        }
    };
}(window));