/*
* calc-polyfill | https://github.com/closingtag/calc-polyfill
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

				stylesheets.push(stylesheet.href);
			}

			if ( stylesheet.ownerNode && stylesheet.ownerNode.nodeName.toLowerCase() === 'style' ) {

				cssTexts[index] = stylesheet.ownerNode.textContent;
			}
		}


		if ( stylesheets.length > 0 || cssTexts.length > 0 ) {

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

	// import libs/contentloaded/src/contentloaded.js
	// import libs/requestAnimationFrame/app/requestAnimationFrame.js


})(window, document);
