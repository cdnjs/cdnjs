/*
fillcalc v0.1.0 - (c) Robert Weber, freely distributable under the terms of the MIT license.
*/

(function (win, doc) {

	'use strict';

	// Avoid `console` errors in browsers that lack a console.
	(function() {
		var method;
		var noop = function () {};
		var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error','exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log','markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd','timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];

		var length = methods.length;
		var console = (window.console = window.console || {});

		while (length--) {
			method = methods[length];

			// Only stub undefined methods.
			if (!console[method]) {
				console[method] = noop;
			}
		}
	}());

	// We need document.querySelectorAll as we do not want to depend on any lib

	if (!doc.querySelectorAll) {
		return false;
	}

	var

	EMPTY = '',
	CALC_RULE = '^(\\s*?[\\s\\S]*):(\\s*?[\\s\\S]*?((\\-(webkit|moz)\\-)?calc\\(([\\s\\S]+)\\))[\\s\\S]*)?$',
	CSSRULES = '((\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})',

	KEYFRAMES = new RegExp('((@(-webkit-)?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})', 'gi'),
	FONTFACE = new RegExp('((@font-face\\s*?){([\\s\\S]*?)})', 'gi'),
	COMMENTS = new RegExp('(\\/\\*[\\s\\S]*?\\*\\/)', 'gi'),
	IMPORTS = new RegExp('@import .*?;', 'gi'),
	CHARSET = new RegExp('@charset .*?;', 'gi'),

	PERCENT = /[\d\.]+%/,
	PT = /\d+pt/,
	PIXEL = /(\d+)px/g,
	REMEM = /[\d\.]+r?em/,
	REM = /[\d\.]+rem/,
	EM = /[\d\.]+em/,
	MATH_EXP = /[\+\-\/\*]?[\d\.]+(px|%|em|rem)?/g,
	PLACEHOLDER = '$1',
	ONLYNUMBERS = /[\s\-0-9]/g,

	FONTSIZE = 'font-size',
	ADDMEDIA = '@media',

	onTextResize = [],
	onWindowResize = [],
	cssTexts = [],
	docLoaded = false
	;

	var utilities = {

		camelize: function ( str ) {

			return str.replace(/\-(\w)/g, function ( str, letter ) {

				return letter.toUpperCase();
			});
		},

		trim: function ( str ) {

			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

			return !String.prototype.trim ? str.replace(rtrim, '') : str.trim();
		},

		indexOf: function ( arr, el, from ) {

			var len = arr.length >>> 0;

			from = Number(from) || 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);

			if (from < 0) {
				from += len;
			}

			for (; from < len; from++) {
				if (from in arr && arr[from] === el)
					return from;
			}

			return -1;
		},

		// http://www.quirksmode.org/dom/getstyles.html
		getStyle: function ( el, prop ) {

			if (el.currentStyle) {

				return el.currentStyle[utilities.camelize(prop)];
			} else if (doc.defaultView && doc.defaultView.getComputedStyle) {

				return doc.defaultView.getComputedStyle(el,null).getPropertyValue(prop);

			} else {

				return el.style[utilities.camelize(prop)];
			}
		},

		// http://stackoverflow.com/questions/1955048/get-computed-font-size-for-dom-element-in-js
		getFontsize: function (obj) {
			var size;
			var test = doc.createElement('span');

			test.innerHTML = '&nbsp;';
			test.style.position = 'absolute';
			test.style.lineHeight = '1em';
			test.style.fontSize = '1em';

			obj.appendChild(test);
			size = test.offsetHeight;
			obj.removeChild(test);

			return size;
		},

		addEvent: function ( el, type, fn ){

			if (doc.addEventListener){

				el.addEventListener(type, fn, false);
			} else {

				el.attachEvent('on' + type, fn);
			}
		},

		// http://alistapart.com/article/fontresizing
		// http://www.truerwords.net/articles/web-tech/custom_events.html
		// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent

		textResize: function(cb) {

			var el, currentSize;

			var createControlElement = function () {

				el = doc.createElement('span');
				el.id = 'text-resize-control';
				el.innerHTML = '&nbsp;';
				el.style.position = 'absolute';
				el.style.left = '-9999px';
				el.style.lineHeight = '1em';
				el.style.fontSize = '1em';

				doc.body.insertBefore(el, doc.body.firstChild);
				currentSize = el.offsetHeight;
			},

			detectChange = function () {

				var now = el.offsetHeight;

				if ( currentSize === now ) {

					win.requestAnimationFrame(detectChange);

					return false;
				}

				currentSize = now;

				if ( cb && typeof cb === 'function' ) {

					cb();
				}

				win.requestAnimationFrame(detectChange);
			};

			createControlElement();
			win.requestAnimationFrame(detectChange);
		}
	};

	var calcTest = function() {

		var el = document.createElement('div');

		el.style.cssText = 'width: -moz-calc(10px); width: -webkit-calc(10px); width: calc(10px)';

		return !!el.style.length;
	},


	getStyleSheets = function () {

		var stylesheets = [];
		var index = 0;
		var len = doc.styleSheets.length;
		var stylesheet;

		for (; index < len; index++) {

			stylesheet = doc.styleSheets[index];
			cssTexts[index] = '';

			if (stylesheet.href && stylesheet.href !== EMPTY) {

				// selectivzr support - see issue #23
				// http://selectivizr.com/tests/respond/
				if (stylesheet.rawCssText && stylesheet.rawCssText !== EMPTY) {

					cssTexts[index] = stylesheet.rawCssText;
				}
				else {

					stylesheets.push(stylesheet.href);
				}
			}
			else if ( stylesheet.ownerNode && stylesheet.ownerNode.nodeName.toLowerCase() === 'style' ) {

				cssTexts[index] = stylesheet.ownerNode.textContent;
			}
		}


		if ( stylesheets.length > 0 || cssTexts.length > 0 ) {

			loadStylesheets(stylesheets);
		}
	},

	loadStylesheets = function(urls){
		var xhr;
		var index = 0;
		var len = urls.length;

		if ( win.XMLHttpRequest ) {

			xhr = new XMLHttpRequest();
		}
		else {

			try {

				xhr = new ActiveXObject('Microsoft.XMLHTTP');

			} catch(e) {

				xhr = null;
			}
		}

		if (xhr) {

			for (; index < len; index++) {

				try {

					xhr.open('GET', urls[index], false);
					xhr.send();

					if ( xhr.status === 200 ) {
						cssTexts[index] =  xhr.responseText;
					}

				} catch(e) {
					console.log('Error making request for file ' + urls[index] + ': ' + e.message);
				}

			}
		}

		if (cssTexts.length > 0 ) {

			parseStylesheets(cssTexts);
		}
	},

	parseStylesheets = function(texts) {
		var index = 0;
		var len = texts.length;

		for (; index < len; index++) {

			if ( texts[index].length ) {

				texts[index] = texts[index].replace(COMMENTS, EMPTY).replace(CHARSET, EMPTY).replace(IMPORTS, EMPTY).replace(KEYFRAMES, EMPTY).replace(FONTFACE, EMPTY);

				dotheCalc( parseCSS(texts[index]) );
			}
		}
	},

	removeStyles = function ( elements ) {
		var index = 0;
		var len = elements.length;

		for (; index < len; index++) {

			if ( !JSON.parse(elements[index].getAttribute('data-calced')) ) {

				elements[index].removeAttribute('style');
			}
		}
	},

	parseCSS = function( css, media ) {

		var index, len, regex, result, selector, rules, calc, elements, obj, mediaQueryStyleSheet, refSheet;
		var arr = [];

		media = media || '';

		regex = new RegExp(CSSRULES, 'gi');

		while ( true ) {

			result = regex.exec(css);

			if ( result === null ) {
				break;
			}

			selector = utilities.trim( ( result[2] || result[5] ).split('\r\n').join('\n') );

			if ( selector.indexOf( ADDMEDIA ) !== -1 ) {

				rules = result[3] + '\n}';

				arr = arr.concat(parseCSS(rules, selector.replace( ADDMEDIA, '')));
			}
			else {

				rules = result[6].split('\r\n').join('\n').split(';');

				index = 0;
				len = rules.length;

				for (; index < len; index++) {

					calc = new RegExp(CALC_RULE, 'gi').exec(rules[index]);

					try {
						elements = doc.querySelectorAll(selector);
					}
					catch(e) {
						console.log('Error trying to select "' + selector + '": ' + e.message);
						break;
					}

					if ( calc !== null && elements.length ) {

						obj = {
							elements: elements,
							media: media,
							values: utilities.trim( calc[2] ),
							formula: calc[6],
							prop: utilities.trim( calc[1] ),
							placholder: utilities.trim( calc[3] )
						};

						if ( obj.formula.match(PERCENT) ) {
							obj.onresize = true;
						}

						if ( obj.formula.match(REMEM) ) {
							obj.ontextresize = true;
						}

						arr.push(obj);
					}
				}

			}
		}

		return arr;
	},

	dotheCalc = function( calcRules ){
		var index = 0;
		var len = calcRules.length;
		var obj;

		var calc = function( obj ) {
			var i = 0;
			var len = obj.elements.length;
			var refValue, modifier, matches, l, j, result, formula;

			for (; i < len; i++) {

				formula = obj.formula.replace(PIXEL, PLACEHOLDER);
				matches = formula.match(MATH_EXP);
				l = matches.length;
				j = 0;

				for (; j < l; j++) {

					modifier = null;

					if ( matches[j].match(PERCENT) ) {

						refValue = obj.elements[i].parentNode.clientWidth;

						modifier = parseFloat(matches[j], 10) / 100;
					}

					if ( matches[j].match(EM) ) {

						refValue = obj.elements[i].currentStyle ? utilities.getFontsize(obj.elements[i]) : parseInt( utilities.getStyle( obj.elements[i], FONTSIZE).replace(/px/, EMPTY ), 10);

						if ( refValue.match && refValue.match(PT) ) {

							refValue = Math.round( parseInt(refValue.replace(/pt/, ''), 10) * 1.333333333 );
						}

						modifier = parseFloat(matches[j], 10);
					}

					if ( matches[j].match(REM) ) {

						if ( utilities.getStyle( doc.body , FONTSIZE ).match(PERCENT) ) {

							refValue = 16 * parseInt( utilities.getStyle( doc.body , FONTSIZE).replace(/%/, EMPTY), 10) / 100;
						}
						else if ( utilities.getStyle( doc.body , FONTSIZE ).match(PT) ) {

							refValue = Math.round( parseInt(utilities.getStyle( doc.body , FONTSIZE).replace(/pt/, ''), 10) * 1.333333333 );
						}
						else {

							refValue = parseInt( utilities.getStyle( doc.body , FONTSIZE).replace(/px/, EMPTY ), 10);
						}

						modifier = parseFloat(matches[j], 10);
					}

					if ( modifier ) {
						formula = formula.replace(matches[j], refValue * modifier);
					}

				}

				try {

					if ( formula.match(ONLYNUMBERS) ) {

						result = eval( formula );

						obj.elements[i].style[ utilities.trim( utilities.camelize(obj.prop) ) ] = obj.values.replace(obj.placholder,  result + 'px');
						obj.elements[i].setAttribute('data-calced', true);
					}
				}
				catch(e) {}

			}
		};

		for (; index < len; index++) {

			obj = calcRules[index];

			if ( obj.onresize && utilities.indexOf( onWindowResize, obj ) === -1 ) {

				onWindowResize.push(obj);
			}

			if ( obj.ontextresize && utilities.indexOf( onTextResize, obj ) === -1 ) {

				onTextResize.push(obj);
			}

			if ( obj.media !== EMPTY ) {

				if ( win.matchMedia && win.matchMedia(obj.media).matches ) {

					calc(obj);
				}
				else {

					removeStyles( obj.elements );
				}
			}
			else {

				calc(obj);
			}
		}

	};

	// Public interface
	win.dotheCalc = function() {

		if (cssTexts.length > 0 && docLoaded) {

			parseStylesheets(cssTexts);
		}
	};


	contentLoaded(win, function(){

		if ( calcTest() ) {
			return;
		}

		docLoaded = true;

		getStyleSheets();

		if ( onTextResize.length > 0 ) {

			utilities.textResize(function(){

				dotheCalc( onTextResize );
			});
		}

		if ( onWindowResize.length > 0 ) {

			utilities.addEvent(win, 'resize', function (){

				dotheCalc( onWindowResize );
			});
		}
	});

	// Libs and Helpers

/*!
 * contentloaded.js
 *
 * Author: Diego Perini (diego.perini at gmail.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 20101020
 * License: MIT
 * Version: 1.2
 *
 * URL:
 * http://javascript.nwbox.com/ContentLoaded/
 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
 *
 */

// @win window reference
// @fn function reference
function contentLoaded(win, fn) {

	var done = false, top = true,

	doc = win.document,
	root = doc.documentElement,
	modern = doc.addEventListener,

	add = modern ? 'addEventListener' : 'attachEvent',
	rem = modern ? 'removeEventListener' : 'detachEvent',
	pre = modern ? '' : 'on',

	init = function(e) {
		if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
		(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
		if (!done && (done = true)) fn.call(win, e.type || e);
	},

	poll = function() {
		try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
		init('poll');
	};

	if (doc.readyState == 'complete') fn.call(win, 'lazy');
	else {
		if (!modern && root.doScroll) {
			try { top = !win.frameElement; } catch(e) { }
			if (top) poll();
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}

}

/**
 * requestAnimationFrame version: "0.0.17" Copyright (c) 2011-2012, Cyril Agosta ( cyril.agosta.dev@gmail.com) All Rights Reserved.
 * Available via the MIT license.
 * see: http://github.com/cagosta/requestAnimationFrame for details
 *
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 * MIT license
 *
 */


( function( global ) {


    ( function() {


        if ( global.requestAnimationFrame ) {

            return;

        }

        if ( global.webkitRequestAnimationFrame ) { // Chrome <= 23, Safari <= 6.1, Blackberry 10

            global.requestAnimationFrame = global[ 'webkitRequestAnimationFrame' ];
            global.cancelAnimationFrame = global[ 'webkitCancelAnimationFrame' ] || global[ 'webkitCancelRequestAnimationFrame' ];

        }

        // IE <= 9, Android <= 4.3, very old/rare browsers

        var lastTime = 0;

        global.requestAnimationFrame = function( callback ) {

            var currTime = new Date().getTime();

            var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );

            var id = global.setTimeout( function() {

                callback( currTime + timeToCall );

            }, timeToCall );

            lastTime = currTime + timeToCall;

            return id; // return the id for cancellation capabilities

        };

        global.cancelAnimationFrame = function( id ) {

            clearTimeout( id );

        };

    } )();

    if ( typeof define === 'function' ) {

        define( function() {

            return global.requestAnimationFrame;

        } );

    }

} )( window );


})(window, document);
/*
	selectivizr2
	selectivizr.com

	Notes about this source
	-----------------------
 * The #DEBUG_START and #DEBUG_END comments are used to mark blocks of code
   that will be removed prior to building a final release version (using a
   pre-compression script)

	References:
	-----------
 * CSS Syntax          : https://www.w3.org/TR/2003/WD-css3-syntax-20030813/#style
 * Selectors           : https://www.w3.org/TR/css3-selectors/#selectors
 * IE Compatability    : https://msdn.microsoft.com/en-us/library/cc351024%28VS.85%29.aspx
 * W3C Selector Tests  : https://www.w3.org/Style/CSS/Test/CSS3/Selectors/current/html/tests/
*/

(function(win) {

	// Determine IE version and stop execution if browser isn't IE. This
	// handles the script being loaded by non IE browsers because the
	// developer didn't use conditional comments.
	var ieUserAgent = navigator.userAgent.match(/MSIE (\d+)/);
	if (!ieUserAgent) {
		return false;
	}

	// =========================== Init Objects ============================

	var doc = document;
	var root = doc.documentElement;
	var xhr = getXHRObject();
	var ieVersion = ieUserAgent[1];

	// If were not in standards mode, IE is too old / new or we can't create
	// an XMLHttpRequest object then we should get out now.
	if (doc.compatMode != 'CSS1Compat' || ieVersion<6 || ieVersion>8 || !xhr) {
		return;
	}

	// ========================= Common Objects ============================

	// Compatible selector engines in order of CSS3 support. Note: '*' is
	// a placeholder for the object key name. (basically, crude compression)
	var selectorEngines = {
		"NW"								: "*.Dom.select",
		"MooTools"							: "$$",
		"DOMAssistant"						: "*.$",
		"Prototype"							: "$$",
		"YAHOO"								: "*.util.Selector.query",
		"Sizzle"							: "*",
		"jQuery"							: "*",
		"dojo"								: "*.query"
	};

	var selectorMethod;
	var enabledWatchers 					= [];     // array of :enabled/:disabled elements to poll
	var domPatches							= [];
	var ie6PatchID 							= 0;      // used to solve ie6's multiple class bug
	var patchIE6MultipleClasses				= true;   // if true adds class bloat to ie6
	var namespace 							= "slvzr";

	// Stylesheet parsing regexp's
	var RE_COMMENT							= /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*?/g;
	var RE_IMPORT							= /@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))\s*([^;]*);/g;
	var RE_ASSET_URL 						= /(behavior\s*?:\s*)?\burl\(\s*(["']?)(?!data:)([^"')]+)\2\s*\)/g;
	var RE_PSEUDO_STRUCTURAL				= /^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/;
	var RE_PSEUDO_ELEMENTS					= /:(:first-(?:line|letter))/g;
	var RE_SELECTOR_GROUP					= /((?:^|(?:\s*})+)(?:\s*@media[^{]+{)?)\s*([^\{]*?[\[:][^{]+)/g;
	var RE_SELECTOR_PARSE					= /([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g;
	var RE_LIBRARY_INCOMPATIBLE_PSEUDOS		= /(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g;
	var RE_PATCH_CLASS_NAME_REPLACE			= /[^\w-]/g;

	// HTML UI element regexp's
	var RE_INPUT_ELEMENTS					= /^(INPUT|SELECT|TEXTAREA|BUTTON)$/;
	var RE_INPUT_CHECKABLE_TYPES			= /^(checkbox|radio)$/;

	// Broken attribute selector implementations (IE7/8 native [^=""], [$=""] and [*=""])
	var BROKEN_ATTR_IMPLEMENTATIONS			= ieVersion>6 ? /[\$\^*]=(['"])\1/ : null;

	// Whitespace normalization regexp's
	var RE_TIDY_TRAILING_WHITESPACE			= /([(\[+~])\s+/g;
	var RE_TIDY_LEADING_WHITESPACE			= /\s+([)\]+~])/g;
	var RE_TIDY_CONSECUTIVE_WHITESPACE		= /\s+/g;
	var RE_TIDY_TRIM_WHITESPACE				= /^\s*((?:[\S\s]*\S)?)\s*$/;

	// String constants
	var EMPTY_STRING						= "";
	var SPACE_STRING						= " ";
	var PLACEHOLDER_STRING					= "$1";

	// =========================== Patching ================================

	// --[ patchStyleSheet() ]----------------------------------------------
	// Scans the passed cssText for selectors that require emulation and
	// creates one or more patches for each matched selector.
	function patchStyleSheet( cssText ) {
		return cssText.replace(RE_PSEUDO_ELEMENTS, PLACEHOLDER_STRING).
			replace(RE_SELECTOR_GROUP, function(m, prefix, selectorText) {
    			var selectorGroups = selectorText.split(",");
					function comboBreaker (match, combinator, pseudo, attribute, index) {
						if (combinator) {
							if (patches.length>0) {
								domPatches.push( { selector: selector.substring(0, index), patches: patches } );
								patches = [];
							}
							return combinator;
						}
						else {
							var patch = (pseudo) ? patchPseudoClass( pseudo ) : patchAttribute( attribute );
							if (patch) {
								patches.push(patch);
								return "." + patch.className;
							}
							return match;
						}
					}
    			for (var c = 0, cs = selectorGroups.length; c < cs; c++) {
    				var selector = normalizeSelectorWhitespace(selectorGroups[c]) + SPACE_STRING;
    				var patches = [];
    				selectorGroups[c] = selector.replace(RE_SELECTOR_PARSE, comboBreaker);
    			}
    			return prefix + selectorGroups.join(",");
    		});
	}

	// --[ patchAttribute() ]-----------------------------------------------
	// returns a patch for an attribute selector.
	function patchAttribute( attr ) {
		return (!BROKEN_ATTR_IMPLEMENTATIONS || BROKEN_ATTR_IMPLEMENTATIONS.test(attr)) ?
			{ className: createClassName(attr), applyClass: true } : null;
	}

	// --[ patchPseudoClass() ]---------------------------------------------
	// returns a patch for a pseudo-class
	function patchPseudoClass( pseudo ) {

		var applyClass = true;
		var className = createClassName(pseudo.slice(1));
		var isNegated = pseudo.substring(0, 5) == ":not(";
		var activateEventName;
		var deactivateEventName;

		// if negated, remove :not()
		if (isNegated) {
			pseudo = pseudo.slice(5, -1);
		}

		// bracket contents are irrelevant - remove them
		var bracketIndex = pseudo.indexOf("(");
		if (bracketIndex > -1) {
			pseudo = pseudo.substring(0, bracketIndex);
		}

		// check we're still dealing with a pseudo-class
		if (pseudo.charAt(0) == ":") {
			switch (pseudo.slice(1)) {

				case "root":
					applyClass = function(e) {
						return isNegated ? e != root : e == root;
					};
					break;

				case "target":
					// :target is only supported in IE8
					if (ieVersion == 8) {
						applyClass = function(e) {
							var handler = function() {
								var hash = location.hash;
								var hashID = hash.slice(1);
								return isNegated ? (hash == EMPTY_STRING || e.id != hashID) : (hash != EMPTY_STRING && e.id == hashID);
							};
							addEvent( win, "hashchange", function() {
								toggleElementClass(e, className, handler());
							});
							return handler();
						};
						break;
					}
					return false;

				case "checked":
					applyClass = function(e) {
						if (RE_INPUT_CHECKABLE_TYPES.test(e.type)) {
							addEvent( e, "propertychange", function() {
								if (event.propertyName == "checked") {
									toggleElementClass( e, className, e.checked !== isNegated );
								}
							});
						}
						return e.checked !== isNegated;
					};
					break;

				case "disabled":
					isNegated = !isNegated;
					break;

				case "enabled":
					applyClass = function(e) {
						if (RE_INPUT_ELEMENTS.test(e.tagName)) {
							addEvent( e, "propertychange", function() {
								if (event.propertyName == "$disabled") {
									toggleElementClass( e, className, e.$disabled === isNegated );
								}
							});
							enabledWatchers.push(e);
							e.$disabled = e.disabled;
							return e.disabled === isNegated;
						}
						return pseudo == ":enabled" ? isNegated : !isNegated;
					};
					break;

				case "focus":
					activateEventName = "focus";
					deactivateEventName = "blur";
					break;

				case "hover":
					if (!activateEventName) {
						activateEventName = "mouseenter";
						deactivateEventName = "mouseleave";
					}
					applyClass = function(e) {
						addEvent( e, isNegated ? deactivateEventName : activateEventName, function() {
							toggleElementClass( e, className, true );
						});
						addEvent( e, isNegated ? activateEventName : deactivateEventName, function() {
							toggleElementClass( e, className, false );
						});
						return isNegated;
					};
					break;

				// everything else
				default:
					// If we don't support this pseudo-class don't create
					// a patch for it
					if (!RE_PSEUDO_STRUCTURAL.test(pseudo)) {
						return false;
					}
					break;
			}
		}
		return { className: className, applyClass: applyClass };
	}

	// --[ applyPatches() ]-------------------------------------------------
	function applyPatches() {
		var elms, selectorText, patches, domSelectorText;

		for (var c=0; c<domPatches.length; c++) {
			selectorText = domPatches[c].selector;
			patches = domPatches[c].patches;

			// Although some selector libraries can find :checked :enabled etc.
			// we need to find all elements that could have that state because
			// it can be changed by the user.
			domSelectorText = selectorText.replace(RE_LIBRARY_INCOMPATIBLE_PSEUDOS, EMPTY_STRING);

			// If the dom selector equates to an empty string or ends with
			// whitespace then we need to append a universal selector (*) to it.
			if (domSelectorText == EMPTY_STRING || domSelectorText.charAt(domSelectorText.length - 1) == SPACE_STRING) {
				domSelectorText += "*";
			}

			// Ensure we catch errors from the selector library
			try {
				elms = selectorMethod( domSelectorText );
			} catch (ex) {
				// #DEBUG_START
				log( "Selector '" + selectorText + "' threw exception '" + ex + "'" );
				// #DEBUG_END
			}

			if (elms) {
				for (var d = 0, dl = elms.length; d < dl; d++) {
					var elm = elms[d];
					var cssClasses = elm.className;
					for (var f = 0, fl = patches.length; f < fl; f++) {
						var patch = patches[f];
						if (!hasPatch(elm, patch)) {
							if (patch.applyClass && (patch.applyClass === true || patch.applyClass(elm) === true)) {
								cssClasses = toggleClass(cssClasses, patch.className, true );
							}
						}
					}
					elm.className = cssClasses;
				}
			}
		}
	}

	// --[ hasPatch() ]-----------------------------------------------------
	// checks for the existence of a patch on an element
	function hasPatch( elm, patch ) {
		return new RegExp("(^|\\s)" + patch.className + "(\\s|$)").test(elm.className);
	}

	// =========================== Utility =================================

	function createClassName( className ) {
		return namespace + "-" + ((ieVersion == 6 && patchIE6MultipleClasses) ?
			ie6PatchID++
		:
			className.replace(RE_PATCH_CLASS_NAME_REPLACE, function(a) { return a.charCodeAt(0); }));
	}

	// --[ log() ]----------------------------------------------------------
	// #DEBUG_START
	function log( message ) {
		if (win.console) {
			win.console.log(message);
		}
	}
	// #DEBUG_END

	// --[ trim() ]---------------------------------------------------------
	// removes leading, trailing whitespace from a string
	function trim( text ) {
		return text.replace(RE_TIDY_TRIM_WHITESPACE, PLACEHOLDER_STRING);
	}

	// --[ normalizeWhitespace() ]------------------------------------------
	// removes leading, trailing and consecutive whitespace from a string
	function normalizeWhitespace( text ) {
		return trim(text).replace(RE_TIDY_CONSECUTIVE_WHITESPACE, SPACE_STRING);
	}

	// --[ normalizeSelectorWhitespace() ]----------------------------------
	// tidies whitespace around selector brackets and combinators
	function normalizeSelectorWhitespace( selectorText ) {
		return normalizeWhitespace(selectorText.
			replace(RE_TIDY_TRAILING_WHITESPACE, PLACEHOLDER_STRING).
			replace(RE_TIDY_LEADING_WHITESPACE, PLACEHOLDER_STRING)
		);
	}

	// --[ toggleElementClass() ]-------------------------------------------
	// toggles a single className on an element
	function toggleElementClass( elm, className, on ) {
		var oldClassName = elm.className;
		var newClassName = toggleClass(oldClassName, className, on);
		if (newClassName != oldClassName) {
			elm.className = newClassName;
			elm.parentNode.className += EMPTY_STRING;
		}
	}

	// --[ toggleClass() ]--------------------------------------------------
	// adds / removes a className from a string of classNames. Used to
	// manage multiple class changes without forcing a DOM redraw
	function toggleClass( classList, className, on ) {
		var re = RegExp("(^|\\s)" + className + "(\\s|$)");
		var classExists = re.test(classList);
		if (on) {
			return classExists ? classList : classList + SPACE_STRING + className;
		} else {
			return classExists ? trim(classList.replace(re, PLACEHOLDER_STRING)) : classList;
		}
	}

	// --[ addEvent() ]-----------------------------------------------------
	function addEvent(elm, eventName, eventHandler) {
		elm.attachEvent("on" + eventName, eventHandler);
	}

	// --[ getXHRObject() ]-------------------------------------------------
	function getXHRObject() {
		if (win.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
		try	{
			return new ActiveXObject('Microsoft.XMLHTTP');
		} catch(e) {
			return null;
		}
	}

	// --[ loadStyleSheet() ]-----------------------------------------------
	function loadStyleSheet( url ) {
		xhr.open("GET", url, false);
		xhr.send();
		return (xhr.status==200) ? (xhr.responseText != null ? xhr.responseText : EMPTY_STRING) : EMPTY_STRING;
	}

	// --[ resolveUrl() ]---------------------------------------------------
	// Converts a URL fragment to a fully qualified URL using the specified
	// context URL. Returns null if same-origin policy is broken
	function resolveUrl( url, contextUrl, ignoreSameOriginPolicy ) {

		function getProtocol( url ) {
			return url.substring(0, url.indexOf("//"));
		}

		function getProtocolAndHost( url ) {
			return url.substring(0, url.indexOf("/", 8));
		}

		if (!contextUrl) {
			contextUrl = baseUrl;
		}

		// protocol-relative path
		if (url.substring(0,2)=="//") {
			url = getProtocol(contextUrl) + url;
		}

		// absolute path
		if (/^https?:\/\//i.test(url)) {
			return !ignoreSameOriginPolicy && getProtocolAndHost(contextUrl) != getProtocolAndHost(url) ? null : url ;
		}

		// root-relative path
		if (url.charAt(0)=="/")	{
			return getProtocolAndHost(contextUrl) + url;
		}

		// relative path
		var contextUrlPath = contextUrl.split(/[?#]/)[0]; // ignore query string in the contextUrl
		if (url.charAt(0) != "?" && contextUrlPath.charAt(contextUrlPath.length - 1) != "/") {
			contextUrlPath = contextUrlPath.substring(0, contextUrlPath.lastIndexOf("/") + 1);
		}

		return contextUrlPath + url;
	}

	// --[ parseStyleSheet() ]----------------------------------------------
	// Downloads the stylesheet specified by the URL, removes it's comments
	// and recursivly replaces @import rules with their contents, ultimately
	// returning the full cssText.
	function parseStyleSheet( url ) {
		if (url && url.indexOf(".css") !== -1) {
			return loadStyleSheet(url).replace(RE_COMMENT, EMPTY_STRING).
			replace(RE_IMPORT, function( match, quoteChar, importUrl, quoteChar2, importUrl2, media ) {
				var cssText = parseStyleSheet(resolveUrl(importUrl || importUrl2, url));
				return (media) ? "@media " + media + " {" + cssText + "}" : cssText;
			}).
			replace(RE_ASSET_URL, function( match, isBehavior, quoteChar, assetUrl ) {
				quoteChar = quoteChar || EMPTY_STRING;
				return isBehavior ? match : " url(" + quoteChar + resolveUrl(assetUrl, url, true) + quoteChar + ") ";
			});
		}
		return EMPTY_STRING;
	}

	// --[ getStyleSheets() ]-----------------------------------------------
	function getStyleSheets() {
		var url, stylesheet;
		for (var c = 0; c < doc.styleSheets.length; c++) {
			stylesheet = doc.styleSheets[c];
			if (stylesheet.href != EMPTY_STRING) {
				url = resolveUrl(stylesheet.href);
				if (url) {
					stylesheet.cssText = stylesheet.rawCssText = patchStyleSheet( parseStyleSheet( url ) );
				}
			}
		}
	}

	// --[ init() ]---------------------------------------------------------
	function init() {
		applyPatches();

		// :enabled & :disabled polling script (since we can't hook
		// onpropertychange event when an element is disabled)
		if (enabledWatchers.length > 0) {
			setInterval( function() {
				for (var c = 0, cl = enabledWatchers.length; c < cl; c++) {
					var e = enabledWatchers[c];
					if (e.disabled !== e.$disabled) {
						if (e.disabled) {
							e.disabled = false;
							e.$disabled = true;
							e.disabled = true;
						}
						else {
							e.$disabled = e.disabled;
						}
					}
				}
			}, 250);
		}
	}

	// Determine the baseUrl and download the stylesheets
	var baseTags = doc.getElementsByTagName("BASE");
	var baseUrl = (baseTags.length > 0) ? baseTags[0].href : doc.location.href;
	getStyleSheets();

	// Bind selectivizr to the ContentLoaded event.
	ContentLoaded(win, function() {
		// Determine the "best fit" selector engine
		for (var engine in selectorEngines) {
			var members, member, context = win;
			if (win[engine]) {
				members = selectorEngines[engine].replace("*", engine).split(".");
				while ((member = members.shift()) && (context = context[member])) {}
				if (typeof context == "function") {
					selectorMethod = context;
					init();
					return;
				}
			}
		}
	});

	/*!
	 * ContentLoaded.js by Diego Perini, modified for IE<9 only (to save space)
	 *
	 * Author: Diego Perini (diego.perini at gmail.com)
	 * Summary: cross-browser wrapper for DOMContentLoaded
	 * Updated: 20101020
	 * License: MIT
	 * Version: 1.2
	 *
	 * URL:
	 * http://javascript.nwbox.com/ContentLoaded/
	 * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
	 *
	 */

	// @w window reference
	// @f function reference
	function ContentLoaded(win, fn) {

		var done = false, top = true,
		init = function(e) {
			if (e.type == "readystatechange" && doc.readyState != "complete") return;
			(e.type == "load" ? win : doc).detachEvent("on" + e.type, init, false);
			if (!done && (done = true)) fn.call(win, e.type || e);
		},
		poll = function() {
			try { root.doScroll("left"); } catch(e) { setTimeout(poll, 50); return; }
			init('poll');
		};

		if (doc.readyState == "complete") fn.call(win, EMPTY_STRING);
		else {
			if (doc.createEventObject && root.doScroll) {
				try { top = !win.frameElement; } catch(e) { }
				if (top) poll();
			}
			addEvent(doc,"readystatechange", init);
			addEvent(win,"load", init);
		}
	}
})(this);
/*! Respond.js v1.4.2: min/max-width media query polyfill * Copyright 2013 Scott Jehl
 * Licensed under https://github.com/scottjehl/Respond/blob/master/LICENSE-MIT
 *  */

!function(a){"use strict";a.matchMedia=a.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(a.document)}(this),function(a){"use strict";function b(){u(!0)}var c={};a.respond=c,c.update=function(){};var d=[],e=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}(),f=function(a,b){var c=e();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))};if(c.ajax=f,c.queue=d,c.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,maxw:/\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/},c.mediaQueriesSupported=a.matchMedia&&null!==a.matchMedia("only all")&&a.matchMedia("only all").matches,!c.mediaQueriesSupported){var g,h,i,j=a.document,k=j.documentElement,l=[],m=[],n=[],o={},p=30,q=j.getElementsByTagName("head")[0]||k,r=j.getElementsByTagName("base")[0],s=q.getElementsByTagName("link"),t=function(){var a,b=j.createElement("div"),c=j.body,d=k.style.fontSize,e=c&&c.style.fontSize,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",c||(c=f=j.createElement("body"),c.style.background="none"),k.style.fontSize="100%",c.style.fontSize="100%",c.appendChild(b),f&&k.insertBefore(c,k.firstChild),a=b.offsetWidth,f?k.removeChild(c):c.removeChild(b),k.style.fontSize=d,e&&(c.style.fontSize=e),a=i=parseFloat(a)},u=function(b){var c="clientWidth",d=k[c],e="CSS1Compat"===j.compatMode&&d||j.body[c]||d,f={},o=s[s.length-1],r=(new Date).getTime();if(b&&g&&p>r-g)return a.clearTimeout(h),h=a.setTimeout(u,p),void 0;g=r;for(var v in l)if(l.hasOwnProperty(v)){var w=l[v],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?i||t():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?i||t():1)),w.hasquery&&(z&&A||!(z||e>=x)||!(A||y>=e))||(f[w.media]||(f[w.media]=[]),f[w.media].push(m[w.rules]))}for(var C in n)n.hasOwnProperty(C)&&n[C]&&n[C].parentNode===q&&q.removeChild(n[C]);n.length=0;for(var D in f)if(f.hasOwnProperty(D)){var E=j.createElement("style"),F=f[D].join("\n");E.type="text/css",E.media=D,q.insertBefore(E,o.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(j.createTextNode(F)),n.push(E)}},v=function(a,b,d){var e=a.replace(c.regex.keyframes,"").match(c.regex.media),f=e&&e.length||0;b=b.substring(0,b.lastIndexOf("/"));var g=function(a){return a.replace(c.regex.urls,"$1"+b+"$2$3")},h=!f&&d;b.length&&(b+="/"),h&&(f=1);for(var i=0;f>i;i++){var j,k,n,o;h?(j=d,m.push(g(a))):(j=e[i].match(c.regex.findStyles)&&RegExp.$1,m.push(RegExp.$2&&g(RegExp.$2))),n=j.split(","),o=n.length;for(var p=0;o>p;p++)k=n[p],l.push({media:k.split("(")[0].match(c.regex.only)&&RegExp.$2||"all",rules:m.length-1,hasquery:k.indexOf("(")>-1,minw:k.match(c.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:k.match(c.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}u()},w=function(){if(d.length){var b=d.shift();f(b.href,function(c){v(c,b.href,b.media),o[b.href]=!0,a.setTimeout(function(){w()},0)})}},x=function(){for(var b=0;b<s.length;b++){var c=s[b],e=c.href,f=c.media,g=c.rel&&"stylesheet"===c.rel.toLowerCase();e&&g&&!o[e]&&(c.styleSheet&&c.styleSheet.rawCssText?(v(c.styleSheet.rawCssText,e,f),o[e]=!0):(!/^([a-zA-Z:]*\/\/)/.test(e)&&!r||e.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&("//"===e.substring(0,2)&&(e=a.location.protocol+e),d.push({href:e,media:f})))}w()};x(),c.update=x,c.getEmValue=t,a.addEventListener?a.addEventListener("resize",b,!1):a.attachEvent&&a.attachEvent("onresize",b)}}(this);