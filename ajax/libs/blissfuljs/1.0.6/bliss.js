(function() {
"use strict";

function overload(callback, start, end) {
	start = start === undefined ? 1 : start;
	end = end || start + 1;

	if (end - start <= 1) {
		return function() {
			if (arguments.length <= start || $.type(arguments[start]) === "string") {
				return callback.apply(this, arguments);
			}

			var obj = arguments[start];
			var ret;

			for (var key in obj) {
				var args = Array.prototype.slice.call(arguments);
				args.splice(start, 1, key, obj[key]);
				ret = callback.apply(this, args);
			}

			return ret;
		};
	}

	return overload(overload(callback, start + 1, end), start, end - 1);
}

// Copy properties from one object to another. Overwrites allowed.
// Subtle difference of array vs string whitelist: If property doesn't exist in from, array will not define it.
function extend(to, from, whitelist) {
	var whitelistType = type(whitelist);

	if (whitelistType === "string") {
		// To copy gettters/setters, preserve flags etc
		var descriptor = Object.getOwnPropertyDescriptor(from, whitelist);

		if (descriptor && (!descriptor.writable || !descriptor.configurable || !descriptor.enumerable || descriptor.get || descriptor.set)) {
			delete to[whitelist];
			Object.defineProperty(to, whitelist, descriptor);
		}
		else {
			to[whitelist] = from[whitelist];
		}
	}
	else if (whitelistType === "array") {
		whitelist.forEach(function(property) {
			if (property in from) {
				extend(to, from, property);
			}
		});
	}
	else {
		for (var property in from) {
			if (whitelist) {
				if (whitelistType === "regexp" && !whitelist.test(property) ||
					whitelistType === "function" && !whitelist.call(from, property)) {
					continue;
				}
			}

			extend(to, from, property);
		}
	}

	return to;
}

/**
 * Returns the [[Class]] of an object in lowercase (eg. array, date, regexp, string etc)
 */
function type(obj) {
	if (obj === null) {
		return "null";
	}

	if (obj === undefined) {
		return "undefined";
	}

	var ret = (Object.prototype.toString.call(obj).match(/^\[object\s+(.*?)\]$/)[1] || "").toLowerCase();

	if (ret == "number" && isNaN(obj)) {
		return "nan";
	}

	return ret;
}

var $ = self.Bliss = extend(function(expr, context) {
	if (arguments.length == 2 && !context || !expr) {
		return null;
	}

	return $.type(expr) === "string"? (context || document).querySelector(expr) : expr || null;
}, self.Bliss);

extend($, {
	extend: extend,
	overload: overload,
	type: type,

	property: $.property || "_",
	listeners: self.WeakMap? new WeakMap() : new Map(),

	original: {
		addEventListener: (self.EventTarget || Node).prototype.addEventListener,
		removeEventListener: (self.EventTarget || Node).prototype.removeEventListener
	},

	sources: {},

	noop: function() {},

	$: function(expr, context) {
		if (expr instanceof Node || expr instanceof Window) {
			return [expr];
		}

		if (arguments.length == 2 && !context) {
			return [];
		}

		return Array.prototype.slice.call(typeof expr == "string"? (context || document).querySelectorAll(expr) : expr || []);
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
		if (tag instanceof Node) {
			return $.set(tag, o);
		}

		// 4 signatures: (tag, o), (tag), (o), ()
		if (arguments.length === 1) {
			if ($.type(tag) === "string") {
				o = {};
			}
			else {
				o = tag;
				tag = o.tag;
				o = $.extend({}, o, function(property) {
					return property !== "tag";
				});
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

	ready: function(context, callback, isVoid) {
		if (typeof context === "function" && !callback) {
			callback = context;
			context = undefined;
		}

		context = context || document;

		if (callback) {
			if (context.readyState !== "loading") {
				callback();
			}
			else {
				$.once(context, "DOMContentLoaded", function() {
					callback();
				});
			}
		}

		if (!isVoid) {
			return new Promise(function(resolve) {
				$.ready(context, resolve, true);
			});
		}
	},

	// Helper for defining OOP-like “classes”
	Class: function(o) {
		var special = ["constructor", "extends", "abstract", "static"].concat(Object.keys($.classProps));
		var init = o.hasOwnProperty("constructor")? o.constructor : $.noop;
		var Class;

		if (arguments.length == 2) {
			// Existing class provided
			Class = arguments[0];
			o = arguments[1];
		}
		else {
			Class = function() {
				if (this.constructor.__abstract && this.constructor === Class) {
					throw new Error("Abstract classes cannot be directly instantiated.");
				}

				Class.super && Class.super.apply(this, arguments);

				init.apply(this, arguments);
			};

			Class.super = o.extends || null;

			Class.prototype = $.extend(Object.create(Class.super? Class.super.prototype : Object), {
				constructor: Class
			});

			// For easier calling of super methods
			// This doesn't save us from having to use .call(this) though
			Class.prototype.super = Class.super? Class.super.prototype : null;

			Class.__abstract = !!o.abstract;
		}

		var specialFilter = function(property) {
			return this.hasOwnProperty(property) && special.indexOf(property) === -1;
		};

		// Static methods
		if (o.static) {
			$.extend(Class, o.static, specialFilter);

			for (var property in $.classProps) {
				if (property in o.static) {
					$.classProps[property](Class, o.static[property]);
				}
			}
		}

		// Instance methods
		$.extend(Class.prototype, o, specialFilter);

		for (var property in $.classProps) {
			if (property in o) {
				$.classProps[property](Class.prototype, o[property]);
			}
		}

		return Class;
	},

	// Properties with special handling in classes
	classProps: {
		// Lazily evaluated properties
		lazy: overload(function(obj, property, getter) {
			Object.defineProperty(obj, property, {
				get: function() {
					var value = getter.call(this);

					Object.defineProperty(this, property, {
						value: value,
						configurable: true,
						enumerable: true,
						writable: true
					});

					return value;
				},
				set: function(value) {
					// Blind write: skip running the getter
					Object.defineProperty(this, property, {
						value: value,
						configurable: true,
						enumerable: true,
						writable: true
					});
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

		return loaded? Promise.resolve() : new Promise(function(resolve, reject) {
			$.set(script, {
				async: true,
				onload: function() {
					resolve(script);
					script.parentNode && script.parentNode.removeChild(script);
				},
				onerror: function() {
					reject(script);
				},
				src: url,
				inside: document.head
			});
		});
	},

	// Dynamically load a CSS or JS resource
	load: function load(url, base) {
		base = base? new URL(base, location.href) : location.href;
		url = new URL(url, base);

		// Prevent double loading
		var loading = load.loading = load.loading || {};

		if (loading[url + ""]) {
			return loading[url + ""];
		}

		if (/\.css$/.test(url.pathname)) {
			// CSS file
			return loading[url + ""] = new Promise(function(resolve, reject) {
				var link = $.create("link", {
					"href": url,
					"rel": "stylesheet",
					"inside": document.head,
					onload: function() {
						resolve(link);
					},
					onerror: function() {
						reject(link);
					}
				});
			});
		}

		// JS file
		return loading[url + ""] = $.include(url);
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

		document.body.setAttribute("data-loading", env.url);

		env.xhr.open(env.method, env.url.href, env.async !== false, env.user, env.password);

		for (var property in o) {
			if (property === "upload") {
				if (env.xhr.upload && typeof o[property] === "object") {
					$.extend(env.xhr.upload, o[property]);
				}
			}
			else if (property in env.xhr) {
				try {
					env.xhr[property] = o[property];
				}
				catch (e) {
					self.console && console.error(e);
				}
			}
		}

		var headerKeys = Object.keys(env.headers).map(function(key) {
			return key.toLowerCase();
		});

		if (env.method !== "GET" && headerKeys.indexOf("content-type") === -1) {
			env.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		for (var header in env.headers) {
			if (env.headers[header] !== undefined) {
				env.xhr.setRequestHeader(header, env.headers[header]);
			}
		}

		var promise = new Promise(function(resolve, reject) {
			env.xhr.onload = function() {
				document.body.removeAttribute("data-loading");

				if (env.xhr.status === 0 || env.xhr.status >= 200 && env.xhr.status < 300 || env.xhr.status === 304) {
					// Success!
					resolve(env.xhr);
				}
				else {
					reject($.extend(Error(env.xhr.statusText), {
						xhr: env.xhr,
						get status() {
							return this.xhr.status;
						}
					}));
				}
			};

			env.xhr.onerror = function() {
				document.body.removeAttribute("data-loading");
				reject($.extend(Error("Network Error"), {xhr: env.xhr}));
			};

			env.xhr.ontimeout = function() {
				document.body.removeAttribute("data-loading");
				reject($.extend(Error("Network Timeout"), {xhr: env.xhr}));
			};

			env.xhr.send(env.method === "GET"? null : env.data);
		});
		// Hack: Expose xhr.abort(), by attaching xhr to the promise.
		promise.xhr = env.xhr;
		return promise;
	},

	value: function(obj) {
		var hasRoot = typeof obj !== "string";

		return $.$(arguments).slice(+hasRoot).reduce(function(obj, property) {
			return obj && obj[property];
		}, hasRoot? obj : self);
	}
});

$.Hooks = new $.Class({
	add: function (name, callback, first) {
		if (typeof arguments[0] != "string") {
			// Multiple hooks
			for (var name in arguments[0]) {
				this.add(name, arguments[0][name], arguments[1]);
			}

			return;
		}

		(Array.isArray(name)? name : [name]).forEach(function(name) {
			this[name] = this[name] || [];

			if (callback) {
				this[name][first? "unshift" : "push"](callback);
			}
		}, this);
	},

	run: function (name, env) {
		this[name] = this[name] || [];
		this[name].forEach(function(callback) {
			callback.call(env && env.context? env.context : env, env);
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
		return new Promise(function(resolve, reject) {
			if ("transition" in this.style && duration !== 0) {
				// Get existing style
				var previous = $.extend({}, this.style, /^transition(Duration|Property)$/);

				$.style(this, {
					transitionDuration: (duration || 400) + "ms",
					transitionProperty: Object.keys(props).join(", ")
				});

				$.once(this, "transitionend", function() {
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

		// Return the result of dispatching the event, so we
		// can know if `e.preventDefault` was called inside it
		return this.dispatchEvent($.extend(evt, properties));
	},

	bind: overload(function(types, options) {
		if (arguments.length > 1 && ($.type(options) === "function" || options.handleEvent)) {
			// options is actually callback
			var callback = options;
			options = $.type(arguments[2]) === "object"? arguments[2] : {
				capture: !!arguments[2] // in case it's passed as a boolean 3rd arg
			};
			options.callback = callback;
		}

		var listeners = $.listeners.get(this) || {};

		types.trim().split(/\s+/).forEach(function (type) {
			if (type.indexOf(".") > -1) {
				type = type.split(".");
				var className = type[1];
				type = type[0];
			}

			listeners[type] = listeners[type] || [];

			if (listeners[type].filter(function(l) {
				return l.callback === options.callback && l.capture == options.capture;
			}).length === 0) {
				listeners[type].push($.extend({className: className}, options));
			}

			$.original.addEventListener.call(this, type, options.callback, options);
		}, this);

		$.listeners.set(this, listeners);
	}, 0),

	unbind: overload(function(types, options) {
		if (options && ($.type(options) === "function" || options.handleEvent)) {
			var callback = options;
			options = arguments[2];
		}

		if ($.type(options) == "boolean") {
			options = {capture: options};
		}

		options = options || {};
		options.callback = options.callback || callback;

		var listeners = $.listeners.get(this);

		(types || "").trim().split(/\s+/).forEach(function (type) {
			if (type.indexOf(".") > -1) {
				type = type.split(".");
				var className = type[1];
				type = type[0];
			}

			//if listeners exist, always go through listeners to clean up
			if (!listeners) {
				if (type && options.callback) {
					return $.original.removeEventListener.call(this, type, options.callback, options.capture);
				}
				return;
			}

			// Mass unbinding, need to go through listeners
			for (var ltype in listeners) {
				if (!type || ltype === type) {
					// No forEach, because we’re mutating the array
					for (var i=0, l; l=listeners[ltype][i]; i++) {
						if ((!className || className === l.className)
							&& (!options.callback || options.callback === l.callback)
							&& (!!options.capture == !!l.capture || 
						    		!type && !options.callback && undefined === options.capture)
						   ) {
								listeners[ltype].splice(i, 1);
								$.original.removeEventListener.call(this, ltype, l.callback, l.capture);
								i--;
						}
					}
				}
			}
		}, this);
	}, 0),

	// Return a promise that resolves when an event fires, then unbind
	when: function(type, test) {
		var me = this;
		return new Promise(function(resolve) {
			me.addEventListener(type, function callee(evt) {
				if (!test || test.call(this, evt)) {
					this.removeEventListener(type, callee);
					resolve(evt);
				}
			});
		});
	},

	toggleAttribute: function(name, value, test) {
		if (arguments.length < 3) {
			test = value !== null;
		}

		if (test) {
			this.setAttribute(name, value);
		}
		else {
			this.removeAttribute(name);
		}
	}
};

/*
 * Properties with custom handling in $.set()
 * Also available as functions directly on element._ and on $
 */
$.setProps = {
	// Set a bunch of inline CSS styles
	style: function (val) {
		for (var property in val) {
			if (property in this.style) {
				// camelCase versions
				this.style[property] = val[property];
			}
			else {
				// This way we can set CSS Variables too and use normal property names
				this.style.setProperty(property, val[property]);
			}
		}
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
		if (arguments.length == 1 && val && val.addEventListener) {
			// Copy events from other element (requires Bliss Full)
			var me = this;

			// Copy listeners
			if ($.listeners) {
				var listeners = $.listeners.get(val);

				for (var type in listeners) {
					listeners[type].forEach(function(l) {
						$.bind(me, type, l.callback, l.capture);
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
			return $.bind.apply(this, [this].concat($.$(arguments)));
		}
	},

	once: overload(function(types, callback) {
		var me = this;
		var once = function() {
			$.unbind(me, types, once);

			return callback.apply(me, arguments);
		};

		$.bind(this, types, once, {once: true});
	}, 0),

	// Event delegation
	delegate: overload(function (type, selector, callback) {
		$.bind(this, type, function(evt) {
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
		element && element.appendChild(this);
	},

	// Insert the element before another element
	before: function (element) {
		element && element.parentNode.insertBefore(this, element);
	},

	// Insert the element after another element
	after: function (element) {
		element && element.parentNode.insertBefore(this, element.nextSibling);
	},

	// Insert the element before another element's contents
	start: function (element) {
		element && element.insertBefore(this, element.firstChild);
	},

	// Wrap the element around another element
	around: function (element) {
		if (element && element.parentNode) {
			$.before(this, element);
		}

		this.appendChild(element);
	}
};

$.Array = function (subject) {
	this.subject = subject;
};

$.Array.prototype = {
	all: function(method) {
		var args = $.$(arguments).slice(1);

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
$.add($.extend({}, HTMLElement.prototype, function(method) {
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
	// Clone elements, with events and data
	clone: function () {
		console.warn("$.clone() is deprecated and will be removed in a future version of Bliss.");
		var clone = this.cloneNode(true);
		var descendants = $.$("*", clone).concat(clone);

		$.$("*", this).concat(this).forEach(function(element, i, arr) {
			$.events(descendants[i], element);
			descendants[i]._.data = $.extend({}, element._.data);
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
	EventTarget.prototype.addEventListener = function(type, callback, options) {
		return $.bind(this, type, callback, options);
	};

	EventTarget.prototype.removeEventListener = function(type, callback, options) {
		return $.unbind(this, type, callback, options);
	};
}

// Set $ and $$ convenience methods, if not taken
self.$ = self.$ || $;
self.$$ = self.$$ || $.$;

})(Bliss);
