"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/********************************************/
/*				© Arthur Guiot 2017			*/
/*					DisplayJS				*/
/********************************************/
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
		key: "render",
		value: function render(push) {
			this.var(push);
		}
	}, {
		key: "renderVariables",
		value: function renderVariables(push) {
			this.var(push);
		}
	}, {
		key: "xss",
		value: function xss(str) {
			var lt = /</g;
			var gt = />/g;
			var ap = /'/g;
			var ic = /"/g;
			return str.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
		}
	}, {
		key: "xssURI",
		value: function xssURI(str) {
			return encodeURI(str);
		}
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
			[].forEach.call(document.querySelectorAll("[target]"), function (x, i, a) {
				addEventListener(a[i], "change", function () {
					var attr1 = a[i].getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr1] = this.checked;
					} else if (this.type == "select") {
						obj[attr1] = this.options[this.selectedIndex].value;
					} else {
						obj[attr1] = this.value;
					}
					callback();
				});
				addEventListener(a[i], "keydown", function () {
					var attr2 = a[i].getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr2] = this.checked;
					} else if (this.type == "select") {
						obj[attr2] = this.options[this.selectedIndex].value;
					} else {
						obj[attr2] = this.value;
					}
					callback();
				});
				addEventListener(a[i], "input", function () {
					var attr3 = a[i].getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr3] = this.checked;
					} else if (this.type == "select") {
						obj[attr3] = this.options[this.selectedIndex].value;
					} else {
						obj[attr3] = this.value;
					}
					callback();
				});
				addEventListener(a[i], "paste", function () {
					var attr4 = a[i].getAttribute("target");
					if (this.type == "checkbox") {
						obj[attr4] = this.checked;
					} else if (this.type == "select") {
						obj[attr4] = this.options[this.selectedIndex].value;
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
				for (var i = 0; i < elements.length; i++) {
					var attr = elements[i].getAttribute("if");
					var el = [];
					el.push(elements[i]);
					if (eval(_this3.obj[attr])) {
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
				for (var i = 0; i < elements.length; i++) {
					var attr = elements[i].getAttribute("else");
					var el = [];
					el.push(elements[i]);
					if (eval(_this4.obj[attr])) {
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
		value: function repeat(el, array, join) {
			var start = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
			var end = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

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
	}, {
		key: "custom",
		value: function custom(targetAttr, callback, push) {
			var custom_push = function custom_push() {
				var elements = document.querySelectorAll("[" + targetAttr + "]");
				for (var i = 0; i < elements.length; i++) {
					var attr = elements[i].getAttribute(targetAttr);
					callback(elements[i], attr);
				}
			};
			if (!push) {
				custom_push();
			} else if (push == true) {
				custom_push();
				this.live(this.obj, function () {
					custom_push();
				});
			} else {
				window.setInterval(function () {
					custom_push();
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
						throw new Error("DisplayJS: Invalid descriptor for property: " + property + ", object: " + object);
					}

					if (typeof onPropertyChange !== "function") {
						throw new Error("DisplayJS: Invalid onPropertyChange handler: " + onPropertyChange);
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
						throw new Error("DisplayJS: Invalid onPropertyChange handler: " + onPropertyChange);
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
			if (el1[0] === el2[0]) {
				return true;
			}
			return false;
		}
	}, {
		key: "select",
		value: function select(str) {
			if (this.isElement(str)) {
				return str;
			}
			return document.querySelectorAll(str);
		}
	}, {
		key: "single",
		value: function single(str) {
			if (this.isElement(str)) {
				return str;
			}
			return document.querySelector(str);
		}
	}, {
		key: "s",
		value: function s(str) {
			return this.select(str);
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
			element[0].parentNode.removeChild(element[0]);
		}
	}, {
		key: "on",
		value: function on(element, event, callback) {
			element[0].addEventListener(event, callback);
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
		value: function scrollTop() {
			var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [document.body];

			return el[0].scrollTop;
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
		key: "ajax",
		value: function ajax(url, method, data, callback) {
			var header = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "application/x-www-form-urlencoded; charset=UTF-8";

			var request = new XMLHttpRequest();
			request.open(method, url, true);
			request.setRequestHeader("Content-Type", header);
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
		value: function fadeOut(element) {
			var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;

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
		value: function fadeIn(element) {
			var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;
			var display = arguments[2];

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
		key: "dynamic",
		value: function dynamic(callback) {
			var push = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;

			window.setInterval(callback, push);
		}
	}, {
		key: "parent",
		value: function parent(el) {
			var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			var newEl = el[0];
			for (var i in this.range(n)) {
				newEl = newEl.parentNode;
			}
			return [newEl];
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
		key: "reshape",
		value: function reshape(array, part) {
			var tmp = [];
			for (var i = 0; i < array.length; i += part) {
				tmp.push(array.slice(i, i + part));
			}
			return tmp;
		}
	}, {
		key: "sum",
		value: function sum(array) {
			var _this5 = this;

			return array.reduce(function (a, b) {
				return _this5.math().add(a, b);
			}, 0);
		}
	}, {
		key: "multiply",
		value: function multiply(array) {
			var _this6 = this;

			return array.reduce(function (a, b) {
				return _this6.math().mul(a, b);
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
			if (array.includes(val)) {
				return true;
			}
			return false;
		}
	}, {
		key: "rmFromArray",
		value: function rmFromArray(array, condition) {
			var obj = [];
			for (var i in array) {
				if (!condition(i)) {
					obj.push(array[i]);
				}
			}
			return obj;
		}
	}, {
		key: "average",
		value: function average(array) {
			var summed = this.sum(array);
			var average = this.math().div(summed, array.length);
			return average;
		}
	}, {
		key: "median",
		value: function median(array) {
			var _this7 = this;

			array.sort(function (a, b) {
				return _this7.math().sub(a, b);
			});
			var half = Math.floor(this.math().div(array.length, 2));
			if (array.length % 2) {
				return array[half];
			} else {
				return this.math().div(this.math().add(array[half - 1], array[half]), 2.0);
			}
		}
	}, {
		key: "predict",
		value: function predict(array, val) {
			var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			var djs = this;
			function main(valC, text) {
				var first = array[0][0];
				var second = array[1][0];
				var firstVal = array[0][1];
				var secondVal = array[1][1];
				var a = djs.math().div(djs.math().sub(firstVal, secondVal), djs.math().sub(first, second));
				var b = djs.math().sub(secondVal, djs.math().mul(second, a));
				if (text == true) {
					return "f(x) = " + a + "x+" + b + "; f(" + valC + ") = " + (valC * a + b);
				} else {
					return valC * a + b;
				}
			}
			function patternMatching(array) {
				if (array.length > 2) {
					if (main(array[2][0], false) == array[2][1]) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			}
			if (patternMatching(array)) {
				return main(val, text);
			} else {
				return "DisplayJS: Error, can't find any pattern.";
			}
		}
	}, {
		key: "fn",
		get: function get() {
			return DisplayJS.prototype;
		}
	}, {
		key: "math",
		get: function get() {
			var exactMath = {
				add: function add() {
					return mathFunctions.addSubDiv(arguments, 0);
				},
				sub: function sub() {
					return mathFunctions.addSubDiv(arguments, 1);
				},
				mul: function mul() {
					return mathFunctions.mul(arguments);
				},
				div: function div() {
					return mathFunctions.addSubDiv(arguments, 3);
				}
			};

			var mathFunctions = {
				addSubDiv: function addSubDiv(argArray, oper) {
					var args = this.countDecimals(this.validMe(argArray));
					var hComma = this.biggestComma(args);
					var shifted = oper !== 3 ? hComma : 0;
					var res = this.shiftComma(this.countResult(this.toExponent(args, hComma), oper), shifted);
					this.isSafeInteger(res);
					return res;
				},
				mul: function mul(argArray) {
					var args = this.countDecimals(this.validMe(argArray));
					var intArr = [];
					var commaSum = 0;
					for (var i in args) {
						commaSum += args[i].comma;
						intArr.push(args[i].integer);
					}
					return this.shiftComma(this.countResult(intArr, 2), commaSum);
				},
				isSafeInteger: function isSafeInteger(result) {
					if (result <= -(Math.pow(2, 53) - 1) || result >= Math.pow(2, 53) - 1) throw "The result is not a safe integer.";
				},
				shiftComma: function shiftComma(result, commaPos) {
					return this.toExponent(this.countDecimals([result]), -commaPos)[0];
				},
				countResult: function countResult(nums, operation) {
					var result = nums[0];
					for (var i = 1; i < nums.length; i++) {
						switch (operation) {
							case 0:
								result += nums[i];
								break;
							case 1:
								result -= nums[i];
								break;
							case 2:
								result *= nums[i];
								break;
							case 3:
								result /= nums[i];
								break;
						}
					}
					return result;
				},
				toExponent: function toExponent(args, commaPos) {
					var returned = [];
					for (var i in args) {
						args[i].comma -= commaPos;
						var sign = args[i].comma >= 0 ? "+" : "";
						returned.push(Number(args[i].integer.toString() + "e" + sign + args[i].comma));
					}
					return returned;
				},
				biggestComma: function biggestComma(args) {
					var commaAr = [];
					for (var i in args) {
						commaAr.push(args[i].comma);
					}
					return Math.min.apply(null, commaAr);
				},
				validMe: function validMe(args) {
					if (args.length < 2) throw "Set at least two numerical values.";
					for (var i in args) {
						args[i] = parseFloat(args[i]);
						if (typeof args[i] !== "number" || isNaN(args[i])) throw "Every smMath argument must be of type number.";
						if (args[i] === Number.POSITIVE_INFINITY || args[i] === Number.NEGATIVE_INFINITY) throw "Every smMath argument must be a numerical value between positive and negative Infinity.";
					}
					return args;
				},
				countDecimals: function countDecimals(args) {
					var decimals = [];
					for (var i in args) {
						var partDec = 0;
						var splitted = args[i].toString().split("e");
						var commaPos = splitted[0].indexOf(".");
						partDec -= commaPos !== -1 ? splitted[0].length - 1 - commaPos : 0;
						partDec += isNaN(Number(splitted[1])) ? 0 : Number(splitted[1]);
						splitted[0] = Number(splitted[0].replace(".", ""));
						decimals.push({ integer: splitted[0], comma: partDec });
					}
					return decimals;
				}
			};
			return exactMath;
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
// Browaserify / Node.js


if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports) {
	module.exports = new DisplayJS();
}