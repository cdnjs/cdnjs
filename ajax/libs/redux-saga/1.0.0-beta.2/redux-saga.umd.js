(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.ReduxSaga = {})));
}(this, (function (exports) { 'use strict';

  var createName = function createName(name) {
    return "@@redux-saga/" + name;
  };

  var createSymbol = function createSymbol(id) {
    id = createName(id);
    return typeof Symbol === 'function' ? Symbol(id) : id;
  };

  var createGlobalSymbol = function createGlobalSymbol(id) {
    id = createName(id);
    return typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for(id) : id;
  };

  var CANCEL =
  /*#__PURE__*/
  createSymbol('CANCEL_PROMISE');
  var CHANNEL_END_TYPE =
  /*#__PURE__*/
  createSymbol('CHANNEL_END');
  var IO =
  /*#__PURE__*/
  createSymbol('IO');
  var MATCH =
  /*#__PURE__*/
  createSymbol('MATCH');
  var MULTICAST =
  /*#__PURE__*/
  createSymbol('MULTICAST');
  var SAGA_ACTION =
  /*#__PURE__*/
  createSymbol('SAGA_ACTION');
  var SELF_CANCELLATION =
  /*#__PURE__*/
  createSymbol('SELF_CANCELLATION');
  var TASK =
  /*#__PURE__*/
  createSymbol('TASK');
  var TASK_CANCEL =
  /*#__PURE__*/
  createSymbol('TASK_CANCEL');
  var TERMINATE =
  /*#__PURE__*/
  createSymbol('TERMINATE');
  var SAGA_LOCATION =
  /*#__PURE__*/
  createGlobalSymbol('LOCATION');

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var undef = function undef(v) {
    return v === null || v === undefined;
  };
  var notUndef = function notUndef(v) {
    return v !== null && v !== undefined;
  };
  var func = function func(f) {
    return typeof f === 'function';
  };
  var string = function string(s) {
    return typeof s === 'string';
  };
  var array = Array.isArray;
  var object = function object(obj) {
    return obj && !array(obj) && typeof obj === 'object';
  };
  var promise = function promise(p) {
    return p && func(p.then);
  };
  var iterator = function iterator(it) {
    return it && func(it.next) && func(it.throw);
  };
  var task = function task(t) {
    return t && t[TASK];
  };
  var buffer = function buffer(buf) {
    return buf && func(buf.isEmpty) && func(buf.take) && func(buf.put);
  };
  var pattern = function pattern(pat) {
    return pat && (string(pat) || symbol(pat) || func(pat) || array(pat));
  };
  var channel = function channel(ch) {
    return ch && func(ch.take) && func(ch.close);
  };
  var stringableFunc = function stringableFunc(f) {
    return func(f) && f.hasOwnProperty('toString');
  };
  var symbol = function symbol(sym) {
    return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
  };
  var multicast = function multicast(ch) {
    return channel(ch) && ch[MULTICAST];
  };

  var konst = function konst(v) {
    return function () {
      return v;
    };
  };
  var kTrue =
  /*#__PURE__*/
  konst(true);
  var noop = function noop() {};
  var identity = function identity(v) {
    return v;
  };
  function check(value, predicate, error) {
    if (!predicate(value)) {
      throw new Error(error);
    }
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(object$$1, property) {
    return notUndef(object$$1) && hasOwnProperty.call(object$$1, property);
  }
  var object$1 = {
    assign: function assign(target, source) {
      for (var i in source) {
        if (hasOwn(source, i)) {
          target[i] = source[i];
        }
      }
    }
  };
  function remove(array$$1, item) {
    var index = array$$1.indexOf(item);

    if (index >= 0) {
      array$$1.splice(index, 1);
    }
  }
  var array$1 = {
    from: function from(obj) {
      var arr = Array(obj.length);

      for (var i in obj) {
        if (hasOwn(obj, i)) {
          arr[i] = obj[i];
        }
      }

      return arr;
    }
  };
  function once(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }

      called = true;
      fn();
    };
  }
  function createMockTask() {
    var _ref;

    var _isRunning = true;

    var _result;

    var _error;

    return _ref = {}, _ref[TASK] = true, _ref.isRunning = function isRunning() {
      return _isRunning;
    }, _ref.result = function result() {
      return _result;
    }, _ref.error = function error() {
      return _error;
    }, _ref.setRunning = function setRunning(b) {
      return _isRunning = b;
    }, _ref.setResult = function setResult(r) {
      return _result = r;
    }, _ref.setError = function setError(e) {
      return _error = e;
    }, _ref;
  }
  function autoInc(seed) {
    if (seed === void 0) {
      seed = 0;
    }

    return function () {
      return ++seed;
    };
  }
  var uid =
  /*#__PURE__*/
  autoInc();

  var kThrow = function kThrow(err) {
    throw err;
  };

  var kReturn = function kReturn(value) {
    return {
      value: value,
      done: true
    };
  };

  function makeIterator(next, thro, name) {
    if (thro === void 0) {
      thro = kThrow;
    }

    if (name === void 0) {
      name = 'iterator';
    }

    var iterator$$1 = {
      meta: {
        name: name
      },
      next: next,
      throw: thro,
      return: kReturn,
      isSagaIterator: true
    };

    if (typeof Symbol !== 'undefined') {
      iterator$$1[Symbol.iterator] = function () {
        return iterator$$1;
      };
    }

    return iterator$$1;
  }
  /**
    Print error in a useful way whether in a browser environment
    (with expandable error stack traces), or in a node.js environment
    (text-only log output)
   **/

  function log(level, message, error) {
    if (error === void 0) {
      error = '';
    }

    /*eslint-disable no-console*/
    if (typeof window === 'undefined') {
      console.log("redux-saga " + level + ": " + message + "\n" + (error && error.stack || error));
    } else {
      console[level](message, error);
    }
  }
  var internalErr = function internalErr(err) {
    return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + err + "\n");
  };
  var createSetContextWarning = function createSetContextWarning(ctx, props) {
    return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
  };
  var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
    return function (action) {
      return dispatch(Object.defineProperty(action, SAGA_ACTION, {
        value: true
      }));
    };
  };
  var cloneableGenerator = function cloneableGenerator(generatorFunc) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var history = [];
      var gen = generatorFunc.apply(void 0, args);
      return {
        next: function next(arg) {
          history.push(arg);
          return gen.next(arg);
        },
        clone: function clone() {
          var clonedGen = cloneableGenerator(generatorFunc).apply(void 0, args);
          history.forEach(function (arg) {
            return clonedGen.next(arg);
          });
          return clonedGen;
        },
        return: function _return(value) {
          return gen.return(value);
        },
        throw: function _throw(exception) {
          return gen.throw(exception);
        }
      };
    };
  };
  var shouldTerminate = function shouldTerminate(res) {
    return res === TERMINATE;
  };
  var shouldCancel = function shouldCancel(res) {
    return res === TASK_CANCEL;
  };
  var shouldComplete = function shouldComplete(res) {
    return shouldTerminate(res) || shouldCancel(res);
  };
  function createAllStyleChildCallbacks(shape, parentCallback) {
    var keys = Object.keys(shape);
    var totalCount = keys.length;

    {
      check(totalCount, function (c) {
        return c > 0;
      }, 'createAllStyleChildCallbacks: get an empty array or object');
    }

    var completedCount = 0;
    var completed;
    var results = {};
    var childCallbacks = {};

    function checkEnd() {
      if (completedCount === totalCount) {
        completed = true;

        if (array(shape)) {
          parentCallback(array$1.from(_extends({}, results, {
            length: totalCount
          })));
        } else {
          parentCallback(results);
        }
      }
    }

    keys.forEach(function (key) {
      var chCbAtKey = function chCbAtKey(res, isErr) {
        if (completed) {
          return;
        }

        if (isErr || shouldComplete(res)) {
          parentCallback.cancel();
          parentCallback(res, isErr);
        } else {
          results[key] = res;
          completedCount++;
          checkEnd();
        }
      };

      chCbAtKey.cancel = noop;
      childCallbacks[key] = chCbAtKey;
    });

    parentCallback.cancel = function () {
      if (!completed) {
        completed = true;
        keys.forEach(function (key) {
          return childCallbacks[key].cancel();
        });
      }
    };

    return childCallbacks;
  }

  var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
  var ON_OVERFLOW_THROW = 1;
  var ON_OVERFLOW_DROP = 2;
  var ON_OVERFLOW_SLIDE = 3;
  var ON_OVERFLOW_EXPAND = 4;
  var zeroBuffer = {
    isEmpty: kTrue,
    put: noop,
    take: noop
  };

  function ringBuffer(limit, overflowAction) {
    if (limit === void 0) {
      limit = 10;
    }

    var arr = new Array(limit);
    var length = 0;
    var pushIndex = 0;
    var popIndex = 0;

    var push = function push(it) {
      arr[pushIndex] = it;
      pushIndex = (pushIndex + 1) % limit;
      length++;
    };

    var take = function take() {
      if (length != 0) {
        var it = arr[popIndex];
        arr[popIndex] = null;
        length--;
        popIndex = (popIndex + 1) % limit;
        return it;
      }
    };

    var flush = function flush() {
      var items = [];

      while (length) {
        items.push(take());
      }

      return items;
    };

    return {
      isEmpty: function isEmpty() {
        return length == 0;
      },
      put: function put(it) {
        if (length < limit) {
          push(it);
        } else {
          var doubledLimit;

          switch (overflowAction) {
            case ON_OVERFLOW_THROW:
              throw new Error(BUFFER_OVERFLOW);

            case ON_OVERFLOW_SLIDE:
              arr[pushIndex] = it;
              pushIndex = (pushIndex + 1) % limit;
              popIndex = pushIndex;
              break;

            case ON_OVERFLOW_EXPAND:
              doubledLimit = 2 * limit;
              arr = flush();
              length = arr.length;
              pushIndex = arr.length;
              popIndex = 0;
              arr.length = doubledLimit;
              limit = doubledLimit;
              push(it);
              break;

            default: // DROP

          }
        }
      },
      take: take,
      flush: flush
    };
  }

  var none = function none() {
    return zeroBuffer;
  };
  var fixed = function fixed(limit) {
    return ringBuffer(limit, ON_OVERFLOW_THROW);
  };
  var dropping = function dropping(limit) {
    return ringBuffer(limit, ON_OVERFLOW_DROP);
  };
  var sliding = function sliding(limit) {
    return ringBuffer(limit, ON_OVERFLOW_SLIDE);
  };
  var expanding = function expanding(initialSize) {
    return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
  };

  var buffers = /*#__PURE__*/Object.freeze({
    none: none,
    fixed: fixed,
    dropping: dropping,
    sliding: sliding,
    expanding: expanding
  });

  var queue = [];
  /**
    Variable to hold a counting semaphore
    - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
      already suspended)
    - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
      triggers flushing the queued tasks.
  **/

  var semaphore = 0;
  /**
    Executes a task 'atomically'. Tasks scheduled during this execution will be queued
    and flushed after this task has finished (assuming the scheduler endup in a released
    state).
  **/

  function exec(task) {
    try {
      suspend();
      task();
    } finally {
      release();
    }
  }
  /**
    Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
  **/


  function asap(task) {
    queue.push(task);

    if (!semaphore) {
      suspend();
      flush();
    }
  }
  /**
    Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
    scheduler is released.
  **/

  function suspend() {
    semaphore++;
  }
  /**
    Puts the scheduler in a `released` state.
  **/

  function release() {
    semaphore--;
  }
  /**
    Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
  **/


  function flush() {
    release();
    var task;

    while (!semaphore && (task = queue.shift()) !== undefined) {
      exec(task);
    }
  }

  var array$2 = function array$$1(patterns) {
    return function (input) {
      return patterns.some(function (p) {
        return matcher(p)(input);
      });
    };
  };
  var predicate = function predicate(_predicate) {
    return function (input) {
      return _predicate(input);
    };
  };
  var string$1 = function string$$1(pattern$$1) {
    return function (input) {
      return input.type === String(pattern$$1);
    };
  };
  var symbol$1 = function symbol$$1(pattern$$1) {
    return function (input) {
      return input.type === pattern$$1;
    };
  };
  var wildcard = function wildcard() {
    return kTrue;
  };
  function matcher(pattern$$1) {
    // prettier-ignore
    var matcherCreator = pattern$$1 === '*' ? wildcard : string(pattern$$1) ? string$1 : array(pattern$$1) ? array$2 : stringableFunc(pattern$$1) ? string$1 : func(pattern$$1) ? predicate : symbol(pattern$$1) ? symbol$1 : null;

    if (matcherCreator === null) {
      throw new Error("invalid pattern: " + pattern$$1);
    }

    return matcherCreator(pattern$$1);
  }

  var END = {
    type: CHANNEL_END_TYPE
  };
  var isEnd = function isEnd(a) {
    return a && a.type === CHANNEL_END_TYPE;
  };
  var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
  var UNDEFINED_INPUT_ERROR = "Saga or channel was provided with an undefined action\nHints:\n  - check that your Action Creator returns a non-undefined value\n  - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners";
  function channel$1(buffer$$1) {
    if (buffer$$1 === void 0) {
      buffer$$1 = expanding();
    }

    var closed = false;
    var takers = [];

    {
      check(buffer$$1, buffer, INVALID_BUFFER);
    }

    function checkForbiddenStates() {
      if (closed && takers.length) {
        throw internalErr('Cannot have a closed channel with pending takers');
      }

      if (takers.length && !buffer$$1.isEmpty()) {
        throw internalErr('Cannot have pending takers with non empty buffer');
      }
    }

    function put(input) {
      checkForbiddenStates();

      {
        check(input, notUndef, UNDEFINED_INPUT_ERROR);
      }

      if (closed) {
        return;
      }

      if (takers.length === 0) {
        return buffer$$1.put(input);
      }

      var cb = takers.shift();
      cb(input);
    }

    function take(cb) {
      checkForbiddenStates();

      {
        check(cb, func, "channel.take's callback must be a function");
      }

      if (closed && buffer$$1.isEmpty()) {
        cb(END);
      } else if (!buffer$$1.isEmpty()) {
        cb(buffer$$1.take());
      } else {
        takers.push(cb);

        cb.cancel = function () {
          return remove(takers, cb);
        };
      }
    }

    function flush$$1(cb) {
      checkForbiddenStates(); // TODO: check if some new state should be forbidden now

      {
        check(cb, func, "channel.flush' callback must be a function");
      }

      if (closed && buffer$$1.isEmpty()) {
        cb(END);
        return;
      }

      cb(buffer$$1.flush());
    }

    function close() {
      checkForbiddenStates();

      if (!closed) {
        closed = true;

        if (takers.length) {
          var arr = takers;
          takers = [];

          for (var i = 0, len = arr.length; i < len; i++) {
            var taker = arr[i];
            taker(END);
          }
        }
      }
    }

    return {
      take: take,
      put: put,
      flush: flush$$1,
      close: close
    };
  }
  function eventChannel(subscribe, buffer$$1) {
    if (buffer$$1 === void 0) {
      buffer$$1 = none();
    }

    var closed = false;
    var unsubscribe;
    var chan = channel$1(buffer$$1);

    var close = function close() {
      if (func(unsubscribe)) {
        unsubscribe();
      }

      chan.close();
    };

    unsubscribe = subscribe(function (input) {
      if (isEnd(input)) {
        close();
        closed = true;
        return;
      }

      chan.put(input);
    });

    if (!func(unsubscribe)) {
      throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
    }

    unsubscribe = once(unsubscribe);

    if (closed) {
      unsubscribe();
    }

    return {
      take: chan.take,
      flush: chan.flush,
      close: close
    };
  }
  function multicastChannel() {
    var _ref;

    var closed = false;
    var currentTakers = [];
    var nextTakers = currentTakers;

    var ensureCanMutateNextTakers = function ensureCanMutateNextTakers() {
      if (nextTakers !== currentTakers) {
        return;
      }

      nextTakers = currentTakers.slice();
    }; // TODO: check if its possible to extract closing function and reuse it in both unicasts and multicasts


    var close = function close() {
      closed = true;
      var takers = currentTakers = nextTakers;
      takers.forEach(function (taker) {
        taker(END);
      });
      nextTakers = [];
    };

    return _ref = {}, _ref[MULTICAST] = true, _ref.put = function put(input) {
      // TODO: should I check forbidden state here? 1 of them is even impossible
      // as we do not possibility of buffer here
      {
        check(input, notUndef, UNDEFINED_INPUT_ERROR);
      }

      if (closed) {
        return;
      }

      if (isEnd(input)) {
        close();
        return;
      }

      var takers = currentTakers = nextTakers;
      takers.forEach(function (taker) {
        if (taker[MATCH](input)) {
          taker.cancel();
          taker(input);
        }
      });
    }, _ref.take = function take(cb, matcher$$1) {
      if (matcher$$1 === void 0) {
        matcher$$1 = wildcard;
      }

      if (closed) {
        cb(END);
        return;
      }

      cb[MATCH] = matcher$$1;
      ensureCanMutateNextTakers();
      nextTakers.push(cb);
      cb.cancel = once(function () {
        ensureCanMutateNextTakers();
        remove(nextTakers, cb);
      });
    }, _ref.close = close, _ref;
  }
  function stdChannel() {
    var chan = multicastChannel();
    var put = chan.put;

    chan.put = function (input) {
      if (input[SAGA_ACTION]) {
        put(input);
        return;
      }

      asap(function () {
        return put(input);
      });
    };

    return chan;
  }

  function symbolObservablePonyfill(root) {
    var result;
    var Symbol = root.Symbol;

    if (typeof Symbol === 'function') {
      if (Symbol.observable) {
        result = Symbol.observable;
      } else {
        result = Symbol('observable');
        Symbol.observable = result;
      }
    } else {
      result = '@@observable';
    }

    return result;
  }

  /* global window */
  var root;

  if (typeof self !== 'undefined') {
    root = self;
  } else if (typeof window !== 'undefined') {
    root = window;
  } else if (typeof global !== 'undefined') {
    root = global;
  } else if (typeof module !== 'undefined') {
    root = module;
  } else {
    root = Function('return this')();
  }

  var result = symbolObservablePonyfill(root);

  /**
   * These are private action types reserved by Redux.
   * For any unknown actions, you must return the current state.
   * If the current state is undefined, you must return the initial state.
   * Do not reference these action types directly in your code.
   */

  var ActionTypes = {
    INIT: '@@redux/INIT' + Math.random().toString(36).substring(7).split('').join('.'),
    REPLACE: '@@redux/REPLACE' + Math.random().toString(36).substring(7).split('').join('.')
  };
  /**
   * Prints a warning in the console if it exists.
   *
   * @param {String} message The warning message.
   * @returns {void}
   */


  function warning(message) {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
    /* eslint-enable no-console */


    try {
      // This error was thrown as a convenience so that if you enable
      // "break on all exceptions" in your console,
      // it would pause the execution at this line.
      throw new Error(message);
    } catch (e) {} // eslint-disable-line no-empty

  }
  /**
   * Composes single-argument functions from right to left. The rightmost
   * function can take multiple arguments as it provides the signature for
   * the resulting composite function.
   *
   * @param {...Function} funcs The functions to compose.
   * @returns {Function} A function obtained by composing the argument functions
   * from right to left. For example, compose(f, g, h) is identical to doing
   * (...args) => f(g(h(...args))).
   */


  function compose() {
    for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }

    if (funcs.length === 0) {
      return function (arg) {
        return arg;
      };
    }

    if (funcs.length === 1) {
      return funcs[0];
    }

    return funcs.reduce(function (a, b) {
      return function () {
        return a(b.apply(undefined, arguments));
      };
    });
  }
  /*
   * This is a dummy function to check if the function name has been altered by minification.
   * If the function has been minified and NODE_ENV !== 'production', warn the user.
   */


  function isCrushed() {}

  if (typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
    warning("You are currently using minified code outside of NODE_ENV === 'production'. " + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
  }

  function deferred() {
    var def = {};
    def.promise = new Promise(function (resolve, reject) {
      def.resolve = resolve;
      def.reject = reject;
    });
    return def;
  }

  var TAKE = 'TAKE';
  var PUT = 'PUT';
  var ALL = 'ALL';
  var RACE = 'RACE';
  var CALL = 'CALL';
  var CPS = 'CPS';
  var FORK = 'FORK';
  var JOIN = 'JOIN';
  var CANCEL$1 = 'CANCEL';
  var SELECT = 'SELECT';
  var ACTION_CHANNEL = 'ACTION_CHANNEL';
  var CANCELLED = 'CANCELLED';
  var FLUSH = 'FLUSH';
  var GET_CONTEXT = 'GET_CONTEXT';
  var SET_CONTEXT = 'SET_CONTEXT';

  function formatLocation(fileName, lineNumber) {
    return fileName + "?" + lineNumber;
  }

  function getLocation(instrumented) {
    return instrumented[SAGA_LOCATION];
  }

  function effectLocationAsString(effect) {
    var location = getLocation(effect);

    if (location) {
      var code = location.code,
          fileName = location.fileName,
          lineNumber = location.lineNumber;
      var source = code + "  " + formatLocation(fileName, lineNumber);
      return source;
    }

    return '';
  }

  function sagaLocationAsString(sagaMeta) {
    var name = sagaMeta.name,
        location = sagaMeta.location;

    if (location) {
      return name + "  " + formatLocation(location.fileName, location.lineNumber);
    }

    return name;
  }

  var flatMap = function flatMap(arr, getter) {
    if (getter === void 0) {
      getter = function getter(f) {
        return f;
      };
    }

    return arr.reduce(function (acc, i) {
      return acc.concat(getter(i));
    }, []);
  };

  function cancelledTasksAsString(sagaStack) {
    var cancelledTasks = flatMap(sagaStack, function (i) {
      return i.cancelledTasks;
    });

    if (!cancelledTasks.length) {
      return '';
    }

    return ['Tasks cancelled due to error:'].concat(cancelledTasks).join('\n');
  }
  /**
      @param {saga, effect}[] sagaStack
      @returns {string}

      @example
      The above error occurred in task errorInPutSaga {pathToFile}
      when executing effect put({type: 'REDUCER_ACTION_ERROR_IN_PUT'}) {pathToFile}
          created by fetchSaga {pathToFile}
          created by rootSaga {pathToFile}
  */


  function sagaStackToString(sagaStack) {
    var firstSaga = sagaStack[0],
        otherSagas = sagaStack.slice(1);
    var crashedEffectLocation = firstSaga.effect ? effectLocationAsString(firstSaga.effect) : null;
    var errorMessage = "The above error occurred in task " + sagaLocationAsString(firstSaga.meta) + (crashedEffectLocation ? " \n when executing effect " + crashedEffectLocation : '');
    return [errorMessage].concat(otherSagas.map(function (s) {
      return "    created by " + sagaLocationAsString(s.meta);
    }), [cancelledTasksAsString(sagaStack)]).join('\n');
  }
  function addSagaStack(errorObject, errorStack) {
    if (typeof errorObject === 'object') {
      if (typeof errorObject.sagaStack === 'undefined') {
        // property is used as a stack of descriptors for failed sagas
        // after formatting to string it will be re-written
        // to pass sagaStack as a string in user land
        Object.defineProperty(errorObject, 'sagaStack', {
          value: [],
          writable: true,
          enumerable: false
        });
      }

      errorObject.sagaStack.push(errorStack);
    }
  }

  function getMetaInfo(fn) {
    return {
      name: fn.name || 'anonymous',
      location: getLocation(fn)
    };
  }

  function getIteratorMetaInfo(iterator$$1, fn) {
    if (iterator$$1.isSagaIterator) {
      return {
        name: iterator$$1.meta.name
      };
    }

    return getMetaInfo(fn);
  }
  /**
    Used to track a parent task and its forks
    In the new fork model, forked tasks are attached by default to their parent
    We model this using the concept of Parent task && main Task
    main task is the main flow of the current Generator, the parent tasks is the
    aggregation of the main tasks + all its forked tasks.
    Thus the whole model represents an execution tree with multiple branches (vs the
    linear execution tree in sequential (non parallel) programming)

    A parent tasks has the following semantics
    - It completes if all its forks either complete or all cancelled
    - If it's cancelled, all forks are cancelled as well
    - It aborts if any uncaught error bubbles up from forks
    - If it completes, the return value is the one returned by the main task
  **/


  function forkQueue(mainTask, onAbort, cb) {
    var tasks = [],
        result,
        completed = false;
    addTask(mainTask);

    var getTasks = function getTasks() {
      return tasks;
    };

    var getTaskNames = function getTaskNames() {
      return tasks.map(function (t) {
        return t.meta.name;
      });
    };

    function abort(err) {
      onAbort();
      cancelAll();
      cb(err, true);
    }

    function addTask(task$$1) {
      tasks.push(task$$1);

      task$$1.cont = function (res, isErr) {
        if (completed) {
          return;
        }

        remove(tasks, task$$1);
        task$$1.cont = noop;

        if (isErr) {
          abort(res);
        } else {
          if (task$$1 === mainTask) {
            result = res;
          }

          if (!tasks.length) {
            completed = true;
            cb(result);
          }
        }
      }; // task.cont.cancel = task.cancel

    }

    function cancelAll() {
      if (completed) {
        return;
      }

      completed = true;
      tasks.forEach(function (t) {
        t.cont = noop;
        t.cancel();
      });
      tasks = [];
    }

    return {
      addTask: addTask,
      cancelAll: cancelAll,
      abort: abort,
      getTasks: getTasks,
      getTaskNames: getTaskNames
    };
  }

  function createTaskIterator(_ref) {
    var context = _ref.context,
        fn = _ref.fn,
        args = _ref.args;
    // catch synchronous failures; see #152 and #441
    var result, error;

    try {
      result = fn.apply(context, args);
    } catch (err) {
      error = err;
    } // i.e. a generator function returns an iterator


    if (iterator(result)) {
      return result;
    } // do not bubble up synchronous failures for detached forks
    // instead create a failed task. See #152 and #441


    return error ? makeIterator(function () {
      throw error;
    }) : makeIterator(function () {
      var pc;
      var eff = {
        done: false,
        value: result
      };

      var ret = function ret(value) {
        return {
          done: true,
          value: value
        };
      };

      return function (arg) {
        if (!pc) {
          pc = true;
          return eff;
        } else {
          return ret(arg);
        }
      };
    }());
  }

  function proc(env, iterator$$1, parentContext, parentEffectId, meta, cont) {
    var taskContext = Object.create(parentContext);
    var finalRunEffect = env.finalizeRunEffect(runEffect);
    var crashedEffect = null;
    var cancelledDueToErrorTasks = [];
    /**
      Tracks the current effect cancellation
      Each time the generator progresses. calling runEffect will set a new value
      on it. It allows propagating cancellation to child effects
    **/

    next.cancel = noop;
    /**
      Creates a new task descriptor for this generator, We'll also create a main task
      to track the main flow (besides other forked tasks)
    **/

    var task$$1 = newTask(parentEffectId, meta, cont);
    var mainTask = {
      meta: meta,
      cancel: cancelMain,
      _isRunning: true,
      _isCancelled: false
    };
    var taskQueue = forkQueue(mainTask, function onAbort() {
      cancelledDueToErrorTasks.push.apply(cancelledDueToErrorTasks, taskQueue.getTaskNames());
    }, end);
    /**
      cancellation of the main task. We'll simply resume the Generator with a Cancel
    **/

    function cancelMain() {
      if (mainTask._isRunning && !mainTask._isCancelled) {
        mainTask._isCancelled = true;
        next(TASK_CANCEL);
      }
    }
    /**
      This may be called by a parent generator to trigger/propagate cancellation
      cancel all pending tasks (including the main task), then end the current task.
       Cancellation propagates down to the whole execution tree holded by this Parent task
      It's also propagated to all joiners of this task and their execution tree/joiners
       Cancellation is noop for terminated/Cancelled tasks tasks
    **/


    function cancel() {
      /**
        We need to check both Running and Cancelled status
        Tasks can be Cancelled but still Running
      **/
      if (task$$1._isRunning && !task$$1._isCancelled) {
        task$$1._isCancelled = true;
        taskQueue.cancelAll();
        /**
          Ending with a Never result will propagate the Cancellation to all joiners
        **/

        end(TASK_CANCEL);
      }
    }
    /**
      attaches cancellation logic to this task's continuation
      this will permit cancellation to propagate down the call chain
    **/


    cont && (cont.cancel = cancel); // kicks up the generator

    next(); // then return the task descriptor to the caller

    return task$$1;
    /**
      This is the generator driver
      It's a recursive async/continuation function which calls itself
      until the generator terminates or throws
    **/

    function next(arg, isErr) {
      // Preventive measure. If we end up here, then there is really something wrong
      if (!mainTask._isRunning) {
        throw new Error('Trying to resume an already finished generator');
      }

      try {
        var result;

        if (isErr) {
          result = iterator$$1.throw(arg);
        } else if (shouldCancel(arg)) {
          /**
            getting TASK_CANCEL automatically cancels the main task
            We can get this value here
             - By cancelling the parent task manually
            - By joining a Cancelled task
          **/
          mainTask._isCancelled = true;
          /**
            Cancels the current effect; this will propagate the cancellation down to any called tasks
          **/

          next.cancel();
          /**
            If this Generator has a `return` method then invokes it
            This will jump to the finally block
          **/

          result = func(iterator$$1.return) ? iterator$$1.return(TASK_CANCEL) : {
            done: true,
            value: TASK_CANCEL
          };
        } else if (shouldTerminate(arg)) {
          // We get TERMINATE flag, i.e. by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
          result = func(iterator$$1.return) ? iterator$$1.return() : {
            done: true
          };
        } else {
          result = iterator$$1.next(arg);
        }

        if (!result.done) {
          digestEffect(result.value, parentEffectId, '', next);
        } else {
          /**
            This Generator has ended, terminate the main task and notify the fork queue
          **/
          mainTask._isRunning = false;
          mainTask.cont(result.value);
        }
      } catch (error) {
        if (mainTask._isCancelled) {
          env.logError(error);
        }

        mainTask._isRunning = false;
        mainTask.cont(error, true);
      }
    }

    function end(result, isErr) {
      task$$1._isRunning = false; // stdChannel.close()

      if (!isErr) {
        task$$1._result = result;
        task$$1._deferredEnd && task$$1._deferredEnd.resolve(result);
      } else {
        addSagaStack(result, {
          meta: meta,
          effect: crashedEffect,
          cancelledTasks: cancelledDueToErrorTasks
        });

        if (!task$$1.cont) {
          if (result && result.sagaStack) {
            result.sagaStack = sagaStackToString(result.sagaStack);
          }

          if (env.onError) {
            env.onError(result);
          } else {
            // TODO: could we skip this when _deferredEnd is attached?
            env.logError(result);
          }
        }

        task$$1._error = result;
        task$$1._isAborted = true;
        task$$1._deferredEnd && task$$1._deferredEnd.reject(result);
      }

      task$$1.cont && task$$1.cont(result, isErr);
      task$$1.joiners.forEach(function (j) {
        return j.cb(result, isErr);
      });
      task$$1.joiners = null;
    }

    function runEffect(effect, effectId, currCb) {
      /**
        each effect runner must attach its own logic of cancellation to the provided callback
        it allows this generator to propagate cancellation downward.
         ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
        And the setup must occur before calling the callback
         This is a sort of inversion of control: called async functions are responsible
        of completing the flow by calling the provided continuation; while caller functions
        are responsible for aborting the current flow by calling the attached cancel function
         Library users can attach their own cancellation logic to promises by defining a
        promise[CANCEL] method in their returned promises
        ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
      **/
      if (promise(effect)) {
        resolvePromise(effect, currCb);
      } else if (iterator(effect)) {
        resolveIterator(effect, effectId, meta, currCb);
      } else if (effect && effect[IO]) {
        var type = effect.type,
            payload = effect.payload;
        if (type === TAKE) runTakeEffect(payload, currCb);else if (type === PUT) runPutEffect(payload, currCb);else if (type === ALL) runAllEffect(payload, effectId, currCb);else if (type === RACE) runRaceEffect(payload, effectId, currCb);else if (type === CALL) runCallEffect(payload, effectId, currCb);else if (type === CPS) runCPSEffect(payload, currCb);else if (type === FORK) runForkEffect(payload, effectId, currCb);else if (type === JOIN) runJoinEffect(payload, currCb);else if (type === CANCEL$1) runCancelEffect(payload, currCb);else if (type === SELECT) runSelectEffect(payload, currCb);else if (type === ACTION_CHANNEL) runChannelEffect(payload, currCb);else if (type === FLUSH) runFlushEffect(payload, currCb);else if (type === CANCELLED) runCancelledEffect(payload, currCb);else if (type === GET_CONTEXT) runGetContextEffect(payload, currCb);else if (type === SET_CONTEXT) runSetContextEffect(payload, currCb);else currCb(effect);
      } else {
        // anything else returned as is
        currCb(effect);
      }
    }

    function digestEffect(effect, parentEffectId, label, cb) {
      if (label === void 0) {
        label = '';
      }

      var effectId = uid();
      env.sagaMonitor && env.sagaMonitor.effectTriggered({
        effectId: effectId,
        parentEffectId: parentEffectId,
        label: label,
        effect: effect
      });
      /**
        completion callback and cancel callback are mutually exclusive
        We can't cancel an already completed effect
        And We can't complete an already cancelled effectId
      **/

      var effectSettled; // Completion callback passed to the appropriate effect runner

      function currCb(res, isErr) {
        if (effectSettled) {
          return;
        }

        effectSettled = true;
        cb.cancel = noop; // defensive measure

        if (env.sagaMonitor) {
          if (isErr) {
            env.sagaMonitor.effectRejected(effectId, res);
          } else {
            env.sagaMonitor.effectResolved(effectId, res);
          }
        }

        if (isErr) {
          crashedEffect = effect;
        }

        cb(res, isErr);
      } // tracks down the current cancel


      currCb.cancel = noop; // setup cancellation logic on the parent cb

      cb.cancel = function () {
        // prevents cancelling an already completed effect
        if (effectSettled) {
          return;
        }

        effectSettled = true;
        /**
          propagates cancel downward
          catch uncaught cancellations errors; since we can no longer call the completion
          callback, log errors raised during cancellations into the console
        **/

        try {
          currCb.cancel();
        } catch (err) {
          env.logError(err);
        }

        currCb.cancel = noop; // defensive measure

        env.sagaMonitor && env.sagaMonitor.effectCancelled(effectId);
      };

      finalRunEffect(effect, effectId, currCb);
    }

    function resolvePromise(promise$$1, cb) {
      var cancelPromise = promise$$1[CANCEL];

      if (func(cancelPromise)) {
        cb.cancel = cancelPromise;
      } else if (func(promise$$1.abort)) {
        cb.cancel = function () {
          return promise$$1.abort();
        };
      }

      promise$$1.then(cb, function (error) {
        return cb(error, true);
      });
    }

    function resolveIterator(iterator$$1, effectId, meta, cb) {
      proc(env, iterator$$1, taskContext, effectId, meta, cb);
    }

    function runTakeEffect(_ref2, cb) {
      var _ref2$channel = _ref2.channel,
          channel$$1 = _ref2$channel === void 0 ? env.stdChannel : _ref2$channel,
          pattern$$1 = _ref2.pattern,
          maybe = _ref2.maybe;

      var takeCb = function takeCb(input) {
        if (input instanceof Error) {
          cb(input, true);
          return;
        }

        if (isEnd(input) && !maybe) {
          cb(TERMINATE);
          return;
        }

        cb(input);
      };

      try {
        channel$$1.take(takeCb, notUndef(pattern$$1) ? matcher(pattern$$1) : null);
      } catch (err) {
        cb(err, true);
        return;
      }

      cb.cancel = takeCb.cancel;
    }

    function runPutEffect(_ref3, cb) {
      var channel$$1 = _ref3.channel,
          action = _ref3.action,
          resolve = _ref3.resolve;

      /**
        Schedule the put in case another saga is holding a lock.
        The put will be executed atomically. ie nested puts will execute after
        this put has terminated.
      **/
      asap(function () {
        var result;

        try {
          result = (channel$$1 ? channel$$1.put : env.dispatch)(action);
        } catch (error) {
          cb(error, true);
          return;
        }

        if (resolve && promise(result)) {
          resolvePromise(result, cb);
        } else {
          cb(result);
        }
      }); // Put effects are non cancellables
    }

    function runCallEffect(_ref4, effectId, cb) {
      var context = _ref4.context,
          fn = _ref4.fn,
          args = _ref4.args;
      var result; // catch synchronous failures; see #152

      try {
        result = fn.apply(context, args);
      } catch (error) {
        cb(error, true);
        return;
      }

      return promise(result) ? resolvePromise(result, cb) : iterator(result) ? resolveIterator(result, effectId, getMetaInfo(fn), cb) : cb(result);
    }

    function runCPSEffect(_ref5, cb) {
      var context = _ref5.context,
          fn = _ref5.fn,
          args = _ref5.args;

      // CPS (ie node style functions) can define their own cancellation logic
      // by setting cancel field on the cb
      // catch synchronous failures; see #152
      try {
        var cpsCb = function cpsCb(err, res) {
          return undef(err) ? cb(res) : cb(err, true);
        };

        fn.apply(context, args.concat(cpsCb));

        if (cpsCb.cancel) {
          cb.cancel = function () {
            return cpsCb.cancel();
          };
        }
      } catch (error) {
        cb(error, true);
      }
    }

    function runForkEffect(_ref6, effectId, cb) {
      var context = _ref6.context,
          fn = _ref6.fn,
          args = _ref6.args,
          detached = _ref6.detached;
      var taskIterator = createTaskIterator({
        context: context,
        fn: fn,
        args: args
      });
      var meta = getIteratorMetaInfo(taskIterator, fn);

      try {
        suspend();

        var _task = proc(env, taskIterator, taskContext, effectId, meta, detached ? null : noop);

        if (detached) {
          cb(_task);
        } else {
          if (_task._isRunning) {
            taskQueue.addTask(_task);
            cb(_task);
          } else if (_task._error) {
            taskQueue.abort(_task._error);
          } else {
            cb(_task);
          }
        }
      } finally {
        flush();
      } // Fork effects are non cancellables

    }

    function runJoinEffect(taskOrTasks, cb) {
      if (array(taskOrTasks)) {
        if (taskOrTasks.length === 0) {
          cb([]);
          return;
        }

        var childCallbacks = createAllStyleChildCallbacks(taskOrTasks, cb);
        taskOrTasks.forEach(function (t, i) {
          joinSingleTask(t, childCallbacks[i]);
        });
      } else {
        joinSingleTask(taskOrTasks, cb);
      }
    }

    function joinSingleTask(taskToJoin, cb) {
      if (taskToJoin.isRunning()) {
        var joiner = {
          task: task$$1,
          cb: cb
        };

        cb.cancel = function () {
          return remove(taskToJoin.joiners, joiner);
        };

        taskToJoin.joiners.push(joiner);
      } else {
        if (taskToJoin.isAborted()) {
          cb(taskToJoin.error(), true);
        } else {
          cb(taskToJoin.result());
        }
      }
    }

    function runCancelEffect(taskOrTasks, cb) {
      if (taskOrTasks === SELF_CANCELLATION) {
        cancelSingleTask(task$$1);
      } else if (array(taskOrTasks)) {
        taskOrTasks.forEach(cancelSingleTask);
      } else {
        cancelSingleTask(taskOrTasks);
      }

      cb(); // cancel effects are non cancellables
    }

    function cancelSingleTask(taskToCancel) {
      if (taskToCancel.isRunning()) {
        taskToCancel.cancel();
      }
    }

    function runAllEffect(effects, effectId, cb) {
      var keys = Object.keys(effects);

      if (keys.length === 0) {
        cb(array(effects) ? [] : {});
        return;
      }

      var childCallbacks = createAllStyleChildCallbacks(effects, cb);
      keys.forEach(function (key) {
        return digestEffect(effects[key], effectId, key, childCallbacks[key]);
      });
    }

    function runRaceEffect(effects, effectId, cb) {
      var completed;
      var keys = Object.keys(effects);
      var childCbs = {};
      keys.forEach(function (key) {
        var chCbAtKey = function chCbAtKey(res, isErr) {
          if (completed) {
            return;
          }

          if (isErr || shouldComplete(res)) {
            // Race Auto cancellation
            cb.cancel();
            cb(res, isErr);
          } else {
            var _response;

            cb.cancel();
            completed = true;
            var response = (_response = {}, _response[key] = res, _response);
            cb(array(effects) ? array$1.from(_extends({}, response, {
              length: keys.length
            })) : response);
          }
        };

        chCbAtKey.cancel = noop;
        childCbs[key] = chCbAtKey;
      });

      cb.cancel = function () {
        // prevents unnecessary cancellation
        if (!completed) {
          completed = true;
          keys.forEach(function (key) {
            return childCbs[key].cancel();
          });
        }
      };

      keys.forEach(function (key) {
        if (completed) {
          return;
        }

        digestEffect(effects[key], effectId, key, childCbs[key]);
      });
    }

    function runSelectEffect(_ref7, cb) {
      var selector = _ref7.selector,
          args = _ref7.args;

      try {
        var state = selector.apply(void 0, [env.getState()].concat(args));
        cb(state);
      } catch (error) {
        cb(error, true);
      }
    }

    function runChannelEffect(_ref8, cb) {
      var pattern$$1 = _ref8.pattern,
          buffer$$1 = _ref8.buffer;
      // TODO: rethink how END is handled
      var chan = channel$1(buffer$$1);
      var match = matcher(pattern$$1);

      var taker = function taker(action) {
        if (!isEnd(action)) {
          env.stdChannel.take(taker, match);
        }

        chan.put(action);
      };

      env.stdChannel.take(taker, match);
      cb(chan);
    }

    function runCancelledEffect(data, cb) {
      cb(Boolean(mainTask._isCancelled));
    }

    function runFlushEffect(channel$$1, cb) {
      channel$$1.flush(cb);
    }

    function runGetContextEffect(prop, cb) {
      cb(taskContext[prop]);
    }

    function runSetContextEffect(props, cb) {
      object$1.assign(taskContext, props);
      cb();
    }

    function newTask(id, meta, cont) {
      var _task2;

      var task$$1 = (_task2 = {}, _task2[TASK] = true, _task2.id = id, _task2.meta = meta, _task2._deferredEnd = null, _task2.toPromise = function toPromise() {
        if (task$$1._deferredEnd) {
          return task$$1._deferredEnd.promise;
        }

        var def = deferred();
        task$$1._deferredEnd = def;

        if (!task$$1._isRunning) {
          if (task$$1._isAborted) {
            def.reject(task$$1._error);
          } else {
            def.resolve(task$$1._result);
          }
        }

        return def.promise;
      }, _task2.cont = cont, _task2.joiners = [], _task2.cancel = cancel, _task2._isRunning = true, _task2._isCancelled = false, _task2._isAborted = false, _task2._result = undefined, _task2._error = undefined, _task2.isRunning = function isRunning() {
        return task$$1._isRunning;
      }, _task2.isCancelled = function isCancelled() {
        return task$$1._isCancelled;
      }, _task2.isAborted = function isAborted() {
        return task$$1._isAborted;
      }, _task2.result = function result() {
        return task$$1._result;
      }, _task2.error = function error() {
        return task$$1._error;
      }, _task2.setContext = function setContext(props) {
        {
          check(props, object, createSetContextWarning('task', props));
        }

        object$1.assign(taskContext, props);
      }, _task2);
      return task$$1;
    }
  }

  var RUN_SAGA_SIGNATURE = 'runSaga(options, saga, ...args)';
  var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ": saga argument must be a Generator function!";
  function runSaga(options, saga) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    {
      check(saga, func, NON_GENERATOR_ERR);
    }

    var iterator$$1 = saga.apply(void 0, args);

    {
      check(iterator$$1, iterator, NON_GENERATOR_ERR);
    }

    var _options$channel = options.channel,
        channel$$1 = _options$channel === void 0 ? stdChannel() : _options$channel,
        dispatch = options.dispatch,
        getState = options.getState,
        _options$context = options.context,
        context = _options$context === void 0 ? {} : _options$context,
        sagaMonitor = options.sagaMonitor,
        logger = options.logger,
        effectMiddlewares = options.effectMiddlewares,
        onError = options.onError;
    var effectId = uid();

    if (sagaMonitor) {
      // monitors are expected to have a certain interface, let's fill-in any missing ones
      sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || noop;
      sagaMonitor.effectResolved = sagaMonitor.effectResolved || noop;
      sagaMonitor.effectRejected = sagaMonitor.effectRejected || noop;
      sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || noop;
      sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || noop;
      sagaMonitor.effectTriggered({
        effectId: effectId,
        root: true,
        parentEffectId: 0,
        effect: {
          root: true,
          saga: saga,
          args: args
        }
      });
    }

    if (notUndef(effectMiddlewares)) {
      var MIDDLEWARE_TYPE_ERROR = 'effectMiddlewares must be an array of functions';
      check(effectMiddlewares, array, MIDDLEWARE_TYPE_ERROR);
      effectMiddlewares.forEach(function (effectMiddleware) {
        return check(effectMiddleware, func, MIDDLEWARE_TYPE_ERROR);
      });
    }

    {
      if (notUndef(onError)) {
        check(onError, func, 'onError must be a function');
      }
    }

    var log$$1 = logger || log;

    var logError = function logError(err) {
      log$$1('error', err);

      if (err && err.sagaStack) {
        log$$1('error', err.sagaStack);
      }
    };

    var middleware = effectMiddlewares && compose.apply(void 0, effectMiddlewares);

    var finalizeRunEffect = function finalizeRunEffect(runEffect) {
      if (func(middleware)) {
        return function finalRunEffect(effect, effectId, currCb) {
          var plainRunEffect = function plainRunEffect(eff) {
            return runEffect(eff, effectId, currCb);
          };

          return middleware(plainRunEffect)(effect);
        };
      } else {
        return runEffect;
      }
    };

    var env = {
      stdChannel: channel$$1,
      dispatch: wrapSagaDispatch(dispatch),
      getState: getState,
      sagaMonitor: sagaMonitor,
      logError: logError,
      onError: onError,
      finalizeRunEffect: finalizeRunEffect
    };
    var task$$1 = proc(env, iterator$$1, context, effectId, getMetaInfo(saga), null);

    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task$$1);
    }

    return task$$1;
  }

  function sagaMiddlewareFactory(_ref) {
    if (_ref === void 0) {
      _ref = {};
    }

    var _ref2 = _ref,
        _ref2$context = _ref2.context,
        context = _ref2$context === void 0 ? {} : _ref2$context,
        options = _objectWithoutProperties(_ref2, ["context"]);

    var sagaMonitor = options.sagaMonitor,
        logger = options.logger,
        onError = options.onError,
        effectMiddlewares = options.effectMiddlewares;
    var boundRunSaga;

    {
      if (notUndef(logger)) {
        check(logger, func, 'options.logger passed to the Saga middleware is not a function!');
      }

      if (notUndef(onError)) {
        check(onError, func, 'options.onError passed to the Saga middleware is not a function!');
      }

      if (notUndef(options.emitter)) {
        check(options.emitter, func, 'options.emitter passed to the Saga middleware is not a function!');
      }
    }

    function sagaMiddleware(_ref3) {
      var getState = _ref3.getState,
          dispatch = _ref3.dispatch;
      var channel$$1 = stdChannel();
      channel$$1.put = (options.emitter || identity)(channel$$1.put);
      boundRunSaga = runSaga.bind(null, {
        context: context,
        channel: channel$$1,
        dispatch: dispatch,
        getState: getState,
        sagaMonitor: sagaMonitor,
        logger: logger,
        onError: onError,
        effectMiddlewares: effectMiddlewares
      });
      return function (next) {
        return function (action) {
          if (sagaMonitor && sagaMonitor.actionDispatched) {
            sagaMonitor.actionDispatched(action);
          }

          var result = next(action); // hit reducers

          channel$$1.put(action);
          return result;
        };
      };
    }

    sagaMiddleware.run = function () {
      if (!boundRunSaga) {
        throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
      }

      return boundRunSaga.apply(void 0, arguments);
    };

    sagaMiddleware.setContext = function (props) {
      {
        check(props, object, createSetContextWarning('sagaMiddleware', props));
      }

      object$1.assign(context, props);
    };

    return sagaMiddleware;
  }

  function delayP(ms) {
    var timeoutId;
    var promise = new Promise(function (resolve) {
      timeoutId = setTimeout(resolve, ms, true);
    });

    promise[CANCEL] = function () {
      clearTimeout(timeoutId);
    };

    return promise;
  }

  var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

  var makeEffect = function makeEffect(type, payload) {
    var _ref;

    return _ref = {}, _ref[IO] = true, _ref.type = type, _ref.payload = payload, _ref;
  };

  var isForkEffect = function isForkEffect(eff) {
    return eff && eff[IO] && eff.type === 'FORK';
  };

  var detach = function detach(eff) {
    {
      check(eff, isForkEffect, 'detach(eff): argument must be a fork effect');
    }

    eff.payload.detached = true;
    return eff;
  };
  function take(patternOrChannel, multicastPattern) {
    if (patternOrChannel === void 0) {
      patternOrChannel = '*';
    }

    if (arguments.length) {
      check(arguments[0], notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
    }

    if (pattern(patternOrChannel)) {
      return makeEffect(TAKE, {
        pattern: patternOrChannel
      });
    }

    if (multicast(patternOrChannel) && notUndef(multicastPattern) && pattern(multicastPattern)) {
      return makeEffect(TAKE, {
        channel: patternOrChannel,
        pattern: multicastPattern
      });
    }

    if (channel(patternOrChannel)) {
      return makeEffect(TAKE, {
        channel: patternOrChannel
      });
    }

    throw new Error("take(patternOrChannel): argument " + patternOrChannel + " is not valid channel or a valid pattern");
  }
  var takeMaybe = function takeMaybe() {
    var eff = take.apply(void 0, arguments);
    eff.payload.maybe = true;
    return eff;
  };
  function put(channel$$1, action) {
    {
      if (arguments.length > 1) {
        check(channel$$1, notUndef, 'put(channel, action): argument channel is undefined');
        check(channel$$1, channel, "put(channel, action): argument " + channel$$1 + " is not a valid channel");
        check(action, notUndef, 'put(channel, action): argument action is undefined');
      } else {
        check(channel$$1, notUndef, 'put(action): argument action is undefined');
      }
    }

    if (undef(action)) {
      action = channel$$1;
      channel$$1 = null;
    }

    return makeEffect(PUT, {
      channel: channel$$1,
      action: action
    });
  }
  var putResolve = function putResolve() {
    var eff = put.apply(void 0, arguments);
    eff.payload.resolve = true;
    return eff;
  };
  function all(effects) {
    return makeEffect(ALL, effects);
  }
  function race(effects) {
    return makeEffect(RACE, effects);
  }

  function getFnCallDesc(meth, fn, args) {
    {
      check(fn, notUndef, meth + ": argument fn is undefined");
    }

    var context = null;

    if (array(fn)) {
      var _fn = fn;
      context = _fn[0];
      fn = _fn[1];
    } else if (fn.fn) {
      var _fn2 = fn;
      context = _fn2.context;
      fn = _fn2.fn;
    }

    if (context && string(fn) && func(context[fn])) {
      fn = context[fn];
    }

    {
      check(fn, func, meth + ": argument " + fn + " is not a function");
    }

    return {
      context: context,
      fn: fn,
      args: args
    };
  }

  function call(fn) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return makeEffect(CALL, getFnCallDesc('call', fn, args));
  }
  function apply(context, fn, args) {
    if (args === void 0) {
      args = [];
    }

    return makeEffect(CALL, getFnCallDesc('apply', {
      context: context,
      fn: fn
    }, args));
  }
  function cps(fn) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return makeEffect(CPS, getFnCallDesc('cps', fn, args));
  }
  function fork(fn) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return makeEffect(FORK, getFnCallDesc('fork', fn, args));
  }
  function spawn(fn) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return detach(fork.apply(void 0, [fn].concat(args)));
  }
  function join(taskOrTasks) {
    {
      if (arguments.length > 1) {
        throw new Error('join(...tasks) is not supported any more. Please use join([...tasks]) to join multiple tasks.');
      }

      if (array(taskOrTasks)) {
        taskOrTasks.forEach(function (t) {
          check(t, task, "join([...tasks]): argument " + t + " is not a valid Task object " + TEST_HINT);
        });
      } else {
        check(taskOrTasks, task, "join(task): argument " + taskOrTasks + " is not a valid Task object " + TEST_HINT);
      }
    }

    return makeEffect(JOIN, taskOrTasks);
  }
  function cancel(taskOrTasks) {
    if (taskOrTasks === void 0) {
      taskOrTasks = SELF_CANCELLATION;
    }

    {
      if (arguments.length > 1) {
        throw new Error('cancel(...tasks) is not supported any more. Please use cancel([...tasks]) to cancel multiple tasks.');
      }

      if (array(taskOrTasks)) {
        taskOrTasks.forEach(function (t) {
          check(t, task, "cancel([...tasks]): argument " + t + " is not a valid Task object " + TEST_HINT);
        });
      } else if (taskOrTasks !== SELF_CANCELLATION && notUndef(taskOrTasks)) {
        check(taskOrTasks, task, "cancel(task): argument " + taskOrTasks + " is not a valid Task object " + TEST_HINT);
      }
    }

    return makeEffect(CANCEL$1, taskOrTasks);
  }
  function select(selector) {
    if (selector === void 0) {
      selector = identity;
    }

    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
      args[_key5 - 1] = arguments[_key5];
    }

    if (arguments.length) {
      check(arguments[0], notUndef, 'select(selector, [...]): argument selector is undefined');
      check(selector, func, "select(selector, [...]): argument " + selector + " is not a function");
    }

    return makeEffect(SELECT, {
      selector: selector,
      args: args
    });
  }
  /**
    channel(pattern, [buffer])    => creates a proxy channel for store actions
  **/

  function actionChannel(pattern$$1, buffer$$1) {
    {
      check(pattern$$1, notUndef, 'actionChannel(pattern,...): argument pattern is undefined');

      if (arguments.length > 1) {
        check(buffer$$1, notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
        check(buffer$$1, buffer, "actionChannel(pattern, buffer): argument " + buffer$$1 + " is not a valid buffer");
      }
    }

    return makeEffect(ACTION_CHANNEL, {
      pattern: pattern$$1,
      buffer: buffer$$1
    });
  }
  function cancelled() {
    return makeEffect(CANCELLED, {});
  }
  function flush$1(channel$$1) {
    {
      check(channel$$1, channel, "flush(channel): argument " + channel$$1 + " is not valid channel");
    }

    return makeEffect(FLUSH, channel$$1);
  }
  function getContext(prop) {
    {
      check(prop, string, "getContext(prop): argument " + prop + " is not a string");
    }

    return makeEffect(GET_CONTEXT, prop);
  }
  function setContext(props) {
    {
      check(props, object, createSetContextWarning(null, props));
    }

    return makeEffect(SET_CONTEXT, props);
  }
  var delay =
  /*#__PURE__*/
  call.bind(null, delayP);

  var createAsEffectType = function createAsEffectType(type) {
    return function (effect) {
      return effect && effect[IO] && effect.type === type && effect.payload;
    };
  };

  var asEffect = {
    take:
    /*#__PURE__*/
    createAsEffectType(TAKE),
    put:
    /*#__PURE__*/
    createAsEffectType(PUT),
    all:
    /*#__PURE__*/
    createAsEffectType(ALL),
    race:
    /*#__PURE__*/
    createAsEffectType(RACE),
    call:
    /*#__PURE__*/
    createAsEffectType(CALL),
    cps:
    /*#__PURE__*/
    createAsEffectType(CPS),
    fork:
    /*#__PURE__*/
    createAsEffectType(FORK),
    join:
    /*#__PURE__*/
    createAsEffectType(JOIN),
    cancel:
    /*#__PURE__*/
    createAsEffectType(CANCEL$1),
    select:
    /*#__PURE__*/
    createAsEffectType(SELECT),
    actionChannel:
    /*#__PURE__*/
    createAsEffectType(ACTION_CHANNEL),
    cancelled:
    /*#__PURE__*/
    createAsEffectType(CANCELLED),
    flush:
    /*#__PURE__*/
    createAsEffectType(FLUSH),
    getContext:
    /*#__PURE__*/
    createAsEffectType(GET_CONTEXT),
    setContext:
    /*#__PURE__*/
    createAsEffectType(SET_CONTEXT)
  };

  var done = function done(value) {
    return {
      done: true,
      value: value
    };
  };

  var qEnd = {};
  function safeName(patternOrChannel) {
    if (channel(patternOrChannel)) {
      return 'channel';
    }

    if (stringableFunc(patternOrChannel)) {
      return String(patternOrChannel);
    }

    if (func(patternOrChannel)) {
      return patternOrChannel.name;
    }

    return String(patternOrChannel);
  }
  function fsmIterator(fsm, startState, name) {
    var stateUpdater,
        errorState,
        effect,
        nextState = startState;

    function next(arg, error) {
      if (nextState === qEnd) {
        return done(arg);
      }

      if (error && !errorState) {
        nextState = qEnd;
        throw error;
      } else {
        stateUpdater && stateUpdater(arg);
        var currentState = error ? fsm[errorState](error) : fsm[nextState]();
        nextState = currentState.nextState;
        effect = currentState.effect;
        stateUpdater = currentState.stateUpdater;
        errorState = currentState.errorState;
        return nextState === qEnd ? done(arg) : effect;
      }
    }

    return makeIterator(next, function (error) {
      return next(null, error);
    }, name);
  }

  function takeEvery(patternOrChannel, worker) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var yTake = {
      done: false,
      value: take(patternOrChannel)
    };

    var yFork = function yFork(ac) {
      return {
        done: false,
        value: fork.apply(void 0, [worker].concat(args, [ac]))
      };
    };

    var action,
        setAction = function setAction(ac) {
      return action = ac;
    };

    return fsmIterator({
      q1: function q1() {
        return {
          nextState: 'q2',
          effect: yTake,
          stateUpdater: setAction
        };
      },
      q2: function q2() {
        return {
          nextState: 'q1',
          effect: yFork(action)
        };
      }
    }, 'q1', "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
  }

  function takeLatest(patternOrChannel, worker) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var yTake = {
      done: false,
      value: take(patternOrChannel)
    };

    var yFork = function yFork(ac) {
      return {
        done: false,
        value: fork.apply(void 0, [worker].concat(args, [ac]))
      };
    };

    var yCancel = function yCancel(task) {
      return {
        done: false,
        value: cancel(task)
      };
    };

    var task, action;

    var setTask = function setTask(t) {
      return task = t;
    };

    var setAction = function setAction(ac) {
      return action = ac;
    };

    return fsmIterator({
      q1: function q1() {
        return {
          nextState: 'q2',
          effect: yTake,
          stateUpdater: setAction
        };
      },
      q2: function q2() {
        return task ? {
          nextState: 'q3',
          effect: yCancel(task)
        } : {
          nextState: 'q1',
          effect: yFork(action),
          stateUpdater: setTask
        };
      },
      q3: function q3() {
        return {
          nextState: 'q1',
          effect: yFork(action),
          stateUpdater: setTask
        };
      }
    }, 'q1', "takeLatest(" + safeName(patternOrChannel) + ", " + worker.name + ")");
  }

  function takeLeading(patternOrChannel, worker) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var yTake = {
      done: false,
      value: take(patternOrChannel)
    };

    var yCall = function yCall(ac) {
      return {
        done: false,
        value: call.apply(void 0, [worker].concat(args, [ac]))
      };
    };

    var action;

    var setAction = function setAction(ac) {
      return action = ac;
    };

    return fsmIterator({
      q1: function q1() {
        return {
          nextState: 'q2',
          effect: yTake,
          stateUpdater: setAction
        };
      },
      q2: function q2() {
        return {
          nextState: 'q1',
          effect: yCall(action)
        };
      }
    }, 'q1', "takeLeading(" + safeName(patternOrChannel) + ", " + worker.name + ")");
  }

  function throttle(delayLength, pattern, worker) {
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var action, channel;
    var yActionChannel = {
      done: false,
      value: actionChannel(pattern, sliding(1))
    };

    var yTake = function yTake() {
      return {
        done: false,
        value: take(channel)
      };
    };

    var yFork = function yFork(ac) {
      return {
        done: false,
        value: fork.apply(void 0, [worker].concat(args, [ac]))
      };
    };

    var yDelay = {
      done: false,
      value: delay(delayLength)
    };

    var setAction = function setAction(ac) {
      return action = ac;
    };

    var setChannel = function setChannel(ch) {
      return channel = ch;
    };

    return fsmIterator({
      q1: function q1() {
        return {
          nextState: 'q2',
          effect: yActionChannel,
          stateUpdater: setChannel
        };
      },
      q2: function q2() {
        return {
          nextState: 'q3',
          effect: yTake(),
          stateUpdater: setAction
        };
      },
      q3: function q3() {
        return {
          nextState: 'q4',
          effect: yFork(action)
        };
      },
      q4: function q4() {
        return {
          nextState: 'q2',
          effect: yDelay
        };
      }
    }, 'q1', "throttle(" + safeName(pattern) + ", " + worker.name + ")");
  }

  function retry(maxTries, delayLength, fn) {
    var counter = maxTries;

    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var yCall = {
      done: false,
      value: call.apply(void 0, [fn].concat(args))
    };
    var yDelay = {
      done: false,
      value: delay(delayLength)
    };
    return fsmIterator({
      q1: function q1() {
        return {
          nextState: 'q2',
          effect: yCall,
          errorState: 'q10'
        };
      },
      q2: function q2() {
        return {
          nextState: qEnd
        };
      },
      q10: function q10(error) {
        counter -= 1;

        if (counter <= 0) {
          throw error;
        }

        return {
          nextState: 'q1',
          effect: yDelay
        };
      }
    }, 'q1', "retry(" + fn.name + ")");
  }

  function debounceHelper(delayLength, patternOrChannel, worker) {
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var action, raceOutput;
    var yTake = {
      done: false,
      value: take(patternOrChannel)
    };
    var yRace = {
      done: false,
      value: race({
        action: take(patternOrChannel),
        debounce: delay(delayLength)
      })
    };

    var yFork = function yFork(ac) {
      return {
        done: false,
        value: fork.apply(void 0, [worker].concat(args, [ac]))
      };
    };

    var yNoop = function yNoop(value) {
      return {
        done: false,
        value: value
      };
    };

    var setAction = function setAction(ac) {
      return action = ac;
    };

    var setRaceOutput = function setRaceOutput(ro) {
      return raceOutput = ro;
    };

    return fsmIterator({
      q1: function q1() {
        return {
          nextState: 'q2',
          effect: yTake,
          stateUpdater: setAction
        };
      },
      q2: function q2() {
        return {
          nextState: 'q3',
          effect: yRace,
          stateUpdater: setRaceOutput
        };
      },
      q3: function q3() {
        return raceOutput.debounce ? {
          nextState: 'q1',
          effect: yFork(action)
        } : {
          nextState: 'q2',
          effect: yNoop(raceOutput.action),
          stateUpdater: setAction
        };
      }
    }, 'q1', "debounce(" + safeName(patternOrChannel) + ", " + worker.name + ")");
  }

  var validateTakeEffect = function validateTakeEffect(fn, patternOrChannel, worker) {
    check(patternOrChannel, notUndef, fn.name + " requires a pattern or channel");
    check(worker, notUndef, fn.name + " requires a saga parameter");
  };

  function takeEvery$1(patternOrChannel, worker) {
    {
      validateTakeEffect(takeEvery$1, patternOrChannel, worker);
    }

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
  }
  function takeLatest$1(patternOrChannel, worker) {
    {
      validateTakeEffect(takeLatest$1, patternOrChannel, worker);
    }

    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    return fork.apply(void 0, [takeLatest, patternOrChannel, worker].concat(args));
  }
  function takeLeading$1(patternOrChannel, worker) {
    {
      validateTakeEffect(takeLeading$1, patternOrChannel, worker);
    }

    for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      args[_key3 - 2] = arguments[_key3];
    }

    return fork.apply(void 0, [takeLeading, patternOrChannel, worker].concat(args));
  }
  function throttle$1(ms, pattern$$1, worker) {
    {
      check(pattern$$1, notUndef, 'throttle requires a pattern');
      check(worker, notUndef, 'throttle requires a saga parameter');
    }

    for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
      args[_key4 - 3] = arguments[_key4];
    }

    return fork.apply(void 0, [throttle, ms, pattern$$1, worker].concat(args));
  }
  function retry$1(maxTries, delayLength, worker) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
      args[_key5 - 3] = arguments[_key5];
    }

    return call.apply(void 0, [retry, maxTries, delayLength, worker].concat(args));
  }
  function debounce(delayLength, pattern$$1, worker) {
    for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
      args[_key6 - 3] = arguments[_key6];
    }

    return fork.apply(void 0, [debounceHelper, delayLength, pattern$$1, worker].concat(args));
  }



  var effects = /*#__PURE__*/Object.freeze({
    take: take,
    takeMaybe: takeMaybe,
    put: put,
    putResolve: putResolve,
    all: all,
    race: race,
    call: call,
    apply: apply,
    cps: cps,
    fork: fork,
    spawn: spawn,
    join: join,
    cancel: cancel,
    select: select,
    actionChannel: actionChannel,
    cancelled: cancelled,
    flush: flush$1,
    getContext: getContext,
    setContext: setContext,
    delay: delay,
    debounce: debounce,
    retry: retry$1,
    takeEvery: takeEvery$1,
    takeLatest: takeLatest$1,
    takeLeading: takeLeading$1,
    throttle: throttle$1
  });



  var utils = /*#__PURE__*/Object.freeze({
    SAGA_ACTION: SAGA_ACTION,
    TASK: TASK,
    createMockTask: createMockTask,
    cloneableGenerator: cloneableGenerator,
    asEffect: asEffect
  });

  exports.effects = effects;
  exports.utils = utils;
  exports.default = sagaMiddlewareFactory;
  exports.buffers = buffers;
  exports.CANCEL = CANCEL;
  exports.SAGA_LOCATION = SAGA_LOCATION;
  exports.runSaga = runSaga;
  exports.END = END;
  exports.isEnd = isEnd;
  exports.eventChannel = eventChannel;
  exports.channel = channel$1;
  exports.multicastChannel = multicastChannel;
  exports.stdChannel = stdChannel;
  exports.detach = detach;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
