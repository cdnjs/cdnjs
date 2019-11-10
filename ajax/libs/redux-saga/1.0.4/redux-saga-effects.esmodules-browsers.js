import { Q as makeIterator, a5 as channel, d as stringableFunc, e as func, a7 as take, a8 as fork, a9 as cancel, aa as call, ab as actionChannel, ac as sliding, ad as delay, ae as race, i as check, n as notUndef } from './chunk-9e86d186.js';
export { ai as effectTypes, a7 as take, aj as takeMaybe, ak as put, al as putResolve, am as all, ae as race, aa as call, an as apply, ao as cps, a8 as fork, ap as spawn, aq as join, a9 as cancel, ar as select, ab as actionChannel, as as cancelled, at as flush, au as getContext, av as setContext, ad as delay } from './chunk-9e86d186.js';

const done = value => ({
  done: true,
  value
});

const qEnd = {};
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
  let stateUpdater,
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
      const currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect;
    }
  }

  return makeIterator(next, error => next(null, error), name);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  const yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  const yFork = ac => ({
    done: false,
    value: fork(worker, ...args, ac)
  });

  let action,
      setAction = ac => action = ac;

  return fsmIterator({
    q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },

    q2() {
      return {
        nextState: 'q1',
        effect: yFork(action)
      };
    }

  }, 'q1', `takeEvery(${safeName(patternOrChannel)}, ${worker.name})`);
}

function takeLatest(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  const yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  const yFork = ac => ({
    done: false,
    value: fork(worker, ...args, ac)
  });

  const yCancel = task => ({
    done: false,
    value: cancel(task)
  });

  let task, action;

  const setTask = t => task = t;

  const setAction = ac => action = ac;

  return fsmIterator({
    q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },

    q2() {
      return task ? {
        nextState: 'q3',
        effect: yCancel(task)
      } : {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    },

    q3() {
      return {
        nextState: 'q1',
        effect: yFork(action),
        stateUpdater: setTask
      };
    }

  }, 'q1', `takeLatest(${safeName(patternOrChannel)}, ${worker.name})`);
}

function takeLeading(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  const yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  const yCall = ac => ({
    done: false,
    value: call(worker, ...args, ac)
  });

  let action;

  const setAction = ac => action = ac;

  return fsmIterator({
    q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },

    q2() {
      return {
        nextState: 'q1',
        effect: yCall(action)
      };
    }

  }, 'q1', `takeLeading(${safeName(patternOrChannel)}, ${worker.name})`);
}

function throttle(delayLength, pattern, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  let action, channel;
  const yActionChannel = {
    done: false,
    value: actionChannel(pattern, sliding(1))
  };

  const yTake = () => ({
    done: false,
    value: take(channel)
  });

  const yFork = ac => ({
    done: false,
    value: fork(worker, ...args, ac)
  });

  const yDelay = {
    done: false,
    value: delay(delayLength)
  };

  const setAction = ac => action = ac;

  const setChannel = ch => channel = ch;

  return fsmIterator({
    q1() {
      return {
        nextState: 'q2',
        effect: yActionChannel,
        stateUpdater: setChannel
      };
    },

    q2() {
      return {
        nextState: 'q3',
        effect: yTake(),
        stateUpdater: setAction
      };
    },

    q3() {
      return {
        nextState: 'q4',
        effect: yFork(action)
      };
    },

    q4() {
      return {
        nextState: 'q2',
        effect: yDelay
      };
    }

  }, 'q1', `throttle(${safeName(pattern)}, ${worker.name})`);
}

function retry(maxTries, delayLength, fn) {
  let counter = maxTries;

  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  const yCall = {
    done: false,
    value: call(fn, ...args)
  };
  const yDelay = {
    done: false,
    value: delay(delayLength)
  };
  return fsmIterator({
    q1() {
      return {
        nextState: 'q2',
        effect: yCall,
        errorState: 'q10'
      };
    },

    q2() {
      return {
        nextState: qEnd
      };
    },

    q10(error) {
      counter -= 1;

      if (counter <= 0) {
        throw error;
      }

      return {
        nextState: 'q1',
        effect: yDelay
      };
    }

  }, 'q1', `retry(${fn.name})`);
}

function debounceHelper(delayLength, patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  let action, raceOutput;
  const yTake = {
    done: false,
    value: take(patternOrChannel)
  };
  const yRace = {
    done: false,
    value: race({
      action: take(patternOrChannel),
      debounce: delay(delayLength)
    })
  };

  const yFork = ac => ({
    done: false,
    value: fork(worker, ...args, ac)
  });

  const yNoop = value => ({
    done: false,
    value
  });

  const setAction = ac => action = ac;

  const setRaceOutput = ro => raceOutput = ro;

  return fsmIterator({
    q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },

    q2() {
      return {
        nextState: 'q3',
        effect: yRace,
        stateUpdater: setRaceOutput
      };
    },

    q3() {
      return raceOutput.debounce ? {
        nextState: 'q1',
        effect: yFork(action)
      } : {
        nextState: 'q2',
        effect: yNoop(raceOutput.action),
        stateUpdater: setAction
      };
    }

  }, 'q1', `debounce(${safeName(patternOrChannel)}, ${worker.name})`);
}

const validateTakeEffect = (fn, patternOrChannel, worker) => {
  check(patternOrChannel, notUndef, `${fn.name} requires a pattern or channel`);
  check(worker, notUndef, `${fn.name} requires a saga parameter`);
};

function takeEvery$1(patternOrChannel, worker) {
  {
    validateTakeEffect(takeEvery$1, patternOrChannel, worker);
  }

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork(takeEvery, patternOrChannel, worker, ...args);
}
function takeLatest$1(patternOrChannel, worker) {
  {
    validateTakeEffect(takeLatest$1, patternOrChannel, worker);
  }

  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return fork(takeLatest, patternOrChannel, worker, ...args);
}
function takeLeading$1(patternOrChannel, worker) {
  {
    validateTakeEffect(takeLeading$1, patternOrChannel, worker);
  }

  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  return fork(takeLeading, patternOrChannel, worker, ...args);
}
function throttle$1(ms, pattern, worker) {
  {
    check(pattern, notUndef, 'throttle requires a pattern');
    check(worker, notUndef, 'throttle requires a saga parameter');
  }

  for (var _len4 = arguments.length, args = new Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
    args[_key4 - 3] = arguments[_key4];
  }

  return fork(throttle, ms, pattern, worker, ...args);
}
function retry$1(maxTries, delayLength, worker) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
    args[_key5 - 3] = arguments[_key5];
  }

  return call(retry, maxTries, delayLength, worker, ...args);
}
function debounce(delayLength, pattern, worker) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
    args[_key6 - 3] = arguments[_key6];
  }

  return fork(debounceHelper, delayLength, pattern, worker, ...args);
}

export { debounce, retry$1 as retry, takeEvery$1 as takeEvery, takeLatest$1 as takeLatest, takeLeading$1 as takeLeading, throttle$1 as throttle };
