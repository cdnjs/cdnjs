// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

(function (window, undefined) {
	
    var freeExports = typeof exports == 'object' && exports,
        freeModule = typeof module == 'object' && module && module.exports == freeExports && module,
        freeGlobal = typeof global == 'object' && global;
    if (freeGlobal.global === freeGlobal) {
        window = freeGlobal;
    } 

    var Ix = { Internals: {} };
    
    // Headers
    function noop () { }
    function identity (x) { return x; }
    function defaultComparer (x, y) { return x > y ? 1 : x < y ? -1 : 0; }
    function defaultEqualityComparer(x, y) { return isEqual(x, y); }
    function defaultSerializer(x) { return x.toString(); }

    var seqNoElements = 'Sequence contains no elements.';
    var invalidOperation = 'Invalid operation';
    var slice = Array.prototype.slice;
    
    var hasProp = {}.hasOwnProperty;

    /** @private */
    var inherits = this.inherits = Ix.Internals.inherits = function (child, parent) {
        function __() { this.constructor = child; }
        __.prototype = parent.prototype;
        child.prototype = new __();
    };

    /** @private */    
    var addProperties = Ix.Internals.addProperties = function (obj) {
        var sources = slice.call(arguments, 1);
        for (var i = 0, len = sources.length; i < len; i++) {
            var source = sources[i];
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
    };
    /** Used to determine if values are of the language type Object */
    var objectTypes = {
        'boolean': false,
        'function': true,
        'object': true,
        'number': false,
        'string': false,
        'undefined': false
    };

    /** `Object#toString` result shortcuts */
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
        supportsArgsClass = toString.call(arguments) == argsClass, // For less <IE9 && FF<4
        suportNodeClass;

    try {
        suportNodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
    } catch(e) {
        suportNodeClass = true;
    }

    function isNode(value) {
        // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
        // methods that are `typeof` "string" and still can coerce nodes to strings
        return typeof value.toString != 'function' && typeof (value + '') == 'string';
    }

    function isArguments(value) {
        return (value && typeof value == 'object') ? toString.call(value) == argsClass : false;
    }

    // fallback for browsers that can't detect `arguments` objects by [[Class]]
    if (!supportsArgsClass) {
        isArguments = function(value) {
            return (value && typeof value == 'object') ? hasOwnProperty.call(value, 'callee') : false;
        };
    }

    function isFunction(value) {
        return typeof value == 'function';
    }

    // fallback for older versions of Chrome and Safari
    if (isFunction(/x/)) {
        isFunction = function(value) {
            return typeof value == 'function' && toString.call(value) == funcClass;
        };
    }        

    var isEqual = Ix.Internals.isEqual = function (x, y) {
        return deepEquals(x, y, [], []); 
    };

    /** @private
     * Used for deep comparison
     **/
    function deepEquals(a, b, stackA, stackB) {
        var result;
        // exit early for identical values
        if (a === b) {
            // treat `+0` vs. `-0` as not equal
            return a !== 0 || (1 / a == 1 / b);
        }
        var type = typeof a,
            otherType = typeof b;

        // exit early for unlike primitive values
        if (a === a &&
            !(a && objectTypes[type]) &&
            !(b && objectTypes[otherType])) {
            return false;
        }

        // exit early for `null` and `undefined`, avoiding ES3's Function#call behavior
        // http://es5.github.io/#x15.3.4.4
        if (a == null || b == null) {
            return a === b;
        }
        // compare [[Class]] names
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
                // coerce dates and booleans to numbers, dates to milliseconds and booleans
                // to `1` or `0`, treating invalid dates coerced to `NaN` as not equal
                return +a == +b;

            case numberClass:
                // treat `NaN` vs. `NaN` as equal
                return (a != +a)
                    ? b != +b
                    // but treat `+0` vs. `-0` as not equal
                    : (a == 0 ? (1 / a == 1 / b) : a == +b);

            case regexpClass:
            case stringClass:
                // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
                // treat string primitives and their corresponding object instances as equal
                return a == String(b);
        }

        var isArr = className == arrayClass;
        if (!isArr) {
        
            // exit for functions and DOM nodes
            if (className != objectClass || (!suportNodeClass && (isNode(a) || isNode(b)))) {
                return false;
            }

            // in older versions of Opera, `arguments` objects have `Array` constructors
            var ctorA = !supportsArgsClass && isArguments(a) ? Object : a.constructor,
                ctorB = !supportsArgsClass && isArguments(b) ? Object : b.constructor;

            // non `Object` object instances with different constructors are not equal
            if (ctorA != ctorB && !(
                isFunction(ctorA) && ctorA instanceof ctorA &&
                isFunction(ctorB) && ctorB instanceof ctorB
            )) {
                return false;
            }
        }
        
        // assume cyclic structures are equal
        // the algorithm for detecting cyclic structures is adapted from ES 5.1
        // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
        var length = stackA.length;
        while (length--) {
            if (stackA[length] == a) {
                return stackB[length] == b;
            }
        }
        
        var size = 0;
        result = true;

        // add `a` and `b` to the stack of traversed objects
        stackA.push(a);
        stackB.push(b);

        // recursively compare objects and arrays (susceptible to call stack limits)
        if (isArr) {
            length = a.length;
            size = b.length;

            // compare lengths to determine if a deep comparison is necessary
            result = size == a.length;
            // deep compare the contents, ignoring non-numeric properties
            while (size--) {
                var index = length,
                    value = b[size];

                if (!(result = deepEquals(a[size], value, stackA, stackB))) {
                    break;
                }
            }
        
            return result;
        }

        // deep compare each object
        for(var key in b) {
            if (hasOwnProperty.call(b, key)) {
                // count properties and deep compare each property value
                size++;
                return (result = hasOwnProperty.call(a, key) && deepEquals(a[key], b[key], stackA, stackB));
            }
        }

        if (result) {
            // ensure both objects have the same number of properties
            for (var key in a) {
                if (hasOwnProperty.call(a, key)) {
                    // `size` will be `-1` if `a` has more properties than `b`
                    return (result = --size > -1);
                }
            }
        }
        stackA.pop();
        stackB.pop();

        return result;
    }
    // Real Dictionary
    var primes = [1, 3, 7, 13, 31, 61, 127, 251, 509, 1021, 2039, 4093, 8191, 16381, 32749, 65521, 131071, 262139, 524287, 1048573, 2097143, 4194301, 8388593, 16777213, 33554393, 67108859, 134217689, 268435399, 536870909, 1073741789, 2147483647];
    var noSuchkey = "no such key";
    var duplicatekey = "duplicate key";

    function isPrime(candidate) {
        if (candidate & 1 === 0) {
            return candidate === 2;
        }
        var num1 = Math.sqrt(candidate),
            num2 = 3;
        while (num2 <= num1) {
            if (candidate % num2 === 0) {
                return false;
            }
            num2 += 2;
        }
        return true;
    }

    function getPrime(min) {
        var index, num, candidate;
        for (index = 0; index < primes.length; ++index) {
            num = primes[index];
            if (num >= min) {
                return num;
            }
        }
        candidate = min | 1;
        while (candidate < primes[primes.length - 1]) {
            if (isPrime(candidate)) {
                return candidate;
            }
            candidate += 2;
        }
        return min;
    }

    function stringHashFn(str) {
        var hash = 0;
        if (!str.length) {
            return hash;
        }
        for (var i = 0, len = str.length; i < len; i++) {
            var character = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+character;
            hash = hash & hash;
        }
        return hash;
    }

    function numberHashFn(key) {
        var c2 = 0x27d4eb2d; 
        key = (key ^ 61) ^ (key >>> 16);
        key = key + (key << 3);
        key = key ^ (key >>> 4);
        key = key * c2;
        key = key ^ (key >>> 15);
        return key;
    }

    var getHashCode = (function () {
        var uniqueIdCounter = 0;

        return function (obj) {
            if (obj == null) { 
                throw new Error(noSuchkey);
            }

            // Check for built-ins before tacking on our own for any object
            if (typeof obj === 'string') {
                return stringHashFn(obj);
            }

            if (typeof obj === 'number') {
                return numberHashFn(obj);
            }

            if (typeof obj === 'boolean') {
                return obj === true ? 1 : 0;
            }

            if (obj instanceof Date) {
                return obj.getTime();
            }

            if (obj.getHashCode) {
                return obj.getHashCode();
            }

            var id = 17 * uniqueIdCounter++;
            obj.getHashCode = function () { return id; };
            return id;
        };
    } ());

    function newEntry() {
        return { key: null, value: null, next: 0, hashCode: 0 };
    }

    // Dictionary implementation

    var Dictionary = function (capacity, comparer) {
        if (capacity < 0) {
            throw new Error('out of range')
        }
        if (capacity > 0) {
            this._initialize(capacity);
        }
        
        this.comparer = comparer || defaultComparer;
        this.freeCount = 0;
        this.size = 0;
        this.freeList = -1;
    };

    DictionaryPrototype = Dictionary.prototype;

    DictionaryPrototype._initialize = function (capacity) {
        var prime = getPrime(capacity), i;
        this.buckets = new Array(prime);
        this.entries = new Array(prime);
        for (i = 0; i < prime; i++) {
            this.buckets[i] = -1;
            this.entries[i] = newEntry();
        }
        this.freeList = -1;
    };

    DictionaryPrototype.add = function (key, value) {
        return this._insert(key, value, true);
    };

    DictionaryPrototype._insert = function (key, value, add) {
        if (!this.buckets) {
            this._initialize(0);
        }
        var index3;
        var num = getHashCode(key) & 2147483647;
        var index1 = num % this.buckets.length;
        for (var index2 = this.buckets[index1]; index2 >= 0; index2 = this.entries[index2].next) {
            if (this.entries[index2].hashCode === num && this.comparer(this.entries[index2].key, key)) {
                if (add) {
                    throw new Error(duplicatekey);
                }
                this.entries[index2].value = value;
                return;
            }
        }
        if (this.freeCount > 0) {
            index3 = this.freeList;
            this.freeList = this.entries[index3].next;
            --this.freeCount;
        } else {
            if (this.size === this.entries.length) {
                this._resize();
                index1 = num % this.buckets.length;
            }
            index3 = this.size;
            ++this.size;
        }
        this.entries[index3].hashCode = num;
        this.entries[index3].next = this.buckets[index1];
        this.entries[index3].key = key;
        this.entries[index3].value = value;
        this.buckets[index1] = index3;
    };

    DictionaryPrototype._resize = function () {
        var prime = getPrime(this.size * 2),
            numArray = new Array(prime);
        for (index = 0; index < numArray.length; ++index) {
            numArray[index] = -1;
        }
        var entryArray = new Array(prime);
        for (index = 0; index < this.size; ++index) {
            entryArray[index] = this.entries[index];
        }
        for (var index = this.size; index < prime; ++index) {
            entryArray[index] = newEntry();
        }
        for (var index1 = 0; index1 < this.size; ++index1) {
            var index2 = entryArray[index1].hashCode % prime;
            entryArray[index1].next = numArray[index2];
            numArray[index2] = index1;
        }
        this.buckets = numArray;
        this.entries = entryArray;
    };

    DictionaryPrototype.remove = function (key) {
        if (this.buckets) {
            var num = getHashCode(key) & 2147483647;
            var index1 = num % this.buckets.length;
            var index2 = -1;
            for (var index3 = this.buckets[index1]; index3 >= 0; index3 = this.entries[index3].next) {
                if (this.entries[index3].hashCode === num && this.comparer(this.entries[index3].key, key)) {
                    if (index2 < 0) {
                        this.buckets[index1] = this.entries[index3].next;
                    } else {
                        this.entries[index2].next = this.entries[index3].next;
                    }
                    this.entries[index3].hashCode = -1;
                    this.entries[index3].next = this.freeList;
                    this.entries[index3].key = null;
                    this.entries[index3].value = null;
                    this.freeList = index3;
                    ++this.freeCount;
                    return true;
                } else {
                    index2 = index3;
                }
            }
        }
        return false;
    };

    DictionaryPrototype.clear = function () {
        var index, len;
        if (this.size <= 0) {
            return;
        }
        for (index = 0, len = this.buckets.length; index < len; ++index) {
            this.buckets[index] = -1;
        }
        for (index = 0; index < this.size; ++index) {
            this.entries[index] = newEntry();
        }
        this.freeList = -1;
        this.size = 0;
    };

    DictionaryPrototype._findEntry = function (key) {
        if (this.buckets) {
            var num = getHashCode(key) & 2147483647;
            for (var index = this.buckets[num % this.buckets.length]; index >= 0; index = this.entries[index].next) {
                if (this.entries[index].hashCode === num && this.comparer(this.entries[index].key, key)) {
                    return index;
                }
            }
        }
        return -1;
    };

    DictionaryPrototype.length = function () {
        return this.size - this.freeCount;
    };

    DictionaryPrototype.tryGetValue = function (key) {
        var entry = this._findEntry(key);
        if (entry >= 0) {
            return this.entries[entry].value;
        }
        return undefined;
    };

    DictionaryPrototype.getValues = function () {
        var index = 0, results = [];
        if (this.entries) {
            for (var index1 = 0; index1 < this.size; index1++) {
                if (this.entries[index1].hashCode >= 0) {
                    results[index++] = this.entries[index1].value;
                }
            }
        }
        return results;
    };

    DictionaryPrototype.get = function (key) {
        var entry = this._findEntry(key);
        if (entry >= 0) {
            return this.entries[entry].value;
        }
        throw new Error(noSuchkey);
    };

    DictionaryPrototype.set = function (key, value) {
        this._insert(key, value, false);
    };

    DictionaryPrototype.has = function (key) {
        return this._findEntry(key) >= 0;
    };

    DictionaryPrototype.toEnumerable = function () {
        var self = this;
        return new Enumerable(function () {
            var index = 0, current;

            return enumeratorCreate(
                function () {
                    if (!self.entries) {
                        return false;
                    }

                    while (true) {
                        if (index < self.size) {
                            if (self.entries[index].hashCode >= 0) {
                                var k = self.entries[index];
                                current = { key: k.key, value: k.value };
                                index++;
                                return true;
                            }
                        } else {
                            return false;
                        }
                    }
                },
                function () {
                    return current;
                }, 
                noop
            );
        });

    };

    var Lookup = (function () {

        function Lookup(map) {
            this.map = map;
        }

        var LookupPrototype = Lookup.prototype;

        LookupPrototype.has = function (key) {
            return this.map.has(key);
        };

        LookupPrototype.length = function () {
            return this.map.length();
        };

        LookupPrototype.get = function (key) {
            return enumerableFromArray(this.map.get(key));
        };

        LookupPrototype.toEnumerable = function () {
            return this.map.toEnumerable().select(function (kvp) {
                var e = enumerableFromArray(kvp.value);
                e.key = kvp.key;
                return e;
            });
        };

        return Lookup;
    }());

    var Enumerator = Ix.Enumerator = function (moveNext, getCurrent, dispose) {
        this.moveNext = moveNext;
        this.getCurrent = getCurrent;
        this.dispose = dispose;
    };

    var enumeratorCreate = Enumerator.create = function (moveNext, getCurrent, dispose) {
        var done = false;
        dispose || (dispose = noop);
        return new Enumerator(function () {
            if (done) {
                return false;
            }
            var result = moveNext();
            if (!result) {
                done = true;
                dispose();
            }
            return result;
        }, function () { return getCurrent(); }, function () {
            if (!done) {
                dispose();
                done = true;
            }
        });
    };
    /** @private Check for disposal */
    function checkAndDispose(e) {
        e && e.dispose();
    }

    /**
     * Provides a set of methods to create and query Enumerable sequences.
     */
    var Enumerable = Ix.Enumerable = (function () {
        function Enumerable(getEnumerator) {
            this.getEnumerator = getEnumerator;
        }

        var EnumerablePrototype = Enumerable.prototype;

        function aggregate (seed, func, resultSelector) {
            resultSelector || (resultSelector = identity);
            var accumulate = seed, enumerator = this.getEnumerator(), i = 0;
            try {
                while (enumerator.moveNext()) {
                    accumulate = func(accumulate, enumerator.getCurrent(), i++, this);
                }
            } finally {
                enumerator.dispose();
            }
            return resultSelector ? resultSelector(accumulate) : accumulate;         
        }

        function aggregate1 (func) {
            var accumulate, enumerator = this.getEnumerator(), i = 0;
            try {
                if (!enumerator.moveNext()) {
                    throw new Error(seqNoElements);
                }
                accumulate = enumerator.getCurrent();
                while (enumerator.moveNext()) {
                    accumulate = func(accumulate, enumerator.getCurrent(), i++, this);
                }
            } catch (e) { 
                throw e;
            } finally {
                enumerator.dispose();
            }
            return accumulate;
        }

        /**
         * Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the optional function is used to select the result value.
         * 
         * @example
         * sequence.aggregate(0, function (acc, item, index, seq) { return acc + x; });
         * sequence.aggregate(function (acc, item, index, seq) { return acc + x; });
         *
         * @param {Any} seed The initial accumulator value.
         * @param {Function} func An accumulator function to be invoked on each element.
         * @resultSelector {Function} A function to transform the final accumulator value into the result value.
         * @returns {Any} The transformed final accumulator value.
         */
        EnumerablePrototype.aggregate = function(/* seed, func, resultSelector */) {
            var f = arguments.length === 1 ? aggregate1 : aggregate;
            return f.apply(this, arguments);
        };

        /**
         * Apply a function against an accumulator and each value of the sequence (from left-to-right) as to reduce it to a single value.
         *
         * @example
         * sequence.reduce(function (acc, x) { return acc + x; }, 0);
         * sequence.reduce(function (acc, x) { return acc + x; });
         *
         * @param {Function} func Function to execute on each value in the sequence, taking four arguments:
         *  previousValue The value previously returned in the last invocation of the callback, or initialValue, if supplied. 
         *  currentValue The current element being processed in the sequence.
         *  index The index of the current element being processed in the sequence.
         *  sequence The sequence reduce was called upon.
         * @param {Any} initialValue Object to use as the first argument to the first call of the callback.
         * @returns {Any} The transformed final accumulator value.
         */
        EnumerablePrototype.reduce = function (/*func, seed */) {
            return arguments.length === 2 ? 
                aggregate.call(this, arguments[1], arguments[0]) :
                aggregate1.apply(this, arguments);
        };

        /**
         * Determines whether all elements of a sequence satisfy a condition.
         *
         * @example
         * sequence.all(function (item, index, seq) { return item % 2 === 0; });
         *
         * @param {Function} predicate A function to test each element for a condition.
         * @returns {Boolean} true if every element of the source sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, false.
         */
        EnumerablePrototype.all = EnumerablePrototype.every = function (predicate, thisArg) {
            var e = this.getEnumerator(), i = 0;
            try {
                while (e.moveNext()) {
                    if (!predicate.call(thisArg, e.getCurrent(), i++, this)) {
                        return false;
                    }
                }
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
            return true;
        }; 

        EnumerablePrototype.every = EnumerablePrototype.all;

        /**
         * Determines whether any element of a sequence satisfies a condition if given, else if any items are in the sequence.
         *
         * @example
         * sequence.any(function (item, index, seq) { return x % 2 === 0; });
         * sequence.any();
         *
         * @param {Function} [predicate] An optional function to test each element for a condition.
         * @returns {Boolean} true if any elements in the source sequence pass the test in the specified predicate; otherwise, false.
         */
        EnumerablePrototype.any = function(predicate, thisArg) {
            var e = this.getEnumerator(), i = 0;
            try {
                while (e.moveNext()) {
                    if (!predicate || predicate.call(thisArg, e.getCurrent(), i++, this)) {
                        return true;
                    }
                }
            } catch(ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
            return false;   
        }; 

        EnumerablePrototype.some = EnumerablePrototype.any;

        /** 
         * Computes the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.
         *
         * @param {Function} [selector] An optional transform function to apply to each element.
         * @returns {Number} The average of the sequence of values.
         */
        EnumerablePrototype.average = function(selector) {
            if (selector) {
                return this.select(selector).average();
            }
            var e = this.getEnumerator(), count = 0, sum = 0;
            try {
                while (e.moveNext()) {
                    count++;
                    sum += e.getCurrent();
                }
            } catch (ex) {
                throw ex;                
            } finally {
                checkAndDispose(e);
            }
            if (count === 0) {
                throw new Error(seqNoElements);
            }
            return sum / count;
        };

        /** 
         * Concatenates two sequences.
         * 
         * @returns {Enumerable} An Enumerable that contains the concatenated elements of the two input sequences.
         */
        EnumerablePrototype.concat = function () {
            var args = slice.call(arguments, 0);
            args.unshift(this);
            return enumerableConcat.apply(null, args);
        };

        /**
         * Determines whether a sequence contains a specified element by using an optional comparer function
         *
         * @param {Any} value The value to locate in the sequence.
         * @param {Function} [comparer] An equality comparer function to compare values.
         * @returns {Boolean} true if the source sequence contains an element that has the specified value; otherwise, false.
         */
        EnumerablePrototype.contains = function(value, comparer) {
            comparer || (comparer = defaultEqualityComparer); 
            var e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    if (comparer(value, e.getCurrent())) {
                        return true;
                    }
                }
            } catch (ex) {
                throw ex;                
            } finally {
                checkAndDispose(e);
            }
            return false;
        };

        /**
         * Returns a number that represents how many elements in the specified sequence satisfy a condition if specified, else the number of items in the sequence.
         *
         * @example
         * sequence.count();
         * sequence.count(function (item, index, seq) { return item % 2 === 0; });
         *
         * @param {Function} [predicate] A function to test each element for a condition.
         * @returns {Number} A number that represents how many elements in the sequence satisfy the condition in the predicate function if specified, else number of items in the sequence.
         */
        EnumerablePrototype.count = function(predicate, thisArg) {
            var c = 0, i = 0, e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    if (!predicate || predicate.call(thisArg, e.getCurrent(), i++, this)) {
                        c++;
                    }
                }
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
            return c;       
        };

        /**
         * Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.
         *
         * @param {Any} [defaultValue] The value to return if the sequence is empty.
         * @returns {Enumerable} An Enumerable that contains defaultValue if source is empty; otherwise, source.
         */
        EnumerablePrototype.defaultIfEmpty = function(defaultValue) {
            var parent = this;
            return new Enumerable(function () {
                var current, isFirst = true, hasDefault = false, e;
                return enumeratorCreate(
                    function () {
                        e || (e = parent.getEnumerator());

                        if (hasDefault) { return false; }
                        if (isFirst) {
                            isFirst = false;
                            if (!e.moveNext()) {
                                current = defaultValue;            
                                hasDefault = true;
                                return true;
                            } else {
                                current = e.getCurrent();
                                return true;
                            }
                        }
                        if (!e.moveNext()) { return false; }
                        current = e.getCurrent();
                        return true;
                    },
                    function () { return current; },
                    function () { checkAndDispose(e); }
                );
            });
        };

        function arrayIndexOf (item, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var idx = this.length;
            while (idx--) {
                if (comparer(this[idx], item)) {
                    return idx;
                }
            }
            return -1;
        }

        function arrayRemove(item, comparer) {
            var idx = arrayIndexOf.call(this, item, comparer);
            if (idx === -1) { 
                return false;
            }
            this.splice(idx, 1);
            return true;
        }
        
        /**
         * Returns distinct elements from a sequence by using an optional comparer function to compare values.
         * @example
         *  var result = Enumerable.fromArray([1,2,1,2,1,2]);
         *  var result = Enumerable.fromArray([1,2,1,2,1,2], function (x, y) { return x === y; });
         * @param {Function} [comparer] a comparer function to compare the values.
         * @returns {Enumerable} An Enumerable that contains distinct elements from the source sequence.
         */
        EnumerablePrototype.distinct = function(comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return new Enumerable(function () {
                var current, map = [], e;
                return enumeratorCreate(
                    function () {
                        e || (e = parent.getEnumerator());
                        while (true) {
                            if (!e.moveNext()) {
                                return false;
                            }
                            var c = e.getCurrent();
                            if (arrayIndexOf.call(map, c, comparer) === -1) {
                                current = c;
                                map.push(current);
                                return true;
                            }
                        }
                    },
                    function () { return current; },
                    function () { checkAndDispose(e);}
                );
            });
        };

        /**
         * Returns the element at a specified index in a sequence.
         *
         * @param {Number} index The zero-based index of the element to retrieve.
         * @returns {Any} The element at the specified position in the source sequence.
         */
        EnumerablePrototype.elementAt = function (index) {
            return this.skip(index).first();
        };

        /**
         * Returns the element at a specified index in a sequence or a default value if the index is out of range.
         *
         * @param {Number} index The zero-based index of the element to retrieve.
         * @returns {Any} null if the index is outside the bounds of the source sequence; otherwise, the element at the specified position in the source sequence.
         */
        EnumerablePrototype.elementAtOrDefault = function (index) {
            return this.skip(index).firstOrDefault();
        };

        /**
         * Produces the set difference of two sequences by using the specified comparer function to compare values.
         *
         * @param {Enumerable} second An Enumerable whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
         * @param {Function} [comparer] A function to compare values.
         * @returns {Enumerable} A sequence that contains the set difference of the elements of two sequences.
         */
        EnumerablePrototype.except = function(second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return new Enumerable(function () {
                var current, map = [], se = second.getEnumerator(), fe;
                try {
                    while (se.moveNext()) {
                        map.push(se.getCurrent());
                    }
                } catch(ex) {
                    throw ex;
                } finally {
                    checkAndDispose(se);
                }

                return enumeratorCreate(
                    function () {
                        fe || (fe = parent.getEnumerator());
                        while (true) {
                            if (!fe.moveNext()) {
                                return false;
                            }
                            current = fe.getCurrent();
                            if (arrayIndexOf.call(map, current, comparer) === -1) {
                                map.push(current);
                                return true;
                            }
                        }
                    },
                    function () { return current; },
                    function () { checkAndDispose(fe); }
                );
            });
        };        

        /**
         * Returns the first element in a sequence that satisfies a specified condition if specified, else the first element.
         *
         * @param {Function} [predicate] A function to test each element for a condition.
         * @returns {Any} The first element in the sequence that passes the test in the specified predicate function if specified, else the first element.
         */
        EnumerablePrototype.first = function (predicate) {
            var e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    var current = e.getCurrent();
                    if (!predicate || predicate(current))
                        return current;
                }
            } catch(ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }       
            throw new Error(seqNoElements);
        };

        /**
         * Returns the first element of the sequence that satisfies an optional condition or a default value if no such element is found.
         *
         * @param {Function} [predicate] A function to test each element for a condition.
         * @returns {Any} null if source is empty or if no element passes the test specified by predicate; otherwise, the first element in source that passes the test specified by predicate.
         */
        EnumerablePrototype.firstOrDefault = function (predicate) {
            var e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    var current = e.getCurrent();
                    if (!predicate || predicate(current)) {
                        return current;
                    }
                }
            } catch(ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }       
            return null;
        };

        /**
         * Performs the specified action on each element of the Enumerable sequence
         *
         * @example
         * sequence.forEach(function (item, index, seq) { console.log(item); });
         *
         * @param {Function} action The function to perform on each element of the Enumerable sequence.
         *  action is invoked with three arguments:
         *      the element value
         *      the element index
         *      the Enumerable sequence being traversed
         */
        EnumerablePrototype.forEach = function (action, thisArg) {
            var e = this.getEnumerator(), i = 0;
            try {
                while (e.moveNext()) {
                    action.call(thisArg, e.getCurrent(), i++, this);
                }
            } catch(ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
        };       

        /**
         * Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. 
         * Key values are compared by using a specified comparer, and the elements of each group are projected by using a specified function.
         *
         * @example
         * res = sequence.groupBy(keySelector);
         * res = sequence.groupBy(keySelector, elementSelector);
         * res = sequence.groupBy(keySelector, elementSelector, resultSelector);
         * res = sequence.groupBy(keySelector, elementSelector, resultSelector, comparer);              
         *
         * @param {Function} keySelector A function to extract the key for each element.
         * @param {Function} [elementSelector] A function to map each source element to an element in grouping.
         * @param {Function} [resultSelector] A function to create a result value from each group.
         * @param {Function} [comparer] An optional function to compare keys with.
         * @returns {Enumerable} A collection of elements where each element represents a projection over a group and its key.
         */
        EnumerablePrototype.groupBy = function (keySelector, elementSelector, resultSelector, comparer) {
            elementSelector || (elementSelector = identity);
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return new Enumerable(function () {
                var map = new Dictionary(0, comparer), keys = [], index = 0, value, key,
                    pe = parent.getEnumerator(), 
                    parentCurrent,
                    parentKey,
                    parentElement;
                try {
                    while (pe.moveNext()) {
                        parentCurrent = pe.getCurrent();
                        parentKey = keySelector(parentCurrent);
                        if (!map.has(parentKey)) {
                            map.add(parentKey, []);
                            keys.push(parentKey);
                        }
                        parentElement = elementSelector(parentCurrent);
                        map.get(parentKey).push(parentElement);
                    }                    
                } catch(ex) {
                    throw ex;
                } finally {
                    checkAndDispose(pe);
                }

                return enumeratorCreate(
                    function () {
                        var values;
                        if (index < keys.length) {
                            key = keys[index++];
                            values = enumerableFromArray(map.get(key));
                            if (!resultSelector) {
                                values.key = key;
                                value = values;
                            } else {
                                value = resultSelector(key, values);
                            }
                            return true;
                        }
                        return false;
                    },
                    function () { return value; }
                );
            });
        };

        /**
         * Correlates the elements of two sequences based on equality of keys and groups the results. 
         *
         * @param {Enumerable} inner The sequence to join to the first sequence.
         * @param {Function} outerKeySelector A function to extract the join key from each element of the first sequence.
         * @param {Function} innerKeySelector A function to extract the join key from each element of the second sequence.
         * @param {Function} resultSelector A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.
         * @param {Function} [comparer] An optional function to compare keys.
         * @returns {Enumerable} An Enumerable that contains elements that are obtained by performing a grouped join on two sequences.
         */
        EnumerablePrototype.groupJoin = function (inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
            var outer = this;
            comparer || (comparer = defaultEqualityComparer);
            return new Enumerable(function () {
                var e, lookup, current;

                return enumeratorCreate(
                    function () {
                        e || (e = outer.getEnumerator());
                        if (!lookup) {
                            lookup = inner.toLookup(innerKeySelector, identity, comparer);
                        }

                        if (!e.moveNext()) {
                            return false;
                        }

                        var c = e.getCurrent();
                        var innerElement = lookup.get(outerKeySelector(c));
                        current = resultSelector(c, innerElement);
                        return true;
                    },
                    function () { return current; }, 
                    function () { checkAndDispose(e); }
                );
            });
        };

        /** 
         * Correlates the elements of two sequences based on matching keys. 
         *
         * @param {Enumerable} inner The sequence to join to the first sequence.
         * @param {Function} outerKeySelector A function to extract the join key from each element of the first sequence.
         * @param {Function} innerKeySelector A function to extract the join key from each element of the second sequence.
         * @param {Function} resultSelector A function to create a result element from two matching elements.
         * @returns {Enumerable} An Enumerable that has elements that are obtained by performing an inner join on two sequences.
         */
        EnumerablePrototype.join = function(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
            var outer = this;
            comparer || (comparer = defaultEqualityComparer);

            return new Enumerable(function () {
                var e, current, lookup, innerElements, innerLength = 0;

                return enumeratorCreate(
                    function () {
                        e || (e = outer.getEnumerator());
                        if (!lookup) {
                            lookup = inner.toLookup(innerKeySelector, identity, comparer);
                        }

                        while (true) {
                            if (innerElements != null) {
                                var innerElement = innerElements[innerLength++];
                                if (innerElement) {
                                    current = resultSelector(e.getCurrent(), innerElement);
                                    return true;
                                }

                                innerElement = null;
                                innerLength = 0;
                            }

                            if (!e.moveNext()) {
                                return false;
                            }

                            var key = outerKeySelector(e.getCurrent());
                            innerElements = lookup.has(key) ? lookup.get(key).toArray() : [];
                        }
                    },
                    function () { return current; },
                    function () { checkAndDispose(e); }
                );
            });          
        };

        /**
         * Produces the set intersection of two sequences by using an optional comparer fuction to compare values.
         * @param {Enumerable} second An Enumerable whose distinct elements that also appear in the first sequence will be returned.
         * @param {Function} [comparer] A comparer function to compare values.
         * @returns {Enumerable} A sequence that contains the elements that form the set intersection of two sequences.
         */
        EnumerablePrototype.intersect = function(second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return new Enumerable(function () {
                var current,  map = [], se = second.getEnumerator(), fe;
                try {
                    while (se.moveNext()) {
                        map.push(se.getCurrent());
                    }                    
                } catch (ex) {
                    throw ex;
                } finally {
                    checkAndDispose(se);
                }
                return enumeratorCreate(
                    function () {
                        fe || (fe = parent.getEnumerator());
                        while (true) {
                            if (!fe.moveNext()) {
                                return false;
                            }
                            var c = fe.getCurrent();
                            if (arrayRemove.call(map, c, comparer)) {
                                current = c;
                                return true;
                            }
                        }
                    },
                    function () {
                        return current;
                    },
                    function () {
                        checkAndDispose(fe);
                    }
                );
            });
        };

        /**
         * Returns the last element of a sequence that satisfies an optional condition if specified, else the last element.
         * 
         * @example
         *   seq.last();
         *   seq.last(function (x) { return x % 2 === 0; });
         *         
         * @param {Function} [predicate] A function to test each element for a condition.
         * @returns {Any} The last element in the sequence that passes the test in the specified predicate function if specified, else the last element.
         */
        EnumerablePrototype.last = function (predicate) {
            var hasValue = false, value, e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    var current = e.getCurrent();
                    if (!predicate || predicate(current)) {
                        hasValue = true;
                        value = current;
                    }
                }
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }       
            if (hasValue) {
                return value;
            }
            throw new Error(seqNoElements);
        };

        /**
         * Returns the last element of a sequence that satisfies an optioanl condition or a null if no such element is found.
         * 
         * @example
         *   seq.lastOrDefault();
         *   seq.lastOrDefault(function (x) { return x % 2 === 0; });
         *
         * @param {Function} [predicate] A function to test each element for a condition.
         * @returns {Any} null if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function if specified, else the last element.
         */
        EnumerablePrototype.lastOrDefault = function (predicate) {
            var hasValue = false, value, e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    var current = e.getCurrent();
                    if (!predicate || predicate(current)) {
                        hasValue = true;
                        value = current;
                    }
                }
            } catch (ex) {
                throw ex;
            } finally {
                e.dispose();
            }

            return hasValue ? value : null;
        };

        /**
         * Invokes a transform function on each element of a generic sequence and returns the maximum resulting value.
         *
         * @param {Function} [selector] A transform function to apply to each element.
         * @returns {Any} The maximum value in the sequence.
         */ 
        EnumerablePrototype.max = function(selector) {
            if(selector) {
                return this.select(selector).max();
            }       
            var m, hasElement = false, e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    var x = e.getCurrent();
                    if (!hasElement) {
                        m = x;
                        hasElement = true;
                    } else {
                        if (x > m) {
                            m = x;
                        }
                    }
                }
            } catch (ex) {
                throw ex;
            } finally {
                e.dispose();
            }
            if(!hasElement) {
                throw new Error(seqNoElements);
            }
            return m;
        };        

        /**
         * Invokes an optional transform function on each element of a generic sequence and returns the minimum resulting value.
         *
         * @param {Function} [selector] A transform function to apply to each element.
         * @returns {Any} The minimum value in the sequence.
         */
        EnumerablePrototype.min = function(selector) {
            if(selector) {
                return this.select(selector).min();
            }       
            var m, hasElement = false, e = this.getEnumerator();
            try {
                while(e.moveNext()) {
                    var x = e.getCurrent();
                    if (!hasElement) {
                        m = x;
                        hasElement = true;
                    } else {
                        if (x < m) {
                            m = x;
                        }
                    }
                }
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
            if(!hasElement) {
                throw new Error(seqNoElements);
            }
            return m;
        };         

        /** 
         * Sorts the elements of a sequence in ascending order by using an optional comparer.
         *
         * @param {Function} keySelector A function to extract a key from an element.
         * @param {Function} [comparer] An optional comparer function to compare keys.
         * @returns {Enumerable} An Enumerable whose elements are sorted according to a key.
         */
        EnumerablePrototype.orderBy = function (keySelector, comparer) {
            return new OrderedEnumerable(this, keySelector, comparer, false);
        };

        /**
         * Sorts the elements of a sequence in descending order by using a specified comparer.
         * 
         * @param {Function} keySelector A function to extract a key from an element.
         * @param {Function} [comparer] An optional comparer function to compare keys.
         * @returns {Enumerable} An Enumerable whose elements are sorted in descending order according to a key.
         */
        EnumerablePrototype.orderByDescending = function (keySelector, comparer) {
            return new OrderedEnumerable(this, keySelector, comparer, true);
        };

        /** 
         * Inverts the order of the elements in a sequence.
         *
         * @returns {Enumerable} A sequence whose elements correspond to those of the input sequence in reverse order.
         */
        EnumerablePrototype.reverse = function () {
            var arr = [], e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    arr.unshift(e.getCurrent());
                }
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
            return enumerableFromArray(arr);
        };        

        /**
         * Projects each element of a sequence into a new form by incorporating the element's index.
         * 
         * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
         * @param {Any} [thisArg] An optional scope for the selector.
         * @returns {Enumerable} An Enumerable whose elements are the result of invoking the transform function on each element of source.
         */
        EnumerablePrototype.select = function (selector, thisArg) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, e;
                return enumeratorCreate(
                    function () {
                        e || (e = parent.getEnumerator());
                        if (!e.moveNext()) {
                            return false;
                        }
                        current = selector.call(thisArg, e.getCurrent(), index++, parent);
                        return true;
                    },
                    function () { return current; },
                    function () { checkAndDispose(e); }
                );
            });
        };

        /**
         * Projects each element of a sequence into a new form by incorporating the element's index.
         * 
         * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
         * @param {Any} [thisArg] An optional scope for the selector.
         * @returns {Enumerable} An Enumerable whose elements are the result of invoking the transform function on each element of source.
         */
        EnumerablePrototype.map = EnumerablePrototype.select;

        /**
         * Projects each element of a sequence to an Enumerable, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein. The index of each source element is used in the intermediate projected form of that element.
         * 
         * @example
         *   seq.selectMany(selector);
         *   seq.selectMany(collectionSelector, resultSelector);
         *
         * @param {Function} collectionSelector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
         * @param {Function} [resultSelector] An optional transform function to apply to each element of the intermediate sequence.
         * @returns {Enumerable} An Enumerable whose elements are the result of invoking the one-to-many transform function collectionSelector on each element of source and then mapping each of those sequence elements and their corresponding source element to a result element.
         */
        EnumerablePrototype.selectMany = function (collectionSelector, resultSelector) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, oe, ie;
                return enumeratorCreate(
                    function () {
                        oe || (oe = parent.getEnumerator());
                        while (true) {
                            if (!ie) {
                                if (!oe.moveNext()) {
                                    return false;
                                }

                                ie = collectionSelector(oe.getCurrent(), index++).getEnumerator();
                            }
                            if (ie.moveNext()) {
                                current = ie.getCurrent();
                                
                                if (resultSelector) {
                                    var o = oe.getCurrent();
                                    current = resultSelector(o, current);
                                }

                                return true;
                            } else {
                                checkAndDispose(ie);
                                ie = null;
                            }
                        }
                    },
                    function () { return current; },
                    function () {
                        checkAndDispose(ie);
                        checkAndDispose(oe);  
                    }
                );
            });
        };

        /** 
         * Determines whether two sequences are equal with an optional equality comparer
         * 
         * @param {Enumerable} first An Enumerable to compare to second.
         * @param {Enumerable} second An Enumerable to compare to the first sequence.
         * @param {Function} [comparer] An optional function to use to compare elements.
         * @returns {Boolean} true if the two source sequences are of equal length and their corresponding elements compare equal according to comparer; otherwise, false.
         */
        Enumerable.sequenceEqual = function (first, second, comparer) {
            return first.sequenceEqual(second, comparer);
        };

        /** 
         * Determines whether two sequences are equal with an optional equality comparer
         * 
         * @param {Enumerable} second An Enumerable to compare to the first sequence.
         * @param {Function} [comparer] An optional function to use to compare elements.
         * @returns {Boolean} true if the two source sequences are of equal length and their corresponding elements compare equal according to comparer; otherwise, false.
         */
        EnumerablePrototype.sequenceEqual = function (second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var e1 = this.getEnumerator(), e2 = second.getEnumerator();
            try {
                while (e1.moveNext()) {
                    if (!e2.moveNext() || ! comparer(e1.getCurrent(), e2.getCurrent())) {
                        return false;
                    }
                }
                if (e2.moveNext()) {
                    return false;
                }
                return true;
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e1);
                checkAndDispose(e2);
            }
        };

        /**
         * Returns the only element of a sequence that satisfies an optional condition, and throws an exception if more than one such element exists.
         * Or returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
         *
         * @example
         *   res = sequence.single();
         *   res = sequence.single(function (x) { return x % 2 === 0; });
         *
         * @param {Function} [predicate] A function to test an element for a condition.
         * @returns {Any} The single element of the input sequence that satisfies a condition if specified, else the first element.
         */
        EnumerablePrototype.single = function (predicate) {
            if (predicate) {
                return this.where(predicate).single();
            }
            var e = this.getEnumerator();
            try {
                if (!e.moveNext()) {
                    throw new Error(seqNoElements);
                }
                var current = e.getCurrent();
                if (e.moveNext()) {
                    throw new Error(invalidOperation);
                }
                return current;
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
        };

        /**
         * Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.
         * Or returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition
         *
         * @example
         *   res = sequence.singleOrDefault();
         *   res = sequence.singleOrDefault(function (x) { return x % 2 === 0; });
         *
         * @param {Function} [predicate] A function to test an element for a condition.
         * @returns {Any} The single element of the input sequence that satisfies the optional condition, or null if no such element is found.
         */
        EnumerablePrototype.singleOrDefault = function (predicate) {
            if (predicate) {
                return this.where(predicate).single();
            }
            var e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    var current = e.getCurrent();
                    if (e.moveNext()) {
                        throw new Error(invalidOperation);
                    }
                    return current;
                }
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
            return null;
        };        

        /** 
         * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
         *
         * @param {Number} count The number of elements to skip before returning the remaining element
         * @returns {Enumerable} An Enumerable that contains the elements that occur after the specified index in the input sequence.
         */
        EnumerablePrototype.skip = function (count) {
            var parent = this;
            return new Enumerable(function () {
                var current, skipped = false, e;
                return enumeratorCreate(
                    function () {
                        e || (e = parent.getEnumerator());
                        if (!skipped) {
                            for (var i = 0; i < count; i++) {
                                if (!e.moveNext()) {
                                    return false;
                                }
                            }
                            skipped = true;
                        }
                        if (!e.moveNext()) {
                            return false;
                        }
                        current = e.getCurrent();
                        return true;
                    },
                    function () { return current; },
                    function () { checkAndDispose(e); }
                );
            });
        };

        /**
         * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. The element's index is used in the logic of the predicate function.
         * 
         * @param {Function} selector A function to test each source element for a condition; the second parameter of the function represents the index of the source element; the third is the Enumerable source.
         * @param {Any} [thisArg] Object to use as this when executing selector.
         * @returns {Enumerable} An Enumerable that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
         */
        EnumerablePrototype.skipWhile = function (selector, thisArg) {
            var parent = this;
            return new Enumerable(function () {
                var current, skipped = false, e, index = 0;
                return enumeratorCreate(
                    function () {
                        e || (e = parent.getEnumerator());
                        if (!skipped) {
                            while (true) {
                                if (!e.moveNext()) {
                                    return false;
                                }
                                var c = e.getCurrent();
                                if (!selector.call(thisArg, c, index++, parent)) {
                                    current = c;
                                    return true;
                                }
                            }
                            skipped = true;
                        }
                        if (!e.moveNext()) {
                            return false;
                        }
                        current = e.getCurrent();
                        return true;
                    },
                    function () { return current;  },
                    function () { checkAndDispose(e); }
                );
            });
        };

        /**
         * Computes the sum of the sequence of values that are optionally obtained by invoking a transform function on each element of the input sequence.
         * 
         * @example
         *  res = source.sum();
         *  res = source.sum(function (x) { return x.value; });
         *
         * @param {Function} [selector] A transform function to apply to each element.
         * @returns {Any} The sum of the values.
         */
        EnumerablePrototype.sum = function(selector) {
            if(selector) {
                return this.select(selector).sum();
            }
            var s = 0, e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    s += e.getCurrent();
                }
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
            return s;
        };        

        /** 
         * Returns a specified number of contiguous elements from the start of a sequence.
         *
         * @param {Number} count The number of elements to return.
         * @returns {Enumerable} An Enumerable that contains the specified number of elements from the start of the input sequence.
         */
        EnumerablePrototype.take = function (count) {
            var parent = this;
            return new Enumerable(function () {
                var current, e, myCount = count;
                return enumeratorCreate(
                    function () {
                        e || (e = parent.getEnumerator());
                        if (myCount === 0) {
                            return false;
                        }
                        if (!e.moveNext()) {
                            myCount = 0;
                            return false;
                        }
                        myCount--;
                        current = e.getCurrent();
                        return true;
                    },
                    function () { return current; },
                    function () { checkAndDispose(e); }
                );
            });
        };

        /**
         * Returns elements from a sequence as long as a specified condition is true. The element's index is used in the logic of the predicate function.
         * 
         * @param {Function} selector A function to test each source element for a condition; the second parameter of the function represents the index of the source element; the third is the Enumerable source.
         * @param {Any} [thisArg] Object to use as this when executing selector.
         * @returns {Enumerable} An Enumerable that contains elements from the input sequence that occur before the element at which the test no longer passes.
         */
        EnumerablePrototype.takeWhile = function (selector, thisArg) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, e;
                return enumeratorCreate(
                    function () {
                        e || (e = parent.getEnumerator());
                        if (!e.moveNext()){
                            return false;
                        }
                        current = e.getCurrent();
                        if (!selector.call(thisArg, current, index++, parent)){
                            return false;
                        }
                        return true;
                    },
                    function () { return current; },
                    function () { checkAndDispose(e); }
                );
            });
        };        

        /**
         * Creates an array from an Enumerable
         *
         * @returns {Array} An array that contains the elements from the input sequence.
         */
        EnumerablePrototype.toArray = function () {
            var results = [],
                e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    results.push(e.getCurrent());
                }
                return results;
            } catch (e) {
                throw e;
            } finally {
                checkAndDispose(e);
            }
        };

        /**
         * Creates a Dictionary from an Enumerable according to a specified key selector function, a comparer, and an element selector function.
         * 
         * @example
         *  res = source.toDictionary(keySelector);
         *  res = source.toDictionary(keySelector, elementSelector);
         *  res = source.toDictionary(keySelector, elementSelector, comparer);         
         *
         * @param {Function} keySelector A function to extract a key from each element.
         * @param {Function} [elementSelector] A transform function to produce a result element value from each element.
         * @param {Function} [comparer] A function to compare keys.
         * @returns {Dictionary} A Dictionary that contains values selected from the input sequence.
         */
        EnumerablePrototype.toDictionary = function (keySelector, elementSelector, comparer) {
            elementSelector || (elementSelector = identity);
            comparer || (comparer = defaultEqualityComparer);
            var map = new Dictionary(0, comparer),
                e = this.getEnumerator(); 
            try {
                while (e.moveNext()) {
                    var c = e.getCurrent(),
                        key = keySelector(c);
                        elem = elementSelector(c);
                    map.add(key, elem);                    
                }
                return map;
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
        };

        /**
         * Creates a Lookup from an Enumerable according to a specified key selector function, a comparer and an element selector function.
         * 
         * @example
         *  res = source.toLookup(keySelector);
         *  res = source.toLookup(keySelector, elementSelector);
         *  res = source.toLookup(keySelector, elementSelector, comparer);         
         *
         * @param {Function} keySelector A function to extract a key from each element.
         * @param {Function} [elementSelector] A transform function to produce a result element value from each element.
         * @param {Function} [comparer] A function to compare keys.
         * @returns {Lookup} A Lookup that contains values selected from the input sequence.
         */
        EnumerablePrototype.toLookup = function (keySelector, elementSelector, comparer) {
            elementSelector || (elementSelector = identity);
            comparer || (comparer = defaultEqualityComparer);
            var map = new Dictionary(0, comparer),
                e = this.getEnumerator();
            try {
                while (e.moveNext()) {
                    var c = e.getCurrent(),
                        key = keySelector(c);
                        elem = elementSelector(c);
                    if (!map.has(key)) {
                        map.add(key, []);
                    }
                    map.get(key).push(elem);
                }
                return new Lookup(map);
            } catch (ex) {
                throw ex;
            } finally {
                checkAndDispose(e);
            }
        };

        /**
         * Creates a new Enumerable with all elements that pass the test implemented by the provided function.
         *
         * @param {Function} selector 
         *  selector is invoked with three arguments: 
         *      The value of the element
         *      The index of the element
         *      The Enumerable object being traversed
         * @param {Any} [thisArg] Object to use as this when executing selector.
         * @returns {Enumerable} An Enumerable that contains elements from the input sequence that satisfy the condition.
         */
        EnumerablePrototype.where = function (selector, thisArg) {
            var parent = this;
            return new Enumerable(function () {
                var current, index = 0, e;
                return enumeratorCreate(
                    function () {
                        e || (e = parent.getEnumerator());
                        while (true) {
                            if (!e.moveNext()) {
                                return false;
                            }
                            var c = e.getCurrent();
                            if (selector.call(thisArg, c, index++, parent)) {
                                current = c;
                                return true;
                            }
                        }
                    },
                    function () { return current; },
                    function () { checkAndDispose(e); }
                );
            });
        };

        /**
         * Creates a new Enumerable with all elements that pass the test implemented by the provided function.
         *
         * @param {Function} selector 
         *  selector is invoked with three arguments: 
         *      The value of the element
         *      The index of the element
         *      The Enumerable object being traversed
         * @param {Any} [thisArg] Object to use as this when executing selector.
         * @returns {Enumerable} An Enumerable that contains elements from the input sequence that satisfy the condition.
         */
        EnumerablePrototype.filter = EnumerablePrototype.where;

        /**
         * Produces the set union of two sequences with an optional equality comparer.
         *
         * @param {Enumerable} second An Enumerable whose distinct elements form the second set for the union.
         * @param {Function} [comparer] An optional function to compare values.
         * @returns {Enumerable} An Enumerable that contains the elements from both input sequences, excluding duplicates.
         */
        EnumerablePrototype.union = function(second, comparer) {
            comparer || (comparer = defaultEqualityComparer);
            var parent = this;
            return enumerableCreate(function () {
                var current, e, map = [], firstDone = false, secondDone = false;
                return enumeratorCreate(
                    function () {
                        while (true) {
                            if (!e) {
                                if (secondDone) {
                                    return false;
                                }
                                if (!firstDone) {
                                    e = parent.getEnumerator();
                                    firstDone = true;
                                } else {
                                    e = second.getEnumerator();
                                    secondDone = true;
                                }
                            }
                            if (e.moveNext()) {
                                current = e.getCurrent();
                                if (arrayIndexOf.call(map, current, comparer) === -1) {
                                    map.push(current);
                                    return true;
                                }
                            } else {
                                checkAndDispose(e);
                                e = null;
                            }
                        }
                    },
                    function () { return current; },
                    function () { checkAndDispose(e); }
                );
            });
        };          

        /**
         * Applies a specified function to the corresponding elements of two sequences, which produces a sequence of the results.
         *
         * @param {Enumerable} right The second sequence to merge.
         * @param {Function} selector A function that specifies how to merge the elements from the two sequences.
         * @returns {Enumerable} An Enumerable that contains merged elements of two input sequences.
         */
        EnumerablePrototype.zip = function (right, selector) {
            var parent = this;
            return new Enumerable(function () {
                var e1, e2, current;
                return enumeratorCreate(
                    function () {
                        if (!e1 && !e2) {
                            e1 = parent.getEnumerator();
                            e2 = right.getEnumerator();
                        }

                        if (e1.moveNext() && e2.moveNext()) {
                            current = selector(e1.getCurrent(), e2.getCurrent());
                            return true;
                        }
                        return false;
                    },
                    function () {
                        return current;
                    },
                    function () {
                        checkAndDispose(e1);
                        checkAndDispose(e2);
                    }
                );
            });
        };

        return Enumerable;
    }());

    /**
     * Concatenates all given sequences as arguments.
     *
     * @returns {Enumerable} An Enumerable that contains the concatenated elements of the input sequences.
     */
    var enumerableConcat = Enumerable.concat = function () {
        return enumerableFromArray(arguments).selectMany(identity);
    };

    /**
     * Creates an enumerable sequence based on an enumerator factory function. 
     *
     * @param {Function} getEnumerator Enumerator factory function.
     * @returns {Enumerable} Sequence that will invoke the enumerator factory upon a call to getEnumerator.
     */
    var enumerableCreate = Enumerable.create = function (getEnumerator) {
        return new Enumerable(getEnumerator);
    };

    /**
     * Returns an empty Enumerable.
     * 
     * @returns {Enumerable} An empty Enumerable
     */
    var enumerableEmpty = Enumerable.empty = function () {
        return new Enumerable(function () {
            return enumeratorCreate(
                function () { return false; },
                function () { throw new Error(seqNoElements); }
            );
        });
    };

    /**
     * Converts an Array to an Enumerable sequence
     *
     * @param {Array} An array to convert to an Enumerable sequence.
     * @returns {Enumerable} An Enumerable sequence created by the values in the array.
     */
    var enumerableFromArray = Enumerable.fromArray = function (array) {
        return new Enumerable(function () {
            var index = 0, value;
            return enumeratorCreate(
                function () {
                    if (index < array.length) {
                        value = array[index++];
                        return true;
                    }
                    return false;
                },
                function () {
                    return value;
                }
            );
        });
    };

    /**
     * Returns a sequence with a single element.
     * An alias for this method is returnValue for browsers <IE9.
     * @example
     *  var result = Enumerable.return(42);
     * @param {Any} value Single element of the resulting sequence.
     * @returns {Enumerable} Sequence with a single element.
     */
    var enumerableReturn = Enumerable['return'] = Enumerable.returnValue = function (value) {
        return new Enumerable(function () {
            var done = false;
            return enumeratorCreate(
                function () {
                    if (done) {
                        return false;
                    }
                    return done = true;
                },
                function () {
                    return value;
                }
            );
        });
    };

    /** 
     * Generates a sequence of integral numbers within a specified range.
     *
     * @param {Number} start The value of the first integer in the sequence.
     * @param {Number} count The number of sequential integers to generate.
     * @returns {Enumerable} An Enumerable that contains a range of sequential integral numbers.
     */
    var enumerableRange = Enumerable.range = function (start, count) {
        return new Enumerable(function () {
            var current = start - 1, end = start + count - 1;
            return enumeratorCreate(
                function () {
                    if (current < end) {
                        current++;
                        return true;
                    } else {
                        return false;
                    }
                },
                function () { return current; }
            );
        });
    };  

    /**
     * Generates a sequence that contains one repeated value.
     *
     * @param {Any} value The value to be repeated.
     * @param {Number} repeatCount The number of times to repeat the value in the generated sequence.
     * @returns {Enumerable} An Enumerable that contains a repeated value.
     */
    var enumerableRepeat = Enumerable.repeat = function (value, repeatCount) {
        return new Enumerable(function () {
            var count = repeatCount == null ? -1 : repeatCount, hasRepeatCount = repeatCount != null;
            return enumeratorCreate(
                function () {
                    if (count !== 0) {
                        hasRepeatCount && count--;
                        return true;
                    } else {
                        return false;
                    }
                },
                function () { return value; }
            );
        });
    };          

    function EnumerableSorter (keySelector, comparer, descending, next) {
        this.keySelector = keySelector;
        this.comparer = comparer;
        this.descending = descending;
        this.next = next;
    }

    EnumerableSorter.prototype = {
        computeKeys: function (elements, count) {
            this.keys = new Array(count);
            for (var i = 0; i < count; i++) { this.keys[i] = this.keySelector(elements[i]); }
            if (this.next) { this.next.computeKeys(elements, count); }
        },
        compareKeys: function (index1, index2) {
            var c = this.comparer(this.keys[index1], this.keys[index2]);
            if (c === 0) {
                return this.next == null ? index1 - index2 : this.next.compareKeys(index1, index2);
            }
            return this.descending ? -c : c;
        },
        sort: function (elements, count) {
            this.computeKeys(elements, count);
            var map = new Array(count);
            for (var i = 0; i < count; i++) { map[i] = i; }
            this.quickSort(map, 0, count - 1);
            return map;
        },
        quickSort: function (map, left, right) {
            do {
                var i = left;
                var j = right;
                var x = map[i + ((j - i) >> 1)];
                do {
                    while (i < map.length && this.compareKeys(x, map[i]) > 0) i++;
                    while (j >= 0 && this.compareKeys(x, map[j]) < 0) j--;
                    if (i > j) break;
                    if (i < j) {
                        var temp = map[i];
                        map[i] = map[j];
                        map[j] = temp;
                    }
                    i++;
                    j--;
                } while (i <= j);
                if (j - left <= right - i) {
                    if (left < j) this.quickSort(map, left, j);
                    left = i;
                }
                else {
                    if (i < right) this.quickSort(map, i, right);
                    right = j;
                }
            } while (left < right);
        }     
    };

    var OrderedEnumerable = (function () {
        inherits(OrderedEnumerable, Enumerable);
        function OrderedEnumerable (source, keySelector, comparer, descending) {
            this.source = source;
            this.keySelector = keySelector || identity;
            this.comparer = comparer || defaultComparer;
            this.descending = descending;
        }

        var OrderedEnumerablePrototype = OrderedEnumerable.prototype;
        OrderedEnumerablePrototype.getEnumerableSorter = function (next) {
            var sorter = new EnumerableSorter(this.keySelector, this.comparer, this.descending, next);
            if (this.parent != null) {
                sorter = this.parent.getEnumerableSorter(sorter);
            }
            return sorter;
        };

        OrderedEnumerablePrototype.createOrderedEnumerable = function (keySelector, comparer, descending) {
            var e = new OrderedEnumerable(this.source, keySelector, comparer, descending);
            e.parent = this;
            return e;
        };

        OrderedEnumerablePrototype.getEnumerator = function () {
            var buffer = this.source.toArray(),
                length = buffer.length,
                sorter = this.getEnumerableSorter(),
                map = sorter.sort(buffer, length),
                index = 0,
                current;

            return enumeratorCreate(function () {
                if (index < length) {
                    current = buffer[map[index++]];
                    return true;
                }
                return false;
            }, function () {
                return current;
            });
        };

        OrderedEnumerablePrototype.thenBy = function (keySelector, comparer) {
            return this.createOrderedEnumerable(keySelector, null, false);
        };

        OrderedEnumerablePrototype.thenByDescending = function (keySelector, comparer) {
            return this.createOrderedEnumerable(keySelector, comparer, false);
        };

        return OrderedEnumerable;
    }());
    
    // Check for AMD
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        window.Ix = Ix;
        return define(function () {
            return Ix;
        });
    } else if (freeExports) {
        if (typeof module == 'object' && module && module.exports == freeExports) {
            module.exports = Ix;
        } else {
            freeExports = Ix;
        }
    } else {
        window.Ix = Ix;
    }
    
}(this));