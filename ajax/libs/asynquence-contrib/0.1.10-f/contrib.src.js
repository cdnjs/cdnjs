/*! asynquence-contrib
    v0.1.10-f (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(dependency,definition){
	if (typeof module !== "undefined" && module.exports) { module.exports = definition(require(dependency)); }
	else if (typeof define === "function" && define.amd) { define([dependency],definition); }
	else { definition(dependency); }
})(this.ASQ || "asynquence",function DEF(ASQ){
	"use strict";

	var ARRAY_SLICE = Array.prototype.slice,
		ø = Object.create(null)
	;

// "all"
ASQ.extend("all",function __extend__(api){
	return api.gate;
});
// "any"
ASQ.extend("any",function __extend__(api,internals){
	return function __any__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments);

		api.then(function __then__(mainDone){
			function checkGate() {
				var msgs;

				if (completed === fns.length) {
					msgs = [];

					if (success) {
						fns
						.forEach(function __foreach__(fn,i){
							msgs.push(success_messages["s" + i]);
						});

						// completed gate with at least one
						// successful segment, so send success
						// messages into main sequence
						mainDone.apply(ø,msgs);
					}
					else {
						fns
						.forEach(function __foreach__(fn,i){
							msgs.push(error_messages["s" + i]);
						});
						// completed gate without success, so
						// send errors into main sequence
						mainDone.fail.apply(ø,msgs);
					}
				}
			}

			var success = false, completed = 0,
				success_messages = {}, error_messages = {},
				sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1))
			;

			fns = fns.map(function __map__(fn,idx){
				return function __segment__(done) {
					var args = ARRAY_SLICE.call(arguments);
					args[0] = function __done__() {
						success = true;
						completed++;
						success_messages["s" + idx] =
							arguments.length > 1 ?
							ASQ.messages.apply(ø,arguments) :
							arguments[0]
						;
						checkGate();
					};
					args[0].fail = function __fail__() {
						completed++;
						error_messages["s" + idx] =
							arguments.length > 1 ?
							ASQ.messages.apply(ø,arguments) :
							arguments[0]
						;
						checkGate();
					};
					args[0].abort = function __abort__() {
						if (!success) {
							done.abort();
							mainDone.abort();
						}
					};

					fn.apply(ø,args);
				};
			});

			sq.gate.apply(ø,fns);
		});

		return api;
	};
});
// "errfcb"
ASQ.extend("errfcb",function __extend__(api,internals){
	return function __errfcb__() {
		// create a fake "iterable-sequence" only to be used
		// by the main sequence's `seq(..)`
		var isq = {
			then: function __then__(cb){ isq.then_cb = cb; return isq; },
			or: function __or__(cb){ isq.or_cb = cb; return isq; },

			// note: these are used only to trick `seq(..)`s
			// duck-typing checks for an "iterable-sequence"
			__ASQ__: true,
			next: true
		};

		// immediately register our fake "iterable sequence"
		// on the main sequence
		api.seq(isq);

		// provide the "error-first" callback
		return function __errorfirst_callback__(err) {
			if (err) {
				isq.or_cb(err);
			}
			else {
				isq.then_cb.apply(ø,ARRAY_SLICE.call(arguments,1));
			}
		};
	};
});
// "first"
ASQ.extend("first",function __extend__(api,internals){
	return function __first__() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments);

		api.then(function __then__(mainDone){
			var completed = 0, error_messages = {}, success = false,
				sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1))
			;

			fns = fns.map(function __map__(fn,idx){
				return function __segment__(done) {
					var args = ARRAY_SLICE.call(arguments);
					args[0] = function __done__() {
						if (!success) {
							success = true;
							completed++;

							// first successful segment triggers
							// main sequence to proceed as success
							mainDone(
								arguments.length > 1 ?
								ASQ.messages.apply(ø,arguments) :
								arguments[0]
							);

							// no longer need the inner gate
							sq.abort();
						}
					};
					args[0].fail = function __fail__() {
						var msgs = [];

						completed++;
						error_messages["s" + idx] =
							arguments.length > 1 ?
							ASQ.messages.apply(ø,arguments) :
							arguments[0]
						;

						// all segments complete without success?
						if (!success && completed === fns.length) {
							fns
							.forEach(function __foreach__(fn,i){
								msgs.push(error_messages["s" + i]);
							});

							// send errors into main sequence
							mainDone.fail.apply(ø,msgs);
						}
					};
					args[0].abort = function __abort__() {
						if (!success) {
							done.abort();
							mainDone.abort();
						}
					};

					fn.apply(ø,args);
				};
			});

			sq.gate.apply(ø,fns);
		});

		return api;
	};
});
// "ASQ.iterable()"
(function(){
	var template;

	ASQ.iterable = function __iterable__() {
		var sequence_api,
			brand = "__ASQ__",

			seq_error = false,
			seq_aborted = false,

			seq_tick,

			val_queue = [],
			or_queue = [],

			sequence_errors = []
		;

		function schedule(fn) {
			return (typeof setImmediate !== "undefined") ?
				setImmediate(fn) : setTimeout(fn,0)
			;
		}

		function notifyErrors() {
			var fn;

			seq_tick = null;

			if (sequence_errors.length > 0) {
				while (or_queue.length > 0) {
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
							if (err.stack) { sequence_errors.push(err.stack); }
						}
						if (or_queue.length === 0) {
							console.error.apply(console,sequence_errors);
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
					throwErr("Sequence cannot be iterated");
				}
				return { done: true };
			}

			try {
				return { value: val_queue.shift().apply(ø,arguments) };
			}
			catch (err) {
				if (ASQ.isMessageWrapper(err)) {
					throwErr.apply(ø,err);
				}
				else if (err.stack) {
					throwErr(err,err.stack);
				}
				else {
					throwErr(err);
				}

				return {};
			}
		}

		function throwErr() {
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
			val_queue.length = 0;
			or_queue.length = 0;
			sequence_errors.length = 0;
		}

		function duplicate() {
			var isq;

			template = {
				val_queue: val_queue.slice(0),
				or_queue: or_queue.slice(0)
			};
			isq = ASQ.iterable();
			template = null;

			return isq;
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


		// ***********************************************
		// Setup the ASQ.iterable() public API
		// ***********************************************
		sequence_api = brandIt({
			val: val,
			then: val,
			or: or,
			pipe: pipe,
			next: next,
			"throw": throwErr,
			abort: abort,
			duplicate: duplicate
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

		var fns = ARRAY_SLICE.call(arguments);

		api.then(function __then__(mainDone){
			function checkGate() {
				var msgs;

				if (completed === fns.length) {
					msgs = [];

					if (success) {
						// completed gate with at least one
						// successful segment, so send success
						// message(s) (only from latest successful
						// segment) into main sequence
						mainDone(success_messages);
					}
					else {
						fns
						.forEach(function __foreach__(fn,i){
							msgs.push(error_messages["s" + i]);
						});
						// completed gate without success, so
						// send errors into main sequence
						mainDone.fail.apply(ø,msgs);
					}
				}
			}

			var success = false, completed = 0,
				success_messages = {}, error_messages = {},
				sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1))
			;

			fns = fns.map(function __map__(fn,idx){
				return function __segment__(done) {
					var args = ARRAY_SLICE.call(arguments);
					args[0] = function __done__() {
						success = true;
						completed++;
						success_messages =
							arguments.length > 1 ?
							ASQ.messages.apply(ø,arguments) :
							arguments[0]
						;
						checkGate();
					};
					args[0].fail = function __fail__() {
						completed++;
						error_messages["s" + idx] =
							arguments.length > 1 ?
							ASQ.messages.apply(ø,arguments) :
							arguments[0]
						;
						checkGate();
					};
					args[0].abort = function __abort__() {
						if (!success) {
							done.abort();
							mainDone.abort();
						}
					};

					fn.apply(ø,args);
				};
			});

			sq.gate.apply(ø,fns);
		});

		return api;
	};
});
// "map"
ASQ.extend("map",function __extend__(api,internals){
	return function __map__(arr,each) {
		if (internals("seq_error") || internals("seq_aborted")) {
			return api;
		}

		api
		.seq(function(){
			var tmp, args = ARRAY_SLICE.call(arguments);

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
		.val(function(){
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

		var fns = ARRAY_SLICE.call(arguments);

		api.then(function __then__(mainDone){
			function checkGate() {
				var msgs;

				if (completed === fns.length) {
					msgs = [];

					if (success) {
						fns
						.forEach(function __foreach__(fn,i){
							msgs.push(success_messages["s" + i]);
						});

						// completed gate with at least one
						// successful segment, so send success
						// messages into main sequence as failures
						mainDone.fail.apply(ø,msgs);
					}
					else {
						fns
						.forEach(function __foreach__(fn,i){
							msgs.push(error_messages["s" + i]);
						});
						// completed gate without success, so
						// send errors into main sequence as
						// success
						mainDone.apply(ø,msgs);
					}
				}
			}

			var success = false, completed = 0,
				success_messages = {}, error_messages = {},
				sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1))
			;

			fns = fns.map(function __map__(fn,idx){
				return function __segment__(done) {
					var args = ARRAY_SLICE.call(arguments);
					args[0] = function __done__() {
						success = true;
						completed++;
						success_messages["s" + idx] =
							arguments.length > 1 ?
							ASQ.messages.apply(ø,arguments) :
							arguments[0]
						;
						checkGate();
					};
					args[0].fail = function __fail__() {
						completed++;
						error_messages["s" + idx] =
							arguments.length > 1 ?
							ASQ.messages.apply(ø,arguments) :
							arguments[0]
						;
						checkGate();
					};
					args[0].abort = function __abort__() {
						if (!success) {
							done.abort();
							mainDone.abort();
						}
					};

					fn.apply(ø,args);
				};
			});

			sq.gate.apply(ø,fns);
		});

		return api;
	};
});
// "react" (reactive sequences)
ASQ.react = function __react__(fn) {
	var brand = "__ASQ__", template;

	function proceed() {
		var sq = template.duplicate();
		sq.unpause.apply(ø,arguments);
		return sq;
	}

	// make sure `fn(..)` is called async
	ASQ(function __asq__(){
		fn(proceed);
	});

	template = ASQ().duplicate();
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

		var co_runs = ARRAY_SLICE.call(arguments);

		api
		.then(function __then__(mainDone){
			var msgs = ARRAY_SLICE.call(arguments,1), msgs2;
			var run, ret;

			// map co-routines to round-robin list of iterators
			co_runs = co_runs.map(function(fn){
				var it = fn;

				// generator function?
				if (typeof fn === "function" &&
					fn.constructor &&
					fn.constructor.name === "GeneratorFunction"
				) {
					// initialize the generator (passing in
					// value-messages, if any)
					it = fn.apply(ø,msgs);
					msgs = [];
				}
				// not an iterable sequence? wrap it.
				else if (!(
					ASQ.isSequence(fn) && "next" in fn
				)) {
					msgs2 = msgs.slice();
					msgs = [];
					it = ASQ.iterable()
					.val(function(){
						return fn.apply(ø,msgs2);
					});
				}

				// listen for any sequence failures
				if (ASQ.isSequence(it)) {
					it.or(function(){
						// signal iteration-error
						mainDone.fail.apply(ø,arguments);
					});
				}

				return it;
			});

			// async iteration of round-robin list
			(function iterate(){
				// round-robin: run top co-routine in list
				run = co_runs.shift();

				// process the iteration
				try {
					ret = run.next.apply(run,msgs);
				}
				catch (err) {
					return mainDone.fail(err);
				}

				// not a recognized ASQ instance returned?
				if (!ASQ.isSequence(ret.value)) {
					// received a standard promise-thennable back?
					// wrap it in a sequence.
					// NOTE: `then` duck-typing of promises is stupid.
					if (
						ret.value !== null &&
						(
							typeof ret.value === "object" ||
							typeof ret.value === "function"
						) &&
						"then" in ret.value
					) {
						ret.value = ASQ().promise(ret.value);
					}
					// otherwise, assume immediate value received, so
					// wrap it in a sequence.
					else {
						ret.value = ASQ.apply(ø,(typeof ret.value !== "undefined") ? [ret.value] : []);
					}
				}

				ret.value
				.val(function(){
					if (arguments.length > 0) {
						// save any return messages for input
						// to next iteration
						msgs = ARRAY_SLICE.call(arguments);
					}

					// still more to iterate?
					if (!ret.done) {
						// round-robin: insert co-routine back
						// in at end of list
						co_runs.push(run);
					}

					// still have some co-routine runs to process?
					if (co_runs.length > 0) {
						iterate();
					}
					// signal done with all co-routine runs
					else {
						// note: use most recent `msgs` value now that
						// iteration is complete
						mainDone.apply(ø,msgs);
					}
				})
				.or(function(){
					// if an error occurs in the step-continuation
					// promise or sequence, throw it back into the
					// generator or iterable-sequence
					run["throw"].apply(ø,arguments);
				});
			})();
		});

		return api;
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


	// this is an empty module with no API
	return {};
});
