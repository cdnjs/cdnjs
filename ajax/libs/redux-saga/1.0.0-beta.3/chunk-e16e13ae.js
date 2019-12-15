import _extends from '@babel/runtime/helpers/esm/extends';
import { notUndef, func, object, iterator, array, buffer, pattern, multicast, channel, undef, string, task, stringableFunc, symbol, promise } from '@redux-saga/is';
import { SAGA_ACTION, TASK, TASK_CANCEL, TERMINATE } from '@redux-saga/symbols';

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
var hasSymbol = typeof Symbol === 'function';
var asyncIteratorSymbol = hasSymbol && Symbol.asyncIterator ? Symbol.asyncIterator : '@@asyncIterator';
function check(value, predicate, error) {
  if (!predicate(value)) {
    throw new Error(error);
  }
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(object$$1, property) {
  return notUndef(object$$1) && hasOwnProperty.call(object$$1, property);
}
var assignWithSymbols = function assignWithSymbols(target, source) {
  _extends(target, source);

  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(source).forEach(function (s) {
      target[s] = source[s];
    });
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
var FROZEN_ACTION_ERROR = "You can't put (a.k.a. dispatch from saga) frozen actions.\nWe have to define a special non-enumerable property on those actions for scheduling purposes.\nOtherwise you wouldn't be able to communicate properly between sagas & other subscribers (action ordering would become far less predictable).\nIf you are using redux and you care about this behaviour (frozen actions),\nthen you might want to switch to freezing actions in a middleware rather than in action creator.\nExample implementation:\n\nconst freezeActions = store => next => action => next(Object.freeze(action))\n";
var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
  return function (action) {
    if (process.env.NODE_ENV !== 'production') {
      check(action, function (ac) {
        return !Object.isFrozen(ac);
      }, FROZEN_ACTION_ERROR);
    }

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

  if (process.env.NODE_ENV !== 'production') {
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

export { kTrue as a, noop as b, check as c, createSetContextWarning as d, identity as e, remove as f, once as g, internalErr as h, uid as i, array$1 as j, assignWithSymbols as k, makeIterator as l, shouldCancel as m, shouldTerminate as n, createAllStyleChildCallbacks as o, shouldComplete as p, asyncIteratorSymbol as q, wrapSagaDispatch as r, log as s, createMockTask as t, cloneableGenerator as u };
