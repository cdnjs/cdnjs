/*! Native Promise Only
    v0.4.1-e (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(name,context,definition){
	// special form of UMD for polyfilling across evironments
	context[name] = context[name] || definition();
	if (typeof module !== "undefined" && module.exports) { module.exports = context[name]; }
	else if (typeof define === "function" && define.amd) { define(function $AMD$(){ return context[name]; }); }
})("Promise",typeof global !== "undefined" ? global : this,function DEF(){
	/*jshint validthis:true */
	"use strict";

	var sync_schedule = false, cycle, scheduling_queue,
		timer = (typeof setImmediate !== "undefined") ?
			function timer(fn) { return setImmediate(fn); } :
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

	// Note: using a queue instead of array for efficiency
	function Queue() {
		var first, last, item;

		function Item(fn,self) {
			this.fn = fn;
			this.self = self;
			this.next = void 0;
		}

		return {
			add: function add(fn,self) {
				item = new Item(fn,self);
				if (last) {
					last.next = item;
				}
				else {
					first = item;
				}
				last = item;
				item = void 0;
			},
			drain: function drain(self) {
				while (first) {
					first.fn.call(first.self);
					first = first.next;
				}
				cycle = last = first;
			}
		};
	}

	scheduling_queue = Queue();

	function schedule(fn,self) {
		if (sync_schedule) {
			sync_schedule = false;
			fn.call(self);
		}
		else {
			scheduling_queue.add(fn,self);
			if (!cycle) {
				cycle = timer(scheduling_queue.drain);
			}
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

	function notify() {
		var self = this, cb, chain, i;

		if (self.state === 0) {
			return sync_schedule = false;
		}

		for (i=0; i<self.chain.length; i++) {
			chain = self.chain[i];
			cb = (self.state === 1) ? chain.success : chain.failure;
			notifyIsolated(self,cb,chain);
		}
		self.chain.length = 0;
	}

	function notifyIsolated(self,cb,chain) {
		var ret, _then;
		try {
			if (cb === false) {
				sync_schedule = true;
				chain.reject(self.msg);
			}
			else {
				if (cb === true) ret = self.msg;
				else ret = cb.call(void 0,self.msg);

				sync_schedule = true;
				if (ret === chain.promise) {
					chain.reject(TypeError("Promise-chain cycle"));
				}
				else if ((_then = isThenable(ret))) {
					_then.call(ret,chain.resolve,chain.reject);
				}
				else {
					chain.resolve(ret);
				}
			}
		}
		catch (err) {
			sync_schedule = true;
			chain.reject(err);
		}
	}
	function checkYourself(self) {
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

		return self;
	}

	function resolve(msg) {
		var _then, def_wrapper, self = checkYourself(this);

		// self-check failed
		if (self === false) { return; }

		try {
			if ((_then = isThenable(msg))) {
				def_wrapper = new MakeDefWrapper(self);
				_then.call(msg,
					function $resolve$(){ resolve.apply(def_wrapper,arguments); },
					function $reject$(){ reject.apply(def_wrapper,arguments); }
				);
			}
			else {
				self.msg = msg;
				self.state = 1;
				schedule(notify,self);
			}
		}
		catch (err) {
			reject.call(def_wrapper || (new MakeDefWrapper(self)),err);
		}
	}

	function reject(msg) {
		var self = checkYourself(this);

		// self-check failed
		if (self === false) { return; }

		self.msg = msg;
		self.state = 2;
		schedule(notify,self);
	}

	// Note: only called within scheduled cycle, so "safe" to
	// skip cycle scheduling and resolve immediately
	function immediateResolve(resolve,msg) {
		sync_schedule = true;
		resolve(msg);
	}

	function iteratePromises(Constructor,arr,resolver,rejecter) {
		for (var idx=0; idx<arr.length; idx++) {
			(function(idx){
				Constructor.resolve(arr[idx])
				.then(
					function $resolver$(msg){
						resolver(idx,msg);
					},
					rejecter
				);
			})(idx);
		}
	}

	function MakeDefWrapper(self) {
		this.def = self;
		this.triggered = false;
	}

	function MakeDef(self) {
		this.promise = self;
		this.state = 0;
		this.triggered = false;
		this.chain = [];
		this.msg = void 0;
	}

	function Promise(executor) {
		if (typeof executor !== "function") {
			throw TypeError("Not a function");
		}

		var self = this, def = new MakeDef(self);

		self.then = function then(success,failure) {
			var o = {
				success: typeof success === "function" ? success : true,
				failure: typeof failure === "function" ? failure : false
			};
			// Note: `then(..)` itself can be borrowed to be used against
			// a different promise constructor for making the chained promise,
			// by substituting a different `this` binding.
			o.promise = new this.constructor(function extractChain(resolve,reject) {
				if (typeof (resolve && reject) !== "function") {
					throw TypeError("Not a function");
				}

				o.resolve = resolve;
				o.reject = reject;
			});
			def.chain.push(o);

			schedule(notify,def);

			return o.promise;
		};
		// `catch` not allowed as identifier in older JS engines
		self["catch"] = function $catch$(failure) {
			return def.promise.then.call(this,void 0,failure);
		};

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

	builtInProp(
		Promise,"prototype",builtInProp({},"constructor",Promise),/*configurable=*/false
	);

	builtInProp(Promise,"resolve",function Promise$resolve(msg) {
		var Constructor = this;

		// spec mandated checks
		// note: best "isPromise" check that's practical for now
		if (typeof msg === "object" && msg instanceof Constructor) {
			return msg;
		}

		return new Constructor(function executor(resolve,reject){
			if (typeof (resolve && reject) !== "function") {
				throw TypeError("Not a function");
			}

			schedule(function $immediateResolve$(){
				immediateResolve(resolve,msg);
			});
		});
	});

	builtInProp(Promise,"reject",function Promise$reject(msg) {
		return new this(function executor(resolve,reject){
			if (typeof (resolve && reject) !== "function") {
				throw TypeError("Not a function");
			}

			reject(msg);
		});
	});

	builtInProp(Promise,"all",function Promise$all(arr) {
		var Constructor = this;

		// spec mandated checks
		if (!Array.isArray(arr)) {
			return Constructor.reject(TypeError("Not an array"));
		}
		if (arr.length === 0) {
			return Constructor.resolve([]);
		}

		return new Constructor(function executor(resolve,reject){
			if (typeof (resolve && reject) !== "function") {
				throw TypeError("Not a function");
			}

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
		var Constructor = this;

		// spec mandated checks
		if (!Array.isArray(arr)) {
			return Constructor.reject(TypeError("Not an array"));
		}

		return new Constructor(function executor(resolve,reject){
			if (typeof (resolve && reject) !== "function") {
				throw TypeError("Not a function");
			}

			iteratePromises(Constructor,arr,function resolver(idx,msg){
				immediateResolve(resolve,msg);
			},reject);
		});
	});

	return Promise;
});
