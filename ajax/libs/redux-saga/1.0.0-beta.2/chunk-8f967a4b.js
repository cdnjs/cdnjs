'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var is = require('@redux-saga/is');
var symbols = require('@redux-saga/symbols');
var delayP = _interopDefault(require('@redux-saga/delay-p'));

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
function hasOwn(object, property) {
  return is.notUndef(object) && hasOwnProperty.call(object, property);
}
var object = {
  assign: function assign(target, source) {
    for (var i in source) {
      if (hasOwn(source, i)) {
        target[i] = source[i];
      }
    }
  }
};
function remove(array, item) {
  var index = array.indexOf(item);

  if (index >= 0) {
    array.splice(index, 1);
  }
}
var array = {
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

  return _ref = {}, _ref[symbols.TASK] = true, _ref.isRunning = function isRunning() {
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
    return dispatch(Object.defineProperty(action, symbols.SAGA_ACTION, {
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
  return res === symbols.TERMINATE;
};
var shouldCancel = function shouldCancel(res) {
  return res === symbols.TASK_CANCEL;
};
var shouldComplete = function shouldComplete(res) {
  return shouldTerminate(res) || shouldCancel(res);
};
function createAllStyleChildCallbacks(shape, parentCallback) {
  var keys = Object.keys(shape);
  var totalCount = keys.length;

  if (process.env.NODE_ENV === 'development') {
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

      if (is.array(shape)) {
        parentCallback(array.from(_extends({}, results, {
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

var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

var makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[symbols.IO] = true, _ref.type = type, _ref.payload = payload, _ref;
};

var isForkEffect = function isForkEffect(eff) {
  return eff && eff[symbols.IO] && eff.type === 'FORK';
};

var detach = function detach(eff) {
  if (process.env.NODE_ENV === 'development') {
    check(eff, isForkEffect, 'detach(eff): argument must be a fork effect');
  }

  eff.payload.detached = true;
  return eff;
};
function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if (process.env.NODE_ENV === 'development' && arguments.length) {
    check(arguments[0], is.notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }

  if (is.pattern(patternOrChannel)) {
    return makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if (is.multicast(patternOrChannel) && is.notUndef(multicastPattern) && is.pattern(multicastPattern)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }

  if (is.channel(patternOrChannel)) {
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
function put(channel, action) {
  if (process.env.NODE_ENV === 'development') {
    if (arguments.length > 1) {
      check(channel, is.notUndef, 'put(channel, action): argument channel is undefined');
      check(channel, is.channel, "put(channel, action): argument " + channel + " is not a valid channel");
      check(action, is.notUndef, 'put(channel, action): argument action is undefined');
    } else {
      check(channel, is.notUndef, 'put(action): argument action is undefined');
    }
  }

  if (is.undef(action)) {
    action = channel;
    channel = null;
  }

  return makeEffect(PUT, {
    channel: channel,
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
  if (process.env.NODE_ENV === 'development') {
    check(fn, is.notUndef, meth + ": argument fn is undefined");
  }

  var context = null;

  if (is.array(fn)) {
    var _fn = fn;
    context = _fn[0];
    fn = _fn[1];
  } else if (fn.fn) {
    var _fn2 = fn;
    context = _fn2.context;
    fn = _fn2.fn;
  }

  if (context && is.string(fn) && is.func(context[fn])) {
    fn = context[fn];
  }

  if (process.env.NODE_ENV === 'development') {
    check(fn, is.func, meth + ": argument " + fn + " is not a function");
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
  if (process.env.NODE_ENV === 'development') {
    if (arguments.length > 1) {
      throw new Error('join(...tasks) is not supported any more. Please use join([...tasks]) to join multiple tasks.');
    }

    if (is.array(taskOrTasks)) {
      taskOrTasks.forEach(function (t) {
        check(t, is.task, "join([...tasks]): argument " + t + " is not a valid Task object " + TEST_HINT);
      });
    } else {
      check(taskOrTasks, is.task, "join(task): argument " + taskOrTasks + " is not a valid Task object " + TEST_HINT);
    }
  }

  return makeEffect(JOIN, taskOrTasks);
}
function cancel(taskOrTasks) {
  if (taskOrTasks === void 0) {
    taskOrTasks = symbols.SELF_CANCELLATION;
  }

  if (process.env.NODE_ENV === 'development') {
    if (arguments.length > 1) {
      throw new Error('cancel(...tasks) is not supported any more. Please use cancel([...tasks]) to cancel multiple tasks.');
    }

    if (is.array(taskOrTasks)) {
      taskOrTasks.forEach(function (t) {
        check(t, is.task, "cancel([...tasks]): argument " + t + " is not a valid Task object " + TEST_HINT);
      });
    } else if (taskOrTasks !== symbols.SELF_CANCELLATION && is.notUndef(taskOrTasks)) {
      check(taskOrTasks, is.task, "cancel(task): argument " + taskOrTasks + " is not a valid Task object " + TEST_HINT);
    }
  }

  return makeEffect(CANCEL, taskOrTasks);
}
function select(selector) {
  if (selector === void 0) {
    selector = identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (process.env.NODE_ENV === 'development' && arguments.length) {
    check(arguments[0], is.notUndef, 'select(selector, [...]): argument selector is undefined');
    check(selector, is.func, "select(selector, [...]): argument " + selector + " is not a function");
  }

  return makeEffect(SELECT, {
    selector: selector,
    args: args
  });
}
/**
  channel(pattern, [buffer])    => creates a proxy channel for store actions
**/

function actionChannel(pattern, buffer) {
  if (process.env.NODE_ENV === 'development') {
    check(pattern, is.notUndef, 'actionChannel(pattern,...): argument pattern is undefined');

    if (arguments.length > 1) {
      check(buffer, is.notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
      check(buffer, is.buffer, "actionChannel(pattern, buffer): argument " + buffer + " is not a valid buffer");
    }
  }

  return makeEffect(ACTION_CHANNEL, {
    pattern: pattern,
    buffer: buffer
  });
}
function cancelled() {
  return makeEffect(CANCELLED, {});
}
function flush(channel) {
  if (process.env.NODE_ENV === 'development') {
    check(channel, is.channel, "flush(channel): argument " + channel + " is not valid channel");
  }

  return makeEffect(FLUSH, channel);
}
function getContext(prop) {
  if (process.env.NODE_ENV === 'development') {
    check(prop, is.string, "getContext(prop): argument " + prop + " is not a string");
  }

  return makeEffect(GET_CONTEXT, prop);
}
function setContext(props) {
  if (process.env.NODE_ENV === 'development') {
    check(props, is.object, createSetContextWarning(null, props));
  }

  return makeEffect(SET_CONTEXT, props);
}
var delay =
/*#__PURE__*/
call.bind(null, delayP);

var createAsEffectType = function createAsEffectType(type) {
  return function (effect) {
    return effect && effect[symbols.IO] && effect.type === type && effect.payload;
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
  createAsEffectType(CANCEL),
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

exports.kTrue = kTrue;
exports.noop = noop;
exports.check = check;
exports.remove = remove;
exports.once = once;
exports.internalErr = internalErr;
exports._extends = _extends;
exports.TAKE = TAKE;
exports.PUT = PUT;
exports.ALL = ALL;
exports.RACE = RACE;
exports.CALL = CALL;
exports.CPS = CPS;
exports.FORK = FORK;
exports.JOIN = JOIN;
exports.CANCEL = CANCEL;
exports.SELECT = SELECT;
exports.ACTION_CHANNEL = ACTION_CHANNEL;
exports.CANCELLED = CANCELLED;
exports.FLUSH = FLUSH;
exports.GET_CONTEXT = GET_CONTEXT;
exports.SET_CONTEXT = SET_CONTEXT;
exports.uid = uid;
exports.array = array;
exports.object = object;
exports.makeIterator = makeIterator;
exports.createSetContextWarning = createSetContextWarning;
exports.shouldCancel = shouldCancel;
exports.shouldTerminate = shouldTerminate;
exports.createAllStyleChildCallbacks = createAllStyleChildCallbacks;
exports.shouldComplete = shouldComplete;
exports.wrapSagaDispatch = wrapSagaDispatch;
exports.log = log;
exports._objectWithoutProperties = _objectWithoutProperties;
exports.identity = identity;
exports.take = take;
exports.fork = fork;
exports.cancel = cancel;
exports.call = call;
exports.actionChannel = actionChannel;
exports.delay = delay;
exports.race = race;
exports.detach = detach;
exports.takeMaybe = takeMaybe;
exports.put = put;
exports.putResolve = putResolve;
exports.all = all;
exports.apply = apply;
exports.cps = cps;
exports.spawn = spawn;
exports.join = join;
exports.select = select;
exports.cancelled = cancelled;
exports.flush = flush;
exports.getContext = getContext;
exports.setContext = setContext;
exports.createMockTask = createMockTask;
exports.cloneableGenerator = cloneableGenerator;
exports.asEffect = asEffect;
