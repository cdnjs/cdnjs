webshim.register('url', function($, webshims, window, document, undefined, options){
'use strict';

// URL Polyfill
// Draft specification: http://url.spec.whatwg.org

// Notes:
// - Primarily useful for parsing URLs and modifying query parameters
// - Should work in IE8+ and everything more modern

	(function (global) {
		// Browsers may have:
		// * No global URL object
		// * URL with static methods only - may have a dummy constructor
		// * URL with members except searchParams
		// * Full URL API support
		var origURL = global.URL;
		var nativeURL;
		try {
			if (origURL) {
				nativeURL = new global.URL('http://example.com');
				if ('searchParams' in nativeURL)
					return;
				if (!('href' in nativeURL))
					nativeURL = undefined;
			}
		} catch (_) {}

		function URLUtils(url) {
			if (nativeURL)
				return new origURL(url);
			var anchor = document.createElement('a');
			anchor.href = url;
			return anchor;
		}

		global.URL = function URL(url, base) {
			if (!(this instanceof global.URL))
				throw new TypeError("Failed to construct 'URL': Please use the 'new' operator.");

			if (base) {
				url = (function () {
					if (nativeURL) return new origURL(url, base).href;

					var doc;
					// Use another document/base tag/anchor for relative URL resolution, if possible
					if (document.implementation && document.implementation.createHTMLDocument) {
						doc = document.implementation.createHTMLDocument('');
					} else if (document.implementation && document.implementation.createDocument) {
						doc = document.implementation.createElement('http://www.w3.org/1999/xhtml', 'html', null);
						doc.documentElement.appendChild(doc.createElement('head'));
						doc.documentElement.appendChild(doc.createElement('body'));
					} else if (window.ActiveXObject) {
						doc = new window.ActiveXObject('htmlfile');
						doc.write('<head></head><body></body>');
						doc.close();
					}

					if (!doc) throw Error('base not supported');

					var baseTag = doc.createElement('base');
					baseTag.href = base;
					doc.getElementsByTagName('head')[0].appendChild(baseTag);
					var anchor = doc.createElement('a');
					anchor.href = url;
					return anchor.href;
				}());
			}

			// An inner object implementing URLUtils (either a native URL
			// object or an HTMLAnchorElement instance) is used to perform the
			// URL algorithms. With full ES5 getter/setter support, return a
			// regular object For IE8's limited getter/setter support, a
			// different HTMLAnchorElement is returned with properties
			// overridden

			var instance = URLUtils(url || '');

			// Detect for ES5 getter/setter support
			var ES5_GET_SET = (Object.defineProperties && (function () {
				var o = {}; Object.defineProperties(o, { p: { 'get': function () { return true; } } }); return o.p;
			}()));

			var self = ES5_GET_SET ? this : document.createElement('a');

			// NOTE: Doesn't do the encoding/decoding dance
			function parse(input, isindex) {
				var sequences = input.split('&');
				if (isindex && sequences[0].indexOf('=') === -1)
					sequences[0] = '=' + sequences[0];
				var pairs = [];
				sequences.forEach(function (bytes) {
					if (bytes.length === 0) return;
					var index = bytes.indexOf('=');
					if (index !== -1) {
						var name = bytes.substring(0, index);
						var value = bytes.substring(index + 1);
					} else {
						name = bytes;
						value = '';
					}
					name = name.replace(/\+/g, ' ');
					value = value.replace(/\+/g, ' ');
					pairs.push({ name: name, value: value });
				});
				var output = [];
				pairs.forEach(function (pair) {
					output.push({
						name: decodeURIComponent(pair.name),
						value: decodeURIComponent(pair.value)
					});
				});
				return output;
			}

			function URLSearchParams(url_object, init) {
				var pairs = [];
				if (init)
					pairs = parse(init);

				this._setPairs = function (list) { pairs = list; };
				this._updateSteps = function () { updateSteps(); };

				var updating = false;
				function updateSteps() {
					if (updating) return;
					updating = true;

					// TODO: For all associated url objects
					url_object.search = serialize(pairs);

					updating = false;
				}

				// NOTE: Doesn't do the encoding/decoding dance
				function serialize(pairs) {
					var output = '', first = true;
					pairs.forEach(function (pair) {
						var name = encodeURIComponent(pair.name);
						var value = encodeURIComponent(pair.value);
						if (!first) output += '&';
						output += name + '=' + value;
						first = false;
					});
					return output.replace(/%20/g, '+');
				}

				Object.defineProperties(this, {
					append: {
						value: function (name, value) {
							pairs.push({ name: name, value: value });
							updateSteps();
						}
					},

					'delete': {
						value: function (name) {
							for (var i = 0; i < pairs.length;) {
								if (pairs[i].name === name)
									pairs.splice(i, 1);
								else
									++i;
							}
							updateSteps();
						}
					},

					get: {
						value: function (name) {
							for (var i = 0; i < pairs.length; ++i) {
								if (pairs[i].name === name)
									return pairs[i].value;
							}
							return null;
						}
					},

					getAll: {
						value: function (name) {
							var result = [];
							for (var i = 0; i < pairs.length; ++i) {
								if (pairs[i].name === name)
									result.push(pairs[i].value);
							}
							return result;
						}
					},

					has: {
						value: function (name) {
							for (var i = 0; i < pairs.length; ++i) {
								if (pairs[i].name === name)
									return true;
							}
							return false;
						}
					},

					set: {
						value: function (name, value) {
							var found = false;
							for (var i = 0; i < pairs.length;) {
								if (pairs[i].name === name) {
									if (!found) {
										pairs[i].value = value;
										found = true;
										++i;
									} else {
										pairs.splice(i, 1);
									}
								} else {
									++i;
								}
							}

							if (!found)
								pairs.push({ name: name, value: value });

							updateSteps();
						}
					},

					toString: {
						value: function () {
							return serialize(pairs);
						}
					}
				});
			};

			var queryObject = new URLSearchParams(
				self, instance.search ? instance.search.substring(1) : null);

			Object.defineProperties(self, {
				href: {
					get: function () { return instance.href; },
					set: function (v) { instance.href = v; tidy_instance(); update_steps(); }
				},
				origin: {
					get: function () {
						if ('origin' in instance) return instance.origin;
						return this.protocol + '//' + this.host;
					}
				},
				protocol: {
					get: function () { return instance.protocol; },
					set: function (v) { instance.protocol = v; }
				},
				username: {
					get: function () { return instance.username; },
					set: function (v) { instance.username = v; }
				},
				password: {
					get: function () { return instance.password; },
					set: function (v) { instance.password = v; }
				},
				host: {
					get: function () {
						// IE returns default port in |host|
						var re = {'http:': /:80$/, 'https:': /:443$/, 'ftp:': /:21$/}[instance.protocol];
						return re ? instance.host.replace(re, '') : instance.host;
					},
					set: function (v) { instance.host = v; }
				},
				hostname: {
					get: function () { return instance.hostname; },
					set: function (v) { instance.hostname = v; }
				},
				port: {
					get: function () { return instance.port; },
					set: function (v) { instance.port = v; }
				},
				pathname: {
					get: function () {
						// IE does not include leading '/' in |pathname|
						if (instance.pathname.charAt(0) !== '/') return '/' + instance.pathname;
						return instance.pathname;
					},
					set: function (v) { instance.pathname = v; }
				},
				search: {
					get: function () { return instance.search; },
					set: function (v) {
						if (instance.search === v) return;
						instance.search = v; tidy_instance(); update_steps();
					}
				},
				searchParams: {
					get: function () { return queryObject; }
					// TODO: implement setter
				},
				hash: {
					get: function () { return instance.hash; },
					set: function (v) { instance.hash = v; tidy_instance(); }
				},
				toString: {
					value: function() { return instance.toString(); }
				},
				valueOf: {
					value: function() { return instance.valueOf(); }
				}
			});

			function tidy_instance() {
				var href = instance.href.replace(/#$|\?$|\?(?=#)/g, '');
				if (instance.href !== href)
					instance.href = href;
			}

			function update_steps() {
				queryObject._setPairs(instance.search ? parse(instance.search.substring(1)) : []);
				queryObject._updateSteps();
			};

			return self;
		};

		if (origURL) {
			for (var i in origURL) {
				if (origURL.hasOwnProperty(i))
					global.URL[i] = origURL[i];
			}
		}

	}(window));

});
