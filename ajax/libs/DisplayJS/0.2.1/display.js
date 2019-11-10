"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** ****************************************/
/*           © Arthur Guiot 2017           */
/*                DisplayJS                */
/** ****************************************/
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
				for (var i = 0; i < elements.length; i++) {
					var attr = elements[i].getAttribute("var");
					elements[i].innerHTML = _this.obj[attr];
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
			var lt = /</g,
			    gt = />/g,
			    ap = /'/g,
			    ic = /"/g;
			return str.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
		}
	}, {
		key: "xssURI",
		value: function xssURI(str) {
			return encodeURI(str);
		}
	}, {
		key: "target",
		value: function target(callback) {
			callback = callback || function () {
				this.var();
			};
			var addEventListener = function () {
				if (document.addEventListener) {
					return function (element, event, handler) {
						element.addEventListener(event, handler, false);
					};
				}

				return function (element, event, handler) {
					element.attachEvent("on" + event, handler);
				};
			}();
			var obj = this.obj;
			[].forEach.call(document.querySelectorAll("[target]"), function (x, i, a) {
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
			var _this2 = this;

			var if_push = function if_push() {
				var elements = document.querySelectorAll("[if]");
				for (var i = 0; i < elements.length; i++) {
					var attr = elements[i].getAttribute("if");
					var el = [];
					el.push(elements[i]);
					if (eval(_this2.obj[attr])) {
						_this2.show(el);
					} else {
						_this2.hide(el);
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
			var _this3 = this;

			var else_push = function else_push() {
				var elements = document.querySelectorAll("[else]");
				for (var i = 0; i < elements.length; i++) {
					var attr = elements[i].getAttribute("else");
					var el = [];
					el.push(elements[i]);
					if (eval(_this3.obj[attr])) {
						_this3.hide(el);
					} else {
						_this3.show(el);
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
			start = start || "";
			end = end || "";
			var text = start;
			for (var i = 0; i < array.length; i++) {
				text += join + String(array[i]);
			}
			text += end;
			el[0].innerHTML = text;
		}
	}, {
		key: "custom",
		value: function custom(targetAttr, push) {
			var _this4 = this;

			var var_push = function var_push() {
				var elements = document.querySelectorAll("[" + targetAttr + "]");
				for (var i = 0; i < elements.length; i++) {
					var attr = elements[i].getAttribute(targetAttr);
					elements[i].innerHTML = _this4.obj[attr];
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

					if (typeof descriptor === "undefined") {
						throw new Error("Invalid descriptor for property: " + property + ", object: " + object);
					}

					if (typeof onPropertyChange !== "function") {
						throw new Error("Invalid onPropertyChange handler: " + onPropertyChange);
					}

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
					if (typeof onPropertyChange !== "function") {
						throw new Error("Invalid onPropertyChange handler: " + onPropertyChange);
					}

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
		key: "onEvent",
		value: function onEvent() {
			var elements = document.querySelectorAll("[on]");
			for (var i = 0; i < elements.length; i++) {
				var attr = elements[i].getAttribute("on");
				var action = elements[i].getAttribute("action");
				elements[i].addEventListener(attr, eval(action));
			}
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
		value: function text(element, _text) {
			element[0].innerHTML = this.xss(_text);
		}
	}, {
		key: "html",
		value: function html(element, _html) {
			element[0].innerHTML = _html;
		}
	}, {
		key: "prepend",
		value: function prepend(element, html) {
			var div = document.createElement("div");
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
			element[0].insertAdjacentHTML("afterend", html);
		}
	}, {
		key: "before",
		value: function before(element, html) {
			element[0].insertAdjacentHTML("beforebegin", html);
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
			}
			return false;
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
			element[0].style.display = "block";
			return true;
		}
	}, {
		key: "hide",
		value: function hide(element) {
			element[0].style.display = "none";
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
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
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
			if (element[0].classList) {
				return element[0].classList.contains(className);
			}
			return !!element[0].className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
		}
	}, {
		key: "addClass",
		value: function addClass(element, className) {
			if (element[0].classList) {
				element[0].classList.add(className);
			} else if (!this.hasClass(element, className)) {
				element[0].className += " " + className;
			}
		}
	}, {
		key: "removeClass",
		value: function removeClass(element, className) {
			if (element[0].classList) {
				element[0].classList.remove(className);
			} else if (this.hasClass(element, className)) {
				var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
				element[0].className = element[0].className.replace(reg, " ");
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
			for (var i = 0; i < elements.length; i++) {
				callback(elements[i]);
			}
		}
	}, {
		key: "css",
		value: function css(element, name, value) {
			element[0].style[name] = value;
		}
	}, {
		key: "getStyle",
		value: function getStyle(element, styleProp) {
			return element[0].style[styleProp];
		}
	}, {
		key: "fadeOut",
		value: function fadeOut(element, i) {
			i = i || 0.1;
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
			i = i || 0.1;
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

			for (var i = 1; i < arguments.length; i++) {
				if (!arguments[i]) {
					continue;
				}

				for (var key in arguments[i]) {
					if (arguments[i].hasOwnProperty(key)) {
						out[key] = arguments[i][key];
					}
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
			for (var i = range.length - 1; i >= 0; i--) {
				callback(range[i]);
			}
		}
	}, {
		key: "reshape",
		value: function reshape(array, part) {
			var tmp = [];
			for (var i = 0; i < array.length; i += part) {
				tmp.push(array.slice(i, i + part));
			}
			return tmp;
		}
	}, {
		key: "apply",
		value: function apply(array, callback) {
			this.forIn(array, function (i) {
				return callback(i);
			});
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
	}, {
		key: "drop",
		value: function drop(array, val) {
			if (val > 0) {
				return array.slice(val, array.length);
			}
			return array.slice(0, array.length - val);
		}
	}, {
		key: "isIn",
		value: function isIn(array, val) {
			if (array.indexOf(val) > -1) {
				return true;
			}
			return false;
		}
	}, {
		key: "rmFromArray",
		value: function rmFromArray(array, condition) {
			var obj = [];
			this.forIn(array, function (i) {
				if (!condition(i)) {
					obj.push(array[i]);
				}
				return obj;
			});
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