/* fallback.js v1.0.5 | https://github.com/dolox/fallback/ | Salvatore Garbesi <sal@dolox.com> | (c) 2013 Dolox Inc. */

(function(window) {
	'use strict';

	var fallback = {
		callback: null,
		callbacks: [],

		head: document.getElementsByTagName('head')[0],

		libraries: {},
		libraries_count: 0,

		loaded: {},
		loaded_count: 0,

		fail: {},
		fail_count: 0,

		shim: {}
	};

	fallback.is_array = function(variable) {
		if (variable instanceof Array) {
			return true;
		}

		return false;
	};

	fallback.is_defined = function(variable) {
		/* jslint evil: true */
		if (eval('window.' + variable)) {
			return true;
		}
		
		return false;
	};

	fallback.is_function = function(variable) {
		if (({}).toString.call(variable) === '[object Function]') {
			return true;
		}

		return false;
	};

	fallback.is_object = function(variable) {
		if (typeof variable === 'object') {
			return true;
		}

		return false;
	};

	fallback.index_of = function(object, value) {
		var index;

		for (index in object) {
			if (object[index] === value) {
				return index;
			}
		}

		return -1;
	};

	fallback.initialize = function() {
		var library, urls;

		for (library in this.libraries) {
			if (this.libraries[library]) {
				urls = this.libraries[library];

				if (!this.is_array(urls)) {
					this.libraries[library] = urls = [urls];
				}

				this.libraries_count++;

				if (!this.shim[library]) {
					this.spawn(library, urls[0], 0);
				}
			}
		}
	};

	fallback.completed = function() {
		this.ready_invocation();

		if (this.libraries_count === this.loaded_count + this.fail_count) {
			if (this.is_function(this.callback)) {
				this.callback(this.loaded, this.fail);
			}

			this.callback = null;
		}
	};

	fallback.error = function(library, index) {
		index = parseInt(index,0);

		if (!this.fail[library]) {
			this.fail[library] = [];
		}

		this.fail[library][this.fail[library].length] = this.libraries[library][index];

		if (index < this.libraries[library].length - 1) {
			this.spawn(library, this.libraries[library][index + 1], index + 1);
		} else {
			this.fail_count++;
		}

		this.completed();
	};

	fallback.load = function(libraries, options, callback) {
		if (this.is_function(options)) {
			callback = options;
			options = {};
		}

		if (!this.is_object(options)) {
			options = {};
		}

		if (options.shim) {
			this.shim = options.shim;
		}

		if (!this.is_function(callback)) {
			callback = function() {};
		}

		this.callback = callback;
		this.libraries = libraries;
		this.initialize();
	};

	fallback.ready = function(libraries, callback) {
		var options = {
			callback: callback,
			libraries: libraries
		};

		if (!this.is_array(libraries)) {
			options.callback = libraries;
			options.libraries = [];
		}

		this.callbacks[this.callbacks.length] = options;
		this.ready_invocation();
	};

	fallback.ready_invocation = function() {
		var index, options, count, library, wipe;

		for (index in this.callbacks) {
			if (this.is_object(this.callbacks[index])) {
				options = this.callbacks[index];
				wipe = false;

				if (options.libraries.length > 0) {
					count = 0;

					for (library in this.loaded) {
						if (this.index_of(options.libraries, library) >= 0) {
							count++;
						}
					}

					if (count === options.libraries.length) {
						options.callback();
						wipe = true;
					}
				} else if (this.libraries_count === this.loaded_count + this.fail_count) {
					options.callback(this.loaded, this.fail);
					wipe = true;
				}

				if (wipe) {
					delete this.callbacks[index];
				}
			}
		}
	};

	fallback.spawn = function(library, url, index) {
		var element;

		if (this.is_defined(library)) {
			return fallback.success(library, index);
		}

		if (url.indexOf('.css') > -1) {
			element = document.createElement('link');
			element.rel = 'stylesheet';
			element.href = url;
		} else {
			element = document.createElement('script');
			element.src = url;
		}

		element.onload = function() {
			fallback.success(library, index);
		};

		element.onreadystatechange = function() {
			if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
				this.onreadystatechange = null;

				if (!fallback.is_defined(library)) {
					fallback.error(library, index);
				} else {
					fallback.success(library, index);
				}
			}
		};

		element.onerror = function() {
			fallback.error(library, index);
		};

		this.head.appendChild(element);
	};

	fallback.success = function(library, index) {
		this.loaded[library] = this.libraries[library][index];
		this.loaded_count++;

		if (this.shim) {
			this.shim_invocation(library);
		}

		this.completed();
	};

	fallback.shim_invocation = function() {
		var count, index, shim, shimming;

		for (shim in this.shim) {
			if (this.shim[shim]) {
				shimming = this.shim[shim];
				count = 0;

				if (!this.loaded[shim]) {
					for (index in shimming) {
						if (this.loaded[shimming[index]]) {
							count++;
						}
					}

					if (count === shimming.length) {
						this.spawn(shim, this.libraries[shim][0], 0);
						delete this.shim[shim];
					}
				}
			}
		}
	};

	window.fallback = fallback;
})(window);