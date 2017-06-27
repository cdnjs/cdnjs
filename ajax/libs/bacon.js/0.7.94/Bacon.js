(function() {
var _slice = Array.prototype.slice;
var Bacon = {
  toString: function () {
    return "Bacon";
  }
};

Bacon.version = '0.7.94';

var Exception = (typeof global !== "undefined" && global !== null ? global : this).Error;
var nop = function () {};
var latter = function (_, x) {
  return x;
};
var former = function (x, _) {
  return x;
};
var cloneArray = function (xs) {
  return xs.slice(0);
};
var assert = function (message, condition) {
  if (!condition) {
    throw new Exception(message);
  }
};
var assertObservableIsProperty = function (x) {
  if ((x != null ? x._isObservable : void 0) && !(x != null ? x._isProperty : void 0)) {
    throw new Exception("Observable is not a Property : " + x);
  }
};
var assertEventStream = function (event) {
  if (!(event != null ? event._isEventStream : void 0)) {
    throw new Exception("not an EventStream : " + event);
  }
};

var assertObservable = function (event) {
  if (!(event != null ? event._isObservable : void 0)) {
    throw new Exception("not an Observable : " + event);
  }
};
var assertFunction = function (f) {
  return assert("not a function : " + f, _.isFunction(f));
};
var isArray = Array.isArray || function (xs) {
  return xs instanceof Array;
};
var isObservable = function (x) {
  return x && x._isObservable;
};
var assertArray = function (xs) {
  if (!isArray(xs)) {
    throw new Exception("not an array : " + xs);
  }
};
var assertNoArguments = function (args) {
  return assert("no arguments supported", args.length === 0);
};
var assertString = function (x) {
  if (typeof x === "string") {
    throw new Exception("not a string : " + x);
  }
};

var extend = function (target) {
  var length = arguments.length;
  for (var i = 1; 1 < length ? i < length : i > length; 1 < length ? i++ : i--) {
    for (var prop in arguments[i]) {
      target[prop] = arguments[i][prop];
    }
  }
  return target;
};

var inherit = function (child, parent) {
  var hasProp = ({}).hasOwnProperty;
  var ctor = function () {};
  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  for (var key in parent) {
    if (hasProp.call(parent, key)) {
      child[key] = parent[key];
    }
  }
  return child;
};

var symbol = function (key) {
  if (typeof Symbol !== "undefined" && Symbol[key]) {
    return Symbol[key];
  } else if (typeof Symbol !== "undefined" && typeof Symbol["for"] === "function") {
    return Symbol[key] = Symbol["for"](key);
  } else {
    return "@@" + key;
  }
};

var _ = {
  indexOf: (function () {
    if (Array.prototype.indexOf) {
      return function (xs, x) {
        return xs.indexOf(x);
      };
    } else {
      return function (xs, x) {
        for (var i = 0, y; i < xs.length; i++) {
          y = xs[i];
          if (x === y) {
            return i;
          }
        }
        return -1;
      };
    }
  })(),
  indexWhere: function (xs, f) {
    for (var i = 0, y; i < xs.length; i++) {
      y = xs[i];
      if (f(y)) {
        return i;
      }
    }
    return -1;
  },
  head: function (xs) {
    return xs[0];
  },
  always: function (x) {
    return function () {
      return x;
    };
  },
  negate: function (f) {
    return function (x) {
      return !f(x);
    };
  },
  empty: function (xs) {
    return xs.length === 0;
  },
  tail: function (xs) {
    return xs.slice(1, xs.length);
  },
  filter: function (f, xs) {
    var filtered = [];
    for (var i = 0, x; i < xs.length; i++) {
      x = xs[i];
      if (f(x)) {
        filtered.push(x);
      }
    }
    return filtered;
  },
  map: function (f, xs) {
    return (function () {
      var result = [];
      for (var i = 0, x; i < xs.length; i++) {
        x = xs[i];
        result.push(f(x));
      }
      return result;
    })();
  },
  each: function (xs, f) {
    for (var key in xs) {
      if (Object.prototype.hasOwnProperty.call(xs, key)) {
        var value = xs[key];
        f(key, value);
      }
    }
  },
  toArray: function (xs) {
    return isArray(xs) ? xs : [xs];
  },
  contains: function (xs, x) {
    return _.indexOf(xs, x) !== -1;
  },
  id: function (x) {
    return x;
  },
  last: function (xs) {
    return xs[xs.length - 1];
  },
  all: function (xs) {
    var f = arguments.length <= 1 || arguments[1] === undefined ? _.id : arguments[1];

    for (var i = 0, x; i < xs.length; i++) {
      x = xs[i];
      if (!f(x)) {
        return false;
      }
    }
    return true;
  },
  any: function (xs) {
    var f = arguments.length <= 1 || arguments[1] === undefined ? _.id : arguments[1];

    for (var i = 0, x; i < xs.length; i++) {
      x = xs[i];
      if (f(x)) {
        return true;
      }
    }
    return false;
  },
  without: function (x, xs) {
    return _.filter(function (y) {
      return y !== x;
    }, xs);
  },
  remove: function (x, xs) {
    var i = _.indexOf(xs, x);
    if (i >= 0) {
      return xs.splice(i, 1);
    }
  },
  fold: function (xs, seed, f) {
    for (var i = 0, x; i < xs.length; i++) {
      x = xs[i];
      seed = f(seed, x);
    }
    return seed;
  },
  flatMap: function (f, xs) {
    return _.fold(xs, [], function (ys, x) {
      return ys.concat(f(x));
    });
  },
  cached: function (f) {
    var value = None;
    return function () {
      if (typeof value !== "undefined" && value !== null ? value._isNone : undefined) {
        value = f();
        f = undefined;
      }
      return value;
    };
  },
  bind: function (fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
  isFunction: function (f) {
    return typeof f === "function";
  },
  toString: function (obj) {
    var internals, key, value;
    var hasProp = ({}).hasOwnProperty;
    try {
      recursionDepth++;
      if (obj == null) {
        return "undefined";
      } else if (_.isFunction(obj)) {
        return "function";
      } else if (isArray(obj)) {
        if (recursionDepth > 5) {
          return "[..]";
        }
        return "[" + _.map(_.toString, obj).toString() + "]";
      } else if ((obj != null ? obj.toString : void 0) != null && obj.toString !== Object.prototype.toString) {
        return obj.toString();
      } else if (typeof obj === "object") {
        if (recursionDepth > 5) {
          return "{..}";
        }
        internals = (function () {
          var results = [];
          for (key in obj) {
            if (!hasProp.call(obj, key)) continue;
            value = (function () {
              var error;
              try {
                return obj[key];
              } catch (error) {
                return error;
              }
            })();
            results.push(_.toString(key) + ":" + _.toString(value));
          }
          return results;
        })();
        return "{" + internals + "}";
      } else {
        return obj;
      }
    } finally {
      recursionDepth--;
    }
  }
};

var recursionDepth = 0;

Bacon._ = _;

var UpdateBarrier = Bacon.UpdateBarrier = (function () {
  var rootEvent;
  var waiterObs = [];
  var waiters = {};
  var aftersStack = [];
  var aftersStackHeight = 0;
  var flushed = {};

  function ensureStackHeight(h) {
    if (h <= aftersStackHeight) return;
    if (!aftersStack[h - 1]) {
      aftersStack[h - 1] = [[], 0];
    }
    aftersStackHeight = h;
  }

  var afterTransaction = function (obs, f) {
    if (rootEvent || aftersStack.length) {
      ensureStackHeight(1);
      var stackIndexForThisObs = 0;
      while (stackIndexForThisObs < aftersStackHeight - 1) {
        if (containsObs(obs, aftersStack[stackIndexForThisObs][0])) {
          break;
        }
        stackIndexForThisObs++;
      }
      var listFromStack = aftersStack[stackIndexForThisObs][0];
      listFromStack.push([obs, f]);
      if (!rootEvent) {
        processAfters();
      }
    } else {
        return f();
      }
  };

  function containsObs(obs, aftersList) {
    for (var i = 0; i < aftersList.length; i++) {
      if (aftersList[i][0].id == obs.id) return true;
    }
    return false;
  }

  function processAfters() {
    var stackSizeAtStart = aftersStackHeight;
    if (!stackSizeAtStart) return;
    while (aftersStackHeight >= stackSizeAtStart) {
      var topOfStack = aftersStack[aftersStackHeight - 1];
      if (!topOfStack) throw new Error("Unexpected stack top: " + topOfStack);
      var topAfters = topOfStack[0];
      var index = topOfStack[1];

      if (index < topAfters.length) {
        var _topAfters$index = topAfters[index];
        var obs = _topAfters$index[0];
        var after = _topAfters$index[1];

        topOfStack[1]++;
        ensureStackHeight(aftersStackHeight + 1);
        var callSuccess = false;
        try {
          after();
          callSuccess = true;
          while (aftersStackHeight > stackSizeAtStart && aftersStack[aftersStackHeight - 1][0].length == 0) {
            aftersStackHeight--;
          }
        } finally {
          if (!callSuccess) {
            aftersStack = [];
            aftersStackHeight = 0;
          }
        }
      } else {
          topOfStack[0] = [];
          topOfStack[1] = 0;
          break;
        }
    }
  }

  var whenDoneWith = function (obs, f) {
    if (rootEvent) {
      var obsWaiters = waiters[obs.id];
      if (!(typeof obsWaiters !== "undefined" && obsWaiters !== null)) {
        obsWaiters = waiters[obs.id] = [f];
        return waiterObs.push(obs);
      } else {
        return obsWaiters.push(f);
      }
    } else {
      return f();
    }
  };

  var flush = function () {
    while (waiterObs.length > 0) {
      flushWaiters(0, true);
    }
    flushed = {};
  };

  var flushWaiters = function (index, deps) {
    var obs = waiterObs[index];
    var obsId = obs.id;
    var obsWaiters = waiters[obsId];
    waiterObs.splice(index, 1);
    delete waiters[obsId];
    if (deps && waiterObs.length > 0) {
      flushDepsOf(obs);
    }
    for (var i = 0, f; i < obsWaiters.length; i++) {
      f = obsWaiters[i];
      f();
    }
  };

  var flushDepsOf = function (obs) {
    if (flushed[obs.id]) return;
    var deps = obs.internalDeps();
    for (var i = 0, dep; i < deps.length; i++) {
      dep = deps[i];
      flushDepsOf(dep);
      if (waiters[dep.id]) {
        var index = _.indexOf(waiterObs, dep);
        flushWaiters(index, false);
      }
    }
    flushed[obs.id] = true;
  };

  var inTransaction = function (event, context, f, args) {
    if (rootEvent) {
      return f.apply(context, args);
    } else {
      rootEvent = event;
      try {
        var result = f.apply(context, args);

        flush();
      } finally {
        rootEvent = undefined;
        processAfters();
      }
      return result;
    }
  };

  var currentEventId = function () {
    return rootEvent ? rootEvent.id : undefined;
  };

  var wrappedSubscribe = function (obs, sink) {
    var unsubd = false;
    var shouldUnsub = false;
    var doUnsub = function () {
      shouldUnsub = true;
      return shouldUnsub;
    };
    var unsub = function () {
      unsubd = true;
      return doUnsub();
    };
    doUnsub = obs.dispatcher.subscribe(function (event) {
      return afterTransaction(obs, function () {
        if (!unsubd) {
          var reply = sink(event);
          if (reply === Bacon.noMore) {
            return unsub();
          }
        }
      });
    });
    if (shouldUnsub) {
      doUnsub();
    }
    return unsub;
  };

  var hasWaiters = function () {
    return waiterObs.length > 0;
  };

  return { whenDoneWith: whenDoneWith, hasWaiters: hasWaiters, inTransaction: inTransaction, currentEventId: currentEventId, wrappedSubscribe: wrappedSubscribe, afterTransaction: afterTransaction };
})();

function Source(obs, sync) {
  var lazy = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  this.obs = obs;
  this.sync = sync;
  this.lazy = lazy;
  this.queue = [];
}

extend(Source.prototype, {
  _isSource: true,

  subscribe: function (sink) {
    return this.obs.dispatcher.subscribe(sink);
  },
  toString: function () {
    return this.obs.toString();
  },
  markEnded: function () {
    this.ended = true;
    return true;
  },
  consume: function () {
    if (this.lazy) {
      return { value: _.always(this.queue[0]) };
    } else {
      return this.queue[0];
    }
  },
  push: function (x) {
    this.queue = [x];
    return [x];
  },
  mayHave: function () {
    return true;
  },
  hasAtLeast: function () {
    return this.queue.length;
  },
  flatten: true
});

function ConsumingSource() {
  Source.apply(this, arguments);
}

inherit(ConsumingSource, Source);
extend(ConsumingSource.prototype, {
  consume: function () {
    return this.queue.shift();
  },
  push: function (x) {
    return this.queue.push(x);
  },
  mayHave: function (c) {
    return !this.ended || this.queue.length >= c;
  },
  hasAtLeast: function (c) {
    return this.queue.length >= c;
  },
  flatten: false
});

function BufferingSource(obs) {
  Source.call(this, obs, true);
}

inherit(BufferingSource, Source);
extend(BufferingSource.prototype, {
  consume: function () {
    var values = this.queue;
    this.queue = [];
    return {
      value: function () {
        return values;
      }
    };
  },
  push: function (x) {
    return this.queue.push(x.value());
  },
  hasAtLeast: function () {
    return true;
  }
});

Source.isTrigger = function (s) {
  if (s != null ? s._isSource : void 0) {
    return s.sync;
  } else {
    return s != null ? s._isEventStream : void 0;
  }
};

Source.fromObservable = function (s) {
  if (s != null ? s._isSource : void 0) {
    return s;
  } else if (s != null ? s._isProperty : void 0) {
    return new Source(s, false);
  } else {
    return new ConsumingSource(s, true);
  }
};

function Desc(context, method, args) {
  this.context = context;
  this.method = method;
  this.args = args;
}

extend(Desc.prototype, {
  _isDesc: true,
  deps: function () {
    if (!this.cached) {
      this.cached = findDeps([this.context].concat(this.args));
    }
    return this.cached;
  },
  toString: function () {
    return _.toString(this.context) + "." + _.toString(this.method) + "(" + _.map(_.toString, this.args) + ")";
  }
});

var describe = function (context, method) {
  var ref = context || method;
  if (ref && ref._isDesc) {
    return context || method;
  } else {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return new Desc(context, method, args);
  }
};

var withDesc = function (desc, obs) {
  obs.desc = desc;
  return obs;
};

var findDeps = function (x) {
  if (isArray(x)) {
    return _.flatMap(findDeps, x);
  } else if (isObservable(x)) {
    return [x];
  } else if (typeof x !== "undefined" && x !== null ? x._isSource : undefined) {
    return [x.obs];
  } else {
    return [];
  }
};

Bacon.Desc = Desc;
Bacon.Desc.empty = new Bacon.Desc("", "", []);

var withMethodCallSupport = function (wrapped) {
  return function (f) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (typeof f === "object" && args.length) {
      var context = f;
      var methodName = args[0];
      f = function () {
        return context[methodName].apply(context, arguments);
      };
      args = args.slice(1);
    }
    return wrapped.apply(undefined, [f].concat(args));
  };
};

var makeFunctionArgs = function (args) {
  args = Array.prototype.slice.call(args);
  return makeFunction_.apply(undefined, args);
};

var partiallyApplied = function (f, applied) {
  return function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return f.apply(undefined, applied.concat(args));
  };
};

var toSimpleExtractor = function (args) {
  return function (key) {
    return function (value) {
      if (!(typeof value !== "undefined" && value !== null)) {
        return;
      } else {
        var fieldValue = value[key];
        if (_.isFunction(fieldValue)) {
          return fieldValue.apply(value, args);
        } else {
          return fieldValue;
        }
      }
    };
  };
};

var toFieldExtractor = function (f, args) {
  var parts = f.slice(1).split(".");
  var partFuncs = _.map(toSimpleExtractor(args), parts);
  return function (value) {
    for (var i = 0, f; i < partFuncs.length; i++) {
      f = partFuncs[i];
      value = f(value);
    }
    return value;
  };
};

var isFieldKey = function (f) {
  return typeof f === "string" && f.length > 1 && f.charAt(0) === ".";
};

var makeFunction_ = withMethodCallSupport(function (f) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  if (_.isFunction(f)) {
    if (args.length) {
      return partiallyApplied(f, args);
    } else {
      return f;
    }
  } else if (isFieldKey(f)) {
    return toFieldExtractor(f, args);
  } else {
    return _.always(f);
  }
});

var makeFunction = function (f, args) {
  return makeFunction_.apply(undefined, [f].concat(args));
};

var convertArgsToFunction = function (obs, f, args, method) {
  if (typeof f !== "undefined" && f !== null ? f._isProperty : undefined) {
    var sampled = f.sampledBy(obs, function (p, s) {
      return [p, s];
    });
    return method.call(sampled, function (_ref) {
      var p = _ref[0];
      var s = _ref[1];
      return p;
    }).map(function (_ref2) {
      var p = _ref2[0];
      var s = _ref2[1];
      return s;
    });
  } else {
    f = makeFunction(f, args);
    return method.call(obs, f);
  }
};

var toCombinator = function (f) {
  if (_.isFunction(f)) {
    return f;
  } else if (isFieldKey(f)) {
    var key = toFieldKey(f);
    return function (left, right) {
      return left[key](right);
    };
  } else {
    throw new Exception("not a function or a field key: " + f);
  }
};

var toFieldKey = function (f) {
  return f.slice(1);
};

function Some(value) {
  this.value = value;
}

extend(Some.prototype, {
  _isSome: true,
  getOrElse: function () {
    return this.value;
  },
  get: function () {
    return this.value;
  },
  filter: function (f) {
    if (f(this.value)) {
      return new Some(this.value);
    } else {
      return None;
    }
  },
  map: function (f) {
    return new Some(f(this.value));
  },
  forEach: function (f) {
    return f(this.value);
  },
  isDefined: true,
  toArray: function () {
    return [this.value];
  },
  inspect: function () {
    return "Some(" + this.value + ")";
  },
  toString: function () {
    return this.inspect();
  }
});

var None = {
  _isNone: true,
  getOrElse: function (value) {
    return value;
  },
  filter: function () {
    return None;
  },
  map: function () {
    return None;
  },
  forEach: function () {},
  isDefined: false,
  toArray: function () {
    return [];
  },
  inspect: function () {
    return "None";
  },
  toString: function () {
    return this.inspect();
  }
};

var toOption = function (v) {
  if ((typeof v !== "undefined" && v !== null ? v._isSome : undefined) || (typeof v !== "undefined" && v !== null ? v._isNone : undefined)) {
    return v;
  } else {
    return new Some(v);
  }
};

Bacon.noMore = "<no-more>";
Bacon.more = "<more>";

var eventIdCounter = 0;

function Event() {
  this.id = ++eventIdCounter;
}

Event.prototype._isEvent = true;
Event.prototype.isEvent = function () {
  return true;
};
Event.prototype.isEnd = function () {
  return false;
};
Event.prototype.isInitial = function () {
  return false;
};
Event.prototype.isNext = function () {
  return false;
};
Event.prototype.isError = function () {
  return false;
};
Event.prototype.hasValue = function () {
  return false;
};
Event.prototype.filter = function () {
  return true;
};
Event.prototype.inspect = function () {
  return this.toString();
};
Event.prototype.log = function () {
  return this.toString();
};

function Next(valueF, eager) {
  if (!(this instanceof Next)) {
    return new Next(valueF, eager);
  }

  Event.call(this);

  if (!eager && _.isFunction(valueF) || (valueF != null ? valueF._isNext : void 0)) {
    this.valueF = valueF;
    this.valueInternal = void 0;
  } else {
    this.valueF = void 0;
    this.valueInternal = valueF;
  }
}

inherit(Next, Event);

Next.prototype.isNext = function () {
  return true;
};
Next.prototype.hasValue = function () {
  return true;
};
Next.prototype.value = function () {
  var ref;
  if ((ref = this.valueF) != null ? ref._isNext : void 0) {
    this.valueInternal = this.valueF.value();
    this.valueF = void 0;
  } else if (this.valueF) {
    this.valueInternal = this.valueF();
    this.valueF = void 0;
  }
  return this.valueInternal;
};

Next.prototype.fmap = function (f) {
  var event, value;
  if (this.valueInternal) {
    value = this.valueInternal;
    return this.apply(function () {
      return f(value);
    });
  } else {
    event = this;
    return this.apply(function () {
      return f(event.value());
    });
  }
};

Next.prototype.apply = function (value) {
  return new Next(value);
};
Next.prototype.filter = function (f) {
  return f(this.value());
};
Next.prototype.toString = function () {
  return _.toString(this.value());
};
Next.prototype.log = function () {
  return this.value();
};
Next.prototype._isNext = true;

function Initial(valueF, eager) {
  if (!(this instanceof Initial)) {
    return new Initial(valueF, eager);
  }
  Next.call(this, valueF, eager);
}

inherit(Initial, Next);
Initial.prototype._isInitial = true;
Initial.prototype.isInitial = function () {
  return true;
};
Initial.prototype.isNext = function () {
  return false;
};
Initial.prototype.apply = function (value) {
  return new Initial(value);
};
Initial.prototype.toNext = function () {
  return new Next(this);
};

function End() {
  if (!(this instanceof End)) {
    return new End();
  }
  Event.call(this);
}

inherit(End, Event);
End.prototype.isEnd = function () {
  return true;
};
End.prototype.fmap = function () {
  return this;
};
End.prototype.apply = function () {
  return this;
};
End.prototype.toString = function () {
  return "<end>";
};

function Error(error) {
  if (!(this instanceof Error)) {
    return new Error(error);
  }
  this.error = error;
  Event.call(this);
}

inherit(Error, Event);
Error.prototype.isError = function () {
  return true;
};
Error.prototype.fmap = function () {
  return this;
};
Error.prototype.apply = function () {
  return this;
};
Error.prototype.toString = function () {
  return "<error> " + _.toString(this.error);
};

Bacon.Event = Event;
Bacon.Initial = Initial;
Bacon.Next = Next;
Bacon.End = End;
Bacon.Error = Error;

var initialEvent = function (value) {
  return new Initial(value, true);
};
var nextEvent = function (value) {
  return new Next(value, true);
};
var endEvent = function () {
  return new End();
};
var toEvent = function (x) {
  if (x && x._isEvent) {
    return x;
  } else {
    return nextEvent(x);
  }
};

var idCounter = 0;
var registerObs = function () {};

function Observable(desc) {
  this.desc = desc;
  this.id = ++idCounter;
  this.initialDesc = this.desc;
}

extend(Observable.prototype, {
  _isObservable: true,

  subscribe: function (sink) {
    return UpdateBarrier.wrappedSubscribe(this, sink);
  },

  subscribeInternal: function (sink) {
    return this.dispatcher.subscribe(sink);
  },

  onValue: function () {
    var f = makeFunctionArgs(arguments);
    return this.subscribe(function (event) {
      if (event.hasValue()) {
        return f(event.value());
      }
    });
  },

  onValues: function (f) {
    return this.onValue(function (args) {
      return f.apply(undefined, args);
    });
  },

  onError: function () {
    var f = makeFunctionArgs(arguments);
    return this.subscribe(function (event) {
      if (event.isError()) {
        return f(event.error);
      }
    });
  },

  onEnd: function () {
    var f = makeFunctionArgs(arguments);
    return this.subscribe(function (event) {
      if (event.isEnd()) {
        return f();
      }
    });
  },

  name: function (name) {
    this._name = name;
    return this;
  },

  withDescription: function () {
    this.desc = describe.apply(undefined, arguments);
    return this;
  },

  toString: function () {
    if (this._name) {
      return this._name;
    } else {
      return this.desc.toString();
    }
  },

  deps: function () {
    return this.desc.deps();
  },

  internalDeps: function () {
    return this.initialDesc.deps();
  }
});

Observable.prototype.assign = Observable.prototype.onValue;
Observable.prototype.forEach = Observable.prototype.onValue;
Observable.prototype.inspect = Observable.prototype.toString;

Bacon.Observable = Observable;

function CompositeUnsubscribe() {
  var ss = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  this.unsubscribe = _.bind(this.unsubscribe, this);
  this.unsubscribed = false;
  this.subscriptions = [];
  this.starting = [];
  for (var i = 0, s; i < ss.length; i++) {
    s = ss[i];
    this.add(s);
  }
}

extend(CompositeUnsubscribe.prototype, {
  add: function (subscription) {
    var _this2 = this;

    if (this.unsubscribed) {
      return;
    }
    var ended = false;
    var unsub = nop;
    this.starting.push(subscription);
    var unsubMe = function () {
      if (_this2.unsubscribed) {
        return;
      }
      ended = true;
      _this2.remove(unsub);
      return _.remove(subscription, _this2.starting);
    };
    unsub = subscription(this.unsubscribe, unsubMe);
    if (!(this.unsubscribed || ended)) {
      this.subscriptions.push(unsub);
    } else {
      unsub();
    }
    _.remove(subscription, this.starting);
    return unsub;
  },

  remove: function (unsub) {
    if (this.unsubscribed) {
      return;
    }
    if (_.remove(unsub, this.subscriptions) !== undefined) {
      return unsub();
    }
  },

  unsubscribe: function () {
    if (this.unsubscribed) {
      return;
    }
    this.unsubscribed = true;
    var iterable = this.subscriptions;
    for (var i = 0; i < iterable.length; i++) {
      iterable[i]();
    }
    this.subscriptions = [];
    this.starting = [];
    return [];
  },

  count: function () {
    if (this.unsubscribed) {
      return 0;
    }
    return this.subscriptions.length + this.starting.length;
  },

  empty: function () {
    return this.count() === 0;
  }
});

Bacon.CompositeUnsubscribe = CompositeUnsubscribe;

function Dispatcher(_subscribe, _handleEvent) {
  this._subscribe = _subscribe;
  this._handleEvent = _handleEvent;
  this.subscribe = _.bind(this.subscribe, this);
  this.handleEvent = _.bind(this.handleEvent, this);
  this.pushing = false;
  this.ended = false;
  this.prevError = undefined;
  this.unsubSrc = undefined;
  this.subscriptions = [];
  this.queue = [];
}

Dispatcher.prototype.hasSubscribers = function () {
  return this.subscriptions.length > 0;
};

Dispatcher.prototype.removeSub = function (subscription) {
  this.subscriptions = _.without(subscription, this.subscriptions);
  return this.subscriptions;
};

Dispatcher.prototype.push = function (event) {
  if (event.isEnd()) {
    this.ended = true;
  }
  return UpdateBarrier.inTransaction(event, this, this.pushIt, [event]);
};

Dispatcher.prototype.pushToSubscriptions = function (event) {
  try {
    var tmp = this.subscriptions;
    var len = tmp.length;
    for (var i = 0; i < len; i++) {
      var sub = tmp[i];
      var reply = sub.sink(event);
      if (reply === Bacon.noMore || event.isEnd()) {
        this.removeSub(sub);
      }
    }
    return true;
  } catch (error) {
    this.pushing = false;
    this.queue = [];
    throw error;
  }
};

Dispatcher.prototype.pushIt = function (event) {
  if (!this.pushing) {
    if (event === this.prevError) {
      return;
    }
    if (event.isError()) {
      this.prevError = event;
    }
    this.pushing = true;
    this.pushToSubscriptions(event);
    this.pushing = false;
    while (this.queue.length) {
      event = this.queue.shift();
      this.push(event);
    }
    if (this.hasSubscribers()) {
      return Bacon.more;
    } else {
      this.unsubscribeFromSource();
      return Bacon.noMore;
    }
  } else {
    this.queue.push(event);
    return Bacon.more;
  }
};

Dispatcher.prototype.handleEvent = function (event) {
  if (this._handleEvent) {
    return this._handleEvent(event);
  } else {
    return this.push(event);
  }
};

Dispatcher.prototype.unsubscribeFromSource = function () {
  if (this.unsubSrc) {
    this.unsubSrc();
  }
  this.unsubSrc = undefined;
};

Dispatcher.prototype.subscribe = function (sink) {
  var subscription;
  if (this.ended) {
    sink(endEvent());
    return nop;
  } else {
    assertFunction(sink);
    subscription = {
      sink: sink
    };
    this.subscriptions.push(subscription);
    if (this.subscriptions.length === 1) {
      this.unsubSrc = this._subscribe(this.handleEvent);
      assertFunction(this.unsubSrc);
    }
    return (function (_this) {
      return function () {
        _this.removeSub(subscription);
        if (!_this.hasSubscribers()) {
          return _this.unsubscribeFromSource();
        }
      };
    })(this);
  }
};

Bacon.Dispatcher = Dispatcher;

function EventStream(desc, subscribe, handler) {
  if (!(this instanceof EventStream)) {
    return new EventStream(desc, subscribe, handler);
  }
  if (_.isFunction(desc)) {
    handler = subscribe;
    subscribe = desc;
    desc = Desc.empty;
  }
  Observable.call(this, desc);
  assertFunction(subscribe);
  this.dispatcher = new Dispatcher(subscribe, handler);
  registerObs(this);
}

inherit(EventStream, Observable);
extend(EventStream.prototype, {
  _isEventStream: true,

  toProperty: function (initValue_) {
    var initValue = arguments.length === 0 ? None : toOption(function () {
      return initValue_;
    });
    var disp = this.dispatcher;
    var desc = new Bacon.Desc(this, "toProperty", [initValue_]);
    return new Property(desc, function (sink) {
      var initSent = false;
      var subbed = false;
      var unsub = nop;
      var reply = Bacon.more;
      var sendInit = function () {
        if (!initSent) {
          return initValue.forEach(function (value) {
            initSent = true;
            reply = sink(new Initial(value));
            if (reply === Bacon.noMore) {
              unsub();
              unsub = nop;
              return nop;
            }
          });
        }
      };

      unsub = disp.subscribe(function (event) {
        if (event.hasValue()) {
          if (event.isInitial() && !subbed) {
            initValue = new Some(function () {
              return event.value();
            });
            return Bacon.more;
          } else {
            if (!event.isInitial()) {
              sendInit();
            }
            initSent = true;
            initValue = new Some(event);
            return sink(event);
          }
        } else {
          if (event.isEnd()) {
            reply = sendInit();
          }
          if (reply !== Bacon.noMore) {
            return sink(event);
          }
        }
      });
      subbed = true;
      sendInit();
      return unsub;
    });
  },

  toEventStream: function () {
    return this;
  },

  withHandler: function (handler) {
    return new EventStream(new Bacon.Desc(this, "withHandler", [handler]), this.dispatcher.subscribe, handler);
  }
});

Bacon.EventStream = EventStream;

Bacon.never = function () {
  return new EventStream(describe(Bacon, "never"), function (sink) {
    sink(endEvent());
    return nop;
  });
};

Bacon.when = function () {
  if (arguments.length === 0) {
    return Bacon.never();
  }
  var len = arguments.length;
  var usage = "when: expecting arguments in the form (Observable+,function)+";

  assert(usage, len % 2 === 0);
  var sources = [];
  var pats = [];
  var i = 0;
  var patterns = [];
  while (i < len) {
    patterns[i] = arguments[i];
    patterns[i + 1] = arguments[i + 1];
    var patSources = _.toArray(arguments[i]);
    var f = constantToFunction(arguments[i + 1]);
    var pat = { f: f, ixs: [] };
    var triggerFound = false;
    for (var j = 0, s; j < patSources.length; j++) {
      s = patSources[j];
      var index = _.indexOf(sources, s);
      if (!triggerFound) {
        triggerFound = Source.isTrigger(s);
      }
      if (index < 0) {
        sources.push(s);
        index = sources.length - 1;
      }
      for (var k = 0, ix; k < pat.ixs.length; k++) {
        ix = pat.ixs[k];
        if (ix.index === index) {
          ix.count++;
        }
      }
      pat.ixs.push({ index: index, count: 1 });
    }

    assert("At least one EventStream required", triggerFound || !patSources.length);

    if (patSources.length > 0) {
      pats.push(pat);
    }
    i = i + 2;
  }

  if (!sources.length) {
    return Bacon.never();
  }

  sources = _.map(Source.fromObservable, sources);
  var needsBarrier = _.any(sources, function (s) {
    return s.flatten;
  }) && containsDuplicateDeps(_.map(function (s) {
    return s.obs;
  }, sources));

  var desc = new Bacon.Desc(Bacon, "when", patterns);
  var resultStream = new EventStream(desc, function (sink) {
    var triggers = [];
    var ends = false;
    var match = function (p) {
      for (var i1 = 0, i; i1 < p.ixs.length; i1++) {
        i = p.ixs[i1];
        if (!sources[i.index].hasAtLeast(i.count)) {
          return false;
        }
      }
      return true;
    };
    var cannotSync = function (source) {
      return !source.sync || source.ended;
    };
    var cannotMatch = function (p) {
      for (var i1 = 0, i; i1 < p.ixs.length; i1++) {
        i = p.ixs[i1];
        if (!sources[i.index].mayHave(i.count)) {
          return true;
        }
      }
    };
    var nonFlattened = function (trigger) {
      return !trigger.source.flatten;
    };
    var part = function (source) {
      return function (unsubAll) {
        var flushLater = function () {
          return UpdateBarrier.whenDoneWith(resultStream, flush);
        };
        var flushWhileTriggers = function () {
          if (triggers.length > 0) {
            var reply = Bacon.more;
            var trigger = triggers.pop();
            for (var i1 = 0, p; i1 < pats.length; i1++) {
              p = pats[i1];
              if (match(p)) {
                var events = (function () {
                  var result = [];
                  for (var i2 = 0, i; i2 < p.ixs.length; i2++) {
                    i = p.ixs[i2];
                    result.push(sources[i.index].consume());
                  }
                  return result;
                })();
                reply = sink(trigger.e.apply(function () {
                  var _p;

                  var values = (function () {
                    var result = [];
                    for (var i2 = 0, event; i2 < events.length; i2++) {
                      event = events[i2];
                      result.push(event.value());
                    }
                    return result;
                  })();

                  return (_p = p).f.apply(_p, values);
                }));
                if (triggers.length) {
                  triggers = _.filter(nonFlattened, triggers);
                }
                if (reply === Bacon.noMore) {
                  return reply;
                } else {
                  return flushWhileTriggers();
                }
              }
            }
          } else {
            return Bacon.more;
          }
        };
        var flush = function () {
          var reply = flushWhileTriggers();
          if (ends) {
            if (_.all(sources, cannotSync) || _.all(pats, cannotMatch)) {
              reply = Bacon.noMore;
              sink(endEvent());
            }
          }
          if (reply === Bacon.noMore) {
            unsubAll();
          }

          return reply;
        };
        return source.subscribe(function (e) {
          if (e.isEnd()) {
            ends = true;
            source.markEnded();
            flushLater();
          } else if (e.isError()) {
            var reply = sink(e);
          } else {
            source.push(e);
            if (source.sync) {
              triggers.push({ source: source, e: e });
              if (needsBarrier || UpdateBarrier.hasWaiters()) {
                flushLater();
              } else {
                flush();
              }
            }
          }
          if (reply === Bacon.noMore) {
            unsubAll();
          }
          return reply || Bacon.more;
        });
      };
    };

    return new Bacon.CompositeUnsubscribe((function () {
      var result = [];
      for (var i1 = 0, s; i1 < sources.length; i1++) {
        s = sources[i1];
        result.push(part(s));
      }
      return result;
    })()).unsubscribe;
  });
  return resultStream;
};

var containsDuplicateDeps = function (observables) {
  var state = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var checkObservable = function (obs) {
    if (_.contains(state, obs)) {
      return true;
    } else {
      var deps = obs.internalDeps();
      if (deps.length) {
        state.push(obs);
        return _.any(deps, checkObservable);
      } else {
        state.push(obs);
        return false;
      }
    }
  };

  return _.any(observables, checkObservable);
};

var constantToFunction = function (f) {
  if (_.isFunction(f)) {
    return f;
  } else {
    return _.always(f);
  }
};

Bacon.groupSimultaneous = function () {
  for (var _len5 = arguments.length, streams = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    streams[_key5] = arguments[_key5];
  }

  if (streams.length === 1 && isArray(streams[0])) {
    streams = streams[0];
  }
  var sources = (function () {
    var result = [];
    for (var i = 0, s; i < streams.length; i++) {
      s = streams[i];
      result.push(new BufferingSource(s));
    }
    return result;
  })();
  return withDesc(new Bacon.Desc(Bacon, "groupSimultaneous", streams), Bacon.when(sources, function () {
    for (var _len6 = arguments.length, xs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      xs[_key6] = arguments[_key6];
    }

    return xs;
  }));
};

function PropertyDispatcher(property, subscribe, handleEvent) {
  Dispatcher.call(this, subscribe, handleEvent);
  this.property = property;
  this.subscribe = _.bind(this.subscribe, this);
  this.current = None;
  this.currentValueRootId = undefined;
  this.propertyEnded = false;
}

inherit(PropertyDispatcher, Dispatcher);
extend(PropertyDispatcher.prototype, {
  push: function (event) {
    if (event.isEnd()) {
      this.propertyEnded = true;
    }
    if (event.hasValue()) {
      this.current = new Some(event);
      this.currentValueRootId = UpdateBarrier.currentEventId();
    }
    return Dispatcher.prototype.push.call(this, event);
  },

  maybeSubSource: function (sink, reply) {
    if (reply === Bacon.noMore) {
      return nop;
    } else if (this.propertyEnded) {
      sink(endEvent());
      return nop;
    } else {
      return Dispatcher.prototype.subscribe.call(this, sink);
    }
  },

  subscribe: function (sink) {
    var _this3 = this;

    var initSent = false;

    var reply = Bacon.more;

    if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
      var dispatchingId = UpdateBarrier.currentEventId();
      var valId = this.currentValueRootId;
      if (!this.propertyEnded && valId && dispatchingId && dispatchingId !== valId) {
        UpdateBarrier.whenDoneWith(this.property, function () {
          if (_this3.currentValueRootId === valId) {
            return sink(initialEvent(_this3.current.get().value()));
          }
        });

        return this.maybeSubSource(sink, reply);
      } else {
        UpdateBarrier.inTransaction(undefined, this, function () {
          reply = sink(initialEvent(this.current.get().value()));
          return reply;
        }, []);
        return this.maybeSubSource(sink, reply);
      }
    } else {
      return this.maybeSubSource(sink, reply);
    }
  }
});

function Property(desc, subscribe, handler) {
  Observable.call(this, desc);
  assertFunction(subscribe);
  this.dispatcher = new PropertyDispatcher(this, subscribe, handler);
  registerObs(this);
}

inherit(Property, Observable);
extend(Property.prototype, {
  _isProperty: true,

  changes: function () {
    var _this4 = this;

    return new EventStream(new Bacon.Desc(this, "changes", []), function (sink) {
      return _this4.dispatcher.subscribe(function (event) {
        if (!event.isInitial()) {
          return sink(event);
        }
      });
    });
  },

  withHandler: function (handler) {
    return new Property(new Bacon.Desc(this, "withHandler", [handler]), this.dispatcher.subscribe, handler);
  },

  toProperty: function () {
    assertNoArguments(arguments);
    return this;
  },

  toEventStream: function () {
    var _this5 = this;

    return new EventStream(new Bacon.Desc(this, "toEventStream", []), function (sink) {
      return _this5.dispatcher.subscribe(function (event) {
        if (event.isInitial()) {
          event = event.toNext();
        }
        return sink(event);
      });
    });
  }
});

Bacon.Property = Property;

Bacon.constant = function (value) {
  return new Property(new Bacon.Desc(Bacon, "constant", [value]), function (sink) {
    sink(initialEvent(value));
    sink(endEvent());
    return nop;
  });
};

Bacon.fromBinder = function (binder) {
  var eventTransformer = arguments.length <= 1 || arguments[1] === undefined ? _.id : arguments[1];

  var desc = new Bacon.Desc(Bacon, "fromBinder", [binder, eventTransformer]);
  return new EventStream(desc, function (sink) {
    var unbound = false;
    var shouldUnbind = false;
    var unbind = function () {
      if (!unbound) {
        if (typeof unbinder !== "undefined" && unbinder !== null) {
          unbinder();
          return unbound = true;
        } else {
          return shouldUnbind = true;
        }
      }
    };
    var unbinder = binder(function () {
      var ref;

      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      var value = eventTransformer.apply(this, args);
      if (!(isArray(value) && ((ref = _.last(value)) != null ? ref._isEvent : undefined))) {
        value = [value];
      }
      var reply = Bacon.more;
      for (var i = 0, event; i < value.length; i++) {
        event = value[i];
        reply = sink(event = toEvent(event));
        if (reply === Bacon.noMore || event.isEnd()) {
          unbind();
          return reply;
        }
      }
      return reply;
    });
    if (shouldUnbind) {
      unbind();
    }
    return unbind;
  });
};

Bacon.Observable.prototype.map = function (p) {
  for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
    args[_key8 - 1] = arguments[_key8];
  }

  return convertArgsToFunction(this, p, args, function (f) {
    return withDesc(new Bacon.Desc(this, "map", [f]), this.withHandler(function (event) {
      return this.push(event.fmap(f));
    }));
  });
};

var argumentsToObservables = function (args) {
  if (isArray(args[0])) {
    return args[0];
  } else {
    return Array.prototype.slice.call(args);
  }
};

var argumentsToObservablesAndFunction = function (args) {
  if (_.isFunction(args[0])) {
    return [argumentsToObservables(Array.prototype.slice.call(args, 1)), args[0]];
  } else {
    return [argumentsToObservables(Array.prototype.slice.call(args, 0, args.length - 1)), _.last(args)];
  }
};

Bacon.combineAsArray = function () {
  var streams = argumentsToObservables(arguments);
  if (streams.length) {
    var sources = [];
    for (var i = 0; i < streams.length; i++) {
      var stream = isObservable(streams[i]) ? streams[i] : Bacon.constant(streams[i]);
      sources.push(new Source(stream, true));
    }
    return withDesc(new Bacon.Desc(Bacon, "combineAsArray", streams), Bacon.when(sources, function () {
      for (var _len9 = arguments.length, xs = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        xs[_key9] = arguments[_key9];
      }

      return xs;
    }).toProperty());
  } else {
    return Bacon.constant([]);
  }
};

Bacon.onValues = function () {
  return Bacon.combineAsArray(Array.prototype.slice.call(arguments, 0, arguments.length - 1)).onValues(arguments[arguments.length - 1]);
};

Bacon.combineWith = function () {
  var _argumentsToObservablesAndFunction = argumentsToObservablesAndFunction(arguments);

  var streams = _argumentsToObservablesAndFunction[0];
  var f = _argumentsToObservablesAndFunction[1];

  var desc = new Bacon.Desc(Bacon, "combineWith", [f].concat(streams));
  return withDesc(desc, Bacon.combineAsArray(streams).map(function (values) {
    return f.apply(undefined, values);
  }));
};

Bacon.Observable.prototype.combine = function (other, f) {
  var combinator = toCombinator(f);
  var desc = new Bacon.Desc(this, "combine", [other, f]);
  return withDesc(desc, Bacon.combineAsArray(this, other).map(function (values) {
    return combinator(values[0], values[1]);
  }));
};

Bacon.Observable.prototype.withStateMachine = function (initState, f) {
  var state = initState;
  var desc = new Bacon.Desc(this, "withStateMachine", [initState, f]);
  return withDesc(desc, this.withHandler(function (event) {
    var fromF = f(state, event);
    var newState = fromF[0];
    var outputs = fromF[1];

    state = newState;
    var reply = Bacon.more;
    for (var i = 0, output; i < outputs.length; i++) {
      output = outputs[i];
      reply = this.push(output);
      if (reply === Bacon.noMore) {
        return reply;
      }
    }
    return reply;
  }));
};

var equals = function (a, b) {
  return a === b;
};

var isNone = function (object) {
  return typeof object !== "undefined" && object !== null ? object._isNone : false;
};

Bacon.Observable.prototype.skipDuplicates = function () {
  var isEqual = arguments.length <= 0 || arguments[0] === undefined ? equals : arguments[0];

  var desc = new Bacon.Desc(this, "skipDuplicates", []);
  return withDesc(desc, this.withStateMachine(None, function (prev, event) {
    if (!event.hasValue()) {
      return [prev, [event]];
    } else if (event.isInitial() || isNone(prev) || !isEqual(prev.get(), event.value())) {
      return [new Some(event.value()), [event]];
    } else {
      return [prev, []];
    }
  }));
};

Bacon.Observable.prototype.awaiting = function (other) {
  var desc = new Bacon.Desc(this, "awaiting", [other]);
  return withDesc(desc, Bacon.groupSimultaneous(this, other).map(function (values) {
    return values[1].length === 0;
  }).toProperty(false).skipDuplicates());
};

Bacon.Observable.prototype.not = function () {
  return withDesc(new Bacon.Desc(this, "not", []), this.map(function (x) {
    return !x;
  }));
};

Bacon.Property.prototype.and = function (other) {
  return withDesc(new Bacon.Desc(this, "and", [other]), this.combine(other, function (x, y) {
    return x && y;
  }));
};

Bacon.Property.prototype.or = function (other) {
  return withDesc(new Bacon.Desc(this, "or", [other]), this.combine(other, function (x, y) {
    return x || y;
  }));
};

Bacon.scheduler = {
  setTimeout: function (f, d) {
    return setTimeout(f, d);
  },
  setInterval: function (f, i) {
    return setInterval(f, i);
  },
  clearInterval: function (id) {
    return clearInterval(id);
  },
  clearTimeout: function (id) {
    return clearTimeout(id);
  },
  now: function () {
    return new Date().getTime();
  }
};

Bacon.EventStream.prototype.bufferWithTime = function (delay) {
  return withDesc(new Bacon.Desc(this, "bufferWithTime", [delay]), this.bufferWithTimeOrCount(delay, Number.MAX_VALUE));
};

Bacon.EventStream.prototype.bufferWithCount = function (count) {
  return withDesc(new Bacon.Desc(this, "bufferWithCount", [count]), this.bufferWithTimeOrCount(undefined, count));
};

Bacon.EventStream.prototype.bufferWithTimeOrCount = function (delay, count) {
  var flushOrSchedule = function (buffer) {
    if (buffer.values.length === count) {
      return buffer.flush();
    } else if (delay !== undefined) {
      return buffer.schedule();
    }
  };
  var desc = new Bacon.Desc(this, "bufferWithTimeOrCount", [delay, count]);
  return withDesc(desc, this.buffer(delay, flushOrSchedule, flushOrSchedule));
};

Bacon.EventStream.prototype.buffer = function (delay) {
  var onInput = arguments.length <= 1 || arguments[1] === undefined ? nop : arguments[1];
  var onFlush = arguments.length <= 2 || arguments[2] === undefined ? nop : arguments[2];

  var buffer = {
    scheduled: null,
    end: undefined,
    values: [],
    flush: function () {
      if (this.scheduled) {
        Bacon.scheduler.clearTimeout(this.scheduled);
        this.scheduled = null;
      }
      if (this.values.length > 0) {
        var valuesToPush = this.values;
        this.values = [];
        var reply = this.push(nextEvent(valuesToPush));
        if (this.end != null) {
          return this.push(this.end);
        } else if (reply !== Bacon.noMore) {
          return onFlush(this);
        }
      } else {
        if (this.end != null) {
          return this.push(this.end);
        }
      }
    },
    schedule: function () {
      var _this6 = this;

      if (!this.scheduled) {
        return this.scheduled = delay(function () {
          return _this6.flush();
        });
      }
    }
  };
  var reply = Bacon.more;
  if (!_.isFunction(delay)) {
    var delayMs = delay;
    delay = function (f) {
      return Bacon.scheduler.setTimeout(f, delayMs);
    };
  }
  return withDesc(new Bacon.Desc(this, "buffer", []), this.withHandler(function (event) {
    var _this7 = this;

    buffer.push = function (event) {
      return _this7.push(event);
    };
    if (event.isError()) {
      reply = this.push(event);
    } else if (event.isEnd()) {
      buffer.end = event;
      if (!buffer.scheduled) {
        buffer.flush();
      }
    } else {
      buffer.values.push(event.value());

      onInput(buffer);
    }
    return reply;
  }));
};

Bacon.Observable.prototype.filter = function (f) {
  assertObservableIsProperty(f);

  for (var _len10 = arguments.length, args = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
    args[_key10 - 1] = arguments[_key10];
  }

  return convertArgsToFunction(this, f, args, function (f) {
    return withDesc(new Bacon.Desc(this, "filter", [f]), this.withHandler(function (event) {
      if (event.filter(f)) {
        return this.push(event);
      } else {
        return Bacon.more;
      }
    }));
  });
};

Bacon.once = function (value) {
  return new EventStream(new Desc(Bacon, "once", [value]), function (sink) {
    sink(toEvent(value));
    sink(endEvent());
    return nop;
  });
};

Bacon.EventStream.prototype.concat = function (right) {
  var left = this;
  return new EventStream(new Bacon.Desc(left, "concat", [right]), function (sink) {
    var unsubRight = nop;
    var unsubLeft = left.dispatcher.subscribe(function (e) {
      if (e.isEnd()) {
        unsubRight = right.dispatcher.subscribe(sink);
        return unsubRight;
      } else {
        return sink(e);
      }
    });
    return function () {
      return unsubLeft(), unsubRight();
    };
  });
};

Bacon.Observable.prototype.flatMap = function () {
  return flatMap_(this, makeSpawner(arguments));
};

Bacon.Observable.prototype.flatMapFirst = function () {
  return flatMap_(this, makeSpawner(arguments), true);
};

var makeSpawner = function (args) {
  if (args.length === 1 && isObservable(args[0])) {
    return _.always(args[0]);
  } else {
    return makeFunctionArgs(args);
  }
};

var makeObservable = function (x) {
  if (isObservable(x)) {
    return x;
  } else {
    return Bacon.once(x);
  }
};

var flatMap_ = function (root, f, firstOnly, limit) {
  var rootDep = [root];
  var childDeps = [];
  var desc = new Bacon.Desc(root, "flatMap" + (firstOnly ? "First" : ""), [f]);
  var result = new EventStream(desc, function (sink) {
    var composite = new CompositeUnsubscribe();
    var queue = [];
    var spawn = function (event) {
      var child = makeObservable(f(event.value()));
      childDeps.push(child);
      return composite.add(function (unsubAll, unsubMe) {
        return child.dispatcher.subscribe(function (event) {
          if (event.isEnd()) {
            _.remove(child, childDeps);
            checkQueue();
            checkEnd(unsubMe);
            return Bacon.noMore;
          } else {
            if (typeof event !== "undefined" && event !== null ? event._isInitial : undefined) {
              event = event.toNext();
            }
            var reply = sink(event);
            if (reply === Bacon.noMore) {
              unsubAll();
            }
            return reply;
          }
        });
      });
    };
    var checkQueue = function () {
      var event = queue.shift();
      if (event) {
        return spawn(event);
      }
    };
    var checkEnd = function (unsub) {
      unsub();
      if (composite.empty()) {
        return sink(endEvent());
      }
    };
    composite.add(function (__, unsubRoot) {
      return root.dispatcher.subscribe(function (event) {
        if (event.isEnd()) {
          return checkEnd(unsubRoot);
        } else if (event.isError()) {
          return sink(event);
        } else if (firstOnly && composite.count() > 1) {
          return Bacon.more;
        } else {
          if (composite.unsubscribed) {
            return Bacon.noMore;
          }
          if (limit && composite.count() > limit) {
            return queue.push(event);
          } else {
            return spawn(event);
          }
        }
      });
    });
    return composite.unsubscribe;
  });
  result.internalDeps = function () {
    if (childDeps.length) {
      return rootDep.concat(childDeps);
    } else {
      return rootDep;
    }
  };
  return result;
};

Bacon.Observable.prototype.flatMapWithConcurrencyLimit = function (limit) {
  for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
    args[_key11 - 1] = arguments[_key11];
  }

  var desc = new Bacon.Desc(this, "flatMapWithConcurrencyLimit", [limit].concat(args));
  return withDesc(desc, flatMap_(this, makeSpawner(args), false, limit));
};

Bacon.Observable.prototype.flatMapConcat = function () {
  var desc = new Bacon.Desc(this, "flatMapConcat", Array.prototype.slice.call(arguments, 0));
  return withDesc(desc, this.flatMapWithConcurrencyLimit.apply(this, [1].concat(_slice.call(arguments))));
};

Bacon.later = function (delay, value) {
  return withDesc(new Bacon.Desc(Bacon, "later", [delay, value]), Bacon.fromBinder(function (sink) {
    var sender = function () {
      return sink([value, endEvent()]);
    };
    var id = Bacon.scheduler.setTimeout(sender, delay);
    return function () {
      return Bacon.scheduler.clearTimeout(id);
    };
  }));
};

Bacon.Observable.prototype.bufferingThrottle = function (minimumInterval) {
  var desc = new Bacon.Desc(this, "bufferingThrottle", [minimumInterval]);
  return withDesc(desc, this.flatMapConcat(function (x) {
    return Bacon.once(x).concat(Bacon.later(minimumInterval).filter(false));
  }));
};

Bacon.Property.prototype.bufferingThrottle = function () {
  return Bacon.Observable.prototype.bufferingThrottle.apply(this, arguments).toProperty();
};

function Bus() {
  if (!(this instanceof Bus)) {
    return new Bus();
  }

  this.unsubAll = _.bind(this.unsubAll, this);
  this.subscribeAll = _.bind(this.subscribeAll, this);
  this.guardedSink = _.bind(this.guardedSink, this);

  this.sink = undefined;
  this.subscriptions = [];
  this.ended = false;
  EventStream.call(this, new Bacon.Desc(Bacon, "Bus", []), this.subscribeAll);
}

inherit(Bus, EventStream);
extend(Bus.prototype, {
  unsubAll: function () {
    var iterable = this.subscriptions;
    for (var i = 0, sub; i < iterable.length; i++) {
      sub = iterable[i];
      if (typeof sub.unsub === "function") {
        sub.unsub();
      }
    }
  },

  subscribeAll: function (newSink) {
    if (this.ended) {
      newSink(endEvent());
    } else {
      this.sink = newSink;
      var iterable = cloneArray(this.subscriptions);
      for (var i = 0, subscription; i < iterable.length; i++) {
        subscription = iterable[i];
        this.subscribeInput(subscription);
      }
    }
    return this.unsubAll;
  },

  guardedSink: function (input) {
    var _this8 = this;

    return function (event) {
      if (event.isEnd()) {
        _this8.unsubscribeInput(input);
        return Bacon.noMore;
      } else {
        return _this8.sink(event);
      }
    };
  },

  subscribeInput: function (subscription) {
    subscription.unsub = subscription.input.dispatcher.subscribe(this.guardedSink(subscription.input));
    return subscription.unsub;
  },

  unsubscribeInput: function (input) {
    var iterable = this.subscriptions;
    for (var i = 0, sub; i < iterable.length; i++) {
      sub = iterable[i];
      if (sub.input === input) {
        if (typeof sub.unsub === "function") {
          sub.unsub();
        }
        this.subscriptions.splice(i, 1);
        return;
      }
    }
  },

  plug: function (input) {
    var _this9 = this;

    assertObservable(input);
    if (this.ended) {
      return;
    }
    var sub = { input: input };
    this.subscriptions.push(sub);
    if (typeof this.sink !== "undefined") {
      this.subscribeInput(sub);
    }
    return function () {
      return _this9.unsubscribeInput(input);
    };
  },

  end: function () {
    this.ended = true;
    this.unsubAll();
    if (typeof this.sink === "function") {
      return this.sink(endEvent());
    }
  },

  push: function (value) {
    if (!this.ended && typeof this.sink === "function") {
      var rootPush = !this.pushing;
      if (!rootPush) {
        if (!this.pushQueue) this.pushQueue = [];
        this.pushQueue.push(value);

        return;
      }
      this.pushing = true;
      try {
        return this.sink(nextEvent(value));
      } finally {
        if (rootPush && this.pushQueue) {
          var i = 0;
          while (i < this.pushQueue.length) {
            var value = this.pushQueue[i];
            this.sink(nextEvent(value));
            i++;
          }
          this.pushQueue = null;
        }
        this.pushing = false;
      }
    }
  },

  error: function (error) {
    if (typeof this.sink === "function") {
      return this.sink(new Error(error));
    }
  }
});

Bacon.Bus = Bus;

var liftCallback = function (desc, wrapped) {
  return withMethodCallSupport(function (f) {
    var stream = partiallyApplied(wrapped, [function (values, callback) {
      return f.apply(undefined, values.concat([callback]));
    }]);

    for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
      args[_key12 - 1] = arguments[_key12];
    }

    return withDesc(new Bacon.Desc(Bacon, desc, [f].concat(args)), Bacon.combineAsArray(args).flatMap(stream));
  });
};

Bacon.fromCallback = liftCallback("fromCallback", function (f) {
  for (var _len13 = arguments.length, args = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
    args[_key13 - 1] = arguments[_key13];
  }

  return Bacon.fromBinder(function (handler) {
    makeFunction(f, args)(handler);
    return nop;
  }, function (value) {
    return [value, endEvent()];
  });
});

Bacon.fromNodeCallback = liftCallback("fromNodeCallback", function (f) {
  for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
    args[_key14 - 1] = arguments[_key14];
  }

  return Bacon.fromBinder(function (handler) {
    makeFunction(f, args)(handler);
    return nop;
  }, function (error, value) {
    if (error) {
      return [new Error(error), endEvent()];
    }
    return [value, endEvent()];
  });
});

Bacon.combineTemplate = function (template) {
  function current(ctxStack) {
    return ctxStack[ctxStack.length - 1];
  }
  function setValue(ctxStack, key, value) {
    current(ctxStack)[key] = value;
    return value;
  }
  function applyStreamValue(key, index) {
    return function (ctxStack, values) {
      return setValue(ctxStack, key, values[index]);
    };
  }
  function constantValue(key, value) {
    return function (ctxStack) {
      return setValue(ctxStack, key, value);
    };
  }

  function mkContext(template) {
    return isArray(template) ? [] : {};
  }

  function pushContext(key, value) {
    return function (ctxStack) {
      var newContext = mkContext(value);
      setValue(ctxStack, key, newContext);
      return ctxStack.push(newContext);
    };
  }

  function compile(key, value) {
    if (isObservable(value)) {
      streams.push(value);
      return funcs.push(applyStreamValue(key, streams.length - 1));
    } else if (value && (value.constructor == Object || value.constructor == Array)) {
      var popContext = function (ctxStack) {
        return ctxStack.pop();
      };
      funcs.push(pushContext(key, value));
      compileTemplate(value);
      return funcs.push(popContext);
    } else {
      return funcs.push(constantValue(key, value));
    }
  }

  function combinator(values) {
    var rootContext = mkContext(template);
    var ctxStack = [rootContext];
    for (var i = 0, f; i < funcs.length; i++) {
      f = funcs[i];
      f(ctxStack, values);
    }
    return rootContext;
  }

  function compileTemplate(template) {
    return _.each(template, compile);
  }

  var funcs = [];
  var streams = [];

  compileTemplate(template);

  return withDesc(new Bacon.Desc(Bacon, "combineTemplate", [template]), Bacon.combineAsArray(streams).map(combinator));
};

var addPropertyInitValueToStream = function (property, stream) {
  var justInitValue = new EventStream(describe(property, "justInitValue"), function (sink) {
    var value = undefined;
    var unsub = property.dispatcher.subscribe(function (event) {
      if (!event.isEnd()) {
        value = event;
      }
      return Bacon.noMore;
    });
    UpdateBarrier.whenDoneWith(justInitValue, function () {
      if (typeof value !== "undefined" && value !== null) {
        sink(value);
      }
      return sink(endEvent());
    });
    return unsub;
  });
  return justInitValue.concat(stream).toProperty();
};

Bacon.Observable.prototype.mapEnd = function () {
  var f = makeFunctionArgs(arguments);
  return withDesc(new Bacon.Desc(this, "mapEnd", [f]), this.withHandler(function (event) {
    if (event.isEnd()) {
      this.push(nextEvent(f(event)));
      this.push(endEvent());
      return Bacon.noMore;
    } else {
      return this.push(event);
    }
  }));
};

Bacon.Observable.prototype.skipErrors = function () {
  return withDesc(new Bacon.Desc(this, "skipErrors", []), this.withHandler(function (event) {
    if (event.isError()) {
      return Bacon.more;
    } else {
      return this.push(event);
    }
  }));
};

Bacon.EventStream.prototype.takeUntil = function (stopper) {
  var endMarker = {};
  return withDesc(new Bacon.Desc(this, "takeUntil", [stopper]), Bacon.groupSimultaneous(this.mapEnd(endMarker), stopper.skipErrors()).withHandler(function (event) {
    if (!event.hasValue()) {
      return this.push(event);
    } else {
      var _event$value = event.value();

      var data = _event$value[0];
      var stopper = _event$value[1];

      if (stopper.length) {
        return this.push(endEvent());
      } else {
        var reply = Bacon.more;
        for (var i = 0, value; i < data.length; i++) {
          value = data[i];
          if (value === endMarker) {
            reply = this.push(endEvent());
          } else {
            reply = this.push(nextEvent(value));
          }
        }
        return reply;
      }
    }
  }));
};

Bacon.Property.prototype.takeUntil = function (stopper) {
  var changes = this.changes().takeUntil(stopper);
  return withDesc(new Bacon.Desc(this, "takeUntil", [stopper]), addPropertyInitValueToStream(this, changes));
};

Bacon.Observable.prototype.flatMapLatest = function () {
  var f = makeSpawner(arguments);
  var stream = this.toEventStream();
  return withDesc(new Bacon.Desc(this, "flatMapLatest", [f]), stream.flatMap(function (value) {
    return makeObservable(f(value)).takeUntil(stream);
  }));
};

Bacon.Property.prototype.delayChanges = function (desc, f) {
  return withDesc(desc, addPropertyInitValueToStream(this, f(this.changes())));
};

Bacon.EventStream.prototype.delayChanges = function (desc, f) {
  return withDesc(desc, f(this));
};

Bacon.Observable.prototype.delay = function (delay) {
  return this.delayChanges(new Bacon.Desc(this, "delay", [delay]), function (changes) {
    return changes.flatMap(function (value) {
      return Bacon.later(delay, value);
    });
  });
};

Bacon.Observable.prototype.debounce = function (delay) {
  return this.delayChanges(new Bacon.Desc(this, "debounce", [delay]), function (changes) {
    return changes.flatMapLatest(function (value) {
      return Bacon.later(delay, value);
    });
  });
};

Bacon.Observable.prototype.debounceImmediate = function (delay) {
  return this.delayChanges(new Bacon.Desc(this, "debounceImmediate", [delay]), function (changes) {
    return changes.flatMapFirst(function (value) {
      return Bacon.once(value).concat(Bacon.later(delay).filter(false));
    });
  });
};

Bacon.Observable.prototype.decode = function (cases) {
  return withDesc(new Bacon.Desc(this, "decode", [cases]), this.combine(Bacon.combineTemplate(cases), function (key, values) {
    return values[key];
  }));
};

Bacon.Observable.prototype.scan = function (seed, f) {
  var _this10 = this;

  var resultProperty;
  f = toCombinator(f);
  var acc = toOption(seed);
  var initHandled = false;
  var subscribe = function (sink) {
    var initSent = false;
    var unsub = nop;
    var reply = Bacon.more;
    var sendInit = function () {
      if (!initSent) {
        return acc.forEach(function (value) {
          initSent = initHandled = true;
          reply = sink(new Initial(function () {
            return value;
          }));
          if (reply === Bacon.noMore) {
            unsub();
            unsub = nop;
            return unsub;
          }
        });
      }
    };
    unsub = _this10.dispatcher.subscribe(function (event) {
      if (event.hasValue()) {
        if (initHandled && event.isInitial()) {
          return Bacon.more;
        } else {
            if (!event.isInitial()) {
              sendInit();
            }
            initSent = initHandled = true;
            var prev = acc.getOrElse(undefined);
            var next = f(prev, event.value());

            acc = new Some(next);
            return sink(event.apply(function () {
              return next;
            }));
          }
      } else {
        if (event.isEnd()) {
          reply = sendInit();
        }
        if (reply !== Bacon.noMore) {
          return sink(event);
        }
      }
    });
    UpdateBarrier.whenDoneWith(resultProperty, sendInit);
    return unsub;
  };
  resultProperty = new Property(new Bacon.Desc(this, "scan", [seed, f]), subscribe);
  return resultProperty;
};

Bacon.Observable.prototype.diff = function (start, f) {
  f = toCombinator(f);
  return withDesc(new Bacon.Desc(this, "diff", [start, f]), this.scan([start], function (prevTuple, next) {
    return [next, f(prevTuple[0], next)];
  }).filter(function (tuple) {
    return tuple.length === 2;
  }).map(function (tuple) {
    return tuple[1];
  }));
};

Bacon.Observable.prototype.doAction = function () {
  var f = makeFunctionArgs(arguments);
  return withDesc(new Bacon.Desc(this, "doAction", [f]), this.withHandler(function (event) {
    if (event.hasValue()) {
      f(event.value());
    }
    return this.push(event);
  }));
};

Bacon.Observable.prototype.doEnd = function () {
  var f = makeFunctionArgs(arguments);
  return withDesc(new Bacon.Desc(this, "doEnd", [f]), this.withHandler(function (event) {
    if (event.isEnd()) {
      f();
    }
    return this.push(event);
  }));
};

Bacon.Observable.prototype.doError = function () {
  var f = makeFunctionArgs(arguments);
  return withDesc(new Bacon.Desc(this, "doError", [f]), this.withHandler(function (event) {
    if (event.isError()) {
      f(event.error);
    }
    return this.push(event);
  }));
};

Bacon.Observable.prototype.doLog = function () {
  for (var _len15 = arguments.length, args = Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
    args[_key15] = arguments[_key15];
  }

  return withDesc(new Bacon.Desc(this, "doLog", args), this.withHandler(function (event) {
    if (typeof console !== "undefined" && console !== null && typeof console.log === "function") {
      console.log.apply(console, args.concat([event.log()]));
    }
    return this.push(event);
  }));
};

Bacon.Observable.prototype.endOnError = function (f) {
  if (!(typeof f !== "undefined" && f !== null)) {
    f = true;
  }

  for (var _len16 = arguments.length, args = Array(_len16 > 1 ? _len16 - 1 : 0), _key16 = 1; _key16 < _len16; _key16++) {
    args[_key16 - 1] = arguments[_key16];
  }

  return convertArgsToFunction(this, f, args, function (f) {
    return withDesc(new Bacon.Desc(this, "endOnError", []), this.withHandler(function (event) {
      if (event.isError() && f(event.error)) {
        this.push(event);
        return this.push(endEvent());
      } else {
        return this.push(event);
      }
    }));
  });
};

Observable.prototype.errors = function () {
  return withDesc(new Bacon.Desc(this, "errors", []), this.filter(function () {
    return false;
  }));
};

Bacon.Observable.prototype.take = function (count) {
  if (count <= 0) {
    return Bacon.never();
  }
  return withDesc(new Bacon.Desc(this, "take", [count]), this.withHandler(function (event) {
    if (!event.hasValue()) {
      return this.push(event);
    } else {
      count--;
      if (count > 0) {
        return this.push(event);
      } else {
        if (count === 0) {
          this.push(event);
        }
        this.push(endEvent());
        return Bacon.noMore;
      }
    }
  }));
};

Bacon.Observable.prototype.first = function () {
  return withDesc(new Bacon.Desc(this, "first", []), this.take(1));
};

Bacon.Observable.prototype.mapError = function () {
  var f = makeFunctionArgs(arguments);
  return withDesc(new Bacon.Desc(this, "mapError", [f]), this.withHandler(function (event) {
    if (event.isError()) {
      return this.push(nextEvent(f(event.error)));
    } else {
      return this.push(event);
    }
  }));
};

Bacon.Observable.prototype.flatMapError = function (fn) {
  var desc = new Bacon.Desc(this, "flatMapError", [fn]);
  return withDesc(desc, this.mapError(function (err) {
    return new Error(err);
  }).flatMap(function (x) {
    if (x instanceof Error) {
      return fn(x.error);
    } else {
      return Bacon.once(x);
    }
  }));
};

Bacon.EventStream.prototype.flatScan = function (seed, f) {
  var current = seed;
  return this.flatMapConcat(function (next) {
    return makeObservable(f(current, next)).doAction(function (updated) {
      return current = updated;
    });
  }).toProperty(seed);
};

Bacon.EventStream.prototype.sampledBy = function (sampler, combinator) {
  return withDesc(new Bacon.Desc(this, "sampledBy", [sampler, combinator]), this.toProperty().sampledBy(sampler, combinator));
};

Bacon.Property.prototype.sampledBy = function (sampler, combinator) {
  var lazy = false;
  if (typeof combinator !== "undefined" && combinator !== null) {
    combinator = toCombinator(combinator);
  } else {
    lazy = true;
    combinator = function (f) {
      return f.value();
    };
  }
  var thisSource = new Source(this, false, lazy);
  var samplerSource = new Source(sampler, true, lazy);
  var stream = Bacon.when([thisSource, samplerSource], combinator);
  var result = sampler._isProperty ? stream.toProperty() : stream;
  return withDesc(new Bacon.Desc(this, "sampledBy", [sampler, combinator]), result);
};

Bacon.Property.prototype.sample = function (interval) {
  return withDesc(new Bacon.Desc(this, "sample", [interval]), this.sampledBy(Bacon.interval(interval, {})));
};

Bacon.Observable.prototype.map = function (p) {
  if (p && p._isProperty) {
    return p.sampledBy(this, former);
  } else {
    for (var _len17 = arguments.length, args = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
      args[_key17 - 1] = arguments[_key17];
    }

    return convertArgsToFunction(this, p, args, function (f) {
      return withDesc(new Bacon.Desc(this, "map", [f]), this.withHandler(function (event) {
        return this.push(event.fmap(f));
      }));
    });
  }
};

Bacon.Observable.prototype.fold = function (seed, f) {
  return withDesc(new Bacon.Desc(this, "fold", [seed, f]), this.scan(seed, f).sampledBy(this.filter(false).mapEnd().toProperty()));
};

Observable.prototype.reduce = Observable.prototype.fold;

var eventMethods = [["addEventListener", "removeEventListener"], ["addListener", "removeListener"], ["on", "off"], ["bind", "unbind"]];

var findHandlerMethods = function (target) {
  var pair;
  for (var i = 0; i < eventMethods.length; i++) {
    pair = eventMethods[i];
    var methodPair = [target[pair[0]], target[pair[1]]];
    if (methodPair[0] && methodPair[1]) {
      return methodPair;
    }
  }
  for (var j = 0; j < eventMethods.length; j++) {
    pair = eventMethods[j];
    var addListener = target[pair[0]];
    if (addListener) {
      return [addListener, function () {}];
    }
  }
  throw new Error("No suitable event methods in " + target);
};

Bacon.fromEventTarget = function (target, eventName, eventTransformer) {
  var _findHandlerMethods = findHandlerMethods(target);

  var sub = _findHandlerMethods[0];
  var unsub = _findHandlerMethods[1];

  var desc = new Bacon.Desc(Bacon, "fromEvent", [target, eventName]);
  return withDesc(desc, Bacon.fromBinder(function (handler) {
    sub.call(target, eventName, handler);
    return function () {
      return unsub.call(target, eventName, handler);
    };
  }, eventTransformer));
};

Bacon.fromEvent = Bacon.fromEventTarget;

Bacon.fromPoll = function (delay, poll) {
  var desc = new Bacon.Desc(Bacon, "fromPoll", [delay, poll]);
  return withDesc(desc, Bacon.fromBinder(function (handler) {
    var id = Bacon.scheduler.setInterval(handler, delay);
    return function () {
      return Bacon.scheduler.clearInterval(id);
    };
  }, poll));
};

function valueAndEnd(value) {
  return [value, endEvent()];
}

Bacon.fromPromise = function (promise, abort) {
  var eventTransformer = arguments.length <= 2 || arguments[2] === undefined ? valueAndEnd : arguments[2];

  return withDesc(new Bacon.Desc(Bacon, "fromPromise", [promise]), Bacon.fromBinder(function (handler) {
    var bound = promise.then(handler, function (e) {
      return handler(new Error(e));
    });
    if (bound && typeof bound.done === "function") {
      bound.done();
    }

    if (abort) {
      return function () {
        if (typeof promise.abort === "function") {
          return promise.abort();
        }
      };
    } else {
      return function () {};
    }
  }, eventTransformer));
};

Bacon.Observable.prototype.groupBy = function (keyF) {
  var limitF = arguments.length <= 1 || arguments[1] === undefined ? Bacon._.id : arguments[1];

  var streams = {};
  var src = this;
  return src.filter(function (x) {
    return !streams[keyF(x)];
  }).map(function (x) {
    var key = keyF(x);
    var similar = src.filter(function (x) {
      return keyF(x) === key;
    });
    var data = Bacon.once(x).concat(similar);
    var limited = limitF(data, x).withHandler(function (event) {
      this.push(event);
      if (event.isEnd()) {
        return delete streams[key];
      }
    });
    streams[key] = limited;
    return limited;
  });
};

Bacon.fromArray = function (values) {
  assertArray(values);
  if (!values.length) {
    return withDesc(new Bacon.Desc(Bacon, "fromArray", values), Bacon.never());
  } else {
    var i = 0;
    var stream = new EventStream(new Bacon.Desc(Bacon, "fromArray", [values]), function (sink) {
      var unsubd = false;
      var reply = Bacon.more;
      var pushing = false;
      var pushNeeded = false;
      function push() {
        pushNeeded = true;
        if (pushing) {
          return;
        }
        pushing = true;
        while (pushNeeded) {
          pushNeeded = false;
          if (reply !== Bacon.noMore && !unsubd) {
            var value = values[i++];
            reply = sink(toEvent(value));
            if (reply !== Bacon.noMore) {
              if (i === values.length) {
                sink(endEvent());
              } else {
                UpdateBarrier.afterTransaction(stream, push);
              }
            }
          }
        }
        pushing = false;
        return pushing;
      };

      push();
      return function () {
        unsubd = true;
        return unsubd;
      };
    });
    return stream;
  }
};

Bacon.EventStream.prototype.holdWhen = function (valve) {
  var onHold = false;
  var bufferedValues = [];
  var src = this;
  var srcIsEnded = false;
  return new EventStream(new Bacon.Desc(this, "holdWhen", [valve]), function (sink) {
    var composite = new CompositeUnsubscribe();
    var subscribed = false;
    var endIfBothEnded = function (unsub) {
      if (typeof unsub === "function") {
        unsub();
      }
      if (composite.empty() && subscribed) {
        return sink(endEvent());
      }
    };
    composite.add(function (unsubAll, unsubMe) {
      return valve.subscribeInternal(function (event) {
        if (event.hasValue()) {
          onHold = event.value();
          if (!onHold) {
            var toSend = bufferedValues;
            bufferedValues = [];
            return (function () {
              var result = [];
              for (var i = 0, value; i < toSend.length; i++) {
                value = toSend[i];
                result.push(sink(nextEvent(value)));
              }
              if (srcIsEnded) {
                result.push(sink(endEvent()));
                unsubMe();
              }
              return result;
            })();
          }
        } else if (event.isEnd()) {
          return endIfBothEnded(unsubMe);
        } else {
          return sink(event);
        }
      });
    });
    composite.add(function (unsubAll, unsubMe) {
      return src.subscribeInternal(function (event) {
        if (onHold && event.hasValue()) {
          return bufferedValues.push(event.value());
        } else if (event.isEnd() && bufferedValues.length) {
          srcIsEnded = true;
          return endIfBothEnded(unsubMe);
        } else {
          return sink(event);
        }
      });
    });
    subscribed = true;
    endIfBothEnded();
    return composite.unsubscribe;
  });
};

Bacon.interval = function (delay) {
  var value = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return withDesc(new Bacon.Desc(Bacon, "interval", [delay, value]), Bacon.fromPoll(delay, function () {
    return nextEvent(value);
  }));
};

Bacon.$ = {};
Bacon.$.asEventStream = function (eventName, selector, eventTransformer) {
  var _this11 = this;

  if (_.isFunction(selector)) {
    eventTransformer = selector;
    selector = undefined;
  }

  return withDesc(new Bacon.Desc(this.selector || this, "asEventStream", [eventName]), Bacon.fromBinder(function (handler) {
    _this11.on(eventName, selector, handler);
    return function () {
      return _this11.off(eventName, selector, handler);
    };
  }, eventTransformer));
};

if (typeof jQuery !== "undefined" && jQuery) {
  jQuery.fn.asEventStream = Bacon.$.asEventStream;
}

if (typeof Zepto !== "undefined" && Zepto) {
  Zepto.fn.asEventStream = Bacon.$.asEventStream;
}

Bacon.Observable.prototype.last = function () {
  var lastEvent;

  return withDesc(new Bacon.Desc(this, "last", []), this.withHandler(function (event) {
    if (event.isEnd()) {
      if (lastEvent) {
        this.push(lastEvent);
      }
      this.push(endEvent());
      return Bacon.noMore;
    } else {
      lastEvent = event;
    }
  }));
};

Bacon.Observable.prototype.log = function () {
  for (var _len18 = arguments.length, args = Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
    args[_key18] = arguments[_key18];
  }

  this.subscribe(function (event) {
    if (typeof console !== "undefined" && typeof console.log === "function") {
      console.log.apply(console, args.concat([event.log()]));
    }
  });
  return this;
};

Bacon.EventStream.prototype.merge = function (right) {
  assertEventStream(right);
  var left = this;
  return withDesc(new Bacon.Desc(left, "merge", [right]), Bacon.mergeAll(this, right));
};

Bacon.mergeAll = function () {
  var streams = argumentsToObservables(arguments);
  if (streams.length) {
    return new EventStream(new Bacon.Desc(Bacon, "mergeAll", streams), function (sink) {
      var ends = 0;
      var smartSink = function (obs) {
        return function (unsubBoth) {
          return obs.dispatcher.subscribe(function (event) {
            if (event.isEnd()) {
              ends++;
              if (ends === streams.length) {
                return sink(endEvent());
              } else {
                return Bacon.more;
              }
            } else {
              var reply = sink(event);
              if (reply === Bacon.noMore) {
                unsubBoth();
              }
              return reply;
            }
          });
        };
      };
      var sinks = _.map(smartSink, streams);
      return new Bacon.CompositeUnsubscribe(sinks).unsubscribe;
    });
  } else {
    return Bacon.never();
  }
};

Bacon.repeatedly = function (delay, values) {
  var index = 0;
  return withDesc(new Bacon.Desc(Bacon, "repeatedly", [delay, values]), Bacon.fromPoll(delay, function () {
    return values[index++ % values.length];
  }));
};

Bacon.repeat = function (generator) {
  var index = 0;
  return Bacon.fromBinder(function (sink) {
    var flag = false;
    var reply = Bacon.more;
    var unsub = function () {};
    function handleEvent(event) {
      if (event.isEnd()) {
        if (!flag) {
          return flag = true;
        } else {
          return subscribeNext();
        }
      } else {
        return reply = sink(event);
      }
    };
    function subscribeNext() {
      var next;
      flag = true;
      while (flag && reply !== Bacon.noMore) {
        next = generator(index++);
        flag = false;
        if (next) {
          unsub = next.subscribeInternal(handleEvent);
        } else {
          sink(endEvent());
        }
      }
      return flag = true;
    };
    subscribeNext();
    return function () {
      return unsub();
    };
  });
};

Bacon.retry = function (options) {
  if (!_.isFunction(options.source)) {
    throw new Exception("'source' option has to be a function");
  }
  var source = options.source;
  var retries = options.retries || 0;
  var retriesDone = 0;
  var delay = options.delay || function () {
    return 0;
  };
  var isRetryable = options.isRetryable || function () {
    return true;
  };
  var finished = false;
  var error = null;

  return withDesc(new Bacon.Desc(Bacon, "retry", [options]), Bacon.repeat(function (count) {
    function valueStream() {
      return source(count).endOnError().withHandler(function (event) {
        if (event.isError()) {
          error = event;
          if (!(isRetryable(error.error) && (retries === 0 || retriesDone < retries))) {
            finished = true;
            return this.push(event);
          }
        } else {
          if (event.hasValue()) {
            error = null;
            finished = true;
          }
          return this.push(event);
        }
      });
    }

    if (finished) {
      return null;
    } else if (error) {
      var context = {
        error: error.error,
        retriesDone: retriesDone
      };
      var pause = Bacon.later(delay(context)).filter(false);
      retriesDone++;
      return pause.concat(Bacon.once().flatMap(valueStream));
    } else {
      return valueStream();
    }
  }));
};

Bacon.sequentially = function (delay, values) {
  var index = 0;
  return withDesc(new Bacon.Desc(Bacon, "sequentially", [delay, values]), Bacon.fromPoll(delay, function () {
    var value = values[index++];
    if (index < values.length) {
      return value;
    } else if (index === values.length) {
      return [value, endEvent()];
    } else {
      return endEvent();
    }
  }));
};

Bacon.Observable.prototype.skip = function (count) {
  return withDesc(new Bacon.Desc(this, "skip", [count]), this.withHandler(function (event) {
    if (!event.hasValue()) {
      return this.push(event);
    } else if (count > 0) {
      count--;
      return Bacon.more;
    } else {
      return this.push(event);
    }
  }));
};

Bacon.EventStream.prototype.skipUntil = function (starter) {
  var started = starter.take(1).map(true).toProperty(false);
  return withDesc(new Bacon.Desc(this, "skipUntil", [starter]), this.filter(started));
};

Bacon.EventStream.prototype.skipWhile = function (f) {
  assertObservableIsProperty(f);
  var ok = false;

  for (var _len19 = arguments.length, args = Array(_len19 > 1 ? _len19 - 1 : 0), _key19 = 1; _key19 < _len19; _key19++) {
    args[_key19 - 1] = arguments[_key19];
  }

  return convertArgsToFunction(this, f, args, function (f) {
    return withDesc(new Bacon.Desc(this, "skipWhile", [f]), this.withHandler(function (event) {
      if (ok || !event.hasValue() || !f(event.value())) {
        if (event.hasValue()) {
          ok = true;
        }
        return this.push(event);
      } else {
        return Bacon.more;
      }
    }));
  });
};

Bacon.Observable.prototype.slidingWindow = function (n) {
  var minValues = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  return withDesc(new Bacon.Desc(this, "slidingWindow", [n, minValues]), this.scan([], function (window, value) {
    return window.concat([value]).slice(-n);
  }).filter(function (values) {
    return values.length >= minValues;
  }));
};

var spies = [];
var registerObs = function (obs) {
  if (spies.length) {
    if (!registerObs.running) {
      try {
        registerObs.running = true;
        spies.forEach(function (spy) {
          spy(obs);
        });
      } finally {
        delete registerObs.running;
      }
    }
  }
};

Bacon.spy = function (spy) {
  return spies.push(spy);
};

Bacon.Property.prototype.startWith = function (seed) {
  return withDesc(new Bacon.Desc(this, "startWith", [seed]), this.scan(seed, function (prev, next) {
    return next;
  }));
};

Bacon.EventStream.prototype.startWith = function (seed) {
  return withDesc(new Bacon.Desc(this, "startWith", [seed]), Bacon.once(seed).concat(this));
};

Bacon.Observable.prototype.takeWhile = function (f) {
  assertObservableIsProperty(f);

  for (var _len20 = arguments.length, args = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
    args[_key20 - 1] = arguments[_key20];
  }

  return convertArgsToFunction(this, f, args, function (f) {
    return withDesc(new Bacon.Desc(this, "takeWhile", [f]), this.withHandler(function (event) {
      if (event.filter(f)) {
        return this.push(event);
      } else {
        this.push(endEvent());
        return Bacon.noMore;
      }
    }));
  });
};

Bacon.Observable.prototype.throttle = function (delay) {
  return this.delayChanges(new Bacon.Desc(this, "throttle", [delay]), function (changes) {
    return changes.bufferWithTime(delay).map(function (values) {
      return values[values.length - 1];
    });
  });
};

Observable.prototype.firstToPromise = function (PromiseCtr) {
  var _this12 = this;

  if (typeof PromiseCtr !== "function") {
    if (typeof Promise === "function") {
      PromiseCtr = Promise;
    } else {
      throw new Exception("There isn't default Promise, use shim or parameter");
    }
  }

  return new PromiseCtr(function (resolve, reject) {
    return _this12.subscribe(function (event) {
      if (event.hasValue()) {
        resolve(event.value());
      }
      if (event.isError()) {
        reject(event.error);
      }

      return Bacon.noMore;
    });
  });
};

Observable.prototype.toPromise = function (PromiseCtr) {
  return this.last().firstToPromise(PromiseCtr);
};

Bacon["try"] = function (f) {
  return function (value) {
    try {
      return Bacon.once(f(value));
    } catch (e) {
      return new Bacon.Error(e);
    }
  };
};

Bacon.update = function (initial) {
  function lateBindFirst(f) {
    return function () {
      for (var _len22 = arguments.length, args = Array(_len22), _key22 = 0; _key22 < _len22; _key22++) {
        args[_key22] = arguments[_key22];
      }

      return function (i) {
        return f.apply(undefined, [i].concat(args));
      };
    };
  }

  for (var _len21 = arguments.length, patterns = Array(_len21 > 1 ? _len21 - 1 : 0), _key21 = 1; _key21 < _len21; _key21++) {
    patterns[_key21 - 1] = arguments[_key21];
  }

  var i = patterns.length - 1;
  while (i > 0) {
    if (!(patterns[i] instanceof Function)) {
      patterns[i] = _.always(patterns[i]);
    }
    patterns[i] = lateBindFirst(patterns[i]);
    i = i - 2;
  }
  return withDesc(new Bacon.Desc(Bacon, "update", [initial].concat(patterns)), Bacon.when.apply(Bacon, patterns).scan(initial, function (x, f) {
    return f(x);
  }));
};

Bacon.zipAsArray = function () {
  for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
    args[_key23] = arguments[_key23];
  }

  var streams = argumentsToObservables(args);
  return withDesc(new Bacon.Desc(Bacon, "zipAsArray", streams), Bacon.zipWith(streams, function () {
    for (var _len24 = arguments.length, xs = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
      xs[_key24] = arguments[_key24];
    }

    return xs;
  }));
};

Bacon.zipWith = function () {
  for (var _len25 = arguments.length, args = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
    args[_key25] = arguments[_key25];
  }

  var observablesAndFunction = argumentsToObservablesAndFunction(args);
  var streams = observablesAndFunction[0];
  var f = observablesAndFunction[1];

  streams = _.map(function (s) {
    return s.toEventStream();
  }, streams);
  return withDesc(new Bacon.Desc(Bacon, "zipWith", [f].concat(streams)), Bacon.when(streams, f));
};

Bacon.Observable.prototype.zip = function (other, f) {
  return withDesc(new Bacon.Desc(this, "zip", [other]), Bacon.zipWith([this, other], f || Array));
};

function ESObservable(observable) {
  this.observable = observable;
}

ESObservable.prototype.subscribe = function (observerOrOnNext, onError, onComplete) {
  var observer = typeof observerOrOnNext === 'function' ? { next: observerOrOnNext, error: onError, complete: onComplete } : observerOrOnNext;
  var subscription = {
    closed: false,
    unsubscribe: function () {
      subscription.closed = true;
      cancel();
    }
  };

  var cancel = this.observable.subscribe(function (event) {
    if (event.isError()) {
      if (observer.error) observer.error(event.error);
      subscription.unsubscribe();
    } else if (event.isEnd()) {
      subscription.closed = true;
      if (observer.complete) observer.complete();
    } else if (observer.next) {
      observer.next(event.value());
    }
  });
  return subscription;
};

ESObservable.prototype[symbol('observable')] = function () {
  return this;
};

Bacon.Observable.prototype.toESObservable = function () {
  return new ESObservable(this);
};

Bacon.Observable.prototype[symbol('observable')] = Bacon.Observable.prototype.toESObservable;

Bacon.fromESObservable = function (_observable) {
  var observable;
  if (_observable[symbol("observable")]) {
    observable = _observable[symbol("observable")]();
  } else {
    observable = _observable;
  }

  var desc = new Bacon.Desc(Bacon, "fromESObservable", [observable]);
  return new Bacon.EventStream(desc, function (sink) {
    var cancel = observable.subscribe({
      error: function () {
        sink(new Bacon.Error());
        sink(new Bacon.End());
      },
      next: function (value) {
        sink(new Bacon.Next(value, true));
      },
      complete: function () {
        sink(new Bacon.End());
      }
    });

    if (cancel.unsubscribe) {
      return function () {
        cancel.unsubscribe();
      };
    } else {
      return cancel;
    }
  });
};

if (typeof define !== "undefined" && define !== null && define.amd != null) {
  define([], function () {
    return Bacon;
  });
  if (typeof this !== "undefined" && this !== null) {
    this.Bacon = Bacon;
  }
} else if (typeof module !== "undefined" && module !== null && module.exports != null) {
  module.exports = Bacon;
  Bacon.Bacon = Bacon;
} else {
    this.Bacon = Bacon;
  }
}).call(this);
