// Google Closure Compiler will output a wrapping function here.
(function() {

  // A few optimizations for Google Closure Compiler will save us a couple kb in the release script.
  var object = Object, array = Array, regexp = RegExp, date = Date, string = String, number = Number, Undefined, English;

  // defineProperty exists in IE8 but will error when trying to define a property on
  // native objects. IE8 does not have defineProperies, however, so this check saves a try/catch block.
  var definePropertySupport = object.defineProperty && object.defineProperties;

  function extend(klass, instance, override, methods) {
    var extendee = instance ? klass.prototype : klass;
    iterateOverObject(methods, function(name, method) {
      if(typeof override === 'function') {
        defineProperty(extendee, name, wrapNative(extendee[name], method, override));
      } else if(override === true || !extendee[name]) {
        defineProperty(extendee, name, method);
      }
    });
  }

  function wrapNative(nativeFn, extendedFn, condition) {
    return function() {
      if(nativeFn && (condition === true || condition.apply(this, arguments))) {
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

  function multiMatch(el, match, scope, params) {
    if(el === match) {
      // Match strictly equal values up front.
      return true;
    } else if(object.isRegExp(match)) {
      // Match against a regexp
      return regexp(match).test(el);
    } else if(object.isFunction(match)) {
      // Match against a filtering function
      return match.apply(scope, [el].concat(params));
    } else {
      // Match against a hash or array.
      return object.equal(match, el);
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
    arrayEach(args, fn, index);
  }

  /***
   * Object module
   *
   * Much thanks to kangax for his informative aricle about how problems with instanceof and constructor
   * http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
   *
   ***/

  function instanceOf(obj, str) {
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
        if(isDefined(prop)) target[key] = prop;
      });
    }
    return target;
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
        return instanceOf(obj, type);
      }
    });
    extend(Object, false, false, methods);
  }

  function buildObject() {
    buildTypeMethods();
  }

  extend(object, false, false, {

    /***
     * @method isObject()
     * @set isType
     ***/
    'isObject': function(obj) {
      if(isNull(obj) || isUndefined(obj)) {
        return false;
      } else {
        return instanceOf(obj, 'Object') && obj.constructor === object;
      }
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
    }

  });






  /***
   * Array module
   *
   ***/



  // Basic array internal methods

  function arrayEach(arr, fn, startIndex, loop) {
    var length, index, i;
    checkCallback(fn);
    if(startIndex < 0) startIndex = arr.length + startIndex;
    i = toIntegerWithDefault(startIndex, 0);
    length = loop === true ? arr.length + i : arr.length;
    while(i < length) {
      index = i % arr.length;
      if(fn.call(arr, arr[index], index, arr) === false) {
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

  extend(array, true, function() { var a = arguments; return a.length === 0 || object.isFunction(a[0]); }, {

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
      var arr = this, result = {}, key;
      arrayEach(arr, function(el, index) {
        key = transformArgument(el, map, arr, [el, index, arr]);
        if(!result[key]) result[key] = [];
        result[key].push(el);
      });
      return object.each(result, fn);
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
    }


  });





  /***
   * Number module
   *
   ***/


  function round(val, precision, method) {
    var fn = Math[method || 'round'];
    var multiplier = Math.abs(Math.pow(10, (precision || 0)));
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
      var suffix;
      if(this >= 11 && this <= 13) {
        suffix = 'th';
      } else {
        switch(this % 10) {
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
    }

  });


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
    var add    = 'add' + unit.capitalize() + 's';
    function base() { return round(this * multiplier); }
    function after() { return createDate(arguments)[add](this);  }
    function before() { return createDate(arguments)[add](-this); }
    defineProperty(number.prototype, unit, base);
    defineProperty(number.prototype, unit + 's', base);
    defineProperty(number.prototype, unit + 'Before', before);
    defineProperty(number.prototype, unit + 'sBefore', before);
    defineProperty(number.prototype, unit + 'Ago', before);
    defineProperty(number.prototype, unit + 'sAgo', before);
    defineProperty(number.prototype, unit + 'After', after);
    defineProperty(number.prototype, unit + 'sAfter', after);
    defineProperty(number.prototype, unit + 'FromNow', after);
    defineProperty(number.prototype, unit + 'sFromNow', after);
  }




  /***
   * String module
   *
   ***/


  // WhiteSpace/LineTerminator as defined in ES5.1 plus Unicode characters in the Space, Separator category.
  var getTrimmableCharacters = function() {
    return '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
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
    buildTrim();
  }

  extend(string, true, false, {

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
      return createDate([this.toString(), locale]);
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
      var assign = {};
      multiArgs(arguments, function(a, i) {
        if(object.isObject(a)) {
          object.merge(assign, a);
        } else {
          assign[i + 1] = a;
        }
      });
      return this.replace(/\{(.+?)\}/g, function(m, key) {
        return assign.hasOwnProperty(key) ? assign[key] : m;
      });
    }

  });




  /***
   * Date module
   *
   ***/

  var TimeFormat = ['hour','minute','second','millisecond','meridian','utc','offset_sign','offset_hours','offset_minutes']
  var RequiredTime = '(\\d{1,2}):?(\\d{2})?:?(\\d{2})?(?:\\.(\\d{1,6}))?(am|pm)?(?:(Z)|(?:([+-])(\\d{2})(?::?(\\d{2}))?)?)?';
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
    var addFormat = date.addFormat, code = loc['code'];
    if(loc.formatsAdded) return;
    addDateInputFormat('(' + loc['months'].compact().join('|') + ')', ['month'], code);
    addDateInputFormat('(' + loc['weekdays'].compact().join('|') + ')', ['weekday'], code);
    addDateInputFormat('(' + loc['modifiers'].filter(function(m){ return m.name === 'day'; }).map('src').join('|') + ')', ['day'], code);
    arrayEach(loc['formats'], function(src) {
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
    if(code && !Localizations[code]) initializeLocalization(code, set);
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
      return arrayEach(str.split('|'), fn);
    }

    function setArray(name, abbreviate, multiple) {
      var arr = [];
      if(!set[name]) return;
      arrayEach(set[name], function(el, i) {
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
      arrayEach(set['modifiers'], function(modifier) {
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
      set['months'] = getRange(1, 12, null, 1).map(function(n) { return n + set['monthSuffix']; });
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
    arrayEach(['months','weekdays','units','numbers','articles','optionals','formats'], function(name, i) {
      set[name] = pre[i + 2] ? pre[i + 2].split(',') : [];
    });
    set['outputFormat'] = pre[9];
    arrayEach(['day','sign','shift','edge'], function(name, i) {
      if(!pre[i + 10]) return;
      arrayEach(pre[i + 10].split(','),  function(t, j) {
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

  extend(Localization, true, false, {

    getMonth: function(n) {
      if(object.isNumber(n)) {
        return n - 1;
      } else {
        return arrayFind(this['months'], regexp(n, 'i'), 0, false, true) % 12;
      }
    },

    getWeekday: function(n) {
      return arrayFind(this['weekdays'], regexp(n, 'i'), 0, false, true) % 7;
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
      return n.replace(this['numbers'][9], '').replace(/./g, function(d) {
        return self.getNumber(d);
      });
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
        last = num.toString().slice(-1);
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
      sign = arrayFind(this['modifiers'], function(m) { return m.name == 'sign' && m.value == (ms > 0 ? 1 : -1); });
      return this[format].assign({ 'num': num, 'unit': unit, 'sign': sign.src });
    },

    addFormat: function(src, code, add) {
      var to = [], loc = this;
      if(add !== false) loc['formats'].push(src);
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
    if(isObjectPrimitive(args[0])) {
      return args;
    } else if (args.length == 1 && object.isNumber(args[0])) {
      return [args[0]];
    }
    obj = {};
    arrayEach(DateArgumentUnits, function(u,i) {
      obj[u.unit] = args[i];
    });
    return [obj];
  }

  function convertAsianDigits(str, key) {
    str = str.replace(/[１２３４５６７８９０]/g, function(d) {
      return String.fromCharCode(d.charCodeAt(0) - 65248);
    });
    if(key != 'date' && key != 'month' && key != 'year') return str;
    return str.replace(AsianDigitReg, function(d) {
      var index = LowerAsianDigits.indexOf(d);
      return (index + 1) || '';
    });
  }

  function getFormatMatch(match, arr) {
    var obj = {}, value, num;
    arrayEach(arr, function(key, i) {
      value = match[i + 1];
      if(isUndefined(value) || value === '') return;
      value = convertAsianDigits(value, key);
      if(key === 'year') obj.yearAsString = value;
      if(key === 'millisecond') value = value * Math.pow(10, 3 - value.length);
      num = parseFloat(value);
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
      arrayEach(DateInputFormats, function(dif) {
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
          if(set['offset_hours'] || set['offset_minutes']) {
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
        arrayEach(DateUnitsReversed.slice(4), function(u) {
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
    arrayEach(DateOutputFormats, function(dof) {
      f = f.replace(regexp('\\{('+dof.token+')(\\d)?\\}', dof.word ? 'i' : ''), function(m,t,d) {
        var val = dof.format(date, loc, d || 1, t), l = t.length, one = t.match(/^(.)\1+$/);
        if(dof.word) {
          if(l === 3) val = val.slice(0, 3);
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
      arrayEach(DateUnits, function(u, i) {
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
      max -= date['DSTOffset'];
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
    arrayEach(DateUnitsReversed, function(u) {
      if(isDefined(params[u.unit]) || isDefined(params[u.unit + 's'])) {
        params.specificity = u.unit;
        return false;
      } else if(reset && u.unit !== 'week' && u.unit !== 'year') {
        callDateMethod(date, 'set', utc, u.method, (u.unit === 'day') ? 1 : 0);
      }
    });
    // Now actually set or advance the date in order, higher units first.
    arrayEach(DateUnits, function(u,i) {
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
    return round(new date().getFullYear() / 100) * 100 - round(year / 100) * 100 + year;
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
    var next, ams = Math.abs(ms), value = ams, unit = 0;
    arrayEach(DateUnitsReversed.slice(1), function(u, i) {
      next = round(ams / u.multiplier(), 1) | 0;
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
    arrayEach(DateUnits, function(u, i) {
      var unit = u.unit;
      var caps = unit.capitalize();
      var multiplier = u.multiplier();
      defineProperty(date.prototype, unit+'sSince', function(f, code) {
        return round((this.getTime() - date.create(f, code).getTime()) / multiplier);
      });
      defineProperty(date.prototype, unit+'sUntil', function(f, code) {
        return round((date.create(f, code).getTime() - this.getTime()) / multiplier);
      });
      defineProperty(date.prototype, unit+'sAgo', date.prototype[unit+'sUntil']);
      defineProperty(date.prototype, unit+'sFromNow', date.prototype[unit+'sSince']);
      defineProperty(date.prototype, 'add'+caps+'s', function(num) {
        var set = {};
        set[unit] = num;
        return this.advance(set);
      });
      buildNumberToDateAlias(unit, multiplier);
      if(i < 3) {
        arrayEach(['Last','This','Next'], function(shift) {
          defineProperty(date.prototype, 'is' + shift + caps, function() {
            return this.is(shift + ' ' + unit);
          });
        });
      }
      if(i < 4) {
        defineProperty(date.prototype, 'beginningOf' + caps, function() {
          var set = {};
          switch(unit) {
            case 'year':  set['year'] = this.getFullYear(); break;
            case 'month': set['month'] = this.getMonth(); break;
            case 'day':   set['day'] = this.getDate(); break;
            case 'week':  set['weekday'] = 0; break;
          }
          return this.set(set, true);
        });
        defineProperty(date.prototype, 'endOf' + caps, function() {
          var set = { 'hours': 23, 'minutes': 59, 'seconds': 59, 'milliseconds': 999 };
          switch(unit) {
            case 'year':  set['month'] = 11; set['day'] = 31; break;
            case 'month': set['day'] = this.daysInMonth(); break;
            case 'week':  set['weekday'] = 6; break;
          }
          return this.set(set, true);
        });
      }
    });
  }

  function buildDateInputFormats() {
    DateArgumentUnits = DateUnits.concat();
    DateArgumentUnits.splice(2, 1);
    DateUnitsReversed = DateUnits.concat().reverse();
    var monthReg = '\\d{1,2}|' + English['months'].join('|');
    arrayEach(StaticInputFormats, function(f) {
      date.addFormat(f.src.replace(/\{month\}/, monthReg) + (f.time === false ? '' : OptionalTime), f.to.concat(TimeFormat), 'en', f.variant);
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
    var weekdays = English['weekdays'].slice(0,7);
    var months = English['months'].slice(0,12);
    arrayEach(['today','yesterday','tomorrow','weekday','weekend','future','past'].concat(weekdays).concat(months), function(s) {
      defineProperty(date.prototype, 'is'+ s.capitalize(), function() {
        return this.is(s);
      });
    });
  }

  function setDateProperties() {
    extend(date, false, true, {
      'DSTOffset': (new date(2000, 6, 1).getTimezoneOffset() - new date(2000, 0, 1).getTimezoneOffset()) * 60 * 1000,
      'INTERNATIONAL_TIME': '{h}:{mm}:{ss}',
      'RFC1123': '{Dow}, {dd} {Mon} {yyyy} {HH}:{mm}:{ss} {tz}',
      'RFC1036': '{Weekday}, {dd}-{Mon}-{yy} {HH}:{mm}:{ss} {tz}',
      'ISO8601_DATE': '{yyyy}-{MM}-{dd}',
      'ISO8601_DATETIME': '{yyyy}-{MM}-{dd}T{HH}:{mm}:{ss}.{fff}{isotz}'
    });
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
      extend(date, true, true, methods);
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

  extend(date, false, false, {

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
     * @returns String
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

     /*
     * Hiding this from the API docs for now...
     * @method Date.getLocale([code] = currentLocale)
     * @returns String
     * @short Gets a localization object for [code], or the current locale.
     * @extra Manipulating the localization can give you more control over date localizations. For more see @date_format.
     *
     */
    'getLocale': function(code) {
      return getLocalization(code, true);
    },

    /* Let's not document this one for now... */
    'addFormat': function(format, match, locale, variant) {
      addDateInputFormat(format, match, locale, variant, 'unshift');
    }

  });

  extend(date, true, false, {

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
      return round(-offset / 60).pad(2, true) + colon + (offset % 60).pad(2);
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
  extend(date, true, false, {

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


  extend(number, true, false, {

     /***
     * @method duration([locale] = currentLocale)
     * @returns String
     * @short Takes the number as milliseconds and returns a unit-adjusted localized string.
     * @extra This method is the same as %Date#relative% without the localized equivalent of "from now" or "ago". [locale] c
     * @example
     *
     *   (500).duration() -> '500 milliseconds'
     *   (1200).duration() -> '1 second'
     *   (75).minutes().duration() -> '1 hour'
     *   (75).minutes().duration('es') -> '1 hora'
     *
     ***/
    'duration': function(code) {
      return date.getLocale(code).duration(this);
    }

  });


  // Initialize
  buildObject();
  buildString();
  buildDate();

})();
