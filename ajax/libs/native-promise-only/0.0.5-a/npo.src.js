/*! Native Promise Only
    v0.0.5-a (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(name,context,definition){
	if (typeof module !== "undefined" && module.exports) { module.exports = definition(); }
	else if (typeof define === "function" && define.amd) { define(definition); }
	else { context[name] = context[name] || definition(name,context); }
})("Promise",this,function DEF(){
	/*jshint validthis:true */
	"use strict";

	function schedule(fn) {
		if (sync_schedule) {
			sync_schedule = false;
			fn();
		}
		else if (typeof setImmediate !== "undefined") {
			setImmediate(fn);
		}
		else {
			setTimeout(fn,0);
		}
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
			return typeof _then === "function" ? _then : false;
		}
		return false;
	}

	function notify() {
		if (this.state === 0) {
			return sync_schedule = false;
		}

		var cb, ret, _then, _chained, queue;

		if (this.state === 1) {
			queue = this.success;
		}
		if (this.state === 2) {
			queue = this.failure;
		}

		while ((cb = queue.shift()) || cb === false) {
			_chained = this.chained.shift();
			try {
				if (cb === false) {
					sync_schedule = true;
					_chained.reject(this.msg);
				}
				else {
					if (cb === true) ret = this.msg;
					else ret = cb(this.msg);

					sync_schedule = true;
					if (ret === _chained.promise) {
						_chained.reject(new TypeError("Illegal promise chain cycle"));
					}
					else if ((_then = isThenable(ret))) {
						_then.call(ret,_chained.resolve,_chained.reject);
					}
					else {
						_chained.resolve(ret);
					}
				}
			}
			catch (err) {
				sync_schedule = true;
				_chained.reject(err);
			}
		}
	}

	function resolve(msg) {
		var _then, self, obj;

		if (this.def) {
			if (this.triggered) {
				return sync_schedule = false;
			}
			this.triggered = true;
			self = this.def;
		}
		else {
			self = this;
		}

		if (self.state !== 0) {
			return sync_schedule = false;
		}

		obj = {
			def: self,
			triggered: false
		};

		try {
			if ((_then = isThenable(msg))) {
				_then.call(msg,resolve.bind(obj),reject.bind(obj));
			}
			else {
				self.msg = msg;
				self.state = 1;
				schedule(notify.bind(self));
			}
		}
		catch (err) {
			reject.call(obj,err);
		}
	}

	function publicResolve(msg) {
		if (this.triggered) {
			return void(sync_schedule = false);
		}
		this.triggered = true;

		resolve.call(this,msg);
	}

	function reject(msg) {
		var self;

		if (this.def) {
			if (this.triggered) {
				return sync_schedule = false;
			}
			this.triggered = true;
			self = this.def;
		}
		else {
			self = this;
		}

		if (self.state !== 0) {
			return sync_schedule = false;
		}

		self.msg = msg;
		self.state = 2;
		schedule(notify.bind(self));
	}

	function publicReject(msg) {
		if (this.triggered) {
			return void(sync_schedule = false);
		}
		this.triggered = true;

		reject.call(this,msg);
	}

	function extractChain(resolve,reject) {
		this.chained.push({
			resolve: resolve,
			reject: reject
		});
	}

	function then(success,failure) {
		this.success.push(typeof success === "function" ? success : true);
		this.failure.push(typeof failure === "function" ? failure : false);

		var p = new Promise(extractChain.bind(this));
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

	function scheduledResolve(msg,resolve) {
		sync_schedule = true;
		resolve(msg);
	}

	Promise.resolve = function __resolve__(msg) {
		if (msg instanceof Promise) {
			return msg;
		}
		return new Promise(function __Promise__(resolve){
			schedule(scheduledResolve.bind(null,msg,resolve));
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

	var sync_schedule = false;

	return Promise;
});
