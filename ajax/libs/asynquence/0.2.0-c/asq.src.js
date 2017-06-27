/*! asynquence
    v0.2.0-c (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(name,context,definition){
	if (typeof module !== "undefined" && module.exports) { module.exports = definition(); }
	else if (typeof define === "function" && define.amd) { define(definition); }
	else { context[name] = definition(name,context); }
})("ASQ",this,function DEF(name,context){
	"use strict";

	var public_api, extensions = {},
		old_public_api = (context || {})[name],
		ARRAY_SLICE = Array.prototype.slice,
		brand = "__ASQ__", ø = Object.create(null)
	;

	function schedule(fn) {
		return (typeof setImmediate !== "undefined") ?
			setImmediate(fn) : setTimeout(fn,0)
		;
	}

	function createSequence() {

		function resetSequence() {
			clearTimeout(seq_tick);
			seq_tick = null;
			then_queue.length = 0;
			or_queue.length = 0;
			sequence_messages.length = 0;
			sequence_errors.length = 0;
		}

		function scheduleSequenceTick() {
			if (seq_aborted) {
				return sequenceTick();
			}

			if (!seq_tick) {
				seq_tick = schedule(sequenceTick);
			}
		}

		function sequenceTick() {
			var fn, args;

			seq_tick = null;

			if (seq_aborted) {
				resetSequence();
			}
			else if (seq_error) {
				while (or_queue.length) {
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
			else if (then_ready && then_queue.length > 0) {
				then_ready = false;
				fn = then_queue.shift();
				args = sequence_messages.slice();
				sequence_messages.length = 0;
				args.unshift(createStepCompletion());

				try {
					fn.apply(ø,args);
				}
				catch (err) {
					if (checkBranding(err)) {
						sequence_errors = sequence_errors.concat(err);
					}
					else {
						sequence_errors.push(err);
					}
					seq_error = true;
					scheduleSequenceTick();
				}
			}
		}

		function createStepCompletion() {
			function done() {
				// ignore this call?
				if (seq_error || seq_aborted || then_ready) {
					return;
				}

				then_ready = true;
				sequence_messages.push.apply(sequence_messages,arguments);
				sequence_errors.length = 0;

				scheduleSequenceTick();
			}

			done.fail = function __step_fail__(){
				// ignore this call?
				if (seq_error || seq_aborted || then_ready) {
					return;
				}

				seq_error = true;
				sequence_messages.length = 0;
				sequence_errors.push.apply(sequence_errors,arguments);

				scheduleSequenceTick();
			};

			done.abort = function __step_abort__(){
				if (seq_error || seq_aborted) {
					return;
				}

				then_ready = false;
				seq_aborted = true;
				sequence_messages.length = 0;
				sequence_errors.length = 0;

				scheduleSequenceTick();
			};

			return done;
		}

		function createGate(stepCompletion,segments,seqMessages) {

			function resetGate() {
				clearTimeout(gate_tick);
				gate_tick = segment_completion =
					segment_messages = segment_error_message = null;
			}

			function scheduleGateTick() {
				if (gate_aborted) {
					return gateTick();
				}

				if (!gate_tick) {
					gate_tick = schedule(gateTick);
				}
			}

			function gateTick() {
				if (seq_error || seq_aborted || gate_completed) {
					return;
				}

				var msgs = [];

				gate_tick = null;

				if (gate_error) {
					stepCompletion.fail.apply(ø,segment_error_message);

					resetGate();
				}
				else if (gate_aborted) {
					stepCompletion.abort();

					resetGate();
				}
				else if (checkGate()) {
					gate_completed = true;

					// collect all the messages from the gate segments
					segment_completion
					.forEach(function __foreach__(sc,i){
						msgs.push(segment_messages["s" + i]);
					});

					stepCompletion.apply(ø,msgs);

					resetGate();
				}
			}

			function checkGate() {
				if (seq_error || seq_aborted || gate_error ||
					gate_aborted || gate_completed ||
					segment_completion.length === 0
				) {
					return;
				}

				var fulfilled = true;

				segment_completion.some(function __some__(segcom){
					if (segcom === null) {
						fulfilled = false;
						return true; // break
					}
				});

				return fulfilled;
			}

			function createSegmentCompletion() {

				function done() {
					// ignore this call?
					if (seq_error || seq_aborted || gate_error ||
						gate_aborted || gate_completed ||
						segment_completion[segment_completion_idx]
					) {
						return;
					}

					// put gate-segment messages into `messages`-branded
					// container
					var args = public_api.messages.apply(ø,arguments);

					segment_messages["s" + segment_completion_idx] =
						args.length > 1 ? args : args[0];
					segment_completion[segment_completion_idx] = true;

					scheduleGateTick();
				}

				var segment_completion_idx = segment_completion.length;

				done.fail = function __segment_fail__(){
					// ignore this call?
					if (seq_error || seq_aborted || gate_error ||
						gate_aborted || gate_completed ||
						segment_completion[segment_completion_idx]
					) {
						return;
					}

					gate_error = true;
					segment_error_message = ARRAY_SLICE.call(arguments);

					scheduleGateTick();
				};

				done.abort = function __segment_abort__(){
					if (seq_error || seq_aborted || gate_error ||
						gate_aborted || gate_completed
					) {
						return;
					}

					gate_aborted = true;

					// abort() is an immediate/synchronous action
					gateTick();
				};

				// placeholder for when a gate-segment completes
				segment_completion[segment_completion_idx] = null;

				return done;
			}

			var gate_error = false,
				gate_aborted = false,
				gate_completed = false,

				args,
				err_msg,

				segment_completion = [],
				segment_messages = {},
				segment_error_message,

				gate_tick
			;

			segments.some(function __some__(seg){
				if (gate_error || gate_aborted) {
					return true; // break
				}

				args = seqMessages.slice();
				args.unshift(createSegmentCompletion());
				try {
					seg.apply(ø,args);
				}
				catch (err) {
					err_msg = err;
					gate_error = true;
					return true; // break
				}
			});

			if (err_msg) {
				if (checkBranding(err_msg)) {
					stepCompletion.fail.apply(ø,err_msg);
				}
				else {
					stepCompletion.fail(err_msg);
				}
			}
		}

		function then() {
			if (seq_error || seq_aborted ||	arguments.length === 0) {
				return sequence_api;
			}

			then_queue.push.apply(
				then_queue,
				wrapValueMessages(arguments,thenWrapper)
			);

			scheduleSequenceTick();

			return sequence_api;
		}

		function or() {
			if (seq_aborted || arguments.length === 0) {
				return sequence_api;
			}

			or_queue.push.apply(or_queue,arguments);

			scheduleSequenceTick();

			return sequence_api;
		}

		function gate() {
			if (seq_error || seq_aborted || arguments.length === 0) {
				return sequence_api;
			}

			var fns = ARRAY_SLICE.call(arguments);

			then(function __then__(done){
				var args = ARRAY_SLICE.call(arguments,1);
				createGate(done,fns,args);
			});

			return sequence_api;
		}

		function pipe() {
			if (seq_aborted || arguments.length === 0) {
				return sequence_api;
			}

			ARRAY_SLICE.call(arguments)
			.forEach(function __foreach__(fn){
				then(function __then__(done){
					fn.apply(ø,ARRAY_SLICE.call(arguments,1));
					done();
				})
				.or(fn.fail);
			});

			return sequence_api;
		}

		function seq() {
			if (seq_error || seq_aborted || arguments.length === 0) {
				return sequence_api;
			}

			ARRAY_SLICE.call(arguments)
			.forEach(function __foreach__(fn){
				then(function __then__(done){
					// check if this argument is not already an ASQ instance?
					// if not, assume a function to invoke that will return
					// an ASQ instance
					if (!checkBranding(fn)) {
						fn = fn.apply(ø,ARRAY_SLICE.call(arguments,1));
					}
					// now, pipe the ASQ instance into our current sequence
					fn.pipe(done);
				});
			});

			return sequence_api;
		}

		function val() {
			if (seq_error || seq_aborted || arguments.length === 0) {
				return sequence_api;
			}

			ARRAY_SLICE.call(
				wrapValueMessages(arguments,valWrapper)
			)
			.forEach(function __foreach__(fn){
				then(function __then__(done){
					var msgs = fn.apply(ø,ARRAY_SLICE.call(arguments,1));
					if (!checkBranding(msgs)) {
						msgs = public_api.messages(msgs);
					}
					done.apply(ø,msgs);
				});
			});

			return sequence_api;
		}

		function abort() {
			if (seq_error) {
				return sequence_api;
			}

			seq_aborted = true;

			sequenceTick();

			return sequence_api;
		}

		function internals(name,value) {
			var set = (arguments.length > 1);
			switch (name) {
				case "seq_error":
					if (set) { seq_error = value; }
					else { return seq_error; }
					break;
				case "seq_aborted":
					if (set) { seq_aborted = value; }
					else { return seq_aborted; }
					break;
				case "then_ready":
					if (set) { then_ready = value; }
					else { return then_ready; }
					break;
				case "then_queue":
					return then_queue;
				case "or_queue":
					return or_queue;
				case "sequence_messages":
					return sequence_messages;
				case "sequence_errors":
					return sequence_errors;
			}
		}

		function includeExtensions() {
			Object.keys(extensions)
			.forEach(function __foreach__(name){
				sequence_api[name] =
					extensions[name](sequence_api,internals);
			});
		}

		var seq_error = false,
			seq_aborted = false,
			then_ready = true,

			then_queue = [],
			or_queue = [],

			sequence_messages = [],
			sequence_errors = [],

			seq_tick,

			// brand the sequence API so we can detect ASQ instances
			sequence_api = brandIt({
				then: then,
				or: or,
				gate: gate,
				pipe: pipe,
				seq: seq,
				val: val,
				abort: abort
			})
		;

		// include extensions, if any
		includeExtensions();

		// treat ASQ() constructor parameters as having been
		// passed to `then()`
		sequence_api.then.apply(ø,
			wrapValueMessages(arguments,thenWrapper)
		);

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

	function checkBranding(val) {
		return val != null && typeof val === "object" && val[brand];
	}


	// ***********************************************
	// Value messages utilities
	// ***********************************************
	function preboundArgs(numArgs,args) {
		return ARRAY_SLICE.call(args).slice(1,numArgs+1);
	}

	// wrapper helpers
	function valWrapper(numArgs) {
		// `numArgs` indicates how many pre-bound arguments
		// will be sent in.
		return public_api.messages.apply(ø,
			// pass along only the pre-bound arguments
			preboundArgs(numArgs,arguments)
		);
	}

	function thenWrapper(numArgs) {
		// Because of bind() partial-application, will
		// receive pre-bound arguments before the `done()`,
		// rather than it being first as usual.
		// `numArgs` indicates how many pre-bound arguments
		// will be sent in.
		arguments[numArgs+1] // the `done()`
		.apply(ø,
			// pass along only the pre-bound arguments
			preboundArgs(numArgs,arguments)
		);
	}

	function wrapValueMessages(args,wrapper) {
		var i, j;
		args = ARRAY_SLICE.call(args);
		for (i=0; i<args.length; i++) {
			if (Array.isArray(args[i]) && checkBranding(args[i])) {
				args[i] = wrapper.bind.apply(wrapper,
					// partial-application of arguments
					[/*this=*/null,/*numArgs=*/args[i].length]
					.concat(
						// pre-bound arguments
						args[i]
					)
				);
			}
			else if (typeof args[i] !== "function") {
				for (j=i+1; j<args.length; j++) {
					if (typeof args[j] === "function" ||
						checkBranding(args[j])
					) {
						break;
					}
				}
				args.splice(
					/*start=*/i,
					/*howMany=*/j-i,
					/*replace=*/wrapper.bind.apply(wrapper,
						// partial-application of arguments
						[/*this=*/null,/*numArgs=*/(j-i)]
						.concat(
							// pre-bound arguments
							args.slice(i,j)
						)
					)
				);
			}
		}
		return args;
	}


	// ***********************************************
	// Setup the ASQ public API
	// ***********************************************
	public_api = createSequence;

	public_api.extend = function __extend__(name,build) {
		// reserved API override not allowed
		if (!~["then","or","gate","pipe","seq","val","abort"]
			.indexOf(name)
		) {
			extensions[name] = build;
		}

		return public_api;
	};

	public_api.messages = function __messages__() {
		var ret = ARRAY_SLICE.call(arguments);
		// brand the message wrapper so we can detect
		brandIt(ret);
		return ret;
	};

	public_api.isMessageWrapper = public_api.isSequence =
		checkBranding;

	public_api.noConflict = function __noconflict__() {
		if (context) {
			context[name] = old_public_api;
		}
		return public_api;
	};

	return public_api;
});
