var Absurd = (function(w) {
var lib = { 
	api: {},
	helpers: {},
	plugins: {}
};
var require = function() {
	
};
var client = function() {
	return function(arg) {

		/******************************************* Copied directly from /lib/API.js */

		var _api = {},
			_rules = {},
			_storage = {},
			_plugins = {};

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
		}

		// internal variables
		_api.numOfAddedRules = 0;

		/******************************************* Copied directly from /lib/API.js */

		// client side specific methods 
		_api.compile = function(callback) {
			lib.Processor(
				_api.getRules(),
				callback || function() {},
				{combineSelectors: true}
			);
		}
		_api.getPath = function() {
			return {};
		}

		// registering api methods
		for(var method in lib.api) {
			_api[method] = lib.api[method](_api);
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
var cleanCSS = require('clean-css'),
	newline = '\n',
	defaultOptions = {
		combineSelectors: true,
		minify: false
	};

var toCSS = function(rules) {
	var css = '';
	for(var selector in rules) {
		// handling raw content
		if(selector.indexOf("____raw") === 0) {
			css += rules[selector].value + newline;
		// handling normal styles
		} else {
			var entity = selector + ' {' + newline;
			for(var prop in rules[selector]) {
				var value = rules[selector][prop];
				entity += '  ' + transformUppercase(prop) + ': ' + rules[selector][prop] + ';' + newline;
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
			if(value !== false) {
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

// transform uppercase to [-lowercase]
var transformUppercase = function(prop) {
	var transformed = "";
	for(var i=0; c=prop.charAt(i); i++) {
		if(c === c.toUpperCase() && c.toLowerCase() !== c.toUpperCase()) {
			transformed += "-" + c.toLowerCase();
		} else {
			transformed += c;
		}
	}
	return transformed;
}

lib.Processor = function(rules, callback, options) {
	options = options || defaultOptions;
	var css = '';
	for(var stylesheet in rules) {
		var r = filterRules(rules[stylesheet]);
		r = options.combineSelectors ? combineSelectors(r) : r;
		if(stylesheet === "mainstream") {
			css += toCSS(r);
		} else {
			css += stylesheet + " {" + newline + toCSS(r) + "}" + newline;
		}		
	}
	// Minification
	if(options.minify) {
		css = cleanCSS.process(css);
		if(callback) callback(null, css);
	} else {
		if(callback) callback(null, css);
	}
	return css;
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
	var clearingPluginsCalls = function(props) {
		var plugins = API.getPlugins();
		for(var prop in props) {
			if(typeof plugins[prop] !== 'undefined') {
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
				// check for media query
				} else if(prop.indexOf("@media") === 0 || prop.indexOf("@supports") === 0) {
					addRule(selector, props[prop], prop);
				// check for plugins
				} else if(checkAndExecutePlugin(selector, prop, props[prop], stylesheet) === false) {
					addRule(selector + " " + prop, props[prop], stylesheet);
				}
				props[prop] = false;
			} else {
				if(checkAndExecutePlugin(selector, prop, props[prop], stylesheet)) {
					props[prop] = false;
				}
			}
		}
	}
	var addRule = function(selector, props, stylesheet) {

		// check for plugin
		if(checkAndExecutePlugin(null, selector, props, stylesheet)) return;	

		// if the selector is already there
		if(typeof API.getRules(stylesheet || "mainstream")[selector] == 'object') {
			var current = API.getRules(stylesheet || "mainstream")[selector];
			for(var propNew in props) {
				// overwrite already added value
				current[propNew] = props[propNew];
			}
		// no, the selector is still not added
		} else {
			API.getRules(stylesheet || "mainstream")[selector] = props;
		}
		checkForNesting(selector, props, stylesheet || "mainstream");
		clearingPluginsCalls(props);
		
	}
	var add = function(rules, stylesheet) {
		API.numOfAddedRules += 1;
		for(var selector in rules) {
			if(typeof rules[selector].length !== 'undefined' && typeof rules[selector] === "object") {
				for(var i=0; r=rules[selector][i]; i++) {
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
// credits: http://www.sitepoint.com/javascript-generate-lighter-darker-color/
function ColorLuminance(hex, lum) {

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

lib.api.colors = function(api) {

	var darken = api.darken = function(color, percents) {
		return ColorLuminance(color, -(percents/100));
	}
	var lighten = api.lighten = function(color, percents) {
		return ColorLuminance(color, percents/100);
	}

	return {
		darken: darken,
		lighten: lighten
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
		var o = {};
		o["____raw_" + api.numOfAddedRules] = { value: raw };
		api.add(o);
		return api;
	}
}
lib.api.storage = function(API) {
	var _s = API.getStorage();
	var storage = function(name, value) {
		if(typeof value != "undefined") {
			_s[name] = value;
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
lib.helpers.PathFormatter = function(path) {
	var _path = {};
	if(!path) {
		return false;
	} else if(typeof path == "string") {
		_path = {source: path};
	} else {
		_path = path;
	}
	return _path;
}
lib.helpers.RequireUncached = function(module) {
	delete require.cache[require.resolve(module)]
    return require(module);
}
lib.plugins.charset = function() {	
	return function(api, charsetValue) {
		if(typeof charsetValue === "string") {
			api.raw("@charset: \"" + charsetValue + "\";");
		} else if(typeof charsetValue === "object") {
			charsetValue = charsetValue.charset.replace(/:/g, '').replace(/'/g, '').replace(/"/g, '').replace(/ /g, '');
			api.raw("@charset: \"" + charsetValue + "\";");
		}
	}
}
lib.plugins.document = function() {	
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
lib.plugins.keyframes = function() {
	return function(api, value) {
		var processor = require(__dirname + "/../Processor");
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
lib.plugins.media = function() {
	return function(api, value) {
		var processor = require(__dirname + "/../Processor");
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
lib.plugins.namespace = function() {	
	return function(api, value) {
		if(typeof value === "string") {
			api.raw("@namespace: \"" + value + "\";");
		} else if(typeof value === "object") {
			value = value.namespace.replace(/: /g, '').replace(/'/g, '').replace(/"/g, '').replace(/ /g, '').replace(/:h/g, 'h');
			api.raw("@namespace: \"" + value + "\";");
		}
	}
}
lib.plugins.page = function() {	
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
lib.plugins.supports = function() {
	return function(api, value) {
		var processor = require(__dirname + "/../Processor");
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
};
return client();
})(window);