(function() {
"use strict";

function overload(callback, start, end) {
	start = start === undefined ? 1 : start;
	end = end || start + 1;

	if (end - start <= 1) {
		return function() {
			if ($.type(arguments[start]) === 'string') {
				return callback.apply(this, arguments);
			}

			var obj = arguments[start], ret;

			for (var key in obj) {
				var args = Array.from(arguments);
				args.splice(start, 1, key, obj[key]);
				ret = callback.apply(this, args);
			}

			return ret;
		};
	}

	return overload(overload(callback, start + 1, end), start, end - 1);
}

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

	overload: overload,

	property: $.property || "_",

	sources: {},

	noop: function(){},

	$: function(expr, context) {
		if (expr instanceof Node || expr instanceof Window) {
			return [expr];
		}

		return Array.from(typeof expr == "string"? (context || document).querySelectorAll(expr) : expr || []);
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
				o = $.extend({}, o, function(property) { return property !== "tag"; });
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
		var init = $.noop;

		if (o.hasOwnProperty("constructor")) {
			init = o.constructor;
			delete o.constructor;
		}

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

		ret.prototype = $.extend(Object.create(ret.super? ret.super.prototype : Object), {
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
		lazy: overload(function(obj, property, getter) {
			Object.defineProperty(obj, property, {
				get: function() {
					// FIXME this does not work for instances if property is defined on the prototype
					delete this[property];
					return this[property] = getter.call(this);
				},
				configurable: true,
				enumerable: true
			});
			return obj;
		}),

		// Properties that behave like normal properties but also execute code upon getting/setting
		live: overload(function(obj, property, descriptor) {
			if ($.type(descriptor) === "function") {
				descriptor = {set: descriptor};
			}

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

			return obj;
		})

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
		var env = extend({
			url: new URL(url, location),
			data: "",
			method: "GET",
			headers: {},
			xhr: new XMLHttpRequest()
		}, o);

		env.method = env.method.toUpperCase();

		$.hooks.run("fetch-args", env);

		// Start sending the request

		if (env.method === "GET" && env.data) {
			env.url.search += env.data;
		}

		document.body.setAttribute('data-loading', env.url);

		env.xhr.open(env.method, env.url.href, env.async !== false, env.user, env.password);

		for (var property in o) {
			if (property in env.xhr) {
				try {
					env.xhr[property] = o[property];
				}
				catch (e) {
					self.console && console.error(e);
				}
			}
		}

		if (env.method !== 'GET' && !env.headers['Content-type'] && !env.headers['Content-Type']) {
			env.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		for (var header in env.headers) {
			env.xhr.setRequestHeader(header, env.headers[header]);
		}

		return new Promise(function(resolve, reject){
			env.xhr.onload = function(){
				document.body.removeAttribute('data-loading');

				if (env.xhr.status === 0 || env.xhr.status >= 200 && env.xhr.status < 300 || env.xhr.status === 304) {
					// Success!
					resolve(env.xhr);
				}
				else {
					reject(Error(env.xhr.statusText));
				}

			};

			env.xhr.onerror = function() {
				document.body.removeAttribute('data-loading');
				reject(Error("Network Error"));
			};

			env.xhr.send(env.method === 'GET'? null : env.data);
		});
	},

	value: function(obj) {
		var hasRoot = $.type(obj) !== "string";

		return $$(arguments).slice(+hasRoot).reduce(function(obj, property) {
	        return obj && obj[property];
	    }, hasRoot? obj : self);
	}
});

$.Hooks = new $.Class({
	add: function (name, callback) {
		this[name] = this[name] || [];
		this[name].push(callback);
	},

	run: function (name, env) {
		(this[name] || []).forEach(function(callback) {
			callback(env);
		});
	}
});

$.hooks = new $.Hooks();

var _ = $.property;

$.Element = function (subject) {
	this.subject = subject;

	// Author-defined element-related data
	this.data = {};

	// Internal Bliss element-related data
	this.bliss = {};
};

$.Element.prototype = {
	set: overload(function(property, value) {

		if (property in $.setProps) {
			$.setProps[property].call(this, value);
		}
		else if (property in this) {
			this[property] = value;
		}
		else {
			this.setAttribute(property, value);
		}

	}, 0),

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

	once: overload(function(events, callback){
		events = events.split(/\s+/);
		var me = this;
		var once = function() {
			events.forEach(function(event){
				me.removeEventListener(event, once);
			});

			return callback.apply(me, arguments);
		};

		events.forEach(function (event) {
			me.addEventListener(event, once);
		});
	}, 0),

	// Event delegation
	delegate: overload(function (type, selector, callback) {
		this.addEventListener(type, function(evt) {
			if (evt.target.closest(selector)) {
				callback.call(this, evt);
			}
		});
	}, 0, 2),

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
$.add = overload(function(method, callback, on, noOverwrite) {
	on = $.extend({$: true, element: true, array: true}, on);

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
}, 0);

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

(function($) {
"use strict";

if (!Bliss || Bliss.shy) {
	return;
}

var _ = Bliss.property;

// Methods requiring Bliss Full
$.add({
	// Clone elements, with events
	clone: function () {
		var clone = this.cloneNode(true);
		var descendants = $.$("*", clone).concat(clone);

		$.$("*", this).concat(this).forEach(function(element, i, arr) {
			$.events(descendants[i], element);
		});

		return clone;
	}
}, {array: false});

// Define the _ property on arrays and elements

Object.defineProperty(Node.prototype, _, {
	// Written for IE compatability (see #49)
	get: function getter () {
		Object.defineProperty(Node.prototype, _, {
			get: undefined
		});
		Object.defineProperty(this, _, {
			value: new $.Element(this)
		});
		Object.defineProperty(Node.prototype, _, {
			get: getter
		});
		return this[_];
	},
	configurable: true
});

Object.defineProperty(Array.prototype, _, {
	get: function () {
		Object.defineProperty(this, _, {
			value: new $.Array(this)
		});
		
		return this[_];
	},
	configurable: true
});

// Hijack addEventListener and removeEventListener to store callbacks

if (self.EventTarget && "addEventListener" in EventTarget.prototype) {
	var addEventListener = EventTarget.prototype.addEventListener,
	    removeEventListener = EventTarget.prototype.removeEventListener,
	    equal = function(callback, capture, l){
	    	return l.callback === callback && l.capture == capture;
	    },
	    notEqual = function() { return !equal.apply(this, arguments); };

	EventTarget.prototype.addEventListener = function(type, callback, capture) {
		if (this && this[_] && callback) {
			var listeners = this[_].bliss.listeners = this[_].bliss.listeners || {};
			
			listeners[type] = listeners[type] || [];
			
			if (listeners[type].filter(equal.bind(null, callback, capture)).length === 0) {
				listeners[type].push({callback: callback, capture: capture});
			}
		}

		return addEventListener.call(this, type, callback, capture);
	};

	EventTarget.prototype.removeEventListener = function(type, callback, capture) {
		if (this && this[_] && callback) {
			var listeners = this[_].bliss.listeners = this[_].bliss.listeners || {};

			if (listeners[type]) {
				listeners[type] = listeners[type].filter(notEqual.bind(null, callback, capture));
			}
		}

		return removeEventListener.call(this, type, callback, capture);
	};
}

// Set $ and $$ convenience methods, if not taken
self.$ = self.$ || $;
self.$$ = self.$$ || $.$;

})(Bliss);
