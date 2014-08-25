// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.

(function (root, factory) {
    var freeExports = typeof exports == 'object' && exports &&
    (typeof root == 'object' && root && root == root.global && (window = root), exports);

    // Because of build optimizers
    if (typeof define === 'function' && define.amd) {
        define(['Ix', 'exports'], function (Ix, exports) {
            root.Ix = factory(root, exports, Ix);
            return root.Ix;
        });
    } else if (typeof module == 'object' && module && module.exports == freeExports) {
        module.exports = factory(root, module.exports, require('./l2o'));
    } else {
        root.Ix = factory(root, {}, root.Ix);
    }
}(this, function (global, exp, root, undefined) {
    
    var isEqual = root.Internals.isEqual;
    function noop () { }
    function identity (x) { return x; }
    function defaultComparer (x, y) { return x > y ? 1 : x < y ? -1 : 0; }
    function defaultEqualityComparer (x, y) { return isEqual(x, y); }

    function arrayIndexOf(key, comparer) {
        comparer || (comparer = defaultEqualityComparer);
        for (var i = 0, len = this.length; i < len; i++) {
            if (comparer(key, this[i])) {
                return i;
            }
        }
        return -1;
    }

    var seqNoElements = 'Sequence contains no elements.';
    var objectDisposed = 'Object disposed';
    var slice = Array.prototype.slice;

    var Enumerable = root.Enumerable,
        EnumerablePrototype = Enumerable.prototype,
        enumerableConcat = Enumerable.concat,
        enumerableEmpty = Enumerable.empty,
        enumerableFromArray = Enumerable.fromArray,
        enumerableRepeat = Enumerable.repeat,
        enumeratorCreate = root.Enumerator.create
        inherits = root.Internals.inherits;

    /** 
     * Determines whether an enumerable sequence is empty.
     * @return {Boolean} true if the sequence is empty; false otherwise.
     */
    EnumerablePrototype.isEmpty = function () {
        return !this.any();
    };

    function extremaBy (source, keySelector, comparer) {
        var result = [], e = source.getEnumerator();
        try {
            if (!e.moveNext()) { throw new Error(seqNoElements); }

            var current = e.getCurrent(),
                resKey = keySelector(current);
            result.push(current);

            while (e.moveNext()) {
                var cur = e.getCurrent(),
                    key = keySelector(cur),
                    cmp = comparer(key, resKey);
                if (cmp === 0) {
                    result.push(cur);
                } else if (cmp > 0) {
                    result = [cur];
                    resKey = key;
                }
            }
        } finally {
            e.dispose();
        }

        return enumerableFromArray(result);
    }

    /**
     * Returns the elements with the minimum key value by using the specified comparer to compare key values.
     * @param keySelector Key selector used to extract the key for each element in the sequence.
     * @param comparer Comparer used to determine the minimum key value.
     * @return List with the elements that share the same minimum key value.
     */
    EnumerablePrototype.minBy = function (keySelector, comparer) {
        comparer || (comparer = defaultComparer);
        return extremaBy(this, keySelector, function (key, minValue) {
            return -comparer(key, minValue);
        });
    };

    /**
     * Returns the elements with the minimum key value by using the specified comparer to compare key values.
     * @param keySelector Key selector used to extract the key for each element in the sequence.
     * @param comparer Comparer used to determine the maximum key value.
     * @return List with the elements that share the same maximum key value.
     */
    EnumerablePrototype.maxBy = function (keySelector, comparer) {
        comparer || (comparer = defaultComparer);
        return extremaBy(this, keySelector, comparer);  
    };

    var SharedBuffer = (function () {
        inherits(SharedBuffer, Enumerable);

        function SharedBuffer (source) {
            this.disposed = false;
            this.source = source;
        }

        SharedBuffer.prototype.getEnumerator = function () {
            if (this.disposed) {
                throw new Error('Object disposed');
            }

            var current, self = this;
            return enumeratorCreate(
                function () {
                    if (self.source.moveNext()) {
                        current = self.source.getCurrent();
                        return true;
                    }
                    return false;
                },
                function () { return current; });
        };

        SharedBuffer.prototype.dispose = function () {
            if (!this.disposed) {
                this.disposed = true;
                this.source.dispose();
                this.source = null;
            }
        };

        return SharedBuffer;
    }());

    /**
     * Shares the source sequence within a selector function where each enumerator can fetch the next element from the source sequence.
     * 
     * var rng = Enumerable.range(0, 10).share();
     * 
     * var e1 = rng.getEnumerator();    // Both e1 and e2 will consume elements from
     * var e2 = rng.getEnumerator();    // the source sequence.
     * 
     * ok(e1.moveNext());
     * equal(0, e1.getCurrent());
     * 
     * ok(e1.moveNext());
     * equal(1, e1.getCurrent());
     * 
     * ok(e2.moveNext());    // e2 "steals" element 2
     * equal(2, e2.getCurrent());
     * 
     * ok(e1.moveNext());    // e1 can't see element 2
     * equal(3, e1.getCurrent());
     * 
     * @param {Function} [selector] Selector function with shared access to the source sequence for each enumerator.
     * @return Sequence resulting from applying the selector function to the shared view over the source sequence.
     */
    EnumerablePrototype.share = function (selector) {
        var source = this;
        return !selector ? 
            new SharedBuffer(source.getEnumerator()) :
            new Enumerable(function () { return selector(source.share()).getEnumerator(); });
    };

    function RefCountList(readerCount) {
        this.readerCount = readerCount;
        this.list = {};
        this.length = 0;
    }

    var RefCountListPrototype = RefCountList.prototype;
    RefCountListPrototype.clear = function () {
        this.list = {};
        this.length = 0;
    };

    RefCountListPrototype.get = function (i) {
        if (!this.list[i]) {
            throw new Error('Element no longer available in the buffer.');
        }
        var res = this.list[i];
        if (--res.length === 0) { delete this.list[i]; }
        return res.value;
    };

    RefCountListPrototype.push = function (item) {
        this.list[this.length] = { value: item, length: this.readerCount };
        this.length++;
    };

    RefCountListPrototype.done = function (index) {      
        for (var i = index; i < this.length; i++) {
            this.get(i);
        }
        this.readerCount--;
    };

    var PublishedBuffer = (function () {
        inherits(PublishedBuffer, Enumerable);

        function PublishedBuffer(source) {
            this.source = source;
            this.buffer = new RefCountList(0);
            this.disposed = false;
            this.stopped = false;
            this.error = null;
        }

        function getEnumerator(i) {
            var currentValue, self = this, isDisposed = false, isFirst = true, isDone = false;
            return enumeratorCreate(
                function () {
                    if (self.disposed) { throw new Error('Object disposed'); }
                    if (!isFirst) { i++; }
                    var hasValue = false, current;
                    if (i >= self.buffer.length) {
                        if (!self.stopped) {
                            try {
                                hasValue = self.source.moveNext();
                                if (hasValue) { current = self.source.getCurrent(); }

                            } catch (e) {
                                self.stopped = true;
                                self.error = e;
                                self.source.dispose();
                                isDisposed = true;
                            }
                        }

                        if (self.stopped) {
                            if (self.error) {
                                self.buffer && self.buffer.done(i + 1);
                                isDone = true;
                                throw self.error;
                            } else {
                                self.buffer && self.buffer.done(i + 1);
                                isDone = true;
                                return false;
                            }
                        }

                        if (hasValue) {
                            self.buffer.push(current);
                        }
                    } else {
                        hasValue = true;
                    }

                    if (hasValue) {
                        currentValue = self.buffer.get(i);
                        isFirst = false;
                        return true;
                    } else {
                        self.buffer && self.buffer.done(i + 1);
                        isDone = true;
                        return false;
                    }
                }, 
                function () { return currentValue; }, 
                function () { isDone && self.buffer && self.buffer.done(i); }
            );
        }

        PublishedBuffer.prototype.getEnumerator = function () {
            if (this.disposed) {
                throw new Error('Object disposed'); 
            }
            var i = this.buffer.length;
            this.buffer.readerCount++;
            return getEnumerator.call(this, i);
        };

        PublishedBuffer.prototype.dispose = function () {
            if (!this.disposed) {
                this.source.dispose();
                this.source = null;
                this.buffer.clear();
                this.buffer = null;
                this.disposed = true;
            }
        };

        return PublishedBuffer;
    }());

    /**
     * Publishes the source sequence within a selector function where each enumerator can obtain a view over a tail of the source sequence.
     *
     * var rng = Enumerable.Range(0, 10).Publish();
     * 
     * var e1 = rng.getEnumerator();    // e1 has a view on the source starting from element 0
     * 
     * ok(e1.moveNext());
     * equal(0, e1.getCurrent());
     * 
     * ok(e1.moveNext());
     * equal(1, e1.getCurrent());
     * 
     * var e2 = rng.getEnumerator();
     * 
     * ok(e2.moveNext());    // e2 has a view on the source starting from element 2
     * equal(2, e2.getCurrent());
     * 
     * ok(e1.moveNext());    // e1 continues to enumerate over its view
     * equal(2, e1.getCurrent());
     * 
     * @param selector Selector function with published access to the source sequence for each enumerator.
     * @return Sequence resulting from applying the selector function to the published view over the source sequence.
     */
    EnumerablePrototype.publish = function (selector) {
        var source = this;
        return !selector ? 
            new PublishedBuffer(source.getEnumerator()) :
            new Enumerable(function () { return selector(source.publish()).getEnumerator(); });
    };

    function MaxRefCountList() {
        this.list = [];
        this.length = 0;
    }

    var MaxRefCountListPrototype = MaxRefCountList.prototype;
    MaxRefCountListPrototype.done = noop;
    MaxRefCountListPrototype.push = function (item) {
        this.list[this.length++] = item;
    };

    MaxRefCountListPrototype.clear = function () {
        this.list = [];
        this.length = 0;
    };

    MaxRefCountListPrototype.get = function (i) { 
        return this.list[i]; 
    };

    var MemoizedBuffer = (function () {
        inherits(MemoizedBuffer, Enumerable);

        function MemoizedBuffer(source, buffer) {
            this.source = source;
            this.buffer = buffer
            this.stopped = false;
            this.error = null;
            this.disposed = false;
        }

        MemoizedBuffer.prototype.getEnumerator = function () {
            if (this.disposed) {
                throw new Error('Object disposed'); 
            }

            var i = 0, currentValue, self = this, isDisposed = false, isFirst = true, isDone = false;
            return enumeratorCreate(
                function () {
                    if (self.disposed) { throw new Error('Object disposed'); }
                    if (!isFirst) { i++; }
                    var hasValue = false, current;
                    if (i >= self.buffer.length) {
                        if (!self.stopped) {
                            try {
                                hasValue = self.source.moveNext();
                                if (hasValue) { current = self.source.getCurrent(); }

                            } catch (e) {
                                self.stopped = true;
                                self.error = e;
                                self.source.dispose();
                                isDisposed = true;
                            }
                        }

                        if (self.stopped) {
                            if (self.error) {
                                self.buffer && self.buffer.done(i + 1);
                                isDone = true;
                                throw self.error;
                            } else {
                                self.buffer && self.buffer.done(i + 1);
                                isDone = true;
                                return false;
                            }
                        }

                        if (hasValue) {
                            self.buffer.push(current);
                        }
                    } else {
                        hasValue = true;
                    }

                    if (hasValue) {
                        currentValue = self.buffer.get(i);
                        isFirst = false;
                        return true;
                    } else {
                        self.buffer && self.buffer.done(i + 1);
                        isDone = true;
                        return false;
                    }
                }, 
                function () { return currentValue; }, 
                function () { isDone && self.buffer && self.buffer.done(i); }
            );
        };

        MemoizedBuffer.prototype.dispose = function () {
            if (!this.disposed) {
                this.source.dispose();
                this.source = null;
                this.buffer.clear();
                this.buffer = null;
                this.disposed = true;
            }
        };

        return MemoizedBuffer;
    }());

    /**
     * Memoizes the source sequence within a selector function where a specified number of enumerators can get access to all of the sequence's elements without causing multiple enumerations over the source.
     *
     * var rng = Enumerable.range(0, 10).doAction(function (x) { console.log(x); }).memoize();
     * 
     * var e1 = rng.getEnumerator();
     * 
     * ok(e1.moveNext());    // Prints 0
     * equal(0, e1.getCurrent());
     * 
     * ok(e1.moveNext());    // Prints 1
     * equal(1, e1.getCurrent());
     * 
     * var e2 = rng.getEnumerator();
     * 
     * ok(e2.moveNext());    // Doesn't print anything; the side-effect of Do
     * equal(0, e2.getCurrent());  // has already taken place during e1's iteration.
     * 
     * ok(e1.moveNext());    // Prints 2
     * equal(2, e1.getCurrent());
     *
     * @param readerCount Number of enumerators that can access the underlying buffer. Once every enumerator has obtained an element from the buffer, the element is removed from the buffer.
     * @param selector Selector function with memoized access to the source sequence for a specified number of enumerators.
     * @return Sequence resulting from applying the selector function to the memoized view over the source sequence.
     */
    EnumerablePrototype.memoize = function () {
        var source = this;
        if (arguments.length === 0) {
            return new MemoizedBuffer(source.getEnumerator(), new MaxRefCountList());
        } else if (arguments.length === 1 && typeof arguments[0] === 'function') {
            return new Enumerable(function () { return arguments[1](source.memoize()).getEnumerator(); });
        } else if (arguments.length === 1 && typeof arguments[0] === 'number') {
            return new MemoizedBuffer(source.getEnumerator(), new RefCountList(arguments[0]));
        } else {
            return new Enumerable(function () { return arguments[1](source.memoize(arguments[0])).getEnumerator(); });
        }
    };
    

    /**
     * Returns a sequence that throws an exception upon enumeration.  An alias for this method is throwException for <IE9.
     * @example
     *  var result = Enumerable.throw(new Error('error'));
     * @param {Object} exception Exception to throw upon enumerating the resulting sequence.
     * @returns {Enumerable} Sequence that throws the specified exception upon enumeration.
     */
    Enumerable['throw'] = Enumerable.throwException = function (value) {
        return new Enumerable(function () {
            return enumeratorCreate(
                function () { throw value; },
                noop);
        });
    };

    /**
     * Creates an enumerable sequence based on an enumerable factory function.
     * @example
     *  var result = Enumerable.defer(function () { return Enumerable.range(0, 10); });
     * @param {Function} enumerableFactory Enumerable factory function.
     * @returns {Enumerable} Sequence that will invoke the enumerable factory upon a call to GetEnumerator.
     */
    var enumerableDefer = Enumerable.defer = function (enumerableFactory) {
        return new Enumerable(function () {
            var enumerator;
            return enumeratorCreate(function () {
                enumerator || (enumerator = enumerableFactory().getEnumerator());
                return enumerator.moveNext();
            }, function () {
                return enumerator.getCurrent();
            }, function () {
                enumerator.dispose();
            });
        });
    };

    /**
     * Generates a sequence by mimicking a for loop.
     * @example
     *  var result = Enumerable.generate(
     *      0,
     *      function (x) { return x < 10; },
     *      function (x) { return x + 1; },
     *      function (x) { return x * x });
     * @param {Any} initialState Initial state of the generator loop.
     * @param {Function} condition Loop condition.
     * @param {Function} iterate State update function to run after every iteration of the generator loop.
     * @param {Function} resultSelector Result selector to compute resulting sequence elements.
     * @returns {Enumerable} Sequence obtained by running the generator loop, yielding computed elements.
     */
    Enumerable.generate = function (initialState, condition, iterate, resultSelector) {
        return new Enumerable(function () {
            var state, current, initialized = false;
            return enumeratorCreate(function () {
                if (!initialized) {
                    state = initialState;
                    initialized = true;
                } else {
                    state = iterate(state);
                    if (!condition(state)) {
                        return false;
                    }
                }
                current = resultSelector(state);
                return true;
            }, function () { return current; });
        });
    };

    /**
     * Generates a sequence that's dependent on a resource object whose lifetime is determined by the sequence usage duration.
     * @example
     *  var result = Enumerable.using(function () { return new QuerySource(); }, function (x) { return x.get(42); });
     * @param {Function} resourceFactory Resource factory function.
     * @param {Function} enumerableFactory Enumerable factory function, having access to the obtained resource.
     * @returns {Enumerable} Sequence whose use controls the lifetime of the associated obtained resource.
     */
    Enumerable.using = function (resourceFactory, enumerableFactory) {
        return new Enumerable(function () {
            var current, first = true, e, res;
            return enumeratorCreate(function () {
                if (first) {
                    res = resourceFactory();
                    e = enumerableFactory(res).getEnumerator();
                    first = false;
                }
                if (!e.moveNext()) {
                    return false;
                }

                current = e.getCurrent();
                return true;
            }, function () {
                return current;
            }, function () {
                e && e.dispose();
                res && res.dispose();
            });
        });
    };

    function functionBind(f, context) {
        return function () {
            f.apply(context, arguments);
        };
    }

    /**
     * Lazily invokes an action for each value in the sequence, and executes an action upon successful or exceptional termination.
     * There is an alias for this method doAction for browsers <IE9.
     * @example
     * e.do(onNext);
     * e.do(onNext, onError);
     * e.do(onNExt, onError, onCompleted);
     * e.do(observer);

     * @param onNext Action to invoke for each element or Observer.
     * @param onError Action to invoke on exceptional termination of the sequence.
     * @param onCompleted Action to invoke on successful termination of the sequence.
     * @returns {Enumerable} Sequence exhibiting the specified side-effects upon enumeration.
     */
    EnumerablePrototype['do'] = EnumerablePrototype.doAction = function (onNext, onError, onCompleted) {
        var oN, oE, oC, self = this;
        if (typeof onNext === 'object') {
            oN = functionBind(onNext.onNext, onNext);
            oE = functionBind(onNext.onError, onNext);
            oC = functionBind(onNext.onCompleted, onNext);
        } else {
            oN = onNext; 
            oE = onError || noop;
            oC = onCompleted || noop;
        }
        return new Enumerable(function () {
            var e, done, current;
            return enumeratorCreate(
                function () {
                    e || (e = self.getEnumerator());
                    try {
                        if (!e.moveNext()) {
                            oC();
                            return false; 
                        }
                        current = e.getCurrent();
                    } catch (e) {
                        oE(e);
                        throw e;
                    }
                    oN(current);
                    return true;
                },
                function () { return current; }, 
                function () { e && e.dispose(); }
            );
        });
    };
    
    /**
     * Generates a sequence of buffers over the source sequence, with specified length and possible overlap.
     * @example
     *  var result = Enumerable.range(0, 10).bufferWithCount(2);
     *  var result = Enumerable.range(0, 10).bufferWithCount(5, 1);
     * @param {Number} count Number of elements for allocated buffers.
     * @param {Number} [skip] Number of elements to skip between the start of consecutive buffers.
     * @returns {Enumerable} Sequence of buffers containing source sequence elements.
     */
    EnumerablePrototype.bufferWithCount = function (count, skip) {
        var parent = this;
        if (skip == null) { skip = count; }
        return new Enumerable(function () {
            var buffers = [], i = 0, e, current;
            return enumeratorCreate(
                function () {
                    e || (e = parent.getEnumerator());
                    while (true) {
                        if (e.moveNext()) {
                            if (i % skip === 0) {
                                buffers.push([]);
                            }

                            for (var idx = 0, len = buffers.length; idx < len; idx++) {
                                buffers[idx].push(e.getCurrent());
                            }

                            if (buffers.length > 0 && buffers[0].length === count) {
                                current = Enumerable.fromArray(buffers.shift());
                                ++i;
                                return true;
                            }

                            ++i;
                        } else {
                             if (buffers.length > 0) {
                                current = Enumerable.fromArray(buffers.shift());
                                return true;
                            }
                            return false; 
                        }
                    }
                },
                function () { return current; },
                function () { e.dispose(); });
        });
    };

    /**
     * Ignores all elements in the source sequence.
     * @returns {Enumerable} Source sequence without its elements.
     */
    EnumerablePrototype.ignoreElements = function() {
        var parent = this;
        return new Enumerable(function () {
            var e;
            return enumeratorCreate(
                function () {
                    e = parent.getEnumerator();
                    while (e.moveNext()) { }
                    return false;
                },
                function () {
                    throw new Error('Operation is not valid due to the current state of the object.');
                },
                function () { e.dispose(); }
            );
        });
    };

    /**
     * Returns elements with a distinct key value by using the specified equality comparer to compare key values.
     * @param keySelector Key selector.
     * @param comparer Comparer used to compare key values.
     * @returns {Enumerable} Sequence that contains the elements from the source sequence with distinct key values.
     */
    EnumerablePrototype.distinctBy = function(keySelector, comparer) {
        comparer || (comparer = defaultEqualityComparer);
        var parent = this;
        return new Enumerable(function () {
            var current, map = [], e;
            return enumeratorCreate(
                function () {
                    e || (e = parent.getEnumerator());
                    while (true) {
                        if (!e.moveNext()) { return false; }
                        var item = e.getCurrent(), key = keySelector(item);
                        if (arrayIndexOf.call(map, key, comparer) === -1) {
                            map.push(item);
                            current = item;
                            return true;
                        }
                    }
                },
                function () { return current; },
                function () { e && e.dispose(); }
            );
        });
    };

    /**
     * Returns consecutive distinct elements based on a key value by using the specified equality comparer to compare key values.
     * @param keySelector Key selector.
     * @param comparer Comparer used to compare key values.
     * @returns {Enumerable} Sequence without adjacent non-distinct elements.
     */
    EnumerablePrototype.distinctUntilChanged = function (keySelector, comparer) {
        keySelector || (keySelector = identity);
        comparer || (comparer = defaultEqualityComparer);
        var parent = this;
        return new Enumerable(function () {
            var current, e, currentKey, hasCurrentKey;
            return enumeratorCreate(
                function () {
                    e || (e = parent.getEnumerator());
                    while (true) {
                        if (!e.moveNext()) {
                            return false;
                        }
                        var item = e.getCurrent(),
                            key = keySelector(item),
                            comparerEquals = false;
                        if (hasCurrentKey) {
                            comparerEquals = comparer(currentKey, key);
                        }
                        if (!hasCurrentKey || !comparerEquals) {
                            current = item;
                            currentKey = key;
                            hasCurrentKey = true;
                            return true;
                        }
                    }
                },
                function () { return current; },
                function () { e && e.dispose(); });
        });
    };

    /**
     * Expands the sequence by recursively applying a selector function.
     * @param selector Selector function to retrieve the next sequence to expand.
     * @returns {Enumerable} Sequence with results from the recursive expansion of the source sequence.
     */
    EnumerablePrototype.expand = function(selector) {
        var parent = this;
        return new Enumerable(function () {
            var current, q = [parent], inner;
            return enumeratorCreate(
                function () {
                    while (true) {
                        if (!inner) {
                            if (q.length === 0) { return false; }
                            inner = q.shift().getEnumerator();
                        }
                        if (inner.moveNext()) {
                            current = inner.getCurrent();
                            q.push(selector(current));
                            return true;
                        } else {
                            inner.dispose();
                            inner = null;
                        }
                    }
                },
                function () { return current; },
                function () { inner && inner.dispose(); }
            );
        });
    };

    /**
     * Returns the source sequence prefixed with the specified value.
     * @param values Values to prefix the sequence with.
     * @returns {Enumerable} Sequence starting with the specified prefix value, followed by the source sequence.
     */
    EnumerablePrototype.startWith = function () {
        return enumerableConcat(enumerableFromArray(slice.call(arguments)), this);
    };

    function scan (seed, accumulator) {
        var source = this;
        return new Enumerable(function () {
            var current, e, acc = seed;
            return enumeratorCreate(
                function () {
                    e || (e = source.getEnumerator());
                    if (!e.moveNext()) { return false; }
                    var item = e.getCurrent();
                    acc = accumulator(acc, item);
                    current = acc;
                    return true;
                },
                function () { return current; },
                function () { e && e.dispose(); }
            );
        });
    }

    function scan1 (accumulator) {
        var source = this;
        return new Enumerable(function () {
            var current, e, acc, hasSeed = false;
            return enumeratorCreate(
                function () {
                    e || (e = source.getEnumerator());
                    
                    while(true) {
                        if (!e.moveNext()) { return false; }
                        var item = e.getCurrent();

                        if (!hasSeed) {
                            hasSeed = true;
                            acc = item;
                            continue;
                        }

                        acc = accumulator(acc, item);
                        current = acc;
                        return true;
                    }

                },
                function () { return current; },
                function () { e && e.dispose(); }
            );
        });
    } 

    /**
     * Generates a sequence of accumulated values by scanning the source sequence and applying an accumulator function.
     * @param seed Accumulator seed value.
     * @param accumulator Accumulation function to apply to the current accumulation value and each element of the sequence.
     * @returns {Enumerable} Sequence with all intermediate accumulation values resulting from scanning the sequence.
     */
    EnumerablePrototype.scan = function (/* seed, accumulator */) {
        var f = arguments.length === 1 ? scan1 : scan;
        return f.apply(this, arguments);
    };

    /**
     * Returns a specified number of contiguous elements from the end of the sequence.
     * @param count The number of elements to take from the end of the sequence.
     * @returns {Enumerable} Sequence with the specified number of elements counting from the end of the source sequence.
     */
    EnumerablePrototype.takeLast = function (count) {
        var parent = this;
        return new Enumerable(function () {
            var current, e, q;
            return enumeratorCreate(
                function () {
                    e || (e = parent.getEnumerator());
                    if (!q) {
                        q = [];
                        while (e.moveNext()) {
                            q.push(e.getCurrent());
                            if (q.length > count) {
                                q.shift();
                            }
                        }
                    }
                    if (q.length === 0) {
                        return false;
                    }
                    current = q.shift();
                    return true;
                },
                function () { return current; },
                function () { e && e.dispose(); }
            );
        });
    };

    /**
     * Bypasses a specified number of contiguous elements from the end of the sequence and returns the remaining elements.
     * @param count The number of elements to skip from the end of the sequence before returning the remaining elements.
     * @returns {Enumerable} Sequence bypassing the specified number of elements counting from the end of the source sequence.
     */
    EnumerablePrototype.skipLast = function (count) {
        var parent = this;
        return new Enumerable(function () {
            var current, e, q = [];
            return enumeratorCreate(
                function () {
                    e || (e = parent.getEnumerator());
                    while (true) {
                        if (!e.moveNext()) {
                            return false;
                        }
                        q.push(e.getCurrent());
                        if (q.length > count) {
                            current = q.shift();
                            return true;
                        }
                    }
                },
                function () { return current; },
                function () { e && e.dispose(); }
            );
        });
    };

    /**
     * Repeats and concatenates the source sequence the given number of times.
     * @param count Number of times to repeat the source sequence.
     * @returns {Enumerable} Sequence obtained by concatenating the source sequence to itself the specified number of times.
     */
    EnumerablePrototype.repeat = function (count) {
        var parent = this;
        return enumerableRepeat(0, count).selectMany(function () { return parent; });
    };     

    function catchExceptionHandler (source, handler) {
        return new Enumerable(function () {
            var current, e, errE;
            return enumeratorCreate(
                function () {
                    e || (e = source.getEnumerator());

                    while (true) {
                        var b, c;
                        try {
                            b = e.moveNext();
                            c = e.getCurrent();
                        } catch (e) {
                            errE = handler(e);
                            break;
                        }

                        if (!b) {
                            return false;
                        }

                        current = c;
                        return true;
                    }

                    if (errE) {
                        e.dispose();
                        e = errE.getEnumerator();
                        if (!e.moveNext()) { return false; }
                        current = e.getCurrent();
                        return true;
                    }
                }, 
                function () { return current; }, 
                function () {
                    e && e.dispose();
                });
        });
    }

    /**
     * Creates a sequence that returns the elements of the first sequence, switching to the second in case of an error.
     * An alias for this method is catchException for browsers <IE9.
     * @param second Second sequence, concatenated to the result in case the first sequence completes exceptionally or handler to invoke when an exception of the specified type occurs.
     * @returns {Enumerable} The first sequence, followed by the second sequence in case an error is produced.
     */
    EnumerablePrototype['catch'] = EnumerablePrototype.catchException = function (secondOrHandler) {
        if (arguments.length === 0) {
            return enumerableCatch(this); // Already IE<IE<T>>
        } else if (typeof secondOrHandler === 'function') {
            return catchExceptionHandler(this, secondOrHandler); // use handler
        } else {
            var args = slice.call(arguments);
            args.unshift(this);
            return enumerableCatch.apply(null, args); // create IE<IE<T>>
        }
    };

    /**
     * Creates a sequence by concatenating source sequences until a source sequence completes successfully.
     * An alias for this method is catchException for browsers <IE9.
     * @returns {Enumerable} Sequence that continues to concatenate source sequences while errors occur.
     */
    var enumerableCatch = Enumerable['catch'] = Enumerable.catchException = function () {
        // Check arguments
        var sources = Enumerable.fromArray(arguments);
        return new Enumerable(function () {
            var outerE, hasOuter, innerE, current, error;
            return enumeratorCreate(
                function () {
                    outerE || (outerE = sources.getEnumerator());
                    while (true) {

                        while (true) {
                            if (!innerE) {
                                if (!outerE.moveNext()) {
                                    if (error) { throw error; }
                                    return false;
                                } else {
                                    error = null;
                                }

                                innerE = outerE.getCurrent().getEnumerator();
                            }

                            var b, c;
                            try {
                                b = innerE.moveNext();
                                c = innerE.getCurrent();
                            } catch (e) {
                                error = e;
                                innerE.dispose();
                                innerE = null;
                                break;
                            }

                            if (!b) {
                                innerE.dispose();
                                innerE = null;
                                break;
                            }

                            current = c;
                            return true;
                        }

                        if (error == null) {
                            break;
                        }
                    }   
                },
                function () {
                    return current;
                },
                function () {
                    innerE && innerE.dispose();
                    outerE && outerE.dispose();
                }
            );
        });
    };

    /**
     * Creates a sequence whose termination or disposal of an enumerator causes a finally action to be executed.
     * An alias for this method is finallyDo for browsers <IE9.
     * @example
     *  var result = Enumerable.range(1, 10).finally(function () { console.log('done!'); });
     * @param {Function} finallyAction Action to run upon termination of the sequence, or when an enumerator is disposed.
     * @returns {Enumerable} Source sequence with guarantees on the invocation of the finally action.
     */
    EnumerablePrototype['finally'] = EnumerablePrototype.finallyDo = function (finallyAction) {
        var parent = this;
        return new Enumerable(function () {
            var e, finallyCalled = false;
            return enumeratorCreate(
                function () { 
                    e || (e = parent.getEnumerator());

                    var next;
                    try {
                        next = e.moveNext();
                        if (!next) {
                            finallyAction();
                            finallyCalled = true;
                            return false;
                        }
                        return next;                       
                    } catch (e) {
                        finallyAction();
                        finallyCalled = true;
                        throw e;
                    }
                },
                function () { return e.getCurrent(); },
                function () {
                    !finallyCalled && finallyAction();
                    e && e.dispose();
                }
            );
        });
    };

    /**
     * Creates a sequence that concatenates both given sequences, regardless of whether an error occurs.
     * @param {Enumerable} second Second sequence.
     * @returns {Enumerable} Sequence concatenating the elements of both sequences, ignoring errors.
     */
    EnumerablePrototype.onErrorResumeNext = function (second) {
        return onErrorResumeNext.apply(null, [this, second]);
    };

    /**
     * Creates a sequence that concatenates the given sequences, regardless of whether an error occurs in any of the sequences.
     * @returns {Enumerable} Sequence concatenating the elements of the given sequences, ignoring errors.
     */
    var onErrorResumeNext = Enumerable.onErrorResumeNext = function () {
        var sources = arguments;
        return new Enumerable(function () {
            var current, index = 0, inner;
            return enumeratorCreate(function () {
                while (index < sources.length) {
                    inner || (inner = sources[index].getEnumerator());
                    try {
                        var result = inner.moveNext();
                        if (result) {
                            current = inner.getCurrent();
                            return true;
                        }
                    }
                    catch (e) { }
                    inner.dispose();
                    inner = null;
                    index++;
                }
                return false;
            },
            function () { return current; },
            function () { inner && inner.dispose(); });
        });
    };

    /**
     * Creates a sequence that retries enumerating the source sequence as long as an error occurs, with the specified maximum number of retries.
     * @param {Number} retryCount Maximum number of retries.
     * @returns {Enumerable} Sequence concatenating the results of the source sequence as long as an error occurs.
     */
    EnumerablePrototype.retry = function (retryCount) {
        var parent = this;
        return new Enumerable(function () {
            var current, e, count = retryCount, hasCount = retryCount != null;
            return enumeratorCreate(
                function () {
                    e || (e = parent.getEnumerator());
                    while (true) {
                        try {
                            if (e.moveNext()) {
                                current = e.getCurrent();
                                return true;
                            } else {
                                return false;
                            }
                        }
                        catch (err) {
                            if (hasCount && --count === 0) {
                                throw err;
                            } else {
                                e = parent.getEnumerator(); // retry again
                                error = null;
                            }
                        }
                    }
                },
                function () { return current; },
                function () { e.dispose(); }
            );
        });
    };
    /**
     * Generates an enumerable sequence by repeating a source sequence as long as the given loop condition holds.
     * An alias for this method is whileDo for browsers <IE9.
     * @example
     *  var result = Enumerable.while(function () { return true; }, Enumerable.range(1, 10));
     * @param {Function} condition Loop condition.
     * @param {Enumerable} source Sequence to repeat while the condition evaluates true.
     * @returns {Enumerable} Sequence generated by repeating the given sequence while the condition evaluates to true.
     */    
    var enumerableWhileDo = Enumerable['while'] = Enumerable.whileDo = function (condition, source) {
        return enumerableRepeat(source).takeWhile(condition).selectMany(identity);
    };

    /**
     * Returns an enumerable sequence based on the evaluation result of the given condition.
     * An alias for this method is ifThen for browsers <IE9
     * @example
     *  var result = Enumerable.if(function () { return true; }, Enumerable.range(0, 10));
     *  var result = Enumerable.if(function () { return false; }, Enumerable.range(0, 10), Enumerable.return(42));
     * @param {Function} condition Condition to evaluate.
     * @param {Enumerable} thenSource Sequence to return in case the condition evaluates true.
     * @param {Enumerable} [elseSource] Optional sequence to return in case the condition evaluates false; else an empty sequence.
     * @return Either of the two input sequences based on the result of evaluating the condition.
     */
    Enumerable['if'] = Enumerable.ifThen = function (condition, thenSource, elseSource) {
        elseSource || (elseSource = enumerableEmpty());
        return enumerableDefer(function () { return condition() ? thenSource : elseSource; });
    };

    /**
     * Generates an enumerable sequence by repeating a source sequence as long as the given loop postcondition holds.
     * @example
     *  var result = Enumerable.doWhile(Enumerable.range(0, 10), function () { return true; });
     * @param {Enumerable} source Source sequence to repeat while the condition evaluates true.
     * @param {Function} condition Loop condition.
     * @returns {Enumerable} Sequence generated by repeating the given sequence until the condition evaluates to false.
     */
    Enumerable.doWhile = function (source, condition) {
        return source.concat(enumerableWhileDo(condition, source));
    };

    /**
     * Returns a sequence from a dictionary based on the result of evaluating a selector function, also specifying a default sequence.
     * An alias for this method is switchCase for browsers <IE9.
     * @example
     *  var result = Enumerable.case(function (x) { return x; }, {1: 42, 2: 25});
     *  var result = Enumerable.case(function (x) { return x; }, {1: 42, 2: 25}, Enumerable.return(56));
     * @param {Function} selector Selector function used to pick a sequence from the given sources.
     * @param {Object} sources Dictionary mapping selector values onto resulting sequences.
     * @param {Enumerable} [defaultSource] Default sequence to return in case there's no corresponding source for the computed selector value; if not provided defaults to empty Enumerable.
     * @returns {Enumerable} The source sequence corresponding with the evaluated selector value; otherwise, the default source.
     */
    Enumerable['case'] = Enumerable.switchCase = function (selector, sources, defaultSource) {
        defaultSource || (defaultSource = enumerableEmpty());
        return enumerableDefer(function () {
            var result = sources[selector()]
            if (!result) {
                result = defaultSource;
            }
            return result;
        });
    };

    /**
     * Generates a sequence by enumerating a source sequence, mapping its elements on result sequences, and concatenating those sequences.
     * An alias for this method is forIn for browsers <IE9.
     * @example
     *  var result = Enumerable.for(Enumerable.range(0, 10), function (x) { return Enumerable.return(x); });
     * @param {Enumerable} source Source sequence.
     * @param {Function} resultSelector Result selector to evaluate for each iteration over the source.
     * @return {Enumerable} Sequence concatenating the inner sequences that result from evaluating the result selector on elements from the source.
     */
    Enumerable['for'] = Enumerable.forIn = function (source, resultSelector) {
        return source.select(resultSelector);
    };

    return root;
}));