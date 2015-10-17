/*!
 * Amplify Store - Persistent Client-Side Storage 1.1.2
 *
 * Copyright 2011 - 2013 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 *
 * http://amplifyjs.com
 */
(function( amplify, undefined ) {

var store = amplify.store = function( key, value, options ) {
	var type = store.type;
	if ( options && options.type && options.type in store.types ) {
		type = options.type;
	}
	return store.types[ type ]( key, value, options || {} );
};

store.types = {};
store.type = null;
store.addType = function( type, storage ) {
	if ( !store.type ) {
		store.type = type;
	}

	store.types[ type ] = storage;
	store[ type ] = function( key, value, options ) {
		options = options || {};
		options.type = type;
		return store( key, value, options );
	};
};
store.error = function() {
	return "amplify.store quota exceeded";
};

var rprefix = /^__amplify__/;
function createFromStorageInterface( storageType, storage ) {
	store.addType( storageType, function( key, value, options ) {
		var storedValue, parsed, i, remove,
			ret = value,
			now = (new Date()).getTime();

		if ( !key ) {
			ret = {};
			remove = [];
			i = 0;
			try {
				// accessing the length property works around a localStorage bug
				// in Firefox 4.0 where the keys don't update cross-page
				// we assign to key just to avoid Closure Compiler from removing
				// the access as "useless code"
				// https://bugzilla.mozilla.org/show_bug.cgi?id=662511
				key = storage.length;

				while ( key = storage.key( i++ ) ) {
					if ( rprefix.test( key ) ) {
						parsed = JSON.parse( storage.getItem( key ) );
						if ( parsed.expires && parsed.expires <= now ) {
							remove.push( key );
						} else {
							ret[ key.replace( rprefix, "" ) ] = parsed.data;
						}
					}
				}
				while ( key = remove.pop() ) {
					storage.removeItem( key );
				}
			} catch ( error ) {}
			return ret;
		}

		// protect against name collisions with direct storage
		key = "__amplify__" + key;

		if ( value === undefined ) {
			storedValue = storage.getItem( key );
			parsed = storedValue ? JSON.parse( storedValue ) : { expires: -1 };
			if ( parsed.expires && parsed.expires <= now ) {
				storage.removeItem( key );
			} else {
				return parsed.data;
			}
		} else {
			if ( value === null ) {
				storage.removeItem( key );
			} else {
				parsed = JSON.stringify({
					data: value,
					expires: options.expires ? now + options.expires : null
				});
				try {
					storage.setItem( key, parsed );
				// quota exceeded
				} catch( error ) {
					// expire old data and try again
					store[ storageType ]();
					try {
						storage.setItem( key, parsed );
					} catch( error ) {
						throw store.error();
					}
				}
			}
		}

		return ret;
	});
}

// localStorage + sessionStorage
// IE 8+, Firefox 3.5+, Safari 4+, Chrome 4+, Opera 10.5+, iPhone 2+, Android 2+
for ( var webStorageType in { localStorage: 1, sessionStorage: 1 } ) {
	// try/catch for file protocol in Firefox and Private Browsing in Safari 5
	try {
		// Safari 5 in Private Browsing mode exposes localStorage
		// but doesn't allow storing data, so we attempt to store and remove an item.
		// This will unfortunately give us a false negative if we're at the limit.
		window[ webStorageType ].setItem( "__amplify__", "x" );
		window[ webStorageType ].removeItem( "__amplify__" );
		createFromStorageInterface( webStorageType, window[ webStorageType ] );
	} catch( e ) {}
}

// globalStorage
// non-standard: Firefox 2+
// https://developer.mozilla.org/en/dom/storage#globalStorage
if ( !store.types.localStorage && window.globalStorage ) {
	// try/catch for file protocol in Firefox
	try {
		createFromStorageInterface( "globalStorage",
			window.globalStorage[ window.location.hostname ] );
		// Firefox 2.0 and 3.0 have sessionStorage and globalStorage
		// make sure we default to globalStorage
		// but don't default to globalStorage in 3.5+ which also has localStorage
		if ( store.type === "sessionStorage" ) {
			store.type = "globalStorage";
		}
	} catch( e ) {}
}

// userData
// non-standard: IE 5+
// http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
(function() {
	// IE 9 has quirks in userData that are a huge pain
	// rather than finding a way to detect these quirks
	// we just don't register userData if we have localStorage
	if ( store.types.localStorage ) {
		return;
	}

	// append to html instead of body so we can do this from the head
	var div = document.createElement( "div" ),
		attrKey = "amplify";
	div.style.display = "none";
	document.getElementsByTagName( "head" )[ 0 ].appendChild( div );

	// we can't feature detect userData support
	// so just try and see if it fails
	// surprisingly, even just adding the behavior isn't enough for a failure
	// so we need to load the data as well
	try {
		div.addBehavior( "#default#userdata" );
		div.load( attrKey );
	} catch( e ) {
		div.parentNode.removeChild( div );
		return;
	}

	store.addType( "userData", function( key, value, options ) {
		div.load( attrKey );
		var attr, parsed, prevValue, i, remove,
			ret = value,
			now = (new Date()).getTime();

		if ( !key ) {
			ret = {};
			remove = [];
			i = 0;
			while ( attr = div.XMLDocument.documentElement.attributes[ i++ ] ) {
				parsed = JSON.parse( attr.value );
				if ( parsed.expires && parsed.expires <= now ) {
					remove.push( attr.name );
				} else {
					ret[ attr.name ] = parsed.data;
				}
			}
			while ( key = remove.pop() ) {
				div.removeAttribute( key );
			}
			div.save( attrKey );
			return ret;
		}

		// convert invalid characters to dashes
		// http://www.w3.org/TR/REC-xml/#NT-Name
		// simplified to assume the starting character is valid
		// also removed colon as it is invalid in HTML attribute names
		key = key.replace( /[^\-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g, "-" );
		// adjust invalid starting character to deal with our simplified sanitization
		key = key.replace( /^-/, "_-" );

		if ( value === undefined ) {
			attr = div.getAttribute( key );
			parsed = attr ? JSON.parse( attr ) : { expires: -1 };
			if ( parsed.expires && parsed.expires <= now ) {
				div.removeAttribute( key );
			} else {
				return parsed.data;
			}
		} else {
			if ( value === null ) {
				div.removeAttribute( key );
			} else {
				// we need to get the previous value in case we need to rollback
				prevValue = div.getAttribute( key );
				parsed = JSON.stringify({
					data: value,
					expires: (options.expires ? (now + options.expires) : null)
				});
				div.setAttribute( key, parsed );
			}
		}

		try {
			div.save( attrKey );
		// quota exceeded
		} catch ( error ) {
			// roll the value back to the previous value
			if ( prevValue === null ) {
				div.removeAttribute( key );
			} else {
				div.setAttribute( key, prevValue );
			}

			// expire old data and try again
			store.userData();
			try {
				div.setAttribute( key, parsed );
				div.save( attrKey );
			} catch ( error ) {
				// roll the value back to the previous value
				if ( prevValue === null ) {
					div.removeAttribute( key );
				} else {
					div.setAttribute( key, prevValue );
				}
				throw store.error();
			}
		}
		return ret;
	});
}() );

// in-memory storage
// fallback for all browsers to enable the API even if we can't persist data
(function() {
	var memory = {},
		timeout = {};

	function copy( obj ) {
		return obj === undefined ? undefined : JSON.parse( JSON.stringify( obj ) );
	}

	store.addType( "memory", function( key, value, options ) {
		if ( !key ) {
			return copy( memory );
		}

		if ( value === undefined ) {
			return copy( memory[ key ] );
		}

		if ( timeout[ key ] ) {
			clearTimeout( timeout[ key ] );
			delete timeout[ key ];
		}

		if ( value === null ) {
			delete memory[ key ];
			return null;
		}

		memory[ key ] = value;
		if ( options.expires ) {
			timeout[ key ] = setTimeout(function() {
				delete memory[ key ];
				delete timeout[ key ];
			}, options.expires );
		}

		return value;
	});
}() );

}( this.amplify = this.amplify || {} ) );
