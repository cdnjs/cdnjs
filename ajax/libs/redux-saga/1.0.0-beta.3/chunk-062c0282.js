'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-5caa0f1a.js');
var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var delayP = _interopDefault(require('@redux-saga/delay-p'));
var is = require('@redux-saga/is');
var symbols = require('@redux-saga/symbols');

var BUFFER_OVERFLOW = "Channel's Buffer overflow!";
var ON_OVERFLOW_THROW = 1;
var ON_OVERFLOW_DROP = 2;
var ON_OVERFLOW_SLIDE = 3;
var ON_OVERFLOW_EXPAND = 4;
var zeroBuffer = {
  isEmpty: __chunk_1.kTrue,
  put: __chunk_1.noop,
  take: __chunk_1.noop
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

var effectTypes = /*#__PURE__*/Object.freeze({
  TAKE: TAKE,
  PUT: PUT,
  ALL: ALL,
  RACE: RACE,
  CALL: CALL,
  CPS: CPS,
  FORK: FORK,
  JOIN: JOIN,
  CANCEL: CANCEL,
  SELECT: SELECT,
  ACTION_CHANNEL: ACTION_CHANNEL,
  CANCELLED: CANCELLED,
  FLUSH: FLUSH,
  GET_CONTEXT: GET_CONTEXT,
  SET_CONTEXT: SET_CONTEXT
});

var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

var makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[symbols.IO] = true, _ref.type = type, _ref.payload = payload, _ref;
};

var isForkEffect = function isForkEffect(eff) {
  return eff && eff[symbols.IO] && eff.type === FORK;
};

var detach = function detach(eff) {
  {
    __chunk_1.check(eff, isForkEffect, 'detach(eff): argument must be a fork effect');
  }

  return makeEffect(FORK, _extends({}, eff.payload, {
    detached: true
  }));
};
function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if (arguments.length) {
    __chunk_1.check(arguments[0], is.notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
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
  {
    if (arguments.length > 1) {
      __chunk_1.check(channel, is.notUndef, 'put(channel, action): argument channel is undefined');
      __chunk_1.check(channel, is.channel, "put(channel, action): argument " + channel + " is not a valid channel");
      __chunk_1.check(action, is.notUndef, 'put(channel, action): argument action is undefined');
    } else {
      __chunk_1.check(channel, is.notUndef, 'put(action): argument action is undefined');
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
} // this match getFnCallDescriptor logic

var validateFnDescriptor = function validateFnDescriptor(effectName, fnDescriptor) {
  __chunk_1.check(fnDescriptor, is.notUndef, effectName + ": argument fn is undefined or null");

  if (is.func(fnDescriptor)) {
    return;
  }

  var context = null;
  var fn;

  if (is.array(fnDescriptor)) {
    context = fnDescriptor[0];
    fn = fnDescriptor[1];
    __chunk_1.check(fn, is.notUndef, effectName + ": argument of type [context, fn] has undefined or null `fn`");
  } else if (is.object(fnDescriptor)) {
    context = fnDescriptor.context;
    fn = fnDescriptor.fn;
    __chunk_1.check(fn, is.notUndef, effectName + ": argument of type {context, fn} has undefined or null `fn`");
  } else {
    __chunk_1.check(fnDescriptor, is.func, effectName + ": argument fn is not function");
    return;
  }

  if (context && is.string(fn)) {
    __chunk_1.check(context[fn], is.func, effectName + ": context arguments has no such method - \"" + fn + "\"");
    return;
  }

  __chunk_1.check(fn, is.func, effectName + ": unpacked fn argument (from [context, fn] or {context, fn}) is not a function");
};

function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn;

  if (is.func(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if (is.array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && is.string(fn) && is.func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context: context,
    fn: fn,
    args: args
  };
}

function call(fnDescriptor) {
  {
    validateFnDescriptor('call', fnDescriptor);
  }

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
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

    if (is.array(taskOrTasks)) {
      taskOrTasks.forEach(function (t) {
        __chunk_1.check(t, is.task, "join([...tasks]): argument " + t + " is not a valid Task object " + TEST_HINT);
      });
    } else {
      __chunk_1.check(taskOrTasks, is.task, "join(task): argument " + taskOrTasks + " is not a valid Task object " + TEST_HINT);
    }
  }

  return makeEffect(JOIN, taskOrTasks);
}
function cancel(taskOrTasks) {
  if (taskOrTasks === void 0) {
    taskOrTasks = symbols.SELF_CANCELLATION;
  }

  {
    if (arguments.length > 1) {
      throw new Error('cancel(...tasks) is not supported any more. Please use cancel([...tasks]) to cancel multiple tasks.');
    }

    if (is.array(taskOrTasks)) {
      taskOrTasks.forEach(function (t) {
        __chunk_1.check(t, is.task, "cancel([...tasks]): argument " + t + " is not a valid Task object " + TEST_HINT);
      });
    } else if (taskOrTasks !== symbols.SELF_CANCELLATION && is.notUndef(taskOrTasks)) {
      __chunk_1.check(taskOrTasks, is.task, "cancel(task): argument " + taskOrTasks + " is not a valid Task object " + TEST_HINT);
    }
  }

  return makeEffect(CANCEL, taskOrTasks);
}
function select(selector) {
  if (selector === void 0) {
    selector = __chunk_1.identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  if (arguments.length) {
    __chunk_1.check(arguments[0], is.notUndef, 'select(selector, [...]): argument selector is undefined');
    __chunk_1.check(selector, is.func, "select(selector, [...]): argument " + selector + " is not a function");
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
  {
    __chunk_1.check(pattern, is.pattern, 'actionChannel(pattern,...): argument pattern is not valid');

    if (arguments.length > 1) {
      __chunk_1.check(buffer, is.notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
      __chunk_1.check(buffer, is.buffer, "actionChannel(pattern, buffer): argument " + buffer + " is not a valid buffer");
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
  {
    __chunk_1.check(channel, is.channel, "flush(channel): argument " + channel + " is not valid channel");
  }

  return makeEffect(FLUSH, channel);
}
function getContext(prop) {
  {
    __chunk_1.check(prop, is.string, "getContext(prop): argument " + prop + " is not a string");
  }

  return makeEffect(GET_CONTEXT, prop);
}
function setContext(props) {
  {
    __chunk_1.check(props, is.object, __chunk_1.createSetContextWarning(null, props));
  }

  return makeEffect(SET_CONTEXT, props);
}
var delay =
/*#__PURE__*/
call.bind(null, delayP);

exports.none = none;
exports.fixed = fixed;
exports.dropping = dropping;
exports.sliding = sliding;
exports.expanding = expanding;
exports.buffers = buffers;
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
exports.effectTypes = effectTypes;
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
