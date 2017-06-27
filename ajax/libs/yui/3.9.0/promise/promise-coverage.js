if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/promise/promise.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/promise/promise.js",
    code: []
};
_yuitest_coverage["build/promise/promise.js"].code=["YUI.add('promise', function (Y, NAME) {","","/**","Wraps the execution of asynchronous operations, providing a promise object that","can be used to subscribe to the various ways the operation may terminate.","","When the operation completes successfully, call the Resolver's `fulfill()`","method, passing any relevant response data for subscribers.  If the operation","encounters an error or is unsuccessful in some way, call `reject()`, again","passing any relevant data for subscribers.","","The Resolver object should be shared only with the code resposible for","resolving or rejecting it. Public access for the Resolver is through its","_promise_, which is returned from the Resolver's `promise` property. While both","Resolver and promise allow subscriptions to the Resolver's state changes, the","promise may be exposed to non-controlling code. It is the preferable interface","for adding subscriptions.","","Subscribe to state changes in the Resolver with the promise's","`then(callback, errback)` method.  `then()` wraps the passed callbacks in a","new Resolver and returns the corresponding promise, allowing chaining of","asynchronous or synchronous operations. E.g.","`promise.then(someAsyncFunc).then(anotherAsyncFunc)`","","@module promise","@since 3.9.0","**/","","/**","A promise represents a value that may not yet be available. Promises allow","you to chain asynchronous operations, write synchronous looking code and","handle errors throughout the process.","","This constructor takes a function as a parameter where you can insert the logic","that fulfills or rejects this promise. The fulfillment value and the rejection","reason can be any JavaScript value. It's encouraged that rejection reasons be","error objects","","<pre><code>","var fulfilled = new Y.Promise(function (fulfill) {","    fulfill('I am a fulfilled promise');","});","","var rejected = new Y.Promise(function (fulfill, reject) {","    reject(new Error('I am a rejected promise'));","});","</code></pre>","","@class Promise","@constructor","@param {Function} fn A function where to insert the logic that resolves this","        promise. Receives `fulfill` and `reject` functions as parameters.","        This function is called synchronously.","**/","function Promise(fn) {","    if (!(this instanceof Promise)) {","        return new Promise(fn);","    }","","    var resolver = new Promise.Resolver(this);","","    /**","    A reference to the resolver object that handles this promise","    ","    @property _resolver","    @type Object","    @private","    */","    this._resolver = resolver;","","    fn.call(this, function (value) {","        resolver.fulfill(value);","    }, function (reason) {","        resolver.reject(reason);","    });","}","","Y.mix(Promise.prototype, {","    /**","    Schedule execution of a callback to either or both of \"fulfill\" and","    \"reject\" resolutions for this promise. The callbacks are wrapped in a new","    promise and that promise is returned.  This allows operation chaining ala","    `functionA().then(functionB).then(functionC)` where `functionA` returns","    a promise, and `functionB` and `functionC` _may_ return promises.","","    Asynchronicity of the callbacks is guaranteed.","","    @method then","    @param {Function} [callback] function to execute if the promise","                resolves successfully","    @param {Function} [errback] function to execute if the promise","                resolves unsuccessfully","    @return {Promise} A promise wrapping the resolution of either \"resolve\" or","                \"reject\" callback","    **/","    then: function (callback, errback) {","        return this._resolver.then(callback, errback);","    },","","    /**","    Returns the current status of the operation. Possible results are","    \"pending\", \"fulfilled\", and \"rejected\".","","    @method getStatus","    @return {String}","    **/","    getStatus: function () {","        return this._resolver.getStatus();","    }","});","","/**","Checks if an object or value is a promise. This is cross-implementation","compatible, so promises returned from other libraries or native components","that are compatible with the Promises A+ spec should be recognized by this","method.","","@method isPromise","@param {Any} obj The object to test","@return {Boolean} Whether the object is a promise or not","@static","**/","Promise.isPromise = function (obj) {","    // We test promises by form to be able to identify other implementations","    // as promises. This is important for cross compatibility and in particular","    // Y.when which should take any kind of promise","    return !!obj && typeof obj.then === 'function';","};","","Y.Promise = Promise;","/**","Represents an asynchronous operation. Provides a","standard API for subscribing to the moment that the operation completes either","successfully (`fulfill()`) or unsuccessfully (`reject()`).","","@class Promise.Resolver","@constructor","@param {Promise} promise The promise instance this resolver will be handling","**/","function Resolver(promise) {","    /**","    List of success callbacks","","    @property _callbacks","    @type Array","    @private","    **/","    this._callbacks = [];","","    /**","    List of failure callbacks","","    @property _errbacks","    @type Array","    @private","    **/","    this._errbacks = [];","","    /**","    The promise for this Resolver.","","    @property promise","    @type Promise","    **/","    this.promise = promise;","","    /**","    The status of the operation. This property may take only one of the following","    values: 'pending', 'fulfilled' or 'rejected'.","","    @property _status","    @type String","    @default 'pending'","    @private","    **/","    this._status = 'pending';","}","","Y.mix(Resolver.prototype, {","    /**","    Resolves the promise, signaling successful completion of the","    represented operation. All \"onFulfilled\" subscriptions are executed and passed","    the value provided to this method. After calling `fulfill()`, `reject()` and","    `notify()` are disabled.","","    @method fulfill","    @param {Any} value Value to pass along to the \"onFulfilled\" subscribers","    **/","    fulfill: function (value) {","        if (this._status === 'pending') {","            this._result = value;","        }","","        if (this._status !== 'rejected') {","            this._notify(this._callbacks, this._result);","","            // Reset the callback list so that future calls to fulfill()","            // won't call the same callbacks again. Promises keep a list","            // of callbacks, they're not the same as events. In practice,","            // calls to fulfill() after the first one should not be made by","            // the user but by then()","            this._callbacks = [];","","            // Once a promise gets fulfilled it can't be rejected, so","            // there is no point in keeping the list. Remove it to help","            // garbage collection","            this._errbacks = null;","","            this._status = 'fulfilled';","        }","    },","","    /**","    Resolves the promise, signaling *un*successful completion of the","    represented operation. All \"onRejected\" subscriptions are executed with","    the value provided to this method. After calling `reject()`, `resolve()`","    and `notify()` are disabled.","","    @method reject","    @param {Any} value Value to pass along to the \"reject\" subscribers","    **/","    reject: function (reason) {","        if (this._status === 'pending') {","            this._result = reason;","        }","","        if (this._status !== 'fulfilled') {","            this._notify(this._errbacks, this._result);","","            // See fulfill()","            this._callbacks = null;","            this._errbacks = [];","","            this._status = 'rejected';","        }","    },","","    /**","    Schedule execution of a callback to either or both of \"resolve\" and","    \"reject\" resolutions for the Resolver.  The callbacks","    are wrapped in a new Resolver and that Resolver's corresponding promise","    is returned.  This allows operation chaining ala","    `functionA().then(functionB).then(functionC)` where `functionA` returns","    a promise, and `functionB` and `functionC` _may_ return promises.","","    @method then","    @param {Function} [callback] function to execute if the Resolver","                resolves successfully","    @param {Function} [errback] function to execute if the Resolver","                resolves unsuccessfully","    @return {Promise} The promise of a new Resolver wrapping the resolution","                of either \"resolve\" or \"reject\" callback","    **/","    then: function (callback, errback) {","        // When the current promise is fulfilled or rejected, either the","        // callback or errback will be executed via the function pushed onto","        // this._callbacks or this._errbacks.  However, to allow then()","        // chaining, the execution of either function needs to be represented","        // by a Resolver (the same Resolver can represent both flow paths), and","        // its promise returned.","        var promise = this.promise,","            thenFulfill, thenReject,","","            // using promise constructor allows for customized promises to be","            // returned instead of plain ones","            then = new promise.constructor(function (fulfill, reject) {","                thenFulfill = fulfill;","                thenReject = reject;","            }),","","            callbackList = this._callbacks || [],","            errbackList  = this._errbacks  || [];","","        // Because the callback and errback are represented by a Resolver, it","        // must be fulfilled or rejected to propagate through the then() chain.","        // The same logic applies to resolve() and reject() for fulfillment.","        callbackList.push(typeof callback === 'function' ?","            this._wrap(thenFulfill, thenReject, callback) : thenFulfill);","        errbackList.push(typeof errback === 'function' ?","            this._wrap(thenFulfill, thenReject, errback) : thenReject);","","        // If a promise is already fulfilled or rejected, notify the newly added","        // callbacks by calling fulfill() or reject()","        if (this._status === 'fulfilled') {","            this.fulfill(this._result);","        } else if (this._status === 'rejected') {","            this.reject(this._result);","        }","","        return then;","    },","","    /**","    Wraps the callback in Y.soon to guarantee its asynchronous execution. It","    also catches exceptions to turn them into rejections and links promises","    returned from the `then` callback.","","    @method _wrap","    @param {Function} thenFulfill Fulfillment function of the resolver that","                        handles this promise","    @param {Function} thenReject Rejection function of the resolver that","                        handles this promise","    @param {Function} fn Callback to wrap","    @return {Function}","    @private","    **/","    _wrap: function (thenFulfill, thenReject, fn) {","        var promise = this.promise;","","        return function () {","            // The args coming in to the callback/errback from the","            // resolution of the parent promise.","            var args = arguments;","","            // Wrapping all callbacks in Y.soon to guarantee","            // asynchronicity. Because setTimeout can cause unnecessary","            // delays that *can* become noticeable in some situations","            // (especially in Node.js)","            Y.soon(function () {","                // Call the callback/errback with promise as `this` to","                // preserve the contract that access to the deferred is","                // only for code that may resolve/reject it.","                // Another option would be call the function from the","                // global context, but it seemed less useful.","                var result;","","                // Promises model exception handling through callbacks","                // making both synchronous and asynchronous errors behave","                // the same way","                try {","                    result = fn.apply(promise, args);","                } catch (e) {","                    return thenReject(e);","                }","","                if (Promise.isPromise(result)) {","                    // Returning a promise from a callback makes the current","                    // promise sync up with the returned promise","                    result.then(thenFulfill, thenReject);","                } else {","                    // Non-promise return values always trigger resolve()","                    // because callback is affirmative, and errback is","                    // recovery.  To continue on the rejection path, errbacks","                    // must return rejected promises or throw.","                    thenFulfill(result);","                }","            });","        };","    },","","    /**","    Returns the current status of the Resolver as a string \"pending\",","    \"fulfilled\", or \"rejected\".","","    @method getStatus","    @return {String}","    **/","    getStatus: function () {","        return this._status;","    },","","    /**","    Executes an array of callbacks from a specified context, passing a set of","    arguments.","","    @method _notify","    @param {Function[]} subs The array of subscriber callbacks","    @param {Any} result Value to pass the callbacks","    @protected","    **/","    _notify: function (subs, result) {","        var i, len;","","        for (i = 0, len = subs.length; i < len; ++i) {","            subs[i](result);","        }","    }","","}, true);","","Y.Promise.Resolver = Resolver;","/**","Abstraction API allowing you to interact with promises or raw values as if they","were promises. If a non-promise object is passed in, a new Resolver is created","and scheduled to resolve asynchronously with the provided value.","","In either case, a promise is returned.  If either _callback_ or _errback_ are","provided, the promise returned is the one returned from calling","`promise.then(callback, errback)` on the provided or created promise.  If neither","are provided, the original promise is returned.","","@for YUI","@method when","@param {Any} promise Promise object or value to wrap in a resolved promise","@param {Function} [callback] callback to execute if the promise is resolved","@param {Function} [errback] callback to execute if the promise is rejected","@return {Promise}","**/","Y.when = function (promise, callback, errback) {","    var value;","","    if (!Y.Promise.isPromise(promise)) {","        value = promise;","","        promise = new Y.Promise(function (fulfill) {","            fulfill(value);","        });","    }","","    return (callback || errback) ? promise.then(callback, errback) : promise;","};","/**","Adds a `Y.batch()` method to wrap any number of callbacks or promises in a","single promise that will be resolved when all callbacks and/or promises have completed.","","@module promise","**/","","var slice = [].slice;","","/**","Returns a new promise that will be resolved when all operations have completed.","Takes both callbacks and promises as arguments. If an argument is a callback,","it will be wrapped in a new promise.","","@for YUI","@method batch","@param {Function|Promise} operation* Any number of functions or Y.Promise","            objects","@return {Promise}","**/","Y.batch = function () {","    var funcs     = slice.call(arguments),","        remaining = funcs.length,","        i         = 0,","        length    = funcs.length,","        results   = [];","","    return new Y.Promise(function (fulfill, reject) {","        var allDone = this;","","        function oneDone(index) {","            return function (value) {","                results[index] = value;","","                remaining--;","","                if (!remaining && allDone.getStatus() !== 'rejected') {","                    fulfill(results);","                }","            };","        }","","        if (length < 1) {","            return fulfill(results);","        }","","        for (; i < length; i++) {","            Y.when(funcs[i], oneDone(i), reject);","        }","    });","};","","","}, '@VERSION@', {\"requires\": [\"timers\"]});"];
_yuitest_coverage["build/promise/promise.js"].lines = {"1":0,"55":0,"56":0,"57":0,"60":0,"69":0,"71":0,"72":0,"74":0,"78":0,"97":0,"108":0,"123":0,"127":0,"130":0,"140":0,"148":0,"157":0,"165":0,"176":0,"179":0,"190":0,"191":0,"194":0,"195":0,"202":0,"207":0,"209":0,"223":0,"224":0,"227":0,"228":0,"231":0,"232":0,"234":0,"261":0,"267":0,"268":0,"277":0,"279":0,"284":0,"285":0,"286":0,"287":0,"290":0,"308":0,"310":0,"313":0,"319":0,"325":0,"330":0,"331":0,"333":0,"336":0,"339":0,"345":0,"359":0,"372":0,"374":0,"375":0,"381":0,"399":0,"400":0,"402":0,"403":0,"405":0,"406":0,"410":0,"419":0,"432":0,"433":0,"439":0,"440":0,"442":0,"443":0,"444":0,"446":0,"448":0,"449":0,"454":0,"455":0,"458":0,"459":0};
_yuitest_coverage["build/promise/promise.js"].functions = {"(anonymous 2):71":0,"(anonymous 3):73":0,"Promise:55":0,"then:96":0,"getStatus:107":0,"isPromise:123":0,"Resolver:140":0,"fulfill:189":0,"reject:222":0,"(anonymous 4):266":0,"then:254":0,"(anonymous 6):319":0,"(anonymous 5):310":0,"_wrap:307":0,"getStatus:358":0,"_notify:371":0,"(anonymous 7):405":0,"when:399":0,"(anonymous 9):443":0,"oneDone:442":0,"(anonymous 8):439":0,"batch:432":0,"(anonymous 1):1":0};
_yuitest_coverage["build/promise/promise.js"].coveredLines = 83;
_yuitest_coverage["build/promise/promise.js"].coveredFunctions = 23;
_yuitest_coverline("build/promise/promise.js", 1);
YUI.add('promise', function (Y, NAME) {

/**
Wraps the execution of asynchronous operations, providing a promise object that
can be used to subscribe to the various ways the operation may terminate.

When the operation completes successfully, call the Resolver's `fulfill()`
method, passing any relevant response data for subscribers.  If the operation
encounters an error or is unsuccessful in some way, call `reject()`, again
passing any relevant data for subscribers.

The Resolver object should be shared only with the code resposible for
resolving or rejecting it. Public access for the Resolver is through its
_promise_, which is returned from the Resolver's `promise` property. While both
Resolver and promise allow subscriptions to the Resolver's state changes, the
promise may be exposed to non-controlling code. It is the preferable interface
for adding subscriptions.

Subscribe to state changes in the Resolver with the promise's
`then(callback, errback)` method.  `then()` wraps the passed callbacks in a
new Resolver and returns the corresponding promise, allowing chaining of
asynchronous or synchronous operations. E.g.
`promise.then(someAsyncFunc).then(anotherAsyncFunc)`

@module promise
@since 3.9.0
**/

/**
A promise represents a value that may not yet be available. Promises allow
you to chain asynchronous operations, write synchronous looking code and
handle errors throughout the process.

This constructor takes a function as a parameter where you can insert the logic
that fulfills or rejects this promise. The fulfillment value and the rejection
reason can be any JavaScript value. It's encouraged that rejection reasons be
error objects

<pre><code>
var fulfilled = new Y.Promise(function (fulfill) {
    fulfill('I am a fulfilled promise');
});

var rejected = new Y.Promise(function (fulfill, reject) {
    reject(new Error('I am a rejected promise'));
});
</code></pre>

@class Promise
@constructor
@param {Function} fn A function where to insert the logic that resolves this
        promise. Receives `fulfill` and `reject` functions as parameters.
        This function is called synchronously.
**/
_yuitest_coverfunc("build/promise/promise.js", "(anonymous 1)", 1);
_yuitest_coverline("build/promise/promise.js", 55);
function Promise(fn) {
    _yuitest_coverfunc("build/promise/promise.js", "Promise", 55);
_yuitest_coverline("build/promise/promise.js", 56);
if (!(this instanceof Promise)) {
        _yuitest_coverline("build/promise/promise.js", 57);
return new Promise(fn);
    }

    _yuitest_coverline("build/promise/promise.js", 60);
var resolver = new Promise.Resolver(this);

    /**
    A reference to the resolver object that handles this promise
    
    @property _resolver
    @type Object
    @private
    */
    _yuitest_coverline("build/promise/promise.js", 69);
this._resolver = resolver;

    _yuitest_coverline("build/promise/promise.js", 71);
fn.call(this, function (value) {
        _yuitest_coverfunc("build/promise/promise.js", "(anonymous 2)", 71);
_yuitest_coverline("build/promise/promise.js", 72);
resolver.fulfill(value);
    }, function (reason) {
        _yuitest_coverfunc("build/promise/promise.js", "(anonymous 3)", 73);
_yuitest_coverline("build/promise/promise.js", 74);
resolver.reject(reason);
    });
}

_yuitest_coverline("build/promise/promise.js", 78);
Y.mix(Promise.prototype, {
    /**
    Schedule execution of a callback to either or both of "fulfill" and
    "reject" resolutions for this promise. The callbacks are wrapped in a new
    promise and that promise is returned.  This allows operation chaining ala
    `functionA().then(functionB).then(functionC)` where `functionA` returns
    a promise, and `functionB` and `functionC` _may_ return promises.

    Asynchronicity of the callbacks is guaranteed.

    @method then
    @param {Function} [callback] function to execute if the promise
                resolves successfully
    @param {Function} [errback] function to execute if the promise
                resolves unsuccessfully
    @return {Promise} A promise wrapping the resolution of either "resolve" or
                "reject" callback
    **/
    then: function (callback, errback) {
        _yuitest_coverfunc("build/promise/promise.js", "then", 96);
_yuitest_coverline("build/promise/promise.js", 97);
return this._resolver.then(callback, errback);
    },

    /**
    Returns the current status of the operation. Possible results are
    "pending", "fulfilled", and "rejected".

    @method getStatus
    @return {String}
    **/
    getStatus: function () {
        _yuitest_coverfunc("build/promise/promise.js", "getStatus", 107);
_yuitest_coverline("build/promise/promise.js", 108);
return this._resolver.getStatus();
    }
});

/**
Checks if an object or value is a promise. This is cross-implementation
compatible, so promises returned from other libraries or native components
that are compatible with the Promises A+ spec should be recognized by this
method.

@method isPromise
@param {Any} obj The object to test
@return {Boolean} Whether the object is a promise or not
@static
**/
_yuitest_coverline("build/promise/promise.js", 123);
Promise.isPromise = function (obj) {
    // We test promises by form to be able to identify other implementations
    // as promises. This is important for cross compatibility and in particular
    // Y.when which should take any kind of promise
    _yuitest_coverfunc("build/promise/promise.js", "isPromise", 123);
_yuitest_coverline("build/promise/promise.js", 127);
return !!obj && typeof obj.then === 'function';
};

_yuitest_coverline("build/promise/promise.js", 130);
Y.Promise = Promise;
/**
Represents an asynchronous operation. Provides a
standard API for subscribing to the moment that the operation completes either
successfully (`fulfill()`) or unsuccessfully (`reject()`).

@class Promise.Resolver
@constructor
@param {Promise} promise The promise instance this resolver will be handling
**/
_yuitest_coverline("build/promise/promise.js", 140);
function Resolver(promise) {
    /**
    List of success callbacks

    @property _callbacks
    @type Array
    @private
    **/
    _yuitest_coverfunc("build/promise/promise.js", "Resolver", 140);
_yuitest_coverline("build/promise/promise.js", 148);
this._callbacks = [];

    /**
    List of failure callbacks

    @property _errbacks
    @type Array
    @private
    **/
    _yuitest_coverline("build/promise/promise.js", 157);
this._errbacks = [];

    /**
    The promise for this Resolver.

    @property promise
    @type Promise
    **/
    _yuitest_coverline("build/promise/promise.js", 165);
this.promise = promise;

    /**
    The status of the operation. This property may take only one of the following
    values: 'pending', 'fulfilled' or 'rejected'.

    @property _status
    @type String
    @default 'pending'
    @private
    **/
    _yuitest_coverline("build/promise/promise.js", 176);
this._status = 'pending';
}

_yuitest_coverline("build/promise/promise.js", 179);
Y.mix(Resolver.prototype, {
    /**
    Resolves the promise, signaling successful completion of the
    represented operation. All "onFulfilled" subscriptions are executed and passed
    the value provided to this method. After calling `fulfill()`, `reject()` and
    `notify()` are disabled.

    @method fulfill
    @param {Any} value Value to pass along to the "onFulfilled" subscribers
    **/
    fulfill: function (value) {
        _yuitest_coverfunc("build/promise/promise.js", "fulfill", 189);
_yuitest_coverline("build/promise/promise.js", 190);
if (this._status === 'pending') {
            _yuitest_coverline("build/promise/promise.js", 191);
this._result = value;
        }

        _yuitest_coverline("build/promise/promise.js", 194);
if (this._status !== 'rejected') {
            _yuitest_coverline("build/promise/promise.js", 195);
this._notify(this._callbacks, this._result);

            // Reset the callback list so that future calls to fulfill()
            // won't call the same callbacks again. Promises keep a list
            // of callbacks, they're not the same as events. In practice,
            // calls to fulfill() after the first one should not be made by
            // the user but by then()
            _yuitest_coverline("build/promise/promise.js", 202);
this._callbacks = [];

            // Once a promise gets fulfilled it can't be rejected, so
            // there is no point in keeping the list. Remove it to help
            // garbage collection
            _yuitest_coverline("build/promise/promise.js", 207);
this._errbacks = null;

            _yuitest_coverline("build/promise/promise.js", 209);
this._status = 'fulfilled';
        }
    },

    /**
    Resolves the promise, signaling *un*successful completion of the
    represented operation. All "onRejected" subscriptions are executed with
    the value provided to this method. After calling `reject()`, `resolve()`
    and `notify()` are disabled.

    @method reject
    @param {Any} value Value to pass along to the "reject" subscribers
    **/
    reject: function (reason) {
        _yuitest_coverfunc("build/promise/promise.js", "reject", 222);
_yuitest_coverline("build/promise/promise.js", 223);
if (this._status === 'pending') {
            _yuitest_coverline("build/promise/promise.js", 224);
this._result = reason;
        }

        _yuitest_coverline("build/promise/promise.js", 227);
if (this._status !== 'fulfilled') {
            _yuitest_coverline("build/promise/promise.js", 228);
this._notify(this._errbacks, this._result);

            // See fulfill()
            _yuitest_coverline("build/promise/promise.js", 231);
this._callbacks = null;
            _yuitest_coverline("build/promise/promise.js", 232);
this._errbacks = [];

            _yuitest_coverline("build/promise/promise.js", 234);
this._status = 'rejected';
        }
    },

    /**
    Schedule execution of a callback to either or both of "resolve" and
    "reject" resolutions for the Resolver.  The callbacks
    are wrapped in a new Resolver and that Resolver's corresponding promise
    is returned.  This allows operation chaining ala
    `functionA().then(functionB).then(functionC)` where `functionA` returns
    a promise, and `functionB` and `functionC` _may_ return promises.

    @method then
    @param {Function} [callback] function to execute if the Resolver
                resolves successfully
    @param {Function} [errback] function to execute if the Resolver
                resolves unsuccessfully
    @return {Promise} The promise of a new Resolver wrapping the resolution
                of either "resolve" or "reject" callback
    **/
    then: function (callback, errback) {
        // When the current promise is fulfilled or rejected, either the
        // callback or errback will be executed via the function pushed onto
        // this._callbacks or this._errbacks.  However, to allow then()
        // chaining, the execution of either function needs to be represented
        // by a Resolver (the same Resolver can represent both flow paths), and
        // its promise returned.
        _yuitest_coverfunc("build/promise/promise.js", "then", 254);
_yuitest_coverline("build/promise/promise.js", 261);
var promise = this.promise,
            thenFulfill, thenReject,

            // using promise constructor allows for customized promises to be
            // returned instead of plain ones
            then = new promise.constructor(function (fulfill, reject) {
                _yuitest_coverfunc("build/promise/promise.js", "(anonymous 4)", 266);
_yuitest_coverline("build/promise/promise.js", 267);
thenFulfill = fulfill;
                _yuitest_coverline("build/promise/promise.js", 268);
thenReject = reject;
            }),

            callbackList = this._callbacks || [],
            errbackList  = this._errbacks  || [];

        // Because the callback and errback are represented by a Resolver, it
        // must be fulfilled or rejected to propagate through the then() chain.
        // The same logic applies to resolve() and reject() for fulfillment.
        _yuitest_coverline("build/promise/promise.js", 277);
callbackList.push(typeof callback === 'function' ?
            this._wrap(thenFulfill, thenReject, callback) : thenFulfill);
        _yuitest_coverline("build/promise/promise.js", 279);
errbackList.push(typeof errback === 'function' ?
            this._wrap(thenFulfill, thenReject, errback) : thenReject);

        // If a promise is already fulfilled or rejected, notify the newly added
        // callbacks by calling fulfill() or reject()
        _yuitest_coverline("build/promise/promise.js", 284);
if (this._status === 'fulfilled') {
            _yuitest_coverline("build/promise/promise.js", 285);
this.fulfill(this._result);
        } else {_yuitest_coverline("build/promise/promise.js", 286);
if (this._status === 'rejected') {
            _yuitest_coverline("build/promise/promise.js", 287);
this.reject(this._result);
        }}

        _yuitest_coverline("build/promise/promise.js", 290);
return then;
    },

    /**
    Wraps the callback in Y.soon to guarantee its asynchronous execution. It
    also catches exceptions to turn them into rejections and links promises
    returned from the `then` callback.

    @method _wrap
    @param {Function} thenFulfill Fulfillment function of the resolver that
                        handles this promise
    @param {Function} thenReject Rejection function of the resolver that
                        handles this promise
    @param {Function} fn Callback to wrap
    @return {Function}
    @private
    **/
    _wrap: function (thenFulfill, thenReject, fn) {
        _yuitest_coverfunc("build/promise/promise.js", "_wrap", 307);
_yuitest_coverline("build/promise/promise.js", 308);
var promise = this.promise;

        _yuitest_coverline("build/promise/promise.js", 310);
return function () {
            // The args coming in to the callback/errback from the
            // resolution of the parent promise.
            _yuitest_coverfunc("build/promise/promise.js", "(anonymous 5)", 310);
_yuitest_coverline("build/promise/promise.js", 313);
var args = arguments;

            // Wrapping all callbacks in Y.soon to guarantee
            // asynchronicity. Because setTimeout can cause unnecessary
            // delays that *can* become noticeable in some situations
            // (especially in Node.js)
            _yuitest_coverline("build/promise/promise.js", 319);
Y.soon(function () {
                // Call the callback/errback with promise as `this` to
                // preserve the contract that access to the deferred is
                // only for code that may resolve/reject it.
                // Another option would be call the function from the
                // global context, but it seemed less useful.
                _yuitest_coverfunc("build/promise/promise.js", "(anonymous 6)", 319);
_yuitest_coverline("build/promise/promise.js", 325);
var result;

                // Promises model exception handling through callbacks
                // making both synchronous and asynchronous errors behave
                // the same way
                _yuitest_coverline("build/promise/promise.js", 330);
try {
                    _yuitest_coverline("build/promise/promise.js", 331);
result = fn.apply(promise, args);
                } catch (e) {
                    _yuitest_coverline("build/promise/promise.js", 333);
return thenReject(e);
                }

                _yuitest_coverline("build/promise/promise.js", 336);
if (Promise.isPromise(result)) {
                    // Returning a promise from a callback makes the current
                    // promise sync up with the returned promise
                    _yuitest_coverline("build/promise/promise.js", 339);
result.then(thenFulfill, thenReject);
                } else {
                    // Non-promise return values always trigger resolve()
                    // because callback is affirmative, and errback is
                    // recovery.  To continue on the rejection path, errbacks
                    // must return rejected promises or throw.
                    _yuitest_coverline("build/promise/promise.js", 345);
thenFulfill(result);
                }
            });
        };
    },

    /**
    Returns the current status of the Resolver as a string "pending",
    "fulfilled", or "rejected".

    @method getStatus
    @return {String}
    **/
    getStatus: function () {
        _yuitest_coverfunc("build/promise/promise.js", "getStatus", 358);
_yuitest_coverline("build/promise/promise.js", 359);
return this._status;
    },

    /**
    Executes an array of callbacks from a specified context, passing a set of
    arguments.

    @method _notify
    @param {Function[]} subs The array of subscriber callbacks
    @param {Any} result Value to pass the callbacks
    @protected
    **/
    _notify: function (subs, result) {
        _yuitest_coverfunc("build/promise/promise.js", "_notify", 371);
_yuitest_coverline("build/promise/promise.js", 372);
var i, len;

        _yuitest_coverline("build/promise/promise.js", 374);
for (i = 0, len = subs.length; i < len; ++i) {
            _yuitest_coverline("build/promise/promise.js", 375);
subs[i](result);
        }
    }

}, true);

_yuitest_coverline("build/promise/promise.js", 381);
Y.Promise.Resolver = Resolver;
/**
Abstraction API allowing you to interact with promises or raw values as if they
were promises. If a non-promise object is passed in, a new Resolver is created
and scheduled to resolve asynchronously with the provided value.

In either case, a promise is returned.  If either _callback_ or _errback_ are
provided, the promise returned is the one returned from calling
`promise.then(callback, errback)` on the provided or created promise.  If neither
are provided, the original promise is returned.

@for YUI
@method when
@param {Any} promise Promise object or value to wrap in a resolved promise
@param {Function} [callback] callback to execute if the promise is resolved
@param {Function} [errback] callback to execute if the promise is rejected
@return {Promise}
**/
_yuitest_coverline("build/promise/promise.js", 399);
Y.when = function (promise, callback, errback) {
    _yuitest_coverfunc("build/promise/promise.js", "when", 399);
_yuitest_coverline("build/promise/promise.js", 400);
var value;

    _yuitest_coverline("build/promise/promise.js", 402);
if (!Y.Promise.isPromise(promise)) {
        _yuitest_coverline("build/promise/promise.js", 403);
value = promise;

        _yuitest_coverline("build/promise/promise.js", 405);
promise = new Y.Promise(function (fulfill) {
            _yuitest_coverfunc("build/promise/promise.js", "(anonymous 7)", 405);
_yuitest_coverline("build/promise/promise.js", 406);
fulfill(value);
        });
    }

    _yuitest_coverline("build/promise/promise.js", 410);
return (callback || errback) ? promise.then(callback, errback) : promise;
};
/**
Adds a `Y.batch()` method to wrap any number of callbacks or promises in a
single promise that will be resolved when all callbacks and/or promises have completed.

@module promise
**/

_yuitest_coverline("build/promise/promise.js", 419);
var slice = [].slice;

/**
Returns a new promise that will be resolved when all operations have completed.
Takes both callbacks and promises as arguments. If an argument is a callback,
it will be wrapped in a new promise.

@for YUI
@method batch
@param {Function|Promise} operation* Any number of functions or Y.Promise
            objects
@return {Promise}
**/
_yuitest_coverline("build/promise/promise.js", 432);
Y.batch = function () {
    _yuitest_coverfunc("build/promise/promise.js", "batch", 432);
_yuitest_coverline("build/promise/promise.js", 433);
var funcs     = slice.call(arguments),
        remaining = funcs.length,
        i         = 0,
        length    = funcs.length,
        results   = [];

    _yuitest_coverline("build/promise/promise.js", 439);
return new Y.Promise(function (fulfill, reject) {
        _yuitest_coverfunc("build/promise/promise.js", "(anonymous 8)", 439);
_yuitest_coverline("build/promise/promise.js", 440);
var allDone = this;

        _yuitest_coverline("build/promise/promise.js", 442);
function oneDone(index) {
            _yuitest_coverfunc("build/promise/promise.js", "oneDone", 442);
_yuitest_coverline("build/promise/promise.js", 443);
return function (value) {
                _yuitest_coverfunc("build/promise/promise.js", "(anonymous 9)", 443);
_yuitest_coverline("build/promise/promise.js", 444);
results[index] = value;

                _yuitest_coverline("build/promise/promise.js", 446);
remaining--;

                _yuitest_coverline("build/promise/promise.js", 448);
if (!remaining && allDone.getStatus() !== 'rejected') {
                    _yuitest_coverline("build/promise/promise.js", 449);
fulfill(results);
                }
            };
        }

        _yuitest_coverline("build/promise/promise.js", 454);
if (length < 1) {
            _yuitest_coverline("build/promise/promise.js", 455);
return fulfill(results);
        }

        _yuitest_coverline("build/promise/promise.js", 458);
for (; i < length; i++) {
            _yuitest_coverline("build/promise/promise.js", 459);
Y.when(funcs[i], oneDone(i), reject);
        }
    });
};


}, '@VERSION@', {"requires": ["timers"]});
