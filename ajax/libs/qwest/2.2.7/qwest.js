/*! qwest 2.2.7 (https://github.com/pyrsmk/qwest) */

module.exports = function() {

	var global = window || this,
		pinkyswear = require('pinkyswear'),
		jparam = require('jquery-param'),
		// Default response type for XDR in auto mode
		defaultXdrResponseType = 'json',
		// Default data type
		defaultDataType = 'post',
		// Variables for limit mechanism
		limit = null,
		requests = 0,
		request_stack = [],
		// Get XMLHttpRequest object
		getXHR = function(){
			return global.XMLHttpRequest?
					new global.XMLHttpRequest():
					new ActiveXObject('Microsoft.XMLHTTP');
		},
		// Guess XHR version
		xhr2 = (getXHR().responseType===''),

	// Core function
	qwest = function(method, url, data, options, before) {

		// Format
		method = method.toUpperCase();
		data = data || null;
		options = options || {};

		// Define variables
		var nativeResponseParsing = false,
			crossOrigin,
			xhr,
			xdr = false,
			timeoutInterval,
			aborted = false,
			attempts = 0,
			headers = {},
			mimeTypes = {
				text: '*/*',
				xml: 'text/xml',
				json: 'application/json',
				post: 'application/x-www-form-urlencoded'
			},
			accept = {
				text: '*/*',
				xml: 'application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1',
				json: 'application/json; q=1.0, text/*; q=0.8, */*; q=0.1'
			},
			vars = '',
			i, j,
			serialized,
			response,
			sending = false,
			delayed = false,
			timeout_start,

		// Create the promise
		promise = pinkyswear(function(pinky) {
			pinky['catch'] = function(f) {
				return pinky.then(null, f);
			};
			pinky.complete = function(f) {
				return pinky.then(f, f);
			};
			// Override
			if('pinkyswear' in options) {
				for(i in options.pinkyswear) {
					pinky[i] = options.pinkyswear[i];
				}
			}
			pinky.send = function() {
				// Prevent further send() calls
				if(sending) {
					return;
				}
				// Reached request limit, get out!
				if(requests == limit) {
					request_stack.push(pinky);
					return;
				}
				++requests;
				sending = true;
				// Start the chrono
				timeout_start = new Date().getTime();
				// Get XHR object
				xhr = getXHR();
				if(crossOrigin) {
					if(!('withCredentials' in xhr) && global.XDomainRequest) {
						xhr = new XDomainRequest(); // CORS with IE8/9
						xdr = true;
						if(method!='GET' && method!='POST') {
							method = 'POST';
						}
					}
				}
				// Open connection
				if(xdr) {
					xhr.open(method, url);
				}
				else {
					xhr.open(method, url, options.async, options.user, options.password);
					if(xhr2 && options.async) {
						xhr.withCredentials = options.withCredentials;
					}
				}
				// Set headers
				if(!xdr) {
					for(var i in headers) {
						if(headers[i]) {
							xhr.setRequestHeader(i, headers[i]);
						}
					}
				}
				// Verify if the response type is supported by the current browser
				if(xhr2 && options.responseType!='document' && options.responseType!='auto') { // Don't verify for 'document' since we're using an internal routine
					try {
						xhr.responseType = options.responseType;
						nativeResponseParsing = (xhr.responseType==options.responseType);
					}
					catch(e){}
				}
				// Plug response handler
				if(xhr2 || xdr) {
					xhr.onload = handleResponse;
					xhr.onerror = handleError;
				}
				else {
					xhr.onreadystatechange = function() {
						if(xhr.readyState == 4) {
							handleResponse();
						}
					};
				}
				// Override mime type to ensure the response is well parsed
				if(options.responseType!='auto' && 'overrideMimeType' in xhr) {
					xhr.overrideMimeType(mimeTypes[options.responseType]);
				}
				// Run 'before' callback
				if(before) {
					before(xhr);
				}
				// Send request
				if(xdr) {
					// http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
					xhr.onprogress = function(){};
					xhr.ontimeout = function(){};
					xhr.onerror = function(){};
					// https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
					setTimeout(function() {
						xhr.send(method != 'GET'? data : null);
					},0);
				}
				else {
					xhr.send(method != 'GET' ? data : null);
				}
			};
			return pinky;
		}),

		// Handle the response
		handleResponse = function() {
			// Prepare
			var i, responseType;
			--requests;
			sending = false;
			// Verify timeout state
			// --- https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
			if(new Date().getTime()-timeout_start >= options.timeout) {
				if(!options.attempts || ++attempts!=options.attempts) {
					promise.send();
				}
				else {
					promise(false, [xhr,response,new Error('Timeout ('+url+')')]);
				}
				return;
			}
			// Launch next stacked request
			if(request_stack.length) {
				request_stack.shift().send();
			}
			// Handle response
			try{
				// Process response
				if(nativeResponseParsing && 'response' in xhr && xhr.response!==null) {
					response = xhr.response;
				}
				else if(options.responseType == 'document') {
					var frame = document.createElement('iframe');
					frame.style.display = 'none';
					document.body.appendChild(frame);
					frame.contentDocument.open();
					frame.contentDocument.write(xhr.response);
					frame.contentDocument.close();
					response = frame.contentDocument;
					document.body.removeChild(frame);
				}
				else{
					// Guess response type
					responseType = options.responseType;
					if(responseType == 'auto') {
						if(xdr) {
							responseType = defaultXdrResponseType;
						}
						else {
							var ct = xhr.getResponseHeader('Content-Type') || '';
							if(ct.indexOf(mimeTypes.json)>-1) {
								responseType = 'json';
							}
							else if(ct.indexOf(mimeTypes.xml)>-1) {
								responseType = 'xml';
							}
							else {
								responseType = 'text';
							}
						}
					}
					// Handle response type
					switch(responseType) {
						case 'json':
							try {
								if('JSON' in global) {
									response = JSON.parse(xhr.responseText);
								}
								else {
									response = eval('('+xhr.responseText+')');
								}
							}
							catch(e) {
								throw "Error while parsing JSON body : "+e;
							}
							break;
						case 'xml':
							// Based on jQuery's parseXML() function
							try {
								// Standard
								if(global.DOMParser) {
									response = (new DOMParser()).parseFromString(xhr.responseText,'text/xml');
								}
								// IE<9
								else {
									response = new ActiveXObject('Microsoft.XMLDOM');
									response.async = 'false';
									response.loadXML(xhr.responseText);
								}
							}
							catch(e) {
								response = undefined;
							}
							if(!response || !response.documentElement || response.getElementsByTagName('parsererror').length) {
								throw 'Invalid XML';
							}
							break;
						default:
							response = xhr.responseText;
					}
				}
				// Late status code verification to allow passing data when, per example, a 409 is returned
				// --- https://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
				if('status' in xhr && !/^2|1223/.test(xhr.status)) {
					throw xhr.status+' ('+xhr.statusText+')';
				}
				// Fulfilled
				promise(true, [xhr,response]);
			}
			catch(e) {
				// Rejected
				promise(false, [xhr,response,e]);
			}
		},

		// Handle errors
		handleError = function(e) {
			--requests;
			promise(false, [xhr,null,new Error('Connection aborted')]);
		};

		// Normalize options
		options.async = 'async' in options?!!options.async:true;
		options.cache = 'cache' in options?!!options.cache:false;
		options.dataType = 'dataType' in options?options.dataType.toLowerCase():defaultDataType;
		options.responseType = 'responseType' in options?options.responseType.toLowerCase():'auto';
		options.user = options.user || '';
		options.password = options.password || '';
		options.withCredentials = !!options.withCredentials;
		options.timeout = 'timeout' in options?parseInt(options.timeout,10):30000;
		options.attempts = 'attempts' in options?parseInt(options.attempts,10):1;

		// Guess if we're dealing with a cross-origin request
		i = url.match(/\/\/(.+?)\//);
		crossOrigin = i && (i[1]?i[1]!=location.host:false);

		// Prepare data
		if('ArrayBuffer' in global && data instanceof ArrayBuffer) {
			options.dataType = 'arraybuffer';
		}
		else if('Blob' in global && data instanceof Blob) {
			options.dataType = 'blob';
		}
		else if('Document' in global && data instanceof Document) {
			options.dataType = 'document';
		}
		else if('FormData' in global && data instanceof FormData) {
			options.dataType = 'formdata';
		}
		switch(options.dataType) {
			case 'json':
				data = JSON.stringify(data);
				break;
			case 'post':
				data = jparam(data);
		}

		// Prepare headers
		if(options.headers) {
			var format = function(match,p1,p2) {
				return p1 + p2.toUpperCase();
			};
			for(i in options.headers) {
				headers[i.replace(/(^|-)([^-])/g,format)] = options.headers[i];
			}
		}
		if(!('Content-Type' in headers) && method!='GET') {
			if(options.dataType in mimeTypes) {
				if(mimeTypes[options.dataType]) {
					headers['Content-Type'] = mimeTypes[options.dataType];
				}
			}
		}
		if(!headers.Accept) {
			headers.Accept = (options.responseType in accept)?accept[options.responseType]:'*/*';
		}
		if(!crossOrigin && !('X-Requested-With' in headers)) { // (that header breaks in legacy browsers with CORS)
			headers['X-Requested-With'] = 'XMLHttpRequest';
		}
		if(!options.cache && !('Cache-Control' in headers)) {
			headers['Cache-Control'] = 'no-cache';
		}

		// Prepare URL
		if(method=='GET' && data) {
			vars += data;
		}
		if(vars) {
			url += (/\?/.test(url)?'&':'?')+vars;
		}

		// Start the request
		if(options.async) {
			promise.send();
		}

		// Return promise
		return promise;

	};

	// Return the external qwest object
	return {
		base: '',
		get: function(url, data, options, before) {
			return qwest('GET', this.base+url, data, options, before);
		},
		post: function(url, data, options, before) {
			return qwest('POST', this.base+url, data, options, before);
		},
		put: function(url, data, options, before) {
			return qwest('PUT', this.base+url, data, options, before);
		},
		'delete': function(url, data, options, before) {
			return qwest('DELETE', this.base+url, data, options, before);
		},
		map: function(type, url, data, options, before) {
			return qwest(type.toUpperCase(), this.base+url, data, options, before);
		},
		xhr2: xhr2,
		limit: function(by) {
			limit = by;
		},
		setDefaultXdrResponseType: function(type) {
			defaultXdrResponseType = type.toLowerCase();
		},
		setDefaultDataType: function(type) {
			defaultDataType = type.toLowerCase();
		}
	};

}();
