/*!
 * Microbe JavaScript Library v0.4.13
 * http://m.icro.be
 *
 * Copyright 2014-2015 Sociomantic Labs and other contributors
 * Released under the MIT license
 * http://m.icro.be/license
 *
 * Date: Sat Nov 28 2015
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.µ=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * ## Microbe
 *
 * Builds the Microbe object
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */
 /*jshint globalstrict: true*/
'use strict';

var _type       = '[object Microbe]';
var _version    = '0.4.13';

var Microbe = function( selector, scope, elements )
{
    return new Microbe.core.__init__( selector, scope, elements );
};


require( './selectorEngine/init' )( Microbe, _type );
require( './modules/tools' )( Microbe );
require( './modules/dom' )( Microbe );
require( './modules/elements' )( Microbe );
require( './modules/http' )( Microbe );
require( './modules/observe' )( Microbe );
require( './modules/events' )( Microbe );


Microbe.version     = Microbe.core.__init__.prototype.version = _version;
module.exports      = Microbe.core.constructor = Microbe;

},{"./modules/dom":12,"./modules/elements":13,"./modules/events":14,"./modules/http":15,"./modules/observe":16,"./modules/tools":17,"./selectorEngine/init":21}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],3:[function(require,module,exports){
(function (global){
//    Copyright 2012 Kap IT (http://www.kapit.fr/)
//
//    Licensed under the Apache License, Version 2.0 (the 'License');
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an 'AS IS' BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
//    Author : François de Campredon (http://francois.de-campredon.fr/),

// Object.observe Shim
// ===================

// *See [The harmony proposal page](http://wiki.ecmascript.org/doku.php?id=harmony:observe)*

(function (global) {
    'use strict';

    // Utilities
    // ---------

    // setImmediate shim used to deliver changes records asynchronously
    // use setImmediate if available
    var setImmediate = global.setImmediate || global.msSetImmediate,
        clearImmediate = global.clearImmediate || global.msClearImmediate;
    if (!setImmediate) {
        // fallback on setTimeout if not
        setImmediate = function (func, args) {
            return setTimeout(func, 0, args);
        };
        clearImmediate = function (id) {
            clearTimeout(id);
        };
    }


    // WeakMap
    // -------

    var PrivateMap;
    if (typeof WeakMap !== 'undefined')  {
        //use weakmap if defined
        PrivateMap = WeakMap;
    } else {
        //else use ses like shim of WeakMap
        /* jshint -W016 */
        var HIDDEN_PREFIX = '__weakmap:' + (Math.random() * 1e9 >>> 0),
            counter = new Date().getTime() % 1e9,
            mascot = {};

        PrivateMap = function () {
            this.name = HIDDEN_PREFIX + (Math.random() * 1e9 >>> 0) + (counter++ + '__');
        };

        PrivateMap.prototype = {
            has: function (key) {
                return key && key.hasOwnProperty(this.name);
            },

            get: function (key) {
                var value = key && key[this.name];
                return value === mascot ? undefined : value;
            },

            set: function (key, value) {
                Object.defineProperty(key, this.name, {
                    value : typeof value === 'undefined' ? mascot : value,
                    enumerable: false,
                    writable : true,
                    configurable: true
                });
            },

            'delete': function (key) {
                return delete key[this.name];
            }
        };


        var getOwnPropertyName = Object.getOwnPropertyNames;
        Object.defineProperty(Object, 'getOwnPropertyNames', {
            value: function fakeGetOwnPropertyNames(obj) {
                return getOwnPropertyName(obj).filter(function (name) {
                    return name.substr(0, HIDDEN_PREFIX.length) !== HIDDEN_PREFIX;
                });
            },
            writable: true,
            enumerable: false,
            configurable: true
        });
    }


    // Internal Properties
    // -------------------

    // An ordered list used to provide a deterministic ordering in which callbacks are called.
    // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_internals#observercallbacks)
    var observerCallbacks = [];

    // This object is used as the prototype of all the notifiers that are returned by Object.getNotifier(O).
    // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_internals#notifierprototype)
    var NotifierPrototype = Object.create(Object.prototype);

    // Used to store immediate uid reference
    var changeDeliveryImmediateUid;

    // Used to schedule a call to _deliverAllChangeRecords
    function setUpChangesDelivery() {
        clearImmediate(changeDeliveryImmediateUid);
        changeDeliveryImmediateUid = setImmediate(_deliverAllChangeRecords);
    }

    Object.defineProperty(NotifierPrototype, 'notify', {
        value: function notify(changeRecord) {
            var notifier = this;
            if (Object(notifier) !== notifier) {
                throw new TypeError('this must be an Object, given ' + notifier);
            }
            if (!notifier.__target) {
                return;
            }
            if (Object(changeRecord) !== changeRecord) {
                throw new TypeError('changeRecord must be an Object, given ' + changeRecord);
            }


            var type = changeRecord.type;
            if (typeof type !== 'string') {
                throw new TypeError('changeRecord.type must be a string, given ' + type);
            }

            var changeObservers = changeObserversMap.get(notifier);
            if (!changeObservers || changeObservers.length === 0) {
                return;
            }
            var target = notifier.__target,
                newRecord = Object.create(Object.prototype, {
                    'object': {
                        value: target,
                        writable : false,
                        enumerable : true,
                        configurable: false
                    }
                });
            for (var prop in changeRecord) {
                if (prop !== 'object') {
                    var value = changeRecord[prop];
                    Object.defineProperty(newRecord, prop, {
                        value: value,
                        writable : false,
                        enumerable : true,
                        configurable: false
                    });
                }
            }
            Object.preventExtensions(newRecord);
            _enqueueChangeRecord(notifier.__target, newRecord);
        },
        writable: true,
        enumerable: false,
        configurable : true
    });

    Object.defineProperty(NotifierPrototype, 'performChange', {
        value: function performChange(changeType, changeFn) {
            var notifier = this;
            if (Object(notifier) !== notifier) {
                throw new TypeError('this must be an Object, given ' + notifier);
            }
            if (!notifier.__target) {
                return;
            }
            if (typeof changeType !== 'string') {
                throw new TypeError('changeType must be a string given ' + notifier);
            }
            if (typeof changeFn !== 'function') {
                throw new TypeError('changeFn must be a function, given ' + changeFn);
            }

            _beginChange(notifier.__target, changeType);
            var error, changeRecord;
            try {
                changeRecord = changeFn.call(undefined);
            } catch (e) {
                error = e;
            }
            _endChange(notifier.__target, changeType);
            if (typeof error !== 'undefined') {
                throw error;
            }

            var changeObservers = changeObserversMap.get(notifier);
            if (changeObservers.length === 0) {
                return;
            }

            var target = notifier.__target,
                newRecord = Object.create(Object.prototype, {
                    'object': {
                        value: target,
                        writable : false,
                        enumerable : true,
                        configurable: false
                    },
                    'type': {
                        value: changeType,
                        writable : false,
                        enumerable : true,
                        configurable: false
                    }
                });
            if (typeof changeRecord !== 'undefined') {
                for (var prop in changeRecord) {
                    if (prop !== 'object' && prop !== 'type') {
                        var value = changeRecord[prop];
                        Object.defineProperty(newRecord, prop, {
                            value: value,
                            writable : false,
                            enumerable : true,
                            configurable: false
                        });
                    }
                }
            }

            Object.preventExtensions(newRecord);
            _enqueueChangeRecord(notifier.__target, newRecord);

        },
        writable: true,
        enumerable: false,
        configurable : true
    });

    // Implementation of the internal algorithm 'BeginChange'
    // described in the proposal.
    // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_internals#beginchange)
    function _beginChange(object, changeType) {
        var notifier = Object.getNotifier(object),
            activeChanges = activeChangesMap.get(notifier),
            changeCount = activeChangesMap.get(notifier)[changeType];
        activeChanges[changeType] = typeof changeCount === 'undefined' ? 1 : changeCount + 1;
    }

    // Implementation of the internal algorithm 'EndChange'
    // described in the proposal.
    // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_internals#endchange)
    function _endChange(object, changeType) {
        var notifier = Object.getNotifier(object),
            activeChanges = activeChangesMap.get(notifier),
            changeCount = activeChangesMap.get(notifier)[changeType];
        activeChanges[changeType] = changeCount > 0 ? changeCount - 1 : 0;
    }

    // Implementation of the internal algorithm 'ShouldDeliverToObserver'
    // described in the proposal.
    // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_internals#shoulddelivertoobserver)
    function _shouldDeliverToObserver(activeChanges, acceptList, changeType) {
        var doesAccept = false;
        if (acceptList) {
            for (var i = 0, l = acceptList.length; i < l; i++) {
                var accept = acceptList[i];
                if (activeChanges[accept] > 0) {
                    return false;
                }
                if (accept === changeType) {
                    doesAccept = true;
                }
            }
        }
        return doesAccept;
    }


    // Map used to store corresponding notifier to an object
    var notifierMap = new PrivateMap(),
        changeObserversMap = new PrivateMap(),
        activeChangesMap = new PrivateMap();

    // Implementation of the internal algorithm 'GetNotifier'
    // described in the proposal.
    // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_internals#getnotifier)
    function _getNotifier(target) {
        if (!notifierMap.has(target)) {
            var notifier = Object.create(NotifierPrototype);
            // we does not really need to hide this, since anyway the host object is accessible from outside of the
            // implementation. we just make it unwritable
            Object.defineProperty(notifier, '__target', { value : target });
            changeObserversMap.set(notifier, []);
            activeChangesMap.set(notifier, {});
            notifierMap.set(target, notifier);
        }
        return notifierMap.get(target);
    }



    // map used to store reference to a list of pending changeRecords
    // in observer callback.
    var pendingChangesMap = new PrivateMap();

    // Implementation of the internal algorithm 'EnqueueChangeRecord'
    // described in the proposal.
    // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_internals#enqueuechangerecord)
    function _enqueueChangeRecord(object, changeRecord) {
        var notifier = Object.getNotifier(object),
            changeType = changeRecord.type,
            activeChanges = activeChangesMap.get(notifier),
            changeObservers = changeObserversMap.get(notifier);

        for (var i = 0, l = changeObservers.length; i < l; i++) {
            var observerRecord = changeObservers[i],
                acceptList = observerRecord.accept;
            if (_shouldDeliverToObserver(activeChanges, acceptList, changeType)) {
                var observer = observerRecord.callback,
                    pendingChangeRecords = [];
                if (!pendingChangesMap.has(observer))  {
                    pendingChangesMap.set(observer, pendingChangeRecords);
                } else {
                    pendingChangeRecords = pendingChangesMap.get(observer);
                }
                pendingChangeRecords.push(changeRecord);
            }
        }
        setUpChangesDelivery();
    }

    // map used to store a count of associated notifier to a function
    var attachedNotifierCountMap = new PrivateMap();

    // Remove reference all reference to an observer callback,
    // if this one is not used anymore.
    // In the proposal the ObserverCallBack has a weak reference over observers,
    // Without this possibility we need to clean this list to avoid memory leak
    function _cleanObserver(observer) {
        if (!attachedNotifierCountMap.get(observer) && !pendingChangesMap.has(observer)) {
            attachedNotifierCountMap.delete(observer);
            var index = observerCallbacks.indexOf(observer);
            if (index !== -1) {
                observerCallbacks.splice(index, 1);
            }
        }
    }

    // Implementation of the internal algorithm 'DeliverChangeRecords'
    // described in the proposal.
    // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_internals#deliverchangerecords)
    function _deliverChangeRecords(observer) {
        var pendingChangeRecords = pendingChangesMap.get(observer);
        pendingChangesMap.delete(observer);
        if (!pendingChangeRecords || pendingChangeRecords.length === 0) {
            return false;
        }
        try {
            observer.call(undefined, pendingChangeRecords);
        }
        catch (e) { }

        _cleanObserver(observer);
        return true;
    }

    // Implementation of the internal algorithm 'DeliverAllChangeRecords'
    // described in the proposal.
    // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_internals#deliverallchangerecords)
    function _deliverAllChangeRecords() {
        var observers = observerCallbacks.slice();
        var anyWorkDone = false;
        for (var i = 0, l = observers.length; i < l; i++) {
            var observer = observers[i];
            if (_deliverChangeRecords(observer)) {
                anyWorkDone = true;
            }
        }
        return anyWorkDone;
    }


    Object.defineProperties(Object, {
        // Implementation of the public api 'Object.observe'
        // described in the proposal.
        // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_public_api#object.observe)
        'observe': {
            value: function observe(target, callback, accept) {
                if (Object(target) !== target) {
                    throw new TypeError('target must be an Object, given ' + target);
                }
                if (typeof callback !== 'function') {
                    throw new TypeError('observer must be a function, given ' + callback);
                }
                if (Object.isFrozen(callback)) {
                    throw new TypeError('observer cannot be frozen');
                }

                var acceptList;
                if (typeof accept === 'undefined') {
                    acceptList = ['add', 'update', 'delete', 'reconfigure', 'setPrototype', 'preventExtensions'];
                } else {
                    if (Object(accept) !== accept) {
                        throw new TypeError('accept must be an object, given ' + accept);
                    }
                    var len = accept.length;
                    if (typeof len !== 'number' || len >>> 0 !== len || len < 1) {
                        throw new TypeError('the \'length\' property of accept must be a positive integer, given ' + len);
                    }

                    var nextIndex = 0;
                    acceptList = [];
                    while (nextIndex < len) {
                        var next = accept[nextIndex];
                        if (typeof next !== 'string') {
                            throw new TypeError('accept must contains only string, given' + next);
                        }
                        acceptList.push(next);
                        nextIndex++;
                    }
                }


                var notifier = _getNotifier(target),
                    changeObservers = changeObserversMap.get(notifier);

                for (var i = 0, l = changeObservers.length; i < l; i++) {
                    if (changeObservers[i].callback === callback) {
                        changeObservers[i].accept = acceptList;
                        return target;
                    }
                }

                changeObservers.push({
                    callback: callback,
                    accept: acceptList
                });

                if (observerCallbacks.indexOf(callback) === -1)  {
                    observerCallbacks.push(callback);
                }
                if (!attachedNotifierCountMap.has(callback)) {
                    attachedNotifierCountMap.set(callback, 1);
                } else {
                    attachedNotifierCountMap.set(callback, attachedNotifierCountMap.get(callback) + 1);
                }
                return target;
            },
            writable: true,
            configurable: true
        },

        // Implementation of the public api 'Object.unobseve'
        // described in the proposal.
        // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_public_api#object.unobseve)
        'unobserve': {
            value: function unobserve(target, callback) {
                if (Object(target) !== target) {
                    throw new TypeError('target must be an Object, given ' + target);
                }
                if (typeof callback !== 'function') {
                    throw new TypeError('observer must be a function, given ' + callback);
                }
                var notifier = _getNotifier(target),
                    changeObservers = changeObserversMap.get(notifier);
                for (var i = 0, l = changeObservers.length; i < l; i++) {
                    if (changeObservers[i].callback === callback) {
                        changeObservers.splice(i, 1);
                        attachedNotifierCountMap.set(callback, attachedNotifierCountMap.get(callback) - 1);
                        _cleanObserver(callback);
                        break;
                    }
                }
                return target;
            },
            writable: true,
            configurable: true
        },

        // Implementation of the public api 'Object.deliverChangeRecords'
        // described in the proposal.
        // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_public_api#object.deliverchangerecords)
        'deliverChangeRecords': {
            value: function deliverChangeRecords(observer) {
                if (typeof observer !== 'function') {
                    throw new TypeError('callback must be a function, given ' + observer);
                }
                while (_deliverChangeRecords(observer)) {}
            },
            writable: true,
            configurable: true
        },

        // Implementation of the public api 'Object.getNotifier'
        // described in the proposal.
        // [Corresponding Section in ECMAScript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:observe_public_api#object.getnotifier)
        'getNotifier': {
            value: function getNotifier(target) {
                if (Object(target) !== target) {
                    throw new TypeError('target must be an Object, given ' + target);
                }
                if (Object.isFrozen(target)) {
                    return null;
                }
                return _getNotifier(target);
            },
            writable: true,
            configurable: true
        }

    });

})(typeof global !== 'undefined' ? global : this);



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
//    Copyright 2012 Kap IT (http://www.kapit.fr/)
//
//    Licensed under the Apache License, Version 2.0 (the 'License');
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an 'AS IS' BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.
//    Author : François de Campredon (http://francois.de-campredon.fr/),

// ObjectUtils
// ===========

(function (global) {
    'use strict';

    var ObserveUtils = {};
    if ( typeof module === 'object' && typeof exports !== 'undefined') {
        module.exports = ObserveUtils;
    } else {
        global.ObserveUtils = ObserveUtils;
    }

    // Utilities
    // ---------


    // borrowing some array methods
    var arrSlice = Function.call.bind(Array.prototype.slice),
        arrMap = Function.call.bind(Array.prototype.map);

    // return true if the given property descriptor contains accessor
    function isAccessorDescriptor(desc) {
        if (typeof desc === 'undefined') {
            return false;
        }
        return ('get' in desc || 'set' in desc);
    }



    // getPropertyDescriptor shim
    // copied from [es6-shim](https://github.com/paulmillr/es6-shim)
    function getPropertyDescriptor(target, name) {
        var pd = Object.getOwnPropertyDescriptor(target, name),
            proto = Object.getPrototypeOf(target);
        while (typeof pd === 'undefined' && proto !== null) {
            pd = Object.getOwnPropertyDescriptor(proto, name);
            proto = Object.getPrototypeOf(proto);
        }
        return pd;
    }



    // egal shim
    // copied from [the ecmascript wiki](http://wiki.ecmascript.org/doku.php?id=harmony:egal)
    function sameValue(x, y) {
        if (x === y) {
            // 0 === -0, but they are not identical
            return x !== 0 || 1 / x === 1 / y;
        }

        // NaN !== NaN, but they are identical.
        // NaNs are the only non-reflexive value, i.e., if x !== x,
        // then x is a NaN.
        // isNaN is broken: it converts its argument to number, so
        // isNaN('foo') => true
        return x !== x && y !== y;
    }

    // cast a value as number, and test if the obtained result
    // is a positive finite integer, throw an error otherwise
    function isPositiveFiniteInteger(value, errorMessage) {
        value = Number(value);
        if (isNaN(value) || !isFinite(value) || value < 0 || value % 1 !== 0) {
            throw new RangeError(errorMessage.replace('$', value));
        }
        return value;
    }

    // defineObservableProperties Implementation
    // ------------------------------------------

    // Uid generation helper
    var uidCounter = 0;

    // Define a property on an object that will call the Notifier.notify method when updated
    function defineObservableProperty(target, property, originalValue) {

        //we store the value in an non-enumerable property with generated unique name
        var internalPropName = '_' + (uidCounter++) + property;

        if (target.hasOwnProperty(property)) {
            Object.defineProperty(target, internalPropName, {
                value: originalValue,
                writable: true,
                enumerable: false,
                configurable: true
            });
        }

        //then we create accessor method for our 'hidden' property,
        // that dispatch changesRecords when the value is updated
        Object.defineProperty(target, property, {
            get: function () {
                return this[internalPropName];
            },
            set: function (value) {
                if (!sameValue(value, this[internalPropName])) {
                    var oldValue = this[internalPropName];
                    Object.defineProperty(this, internalPropName, {
                        value: value,
                        writable: true,
                        enumerable: false,
                        configurable: true
                    });
                    var notifier = Object.getNotifier(this);
                    notifier.notify({ type: 'update', name: property, oldValue: oldValue });
                }
            },
            enumerable: true,
            configurable: true
        });
    }


    // call defineObservableProperty for each property name passed as 'rest argument'

    /**
     * Define observable properties on the given object an return it.
     *
     * @param {Object} target
     * @param {...string} properties
     * @returns {Object}
     */
    ObserveUtils.defineObservableProperties = function defineObservableProperties(target, properties) {
        if (Object(target) !== target) {
            throw new TypeError('target must be an Object, given ' + target);
        }
        properties = arrSlice(arguments, 1);
        while (properties.length > 0) {
            var property = properties.shift(),
                descriptor = getPropertyDescriptor(target, property);

            if (!descriptor || !isAccessorDescriptor(descriptor)) {
                var originalValue = descriptor && descriptor.value;
                defineObservableProperty(target, property, originalValue);
            }
        }
        return target;
    };



    // List Implementation
    // ------------------------------------------

    /**
     *
     * @param length
     * @returns {*}
     * @constructor
     * @function
     */
    function List(length) {
        if (arguments.length === 0) {
            length = 0;
        }

        // in this case we create a list with a given length
        if (arguments.length <= 1 && typeof length === 'number') {
            if (this instanceof List) {
                this.length = length;
            }
            else {
                return new List(length);
            }
        }
        else {
            //here we create a list with initial values
            if (!(this instanceof List)) {
                return List.fromArray(arrSlice(arguments));
            }
            else {
                for (var i = 0, l = arguments.length ; i < l ; i++) {
                    this[i] = arguments[i];
                }
                this.length = arguments.length;
            }
        }
    }

    /**
     * Observe a list
     * @param {List} list
     * @param {function} observer
     */
    List.observe = function observe(list, observer) {
        Object.observe(list, observer, ['add', 'update', 'delete', 'splice']);
    };


    /**
     * Unobserve a list
     * @param {List} list
     * @param {function} observer
     */
    List.unobserve = function unobserve(list, observer) {
        Object.unobserve(list, observer);
    };

    /**
     * Create a list from a given array
     * @param array
     * @returns {List}
     */
    List.fromArray = function fromArray(array) {
        if (!Array.isArray(array)) {
            throw new Error();
        }

        var list = new List();
        for (var i = 0, l = array.length ; i < l ; i++) {
            list[i] = array[i];
        }
        list.length = array.length;
        return list;
    };

    Object.defineProperties(List.prototype, {
        /**
         * hidden value holder for the length property
         * @private
         */
        '_length' : {
            value : 0,
            enumerable: false,
            configurable: true,
            writable: true
        },
        /**
         * the length of the list
         * @property {number} length
         */
        'length' : {
            get : function () {
                return this._length;
            },
            set : function (value) {
                value = isPositiveFiniteInteger(value, 'Invalid  list length : $');
                var notifier = Object.getNotifier(this),
                    oldValue = this._length,
                    removed = [],
                    self = this;
                if (value !== oldValue) {
                    notifier.performChange('splice', function () {
                        Object.defineProperty(self, '_length', {
                            value : value,
                            enumerable: false,
                            configurable: true,
                            writable: true
                        });

                        var returnValue;
                        if (oldValue > value) {
                            //delete values if the length have been decreased
                            for (var i = value; i < oldValue; i++) {
                                removed.push(self[i]);
                                self.delete(i);
                            }
                            returnValue = {
                                index : value,
                                removed : removed,
                                addedCount: 0
                            };
                        } else {
                            returnValue = {
                                index : oldValue,
                                removed : removed,
                                addedCount: value - oldValue
                            };
                        }
                        notifier.notify({ type: 'update', name: 'length', oldValue: oldValue });

                        return returnValue;
                    });
                }

            },
            enumerable: true,
            configurable : true
        }
    });

    /**
     * Returns an Array copy of the list
     * @returns {Array}
     */
    List.prototype.toArray = function toArray() {
        return arrSlice(this);
    };

    /**
     * Returns an string representation of the list
     * @returns {string}
     */
    List.prototype.toString = function toString() {
        return this.toArray().toString();
    };


    /**
     * Returns an json representation of the list
     * @returns {string}
     */
    List.prototype.toJSON = function toJSON() {
        return this.toArray();
    };

    /**
     * set the givent value at the specified index.
     * @param {number} index
     * @param {*} value
     * @return {*}
     */
    List.prototype.set = function set(index, value) {
        index = isPositiveFiniteInteger(index, 'Invalid index : $');

        var notifier = Object.getNotifier(this),
            len = this.length,
            self = this;
        if (index >= len) {
            notifier.performChange('splice', function () {
                self[index] = value;
                notifier.notify({ type: 'add', name: index});
                Object.defineProperty(self, '_length', {
                    value : index + 1,
                    enumerable: false,
                    configurable: true,
                    writable: true
                });
                notifier.notify({ type: 'update', name: 'length', oldValue: len });

                return {
                    index : len,
                    removed : [],
                    addedCount: self.length - len
                };
            });
        }
        else if (!sameValue(value, this[index])) {
            var oldValue = this[index];
            this[index] = value;
            notifier.notify({ type: 'update', name: index, oldValue: oldValue });
        }
        return value;
    };

    /**
     * delete the value at the specified index.
     * @param {number} index
     * @return {boolean}
     */
    List.prototype.delete = function del(index) {
        index = isPositiveFiniteInteger(index, 'Invalid index : $');
        if (this.hasOwnProperty(index)) {
            var oldValue = this[index];
            if (delete this[index]) {
                var notifier = Object.getNotifier(this);
                notifier.notify({ type: 'delete', name: index, oldValue: oldValue });
                return true;
            }
        }
        return false;
    };

    /**
     * create a new list resulting of the concatenation of all the List and array
     * passed as parameter with the addition of other values passed as parameter
     * @param {...*} args
     * @return {List}
     */
    List.prototype.concat = function concat(args) {
        args = arrMap(arguments, function (item) {
            return (item instanceof List) ?  item.toArray() : item;
        });
        return List.fromArray(Array.prototype.concat.apply(this.toArray(), args));
    };

    /**
     * Joins all elements of a List into a string.
     * @param {string} [separator]
     * @return {string}
     */
    List.prototype.join = function join(separator) {
        return this.toArray().join(separator);
    };


    /**
     * Removes the last element from a List and returns that element.
     * @return {*}
     */
    List.prototype.pop = function pop() {
        if (Object(this) !== this) {
            throw new TypeError('this mus be an object given : ' + this);
        }
        var len = isPositiveFiniteInteger(this.length, 'this must have a finite integer property \'length\', given : $');
        if (len === 0) {
            return void(0);
        } else {
            var newLen = len - 1,
                element = this[newLen],
                notifier =  Object.getNotifier(this),
                self = this;
            notifier.performChange('splice', function () {
                delete self[newLen];
                notifier.notify({ type: 'delete', name: newLen, oldValue: element });
                Object.defineProperty(self, '_length', {
                    value : newLen,
                    enumerable: false,
                    configurable: true,
                    writable: true
                });
                notifier.notify({ type: 'update', name: 'length', oldValue: len });

                return {
                    index : newLen,
                    removed : [element],
                    addedCount: 0
                };
            });


            return element;
        }
    };

    /**
     * Mutates a List by appending the given elements and returning the new length of the array.
     * @param {...*} items
     * @return {number}
     */
    List.prototype.push = function push() {
        if (arguments.length > 0) {
            var argumentsLength = arguments.length,
                elements = arguments,
                len = this.length,
                notifier = Object.getNotifier(this),
                self = this,
                i, index;
            notifier.performChange('splice', function () {
                for (i = 0; i < argumentsLength; i++) {
                    index =  len + i;
                    // avoid the usage of the set function and manually
                    // set the value and notify the changes to avoid the notification of
                    // multiple length modification
                    self[index] = elements[i];
                    notifier.notify({
                        type : 'add',
                        name : index
                    });
                }
                Object.defineProperty(self, '_length', {
                    value : len + argumentsLength,
                    enumerable: false,
                    configurable: true,
                    writable: true
                });
                notifier.notify({ type: 'update', name: 'length', oldValue: len });
                return {
                    index : len,
                    removed : [],
                    addedCount: argumentsLength
                };
            });
        }
        return this.length;
    };

    /**
     * Reverses a List in place.  The first List element becomes the last and the last becomes the first.
     * @return {List}
     */
    List.prototype.reverse = function reverse() {
        var copy = this.toArray(),
            arr = copy.slice().reverse();

        for (var i = 0, l = arr.length; i < l; i++) {
            this.set(i, arr[i]);
        }

        return this;
    };

    /**
     * Removes the first element from a List and returns that element. This method changes the length of the List.
     * @return {*}
     */
    List.prototype.shift = function () {
        if (this.length === 0) {
            return void(0);
        }

        var arr = this.toArray(),
            element = arr.shift(),
            notifier = Object.getNotifier(this),
            self = this, len = this.length;
        notifier.performChange('splice', function () {
            for (var i = 0, l = arr.length; i < l; i++) {
                self.set(i, arr[i]);
            }
            self.delete(len - 1);

            Object.defineProperty(self, '_length', {
                value : len - 1,
                enumerable: false,
                configurable: true,
                writable: true
            });
            notifier.notify({ type: 'update', name: 'length', oldValue: len });

            return {
                index : 0,
                removed : [element],
                addedCount: 0
            };
        });


        return element;
    };

    /**
     * Returns a shallow copy of a portion of an List.
     * @param {number} [start]
     * @param {number} [end]
     * @return {List}
     */
    List.prototype.slice = function (start, end) {
        return List.fromArray(this.toArray().slice(start, end));
    };

    /**
     * Sorts the elements of a List in place and returns the List.
     * @param {function} [compareFn]
     * @return {List}
     */
    List.prototype.sort = function (compareFn) {
        var copy = this.toArray(),
            arr = copy.slice().sort(compareFn);
        for (var i = 0, l = arr.length; i < l; i++) {
            this.set(i, arr[i]);
        }
        return this;
    };

    /**
     * Changes the content of a List, adding new elements while removing old elements.
     * @return {List}
     */
    List.prototype.splice = function () {
        var returnValue = [],
            argumentsLength = arguments.length;

        if (argumentsLength > 0) {
            var arr = this.toArray(),
                notifier = Object.getNotifier(this),
                len = this.length,
                self = this,
                index = arguments[0],
                i, l;

            returnValue = Array.prototype.splice.apply(arr, arguments);
            notifier.performChange('splice', function () {
                for (i = 0, l = arr.length; i < l; i++) {
                    var oldValue = self[i];
                    if (!sameValue(oldValue, arr[i])) {
                        self[i] = arr[i];
                        notifier.notify(
                            i >= len ?
                                {type : 'add', name : i}:
                                {type : 'update', name : i, oldValue : oldValue}
                        );
                    }
                }


                if (len !== arr.length) {
                    if (len > arr.length) {
                        //delete values if the length have been decreased
                        for (i = arr.length; i < len; i++) {
                            self.delete(i);
                        }
                    }

                    Object.defineProperty(self, '_length', {
                        value : arr.length,
                        enumerable: false,
                        configurable: true,
                        writable: true
                    });
                    notifier.notify({ type: 'update', name: 'length', oldValue: len });
                }
                return {
                    index : index,
                    removed : returnValue,
                    addedCount: argumentsLength >= 2 ? argumentsLength - 2 : 0
                };
            });

        }
        return List.fromArray(returnValue);
    };

    /**
     * Adds one or more elements to the beginning of a List and returns the new length of the List.
     * @return {number}
     */
    List.prototype.unshift = function () {
        var argumentsLength  = arguments.length;
        if (argumentsLength > 0) {
            var arr = this.toArray(),
                notifier = Object.getNotifier(this),
                len = this.length,
                self = this;

            Array.prototype.unshift.apply(arr, arguments);
            notifier.performChange('splice', function () {
                for (var i = 0, l = arr.length; i < l; i++)  {
                    var oldValue = self[i];
                    if (!sameValue(oldValue, arr[i])) {
                        // avoid the usage of the set function and manually
                        // set the value and notify the changes to avoid the notification of
                        // multiple length modification
                        self[i] = arr[i];
                        notifier.notify(
                            i >= len ?
                                {type : 'add', name : i}:
                                {type : 'update', name : i, oldValue : oldValue}
                        );
                    }
                }

                if (len !== arr.length) {
                    if (len > arr.length) {
                        //delete values if the length have been decreased
                        for (i = arr.length; i < len; i++) {
                            self.delete(i);
                        }
                    }
                    Object.defineProperty(self, '_length', {
                        value : arr.length,
                        enumerable: false,
                        configurable: true,
                        writable: true
                    });
                    notifier.notify({ type: 'update', name: 'length', oldValue: len });
                }

                return {
                    index : 0,
                    removed : [],
                    addedCount: argumentsLength
                };
            });

        }
        return this.length;
    };

    /**
     * Apply a function against an accumulator and each value of the List (from left-to-right) as to reduce it to a single value.
     * @param {function} callback
     * @param {Object} [initialValue]
     * @return {Object}
     */
    List.prototype.reduce =  Array.prototype.reduce;

    /**
     * Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value.
     * @param {function} callback
     * @param {Object} [initialValue]
     * @return {Object}
     */
    List.prototype.reduceRight =  Array.prototype.reduceRight;

    /**
     * Returns the first index at which a given element can be found in the List, or -1 if it is not present.
     * @param {Object} searchElement
     * @param {number} [fromIndex]
     * @return {number}
     */
    List.prototype.indexOf =  Array.prototype.indexOf;

    /**
     * Returns the last index at which a given element can be found in the List, or -1 if it is not present. The List is searched backwards, starting at fromIndex.
     * @param {Object} searchElement
     * @param {number} [fromIndex]
     * @return {number}
     */
    List.prototype.lastIndexOf = Array.prototype.lastIndexOf;

    /**
     * Tests whether all elements in the List pass the test implemented by the provided function.
     * @param {function} callback
     * @param {Object} [thisObject]
     * @return {boolean}
     */
    List.prototype.every = Array.prototype.every;

    /**
     * Creates a new List with all elements that pass the test implemented by the provided function
     * @param {function} callback
     * @param {Object} [thisObject]
     * @return {List}
     */
    List.prototype.filter = function (callback, thisObject) {
        return List.fromArray(this.toArray().filter(callback, thisObject));
    };

    /**
     * Executes a provided function once per List element.
     * @param {function} callback
     * @param {Object} [thisObject]
     * @return {void}
     */
    List.prototype.forEach = Array.prototype.forEach;

    /**
     * Creates a new List with the results of calling a provided function on every element in this List.
     * @param {function} callback
     * @param {Object} [thisObject]
     * @return {List}
     */
    List.prototype.map = function (callback, thisObject) {
        return List.fromArray(this.toArray().map(callback, thisObject));
    };

    /**
     * Tests whether some element in the List passes the test implemented by the provided function.
     * @param {function} callback
     * @param {Object} [thisObject]
     * @return {boolean}
     */
    List.prototype.some = Array.prototype.some;

    ObserveUtils.List = List;

})(this);

},{}],5:[function(require,module,exports){
'use strict';

module.exports = require('./lib/core.js')
require('./lib/done.js')
require('./lib/es6-extensions.js')
require('./lib/node-extensions.js')
},{"./lib/core.js":6,"./lib/done.js":7,"./lib/es6-extensions.js":8,"./lib/node-extensions.js":9}],6:[function(require,module,exports){
'use strict';

var asap = require('asap')

module.exports = Promise;
function Promise(fn) {
  if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new')
  if (typeof fn !== 'function') throw new TypeError('not a function')
  var state = null
  var value = null
  var deferreds = []
  var self = this

  this.then = function(onFulfilled, onRejected) {
    return new self.constructor(function(resolve, reject) {
      handle(new Handler(onFulfilled, onRejected, resolve, reject))
    })
  }

  function handle(deferred) {
    if (state === null) {
      deferreds.push(deferred)
      return
    }
    asap(function() {
      var cb = state ? deferred.onFulfilled : deferred.onRejected
      if (cb === null) {
        (state ? deferred.resolve : deferred.reject)(value)
        return
      }
      var ret
      try {
        ret = cb(value)
      }
      catch (e) {
        deferred.reject(e)
        return
      }
      deferred.resolve(ret)
    })
  }

  function resolve(newValue) {
    try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.')
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then
        if (typeof then === 'function') {
          doResolve(then.bind(newValue), resolve, reject)
          return
        }
      }
      state = true
      value = newValue
      finale()
    } catch (e) { reject(e) }
  }

  function reject(newValue) {
    state = false
    value = newValue
    finale()
  }

  function finale() {
    for (var i = 0, len = deferreds.length; i < len; i++)
      handle(deferreds[i])
    deferreds = null
  }

  doResolve(fn, resolve, reject)
}


function Handler(onFulfilled, onRejected, resolve, reject){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
  this.onRejected = typeof onRejected === 'function' ? onRejected : null
  this.resolve = resolve
  this.reject = reject
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, onFulfilled, onRejected) {
  var done = false;
  try {
    fn(function (value) {
      if (done) return
      done = true
      onFulfilled(value)
    }, function (reason) {
      if (done) return
      done = true
      onRejected(reason)
    })
  } catch (ex) {
    if (done) return
    done = true
    onRejected(ex)
  }
}

},{"asap":10}],7:[function(require,module,exports){
'use strict';

var Promise = require('./core.js')
var asap = require('asap')

module.exports = Promise
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this
  self.then(null, function (err) {
    asap(function () {
      throw err
    })
  })
}
},{"./core.js":6,"asap":10}],8:[function(require,module,exports){
'use strict';

//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = require('./core.js')
var asap = require('asap')

module.exports = Promise

/* Static Functions */

function ValuePromise(value) {
  this.then = function (onFulfilled) {
    if (typeof onFulfilled !== 'function') return this
    return new Promise(function (resolve, reject) {
      asap(function () {
        try {
          resolve(onFulfilled(value))
        } catch (ex) {
          reject(ex);
        }
      })
    })
  }
}
ValuePromise.prototype = Promise.prototype

var TRUE = new ValuePromise(true)
var FALSE = new ValuePromise(false)
var NULL = new ValuePromise(null)
var UNDEFINED = new ValuePromise(undefined)
var ZERO = new ValuePromise(0)
var EMPTYSTRING = new ValuePromise('')

Promise.resolve = function (value) {
  if (value instanceof Promise) return value

  if (value === null) return NULL
  if (value === undefined) return UNDEFINED
  if (value === true) return TRUE
  if (value === false) return FALSE
  if (value === 0) return ZERO
  if (value === '') return EMPTYSTRING

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then
      if (typeof then === 'function') {
        return new Promise(then.bind(value))
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex)
      })
    }
  }

  return new ValuePromise(value)
}

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr)

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([])
    var remaining = args.length
    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then
          if (typeof then === 'function') {
            then.call(val, function (val) { res(i, val) }, reject)
            return
          }
        }
        args[i] = val
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex)
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i])
    }
  })
}

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) { 
    reject(value);
  });
}

Promise.race = function (values) {
  return new Promise(function (resolve, reject) { 
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    })
  });
}

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
}

},{"./core.js":6,"asap":10}],9:[function(require,module,exports){
'use strict';

//This file contains then/promise specific extensions that are only useful for node.js interop

var Promise = require('./core.js')
var asap = require('asap')

module.exports = Promise

/* Static Functions */

Promise.denodeify = function (fn, argumentCount) {
  argumentCount = argumentCount || Infinity
  return function () {
    var self = this
    var args = Array.prototype.slice.call(arguments)
    return new Promise(function (resolve, reject) {
      while (args.length && args.length > argumentCount) {
        args.pop()
      }
      args.push(function (err, res) {
        if (err) reject(err)
        else resolve(res)
      })
      var res = fn.apply(self, args)
      if (res && (typeof res === 'object' || typeof res === 'function') && typeof res.then === 'function') {
        resolve(res)
      }
    })
  }
}
Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    var callback = typeof args[args.length - 1] === 'function' ? args.pop() : null
    var ctx = this
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx)
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) { reject(ex) })
      } else {
        asap(function () {
          callback.call(ctx, ex)
        })
      }
    }
  }
}

Promise.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this

  this.then(function (value) {
    asap(function () {
      callback.call(ctx, null, value)
    })
  }, function (err) {
    asap(function () {
      callback.call(ctx, err)
    })
  })
}

},{"./core.js":6,"asap":10}],10:[function(require,module,exports){
(function (process){

// Use the fastest possible means to execute a task in a future turn
// of the event loop.

// linked list of tasks (single, with head node)
var head = {task: void 0, next: null};
var tail = head;
var flushing = false;
var requestFlush = void 0;
var isNodeJS = false;

function flush() {
    /* jshint loopfunc: true */

    while (head.next) {
        head = head.next;
        var task = head.task;
        head.task = void 0;
        var domain = head.domain;

        if (domain) {
            head.domain = void 0;
            domain.enter();
        }

        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function() {
                   throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    flushing = false;
}

if (typeof process !== "undefined" && process.nextTick) {
    // Node.js before 0.9. Note that some fake-Node environments, like the
    // Mocha test runner, introduce a `process` global without a `nextTick`.
    isNodeJS = true;

    requestFlush = function () {
        process.nextTick(flush);
    };

} else if (typeof setImmediate === "function") {
    // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
    if (typeof window !== "undefined") {
        requestFlush = setImmediate.bind(window, flush);
    } else {
        requestFlush = function () {
            setImmediate(flush);
        };
    }

} else if (typeof MessageChannel !== "undefined") {
    // modern browsers
    // http://www.nonblocking.io/2011/06/windownexttick.html
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    requestFlush = function () {
        channel.port2.postMessage(0);
    };

} else {
    // old browsers
    requestFlush = function () {
        setTimeout(flush, 0);
    };
}

function asap(task) {
    tail = tail.next = {
        task: task,
        domain: isNodeJS && process.domain,
        next: null
    };

    if (!flushing) {
        flushing = true;
        requestFlush();
    }
};

module.exports = asap;


}).call(this,require('_process'))
},{"_process":2}],11:[function(require,module,exports){
(function (process,global){
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var setImmediate;

    function addFromSetImmediateArguments(args) {
        tasksByHandle[nextHandle] = partiallyApplied.apply(undefined, args);
        return nextHandle++;
    }

    // This function accepts the same arguments as setImmediate, but
    // returns a function that requires no arguments.
    function partiallyApplied(handler) {
        var args = [].slice.call(arguments, 1);
        return function() {
            if (typeof handler === "function") {
                handler.apply(undefined, args);
            } else {
                (new Function("" + handler))();
            }
        };
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    task();
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function installNextTickImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            process.nextTick(partiallyApplied(runIfPresent, handle));
            return handle;
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            global.postMessage(messagePrefix + handle, "*");
            return handle;
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            channel.port2.postMessage(handle);
            return handle;
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
            return handle;
        };
    }

    function installSetTimeoutImplementation() {
        setImmediate = function() {
            var handle = addFromSetImmediateArguments(arguments);
            setTimeout(partiallyApplied(runIfPresent, handle), 0);
            return handle;
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":2}],12:[function(require,module,exports){
/**
 * dom.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */
var _events;

module.exports = function( Microbe )
{
    'use strict';

    /**
     * ## append
     *
     * Appends an element or elements to the microbe.  if there is more than
     * one target the next ones are cloned.  The strings this accepts can be
     * a selector string, an element creation string, or an html string
     *
     * @param {Mixed} _ele element(s) to append (Element, Array, string, or Microbe)
     *
     * @example µ( '.example' ).append( '&lt;div class="new-div">test&lt;/div>' );
     * @example µ( '.example' ).append( µMicrobeExample );
     * @example µ( '.example' ).append( _el );
     * @example µ( '.example' ).append( [ _el1, _el2, _el3 ] );
     * @example µ( '.example' ).append( '&lt;div.example>' );
     *
     * @return _Microbe_ new microbe filled with the inserted content
     */
    Microbe.core.append = (function()
    {
        /**
         * ## _appendHTML
         *
         * in the case of html passed in it will get appended or prepended to the
         * innerHTML
         *
         * @param {String} _html html string
         * @param {Boolean} _pre prepend or not
         *
         * @return _Microbe_
         */
        var _appendHTML = function( _html, _pre )
        {
            var _el;
            for ( var k = 0, lenK = this.length; k < lenK; k++ )
            {
                _el = this[ k ];

                if ( _pre )
                {
                    _el.innerHTML = _html + _el.innerHTML;
                }
                else
                {
                    _el.innerHTML += _html;
                }
            }
            return this;
        };


        /**
         * ## _append
         *
         * appends the child to the parent
         *
         * @param {Element} _parentEl parent element
         * @param {Element} _elm child element
         *
         * @return _Microbe_
         */
        var _append = function( _parentEl, _elm )
        {
            _parentEl.appendChild( _elm );
        };


        /**
         * ## checkElement
         *
         * reformats the element into an iterable object
         *
         * @param  {Mixed} _el element(s) to be reformatted (String, DOMElement, Array, Microbe)
         *
         * @return  _Mixed_ formatted element(s) (Microbe, Array)
         */
        var checkElement = function( _el )
        {
            if ( typeof _el === 'string' )
            {
                return new Microbe( _el );
            }
            else if ( !_el.length )
            {
                return [ _el ];
            }

            return _el;
        }


        /**
         * ## _prepend
         *
         * prepends the child to the parent
         *
         * @param {Element} _parentEl parent element
         * @param {Element} _elm child element
         *
         * @return _Microbe_
         */
        var _prepend = function( _parentEl, _elm )
        {
            var firstChild = _parentEl.firstElementChild;
            _parentEl.insertBefore( _elm, firstChild );
        };


        /**
         * ## append main function
         *
         * takes input fromappend, appendTo, prepend, and prependTo, sorts out
         * the booleans and targets, then passes them to the correct function
         *
         * @param {Mixed} _el element to attach or attach to
         * @param {Boolean} prepend prepend or append
         * @param {Boolean} to determines the parent child relationship
         *
         * @return _Microbe_
         */
        return function( _el, prepend, to )
        {
            var _cb = prepend ? _prepend : _append;

            var elementArray = [], node;

            _el = checkElement( _el );

            var self    = to ? _el : this;
                _el     = to ? this : _el;

            if ( _el.indexOf( '/' ) !== -1 )
            {
                return _appendHTML.call( self, _el, prepend );
            }

            self.forEach( function( s, i )
            {
                _el.forEach( function( e, j )
                {
                    node = i === 0 ? e : e.cloneNode( true );

                    elementArray.push( node );
                    _cb( self[ i ], node );
                } );
            } );

            return this.constructor( elementArray );
        };
    }());


    /**
     * ## appendTo
     *
     * Prepends a microbe to an element or elements.  if there is more than
     * one target the next ones are cloned. The strings this accepts can be
     * a selector string, an element creation string, or an html string
     *
     * @param {Mixed} _ele element(s) to prepend _{Element, Array, String, or Microbe}_
     *
     * @example µ( '.example' ).appendTo( '&lt;div class="new-div">test&lt;/div>' );
     * @example µ( '.example' ).appendTo( µMicrobeExample );
     * @example µ( '.example' ).appendTo( _el );
     * @example µ( '.example' ).appendTo( [ _el1, _el2, _el3 ] );
     * @example µ( '.example' ).appendTo( '&lt;div.example>' );
     *
     * @return _Microbe_ new microbe filled with the inserted content
     */
    Microbe.core.appendTo = function( _el )
    {
        return this.append( _el, false, true );
    };


    /**
     * ## insertAfter
     *
     * Inserts the given element after each of the elements given (or passed through this).
     * if it is an elemnet it is wrapped in a microbe object.  if it is a string it is created
     *
     * @param {Mixed} _elAfter element to insert {Object or String}
     *
     * @example µ( '.example' ).insertAfter( '&lt;div class="new-div">test&lt;/div>' );
     * @example µ( '.example' ).insertAfter( µMicrobeExample );
     * @example µ( '.example' ).insertAfter( _el );
     * @example µ( '.example' ).insertAfter( [ _el1, _el2, _el3 ] );
     * @example µ( '.example' ).insertAfter( '&lt;div.example>' );
     *
     * @return _Microbe_ new microbe filled with the inserted content
     */
    Microbe.core.insertAfter = function( _elAfter )
    {
        var elementArray = [];

        var _insertAfter = function( _elm, i )
        {
            var _arr        = Array.prototype.slice.call( _elm.parentNode.children );
            var nextIndex   = _arr.indexOf( _elm ) + 1;

            var node, nextEle   = _elm.parentNode.children[ nextIndex ];

            for ( var j = 0, lenJ = _elAfter.length; j < lenJ; j++ )
            {
                node = i === 0 ? _elAfter[ j ] : _elAfter[ j ].cloneNode( true );

                elementArray.push( node );

                if ( nextEle )
                {
                    nextEle.parentNode.insertBefore( node, nextEle );
                }
                else
                {
                    _elm.parentNode.appendChild( node );
                }
            }
        };

        if ( typeof _elAfter === 'string' )
        {
            _elAfter = new Microbe( _elAfter );
        }
        else if ( ! _elAfter.length )
        {
            _elAfter = [ _elAfter ];
        }

        var i, len;
        for ( i = 0, len = this.length; i < len; i++ )
        {
            _insertAfter( this[ i ], i );
        }

        return this.constructor( elementArray );
    };


    /**
     * ## prepend
     *
     * Prepends an element or elements to the microbe.  if there is more than
     * one target the next ones are cloned. The strings this accepts can be
     * a selector string, an element creation string, or an html string
     *
     * @param {Mixed} _ele element(s) to prepend _{Element, Array, String, or Microbe}_
     *
     * @example µ( '.example' ).prepend( '&lt;div class="new-div">test&lt;/div>' );
     * @example µ( '.example' ).prepend( µMicrobeExample );
     * @example µ( '.example' ).prepend( _el );
     * @example µ( '.example' ).prepend( [ _el1, _el2, _el3 ] );
     * @example µ( '.example' ).prepend( '&lt;div.example>' );
     *
     * @return _Microbe_ new microbe filled with the inserted content
     */
    Microbe.core.prepend = function( _el )
    {
        return this.append( _el, true );
    };


    /**
     * ## prependTo
     *
     * Prepends a microbe to an element or elements.  if there is more than
     * one target the next ones are cloned. The strings this accepts can be
     * a selector string, an element creation string, or an html string
     *
     * @param {Mixed} _ele element(s) to prepend _{Element, Array, String, or Microbe}_
     *
     * @example µ( '.example' ).prependTo( '&lt;div class="new-div">test&lt;/div>' );
     * @example µ( '.example' ).prependTo( µMicrobeExample );
     * @example µ( '.example' ).prependTo( _el );
     * @example µ( '.example' ).prependTo( [ _el1, _el2, _el3 ] );
     * @example µ( '.example' ).prependTo( '&lt;div.example>' );
     *
     * @return _Microbe_ new microbe filled with the inserted content
     */
    Microbe.core.prependTo = function( _el )
    {
        return this.append( _el, true, true );
    };


    /**
     * ## ready
     *
     * Waits until the DOM is ready to execute
     *
     * @param {Function} _cb callback to run on ready
     * @param {Array} args parameters to pass to the callback
     *
     * @example µ.ready( function( a, b ){ return a + b; }, [ 1, 2 ] );
     * @example µ( function( a, b ){ return a + b; }, [ 1, 2 ] );
     *
     * @return _void_
     */
    Microbe.ready = function( _cb, args )
    {
        if ( document.readyState === 'complete' )
        {
            return _cb.apply( this, args );
        }

        if ( window.addEventListener )
        {
            window.addEventListener( 'load', _cb, false );
        }
        else if ( window.attachEvent )
        {
            window.attachEvent( 'onload', _cb );
        }
        else
        {
            window.onload = _cb;
        }
    };


    /**
     * ## remove
     *
     * Removes an element or elements from the dom and all events bound to it
     *
     * @example µ( '.example' ).remove();
     *
     * @return _Microbe_ reference to original microbe
     */
    Microbe.core.remove = function()
    {
        if ( this.off )
        {
            this.off();
        }

        this.forEach( function( _el )
        {
            _el.remove();
        } );

        return this;
    };


    /**
     * ## remove polyfill
     *
     * Polyfill for IE because IE
     *
     * @return _void_
     */
    if ( !( 'remove' in Element.prototype ) )
    {
        Element.prototype.remove = function()
        {
            this.parentElement.removeChild( this );
        };
    }

};

},{}],13:[function(require,module,exports){

module.exports = function( Microbe )
{
    'use strict';

    var _type       = Microbe.type;

    /**
     * ## addClass
     *
     * Adds the passed class to the current element(s)
     *
     * @param {Mixed} _class    class to remove.  this accepts
     *                          strings and array of strings.
     *                          the strings can be a class or
     *                          classes seperated with spaces _{String or Array}_
     *
     * @example µ( '.example' ).addClass( 'moon' );
     * @example µ( '.example' ).addClass( [ 'moon', 'doge' ] );
     *
     * @return _Microbe_ reference to original microbe
     */
    Microbe.core.addClass = function( _class )
    {
        var _addClass = function( _el )
        {
            for ( var i = 0, lenI = _class.length; i < lenI; i++ )
            {
                var _c = _class[ i ].split( ' ' );

                for ( var j = 0, lenJ = _c.length; j < lenJ; j++ )
                {
                    if ( _c[ j ] !== '' )
                    {
                        _el.classList.add( _c[ j ] );
                    }
                }
            }

            _el.data                = _el.data  || {};
            _el.data.class          = _el.data.class || {};
            _el.data.class.class    = _el.className;
        };

        if ( typeof _class === 'string' )
        {
            _class = [ _class ];
        }

        this.each( _addClass );

        return this;
    };


    /**
     * ## attr
     *
     * Changes the attribute by writing the given property and value to the
     * supplied elements.  If the value is omitted, simply returns the current
     * attribute value of the element. Attributes can be bulk added by passing
     * an object (property: value)
     *
     * @param {Mixed} _attribute attribute name {String or Object}
     * @param {String} _value attribute value (optional)
     *
     * @example µ( '.example' ).attr( 'moon', 'doge' );
     * @example µ( '.example' ).attr( { 'moon' : 1,
     *                                  'doge' : 2 } );
     * @example µ( '.example' ).attr( 'moon' );
     *
     * @return _Microbe_ reference to original microbe (set)
     * @return _Array_  array of values (get)
     */
    Microbe.core.attr = function ( _attribute, _value )
    {
        var attrObject = !!Microbe.isObject( _attribute );

        var _setAttr = function( _elm )
        {
            var _set = function( _a, _v )
            {
                if ( !_elm.getAttribute )
                {
                    _elm[ _a ] = _v;
                }
                else
                {
                    _elm.setAttribute( _a, _v );
                }

                _elm.data                   = _elm.data || {};
                _elm.data.attr              = _elm.data.attr || {};
                _elm.data.attr.attr         = _elm.data.attr.attr || {};
                _elm.data.attr.attr[ _a ]   = _v;
            };

            if ( _value === null )
            {
                _removeAttr( _elm );
            }
            else
            {
                var _attr;
                if ( !attrObject )
                {
                    _set( _attribute, _value );
                }
                else
                {
                    for ( _attr in _attribute )
                    {
                        _value = _attribute[ _attr ];
                        _set( _attr, _value );
                    }
                }
            }
        };

        var _getAttr = function( _elm )
        {
            return _elm.getAttribute( _attribute );
        };

        var _removeAttr = function( _elm )
        {
            if ( _elm.getAttribute( _attribute ) === null )
            {
                delete _elm[ _attribute ];
            }
            else
            {
                _elm.removeAttribute( _attribute );
            }
            delete _elm.data.attr.attr[ _attribute ];
        };

        if ( _value !== undefined || attrObject )
        {
            this.each( _setAttr );

            return this;
        }

        return this.map( _getAttr );
    };


    /**
     * ## css
     *
     * Changes the CSS by writing the given property and value inline to the
     * supplied elements. (properties should be supplied in javascript format).
     * If the value is omitted, simply returns the current css value of the element.
     *
     * @param {String} _attribute          css property
     * @param {String} _value              css value (optional)
     *
     * @example µ( '.example' ).css( 'background-color', '#fff' );
     * @example µ( '.example' ).css( 'background-color' );
     *
     * @return _Microbe_ reference to original microbe (set)
     * @return _Array_  array of values (get)
     */
    Microbe.core.css = function( _property, _value )
    {
        var _setCss = function( _elm )
        {
            _elm.data                   = _elm.data || {};
            _elm.data.css               = _elm.data.css || {};
            _elm.data.css[ _property ]  = _value;

            _elm.style[ _property ]     = _elm.data.css[ _property ];
        };

        var _getCss = function( _elm )
        {
            return window.getComputedStyle( _elm ).getPropertyValue( _property );
        };

        if ( _value || _value === null || _value === '' )
        {
            _value = ( _value === null ) ? '' : _value;

            this.each( _setCss );

            return this;
        }

        return this.map( _getCss );
    };


    /**
     * ## getParentIndex
     *
     * Gets the index of the item in it's parentNode's children array
     *
     * @example µ( '.example' ).getParentIndex();
     *
     * @return _Array_ array of index values
     */
    Microbe.core.getParentIndex = function()
    {
        var _getParentIndex = function( _elm )
        {
            return Array.prototype.indexOf.call( _elm.parentNode.children, _elm );
        };

        return this.map( _getParentIndex );
    };


    /**
     * ## hasClass
     *
     * Checks if the current object or the given element has the given class
     *
     * @param {String} _class              class to check
     *
     * @example µ( '.example' ).hasClass( 'example' );
     *
     * @return _Array_ Array of Boolean values
     */
    Microbe.core.hasClass = function( _class )
    {
        var _hasClass = function( _elm )
        {
            return _elm.classList.contains( _class );
        };

        return this.map( _hasClass );
    };


    /**
     * ## html
     *
     * Changes the innerHtml to the supplied string or microbe.  If the value is
     * omitted, simply returns the current inner html value of the element.
     *
     * @param {Mixed} _value html value (accepts Microbe String)
     *
     * @example µ( '.example' ).html( '<span>things!</span>' );
     * @example µ( '.example' ).html();
     *
     * @return _Microbe_ reference to original microbe (set)
     * @return _Array_  array of values (get)
     */
    Microbe.core.html = function ( _value )
    {
        var _append;

        if ( _value && _value.type === _type )
        {
            _append = _value;
            _value = '';
        }

        var _getHtml = function( _elm )
        {
            return _elm.innerHTML;
        };

        if ( _value && _value.nodeType === 1 )
        {
           return _getHtml( _value );
        }

        if ( _value || _value === '' || _value === 0 )
        {
            var _setHtml = function( _elm )
            {
                _elm.data           = _elm.data || {};
                _elm.data.html      = _elm.data.html || {};
                _elm.data.html.html = _value;

                _elm.innerHTML      = _value;
            };

            this.each( _setHtml );

            if ( _append )
            {
                return this.append( _append );
            }
            else
            {
                return this;
            }
        }

        return this.map( _getHtml );
    };


    /**
     * ## removeClass
     *
     * Method removes the given class from the current object or the given element.
     *
     * @param {Mixed} _class    class to remove.  this accepts
     *                          strings and array of strings.
     *                          the strings can be a class or
     *                          classes seperated with spaces {String Array}
     *
     * @example µ( '.example' ).removeClass( 'moon' );
     * @example µ( '.example' ).removeClass( [ 'moon', 'doge' ] );
     *
     * @return _Microbe_ reference of the original microbe
     */
    Microbe.core.removeClass = function( _class )
    {
        var _removeClass = function( _el )
        {
            for ( var i = 0, lenI = _class.length; i < lenI; i++ )
            {
                var _c = _class[ i ].split( ' ' );

                for ( var j = 0, lenJ = _c.length; j < lenJ; j++ )
                {
                    if ( _c[ j ] !== '' )
                    {
                        _el.classList.remove( _c[ j ] );
                    }
                }
            }

            _el.data                = _el.data || {};
            _el.data.class          = _el.data.class || {};
            _el.data.class.class    = _el.className;
        };

        if ( typeof _class === 'string' )
        {
            _class = [ _class ];
        }

        this.each( _removeClass );

        return this;
    };


    /**
     * ## text
     *
     * Changes the inner text to the supplied string. If the value is omitted,
     * simply returns the current inner text value of each element.
     *
     * @param {String} _value              Text value (optional)
     *
     * @example µ( '.example' ).text( 'things!' );
     * @example µ( '.example' ).text();
     *
     * @return _Microbe_ reference to original microbe (set)
     * @return _Array_  array of values (get)
     */
    Microbe.core.text = function( _value )
    {
        var _setText = function( _el )
        {
            if ( document.all )
            {
                _el.innerText = _value;
            }
            else // FF
            {
                _el.textContent = _value;
            }

            _el.data            = _el.data || {};
            _el.data.text       = _el.data.text || {};
            _el.data.text.text  = _value;
        };

        var _getText = function( _el )
        {
            if ( document.all )
            {
                return _el.innerText;
            }
            else // FF
            {
                return _el.textContent;
            }
        };

        if ( _value || _value === '' || _value === 0 )
        {
            this.each( _setText );

            return this;
        }

        return this.map( _getText );
    };


    /**
     * ## toggleClass
     *
     * adds or removes a class on the current element, depending on
     * whether it has it already.
     *
     * @param {String} _class              class to add
     *
     * @example µ( '.example' ).toggleClass( 'moon' );
     * @example µ( '.example' ).toggleClass( [ 'moon', 'doge' ] );
     *
     * @return _Microbe_ reference of the original microbe
     */
    Microbe.core.toggleClass = function( _class )
    {
        var _cls;

        if ( !Array.isArray( _class ) )
        {
            _class = [ _class ];
        }

        var _toggleClass = function( _el )
        {
            if ( _el.classList.contains( _cls ) )
            {
                _el.classList.remove( _cls );
            }
            else
            {
                _el.classList.add( _cls );
            }

            _el.data                = _el.data || {};
            _el.data.class          = _el.data.class || {};
            _el.data.class.class    = _el.className;
        };

        for ( var i = 0, lenI = _class.length; i < lenI; i++ )
        {
            _cls = _class[ i ];
            this.each( _toggleClass );
        }

        return this;
    };
};
},{}],14:[function(require,module,exports){
/**
 * events.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

module.exports = function( Microbe )
{
    'use strict';

    /**
     * ## emit
     *
     * Emits a custom event to the HTMLElements of the current object
     *
     * @param {String} _event HTMLEvent
     * @param {Object} _data event data
     * @param {Boolean} _bubbles event bubbles?
     * @param {Boolean} _cancelable cancelable?
     *
     * @example µ( '.example' ).emit( 'custom-click', { type : 'microbe-click' } );
     * @example µ( '.example' ).emit( 'custom-click', { type : 'microbe-click' }, true, true );
     *
     * @return _Microbe_ reference to original microbe
     */
    Microbe.core.emit = function ( _event, _data, _bubbles, _cancelable )
    {
        _bubbles    = _bubbles || false;
        _cancelable = _cancelable || false;
        var _emit = function( _elm )
        {
            var _evt = new CustomEvent( _event, {
                                                    detail      : _data,
                                                    cancelable  : _cancelable,
                                                    bubbles    : _bubbles
                                                } );
            _elm.dispatchEvent( _evt );
        };

        this.each( _emit );

        return this;
    };


    /**
     * ## off
     *
     * Unbinds an/all events.
     *
     * @param {String} _event event name
     * @param {Function} _callback callback function
     * @param {Object} _el HTML element to modify (optional)
     *
     * @example µ( '.example' ).off( 'custom-click' );
     * @example µ( '.example' ).off();
     *
     * @return _Microbe_ reference to original microbe
     */
    Microbe.core.off = function( _event, _callback )
    {
        var filterFunction = function( e ){ return e; };

        var _off = function( _elm, _e )
        {
            var _cb = _callback;
            var prop = '_' + _e + '-bound-function';

            if ( ! _cb && _elm.data && _elm.data[ prop ] &&
                    _elm.data[ prop ][ prop ] )
            {
                _cb = _elm.data[ prop ][ prop ];
            }
            else if ( ! ( _elm.data && _elm.data[ prop ] &&
                    _elm.data[ prop ][ prop ] ) )
            {
                _elm.data                   = _elm.data || {};
                _elm.data[ prop ]           = _elm.data[ prop ] || {};
                _elm.data[ prop ][ prop ]   = _elm.data[ prop ][ prop ] || [];
                return null;
            }

            if ( _cb )
            {
                if ( ! Microbe.isArray( _cb ) )
                {
                    _cb = [ _cb ];
                }

                var _index, _d;
                for ( var k = 0, lenK = _cb.length; k < lenK; k++ )
                {
                    _d      = _elm.data[ prop ][ prop ];
                    _index  = _d.indexOf( _cb[ k ] );

                    if ( _index !== -1 )
                    {
                        _elm.removeEventListener( _e, _cb[ k ] );
                        _d[ _index ] = null;
                    }
                }
                _elm.data[ prop ][ prop ] = _elm.data[ prop ][ prop ].filter( filterFunction );
            }
        };

        var _checkBoundEvents = function ( _elm )
        {
            if ( !_event && _elm.data && _elm.data.__boundEvents && _elm.data.__boundEvents.__boundEvents )
            {
                _event = _elm.data.__boundEvents.__boundEvents;
            }
            else
            {
                _elm.data                   = _elm.data || {};
                _elm.data.__boundEvents     = _elm.data.__boundEvents || {};
            }

            if ( !Microbe.isArray( _event ) )
            {
                _event = [ _event ];
            }

            for ( var j = 0, lenJ = _event.length; j < lenJ; j++ )
            {
                _off( _elm, _event[ j ] );
            }

            _elm.data.__boundEvents.__boundEvents = _event.filter( filterFunction );
        }

        this.each( _checkBoundEvents );

        return this;
    };


    /**
     * ## on
     *
     * Binds an event to the HTMLElements of the current object or to the
     * given element.
     *
     * @param {String} _event HTMLEvent
     * @param {Function} _callback callback function
     *
     * @example µ( '.example' ).on( 'custom-click', function( e ){ return e.target;} );
     *
     * @return _Microbe_ reference to original microbe
     */
    Microbe.core.on = function ( _event, _callback )
    {
        var _on = function( _elm )
        {
            var prop = '_' + _event + '-bound-function';

            _elm.data                   = _elm.data || {};
            _elm.data[ prop ]           = _elm.data[ prop ] || {};
            _elm.data[ prop ][ prop ]   = _elm.data[ prop ][ prop ] || [];

            _elm.data.__boundEvents     = _elm.data.__boundEvents || {};
            _elm.data.__boundEvents.__boundEvents   = _elm.data.__boundEvents.__boundEvents || [];

            _elm.addEventListener( _event, _callback );
            _elm.data[ prop ][ prop ].push( _callback );

            _elm.data.__boundEvents.__boundEvents.push( _event );
        };

        this.each( _on );

        return this;
    };


    /**
     * ## _CustomEvent polyfill
     *
     * CustomEvent polyfill for IE <= 9
     *
     * @param {String} _event HTMLEvent
     * @param {Object} _data event data
     *
     * @return _void_
     */
    if ( typeof CustomEvent !== 'function' )
    {
        ( function()
        {
            function CustomEvent( event, data )
            {
                data    = data || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent( 'CustomEvent' );
                evt.initCustomEvent( event, data.bubbles, data.cancelable, data.detail );
                return evt;
            }

            CustomEvent.prototype   = window.Event.prototype;
            window.CustomEvent      = CustomEvent;
        } )();
    }
};

},{}],15:[function(require,module,exports){
/**
 * http.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

module.exports = function( Microbe )
{
    'use strict';

    var Promise = require( 'promise' );

    /**
     * ## http
     *
     * Method takes as many as necessary parameters, with url being the only required.
     * The return then has the methods `.then( _cb )` and `.error( _cb )`
     *
     * @param {Object} _parameters http parameters. possible properties
     *                             method, url, data, user, password, headers, async
     *
     * @example µ.http( {url: './test.html', method: 'POST', data: { number: 67867} } ).then( function(){} ).catch( function(){} );
     */
    Microbe.http = function( _parameters )
    {
        var req, method, url, data, user, password, headers, async;

        if ( !_parameters )
        {
            return new Error( 'No parameters given' );
        }
        else
        {
            if ( typeof _parameters === 'string' )
            {
                _parameters = { url: _parameters };
            }

            req         = new XMLHttpRequest();
            method      = _parameters.method || 'GET';
            url         = _parameters.url;
            data        = JSON.stringify( _parameters.data ) || null;
            user        = _parameters.user || '';
            password    = _parameters.password || '';
            headers     = _parameters.headers  || null;
            async       = typeof _parameters.async === "boolean" ?
                                _parameters.async : true;

            req.onreadystatechange = function()
            {
                if ( req.readyState === 4 )
                {
                    return req;
                }
            };
        }

        req.open( method, url, async, user, password );

        // weird Safari voodoo fix
        if ( method === 'POST' )
        {
            req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
        }

        if ( headers )
        {
            for ( var header in headers )
            {
                req.setRequestHeader( header, headers[header] );
            }
        }

        if ( async )
        {
            return new Promise( function( resolve, reject )
            {
                req.onerror = function()
                {
                    reject( new Error( 'Network error!' ) );
                };

                req.send( data );
                req.onload = function()
                {
                    if ( req.status === 200 )
                    {
                        resolve( req.response );
                    }
                    else
                    {
                        reject( new Error( req.status ) );
                    }
                };

            });
        }
        else
        {
            var _response = function( _val )
            {
                var _responses = {

                    /**
                     * ## .then
                     *
                     * Called after `http`, `http.get`, or `http.post`, this is
                     * called passing the result as the first parameter to the callback
                     *
                     * @param {Function} _cb function to call after http request
                     *
                     * @return _Object_ contains the `.catch` method
                     */
                    then: function( _cb )
                    {
                        if ( _val.status === 200 )
                        {
                            _cb( _val.responseText );
                        }
                        return _responses;
                    },


                    /**
                     * ## .catch
                     *
                     * Called after `http`, `http.get`, or `http.post`, this is
                     * called passing the error as the first parameter to the callback
                     *
                     * @param {Function} _cb function to call after http request
                     *
                     * @return _Object_ contains the `.then` method
                     */
                    catch: function( _cb )
                    {
                        if ( _val.status !== 200 )
                        {
                            _cb({
                                status      : _val.status,
                                statusText  : _val.statusText
                            });
                        }
                        return _responses;
                    }
                };
                return _responses;
            };

            req.send( data );
            req.onloadend = function()
            {
                req.onreadystatechange();
                return _response( req );
            };

            return req.onloadend();
        }
    };


    /**
     * ## http.get
     *
     * Syntactic shortcut for simple GET requests
     *
     * @param {String} _url file url
     *
     * @example µ.http.get( './test.html' ).then( function(){} ).catch( function(){} );
     *
     * @return _Object_ contains `.then` and `.catch`
     */
    Microbe.http.get = function( _url )
    {
        return this( {
            url     : _url,
            method  : 'GET'
        } );
    };


    /**
     * ## http.post
     *
     * Syntactic shortcut for simple POST requests
     *
     * @param {String} _url file url
     * @param {Mixed} _data data to post to location {Object or String}
     *
     * @example µ.http.post( './test.html', { number: 67867} ).then( function(){} ).catch( function(){} );
     *
     * @return _Object_ contains `.then` and `.catch`
     */
    Microbe.http.post = function( _url, _data )
    {
        return this( {
            url     : _url,
            data    : _data,
            method  : 'POST'
        } );
    };
};

},{"promise":5}],16:[function(require,module,exports){
/**
 * observe.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

module.exports = function( Microbe )
{
    'use strict';

    // shim needed for observe
    if ( ! Object.observe )
    {
        require( 'setimmediate' );
        require( 'observe-shim' );
        var ObserveUtils = require( 'observe-utils' );
    }


    /**
     * ## get
     *
     * gets the saved value from each element in the microbe in an array
     *
     * @param {String} _prop property to get
     *
     * @example µ( '.example' ).get( 'moon' );
     *
     * @return _Array_ array of values
     */
    Microbe.core.get = function( prop )
    {
        var _get = function( _el )
        {
            if ( ! prop )
            {
                return _el.data;
            }
            else
            {
                if ( _el.data && _el.data[ prop ] && _el.data[ prop ][ prop ] )
                {
                    return _el.data[ prop ][ prop ];
                }
                else
                {
                    return false;
                }
            }
        };

        return this.map( _get );
    };


    /**
     * ## observe
     *
     * Applies a function to an element if it is changed from within µ
     *
     * @param {Function} function function to apply
     * @param {String} _prop property to observe
     * @param {Boolean} _once bool to trigger auto unobserve
     *
     * @example µ( '.example' ).observe( 'moon', function(){ console.log( 'moon!' ); } );
     *
     * @return _Microbe_  reference to original microbe
     */
    Microbe.core.observe = function( prop, func, _once )
    {
        var _observe = function( _elm )
        {
            var _setObserve = function( _target )
            {
                if ( _once === true )
                {
                    var _func = function( e )
                    {
                        _target._observeFunc( e );
                        Object.unobserve( _target, _func );
                    }.bind( this );

                    Object.observe( _target, _func );
                }
                else
                {
                    Object.observe( _target, _target._observeFunc );
                }
            };

            var _setObserveFunc = function( _target )
            {
                if ( _target._observeFunc )
                {
                    Object.unobserve( _target, _target._observeFunc );
                }

                _target._observeFunc     = func;

                return _target;
            };

            _elm.data   = _elm.data || {};
            var _data   = _elm.data;
            func        = func.bind( this );

            var target = null;

            if ( prop )
            {
                _data[ prop ]  = _data[ prop ] || {};

                if ( ObserveUtils )
                {
                    ObserveUtils.defineObservableProperties( _data[ prop ], prop );
                }

                target = _setObserveFunc( _data[ prop ] );
                _setObserve( target );
            }
            else
            {
                var _props = [ 'attr', 'text', 'css', 'html', 'class' ];

                for ( var i = 0, lenI = _props.length; i < lenI; i++ )
                {
                    _data[ _props[ i ] ] = _data[ _props[ i ] ] || {};

                    target = _setObserveFunc( _data[ _props[ i ] ] );
                    _setObserve( target, _props[ i ] );
                }

                target = _setObserveFunc( _data );
                _setObserve( target, null );

            }
        }.bind( this );

        if ( typeof prop === 'function' )
        {
            func    = prop;
            prop    = null;
        }

        this.each( _observe );

        return this;
    };


    /**
     * ## observeOnce
     *
     * Applies a function to an element if it is changed from within µ (once)
     *
     * @param {Function} func function to apply
     * @param {String} _prop property to observe
     *
     * @example µ( '.example' ).observeOnce( 'moon', function(){ console.log( 'moon!' ); } );
     *
     * @return _Microbe_ reference to original microbe
     */
    Microbe.core.observeOnce = function( func, _prop )
    {
        this.observe( func, _prop, true );
    };


    /**
     * ## set
     *
     * Sets the value to the data object in the each element in the microbe
     *
     * @param {String} prop property to set
     * @param {String} value value to set to
     *
     * @example µ( '.example' ).set( 'moon', 'doge' );
     *
     * @return _Microbe_ reference to original microbe
     */
    Microbe.core.set = function( prop, value )
    {
        var _set = function( _el )
        {
            _el.data                    = _el.data || {};

            // shim
            if ( ObserveUtils && ! _el.data[ prop ] )
            {
                ObserveUtils.defineObservableProperties( _el.data, prop );
            }

            if ( Microbe.isArray( value ) )
            {
                value = Microbe.extend( [], value );
            }
            else if ( Microbe.isObject( value ) )
            {
                value = Microbe.extend( {}, value );
            }

            _el.data[ prop ]            = _el.data[ prop ] || {};
            _el.data[ prop ][ prop ]    = value;
        };

        this.each( _set );

        return this;
    };


    /**
     * ## unobserve
     *
     * Stops watching the data changes of a µ object
     *
     * @param {String} _prop property to stop observing
     *
     * @example µ( '.example' ).unobserve( 'moon' );
     *
     * @return _Microbe_ reference to original microbe
     */
    Microbe.core.unobserve = function( _prop )
    {
        var _unobserve = function( _elm )
        {
            var _data = _elm.data;

            if ( _data )
            {
                if ( _prop && _data[ _prop ] && _data[ _prop ]._observeFunc )
                {
                    Object.unobserve( _data[ _prop ], _data[ _prop ]._observeFunc );
                }
                else if ( ! _prop )
                {
                    if ( _data._observeFunc )
                    {
                        Object.unobserve( _data, _data._observeFunc );
                    }

                    for ( var _property in _data )
                    {
                        if ( _data[ _property ]._observeFunc )
                        {
                            Object.unobserve( _data[ _property ], _data[ _property ]._observeFunc );
                        }
                    }
                }
            }
        }.bind( this );

        this.each( _unobserve );

        return this;
    };
};

},{"observe-shim":3,"observe-utils":4,"setimmediate":11}],17:[function(require,module,exports){
/**
 * root.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

module.exports = function( Microbe )
{
    'use strict';

    window.Promise  = window.Promise || require( 'promise' );
    var Types       = require( './types' );

    /**
     * ## capitalize
     *
     * capitalizes every word in a string or an array of strings and returns the
     * type that it was given
     *
     * @param {Mixed} text string(s) to capitalize _{String or Array}_
     *
     * @example µ.capotalize( 'moon doge' ); // "Moon Doge"
     *
     * @return _Mixed_  capitalized string(s) values _{String or Array}_
     */
    Microbe.capitalize = function( text )
    {
        var array   = Microbe.isArray( text );
        text        = !array ? [ text ] : text;

        var str, res = [];

        for ( var i = 0, lenI = text.length; i < lenI; i++ )
        {
            str = text[ i ].split( ' ' );
            for ( var j = 0, lenJ = str.length; j < lenJ; j++ )
            {
                str[ j ] = str[ j ][ 0 ].toUpperCase() + str[ j ].slice( 1 );
            }
            res.push( str.join( ' ' ) );
        }

        return ( array ) ? res : res[ 0 ];
    };


    /**
     * ## capitalise
     *
     * british people....
     *
     * @example µ.capitalise( 'moon doge' ); // "Moon Doge"
     */
    Microbe.capitalise = Microbe.capitalize;


    /**
     * ## debounce
     *
     *  Returns a function, that, as long as it continues to be invoked, will not
     *  be triggered. The function will be called after it stops being called for
     *  [[wait]] milliseconds. If `immediate` is passed, trigger the function on
     *  the leading edge, instead of the trailing.
     *
     * @param {Function} _func function to meter
     * @param {Number} wait milliseconds to wait
     * @param {Boolean} immediate run function at the start of the timeout
     *
     * @example µ.debounce( function(){ return Date.now(); }, 250 );
     * @example µ.debounce( function(){ return Date.now(); }, 250, true );
     *
     * @return _Function_
     */
    Microbe.debounce = function( _func, wait, immediate )
    {
        var timeout;

        return function()
        {
            var self = this,
                args    = arguments;

            var later   = function()
            {
                timeout = null;

                if ( !immediate )
                {
                    _func.apply( self, args );
                }
            };

            var callNow = immediate && !timeout;
            clearTimeout( timeout );
            timeout     = setTimeout( later, wait );

            if ( callNow )
            {
                _func.apply( self, args );
            }
        };
    };


    /**
     * ## extend
     *
     * Extends an object or microbe
     *
     * @example µ.extend( { a: 1, b: 2 }, { c: 3, d: 4 } );
     *
     * @return _Object_ reference to this (microbe) or the first
     *                     object passed (root)
     */
    Microbe.extend = function()
    {
        var µIsObject   = Microbe.isObject;
        var µIsArray    = Microbe.isArray;

        var res     = arguments[ 0 ] || {};
        var i       = 1;
        var length  = arguments.length;
        var deep    = false;

        if ( typeof res === 'boolean' )
        {
            deep    = res;
            res     = arguments[ i ] || {};
            i++;
        }

        if ( typeof res !== 'object' && !Microbe.isFunction( res ) )
        {
            res = {};
        }

        if ( i === length )
        {
            res = this;
            i--;
        }

        var _object, _p, src, copy, isArray, clone;
        for ( ; i < length; i++ )
        {
            _object = arguments[ i ];

            if ( _object !== null && _object !== undefined )
            {
                for ( _p in _object )
                {
                    src     = res[ _p ];
                    copy    = _object[ _p ];

                    if ( res === copy )
                    {
                        continue;
                    }

                    if ( deep && copy && ( µIsObject( copy ) ||
                            ( isArray = µIsArray( copy ) ) ) )
                    {
                        if ( isArray )
                        {
                            isArray = false;
                            clone   = src && µIsArray( src ) ? src : [];
                        }
                        else
                        {
                            clone = src && µIsObject( src ) ? src : {};
                        }

                        res[ _p ] = Microbe.extend( deep, clone, copy );
                    }
                    else if ( copy !== undefined )
                    {
                        res[ _p ] = copy;
                    }
                }
            }
        }

        return res;
    };


    /**
     * mounts extend to the core
     *
     * @example µ( '.example' ).extend( { c: 3, d: 4 } );
     */
    Microbe.core.extend     = Microbe.extend;


    /**
     * ## identity
     *
     * returns itself.  useful in functional programmnig when a function must be executed
     *
     * @param {any} value any value
     *
     * @example µ.identity( 'moon' ); // 'moon'
     *
     * @return _any_
     */
    Microbe.identity = function( value ) { return value; };


    /**
     * ## insertStyle
     *
     * builds a style tag for the given selector/ media query.  Reference to the style
     * tag and object is saved in µ.__customCSSRules[ selector ][ media ].
     * next rule with the same selector combines the old and new rules and overwrites
     * the contents
     *
     * @param {String} selector selector to apply it to
     * @param {Mixed} cssObj css object. _{String or Object}_
     * @param {String} media media query
     *
     * @example µ.insertStyle( '.example', { display: 'block', color: '#000' } );
     * @example µ.insertStyle( '.example', { display: 'block', color: '#000' }, 'min-width: 61.25em' );
     *
     * @return _Object_ reference to the appropriate style object
     */
    Microbe.insertStyle = function( selector, cssObj, media )
    {
        var _s      = selector.replace( / /g, '-' );
        var _clss   = media ? _s +  media.replace( /[\s:\/\[\]\(\)]+/g, '-' ) : _s;

        media       = media || 'none';

        var createStyleTag = function()
        {
            var el = document.createElement( 'style' );
            el.className = 'microbe--inserted--style__' + _clss;

            if ( media && media !== 'none' )
            {
                el.setAttribute( 'media', media );
            }

            document.head.appendChild( el );

            return el;
        };

        var _el, prop;
        var styleObj =  Microbe.__customCSSRules[ _s ];

        if ( styleObj && styleObj[ media ] )
        {
            _el     = styleObj[ media ].el;
            var obj = styleObj[ media ].obj;

            for ( prop in cssObj )
            {
                obj[ prop ] = cssObj[ prop ];
            }

            cssObj = obj;
        }
        else
        {
            _el = createStyleTag();
        }

        var css = selector + '{';
        for ( prop in cssObj )
        {
            css += prop + ' : ' + cssObj[ prop ] + ';';
        }
        css += '}';

        _el.innerHTML = css;

        Microbe.__customCSSRules[ _s ] = Microbe.__customCSSRules[ _s ] || {};
        Microbe.__customCSSRules[ _s ][ media ] = { el: _el, obj: cssObj };

        return _el;
    };

    // keep track of tags created with insertStyle
    Microbe.__customCSSRules = {};


    /**
     * ## isArray
     *
     * native isArray for completeness
     *
     * @example µ.isArray( [ 1, 2, 3 ] ); // true
     *
     * @type _Function_
     */
    Microbe.isArray = Array.isArray;


    /**
     * ## isEmpty
     *
     * Checks if the passed object is empty
     *
     * @param {Object} obj object to check
     *
     * @example µ.isEmpty( {} ); // true
     *
     * @return _Boolean_ empty or not
     */
    Microbe.isEmpty = function( obj )
    {
        var name;
        for ( name in obj )
        {
            return false;
        }

        return true;
    };


    /**
     * ## isFunction
     *
     * Checks if the passed parameter is a function
     *
     * @param {Object} obj object to check
     *
     * @example µ.isFunction( function(){} ); // true
     *
     * @return _Boolean_ function or not
     */
    Microbe.isFunction = function( obj )
    {
        return Microbe.type( obj ) === "function";
    };


    /**
     * ## isObject
     *
     * Checks if the passed parameter is an object
     *
     * @param {Object} obj object to check
     *
     * @example µ.isObject( {} ); // true
     *
     * @return _Boolean_ isObject or not
     */
    Microbe.isObject = function( obj )
    {
        if ( Microbe.type( obj ) !== "object" || obj.nodeType || Microbe.isWindow( obj ) )
        {
            return false;
        }

        return true;
    };


    /**
     * ## isUndefined
     *
     * Checks if the passed parameter is undefined
     *
     * @param {String} obj property
     * @param {Object} parent object to check
     *
     * @example µ.isUndefined( {} ); // false
     *
     * @return _Boolean_ obj in parent
     */
    Microbe.isUndefined = function( obj, parent )
    {
        if ( parent && typeof parent !== 'object' )
        {
            return true;
        }

        return parent ? !( obj in parent ) : obj === void 0;
    };


    /**
     * ## isWindow
     *
     * Checks if the passed parameter equals window
     *
     * @param {Object} obj object to check
     *
     * @example µ.isWindow( window ); // true
     *
     * @return _Boolean_ isWindow or not
     */
    Microbe.isWindow = function( obj )
    {
        return obj !== null && obj === obj.window;
    };


    /**
     * ## merge
     *
     * Combines microbes, arrays, and/or array-like objects.
     *
     * @param {Mixed} first               first object _{Array-like Object or Array}_
     * @param {Mixed} second              second object _{Array-like Object or Array}_
     *
     * @example µ.merge( [ 1, 2 ], [ 2, 3, 4 ] ); // [ 1, 2, 2, 3, 4 ]
     * @example µ.merge( [ 1, 2 ], [ 2, 3, 4 ], true );// [ 1, 2, 3, 4 ]
     *
     * @return _Mixed_ combined array or array-like object (based off first)
     */
    Microbe.merge = function( first, second, unique )
    {
        if ( typeof second === 'boolean' )
        {
            unique = second;
            second = null;
        }

        if ( !second )
        {
            second  = first;
            first   = this;
        }

        var i = first.length;

        if ( typeof i === 'number' )
        {
            for ( var j = 0, len = second.length; j < len; j++ )
            {
                if ( !unique || first.indexOf( second[ j ] ) === -1 )
                {
                    first[ i++ ] = second[ j ];
                }
            }

            first.length = i;
        }

        return first;
    };


    Microbe.core.merge      = Microbe.merge;


    /**
     * ## noop
     *
     * Nothing happens
     *
     * https://en.wikipedia.org/wiki/Xyzzy_(computing)
     *
     * @example µ.noop()
     *
     * @return _void_
     */
    Microbe.noop = function() {};


    /**
     * ## once
     *
     * returns a function that can only be run once
     *
     * @param {Function} _func function to run once
     *
     * @example µ.once( function( a ){ return 1 + 1; } );
     *
     * @return _Function_
     */
    Microbe.once = function( _func, self )
    {
        var result;

        return function()
        {
            if( _func )
            {
                result  = _func.apply( self || this, arguments );
                _func   = null;
            }

            return result;
        };
    };


    /**
     * ## poll
     *
     * checks a passed function for true every [[interval]] milliseconds.  when
     * true, it will run _success, if [[timeout[[]] is reached without a success,
     * _error is excecuted
     *
     * @param {Function} _func function to check for true
     * @param {Function} _success function to run on success
     * @param {Function} _error function to run on error
     * @param {Number} timeout time (in ms) to stop polling
     * @param {Number} interval time (in ms) in between polling
     *
     * @example µ.poll( function( a ){ return a === 2; },
     *                    function( a ){ console.log( 'a === 2' ); },
     *                    function( a ){ console.log( 'a !== 2' ); } );
     * @example µ.poll( function( a ){ return a === 2; },
     *                    function( a ){ console.log( 'a === 2' ); },
     *                    function( a ){ console.log( 'a !== 2' ); },
     *                    200, 10000 );
     *
     * @return _Function_
     */
    Microbe.poll = function( _func, _success, _error, timeout, interval )
    {
        var endTime = Number( new Date() ) + ( timeout || 2000 );
        interval    = interval || 100;

        ( function p()
        {
            if ( _func() )
            {
                try
                {
                    _success();
                }
                catch( e )
                {
                    throw 'No argument given for success function';
                }
            }
            else if ( Number( new Date() ) < endTime )
            {
                setTimeout( p, interval );
            }
            else {
                try
                {
                    _error( new Error( 'timed out for ' + _func + ': ' + arguments ) );
                }
                catch( e )
                {
                    throw 'No argument given for error function.';
                }
            }
        } )();
    };


    /**
     * ## removeStyle
     *
     * removes a microbe added style tag for the given selector/ media query. If the
     * properties array is passed, rules are removed individually.  If properties is
     * set to true, all tags for this selector are removed.  The media query can
     * also be passed as the second variable
     *
     * @param {String} selector selector to apply it to
     * @param {Mixed} properties css properties to remove 'all' to remove all
     *                 selector tags string as media query {String or Array}
     * @param {String} media media query
     *
     * @example µ.removeStyle( '.example', 'all' );
     * @example µ.removeStyle( '.example', 'display' );
     * @example µ.removeStyle( '.example', [ 'display', 'color' ], 'min-width:70em'  );
     *
     * @return _Boolean_ removed or not
     */
    Microbe.removeStyle = function( selector, properties, media )
    {
        if ( !media && typeof properties === 'string' && properties !== 'all' )
        {
            media = properties;
            properties = null;
        }

        media = media || 'none';

        var _removeStyle = function( _el, _media )
        {
            _el.parentNode.removeChild( _el );
            delete Microbe.__customCSSRules[ selector ][ _media ];
        };

        var style = Microbe.__customCSSRules[ selector ];

        if ( style )
        {
            if ( properties === 'all' )
            {
                for ( var _mq in style )
                {
                    _removeStyle( style[ _mq ].el, _mq );
                }
            }
            else
            {
                style = style[ media ];

                if ( style )
                {
                    if ( Microbe.isArray( properties ) && !Microbe.isEmpty( properties ) )
                    {
                        for ( var i = 0, lenI = properties.length; i < lenI; i++ )
                        {
                            if ( style.obj[ properties[ i ] ] )
                            {
                                delete style.obj[ properties[ i ] ];
                            }
                        }
                        if ( Microbe.isEmpty( style.obj ) )
                        {
                            _removeStyle( style.el, media );
                        }
                        else
                        {
                            Microbe.insertStyle( selector, style.obj, media );
                        }
                    }
                    else
                    {
                        _removeStyle( style.el, media );
                    }
                }
                else
                {
                    return false;
                }
            }
        }
        else
        {
            return false;
        }

        return true;
    };


    /**
     * ## removeStyles
     *
     * removes all microbe added style tags for the given selector
     *
     * @param {String} selector selector to apply it to
     *
     * @example µ.removeStyle( '.example' );
     *
     * @return _Boolean_ removed or not
     */
    Microbe.removeStyles = function( selector )
    {
        return Microbe.removeStyle( selector, 'all' );
    };


    /**
     * ## toArray
     *
     * Methods returns all the elements in an array.
     *
     * @example µ.toArray( µ( 'div' ) );
     *
     * @return _Array_
     */
    Microbe.toArray = function( _arr )
    {
        return Array.prototype.slice.call( _arr || this );
    };


    /**
     * attaches toArray to core
     *
     * @example µ( 'div' ).toArray();
     */
    Microbe.core.toArray    = Microbe.toArray;


    /**
     * ## type
     *
     * returns the type of the parameter passed to it
     *
     * @param {all} obj parameter to test
     *
     * @example µ.type( 'moon' ); // 'string'
     * @example µ.type( [ 'moon' ] ); // 'array'
     *
     * @return _String_ typeof obj
     */
    Microbe.type = function( obj )
    {
        if ( obj === null )
        {
            return obj + '';
        }

        var type = Types[ Object.prototype.toString.call( obj ) ];
            type = !type ? Types[ obj.toString() ] : type;

        type = type || typeof obj;

        if ( type === 'object' && obj instanceof Promise )
        {
            type = 'promise';
        }

        return  type;
    };


    /**
     * ## xyzzy
     *
     * nothing happens
     *
     * https://en.wikipedia.org/wiki/Xyzzy_(computing)
     *
     * @example µ.xyzzy();
     *
     * @return _void_
     */
    Microbe.xyzzy   = Microbe.noop;
};

},{"./types":18,"promise":5}],18:[function(require,module,exports){
/**
 * types.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */
 /*jshint globalstrict: true*/
'use strict';

module.exports = {
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Error]'    : 'error',
    '[object Promise]'  : 'promise',
    '[object Microbe]'  : 'microbe'
};

},{}],19:[function(require,module,exports){
/**
 * array.js
 *
 * methods based on the array prototype
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

 /*jshint globalstrict: true*/
'use strict';
module.exports = function( Microbe )
{
    Microbe.core.every          = Array.prototype.every;
    Microbe.core.findIndex      = Array.prototype.findIndex;
    Microbe.core.each           = Array.prototype.forEach;
    Microbe.core.forEach        = Array.prototype.forEach;
    Microbe.core.includes       = Array.prototype.includes;
    Microbe.core.indexOf        = Array.prototype.indexOf;
    Microbe.core.lastIndexOf    = Array.prototype.lastIndexOf;
    Microbe.core.map            = Array.prototype.map;
    Microbe.core.pop            = Array.prototype.pop;
    Microbe.core.push           = Array.prototype.push;
    Microbe.core.reverse        = Array.prototype.reverse;
    Microbe.core.shift          = Array.prototype.shift;
    Microbe.core.slice          = Array.prototype.slice;
    Microbe.core.some           = Array.prototype.some;
    Microbe.core.sort           = Array.prototype.sort;
    Microbe.core.unshift        = Array.prototype.unshift;

    /*
     * needed to be modified slightly to output a microbe
     */
    Microbe.core.splice         = function( start, deleteCount )
    {
        return this.constructor( Array.prototype.splice.call( this, start, deleteCount ) );
    };
};

},{}],20:[function(require,module,exports){
/**
 * pseudo.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */
var _cleanArray = function( _r ){ return !!( _r ); };

module.exports = function( Microbe )
{
    'use strict';

    /**
     * ## children
     *
     * Gets a microbe of all the given element's children
     *
     * @param {String} selector css selector string filter
     *
     * @example µ( '.example' ).children();
     * @example µ( '.example' ).children( 'div' );
     *
     * @return _Array_  array of microbes (value)
     */
    Microbe.core.children = function( selector )
    {
        var _constructor = this.constructor;

        var _children = function( _el )
        {
            _el = _constructor( _el.children );

            if ( typeof selector === 'string' )
            {
                return _el.filter( selector );
            }

            return  _el;
        };

        return this.map( _children );
    };


    /**
     * ## childrenFlat
     *
     * Gets an microbe of all children of all element's given
     *
     * @param {String} selector css selector string filter
     *
     * @example µ( '.example' ).childrenFlat();
     * @example µ( '.example' ).childrenFlat( 'div' );
     *
     * @return _Microbe_ value array of combined children
     */
    Microbe.core.childrenFlat = function( selector )
    {
        var i = 0, childrenArray = [];

        var _childrenFlat = function( _el )
        {
            var arr         = _el.children;
            var arrLength   = arr.length;

            for ( var j = 0; j < arrLength; j++ )
            {
                childrenArray[ i ] = arr[ j ];
                i++;
            }
        };

        this.each( _childrenFlat );

        var _el = this.constructor( childrenArray );

        if ( typeof selector === 'string' )
        {
            return _el.filter( selector );
        }

        return _el;
    };


    /**
     * ## filter
     *
     * Filters the microbe by the given given selector or function.  In the case
     * of a function, the element is passed as this. The inclusion on an element
     * into the set is based on the return of the function
     *
     * @param {Mixed} selector selector or function to filter by
     *
     * @example µ( '.example' ).filter( 'div' );
     * @example µ( '.example' ).filter( function( _el ){ return _el.tagName === 'div'; } );
     *
     * @return _Microbe_ new microbe containing only the filtered values
     */
    Microbe.core.filter = function( filter )
    {
        var pseudo, filters, self = this, _el, method;

        if ( this.length === 0 )
        {
            return this;
        }

        if ( typeof filter === 'function' )
        {
            var res = [];

            for ( var i = 0, lenI = this.length; i < lenI; i++ )
            {
                res[ i ] = filter.call( this[ i ], i ) ? this[ i ] : null;
            }
            res = res.filter( _cleanArray );

            return this.constructor( res );
        }
        else
        {
            var _filter = function( _f, _self, i )
            {
                if ( Microbe.pseudo[ _f[ 0 ] ] )
                {
                    return Microbe.pseudo[ _f[ 0 ] ]( _self, _f[ 1 ] );
                }
                else
                {
                    var resArray = [], _selector;
                    _selector = i === 0 ? _f[ 0 ] : ':' + _f[ 0 ];
                    if ( _selector !== '' )
                    {
                        if ( _f[ 1 ] !== '' )
                        {
                            _selector += '(' + _f[ 1 ] + ')';
                        }
                        for ( var j = 0, lenJ = _self.length; j < lenJ; j++ )
                        {
                            _el = _self[ j ];
                            resArray[ j ] = Microbe.matches( _el, _selector ) === true ? _el : null;
                        }
                        resArray = resArray.filter( _cleanArray );
                    }

                    return new Microbe( resArray );
                }
            };

            if ( filter && filter.indexOf( ':' ) !== -1 )
            {
                pseudo  = filter.split( ':' );
                filters = [ [ pseudo.splice( 0, 1 ).toString(), '' ] ];

                var _p, pseudoArray;

                for ( var h = 0, lenH = pseudo.length; h < lenH; h++ )
                {
                    _p = pseudo[ h ];

                    if ( _p.indexOf( '(' ) !== - 1 )
                    {
                        _p      = _p.split( '(' );
                        _p[ 1 ] = _p[ 1 ].replace( ')', '' );
                    }
                    else
                    {
                        _p      = [ _p, '' ];
                    }

                    filters.push( _p );
                }
            }
            else if ( filter )
            {
                filters = [ [ filter, '' ] ];
            }
            else
            {
                return this;
            }

            for ( var k = 0, lenK = filters.length; k < lenK; k++ )
            {
                if ( self.length !== 0 )
                {
                    if ( filters[ k ][ 0 ] !== '' )
                    {
                        self = _filter( filters[ k ], self, k );
                    }
                }
                else
                {
                    return self;
                }
            }

            return self;
        }
    };


    /**
     * ## find
     *
     * Finds a child element with the given selector inside the scope of the current microbe
     *
     * @param {String} selector            selector to search for
     *
     * @example µ( '.example' ).find( 'div' );
     *
     * @return _Microbe_ new microbe containing only the found children values
     */
    Microbe.core.find = function( _selector )
    {
        var _s          = _selector[ 0 ];

        if ( _s === ' ' )
        {
            _selector   = _selector.trim();
            _s          = _selector[ 0 ];
        }

        if ( _s === '>' )
        {
            _selector = _selector.slice( 1 ).trim();
            return this.childrenFlat().filter( _selector );
        }
        else if ( _s === '~' )
        {
            _selector = _selector.slice( 1 ).trim();
            return this.siblingsFlat().filter( _selector );
        }
        else if ( _s === '!' )
        {
            return this.parent();
        }
        else if ( _s === '+' )
        {
            _selector       = _selector.slice( 1 ).trim();
            var resArray    = [],
                _el, els    = this.children();

            for ( var i = 0, lenI = els.length; i < lenI; i++ )
            {
                _el = els[ i ][ 0 ];

                resArray[ i ] = _el ? _el : null;
            }

            resArray.filter( _cleanArray );

            return new Microbe( resArray ).filter( _selector );
        }
        else if ( _selector.indexOf( ':' ) !== -1 )
        {
            return this.constructor( _selector, this );
        }

        var _children = new Microbe( _selector ), res = [], r = 0;

        for ( var j = 0, lenJ = this.length; j < lenJ; j++ )
        {
            for ( var k = 0, lenK = _children.length; k < lenK; k++ )
            {
                if ( Microbe.contains( _children[ k ], this[ j ] ) )
                {
                    res[ r ] = _children[ k ];
                    r++;
                }
            }
        }

        return this.constructor( res );
    };


    /**
     * ## first
     *
     * gets the first Element and wraps it in Microbe.
     *
     * @example µ( '.example' ).first();
     *
     * @return _Microbe_ new Microbe containing only the first value
     */
    Microbe.core.first = function()
    {
        if ( this.length !== 0 )
        {
            return this.constructor( this[ 0 ] );
        }

        return this.constructor( [] );
    };


    /**
     * ## last
     *
     * Gets the last Element and wraps it in Microbe.
     *
     * @example µ( '.example' ).last();
     *
     * @return _Microbe_ new microbe containing only the last value
     */
    Microbe.core.last = function()
    {
        var len = this.length;

        if ( len === 1 )
        {
            return this;
        }
        else if ( len !== 0 )
        {
            return this.constructor( this[ len - 1 ] );
        }

        return this.constructor( [] );
    };


    /**
     * ## parent
     *
     * gets all elements in a microbe's parent nodes
     *
     * @example µ( '.example' ).parent();
     *
     * @return _Microbe_ new microbe containing parent elements (index-preserved)
     */
    Microbe.core.parent = function()
    {
        var _parent = function( _el )
        {
            return _el.parentNode;
        };

        var i, len, parentArray = new Array( this.length );

        for ( i = 0, len = this.length; i < len; i++ )
        {
            parentArray[ i ] = _parent( this[ i ] );
        }

        return this.constructor( parentArray );
    };


    /**
     * ## siblings
     *
     * Gets an microbe of all of each given element's siblings
     *
     * @param {String} selector css selector string filter
     *
     * @example µ( '.example' ).siblings();;
     * @example µ( '.example' ).siblings( 'div' );
     *
     * @return _Array_ array of microbes (value)
     */
    Microbe.core.siblings = function( selector )
    {
        var _constructor = this.constructor;

        var _siblings = function( _el )
        {
            var res     = [], r = 0;
            var sibling = _el.parentNode.firstElementChild;
            for ( ; sibling; )
            {
                if ( sibling !== _el )
                {
                    res[ r ] = sibling;
                    r++;
                }
                sibling = sibling.nextElementSibling;
                if ( !sibling )
                {
                    res = _constructor( res );

                    if ( typeof selector === 'string' )
                    {
                        return res.filter( selector );
                    }

                    return res;
                }
            }
        };

        return this.map( _siblings );
    };


    /**
     * ## siblingsFlat
     *
     * Gets an microbe of all siblings of all element's given. 'next' and 'prev'
     * passed as direction return only the next or previous siblings of each element
     *
     * @param {String} direction direction modifier (optional)
     *
     * @example µ( '.example' ).siblingsFlat();
     * @example µ( '.example' ).siblingsFlat( 'div' );
     *
     * @return _Microbe_ value array of combined siblings
     */
    Microbe.core.siblingsFlat = function( selector )
    {
        var i = 0, siblingsArray = [];
        var isSiblingConnector = ( selector === '+' || selector === '~' );

        var _siblingsFlat = function( _el )
        {
            var sibling = _el;

            if ( !isSiblingConnector )
            {
                sibling = _el.parentNode.firstElementChild;
            }
            else
            {
                sibling = _el.nextElementSibling;
            }

            for ( ; sibling; )
            {
                if ( sibling !== _el && siblingsArray.indexOf( sibling ) === -1 )
                {
                    siblingsArray[ i ] = sibling;
                    i++;
                }
                sibling = sibling.nextElementSibling;

                if ( !sibling || selector === '+' )
                {
                    break;
                }
            }
        };

        this.each( _siblingsFlat );

        var _el = this.constructor( siblingsArray );

        if ( typeof selector === 'string' && !isSiblingConnector )
        {
            return _el.filter( selector );
        }

        return _el;
    };


    /**
     * ## toString
     *
     * Methods returns the type of Microbe.
     *
     * @example µ( '.example' ).toString();
     *
     * @return _String_
     */
    Microbe.core.toString = function()
    {
        return this.type;
    };
};
},{}],21:[function(require,module,exports){
/**
 * Microbe.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

var slice = Array.prototype.slice;

module.exports = function( Microbe, _type )
{
    'use strict';

    Microbe.core        = {};
    var trigger, _shortSelector;

    var selectorRegex = Microbe.prototype.__selectorRegex =  /(?:[\s]*\.([\w-_\.]+)|#([\w-_]+)|([^#\.:<][\w-_]*)|(<[\w-_#\.]+>)|:([^#\.<][\w-()_]*))/g;

    // TODO: Check if we hit the duck

    /**
     * ## _build
     *
     * Builds and returns the final Microbe
     *
     * @param {Array} _elements array of elements
     * @param {String} _selector selector
     *
     * @return _Microbe_ Microbe wrapped elements
     */
    function _build( _elements, self )
    {
        var i = 0, lenI = _elements.length;

        for ( ; i < lenI; i++ )
        {
            self[ i ]           = _elements[ i ];
        }

        self.length     = i;

        return self;
    }


    /**
     * ## _create
     *
     * Method creates Microbe from a passed string, and returns it
     *
     * @param {String} _el element to create
     * @param {Object} this reference to pass on to _build
     *
     * @return _Microbe_
     */
    function _create( _el, self )
    {
        var resultsRegex    = _el.match( selectorRegex ),
            _id = '', _tag = '', _class = '';

        var i = 0, lenI = resultsRegex.length;
        for ( ; i < lenI; i++ )
        {
            var trigger = resultsRegex[ i ][ 0 ];
            switch ( trigger )
            {
                case '#':
                    _id     += resultsRegex[ i ];
                    break;

                case '.':
                    _class  += resultsRegex[ i ];
                    break;

                default:
                    _tag    += resultsRegex[ i ];
                    break;
            }
        }

        if ( typeof _tag === 'string' )
        {
            _el = document.createElement( _tag );

            if ( _id )
            {
                _el.id = _id.slice( 1 );
            }

            if ( _class )
            {
                _class = _class.split( '.' );

                for ( i = 1, lenI = _class.length; i < lenI; i++ )
                {
                    _el.classList.add( _class[ i ] );
                }
            }

        }

        return _build( [ _el ], self );
    }


    /**
     * ## _createHtml
     *
     * Method creates a Microbe from an html string, and returns it
     *
     * @param {String} _el element to create
     * @param {Object} this reference to pass on to _build
     *
     * @return _Microbe_
     */
    function _createHtml( _el, self )
    {
        var _ghost          = document.createElement( 'div' );
        _ghost.innerHTML    = _el;
        _el                 = slice.call( _ghost.children );

        for ( var i = 0, lenI = _el.length; i < lenI; i++ )
        {
            _ghost.removeChild( _el[ i ] );
        }

        return _build( _el, self );
    }


    /**
     * ## _css4StringReplace
     *
     * translates css4 strings
     *
     * @param {String} _string pre substitution string
     *
     * @return _String_ post substitution string
     */
    function _css4StringReplace( _string )
    {
        if ( _string.indexOf( '>>' ) !== -1 )
        {
            _string = _string.replace( />>/g, ' ' );
        }
        if ( _string.indexOf( '!' ) !== -1 )
        {
            _string = _string.replace( /!/g, ':parent' );
        }

        return _string;
    }


    /**
     * ## _noScopeSimple
     *
     * if ther is no scope and there is only a simple selector
     *
     * @param {String} _s   selector string
     * @param {Object} self this empty Microbe
     *
     * @return _Microbe_
     */
    function _noScopeSimple( _s, self )
    {
        if ( typeof _s === 'string' && _s.indexOf( ':' ) === -1 &&
                _s.indexOf( '!' ) === -1 && _s.indexOf( ' ' ) === -1 )
        {
            switch ( _s[0] )
            {
                case '#':
                    if ( _s.indexOf( '.' ) === -1 )
                    {
                        var id = document.getElementById( _s.slice( 1 ) );
                        return id === null ? _build( [], self ) : _build( [ id ], self );
                    }
                    break;
                case '.':
                    if ( _s.indexOf( '#' ) === -1 )
                    {
                        var clss = _s.slice( 1 );

                        if ( clss.indexOf( '.' ) === -1 )
                        {
                            return _build( document.getElementsByClassName( clss ), self );
                        }
                        else
                        {
                            clss = clss.split( '.' );

                            var res, _r, _el = document.getElementsByClassName( clss[ 0 ] );
                            for ( var c = 1, lenC = clss.length; c < lenC; c++ )
                            {
                                res = slice.call( document.getElementsByClassName( clss[ c ] ) );

                                for ( var r = 0, lenR = _el.length; r < lenR; r++ )
                                {
                                    _r = _el[ r ];

                                   if ( res.indexOf( _r ) === -1 )
                                   {
                                        _el[ r ] = null;
                                   }
                                }
                            }

                            return _build( _el, self ).filter( function( _e ){ return _e !== null; } );
                        }
                    }
                    break;
                default:
                    if ( _s && _s.indexOf( '[' ) === -1 && _s.indexOf( '<' ) === -1 &&
                            _s.indexOf( '#' ) === -1 && _s.indexOf( '.' ) === -1 )
                    {
                        return _build( document.getElementsByTagName( _s ), self );
                    }
                    break;
            }
        }
        else if ( typeof _s === 'function' && Microbe && typeof Microbe.ready === 'function' )
        {
            Microbe.ready( _s );
        }

        return false;
    }


    /**
     * ## \_\_init\_\_
     *
     * Constructor.
     *
     * Either selects or creates an HTML element and wraps it into a Microbe instance.
     *
     * @param {Mixed} _selector HTML selector (Element String Array)
     * @param {Mixed} _scope scope to look inside (Element String Microbe)
     * @param {Mixed} _elements elements to fill Microbe with (optional) (Element or Array)
     *
     * @example µ()                             ---> empty
     * @example µ( '' )                         ---> empty
     * @example µ( [] )                         ---> empty
     * @example µ( 'div#test' )                 ---> selection
     * @example µ( elDiv )                      ---> selection
     * @example µ( [ elDiv1, elDiv2, elDiv3 ] ) ---> selection
     * @example µ( '&lt;div#test>' )               ---> creation
     * @example µ( '&lt;div id="test">&lt;/div>' )    ---> creation
     *
     * @return _Microbe_
     */
    var Init = Microbe.core.__init__ =  function( _selector, _scope, _elements )
    {
        var res;
        if ( !_scope )
        {
            res = _noScopeSimple( _selector, this );

            if ( res )
            {
                return res;
            }
        }

        if ( typeof _selector === 'string' )
        {
            _selector = _css4StringReplace( _selector );
        }

        if ( typeof _scope === 'string' )
        {
            _scope = _css4StringReplace( _scope );
        }

        _selector = _selector || '';

        if ( _scope && _scope.type === _type )
        {
            res = _build( [], this );

            var next;

            for ( var n = 0, lenN = _scope.length; n < lenN; n++ )
            {
                next = new Init( _selector, _scope[ n ] );

                for ( var i = 0, lenI = next.length; i < lenI; i++ )
                {
                    if ( Array.prototype.indexOf.call( res, next[ i ] ) === -1 )
                    {
                        res[ res.length ] = next[ i ];
                        res.length++;
                    }
                }
            }

            return res;
        }


        /*
         * fast tracks element based queries
         */
        var isArr, isHTMLCollection;
        if ( _selector.nodeType === 1 || ( isArr = Array.isArray( _selector ) ) ||
            _selector === window || _selector === document ||
            ( isHTMLCollection = _selector.toString() === '[object HTMLCollection]' ) )
        {
            if ( !isArr && !isHTMLCollection )
            {
                _selector = [ _selector ];
            }

            return _build( _selector, this );
        }

        _scope = _scope === undefined ?  document : _scope;

        if ( _scope !== document )
        {
            if ( typeof _scope === 'string' && typeof _selector === 'string' )
            {
                return this.constructor( _scope ).find( _selector );
            }
        }

        var scopeNodeType   = _scope.nodeType;

        if ( ( !_selector || typeof _selector !== 'string' ) ||
            ( scopeNodeType !== 1 && scopeNodeType !== 9 ) )
        {
            return _build( [], this );
        }

        var resultsRegex = _selector.match( selectorRegex );

        if ( resultsRegex && resultsRegex.length === 1 && resultsRegex[ 0 ][ 0 ] !== ':'  )
        {
            trigger         = resultsRegex[0][0];

            _shortSelector  = _selector.slice( 1 );

            switch( trigger )
            {
                case '.': // non-document scoped classname search
                    var _classesCount   = ( _selector || '' ).slice( 1 ).split( '.' ).length;

                    if ( _classesCount === 1 )
                    {
                        return _build( _scope.getElementsByClassName( _shortSelector ), this );
                    }
                    break;
                case '#': // non-document scoped id search
                    var _id = document.getElementById( _shortSelector );

                    if ( _scope.ownerDocument && this.contains( _id, _scope ) )
                    {
                        return _build( [ _id ], this );
                    }
                    else
                    {
                        return _build( [], this );
                    }
                    break;
                case '<': // element creation
                    return _create( _selector.substring( 1, _selector.length - 1 ), this );
                default:
                    return _build( _scope.getElementsByTagName( _selector ), this );
            }
        }

        if ( !( this instanceof Init ) )
        {
            return new Init( _selector, _scope, _elements );
        }

        if ( _selector.indexOf( ':' ) !== -1 && _pseudo )
        {
            return _pseudo( this, _selector, _scope, _build );
        }

        // html creation string
        if ( _selector.indexOf( '/' ) !== -1 )
        {
            return _createHtml( _selector, this );
        }

        return _build( _scope.querySelectorAll( _selector ), this );
    };

    Microbe.core.type                 = _type;
    Microbe.core.__init__.prototype   = Microbe.core;

    require( './core' )( Microbe );
    require( './root' )( Microbe );
    require( './pseudo' )( Microbe );
    require( './array' )( Microbe );

    var _pseudo = Microbe.constructor.pseudo;
};

},{"./array":19,"./core":20,"./pseudo":22,"./root":23}],22:[function(require,module,exports){
/**
 * pseudo.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

module.exports = function( Microbe )
{
    'use strict';

    /**
     * ## _parseNth
     *
     * when supplied with a Microbe and a css style n selector (2n1), filters
     * and returns the result
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var number string
     * @param {Boolean} _last counting from the font or back
     *
     * @return _Microbe_
     */
    var _parseNth = function( _el, _var, _last )
    {
        if ( _var === 'odd' )
        {
            _var = '2n';
        }
        else if ( _var === 'even' )
        {
            _var = '2n1';
        }

        if ( _var.indexOf( 'n' ) === -1 )
        {
            switch ( _last )
            {
                case true:
                case 'last':
                    return new Microbe( _el[ _el.length - parseInt( _var ) ] );
            }
            return new Microbe( _el[ parseInt( _var ) - 1 ] );
        }
        else
        {
            _var            = _var.split( 'n' );
            var increment   = parseInt( _var[0] ) || 1;
            var offset      = parseInt( _var[1] );

            var top;
            if ( _last === true || _last === 'last' )
            {
                top         = _el.length - parseInt( _var[1] );
                offset      = top % increment;
            }

            var _e, resArray = [];
            for ( var i = offset || 0, lenI = top || _el.length; i < lenI; )
            {
                _e = _el[ i ];

                if ( _e )
                {
                    resArray.push( _e );
                }

                i += increment;
            }
            return new Microbe( resArray );
        }
    };


    /**
     * ## pseudo
     *
     * an extension to core.__init_ to handle custom pseusoselectors
     *
     * @param  {Microbe} self half built Microbe
     * @param  {String} selector pseudo-selector string
     * @param  {Object} _scope scope element
     * @param  {Function} _build build function from core
     *
     * @return _Microbe_
     */
    var pseudo = function( self, selector, _scope, _build )
    {
        /**
         * ## _breakUpSelector
         *
         * pushes each selector through the pseudo-selector engine
         *
         * @param  {Array} _selectors split selectors
         *
         * @return _Microbe_
         */
        function _breakUpSelector( _selectors )
        {
            var next, resArray = [];
            for ( var i = 0, lenI = _selectors.length; i < lenI; i++ )
            {
                if ( i === 0 )
                {
                    resArray = pseudo( self, _selectors[ i ], _scope, _build );
                }
                else
                {
                    next = pseudo( self, _selectors[ i ], _scope, _build );

                    for ( var j = 0, lenJ = next.length; j < lenJ; j++ )
                    {
                        if ( Array.prototype.indexOf.call( resArray, next[ j ] ) === -1 )
                        {
                            resArray[ resArray.length ] = next[ j ];
                            resArray.length++;
                        }
                    }
                }
            }

            return resArray;
        }


        /**
         * ## _buildObject
         *
         * builds the Microbe ready for return
         *
         * @return _Microbe_
         */
        function _buildObject()
        {
            var _pseudo = _parsePseudo( _selector );

            var obj = _build( _scope.querySelectorAll( _pseudo[0] ), self );
            _pseudo = _pseudo[ 1 ];

            var _sel, _var;
            for ( var h = 0, lenH = _pseudo.length; h < lenH; h++ )
            {
                _sel = _pseudo[ h ].split( '(' );
                _var = _sel[ 1 ];
                if ( _var )
                {
                    _var = _var.slice( 0, _var.length - 1 );
                }
                _sel = _sel[ 0 ];

                if ( Microbe.constructor.pseudo[ _sel ] )
                {
                    obj = Microbe.constructor.pseudo[ _sel ]( obj, _var, selector );
                }
            }

            return obj;
        }


        /**
         * ## _cycleFilters
         *
         * filters multiple pseudo-selector selectors
         *
         * @param {Array} res array of results to be filtered
         *
         * @return _Microbe_
         */
        function _cycleFilters( res )
        {
            var obj = Microbe.constructor.pseudo( self, res[ 0 ], _scope, _build );

            var filter, connect = false;
            for ( var i = 1, lenI = res.length; i < lenI; i++ )
            {
                filter = res[ i ].trim();

                if ( filter[ 0 ] === '~' )
                {
                    obj = obj.siblingsFlat( '~' );
                    connect = true;
                }
                else if ( filter[ 0 ] === '+' )
                {
                    obj = obj.siblingsFlat( '+' );
                    connect = true;
                }
                else if ( connect )
                {
                    obj = obj.filter( filter );
                    connect = false;
                }
                else
                {
                    obj = obj.find( filter );
                    connect = false;
                }

                if ( obj.length === 0 )
                {
                    return obj;
                }
            }
            return obj;
        }


        /**
         * ## _parsePseudo
         *
         * checks all pseudo-selectors to see if they're custom and
         * otherwise it reattaches it
         *
         * @param {String} _sel selector string
         *
         * @return _String_ modified selector
         */
        function _parsePseudo( _sel )
        {
            var _pseudoArray;
            var _pseudo = _sel.split( ':' );
            _sel        = _pseudo[ 0 ];
            _pseudo.splice( 0, 1 );

            for ( var k = 0, lenK = _pseudo.length; k < lenK; k++ )
            {
                _pseudoArray = _pseudo[ k ].split( '(' );

                if ( !Microbe.constructor.pseudo[ _pseudoArray[ 0 ] ] )
                {
                    _sel += ':' + _pseudo[ k ];
                    _pseudo.splice( k, 1 );
                }
            }

            return [ _sel, _pseudo ];
        }

        if ( selector.indexOf( ',' ) !== -1 )
        {
            selector = selector.split( /,(?![a-zA-Z0-9-#.,\s]+\))/g );

            if ( selector.length > 1 )
            {
                return _breakUpSelector( selector );
            }
            else
            {
                selector = selector[ 0 ];
            }
        }

        var _selector = selector;

        if ( _selector[ 0 ] === ':' )
        {
            _selector = '*' + _selector;
        }

        if ( _selector.trim().indexOf( ' ' ) !== -1 )
        {
            var filterFunction = function( e ){ return e === ' ' ? false : e; };
            var res = _selector.split( /((?:[A-Za-z0-9.#*\-_]+)?(?:\:[A-Za-z\-]+(?:\([\s\S]+\))?)?)?( )?/ );
                res = res.filter( filterFunction );

            if ( res.length > 1 )
            {
                return _cycleFilters( res );
            }
            else
            {
                _selector = res[ 0 ];
            }
        }

        return _buildObject();
    };


    /**
     * ## _filteredIteration
     *
     * special iterator that dumps all results ito one array
     *
     * @param  {Microbe} _el elements to cycle through
     * @param  {Function} _cb callback
     *
     * @return _Microbe_ filtered microbe
     */
    function _filteredIteration( _el, _cb, _recursive )
    {
        var _r, resArray = [], _f = 0;
        for ( var i = 0, lenI = _el.length; i < lenI; i++ )
        {
            _r = _cb( _el[ i ], resArray, i );

            if ( _r )
            {
                resArray[ _f ] = _r;
                _f++;
            }
        }

        if ( _recursive )
        {
            return resArray;
        }

        return _el.constructor( resArray );
    }


    /**
     * ## any-link
     *
     * match elements that act as the source anchors of hyperlinks
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:any-link' );
     *
     * @return _Microbe_
     */
    pseudo[ 'any-link' ] = function( _el )
    {
        return _el.filter( 'a' );
    };


    /**
     * ## blank
     *
     * matches elements that only contain content which consists of whitespace
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:blank' );
     *
     * @return _Microbe_
     */
    pseudo.blank = function( _el )
    {
        var _blank = function( _e, resArray )
        {
            var _t = document.all ? _e.innerText : _e.textContent;

            if ( resArray.indexOf( _e ) === -1 )
            {
                if ( /^\s*$/.test( _t || _e.value ) )
                {
                    return _e;
                }
            }
        };

        return _filteredIteration( _el, _blank );
    };


    /**
     * ## column
     *
     * filters for columns with a suplied selector
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var string to search for
     *
     * @example µ( '.example:column' );
     *
     * @return _Microbe_
     */
    pseudo.column = function( _el, _var )
    {
        return _el.filter( 'col' ).filter( _var );
    };


    /**
     * ## contains
     *
     * Returns only elements that contain the given text.  The supplied text
     * is compared ignoring case
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var string to search for
     *
     * @example µ( '.example:contains(moon)' );
     *
     * @return _Microbe_
     */
    pseudo.contains = function( _el, _var )
    {
        _var = _var.toLowerCase();

        var _contains = function( _e )
        {
            var _getText = function( _el )
            {
                return document.all ? _el.innerText : _el.textContent; // ff
            };

            var _elText = _getText( _e );

            if ( _elText.toLowerCase().indexOf( _var ) !== -1 )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _contains );
    };


    /**
     * ## default
     *
     * selects all inputs and select boxes that are checked by dafeult
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:default' );
     *
     * @return _Microbe_
     */
    pseudo.default = function( _el )
    {
        _el = _el.filter( 'input, option' );

        var _default = function( _e )
        {
            if ( _e.defaultChecked === true )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _default );
    };


    /**
     * ## dir
     *
     * match elements by its directionality based on the document language
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var string to search for
     *
     * @example µ( '.example:dir(ltr)' );
     *
     * @return _Microbe_
     */
    pseudo.dir = function( _el, _var )
    {
        var _dir = function( _e )
        {
            if ( getComputedStyle( _e ).direction === _var )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _dir );
    };


    /**
     * ## drop
     *
     * returns all elements that are drop targets. HTML has a dropzone
     * attribute which specifies that an element is a drop target.
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var trigger string
     *
     * @example µ( '.example:drop' );
     *
     * @return _Microbe_
     */
    pseudo.drop = function( _el, _var )
    {
        _el = _el.filter( '[dropzone]' );

        if ( !_var )
        {
            return _el;
        }
        else
        {
            switch ( _var )
            {
                case 'active':
                    return _el.filter( ':active' );
                case 'invalid':
                    return _el.filter();
                case 'valid':
                    return _el.filter();
            }
        }
    };


    /**
     * ## even
     *
     * Returns the even indexed elements of a Microbe (starting at 0)
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:even' );
     *
     * @return _Microbe_
     */
    pseudo.even = function( _el )
    {
        var _even = function( _e, resArray, i )
        {
            if ( ( i + 1 ) % 2 === 0 )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _even );
    };


    /**
     * ## first
     *
     * returns the first element of a Microbe
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:first' );
     *
     * @return _Microbe_
     */
    pseudo.first = function( _el )
    {
        return _el.first();
    };


    /**
     * ## gt
     *
     * returns the last {_var} element
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var number of elements to return
     *
     * @example µ( '.example:gt(4)' );
     *
     * @return _Microbe_
     */
    pseudo.gt = function( _el, _var )
    {
        return _el.splice( _var, _el.length );
    };


    /**
     * ## has
     *
     * returns elements that have the passed selector as a child
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var selector string
     *
     * @example µ( '.example:has(span)' );
     *
     * @return _Microbe_
     */
    pseudo.has = function( _el, _var )
    {
        var _has = function( _e )
        {
            if ( _e.querySelector( _var ) )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _has );
    };


    /**
     * ## in-range
     *
     * select the elements with a value inside the specified range
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:in-range' );
     *
     * @return _Microbe_
     */
    pseudo[ 'in-range' ] = function( _el )
    {
        _el = _el.filter( '[max],[min]' );

        var _inRange = function( _e )
        {
            var min = _e.getAttribute( 'min' );
            var max = _e.getAttribute( 'max' );
            var _v  = parseInt( _e.value );

            if ( _v )
            {
                if ( min && max )
                {
                    if ( _v > min && _v < max )
                    {
                        return _e;
                    }
                }
                else if ( min && _v > min || max && _v < max )
                {
                    return _e;
                }
            }
        };

        return _filteredIteration( _el, _inRange );
    };


    /**
     * ## lang
     *
     * match the elements based on the document language
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var specified language (accepts wildcards as *)
     *
     * @example µ( '.example:lang(gb-en)' );
     * @example µ( '.example:lang(*-en)' );
     *
     * @return _Microbe_
     */
    pseudo.lang = function( _el, _var )
    {
        if ( _var )
        {
            if ( _var.indexOf( '*' ) !== -1 )
            {
                _el     = _el.filter( '[lang]' );
                _var    = _var.replace( '*', '' );

                var _lang = function( _e )
                {
                    if ( _e.getAttribute( 'lang' ).indexOf( _var ) !== -1 )
                    {
                        return _e;
                    }
                };

                return _filteredIteration( _el, _lang );
            }

            var res = document.querySelectorAll( ':lang(' + _var + ')' );
            return _el.constructor( Array.prototype.slice.call( res ) );
        }
        else
        {
            return _el.constructor( [] );
        }
    };


    /**
     * ## last
     *
     * returns the last element of a Microbe
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:last' );
     *
     * @return _Microbe_
     */
    pseudo.last = function( _el )
    {
        return _el.last();
    };



    /**
     * ## local-link
     *
     * returns all link tags that go to local links. If specified a depth
     * filter can be added
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var specified depth
     *
     * @example µ( '.example:local-link' );
     * @example µ( '.example:local-link(2)' );
     *
     * @return _Microbe_
     */
    pseudo[ 'local-link' ] = function( _el, _var )
    {
        _el = _el.filter( 'a' );
        var here    = document.location;

        var _localLink = function( _e )
        {
            var url         = _e.href;
            var urlShort    = url.replace( here.origin, '' ).replace( here.host, '' );
            urlShort        = urlShort[ 0 ] === '/' ? urlShort.slice( 1 ) : urlShort;
            var depth       = urlShort.split( '/' ).length - 1;

            if ( !_var || parseInt( _var ) === depth )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _localLink );
    };


    /**
     * ## lt
     *
     * returns the first [_var] elements
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var number of elements to return
     *
     * @example µ( '.example:lt(2)' );
     *
     * @return _Microbe_
     */
    pseudo.lt = function( _el, _var )
    {
        return _el.splice( 0, _var );
    };


    /**
     * ## matches
     *
     * returns elements that match either selector
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var selector filter
     * @param {String} _selector full original selector
     *
     * @example µ( '.example:matches(div)' );
     *
     * @return _Microbe_
     */
    pseudo.matches = function( _el, _var, _selector )
    {
        var _constructor = _el.constructor;

        var text = ':matches(' + _var + ')';
        _var = _var.split( ',' );

        _selector = _selector.replace(  text, '' );
        _selector = _selector === '*' ? '' : _selector;

        var res = _constructor( _selector + _var[ 0 ].trim() );

        for ( var i = 1, lenI = _var.length; i < lenI; i++ )
        {
            res.merge( _constructor( _selector + _var[ i ].trim() ), true );
        }

        return res;
    };


    /**
     * ## not
     *
     * returns all elements that do not match the given selector. As per
     * CSS4 spec, this accepts complex selectors seperated with a comma
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var null selector
     * @param {String} _recursive an indicator that it is calling itself. defines output
     *
     * @example µ( '.example:not(div)' );
     * @example µ( '.example:not(div,#an--id)' );
     *
     * @return _Microbe_
     */
    pseudo.not = function( _el, _var, _selector, _recursive )
    {
        if ( _var.indexOf( ',' ) !== -1 )
        {
            var _constructor = _el.constructor;
            _var = _var.split( ',' );

            for ( var i = 0, lenI = _var.length; i < lenI; i++ )
            {
                _el = this.not( _el, _var[ i ].trim(), _selector, true );
            }

            return _constructor( _el );
        }
        else
        {
            var _not = function( _e )
            {
                if ( ! Microbe.matches( _e, _var ) )
                {
                    return _e;
                }
            };

            return _filteredIteration( _el, _not, _recursive );
        }
    };


    /**
     * ## nth-column
     *
     * returns the nth column of the current Microbe
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var column number(s) return
     *
     * @example µ( '.example:nth-column(1)' );
     * @example µ( '.example:nth-column(2n1)' );
     * @example µ( '.example:nth-column(even)' );
     * @example µ( '.example:nth-column(odd)' );
     *
     * @return _Microbe_
     */
    pseudo[ 'nth-column' ] = function( _el, _var )
    {
        _el = _el.filter( 'col' );

        return _parseNth( _el, _var );
    };


    /**
     * ## nth-last-column
     *
     * returns the nth column of the current Microbe starting from the back
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var column number(s) return
     *
     * @example µ( '.example:nth-last-column(1)' );
     * @example µ( '.example:nth-last-column(2n1)' );
     * @example µ( '.example:nth-last-column(even)' );
     * @example µ( '.example:nth-last-column(odd)' );
     *
     * @return _Microbe_
     */
    pseudo[ 'nth-last-column' ] = function( _el, _var )
    {
        _el = _el.filter( 'col' );

        return _parseNth( _el, _var, true );
    };


    /**
     * ## nth-last-match
     *
     * returns the nth match(es) of the current Microbe starting from the back
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var match number(s) return
     *
     * @example µ( '.example:nth-last-match(1)' );
     * @example µ( '.example:nth-last-match(2n1)' );
     * @example µ( '.example:nth-last-match(even)' );
     * @example µ( '.example:nth-last-match(odd)' );
     *
     * @return _Microbe_
     */
    pseudo[ 'nth-last-match' ] = function( _el, _var )
    {
        return _parseNth( _el, _var, true );
    };


    /**
     * ## nth-match
     *
     * returns the nth match(es) of the current Microbe
     *
     * @param {Microbe} _el Microbe to be filtered
     * @param {String} _var match number(s) return
     *
     * @example µ( '.example:nth-match(1)' );
     * @example µ( '.example:nth-match(2n1)' );
     * @example µ( '.example:nth-match(even)' );
     * @example µ( '.example:nth-match(odd)' );
     *
     * @return _Microbe_
     */
    pseudo[ 'nth-match' ] = function( _el, _var )
    {
        return _parseNth( _el, _var );
    };


    /**
     * ## odd
     *
     * returns the odd indexed elements of a Microbe
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:odd' );
     *
     * @return _Microbe_
     */
    pseudo.odd = function( _el )
    {
        var _odd = function( _e, resArray, i )
        {
            if ( ( i + 1 ) % 2 !== 0 )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _odd );
    };


    /**
     * ## optional
     *
     * returns all optional elements
     *
     * @param {Microbe} _el base elements set
     *
     * @example µ( '.example:optional' );
     *
     * @return _Microbe_
     */
    pseudo.optional = function( _el )
    {
        return _el.filter( 'input:not([required=required]), textfield:not([required=required]), [required=optional], [optional]' );
    };


    /**
     * ## out-of-range
     *
     * select the elements with a value inside the specified range
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:out-of-range' );
     *
     * @return _Microbe_
     */
    pseudo[ 'out-of-range' ] = function( _el )
    {
        _el = _el.filter( '[max],[min]' );

        var _outOfRange = function( _e )
        {
            var min = _e.getAttribute( 'min' );
            var max = _e.getAttribute( 'max' );
            var _v  = parseInt( _e.value );

            if ( _v )
            {
                if ( min && max )
                {
                    if ( _v < min || _v > max )
                    {
                        return _e;
                    }
                }
                else if ( min && _v < min || max && _v > max )
                {
                    return _e;
                }
            }
        };

        return _filteredIteration( _el, _outOfRange );
    };


    /**
     * ## parent
     *
     * returns the parents of an _el match.
     * normally triggered using the ! selector
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example!' );
     * @example µ( '.example:parent' );
     *
     * @return _Microbe_
     */
    pseudo.parent = function( _el )
    {
        _el =  _el.parent();

        var _parent = function( _e, resArray, i )
        {
            if ( resArray.indexOf( _e ) === -1 )
            {
                return _e;
            }
        };

        return _filteredIteration( _el, _parent );
    };


    /**
     * ## read-only
     *
     * user-non-alterable content
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:read-only' );
     *
     * @return _Microbe_
     */
    pseudo[ 'read-only' ] = function( _el )
    {
        return _el.filter( ':not(input,textfield,[contenteditable=false])' );
    };


    /**
     * ## read-write
     *
     * input elements which are user-alterable or contenteditable
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:read-write' );
     *
     * @return _Microbe_
     */
    pseudo[ 'read-write' ] = function( _el )
    {
        return _el.filter( 'input,textfield,[contenteditable=true]' );
    };


    /**
     * ## required
     *
     * returns all required elements
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:required' );
     *
     * @return _Microbe_
     */
    pseudo.required = function( _el )
    {
        return _el.filter( '[required=required]' );
    };


    /**
     * ## root
     *
     * returns the root elements of the document
     *
     * @param {Microbe} _el Microbe to be filtered
     *
     * @example µ( '.example:root );
     *
     * @return _Microbe_
     */
    pseudo.root = function( _el )
    {
        return _el.constructor( document.body.parentNode );
    };



    Microbe.constructor.prototype.pseudo = pseudo;
};


},{}],23:[function(require,module,exports){
/**
 * rootUtils.js
 *
 * @author  Mouse Braun         <mouse@knoblau.ch>
 * @author  Nicolas Brugneaux   <nicolas.brugneaux@gmail.com>
 *
 * @package Microbe
 */

module.exports = function( Microbe )
{
    'use strict';

    /**
     * ## contains
     *
     * Checks if a given element is a child of _scope
     *
     * @param {Element} _el element to check
     * @param {Element} _scope scope
     *
     * @example µ.contains( _el, _parentEl );
     *
     * @return _Boolean_ whether _el is contained in the scope
     */
    Microbe.contains = function( _el, _scope )
    {
        var parent = _el.parentNode;

        while ( parent !== document && parent !== _scope )
        {
            parent = parent.parentNode || _scope.parentNode;
        }

        if ( parent === document )
        {
            return false;
        }

        return true;
    };


    /**
     * ## matches
     *
     * checks element an to see if they match a given css selector
     * unsure if we actually need the webkitMatchSelector and mozMatchSelector
     * http://caniuse.com/#feat=matchesselector
     *
     * @param {Mixed} el element, microbe, or array of elements to match
     *
     * @example µ.matches( _el, 'div.example' );
     *
     * @return _Booblean_ matches or not
     */
    Microbe.matches = function( el, selector )
    {
        var method  = this.matches.__matchesMethod;
        var notForm = ( typeof el !== 'string' && !!( el.length ) &&
                        el.toString() !== '[object HTMLFormElement]' );

        var isArray = Array.isArray( el ) || notForm ? true : false;

        if ( !isArray && !notForm )
        {
            el = [ el ];
        }

        if ( !method && el[ 0 ] )
        {
            if ( el[ 0 ].matches )
            {
                method = this.matches.__matchesMethod = 'matches';
            }
            else if ( el[ 0 ].msMatchesSelector )
            {
                method = this.matches.__matchesMethod = 'msMatchesSelector';
            }
            else if ( el[ 0 ].mozMatchesSelector )
            {
                method = this.matches.__matchesMethod = 'mozMatchesSelector';
            }
            else if ( el[ 0 ].webkitMatchesSelector )
            {
                method = this.matches.__matchesMethod = 'webkitMatchesSelector';
            }
        }

        var resArray = [];
        for ( var i = 0, lenI = el.length; i < lenI; i++ )
        {
            resArray.push( el[ i ][ method ]( selector ) );
        }

        return isArray ? resArray : resArray[ 0 ];
    };
};

},{}]},{},[1])(1)
});