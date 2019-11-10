/*! Native Promise Only
    v0.1.0-a (c) Kyle Simpson
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
	function isThenable(o) {
		var _then;

		if (o !== null &&
			(
				typeof o === "object" || typeof o === "function"
			)
		) {
			_then = o.then;
		}
		return typeof _then === "function" ? _then : false;
	}

	function notify() {
		if (this.state === 0) {
			return sync_schedule = false;
		}

		var cb, ret, _then, _chained, queue;

		if (this.state === 1) {
			queue = this.success;
			this.failure.length = 0;
		}
		if (this.state === 2) {
			queue = this.failure;
			this.success.length = 0;
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
						_chained.reject(TypeError("Illegal promise chain cycle"));
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

	// `catch` not allowed as identifier in older JS engines
	function $catch$(failure) {
		return this.promise.then(void 0,failure);
	}

	function Promise(executor) {
		if (typeof executor !== "function") {
			throw TypeError("Promise requires a function");
		}
		var def = {
			promise: this,
			state: 0,
			triggered: false,
			success: [],
			failure: [],
			chained: []
		};
		this.then = then.bind(def);
		this["catch"] = $catch$.bind(def);

		try {
			executor(publicResolve.bind(def),publicReject.bind(def));
		}
		catch (err) {
			reject.call(def,err);
		}
	}

	function scheduledResolve(resolve,msg) {
		sync_schedule = true;
		resolve(msg);
	}

	function checkForArray(type,arr) {
		if (!Array.isArray(arr)) {
			throw TypeError("Promise." + type + " requires an array");
		}
	}

	function iteratePromises(arr,resolver,rejecter) {
		arr.forEach(function item(v,idx) {
			Promise.resolve(v)
			.then(
				resolver.bind(null,idx),
				rejecter
			);
		});
	}

	Promise.resolve = function Promise$resolve(msg) {
		// note: as practical an "isPromise" check as possible
		// for now
		if (typeof msg === "object" && msg instanceof Promise) {
			return msg;
		}
		return new Promise(function executor(resolve){
			schedule(scheduledResolve.bind(null,resolve,msg));
		});
	};

	Promise.reject = function Promise$reject(msg) {
		return new Promise(function executor(_,reject){
			reject(msg);
		});
	};

	Promise.all = function Promise$all(arr) {
		checkForArray("all",arr);

		return new Promise(function executor(resolve,reject){
			function resolveCheck(idx,msg) {
				msgs[idx] = msg;
				count++;
				if (count === len) {
					scheduledResolve(resolve,msgs);
				}
			}

			var msgs, count = 0, len = arr.length;

			// per spec
			if (len === 0) {
				resolve([]);
			}
			else {
				msgs = [];
				iteratePromises(arr,resolveCheck,reject);
			}
		});
	};

	Promise.race = function Promise$race(arr) {
		checkForArray("race",arr);

		return new Promise(function executor(resolve,reject){
			iteratePromises(arr,function resolver(idx,msg){
				scheduledResolve(resolve,msg);
			},reject);
		});
	};

	if (Object.defineProperty) {
		Object.defineProperty(Promise,"prototype",{
			value: Object.defineProperty({},"constructor",{
				writable: true,
				configurable: true,
				value: Promise
			})
		});
	}

	var sync_schedule = false;

	return Promise;
});
