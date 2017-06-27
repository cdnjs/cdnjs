/*! asynquence-contrib
    v0.9.0-a (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(dependency,definition){
	if (typeof module !== "undefined" && module.exports) {
		// make dependency injection wrapper first
		module.exports = function $InjectDependency$(dep) {
			// only try to `require(..)` if dependency is a string module path
			if (typeof dep == "string") {
				try { dep = require(dep); }
				catch (err) {
					// dependency not yet fulfilled, so just return
					// dependency injection wrapper again
					return $InjectDependency$;
				}
			}
			return definition(dep);
		};

		// if possible, immediately try to resolve wrapper
		// (with peer dependency)
		if (typeof dependency == "string") {
			module.exports = module.exports( require("path").join("..",dependency) );
		}
	}
	else if (typeof define == "function" && define.amd) { define([dependency],definition); }
	else { definition(dependency); }
})(this.ASQ || "asynquence",function DEF(ASQ){
	"use strict";

	var ARRAY_SLICE = Array.prototype.slice,
		ø = Object.create(null),
		brand = "__ASQ__",
		schedule = ASQ.__schedule,
		tapSequence = ASQ.__tapSequence
	;

	function wrapGate(api,fns,success,failure,reset) {
		fns = fns.map(function __map__(fn,idx){
			var def;
			// tap any directly-provided sequences immediately
			if (ASQ.isSequence(fn)) {
				def = { fn: fn };
				tapSequence(def);
				return function __fn__(trigger) {
					def.fn
					.val(function __val__(){
						success(trigger,idx,ARRAY_SLICE.call(arguments));
					})
					.or(function __or__(){
						failure(trigger,idx,ARRAY_SLICE.call(arguments));
					});
				};
			}
			else {
				return function __fn__(trigger) {
					var args = ARRAY_SLICE.call(arguments);
					args[0] = function __trigger__() {
						success(trigger,idx,ARRAY_SLICE.call(arguments));
					};
					args[0].fail = function __fail__() {
						failure(trigger,idx,ARRAY_SLICE.call(arguments));
					};
					args[0].abort = function __abort__() {
						reset();
					};
					args[0].errfcb = function __errfcb__(err) {
						if (err) {
							failure(trigger,idx,[err]);
						}
						else {
							success(trigger,idx,ARRAY_SLICE.call(arguments,1));
						}
					};

					fn.apply(ø,args);
				};
			}
		});

		api.then(function __then__(){
			var args = ARRAY_SLICE.call(arguments);

			fns.forEach(function __forEach__(fn){
				fn.apply(ø,args);
			});
		});
	}

// "after"
ASQ.extend("after",function __extend__(api,internals){
	return function __after__(num) {
		var orig_args = arguments.length > 1 ?
			ARRAY_SLICE.call(arguments,1) :
			void 0
		;
		num = +num || 0;

		api.then(function __then__(done){
			var args = orig_args || ARRAY_SLICE.call(arguments,1);

			setTimeout(function __setTimeout__(){
				done.apply(ø,args);
			},num);
		});

		return api;
	};
});

ASQ.after = function ASQ$after() {
	return ASQ().after.apply(ø,arguments);
};
// "any"
ASQ.extend("any",function __extend__(api,internals){
	return function __any__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		function reset() {
			finished = true;
			error_messages.length = 0;
			success_messages.length = 0;
		}

		function complete(trigger) {
			if (success_messages.length > 0) {
				// any successful segment's message(s) sent
				// to main sequence to proceed as success
				success_messages.length = fns.length;
				trigger.apply(ø,success_messages);
			}
			else {
				// send errors into main sequence
				error_messages.length = fns.length;
				trigger.fail.apply(ø,error_messages);
			}

			reset();
		}

		function success(trigger,idx,args) {
			if (!finished) {
				completed++;
				success_messages[idx] =
					args.length > 1 ?
					ASQ.messages.apply(ø,args) :
					args[0]
				;

				// all segments complete?
				if (completed === fns.length) {
					finished = true;

					complete(trigger);
				}
			}
		}

		function failure(trigger,idx,args) {
			if (!finished &&
				!(idx in error_messages)
			) {
				completed++;
				error_messages[idx] =
					args.length > 1 ?
					ASQ.messages.apply(ø,args) :
					args[0]
				;
			}

			// all segments complete?
			if (!finished &&
				completed === fns.length
			) {
				finished = true;

				complete(trigger);
			}
		}

		var completed = 0, error_messages = [], finished = false, fns,
			success_messages = []
		;

		fns = ARRAY_SLICE.call(arguments);

		wrapGate(api,fns,success,failure,reset);

		return api;
	};
});
// "errfcb"
ASQ.extend("errfcb",function __extend__(api,internals){
	return function __errfcb__() {
		// create a fake sequence to extract the callbacks
		var sq = {
			val: function __then__(cb){ sq.val_cb = cb; return sq; },
			or: function __or__(cb){ sq.or_cb = cb; return sq; }
		};

		// trick `seq(..)`s checks for a sequence
		sq[brand] = true;

		// immediately register our fake sequence on the
		// main sequence
		api.seq(sq);

		// provide the "error-first" callback
		return function __errorfirst_callback__(err) {
			if (err) {
				sq.or_cb(err);
			}
			else {
				sq.val_cb.apply(ø,ARRAY_SLICE.call(arguments,1));
			}
		};
	};
});
// "failAfter"
ASQ.extend("failAfter",function __extend__(api,internals){
	return function __failAfter__(num) {
		var args = arguments.length > 1 ?
			ARRAY_SLICE.call(arguments,1) :
			void 0
		;
		num = +num || 0;

		api.then(function __then__(done){
			setTimeout(function __setTimeout__(){
				done.fail.apply(ø,args);
			},num);
		});

		return api;
	};
});

ASQ.failAfter = function ASQ$failAfter() {
	return ASQ().failAfter.apply(ø,arguments);
};
// "first"
ASQ.extend("first",function __extend__(api,internals){
	return function __first__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		function reset() {
			error_messages.length = 0;
		}

		function success(trigger,idx,args) {
			if (!finished) {
				finished = true;

				// first successful segment triggers
				// main sequence to proceed as success
				trigger(
					args.length > 1 ?
					ASQ.messages.apply(ø,args) :
					args[0]
				);

				reset();
			}
		}

		function failure(trigger,idx,args) {
			if (!finished &&
				!(idx in error_messages)
			) {
				completed++;
				error_messages[idx] =
					args.length > 1 ?
					ASQ.messages.apply(ø,args) :
					args[0]
				;

				// all segments complete without success?
				if (completed === fns.length) {
					finished = true;

					// send errors into main sequence
					error_messages.length = fns.length;
					trigger.fail.apply(ø,error_messages);

					reset();
				}
			}
		}

		var completed = 0, error_messages = [], finished = false, fns;

		fns = ARRAY_SLICE.call(arguments);

		wrapGate(api,fns,success,failure,reset);

		return api;
	};
});
// "ASQ.iterable()"
(function IIFE(){
	var template;

	ASQ.iterable = function __iterable__() {
		function throwSequenceErrors() {
			throw (sequence_errors.length === 1 ? sequence_errors[0] : sequence_errors);
		}

		function notifyErrors() {
			var fn;

			seq_tick = null;

			if (seq_error) {
				if (or_queue.length === 0 && !error_reported) {
					error_reported = true;
					throwSequenceErrors();
				}

				while (or_queue.length > 0) {
					error_reported = true;
					fn = or_queue.shift();
					try {
						fn.apply(ø,sequence_errors);
					}
					catch (err) {
						if (checkBranding(err)) {
							sequence_errors = sequence_errors.concat(err);
						}
						else {
							sequence_errors.push(err);
						}
						if (or_queue.length === 0) {
							throwSequenceErrors();
						}
					}
				}
			}
		}

		function val() {
			if (seq_error || seq_aborted ||	arguments.length === 0) {
				return sequence_api;
			}

			val_queue.push.apply(val_queue,arguments);

			return sequence_api;
		}

		function or() {
			if (seq_aborted || arguments.length === 0) {
				return sequence_api;
			}

			or_queue.push.apply(or_queue,arguments);

			if (!seq_tick) {
				seq_tick = schedule(notifyErrors);
			}

			return sequence_api;
		}

		function pipe() {
			if (seq_aborted || arguments.length === 0) {
				return sequence_api;
			}

			ARRAY_SLICE.call(arguments)
			.forEach(function __foreach__(fn){
				val(fn).or(fn.fail);
			});

			return sequence_api;
		}

		function next() {
			if (seq_error || seq_aborted || val_queue.length === 0) {
				if (val_queue.length > 0) {
					$throw$("Sequence cannot be iterated");
				}
				return { done: true };
			}

			try {
				return { value: val_queue.shift().apply(ø,arguments) };
			}
			catch (err) {
				if (ASQ.isMessageWrapper(err)) {
					$throw$.apply(ø,err);
				}
				else {
					$throw$(err);
				}

				return {};
			}
		}

		function $throw$() {
			if (seq_error || seq_aborted) {
				return sequence_api;
			}

			sequence_errors.push.apply(sequence_errors,arguments);
			seq_error = true;
			if (!seq_tick) {
				seq_tick = schedule(notifyErrors);
			}

			return sequence_api;
		}

		function abort() {
			if (seq_error || seq_aborted) {
				return;
			}

			seq_aborted = true;

			clearTimeout(seq_tick);
			seq_tick = null;
			val_queue.length = or_queue.length = sequence_errors.length = 0;
		}

		function duplicate() {
			var isq;

			template = {
				val_queue: val_queue.slice(),
				or_queue: or_queue.slice()
			};
			isq = ASQ.iterable();
			template = null;

			return isq;
		}

		// opt-out of global error reporting for this sequence
		function defer() {
			or_queue.push(function ignored(){});
			return sequence_api;
		}

		// ***********************************************
		// Object branding utilities
		// ***********************************************
		function brandIt(obj) {
			Object.defineProperty(obj,brand,{
				enumerable: false,
				value: true
			});

			return obj;
		}

		var sequence_api,

			seq_error = false,
			error_reported = false,
			seq_aborted = false,

			seq_tick,

			val_queue = [],
			or_queue = [],

			sequence_errors = []
		;

		// ***********************************************
		// Setup the ASQ.iterable() public API
		// ***********************************************
		sequence_api = brandIt({
			val: val,
			then: val,
			or: or,
			pipe: pipe,
			next: next,
			"throw": $throw$,
			abort: abort,
			duplicate: duplicate,
			defer: defer
		});

		// useful for ES6 `for..of` loops,
		// add `@@iterator` to simply hand back
		// our iterable sequence itself!
		sequence_api[(typeof Symbol === "object" && Symbol != null && Symbol.iterator) || "@@iterator"] = function __iter__() {
			return sequence_api;
		};

		// templating the iterable-sequence setup?
		if (template) {
			val_queue = template.val_queue.slice(0);
			or_queue = template.or_queue.slice(0);
		}

		// treat ASQ.iterable() constructor parameters as having been
		// passed to `val()`
		sequence_api.val.apply(ø,arguments);

		return sequence_api;
	};

})();
// "last"
ASQ.extend("last",function __extend__(api,internals){
	return function __last__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		function reset() {
			finished = true;
			error_messages.length = 0;
			success_messages = null;
		}

		function complete(trigger) {
			if (success_messages != null) {
				// last successful segment's message(s) sent
				// to main sequence to proceed as success
				trigger(
					success_messages.length > 1 ?
					ASQ.messages.apply(ø,success_messages) :
					success_messages[0]
				);
			}
			else {
				// send errors into main sequence
				error_messages.length = fns.length;
				trigger.fail.apply(ø,error_messages);
			}

			reset();
		}

		function success(trigger,idx,args) {
			if (!finished) {
				completed++;
				success_messages = args;

				// all segments complete?
				if (completed === fns.length) {
					finished = true;

					complete(trigger);
				}
			}
		}

		function failure(trigger,idx,args) {
			if (!finished &&
				!(idx in error_messages)
			) {
				completed++;
				error_messages[idx] =
					args.length > 1 ?
					ASQ.messages.apply(ø,args) :
					args[0]
				;
			}

			// all segments complete?
			if (!finished &&
				completed === fns.length
			) {
				finished = true;

				complete(trigger);
			}
		}

		var completed = 0, error_messages = [], finished = false, fns,
			success_messages
		;

		fns = ARRAY_SLICE.call(arguments);

		wrapGate(api,fns,success,failure,reset);

		return api;
	};
});
// "map"
ASQ.extend("map",function __extend__(api,internals){
	return function __map__(pArr,pEach) {
		if (internals("seq_error") || internals("seq_aborted")) {
			return api;
		}

		api
		.seq(function __seq__(){
			var tmp, args = ARRAY_SLICE.call(arguments),
				arr = pArr, each = pEach;

			// if missing `map(..)` args, use value-messages (if any)
			if (!each) each = args.shift();
			if (!arr) arr = args.shift();

			// if arg types in reverse order (each,arr), swap
			if (typeof arr === "function" && Array.isArray(each)) {
				tmp = arr;
				arr = each;
				each = tmp;
			}

			return ASQ.apply(ø,args)
			.gate.apply(ø,arr.map(function __map__(item){
				return function __segment__(){
					each.apply(ø,[item].concat(ARRAY_SLICE.call(arguments)));
				};
			}));
		})
		.val(function __val__(){
			// collect all gate segment output into one value-message
			// Note: return a normal array here, not a message wrapper!
			return ARRAY_SLICE.call(arguments);
		});

		return api;
	};
});
// "none"
ASQ.extend("none",function __extend__(api,internals){
	return function __none__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		function reset() {
			finished = true;
			error_messages.length = 0;
			success_messages.length = 0;
		}

		function complete(trigger) {
			if (success_messages.length > 0) {
				// any successful segment's message(s) sent
				// to main sequence to proceed as **error**
				success_messages.length = fns.length;
				trigger.fail.apply(ø,success_messages);
			}
			else {
				// send errors as **success** to main sequence
				error_messages.length = fns.length;
				trigger.apply(ø,error_messages);
			}

			reset();
		}

		function success(trigger,idx,args) {
			if (!finished) {
				completed++;
				success_messages[idx] =
					args.length > 1 ?
					ASQ.messages.apply(ø,args) :
					args[0]
				;

				// all segments complete?
				if (completed === fns.length) {
					finished = true;

					complete(trigger);
				}
			}
		}

		function failure(trigger,idx,args) {
			if (!finished &&
				!(idx in error_messages)
			) {
				completed++;
				error_messages[idx] =
					args.length > 1 ?
					ASQ.messages.apply(ø,args) :
					args[0]
				;
			}

			// all segments complete?
			if (!finished &&
				completed === fns.length
			) {
				finished = true;

				complete(trigger);
			}
		}

		var completed = 0, error_messages = [], finished = false, fns,
			success_messages = []
		;

		fns = ARRAY_SLICE.call(arguments);

		wrapGate(api,fns,success,failure,reset);

		return api;
	};
});
// "pThen"
ASQ.extend("pThen",function __extend__(api,internals){
	return function __pThen__(success,failure) {
		if (internals("seq_aborted")) {
			return api;
		}

		var ignore_success_handler = false, ignore_failure_handler = false;

		if (typeof success === "function") {
			api.then(function __then__(done){
				if (!ignore_success_handler) {
					var ret, msgs = ASQ.messages.apply(ø,arguments);
					msgs.shift();

					if (msgs.length === 1) {
						msgs = msgs[0];
					}

					ignore_failure_handler = true;

					try {
						ret = success(msgs);
					}
					catch (err) {
						if (!ASQ.isMessageWrapper(err)) {
							err = [err];
						}
						done.fail.apply(ø,err);
						return;
					}

					// returned a sequence?
					if (ASQ.isSequence(ret)) {
						ret.pipe(done);
					}
					// returned a message wrapper?
					else if (ASQ.isMessageWrapper(ret)) {
						done.apply(ø,ret);
					}
					// returned a promise/thenable?
					// NOTE: `then` duck-typing of promises is stupid.
					else if (
						(typeof ret === "object" || typeof ret === "function") &&
						typeof ret.then === "function"
					) {
						ret.then(done,done.fail);
					}
					// just a normal value to pass along
					else {
						done(ret);
					}
				}
				else {
					done.apply(ø,ARRAY_SLICE.call(arguments,1));
				}
			});
		}
		if (typeof failure === "function") {
			api.or(function __or__(){
				if (!ignore_failure_handler) {
					var ret, msgs = ASQ.messages.apply(ø,arguments), smgs,
						or_queue = ARRAY_SLICE.call(internals("or_queue"))
					;

					if (msgs.length === 1) {
						msgs = msgs[0];
					}

					ignore_success_handler = true;

					// NOTE: if this call throws, that'll automatically
					// be handled by core as we'd want it to be
					ret = failure(msgs);

					// if we get this far:
					// first, inject return value (if any) as
					// next step's sequence messages
					smgs = internals("sequence_messages");
					smgs.length = 0;
					if (typeof ret !== "undefined") {
						if (!ASQ.isMessageWrapper(ret)) {
							ret = [ret];
						}
						smgs.push.apply(smgs,ret);
					}

					// reset internal error state, because we've exclusively
					// handled any errors up to this point of the sequence
					internals("sequence_errors").length = 0;
					internals("seq_error",false);
					internals("then_ready",true);

					// temporarily empty the or-queue
					internals("or_queue").length = 0;

					// make sure to schedule success-procession on the chain
					api.val(function __val__(){
						// pass thru messages
						return ASQ.messages.apply(ø,arguments);
					});

					// at next cycle, reinstate the or-queue (if any)
					if (or_queue.length > 0) {
						schedule(function __schedule__(){
							api.or.apply(ø,or_queue);
						});
					}
				}
			});
		}
		return api;
	};
});
// "pCatch"
ASQ.extend("pCatch",function __extend__(api,internals){
	return function __pCatch__(failure) {
		if (internals("seq_aborted")) {
			return api;
		}

		api.pThen(void 0,failure);

		return api;
	};
});
// "race"
ASQ.extend("race",function __extend__(api,internals){
	return function __race__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments)
		.map(function __map__(fn){
			var def;
			// tap any directly-provided sequences immediately
			if (ASQ.isSequence(fn)) {
				def = { fn: fn };
				tapSequence(def);
				return function __fn__(done) {
					def.fn.pipe(done);
				};
			}
			else return fn;
		});

		api.then(function __then__(done){
			var args = ARRAY_SLICE.call(arguments);

			fns.forEach(function __forEach__(fn){
				fn.apply(ø,args);
			});
		});

		return api;
	};
});
// "react" (reactive sequences)
ASQ.react = function __react__(setup) {
	var template, teardowns = [];

	function proceed() {
		if (template) {
			var sq = template.duplicate();
			sq.unpause.apply(ø,arguments);
			return sq;
		}
		return ASQ().val(function __val__(){ throw "Disabled Sequence"; });
	}

	proceed.onStream = function onStream() {
		ARRAY_SLICE.call(arguments)
		.forEach(function $forEach$(stream){
			stream.on("data",proceed);
			stream.on("error",proceed);
		});
	};

	proceed.unStream = function unStream() {
		ARRAY_SLICE.call(arguments)
		.forEach(function $forEach$(stream){
			stream.removeListener("data",proceed);
			stream.removeListener("error",proceed);
		});
	};

	function teardown() {
		if (template) {
			template = null;
			teardowns.forEach(function __forEach__(fn){ fn(); });
			teardowns.length = 0;
		}
	}

	function registerTeardown(fn) {
		if (template && typeof fn === "function") {
			teardowns.push(fn);
		}
	}

	// make sure `fn(..)` is called async
	ASQ(function __asq__(){
		setup.call(template,proceed,registerTeardown);
	});

	template = ASQ().duplicate();
	template.stop = teardown;
	return template;
};
// "runner"
ASQ.extend("runner",function __extend__(api,internals){
	return function __runner__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var args = ARRAY_SLICE.call(arguments);

		api
		.then(function __then__(mainDone){

			function wrap(fn){
				var it = fn;

				// function? expected to produces an iterator
				// (like a generator)
				if (typeof fn === "function") {
					// retrieve the iterator, passing in
					// the control token
					it = fn.call(ø,next_val);
				}
				// not an iterable sequence? wrap it.
				else if (!(
					ASQ.isSequence(fn) && "next" in fn
				)) {
					it = ASQ.iterable().val(fn);
				}

				// listen for any sequence failures
				if (ASQ.isSequence(it)) {
					it.or(function __or__(){
						// signal iteration-error
						mainDone.fail.apply(ø,arguments);
					});
				}

				return it;
			}

			function addWrapped() {
				iterators.push.apply(
					iterators,
					ARRAY_SLICE.call(arguments).map(wrap)
				);
			}

			var iterators = args,
				token = {
					messages: ARRAY_SLICE.call(arguments,1),
					add: addWrapped
				},
				iter, ret, next_val = token
			;

			// map co-routines to round-robin list of iterators
			iterators = iterators.map(wrap);

			// async iteration of round-robin list
			(function iterate(){
				var val_type, fn;

				// round-robin: run top co-routine in list
				iter = iterators.shift();

				// process the iteration
				try {
					if (ASQ.isMessageWrapper(next_val) &&
						ASQ.isSequence(iter)
					) {
						ret = iter.next.apply(iter,next_val);
					}
					else {
						ret = iter.next(next_val);
					}
				}
				catch (err) {
					return mainDone.fail(err);
				}

				// was the control token yielded?
				if (ret.value === token) {
					// round-robin: put co-routine back into the list
					// at the end, so that the the next iterator where it was so it can be processed
					// again on next loop-iteration
					iterators.push(iter);
					next_val = token;
					schedule(iterate); // async recurse
				}
				else {
					// not a recognized ASQ instance returned?
					if (!ASQ.isSequence(ret.value)) {
						val_type = typeof ret.value;
						// received a thenable/promise back?
						// NOTE: `then` duck-typing of promises is stupid.
						if (
							ret.value !== null &&
							(
								val_type === "object" ||
								val_type === "function"
							) &&
							typeof ret.value.then === "function"
						) {
							// wrap the promise in a sequence
							ret.value = ASQ().promise(ret.value);
						}
						// thunk yielded?
						else if (val_type === "function") {
							// wrap thunk call in a sequence
							fn = ret.value;
							ret.value = ASQ(function __ASQ__(done){
								fn(done.errfcb);
							});
						}
						// message wrapper returned?
						else if (ASQ.isMessageWrapper(ret.value)) {
							// wrap message(s) in a sequence
							ret.value = ASQ.apply(ø,
								// don't let `apply(..)` discard an empty message
								// wrapper! instead, pass it along as its own value
								// itself.
								ret.value.length > 0 ? ret.value : ASQ.messages(undefined)
							);
						}
						// non-undefined value returned?
						else if (typeof ret.value !== "undefined") {
							// wrap the value in a sequence
							ret.value = ASQ(ret.value);
						}
						else {
							// make an empty sequence
							ret.value = ASQ();
						}
					}

					ret.value
					.val(function __val__(){
						if (arguments.length > 0) {
							// save any return messages for input
							// to next iteration
							next_val = arguments.length > 1 ?
								ASQ.messages.apply(ø,arguments) :
								arguments[0]
							;
						}

						// still more to iterate?
						if (!ret.done) {
							// was the control token passed along?
							if (next_val === token) {
								// round-robin: put co-routine back into the list
								// at the end, so that the the next iterator where it was so it can be processed
								// again on next loop-iteration
								iterators.push(iter);
							}
							else {
								// put co-routine back in where it just
								// was so it can be processed again on
								// next loop-iteration
								iterators.unshift(iter);
							}
						}

						// still have some co-routine runs to process?
						if (iterators.length > 0) {
							iterate(); // async recurse
						}
						// signal done with all co-routine runs
						else if (typeof next_val !== "undefined") {
							if (ASQ.isMessageWrapper(next_val)) {
								mainDone.apply(ø,next_val);
							}
							else {
								mainDone(next_val);
							}
						}
						else {
							mainDone();
						}
					})
					.or(function __or__(){
						try {
							// if an error occurs in the step-continuation
							// promise or sequence, throw it back into the
							// generator or iterable-sequence
							iter["throw"].apply(iter,arguments);
						}
						catch (err) {
							// if an error comes back out of after the throw,
							// pass it out to the main sequence, as iteration
							// must now be complete
							mainDone.fail(err);
						}
					});
				}
			})();
		});

		return api;
	};
});
// "toPromise"
ASQ.extend("toPromise",function __extend__(api,internals){
	return function __toPromise__() {
		return new Promise(function executor(resolve,reject){
			api
			.val(function __val__(){
				var args = ARRAY_SLICE.call(arguments);
				resolve.call(ø,args.length > 1 ? args : args[0]);
				return ASQ.messages.apply(ø,args);
			})
			.or(function __or__(){
				var args = ARRAY_SLICE.call(arguments);
				reject.call(ø,args.length > 1 ? args : args[0]);
			});
		});
	};
});
// "try"
ASQ.extend("try",function __extend__(api,internals){
	return function __try__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments)
		.map(function __map__(fn){
			return function __then__(mainDone) {
				var main_args = ARRAY_SLICE.call(arguments),
					sq = ASQ.apply(ø,main_args.slice(1))
				;

				sq
				.then(function __inner_then__(){
					fn.apply(ø,arguments);
				})
				.val(function __val__(){
					mainDone.apply(ø,arguments);
				})
				.or(function __inner_or__(){
					var msgs = ASQ.messages.apply(ø,arguments);
					// failed, so map error(s) as `catch`
					mainDone({
						"catch": msgs.length > 1 ? msgs : msgs[0]
					});
				});
			};
		});

		api.then.apply(ø,fns);

		return api;
	};
});
// "until"
ASQ.extend("until",function __extend__(api,internals){
	return function __until__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments)
		.map(function __map__(fn){
			return function __then__(mainDone) {
				var main_args = ARRAY_SLICE.call(arguments),
					sq = ASQ.apply(ø,main_args.slice(1))
				;

				sq
				.then(function __inner_then__(){
					var args = ARRAY_SLICE.call(arguments);
					args[0]["break"] = function __break__(){
						mainDone.fail.apply(ø,arguments);
						sq.abort();
					};

					fn.apply(ø,args);
				})
				.val(function __val__(){
					mainDone.apply(ø,arguments);
				})
				.or(function __inner_or__(){
					// failed, retry
					__then__.apply(ø,main_args);
				});
			};
		});

		api.then.apply(ø,fns);

		return api;
	};
});
// "waterfall"
ASQ.extend("waterfall",function __extend__(api,internals){
	return function __waterfall__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var msgs = ASQ.messages();

		ARRAY_SLICE.call(arguments)
		.forEach(function __forEach__(fn){
			api
			.then(fn)
			.val(function __val__(){
				var args = ASQ.messages.apply(ø,arguments);
				msgs.push(args.length > 1 ? args : args[0]);
				return msgs;
			});
		});

		return api;
	};
});
// "wrap"
ASQ.wrap = function __wrap__(fn,opts) {

	function checkThis(t,o) {
		return (!t ||
			(typeof window != "undefined" && t === window) ||
			(typeof global != "undefined" && t === global)
		) ? o : t;
	}

	var errfcb, params_first, act, this_obj;

	opts = (opts && typeof opts == "object") ? opts : {};

	if (
		(opts.errfcb && opts.splitcb) ||
		(opts.errfcb && opts.simplecb) ||
		(opts.splitcb && opts.simplecb) ||
		("errfcb" in opts && !opts.errfcb && !opts.splitcb && !opts.simplecb) ||
		(opts.params_first && opts.params_last)
	) {
		throw Error("Invalid options");
	}

	// initialize default flags
	this_obj = (opts["this"] && typeof opts["this"] == "object") ? opts["this"] : ø;
	errfcb = opts.errfcb || !(opts.splitcb || opts.simplecb);
	params_first = !!opts.params_first ||
		(!opts.params_last && !("params_first" in opts || opts.params_first)) ||
		("params_last" in opts && !opts.params_first && !opts.params_last)
	;

	if (params_first) {
		act = "push";
	}
	else {
		act = "unshift";
	}

	if (opts.gen) {
		return function __wrapped_gen__() {
			return ASQ.apply(ø,arguments).runner(fn);
		};
	}
	if (errfcb) {
		return function __wrapped_errfcb__() {
			var args = ARRAY_SLICE.call(arguments),
				_this = checkThis(this,this_obj)
			;

			return ASQ(function __asq__(done){
				args[act](done.errfcb);
				fn.apply(_this,args);
			});
		};
	}
	if (opts.splitcb) {
		return function __wrapped_splitcb__() {
			var args = ARRAY_SLICE.call(arguments),
				_this = checkThis(this,this_obj)
			;

			return ASQ(function __asq__(done){
				args[act](done,done.fail);
				fn.apply(_this,args);
			});
		};
	}
	if (opts.simplecb) {
		return function __wrapped_simplecb__() {
			var args = ARRAY_SLICE.call(arguments),
				_this = checkThis(this,this_obj)
			;

			return ASQ(function __asq__(done){
				args[act](done);
				fn.apply(_this,args);
			});
		};
	}
};


	// just return `ASQ` itself for convenience sake
	return ASQ;
});
