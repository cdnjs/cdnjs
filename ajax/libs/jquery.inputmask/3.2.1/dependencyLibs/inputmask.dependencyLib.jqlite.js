(function(factory) {
		if (typeof define === "function" && define.amd) {
			define(["jqlite"], factory);
		} else if (typeof exports === "object") {
			module.exports = factory(require("jqlite"));
		} else {
			factory(jQuery);
		}
	}
	(function($) {
		var class2type = {},
			classTypes = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
		for (var nameNdx = 0; nameNdx < classTypes.length; nameNdx++) {
			class2type["[object " + classTypes[nameNdx] + "]"] = classTypes[nameNdx].toLowerCase();
		}

		function type(obj) {
			if (obj == null) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[class2type.toString.call(obj)] || "object" :
				typeof obj;
		}
		$.isFunction = function(obj) {
			return type(obj) === "function";
		};
		$.isArray = Array.isArray;
		$.isWindow = function(obj) {
			return obj != null && obj === obj.window;
		};
		$.isPlainObject = function(obj) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if (type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
				return false;
			}

			if (obj.constructor && !class2type.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf")) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		};
		$.extend = function() {
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[0] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			// Handle a deep copy situation
			if (typeof target === "boolean") {
				deep = target;

				// Skip the boolean and the target
				target = arguments[i] || {};
				i++;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if (typeof target !== "object" && !$.isFunction(target)) {
				target = {};
			}

			// Extend jQuery itself if only one argument is passed
			if (i === length) {
				target = this;
				i--;
			}

			for (; i < length; i++) {
				// Only deal with non-null/undefined values
				if ((options = arguments[i]) != null) {
					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && $.isArray(src) ? src : [];

							} else {
								clone = src && $.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = $.extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		};
		$.data = function(elem, name, data) {
			return $(elem).data(name, data);
		};

		window.dependencyLib = $;
		return $;
	}));
