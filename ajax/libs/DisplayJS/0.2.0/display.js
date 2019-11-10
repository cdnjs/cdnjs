"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/******************************************/
/*          © Arthur Guiot 2017           */
/*               DisplayJS                */
/******************************************/
var DisplayJS = function () {
	function DisplayJS(obj) {
		_classCallCheck(this, DisplayJS);

		this.obj = obj;
	}
	// DOM manipulation and browser API.


	_createClass(DisplayJS, [{
		key: "var",
		value: function _var(push) {
			var _this = this;

			var var_push = function var_push() {
				_this.if();
				_this.else();
				var elements = document.querySelectorAll("[var]");
				for (var _i = 0; _i < elements.length; _i++) {
					var attr = elements[_i].getAttribute("var");
					elements[_i].innerHTML = _this.obj[attr];
				}
			};
			if (!push) {
				var_push();
			} else if (push == true) {
				var_push();
				this.live(this.obj, function () {
					var_push();
				});
			} else {
				window.setInterval(function () {
					var_push();
				}, push);
			}
		}
	}, {
		key: "xss",
		value: function xss(str) {
			return encodeURI(str);
		}
	}, {
		key: "target",
		value: function target(callback) {
			var _this2 = this;

			if (!callback) {
				var callback = function callback() {
					_this2.var();
				};
			}
			var addEventListener = function () {
				if (document.addEventListener) {
					return function (element, event, handler) {
						element.addEventListener(event, handler, false);
					};
				} else {
					return function (element, event, handler) {
						element.attachEvent("on" + event, handler);
					};
				}
			}();
			var obj = this.obj;
			[].forEach.call(document.querySelectorAll('[target]'), function (x, i, a) {
				addEventListener(a[i], "change", function () {
					var attr1 = a[i].getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr1] = this.checked;
					} else {
						obj[attr1] = this.value;
					}
					callback();
				});
				addEventListener(a[i], "keydown", function () {
					var attr2 = a[i].getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr2] = this.checked;
					} else {
						obj[attr2] = this.value;
					}
					callback();
				});
				addEventListener(a[i], "input", function () {
					var attr3 = a[i].getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr3] = this.checked;
					} else {
						obj[attr3] = this.value;
					}
					callback();
				});
				addEventListener(a[i], "paste", function () {
					var attr4 = a[i].getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr4] = this.checked;
					} else {
						obj[attr4] = this.value;
					}
					callback();
				});
			});
		}
	}, {
		key: "if",
		value: function _if(push) {
			var _this3 = this;

			var if_push = function if_push() {
				var elements = document.querySelectorAll("[if]");
				for (var _i2 = 0; _i2 < elements.length; _i2++) {
					var attr = elements[_i2].getAttribute("if");
					var el = [];
					el.push(elements[_i2]);
					if (_this3.obj[attr] == true) {
						_this3.show(el);
					} else {
						_this3.hide(el);
					}
				}
			};
			if (!push) {
				if_push();
			} else if (push == true) {
				if_push();
				this.live(this.obj, function () {
					if_push();
				});
			} else {
				window.setInterval(function () {
					if_push();
				}, push);
			}
		}
	}, {
		key: "else",
		value: function _else(push) {
			var _this4 = this;

			var else_push = function else_push() {
				var elements = document.querySelectorAll("[else]");
				for (var _i3 = 0; _i3 < elements.length; _i3++) {
					var attr = elements[_i3].getAttribute("else");
					var el = [];
					el.push(elements[_i3]);
					if (_this4.obj[attr] == true) {
						_this4.hide(el);
					} else {
						_this4.show(el);
					}
				}
			};
			if (!push) {
				else_push();
			} else if (push == true) {
				else_push();
				this.live(this.obj, function () {
					else_push();
				});
			} else {
				window.setInterval(function () {
					else_push();
				}, push);
			}
		}
	}, {
		key: "repeat",
		value: function repeat(el, array, join, start, end) {
			if (!start) {
				var start = "";
			}
			if (!end) {
				var end = "";
			}
			var text = start;
			for (var _i4 = 0; _i4 < array.length; _i4++) {
				text += join + String(array[_i4]);
			}
			text += end;
			el[0].innerHTML = text;
		}
	}, {
		key: "custom",
		value: function custom(targetAttr, push) {
			var _this5 = this;

			var var_push = function var_push() {
				var elements = document.querySelectorAll("[" + targetAttr + "]");
				for (var _i5 = 0; _i5 < elements.length; _i5++) {
					var attr = elements[_i5].getAttribute(targetAttr);
					elements[_i5].innerHTML = _this5.obj[attr];
				}
			};
			if (!push) {
				var_push();
			} else if (push == true) {
				var_push();
				this.live(this.obj, function () {
					var_push();
				});
			} else {
				window.setInterval(function () {
					var_push();
				}, push);
			}
		}
	}, {
		key: "live",
		value: function live(watched, callback) {
			var ObjUtils = {
				watch: function watch(object, property, onPropertyChange) {
					var descriptor = Object.getOwnPropertyDescriptor(object, property);

					if (typeof descriptor === "undefined") throw new Error("Invalid descriptor for property: " + property + ", object: " + object);

					if (typeof onPropertyChange !== "function") throw new Error("Invalid onPropertyChange handler: " + onPropertyChange);

					var value = object[property];

					Object.defineProperty(object, property, {
						enumerable: true,
						configurable: true,
						get: function get() {
							return value;
						},
						set: function set(newValue) {
							if (newValue === value) return;
							onPropertyChange(object, property, newValue, value);
							return value = newValue;
						}
					});
				},
				watchAll: function watchAll(object, onPropertyChange) {
					if (typeof onPropertyChange !== "function") throw new Error("Invalid onPropertyChange handler: " + onPropertyChange);

					for (var property in object) {
						this.watch(object, property, onPropertyChange);
					}
				}
			};
			ObjUtils.watchAll(watched, function (obj, prop, newVal, oldVal) {
				callback(obj, prop, newVal, oldVal);
			});
		}
	}, {
		key: "all",
		value: function all(element, callback) {
			element.forEach(function (data) {
				var node = [];
				node.push(data);
				callback(node);
			});
		}
	}, {
		key: "text",
		value: function (_text) {
			function text(_x, _x2) {
				return _text.apply(this, arguments);
			}

			text.toString = function () {
				return _text.toString();
			};

			return text;
		}(function (element, text) {
			element[0].innerHTML = this.xss(text);
		})
	}, {
		key: "html",
		value: function html(element, _html) {
			element[0].innerHTML = text;
		}
	}, {
		key: "prepend",
		value: function prepend(element, html) {
			var div = document.createElement('div');
			div.innerHTML = html;
			element[0].insertBefore(div, element.firstChild);
		}
	}, {
		key: "append",
		value: function append(element, html) {
			element[0].innerHTML += html;
		}
	}, {
		key: "after",
		value: function after(element, html) {
			element[0].insertAdjacentHTML('afterend', html);
		}
	}, {
		key: "before",
		value: function before(element, html) {
			element[0].insertAdjacentHTML('beforebegin', html);
		}
	}, {
		key: "clone",
		value: function clone(element) {
			element[0].cloneNode(true);
		}
	}, {
		key: "is",
		value: function is(el1, el2) {
			if (el1 === el2) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "select",
		value: function select(str) {
			var obj = document.querySelectorAll(str);
			return obj;
		}
	}, {
		key: "single",
		value: function single(str) {
			var obj = document.querySelectorAll(str);
			var node = [];
			node.push(obj[0]);
			return node;
		}
	}, {
		key: "empty",
		value: function empty(element) {
			element[0].innerHTML = null;
		}
	}, {
		key: "valEmpty",
		value: function valEmpty(element) {
			element[0].value = null;
		}
	}, {
		key: "remove",
		value: function remove(element) {
			element[0].parentNode.removeChild(element);
		}
	}, {
		key: "on",
		value: function on(element, event, callback) {
			element[0].addEventListener(event, callback);
		}
	}, {
		key: "show",
		value: function show(element) {
			element[0].style.display = 'block';
			return true;
		}
	}, {
		key: "hide",
		value: function hide(element) {
			element[0].style.display = 'none';
			return true;
		}
	}, {
		key: "style",
		value: function style(element, st1, val) {
			element[0].style[st1] = val;
		}
	}, {
		key: "ajax",
		value: function ajax(url, method, data, callback, header) {
			var request = new XMLHttpRequest();
			request.open(method, url, true);
			if (header) {
				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			}
			request.onload = function () {
				if (request.status >= 200 && request.status < 400) {
					var _data = request.responseText;
					callback(_data);
				} else {
					console.error("DisplayJS error: The ajax request returned an error.");
				}
			};

			request.onerror = function () {
				// There was a connection error of some sort
				console.error("DisplayJS error: The ajax request returned an error.");
			};

			request.send(data);
		}
	}, {
		key: "hasClass",
		value: function hasClass(element, className) {
			if (element[0].classList) return element[0].classList.contains(className);
			return !!element[0].className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
		}
	}, {
		key: "addClass",
		value: function addClass(element, className) {
			if (element[0].classList) element[0].classList.add(className);else if (!this.hasClass(element, className)) element[0].className += " " + className;
		}
	}, {
		key: "removeClass",
		value: function removeClass(element, className) {
			if (element[0].classList) element[0].classList.remove(className);else if (this.hasClass(element, className)) {
				var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
				element[0].className = element[0].className.replace(reg, ' ');
			}
		}
	}, {
		key: "toggleClass",
		value: function toggleClass(element, className) {
			if (this.hasClass(element, className)) {
				this.removeClass(element, className);
			} else {
				this.addClass(element, className);
			}
		}
	}, {
		key: "each",
		value: function each(elements, callback) {
			for (var _i6 = 0; _i6 < elements.length; _i6++) {
				callback(elements[_i6]);
			}
		}
	}, {
		key: "style",
		value: function style(element, name, value) {
			element[0].style[name] = value;
		}
	}, {
		key: "getStyle",
		value: function getStyle(element, styleProp) {
			return element[0].style[styleProp];
		}
	}, {
		key: "load",
		value: function load(element, url) {
			var request = new XMLHttpRequest();
			request.open("GET", url, true);

			request.onload = function () {
				if (request.status >= 200 && request.status < 400) {
					var mapDOM = function mapDOM(element, json) {
						var treeObject = {};

						// If string convert to document Node
						if (typeof element === "string") {
							if (window.DOMParser) {
								parser = new DOMParser();
								docNode = parser.parseFromString(element, "text/xml");
							} else {
								// Microsoft strikes again
								docNode = new ActiveXObject("Microsoft.XMLDOM");
								docNode.async = false;
								docNode.loadXML(element);
							}
							element = docNode.firstChild;
						}

						//Recursively loop through DOM elements and assign properties to object
						function treeHTML(element, object) {
							object["type"] = element.nodeName;
							var nodeList = element.childNodes;
							if (nodeList != null) {
								if (nodeList.length) {
									object["content"] = [];
									for (var i = 0; i < nodeList.length; i++) {
										if (nodeList[i].nodeType == 3) {
											object["content"].push(nodeList[i].nodeValue);
										} else {
											object["content"].push({});
											treeHTML(nodeList[i], object["content"][object["content"].length - 1]);
										}
									}
								}
							}
							if (element.attributes != null) {
								if (element.attributes.length) {
									object["attributes"] = {};
									for (var i = 0; i < element.attributes.length; i++) {
										object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
									}
								}
							}
						}
						treeHTML(element, treeObject);

						return json ? JSON.stringify(treeObject) : treeObject;
					};

					var data = request.responseText;
					json = mapDOM(data, true);
					element[0].innerHTML = json[element[0]];
				} else {
					console.error("DisplayJS error: The load request returned an error.");
				}
			};

			request.onerror = function () {
				console.error("DisplayJS error: The load request returned an error. Please, check your connection.");
			};

			request.send();
		}
	}, {
		key: "fadeOut",
		value: function fadeOut(element, i) {
			if (!i) {
				var i = .1;
			}
			var el = element[0];
			el.style.opacity = 1;

			(function fade() {
				if ((el.style.opacity -= i) < 0) {
					el.style.display = "none";
				} else {
					requestAnimationFrame(fade);
				}
			})();
		}

		// fade in

	}, {
		key: "fadeIn",
		value: function fadeIn(element, i, display) {
			if (!i) {
				var i = .1;
			}
			var el = element[0];
			el.style.opacity = 0;
			el.style.display = display || "block";

			(function fade() {
				var val = parseFloat(el.style.opacity);
				if (!((val += i) > 1)) {
					el.style.opacity = val;
					requestAnimationFrame(fade);
				}
			})();
		}
	}, {
		key: "extend",
		value: function extend() {
			var out = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			for (var _i7 = 1; _i7 < arguments.length; _i7++) {
				if (!arguments[_i7]) continue;

				for (var key in arguments[_i7]) {
					if (arguments[_i7].hasOwnProperty(key)) out[key] = arguments[_i7][key];
				}
			}

			return out;
		}
		// Math and array manipulation

	}, {
		key: "arange",
		value: function arange(start, end, step, offset) {
			var len = (Math.abs(end - start) + (offset || 0) * 2) / (step || 1) + 1;
			var direction = start < end ? 1 : -1;
			var startingPoint = start - direction * (offset || 0);
			var stepSize = direction * (step || 1);

			return Array(len).fill(0).map(function (_, index) {
				return startingPoint + stepSize * index;
			});
		}
	}, {
		key: "range",
		value: function range(n) {
			return this.arange(0, n, 1);
		}
	}, {
		key: "linespace",
		value: function linespace(start, end, n) {
			var diff = end - start;
			var step = diff / n;
			return this.arange(start, end, step);
		}
	}, {
		key: "forIn",
		value: function forIn(range, callback) {
			for (var _i8 = range.length - 1; _i8 >= 0; _i8--) {
				callback(range[_i8]);
			}
		}
	}, {
		key: "reshape",
		value: function reshape(array, part) {
			var tmp = [];
			for (var _i9 = 0; _i9 < array.length; _i9 += part) {
				tmp.push(array.slice(_i9, _i9 + part));
			}
			return tmp;
		}
	}, {
		key: "Apply",
		value: function Apply(array, callback) {
			this.forIn(array, callback(i));
		}
	}, {
		key: "sum",
		value: function sum(array) {
			return array.reduce(function (a, b) {
				return a + b;
			}, 0);
		}
	}, {
		key: "multiply",
		value: function multiply(array) {
			return array.reduce(function (a, b) {
				return a * b;
			}, 0);
		}
	}, {
		key: "flatten",
		value: function flatten(array) {
			return array.reduce(function (a, b) {
				return a.concat(b);
			}, []);
		}
	}]);

	return DisplayJS;
}();
// Retro compatibility


var _DOM_DJS = function (_DisplayJS) {
	_inherits(_DOM_DJS, _DisplayJS);

	function _DOM_DJS() {
		_classCallCheck(this, _DOM_DJS);

		return _possibleConstructorReturn(this, (_DOM_DJS.__proto__ || Object.getPrototypeOf(_DOM_DJS)).apply(this, arguments));
	}

	return _DOM_DJS;
}(DisplayJS);