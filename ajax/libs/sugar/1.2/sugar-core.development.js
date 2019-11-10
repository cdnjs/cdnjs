// Google Closure Compiler will output a wrapping function here.
(function() {

  // A few optimizations for Google Closure Compiler will save us a couple kb in the release script.
  var object = Object, array = Array, regexp = RegExp, date = Date, string = String, number = Number, Undefined;

  // defineProperty exists in IE8 but will error when trying to define a property on
  // native objects. IE8 does not have defineProperies, however, so this check saves a try/catch block.
  var definePropertySupport = object.defineProperty && object.defineProperties;

  function extend(klass, instance, override, methods) {
    var extendee = instance ? klass.prototype : klass;
    initializeClass(klass, instance, methods);
    iterateOverObject(methods, function(name, method) {
      if(typeof override === 'function') {
        defineProperty(extendee, name, wrapNative(extendee[name], method, override));
      } else if(override === true || !extendee[name]) {
        defineProperty(extendee, name, method);
      }
      // If the method is internal to Sugar, then store a reference so it can be restored later.
      klass['SugarMethods'][name] = { instance: instance, method: method };
    });
  }

  function initializeClass(klass) {
    if(klass.SugarMethods) return;
    defineProperty(klass, 'SugarMethods', {});
    defineProperty(klass, 'restore', function() {
      var all = arguments.length === 0, methods = multiArgs(arguments);
      iterateOverObject(klass['SugarMethods'], function(name, m) {
        if(all || existsInArray(methods, name)) {
          defineProperty(m.instance ? klass.prototype : klass, name, m.method);
        }
      });
    });
    defineProperty(klass, 'extend', function(methods, override, instance) {
      if(klass === object && arguments.length === 0) {
        mapObjectPrototypeMethods();
      } else {
        extend(klass, instance !== false, override, methods);
      }
    });
  }

  function wrapNative(nativeFn, extendedFn, condition) {
    return function() {
      if(nativeFn && (condition === true || !condition.apply(this, arguments))) {
        return nativeFn.apply(this, arguments);
      } else {
        return extendedFn.apply(this, arguments);
      }
    }
  }

  function defineProperty(target, name, method) {
    if(definePropertySupport) {
      object.defineProperty(target, name, { 'value': method, 'configurable': true, 'enumerable': false, 'writable': true });
    } else {
      target[name] = method;
    }
  }

  function iterateOverObject(obj, fn) {
    var count = 0;
    for(var key in obj) {
      if(!obj.hasOwnProperty(key)) continue;
      fn.call(obj, key, obj[key], count);
      count++;
    }
  }

  function equal(a, b, stack) {
    var primitive = object.prototype.toString.call(a).match(/\[object (\w+)\]/)[1];
    if(a === b) {
      return a !== 0 || 1 / a === 1 / b;
    } else if(isNull(a) || isUndefined(a) || isNull(b) || isUndefined(b)) {
      return false;
    } else if(primitive == 'RegExp') {
      return a.ignoreCase == b.ignoreCase &&
             a.multiline == b.multiline &&
             a.source == b.source &&
             a.global == b.global;
    } else if(primitive == 'Array' || primitive == 'Object') {
      // This method for checking for cyclic structures was egregiously stolen from
      // the ingenious method by @kitcambridge from the Underscore script... ref:
      // https://github.com/documentcloud/underscore/issues/240
      var length = stack.length;
      while (length--) {
        if (stack[length] == a) return true;
      }
      stack.push(a);
      for(var key in a) {
        if(!a.hasOwnProperty(key)) continue;
        if(!b.hasOwnProperty(key) || !equal(a[key], b[key], stack)) {
          return false;
        }
      }
      stack.pop();
      return object.keys(a).length === object.keys(b).length &&
             a.constructor === b.constructor &&
             a.length === b.length;
     } else {
       return isClass(b, primitive) && a.valueOf() === b.valueOf();
     }
  }

  function multiMatch(el, match, scope, params) {
    var result = true;
    if(el === match) {
      // Match strictly equal values up front.
      return true;
    } else if(object.isRegExp(match)) {
      // Match against a regexp
      return regexp(match).test(el);
    } else if(object.isFunction(match)) {
      // Match against a filtering function
      return match.apply(scope, [el].concat(params));
    } else if(object.isObject(match) && object.isObject(el)) {
      // Match against a hash or array.
      iterateOverObject(match, function(key, value) {
        if(!multiMatch(el[key], match[key], scope, params)) {
          result = false;
        }
      });
      return !object.isEmpty(match) && result;
    } else {
      return object.equal(el, match);
    }
  }

  function transformArgument(el, map, context, mapArgs) {
    if(isUndefined(map)) {
      return el;
    } else if(object.isFunction(map)) {
      return map.apply(context, mapArgs || []);
    } else if(object.isFunction(el[map])) {
      return el[map].call(el);
    } else {
      return el[map];
    }
  }

  function getArgs(args, index) {
    return Array.prototype.slice.call(args, index);
  }

  function multiArgs(args, fn, flatten, index) {
    args = getArgs(args);
    if(flatten !== false) args = arrayFlatten(args);
    arrayEach(args, fn || function(){}, index);
    return args;
  }

  // Used for both arrays and strings

  function entryAtIndex(arr, args, str) {
    var result = [], length = arr.length, loop = args[args.length - 1] !== false, r;
    multiArgs(args, function(index) {
      if(object.isBoolean(index)) return false;
      if(loop) {
        index = index % length;
        if(index < 0) index = length + index;
      }
      r = str ? arr.charAt(index) || '' : arr[index];
      result.push(r);
    });
    return result.length < 2 ? result[0] : result;
  }

  /***
   * Object module
   *
   * Much thanks to kangax for his informative aricle about how problems with instanceof and constructor
   * http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
   *
   ***/

  function isClass(obj, str) {
    return object.prototype.toString.call(obj) === '[object '+str+']';
  }

  function isObjectPrimitive(o) {
    return typeof o == 'object';
  }

  function isNull(o) {
    return o === null;
  }

  function isUndefined(o) {
    return o === Undefined;
  }

  function isDefined(o) {
    return o !== Undefined;
  }

  function mergeObject(target, source, deep, resolve) {
    if(isObjectPrimitive(source)) {
      iterateOverObject(source, function(key, val) {
        var prop = target[key], conflict = isDefined(prop), isArray = object.isArray(val);
        if(deep === true && (isArray || object.isObject(val))) {
          if(!prop) prop = isArray ? [] : {};
          mergeObject(prop, val, deep);
        } else if(conflict && object.isFunction(resolve)) {
          prop = resolve.call(source, key, target[key], source[key])
        } else if(!conflict || (conflict && resolve !== false)) {
          prop = source[key];
        }
        target[key] = prop;
      });
    }
    return target;
  }

  function setParamsObject(obj, param, value, deep) {
    var reg = /^(.+?)(\[.*\])$/, isArray, match, allKeys, key;
    if(deep !== false && (match = param.match(reg))) {
      key = match[1];
      allKeys = match[2].replace(/^\[|\]$/g, '').split('][');
      arrayEach(allKeys, function(k) {
        isArray = !k || k.match(/^\d+$/);
        if(!key && object.isArray(obj)) key = obj.length;
        if(!obj[key]) {
          obj[key] = isArray ? [] : {};
        }
        obj = obj[key];
        key = k;
      });
      if(!key && isArray) key = obj.length.toString();
      setParamsObject(obj, key, value);
    } else if(value.match(/^[\d.]+$/)) {
      obj[param] = parseFloat(value);
    } else if(value === 'true') {
      obj[param] = true;
    } else if(value === 'false') {
      obj[param] = false;
    } else {
      obj[param] = value;
    }
  }

  function Hash(obj) {
    var self = this;
    iterateOverObject(obj, function(key, value) {
      self[key] = value;
    });
  }

  Hash.prototype.constructor = object;

  /***
   * @method is[Type](<obj>)
   * @returns Boolean
   * @short Returns true if <obj> is an object of that type.
   * @extra %isObject% will return false on anything that is not an object literal, including instances of inherited classes. Note also that %isNaN% will ONLY return true if the object IS %NaN%. It does not mean the same as browser native %isNaN%, which returns true for anything that is "not a number". Type methods are available as instance methods on extended objects and when using Object.extend().
   * @example
   *
   *   Object.isArray([1,2,3])            -> true
   *   Object.isDate(3)                   -> false
   *   Object.isRegExp(/wasabi/)          -> true
   *   Object.isObject({ broken:'wear' }) -> true
   *
   ***
   * @method isArray()
   * @set isType
   ***
   * @method isBoolean()
   * @set isType
   ***
   * @method isDate()
   * @set isType
   ***
   * @method isFunction()
   * @set isType
   ***
   * @method isNumber()
   * @set isType
   ***
   * @method isString()
   * @set isType
   ***
   * @method isRegExp()
   * @set isType
   ***/


  function buildTypeMethods() {
    var methods = {};
    arrayEach(['Array','Boolean','Date','Function','Number','String','RegExp'], function(type) {
      methods['is' + type] = function(obj) {
        return isClass(obj, type);
      }
    });
    extend(Object, false, false, methods);
  }

  function buildInstanceMethods(set, target) {
    var methods = {};
    arrayEach(set, function(name) {
      methods[name + (name === 'equal' ? 's' : '')] = function() {
        return Object[name].apply(null, [this].concat(getArgs(arguments)));
      }
    });
    extend(target, true, false, methods);
  }

  function buildObject() {
    buildTypeMethods();
    buildInstanceMethods(['keys','values','each','merge','isEmpty','clone','equal','watch','tap'], Hash);
  }

  function mapObjectPrototypeMethods() {
    buildInstanceMethods(Object.keys(Object['SugarMethods']).remove('extended', 'fromQueryString'), Object);
  }

  extend(object, false, true, {
      /***
       * @method watch(<obj>, <prop>, <fn>)
       * @returns Nothing
       * @short Watches a property of <obj> and runs <fn> when it changes.
       * @extra <fn> is passed three arguments: the property <prop>, the old value, and the new value. The return value of [fn] will be set as the new value. This method is useful for things such as validating or cleaning the value when it is set. Warning: this method WILL NOT work in browsers that don't support %Object.defineProperty%. This notably includes IE 8 and below, and Opera. This is the only method in Sugar that is not fully compatible with all browsers. %watch% is available as an instance method on extended objects and when using Object.extend().
       * @example
       *
       *   Object.watch({ foo: 'bar' }, 'foo', function(prop, oldVal, newVal) {
       *     // Will be run when the property 'foo' is set on the object.
       *   });
       *   Object.extended().watch({ foo: 'bar' }, 'foo', function(prop, oldVal, newVal) {
       *     // Will be run when the property 'foo' is set on the object.
       *   });
       *
       ***/
    'watch': function(obj, prop, fn) {
      if(!definePropertySupport) return;
      var value = obj[prop];
      object.defineProperty(obj, prop, {
        'get': function() {
          return value;
        },
        'set': function(to) {
          value = fn.call(obj, prop, value, to);
        },
        'enumerable': true,
        'configurable': true
      });
    }
  });

  extend(object, false, false, {

    /***
     * @method Object.extended(<obj> = {})
     * @returns Extended object
     * @short Creates a new object, equivalent to %new Object()% or %{}%, but with extended methods.
     * @extra See extended objects for more.
     * @example
     *
     *   Object.extended()
     *   Object.extended({ happy:true, pappy:false }).keys() -> ['happy','pappy']
     *   Object.extended({ happy:true, pappy:false }).values() -> [true, false]
     *
     ***/
    'extended': function(obj) {
      return new Hash(obj);
    },

    /***
     * @method isObject()
     * @set isType
     ***/
    'isObject': function(obj) {
      if(isNull(obj) || isUndefined(obj)) {
        return false;
      } else {
        return isClass(obj, 'Object') && obj.constructor === object;
      }
    },

    /***
     * @method isNaN()
     * @set isType
     ***/
    'isNaN': function(obj) {
      // This is only true of NaN
      return object.isNumber(obj) && obj.valueOf() !== obj.valueOf();
    },

    /***
     * @method each(<obj>, [fn])
     * @returns Object
     * @short Iterates over each property in <obj> calling [fn] on each iteration.
     * @extra %each% is available as an instance method on extended objects and when using Object.extend().
     * @example
     *
     *   Object.each({ broken:'wear' }, function(key, value) {
     *     // Iterates over each key/value pair.
     *   });
     *   Object.extended({ broken:'wear' }).each(function(key, value) {
     *     // Iterates over each key/value pair.
     *   });
     *
     ***/
    'each': function(obj, fn) {
      if(fn) {
        iterateOverObject(obj, function(k,v) {
          fn.call(obj, k, v, obj);
        });
      }
      return obj;
    },

    /***
     * @method merge(<target>, <source>, [resolve] = true)
     * @returns Merged object
     * @short Merges all the properties of <source> into <target>.
     * @extra Properties of <source> will win in the case of conflicts, unless [resolve] is %false%. [resolve] can also be a function that resolves the conflict. In this case it will be passed 3 arguments, %key%, %targetVal%, and %sourceVal%, with the context set to <source>. This will allow you to solve conflict any way you want, ie. adding two numbers together, etc. %merge% is available as an instance method on extended objects and when using Object.extend().
     * @example
     *
     *   Object.merge({a:1},{b:2}) -> { a:1, b:2 }
     *   Object.merge({a:1},{a:2}, false) -> { a:1 }
     +   Object.merge({a:1},{a:2}, function(key, a, b) {
     *     return a + b;
     *   }); -> { a:3 }
     *   Object.extended({a:1}).merge({b:2}) -> { a:1, b:2 }
     *
     ***/
    'merge': function(target, merge, resolve) {
      return mergeObject(target, merge, true, resolve);
    },

    /***
     * @method isEmpty(<obj>)
     * @returns Boolean
     * @short Returns true if <obj> is empty.
     * @extra %isEmpty% is available as an instance method on extended objects and when using Object.extend().
     * @example
     *
     *   Object.isEmpty({})          -> true
     *   Object.isEmpty({foo:'bar'}) -> false
     *   Object.extended({foo:'bar'}).isEmpty() -> false
     *
     ***/
    'isEmpty': function(obj) {
      if(!isObjectPrimitive(obj) || isNull(obj)) return !(obj && obj.length > 0);
      return object.keys(obj).length == 0;
    },

    /***
     * @method equal(<a>, <b>)
     * @returns Boolean
     * @short Returns true if <a> and <b> are equal.
     * @extra %empty% is available as an instance method as "equals" (note the "s") on extended objects and when using Object.extend().
     * @example
     *
     *   Object.equal({a:2}, {a:2}) -> true
     *   Object.equal({a:2}, {a:3}) -> false
     *   Object.extended({a:2}).equals({a:3}) -> false
     *
     ***/
    'equal': function(a, b) {
      return equal(a, b, []);
    },

    /***
     * @method values(<obj>, [fn])
     * @returns Array
     * @short Returns an array containing the values in <obj>. Optionally calls [fn] for each value.
     * @extra Returned values are in no particular order. %values% is available as an instance method on extended objects and when using Object.extend().
     * @example
     *
     *   Object.values({ broken: 'wear' }) -> ['wear']
     *   Object.values({ broken: 'wear' }, function(value) {
     *     // Called once for each value.
     *   });
     *   Object.extended({ broken: 'wear' }).values() -> ['wear']
     *
     ***/
    'values': function(obj, fn) {
      var values = [];
      iterateOverObject(obj, function(k,v) {
        values.push(v);
        if(fn) fn.call(obj,v);
      });
      return values;
    },

    /***
     * @method clone(<obj> = {}, [deep] = false)
     * @returns Cloned object
     * @short Creates a clone (copy) of <obj>.
     * @extra Default is a shallow clone, unless [deep] is true. %clone% is available as an instance method on extended objects and when using Object.extend().
     * @example
     *
     *   Object.clone({foo:'bar'})            -> { foo: 'bar' }
     *   Object.clone()                       -> {}
     *   Object.extended({foo:'bar'}).clone() -> { foo: 'bar' }
     *
     ***/
    'clone': function(obj, deep) {
      if(!isObjectPrimitive(obj) || isNull(obj)) return obj;
      var target = Object.isFunction(obj.keys) ? Object.extended() : {};
      return mergeObject(target, obj, deep);
    },

    /***
     * @method Object.fromQueryString(<str>, [deep] = true)
     * @returns Object
     * @short Converts the query string of a URL into an object.
     * @extra If [deep] is %false%, conversion will only accept shallow params (ie. no object or arrays with %[]% syntax) as these are not universally supported.
     * @example
     *
     *   Object.fromQueryString('foo=bar&broken=wear') -> { foo: 'bar', broken: 'wear' }
     *   Object.fromQueryString('foo[]=1&foo[]=2')     -> { foo: [1,2] }
     *
     ***/
    'fromQueryString': function(str, deep) {
      var result = object.extended(), split;
      str = str && str.toString ? str.toString() : '';
      str.replace(/^.*?\?/, '').unescapeURL().split('&').each(function(p) {
        var split = p.split('=');
        if(split.length !== 2) return;
        setParamsObject(result, split[0], split[1], deep);
      });
      return result;
    },

    /***
     * @method tap(<obj>, <fn>)
     * @returns Object
     * @short Runs <fn> and returns <obj>.
     * @extra  A string can also be used as a shortcut to a method. This method is used to run an intermediary function in the middle of method chaining. As a standalone method on the Object class it doesn't have too much use. The power of %tap% comes when using extended objects or modifying the Object prototype with Object.extend().
     * @example
     *
     *   Object.extend();
     *   [2,4,6].map(Math.exp).tap(function(){ arr.pop(); }).map(Math.round); ->  [7,55]
     *   [2,4,6].map(Math.exp).tap('pop').map(Math.round); ->  [7,55]
     *
     ***/
    'tap': function(obj, fn) {
      transformArgument(obj, fn, obj, [obj]);
      return obj;
    }

  });


  extend(object, false, function() { return arguments.length > 1; }, {

    /***
     * @method keys(<obj>, [fn])
     * @returns Array
     * @short Returns an array containing the keys in <obj>. Optionally calls [fn] for each key.
     * @extra This method is provided for browsers that don't support it natively, and additionally is enhanced to accept the callback [fn]. Returned keys are in no particular order. %keys% is available as an instance method on extended objects and when using Object.extend().
     * @example
     *
     *   Object.keys({ broken: 'wear' }) -> ['broken']
     *   Object.keys({ broken: 'wear' }, function(key, value) {
     *     // Called once for each key.
     *   });
     *   Object.extended({ broken: 'wear' }).keys() -> ['broken']
     *
     ***/
    'keys': function(obj, fn) {
      if(isNull(obj) || (!isObjectPrimitive(obj) && !object.isRegExp(obj) && !object.isFunction(obj))) {
        throw new TypeError('Object required');
      }
      var keys = [];
      iterateOverObject(obj, function(key, value) {
        keys.push(key);
        if(fn) fn.call(obj, key, value);
      });
      return keys;
    }

  });








  /***
   * Array module
   *
   ***/



  // Basic array internal methods

  function arrayEach(arr, fn, startIndex, loop, sparse) {
    var length, index, i;
    checkCallback(fn);
    if(startIndex < 0) startIndex = arr.length + startIndex;
    i = toIntegerWithDefault(startIndex, 0);
    length = loop === true ? arr.length + i : arr.length;
    while(i < length) {
      index = i % arr.length;
      if(!(index in arr) && sparse === true) {
        return iterateOverSparseArray(arr, fn, i, loop);
      } else if(fn.call(arr, arr[index], index, arr) === false) {
        break;
      }
      i++;
    }
  }

  function arrayFind(arr, f, startIndex, loop, returnIndex) {
    var result, index;
    arrayEach(arr, function(el, i, arr) {
      if(multiMatch(el, f, arr, [i, arr])) {
        result = el;
        index = i;
        return false;
      }
    }, startIndex, loop);
    return returnIndex ? index : result;
  }

  function existsInArray(arr, obj) {
    return arr.any(function(el) {
      return object.equal(obj, el);
    });
  }

  function arrayUnique(arr, map) {
    var prop, test = function(el) { return transformArgument(el, map, arr, [el]) === prop; };
    return arr.reduce(function(result, next, index) {
      prop = transformArgument(next, map, arr, [next, index, arr]);
      if(result.none(map ? test : next)) result.push(next);
      return result;
    }, []);
  }

  function arrayFlatten(arr, level, current) {
    level = level || Infinity;
    current = current || 0;
    var result = [];
    arrayEach(arr, function(el) {
      if(object.isArray(el) && current < level) {
        result = result.concat(arrayFlatten(el, level, current + 1));
      } else {
        result.push(el);
      }
    });
    return result;
  }

  function arrayIntersect(arr1, arr2, subtract) {
    var result = [];
    arr1.each(function(el) {
      // Add the result to the array if:
      // 1. We're subtracting intersections or it doesn't already exist in the result and
      // 2. It exists in the compared array and we're adding, or it doesn't exist and we're removing.
      if((subtract || !existsInArray(result, el)) && subtract != existsInArray(arr2, el)) {
        result.push(el);
      }
    });
    return result;
  }

  // ECMA5 methods

  function arrayIndexOf(arr, search, fromIndex, increment) {
    var length = arr.length,
        fromRight = increment == -1,
        start = fromRight ? length - 1 : 0,
        index = toIntegerWithDefault(fromIndex, start);
    if(index < 0) {
      index = length + index;
    }
    if((!fromRight && index < 0) || (fromRight && index >= length)) {
      index = start;
    }
    while((fromRight && index >= 0) || (!fromRight && index < length)) {
      if(arr[index] === search) {
        return index;
      }
      index += increment;
    }
    return -1;
  }

  function arrayReduce(arr, fn, initialValue, fromRight) {
    var length = arr.length, count = 0, defined = isDefined(initialValue), result, index;
    checkCallback(fn);
    if(length == 0 && !defined) {
      throw new TypeError('Reduce called on empty array with no initial value');
    } else if(defined) {
      result = initialValue;
    } else {
      result = arr[fromRight ? length - 1 : count];
      count++;
    }
    while(count < length) {
      index = fromRight ? length - count - 1 : count;
      if(index in arr) {
        result = fn.call(Undefined, result, arr[index], index, arr);
      }
      count++;
    }
    return result;
  }

  function toIntegerWithDefault(i, d) {
    if(isNaN(i)) {
      return d;
    } else {
      return parseInt(i >> 0);
    }
  }

  function isArrayIndex(arr, i) {
    return i in arr && toUInt32(i) == i && i != 0xffffffff;
  }

  function toUInt32(i) {
    return i >>> 0;
  }

  function checkCallback(fn) {
    if(!fn || !fn.call) {
      throw new TypeError('Callback is not callable');
    }
  }

  function checkFirstArgumentExists(args) {
    if(args.length === 0) {
      throw new TypeError('First argument must be defined');
    }
  }

  // Support methods

  function iterateOverSparseArray(arr, fn, fromIndex, loop) {
    var indexes = [], i;
    for(i in arr) {
      if(isArrayIndex(arr, i) && i >= fromIndex) {
        indexes.push(i.toNumber());
      }
    }
    indexes.sort().each(function(index) {
      return fn.call(arr, arr[index], index, arr);
    });
    return arr;
  }

  function getMinOrMax(obj, map, which, isArray) {
    var max = which === 'max', min = which === 'min';
    var edge = max ? -Infinity : Infinity;
    var result = [];
    iterateOverObject(obj, function(key) {
      var entry = obj[key];
      var test = transformArgument(entry, map, obj, isArray? [entry, key.toNumber(), obj] : []);
      if(isUndefined(test)) {
        return;
      } else if(test === edge) {
        result.push(entry);
      } else if((max && test > edge) || (min && test < edge)) {
        result = [entry];
        edge = test;
      }
    });
    return result;
  }



  extend(array, false, false, {

    /***
     *
     * @method Array.create(<obj1>, <obj2>, ...)
     * @returns Array
     * @short Alternate array constructor.
     * @extra This method will create a single array by calling %concat% on all arguments passed. In addition to ensuring that an unknown variable is in a single, flat array (the standard constructor will create nested arrays, this one will not), it is also a useful shorthand to convert a function's arguments object into a standard array.
     * @example
     *
     *   Array.create('one', true, 3)   -> ['one', true, 3]
     *   Array.create(['one', true, 3]) -> ['one', true, 3]
     +   Array.create(function(n) {
     *     return arguments;
     *   }('howdy', 'doody'));
     *
     ***/
    'create': function(obj) {
      var result = [];
      multiArgs(arguments, function(a) {
        if(a && a.callee) a = getArgs(a);
        result = result.concat(a);
      });
      return result;
    },

    /***
     *
     * @method Array.isArray(<obj>)
     * @returns Boolean
     * @short Returns true if <obj> is an Array.
     * @extra This method is provided for browsers that don't support it internally.
     * @example
     *
     *   Array.isArray(3)        -> false
     *   Array.isArray(true)     -> false
     *   Array.isArray('wasabi') -> false
     *   Array.isArray([1,2,3])  -> true
     *
     ***/
    'isArray': function(obj) {
      return isClass(obj, 'Array');
    }

  });



  extend(array, true, function() { var a = arguments; return a.length > 0 && !object.isFunction(a[0]); }, {

    /***
     * @method every(<f>, [scope])
     * @returns Boolean
     * @short Returns true if all elements in the array match <f>.
     * @extra [scope] is the %this% object. In addition to providing this method for browsers that don't support it natively, this enhanced method also directly accepts strings, numbers, deep objects, and arrays for <f>. %all% is provided an alias.
     * @example
     *
     +   ['a','a','a'].every(function(n) {
     *     return n == 'a';
     *   });
     *   ['a','a','a'].every('a')   -> true
     *   [{a:2},{a:2}].every({a:2}) -> true
     *
     ***/
    'every': function(f, scope) {
      var length = this.length, index = 0;
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this && !multiMatch(this[index], f, scope, [index, this])) {
          return false;
        }
        index++;
      }
      return true;
    },

    /***
     * @method some(<f>, [scope])
     * @returns Boolean
     * @short Returns true if any element in the array matches <f>.
     * @extra [scope] is the %this% object. In addition to providing this method for browsers that don't support it natively, this enhanced method also directly accepts strings, numbers, deep objects, and arrays for <f>. %any% and %has% are provided as aliases.
     * @example
     *
     +   ['a','b','c'].some(function(n) {
     *     return n == 'a';
     *   });
     +   ['a','b','c'].some(function(n) {
     *     return n == 'd';
     *   });
     *   ['a','b','c'].some('a')   -> true
     *   [{a:2},{b:5}].some({a:2}) -> true
     *
     ***/
    'some': function(f, scope) {
      var length = this.length, index = 0;
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this && multiMatch(this[index], f, scope, [index, this])) {
          return true;
        }
        index++;
      }
      return false;
    },

    /***
     * @method map(<map>, [scope])
     * @returns Array
     * @short Maps the array to another array containing the values that are the result of calling <map> on each element.
     * @extra [scope] is the %this% object. In addition to providing this method for browsers that don't support it natively, this enhanced method also directly accepts a string, which is a shortcut for a function that gets that property (or invokes a function) on each element. %collect% is provided as an alias.
     * @example
     *
     +   [1,2,3].map(function(n) {
     *     return n * 3;
     *   });                                  -> [3,6,9]
     *   ['one','two','three'].map(function(n) {
     *     return n.length;
     *   });                                  -> [3,3,5]
     *   ['one','two','three'].map('length')  -> [3,3,5]
     *
     ***/
    'map': function(map, scope) {
      var length = this.length, index = 0, el, result = new Array(length);
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this) {
          el = this[index];
          result[index] = transformArgument(el, map, scope, [el, index, this]);
        }
        index++;
      }
      return result;
    },

    /***
     * @method filter(<f>, [scope])
     * @returns Array
     * @short Returns any elements in the array that match <f>.
     * @extra [scope] is the %this% object. In addition to providing this method for browsers that don't support it natively, this enhanced method also directly accepts strings, numbers, deep objects, and arrays for <f>.
     * @example
     *
     +   [1,2,3].filter(function(n) {
     *     return n > 1;
     *   });
     *   [1,2,2,4].filter(2) -> 2
     *
     ***/
    'filter': function(f, scope) {
      var length = this.length, index = 0, result = [];
      checkFirstArgumentExists(arguments);
      while(index < length) {
        if(index in this && multiMatch(this[index], f, scope, [index, this])) {
          result.push(this[index]);
        }
        index++;
      }
      return result;
    }

  });


  extend(array, true, false, {

    /***
     * @method indexOf(<search>, [fromIndex])
     * @returns Number
     * @short Searches the array and returns the first index where <search> occurs, or -1 if the element is not found.
     * @extra [fromIndex] is the index from which to begin the search. This method performs a simple strict equality comparison on <search>. It does not support enhanced functionality such as searching the contents against a regex, callback, or deep comparison of objects. For such functionality, use the %find% method instead.
     * @example
     *
     *   [1,2,3].indexOf(3)           -> 1
     *   [1,2,3].indexOf(7)           -> -1
     *
     ***/
    'indexOf': function(search, fromIndex) {
      if(object.isString(this)) return this.indexOf(search, fromIndex);
      return arrayIndexOf(this, search, fromIndex, 1);
    },

    /***
     * @method lastIndexOf(<search>, [fromIndex])
     * @returns Number
     * @short Searches the array and returns the last index where <search> occurs, or -1 if the element is not found.
     * @extra [fromIndex] is the index from which to begin the search. This method performs a simple strict equality comparison on <search>.
     * @example
     *
     *   [1,2,1].lastIndexOf(1)                 -> 2
     *   [1,2,1].lastIndexOf(7)                 -> -1
     *
     ***/
    'lastIndexOf': function(search, fromIndex) {
      if(object.isString(this)) return this.lastIndexOf(search, fromIndex);
      return arrayIndexOf(this, search, fromIndex, -1);
    },

    /***
     * @method forEach([fn], [scope])
     * @returns Nothing
     * @short Iterates over the array, calling [fn] on each loop.
     * @extra This method is only provided for those browsers that do not support it natively. [scope] becomes the %this% object.
     * @example
     *
     *   ['a','b','c'].forEach(function(a) {
     *     // Called 3 times: 'a','b','c'
     *   });
     *
     ***/
    'forEach': function(fn, scope) {
      var length = this.length, index = 0;
      checkCallback(fn);
      while(index < length) {
        if(index in this) {
          fn.call(scope, this[index], index, this);
        }
        index++;
      }
    },

    /***
     * @method reduce([fn], [init])
     * @returns Mixed
     * @short Reduces the array to a single result.
     * @extra By default this method calls [fn] n - 1 times, where n is the length of the array. On the first call it is passed the first and second elements in the array. The result of that callback will then be passed into the next iteration until it reaches the end, where the accumulated value will be returned as the final result. If [init] is passed, it will call [fn] one extra time in the beginning passing in [init] along with the first element. This method is only provided for those browsers that do not support it natively.
     * @example
     *
     +   [1,2,3,4].reduce(function(a, b) {
     *     return a + b;
     *   });
     +   [1,2,3,4].reduce(function(a, b) {
     *     return a + b;
     *   }, 100);
     *
     ***/
    'reduce': function(fn, init) {
      return arrayReduce(this, fn, init);
    },

    /***
     * @method reduceRight([fn], [init])
     * @returns Mixed
     * @short Reduces the array to a single result by stepping through it from the right.
     * @extra By default this method calls [fn] n - 1 times, where n is the length of the array. On the first call it is passed the last and second to last elements in the array. The result of that callback will then be passed into the next iteration until it reaches the beginning, where the accumulated value will be returned as the final result. If [init] is passed, it will call [fn] one extra time in the beginning passing in [init] along with the last element. This method is only provided for those browsers that do not support it natively.
     * @example
     *
     +   [1,2,3,4].reduceRight(function(a, b) {
     *     return a - b;
     *   });
     *
     ***/
    'reduceRight': function(fn, init) {
      return arrayReduce(this, fn, init, true);
    },

    /***
     * @method each(<fn>, [index] = 0, [loop] = false)
     * @returns Array
     * @short Runs <fn> against elements in the array. Enhanced version of %Array#forEach%.
     * @extra Parameters passed to <fn> are identical to %forEach%, ie. the first parameter is the current element, second parameter is the current index, and third parameter is the array itself. If <fn> returns %false% at any time it will break out of the loop. Once %each% finishes, it will return the array. If [index] is passed, <fn> will begin at that index and work its way to the end. If [loop] is true, it will then start over from the beginning of the array and continue until it reaches [index] - 1.
     * @example
     *
     *   [1,2,3,4].each(function(n) {
     *     // Called 4 times: 1, 2, 3, 4
     *   });
     *   [1,2,3,4].each(function(n) {
     *     // Called 4 times: 3, 4, 1, 2
     *   }, 2, true);
     *
     ***/
    'each': function(fn, index, loop) {
      arrayEach(this, fn, index, loop, true);
      return this;
    },

    /***
     * @method find(<f>, [index] = 0, [loop] = false)
     * @returns Mixed
     * @short Returns the first element that matches <f>.
     * @extra <f> will match a string, number, array, object, or alternately test against a function or regex. Starts at [index], and will continue once from index = 0 if [loop] is true.
     * @example
     *
     +   [{a:1,b:2},{a:1,b:3},{a:1,b:4}].find(function(n) {
     *     return n['a'] == 1;
     *   });                                     -> {a:1,b:3}
     *   ['cuba','japan','canada'].find(/^c/, 2) -> 'canada'
     *
     ***/
    'find': function(f, index, loop) {
      return arrayFind(this, f, index, loop);
    },

    /***
     * @method findAll(<f>, [index] = 0, [loop] = false)
     * @returns Array
     * @short Returns all elements that match <f>.
     * @extra <f> will match a string, number, array, object, or alternately test against a function or regex. Starts at [index], and will continue once from index = 0 if [loop] is true.
     * @example
     *
     +   [{a:1,b:2},{a:1,b:3},{a:2,b:4}].findAll(function(n) {
     *     return n['a'] == 1;
     *   });                                        -> [{a:1,b:3},{a:1,b:4}]
     *   ['cuba','japan','canada'].findAll(/^c/)    -> 'cuba','canada'
     *   ['cuba','japan','canada'].findAll(/^c/, 2) -> 'canada'
     *
     ***/
    'findAll': function(f, index, loop) {
      var result = [];
      arrayEach(this, function(el, i, arr) {
        if(multiMatch(el, f, arr, [i, arr])) {
          result.push(el);
        }
      }, index, loop);
      return result;
    },

    /***
     * @method findIndex(<f>, [startIndex] = 0, [loop] = false)
     * @returns Number
     * @short Returns the index of the first element that matches <f> or -1 if not found.
     * @extra This method has a few notable differences to native %indexOf%. Although <f> will similarly match a primitive such as a string or number, it will also match deep objects and arrays that are not equal by reference (%===%). Additionally, if a function is passed it will be run as a matching function (similar to the behavior of %Array#filter%) rather than attempting to find that function itself by reference in the array. Finally, a regexp will be matched against elements in the array, presumed to be strings. Starts at [index], and will continue once from index = 0 if [loop] is true.
     * @example
     *
     +   [1,2,3,4].findIndex(3);  -> 2
     +   [1,2,3,4].findIndex(function(n) {
     *     return n % 2 == 0;
     *   }); -> 1
     +   ['one','two','three'].findIndex(/th/); -> 2
     *
     ***/
    'findIndex': function(f, startIndex, loop) {
      var index = arrayFind(this, f, startIndex, loop, true);
      return isDefined(index) ? index : -1;
    },

    /***
     * @method count(<f>)
     * @returns Number
     * @short Counts all elements in the array that match <f>.
     * @extra <f> will match a string, number, array, object, or alternately test against a function or regex.
     * @example
     *
     *   [1,2,3,1].count(1)       -> 2
     *   ['a','b','c'].count(/b/) -> 1
     +   [{a:1},{b:2}].count(function(n) {
     *     return n['a'] > 1;
     *   });                      -> 0
     *
     ***/
    'count': function(f) {
      if(isUndefined(f)) return this.length;
      return this.findAll(f).length;
    },

    /***
     * @method none(<f>)
     * @returns Boolean
     * @short Returns true if none of the elements in the array match <f>.
     * @extra <f> will match a string, number, array, object, or alternately test against a function or regex.
     * @example
     *
     *   [1,2,3].none(5)         -> true
     *   ['a','b','c'].none(/b/) -> false
     +   [{a:1},{b:2}].none(function(n) {
     *     return n['a'] > 1;
     *   });                     -> true
     *
     ***/
    'none': function() {
      return !this.any.apply(this, arguments);
    },

    /***
     * @method remove([f1], [f2], ...)
     * @returns Array
     * @short Removes any element in the array that matches [f1], [f2], etc.
     * @extra Will match a string, number, array, object, or alternately test against a function or regex. This method will change the array! Use %exclude% for a non-destructive alias.
     * @example
     *
     *   [1,2,3].remove(3)         -> [1,2]
     *   ['a','b','c'].remove(/b/) -> ['a','c']
     +   [{a:1},{b:2}].remove(function(n) {
     *     return n['a'] == 1;
     *   });                       -> [{b:2}]
     *
     ***/
    'remove': function() {
      var i, arr = this;
      multiArgs(arguments, function(f) {
        i = 0;
        while(i < arr.length) {
          if(multiMatch(arr[i], f, arr, [i, arr])) {
            arr.splice(i, 1);
          } else {
            i++;
          }
        }
      }, false);
      return arr;
    },

    /***
     * @method removeAt(<start>, [end])
     * @returns Array
     * @short Removes element at <start>. If [end] is specified, removes the range between <start> and [end]. This method will change the array! If you don't intend the array to be changed use %clone% first.
     * @example
     *
     *   ['a','b','c'].removeAt(0) -> ['b','c']
     *   [1,2,3,4].removeAt(1, 3)  -> [1]
     *
     ***/
    'removeAt': function(start, end) {
      if(isUndefined(start)) return this;
      if(isUndefined(end)) end = start;
      for(var i = 0; i <= (end - start); i++) {
        this.splice(start, 1);
      }
      return this;
    },

    /***
     * @method add(<el>, [index])
     * @returns Array
     * @short Adds <el> to the array.
     * @extra If [index] is specified, it will add at [index], otherwise adds to the end of the array. %add% behaves like %concat% in that if <el> is an array it will be joined, not inserted. This method will change the array! Use %include% for a non-destructive alias. Also, %insert% is provided as an alias that reads better when using an index.
     * @example
     *
     *   [1,2,3,4].add(5)       -> [1,2,3,4,5]
     *   [1,2,3,4].add([5,6,7]) -> [1,2,3,4,5,6,7]
     *   [1,2,3,4].insert(8, 1) -> [1,8,2,3,4]
     *
     ***/
    'add': function(el, index) {
      if(!object.isNumber(number(index)) || isNaN(index) || index == -1) index = this.length;
      else if(index < -1) index += 1;
      array.prototype.splice.apply(this, [index, 0].concat(el));
      return this;
    },

    /***
     * @method include(<el>, [index])
     * @returns Array
     * @short Adds <el> to the array.
     * @extra This is a non-destructive alias for %add%. It will not change the original array.
     * @example
     *
     *   [1,2,3,4].include(5)       -> [1,2,3,4,5]
     *   [1,2,3,4].include(8, 1)    -> [1,8,2,3,4]
     *   [1,2,3,4].include([5,6,7]) -> [1,2,3,4,5,6,7]
     *
     ***/
    'include': function(el, index) {
      return this.clone().add(el, index);
    },

    /***
     * @method exclude([f1], [f2], ...)
     * @returns Array
     * @short Removes any element in the array that matches [f1], [f2], etc.
     * @extra This is a non-destructive alias for %remove%. It will not change the original array.
     * @example
     *
     *   [1,2,3].exclude(3)         -> [1,2]
     *   ['a','b','c'].exclude(/b/) -> ['a','c']
     +   [{a:1},{b:2}].exclude(function(n) {
     *     return n['a'] == 1;
     *   });                       -> [{b:2}]
     *
     ***/
    'exclude': function() {
      return array.prototype.remove.apply(this.clone(), arguments);
    },

    /***
     * @method clone()
     * @returns Array
     * @short Clones the array.
     * @example
     *
     *   [1,2,3].clone() -> [1,2,3]
     *
     ***/
    'clone': function() {
      return mergeObject([], this);
    },

    /***
     * @method unique([map] = null)
     * @returns Array
     * @short Removes all duplicate elements in the array.
     * @extra [map] may be a function mapping the value to be uniqued on or a string acting as a shortcut. This is most commonly used when you have a key that ensures the object's uniqueness, and don't need to check all fields.
     * @example
     *
     *   [1,2,2,3].unique()                 -> [1,2,3]
     *   [{foo:'bar'},{foo:'bar'}].unique() -> [{foo:'bar'}]
     +   [{foo:'bar'},{foo:'bar'}].unique(function(obj){
     *     return obj.foo;
     *   }); -> [{foo:'bar'}]
     *   [{foo:'bar'},{foo:'bar'}].unique('foo') -> [{foo:'bar'}]
     *
     ***/
    'unique': function(map) {
      return arrayUnique(this, map);
    },

    /***
     * @method union([a1], [a2], ...)
     * @returns Array
     * @short Returns an array containing all elements in all arrays with duplicates removed.
     * @example
     *
     *   [1,3,5].union([5,7,9])     -> [1,3,5,7,9]
     *   ['a','b'].union(['b','c']) -> ['a','b','c']
     *
     ***/
    'union': function() {
      var arr = this;
      multiArgs(arguments, function(a) {
        arr = arr.concat(a);
      });
      return arrayUnique(arr);
    },

    /***
     * @method intersect([a1], [a2], ...)
     * @returns Array
     * @short Returns an array containing the elements all arrays have in common.
     * @example
     *
     *   [1,3,5].intersect([5,7,9])   -> [5]
     *   ['a','b'].intersect('b','c') -> ['b']
     *
     ***/
    'intersect': function() {
      return arrayIntersect(this, multiArgs(arguments), false);
    },

    /***
     * @method subtract([a1], [a2], ...)
     * @returns Array
     * @short Subtracts from the array all elements in [a1], [a2], etc.
     * @example
     *
     *   [1,3,5].subtract([5,7,9])   -> [1,3]
     *   [1,3,5].subtract([3],[5])   -> [1]
     *   ['a','b'].subtract('b','c') -> ['a']
     *
     ***/
    'subtract': function(a) {
      return arrayIntersect(this, multiArgs(arguments), true);
    },

    /***
     * @method at(<index>, [loop] = true)
     * @returns Mixed
     * @short Gets the element(s) at a given index.
     * @extra When [loop] is true, overshooting the end of the array (or the beginning) will begin counting from the other end. As an alternate syntax, passing multiple indexes will get the elements at those indexes.
     * @example
     *
     *   [1,2,3].at(0)        -> 1
     *   [1,2,3].at(2)        -> 3
     *   [1,2,3].at(4)        -> 2
     *   [1,2,3].at(4, false) -> null
     *   [1,2,3].at(-1)       -> 3
     *   [1,2,3].at(0,1)      -> [1,2]
     *
     ***/
    'at': function() {
      return entryAtIndex(this, arguments);
    },

    /***
     * @method first([num] = 1)
     * @returns Mixed
     * @short Returns the first element(s) in the array.
     * @extra When <num> is passed, returns the first <num> elements in the array.
     * @example
     *
     *   [1,2,3].first()        -> 1
     *   [1,2,3].first(2)       -> [1,2]
     *
     ***/
    'first': function(num) {
      if(isUndefined(num)) return this[0];
      if(num < 0) num = 0;
      return this.slice(0, num);
    },

    /***
     * @method last([num] = 1)
     * @returns Mixed
     * @short Returns the last element(s) in the array.
     * @extra When <num> is passed, returns the last <num> elements in the array.
     * @example
     *
     *   [1,2,3].last()        -> 3
     *   [1,2,3].last(2)       -> [2,3]
     *
     ***/
    'last': function(num) {
      if(isUndefined(num)) return this[this.length - 1];
      var start = this.length - num < 0 ? 0 : this.length - num;
      return this.slice(start);
    },

    /***
     * @method from(<index>)
     * @returns Array
     * @short Returns a slice of the array from <index>.
     * @example
     *
     *   [1,2,3].from(1)  -> [2,3]
     *   [1,2,3].from(2)  -> [3]
     *
     ***/
    'from': function(num) {
      return this.slice(num);
    },

    /***
     * @method to(<index>)
     * @returns Array
     * @short Returns a slice of the array up to <index>.
     * @example
     *
     *   [1,2,3].to(1)  -> [1]
     *   [1,2,3].to(2)  -> [1,2]
     *
     ***/
    'to': function(num) {
      if(isUndefined(num)) num = this.length;
      return this.slice(0, num);
    },

    /***
     * @method min([map])
     * @returns Array
     * @short Returns the elements in the array with the lowest value.
     * @extra [map] may be a function mapping the value to be checked or a string acting as a shortcut.
     * @example
     *
     *   [1,2,3].min()                    -> [1]
     *   ['fee','fo','fum'].min('length') -> ['fo']
     +   ['fee','fo','fum'].min(function(n) {
     *     return n.length;
     *   });                              -> ['fo']
     +   [{a:3,a:2}].min(function(n) {
     *     return n['a'];
     *   });                              -> [{a:2}]
     *
     ***/
    'min': function(map) {
      return arrayUnique(getMinOrMax(this, map, 'min', true));
    },

    /***
     * @method max(<map>)
     * @returns Array
     * @short Returns the elements in the array with the greatest value.
     * @extra <map> may be a function mapping the value to be checked or a string acting as a shortcut.
     * @example
     *
     *   [1,2,3].max()                    -> [3]
     *   ['fee','fo','fum'].max('length') -> ['fee','fum']
     +   [{a:3,a:2}].max(function(n) {
     *     return n['a'];
     *   });                              -> [{a:3}]
     *
     ***/
    'max': function(map) {
      return arrayUnique(getMinOrMax(this, map, 'max', true));
    },

    /***
     * @method least(<map>)
     * @returns Array
     * @short Returns the elements in the array with the least commonly occuring value.
     * @extra <map> may be a function mapping the value to be checked or a string acting as a shortcut.
     * @example
     *
     *   [3,2,2].least()                   -> [3]
     *   ['fe','fo','fum'].least('length') -> ['fum']
     +   [{age:35,name:'ken'},{age:12,name:'bob'},{age:12,name:'ted'}].least(function(n) {
     *     return n.age;
     *   });                               -> [{age:35,name:'ken'}]
     *
     ***/
    'least': function() {
      var result = arrayFlatten(getMinOrMax(this.groupBy.apply(this, arguments), 'length', 'min'));
      return result.length === this.length ? [] : arrayUnique(result);
    },

    /***
     * @method most(<map>)
     * @returns Array
     * @short Returns the elements in the array with the most commonly occuring value.
     * @extra <map> may be a function mapping the value to be checked or a string acting as a shortcut.
     * @example
     *
     *   [3,2,2].most()                   -> [2]
     *   ['fe','fo','fum'].most('length') -> ['fe','fo']
     +   [{age:35,name:'ken'},{age:12,name:'bob'},{age:12,name:'ted'}].most(function(n) {
     *     return n.age;
     *   });                              -> [{age:12,name:'bob'},{age:12,name:'ted'}]
     *
     ***/
    'most': function() {
      var result = arrayFlatten(getMinOrMax(this.groupBy.apply(this, arguments), 'length', 'max'));
      return result.length === this.length ? [] : arrayUnique(result);
    },

    /***
     * @method sum(<map>)
     * @returns Number
     * @short Sums all values in the array.
     * @extra <map> may be a function mapping the value to be summed or a string acting as a shortcut.
     * @example
     *
     *   [1,2,2].sum()                           -> 5
     +   [{age:35},{age:12},{age:12}].sum(function(n) {
     *     return n.age;
     *   });                                     -> 59
     *   [{age:35},{age:12},{age:12}].sum('age') -> 59
     *
     ***/
    'sum': function(map) {
      var arr = map ? this.map(map) : this;
      return arr.length > 0 ? arr.reduce(function(a,b) { return a + b; }) : 0;
    },

    /***
     * @method average(<map>)
     * @returns Number
     * @short Averages all values in the array.
     * @extra <map> may be a function mapping the value to be averaged or a string acting as a shortcut.
     * @example
     *
     *   [1,2,3].average()                           -> 2
     +   [{age:35},{age:11},{age:11}].average(function(n) {
     *     return n.age;
     *   });                                         -> 19
     *   [{age:35},{age:11},{age:11}].average('age') -> 19
     *
     ***/
    'average': function(map) {
      var arr = map ? this.map(map) : this;
      return arr.length > 0 ? arr.sum() / arr.length : 0;
    },

    /***
     * @method groupBy(<map>, [fn])
     * @returns Object
     * @short Groups the array by <map>.
     * @extra Will return an object with keys equal to the grouped values. <map> may be a mapping function, or a string acting as a shortcut. Optionally calls [fn] for each group.
     * @example
     *
     *   ['fee','fi','fum'].groupBy('length') -> { 2: ['fi'], 3: ['fee','fum'] }
     +   [{age:35,name:'ken'},{age:15,name:'bob'}].groupBy(function(n) {
     *     return n.age;
     *   });                                  -> { 35: [{age:35,name:'ken'}], 15: [{age:15,name:'bob'}] }
     *
     ***/
    'groupBy': function(map, fn) {
      var arr = this, result = object.extended(), key;
      arrayEach(arr, function(el, index) {
        key = transformArgument(el, map, arr, [el, index, arr]);
        if(!result[key]) result[key] = [];
        result[key].push(el);
      });
      return result.each(fn);
    },

    /***
     * @method inGroups(<num>, [padding])
     * @returns Array
     * @short Groups the array into <num> arrays.
     * @extra [padding] specifies a value with which to pad the last array so that they are all equal length.
     * @example
     *
     *   [1,2,3,4,5,6,7].inGroups(3)         -> [ [1,2,3], [4,5,6], [7] ]
     *   [1,2,3,4,5,6,7].inGroups(3, 'none') -> [ [1,2,3], [4,5,6], [7,'none','none'] ]
     *
     ***/
    'inGroups': function(num, padding) {
      var pad = arguments.length > 1;
      var arr = this;
      var result = [];
      var divisor = (this.length / num).ceil();
      (0).upto(num - 1, function(i) {
        var index = i * divisor;
        var group = arr.slice(index, index + divisor);
        if(pad && group.length < divisor) {
          (divisor - group.length).times(function() {
            group = group.add(padding);
          });
        }
        result.push(group);
      });
      return result;
    },

    /***
     * @method inGroupsOf(<num>, [padding] = null)
     * @returns Array
     * @short Groups the array into arrays of <num> elements each.
     * @extra [padding] specifies a value with which to pad the last array so that they are all equal length.
     * @example
     *
     *   [1,2,3,4,5,6,7].inGroupsOf(4)         -> [ [1,2,3,4], [5,6,7] ]
     *   [1,2,3,4,5,6,7].inGroupsOf(4, 'none') -> [ [1,2,3,4], [5,6,7,'none'] ]
     *
     ***/
    'inGroupsOf': function(num, padding) {
      if(this.length === 0 || num === 0) return this;
      if(isUndefined(num)) num = 1;
      if(isUndefined(padding)) padding = null;
      var result = [];
      var group = null;
      var len = this.length;
      this.each(function(el, i) {
        if((i % num) === 0) {
          if(group) result.push(group);
          group = [];
        }
        if(isUndefined(el)) el = padding;
        group.push(el);
      });
      if(!this.length.isMultipleOf(num)) {
        (num - (this.length % num)).times(function() {
          group.push(padding);
        });
        this.length = this.length + (num - (this.length % num));
      }
      if(group.length > 0) result.push(group);
      return result;
    },

    /***
     * @method compact([all] = false)
     * @returns Array
     * @short Removes all instances of %undefined%, %null%, and %NaN% from the array.
     * @extra If [all] is %true%, all "falsy" elements will be removed. This includes empty strings, 0, and false.
     * @example
     *
     *   [1,null,2,undefined,3].compact() -> [1,2,3]
     *   [1,'',2,false,3].compact()       -> [1,'',2,false,3]
     *   [1,'',2,false,3].compact(true)   -> [1,2,3]
     *
     ***/
    'compact': function(all) {
      var result = [];
      arrayEach(this, function(el, i) {
        if(object.isArray(el)) {
          result.push(el.compact());
        } else if(all && el) {
          result.push(el);
        } else if(!all && isDefined(el) && !isNull(el) && (!object.isNumber(el) || !isNaN(el))) {
          result.push(el);
        }
      });
      return result;
    },

    /***
     * @method isEmpty()
     * @returns Boolean
     * @short Returns true if the array is empty.
     * @extra This is true if the array has a length of zero, or contains only %undefined%, %null%, or %NaN%.
     * @example
     *
     *   [].isEmpty()               -> true
     *   [null,undefined].isEmpty() -> true
     *
     ***/
    'isEmpty': function() {
      return this.compact().length == 0;
    },

    /***
     * @method flatten([limit] = Infinity)
     * @returns Array
     * @short Returns a flattened, one-dimensional copy of the array.
     * @extra You can optionally specify a [limit], which will only flatten that depth.
     * @example
     *
     *   [[1], 2, [3]].flatten()      -> [1,2,3]
     *   [['a'],[],'b','c'].flatten() -> ['a','b','c']
     *
     ***/
    'flatten': function(limit) {
      return arrayFlatten(this, limit);
    },

    /***
     * @method sortBy(<map>, [desc] = false)
     * @returns Array
     * @short Sorts the array by <map>.
     * @extra <map> may be a function or a string acting as a shortcut. [desc] will sort the array in descending order.
     * @example
     *
     *   ['world','a','new'].sortBy('length')       -> ['a','new','world']
     *   ['world','a','new'].sortBy('length', true) -> ['world','new','a']
     +   [{age:72},{age:13},{age:18}].sortBy(function(n) {
     *     return n.age;
     *   });                                        -> [{age:13},{age:18},{age:72}]
     *
     ***/
    'sortBy': function(map, desc) {
      var arr = this.clone();
      arr.sort(function(a, b) {
        var aProperty, bProperty, comp;
        aProperty = transformArgument(a, map, arr, [a]);
        bProperty = transformArgument(b, map, arr, [b]);
        if(aProperty && aProperty.compare) {
          comp = aProperty.compare(bProperty);
        } else {
          comp = aProperty < bProperty;
        }
        return comp * (desc ? -1 : 1);
      });
      return arr;
    },

    /***
     * @method randomize()
     * @returns Array
     * @short Randomizes the array.
     * @extra Uses Fisher-Yates algorithm.
     * @example
     *
     *   [1,2,3,4].randomize()  -> [?,?,?,?]
     *
     ***/
    'randomize': function() {
      var a = this.concat();
      for(var j, x, i = a.length; i; j = parseInt(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x) {};
      return a;
    },

    /***
     * @method zip([arr1], [arr2], ...)
     * @returns Array
     * @short Merges multiple arrays together.
     * @extra This method "zips up" smaller arrays into one large whose elements are "all elements at index 0", "all elements at index 1", etc. Useful when you have associated data that is split over separated arrays. If the arrays passed have more elements than the original array, they will be discarded. If they have fewer elements, the missing elements will filled with %null%.
     * @example
     *
     *   [1,2,3].zip([4,5,6])                                       -> [[1,2], [3,4], [5,6]]
     *   ['Martin','John'].zip(['Luther','F.'], ['King','Kennedy']) -> [['Martin','Luther','King'], ['John','F.','Kennedy']]
     *
     ***/
    'zip': function() {
      var args = getArgs(arguments);
      return this.map(function(el, i) {
        return [el].concat(args.map(function(k) {
          return (i in k) ? k[i] : null;
        }));
      });
    },

    /***
     * @method sample([num] = null)
     * @returns Mixed
     * @short Returns a random element from the array.
     * @extra If [num] is a number greater than 0, will return an array containing [num] samples.
     * @example
     *
     *   [1,2,3,4,5].sample()  -> // Random element
     *   [1,2,3,4,5].sample(3) -> // Array of 3 random elements
     *
     ***/
    'sample': function(num) {
      var result = [], arr = this.clone(), index;
      if(!(num > 0)) num = 1;
      while(result.length < num) {
        index = Number.random(0, arr.length - 1);
        result.push(arr[index]);
        arr.removeAt(index);
        if(arr.length == 0) break;
      }
      return arguments.length > 0 ? result : result[0];
    }


  });


  // Aliases
  extend(array, true, false, {

    /***
     * @method all()
     * @alias every
     *
     ***/
    'all': array.prototype.every,

    /*** @method any()
     * @alias some
     *
     ***/
    'any': array.prototype.some,

    /***
     * @method has()
     * @alias some
     *
     ***/
    'has': array.prototype.some,

    /***
     * @method insert()
     * @alias add
     *
     ***/
    'insert': array.prototype.add

  });










  /***
   * Number module
   *
   ***/


  function round(val, precision, method) {
    var fn = Math[method || 'round'];
    var multiplier = Math.pow(10, (precision || 0).abs());
    if(precision < 0) multiplier = 1 / multiplier;
    return fn(val * multiplier) / multiplier;
  }

  function getRange(start, stop, fn, step) {
    var arr = [], i = parseInt(start), up = step > 0;
    while((up && i <= stop) || (!up && i >= stop)) {
      arr.push(i);
      if(fn) fn.call(this, i);
      i += step;
    }
    return arr;
  }

  function abbreviateNumber(num, roundTo, str, mid, limit, bytes) {
    var fixed        = num.toFixed(20),
        decimalPlace = fixed.search(/\./),
        numeralPlace = fixed.search(/[1-9]/),
        significant  = decimalPlace - numeralPlace,
        unit, i, divisor;
    if(significant > 0) {
      significant -= 1;
    }
    i = Math.max(Math.min((significant / 3).floor(), limit === false ? str.length : limit), -mid);
    unit = str.charAt(i + mid - 1);
    if(significant < -9) {
      i = -3;
      roundTo = significant.abs() - 9;
      unit = str.first();
    }
    divisor = bytes ? (2).pow(10 * i) : (10).pow(i * 3);
    return (num / divisor).round(roundTo || 0).format() + unit.trim();
  }


  extend(number, false, false, {

    /***
     * @method Number.random([n1], [n2])
     * @returns Number
     * @short Returns a random integer between [n1] and [n2].
     * @extra If only 1 number is passed, the other will be 0. If none are passed, the number will be either 0 or 1.
     * @example
     *
     *   Number.random(50, 100) -> ex. 85
     *   Number.random(50)      -> ex. 27
     *   Number.random()        -> ex. 0
     *
     ***/
    'random': function(n1, n2) {
      var min, max;
      if(arguments.length == 1) n2 = n1, n1 = 0;
      min = Math.min(n1 || 0, isDefined(n2) ? n2 : 1);
      max = Math.max(n1 || 0, isDefined(n2) ? n2 : 1);
      return round((Math.random() * (max - min)) + min);
    }

  });

  extend(number, true, false, {

    /***
     * @method toNumber()
     * @returns Number
     * @short Returns a number. This is mostly for compatibility reasons.
     * @example
     *
     *   (420).toNumber() -> 420
     *
     ***/
    'toNumber': function() {
      return parseFloat(this, 10);
    },

    /***
     * @method abbr([precision] = 0)
     * @returns String
     * @short Returns an abbreviated form of the number.
     * @extra [precision] will round to the given precision.
     * @example
     *
     *   (1000).abbr()    -> "1k"
     *   (1000000).abbr() -> "1m"
     *   (1280).abbr(1)   -> "1.3k"
     *
     ***/
    'abbr': function(precision) {
      return abbreviateNumber(this, precision, 'kmbt', 0, 4);
    },

    /***
     * @method metric([precision] = 0, [limit] = 1)
     * @returns String
     * @short Returns the number as a string in metric notation.
     * @extra [precision] will round to the given precision. Both very large numbers and very small numbers are supported. [limit] is the upper limit for the units. The default is %1%, which is "kilo". If [limit] is %false%, the upper limit will be "exa". The lower limit is "nano", and cannot be changed.
     * @example
     *
     *   (1000).metric()            -> "1k"
     *   (1000000).metric()         -> "1,000k"
     *   (1000000).metric(0, false) -> "1M"
     *   (1249).metric(2) + 'g'     -> "1.25kg"
     *   (0.025).metric() + 'm'     -> "25mm"
     *
     ***/
    'metric': function(precision, limit) {
      return abbreviateNumber(this, precision, 'nμm kMGTPE', 4, isDefined(limit) ? limit : 1);
    },

    /***
     * @method bytes([precision] = 0, [limit] = 4)
     * @returns String
     * @short Returns an abbreviated form of the number, considered to be "Bytes".
     * @extra [precision] will round to the given precision. [limit] is the upper limit for the units. The default is %4%, which is "terabytes" (TB). If [limit] is %false%, the upper limit will be "exa".
     * @example
     *
     *   (1000).bytes()                 -> "1kB"
     *   (1000).bytes(2)                -> "0.98kB"
     *   ((10).pow(20)).bytes()         -> "90,949,470TB"
     *   ((10).pow(20)).bytes(0, false) -> "87EB"
     *
     ***/
    'bytes': function(precision, limit) {
      return abbreviateNumber(this, precision, 'kMGTPE', 0, isDefined(limit) ? limit : 4, true) + 'B';
    },

    /***
     * @method isInteger()
     * @returns Boolean
     * @short Returns true if the number has no trailing decimal.
     * @example
     *
     *   (420).isInteger() -> true
     *   (4.5).isInteger() -> false
     *
     ***/
    'isInteger': function() {
      return this % 1 == 0;
    },

    /***
     * @method ceil([precision] = 0)
     * @returns Number
     * @short Rounds the number up. [precision] will round to the given precision.
     * @example
     *
     *   (4.434).ceil()  -> 5
     *   (-4.434).ceil() -> -4
     *   (44.17).ceil(1) -> 44.2
     *   (4417).ceil(-2) -> 4500
     *
     ***/
    'ceil': function(precision) {
      return round(this, precision, 'ceil');
    },

    /***
     * @method floor([precision] = 0)
     * @returns Number
     * @short Rounds the number down. [precision] will round to the given precision.
     * @example
     *
     *   (4.434).floor()  -> 4
     *   (-4.434).floor() -> -5
     *   (44.17).floor(1) -> 44.1
     *   (4417).floor(-2) -> 4400
     *
     ***/
    'floor': function(precision) {
      return round(this, precision, 'floor');
    },

    /***
     * @method abs()
     * @returns Number
     * @short Returns the absolute value for the number.
     * @example
     *
     *   (3).abs()  -> 3
     *   (-3).abs() -> 3
     *
     ***/
    'abs': function() {
      return Math.abs(this);
    },

    /***
     * @method pow(<p> = 1)
     * @returns Number
     * @short Returns the number to the power of <p>.
     * @example
     *
     *   (3).pow(2) -> 9
     *   (3).pow(3) -> 27
     *   (3).pow()  -> 3
     *
     ***/
    'pow': function(power) {
      if(isUndefined(power)) power = 1;
      return Math.pow(this, power);
    },

    /***
     * @method round(<precision> = 0)
     * @returns Number
     * @short Rounds a number to the precision of <precision>.
     * @example
     *
     *   (3.241).round()  -> 3
     *   (3.841).round()  -> 4
     *   (-3.241).round() -> -3
     *   (-3.841).round() -> -4
     *   (3.241).round(2) -> 3.24
     *   (3748).round(-2) -> 3800
     *
     ***/
    'round': function(precision) {
      return round(this, precision, 'round');
    },

    /***
     * @method chr()
     * @returns String
     * @short Returns a string at the code point of the number.
     * @example
     *
     *   (65).chr() -> "A"
     *   (75).chr() -> "K"
     *
     ***/
    'chr': function() {
      return string.fromCharCode(this);
    },

    /***
     * @method isOdd()
     * @returns Boolean
     * @short Returns true if the number is odd.
     * @example
     *
     *   (3).isOdd()  -> true
     *   (18).isOdd() -> false
     *
     ***/
    'isOdd': function() {
      return !this.isMultipleOf(2);
    },

    /***
     * @method isEven()
     * @returns Boolean
     * @short Returns true if the number is even.
     * @example
     *
     *   (6).isEven()  -> true
     *   (17).isEven() -> false
     *
     ***/
    'isEven': function() {
      return this.isMultipleOf(2);
    },

    /***
     * @method isMultipleOf(<num>)
     * @returns Boolean
     * @short Returns true if the number is a multiple of <num>.
     * @example
     *
     *   (6).isMultipleOf(2)  -> true
     *   (17).isMultipleOf(2) -> false
     *   (32).isMultipleOf(4) -> true
     *   (34).isMultipleOf(4) -> false
     *
     ***/
    'isMultipleOf': function(num) {
      return this % num === 0;
    },

    /***
     * @method upto(<num>, [fn], [step] = 1)
     * @returns Array
     * @short Returns an array containing numbers from the number up to <num>.
     * @extra Optionally calls [fn] callback for each number in that array. [step] allows multiples greater than 1.
     * @example
     *
     *   (2).upto(6) -> [2, 3, 4, 5, 6]
     *   (2).upto(6, function(n) {
     *     // This function is called 5 times receiving n as the value.
     *   });
     *   (2).upto(8, null, 2) -> [2, 4, 6, 8]
     *
     ***/
    'upto': function(num, fn, step) {
      return getRange(this, num, fn, step || 1);
    },

    /***
     * @method downto(<num>, [fn], [step] = 1)
     * @returns Array
     * @short Returns an array containing numbers from the number down to <num>.
     * @extra Optionally calls [fn] callback for each number in that array. [step] allows multiples greater than 1.
     * @example
     *
     *   (8).downto(3) -> [8, 7, 6, 5, 4, 3]
     *   (8).downto(3, function(n) {
     *     // This function is called 6 times receiving n as the value.
     *   });
     *   (8).downto(2, null, 2) -> [8, 6, 4, 2]
     *
     ***/
    'downto': function(num, fn, step) {
      return getRange(this, num, fn, -(step || 1));
    },


    /***
     * @method times(<fn>)
     * @returns Number
     * @short Calls <fn> a number of times equivalent to the number.
     * @example
     *
     *   (8).times(function(i) {
     *     // This function is called 8 times.
     *   });
     *
     ***/
    'times': function(fn) {
      if(fn) {
        for(var i = 0; i < this; i++) {
          fn.call(this, i);
        }
      }
      return this.toNumber();
    },

    /***
     * @method ordinalize()
     * @returns String
     * @short Returns an ordinalized (English) string, i.e. "1st", "2nd", etc.
     * @example
     *
     *   (1).ordinalize() -> '1st';
     *   (2).ordinalize() -> '2nd';
     *   (8).ordinalize() -> '8th';
     *
     ***/
    'ordinalize': function() {
      var suffix, num = this.abs(), last = num.toString().last(2).toNumber();
      if(last >= 11 && last <= 13) {
        suffix = 'th';
      } else {
        switch(num % 10) {
          case 1:  suffix = 'st'; break;
          case 2:  suffix = 'nd'; break;
          case 3:  suffix = 'rd'; break;
          default: suffix = 'th';
        }
      }
      return this.toString() + suffix;
    },


    /***
     * @method pad(<place> = 0, [sign] = false, [base] = 10)
     * @returns String
     * @short Pads a number with "0" to <place>.
     * @extra [sign] allows you to force the sign as well (+05, etc). [base] can change the base for numeral conversion.
     * @example
     *
     *   (5).pad(2)        -> '05'
     *   (-5).pad(4)       -> '-0005'
     *   (82).pad(3, true) -> '+082'
     *
     ***/
    'pad': function(place, sign, base) {
      base = base || 10;
      var str = this.toNumber() === 0 ? '' : this.toString(base).replace(/^-/, '');
      str = padString(str, '0', place - str.replace(/\.\d+$/, '').length, 0);
      if(sign || this < 0) {
        str = (this < 0 ? '-' : '+') + str;
      }
      return str;
    },

    /***
     * @method format([place] = 0, [thousands] = ',', [decimal] = '.')
     * @returns String
     * @short Formats the number to a readable string.
     * @extra If [place] is %undefined%, will automatically determine the place. [thousands] is the character used for the thousands separator. [decimal] is the character used for the decimal point.
     * @example
     *
     *   (56782).format()           -> '56,782'
     *   (56782).format(2)          -> '56,782.00'
     *   (4388.43).format(2, ' ')      -> '4 388.43'
     *   (4388.43).format(2, '.', ',') -> '4.388,43'
     *
     ***/
    'format': function(place, thousands, decimal) {
      var str, split, method, after, r = /(\d+)(\d{3})/;
      if(string(thousands).match(/\d/)) throw new TypeError('Thousands separator cannot contain numbers.');
      str = object.isNumber(place) ? round(this, place).toFixed(Math.max(place, 0)) : this.toString();
      thousands = thousands || ',';
      decimal = decimal || '.';
      split = str.split('.');
      str = split[0];
      after = split[1] || '';
      while (str.match(r)) {
        str = str.replace(r, '$1' + thousands + '$2');
      }
      if(after.length > 0) {
        str += decimal + padString(after, '0', 0, place - after.length);
      }
      return str;
    },

    /***
     * @method hex([pad] = 1)
     * @returns String
     * @short Converts the number to hexidecimal.
     * @extra [pad] will pad the resulting string to that many places.
     * @example
     *
     *   (255).hex()   -> 'ff';
     *   (255).hex(4)  -> '00ff';
     *   (23654).hex() -> '5c66';
     *
     ***/
    'hex': function(pad) {
      return this.pad(pad || 1, false, 16);
    },

    /***
     * @method compare(<num>)
     * @returns Number
     * @short Performs a numeric comparison against the number.
     * @extra This method is also defined on %String% and %Date%, and is useful when performing complex sort operations where the type isn't known.
     * @example
     *
     *   (255).compare(254) ->  1;
     *   (245).compare(254) -> -9;
     *   (0).compare(0)     ->  0;
     *
     ***/
    'compare': function(num) {
      return this - Number(num);
    }

  });





  /***
   * String module
   *
   ***/


  // WhiteSpace/LineTerminator as defined in ES5.1 plus Unicode characters in the Space, Separator category.
  var getTrimmableCharacters = function() {
    return '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
  }

  /***
   * @method has[Script]()
   * @returns Boolean
   * @short Returns true if the string contains any characters in that script.
   * @example
   *
   *   'أتكلم'.hasArabic()          -> true
   *   'визит'.hasCyrillic()        -> true
   *   '잘 먹겠습니다!'.hasHangul() -> true
   *   'ミックスです'.hasKatakana() -> true
   *   "l'année".hasLatin()         -> true
   *
   ***
   * @method is[Script]()
   * @returns Boolean
   * @short Returns true if the string contains only characters in that script. Whitespace is ignored.
   * @example
   *
   *   'أتكلم'.isArabic()          -> true
   *   'визит'.isCyrillic()        -> true
   *   '잘 먹겠습니다!'.isHangul() -> true
   *   'ミックスです'.isKatakana() -> false
   *   "l'année".isLatin()         -> true
   *
   ***
   * @method hasArabic()
   * @set hasScript
   ***
   * @method isArabic()
   * @set isScript
   ****
   * @method hasCyrillic()
   * @set hasScript
   ***
   * @method isCyrillic()
   * @set isScript
   ****
   * @method hasGreek()
   * @set hasScript
   ***
   * @method isGreek()
   * @set isScript
   ****
   * @method hasHangul()
   * @set hasScript
   ***
   * @method isHangul()
   * @set isScript
   ****
   * @method hasHan()
   * @set hasScript
   ***
   * @method isHan()
   * @set isScript
   ****
   * @method hasKanji()
   * @set hasScript
   ***
   * @method isKanji()
   * @set isScript
   ****
   * @method hasHebrew()
   * @set hasScript
   ***
   * @method isHebrew()
   * @set isScript
   ****
   * @method hasHiragana()
   * @set hasScript
   ***
   * @method isHiragana()
   * @set isScript
   ****
   * @method hasKana()
   * @set hasScript
   ***
   * @method isKana()
   * @set isScript
   ****
   * @method hasKatakana()
   * @set hasScript
   ***
   * @method isKatakana()
   * @set isScript
   ****
   * @method hasLatin()
   * @set hasScript
   ***
   * @method isKatakana()
   * @set isScript
   ****
   * @method hasThai()
   * @set hasScript
   ***
   * @method isThai()
   * @set isScript
   ****
   * @method hasDevanagari()
   * @set hasScript
   ***
   * @method isDevanagari()
   * @set isScript
   ***/
  var unicodeScripts = [
    { names: ['Arabic'],      source: '\u0600-\u06FF' },
    { names: ['Cyrillic'],    source: '\u0400-\u04FF' },
    { names: ['Devanagari'],  source: '\u0900-\u097F' },
    { names: ['Greek'],       source: '\u0370-\u03FF' },
    { names: ['Hangul'],      source: '\uAC00-\uD7AF\u1100-\u11FF' },
    { names: ['Han','Kanji'], source: '\u4E00-\u9FFF\uF900-\uFAFF' },
    { names: ['Hebrew'],      source: '\u0590-\u05FF' },
    { names: ['Hiragana'],    source: '\u3040-\u309F\u30FB-\u30FC' },
    { names: ['Kana'],        source: '\u3040-\u30FF\uFF61-\uFF9F' },
    { names: ['Katakana'],    source: '\u30A0-\u30FF\uFF61-\uFF9F' },
    { names: ['Latin'],       source: '\u0001-\u007F\u0080-\u00FF\u0100-\u017F\u0180-\u024F' },
    { names: ['Thai'],        source: '\u0E00-\u0E7F' }
  ];

  function buildUnicodeScripts() {
    unicodeScripts.each(function(s) {
      var is = regexp('^['+s.source+'\\s]+$');
      var has = regexp('['+s.source+']');
      s.names.each(function(name) {
        defineProperty(string.prototype, 'is' + name, function() { return is.test(this.trim()); });
        defineProperty(string.prototype, 'has' + name, function() { return has.test(this); });
      });
    });
  }

  function convertCharacterWidth(str, args, reg, table) {
    var mode = getArgs(args).join('');
    mode = mode.replace(/all/, '').replace(/(\w)lphabet|umbers?|atakana|paces?|unctuation/g, '$1');
    return str.replace(reg, function(c) {
      if(table[c] && (!mode || mode.has(table[c].type))) {
        return table[c].to;
      } else {
        return c;
      }
    });
  }

  var widthConversionRanges = [
    { type: 'a', shift: 65248, start: 65,  end: 90  },
    { type: 'a', shift: 65248, start: 97,  end: 122 },
    { type: 'n', shift: 65248, start: 48,  end: 57  },
    { type: 'p', shift: 65248, start: 33,  end: 47  },
    { type: 'p', shift: 65248, start: 58,  end: 64  },
    { type: 'p', shift: 65248, start: 91,  end: 96  },
    { type: 'p', shift: 65248, start: 123, end: 126 }
  ];

  var ZenkakuTable = {};
  var HankakuTable = {};
  var allHankaku   = /[\u0020-\u00A5]|[\uFF61-\uFF9F][ﾞﾟ]?/g;
  var allZenkaku   = /[\u3000-\u301C]|[\u301A-\u30FC]|[\uFF01-\uFF60]|[\uFFE0-\uFFE6]/g;
  var hankakuPunctuation  = '｡､｢｣¥¢£';
  var zenkakuPunctuation  = '。、「」￥￠￡';
  var voicedKatakana      = /[カキクケコサシスセソタチツテトハヒフヘホ]/;
  var semiVoicedKatakana  = /[ハヒフヘホヲ]/;
  var hankakuKatakana     = 'ｱｲｳｴｵｧｨｩｪｫｶｷｸｹｺｻｼｽｾｿﾀﾁﾂｯﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔｬﾕｭﾖｮﾗﾘﾙﾚﾛﾜｦﾝｰ･';
  var zenkakuKatakana     = 'アイウエオァィゥェォカキクケコサシスセソタチツッテトナニヌネノハヒフヘホマミムメモヤャユュヨョラリルレロワヲンー・';


  function buildWidthConversionTables() {
    var hankaku;
    arrayEach(widthConversionRanges, function(r) {
      r.start.upto(r.end, function(n) {
        setWidthConversion(r.type, n.chr(), (n + r.shift).chr());
      });
    });
    zenkakuKatakana.each(function(c, i) {
      hankaku = hankakuKatakana.charAt(i);
      setWidthConversion('k', hankaku, c);
      if(c.match(voicedKatakana)) {
        setWidthConversion('k', hankaku + 'ﾞ', c.shift(1));
      }
      if(c.match(semiVoicedKatakana)) {
        setWidthConversion('k', hankaku + 'ﾟ', c.shift(2));
      }
    });
    zenkakuPunctuation.each(function(c, i) {
      setWidthConversion('p', hankakuPunctuation.charAt(i), c);
    });
    setWidthConversion('k', 'ｳﾞ', 'ヴ');
    setWidthConversion('k', 'ｦﾞ', 'ヺ');
    setWidthConversion('s', ' ', '　');
  }

  function setWidthConversion(type, half, full) {
    ZenkakuTable[half] = { type: type, to: full };
    HankakuTable[full] = { type: type, to: half };
  }

  function padString(str, p, left, right) {
    var padding = String(p);
    if(padding != p) {
      padding = '';
    }
    if(!object.isNumber(left))  left = 1;
    if(!object.isNumber(right)) right = 1;
    return padding.repeat(left) + str + padding.repeat(right);
  }

  function getAcronym(word) {
    return string.Inflector && string.Inflector.acronyms && string.Inflector.acronyms[word];
  }

  function buildBase64(key) {
    if(isDefined(this.btoa)) return;
    var base64reg = /[^A-Za-z0-9\+\/\=]/g;
    btoa = function(str) {
      var output = '';
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      do {
        chr1 = str.charCodeAt(i++);
        chr2 = str.charCodeAt(i++);
        chr3 = str.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
      } while (i < str.length);
      return output;
    }
    atob = function(input) {
      var output = '';
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      if(input.match(base64reg)) {
        throw new Error('String contains invalid base64 characters');
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
      do {
        enc1 = key.indexOf(input.charAt(i++));
        enc2 = key.indexOf(input.charAt(i++));
        enc3 = key.indexOf(input.charAt(i++));
        enc4 = key.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + chr1.chr();
        if (enc3 != 64) {
          output = output + chr2.chr();
        }
        if (enc4 != 64) {
          output = output + chr3.chr();
        }
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
      } while (i < input.length);
      return unescape(output);
    }
  }



  function buildTrim() {
    var support = getTrimmableCharacters().match(/^\s+$/);
    try { string.prototype.trim.call([1]); } catch(e) { support = false; }
    var trimL = regexp('^['+getTrimmableCharacters()+']+');
    var trimR = regexp('['+getTrimmableCharacters()+']+$');
    extend(string, true, !support, {

      /***
       * @method trim[Side]()
       * @returns String
       * @short Removes leading and/or trailing whitespace from the string.
       * @extra Whitespace is defined as line breaks, tabs, and any character in the "Space, Separator" Unicode category, conforming to the the ES5 spec. The standard %trim% method is only added when not fully supported natively.
       * @example
       *
       *   '   wasabi   '.trim()      -> 'wasabi'
       *   '   wasabi   '.trimLeft()  -> 'wasabi   '
       *   '   wasabi   '.trimRight() -> '   wasabi'
       *
       ***
       * @method trim()
       * @set trimSide
       ***/
      'trim': function() {
        return this.toString().trimLeft().trimRight();
      },

      /***
       * @method trimLeft()
       * @set trimSide
       ***/
      'trimLeft': function() {
        return this.replace(trimL, '');
      },

      /***
       * @method trimRight()
       * @set trimSide
       ***/
      'trimRight': function() {
        return this.replace(trimR, '');
      }
    });
  }

  function buildString() {
    buildBase64('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');
    buildTrim();
    buildWidthConversionTables();
    buildUnicodeScripts();
  }



  extend(string, true, false, {

     /***
      * @method escapeRegExp()
      * @returns String
      * @short Escapes all RegExp tokens in the string.
      * @example
      *
      *   'really?'.escapeRegExp()       -> 'really\?'
      *   'yes.'.escapeRegExp()         -> 'yes\.'
      *   '(not really)'.escapeRegExp() -> '\(not really\)'
      *
      ***/
    'escapeRegExp': function() {
      return regexp.escape(this);
    },

     /***
      * @method escapeURL([param] = false)
      * @returns String
      * @short Escapes characters in a string to make a valid URL.
      * @extra If [param] is true, it will also escape valid URL characters for use as a URL parameter.
      * @example
      *
      *   'http://foo.com/"bar"'.escapeURL()     -> 'http://foo.com/%22bar%22'
      *   'http://foo.com/"bar"'.escapeURL(true) -> 'http%3A%2F%2Ffoo.com%2F%22bar%22'
      *
      ***/
    'escapeURL': function(param) {
      return param ? encodeURIComponent(this) : encodeURI(this);
    },

     /***
      * @method unescapeURL([partial] = false)
      * @returns String
      * @short Restores escaped characters in a URL escaped string.
      * @extra If [partial] is true, it will only unescape non-valid URL characters. [partial] is included here for completeness, but should very rarely be needed.
      * @example
      *
      *   'http%3A%2F%2Ffoo.com%2Fthe%20bar'.unescapeURL()     -> 'http://foo.com/the bar'
      *   'http%3A%2F%2Ffoo.com%2Fthe%20bar'.unescapeURL(true) -> 'http%3A%2F%2Ffoo.com%2Fthe bar'
      *
      ***/
    'unescapeURL': function(param) {
      return param ? decodeURI(this) : decodeURIComponent(this);
    },

     /***
      * @method escapeHTML()
      * @returns String
      * @short Converts HTML characters to their entity equivalents.
      * @example
      *
      *   '<p>some text</p>'.escapeHTML() -> '&lt;p&gt;some text&lt;/p&gt;'
      *   'one & two'.escapeHTML()        -> 'one &amp; two'
      *
      ***/
    'escapeHTML': function() {
      return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },

     /***
      * @method unescapeHTML([partial] = false)
      * @returns String
      * @short Restores escaped HTML characters.
      * @example
      *
      *   '&lt;p&gt;some text&lt;/p&gt;'.unescapeHTML() -> '<p>some text</p>'
      *   'one &amp; two'.unescapeHTML()                -> 'one & two'
      *
      ***/
    'unescapeHTML': function() {
      return this.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    },

     /***
      * @method encodeBase64()
      * @returns String
      * @short Encodes the string into base 64 encoding.
      * @extra This methods wraps the browser native %btoa% when available, and uses a custom implementation when not available.
      * @example
      *
      *   'gonna get encoded!'.encodeBase64()  -> 'Z29ubmEgZ2V0IGVuY29kZWQh'
      *   'http://twitter.com/'.encodeBase64() -> 'aHR0cDovL3R3aXR0ZXIuY29tLw=='
      *
      ***/
    'encodeBase64': function() {
      return btoa(this);
    },

     /***
      * @method decodeBase64()
      * @returns String
      * @short Decodes the string from base 64 encoding.
      * @extra This methods wraps the browser native %atob% when available, and uses a custom implementation when not available.
      * @example
      *
      *   'aHR0cDovL3R3aXR0ZXIuY29tLw=='.decodeBase64() -> 'http://twitter.com/'
      *   'anVzdCBnb3QgZGVjb2RlZA=='.decodeBase64()     -> 'just got decoded!'
      *
      ***/
    'decodeBase64': function() {
      return atob(this);
    },

    /***
     * @method capitalize([all] = false)
     * @returns String
     * @short Capitalizes the first character in the string.
     * @extra If [all] is true, all words in the string will be capitalized.
     * @example
     *
     *   'hello'.capitalize()           -> 'hello'
     *   'hello kitty'.capitalize()     -> 'hello kitty'
     *   'hello kitty'.capitalize(true) -> 'hello kitty'
     *
     *
     ***/
    'capitalize': function(all) {
      var reg = all ? /\b[a-z]/g : /^[a-z]/;
      return this.toLowerCase().replace(reg, function(letter) {
        return letter.toUpperCase();
      });
    },

    /***
     * @method pad[Side](<padding> = '', [num] = 1)
     * @returns String
     * @short Pads either/both sides of the string.
     * @extra [num] is the number of characters on each side, and [padding] is the character to pad with.
     * @example
     *
     *   'wasabi'.pad('-')         -> '-wasabi-'
     *   'wasabi'.pad('-', 2)      -> '--wasabi--'
     *   'wasabi'.padLeft('-', 2)  -> '--wasabi'
     *   'wasabi'.padRight('-', 2) -> 'wasabi--'
     *
     ***
     * @method pad()
     * @set padSide
     ***/
    'pad': function(padding, num) {
      return padString(this, padding, num, num);
    },

    /***
     * @method padLeft()
     * @set padSide
     ***/
    'padLeft': function(padding, num) {
      return padString(this, padding, num, 0);
    },

    /***
     * @method padRight()
     * @set padSide
     ***/
    'padRight': function(padding, num) {
      return padString(this, padding, 0, num);
    },

    /***
     * @method repeat([num] = 0)
     * @returns String
     * @short Returns the string repeated [num] times.
     * @example
     *
     *   'jumpy'.repeat(2) -> 'jumpyjumpy'
     *   'a'.repeat(5)     -> 'aaaaa'
     *
     ***/
    'repeat': function(num) {
      var str = '', i = 0;
      if(object.isNumber(num) && num > 0) {
        while(i < num) {
          str += this;
          i++;
        }
      }
      return str;
    },

    /***
     * @method each([search] = /./g, [fn])
     * @returns Array
     * @short Runs callback [fn] against each occurence of [search].
     * @extra Returns an array of matches. [search] may be either a string or regex, and defaults to every character in the string.
     * @example
     *
     *   'jumpy'.each() -> ['j','u','m','p','y']
     *   'jumpy'.each(/[r-z]/) -> ['u','y']
     *   'jumpy'.each(/[r-z]/, function(m) {
     *     // Called twice: "u", "y"
     *   });
     *
     ***/
    'each': function(search, fn) {
      if(object.isFunction(search)) {
        fn = search;
        search = /./g;
      } else if(!search) {
        search = /./g
      } else if(object.isString(search)) {
        search = regexp(regexp.escape(search), 'gi');
      } else if(object.isRegExp(search)) {
        search = search.addFlag('g');
      }
      var match = this.match(search) || [];
      if(fn) {
        for(var i = 0; i < match.length; i++) {
          match[i] = fn.call(this, match[i], i, match) || match[i];
        }
      }
      return match;
    },

    /***
     * @method shift(<n>)
     * @returns Array
     * @short Shifts each character in the string <n> places in the character map.
     * @example
     *
     *   'a'.shift(1)  -> 'b'
     *   'ク'.shift(1) -> 'グ'
     *
     ***/
    'shift': function(n) {
      var result = '';
      n = n || 0;
      this.codes(function(c) {
        result += (c + n).chr();
      });
      return result;
    },

    /***
     * @method codes([fn])
     * @returns Array
     * @short Runs callback [fn] against each character code in the string. Returns an array of character codes.
     * @example
     *
     *   'jumpy'.codes() -> [106,117,109,112,121]
     *   'jumpy'.codes(function(c) {
     *     // Called 5 times: 106, 117, 109, 112, 121
     *   });
     *
     ***/
    'codes': function(fn) {
      var codes = [];
      for(var i=0; i<this.length; i++) {
        var code = this.charCodeAt(i);
        codes.push(code);
        if(fn) fn.call(this, code, i);
      }
      return codes;
    },

    /***
     * @method chars([fn])
     * @returns Array
     * @short Runs callback [fn] against each character in the string. Returns an array of characters.
     * @example
     *
     *   'jumpy'.chars() -> ['j','u','m','p','y']
     *   'jumpy'.chars(function(c) {
     *     // Called 5 times: "j","u","m","p","y"
     *   });
     *
     ***/
    'chars': function(fn) {
      return this.trim().each(fn);
    },

    /***
     * @method words([fn])
     * @returns Array
     * @short Runs callback [fn] against each word in the string. Returns an array of words.
     * @extra A "word" here is defined as any sequence of non-whitespace characters.
     * @example
     *
     *   'broken wear'.words() -> ['broken','wear']
     *   'broken wear'.words(function(w) {
     *     // Called twice: "broken", "wear"
     *   });
     *
     ***/
    'words': function(fn) {
      return this.trim().each(/\S+/g, fn);
    },

    /***
     * @method lines([fn])
     * @returns Array
     * @short Runs callback [fn] against each line in the string. Returns an array of lines.
     * @example
     *
     *   'broken wear\nand\njumpy jump'.lines() -> ['broken wear','and','jumpy jump']
     *   'broken wear\nand\njumpy jump'.lines(function(l) {
     *     // Called three times: "broken wear", "and", "jumpy jump"
     *   });
     *
     ***/
    'lines': function(fn) {
      return this.trim().each(/^.*$/gm, fn);
    },

    /***
     * @method paragraphs([fn])
     * @returns Array
     * @short Runs callback [fn] against each paragraph in the string. Returns an array of paragraphs.
     * @extra A paragraph here is defined as a block of text bounded by two or more line breaks.
     * @example
     *
     *   'Once upon a time.\n\nIn the land of oz...'.paragraphs() -> ['Once upon a time.','In the land of oz...']
     *   'Once upon a time.\n\nIn the land of oz...'.paragraphs(function(p) {
     *     // Called twice: "Once upon a time.", "In teh land of oz..."
     *   });
     *
     ***/
    'paragraphs': function(fn) {
      var paragraphs = this.trim().split(/[\r\n]{2,}/);
      paragraphs = paragraphs.map(function(p) {
        if(fn) var s = fn.call(p);
        return s ? s : p;
      });
      return paragraphs;
    },

    /***
     * @method startsWith(<find>, [case] = true)
     * @returns Boolean
     * @short Returns true if the string starts with <find>.
     * @extra <find> may be either a string or regex. Case sensitive if [case] is true.
     * @example
     *
     *   'hello'.startsWith('hell')        -> true
     *   'hello'.startsWith(/[a-h]/)       -> true
     *   'hello'.startsWith('HELL')        -> false
     *   'hello'.startsWith('HELL', false) -> true
     *
     ***/
    'startsWith': function(reg, c) {
      if(isUndefined(c)) c = true;
      var source = object.isRegExp(reg) ? reg.source.replace('^', '') : regexp.escape(reg);
      return regexp('^' + source, c ? '' : 'i').test(this);
    },

    /***
     * @method endsWith(<find>, [case] = true)
     * @returns Boolean
     * @short Returns true if the string ends with <find>.
     * @extra <find> may be either a string or regex. Case sensitive if [case] is true.
     * @example
     *
     *   'jumpy'.endsWith('py')         -> true
     *   'jumpy'.endsWith(/[q-z]/)      -> true
     *   'jumpy'.endsWith('MPY')        -> false
     *   'jumpy'.endsWith('MPY', false) -> true
     *
     ***/
    'endsWith': function(reg, c) {
      if(isUndefined(c)) c = true;
      var source = object.isRegExp(reg) ? reg.source.replace('$', '') : regexp.escape(reg);
      return regexp(source + '$', c ? '' : 'i').test(this);
    },

    /***
     * @method isBlank()
     * @returns Boolean
     * @short Returns true if the string has a length of 0 or contains only whitespace.
     * @example
     *
     *   ''.isBlank()      -> true
     *   '   '.isBlank()   -> true
     *   'noway'.isBlank() -> false
     *
     ***/
    'isBlank': function() {
      return this.trim().length === 0;
    },

    /***
     * @method has(<find>)
     * @returns Boolean
     * @short Returns true if the string matches <find>.
     * @extra <find> may be a string or regex.
     * @example
     *
     *   'jumpy'.has('py')     -> true
     *   'broken'.has(/[a-n]/) -> true
     *   'broken'.has(/[s-z]/) -> false
     *
     ***/
    'has': function(find) {
      return this.search(find) !== -1;
    },


    /***
     * @method add(<str>, [index] = 0)
     * @returns String
     * @short Adds <str> at [index]. Negative values are also allowed.
     * @extra %insert% is provided as an alias, and is generally more readable when using an index.
     * @example
     *
     *   'schfifty'.add(' five')      -> schfifty five
     *   'dopamine'.insert('e', 3)       -> dopeamine
     *   'spelling eror'.insert('r', -3) -> spelling error
     *
     ***/
    'add': function(str, index) {
      return this.split('').add(str, index).join('');
    },

    /***
     * @method remove(<f>)
     * @returns String
     * @short Removes any part of the string that matches <f>.
     * @extra <f> can be a string or a regex.
     * @example
     *
     *   'schfifty five'.remove('f')     -> 'schity ive'
     *   'schfifty five'.remove(/[a-f]/g) -> 'shity iv'
     *
     ***/
    'remove': function(f) {
      return this.replace(f, '');
    },

    /***
     * @method hankaku([mode] = 'all')
     * @returns String
     * @short Converts full-width characters (zenkaku) to half-width (hankaku).
     * @extra [mode] accepts any combination of "a" (alphabet), "n" (numbers), "k" (katakana), "s" (spaces), "p" (punctuation), or "all".
     * @example
     *
     *   'タロウ　ＹＡＭＡＤＡです！'.hankaku()                      -> 'ﾀﾛｳ YAMADAです!'
     *   'タロウ　ＹＡＭＡＤＡです！'.hankaku('a')                   -> 'タロウ　YAMADAです！'
     *   'タロウ　ＹＡＭＡＤＡです！'.hankaku('alphabet')            -> 'タロウ　YAMADAです！'
     *   'タロウです！　２５歳です！'.hankaku('katakana', 'numbers') -> 'ﾀﾛｳです！　25歳です！'
     *   'タロウです！　２５歳です！'.hankaku('k', 'n')              -> 'ﾀﾛｳです！　25歳です！'
     *   'タロウです！　２５歳です！'.hankaku('kn')                  -> 'ﾀﾛｳです！　25歳です！'
     *   'タロウです！　２５歳です！'.hankaku('sp')                  -> 'タロウです! ２５歳です!'
     *
     ***/
    'hankaku': function() {
      return convertCharacterWidth(this, arguments, allZenkaku, HankakuTable);
    },

    /***
     * @method zenkaku([mode] = 'all')
     * @returns String
     * @short Converts half-width characters (hankaku) to full-width (zenkaku).
     * @extra [mode] accepts any combination of "a" (alphabet), "n" (numbers), "k" (katakana), "s" (spaces), "p" (punctuation), or "all".
     * @example
     *
     *   'ﾀﾛｳ YAMADAです!'.zenkaku()                         -> 'タロウ　ＹＡＭＡＤＡです！'
     *   'ﾀﾛｳ YAMADAです!'.zenkaku('a')                      -> 'ﾀﾛｳ ＹＡＭＡＤＡです!'
     *   'ﾀﾛｳ YAMADAです!'.zenkaku('alphabet')               -> 'ﾀﾛｳ ＹＡＭＡＤＡです!'
     *   'ﾀﾛｳです! 25歳です!'.zenkaku('katakana', 'numbers') -> 'タロウです! ２５歳です!'
     *   'ﾀﾛｳです! 25歳です!'.zenkaku('k', 'n')              -> 'タロウです! ２５歳です!'
     *   'ﾀﾛｳです! 25歳です!'.zenkaku('kn')                  -> 'タロウです! ２５歳です!'
     *   'ﾀﾛｳです! 25歳です!'.zenkaku('sp')                  -> 'ﾀﾛｳです！　25歳です！'
     *
     ***/
    'zenkaku': function() {
      return convertCharacterWidth(this, arguments, allHankaku, ZenkakuTable);
    },

    /***
     * @method hiragana([all] = true)
     * @returns String
     * @short Converts katakana into hiragana.
     * @extra If [all] is false, only full-width katakana will be converted.
     * @example
     *
     *   'カタカナ'.hiragana()   -> 'かたかな'
     *   'コンニチハ'.hiragana() -> 'こんにちは'
     *   'ｶﾀｶﾅ'.hiragana()       -> 'かたかな'
     *   'ｶﾀｶﾅ'.hiragana(false)  -> 'ｶﾀｶﾅ'
     *
     ***/
    'hiragana': function(all) {
      var str = this;
      if(all !== false) {
        str = str.zenkaku('k');
      }
      return str.replace(/[\u30A1-\u30F6]/g, function(c) {
        return c.shift(-96);
      });
    },

    /***
     * @method katakana()
     * @returns String
     * @short Converts hiragana into katakana.
     * @example
     *
     *   'かたかな'.katakana()   -> 'カタカナ'
     *   'こんにちは'.katakana() -> 'コンニチハ'
     *
     ***/
    'katakana': function() {
      return this.replace(/[\u3041-\u3096]/g, function(c) {
        return c.shift(96);
      });
    },

    /***
     * @method toNumber([base] = 10)
     * @returns Number
     * @short Converts the string into a number.
     * @extra Any value with a "." fill be converted to a floating point value, otherwise an integer.
     * @example
     *
     *   '153'.toNumber()    -> 153
     *   '12,000'.toNumber() -> 12000
     *   '10px'.toNumber()   -> 10
     *   'ff'.toNumber(16)   -> 255
     *
     ***/
    'toNumber': function(base) {
      var str = this.replace(/,/g, '');
      return str.match(/\./) ? parseFloat(str) : parseInt(str, base || 10);
    },

    /***
     * @method reverse()
     * @returns String
     * @short Reverses the string.
     * @example
     *
     *   'jumpy'.reverse()        -> 'ypmuj'
     *   'lucky charms'.reverse() -> 'smrahc ykcul'
     *
     ***/
    'reverse': function() {
      return this.split('').reverse().join('');
    },

    /***
     * @method compact()
     * @returns String
     * @short Compacts all white space in the string to a single space and trims the ends.
     * @example
     *
     *   'too \n much \n space'.compact() -> 'too much space'
     *   'enough \n '.compact()           -> 'enought'
     *
     ***/
    'compact': function() {
      var str = this.replace(/[\r\n]/g, '');
      return str.trim().replace(/([\s　])+/g, '$1');
    },

    /***
     * @method at(<index>, [loop] = true)
     * @returns String or Array
     * @short Gets the character(s) at a given index.
     * @extra When [loop] is true, overshooting the end of the string (or the beginning) will begin counting from the other end. As an alternate syntax, passing multiple indexes will get the characters at those indexes.
     * @example
     *
     *   'jumpy'.at(0)               -> 'j'
     *   'jumpy'.at(2)               -> 'm'
     *   'jumpy'.at(5)               -> 'j'
     *   'jumpy'.at(5, false)        -> ''
     *   'jumpy'.at(-1)              -> 'y'
     *   'luckly charms'.at(1,3,5,7) -> ['u','k','y',c']
     *
     ***/
    'at': function() {
      return entryAtIndex(this, arguments, true);
    },

    /***
     * @method first([n] = 1)
     * @returns String
     * @short Returns the first [n] characters of the string.
     * @example
     *
     *   'lucky charms'.first()   -> 'l'
     *   'lucky charms'.first(3)  -> 'luc'
     *
     ***/
    'first': function(num) {
      num = isUndefined(num) ? 1 : num;
      return this.substr(0, num);
    },

    /***
     * @method last([n] = 1)
     * @returns String
     * @short Returns the last [n] characters of the string.
     * @example
     *
     *   'lucky charms'.last()   -> 's'
     *   'lucky charms'.last(3)  -> 'rms'
     *
     ***/
    'last': function(num) {
      num = isUndefined(num) ? 1 : num;
      var start = this.length - num < 0 ? 0 : this.length - num;
      return this.substr(start);
    },

    /***
     * @method from([index] = 0)
     * @returns String
     * @short Returns a section of the string starting from [index].
     * @example
     *
     *   'lucky charms'.from()   -> 'lucky charms'
     *   'lucky charms'.from(7)  -> 'harms'
     *
     ***/
    'from': function(num) {
      return this.slice(num);
    },

    /***
     * @method to([index] = end)
     * @returns String
     * @short Returns a section of the string ending at [index].
     * @example
     *
     *   'lucky charms'.to()   -> 'lucky charms'
     *   'lucky charms'.to(7)  -> 'lucky ch'
     *
     ***/
    'to': function(num) {
      if(isUndefined(num)) num = this.length;
      return this.slice(0, num);
    },

    /***
     * @method toDate([locale])
     * @returns Date
     * @short Creates a date from the string.
     * @extra Accepts a wide range of input. [locale] allows you to specify a locale code. See @date_format for more information.
     * @example
     *
     *   'January 25, 2015'.toDate() -> same as Date.create('January 25, 2015')
     *   'yesterday'.toDate()        -> same as Date.create('yesterday')
     *   'next Monday'.toDate()      -> same as Date.create('next Monday')
     *
     ***/
    'toDate': function(locale) {
      var str = this.toString();
      return date.create ? date.create(str, locale) : new date(str);
    },

    /***
     * @method dasherize()
     * @returns String
     * @short Converts underscores and camel casing to hypens.
     * @example
     *
     *   'a_farewell_to_arms'.dasherize() -> 'a-farewell-to-arms'
     *   'capsLock'.dasherize()           -> 'caps-lock'
     *
     ***/
    'dasherize': function() {
      return this.underscore().replace(/_/g, '-');
    },

    /***
     * @method underscore()
     * @returns String
     * @short Converts hyphens and camel casing to underscores.
     * @example
     *
     *   'a-farewell-to-arms'.underscore() -> 'a_farewell_to_arms'
     *   'capsLock'.underscore()           -> 'caps_lock'
     *
     ***/
    'underscore': function() {
      return this
        .replace(/[-\s]+/g, '_')
        .replace(String.Inflector && String.Inflector.acronymRegExp, function(acronym, index) {
          return (index > 0 ? '_' : '') + acronym.toLowerCase();
        })
        .replace(/([A-Z\d]+)([A-Z][a-z])/g,'$1_$2')
        .replace(/([a-z\d])([A-Z])/g,'$1_$2')
        .toLowerCase();
    },

    /***
     * @method camelize([first] = true)
     * @returns String
     * @short Converts underscores and hyphens to camel case. If [first] is true the first letter will also be capitalized.
     * @example
     *
     *   'caps_lock'.camelize()              -> 'CapsLock'
     *   'moz-border-radius'.camelize()      -> 'MozBorderRadius'
     *   'moz-border-radius'.camelize(false) -> 'mozBorderRadius'
     *
     ***/
    'camelize': function(first) {
      return this.underscore().replace(/(^|_)([^_]+)/g, function(match, pre, word, index) {
        var acronym = getAcronym(word), capitalize = first !== false || index > 0;
        if(acronym) return capitalize ? acronym : acronym.toLowerCase();
        return capitalize ? word.capitalize() : word;
      });
    },

    /***
     * @method spacify()
     * @returns String
     * @short Converts camel case, underscores, and hyphens to a properly spaced string.
     * @example
     *
     *   'camelCase'.spacify()                         -> 'camel case'
     *   'an-ugly-string'.spacify()                    -> 'an ugly string'
     *   'oh-no_youDid-not'.spacify().capitalize(true) -> 'something else'
     *
     ***/
    'spacify': function() {
      return this.underscore().replace(/_/g, ' ');
    },

    /***
     * @method stripTags([tag1], [tag2], ...)
     * @returns String
     * @short Strips all HTML tags from the string.
     * @extra Tags to strip may be enumerated in the parameters, otherwise will strip all.
     * @example
     *
     *   '<p>just <b>some</b> text</p>'.stripTags()    -> 'just some text'
     *   '<p>just <b>some</b> text</p>'.stripTags('p') -> 'just <b>some</b> text'
     *
     ***/
    'stripTags': function() {
      var str = this, args = arguments.length > 0 ? arguments : [''];
      multiArgs(args, function(tag) {
        str = str.replace(regexp('<\/?' + tag.escapeRegExp() + '[^<>]*>', 'gi'), '');
      });
      return str;
    },

    /***
     * @method removeTags([tag1], [tag2], ...)
     * @returns String
     * @short Removes all HTML tags and their contents from the string.
     * @extra Tags to remove may be enumerated in the parameters, otherwise will remove all.
     * @example
     *
     *   '<p>just <b>some</b> text</p>'.removeTags()    -> ''
     *   '<p>just <b>some</b> text</p>'.removeTags('b') -> '<p>just text</p>'
     *
     ***/
    'removeTags': function() {
      var str = this, args = arguments.length > 0 ? arguments : ['\\S+'];
      multiArgs(args, function(t) {
        var reg = regexp('<(' + t + ')[^<>]*(?:\\/>|>.*?<\\/\\1>)', 'gi');
        str = str.replace(reg, '');
      });
      return str;
    },

    /***
     * @method truncate(<length>, [append] = '...', [split] = false)
     * @returns Object
     * @short Truncates a string.
     * @extra Unless [split] is true, %truncate% will not split words up, and instead discard the word where the truncation occurred.
     * @example
     *
     *   'just sittin on the dock of the bay'.truncate(20)                -> 'just sittin on the...'
     *   'just sittin on the dock of the bay'.truncate(20, '...', true)   -> 'just sittin on the do...'
     *   'just sittin on the dock of the bay'.truncate(20, ' >>>', false) -> 'just sittin on the >>>'
     *
     ***/
    'truncate': function(length, append, split) {
     var reg, repeatedCharacter;
      append = isUndefined(append) ? '...' : String(append);
      length -= append.length;
      if(this.length <= length) return this.toString();
      repeatedCharacter = append.match(/^(.)\1+$/) ? append.slice(0,1) : '';
      reg = regexp('[^' + getTrimmableCharacters() + repeatedCharacter + '][' + getTrimmableCharacters() + repeatedCharacter + ']');
      while(length > 0 && !reg.test(this.slice(length - 1, length + 1)) && split !== true) {
        length--;
      }
      return this.slice(0, length) + (length > 0 ? append : '');
    },

    /***
     * @method assign(<obj1>, <obj2>, ...)
     * @returns String
     * @short Assigns variables to tokens in a string.
     * @extra If an object is passed, it's properties can be assigned using the object's keys. If a non-object (string, number, etc.) is passed it can be accessed by the argument number beginning with 1 (as with regex tokens). Multiple objects can be passed and will be merged together.
     * @example
     *
     *   'Welcome, Mr. {name}.'.assign({ name: 'Franklin' })   -> 'Welcome, Mr. Franklin.'
     *   'You are {1} years old today.'.assign(14)             -> 'You are 14 years old today.'
     *   '{n} and {r}'.assign({ n: 'Cheech' }, { r: 'Chong' }) -> 'Cheech and Chong'
     *
     ***/
    'assign': function() {
      var assign = object.extended();
      multiArgs(arguments, function(a, i) {
        if(object.isObject(a)) {
          assign.merge(a);
        } else {
          assign[i + 1] = a;
        }
      });
      return this.replace(/\{(.+?)\}/g, function(m, key) {
        return assign.hasOwnProperty(key) ? assign[key] : m;
      });
    },

    /***
     * @method compare(<str>, [ignore] = false)
     * @returns Number
     * @short Performs a lexical (alphabetic) comparison against the number.
     * @extra This method is also defined on %Number% and %Date%, and is useful when performing complex sort operations where the type isn't known. If [ignore] is %true%, will ignore any non-alphanumeric character when performing comparison. [ignore] can also be a regexp.
     * @example
     *
     *   ('a').compare('b') -> -1;
     *   ('b').compare('a') ->  1;
     *   ('a').compare('a') ->  0;
     *   ('a').compare('@a', true) ->  0;
     *
     ***/
    'compare': function(cmp, ignore) {
      var str = this, cmp = String(cmp);
      if(ignore === true) ignore = /\W/g;
      if(ignore) {
        cmp = cmp.remove(ignore);
        str = str.remove(ignore);
      }
      if(str == cmp) return 0;
      else return str < cmp ? -1 : 1;
    }

  });


  extend(string, true, function(s) { return object.isRegExp(s); }, {

    /*
     * Many thanks to Steve Levithan here for a ton of inspiration and work dealing with
     * cross browser Regex splitting.  http://blog.stevenlevithan.com/archives/cross-browser-split
     */

    /***
     * @method split([separator], [limit])
     * @returns Array
     * @short Splits the string by [separator] into an Array.
     * @extra This method is native to Javascript, but Sugar patches it to provide cross-browser reliability when splitting on a regex.
     * @example
     *
     *   'comma,separated,values'.split(',') -> ['comma','separated','values']
     *   'a,b|c>d'.split(/[,|>]/)            -> ['multi','separated','values']
     *
     ***/
    'split': function(separator, limit) {
      var output = [];
      var lastLastIndex = 0;
      var separator = regexp(separator).addFlag('g'); // make `global` and avoid `lastIndex` issues by working with a copy
      var separator2, match, lastIndex, lastLength;
      if(!regexp.NPCGSupport) {
        separator2 = RegExp("^" + separator.source + "$(?!\\s)", separator.getFlags()); // doesn't need /g or /y, but they don't hurt
      }
      if(isUndefined(limit) || limit < 0) {
        limit = Infinity;
      } else {
        limit = limit | 0;
        if(!limit) return [];
      }

      while (match = separator.exec(this)) {
        lastIndex = match.index + match[0].length; // `separator.lastIndex` is not reliable cross-browser
        if(lastIndex > lastLastIndex) {
          output.push(this.slice(lastLastIndex, match.index));
          // fix browsers whose `exec` methods don't consistently return `undefined` for nonparticipating capturing groups
          if(!regexp.NPCGSupport && match.length > 1) {
            match[0].replace(separator2, function () {
              for (var i = 1; i < arguments.length - 2; i++) {
                if(isUndefined(arguments[i])) {
                  match[i] = Undefined;
                }
              }
            });
          }
          if(match.length > 1 && match.index < this.length) {
            array.prototype.push.apply(output, match.slice(1));
          }
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if(output.length >= limit) {
            break;
          }
        }
        if(separator.lastIndex === match.index) {
          separator.lastIndex++; // avoid an infinite loop
        }
      }
      if(lastLastIndex === this.length) {
        if(lastLength || !separator.test('')) output.push('');
      } else {
        output.push(this.slice(lastLastIndex));
      }
      return output.length > limit ? output.slice(0, limit) : output;
    }

  });




  // Aliases

  extend(string, true, false, {

    /***
     * @method insert()
     * @alias add
     *
     ***/
    'insert': string.prototype.add
  });






  /***
   * RegExp module
   *
   * Note here that methods on the RegExp class like .exec and .test will fail in the current version of SpiderMonkey being
   * used by CouchDB when using shorthand regex notation like /foo/. This is the reason for the intermixed use of shorthand
   * and compiled regexes here. If you're using JS in CouchDB, it is safer to ALWAYS compile your regexes from a string.
   *
   ***/

  regexp.NPCGSupport = isUndefined(regexp('()??').exec('')[1]); // NPCG: nonparticipating capturing group

  function getFlags(reg, flag) {
    var flags = '';
    if(flag == 'g' || reg.global)     flags += 'g';
    if(flag == 'i' || reg.ignoreCase) flags += 'i';
    if(flag == 'm' || reg.multiline)  flags += 'm';
    if(flag == 'y' || reg.sticky)     flags += 'y';
    return flags;
  }

  extend(regexp, false, false, {

   /***
    * @method RegExp.escape(<str> = '')
    * @returns String
    * @short Escapes all RegExp tokens in a string.
    * @example
    *
    *   RegExp.escape('really?')      -> 'really\?'
    *   RegExp.escape('yes.')         -> 'yes\.'
    *   RegExp.escape('(not really)') -> '\(not really\)'
    *
    ***/
    'escape': function(str) {
      if(!object.isString(str)) str = String(str);
      return str.replace(/([/'*+?|()\[\]{}.^$])/g,'\\$1');
    }

  });

  extend(regexp, true, false, {

   /***
    * @method getFlags()
    * @returns String
    * @short Returns the flags of the regex as a string.
    * @example
    *
    *   /texty/gim.getFlags('testy') -> 'gim'
    *
    ***/
    'getFlags': function() {
      return getFlags(this);
    },

   /***
    * @method setFlags(<flags>)
    * @returns RegExp
    * @short Sets the flags on a regex and retuns a copy.
    * @example
    *
    *   /texty/.setFlags('gim') -> now has global, ignoreCase, and multiline set
    *
    ***/
    'setFlags': function(flags) {
      return regexp(this.source, flags);
    },

   /***
    * @method addFlag(<flag>)
    * @returns RegExp
    * @short Adds <flag> to the regex.
    * @example
    *
    *   /texty/.addFlag('g') -> now has global flag set
    *
    ***/
    'addFlag': function(flag) {
      return this.setFlags(getFlags(this, flag));
    },

   /***
    * @method removeFlag(<flag>)
    * @returns RegExp
    * @short Removes <flag> from the regex.
    * @example
    *
    *   /texty/g.removeFlag('g') -> now has global flag removed
    *
    ***/
    'removeFlag': function(flag) {
      return this.setFlags(getFlags(this).replace(flag, ''));
    }

  });




  /***
   * Function module
   *
   ***/

  function setDelay(fn, ms, after, scope, args) {
    if(!fn.timers) fn.timers = [];
    fn.timers.push(setTimeout(function(){
      fn.timers.removeAt(index);
      after.apply(scope, args || []);
    }, ms));
    var index = fn.timers.length;
  }

  function buildBind() {
    var support = false;
    if(Function.prototype.bind) {
      function F() {};
      var B = F.bind();
      support = (new B instanceof B) && !(new F instanceof B);
    }
    extend(Function, true, !support, {

       /***
       * @method bind(<scope>, [arg1], ...)
       * @returns Function
       * @short Binds <scope> as the %this% object for the function when it is called. Also allows currying an unlimited number of parameters.
       * @extra "currying" means setting parameters ([arg1], [arg2], etc.) ahead of time so that they are passed when the function is called later. If you pass additional parameters when the function is actually called, they will be added will be added to the end of the curried parameters.
       * @example
       *
       +   (function() {
       *     return this;
       *   }).bind('woof')(); -> returns 'woof'; function is bound with 'woof' as the this object.
       *   (function(a) {
       *     return a;
       *   }).bind(1, 2)();   -> returns 2; function is bound with 1 as the this object and 2 curried as the first parameter
       *   (function(a, b) {
       *     return a + b;
       *   }).bind(1, 2)(3);  -> returns 5; function is bound with 1 as the this object, 2 curied as the first parameter and 3 passed as the second when calling the function
       *
       ***/
      'bind': function(scope) {
        var fn = this, args = getArgs(arguments, 1), nop, bound;
        if(!object.isFunction(this)) {
          throw new TypeError('Function.prototype.bind called on a non-function');
        }
        bound = function() {
          return fn.apply(fn.prototype && this instanceof fn ? this : scope, args.concat(getArgs(arguments)));
        }
        nop = function() {};
        nop.prototype = this.prototype;
        bound.prototype = new nop();
        return bound;
      }

    });
  }

  function buildFunction() {
    buildBind();
  }


  extend(Function, true, false, {

     /***
     * @method lazy([ms] = 1, [limit] = Infinity)
     * @returns Function
     * @short Creates lazy functions for non-blocking operations.
     * @extra This method will wrap the function inside another that, when executed repeatedly in a loop, will execute [ms] milliseconds after the last iteration (a.k.a. "function throttling"). By passing in a smaller value for [ms] (can be a decimal < 1), you can "tighen up" the execution time so that the iterations happen faster. By passing in a larger value for [ms], you can space the function execution out to prevent thread blocking. Playing with this number is the easiest way to strike a balance for heavier operations. Calls to lazy functions beyond [limit], if it is set to a finite number, will be ignored if other calls are waiting. For example if [limit] is 50 and 50 calls are queued, any subsequent call will be ignored until the number of queued calls goes down to < 50 again. This prevents lazy functions from being hammered too hard. Additionally, lazy functions can be canceled during execution using the %cancel% method, which will clear the entire queue.
     * @example
     *
     *   (function() {
     *     // Executes immediately.
     *   }).lazy()();
     *   (3).times(function() {
     *     // Executes 3 times, with each execution 20ms later than the last.
     *   }.lazy(20));
     *   (100).times(function() {
     *     // Executes 50 times, with each execution 20ms later than the last.
     *   }.lazy(20, 50));
     *
     ***/
    'lazy': function(ms, limit) {
      var fn = this, queue = [], lock = false, rounded, perExecution;
      ms = ms || 1;
      limit = limit || Infinity;
      rounded = ms.ceil();
      perExecution = round(rounded / ms);
      var execute = function() {
        if(lock || queue.length == 0) return;
        var max = Math.max(queue.length - perExecution, 0);
        while(queue.length > max) {
          // Getting uber-meta here...
          Function.prototype.apply.apply(fn, queue.shift());
        }
        setDelay(lazy, rounded, function() {
          lock = false;
          execute();
        });
        lock = true;
      }
      function lazy() {
        // The first call is immediate, so having 1 in the queue
        // implies two calls have already taken place.
        if(lock && queue.length > limit - 2) return;
        queue.push([this, arguments]);
        execute();
      }
      return lazy;
    },

     /***
     * @method delay([ms] = 1, [arg1], ...)
     * @returns Function
     * @short Executes the function after <ms> milliseconds.
     * @extra Returns a reference to itself. %delay% is also a way to execute non-blocking operations that will wait until the CPU is free. Delayed functions can be canceled using the %cancel% method. Can also curry arguments passed in after <ms>.
     * @example
     *
     *   (function(arg1) {
     *     // called 1s later
     *   }).delay(1000, 'arg1');
     *
     ***/
    'delay': function(ms) {
      var fn = this;
      if(!object.isNumber(ms)) ms = 0;
      var args = getArgs(arguments, 1);
      setDelay(fn, ms, fn, fn, args);
      return fn;
    },

     /***
     * @method debounce(<ms>, [wait] = true)
     * @returns Function
     * @short Calls a function only once per <ms> no matter how many times it is actually called.
     * @extra This method is useful to execute a function after things have "settled down". A good example of this is when a user tabs quickly through form fields, execution of a heavy operation should happen after a few milliseconds when they have "settled" on a field. If [wait] is %false% execution will happen immediately, and all subsequent calls within <ms> will be ignored.
     * @example
     *
     *   var fn = (function(arg1) {
     *     // called once 50ms later
     *   }).debounce(50); fn() fn() fn();
     *   var fn = (function(arg1) {
     *     // called immediately and will wait 50ms until it responds again
     *   }).debounce(50, false); fn() fn() fn();
     *
     ***/
    'debounce': function(ms, wait) {
      var fn = this;
      if(wait === false) {
        return this.lazy(ms, 1);
      } else {
        return function() {
          fn.cancel();
          setDelay(fn, ms, fn, this, arguments);
        }
      }
    },

     /***
     * @method cancel()
     * @returns Function
     * @short Cancels a delayed function scheduled to be run.
     * @extra %delay%, %lazy%, and %debounce% can all set delays. Note that this method won't work when using certain other frameworks like Prototype, as they will retain their %delay% method.
     * @example
     *
     *   (function() {
     *     alert('hay'); // Never called
     *   }).delay(500).cancel();
     *
     ***/
    'cancel': function() {
      if(object.isArray(this.timers)) {
        while(this.timers.length > 0) {
          clearTimeout(this.timers.shift());
        }
      }
      return this;
    },

     /***
     * @method after([num] = 1)
     * @returns Function
     * @short Creates a function that will execute after [num] calls.
     * @extra %after% is useful for running a final callback after a series of asynchronous operations, when the order in which the operations will complete is unknown.
     * @example
     *
     *   var fn = (function() {
     *     // Will be executed once only
     *   }).after(3); fn(); fn(); fn();
     *
     ***/
    'after': function(num) {
      var fn = this, counter = 0, storedArguments = [];
      if(!object.isNumber(num)) {
        num = 1;
      } else if(num === 0) {
        fn.call();
        return fn;
      }
      return function() {
        var ret;
        storedArguments.push(Array.create(arguments));
        counter++;
        if(counter == num) {
          ret = fn.call(this, storedArguments);
          counter = 0;
          storedArguments = [];
          return ret;
        }
      }
    },

     /***
     * @method once()
     * @returns Function
     * @short Creates a function that will execute only once and store the result.
     * @extra %once% is useful for creating functions that will cache the result of an expensive operation and use it on subsequent calls. Also it can be useful for creating initialization functions that only need to be run once.
     * @example
     *
     *   var fn = (function() {
     *     // Will be executed once only
     *   }).once(); fn(); fn(); fn();
     *
     ***/
    'once': function() {
      var fn = this;
      return function() {
        return fn.hasOwnProperty('memo') ? fn['memo'] : fn['memo'] = fn.apply(this, arguments);
      }
    },

     /***
     * @method fill(<arg1>, <arg2>, ...)
     * @returns Function
     * @short Returns a new version of the function which when called will have some of its arguments pre-emptively filled in, also known as "currying".
     * @extra Arguments passed to a "filled" function are generally appended to the curried arguments. However, if %undefined% is passed as any of the arguments to %fill%, it will be replaced, when the "filled" function is executed. This allows currying of arguments even when they occur toward the end of an argument list (the example demonstrates this much more clearly).
     * @example
     *
     *   var delayOneSecond = setTimeout.fill(undefined, 1000);
     *   delayOneSecond(function() {
     *     // Will be executed 1s later
     *   });
     *
     ***/
    'fill': function() {
      var fn = this, curried = getArgs(arguments);
      return function() {
        var args = getArgs(arguments);
        arrayEach(curried, function(arg, index) {
          if(isDefined(arg) || index >= args.length) args.splice(index, 0, arg);
        });
        return fn.apply(this, args);
      }
    }


  });


  // Initialize
  buildObject();
  buildString();
  buildFunction();
  initializeClass(date);

})();
