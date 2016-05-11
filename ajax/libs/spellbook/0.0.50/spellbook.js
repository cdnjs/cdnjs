// http://www.spellbook.io
if (!Array.prototype.remove) {
	Array.prototype.remove = function(obj) {
		var self = this;
		if (typeof obj !== "object" && !obj instanceof Array) {
			obj = [obj];
		}
		return self.filter(function(e) {
 			if(obj.indexOf(e)<0) return e;
		});
		
	}
}

if (!Array.prototype.clear) {
	Array.prototype.clear = function() {
		this.splice(0, this.length);
	};
}

if (!Array.prototype.random) {
	Array.prototype.random = function() {
		self = this;
		var index = Math.floor(Math.random() * (this.length));
		return self[index];
	}
}

if (!Array.prototype.shuffle) {
	Array.prototype.shuffle = function() {
		var input = this;
		for (var i = input.length-1; i >=0; i--) {
			var randomIndex = Math.floor(Math.random()*(i+1)); 
			var itemAtIndex = input[randomIndex]; 
			input[randomIndex] = input[i]; 
			input[i] = itemAtIndex;
		}
	return input;
	}
}

if (!Array.prototype.first) {
        Array.prototype.first = function() {
       		return this[0];
        }
}

if (!Array.prototype.last) {
        Array.prototype.last = function() {
        	return this[this.length - 1];
        }
}

if (!Array.prototype.inArray) {
        Array.prototype.inArray = function(value) {
		return !!~this.indexOf(value);
        };
}


if (!Array.prototype.contains) {
	Array.prototype.contains = function(value) {
		return !!~this.indexOf(value);
	}
}

if (!Array.prototype.each) {
	Array.prototype.each = function(callback, response) {
		var self = this;
		var end = function(data) {
			if (typeof response === 'function') response(data);
		}
		var i = 0;
		var done = function() {
			if (i < self.length -1) {
				i++;
				callback(self[i], i, done, end);
			} else {
				if (typeof response === 'function') response();
			}
		}
		callback(self[i], i, done, end);
	}
}

if (!Object.prototype.extend) {
	Object.prototype.extend = function(obj) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) this[i] = obj[i];
		}
	}
}

if (!Object.prototype.remove) {
	Object.prototype.remove = function(keys) {
		var self = this;
		if (typeof obj === "object" && obj instanceof Array) {
			arr.forEach(function(key){
				delete(self[key]);
			});
		} else delete(self[keys]);
	}
}

if (!Object.prototype.getKeys) {
	Object.prototype.getKeys = function(keys) {
		var self = this;
		if (typeof obj === "object" && obj instanceof Array) {
			var obj = {};
			keys.forEach(function(key) {
				obj[key] = self[key];
			});
		} else obj[keys] = self[keys];
		return obj;
	}
}

if (!String.prototype.repeatify) {
   String.prototype.repeatify = function(num) {
      var strArray = [];
      for (var i = 0; i < num; i++) {
        strArray.push(this.normalize());
      }
      return strArray;
    };
}

if (!Number.prototype.times) {
	Number.prototype.times = function(callback) {
		if (this % 1 === 0) {
			for (var i = 0; i < this; i++) {
				callback(i)
			}
		}
	}
}

if (!Number.prototype.isInteger) {
	Number.prototype.isInteger = function() {
		this.isInteger = function(num) {
			return num % 1 === 0;
		}
	}
}

if (!Array.prototype.isArray) {
	this.isArray = function() {
		return typeof this === "object" && this instanceof Array;
	}
}


if (!Function.prototype.isFunction) {
	this.isFunction = function() {
		return typeof this === 'function';
	}
}

if (!Object.prototype.isObject) {
	this.isObject = function() {
 		return typeof this === "object" && (isArray(this) === false );
	}
}

if (!String.prototype.isString) {
	this.isString = function() {
    	return typeof this === "string" || this instanceof String;
	}
}

if (!Boolean.prototype.isBoolean) {
	this.isBoolean = function() {
 	   	return typeof this === "boolean";
	}
}

var Spellbook = function() {
	this.test = function() {
		return "Testing Spellbook";
	}

	this.range = function(a, b, step) {
    	var A = [];
    	if(typeof a == 'number'){
        	A[0] = a;
        	step = step || 1;
        	while(a+step<= b) {
           		A[A.length] = a += step;
        	}
    	} else {
        	var s = 'abcdefghijklmnopqrstuvwxyz';
        	if(a === a.toUpperCase()) {
           		b = b.toUpperCase();
           		s = s.toUpperCase();
        	}
        	s = s.substring(s.indexOf(a), s.indexOf(b)+ 1);
        	A = s.split('');        
    	}
    	return A;
	}

	this.isFunction = function(fn) {
    	return typeof fn === 'function';
	}

	this.isArray = function(obj) {
		return typeof obj === "object" && obj instanceof Array;
	}

	this.isObject = function(obj) {
 		return typeof obj === "object" && (isArray(obj) === false );
	}

	this.isNumber = function(obj) {
    	return typeof obj === "number" || obj instanceof Number;
	}

	this.isString = function(obj ) {
    	return typeof obj === "string" || obj instanceof String;
	}

	this.isBoolean = function(obj) {
 	   	return typeof obj === "boolean";
	}

	this.isInteger = function(obj) {
		return obj % 1 === 0;
	}

	this.random = function(min, max) {
		if (typeof min === "number" && typeof max === "number") return Math.floor(Math.random() * (max - min)) + min;
		else return 0;
	}

 	this.clone = function(obj) {
		if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj) return obj;

		var temp = obj.constructor();
		for(var key in obj) {
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				obj['isActiveClone'] = null;
				temp[key] = clone(obj[key]);
				delete obj['isActiveClone'];
			}
		}
		return temp;
	}

	this.assign = function(obj) {
		return this.clone(obj);
	}

	this.remove = function(array, obj) {
        if (typeof obj !== "object" && !obj instanceof Array) {
            obj = [obj];
        }
        return array.filter(function(e) {
        	if(obj.indexOf(e)<0) return e;
        });
	}

	this.clear = function(array) {
		array.splice(0, array.length);
	}

	this.inArray = function(a, b) {
		return !!~a.indexOf(b);
	}

	this.contains = function(a, b) {
		return !!~a.indexOf(b);
	}

	this.times = function(number, callback) {
		if (typeof number === 'number' && number > 0) {
			if ( typeof callback === 'function') {
				for (var i = 0; i < number; i++) {
					callback(i);
				}
			}
		}
	}

	this.each = function(array, callback, response) {
		var i = 0;
		var done = function() {
			if (i < array.length -1) {
				i++;
				callback(array[i], i, done, end);
			} else if (typeof response === 'function') response();
		}
		var end = function(data) {
			if (typeof response === 'function') response(data);
		}
		callback(array[i], i, done, end);
	}

	this.waterfall = function(callbacks, response) {
		var i = 0;
		var done = function(data, respdata) {
			if (i < callbacks.length-1) {
				i++;
				if (data) {
					if (data === true) {
						if (typeof response === 'function') response(respdata);
					} else callbacks[i](done, data);
				} else callbacks[i](done);
			} else {
				if (typeof response === 'function') {
					if (data) {
						if (data === true) response(respdata);
						else response(data);
					} else response();
				}
			}
		}
		if (callbacks instanceof Array) callbacks[i](done);
	}

	this.forever = function(callback, response) {
		var end = function(data) {
			if (typeof response === 'function') response(data);
		}
		var next = function(data) {
			callback(next, end);
		}
		callback(next, end);
	}

	this.get =  function(obj, route) {
    	if (obj !== undefined && typeof route === "string") {
        	route = route.split(".");
        	if (route.length === 1 ) {
            	return obj[route[0]];
        	} else {
            	for (var i = 0; i < route.length; i++) {
                	if (obj[route[i]] !== undefined) {
                    	obj = obj[route[i]];
                	} else {
                    	return undefined;
                	}
            	}
            	return obj;
        	}
    	} else {
    		return undefined;
    	}
	}

	this.parallel = function(callbacks, response) {
        var it = 0;
        var data = [];
        var async = function(ix) {
            setTimeout(function() {
                callbacks[ix](done);
            }, 0);

       		var done = function(gdata) {
           		if (gdata) data[ix] = gdata;
           		
            	if (it < callbacks.length -1) {
               		it++;
            	} else {
               		if (typeof response === 'function') {
                   		response(data);
                	}
            	}
        	}
        }

        if (callbacks instanceof Array) {
            for (var i = 0; i < callbacks.length; i++) {
                async(i);
            }
        }
    }

	this.pl = this.parallelLimit = function(limit, callbacks, response) {
		var it = 0;
		var to = callbacks.length;
		var data = [];
		var async = function(ix) {
			setTimeout(function() {
				callbacks[ix](done);
			}, 0);

			var done = function(gdata) {
				to--;
				if (gdata) data[ix] = gdata;
				if (it !== callbacks.length) {
					async(it);
					it++;
				} else if (to === 0 && typeof response === 'function') response(data);
			}
		}

		if (callbacks instanceof Array) {
			for (var i = 0; i < limit; i++) {
				async(i);
				it++;
			}
		}
	}

	this.epl = this.eachpl = this.eachParallelLimit = function(array, limit, callback, response) {
		var it = 0;
		var to = array.length;
		var data = [];
		var async = function(item, index) {
			setTimeout(function () {
				callback(item, index, done);
			}, 0);

			var done = function(gdata) {
				to--;
				if (gdata) data[ix] = gdata;
				if (it !== array.length) {
					async(array[it], it);
					it++;
				} else if (to === 0 && typeof response === 'function') response(data);
			}
		}

		if (array instanceof Array) {
			if (limit > array.length) limit =  array.length;
			for (var i = 0; i < limit; i++) {
				async(array[i], i);
				it++;
			}
		}
	}


	this.checkDate = function(value, userFormat) {
		userFormat = userFormat || 'mm/dd/yyyy';
 		var delimiter = /[^mdy]/.exec(userFormat)[0];
 		var theFormat = userFormat.split(delimiter);
  		var theDate = value.split(delimiter);
		function isDate(date, format) {
			var m, d, y, i = 0, len = format.length, f;
			for (i; i < len; i++) {
				f = format[i];
				if (/m/.test(f)) m = date[i];
				if (/d/.test(f)) d = date[i];
				if (/y/.test(f)) y = date[i];
			}
			return (
				m > 0 && m < 13 &&
				y && y.length === 4 &&
				d > 0 &&
				d <= (new Date(y, m, 0)).getDate()
			);
		};
		return isDate(theDate, theFormat);
	}

	this.excerpt = function(str, nwords) {
		var words = str.split(' ');
		words.splice(nwords, words.length-1);
		return words.join(' ');
	}

	this.isEmpty = this.empty = function(data) {
		return (data === null || data === "" || data === undefined);
	}

}

if (typeof process === 'object') module.exports = new Spellbook;
else {
	Spellbook.prototype.ajax = {};

	Spellbook.prototype.ajax.get = function(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', encodeURI(url));
		xhr.onload = function() {
    		if (xhr.status === 200) callback(false, xhr.responseText);
    		else callback("Request failed.  Returned status of " + status);
		};
		xhr.send();
	}

	Spellbook.prototype.ajax.post = function(url, data, header, callback) {
		function param(object) {
    		var encodedString = '';
    		for (var prop in object) {
        		if (object.hasOwnProperty(prop)) {
            		if (encodedString.length > 0) encodedString += '&';
            		encodedString += encodeURI(prop + '=' + object[prop]);
        		}
    		}
    		return encodedString;
		}

		if (typeof header === "function") {
			callback = header;
			header = "application/json";
			var finaldata = JSON.stringify(data);
		} else var finaldata = param(data);

    	var xhr = new XMLHttpRequest();
		xhr.open('POST', encodeURI(url));
		xhr.setRequestHeader('Content-Type', header);
		xhr.send(finaldata);
		xhr.onload = function() {
    		if (xhr.status === 200 && xhr.responseText !== undefined) callback(null, xhr.responseText);
    		else if (xhr.status !== 200) callback('Request failed.  Returned status of ' + xhr.status);
		}
	}

	var sb = new Spellbook();
}
