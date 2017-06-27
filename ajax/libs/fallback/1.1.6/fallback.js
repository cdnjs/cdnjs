/* fallback.js v1.1.6 | http://fallback.io/ | Salvatore Garbesi <sal@dolox.com> | (c) 2013 Dolox Inc. */

(function (window, document) {
	'use strict';

	var fallback = {
		// Callback storage from .ready and inline callback.
		callbacks: [],

		// Libraries that have completed/exhausted.
		completed: {},
		completed_count: 0,

		// Page `head` element.
		head: document.getElementsByTagName('head')[0],

		// Libraries that are imported are stored here.
		libraries: {},
		libraries_count: 0,

		// Spawned libraries, so they don't run over themselves.
		spawned: [],

		// Libraries that failed to load.
		failed: {},
		failed_count: 0,

		// Shims that are imported are stored here.
		shims: {},

		// Libraries successfully loaded.
		success: {},
		success_count: 0
	};

	// Bootstrap our library.
	fallback.bootstrap = function() {
		var index;

		for (index in fallback.utilities) {
			if (fallback.utilities[index]) {
				fallback.utility(fallback.utilities[index]);
			}
		}
	};

	// Utility functions to check against variables.
	fallback.utilities = ['Array', 'Function', 'Object', 'String'];

	// Setup individual utility function.
	fallback.utility = function(type) {
		fallback['is_' + type.toLowerCase()] = function(variable) {
			/*eslint-disable*/
			return Object.prototype.toString.call(variable) == '[object ' + type + ']';
			/*eslint-enable*/
		};
	};

	// Check if our variable is a function, if not make it one.
	fallback.callback = function(variable) {
		var me = this;

		if (!me.is_function(variable)) {
			variable = function() {};
		}

		return variable;
	};

	// indexOf isn't supported on arrays in older versions of IE!
	fallback.index_of = function(object, value) {
		var index;

		for (index in object) {
			if (object[index] === value) {
				return index;
			}
		}

		return -1;
	};

	// Check if our variable is defined.
	fallback.is_defined = function(variable) {
		try {
			/*eslint-disable*/
			if (eval('window.' + variable)) {
				return true;
			}
			/*eslint-enable*/
		} catch (exception) {
			return false;
		}

		return false;
	};

	// Import and cleanse libraries from user input.
	fallback.importer = function(libraries, options) {
		var me = this;
		var current, index;
		var library, urls;
		var cleansed_shims, shim, shims;
		var shim_libraries, shim_libraries_cleansed;

		// Cleanse the libraries.
		var cleansed_libraries = {};

		for (library in libraries) {
			// URL list for each library.
			urls = libraries[library];

			// If `urls` is undefined, null or an empty string, skip, it's invalid.
			if (!urls) {
				continue;
			}

			// If `urls` is a string, convert it to any array.
			if (me.is_string(urls)) {
				urls = [urls];
			}

			// If `urls` is not an array, skip, it's invalid.
			if (!me.is_array(urls)) {
				continue;
			}

			// Check to see if the library already exists, if it does, merge the new URLs.
			current = [];

			if (me.is_array(me.libraries[library])) {
				current = me.libraries[library];
			}

			cleansed_libraries[library] = urls;
			me.libraries[library] = current.concat(urls);
		}

		// Cleanse the shims.
		cleansed_shims = {};

		if (me.is_object(options)) {
			// Shim aliases, `deps` and dependencies`.
			if (!me.is_object(options.shim)) {
				if (me.is_object(options.deps)) {
					options.shim = options.deps;
				} else if (me.is_object(options.dependencies)) {
					options.shim = options.dependencies;
				}
			}

			if (me.is_object(options.shim)) {
				shims = options.shim;

				for (shim in shims) {
					shim_libraries = shims[shim];

					// If `shim` doesn't exist in libraries, skip, it's invalid.
					if (!me.libraries[shim]) {
						continue;
					}

					// If `shim_libraries` is undefined, null or an empty string, skip, it's invalid.
					if (!shim_libraries) {
						continue;
					}

					// If `shim_libraries` is a string, convert it to any array.
					if (me.is_string(shim_libraries)) {
						shim_libraries = [shim_libraries];
					}

					// If `shim_libraries` is not an array, skip, it's invalid.
					if (!me.is_array(shim_libraries)) {
						continue;
					}

					// Check to make sure the libraries exist otherwise remove them.
					shim_libraries_cleansed = [];

					for (index in shim_libraries) {
						library = shim_libraries[index];

						// Make sure the library actually exists and that it's not itself.
						if (me.libraries[library] && library !== shim) {
							shim_libraries_cleansed.push(library);
						}
					}

					// Check to see if the shim already exists, if it does, merge the new shims.
					current = [];

					if (me.is_array(me.shims[shim])) {
						current = me.shims[shim];
					}

					cleansed_shims[shim] = shim_libraries_cleansed;
					me.shims[shim] = current.concat(shim_libraries_cleansed);
				}
			}
		}

		return {
			libraries: cleansed_libraries,
			shims: cleansed_shims
		};
	};

	// CSS check if selector exists.
	fallback.css = {};

	fallback.css.check = function(selector) {
		var me = fallback;

		if (!document.styleSheets) {
			return false;
		}

		var index, stylesheet, found;

		for (index in document.styleSheets) {
			stylesheet = document.styleSheets[index];

			if (stylesheet === 0) {
				continue;
			}

			// Issues with CORS at times, don't let the script bomb.
			try {
				if (stylesheet.rules) {
					found = me.css.scan(stylesheet.rules, selector);

					if (found) {
						return found;
					}
				}

				if (stylesheet.cssRules) {
					found = me.css.scan(stylesheet.cssRules, selector);

					if (found) {
						return found;
					}
				}
			} catch (e) {
				continue;
			}
		}

		return false;
	};

    fallback.css.scan = function(ruleset, selector) {
		var index, rule;

		for (index in ruleset) {
			rule = ruleset[index];

			if (rule.selectorText === selector) {
				return true;
			}
		}

		return false;
    };

	// Spawn an instance of the library.
	fallback.load = function(libraries, options, callback) {
		var me = this;
		var imported, library, urls;

		// If `libraries` is not a object, die out.
		if (!me.is_object(libraries)) {
			return false;
		}

		// If `options` is a function, then it needs to become the callback.
		if (me.is_function(options)) {
			callback = options;
			options = {};
		}

		// If `options` is not an object, convert it.
		if (!me.is_object(options)) {
			options = {};
		}

		// Import libraries.
		imported = me.importer(libraries, options);

		// Spawn library instances from user input.
		for (library in imported.libraries) {
			urls = imported.libraries[library];

			if (!me.shims[library]) {
				me.spawn(library, urls);
			}
		}

		// Fork the callback over to the `ready` function.
		if (me.is_function(options['callback'])) {
			me.ready([], options['callback']);
		}

		if (me.is_function(callback)) {
			me.ready([], callback);
		}
	};

	// Callback array of objects.
	fallback.ready = function(libraries, callback) {
		var me = this;
		var index, library;

		if (me.is_function(libraries)) {
			callback = libraries;
			libraries = [];
		} else {
			if (!me.is_array(libraries) || me.is_string(libraries)) {
				libraries = [libraries];
			}

			for (index in libraries) {
				library = libraries[index];

				if (me.libraries[library] && !me.shims[library]) {
					me.spawn(library, me.libraries[library]);
				}
			}
		}

		me.callbacks.push({
			callback: me.callback(callback),
			libraries: libraries
		});

		return me.ready_invocation();
	};

	// Invoke any `ready` callbacks.
	fallback.ready_invocation = function() {
		var me = this, index, count, library, wipe, payload, processed = [], callbacks = [];

		for (index in me.callbacks) {
			// If callback is not an object, skip and remove it;
			payload = me.callbacks[index];

			if (!me.is_object(payload) || !me.is_array(payload.libraries) || !me.is_function(payload.callback)) {
				continue;
			}

			wipe = false;

			if (payload.libraries.length > 0) {
				count = 0;

				for (library in me.success) {
					if (me.index_of(payload.libraries, library) >= 0) {
						count++;
					}
				}

				if (count === payload.libraries.length) {
					wipe = true;
				}
			} else if (me.libraries_count === me.success_count + me.failed_count) {
				wipe = true;
			}

			if (wipe) {
				callbacks.push(payload.callback);
			} else {
				processed.push(me.callbacks[index]);
			}
		}

		me.callbacks = processed;

		// We need to process the callbacks here that way they can run in parallel as well in nested callbacks and not get caught in a endless loop.
		for (index in callbacks) {
			callbacks[index](me.success, me.failed);
		}
	};

	// Invoke any `shim` dependencies.
	fallback.shim_invocation = function() {
		var me = this;
		var count, index, shim, shimming;

		for (shim in me.shims) {
			shimming = me.shims[shim];

			// If there are no shims, or the if the shim is already loaded, skip it.
			if (!shimming || me.success[shim]) {
				continue;
			}

			// Reset our counter back to 0.
			count = 0;

			// Iterate through shim dependencies and find out of all dependencies for shim were loaded.
			for (index in shimming) {
				if (me.success[shimming[index]]) {
					count++;
				}
			}

			// If all dependencies were loaded, spawn the shim.
			if (count === shimming.length) {
				me.spawn(shim, me.libraries[shim]);

				// Remove the shim from shim list that way it doesn't try to load it again.
				delete me.shims[shim];
			}
		}
	};

	// Initialize the spawning of a library.
	fallback.spawn = function(library, urls) {
		var me = this;

		// Library is already attempting to be loaded.
		if (me.index_of(me.spawned, library) !== -1) {
			return false;
		}

		me.libraries_count++;
		me.spawned.push(library);

		return me.spawn.instance(library, urls);
	};

	// Spawn a url from the library.
	fallback.spawn.instance = function(library, urls) {
		var me = fallback;
		var element;
		var type = 'js';

		var payload = {
			loaded: false,
			library: library,
			spawned: true,
			url: urls.shift(),
			urls: urls
		};

		if (payload.url.indexOf('.css') > -1) {
			type = 'css';

			// CSS selector already exists, do not attempt to spawn library.
			if (me.css.check(library)) {
				payload.spawned = false;
				return me.spawn.success(payload);
			}

			element = document.createElement('link');
			element.crossorigin = true;
			element.rel = 'stylesheet';
			element.href = payload.url;
		} else {
			// JavaScript variable already exists, do not attempt to spawn library
			if (me.is_defined(library)) {
				payload.spawned = false;
				return me.spawn.success(payload);
			}

			element = document.createElement('script');
			element.src = payload.url;
		}

		element.onload = function() {
			// Checks for JavaScript library.
			if (type === 'js' && !me.is_defined(library)) {
				return me.spawn.failed(payload);
			}

			// Needed for IE11 especially. `onload` is fired even when there's a 404 for `link` elements.
			if (!me.css.check(library) && Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) {
				return me.spawn.failed(payload);
			}

			return me.spawn.success(payload);
		};

		element.onreadystatechange = function() {
			if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
				this.onreadystatechange = null;

				if (type === 'js' && !me.is_defined(library)) {
					return me.spawn.failed(payload);
				}

				return me.spawn.success(payload);
			}
		};

		element.onerror = function() {
			return me.spawn.failed(payload);
		};

		return me.head.appendChild(element);
	};

	// Spawn failure callback.
	fallback.spawn.failed = function(payload) {
		var me = fallback;
		payload.spawned = false;

		if (!me.failed[payload.library]) {
			me.failed[payload.library] = [];
		}

		me.failed[payload.library].push(payload.url);

		// All URLs for the library have exhausted.
		if (!payload.urls.length) {
			me.failed_count++;
			return me.ready_invocation();
		}

		// Attempt to spawn another URL.
		return me.spawn.instance(payload.library, payload.urls);
	};

	// Spawn success callback.
	fallback.spawn.success = function(payload) {
		var me = fallback;

		// Mark the library and url as successful.
		if (!payload.loaded) {
			payload.loaded = true;
			me.success[payload.library] = payload.url;
			me.success_count++;
		}

		// Invoke any `shim` dependencies.
		me.shim_invocation();

		// Invoke any `ready` callbacks.
		return me.ready_invocation();
	};

	fallback.bootstrap();

	window.fallback = window.fbk = fallback;
}(window, document));
