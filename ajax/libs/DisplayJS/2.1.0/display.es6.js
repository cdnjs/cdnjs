/********************************************/
/*			© Arthur Guiot 2017				*/
/*				DisplayJS					*/
/*			https://display.js.org/			*/
/********************************************/
class DisplayJS {
	constructor(obj) {
		this.obj = obj;
	}
	/* DOM manipulation and browser API.*/
	var(push) {
		// the function
		const var_push = () => {
			this.if();
			this.else();
			const elements = document.querySelectorAll("[var]");
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute("var");

				if (!attr.includes(".")) {
					elements[i].innerHTML = this.obj[attr];
				} else {
					const parts = attr.split(".");
					let val = this.obj[parts[0]];

					for (let p = 1; p < parts.length; p++) {
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
			this.live(this.obj, () => {
				var_push();
			});
		} else {
			window.setInterval(() => {
				var_push();
			}, push);
		}
	}
	// aliases of $.var();
	render (push) {
		this.var(push);
	}
	renderVariables (push) {
		this.var(push);
	}
	// Transform HTML special chars
	xss (str) {
		const lt = /</g;
		const gt = />/g;
		const ap = /'/g;
		const ic = /"/g;
		return str.toString().replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;");
	}
	// encode the URI
	xssURI(str) {
		return encodeURI(str);
	}
	// Target input to variable
	target(callback= () => { this.var(); }) {
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
		[].forEach.call(document.querySelectorAll("[target]"), (x) => {
			addEventListener(x, "change", function () {
				const attr1 = x.getAttribute("target");
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
				const attr2 = x.getAttribute("target");
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
				const attr3 = x.getAttribute("target");
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
				const attr4 = x.getAttribute("target");
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
	if(push) {
		const if_push = () => {
			const elements = document.querySelectorAll("[if]");
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute("if");
				const el = [];
				el.push(elements[i]);
				if (eval(this.obj[attr])) {
					this.show(this.toNodeList(el[0]));
				} else {
					this.hide(this.toNodeList(el[0]));
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
	}
	else(push) {
		const else_push = () => {
			const elements = document.querySelectorAll("[else]");
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute("else");
				const el = [];
				el.push(elements[i]);
				if (eval(this.obj[attr])) {
					this.hide(this.toNodeList(el[0]));
				} else {
					this.show(this.toNodeList(el[0]));
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
	toNodeList(el){
		el.setAttribute('wrapNodeList','');
		const list = document.querySelectorAll('[wrapNodeList]');
		el.removeAttribute('wrapNodeList');
		return list;
	}
	// custom repeat function
	repeat(el, array, join, start="", end="") {
		el = this.s(el);
		let text = start;
		if (typeof(join) == "object") {
			for (let i = 0; i < array.length; i++) {
				text += join[i] + String(array[i]);
			}
		}
		else {
			for (let i = 0; i < array.length; i++) {
				text += join + String(array[i]);
			}
		}
		text += end;
		el[0].innerHTML = text;
	}
	// parsing the DOM for on and action attribute
	onEvent () {
		const elements = document.querySelectorAll("[on]");
		for (let i = 0; i < elements.length; i++) {
			const attr = elements[i].getAttribute("on");
			const action = elements[i].getAttribute("action");
			elements[i].addEventListener(attr, () => { eval(action); });
		}
	}
	// apply function to each elements selected
	all(el, callback) {
		el = this.s(el);
		el.forEach((data) => {
			callback(this.toNodeList(data));
		});
	}
	/* Basic DOM manipulation */
	text(el, text) {
		el = this.s(el);
		return text ? el[0].innerHTML = this.xss(text) : el[0].innerHTML;
	}
	html(el, html) {
		el = this.s(el);
		return html ? el[0].innerHTML = html : el[0].innerHTML;
	}
	append(el, html) {
		el = this.s(el);
		el[0].innerHTML += html;
	}
	after(el, html) {
		el = this.s(el);
		el[0].insertAdjacentHTML("afterend", html);
	}
	before(el, html) {
		el = this.s(el);
		el[0].insertAdjacentHTML("beforebegin", html);
	}
	clone(el) {
		el[0].cloneNode(true);
	}
	is(el1, el2) {
		el1 = this.s(el1);
		el2 = this.s(el2);
		if (el1[0] === el2[0]) {
			return true;
		}
		return false;
	}
	select(str) {
		return str instanceof NodeList ? str : document.querySelectorAll(str);
	}
	single(str) {
		return this.isElement(str) ? str : document.querySelector(str);
	}
	// alias of $.select()
	s (str) {
		return this.select(str);
	}
	empty(el) {
		el = this.s(el);
		el[0].innerHTML = "";
	}
	valEmpty(el) {
		el = this.s(el);
		el[0].value = null;
	}
	remove(el) {
		el = this.s(el);
		el[0].parentNode.removeChild(el[0]);
	}
	on(el, event, callback) {
		el = this.s(el);
		el[0].addEventListener(event, callback);
	}
	ready(fn) {
		if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}
	scroll (callback) {
		window.addEventListener("scroll", callback);
	}
	scrollTo (x, y) {
		window.scroll(x, y);
	}
	scrollTop (el) {
		el = el != null ? el : document.body.scrollTop == 0 ? this.toNodeList(document.documentElement) : this.toNodeList(document.body)
		el = this.s(el);
		return el[0].scrollTop;
	}
	show(el) {
		el = this.s(el);
		el[0].style.display = "block";
		return true;
	}
	hide(el) {
		el = this.s(el);
		el[0].style.display = "none";
		return true;
	}
	hasClass(el, className) {
		el = this.s(el);
		if (el[0].classList) {
			return el[0].classList.contains(className);
		}
		return !!el[0].className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
	}
	addClass(el, className) {
		el = this.s(el);
		if (el[0].classList) {
			el[0].classList.add(className);
		} else if (!this.hasClass(el, className)) {
			el[0].className += ` ${className}`;
		}
	}
	removeClass(el, className) {
		el = this.s(el);
		if (el[0].classList) {
			el[0].classList.remove(className);
		} else if (this.hasClass(el, className)) {
			const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
			el[0].className = el[0].className.replace(reg, " ");
		}
	}
	toggleClass(el, className) {
		el = this.s(el);
		if (this.hasClass(el, className)) {
			this.removeClass(el, className);
		} else {
			this.addClass(el, className);
		}
	}
	css(el, name, value) {
		el = this.s(el);
		if (typeof(name) == 'object') {
			for (let i in name) {
				el[0].style[i] = name[i];
			}
		} else {
			el[0].style[name] = value;
		}
	}
	getStyle(el, styleProp) {
		el = this.s(el);
		return el[0].style[styleProp];
	}
	fadeOut(el, i=0.1) {
		el = this.s(el)[0];
		el.style.opacity = 1;

		(function fade() {
			if ((el.style.opacity -= i) < 0) {
				el.style.display = "none";
			} else {
				requestAnimationFrame(fade);
			}
		}());
	}
	fadeIn(el, i=0.1, display) {
		el = this.s(el)[0];
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
	// Create a function in the DisplayJS object
	get fn () {
		return DisplayJS.prototype;
	}
	// dynamically update something
	dynamic (callback, push=250) {
		window.setInterval(callback, push);
	}
	parent (el, n = 0) {
		el = this.s(el);
		let newEl = el[0];
		for (const i in this.range(n)) {
			newEl = newEl.parentNode;
		}
		return this.toNodeList(newEl);
	}
	isNode(el){
		return (
			typeof Node === "object" ? el instanceof Node :
				el && typeof el === "object" && typeof el.nodeType === "number" && typeof el.nodeName==="string"
		);
	}
	isElement(el){
		return (
			typeof HTMLElement === "object" ? el instanceof HTMLElement : //DOM2
				el && typeof el === "object" && el !== null && el.nodeType === 1 && typeof el.nodeName==="string"
		);
	}
	// create custom component
	component (name, callback) {
		class component extends HTMLElement {
			constructor () {
				super();
				callback(this);
			}
		}
		customElements.define(name, component);
	}
	// import a script
	import(source, callback) {
		let script = document.createElement("script");
		const prior = document.getElementsByTagName("script")[0];
		script.async = 1;

		script.onload = script.onreadystatechange = (_, isAbort) => {
			if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
				script.onload = script.onreadystatechange = null;
				script = undefined;

				if(!isAbort) { if(callback) callback(); }
			}
		};

		script.src = source;
		prior.parentNode.insertBefore(script, prior);
	}
	sleep(ms){
		const waitUntil = new Date().getTime() + ms;
		while(new Date().getTime() < waitUntil) true;
	}
	// Math and array manipulation + includes
	extend( defaults, options ) {
		const extended = {};
		let prop;
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
	reshape(array, part) {
		const tmp = [];
		for (let i = 0; i < array.length; i += part) {
			tmp.push(array.slice(i, i + part));
		}
		return tmp;
	}
	flatten(array) {
		return array.reduce((a, b) => a.concat(b), []);
	}
	drop(array, val) {
		return val > 0 ? array.slice(val, array.length) : array.slice(0, array.length + val)
	}
	isIn(array, val) {
		return array.includes(val) ? true : false
	}
	rmFromArray(array, condition) {
		const obj = [];
		for (const i in array) {
			if (condition(i) == !1) {
				obj.push(array[i]);
			}
		}
		return obj;
	}
	// Similar to jQuery's $.load();
	load (el, url, callback=() => {}) {
		el = this.s(el);
		this.ajax(url, "GET", "", text => {
			try {
				el[0].innerHTML = text
				callback();
			} catch(e) {
				callback(e);
			}
	
		});
	}
	ajax(url, method, data, callback, header="application/x-www-form-urlencoded; charset=UTF-8") {
		const request = new XMLHttpRequest();
		request.open(method, url, true);
		request.setRequestHeader("Content-Type", header);
		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				const data = request.responseText;
				callback(data, request);
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
	get(url, callback, parse=false) {
		this.ajax(url, "GET", "", (data) => {
			parse ? callback(JSON.parse(data)) : callback(data)
		})
	}
	// create your own $.var() like function
	custom(targetAttr, callback, push) {
		const custom_push = () => {
			const elements = document.querySelectorAll(`[${targetAttr}]`);
			for (let i = 0; i < elements.length; i++) {
				const attr = elements[i].getAttribute(targetAttr);
				callback(elements[i], attr);
			}
		};
		if (!push) {
			custom_push();
		} else if (push == true) {
			custom_push();
			this.live(this.obj, () => {
				custom_push();
			});
		} else {
			window.setInterval(() => {
				custom_push();
			}, push);
		}
	}
	// Object.prototype.watch() implementation
	live(watched, callback) {
		const ObjUtils = {
			watch(object, property, onPropertyChange) {
				const descriptor = Object.getOwnPropertyDescriptor(object, property);
	
				if (typeof descriptor === "undefined") {
					throw new Error(`DisplayJS: Invalid descriptor for property: ${property}, object: ${object}`);
				}
	
				if (typeof onPropertyChange !== "function") {
					throw new Error(`DisplayJS: Invalid onPropertyChange handler: ${onPropertyChange}`);
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
					throw new Error(`DisplayJS: Invalid onPropertyChange handler: ${onPropertyChange}`);
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
	// Get the time difference from now to x.
	time_ago(time) {
		switch (typeof time) {
		case "number":
			break;
		case "string":
			time = +new Date(time);
			break;
		case "object":
			if (time.constructor === Date) time = time.getTime();
			break;
		default:
			time = +new Date();
		}
		const time_formats = [
			[60, "seconds", 1], // 60
			[120, "1 minute ago", "1 minute from now"], // 60*2
			[3600, "minutes", 60], // 60*60, 60
			[7200, "1 hour ago", "1 hour from now"], // 60*60*2
			[86400, "hours", 3600], // 60*60*24, 60*60
			[172800, "Yesterday", "Tomorrow"], // 60*60*24*2
			[604800, "days", 86400], // 60*60*24*7, 60*60*24
			[1209600, "Last week", "Next week"], // 60*60*24*7*4*2
			[2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
			[4838400, "Last month", "Next month"], // 60*60*24*7*4*2
			[29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
			[58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
			[2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
			[5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
			[58060800000, "centuries", 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
		];
		const math = this.math;
		let seconds = math.div(math.sub(+new Date(), time), 1000);
		let token = "ago";
		let list_choice = 1;
	
		if (seconds == 0) {
			return "Just now";
		}
		if (seconds < 0) {
			seconds = Math.abs(seconds);
			token = "from now";
			list_choice = 2;
		}
		let i = 0;
		let format;
		while (format = time_formats[i++]) {
			if (seconds < format[0]) {
				if (typeof format[2] == "string")
					return format[list_choice];
				else
					return `${Math.floor(math.div(seconds, format[2]))} ${format[1]} ${token}`;
			}
		}
		format = time_formats[time_formats.length - 1];
		return `${Math.floor(math.div(seconds, format[2]))} ${format[1]} ${token}`;
	}
	sum(array) {
		return array.reduce((a, b) => this.math.add(a, b));
	}
	multiply(array) {
		return array.reduce((a, b) => this.math.mul(a, b));
	}
	average(array) {
		const summed = this.sum(array);
		const average = this.math.div(summed, array.length);
		return average;
	}
	median(array) {
		array.sort( (a, b) => this.math.sub(a, b) );
		const half = Math.floor(this.math.div(array.length,2));
		if(array.length % 2) {
			return array[half];
		}
		else {
			return this.math.div(this.math.add(array[half-1], array[half]), 2.0);
		}
	}
	predict(array, val, text=false) {
		const djs = this;
		function main(valC, text) {
			const first = array[0][0];
			const second = array[1][0];
			const firstVal = array[0][1];
			const secondVal = array[1][1];
			const a = djs.math.div(djs.math.sub(firstVal, secondVal), djs.math.sub(first, second));
			const b = djs.math.sub(secondVal, djs.math.mul(second, a));
			if (text == true) {
				return `f(x) = ${a}x+${b}; f(${valC}) = ${valC * a + b}`;
			}
			else {
				return valC * a + b;
			}
		}
		function patternMatching (array) {
			if (array.length > 2) {
				if (main(array[2][0], false) == array[2][1]) {
					return true;
				}
				else {
					return false;
				}
			}
			else {
				return true;
			}
		}
		if (patternMatching(array)) {
			return main(val, text);
		}
		else {
			return "DisplayJS: Error, can't find any pattern.";
		}
	
	}
	get math() {
		const exactMath = {
			add() {
				return mathFunctions.addSubDiv(arguments,0);
			},
			sub() {
				return mathFunctions.addSubDiv(arguments,1);
			},
			mul() {
				return mathFunctions.mul(arguments);
			},
			div() {
				return mathFunctions.addSubDiv(arguments,3);
			}
		};
	
		var mathFunctions = {
			addSubDiv(argArray, oper) {
				const args = this.countDecimals(this.validMe(argArray));
				const hComma = this.biggestComma(args);
				const shifted = oper !== 3 ? hComma:0;
				const res = this.shiftComma(this.countResult(this.toExponent(args,hComma),oper),shifted);
				this.isSafeInteger(res);
				return res;
			},
			mul(argArray) {
				const args = this.countDecimals(this.validMe(argArray));
				const intArr = [];
				let commaSum = 0;
				for (const i in args){
					commaSum += args[i].comma;
					intArr.push(args[i].integer);
				}
				return this.shiftComma(this.countResult(intArr,2),commaSum);
			},
			isSafeInteger(result) {
				if(result<=-(2 ** 53-1)||result>=(2 ** 53-1)) throw "DisplayJS: The result is not a safe integer.";
			},
			shiftComma(result, commaPos) {
				return this.toExponent(this.countDecimals([result]),-commaPos)[0];
			},
			countResult(nums, operation) {
				let result = nums[0];
				for(let i=1;i<nums.length;i++){
					switch(operation){
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
			toExponent(args, commaPos) {
				const returned = [];
				for(const i in args){
					args[i].comma -= commaPos;
					const sign = args[i].comma>=0 ? "+":"";
					returned.push(Number(`${args[i].integer.toString()}e${sign}${args[i].comma}`));
				}
				return returned;
			},
			biggestComma(args) {
				const commaAr = [];
				for(const i in args){
					commaAr.push(args[i].comma);
				}
				return Math.min.apply(null,commaAr);
			},
			validMe(args) {
				if(args.length<2) throw "DisplayJS: Set at least two numerical values.";
				for(const i in args){
					args[i] = parseFloat(args[i]);
					if(typeof args[i] !== "number" || isNaN(args[i])) throw "DisplayJS: Every Math argument must be of type number.";
					if(args[i] === Number.POSITIVE_INFINITY || args[i] === Number.NEGATIVE_INFINITY) throw "DisplayJS: Every Math argument must be a numerical value between positive and negative Infinity.";
				}
				return args;
			},
			countDecimals(args) {
				const decimals = [];
				for(const i in args){
					let partDec = 0;
					const splitted = args[i].toString().split("e");
					const commaPos = splitted[0].indexOf(".");
					partDec -= commaPos !== -1 ? splitted[0].length - 1 - commaPos:0;
					partDec += isNaN(Number(splitted[1])) ? 0:Number(splitted[1]);
					splitted[0] = Number(splitted[0].replace(".",""));
					decimals.push({integer:splitted[0],comma:partDec});
				}
				return decimals;
			}
		};
		return exactMath;
	}
	then(toCall, callback) {
		try {
			callback(toCall())
		} catch (e) {
			throw "DisplayJS: " + e;
		}
	}
	copy(text) {
		// all other modern
		let target = document.createElement("textarea");
		target.style.position = "absolute";
		target.style.left = "-9999px";
		target.style.top = "0";
		target.textContent = text;
		document.body.appendChild(target);
		target.focus();
		target.setSelectionRange(0, target.value.length);
	
		// copy the selection of fall back to prompt
		try {
			document.execCommand("copy");
			target.remove();
		} catch (e) {
			window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
		}
	}
}
// Browserify / Node.js
if (typeof define === "function" && define.amd) {
	define(() => new DisplayJS);
// CommonJS and Node.js module support.
} else if (typeof exports !== "undefined") {
		// Support Node.js specific `module.exports` (which can be a function)
	if (typeof module !== "undefined" && module.exports) {
		exports = module.exports = new DisplayJS;
	}
		// But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
	exports.DisplayJS = new DisplayJS;
} else if (typeof global !== "undefined") {
	global.DisplayJS = new DisplayJS;
}