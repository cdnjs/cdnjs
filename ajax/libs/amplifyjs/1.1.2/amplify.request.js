/*!
 * Amplify Request 1.1.2
 *
 * Copyright 2011 - 2013 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 *
 * http://amplifyjs.com
 */
/*global amplify*/

(function( amplify, undefined ) {
'use strict';

function noop() {}
function isFunction( obj ) {
	return ({}).toString.call( obj ) === "[object Function]";
}

function async( fn ) {
	var isAsync = false;
	setTimeout(function() {
		isAsync = true;
	}, 1 );
	return function() {
		var that = this,
			args = arguments;
		if ( isAsync ) {
			fn.apply( that, args );
		} else {
			setTimeout(function() {
				fn.apply( that, args );
			}, 1 );
		}
	};
}

amplify.request = function( resourceId, data, callback ) {
	// default to an empty hash just so we can handle a missing resourceId
	// in one place
	var settings = resourceId || {};

	if ( typeof settings === "string" ) {
		if ( isFunction( data ) ) {
			callback = data;
			data = {};
		}
		settings = {
			resourceId: resourceId,
			data: data || {},
			success: callback
		};
	}

	var request = { abort: noop },
		resource = amplify.request.resources[ settings.resourceId ],
		success = settings.success || noop,
		error = settings.error || noop;

	settings.success = async( function( data, status ) {
		status = status || "success";
		amplify.publish( "request.success", settings, data, status );
		amplify.publish( "request.complete", settings, data, status );
		success( data, status );
	});

	settings.error = async( function( data, status ) {
		status = status || "error";
		amplify.publish( "request.error", settings, data, status );
		amplify.publish( "request.complete", settings, data, status );
		error( data, status );
	});

	if ( !resource ) {
		if ( !settings.resourceId ) {
			throw "amplify.request: no resourceId provided";
		}
		throw "amplify.request: unknown resourceId: " + settings.resourceId;
	}

	if ( !amplify.publish( "request.before", settings ) ) {
		settings.error( null, "abort" );
		return;
	}

	amplify.request.resources[ settings.resourceId ]( settings, request );
	return request;
};

amplify.request.types = {};
amplify.request.resources = {};
amplify.request.define = function( resourceId, type, settings ) {
	if ( typeof type === "string" ) {
		if ( !( type in amplify.request.types ) ) {
			throw "amplify.request.define: unknown type: " + type;
		}

		settings.resourceId = resourceId;
		amplify.request.resources[ resourceId ] =
			amplify.request.types[ type ]( settings );
	} else {
		// no pre-processor or settings for one-off types (don't invoke)
		amplify.request.resources[ resourceId ] = type;
	}
};

}( amplify ) );


(function( amplify, $, undefined ) {
'use strict';

var xhrProps = [ "status", "statusText", "responseText", "responseXML", "readyState" ],
		rurlData = /\{([^\}]+)\}/g;

amplify.request.types.ajax = function( defnSettings ) {
	defnSettings = $.extend({
		type: "GET"
	}, defnSettings );

	return function( settings, request ) {
		var xhr, handleResponse,
			url = defnSettings.url,
			abort = request.abort,
			ajaxSettings = $.extend( true, {}, defnSettings, { data: settings.data } ),
			aborted = false,
			ampXHR = {
				readyState: 0,
				setRequestHeader: function( name, value ) {
					return xhr.setRequestHeader( name, value );
				},
				getAllResponseHeaders: function() {
					return xhr.getAllResponseHeaders();
				},
				getResponseHeader: function( key ) {
					return xhr.getResponseHeader( key );
				},
				overrideMimeType: function( type ) {
					return xhr.overrideMimeType( type );
				},
				abort: function() {
					aborted = true;
					try {
						xhr.abort();
					// IE 7 throws an error when trying to abort
					} catch( e ) {}
					handleResponse( null, "abort" );
				},
				success: function( data, status ) {
					settings.success( data, status );
				},
				error: function( data, status ) {
					settings.error( data, status );
				}
			};

		handleResponse = function( data, status ) {
			$.each( xhrProps, function( i, key ) {
				try {
					ampXHR[ key ] = xhr[ key ];
				} catch( e ) {}
			});
			// Playbook returns "HTTP/1.1 200 OK"
			// TODO: something also returns "OK", what?
			if ( /OK$/.test( ampXHR.statusText ) ) {
				ampXHR.statusText = "success";
			}
			if ( data === undefined ) {
				// TODO: add support for ajax errors with data
				data = null;
			}
			if ( aborted ) {
				status = "abort";
			}
			if ( /timeout|error|abort/.test( status ) ) {
				ampXHR.error( data, status );
			} else {
				ampXHR.success( data, status );
			}
			// avoid handling a response multiple times
			// this can happen if a request is aborted
			// TODO: figure out if this breaks polling or multi-part responses
			handleResponse = $.noop;
		};

		amplify.publish( "request.ajax.preprocess",
			defnSettings, settings, ajaxSettings, ampXHR );

		$.extend( ajaxSettings, {
			isJSONP: function () {
				return (/jsonp/gi).test(this.dataType);
			},
			cacheURL: function () {
				if (!this.isJSONP()) {
					return this.url;
				}

				var callbackName = 'callback';

				// possible for the callback function name to be overridden
				if (this.hasOwnProperty('jsonp')) {
					if (this.jsonp !== false) {
						callbackName = this.jsonp;
					} else {
						if (this.hasOwnProperty('jsonpCallback')) {
							callbackName = this.jsonpCallback;
						}
					}
				}

				// search and replace callback parameter in query string with empty string
				var callbackRegex = new RegExp('&?' + callbackName + '=[^&]*&?', 'gi');
				return this.url.replace(callbackRegex, '');
			},
			success: function( data, status ) {
				handleResponse( data, status );
			},
			error: function( _xhr, status ) {
				handleResponse( null, status );
			},
			beforeSend: function( _xhr, _ajaxSettings ) {
				xhr = _xhr;
				ajaxSettings = _ajaxSettings;
				var ret = defnSettings.beforeSend ?
					defnSettings.beforeSend.call( this, ampXHR, ajaxSettings ) : true;
				return ret && amplify.publish( "request.before.ajax",
					defnSettings, settings, ajaxSettings, ampXHR );
			}
		});

		// cache all JSONP requests
		if (ajaxSettings.cache && ajaxSettings.isJSONP()) {
			$.extend(ajaxSettings, {
				cache: true
			});
		}

		$.ajax( ajaxSettings );

		request.abort = function() {
			ampXHR.abort();
			abort.call( this );
		};
	};
};



amplify.subscribe( "request.ajax.preprocess", function( defnSettings, settings, ajaxSettings ) {
	var mappedKeys = [],
		data = ajaxSettings.data;

	if ( typeof data === "string" ) {
		return;
	}

	data = $.extend( true, {}, defnSettings.data, data );

	ajaxSettings.url = ajaxSettings.url.replace( rurlData, function ( m, key ) {
		if ( key in data ) {
			mappedKeys.push( key );
			return data[ key ];
		}
	});

	// We delete the keys later so duplicates are still replaced
	$.each( mappedKeys, function ( i, key ) {
		delete data[ key ];
	});

	ajaxSettings.data = data;
});



amplify.subscribe( "request.ajax.preprocess", function( defnSettings, settings, ajaxSettings ) {
	var data = ajaxSettings.data,
		dataMap = defnSettings.dataMap;

	if ( !dataMap || typeof data === "string" ) {
		return;
	}

	if ( $.isFunction( dataMap ) ) {
		ajaxSettings.data = dataMap( data );
	} else {
		$.each( defnSettings.dataMap, function( orig, replace ) {
			if ( orig in data ) {
				data[ replace ] = data[ orig ];
				delete data[ orig ];
			}
		});
		ajaxSettings.data = data;
	}
});



var cache = amplify.request.cache = {
	_key: function( resourceId, url, data ) {
		data = url + data;
		var length = data.length,
			i = 0;

		/*jshint bitwise:false*/
		function chunk() {
			return data.charCodeAt( i++ ) << 24 |
				data.charCodeAt( i++ ) << 16 |
				data.charCodeAt( i++ ) << 8 |
				data.charCodeAt( i++ ) << 0;
		}

		var checksum = chunk();
		while ( i < length ) {
			checksum ^= chunk();
		}
		/*jshint bitwise:true*/

		return "request-" + resourceId + "-" + checksum;
	},

	_default: (function() {
		var memoryStore = {};
		return function( resource, settings, ajaxSettings, ampXHR ) {
			// data is already converted to a string by the time we get here
			var cacheKey = cache._key( settings.resourceId,
					ajaxSettings.cacheURL(), ajaxSettings.data ),
				duration = resource.cache;

			if ( cacheKey in memoryStore ) {
				ampXHR.success( memoryStore[ cacheKey ] );
				return false;
			}
			var success = ampXHR.success;
			ampXHR.success = function( data ) {
				memoryStore[ cacheKey ] = data;
				if ( typeof duration === "number" ) {
					setTimeout(function() {
						delete memoryStore[ cacheKey ];
					}, duration );
				}
				success.apply( this, arguments );
			};
		};
	}())
};

if ( amplify.store ) {
	$.each( amplify.store.types, function( type ) {
		cache[ type ] = function( resource, settings, ajaxSettings, ampXHR ) {
			var cacheKey = cache._key( settings.resourceId,
					ajaxSettings.cacheURL(), ajaxSettings.data ),
				cached = amplify.store[ type ]( cacheKey );

			if ( cached ) {
				ajaxSettings.success( cached );
				return false;
			}
			var success = ampXHR.success;
			ampXHR.success = function( data ) {
				amplify.store[ type ]( cacheKey, data, { expires: resource.cache.expires } );
				success.apply( this, arguments );
			};
		};
	});
	cache.persist = cache[ amplify.store.type ];
}

amplify.subscribe( "request.before.ajax", function( resource ) {
	var cacheType = resource.cache;
	if ( cacheType ) {
		// normalize between objects and strings/booleans/numbers
		cacheType = cacheType.type || cacheType;
		return cache[ cacheType in cache ? cacheType : "_default" ]
			.apply( this, arguments );
	}
});



amplify.request.decoders = {
	// http://labs.omniti.com/labs/jsend
	jsend: function( data, status, ampXHR, success, error ) {
		if ( data.status === "success" ) {
			success( data.data );
		} else if ( data.status === "fail" ) {
			error( data.data, "fail" );
		} else if ( data.status === "error" ) {
			delete data.status;
			error( data, "error" );
		} else {
			error( null, "error" );
		}
	}
};

amplify.subscribe( "request.before.ajax", function( resource, settings, ajaxSettings, ampXHR ) {
	var _success = ampXHR.success,
		_error = ampXHR.error,
		decoder = $.isFunction( resource.decoder ) ?
			resource.decoder :
			resource.decoder in amplify.request.decoders ?
				amplify.request.decoders[ resource.decoder ] :
				amplify.request.decoders._default;

	if ( !decoder ) {
		return;
	}

	function success( data, status ) {
		_success( data, status );
	}
	function error( data, status ) {
		_error( data, status );
	}
	ampXHR.success = function( data, status ) {
		decoder( data, status, ampXHR, success, error );
	};
	ampXHR.error = function( data, status ) {
		decoder( data, status, ampXHR, success, error );
	};
});

}( amplify, jQuery ) );
