var events = require('events'),
    path = require('path');

var vows = require('../vows');
var Context = require('../vows/context').Context;

this.Suite = function (subject) {
    this.subject = subject;
    this.matcher = /.*/;
    this.reporter = require('./reporters/dot-matrix');
    this.batches = [];
    this.options = { error: true };
    this.reset();
};

this.Suite.prototype = new(function () {
    this.reset = function () {
        this.results = {
            honored: 0,
            broken:  0,
            errored: 0,
            pending: 0,
            total:   0,
            time:  null
        };
        this.batches.forEach(function (b) {
            b.lastContext = null;
            b.remaining = b._remaining;
            b.honored = b.broken = b.errored = b.total = b.pending = 0;
            b.vows.forEach(function (vow) { vow.status = null });
            b.teardowns = [];
        });
    };

    this.addBatch = function (tests) {
        this.batches.push({
            tests: tests,
            suite:  this,
            vows:     [],
            remaining: 0,
           _remaining: 0,
            honored:   0,
            broken:    0,
            errored:   0,
            pending:   0,
            total:     0,
            teardowns: []
        });
        return this;
    };
    this.addVows = this.addBatch;

    this.parseBatch = function (batch, matcher) {
        var tests = batch.tests;

        if ('topic' in tests) {
            throw new(Error)("missing top-level context.");
        }
        // Count the number of vows/promises expected to fire,
        // so we know when the tests are over.
        // We match the keys against `matcher`, to decide
        // whether or not they should be included in the test.
        // Any key, including assertion function keys can be matched.
        // If a child matches, then the n parent topics must not be skipped.
        (function count(tests, _match) {
            var match = false;

            var keys = Object.keys(tests).filter(function (k) {
                return k !== 'topic' && k !== 'teardown';
            });

            for (var i = 0, key; i < keys.length; i++) {
                key = keys[i];

                // If the parent node, or this one matches.
                match = _match || matcher.test(key);

                if (typeof(tests[key]) === 'object') {
                    match = count(tests[key], match);
                } else {
                    if (typeof(tests[key]) === 'string') {
                        tests[key] = new(String)(tests[key]);
                    }
                    if (! match) {
                        tests[key]._skip = true;
                    }
                }
            }

            // If any of the children matched,
            // don't skip this node.
            for (var i = 0; i < keys.length; i++) {
                if (! tests[keys[i]]._skip) { match = true }
            }

            if (match) { batch.remaining ++ }
            else       { tests._skip = true }

            return match;
        })(tests, false);

        batch._remaining = batch.remaining;
    };

    this.runBatch = function (batch) {
        var topic,
            tests   = batch.tests,
            promise = batch.promise = new(events.EventEmitter);

        var that = this;

        batch.status = 'begin';

        // The test runner, it calls itself recursively, passing the
        // previous context to the inner contexts. This is so the `topic`
        // functions have access to all the previous context topics in their
        // arguments list.
        // It is defined and invoked at the same time.
        // If it encounters a `topic` function, it waits for the returned
        // promise to emit (the topic), at which point it runs the functions under it,
        // passing the topic as an argument.
        (function run(ctx, lastTopic) {
            var old = false;
            topic = ctx.tests.topic;

            if (typeof(topic) === 'function') {
                if (ctx.isEvent || ctx.name === 'on') {
                    throw new Error('Event context cannot contain a topic');
                }

                // Run the topic, passing the previous context topics
                // If topic `throw`s an exception, pass it down as a value
                try {
                    topic = topic.apply(ctx.env, ctx.topics);
                }
                catch (ex) {
                    if(/ReferenceError/.test(ex)) throw ex;
                    topic = ex;
                }

                if (typeof(topic) === 'undefined') { ctx._callback = true }
            }

            // If this context has a topic, store it in `lastTopic`,
            // if not, use the last topic, passed down by a parent
            // context.
            if (typeof(topic) !== 'undefined' || ctx._callback) {
                lastTopic = topic;
            } else {
                old   = true;
                topic = lastTopic;
            }

            // If the topic doesn't return an event emitter (such as a promise),
            // we create it ourselves, and emit the value on the next tick.
            if (! (topic &&
                   topic.constructor === events.EventEmitter)) {
                // If the context is a traditional vow, then a topic can ONLY
                // be an EventEmitter.  However if the context is a sub-event
                // then the topic may be an instanceof EventEmitter
                if (!ctx.isEvent ||
                   (ctx.isEvent && !(topic instanceof events.EventEmitter))) {

                      ctx.emitter = new(events.EventEmitter);

                      if (! ctx._callback) {
                          process.nextTick(function (val) {
                              return function () {
                                ctx.emitter.emit("success", val)
                              };
                          }(topic));
                      }
                      // if I have a callback, push the new topic back up to
                      // lastTopic
                      if (ctx._callback) {
                          lastTopic = topic = ctx.emitter;
                      } else {
                          topic = ctx.emitter;
                      }
                }
            }

            topic.on(ctx.event, function (val) {
                // Once the topic fires, add the return value
                // to the beginning of the topics list, so it
                // becomes the first argument for the next topic.
                // If we're using the parent topic, no need to
                // prepend it to the topics list, or we'll get
                // duplicates.
                if (!old || ctx.isEvent) {
                    Array.prototype.unshift.apply(ctx.topics, arguments)
                };
            });
            if (topic.setMaxListeners) { topic.setMaxListeners(Infinity) }
            // Now run the tests, or sub-contexts
            Object.keys(ctx.tests).filter(function (k) {
                return ctx.tests[k] && k !== 'topic'    &&
                                       k !== 'teardown' && !ctx.tests[k]._skip;
            }).forEach(function (item) {
                // Create a new evaluation context,
                // inheriting from the parent one.
                var env = Object.create(ctx.env);
                env.suite = that;

                // Holds the current test or context
                var vow = Object.create({
                    callback: ctx.tests[item],
                    context: ctx.title,
                    description: item,
                    binding: ctx.env,
                    status: null,
                    batch: batch
                });

                // If we encounter a function, add it to the callbacks
                // of the `topic` function, so it'll get called once the
                // topic fires.
                // If we encounter an object literal, we recurse, sending it
                // our current context.
                if ((typeof(vow.callback) === 'function') ||
                    (vow.callback instanceof String)) {
                    topic.addVow(vow);
                } else if (typeof(vow.callback) === 'object') {
                    // If there's a setup stage, we have to wait for it to fire,
                    // before calling the inner context.
                    // If the event has already fired, the context is 'on' or
                    // there is no setup stage, just run the inner context
                    // synchronously.
                    if (topic &&
                        ctx.name !== 'on' &&
                        (!topic._vowsEmitedEvents || !topic._vowsEmitedEvents.hasOwnProperty(ctx.event))) {
                        topic.on(ctx.event, function (ctx) {
                            return function (val) {
                                return run(new(Context)(vow, ctx, env), lastTopic);
                            };
                        }(ctx));
                    } else {
                        run(new(Context)(vow, ctx, env), lastTopic);
                    }
                }
            });
            // Teardown
            if (ctx.tests.teardown) {
                batch.teardowns.push(ctx);
            }
            if (! ctx.tests._skip) {
                batch.remaining --;
            }
            // Check if we're done running the tests
            exports.tryEnd(batch);
        // This is our initial, empty context
        })(new(Context)({ callback: tests, context: null, description: null }, {}));
        return promise;
    };

    this.report = function () {
        return this.reporter.report.apply(this.reporter, arguments);
    };

    this.run = function (options, callback) {
        var that = this, start;

        options = options || {};

        Object.keys(options).forEach(function (k) {
            that.options[k] = options[k];
        });

        this.matcher  = this.options.matcher  || this.matcher;
        this.reporter = this.options.reporter || this.reporter;

        this.batches.forEach(function (batch) {
            that.parseBatch(batch, that.matcher);
        });

        this.reset();

        start = new(Date);

        if (this.batches.filter(function (b) { return b.remaining > 0 }).length) {
            this.report(['subject', this.subject]);
        }

        return (function run(batches) {
            var batch = batches.shift();

            if (batch) {
                // If the batch has no vows to run,
                // go to the next one.
                if (batch.remaining === 0) {
                    run(batches);
                } else {
                    that.runBatch(batch).on('end', function () {
                        run(batches);
                    });
                }
            } else {
                that.results.time = (new(Date) - start) / 1000;
                that.report(['finish', that.results]);

                if (callback) { callback(that.results) }

                if (that.results.honored + that.results.pending === that.results.total) {
                    return 0;
                } else {
                    return 1;
                }
            }
        })(this.batches.slice(0));
    };

    this.runParallel = function () {};

    this.export = function (module, options) {
        var that = this;

        Object.keys(options || {}).forEach(function (k) {
            that.options[k] = options[k];
        });

        if (require.main === module) {
            return this.run();
        } else {
            return module.exports[this.subject] = this;
        }
    };
    this.exportTo = function (module, options) { // Alias, for JSLint
        return this.export(module, options);
    };
});

//
// Checks if all the tests in the batch have been run,
// and triggers the next batch (if any), by emitting the 'end' event.
//
this.tryEnd = function (batch) {
    var result, style, time;

    if (batch.honored + batch.broken + batch.errored + batch.pending === batch.total &&
        batch.remaining === 0) {

        Object.keys(batch).forEach(function (k) {
            (k in batch.suite.results) && (batch.suite.results[k] += batch[k]);
        });

        if (batch.teardowns) {
            for (var i = batch.teardowns.length - 1, ctx; i >= 0; i--) {
                runTeardown(batch.teardowns[i]);
            }

            maybeFinish();
        }

        function runTeardown(teardown) {
            var env = Object.create(teardown.env);

            Object.defineProperty(env, "callback", {
                get: function () {
                    teardown.awaitingCallback = true;

                    return function () {
                        teardown.awaitingCallback = false;
                        maybeFinish();
                    };
                }
            });

            teardown.tests.teardown.apply(env, teardown.topics);
        }

        function maybeFinish() {
            var pending = batch.teardowns.filter(function (teardown) {
                return teardown.awaitingCallback;
            });

            if (pending.length === 0) {
                finish();
            }
        }

        function finish() {
            batch.status = 'end';
            batch.suite.report(['end']);
            batch.promise.emit('end', batch.honored, batch.broken, batch.errored, batch.pending);
        }
    }
};
