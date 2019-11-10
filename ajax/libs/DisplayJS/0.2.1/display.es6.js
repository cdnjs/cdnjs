/** ****************************************/
/*           © Arthur Guiot 2017           */
/*                DisplayJS                */
/** ****************************************/
class DisplayJS {
	constructor(obj) {
		this.obj = obj;
	}
	// DOM manipulation and browser API.
	var(push) {
		const var_push = () => {
			this.if();
			this.else();
			const elements = document.querySelectorAll("[var]");
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute("var");
				elements[i].innerHTML = this.obj[attr];
			}
		};
		if (!push) {
			var_push();
		} else if (push == true) {
			var_push();
			this.live(this.obj, () => {
				var_push();
			});
		} else {
			window.setInterval(() => {
				var_push();
			}, push);
		}
	}
	xss (str) {
		var lt = /</g,
		gt = />/g,
		ap = /'/g,
		ic = /"/g;
		return str.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
	}
	xssURI(str) {
		return encodeURI(str);
	}
	target(callback) {
		callback = callback || function () {
			this.var();
		};
		const addEventListener = ((() => {
			if (document.addEventListener) {
				return (element, event, handler) => {
					element.addEventListener(event, handler, false);
				};
			}

			return (element, event, handler) => {
				element.attachEvent(`on${event}`, handler);
			};
		})());
		const obj = this.obj;
		[].forEach.call(document.querySelectorAll("[target]"), (x, i, a) => {
			addEventListener(a[i], "change", function () {
				const attr1 = a[i].getAttribute("target");
				if (this.type == "checkbox") {
					obj[attr1] = this.checked;
				} else {
					obj[attr1] = this.value;
				}
				callback();
			});
			addEventListener(a[i], "keydown", function () {
				const attr2 = a[i].getAttribute("target");
				if (this.type == "checkbox") {
					obj[attr2] = this.checked;
				} else {
					obj[attr2] = this.value;
				}
				callback();
			});
			addEventListener(a[i], "input", function () {
				const attr3 = a[i].getAttribute("target");
				if (this.type == "checkbox") {
					obj[attr3] = this.checked;
				} else {
					obj[attr3] = this.value;
				}
				callback();
			});
			addEventListener(a[i], "paste", function () {
				const attr4 = a[i].getAttribute("target");
				if (this.type == "checkbox") {
					obj[attr4] = this.checked;
				} else {
					obj[attr4] = this.value;
				}
				callback();
			});
		});
	}
	if(push) {
		const if_push = () => {
			const elements = document.querySelectorAll("[if]");
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute("if");
				const el = [];
				el.push(elements[i]);
				if (eval(this.obj[attr])) {
					this.show(el);
				} else {
					this.hide(el);
				}
			}
		};
		if (!push) {
			if_push();
		} else if (push == true) {
			if_push();
			this.live(this.obj, () => {
				if_push();
			});
		} else {
			window.setInterval(() => {
				if_push();
			}, push);
		}
	} else(push) {
		const else_push = () => {
			const elements = document.querySelectorAll("[else]");
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute("else");
				const el = [];
				el.push(elements[i]);
				if (eval(this.obj[attr])) {
					this.hide(el);
				} else {
					this.show(el);
				}
			}
		};
		if (!push) {
			else_push();
		} else if (push == true) {
			else_push();
			this.live(this.obj, () => {
				else_push();
			});
		} else {
			window.setInterval(() => {
				else_push();
			}, push);
		}
	}
	repeat(el, array, join, start, end) {
		start = start || "";
		end = end || "";
		let text = start;
		for (let i = 0; i < array.length; i++) {
			text += join + String(array[i]);
		}
		text += end;
		el[0].innerHTML = text;
	}
	custom(targetAttr, push) {
		const var_push = () => {
			const elements = document.querySelectorAll(`[${targetAttr}]`);
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute(targetAttr);
				elements[i].innerHTML = this.obj[attr];
			}
		};
		if (!push) {
			var_push();
		} else if (push == true) {
			var_push();
			this.live(this.obj, () => {
				var_push();
			});
		} else {
			window.setInterval(() => {
				var_push();
			}, push);
		}
	}
	live(watched, callback) {
		const ObjUtils = {
			watch(object, property, onPropertyChange) {
				const descriptor = Object.getOwnPropertyDescriptor(object, property);

				if (typeof descriptor === "undefined") {
					throw new Error(`Invalid descriptor for property: ${property}, object: ${object}`);
				}

				if (typeof onPropertyChange !== "function") {
					throw new Error(`Invalid onPropertyChange handler: ${onPropertyChange}`);
				}

				let value = object[property];

				Object.defineProperty(object, property, {
					enumerable: true,
					configurable: true,
					get() {
						return value;
					},
					set(newValue) {
						if (newValue === value) return;
						onPropertyChange(object, property, newValue, value);
						return value = newValue;
					},
				});
			},

			watchAll(object, onPropertyChange) {
				if (typeof onPropertyChange !== "function") {
					throw new Error(`Invalid onPropertyChange handler: ${onPropertyChange}`);
				}

				for (const property in object) {
					this.watch(object, property, onPropertyChange);
				}
			},
		};
		ObjUtils.watchAll(watched, (obj, prop, newVal, oldVal) => {
			callback(obj, prop, newVal, oldVal);
		});
	}
	onEvent () {
		const elements = document.querySelectorAll("[on]");
		for (let i = 0; i < elements.length; i++) {
			const attr = elements[i].getAttribute("on");
			const action = elements[i].getAttribute("action");
			elements[i].addEventListener(attr, eval(action));
		}
	}
	all(element, callback) {
		element.forEach((data) => {
			const node = [];
			node.push(data);
			callback(node);
		});
	}
	text(element, text) {
		element[0].innerHTML = this.xss(text);
	}
	html(element, html) {
		element[0].innerHTML = html;
	}
	prepend(element, html) {
		const div = document.createElement("div");
		div.innerHTML = html;
		element[0].insertBefore(div, element.firstChild);
	}
	append(element, html) {
		element[0].innerHTML += html;
	}
	after(element, html) {
		element[0].insertAdjacentHTML("afterend", html);
	}
	before(element, html) {
		element[0].insertAdjacentHTML("beforebegin", html);
	}
	clone(element) {
		element[0].cloneNode(true);
	}
	is(el1, el2) {
		if (el1 === el2) {
			return true;
		}
		return false;
	}
	select(str) {
		const obj = document.querySelectorAll(str);
		return obj;
	}
	single(str) {
		const obj = document.querySelectorAll(str);
		const node = [];
		node.push(obj[0]);
		return node;
	}
	empty(element) {
		element[0].innerHTML = null;
	}
	valEmpty(element) {
		element[0].value = null;
	}
	remove(element) {
		element[0].parentNode.removeChild(element);
	}
	on(element, event, callback) {
		element[0].addEventListener(event, callback);
	}
	show(element) {
		element[0].style.display = "block";
		return true;
	}
	hide(element) {
		element[0].style.display = "none";
		return true;
	}
	style(element, st1, val) {
		element[0].style[st1] = val;
	}
	ajax(url, method, data, callback, header) {
		const request = new XMLHttpRequest();
		request.open(method, url, true);
		if (header) {
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		}
		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				const data = request.responseText;
				callback(data);
			} else {
				console.error("DisplayJS error: The ajax request returned an error.");
			}
		};

		request.onerror = () => {
			// There was a connection error of some sort
			console.error("DisplayJS error: The ajax request returned an error.");
		};

		request.send(data);
	}
	hasClass(element, className) {
		if (element[0].classList) {
			return element[0].classList.contains(className);
		}
		return !!element[0].className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
	}
	addClass(element, className) {
		if (element[0].classList) {
			element[0].classList.add(className);
		} else if (!this.hasClass(element, className)) {
			element[0].className += ` ${className}`;
		}
	}
	removeClass(element, className) {
		if (element[0].classList) {
			element[0].classList.remove(className);
		} else if (this.hasClass(element, className)) {
			const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
			element[0].className = element[0].className.replace(reg, " ");
		}
	}
	toggleClass(element, className) {
		if (this.hasClass(element, className)) {
			this.removeClass(element, className);
		} else {
			this.addClass(element, className);
		}
	}
	each(elements, callback) {
		for (let i = 0; i < elements.length; i++) {
			callback(elements[i]);
		}
	}
	css(element, name, value) {
		element[0].style[name] = value;
	}
	getStyle(element, styleProp) {
		return element[0].style[styleProp];
	}
	fadeOut(element, i) {
		i = i || 0.1;
		const el = element[0];
		el.style.opacity = 1;

		(function fade() {
			if ((el.style.opacity -= i) < 0) {
				el.style.display = "none";
			} else {
				requestAnimationFrame(fade);
			}
		}());
	}

	// fade in

	fadeIn(element, i, display) {
		i = i || 0.1;
		const el = element[0];
		el.style.opacity = 0;
		el.style.display = display || "block";

		(function fade() {
			let val = parseFloat(el.style.opacity);
			if (!((val += i) > 1)) {
				el.style.opacity = val;
				requestAnimationFrame(fade);
			}
		}());
	}
	extend(out = {}) {
		for (let i = 1; i < arguments.length; i++) {
			if (!arguments[i]) {
				continue;
			}

			for (const key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) {
					out[key] = arguments[i][key];
				}
			}
		}

		return out;
	}
	// Math and array manipulation
	arange(start, end, step, offset) {
		const len = (Math.abs(end - start) + ((offset || 0) * 2)) / (step || 1) + 1;
		const direction = start < end ? 1 : -1;
		const startingPoint = start - (direction * (offset || 0));
		const stepSize = direction * (step || 1);

		return Array(len).fill(0).map((_, index) => startingPoint + (stepSize * index));
	}
	range(n) {
		return this.arange(0, n, 1);
	}
	linespace(start, end, n) {
		const diff = end - start;
		const step = diff / n;
		return this.arange(start, end, step);
	}
	forIn(range, callback) {
		for (let i = range.length - 1; i >= 0; i--) {
			callback(range[i]);
		}
	}
	reshape(array, part) {
		const tmp = [];
		for (let i = 0; i < array.length; i += part) {
			tmp.push(array.slice(i, i + part));
		}
		return tmp;
	}
	apply(array, callback) {
		this.forIn(array, i => callback(i));
	}
	sum(array) {
		return array.reduce((a, b) => a + b, 0);
	}
	multiply(array) {
		return array.reduce((a, b) => a * b, 0);
	}
	flatten(array) {
		return array.reduce((a, b) => a.concat(b), []);
	}
	drop(array, val) {
		if (val > 0) {
			return array.slice(val, array.length);
		}
		return array.slice(0, array.length - val);
	}
	isIn(array, val) {
		if (array.indexOf(val) > -1) {
			return true;
		}
		return false;
	}
	rmFromArray(array, condition) {
		const obj = [];
		this.forIn(array, (i) => {
			if (!condition(i)) {
				obj.push(array[i]);
			}
			return obj;
		});
	}
}
// Retro compatibility
class _DOM_DJS extends DisplayJS {}
