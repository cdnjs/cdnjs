/*Chibi v1.0.9, Copyright (C) 2013 Kyle Barrow

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/
(function () {
	'use strict';

	var readyfn = [],
		loadedfn = [],
		domready = false,
		pageloaded = false,
		jsonpcount = 0,
		d = document,
		w = window;

	// Fire any function calls on ready event
	function fireReady() {
		var i;
		domready = true;

		for (i = 0; i < readyfn.length; i += 1) {
			readyfn[i]();
		}
		readyfn = [];
	}

	// Fire any function calls on loaded event
	function fireLoaded() {
		var i;
		pageloaded = true;

		// For browsers with no DOM loaded support
		if (!domready) {
			fireReady();
		}

		for (i = 0; i < loadedfn.length; i += 1) {
			loadedfn[i]();
		}
		loadedfn = [];
	}

	// Check DOM ready, page loaded
	if (d.addEventListener) {
		// Standards
		d.addEventListener('DOMContentLoaded', fireReady, false);
		w.addEventListener('load', fireLoaded, false);
	} else if (d.attachEvent) {
		// IE
		d.attachEvent('onreadystatechange', fireReady);
		// IE < 9
		w.attachEvent('onload', fireLoaded);
	} else {
		// Anything else
		w.onload = fireLoaded;
	}

	// Utility functions

	// Loop through node array
	function nodeLoop(fn, nodes) {
		var i;

		// Good idea to walk up the DOM
		for (i = nodes.length - 1; i >= 0; i -= 1) {
			fn(nodes[i]);
		}
	}

	// Convert to camel case
	function cssCamel(property) {
		return property.replace(/-\w/g, function (result) {return result.charAt(1).toUpperCase(); });
	}

	// Get computed style
	function computeStyle(elm, property) {
		// IE, everything else or null
		return (elm.currentStyle) ? elm.currentStyle[cssCamel(property)] : (w.getComputedStyle) ? w.getComputedStyle(elm, null).getPropertyValue(property) : null;

	}

	// Returns URI encoded query string pair
	function queryPair(name, value) {
		return encodeURIComponent(name).replace(/%20/g, '+') + '=' + encodeURIComponent(value).replace(/%20/g, '+');
	}

	// Set CSS, important to wrap in try to prevent error thown on unsupported property
	function setCss(elm, property, value) {
		try {
			elm.style[cssCamel(property)] = value;
		} catch (e) {}
	}

	// Show CSS
	function showCss(elm) {
		elm.style.display = '';

		// For elements still hidden by style block
		if (computeStyle(elm, 'display') === 'none') {
			elm.style.display = 'block';
		}
	}

	// Handle standard method value returns
	function returnValues(values) {
		values = values.reverse();

		// Return string for singles
		if (values.length === 1) {
			values = values[0];
		}

		return values;
	}

	// Serialize form & JSON values
	function serializeData(nodes) {
		var querystring = '', subelm, i, j;

		if (nodes.constructor === Object) { // Serialize JSON data
			for (subelm in nodes) {
				if (nodes.hasOwnProperty(subelm)) {
					if (nodes[subelm].constructor === Array) {
						for (i = 0; i < nodes[subelm].length; i += 1) {
							querystring += '&' + queryPair(subelm, nodes[subelm][i]);
						}
					} else {
						querystring += '&' + queryPair(subelm, nodes[subelm]);
					}
				}
			}

		} else { // Serialize node data

			nodeLoop(function (elm) {
				if (elm.nodeName === 'FORM') {
					for (i = 0; i < elm.elements.length; i += 1) {
						subelm = elm.elements[i];

						if (!subelm.disabled) {
							switch (subelm.type) {
							// Ignore buttons, unsupported XHR 1 form fields
							case 'button':
							case 'image':
							case 'file':
							case 'submit':
							case 'reset':
								break;

							case 'select-one':
								if (subelm.length > 0) {
									querystring += '&' + queryPair(subelm.name, subelm.value);
								}
								break;

							case 'select-multiple':
								for (j = 0; j < subelm.length; j += 1) {
									if (subelm[j].selected) {
										querystring += '&' + queryPair(subelm.name, subelm[j].value);
									}
								}
								break;

							case 'checkbox':
							case 'radio':
								if (subelm.checked) {
									querystring += '&' + queryPair(subelm.name, subelm.value);
								}
								break;

							// Everything else including shinny new HTML5 input types
							default:
								querystring += '&' + queryPair(subelm.name, subelm.value);
							}
						}
					}
				}
			}, nodes);
		}
		// Tidy up first &
		return (querystring.length > 0) ? querystring.substring(1) : '';
	}

	// Get nodes and return chibi
	function chibi(selector) {

		var cb, nodes = [], json = false, nodelist, i;

		if (selector) {

			// Element node, would prefer to use (selector instanceof HTMLElement) but no IE support
			if (selector.nodeType && selector.nodeType === 1) {
				nodes = [selector]; // return element as node list
			} else if (typeof selector === 'object') {
				// JSON, document object or node list, would prefer to use (selector instanceof NodeList) but no IE support
				json = (typeof selector.length !== 'number');
				nodes = selector;
			} else if (typeof selector === 'string') {

				// A very light querySelectorAll polyfill for IE < 8. It suits my needs but is restricted to IE CSS support, is no speed demon, and does leave older mobile browsers in the cold (that support neither querySelectorAll nor currentStyle/getComputedStyle). If you want to use a fuller featured selector engine like Qwery, Sizzle et al, just return results to the nodes array: nodes = altselectorengine(selector)

				// IE < 8
				if (!d.querySelectorAll) {
					// Polyfill querySelectorAll
					d.querySelectorAll = function (selector) {

						var style, head = d.getElementsByTagName('head')[0], allnodes, selectednodes = [], i;

						style = d.createElement('STYLE');
						style.type = 'text/css';

						if (style.styleSheet) {
							style.styleSheet.cssText = selector + ' {a:b}';

							head.appendChild(style);

							allnodes = d.getElementsByTagName('*');

							for (i = 0; i < allnodes.length; i += 1) {
								if (computeStyle(allnodes[i], 'a') === 'b') {
									selectednodes.push(allnodes[i]);
								}
							}

							head.removeChild(style);
						}

						return selectednodes;
					};
				}

				nodelist = d.querySelectorAll(selector);

				// Convert node list to array so results have full access to array methods
				// Array.prototype.slice.call not supported in IE < 9 and often slower than loop anyway
				for (i = 0; i < nodelist.length; i += 1) {
					nodes[i] = nodelist[i];
				}

			}
		}

		// Only attach nodes if not JSON
		cb = json ? {} : nodes;

		// Public functions

		// Fire on DOM ready
		cb.ready = function (fn) {
			if (fn) {
				if (domready) {
					fn();
				} else {
					readyfn.push(fn);
				}
			}
		};
		// Fire on page loaded
		cb.loaded = function (fn) {
			if (fn) {
				if (pageloaded) {
					fn();
				} else {
					loadedfn.push(fn);
				}
			}
		};
		// Executes a function on nodes
		cb.loop = function (fn) {
			if (typeof fn === "function") {
				nodeLoop(function (elm) {
					// <= IE 8 loses scope so need to apply
					return fn.apply(elm, arguments);
				}, nodes);
			}
		};
		// Find nodes
		cb.find = function (filter) {
			if (filter) {
				var temp = [], i;

				switch (filter) {
				case 'first':
					if (nodes.length > 0) {
						nodes = [nodes.shift()];
					}
					break;

				case 'last':
					if (nodes.length > 0) {
						nodes = [nodes.pop()];
					}
					break;

				case 'odd':
				case 'even':
					for (i = (filter === "odd") ? 0 : 1; i < nodes.length; i += 2) {
						temp.push(nodes[i]);
					}
					nodes = temp;
					break;
				}
			}

			return (nodes.length > 0) ? (nodes.length === 1) ? nodes[0] : nodes : false;
		};
		// Hide node
		cb.hide = function () {
			nodeLoop(function (elm) {
				elm.style.display = 'none';
			}, nodes);
		};
		// Show node
		cb.show = function () {
			nodeLoop(function (elm) {
				showCss(elm);
			}, nodes);
		};
		// Toggle node display
		cb.toggle = function () {
			nodeLoop(function (elm) {

				// computeStyle instead of style.display == 'none' catches elements that are hidden via style block
				if (computeStyle(elm, 'display') === 'none') {
					showCss(elm);
				} else {
					elm.style.display = 'none';
				}

			}, nodes);
		};
		// Remove node
		cb.remove = function () {
			var removed = nodes.length;

			nodeLoop(function (elm) {
				// Catch error in unlikely case elm has been removed
				try {
					elm.parentNode.removeChild(elm);
				} catch (e) {}
			}, nodes);

			// Clear nodes after remove
			nodes = [];
		};
		// Get/Set CSS
		cb.css = function (property, value) {

			var values = [];

			nodeLoop(function (elm) {
				if (value) {
					setCss(elm, property, value);
				} else if (elm.style[cssCamel(property)]) {
					values.push(elm.style[cssCamel(property)]);
				} else if (computeStyle(elm, property)) {
					values.push(computeStyle(elm, property));
				} else {
					values.push(null);
				}
			}, nodes);

			// Get CSS property: return values
			if (values.length > 0) {
				return returnValues(values);
			}
		};
		// Get/Set/Add/Remove class
		cb.cls = function (classes, action) {
			var values = [], classarray, classname, search, has, i;

			if (classes) {
				// Trim any whitespace
				classarray = classes.split(/\s+/);
				action = action || 'replace';
			}

			nodeLoop(function (elm) {

				classname = elm.className;

				if (classes) {
					switch (action) {
					case 'add':
						elm.className = classname + " " + classes;
						break;

					case 'replace':
						elm.className = classes;
						break;

					case 'has':
					case 'toggle':
					case 'remove':
						has = true;

						for (i = 0; i < classarray.length; i += 1) {

							search = new RegExp('\\b' + classarray[i] + '\\b', 'g');

							if (action === "has") {
								if (!classname.match(search)) {
									has = false;
									break;
								}
							} else if (action === "toggle") {
								elm.className = (elm.className.match(search)) ? elm.className.replace(search, '') : elm.className + " " + classarray[i];
							} else { // replace
								elm.className = elm.className.replace(search, '');
							}

						}

						if (action === "has") {
							values.push(has);
						}

						break;
					}
					elm.className = elm.className.replace(/^\s+|\s+$/g, '');
				} else {
					values.push(classname);
				}
			}, nodes);

			if (values.length > 0) {
				return returnValues(values);
			}

		};
		// Get/Set innerHTML optionally before/after
		cb.html = function (value, location) {
			var values = [], tmpnodes, tmpnode;

			nodeLoop(function (elm) {

				if (location) {
					// No insertAdjacentHTML support for FF < 8 and IE doesn't allow insertAdjacentHTML table manipulation, so use this instead
					// Convert string to node. We can't innerHTML on a document fragment
					tmpnodes = d.createElement('div');
					tmpnodes.innerHTML = value;

					while ((tmpnode = tmpnodes.lastChild) !== null) {
						// Catch error in unlikely case elm has been removed
						try {
							if (location === 'before') {
								elm.parentNode.insertBefore(tmpnode, elm);
							} else if (location === 'after') {
								elm.parentNode.insertBefore(tmpnode, elm.nextSibling);
							}
						} catch (e) {break; }
					}
				} else {
					if (value) {
						elm.innerHTML = value;
					} else {
						values.push(elm.innerHTML);
					}
				}
			}, nodes);

			if (values.length > 0) {
				return returnValues(values);
			}
		};
		// Get/Set HTML attributes
		cb.attr = function (name, value) {
			var values = [];

			nodeLoop(function (elm) {
				if (name) {
					name = name.toLowerCase();

					switch (name) {
					// IE < 9 doesn't allow style or class via get/setAttribute so switch. cssText returns prettier CSS anyway
					case 'style':
						if (value) {
							elm.style.cssText = value;
						} else if (elm.style.cssText) {
							values.push(elm.style.cssText);
						} else {
							values.push(null);
						}
						break;

					case 'class':
						if (value) {
							elm.className = value;
						} else if (elm.className) {
							values.push(elm.className);
						} else {
							values.push(null);
						}
						break;

					default:
						if (value) {
							elm.setAttribute(name, value);
						} else if (elm.getAttribute(name)) {
							values.push(elm.getAttribute(name));
						} else {
							values.push(null);
						}
					}
				}
			}, nodes);

			if (values.length > 0) {
				return returnValues(values);
			}

		};
		// Get/Set form element values
		cb.val = function (replacement) {
			var radiogroup = [], values = [], i, j, grouped, active;

			if (typeof replacement === 'string') {
				replacement = [replacement];
			}

			nodeLoop(function (elm) {

				if (replacement) {
					switch (elm.nodeName) {
					case 'SELECT':
						for (i = 0; i < elm.length; i += 1) {
							// Multiple select
							for (j = 0; j < replacement.length; j += 1) {
								elm[i].selected = '';

								if (elm[i].value === replacement[j]) {
									elm[i].selected = 'selected';
									break;
								}
							}
						}
						break;

					case 'INPUT':
						switch (elm.type) {
						case 'checkbox':
						case 'radio':
							elm.checked = '';

							for (i = 0; i < replacement.length; i += 1) {
								if (elm.value === replacement[i]) {
									elm.checked = 'checked';
									break;
								}
							}

							break;
						default:
							elm.value = replacement[0];
						}

						break;

					case 'TEXTAREA':
					case 'BUTTON':
						elm.value = replacement[0];
						break;
					}

				} else {
					switch (elm.nodeName) {
					case 'SELECT':

						active = values.length;

						values.push([]);

						for (i = 0; i < elm.length; i += 1) {
							if (elm[i].selected) {
								values[active].push(elm[i].value);
							}
						}

						switch (values[active].length) {
						case 0:
							values[active] = null;
							break;

						case 1:
							values[active] = values[active][0];
							break;
						}

						break;

					case 'INPUT':
						switch (elm.type) {
						case 'checkbox':
							if (elm.checked) {
								values.push(elm.value);
							} else {
								values.push(null);
							}
							break;

						case 'radio':

							grouped = false;

							for (i = 0; i < radiogroup.length; i += 1) {
								if (radiogroup[i][0] === elm.name) {
									if (elm.checked) {
										values[radiogroup[i][1]] = elm.value;
									}
									grouped = true;
								}
							}

							if (!grouped) {
								radiogroup.push([elm.name, values.length]);

								if (elm.checked) {
									values.push(elm.value);
								} else {
									values.push(null);
								}
							}

							break;
						// Everything else including shinny new HTML5 input types
						default:
							values.push(elm.value);
						}

						break;

					case 'TEXTAREA':
					case 'BUTTON':
						values.push(elm.value);
						break;
					}

				}

			}, nodes);

			if (values.length > 0) {
				return returnValues(values);
			}
		};
		// Event handler
		cb.on = function (event, fn, clear) {

			if (selector === w || selector === d) {
				nodes = [selector];
			}

			nodeLoop(function (elm) {
				if (d.addEventListener) {
					if (clear) {
						elm.removeEventListener(event, fn, false);
					} else {
						elm.addEventListener(event, fn, false);
					}
				} else if (d.attachEvent) {

					if (clear) {
						elm.detachEvent('on' + event, elm[event + fn]);
						// Tidy up
						elm[event + fn] = null;
					} else {
						// <= IE 8 loses scope so need to apply, we add this to object so we can detach later (can't detach anonymous functions)
						elm[event + fn] =  function () { return fn.apply(elm, arguments); };

						elm.attachEvent('on' + event, elm[event + fn]);
					}
				}
			}, nodes);
		};
		// Basic XHR 1, no file support. Shakes fist at IE
		cb.ajax = function (url, method, callback, nocache, nojsonp) {
			var xhr,
				query = serializeData(nodes),
				querystart = (url.indexOf('?') === -1) ? '?' : '&',
				hostsearch = new RegExp('http[s]?://(.*?)/', 'gi'),
				domain = hostsearch.exec(url),
				timestamp = '_ts=' + (+new Date()),
				head = d.getElementsByTagName('head')[0],
				jsonpcallback = 'chibi' + (+new Date()) + (jsonpcount += 1),
				script;

			// JSONP if cross domain url
			if (!nojsonp && domain && w.location.host !== domain[1]) {

				url += querystart + query;

				if (nocache) {
					url += '&' + timestamp;
				}

				// Replace possible encoded ?
				url = url.replace('=%3F', '=?');

				// Replace jsonp ? with callback
				if (callback && url.indexOf('=?') !== -1) {

					url = url.replace('=?', '=' + jsonpcallback);

					w[jsonpcallback] = function (data) {
						try {
							callback(data, 200);
						} catch (e) {}

						// Tidy up
						w[jsonpcallback] = undefined;
					};
				}

				// JSONP
				script = document.createElement('script');
				script.async = true;
				script.src = url;

				// Tidy up
				script.onload = function () {
					head.removeChild(script);
				};

				head.appendChild(script);

			} else {

				method = method || 'GET';

				if (w.XMLHttpRequest) {
					xhr = new XMLHttpRequest();
				} else if (w.ActiveXObject) {
					xhr = new ActiveXObject('Microsoft.XMLHTTP'); // IE < 9
				}

				if (xhr) {
					method = method.toUpperCase();

					if (method === 'GET') {
						url += querystart + query;
						query = null;
					}

					if (nocache) {
						url += (method === 'POST') ? querystart + timestamp : '&' + timestamp;
					}

					// Douglas Crockford: "Synchronous programming is disrespectful and should not be employed in applications which are used by people"
					xhr.open(method, url, true);

					xhr.onreadystatechange = function () {
						if (xhr.readyState === 4) {
							if (callback) {
								callback(xhr.responseText, xhr.status);
							}
						}
					};

					if (method === 'POST') {
						xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					}

					if (nojsonp) {
						xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					}

					xhr.send(query);

				}
			}
		};

		return cb;
	}

	// Set Chibi's global namespace here ($)
	w.$ = chibi;

}());