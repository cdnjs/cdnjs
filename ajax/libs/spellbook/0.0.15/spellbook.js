/* Spellbook Class Extension */
if (!Array.prototype.remove) {
	Array.prototype.remove = function (obj) {
		var self = this;
		if (typeof obj === "object" && obj instanceof Array) {
			obj.forEach(function (value) {
				self.splice(self.indexOf(value),1);
			});
			return self;
		} else {
			this.splice(this.indexOf(obj),1);
			return this;
		};
	};
};

if (!Array.prototype.clear) {
    Array.prototype.clear = function() {
       this.splice(0, this.length);
    };
};

if (!Array.prototype.random) {
	Array.prototype.random = function() {
		self = this;
		var index = Math.floor(Math.random() * (this.length));
		return self[index];
	};
};

if (!Object.prototype.extend) {
	Object.prototype.extend = function(obj) {
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				this[i] = obj[i];
			};
		};
	};
};

if (!Object.prototype.remove) {
	Object.prototype.remove = function(keys) {
		var self = this;
		if (typeof obj === "object" && obj instanceof Array) {
			arr.forEach(function(key){
				delete(self[key]);
			});
		} else {
			delete(self[keys]);
		};
	};
};

if (!Object.prototype.getKeys) {
	Object.prototype.getKeys = function(keys) {
		var self = this;
		if (typeof obj === "object" && obj instanceof Array) {
			var obj = {};
			keys.forEach(function(key){
				obj[key] = self[key];
			});
		} else {
			obj[keys] = self[keys];
		}
		return obj;
	};
};

/* Spellbook Utils */
var Spellbook = function () {
	this.test = function () {
		return "Testing Spellbook";
	};

	this.range = function(a, b, step) {
    		var A= [];
    		if(typeof a == 'number'){
        		A[0]= a;
        		step = step || 1;
        		while(a+step<= b){
            			A[A.length]= a+= step;
        		};
    		} else {
        		var s = 'abcdefghijklmnopqrstuvwxyz';
        		if(a=== a.toUpperCase()){
            			b=b.toUpperCase();
            			s= s.toUpperCase();
        		};
        		s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);
        		A= s.split('');        
    		};
    		return A;
	};

	this.isFunction = function (fn) {
    		return typeof fn === 'function';
	};

	this.isArray = function (obj) {
		return typeof obj === "object" && obj instanceof Array;
	};	

	this.isObject = function (obj) {
 		return typeof obj === "object" && (isArray(obj) === false );
	};

	this.isNumber = function (obj) {
    		return typeof obj === "number" || obj instanceof Number;
	};

	this.isString = function (obj ) {
    		return typeof obj === "string" || obj instanceof String;
	};

	this.isBoolean = function (obj) {
 	   	return typeof obj === "boolean";
	};

	this.random = function (min, max) {
		if (typeof min === "number" && typeof max === "number") {
			return Math.floor(Math.random() * (max - min)) + min;
		} else {
			return 0;
		};
	};

 	this.clone = function (obj) {
		if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
			return obj;

		var temp = obj.constructor();
		for(var key in obj) {
			if(Object.prototype.hasOwnProperty.call(obj, key)) {
				obj['isActiveClone'] = null;
				temp[key] = clone(obj[key]);
				delete obj['isActiveClone'];
			};
		};
		return temp;
	};

	this.assign = function (obj) {
		return this.clone(obj);
	};

	this.remove = function (array, obj) {
		if (typeof array === 'array') {
                	if (typeof obj === "object" && obj instanceof Array) {
                        	obj.forEach(function (value) {
                                	array.splice(array.indexOf(value),1);
                        	});
                        	return array;
                	} else {
                        	array.splice(array.indexOf(obj),1);
                       		return array;
                	};
		};
        };

	this.clear = function (array) {
		array.splice(0, array.length);
	};

	this.times = function (number, callback) {
		if (typeof number === 'number' && number > 0) {
			if ( typeof callback === 'function') {
				for (var i = 0; i < number; i++) {
					callback();
				};
			};
		};
	};
};


if (typeof process === 'object') {
	module.exports = new Spellbook;
} else {
	var sb = new Spellbook();
}
