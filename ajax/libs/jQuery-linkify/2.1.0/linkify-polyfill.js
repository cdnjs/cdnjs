(function () {
if (typeof Object.freeze != 'function') {
	Object.freeze = function (obj) { return obj; }
}
if (typeof Object.create != 'function') {
	Object.create = (function() {
		var Temp = function() {};
		return function (prototype) {
			if(prototype !== Object(prototype) && prototype !== null) {
				throw TypeError('Argument must be an object or null');
		 }
		 if (prototype === null) {
				throw Error('null [[Prototype]] not supported');
			}
			Temp.prototype = prototype;
			var result = new Temp();
			Temp.prototype = null;
			return result;
		};
	})();
}

if (typeof Object.defineProperty != 'function') {
	Object.defineProperty = function defineProperty(object, property, descriptor) {
		if ('value' in descriptor) {
			object[property] = descriptor.value;
		}
		return object;
	};
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement, fromIndex) {
		var k;
		if (this == null) {
			throw new TypeError('"this" is null or not defined');
		}
		var o = Object(this);
		var len = o.length >>> 0;
		if (len === 0) {
			return -1;
		}
		var n = +fromIndex || 0;
		if (Math.abs(n) === Infinity) {
			n = 0;
		}
		if (n >= len) {
			return -1;
		}
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
		while (k < len) {
			if (k in o && o[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	};
}
})();
