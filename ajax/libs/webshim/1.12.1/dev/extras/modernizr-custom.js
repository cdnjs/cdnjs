/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-canvas-audio-video-input-inputtypes-localstorage-sessionstorage-geolocation-shiv-cssclasses-addtest-prefixed-testprop-testallprops-prefixes-domprefixes-elem_track
 */
;



window.Modernizr = (function( window, document, undefined ) {

	var version = '2.7.1',

		Modernizr = {},

		enableClasses = true,

		docElement = document.documentElement,

		mod = 'modernizr',
		modElem = document.createElement(mod),
		mStyle = modElem.style,

		inputElem  = document.createElement('input')  ,

		smile = ':)',

		toString = {}.toString,

		prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



		omPrefixes = 'Webkit Moz O ms',

		cssomPrefixes = omPrefixes.split(' '),

		domPrefixes = omPrefixes.toLowerCase().split(' '),


		tests = {},
		inputs = {},
		attrs = {},

		classes = [],

		slice = classes.slice,

		featureName,



		_hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

	if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
		hasOwnProp = function (object, property) {
			return _hasOwnProperty.call(object, property);
		};
	}
	else {
		hasOwnProp = function (object, property) {
			return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
		};
	}


	if (!Function.prototype.bind) {
		Function.prototype.bind = function bind(that) {

			var target = this;

			if (typeof target != "function") {
				throw new TypeError();
			}

			var args = slice.call(arguments, 1),
				bound = function () {

					if (this instanceof bound) {

						var F = function(){};
						F.prototype = target.prototype;
						var self = new F();

						var result = target.apply(
							self,
							args.concat(slice.call(arguments))
						);
						if (Object(result) === result) {
							return result;
						}
						return self;

					} else {

						return target.apply(
							that,
							args.concat(slice.call(arguments))
						);

					}

				};

			return bound;
		};
	}

	function setCss( str ) {
		mStyle.cssText = str;
	}

	function setCssAll( str1, str2 ) {
		return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
	}

	function is( obj, type ) {
		return typeof obj === type;
	}

	function contains( str, substr ) {
		return !!~('' + str).indexOf(substr);
	}

	function testProps( props, prefixed ) {
		for ( var i in props ) {
			var prop = props[i];
			if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
				return prefixed == 'pfx' ? prop : true;
			}
		}
		return false;
	}

	function testDOMProps( props, obj, elem ) {
		for ( var i in props ) {
			var item = obj[props[i]];
			if ( item !== undefined) {

				if (elem === false) return props[i];

				if (is(item, 'function')){
					return item.bind(elem || obj);
				}

				return item;
			}
		}
		return false;
	}

	function testPropsAll( prop, prefixed, elem ) {

		var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
			props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

		if(is(prefixed, "string") || is(prefixed, "undefined")) {
			return testProps(props, prefixed);

		} else {
			props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
			return testDOMProps(props, prefixed, elem);
		}
	}



	tests['canvas'] = function() {
		var elem = document.createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	};    tests['geolocation'] = function() {
		return 'geolocation' in navigator;
	};


	tests['video'] = function() {
		var elem = document.createElement('video'),
			bool = false;

		try {
			if ( bool = !!elem.canPlayType ) {
				bool      = new Boolean(bool);
				bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

				bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

				bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
			}

		} catch(e) { }

		return bool;
	};

	tests['audio'] = function() {
		var elem = document.createElement('audio'),
			bool = false;

		try {
			if ( bool = !!elem.canPlayType ) {
				bool      = new Boolean(bool);
				bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
				bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

				bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
				bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
					elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
			}
		} catch(e) { }

		return bool;
	};


	tests['localstorage'] = function() {
		try {
			localStorage.setItem(mod, mod);
			localStorage.removeItem(mod);
			return true;
		} catch(e) {
			return false;
		}
	};

	tests['sessionstorage'] = function() {
		try {
			sessionStorage.setItem(mod, mod);
			sessionStorage.removeItem(mod);
			return true;
		} catch(e) {
			return false;
		}
	};

	function webforms() {
		Modernizr['input'] = (function( props ) {
			for ( var i = 0, len = props.length; i < len; i++ ) {
				attrs[ props[i] ] = !!(props[i] in inputElem);
			}
			if (attrs.list){
				attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
			}
			return attrs;
		})('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
		Modernizr['inputtypes'] = (function(props) {

			for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

				inputElem.setAttribute('type', inputElemType = props[i]);
				bool = inputElem.type !== 'text';

				if ( bool ) {

					inputElem.value         = smile;
					inputElem.style.cssText = 'position:absolute;visibility:hidden;';

					if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

						docElement.appendChild(inputElem);
						defaultView = document.defaultView;

						bool =  defaultView.getComputedStyle &&
							defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
							(inputElem.offsetHeight !== 0);

						docElement.removeChild(inputElem);

					} else if ( /^(search|tel)$/.test(inputElemType) ){
					} else if ( /^(url|email)$/.test(inputElemType) ) {
						bool = inputElem.checkValidity && inputElem.checkValidity() === false;

					} else {
						bool = inputElem.value != smile;
					}
				}

				inputs[ props[i] ] = !!bool;
			}
			return inputs;
		})('search tel url email datetime date month week time datetime-local number range color'.split(' '));
	}
	for ( var feature in tests ) {
		if ( hasOwnProp(tests, feature) ) {
			featureName  = feature.toLowerCase();
			Modernizr[featureName] = tests[feature]();

			classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
		}
	}

	Modernizr.input || webforms();


	Modernizr.addTest = function ( feature, test ) {
		if ( typeof feature == 'object' ) {
			for ( var key in feature ) {
				if ( hasOwnProp( feature, key ) ) {
					Modernizr.addTest( key, feature[ key ] );
				}
			}
		} else {

			feature = feature.toLowerCase();

			if ( Modernizr[feature] !== undefined ) {
				return Modernizr;
			}

			test = typeof test == 'function' ? test() : test;

			if (typeof enableClasses !== "undefined" && enableClasses) {
				docElement.className += ' ' + (test ? '' : 'no-') + feature;
			}
			Modernizr[feature] = test;

		}

		return Modernizr;
	};


	setCss('');
	modElem = inputElem = null;

	;(function(window, document) {
		var version = '3.7.0';

		var options = window.html5 || {};

		var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

		var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

		var supportsHtml5Styles;

		var expando = '_html5shiv';

		var expanID = 0;

		var expandoData = {};

		var supportsUnknownElements;

		(function() {
			try {
				var a = document.createElement('a');
				a.innerHTML = '<xyz></xyz>';
				supportsHtml5Styles = ('hidden' in a);

				supportsUnknownElements = a.childNodes.length == 1 || (function() {
					(document.createElement)('a');
					var frag = document.createDocumentFragment();
					return (
						typeof frag.cloneNode == 'undefined' ||
							typeof frag.createDocumentFragment == 'undefined' ||
							typeof frag.createElement == 'undefined'
						);
				}());
			} catch(e) {
				supportsHtml5Styles = true;
				supportsUnknownElements = true;
			}

		}());

		function addStyleSheet(ownerDocument, cssText) {
			var p = ownerDocument.createElement('p'),
				parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

			p.innerHTML = 'x<style>' + cssText + '</style>';
			return parent.insertBefore(p.lastChild, parent.firstChild);
		}

		function getElements() {
			var elements = html5.elements;
			return typeof elements == 'string' ? elements.split(' ') : elements;
		}

		function getExpandoData(ownerDocument) {
			var data = expandoData[ownerDocument[expando]];
			if (!data) {
				data = {};
				expanID++;
				ownerDocument[expando] = expanID;
				expandoData[expanID] = data;
			}
			return data;
		}

		function createElement(nodeName, ownerDocument, data){
			if (!ownerDocument) {
				ownerDocument = document;
			}
			if(supportsUnknownElements){
				return ownerDocument.createElement(nodeName);
			}
			if (!data) {
				data = getExpandoData(ownerDocument);
			}
			var node;

			if (data.cache[nodeName]) {
				node = data.cache[nodeName].cloneNode();
			} else if (saveClones.test(nodeName)) {
				node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
			} else {
				node = data.createElem(nodeName);
			}

			return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
		}

		function createDocumentFragment(ownerDocument, data){
			if (!ownerDocument) {
				ownerDocument = document;
			}
			if(supportsUnknownElements){
				return ownerDocument.createDocumentFragment();
			}
			data = data || getExpandoData(ownerDocument);
			var clone = data.frag.cloneNode(),
				i = 0,
				elems = getElements(),
				l = elems.length;
			for(;i<l;i++){
				clone.createElement(elems[i]);
			}
			return clone;
		}

		function shivMethods(ownerDocument, data) {
			if (!data.cache) {
				data.cache = {};
				data.createElem = ownerDocument.createElement;
				data.createFrag = ownerDocument.createDocumentFragment;
				data.frag = data.createFrag();
			}


			ownerDocument.createElement = function(nodeName) {
				if (!html5.shivMethods) {
					return data.createElem(nodeName);
				}
				return createElement(nodeName, ownerDocument, data);
			};

			ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
				'var n=f.cloneNode(),c=n.createElement;' +
				'h.shivMethods&&(' +
				getElements().join().replace(/[\w\-]+/g, function(nodeName) {
					data.createElem(nodeName);
					data.frag.createElement(nodeName);
					return 'c("' + nodeName + '")';
				}) +
				');return n}'
			)(html5, data.frag);
		}

		function shivDocument(ownerDocument) {
			if (!ownerDocument) {
				ownerDocument = document;
			}
			var data = getExpandoData(ownerDocument);

			if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
				data.hasCSS = !!addStyleSheet(ownerDocument,
					'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
						'mark{background:#FF0;color:#000}' +
						'template{display:none}'
				);
			}
			if (!supportsUnknownElements) {
				shivMethods(ownerDocument, data);
			}
			return ownerDocument;
		}

		var html5 = {

			'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

			'version': version,

			'shivCSS': (options.shivCSS !== false),

			'supportsUnknownElements': supportsUnknownElements,

			'shivMethods': (options.shivMethods !== false),

			'type': 'default',

			'shivDocument': shivDocument,

			createElement: createElement,

			createDocumentFragment: createDocumentFragment
		};

		window.html5 = html5;

		shivDocument(document);

	}(this, document));

	Modernizr._version      = version;

	Modernizr._prefixes     = prefixes;
	Modernizr._domPrefixes  = domPrefixes;
	Modernizr._cssomPrefixes  = cssomPrefixes;



	Modernizr.testProp      = function(prop){
		return testProps([prop]);
	};

	Modernizr.testAllProps  = testPropsAll;


	Modernizr.prefixed      = function(prop, obj, elem){
		if(!obj) {
			return testPropsAll(prop, 'pfx');
		} else {
			return testPropsAll(prop, obj, elem);
		}
	};


	docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

		(enableClasses ? ' js ' + classes.join(' ') : '');

	return Modernizr;

})(this, this.document);
// Track element + Timed Text Track API
// http://www.w3.org/TR/html5/video.html#the-track-element
// http://www.w3.org/TR/html5/media-elements.html#text-track-api
//
// While IE10 has implemented the track element, IE10 does not expose the underlying APIs to create timed text tracks by JS (really sad)
// By Addy Osmani
Modernizr.addTest({
	texttrackapi: (typeof (document.createElement('video').addTextTrack) === 'function'),
	// a more strict test for track including UI support: document.createElement('track').kind === 'subtitles'
	track: ('kind' in document.createElement('track'))
});
;
