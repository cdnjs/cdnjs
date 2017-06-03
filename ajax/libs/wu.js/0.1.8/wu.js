(function (window, exports, UNDEF) {

    /**
     * Maintain local copies of frequently used functions and constants.
     */

    var OLD_WU = window.wu,
    ARR_SLICE = Array.prototype.slice,

    OBJECT_FUNCTION_STR  = "[object Function]",
    OBJECT_ARRAY_STR     = "[object Array]",
    OBJECT_OBJECT_STR    = "[object Object]",
    OBJECT_NODELIST_STR  = "[object NodeList]",
    OBJECT_ARGUMENTS_STR = "[object Arguments]",
    OBJECT_STRING_STR    = "[object String]",
    OBJECT_NUMBER_STR    = "[object Number]",
    OBJECT_REGEXP_STR    = "[object RegExp]",
    OBJECT_DATE_STR      = "[object Date]",

    /**
     * Define publicly exposed wu function.
     */

    wu = window.wu = exports.wu = function (obj) {
        return obj instanceof Function ?
            augmentFunction(obj) :
            wu.Iterator(obj);
    };

    wu.noConflict = function () {
        window.wu = OLD_WU;
        return wu;
    };

    // Unique singleton object that will always succeed in a call to wu.match() and
    // serves as a placeholder for wu.partial().
    wu.___ = {};

    /**
     * General helpers.
     */

    var isInstance = function (obj, Type)  {
        return obj instanceof Type;
    },
    toObjProtoString = function (obj) {
        return Object.prototype.toString.call(obj);
    },
    toIterator = function (obj) {
        return isInstance(obj, wu.Iterator) ?
            obj :
            new wu.Iterator(obj);
    },
    toArray = function (obj) {
        return isInstance(obj, wu.Iterator) ?
            obj.toArray() :
            ARR_SLICE.call(obj);
    },
    toBool = function (obj) {
        return !!obj;
    };

    /**
     * Iterators!
     */

    var StopIteration = wu.StopIteration = function () {};
    StopIteration.prototype = new Error();
    StopIteration.prototype.name = "StopIteration";

    // Given an object obj, return a .next() function that will give items from
    // obj one at a time.
    var createNextMethodFor = function (obj) {
        var pairs, prop, len, chr, items,
        makeNextForArrayLikeObjs = function (obj) {
            // Copy obj to items so that .shift() won't have side effects on
            // original.
            items = toArray(obj);
            return function () {
                return items.length > 0 ?
                    items.shift() :
                    this.stop();
            };
        };

        switch (toObjProtoString(obj)) {
            case OBJECT_ARRAY_STR:
                return makeNextForArrayLikeObjs(obj);
            case OBJECT_NODELIST_STR:
                return makeNextForArrayLikeObjs(obj);
            case OBJECT_ARGUMENTS_STR:
                return makeNextForArrayLikeObjs(obj);
            case OBJECT_OBJECT_STR:
                if (isInstance(obj, wu.Iterator)) {
                    if (typeof obj.next !== "function") {
                        throw new TypeError("wu.js: Iterator without a next method!");
                    }
                }
                else if (obj.length && Number === obj.length.constructor) {
                    return makeNextForArrayLikeObjs(obj);
                }
                else {
                    pairs = [];
                    for (prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            pairs.push([prop, obj[prop]]);
                        }
                    }
                    return createNextMethodFor(pairs);
                }
            case OBJECT_STRING_STR:
                len = obj.length;
                return function () {
                    if (len > 0) {
                        chr = obj.charAt(0);
                        obj = obj.slice(1);
                        len--;
                        return chr;
                    }
                    this.stop();
                };
            case OBJECT_NUMBER_STR:
                return function () {
                    return obj-- === 0 ?
                        this.stop() :
                        obj;
                };
            default:
                throw new TypeError("wu.js: Object is not iterable: " + obj);
        }
    };

    wu.Iterator = function (objOrFn) {
        if (isInstance(this, wu.Iterator) === false) {
            return new wu.Iterator(objOrFn);
        }

        // If the user passed in a function to use as the next method, use that
        // instead of duck typing our own.
        this.next = toObjProtoString(objOrFn) === OBJECT_FUNCTION_STR ?
            objOrFn :
            createNextMethodFor(objOrFn);
    };

    // Maintain prototype chain for Iterators and exposing prototype as wu.fn
    // for extensibility (following jQuery's lead on that one).
    wu.fn = wu.Iterator.prototype = wu.prototype;

    /*
     * Iterator methods.
     */

    // Return true if fn.call(context, item) is "truthy" for *all* items in this
    // iterator. If fn is not passed, default it to coercion to boolean. Context
    // defaults to this.
    wu.fn.all = function (fn, context) {
        var oppositeFn = fn === UNDEF ?
            wu.not(toBool) :
            wu.not(fn);
        return !this.any(oppositeFn, context);
    };

    // Return true if fn.call(context, item) is "truthy" for *any* item in this iterator. If fn
    // is not passed, default it to coercion to boolean. Context defaults to this.
    wu.fn.any = function (fn, context) {
        fn = fn || toBool;
        try {
            this.filter(fn, context).next();
            return true;
        } catch (err) {
            if ( !isInstance(err, StopIteration) ) {
                throw err;
            }
        }
        return false;
    };

    // Asynchronously call fn.call(context, item) for every item in this
    // iterator. This is the only safe way to force evaluation of infinite
    // sequences without freezing the browser. Does this by yielding control to
    // the UI thread between every iteration via setTimeout. Context defaults to
    // this.
    wu.fn.asyncEach = function (fn, then, context) {
        var that = this;
        context = context || this;
        setTimeout(function asyncLoop() {
            try {
                fn.call(context, that.next());
                setTimeout(asyncLoop, 20);
            } catch(err) {
                if ( !isInstance(err, StopIteration) ) {
                    throw err;
                }
                if (toObjProtoString(then) === OBJECT_FUNCTION_STR) {
                    then.call(context);
                }
            }
        }, 20);
    };

    // Access a method or property of each object in this iterable. For example,
    // wu([[1], [2,3], [4,5,6]]).dot("slice", 1).toArray() -> [[], [3], [5,6]]
    wu.fn.dot = function (slot /*, and variadic args */) {
        var args = ARR_SLICE.call(arguments, 1);
        return this.map(function (item) {
            return toObjProtoString(item[slot]) === OBJECT_FUNCTION_STR ?
                item[slot].apply(item, args) :
                item[slot];
        });
    };

    // While fn.call(context, item) is "truthy", do not return any items from
    // this iterable.
    wu.fn.dropWhile = function (fn, context) {
        var keepDropping = true, that = this;
        context = context || this;
        return wu.Iterator(function next() {
            var item = that.next();
            return keepDropping && fn.call(context, item) ?
                next() :
                (function () {
                    keepDropping = false;
                    return item;
                }());
        });
    };

    // Since the only difference between each and eachply is call/apply, we can
    // generalize them with a HOF.
    var eachGenerator = function (action) {
        return function (fn, context) {
            context = context || this;
            return this.map(function (item) {
                fn[action](context, item);
                return item;
            }).force();
        };
    };

    // Unlike other iterator methods, each forces evaluation. Runs
    // fn.call(context, item) until all items from the iterator are
    // exhausted. Context defaults to this.
    wu.fn.each = (function () {
        return typeof Array.prototype.forEach === "function" ?
            function (fn, context) {
                var items = this.toArray();
                items.forEach(fn, context || this);
                return items;
            } :
            eachGenerator("call");
    }());

    // The same as each, except the items are assumed to be arrays and fn is
    // called with apply instead of call.
    wu.fn.eachply = eachGenerator("apply");

    // Return an iterator that only returns items from this iterator where
    // fn.call(context, item) returns "truthy". Context defaults to "this".
    wu.fn.filter = function (fn, context) {
        var that = this;
        context = context || this;

        return wu.Iterator(function () {
            var item;
            while (true) {
                item = that.next();
                if ( toBool(fn.call(context, item)) ) {
                    return item;
                }
                else {
                    continue;
                }
            }
        });
    };

    // Force evaluation of this iterator and return it's results as an array.
    wu.fn.force = wu.fn.toArray = function () {
        var res = [];
        try {
            while (true)
                res.push(this.next());
        } catch (err) {
            if ( !isInstance(err, StopIteration) )
                throw err;
        }
        return res;
    };

    // Aggregate each item in this iterator based on common item[slot] values.
    wu.fn.groupBy = function (slot /*, and args */) {
        return this.map(function (item) {
            var group = isInstance(item[slot], Function) ?
                item[slot].apply(item, ARR_SLICE.call(arguments, 1)) :
                item[slot];
            return [group, item];
        }).reduce(function (acc, pair) {
            if (acc[pair[0]] === undefined) {
                acc[pair[0]] = [pair[1]];
            }
            else {
                acc[pair[0]].push(pair[1]);
            }
            return acc;
        }, {});
    };

    // Return true if item is inside this iterable.
    wu.fn.has = function (item) {
        return this.any(wu.eq(item));
    };

    // Since map and mapply are the exact same except for call/apply, we can
    // generalize them with a HOF.
    var mapGenerator = function (action) {
        return function (fn, context) {
            var that = this;
            context = context || this;
            return wu.Iterator(function () {
                return fn[action](context, that.next());
            });
        };
    };

    // Return a new iterator where it returns the result of fn.call(context,
    // item) for each item in this iterator. Context defaults to this.
    wu.fn.map = mapGenerator("call");

    // Same as wu.fn.map except that the items in this iterable are assumed to
    // be arrays and the resulting iterator calls fn.apply(context, item) rather
    // than fn.call(context, item). Context defaults to this.
    wu.fn.mapply = mapGenerator("apply");

    // Applies fn against each item in this iterator, left to right, building
    // them up to accumulate a single value. Reduce forces evaluation by nature.
    wu.fn.reduce = (function () {
        // Try to use the native implementation, if it exists.
        return typeof Array.prototype.reduce === "function" ?
            function (fn, initial, context) {
                return initial ?
                    this.toArray().reduce(wu.bind(context || this, fn), initial) :
                    this.toArray().reduce(wu.bind(context || this, fn));
            } :
            function (fn, initial, context) {
                var items = this.toArray(),
                result = initial || items.shift();
                context = context || this;
                while (items.length !== 0) {
                    result = fn.call(context, result, items.shift());
                }
                return result;
            };
    }());

    // The exact same as reduce, except that instead of accumulating from left
    // to right, it accumulates from right to left.
    wu.fn.reduceRight = (function () {
        // Try to use the native implementation, if it exists.
        return typeof Array.prototype.reduceRight === "function" ?
            function (fn, initial, context) {
                return initial ?
                    this.toArray().reduceRight(wu.bind(context || this, fn), initial) :
                    this.toArray().reduceRight(wu.bind(context || this, fn));
            } :
            function (fn, initial, context) {
                var items = this.toArray(),
                result = initial || items.pop();
                context = context || this;
                while (items.length !== 0) {
                    result = fn.call(context, result, items.pop());
                }
                return result;
            };
    }());

    // Call this once an iterator is exhausted and it will replace the .next()
    // method with something that only throws StopIteration everytime it is
    // called, and then throws StopIteration itself.
    wu.fn.stop = function () {
        this.next = function () {
            throw new StopIteration();
        };
        throw new StopIteration();
    };

    // Continue iterating items while fn.call(context, item) is "truthy". As
    // soon as it isn't truthy, stop iterating altogether. Context defaults to
    // this.
    wu.fn.takeWhile = function (fn, context) {
        context = context || this;
        return this.map(function (item) {
            return !!fn.call(context, item) ?
                item :
                this.stop();
        });
    };

    /**
     * Functions attached to wu directly.
     */

    // Function decorator that automatically provides currying to the given
    // function. Optionally, pass a number as the second argument to signify the
    // number of arguments fn expects. If it is missing, we default to the
    // number of explicit arguments the function has.
    wu.autoCurry = function (fn, numArgs) {
        numArgs = numArgs || fn.length;
        return function () {
            if (arguments.length < numArgs) {
                return numArgs - arguments.length > 0 ?
                    wu.autoCurry(wu.curry.apply(this, [fn].concat(toArray(arguments))),
                                 numArgs - arguments.length) :
                    wu.curry.apply(this, [fn].concat(toArray(arguments)));
            }
            else {
                return fn.apply(this, arguments);
            }
        };
    };

    wu.bind = wu.autoCurry(function (scope, fn /*, variadic number of arguments */) {
        var args = ARR_SLICE.call(arguments, 2);
        return function () {
            return fn.apply(scope, args.concat(toArray(arguments)));
        };
    });

    // Chain the iterable arguments to produce a new iterator. For example,
    // wu.chain([1,2,3], [4,5]) is essentially the same as wu([1,2,3,4,5]).
    wu.chain = function (/* variadic iterables */) {
        var i,
        index = 0,
        iterables = wu(arguments).map(toIterator).force();

        return wu.Iterator(function next() {
            try {
                return iterables[index].next();
            } catch (err) {
                if (isInstance(err, StopIteration)) {
                    if (iterables[index + 1] === UNDEF) {
                        this.stop();
                    }
                    else {
                        index += 1;
                        return next();
                    }
                }
                else {
                    throw err;
                }
            }
        });
    };

    wu.compose = function (/* variadic number of functions */) {
        var fns = toArray(arguments), numFns = fns.length;
        return function () {
            var i, returnValue = fns[numFns -1].apply(this, arguments);
            for (i = numFns - 2; i > -1; i--) {
                returnValue = fns[i](returnValue);
            }
            return returnValue;
        };
    };

    wu.curry = function (fn /* variadic number of args */) {
        var args = ARR_SLICE.call(arguments, 1);
        return function () {
            return fn.apply(this, args.concat(toArray(arguments)));
        };
    };

    wu.cycle = function (iterable) {
        var items = toArray(iterable), len = items.length, index = 0;

        return wu.Iterator(function () {
            return items[(index++) % len];
        });
    };

    wu.memoize = function (fn) {
        // We need `JSON.stringify` to create the keys for the cache, if it is
        // unavailable, just return the original function.
        if (typeof JSON === "undefined") return fn;

        var cache = {};
        return function () {
            var args = toArray(arguments),
            key = JSON.stringify(args);

            if ( !(key in cache) ) {
                cache[key] = fn.apply(this, args);
            }
            return cache[key];
        };
    };

    // Equality testing.

    var arrayEq = function (a, b) {
        return a.length === 0 ?
            a.length === b.length :
            wu.eq(a[0], b[0]) && wu.eq(a.slice(1),
                                       b.slice(1));
    };

    var objectEq = function (a, b) {
        var prop, propertiesSeen = [];
        for (prop in a) {
            propertiesSeen.push(prop);
            if ( a.hasOwnProperty(prop) && !wu.eq(a[prop], b[prop]) ) {
                return false;
            }
        }
        for (prop in b) {
            if ( b.hasOwnProperty(prop) &&
                 !wu(propertiesSeen).has(prop) &&
                 !wu.eq(a[prop], b[prop]) ) {
                return false;
            }
        }
        return true;
    };

    var regExpEq = function (a, b) {
        return a.source === b.source &&
            a.global === b.global &&
            a.ignoreCase === b.ignoreCase &&
            a.multiline === b.multiline;
    };

    wu.eq = wu.autoCurry(function (a, b) {
        var typeOfA = toObjProtoString(a);
        if (typeOfA !== toObjProtoString(b)) {
            return false;
        }

        else {
            switch (typeOfA) {
                case OBJECT_ARRAY_STR:
                    return arrayEq(a, b);
                case OBJECT_OBJECT_STR:
                    return objectEq(a, b);
                case OBJECT_REGEXP_STR:
                    return regExpEq(a, b);
                case OBJECT_DATE_STR:
                    return a.valueOf() === b.valueOf();
                default:
                    return a === b;
            }
        }
    });

    var isMatch = function (pattern, form) {
        var typeOfForm = toObjProtoString(form),
        typeOfPattern = toObjProtoString(pattern),
        prop;

        if (pattern === wu.___) {
            return true;
        }
        else if ( typeOfPattern === OBJECT_FUNCTION_STR ) {
            // Special case for matching instances to their constructors, ie
            // isMatch(Array, [1,2,3]) should return true.
            if (isInstance(form, pattern)) {
                return true;
            }
            // But we have to check String and Number directly since 5
            // instanceof Number and "foo" instanceof String both return false.
            if (pattern === String && typeOfForm === OBJECT_STRING_STR) {
                return true;
            }
            if (pattern === Number && typeOfForm === OBJECT_NUMBER_STR) {
                return true;
            }
            else {
                return form === pattern;
            }
        }
        else {
            if ( typeOfPattern !== typeOfForm ) {
                if (typeOfPattern === OBJECT_REGEXP_STR &&
                    typeOfForm === OBJECT_STRING_STR) {
                    return pattern.test(form);
                }
                return false;
            }
            else if ( typeOfPattern === OBJECT_ARRAY_STR ) {
                return pattern.length === 0 ?
                    form.length === 0 :
                    isMatch(pattern[0], form[0]) &&
                        isMatch(pattern.slice(1), form.slice(1));
            }
            else if ( typeOfPattern === OBJECT_OBJECT_STR ) {
                for (prop in pattern) {
                    if (pattern.hasOwnProperty(prop) &&
                        !isMatch(pattern[prop], form[prop])){
                        return false;
                    }
                }
                return true;
            }
            else {
                return wu.eq(pattern, form);
            }
        }
    };

    wu.match = function (/* pat1, then1, pat2, then2, ... patN, thenN */) {
        var args = toArray(arguments);
        return function () {
            var form = toArray(arguments);
            // i += 2 to iterate over only the patterns.
            for (var i = 0; i < args.length; i += 2) {
                if ( isMatch(args[i], form) ) {
                    return toObjProtoString(args[i+1]) === OBJECT_FUNCTION_STR ?
                        args[i+1].apply(this, form) :
                        args[i+1];
                }
            }
            throw new TypeError("wu.match: The form did not match any given pattern.");
        };
    };

    wu.not = function (fn) {
        return function () {
            return !fn.apply(this, arguments);
        };
    };

    wu.partial = function (fn /*, and variadic args */) {
        var frozenArgs = ARR_SLICE.call(arguments, 1);
        return frozenArgs.length < 1 ?
            fn :
            function () {
                var i,
                args = toArray(frozenArgs), // Make a copy
                partialArgs = toArray(arguments);
                for (i = 0; i < args.length; i++)
                    if (args[i] === wu.___)
                        args[i] = partialArgs.shift();
                return fn.apply(this, args.concat(partialArgs));
            };
    };

    var throwNewTypeError = function (msg) {
        throw new TypeError("wu.js: " + msg);
    },

    rangeHelper = function (start, end, incr) {
        // Ensure the types of our parameters are numbers (and not NaN or
        // Infinity), because we could accidentally begin an infinite loop.
        start = toObjProtoString(start) === OBJECT_NUMBER_STR
                && !isNaN(start)  && start !== Infinity && start !== -Infinity ?
            start :
            throwNewTypeError("The `start` parameter to wu.range must be a number.");
        incr = toObjProtoString(incr) === OBJECT_NUMBER_STR && !isNaN(incr)
                && incr !== Infinity && incr !== -Infinity ?
            incr :
            throwNewTypeError("The `incr` parameter to wu.range must be a number.");
        // However, end can be infinite.
        end = toObjProtoString(end) === OBJECT_NUMBER_STR && !isNaN(end) ?
            end :
            throwNewTypeError("The `end` parameter to wu.range must be a number.");

        // Handle first case since we are doing +=
        start = start - incr;

        return wu.Iterator(function () {
            return start + incr >= end ?
                this.stop() :
                start += incr;
        });
    };

    wu.range = function () {
        switch (arguments.length) {
            case 1:
                return rangeHelper(0, arguments[0], 1);
            case 2:
                return rangeHelper(arguments[0], arguments[1], 1);
            case 3:
                return rangeHelper(arguments[0], arguments[1], arguments[2]);
            default:
                throw new TypeError("wu.js: Wrong number of arguments passed to wu.range!");
        }
    };

    wu.toBool = toBool;
    wu.toArray = toArray;

    wu.zip = function (/* variadic number of iterables */) {
        var iterables = wu(arguments).map(toIterator).force();
        return wu.Iterator(function () {
            var res = wu(iterables).dot("next").force();
            return res.length  === iterables.length ?
                res :
                this.stop();
        });
    };

    wu.zipWith = function (fn /*, variadic number of iterables */) {
        var args = ARR_SLICE.call(arguments, 1);
        return wu.zip.apply(wu, args).mapply(fn);
    };

    /**
     * Augmenting functions with wu methods via wu(fn).
     */

    function augmentFunction(fn) {
        fn.bind    = wu.partial(wu.bind, wu.___, fn);
        fn.compose = wu.curry(wu.compose, fn);
        fn.curry   = wu.curry(wu.curry, fn);
        fn.partial = wu.curry(wu.partial, fn);
        fn.zipWith = wu.curry(wu.zipWith, fn);
        fn.memoize = wu.curry(wu.memoize, fn);
        return fn;
    }

    wu.tang = { clan: 36 };

}(typeof window !== "undefined" ? window : {},
  typeof exports !== "undefined" ? exports : {}));
