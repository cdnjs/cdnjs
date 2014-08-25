/* version: 0.1.16 */
var Absurd = (function(w) {
var lib = { 
	api: {},
	helpers: {},
	plugins: {},
	processors: { 
		css: { plugins: {}},
		html: { 
			plugins: {},
			helpers: {}
		},
		component: { plugins: {}}
	}
};
var require = function(v) {
	// css preprocessor
	if(v.indexOf('css/CSS.js') > 0) {
		return lib.processors.css.CSS;
	} else if(v.indexOf('html/HTML.js') > 0) {
		return lib.processors.html.HTML;
	} else if(v.indexOf('component/Component.js') > 0) {
		return lib.processors.component.Component;
	} else if(v == 'js-beautify') {
		return { 
			html: function(html) {
				return html;
			}
		}
	} else if(v == './helpers/PropAnalyzer') {
		return lib.processors.html.helpers.PropAnalyzer;
	} else if(v == '../../helpers/TransformUppercase') {
		return lib.helpers.TransformUppercase;
	} else if(v == './helpers/TemplateEngine') {
		return lib.processors.html.helpers.TemplateEngine;
	} else {
		return function() {}
	}
};
var __dirname = "";
var components = function(absurd) {
	var api = {},
		comps = {},
		cssCache = {},
		htmlCache = {};

	// utils
	var select = function(selector) {
		var result = document.querySelectorAll(selector);
		if(result.length === 1) { 
			return result[0]; 
		} else if(result.length === 0) {
			return null;
		} else { 
			return result; 
		}
	}
	var str2DOMElement = function(html) {
	    var frame = document.createElement('iframe');
	    frame.style.display = 'none';
	    document.body.appendChild(frame);             
	    frame.contentDocument.open();
	    frame.contentDocument.write(html);
	    frame.contentDocument.close();
	    var el = frame.contentDocument.body.firstChild;
	    document.body.removeChild(frame);
	    return el;
	}
	var addEventListener = function(obj, evt, fnc) {
	    if (obj.addEventListener) { // W3C model
	        obj.addEventListener(evt, fnc, false);
	        return true;
	    } else if (obj.attachEvent) { // Microsoft model
	        return obj.attachEvent('on' + evt, fnc);
	    }
	}

	// A base class of the component
	var Component = function(componentName) {
		var listeners = [];
		return {
			name: componentName,
			on: function(eventName, callback) {
				if(!listeners[eventName]) {
					listeners[eventName] = [];
				}
				listeners[eventName].push(callback);
				return this;
			},
			off: function(eventName, handler) {
				if(!listeners[eventName]) return this;
				if(!handler) listeners[eventName] = []; return this;
				var newArr = [];
				for(var i=0; i<listeners[eventName].length; i++) {
					if(listeners[eventName][i] !== handler) {
						newArr.push(listeners[eventName][i]);
					}
				}
				listeners[eventName] = newArr;
				return this;
			},
			dispatch: function(eventName, data) {
				if(listeners[eventName]) {
					for(var i=0; i<listeners[eventName].length; i++) {
						var callback = listeners[eventName][i];
						callback(data);
					}
				}
				if(this[eventName] && typeof this[eventName] === 'function') {
					this[eventName](data);
				}
				return this;
			},
			render: function(selector, data) {
				var self = this,
					cssC = cssCache,
					htmlC = htmlCache;

				var handleCSS = function(css) {
					if(!cssC[self.name]) {
						var style = document.createElement("style");
					    style.setAttribute("id", self.name + '-css');
					    style.setAttribute("type", "text/css");
					    style.innerHTML = css;
						select("head").appendChild(style);
						cssC[self.name] = { css: css };
					} else if(cssC[self.name].css !== css) {
						select('#' + self.name + '-css').innerHTML = css;
					}
				}

				var handleHTML = function(html) {
					if(!htmlC[self.name]) {
						var el = str2DOMElement(html);
						select(selector).appendChild(el);
						htmlC[self.name] = { html: html, element: el };
					} else if(htmlC[self.name].html !== html) {
						var newElement = str2DOMElement(html);
						htmlC[self.name].element.parentNode.replaceChild(newElement, htmlC[self.name].element);
						htmlC[self.name].element = newElement;
					}
					handleDataAttributes(htmlC[self.name].element);
				}

				var handleDataAttributes = function(element) {
					var events = element.querySelectorAll('[data-absurd-event]');
					var handleEventAttribute = function(el) {
						var value = el.getAttribute("data-absurd-event");
						if(value !== null) {
							value = value.split(":");
							addEventListener(el, value[0], function() {
								if(typeof self[value[1]] === 'undefined') {
									throw new Error("There is no method with name '" + value[1] + "'.");
								} else {
									self[value[1]].call(self, arguments);
								}
							});
						}
					}
					for(var i=0; i<events.length, el=events[i]; i++) {
						handleEventAttribute(el);
					}
					handleEventAttribute(element);
				}

				// prepare HTML if it is already a DOM element
				if(this.html && typeof this.html === 'string' && !htmlC[this.name]) {
					var element = select(this.html);
					if(element != null) {
						this.html = element.outerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
						htmlC[this.name] = {
							html: this.html,
							element: element,
							alreadyAddedDOM: true
						}
					}
				}

				// css & html
				absurd.flush().morph("component").add(this).compile(function(err, css, html) {
					css != '' ? handleCSS(css) : null;
					html != '' ? handleHTML(html) : null;
				}, api.extend({minify: true}, this));

				self.dispatch("rendered");
			}
		}
	}

	// components API
	api.register = function(name, comp) {
		return comps[name] = api.extend({}, Component(name), comp);
	}
	api.get = function(name) {
		if(comps[name]) { return comps[name]; }
		else { throw new Error("There is no component with name '" + name + "'."); }
	}
	api.remove = function(name) {
		if(comps[name]) { delete comps[name]; return true; }
		return false;
	}
	api.list = function() {
		var l = [];
		for(var name in comps) l.push(name);
		return l;
	}
	api.flush = function() {
		comps = {};
	}
	api.extend = function() {
		var process = function(destination, source) {	
		    for (var key in source) {
				if (hasOwnProperty.call(source, key)) {
				    destination[key] = source[key];
				}
		    }
		    return destination;
		};
		var result = arguments[0];
		for(var i=1; i<arguments.length; i++) {
			result = process(result, arguments[i]);
		}
		return result;
	}
	
	return api;
}
var client = function() {
	return function(arg) {

		/******************************************* Copied directly from /lib/API.js */

		var extend = function(destination, source) {
			for (var key in source) {
				if (hasOwnProperty.call(source, key)) {
					destination[key] = source[key];
				}
			}
			return destination;
		};

		var _api = { defaultProcessor: lib.processors.css.CSS() },
			_rules = {},
			_storage = {},
			_plugins = {},
			_hooks = {};

		_api.getRules = function(stylesheet) {
			if(typeof stylesheet === 'undefined') {
				return _rules;
			} else {
				if(typeof _rules[stylesheet] === 'undefined') {
					_rules[stylesheet] = [];
				}
				return _rules[stylesheet];
			}
		}
		_api.getPlugins = function() {
			return _plugins;		
		}
		_api.getStorage = function() {
			return _storage;
		}
		_api.flush = function() {
			_rules = {};
			_storage = [];
			_hooks = {};
			_api.defaultProcessor = lib.processors.css.CSS();
			return _api;
		}
		_api.import = function() { 
			if(_api.callHooks("import", arguments)) return _api;
			return _api; 
		}

		// hooks
		_api.addHook = function(method, callback) {
			if(!_hooks[method]) _hooks[method] = [];
			var isAlreadyAdded = false;
			for(var i=0; c=_hooks[method][i]; i++) {
				if(c === callback) {
					isAlreadyAdded = true;
				}
			}
			isAlreadyAdded === false ? _hooks[method].push(callback) : null;
		}
		_api.callHooks = function(method, args) {
			if(_hooks[method]) {
				for(var i=0; c=_hooks[method][i]; i++) {
					if(c.apply(_api, args) === true) return true;
				}
			}
			return false;
		}

		// internal variables
		_api.numOfAddedRules = 0;
		_api.components = components(_api);

		/******************************************* Copied directly from /lib/API.js */

		// client side specific methods 
		_api.compile = function(callback, options) {
			if(_api.callHooks("compile", arguments)) return _api;
			var defaultOptions = {
				combineSelectors: true,
				minify: false,
				processor: _api.defaultProcessor,
				keepCamelCase: false,
				api: _api
			};
			options = extend(defaultOptions, options || {});
			options.processor(
				_api.getRules(),
				callback || function() {},
				options
			);
			_api.flush();
		}

		// registering api methods
		for(var method in lib.api) {
			if(method !== "compile") {
				_api[method] = lib.api[method](_api);
				_api[method] = (function(method) {
					return function() {
						var f = lib.api[method](_api);
						if(_api.callHooks(method, arguments)) return _api;
						return f.apply(_api, arguments);
					}
				})(method);		
			}
		}

		// registering plugins
		for(var pluginName in lib.plugins) {
			_api.plugin(pluginName, lib.plugins[pluginName]());
		}

		// accept function
		if(typeof arg === "function") {
			arg(_api);
		}

		return _api;

	}
}
lib.api.add = function(API) {
	var checkAndExecutePlugin = function(selector, prop, value, stylesheet) {
		var plugin = API.getPlugins()[prop];
		if(typeof plugin !== 'undefined') {
			var pluginResponse = plugin(API, value);
			if(pluginResponse) {
				addRule(selector, pluginResponse, stylesheet);
			}
			return true;
		} else {
			return false;
		}
	}
	var clearing = function(props) {
		// plugins
		var plugins = API.getPlugins();
		for(var prop in props) {
			if(typeof plugins[prop] !== 'undefined') {
				props[prop] = false;
			}
		}
		// pseudo classes
		for(var prop in props) {
			if(prop.charAt(0) === ":") {
				props[prop] = false;
			}
		}
		// ampersand 
		for(var prop in props) {
			if(/&/g.test(prop)) {
				props[prop] = false;
			}
		}
	}
	var checkForNesting = function(selector, props, stylesheet) {
		for(var prop in props) {
			if(typeof props[prop] === 'object') {
				// check for pseudo classes
				if(prop.charAt(0) === ":") {
					addRule(selector + prop, props[prop], stylesheet);
			    // check for ampersand operator
				} else if(/&/g.test(prop)) {
					addRule(prop.replace(/&/g, selector), props[prop], stylesheet);
				// check for media query
				} else if(prop.indexOf("@media") === 0 || prop.indexOf("@supports") === 0) {
					addRule(selector, props[prop], prop);
				// check for plugins
				} else if(checkAndExecutePlugin(selector, prop, props[prop], stylesheet) === false) {
					addRule(selector + " " + prop, props[prop], stylesheet);
				}
				props[prop] = false;
			} else if(typeof props[prop] === 'function') {
				props[prop] = props[prop]();
				checkForNesting(selector, props, stylesheet);
			} else {
				if(checkAndExecutePlugin(selector, prop, props[prop], stylesheet)) {
					props[prop] = false;
				}
			}
		}
	}
	var addRule = function(selector, props, stylesheet) {

		// if array is passed as props
		if(typeof props.length !== 'undefined' && typeof props === "object") {
			for(var i=0; prop=props[i]; i++) {
				addRule(selector, prop, stylesheet);
			}
			return;
		}
 
		// check for plugin
		if(checkAndExecutePlugin(null, selector, props, stylesheet)) {
			return;	
		}

		// if the selector is already there
		if(typeof API.getRules(stylesheet || "mainstream")[selector] == 'object') {
			var current = API.getRules(stylesheet || "mainstream")[selector];
			for(var propNew in props) {
				// overwrite already added value
				if(typeof props[propNew] != 'object') {
					current[propNew] = props[propNew];
				}
			}
		// no, the selector is still not added
		} else {
			API.getRules(stylesheet || "mainstream")[selector] = props;
		}

		checkForNesting(selector, props, stylesheet || "mainstream");
		clearing(props);
		
	}
	var extend = function(destination, source) {
		for (var key in source) {
			if (hasOwnProperty.call(source, key)) {
				destination[key] = source[key];
			}
		}
		return destination;
	};
	var prepareRules = function(obj) {
		if(obj instanceof Array) {
			for(var i=0; i<obj.length; i++) {
				prepareRules(obj[i]);
			}
			return;
		}
		for(var prop in obj) {
			var value = obj[prop];
			if(typeof value == 'object') {
				prepareRules(value);
			}
			if(/, ?/g.test(prop)) {
				var parts = prop.replace(/, /g, ',').split(',');
				for(var i=0; i<parts.length, p=parts[i]; i++) {
					obj[p] = extend({}, value);
				}
				delete obj[prop];
			}
		}
	}
	var add = function(rules, stylesheet) {
		API.numOfAddedRules += 1;
		prepareRules(rules);
		for(var selector in rules) {
			if(rules[selector] instanceof Array) {
				for(var i=0; i<rules[selector].length, r=rules[selector][i]; i++) {
					addRule(selector, r, stylesheet || "mainstream");
				}
			} else {
				addRule(selector, rules[selector], stylesheet || "mainstream");
			}
		}
		return API;
	}
	return add;
}
var extend = function(destination, source) {
	for (var key in source) {
		if (hasOwnProperty.call(source, key)) {
			destination[key] = source[key];
		}
	}
	return destination;
};

lib.api.compile = function(api) {
	return function() {
		var path = null, callback = null, options = null;
		for(var i=0; i<arguments.length; i++) {
			switch(typeof arguments[i]) {
				case "function": callback = arguments[i]; break;
				case "string": path = arguments[i]; break;
				case "object": options = arguments[i]; break;
			}
		}

		var _defaultOptions = {
			combineSelectors: true,
			minify: false,
			keepCamelCase: false,
			processor: api.defaultProcessor,
			api: api
		};
		options = extend(_defaultOptions, options || {});

		options.processor(
			api.getRules(),
			function(err, result) {
				if(path != null) {
					try {
						fs.writeFile(path, result, function (err) {
							callback(err, result);
						});
					} catch(err) {
						callback.apply({}, arguments);
					}
				} else {
					callback.apply({}, arguments);
				}
				api.flush();
			},
			options
		);
		
	}
}
lib.api.compileFile = function(api) {
	return api.compile;
}
var ColorLuminance = function (hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
};
lib.api.darken = function(api) {
	return function(color, percents) {
		return ColorLuminance(color, -(percents/100));
	}
}
lib.api.hook = function(api) {
	return function(method, callback) {
		api.addHook(method, callback);
		return api;
	}
}
var ColorLuminance = function (hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
};
lib.api.lighten = function(api) {
	return function(color, percents) {
		return ColorLuminance(color, percents/100);
	}
}
var metamorphosis = {
	html: function(api) {
		api.defaultProcessor = require(__dirname + "/../processors/html/HTML.js")();
		api.hook("add", function(tags, template) {
			api.getRules(template || "mainstream").push(tags);
			return true;
		});
	},
	component: function(api) {
		api.defaultProcessor = require(__dirname + "/../processors/component/Component.js")();
		api.hook("add", function(component) {
			if(!(component instanceof Array)) component = [component];
			for(var i=0; i<component.length, c = component[i]; i++) {
				api.getRules("mainstream").push(c);
			}
			return true;
		});	
	}
}
lib.api.morph = function(api) {
	return function(type) {
		if(metamorphosis[type]) {
			api.flush();
			metamorphosis[type](api);
		}
		return api;
	}
}
lib.api.plugin = function(api) {
	var plugin = function(name, func) {
		api.getPlugins()[name] = func;
		return api;
	}
	return plugin;	
}
lib.api.raw = function(api) {
	return function(raw) {
		var o = {}, v = {};
		var id = "____raw_" + api.numOfAddedRules;
		v[id] = raw;
		o[id] = v;
		api.add(o);
		return api;
	}
}
lib.api.register = function(api) {
	return function(method, func) {
		api[method] = func;
		return api;
	}
}
lib.api.storage = function(API) {
	var _s = API.getStorage();
	var storage = function(name, value) {
		if(typeof value !== "undefined") {
			_s[name] = value;
		} else if(typeof name === "object") {
			for(var _name in name) {
				if(Object.prototype.hasOwnProperty.call(name, _name)) {
					storage(_name, name[_name]);
				}
			}
    } else {
			if(_s[name]) {
				return _s[name];
			} else {
				throw new Error("There is no data in the storage associated with '" + name + "'");
			}
		}
		return API;
	}
	return storage;
}
// credits: http://www.sitepoint.com/javascript-generate-lighter-darker-color/
lib.helpers.ColorLuminance = function (hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}
lib.helpers.RequireUncached = function(module) {
	delete require.cache[require.resolve(module)]
    return require(module);
}
lib.helpers.TransformUppercase = function(prop, options) {
	var transformed = "";
	for(var i=0; c=prop.charAt(i); i++) {
		if(options && options.keepCamelCase === true) {
			transformed += c;
		} else {
			if(c === c.toUpperCase() && c.toLowerCase() !== c.toUpperCase()) {
				transformed += "-" + c.toLowerCase();
			} else {
				transformed += c;
			}
		}
	}
	return transformed;
}
var compileComponent = function(input, callback, options) {

	var css = "", 
		html = "", 
		all = [],
		api = options.api;
		cssPreprocessor = require(__dirname + "/../css/CSS.js")(),
		htmlPreprocessor = require(__dirname + "/../html/HTML.js")();

	var processCSS = function(clb) {
		for(var i=0; i<all.length, component=all[i]; i++) {
			if(typeof component === "function") { component = component(); }
			api.add(component.css ? component.css : {});
		}
		cssPreprocessor(api.getRules(), function(err, result) {
			css += result;
			clb(err);
		}, options);
	}
	var processHTML = function(clb) {
		var index = 0;
		var error = null;
		var processComponent = function() {
			if(index > input.length-1) {
				clb(error);
				return;
			}
			var c = input[index];
			if(typeof c === "function") { c = c(); }
			api.morph("html").add(c.html ? c.html : {});
			htmlPreprocessor(api.getRules(), function(err, result) {
				html += result;
				index += 1;
				error = err;
				processComponent();
			}, options);
		}
		processComponent();
	}
	var checkForNesting = function(o) {
		for(var key in o) {
			if(key === "_include") {
				if(o[key] instanceof Array) {
					for(var i=0; i<o[key].length, c=o[key][i]; i++) {
						if(typeof c === "function") { c = c(); }
						all.push(c);
						checkForNesting(c);
					}
				} else {
					if(typeof o[key] === "function") { o[key] = o[key](); }
					all.push(o[key]);
					checkForNesting(o[key]);
				}
			} else if(typeof o[key] === "object") {
				checkForNesting(o[key]);
			}
		}
	}

	// Checking for nesting. I.e. collecting the css and html.
	for(var i=0; i<input.length, c=input[i]; i++) {
		if(typeof c === "function") { c = c(); }
		all.push(c);
		checkForNesting(c);
	}

	api.flush();
	processCSS(function(errCSS) {
		api.morph("html");
		processHTML(function(errHTML) {
			callback(
				errCSS || errHTML ? {error: {css: errCSS, html: errHTML }} : null,
				css,
				html
			)
		});
	});
	
}
lib.processors.component.Component = function() {
	var processor = function(rules, callback, options) {
		compileComponent(rules.mainstream, callback, options);
	}
	processor.type = "component";
	return processor;
}
var newline = '\n',
	defaultOptions = {
		combineSelectors: true,
		minify: false,
		keepCamelCase: false
	},
	transformUppercase = require("../../helpers/TransformUppercase");

var toCSS = function(rules, options) {
	var css = '';
	for(var selector in rules) {
		// handling raw content
		if(selector.indexOf("____raw") === 0) {
			css += rules[selector][selector] + newline;
		// handling normal styles
		} else {
			var entity = selector + ' {' + newline;
			for(var prop in rules[selector]) {
				var value = rules[selector][prop];
				if(value === "") {
					value = '""';
				}
				entity += '  ' + transformUppercase(prop, options) + ': ' + value + ';' + newline;
			}
			entity += '}' + newline;
			css += entity;
		}
	}
	return css;
}

// dealing with false values
var filterRules = function(rules) {
	var arr = {};
	for(var selector in rules) {
		var areThereAnyProps = false;
		var props = {};
		for(var prop in rules[selector]) {
			var value = rules[selector][prop];
			if(value !== false && typeof value != 'object') {
				areThereAnyProps = true;
				props[prop] = value;
			}
		}
		if(areThereAnyProps) {
			arr[selector] = props;
		}
	}
	return arr;
}

// combining selectors
var combineSelectors = function(rules) {
	var map = {},
		arr = {};
	// creating the map
	for(var selector in rules) {
		var props = rules[selector];
		for(var prop in props) {
			var value = props[prop];
			if(!map[prop]) map[prop] = {};
			if(!map[prop][value]) map[prop][value] = [];
			map[prop][value].push(selector);
		}
	}
	// converting the map to usual rules object
	for(var prop in map) {
		var values = map[prop];
		for(var value in values) {
			var selectors = values[value];
			if(!arr[selectors.join(", ")]) arr[selectors.join(", ")] = {}
			var selector = arr[selectors.join(", ")];
			selector[prop] = value;	
		}		
	}
	return arr;
}

var minimize = function(content) {
    content = content.replace( /\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '' );
    // now all comments, newlines and tabs have been removed
    content = content.replace( / {2,}/g, ' ' );
    // now there are no more than single adjacent spaces left
    // now unnecessary: content = content.replace( /(\s)+\./g, ' .' );
    content = content.replace( / ([{:}]) /g, '$1' );
    content = content.replace( /([;,]) /g, '$1' );
    content = content.replace( / !/g, '!' );
    return content;
}

lib.processors.css.CSS = function() {
	var processor = function(rules, callback, options) {
		options = options || defaultOptions;
		var css = '';
		for(var stylesheet in rules) {
			var r = filterRules(rules[stylesheet]);
			r = options.combineSelectors ? combineSelectors(r) : r;
			if(stylesheet === "mainstream") {
				css += toCSS(r, options);
			} else {
				css += stylesheet + " {" + newline + toCSS(r, options) + "}" + newline;
			}		
		}
		// Minification
		if(options.minify) {
			css = minimize(css);
			if(callback) callback(null, css);
		} else {
			if(callback) callback(null, css);
		}
		return css;
	}
	processor.type = "css";
	return processor;
}
lib.processors.css.plugins.charset = function() {	
	return function(api, charsetValue) {
		if(typeof charsetValue === "string") {
			api.raw("@charset: \"" + charsetValue + "\";");
		} else if(typeof charsetValue === "object") {
			charsetValue = charsetValue.charset.replace(/:/g, '').replace(/'/g, '').replace(/"/g, '').replace(/ /g, '');
			api.raw("@charset: \"" + charsetValue + "\";");
		}
	}
}
lib.processors.css.plugins.document = function() {	
	return function(api, value) {
		if(typeof value === "object") {
			var stylesheet = '';
			stylesheet += '@' + value.vendor + 'document';
			stylesheet += ' ' + value.document;
			if(value.rules && value.rules.length) {
				for(var i=0; rule=value.rules[i]; i++) {
					api.handlecssrule(rule, stylesheet);
				}
			} else if(typeof value.styles != "undefined") {
				api.add(value.styles, stylesheet);
			}
		}
	}
}
lib.processors.css.plugins.keyframes = function() {
	return function(api, value) {
		var processor = require(__dirname + "/../CSS.js")();
		if(typeof value === "object") {			
			// js or json
			if(typeof value.frames != "undefined") {
				var content = '@keyframes ' + value.name + " {\n";
				content += processor({mainstream: value.frames});
				content += "}";
				api.raw(content + "\n" + content.replace("@keyframes", "@-webkit-keyframes"));
			// css
			} else if(typeof value.keyframes != "undefined") {
				var content = '@keyframes ' + value.name + " {\n";
				var frames = {};
				for(var i=0; rule=value.keyframes[i]; i++) {
					if(rule.type === "keyframe") {
						var f = frames[rule.values] = {};
						for(var j=0; declaration=rule.declarations[j]; j++) {
							if(declaration.type === "declaration") {
								f[declaration.property] = declaration.value;
							}
						}
					}
				}
				content += processor({mainstream: frames});
				content += "}";
				api.raw(content + "\n" + content.replace("@keyframes", "@-webkit-keyframes"));
			}
		}
	}
}
lib.processors.css.plugins.media = function() {
	return function(api, value) {
		var processor = require(__dirname + "/../CSS.js")();
		if(typeof value === "object") {
			var content = '@media ' + value.media + " {\n";
			var rules = {};
			for(var i=0; rule=value.rules[i]; i++) {				
				var r = rules[rule.selectors.toString()] = {};
				if(rule.type === "rule") {
					for(var j=0; declaration=rule.declarations[j]; j++) {
						if(declaration.type === "declaration") {
							r[declaration.property] = declaration.value;
						}
					}
				}
			}
			content += processor({mainstream: rules});
			content += "}";
			api.raw(content);
		}
	}
}
lib.processors.css.plugins.namespace = function() {	
	return function(api, value) {
		if(typeof value === "string") {
			api.raw("@namespace: \"" + value + "\";");
		} else if(typeof value === "object") {
			value = value.namespace.replace(/: /g, '').replace(/'/g, '').replace(/"/g, '').replace(/ /g, '').replace(/:h/g, 'h');
			api.raw("@namespace: \"" + value + "\";");
		}
	}
}
lib.processors.css.plugins.page = function() {	
	return function(api, value) {
		if(typeof value === "object") {
			var content = ""; 
			if(value.selectors.length > 0) {
				content += "@page " + value.selectors.join(", ") + " {\n";
			} else {
				content += "@page {\n";
			}
			for(var i=0; declaration=value.declarations[i]; i++) {
				if(declaration.type == "declaration") {
					content += "  " + declaration.property + ": " + declaration.value + ";\n";
				}
			}
			content += "}";
			api.raw(content);
		}
	}
}
lib.processors.css.plugins.supports = function() {
	return function(api, value) {
		var processor = require(__dirname + "/../CSS.js")();
		if(typeof value === "object") {
			var content = '@supports ' + value.supports + " {\n";
			var rules = {};
			for(var i=0; rule=value.rules[i]; i++) {				
				var r = rules[rule.selectors.toString()] = {};
				if(rule.type === "rule") {
					for(var j=0; declaration=rule.declarations[j]; j++) {
						if(declaration.type === "declaration") {
							r[declaration.property] = declaration.value;
						}
					}
				}
			}
			content += processor({mainstream: rules});
			content += "}";
			api.raw(content);
		}
	}
}
var data = null,
	newline = '\n',
	defaultOptions = {},
	tags = [],
	beautifyHTML = require('js-beautify').html,
	transformUppercase = require("../../helpers/TransformUppercase"),
	passedOptions = {};

var processTemplate = function(templateName) {
	var html = '';
	for(var template in data) {
		if(template == templateName) {
			var numOfRules = data[template].length;
			for(var i=0; i<numOfRules; i++) {
				html += process('', data[template][i]);
			}
		}
	}
	return html;
}
var process = function(tagName, obj) {
	// console.log("------------------------\n", tagName, ">", obj);

	var html = '', attrs = '', childs = '';

	var tagAnalized = require("./helpers/PropAnalyzer")(tagName);
	tagName = tagAnalized.tag;
	if(tagAnalized.attrs != "") {
		attrs += " " + tagAnalized.attrs;
	}

	if(typeof obj === "string") {
		return packTag(tagName, attrs, obj);
	}

	var addToChilds = function(value) {
		if(childs != '') { childs += newline; }
		childs += value;
	}

	// process directives
	for(var directiveName in obj) {
		var value = obj[directiveName];
		switch(directiveName) {
			case "_attrs":
				for(var attrName in value) {
					if(typeof value[attrName] === "function") {
						attrs += " " + transformUppercase(attrName, passedOptions) + "=\"" + value[attrName]() + "\"";
					} else {
						attrs += " " + transformUppercase(attrName, passedOptions) + "=\"" + value[attrName] + "\"";
					}
				}
				obj[directiveName] = false;
			break;
			case "_":
				addToChilds(value);
				obj[directiveName] = false;
			break;
			case "_tpl": 
				if(typeof value == "string") {
					addToChilds(processTemplate(value));
				} else if(value instanceof Array) {
					var tmp = '';
					for(var i=0; tpl=value[i]; i++) {
						tmp += processTemplate(tpl)
						if(i < value.length-1) tmp += newline;
					}
					addToChilds(tmp);
				}
				obj[directiveName] = false;
			break;
			case "_include":
				var tmp = '';
				var add = function(o) {
					if(typeof o === "function") { o = o(); }
					if(o.css && o.html) { o = o.html; } // catching a component
					tmp += process('', o);
				}
				if(value instanceof Array) {
					for(var i=0; i<value.length, o=value[i]; i++) {
						add(o);
					}
				} else if(typeof value === "object"){
					add(value);
				}
				addToChilds(tmp);
				obj[directiveName] = false;
			break;
		}
	}

	for(var prop in obj) {
		var value = obj[prop];
		if(value !== false) {
			var name = prop;
			switch(typeof value) {
				case "string": addToChilds(process(name, value)); break;
				case "object": 
					if(value.length && value.length > 0) {
						var tmp = '';
						for(var i=0; v=value[i]; i++) {
							tmp += process('', typeof v == "function" ? v() : v);
							if(i < value.length-1) tmp += newline;
						}
						addToChilds(process(name, tmp));
					} else {
						addToChilds(process(name, value));
					}
				break;
				case "function": addToChilds(process(name, value())); break;
			}
		}
	}

	if(tagName != '') {
		html += packTag(tagName, attrs, childs);
	} else {
		html += childs;
	}

	return html;
}
var packTag = function(tagName, attrs, childs) {
	var html = '';
	if(tagName == '' && attrs == '' && childs != '') {
		return childs;
	}
	tagName = tagName == '' ? 'div' : tagName;
	if(childs !== '') {
		html += '<' + transformUppercase(tagName, passedOptions) + attrs + '>' + newline + childs + newline + '</' + transformUppercase(tagName, passedOptions) + '>';
	} else {
		html += '<' + transformUppercase(tagName, passedOptions) + attrs + '/>';
	}
	return html;
}
var prepareHTML = function(html) {
	html = require("./helpers/TemplateEngine")(html.replace(/[\r\t\n]/g, ''), passedOptions);
	if(passedOptions.minify) {
		return html;
	} else {
		return beautifyHTML(html, {indent_size: passedOptions.indentSize || 4});
	}
}
lib.processors.html.HTML = function() {
	var processor = function(rules, callback, options) {
		data = rules;
		callback = callback || function() {};
		options = passedOptions = options || defaultOptions;
		var html = prepareHTML(processTemplate("mainstream"));
		callback(null, html);
		return html;
	}
	processor.type = "html";
	return processor;
}
lib.processors.html.helpers.PropAnalyzer = function(prop) {
	var res = { 
			tag: '',
			attrs: ''
		},
		numOfChars = prop.length,
		tagName = "",
		className = "", readingClass = false, classes = [],
		idName = "", readingId = false, ids = [],
		attributes = "", readingAttributes = false;

	for(var i=0; c=prop[i]; i++) {
		if(c === "[" && !readingAttributes) {
			readingAttributes = true;
		} else if(readingAttributes) {
			if(c != "]") {
				attributes += c;
			} else {
				readingAttributes = false;
				i -= 1;
			}
		} else if(c === "." && !readingClass) {
			readingClass = true;
		} else if(readingClass) {
			if(c != "." && c != "#" && c != "[" && c != "]") {
				className += c;
			} else {
				classes.push(className);
				readingClass = false;
				className = "";
				i -= 1;
			}
		} else if(c === "#" && !readingId) {
			readingId = true;
		} else if(readingId) {
			if(c != "." && c != "#" && c != "[" && c != "]") {
				idName += c;
			} else {
				readingId = false;
				i -= 1;
			}
		} else if(c != "." && c != "#" && c != "[" && c != "]") {
			res.tag += c;
		}
	}

	// if ends with a class
	if(className != "") classes.push(className);

	// collecting classes
	var clsStr = '';
	for(var i=0; cls=classes[i]; i++) {
		clsStr += clsStr === "" ? cls : " " + cls;
	}
	res.attrs += clsStr != "" ? 'class="' + clsStr + '"' : '';

	// if ends on id
	if(idName != "") {
		res.attrs += (res.attrs != "" ? " " : "") + 'id="' + idName + '"';
	}

	// if div tag name is skipped
	if(res.tag === "" && res.attrs != "") res.tag = "div";

	// collecting attributes
	if(attributes != "") {
		res.attrs += (res.attrs != "" ? " " : "") + attributes;
	}

	return res;
}
lib.processors.html.helpers.TemplateEngine = function(html, options) {
	var re = /<%(.+?)%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
	var add = function(line, js) {
		js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
			(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
		return add;
	}
	while(match = re.exec(html)) {
		add(html.slice(cursor, match.index))(match[1], true);
		cursor = match.index + match[0].length;
	}
	add(html.substr(cursor, html.length - cursor));
	code += 'return r.join("");';
	return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
};
return client();
})(window);