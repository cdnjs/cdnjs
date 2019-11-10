/*! asynquence
    v0.1.0 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function(name,context,definition){
	if (typeof module !== "undefined" && module.exports) module.exports = definition();
	else if (typeof define === "function" && define.amd) define(definition);
	else context[name] = definition(name,context);
})("ASQ",this,function(name,context){

	var public_api,
		old_public_api = (context || {})[name],
		ARRAY_SLICE = Array.prototype.slice
	;

	function schedule(fn) {
		return (typeof setImmediate !== "undefined") ? setImmediate(fn) : setTimeout(fn,0);
	}

	function createSandbox() {

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
				if (seq_aborted) return sequenceTick();

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
							fn.apply(fn,sequence_errors);
						}
						catch (err) {
							sequence_errors.push(err);
							if (err.stack) sequence_errors.push(err.stack);
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
						fn.apply(fn,args);
					}
					catch (err) {
						sequence_errors.push(err);
						seq_error = true;
						scheduleSequenceTick();
					}
				}
			}

			function createStepCompletion() {
				function done() {
					// ignore this call?
					if (seq_error || seq_aborted || then_ready) return;

					then_ready = true;
					sequence_messages.push.apply(sequence_messages,arguments);
					sequence_errors.length = 0;

					scheduleSequenceTick();
				}

				done.fail = function(){
					// ignore this call?
					if (seq_error || seq_aborted || then_ready) return;

					seq_error = true;
					sequence_messages.length = 0;
					sequence_errors.push.apply(sequence_errors,arguments);

					scheduleSequenceTick();
				};

				done.abort = function(){
					if (seq_error || seq_aborted) return;

					then_ready = false;
					seq_aborted = true;
					sequence_messages.length = 0;
					sequence_errors.length = 0;

					scheduleSequenceTick();
				};

				return done;
			}

			function createGate(stepCompletion,segments) {

				function resetGate() {
					clearTimeout(gate_tick);
					gate_tick = segment_completion = segment_messages = segment_error_message = null;
				}

				function scheduleGateTick() {
					if (gate_aborted) return gateTick();

					if (!gate_tick) {
						gate_tick = schedule(gateTick);
					}
				}

				function gateTick() {
					if (seq_error || seq_aborted || gate_completed) return;

					var i, args = [];

					gate_tick = null;

					if (gate_error) {
						stepCompletion.fail.apply(stepCompletion,segment_error_message);

						resetGate();
					}
					else if (gate_aborted) {
						stepCompletion.abort();

						resetGate();
					}
					else if (checkGate()) {
						gate_completed = true;

						// collect all the messages from the gate segments
						for (i=0; i<segment_completion.length; i++) {
							args.push(segment_messages["m" + i]);
						}

						stepCompletion.apply(stepCompletion,args);

						resetGate();
					}
				}

				function checkGate() {
					if (seq_error || seq_aborted || gate_error || gate_aborted || gate_completed || segment_completion.length === 0) return;

					var i, fulfilled = true;

					for (i=0; i<segment_completion.length; i++) {
						if (segment_completion[i] === null) {
							fulfilled = false;
							break;
						}
					}

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

						var args = ARRAY_SLICE.call(arguments);

						segment_messages["m" + segment_completion_idx] = args.length > 1 ? args : args[0];
						segment_completion[segment_completion_idx] = true;

						scheduleGateTick();
					}

					var segment_completion_idx = segment_completion.length;

					done.fail = function(){
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

					done.abort = function(){
						if (seq_error || seq_aborted || gate_error || gate_aborted || gate_completed) return;

						gate_aborted = true;

						gateTick(); // abort() is an immediate/synchronous action
					};

					// placeholder for when a gate-segment completes
					segment_completion[segment_completion_idx] = null;

					return done;
				}

				var gate_error = false,
					gate_aborted = false,
					gate_completed = false,

					i,
					args,
					err_msg,

					segment_completion = [],
					segment_messages = {},
					segment_error_message,

					gate_tick
				;

				for (i=0; i<segments.length; i++) {
					if (gate_error || gate_aborted) break;

					args = sequence_messages.slice();
					args.unshift(createSegmentCompletion());
					try {
						segments[i].apply(segments[i],args);
					}
					catch (err) {
						err_msg = err;
						gate_error = true;
						break;
					}
				}

				if (err_msg) {
					stepCompletion.fail(err_msg);
				}
			}

			function then() {
				if (seq_error || seq_aborted) return sequence_api;

				if (arguments.length > 0) {
					then_queue.push.apply(then_queue,arguments);
				}

				scheduleSequenceTick();

				return sequence_api;
			}

			function or() {
				if (seq_aborted) return sequence_api;

				or_queue.push.apply(or_queue,arguments);

				scheduleSequenceTick();

				return sequence_api;
			}

			function gate() {
				if (seq_error || seq_aborted || arguments.length === 0) return sequence_api;

				var args = ARRAY_SLICE.apply(arguments);

				then(function(done){
					createGate(done,args);
				});

				return sequence_api;
			}

			function pipe() {
				if (seq_error || seq_aborted || arguments.length === 0) return sequence_api;

				var i, fns = ARRAY_SLICE.call(arguments);

				for (i=0; i<fns.length; i++) {
					(function(fn){
						then(function(done){
							var args = ARRAY_SLICE.call(arguments,1);
							fn.apply(fn,args);
							done();
						})
						.or(fn.fail);
					})(fns[i]);
				}

				return sequence_api;
			}

			function seq() {
				if (seq_error || seq_aborted || arguments.length === 0) return sequence_api;

				var i, fns = ARRAY_SLICE.call(arguments);

				for (i=0; i<fns.length; i++) {
					(function(fn){
						then(function(done){
							var args = ARRAY_SLICE.call(arguments,1);
							fn.apply(fn,args)
							.pipe(done);
						});
					})(fns[i]);
				}

				return sequence_api;
			}

			function val() {
				if (seq_error || seq_aborted || arguments.length === 0) return sequence_api;

				var i, fns = ARRAY_SLICE.call(arguments);

				for (i=0; i<fns.length; i++) {
					(function(fn){
						then(function(done){
							var args = ARRAY_SLICE.call(arguments,1);
							done(fn.apply(fn,args));
						});
					})(fns[i]);
				}

				return sequence_api;
			}

			function abort() {
				if (seq_error) return sequence_api;

				seq_aborted = true;

				sequenceTick();

				return sequence_api;
			}


			var seq_error = false,
				seq_aborted = false,
				then_ready = true,

				then_queue = [],
				or_queue = [],

				sequence_messages = [],
				sequence_errors = [],

				seq_tick,

				sequence_api = {
					then: then,
					or: or,
					gate: gate,
					pipe: pipe,
					seq: seq,
					val: val,
					abort: abort
				}
			;

			// treat constructor parameters as having been passed to `then()`
			if (arguments.length > 0) {
				sequence_api.then.apply(sequence_api,arguments);
			}

			return sequence_api;
		}

		return createSequence;
	}

	public_api = createSandbox();

	public_api.noConflict = function() {
		if (context) {
			context[name] = old_public_api;
		}
		return public_api;
	};

	return public_api;
});
