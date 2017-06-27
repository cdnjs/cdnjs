"format register";
System.register("rx", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  ;
  (function(undefined) {
    var objectTypes = {
      'boolean': false,
      'function': true,
      'object': true,
      'number': false,
      'string': false,
      'undefined': false
    };
    var root = (objectTypes[typeof window] && window) || this,
        freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
        freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
        moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
        freeGlobal = objectTypes[typeof global] && global;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
      root = freeGlobal;
    }
    var Rx = {
      internals: {},
      config: {Promise: root.Promise},
      helpers: {}
    };
    var noop = Rx.helpers.noop = function() {},
        notDefined = Rx.helpers.notDefined = function(x) {
          return typeof x === 'undefined';
        },
        isScheduler = Rx.helpers.isScheduler = function(x) {
          return x instanceof Rx.Scheduler;
        },
        identity = Rx.helpers.identity = function(x) {
          return x;
        },
        pluck = Rx.helpers.pluck = function(property) {
          return function(x) {
            return x[property];
          };
        },
        just = Rx.helpers.just = function(value) {
          return function() {
            return value;
          };
        },
        defaultNow = Rx.helpers.defaultNow = Date.now,
        defaultComparer = Rx.helpers.defaultComparer = function(x, y) {
          return isEqual(x, y);
        },
        defaultSubComparer = Rx.helpers.defaultSubComparer = function(x, y) {
          return x > y ? 1 : (x < y ? -1 : 0);
        },
        defaultKeySerializer = Rx.helpers.defaultKeySerializer = function(x) {
          return x.toString();
        },
        defaultError = Rx.helpers.defaultError = function(err) {
          throw err;
        },
        isPromise = Rx.helpers.isPromise = function(p) {
          return !!p && typeof p.then === 'function';
        },
        asArray = Rx.helpers.asArray = function() {
          return Array.prototype.slice.call(arguments);
        },
        not = Rx.helpers.not = function(a) {
          return !a;
        },
        isFunction = Rx.helpers.isFunction = (function() {
          var isFn = function(value) {
            return typeof value == 'function' || false;
          };
          if (isFn(/x/)) {
            isFn = function(value) {
              return typeof value == 'function' && toString.call(value) == '[object Function]';
            };
          }
          return isFn;
        }());
    function cloneArray(arr) {
      for (var a = [],
          i = 0,
          len = arr.length; i < len; i++) {
        a.push(arr[i]);
      }
      return a;
    }
    Rx.config.longStackSupport = false;
    var hasStacks = false;
    try {
      throw new Error();
    } catch (e) {
      hasStacks = !!e.stack;
    }
    var rStartingLine = captureLine(),
        rFileName;
    var STACK_JUMP_SEPARATOR = "From previous event:";
    function makeStackTraceLong(error, observable) {
      if (hasStacks && observable.stack && typeof error === "object" && error !== null && error.stack && error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1) {
        var stacks = [];
        for (var o = observable; !!o; o = o.source) {
          if (o.stack) {
            stacks.unshift(o.stack);
          }
        }
        stacks.unshift(error.stack);
        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        error.stack = filterStackString(concatedStacks);
      }
    }
    function filterStackString(stackString) {
      var lines = stackString.split("\n"),
          desiredLines = [];
      for (var i = 0,
          len = lines.length; i < len; i++) {
        var line = lines[i];
        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
          desiredLines.push(line);
        }
      }
      return desiredLines.join("\n");
    }
    function isInternalFrame(stackLine) {
      var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);
      if (!fileNameAndLineNumber) {
        return false;
      }
      var fileName = fileNameAndLineNumber[0],
          lineNumber = fileNameAndLineNumber[1];
      return fileName === rFileName && lineNumber >= rStartingLine && lineNumber <= rEndingLine;
    }
    function isNodeFrame(stackLine) {
      return stackLine.indexOf("(module.js:") !== -1 || stackLine.indexOf("(node.js:") !== -1;
    }
    function captureLine() {
      if (!hasStacks) {
        return ;
      }
      try {
        throw new Error();
      } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
          return ;
        }
        rFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
      }
    }
    function getFileNameAndLineNumber(stackLine) {
      var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
      if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
      }
      var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
      if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
      }
      var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
      if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
      }
    }
    var EmptyError = Rx.EmptyError = function() {
      this.message = 'Sequence contains no elements.';
      Error.call(this);
    };
    EmptyError.prototype = Error.prototype;
    var ObjectDisposedError = Rx.ObjectDisposedError = function() {
      this.message = 'Object has been disposed';
      Error.call(this);
    };
    ObjectDisposedError.prototype = Error.prototype;
    var ArgumentOutOfRangeError = Rx.ArgumentOutOfRangeError = function() {
      this.message = 'Argument out of range';
      Error.call(this);
    };
    ArgumentOutOfRangeError.prototype = Error.prototype;
    var NotSupportedError = Rx.NotSupportedError = function(message) {
      this.message = message || 'This operation is not supported';
      Error.call(this);
    };
    NotSupportedError.prototype = Error.prototype;
    var NotImplementedError = Rx.NotImplementedError = function(message) {
      this.message = message || 'This operation is not implemented';
      Error.call(this);
    };
    NotImplementedError.prototype = Error.prototype;
    var notImplemented = Rx.helpers.notImplemented = function() {
      throw new NotImplementedError();
    };
    var notSupported = Rx.helpers.notSupported = function() {
      throw new NotSupportedError();
    };
    var $iterator$ = (typeof Symbol === 'function' && Symbol.iterator) || '_es6shim_iterator_';
    if (root.Set && typeof new root.Set()['@@iterator'] === 'function') {
      $iterator$ = '@@iterator';
    }
    var doneEnumerator = Rx.doneEnumerator = {
      done: true,
      value: undefined
    };
    var isIterable = Rx.helpers.isIterable = function(o) {
      return o[$iterator$] !== undefined;
    };
    var isArrayLike = Rx.helpers.isArrayLike = function(o) {
      return o && o.length !== undefined;
    };
    Rx.helpers.iterator = $iterator$;
    var bindCallback = Rx.internals.bindCallback = function(func, thisArg, argCount) {
      if (typeof thisArg === 'undefined') {
        return func;
      }
      switch (argCount) {
        case 0:
          return function() {
            return func.call(thisArg);
          };
        case 1:
          return function(arg) {
            return func.call(thisArg, arg);
          };
        case 2:
          return function(value, index) {
            return func.call(thisArg, value, index);
          };
        case 3:
          return function(value, index, collection) {
            return func.call(thisArg, value, index, collection);
          };
      }
      return function() {
        return func.apply(thisArg, arguments);
      };
    };
    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
        dontEnumsLength = dontEnums.length;
    var argsClass = '[object Arguments]',
        arrayClass = '[object Array]',
        boolClass = '[object Boolean]',
        dateClass = '[object Date]',
        errorClass = '[object Error]',
        funcClass = '[object Function]',
        numberClass = '[object Number]',
        objectClass = '[object Object]',
        regexpClass = '[object RegExp]',
        stringClass = '[object String]';
    var toString = Object.prototype.toString,
        hasOwnProperty = Object.prototype.hasOwnProperty,
        supportsArgsClass = toString.call(arguments) == argsClass,
        supportNodeClass,
        errorProto = Error.prototype,
        objectProto = Object.prototype,
        stringProto = String.prototype,
        propertyIsEnumerable = objectProto.propertyIsEnumerable;
    try {
      supportNodeClass = !(toString.call(document) == objectClass && !({'toString': 0} + ''));
    } catch (e) {
      supportNodeClass = true;
    }
    var nonEnumProps = {};
    nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = {
      'constructor': true,
      'toLocaleString': true,
      'toString': true,
      'valueOf': true
    };
    nonEnumProps[boolClass] = nonEnumProps[stringClass] = {
      'constructor': true,
      'toString': true,
      'valueOf': true
    };
    nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = {
      'constructor': true,
      'toString': true
    };
    nonEnumProps[objectClass] = {'constructor': true};
    var support = {};
    (function() {
      var ctor = function() {
        this.x = 1;
      },
          props = [];
      ctor.prototype = {
        'valueOf': 1,
        'y': 1
      };
      for (var key in new ctor) {
        props.push(key);
      }
      for (key in arguments) {}
      support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');
      support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');
      support.nonEnumArgs = key != 0;
      support.nonEnumShadows = !/valueOf/.test(props);
    }(1));
    var isObject = Rx.internals.isObject = function(value) {
      var type = typeof value;
      return value && (type == 'function' || type == 'object') || false;
    };
    function keysIn(object) {
      var result = [];
      if (!isObject(object)) {
        return result;
      }
      if (support.nonEnumArgs && object.length && isArguments(object)) {
        object = slice.call(object);
      }
      var skipProto = support.enumPrototypes && typeof object == 'function',
          skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error);
      for (var key in object) {
        if (!(skipProto && key == 'prototype') && !(skipErrorProps && (key == 'message' || key == 'name'))) {
          result.push(key);
        }
      }
      if (support.nonEnumShadows && object !== objectProto) {
        var ctor = object.constructor,
            index = -1,
            length = dontEnumsLength;
        if (object === (ctor && ctor.prototype)) {
          var className = object === stringProto ? stringClass : object === errorProto ? errorClass : toString.call(object),
              nonEnum = nonEnumProps[className];
        }
        while (++index < length) {
          key = dontEnums[index];
          if (!(nonEnum && nonEnum[key]) && hasOwnProperty.call(object, key)) {
            result.push(key);
          }
        }
      }
      return result;
    }
    function internalFor(object, callback, keysFunc) {
      var index = -1,
          props = keysFunc(object),
          length = props.length;
      while (++index < length) {
        var key = props[index];
        if (callback(object[key], key, object) === false) {
          break;
        }
      }
      return object;
    }
    function internalForIn(object, callback) {
      return internalFor(object, callback, keysIn);
    }
    function isNode(value) {
      return typeof value.toString != 'function' && typeof(value + '') == 'string';
    }
    var isArguments = function(value) {
      return (value && typeof value == 'object') ? toString.call(value) == argsClass : false;
    };
    if (!supportsArgsClass) {
      isArguments = function(value) {
        return (value && typeof value == 'object') ? hasOwnProperty.call(value, 'callee') : false;
      };
    }
    var isEqual = Rx.internals.isEqual = function(x, y) {
      return deepEquals(x, y, [], []);
    };
    function deepEquals(a, b, stackA, stackB) {
      if (a === b) {
        return a !== 0 || (1 / a == 1 / b);
      }
      var type = typeof a,
          otherType = typeof b;
      if (a === a && (a == null || b == null || (type != 'function' && type != 'object' && otherType != 'function' && otherType != 'object'))) {
        return false;
      }
      var className = toString.call(a),
          otherClass = toString.call(b);
      if (className == argsClass) {
        className = objectClass;
      }
      if (otherClass == argsClass) {
        otherClass = objectClass;
      }
      if (className != otherClass) {
        return false;
      }
      switch (className) {
        case boolClass:
        case dateClass:
          return +a == +b;
        case numberClass:
          return (a != +a) ? b != +b : (a == 0 ? (1 / a == 1 / b) : a == +b);
        case regexpClass:
        case stringClass:
          return a == String(b);
      }
      var isArr = className == arrayClass;
      if (!isArr) {
        if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
          return false;
        }
        var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
            ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;
        if (ctorA != ctorB && !(hasOwnProperty.call(a, 'constructor') && hasOwnProperty.call(b, 'constructor')) && !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) && ('constructor' in a && 'constructor' in b)) {
          return false;
        }
      }
      var initedStack = !stackA;
      stackA || (stackA = []);
      stackB || (stackB = []);
      var length = stackA.length;
      while (length--) {
        if (stackA[length] == a) {
          return stackB[length] == b;
        }
      }
      var size = 0;
      var result = true;
      stackA.push(a);
      stackB.push(b);
      if (isArr) {
        length = a.length;
        size = b.length;
        result = size == length;
        if (result) {
          while (size--) {
            var index = length,
                value = b[size];
            if (!(result = deepEquals(a[size], value, stackA, stackB))) {
              break;
            }
          }
        }
      } else {
        internalForIn(b, function(value, key, b) {
          if (hasOwnProperty.call(b, key)) {
            size++;
            return (result = hasOwnProperty.call(a, key) && deepEquals(a[key], value, stackA, stackB));
          }
        });
        if (result) {
          internalForIn(a, function(value, key, a) {
            if (hasOwnProperty.call(a, key)) {
              return (result = --size > -1);
            }
          });
        }
      }
      stackA.pop();
      stackB.pop();
      return result;
    }
    var hasProp = {}.hasOwnProperty,
        slice = Array.prototype.slice;
    var inherits = this.inherits = Rx.internals.inherits = function(child, parent) {
      function __() {
        this.constructor = child;
      }
      __.prototype = parent.prototype;
      child.prototype = new __();
    };
    var addProperties = Rx.internals.addProperties = function(obj) {
      for (var sources = [],
          i = 1,
          len = arguments.length; i < len; i++) {
        sources.push(arguments[i]);
      }
      for (var idx = 0,
          ln = sources.length; idx < ln; idx++) {
        var source = sources[idx];
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    };
    var addRef = Rx.internals.addRef = function(xs, r) {
      return new AnonymousObservable(function(observer) {
        return new CompositeDisposable(r.getDisposable(), xs.subscribe(observer));
      });
    };
    function arrayInitialize(count, factory) {
      var a = new Array(count);
      for (var i = 0; i < count; i++) {
        a[i] = factory();
      }
      return a;
    }
    var errorObj = {e: {}};
    var tryCatchTarget;
    function tryCatcher() {
      try {
        return tryCatchTarget.apply(this, arguments);
      } catch (e) {
        errorObj.e = e;
        return errorObj;
      }
    }
    function tryCatch(fn) {
      if (!isFunction(fn)) {
        throw new TypeError('fn must be a function');
      }
      tryCatchTarget = fn;
      return tryCatcher;
    }
    function thrower(e) {
      throw e;
    }
    function IndexedItem(id, value) {
      this.id = id;
      this.value = value;
    }
    IndexedItem.prototype.compareTo = function(other) {
      var c = this.value.compareTo(other.value);
      c === 0 && (c = this.id - other.id);
      return c;
    };
    var PriorityQueue = Rx.internals.PriorityQueue = function(capacity) {
      this.items = new Array(capacity);
      this.length = 0;
    };
    var priorityProto = PriorityQueue.prototype;
    priorityProto.isHigherPriority = function(left, right) {
      return this.items[left].compareTo(this.items[right]) < 0;
    };
    priorityProto.percolate = function(index) {
      if (index >= this.length || index < 0) {
        return ;
      }
      var parent = index - 1 >> 1;
      if (parent < 0 || parent === index) {
        return ;
      }
      if (this.isHigherPriority(index, parent)) {
        var temp = this.items[index];
        this.items[index] = this.items[parent];
        this.items[parent] = temp;
        this.percolate(parent);
      }
    };
    priorityProto.heapify = function(index) {
      +index || (index = 0);
      if (index >= this.length || index < 0) {
        return ;
      }
      var left = 2 * index + 1,
          right = 2 * index + 2,
          first = index;
      if (left < this.length && this.isHigherPriority(left, first)) {
        first = left;
      }
      if (right < this.length && this.isHigherPriority(right, first)) {
        first = right;
      }
      if (first !== index) {
        var temp = this.items[index];
        this.items[index] = this.items[first];
        this.items[first] = temp;
        this.heapify(first);
      }
    };
    priorityProto.peek = function() {
      return this.items[0].value;
    };
    priorityProto.removeAt = function(index) {
      this.items[index] = this.items[--this.length];
      this.items[this.length] = undefined;
      this.heapify();
    };
    priorityProto.dequeue = function() {
      var result = this.peek();
      this.removeAt(0);
      return result;
    };
    priorityProto.enqueue = function(item) {
      var index = this.length++;
      this.items[index] = new IndexedItem(PriorityQueue.count++, item);
      this.percolate(index);
    };
    priorityProto.remove = function(item) {
      for (var i = 0; i < this.length; i++) {
        if (this.items[i].value === item) {
          this.removeAt(i);
          return true;
        }
      }
      return false;
    };
    PriorityQueue.count = 0;
    var CompositeDisposable = Rx.CompositeDisposable = function() {
      var args = [],
          i,
          len;
      if (Array.isArray(arguments[0])) {
        args = arguments[0];
        len = args.length;
      } else {
        len = arguments.length;
        args = new Array(len);
        for (i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
      }
      for (i = 0; i < len; i++) {
        if (!isDisposable(args[i])) {
          throw new TypeError('Not a disposable');
        }
      }
      this.disposables = args;
      this.isDisposed = false;
      this.length = args.length;
    };
    var CompositeDisposablePrototype = CompositeDisposable.prototype;
    CompositeDisposablePrototype.add = function(item) {
      if (this.isDisposed) {
        item.dispose();
      } else {
        this.disposables.push(item);
        this.length++;
      }
    };
    CompositeDisposablePrototype.remove = function(item) {
      var shouldDispose = false;
      if (!this.isDisposed) {
        var idx = this.disposables.indexOf(item);
        if (idx !== -1) {
          shouldDispose = true;
          this.disposables.splice(idx, 1);
          this.length--;
          item.dispose();
        }
      }
      return shouldDispose;
    };
    CompositeDisposablePrototype.dispose = function() {
      if (!this.isDisposed) {
        this.isDisposed = true;
        var len = this.disposables.length,
            currentDisposables = new Array(len);
        for (var i = 0; i < len; i++) {
          currentDisposables[i] = this.disposables[i];
        }
        this.disposables = [];
        this.length = 0;
        for (i = 0; i < len; i++) {
          currentDisposables[i].dispose();
        }
      }
    };
    var Disposable = Rx.Disposable = function(action) {
      this.isDisposed = false;
      this.action = action || noop;
    };
    Disposable.prototype.dispose = function() {
      if (!this.isDisposed) {
        this.action();
        this.isDisposed = true;
      }
    };
    var disposableCreate = Disposable.create = function(action) {
      return new Disposable(action);
    };
    var disposableEmpty = Disposable.empty = {dispose: noop};
    var isDisposable = Disposable.isDisposable = function(d) {
      return d && isFunction(d.dispose);
    };
    var checkDisposed = Disposable.checkDisposed = function(disposable) {
      if (disposable.isDisposed) {
        throw new ObjectDisposedError();
      }
    };
    var SingleAssignmentDisposable = Rx.SingleAssignmentDisposable = (function() {
      function BooleanDisposable() {
        this.isDisposed = false;
        this.current = null;
      }
      var booleanDisposablePrototype = BooleanDisposable.prototype;
      booleanDisposablePrototype.getDisposable = function() {
        return this.current;
      };
      booleanDisposablePrototype.setDisposable = function(value) {
        var shouldDispose = this.isDisposed;
        if (!shouldDispose) {
          var old = this.current;
          this.current = value;
        }
        old && old.dispose();
        shouldDispose && value && value.dispose();
      };
      booleanDisposablePrototype.dispose = function() {
        if (!this.isDisposed) {
          this.isDisposed = true;
          var old = this.current;
          this.current = null;
        }
        old && old.dispose();
      };
      return BooleanDisposable;
    }());
    var SerialDisposable = Rx.SerialDisposable = SingleAssignmentDisposable;
    var RefCountDisposable = Rx.RefCountDisposable = (function() {
      function InnerDisposable(disposable) {
        this.disposable = disposable;
        this.disposable.count++;
        this.isInnerDisposed = false;
      }
      InnerDisposable.prototype.dispose = function() {
        if (!this.disposable.isDisposed && !this.isInnerDisposed) {
          this.isInnerDisposed = true;
          this.disposable.count--;
          if (this.disposable.count === 0 && this.disposable.isPrimaryDisposed) {
            this.disposable.isDisposed = true;
            this.disposable.underlyingDisposable.dispose();
          }
        }
      };
      function RefCountDisposable(disposable) {
        this.underlyingDisposable = disposable;
        this.isDisposed = false;
        this.isPrimaryDisposed = false;
        this.count = 0;
      }
      RefCountDisposable.prototype.dispose = function() {
        if (!this.isDisposed && !this.isPrimaryDisposed) {
          this.isPrimaryDisposed = true;
          if (this.count === 0) {
            this.isDisposed = true;
            this.underlyingDisposable.dispose();
          }
        }
      };
      RefCountDisposable.prototype.getDisposable = function() {
        return this.isDisposed ? disposableEmpty : new InnerDisposable(this);
      };
      return RefCountDisposable;
    })();
    function ScheduledDisposable(scheduler, disposable) {
      this.scheduler = scheduler;
      this.disposable = disposable;
      this.isDisposed = false;
    }
    function scheduleItem(s, self) {
      if (!self.isDisposed) {
        self.isDisposed = true;
        self.disposable.dispose();
      }
    }
    ScheduledDisposable.prototype.dispose = function() {
      this.scheduler.scheduleWithState(this, scheduleItem);
    };
    var ScheduledItem = Rx.internals.ScheduledItem = function(scheduler, state, action, dueTime, comparer) {
      this.scheduler = scheduler;
      this.state = state;
      this.action = action;
      this.dueTime = dueTime;
      this.comparer = comparer || defaultSubComparer;
      this.disposable = new SingleAssignmentDisposable();
    };
    ScheduledItem.prototype.invoke = function() {
      this.disposable.setDisposable(this.invokeCore());
    };
    ScheduledItem.prototype.compareTo = function(other) {
      return this.comparer(this.dueTime, other.dueTime);
    };
    ScheduledItem.prototype.isCancelled = function() {
      return this.disposable.isDisposed;
    };
    ScheduledItem.prototype.invokeCore = function() {
      return this.action(this.scheduler, this.state);
    };
    var Scheduler = Rx.Scheduler = (function() {
      function Scheduler(now, schedule, scheduleRelative, scheduleAbsolute) {
        this.now = now;
        this._schedule = schedule;
        this._scheduleRelative = scheduleRelative;
        this._scheduleAbsolute = scheduleAbsolute;
      }
      function invokeAction(scheduler, action) {
        action();
        return disposableEmpty;
      }
      var schedulerProto = Scheduler.prototype;
      schedulerProto.schedule = function(action) {
        return this._schedule(action, invokeAction);
      };
      schedulerProto.scheduleWithState = function(state, action) {
        return this._schedule(state, action);
      };
      schedulerProto.scheduleWithRelative = function(dueTime, action) {
        return this._scheduleRelative(action, dueTime, invokeAction);
      };
      schedulerProto.scheduleWithRelativeAndState = function(state, dueTime, action) {
        return this._scheduleRelative(state, dueTime, action);
      };
      schedulerProto.scheduleWithAbsolute = function(dueTime, action) {
        return this._scheduleAbsolute(action, dueTime, invokeAction);
      };
      schedulerProto.scheduleWithAbsoluteAndState = function(state, dueTime, action) {
        return this._scheduleAbsolute(state, dueTime, action);
      };
      Scheduler.now = defaultNow;
      Scheduler.normalize = function(timeSpan) {
        timeSpan < 0 && (timeSpan = 0);
        return timeSpan;
      };
      return Scheduler;
    }());
    var normalizeTime = Scheduler.normalize;
    (function(schedulerProto) {
      function invokeRecImmediate(scheduler, pair) {
        var state = pair[0],
            action = pair[1],
            group = new CompositeDisposable();
        function recursiveAction(state1) {
          action(state1, function(state2) {
            var isAdded = false,
                isDone = false,
                d = scheduler.scheduleWithState(state2, function(scheduler1, state3) {
                  if (isAdded) {
                    group.remove(d);
                  } else {
                    isDone = true;
                  }
                  recursiveAction(state3);
                  return disposableEmpty;
                });
            if (!isDone) {
              group.add(d);
              isAdded = true;
            }
          });
        }
        recursiveAction(state);
        return group;
      }
      function invokeRecDate(scheduler, pair, method) {
        var state = pair[0],
            action = pair[1],
            group = new CompositeDisposable();
        function recursiveAction(state1) {
          action(state1, function(state2, dueTime1) {
            var isAdded = false,
                isDone = false,
                d = scheduler[method](state2, dueTime1, function(scheduler1, state3) {
                  if (isAdded) {
                    group.remove(d);
                  } else {
                    isDone = true;
                  }
                  recursiveAction(state3);
                  return disposableEmpty;
                });
            if (!isDone) {
              group.add(d);
              isAdded = true;
            }
          });
        }
        ;
        recursiveAction(state);
        return group;
      }
      function scheduleInnerRecursive(action, self) {
        action(function(dt) {
          self(action, dt);
        });
      }
      schedulerProto.scheduleRecursive = function(action) {
        return this.scheduleRecursiveWithState(action, function(_action, self) {
          _action(function() {
            self(_action);
          });
        });
      };
      schedulerProto.scheduleRecursiveWithState = function(state, action) {
        return this.scheduleWithState([state, action], invokeRecImmediate);
      };
      schedulerProto.scheduleRecursiveWithRelative = function(dueTime, action) {
        return this.scheduleRecursiveWithRelativeAndState(action, dueTime, scheduleInnerRecursive);
      };
      schedulerProto.scheduleRecursiveWithRelativeAndState = function(state, dueTime, action) {
        return this._scheduleRelative([state, action], dueTime, function(s, p) {
          return invokeRecDate(s, p, 'scheduleWithRelativeAndState');
        });
      };
      schedulerProto.scheduleRecursiveWithAbsolute = function(dueTime, action) {
        return this.scheduleRecursiveWithAbsoluteAndState(action, dueTime, scheduleInnerRecursive);
      };
      schedulerProto.scheduleRecursiveWithAbsoluteAndState = function(state, dueTime, action) {
        return this._scheduleAbsolute([state, action], dueTime, function(s, p) {
          return invokeRecDate(s, p, 'scheduleWithAbsoluteAndState');
        });
      };
    }(Scheduler.prototype));
    (function(schedulerProto) {
      Scheduler.prototype.schedulePeriodic = function(period, action) {
        return this.schedulePeriodicWithState(null, period, action);
      };
      Scheduler.prototype.schedulePeriodicWithState = function(state, period, action) {
        if (typeof root.setInterval === 'undefined') {
          throw new NotSupportedError();
        }
        period = normalizeTime(period);
        var s = state,
            id = root.setInterval(function() {
              s = action(s);
            }, period);
        return disposableCreate(function() {
          root.clearInterval(id);
        });
      };
    }(Scheduler.prototype));
    (function(schedulerProto) {
      schedulerProto.catchError = schedulerProto['catch'] = function(handler) {
        return new CatchScheduler(this, handler);
      };
    }(Scheduler.prototype));
    var SchedulePeriodicRecursive = Rx.internals.SchedulePeriodicRecursive = (function() {
      function tick(command, recurse) {
        recurse(0, this._period);
        try {
          this._state = this._action(this._state);
        } catch (e) {
          this._cancel.dispose();
          throw e;
        }
      }
      function SchedulePeriodicRecursive(scheduler, state, period, action) {
        this._scheduler = scheduler;
        this._state = state;
        this._period = period;
        this._action = action;
      }
      SchedulePeriodicRecursive.prototype.start = function() {
        var d = new SingleAssignmentDisposable();
        this._cancel = d;
        d.setDisposable(this._scheduler.scheduleRecursiveWithRelativeAndState(0, this._period, tick.bind(this)));
        return d;
      };
      return SchedulePeriodicRecursive;
    }());
    var immediateScheduler = Scheduler.immediate = (function() {
      function scheduleNow(state, action) {
        return action(this, state);
      }
      return new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
    }());
    var currentThreadScheduler = Scheduler.currentThread = (function() {
      var queue;
      function runTrampoline() {
        while (queue.length > 0) {
          var item = queue.dequeue();
          !item.isCancelled() && item.invoke();
        }
      }
      function scheduleNow(state, action) {
        var si = new ScheduledItem(this, state, action, this.now());
        if (!queue) {
          queue = new PriorityQueue(4);
          queue.enqueue(si);
          var result = tryCatch(runTrampoline)();
          queue = null;
          if (result === errorObj) {
            return thrower(result.e);
          }
        } else {
          queue.enqueue(si);
        }
        return si.disposable;
      }
      var currentScheduler = new Scheduler(defaultNow, scheduleNow, notSupported, notSupported);
      currentScheduler.scheduleRequired = function() {
        return !queue;
      };
      return currentScheduler;
    }());
    var scheduleMethod,
        clearMethod;
    var localTimer = (function() {
      var localSetTimeout,
          localClearTimeout = noop;
      if (!!root.WScript) {
        localSetTimeout = function(fn, time) {
          root.WScript.Sleep(time);
          fn();
        };
      } else if (!!root.setTimeout) {
        localSetTimeout = root.setTimeout;
        localClearTimeout = root.clearTimeout;
      } else {
        throw new NotSupportedError();
      }
      return {
        setTimeout: localSetTimeout,
        clearTimeout: localClearTimeout
      };
    }());
    var localSetTimeout = localTimer.setTimeout,
        localClearTimeout = localTimer.clearTimeout;
    (function() {
      var nextHandle = 1,
          tasksByHandle = {},
          currentlyRunning = false;
      clearMethod = function(handle) {
        delete tasksByHandle[handle];
      };
      function runTask(handle) {
        if (currentlyRunning) {
          localSetTimeout(function() {
            runTask(handle);
          }, 0);
        } else {
          var task = tasksByHandle[handle];
          if (task) {
            currentlyRunning = true;
            var result = tryCatch(task)();
            clearMethod(handle);
            currentlyRunning = false;
            if (result === errorObj) {
              return thrower(result.e);
            }
          }
        }
      }
      var reNative = RegExp('^' + String(toString).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/toString| for [^\]]+/g, '.*?') + '$');
      var setImmediate = typeof(setImmediate = freeGlobal && moduleExports && freeGlobal.setImmediate) == 'function' && !reNative.test(setImmediate) && setImmediate;
      function postMessageSupported() {
        if (!root.postMessage || root.importScripts) {
          return false;
        }
        var isAsync = false,
            oldHandler = root.onmessage;
        root.onmessage = function() {
          isAsync = true;
        };
        root.postMessage('', '*');
        root.onmessage = oldHandler;
        return isAsync;
      }
      if (isFunction(setImmediate)) {
        scheduleMethod = function(action) {
          var id = nextHandle++;
          tasksByHandle[id] = action;
          setImmediate(function() {
            runTask(id);
          });
          return id;
        };
      } else if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
        scheduleMethod = function(action) {
          var id = nextHandle++;
          tasksByHandle[id] = action;
          process.nextTick(function() {
            runTask(id);
          });
          return id;
        };
      } else if (postMessageSupported()) {
        var MSG_PREFIX = 'ms.rx.schedule' + Math.random();
        function onGlobalPostMessage(event) {
          if (typeof event.data === 'string' && event.data.substring(0, MSG_PREFIX.length) === MSG_PREFIX) {
            runTask(event.data.substring(MSG_PREFIX.length));
          }
        }
        if (root.addEventListener) {
          root.addEventListener('message', onGlobalPostMessage, false);
        } else {
          root.attachEvent('onmessage', onGlobalPostMessage, false);
        }
        scheduleMethod = function(action) {
          var id = nextHandle++;
          tasksByHandle[id] = action;
          root.postMessage(MSG_PREFIX + currentId, '*');
          return id;
        };
      } else if (!!root.MessageChannel) {
        var channel = new root.MessageChannel();
        channel.port1.onmessage = function(e) {
          runTask(e.data);
        };
        scheduleMethod = function(action) {
          var id = nextHandle++;
          tasksByHandle[id] = action;
          channel.port2.postMessage(id);
          return id;
        };
      } else if ('document' in root && 'onreadystatechange' in root.document.createElement('script')) {
        scheduleMethod = function(action) {
          var scriptElement = root.document.createElement('script');
          var id = nextHandle++;
          tasksByHandle[id] = action;
          scriptElement.onreadystatechange = function() {
            runTask(id);
            scriptElement.onreadystatechange = null;
            scriptElement.parentNode.removeChild(scriptElement);
            scriptElement = null;
          };
          root.document.documentElement.appendChild(scriptElement);
          return id;
        };
      } else {
        scheduleMethod = function(action) {
          var id = nextHandle++;
          tasksByHandle[id] = action;
          localSetTimeout(function() {
            runTask(id);
          }, 0);
          return id;
        };
      }
    }());
    var timeoutScheduler = Scheduler.timeout = Scheduler.default = (function() {
      function scheduleNow(state, action) {
        var scheduler = this,
            disposable = new SingleAssignmentDisposable();
        var id = scheduleMethod(function() {
          if (!disposable.isDisposed) {
            disposable.setDisposable(action(scheduler, state));
          }
        });
        return new CompositeDisposable(disposable, disposableCreate(function() {
          clearMethod(id);
        }));
      }
      function scheduleRelative(state, dueTime, action) {
        var scheduler = this,
            dt = Scheduler.normalize(dueTime);
        if (dt === 0) {
          return scheduler.scheduleWithState(state, action);
        }
        var disposable = new SingleAssignmentDisposable();
        var id = localSetTimeout(function() {
          if (!disposable.isDisposed) {
            disposable.setDisposable(action(scheduler, state));
          }
        }, dt);
        return new CompositeDisposable(disposable, disposableCreate(function() {
          localClearTimeout(id);
        }));
      }
      function scheduleAbsolute(state, dueTime, action) {
        return this.scheduleWithRelativeAndState(state, dueTime - this.now(), action);
      }
      return new Scheduler(defaultNow, scheduleNow, scheduleRelative, scheduleAbsolute);
    })();
    var CatchScheduler = (function(__super__) {
      function scheduleNow(state, action) {
        return this._scheduler.scheduleWithState(state, this._wrap(action));
      }
      function scheduleRelative(state, dueTime, action) {
        return this._scheduler.scheduleWithRelativeAndState(state, dueTime, this._wrap(action));
      }
      function scheduleAbsolute(state, dueTime, action) {
        return this._scheduler.scheduleWithAbsoluteAndState(state, dueTime, this._wrap(action));
      }
      inherits(CatchScheduler, __super__);
      function CatchScheduler(scheduler, handler) {
        this._scheduler = scheduler;
        this._handler = handler;
        this._recursiveOriginal = null;
        this._recursiveWrapper = null;
        __super__.call(this, this._scheduler.now.bind(this._scheduler), scheduleNow, scheduleRelative, scheduleAbsolute);
      }
      CatchScheduler.prototype._clone = function(scheduler) {
        return new CatchScheduler(scheduler, this._handler);
      };
      CatchScheduler.prototype._wrap = function(action) {
        var parent = this;
        return function(self, state) {
          try {
            return action(parent._getRecursiveWrapper(self), state);
          } catch (e) {
            if (!parent._handler(e)) {
              throw e;
            }
            return disposableEmpty;
          }
        };
      };
      CatchScheduler.prototype._getRecursiveWrapper = function(scheduler) {
        if (this._recursiveOriginal !== scheduler) {
          this._recursiveOriginal = scheduler;
          var wrapper = this._clone(scheduler);
          wrapper._recursiveOriginal = scheduler;
          wrapper._recursiveWrapper = wrapper;
          this._recursiveWrapper = wrapper;
        }
        return this._recursiveWrapper;
      };
      CatchScheduler.prototype.schedulePeriodicWithState = function(state, period, action) {
        var self = this,
            failed = false,
            d = new SingleAssignmentDisposable();
        d.setDisposable(this._scheduler.schedulePeriodicWithState(state, period, function(state1) {
          if (failed) {
            return null;
          }
          try {
            return action(state1);
          } catch (e) {
            failed = true;
            if (!self._handler(e)) {
              throw e;
            }
            d.dispose();
            return null;
          }
        }));
        return d;
      };
      return CatchScheduler;
    }(Scheduler));
    var Notification = Rx.Notification = (function() {
      function Notification(kind, value, exception, accept, acceptObservable, toString) {
        this.kind = kind;
        this.value = value;
        this.exception = exception;
        this._accept = accept;
        this._acceptObservable = acceptObservable;
        this.toString = toString;
      }
      Notification.prototype.accept = function(observerOrOnNext, onError, onCompleted) {
        return observerOrOnNext && typeof observerOrOnNext === 'object' ? this._acceptObservable(observerOrOnNext) : this._accept(observerOrOnNext, onError, onCompleted);
      };
      Notification.prototype.toObservable = function(scheduler) {
        var self = this;
        isScheduler(scheduler) || (scheduler = immediateScheduler);
        return new AnonymousObservable(function(observer) {
          return scheduler.scheduleWithState(self, function(_, notification) {
            notification._acceptObservable(observer);
            notification.kind === 'N' && observer.onCompleted();
          });
        });
      };
      return Notification;
    })();
    var notificationCreateOnNext = Notification.createOnNext = (function() {
      function _accept(onNext) {
        return onNext(this.value);
      }
      function _acceptObservable(observer) {
        return observer.onNext(this.value);
      }
      function toString() {
        return 'OnNext(' + this.value + ')';
      }
      return function(value) {
        return new Notification('N', value, null, _accept, _acceptObservable, toString);
      };
    }());
    var notificationCreateOnError = Notification.createOnError = (function() {
      function _accept(onNext, onError) {
        return onError(this.exception);
      }
      function _acceptObservable(observer) {
        return observer.onError(this.exception);
      }
      function toString() {
        return 'OnError(' + this.exception + ')';
      }
      return function(e) {
        return new Notification('E', null, e, _accept, _acceptObservable, toString);
      };
    }());
    var notificationCreateOnCompleted = Notification.createOnCompleted = (function() {
      function _accept(onNext, onError, onCompleted) {
        return onCompleted();
      }
      function _acceptObservable(observer) {
        return observer.onCompleted();
      }
      function toString() {
        return 'OnCompleted()';
      }
      return function() {
        return new Notification('C', null, null, _accept, _acceptObservable, toString);
      };
    }());
    var Enumerator = Rx.internals.Enumerator = function(next) {
      this._next = next;
    };
    Enumerator.prototype.next = function() {
      return this._next();
    };
    Enumerator.prototype[$iterator$] = function() {
      return this;
    };
    var Enumerable = Rx.internals.Enumerable = function(iterator) {
      this._iterator = iterator;
    };
    Enumerable.prototype[$iterator$] = function() {
      return this._iterator();
    };
    Enumerable.prototype.concat = function() {
      var sources = this;
      return new AnonymousObservable(function(o) {
        var e = sources[$iterator$]();
        var isDisposed,
            subscription = new SerialDisposable();
        var cancelable = immediateScheduler.scheduleRecursive(function(self) {
          if (isDisposed) {
            return ;
          }
          try {
            var currentItem = e.next();
          } catch (ex) {
            return o.onError(ex);
          }
          if (currentItem.done) {
            return o.onCompleted();
          }
          var currentValue = currentItem.value;
          isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
          var d = new SingleAssignmentDisposable();
          subscription.setDisposable(d);
          d.setDisposable(currentValue.subscribe(function(x) {
            o.onNext(x);
          }, function(err) {
            o.onError(err);
          }, self));
        });
        return new CompositeDisposable(subscription, cancelable, disposableCreate(function() {
          isDisposed = true;
        }));
      });
    };
    Enumerable.prototype.catchError = function() {
      var sources = this;
      return new AnonymousObservable(function(o) {
        var e = sources[$iterator$]();
        var isDisposed,
            subscription = new SerialDisposable();
        var cancelable = immediateScheduler.scheduleRecursiveWithState(null, function(lastException, self) {
          if (isDisposed) {
            return ;
          }
          try {
            var currentItem = e.next();
          } catch (ex) {
            return observer.onError(ex);
          }
          if (currentItem.done) {
            if (lastException !== null) {
              o.onError(lastException);
            } else {
              o.onCompleted();
            }
            return ;
          }
          var currentValue = currentItem.value;
          isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
          var d = new SingleAssignmentDisposable();
          subscription.setDisposable(d);
          d.setDisposable(currentValue.subscribe(function(x) {
            o.onNext(x);
          }, self, function() {
            o.onCompleted();
          }));
        });
        return new CompositeDisposable(subscription, cancelable, disposableCreate(function() {
          isDisposed = true;
        }));
      });
    };
    Enumerable.prototype.catchErrorWhen = function(notificationHandler) {
      var sources = this;
      return new AnonymousObservable(function(o) {
        var exceptions = new Subject(),
            notifier = new Subject(),
            handled = notificationHandler(exceptions),
            notificationDisposable = handled.subscribe(notifier);
        var e = sources[$iterator$]();
        var isDisposed,
            lastException,
            subscription = new SerialDisposable();
        var cancelable = immediateScheduler.scheduleRecursive(function(self) {
          if (isDisposed) {
            return ;
          }
          try {
            var currentItem = e.next();
          } catch (ex) {
            return o.onError(ex);
          }
          if (currentItem.done) {
            if (lastException) {
              o.onError(lastException);
            } else {
              o.onCompleted();
            }
            return ;
          }
          var currentValue = currentItem.value;
          isPromise(currentValue) && (currentValue = observableFromPromise(currentValue));
          var outer = new SingleAssignmentDisposable();
          var inner = new SingleAssignmentDisposable();
          subscription.setDisposable(new CompositeDisposable(inner, outer));
          outer.setDisposable(currentValue.subscribe(function(x) {
            o.onNext(x);
          }, function(exn) {
            inner.setDisposable(notifier.subscribe(self, function(ex) {
              o.onError(ex);
            }, function() {
              o.onCompleted();
            }));
            exceptions.onNext(exn);
          }, function() {
            o.onCompleted();
          }));
        });
        return new CompositeDisposable(notificationDisposable, subscription, cancelable, disposableCreate(function() {
          isDisposed = true;
        }));
      });
    };
    var enumerableRepeat = Enumerable.repeat = function(value, repeatCount) {
      if (repeatCount == null) {
        repeatCount = -1;
      }
      return new Enumerable(function() {
        var left = repeatCount;
        return new Enumerator(function() {
          if (left === 0) {
            return doneEnumerator;
          }
          if (left > 0) {
            left--;
          }
          return {
            done: false,
            value: value
          };
        });
      });
    };
    var enumerableOf = Enumerable.of = function(source, selector, thisArg) {
      if (selector) {
        var selectorFn = bindCallback(selector, thisArg, 3);
      }
      return new Enumerable(function() {
        var index = -1;
        return new Enumerator(function() {
          return ++index < source.length ? {
            done: false,
            value: !selector ? source[index] : selectorFn(source[index], index, source)
          } : doneEnumerator;
        });
      });
    };
    var Observer = Rx.Observer = function() {};
    Observer.prototype.toNotifier = function() {
      var observer = this;
      return function(n) {
        return n.accept(observer);
      };
    };
    Observer.prototype.asObserver = function() {
      return new AnonymousObserver(this.onNext.bind(this), this.onError.bind(this), this.onCompleted.bind(this));
    };
    Observer.prototype.checked = function() {
      return new CheckedObserver(this);
    };
    var observerCreate = Observer.create = function(onNext, onError, onCompleted) {
      onNext || (onNext = noop);
      onError || (onError = defaultError);
      onCompleted || (onCompleted = noop);
      return new AnonymousObserver(onNext, onError, onCompleted);
    };
    Observer.fromNotifier = function(handler, thisArg) {
      return new AnonymousObserver(function(x) {
        return handler.call(thisArg, notificationCreateOnNext(x));
      }, function(e) {
        return handler.call(thisArg, notificationCreateOnError(e));
      }, function() {
        return handler.call(thisArg, notificationCreateOnCompleted());
      });
    };
    Observer.prototype.notifyOn = function(scheduler) {
      return new ObserveOnObserver(scheduler, this);
    };
    Observer.prototype.makeSafe = function(disposable) {
      return new AnonymousSafeObserver(this._onNext, this._onError, this._onCompleted, disposable);
    };
    var AbstractObserver = Rx.internals.AbstractObserver = (function(__super__) {
      inherits(AbstractObserver, __super__);
      function AbstractObserver() {
        this.isStopped = false;
        __super__.call(this);
      }
      AbstractObserver.prototype.next = notImplemented;
      AbstractObserver.prototype.error = notImplemented;
      AbstractObserver.prototype.completed = notImplemented;
      AbstractObserver.prototype.onNext = function(value) {
        if (!this.isStopped) {
          this.next(value);
        }
      };
      AbstractObserver.prototype.onError = function(error) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.error(error);
        }
      };
      AbstractObserver.prototype.onCompleted = function() {
        if (!this.isStopped) {
          this.isStopped = true;
          this.completed();
        }
      };
      AbstractObserver.prototype.dispose = function() {
        this.isStopped = true;
      };
      AbstractObserver.prototype.fail = function(e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.error(e);
          return true;
        }
        return false;
      };
      return AbstractObserver;
    }(Observer));
    var AnonymousObserver = Rx.AnonymousObserver = (function(__super__) {
      inherits(AnonymousObserver, __super__);
      function AnonymousObserver(onNext, onError, onCompleted) {
        __super__.call(this);
        this._onNext = onNext;
        this._onError = onError;
        this._onCompleted = onCompleted;
      }
      AnonymousObserver.prototype.next = function(value) {
        this._onNext(value);
      };
      AnonymousObserver.prototype.error = function(error) {
        this._onError(error);
      };
      AnonymousObserver.prototype.completed = function() {
        this._onCompleted();
      };
      return AnonymousObserver;
    }(AbstractObserver));
    var CheckedObserver = (function(__super__) {
      inherits(CheckedObserver, __super__);
      function CheckedObserver(observer) {
        __super__.call(this);
        this._observer = observer;
        this._state = 0;
      }
      var CheckedObserverPrototype = CheckedObserver.prototype;
      CheckedObserverPrototype.onNext = function(value) {
        this.checkAccess();
        var res = tryCatch(this._observer.onNext).call(this._observer, value);
        this._state = 0;
        res === errorObj && thrower(res.e);
      };
      CheckedObserverPrototype.onError = function(err) {
        this.checkAccess();
        var res = tryCatch(this._observer.onError).call(this._observer, err);
        this._state = 2;
        res === errorObj && thrower(res.e);
      };
      CheckedObserverPrototype.onCompleted = function() {
        this.checkAccess();
        var res = tryCatch(this._observer.onCompleted).call(this._observer);
        this._state = 2;
        res === errorObj && thrower(res.e);
      };
      CheckedObserverPrototype.checkAccess = function() {
        if (this._state === 1) {
          throw new Error('Re-entrancy detected');
        }
        if (this._state === 2) {
          throw new Error('Observer completed');
        }
        if (this._state === 0) {
          this._state = 1;
        }
      };
      return CheckedObserver;
    }(Observer));
    var ScheduledObserver = Rx.internals.ScheduledObserver = (function(__super__) {
      inherits(ScheduledObserver, __super__);
      function ScheduledObserver(scheduler, observer) {
        __super__.call(this);
        this.scheduler = scheduler;
        this.observer = observer;
        this.isAcquired = false;
        this.hasFaulted = false;
        this.queue = [];
        this.disposable = new SerialDisposable();
      }
      ScheduledObserver.prototype.next = function(value) {
        var self = this;
        this.queue.push(function() {
          self.observer.onNext(value);
        });
      };
      ScheduledObserver.prototype.error = function(e) {
        var self = this;
        this.queue.push(function() {
          self.observer.onError(e);
        });
      };
      ScheduledObserver.prototype.completed = function() {
        var self = this;
        this.queue.push(function() {
          self.observer.onCompleted();
        });
      };
      ScheduledObserver.prototype.ensureActive = function() {
        var isOwner = false,
            parent = this;
        if (!this.hasFaulted && this.queue.length > 0) {
          isOwner = !this.isAcquired;
          this.isAcquired = true;
        }
        if (isOwner) {
          this.disposable.setDisposable(this.scheduler.scheduleRecursive(function(self) {
            var work;
            if (parent.queue.length > 0) {
              work = parent.queue.shift();
            } else {
              parent.isAcquired = false;
              return ;
            }
            try {
              work();
            } catch (ex) {
              parent.queue = [];
              parent.hasFaulted = true;
              throw ex;
            }
            self();
          }));
        }
      };
      ScheduledObserver.prototype.dispose = function() {
        __super__.prototype.dispose.call(this);
        this.disposable.dispose();
      };
      return ScheduledObserver;
    }(AbstractObserver));
    var ObserveOnObserver = (function(__super__) {
      inherits(ObserveOnObserver, __super__);
      function ObserveOnObserver(scheduler, observer, cancel) {
        __super__.call(this, scheduler, observer);
        this._cancel = cancel;
      }
      ObserveOnObserver.prototype.next = function(value) {
        __super__.prototype.next.call(this, value);
        this.ensureActive();
      };
      ObserveOnObserver.prototype.error = function(e) {
        __super__.prototype.error.call(this, e);
        this.ensureActive();
      };
      ObserveOnObserver.prototype.completed = function() {
        __super__.prototype.completed.call(this);
        this.ensureActive();
      };
      ObserveOnObserver.prototype.dispose = function() {
        __super__.prototype.dispose.call(this);
        this._cancel && this._cancel.dispose();
        this._cancel = null;
      };
      return ObserveOnObserver;
    })(ScheduledObserver);
    var observableProto;
    var Observable = Rx.Observable = (function() {
      function Observable(subscribe) {
        if (Rx.config.longStackSupport && hasStacks) {
          try {
            throw new Error();
          } catch (e) {
            this.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
          }
          var self = this;
          this._subscribe = function(observer) {
            var oldOnError = observer.onError.bind(observer);
            observer.onError = function(err) {
              makeStackTraceLong(err, self);
              oldOnError(err);
            };
            return subscribe.call(self, observer);
          };
        } else {
          this._subscribe = subscribe;
        }
      }
      observableProto = Observable.prototype;
      observableProto.subscribe = observableProto.forEach = function(observerOrOnNext, onError, onCompleted) {
        return this._subscribe(typeof observerOrOnNext === 'object' ? observerOrOnNext : observerCreate(observerOrOnNext, onError, onCompleted));
      };
      observableProto.subscribeOnNext = function(onNext, thisArg) {
        return this._subscribe(observerCreate(typeof thisArg !== 'undefined' ? function(x) {
          onNext.call(thisArg, x);
        } : onNext));
      };
      observableProto.subscribeOnError = function(onError, thisArg) {
        return this._subscribe(observerCreate(null, typeof thisArg !== 'undefined' ? function(e) {
          onError.call(thisArg, e);
        } : onError));
      };
      observableProto.subscribeOnCompleted = function(onCompleted, thisArg) {
        return this._subscribe(observerCreate(null, null, typeof thisArg !== 'undefined' ? function() {
          onCompleted.call(thisArg);
        } : onCompleted));
      };
      return Observable;
    })();
    var ObservableBase = Rx.ObservableBase = (function(__super__) {
      inherits(ObservableBase, __super__);
      function fixSubscriber(subscriber) {
        return subscriber && isFunction(subscriber.dispose) ? subscriber : isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
      }
      function setDisposable(s, state) {
        var ado = state[0],
            self = state[1];
        var sub = tryCatch(self.subscribeCore).call(self, ado);
        if (sub === errorObj) {
          if (!ado.fail(errorObj.e)) {
            return thrower(errorObj.e);
          }
        }
        ado.setDisposable(fixSubscriber(sub));
      }
      function subscribe(observer) {
        var ado = new AutoDetachObserver(observer),
            state = [ado, this];
        if (currentThreadScheduler.scheduleRequired()) {
          currentThreadScheduler.scheduleWithState(state, setDisposable);
        } else {
          setDisposable(null, state);
        }
        return ado;
      }
      function ObservableBase() {
        __super__.call(this, subscribe);
      }
      ObservableBase.prototype.subscribeCore = notImplemented;
      return ObservableBase;
    }(Observable));
    observableProto.observeOn = function(scheduler) {
      var source = this;
      return new AnonymousObservable(function(observer) {
        return source.subscribe(new ObserveOnObserver(scheduler, observer));
      }, source);
    };
    observableProto.subscribeOn = function(scheduler) {
      var source = this;
      return new AnonymousObservable(function(observer) {
        var m = new SingleAssignmentDisposable(),
            d = new SerialDisposable();
        d.setDisposable(m);
        m.setDisposable(scheduler.schedule(function() {
          d.setDisposable(new ScheduledDisposable(scheduler, source.subscribe(observer)));
        }));
        return d;
      }, source);
    };
    var observableFromPromise = Observable.fromPromise = function(promise) {
      return observableDefer(function() {
        var subject = new Rx.AsyncSubject();
        promise.then(function(value) {
          subject.onNext(value);
          subject.onCompleted();
        }, subject.onError.bind(subject));
        return subject;
      });
    };
    observableProto.toPromise = function(promiseCtor) {
      promiseCtor || (promiseCtor = Rx.config.Promise);
      if (!promiseCtor) {
        throw new NotSupportedError('Promise type not provided nor in Rx.config.Promise');
      }
      var source = this;
      return new promiseCtor(function(resolve, reject) {
        var value,
            hasValue = false;
        source.subscribe(function(v) {
          value = v;
          hasValue = true;
        }, reject, function() {
          hasValue && resolve(value);
        });
      });
    };
    var ToArrayObservable = (function(__super__) {
      inherits(ToArrayObservable, __super__);
      function ToArrayObservable(source) {
        this.source = source;
        __super__.call(this);
      }
      ToArrayObservable.prototype.subscribeCore = function(observer) {
        return this.source.subscribe(new ToArrayObserver(observer));
      };
      return ToArrayObservable;
    }(ObservableBase));
    function ToArrayObserver(observer) {
      this.observer = observer;
      this.a = [];
      this.isStopped = false;
    }
    ToArrayObserver.prototype.onNext = function(x) {
      if (!this.isStopped) {
        this.a.push(x);
      }
    };
    ToArrayObserver.prototype.onError = function(e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onError(e);
      }
    };
    ToArrayObserver.prototype.onCompleted = function() {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onNext(this.a);
        this.observer.onCompleted();
      }
    };
    ToArrayObserver.prototype.dispose = function() {
      this.isStopped = true;
    };
    ToArrayObserver.prototype.fail = function(e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onError(e);
        return true;
      }
      return false;
    };
    observableProto.toArray = function() {
      return new ToArrayObservable(this);
    };
    Observable.create = Observable.createWithDisposable = function(subscribe, parent) {
      return new AnonymousObservable(subscribe, parent);
    };
    var observableDefer = Observable.defer = function(observableFactory) {
      return new AnonymousObservable(function(observer) {
        var result;
        try {
          result = observableFactory();
        } catch (e) {
          return observableThrow(e).subscribe(observer);
        }
        isPromise(result) && (result = observableFromPromise(result));
        return result.subscribe(observer);
      });
    };
    var observableEmpty = Observable.empty = function(scheduler) {
      isScheduler(scheduler) || (scheduler = immediateScheduler);
      return new AnonymousObservable(function(observer) {
        return scheduler.scheduleWithState(null, function() {
          observer.onCompleted();
        });
      });
    };
    var FromObservable = (function(__super__) {
      inherits(FromObservable, __super__);
      function FromObservable(iterable, mapper, scheduler) {
        this.iterable = iterable;
        this.mapper = mapper;
        this.scheduler = scheduler;
        __super__.call(this);
      }
      FromObservable.prototype.subscribeCore = function(observer) {
        var sink = new FromSink(observer, this);
        return sink.run();
      };
      return FromObservable;
    }(ObservableBase));
    var FromSink = (function() {
      function FromSink(observer, parent) {
        this.observer = observer;
        this.parent = parent;
      }
      FromSink.prototype.run = function() {
        var list = Object(this.parent.iterable),
            it = getIterable(list),
            observer = this.observer,
            mapper = this.parent.mapper;
        function loopRecursive(i, recurse) {
          try {
            var next = it.next();
          } catch (e) {
            return observer.onError(e);
          }
          if (next.done) {
            return observer.onCompleted();
          }
          var result = next.value;
          if (mapper) {
            try {
              result = mapper(result, i);
            } catch (e) {
              return observer.onError(e);
            }
          }
          observer.onNext(result);
          recurse(i + 1);
        }
        return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
      };
      return FromSink;
    }());
    var maxSafeInteger = Math.pow(2, 53) - 1;
    function StringIterable(str) {
      this._s = s;
    }
    StringIterable.prototype[$iterator$] = function() {
      return new StringIterator(this._s);
    };
    function StringIterator(str) {
      this._s = s;
      this._l = s.length;
      this._i = 0;
    }
    StringIterator.prototype[$iterator$] = function() {
      return this;
    };
    StringIterator.prototype.next = function() {
      return this._i < this._l ? {
        done: false,
        value: this._s.charAt(this._i++)
      } : doneEnumerator;
    };
    function ArrayIterable(a) {
      this._a = a;
    }
    ArrayIterable.prototype[$iterator$] = function() {
      return new ArrayIterator(this._a);
    };
    function ArrayIterator(a) {
      this._a = a;
      this._l = toLength(a);
      this._i = 0;
    }
    ArrayIterator.prototype[$iterator$] = function() {
      return this;
    };
    ArrayIterator.prototype.next = function() {
      return this._i < this._l ? {
        done: false,
        value: this._a[this._i++]
      } : doneEnumerator;
    };
    function numberIsFinite(value) {
      return typeof value === 'number' && root.isFinite(value);
    }
    function isNan(n) {
      return n !== n;
    }
    function getIterable(o) {
      var i = o[$iterator$],
          it;
      if (!i && typeof o === 'string') {
        it = new StringIterable(o);
        return it[$iterator$]();
      }
      if (!i && o.length !== undefined) {
        it = new ArrayIterable(o);
        return it[$iterator$]();
      }
      if (!i) {
        throw new TypeError('Object is not iterable');
      }
      return o[$iterator$]();
    }
    function sign(value) {
      var number = +value;
      if (number === 0) {
        return number;
      }
      if (isNaN(number)) {
        return number;
      }
      return number < 0 ? -1 : 1;
    }
    function toLength(o) {
      var len = +o.length;
      if (isNaN(len)) {
        return 0;
      }
      if (len === 0 || !numberIsFinite(len)) {
        return len;
      }
      len = sign(len) * Math.floor(Math.abs(len));
      if (len <= 0) {
        return 0;
      }
      if (len > maxSafeInteger) {
        return maxSafeInteger;
      }
      return len;
    }
    var observableFrom = Observable.from = function(iterable, mapFn, thisArg, scheduler) {
      if (iterable == null) {
        throw new Error('iterable cannot be null.');
      }
      if (mapFn && !isFunction(mapFn)) {
        throw new Error('mapFn when provided must be a function');
      }
      if (mapFn) {
        var mapper = bindCallback(mapFn, thisArg, 2);
      }
      isScheduler(scheduler) || (scheduler = currentThreadScheduler);
      return new FromObservable(iterable, mapper, scheduler);
    };
    var FromArrayObservable = (function(__super__) {
      inherits(FromArrayObservable, __super__);
      function FromArrayObservable(args, scheduler) {
        this.args = args;
        this.scheduler = scheduler;
        __super__.call(this);
      }
      FromArrayObservable.prototype.subscribeCore = function(observer) {
        var sink = new FromArraySink(observer, this);
        return sink.run();
      };
      return FromArrayObservable;
    }(ObservableBase));
    function FromArraySink(observer, parent) {
      this.observer = observer;
      this.parent = parent;
    }
    FromArraySink.prototype.run = function() {
      var observer = this.observer,
          args = this.parent.args,
          len = args.length;
      function loopRecursive(i, recurse) {
        if (i < len) {
          observer.onNext(args[i]);
          recurse(i + 1);
        } else {
          observer.onCompleted();
        }
      }
      return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
    };
    var observableFromArray = Observable.fromArray = function(array, scheduler) {
      isScheduler(scheduler) || (scheduler = currentThreadScheduler);
      return new FromArrayObservable(array, scheduler);
    };
    Observable.generate = function(initialState, condition, iterate, resultSelector, scheduler) {
      isScheduler(scheduler) || (scheduler = currentThreadScheduler);
      return new AnonymousObservable(function(o) {
        var first = true;
        return scheduler.scheduleRecursiveWithState(initialState, function(state, self) {
          var hasResult,
              result;
          try {
            if (first) {
              first = false;
            } else {
              state = iterate(state);
            }
            hasResult = condition(state);
            hasResult && (result = resultSelector(state));
          } catch (e) {
            return o.onError(e);
          }
          if (hasResult) {
            o.onNext(result);
            self(state);
          } else {
            o.onCompleted();
          }
        });
      });
    };
    var observableNever = Observable.never = function() {
      return new AnonymousObservable(function() {
        return disposableEmpty;
      });
    };
    function observableOf(scheduler, array) {
      isScheduler(scheduler) || (scheduler = currentThreadScheduler);
      return new FromArrayObservable(array, scheduler);
    }
    Observable.of = function() {
      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      return new FromArrayObservable(args, currentThreadScheduler);
    };
    Observable.ofWithScheduler = function(scheduler) {
      var len = arguments.length,
          args = new Array(len - 1);
      for (var i = 1; i < len; i++) {
        args[i - 1] = arguments[i];
      }
      return new FromArrayObservable(args, scheduler);
    };
    Observable.pairs = function(obj, scheduler) {
      scheduler || (scheduler = Rx.Scheduler.currentThread);
      return new AnonymousObservable(function(observer) {
        var keys = Object.keys(obj),
            len = keys.length;
        return scheduler.scheduleRecursiveWithState(0, function(idx, self) {
          if (idx < len) {
            var key = keys[idx];
            observer.onNext([key, obj[key]]);
            self(idx + 1);
          } else {
            observer.onCompleted();
          }
        });
      });
    };
    var RangeObservable = (function(__super__) {
      inherits(RangeObservable, __super__);
      function RangeObservable(start, count, scheduler) {
        this.start = start;
        this.count = count;
        this.scheduler = scheduler;
        __super__.call(this);
      }
      RangeObservable.prototype.subscribeCore = function(observer) {
        var sink = new RangeSink(observer, this);
        return sink.run();
      };
      return RangeObservable;
    }(ObservableBase));
    var RangeSink = (function() {
      function RangeSink(observer, parent) {
        this.observer = observer;
        this.parent = parent;
      }
      RangeSink.prototype.run = function() {
        var start = this.parent.start,
            count = this.parent.count,
            observer = this.observer;
        function loopRecursive(i, recurse) {
          if (i < count) {
            observer.onNext(start + i);
            recurse(i + 1);
          } else {
            observer.onCompleted();
          }
        }
        return this.parent.scheduler.scheduleRecursiveWithState(0, loopRecursive);
      };
      return RangeSink;
    }());
    Observable.range = function(start, count, scheduler) {
      isScheduler(scheduler) || (scheduler = currentThreadScheduler);
      return new RangeObservable(start, count, scheduler);
    };
    Observable.repeat = function(value, repeatCount, scheduler) {
      isScheduler(scheduler) || (scheduler = currentThreadScheduler);
      return observableReturn(value, scheduler).repeat(repeatCount == null ? -1 : repeatCount);
    };
    var observableReturn = Observable['return'] = Observable.just = Observable.returnValue = function(value, scheduler) {
      isScheduler(scheduler) || (scheduler = immediateScheduler);
      return new AnonymousObservable(function(o) {
        return scheduler.scheduleWithState(value, function(_, v) {
          o.onNext(v);
          o.onCompleted();
        });
      });
    };
    var observableThrow = Observable['throw'] = Observable.throwError = function(error, scheduler) {
      isScheduler(scheduler) || (scheduler = immediateScheduler);
      return new AnonymousObservable(function(observer) {
        return scheduler.schedule(function() {
          observer.onError(error);
        });
      });
    };
    Observable.throwException = function() {
      return Observable.throwError.apply(null, arguments);
    };
    Observable.using = function(resourceFactory, observableFactory) {
      return new AnonymousObservable(function(observer) {
        var disposable = disposableEmpty,
            resource,
            source;
        try {
          resource = resourceFactory();
          resource && (disposable = resource);
          source = observableFactory(resource);
        } catch (exception) {
          return new CompositeDisposable(observableThrow(exception).subscribe(observer), disposable);
        }
        return new CompositeDisposable(source.subscribe(observer), disposable);
      });
    };
    observableProto.amb = function(rightSource) {
      var leftSource = this;
      return new AnonymousObservable(function(observer) {
        var choice,
            leftChoice = 'L',
            rightChoice = 'R',
            leftSubscription = new SingleAssignmentDisposable(),
            rightSubscription = new SingleAssignmentDisposable();
        isPromise(rightSource) && (rightSource = observableFromPromise(rightSource));
        function choiceL() {
          if (!choice) {
            choice = leftChoice;
            rightSubscription.dispose();
          }
        }
        function choiceR() {
          if (!choice) {
            choice = rightChoice;
            leftSubscription.dispose();
          }
        }
        leftSubscription.setDisposable(leftSource.subscribe(function(left) {
          choiceL();
          if (choice === leftChoice) {
            observer.onNext(left);
          }
        }, function(err) {
          choiceL();
          if (choice === leftChoice) {
            observer.onError(err);
          }
        }, function() {
          choiceL();
          if (choice === leftChoice) {
            observer.onCompleted();
          }
        }));
        rightSubscription.setDisposable(rightSource.subscribe(function(right) {
          choiceR();
          if (choice === rightChoice) {
            observer.onNext(right);
          }
        }, function(err) {
          choiceR();
          if (choice === rightChoice) {
            observer.onError(err);
          }
        }, function() {
          choiceR();
          if (choice === rightChoice) {
            observer.onCompleted();
          }
        }));
        return new CompositeDisposable(leftSubscription, rightSubscription);
      });
    };
    Observable.amb = function() {
      var acc = observableNever(),
          items = [];
      if (Array.isArray(arguments[0])) {
        items = arguments[0];
      } else {
        for (var i = 0,
            len = arguments.length; i < len; i++) {
          items.push(arguments[i]);
        }
      }
      function func(previous, current) {
        return previous.amb(current);
      }
      for (var i = 0,
          len = items.length; i < len; i++) {
        acc = func(acc, items[i]);
      }
      return acc;
    };
    function observableCatchHandler(source, handler) {
      return new AnonymousObservable(function(o) {
        var d1 = new SingleAssignmentDisposable(),
            subscription = new SerialDisposable();
        subscription.setDisposable(d1);
        d1.setDisposable(source.subscribe(function(x) {
          o.onNext(x);
        }, function(e) {
          try {
            var result = handler(e);
          } catch (ex) {
            return o.onError(ex);
          }
          isPromise(result) && (result = observableFromPromise(result));
          var d = new SingleAssignmentDisposable();
          subscription.setDisposable(d);
          d.setDisposable(result.subscribe(o));
        }, function(x) {
          o.onCompleted(x);
        }));
        return subscription;
      }, source);
    }
    observableProto['catch'] = observableProto.catchError = observableProto.catchException = function(handlerOrSecond) {
      return typeof handlerOrSecond === 'function' ? observableCatchHandler(this, handlerOrSecond) : observableCatch([this, handlerOrSecond]);
    };
    var observableCatch = Observable.catchError = Observable['catch'] = Observable.catchException = function() {
      var items = [];
      if (Array.isArray(arguments[0])) {
        items = arguments[0];
      } else {
        for (var i = 0,
            len = arguments.length; i < len; i++) {
          items.push(arguments[i]);
        }
      }
      return enumerableOf(items).catchError();
    };
    observableProto.combineLatest = function() {
      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      if (Array.isArray(args[0])) {
        args[0].unshift(this);
      } else {
        args.unshift(this);
      }
      return combineLatest.apply(this, args);
    };
    var combineLatest = Observable.combineLatest = function() {
      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      var resultSelector = args.pop();
      Array.isArray(args[0]) && (args = args[0]);
      return new AnonymousObservable(function(o) {
        var n = args.length,
            falseFactory = function() {
              return false;
            },
            hasValue = arrayInitialize(n, falseFactory),
            hasValueAll = false,
            isDone = arrayInitialize(n, falseFactory),
            values = new Array(n);
        function next(i) {
          hasValue[i] = true;
          if (hasValueAll || (hasValueAll = hasValue.every(identity))) {
            try {
              var res = resultSelector.apply(null, values);
            } catch (e) {
              return o.onError(e);
            }
            o.onNext(res);
          } else if (isDone.filter(function(x, j) {
            return j !== i;
          }).every(identity)) {
            o.onCompleted();
          }
        }
        function done(i) {
          isDone[i] = true;
          isDone.every(identity) && o.onCompleted();
        }
        var subscriptions = new Array(n);
        for (var idx = 0; idx < n; idx++) {
          (function(i) {
            var source = args[i],
                sad = new SingleAssignmentDisposable();
            isPromise(source) && (source = observableFromPromise(source));
            sad.setDisposable(source.subscribe(function(x) {
              values[i] = x;
              next(i);
            }, function(e) {
              o.onError(e);
            }, function() {
              done(i);
            }));
            subscriptions[i] = sad;
          }(idx));
        }
        return new CompositeDisposable(subscriptions);
      }, this);
    };
    observableProto.concat = function() {
      for (var args = [],
          i = 0,
          len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
      }
      args.unshift(this);
      return observableConcat.apply(null, args);
    };
    var observableConcat = Observable.concat = function() {
      var args;
      if (Array.isArray(arguments[0])) {
        args = arguments[0];
      } else {
        args = new Array(arguments.length);
        for (var i = 0,
            len = arguments.length; i < len; i++) {
          args[i] = arguments[i];
        }
      }
      return enumerableOf(args).concat();
    };
    observableProto.concatAll = observableProto.concatObservable = function() {
      return this.merge(1);
    };
    var MergeObservable = (function(__super__) {
      inherits(MergeObservable, __super__);
      function MergeObservable(source, maxConcurrent) {
        this.source = source;
        this.maxConcurrent = maxConcurrent;
        __super__.call(this);
      }
      MergeObservable.prototype.subscribeCore = function(observer) {
        var g = new CompositeDisposable();
        g.add(this.source.subscribe(new MergeObserver(observer, this.maxConcurrent, g)));
        return g;
      };
      return MergeObservable;
    }(ObservableBase));
    var MergeObserver = (function() {
      function MergeObserver(o, max, g) {
        this.o = o;
        this.max = max;
        this.g = g;
        this.done = false;
        this.q = [];
        this.activeCount = 0;
        this.isStopped = false;
      }
      MergeObserver.prototype.handleSubscribe = function(xs) {
        var sad = new SingleAssignmentDisposable();
        this.g.add(sad);
        isPromise(xs) && (xs = observableFromPromise(xs));
        sad.setDisposable(xs.subscribe(new InnerObserver(this, sad)));
      };
      MergeObserver.prototype.onNext = function(innerSource) {
        if (this.isStopped) {
          return ;
        }
        if (this.activeCount < this.max) {
          this.activeCount++;
          this.handleSubscribe(innerSource);
        } else {
          this.q.push(innerSource);
        }
      };
      MergeObserver.prototype.onError = function(e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.o.onError(e);
        }
      };
      MergeObserver.prototype.onCompleted = function() {
        if (!this.isStopped) {
          this.isStopped = true;
          this.done = true;
          this.activeCount === 0 && this.o.onCompleted();
        }
      };
      MergeObserver.prototype.dispose = function() {
        this.isStopped = true;
      };
      MergeObserver.prototype.fail = function(e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.o.onError(e);
          return true;
        }
        return false;
      };
      function InnerObserver(parent, sad) {
        this.parent = parent;
        this.sad = sad;
        this.isStopped = false;
      }
      InnerObserver.prototype.onNext = function(x) {
        if (!this.isStopped) {
          this.parent.o.onNext(x);
        }
      };
      InnerObserver.prototype.onError = function(e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.parent.o.onError(e);
        }
      };
      InnerObserver.prototype.onCompleted = function() {
        if (!this.isStopped) {
          this.isStopped = true;
          var parent = this.parent;
          parent.g.remove(this.sad);
          if (parent.q.length > 0) {
            parent.handleSubscribe(parent.q.shift());
          } else {
            parent.activeCount--;
            parent.done && parent.activeCount === 0 && parent.o.onCompleted();
          }
        }
      };
      InnerObserver.prototype.dispose = function() {
        this.isStopped = true;
      };
      InnerObserver.prototype.fail = function(e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.parent.o.onError(e);
          return true;
        }
        return false;
      };
      return MergeObserver;
    }());
    observableProto.merge = function(maxConcurrentOrOther) {
      return typeof maxConcurrentOrOther !== 'number' ? observableMerge(this, maxConcurrentOrOther) : new MergeObservable(this, maxConcurrentOrOther);
    };
    var observableMerge = Observable.merge = function() {
      var scheduler,
          sources = [],
          i,
          len = arguments.length;
      if (!arguments[0]) {
        scheduler = immediateScheduler;
        for (i = 1; i < len; i++) {
          sources.push(arguments[i]);
        }
      } else if (isScheduler(arguments[0])) {
        scheduler = arguments[0];
        for (i = 1; i < len; i++) {
          sources.push(arguments[i]);
        }
      } else {
        scheduler = immediateScheduler;
        for (i = 0; i < len; i++) {
          sources.push(arguments[i]);
        }
      }
      if (Array.isArray(sources[0])) {
        sources = sources[0];
      }
      return observableOf(scheduler, sources).mergeAll();
    };
    var CompositeError = Rx.CompositeError = function(errors) {
      this.name = "NotImplementedError";
      this.innerErrors = errors;
      this.message = 'This contains multiple errors. Check the innerErrors';
      Error.call(this);
    };
    CompositeError.prototype = Error.prototype;
    Observable.mergeDelayError = function() {
      var args;
      if (Array.isArray(arguments[0])) {
        args = arguments[0];
      } else {
        var len = arguments.length;
        args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
      }
      var source = observableOf(null, args);
      return new AnonymousObservable(function(o) {
        var group = new CompositeDisposable(),
            m = new SingleAssignmentDisposable(),
            isStopped = false,
            errors = [];
        function setCompletion() {
          if (errors.length === 0) {
            o.onCompleted();
          } else if (errors.length === 1) {
            o.onError(errors[0]);
          } else {
            o.onError(new CompositeError(errors));
          }
        }
        group.add(m);
        m.setDisposable(source.subscribe(function(innerSource) {
          var innerSubscription = new SingleAssignmentDisposable();
          group.add(innerSubscription);
          isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
          innerSubscription.setDisposable(innerSource.subscribe(function(x) {
            o.onNext(x);
          }, function(e) {
            errors.push(e);
            group.remove(innerSubscription);
            isStopped && group.length === 1 && setCompletion();
          }, function() {
            group.remove(innerSubscription);
            isStopped && group.length === 1 && setCompletion();
          }));
        }, function(e) {
          errors.push(e);
          isStopped = true;
          group.length === 1 && setCompletion();
        }, function() {
          isStopped = true;
          group.length === 1 && setCompletion();
        }));
        return group;
      });
    };
    var MergeAllObservable = (function(__super__) {
      inherits(MergeAllObservable, __super__);
      function MergeAllObservable(source) {
        this.source = source;
        __super__.call(this);
      }
      MergeAllObservable.prototype.subscribeCore = function(observer) {
        var g = new CompositeDisposable(),
            m = new SingleAssignmentDisposable();
        g.add(m);
        m.setDisposable(this.source.subscribe(new MergeAllObserver(observer, g)));
        return g;
      };
      return MergeAllObservable;
    }(ObservableBase));
    var MergeAllObserver = (function() {
      function MergeAllObserver(o, g) {
        this.o = o;
        this.g = g;
        this.isStopped = false;
        this.done = false;
      }
      MergeAllObserver.prototype.onNext = function(innerSource) {
        if (this.isStopped) {
          return ;
        }
        var sad = new SingleAssignmentDisposable();
        this.g.add(sad);
        isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
        sad.setDisposable(innerSource.subscribe(new InnerObserver(this, this.g, sad)));
      };
      MergeAllObserver.prototype.onError = function(e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.o.onError(e);
        }
      };
      MergeAllObserver.prototype.onCompleted = function() {
        if (!this.isStopped) {
          this.isStopped = true;
          this.done = true;
          this.g.length === 1 && this.o.onCompleted();
        }
      };
      MergeAllObserver.prototype.dispose = function() {
        this.isStopped = true;
      };
      MergeAllObserver.prototype.fail = function(e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.o.onError(e);
          return true;
        }
        return false;
      };
      function InnerObserver(parent, g, sad) {
        this.parent = parent;
        this.g = g;
        this.sad = sad;
        this.isStopped = false;
      }
      InnerObserver.prototype.onNext = function(x) {
        if (!this.isStopped) {
          this.parent.o.onNext(x);
        }
      };
      InnerObserver.prototype.onError = function(e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.parent.o.onError(e);
        }
      };
      InnerObserver.prototype.onCompleted = function() {
        if (!this.isStopped) {
          var parent = this.parent;
          this.isStopped = true;
          parent.g.remove(this.sad);
          parent.done && parent.g.length === 1 && parent.o.onCompleted();
        }
      };
      InnerObserver.prototype.dispose = function() {
        this.isStopped = true;
      };
      InnerObserver.prototype.fail = function(e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.parent.o.onError(e);
          return true;
        }
        return false;
      };
      return MergeAllObserver;
    }());
    observableProto.mergeAll = observableProto.mergeObservable = function() {
      return new MergeAllObservable(this);
    };
    observableProto.onErrorResumeNext = function(second) {
      if (!second) {
        throw new Error('Second observable is required');
      }
      return onErrorResumeNext([this, second]);
    };
    var onErrorResumeNext = Observable.onErrorResumeNext = function() {
      var sources = [];
      if (Array.isArray(arguments[0])) {
        sources = arguments[0];
      } else {
        for (var i = 0,
            len = arguments.length; i < len; i++) {
          sources.push(arguments[i]);
        }
      }
      return new AnonymousObservable(function(observer) {
        var pos = 0,
            subscription = new SerialDisposable(),
            cancelable = immediateScheduler.scheduleRecursive(function(self) {
              var current,
                  d;
              if (pos < sources.length) {
                current = sources[pos++];
                isPromise(current) && (current = observableFromPromise(current));
                d = new SingleAssignmentDisposable();
                subscription.setDisposable(d);
                d.setDisposable(current.subscribe(observer.onNext.bind(observer), self, self));
              } else {
                observer.onCompleted();
              }
            });
        return new CompositeDisposable(subscription, cancelable);
      });
    };
    observableProto.skipUntil = function(other) {
      var source = this;
      return new AnonymousObservable(function(o) {
        var isOpen = false;
        var disposables = new CompositeDisposable(source.subscribe(function(left) {
          isOpen && o.onNext(left);
        }, function(e) {
          o.onError(e);
        }, function() {
          isOpen && o.onCompleted();
        }));
        isPromise(other) && (other = observableFromPromise(other));
        var rightSubscription = new SingleAssignmentDisposable();
        disposables.add(rightSubscription);
        rightSubscription.setDisposable(other.subscribe(function() {
          isOpen = true;
          rightSubscription.dispose();
        }, function(e) {
          o.onError(e);
        }, function() {
          rightSubscription.dispose();
        }));
        return disposables;
      }, source);
    };
    observableProto['switch'] = observableProto.switchLatest = function() {
      var sources = this;
      return new AnonymousObservable(function(observer) {
        var hasLatest = false,
            innerSubscription = new SerialDisposable(),
            isStopped = false,
            latest = 0,
            subscription = sources.subscribe(function(innerSource) {
              var d = new SingleAssignmentDisposable(),
                  id = ++latest;
              hasLatest = true;
              innerSubscription.setDisposable(d);
              isPromise(innerSource) && (innerSource = observableFromPromise(innerSource));
              d.setDisposable(innerSource.subscribe(function(x) {
                latest === id && observer.onNext(x);
              }, function(e) {
                latest === id && observer.onError(e);
              }, function() {
                if (latest === id) {
                  hasLatest = false;
                  isStopped && observer.onCompleted();
                }
              }));
            }, function(e) {
              observer.onError(e);
            }, function() {
              isStopped = true;
              !hasLatest && observer.onCompleted();
            });
        return new CompositeDisposable(subscription, innerSubscription);
      }, sources);
    };
    observableProto.takeUntil = function(other) {
      var source = this;
      return new AnonymousObservable(function(o) {
        isPromise(other) && (other = observableFromPromise(other));
        return new CompositeDisposable(source.subscribe(o), other.subscribe(function() {
          o.onCompleted();
        }, function(e) {
          o.onError(e);
        }, noop));
      }, source);
    };
    observableProto.withLatestFrom = function() {
      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      var resultSelector = args.pop(),
          source = this;
      if (typeof source === 'undefined') {
        throw new Error('Source observable not found for withLatestFrom().');
      }
      if (typeof resultSelector !== 'function') {
        throw new Error('withLatestFrom() expects a resultSelector function.');
      }
      if (Array.isArray(args[0])) {
        args = args[0];
      }
      return new AnonymousObservable(function(observer) {
        var falseFactory = function() {
          return false;
        },
            n = args.length,
            hasValue = arrayInitialize(n, falseFactory),
            hasValueAll = false,
            values = new Array(n);
        var subscriptions = new Array(n + 1);
        for (var idx = 0; idx < n; idx++) {
          (function(i) {
            var other = args[i],
                sad = new SingleAssignmentDisposable();
            isPromise(other) && (other = observableFromPromise(other));
            sad.setDisposable(other.subscribe(function(x) {
              values[i] = x;
              hasValue[i] = true;
              hasValueAll = hasValue.every(identity);
            }, observer.onError.bind(observer), function() {}));
            subscriptions[i] = sad;
          }(idx));
        }
        var sad = new SingleAssignmentDisposable();
        sad.setDisposable(source.subscribe(function(x) {
          var res;
          var allValues = [x].concat(values);
          if (!hasValueAll)
            return ;
          try {
            res = resultSelector.apply(null, allValues);
          } catch (ex) {
            observer.onError(ex);
            return ;
          }
          observer.onNext(res);
        }, observer.onError.bind(observer), function() {
          observer.onCompleted();
        }));
        subscriptions[n] = sad;
        return new CompositeDisposable(subscriptions);
      }, this);
    };
    function zipArray(second, resultSelector) {
      var first = this;
      return new AnonymousObservable(function(observer) {
        var index = 0,
            len = second.length;
        return first.subscribe(function(left) {
          if (index < len) {
            var right = second[index++],
                result;
            try {
              result = resultSelector(left, right);
            } catch (e) {
              return observer.onError(e);
            }
            observer.onNext(result);
          } else {
            observer.onCompleted();
          }
        }, function(e) {
          observer.onError(e);
        }, function() {
          observer.onCompleted();
        });
      }, first);
    }
    function falseFactory() {
      return false;
    }
    function emptyArrayFactory() {
      return [];
    }
    observableProto.zip = function() {
      if (Array.isArray(arguments[0])) {
        return zipArray.apply(this, arguments);
      }
      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      var parent = this,
          resultSelector = args.pop();
      args.unshift(parent);
      return new AnonymousObservable(function(observer) {
        var n = args.length,
            queues = arrayInitialize(n, emptyArrayFactory),
            isDone = arrayInitialize(n, falseFactory);
        function next(i) {
          var res,
              queuedValues;
          if (queues.every(function(x) {
            return x.length > 0;
          })) {
            try {
              queuedValues = queues.map(function(x) {
                return x.shift();
              });
              res = resultSelector.apply(parent, queuedValues);
            } catch (ex) {
              observer.onError(ex);
              return ;
            }
            observer.onNext(res);
          } else if (isDone.filter(function(x, j) {
            return j !== i;
          }).every(identity)) {
            observer.onCompleted();
          }
        }
        ;
        function done(i) {
          isDone[i] = true;
          if (isDone.every(function(x) {
            return x;
          })) {
            observer.onCompleted();
          }
        }
        var subscriptions = new Array(n);
        for (var idx = 0; idx < n; idx++) {
          (function(i) {
            var source = args[i],
                sad = new SingleAssignmentDisposable();
            isPromise(source) && (source = observableFromPromise(source));
            sad.setDisposable(source.subscribe(function(x) {
              queues[i].push(x);
              next(i);
            }, function(e) {
              observer.onError(e);
            }, function() {
              done(i);
            }));
            subscriptions[i] = sad;
          })(idx);
        }
        return new CompositeDisposable(subscriptions);
      }, parent);
    };
    Observable.zip = function() {
      var len = arguments.length,
          args = new Array(len);
      for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
      }
      var first = args.shift();
      return first.zip.apply(first, args);
    };
    Observable.zipArray = function() {
      var sources;
      if (Array.isArray(arguments[0])) {
        sources = arguments[0];
      } else {
        var len = arguments.length;
        sources = new Array(len);
        for (var i = 0; i < len; i++) {
          sources[i] = arguments[i];
        }
      }
      return new AnonymousObservable(function(observer) {
        var n = sources.length,
            queues = arrayInitialize(n, function() {
              return [];
            }),
            isDone = arrayInitialize(n, function() {
              return false;
            });
        function next(i) {
          if (queues.every(function(x) {
            return x.length > 0;
          })) {
            var res = queues.map(function(x) {
              return x.shift();
            });
            observer.onNext(res);
          } else if (isDone.filter(function(x, j) {
            return j !== i;
          }).every(identity)) {
            observer.onCompleted();
            return ;
          }
        }
        ;
        function done(i) {
          isDone[i] = true;
          if (isDone.every(identity)) {
            observer.onCompleted();
            return ;
          }
        }
        var subscriptions = new Array(n);
        for (var idx = 0; idx < n; idx++) {
          (function(i) {
            subscriptions[i] = new SingleAssignmentDisposable();
            subscriptions[i].setDisposable(sources[i].subscribe(function(x) {
              queues[i].push(x);
              next(i);
            }, function(e) {
              observer.onError(e);
            }, function() {
              done(i);
            }));
          })(idx);
        }
        return new CompositeDisposable(subscriptions);
      });
    };
    observableProto.asObservable = function() {
      var source = this;
      return new AnonymousObservable(function(o) {
        return source.subscribe(o);
      }, this);
    };
    observableProto.bufferWithCount = function(count, skip) {
      if (typeof skip !== 'number') {
        skip = count;
      }
      return this.windowWithCount(count, skip).selectMany(function(x) {
        return x.toArray();
      }).where(function(x) {
        return x.length > 0;
      });
    };
    observableProto.dematerialize = function() {
      var source = this;
      return new AnonymousObservable(function(o) {
        return source.subscribe(function(x) {
          return x.accept(o);
        }, function(e) {
          o.onError(e);
        }, function() {
          o.onCompleted();
        });
      }, this);
    };
    observableProto.distinctUntilChanged = function(keySelector, comparer) {
      var source = this;
      comparer || (comparer = defaultComparer);
      return new AnonymousObservable(function(o) {
        var hasCurrentKey = false,
            currentKey;
        return source.subscribe(function(value) {
          var key = value;
          if (keySelector) {
            try {
              key = keySelector(value);
            } catch (e) {
              o.onError(e);
              return ;
            }
          }
          if (hasCurrentKey) {
            try {
              var comparerEquals = comparer(currentKey, key);
            } catch (e) {
              o.onError(e);
              return ;
            }
          }
          if (!hasCurrentKey || !comparerEquals) {
            hasCurrentKey = true;
            currentKey = key;
            o.onNext(value);
          }
        }, function(e) {
          o.onError(e);
        }, function() {
          o.onCompleted();
        });
      }, this);
    };
    observableProto['do'] = observableProto.tap = observableProto.doAction = function(observerOrOnNext, onError, onCompleted) {
      var source = this;
      return new AnonymousObservable(function(observer) {
        var tapObserver = !observerOrOnNext || isFunction(observerOrOnNext) ? observerCreate(observerOrOnNext || noop, onError || noop, onCompleted || noop) : observerOrOnNext;
        return source.subscribe(function(x) {
          try {
            tapObserver.onNext(x);
          } catch (e) {
            observer.onError(e);
          }
          observer.onNext(x);
        }, function(err) {
          try {
            tapObserver.onError(err);
          } catch (e) {
            observer.onError(e);
          }
          observer.onError(err);
        }, function() {
          try {
            tapObserver.onCompleted();
          } catch (e) {
            observer.onError(e);
          }
          observer.onCompleted();
        });
      }, this);
    };
    observableProto.doOnNext = observableProto.tapOnNext = function(onNext, thisArg) {
      return this.tap(typeof thisArg !== 'undefined' ? function(x) {
        onNext.call(thisArg, x);
      } : onNext);
    };
    observableProto.doOnError = observableProto.tapOnError = function(onError, thisArg) {
      return this.tap(noop, typeof thisArg !== 'undefined' ? function(e) {
        onError.call(thisArg, e);
      } : onError);
    };
    observableProto.doOnCompleted = observableProto.tapOnCompleted = function(onCompleted, thisArg) {
      return this.tap(noop, null, typeof thisArg !== 'undefined' ? function() {
        onCompleted.call(thisArg);
      } : onCompleted);
    };
    observableProto['finally'] = observableProto.ensure = function(action) {
      var source = this;
      return new AnonymousObservable(function(observer) {
        var subscription;
        try {
          subscription = source.subscribe(observer);
        } catch (e) {
          action();
          throw e;
        }
        return disposableCreate(function() {
          try {
            subscription.dispose();
          } catch (e) {
            throw e;
          } finally {
            action();
          }
        });
      }, this);
    };
    observableProto.finallyAction = function(action) {
      return this.ensure(action);
    };
    observableProto.ignoreElements = function() {
      var source = this;
      return new AnonymousObservable(function(o) {
        return source.subscribe(noop, function(e) {
          o.onError(e);
        }, function() {
          o.onCompleted();
        });
      }, source);
    };
    observableProto.materialize = function() {
      var source = this;
      return new AnonymousObservable(function(observer) {
        return source.subscribe(function(value) {
          observer.onNext(notificationCreateOnNext(value));
        }, function(e) {
          observer.onNext(notificationCreateOnError(e));
          observer.onCompleted();
        }, function() {
          observer.onNext(notificationCreateOnCompleted());
          observer.onCompleted();
        });
      }, source);
    };
    observableProto.repeat = function(repeatCount) {
      return enumerableRepeat(this, repeatCount).concat();
    };
    observableProto.retry = function(retryCount) {
      return enumerableRepeat(this, retryCount).catchError();
    };
    observableProto.retryWhen = function(notifier) {
      return enumerableRepeat(this).catchErrorWhen(notifier);
    };
    observableProto.scan = function() {
      var hasSeed = false,
          seed,
          accumulator,
          source = this;
      if (arguments.length === 2) {
        hasSeed = true;
        seed = arguments[0];
        accumulator = arguments[1];
      } else {
        accumulator = arguments[0];
      }
      return new AnonymousObservable(function(o) {
        var hasAccumulation,
            accumulation,
            hasValue;
        return source.subscribe(function(x) {
          !hasValue && (hasValue = true);
          try {
            if (hasAccumulation) {
              accumulation = accumulator(accumulation, x);
            } else {
              accumulation = hasSeed ? accumulator(seed, x) : x;
              hasAccumulation = true;
            }
          } catch (e) {
            o.onError(e);
            return ;
          }
          o.onNext(accumulation);
        }, function(e) {
          o.onError(e);
        }, function() {
          !hasValue && hasSeed && o.onNext(seed);
          o.onCompleted();
        });
      }, source);
    };
    observableProto.skipLast = function(count) {
      if (count < 0) {
        throw new ArgumentOutOfRangeError();
      }
      var source = this;
      return new AnonymousObservable(function(o) {
        var q = [];
        return source.subscribe(function(x) {
          q.push(x);
          q.length > count && o.onNext(q.shift());
        }, function(e) {
          o.onError(e);
        }, function() {
          o.onCompleted();
        });
      }, source);
    };
    observableProto.startWith = function() {
      var values,
          scheduler,
          start = 0;
      if (!!arguments.length && isScheduler(arguments[0])) {
        scheduler = arguments[0];
        start = 1;
      } else {
        scheduler = immediateScheduler;
      }
      for (var args = [],
          i = start,
          len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
      }
      return enumerableOf([observableFromArray(args, scheduler), this]).concat();
    };
    observableProto.takeLast = function(count) {
      if (count < 0) {
        throw new ArgumentOutOfRangeError();
      }
      var source = this;
      return new AnonymousObservable(function(o) {
        var q = [];
        return source.subscribe(function(x) {
          q.push(x);
          q.length > count && q.shift();
        }, function(e) {
          o.onError(e);
        }, function() {
          while (q.length > 0) {
            o.onNext(q.shift());
          }
          o.onCompleted();
        });
      }, source);
    };
    observableProto.takeLastBuffer = function(count) {
      var source = this;
      return new AnonymousObservable(function(o) {
        var q = [];
        return source.subscribe(function(x) {
          q.push(x);
          q.length > count && q.shift();
        }, function(e) {
          o.onError(e);
        }, function() {
          o.onNext(q);
          o.onCompleted();
        });
      }, source);
    };
    observableProto.windowWithCount = function(count, skip) {
      var source = this;
      +count || (count = 0);
      Math.abs(count) === Infinity && (count = 0);
      if (count <= 0) {
        throw new ArgumentOutOfRangeError();
      }
      skip == null && (skip = count);
      +skip || (skip = 0);
      Math.abs(skip) === Infinity && (skip = 0);
      if (skip <= 0) {
        throw new ArgumentOutOfRangeError();
      }
      return new AnonymousObservable(function(observer) {
        var m = new SingleAssignmentDisposable(),
            refCountDisposable = new RefCountDisposable(m),
            n = 0,
            q = [];
        function createWindow() {
          var s = new Subject();
          q.push(s);
          observer.onNext(addRef(s, refCountDisposable));
        }
        createWindow();
        m.setDisposable(source.subscribe(function(x) {
          for (var i = 0,
              len = q.length; i < len; i++) {
            q[i].onNext(x);
          }
          var c = n - count + 1;
          c >= 0 && c % skip === 0 && q.shift().onCompleted();
          ++n % skip === 0 && createWindow();
        }, function(e) {
          while (q.length > 0) {
            q.shift().onError(e);
          }
          observer.onError(e);
        }, function() {
          while (q.length > 0) {
            q.shift().onCompleted();
          }
          observer.onCompleted();
        }));
        return refCountDisposable;
      }, source);
    };
    function concatMap(source, selector, thisArg) {
      var selectorFunc = bindCallback(selector, thisArg, 3);
      return source.map(function(x, i) {
        var result = selectorFunc(x, i, source);
        isPromise(result) && (result = observableFromPromise(result));
        (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
        return result;
      }).concatAll();
    }
    observableProto.selectConcat = observableProto.concatMap = function(selector, resultSelector, thisArg) {
      if (isFunction(selector) && isFunction(resultSelector)) {
        return this.concatMap(function(x, i) {
          var selectorResult = selector(x, i);
          isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
          (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));
          return selectorResult.map(function(y, i2) {
            return resultSelector(x, y, i, i2);
          });
        });
      }
      return isFunction(selector) ? concatMap(this, selector, thisArg) : concatMap(this, function() {
        return selector;
      });
    };
    observableProto.concatMapObserver = observableProto.selectConcatObserver = function(onNext, onError, onCompleted, thisArg) {
      var source = this,
          onNextFunc = bindCallback(onNext, thisArg, 2),
          onErrorFunc = bindCallback(onError, thisArg, 1),
          onCompletedFunc = bindCallback(onCompleted, thisArg, 0);
      return new AnonymousObservable(function(observer) {
        var index = 0;
        return source.subscribe(function(x) {
          var result;
          try {
            result = onNextFunc(x, index++);
          } catch (e) {
            observer.onError(e);
            return ;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
        }, function(err) {
          var result;
          try {
            result = onErrorFunc(err);
          } catch (e) {
            observer.onError(e);
            return ;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        }, function() {
          var result;
          try {
            result = onCompletedFunc();
          } catch (e) {
            observer.onError(e);
            return ;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        });
      }, this).concatAll();
    };
    observableProto.defaultIfEmpty = function(defaultValue) {
      var source = this;
      defaultValue === undefined && (defaultValue = null);
      return new AnonymousObservable(function(observer) {
        var found = false;
        return source.subscribe(function(x) {
          found = true;
          observer.onNext(x);
        }, function(e) {
          observer.onError(e);
        }, function() {
          !found && observer.onNext(defaultValue);
          observer.onCompleted();
        });
      }, source);
    };
    function arrayIndexOfComparer(array, item, comparer) {
      for (var i = 0,
          len = array.length; i < len; i++) {
        if (comparer(array[i], item)) {
          return i;
        }
      }
      return -1;
    }
    function HashSet(comparer) {
      this.comparer = comparer;
      this.set = [];
    }
    HashSet.prototype.push = function(value) {
      var retValue = arrayIndexOfComparer(this.set, value, this.comparer) === -1;
      retValue && this.set.push(value);
      return retValue;
    };
    observableProto.distinct = function(keySelector, comparer) {
      var source = this;
      comparer || (comparer = defaultComparer);
      return new AnonymousObservable(function(o) {
        var hashSet = new HashSet(comparer);
        return source.subscribe(function(x) {
          var key = x;
          if (keySelector) {
            try {
              key = keySelector(x);
            } catch (e) {
              o.onError(e);
              return ;
            }
          }
          hashSet.push(key) && o.onNext(x);
        }, function(e) {
          o.onError(e);
        }, function() {
          o.onCompleted();
        });
      }, this);
    };
    var MapObservable = (function(__super__) {
      inherits(MapObservable, __super__);
      function MapObservable(source, selector, thisArg) {
        this.source = source;
        this.selector = bindCallback(selector, thisArg, 3);
        __super__.call(this);
      }
      MapObservable.prototype.internalMap = function(selector, thisArg) {
        var self = this;
        return new MapObservable(this.source, function(x, i, o) {
          return selector.call(this, self.selector(x, i, o), i, o);
        }, thisArg);
      };
      MapObservable.prototype.subscribeCore = function(observer) {
        return this.source.subscribe(new MapObserver(observer, this.selector, this));
      };
      return MapObservable;
    }(ObservableBase));
    function MapObserver(observer, selector, source) {
      this.observer = observer;
      this.selector = selector;
      this.source = source;
      this.i = 0;
      this.isStopped = false;
    }
    MapObserver.prototype.onNext = function(x) {
      if (this.isStopped) {
        return ;
      }
      var result = tryCatch(this.selector).call(this, x, this.i++, this.source);
      if (result === errorObj) {
        return this.observer.onError(result.e);
      }
      this.observer.onNext(result);
    };
    MapObserver.prototype.onError = function(e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onError(e);
      }
    };
    MapObserver.prototype.onCompleted = function() {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onCompleted();
      }
    };
    MapObserver.prototype.dispose = function() {
      this.isStopped = true;
    };
    MapObserver.prototype.fail = function(e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onError(e);
        return true;
      }
      return false;
    };
    observableProto.map = observableProto.select = function(selector, thisArg) {
      var selectorFn = typeof selector === 'function' ? selector : function() {
        return selector;
      };
      return this instanceof MapObservable ? this.internalMap(selectorFn, thisArg) : new MapObservable(this, selectorFn, thisArg);
    };
    observableProto.pluck = function() {
      var args = arguments,
          len = arguments.length;
      if (len === 0) {
        throw new Error('List of properties cannot be empty.');
      }
      return this.map(function(x) {
        var currentProp = x;
        for (var i = 0; i < len; i++) {
          var p = currentProp[args[i]];
          if (typeof p !== 'undefined') {
            currentProp = p;
          } else {
            return undefined;
          }
        }
        return currentProp;
      });
    };
    observableProto.flatMapObserver = observableProto.selectManyObserver = function(onNext, onError, onCompleted, thisArg) {
      var source = this;
      return new AnonymousObservable(function(observer) {
        var index = 0;
        return source.subscribe(function(x) {
          var result;
          try {
            result = onNext.call(thisArg, x, index++);
          } catch (e) {
            observer.onError(e);
            return ;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
        }, function(err) {
          var result;
          try {
            result = onError.call(thisArg, err);
          } catch (e) {
            observer.onError(e);
            return ;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        }, function() {
          var result;
          try {
            result = onCompleted.call(thisArg);
          } catch (e) {
            observer.onError(e);
            return ;
          }
          isPromise(result) && (result = observableFromPromise(result));
          observer.onNext(result);
          observer.onCompleted();
        });
      }, source).mergeAll();
    };
    function flatMap(source, selector, thisArg) {
      var selectorFunc = bindCallback(selector, thisArg, 3);
      return source.map(function(x, i) {
        var result = selectorFunc(x, i, source);
        isPromise(result) && (result = observableFromPromise(result));
        (isArrayLike(result) || isIterable(result)) && (result = observableFrom(result));
        return result;
      }).mergeAll();
    }
    observableProto.selectMany = observableProto.flatMap = function(selector, resultSelector, thisArg) {
      if (isFunction(selector) && isFunction(resultSelector)) {
        return this.flatMap(function(x, i) {
          var selectorResult = selector(x, i);
          isPromise(selectorResult) && (selectorResult = observableFromPromise(selectorResult));
          (isArrayLike(selectorResult) || isIterable(selectorResult)) && (selectorResult = observableFrom(selectorResult));
          return selectorResult.map(function(y, i2) {
            return resultSelector(x, y, i, i2);
          });
        }, thisArg);
      }
      return isFunction(selector) ? flatMap(this, selector, thisArg) : flatMap(this, function() {
        return selector;
      });
    };
    observableProto.selectSwitch = observableProto.flatMapLatest = observableProto.switchMap = function(selector, thisArg) {
      return this.select(selector, thisArg).switchLatest();
    };
    observableProto.skip = function(count) {
      if (count < 0) {
        throw new ArgumentOutOfRangeError();
      }
      var source = this;
      return new AnonymousObservable(function(o) {
        var remaining = count;
        return source.subscribe(function(x) {
          if (remaining <= 0) {
            o.onNext(x);
          } else {
            remaining--;
          }
        }, function(e) {
          o.onError(e);
        }, function() {
          o.onCompleted();
        });
      }, source);
    };
    observableProto.skipWhile = function(predicate, thisArg) {
      var source = this,
          callback = bindCallback(predicate, thisArg, 3);
      return new AnonymousObservable(function(o) {
        var i = 0,
            running = false;
        return source.subscribe(function(x) {
          if (!running) {
            try {
              running = !callback(x, i++, source);
            } catch (e) {
              o.onError(e);
              return ;
            }
          }
          running && o.onNext(x);
        }, function(e) {
          o.onError(e);
        }, function() {
          o.onCompleted();
        });
      }, source);
    };
    observableProto.take = function(count, scheduler) {
      if (count < 0) {
        throw new ArgumentOutOfRangeError();
      }
      if (count === 0) {
        return observableEmpty(scheduler);
      }
      var source = this;
      return new AnonymousObservable(function(o) {
        var remaining = count;
        return source.subscribe(function(x) {
          if (remaining-- > 0) {
            o.onNext(x);
            remaining === 0 && o.onCompleted();
          }
        }, function(e) {
          o.onError(e);
        }, function() {
          o.onCompleted();
        });
      }, source);
    };
    observableProto.takeWhile = function(predicate, thisArg) {
      var source = this,
          callback = bindCallback(predicate, thisArg, 3);
      return new AnonymousObservable(function(o) {
        var i = 0,
            running = true;
        return source.subscribe(function(x) {
          if (running) {
            try {
              running = callback(x, i++, source);
            } catch (e) {
              o.onError(e);
              return ;
            }
            if (running) {
              o.onNext(x);
            } else {
              o.onCompleted();
            }
          }
        }, function(e) {
          o.onError(e);
        }, function() {
          o.onCompleted();
        });
      }, source);
    };
    var FilterObservable = (function(__super__) {
      inherits(FilterObservable, __super__);
      function FilterObservable(source, predicate, thisArg) {
        this.source = source;
        this.predicate = bindCallback(predicate, thisArg, 3);
        __super__.call(this);
      }
      FilterObservable.prototype.subscribeCore = function(observer) {
        return this.source.subscribe(new FilterObserver(observer, this.predicate, this));
      };
      FilterObservable.prototype.internalFilter = function(predicate, thisArg) {
        var self = this;
        return new FilterObservable(this.source, function(x, i, o) {
          return self.predicate(x, i, o) && predicate.call(this, x, i, o);
        }, thisArg);
      };
      return FilterObservable;
    }(ObservableBase));
    function FilterObserver(observer, predicate, source) {
      this.observer = observer;
      this.predicate = predicate;
      this.source = source;
      this.i = 0;
      this.isStopped = false;
    }
    FilterObserver.prototype.onNext = function(x) {
      if (this.isStopped) {
        return ;
      }
      var shouldYield = tryCatch(this.predicate).call(this, x, this.i++, this.source);
      if (shouldYield === errorObj) {
        return this.observer.onError(shouldYield.e);
      }
      shouldYield && this.observer.onNext(x);
    };
    FilterObserver.prototype.onError = function(e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onError(e);
      }
    };
    FilterObserver.prototype.onCompleted = function() {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onCompleted();
      }
    };
    FilterObserver.prototype.dispose = function() {
      this.isStopped = true;
    };
    FilterObserver.prototype.fail = function(e) {
      if (!this.isStopped) {
        this.isStopped = true;
        this.observer.onError(e);
        return true;
      }
      return false;
    };
    observableProto.filter = observableProto.where = function(predicate, thisArg) {
      return this instanceof FilterObservable ? this.internalFilter(predicate, thisArg) : new FilterObservable(this, predicate, thisArg);
    };
    observableProto.transduce = function(transducer) {
      var source = this;
      function transformForObserver(o) {
        return {
          '@@transducer/init': function() {
            return o;
          },
          '@@transducer/step': function(obs, input) {
            return obs.onNext(input);
          },
          '@@transducer/result': function(obs) {
            return obs.onCompleted();
          }
        };
      }
      return new AnonymousObservable(function(o) {
        var xform = transducer(transformForObserver(o));
        return source.subscribe(function(v) {
          try {
            xform['@@transducer/step'](o, v);
          } catch (e) {
            o.onError(e);
          }
        }, function(e) {
          o.onError(e);
        }, function() {
          xform['@@transducer/result'](o);
        });
      }, source);
    };
    var AnonymousObservable = Rx.AnonymousObservable = (function(__super__) {
      inherits(AnonymousObservable, __super__);
      function fixSubscriber(subscriber) {
        return subscriber && isFunction(subscriber.dispose) ? subscriber : isFunction(subscriber) ? disposableCreate(subscriber) : disposableEmpty;
      }
      function setDisposable(s, state) {
        var ado = state[0],
            subscribe = state[1];
        var sub = tryCatch(subscribe)(ado);
        if (sub === errorObj) {
          if (!ado.fail(errorObj.e)) {
            return thrower(errorObj.e);
          }
        }
        ado.setDisposable(fixSubscriber(sub));
      }
      function AnonymousObservable(subscribe, parent) {
        this.source = parent;
        function s(observer) {
          var ado = new AutoDetachObserver(observer),
              state = [ado, subscribe];
          if (currentThreadScheduler.scheduleRequired()) {
            currentThreadScheduler.scheduleWithState(state, setDisposable);
          } else {
            setDisposable(null, state);
          }
          return ado;
        }
        __super__.call(this, s);
      }
      return AnonymousObservable;
    }(Observable));
    var AutoDetachObserver = (function(__super__) {
      inherits(AutoDetachObserver, __super__);
      function AutoDetachObserver(observer) {
        __super__.call(this);
        this.observer = observer;
        this.m = new SingleAssignmentDisposable();
      }
      var AutoDetachObserverPrototype = AutoDetachObserver.prototype;
      AutoDetachObserverPrototype.next = function(value) {
        var result = tryCatch(this.observer.onNext).call(this.observer, value);
        if (result === errorObj) {
          this.dispose();
          thrower(result.e);
        }
      };
      AutoDetachObserverPrototype.error = function(err) {
        var result = tryCatch(this.observer.onError).call(this.observer, err);
        this.dispose();
        result === errorObj && thrower(result.e);
      };
      AutoDetachObserverPrototype.completed = function() {
        var result = tryCatch(this.observer.onCompleted).call(this.observer);
        this.dispose();
        result === errorObj && thrower(result.e);
      };
      AutoDetachObserverPrototype.setDisposable = function(value) {
        this.m.setDisposable(value);
      };
      AutoDetachObserverPrototype.getDisposable = function() {
        return this.m.getDisposable();
      };
      AutoDetachObserverPrototype.dispose = function() {
        __super__.prototype.dispose.call(this);
        this.m.dispose();
      };
      return AutoDetachObserver;
    }(AbstractObserver));
    var InnerSubscription = function(subject, observer) {
      this.subject = subject;
      this.observer = observer;
    };
    InnerSubscription.prototype.dispose = function() {
      if (!this.subject.isDisposed && this.observer !== null) {
        var idx = this.subject.observers.indexOf(this.observer);
        this.subject.observers.splice(idx, 1);
        this.observer = null;
      }
    };
    var Subject = Rx.Subject = (function(__super__) {
      function subscribe(observer) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.observers.push(observer);
          return new InnerSubscription(this, observer);
        }
        if (this.hasError) {
          observer.onError(this.error);
          return disposableEmpty;
        }
        observer.onCompleted();
        return disposableEmpty;
      }
      inherits(Subject, __super__);
      function Subject() {
        __super__.call(this, subscribe);
        this.isDisposed = false, this.isStopped = false, this.observers = [];
        this.hasError = false;
      }
      addProperties(Subject.prototype, Observer.prototype, {
        hasObservers: function() {
          return this.observers.length > 0;
        },
        onCompleted: function() {
          checkDisposed(this);
          if (!this.isStopped) {
            this.isStopped = true;
            for (var i = 0,
                os = cloneArray(this.observers),
                len = os.length; i < len; i++) {
              os[i].onCompleted();
            }
            this.observers.length = 0;
          }
        },
        onError: function(error) {
          checkDisposed(this);
          if (!this.isStopped) {
            this.isStopped = true;
            this.error = error;
            this.hasError = true;
            for (var i = 0,
                os = cloneArray(this.observers),
                len = os.length; i < len; i++) {
              os[i].onError(error);
            }
            this.observers.length = 0;
          }
        },
        onNext: function(value) {
          checkDisposed(this);
          if (!this.isStopped) {
            for (var i = 0,
                os = cloneArray(this.observers),
                len = os.length; i < len; i++) {
              os[i].onNext(value);
            }
          }
        },
        dispose: function() {
          this.isDisposed = true;
          this.observers = null;
        }
      });
      Subject.create = function(observer, observable) {
        return new AnonymousSubject(observer, observable);
      };
      return Subject;
    }(Observable));
    var AsyncSubject = Rx.AsyncSubject = (function(__super__) {
      function subscribe(observer) {
        checkDisposed(this);
        if (!this.isStopped) {
          this.observers.push(observer);
          return new InnerSubscription(this, observer);
        }
        if (this.hasError) {
          observer.onError(this.error);
        } else if (this.hasValue) {
          observer.onNext(this.value);
          observer.onCompleted();
        } else {
          observer.onCompleted();
        }
        return disposableEmpty;
      }
      inherits(AsyncSubject, __super__);
      function AsyncSubject() {
        __super__.call(this, subscribe);
        this.isDisposed = false;
        this.isStopped = false;
        this.hasValue = false;
        this.observers = [];
        this.hasError = false;
      }
      addProperties(AsyncSubject.prototype, Observer, {
        hasObservers: function() {
          checkDisposed(this);
          return this.observers.length > 0;
        },
        onCompleted: function() {
          var i,
              len;
          checkDisposed(this);
          if (!this.isStopped) {
            this.isStopped = true;
            var os = cloneArray(this.observers),
                len = os.length;
            if (this.hasValue) {
              for (i = 0; i < len; i++) {
                var o = os[i];
                o.onNext(this.value);
                o.onCompleted();
              }
            } else {
              for (i = 0; i < len; i++) {
                os[i].onCompleted();
              }
            }
            this.observers.length = 0;
          }
        },
        onError: function(error) {
          checkDisposed(this);
          if (!this.isStopped) {
            this.isStopped = true;
            this.hasError = true;
            this.error = error;
            for (var i = 0,
                os = cloneArray(this.observers),
                len = os.length; i < len; i++) {
              os[i].onError(error);
            }
            this.observers.length = 0;
          }
        },
        onNext: function(value) {
          checkDisposed(this);
          if (this.isStopped) {
            return ;
          }
          this.value = value;
          this.hasValue = true;
        },
        dispose: function() {
          this.isDisposed = true;
          this.observers = null;
          this.exception = null;
          this.value = null;
        }
      });
      return AsyncSubject;
    }(Observable));
    var AnonymousSubject = Rx.AnonymousSubject = (function(__super__) {
      inherits(AnonymousSubject, __super__);
      function subscribe(observer) {
        return this.observable.subscribe(observer);
      }
      function AnonymousSubject(observer, observable) {
        this.observer = observer;
        this.observable = observable;
        __super__.call(this, subscribe);
      }
      addProperties(AnonymousSubject.prototype, Observer.prototype, {
        onCompleted: function() {
          this.observer.onCompleted();
        },
        onError: function(error) {
          this.observer.onError(error);
        },
        onNext: function(value) {
          this.observer.onNext(value);
        }
      });
      return AnonymousSubject;
    }(Observable));
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      root.Rx = Rx;
      define(function() {
        return Rx;
      });
    } else if (freeExports && freeModule) {
      if (moduleExports) {
        (freeModule.exports = Rx).Rx = Rx;
      } else {
        freeExports.Rx = Rx;
      }
    } else {
      root.Rx = Rx;
    }
    var rEndingLine = captureLine();
  }.call(this));
  global.define = __define;
  return module.exports;
});

System.register("angular2/src/facade/lang", [], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/facade/lang";
  var _global,
      Type,
      BaseException,
      Math,
      Date,
      assertionsEnabled_,
      StringWrapper,
      StringJoiner,
      NumberParseError,
      NumberWrapper,
      RegExp,
      RegExpWrapper,
      RegExpMatcherWrapper,
      FunctionWrapper,
      Json,
      DateWrapper;
  function getTypeNameForDebugging(type) {
    return type['name'];
  }
  function makeTypeError(message) {
    return new TypeError(message);
  }
  function assertionsEnabled() {
    return assertionsEnabled_;
  }
  function ENUM_INDEX(value) {
    return value;
  }
  function CONST_EXPR(expr) {
    return expr;
  }
  function CONST() {
    return (function(target) {
      return target;
    });
  }
  function ABSTRACT() {
    return (function(t) {
      return t;
    });
  }
  function IMPLEMENTS(_) {
    return (function(t) {
      return t;
    });
  }
  function isPresent(obj) {
    return obj !== undefined && obj !== null;
  }
  function isBlank(obj) {
    return obj === undefined || obj === null;
  }
  function isString(obj) {
    return typeof obj === "string";
  }
  function isFunction(obj) {
    return typeof obj === "function";
  }
  function isType(obj) {
    return isFunction(obj);
  }
  function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
  }
  function isPromise(obj) {
    return obj instanceof _global.Promise;
  }
  function isArray(obj) {
    return Array.isArray(obj);
  }
  function isNumber(obj) {
    return typeof obj === 'number';
  }
  function isDate(obj) {
    return obj instanceof Date && !isNaN(obj.valueOf());
  }
  function stringify(token) {
    if (typeof token === 'string') {
      return token;
    }
    if (token === undefined || token === null) {
      return '' + token;
    }
    if (token.name) {
      return token.name;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf("\n");
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
  }
  function serializeEnum(val) {
    return val;
  }
  function deserializeEnum(val, values) {
    return val;
  }
  function looseIdentical(a, b) {
    return a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
  }
  function getMapKey(value) {
    return value;
  }
  function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
  }
  function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
  }
  function isJsObject(o) {
    return o !== null && (typeof o === "function" || typeof o === "object");
  }
  function print(obj) {
    if (obj instanceof BaseException) {
      console.log(obj.stack);
    } else {
      console.log(obj);
    }
  }
  $__export("getTypeNameForDebugging", getTypeNameForDebugging);
  $__export("makeTypeError", makeTypeError);
  $__export("assertionsEnabled", assertionsEnabled);
  $__export("ENUM_INDEX", ENUM_INDEX);
  $__export("CONST_EXPR", CONST_EXPR);
  $__export("CONST", CONST);
  $__export("ABSTRACT", ABSTRACT);
  $__export("IMPLEMENTS", IMPLEMENTS);
  $__export("isPresent", isPresent);
  $__export("isBlank", isBlank);
  $__export("isString", isString);
  $__export("isFunction", isFunction);
  $__export("isType", isType);
  $__export("isStringMap", isStringMap);
  $__export("isPromise", isPromise);
  $__export("isArray", isArray);
  $__export("isNumber", isNumber);
  $__export("isDate", isDate);
  $__export("stringify", stringify);
  $__export("serializeEnum", serializeEnum);
  $__export("deserializeEnum", deserializeEnum);
  $__export("looseIdentical", looseIdentical);
  $__export("getMapKey", getMapKey);
  $__export("normalizeBlank", normalizeBlank);
  $__export("normalizeBool", normalizeBool);
  $__export("isJsObject", isJsObject);
  $__export("print", print);
  return {
    setters: [],
    execute: function() {
      _global = (typeof window === 'undefined' ? global : window);
      $__export("global", _global);
      Type = Function;
      $__export("Type", Type);
      BaseException = (function($__super) {
        function BaseException(message, _originalException, _originalStack, _context) {
          $traceurRuntime.superConstructor(BaseException).call(this, message);
          this.message = message;
          this._originalException = _originalException;
          this._originalStack = _originalStack;
          this._context = _context;
          this.stack = (new Error(message)).stack;
        }
        return ($traceurRuntime.createClass)(BaseException, {
          get originalException() {
            return this._originalException;
          },
          get originalStack() {
            return this._originalStack;
          },
          get context() {
            return this._context;
          },
          toString: function() {
            return this.message;
          }
        }, {}, $__super);
      }(Error));
      $__export("BaseException", BaseException);
      Math = _global.Math;
      $__export("Math", Math);
      Date = _global.Date;
      $__export("Date", Date);
      assertionsEnabled_ = typeof _global['assert'] !== 'undefined';
      _global.assert = function assert(condition) {
        if (assertionsEnabled_) {
          _global['assert'].call(condition);
        }
      };
      StringWrapper = (function() {
        function StringWrapper() {}
        return ($traceurRuntime.createClass)(StringWrapper, {}, {
          fromCharCode: function(code) {
            return String.fromCharCode(code);
          },
          charCodeAt: function(s, index) {
            return s.charCodeAt(index);
          },
          split: function(s, regExp) {
            return s.split(regExp);
          },
          equals: function(s, s2) {
            return s === s2;
          },
          replace: function(s, from, replace) {
            return s.replace(from, replace);
          },
          replaceAll: function(s, from, replace) {
            return s.replace(from, replace);
          },
          toUpperCase: function(s) {
            return s.toUpperCase();
          },
          toLowerCase: function(s) {
            return s.toLowerCase();
          },
          startsWith: function(s, start) {
            return s.startsWith(start);
          },
          substring: function(s, start) {
            var end = arguments[2] !== (void 0) ? arguments[2] : null;
            return s.substring(start, end === null ? undefined : end);
          },
          replaceAllMapped: function(s, from, cb) {
            return s.replace(from, function() {
              for (var matches = [],
                  $__1 = 0; $__1 < arguments.length; $__1++)
                matches[$__1] = arguments[$__1];
              matches.splice(-2, 2);
              return cb(matches);
            });
          },
          contains: function(s, substr) {
            return s.indexOf(substr) != -1;
          },
          compare: function(a, b) {
            if (a < b) {
              return -1;
            } else if (a > b) {
              return 1;
            } else {
              return 0;
            }
          }
        });
      }());
      $__export("StringWrapper", StringWrapper);
      StringJoiner = (function() {
        function StringJoiner() {
          var parts = arguments[0] !== (void 0) ? arguments[0] : [];
          this.parts = parts;
        }
        return ($traceurRuntime.createClass)(StringJoiner, {
          add: function(part) {
            this.parts.push(part);
          },
          toString: function() {
            return this.parts.join("");
          }
        }, {});
      }());
      $__export("StringJoiner", StringJoiner);
      NumberParseError = (function($__super) {
        function NumberParseError(message) {
          $traceurRuntime.superConstructor(NumberParseError).call(this);
          this.message = message;
        }
        return ($traceurRuntime.createClass)(NumberParseError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException));
      $__export("NumberParseError", NumberParseError);
      NumberWrapper = (function() {
        function NumberWrapper() {}
        return ($traceurRuntime.createClass)(NumberWrapper, {}, {
          toFixed: function(n, fractionDigits) {
            return n.toFixed(fractionDigits);
          },
          equal: function(a, b) {
            return a === b;
          },
          parseIntAutoRadix: function(text) {
            var result = parseInt(text);
            if (isNaN(result)) {
              throw new NumberParseError("Invalid integer literal when parsing " + text);
            }
            return result;
          },
          parseInt: function(text, radix) {
            if (radix == 10) {
              if (/^(\-|\+)?[0-9]+$/.test(text)) {
                return parseInt(text, radix);
              }
            } else if (radix == 16) {
              if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
                return parseInt(text, radix);
              }
            } else {
              var result = parseInt(text, radix);
              if (!isNaN(result)) {
                return result;
              }
            }
            throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " + radix);
          },
          parseFloat: function(text) {
            return parseFloat(text);
          },
          get NaN() {
            return NaN;
          },
          isNaN: function(value) {
            return isNaN(value);
          },
          isInteger: function(value) {
            return Number.isInteger(value);
          }
        });
      }());
      $__export("NumberWrapper", NumberWrapper);
      RegExp = _global.RegExp;
      $__export("RegExp", RegExp);
      RegExpWrapper = (function() {
        function RegExpWrapper() {}
        return ($traceurRuntime.createClass)(RegExpWrapper, {}, {
          create: function(regExpStr) {
            var flags = arguments[1] !== (void 0) ? arguments[1] : '';
            flags = flags.replace(/g/g, '');
            return new _global.RegExp(regExpStr, flags + 'g');
          },
          firstMatch: function(regExp, input) {
            regExp.lastIndex = 0;
            return regExp.exec(input);
          },
          test: function(regExp, input) {
            regExp.lastIndex = 0;
            return regExp.test(input);
          },
          matcher: function(regExp, input) {
            regExp.lastIndex = 0;
            return {
              re: regExp,
              input: input
            };
          }
        });
      }());
      $__export("RegExpWrapper", RegExpWrapper);
      RegExpMatcherWrapper = (function() {
        function RegExpMatcherWrapper() {}
        return ($traceurRuntime.createClass)(RegExpMatcherWrapper, {}, {next: function(matcher) {
            return matcher.re.exec(matcher.input);
          }});
      }());
      $__export("RegExpMatcherWrapper", RegExpMatcherWrapper);
      FunctionWrapper = (function() {
        function FunctionWrapper() {}
        return ($traceurRuntime.createClass)(FunctionWrapper, {}, {apply: function(fn, posArgs) {
            return fn.apply(null, posArgs);
          }});
      }());
      $__export("FunctionWrapper", FunctionWrapper);
      Json = (function() {
        function Json() {}
        return ($traceurRuntime.createClass)(Json, {}, {
          parse: function(s) {
            return _global.JSON.parse(s);
          },
          stringify: function(data) {
            return _global.JSON.stringify(data, null, 2);
          }
        });
      }());
      $__export("Json", Json);
      DateWrapper = (function() {
        function DateWrapper() {}
        return ($traceurRuntime.createClass)(DateWrapper, {}, {
          create: function(year) {
            var month = arguments[1] !== (void 0) ? arguments[1] : 1;
            var day = arguments[2] !== (void 0) ? arguments[2] : 1;
            var hour = arguments[3] !== (void 0) ? arguments[3] : 0;
            var minutes = arguments[4] !== (void 0) ? arguments[4] : 0;
            var seconds = arguments[5] !== (void 0) ? arguments[5] : 0;
            var milliseconds = arguments[6] !== (void 0) ? arguments[6] : 0;
            return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
          },
          fromMillis: function(ms) {
            return new Date(ms);
          },
          toMillis: function(date) {
            return date.getTime();
          },
          now: function() {
            return new Date();
          },
          toJson: function(date) {
            return date.toJSON();
          }
        });
      }());
      $__export("DateWrapper", DateWrapper);
    }
  };
});

System.register("angular2/src/util/decorators", ["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/util/decorators";
  var global,
      isFunction,
      stringify,
      Reflect;
  function extractAnnotation(annotation) {
    if (isFunction(annotation) && annotation.hasOwnProperty('annotation')) {
      annotation = annotation.annotation;
    }
    return annotation;
  }
  function applyParams(fnOrArray, key) {
    if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function || fnOrArray === Number || fnOrArray === Array) {
      throw new Error(("Can not use native " + stringify(fnOrArray) + " as constructor"));
    }
    if (isFunction(fnOrArray)) {
      return fnOrArray;
    } else if (fnOrArray instanceof Array) {
      var annotations = fnOrArray;
      var fn = fnOrArray[fnOrArray.length - 1];
      if (!isFunction(fn)) {
        throw new Error(("Last position of Class method array must be Function in key " + key + " was '" + stringify(fn) + "'"));
      }
      var annoLength = annotations.length - 1;
      if (annoLength != fn.length) {
        throw new Error(("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + stringify(fn)));
      }
      var paramsAnnotations = [];
      for (var i = 0,
          ii = annotations.length - 1; i < ii; i++) {
        var paramAnnotations = [];
        paramsAnnotations.push(paramAnnotations);
        var annotation = annotations[i];
        if (annotation instanceof Array) {
          for (var j = 0; j < annotation.length; j++) {
            paramAnnotations.push(extractAnnotation(annotation[j]));
          }
        } else if (isFunction(annotation)) {
          paramAnnotations.push(extractAnnotation(annotation));
        } else {
          paramAnnotations.push(annotation);
        }
      }
      Reflect.defineMetadata('parameters', paramsAnnotations, fn);
      return fn;
    } else {
      throw new Error(("Only Function or Array is supported in Class definition for key '" + key + "' is '" + stringify(fnOrArray) + "'"));
    }
  }
  function Class(clsDef) {
    var constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
    var proto = constructor.prototype;
    if (clsDef.hasOwnProperty('extends')) {
      if (isFunction(clsDef.extends)) {
        constructor.prototype = proto = Object.create(clsDef.extends.prototype);
      } else {
        throw new Error(("Class definition 'extends' property must be a constructor function was: " + stringify(clsDef.extends)));
      }
    }
    for (var key in clsDef) {
      if (key != 'extends' && key != 'prototype' && clsDef.hasOwnProperty(key)) {
        proto[key] = applyParams(clsDef[key], key);
      }
    }
    if (this && this.annotations instanceof Array) {
      Reflect.defineMetadata('annotations', this.annotations, constructor);
    }
    return constructor;
  }
  function makeDecorator(annotationCls) {
    var chainFn = arguments[1] !== (void 0) ? arguments[1] : null;
    function DecoratorFactory(objOrType) {
      var annotationInstance = new annotationCls(objOrType);
      if (this instanceof annotationCls) {
        return annotationInstance;
      } else {
        var chainAnnotation = isFunction(this) && this.annotations instanceof Array ? this.annotations : [];
        chainAnnotation.push(annotationInstance);
        var TypeDecorator = function TypeDecorator(cls) {
          var annotations = Reflect.getOwnMetadata('annotations', cls);
          annotations = annotations || [];
          annotations.push(annotationInstance);
          Reflect.defineMetadata('annotations', annotations, cls);
          return cls;
        };
        TypeDecorator.annotations = chainAnnotation;
        TypeDecorator.Class = Class;
        if (chainFn)
          chainFn(TypeDecorator);
        return TypeDecorator;
      }
    }
    DecoratorFactory.prototype = Object.create(annotationCls.prototype);
    return DecoratorFactory;
  }
  function makeParamDecorator(annotationCls) {
    function ParamDecoratorFactory() {
      for (var args = [],
          $__0 = 0; $__0 < arguments.length; $__0++)
        args[$__0] = arguments[$__0];
      var annotationInstance = Object.create(annotationCls.prototype);
      annotationCls.apply(annotationInstance, args);
      if (this instanceof annotationCls) {
        return annotationInstance;
      } else {
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
      }
      function ParamDecorator(cls, unusedKey, index) {
        var parameters = Reflect.getMetadata('parameters', cls);
        parameters = parameters || [];
        while (parameters.length <= index) {
          parameters.push(null);
        }
        parameters[index] = parameters[index] || [];
        var annotationsForParam = parameters[index];
        annotationsForParam.push(annotationInstance);
        Reflect.defineMetadata('parameters', parameters, cls);
        return cls;
      }
    }
    ParamDecoratorFactory.prototype = Object.create(annotationCls.prototype);
    return ParamDecoratorFactory;
  }
  $__export("Class", Class);
  $__export("makeDecorator", makeDecorator);
  $__export("makeParamDecorator", makeParamDecorator);
  return {
    setters: [function($__m) {
      global = $__m.global;
      isFunction = $__m.isFunction;
      stringify = $__m.stringify;
    }],
    execute: function() {
      Reflect = global.Reflect;
      if (!(Reflect && Reflect.getMetadata)) {
        throw 'reflect-metadata shim is required when using class decorators';
      }
    }
  };
});

System.register("angular2/src/di/forward_ref", ["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/di/forward_ref";
  var stringify,
      isFunction;
  function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function() {
      return stringify(this());
    };
    return forwardRefFn;
  }
  function resolveForwardRef(type) {
    if (isFunction(type) && type.hasOwnProperty('__forward_ref__') && type.__forward_ref__ === forwardRef) {
      return type();
    } else {
      return type;
    }
  }
  $__export("forwardRef", forwardRef);
  $__export("resolveForwardRef", resolveForwardRef);
  return {
    setters: [function($__m) {
      stringify = $__m.stringify;
      isFunction = $__m.isFunction;
    }],
    execute: function() {
    }
  };
});

System.register("angular2/src/facade/collection", ["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/facade/collection";
  var isJsObject,
      global,
      isPresent,
      isBlank,
      isArray,
      List,
      Map,
      Set,
      StringMap,
      createMapFromPairs,
      createMapFromMap,
      _clearValues,
      _arrayFromMap,
      MapWrapper,
      StringMapWrapper,
      ListWrapper,
      createSetFromList,
      SetWrapper;
  function isListLikeIterable(obj) {
    if (!isJsObject(obj))
      return false;
    return isArray(obj) || (!(obj instanceof Map) && Symbol.iterator in obj);
  }
  function iterateListLike(obj, fn) {
    if (isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        fn(obj[i]);
      }
    } else {
      var iterator = obj[Symbol.iterator]();
      var item;
      while (!((item = iterator.next()).done)) {
        fn(item.value);
      }
    }
  }
  $__export("isListLikeIterable", isListLikeIterable);
  $__export("iterateListLike", iterateListLike);
  return {
    setters: [function($__m) {
      isJsObject = $__m.isJsObject;
      global = $__m.global;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      isArray = $__m.isArray;
    }],
    execute: function() {
      List = global.Array;
      $__export("List", List);
      Map = global.Map;
      $__export("Map", Map);
      Set = global.Set;
      $__export("Set", Set);
      StringMap = global.Object;
      $__export("StringMap", StringMap);
      createMapFromPairs = (function() {
        try {
          if (new Map([[1, 2]]).size === 1) {
            return function createMapFromPairs(pairs) {
              return new Map(pairs);
            };
          }
        } catch (e) {}
        return function createMapAndPopulateFromPairs(pairs) {
          var map = new Map();
          for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            map.set(pair[0], pair[1]);
          }
          return map;
        };
      })();
      createMapFromMap = (function() {
        try {
          if (new Map(new Map())) {
            return function createMapFromMap(m) {
              return new Map(m);
            };
          }
        } catch (e) {}
        return function createMapAndPopulateFromMap(m) {
          var map = new Map();
          m.forEach((function(v, k) {
            map.set(k, v);
          }));
          return map;
        };
      })();
      _clearValues = (function() {
        if ((new Map()).keys().next) {
          return function _clearValues(m) {
            var keyIterator = m.keys();
            var k;
            while (!((k = keyIterator.next()).done)) {
              m.set(k.value, null);
            }
          };
        } else {
          return function _clearValuesWithForeEach(m) {
            m.forEach((function(v, k) {
              m.set(k, null);
            }));
          };
        }
      })();
      _arrayFromMap = (function() {
        try {
          if ((new Map()).values().next) {
            return function createArrayFromMap(m, getValues) {
              return getValues ? Array.from(m.values()) : Array.from(m.keys());
            };
          }
        } catch (e) {}
        return function createArrayFromMapWithForeach(m, getValues) {
          var res = ListWrapper.createFixedSize(m.size),
              i = 0;
          m.forEach((function(v, k) {
            ListWrapper.set(res, i, getValues ? v : k);
            i++;
          }));
          return res;
        };
      })();
      MapWrapper = (function() {
        function MapWrapper() {}
        return ($traceurRuntime.createClass)(MapWrapper, {}, {
          clone: function(m) {
            return createMapFromMap(m);
          },
          createFromStringMap: function(stringMap) {
            var result = new Map();
            for (var prop in stringMap) {
              result.set(prop, stringMap[prop]);
            }
            return result;
          },
          toStringMap: function(m) {
            var r = {};
            m.forEach((function(v, k) {
              return r[k] = v;
            }));
            return r;
          },
          createFromPairs: function(pairs) {
            return createMapFromPairs(pairs);
          },
          forEach: function(m, fn) {
            m.forEach(fn);
          },
          get: function(map, key) {
            return map.get(key);
          },
          size: function(m) {
            return m.size;
          },
          delete: function(m, k) {
            m.delete(k);
          },
          clearValues: function(m) {
            _clearValues(m);
          },
          iterable: function(m) {
            return m;
          },
          keys: function(m) {
            return _arrayFromMap(m, false);
          },
          values: function(m) {
            return _arrayFromMap(m, true);
          }
        });
      }());
      $__export("MapWrapper", MapWrapper);
      StringMapWrapper = (function() {
        function StringMapWrapper() {}
        return ($traceurRuntime.createClass)(StringMapWrapper, {}, {
          create: function() {
            return {};
          },
          contains: function(map, key) {
            return map.hasOwnProperty(key);
          },
          get: function(map, key) {
            return map.hasOwnProperty(key) ? map[key] : undefined;
          },
          set: function(map, key, value) {
            map[key] = value;
          },
          keys: function(map) {
            return Object.keys(map);
          },
          isEmpty: function(map) {
            for (var prop in map) {
              return false;
            }
            return true;
          },
          delete: function(map, key) {
            delete map[key];
          },
          forEach: function(map, callback) {
            for (var prop in map) {
              if (map.hasOwnProperty(prop)) {
                callback(map[prop], prop);
              }
            }
          },
          merge: function(m1, m2) {
            var m = {};
            for (var attr in m1) {
              if (m1.hasOwnProperty(attr)) {
                m[attr] = m1[attr];
              }
            }
            for (var attr in m2) {
              if (m2.hasOwnProperty(attr)) {
                m[attr] = m2[attr];
              }
            }
            return m;
          },
          equals: function(m1, m2) {
            var k1 = Object.keys(m1);
            var k2 = Object.keys(m2);
            if (k1.length != k2.length) {
              return false;
            }
            var key;
            for (var i = 0; i < k1.length; i++) {
              key = k1[i];
              if (m1[key] !== m2[key]) {
                return false;
              }
            }
            return true;
          }
        });
      }());
      $__export("StringMapWrapper", StringMapWrapper);
      ListWrapper = (function() {
        function ListWrapper() {}
        return ($traceurRuntime.createClass)(ListWrapper, {}, {
          createFixedSize: function(size) {
            return new List(size);
          },
          createGrowableSize: function(size) {
            return new List(size);
          },
          get: function(m, k) {
            return m[k];
          },
          set: function(m, k, v) {
            m[k] = v;
          },
          clone: function(array) {
            return array.slice(0);
          },
          map: function(array, fn) {
            return array.map(fn);
          },
          forEach: function(array, fn) {
            for (var i = 0; i < array.length; i++) {
              fn(array[i]);
            }
          },
          forEachWithIndex: function(array, fn) {
            for (var i = 0; i < array.length; i++) {
              fn(array[i], i);
            }
          },
          first: function(array) {
            if (!array)
              return null;
            return array[0];
          },
          last: function(array) {
            if (!array || array.length == 0)
              return null;
            return array[array.length - 1];
          },
          find: function(list, pred) {
            for (var i = 0; i < list.length; ++i) {
              if (pred(list[i]))
                return list[i];
            }
            return null;
          },
          indexOf: function(array, value) {
            var startIndex = arguments[2] !== (void 0) ? arguments[2] : 0;
            return array.indexOf(value, startIndex);
          },
          reduce: function(list, fn, init) {
            return list.reduce(fn, init);
          },
          filter: function(array, pred) {
            return array.filter(pred);
          },
          any: function(list, pred) {
            for (var i = 0; i < list.length; ++i) {
              if (pred(list[i]))
                return true;
            }
            return false;
          },
          contains: function(list, el) {
            return list.indexOf(el) !== -1;
          },
          reversed: function(array) {
            var a = ListWrapper.clone(array);
            return a.reverse();
          },
          concat: function(a, b) {
            return a.concat(b);
          },
          insert: function(list, index, value) {
            list.splice(index, 0, value);
          },
          removeAt: function(list, index) {
            var res = list[index];
            list.splice(index, 1);
            return res;
          },
          removeAll: function(list, items) {
            for (var i = 0; i < items.length; ++i) {
              var index = list.indexOf(items[i]);
              list.splice(index, 1);
            }
          },
          removeLast: function(list) {
            return list.pop();
          },
          remove: function(list, el) {
            var index = list.indexOf(el);
            if (index > -1) {
              list.splice(index, 1);
              return true;
            }
            return false;
          },
          clear: function(list) {
            list.splice(0, list.length);
          },
          join: function(list, s) {
            return list.join(s);
          },
          isEmpty: function(list) {
            return list.length == 0;
          },
          fill: function(list, value) {
            var start = arguments[2] !== (void 0) ? arguments[2] : 0;
            var end = arguments[3] !== (void 0) ? arguments[3] : null;
            list.fill(value, start, end === null ? list.length : end);
          },
          equals: function(a, b) {
            if (a.length != b.length)
              return false;
            for (var i = 0; i < a.length; ++i) {
              if (a[i] !== b[i])
                return false;
            }
            return true;
          },
          slice: function(l) {
            var from = arguments[1] !== (void 0) ? arguments[1] : 0;
            var to = arguments[2] !== (void 0) ? arguments[2] : null;
            return l.slice(from, to === null ? undefined : to);
          },
          splice: function(l, from, length) {
            return l.splice(from, length);
          },
          sort: function(l, compareFn) {
            if (isPresent(compareFn)) {
              l.sort(compareFn);
            } else {
              l.sort();
            }
          },
          toString: function(l) {
            return l.toString();
          },
          toJSON: function(l) {
            return JSON.stringify(l);
          },
          maximum: function(list, predicate) {
            if (list.length == 0) {
              return null;
            }
            var solution = null;
            var maxValue = -Infinity;
            for (var index = 0; index < list.length; index++) {
              var candidate = list[index];
              if (isBlank(candidate)) {
                continue;
              }
              var candidateValue = predicate(candidate);
              if (candidateValue > maxValue) {
                solution = candidate;
                maxValue = candidateValue;
              }
            }
            return solution;
          }
        });
      }());
      $__export("ListWrapper", ListWrapper);
      createSetFromList = (function() {
        var test = new Set([1, 2, 3]);
        if (test.size === 3) {
          return function createSetFromList(lst) {
            return new Set(lst);
          };
        } else {
          return function createSetAndPopulateFromList(lst) {
            var res = new Set(lst);
            if (res.size !== lst.length) {
              for (var i = 0; i < lst.length; i++) {
                res.add(lst[i]);
              }
            }
            return res;
          };
        }
      })();
      SetWrapper = (function() {
        function SetWrapper() {}
        return ($traceurRuntime.createClass)(SetWrapper, {}, {
          createFromList: function(lst) {
            return createSetFromList(lst);
          },
          has: function(s, key) {
            return s.has(key);
          },
          delete: function(m, k) {
            m.delete(k);
          }
        });
      }());
      $__export("SetWrapper", SetWrapper);
    }
  };
});

System.register("angular2/src/reflection/reflector", ["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/reflection/reflector";
  var isPresent,
      BaseException,
      ListWrapper,
      Map,
      MapWrapper,
      Set,
      SetWrapper,
      StringMapWrapper,
      ReflectionInfo,
      Reflector;
  function _mergeMaps(target, config) {
    StringMapWrapper.forEach(config, (function(v, k) {
      return target.set(k, v);
    }));
  }
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      Set = $__m.Set;
      SetWrapper = $__m.SetWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }],
    execute: function() {
      ReflectionInfo = (function() {
        function ReflectionInfo(annotations, parameters, factory, interfaces) {
          this._annotations = annotations;
          this._parameters = parameters;
          this._factory = factory;
          this._interfaces = interfaces;
        }
        return ($traceurRuntime.createClass)(ReflectionInfo, {}, {});
      }());
      $__export("ReflectionInfo", ReflectionInfo);
      Reflector = (function() {
        function Reflector(reflectionCapabilities) {
          this._injectableInfo = new Map();
          this._getters = new Map();
          this._setters = new Map();
          this._methods = new Map();
          this._usedKeys = null;
          this.reflectionCapabilities = reflectionCapabilities;
        }
        return ($traceurRuntime.createClass)(Reflector, {
          isReflectionEnabled: function() {
            return this.reflectionCapabilities.isReflectionEnabled();
          },
          trackUsage: function() {
            this._usedKeys = new Set();
          },
          listUnusedKeys: function() {
            var $__0 = this;
            if (this._usedKeys == null) {
              throw new BaseException('Usage tracking is disabled');
            }
            var allTypes = MapWrapper.keys(this._injectableInfo);
            return ListWrapper.filter(allTypes, (function(key) {
              return !SetWrapper.has($__0._usedKeys, key);
            }));
          },
          registerFunction: function(func, funcInfo) {
            this._injectableInfo.set(func, funcInfo);
          },
          registerType: function(type, typeInfo) {
            this._injectableInfo.set(type, typeInfo);
          },
          registerGetters: function(getters) {
            _mergeMaps(this._getters, getters);
          },
          registerSetters: function(setters) {
            _mergeMaps(this._setters, setters);
          },
          registerMethods: function(methods) {
            _mergeMaps(this._methods, methods);
          },
          factory: function(type) {
            if (this._containsReflectionInfo(type)) {
              var res = this._getReflectionInfo(type)._factory;
              return isPresent(res) ? res : null;
            } else {
              return this.reflectionCapabilities.factory(type);
            }
          },
          parameters: function(typeOrFunc) {
            if (this._injectableInfo.has(typeOrFunc)) {
              var res = this._getReflectionInfo(typeOrFunc)._parameters;
              return isPresent(res) ? res : [];
            } else {
              return this.reflectionCapabilities.parameters(typeOrFunc);
            }
          },
          annotations: function(typeOrFunc) {
            if (this._injectableInfo.has(typeOrFunc)) {
              var res = this._getReflectionInfo(typeOrFunc)._annotations;
              return isPresent(res) ? res : [];
            } else {
              return this.reflectionCapabilities.annotations(typeOrFunc);
            }
          },
          interfaces: function(type) {
            if (this._injectableInfo.has(type)) {
              var res = this._getReflectionInfo(type)._interfaces;
              return isPresent(res) ? res : [];
            } else {
              return this.reflectionCapabilities.interfaces(type);
            }
          },
          getter: function(name) {
            if (this._getters.has(name)) {
              return this._getters.get(name);
            } else {
              return this.reflectionCapabilities.getter(name);
            }
          },
          setter: function(name) {
            if (this._setters.has(name)) {
              return this._setters.get(name);
            } else {
              return this.reflectionCapabilities.setter(name);
            }
          },
          method: function(name) {
            if (this._methods.has(name)) {
              return this._methods.get(name);
            } else {
              return this.reflectionCapabilities.method(name);
            }
          },
          _getReflectionInfo: function(typeOrFunc) {
            if (isPresent(this._usedKeys)) {
              this._usedKeys.add(typeOrFunc);
            }
            return this._injectableInfo.get(typeOrFunc);
          },
          _containsReflectionInfo: function(typeOrFunc) {
            return this._injectableInfo.has(typeOrFunc);
          }
        }, {});
      }());
      $__export("Reflector", Reflector);
    }
  };
});

System.register("angular2/src/reflection/reflection_capabilities", ["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/reflection/reflection_capabilities";
  var isPresent,
      isFunction,
      global,
      stringify,
      BaseException,
      ListWrapper,
      ReflectionCapabilities;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isFunction = $__m.isFunction;
      global = $__m.global;
      stringify = $__m.stringify;
      BaseException = $__m.BaseException;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      ReflectionCapabilities = (function() {
        function ReflectionCapabilities(reflect) {
          this._reflect = isPresent(reflect) ? reflect : global.Reflect;
        }
        return ($traceurRuntime.createClass)(ReflectionCapabilities, {
          isReflectionEnabled: function() {
            return true;
          },
          factory: function(t) {
            switch (t.length) {
              case 0:
                return (function() {
                  return new t();
                });
              case 1:
                return (function(a1) {
                  return new t(a1);
                });
              case 2:
                return (function(a1, a2) {
                  return new t(a1, a2);
                });
              case 3:
                return (function(a1, a2, a3) {
                  return new t(a1, a2, a3);
                });
              case 4:
                return (function(a1, a2, a3, a4) {
                  return new t(a1, a2, a3, a4);
                });
              case 5:
                return (function(a1, a2, a3, a4, a5) {
                  return new t(a1, a2, a3, a4, a5);
                });
              case 6:
                return (function(a1, a2, a3, a4, a5, a6) {
                  return new t(a1, a2, a3, a4, a5, a6);
                });
              case 7:
                return (function(a1, a2, a3, a4, a5, a6, a7) {
                  return new t(a1, a2, a3, a4, a5, a6, a7);
                });
              case 8:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8);
                });
              case 9:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9);
                });
              case 10:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
                });
              case 11:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
                });
              case 12:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
                });
              case 13:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
                });
              case 14:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
                });
              case 15:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
                });
              case 16:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
                });
              case 17:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
                });
              case 18:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18);
                });
              case 19:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19);
                });
              case 20:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20) {
                  return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20);
                });
            }
            ;
            throw new Error(("Cannot create a factory for '" + stringify(t) + "' because its constructor has more than 20 arguments"));
          },
          _zipTypesAndAnnotaions: function(paramTypes, paramAnnotations) {
            var result;
            if (typeof paramTypes === 'undefined') {
              result = ListWrapper.createFixedSize(paramAnnotations.length);
            } else {
              result = ListWrapper.createFixedSize(paramTypes.length);
            }
            for (var i = 0; i < result.length; i++) {
              if (typeof paramTypes === 'undefined') {
                result[i] = [];
              } else if (paramTypes[i] != Object) {
                result[i] = [paramTypes[i]];
              } else {
                result[i] = [];
              }
              if (isPresent(paramAnnotations) && isPresent(paramAnnotations[i])) {
                result[i] = result[i].concat(paramAnnotations[i]);
              }
            }
            return result;
          },
          parameters: function(typeOfFunc) {
            if (isPresent(typeOfFunc.parameters)) {
              return typeOfFunc.parameters;
            }
            if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
              var paramAnnotations = this._reflect.getMetadata('parameters', typeOfFunc);
              var paramTypes = this._reflect.getMetadata('design:paramtypes', typeOfFunc);
              if (isPresent(paramTypes) || isPresent(paramAnnotations)) {
                return this._zipTypesAndAnnotaions(paramTypes, paramAnnotations);
              }
            }
            return ListWrapper.createFixedSize(typeOfFunc.length);
          },
          annotations: function(typeOfFunc) {
            if (isPresent(typeOfFunc.annotations)) {
              var annotations = typeOfFunc.annotations;
              if (isFunction(annotations) && annotations.annotations) {
                annotations = annotations.annotations;
              }
              return annotations;
            }
            if (isPresent(this._reflect) && isPresent(this._reflect.getMetadata)) {
              var annotations = this._reflect.getMetadata('annotations', typeOfFunc);
              if (isPresent(annotations))
                return annotations;
            }
            return [];
          },
          interfaces: function(type) {
            throw new BaseException("JavaScript does not support interfaces");
          },
          getter: function(name) {
            return new Function('o', 'return o.' + name + ';');
          },
          setter: function(name) {
            return new Function('o', 'v', 'return o.' + name + ' = v;');
          },
          method: function(name) {
            var functionBody = ("if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);");
            return new Function('o', 'args', functionBody);
          }
        }, {});
      }());
      $__export("ReflectionCapabilities", ReflectionCapabilities);
    }
  };
});

System.register("angular2/src/di/type_literal", [], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/di/type_literal";
  var TypeLiteral;
  return {
    setters: [],
    execute: function() {
      TypeLiteral = (function() {
        function TypeLiteral() {}
        return ($traceurRuntime.createClass)(TypeLiteral, {get type() {
            throw new Error("Type literals are only supported in Dart");
          }}, {});
      }());
      $__export("TypeLiteral", TypeLiteral);
    }
  };
});

System.register("angular2/src/di/exceptions", ["angular2/src/facade/collection", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/di/exceptions";
  var ListWrapper,
      stringify,
      BaseException,
      isBlank,
      AbstractBindingError,
      NoBindingError,
      CyclicDependencyError,
      InstantiationError,
      InvalidBindingError,
      NoAnnotationError,
      OutOfBoundsError;
  function findFirstClosedCycle(keys) {
    var res = [];
    for (var i = 0; i < keys.length; ++i) {
      if (ListWrapper.contains(res, keys[i])) {
        res.push(keys[i]);
        return res;
      } else {
        res.push(keys[i]);
      }
    }
    return res;
  }
  function constructResolvingPath(keys) {
    if (keys.length > 1) {
      var reversed = findFirstClosedCycle(ListWrapper.reversed(keys));
      var tokenStrs = ListWrapper.map(reversed, (function(k) {
        return stringify(k.token);
      }));
      return " (" + tokenStrs.join(' -> ') + ")";
    } else {
      return "";
    }
  }
  return {
    setters: [function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      stringify = $__m.stringify;
      BaseException = $__m.BaseException;
      isBlank = $__m.isBlank;
    }],
    execute: function() {
      AbstractBindingError = (function($__super) {
        function AbstractBindingError(injector, key, constructResolvingMessage, originalException, originalStack) {
          $traceurRuntime.superConstructor(AbstractBindingError).call(this, "DI Exception", originalException, originalStack, null);
          this.keys = [key];
          this.injectors = [injector];
          this.constructResolvingMessage = constructResolvingMessage;
          this.message = this.constructResolvingMessage(this.keys);
        }
        return ($traceurRuntime.createClass)(AbstractBindingError, {
          addKey: function(injector, key) {
            this.injectors.push(injector);
            this.keys.push(key);
            this.message = this.constructResolvingMessage(this.keys);
          },
          get context() {
            return this.injectors[this.injectors.length - 1].debugContext();
          },
          toString: function() {
            return this.message;
          }
        }, {}, $__super);
      }(BaseException));
      $__export("AbstractBindingError", AbstractBindingError);
      NoBindingError = (function($__super) {
        function NoBindingError(injector, key) {
          $traceurRuntime.superConstructor(NoBindingError).call(this, injector, key, function(keys) {
            var first = stringify(ListWrapper.first(keys).token);
            return ("No provider for " + first + "!" + constructResolvingPath(keys));
          });
        }
        return ($traceurRuntime.createClass)(NoBindingError, {}, {}, $__super);
      }(AbstractBindingError));
      $__export("NoBindingError", NoBindingError);
      CyclicDependencyError = (function($__super) {
        function CyclicDependencyError(injector, key) {
          $traceurRuntime.superConstructor(CyclicDependencyError).call(this, injector, key, function(keys) {
            return ("Cannot instantiate cyclic dependency!" + constructResolvingPath(keys));
          });
        }
        return ($traceurRuntime.createClass)(CyclicDependencyError, {}, {}, $__super);
      }(AbstractBindingError));
      $__export("CyclicDependencyError", CyclicDependencyError);
      InstantiationError = (function($__super) {
        function InstantiationError(injector, originalException, originalStack, key) {
          $traceurRuntime.superConstructor(InstantiationError).call(this, injector, key, function(keys) {
            var first = stringify(ListWrapper.first(keys).token);
            return ("Error during instantiation of " + first + "!" + constructResolvingPath(keys) + ".");
          }, originalException, originalStack);
          this.causeKey = key;
        }
        return ($traceurRuntime.createClass)(InstantiationError, {}, {}, $__super);
      }(AbstractBindingError));
      $__export("InstantiationError", InstantiationError);
      InvalidBindingError = (function($__super) {
        function InvalidBindingError(binding) {
          $traceurRuntime.superConstructor(InvalidBindingError).call(this);
          this.message = "Invalid binding - only instances of Binding and Type are allowed, got: " + binding.toString();
        }
        return ($traceurRuntime.createClass)(InvalidBindingError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException));
      $__export("InvalidBindingError", InvalidBindingError);
      NoAnnotationError = (function($__super) {
        function NoAnnotationError(typeOrFunc, params) {
          $traceurRuntime.superConstructor(NoAnnotationError).call(this);
          var signature = [];
          for (var i = 0,
              ii = params.length; i < ii; i++) {
            var parameter = params[i];
            if (isBlank(parameter) || parameter.length == 0) {
              signature.push('?');
            } else {
              signature.push(ListWrapper.map(parameter, stringify).join(' '));
            }
          }
          this.message = "Cannot resolve all parameters for " + stringify(typeOrFunc) + "(" + signature.join(', ') + "). " + 'Make sure they all have valid type or annotations.';
        }
        return ($traceurRuntime.createClass)(NoAnnotationError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException));
      $__export("NoAnnotationError", NoAnnotationError);
      OutOfBoundsError = (function($__super) {
        function OutOfBoundsError(index) {
          $traceurRuntime.superConstructor(OutOfBoundsError).call(this);
          this.message = ("Index " + index + " is out-of-bounds.");
        }
        return ($traceurRuntime.createClass)(OutOfBoundsError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(BaseException));
      $__export("OutOfBoundsError", OutOfBoundsError);
    }
  };
});

System.register("angular2/src/di/opaque_token", ["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/di/opaque_token";
  var __decorate,
      __metadata,
      CONST,
      OpaqueToken;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      OpaqueToken = (($traceurRuntime.createClass)(function(desc) {
        this._desc = 'Token(' + desc + ')';
      }, {toString: function() {
          return this._desc;
        }}, {}));
      $__export("OpaqueToken", OpaqueToken);
      $__export("OpaqueToken", OpaqueToken = __decorate([CONST(), __metadata('design:paramtypes', [String])], OpaqueToken));
    }
  };
});

System.register("http/src/url_search_params", ["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "http/src/url_search_params";
  var CONST_EXPR,
      isPresent,
      StringWrapper,
      Map,
      MapWrapper,
      ListWrapper,
      isListLikeIterable,
      URLSearchParamsUnionFixer,
      URLSearchParams;
  function paramParser() {
    var rawParams = arguments[0] !== (void 0) ? arguments[0] : '';
    var map = new Map();
    if (rawParams.length > 0) {
      var params = StringWrapper.split(rawParams, new RegExp('&'));
      ListWrapper.forEach(params, (function(param) {
        var split = StringWrapper.split(param, new RegExp('='));
        var key = ListWrapper.get(split, 0);
        var val = ListWrapper.get(split, 1);
        var list = isPresent(map.get(key)) ? map.get(key) : [];
        list.push(val);
        map.set(key, list);
      }));
    }
    return map;
  }
  return {
    setters: [function($__m) {
      CONST_EXPR = $__m.CONST_EXPR;
      isPresent = $__m.isPresent;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
      isListLikeIterable = $__m.isListLikeIterable;
    }],
    execute: function() {
      URLSearchParamsUnionFixer = CONST_EXPR("UnionFixer");
      $__export("URLSearchParamsUnionFixer", URLSearchParamsUnionFixer);
      URLSearchParams = (function() {
        function URLSearchParams() {
          var rawParams = arguments[0] !== (void 0) ? arguments[0] : '';
          this.rawParams = rawParams;
          this.paramsMap = paramParser(rawParams);
        }
        return ($traceurRuntime.createClass)(URLSearchParams, {
          clone: function() {
            var clone = new URLSearchParams();
            clone.appendAll(this);
            return clone;
          },
          has: function(param) {
            return this.paramsMap.has(param);
          },
          get: function(param) {
            var storedParam = this.paramsMap.get(param);
            if (isListLikeIterable(storedParam)) {
              return ListWrapper.first(storedParam);
            } else {
              return null;
            }
          },
          getAll: function(param) {
            var mapParam = this.paramsMap.get(param);
            return isPresent(mapParam) ? mapParam : [];
          },
          set: function(param, val) {
            var mapParam = this.paramsMap.get(param);
            var list = isPresent(mapParam) ? mapParam : [];
            ListWrapper.clear(list);
            list.push(val);
            this.paramsMap.set(param, list);
          },
          setAll: function(searchParams) {
            var $__0 = this;
            MapWrapper.forEach(searchParams.paramsMap, (function(value, param) {
              var mapParam = $__0.paramsMap.get(param);
              var list = isPresent(mapParam) ? mapParam : [];
              ListWrapper.clear(list);
              list.push(value[0]);
              $__0.paramsMap.set(param, list);
            }));
          },
          append: function(param, val) {
            var mapParam = this.paramsMap.get(param);
            var list = isPresent(mapParam) ? mapParam : [];
            list.push(val);
            this.paramsMap.set(param, list);
          },
          appendAll: function(searchParams) {
            var $__0 = this;
            MapWrapper.forEach(searchParams.paramsMap, (function(value, param) {
              var mapParam = $__0.paramsMap.get(param);
              var list = isPresent(mapParam) ? mapParam : [];
              for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
              }
              $__0.paramsMap.set(param, list);
            }));
          },
          replaceAll: function(searchParams) {
            var $__0 = this;
            MapWrapper.forEach(searchParams.paramsMap, (function(value, param) {
              var mapParam = $__0.paramsMap.get(param);
              var list = isPresent(mapParam) ? mapParam : [];
              ListWrapper.clear(list);
              for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
              }
              $__0.paramsMap.set(param, list);
            }));
          },
          toString: function() {
            var paramsList = [];
            MapWrapper.forEach(this.paramsMap, (function(values, k) {
              ListWrapper.forEach(values, (function(v) {
                paramsList.push(k + '=' + v);
              }));
            }));
            return ListWrapper.join(paramsList, '&');
          },
          delete: function(param) {
            MapWrapper.delete(this.paramsMap, param);
          }
        }, {});
      }());
      $__export("URLSearchParams", URLSearchParams);
    }
  };
});

System.register("http/src/headers", ["angular2/src/facade/lang", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "http/src/headers";
  var isBlank,
      BaseException,
      isListLikeIterable,
      Map,
      MapWrapper,
      ListWrapper,
      StringMap,
      Headers;
  return {
    setters: [function($__m) {
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      isListLikeIterable = $__m.isListLikeIterable;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
      StringMap = $__m.StringMap;
    }],
    execute: function() {
      Headers = (function() {
        function Headers(headers) {
          var $__0 = this;
          if (isBlank(headers)) {
            this._headersMap = new Map();
            return ;
          }
          if (headers instanceof Headers) {
            this._headersMap = headers._headersMap;
          } else if (headers instanceof StringMap) {
            this._headersMap = MapWrapper.createFromStringMap(headers);
            MapWrapper.forEach(this._headersMap, (function(v, k) {
              if (!isListLikeIterable(v)) {
                var list = [];
                list.push(v);
                $__0._headersMap.set(k, list);
              }
            }));
          }
        }
        return ($traceurRuntime.createClass)(Headers, {
          append: function(name, value) {
            var mapName = this._headersMap.get(name);
            var list = isListLikeIterable(mapName) ? mapName : [];
            list.push(value);
            this._headersMap.set(name, list);
          },
          delete: function(name) {
            MapWrapper.delete(this._headersMap, name);
          },
          forEach: function(fn) {
            MapWrapper.forEach(this._headersMap, fn);
          },
          get: function(header) {
            return ListWrapper.first(this._headersMap.get(header));
          },
          has: function(header) {
            return this._headersMap.has(header);
          },
          keys: function() {
            return MapWrapper.keys(this._headersMap);
          },
          set: function(header, value) {
            var list = [];
            if (isListLikeIterable(value)) {
              var pushValue = value.join(',');
              list.push(pushValue);
            } else {
              list.push(value);
            }
            this._headersMap.set(header, list);
          },
          values: function() {
            return MapWrapper.values(this._headersMap);
          },
          getAll: function(header) {
            var headers = this._headersMap.get(header);
            return isListLikeIterable(headers) ? headers : [];
          },
          entries: function() {
            throw new BaseException('"entries" method is not implemented on Headers class');
          }
        }, {});
      }());
      $__export("Headers", Headers);
    }
  };
});

System.register("http/src/enums", [], function($__export) {
  "use strict";
  var __moduleName = "http/src/enums";
  var RequestModesOpts,
      RequestCacheOpts,
      RequestCredentialsOpts,
      RequestMethods,
      RequestMethodsMap,
      ReadyStates,
      ResponseTypes;
  return {
    setters: [],
    execute: function() {
      $__export("RequestModesOpts", RequestModesOpts);
      (function(RequestModesOpts) {
        RequestModesOpts[RequestModesOpts["Cors"] = 0] = "Cors";
        RequestModesOpts[RequestModesOpts["NoCors"] = 1] = "NoCors";
        RequestModesOpts[RequestModesOpts["SameOrigin"] = 2] = "SameOrigin";
      })(RequestModesOpts || ($__export("RequestModesOpts", RequestModesOpts = {})));
      $__export("RequestCacheOpts", RequestCacheOpts);
      (function(RequestCacheOpts) {
        RequestCacheOpts[RequestCacheOpts["Default"] = 0] = "Default";
        RequestCacheOpts[RequestCacheOpts["NoStore"] = 1] = "NoStore";
        RequestCacheOpts[RequestCacheOpts["Reload"] = 2] = "Reload";
        RequestCacheOpts[RequestCacheOpts["NoCache"] = 3] = "NoCache";
        RequestCacheOpts[RequestCacheOpts["ForceCache"] = 4] = "ForceCache";
        RequestCacheOpts[RequestCacheOpts["OnlyIfCached"] = 5] = "OnlyIfCached";
      })(RequestCacheOpts || ($__export("RequestCacheOpts", RequestCacheOpts = {})));
      $__export("RequestCredentialsOpts", RequestCredentialsOpts);
      (function(RequestCredentialsOpts) {
        RequestCredentialsOpts[RequestCredentialsOpts["Omit"] = 0] = "Omit";
        RequestCredentialsOpts[RequestCredentialsOpts["SameOrigin"] = 1] = "SameOrigin";
        RequestCredentialsOpts[RequestCredentialsOpts["Include"] = 2] = "Include";
      })(RequestCredentialsOpts || ($__export("RequestCredentialsOpts", RequestCredentialsOpts = {})));
      $__export("RequestMethods", RequestMethods);
      (function(RequestMethods) {
        RequestMethods[RequestMethods["GET"] = 0] = "GET";
        RequestMethods[RequestMethods["POST"] = 1] = "POST";
        RequestMethods[RequestMethods["PUT"] = 2] = "PUT";
        RequestMethods[RequestMethods["DELETE"] = 3] = "DELETE";
        RequestMethods[RequestMethods["OPTIONS"] = 4] = "OPTIONS";
        RequestMethods[RequestMethods["HEAD"] = 5] = "HEAD";
        RequestMethods[RequestMethods["PATCH"] = 6] = "PATCH";
      })(RequestMethods || ($__export("RequestMethods", RequestMethods = {})));
      RequestMethodsMap = (function() {
        function RequestMethodsMap() {
          this._methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'];
        }
        return ($traceurRuntime.createClass)(RequestMethodsMap, {getMethod: function(method) {
            return this._methods[method];
          }}, {});
      }());
      $__export("RequestMethodsMap", RequestMethodsMap);
      $__export("ReadyStates", ReadyStates);
      (function(ReadyStates) {
        ReadyStates[ReadyStates["UNSENT"] = 0] = "UNSENT";
        ReadyStates[ReadyStates["OPEN"] = 1] = "OPEN";
        ReadyStates[ReadyStates["HEADERS_RECEIVED"] = 2] = "HEADERS_RECEIVED";
        ReadyStates[ReadyStates["LOADING"] = 3] = "LOADING";
        ReadyStates[ReadyStates["DONE"] = 4] = "DONE";
        ReadyStates[ReadyStates["CANCELLED"] = 5] = "CANCELLED";
      })(ReadyStates || ($__export("ReadyStates", ReadyStates = {})));
      $__export("ResponseTypes", ResponseTypes);
      (function(ResponseTypes) {
        ResponseTypes[ResponseTypes["Basic"] = 0] = "Basic";
        ResponseTypes[ResponseTypes["Cors"] = 1] = "Cors";
        ResponseTypes[ResponseTypes["Default"] = 2] = "Default";
        ResponseTypes[ResponseTypes["Error"] = 3] = "Error";
        ResponseTypes[ResponseTypes["Opaque"] = 4] = "Opaque";
      })(ResponseTypes || ($__export("ResponseTypes", ResponseTypes = {})));
    }
  };
});

System.register("http/src/http_utils", ["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "http/src/http_utils";
  return {
    setters: [function($__m) {
      $__export("isJsObject", $__m.isJsObject);
    }],
    execute: function() {}
  };
});

System.register("http/src/base_response_options", ["angular2/di", "angular2/src/facade/lang", "http/src/headers", "http/src/enums"], function($__export) {
  "use strict";
  var __moduleName = "http/src/base_response_options";
  var __decorate,
      __metadata,
      Injectable,
      isPresent,
      Headers,
      ResponseTypes,
      ResponseOptions,
      BaseResponseOptions;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      Headers = $__m.Headers;
    }, function($__m) {
      ResponseTypes = $__m.ResponseTypes;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      ResponseOptions = (function() {
        function ResponseOptions() {
          var $__2 = arguments[0] !== (void 0) ? arguments[0] : {},
              body = $__2.body,
              status = $__2.status,
              headers = $__2.headers,
              statusText = $__2.statusText,
              type = $__2.type,
              url = $__2.url;
          this.body = isPresent(body) ? body : null;
          this.status = isPresent(status) ? status : null;
          this.headers = isPresent(headers) ? headers : null;
          this.statusText = isPresent(statusText) ? statusText : null;
          this.type = isPresent(type) ? type : null;
          this.url = isPresent(url) ? url : null;
        }
        return ($traceurRuntime.createClass)(ResponseOptions, {merge: function(options) {
            return new ResponseOptions({
              body: isPresent(options) && isPresent(options.body) ? options.body : this.body,
              status: isPresent(options) && isPresent(options.status) ? options.status : this.status,
              headers: isPresent(options) && isPresent(options.headers) ? options.headers : this.headers,
              statusText: isPresent(options) && isPresent(options.statusText) ? options.statusText : this.statusText,
              type: isPresent(options) && isPresent(options.type) ? options.type : this.type,
              url: isPresent(options) && isPresent(options.url) ? options.url : this.url
            });
          }}, {});
      }());
      $__export("ResponseOptions", ResponseOptions);
      BaseResponseOptions = (function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).call(this, {
            status: 200,
            statusText: 'Ok',
            type: ResponseTypes.Default,
            headers: new Headers()
          });
        }
        return ($traceurRuntime.createClass)($__0, {}, {}, $__super);
      }(ResponseOptions));
      $__export("BaseResponseOptions", BaseResponseOptions);
      $__export("BaseResponseOptions", BaseResponseOptions = __decorate([Injectable(), __metadata('design:paramtypes', [])], BaseResponseOptions));
    }
  };
});

System.register("http/src/backends/browser_xhr", ["angular2/di"], function($__export) {
  "use strict";
  var __moduleName = "http/src/backends/browser_xhr";
  var __decorate,
      __metadata,
      Injectable,
      BrowserXhr;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      BrowserXhr = (($traceurRuntime.createClass)(function() {}, {build: function() {
          return (new XMLHttpRequest());
        }}, {}));
      $__export("BrowserXhr", BrowserXhr);
      $__export("BrowserXhr", BrowserXhr = __decorate([Injectable(), __metadata('design:paramtypes', [])], BrowserXhr));
    }
  };
});

System.register("http/src/backends/browser_jsonp", ["angular2/di", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "http/src/backends/browser_jsonp";
  var __decorate,
      __metadata,
      Injectable,
      global,
      _nextRequestId,
      JSONP_HOME,
      _jsonpConnections,
      BrowserJsonp;
  function _getJsonpConnections() {
    if (_jsonpConnections === null) {
      _jsonpConnections = global[JSONP_HOME] = {};
    }
    return _jsonpConnections;
  }
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      global = $__m.global;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      _nextRequestId = 0;
      JSONP_HOME = '__ng_jsonp__';
      $__export("JSONP_HOME", JSONP_HOME);
      _jsonpConnections = null;
      BrowserJsonp = (($traceurRuntime.createClass)(function() {}, {
        build: function(url) {
          var node = document.createElement('script');
          node.src = url;
          return node;
        },
        nextRequestID: function() {
          return ("__req" + _nextRequestId++);
        },
        requestCallback: function(id) {
          return (JSONP_HOME + "." + id + ".finished");
        },
        exposeConnection: function(id, connection) {
          var connections = _getJsonpConnections();
          connections[id] = connection;
        },
        removeConnection: function(id) {
          var connections = _getJsonpConnections();
          connections[id] = null;
        },
        send: function(node) {
          document.body.appendChild((node));
        },
        cleanup: function(node) {
          if (node.parentNode) {
            node.parentNode.removeChild((node));
          }
        }
      }, {}));
      $__export("BrowserJsonp", BrowserJsonp);
      $__export("BrowserJsonp", BrowserJsonp = __decorate([Injectable(), __metadata('design:paramtypes', [])], BrowserJsonp));
    }
  };
});

System.register("http/src/backends/mock_backend", ["angular2/di", "http/src/static_request", "http/src/enums", "http/src/interfaces", "angular2/src/facade/async", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "http/src/backends/mock_backend";
  var __decorate,
      __metadata,
      Injectable,
      Request,
      ReadyStates,
      Connection,
      ConnectionBackend,
      ObservableWrapper,
      EventEmitter,
      isPresent,
      IMPLEMENTS,
      BaseException,
      MockConnection,
      MockBackend;
  return {
    setters: [function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      Request = $__m.Request;
    }, function($__m) {
      ReadyStates = $__m.ReadyStates;
    }, function($__m) {
      Connection = $__m.Connection;
      ConnectionBackend = $__m.ConnectionBackend;
    }, function($__m) {
      ObservableWrapper = $__m.ObservableWrapper;
      EventEmitter = $__m.EventEmitter;
    }, function($__m) {
      isPresent = $__m.isPresent;
      IMPLEMENTS = $__m.IMPLEMENTS;
      BaseException = $__m.BaseException;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      MockConnection = (($traceurRuntime.createClass)(function(req) {
        this.response = new EventEmitter();
        this.readyState = ReadyStates.OPEN;
        this.request = req;
      }, {
        dispose: function() {
          if (this.readyState !== ReadyStates.DONE) {
            this.readyState = ReadyStates.CANCELLED;
          }
        },
        mockRespond: function(res) {
          if (this.readyState === ReadyStates.DONE || this.readyState === ReadyStates.CANCELLED) {
            throw new BaseException('Connection has already been resolved');
          }
          this.readyState = ReadyStates.DONE;
          ObservableWrapper.callNext(this.response, res);
          ObservableWrapper.callReturn(this.response);
        },
        mockDownload: function(res) {},
        mockError: function(err) {
          this.readyState = ReadyStates.DONE;
          ObservableWrapper.callThrow(this.response, err);
          ObservableWrapper.callReturn(this.response);
        }
      }, {}));
      $__export("MockConnection", MockConnection);
      $__export("MockConnection", MockConnection = __decorate([IMPLEMENTS(Connection), __metadata('design:paramtypes', [Request])], MockConnection));
      MockBackend = (($traceurRuntime.createClass)(function() {
        var $__0 = this;
        this.connectionsArray = [];
        this.connections = new EventEmitter();
        ObservableWrapper.subscribe(this.connections, (function(connection) {
          return $__0.connectionsArray.push(connection);
        }));
        this.pendingConnections = new EventEmitter();
      }, {
        verifyNoPendingRequests: function() {
          var pending = 0;
          ObservableWrapper.subscribe(this.pendingConnections, (function(c) {
            return pending++;
          }));
          if (pending > 0)
            throw new BaseException((pending + " pending connections to be resolved"));
        },
        resolveAllConnections: function() {
          ObservableWrapper.subscribe(this.connections, (function(c) {
            return c.readyState = 4;
          }));
        },
        createConnection: function(req) {
          if (!isPresent(req) || !(req instanceof Request)) {
            throw new BaseException(("createConnection requires an instance of Request, got " + req));
          }
          var connection = new MockConnection(req);
          ObservableWrapper.callNext(this.connections, connection);
          return connection;
        }
      }, {}));
      $__export("MockBackend", MockBackend);
      $__export("MockBackend", MockBackend = __decorate([Injectable(), IMPLEMENTS(ConnectionBackend), __metadata('design:paramtypes', [])], MockBackend));
    }
  };
});

System.register("angular2/src/di/metadata", ["angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/di/metadata";
  var __decorate,
      __metadata,
      CONST,
      stringify,
      InjectMetadata,
      OptionalMetadata,
      DependencyMetadata,
      InjectableMetadata,
      SelfMetadata,
      SkipSelfMetadata,
      HostMetadata;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
      stringify = $__m.stringify;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      InjectMetadata = (($traceurRuntime.createClass)(function(token) {
        this.token = token;
      }, {toString: function() {
          return ("@Inject(" + stringify(this.token) + ")");
        }}, {}));
      $__export("InjectMetadata", InjectMetadata);
      $__export("InjectMetadata", InjectMetadata = __decorate([CONST(), __metadata('design:paramtypes', [Object])], InjectMetadata));
      OptionalMetadata = (($traceurRuntime.createClass)(function() {}, {toString: function() {
          return "@Optional()";
        }}, {}));
      $__export("OptionalMetadata", OptionalMetadata);
      $__export("OptionalMetadata", OptionalMetadata = __decorate([CONST(), __metadata('design:paramtypes', [])], OptionalMetadata));
      DependencyMetadata = (($traceurRuntime.createClass)(function() {}, {get token() {
          return null;
        }}, {}));
      $__export("DependencyMetadata", DependencyMetadata);
      $__export("DependencyMetadata", DependencyMetadata = __decorate([CONST(), __metadata('design:paramtypes', [])], DependencyMetadata));
      InjectableMetadata = (($traceurRuntime.createClass)(function() {}, {}, {}));
      $__export("InjectableMetadata", InjectableMetadata);
      $__export("InjectableMetadata", InjectableMetadata = __decorate([CONST(), __metadata('design:paramtypes', [])], InjectableMetadata));
      SelfMetadata = (($traceurRuntime.createClass)(function() {}, {toString: function() {
          return "@Self()";
        }}, {}));
      $__export("SelfMetadata", SelfMetadata);
      $__export("SelfMetadata", SelfMetadata = __decorate([CONST(), __metadata('design:paramtypes', [])], SelfMetadata));
      SkipSelfMetadata = (($traceurRuntime.createClass)(function() {}, {toString: function() {
          return "@SkipSelf()";
        }}, {}));
      $__export("SkipSelfMetadata", SkipSelfMetadata);
      $__export("SkipSelfMetadata", SkipSelfMetadata = __decorate([CONST(), __metadata('design:paramtypes', [])], SkipSelfMetadata));
      HostMetadata = (($traceurRuntime.createClass)(function() {}, {toString: function() {
          return "@Host()";
        }}, {}));
      $__export("HostMetadata", HostMetadata);
      $__export("HostMetadata", HostMetadata = __decorate([CONST(), __metadata('design:paramtypes', [])], HostMetadata));
    }
  };
});

System.register("angular2/src/di/decorators", ["angular2/src/di/metadata", "angular2/src/util/decorators"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/di/decorators";
  var InjectMetadata,
      OptionalMetadata,
      InjectableMetadata,
      SelfMetadata,
      HostMetadata,
      SkipSelfMetadata,
      makeDecorator,
      makeParamDecorator,
      Inject,
      Optional,
      Injectable,
      Self,
      Host,
      SkipSelf;
  return {
    setters: [function($__m) {
      InjectMetadata = $__m.InjectMetadata;
      OptionalMetadata = $__m.OptionalMetadata;
      InjectableMetadata = $__m.InjectableMetadata;
      SelfMetadata = $__m.SelfMetadata;
      HostMetadata = $__m.HostMetadata;
      SkipSelfMetadata = $__m.SkipSelfMetadata;
    }, function($__m) {
      makeDecorator = $__m.makeDecorator;
      makeParamDecorator = $__m.makeParamDecorator;
    }],
    execute: function() {
      Inject = makeParamDecorator(InjectMetadata);
      $__export("Inject", Inject);
      Optional = makeParamDecorator(OptionalMetadata);
      $__export("Optional", Optional);
      Injectable = makeDecorator(InjectableMetadata);
      $__export("Injectable", Injectable);
      Self = makeParamDecorator(SelfMetadata);
      $__export("Self", Self);
      Host = makeParamDecorator(HostMetadata);
      $__export("Host", Host);
      SkipSelf = makeParamDecorator(SkipSelfMetadata);
      $__export("SkipSelf", SkipSelf);
    }
  };
});

System.register("angular2/src/reflection/reflection", ["angular2/src/reflection/reflector", "angular2/src/reflection/reflection_capabilities"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/reflection/reflection";
  var Reflector,
      ReflectionCapabilities,
      reflector;
  return {
    setters: [function($__m) {
      Reflector = $__m.Reflector;
      $__export("Reflector", $__m.Reflector);
      $__export("ReflectionInfo", $__m.ReflectionInfo);
    }, function($__m) {
      ReflectionCapabilities = $__m.ReflectionCapabilities;
    }],
    execute: function() {
      reflector = new Reflector(new ReflectionCapabilities());
      $__export("reflector", reflector);
    }
  };
});

System.register("angular2/src/di/key", ["angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/di/type_literal", "angular2/src/di/forward_ref"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/di/key";
  var MapWrapper,
      stringify,
      isBlank,
      BaseException,
      TypeLiteral,
      resolveForwardRef,
      Key,
      KeyRegistry,
      _globalKeyRegistry;
  return {
    setters: [function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      stringify = $__m.stringify;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      TypeLiteral = $__m.TypeLiteral;
      $__export("TypeLiteral", $__m.TypeLiteral);
    }, function($__m) {
      resolveForwardRef = $__m.resolveForwardRef;
    }],
    execute: function() {
      Key = (function() {
        function Key(token, id) {
          this.token = token;
          this.id = id;
          if (isBlank(token)) {
            throw new BaseException('Token must be defined!');
          }
        }
        return ($traceurRuntime.createClass)(Key, {get displayName() {
            return stringify(this.token);
          }}, {
          get: function(token) {
            return _globalKeyRegistry.get(resolveForwardRef(token));
          },
          get numberOfKeys() {
            return _globalKeyRegistry.numberOfKeys;
          }
        });
      }());
      $__export("Key", Key);
      KeyRegistry = (function() {
        function KeyRegistry() {
          this._allKeys = new Map();
        }
        return ($traceurRuntime.createClass)(KeyRegistry, {
          get: function(token) {
            if (token instanceof Key)
              return token;
            var theToken = token;
            if (token instanceof TypeLiteral) {
              theToken = token.type;
            }
            token = theToken;
            if (this._allKeys.has(token)) {
              return this._allKeys.get(token);
            }
            var newKey = new Key(token, Key.numberOfKeys);
            this._allKeys.set(token, newKey);
            return newKey;
          },
          get numberOfKeys() {
            return MapWrapper.size(this._allKeys);
          }
        }, {});
      }());
      $__export("KeyRegistry", KeyRegistry);
      _globalKeyRegistry = new KeyRegistry();
    }
  };
});

System.register("http/src/interfaces", ["angular2/src/facade/lang", "http/src/url_search_params"], function($__export) {
  "use strict";
  var __moduleName = "http/src/interfaces";
  var BaseException,
      URLSearchParamsUnionFixer,
      URLSearchParams_UnionFixer,
      ConnectionBackend,
      Connection;
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
    }, function($__m) {
      URLSearchParamsUnionFixer = $__m.URLSearchParamsUnionFixer;
    }],
    execute: function() {
      URLSearchParams_UnionFixer = URLSearchParamsUnionFixer;
      ConnectionBackend = (function() {
        function ConnectionBackend() {}
        return ($traceurRuntime.createClass)(ConnectionBackend, {createConnection: function(request) {
            throw new BaseException('Abstract!');
          }}, {});
      }());
      $__export("ConnectionBackend", ConnectionBackend);
      Connection = (function() {
        function Connection() {}
        return ($traceurRuntime.createClass)(Connection, {dispose: function() {
            throw new BaseException('Abstract!');
          }}, {});
      }());
      $__export("Connection", Connection);
    }
  };
});

System.register("http/src/static_request", ["http/src/headers", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "http/src/static_request";
  var Headers,
      isPresent,
      StringWrapper,
      Request;
  return {
    setters: [function($__m) {
      Headers = $__m.Headers;
    }, function($__m) {
      isPresent = $__m.isPresent;
      StringWrapper = $__m.StringWrapper;
    }],
    execute: function() {
      Request = (function() {
        function Request(requestOptions) {
          var url = requestOptions.url;
          this.url = requestOptions.url;
          if (isPresent(requestOptions.search)) {
            var search = requestOptions.search.toString();
            if (search.length > 0) {
              var prefix = '?';
              if (StringWrapper.contains(this.url, '?')) {
                prefix = (this.url[this.url.length - 1] == '&') ? '' : '&';
              }
              this.url = url + prefix + search;
            }
          }
          this._body = requestOptions.body;
          this.method = requestOptions.method;
          this.mode = requestOptions.mode;
          this.credentials = requestOptions.credentials;
          this.headers = new Headers(requestOptions.headers);
          this.cache = requestOptions.cache;
        }
        return ($traceurRuntime.createClass)(Request, {text: function() {
            return isPresent(this._body) ? this._body.toString() : '';
          }}, {});
      }());
      $__export("Request", Request);
    }
  };
});

System.register("http/src/base_request_options", ["angular2/src/facade/lang", "http/src/headers", "http/src/enums", "angular2/di", "http/src/url_search_params"], function($__export) {
  "use strict";
  var __moduleName = "http/src/base_request_options";
  var __decorate,
      __metadata,
      isPresent,
      isString,
      Headers,
      RequestModesOpts,
      RequestMethods,
      Injectable,
      URLSearchParams,
      RequestOptions,
      BaseRequestOptions;
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
      isString = $__m.isString;
    }, function($__m) {
      Headers = $__m.Headers;
    }, function($__m) {
      RequestModesOpts = $__m.RequestModesOpts;
      RequestMethods = $__m.RequestMethods;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      URLSearchParams = $__m.URLSearchParams;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      RequestOptions = (function() {
        function RequestOptions() {
          var $__2 = arguments[0] !== (void 0) ? arguments[0] : {},
              method = $__2.method,
              headers = $__2.headers,
              body = $__2.body,
              mode = $__2.mode,
              credentials = $__2.credentials,
              cache = $__2.cache,
              url = $__2.url,
              search = $__2.search;
          this.method = isPresent(method) ? method : null;
          this.headers = isPresent(headers) ? headers : null;
          this.body = isPresent(body) ? body : null;
          this.mode = isPresent(mode) ? mode : null;
          this.credentials = isPresent(credentials) ? credentials : null;
          this.cache = isPresent(cache) ? cache : null;
          this.url = isPresent(url) ? url : null;
          this.search = isPresent(search) ? (isString(search) ? new URLSearchParams((search)) : (search)) : null;
        }
        return ($traceurRuntime.createClass)(RequestOptions, {merge: function(options) {
            return new RequestOptions({
              method: isPresent(options) && isPresent(options.method) ? options.method : this.method,
              headers: isPresent(options) && isPresent(options.headers) ? options.headers : this.headers,
              body: isPresent(options) && isPresent(options.body) ? options.body : this.body,
              mode: isPresent(options) && isPresent(options.mode) ? options.mode : this.mode,
              credentials: isPresent(options) && isPresent(options.credentials) ? options.credentials : this.credentials,
              cache: isPresent(options) && isPresent(options.cache) ? options.cache : this.cache,
              url: isPresent(options) && isPresent(options.url) ? options.url : this.url,
              search: isPresent(options) && isPresent(options.search) ? (isString(options.search) ? new URLSearchParams((options.search)) : (options.search).clone()) : this.search
            });
          }}, {});
      }());
      $__export("RequestOptions", RequestOptions);
      BaseRequestOptions = (function($__super) {
        function $__0() {
          $traceurRuntime.superConstructor($__0).call(this, {
            method: RequestMethods.GET,
            headers: new Headers(),
            mode: RequestModesOpts.Cors
          });
        }
        return ($traceurRuntime.createClass)($__0, {}, {}, $__super);
      }(RequestOptions));
      $__export("BaseRequestOptions", BaseRequestOptions);
      $__export("BaseRequestOptions", BaseRequestOptions = __decorate([Injectable(), __metadata('design:paramtypes', [])], BaseRequestOptions));
    }
  };
});

System.register("http/src/static_response", ["angular2/src/facade/lang", "http/src/http_utils"], function($__export) {
  "use strict";
  var __moduleName = "http/src/static_response";
  var BaseException,
      isString,
      Json,
      isJsObject,
      Response;
  return {
    setters: [function($__m) {
      BaseException = $__m.BaseException;
      isString = $__m.isString;
      Json = $__m.Json;
    }, function($__m) {
      isJsObject = $__m.isJsObject;
    }],
    execute: function() {
      Response = (function() {
        function Response(responseOptions) {
          this._body = responseOptions.body;
          this.status = responseOptions.status;
          this.statusText = responseOptions.statusText;
          this.headers = responseOptions.headers;
          this.type = responseOptions.type;
          this.url = responseOptions.url;
        }
        return ($traceurRuntime.createClass)(Response, {
          blob: function() {
            throw new BaseException('"blob()" method not implemented on Response superclass');
          },
          json: function() {
            var jsonResponse;
            if (isJsObject(this._body)) {
              jsonResponse = this._body;
            } else if (isString(this._body)) {
              jsonResponse = Json.parse(this._body);
            }
            return jsonResponse;
          },
          text: function() {
            return this._body.toString();
          },
          arrayBuffer: function() {
            throw new BaseException('"arrayBuffer()" method not implemented on Response superclass');
          }
        }, {});
      }());
      $__export("Response", Response);
    }
  };
});

System.register("angular2/src/facade/async", ["angular2/src/facade/lang", "rx"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/facade/async";
  var global,
      Rx,
      PromiseWrapper,
      TimerWrapper,
      ObservableWrapper,
      Observable,
      EventEmitter;
  return {
    setters: [function($__m) {
      global = $__m.global;
    }, function($__m) {
      Rx = $__m;
    }],
    execute: function() {
      $__export("Promise", Promise);
      PromiseWrapper = (function() {
        function PromiseWrapper() {}
        return ($traceurRuntime.createClass)(PromiseWrapper, {}, {
          resolve: function(obj) {
            return Promise.resolve(obj);
          },
          reject: function(obj, _) {
            return Promise.reject(obj);
          },
          catchError: function(promise, onError) {
            return promise.catch(onError);
          },
          all: function(promises) {
            if (promises.length == 0)
              return Promise.resolve([]);
            return Promise.all(promises);
          },
          then: function(promise, success, rejection) {
            return promise.then(success, rejection);
          },
          wrap: function(computation) {
            return new Promise((function(res, rej) {
              try {
                res(computation());
              } catch (e) {
                rej(e);
              }
            }));
          },
          completer: function() {
            var resolve;
            var reject;
            var p = new Promise(function(res, rej) {
              resolve = res;
              reject = rej;
            });
            return {
              promise: p,
              resolve: resolve,
              reject: reject
            };
          }
        });
      }());
      $__export("PromiseWrapper", PromiseWrapper);
      TimerWrapper = (function() {
        function TimerWrapper() {}
        return ($traceurRuntime.createClass)(TimerWrapper, {}, {
          setTimeout: function(fn, millis) {
            return global.setTimeout(fn, millis);
          },
          clearTimeout: function(id) {
            global.clearTimeout(id);
          },
          setInterval: function(fn, millis) {
            return global.setInterval(fn, millis);
          },
          clearInterval: function(id) {
            global.clearInterval(id);
          }
        });
      }());
      $__export("TimerWrapper", TimerWrapper);
      ObservableWrapper = (function() {
        function ObservableWrapper() {}
        return ($traceurRuntime.createClass)(ObservableWrapper, {}, {
          subscribe: function(emitter, onNext) {
            var onThrow = arguments[2] !== (void 0) ? arguments[2] : null;
            var onReturn = arguments[3] !== (void 0) ? arguments[3] : null;
            return emitter.observer({
              next: onNext,
              throw: onThrow,
              return: onReturn
            });
          },
          isObservable: function(obs) {
            return obs instanceof Observable;
          },
          dispose: function(subscription) {
            subscription.dispose();
          },
          callNext: function(emitter, value) {
            emitter.next(value);
          },
          callThrow: function(emitter, error) {
            emitter.throw(error);
          },
          callReturn: function(emitter) {
            emitter.return(null);
          }
        });
      }());
      $__export("ObservableWrapper", ObservableWrapper);
      Observable = (function() {
        function Observable() {}
        return ($traceurRuntime.createClass)(Observable, {observer: function(generator) {
            return null;
          }}, {});
      }());
      $__export("Observable", Observable);
      EventEmitter = (function($__super) {
        function EventEmitter() {
          $traceurRuntime.superConstructor(EventEmitter).call(this);
          this._subject = new Rx.Subject();
          this._immediateScheduler = Rx.Scheduler.immediate;
        }
        return ($traceurRuntime.createClass)(EventEmitter, {
          observer: function(generator) {
            return this._subject.observeOn(this._immediateScheduler).subscribe((function(value) {
              setTimeout((function() {
                return generator.next(value);
              }));
            }), (function(error) {
              return generator.throw ? generator.throw(error) : null;
            }), (function() {
              return generator.return ? generator.return() : null;
            }));
          },
          toRx: function() {
            return this._subject;
          },
          next: function(value) {
            this._subject.onNext(value);
          },
          throw: function(error) {
            this._subject.onError(error);
          },
          return: function(value) {
            this._subject.onCompleted();
          }
        }, {}, $__super);
      }(Observable));
      $__export("EventEmitter", EventEmitter);
    }
  };
});

System.register("http/src/backends/jsonp_backend", ["http/src/enums", "http/src/static_response", "http/src/base_response_options", "angular2/di", "http/src/backends/browser_jsonp", "angular2/src/facade/async", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "http/src/backends/jsonp_backend";
  var __decorate,
      __metadata,
      ReadyStates,
      RequestMethods,
      Response,
      ResponseOptions,
      Injectable,
      BrowserJsonp,
      EventEmitter,
      ObservableWrapper,
      StringWrapper,
      isPresent,
      makeTypeError,
      JSONPConnection,
      JSONPBackend;
  return {
    setters: [function($__m) {
      ReadyStates = $__m.ReadyStates;
      RequestMethods = $__m.RequestMethods;
    }, function($__m) {
      Response = $__m.Response;
    }, function($__m) {
      ResponseOptions = $__m.ResponseOptions;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      BrowserJsonp = $__m.BrowserJsonp;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
      makeTypeError = $__m.makeTypeError;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      JSONPConnection = (function() {
        function JSONPConnection(req, _dom, baseResponseOptions) {
          var $__0 = this;
          this._dom = _dom;
          this.baseResponseOptions = baseResponseOptions;
          this._finished = false;
          if (req.method !== RequestMethods.GET) {
            throw makeTypeError("JSONP requests must use GET request method.");
          }
          this.request = req;
          this.response = new EventEmitter();
          this.readyState = ReadyStates.LOADING;
          this._id = _dom.nextRequestID();
          _dom.exposeConnection(this._id, this);
          var callback = _dom.requestCallback(this._id);
          var url = req.url;
          if (url.indexOf('=JSONP_CALLBACK&') > -1) {
            url = StringWrapper.replace(url, '=JSONP_CALLBACK&', ("=" + callback + "&"));
          } else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
            url = StringWrapper.substring(url, 0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
          }
          var script = this._script = _dom.build(url);
          script.addEventListener('load', (function(event) {
            if ($__0.readyState === ReadyStates.CANCELLED)
              return ;
            $__0.readyState = ReadyStates.DONE;
            _dom.cleanup(script);
            if (!$__0._finished) {
              ObservableWrapper.callThrow($__0.response, makeTypeError('JSONP injected script did not invoke callback.'));
              return ;
            }
            var responseOptions = new ResponseOptions({body: $__0._responseData});
            if (isPresent($__0.baseResponseOptions)) {
              responseOptions = $__0.baseResponseOptions.merge(responseOptions);
            }
            ObservableWrapper.callNext($__0.response, new Response(responseOptions));
          }));
          script.addEventListener('error', (function(error) {
            if ($__0.readyState === ReadyStates.CANCELLED)
              return ;
            $__0.readyState = ReadyStates.DONE;
            _dom.cleanup(script);
            ObservableWrapper.callThrow($__0.response, error);
          }));
          _dom.send(script);
        }
        return ($traceurRuntime.createClass)(JSONPConnection, {
          finished: function(data) {
            this._finished = true;
            this._dom.removeConnection(this._id);
            if (this.readyState === ReadyStates.CANCELLED)
              return ;
            this._responseData = data;
          },
          dispose: function() {
            this.readyState = ReadyStates.CANCELLED;
            var script = this._script;
            this._script = null;
            if (isPresent(script)) {
              this._dom.cleanup(script);
            }
            ObservableWrapper.callReturn(this.response);
          }
        }, {});
      }());
      $__export("JSONPConnection", JSONPConnection);
      JSONPBackend = (($traceurRuntime.createClass)(function(_browserJSONP, _baseResponseOptions) {
        this._browserJSONP = _browserJSONP;
        this._baseResponseOptions = _baseResponseOptions;
      }, {createConnection: function(request) {
          return new JSONPConnection(request, this._browserJSONP, this._baseResponseOptions);
        }}, {}));
      $__export("JSONPBackend", JSONPBackend);
      $__export("JSONPBackend", JSONPBackend = __decorate([Injectable(), __metadata('design:paramtypes', [BrowserJsonp, ResponseOptions])], JSONPBackend));
    }
  };
});

System.register("angular2/src/di/binding", ["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/reflection/reflection", "angular2/src/di/key", "angular2/src/di/metadata", "angular2/src/di/exceptions", "angular2/src/di/forward_ref"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/di/binding";
  var __decorate,
      __metadata,
      Type,
      isBlank,
      isPresent,
      CONST,
      CONST_EXPR,
      BaseException,
      stringify,
      isArray,
      ListWrapper,
      reflector,
      Key,
      InjectMetadata,
      OptionalMetadata,
      SelfMetadata,
      HostMetadata,
      SkipSelfMetadata,
      DependencyMetadata,
      NoAnnotationError,
      resolveForwardRef,
      Dependency,
      _EMPTY_LIST,
      Binding,
      ResolvedBinding,
      BindingBuilder;
  function bind(token) {
    return new BindingBuilder(token);
  }
  function _constructDependencies(factoryFunction, dependencies) {
    if (isBlank(dependencies)) {
      return _dependenciesFor(factoryFunction);
    } else {
      var params = ListWrapper.map(dependencies, (function(t) {
        return [t];
      }));
      return ListWrapper.map(dependencies, (function(t) {
        return _extractToken(factoryFunction, t, params);
      }));
    }
  }
  function _dependenciesFor(typeOrFunc) {
    var params = reflector.parameters(typeOrFunc);
    if (isBlank(params))
      return [];
    if (ListWrapper.any(params, (function(p) {
      return isBlank(p);
    }))) {
      throw new NoAnnotationError(typeOrFunc, params);
    }
    return ListWrapper.map(params, (function(p) {
      return _extractToken(typeOrFunc, p, params);
    }));
  }
  function _extractToken(typeOrFunc, metadata, params) {
    var depProps = [];
    var token = null;
    var optional = false;
    if (!isArray(metadata)) {
      return _createDependency(metadata, optional, null, null, depProps);
    }
    var lowerBoundVisibility = null;
    var upperBoundVisibility = null;
    for (var i = 0; i < metadata.length; ++i) {
      var paramMetadata = metadata[i];
      if (paramMetadata instanceof Type) {
        token = paramMetadata;
      } else if (paramMetadata instanceof InjectMetadata) {
        token = paramMetadata.token;
      } else if (paramMetadata instanceof OptionalMetadata) {
        optional = true;
      } else if (paramMetadata instanceof SelfMetadata) {
        upperBoundVisibility = paramMetadata;
      } else if (paramMetadata instanceof HostMetadata) {
        upperBoundVisibility = paramMetadata;
      } else if (paramMetadata instanceof SkipSelfMetadata) {
        lowerBoundVisibility = paramMetadata;
      } else if (paramMetadata instanceof DependencyMetadata) {
        if (isPresent(paramMetadata.token)) {
          token = paramMetadata.token;
        }
        depProps.push(paramMetadata);
      }
    }
    token = resolveForwardRef(token);
    if (isPresent(token)) {
      return _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps);
    } else {
      throw new NoAnnotationError(typeOrFunc, params);
    }
  }
  function _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps) {
    return new Dependency(Key.get(token), optional, lowerBoundVisibility, upperBoundVisibility, depProps);
  }
  $__export("bind", bind);
  return {
    setters: [function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      CONST = $__m.CONST;
      CONST_EXPR = $__m.CONST_EXPR;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
      isArray = $__m.isArray;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      Key = $__m.Key;
    }, function($__m) {
      InjectMetadata = $__m.InjectMetadata;
      OptionalMetadata = $__m.OptionalMetadata;
      SelfMetadata = $__m.SelfMetadata;
      HostMetadata = $__m.HostMetadata;
      SkipSelfMetadata = $__m.SkipSelfMetadata;
      DependencyMetadata = $__m.DependencyMetadata;
    }, function($__m) {
      NoAnnotationError = $__m.NoAnnotationError;
    }, function($__m) {
      resolveForwardRef = $__m.resolveForwardRef;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Dependency = (function() {
        function Dependency(key, optional, lowerBoundVisibility, upperBoundVisibility, properties) {
          this.key = key;
          this.optional = optional;
          this.lowerBoundVisibility = lowerBoundVisibility;
          this.upperBoundVisibility = upperBoundVisibility;
          this.properties = properties;
        }
        return ($traceurRuntime.createClass)(Dependency, {}, {fromKey: function(key) {
            return new Dependency(key, false, null, null, []);
          }});
      }());
      $__export("Dependency", Dependency);
      _EMPTY_LIST = CONST_EXPR([]);
      Binding = (($traceurRuntime.createClass)(function(token, $__3) {
        var $__4 = $__3,
            toClass = $__4.toClass,
            toValue = $__4.toValue,
            toAlias = $__4.toAlias,
            toFactory = $__4.toFactory,
            deps = $__4.deps;
        this.token = token;
        this.toClass = toClass;
        this.toValue = toValue;
        this.toAlias = toAlias;
        this.toFactory = toFactory;
        this.dependencies = deps;
      }, {resolve: function() {
          var $__0 = this;
          var factoryFn;
          var resolvedDeps;
          if (isPresent(this.toClass)) {
            var toClass = resolveForwardRef(this.toClass);
            factoryFn = reflector.factory(toClass);
            resolvedDeps = _dependenciesFor(toClass);
          } else if (isPresent(this.toAlias)) {
            factoryFn = (function(aliasInstance) {
              return aliasInstance;
            });
            resolvedDeps = [Dependency.fromKey(Key.get(this.toAlias))];
          } else if (isPresent(this.toFactory)) {
            factoryFn = this.toFactory;
            resolvedDeps = _constructDependencies(this.toFactory, this.dependencies);
          } else {
            factoryFn = (function() {
              return $__0.toValue;
            });
            resolvedDeps = _EMPTY_LIST;
          }
          return new ResolvedBinding(Key.get(this.token), factoryFn, resolvedDeps);
        }}, {}));
      $__export("Binding", Binding);
      $__export("Binding", Binding = __decorate([CONST(), __metadata('design:paramtypes', [Object, Object])], Binding));
      ResolvedBinding = (function() {
        function ResolvedBinding(key, factory, dependencies) {
          this.key = key;
          this.factory = factory;
          this.dependencies = dependencies;
        }
        return ($traceurRuntime.createClass)(ResolvedBinding, {}, {});
      }());
      $__export("ResolvedBinding", ResolvedBinding);
      BindingBuilder = (function() {
        function BindingBuilder(token) {
          this.token = token;
        }
        return ($traceurRuntime.createClass)(BindingBuilder, {
          toClass: function(type) {
            return new Binding(this.token, {toClass: type});
          },
          toValue: function(value) {
            return new Binding(this.token, {toValue: value});
          },
          toAlias: function(aliasToken) {
            if (isBlank(aliasToken)) {
              throw new BaseException(("Can not alias " + stringify(this.token) + " to a blank value!"));
            }
            return new Binding(this.token, {toAlias: aliasToken});
          },
          toFactory: function(factoryFunction, dependencies) {
            return new Binding(this.token, {
              toFactory: factoryFunction,
              deps: dependencies
            });
          }
        }, {});
      }());
      $__export("BindingBuilder", BindingBuilder);
    }
  };
});

System.register("http/src/http", ["angular2/src/facade/lang", "angular2/src/di/decorators", "http/src/interfaces", "http/src/static_request", "http/src/base_request_options", "http/src/enums"], function($__export) {
  "use strict";
  var __moduleName = "http/src/http";
  var __decorate,
      __metadata,
      isString,
      isPresent,
      makeTypeError,
      Injectable,
      ConnectionBackend,
      Request,
      RequestOptions,
      RequestMethods,
      Http,
      Jsonp;
  function httpRequest(backend, request) {
    return backend.createConnection(request).response;
  }
  function mergeOptions(defaultOpts, providedOpts, method, url) {
    var newOptions = defaultOpts;
    if (isPresent(providedOpts)) {
      newOptions = newOptions.merge(new RequestOptions({
        method: providedOpts.method,
        url: providedOpts.url,
        search: providedOpts.search,
        headers: providedOpts.headers,
        body: providedOpts.body,
        mode: providedOpts.mode,
        credentials: providedOpts.credentials,
        cache: providedOpts.cache
      }));
    }
    if (isPresent(method)) {
      return newOptions.merge(new RequestOptions({
        method: method,
        url: url
      }));
    } else {
      return newOptions.merge(new RequestOptions({url: url}));
    }
  }
  return {
    setters: [function($__m) {
      isString = $__m.isString;
      isPresent = $__m.isPresent;
      makeTypeError = $__m.makeTypeError;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      ConnectionBackend = $__m.ConnectionBackend;
    }, function($__m) {
      Request = $__m.Request;
    }, function($__m) {
      RequestOptions = $__m.RequestOptions;
    }, function($__m) {
      RequestMethods = $__m.RequestMethods;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      Http = (($traceurRuntime.createClass)(function(_backend, _defaultOptions) {
        this._backend = _backend;
        this._defaultOptions = _defaultOptions;
      }, {
        request: function(url, options) {
          var responseObservable;
          if (isString(url)) {
            responseObservable = httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethods.GET, url)));
          } else if (url instanceof Request) {
            responseObservable = httpRequest(this._backend, url);
          }
          return responseObservable;
        },
        get: function(url, options) {
          return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethods.GET, url)));
        },
        post: function(url, body, options) {
          return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({body: body})), options, RequestMethods.POST, url)));
        },
        put: function(url, body, options) {
          return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({body: body})), options, RequestMethods.PUT, url)));
        },
        delete: function(url, options) {
          return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethods.DELETE, url)));
        },
        patch: function(url, body, options) {
          return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions.merge(new RequestOptions({body: body})), options, RequestMethods.PATCH, url)));
        },
        head: function(url, options) {
          return httpRequest(this._backend, new Request(mergeOptions(this._defaultOptions, options, RequestMethods.HEAD, url)));
        }
      }, {}));
      $__export("Http", Http);
      $__export("Http", Http = __decorate([Injectable(), __metadata('design:paramtypes', [ConnectionBackend, RequestOptions])], Http));
      Jsonp = (function($__super) {
        function $__0(backend, defaultOptions) {
          $traceurRuntime.superConstructor($__0).call(this, backend, defaultOptions);
        }
        return ($traceurRuntime.createClass)($__0, {request: function(url, options) {
            var responseObservable;
            if (isString(url)) {
              url = new Request(mergeOptions(this._defaultOptions, options, RequestMethods.GET, url));
            }
            if (url instanceof Request) {
              if (url.method !== RequestMethods.GET) {
                makeTypeError('JSONP requests must use GET request method.');
              }
              responseObservable = httpRequest(this._backend, url);
            }
            return responseObservable;
          }}, {}, $__super);
      }(Http));
      $__export("Jsonp", Jsonp);
      $__export("Jsonp", Jsonp = __decorate([Injectable(), __metadata('design:paramtypes', [ConnectionBackend, RequestOptions])], Jsonp));
    }
  };
});

System.register("http/src/backends/xhr_backend", ["http/src/enums", "http/src/static_response", "http/src/base_response_options", "angular2/di", "http/src/backends/browser_xhr", "angular2/src/facade/async", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var __moduleName = "http/src/backends/xhr_backend";
  var __decorate,
      __metadata,
      RequestMethodsMap,
      ResponseTypes,
      Response,
      ResponseOptions,
      Injectable,
      BrowserXhr,
      EventEmitter,
      ObservableWrapper,
      isPresent,
      ENUM_INDEX,
      XHRConnection,
      XHRBackend;
  return {
    setters: [function($__m) {
      RequestMethodsMap = $__m.RequestMethodsMap;
      ResponseTypes = $__m.ResponseTypes;
    }, function($__m) {
      Response = $__m.Response;
    }, function($__m) {
      ResponseOptions = $__m.ResponseOptions;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      BrowserXhr = $__m.BrowserXhr;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      ENUM_INDEX = $__m.ENUM_INDEX;
    }],
    execute: function() {
      __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
          case 2:
            return decorators.reduceRight(function(o, d) {
              return (d && d(o)) || o;
            }, target);
          case 3:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key)), void 0;
            }, void 0);
          case 4:
            return decorators.reduceRight(function(o, d) {
              return (d && d(target, key, o)) || o;
            }, desc);
        }
      };
      __metadata = (this && this.__metadata) || function(k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(k, v);
      };
      XHRConnection = (function() {
        function XHRConnection(req, browserXHR, baseResponseOptions) {
          var $__0 = this;
          var requestMethodsMap = new RequestMethodsMap();
          this.request = req;
          this.response = new EventEmitter();
          this._xhr = browserXHR.build();
          this._xhr.open(requestMethodsMap.getMethod(ENUM_INDEX(req.method)), req.url);
          this._xhr.addEventListener('load', (function(_) {
            var response = isPresent($__0._xhr.response) ? $__0._xhr.response : $__0._xhr.responseText;
            var status = $__0._xhr.status === 1223 ? 204 : $__0._xhr.status;
            if (status === 0) {
              status = response ? 200 : 0;
            }
            var responseOptions = new ResponseOptions({
              body: response,
              status: status
            });
            if (isPresent(baseResponseOptions)) {
              responseOptions = baseResponseOptions.merge(responseOptions);
            }
            ObservableWrapper.callNext($__0.response, new Response(responseOptions));
            ObservableWrapper.callReturn($__0.response);
          }));
          this._xhr.addEventListener('error', (function(err) {
            var responseOptions = new ResponseOptions({
              body: err,
              type: ResponseTypes.Error
            });
            if (isPresent(baseResponseOptions)) {
              responseOptions = baseResponseOptions.merge(responseOptions);
            }
            ObservableWrapper.callThrow($__0.response, new Response(responseOptions));
          }));
          if (isPresent(req.headers)) {
            req.headers.forEach((function(value, name) {
              $__0._xhr.setRequestHeader(name, value);
            }));
          }
          this._xhr.send(this.request.text());
        }
        return ($traceurRuntime.createClass)(XHRConnection, {dispose: function() {
            this._xhr.abort();
          }}, {});
      }());
      $__export("XHRConnection", XHRConnection);
      XHRBackend = (($traceurRuntime.createClass)(function(_browserXHR, _baseResponseOptions) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
      }, {createConnection: function(request) {
          return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
        }}, {}));
      $__export("XHRBackend", XHRBackend);
      $__export("XHRBackend", XHRBackend = __decorate([Injectable(), __metadata('design:paramtypes', [BrowserXhr, ResponseOptions])], XHRBackend));
    }
  };
});

System.register("angular2/src/di/injector", ["angular2/src/facade/collection", "angular2/src/di/binding", "angular2/src/di/exceptions", "angular2/src/facade/lang", "angular2/src/di/key", "angular2/src/di/forward_ref", "angular2/src/di/metadata"], function($__export) {
  "use strict";
  var __moduleName = "angular2/src/di/injector";
  var Map,
      List,
      MapWrapper,
      ListWrapper,
      ResolvedBinding,
      Binding,
      BindingBuilder,
      bind,
      AbstractBindingError,
      NoBindingError,
      CyclicDependencyError,
      InstantiationError,
      InvalidBindingError,
      OutOfBoundsError,
      Type,
      isPresent,
      CONST_EXPR,
      Key,
      resolveForwardRef,
      SelfMetadata,
      HostMetadata,
      SkipSelfMetadata,
      _MAX_CONSTRUCTION_COUNTER,
      UNDEFINED,
      Visibility,
      ProtoInjectorInlineStrategy,
      ProtoInjectorDynamicStrategy,
      ProtoInjector,
      InjectorInlineStrategy,
      InjectorDynamicStrategy,
      BindingWithVisibility,
      Injector,
      INJECTOR_KEY;
  function canSee(src, dst) {
    return (src === dst) || (dst === Visibility.PublicAndPrivate || src === Visibility.PublicAndPrivate);
  }
  function _resolveBindings(bindings) {
    var resolvedList = ListWrapper.createFixedSize(bindings.length);
    for (var i = 0; i < bindings.length; i++) {
      var unresolved = resolveForwardRef(bindings[i]);
      var resolved = void 0;
      if (unresolved instanceof ResolvedBinding) {
        resolved = unresolved;
      } else if (unresolved instanceof Type) {
        resolved = bind(unresolved).toClass(unresolved).resolve();
      } else if (unresolved instanceof Binding) {
        resolved = unresolved.resolve();
      } else if (unresolved instanceof List) {
        resolved = _resolveBindings(unresolved);
      } else if (unresolved instanceof BindingBuilder) {
        throw new InvalidBindingError(unresolved.token);
      } else {
        throw new InvalidBindingError(unresolved);
      }
      resolvedList[i] = resolved;
    }
    return resolvedList;
  }
  function _createListOfBindings(flattenedBindings) {
    return MapWrapper.values(flattenedBindings);
  }
  function _flattenBindings(bindings, res) {
    ListWrapper.forEach(bindings, function(b) {
      if (b instanceof ResolvedBinding) {
        res.set(b.key.id, b);
      } else if (b instanceof List) {
        _flattenBindings(b, res);
      }
    });
    return res;
  }
  function _mapBindings(injector, fn) {
    var res = [];
    for (var i = 0; i < injector._proto.numberOfBindings; ++i) {
      res.push(fn(injector._proto.getBindingAtIndex(i)));
    }
    return res;
  }
  return {
    setters: [function($__m) {
      Map = $__m.Map;
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ResolvedBinding = $__m.ResolvedBinding;
      Binding = $__m.Binding;
      BindingBuilder = $__m.BindingBuilder;
      bind = $__m.bind;
    }, function($__m) {
      AbstractBindingError = $__m.AbstractBindingError;
      NoBindingError = $__m.NoBindingError;
      CyclicDependencyError = $__m.CyclicDependencyError;
      InstantiationError = $__m.InstantiationError;
      InvalidBindingError = $__m.InvalidBindingError;
      OutOfBoundsError = $__m.OutOfBoundsError;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
      CONST_EXPR = $__m.CONST_EXPR;
    }, function($__m) {
      Key = $__m.Key;
    }, function($__m) {
      resolveForwardRef = $__m.resolveForwardRef;
    }, function($__m) {
      SelfMetadata = $__m.SelfMetadata;
      HostMetadata = $__m.HostMetadata;
      SkipSelfMetadata = $__m.SkipSelfMetadata;
    }],
    execute: function() {
      _MAX_CONSTRUCTION_COUNTER = 10;
      UNDEFINED = CONST_EXPR(new Object());
      $__export("UNDEFINED", UNDEFINED);
      $__export("Visibility", Visibility);
      (function(Visibility) {
        Visibility[Visibility["Public"] = 0] = "Public";
        Visibility[Visibility["Private"] = 1] = "Private";
        Visibility[Visibility["PublicAndPrivate"] = 2] = "PublicAndPrivate";
      })(Visibility || ($__export("Visibility", Visibility = {})));
      ProtoInjectorInlineStrategy = (function() {
        function ProtoInjectorInlineStrategy(protoEI, bwv) {
          this.binding0 = null;
          this.binding1 = null;
          this.binding2 = null;
          this.binding3 = null;
          this.binding4 = null;
          this.binding5 = null;
          this.binding6 = null;
          this.binding7 = null;
          this.binding8 = null;
          this.binding9 = null;
          this.keyId0 = null;
          this.keyId1 = null;
          this.keyId2 = null;
          this.keyId3 = null;
          this.keyId4 = null;
          this.keyId5 = null;
          this.keyId6 = null;
          this.keyId7 = null;
          this.keyId8 = null;
          this.keyId9 = null;
          this.visibility0 = null;
          this.visibility1 = null;
          this.visibility2 = null;
          this.visibility3 = null;
          this.visibility4 = null;
          this.visibility5 = null;
          this.visibility6 = null;
          this.visibility7 = null;
          this.visibility8 = null;
          this.visibility9 = null;
          var length = bwv.length;
          if (length > 0) {
            this.binding0 = bwv[0].binding;
            this.keyId0 = bwv[0].getKeyId();
            this.visibility0 = bwv[0].visibility;
          }
          if (length > 1) {
            this.binding1 = bwv[1].binding;
            this.keyId1 = bwv[1].getKeyId();
            this.visibility1 = bwv[1].visibility;
          }
          if (length > 2) {
            this.binding2 = bwv[2].binding;
            this.keyId2 = bwv[2].getKeyId();
            this.visibility2 = bwv[2].visibility;
          }
          if (length > 3) {
            this.binding3 = bwv[3].binding;
            this.keyId3 = bwv[3].getKeyId();
            this.visibility3 = bwv[3].visibility;
          }
          if (length > 4) {
            this.binding4 = bwv[4].binding;
            this.keyId4 = bwv[4].getKeyId();
            this.visibility4 = bwv[4].visibility;
          }
          if (length > 5) {
            this.binding5 = bwv[5].binding;
            this.keyId5 = bwv[5].getKeyId();
            this.visibility5 = bwv[5].visibility;
          }
          if (length > 6) {
            this.binding6 = bwv[6].binding;
            this.keyId6 = bwv[6].getKeyId();
            this.visibility6 = bwv[6].visibility;
          }
          if (length > 7) {
            this.binding7 = bwv[7].binding;
            this.keyId7 = bwv[7].getKeyId();
            this.visibility7 = bwv[7].visibility;
          }
          if (length > 8) {
            this.binding8 = bwv[8].binding;
            this.keyId8 = bwv[8].getKeyId();
            this.visibility8 = bwv[8].visibility;
          }
          if (length > 9) {
            this.binding9 = bwv[9].binding;
            this.keyId9 = bwv[9].getKeyId();
            this.visibility9 = bwv[9].visibility;
          }
        }
        return ($traceurRuntime.createClass)(ProtoInjectorInlineStrategy, {
          getBindingAtIndex: function(index) {
            if (index == 0)
              return this.binding0;
            if (index == 1)
              return this.binding1;
            if (index == 2)
              return this.binding2;
            if (index == 3)
              return this.binding3;
            if (index == 4)
              return this.binding4;
            if (index == 5)
              return this.binding5;
            if (index == 6)
              return this.binding6;
            if (index == 7)
              return this.binding7;
            if (index == 8)
              return this.binding8;
            if (index == 9)
              return this.binding9;
            throw new OutOfBoundsError(index);
          },
          createInjectorStrategy: function(injector) {
            return new InjectorInlineStrategy(injector, this);
          }
        }, {});
      }());
      $__export("ProtoInjectorInlineStrategy", ProtoInjectorInlineStrategy);
      ProtoInjectorDynamicStrategy = (function() {
        function ProtoInjectorDynamicStrategy(protoInj, bwv) {
          var len = bwv.length;
          this.bindings = ListWrapper.createFixedSize(len);
          this.keyIds = ListWrapper.createFixedSize(len);
          this.visibilities = ListWrapper.createFixedSize(len);
          for (var i = 0; i < len; i++) {
            this.bindings[i] = bwv[i].binding;
            this.keyIds[i] = bwv[i].getKeyId();
            this.visibilities[i] = bwv[i].visibility;
          }
        }
        return ($traceurRuntime.createClass)(ProtoInjectorDynamicStrategy, {
          getBindingAtIndex: function(index) {
            if (index < 0 || index >= this.bindings.length) {
              throw new OutOfBoundsError(index);
            }
            return this.bindings[index];
          },
          createInjectorStrategy: function(ei) {
            return new InjectorDynamicStrategy(this, ei);
          }
        }, {});
      }());
      $__export("ProtoInjectorDynamicStrategy", ProtoInjectorDynamicStrategy);
      ProtoInjector = (function() {
        function ProtoInjector(bwv) {
          this.numberOfBindings = bwv.length;
          this._strategy = bwv.length > _MAX_CONSTRUCTION_COUNTER ? new ProtoInjectorDynamicStrategy(this, bwv) : new ProtoInjectorInlineStrategy(this, bwv);
        }
        return ($traceurRuntime.createClass)(ProtoInjector, {getBindingAtIndex: function(index) {
            return this._strategy.getBindingAtIndex(index);
          }}, {});
      }());
      $__export("ProtoInjector", ProtoInjector);
      InjectorInlineStrategy = (function() {
        function InjectorInlineStrategy(injector, protoStrategy) {
          this.injector = injector;
          this.protoStrategy = protoStrategy;
          this.obj0 = UNDEFINED;
          this.obj1 = UNDEFINED;
          this.obj2 = UNDEFINED;
          this.obj3 = UNDEFINED;
          this.obj4 = UNDEFINED;
          this.obj5 = UNDEFINED;
          this.obj6 = UNDEFINED;
          this.obj7 = UNDEFINED;
          this.obj8 = UNDEFINED;
          this.obj9 = UNDEFINED;
        }
        return ($traceurRuntime.createClass)(InjectorInlineStrategy, {
          resetConstructionCounter: function() {
            this.injector._constructionCounter = 0;
          },
          instantiateBinding: function(binding, visibility) {
            return this.injector._new(binding, visibility);
          },
          attach: function(parent, isHost) {
            var inj = this.injector;
            inj._parent = parent;
            inj._isHost = isHost;
          },
          getObjByKeyId: function(keyId, visibility) {
            var p = this.protoStrategy;
            var inj = this.injector;
            if (p.keyId0 === keyId && canSee(p.visibility0, visibility)) {
              if (this.obj0 === UNDEFINED) {
                this.obj0 = inj._new(p.binding0, p.visibility0);
              }
              return this.obj0;
            }
            if (p.keyId1 === keyId && canSee(p.visibility1, visibility)) {
              if (this.obj1 === UNDEFINED) {
                this.obj1 = inj._new(p.binding1, p.visibility1);
              }
              return this.obj1;
            }
            if (p.keyId2 === keyId && canSee(p.visibility2, visibility)) {
              if (this.obj2 === UNDEFINED) {
                this.obj2 = inj._new(p.binding2, p.visibility2);
              }
              return this.obj2;
            }
            if (p.keyId3 === keyId && canSee(p.visibility3, visibility)) {
              if (this.obj3 === UNDEFINED) {
                this.obj3 = inj._new(p.binding3, p.visibility3);
              }
              return this.obj3;
            }
            if (p.keyId4 === keyId && canSee(p.visibility4, visibility)) {
              if (this.obj4 === UNDEFINED) {
                this.obj4 = inj._new(p.binding4, p.visibility4);
              }
              return this.obj4;
            }
            if (p.keyId5 === keyId && canSee(p.visibility5, visibility)) {
              if (this.obj5 === UNDEFINED) {
                this.obj5 = inj._new(p.binding5, p.visibility5);
              }
              return this.obj5;
            }
            if (p.keyId6 === keyId && canSee(p.visibility6, visibility)) {
              if (this.obj6 === UNDEFINED) {
                this.obj6 = inj._new(p.binding6, p.visibility6);
              }
              return this.obj6;
            }
            if (p.keyId7 === keyId && canSee(p.visibility7, visibility)) {
              if (this.obj7 === UNDEFINED) {
                this.obj7 = inj._new(p.binding7, p.visibility7);
              }
              return this.obj7;
            }
            if (p.keyId8 === keyId && canSee(p.visibility8, visibility)) {
              if (this.obj8 === UNDEFINED) {
                this.obj8 = inj._new(p.binding8, p.visibility8);
              }
              return this.obj8;
            }
            if (p.keyId9 === keyId && canSee(p.visibility9, visibility)) {
              if (this.obj9 === UNDEFINED) {
                this.obj9 = inj._new(p.binding9, p.visibility9);
              }
              return this.obj9;
            }
            return UNDEFINED;
          },
          getObjAtIndex: function(index) {
            if (index == 0)
              return this.obj0;
            if (index == 1)
              return this.obj1;
            if (index == 2)
              return this.obj2;
            if (index == 3)
              return this.obj3;
            if (index == 4)
              return this.obj4;
            if (index == 5)
              return this.obj5;
            if (index == 6)
              return this.obj6;
            if (index == 7)
              return this.obj7;
            if (index == 8)
              return this.obj8;
            if (index == 9)
              return this.obj9;
            throw new OutOfBoundsError(index);
          },
          getMaxNumberOfObjects: function() {
            return _MAX_CONSTRUCTION_COUNTER;
          }
        }, {});
      }());
      $__export("InjectorInlineStrategy", InjectorInlineStrategy);
      InjectorDynamicStrategy = (function() {
        function InjectorDynamicStrategy(protoStrategy, injector) {
          this.protoStrategy = protoStrategy;
          this.injector = injector;
          this.objs = ListWrapper.createFixedSize(protoStrategy.bindings.length);
          ListWrapper.fill(this.objs, UNDEFINED);
        }
        return ($traceurRuntime.createClass)(InjectorDynamicStrategy, {
          resetConstructionCounter: function() {
            this.injector._constructionCounter = 0;
          },
          instantiateBinding: function(binding, visibility) {
            return this.injector._new(binding, visibility);
          },
          attach: function(parent, isHost) {
            var inj = this.injector;
            inj._parent = parent;
            inj._isHost = isHost;
          },
          getObjByKeyId: function(keyId, visibility) {
            var p = this.protoStrategy;
            for (var i = 0; i < p.keyIds.length; i++) {
              if (p.keyIds[i] === keyId && canSee(p.visibilities[i], visibility)) {
                if (this.objs[i] === UNDEFINED) {
                  this.objs[i] = this.injector._new(p.bindings[i], p.visibilities[i]);
                }
                return this.objs[i];
              }
            }
            return UNDEFINED;
          },
          getObjAtIndex: function(index) {
            if (index < 0 || index >= this.objs.length) {
              throw new OutOfBoundsError(index);
            }
            return this.objs[index];
          },
          getMaxNumberOfObjects: function() {
            return this.objs.length;
          }
        }, {});
      }());
      $__export("InjectorDynamicStrategy", InjectorDynamicStrategy);
      BindingWithVisibility = (function() {
        function BindingWithVisibility(binding, visibility) {
          this.binding = binding;
          this.visibility = visibility;
        }
        return ($traceurRuntime.createClass)(BindingWithVisibility, {getKeyId: function() {
            return this.binding.key.id;
          }}, {});
      }());
      $__export("BindingWithVisibility", BindingWithVisibility);
      Injector = (function() {
        function Injector(_proto) {
          var _parent = arguments[1] !== (void 0) ? arguments[1] : null;
          var _depProvider = arguments[2] !== (void 0) ? arguments[2] : null;
          var _debugContext = arguments[3] !== (void 0) ? arguments[3] : null;
          this._proto = _proto;
          this._parent = _parent;
          this._depProvider = _depProvider;
          this._debugContext = _debugContext;
          this._isHost = false;
          this._constructionCounter = 0;
          this._strategy = _proto._strategy.createInjectorStrategy(this);
        }
        return ($traceurRuntime.createClass)(Injector, {
          debugContext: function() {
            return this._debugContext();
          },
          get: function(token) {
            return this._getByKey(Key.get(token), null, null, false, Visibility.PublicAndPrivate);
          },
          getOptional: function(token) {
            return this._getByKey(Key.get(token), null, null, true, Visibility.PublicAndPrivate);
          },
          getAt: function(index) {
            return this._strategy.getObjAtIndex(index);
          },
          get parent() {
            return this._parent;
          },
          get internalStrategy() {
            return this._strategy;
          },
          resolveAndCreateChild: function(bindings) {
            var depProvider = arguments[1] !== (void 0) ? arguments[1] : null;
            var resovledBindings = Injector.resolve(bindings);
            return this.createChildFromResolved(resovledBindings, depProvider);
          },
          createChildFromResolved: function(bindings) {
            var depProvider = arguments[1] !== (void 0) ? arguments[1] : null;
            var bd = bindings.map((function(b) {
              return new BindingWithVisibility(b, Visibility.Public);
            }));
            var proto = new ProtoInjector(bd);
            var inj = new Injector(proto, null, depProvider);
            inj._parent = this;
            return inj;
          },
          resolveAndInstantiate: function(binding) {
            return this.instantiateResolved(Injector.resolve([binding])[0]);
          },
          instantiateResolved: function(binding) {
            return this._instantiate(binding, Visibility.PublicAndPrivate);
          },
          _new: function(binding, visibility) {
            if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
              throw new CyclicDependencyError(this, binding.key);
            }
            return this._instantiate(binding, visibility);
          },
          _instantiate: function(binding, visibility) {
            var factory = binding.factory;
            var deps = binding.dependencies;
            var length = deps.length;
            var d0,
                d1,
                d2,
                d3,
                d4,
                d5,
                d6,
                d7,
                d8,
                d9,
                d10,
                d11,
                d12,
                d13,
                d14,
                d15,
                d16,
                d17,
                d18,
                d19;
            try {
              d0 = length > 0 ? this._getByDependency(binding, deps[0], visibility) : null;
              d1 = length > 1 ? this._getByDependency(binding, deps[1], visibility) : null;
              d2 = length > 2 ? this._getByDependency(binding, deps[2], visibility) : null;
              d3 = length > 3 ? this._getByDependency(binding, deps[3], visibility) : null;
              d4 = length > 4 ? this._getByDependency(binding, deps[4], visibility) : null;
              d5 = length > 5 ? this._getByDependency(binding, deps[5], visibility) : null;
              d6 = length > 6 ? this._getByDependency(binding, deps[6], visibility) : null;
              d7 = length > 7 ? this._getByDependency(binding, deps[7], visibility) : null;
              d8 = length > 8 ? this._getByDependency(binding, deps[8], visibility) : null;
              d9 = length > 9 ? this._getByDependency(binding, deps[9], visibility) : null;
              d10 = length > 10 ? this._getByDependency(binding, deps[10], visibility) : null;
              d11 = length > 11 ? this._getByDependency(binding, deps[11], visibility) : null;
              d12 = length > 12 ? this._getByDependency(binding, deps[12], visibility) : null;
              d13 = length > 13 ? this._getByDependency(binding, deps[13], visibility) : null;
              d14 = length > 14 ? this._getByDependency(binding, deps[14], visibility) : null;
              d15 = length > 15 ? this._getByDependency(binding, deps[15], visibility) : null;
              d16 = length > 16 ? this._getByDependency(binding, deps[16], visibility) : null;
              d17 = length > 17 ? this._getByDependency(binding, deps[17], visibility) : null;
              d18 = length > 18 ? this._getByDependency(binding, deps[18], visibility) : null;
              d19 = length > 19 ? this._getByDependency(binding, deps[19], visibility) : null;
            } catch (e) {
              if (e instanceof AbstractBindingError) {
                e.addKey(this, binding.key);
              }
              throw e;
            }
            var obj;
            try {
              switch (length) {
                case 0:
                  obj = factory();
                  break;
                case 1:
                  obj = factory(d0);
                  break;
                case 2:
                  obj = factory(d0, d1);
                  break;
                case 3:
                  obj = factory(d0, d1, d2);
                  break;
                case 4:
                  obj = factory(d0, d1, d2, d3);
                  break;
                case 5:
                  obj = factory(d0, d1, d2, d3, d4);
                  break;
                case 6:
                  obj = factory(d0, d1, d2, d3, d4, d5);
                  break;
                case 7:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6);
                  break;
                case 8:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
                  break;
                case 9:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
                  break;
                case 10:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
                  break;
                case 11:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
                  break;
                case 12:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
                  break;
                case 13:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12);
                  break;
                case 14:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13);
                  break;
                case 15:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14);
                  break;
                case 16:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15);
                  break;
                case 17:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
                  break;
                case 18:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17);
                  break;
                case 19:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18);
                  break;
                case 20:
                  obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19);
                  break;
              }
            } catch (e) {
              throw new InstantiationError(this, e, e.stack, binding.key);
            }
            return obj;
          },
          _getByDependency: function(binding, dep, bindingVisibility) {
            var special = isPresent(this._depProvider) ? this._depProvider.getDependency(this, binding, dep) : UNDEFINED;
            if (special !== UNDEFINED) {
              return special;
            } else {
              return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional, bindingVisibility);
            }
          },
          _getByKey: function(key, lowerBoundVisibility, upperBoundVisibility, optional, bindingVisibility) {
            if (key === INJECTOR_KEY) {
              return this;
            }
            if (upperBoundVisibility instanceof SelfMetadata) {
              return this._getByKeySelf(key, optional, bindingVisibility);
            } else if (upperBoundVisibility instanceof HostMetadata) {
              return this._getByKeyHost(key, optional, bindingVisibility, lowerBoundVisibility);
            } else {
              return this._getByKeyDefault(key, optional, bindingVisibility, lowerBoundVisibility);
            }
          },
          _throwOrNull: function(key, optional) {
            if (optional) {
              return null;
            } else {
              throw new NoBindingError(this, key);
            }
          },
          _getByKeySelf: function(key, optional, bindingVisibility) {
            var obj = this._strategy.getObjByKeyId(key.id, bindingVisibility);
            return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, optional);
          },
          _getByKeyHost: function(key, optional, bindingVisibility, lowerBoundVisibility) {
            var inj = this;
            if (lowerBoundVisibility instanceof SkipSelfMetadata) {
              if (inj._isHost) {
                return this._getPrivateDependency(key, optional, inj);
              } else {
                inj = inj._parent;
              }
            }
            while (inj != null) {
              var obj = inj._strategy.getObjByKeyId(key.id, bindingVisibility);
              if (obj !== UNDEFINED)
                return obj;
              if (isPresent(inj._parent) && inj._isHost) {
                return this._getPrivateDependency(key, optional, inj);
              } else {
                inj = inj._parent;
              }
            }
            return this._throwOrNull(key, optional);
          },
          _getPrivateDependency: function(key, optional, inj) {
            var obj = inj._parent._strategy.getObjByKeyId(key.id, Visibility.Private);
            return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, optional);
          },
          _getByKeyDefault: function(key, optional, bindingVisibility, lowerBoundVisibility) {
            var inj = this;
            if (lowerBoundVisibility instanceof SkipSelfMetadata) {
              bindingVisibility = inj._isHost ? Visibility.PublicAndPrivate : Visibility.Public;
              inj = inj._parent;
            }
            while (inj != null) {
              var obj = inj._strategy.getObjByKeyId(key.id, bindingVisibility);
              if (obj !== UNDEFINED)
                return obj;
              bindingVisibility = inj._isHost ? Visibility.PublicAndPrivate : Visibility.Public;
              inj = inj._parent;
            }
            return this._throwOrNull(key, optional);
          },
          get displayName() {
            return ("Injector(bindings: [" + _mapBindings(this, (function(b) {
              return (" \"" + b.key.displayName + "\" ");
            })).join(", ") + "])");
          },
          toString: function() {
            return this.displayName;
          }
        }, {
          resolve: function(bindings) {
            var resolvedBindings = _resolveBindings(bindings);
            var flatten = _flattenBindings(resolvedBindings, new Map());
            return _createListOfBindings(flatten);
          },
          resolveAndCreate: function(bindings) {
            var depProvider = arguments[1] !== (void 0) ? arguments[1] : null;
            var resolvedBindings = Injector.resolve(bindings);
            return Injector.fromResolvedBindings(resolvedBindings, depProvider);
          },
          fromResolvedBindings: function(bindings) {
            var depProvider = arguments[1] !== (void 0) ? arguments[1] : null;
            var bd = bindings.map((function(b) {
              return new BindingWithVisibility(b, Visibility.Public);
            }));
            var proto = new ProtoInjector(bd);
            var inj = new Injector(proto, null, depProvider);
            return inj;
          }
        });
      }());
      $__export("Injector", Injector);
      INJECTOR_KEY = Key.get(Injector);
    }
  };
});

System.register("angular2/di", ["angular2/src/di/metadata", "angular2/src/di/decorators", "angular2/src/di/forward_ref", "angular2/src/di/injector", "angular2/src/di/binding", "angular2/src/di/key", "angular2/src/di/exceptions", "angular2/src/di/opaque_token"], function($__export) {
  "use strict";
  var __moduleName = "angular2/di";
  var $__exportNames = {undefined: true};
  return {
    setters: [function($__m) {
      $__export("InjectMetadata", $__m.InjectMetadata);
      $__export("OptionalMetadata", $__m.OptionalMetadata);
      $__export("InjectableMetadata", $__m.InjectableMetadata);
      $__export("SelfMetadata", $__m.SelfMetadata);
      $__export("HostMetadata", $__m.HostMetadata);
      $__export("SkipSelfMetadata", $__m.SkipSelfMetadata);
      $__export("DependencyMetadata", $__m.DependencyMetadata);
    }, function($__m) {
      Object.keys($__m).forEach(function(p) {
        if (!$__exportNames[p])
          $__export(p, $__m[p]);
      });
    }, function($__m) {
      $__export("forwardRef", $__m.forwardRef);
      $__export("resolveForwardRef", $__m.resolveForwardRef);
    }, function($__m) {
      $__export("Injector", $__m.Injector);
      $__export("ProtoInjector", $__m.ProtoInjector);
      $__export("BindingWithVisibility", $__m.BindingWithVisibility);
      $__export("Visibility", $__m.Visibility);
      $__export("UNDEFINED", $__m.UNDEFINED);
    }, function($__m) {
      $__export("Binding", $__m.Binding);
      $__export("BindingBuilder", $__m.BindingBuilder);
      $__export("ResolvedBinding", $__m.ResolvedBinding);
      $__export("Dependency", $__m.Dependency);
      $__export("bind", $__m.bind);
    }, function($__m) {
      $__export("Key", $__m.Key);
      $__export("KeyRegistry", $__m.KeyRegistry);
      $__export("TypeLiteral", $__m.TypeLiteral);
    }, function($__m) {
      $__export("NoBindingError", $__m.NoBindingError);
      $__export("AbstractBindingError", $__m.AbstractBindingError);
      $__export("CyclicDependencyError", $__m.CyclicDependencyError);
      $__export("InstantiationError", $__m.InstantiationError);
      $__export("InvalidBindingError", $__m.InvalidBindingError);
      $__export("NoAnnotationError", $__m.NoAnnotationError);
      $__export("OutOfBoundsError", $__m.OutOfBoundsError);
    }, function($__m) {
      $__export("OpaqueToken", $__m.OpaqueToken);
    }],
    execute: function() {}
  };
});

System.register("http/http", ["angular2/di", "http/src/http", "http/src/backends/xhr_backend", "http/src/backends/jsonp_backend", "http/src/backends/browser_xhr", "http/src/backends/browser_jsonp", "http/src/base_request_options", "http/src/base_response_options", "http/src/backends/mock_backend", "http/src/static_request", "http/src/static_response", "http/src/interfaces", "http/src/headers", "http/src/enums", "http/src/url_search_params"], function($__export) {
  "use strict";
  var __moduleName = "http/http";
  var bind,
      Http,
      Jsonp,
      XHRBackend,
      JSONPBackend,
      BrowserXhr,
      BrowserJsonp,
      BaseRequestOptions,
      RequestOptions,
      BaseResponseOptions,
      ResponseOptions,
      HTTP_BINDINGS,
      JSONP_BINDINGS;
  return {
    setters: [function($__m) {
      bind = $__m.bind;
    }, function($__m) {
      Http = $__m.Http;
      Jsonp = $__m.Jsonp;
      $__export("Http", $__m.Http);
      $__export("Jsonp", $__m.Jsonp);
    }, function($__m) {
      XHRBackend = $__m.XHRBackend;
      $__export("XHRBackend", $__m.XHRBackend);
      $__export("XHRConnection", $__m.XHRConnection);
    }, function($__m) {
      JSONPBackend = $__m.JSONPBackend;
      $__export("JSONPBackend", $__m.JSONPBackend);
      $__export("JSONPConnection", $__m.JSONPConnection);
    }, function($__m) {
      BrowserXhr = $__m.BrowserXhr;
      $__export("BrowserXhr", $__m.BrowserXhr);
    }, function($__m) {
      BrowserJsonp = $__m.BrowserJsonp;
    }, function($__m) {
      BaseRequestOptions = $__m.BaseRequestOptions;
      RequestOptions = $__m.RequestOptions;
      $__export("BaseRequestOptions", $__m.BaseRequestOptions);
      $__export("RequestOptions", $__m.RequestOptions);
    }, function($__m) {
      BaseResponseOptions = $__m.BaseResponseOptions;
      ResponseOptions = $__m.ResponseOptions;
      $__export("BaseResponseOptions", $__m.BaseResponseOptions);
      $__export("ResponseOptions", $__m.ResponseOptions);
    }, function($__m) {
      $__export("MockConnection", $__m.MockConnection);
      $__export("MockBackend", $__m.MockBackend);
    }, function($__m) {
      $__export("Request", $__m.Request);
    }, function($__m) {
      $__export("Response", $__m.Response);
    }, function($__m) {
      $__export("Connection", $__m.Connection);
      $__export("ConnectionBackend", $__m.ConnectionBackend);
    }, function($__m) {
      $__export("Headers", $__m.Headers);
    }, function($__m) {
      $__export("ResponseTypes", $__m.ResponseTypes);
      $__export("ReadyStates", $__m.ReadyStates);
      $__export("RequestMethods", $__m.RequestMethods);
      $__export("RequestCredentialsOpts", $__m.RequestCredentialsOpts);
      $__export("RequestCacheOpts", $__m.RequestCacheOpts);
      $__export("RequestModesOpts", $__m.RequestModesOpts);
    }, function($__m) {
      $__export("URLSearchParams", $__m.URLSearchParams);
    }],
    execute: function() {
      HTTP_BINDINGS = [bind(Http).toFactory((function(xhrBackend, requestOptions) {
        return new Http(xhrBackend, requestOptions);
      }), [XHRBackend, RequestOptions]), BrowserXhr, bind(RequestOptions).toClass(BaseRequestOptions), bind(ResponseOptions).toClass(BaseResponseOptions), XHRBackend];
      $__export("HTTP_BINDINGS", HTTP_BINDINGS);
      JSONP_BINDINGS = [bind(Jsonp).toFactory((function(jsonpBackend, requestOptions) {
        return new Jsonp(jsonpBackend, requestOptions);
      }), [JSONPBackend, RequestOptions]), BrowserJsonp, bind(RequestOptions).toClass(BaseRequestOptions), bind(ResponseOptions).toClass(BaseResponseOptions), JSONPBackend];
      $__export("JSONP_BINDINGS", JSONP_BINDINGS);
    }
  };
});

//# sourceMappingURLDisabled=http.dev.js.map