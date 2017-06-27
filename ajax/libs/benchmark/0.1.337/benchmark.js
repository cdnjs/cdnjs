/*!
 * benchmark.js
 * Copyright Mathias Bynens <http://mths.be/>
 * Based on JSLitmus.js, copyright Robert Kieffer <http://broofa.com/>
 * Modified by John-David Dalton <http://allyoucanleet.com/>
 * Available under MIT license <http://mths.be/mit>
 */

(function(window) {

  /** Detect DOM0 timeout API (performed at the bottom) */
  var HAS_TIMEOUT_API,

  /** Detect HTML5 web storage */
  HAS_STORAGE = isHostType(window, 'localStorage') &&
    isHostType(localStorage, 'removeItem'),

  /** Detect Java environment */
  IN_JAVA = isHostType(window, 'java') &&
    !isHostType(window, 'netscape'),

  /** Used to integrity check compiled tests */
  EMBEDDED_UID = +new Date,

  /** Unit of the timer */
  TIMER_UNIT = 'ms',

  /** Used to avoid hz of Infinity */
  CYCLE_DIVISORS = {
    '1': 4096,
    '2': 512,
    '3': 64,
    '4': 8,
    '5': 0
  },

  /**
   * T-Distribution critical values for 95% confidence
   * http://www.itl.nist.gov/div898/handbook/eda/section3/eda3672.htm
   */
  T_DISTRIBUTION = {
    '1':  12.706,'2':  4.303, '3':  3.182, '4':  2.776, '5':  2.571, '6':  2.447,
    '7':  2.365, '8':  2.306, '9':  2.262, '10': 2.228, '11': 2.201, '12': 2.179,
    '13': 2.160, '14': 2.145, '15': 2.131, '16': 2.120, '17': 2.110, '18': 2.101,
    '19': 2.093, '20': 2.086, '21': 2.080, '22': 2.074, '23': 2.069, '24': 2.064,
    '25': 2.060, '26': 2.056, '27': 2.052, '28': 2.048, '29': 2.045, '30': 2.042,
    '31': 2.040, '32': 2.037, '33': 2.035, '34': 2.032, '35': 2.030, '36': 2.028,
    '37': 2.026, '38': 2.024, '39': 2.023, '40': 2.021, '41': 2.020, '42': 2.018,
    '43': 2.017, '44': 2.015, '45': 2.014, '46': 2.013, '47': 2.012, '48': 2.011,
    '49': 2.010, '50': 2.009, '51': 2.008, '52': 2.007, '53': 2.006, '54': 2.005,
    '55': 2.004, '56': 2.003, '57': 2.002, '58': 2.002, '59': 2.001, '60': 2.000,
    '61': 2.000, '62': 1.999, '63': 1.998, '64': 1.998, '65': 1.997, '66': 1.997,
    '67': 1.996, '68': 1.995, '69': 1.995, '70': 1.994, '71': 1.994, '72': 1.993,
    '73': 1.993, '74': 1.993, '75': 1.992, '76': 1.992, '77': 1.991, '78': 1.991,
    '79': 1.990, '80': 1.990, '81': 1.990, '82': 1.989, '83': 1.989, '84': 1.989,
    '85': 1.988, '86': 1.988, '87': 1.988, '88': 1.987, '89': 1.987, '90': 1.987,
    '91': 1.986, '92': 1.986, '93': 1.986, '94': 1.986, '95': 1.985, '96': 1.985,
    '97': 1.985, '98': 1.984, '99': 1.984, '100': 1.984,'Infinity': 1.960
  },

  /** Internal cached used by various methods */
  cache = {
    'counter': 0
  },

  /** Used in Benchmark.hasKey() */
  hasOwnProperty = cache.hasOwnProperty,

  /** Used to convert array-like objects to arrays */
  slice = [].slice;

  /*--------------------------------------------------------------------------*/

  /**
   * Benchmark constructor.
   * @constructor
   * @param {Function} fn The test to benchmark.
   * @param {Object} [options={}] Options object.
   * @example
   *
   * // basic usage
   * var bench = new Benchmark(fn);
   *
   * // with options
   * var bench = new Benchmark(fn, {
   *
   *   // name used by Benchmark#toString to identify a benchmark.
   *   "name": "apples",
   *
   *   // id, displayed by Benchmark#toString if `name` is not available
   *   "id": "a1",
   *
   *   // called when the benchmark starts
   *   "onStart": onStart,
   *
   *   // called after each run cycle
   *   "onCycle": onCycle,
   *
   *   // called when aborted
   *   "onAbort": onAbort,
   *
   *   // called when a test errors
   *   "onError": onError,
   *
   *   // called when reset
   *   "onReset": onReset,
   *
   *   // called when benchmark is complete
   *   "onComplete": onComplete
   * });
   */
  function Benchmark(fn, options) {
    var me = this;
    fn.uid || (fn.uid = ++cache.counter);
    options = extend({ }, options);

    forIn(options, function(value, key) {
      // add event listeners
      if (/^on[A-Z]/.test(key)) {
        me.on(key.slice(2).toLowerCase(), value);
      } else {
        me[key] = value;
      }
    });

    me.fn = fn;
    me.created = +new Date;
    me.options = options;
    me.times = extend({ }, me.times);
  }

  /**
   * Subclass of Benchmark used specifically for calibration.
   * @private
   * @constructor
   * @base Benchmark
   * @param {Function} fn The test to benchmark.
   * @param {Object} [options={}] Options object.
   */
  function Calibration(fn, options) {
    Benchmark.call(this, fn, options);
  }

  // Calibration inherits from Benchmark
  (function() {
    function Klass() { }
    Klass.prototype = Benchmark.prototype;
    (Calibration.prototype = new Klass).constructor = Calibration;
  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Runs calibration benchmarks, if needed, and fires a callback when completed.
   * @private
   * @param {Object} me The benchmark instance waiting for calibrations to complete.
   * @param {Function} callback Function executed after calibration.
   * @param {Boolean} [async=false] Flag to run asynchronously.
   * @returns {Boolean} Returns true if calibrated, else false.
   */
  function calibrate(me, callback, async) {
    var result = isCalibrated(),
        onCycle = function(cal) { return !(cal.aborted || me.aborted); };

    // calibrate all if one has not ran
    if (!result) {
      invoke(Benchmark.CALIBRATIONS, {
        'async': async,
        'methodName': 'run',
        'onCycle': onCycle,
        'onComplete': callback
      });
      // synchronous calibrations have now completed
      if (!async) {
        result = true;
      }
    }
    return result;
  }

  /**
   * Executes a function asynchronously or synchronously.
   * @private
   * @param {Object} me The benchmark instance passed to `fn`.
   * @param {Function} fn Function to be executed.
   * @param {Boolean} [async=false] Flag to run asynchronously.
   */
  function call(me, fn, async) {
    // only attempt asynchronous calls if supported
    if (async && HAS_TIMEOUT_API) {
      me.timerId = setTimeout(function() {
        delete me.timerId;
        fn(me, async);
      }, me.CYCLE_DELAY * 1e3);
    }
    else {
      fn(me);
    }
  }

  /**
   * Clocks the time taken to execute a test per cycle (secs).
   * @private
   * @param {Object} me The benchmark instance.
   * @returns {Number} The time taken.
   */
  function clock() {
    clock = function(me) {
      var body,
          embedded,
          result,
          fn = me.fn,
          compilable = fn.compilable,
          count = me.count;

      if (compilable == null || compilable) {
        try {
          // extract test body
          body = (String(fn).match(/^[^{]+{([\s\S]*)}\s*$/) || 0)[1];
          // compile while-loop using extracted body
          embedded = Function(args, code[0] + body + code[1]);

          if (compilable == null) {
            // determine if compiled code is exited early, usually by a rogue
            // return statement, by checking for a return object with the uid
            me.count = 1;
            compilable = fn.compilable = embedded(me, timerNS).uid == EMBEDDED_UID;
            me.count = count;
          }
          if (compilable) {
            result = embedded(me, timerNS).time;
          }
        } catch(e) {
          me.count = count;
          compilable = fn.compilable = false;
        }
      }
      // fallback to simple while-loop when compilable is false
      if (!compilable) {
        result = fallback(me, timerNS).time;
      }
      // smells like Infinity?
      return me.DETECT_INFINITY &&
        Math.min(timerRes, result) / Math.max(timerRes, result) > 0.9 ? 0 : result;
    };

    function getRes(unit) {
      var measured,
          start,
          count = 50,
          divisor = 1e3,
          size = count,
          sum = 0;

      // get average smallest measurable time
      while (count--) {
        if (unit == 'us') {
          divisor = 1e6;
          timerNS.start();
          while(!(measured = timerNS.microseconds()));
        }
        else if (unit == 'ns') {
          divisor = 1e9;
          start = timerNS.nanoTime();
          while(!(measured = timerNS.nanoTime() - start));
        }
        else {
          start = +new timerNS;
          while(!(measured = +new timerNS - start));
        }
        // check for broken timers (nanoTime may have issues)
        // http://alivebutsleepy.srnet.cz/unreliable-system-nanotime/
        if (measured < 0) {
          sum = Infinity;
          break;
        } else {
          sum += measured;
        }
      }
      // convert average to seconds
      return sum / size / divisor;
    }

    var args,
        fallback,
        timerNS,
        timerRes,
        min = 0.0015,
        proto = Benchmark.prototype,
        code = 'var r$,i$=m$.count,f$=m$.fn,#{start};while(i$--){|}#{end};return{time:r$,uid:"$"}|f$()|m$,n$';

    // detect nanosecond support:
    // Java System.nanoTime()
    // http://download.oracle.com/javase/6/docs/api/java/lang/System.html#nanoTime()
    try {
      timerNS = java.lang.System;
    } catch(e) {
      each(window.document && document.applets || [], function(applet) {
        try {
          // use non-element to avoid issues with libs that augment them
          timerNS || (timerNS = 'nanoTime' in applet && new applet.Packages.nano);
        } catch(e) { }
      });
    }
    try {
      // check type in case Safari returns an object instead of a number
      timerNS  = typeof timerNS.nanoTime() == 'number' && timerNS;
      timerRes = getRes('ns');
      timerNS  = timerRes <= min && timerNS;
      TIMER_UNIT = 'ns';
    } catch(e) { }

    // detect microsecond support:
    // enable benchmarking via the --enable-benchmarking flag
    // in at least Chrome 7 to use chrome.Interval
    if (!timerNS) {
      try {
        timerNS  = new (window.chrome || window.chromium).Interval;
        timerRes = getRes('us');
        timerNS  = timerRes <= min && timerNS;
        TIMER_UNIT = 'us';
      } catch(e) { }
    }
    // else milliseconds
    if (!timerNS) {
      timerNS = Date;
      timerRes = getRes('ms');
      TIMER_UNIT = 'ms';
    }
    // error if there are no working timers
    if (timerRes == Infinity) {
      throw new Error('Benchmark.js was unable to find a working timer.');
    }

    // use API of chosen timer
    if (TIMER_UNIT == 'ns') {
      code = interpolate(code, {
        'start': 's$=n$.nanoTime()',
        'end': 'r$=(n$.nanoTime()-s$)/1e9'
      });
    }
    else if (TIMER_UNIT == 'us') {
      code = interpolate(code, {
        'start': 's$=n$.start()',
        'end': 'r$=n$.microseconds()/1e6'
      });
    }
    else {
      code = interpolate(code, {
        'start': 's$=(new n$).getTime()',
        'end': 'r$=((new n$).getTime()-s$)/1e3'
      });
    }
    // inject uid into variable names to avoid collisions with
    // embedded tests and create non-embedding fallback
    code = code.replace(/\$/g, EMBEDDED_UID).split('|');
    args = code.pop();
    fallback = Function(args, code[0] + code.pop() + code[1]);

    // resolve time to achieve a percent uncertainty of 1%
    proto.MIN_TIME || (proto.MIN_TIME = timerRes / 2 / 0.01);
    return clock.apply(null, arguments);
  }

  /**
   * Gets the storage key of the benchmark.
   * @private
   * @param {Object} me The benchmark instance.
   * @returns {String} The storage key.
   */
  function getStoreKey(me) {
    return ['benchmark.js', TIMER_UNIT, me.fn.uid, Benchmark.platform].join(':');
  }

  /**
   * Records benchmark results to local storage.
   * @private
   * @param {Object} me The benchmark instance.
   */
  function store(me) {
    if (HAS_STORAGE) {
      localStorage[getStoreKey(me)] =
        join(reduce([me, me.times], function(record, object) {
          forIn(object, function(value, key) {
            // record properties with numeric values
            if (isClassOf(value, 'Number') && /^(?:MoE|RME|SD|SEM|[^A-Z]+)$/.test(key)) {
              record[key] = value;
            }
          });
          return record;
        }, { }));
    }
  }

  /**
   * Restores recorded benchmark results.
   * @private
   * @param {Object} me The benchmark instance.
   * @returns {Boolean} Returns true if results were restored, else false
   */
  function restore(me) {
    var data,
        key = getStoreKey(me),
        persist = me.persist,
        expires = isClassOf(persist, 'Number') ? persist * 864e5 : Infinity;

    if (HAS_STORAGE) {
      // load data and ensure it hasn't expired
      data = (data = localStorage[key]) &&
        +new Date - (/created: (\d+)/.exec(data) || 0)[1] < expires && data;

      // copy persisted values to benchmark
      each(data && data.split(',') || [], function(pair) {
        pair = pair.split(': ');
        (/^(?:cycle|elapsed|period|start|stop)$/.test(pair[0]) ? me.times : me)[pair[0]] = +pair[1];
      });
    }
    return !!data;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Removes all benchmark data from local storage.
   * @static
   * @member Benchmark
   */
  function clearStorage() {
    if (HAS_STORAGE) {
      forIn(localStorage, function(value, key, object) {
        if (!key.indexOf('benchmark.js:')) {
          object.removeItem(key);
        }
      });
    }
  }

  /**
   * A generic bare-bones `Array#forEach` solution.
   * Callbacks may terminate the loop by explicitly returning `false`.
   * @static
   * @member Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   */
  function each(array, callback) {
    var i = -1,
        length = array.length;

    while (++i < length) {
      if (i in array && callback(array[i], i, array) === false) {
        break;
      }
    }
  }

  /**
   * Copies source properties to the destination object.
   * @static
   * @member Benchmark
   * @param {Object} destination The destination object.
   * @param {Object} [source={}] The source object.
   * @returns {Object} The destination object.
   */
  function extend(destination, source) {
    forIn(source || { }, function(value, key) {
      destination[key] = value;
    });
    return destination;
  }

  /**
   * A generic bare-bones `Array#filter` solution.
   * @static
   * @member Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Array} A new array of values that passed callback filter.
   */
  function filter(array, callback) {
    return reduce(array, function(result, value, index) {
      return callback(value, index, array) ? result.push(value) && result : result;
    }, []);
  }

  /**
   * A generic bare-bones for-in solution for an object's own properties.
   * @static
   * @member Benchmark
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */
  function forIn(object, callback) {
    for (var key in object) {
      if (hasKey(object, key) && callback(object[key], key, object) === false) {
        break;
      }
    }
  }

  /**
   * Converts a number to a more readable comma-separated string representation.
   * @static
   * @member Benchmark
   * @param {Number} number The number to convert.
   * @returns {String} The more readable string representation.
   */
  function formatNumber(number) {
    var comma = ',',
        string = String(Math.max(0, Math.abs(number).toFixed(0))),
        length = string.length,
        end = /^\d{4,}$/.test(string) ? length % 3 : 0;

    return (end ? string.slice(0, end) + comma : '') +
      string.slice(end).replace(/(\d{3})(?=\d)/g, '$1' + comma);
  }

  /**
   * Checks if an object has the specified key as a direct property.
   * @static
   * @member Benchmark
   * @param {Object} object The object to check.
   * @param {String} key The key to check for.
   * @returns {Boolean} Returns true if key is a direct property, else false.
   */
  function hasKey(object, key) {
    var result,
        parent = (object.constructor || Object).prototype;

    // for modern browsers
    object = Object(object);
    if (typeof hasOwnProperty == 'function') {
      result = hasOwnProperty.call(object, key);
    }
    // for Safari 2
    else if (cache.__proto__ == Object.prototype) {
      object.__proto__ = [object.__proto__, object.__proto__ = null, result = key in object][0];
    }
    // for others (not as accurate)
    else {
      result = key in object &&
        !(key in parent && object[key] === parent[key]);
    }
    return result;
  }

  /**
   * A generic bare-bones `Array#indexOf` solution.
   * @static
   * @member Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Mixed} value The value to search for.
   * @returns {Number} The index of the matched value or -1.
   */
  function indexOf(array, value) {
    var result = -1;
    each(array, function(v, i) {
      if (v === value) {
        result = i;
        return false;
      }
    });
    return result;
  }

  /**
   * Invokes a given method, with arguments, on all benchmarks in an array.
   * @static
   * @member Benchmark
   * @param {Array} benches Array of benchmarks to iterate over.
   * @param {String|Object} methodName Name of method to invoke or options object.
   * @param {Mixed} args Arguments to invoke the method with.
   * @example
   *
   * // invoke `reset` on all benchmarks
   * Benchmark.invoke(benches, "reset");
   *
   * // invoke `emit` with arguments
   * Benchmark.invoke(benches, "emit", ["complete", b, c]);
   *
   * // invoke `run(true)`, treat benchmarks as a queue, and register invoke callbacks
   * Benchmark.invoke(benches, {
   *
   *   // invoke the `run` method
   *   "methodName": "run",
   *
   *   // pass a single argument
   *   "args": true,
   *
   *   // treat as queue, removing benchmarks from front of `benches` until empty
   *   "queued": true,
   *
   *   // called between invoking benchmarks
   *   "onCycle": onCycle,
   *
   *   // called after all benchmarks have been invoked.
   *   "onComplete": onComplete
   * });
   */
  function invoke(benches, methodName, args) {
    var async,
        bench,
        queued,
        i = 0,
        length = benches.length,
        options = { 'onComplete': noop, 'onCycle': noop };

    function onInvoke(me) {
      var listeners;

      // insert invoke's "complete" listener before others so it's executed first
      if (async) {
        me.on('complete', onComplete);
        listeners = me.events['complete'];
        listeners.splice(0, 0, listeners.pop());
      }
      // execute method
      me[methodName].apply(me, args || []);
      // if synchronous return next benchmark after completing the current
      return !async && onComplete(me);
    }

    function onComplete(me) {
      var next;

      // remove invoke's "complete" listener and call the rest
      if (async) {
        me.removeListener('complete', onComplete);
        me.emit('complete');
      }
      // choose next benchmark if not exiting early
      if (options.onCycle(me) !== false) {
        if (queued) {
          next = benches.shift();
        } else if (++i < length) {
          next = benches[i];
        }
      }
      if (next) {
        if (async) {
          call(next, onInvoke, async);
        } else {
          return next;
        }
      } else {
        options.onComplete(me);
      }
      // when async the `return false` will cancel the rest of the "complete"
      // listeners because they were called above and when synchronous it will
      // end the while-loop
      return false;
    }

    if (typeof methodName == 'string') {
      args = isArray(args || (args = [])) ? args : [args];
    }
    else {
      // juggle arguments
      options = extend(options, methodName);
      methodName = options.methodName;
      args = isArray(args = options.args || []) ? args : [args];
      queued = options.queued;

      // for use with Benchmark#run only
      if ('async' in options) {
        async = options.async;
      } else if (isClassOf(args[0], 'Boolean')) {
        async = args[0];
      }
      async = (async == null ? Benchmark.prototype.DEFAULT_ASYNC :
        async) && HAS_TIMEOUT_API;
    }

    // start iterating over the array
    if (bench = queued ? benches.shift() : benches[0]) {
      if (async) {
        onInvoke(bench);
      } else {
        while (bench = onInvoke(bench));
      }
    }
  }

  /**
   * Modify a string by replacing named tokens with matching object property values.
   * @static
   * @member Benchmark
   * @param {String} string The string to modify.
   * @param {Object} object The template object.
   * @returns {String} The modified string.
   * @example
   *
   * Benchmark.interpolate("#{greet} #{who}!", {
   *   "greet": "Hello",
   *   "who": "world"
   * }); // -> "Hello world!"
   */
  function interpolate(string, object) {
    string = string == null ? '' : string;
    forIn(object || { }, function(value, key) {
      string = string.replace(RegExp('#\\{' + key + '\\}', 'g'), String(value));
    });
    return string;
  }

  /**
   * Determines if the given value is an array.
   * @static
   * @member Benchmark
   * @param {Mixed} value The value to check.
   * @returns {Boolean} Returns true if value is an array, else false.
   */
  function isArray(value) {
    return isClassOf(value, 'Array');
  }

  /**
   * Checks if calibration benchmarks have completed.
   * @static
   * @member Benchmark
   * @returns {Boolean} Returns true if calibrated, false if not.
   */
  function isCalibrated() {
    return !filter(Benchmark.CALIBRATIONS,
      function(cal) { return !cal.cycles; }).length;
  }

  /**
   * Checks if an object is of the specified class.
   * @static
   * @member Benchmark
   * @param {Object} object The object.
   * @param {String} name The name of the class.
   * @returns {Boolean} Returns true if of the class, else false.
   */
  function isClassOf(object, name) {
    return {}.toString.call(object).slice(8, -1) == name;
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of object, function, or unknown.
   * @static
   * @member Benchmark
   * @param {Mixed} object The owner of the property.
   * @param {String} property The property name to check.
   * @returns {Boolean} Returns true if the property value is a non-primitive, else false.
   */
  function isHostType(object, property) {
    return !/^(?:boolean|number|string|undefined)$/
      .test(typeof object[property]) && !!object[property];
  }

  /**
   * Creates a string of joined array values or object key-value pairs.
   * @static
   * @member Benchmark
   * @param {Array|Object} object The object to operate on.
   * @param {String} [separator1=','] The separator used between key-value pairs.
   * @param {String} [separator2=': '] The separator used between keys and values.
   * @returns {String} The joined result.
   */
  function join(object, separator1, separator2) {
    var pairs = [];
    if (isArray(object)) {
      pairs = object;
    }
    else {
      separator2 || (separator2 = ': ');
      forIn(object, function(value, key) {
        pairs.push(key + separator2 + value);
      });
    }
    return pairs.join(separator1 || ',');
  }

  /**
   * A generic bare-bones `Array#map` solution.
   * @static
   * @member Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {Array} A new array of values returned by the callback.
   */
  function map(array, callback) {
    return reduce(array, function(result, value, index) {
      result.push(callback(value, index, array));
      return result;
    }, []);
  }

  /**
   * A no-operation function.
   * @static
   * @member Benchmark
   */
  function noop() {
    // no operation performed
  }

  /**
   * A generic bare-bones `Array#reduce` solution.
   * @static
   * @member Benchmark
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @param {Mixed} accumulator Initial value of the accumulator.
   * @returns {Mixed} The accumulator.
   */
  function reduce(array, callback, accumulator) {
    each(array, function(value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /**
   * A generic bare-bones `String#trim` solution.
   * @static
   * @member Benchmark
   * @param {String} string The string to trim.
   * @returns {String} The trimmed string.
   */
  function trim(string) {
    return string.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Registers a single listener of a specified event type.
   * @member Benchmark
   * @param {String} type The event type.
   * @param {Function} listener The function called when the event occurs.
   * @returns {Object} The benchmark instance.
   */
  function addListener(type, listener) {
    var me = this,
        events = me.events || (me.events = { }),
        listeners = events[type] || (events[type] = []);

    listeners.push(listener);
    return me;
  }

  /**
   * Executes all registered listeners of a specified event type.
   * @member Benchmark
   * @param {String} type The event type.
   */
  function emit(type) {
    var me = this,
        args = [me].concat(slice.call(arguments, 1)),
        events = me.events,
        listeners = events && events[type] || [],
        successful = true;

    each(listeners, function(listener) {
      if (listener.apply(me, args) === false) {
        successful = false;
        return successful;
      }
    });
    return successful;
  }

  /**
   * Unregisters a single listener of a specified event type.
   * @member Benchmark
   * @param {String} type The event type.
   * @param {Function} listener The function to unregister.
   * @returns {Object} The benchmark instance.
   */
  function removeListener(type, listener) {
    var me = this,
        events = me.events,
        listeners = events && events[type] || [],
        index = indexOf(listeners, listener);

    if (index > -1) {
      listeners.splice(index, 1);
    }
    return me;
  }

  /**
   * Unregisters all listeners of a specified event type.
   * @member Benchmark
   * @param {String} type The event type.
   * @returns {Object} The benchmark instance.
   */
  function removeAllListeners(type) {
    var me = this,
        events = me.events,
        listeners = events && events[type] || [];

    listeners.length = 0;
    return me;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Aborts the benchmark as well as in progress calibrations without recording times.
   * @member Benchmark
   */
  function abort() {
    var me = this;
    if (me.running) {
      if (me.constructor != Calibration) {
        invoke(Benchmark.CALIBRATIONS, 'abort');
      }
      if (me.timerId && HAS_TIMEOUT_API) {
        clearTimeout(me.timerId);
        delete me.timerId;
      }
      // set running as NaN so reset() will detect it as falsey and *not* call abort(),
      // but *will* detect it as a change and fire the onReset() callback
      me.running = NaN;
      me.reset();
      me.aborted = true;
      me.emit('abort');
    }
  }

  /**
   * Creates a cloned benchmark with the same test function and options.
   * @member Benchmark
   * @param {Object} options Overwrite cloned options.
   * @returns {Object} Cloned instance.
   * @example
   *
   * var bizarro = bench.clone({
   *   "name": "doppelganger"
   * });
   */
  function clone(options) {
    var me = this,
        result = new me.constructor(me.fn, extend(extend({ }, me.options), options));

    // copy manually added properties
    forIn(me, function(value, key) {
      if (!hasKey(result, key)) {
        result[key] = value;
      }
    });
    result.reset();
    return result;
  }

  /**
   * Determines if the benchmark's hertz is higher than another.
   * @member Benchmark
   * @param {Object} other The benchmark to compare.
   * @returns {Number} Returns `1` if higher, `-1` if lower, and `0` if indeterminate.
   */
  function compare(other) {
    var me = this,
        a = { 'lower': me.hz - me.MoE,       'upper': me.hz + me.MoE },
        b = { 'lower': other.hz - other.MoE, 'upper': other.hz + other.MoE };
    return a.lower <= b.upper && a.upper >= b.lower ? 0 : a.lower > b.lower ? 1 : -1;
  }

  /**
   * Reset properties and abort if running.
   * @member Benchmark
   */
  function reset() {
    var changed,
        me = this,
        keys = 'MoE RME SD SEM aborted count cycles error hz running'.split(' '),
        timeKeys = 'cycle elapsed period start stop'.split(' '),
        times = me.times,
        proto = me.constructor.prototype;

    if (me.running) {
      // no worries, reset() is called within abort()
      me.abort();
      me.aborted = proto.aborted;
    }
    else {
      // check if properties have changed and reset them
      each(keys, function(key) {
        if (me[key] != proto[key]) {
          changed = true;
          me[key] = proto[key];
        }
      });
      each(timeKeys, function(key) {
        if (times[key] != proto.times[key]) {
          changed = true;
          times[key] = proto.times[key];
        }
      });
      if (changed) {
        me.emit('reset');
      }
    }
  }

  /**
   * Displays relevant benchmark information when coerced to a string.
   * @member Benchmark
   */
  function toString() {
    var me = this,
        cycles = me.cycles,
        error = me.error,
        pm = IN_JAVA ? '\xf1' : '\xb1',
        x = IN_JAVA ? 'x' : '\xd7',
        result = me.name || me.id || ('<Test #' + me.fn.uid + '>');

    if (error) {
      result += ': ' + join(error);
    } else {
      result += ' ' + x + ' ' + formatNumber(me.hz) + ' ' + pm +
        me.RME.toFixed(2) + '% (' + cycles + ' cycle' + (cycles == 1 ? '' : 's') + ')';
    }
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Performs statistical calculations on benchmark results.
   * @private
   * @param {Object} me The benchmark instance.
   * @param {Boolean} [async=false] Flag to run asynchronously.
   * @param {Array} [sample=[]] Benchmarks used for statistical analysis.
   */
  function compute(me, async, sample) {
    var calibrated = isCalibrated(),
        calibrating = me.constructor == Calibration,
        fn = me.fn,
        queue = [],
        runCount = me.INIT_RUN_COUNT;

    function enqueue(count) {
      while (count--) {
        sample.push(queue[queue.push(me.clone({
          'computing': queue,
          'events': {
            'complete': [onComplete],
            'cycle': [onCycle],
            'start': [onStart]
          }
        })) - 1]);
      }
    }

    function onComplete(clone) {
      // update host run count
      me.INIT_RUN_COUNT = clone.INIT_RUN_COUNT;
    }

    function onCycle(clone) {
      // map changes from clone to host
      if (me.running) {
        if (clone.cycles) {
          me.count = clone.count;
          me.cycles += clone.cycles;
          me.hz = clone.hz;
          me.times.period = clone.times.period;
          me.emit('cycle');
        }
        else if (clone.error) {
          me.abort();
          me.error = clone.error;
          me.emit('error');
        }
      }
      else if (me.aborted) {
        clone.abort();
      }
    }

    function onStart(clone) {
      // reset timer if interrupted by calibrations
      if (!calibrating && !calibrated && isCalibrated()) {
        calibrated = true;
        me.times.start = +new Date;
      }
      // sync clone's initial run count with host
      clone.count = me.INIT_RUN_COUNT;
      onCycle(clone);
    }

    function onInvokeCycle(clone) {
      var complete,
          mean,
          moe,
          rme,
          sd,
          sem,
          now = +new Date,
          times = me.times,
          aborted = me.aborted,
          elapsed = (now - times.start) / 1e3,
          maxedOut = elapsed >= me.MAX_TIME_ELAPSED,
          sampleSize = sample.length,
          sumOf = function(sum, clone) { return sum + clone.hz; },
          varianceOf = function(sum, clone) { return sum + Math.pow(clone.hz - mean, 2); };

      // exit early for unclockable tests
      if (clone.hz == Infinity) {
        queue.length = sample.length = 0;
      }
      // exit early if aborted
      if (aborted) {
        complete = true;
      }
      // simulate onComplete and enqueue additional runs if needed
      else if (!queue.length) {
        // compute values
        mean = reduce(sample, sumOf, 0) / sampleSize || 0;
        // standard deviation
        sd = Math.sqrt(reduce(sample, varianceOf, 0) / (sampleSize - 1)) || 0;
        // standard error of the mean
        sem =  sd / Math.sqrt(sampleSize) || 0;
        // margin of error
        moe = sem * (T_DISTRIBUTION[sampleSize - 1] || T_DISTRIBUTION.Infinity);
        // relative margin of error
        rme = (moe / mean) * 100 || 0;

        // if time permits, or calibrating, increase sample size to reduce the margin of error
        if (rme > 1 && (!maxedOut || calibrating)) {
          if (maxedOut && async) {
            // switch to sync mode
            queue.length = 0;
            compute(me, false, sample);
          }
          else {
            enqueue(1);
          }
        }
        // finish up
        else {
          complete = true;

          // set statistical data
          me.MoE = moe;
          me.RME = rme;
          me.SD  = sd;
          me.SEM = sem;

          // set host results
          me.count = clone.count;
          me.running = false;
          times.stop = now;
          times.elapsed = elapsed;

          if (clone.hz != Infinity) {
            me.hz = mean;
            times.period = 1 / mean;
            times.cycle = times.period * me.count;
          }
          // record results
          if (me.persist) {
            store(me);
          }
        }
      }
      // cleanup
      if (complete) {
        queue.length = 0;
        me.INIT_RUN_COUNT = runCount;
        me.emit('complete');
      }
      return !aborted;
    }

    // init sample and queue
    sample || (sample = []);
    enqueue(sample.length ? 1 : 5);

    // run them
    invoke(queue, {
      'async': async,
      'methodName': 'run',
      'queued': true,
      'onCycle': onInvokeCycle
    });
  }

  /**
   * Executes each run cycle and computes results.
   * @private
   * @param {Object} me The benchmark instance.
   * @param {Boolean} [async=false] Flag to run asynchronously.
   */
  function _run(me, async) {
    var clocked;

    function onCalibrate(cal) {
      if (cal.aborted) {
        me.abort();
        me.emit('complete');
      } else if (me.running) {
        call(me, finish, async);
      }
    }

    function finish() {
      var divisor,
          period,
          fn = me.fn,
          index = me.CALIBRATION_INDEX,
          times = me.times,
          cals = me.constructor.CALIBRATIONS || [],
          cal = cals[index > 1 ? index : fn.compilable ? 0 : 1],
          count = me.count,
          minTime = me.MIN_TIME;

      if (me.running) {
        // calibrate by subtracting iteration overhead
        clocked = times.cycle = Math.max(0,
          clocked - ((cal && cal.times.period || 0) * count));

        // seconds per operation
        period = times.period = clocked / count;

        // ops per second
        me.hz = 1 / period;

        // do we need to do another cycle?
        me.running = clocked < minTime;

        // avoid working our way up to this next time
        me.INIT_RUN_COUNT = count;

        if (me.running) {
          // tests may clock at 0 when INIT_RUN_COUNT is a small number,
          // to avoid that we set its count to something a bit higher
          if (!clocked && (divisor = CYCLE_DIVISORS[me.cycles]) != null) {
            count = Math.floor(4e6 / divisor);
          }
          // calculate how many more iterations it will take to achive the MIN_TIME
          if (count <= me.count) {
            count += Math.ceil((minTime - clocked) / period);
          }
          me.running = count != Infinity;
        }
      }
      // should we exit early?
      if (me.emit('cycle') === false) {
        me.abort();
      }
      // figure out what to do next
      if (me.running) {
        me.count = count;
        call(me, _run, async);
      } else {
        me.emit('complete');
      }
    }

    // continue, if not aborted between cycles
    if (me.running) {
      me.cycles++;
      try {
        // used by finish()
        clocked = clock(me);
      }
      catch(e) {
        me.abort();
        me.error = e;
        me.emit('error');
      }
    }
    // check if calibration is needed
    if (me.running) {
      if (me.constructor == Calibration || calibrate(me, onCalibrate, async)) {
        finish();
      }
    } else {
      finish();
    }
  }

  /**
   * Starts running the benchmark.
   * @member Benchmark
   * @param {Boolean} [async=false] Flag to run asynchronously.
   */
  function run(async) {
    var me = this;
    async = (async == null ? me.DEFAULT_ASYNC : async) && HAS_TIMEOUT_API;

    // set running to false so reset() won't call abort()
    me.running = false;
    me.reset();
    me.running = true;
    me.count = me.INIT_RUN_COUNT;
    me.times.start = +new Date;
    me.emit('start');

    if (me.persist && restore(me)) {
      // use restored data
      call(me, function() {
        me.running = false;
        if (me.emit('cycle') === false) {
          me.abort();
        }
        me.emit('complete');
      }, async);
    }
    else if (me.computing) {
      _run(me, async);
    } else {
      compute(me, async);
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Platform object containing browser name, version, and operating system.
   * @static
   * @member Benchmark
   * @type Boolean
   */
  Benchmark.platform = (function() {
    var me = this,
        alpha = IN_JAVA ? '\xe0' : '\u03b1',
        beta = IN_JAVA ? '\xe1' : '\u03b2',
        description = [],
        doc = window.document || {},
        nav = window.navigator || {},
        ua = nav.userAgent || 'unknown platform',
        layout = /Gecko|Trident|WebKit/.exec(ua),
        data = { '6.1': '7', '6.0': 'Vista', '5.2': 'Server 2003 / XP x64', '5.1': 'XP', '5.0': '2000', '4.0': 'NT', '4.9': 'ME' },
        name = 'Avant Browser,Camino,Epiphany,Fennec,Flock,Galeon,GreenBrowser,iCab,Iron,K-Meleon,Konqueror,Lunascape,Maxthon,Minefield,Nook Browser,RockMelt,SeaMonkey,Sleipnir,SlimBrowser,Sunrise,Swiftfox,Opera,Chrome,Firefox,IE,Safari',
        os = 'Android,webOS[ /]\\d,Linux,Mac OS(?: X)?,Macintosh,Windows 98;,Windows ',
        product = 'BlackBerry\\s?\\d+,iP[ao]d,iPhone,Kindle,Nook',
        version = isClassOf(window.opera, 'Opera') && opera.version();

    function capitalize(string) {
      return /^(?:webOS|i(?:OS|P))/.test(string) ? string :
        string.charAt(0).toUpperCase() + string.slice(1);
    }

    name = reduce(name.split(','), function(name, guess) {
      return name || (name = RegExp(guess + '\\b', 'i').exec(ua) && guess);
    });

    product = reduce(product.split(','), function(product, guess) {
      return product || (product = RegExp(guess + '[^ ();-]*', 'i').exec(ua));
    });

    os = reduce(os.split(','), function(os, guess) {
      if (!os && (os = RegExp(guess + '[^();/-]*').exec(ua))) {
        // platform tokens defined at
        // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
        if (/Windows/.test(os) && (data = data[0/*opera fix*/,/[456]\.\d/.exec(os)])) {
          os = 'Windows ' + data;
        }
        // normalize iOS
        else if (/^iP/.test(product)) {
          name || (name = 'Safari');
          os = 'iOS' + ((data = /\bOS ([\d_]+)/.exec(ua)) ? ' ' + data[1] : '');
        }
        // avoid detecting an OS for products
        else if (product) {
          return null;
        }
        // linux <3s underscores
        if (!/Linux/.test(os)) {
          os = String(os).replace(/_/g, '.');
        }
        // cleanup
        if (/Mac/.test(os)) {
          os = String(os).replace(/ Mach$/, '').replace('Macintosh', 'Mac OS');
        }
        os = String(os).replace(/\/(\d)/, ' $1').split(' on ')[0];
      }
      return os;
    });

    // detect non Opera versions
    version = reduce(['version', /fox/.test(name) ? 'Firefox' : name, 'NetFront'], function(version, guess) {
      return version || (version = (RegExp(guess + '[ /-]([^ ();/-]*)', 'i').exec(ua) || 0)[1]) || null;
    }, version);

    // cleanup product
    if (product) {
      product = (data = String(product).split('/'))[0];
      if (data = data[1]) {
        if (/\d+/.test(product)) {
          version = version || data;
        } else {
          product += ' ' + data;
        }
      }
      product = capitalize(trim(product.replace(/([a-z])(\d)/i, '$1 $2').split('-')[0]));
    }
    // detect server-side js
    if (me && isHostType(me, 'global')) {
      if (typeof exports == 'object' && exports) {
        if (me == window && typeof system == 'object' && system) {
          name = system.global == global ? 'Narwhal' : 'RingoJS';
          os = system.os || null;
        }
        else if (typeof process == 'object' && (data = process)) {
          name = 'Node.js';
          version = /[\d.]+/.exec(data.version)[0];
          os = data.platform;
        }
      } else if (isClassOf(me.environment, 'Environment')) {
        name = 'Rhino';
      }
      if (IN_JAVA && !os) {
        os = String(java.lang.System.getProperty('os.name'));
      }
    }
    // detect non Safari WebKit based browsers
    else if ((data = product || os) && (!name || name == 'Safari' && !/(?:^iP|Linux|Mac OS|Windows)/.test(data))) {
      name = /[a-z]+/i.exec(data) + ' Browser';
    }
    // detect IE compatibility mode
    else if (typeof doc.documentMode == 'number' && (data = /Trident\/(\d+)/.exec(ua))) {
      version = [version, doc.documentMode];
      version[1] = (data = +data[1] + 4) != version[1] ? (layout = null, description.push('running in IE ' + version[1] + ' mode'), data) : version[1];
      version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
    }
    // detect release phases
    if (version && (data = /(?:[ab]|dp|pre|[ab]\dpre)\d?\+?$/i.exec(version) || /(?:alpha|beta) ?\d?/i.exec(ua + ';' + nav.appMinorVersion))) {
      version = version.replace(RegExp(data + '\\+?$'), '') + (/^b/i.test(data) ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    }
    // detect Maxthon's unreliable version info
    if (name == 'Maxthon') {
      version = version && version.replace(/\.[.\d]*/, '.x');
    }
    // detect Firefox nightly
    else if (name == 'Minefield') {
      name = 'Firefox';
      version = RegExp(alpha + '|' + beta + '|null').test(version) ? version : version + alpha;
    }
    // detect mobile
    else if (name && !product && !/Browser/.test(name) && /Mobi/.test(ua)) {
      name += ' Mobile';
    }
    // detect unspecified Safari versions
    if (data = (/Safari\/(\d+)/.exec(ua) || /AppleWebKit\/(\d+)/.exec(ua) || 0)[1]) {
      data = data < 400 ? '1.x' : data < 500 ? '2.x' : data < 526 ? '3.x' : data < 533 ? '4.x' : '4+';
      version = name == 'Safari' && (!version || parseInt(version) > 45) ? data : version;
      layout = 'like Safari ' + data;
    }
    // detect platform preview
    if (RegExp(alpha + '|' + beta).test(version) && typeof external == 'object' && !external) {
      layout = layout && !/like /.test(layout) ? 'rendered by ' + layout : layout;
      description.unshift('platform preview');
    }
    // add engine information
    if (layout && /Browser|Lunascape|Maxthon|Sleipnir/.test(name)) {
      description.push(layout);
    }
    // add contextual information
    if (description.length) {
      description = ['(' + description.join(' ') + ')'];
    }
    // add product to description
    if (product && String(name).indexOf(product) < 0) {
      description.push('on ' + product);
    }
    // cleanup os
    os = os && trim(/^iOS/.test(os = String(os)) ? os : capitalize(os));

    return {
      'version': name && version && description.unshift(version) && version,
      'name': name && description.unshift(name) && name,
      'os': os && description.push((product ? '' : 'on ') + os) && os,
      'product': product,
      'description': description.length ? description.join(' ') : ua,
      'toString': function() { return this.description; }
    };
  }());

  /*--------------------------------------------------------------------------*/

  extend(Benchmark, {

    /**
     * Benchmarks to establish iteration overhead.
     * @static
     * @member Benchmark
     * @type Array
     */
    'CALIBRATIONS': (function() {
      var a = function() { },
          b = function() { };
      a.uid = -1;
      b.uid = -2;
      b.compilable = false;
      return [new Calibration(a), new Calibration(b)];
    }()),

    /**
     * The version number.
     * @static
     * @member Benchmark
     * @type String
     */
    'version': '0.1.337',

    // clears locally stored data
    'clearStorage': clearStorage,

    // generic Array#forEach
    'each': each,

    // copy properties to another object
    'extend': extend,

    // generic Array#filter
    'filter': filter,

    // iterate over an object's direct properties
    'forIn': forIn,

    // converts a number to a comma-separated string
    'formatNumber': formatNumber,

    // xbrowser Object#hasOwnProperty
    'hasKey': hasKey,

    // generic Array#indexOf
    'indexOf': indexOf,

    // invokes a method of each benchmark in a collection
    'invoke': invoke,

    // modifies a string using a template object
    'interpolate': interpolate,

    // xbrowser Array.isArray
    'isArray': isArray,

    // checks calibration status
    'isCalibrated': isCalibrated,

    // checks internal [[Class]] of an object
    'isClassOf': isClassOf,

    // checks if an object's property is a non-primitive value
    'isHostType': isHostType,

    // generic Array#join for arrays and objects
    'join': join,

    // generic Array#map
    'map': map,

    // no operation
    'noop': noop,

    // generic Array#reduce
    'reduce': reduce,

    // generic String#trim
    'trim': trim
  });

  /*--------------------------------------------------------------------------*/

  // IE may ignore `toString` in a for-in loop
  Benchmark.prototype.toString = toString;

  extend(Benchmark.prototype, {

    /**
     * The index of the calibration benchmark to use when computing results.
     * @member Benchmark
     * @type Number
     */
    'CALIBRATION_INDEX': 0,

    /**
     * The delay between test cycles (secs).
     * @member Benchmark
     * @type Number
     */
    'CYCLE_DELAY': 0.005,

    /**
     * A flag to indicate methods will run asynchronously by default.
     * @member Benchmark
     * @type Boolean
     */
    'DEFAULT_ASYNC': false,

    /**
     * A flag to indicate protection against large run counts if Infinity ops/sec is detected.
     * @member Benchmark
     * @type Boolean
     */
    'DETECT_INFINITY': true,

    /**
     * The default number of times to execute a test on a benchmark's first cycle.
     * @member Benchmark
     * @type Number
     */
    'INIT_RUN_COUNT': 5,

    /**
     * The maximum time a benchmark is allowed to run before finishing (secs).
     * @member Benchmark
     * @type Number
     */
    'MAX_TIME_ELAPSED': 8,

    /**
     * The time needed to reduce the percent uncertainty of measurement to 1% (secs).
     * @member Benchmark
     * @type Number
     */
    'MIN_TIME': 0,

    /**
     * The margin of error.
     * @member Benchmark
     * @type Number
     */
    'MoE': 0,

    /**
     * The relative margin of error (expressed as a percentage of the mean).
     * @member Benchmark
     * @type Number
     */
    'RME': 0,

    /**
     * The sample standard deviation.
     * @member Benchmark
     * @type Number
     */
    'SD': 0,

    /**
     * The standard error of the mean.
     * @member Benchmark
     * @type Number
     */
    'SEM': 0,

    /**
     * The number of times a test was executed.
     * @member Benchmark
     * @type Number
     */
    'count': 0,

    /**
     * A timestamp of when the benchmark was created.
     * @member Benchmark
     * @type Number
     */
    'created': 0,

    /**
     * The number of cycles performed while benchmarking.
     * @member Benchmark
     * @type Number
     */
    'cycles': 0,

    /**
     * The error object if the test failed.
     * @member Benchmark
     * @type Object|Null
     */
    'error': null,

    /**
     * The number of executions per second.
     * @member Benchmark
     * @type Number
     */
    'hz': 0,

    /**
     * A flag to indicate if the benchmark is aborted.
     * @member Benchmark
     * @type Boolean
     */
    'aborted': false,

    /**
     * A flag to indicate if results persist OR the number of days to persist.
     * @member Benchmark
     * @type Mixed
     */
    'persist': false,

    /**
     * A flag to indicate if the benchmark is running.
     * @member Benchmark
     * @type Boolean
     */
    'running': false,

    /**
     * Alias of [`Benchmark#addListener`](#addListener).
     * @member Benchmark
     */
    'on': addListener,

    /**
     * An object of timing data including cycle, elapsed, period, start, and stop.
     * @member Benchmark
     * @type Object
     */
    'times': {

      /**
       * The time taken to complete the last cycle (secs)
       * @member Benchmark#times
       * @type Number
       */
      'cycle': 0,

      /**
       * The time taken to complete the benchmark (secs).
       * @member Benchmark#times
       * @type Number
       */
      'elapsed': 0,

      /**
       * The time taken to execute the test once (secs).
       * @member Benchmark#times
       * @type Number
       */
      'period': 0,

      /**
       * A timestamp of when the benchmark started (ms).
       * @member Benchmark#times
       * @type Number
       */
      'start': 0,

      /**
       * A timestamp of when the benchmark finished (ms).
       * @member Benchmark#times
       * @type Number
       */
      'stop': 0
    },

    // aborts benchmark (does not record times)
    'abort': abort,

    // registers a single listener
    'addListener': addListener,

    // create new benchmark with the same test function and options
    'clone': clone,

    // compares benchmark's hertz with another
    'compare': compare,

    // executes listeners of a specified type
    'emit': emit,

    // removes all listeners of a specified type
    'removeAllListeners': removeAllListeners,

    // removes a single listener
    'removeListener': removeListener,

    // reset benchmark properties
    'reset': reset,

    // run the benchmark
    'run': run
  });

  /*--------------------------------------------------------------------------*/

  extend(Calibration.prototype, {
    // avoid repeat calibrations
    'persist': true
  });

  /*--------------------------------------------------------------------------*/

  // expose
  if (/Narwhal|Node|RingoJS/.test(Benchmark.platform.name)) {
    window = global;
    if (typeof module == 'object' && module.exports == exports) {
      module.exports = Benchmark;
    } else {
      exports.Benchmark = Benchmark;
    }
  } else {
    window.Benchmark = Benchmark;
  }

  // feature detect
  HAS_TIMEOUT_API = isHostType(window, 'setTimeout') &&
    isHostType(window, 'clearTimeout');

}(this));