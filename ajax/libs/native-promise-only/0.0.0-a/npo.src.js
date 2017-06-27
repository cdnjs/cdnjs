// Native Promise Only - (c) 2014 Kyle Simpson - MIT License

(function UMD(name,context,definition){
	if (typeof module !== "undefined" && module.exports) { module.exports = definition(); }
	else if (typeof define === "function" && define.amd) { define(definition); }
	else { context[name] = context[name] || definition(name,context); }
})("Promise",this,function DEF(){
	/*jshint validthis:true */
	"use strict";

	function schedule(fn) {
		return (typeof setImmediate !== "undefined") ?
			setImmediate(fn) : setTimeout(fn,0)
		;
	}

	// promise duck typing?
	function isThenable(o,shallow) {
		var _then;

		if (o !== null &&
			(
				typeof o === "object" || typeof o === "function"
			)
		) {
			if (shallow) {
				// shallow/weak check, so that we
				// don't fire a potential getter
				return ("then" in o);
			}
			_then = o.then;
			return isFunction(_then) ? _then : false;
		}
		return false;
	}

	function isFunction(fn) {
		return (typeof fn === "function");
	}

	function notify() {
		if (this.state === 0) {
			return;
		}

		var cb, ret, _then, _chained, queue;

		if (this.state === 1) {
			queue = this.success;
		}
		if (this.state === 2) {
			queue = this.failure;
		}

		while ((cb = queue.shift())) {
			_chained = this.chained.shift();
			try {
				ret = cb(this.msg);
				if (ret === _chained.promise) {
					throw new TypeError("Illegal promise chain cycle");
				}
				if ((_then = isThenable(ret))) {
					_then.call(ret,_chained.resolve,_chained.reject);
				}
				else {
					_chained.resolve(ret);
				}
			}
			catch (err) {
				_chained.reject(err);
			}
		}
	}

	function resolve(msg) {
		if (this.state !== 0) {
			return;
		}

		var _then;

		try {
			if ((_then = isThenable(msg))) {
				_then.call(msg,resolve.bind(this),reject.bind(this));
			}
			else {
				this.msg = msg;
				this.state = 1;
				schedule(notify.bind(this));
			}
		}
		catch (err) {
			reject.call(this,err);
		}
	}

	function publicResolve(msg) {
		if (this.triggered) {
			return;
		}
		this.triggered = true;

		resolve.call(this,msg);
	}

	function reject(msg) {
		if (this.state !== 0) {
			return;
		}

		var _then;

		try {
			if ((_then = isThenable(msg))) {
				_then.call(msg,resolve.bind(this),reject.bind(this));
			}
			else {
				this.msg = msg;
				this.state = 2;
				schedule(notify.bind(this));
			}
		}
		catch (err) {
			this.msg = err;
			this.state = 2;
			schedule(notify.bind(this));
		}
	}

	function publicReject(msg) {
		if (this.triggered) {
			return;
		}
		this.triggered = true;

		reject.call(this,msg);
	}

	function then(success,failure) {
		this.success.push(isFunction(success) ? success : function(m){ return m; });
		this.failure.push(isFunction(failure) ? failure : function(m){ throw m; });

		var p = new Promise(function __Promise__(resolve,reject){
			this.chained.push({
				resolve: resolve,
				reject: reject
			});
		}.bind(this));
		this.chained[this.chained.length-1].promise = p;

		schedule(notify.bind(this));

		return p;
	}

	function __catch(failure) {
		return this.promise.then(void 0,failure);
	}

	function Promise(cb) {
		var def = {
			promise: this,
			state: 0,
			triggered: false,
			success: [],
			failure: [],
			chained: []
		};
		this.then = then.bind(def);
		this["catch"] = __catch.bind(def);

		try {
			cb(publicResolve.bind(def),publicReject.bind(def));
		}
		catch (err) {
			reject.call(def,err);
		}
	}

	Promise.resolve = function __resolve__(msg) {
		return new Promise(function __Promise__(resolve){
			resolve(msg);
		});
	};

	Promise.reject = function __reject__(msg) {
		return new Promise(function __Promise__(_,reject){
			reject(msg);
		});
	};

	Promise.all = function __all__(arr) {
		if (!Array.isArray(arr)) {
			throw new TypeError("Promise.all requires an array");
		}

		return new Promise(function __Promise__(resolve,reject){
			var msgs, count = 0, len = arr.length;

			if (len === 0) {
				resolve([]);
			}

			msgs = [];

			function resolveCheck(idx,msg) {
				msgs[idx] = msg;
				count++;
				if (count === len) {
					resolve(msgs);
				}
			}

			arr.forEach(function __foreach__(v,idx){
				if (!isThenable(v,/*shallow=*/true)) {
					v = Promise.resolve(v);
				}

				v.then(resolveCheck.bind(null,idx),reject);
			});
		});
	};

	Promise.race = function __race__(arr) {
		if (!Array.isArray(arr)) {
			throw new TypeError("Promise.race requires an array");
		}

		return new Promise(function __Promise__(resolve,reject){
			// use `some(..)` so we can quit early if we need to
			arr.some(function __foreach__(v){
				if (!isThenable(v,/*shallow=*/true)) {
					resolve(v);
					return true; // quit early
				}

				v.then(resolve,reject);
			});
		});
	};

	return Promise;
});
