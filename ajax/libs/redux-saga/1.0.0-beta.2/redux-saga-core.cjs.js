'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var is = require('@redux-saga/is');
var __chunk_1 = require('./chunk-8f967a4b.js');
var symbols = require('@redux-saga/symbols');
var __chunk_2 = require('./chunk-3152cf70.js');
var deferred = _interopDefault(require('@redux-saga/deferred'));
var redux = require('redux');
require('@redux-saga/delay-p');

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

var array = function array(patterns) {
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
var string = function string(pattern) {
  return function (input) {
    return input.type === String(pattern);
  };
};
var symbol = function symbol(pattern) {
  return function (input) {
    return input.type === pattern;
  };
};
var wildcard = function wildcard() {
  return __chunk_1.kTrue;
};
function matcher(pattern) {
  // prettier-ignore
  var matcherCreator = pattern === '*' ? wildcard : is.string(pattern) ? string : is.array(pattern) ? array : is.stringableFunc(pattern) ? string : is.func(pattern) ? predicate : is.symbol(pattern) ? symbol : null;

  if (matcherCreator === null) {
    throw new Error("invalid pattern: " + pattern);
  }

  return matcherCreator(pattern);
}

var END = {
  type: symbols.CHANNEL_END_TYPE
};
var isEnd = function isEnd(a) {
  return a && a.type === symbols.CHANNEL_END_TYPE;
};
var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
var UNDEFINED_INPUT_ERROR = "Saga or channel was provided with an undefined action\nHints:\n  - check that your Action Creator returns a non-undefined value\n  - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners";
function channel(buffer) {
  if (buffer === void 0) {
    buffer = __chunk_2.expanding();
  }

  var closed = false;
  var takers = [];

  if (process.env.NODE_ENV === 'development') {
    __chunk_1.check(buffer, is.buffer, INVALID_BUFFER);
  }

  function checkForbiddenStates() {
    if (closed && takers.length) {
      throw __chunk_1.internalErr('Cannot have a closed channel with pending takers');
    }

    if (takers.length && !buffer.isEmpty()) {
      throw __chunk_1.internalErr('Cannot have pending takers with non empty buffer');
    }
  }

  function put(input) {
    checkForbiddenStates();

    if (process.env.NODE_ENV === 'development') {
      __chunk_1.check(input, is.notUndef, UNDEFINED_INPUT_ERROR);
    }

    if (closed) {
      return;
    }

    if (takers.length === 0) {
      return buffer.put(input);
    }

    var cb = takers.shift();
    cb(input);
  }

  function take(cb) {
    checkForbiddenStates();

    if (process.env.NODE_ENV === 'development') {
      __chunk_1.check(cb, is.func, "channel.take's callback must be a function");
    }

    if (closed && buffer.isEmpty()) {
      cb(END);
    } else if (!buffer.isEmpty()) {
      cb(buffer.take());
    } else {
      takers.push(cb);

      cb.cancel = function () {
        return __chunk_1.remove(takers, cb);
      };
    }
  }

  function flush$$1(cb) {
    checkForbiddenStates(); // TODO: check if some new state should be forbidden now

    if (process.env.NODE_ENV === 'development') {
      __chunk_1.check(cb, is.func, "channel.flush' callback must be a function");
    }

    if (closed && buffer.isEmpty()) {
      cb(END);
      return;
    }

    cb(buffer.flush());
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
function eventChannel(subscribe, buffer) {
  if (buffer === void 0) {
    buffer = __chunk_2.none();
  }

  var closed = false;
  var unsubscribe;
  var chan = channel(buffer);

  var close = function close() {
    if (is.func(unsubscribe)) {
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

  if (!is.func(unsubscribe)) {
    throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
  }

  unsubscribe = __chunk_1.once(unsubscribe);

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

  return _ref = {}, _ref[symbols.MULTICAST] = true, _ref.put = function put(input) {
    // TODO: should I check forbidden state here? 1 of them is even impossible
    // as we do not possibility of buffer here
    if (process.env.NODE_ENV === 'development') {
      __chunk_1.check(input, is.notUndef, UNDEFINED_INPUT_ERROR);
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
      if (taker[symbols.MATCH](input)) {
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

    cb[symbols.MATCH] = matcher$$1;
    ensureCanMutateNextTakers();
    nextTakers.push(cb);
    cb.cancel = __chunk_1.once(function () {
      ensureCanMutateNextTakers();
      __chunk_1.remove(nextTakers, cb);
    });
  }, _ref.close = close, _ref;
}
function stdChannel() {
  var chan = multicastChannel();
  var put = chan.put;

  chan.put = function (input) {
    if (input[symbols.SAGA_ACTION]) {
      put(input);
      return;
    }

    asap(function () {
      return put(input);
    });
  };

  return chan;
}

function formatLocation(fileName, lineNumber) {
  return fileName + "?" + lineNumber;
}

function getLocation(instrumented) {
  return instrumented[symbols.SAGA_LOCATION];
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

function getIteratorMetaInfo(iterator, fn) {
  if (iterator.isSagaIterator) {
    return {
      name: iterator.meta.name
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

  function addTask(task) {
    tasks.push(task);

    task.cont = function (res, isErr) {
      if (completed) {
        return;
      }

      __chunk_1.remove(tasks, task);
      task.cont = __chunk_1.noop;

      if (isErr) {
        abort(res);
      } else {
        if (task === mainTask) {
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
      t.cont = __chunk_1.noop;
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


  if (is.iterator(result)) {
    return result;
  } // do not bubble up synchronous failures for detached forks
  // instead create a failed task. See #152 and #441


  return error ? __chunk_1.makeIterator(function () {
    throw error;
  }) : __chunk_1.makeIterator(function () {
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

function proc(env, iterator, parentContext, parentEffectId, meta, cont) {
  var taskContext = Object.create(parentContext);
  var finalRunEffect = env.finalizeRunEffect(runEffect);
  var crashedEffect = null;
  var cancelledDueToErrorTasks = [];
  /**
    Tracks the current effect cancellation
    Each time the generator progresses. calling runEffect will set a new value
    on it. It allows propagating cancellation to child effects
  **/

  next.cancel = __chunk_1.noop;
  /**
    Creates a new task descriptor for this generator, We'll also create a main task
    to track the main flow (besides other forked tasks)
  **/

  var task = newTask(parentEffectId, meta, cont);
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
      next(symbols.TASK_CANCEL);
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
    if (task._isRunning && !task._isCancelled) {
      task._isCancelled = true;
      taskQueue.cancelAll();
      /**
        Ending with a Never result will propagate the Cancellation to all joiners
      **/

      end(symbols.TASK_CANCEL);
    }
  }
  /**
    attaches cancellation logic to this task's continuation
    this will permit cancellation to propagate down the call chain
  **/


  cont && (cont.cancel = cancel); // kicks up the generator

  next(); // then return the task descriptor to the caller

  return task;
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
        result = iterator.throw(arg);
      } else if (__chunk_1.shouldCancel(arg)) {
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

        result = is.func(iterator.return) ? iterator.return(symbols.TASK_CANCEL) : {
          done: true,
          value: symbols.TASK_CANCEL
        };
      } else if (__chunk_1.shouldTerminate(arg)) {
        // We get TERMINATE flag, i.e. by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
        result = is.func(iterator.return) ? iterator.return() : {
          done: true
        };
      } else {
        result = iterator.next(arg);
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
    task._isRunning = false; // stdChannel.close()

    if (!isErr) {
      task._result = result;
      task._deferredEnd && task._deferredEnd.resolve(result);
    } else {
      addSagaStack(result, {
        meta: meta,
        effect: crashedEffect,
        cancelledTasks: cancelledDueToErrorTasks
      });

      if (!task.cont) {
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

      task._error = result;
      task._isAborted = true;
      task._deferredEnd && task._deferredEnd.reject(result);
    }

    task.cont && task.cont(result, isErr);
    task.joiners.forEach(function (j) {
      return j.cb(result, isErr);
    });
    task.joiners = null;
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
    if (is.promise(effect)) {
      resolvePromise(effect, currCb);
    } else if (is.iterator(effect)) {
      resolveIterator(effect, effectId, meta, currCb);
    } else if (effect && effect[symbols.IO]) {
      var type = effect.type,
          payload = effect.payload;
      if (type === __chunk_1.TAKE) runTakeEffect(payload, currCb);else if (type === __chunk_1.PUT) runPutEffect(payload, currCb);else if (type === __chunk_1.ALL) runAllEffect(payload, effectId, currCb);else if (type === __chunk_1.RACE) runRaceEffect(payload, effectId, currCb);else if (type === __chunk_1.CALL) runCallEffect(payload, effectId, currCb);else if (type === __chunk_1.CPS) runCPSEffect(payload, currCb);else if (type === __chunk_1.FORK) runForkEffect(payload, effectId, currCb);else if (type === __chunk_1.JOIN) runJoinEffect(payload, currCb);else if (type === __chunk_1.CANCEL) runCancelEffect(payload, currCb);else if (type === __chunk_1.SELECT) runSelectEffect(payload, currCb);else if (type === __chunk_1.ACTION_CHANNEL) runChannelEffect(payload, currCb);else if (type === __chunk_1.FLUSH) runFlushEffect(payload, currCb);else if (type === __chunk_1.CANCELLED) runCancelledEffect(payload, currCb);else if (type === __chunk_1.GET_CONTEXT) runGetContextEffect(payload, currCb);else if (type === __chunk_1.SET_CONTEXT) runSetContextEffect(payload, currCb);else currCb(effect);
    } else {
      // anything else returned as is
      currCb(effect);
    }
  }

  function digestEffect(effect, parentEffectId, label, cb) {
    if (label === void 0) {
      label = '';
    }

    var effectId = __chunk_1.uid();
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
      cb.cancel = __chunk_1.noop; // defensive measure

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


    currCb.cancel = __chunk_1.noop; // setup cancellation logic on the parent cb

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

      currCb.cancel = __chunk_1.noop; // defensive measure

      env.sagaMonitor && env.sagaMonitor.effectCancelled(effectId);
    };

    finalRunEffect(effect, effectId, currCb);
  }

  function resolvePromise(promise, cb) {
    var cancelPromise = promise[symbols.CANCEL];

    if (is.func(cancelPromise)) {
      cb.cancel = cancelPromise;
    } else if (is.func(promise.abort)) {
      cb.cancel = function () {
        return promise.abort();
      };
    }

    promise.then(cb, function (error) {
      return cb(error, true);
    });
  }

  function resolveIterator(iterator, effectId, meta, cb) {
    proc(env, iterator, taskContext, effectId, meta, cb);
  }

  function runTakeEffect(_ref2, cb) {
    var _ref2$channel = _ref2.channel,
        channel$$1 = _ref2$channel === void 0 ? env.stdChannel : _ref2$channel,
        pattern = _ref2.pattern,
        maybe = _ref2.maybe;

    var takeCb = function takeCb(input) {
      if (input instanceof Error) {
        cb(input, true);
        return;
      }

      if (isEnd(input) && !maybe) {
        cb(symbols.TERMINATE);
        return;
      }

      cb(input);
    };

    try {
      channel$$1.take(takeCb, is.notUndef(pattern) ? matcher(pattern) : null);
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

      if (resolve && is.promise(result)) {
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

    return is.promise(result) ? resolvePromise(result, cb) : is.iterator(result) ? resolveIterator(result, effectId, getMetaInfo(fn), cb) : cb(result);
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
        return is.undef(err) ? cb(res) : cb(err, true);
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

      var _task = proc(env, taskIterator, taskContext, effectId, meta, detached ? null : __chunk_1.noop);

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
    if (is.array(taskOrTasks)) {
      if (taskOrTasks.length === 0) {
        cb([]);
        return;
      }

      var childCallbacks = __chunk_1.createAllStyleChildCallbacks(taskOrTasks, cb);
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
        task: task,
        cb: cb
      };

      cb.cancel = function () {
        return __chunk_1.remove(taskToJoin.joiners, joiner);
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
    if (taskOrTasks === symbols.SELF_CANCELLATION) {
      cancelSingleTask(task);
    } else if (is.array(taskOrTasks)) {
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
      cb(is.array(effects) ? [] : {});
      return;
    }

    var childCallbacks = __chunk_1.createAllStyleChildCallbacks(effects, cb);
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

        if (isErr || __chunk_1.shouldComplete(res)) {
          // Race Auto cancellation
          cb.cancel();
          cb(res, isErr);
        } else {
          var _response;

          cb.cancel();
          completed = true;
          var response = (_response = {}, _response[key] = res, _response);
          cb(is.array(effects) ? __chunk_1.array.from(__chunk_1._extends({}, response, {
            length: keys.length
          })) : response);
        }
      };

      chCbAtKey.cancel = __chunk_1.noop;
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
    var pattern = _ref8.pattern,
        buffer = _ref8.buffer;
    // TODO: rethink how END is handled
    var chan = channel(buffer);
    var match = matcher(pattern);

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
    __chunk_1.object.assign(taskContext, props);
    cb();
  }

  function newTask(id, meta, cont) {
    var _task2;

    var task = (_task2 = {}, _task2[symbols.TASK] = true, _task2.id = id, _task2.meta = meta, _task2._deferredEnd = null, _task2.toPromise = function toPromise() {
      if (task._deferredEnd) {
        return task._deferredEnd.promise;
      }

      var def = deferred();
      task._deferredEnd = def;

      if (!task._isRunning) {
        if (task._isAborted) {
          def.reject(task._error);
        } else {
          def.resolve(task._result);
        }
      }

      return def.promise;
    }, _task2.cont = cont, _task2.joiners = [], _task2.cancel = cancel, _task2._isRunning = true, _task2._isCancelled = false, _task2._isAborted = false, _task2._result = undefined, _task2._error = undefined, _task2.isRunning = function isRunning() {
      return task._isRunning;
    }, _task2.isCancelled = function isCancelled() {
      return task._isCancelled;
    }, _task2.isAborted = function isAborted() {
      return task._isAborted;
    }, _task2.result = function result() {
      return task._result;
    }, _task2.error = function error() {
      return task._error;
    }, _task2.setContext = function setContext(props) {
      if (process.env.NODE_ENV === 'development') {
        __chunk_1.check(props, is.object, __chunk_1.createSetContextWarning('task', props));
      }

      __chunk_1.object.assign(taskContext, props);
    }, _task2);
    return task;
  }
}

var RUN_SAGA_SIGNATURE = 'runSaga(options, saga, ...args)';
var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ": saga argument must be a Generator function!";
function runSaga(options, saga) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (process.env.NODE_ENV === 'development') {
    __chunk_1.check(saga, is.func, NON_GENERATOR_ERR);
  }

  var iterator = saga.apply(void 0, args);

  if (process.env.NODE_ENV === 'development') {
    __chunk_1.check(iterator, is.iterator, NON_GENERATOR_ERR);
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
  var effectId = __chunk_1.uid();

  if (sagaMonitor) {
    // monitors are expected to have a certain interface, let's fill-in any missing ones
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || __chunk_1.noop;
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || __chunk_1.noop;
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || __chunk_1.noop;
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || __chunk_1.noop;
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || __chunk_1.noop;
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

  if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && is.notUndef(effectMiddlewares)) {
    var MIDDLEWARE_TYPE_ERROR = 'effectMiddlewares must be an array of functions';
    __chunk_1.check(effectMiddlewares, is.array, MIDDLEWARE_TYPE_ERROR);
    effectMiddlewares.forEach(function (effectMiddleware) {
      return __chunk_1.check(effectMiddleware, is.func, MIDDLEWARE_TYPE_ERROR);
    });
  }

  if (process.env.NODE_ENV === 'development') {
    if (is.notUndef(onError)) {
      __chunk_1.check(onError, is.func, 'onError must be a function');
    }
  }

  var log = logger || __chunk_1.log;

  var logError = function logError(err) {
    log('error', err);

    if (err && err.sagaStack) {
      log('error', err.sagaStack);
    }
  };

  var middleware = effectMiddlewares && redux.compose.apply(void 0, effectMiddlewares);

  var finalizeRunEffect = function finalizeRunEffect(runEffect) {
    if (is.func(middleware)) {
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
    dispatch: __chunk_1.wrapSagaDispatch(dispatch),
    getState: getState,
    sagaMonitor: sagaMonitor,
    logError: logError,
    onError: onError,
    finalizeRunEffect: finalizeRunEffect
  };
  var task = proc(env, iterator, context, effectId, getMetaInfo(saga), null);

  if (sagaMonitor) {
    sagaMonitor.effectResolved(effectId, task);
  }

  return task;
}

function sagaMiddlewareFactory(_ref) {
  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$context = _ref2.context,
      context = _ref2$context === void 0 ? {} : _ref2$context,
      options = __chunk_1._objectWithoutProperties(_ref2, ["context"]);

  var sagaMonitor = options.sagaMonitor,
      logger = options.logger,
      onError = options.onError,
      effectMiddlewares = options.effectMiddlewares;
  var boundRunSaga;

  if (process.env.NODE_ENV === 'development') {
    if (is.notUndef(logger)) {
      __chunk_1.check(logger, is.func, 'options.logger passed to the Saga middleware is not a function!');
    }

    if (is.notUndef(onError)) {
      __chunk_1.check(onError, is.func, 'options.onError passed to the Saga middleware is not a function!');
    }

    if (is.notUndef(options.emitter)) {
      __chunk_1.check(options.emitter, is.func, 'options.emitter passed to the Saga middleware is not a function!');
    }
  }

  function sagaMiddleware(_ref3) {
    var getState = _ref3.getState,
        dispatch = _ref3.dispatch;
    var channel$$1 = stdChannel();
    channel$$1.put = (options.emitter || __chunk_1.identity)(channel$$1.put);
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
    if (process.env.NODE_ENV === 'development' && !boundRunSaga) {
      throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
    }

    return boundRunSaga.apply(void 0, arguments);
  };

  sagaMiddleware.setContext = function (props) {
    if (process.env.NODE_ENV === 'development') {
      __chunk_1.check(props, is.object, __chunk_1.createSetContextWarning('sagaMiddleware', props));
    }

    __chunk_1.object.assign(context, props);
  };

  return sagaMiddleware;
}

exports.detach = __chunk_1.detach;
exports.CANCEL = symbols.CANCEL;
exports.SAGA_LOCATION = symbols.SAGA_LOCATION;
exports.buffers = __chunk_2.buffers;
exports.default = sagaMiddlewareFactory;
exports.runSaga = runSaga;
exports.END = END;
exports.isEnd = isEnd;
exports.eventChannel = eventChannel;
exports.channel = channel;
exports.multicastChannel = multicastChannel;
exports.stdChannel = stdChannel;
