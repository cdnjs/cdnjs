/*
 * Portal v1.0rc3
 * http://github.com/flowersinthesand/portal
 * 
 * Copyright 2011-2013, Donghwan Kim 
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
(function() {
	
	"use strict";
	
	var // A global identifier
		guid,
		// Is the unload event being processed?
		unloading,
		// Portal
		portal = {},
		// Socket instances
		sockets = {},
		// Callback names for JSONP
		jsonpCallbacks = [],
		// Core prototypes
		toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnProperty,
		slice = Array.prototype.slice;
	
	// Convenience utilities
	// Most utility functions are borrowed from jQuery
	portal.support = {
		now: function() {
			return new Date().getTime();
		},
		isArray: function(array) {
			return toString.call(array) === "[object Array]";
		},
		isBinary: function(data) {
			var string = toString.call(data);
			return string === "[object Blob]" || string === "[object ArrayBuffer]";
		}, 
		isFunction: function(fn) {
			return toString.call(fn) === "[object Function]";
		},
		getAbsoluteURL: function(url) {
			var div = document.createElement("div");
			
			// Uses an innerHTML property to obtain an absolute URL
			div.innerHTML = '<a href="' + url + '"/>';
			
			// encodeURI and decodeURI are needed to normalize URL between IE and non-IE, 
			// since IE doesn't encode the href property value and return it - http://jsfiddle.net/Yq9M8/1/
			return encodeURI(decodeURI(div.firstChild.href));
		},
		iterate: function(fn) {
			var timeoutId;
			
			// Though the interval is 1ms for real-time application, there is a delay between setTimeout calls
			// For detail, see https://developer.mozilla.org/en/window.setTimeout#Minimum_delay_and_timeout_nesting
			(function loop() {
				timeoutId = setTimeout(function() {
					if (fn() === false) {
						return;
					}
					
					loop();
				}, 1);
			})();
			
			return function() {
				clearTimeout(timeoutId);
			};
		},
		each: function(array, callback) {
			var i;
			
			for (i = 0; i < array.length; i++) {
				callback(i, array[i]);
			}
		},
		extend: function(target) {
			var i, options, name;
			
			for (i = 1; i < arguments.length; i++) {
				if ((options = arguments[i]) != null) {
					for (name in options) {
						target[name] = options[name];
					}
				}
			}
			
			return target;
		},
		on: function(elem, type, fn) {
			if (elem.addEventListener) {
				elem.addEventListener(type, fn, false);
			} else if (elem.attachEvent) {
				elem.attachEvent("on" + type, fn);
			}
		},
		off: function(elem, type, fn) {
			if (elem.removeEventListener) {
				elem.removeEventListener(type, fn, false);
			} else if (elem.detachEvent) {
				elem.detachEvent("on" + type, fn);
			}
		},
		param: function(params) {
			var prefix,
				s = [];
			
			function add(key, value) {
				value = portal.support.isFunction(value) ? value() : (value == null ? "" : value);
				s.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
			}
			
			function buildParams(prefix, obj) {
				var name;
				
				if (portal.support.isArray(obj)) {
					portal.support.each(obj, function(i, v) {
						if (/\[\]$/.test(prefix)) {
							add(prefix, v);
						} else {
							buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v);
						}
					});
				} else if (toString.call(obj) === "[object Object]") {
					for (name in obj) {
						buildParams(prefix + "[" + name + "]", obj[name]);
					}
				} else {
					add(prefix, obj);
				}
			}
			
			for (prefix in params) {
				buildParams(prefix, params[prefix]);
			}
			
			return s.join("&").replace(/%20/g, "+");
		},
		xhr: function() {
			try {
				return new window.XMLHttpRequest();
			} catch(e1) {
				try {
					return new window.ActiveXObject("Microsoft.XMLHTTP");
				} catch(e2) {}
			}
		},
		parseJSON: function(data) {
			return !data ? 
				null : 
				window.JSON && window.JSON.parse ? 
					window.JSON.parse(data) : 
					new Function("return " + data)();
		},
		// http://github.com/flowersinthesand/stringifyJSON
		stringifyJSON: function(value) {
			var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, 
				meta = {
					'\b' : '\\b',
					'\t' : '\\t',
					'\n' : '\\n',
					'\f' : '\\f',
					'\r' : '\\r',
					'"' : '\\"',
					'\\' : '\\\\'
				};
			
			function quote(string) {
				return '"' + string.replace(escapable, function(a) {
					var c = meta[a];
					return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
				}) + '"';
			}
			
			function f(n) {
				return n < 10 ? "0" + n : n;
			}
			
			return window.JSON && window.JSON.stringify ? 
				window.JSON.stringify(value) : 
				(function str(key, holder) {
					var i, v, len, partial, value = holder[key], type = typeof value;
							
					if (value && typeof value === "object" && typeof value.toJSON === "function") {
						value = value.toJSON(key);
						type = typeof value;
					}
					
					switch (type) {
					case "string":
						return quote(value);
					case "number":
						return isFinite(value) ? String(value) : "null";
					case "boolean":
						return String(value);
					case "object":
						if (!value) {
							return "null";
						}
						
						switch (toString.call(value)) {
						case "[object Date]":
							return isFinite(value.valueOf()) ? 
								'"' + value.getUTCFullYear() + "-" + f(value.getUTCMonth() + 1) + "-" + f(value.getUTCDate()) + 
								"T" + f(value.getUTCHours()) + ":" + f(value.getUTCMinutes()) + ":" + f(value.getUTCSeconds()) + "Z" + '"' : 
								"null";
						case "[object Array]":
							len = value.length;
							partial = [];
							for (i = 0; i < len; i++) {
								partial.push(str(i, value) || "null");
							}
							
							return "[" + partial.join(",") + "]";
						default:
							partial = [];
							for (i in value) {
								if (hasOwn.call(value, i)) {
									v = str(i, value);
									if (v) {
										partial.push(quote(i) + ":" + v);
									}
								}
							}
							
							return "{" + partial.join(",") + "}";
						}
					}
				})("", {"": value});
		},
		browser: {},
		storage: !!(window.localStorage && window.StorageEvent)
	};
	portal.support.corsable = "withCredentials" in portal.support.xhr();
	guid = portal.support.now();
	
	// Browser sniffing
	(function() {
		var ua = navigator.userAgent.toLowerCase(), 
			match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
				/(webkit)[ \/]([\w.]+)/.exec(ua) ||
				/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
				/(msie) ([\w.]+)/.exec(ua) ||
				ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
				[];
		
		portal.support.browser[match[1] || ""] = true;
		portal.support.browser.version = match[2] || "0";
		
		// The storage event of Internet Explorer and Firefox 3 works strangely
		if (portal.support.browser.msie || (portal.support.browser.mozilla && portal.support.browser.version.split(".")[0] === "1")) {
			portal.support.storage = false;
		}
	})();
	
	// Finds the socket object which is mapped to the given url
	portal.find = function(url) {
		var i;
		
		// Returns the first socket in the document
		if (!arguments.length) {
			for (i in sockets) {
				if (sockets[i]) {
					return sockets[i];
				}
			}
			return null;
		}
		
		// The url is a identifier of this socket within the document
		return sockets[portal.support.getAbsoluteURL(url)] || null;
	};
	// Creates a new socket and connects to the given url 
	portal.open = function(url, options) {
		// Makes url absolute to normalize URL
		url = portal.support.getAbsoluteURL(url);
		sockets[url] = socket(url, options);
		
		return portal.find(url);
	};
	// Default options
	portal.defaults = {
		// Socket options
		transports: ["ws", "sse", "stream", "longpoll"],
		timeout: false,
		heartbeat: false,
		_heartbeat: 5000,
		lastEventId: 0,
		sharing: false,
		prepare: function(connect) {
			connect();
		},
		reconnect: function(lastDelay) {
			return 2 * (lastDelay || 250);
		},
		idGenerator: function() {
			// Generates a random UUID 
			// Logic borrowed from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c === "x" ? r : (r & 0x3 | 0x8);
				
				return v.toString(16);
			});
		},
		urlBuilder: function(url, params) {
			return url + (/\?/.test(url) ? "&" : "?") + portal.support.param(params);
		},
		inbound: portal.support.parseJSON,
		outbound: portal.support.stringifyJSON,
		
		// Transport options
		credentials: false,
		longpollTest: true,
		xdrURL: function(url) {
			// Maintaining session by rewriting URL
			// http://stackoverflow.com/questions/6453779/maintaining-session-by-rewriting-url
			var match = /(?:^|; )(JSESSIONID|PHPSESSID)=([^;]*)/.exec(document.cookie);
			
			switch (match && match[1]) {
			case "JSESSIONID":
				return url.replace(/;jsessionid=[^\?]*|(\?)|$/, ";jsessionid=" + match[2] + "$1");
			case "PHPSESSID":
				return url.replace(/\?PHPSESSID=[^&]*&?|\?|$/, "?PHPSESSID=" + match[2] + "&").replace(/&$/, "");
			default:
				return false;
			}
		},
		streamParser: function(chunk) {
			// Chunks are formatted according to the event stream format 
			// http://www.w3.org/TR/eventsource/#event-stream-interpretation
			var reol = /\r\n|[\r\n]/g, lines = [], data = this.data("data"), array = [], i = 0, 
				match, line;
			
			// Strips off the left padding of the chunk
			// the first chunk of some streaming transports and every chunk for Android browser 2 and 3 has padding
			chunk = chunk.replace(/^\s+/g, "");
			
			// String.prototype.split is not reliable cross-browser
			while (match = reol.exec(chunk)) {
				lines.push(chunk.substring(i, match.index));
				i = match.index + match[0].length;
			}
			lines.push(chunk.length === i ? "" : chunk.substring(i));
			
			if (!data) {
				data = [];
				this.data("data", data);
			}
			
			// Processes the data field only
			for (i = 0; i < lines.length; i++) {
				line = lines[i];
				if (!line) {
					// Finish
					array.push(data.join("\n"));
					data = [];
					this.data("data", data);
				} else if (/^data:\s/.test(line)) {
					// A single data field
					data.push(line.substring("data: ".length));
				} else {
					// A fragment of a data field
					data[data.length - 1] += line;
				}
			}
			
			return array;
		}
		// Undocumented
		// method: null
		// initIframe: null
	};
	
	// Callback function
	function callbacks(deferred) {
		var list = [],
			locked,
			memory,
			firing,
			firingStart,
			firingLength,
			firingIndex,
			fire = function(context, args) {
				args = args || [];
				memory = !deferred || [context, args];
				firing = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				for (; firingIndex < firingLength; firingIndex++) {
					list[firingIndex].apply(context, args);
				}
				firing = false;
			},
			self = {
				add: function(fn) {
					var length = list.length;
					
					list.push(fn);
					if (firing) {
						firingLength = list.length;
					} else if (!locked && memory && memory !== true) {
						firingStart = length;
						fire(memory[0], memory[1]);
					}
				},
				remove: function(fn) {
					var i;
					
					for (i = 0; i < list.length; i++) {
						if (fn === list[i] || (fn.guid && fn.guid === list[i].guid)) {
							if (firing) {
								if (i <= firingLength) {
									firingLength--;
									if (i <= firingIndex) {
										firingIndex--;
									}
								}
							}
							list.splice(i--, 1);
						}
					}
				},
				fire: function(context, args) {
					if (!locked && !firing && !(deferred && memory)) {
						fire(context, args);
					}
				},
				lock: function() {
					locked = true;
				},
				locked: function() {
					return !!locked;
				},
				unlock: function() {
					locked = memory = firing = firingStart = firingLength = firingIndex = undefined;
				}
			};
		
		return self;
	}
	
	// Socket function
	function socket(url, options) {
		var	// Final options
			opts,
			// Transport
			transport,
			// The state of the connection
			state,
			// Event helpers
			events = {},
			eventId = 0, 
			// Reply callbacks
			replyCallbacks = {},
			// Buffer
			buffer = [],
			// Reconnection
			reconnectTimer,
			reconnectDelay,
			reconnectTry,
			// Map of the connection-scoped values
			connection = {},
			parts = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/.exec(url.toLowerCase()),
			// Socket object
			self = {
				// Finds the value of an option
				option: function(key, /* undocumented */ value) {
					if (value === undefined) {
						return opts[key];
					}
					
					opts[key] = value;
					
					return this;
				},
				// Gets or sets a connection-scoped value
				data: function(key, value) {
					if (value === undefined) {
						return connection[key];
					}
					
					connection[key] = value;
					
					return this;
				},
				// Returns the state
				state: function() {
					return state;
				},
				// Adds event handler
				on: function(type, fn) {
					var event;
					
					// Handles a map of type and handler
					if (typeof type === "object") {
						for (event in type) {
							self.on(event, type[event]);
						}
						return this;
					}
					
					// For custom event
					event = events[type];
					if (!event) {
						if (events.message.locked()) {
							return this;
						}
						
						event = events[type] = callbacks();
						event.order = events.message.order;
					}
					
					event.add(fn);
					
					return this;
				},
				// Removes event handler
				off: function(type, fn) {
					var event = events[type];
					
					if (event) {
						event.remove(fn);
					}
					
					return this;
				},
				// Adds one time event handler
				one: function(type, fn) {
					function proxy() {
						self.off(type, proxy);
						fn.apply(self, arguments);
					}
					
					fn.guid = fn.guid || guid++;
					proxy.guid = fn.guid;
					
					return self.on(type, proxy);
				},
				// Fires event handlers
				fire: function(type) {
					var event = events[type];
					
					if (event) {
						event.fire(self, slice.call(arguments, 1));
					}
					
					return this;
				},
				// Establishes a connection
				open: function() {
					var type,
						latch,
						connect = function() {
							var candidates, type;
							
							if (!latch) {
								latch = true;
								candidates = connection.candidates = slice.call(opts.transports);
								while (!transport && candidates.length) {
									type = candidates.shift();
									connection.transport = type;
									connection.url = self.buildURL();
									transport = portal.transports[type](self, opts);
								}
								
								// Increases the number of reconnection attempts
								if (reconnectTry) {
									reconnectTry++;
								}
								
								// Fires the connecting event and connects
								if (transport) {
									self.fire("connecting");
									transport.open();
								} else {
									self.fire("close", "notransport");
								}
							}
						},
						cancel = function() {
							if (!latch) {
								latch = true;
								self.fire("close", "canceled");
							}
						};
					
					// Cancels the scheduled connection
					if (reconnectTimer) {
						clearTimeout(reconnectTimer);
					}
					
					// Resets the connection scope and event helpers
					connection = {};
					for (type in events) {
						events[type].unlock();
					}
					
					// Chooses transport
					transport = undefined;
					
					// From null or waiting state
					state = "preparing";
					
					// Check if possible to make use of a shared socket
					if (opts.sharing) {
						connection.transport = "session";
						transport = portal.transports.session(self, opts);
					}
					
					// Executes the prepare handler if a physical connection is needed
					if (transport) {
						connect();
					} else {
						opts.prepare.call(self, connect, cancel, opts);
					}
					
					return this;
				},
				// Sends an event to the server via the connection
				send: function(type, data, doneCallback, failCallback) {
					var event;
					
					// Defers sending an event until the state become opened
					if (state !== "opened") {
						buffer.push(arguments);
						return this;
					}
					
					// Outbound event
					event = {
						id: ++eventId,
						socket: opts.id,
						type: type,
						data: data,
						reply: !!(doneCallback || failCallback)
					};
					
					if (event.reply) {
						// Shared socket needs to know the callback event name 
						// because it fires the callback event directly instead of using reply event 
						if (connection.transport === "session") {
							event.doneCallback = doneCallback;
							event.failCallback = failCallback;
						} else {
							replyCallbacks[eventId] = {done: doneCallback, fail: failCallback};
						}
					}
					
					// Delegates to the transport
					transport.send(portal.support.isBinary(data) ? data : opts.outbound.call(self, event));
					
					return this;
				},
				// Disconnects the connection
				close: function() {
					// Prevents reconnection
					opts.reconnect = false;
					if (reconnectTimer) {
						clearTimeout(reconnectTimer);
					}
					
					// Fires the close event immediately for transport which doesn't give feedback on disconnection
					if (unloading || !transport || !transport.feedback) {
						self.fire("close", unloading ? "error" : "aborted");
					}
					
					// Delegates to the transport
					if (transport) {
						transport.close();
					}
					
					return this;
				},
				// Broadcasts event to session sockets
				broadcast: function(type, data) {
					// TODO rename
					var broadcastable = connection.broadcastable;
					if (broadcastable) {
						broadcastable.broadcast({type: "fire", data: {type: type, data: data}});
					}
					
					return this;
				},
				// For internal use only
				// fires events from the server
				_fire: function(data, isChunk) {
					var array;
					
					if (isChunk) {
						data = opts.streamParser.call(self, data);
						while (data.length) {
							self._fire(data.shift());
						}
						return this;
					}
					
					if (portal.support.isBinary(data)) {
						array = [{type: "message", data: data}];
					} else {
						array = opts.inbound.call(self, data);
						array = array == null ? [] : !portal.support.isArray(array) ? [array] : array;
					}
					
					portal.support.each(array, function(i, event) {
						var latch, args = [event.type, event.data];
						
						opts.lastEventId = event.id;
						if (event.reply) {
							args.push(function(result) {
								if (!latch) {
									latch = true;
									self.send("reply", {id: event.id, data: result});
								}
							});
						}
						
						self.fire.apply(self, args).fire("_message", args);
					});
					
					return this;
				},
				// For internal use only
				// builds an effective URL
				buildURL: function(params) {
					return opts.urlBuilder.call(self, url, portal.support.extend({
						id: opts.id, 
						transport: connection.transport, 
						heartbeat: opts.heartbeat, 
						lastEventId: opts.lastEventId,
						_: guid++
					}, opts.params, params));
				}
			};
		
		// Create the final options
		opts = portal.support.extend({}, portal.defaults, options);
		if (options) {
			// Array should not be deep extended
			if (options.transports) {
				opts.transports = slice.call(options.transports);
			}
		}
		// Saves original URL
		opts.url = url;
		// Generates socket id,
		opts.id = opts.idGenerator.call(self);
		opts.crossDomain = !!(parts && 
			// protocol and hostname
			(parts[1] != location.protocol || parts[2] != location.hostname ||
			// port
			(parts[3] || (parts[1] === "http:" ? 80 : 443)) != (location.port || (location.protocol === "http:" ? 80 : 443))));
		
		portal.support.each(["connecting", "open", "message", "close", "waiting"], function(i, type) {
			// Creates event helper
			events[type] = callbacks(type !== "message");
			events[type].order = i;
			
			// Shortcuts for on method
			var old = self[type],
				on = function(fn) {
					return self.on(type, fn);
				};
			
			self[type] = !old ? on : function(fn) {
				return (portal.support.isFunction(fn) ? on : old).apply(this, arguments);
			};
		});
		
		// Initializes
		self.on({
			connecting: function() {
				// From preparing state
				state = "connecting";
				
				var timeoutTimer;
				
				// Sets timeout timer
				function setTimeoutTimer() {
					timeoutTimer = setTimeout(function() {
						transport.close();
						self.fire("close", "timeout");
					}, opts.timeout);
				}
				
				// Clears timeout timer
				function clearTimeoutTimer() {
					clearTimeout(timeoutTimer);
				}
				
				// Makes the socket sharable
				function share() {
					var traceTimer,
						server, 
						name = "socket-" + url,
						servers = {
							// Powered by the storage event and the localStorage
							// http://www.w3.org/TR/webstorage/#event-storage
							storage: function() {
								if (!portal.support.storage) {
									return;
								}
								
								var storage = window.localStorage;
								
								return {
									init: function() {
										function onstorage(event) {
											// When a deletion, newValue initialized to null
											if (event.key === name && event.newValue) {
												listener(event.newValue);
											}
										}
										
										// Handles the storage event 
										portal.support.on(window, "storage", onstorage);
										self.one("close", function() {
											portal.support.off(window, "storage", onstorage);
											// Defers again to clean the storage
											self.one("close", function() {
												storage.removeItem(name);
												storage.removeItem(name + "-opened");
												storage.removeItem(name + "-children");
											});
										});
									},
									broadcast: function(obj) {
										var string = portal.support.stringifyJSON(obj);
										storage.setItem(name, string);
										setTimeout(function() {
											listener(string);
										}, 50);
									},
									get: function(key) {
										return portal.support.parseJSON(storage.getItem(name + "-" + key));
									},
									set: function(key, value) {
										storage.setItem(name + "-" + key, portal.support.stringifyJSON(value));
									}
								};
							},
							// Powered by the window.open method
							// https://developer.mozilla.org/en/DOM/window.open
							windowref: function() {
								// Internet Explorer raises an invalid argument error
								// when calling the window.open method with the name containing non-word characters
								var neim = name.replace(/\W/g, ""),
									container = document.getElementById(neim),
									win;
								
								if (!container) {
									container = document.createElement("div");
									container.id = neim;
									container.style.display = "none";
									container.innerHTML = '<iframe name="' + neim + '" />';
									document.body.appendChild(container);
								}
								
								win = container.firstChild.contentWindow;
								
								return {
									init: function() {
										// Callbacks from different windows
										win.callbacks = [listener];
										// In IE 8 and less, only string argument can be safely passed to the function in other window
										win.fire = function(string) {
											var i;
											
											for (i = 0; i < win.callbacks.length; i++) {
												win.callbacks[i](string);
											}
										};
									},
									broadcast: function(obj) {
										if (!win.closed && win.fire) {
											win.fire(portal.support.stringifyJSON(obj));
										}
									},
									get: function(key) {
										return !win.closed ? win[key] : null;
									},
									set: function(key, value) {
										if (!win.closed) {
											win[key] = value;
										}
									}
								};
							}
						};
					
					// Receives send and close command from the children
					function listener(string) {
						var command = portal.support.parseJSON(string), data = command.data;
						
						if (!command.target) {
							if (command.type === "fire") {
								self.fire(data.type, data.data);
							}
						} else if (command.target === "p") {
							switch (command.type) {
							case "send":
								self.send(data.type, data.data, data.doneCallback, data.failCallback);
								break;
							case "close":
								self.close();
								break;
							}
						}
					}
					
					function propagateMessageEvent(args) {
						server.broadcast({target: "c", type: "message", data: args});
					}
					
					function leaveTrace() {
						document.cookie = encodeURIComponent(name) + "=" +
							// Opera 12.00's parseFloat and JSON.stringify causes a strange bug with a number larger than 10 digit
							// JSON.stringify(parseFloat(10000000000) + 1).length === 11;
							// JSON.stringify(parseFloat(10000000000 + 1)).length === 10;
							encodeURIComponent(portal.support.stringifyJSON({ts: portal.support.now() + 1, heir: (server.get("children") || [])[0]}));
					}
					
					// Chooses a server
					server = servers.storage() || servers.windowref();
					server.init();
					
					// For broadcast method
					connection.broadcastable = server;
					
					// List of children sockets
					server.set("children", []);
					// Flag indicating the parent socket is opened
					server.set("opened", false);
					
					// Leaves traces
					leaveTrace();
					traceTimer = setInterval(leaveTrace, 1000);
					
					self.on("_message", propagateMessageEvent)
					.one("open", function() {
						server.set("opened", true);
						server.broadcast({target: "c", type: "open"});
					})
					.one("close", function(reason) {
						// Clears trace timer 
						clearInterval(traceTimer);
						// Removes the trace
						document.cookie = encodeURIComponent(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
						// The heir is the parent unless unloading
						server.broadcast({target: "c", type: "close", data: {reason: reason, heir: !unloading ? opts.id : (server.get("children") || [])[0]}});
						self.off("_message", propagateMessageEvent);
					});
				}
				
				if (opts.timeout > 0) {
					setTimeoutTimer();				
					self.one("open", clearTimeoutTimer).one("close", clearTimeoutTimer);
				}
				
				// Share the socket if possible
				if (opts.sharing && connection.transport !== "session") {
					share();
				}
			},
			open: function() {
				// From connecting state
				state = "opened";
				
				var heartbeatTimer;
				
				// Sets heartbeat timer
				function setHeartbeatTimer() {
					heartbeatTimer = setTimeout(function() {
						self.send("heartbeat").one("heartbeat", function() {
							clearHeartbeatTimer();
							setHeartbeatTimer();
						});
						
						heartbeatTimer = setTimeout(function() {
							transport.close();
							self.fire("close", "error");
						}, opts._heartbeat);
					}, opts.heartbeat - opts._heartbeat);
				}
				
				// Clears heartbeat timer
				function clearHeartbeatTimer() {
					clearTimeout(heartbeatTimer);
				}
							
				if (opts.heartbeat > opts._heartbeat) {
					setHeartbeatTimer();
					self.one("close", clearHeartbeatTimer);
				}
				
				// Locks the connecting event
				events.connecting.lock();
				
				// Initializes variables related with reconnection
				reconnectTimer = reconnectDelay = reconnectTry = null;
				
				// Flushes buffer
				while (buffer.length) {
					self.send.apply(self, buffer.shift());
				}
			},
			close: function() {
				// From preparing, connecting, or opened state 
				state = "closed";
				
				var type, event, order = events.close.order;
				
				// Locks event whose order is lower than close event
				for (type in events) {
					event = events[type];
					if (event.order < order) {
						event.lock();
					}
				}
				
				// Schedules reconnection
				if (opts.reconnect) {
					self.one("close", function() {
						reconnectTry = reconnectTry || 1;
						reconnectDelay = opts.reconnect.call(self, reconnectDelay, reconnectTry);
						
						if (reconnectDelay !== false) {
							reconnectTimer = setTimeout(function() {
								self.open();
							}, reconnectDelay);
							self.fire("waiting", reconnectDelay, reconnectTry);
						}
					});
				}
			},
			waiting: function() {
				// From closed state
				state = "waiting";
			},
			reply: function(reply) {
				var fn,
					id = reply.id, 
					data = reply.data, 
					exception = reply.exception,
					callback = replyCallbacks[id];
				
				if (callback) {
					fn = exception ? callback.fail : callback.done;
					if (fn) {
						if (portal.support.isFunction(fn)) {
							fn.call(self, data);
						} else {
							self.fire(fn, data).fire("_message", [fn, data]);
						} 
						
						delete replyCallbacks[id];
					}
				}
			}
		});
		
		return self.open();
	}
	
	// Transports
	portal.transports = {
		// Session socket
		session: function(socket, options) {
			var trace,
				orphan,
				connector,
				name = "socket-" + options.url,
				connectors = {
					storage: function() {
						if (!portal.support.storage) {
							return;
						}
						
						var storage = window.localStorage;
						
						function get(key) {
							return portal.support.parseJSON(storage.getItem(name + "-" + key));
						}
						
						function set(key, value) {
							storage.setItem(name + "-" + key, portal.support.stringifyJSON(value));
						}
						
						return {
							init: function() {
								function onstorage(event) {
									if (event.key === name && event.newValue) {
										listener(event.newValue);
									}
								}
								
								set("children", get("children").concat([options.id]));
								portal.support.on(window, "storage", onstorage);
								
								socket.one("close", function() {
									var children = get("children");
									
									portal.support.off(window, "storage", onstorage);
									if (children) {
										if (removeFromArray(children, options.id)) {
											set("children", children);
										}
									}
								});
								
								return get("opened");
							},
							broadcast: function(obj) {
								var string = portal.support.stringifyJSON(obj);
								
								storage.setItem(name, string);
								setTimeout(function() {
									listener(string);
								}, 50);
							}
						};
					},
					windowref: function() {
						var win = window.open("", name.replace(/\W/g, ""));
						
						if (!win || win.closed || !win.callbacks) {
							return;
						}
						
						return {
							init: function() {
								win.callbacks.push(listener);
								win.children.push(options.id);
								
								socket.one("close", function() {
									// Removes traces only if the parent is alive
									if (!orphan) {
										removeFromArray(win.callbacks, listener);
										removeFromArray(win.children, options.id);
									}
								});
								
								return win.opened;
							},
							broadcast: function(obj) {
								if (!win.closed && win.fire) {
									win.fire(portal.support.stringifyJSON(obj));
								}
							}
						};
					}
				};
			
			function removeFromArray(array, val) {
				var i, 
					length = array.length;
				
				for (i = 0; i < length; i++) {
					if (array[i] === val) {
						array.splice(i, 1);
					}
				}
				
				return length !== array.length;
			}
			
			// Receives open, close and message command from the parent 
			function listener(string) {
				var command = portal.support.parseJSON(string), data = command.data;
				
				if (!command.target) {
					if (command.type === "fire") {
						socket.fire(data.type, data.data);
					}
				} else if (command.target === "c") {
					switch (command.type) {
					case "open":
						socket.fire("open");
						break;
					case "close":
						if (!orphan) {
							orphan = true;
							if (data.reason === "aborted") {
								socket.close();
							} else {
								// Gives the heir some time to reconnect 
								if (data.heir === options.id) {
									socket.fire("close", data.reason);
								} else {
									setTimeout(function() {
										socket.fire("close", data.reason);
									}, 100);
								}
							}
						}
						break;
					case "message":
						// When using the session transport, message events could be sent before the open event
						if (socket.state() === "connecting") {
							socket.one("open", function() {
								socket.fire.apply(socket, data);
							});
						} else {
							socket.fire.apply(socket, data);
						}
						break;
					}
				}
			}
			
			function findTrace() {
				var matcher = new RegExp("(?:^|; )(" + encodeURIComponent(name) + ")=([^;]*)").exec(document.cookie);
				if (matcher) {
					return portal.support.parseJSON(decodeURIComponent(matcher[2]));
				}
			}
			
			// Finds and validates the parent socket's trace from the cookie
			trace = findTrace();
			if (!trace || portal.support.now() - trace.ts > 1000) {
				return;
			}
			
			// Chooses a connector
			connector = connectors.storage() || connectors.windowref();
			if (!connector) {
				return;
			}
			
			// For broadcast method
			socket.data("broadcastable", connector);
			
			return {
				open: function() {
					var traceTimer,
						parentOpened,
						timeout = options.timeout, 
						heartbeat = options.heartbeat, 
						outbound = options.outbound;
					
					// Prevents side effects
					options.timeout = options.heartbeat = false;
					options.outbound = function(arg) {
						return arg;
					};
					
					// Checks the shared one is alive
					traceTimer = setInterval(function() {
						var oldTrace = trace;
						
						trace = findTrace();
						if (!trace || oldTrace.ts === trace.ts) {
							// Simulates a close signal
							listener(portal.support.stringifyJSON({target: "c", type: "close", data: {reason: "error", heir: oldTrace.heir}}));
						}
					}, 1000);
					
					// Restores options
					socket.one("close", function() {
						clearInterval(traceTimer);
						options.timeout = timeout;
						options.heartbeat = heartbeat;
						options.outbound = outbound;
					});
					
					parentOpened = connector.init();
					if (parentOpened) {
						// Gives the user the opportunity to bind connecting event handlers
						setTimeout(function() {
							socket.fire("open");
						}, 50);
					}
				},
				send: function(event) {
					connector.broadcast({target: "p", type: "send", data: event});
				},
				close: function() {
					// Do not signal the parent if this method is executed by the unload event handler
					if (!unloading) {
						connector.broadcast({target: "p", type: "close"});
					}
				}
			};
		},
		// WebSocket
		ws: function(socket) {
			var ws, 
				aborted,
				WebSocket = window.WebSocket || window.MozWebSocket;
			
			if (!WebSocket) {
				return;
			}
			
			return {
				feedback: true,
				open: function() {
					// Makes an absolute url whose scheme is ws or wss
					var url = portal.support.getAbsoluteURL(socket.data("url")).replace(/^http/, "ws");
					
					socket.data("url", url);
					
					ws = new WebSocket(url);
					ws.onopen = function(event) {
						socket.data("event", event).fire("open");
					};
					ws.onmessage = function(event) {
						socket.data("event", event)._fire(event.data);
					};
					ws.onerror = function(event) {
						socket.data("event", event).fire("close", aborted ? "aborted" : "error");
					};
					ws.onclose = function(event) {
						socket.data("event", event).fire("close", aborted ? "aborted" : event.wasClean ? "done" : "error");
					};
				},
				send: function(data) {
					ws.send(data);
				},
				close: function() {
					aborted = true;
					ws.close();
				}
			};
		},
		// HTTP Support
		httpbase: function(socket, options) {
			var send,
				sending,
				queue = [];
			
			function post() {
				if (queue.length) {
					send(options.url, queue.shift());
				} else {
					sending = false;
				}
			}
			
			// The Content-Type is not application/x-www-form-urlencoded but text/plain on account of XDomainRequest
			// See the fourth at http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
			send = !options.crossDomain || portal.support.corsable ? 
			function(url, data) {
				var xhr = portal.support.xhr();
				
				xhr.onreadystatechange = function() {
					if (xhr.readyState === 4) {
						post();
					}
				};
				
				xhr.open("POST", url);
				xhr.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
				if (portal.support.corsable) {
					xhr.withCredentials = options.credentials;
				}
				
				xhr.send("data=" + data);
			} : window.XDomainRequest && options.xdrURL && options.xdrURL.call(socket, "t") ? 
			function(url, data) {
				var xdr = new window.XDomainRequest();
				
				xdr.onload = xdr.onerror = post;
				xdr.open("POST", options.xdrURL.call(socket, url));
				xdr.send("data=" + data);
			} : 
			function(url, data) {
				var iframe,
					textarea, 
					form = document.createElement("form");
				
				form.action = url;
				form.target = "socket-" + (++guid);
				form.method = "POST";
				// IE 6 needs encoding property
				form.enctype = form.encoding = "text/plain";
				form.acceptCharset = "UTF-8";
				form.style.display = "none";
				form.innerHTML = '<textarea name="data"></textarea><iframe name="' + form.target + '"></iframe>';
				
				textarea = form.firstChild;
				textarea.value = data;
				
				iframe = form.lastChild;
				portal.support.on(iframe, "load", function() {
					document.body.removeChild(form);
					post();
				});
				
				document.body.appendChild(form);
				form.submit();
			};
			
			return {
				send: function(data) {
					queue.push(data);
					
					if (!sending) {
						sending = true;
						post();
					}
				}
			};
		},
		// Server-Sent Events
		sse: function(socket, options) {
			var es, 
				EventSource = window.EventSource;
			
			if (!EventSource) {
				return;
			} else if (options.crossDomain) {
				try {
					if (!portal.support.corsable || !("withCredentials" in new EventSource("about:blank"))) {
						return;
					}
				} catch(e) {
					return;
				}
			}
			
			return portal.support.extend(portal.transports.httpbase(socket, options), {
				open: function() {
					var url = socket.data("url");
					
					// Uses proper constructor for Chrome 10-15
					es = !options.crossDomain ? new EventSource(url) : new EventSource(url, {withCredentials: options.credentials});
					es.onopen = function(event) {
						socket.data("event", event).fire("open");
					};
					es.onmessage = function(event) {
						socket.data("event", event)._fire(event.data);
					};
					es.onerror = function(event) {
						es.close();
						
						// There is no way to find whether this connection closed normally or not 
						socket.data("event", event).fire("close", "done");
					};
				},
				close: function() {
					es.close();
				}
			});
		},
		// Streaming facade
		stream: function(socket) {
			socket.data("candidates").unshift("streamxhr", "streamxdr", "streamiframe");
		},
		// Streaming - XMLHttpRequest
		streamxhr: function(socket, options) {
			var xhr;
			
			if ((portal.support.browser.msie && +portal.support.browser.version < 10) || (options.crossDomain && !portal.support.corsable)) {
				return;
			}
			
			return portal.support.extend(portal.transports.httpbase(socket, options), {
				open: function() {
					var stop;
					
					xhr = portal.support.xhr();
					xhr.onreadystatechange = function() {
						function onprogress() {
							var index = socket.data("index"),
								length = xhr.responseText.length;
							
							if (!index) {
								socket.fire("open")._fire(xhr.responseText, true);
							} else if (length > index) {
								socket._fire(xhr.responseText.substring(index, length), true);
							}
							
							socket.data("index", length);
						}
						
						if (xhr.readyState === 3 && xhr.status === 200) {
							// Despite the change in response, Opera doesn't fire the readystatechange event
							if (portal.support.browser.opera && !stop) {
								stop = portal.support.iterate(onprogress);
							} else {
								onprogress();
							}
						} else if (xhr.readyState === 4) {
							if (stop) {
								stop();
							}
							
							socket.fire("close", xhr.status === 200 ? "done" : "error");
						}
					};
					
					xhr.open(options.method || "GET", socket.data("url"));
					if (portal.support.corsable) {
						xhr.withCredentials = options.credentials;
					}
					
					xhr.send(null);
				},
				close: function() {
					xhr.abort();
				}
			});
		},
		// Streaming - Iframe
		streamiframe: function(socket, options) {
			var doc, 
				stop, 
				ActiveXObject = window.ActiveXObject;
			
			if (!ActiveXObject || options.crossDomain) {
				return;
			} else {
				// IE 10 Metro doesn't support ActiveXObject
				try {
					new ActiveXObject("htmlfile");
				} catch(e) {
					return;
				}
			}
			
			return portal.support.extend(portal.transports.httpbase(socket, options), {
				open: function() {
					var iframe, cdoc;
					
					doc = new ActiveXObject("htmlfile");
					doc.open();
					doc.close();
					
					iframe = doc.createElement("iframe");
					iframe.src = socket.data("url");
					doc.body.appendChild(iframe);
					
					cdoc = iframe.contentDocument || iframe.contentWindow.document;
					stop = portal.support.iterate(function() {
						// Response container
						var container;
						
						function readDirty() {
							var clone = container.cloneNode(true), 
								text;
							
							// Adds a character not CR and LF to circumvent an Internet Explorer bug
							// If the contents of an element ends with one or more CR or LF, Internet Explorer ignores them in the innerText property 
							clone.appendChild(cdoc.createTextNode("."));
							text = clone.innerText;
							
							return text.substring(0, text.length - 1);
						}
						
						// Waits the server's container ignorantly
						if (!cdoc.firstChild) {
							return;
						}
						
						if (options.initIframe) {
							options.initIframe.call(socket, iframe);
						}
						
						container = cdoc.body.lastChild;
						
						// Detects connection failure
						if (!container) {
							socket.fire("close", "error");
							return false;
						}
						
						socket.fire("open")._fire(readDirty(), true);
						container.innerText = "";
						
						stop = portal.support.iterate(function() {
							var text = readDirty();
							
							if (text) {
								container.innerText = "";
								socket._fire(text, true);
							}
							
							if (cdoc.readyState === "complete") {
								socket.fire("close", "done");
								return false;
							}
						});
						
						return false;
					});
				},
				close: function() {
					stop();
					doc.execCommand("Stop");
				}
			});
		},
		// Streaming - XDomainRequest
		streamxdr: function(socket, options) {
			var xdr, 
				XDomainRequest = window.XDomainRequest;
			
			if (!XDomainRequest || !options.xdrURL || !options.xdrURL.call(socket, "t")) {
				return;
			}
			
			return portal.support.extend(portal.transports.httpbase(socket, options), {
				open: function() {
					var url = options.xdrURL.call(socket, socket.data("url"));
					
					socket.data("url", url);
					
					xdr = new XDomainRequest();
					xdr.onprogress = function() {
						var index = socket.data("index"), 
							length = xdr.responseText.length;
						
						if (!index) {
							socket.fire("open")._fire(xdr.responseText, true);
						} else {
							socket._fire(xdr.responseText.substring(index, length), true);
						}
						
						socket.data("index", length);
					};
					xdr.onerror = function() {
						socket.fire("close", "error");
					};
					xdr.onload = function() {
						socket.fire("close", "done");
					};
					
					xdr.open(options.method || "GET", url);
					xdr.send();
				},
				close: function() {
					xdr.abort();
				}
			});
		},
		// Long polling facade
		longpoll: function(socket) {
			socket.data("candidates").unshift("longpollajax", "longpollxdr", "longpolljsonp");
		},
		// Long polling - AJAX
		longpollajax: function(socket, options) {
			var xhr, 
				aborted,
				count = 0;
			
			if (options.crossDomain && !portal.support.corsable) {
				return;
			}
			
			return portal.support.extend(portal.transports.httpbase(socket, options), {
				open: function() {
					function poll() {
						var url = socket.buildURL({count: ++count});
						
						socket.data("url", url);
						
						xhr = portal.support.xhr();
						xhr.onreadystatechange = function() {
							var data;
							
							// Avoids c00c023f error on Internet Explorer 9
							if (!aborted && xhr.readyState === 4) {
								if (xhr.status === 200) {
									data = xhr.responseText;
									if (data || count === 1) {
										if (count === 1) {
											socket.fire("open");
										}
										if (data) {
											socket._fire(data);
										}
										poll();
									} else {
										socket.fire("close", "done");
									}
								} else {
									socket.fire("close", "error");
								}
							}
						};
						
						xhr.open(options.method || "GET", url);
						if (portal.support.corsable) {
							xhr.withCredentials = options.credentials;
						}
						
						xhr.send(null);
					}
					
					if (!options.longpollTest) {
						// Skips the test that checks the server's status
						setTimeout(function() {
							socket.fire("open");
							poll();
						}, 50);
					} else {
						poll();
					}
				},
				close: function() {
					aborted = true;
					xhr.abort();
				}
			});
		},
		// Long polling - XDomainRequest
		longpollxdr: function(socket, options) {
			var xdr, 
				count = 0, 
				XDomainRequest = window.XDomainRequest;
			
			if (!XDomainRequest || !options.xdrURL || !options.xdrURL.call(socket, "t")) {
				return;
			}
			
			return portal.support.extend(portal.transports.httpbase(socket, options), {
				open: function() {
					function poll() {
						var url = options.xdrURL.call(socket, socket.buildURL({count: ++count}));
						
						socket.data("url", url);
						
						xdr = new XDomainRequest();
						xdr.onload = function() {
							var data = xdr.responseText;
							
							if (data || count === 1) {
								if (count === 1) {
									socket.fire("open");
								}
								if (data) {
									socket._fire(data);
								}
								poll();
							} else {
								socket.fire("close", "done");
							}
						};
						xdr.onerror = function() {
							socket.fire("close", "error");
						};
						
						xdr.open(options.method || "GET", url);
						xdr.send();
					}
					
					if (!options.longpollTest) {
						setTimeout(function() {
							socket.fire("open");
							poll();
						}, 50);
					} else {
						poll();
					}
				},
				close: function() {
					xdr.abort();
				}
			});
		},
		// Long polling - JSONP
		longpolljsonp: function(socket, options) {
			var script, 
				called, 
				count = 0, 
				callback = jsonpCallbacks.pop() || ("socket_" + (++guid));
			
			return portal.support.extend(portal.transports.httpbase(socket, options), {
				open: function() {
					function poll() {
						var url = socket.buildURL({callback: callback, count: ++count}), 
							head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
						
						
						socket.data("url", url);
						
						script = document.createElement("script");
						script.async = true;
						script.src = url;
						script.clean = function() {
							script.clean = script.onerror = script.onload = script.onreadystatechange = null;
							if (head && script.parentNode) {
								head.removeChild(script);
							}
						};
						script.onload = script.onreadystatechange = function() {
							if (!script.readyState || /loaded|complete/.test(script.readyState)) {
								script.clean();
								if (called) {
									called = false;
									poll();
								} else if (count === 1) {
									socket.fire("open");
									poll();
								} else {
									socket.fire("close", "done");
								}
							}
						};
						script.onerror = function() {
							script.clean();
							socket.fire("close", "error");
						}; 
						
						head.insertBefore(script, head.firstChild);
					}
					
					// Attaches callback
					window[callback] = function(data) {
						called = true;
						if (count === 1) {
							socket.fire("open");
						}
						socket._fire(data);
					};
					socket.one("close", function() {
						// Assings an empty function for browsers which are not able to cancel a request made from script tag
						window[callback] = function() {};
						jsonpCallbacks.push(callback);
					});
					
					if (!options.longpollTest) {
						setTimeout(function() {
							socket.fire("open");
							poll();
						}, 50);
					} else {
						poll();
					}
				},
				close: function() {
					if (script.clean) {
						script.clean();
					}
				}
			});
		}
	};
	
	// Closes all sockets
	portal.finalize = function() {
		var url, socket;
		
		for (url in sockets) {
			socket = sockets[url];
			if (socket.state() !== "closed") {
				socket.close();
			}
			
			// To run the test suite
			delete sockets[url];
		}
	};
	
	portal.support.on(window, "unload", function() {
		// Check the unload event is fired by the browser
		unloading = true;
		// Closes all sockets when the document is unloaded 
		portal.finalize();
	});
	portal.support.on(window, "online", function() {
		var url, socket;
		
		for (url in sockets) {
			socket = sockets[url];
			// There is no reason to wait
			if (socket.state() === "waiting") {
				socket.open();
			}
		}
	});
	portal.support.on(window, "offline", function() {
		var url, socket;
		
		for (url in sockets) {
			socket = sockets[url];
			// Closes sockets which cannot detect disconnection manually
			if (socket.state() === "opened") {
				socket.fire("close", "error");
			}
		}
	});
	
	// Exposes portal to the global object
	window.portal = portal;
	
})();
