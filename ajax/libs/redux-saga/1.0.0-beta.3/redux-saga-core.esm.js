import { notUndef, func, object, iterator, array, buffer, pattern, multicast, channel, undef, string, task, stringableFunc, symbol, promise } from '@redux-saga/is';
import { a as kTrue, c as check, f as remove, g as once, h as internalErr, b as noop, i as uid, j as array$1, k as assignWithSymbols, l as makeIterator, d as createSetContextWarning, m as shouldCancel, n as shouldTerminate, o as createAllStyleChildCallbacks, p as shouldComplete, q as asyncIteratorSymbol, r as wrapSagaDispatch, s as log, e as identity } from './chunk-e16e13ae.js';
import { CHANNEL_END_TYPE, MATCH, MULTICAST, SAGA_ACTION, SAGA_LOCATION, CANCEL, IO, TERMINATE, TASK, TASK_CANCEL, SELF_CANCELLATION } from '@redux-saga/symbols';
export { CANCEL, SAGA_LOCATION } from '@redux-saga/symbols';
import { a as none, b as fixed, c as dropping, d as sliding, e as expanding, f as buffers, g as TAKE, h as PUT, i as ALL, j as RACE, k as CALL, l as CPS, m as FORK, n as JOIN, o as CANCEL$1, p as SELECT, q as ACTION_CHANNEL, r as CANCELLED, s as FLUSH, t as GET_CONTEXT, u as SET_CONTEXT, v as effectTypes } from './chunk-7bc4cf1d.js';
export { f as buffers, D as detach } from './chunk-7bc4cf1d.js';
import _extends from '@babel/runtime/helpers/esm/extends';
import deferred from '@redux-saga/deferred';
import { compose } from 'redux';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import '@redux-saga/delay-p';

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

function exec(task$$1) {
  try {
    suspend();
    task$$1();
  } finally {
    release();
  }
}
/**
  Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
**/


function asap(task$$1) {
  queue.push(task$$1);

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
  var task$$1;

  while (!semaphore && (task$$1 = queue.shift()) !== undefined) {
    exec(task$$1);
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
var CLOSED_CHANNEL_WITH_TAKERS = 'Cannot have a closed channel with pending takers';
var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
var UNDEFINED_INPUT_ERROR = "Saga or channel was provided with an undefined action\nHints:\n  - check that your Action Creator returns a non-undefined value\n  - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners";
function channel$1(buffer$$1) {
  if (buffer$$1 === void 0) {
    buffer$$1 = expanding();
  }

  var closed = false;
  var takers = [];

  if (process.env.NODE_ENV !== 'production') {
    check(buffer$$1, buffer, INVALID_BUFFER);
  }

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw internalErr(CLOSED_CHANNEL_WITH_TAKERS);
    }

    if (takers.length && !buffer$$1.isEmpty()) {
      throw internalErr('Cannot have pending takers with non empty buffer');
    }
  }

  function put(input) {
    if (process.env.NODE_ENV !== 'production') {
      checkForbiddenStates();
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
    if (process.env.NODE_ENV !== 'production') {
      checkForbiddenStates();
      check(cb, func, "channel.take's callback must be a function");
    }

    if (closed && buffer$$1.isEmpty()) {
      cb(END);
    } else if (!buffer$$1.isEmpty()) {
      cb(buffer$$1.take());
    } else {
      takers.push(cb);

      cb.cancel = function () {
        remove(takers, cb);
      };
    }
  }

  function flush$$1(cb) {
    if (process.env.NODE_ENV !== 'production') {
      checkForbiddenStates();
      check(cb, func, "channel.flush' callback must be a function");
    }

    if (closed && buffer$$1.isEmpty()) {
      cb(END);
      return;
    }

    cb(buffer$$1.flush());
  }

  function close() {
    if (process.env.NODE_ENV !== 'production') {
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

  if (process.env.NODE_ENV !== 'production') {
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
    if (process.env.NODE_ENV !== 'production') {
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
    if (process.env.NODE_ENV !== 'production') {
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
  }, _ref.take = function take(cb, matcher$$1) {
    if (matcher$$1 === void 0) {
      matcher$$1 = wildcard;
    }

    if (process.env.NODE_ENV !== 'production') {
      checkForbiddenStates();
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
      put(input);
    });
  };

  return chan;
}

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

var flatMap = function flatMap(mapper, arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, arr.map(mapper));
};

function cancelledTasksAsString(sagaStack) {
  var cancelledTasks = flatMap(function (i) {
    return i.cancelledTasks;
  }, sagaStack);

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
  try {
    var result = fn.apply(context, args); // i.e. a generator function returns an iterator

    if (iterator(result)) {
      return result;
    }

    var next = function next(value) {
      if (value === void 0) {
        value = result;
      }

      return {
        value: value,
        done: !promise(value)
      };
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

function proc(env, iterator$$1, parentContext, parentEffectId, meta, cont) {
  if (process.env.NODE_ENV !== 'production' && iterator$$1[asyncIteratorSymbol]) {
    throw new Error("redux-saga doesn't support async generators, please use only regular ones");
  }

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
    task$$1._isRunning = false;

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

    // catch synchronous failures; see #152
    try {
      var result = fn.apply(context, args);

      if (promise(result)) {
        resolvePromise(result, cb);
        return;
      }

      if (iterator(result)) {
        resolveIterator(result, effectId, getMetaInfo(fn), cb);
        return;
      }

      cb(result);
    } catch (error) {
      cb(error, true);
    }
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

    var close = chan.close;

    chan.close = function () {
      taker.cancel();
      close();
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
    assignWithSymbols(taskContext, props);
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
      if (process.env.NODE_ENV !== 'production') {
        check(props, object, createSetContextWarning('task', props));
      }

      assignWithSymbols(taskContext, props);
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

  if (process.env.NODE_ENV !== 'production') {
    check(saga, func, NON_GENERATOR_ERR);
  }

  var iterator$$1 = saga.apply(void 0, args);

  if (process.env.NODE_ENV !== 'production') {
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

  if (process.env.NODE_ENV !== 'production' && notUndef(effectMiddlewares)) {
    var MIDDLEWARE_TYPE_ERROR = 'effectMiddlewares must be an array of functions';
    check(effectMiddlewares, array, MIDDLEWARE_TYPE_ERROR);
    effectMiddlewares.forEach(function (effectMiddleware) {
      return check(effectMiddleware, func, MIDDLEWARE_TYPE_ERROR);
    });
  }

  if (process.env.NODE_ENV !== 'production') {
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

  try {
    suspend();
    var task$$1 = proc(env, iterator$$1, context, effectId, getMetaInfo(saga), null);

    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task$$1);
    }

    return task$$1;
  } finally {
    flush();
  }
}

function sagaMiddlewareFactory(_ref) {
  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$context = _ref2.context,
      context = _ref2$context === void 0 ? {} : _ref2$context,
      options = _objectWithoutPropertiesLoose(_ref2, ["context"]);

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError,
      effectMiddlewares = options.effectMiddlewares;
  var boundRunSaga;

  if (process.env.NODE_ENV !== 'production') {
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
    if (process.env.NODE_ENV !== 'production' && !boundRunSaga) {
      throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
    }

    return boundRunSaga.apply(void 0, arguments);
  };

  sagaMiddleware.setContext = function (props) {
    if (process.env.NODE_ENV !== 'production') {
      check(props, object, createSetContextWarning('sagaMiddleware', props));
    }

    assignWithSymbols(context, props);
  };

  return sagaMiddleware;
}

export default sagaMiddlewareFactory;
export { runSaga, END, isEnd, eventChannel, channel$1 as channel, multicastChannel, stdChannel };
