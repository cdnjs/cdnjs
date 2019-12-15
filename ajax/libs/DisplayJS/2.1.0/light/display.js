"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/********************************************/
/*			© Arthur Guiot 2017				*/
/*				DisplayJS					*/
/*			https://display.js.org/			*/
/********************************************/
var DisplayJS = function () {
	function DisplayJS(obj) {
		_classCallCheck(this, DisplayJS);

		this.obj = obj;
	}
	/* DOM manipulation and browser API.*/


	_createClass(DisplayJS, [{
		key: "var",
		value: function _var(push) {
			var _this = this;

			// the function
			var var_push = function var_push() {
				_this.if();
				_this.else();
				var elements = document.querySelectorAll("[var]");
				for (var i = 0; i < elements.length; i++) {
					var attr = elements[i].getAttribute("var");

					if (!attr.includes(".")) {
						elements[i].innerHTML = _this.obj[attr];
					} else {
						var parts = attr.split(".");
						var val = _this.obj[parts[0]];

						for (var p = 1; p < parts.length; p++) {
							val = val[parts[p]];
						}

						elements[i].innerHTML = val;
					}
				}
			};
			// push var cheking
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
		// aliases of $.var();

	}, {
		key: "render",
		value: function render(push) {
			this.var(push);
		}
	}, {
		key: "renderVariables",
		value: function renderVariables(push) {
			this.var(push);
		}
		// Transform HTML special chars

	}, {
		key: "xss",
		value: function xss(str) {
			var lt = /</g;
			var gt = />/g;
			var ap = /'/g;
			var ic = /"/g;
			return str.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
		}
		// encode the URI

	}, {
		key: "xssURI",
		value: function xssURI(str) {
			return encodeURI(str);
		}
		// Target input to variable

	}, {
		key: "target",
		value: function target() {
			var _this2 = this;

			var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
				_this2.var();
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
			[].forEach.call(document.querySelectorAll("[target]"), function (x) {
				addEventListener(x, "change", function () {
					var attr1 = x.getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr1] = this.checked;
					} else if (this.type == "select") {
						obj[attr1] = this.options[this.selectedIndex].value;
					} else {
						obj[attr1] = this.value;
					}
					callback(x);
				});
				addEventListener(x, "keydown", function () {
					var attr2 = x.getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr2] = this.checked;
					} else if (this.type == "select") {
						obj[attr2] = this.options[this.selectedIndex].value;
					} else {
						obj[attr2] = this.value;
					}
					callback(x);
				});
				addEventListener(x, "input", function () {
					var attr3 = x.getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr3] = this.checked;
					} else if (this.type == "select") {
						obj[attr3] = this.options[this.selectedIndex].value;
					} else {
						obj[attr3] = this.value;
					}
					callback(x);
				});
				addEventListener(x, "paste", function () {
					var attr4 = x.getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr4] = this.checked;
					} else if (this.type == "select") {
						obj[attr4] = this.options[this.selectedIndex].value;
					} else {
						obj[attr4] = this.value;
					}
					callback(x);
				});
			});
		}
		// if...else function

	}, {
		key: "if",
		value: function _if(push) {
			var _this3 = this;

			var if_push = function if_push() {
				var elements = document.querySelectorAll("[if]");
				for (var i = 0; i < elements.length; i++) {
					var attr = elements[i].getAttribute("if");
					var el = [];
					el.push(elements[i]);
					if (eval(_this3.obj[attr])) {
						_this3.show(_this3.toNodeList(el[0]));
					} else {
						_this3.hide(_this3.toNodeList(el[0]));
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
				for (var i = 0; i < elements.length; i++) {
					var attr = elements[i].getAttribute("else");
					var el = [];
					el.push(elements[i]);
					if (eval(_this4.obj[attr])) {
						_this4.hide(_this4.toNodeList(el[0]));
					} else {
						_this4.show(_this4.toNodeList(el[0]));
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
		key: "toNodeList",
		value: function toNodeList(el) {
			el.setAttribute('wrapNodeList', '');
			var list = document.querySelectorAll('[wrapNodeList]');
			el.removeAttribute('wrapNodeList');
			return list;
		}
		// custom repeat function

	}, {
		key: "repeat",
		value: function repeat(el, array, join) {
			var start = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
			var end = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

			el = this.s(el);
			var text = start;
			if ((typeof join === "undefined" ? "undefined" : _typeof(join)) == "object") {
				for (var i = 0; i < array.length; i++) {
					text += join[i] + String(array[i]);
				}
			} else {
				for (var _i = 0; _i < array.length; _i++) {
					text += join + String(array[_i]);
				}
			}
			text += end;
			el[0].innerHTML = text;
		}
		// parsing the DOM for on and action attribute

	}, {
		key: "onEvent",
		value: function onEvent() {
			var elements = document.querySelectorAll("[on]");

			var _loop = function _loop(i) {
				var attr = elements[i].getAttribute("on");
				var action = elements[i].getAttribute("action");
				elements[i].addEventListener(attr, function () {
					eval(action);
				});
			};

			for (var i = 0; i < elements.length; i++) {
				_loop(i);
			}
		}
		// apply function to each elements selected

	}, {
		key: "all",
		value: function all(el, callback) {
			var _this5 = this;

			el = this.s(el);
			el.forEach(function (data) {
				callback(_this5.toNodeList(data));
			});
		}
		/* Basic DOM manipulation */

	}, {
		key: "text",
		value: function text(el, _text) {
			el = this.s(el);
			return _text ? el[0].innerHTML = this.xss(_text) : el[0].innerHTML;
		}
	}, {
		key: "html",
		value: function html(el, _html) {
			el = this.s(el);
			return _html ? el[0].innerHTML = _html : el[0].innerHTML;
		}
	}, {
		key: "append",
		value: function append(el, html) {
			el = this.s(el);
			el[0].innerHTML += html;
		}
	}, {
		key: "after",
		value: function after(el, html) {
			el = this.s(el);
			el[0].insertAdjacentHTML("afterend", html);
		}
	}, {
		key: "before",
		value: function before(el, html) {
			el = this.s(el);
			el[0].insertAdjacentHTML("beforebegin", html);
		}
	}, {
		key: "clone",
		value: function clone(el) {
			el[0].cloneNode(true);
		}
	}, {
		key: "is",
		value: function is(el1, el2) {
			el1 = this.s(el1);
			el2 = this.s(el2);
			if (el1[0] === el2[0]) {
				return true;
			}
			return false;
		}
	}, {
		key: "select",
		value: function select(str) {
			return str instanceof NodeList ? str : document.querySelectorAll(str);
		}
	}, {
		key: "single",
		value: function single(str) {
			return this.isElement(str) ? str : document.querySelector(str);
		}
		// alias of $.select()

	}, {
		key: "s",
		value: function s(str) {
			return this.select(str);
		}
	}, {
		key: "empty",
		value: function empty(el) {
			el = this.s(el);
			el[0].innerHTML = "";
		}
	}, {
		key: "valEmpty",
		value: function valEmpty(el) {
			el = this.s(el);
			el[0].value = null;
		}
	}, {
		key: "remove",
		value: function remove(el) {
			el = this.s(el);
			el[0].parentNode.removeChild(el[0]);
		}
	}, {
		key: "on",
		value: function on(el, event, callback) {
			el = this.s(el);
			el[0].addEventListener(event, callback);
		}
	}, {
		key: "ready",
		value: function ready(fn) {
			if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
				fn();
			} else {
				document.addEventListener("DOMContentLoaded", fn);
			}
		}
	}, {
		key: "scroll",
		value: function scroll(callback) {
			window.addEventListener("scroll", callback);
		}
	}, {
		key: "scrollTo",
		value: function scrollTo(x, y) {
			window.scroll(x, y);
		}
	}, {
		key: "scrollTop",
		value: function scrollTop(el) {
			el = el != null ? el : document.body.scrollTop == 0 ? this.toNodeList(document.documentElement) : this.toNodeList(document.body);
			el = this.s(el);
			return el[0].scrollTop;
		}
	}, {
		key: "show",
		value: function show(el) {
			el = this.s(el);
			el[0].style.display = "block";
			return true;
		}
	}, {
		key: "hide",
		value: function hide(el) {
			el = this.s(el);
			el[0].style.display = "none";
			return true;
		}
	}, {
		key: "hasClass",
		value: function hasClass(el, className) {
			el = this.s(el);
			if (el[0].classList) {
				return el[0].classList.contains(className);
			}
			return !!el[0].className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
		}
	}, {
		key: "addClass",
		value: function addClass(el, className) {
			el = this.s(el);
			if (el[0].classList) {
				el[0].classList.add(className);
			} else if (!this.hasClass(el, className)) {
				el[0].className += " " + className;
			}
		}
	}, {
		key: "removeClass",
		value: function removeClass(el, className) {
			el = this.s(el);
			if (el[0].classList) {
				el[0].classList.remove(className);
			} else if (this.hasClass(el, className)) {
				var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
				el[0].className = el[0].className.replace(reg, " ");
			}
		}
	}, {
		key: "toggleClass",
		value: function toggleClass(el, className) {
			el = this.s(el);
			if (this.hasClass(el, className)) {
				this.removeClass(el, className);
			} else {
				this.addClass(el, className);
			}
		}
	}, {
		key: "css",
		value: function css(el, name, value) {
			el = this.s(el);
			if ((typeof name === "undefined" ? "undefined" : _typeof(name)) == 'object') {
				for (var i in name) {
					el[0].style[i] = name[i];
				}
			} else {
				el[0].style[name] = value;
			}
		}
	}, {
		key: "getStyle",
		value: function getStyle(el, styleProp) {
			el = this.s(el);
			return el[0].style[styleProp];
		}
	}, {
		key: "fadeOut",
		value: function fadeOut(el) {
			var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;

			el = this.s(el)[0];
			el.style.opacity = 1;

			(function fade() {
				if ((el.style.opacity -= i) < 0) {
					el.style.display = "none";
				} else {
					requestAnimationFrame(fade);
				}
			})();
		}
	}, {
		key: "fadeIn",
		value: function fadeIn(el) {
			var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;
			var display = arguments[2];

			el = this.s(el)[0];
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
		// Create a function in the DisplayJS object

	}, {
		key: "dynamic",

		// dynamically update something
		value: function dynamic(callback) {
			var push = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;

			window.setInterval(callback, push);
		}
	}, {
		key: "parent",
		value: function parent(el) {
			var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			el = this.s(el);
			var newEl = el[0];
			for (var i in this.range(n)) {
				newEl = newEl.parentNode;
			}
			return this.toNodeList(newEl);
		}
	}, {
		key: "isNode",
		value: function isNode(el) {
			return (typeof Node === "undefined" ? "undefined" : _typeof(Node)) === "object" ? el instanceof Node : el && (typeof el === "undefined" ? "undefined" : _typeof(el)) === "object" && typeof el.nodeType === "number" && typeof el.nodeName === "string";
		}
	}, {
		key: "isElement",
		value: function isElement(el) {
			return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? el instanceof HTMLElement : //DOM2
			el && (typeof el === "undefined" ? "undefined" : _typeof(el)) === "object" && el !== null && el.nodeType === 1 && typeof el.nodeName === "string";
		}
		// create custom component

	}, {
		key: "component",
		value: function component(name, callback) {
			var component = function (_HTMLElement) {
				_inherits(component, _HTMLElement);

				function component() {
					_classCallCheck(this, component);

					var _this6 = _possibleConstructorReturn(this, (component.__proto__ || Object.getPrototypeOf(component)).call(this));

					callback(_this6);
					return _this6;
				}

				return component;
			}(HTMLElement);

			customElements.define(name, component);
		}
		// import a script

	}, {
		key: "import",
		value: function _import(source, callback) {
			var script = document.createElement("script");
			var prior = document.getElementsByTagName("script")[0];
			script.async = 1;

			script.onload = script.onreadystatechange = function (_, isAbort) {
				if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
					script.onload = script.onreadystatechange = null;
					script = undefined;

					if (!isAbort) {
						if (callback) callback();
					}
				}
			};

			script.src = source;
			prior.parentNode.insertBefore(script, prior);
		}
	}, {
		key: "sleep",
		value: function sleep(ms) {
			var waitUntil = new Date().getTime() + ms;
			while (new Date().getTime() < waitUntil) {
				true;
			}
		}
		// Math and array manipulation + includes

	}, {
		key: "extend",
		value: function extend(defaults, options) {
			var extended = {};
			var prop = void 0;
			for (prop in defaults) {
				if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
					extended[prop] = defaults[prop];
				}
			}
			for (prop in options) {
				if (Object.prototype.hasOwnProperty.call(options, prop)) {
					extended[prop] = options[prop];
				}
			}
			return extended;
		}
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
		key: "reshape",
		value: function reshape(array, part) {
			var tmp = [];
			for (var i = 0; i < array.length; i += part) {
				tmp.push(array.slice(i, i + part));
			}
			return tmp;
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
			return val > 0 ? array.slice(val, array.length) : array.slice(0, array.length + val);
		}
	}, {
		key: "isIn",
		value: function isIn(array, val) {
			return array.includes(val) ? true : false;
		}
	}, {
		key: "rmFromArray",
		value: function rmFromArray(array, condition) {
			var obj = [];
			for (var i in array) {
				if (condition(i) == !1) {
					obj.push(array[i]);
				}
			}
			return obj;
		}
		//= includes

	}, {
		key: "fn",
		get: function get() {
			return DisplayJS.prototype;
		}
	}]);

	return DisplayJS;
}();
// Browserify / Node.js


if (typeof define === "function" && define.amd) {
	define(function () {
		return new DisplayJS();
	});
	// CommonJS and Node.js module support.
} else if (typeof exports !== "undefined") {
	// Support Node.js specific `module.exports` (which can be a function)
	if (typeof module !== "undefined" && module.exports) {
		exports = module.exports = new DisplayJS();
	}
	// But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
	exports.DisplayJS = new DisplayJS();
} else if (typeof global !== "undefined") {
	global.DisplayJS = new DisplayJS();
}