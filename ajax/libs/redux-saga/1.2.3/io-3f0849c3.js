var createSymbol = name => "@@redux-saga/" + name;

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

var undef = v => v === null || v === undefined;
var notUndef = v => v !== null && v !== undefined;
var func = f => typeof f === 'function';
var string = s => typeof s === 'string';
var array = Array.isArray;
var object = obj => obj && !array(obj) && typeof obj === 'object';
var promise = p => p && func(p.then);
var iterator = it => it && func(it.next) && func(it.throw);
var task = t => t && t[TASK];
var buffer = buf => buf && func(buf.isEmpty) && func(buf.take) && func(buf.put);
var pattern = pat => pat && (string(pat) || symbol(pat) || func(pat) || array(pat) && pat.every(pattern));
var channel = ch => ch && func(ch.take) && func(ch.close);
var stringableFunc = f => func(f) && f.hasOwnProperty('toString');
var symbol = sym => Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
var multicast = ch => channel(ch) && ch[MULTICAST];
var effect = eff => eff && eff[IO];

var konst = v => () => v;
var kTrue =
/*#__PURE__*/
konst(true);

var noop = () => {};

if ( typeof Proxy !== 'undefined') {
  noop =
  /*#__PURE__*/
  new Proxy(noop, {
    set: () => {
      throw internalErr('There was an attempt to assign a property to internal `noop` function.');
    }
  });
}
var identity = v => v;
var hasSymbol = typeof Symbol === 'function';
var asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';
function check(value, predicate, error) {
  if (!predicate(value)) {
    throw new Error(error);
  }
}
var assignWithSymbols = (target, source) => {
  _extends(target, source);

  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(source).forEach(s => {
      target[s] = source[s];
    });
  }
};
var flatMap = (mapper, arr) => [].concat(...arr.map(mapper));
function remove(array, item) {
  var index = array.indexOf(item);

  if (index >= 0) {
    array.splice(index, 1);
  }
}
function once(fn) {
  var called = false;
  return () => {
    if (called) {
      return;
    }

    called = true;
    fn();
  };
}

var kThrow = err => {
  throw err;
};

var kReturn = value => ({
  value,
  done: true
});

function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }

  if (name === void 0) {
    name = 'iterator';
  }

  var iterator = {
    meta: {
      name
    },
    next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };

  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = () => iterator;
  }

  return iterator;
}
function logError(error, _ref) {
  var {
    sagaStack
  } = _ref;

  /*eslint-disable no-console*/
  console.error(error);
  console.error(sagaStack);
}
var internalErr = err => new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + err + "\n");
var createSetContextWarning = (ctx, props) => (ctx ? ctx + '.' : '') + "setContext(props): argument " + props + " is not a plain object";
var FROZEN_ACTION_ERROR = "You can't put (a.k.a. dispatch from saga) frozen actions.\nWe have to define a special non-enumerable property on those actions for scheduling purposes.\nOtherwise you wouldn't be able to communicate properly between sagas & other subscribers (action ordering would become far less predictable).\nIf you are using redux and you care about this behaviour (frozen actions),\nthen you might want to switch to freezing actions in a middleware rather than in action creator.\nExample implementation:\n\nconst freezeActions = store => next => action => next(Object.freeze(action))\n"; // creates empty, but not-holey array

var createEmptyArray = n => Array.apply(null, new Array(n));
var wrapSagaDispatch = dispatch => action => {
  {
    check(action, ac => !Object.isFrozen(ac), FROZEN_ACTION_ERROR);
  }

  return dispatch(Object.defineProperty(action, SAGA_ACTION, {
    value: true
  }));
};
var shouldTerminate = res => res === TERMINATE;
var shouldCancel = res => res === TASK_CANCEL;
var shouldComplete = res => shouldTerminate(res) || shouldCancel(res);
function createAllStyleChildCallbacks(shape, parentCallback) {
  var keys = Object.keys(shape);
  var totalCount = keys.length;

  {
    check(totalCount, c => c > 0, 'createAllStyleChildCallbacks: get an empty array or object');
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

  keys.forEach(key => {
    var chCbAtKey = (res, isErr) => {
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

  parentCallback.cancel = () => {
    if (!completed) {
      completed = true;
      keys.forEach(key => childCallbacks[key].cancel());
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

  var push = it => {
    arr[pushIndex] = it;
    pushIndex = (pushIndex + 1) % limit;
    length++;
  };

  var take = () => {
    if (length != 0) {
      var it = arr[popIndex];
      arr[popIndex] = null;
      length--;
      popIndex = (popIndex + 1) % limit;
      return it;
    }
  };

  var flush = () => {
    var items = [];

    while (length) {
      items.push(take());
    }

    return items;
  };

  return {
    isEmpty: () => length == 0,
    put: it => {
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
    take,
    flush
  };
}

var none = () => zeroBuffer;
var fixed = limit => ringBuffer(limit, ON_OVERFLOW_THROW);
var dropping = limit => ringBuffer(limit, ON_OVERFLOW_DROP);
var sliding = limit => ringBuffer(limit, ON_OVERFLOW_SLIDE);
var expanding = initialSize => ringBuffer(initialSize, ON_OVERFLOW_EXPAND);

var buffers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  none: none,
  fixed: fixed,
  dropping: dropping,
  sliding: sliding,
  expanding: expanding
});

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
  var promise = new Promise(resolve => {
    timeoutId = setTimeout(resolve, Math.min(MAX_SIGNED_INT, ms), val);
  });

  promise[CANCEL] = () => {
    clearTimeout(timeoutId);
  };

  return promise;
}

var TEST_HINT = '\n(HINT: if you are getting these errors in tests, consider using createMockTask from @redux-saga/testing-utils)';

var makeEffect = (type, payload) => ({
  [IO]: true,
  // this property makes all/race distinguishable in generic manner from other effects
  // currently it's not used at runtime at all but it's here to satisfy type systems
  combinator: false,
  type,
  payload
});

var isForkEffect = eff => effect(eff) && eff.type === FORK;

var detach = eff => {
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
  var eff = take(...arguments);
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
    action
  });
}
var putResolve = function putResolve() {
  var eff = put(...arguments);
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

var validateFnDescriptor = (effectName, fnDescriptor) => {
  check(fnDescriptor, notUndef, effectName + ": argument fn is undefined or null");

  if (func(fnDescriptor)) {
    return;
  }

  var context = null;
  var fn;

  if (array(fnDescriptor)) {
    [context, fn] = fnDescriptor;
    check(fn, notUndef, effectName + ": argument of type [context, fn] has undefined or null `fn`");
  } else if (object(fnDescriptor)) {
    ({
      context,
      fn
    } = fnDescriptor);
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
      [context, fn] = fnDescriptor;
    } else {
      ({
        context,
        fn
      } = fnDescriptor);
    }

    if (context && string(fn) && func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context,
    fn,
    args
  };
}

var isNotDelayEffect = fn => fn !== delay;

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
    check(fnDescriptor, arg => !effect(arg), 'fork: argument must not be an effect');
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

  return detach(fork(fnDescriptor, ...args));
}
function join(taskOrTasks) {
  {
    if (arguments.length > 1) {
      throw new Error('join(...tasks) is not supported any more. Please use join([...tasks]) to join multiple tasks.');
    }

    if (array(taskOrTasks)) {
      taskOrTasks.forEach(t => {
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
      taskOrTasks.forEach(t => {
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
    selector,
    args
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

export { shouldCancel as $, ALL as A, getMetaInfo as B, CHANNEL_END_TYPE as C, undef as D, createAllStyleChildCallbacks as E, FORK as F, GET_CONTEXT as G, SELF_CANCELLATION as H, createEmptyArray as I, JOIN as J, assignWithSymbols as K, makeIterator as L, MULTICAST as M, TERMINATE as N, shouldComplete as O, PUT as P, noop as Q, RACE as R, SAGA_ACTION as S, TAKE as T, flatMap as U, getLocation as V, TASK as W, TASK_CANCEL as X, createSetContextWarning as Y, object as Z, asyncIteratorSymbol as _, array as a, shouldTerminate as a0, IO as a1, logError as a2, wrapSagaDispatch as a3, identity as a4, channel as a5, _extends as a6, buffers as a7, SAGA_LOCATION as a8, detach as a9, take as aa, fork as ab, cancel as ac, call as ad, delay as ae, actionChannel as af, sliding as ag, race as ah, effectTypes as ai, takeMaybe as aj, put as ak, putResolve as al, all as am, apply as an, cps as ao, spawn as ap, join as aq, select as ar, cancelled as as, flush as at, getContext as au, setContext as av, stringableFunc as b, symbol as c, check as d, expanding as e, func as f, buffer as g, MATCH as h, none as i, internalErr as j, kTrue as k, CANCEL as l, CALL as m, notUndef as n, once as o, CPS as p, CANCEL$1 as q, remove as r, string as s, SELECT as t, ACTION_CHANNEL as u, CANCELLED as v, FLUSH as w, SET_CONTEXT as x, promise as y, iterator as z };
