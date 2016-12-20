// > http://syringejs.org
// > syringe.js v0.6.5. Copyright (c) 2013-2015 M Holt
// > holt.org. Distributed under the MIT License
/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:false, strict:true,
undef:true, unused:true, curly:true, indent:4, maxerr:50, laxcomma:true, evil: true,
laxbreak:true, multistr: true, camelcase:true, immed: true, latedef: true, nonew:true,
quotmark: true, node: true, newcap: true, browser:true */
(function () {

	'use strict';

	// Globals
	var
		root	= this,
		store	= {},
		hasProp	= {}.hasOwnProperty,
		slice	= [].slice;

	// Utility methods used by the API
	var utils = {

		// Get an object from an (optional) context `ctx` using delimited
		// string notation. The `sep` parameter determines the delimiter 
		// (a period `.` by default).
		getObj: function (str, ctx, sep) {
			return str.split((sep || '.')).filter(function (num) {
				return num.length;
			}).reduce(function (prev, curr, index, list) {
				if (prev) {
					return prev[list[index]];
				}
			}, (ctx || this));
		},

		// Create an object within an (optional) context `ctx` using 
		// delimited string notation. The `sep` parameter determines
		// the delimiter (period by default).			
		setObj: function (str, ctx, sep) {
			return str.split((sep || '.')).reduce(function (prev, curr) {
				return (prev[curr]) ? (prev[curr]) : (prev[curr]) = {};
			}, (ctx || this));
		},

		// In cases where no context is provided, we just want simple partial 
		// application and no clobbering of the original `this` context. This
		// utility function allows .call() and .apply() to continue to work
		// properly on bound Syringe functions.
		bindArgs: function () {
			var
				args	= slice.call(arguments),
				fn		= this;

			return function () {
				return fn.apply(this, args.concat(slice.call(arguments)));
			};
		},

		// RFC 4122 GUID generator
		makeId: function () {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (b) {
				var a = 16 * Math.random() | 0;
				return ('x' === b ? a : a & 3 | 8).toString(16);
			});
		},

		// Get the object type as a string. If an `istype` value is passed the comparison
		// is against this value and returns `true` or `false`, otherwise the type itself
		// is returned.
		getType: function (obj, istype) {
			var
				ret = 'Undefined',
				types = ['Window', 'HTMLDocument', 'Global', 'Document'];

			if (obj) {

				ret = ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1];

				types = types.some(function (item) {
					return item.toLowerCase() === ret.toLowerCase();
				});

				ret = types ? 'Object' : ret;
			} else {
				if (obj === null) {
					ret = 'Null';
				} else if (obj === false) {
					ret = 'Boolean';
				} else if (typeof obj === 'string') {
					ret = 'String';
				} else if (obj === 0) {
					ret = 'Number';
				} else if (isNaN(obj) && typeof obj === 'number') {
					ret = 'NaN';
				}
			}
			if (typeof istype === 'string') {
				return (istype.toLowerCase() === ret.toLowerCase());
			} else {
				return ret;
			}
		},

		// Return an array that describes the type of items contained inside an arguments
		// object, or match an arguments object to an array of type names in order to
		// validate the payload
		matchArgs: function (args, istype) {
			istype = istype || [];
			args = [].slice.call(args);
			if (!istype.length) {
				return args.map(function (item) {
					return utils.getType(item);
				});
			} else if (istype.length === args.length) {
				return args.reduce(function (prev, curr, idx) {
					if (!prev && utils.getType(istype[idx], 'string')) {
						return false;
					}
					return utils.getType(curr, istype[idx]);
				}, true);

			} else {
				return false;
			}
		},

		// Return a map of any items in the passed array that match items
		// in the registry object
		getReg: function (arr, id) {
			var reg = store[id].registry;
			return arr.map(function (item) {
				switch (item) {
				case '':
					return undefined;
				case '*':
					return reg;
				case 'this':
					return this;
				default:
					return utils.getObj(item, reg, store[id].sep);
				}
			}, this);
		},

		// Standard ajax retrieval operation
		getData: function (url, callback) {
			var xhr;
			if (!utils.getType(XMLHttpRequest, 'undefined')) {
				xhr = new XMLHttpRequest();
			} else {
				[
					'MSXML2.XmlHttp.5.0',
					'MSXML2.XmlHttp.4.0',
					'MSXML2.XmlHttp.3.0',
					'MSXML2.XmlHttp.2.0',
					'Microsoft.XmlHttp'
				].forEach(function (item) {
					try {
						xhr = new window.ActiveXObject(item);
						return;
					} catch (e) {
						throw new Error(e);
					}
				});
			}

			xhr.onreadystatechange = function () {
				if (xhr.readyState < 4) {
					return;
				}
				if (xhr.status !== 200) {
					callback(null);
				} else if (xhr.readyState === 4) {
					callback(xhr);
				}
			};

			xhr.open('GET', url, true);
			xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.send('');
		},

		// Returns `true` if an object contains no enumerable propeties
		isEmpty: function (obj) {
			return Object.keys(obj).length ? false : true;
		},

		// Asynch fetch
		fetch: function (arr, props, ctx) {
			props			= props			|| {};
			props.success	= props.success || false;
			props.xss		= props.xss		|| false;

			var
				self	= this,
				count	= 0,
				url		= '';

			// Test to see if a passed URL is local
			var isLocalURL = function (url) {
				var regexp = new RegExp('//' + location.host + '($|/)');
				return 'http' === url.substring(0, 4) ? regexp.test(url) : true;
			};

			// Keep a count of the script load events and reconcile it
			// against the length of the script list
			var stack = function (xhr) {
				if (xhr && xhr.responseText) {
					var data = JSON.parse(xhr.responseText);
					if (data) {
						
						// Handle "add" versus "set" scenarios. If the target binding path
						// exists then the object is extended, otherwise it is added. Note
						// that if the returned data is an array and the binding already
						// exists, the data is added to the object as a key named "json".
						if (self.get(arr[count].bind)) {
							if (utils.getType(data, 'array')) {
								self.add(arr[count].bind + '.json', data);
							}
							else if (utils.getType(data, 'object')) {
								for (var key in data) {
									if (data.hasOwnProperty(key)) {
										self.add(arr[count].bind + '.' + key, data[key]);
									}
								}
							}
						}
						else {
							self.add(arr[count].bind, data);
						}
					}
				}
				if (++count === arr.length) {
					if (utils.getType(props.success, 'function')) {
						props.success.apply(self, [(ctx || self), xhr]);
					}
				}
			};

			arr.forEach(function (item) {
				if (isLocalURL(url = item.path) || props.xss === true) {
					utils.getData(item.path, stack);
				}
			});
		},

		// The `run` function resolves the dependencies of a bound method.
		// When it executes is retrieves the original `fn` method from the 
		// `cabinet` object, and applies both the injected and free arguments
		// to it. 
		run: function (arr, fn, syr) {
			var
				args = slice.call(arguments),
				props, match, ins, res;

			// Remove the id from the arguments
			args.splice(2, 1);

			// Locate the stored injection target function
			match = store[syr.id].cabinet.filter(function (item) {
				return item.fn === fn;
			})[0];

			fn = match ? match.fn : fn;
			props = utils.getReg
				.apply(syr, [arr, syr.id])
				.concat(args.slice(2, args.length));

			// Replace pointers to the global object with actual instances
			arr.forEach(function (item, idx) {
				if (utils.getType(item, 'string') && item.indexOf('global:') === 0) {
					props[idx] = utils.getObj(item.slice(7, item.length), root, '.');

				}
			});

			if (!utils.isEmpty(fn.prototype)) {
				ins = Object.create(fn.prototype);
				res = fn.apply(ins, props);
				return (utils.getType(res, 'object')) ? res : ins;
			}
			// Assume a regular function
			else {
				return fn.apply(this, props);
			}
		},

		// Execute any events associated with a type of passed action
		fire: function (type, id, arr) {

			// Fire the events attached to this action
			store[id].events[type].forEach(function (event) {
				if (utils.getType(event.fn, 'function')) {

					// Add the event type
					arr.unshift(type);

					// Match paths that terminate with a wildcard
					if (event.path && event.path.split(store[id].separator).pop() === '*') {

						var 
							wldpath	= event.path.split(store[id].separator),
							arrpath	= arr[1].split(store[id].separator);
						
						wldpath.pop();
						arrpath.pop();

						wldpath	= wldpath.join(store[id].separator);
						arrpath	= arrpath.join(store[id].separator);

						if (arrpath === wldpath) {
							event.fn.apply(this, arr);
						}
					}

					else if (
						// Match all types of event
						!event.path ||
						// Events matching a deep path			
						arr[1] === event.path ||
						// Events matching a shallow path
						arr[1].split(store[id].separator).pop() === event.path
					) {
						event.fn.apply(this, arr); 
					}

					// Remove the event type
					arr.shift();

				}
			}, this);
		}
	};

	// Syringe base constructor
	var Syringe = function (props) {
		store[this.id = utils.makeId()] = {
			cabinet		: [],
			registry	: (props && utils.getType(props, 'object')) ? props : {},
			separator	: '.',
			events		: {
				add		: [],
				set		: [],
				get		: [],
				remove	: [],
				listops	: [],
				all		: []
			}
		};
	};

	// Syringe object prototype methods
	var proto = Syringe.prototype = {

		// Set the separator character used for creating, specifying, and
		// retrieving objects. Whitespace and alphanumeric characters are
		// not permitted. By default, the period '.' character is used.
		separator: function (val) {
			return (utils.getType(val, 'string') &&
				(1 === val.replace(/[?a-zA-Z\d]|\s/g, '').length)) ?
				(store[this.id].separator = val, this) : false;
		},

		// Convenience function that allows you to process array items directly
		// and which raises an event on completion.
		listops: function (name, fn) {
			
			var
				reg = store[this.id].registry,
				sep = store[this.id].separator,
				arr = name.split(sep),
				obj = utils.getObj(name, reg, sep),
				res = null;

			if (utils.getType(obj, 'array') && typeof fn === 'function') {

				res = fn(obj);
				arr = [name, obj];
				
				if (res) {
					arr.push(res);
				}

				utils.fire('listops', this.id, arr);
			}

			else {
				throw new Error('Key "' + name + '" is not an array!');				
			}			

			return this;
		},

		// Add a new item to the Syringe registry. The name can be provided 
		// in dot-notation, in which case a deep reference is built within
		// the registry. If `value` is a function, the optional `bindings` 
		// parameter can contain an array of all the registry properties 
		// with which to bind this function. In this way, registry methods
		// can be automatically bound to other registry methods.
		add: function (name, value, bindings) {
			var
				reg = store[this.id].registry,
				sep = store[this.id].separator;

			switch ((utils.getType(name))) {

			case 'Array':

				name.forEach(function (item) {
					this.add.apply(this, [item]);
				}, this);
				return this;

			case 'Object':
				Object.keys(name).forEach(function (key) {
					this.add.apply(this, [key, name[key]]);
				}, this);
				return this;
			}

			if (!utils.getType(name, 'string')) {
				throw new Error('Name must be a string!');
			}

			name = name.trim();

			if (name.indexOf('global:') === 0) {
				throw new Error('You can\'t add a key with this prefix!');
			}

			if (utils.getObj(name, reg, sep)) {
				throw new Error('Key "' + name +
					'" already exists in the map; use .remove() to unregister it first!');
			} else {
				if (utils.getType(value, 'function') && bindings) {
					value = this.on(bindings, value);
				}
				var
				arr = name.split(sep),
					str = (arr.length > 1) ? arr.pop() : false;

				if (str) {
					utils.setObj(arr.join(sep), reg, sep)[str] = value;
				} else {
					reg[arr.toString()] = value;
				}
			}

			// Raise an "add" event, passing the name and value
			utils.fire('add', this.id, [name, value]);

			return this;
		},

		// Remove a named item from the registry
		remove: function (name) {

			// Remove an array of items
			if (utils.getType(name, 'array')) {
				name.forEach(function (item) {
					if (utils.getType(item, 'string')) {
						this.remove(item);
					}
				}, this);
				return this;
			}

			// Remove a single item
			if (utils.getType(name, 'string')) {

				name = name.trim();

				var
					reg = store[this.id].registry,
					sep = store[this.id].separator,
					snm = name.trim().split(sep),
					lst = snm.pop(),
					nrg = {},
					obj = {};

				snm = snm.join(sep);
				obj = snm ? utils.getObj(snm, reg, sep) : reg;

				if (utils.getType(obj, 'object')) {

					name = lst || snm;

					Object.keys(obj).forEach(function (key) {
						if (key !== name) {
							nrg[key] = obj[key];
						}
					});

					// Deep removal (delimited name)
					if (snm) {
						this.set(snm, nrg);
					}

					// Shallow removal (non-delimited name)
					else {
						store[this.id].registry = nrg;
					}
				}

				// Raise a remove event, passing the name
				utils.fire('remove', this.id, [snm + sep + name]);

			}

			return this;
		},

		// Bind a method to the dependency registry. This function accepts
		// a variety of different arguments, the formulation of which 
		// determine what type of binding takes place. The variations are
		// described below.		
		on: function ( /* 2, 3, or 4 params */ ) {
			var
				cab		= store[this.id].cabinet,
				args	= slice.call(arguments),
				ctx		= root,
				obj		= { args: args },
				gtp		= utils.getType,
				mtc		= utils.matchArgs,
				anon, anonctx, named, namedctx;

			// Bind arguments only, no context - used when a context is
			// provided
			var bindArgsOnly = utils.bindArgs.bind(utils.run);

			// Utility that adds named methods to a provided context
			var namedFuncFactory = function (name, fn, target) {
				var
					sep = store[this.id].separator,
					arr = name.split(sep),
					str = (arr.length > 1) ? arr.pop() : false;

				target = gtp(target, 'object') ? target : root;

				if (str) {
					utils.setObj(arr.join(sep), target, sep)[str] = fn;
				} else {
					target[arr.join(sep)] = fn;
				}

			}.bind(this);

			// __Two__ parameters: the registry array `args[0]` and method
			// `args[1]`. No name or context object is provided. The
			// bound function will be returned as an anonymous function.

			// __Three__ parameters (1): the registry array `args[0]`, the
			// method `args[1]`, and a context object `args[2]`.
			// When the bound method executes the provided context
			// will be used.

			// __Three__ parameters (2): a name `args[0]`, the registry array
			// `args[1]`, and method `args[2]`. No context object
			// is provided. The bound function will be assigned to
			// whatever the root object is.

			// __Four__ parameters: a name `args[0]`, the registry array
			// `args[1]`, the method `args[2]`, and a context object
			// `args[3]`. When the bound method executes the provided
			// context will be used.

			anon		= mtc(args, ['array', 'function']);
			anonctx		= mtc(args, ['array', 'function', 'object']);
			named		= mtc(args, ['string', 'array', 'function']);
			namedctx	= mtc(args, ['string', 'array', 'function', 'object']);

			if (anon || anonctx || named || namedctx) {

				var n = (named || namedctx) ? 1 : 0;

				obj.fn	= args[n + 1];
				obj.ctx = anonctx ? args[n + 2] : ctx;

				if (anon || named) {
					obj.bind = bindArgsOnly(args[n + 0], args[n + 1], this);
				} else if (anonctx || namedctx) {
					obj.bind = utils.run.bind(args[n + 2], args[n + 0], args[n + 1], this);
				}

				// Store a copy of this binding in the `cabinet` object.
				// This is useful if we want to copy an existing bound
				// function but use new registry items. 
				cab.push(obj);

				// if this is a named method?, If so, add the bound function to the name			
				if (n) {
					namedFuncFactory(args[0], obj.bind, ctx);
					return this;
				} else {
					return obj.bind;
				}
			}

			// If nothing gets returned, just return the Syringe object
			return this;
		},

		// Sometimes you need to call an executable registry item directly.
		// You can use this method to do just that. You can also (optionally) 
		// pass an array of arguments and a context.
		exec: function (name, args, ctx) {
			ctx = ctx || this;
			var fn = this.get(name);
			var _fn = store[this.id].cabinet.filter(function (item) {
				return item.bind === fn;
			})[0];

			args = (utils.getType(args, 'array')) ? args : [args];

			if ((utils.getType(name, 'string')) && (utils.getType(fn, 'function'))) {
				if (_fn) {
					fn = _fn ? _fn.fn : fn;
					return utils.run
						.apply(ctx, [_fn.args[0], fn, this]
						.concat(args));
				}
				return fn.apply(ctx, args);
			}
			return false;
		},

		// Retrieve a named item from the registry. You can use dot-notation
		// in the passed string. The method will return `false` if the item
		// does not exist.
		get: function (name) {
			var reg = store[this.id].registry;
			
			// Raise a "get" event, passing the name
			utils.fire('get', this.id, [name]);
			
			if (utils.getType(name, 'string')) {
				var obj = utils.getObj(name, reg, store[this.id].separator);
				if (!utils.getType(obj, 'undefined')) {
					return obj;
				}
				return false;
			}
			return reg;
		},

		// Set a named item from the registry. As with `get`, you can 
		// use dot-notation in the passed string. The method will throw
		// an exception if you try to set something that doesn't
		// exist.
		set: function (name, value, bindings) {
			var
				reg = store[this.id].registry,
				sep = store[this.id].separator,
				arr = name.split(sep),
				str = (arr.length > 1) ? arr.pop() : false,
				prn;

			// Test the existence of the key we're trying to set. The getObj function
			// simply returns the key value, which could be `undefined`. Thus, we need to
			// first establish if the value is undefined because the key doesn't exist,
			// or if it *does* exist but its value is `undefined`. In the former case we
			// throw an error.
			if (utils.getObj(name, reg, sep) === undefined) {
				prn = utils.getObj(arr.join(sep), reg, sep);

				if (str) {
					if ((prn && !hasProp.call(prn, str)) || !prn) {
						throw new Error('Key "' + name +
							'" does not exist in the map!');
					}
				} else if (!hasProp.call(reg, arr.toString())) {
					throw new Error('Key "' + name +
						'" does not exist in the map!');
				}
			}

			if (utils.getType(value, 'function') && bindings) {
				value = this.on(bindings, value);
			}

			if (str) {
				utils.setObj(arr.join(sep), reg, sep)[str] = value;
			} else {
				reg[arr.toString()] = value;
			}

			// Raise a "set" event, passing the name and value
			utils.fire('set', this.id, [name, value]);

			return this;
		},

		// Wrap a previously bound method in another `wrapper` function.
		// The original function is passed as the first argument to the
		// wrapper.
		wrap: function (fn, wrapper, ctx) {
			ctx = ctx || this;
			var match = store[this.id].cabinet.filter(function (item) {
				return item.bind === fn;
			})[0];

			if (match) {
				return function () {
					var args = slice.call(arguments);
					return wrapper.apply(ctx, [

						function () {
							args = arguments.length ? arguments : args;
							return match.bind.apply(ctx, args);
						}
					].concat(args));
				};
			}
			return false;
		},

		// Copy an existing bound function `fn` where the copy
		// has different registry bindings, provided by the
		// `bindings` argument. You can also provide an optional
		// execution context.
		copy: function (bindings, fn, ctx) {
			ctx = ctx || this;
			var cab = store[this.id].cabinet;
			var match = cab.filter(function (item) {
				return item.bind === fn;
			})[0];

			if (match) {
				var obj = {
					fn: fn,
					ctx: slice.call(arguments)[0],
					bind: utils.run.bind(match.ctx, bindings, match.fn, this)
				};
				cab.push(obj);
				return obj.bind;
			}
			return false;
		},

		// Attach callbacks to add, set, get, remove, or all action types. The
		// event stack associated with each action will be called when
		// the action is executed.
		listen: function (name, fn) {

			var path = name.split(':');
			name = path.shift();

			if (utils.getType(name, 'string') && utils.getType(fn, 'function')) {

				var proc = function (path, arr) {
					if (utils.getType(arr, 'array')) {
						arr.push({
							path: path.length ? path[0] : false,
							fn	: fn
						});
					}
				};

				var events = store[this.id].events;

				if (name !== 'all') {
					proc(path, events[name]);
				}
				else {
					for (var key in store[this.id].events) {
						if (hasProp.call(events, key)) {
							proc(path, events[key]);
						}
					}
				}
			}
			return this;
		},		

		// Create a new Syringe object
		create: function (props) {
			return new Syringe(props);
		}
	};

	// Allow mixins to be added to the prototype
	proto.mixin = function (obj) {
		if (utils.getType(obj, 'object')) {
			Object.keys(obj).forEach(function (key) {
				if (utils.getType(obj[key], 'function')) {
					proto[key] = obj[key];
				}
			});
			return this;
		}
		return false;
	};

	// Create some method aliases
	proto.bind			= proto.on;
	proto.register		= proto.add;
	proto.unregister	= proto.remove;

	// Add the current semver
	proto.VERSION = '0.6.5';

	// Determine local context
	if (this.window) {
		proto.fetch	= utils.fetch;
		root.Syringe = new Syringe();
	} else if (typeof module !== 'undefined' && module.exports) {
		exports = module.exports = new Syringe();
	}

}.call(this));