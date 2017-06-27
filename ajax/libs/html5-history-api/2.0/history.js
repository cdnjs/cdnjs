/*
 * history API JavaScript Library v2.0.4
 *
 * Support: IE6+, FF3+, Opera 9+, Safari
 *
 * Copyright 2011-2012, Dmitriy Pakhtinov ( spb.piksel@gmail.com )
 *
 * http://spb-piksel.ru/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Update: 06-04-2012
 */

(function( window, undefined ){

	"use strict";

		// Check support HTML5 History API
	var api = !!( window.history && history.pushState ),
		// Symlink for document
		document = window.document,
		// Symlink for location
		Location = window.location,
		// Symlink for native history object
		History = window.history || {},
		// get current URL
		lastHash,

	// Internal settings for this library
	sets = function() {

		var i, m, s, config = { basepath: '/', redirect: false, type: '' },
			el = document.getElementsByTagName("SCRIPT");

		// parse GET parameters for internal settings.
		for( i = 0; el[ i ]; i++ ) {
			if ( m = /(.*)\/history(?:-\d\.\d(?:\.\d\w?)?(?:\.min)?)?.js\?(.*)$/i.exec( el[ i ].src ) ) {
				for( i = 0, s = m[ 2 ].split( "&" ); s[ i ]; ) {
					m = s[ i++ ].split( "=" );
					config[ m[ 0 ] ] = m[ 1 ] == 'true' ? true : m[ 1 ] == 'false' ? false : m[ 1 ] || '';
				}
				break;
			}
		}
		return config;
	}();

	// Generate new Location object of current href string in browser
	function getURL( hash ) {

			// for IE 6 generate normal hash
		var spl = Location.href.split( "#" ),
			hash = hash || ( spl.shift() && "#" + spl.join( "#" ) ),

			base = ( hash || "#" ).replace( new RegExp( "^#[\/]?(?:" + sets.type + ")?" ), "" ),
			url = sets.basepath + base,
			parts, pathname = ( parts = url.split( "?" ) ).shift(),
			search = ( parts = parts.join( "?" ).split( "#" ) ).shift(),
			hash = parts.join( "#" );

		return {
			// internal use only
			base: base,
			url: url,

			// standart global properties for History.location
			href: Location.protocol + "//" + Location.host + url,
			protocol: Location.protocol,
			host: Location.host,
			hostname: Location.hostname,
			port: Location.port,
			path: pathname.replace(/[^\/]+$/g, ''),
			pathname: pathname,
			search: search ? "?" + search : "",
			hash: hash ? "#" + hash : "",
			toString: function() {
				return this.href;
			}
		}
	}

	// initializing core library
	function init() {

		var path = Location.pathname;

		if ( api ) {
			if ( lastHash != sets.basepath && (new RegExp( "^" + sets.basepath + "$", "i" )).test( path ) ) {
				window.location = lastHash;
			}
			if ( !(new RegExp( "^" + sets.basepath, "i" )).test( path ) ) {
				window.location = path.replace(/^\//, sets.basepath ) + Location.search;
			}
		} else if ( path != sets.basepath ) {
			window.location = sets.basepath + '#' + path.
				replace( new RegExp( "^" + sets.basepath, "i" ), sets.type ) + Location.search + Location.hash;
			return false;
		}

		return true;
	}

	lastHash = getURL().url;

	// simlink for browser supported History API - ( not recommended use )
	History.location = Location;

	if ( ( sets.redirect && window.parent.frames.length === 0 && !init() ) || api ) return;

	var // catching dummy
		_e_,
		// original methods text links
		_a, _r, _d,
		// if browser MSIE - eval need for successfully compression js code
		ie = eval( "/*@cc_on @_jscript_version;@*/" ),
		// saving originals event methods
		addEvent = ( _a = "addEventListener", window[ _a ] ) || ( _a = "attachEvent", window[ _a ] ),
		removeEvent = ( _r = "removeEventListener", window[ _r ] ) || ( _r = "detachEvent", window[ _r ] ),
		fireEvent = ( _d = "dispatchEvent", window[ _d ] ) || ( _d = "fireEvent", window[ _d ] ),
		// supporting event for this library
		events = { popstate: 1, onpopstate: 1 },
		// listener list
		eventsList = [],
		// for IE<8
		iframe,
		hashCheckerHandler,
		// if hash changed from initialize, has need update
		hasNeedUpdate = true,
		popstateHandler;

	function initialState() {
		if ( hasNeedUpdate && !( hasNeedUpdate = false ) && lastHash !== sets.basepath ) {
			clearInterval( popstateHandler );
			setTimeout(function(){
				firePopState();
			}, 10);
		}
	}

	popstateHandler = setInterval(function(){
		if ( window.onpopstate && Object.prototype.toString.call( window.onpopstate ) === "[object Function]" ) {
			initialState();
		}
	}, 100);

	// overwrite addEventListener/attachEvent
	window[ _a ] = function( event, listener, capture, aWantsUntrusted ) {
		if ( events[ event ] ) {
			eventsList.push( listener );
			initialState();
		} else {
			addEvent( event, listener, capture, aWantsUntrusted );
		}
	}

	// overwrite removeEventListener/detachEvent
	window[ _r ] = function( event, listener, capture ) {
		if ( events[ event ] ) {
			for( var i = eventsList.length; --i; ) {
				if ( eventsList[ i ] === listener ) {
					eventsList.splice( i, 1 );
					break;
				}
			}
		} else {
			removeEvent( event, listener, capture );
		}
	}

	// overwrite dispatchEvent/fireEvent
	window[ _d ] = function( event, eventObject ) {
		var type = event && event.type || event;
		if ( events[ type ] ) {
			eventObject = eventObject || ( typeof event == "string" ? window.event : event );
			try {
				eventObject && ( eventObject.target = window );
			} catch( _e_ ) {
				try {
					eventObject.srcElement = window;
				} catch( _e_ ) {}
			}
			if ( window.onpopstate && Object.prototype.toString.call( window.onpopstate ) === "[object Function]" ) {
				if ( window.onpopstate.call( window, eventObject ) === false ) return false;
			}
			for( var i = 0, len = eventsList.length; i < len; i++ ) {
				if ( eventsList[ i ].call( window, eventObject ) === false ) return false;
			}
			return true;
		} else {
			return fireEvent( event, eventObject );
		}
	}

	var JSONstringify = (function() {
		if ( window.JSON && JSON.stringify ) {
			return JSON.stringify;
		}

		function quote( string ) {

			var escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
				meta = {'\b': '\\b','\t': '\\t','\n': '\\n','\f': '\\f','\r': '\\r','"': '\\"','\\': '\\\\'};

			escapable.lastIndex = 0;

			return escapable.test( string ) ? '"' + string.replace( escapable, function( a ) {
				var c = meta[ a ];
				return typeof c === 'string' ? c : '\\u' + ( '0000' + a.charCodeAt( 0 ).toString( 16 ) ).slice( -4 );
			}) + '"' : '"' + string + '"';
		}
		function str( value ) {

			var isArray, result, k,
				n = ( typeof value ).charCodeAt( 2 );

			return n == 114 ? quote( value ) : // string
				n == 109 ? isFinite( value ) ? String( value ) : 'null' : // number
				n == 111 || n == 108 ? String( value ) : // boolean, null
				n == 106 ? function() { // object
					if ( !value ) return 'null';
					isArray = Object.prototype.toString.apply( value ) === '[object Array]';
					result = isArray ? "[" : "{";
					if ( isArray ) {
						for( k = 0; k < value.length; k++ ) {
							result += ( k == 0 ? "" : "," ) + str( value[ k ] );
						}
					} else {
						for( k in value ) {
							if ( Object.hasOwnProperty.call( value, k ) && value[ k ] !== undefined ) {
								result += ( result.length == 1 ? "" : "," ) + quote( k ) + ":" + str( value[ k ] );
							}
						}
					}
					return result + ( isArray ? "]" : "}" );
				}() : undefined;
		}
		return str;
	})();

	function JSONparse( source ) {
		if ( source ) {
			if ( window.JSON && JSON.parse ) {
				return JSON.parse( source );
			}
			return (new Function( "return " + source ))();
		}
		return null;
	}

	function Storage( states ) {
		if ( window.sessionStorage ) {
			if ( states ) {
				sessionStorage.setItem( '__hitoryapi__', JSONstringify( states ) );
				return states;
			}
			return JSONparse( sessionStorage.getItem( '__hitoryapi__' ) ) || {};
		}
		return {};
	}

	function switchHash( url, state, replace ) {

		var states = Storage();

		if ( iframe ) {
			clearInterval( hashCheckerHandler );
			lastHash = getURL( "#" + url ).url;
			iSwitchHash( url, state, replace );
			hashCheckerHandler = setInterval( hashChecker, 100 );
		} else {
			lastHash = getURL( "#" + url ).url;
			if ( replace ) {
				if ( states[ getURL().href ] ) {
					delete states[ getURL().href ];
				}
				window.location.replace( "#" + url );
			} else {
				window.location.hash = url;
			}
			states[ getURL().href ] = state;
			Storage( states );
		}
		updateState();
	}

	function updateState() {

		var state = iframe ? iframe.storage : Storage()[ getURL().href ];

		History.state = state && state.state || null;
		History.title = state && state.title || document.title;
		History.location = getURL();
	}

	// dispatch "popstate" event if location changed
	function firePopState() {

		updateState();

		if ( History.title != null ) {
			document.title = History.title;
		}

		if ( document.createEvent ) {
			var o = document.createEvent( 'Events' );
			o.initEvent( 'popstate', false, false );
		} else {
			var o = document.createEventObject();
			o.type = "popstate";
		}

		o.location = History.location;
		o.state = History.state;
		o.title = History.title;
		o.srcElement = window;

		window.dispatchEvent ? window.dispatchEvent( o ) : window.fireEvent( 'popstate', o );
	}

	function hashChecker() {
		var currentHash = getURL().url;

		if ( lastHash !== currentHash ) {
			lastHash = currentHash;
			firePopState();
		}
	}

	// If IE version 7 or lower
	if ( ie && ie < 5.8 ) {

		iframe = document.createElement( 'iframe' );
		iframe.src = "javascript:true;";
		iframe = document.documentElement.firstChild.appendChild( iframe ).contentWindow;
		iframe.storage = null;
		iframe.onload = updateState;
		var iSwitchHash = function( url, state, replace, lfirst ) {
			var i = iframe.document,
				content = ['<script>','lfirst=1;',null,'storage='+JSONstringify(state)+';','</script>'];
			if ( replace ) {
				if ( iframe.lfirst ) {
					history.back();
					iSwitchHash( url, state, 0, 1 );
				} else {
					Location.replace( "#" + url );
				}
			} else if ( getURL( "#" + url ).url != getURL().url || lfirst ) {
				if ( !iframe.lfirst ) {
					iframe.lfirst = 1;
					iSwitchHash( getURL().base, iframe.storage, 0, 1 );
				}
				content[ 2 ] = 'parent.location.hash="'+url.replace( /"/g, '\\"' )+'";';
				i.open(); i.write( content.join("") ); i.close();
			}
		}

		// starting interval for check hash
		hashCheckerHandler = setInterval( hashChecker, 100 );
	} else {
		addEvent( ( window.addEventListener ? "" : "on" ) + "hashchange", hashChecker, false );
	}
	updateState();

	// If this is true, there is no native support
	History.emulate = true;

	History.pushState = function( state, title, url, replace ) {

		url = url == undefined || url == null ? sets.basepath : url;
		url = url.replace( new RegExp( "^" + Location.protocol + "//" + Location.host + "/", "i" ), "/" );

		if ( url.indexOf( '?' ) == 0 ) {
			url = getURL().pathname + url;
		} else if ( url.indexOf( '/' ) != 0 ) {
			url = getURL().path + url;
		}
		if ( ( new RegExp( "^" + sets.basepath, "i" ) ).test( url ) ) {
			url = url.replace( new RegExp( "^" + sets.basepath, "i" ), sets.type );
		} else {
			Location.href = url;
		}

		switchHash( url, { state: state, title: title }, replace );

		if ( title != null ) {
			document.title = title;
		}
	}

	History.replaceState = function( state, title, url ) {
		History.pushState( state, title, url, true );
	}

})( window );
