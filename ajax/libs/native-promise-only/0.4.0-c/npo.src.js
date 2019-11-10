/*! Native Promise Only
    v0.4.0-c (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(name,context,definition){
	// special form of UMD for polyfilling across evironments
	context[name] = context[name] || definition();
	if (typeof module !== "undefined" && module.exports) { module.exports = context[name]; }
	else if (typeof define === "function" && define.amd) { define(function(){ return context[name]; }); }
})("Promise",typeof global !== "undefined" ? global : this,function DEF(){
	/*jshint validthis:true */
	"use strict";

	var sync_schedule = false,
		timer = (typeof setImmediate !== "undefined") ?
			function timer(fn) { setImmediate(fn); } :
			setTimeout,
		builtInProp = Object.defineProperty ?
			function builtInProp(obj,name,val,config) {
				return Object.defineProperty(obj,name,{
					value: val,
					writable: true,
					configurable: config !== false
				});
			} :
			function builtInProp(obj,name,val) {
				obj[name] = val;
				return obj;
			}
	;

	function schedule(fn) {
		if (sync_schedule) {
			sync_schedule = false;
			fn();
		}
		else {
			timer(fn,0);
		}
	}


	// promise duck typing?
	function isThenable(o) {
		var _then, o_type = typeof o;

		if (o !== null &&
			(
				o_type === "object" || o_type === "function"
			)
		) {
			_then = o.then;
		}
		return typeof _then === "function" ? _then : false;
	}

	function notify(self) {
		return function notify() {
			var cb, ret, _then, _chained, queue;

			if (self.state === 0) {
				return sync_schedule = false;
			}
			else if (self.state === 1) {
				queue = self.success;
				self.failure.length = 0;
			}
			else {
				queue = self.failure;
				self.success.length = 0;
			}

			while ((cb = queue.shift()) || cb === false) {
				_chained = self.chained.shift();
				try {
					if (cb === false) {
						sync_schedule = true;
						_chained.reject(self.msg);
					}
					else {
						if (cb === true) ret = self.msg;
						else ret = cb(self.msg);

						sync_schedule = true;
						if (ret === _chained.promise) {
							_chained.reject(TypeError("Promise-chain cycle"));
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
		};
	}

	function resolve(msg) {
		var _then, self = this, obj;

		if (self.def) {
			if (self.triggered) {
				return sync_schedule = false;
			}
			self.triggered = true;
			self = self.def;
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
				_then.call(msg,
					function $resolve$(){ resolve.apply(obj,arguments); },
					function $reject$(){ reject.apply(obj,arguments); }
				);
			}
			else {
				self.msg = msg;
				self.state = 1;
				schedule(notify(self));
			}
		}
		catch (err) {
			reject.call(obj,err);
		}
	}

	function reject(msg) {
		var self = this;

		if (self.def) {
			if (self.triggered) {
				return sync_schedule = false;
			}
			self.triggered = true;
			self = self.def;
		}

		if (self.state !== 0) {
			return sync_schedule = false;
		}

		self.msg = msg;
		self.state = 2;
		schedule(notify(self));
	}

	// Note: only called within scheduled cycle, so "safe" to
	// skip cycle scheduling and resolve immediately
	function immediateResolve(resolve,msg) {
		sync_schedule = true;
		resolve(msg);
	}

	function checkArray(Constructor,arr) {
		if (!Array.isArray(arr)) {
			return Constructor.reject(TypeError("Expected array argument"));
		}
	}

	function checkCapability(resolve,reject) {
		if (typeof resolve !== "function") {
			throw Error("Resolver is not a function");
		}
		if (typeof reject !== "function") {
			throw Error("Rejecter is not a function");
		}
	}

	function iteratePromises(Constructor,arr,resolver,rejecter) {
		for (var idx=0; idx<arr.length; idx++) {
			Constructor.resolve(arr[idx])
			.then(
				function $resolver$(msg){
					resolver(idx,msg);
				},
				rejecter
			);
		}
	}

	function Promise(executor) {
		if (typeof executor !== "function") {
			throw TypeError("Expected function argument");
		}
		var def = {
			Constructor: Promise,
			promise: this,
			state: 0,
			triggered: false,
			success: [],
			failure: [],
			chained: []
		};
		builtInProp(this,"then",function then(success,failure) {
			// note: `this` check not necessary here. the following
			// statements will already throw if `this` overridden to
			// an incompatible object. however, `call(..)` & `apply(..)`
			// cannot override since public `then(..)` is already
			// pre-bound. only `new x.then(..)` could override, which
			// would bind `this` to an empty object!
			def.success.push(typeof success === "function" ? success : true);
			def.failure.push(typeof failure === "function" ? failure : false);

			var p = new def.Constructor(function extractChain(resolve,reject) {
				checkCapability(resolve,reject);

				def.chained.push({
					resolve: resolve,
					reject: reject
				});
			});
			def.chained[def.chained.length-1].promise = p;

			schedule(notify(def));

			return p;
		});
		// `catch` not allowed as identifier in older JS engines
		builtInProp(this,"catch",function $catch$(failure) {
			return def.promise.then(void 0,failure);
		});

		try {
			executor.call(
				void 0,
				function publicResolve(msg){
					if (def.triggered) {
						return void(sync_schedule = false);
					}
					def.triggered = true;

					resolve.call(def,msg);
				},
				function publicReject(msg) {
					if (def.triggered) {
						return void(sync_schedule = false);
					}
					def.triggered = true;

					reject.call(def,msg);
				}
			);
		}
		catch (err) {
			reject.call(def,err);
		}
	}

	builtInProp(Promise,"prototype",{
		value: builtInProp({},"constructor",Promise)
	},/*configurable=*/false);

	builtInProp(Promise,"resolve",function Promise$resolve(msg) {
		var Constructor = this;

		// spec mandated checks
		// note: best "isPromise" check that's practical for now
		if (typeof msg === "object" && msg instanceof Constructor) {
			return msg;
		}

		return new Constructor(function executor(resolve,reject){
			checkCapability(resolve,reject);
			schedule(function(){
				immediateResolve(resolve,msg);
			});
		});
	});

	builtInProp(Promise,"reject",function Promise$reject(msg) {
		return new this(function executor(resolve,reject){
			checkCapability(resolve,reject);
			reject(msg);
		});
	});

	builtInProp(Promise,"all",function Promise$all(arr) {
		var err, Constructor = this;

		// spec mandated checks
		if (err = checkArray(Constructor,arr)) {
			return err;
		}
		if (arr.length === 0) {
			return Constructor.resolve([]);
		}

		return new Constructor(function executor(resolve,reject){
			checkCapability(resolve,reject);

			var len = arr.length, msgs = Array(len), count = 0;

			iteratePromises(Constructor,arr,function resolver(idx,msg) {
				msgs[idx] = msg;
				if (++count === len) {
					immediateResolve(resolve,msgs);
				}
			},reject);
		});
	});

	builtInProp(Promise,"race",function Promise$race(arr) {
		var err, Constructor = this;

		// spec mandated checks
		if (err = checkArray(Constructor,arr)) {
			return err;
		}

		return new Constructor(function executor(resolve,reject){
			checkCapability(resolve,reject);

			iteratePromises(Constructor,arr,function resolver(idx,msg){
				immediateResolve(resolve,msg);
			},reject);
		});
	});

	return Promise;
});
