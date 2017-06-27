(function() {
"use strict";

// Copy properties from one object to another. Overwrites allowed.
function extend(to, from, whitelist) {
	for (var property in from) {
		if (whitelist) {
			var type = $.type(whitelist);

			if (whitelist === "own" && !from.hasOwnProperty(property) ||
				type === "array" && whitelist.indexOf(property) === -1 ||
				type === "regexp" && !whitelist.test(property) ||
				type === "function" && !whitelist.call(from, property)) {
				continue;
			}
		}

		// To copy gettters/setters, preserve flags etc
		var descriptor = Object.getOwnPropertyDescriptor(from, property);

		if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
			delete to[property];
			Object.defineProperty(to, property, descriptor);
		}
		else {
			to[property] = from[property];
		}
	}

	return to;
}

var $ = self.Bliss = extend(function(expr, context) {
	return $.type(expr) === "string"? (context || document).querySelector(expr) : expr || null;
}, self.Bliss);

extend($, {
	extend: extend,

	property: $.property || "_",

	sources: {},

	$: function(expr, context) {
		if (expr instanceof Node || expr instanceof Window) {
			return [expr];
		}

		// In the future, we should use Array.from() instead of Array.prototype.slice.call()
		return Array.prototype.slice.call(typeof expr == "string"? (context || document).querySelectorAll(expr) : expr || []);
	},

	/**
	 * Returns the [[Class]] of an object in lowercase (eg. array, date, regexp, string etc)
	 */
	type: function(obj) {
		if (obj === null) { return 'null'; }

		if (obj === undefined) { return 'undefined'; }

		var ret = (Object.prototype.toString.call(obj).match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();

		if(ret == 'number' && isNaN(obj)) {
			return 'nan';
		}

		return ret;
	},

	/*
	 * Return first non-undefined value. Mainly used internally.
	 */
	defined: function () {
		for (var i=0; i<arguments.length; i++) {
			if (arguments[i] !== undefined) {
				return arguments[i];
			}
		}
	},

	create: function (tag, o) {
		// 4 signatures: (tag, o), (tag), (o), ()
		if (arguments.length === 1) {
			if ($.type(tag) === "string") {
				o = {};
			}
			else {
				o = tag;
				tag = o.tag;
				delete o.tag;
			}
		}

		return $.set(document.createElement(tag || "div"), o);
	},

	each: function(obj, callback, ret) {
		ret = ret || {};

		for (var property in obj) {
			ret[property] = callback.call(obj, property, obj[property]);
		}

		return ret;
	},

	ready: function(context) {
		context = context || document;

		return new Promise(function(resolve, reject){
			if (context.readyState !== "loading") {
				resolve();
			}
			else {
				context.addEventListener("DOMContentLoaded", function(){
					resolve();
				});
			}
		});
	},

	// Helper for defining OOP-like “classes”
	Class: function(o) {
		var init = o.constructor || function(){};
		delete o.constructor;

		var abstract = o.abstract;
		delete o.abstract;

		var ret = function() {
			if (abstract && this.constructor === ret) {
				throw new Error("Abstract classes cannot be directly instantiated.");
			}

			if (this.constructor.super && this.constructor.super != ret) {
				// FIXME This should never happen, but for some reason it does if ret.super is null
				// Debugging revealed that somehow this.constructor !== ret, wtf. Must look more into this
				this.constructor.super.apply(this, arguments);
			}

			return init.apply(this, arguments);
		};

		ret.super = o.extends || null;
		delete o.extends;

		ret.prototype = $.extend(Object.create(ret.super && ret.super.prototype), {
			constructor: ret
		});

		$.extend(ret, o.static);
		delete o.static;

		for (var property in o) {
			if (property in $.classProps) {
				$.classProps[property].call(ret, ret.prototype, o[property]);
				delete o[property];
			}
		}

		// Anything that remains is an instance method/property or ret.prototype.constructor
		$.extend(ret.prototype, o);

		// For easier calling of super methods
		// This doesn't save us from having to use .call(this) though
		ret.prototype.super = ret.super? ret.super.prototype : null;

		return ret;
	},

	// Properties with special handling in classes
	classProps: {
		// Lazily evaluated properties
		lazy: function(obj, property, getter) {
			if (arguments.length >= 3) {
				Object.defineProperty(obj, property, {
					get: function() {
						// FIXME this does not work for instances if property is defined on the prototype
						delete this[property];

						return this[property] = getter.call(this);
					},
					configurable: true,
					enumerable: true
				});
			}
			else if (arguments.length === 2) {
				for (var prop in property) {
					$.lazy(obj, prop, property[prop]);
				}
			}

			return obj;
		},

		// Properties that behave like normal properties but also execute code upon getting/setting
		live: function(obj, property, descriptor) {
			if (arguments.length >= 3) {
				Object.defineProperty(obj, property, {
					get: function() {
						var value = this["_" + property];
						var ret = descriptor.get && descriptor.get.call(this, value);
						return ret !== undefined? ret : value;
					},
					set: function(v) {
						var value = this["_" + property];
						var ret = descriptor.set && descriptor.set.call(this, v, value);
						this["_" + property] = ret !== undefined? ret : v;
					},
					configurable: descriptor.configurable,
					enumerable: descriptor.enumerable
				});
			}
			else if (arguments.length === 2) {
				for (var prop in property) {
					$.live(obj, prop, property[prop]);
				}
			}

			return obj;
		},
	},

	// Includes a script, returns a promise
	include: function() {
		var url = arguments[arguments.length - 1];
		var loaded = arguments.length === 2? arguments[0] : false;

		var script = document.createElement("script");

		return loaded? Promise.resolve() : new Promise(function(resolve, reject){
			$.set(script, {
				async: true,
				onload: function() {
					resolve();
					$.remove(script);
				},
				onerror: function() {
					reject();
				},
				src: url,
				inside: document.head
			});
		});

	},

	/*
	 * Fetch API inspired XHR wrapper. Returns promise.
	 */
	fetch: function(url, o) {
		if (!url) {
			throw new TypeError("URL parameter is mandatory and cannot be " + url);
		}

		// Set defaults & fixup arguments
		url = new URL(url, location);
		o = o || {};
		o.data = o.data || '';
		o.method = o.method || 'GET';
		o.headers = o.headers || {};

		var xhr = new XMLHttpRequest();

		if ($.type(o.data) !== "string") {
			o.data = Object.keys(o.data).map(function(key){ return key + "=" + encodeURIComponent(o.data[key]); }).join("&");
		}

		if (o.method === "GET" && o.data) {
			url.search += o.data;
		}

		document.body.setAttribute('data-loading', url);

		xhr.open(o.method, url, !o.sync);

		for (var property in o) {
			if (property in xhr) {
				try {
					xhr[property] = o[property];
				}
				catch (e) {
					self.console && console.error(e);
				}
			}
		}

		if (o.method !== 'GET' && !o.headers['Content-type'] && !o.headers['Content-Type']) {
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		for (var header in o.headers) {
			xhr.setRequestHeader(header, o.headers[header]);
		}

		return new Promise(function(resolve, reject){
			xhr.onload = function(){
				document.body.removeAttribute('data-loading');

				if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
					// Success!
					resolve(xhr);
				}
				else {
					reject(Error(xhr.statusText));
				}

			};

			xhr.onerror = function() {
				document.body.removeAttribute('data-loading');
				reject(Error("Network Error"));
			};

			xhr.send(o.method === 'GET'? null : o.data);
		});
	}
});

var _ = $.property;

$.Element = function (subject) {
	this.subject = subject;

	// Author-defined element-related data
	this.data = {};

	// Internal Bliss element-related data
	this.bliss = {};
};

$.Element.prototype = {
	set: function (properties) {
		if ($.type(arguments[0]) === "string") {
			properties = {};
			properties[arguments[0]] = arguments[1];
		}

		for (var property in properties) {
			if (property in $.setProps) {
				$.setProps[property].call(this, properties[property]);
			}
			else if (property in this) {
				this[property] = properties[property];
			}
			else {
				if (!this.setAttribute) {
					console.log(this);
				}
				this.setAttribute(property, properties[property]);
			}
		}
	},

	// Run a CSS transition, return promise
	transition: function(props, duration) {
		duration = +duration || 400;

		return new Promise(function(resolve, reject){
			if ("transition" in this.style) {
				// Get existing style
				var previous = $.extend({}, this.style, /^transition(Duration|Property)$/);

				$.style(this, {
					transitionDuration: (duration || 400) + "ms",
					transitionProperty: Object.keys(props).join(", ")
				});

				$.once(this, "transitionend", function(){
					clearTimeout(i);
					$.style(this, previous);
					resolve(this);
				});

				// Failsafe, in case transitionend doesn’t fire
				var i = setTimeout(resolve, duration+50, this);

				$.style(this, props);
			}
			else {
				$.style(this, props);
				resolve(this);
			}
		}.bind(this));
	},

	// Fire a synthesized event on the element
	fire: function (type, properties) {
		var evt = document.createEvent("HTMLEvents");

		evt.initEvent(type, true, true );

		this.dispatchEvent($.extend(evt, properties));
	}
};

/*
 * Properties with custom handling in $.set()
 * Also available as functions directly on element._ and on $
 */
$.setProps = {
	// Set a bunch of inline CSS styles
	style: function (val) {
		$.extend(this.style, val);
	},

	// Set a bunch of attributes
	attributes: function (o) {
		for (var attribute in o) {
			this.setAttribute(attribute, o[attribute]);
		}
	},

	// Set a bunch of properties on the element
	properties: function (val) {
		$.extend(this, val);
	},

	// Bind one or more events to the element
	events: function (val) {
		if (val && val.addEventListener) {
			// Copy events from other element (requires Bliss Full)
			var me = this;

			// Copy listeners
			if (val[_] && val[_].bliss) {
				var listeners = val[_].bliss.listeners;

				for (var type in listeners) {
					listeners[type].forEach(function(l){
						me.addEventListener(type, l.callback, l.capture);
					});
				}
			}

			// Copy inline events
			for (var onevent in val) {
				if (onevent.indexOf("on") === 0) {
					this[onevent] = val[onevent];
				}
			}
		}
		else {
			for (var events in val) {
				events.split(/\s+/).forEach(function (event) {
					this.addEventListener(event, val[events]);
				}, this);
			}
		}
	},

	once: function(val) {
		if (arguments.length == 2) {
			val = {};
			val[arguments[0]] = arguments[1];
		}

		var me = this;

		$.each(val, function(events, callback){
			events = events.split(/\s+/);

			var once = function() {
				events.forEach(function(event){
					me.removeEventListener(event, once);
				});
				
				return callback.apply(me, arguments);
			};

			events.forEach(function (event) {
				me.addEventListener(event, once);
			});
		});
	},

	// Event delegation
	delegate: function(val) {
		if (arguments.length === 3) {
			// Called with ("type", "selector", callback)
			val = {};
			val[arguments[0]] = {};
			val[arguments[0]][arguments[1]] = arguments[2];
		}
		else if (arguments.length === 2) {
			// Called with ("type", selectors & callbacks)
			val = {};
			val[arguments[0]] = arguments[1];
		}

		var element = this;

		$.each(val, function (type, callbacks) {
			element.addEventListener(type, function(evt) {
				for (var selector in callbacks) {
					if (evt.target.matches(selector)) { // Do ancestors count?
						callbacks[selector].call(this, evt);
					}
				}
			});
		});
	},

	// Set the contents as a string, an element, an object to create an element or an array of these
	contents: function (val) {
		if (val || val === 0) {
			(Array.isArray(val)? val : [val]).forEach(function (child) {
				var type = $.type(child);

				if (/^(string|number)$/.test(type)) {
					child = document.createTextNode(child + "");
				}
				else if (type === "object") {
					child = $.create(child);
				}

				if (child instanceof Node) {
					this.appendChild(child);
				}
			}, this);
		}
	},

	// Append the element inside another element
	inside: function (element) {
		element.appendChild(this);
	},

	// Insert the element before another element
	before: function (element) {
		element.parentNode.insertBefore(this, element);
	},

	// Insert the element after another element
	after: function (element) {
		element.parentNode.insertBefore(this, element.nextSibling);
	},

	// Insert the element before another element's contents
	start: function (element) {
		element.insertBefore(this, element.firstChild);
	},

	// Wrap the element around another element
	around: function (element) {
		if (element.parentNode) {
			$.before(this, element);
		}

		(/^template$/i.test(this.nodeName)? this.content || this : this).appendChild(element);
	}
};

$.Array = function (subject) {
	this.subject = subject;
};

$.Array.prototype = {
	all: function(method) {
		var args = $$(arguments).slice(1);

		return this[method].apply(this, args);
	}
};

// Extends Bliss with more methods
$.add = function (methods, on, noOverwrite) {
	on = $.extend({$: true, element: true, array: true}, on);

	if ($.type(arguments[0]) === "string") {
		methods = {};
		methods[arguments[0]] = arguments[1];
	}

	$.each(methods, function(method, callback){
		if ($.type(callback) == "function") {
			if (on.element && (!(method in $.Element.prototype) || !noOverwrite)) {
				$.Element.prototype[method] = function () {
					return this.subject && $.defined(callback.apply(this.subject, arguments), this.subject);
				};
			}

			if (on.array && (!(method in $.Array.prototype) || !noOverwrite)) {
				$.Array.prototype[method] = function() {
					var args = arguments;
					return this.subject.map(function(element) {
						return element && $.defined(callback.apply(element, args), element);
					});
				};
			}

			if (on.$) {
				$.sources[method] = $[method] = callback;

				if (on.array || on.element) {
					$[method] = function () {
						var args = [].slice.apply(arguments);
						var subject = args.shift();
						var Type = on.array && Array.isArray(subject)? "Array" : "Element";

						return $[Type].prototype[method].apply({subject: subject}, args);
					};
				}
			}
		}
	});
};

$.add($.Array.prototype, {element: false});
$.add($.Element.prototype);
$.add($.setProps);
$.add($.classProps, {element: false, array: false});

// Add native methods on $ and _
var dummy = document.createElement("_");
$.add($.extend({}, HTMLElement.prototype, function(method){
	return $.type(dummy[method]) === "function";
}), null, true);


})();
