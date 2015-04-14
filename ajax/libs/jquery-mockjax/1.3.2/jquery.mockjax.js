/*!
 * MockJax - jQuery Plugin to Mock Ajax requests
 *
 * Version:  1.3.2
 * Released: 2010-10-07
 * Source:   http://github.com/appendto/jquery-mockjax
 * Docs:     http://enterprisejquery.com/2010/07/mock-your-ajax-requests-with-mockjax-for-rapid-development
 * Plugin:   mockjax
 * Author:   Jonathan Sharp (http://jdsharp.com)
 * License:  MIT,GPL
 * 
 * Copyright (c) 2010 appendTo LLC.
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 */
(function($) {
	var _ajax = $.ajax,
		mockHandlers = [];

	$.extend({
		ajax: function(origSettings) {
			var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings),
			    mock = false;
			// Iterate over our mock handlers (in registration order) until we find
			// one that is willing to intercept the request
			$.each(mockHandlers, function(k, v) {
				if ( !mockHandlers[k] ) {
					return;
				}
				var m = null;
				// If the mock was registered with a function, let the function decide if we 
				// want to mock this request
				if ( $.isFunction(mockHandlers[k]) ) {
					m = mockHandlers[k](s);
				} else {
					m = mockHandlers[k];
					// Inspect the URL of the request and check if the mock handler's url 
					// matches the url for this ajax request
					if ( $.isFunction(m.url.test) ) {
						// The user provided a regex for the url, test it
						if ( !m.url.test( s.url ) ) {
							m = null;
						}
					} else {
						// Look for a simple wildcard '*' or a direct URL match
						var star = m.url.indexOf('*');
						if ( ( m.url != '*' && m.url != s.url && star == -1 ) ||
							( star > -1 && m.url.substr(0, star) != s.url.substr(0, star) ) ) {
							 // The url we tested did not match the wildcard *
							 m = null;
						}
					}
					if ( m ) {
						// Inspect the data submitted in the request (either POST body or GET query string)
						if ( m.data && s.data ) {
							var identical = false;
							// Deep inspect the identity of the objects
							(function ident(mock, live) {
								// Test for situations where the data is a querystring (not an object)
								if (typeof live === 'string') {
									// Querystring may be a regex
									identical = $.isFunction( mock.test ) ? mock.test(live) : mock == live;
									return identical;
								}
								$.each(mock, function(k, v) {
									if ( live[k] === undefined ) {
										identical = false;
										return false;
									} else {
										identical = true;
										if ( typeof live[k] == 'object' ) {
											return ident(mock[k], live[k]);
										} else {
											if ( $.isFunction( mock[k].test ) ) {
												identical = mock[k].test(live[k]);
											} else {
												identical = ( mock[k] == live[k] );
											}
											return identical;
										}
									}
								});
							})(m.data, s.data);
							// They're not identical, do not mock this request
							if ( identical == false ) {
								m = null;
							}
						}
						// Inspect the request type
						if ( m && m.type && m.type != s.type ) {
							// The request type doesn't match (GET vs. POST)
							m = null;
						}
					}
				}
				if ( m ) {
					if ( typeof console !== 'undefined' && console.log ) {
						console.log('MOCK GET: ' + s.url);
					}
					mock = true;
					
					// Handle JSONP Parameter Callbacks, we need to replicate some of the jQuery core here
					// because there isn't an easy hook for the cross domain script tag of jsonp
					if ( s.dataType === "jsonp" ) {
						if ( s.type.toUpperCase() === "GET" ) {
							if ( !jsre.test( s.url ) ) {
								s.url += (rquery.test( s.url ) ? "&" : "?") + (s.jsonp || "callback") + "=?";
							}
						} else if ( !s.data || !jsre.test(s.data) ) {
							s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
						}
						s.dataType = "json";
					}
			
					// Build temporary JSONP function
					var jsre = /=\?(&|$)/;
					if ( s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url)) ) {
						jsonp = s.jsonpCallback || ("jsonp" + jsc++);
			
						// Replace the =? sequence both in the query string and the data
						if ( s.data ) {
							s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
						}
			
						s.url = s.url.replace(jsre, "=" + jsonp + "$1");
			
						// We need to make sure
						// that a JSONP style response is executed properly
						s.dataType = "script";
			
						// Handle JSONP-style loading
						window[ jsonp ] = window[ jsonp ] || function( tmp ) {
							data = tmp;
							success();
							complete();
							// Garbage collect
							window[ jsonp ] = undefined;
			
							try {
								delete window[ jsonp ];
							} catch(e) {}
			
							if ( head ) {
								head.removeChild( script );
							}
						};
					}
					
					var rurl = /^(\w+:)?\/\/([^\/?#]+)/,
						parts = rurl.exec( s.url ),
						remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);
					
					// Test if we are going to create a script tag (if so, intercept & mock)
					if ( s.dataType === "script" && s.type.toUpperCase() === "GET" && remote ) {
						// Synthesize the mock request for adding a script tag
						var callbackContext = origSettings && origSettings.context || s;
						
						function success() {
							// If a local callback was specified, fire it and pass it the data
							if ( s.success ) {
								s.success.call( callbackContext, ( m.response ? m.response.toString() : m.responseText || ''), status, {} );
							}
				
							// Fire the global callback
							if ( s.global ) {
								trigger( "ajaxSuccess", [{}, s] );
							}
						}
				
						function complete() {
							// Process result
							if ( s.complete ) {
								s.complete.call( callbackContext, {} , status );
							}
				
							// The request was completed
							if ( s.global ) {
								trigger( "ajaxComplete", [{}, s] );
							}
				
							// Handle the global AJAX counter
							if ( s.global && ! --jQuery.active ) {
								jQuery.event.trigger( "ajaxStop" );
							}
						}
						
						function trigger(type, args) {
							(s.context ? jQuery(s.context) : jQuery.event).trigger(type, args);
						}
						
						//if ( m.response && $.isFunction(m.response) ) {
						//	m.response();
						//} else {
							$.globalEval(m.responseText);
						//}
						success();
						complete();
						return false;
					}
					_ajax.call($, $.extend(true, {}, origSettings, {
						// Mock the XHR object
						xhr: function() {
							// Extend with our default mockjax settings
							m = $.extend({}, $.mockjaxSettings, m);
							// Return our mock xhr object
							return {
								status: m.status,
								readyState: 1,
								open: function() { },
								send: function() {
									var process = $.proxy(function() {
										// The request has returned
										this.status 		= m.status;
										this.readyState 	= 4;
										
										// We have an executable function, call it to give 
										// the mock a chance to update it's data
										if ( $.isFunction(m.response) ) {
											m.response();
										}
										// Copy over our mock to our xhr object before passing control back to 
										// jQuery's onreadystatechange callback
										if ( s.dataType == 'json' && ( typeof m.responseText == 'object' ) ) {
											this.responseText = JSON.stringify(m.responseText);
										} else if ( s.dataType == 'xml' ) {
											if ( $.xmlDOM && typeof m.responseXML == 'string' ) {
												// Parse the XML from a string into a DOM
												this.responseXML = $.xmlDOM( m.responseXML )[0];
											} else {
												this.responseXML = m.responseXML;
											}
										} else {
											this.responseText = m.responseText;
										}
										this.onreadystatechange( m.isTimeout ? 'timeout' : undefined );
									}, this);
									
									if ( m.proxy ) {
										// We're proxying this request and loading in an external file instead
										_ajax({
											global: false,
											url: m.proxy,
											type: m.type,
											data: m.data,
											dataType: s.dataType,
											complete: function(xhr, txt) {
												m.responseXML = xhr.responseXML;
												m.responseText = xhr.responseText;
												this.responseTimer = setTimeout(process, m.responseTime || 0);
											}
										});
									} else {
										// type == 'POST' || 'GET' || 'DELETE'
										if ( s.async === false ) {
											// TODO: Blocking delay
											process();
										} else {
											this.responseTimer = setTimeout(process, m.responseTime || 50);
										}
									}
								},
								abort: function() {
									clearTimeout(this.responseTimer);
								},
								setRequestHeader: function() { },
								getResponseHeader: function(header) {
									// 'Last-modified', 'Etag', 'content-type' are all checked by jQuery
									if ( m.headers && m.headers[header] ) {
										// Return arbitrary headers
										return m.headers[header];
									} else if ( header == 'Last-modified' ) {
										return m.lastModified || (new Date()).toString();
									} else if ( header == 'Etag' ) {
										return m.etag || '';
									} else if ( header == 'content-type' ) {
										return m.contentType || 'text/plain';
									}
								}
							};
						}
					}));
					return false;
				}
			});
			// We don't have a mock request, trigger a normal request
			if ( !mock ) {
				return _ajax.apply($, arguments);
			}
		}
	});

	$.mockjaxSettings = {
		//url:        null,
		//type:       'GET',
		status:       200,
		responseTime: 500,
		isTimeout:    false,
		contentType:  'text/plain',
		response:     '', 
		responseText: '',
		responseXML:  '',
		proxy:        '',
		
		lastModified:	null,
		etag: 			'',
		headers: {
			etag: 'IJF@H#@923uf8023hFO@I#H#',
			'content-type' : 'text/plain'
		}
	};

	$.mockjax = function(settings) {
		var i = mockHandlers.length;
		mockHandlers[i] = settings;
		return i;
	};
	$.mockjaxClear = function(i) {
		if ( arguments.length == 1 ) {
			mockHandlers[i] = null;
		} else {
			mockHandlers = [];
		}
	};
})(jQuery);
