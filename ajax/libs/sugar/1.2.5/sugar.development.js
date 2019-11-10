// Google Closure Compiler will output a wrapping function here.
(function() {

  // A few optimizations for Google Closure Compiler will save us a couple kb in the release script.
  var object = Object, array = Array, regexp = RegExp, date = Date, string = String, number = Number, Undefined;

  // defineProperty exists in IE8 but will error when trying to define a property on
  // native objects. IE8 does not have defineProperies, however, so this check saves a try/catch block.
  var definePropertySupport = object.defineProperty && object.defineProperties;

  // Class extending methods

  function extend(klass, instance, override, methods) {
    var extendee = instance ? klass.prototype : klass, original;
    initializeClass(klass, instance, methods);
    iterateOverObject(methods, function(name, method) {
      original = extendee[name];
      if(typeof override === 'function') {
        method = wrapNative(extendee[name], method, override);
      }
      if(override !== false || !extendee[name]) {
        defineProperty(extendee, name, method);
      }
      // If the method is internal to Sugar, then store a reference so it can be restored later.
      klass['SugarMethods'][name] = { instance: instance, method: method, original: original };
    });
  }

  function initializeClass(klass) {
    if(klass.SugarMethods) return;
    defineProperty(klass, 'SugarMethods', {});
    extend(klass, false, false, {
      'restore': function() {
        var all = arguments.length === 0, methods = multiArgs(arguments);
        iterateOverObject(klass['SugarMethods'], function(name, m) {
          if(all || methods.has(name)) {
            defineProperty(m.instance ? klass.prototype : klass, name, m.method);
          }
        });
      },
      'extend': function(methods, override, instance) {
        if(klass === object && arguments.length === 0) {
          mapObjectPrototypeMethods();
        } else {
          extend(klass, instance !== false, override, methods);
        }
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

  // Object helpers

  function hasOwnProperty(obj, key) {
    return object.prototype.hasOwnProperty.call(obj, key);
  }

  function iterateOverObject(obj, fn) {
    var key;
    for(key in obj) {
      if(!hasOwnProperty(obj, key)) continue;
      fn.call(obj, key, obj[key]);
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

  function stringify(thing, stack) {
    var value, klass, isObject, isArray, arr, i, key, type = typeof thing;

    // Return quickly if string to save cycles
    if(type === 'string') return thing;

    klass    = object.prototype.toString.call(thing)
    isObject = klass === '[object Object]';
    isArray  = klass === '[object Array]';

    if(thing != null && isObject || isArray) {
      // This method for checking for cyclic structures was egregiously stolen from
      // the ingenious method by @kitcambridge from the Underscore script:
      // https://github.com/documentcloud/underscore/issues/240
      if(!stack) stack = [];
      // Allowing a step into the structure before triggering this
      // script to save cycles on standard JSON structures and also to
      // try as hard as possible to catch basic properties that may have
      // been modified.
      if(stack.length > 1) {
        i = stack.length;
        while (i--) {
          if (stack[i] === thing) {
            return 'CYC';
          }
        }
      }
      stack.push(thing);
      value = string(thing.constructor);
      arr = isArray ? thing : object.keys(thing).sort();
      for(i = 0; i < arr.length; i++) {
        key = isArray ? i : arr[i];
        value += key + stringify(thing[key], stack);
      }
      stack.pop();
    } else if(1 / thing === -Infinity) {
      value = '-0';
    } else {
      value = string(thing);
    }
    return type + klass + value;
  }


  // Argument helpers

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
    if(flatten === true) args = arrayFlatten(args, 1);
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

  function isUndefined(o) {
    return o === Undefined;
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

  /***
   * @method is[Type](<obj>)
   * @returns Boolean
   * @short Returns true if <obj> is an object of that type.
   * @extra %isObject% will return false on anything that is not an object literal, including instances of inherited classes. Note also that %isNaN% will ONLY return true if the object IS %NaN%. It does not mean the same as browser native %isNaN%, which returns true for anything that is "not a number". Type methods are available as instance methods on extended objects.
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


  var ObjectTypeMethods = ['isObject','isNaN'];
  var ObjectHashMethods = ['keys','values','each','merge','isEmpty','clone','equal','watch','tap','has']

  function buildTypeMethods() {
    var methods = {}, name;
    arrayEach(['Array','Boolean','Date','Function','Number','String','RegExp'], function(type) {
      name = 'is' + type;
      ObjectTypeMethods.push(name);
      methods[name] = function(obj) {
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
    buildInstanceMethods(ObjectHashMethods, Hash);
  }

  function mapObjectPrototypeMethods() {
    buildInstanceMethods(ObjectTypeMethods.concat(ObjectHashMethods), Object);
  }

  extend(object, false, true, {
      /***
       * @method watch(<obj>, <prop>, <fn>)
       * @returns Nothing
       * @short Watches a property of <obj> and runs <fn> when it changes.
       * @extra <fn> is passed three arguments: the property <prop>, the old value, and the new value. The return value of [fn] will be set as the new value. This method is useful for things such as validating or cleaning the value when it is set. Warning: this method WILL NOT work in browsers that don't support %Object.defineProperty%. This notably includes IE 8 and below, and Opera. This is the only method in Sugar that is not fully compatible with all browsers. %watch% is available as an instance method on extended objects.
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
      if(obj == null) {
        return false;
      } else {
        // === on the constructor is not safe across iframes
        return isClass(obj, 'Object') && string(obj.constructor) === string(object) || obj.constructor === Hash;
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
     * @extra %each% is available as an instance method on extended objects.
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
     * @method merge(<target>, <source>, [deep] = false, [resolve] = true)
     * @returns Merged object
     * @short Merges all the properties of <source> into <target>.
     * @extra Merges are shallow unless [deep] is %true%. Properties of <source> will win in the case of conflicts, unless [resolve] is %false%. [resolve] can also be a function that resolves the conflict. In this case it will be passed 3 arguments, %key%, %targetVal%, and %sourceVal%, with the context set to <source>. This will allow you to solve conflict any way you want, ie. adding two numbers together, etc. %merge% is available as an instance method on extended objects.
     * @example
     *
     *   Object.merge({a:1},{b:2}) -> { a:1, b:2 }
     *   Object.merge({a:1},{a:2}, false, false) -> { a:1 }
     +   Object.merge({a:1},{a:2}, false, function(key, a, b) {
     *     return a + b;
     *   }); -> { a:3 }
     *   Object.extended({a:1}).merge({b:2}) -> { a:1, b:2 }
     *
     ***/
    'merge': function(target, source, deep, resolve) {
      var key, val;
      // Strings cannot be reliably merged thanks to
      // their properties not being enumerable in < IE8.
      if(target && typeof source != 'string') {
        for(key in source) {
          if(!hasOwnProperty(source, key) || !target) continue;
          val = source[key];
          // Conflict!
          if(target[key] !== Undefined) {
            // Do not merge.
            if(resolve === false) {
              continue;
            }
            // Use the result of the callback as the result.
            if(object.isFunction(resolve)) {
              val = resolve.call(source, key, target[key], source[key])
            }
          }
          // Deep merging.
          if(deep === true && val && typeof val === 'object') {
            if(object.isDate(val)) {
              val = new Date(val.getTime());
            } else if(object.isRegExp(val)) {
              val = new RegExp(val.source, val.getFlags());
            } else {
              if(!target[key]) target[key] = array.isArray(val) ? [] : {};
              Object.merge(target[key], source[key], deep, resolve);
              continue;
            }
          }
          target[key] = val;
        }
      }
      return target;
    },

    /***
     * @method isEmpty(<obj>)
     * @returns Boolean
     * @short Returns true if <obj> is empty.
     * @extra %isEmpty% is available as an instance method on extended objects.
     * @example
     *
     *   Object.isEmpty({})          -> true
     *   Object.isEmpty({foo:'bar'}) -> false
     *   Object.extended({foo:'bar'}).isEmpty() -> false
     *
     ***/
    'isEmpty': function(obj) {
      if(obj == null || typeof obj != 'object') return !(obj && obj.length > 0);
      return object.keys(obj).length == 0;
    },

    /***
     * @method equal(<a>, <b>)
     * @returns Boolean
     * @short Returns true if <a> and <b> are equal.
     * @extra %equal% in Sugar is "egal", meaning the values are equal if they are "not observably distinguishable". Note that on extended objects the name is %equals% for readability.
     * @example
     *
     *   Object.equal({a:2}, {a:2}) -> true
     *   Object.equal({a:2}, {a:3}) -> false
     *   Object.extended({a:2}).equals({a:3}) -> false
     *
     ***/
    'equal': function(a, b) {
      return stringify(a) === stringify(b);
    },

    /***
     * @method values(<obj>, [fn])
     * @returns Array
     * @short Returns an array containing the values in <obj>. Optionally calls [fn] for each value.
     * @extra Returned values are in no particular order. %values% is available as an instance method on extended objects.
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
     * @extra Default is a shallow clone, unless [deep] is true. %clone% is available as an instance method on extended objects.
     * @example
     *
     *   Object.clone({foo:'bar'})            -> { foo: 'bar' }
     *   Object.clone()                       -> {}
     *   Object.extended({foo:'bar'}).clone() -> { foo: 'bar' }
     *
     ***/
    'clone': function(obj, deep) {
      if(obj == null || typeof obj !== 'object') return obj;
      if(array.isArray(obj)) return obj.clone();
      var target = obj.constructor === Hash ? new Hash() : {};
      return object.merge(target, obj, deep);
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
    },

    /***
     * @method has(<obj>, <key>)
     * @returns Boolean
     * @short Checks if <obj> has <key> using hasOwnProperty from Object.prototype.
     * @extra This method is considered safer than %Object#hasOwnProperty% when using objects as hashes. See %http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/% for more.
     * @example
     *
     *   Object.has({ foo: 'bar' }, 'foo') -> true
     *   Object.has({ foo: 'bar' }, 'baz') -> false
     *   Object.has({ hasOwnProperty: true }, 'foo') -> false
     ***/
    'has': function (obj, key) {
      return hasOwnProperty(obj, key);
    }

  });


  extend(object, false, function() { return arguments.length > 1; }, {

    /***
     * @method keys(<obj>, [fn])
     * @returns Array
     * @short Returns an array containing the keys in <obj>. Optionally calls [fn] for each key.
     * @extra This method is provided for browsers that don't support it natively, and additionally is enhanced to accept the callback [fn]. Returned keys are in no particular order. %keys% is available as an instance method on extended objects.
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
      if(obj == null || typeof obj != 'object' && !object.isRegExp(obj) && !object.isFunction(obj)) {
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

  function arrayUnique(arr, map) {
    var result = [], o = {}, stringified, transformed;
    arrayEach(arr, function(el, i) {
      transformed = map ? transformArgument(el, map, arr, [el, i, arr]) : el;
      stringified = stringify(transformed);
      if(!arrayObjectExists(o, stringified, el)) {
        o[stringified] = transformed;
        result.push(el);
      }
    })
    return result;
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
    var result = [], o = {};
    arr2.each(function(el) {
      o[stringify(el)] = el;
    });
    arr1.each(function(el) {
      var stringified = stringify(el), exists = arrayObjectExists(o, stringified, el);
      // Add the result to the array if:
      // 1. We're subtracting intersections or it doesn't already exist in the result and
      // 2. It exists in the compared array and we're adding, or it doesn't exist and we're removing.
      if(exists != subtract) {
        delete o[stringified];
        result.push(el);
      }
    });
    return result;
  }

  function arrayObjectExists(hash, stringified, obj) {
    return stringified in hash && (typeof obj !== 'function' || obj === hash[stringified]);
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
    var length = arr.length, count = 0, defined = initialValue !== Undefined, result, index;
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
      if(test === edge) {
        result.push(entry);
      } else if((max && test > edge) || (min && test < edge)) {
        result = [entry];
        edge = test;
      }
    });
    return result;
  }


  // Alphanumeric collation helpers

  function collateStrings(a, b) {
    var aValue, bValue, aChar, bChar, aEquiv, bEquiv, index = 0, tiebreaker = 0;
    a = getCollationReadyString(a);
    b = getCollationReadyString(b);
    do {
      aChar  = getCollationCharacter(a, index);
      bChar  = getCollationCharacter(b, index);
      aValue = getCollationValue(aChar);
      bValue = getCollationValue(bChar);
      if(aValue === -1 || bValue === -1) {
        aValue = a.charCodeAt(index) || null;
        bValue = b.charCodeAt(index) || null;
      }
      aEquiv = aChar !== a.charAt(index);
      bEquiv = bChar !== b.charAt(index);
      if(aEquiv !== bEquiv && tiebreaker === 0) {
        tiebreaker = aEquiv - bEquiv;
      }
      index += 1;
    } while(aValue != null && bValue != null && aValue === bValue);
    if(aValue === bValue) return tiebreaker;
    return aValue < bValue ? -1 : 1;
  }

  function getCollationReadyString(str) {
    if(array[AlphanumericSortIgnoreCase]) {
      str = str.toLowerCase();
    }
    return str.remove(array[AlphanumericSortIgnore]);
  }

  function getCollationCharacter(str, index) {
    var chr = str.charAt(index), eq = array[AlphanumericSortEquivalents] || {};
    return eq[chr] || chr;
  }

  function getCollationValue(chr) {
    if(!chr) {
      return null;
    } else {
      return array[AlphanumericSortOrder].indexOf(chr);
    }
  }

  var AlphanumericSortOrder       = 'AlphanumericSortOrder';
  var AlphanumericSortIgnore      = 'AlphanumericSortIgnore';
  var AlphanumericSortIgnoreCase  = 'AlphanumericSortIgnoreCase';
  var AlphanumericSortEquivalents = 'AlphanumericSortEquivalents';

  function buildArray() {
    var order = 'AÁÀÂÃĄBCĆČÇDĎÐEÉÈĚÊËĘFGĞHıIÍÌİÎÏJKLŁMNŃŇÑOÓÒÔPQRŘSŚŠŞTŤUÚÙŮÛÜVWXYÝZŹŻŽÞÆŒØÕÅÄÖ';
    var equiv = 'AÁÀÂÃÄ,CÇ,EÉÈÊË,IÍÌİÎÏ,OÓÒÔÕÖ,Sß,UÚÙÛÜ';
    array[AlphanumericSortOrder] = order.split('').map(function(str) {
      return str + str.toLowerCase();
    }).join('');
    var equivalents = {};
    equiv.split(',').each(function(set) {
      var equivalent = set.charAt(0);
      set.slice(1).chars(function(chr) {
        equivalents[chr] = equivalent;
        equivalents[chr.toLowerCase()] = equivalent.toLowerCase();
      });
    });
    array[AlphanumericSortIgnoreCase] = true;
    array[AlphanumericSortEquivalents] = equivalents;
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
      return isUndefined(index) ? -1 : index;
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
      });
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
      return object.merge([], this);
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
      multiArgs(arguments, function(arg) {
        arr = arr.concat(arg);
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
      return arrayIntersect(this, multiArgs(arguments, null, true), false);
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
      return arrayIntersect(this, multiArgs(arguments, null, true), true);
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
        } else if(!all && el != null && !object.isNaN(el)) {
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
     * @extra <map> may be a function, a string acting as a shortcut, or blank (direct comparison of array values). [desc] will sort the array in descending order. When the field being sorted on is a string, the resulting order will be determined by an internal algorithm that is optimized for major Western languages, but can be customized. For more information see @array_sorting.
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
        if(object.isString(aProperty) && object.isString(bProperty)) {
          comp = collateStrings(aProperty, bProperty);
        } else if(aProperty < bProperty) {
          comp = -1;
        } else if(aProperty > bProperty) {
          comp = 1;
        } else {
          comp = 0;
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
      min = Math.min(n1 || 0, isUndefined(n2) ? 1 : n2);
      max = Math.max(n1 || 0, isUndefined(n2) ? 1 : n2);
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
      return abbreviateNumber(this, precision, 'nμm kMGTPE', 4, isUndefined(limit) ? 1 : limit);
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
      return abbreviateNumber(this, precision, 'kMGTPE', 0, isUndefined(limit) ? 4 : limit, true) + 'B';
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

  var btoa, atob;

  function buildBase64(key) {
    if(this.btoa) {
      btoa = this.btoa;
      atob = this.atob;
    }
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
      var reg = all ? /^\S|\s\S/g : /^\S/;
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
     * @method each([search] = single character, [fn])
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
        search = /[\s\S]/g;
      } else if(!search) {
        search = /[\s\S]/g
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
      return this.each(fn);
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
      return this.search(object.isRegExp(find) ? find : RegExp.escape(find)) !== -1;
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
      return this.trim().replace(/([\r\n\s　])+/g, function(match, whitespace){
        return whitespace === '　' ? whitespace : ' ';
      });
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
      if(isUndefined(num)) num = 1;
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
      if(isUndefined(num)) num = 1;
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
     * @method truncate(<length>, [split] = true, from = 'right', [ellipsis] = '...')
     * @returns Object
     * @short Truncates a string.
     * @extra If [split] is %false%, will not split words up, and instead discard the word where the truncation occurred. [from] can also be %"middle"% or %"left"%.
     * @example
     *
     *   'just sittin on the dock of the bay'.truncate(20)                 -> 'just sittin on the do...'
     *   'just sittin on the dock of the bay'.truncate(20, false)          -> 'just sittin on the...'
     *   'just sittin on the dock of the bay'.truncate(20, true, 'middle') -> 'just sitt...of the bay'
     *   'just sittin on the dock of the bay'.truncate(20, true, 'middle') -> '...the dock of the bay'
     *
     ***/
    'truncate': function(length, split, from, ellipsis) {
      var pos,
        prepend = '',
        append = '',
        str = this.toString(),
        chars = '[' + getTrimmableCharacters() + ']+',
        space = '[^' + getTrimmableCharacters() + ']*',
        reg = regexp(chars + space + '$');
      ellipsis = isUndefined(ellipsis) ? '...' : string(ellipsis);
      if(str.length <= length) {
        return str;
      }
      switch(from) {
        case 'left':
          pos = str.length - length;
          prepend = ellipsis;
          str = str.slice(pos);
          reg = regexp('^' + space + chars);
          break;
        case 'middle':
          pos    = Math.floor(length / 2);
          append = ellipsis + str.slice(str.length - pos).trimLeft();
          str    = str.slice(0, pos);
          break;
        default:
          pos = length;
          append = ellipsis;
          str = str.slice(0, pos);
      }
      if(split === false && this.slice(pos, pos + 1).match(/\S/)) {
        str = str.remove(reg);
      }
      return prepend + str + append;
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
        return hasOwnProperty(assign, key) ? assign[key] : m;
      });
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
      return str.replace(/([\\/'*+?|()\[\]{}.^$])/g,'\\$1');
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
    if(!object.isNumber(ms)) ms = 0;
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
      var fn = this, queue = [], lock = false, execute, rounded, perExecution;
      ms = ms || 1;
      limit = limit || Infinity;
      rounded = ms.ceil();
      perExecution = round(rounded / ms);
      execute = function() {
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
      var args = getArgs(arguments, 1);
      setDelay(fn, ms, fn, fn, args);
      return fn;
    },

     /***
     * @method throttle(<ms>)
     * @returns Function
     * @short Creates a throttled version of the function that will only be executed once per <ms> milliseconds.
     * @example
     *
     *   var fn = (function(arg1) {
     *     // called immediately and will wait 50ms until it responds again
     *   }).throttle(50); fn() fn() fn();
     *
     ***/
    'throttle': function(ms) {
      return this.lazy(ms, 1);
    },

     /***
     * @method debounce(<ms>)
     * @returns Function
     * @short Creates a "debounced" function that postpones its execution until after <ms> milliseconds have passed.
     * @extra This method is useful to execute a function after things have "settled down". A good example of this is when a user tabs quickly through form fields, execution of a heavy operation should happen after a few milliseconds when they have "settled" on a field.
     * @example
     *
     *   var fn = (function(arg1) {
     *     // called once 50ms later
     *   }).debounce(50); fn() fn() fn();
     *
     ***/
    'debounce': function(ms) {
      var fn = this;
      return function() {
        fn.cancel();
        setDelay(fn, ms, fn, this, arguments);
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
        return hasOwnProperty(fn, 'memo') ? fn['memo'] : fn['memo'] = fn.apply(this, arguments);
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
          if(arg != null || index >= args.length) args.splice(index, 0, arg);
        });
        return fn.apply(this, args);
      }
    }


  });


  // Initialize
  buildObject();
  buildString();
  buildFunction();
  buildArray();
  initializeClass(date);

  Object.initializeClass = initializeClass;


})();
// Google Closure Compiler will output a wrapping function here.
(function() {

  // A few optimizations for Google Closure Compiler will save us a couple kb in the release script.
  var regexp = RegExp, object = Object, date = Date, number = Number, Undefined, English;

  function isDefined(o) {
    return o !== Undefined;
  }

  function isUndefined(o) {
    return o === Undefined;
  }


  /***
   * Date module
   *
   ***/

  var TimeFormat = ['hour','minute','second','meridian','utc','offset_sign','offset_hours','offset_minutes']
  var FloatReg = '\\d{1,2}(?:[,.]\\d+)?';
  var RequiredTime = '('+FloatReg+'):?('+FloatReg+')?:?('+FloatReg+')?(am|pm)?(?:(Z)|(?:([+-])(\\d{2})(?::?(\\d{2}))?)?)?';
  var OptionalTime = '\\s*(?:(?:t|at |\\s+)' + RequiredTime + ')?';

  var LowerAsianDigits   = '一二三四五六七八九';
  var UpperAsianDigits   = '十百千万';
  var AsianDigitReg = regexp('[' + LowerAsianDigits + UpperAsianDigits + ']', 'g');
  var DateInputFormats = [];
  var DateArgumentUnits;
  var DateUnitsReversed;

  var StaticInputFormats = [
    // @date_format 2010
    { src: '(\\d{4})', to: ['year'] },
    // @date_format 2010-05
    // @date_format 2010.05
    // @date_format 2010/05
    // @date_format 2010-05-25 (ISO8601)
    // @date_format 2010-05-25T12:30:40.299Z (ISO8601)
    // @date_format 2010-05-25T12:30:40.299+01:00 (ISO8601)
    // @date_format 2010.05.25
    // @date_format 2010/05/25
    { src: '([+-])?(\\d{4})[-.]?({month})[-.]?(\\d{1,2})?', to: ['year_sign','year','month','date'] },
    // @date_format 05-25
    // @date_format 05/25
    // @date_format 05.25
    // @date_format 05-25-2010
    // @date_format 05/25/2010
    // @date_format 05.25.2010
    { src: '(\\d{1,2})[-.\\/]({month})[-.\\/]?(\\d{2,4})?', to: ['month','date','year'], variant: true },
    // @date_format Date(628318530718)
    { src: '\\/Date\\((\\d+(?:\\+\\d{4})?)\\)\\/', to: ['timestamp'], time: false }
  ];

  var DateOutputFormats = [
    {
      token: 'f{1,4}|ms|milliseconds',
      format: function(d) {
        return d.getMilliseconds();
      }
    },
    {
      token: 'ss?|seconds',
      format: function(d, len) {
        return d.getSeconds();
      }
    },
    {
      token: 'mm?|minutes',
      format: function(d, len) {
        return d.getMinutes();
      }
    },
    {
      token: 'hh?|hours|12hr',
      format: function(d) {
        return getShortHour(d);
      }
    },
    {
      token: 'HH?|24hr',
      format: function(d) {
        return d.getHours();
      }
    },
    {
      token: 'dd?|date|day',
      format: function(d) {
        return d.getDate();
      }
    },
    {
      token: 'dow|weekday',
      word: true,
      format: function(d, loc, n, t) {
        return loc['weekdays'][d.getDay() + (n - 1) * 7];
      }
    },
    {
      token: 'MM?',
      format: function(d) {
        return d.getMonth() + 1;
      }
    },
    {
      token: 'mon|month',
      word: true,
      format: function(d, loc, n, len) {
        return loc['months'][d.getMonth() + (n - 1) * 12];
      }
    },
    {
      token: 'y{2,4}|year',
      format: function(d) {
        return d.getFullYear();
      }
    },
    {
      token: '[Tt]{1,2}',
      format: function(d, loc, n, format) {
        var m = getMeridian(d);
        if(format.length === 1) m = m.first();
        if(format.first() === 'T') m = m.toUpperCase();
        return m;
      }
    },
    {
      token: 'z{1,4}|tz|timezone',
      text: true,
      format: function(d, loc, n, format) {
        var tz = d.getUTCOffset();
        if(format == 'z' || format == 'zz') {
          tz = tz.replace(/(\d{2})(\d{2})/, function(f,h,m) {
            return h.toNumber().pad(format.length);
          });
        }
        return tz;
      }
    },
    {
      token: 'iso(tz|timezone)',
      format: function(d) {
        return d.getUTCOffset(true);
      }
    },
    {
      token: 'ord',
      format: function(d) {
        return d.getDate().ordinalize();
      }
    }
  ];

  var DateUnits = [
    {
      unit: 'year',
      method: 'FullYear',
      multiplier: function(d) {
        var adjust = d ? (d.isLeapYear() ? 1 : 0) : 0.25;
        return (365 + adjust) * 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'month',
      method: 'Month',
      multiplier: function(d, ms) {
        var days = 30.4375, inMonth;
        if(d) {
          inMonth = d.daysInMonth();
          if(ms <= inMonth.days()) {
            days = inMonth;
          }
        }
        return days * 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'week',
      method: 'Week',
      multiplier: function() {
        return 7 * 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'day',
      method: 'Date',
      multiplier: function() {
        return 24 * 60 * 60 * 1000;
      }
    },
    {
      unit: 'hour',
      method: 'Hours',
      multiplier: function() {
        return 60 * 60 * 1000;
      }
    },
    {
      unit: 'minute',
      method: 'Minutes',
      multiplier: function() {
        return 60 * 1000;
      }
    },
    {
      unit: 'second',
      method: 'Seconds',
      multiplier: function() {
        return 1000;
      }
    },
    {
      unit: 'millisecond',
      method: 'Milliseconds',
      multiplier: function() {
        return 1;
      }
    }
  ];




  // Date Localization

  var Localizations = {};

  var CommonLocales = {

    'en': '2;;January,February,March,April,May,June,July,August,September,October,November,December;Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday;millisecond:|s,second:|s,minute:|s,hour:|s,day:|s,week:|s,month:|s,year:|s;one,two,three,four,five,six,seven,eight,nine,ten;a,an,the;the,st|nd|rd|th,of;{num} {unit} {sign},{num} {unit=4-5} {sign} {day},{weekday?} {month} {date}{1} {year?} {time?},{date} {month} {year},{month} {year},{shift?} {weekday} {time?},{shift} week {weekday} {time?},{shift} {unit=5-7},{0} {edge} of {shift?} {unit=4-7?}{month?}{year?},{weekday} {2} {shift} week,{0} {date}{1} of {month},{0}{month?} {date?}{1} of {shift} {unit=6-7},{day} at {time?},{time} {day};{Month} {d}, {yyyy};,yesterday,today,tomorrow;,ago|before,,from now|after|from;,last,the|this,next;last day,end,,first day|beginning',

    'ja': '1;月;;日曜日,月曜日,火曜日,水曜日,木曜日,金曜日,土曜日;ミリ秒,秒,分,時間,日,週間|週,ヶ月|ヵ月|月,年;;;;{num}{unit}{sign},{shift}{unit=5-7}{weekday?},{year}年{month?}月?{date?}日?,{month}月{date?}日?,{date}日;{yyyy}年{M}月{d}日;一昨日,昨日,今日,明日,明後日;,前,,後;,去|先,,来',

    'ko': '1;월;;일요일,월요일,화요일,수요일,목요일,금요일,토요일;밀리초,초,분,시간,일,주,개월|달,년;일|한,이,삼,사,오,육,칠,팔,구,십;;;{num}{unit} {sign},{shift} {unit=5-7},{shift} {unit=5?} {weekday},{year}년{month?}월?{date?}일?,{month}월{date?}일?,{date}일;{yyyy}년{M}월{d}일;그저께,어제,오늘,내일,모레;,전,,후;,지난|작,이번,다음|내',

    'ru': '4;;Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь;Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота;миллисекунд:а|у|ы|,секунд:а|у|ы|,минут:а|у|ы|,час:||а|ов,день|день|дня|дней,недел:я|ю|и|ь|е,месяц:||а|ев|е,год|год|года|лет|году;од:ин|ну,дв:а|е,три,четыре,пять,шесть,семь,восемь,девять,десять;;в|на,года;{num} {unit} {sign},{sign} {num} {unit},{date} {month} {year?} {1},{month} {year},{0} {shift} {unit=5-7};{d} {month} {yyyy} года;позавчера,вчера,сегодня,завтра,послезавтра;,назад,,через;,прошло:й|м,,следующе:й|м',

    'es': '6;;enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre;domingo,lunes,martes,miércoles|miercoles,jueves,viernes,sábado|sabado;milisegundo:|s,segundo:|s,minuto:|s,hora:|s,día|días|dia|dias,semana:|s,mes:|es,año|años|ano|anos;uno,dos,tres,cuatro,cinco,seis,siete,ocho,nueve,diez;;el,de;{sign} {num} {unit},{num} {unit} {sign},{date?} {1} {month} {1} {year?},{0} {unit=5-7} {shift},{0} {shift} {unit=5-7};{d} de {month} de {yyyy};anteayer,ayer,hoy,mañana|manana;,hace,,de ahora;,pasad:o|a,,próximo|próxima|proximo|proxima',

    'pt': '6;;janeiro,fevereiro,março,abril,maio,junho,julho,agosto,setembro,outubro,novembro,dezembro;domingo,segunda-feira,terça-feira,quarta-feira,quinta-feira,sexta-feira,sábado|sabado;milisegundo:|s,segundo:|s,minuto:|s,hora:|s,dia:|s,semana:|s,mês|mêses|mes|meses,ano:|s;um,dois,três|tres,quatro,cinco,seis,sete,oito,nove,dez,uma,duas;;a,de;{num} {unit} {sign},{sign} {num} {unit},{date?} {1} {month} {1} {year?},{0} {unit=5-7} {shift},{0} {shift} {unit=5-7};{d} de {month} de {yyyy};anteontem,ontem,hoje,amanh:ã|a;,atrás|atras|há|ha,,daqui a;,passad:o|a,,próximo|próxima|proximo|proxima',

    'fr': '2;;janvier,février|fevrier,mars,avril,mai,juin,juillet,août,septembre,octobre,novembre,décembre|decembre;dimanche,lundi,mardi,mercredi,jeudi,vendredi,samedi;milliseconde:|s,seconde:|s,minute:|s,heure:|s,jour:|s,semaine:|s,mois,an:|s|née|nee;un:|e,deux,trois,quatre,cinq,six,sept,huit,neuf,dix;;l\'|la|le;{sign} {num} {unit},{sign} {num} {unit},{0} {date?} {month} {year?},{0} {unit=5-7} {shift};{d} {month} {yyyy};,hier,aujourd\'hui,demain;,il y a,,dans|d\'ici;,derni:er|ère|ere,,prochain:|e',

    'it': '2;;Gennaio,Febbraio,Marzo,Aprile,Maggio,Giugno,Luglio,Agosto,Settembre,Ottobre,Novembre,Dicembre;Domenica,Luned:ì|i,Marted:ì|i,Mercoled:ì|i,Gioved:ì|i,Venerd:ì|i,Sabato;millisecond:o|i,second:o|i,minut:o|i,or:a|e,giorn:o|i,settiman:a|e,mes:e|i,ann:o|i;un:|\'|a|o,due,tre,quattro,cinque,sei,sette,otto,nove,dieci;;l\'|la|il;{num} {unit} {sign},{weekday?} {date?} {month} {year?},{0} {unit=5-7} {shift},{0} {shift} {unit=5-7};{d} {month} {yyyy};,ieri,oggi,domani,dopodomani;,fa,,da adesso;,scors:o|a,,prossim:o|a',

    'de': '2;;Januar,Februar,März|Marz,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember;Sonntag,Montag,Dienstag,Mittwoch,Donnerstag,Freitag,Samstag;Millisekunde:|n,Sekunde:|n,Minute:|n,Stunde:|n,Tag:|en,Woche:|n,Monat:|en,Jahr:|en;ein:|e|er|em|en,zwei,drei,vier,fuenf,sechs,sieben,acht,neun,zehn;;der;{sign} {num} {unit},{num} {unit} {sign},{num} {unit} {sign},{sign} {num} {unit},{weekday?} {date?} {month} {year?},{shift} {unit=5-7};{d}. {Month} {yyyy};vorgestern,gestern,heute,morgen,übermorgen|ubermorgen|uebermorgen;,vor:|her,,in;,letzte:|r|n|s,,nächste:|r|n|s+naechste:|r|n|s',

    'zh-TW': '1;月;;日,一,二,三,四,五,六;毫秒,秒鐘,分鐘,小時,天,個星期|週,個月,年;;;日|號;{num}{unit}{sign},星期{weekday},{shift}{unit=5-7},{shift}{unit=5}{weekday},{year}年{month?}月?{date?}{0},{month}月{date?}{0},{date}{0};{yyyy}年{M}月{d}日;前天,昨天,今天,明天,後天;,前,,後;,上|去,這,下|明',

    'zh-CN': '1;月;;日,一,二,三,四,五,六;毫秒,秒钟,分钟,小时,天,个星期|周,个月,年;;;日|号;{num}{unit}{sign},星期{weekday},{shift}{unit=5-7},{shift}{unit=5}{weekday},{year}年{month?}月?{date?}{0},{month}月{date?}{0},{date}{0};{yyyy}年{M}月{d}日;前天,昨天,今天,明天,后天;,前,,后;,上|去,这,下|明'

  }

  function checkLocaleFormatsAdded(loc) {
    var code = loc['code'];
    if(loc.formatsAdded) return;
    addDateInputFormat('(' + loc['months'].compact().join('|') + ')', ['month'], code);
    addDateInputFormat('(' + loc['weekdays'].compact().join('|') + ')', ['weekday'], code);
    addDateInputFormat('(' + loc['modifiers'].filter(function(m){ return m.name === 'day'; }).map('src').join('|') + ')', ['day'], code);
    loc['formats'].each(function(src) {
      loc.addFormat(src, code, false);
    });
    loc.formatsAdded = true;
  }

  function addDateInputFormat(format, match, locale, variant, method) {
    method = method || 'push';
    DateInputFormats[method]({
      variant: variant,
      locale: locale,
      reg: regexp('^' + format + '$', 'i'),
      to: match
    });
  }

  function getLocalization(code, fallback, set) {
    if(fallback && (!object.isString(code) || !code)) code = Date['currentLocale'];
    if(code && !Localizations[code] || set) initializeLocalization(code, set);
    return Localizations[code];
  }

  function initializeLocalization(code, set) {
    set = set || getCommonLocalization(code);
    if(!set) {
      throw new Error('Invalid locale.');
    }

    function eachAlternate(str, fn) {
      str = str.split('+').map(function(split) {
        return split.replace(/(.+):(.+)$/, function(full, base, suffixes) {
          return suffixes.split('|').map(function(suffix) {
            return base + suffix;
          }).join('|');
        });
      }).join('|');
      return str.split('|').each(fn);
    }

    function setArray(name, abbreviate, multiple) {
      var arr = [];
      if(!set[name]) return;
      set[name].forEach(function(el, i) {
        eachAlternate(el, function(str, j) {
          arr[j * multiple + i] = str.toLowerCase();
        });
      });
      if(abbreviate) arr = arr.concat(set[name].map(function(str) {
        return str.slice(0,3).toLowerCase();
      }));
      return set[name] = arr;
    }

    function getDigit(start, stop) {
      var str = '[0-9０-９]' + (start ? '{' + start + ',' + stop + '}' : '+');
      if(set['digits']) str += '|[' + set['digits'] + ']+';
      return str;
    }

    function getNum() {
      var arr = [getDigit()].concat(set['articles']);
      if(!set['digits']) arr = arr.concat(set['numbers']);
      return arr.compact().join('|');
    }

    function setModifiers() {
      var arr = [];
      set.modifiersByName = {};
      set['modifiers'].each(function(modifier) {
        eachAlternate(modifier.src, function(t) {
          set.modifiersByName[t] = modifier;
          arr.push({ name: modifier.name, src: t, value: modifier.value });
        });
      });
      arr.groupBy('name', function(name, group) {
        group = group.map('src');
        if(name === 'day') group = group.concat(set['weekdays']);
        set[name] = group.join('|');
      });
      set['modifiers'] = arr;
    }

    setArray('months', true, 12);
    setArray('weekdays', true, 7);
    setArray('units', false, 8);
    setArray('numbers', false, 10);

    set['code'] = code;
    set['date'] = getDigit(1,2);
    set['year'] = getDigit(4,4);
    set['num']  = getNum();

    setModifiers();

    if(set['monthSuffix']) {
      set['month'] = getDigit(1,2);
      set['months'] = (1).upto(12).map(function(n) { return n + set['monthSuffix']; });
    }
    Localizations[code] = new Localization(set);
  }

  function getCommonLocalization(code) {
    if(code.slice(0,3) == 'en-') code = 'en';
    if(!CommonLocales[code]) return null;
    var set = { 'modifiers': [] }, pre = CommonLocales[code].split(';');
    function bool(n) {
      return !!(pre[0] & Math.pow(2,n-1));
    }
    ['months','weekdays','units','numbers','articles','optionals','formats'].each(function(name, i) {
      set[name] = pre[i + 2] ? pre[i + 2].split(',') : [];
    });
    set['outputFormat'] = pre[9];
    ['day','sign','shift','edge'].each(function(name, i) {
      if(!pre[i + 10]) return;
      pre[i + 10].split(',').each(function(t, j) {
        if(t) set['modifiers'].push({ name: name, src: t, value: j - 2 });
      });
    });
    if(bool(1)) {
      set['digits'] = LowerAsianDigits + UpperAsianDigits;
      if(set['numbers'].length > 0) {
        set['digits'] += set['numbers'].join('');
      } else {
        set['numbers'] = LowerAsianDigits.split('');
      }
      set['monthSuffix'] = pre[1];
    }
    set['capitalizeUnit'] = (code == 'de');
    set['hasPlural'] = bool(2);
    set['pastRelativeFormat'] = set['formats'][0];
    set['futureRelativeFormat'] = set['formats'][bool(3) ? 1 : 0];
    set['durationFormat'] = set['formats'][0].replace(/\s*\{sign\}\s*/, '');
    return set;
  }

  function getVariant(locale) {
    if(!locale) locale = Date['currentLocale'];
    return locale != 'en' && locale != 'en-US';
  }

  function Localization(l) {
    object.merge(this, l);
  }

  object.merge(Localization.prototype, {

    getMonth: function(n) {
      if(object.isNumber(n)) {
        return n - 1;
      } else {
        return this['months'].findIndex(regexp(n, 'i')) % 12;
      }
    },

    getWeekday: function(n) {
      return this['weekdays'].findIndex(regexp(n, 'i')) % 7;
    },

    getNumber: function(n) {
      var i;
      if(object.isNumber(n)) {
        return n;
      } else if(n && (i = this['numbers'].indexOf(n)) !== -1) {
        return (i + 1) % 10;
      } else {
        return 1;
      }
    },

    getNumericDate: function(n) {
      var self = this;
      return n.replace(this['numbers'][9], '').each(function(d) {
        return self.getNumber(d);
      }).join('');
    },

    getEnglishUnit: function(n) {
      return English['units'][this['units'].indexOf(n) % 8];
    },

    relative: function(adu) {
      return this.convertAdjustedToFormat(adu, adu[2] > 0 ? 'futureRelativeFormat' : 'pastRelativeFormat');
    },

    duration: function(ms) {
      return this.convertAdjustedToFormat(getAdjustedUnit(ms), 'durationFormat');
    },

    convertAdjustedToFormat: function(adu, format) {
      var num = adu[0], u = adu[1], ms = adu[2], sign, unit, last, mult;
      if(this['code'] == 'ru') {
        last = num.toString().from(-1);
        switch(true) {
          case last == 1: mult = 1; break;
          case last >= 2 && last <= 4: mult = 2; break;
          default: mult = 3;
        }
      } else {
        mult = this['hasPlural'] && num > 1 ? 1 : 0;
      }
      unit = this['units'][mult * 8 + u] || this['units'][u];
      if(this['capitalizeUnit']) unit = unit.capitalize();
      sign = this['modifiers'].find(function(m) { return m.name == 'sign' && m.value == (ms > 0 ? 1 : -1); });
      return this[format].assign({ 'num': num, 'unit': unit, 'sign': sign.src });
    },

    addFormat: function(src, code, add) {
      var to = [], loc = this;
      if(add !== false) loc.formats.push(src);
      src = src.replace(/\s+/g, '[-,. ]*');
      src = src.replace(/\{(.+?)\}/g, function(all, k) {
        var opt = k.match(/\?$/), slice = k.match(/(\d)(?:-(\d))?/), nc = k.match(/^\d+$/), key = k.replace(/[^a-z]+$/, ''), value, arr;
        if(key === 'time') {
          to = to.concat(TimeFormat);
          return opt ? OptionalTime : RequiredTime;
        }
        if(nc) {
          value = loc['optionals'][nc[0]];
        } else if(loc[key]) {
          value = loc[key];
        } else if(loc[key + 's']) {
          value = loc[key + 's'];
          if(slice) {
            // Can't use filter here as Prototype hijacks the method and doesn't
            // pass an index, so use a simple loop instead!
            arr = [];
            value.forEach(function(m, i) {
              var mod = i % (loc['units'] ? 8 : value.length);
              if(mod >= slice[1] && mod <= (slice[2] || slice[1])) {
                arr.push(m);
              }
            });
            value = arr;
          }
          value = value.compact().join('|');
        }
        if(nc) {
          return '(?:' + value + ')?';
        } else {
          to.push(key);
          return '(' + value + ')' + (opt ? '?' : '');
        }
      });
      addDateInputFormat(src, to, code);
    }

  });

  function collectDateArguments(args) {
    var obj, arr;
    if(object.isObject(args[0])) {
      return args;
    } else if (args.length == 1 && object.isNumber(args[0])) {
      return [args[0]];
    }
    obj = {};
    DateArgumentUnits.each(function(u,i) {
      obj[u.unit] = args[i];
    });
    return [obj];
  }

  function convertAsianDigits(str, key) {
    if(key != 'date' && key != 'month' && key != 'year') return str;
    return str.replace(AsianDigitReg, function(d) {
      var index = LowerAsianDigits.indexOf(d);
      return (index + 1) || '';
    });
  }

  function getFormatMatch(match, arr) {
    var obj = {}, value, num;
    arr.each(function(key, i) {
      value = match[i + 1];
      if(isUndefined(value) || value === '') return;
      value = convertAsianDigits(value.hankaku('n'), key);
      if(key === 'year') obj.yearAsString = value;
      num = parseFloat(value.replace(/,/, '.'));
      obj[key] = !isNaN(num) ? num : value.toLowerCase();
    });
    return obj;
  }

  function getExtendedDate(f, locale) {
    var d = new date(), relative = false, loc, variant, format, set, unit, num, tmp;
    if(object.isDate(f)) {
      d = f;
    } else if(object.isNumber(f)) {
      d = new date(f);
    } else if(object.isObject(f)) {
      d = new date().set(f, true);
      set = f;
    } else if(object.isString(f)) {
      // Pre-initialize the localization formats.

      checkLocaleFormatsAdded(getLocalization(locale, true));
      variant = getVariant(locale);
      f = f.trim().replace(/\.+$/,'').replace(/^now$/, '');
      DateInputFormats.each(function(dif) {
        var match = f.match(dif.reg);
        if(match) {
          format = dif;
          set = getFormatMatch(match, format.to);
          loc = getLocalization(format.locale, true);

          if(set.timestamp) {
            d.setTime(0);
            set = { 'milliseconds': set.timestamp };
            return false;
          }

          // If there's a European variant, swap the month and day.
          if(format.variant && !object.isString(set['month']) && (object.isString(set['date']) || variant)) {
            tmp = set['month'];
            set['month'] = set['date'];
            set['date'] = tmp;
          }

          // If the year is 2 digits then get the implied century.
          if(set['year'] && set.yearAsString.length === 2) {
            set['year'] = getYearFromAbbreviation(set['year']);
          }

          // Set the month which may be localized.
          if(set['month']) {
            set['month'] = loc.getMonth(set['month']);
            if(set['shift'] && !set['unit']) set['unit'] = 'year';
          }

          // If there is both a weekday and a date, the date takes precedence.
          if(set['weekday'] && set['date']) {
            delete set['weekday'];
          // Otherwise set a localized weekday.
          } else if(set['weekday']) {
            set['weekday'] = loc.getWeekday(set['weekday']);
            if(set['shift'] && !set['unit']) set['unit'] = 'week';
          }

          // Relative day localizations such as "today" and "tomorrow".
          if(set['day'] && (tmp = loc.modifiersByName[set['day']])) {
            set['day'] = tmp.value;
            d.resetTime();
            relative = true;
          // If the day is a weekday, then set that instead.
          } else if(set['day'] && (tmp = loc.getWeekday(set['day'])) > -1) {
            delete set['day'];
            set['weekday'] = tmp;
          }

          if(set['date'] && !object.isNumber(set['date'])) {
            set['date'] = loc.getNumericDate(set['date']);
          }

          // If the time is 1pm-11pm advance the time by 12 hours.
          if(set['meridian']) {
            if(set['meridian'] === 'pm' && set['hour'] < 12) set['hour'] += 12;
          }

          // Adjust for timezone offset
          if('offset_hours' in set || 'offset_minutes' in set) {
            set['utc'] = true;
            set['offset_minutes'] = set['offset_minutes'] || 0;
            set['offset_minutes'] += set['offset_hours'] * 60;
            if(set['offset_sign'] === '-') {
              set['offset_minutes'] *= -1;
            }
            set['minute'] -= set['offset_minutes'];
          }

          // Date has a unit like "days", "months", etc. are all relative to the current date.
          if(set['unit']) {
            relative = true;
            num = loc.getNumber(set['num']);
            unit = loc.getEnglishUnit(set['unit']);

            // Shift and unit, ie "next month", "last week", etc.
            if(set['shift'] || set['edge']) {
              num *= (tmp = loc.modifiersByName[set['shift']]) ? tmp.value : 0;

              // Relative month and static date: "the 15th of last month"
              if(unit === 'month' && isDefined(set['date'])) {
                d.set({ 'day': set['date'] }, true);
                delete set['date'];
              }

              // Relative year and static month/date: "June 15th of last year"
              if(unit === 'year' && isDefined(set['month'])) {
                d.set({ 'month': set['month'], 'day': set['date'] }, true);
                delete set['month'];
                delete set['date'];
              }
            }

            // Unit and sign, ie "months ago", "weeks from now", etc.
            if(set['sign'] && (tmp = loc.modifiersByName[set['sign']])) {
              num *= tmp.value;
            }

            // Units can be with non-relative dates, set here. ie "the day after monday"
            if(isDefined(set['weekday'])) {
              d.set({'weekday': set['weekday'] }, true);
              delete set['weekday'];
            }

            // Finally shift the unit.
            set[unit] = (set[unit] || 0) + num;
          }

          if(set['year_sign'] === '-') {
            set['year'] *= -1;
          }

          DateUnitsReversed.slice(1,4).each(function(u, i) {
            var value = set[u.unit], fraction = value % 1;
            if(fraction) {
              set[DateUnitsReversed[i].unit] = (fraction * (u.unit === 'second' ? 1000 : 60)).round();
              set[u.unit] = value | 0;
            }
          });
          return false;
        }
      });
      if(!format) {
        // The Date constructor does something tricky like checking the number
        // of arguments so simply passing in undefined won't work.
        d = f ? new date(f) : new date();
      } else if(relative) {
        d.advance(set);
      } else if(set['utc']) {
        // UTC times can traverse into other days or even months,
        // so preemtively reset the time here to prevent this.
        d.resetTime();
        d.setUTC(set, true);
      } else {
        d.set(set, true);
      }

      // If there is an "edge" it needs to be set after the
      // other fields are set. ie "the end of February"
      if(set && set['edge']) {
        tmp = loc.modifiersByName[set['edge']];
        DateUnitsReversed.slice(4).each(function(u) {
          if(isDefined(set[u.unit])) {
            unit = u.unit;
            return false;
          }
        });
        if(unit === 'year') set.specificity = 'month';
        else if(unit === 'month' || unit === 'week') set.specificity = 'day';
        d[(tmp.value < 0 ? 'endOf' : 'beginningOf') + unit.capitalize()]();
        // This value of -2 is arbitrary but it's a nice clean way to hook into this system.
        if(tmp.value === -2) d.resetTime();
      }
    }
    return {
      date: d,
      set: set
    }
  }

  function formatDate(date, f, relative, locale) {
    var adu, loc = getLocalization(locale, true), caps = regexp(/^[A-Z]/), value, l;
    if(!date.isValid()) {
      return 'Invalid Date';
    } else if(Date[f]) {
      f = Date[f];
    } else if(object.isFunction(f)) {
      adu = getAdjustedUnit(date.millisecondsFromNow());
      f = f.apply(date, adu.concat(loc));
    }
    if(!f && !relative) {
      f = loc['outputFormat'];
    } else if(!f && relative) {
      adu = adu || getAdjustedUnit(date.millisecondsFromNow());
      // Adjust up if time is in ms, as this doesn't
      // look very good for a standard relative date.
      if(adu[1] === 0) {
        adu[1] = 1;
        adu[0] = 1;
      }
      return loc.relative(adu);
    }
    DateOutputFormats.each(function(dof) {
      f = f.replace(regexp('\\{('+dof.token+')(\\d)?\\}', dof.word ? 'i' : ''), function(m,t,d) {
        var val = dof.format(date, loc, d || 1, t), l = t.length, one = t.match(/^(.)\1+$/);
        if(dof.word) {
          if(l === 3) val = val.to(3);
          if(one || t.match(caps)) val = val.capitalize();
        } else if(one && !dof.text) {
          val = (object.isNumber(val) ? val.pad(l) : val.toString()).last(l);
        }
        return val;
      });
    });
    return f;
  }

  function compareDate(d, find, buffer) {
    var p = getExtendedDate(find), accuracy = 0, loBuffer = 0, hiBuffer = 0, override;
    if(buffer > 0) {
      loBuffer = hiBuffer = buffer;
      override = true;
    }
    if(!p.date.isValid()) return false;
    if(p.set && p.set.specificity) {
      DateUnits.each(function(u, i) {
        if(u.unit === p.set.specificity) {
          accuracy = u.multiplier(p.date, d - p.date) - 1;
        }
      });
      if(p.set['edge'] || p.set['shift']) {
        p.date['beginningOf' + p.set.specificity.capitalize()]();
      }
      if(!override && p.set['sign'] && p.set.specificity != 'millisecond') {
        // If the time is relative, there can occasionally be an disparity between the relative date
        // and "now", which it is being compared to, so set an extra buffer to account for this.
        loBuffer = 50;
        hiBuffer = -50;
      }
    }
    var t   = d.getTime();
    var min = p.date.getTime();
    var max = min + accuracy;
    if(p.set && p.set.specificity == 'week' && new Date(max + 1).getHours() != 0) {
      max += date['DSTOffset'];
    }
    return t >= (min - loBuffer) && t <= (max + hiBuffer);
  }

  function updateDate(date, params, reset, utc, advance) {
    if(object.isNumber(params) && advance) {
      // If param is a number and we're advancing, the number is presumed to be milliseconds.
      params = { 'milliseconds': params };
    } else if(object.isNumber(params)) {
      // Otherwise just set the timestamp and return.
      date.setTime(params);
      return date;
    }

    // "date" can also be passed for the day
    if(params['date']) params['day'] = params['date'];
    // If a weekday is included in the params, set it ahead of time and set the params
    // to reflect the updated date so that resetting works properly.
    if(!advance && isUndefined(params['day']) && isDefined(params['weekday'])) {
      callDateMethod(date, 'set', utc, 'Weekday', params['weekday'])
      params['day'] = callDateMethod(date, 'get', utc, 'Date');
      delete params['weekday'];
    }
    // Reset any unit lower than the least specific unit set. Do not do this for weeks
    // or for years. This needs to be performed before the acutal setting of the date
    // because the order needs to be reversed in order to get the lowest specificity.
    // The order of the date setting is also fixed because higher order units can be
    // overwritten by lower order units, such as setting hour: 3, minute: 345, etc.
    DateUnitsReversed.each(function(u) {
      if(isDefined(params[u.unit]) || isDefined(params[u.unit + 's'])) {
        params.specificity = u.unit;
        return false;
      } else if(reset && u.unit !== 'week' && u.unit !== 'year') {
        callDateMethod(date, 'set', utc, u.method, (u.unit === 'day') ? 1 : 0);
      }
    });
    // Now actually set or advance the date in order, higher units first.
    DateUnits.each(function(u,i) {
      var unit   = u.unit;
      var method = u.method;
      var value = isDefined(params[unit]) ? params[unit] : params[unit + 's'];
      if(isUndefined(value)) return;
      if(advance) {
        if(unit === 'week') {
          value  = (params['day'] || 0) + (value * 7);
          method = 'Date';
        }
        value = (value * advance) + callDateMethod(date, 'get', '', method);
      }
      callDateMethod(date, 'set', utc, method, value);
      if(unit === 'month') {
        checkMonthTraversal(date, value);
      }
    });
    return date;
  }

  function callDateMethod(d, prefix, utc, method, value) {
    return d[prefix + (utc ? 'UTC' : '') + method](value);
  }

  // If the year is two digits, add the most appropriate century prefix.
  function getYearFromAbbreviation(year) {
    return (new date().getFullYear() / 100).round() * 100 - (year / 100).round() * 100 + year;
  }

  function getShortHour(d, utc) {
    var hours = callDateMethod(d, 'get', utc, 'Hours');
    return hours === 0 ? 12 : hours - ((hours / 13 | 0) * 12);
  }

  function getMeridian(d, utc) {
    var hours = callDateMethod(d, 'get', utc, 'Hours');
    return hours < 12 ? 'am' : 'pm';
  }

  // weeksSince won't work here as the result needs to be floored, not rounded.
  function getWeekNumber(date) {
    var dow = date.getDay() || 7;
    date.addDays(4 - dow).resetTime();
    return 1 + (date.daysSince(date.clone().beginningOfYear()) / 7 | 0);
  }

  function getAdjustedUnit(ms) {
    var next, ams = ms.abs(), value = ams, unit = 0;
    DateUnitsReversed.from(1).each(function(u, i) {
      next = (ams / u.multiplier() * 10).round() / 10 | 0;
      if(next >= 1) {
        value = next;
        unit = i + 1;
      }
    });
    return [value, unit, ms];
  }


  // If the month is being set, then we don't want to accidentally
  // traverse into a new month just because the target month doesn't have enough
  // days. In other words, "5 months ago" from July 30th is still February, even
  // though there is no February 30th, so it will of necessity be February 28th
  // (or 29th in the case of a leap year).

  function checkMonthTraversal(date, targetMonth) {
    if(targetMonth < 0) targetMonth += 12;
    if(targetMonth % 12 != date.getMonth()) {
      date.setDate(0);
    }
  }

  function createDate(args) {
    var f;
    if(object.isNumber(args[1])) {
      // If the second argument is a number, then we have an enumerated constructor type as in "new Date(2003, 2, 12);"
      f = collectDateArguments(args)[0];
    } else {
      f = args[0];
    }
    return getExtendedDate(f, args[1]).date;
  }



   /***
   * @method [units]Since([d], [locale] = currentLocale)
   * @returns Number
   * @short Returns the time since [d] in the appropriate unit.
   * @extra [d] will accept a date object, timestamp, or text format. If not specified, [d] is assumed to be now. [locale] can be passed to specify the locale that the date is in. For more see @date_format.
   * @example
   *
   *   Date.create().millisecondsSince('1 hour ago') -> 3,600,000
   *   Date.create().daysSince('1 week ago')         -> 7
   *   Date.create().yearsSince('15 years ago')      -> 15
   *   Date.create('15 years ago').yearsAgo()        -> 15
   *
   ***
   * @method millisecondsSince()
   * @set unitsSince
   ***
   * @method secondsSince()
   * @set unitsSince
   ***
   * @method minutesSince()
   * @set unitsSince
   ***
   * @method hoursSince()
   * @set unitsSince
   ***
   * @method daysSince()
   * @set unitsSince
   ***
   * @method weeksSince()
   * @set unitsSince
   ***
   * @method monthsSince()
   * @set unitsSince
   ***
   * @method yearsSince()
   * @set unitsSince
   ***
   * @method [units]Ago()
   * @returns Number
   * @short Returns the time ago in the appropriate unit.
   * @example
   *
   *   Date.create('last year').millisecondsAgo() -> 3,600,000
   *   Date.create('last year').daysAgo()         -> 7
   *   Date.create('last year').yearsAgo()        -> 15
   *
   ***
   * @method millisecondsAgo()
   * @set unitsAgo
   ***
   * @method secondsAgo()
   * @set unitsAgo
   ***
   * @method minutesAgo()
   * @set unitsAgo
   ***
   * @method hoursAgo()
   * @set unitsAgo
   ***
   * @method daysAgo()
   * @set unitsAgo
   ***
   * @method weeksAgo()
   * @set unitsAgo
   ***
   * @method monthsAgo()
   * @set unitsAgo
   ***
   * @method yearsAgo()
   * @set unitsAgo
   ***
   * @method [units]Until([d], [locale] = currentLocale)
   * @returns Number
   * @short Returns the time until [d] in the appropriate unit.
   * @extra [d] will accept a date object, timestamp, or text format. If not specified, [d] is assumed to be now. [locale] can be passed to specify the locale that the date is in. %[unit]FromNow% is provided as an alias to make this more readable. For more see @date_format.
   * @example
   *
   *   Date.create().millisecondsUntil('1 hour from now') -> 3,600,000
   *   Date.create().daysUntil('1 week from now')         -> 7
   *   Date.create().yearsUntil('15 years from now')      -> 15
   *   Date.create('15 years from now').yearsFromNow()    -> 15
   *
   ***
   * @method millisecondsUntil()
   * @set unitsUntil
   ***
   * @method secondsUntil()
   * @set unitsUntil
   ***
   * @method minutesUntil()
   * @set unitsUntil
   ***
   * @method hoursUntil()
   * @set unitsUntil
   ***
   * @method daysUntil()
   * @set unitsUntil
   ***
   * @method weeksUntil()
   * @set unitsUntil
   ***
   * @method monthsUntil()
   * @set unitsUntil
   ***
   * @method yearsUntil()
   * @set unitsUntil
   ***
   * @method [units]FromNow()
   * @returns Number
   * @short Returns the time from now in the appropriate unit.
   * @example
   *
   *   Date.create('next year').millisecondsFromNow() -> 3,600,000
   *   Date.create('next year').daysFromNow()         -> 7
   *   Date.create('next year').yearsFromNow()        -> 15
   *
   ***
   * @method millisecondsFromNow()
   * @set unitsFromNow
   ***
   * @method secondsFromNow()
   * @set unitsFromNow
   ***
   * @method minutesFromNow()
   * @set unitsFromNow
   ***
   * @method hoursFromNow()
   * @set unitsFromNow
   ***
   * @method daysFromNow()
   * @set unitsFromNow
   ***
   * @method weeksFromNow()
   * @set unitsFromNow
   ***
   * @method monthsFromNow()
   * @set unitsFromNow
   ***
   * @method yearsFromNow()
   * @set unitsFromNow
   ***
   * @method add[Units](<num>)
   * @returns Date
   * @short Adds <num> of the unit to the date.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Don't use this method if you need precision.
   * @example
   *
   *   Date.create().addMilliseconds(5) -> current time + 5 milliseconds
   *   Date.create().addDays(5)         -> current time + 5 days
   *   Date.create().addYears(5)        -> current time + 5 years
   *
   ***
   * @method addMilliseconds()
   * @set addUnits
   ***
   * @method addSeconds()
   * @set addUnits
   ***
   * @method addMinutes()
   * @set addUnits
   ***
   * @method addHours()
   * @set addUnits
   ***
   * @method addDays()
   * @set addUnits
   ***
   * @method addWeeks()
   * @set addUnits
   ***
   * @method addMonths()
   * @set addUnits
   ***
   * @method addYears()
   * @set addUnits
   ***
   * @method isLast[Unit]()
   * @returns Boolean
   * @short Returns true if the date is last week/month/year.
   * @example
   *
   *   Date.create('yesterday').isLastWeek()  -> true or false?
   *   Date.create('yesterday').isLastMonth() -> probably not...
   *   Date.create('yesterday').isLastYear()  -> even less likely...
   *
   ***
   * @method isThis[Unit]()
   * @returns Boolean
   * @short Returns true if the date is this week/month/year.
   * @example
   *
   *   Date.create('tomorrow').isThisWeek()  -> true or false?
   *   Date.create('tomorrow').isThisMonth() -> probably...
   *   Date.create('tomorrow').isThisYear()  -> signs point to yes...
   *
   ***
   * @method isNext[Unit]()
   * @returns Boolean
   * @short Returns true if the date is next week/month/year.
   * @example
   *
   *   Date.create('tomorrow').isNextWeek()  -> true or false?
   *   Date.create('tomorrow').isNextMonth() -> probably not...
   *   Date.create('tomorrow').isNextYear()  -> even less likely...
   *
   ***
   * @method isLastWeek()
   * @set isLastUnit
   ***
   * @method isLastMonth()
   * @set isLastUnit
   ***
   * @method isLastYear()
   * @set isLastUnit
   ***
   * @method isThisWeek()
   * @set isThisUnit
   ***
   * @method isThisMonth()
   * @set isThisUnit
   ***
   * @method isThisYear()
   * @set isThisUnit
   ***
   * @method isNextWeek()
   * @set isNextUnit
   ***
   * @method isNextMonth()
   * @set isNextUnit
   ***
   * @method isNextYear()
   * @set isNextUnit
   ***
   * @method beginningOf[Unit]()
   * @returns Date
   * @short Sets the date to the beginning of the appropriate unit.
   * @example
   *
   *   Date.create().beginningOfDay()   -> the beginning of today (resets the time)
   *   Date.create().beginningOfWeek()  -> the beginning of the week
   *   Date.create().beginningOfMonth() -> the beginning of the month
   *   Date.create().beginningOfYear()  -> the beginning of the year
   *
   ***
   * @method endOf[Unit]()
   * @returns Date
   * @short Sets the date to the end of the appropriate unit.
   * @example
   *
   *   Date.create().endOfDay()   -> the end of today (sets the time to 23:59:59.999)
   *   Date.create().endOfWeek()  -> the end of the week
   *   Date.create().endOfMonth() -> the end of the month
   *   Date.create().endOfYear()  -> the end of the year
   *
   ***
   * @method beginningOfDay()
   * @set beginningOfUnit
   ***
   * @method beginningOfWeek()
   * @set beginningOfUnit
   ***
   * @method beginningOfMonth()
   * @set beginningOfUnit
   ***
   * @method beginningOfYear()
   * @set beginningOfUnit
   ***
   * @method endOfDay()
   * @set endOfUnit
   ***
   * @method endOfWeek()
   * @set endOfUnit
   ***
   * @method endOfMonth()
   * @set endOfUnit
   ***
   * @method endOfYear()
   * @set endOfUnit
   ***/
  function buildDateMethods() {
    var methods = {};
    DateUnits.each(function(u, i) {
      var unit = u.unit;
      var caps = unit.capitalize();
      var multiplier = u.multiplier();
      var since = function(f, code) {
        return ((this.getTime() - date.create(f, code).getTime()) / multiplier).round();
      };
      var until = function(f, code) {
        return ((date.create(f, code).getTime() - this.getTime()) / multiplier).round();
      };
      methods[unit+'sAgo']     = until;
      methods[unit+'sUntil']   = until;
      methods[unit+'sSince']   = since;
      methods[unit+'sFromNow'] = since;
      methods['add'+caps+'s'] = function(num) {
        var set = {};
        set[unit] = num;
        return this.advance(set);
      };
      buildNumberToDateAlias(unit, multiplier);
      if(i < 3) {
        ['Last','This','Next'].each(function(shift) {
          methods['is' + shift + caps] = function() {
            return this.is(shift + ' ' + unit);
          };
        });
      }
      if(i < 4) {
        methods['beginningOf' + caps] = function() {
          var set = {};
          switch(unit) {
            case 'year':  set['year'] = this.getFullYear(); break;
            case 'month': set['month'] = this.getMonth(); break;
            case 'day':   set['day'] = this.getDate(); break;
            case 'week':  set['weekday'] = 0; break;
          }
          return this.set(set, true);
        };
        methods['endOf' + caps] = function() {
          var set = { 'hours': 23, 'minutes': 59, 'seconds': 59, 'milliseconds': 999 };
          switch(unit) {
            case 'year':  set['month'] = 11; set['day'] = 31; break;
            case 'month': set['day'] = this.daysInMonth(); break;
            case 'week':  set['weekday'] = 6; break;
          }
          return this.set(set, true);
        };
      }
    });
    date.extend(methods);
  }

  function buildDateInputFormats() {
    DateArgumentUnits = DateUnits.clone().removeAt(2);
    DateUnitsReversed = DateUnits.clone().reverse();
    var monthReg = '\\d{1,2}|' + English['months'].join('|');
    StaticInputFormats.each(function(f) {
      addDateInputFormat(f.src.replace(/\{month\}/, monthReg) + (f.time === false ? '' : OptionalTime), f.to.concat(TimeFormat), 'en', f.variant);
    });
    addDateInputFormat(RequiredTime, TimeFormat);
  }

   /***
   * @method is[Day]()
   * @returns Boolean
   * @short Returns true if the date falls on that day.
   * @extra Also available: %isYesterday%, %isToday%, %isTomorrow%, %isWeekday%, and %isWeekend%.
   * @example
   *
   *   Date.create('tomorrow').isToday() -> false
   *   Date.create('thursday').isTomorrow() -> ?
   *   Date.create('yesterday').isWednesday() -> ?
   *   Date.create('today').isWeekend() -> ?
   *
   ***
   * @method isToday()
   * @set isDay
   ***
   * @method isYesterday()
   * @set isDay
   ***
   * @method isTomorrow()
   * @set isDay
   ***
   * @method isWeekday()
   * @set isDay
   ***
   * @method isWeekend()
   * @set isDay
   ***
   * @method isSunday()
   * @set isDay
   ***
   * @method isMonday()
   * @set isDay
   ***
   * @method isTuesday()
   * @set isDay
   ***
   * @method isWednesday()
   * @set isDay
   ***
   * @method isThursday()
   * @set isDay
   ***
   * @method isFriday()
   * @set isDay
   ***
   * @method isSaturday()
   * @set isDay
   ***
   * @method isFuture()
   * @returns Boolean
   * @short Returns true if the date is in the future.
   * @example
   *
   *   Date.create('next week').isFuture() -> true
   *   Date.create('last week').isFuture() -> false
   *
   ***
   * @method isPast()
   * @returns Boolean
   * @short Returns true if the date is in the past.
   * @example
   *
   *   Date.create('last week').isPast() -> true
   *   Date.create('next week').isPast() -> false
   *
   ***/
  function buildRelativeAliases() {
    var methods = {};
    var weekdays = English['weekdays'].slice(0,7);
    var months = English['months'].slice(0,12);
    ['today','yesterday','tomorrow','weekday','weekend','future','past'].concat(weekdays).concat(months).each(function(s) {
      methods['is'+ s.capitalize()] = function() {
        return this.is(s);
      };
    });
    date.extend(methods);
  }

  /***
   * @method [unit]()
   * @returns Number
   * @short Takes the number as a corresponding unit of time and converts to milliseconds.
   * @extra Method names can be both singular and plural.  Note that as "a month" is ambiguous as a unit of time, %months% will be equivalent to 30.4375 days, the average number in a month. Be careful using %months% if you need exact precision.
   * @example
   *
   *   (5).milliseconds() -> 5
   *   (10).hours()       -> 36000000
   *   (1).day()          -> 86400000
   *
   ***
   * @method millisecond()
   * @set unit
   ***
   * @method milliseconds()
   * @set unit
   ***
   * @method second()
   * @set unit
   ***
   * @method seconds()
   * @set unit
   ***
   * @method minute()
   * @set unit
   ***
   * @method minutes()
   * @set unit
   ***
   * @method hour()
   * @set unit
   ***
   * @method hours()
   * @set unit
   ***
   * @method day()
   * @set unit
   ***
   * @method days()
   * @set unit
   ***
   * @method week()
   * @set unit
   ***
   * @method weeks()
   * @set unit
   ***
   * @method month()
   * @set unit
   ***
   * @method months()
   * @set unit
   ***
   * @method year()
   * @set unit
   ***
   * @method years()
   * @set unit
   ***
   * @method [unit]Before([d], [locale] = currentLocale)
   * @returns Date
   * @short Returns a date that is <n> units before [d], where <n> is the number.
   * @extra [d] will accept a date object, timestamp, or text format. Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsBefore% if you need exact precision. See @date_format for more information.
   * @example
   *
   *   (5).daysBefore('tuesday')          -> 5 days before tuesday of this week
   *   (1).yearBefore('January 23, 1997') -> January 23, 1996
   *
   ***
   * @method millisecondBefore()
   * @set unitBefore
   ***
   * @method millisecondsBefore()
   * @set unitBefore
   ***
   * @method secondBefore()
   * @set unitBefore
   ***
   * @method secondsBefore()
   * @set unitBefore
   ***
   * @method minuteBefore()
   * @set unitBefore
   ***
   * @method minutesBefore()
   * @set unitBefore
   ***
   * @method hourBefore()
   * @set unitBefore
   ***
   * @method hoursBefore()
   * @set unitBefore
   ***
   * @method dayBefore()
   * @set unitBefore
   ***
   * @method daysBefore()
   * @set unitBefore
   ***
   * @method weekBefore()
   * @set unitBefore
   ***
   * @method weeksBefore()
   * @set unitBefore
   ***
   * @method monthBefore()
   * @set unitBefore
   ***
   * @method monthsBefore()
   * @set unitBefore
   ***
   * @method yearBefore()
   * @set unitBefore
   ***
   * @method yearsBefore()
   * @set unitBefore
   ***
   * @method [unit]Ago()
   * @returns Date
   * @short Returns a date that is <n> units ago.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsAgo% if you need exact precision.
   * @example
   *
   *   (5).weeksAgo() -> 5 weeks ago
   *   (1).yearAgo()  -> January 23, 1996
   *
   ***
   * @method millisecondAgo()
   * @set unitAgo
   ***
   * @method millisecondsAgo()
   * @set unitAgo
   ***
   * @method secondAgo()
   * @set unitAgo
   ***
   * @method secondsAgo()
   * @set unitAgo
   ***
   * @method minuteAgo()
   * @set unitAgo
   ***
   * @method minutesAgo()
   * @set unitAgo
   ***
   * @method hourAgo()
   * @set unitAgo
   ***
   * @method hoursAgo()
   * @set unitAgo
   ***
   * @method dayAgo()
   * @set unitAgo
   ***
   * @method daysAgo()
   * @set unitAgo
   ***
   * @method weekAgo()
   * @set unitAgo
   ***
   * @method weeksAgo()
   * @set unitAgo
   ***
   * @method monthAgo()
   * @set unitAgo
   ***
   * @method monthsAgo()
   * @set unitAgo
   ***
   * @method yearAgo()
   * @set unitAgo
   ***
   * @method yearsAgo()
   * @set unitAgo
   ***
   * @method [unit]After([d], [locale] = currentLocale)
   * @returns Date
   * @short Returns a date <n> units after [d], where <n> is the number.
   * @extra [d] will accept a date object, timestamp, or text format. Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsAfter% if you need exact precision. See @date_format for more information.
   * @example
   *
   *   (5).daysAfter('tuesday')          -> 5 days after tuesday of this week
   *   (1).yearAfter('January 23, 1997') -> January 23, 1998
   *
   ***
   * @method millisecondAfter()
   * @set unitAfter
   ***
   * @method millisecondsAfter()
   * @set unitAfter
   ***
   * @method secondAfter()
   * @set unitAfter
   ***
   * @method secondsAfter()
   * @set unitAfter
   ***
   * @method minuteAfter()
   * @set unitAfter
   ***
   * @method minutesAfter()
   * @set unitAfter
   ***
   * @method hourAfter()
   * @set unitAfter
   ***
   * @method hoursAfter()
   * @set unitAfter
   ***
   * @method dayAfter()
   * @set unitAfter
   ***
   * @method daysAfter()
   * @set unitAfter
   ***
   * @method weekAfter()
   * @set unitAfter
   ***
   * @method weeksAfter()
   * @set unitAfter
   ***
   * @method monthAfter()
   * @set unitAfter
   ***
   * @method monthsAfter()
   * @set unitAfter
   ***
   * @method yearAfter()
   * @set unitAfter
   ***
   * @method yearsAfter()
   * @set unitAfter
   ***
   * @method [unit]FromNow()
   * @returns Date
   * @short Returns a date <n> units from now.
   * @extra Note that "months" is ambiguous as a unit of time. If the target date falls on a day that does not exist (ie. August 31 -> February 31), the date will be shifted to the last day of the month. Be careful using %monthsFromNow% if you need exact precision.
   * @example
   *
   *   (5).weeksFromNow() -> 5 weeks ago
   *   (1).yearFromNow()  -> January 23, 1998
   *
   ***
   * @method millisecondFromNow()
   * @set unitFromNow
   ***
   * @method millisecondsFromNow()
   * @set unitFromNow
   ***
   * @method secondFromNow()
   * @set unitFromNow
   ***
   * @method secondsFromNow()
   * @set unitFromNow
   ***
   * @method minuteFromNow()
   * @set unitFromNow
   ***
   * @method minutesFromNow()
   * @set unitFromNow
   ***
   * @method hourFromNow()
   * @set unitFromNow
   ***
   * @method hoursFromNow()
   * @set unitFromNow
   ***
   * @method dayFromNow()
   * @set unitFromNow
   ***
   * @method daysFromNow()
   * @set unitFromNow
   ***
   * @method weekFromNow()
   * @set unitFromNow
   ***
   * @method weeksFromNow()
   * @set unitFromNow
   ***
   * @method monthFromNow()
   * @set unitFromNow
   ***
   * @method monthsFromNow()
   * @set unitFromNow
   ***
   * @method yearFromNow()
   * @set unitFromNow
   ***
   * @method yearsFromNow()
   * @set unitFromNow
   ***/
  function buildNumberToDateAlias(unit, multiplier) {
    var add = 'add' + unit.capitalize() + 's', methods = {};
    function base() { return (this * multiplier).round(); }
    function after() { return createDate(arguments)[add](this);  }
    function before() { return createDate(arguments)[add](-this); }
    methods[unit] = base;
    methods[unit + 's'] = base;
    methods[unit + 'Before'] = before;
    methods[unit + 'sBefore'] = before;
    methods[unit + 'Ago'] = before;
    methods[unit + 'sAgo'] = before;
    methods[unit + 'After'] = after;
    methods[unit + 'sAfter'] = after;
    methods[unit + 'FromNow'] = after;
    methods[unit + 'sFromNow'] = after;
    number.extend(methods);
  }

  function setDateProperties() {
    date.extend({
      'DSTOffset': (new date(2000, 6, 1).getTimezoneOffset() - new date(2000, 0, 1).getTimezoneOffset()) * 60 * 1000,
      'INTERNATIONAL_TIME': '{h}:{mm}:{ss}',
      'RFC1123': '{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}',
      'RFC1036': '{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}',
      'ISO8601_DATE': '{yyyy}-{MM}-{dd}',
      'ISO8601_DATETIME': '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}'
    }, false, false);
  }


   /***
   * @method toISOString()
   * @returns String
   * @short Formats the string to ISO8601 format.
   * @extra This will always format as UTC time. Provided for browsers that do not support this method.
   * @example
   *
   *   Date.create().toISOString() -> ex. 2011-07-05 12:24:55.528Z
   *
   ***
   * @method toJSON()
   * @returns String
   * @short Returns a JSON representation of the date.
   * @extra This is effectively an alias for %toISOString%. Will always return the date in UTC time. Implemented for browsers that do not support it.
   * @example
   *
   *   Date.create().toJSON() -> ex. 2011-07-05 12:24:55.528Z
   *
   ***/

  function buildISOString(name) {
    var d = new date(date.UTC(1999, 11, 31)), target = '1999-12-31T00:00:00.000Z', methods = {};
    if(!d[name] || d[name]() !== target) {
      methods[name] = function() { return formatDate(this.toUTC(), date['ISO8601_DATETIME']); }
      date.extend(methods, true);
    }
  }

  function buildDate() {
    English = date.setLocale('en');
    buildDateMethods();
    buildDateInputFormats();
    buildRelativeAliases();
    buildISOString('toISOString');
    buildISOString('toJSON');
    setDateProperties();
  }


  date.extend({

     /***
     * @method Date.create(<d>, [locale] = currentLocale)
     * @returns Date
     * @short Alternate Date constructor which understands various formats.
     * @extra Accepts a multitude of text formats, a timestamp, or another date. If no argument is given, date is assumed to be now. %Date.create% additionally can accept enumerated parameters as with the standard date constructor. [locale] can be passed to specify the locale that the date is in. For more information, see @date_format.
     * @example
     *
     *   Date.create('July')          -> July of this year
     *   Date.create('1776')          -> 1776
     *   Date.create('today')         -> today
     *   Date.create('wednesday')     -> This wednesday
     *   Date.create('next friday')   -> Next friday
     *   Date.create('July 4, 1776')  -> July 4, 1776
     *   Date.create(-446806800000)   -> November 5, 1955
     *   Date.create(1776, 6, 4)      -> July 4, 1776
     *   Date.create('1776年07月04日', 'ja') -> July 4, 1776
     *
     ***/
    'create': function() {
      return createDate(arguments);
    },

     /***
     * @method Date.now()
     * @returns String
     * @short Returns the number of milliseconds since January 1st, 1970 00:00:00 (UTC time).
     * @example
     *
     *   Date.now() -> ex. 1311938296231
     *
     ***/
    'now': function() {
      return new date().getTime();
    },

     /***
     * @method Date.setLocale(<code>, [set])
     * @returns Locale
     * @short Sets the current locale to be used with dates.
     * @extra Predefined locales are: English (en), French (fr), Italian (it), Spanish (es), Portuguese (pt), German (de), Russian (ru), Japanese (ja), Korean (ko), Simplified Chinese (zh-CN), and Traditional Chinese (zh-TW). In addition to available major locales, you can define a new local here by passing an object for [set]. For more see @date_format.
     *
     ***/
    'setLocale': function(code, set) {
      var loc = getLocalization(code, false, set);
      if(loc) {
        Date['currentLocale'] = code;
        checkLocaleFormatsAdded(loc);
        return loc;
      }
    },

     /***
     * @method Date.getLocale([code] = current)
     * @returns Locale
     * @short Gets the locale for the given code, or the current locale.
     * @extra Returns undefined if there is no locale for the given code. Manipulating the locale object can give you more control over date localizations. For more about locales, see @date_format.
     *
     ***/
    'getLocale': function(code) {
      return getLocalization(code, true);
    },

     /***
     * @method Date.addFormat(<format>, <match>, [locale] = null)
     * @returns Nothing
     * @short Manually adds a new date input format.
     * @extra This method allows fine grained control for alternate formats. <format> is a string that can have regex tokens inside. <match> is an array of the tokens that each regex capturing group will map to, for example %year%, %date%, etc. For more, see @date_format.
     *
     ***/
    'addFormat': function(format, match, locale, variant) {
      addDateInputFormat(format, match, locale, variant, 'unshift');
    }

  }, false, false);

  date.extend({

     /***
     * @method set(<set>, [reset] = false)
     * @returns Date
     * @short Sets the date object.
     * @extra This method can accept multiple formats including a single number as a timestamp, an object, or enumerated parameters (as with the Date constructor). If [reset] is %true%, any units more specific than those passed will be reset. %setUTC% will set the date according to universal time.
     * @example
     *
     *   new Date().set({ year: 2011, month: 11, day: 31 }) -> December 31, 2011
     *   new Date().set(2011, 11, 31)                       -> December 31, 2011
     *   new Date().set(86400000)                           -> 1 day after Jan 1, 1970
     *   new Date().set({ year: 2004, month: 6 }, true)     -> June 1, 2004, 00:00:00.000
     *
     ***/
    'set': function() {
      var args = collectDateArguments(arguments);
      return updateDate(this, args[0], args[1])
    },

     /***
     * @method setUTC()
     * @set set
     ***/
    'setUTC': function() {
      var args = collectDateArguments(arguments);
      return updateDate(this, args[0], args[1], true)
    },

     /***
     * @method setWeekday()
     * @returns Nothing
     * @short Sets the weekday of the date.
     * @extra %setUTCWeekday% sets according to universal time.
     * @example
     *
     *   d = new Date(); d.setWeekday(1); d; -> Monday of this week
     *   d = new Date(); d.setWeekday(6); d; -> Saturday of this week
     *
     ***/
    'setWeekday': function(dow) {
      if(isUndefined(dow)) return;
      this.setDate(this.getDate() + dow - this.getDay());
    },

     /***
     * @method setUTCWeekday()
     * @set setWeekday
     ***/
    'setUTCWeekday': function(dow) {
      if(isUndefined(dow)) return;
      this.setDate(this.getUTCDate() + dow - this.getDay());
    },

     /***
     * @method setWeek()
     * @returns Nothing
     * @short Sets the week (of the year).
     * @extra %setUTCWeek% sets according to universal time.
     * @example
     *
     *   d = new Date(); d.setWeek(15); d; -> 15th week of the year
     *
     ***/
    'setWeek': function(week) {
      if(isUndefined(week)) return;
      var date = this.getDate();
      this.setMonth(0);
      this.setDate((week * 7) + 1);
    },

     /***
     * @method setUTCWeek()
     * @set setWeek
     ***/
    'setUTCWeek': function(week) {
      if(isUndefined(week)) return;
      var date = this.getUTCDate();
      this.setMonth(0);
      this.setUTCDate((week * 7) + 1);
    },

     /***
     * @method getWeek()
     * @returns Number
     * @short Gets the date's week (of the year).
     * @extra %getUTCWeek% gets the time according to universal time.
     * @example
     *
     *   new Date().getWeek() -> today's week of the year
     *
     ***/
    'getWeek': function() {
      return getWeekNumber(this);
    },

     /***
     * @method getUTCWeek()
     * @set getWeek
     ***/
    'getUTCWeek': function() {
      return getWeekNumber(this.toUTC());
    },

     /***
     * @method getUTCOffset([iso])
     * @returns String
     * @short Returns a string representation of the offset from UTC time. If [iso] is true the offset will be in ISO8601 format.
     * @example
     *
     *   new Date().getUTCOffset()     -> "+0900"
     *   new Date().getUTCOffset(true) -> "+09:00"
     *
     ***/
    'getUTCOffset': function(iso) {
      var offset = this.utc ? 0 : this.getTimezoneOffset();
      var colon  = iso === true ? ':' : '';
      if(!offset && iso) return 'Z';
      return (-offset / 60).round().pad(2, true) + colon + (offset % 60).pad(2);
    },

     /***
     * @method toUTC()
     * @returns Date
     * @short Converts the date to UTC time, effectively subtracting the timezone offset.
     * @extra Note here that the method %getTimezoneOffset% will still show an offset even after this method is called, as this method effectively just rewinds the date. %format% however, will correctly set the %{tz}% (timezone) token as UTC once this method has been called on the date. Once a date is set to UTC the only way to unset is the %clone% method.
     * @example
     *
     *   new Date().toUTC() -> current time in UTC
     *
     ***/
    'toUTC': function() {
      if(this.utc) return this;
      var d = this.clone().addMinutes(this.getTimezoneOffset());
      d.utc = true;
      return d;
    },

     /***
     * @method isUTC()
     * @returns Boolean
     * @short Returns true if the date has no timezone offset.
     * @example
     *
     *   new Date().isUTC() -> true or false?
     *
     ***/
    'isUTC': function() {
      return this.utc || this.getTimezoneOffset() === 0;
    },

     /***
     * @method advance()
     * @returns Date
     * @short Sets the date forward.
     * @extra This method can accept multiple formats including a single number as a timestamp, an object, or enumerated parameters (as with the Date constructor). For more see @date_format.
     * @example
     *
     *   new Date().advance({ year: 2 }) -> 2 years in the future
     *   new Date().advance(0, 2, 3)     -> 2 months 3 days in the future
     *   new Date().advance(86400000)    -> 1 day in the future
     *
     ***/
    'advance': function(params) {
      var args = collectDateArguments(arguments);
      return updateDate(this, args[0], false, false, 1, true);
    },

     /***
     * @method rewind()
     * @returns Date
     * @short Sets the date back.
     * @extra This method can accept multiple formats including a single number as a timestamp, an object, or enumerated parameters (as with the Date constructor). For more see @date_format.
     * @example
     *
     *   new Date().rewind({ year: 2 }) -> 2 years in the past
     *   new Date().rewind(0, 2, 3)     -> 2 months 3 days in the past
     *   new Date().rewind(86400000)    -> 1 day in the past
     *
     ***/
    'rewind': function(params) {
      var args = collectDateArguments(arguments);
      return updateDate(this, args[0], false, false, -1);
    },

     /***
     * @method isValid()
     * @returns Boolean
     * @short Returns true if the date is valid.
     * @example
     *
     *   new Date().isValid()         -> true
     *   new Date('flexor').isValid() -> false
     *
     ***/
    'isValid': function() {
      return !isNaN(this.getTime());
    },

     /***
     * @method isAfter(<d>, [margin])
     * @returns Boolean
     * @short Returns true if the date is after the <d>.
     * @extra [margin] is to allow extra margin of error (in ms). <d> will accept a date object, timestamp, or text format. If not specified, <d> is assumed to be now. See @date_format for more information.
     * @example
     *
     *   new Date().isAfter('tomorrow')  -> false
     *   new Date().isAfter('yesterday') -> true
     *
     ***/
    'isAfter': function(d, margin) {
      return this.getTime() > date.create(d).getTime() - (margin || 0);
    },

     /***
     * @method isBefore(<d>, [margin])
     * @returns Boolean
     * @short Returns true if the date is before <d>.
     * @extra [margin] is to allow extra margin of error (in ms). <d> will accept a date object, timestamp, or text format. If not specified, <d> is assumed to be now. See @date_format for more information.
     * @example
     *
     *   new Date().isBefore('tomorrow')  -> true
     *   new Date().isBefore('yesterday') -> false
     *
     ***/
    'isBefore': function(d, margin) {
      return this.getTime() < date.create(d).getTime() + (margin || 0);
    },

     /***
     * @method isBetween(<d1>, <d2>, [buffer] = 0)
     * @returns Boolean
     * @short Returns true if the date falls between <d1> and <d2>.
     * @extra [buffer] is to allow extra buffer of error (in ms). <d1> and <d2> will accept a date object, timestamp, or text format. If not specified, they are assumed to be now. See @date_format for more information.
     * @example
     *
     *   new Date().isBetween('yesterday', 'tomorrow')    -> true
     *   new Date().isBetween('last year', '2 years ago') -> false
     *
     ***/
    'isBetween': function(d1, d2, buffer) {
      var t  = this.getTime();
      var t1 = date.create(d1).getTime();
      var t2 = date.create(d2).getTime();
      var lo = Math.min(t1, t2);
      var hi = Math.max(t1, t2);
      buffer = buffer || 0;
      return (lo - buffer < t) && (hi + buffer > t);
    },

     /***
     * @method isLeapYear()
     * @returns Boolean
     * @short Returns true if the date is a leap year.
     * @example
     *
     *   Date.create('2000').isLeapYear() -> true
     *
     ***/
    'isLeapYear': function() {
      var year = this.getFullYear();
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    },

     /***
     * @method daysInMonth()
     * @returns Number
     * @short Returns the number of days in the date's month.
     * @example
     *
     *   Date.create('May').daysInMonth()            -> 31
     *   Date.create('February, 2000').daysInMonth() -> 29
     *
     ***/
    'daysInMonth': function() {
      return 32 - new date(this.getFullYear(), this.getMonth(), 32).getDate();
    },

     /***
     * @method format(<format>, [locale] = currentLocale)
     * @returns String
     * @short Formats the date.
     * @extra <format> will accept a number of tokens as well as pre-determined formats. [locale] specifies a locale code to use (if not specified the current locale is used). If <format> is falsy, a default format for the locale is used. A function may also be passed here to allow more granular control. See @date_format for more details.
     * @example
     *
     *   Date.create().format()                                   -> ex. July 4, 2003
     *   Date.create().format('{Weekday} {d} {Month}, {yyyy}')    -> ex. Monday July 4, 2003
     *   Date.create().format('{hh}:{mm}')                        -> ex. 15:57
     *   Date.create().format('{12hr}:{mm}{tt}')                  -> ex. 3:57pm
     *   Date.create().format(Date.ISO8601_DATETIME)              -> ex. 2011-07-05 12:24:55.528Z
     *   Date.create('last week').format('', 'ja')                -> ex. 先週
     *   Date.create('yesterday').format(function(value,unit,ms,loc) {
     *     // value = 1, unit = 3, ms = -86400000, loc = [current locale object]
     *   });                                                      -> ex. 1 day ago
     *
     ***/
    'format': function(f, locale) {
      return formatDate(this, f, false, locale);
    },

     /***
     * @method relative([fn], [locale] = currentLocale)
     * @returns String
     * @short Returns a relative date string offset to the current time.
     * @extra [fn] can be passed to provide for more granular control over the resulting string. [fn] is passed 4 arguments: the adjusted value, unit, offset in milliseconds, and a localization object. As an alternate syntax, [locale] can also be passed as the first (and only) parameter. For more information, see @date_format.
     * @example
     *
     *   Date.create('90 seconds ago').relative() -> 1 minute ago
     *   Date.create('January').relative()        -> ex. 5 months ago
     *   Date.create('January').relative('ja')    -> 3ヶ月前
     *   Date.create('120 minutes ago').relative(function(val,unit,ms,loc) {
     *     // value = 2, unit = 3, ms = -7200, loc = [current locale object]
     *   });                                      -> ex. 5 months ago
     *
     ***/
    'relative': function(f, locale) {
      if(object.isString(f)) {
        locale = f;
        f = null;
      }
      return formatDate(this, f, true, locale);
    },

     /***
     * @method is(<d>, [margin])
     * @returns Boolean
     * @short Returns true if the date is <d>.
     * @extra <d> will accept a date object, timestamp, or text format. %is% additionally understands more generalized expressions like month/weekday names, 'today', etc, and compares to the precision implied in <d>. [margin] allows an extra margin of error in milliseconds.  For more information, see @date_format.
     * @example
     *
     *   Date.create().is('July')               -> true or false?
     *   Date.create().is('1776')               -> false
     *   Date.create().is('today')              -> true
     *   Date.create().is('weekday')            -> true or false?
     *   Date.create().is('July 4, 1776')       -> false
     *   Date.create().is(-6106093200000)       -> false
     *   Date.create().is(new Date(1776, 6, 4)) -> false
     *
     ***/
    'is': function(d, margin) {
      var tmp;
      if(object.isString(d)) {
        d = d.trim().toLowerCase();
        switch(true) {
          case d === 'future':  return this.getTime() > new date().getTime();
          case d === 'past':    return this.getTime() < new date().getTime();
          case d === 'weekday': return this.getDay() > 0 && this.getDay() < 6;
          case d === 'weekend': return this.getDay() === 0 || this.getDay() === 6;
          case (tmp = English['weekdays'].indexOf(d) % 7) > -1: return this.getDay() === tmp;
          case (tmp = English['months'].indexOf(d) % 12) > -1:  return this.getMonth() === tmp;
        }
      }
      return compareDate(this, d, margin);
    },

     /***
     * @method resetTime()
     * @returns Date
     * @short Resets the time in the date to 00:00:00.000.
     * @example
     *
     *   Date.create().resetTime()  -> Beginning of today
     *
     ***/
    'resetTime': function() {
      return this.set({ 'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0 });
    },

     /***
     * @method clone()
     * @returns Date
     * @short Clones the date.
     * @example
     *
     *   Date.create().clone() -> Copy of now
     *
     ***/
    'clone': function() {
      return new date(this.getTime());
    }

  });


  // Instance aliases
  date.extend({

     /***
     * @method iso()
     * @alias toISOString
     *
     ***/
    'iso': function() {
      return this.toISOString();
    },

     /***
     * @method getWeekday()
     * @alias getDay
     *
     ***/
    'getWeekday':    date.prototype.getDay,

     /***
     * @method getUTCWeekday()
     * @alias getUTCDay
     *
     ***/
    'getUTCWeekday':    date.prototype.getUTCDay

  });



  /***
   * Number module
   *
   ***/

  number.extend({

     /***
     * @method duration([locale] = currentLocale)
     * @returns String
     * @short Takes the number as milliseconds and returns a unit-adjusted localized string.
     * @extra This method is the same as %Date#relative% without the localized equivalent of "from now" or "ago". [locale] can be passed as the first (and only) parameter. Note that this method is only available when the dates package is included.
     * @example
     *
     *   (500).duration() -> '500 milliseconds'
     *   (1200).duration() -> '1 second'
     *   (75).minutes().duration() -> '1 hour'
     *   (75).minutes().duration('es') -> '1 hora'
     *
     ***/
    'duration': function(code) {
      return Date.getLocale(code).duration(this);
    }

  });

  buildDate();

})();
