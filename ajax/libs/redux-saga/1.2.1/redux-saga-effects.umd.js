(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ReduxSagaEffects = {}));
}(this, function (exports) { 'use strict';

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

  var createSymbol = function createSymbol(name) {
    return "@@redux-saga/" + name;
  };

  var CANCEL =
  /*#__PURE__*/
  createSymbol('CANCEL_PROMISE');
  var IO =
  /*#__PURE__*/
  createSymbol('IO');
  var MULTICAST =
  /*#__PURE__*/
  createSymbol('MULTICAST');
  var SELF_CANCELLATION =
  /*#__PURE__*/
  createSymbol('SELF_CANCELLATION');
  var TASK =
  /*#__PURE__*/
  createSymbol('TASK');

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

  var identity = function identity(v) {
    return v;
  };
  function check(value, predicate, error) {
    if (!predicate(value)) {
      throw new Error(error);
    }
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
  var createSetContextWarning = function createSetContextWarning(ctx, props) {
    return (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
  };

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
    CANCELLED: CANCELLED,
    FLUSH: FLUSH,
    GET_CONTEXT: GET_CONTEXT,
    SET_CONTEXT: SET_CONTEXT
  });

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
    return makeEffect(CANCELLED, {});
  }
  function flush(channel$1) {
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

  var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
  var ON_OVERFLOW_THROW = 1;
  var ON_OVERFLOW_SLIDE = 3;
  var ON_OVERFLOW_EXPAND = 4;

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
  var sliding = function sliding(limit) {
    return ringBuffer(limit, ON_OVERFLOW_SLIDE);
  };

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
  function throttle$1(ms, pattern, worker) {
    {
      check(pattern, notUndef, 'throttle requires a pattern');
      check(worker, notUndef, 'throttle requires a saga parameter');
    }

    for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
      args[_key4 - 3] = arguments[_key4];
    }

    return fork.apply(void 0, [throttle, ms, pattern, worker].concat(args));
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

  exports.actionChannel = actionChannel;
  exports.all = all;
  exports.apply = apply;
  exports.call = call;
  exports.cancel = cancel;
  exports.cancelled = cancelled;
  exports.cps = cps;
  exports.debounce = debounce;
  exports.delay = delay;
  exports.effectTypes = effectTypes;
  exports.flush = flush;
  exports.fork = fork;
  exports.getContext = getContext;
  exports.join = join;
  exports.put = put;
  exports.putResolve = putResolve;
  exports.race = race;
  exports.retry = retry$1;
  exports.select = select;
  exports.setContext = setContext;
  exports.spawn = spawn;
  exports.take = take;
  exports.takeEvery = takeEvery$1;
  exports.takeLatest = takeLatest$1;
  exports.takeLeading = takeLeading$1;
  exports.takeMaybe = takeMaybe;
  exports.throttle = throttle$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
