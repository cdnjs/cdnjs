/*! asynquence-contrib
    v0.11.0 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(dependency,definition){
	if (typeof module !== "undefined" && module.exports) {
		// make dependency injection wrapper first
		module.exports = function $$inject$dependency(dep) {
			// only try to `require(..)` if dependency is a string module path
			if (typeof dep == "string") {
				try { dep = require(dep); }
				catch (err) {
					// dependency not yet fulfilled, so just return
					// dependency injection wrapper again
					return $$inject$dependency;
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
		fns = fns.map(function $$map(v,idx){
			var def;
			// tap any directly-provided sequences immediately
			if (ASQ.isSequence(v)) {
				def = { seq: v };
				tapSequence(def);
				return function $$fn(next) {
					def.seq.val(function $$val(){
						success(next,idx,ARRAY_SLICE.call(arguments));
					})
					.or(function $$or(){
						failure(next,idx,ARRAY_SLICE.call(arguments));
					});
				};
			}
			else {
				return function $$fn(next) {
					var args = ARRAY_SLICE.call(arguments);
					args[0] = function $$next() {
						success(next,idx,ARRAY_SLICE.call(arguments));
					};
					args[0].fail = function $$fail() {
						failure(next,idx,ARRAY_SLICE.call(arguments));
					};
					args[0].abort = function $$abort() {
						reset();
					};
					args[0].errfcb = function $$errfcb(err) {
						if (err) {
							failure(next,idx,[err]);
						}
						else {
							success(next,idx,ARRAY_SLICE.call(arguments,1));
						}
					};

					v.apply(ø,args);
				};
			}
		});

		api.then(function $$then(){
			var args = ARRAY_SLICE.call(arguments);

			fns.forEach(function $$each(fn){
				fn.apply(ø,args);
			});
		});
	}

// "after"
ASQ.extend("after",function $$extend(api,internals){
	return function $$after(num) {
		var orig_args = arguments.length > 1 ?
			ARRAY_SLICE.call(arguments,1) :
			void 0
		;
		num = +num || 0;

		api.then(function $$then(done){
			var args = orig_args || ARRAY_SLICE.call(arguments,1);

			setTimeout(function $$set$timeout(){
				done.apply(ø,args);
			},num);
		});

		return api;
	};
});

ASQ.after = function $$after() {
	return ASQ().after.apply(ø,arguments);
};
// "any"
ASQ.extend("any",function $$extend(api,internals){
	return function $$any() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments);

		api.then(function $$then(done){
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

			var completed = 0, error_messages = [], finished = false,
				success_messages = [],
				sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1))
			;

			wrapGate(sq,fns,success,failure,reset);

			sq.pipe(done);
		});

		return api;
	};
});
// "errfcb"
ASQ.extend("errfcb",function $$extend(api,internals){
	return function $$errfcb() {
		// create a fake sequence to extract the callbacks
		var sq = {
			val: function $$then(cb){ sq.val_cb = cb; return sq; },
			or: function $$or(cb){ sq.or_cb = cb; return sq; }
		};

		// trick `seq(..)`s checks for a sequence
		sq[brand] = true;

		// immediately register our fake sequence on the
		// main sequence
		api.seq(sq);

		// provide the "error-first" callback
		return function $$errorfirst$callback(err) {
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
ASQ.extend("failAfter",function $$extend(api,internals){
	return function $$failAfter(num) {
		var args = arguments.length > 1 ?
			ARRAY_SLICE.call(arguments,1) :
			void 0
		;
		num = +num || 0;

		api.then(function $$then(done){
			setTimeout(function $$set$timeout(){
				done.fail.apply(ø,args);
			},num);
		});

		return api;
	};
});

ASQ.failAfter = function $$fail$after() {
	return ASQ().failAfter.apply(ø,arguments);
};
// "first"
ASQ.extend("first",function $$extend(api,internals){
	return function $$first() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments);

		api.then(function $$then(done){
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

			var completed = 0, error_messages = [], finished = false,
				sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1))
			;

			wrapGate(sq,fns,success,failure,reset);

			sq.pipe(done);
		});

		return api;
	};
});
// "go-style CSP"
(function IIFE(){

	// filter out already-resolved queue entries
	function filterResolved(queue) {
		return queue.filter(function $$filter(entry){
			return !entry.resolved;
		});
	}

	function closeQueue(queue,finalValue) {
		queue.forEach(function $$each(iter){
			if (!iter.resolved) {
				iter.next();
				iter.next(finalValue);
			}
		});
		queue.length = 0;
	}

	function channel(bufSize) {
		var ch = {
			close: function $$close(){
				ch.closed = true;
				closeQueue(ch.put_queue,false);
				closeQueue(ch.take_queue,ASQ.csp.CLOSED);
			},
			closed: false,
			messages: [],
			put_queue: [],
			take_queue: [],
			buffer_size: +bufSize || 0
		};
		return ch;
	}

	function unblock(iter) {
		if (iter && !iter.resolved) {
			iter.next(iter.next().value);
		}
	}

	function put(channel,value) {
		var ret;

		if (channel.closed) {
			return false;
		}

		// remove already-resolved entries
		channel.put_queue = filterResolved(channel.put_queue);
		channel.take_queue = filterResolved(channel.take_queue);

		// immediate put?
		if (channel.messages.length < channel.buffer_size) {
			channel.messages.push(value);
			unblock(channel.take_queue.shift());
			return true;
		}
		// queued put
		else {
			channel.put_queue.push(
				// make a notifiable iterable for 'put' blocking
				ASQ.iterable()
				.then(function $$then(){
					if (!channel.closed) {
						channel.messages.push(value);
						return true;
					}
					else {
						return false;
					}
				})
			);

			// wrap a sequence/promise around the iterable
			ret = ASQ(
				channel.put_queue[channel.put_queue.length - 1]
			);

			// take waiting on this queued put?
			if (channel.take_queue.length > 0) {
				unblock(channel.put_queue.shift());
				unblock(channel.take_queue.shift());
			}

			return ret;
		}
	}

	function putAsync(channel,value,cb) {
		var ret = ASQ(put(channel,value));

		if (cb && typeof cb == "function") {
			ret.val(cb);
		}
		else {
			return ret;
		}
	}

	function take(channel) {
		var ret;

		try {
			ret = takem(channel);
		}
		catch (err) {
			ret = err;
		}

		if (ASQ.isSequence(ret)) {
			ret.pCatch(function $$pcatch(err){
				return err;
			});
		}

		return ret;
	}

	function takeAsync(channel,cb) {
		var ret = ASQ(take(channel));

		if (cb && typeof cb == "function") {
			ret.val(cb);
		}
		else {
			return ret;
		}
	}

	function takem(channel) {
		var msg;

		if (channel.closed) {
			return ASQ.csp.CLOSED;
		}

		// remove already-resolved entries
		channel.put_queue = filterResolved(channel.put_queue);
		channel.take_queue = filterResolved(channel.take_queue);

		// immediate take?
		if (channel.messages.length > 0) {
			msg = channel.messages.shift();
			unblock(channel.put_queue.shift());
			if (msg instanceof Error) {
				throw msg;
			}
			return msg;
		}
		// queued take
		else {
			channel.take_queue.push(
				// make a notifiable iterable for 'take' blocking
				ASQ.iterable()
				.then(function $$then(){
					if (!channel.closed) {
						var v = channel.messages.shift();
						if (v instanceof Error) {
							throw v;
						}
						return v;
					}
					else {
						return ASQ.csp.CLOSED;
					}
				})
			);

			// wrap a sequence/promise around the iterable
			msg = ASQ(
				channel.take_queue[channel.take_queue.length - 1]
			);

			// put waiting on this take?
			if (channel.put_queue.length > 0) {
				unblock(channel.put_queue.shift());
				unblock(channel.take_queue.shift());
			}

			return msg;
		}
	}

	function takemAsync(channel,cb) {
		var ret = ASQ(takem(channel));

		if (cb && typeof cb == "function") {
			ret.pThen(cb,cb);
		}
		else {
			return ret.val(function $$val(v){
				if (v instanceof Error) {
					throw v;
				}
				return v;
			});
		}
	}

	function alts(actions) {
		var closed, open, handlers, i, isq, ret, resolved = false;

		// used `alts(..)` incorrectly?
		if (!Array.isArray(actions) || actions.length == 0) {
			throw Error("Invalid usage");
		}

		closed = [];
		open = [];
		handlers = [];

		// separate actions by open/closed channel status
		actions.forEach(function $$each(action){
			var channel = Array.isArray(action) ? action[0] : action;

			// remove already-resolved entries
			channel.put_queue = filterResolved(channel.put_queue);
			channel.take_queue = filterResolved(channel.take_queue);

			if (channel.closed) {
				closed.push(channel);
			}
			else {
				open.push(action);
			}
		});

		// if no channels are still open, we're done
		if (open.length == 0) {
			return { value: ASQ.csp.CLOSED, channel: closed };
		}

		// can any channel action be executed immediately?
		for (i=0; i<open.length; i++) {
			// put action
			if (Array.isArray(open[i])) {
				// immediate put?
				if (open[i][0].messages.length < open[i][0].buffer_size) {
					return { value: put(open[i][0],open[i][1]), channel: open[i][0] };
				}
			}
			// immediate take?
			else if (open[i].messages.length > 0) {
				return { value: take(open[i]), channel: open[i] };
			}
		}

		isq = ASQ.iterable();
		var ret = ASQ(isq);

		// setup channel action handlers
		for (i=0; i<open.length; i++) {
			(function iteration(action,channel,value){
				// put action?
				if (Array.isArray(action)) {
					channel = action[0];
					value = action[1];

					// define put handler
					handlers.push(
						ASQ.iterable()
						.then(function $$then(){
							resolved = true;

							// mark all handlers across this `alts(..)` as resolved now
							handlers = handlers.filter(function $$filter(handler){
								return !(handler.resolved = true);
							});

							// channel still open?
							if (!channel.closed) {
								channel.messages.push(value);
								isq.next({ value: true, channel: channel });
							}
							// channel already closed?
							else {
								isq.next({ value: false, channel: channel });
							}
						})
					);

					// queue up put handler
					channel.put_queue.push(handlers[handlers.length-1]);

					// take waiting on this queued put?
					if (channel.take_queue.length > 0) {
						schedule(function handleUnblocking(){
							if (!resolved) {
								unblock(channel.put_queue.shift());
								unblock(channel.take_queue.shift());
							}
						},0);
					}
				}
				// take action?
				else {
					channel = action;

					// define take handler
					handlers.push(
						ASQ.iterable()
						.then(function $$then(){
							resolved = true;

							// mark all handlers across this `alts(..)` as resolved now
							handlers = handlers.filter(function $$filter(handler){
								return !(handler.resolved = true);
							});

							// channel still open?
							if (!channel.closed) {
								isq.next({ value: channel.messages.shift(), channel: channel });
							}
							// channel already closed?
							else {
								isq.next({ value: ASQ.csp.CLOSED, channel: channel });
							}
						})
					);

					// queue up take handler
					channel.take_queue.push(handlers[handlers.length-1]);

					// put waiting on this queued take?
					if (channel.put_queue.length > 0) {
						schedule(function handleUnblocking(){
							if (!resolved) {
								unblock(channel.put_queue.shift());
								unblock(channel.take_queue.shift());
							}
						});
					}
				}
			})(open[i]);
		}

		return ret;
	}

	function altsAsync(chans,cb) {
		var ret = ASQ(alts(channel));

		if (cb && typeof cb == "function") {
			ret.pThen(cb,cb);
		}
		else {
			return ret;
		}
	}

	function timeout(delay) {
		var ch = channel();
		setTimeout(ch.close,delay);
		return ch;
	}

	function go(gen,args) {
		// goroutine arguments passed?
		if (arguments.length > 1) {
			if (!args || !Array.isArray(args)) {
				args = [args];
			}
		}
		else {
			args = [];
		}

		return function *$$go(token) {

			// unblock the overall goroutine handling
			function unblock() {
				if (token.block && !token.block.marked) {
					token.block.marked = true;
					token.block.next();
				}
			}

			var ret, msg, err, type, done = false, it;

			// keep track of how many goroutines are running
			// so we can infer when we're done go'ing
			token.go_count = (token.go_count || 0) + 1;

			// need to initialize a set of goroutines?
			if (token.go_count === 1) {
				// create a default channel for these goroutines
				token.channel = channel();
				token.channel.messages = token.messages;
				token.channel.go = function $$go(){
					// unblock the goroutine handling for these
					// new goroutine(s)?
					unblock();
					// add the goroutine(s) to the handling queue
					token.add(go.apply(ø,arguments));
				};
				// starting out with initial channel messages?
				if (token.channel.messages.length > 0) {
					// fake back-pressure blocking for each
					token.channel.put_queue = token.channel.messages.map(function $$map(){
						// make a notifiable iterable for 'put' blocking
						return ASQ.iterable()
						.then(function $$then(){
							unblock(token.channel.take_queue.shift());
							return !token.channel.closed;
						});
					});
				}
			}

			// initialize the generator
			it = gen.apply(ø,[token.channel].concat(args));

			(function iterate(){

				function next() {
					// keep going with next step in goroutine?
					if (!done) {
						iterate();
					}
					// unblock overall goroutine handling to
					// continue with other goroutines
					else {
						unblock();
					}
				}

				// has a resumption value been achieved yet?
				if (!ret) {
					// try to resume the goroutine
					try {
						// resume with injected exception?
						if (err) {
							ret = it.throw(err);
							err = null;
						}
						// resume normally
						else {
							ret = it.next(msg);
						}
					}
					// resumption failed, so bail
					catch (e) {
						done = true;
						err = e;
						msg = null;
						unblock();
						return;
					}

					// keep track of the result of the resumption
					done = ret.done;
					ret = ret.value;
					type = typeof ret;

					// if this goroutine is complete, unblock the
					// overall goroutine handling
					if (done) {
						unblock();
					}

					// received a thenable/promise back?
					// NOTE: `then` duck-typing of promises is stupid.
					if (!ASQ.isSequence(ret) &&
						ret != null &&
						(type == "object" || type == "function") &&
						typeof ret.then == "function"
					) {
						ret = ASQ().promise(ret);
					}

					// wait for the value?
					if (ASQ.isSequence(ret)) {
						ret.val(function $$val(){
							ret = null;
							msg = arguments.length > 1 ?
								ASQ.messages.apply(ø,arguments) :
								arguments[0]
							;
							next();
						})
						.or(function $$or(){
							ret = null;
							msg = arguments.length > 1 ?
								ASQ.messages.apply(ø,arguments) :
								arguments[0]
							;
							if (msg instanceof Error) {
								err = msg;
								msg = null;
							}
							next();
						});
					}
					// immediate value, prepare it to go right back in
					else {
						msg = ret;
						ret = null;
						next();
					}
				}
			})();

			// keep this goroutine alive until completion
			while (!done) {
				// transfer control to another goroutine
				yield token;

				// need to block overall goroutine handling
				// while idle?
				if (!done && !token.block) {
					// wait here while idle
					yield (token.block = ASQ.iterable());

					token.block = false;
				}
			}

			// this goroutine is done now
			token.go_count--;

			// all goroutines done?
			if (token.go_count === 0) {
				// any lingering blocking need to be cleaned up?
				unblock();

				// capture any untaken messages
				msg = ASQ.messages.apply(ø,token.messages);

				// need to implicitly force-close channel?
				if (token.channel && !token.channel.closed) {
					token.channel.closed = true;
					token.channel.put_queue.length = token.channel.take_queue.length = 0;
					token.channel.close = token.channel.go = token.channel.messages = null;
				}
				token.channel = null;
			}

			// make sure leftover error or message are
			// passed along
			if (err) {
				throw err;
			}
			else if (token.go_count === 0) {
				return msg;
			}
			else {
				return token;
			}
		};
	}

	ASQ.csp = {
		chan: channel,
		put: put,
		putAsync: putAsync,
		take: take,
		takeAsync: takeAsync,
		takem: takem,
		takemAsync: takemAsync,
		alts: alts,
		altsAsync: altsAsync,
		timeout: timeout,
		go: go,
		CLOSED: {}
	};

})();
// "ASQ.iterable()"
(function IIFE(){
	var template;

	ASQ.iterable = function $$iterable() {
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
			.forEach(function $$each(fn){
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

		function $return$(val) {
			if (seq_error || seq_aborted) {
				val = void 0;
			}

			abort();

			return { done: true, value: val };
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
			or_queue.push(function $$ignored(){});
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
			"return": $return$,
			abort: abort,
			duplicate: duplicate,
			defer: defer
		});

		// useful for ES6 `for..of` loops,
		// add `@@iterator` to simply hand back
		// our iterable sequence itself!
		sequence_api[(typeof Symbol == "function" && Symbol.iterator) || "@@iterator"] = function $$iter() {
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
ASQ.extend("last",function $$extend(api,internals){
	return function $$last() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments);

		api.then(function $$then(done){
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

			var completed = 0, error_messages = [], finished = false,
				sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1)),
				success_messages
			;

			wrapGate(sq,fns,success,failure,reset);

			sq.pipe(done);
		});

		return api;
	};
});
// "map"
ASQ.extend("map",function $$extend(api,internals){
	return function $$map(pArr,pEach) {
		if (internals("seq_error") || internals("seq_aborted")) {
			return api;
		}

		api.seq(function $$seq(){
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
			.gate.apply(ø,arr.map(function $$map(item){
				return function $$segment(){
					each.apply(ø,[item].concat(ARRAY_SLICE.call(arguments)));
				};
			}));
		})
		.val(function $$val(){
			// collect all gate segment output into one value-message
			// Note: return a normal array here, not a message wrapper!
			return ARRAY_SLICE.call(arguments);
		});

		return api;
	};
});
// "none"
ASQ.extend("none",function $$extend(api,internals){
	return function $$none() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments);

		api.then(function $$then(done){
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

			var completed = 0, error_messages = [], finished = false,
				sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1)),
				success_messages = []
			;

			wrapGate(sq,fns,success,failure,reset);

			sq.pipe(done);
		});

		return api;
	};
});
// "pThen"
ASQ.extend("pThen",function $$extend(api,internals){
	return function $$pthen(success,failure) {
		if (internals("seq_aborted")) {
			return api;
		}

		var ignore_success_handler = false, ignore_failure_handler = false;

		if (typeof success === "function") {
			api.then(function $$then(done){
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
			api.or(function $$or(){
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
					api.val(function $$val(){
						// pass thru messages
						return ASQ.messages.apply(ø,arguments);
					});

					// at next cycle, reinstate the or-queue (if any)
					if (or_queue.length > 0) {
						schedule(function $$schedule(){
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
ASQ.extend("pCatch",function $$extend(api,internals){
	return function $$pcatch(failure) {
		if (internals("seq_aborted")) {
			return api;
		}

		api.pThen(void 0,failure);

		return api;
	};
});
// "race"
ASQ.extend("race",function $$extend(api,internals){
	return function $$race() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments)
		.map(function $$map(v){
			var def;
			// tap any directly-provided sequences immediately
			if (ASQ.isSequence(v)) {
				def = { seq: v };
				tapSequence(def);
				return function $$fn(done) {
					def.seq.pipe(done);
				};
			}
			else return v;
		});

		api.then(function $$then(done){
			var args = ARRAY_SLICE.call(arguments);

			fns.forEach(function $$each(fn){
				fn.apply(ø,args);
			});
		});

		return api;
	};
});
// "react" (reactive sequences)
ASQ.react = function $$react(reactor) {
	function next() {
		if (template) {
			var sq = template.duplicate();
			sq.unpause.apply(ø,arguments);
			return sq;
		}
		return ASQ(function $$asq(){ throw "Disabled Sequence"; });
	}

	function registerTeardown(fn) {
		if (template && typeof fn === "function") {
			teardowns.push(fn);
		}
	}

	var template = ASQ().duplicate(),
		teardowns = []
	;

	// add reactive sequence kill switch
	template.stop = function $$stop() {
		if (template) {
			template = null;
			teardowns.forEach(Function.call,Function.call);
			teardowns.length = 0;
		}
	};

	next.onStream = function $$onStream() {
		ARRAY_SLICE.call(arguments)
		.forEach(function $$each(stream){
			stream.on("data",next);
			stream.on("error",next);
		});
	};

	next.unStream = function $$unStream() {
		ARRAY_SLICE.call(arguments)
		.forEach(function $$each(stream){
			stream.removeListener("data",next);
			stream.removeListener("error",next);
		});
	};

	// make sure `reactor(..)` is called async
	ASQ.__schedule(function $$schedule(){
		reactor.call(template,next,registerTeardown);
	});

	return template;
};
// "react" helpers
(function IIFE(){

	function tapSequences() {
		function tapSequence(seq) {
			// temporary `trigger` which, if called before being replaced
			// below, creates replacement proxy sequence with the
			// event message(s) re-fired
			function trigger() {
				var args = ARRAY_SLICE.call(arguments);
				def.seq = ASQ.react(function $$react(next){
					next.apply(ø,args);
				});
			}

			if (ASQ.isSequence(seq)) {
				var def = { seq: seq };

				// listen for events from the sequence-stream
				seq.val(function $$val(){
					trigger.apply(ø,arguments);
					return ASQ.messages.apply(ø,arguments);
				});

				// make a reactive sequence to act as a proxy to the original
				// sequence
				def.seq = ASQ.react(function $$react(next){
					// replace the temporary trigger (created above)
					// with this proxy's trigger
					trigger = next;
				});

				return def;
			}
		}

		return ARRAY_SLICE.call(arguments)
			.map(tapSequence)
			.filter(Boolean);
	}

	function createReactOperator(buffer) {
		return function $$react$operator(){
			function reactor(next,registerTeardown){
				function processSequence(def) {
					// sequence-stream event listener
					function trigger() {
						var args = ASQ.messages.apply(ø,arguments);
						// still observing sequence-streams?
						if (seqs && seqs.length > 0) {
							// store event message(s), if any
							seq_events[seq_id] = [].concat(
								buffer ? seq_events[seq_id] : [],
								args.length > 0 ? [args] : undefined
							);

							// collect event message(s) across the
							// sequence-stream sources
							var messages = seq_events.reduce(function reducer(msgs,eventList,idx){
									if (eventList.length > 0) msgs.push(eventList[0]);
									return msgs;
								},[]);

							// did all sequence-streams get an event?
							if (messages.length == seq_events.length) {
								if (messages.length == 1) messages = messages[0];

								// fire off reactive sequence instance
								next.apply(ø,messages);

								// discard stored event message(s)
								seq_events.forEach(function $$each(eventList){
									eventList.shift();
								});
							}
						}
						// keep sequence going
						return args;
					}

					var seq_id = seq_events.length;
					seq_events.push([]);
					def.seq.val(trigger);
				}

				// process all sequence-streams
				seqs.forEach(processSequence);

				// listen for stop() of reactive sequence
				registerTeardown(function $$teardown(){
					seqs = seq_events = null;
				});
			}

			var seq_events = [],
				// observe all sequence-streams
				seqs = tapSequences.apply(null,arguments)
			;

			if (seqs.length == 0) return;

			return ASQ.react(reactor);
		};
	}

	ASQ.react.all = ASQ.react.zip = createReactOperator(/*buffer=*/true);

	ASQ.react.latest = ASQ.react.combine = createReactOperator(/*buffer=false*/);

	ASQ.react.any = ASQ.react.merge = function $$react$any(){
		function reactor(next,registerTeardown){
			function processSequence(def){
				function trigger(){
					var args = ASQ.messages.apply(ø,arguments);
					// still observing sequence-streams?
					if (seqs && seqs.length > 0) {
						// fire off reactive sequence instance
						next.apply(ø,args);
					}
					// keep sequence going
					return args;
				}

				// sequence-stream event listener
				def.seq.val(trigger);
			}

			// observe all sequence-streams
			seqs.forEach(processSequence);

			// listen for stop() of reactive sequence
			registerTeardown(function $$teardown(){
				seqs = null;
			});
		}

		// observe all sequence-streams
		var seqs = tapSequences.apply(null,arguments);

		if (seqs.length == 0) return;

		return ASQ.react(reactor);
	};

	ASQ.react.distinct = function $$react$distinct(seq){
		function reactor(next,registerTeardown){
			function trigger(){
				function isDuplicate(msgs){
					return (
						msgs.length == messages.length &&
						msgs.every(function $$every(val,idx){
							return val === messages[idx];
						})
					);
				}

				var messages = ASQ.messages.apply(ø,arguments);

				// still observing?
				if (prev_messages) {
					// any messages to check against?
					if (messages.length > 0) {
						// messages already sent before?
						if (prev_messages.some(isDuplicate)) {
							// bail on duplicate messages
							return messages;
						}

						// save messages for future distinct checking
						prev_messages.push(messages);
					}

					// fire off reactive sequence instance
					next.apply(ø,messages);
				}

				// keep sequence going
				return messages;
			}

			// sequence-stream event listener
			def.seq.val(trigger);

			// listen for stop() of reactive sequence
			registerTeardown(function $$teardown(){
				def = prev_messages = null;
			});
		}

		var prev_messages = [],
			// observe sequence-stream
			def = tapSequences(seq)[0]
		;

		if (!def) return;

		return ASQ.react(reactor);
	};

	ASQ.react.fromObservable = function $$react$from$observable(obsv){
		function reactor(next,registerTeardown){
			// process buffer (if any)
			buffer.forEach(next);
			buffer.length = 0;

			// start non-buffered notifications?
			if (!buffer.complete) {
				notify = next;
			}

			registerTeardown(function $$teardown(){
				obsv.dispose();
			});
		}

		function notify(v) {
			buffer.push(v);
		}

		var buffer = [];

		obsv.subscribe(
			function $$on$next(v){
				notify(v);
			},
			function $$on$error(){},
			function $$on$complete(){
				buffer.complete = true;
				obsv.dispose();
			}
		);

		return ASQ.react(reactor);
	};

	ASQ.extend("toObservable",function $$extend(api,internals){
		return function $$to$observable(){
			function init(observer) {
				function define(pair){
					function listen(){
						var args = ASQ.messages.apply(ø,arguments);
						observer[pair[1]].apply(observer,
							args.length == 1 ? [args[0]] : args
						);
						return args;
					}

					api[pair[0]](listen);
				}

				[["val","onNext"],["or","onError"]]
				.forEach(define);
			}

			return Rx.Observable.create(init);
		};
	});

})();
// "runner"
ASQ.extend("runner",function $$extend(api,internals){
	return function $$runner() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var args = ARRAY_SLICE.call(arguments);

		api
		.then(function $$then(mainDone){

			function wrap(fn){
				var it = fn;

				// function? expected to produces an iterator
				// (like a generator)
				if (typeof fn === "function") {
					// retrieve the iterator, passing in
					// the control token
					it = fn.call(ø,next_val);
				}
				// an iterable sequence? duplicate it (in case of multiple runs)
				else if (ASQ.isSequence(fn) && "next" in fn) {
					it = fn.duplicate();
				}
				// not an iterable sequence? wrap it.
				else {
					it = ASQ.iterable().val(fn);
				}

				// listen for any sequence failures
				if (ASQ.isSequence(it)) {
					it.or(function $$or(){
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

				// bail on run in aborted sequence
				if (internals("seq_aborted")) return;

				// was the control token yielded?
				if (ret.value === token) {
					// round-robin: put co-routine back into the list
					// at the end where it was so it can be processed
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
							ret.value = ASQ(function $$ASQ(done){
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
					.val(function $$val(){
						// bail on run in aborted sequence
						if (internals("seq_aborted")) return;

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
					.or(function $$or(){
						// bail on run in aborted sequence
						if (internals("seq_aborted")) return;

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
ASQ.extend("toPromise",function $$extend(api,internals){
	return function $$to$promise() {
		return new Promise(function $$executor(resolve,reject){
			api
			.val(function $$val(){
				var args = ARRAY_SLICE.call(arguments);
				resolve.call(ø,args.length > 1 ? args : args[0]);
				return ASQ.messages.apply(ø,args);
			})
			.or(function $$or(){
				var args = ARRAY_SLICE.call(arguments);
				reject.call(ø,args.length > 1 ? args : args[0]);
			});
		});
	};
});
// "try"
ASQ.extend("try",function $$extend(api,internals){
	return function $$try() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments)
		.map(function $$map(fn){
			return function $$then(mainDone) {
				var main_args = ARRAY_SLICE.call(arguments),
					sq = ASQ.apply(ø,main_args.slice(1))
				;

				sq
				.then(function $$inner$then(){
					fn.apply(ø,arguments);
				})
				.val(function $$val(){
					mainDone.apply(ø,arguments);
				})
				.or(function $$inner$or(){
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
ASQ.extend("until",function $$extend(api,internals){
	return function $$until() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments)
		.map(function $$map(fn){
			return function $$then(mainDone) {
				var main_args = ARRAY_SLICE.call(arguments),
					sq = ASQ.apply(ø,main_args.slice(1))
				;

				sq
				.then(function $$inner$then(){
					var args = ARRAY_SLICE.call(arguments);
					args[0]["break"] = function $$break(){
						mainDone.fail.apply(ø,arguments);
						sq.abort();
					};

					fn.apply(ø,args);
				})
				.val(function $$val(){
					mainDone.apply(ø,arguments);
				})
				.or(function $$inner$or(){
					// failed, retry
					$$then.apply(ø,main_args);
				});
			};
		});

		api.then.apply(ø,fns);

		return api;
	};
});
// "waterfall"
ASQ.extend("waterfall",function $$extend(api,internals){
	return function $$waterfall() {
		if (internals("seq_error") || internals("seq_aborted") ||
			arguments.length === 0
		) {
			return api;
		}

		var fns = ARRAY_SLICE.call(arguments);

		api.then(function $$then(done){
			var msgs = ASQ.messages(),
				sq = ASQ.apply(ø,ARRAY_SLICE.call(arguments,1))
			;

			fns.forEach(function $$each(fn){
				sq.then(fn)
				.val(function $$val(){
					var args = ASQ.messages.apply(ø,arguments);
					msgs.push(args.length > 1 ? args : args[0]);
					return msgs;
				});
			});

			sq.pipe(done);
		});

		return api;
	};
});
// "wrap"
ASQ.wrap = function $$wrap(fn,opts) {
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
		return function $$wrapped$gen() {
			return ASQ.apply(ø,arguments).runner(fn);
		};
	}
	if (errfcb) {
		return function $$wrapped$errfcb() {
			var args = ARRAY_SLICE.call(arguments),
				_this = checkThis(this,this_obj)
			;

			return ASQ(function $$asq(done){
				args[act](done.errfcb);
				fn.apply(_this,args);
			});
		};
	}
	if (opts.splitcb) {
		return function $$wrapped$splitcb() {
			var args = ARRAY_SLICE.call(arguments),
				_this = checkThis(this,this_obj)
			;

			return ASQ(function $$asq(done){
				args[act](done,done.fail);
				fn.apply(_this,args);
			});
		};
	}
	if (opts.simplecb) {
		return function $$wrapped$simplecb() {
			var args = ARRAY_SLICE.call(arguments),
				_this = checkThis(this,this_obj)
			;

			return ASQ(function $$asq(done){
				args[act](done);
				fn.apply(_this,args);
			});
		};
	}
};


	// just return `ASQ` itself for convenience sake
	return ASQ;
});
