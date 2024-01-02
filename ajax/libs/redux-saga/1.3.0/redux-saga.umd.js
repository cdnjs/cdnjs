(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ReduxSaga = {}));
}(this, function (exports) { 'use strict';

  var createSymbol = function createSymbol(name) {
    return "@@redux-saga/" + name;
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
  createSymbol('LOCATION');

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

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
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
    return pat && (string(pat) || symbol(pat) || func(pat) || array(pat) && pat.every(pattern));
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
  var effect = function effect(eff) {
    return eff && eff[IO];
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

  if ( typeof Proxy !== 'undefined') {
    noop =
    /*#__PURE__*/
    new Proxy(noop, {
      set: function set() {
        throw internalErr('There was an attempt to assign a property to internal `noop` function.');
      }
    });
  }
  var identity = function identity(v) {
    return v;
  };
  var hasSymbol = typeof Symbol === 'function';
  var asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';
  function check(value, predicate, error) {
    if (!predicate(value)) {
      throw new Error(error);
    }
  }
  var assignWithSymbols = function assignWithSymbols(target, source) {
    _extends(target, source);

    if (Object.getOwnPropertySymbols) {
      Object.getOwnPropertySymbols(source).forEach(function (s) {
        target[s] = source[s];
      });
    }
  };
  var flatMap = function flatMap(mapper, arr) {
    var _ref;

    return (_ref = []).concat.apply(_ref, arr.map(mapper));
  };
  function remove(array, item) {
    var index = array.indexOf(item);

    if (index >= 0) {
      array.splice(index, 1);
    }
  }
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

    var iterator = {
      meta: {
        name: name
      },
      next: next,
      throw: thro,
      return: kReturn,
      isSagaIterator: true
    };

    if (typeof Symbol !== 'undefined') {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }
  function logError(error, _ref2) {
    var sagaStack = _ref2.sagaStack;

    /*eslint-disable no-console*/
    console.error(error);
    console.error(sagaStack);
  }
  var internalErr = function internalErr(err) {
    return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + err + "\n");
  };
  var createSetContextWarning = function createSetContextWarning(ctx, props) {
    return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
  };
  var FROZEN_ACTION_ERROR = "You can't put (a.k.a. dispatch from saga) frozen actions.\nWe have to define a special non-enumerable property on those actions for scheduling purposes.\nOtherwise you wouldn't be able to communicate properly between sagas & other subscribers (action ordering would become far less predictable).\nIf you are using redux and you care about this behaviour (frozen actions),\nthen you might want to switch to freezing actions in a middleware rather than in action creator.\nExample implementation:\n\nconst freezeActions = store => next => action => next(Object.freeze(action))\n"; // creates empty, but not-holey array

  var createEmptyArray = function createEmptyArray(n) {
    return Array.apply(null, new Array(n));
  };
  var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
    return function (action) {
      {
        check(action, function (ac) {
          return !Object.isFrozen(ac);
        }, FROZEN_ACTION_ERROR);
      }

      return dispatch(Object.defineProperty(action, SAGA_ACTION, {
        value: true
      }));
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
    var results = array(shape) ? createEmptyArray(totalCount) : {};
    var childCallbacks = {};

    function checkEnd() {
      if (completedCount === totalCount) {
        completed = true;
        parentCallback(results);
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
  function getMetaInfo(fn) {
    return {
      name: fn.name || 'anonymous',
      location: getLocation(fn)
    };
  }
  function getLocation(instrumented) {
    return instrumented[SAGA_LOCATION];
  }
  function compose() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
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
        return a(b.apply(void 0, arguments));
      };
    });
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
    __proto__: null,
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
   * Puts the scheduler in a `suspended` state and executes a task immediately.
   */

  function immediately(task) {
    try {
      suspend();
      return task();
    } finally {
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

  var array$1 = function array(patterns) {
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
  var string$1 = function string(pattern) {
    return function (input) {
      return input.type === String(pattern);
    };
  };
  var symbol$1 = function symbol(pattern) {
    return function (input) {
      return input.type === pattern;
    };
  };
  var wildcard = function wildcard() {
    return kTrue;
  };
  function matcher(pattern) {
    // prettier-ignore
    var matcherCreator = pattern === '*' ? wildcard : string(pattern) ? string$1 : array(pattern) ? array$1 : stringableFunc(pattern) ? string$1 : func(pattern) ? predicate : symbol(pattern) ? symbol$1 : null;

    if (matcherCreator === null) {
      throw new Error("invalid pattern: " + pattern);
    }

    return matcherCreator(pattern);
  }

  var END = {
    type: CHANNEL_END_TYPE
  };
  var isEnd = function isEnd(a) {
    return a && a.type === CHANNEL_END_TYPE;
  };
  var CLOSED_CHANNEL_WITH_TAKERS = 'Cannot have a closed channel with pending takers';
  var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
  var UNDEFINED_INPUT_ERROR = "Saga or channel was provided with an undefined action\nHints:\n  - check that your Action Creator returns a non-undefined value\n  - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners";
  function channel$1(buffer$1) {
    if (buffer$1 === void 0) {
      buffer$1 = expanding();
    }

    var closed = false;
    var takers = [];

    {
      check(buffer$1, buffer, INVALID_BUFFER);
    }

    function checkForbiddenStates() {
      if (closed && takers.length) {
        throw internalErr(CLOSED_CHANNEL_WITH_TAKERS);
      }

      if (takers.length && !buffer$1.isEmpty()) {
        throw internalErr('Cannot have pending takers with non empty buffer');
      }
    }

    function put(input) {
      {
        checkForbiddenStates();
        check(input, notUndef, UNDEFINED_INPUT_ERROR);
      }

      if (closed) {
        return;
      }

      if (takers.length === 0) {
        return buffer$1.put(input);
      }

      var cb = takers.shift();
      cb(input);
    }

    function take(cb) {
      {
        checkForbiddenStates();
        check(cb, func, "channel.take's callback must be a function");
      }

      if (closed && buffer$1.isEmpty()) {
        cb(END);
      } else if (!buffer$1.isEmpty()) {
        cb(buffer$1.take());
      } else {
        takers.push(cb);

        cb.cancel = function () {
          remove(takers, cb);
        };
      }
    }

    function flush(cb) {
      {
        checkForbiddenStates();
        check(cb, func, "channel.flush' callback must be a function");
      }

      if (closed && buffer$1.isEmpty()) {
        cb(END);
        return;
      }

      cb(buffer$1.flush());
    }

    function close() {
      {
        checkForbiddenStates();
      }

      if (closed) {
        return;
      }

      closed = true;
      var arr = takers;
      takers = [];

      for (var i = 0, len = arr.length; i < len; i++) {
        var taker = arr[i];
        taker(END);
      }
    }

    return {
      take: take,
      put: put,
      flush: flush,
      close: close
    };
  }
  function eventChannel(subscribe, buffer) {
    if (buffer === void 0) {
      buffer = none();
    }

    var closed = false;
    var unsubscribe;
    var chan = channel$1(buffer);

    var close = function close() {
      if (closed) {
        return;
      }

      closed = true;

      if (func(unsubscribe)) {
        unsubscribe();
      }

      chan.close();
    };

    unsubscribe = subscribe(function (input) {
      if (isEnd(input)) {
        close();
        return;
      }

      chan.put(input);
    });

    {
      check(unsubscribe, func, 'in eventChannel: subscribe should return a function to unsubscribe');
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

    function checkForbiddenStates() {
      if (closed && nextTakers.length) {
        throw internalErr(CLOSED_CHANNEL_WITH_TAKERS);
      }
    }

    var ensureCanMutateNextTakers = function ensureCanMutateNextTakers() {
      if (nextTakers !== currentTakers) {
        return;
      }

      nextTakers = currentTakers.slice();
    };

    var close = function close() {
      {
        checkForbiddenStates();
      }

      closed = true;
      var takers = currentTakers = nextTakers;
      nextTakers = [];
      takers.forEach(function (taker) {
        taker(END);
      });
    };

    return _ref = {}, _ref[MULTICAST] = true, _ref.put = function put(input) {
      {
        checkForbiddenStates();
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

      for (var i = 0, len = takers.length; i < len; i++) {
        var taker = takers[i];

        if (taker[MATCH](input)) {
          taker.cancel();
          taker(input);
        }
      }
    }, _ref.take = function take(cb, matcher) {
      if (matcher === void 0) {
        matcher = wildcard;
      }

      {
        checkForbiddenStates();
      }

      if (closed) {
        cb(END);
        return;
      }

      cb[MATCH] = matcher;
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
        put(input);
      });
    };

    return chan;
  }

  var RUNNING = 0;
  var CANCELLED = 1;
  var ABORTED = 2;
  var DONE = 3;

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
  var CANCELLED$1 = 'CANCELLED';
  var FLUSH = 'FLUSH';
  var GET_CONTEXT = 'GET_CONTEXT';
  var SET_CONTEXT = 'SET_CONTEXT';

  var effectTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    TAKE: TAKE,
    PUT: PUT,
    ALL: ALL,
    RACE: RACE,
    CALL: CALL,
    CPS: CPS,
    FORK: FORK,
    JOIN: JOIN,
    CANCEL: CANCEL$1,
    SELECT: SELECT,
    ACTION_CHANNEL: ACTION_CHANNEL,
    CANCELLED: CANCELLED$1,
    FLUSH: FLUSH,
    GET_CONTEXT: GET_CONTEXT,
    SET_CONTEXT: SET_CONTEXT
  });

  function resolvePromise(promise, cb) {
    var cancelPromise = promise[CANCEL];

    if (func(cancelPromise)) {
      cb.cancel = cancelPromise;
    }

    promise.then(cb, function (error) {
      cb(error, true);
    });
  }

  var current = 0;
  var nextSagaId = (function () {
    return ++current;
  });

  var _effectRunnerMap;

  function getIteratorMetaInfo(iterator, fn) {
    if (iterator.isSagaIterator) {
      return {
        name: iterator.meta.name
      };
    }

    return getMetaInfo(fn);
  }

  function createTaskIterator(_ref) {
    var context = _ref.context,
        fn = _ref.fn,
        args = _ref.args;

    // catch synchronous failures; see #152 and #441
    try {
      var result = fn.apply(context, args); // i.e. a generator function returns an iterator

      if (iterator(result)) {
        return result;
      }

      var resolved = false;

      var next = function next(arg) {
        if (!resolved) {
          resolved = true; // Only promises returned from fork will be interpreted. See #1573

          return {
            value: result,
            done: !promise(result)
          };
        } else {
          return {
            value: arg,
            done: true
          };
        }
      };

      return makeIterator(next);
    } catch (err) {
      // do not bubble up synchronous failures for detached forks
      // instead create a failed task. See #152 and #441
      return makeIterator(function () {
        throw err;
      });
    }
  }

  function runPutEffect(env, _ref2, cb) {
    var channel = _ref2.channel,
        action = _ref2.action,
        resolve = _ref2.resolve;

    /**
     Schedule the put in case another saga is holding a lock.
     The put will be executed atomically. ie nested puts will execute after
     this put has terminated.
     **/
    asap(function () {
      var result;

      try {
        result = (channel ? channel.put : env.dispatch)(action);
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

  function runTakeEffect(env, _ref3, cb) {
    var _ref3$channel = _ref3.channel,
        channel = _ref3$channel === void 0 ? env.channel : _ref3$channel,
        pattern = _ref3.pattern,
        maybe = _ref3.maybe;

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
      channel.take(takeCb, notUndef(pattern) ? matcher(pattern) : null);
    } catch (err) {
      cb(err, true);
      return;
    }

    cb.cancel = takeCb.cancel;
  }

  function runCallEffect(env, _ref4, cb, _ref5) {
    var context = _ref4.context,
        fn = _ref4.fn,
        args = _ref4.args;
    var task = _ref5.task;

    // catch synchronous failures; see #152
    try {
      var result = fn.apply(context, args);

      if (promise(result)) {
        resolvePromise(result, cb);
        return;
      }

      if (iterator(result)) {
        // resolve iterator
        proc(env, result, task.context, current, getMetaInfo(fn),
        /* isRoot */
        false, cb);
        return;
      }

      cb(result);
    } catch (error) {
      cb(error, true);
    }
  }

  function runCPSEffect(env, _ref6, cb) {
    var context = _ref6.context,
        fn = _ref6.fn,
        args = _ref6.args;

    // CPS (ie node style functions) can define their own cancellation logic
    // by setting cancel field on the cb
    // catch synchronous failures; see #152
    try {
      var cpsCb = function cpsCb(err, res) {
        if (undef(err)) {
          cb(res);
        } else {
          cb(err, true);
        }
      };

      fn.apply(context, args.concat(cpsCb));

      if (cpsCb.cancel) {
        cb.cancel = cpsCb.cancel;
      }
    } catch (error) {
      cb(error, true);
    }
  }

  function runForkEffect(env, _ref7, cb, _ref8) {
    var context = _ref7.context,
        fn = _ref7.fn,
        args = _ref7.args,
        detached = _ref7.detached;
    var parent = _ref8.task;
    var taskIterator = createTaskIterator({
      context: context,
      fn: fn,
      args: args
    });
    var meta = getIteratorMetaInfo(taskIterator, fn);
    immediately(function () {
      var child = proc(env, taskIterator, parent.context, current, meta, detached, undefined);

      if (detached) {
        cb(child);
      } else {
        if (child.isRunning()) {
          parent.queue.addTask(child);
          cb(child);
        } else if (child.isAborted()) {
          parent.queue.abort(child.error());
        } else {
          cb(child);
        }
      }
    }); // Fork effects are non cancellables
  }

  function runJoinEffect(env, taskOrTasks, cb, _ref9) {
    var task = _ref9.task;

    var joinSingleTask = function joinSingleTask(taskToJoin, cb) {
      if (taskToJoin.isRunning()) {
        var joiner = {
          task: task,
          cb: cb
        };

        cb.cancel = function () {
          if (taskToJoin.isRunning()) remove(taskToJoin.joiners, joiner);
        };

        taskToJoin.joiners.push(joiner);
      } else {
        if (taskToJoin.isAborted()) {
          cb(taskToJoin.error(), true);
        } else {
          cb(taskToJoin.result());
        }
      }
    };

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

  function cancelSingleTask(taskToCancel) {
    if (taskToCancel.isRunning()) {
      taskToCancel.cancel();
    }
  }

  function runCancelEffect(env, taskOrTasks, cb, _ref10) {
    var task = _ref10.task;

    if (taskOrTasks === SELF_CANCELLATION) {
      cancelSingleTask(task);
    } else if (array(taskOrTasks)) {
      taskOrTasks.forEach(cancelSingleTask);
    } else {
      cancelSingleTask(taskOrTasks);
    }

    cb(); // cancel effects are non cancellables
  }

  function runAllEffect(env, effects, cb, _ref11) {
    var digestEffect = _ref11.digestEffect;
    var effectId = current;
    var keys = Object.keys(effects);

    if (keys.length === 0) {
      cb(array(effects) ? [] : {});
      return;
    }

    var childCallbacks = createAllStyleChildCallbacks(effects, cb);
    keys.forEach(function (key) {
      digestEffect(effects[key], effectId, childCallbacks[key], key);
    });
  }

  function runRaceEffect(env, effects, cb, _ref12) {
    var digestEffect = _ref12.digestEffect;
    var effectId = current;
    var keys = Object.keys(effects);
    var response = array(effects) ? createEmptyArray(keys.length) : {};
    var childCbs = {};
    var completed = false;
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
          cb.cancel();
          completed = true;
          response[key] = res;
          cb(response);
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

      digestEffect(effects[key], effectId, childCbs[key], key);
    });
  }

  function runSelectEffect(env, _ref13, cb) {
    var selector = _ref13.selector,
        args = _ref13.args;

    try {
      var state = selector.apply(void 0, [env.getState()].concat(args));
      cb(state);
    } catch (error) {
      cb(error, true);
    }
  }

  function runChannelEffect(env, _ref14, cb) {
    var pattern = _ref14.pattern,
        buffer = _ref14.buffer;
    var chan = channel$1(buffer);
    var match = matcher(pattern);

    var taker = function taker(action) {
      if (!isEnd(action)) {
        env.channel.take(taker, match);
      }

      chan.put(action);
    };

    var close = chan.close;

    chan.close = function () {
      taker.cancel();
      close();
    };

    env.channel.take(taker, match);
    cb(chan);
  }

  function runCancelledEffect(env, data, cb, _ref15) {
    var task = _ref15.task;
    cb(task.isCancelled());
  }

  function runFlushEffect(env, channel, cb) {
    channel.flush(cb);
  }

  function runGetContextEffect(env, prop, cb, _ref16) {
    var task = _ref16.task;
    cb(task.context[prop]);
  }

  function runSetContextEffect(env, props, cb, _ref17) {
    var task = _ref17.task;
    assignWithSymbols(task.context, props);
    cb();
  }

  var effectRunnerMap = (_effectRunnerMap = {}, _effectRunnerMap[TAKE] = runTakeEffect, _effectRunnerMap[PUT] = runPutEffect, _effectRunnerMap[ALL] = runAllEffect, _effectRunnerMap[RACE] = runRaceEffect, _effectRunnerMap[CALL] = runCallEffect, _effectRunnerMap[CPS] = runCPSEffect, _effectRunnerMap[FORK] = runForkEffect, _effectRunnerMap[JOIN] = runJoinEffect, _effectRunnerMap[CANCEL$1] = runCancelEffect, _effectRunnerMap[SELECT] = runSelectEffect, _effectRunnerMap[ACTION_CHANNEL] = runChannelEffect, _effectRunnerMap[CANCELLED$1] = runCancelledEffect, _effectRunnerMap[FLUSH] = runFlushEffect, _effectRunnerMap[GET_CONTEXT] = runGetContextEffect, _effectRunnerMap[SET_CONTEXT] = runSetContextEffect, _effectRunnerMap);

  function deferred() {
    var def = {};
    def.promise = new Promise(function (resolve, reject) {
      def.resolve = resolve;
      def.reject = reject;
    });
    return def;
  }

  /**
   Used to track a parent task and its forks
   In the fork model, forked tasks are attached by default to their parent
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

  function forkQueue(mainTask, onAbort, cont) {
    var tasks = [];
    var result;
    var completed = false;
    addTask(mainTask);

    var getTasks = function getTasks() {
      return tasks;
    };

    function abort(err) {
      onAbort();
      cancelAll();
      cont(err, true);
    }

    function addTask(task) {
      tasks.push(task);

      task.cont = function (res, isErr) {
        if (completed) {
          return;
        }

        remove(tasks, task);
        task.cont = noop;

        if (isErr) {
          abort(res);
        } else {
          if (task === mainTask) {
            result = res;
          }

          if (!tasks.length) {
            completed = true;
            cont(result);
          }
        }
      };
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
      getTasks: getTasks
    };
  }

  // there can be only a single saga error created at any given moment

  function formatLocation(fileName, lineNumber) {
    return fileName + "?" + lineNumber;
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

  function cancelledTasksAsString(sagaStack) {
    var cancelledTasks = flatMap(function (i) {
      return i.cancelledTasks;
    }, sagaStack);

    if (!cancelledTasks.length) {
      return '';
    }

    return ['Tasks cancelled due to error:'].concat(cancelledTasks).join('\n');
  }

  var crashedEffect = null;
  var sagaStack = [];
  var addSagaFrame = function addSagaFrame(frame) {
    frame.crashedEffect = crashedEffect;
    sagaStack.push(frame);
  };
  var clear = function clear() {
    crashedEffect = null;
    sagaStack.length = 0;
  }; // this sets crashed effect for the soon-to-be-reported saga frame
  // this slightly streatches the singleton nature of this module into wrong direction
  // as it's even less obvious what's the data flow here, but it is what it is for now

  var setCrashedEffect = function setCrashedEffect(effect) {
    crashedEffect = effect;
  };
  /**
    @returns {string}

    @example
    The above error occurred in task errorInPutSaga {pathToFile}
    when executing effect put({type: 'REDUCER_ACTION_ERROR_IN_PUT'}) {pathToFile}
        created by fetchSaga {pathToFile}
        created by rootSaga {pathToFile}
  */

  var toString = function toString() {
    var firstSaga = sagaStack[0],
        otherSagas = sagaStack.slice(1);
    var crashedEffectLocation = firstSaga.crashedEffect ? effectLocationAsString(firstSaga.crashedEffect) : null;
    var errorMessage = "The above error occurred in task " + sagaLocationAsString(firstSaga.meta) + (crashedEffectLocation ? " \n when executing effect " + crashedEffectLocation : '');
    return [errorMessage].concat(otherSagas.map(function (s) {
      return "    created by " + sagaLocationAsString(s.meta);
    }), [cancelledTasksAsString(sagaStack)]).join('\n');
  };

  function newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont) {
    var _task;

    if (cont === void 0) {
      cont = noop;
    }

    var status = RUNNING;
    var taskResult;
    var taskError;
    var deferredEnd = null;
    var cancelledDueToErrorTasks = [];
    var context = Object.create(parentContext);
    var queue = forkQueue(mainTask, function onAbort() {
      cancelledDueToErrorTasks.push.apply(cancelledDueToErrorTasks, queue.getTasks().map(function (t) {
        return t.meta.name;
      }));
    }, end);
    /**
     This may be called by a parent generator to trigger/propagate cancellation
     cancel all pending tasks (including the main task), then end the current task.
      Cancellation propagates down to the whole execution tree held by this Parent task
     It's also propagated to all joiners of this task and their execution tree/joiners
      Cancellation is noop for terminated/Cancelled tasks tasks
     **/

    function cancel() {
      if (status === RUNNING) {
        // Setting status to CANCELLED does not necessarily mean that the task/iterators are stopped
        // effects in the iterator's finally block will still be executed
        status = CANCELLED;
        queue.cancelAll(); // Ending with a TASK_CANCEL will propagate the Cancellation to all joiners

        end(TASK_CANCEL, false);
      }
    }

    function end(result, isErr) {
      if (!isErr) {
        // The status here may be RUNNING or CANCELLED
        // If the status is CANCELLED, then we do not need to change it here
        if (result === TASK_CANCEL) {
          status = CANCELLED;
        } else if (status !== CANCELLED) {
          status = DONE;
        }

        taskResult = result;
        deferredEnd && deferredEnd.resolve(result);
      } else {
        status = ABORTED;
        addSagaFrame({
          meta: meta,
          cancelledTasks: cancelledDueToErrorTasks
        });

        if (task.isRoot) {
          var sagaStack = toString(); // we've dumped the saga stack to string and are passing it to user's code
          // we know that it won't be needed anymore and we need to clear it

          clear();
          env.onError(result, {
            sagaStack: sagaStack
          });
        }

        taskError = result;
        deferredEnd && deferredEnd.reject(result);
      }

      task.cont(result, isErr);
      task.joiners.forEach(function (joiner) {
        joiner.cb(result, isErr);
      });
      task.joiners = null;
    }

    function setContext(props) {
      {
        check(props, object, createSetContextWarning('task', props));
      }

      assignWithSymbols(context, props);
    }

    function toPromise() {
      if (deferredEnd) {
        return deferredEnd.promise;
      }

      deferredEnd = deferred();

      if (status === ABORTED) {
        deferredEnd.reject(taskError);
      } else if (status !== RUNNING) {
        deferredEnd.resolve(taskResult);
      }

      return deferredEnd.promise;
    }

    var task = (_task = {}, _task[TASK] = true, _task.id = parentEffectId, _task.meta = meta, _task.isRoot = isRoot, _task.context = context, _task.joiners = [], _task.queue = queue, _task.cancel = cancel, _task.cont = cont, _task.end = end, _task.setContext = setContext, _task.toPromise = toPromise, _task.isRunning = function isRunning() {
      return status === RUNNING;
    }, _task.isCancelled = function isCancelled() {
      return status === CANCELLED || status === RUNNING && mainTask.status === CANCELLED;
    }, _task.isAborted = function isAborted() {
      return status === ABORTED;
    }, _task.result = function result() {
      return taskResult;
    }, _task.error = function error() {
      return taskError;
    }, _task);
    return task;
  }

  function proc(env, iterator$1, parentContext, parentEffectId, meta, isRoot, cont) {
    if ( iterator$1[asyncIteratorSymbol]) {
      throw new Error("redux-saga doesn't support async generators, please use only regular ones");
    }

    var finalRunEffect = env.finalizeRunEffect(runEffect);
    /**
      Tracks the current effect cancellation
      Each time the generator progresses. calling runEffect will set a new value
      on it. It allows propagating cancellation to child effects
    **/

    next.cancel = noop;
    /** Creates a main task to track the main flow */

    var mainTask = {
      meta: meta,
      cancel: cancelMain,
      status: RUNNING
    };
    /**
     Creates a new task descriptor for this generator.
     A task is the aggregation of it's mainTask and all it's forked tasks.
     **/

    var task = newTask(env, mainTask, parentContext, parentEffectId, meta, isRoot, cont);
    var executingContext = {
      task: task,
      digestEffect: digestEffect
    };
    /**
      cancellation of the main task. We'll simply resume the Generator with a TASK_CANCEL
    **/

    function cancelMain() {
      if (mainTask.status === RUNNING) {
        mainTask.status = CANCELLED;
        next(TASK_CANCEL);
      }
    }
    /**
      attaches cancellation logic to this task's continuation
      this will permit cancellation to propagate down the call chain
    **/


    if (cont) {
      cont.cancel = task.cancel;
    } // kicks up the generator


    next(); // then return the task descriptor to the caller

    return task;
    /**
     * This is the generator driver
     * It's a recursive async/continuation function which calls itself
     * until the generator terminates or throws
     * @param {internal commands(TASK_CANCEL | TERMINATE) | any} arg - value, generator will be resumed with.
     * @param {boolean} isErr - the flag shows if effect finished with an error
     *
     * receives either (command | effect result, false) or (any thrown thing, true)
     */

    function next(arg, isErr) {
      try {
        var result;

        if (isErr) {
          result = iterator$1.throw(arg); // user handled the error, we can clear bookkept values

          clear();
        } else if (shouldCancel(arg)) {
          /**
            getting TASK_CANCEL automatically cancels the main task
            We can get this value here
             - By cancelling the parent task manually
            - By joining a Cancelled task
          **/
          mainTask.status = CANCELLED;
          /**
            Cancels the current effect; this will propagate the cancellation down to any called tasks
          **/

          next.cancel();
          /**
            If this Generator has a `return` method then invokes it
            This will jump to the finally block
          **/

          result = func(iterator$1.return) ? iterator$1.return(TASK_CANCEL) : {
            done: true,
            value: TASK_CANCEL
          };
        } else if (shouldTerminate(arg)) {
          // We get TERMINATE flag, i.e. by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
          result = func(iterator$1.return) ? iterator$1.return() : {
            done: true
          };
        } else {
          result = iterator$1.next(arg);
        }

        if (!result.done) {
          digestEffect(result.value, parentEffectId, next);
        } else {
          /**
            This Generator has ended, terminate the main task and notify the fork queue
          **/
          if (mainTask.status !== CANCELLED) {
            mainTask.status = DONE;
          }

          mainTask.cont(result.value);
        }
      } catch (error) {
        if (mainTask.status === CANCELLED) {
          throw error;
        }

        mainTask.status = ABORTED;
        mainTask.cont(error, true);
      }
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
        // resolve iterator
        proc(env, effect, task.context, effectId, meta,
        /* isRoot */
        false, currCb);
      } else if (effect && effect[IO]) {
        var effectRunner = effectRunnerMap[effect.type];
        effectRunner(env, effect.payload, currCb, executingContext);
      } else {
        // anything else returned as is
        currCb(effect);
      }
    }

    function digestEffect(effect, parentEffectId, cb, label) {
      if (label === void 0) {
        label = '';
      }

      var effectId = nextSagaId();
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
          setCrashedEffect(effect);
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
        currCb.cancel(); // propagates cancel downward

        currCb.cancel = noop; // defensive measure

        env.sagaMonitor && env.sagaMonitor.effectCancelled(effectId);
      };

      finalRunEffect(effect, effectId, currCb);
    }
  }

  var RUN_SAGA_SIGNATURE = 'runSaga(options, saga, ...args)';
  var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ": saga argument must be a Generator function!";
  function runSaga(_ref, saga) {
    var _ref$channel = _ref.channel,
        channel = _ref$channel === void 0 ? stdChannel() : _ref$channel,
        dispatch = _ref.dispatch,
        getState = _ref.getState,
        _ref$context = _ref.context,
        context = _ref$context === void 0 ? {} : _ref$context,
        sagaMonitor = _ref.sagaMonitor,
        effectMiddlewares = _ref.effectMiddlewares,
        _ref$onError = _ref.onError,
        onError = _ref$onError === void 0 ? logError : _ref$onError;

    {
      check(saga, func, NON_GENERATOR_ERR);
    }

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var iterator$1 = saga.apply(void 0, args);

    {
      check(iterator$1, iterator, NON_GENERATOR_ERR);
    }

    var effectId = nextSagaId();

    if (sagaMonitor) {
      // monitors are expected to have a certain interface, let's fill-in any missing ones
      sagaMonitor.rootSagaStarted = sagaMonitor.rootSagaStarted || noop;
      sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || noop;
      sagaMonitor.effectResolved = sagaMonitor.effectResolved || noop;
      sagaMonitor.effectRejected = sagaMonitor.effectRejected || noop;
      sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || noop;
      sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || noop;
      sagaMonitor.rootSagaStarted({
        effectId: effectId,
        saga: saga,
        args: args
      });
    }

    {
      if (notUndef(dispatch)) {
        check(dispatch, func, 'dispatch must be a function');
      }

      if (notUndef(getState)) {
        check(getState, func, 'getState must be a function');
      }

      if (notUndef(effectMiddlewares)) {
        var MIDDLEWARE_TYPE_ERROR = 'effectMiddlewares must be an array of functions';
        check(effectMiddlewares, array, MIDDLEWARE_TYPE_ERROR);
        effectMiddlewares.forEach(function (effectMiddleware) {
          return check(effectMiddleware, func, MIDDLEWARE_TYPE_ERROR);
        });
      }

      check(onError, func, 'onError passed to the redux-saga is not a function!');
    }

    var finalizeRunEffect;

    if (effectMiddlewares) {
      var middleware = compose.apply(void 0, effectMiddlewares);

      finalizeRunEffect = function finalizeRunEffect(runEffect) {
        return function (effect, effectId, currCb) {
          var plainRunEffect = function plainRunEffect(eff) {
            return runEffect(eff, effectId, currCb);
          };

          return middleware(plainRunEffect)(effect);
        };
      };
    } else {
      finalizeRunEffect = identity;
    }

    var env = {
      channel: channel,
      dispatch: wrapSagaDispatch(dispatch),
      getState: getState,
      sagaMonitor: sagaMonitor,
      onError: onError,
      finalizeRunEffect: finalizeRunEffect
    };
    return immediately(function () {
      var task = proc(env, iterator$1, context, effectId, getMetaInfo(saga),
      /* isRoot */
      true, undefined);

      if (sagaMonitor) {
        sagaMonitor.effectResolved(effectId, task);
      }

      return task;
    });
  }

  function sagaMiddlewareFactory(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$context = _ref.context,
        context = _ref$context === void 0 ? {} : _ref$context,
        _ref$channel = _ref.channel,
        channel$1 = _ref$channel === void 0 ? stdChannel() : _ref$channel,
        sagaMonitor = _ref.sagaMonitor,
        options = _objectWithoutPropertiesLoose(_ref, ["context", "channel", "sagaMonitor"]);

    var boundRunSaga;

    {
      check(channel$1, channel, 'options.channel passed to the Saga middleware is not a channel');
    }

    function sagaMiddleware(_ref2) {
      var getState = _ref2.getState,
          dispatch = _ref2.dispatch;
      boundRunSaga = runSaga.bind(null, _extends({}, options, {
        context: context,
        channel: channel$1,
        dispatch: dispatch,
        getState: getState,
        sagaMonitor: sagaMonitor
      }));
      return function (next) {
        return function (action) {
          if (sagaMonitor && sagaMonitor.actionDispatched) {
            sagaMonitor.actionDispatched(action);
          }

          var result = next(action); // hit reducers

          channel$1.put(action);
          return result;
        };
      };
    }

    sagaMiddleware.run = function () {
      if ( !boundRunSaga) {
        throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
      }

      return boundRunSaga.apply(void 0, arguments);
    };

    sagaMiddleware.setContext = function (props) {
      {
        check(props, object, createSetContextWarning('sagaMiddleware', props));
      }

      assignWithSymbols(context, props);
    };

    return sagaMiddleware;
  }

  var MAX_SIGNED_INT = 2147483647;
  function delayP(ms, val) {
    if (val === void 0) {
      val = true;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value
    if ( ms > MAX_SIGNED_INT) {
      throw new Error('delay only supports a maximum value of ' + MAX_SIGNED_INT + 'ms');
    }

    var timeoutId;
    var promise = new Promise(function (resolve) {
      timeoutId = setTimeout(resolve, Math.min(MAX_SIGNED_INT, ms), val);
    });

    promise[CANCEL] = function () {
      clearTimeout(timeoutId);
    };

    return promise;
  }

  var TEST_HINT = '\n(HINT: if you are getting these errors in tests, consider using createMockTask from @redux-saga/testing-utils)';

  var makeEffect = function makeEffect(type, payload) {
    var _ref;

    return _ref = {}, _ref[IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
  };

  var isForkEffect = function isForkEffect(eff) {
    return effect(eff) && eff.type === FORK;
  };

  var detach = function detach(eff) {
    {
      check(eff, isForkEffect, 'detach(eff): argument must be a fork effect');
    }

    return makeEffect(FORK, _extends({}, eff.payload, {
      detached: true
    }));
  };
  function take(patternOrChannel, multicastPattern) {
    if (patternOrChannel === void 0) {
      patternOrChannel = '*';
    }

    if ( arguments.length) {
      check(arguments[0], notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
    }

    if (pattern(patternOrChannel)) {
      if (notUndef(multicastPattern)) {
        /* eslint-disable no-console */
        console.warn("take(pattern) takes one argument but two were provided. Consider passing an array for listening to several action types");
      }

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
      if (notUndef(multicastPattern)) {
        /* eslint-disable no-console */
        console.warn("take(channel) takes one argument but two were provided. Second argument is ignored.");
      }

      return makeEffect(TAKE, {
        channel: patternOrChannel
      });
    }

    {
      throw new Error("take(patternOrChannel): argument " + patternOrChannel + " is not valid channel or a valid pattern");
    }
  }
  var takeMaybe = function takeMaybe() {
    var eff = take.apply(void 0, arguments);
    eff.payload.maybe = true;
    return eff;
  };
  function put(channel$1, action) {
    {
      if (arguments.length > 1) {
        check(channel$1, notUndef, 'put(channel, action): argument channel is undefined');
        check(channel$1, channel, "put(channel, action): argument " + channel$1 + " is not a valid channel");
        check(action, notUndef, 'put(channel, action): argument action is undefined');
      } else {
        check(channel$1, notUndef, 'put(action): argument action is undefined');
      }
    }

    if (undef(action)) {
      action = channel$1; // `undefined` instead of `null` to make default parameter work

      channel$1 = undefined;
    }

    return makeEffect(PUT, {
      channel: channel$1,
      action: action
    });
  }
  var putResolve = function putResolve() {
    var eff = put.apply(void 0, arguments);
    eff.payload.resolve = true;
    return eff;
  };
  function all(effects) {
    var eff = makeEffect(ALL, effects);
    eff.combinator = true;
    return eff;
  }
  function race(effects) {
    var eff = makeEffect(RACE, effects);
    eff.combinator = true;
    return eff;
  } // this match getFnCallDescriptor logic

  var validateFnDescriptor = function validateFnDescriptor(effectName, fnDescriptor) {
    check(fnDescriptor, notUndef, effectName + ": argument fn is undefined or null");

    if (func(fnDescriptor)) {
      return;
    }

    var context = null;
    var fn;

    if (array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
      check(fn, notUndef, effectName + ": argument of type [context, fn] has undefined or null `fn`");
    } else if (object(fnDescriptor)) {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
      check(fn, notUndef, effectName + ": argument of type {context, fn} has undefined or null `fn`");
    } else {
      check(fnDescriptor, func, effectName + ": argument fn is not function");
      return;
    }

    if (context && string(fn)) {
      check(context[fn], func, effectName + ": context arguments has no such method - \"" + fn + "\"");
      return;
    }

    check(fn, func, effectName + ": unpacked fn argument (from [context, fn] or {context, fn}) is not a function");
  };

  function getFnCallDescriptor(fnDescriptor, args) {
    var context = null;
    var fn;

    if (func(fnDescriptor)) {
      fn = fnDescriptor;
    } else {
      if (array(fnDescriptor)) {
        context = fnDescriptor[0];
        fn = fnDescriptor[1];
      } else {
        context = fnDescriptor.context;
        fn = fnDescriptor.fn;
      }

      if (context && string(fn) && func(context[fn])) {
        fn = context[fn];
      }
    }

    return {
      context: context,
      fn: fn,
      args: args
    };
  }

  var isNotDelayEffect = function isNotDelayEffect(fn) {
    return fn !== delay;
  };

  function call(fnDescriptor) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    {
      var arg0 = typeof args[0] === 'number' ? args[0] : 'ms';
      check(fnDescriptor, isNotDelayEffect, "instead of writing `yield call(delay, " + arg0 + ")` where delay is an effect from `redux-saga/effects` you should write `yield delay(" + arg0 + ")`");
      validateFnDescriptor('call', fnDescriptor);
    }

    return makeEffect(CALL, getFnCallDescriptor(fnDescriptor, args));
  }
  function apply(context, fn, args) {
    if (args === void 0) {
      args = [];
    }

    var fnDescriptor = [context, fn];

    {
      validateFnDescriptor('apply', fnDescriptor);
    }

    return makeEffect(CALL, getFnCallDescriptor([context, fn], args));
  }
  function cps(fnDescriptor) {
    {
      validateFnDescriptor('cps', fnDescriptor);
    }

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return makeEffect(CPS, getFnCallDescriptor(fnDescriptor, args));
  }
  function fork(fnDescriptor) {
    {
      validateFnDescriptor('fork', fnDescriptor);
      check(fnDescriptor, function (arg) {
        return !effect(arg);
      }, 'fork: argument must not be an effect');
    }

    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
  }
  function spawn(fnDescriptor) {
    {
      validateFnDescriptor('spawn', fnDescriptor);
    }

    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return detach(fork.apply(void 0, [fnDescriptor].concat(args)));
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

    if ( arguments.length) {
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

  function actionChannel(pattern$1, buffer$1) {
    {
      check(pattern$1, pattern, 'actionChannel(pattern,...): argument pattern is not valid');

      if (arguments.length > 1) {
        check(buffer$1, notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
        check(buffer$1, buffer, "actionChannel(pattern, buffer): argument " + buffer$1 + " is not a valid buffer");
      }
    }

    return makeEffect(ACTION_CHANNEL, {
      pattern: pattern$1,
      buffer: buffer$1
    });
  }
  function cancelled() {
    return makeEffect(CANCELLED$1, {});
  }
  function flush$1(channel$1) {
    {
      check(channel$1, channel, "flush(channel): argument " + channel$1 + " is not valid channel");
    }

    return makeEffect(FLUSH, channel$1);
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

  function throttle(delayLength, patternOrChannel, worker) {
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var action, channel$1;

    var yTake = function yTake() {
      return {
        done: false,
        value: take(channel$1)
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
      return channel$1 = ch;
    };

    var needsChannel = !channel(patternOrChannel);

    if (!needsChannel) {
      setChannel(patternOrChannel);
    }

    return fsmIterator({
      q1: function q1() {
        var yActionChannel = {
          done: false,
          value: actionChannel(patternOrChannel, sliding(1))
        };
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
    }, needsChannel ? 'q1' : 'q2', "throttle(" + safeName(patternOrChannel) + ", " + worker.name + ")");
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
  function throttle$1(ms, patternOrChannel, worker) {
    {
      check(patternOrChannel, notUndef, "throttle requires a pattern or channel");
      check(worker, notUndef, 'throttle requires a saga parameter');
    }

    for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
      args[_key4 - 3] = arguments[_key4];
    }

    return fork.apply(void 0, [throttle, ms, patternOrChannel, worker].concat(args));
  }
  function retry$1(maxTries, delayLength, worker) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
      args[_key5 - 3] = arguments[_key5];
    }

    return call.apply(void 0, [retry, maxTries, delayLength, worker].concat(args));
  }
  function debounce(delayLength, pattern, worker) {
    for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
      args[_key6 - 3] = arguments[_key6];
    }

    return fork.apply(void 0, [debounceHelper, delayLength, pattern, worker].concat(args));
  }



  var effects = /*#__PURE__*/Object.freeze({
    __proto__: null,
    effectTypes: effectTypes,
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

  exports.CANCEL = CANCEL;
  exports.END = END;
  exports.SAGA_LOCATION = SAGA_LOCATION;
  exports.buffers = buffers;
  exports.channel = channel$1;
  exports.default = sagaMiddlewareFactory;
  exports.detach = detach;
  exports.effects = effects;
  exports.eventChannel = eventChannel;
  exports.isEnd = isEnd;
  exports.multicastChannel = multicastChannel;
  exports.runSaga = runSaga;
  exports.stdChannel = stdChannel;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
