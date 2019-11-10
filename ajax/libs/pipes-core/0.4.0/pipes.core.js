(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chain;

var _connect = require("./connect");

var _connect2 = _interopRequireDefault(_connect);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// chain :: TransformStreams... -> { readable, writable }
// chain function takes one or more
// transform streams / { readable, writable } pairs
// connects them to each other,
// takes the readable of the end and the writable of the head,
// returns the { readable, writable } pair that is
// compatible with `ReadableStream::pipeThrough`
//

var compatibilityError = "\n    Only transform streams and readable-writable pairs can be chained\n  ";

function chain(origin) {

  // Check that origin is a transform stream / { readable, writable }
  if (!(0, _utils.isTransform)(origin)) throw new Error(compatibilityError);

  // connect the streams

  for (var _len = arguments.length, streams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    streams[_key - 1] = arguments[_key];
  }

  var writable = origin.writable;
  var readable = _connect2.default.apply(undefined, [origin].concat(streams));

  // Check if null stream
  if (!(0, _utils.isReadable)(readable)) throw new Error(compatibilityError);

  // return readable-writable pair
  return {
    readable: readable,
    writable: writable
  };
}

// Browserify compat
if (typeof module !== "undefined") module.exports = chain;
},{"./connect":2,"./utils":12}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connect;

var _utils = require("./utils");

function connect(origin) {
  // Check origin
  if (!origin) throw new Error("No streams passed");

  var sink = undefined,
      end = undefined;

  // Get the last stream

  for (var _len = arguments.length, streams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    streams[_key - 1] = arguments[_key];
  }

  sink = streams.pop();

  // if origin is a transform$, take it's readable part
  end = origin.readable || origin;

  // Connect the streams
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = streams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var stream = _step.value;


      // Check for transform streams
      if (!(0, _utils.isTransform)(stream)) throw new Error("Only transform streams allowed in the center");

      // piping through a transform returns it's readable part
      end = end.pipeThrough(stream);
    }

    // Handle sink
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if ((0, _utils.isWritable)(sink)) end = end.pipeTo(sink);else if ((0, _utils.isTransform)(sink)) end = end.pipeThrough(sink);else throw new Error("Only writable and transform streams allowed at the end.");

  // Return result
  return end;
}

// Browserify compat
// connect :: Streams... -> ReadableStream | Promise
// connect function takes one or more streams
// and sequentially pipes them to each other,
// returning the result of the last pipe operation.
//

if (typeof module !== "undefined") module.exports = connect;
},{"./utils":12}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatten;

var _streams = require("./streams");

var _utils = require("./utils");

// flatten :: ReadableStream... -> ReadableStream
// flatten function takes one or more streams
// and returns a readable combining the streams,
// returning chunks as they arrive in combined streams.
//

function flatten() {
  for (var _len = arguments.length, streams = Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var flattenedStream = undefined,
      writers = [];

  return flattenedStream = new _streams.ReadableStream({
    start: function start(controller) {
      // Create writers for each stream
      while (writers.length < streams.length) {
        writers.push(new _streams.WritableStream({
          // write incoming to flattenedStream
          write: controller.enqueue.bind(controller)
        }));
      } // Connect streams to writers
      var connect = function connect(r, w) {
        return r.pipeTo(w);
      },
          pipedAll = undefined;

      try {
        pipedAll = (0, _utils.zipWith)(connect, streams, writers);
      } catch (e) {
        throw new Error("Only readable streams can be flattened.");
      }

      // Set up closing
      return Promise.all(pipedAll).then(controller.close.bind(controller), controller.error.bind(controller));
    },
    cancel: function cancel() {
      // If cancelled, cancel all streams
      streams.forEach(function (stream) {
        return stream.cancel();
      });
    }
  });
};

// Browserify compat
if (typeof module !== "undefined") module.exports = flatten;
},{"./streams":11,"./utils":12}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.split = exports.pipe = exports.merge = exports.flatten = exports.chain = exports.connect = undefined;

var _connect = require("./connect");

var _connect2 = _interopRequireDefault(_connect);

var _chain = require("./chain");

var _chain2 = _interopRequireDefault(_chain);

var _flatten = require("./flatten");

var _flatten2 = _interopRequireDefault(_flatten);

var _merge = require("./merge");

var _merge2 = _interopRequireDefault(_merge);

var _pipe = require("./pipe");

var _pipe2 = _interopRequireDefault(_pipe);

var _split = require("./split");

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Exports
exports.connect = _connect2.default;
exports.chain = _chain2.default;
exports.flatten = _flatten2.default;
exports.merge = _merge2.default;
exports.pipe = _pipe2.default;
exports.split = _split2.default;

// Default exports

var fns = {
  connect: _connect2.default,
  chain: _chain2.default,
  flatten: _flatten2.default,
  merge: _merge2.default,
  pipe: _pipe2.default,
  split: _split2.default
};

// Export to window
if (typeof window !== "undefined") Object.assign(window, {
  Pipes: fns
});

exports.default = fns;
},{"./chain":1,"./connect":2,"./flatten":3,"./merge":5,"./pipe":6,"./split":10}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;

var _streams = require("./streams");

// Parses arrays of {value, done} pairs to final pair
function parseResults(results) {
  var ended = false,
      values = [];

  // Accumulate values
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value;
      var value = _step$value.value;
      var done = _step$value.done;

      ended = ended || done;
      values.push(value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    value: values,
    done: ended
  };
} // merge :: ReadableStream... -> ReadableStream
// merge function takes one or more streams
// and returns a readable combining the streams,
// such that it gathers chunks from all streams
// into an array and then pushes them onto the combined
// stream, by waiting for all streams to have pushed a chunk.
//

function merge() {
  for (var _len = arguments.length, streams = Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var readers = undefined,
      chunkWaiters = undefined,
      mergedStream = undefined,
      merger = undefined;

  // Get readers
  try {
    readers = streams.map(function (stream) {
      return stream.getReader();
    });

    // Check for transform streams
  } catch (e) {

    throw new Error("Only ReadableStreams can be flattened");
  }

  // Merging function
  merger = function merger(controller) {
    var
    // Get read promises
    promises = readers.map(function (r) {
      return r.read();
    }),
        merged = undefined,
        push = undefined;

    // Read values and push them onto the stream
    push = function push(_ref) {
      var value = _ref.value;
      var done = _ref.done;

      if (done) return controller.close();

      controller.enqueue(value);
    };

    // Combine values into an array
    merged = Promise.all(promises).then(parseResults).then(push, controller.error.bind(controller));

    return merged;
  };

  return mergedStream = new _streams.ReadableStream({
    start: merger,
    pull: merger,

    cancel: function cancel() {
      // If cancelled, cancel all streams
      streams.forEach(function (stream) {
        return stream.cancel();
      });
    }
  });
};

// Browserify compat
if (typeof module !== "undefined") module.exports = merge;
},{"./streams":11}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipe;

var _utils = require("./utils");

var _pipeAsync = require("./pipeAsync");

var _pipeAsync2 = _interopRequireDefault(_pipeAsync);

var _pipeFn = require("./pipeFn");

var _pipeFn2 = _interopRequireDefault(_pipeFn);

var _pipeGen = require("./pipeGen");

var _pipeGen2 = _interopRequireDefault(_pipeGen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pipe :: Function | Generator Function -> Opts {} -> TransformBlueprint
// pipe takes any normal/generator func and returns transform stream blueprint.
//
// pipe.async :: Async Function -> Opts {} -> TransformBlueprint
// pipe.async takes any async func and returns transform stream blueprint.
//

function pipe(fn, opts) {
  // Route to appropriate function
  if ((0, _utils.isGeneratorFn)(fn)) return (0, _pipeGen2.default)(fn, opts);else if ((0, _utils.isFunction)(fn)) return (0, _pipeFn2.default)(fn, opts);else throw new Error("Invalid argument");
}

// Add async support
pipe.async = _pipeAsync2.default;

// Browserify compat
if (typeof module !== "undefined") module.exports = pipe;
},{"./pipeAsync":7,"./pipeFn":8,"./pipeGen":9,"./utils":12}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipeAsync;

var _streams = require("./streams");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // pipeAsync :: Async Function -> Opts {} -> TransformBlueprint
// pipeAsync takes an async function and wraps it into
// a transform streams. Waits till completion, before enqueuing.
//
// Returns a blueprint class that can be used to
// instantiate above streams.
//

function pipeAsync(fn) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var
  // opts
  init = _ref.init;
  var readableStrategy = _ref.readableStrategy;
  var writableStrategy = _ref.writableStrategy;


  // Prepare transformer
  var transformer = {
    // Store awaiting functions
    _unfulfilledFutures: [],

    // Run function and enqueue result
    transform: function transform(chunk, enqueue, done) {
      // Run async fn
      var self = transformer,
          future = fn(chunk),
          condEnqueue = function condEnqueue(v) {
        if (v !== void 0) enqueue(v);
      },


      // Get index of current future
      findex = self._unfulfilledFutures.length;

      // Add to executing futures list
      self._unfulfilledFutures.push(future);

      // Proceed to enqueue
      future.then(condEnqueue, function () {
        // Signal error to stream
        throw new Error();
      })

      // Remove itself from the _unfulfilledFutures list
      .then(function () {
        return self._unfulfilledFutures.splice(findex, 1);
      }).done(done);

      return future;
    },
    flush: function flush(enqueue, close) {
      var self = transformer,
          condEnqueue = function condEnqueue(v) {
        if (v !== void 0) enqueue(v);
      };

      // Check if anything is left
      Promise.all(self._unfulfilledFutures).then(function (vs) {
        return vs.map(condEnqueue);
      }).done(close);
    },


    // if passed
    readableStrategy: readableStrategy,
    writableStrategy: writableStrategy
  };

  // Wrap in blueprint class

  var TransformBlueprint = function (_TransformStream) {
    _inherits(TransformBlueprint, _TransformStream);

    function TransformBlueprint() {
      var _this, _ret;

      _classCallCheck(this, TransformBlueprint);

      // Make stream
      var stream = (_this = _possibleConstructorReturn(this, Object.getPrototypeOf(TransformBlueprint).call(this, transformer)), _this);

      // If init, push chunk
      if (init !== void 0) stream.writable.write(init);

      return _ret = stream, _possibleConstructorReturn(_this, _ret);
    }

    return TransformBlueprint;
  }(_streams.TransformStream);

  return TransformBlueprint;
}

// Browserify compat
if (typeof module !== "undefined") module.exports = pipeAsync;
},{"./streams":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pipeFn;

var _streams = require("./streams");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // pipeFn :: Function -> Opts {} -> TransformBlueprint
// pipeFn takes a function and wraps it into
// a transform streams.
// Returns a blueprint class that can be used to
// instantiate above streams.
//

function pipeFn(fn) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var
  // opts
  init = _ref.init;
  var readableStrategy = _ref.readableStrategy;
  var writableStrategy = _ref.writableStrategy;


  // Prepare transformer
  var transformer = {
    // Run function and enqueue result

    transform: function transform(chunk, enqueue, done) {
      var condEnqueue = function condEnqueue(v) {
        if (v !== void 0) enqueue(v);
      };

      condEnqueue(fn(chunk));

      return done();
    },


    // if passed
    readableStrategy: readableStrategy,
    writableStrategy: writableStrategy
  };

  // Wrap in blueprint class

  var TransformBlueprint = function (_TransformStream) {
    _inherits(TransformBlueprint, _TransformStream);

    function TransformBlueprint() {
      var _this, _ret;

      _classCallCheck(this, TransformBlueprint);

      // Make stream
      var stream = (_this = _possibleConstructorReturn(this, Object.getPrototypeOf(TransformBlueprint).call(this, transformer)), _this);

      // If init, push chunk
      if (init !== void 0) stream.writable.write(init);

      return _ret = stream, _possibleConstructorReturn(_this, _ret);
    }

    return TransformBlueprint;
  }(_streams.TransformStream);

  return TransformBlueprint;
}

// Browserify compat
if (typeof module !== "undefined") module.exports = pipeFn;
},{"./streams":11}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // pipeGen :: Generator Function -> Opts {} -> TransformBlueprint
// pipeGen takes a generator function and wraps it into
// a transform streams. Waits till completion, before enqueuing.
// All yields are enqueued, back-pressure is respected and
// the generator paused if queue getting back-pressured.
//
// Returns a blueprint class that can be used to
// instantiate above streams.
//

exports.default = pipeGen;

var _streams = require("./streams");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Manages generator object and consumes it
// while taking backpressure into account

var GenObjManager = function () {
  function GenObjManager(gen, enqueue, readable) {
    _classCallCheck(this, GenObjManager);

    var done = undefined,
        condEnqueue = function condEnqueue(v) {
      if (v !== void 0) enqueue(v);
    },
        promise = new Promise(function (resolve) {
      done = resolve;
    });

    // Add props
    Object.assign(this, {
      done: done, gen: gen, readable: readable, promise: promise,
      enqueue: condEnqueue,
      running: false
    });
  }

  // Make manager a thenable


  _createClass(GenObjManager, [{
    key: "start",


    // Kick start the read loop
    value: function start() {
      if (this.running || !this.gen) return;

      // Start the loop
      this.running = true;
      this.tick();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.running = false;
    }
  }, {
    key: "close",
    value: function close() {
      this.pause();

      // Close generator
      this.gen.return();
      this.gen = null;

      // Call done
      this.done();
    }

    // Flush the gen and close

  }, {
    key: "flush",
    value: function flush() {
      var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      if (!this.gen) return;

      // Pause
      this.pause();

      // Read gen n times
      // passing it a true value to signal shutdown
      while (n--) {
        this.tick(true);
      } // Close the generator
      this.close();
    }
  }, {
    key: "tick",
    value: function tick(msg) {
      // Get next value

      var _gen$next = this.gen.next(msg);

      var value = _gen$next.value;
      var done = _gen$next.done;

      // Enqueue value to stream

      this.enqueue(value);

      // Process next tick
      if (done) {
        this.close();
      } else if (this.running && this.ready) {
        this.tick(msg);
      } else {
        this.pause();
      }
    }
  }, {
    key: "then",
    get: function get() {
      return this.promise.then.bind(this.promise);
    }

    // Get backpressure signals

  }, {
    key: "ready",
    get: function get() {
      return this.readable._controller.desiredSize >= 0;
    }
  }]);

  return GenObjManager;
}();

function pipeGen(fn) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var
  // opts
  init = _ref.init;
  var readableStrategy = _ref.readableStrategy;
  var writableStrategy = _ref.writableStrategy;


  // Prepare transformer
  var genManager = undefined,
      transformer = {
    transform: function transform(chunk, enqueue, done) {
      // Create generator manager
      genManager = new GenObjManager(fn(chunk), enqueue, this.readable);

      // Set up closing
      genManager.then(function () {
        return done();
      });

      // Start consuming
      genManager.start();
    },
    flush: function flush(enqueue, close) {
      // Flush generator
      genManager && genManager.flush();
      close();
    },


    // if passed
    readableStrategy: readableStrategy,
    writableStrategy: writableStrategy
  };

  // Wrap in blueprint class

  var TransformBlueprint = function (_TransformStream) {
    _inherits(TransformBlueprint, _TransformStream);

    function TransformBlueprint() {
      var _this, _ret;

      _classCallCheck(this, TransformBlueprint);

      // Make stream
      var stream = (_this = _possibleConstructorReturn(this, Object.getPrototypeOf(TransformBlueprint).call(this, transformer)), _this);

      // Bind transform function to stream
      transformer.transform = transformer.transform.bind(stream);

      // Super hacky because TransformStream doesn't allow an easy way to do this
      // Wrap pull so that it can signal generator to resume
      var _pull = stream.readable._underlyingSource.pull;
      stream.readable._underlyingSource.pull = function (c) {

        // Resume generator manager
        genManager && genManager.start();

        return _pull(c);
      };

      // If init, push chunk
      if (init !== void 0) stream.writable.write(init);

      return _ret = stream, _possibleConstructorReturn(_this, _ret);
    }

    return TransformBlueprint;
  }(_streams.TransformStream);

  return TransformBlueprint;
}

// Browserify compat
if (typeof module !== "undefined") module.exports = pipeGen;
},{"./streams":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = split;
// split :: ReadableStream -> Int -> [ReadableStream]
// split function takes a readable stream and number
// and returns an array of tee'd readable streams,
// with a `cancelAll` function that cancels all the tee'd
// streams and hence the original stream.
//

function split(stream) {
  var parts = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

  // Check for readable stream
  if (!stream.tee) throw new Error("Only readable streams can be split");

  // Decls
  var result = undefined,
      cancelFns = undefined,
      cancelAll = undefined;

  // Generate parts
  result = [stream];

  while (parts > result.length) {
    // Take last part
    var s = result.pop();

    // Add new parts after tee'ing
    result = result.concat(s.tee());
  }

  // Take cancel functions
  cancelFns = result.map(function (s) {
    return s.cancel.bind(s);
  });

  // Gen cancelAll
  cancelAll = function cancelAll() {
    return cancelFns.forEach(function (c) {
      return c();
    });
  };

  // Add cancelAll to all the parts
  result.forEach(function (s) {
    s.cancelAll = cancelAll;
  });

  return result;
}

// Browserify compat
if (typeof module !== "undefined") module.exports = split;
},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Access stream interface

var interfaces = undefined,
    global = global || {};

if (typeof window !== 'undefined') global = window;

if (!!global.ReadableStream) {

  interfaces = {
    ReadableByteStream: global.ReadableByteStream,
    ReadableStream: global.ReadableStream,
    WritableStream: global.WritableStream,
    ByteLengthQueuingStrategy: global.ByteLengthQueuingStrategy,
    CountQueuingStrategy: global.CountQueuingStrategy,
    TransformStream: global.TransformStream
  };
} else {

  try {
    interfaces = require("web-streams-polyfill")["default"];
  } catch (e) {

    throw new Error("No Stream implementation found");
  }
}

var ReadableByteStream = exports.ReadableByteStream = interfaces.ReadableByteStream,
    ReadableStream = exports.ReadableStream = interfaces.ReadableStream,
    WritableStream = exports.WritableStream = interfaces.WritableStream,
    ByteLengthQueuingStrategy = exports.ByteLengthQueuingStrategy = interfaces.ByteLengthQueuingStrategy,
    CountQueuingStrategy = exports.CountQueuingStrategy = interfaces.CountQueuingStrategy,
    TransformStream = exports.TransformStream = interfaces.TransformStream;

exports.default = interfaces;
},{"web-streams-polyfill":"web-streams-polyfill"}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = zipWith;
// Utils
var isTransform = exports.isTransform = function isTransform(s) {
  return s && s.writable && s.readable;
},
    isReadable = exports.isReadable = function isReadable(s) {
  return s && s.pipeThrough;
},
    isWritable = exports.isWritable = function isWritable(s) {
  return s && s.write;
},


// Inspired by code from @tj/co library
isFunction = exports.isFunction = function isFunction(f) {
  return f && typeof f === "function";
},
    isGenerator = exports.isGenerator = function isGenerator(o) {
  return o && isFunction(o.next);
},
    isGeneratorFn = exports.isGeneratorFn = function isGeneratorFn(_ref) {
  var constructor = _ref.constructor;

  return constructor && (constructor.name === "GeneratorFunction" || constructor.displayName === "GeneratorFunction");
};

// Zips together two arrays using given fn
function zipWith(fn, arr1, arr2) {
  var res = [];

  // Pop values, push zipped values
  while (arr1.length && arr2.length) {
    res.push(fn(arr1.pop(), arr2.pop()));
  }return res;
}
},{}]},{},[4]);
