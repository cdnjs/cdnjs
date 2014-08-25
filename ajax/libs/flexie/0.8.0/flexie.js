/*
File: flexie.js

About: Version
	0.8

Project: Flexie

Description:
	Legacy support for the CSS3 Flexible Box Model

License:
	The MIT License
	
	Copyright (c) 2010 Richard Herrera

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

/*
Class: Flexie
	Scoped to the Flexie Global Namespace
*/

/*jslint evil: true, regexp: false, plusplus: false */
/*global window, document */

var Flexie = (function (win, doc) {
	
	// Scope public properties
	var FLX = {},
	
	// Each Flexie-modified DOM node gets a unique identifier
	FLX_DOM_ID = 0,
	
	// Store support for flexbox
	SUPPORT,
	
	// Store reference to library
	ENGINE, LIBRARY,
	
	// Regular Expressions
	PIXEL = /^-?\d+(?:px)?$/i,
	NUMBER = /^-?\d/,
	SIZES = /width|height|margin|padding|border/,
	MSIE = /(msie) ([\w.]+)/,
	WHITESPACE_CHARACTERS = /\t|\n|\r/g,
	RESTRICTIVE_PROPERTIES = /^max\-([a-z]+)/,
	PROTOCOL = /^https?:\/\//i,
	
	// String constants
    EMPTY_STRING = "",
    SPACE_STRING = " ",
    PLACEHOLDER_STRING = "$1",

	PADDING_RIGHT = "paddingRight",
	PADDING_BOTTOM = "paddingBottom",
	PADDING_LEFT = "paddingLeft",
	PADDING_TOP = "paddingTop",
	
	BORDER_RIGHT = "borderRightWidth",
	BORDER_BOTTOM = "borderBottomWidth",
	BORDER_LEFT = "borderLeftWidth",
	BORDER_TOP = "borderTopWidth",
	
	HORIZONTAL = "horizontal",
	VERTICAL = "vertical",
	
	END_MUSTACHE = "}",
	
	PREFIXES = " -o- -moz- -ms- -webkit- -khtml- ".split(SPACE_STRING),
	
	DEFAULTS = {
		orient : HORIZONTAL,
		align : "stretch",
		direction : "normal",
		pack : "start"
	},
	
	// Global reference objects
	FLEX_BOXES = [],
	POSSIBLE_FLEX_CHILDREN = [],
	FLEX_INSTANCES = [],
	
	RESIZE_LISTENER,
	
	// Minification optimizations
	TRUE = true,
	FALSE = false,
	NULL = null,
	UNDEFINED = undefined,
	
	// If IE, which version?
	BROWSER = {
		IE : (function () {
			var ie, ua = win.navigator.userAgent,
			    match = (MSIE).exec(ua.toLowerCase());
			
			if (match) {
				ie = parseInt(match[2], 10);
			}
			
			return ie;
		}())
	},
	
	/*
	selectivizr v1.0.0 - (c) Keith Clark, freely distributable under the terms 
	of the MIT license.

	selectivizr.com
	*/
	selectivizrEngine;
	
	// Via jQuery 1.4.3
	// http://github.com/jquery/jquery/blob/master/src/core.js#L593
	function forEach(object, callback, reverse) {
		var name, i = 0, value,
			length = object.length,
			isObj = length === UNDEFINED;

		if (isObj) {
			for (name in object) {
				if (object.hasOwnProperty(name)) {
					if (callback.call(object[name], name, object[name]) === FALSE) {
						break;
					}
				}
			}
		} else {
			for (value = object[0]; i < length && callback.call(value, i, value) !== FALSE; value = object[++i]) {
				continue;
			}
		}
	}
	
	// --[ determineSelectorMethod() ]--------------------------------------
	// walks through the selectorEngines object testing for an suitable
	// selector engine.
	
	// Moving outside Selectivizr scope because detection is needed before running selectivizrEngine
	function determineSelectorMethod() {
		// compatiable selector engines in order of CSS3 support
		var selectorEngines = {
			"NW" : "*.Dom.select",
			"DOMAssistant" : "*.$", 
			"Prototype" : "$$",
			"YAHOO" : "*.util.Selector.query",
			"MooTools" : "$$",
			"Sizzle" : "*", 
			"jQuery" : "*",
			"dojo" : "*.query"
		}, method;
		
		forEach(selectorEngines, function (engine, value) {
			if (win[engine] && !method && (method = eval(value.replace("*", engine)))) {
				ENGINE = engine;
			}
		});
		
		return method;
	}
	
	// Event handler for onload/onresize events
	function addEvent(type, func) {
		type = "on" + type;
		var oldevent = win[type];

		if (typeof win[type] !== "function") {
			win[type] = func;
		} else {
			win[type] = function () {
				if (oldevent) {
					oldevent();
				}
				func();
			};
		}
	}
	
	function attachLoadMethod(handler) {
		// compatiable selector engines in order of CSS3 support
		var selectorEngines = {
			"DOMAssistant" : ["*.DOMReady", "%"],
			"Prototype" : ["document.observe", "'dom:loaded', %"],
			"YAHOO" : ["*.util.Event", "onDOMReady", "%"],
			"MooTools" : ["window.addEvent", "'domready', %"],
			"jQuery" : ["*(document).ready", "%"],
			"dojo" : ["*.addOnLoad", "%"]
		}, method, current;
		
		current = selectorEngines[ENGINE];
		
		if (current && (method = eval(current[0].replace("*", ENGINE)))) {
			if (current[2]) {
				method = method[current[1]];
			}
			
			// This works in IE9 Preview 6, but throws an error anyway(?)
			try {
				eval(method + "(" + current[current.length - 1].replace("%", handler) + ")");
			} catch (e) {}
		}
		
		addEvent("load", function () {
			if (!method && handler) {
				handler();
			}
			
			FLX.updateInstance();
		});
	}
	
	function buildSelectorTree(text) {
		var rules = [], ruletext, rule,
		    match, selector, proptext, splitprop, properties;
		
		// Tabs, Returns
		text = text.replace(WHITESPACE_CHARACTERS, EMPTY_STRING);
		
		// Leading / Trailing Whitespace
		text = text.replace(/\s?(\{|\:|\})\s?/g, PLACEHOLDER_STRING);
		
		ruletext = text.split(END_MUSTACHE);
		
		forEach(ruletext, function (i, text) {
			if (text) {
				rule = [text, END_MUSTACHE].join(EMPTY_STRING);
				
				match = (/(.*)\{(.*)\}/).exec(rule);
				
				if (match.length && match[2]) {
					selector = match[1];
					proptext = match[2].split(";");
					properties = [];
					
					forEach(proptext, function (i, x) {
						splitprop = x.split(":");
						
						if (splitprop.length && splitprop[1]) {
							properties.push({
								property : splitprop[0],
								value : splitprop[1]
							});
						}
					});
					
					if (selector && properties.length) {
						rules.push({
							selector : selector,
							properties : properties
						});
					}
				}
			}
		});
		
		return rules;
	}
	
	function findFlexboxElements(rules) {
		var selector, properties,
		    property, value, shortProp,
		    leadingTrim = /^\s\s*/,
		    trailingTrim = /\s\s*$/,
		    selectorSplit = /(\s)?,(\s)?/,
		    trim, addRules,
		    multiSelectors, updatedRule,
		    uniqueChildren = {}, uniqueBoxes = {};
		
		trim = function (string) {
			return string.replace(leadingTrim, EMPTY_STRING).replace(trailingTrim, EMPTY_STRING);
		};
		
		addRules = function (selector, rules) {
			var element = uniqueBoxes[selector];
			
			if (element) {
				element.properties.push(rules);
			} else {
				uniqueBoxes[selector] = rules;
			}
		};
		
		forEach(rules, function (i, rule) {
			selector = rule.selector;
			properties = rule.properties;
			
			forEach(properties, function (i, prop) {
				property = trim(prop.property);
				value = trim(prop.value);
				
				if (property) {
					shortProp = property.replace("box-", EMPTY_STRING);

					switch (shortProp) {
					case "display" :
						if (value === "box") {
							addRules(selector, rule);
						}
						break;

					case "orient" :
					case "align" :
					case "direction" :
					case "pack" :
						addRules(selector, rule);
						break;

					case "flex" :
					case "flex-group" :
					case "ordinal-group" :
						// Multiple selectors?
						multiSelectors = selector.split(selectorSplit);

						forEach(multiSelectors, function (i, multi) {
							if (multi && (multi = trim(multi))) {

								if (!uniqueChildren[multi]) {
									updatedRule = {};

									// Each selector gets its own call
									forEach(rule, function (key) {
										updatedRule[key] = rule[key];
									});

									updatedRule.selector = multi;

									// Easy access for later
									updatedRule[shortProp] = value;

									uniqueChildren[multi] = updatedRule;
								} else {
									// Easy access for later
									uniqueChildren[multi][shortProp] = value;
								}

							}
						});
						break;
					}
				}
			});
		});
		
		forEach(uniqueBoxes, function (key, node) {
			FLEX_BOXES.push(node);
		});
		
		forEach(uniqueChildren, function (key, node) {
			POSSIBLE_FLEX_CHILDREN.push(node);
		});
		
		return {
			boxes : FLEX_BOXES,
			children : POSSIBLE_FLEX_CHILDREN
		};
	}
	
	function matchFlexChildren(parent, lib, possibleChildren) {
		var caller, unique, matches = [];
		
		forEach(possibleChildren, function (i, child) {
			caller = lib(child.selector);
			
			if (caller[0]) {
				forEach(caller, function (i, node) {
					switch (node.nodeName.toLowerCase()) {
					case "script" :
					case "style" :
					case "link" :
						break;

					default :
						if (node.parentNode === parent) {
							// Flag each unique node with FLX_DOM_ID
							node.FLX_DOM_ID = node.FLX_DOM_ID || (++FLX_DOM_ID);

							unique = {};

							forEach(child, function (key) {
								unique[key] = child[key];
							});

							unique.match = node;
							matches.push(unique);
						}
						break;
					}
				});
			}
		});
		
		return matches;
	}
	
	function getParams(params) {
		forEach(params, function (key, value) {
			params[key] = value || DEFAULTS[key];
		});
		
		return params;
	}
	
	function buildFlexieCall(flexers) {
		var selector, properties, property, value, shortProp,
		    display, orient, align, direction, pack,
		    lib, caller, children,
		    box, params,
		    flexboxes = {}, match, childMatch;
		
		// No boxflex? No dice.
		if (!flexers) {
			return;
		}
		
		forEach(flexers.boxes, function (i, flex) {
			selector = flex.selector;
			properties = flex.properties;
			
			display = orient = align = direction = pack = NULL;
			
			forEach(properties, function (i, prop) {
				
				property = prop.property;
				value = prop.value;
				
				if (property) {
					shortProp = property.replace("box-", EMPTY_STRING);

					switch (shortProp) {
					case "display" :
						if (value === "box") {
							display = value;
						}
						break;
						
					case "orient" :
						orient = value;
						break;

					case "align" :
						align = value;
						break;

					case "direction" :
						direction = value;
						break;

					case "pack" :
						pack = value;
						break;
					}
				}
			});
			
			// Determine library
			lib = LIBRARY;
			
			// Call it.
			caller = lib(flex.selector);
			
			// In an array?
			caller = caller[0] ? caller : [caller];
			
			forEach(caller, function (i, target) {
				// If is DOM object
				if (target.nodeType) {
					// Flag each unique node with FLX_DOM_ID
					target.FLX_DOM_ID = target.FLX_DOM_ID || (++FLX_DOM_ID);
					
					// Find possible child node matches
					children = matchFlexChildren(target, lib, flexers.children);

					// Make sure there is some value associated with box properties
					params = {
						target : target,
						selector : selector,
						children : children,
						display : display,
						orient : orient,
						align : align,
						direction: direction,
						pack : pack
					};

					match = flexboxes[target.FLX_DOM_ID];

					if (match) {
						forEach(params, function (key, value) {
							switch (key) {
							case "selector" :
								if (value && !(new RegExp(value).test(match[key]))) {
									match[key] += value;
								}
								break;
							
							case "children" :
								forEach(params[key], function (k, child) {
									childMatch = FALSE;
									
									forEach(match[key], function (key, existing) {
										if (child.match.FLX_DOM_ID === existing.match.FLX_DOM_ID) {
											childMatch = TRUE;
										}
									});
									
									if (!childMatch) {
										match[key].push(child);
									}
								});
								break;
								
							default :
								if (value) {
									match[key] = value;
								}
								break;
							}
						});
					} else {
						flexboxes[target.FLX_DOM_ID] = getParams(params);
					}
				}
			});
		});
		
		// Loop through each match, initialize constructor
		forEach(flexboxes, function (key, flex) {
			// One final check to ensure each flexbox has a display property
			if (flex.display === "box") {
				// Constructor
				box = new FLX.box(flex);
			}
		});
	}
	
	function calcPx(element, props, dir) {
		var dim = dir.replace(dir.charAt(0), dir.charAt(0).toUpperCase()),
		    value = element["offset" + dim] || 0;
		
		if (value) {
			forEach(props, function (i, prop) {
				prop = parseFloat(element.currentStyle[prop]);
				if (!isNaN(prop)) {
					value -= prop;
				}
			});
		}
		
		return value;
	}
	
	function getTrueValue(element, name) {
		var left, rsLeft,
		    ret = element.currentStyle && element.currentStyle[name],
		    style = element.style;

		if (!PIXEL.test(ret) && NUMBER.test(ret)) {

			// Remember the original values
			left = style.left;
			rsLeft = element.runtimeStyle.left;

			// Put in the new values to get a computed value out
			element.runtimeStyle.left = element.currentStyle.left;
			style.left = ret || 0;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left || 0;
			element.runtimeStyle.left = rsLeft;
		}

		return ret;
	}
	
	function unAuto(element, prop, name) {
		var props;
		
		switch (name) {
		case "width" :
			props = [PADDING_LEFT, PADDING_RIGHT, BORDER_LEFT, BORDER_RIGHT];
			prop = calcPx(element, props, name);
			break;

		case "height" :
			props = [PADDING_TOP, PADDING_BOTTOM, BORDER_TOP, BORDER_BOTTOM];
			prop = calcPx(element, props, name);
			break;

		default :
			prop = getTrueValue(element, name);
			break;
		}

		return prop;
	}
	
	function getPixelValue(element, prop, name) {
		if (PIXEL.test(prop)) {
			return prop;
		}
		
		// if property is auto, do some messy appending
		if (prop === "auto" || prop === "medium") {
			prop = unAuto(element, prop, name);
		} else {
			prop = getTrueValue(element, name);
		}
		
		return prop;
	}
	
	function getComputedStyle(element, property, returnAsInt) {
		var value;
		
		if (win.getComputedStyle) {
			value = win.getComputedStyle(element, NULL)[property];
		} else {
			if (SIZES.test(property)) {
				value = getPixelValue(element, element.currentStyle ? element.currentStyle[property] : 0, property);
			} else {
				value = element.currentStyle[property];
			}
		}
		
		if (returnAsInt) {
			value = parseInt(value, 10);
			
			if (isNaN(value)) {
				value = 0;
			}
		}
		
		return value;
	}
	
	function clientWidth(element) {
		return element.innerWidth || element.clientWidth;
	}
	
	function clientHeight(element) {
		return element.innerHeight || element.clientHeight;
	}
	
	function appendProperty(target, prop, value, prefixName) {
		var cssText = [];

		forEach(PREFIXES, function (i, prefix) {
			cssText.push((prefixName ? prefix : "") + prop + ":" + (!prefixName ? prefix : "") + value);
		});

		target.style.cssText += cssText.join(";");
		return target;
	}
	
	function appendPixelValue(target, prop, value) {
		var targets = target[0] ? target : [target];
		
		forEach(targets, function (i, target) {
			if (target && target.style) {
				target.style[prop] = (value ? (value + "px") : EMPTY_STRING);
			}
		});
	}
	
	function createMatchMatrix(matches, children, type) {
		var groups = {}, keys = [], totalRatio = 0,
		    group, order = "ordinal-group";

		forEach(children, function (i, kid) {
			forEach(matches, function (i, x) {
				if (type) {
					// If no value declared, it's the default.
					group = x[order] || "1";

					if (x.match === kid) {
						groups[group] = groups[group] || [];
						groups[group].push(x);
					}
				} else {
					// If no value declared, it's the default.
					group = x.flex || "0";

					if (x.match === kid && (!x[group] || (x[group] && parseInt(x[group], 10) <= 1))) {
						totalRatio += parseInt(group, 10);

						groups[group] = groups[group] || [];
						groups[group].push(x);
					}
				}
			});
		});

		forEach(groups, function (key) {
			keys.push(key);
		});

		keys.sort(function (a, b) {
			return b - a;
		});

		return {
			keys : keys,
			groups : groups,
			total : totalRatio
		};
	}
	
	function floatDropFix(target, params, instance) {
		// Float drop fix
		// Test offset values. If different, let's bring the widow back
		var offsetProp = "offset" + (params.orient === HORIZONTAL ? "Top" : "Left"),
		    offset, dim;
		
		forEach(target.childNodes, function (i, kid) {
			offset = offset || kid[offsetProp] - getComputedStyle(kid, instance.anti.pos, TRUE);
			
			while ((dim = getComputedStyle(kid, instance.props.dim, TRUE)) && (kid[offsetProp] - getComputedStyle(kid, instance.anti.pos, TRUE)) !== offset) {
				kid.style[instance.props.dim] = dim - 1;
			}
		});
	}
	
	function attachResizeListener(construct, params) {
		FLEX_INSTANCES.push({
			construct : construct,
			params : params
		});
		
		if (!RESIZE_LISTENER) {
			var storedWidth, storedHeight,
			    currentWidth, currentHeight,
			    docBody = doc.body,
			    docEl = doc.documentElement,
			    innerWidth = "innerWidth", innerHeight = "innerHeight",
			    clientWidth = "clientWidth", clientHeight = "clientHeight";
			
			addEvent("resize", function () {
				currentWidth = win[innerWidth] || docEl[innerWidth] || docEl[clientWidth] || docBody[clientWidth];
				currentHeight = win[innerHeight] || docEl[innerHeight] || docEl[clientHeight] || docBody[clientHeight];
				
				if (storedWidth !== currentWidth || storedHeight !== currentHeight) {
					FLX.updateInstance();
					
					storedWidth = currentWidth;
					storedHeight = currentHeight;
				}
			});
			
			RESIZE_LISTENER = TRUE;
		}
	}
	
	selectivizrEngine = (function () {
		var RE_COMMENT = /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g,
		    RE_IMPORT = /@import\s*url\(\s*(["'])?(.*?)\1\s*\)[\w\W]*?;/g,
		    RE_SELECTOR_GROUP = /(^|\})\s*([^\{]*?[\[:][^\{]+)/g,
			
		    // Whitespace normalization regexp's
		    RE_TIDY_TRAILING_WHITESPACE = /([(\[+~])\s+/g,
		    RE_TIDY_LEADING_WHITESPACE = /\s+([)\]+~])/g,
		    RE_TIDY_CONSECUTIVE_WHITESPACE = /\s+/g,
		    RE_TIDY_TRIM_WHITESPACE = /^\s*((?:[\S\s]*\S)?)\s*$/;

		// --[ trim() ]---------------------------------------------------------
		// removes leading, trailing whitespace from a string
		function trim(text) {
			return text.replace(RE_TIDY_TRIM_WHITESPACE, PLACEHOLDER_STRING);
		}

		// --[ normalizeWhitespace() ]------------------------------------------
		// removes leading, trailing and consecutive whitespace from a string
		function normalizeWhitespace(text) {
			return trim(text).replace(RE_TIDY_CONSECUTIVE_WHITESPACE, SPACE_STRING);
		}

		// --[ normalizeSelectorWhitespace() ]----------------------------------
		// tidys whitespace around selector brackets and combinators
		function normalizeSelectorWhitespace(selectorText) {
			return normalizeWhitespace(selectorText.replace(RE_TIDY_TRAILING_WHITESPACE, PLACEHOLDER_STRING).replace(RE_TIDY_LEADING_WHITESPACE, PLACEHOLDER_STRING));
		}

		// --[ patchStyleSheet() ]----------------------------------------------
		// Scans the passed cssText for selectors that require emulation and
		// creates one or more patches for each matched selector.
		function patchStyleSheet(cssText) {
			return cssText.replace(RE_SELECTOR_GROUP, function (m, prefix, selectorText) {
				var selectorGroups, selector;
				
				selectorGroups = selectorText.split(",");
				
				forEach(selectorGroups, function (i, group) {
					selector = normalizeSelectorWhitespace(group) + SPACE_STRING;
				});
				
				return prefix + selectorGroups.join(",");
			});
		}
		
		// --[ getXHRObject() ]-------------------------------------------------
		function getXHRObject() {
			if (win.XMLHttpRequest) {
				return new win.XMLHttpRequest();
			}
			
			try	{ 
				return new win.ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) { 
				return NULL;
			}
		}
		
		// --[ loadStyleSheet() ]-----------------------------------------------
		function loadStyleSheet(url) {
			var xhr = getXHRObject();
			
			xhr.open("GET", url, FALSE);
			xhr.send();
			return (xhr.status === 200) ? xhr.responseText : EMPTY_STRING;	
		}
		
		// --[ resolveUrl() ]---------------------------------------------------
		// Converts a URL fragment to a fully qualified URL using the specified
		// context URL. Returns null if same-origin policy is broken
		function resolveUrl(url, contextUrl) {
			
			// IE9 returns a false positive sometimes(?)
			if (!url) {
				return;
			}
			
			function getProtocolAndHost(url) {
				return url.substring(0, url.indexOf("/", 8));
			}

			// absolute path
			if (PROTOCOL.test(url)) {
				return getProtocolAndHost(contextUrl) === getProtocolAndHost(url) ? url : NULL;
			}

			// root-relative path
			if (url.charAt(0) === "/")	{
				return getProtocolAndHost(contextUrl) + url;
			}

			// relative path
			var contextUrlPath = contextUrl.split("?")[0]; // ignore query string in the contextUrl
			if (url.charAt(0) !== "?" && contextUrlPath.charAt(contextUrlPath.length - 1) !== "/") {
				contextUrlPath = contextUrlPath.substring(0, contextUrlPath.lastIndexOf("/") + 1);
			}

			return contextUrlPath + url;
		}
		
		// --[ parseStyleSheet() ]----------------------------------------------
		// Downloads the stylesheet specified by the URL, removes it's comments
		// and recursivly replaces @import rules with their contents, ultimately
		// returning the full cssText.
		function parseStyleSheet(url) {
			if (url) {
				var cssText = loadStyleSheet(url);
				return cssText.replace(RE_COMMENT, EMPTY_STRING).replace(RE_IMPORT, function (match, quoteChar, importUrl) {
					return parseStyleSheet(resolveUrl(importUrl, url));
				});
			}
			return EMPTY_STRING;
		}
		
		// --[ init() ]---------------------------------------------------------
		return function () {
			// honour the <base> tag
			var url, stylesheet, i, j,
			    baseTags = doc.getElementsByTagName("BASE"),
			    baseUrl = (baseTags.length > 0) ? baseTags[0].href : doc.location.href,
			    cssText, tree, flexers;
			
			for (i = 0, j = doc.styleSheets.length; i < j; i++) {
				stylesheet = doc.styleSheets[i];
				
				if (stylesheet && stylesheet.href !== NULL) {
					url = resolveUrl(stylesheet.href, baseUrl);
					
					if (url) {
						cssText = patchStyleSheet(parseStyleSheet(url));
						tree = buildSelectorTree(cssText);
						flexers = findFlexboxElements(tree);
					}
				}
			}
			
			buildFlexieCall(flexers);
		};
	}());
	
	// Flexie box constructor
	FLX.box = function (params) {
		this.renderModel(params);
	};
	
	FLX.box.prototype = {
		properties : {
			boxModel : function (target, children, params) {
				var selector, stylesheet, generatedRules;

				target.style.display = "block";

				// We'll be using floats, so the easiest way to retain layout
				// is the dreaded clear fix:
				if (!params.cleared) {
					selector = params.selector;
					stylesheet = doc.styleSheets;
					stylesheet = stylesheet[stylesheet.length - 1];
				
					generatedRules = [
						"content:' '",
						"display:block",
						"margin:0",
						"padding:0",
						"border:0",
						"height:0",
						"background:none",
						"clear:both",
						"font-size:0",
						"visibility:hidden"
					].join(";");
				
					if (stylesheet.addRule) {
						if (BROWSER.IE === 6) {
							stylesheet.addRule(selector, "zoom:1;", 0);
						} else if (BROWSER.IE === 7) {
							stylesheet.addRule(selector, "display:inline-block;", 0);
						} else {
							stylesheet.addRule(selector + ":after", generatedRules, 0);
						}
					} else if (stylesheet.insertRule) {
						stylesheet.insertRule(selector + ":after{" + generatedRules + "}", 0);
					}

					params.cleared = TRUE;
				}
			},

			boxDirection : function (target, children, params) {
				if ((params.direction === "reverse" && !params.reversed) || (params.direction === "normal" && params.reversed)) {
					children = children.reverse();

					forEach(children, function (i, kid) {
						target.appendChild(kid);
					});

					params.reversed = !params.reversed;
				}
			},

			boxOrient : function (target, children, params) {
				var self = this, wide, high,
				    targetPadding, firstComputedMargin, combinedMargin;

				wide = {
					pos : "marginLeft",
					opp : "marginRight",
					dim : "width",
					out : "offsetWidth",
					func : clientWidth,
					pad : [PADDING_LEFT, PADDING_RIGHT, BORDER_LEFT, BORDER_RIGHT]
				};

				high = {
					pos : "marginTop",
					opp : "marginBottom",
					dim : "height",
					out : "offsetHeight",
					func : clientHeight,
					pad : [PADDING_TOP, PADDING_BOTTOM, BORDER_TOP, BORDER_BOTTOM]
				};

				if (!SUPPORT) {
					forEach(children, function (i, kid) {
						kid.style.cssFloat = kid.style.styleFloat = "left";

						if (params.orient === VERTICAL) {
							// Margins collapse on a normal box
							// But not on flexbox
							// So we hack away...
							if (i) {
								combinedMargin = getComputedStyle(kid, high.pos, TRUE) + getComputedStyle(children[i - 1], high.opp, TRUE);
								appendPixelValue(kid, high.pos, combinedMargin);
							} else if (BROWSER.IE < 8) {
								// For IE < 8, make sure we account for parent padding as well.
								targetPadding = getComputedStyle(target, high.pad[0], TRUE);
								firstComputedMargin = targetPadding + getComputedStyle(kid, high.pos, TRUE);
								appendPixelValue(kid, high.pos, firstComputedMargin);
							}

							kid.style.cssFloat = kid.style.styleFloat = EMPTY_STRING;
						}
					});
				}

				switch (params.orient) {
				case HORIZONTAL :
				case "inline-axis" :
					self.props = wide;
					self.anti = high;
					break;

				case VERTICAL :
				case "block-axis":
					self.props = high;
					self.anti = wide;
					break;
				}
			},

			boxAlign : function (target, children, params) {
				var self = this,
				    targetDimension = target[self.anti.out],
				    kidDimension;
				
				// Remove padding / border from target dimension
				forEach(self.anti.pad, function (i, pad) {
					targetDimension -= getComputedStyle(target, pad, TRUE);
				});

				switch (params.align) {
				case "stretch" :
					forEach(children, function (i, kid) {
						kidDimension = targetDimension;
						kidDimension -= getComputedStyle(kid, self.anti.pos, TRUE);

						kidDimension -= getComputedStyle(target, self.anti.pad[0], TRUE);
						kidDimension -= getComputedStyle(target, self.anti.pad[1], TRUE);

						forEach(self.anti.pad, function (i, pad) {
							kidDimension -= getComputedStyle(kid, pad, TRUE);
						});

						kidDimension -= getComputedStyle(kid, self.anti.opp, TRUE);
						kidDimension = Math.max(0, kidDimension);
						
						switch (kid.nodeName.toLowerCase()) {
						case "button" :
						case "input" :
						case "select" :
							break;

						default :
							appendPixelValue(kid, self.anti.dim, kidDimension);
							break;
						}
					});
					break;

				case "end" :
					forEach(children, function (i, kid) {
						kidDimension = targetDimension - kid[self.anti.out];
						kidDimension -= getComputedStyle(kid, self.anti.opp, TRUE);
						appendPixelValue(kid, self.anti.pos, kidDimension);
					});
					break;

				case "center":
					forEach(children, function (i, kid) {
						kidDimension = (targetDimension - kid[self.anti.out]) / 2;
						appendPixelValue(kid, self.anti.pos, kidDimension);
					});
					break;
				}
			},

			boxPack : function (target, children, params) {
				var self = this,
				    groupDimension = 0,
				    firstComputedMargin = 0,
				    targetPadding = 0,
				    totalDimension, fractionedDimension,
				    currentDimension, remainder,
				    length = children.length - 1;

				forEach(children, function (i, kid) {
					groupDimension += kid[self.props.out];
					groupDimension += getComputedStyle(kid, self.props.pos, TRUE);

					if (params.orient === HORIZONTAL) {
						groupDimension += getComputedStyle(kid, self.props.opp, TRUE);
					}
				});

				if (params.orient === VERTICAL) {
					groupDimension += getComputedStyle(children[children.length - 1], self.props.opp, TRUE);
					
					// Fixe IE < 8 collapsing margin
					if (BROWSER.IE < 8) {
						targetPadding = getComputedStyle(target, self.props.pad[0], TRUE);
					}
				}

				firstComputedMargin = getComputedStyle(children[0], self.props.pos, TRUE);
				totalDimension = target[self.props.out] - groupDimension;
				
				// Remove padding / border from target dimension
				forEach(self.props.pad, function (i, pad) {
					totalDimension -= getComputedStyle(target, pad, TRUE);
				});
				
				// IE6 double float margin bug
				// http://www.positioniseverything.net/explorer/doubled-margin.html
				if (params.orient === HORIZONTAL && BROWSER.IE === 6) {
					totalDimension /= 2;
				}

				switch (params.pack) {
				case "end" :
					appendPixelValue(children[0], self.props.pos, targetPadding + firstComputedMargin + totalDimension);
					break;

				case "center" :
					if (targetPadding) {
						targetPadding /= 2;
					}
					
					appendPixelValue(children[0], self.props.pos, targetPadding + firstComputedMargin + (totalDimension / 2));
					break;

				case "justify" :
					fractionedDimension = Math.floor((targetPadding + totalDimension) / length);
					remainder = (fractionedDimension * length) - totalDimension;
					
					var i = children.length - 1,
					    value;
					
					while (i) {
						kid = children[i];
						currentDimension = fractionedDimension;

						if (remainder) {
							currentDimension++;
							remainder++;
						}
						
						value = getComputedStyle(kid, self.props.pos, TRUE) + currentDimension;
						appendPixelValue(kid, self.props.pos, value);
						
						// IE < 9 collapsing margin fix
						if (params.orient === VERTICAL && BROWSER.IE < 9 && children[i - 1]) {
							appendPixelValue(children[i - 1], self.props.opp, value);
						}
						
						i--;
					}
					
					break;
				}
			},
			
			boxOrdinalGroup : function (target, children, params) {
				var self = this,
				    saveMarginOffset, organizeChildren, resetMarginOffset,
				    matrix, first, firstComputedMargin;

				if (!children.length) {
					return;
				}
				
				saveMarginOffset = function (matrix, children) {
					firstComputedMargin = getComputedStyle(children[0], self.props.pos, TRUE);
				};
				
				organizeChildren = function (matrix) {
					var keys = matrix.keys,
					    ordinals = matrix.groups;
					
					forEach(keys, function (i, key) {
						forEach(ordinals[key].reverse(), function (i, x) {
							target.insertBefore(x.match, target.firstChild);
						});
					});
				};
				
				resetMarginOffset = function (matrix, children) {
					appendPixelValue(children, self.props.pos, NULL);
					appendPixelValue(children[0], self.props.pos, firstComputedMargin);
					firstComputedMargin = NULL;
				};

				matrix = createMatchMatrix(params.children, children, true);

				if (matrix.keys.length > 1) {
					saveMarginOffset(matrix, target.childNodes);
					organizeChildren(matrix);
					resetMarginOffset(matrix, target.childNodes);
				}
			},

			boxFlex : function (target, children, params) {
				var self = this,
				    testForRestrictiveProperties,
				    findTotalWhitespace,
				    distributeRatio,
				    reBoxAlign,
				    group = "flex-group",
				    matrix, restrict, whitespace, distro, realign;

				if (!children.length) {
					return;
				}
				
				testForRestrictiveProperties = function (matrix) {
					var flexers = matrix.groups,
					    keys = matrix.keys, max;
					
					forEach(keys, function (i, key) {
						forEach(flexers[key], function (i, x) {
							max = NULL;
							
							forEach(x.properties, function (i, rule) {
								if ((RESTRICTIVE_PROPERTIES).test(rule.property)) {
									max = parseFloat(rule.value);
								}
							});
							
							if (!max || x.match[self.props.out] > max) {
								appendPixelValue(x.match, self.props.pos, NULL);
							}
							
						});
					});
				};

				findTotalWhitespace = function (matrix) {
					var groupDimension = 0,
					    whitespace, ration;

					forEach(children, function (i, kid) {
						groupDimension += kid[self.props.out];
						groupDimension += getComputedStyle(kid, self.props.pos, TRUE);
						groupDimension += getComputedStyle(kid, self.props.opp, TRUE);
					});

					whitespace = target[self.props.out] - groupDimension;
					
					forEach(self.props.pad, function (i, pad) {
						whitespace -= getComputedStyle(target, pad, TRUE);
					});
					
					ration = (whitespace / matrix.total);

					return {
						whitespace : whitespace,
						ration : ration
					};
				};

				distributeRatio = function (matrix, whitespace) {
					var flexers = matrix.groups,
					    keys = matrix.keys,
					    ration = whitespace.ration,
					    widthRation, trueDim, newWidth;

					forEach(keys, function (i, key) {
						widthRation = (ration * key);

						forEach(flexers[key], function (i, x) {
							if (x.match) {
								trueDim = getComputedStyle(x.match, self.props.dim, TRUE);
								newWidth = Math.max(0, (trueDim + widthRation));
								appendPixelValue(x.match, self.props.dim, newWidth);
							}
						});
						
						// Float drop fix
						// Test offset values. If different, let's bring the widow back
						floatDropFix(target, params, self);
					});
				};

				matrix = createMatchMatrix(params.children, children);

				if (matrix.total) {
					restrict = testForRestrictiveProperties(matrix);
					whitespace = findTotalWhitespace(matrix);
				
					// Distribute the calculated ratios among the children
					distro = distributeRatio(matrix, whitespace);
				}
			}
		},

		setup : function (target, children, params) {
			var self = this;
			
			if (SUPPORT && SUPPORT.partialSupport) {
				self.properties.boxOrient.call(self, target, children, params);
				
				if ((params.align === "stretch") && !SUPPORT.boxAlignStretch) {
					self.properties.boxAlign.call(self, target, children, params);
				}
				
				if ((params.pack === "justify") && !SUPPORT.boxPackJustify) {
					self.properties.boxPack.call(self, target, children, params);
				}
			} else if (!SUPPORT) {
				forEach(self.properties, function (key, func) {
					func.call(self, target, children, params);
				});
			}
		},

		trackDOM : function (params) {
			attachResizeListener(this, params);
		},

		updateModel : function (params) {
			var target = params.target,
			    children = params.nodes;

			// Null properties
			forEach(children, function (i, kid) {
				kid.style.cssText = EMPTY_STRING;
			});

			this.setup(target, children, params);
		},

		renderModel : function (params) {
			var self = this,
			    target = params.target, i, j,
			    nodes = target.childNodes, node,
			    children = [];
			
			// Sanity check.
			if (!target.length && !nodes) {
				return;
			}
			
			for (i = 0, j = nodes.length; i < j; i++) {
				node = nodes[i];
				
				if (node) {
					switch (node.nodeName.toLowerCase()) {
					case "script" :
					case "style" :
					case "link" :
						break;

					default :
						if (node.nodeType === 1) {
							children.push(node);
						} else {
							target.removeChild(node);
							i--;
						}
						break;
					}
				}
			}
			
			params.nodes = children;
			
			// Setup properties
			self.updateModel(params);
			
			// Resize / DOM Polling Events
			// Delay for an instant because IE6 is insane.
			win.setTimeout(function () {
				self.trackDOM(params);
			}, 0);
		}
	};
	
	FLX.updateInstance = function (target) {
		forEach(FLEX_INSTANCES, function (i, instance) {
			if (!target || (instance && instance.params && instance.params.target === target)) {
				instance.construct.updateModel(instance.params);
			}
		});
	};
	
	FLX.destroyInstance = function (target) {
		var instances = FLEX_INSTANCES;
		
		forEach(FLEX_INSTANCES, function (i, instance) {
			if (instance && instance.params && instance.params.target === target) {
				instance.params.target.FLX_DOM_ID = null;
				instance.params.target.style.cssText = "";
				
				forEach(instance.params.children, function (i, x) {
					x.match.style.cssText = "";
				});
				
				instances = FLEX_INSTANCES.splice(i, 1);
			}
		});
		
		FLEX_INSTANCES = instances;
	};

	FLX.flexboxSupport = function () {
		var partialSupportGrid = {};
		
		var height = 100, childHeight,
		    dummy = doc.createElement("flxbox"),
		    child = '<b style="margin: 0; padding: 0; display:block; width: 10px; height:' + (height / 2) + 'px"></b>',
		    i, j, tests, key, result;

		dummy.style.width = dummy.style.height = height + "px";
		
		for (i = 0, j = 3; i < j; i++) {
			dummy.innerHTML += child;
		}

		appendProperty(dummy, "display", "box");
		appendProperty(dummy, "box-align", "stretch", TRUE);
		appendProperty(dummy, "box-pack", "justify", TRUE);

		doc.body.appendChild(dummy);
		childHeight = dummy.firstChild.offsetHeight;
		
		tests = {
			boxAlignStretch : function () {
				return (childHeight === 100);
			},
			
			boxPackJustify : function () {
				var totalOffset = 0,
				    i, j, child;
				
				for (i = 0, j = dummy.childNodes.length; i < j; i++) {
					child = dummy.childNodes[i];
					totalOffset += child.offsetLeft;
				}
				
				return (totalOffset === 135);
			}
		};
		
		for (key in tests) {
			result = tests[key]();
			
			if (!result) {
				partialSupportGrid.partialSupport = true;
			}
			
			partialSupportGrid[key] = result;
		}
		
		doc.body.removeChild(dummy);
		return ~ (dummy.style.display).indexOf("box") ? partialSupportGrid : FALSE;
	};
	
	FLX.init = function () {
		FLX.flexboxSupported = SUPPORT = FLX.flexboxSupport();
		LIBRARY = determineSelectorMethod();

		if ((!SUPPORT || SUPPORT.partialSupport) && LIBRARY) {
			selectivizrEngine();
		}
	};
	
	// Flexie Version
	FLX.version = 0.8;

	// Load when the DOM is ready
	attachLoadMethod(FLX.init);
	
	return FLX;
}(this, document));

// For Google's Closure Compiler
// Exports Public Properties

// Turn off dot notation warning for GCC
/*jslint sub: true */
window["Flexie"] = Flexie;
Flexie["version"] = Flexie.version;
Flexie["updateInstance"] = Flexie.updateInstance;
Flexie["destroyInstance"] = Flexie.destroyInstance;
Flexie["flexboxSupported"] = Flexie.flexboxSupported;